package com.kingtopware.onemap.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.Node;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ContextLoader;

import com.alibaba.fastjson.JSON;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.onemap.service.ConfManaService;
import com.kingtopware.onemap.service.impl.ConfManaServiceImpl;

/**
 * 
 * @author 胡庆杰 功能:xml配置文件的修改操作 日期:2017-10-31
 *         说明:对xml的操作使用到了xpath语法(http://www.w3school.com.cn/xpath/)
 */
@RestController
@RequestMapping(value = "/confmana")
public class ConfManaController {
	private static Logger logger=Logger.getLogger(ConfManaController.class);
	String basePath = null;

	private ConfManaService getServ() {
		if (basePath == null) {
			basePath = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
		}
		return new ConfManaServiceImpl(basePath, basePath + "/config/app.xml");
	}

	/**
	 * 返回指定路径匹配到的节点的数量
	 * 
	 * @param path
	 *            指定的路径(示例:"/App/SystemTheme/ThemeType")
	 * @return 匹配到的数量
	 */
	@RequestMapping(value = "/select", method = RequestMethod.POST)
	public ResultList<String> select(@RequestParam("path") String path) {
		try {
			ConfManaService srv = getServ();
			return srv.select(path);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<String>(false, "执行失败");
		}

	}
	
	/**
	 * 返回指定路径匹配到的节点下的内容
	 * 
	 * @param path
	 *            指定的路径(示例:"/App/SystemTheme/ThemeType")
	 * @return 匹配到的数量
	 */
	@RequestMapping(value = "/selectcontent", method = RequestMethod.POST)
	public ResultList<String> selectContent(@RequestParam("path") String path) {
		try {
			ConfManaService srv = getServ();
			return srv.selectContent(path);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<String>(false, "执行失败");
		}

	}

	/**
	 * 更新一条配置文件记录
	 * 
	 * @param path
	 *            要更新的节点路径 (示例:"/App/SystemTheme/ThemeType")
	 * @param value
	 *            要更新的节点值 (示例:"WebOS")
	 * @param onlyone
	 *            是否在一次节点选中中只更新第一个节点
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Result<Boolean> update(@RequestParam String path, @RequestParam String value,
			@RequestParam boolean onlyone) {
		try {
			ConfManaService srv = getServ();
			List<String> paths = new ArrayList<String>();
			paths.add(path);
			List<String> values = new ArrayList<String>();
			values.add(value);
			boolean b = srv.update(paths, values, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}

	}

	/**
	 * 一次更新多条配置文件记录
	 * 
	 * @param paths
	 *            要更新的节点路径数组(示例:["/App/SystemTheme/ThemeType","/App/SystemTheme/Skin"])
	 * @param values
	 *            要更新的节点的值的数组(示例:["hqjtype","hqjskin"])
	 * @param onlyone
	 *            是否在一次节点选中中只更新第一个节点
	 * @return
	 */
	@RequestMapping(value = "/updatebatch", method = RequestMethod.POST)
	public Result<Boolean> updatebatch(@RequestParam String path, @RequestParam String value,
			@RequestParam boolean onlyone) {
		try {
			List<String> li = JSON.parseObject(path, ArrayList.class);
			List<String> li2 = JSON.parseObject(value, ArrayList.class);
			ConfManaService srv = getServ();
			boolean b = srv.update(li, li2, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}

	}

	/**
	 * 新增一条配置文件记录
	 * 
	 * @param path
	 *            要新增的节点路径 (示例:"/App/SystemTheme/ThemeType")
	 * @param name
	 *            要新增的节点名称 (示例:"test")
	 * @param value
	 *            要新增的节点值 (示例:"test123")
	 * @param onlyone
	 *            是否在一次节点选中中只新增给第一个节点
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Result<Boolean> add(@RequestParam String path, @RequestParam String name, @RequestParam String value,
			@RequestParam boolean onlyone) {
		try {
			ConfManaService srv = getServ();
			List<String> paths = new ArrayList<String>();
			paths.add(path);
			List<String> names = new ArrayList<String>();
			names.add(name);
			List<String> values = new ArrayList<String>();
			values.add(value);
			boolean b = srv.add(paths, names, values, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 一次新增多条配置文件记录
	 * 
	 * @param paths
	 *            要新增的节点路径数组(示例:["/App/SystemTheme/ThemeType","/App/SystemTheme/Skin"])
	 * @param values
	 *            要新增的节点的值的数组(示例:["hqjtype","hqjskin"])
	 * @param onlyone
	 *            是否在一次节点选中中只新增第一个节点
	 * @return
	 */
	@RequestMapping(value = "/addbatch", method = RequestMethod.POST)
	public Result<Boolean> addbatch(@RequestParam String path, @RequestParam String name, @RequestParam String value,
			@RequestParam boolean onlyone) {
		try {
			List<String> li = JSON.parseObject(path, ArrayList.class);
			List<String> li2 = JSON.parseObject(name, ArrayList.class);
			List<String> li3 = JSON.parseObject(value, ArrayList.class);
			ConfManaService srv = getServ();
			boolean b = srv.add(li, li2, li3, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}

	}

	/**
	 * 删除一条配置文件记录
	 * 
	 * @param path
	 *            要删除的节点路径 (示例:"/App/SystemTheme/ThemeType")
	 * @param onlyone
	 *            是否在一次节点选中中只删除第一个节点
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public Result<Boolean> delete(@RequestParam String path, @RequestParam boolean onlyone) {
		try {
			ConfManaService srv = getServ();
			List<String> paths = new ArrayList<String>();
			paths.add(path);
			boolean b = srv.delete(paths, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 删除多条配置文件记录
	 * 
	 * @param path
	 *            要删除的节点路径
	 *            (示例:["/App/SystemTheme/ThemeType","/App/SystemTheme/Skin"])
	 * @param onlyone
	 *            是否在一次节点选中中只删除第一个节点
	 * @return
	 */
	@RequestMapping(value = "/deletebatch", method = RequestMethod.POST)
	public Result<Boolean> deletebatch(@RequestParam String path, @RequestParam boolean onlyone) {
		try {
			ConfManaService srv = getServ();
			List<String> li = JSON.parseObject(path, ArrayList.class);
			boolean b = srv.delete(li, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 清空一条配置文件记录的内容
	 * 
	 * @param path
	 *            要清空内容的节点路径 (示例:"/App/SystemTheme/ThemeType")
	 * @param onlyone
	 *            是否在一次节点选中中只清空第一个节点的内容
	 * @return
	 */
	@RequestMapping(value = "/clear", method = RequestMethod.POST)
	public Result<Boolean> clear(@RequestParam String path, @RequestParam boolean onlyone) {
		try {
			ConfManaService srv = getServ();
			List<String> paths = new ArrayList<String>();
			paths.add(path);
			boolean b = srv.clear(paths, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 清空多条配置文件记录的内容
	 * 
	 * @param path
	 *            要清空内容的节点路径
	 *            (示例:["/App/SystemTheme/ThemeType","/App/SystemTheme/Skin"])
	 * @param onlyone
	 *            是否在一次节点选中中只清空第一个节点的内容
	 * @return
	 */
	@RequestMapping(value = "/clearbatch", method = RequestMethod.POST)
	public Result<Boolean> clearbatch(@RequestParam String path, @RequestParam boolean onlyone) {
		try {
			ConfManaService srv = getServ();
			List<String> li = JSON.parseObject(path, ArrayList.class);
			boolean b = srv.clear(li, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 将指定的父节点下的若干节点进行排序
	 * 
	 * @param path
	 *            父节点路径(示例:/App/SystemTheme)
	 * @param items
	 *            要进行排序的节点(示例:["/App/SystemTheme/SubSystems/ID[text()='YiZhangTu']/parent::*","/App/SystemTheme/SubSystems/ID[text()='XiTongWeiHu']/parent::*"])
	 * @return
	 */
	@RequestMapping(value = "/order", method = RequestMethod.POST)
	public Result<Boolean> order(@RequestParam String path, @RequestParam String items) {
		try {
			ConfManaService srv = getServ();
			List<String> li = JSON.parseObject(items, ArrayList.class);
			boolean b = srv.order(path, li);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}
	
	/**
	 * 将选中的节点移动至指定的节点下
	 * 
	 * @param path
	 *            父节点路径(示例:/App/SystemTheme)
	 * @param items
	 *            要进行移动的节点(示例:["/App/SystemTheme/SubSystems/ID[text()='YiZhangTu']/parent::*","/App/SystemTheme/SubSystems/ID[text()='XiTongWeiHu']/parent::*"])
	 * @return
	 */
	@RequestMapping(value = "/move", method = RequestMethod.POST)
	public Result<Boolean> move(@RequestParam String path, @RequestParam String items,@RequestParam boolean onlyone){
		try {
			ConfManaService srv = getServ();
			List<String> li = JSON.parseObject(items, ArrayList.class);
			boolean b = srv.move(path, li, onlyone);
			return new Result<Boolean>(b);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

}

package com.kingtopware.framework.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.kingtopware.framework.bean.FileInfo;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.entity.DictionaryEntity;
import com.kingtopware.framework.entity.DictionaryExEntity;
import com.kingtopware.framework.service.DictionaryService;
import com.kingtopware.framework.util.ExcelUtil;
//import com.kingtopware.framework.util.ExcelUtil;

@RestController
@RequestMapping(value = "/dictionary")
@SuppressWarnings({ "rawtypes" })
public class DictionaryController extends BaseController<DictionaryEntity> {
	private static Logger logger = Logger.getLogger(DictionaryController.class);
	@Resource
	public DictionaryService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 根据父节点编号获取字典列表数据
	 * 
	 * @param parentId：父节点编号
	 * @return：字典列表数据
	 */
	@RequestMapping(value = "/getbyparentid/{parentId}", method = RequestMethod.GET)
	public ResultList<DictionaryExEntity> getDictionaryByParentID(@PathVariable("parentId") String parentId) {
		try {
			return srv.getDictionaryByParentID(parentId);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<DictionaryExEntity>(false, "执行失败");
		}
	}

	/**
	 * 根据条件获取字典分页列表数据
	 * 
	 * @param condition：过滤条件
	 * @param pageIndex：页索引
	 * @param pageSize：页大小
	 * @return：字典分页列表数据
	 */
	@RequestMapping(value = "/getbycondition/{pageIndex}/{pageSize}", method = RequestMethod.POST)
	public ResultPageList<DictionaryExEntity> getDictionaryByCondition(@RequestBody String condition,
			@PathVariable("pageIndex") String pageIndex, @PathVariable("pageSize") String pageSize) {
		try {
			return srv.getDictionaryByCondition(condition, pageIndex, pageSize);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultPageList<DictionaryExEntity>(false, "执行失败");
		}
	}

	@Override
	public Result delete(@RequestBody DictionaryEntity model) {
		try {
			return srv.deleteInfo(model);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result(false, "执行失败");
		}
	}

	/**
	 * 根据字典类型获取字典列表
	 * 
	 * @param types：字典类型集合
	 * @return：字典列表
	 */
	@RequestMapping(value = "/getdictionarybytypes", method = RequestMethod.POST)
	public ResultList<DictionaryEntity> getDictionaryByTypes(@RequestBody List<String> types) {
		try {
			return srv.getDictionaryByTypes(types);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<DictionaryEntity>(false, "执行失败");
		}
	}

	/**
	 * 字典数据导出
	 * 
	 * @param response：响应上下文
	 * @param condition：过滤条件
	 */
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public void Export(HttpServletResponse response, @RequestParam("condition") String condition) {
		try {
			List<DictionaryEntity> list = srv.getDictionaryList(condition);
			response.setContentType("multipart/form-data");
			response.setHeader("Content-Disposition", "attachment;filename=export.xls");
			ExcelUtil.<DictionaryEntity> writeEasy((ArrayList<DictionaryEntity>) list, DictionaryEntity.colNames,
					DictionaryEntity.colHeaders, response.getOutputStream());
			response.getOutputStream().close();
		} catch (Exception e) {
			response.setHeader("Content-Disposition", "");
			response.setContentType("application/json;charset=UTF-8");
			try {
				Result<FileInfo> hr = new Result<FileInfo>(false, "执行失败");
				response.getOutputStream().write(JSON.toJSONString(hr).getBytes());
				response.getOutputStream().close();
				response.getOutputStream().flush();
			} catch (Exception e1) {
				logger.error(e.getMessage(),e);
			}
		}
	}
}

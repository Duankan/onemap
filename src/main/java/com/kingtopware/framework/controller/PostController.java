package com.kingtopware.framework.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.PostFull;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.entity.PostEntity;
import com.kingtopware.framework.service.PostService;

@RestController
@RequestMapping(value = "/post")
public class PostController extends BaseController<PostEntity> {
	private static Logger logger = Logger.getLogger(PostController.class);
	@Resource
	public PostService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
	
	/**
	 * 根据组织编号和岗位名称获取岗位列表信息
	 * 
	 * @param pageIndex：页索引
	 * @param pageSize：页大小
	 * @param map：组织编号和岗位名称
	 * @return：岗位列表信息
	 */
	@RequestMapping(value = "/getinfo/{pageIndex}/{pageSize}", method = RequestMethod.POST)
	public ResultPageList<PostFull> getInfo(@PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize, @RequestBody Map<String, Object> map) {
		try {
			return srv.getInfo(pageIndex, pageSize, map);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultPageList<PostFull>(false,"执行失败");
		}
	}

	/**
	 * 根据组织编号获取岗位列表信息
	 * @param orgId：组织编号
	 * @return：岗位列表信息
	 */
	@RequestMapping(value = "/getinfo/{orgId}", method = RequestMethod.GET)
	public ResultList<PostFull> getInfo(@PathVariable("orgId") String orgId) {
		try {
			return srv.getInfo(orgId);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<PostFull>(false,"执行失败");
		}
	}

	/**
	 * 岗位信息新增
	 * @param entity：岗位信息
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/insertex", method = RequestMethod.POST)
	public Result<String> insertEx(@RequestBody PostEntity entity) {
		try {
			return srv.insertEx(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败");
		}
	}

	/**
	 * 岗位信息更新
	 * @param entity：岗位信息
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/updateex", method = RequestMethod.POST)
	public Result<String> updateEx(@RequestBody PostEntity entity) {
		try {
			return srv.updateEx(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败");
		}
	}

	/**
	 * 更新负责岗位信息
	 * @param entity：岗位信息
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/update/mainpost", method = RequestMethod.POST)
	public Result<String> updateMainPost(@RequestBody PostEntity entity) {
		try {
			return srv.updateMainPost(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败");
		}
	}
}
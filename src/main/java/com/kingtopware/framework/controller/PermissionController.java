package com.kingtopware.framework.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.PermTree;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.PermissionEntity;
import com.kingtopware.framework.entity.PermissionExEntity;
import com.kingtopware.framework.service.PermissionService;

@RestController
@RequestMapping(value = "/permission")
@SuppressWarnings({ "unchecked" })
public class PermissionController extends BaseController<PermissionEntity> {
	private static Logger logger = Logger.getLogger(FolderController.class);
	public final static String TOKEN = "00000000-0000-0000-0000-000000000000";
	@Resource
	public PermissionService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 获取权限树数据
	 * 
	 * @param postId：岗位编号
	 * @param postIds：权限对应的岗位编号集合
	 * @return：权限树数据
	 */
	@RequestMapping(value = "/getpermtree/{postId}", method = RequestMethod.POST)
	public Result<PermTree> getPermTree(@PathVariable("postId") String postId, @RequestBody List<String> postIds) {
		try {
			return srv.getPermTree(postId, postIds, postId);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<PermTree>(false, "执行失败");
		}
	}

	/**
	 * 根据父节点编号获取权限树数据
	 * 
	 * @param pid：父节点编号
	 * @return：权限树数据
	 */
	@RequestMapping(value = "/getpremtreebypid/{pid}", method = RequestMethod.GET)
	public List<PermissionExEntity> getPremTreeByID(@PathVariable("pid") String pid) {
		try {
			return srv.getPremTreeByID(pid);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ArrayList<PermissionExEntity>();
		}
	}

	/**
	 * 新增权限
	 * 
	 * @param model：权限信息
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/insertex", method = RequestMethod.POST)
	public Result<String> insertEx(@RequestBody PermissionEntity model) {
		try {
			return srv.insertEx(model);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false, "保存失败！");
		}
	}

	/**
	 * 更新权限
	 * 
	 * @param model：权限信息
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/updateex", method = RequestMethod.POST)
	public Result<String> updateEx(@RequestBody PermissionEntity model) {
		try {
			return srv.updateEx(model);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false, "保存失败！");
		}
	}

}

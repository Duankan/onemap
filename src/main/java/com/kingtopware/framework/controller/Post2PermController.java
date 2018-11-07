package com.kingtopware.framework.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.Post2PermEntity;
import com.kingtopware.framework.service.Post2PermService;

@RestController
@RequestMapping(value = "/post2perm")
public class Post2PermController extends BaseController<Post2PermEntity> {
	private static Logger logger = Logger.getLogger(Post2PermController.class);
	@Resource
	public Post2PermService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 保存岗位权限关系数据
	 * 
	 * @param postId：岗位编号
	 * @param permIds：权限编号集合
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/save/{postId}", method = RequestMethod.POST)
	public Result<Boolean> save(@PathVariable("postId") String postId, @RequestBody List<String> permIds) {
		try {
			return srv.save(postId, permIds);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}
}
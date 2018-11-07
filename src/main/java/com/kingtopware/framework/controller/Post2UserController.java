package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.Post2UserEntity;
import com.kingtopware.framework.service.Post2UserService;

@RestController
@RequestMapping(value = "/post2user")
public class Post2UserController extends BaseController<Post2UserEntity> {
	private static Logger logger = Logger.getLogger(Post2UserController.class);
	@Resource
	public Post2UserService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 更新岗位负责人信息
	 * 
	 * @param model：岗位用户关系表
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/updatepostowner", method = RequestMethod.POST)
	public Result<Boolean> updatePostOwner(@RequestBody Post2UserEntity model) {
		try {			
			return srv.updatePostOwner(model);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<Boolean>(false, "执行失败");
		}
	}
}

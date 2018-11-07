package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.dao.Post2UserDao;
import com.kingtopware.framework.entity.Post2UserEntity;
import com.kingtopware.framework.service.Post2UserService;

@Component
public class Post2UserServiceImpl extends BaseServiceImpl<Post2UserEntity> implements Post2UserService {
	private static Logger logger=Logger.getLogger(Post2UserServiceImpl.class);
	@Resource
	public Post2UserDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public Post2UserServiceImpl() {
		tableName = "KTW_POST2USER";
	}

	public Result<Boolean> updatePostOwner(@RequestBody Post2UserEntity model) {
		String sql = "UPDATE KTW_POST2USER SET POSTOWNER=" + model.getPostowner();
		sql += " WHERE USERID='" + model.getUserid() + "' AND POSTID='" + model.getPostid() + "'";
		return new Result<Boolean>(executeUpdate(sql));
	}

}

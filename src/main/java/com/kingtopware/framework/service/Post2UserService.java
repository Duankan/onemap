package com.kingtopware.framework.service;

import org.springframework.web.bind.annotation.RequestBody;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.Post2UserEntity;

public interface Post2UserService extends BaseService<Post2UserEntity> {

	public Result<Boolean> updatePostOwner(@RequestBody Post2UserEntity model);

}

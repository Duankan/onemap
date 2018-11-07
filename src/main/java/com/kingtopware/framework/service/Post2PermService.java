package com.kingtopware.framework.service;

import java.util.List;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.Post2PermEntity;

public interface Post2PermService extends BaseService<Post2PermEntity> {

	public Result<Boolean> save(String postId, List<String> permIds);
}
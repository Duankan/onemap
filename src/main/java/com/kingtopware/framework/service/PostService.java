package com.kingtopware.framework.service;

import java.util.Map;

import com.kingtopware.framework.bean.PostFull;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.entity.PostEntity;

public interface PostService extends BaseService<PostEntity> {

	public ResultPageList<PostFull> getInfo(String pageIndex, String pageSize, Map<String, Object> map);

	public ResultList<PostFull> getInfo(String orgId);

	public Result<String> insertEx(PostEntity entity);

	public Result<String> updateEx(PostEntity entity);

	public Result<String> updateMainPost(PostEntity entity);

}

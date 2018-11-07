package com.kingtopware.framework.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.bean.UserContactPost;
import com.kingtopware.framework.bean.UserFull;
import com.kingtopware.framework.entity.UserCutEntity;
import com.kingtopware.framework.entity.UserEntity;

public interface UserService extends BaseService<UserEntity> {

	/**
	 * 
	 * @param entity：用户信息
	 * @return
	 */
	public Result<UserFull> login(UserEntity entity, String TOKEN);

	public boolean updatePassword(UserEntity entity);

	public ResultPageList<UserCutEntity> getByPostIDAndName(String postID, String name, String pageIndex,
			String pageSize);

	public ResultPageList<UserCutEntity> getFriend(String pageIndex, String pageSize, Map<String, Object> map);

	public ResultPageList<UserEntity> getUserByCondition(String pageIndex, String pageSize, Map<String, Object> map);

	public Result<Boolean> deleteUser(List<String> ids);

	public Result<String> insertEx(@RequestBody UserContactPost model);

	public Result<Boolean> updatePwd(Map<String, Object> map);

	public Result<UserContactPost> getUserByID(String id);

	public Result<Boolean> updateEx(UserContactPost model);
}

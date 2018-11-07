package com.kingtopware.framework.service;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.kingtopware.framework.bean.PermTree;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.PermissionEntity;
import com.kingtopware.framework.entity.PermissionExEntity;

@Component
public interface PermissionService extends BaseService<PermissionEntity> {

	public Result<PermTree> getPermTree(String postId, List<String> postIds, String TOKEN);

	public List<PermissionExEntity> getPremTreeByID(String pid);

	public Result<String> insertEx(@RequestBody PermissionEntity model);

	public Result<String> updateEx(PermissionEntity model);

}

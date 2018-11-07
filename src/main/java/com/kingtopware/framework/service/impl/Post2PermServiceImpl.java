package com.kingtopware.framework.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.dao.Post2PermDao;
import com.kingtopware.framework.entity.Post2PermEntity;
import com.kingtopware.framework.service.Post2PermService;

@Component
public class Post2PermServiceImpl extends BaseServiceImpl<Post2PermEntity> implements Post2PermService {
	private static Logger logger=Logger.getLogger(Post2PermServiceImpl.class);
	@Resource
	public Post2PermDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public Post2PermServiceImpl() {
		tableName = "KTW_POST2PERM";
	}

	public Result<Boolean> save(String postId, List<String> permIds) {
		String _permIds = "";
		permIds.remove("kingtopware");
		if (permIds.size() > 0)
			for (String id : permIds)
				_permIds += "'" + id + "',";
		if (!_permIds.equals(""))
			_permIds = _permIds.substring(0, _permIds.length() - 1);
		String condition = "POSTID='" + postId + "' AND PERMID IN(" + _permIds + ")";
		List<Post2PermEntity> models = getByFilter(condition);
		condition = "POSTID='" + postId + "' AND PERMID NOT IN(" + _permIds + ")";
		delete(condition);
		for (String permId : permIds) {
			for (Post2PermEntity m : models)
				if (m.getPermid().equals(permId))
					continue;
			dao.save(new Post2PermEntity(postId, permId));
		}
		return new Result<Boolean>(true);
	}
}
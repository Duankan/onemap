package com.kingtopware.framework.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.kingtopware.framework.bean.PermTree;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.dao.PermissionDao;
import com.kingtopware.framework.entity.PermissionEntity;
import com.kingtopware.framework.entity.PermissionExEntity;
import com.kingtopware.framework.service.PermissionService;

@Component
public class PermissionServiceImpl extends BaseServiceImpl<PermissionEntity> implements PermissionService {
	private static Logger logger=Logger.getLogger(PermissionServiceImpl.class);
	@Resource
	public PermissionDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public PermissionServiceImpl() {
		tableName = "KTW_PERMISSION";
	}

	public Result<PermTree> getPermTree(String postId, List<String> postIds, String TOKEN) {
		if (postId.isEmpty() || postIds.size() == 0)
			return null;
		String sql = "SELECT A.* FROM KTW_PERMISSION A";
		String w = ",KTW_POST2PERM B WHERE A.ID=B.PERMID AND B.POSTID";
		String _sql = sql + w + "='" + postId + "'";
		if (!postIds.contains(TOKEN)) {
			String ids = "";
			for (String id : postIds)
				ids += "'" + id + "',";
			if (!ids.equals(""))
				ids = ids.substring(0, ids.length() - 1);
			sql += w + " in (" + ids + ")";
		}
		List<PermissionEntity> allPerms = getBySql(sql);
		List<PermissionEntity> currPerms = getBySql(_sql);
		return new Result<PermTree>(new PermTree().convert(allPerms, currPerms));
	}

	public List<PermissionExEntity> getPremTreeByID(String pid) {
		String condition = "1=1";
		if (!pid.isEmpty())
			condition = "PARENTID='" + pid + "'";
		String sql = "SELECT T.*,CASE WHEN T1.COUNT=0 OR T1.COUNT IS NULL THEN 'open' ";
		sql += "WHEN T1.COUNT>0 THEN 'closed' END AS STATE FROM(SELECT * FROM KTW_PERMISSION";
		sql += " WHERE " + condition + " AND(PARENTID IS NULL OR PARENTID NOT IN (SELECT ID ";
		sql += "FROM KTW_PERMISSION WHERE " + condition + ")) ORDER BY PARENTID) T LEFT JOIN ";
		sql += "(SELECT PARENTID, COUNT(PARENTID) COUNT FROM KTW_PERMISSION WHERE ";
		;
		sql += "PARENTID IN (SELECT ID FROM KTW_PERMISSION WHERE " + condition;
		sql += ") GROUP BY PARENTID) T1 ON T.ID = T1.PARENTID";
		return getBySql(sql, PermissionExEntity.class);
	}

	public Result<String> insertEx(@RequestBody PermissionEntity model) {
		if (isExisted(model, false))
			return new Result(false, "当前业务编号已存在！");
		return new Result<String>(add(model));
	}

	private boolean isExisted(PermissionEntity model, boolean isupdate) {
		String condition = " BPID='" + model.getBpid() + "'";
		if (isupdate)
			condition += " AND ID<>'" + model.getId() + "'";
		return getCountByCondition(condition) > 0;
	}

	public Result<String> updateEx(PermissionEntity model) {
		if (isExisted(model, true))
			return new Result(true, "当前业务编号已存在！");
		return new Result<String>(update(model));
	}

}

package com.kingtopware.framework.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.dao.OrganizeDao;
import com.kingtopware.framework.entity.OrganizeEntity;
import com.kingtopware.framework.entity.OrganizeExEntity;
import com.kingtopware.framework.service.OrganizeService;

@Component
public class OrganizeServiceImpl extends BaseServiceImpl<OrganizeEntity> implements OrganizeService {
	private static Logger logger=Logger.getLogger(OrganizeServiceImpl.class);
	@Resource
	public OrganizeDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public OrganizeServiceImpl() {
		tableName = "KTW_ORGANIZE";
	}

	public List<OrganizeExEntity> getOrganizeByID(String flag, String id) {
		String fn = "0".equals(flag) ? "PARENTID" : "ID";
		String condition = fn + "='" + id + "'";
		return getBySql(getSqlByCondition(condition), OrganizeExEntity.class);
	}

	private String getSqlByCondition(String condition) {
		if (condition == null || condition.isEmpty())
			condition = "1=1";
		String sql = "SELECT T.*,CASE WHEN T1.COUNT=0 OR T1.COUNT IS NULL THEN 'open' ";
		sql += "WHEN T1.COUNT>0 THEN 'closed' END AS STATE FROM(SELECT * FROM KTW_ORGANIZE WHERE ";
		sql += condition + " AND(PARENTID IS NULL OR PARENTID NOT IN (SELECT ID FROM KTW_ORGANIZE ";
		sql += "WHERE " + condition + ")) ORDER BY PARENTID) T LEFT JOIN (SELECT PARENTID, COUNT(PARENTID)";
		sql += " COUNT FROM KTW_ORGANIZE WHERE PARENTID IN (SELECT ID FROM KTW_ORGANIZE WHERE ";
		sql += condition + ") GROUP BY PARENTID) T1 ON T.ID = T1.PARENTID";
		return sql;
	}
}
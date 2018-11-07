
package com.kingtopware.framework.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.dao.DictionaryDao;
import com.kingtopware.framework.entity.DictionaryEntity;
import com.kingtopware.framework.entity.DictionaryExEntity;
import com.kingtopware.framework.service.DictionaryService;

@Component
public class DictionaryServiceImpl extends BaseServiceImpl<DictionaryEntity> implements DictionaryService {
	private static Logger logger = Logger.getLogger(DictionaryServiceImpl.class);
	@Resource
	public DictionaryDao dao;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.kingtopware.service.core.impl.DictionaryService#getBaseDao()
	 */
	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public DictionaryServiceImpl() {
		tableName = "KTW_DICTIONARY";
	}

	public ResultList<DictionaryExEntity> getDictionaryByParentID(String parentId) {
		String condition = "PARENTID='" + parentId + "'";
		return new ResultList<DictionaryExEntity>(getBySql(getSqlByCondition(condition), DictionaryExEntity.class));
	}

	private String getSqlByCondition(String condition) {
		if (condition == null || condition.isEmpty())
			condition = "1=1";
		String sql = "SELECT T.*,CASE WHEN T1.COUNT=0 OR T1.COUNT IS NULL THEN 'open' ";
		sql += "WHEN T1.COUNT>0 THEN 'closed' END AS STATE FROM(SELECT * FROM KTW_DICTIONARY";
		sql += " WHERE " + condition + "AND(PARENTID IS NULL OR PARENTID NOT IN (SELECT ";
		sql += "ID FROM KTW_DICTIONARY WHERE " + condition + ")) ORDER BY PARENTID) T ";
		sql += "LEFT JOIN (SELECT PARENTID, COUNT(PARENTID) COUNT FROM KTW_DICTIONARY ";
		sql += "WHERE PARENTID IN (SELECT ID FROM KTW_DICTIONARY WHERE ";
		sql += condition + ") GROUP BY PARENTID) T1 ON T.ID = T1.PARENTID";
		sql += " ORDER BY EDITDATE DESC";
		return sql;
	}

	private String getRecursiveSql(String condition) {
		if (condition == null || condition.isEmpty())
			condition = "1=1";
		String sql = "WITH RECURSIVE R AS(SELECT * FROM KTW_DICTIONARY";
		sql += " WHERE " + condition + " UNION SELECT a.* FROM KTW_DICTIONARY";
		sql += " a,R WHERE a.PARENTID=R.ID) SELECT * FROM R";
		return sql;
	}

	public ResultPageList<DictionaryExEntity> getDictionaryByCondition(String condition, String pageIndex,
			String pageSize) {
		String sql = getSqlByCondition(condition);
		return new ResultPageList<DictionaryExEntity>(getPageBySql(pageIndex, pageSize, sql, DictionaryExEntity.class));
	}

	public Result deleteInfo(DictionaryEntity model) {
		String sql = getRecursiveSql("ID='" + model.getId() + "'");
		String condition = "ID IN(SELECT ID FROM(" + sql + ")T)";
		return new Result(delete(condition));
	}

	public ResultList<DictionaryEntity> getDictionaryByTypes(List<String> types) {
		if (types == null)
			return new ResultList<DictionaryEntity>(false, "类型列表不能为空");
		String condition = "(";
		for (String type : types) {
			condition += "TYPE='" + type + "' OR";
		}
		condition = condition.substring(0, condition.length() - 2);
		condition += ") AND PARENTID IS NOT NULL and PARENTID<>'' order by TYPE";
		return new ResultList<DictionaryEntity>(getByFilter(condition, null));

	}

	public List<DictionaryEntity> getDictionaryList(String condition) {
		List<DictionaryEntity> list = getDictionaryWithRecursiveByCondition(condition);
		return list;
	}

	private List<DictionaryEntity> getDictionaryWithRecursiveByCondition(String condition) {
		String sql = "WITH RECURSIVE R AS(SELECT * FROM KTW_DICTIONARY";
		if (condition != null && !condition.isEmpty())
			sql += " WHERE " + condition;
		sql += " UNION SELECT a.* FROM KTW_DICTIONARY a,R WHERE a.PARENTID=R.ID)";
		sql += " SELECT distinct(R.*) FROM R";
		return getBySql(sql);
	}
}
package com.kingtopware.framework.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.PageList;
import com.kingtopware.framework.bean.PostFull;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.dao.PostDao;
import com.kingtopware.framework.entity.PostEntity;
import com.kingtopware.framework.service.PostService;

@Component
public class PostServiceImpl extends BaseServiceImpl<PostEntity> implements PostService {
	private static Logger logger=Logger.getLogger(PostServiceImpl.class);
	@Resource
	public PostDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public PostServiceImpl() {
		tableName = "KTW_POST";
	}

	public ResultPageList<PostFull> getInfo(String pageIndex, String pageSize, Map<String, Object> map) {
		String condition = "1=1";
		if (map.containsKey("ORGID") && map.get("ORGID") != null) {
			String orgId = map.get("ORGID").toString();
			if (!orgId.isEmpty())
				condition += " AND ORGID='" + orgId + "'";
		}
		if (map.containsKey("NAME") && map.get("NAME") != null) {
			String name = map.get("NAME").toString().replace("'", "''");
			if (!name.isEmpty())
				condition += " AND NAME LIKE '%" + name + "%'";
		}
		PageList<PostEntity> pageList = getPageByFilter(pageIndex, pageSize, condition);
		List<PostFull> ds = new ArrayList<PostFull>();
		PageList<PostFull> pl = new PageList<PostFull>(pageList.getPageInfo(), ds);
		if (pageList.getDataSource().size() > 0) {
			List<String> pids = new ArrayList<String>();
			for (PostEntity p : pageList.getDataSource()) {
				ds.add(p.convert());
				String pid = p.getParentid();
				if (pid != null && !pid.trim().isEmpty() && !pids.contains(pid))
					pids.add(pid);
			}
			Map<String, String> dics = getPostName(pids);
			for (PostFull p : ds) {
				if (p.parentid == null || p.parentid.isEmpty())
					continue;
				p.parentname = dics.get(p.parentid);
			}
		}
		return new ResultPageList<PostFull>(pl);
	}

	private Map<String, String> getPostName(List<String> pids) {
		Map<String, String> dic = new HashMap<String, String>();
		if (pids == null || pids.size() == 0)
			return dic;
		String str = "";
		for (String id : pids) {
			if (!id.isEmpty())
				str += "'" + id + "',";
		}
		if (str.equals(""))
			return dic;
		str = str.substring(0, str.length() - 1);
		String sql = "SELECT ID,NAME FROM KTW_POST WHERE ID IN(" + str + ")";
		@SuppressWarnings("rawtypes")
		List list = getBySql(sql, null);
		if (list == null || list.size() == 0)
			return dic;
		for (Object o : list) {
			Object[] os = (Object[]) o;
			dic.put(String.valueOf(os[0]), String.valueOf(os[1]));
		}
		for (String id : pids)
			if (!dic.containsKey(id))
				dic.put(id, null);
		return dic;
	}

	private boolean isExist(PostEntity entity) {
		String condition = "ORGID='" + entity.getOrgid() + "' AND NAME='" + entity.getName().replace("'", "''")
				+ "'";
		return getCountByCondition(condition) > 0;
	}

	public ResultList<PostFull> getInfo(String orgId) {
		String sql = "SELECT PARENTID FROM KTW_ORGANIZE WHERE ID='" + orgId + "'";
		List<PostEntity> list = getByFilter("ORGID='" + orgId + "' OR ORGID IN(" + sql + ")");
		List<PostFull> _list = new ArrayList<PostFull>();
		if (list == null || list.size() == 0)
			return new ResultList<PostFull>(_list);
		List<String> pids = new ArrayList<String>();
		for (PostEntity p : list) {
			_list.add(p.convert());
			String pid = p.getParentid();
			if (pid != null && !pid.trim().isEmpty() && !pids.contains(pid))
				pids.add(pid);
		}
		Map<String, String> dics = getPostName(pids);
		for (PostFull p : _list) {
			if (p.parentid == null || p.parentid.isEmpty())
				continue;
			p.parentname = dics.get(p.parentid);
		}
		return new ResultList<PostFull>(_list);
	}

	public Result<String> insertEx(PostEntity entity) {
		entity.setName(entity.getName().trim());
		entity.setSyscreatetime(new Timestamp(new Date().getTime()));
		entity.setSysupdatetime(new Timestamp(new Date().getTime()));
		if (isExist(entity))
			return new Result<String>("当前组织已存在该名称的岗位");
		add(entity);
		return new Result<String>("true");
	}

	public Result<String> updateEx(PostEntity entity) {
		entity.setSysupdatetime(new Timestamp(new Date().getTime()));
		update(entity);
		return new Result<String>(true);
	}

	public Result<String> updateMainPost(PostEntity entity) {
		PostEntity e = dao.findOne(entity.getId());
		if (e == null)
			return new Result(false, "未找到实体");
		e.setMainpost(entity.getMainpost());
		e.setSysupdatetime(new Timestamp(new Date().getTime()));
		update(e);
		return new Result<String>(true);
	}
}
package com.kingtopware.onemap.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.K_FLOWDao;
import com.kingtopware.onemap.entity.K_FLOWEntity;
import com.kingtopware.onemap.service.K_FLOWService;

@Component
public class K_FLOWServiceImpl extends BaseServiceImpl<K_FLOWEntity> implements K_FLOWService {

	@Resource
	public K_FLOWDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public K_FLOWServiceImpl() {
		tableName = "K_FLOW";
	}

	public List<K_FLOWEntity> getflow() {
		String condition = "SELECT * FROM " + tableName + " ORDER BY OID";
		return getBySql(condition, K_FLOWEntity.class);
	}

	public void deletenode(String id) {
		K_FLOWEntity entity = dao.findOne(id);
		delete(entity);
	}

	public void addnode(String name) {
		String condition = "SELECT ID FROM " + "K_APPROVE" + " WHERE NAME=" + name;

	}

	public void updateflow(String id, String approves) {
		// K_FLOWEntity entity = dao.findOne(id);
		K_FLOWEntity entity = findOne(id);
		entity.setApproves(approves);
		// ((BaseService<K_FLOWEntity>) dao).update(entity);

		update(entity);
	}

	public void updatef(K_FLOWEntity flow) {
		update(flow);
	}

	public void addflow(K_FLOWEntity flow) {
		add(flow);
	}

	public Result<String> getModules(String flowtype, String flowname, String nodename) {
		List<K_FLOWEntity> li = getByFilter(" KTYPE='Flow' and KVALUE='" + flowname + "'");
		if (li.size() == 0) {
			new Result<String>(false, "未找到流程名称：" + flowname);
		}
		List<K_FLOWEntity> li2 = getByFilter(
				" KTYPE='Node' and KVALUE='" + nodename + "' and PID='" + li.get(0).getId() + "'");
		if (li2.size() == 0) {
			return new Result<String>(li.get(0).getApproves());
		}
		return new Result<String>(li2.get(0).getApproves());
	}
}

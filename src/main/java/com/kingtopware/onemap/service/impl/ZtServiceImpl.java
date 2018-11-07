
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.ZtDao;
import com.kingtopware.onemap.entity.ZtEntity;
import com.kingtopware.onemap.service.ZtService;

@Component
public class ZtServiceImpl extends BaseServiceImpl<ZtEntity> implements ZtService {
	@Resource
	public ZtDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ZtServiceImpl() {
		tableName = "fc_zt";
	}
}
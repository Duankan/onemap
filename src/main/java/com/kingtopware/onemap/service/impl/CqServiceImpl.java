
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.CqDao;
import com.kingtopware.onemap.entity.CqEntity;
import com.kingtopware.onemap.service.CqService;

@Component
public class CqServiceImpl extends BaseServiceImpl<CqEntity> implements CqService {
	@Resource
	public CqDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public CqServiceImpl() {
		tableName = "fc_cq";
	}
}

package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.DyDao;
import com.kingtopware.onemap.entity.DyEntity;
import com.kingtopware.onemap.service.DyService;

@Component
public class DyServiceImpl extends BaseServiceImpl<DyEntity> implements DyService {
	@Resource
	public DyDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public DyServiceImpl() {
		tableName = "fc_dy";
	}
}
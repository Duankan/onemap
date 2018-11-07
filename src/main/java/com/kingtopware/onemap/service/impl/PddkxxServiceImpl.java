
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.PddkxxDao;
import com.kingtopware.onemap.entity.PddkxxEntity;
import com.kingtopware.onemap.service.PddkxxService;

@Component
public class PddkxxServiceImpl extends BaseServiceImpl<PddkxxEntity> implements PddkxxService {
	@Resource
	public PddkxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public PddkxxServiceImpl() {
		tableName = "T_INF_ONEMAP_PDDKXXB";
	}
}
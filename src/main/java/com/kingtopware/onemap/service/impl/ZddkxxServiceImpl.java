package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.ZddkxxDao;
import com.kingtopware.onemap.entity.ZddkxxEntity;
import com.kingtopware.onemap.service.ZddkxxService;

@Component
public class ZddkxxServiceImpl extends BaseServiceImpl<ZddkxxEntity> implements ZddkxxService {
	@Resource
	public ZddkxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ZddkxxServiceImpl() {
		tableName = "T_INF_ONEMAP_ZDDKXXB";
	}
}


package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.ZsxDao;
import com.kingtopware.onemap.entity.ZsxEntity;
import com.kingtopware.onemap.service.ZsxService;

@Component
public class ZsxServiceImpl extends BaseServiceImpl<ZsxEntity> implements ZsxService {
	@Resource
	public ZsxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ZsxServiceImpl() {
		tableName = "fc_zsx";
	}
}
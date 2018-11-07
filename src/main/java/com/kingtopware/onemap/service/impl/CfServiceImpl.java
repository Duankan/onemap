
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.CfDao;
import com.kingtopware.onemap.entity.CfEntity;
import com.kingtopware.onemap.service.CfService;

@Component
public class CfServiceImpl extends BaseServiceImpl<CfEntity> implements CfService {
	@Resource
	public CfDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public CfServiceImpl() {
		tableName = "fc_cf";
	}
}
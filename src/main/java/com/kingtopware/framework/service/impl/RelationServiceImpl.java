package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.dao.RelationDao;
import com.kingtopware.framework.entity.RelationEntity;
import com.kingtopware.framework.service.RelationService;

@Component
public class RelationServiceImpl extends BaseServiceImpl<RelationEntity> implements RelationService {
	private static Logger logger=Logger.getLogger(RelationServiceImpl.class);
	@Resource
	public RelationDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public RelationServiceImpl() {
		tableName = "KTW_RELATION";
	}
}

package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.dao.SystradecodeDao;
import com.kingtopware.framework.entity.SystradecodeEntity;
import com.kingtopware.framework.service.SystradecodeService;
import com.kingtopware.framework.service.impl.BaseServiceImpl;

@Component
public class SystradecodeServiceImpl extends BaseServiceImpl<SystradecodeEntity> implements SystradecodeService {
	private static Logger logger=Logger.getLogger(SystradecodeServiceImpl.class);
	@Resource
	public SystradecodeDao dao;	

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public SystradecodeServiceImpl() {
		tableName = "systradecode";
	}
}
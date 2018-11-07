
package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.dao.SyslandcodeDao;
import com.kingtopware.framework.entity.SyslandcodeEntity;
import com.kingtopware.framework.service.SyslandcodeService;
import com.kingtopware.framework.service.impl.BaseServiceImpl;


@Component
public class SyslandcodeServiceImpl extends BaseServiceImpl<SyslandcodeEntity> implements SyslandcodeService {
	private static Logger logger=Logger.getLogger(SyslandcodeServiceImpl.class);
	@Resource
	public SyslandcodeDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public SyslandcodeServiceImpl() {
		tableName = "syslandcode";
	}
}
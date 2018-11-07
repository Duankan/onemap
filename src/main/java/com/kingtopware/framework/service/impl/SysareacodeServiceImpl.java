
package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.dao.SysareacodeDao;
import com.kingtopware.framework.entity.SysareacodeEntity;
import com.kingtopware.framework.service.SysareacodeService;
import com.kingtopware.framework.service.impl.BaseServiceImpl;


@Component
public class SysareacodeServiceImpl extends BaseServiceImpl<SysareacodeEntity> implements SysareacodeService {
	private static Logger logger=Logger.getLogger(SysareacodeServiceImpl.class);
	@Resource
	public SysareacodeDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public SysareacodeServiceImpl() {
		tableName = "sysareacode";
	}
}
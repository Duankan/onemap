
package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.dao.Sysareacode2Dao;
import com.kingtopware.framework.entity.Sysareacode2Entity;
import com.kingtopware.framework.service.Sysareacode2Service;
import com.kingtopware.framework.service.impl.BaseServiceImpl;


@Component
public class Sysareacode2ServiceImpl extends BaseServiceImpl<Sysareacode2Entity> implements Sysareacode2Service {
	private static Logger logger=Logger.getLogger(Sysareacode2ServiceImpl.class);
	@Resource
	public Sysareacode2Dao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public Sysareacode2ServiceImpl() {
		tableName = "sysareacode2";
	}
}
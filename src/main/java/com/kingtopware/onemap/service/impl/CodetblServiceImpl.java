
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.CodetblDao;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.service.CodetblService;

@Component
public class CodetblServiceImpl extends BaseServiceImpl<CodetblEntity> implements CodetblService {
	@Resource
	public CodetblDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public CodetblServiceImpl() {
		tableName = "fc_codetbl";
	}
}
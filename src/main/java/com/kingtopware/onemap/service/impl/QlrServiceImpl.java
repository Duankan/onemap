
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.QlrDao;
import com.kingtopware.onemap.entity.QlrEntity;
import com.kingtopware.onemap.service.QlrService;

@Component
public class QlrServiceImpl extends BaseServiceImpl<QlrEntity> implements QlrService {
	@Resource
	public QlrDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public QlrServiceImpl() {
		tableName = "fc_qlr";
	}
}
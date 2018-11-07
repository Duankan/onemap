
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.AjdjxxDao;
import com.kingtopware.onemap.entity.AjdjxxEntity;
import com.kingtopware.onemap.service.AjdjxxService;

@Component
public class AjdjxxServiceImpl extends BaseServiceImpl<AjdjxxEntity> implements AjdjxxService {
	@Resource
	public AjdjxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public AjdjxxServiceImpl() {
		tableName = "T_INF_ONEMAP_AJDJXXB";
	}
}
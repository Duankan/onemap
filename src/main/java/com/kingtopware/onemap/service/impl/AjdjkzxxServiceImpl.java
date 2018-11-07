
package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.AjdjkzxxDao;
import com.kingtopware.onemap.entity.AjdjkzxxEntity;
import com.kingtopware.onemap.service.AjdjkzxxService;

@Component
public class AjdjkzxxServiceImpl extends BaseServiceImpl<AjdjkzxxEntity> implements AjdjkzxxService {
	@Resource
	public AjdjkzxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public AjdjkzxxServiceImpl() {
		tableName = "T_INF_ONEMAP_AJDJKZXXB";
	}
}

package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.WfandkxxDao;
import com.kingtopware.onemap.entity.WfandkxxEntity;
import com.kingtopware.onemap.service.WfandkxxService;

@Component
public class WfandkxxServiceImpl extends BaseServiceImpl<WfandkxxEntity> implements WfandkxxService {
	@Resource
	public WfandkxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public WfandkxxServiceImpl() {
		tableName = "T_INF_ONEMAP_WFANDKXXB";
	}
}

package com.kingtopware.onemap.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.Inf_onemap_glxxbDao;
import com.kingtopware.onemap.entity.Inf_onemap_glxxbEntity;
import com.kingtopware.onemap.service.Inf_onemap_glxxbService;

@Component
public class Inf_onemap_glxxbServiceImpl extends BaseServiceImpl<Inf_onemap_glxxbEntity> implements Inf_onemap_glxxbService {
	@Resource
	public Inf_onemap_glxxbDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public Inf_onemap_glxxbServiceImpl() {
		tableName = "t_inf_onemap_glxxb";
	}
}
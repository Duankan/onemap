package com.kingtopware.framework.service;

import java.util.List;

import com.kingtopware.framework.entity.OrganizeEntity;
import com.kingtopware.framework.entity.OrganizeExEntity;

public interface OrganizeService extends BaseService<OrganizeEntity> {

	public List<OrganizeExEntity> getOrganizeByID(String flag, String id);
}
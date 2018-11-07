package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.entity.K_APPROVEEntity;
import com.kingtopware.onemap.entity.K_FLOWEntity;

public interface K_APPROVEService extends BaseService<K_APPROVEEntity>{
	public List<K_APPROVEEntity> getapproves(String approves);
}

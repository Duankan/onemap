package com.kingtopware.onemap.service;

import java.util.List;



import com.kingtopware.framework.bean.LifeCycleInfo;
import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.entity.BcgdEntity;


public interface LayerService extends BaseService<BcgdEntity> {
	
	public LifeCycleInfo getLifeCycle(String type, String uid);
}

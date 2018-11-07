package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.DyaqFull;
import com.kingtopware.onemap.entity.DyEntity;
import com.kingtopware.onemap.entity.DyaqEntity;

public interface DyaqService extends BaseService<DyEntity> {
	//根据其实时间筛选
	public List<DyaqFull> getInfoByTime(String startTime, String endTime);
	public List<DyaqFull> getInfoByTime(String startTime, String endTime,String djjg);
	
}


package com.kingtopware.onemap.service;

import com.kingtopware.onemap.bean.DJFull;
import com.kingtopware.onemap.entity.FwsxEntity;

import java.util.List;

import com.kingtopware.framework.service.BaseService;

public interface FwsxService extends BaseService<FwsxEntity> {

	List<FwsxEntity> getByFilterlike(String where, Object object);

	List<DJFull> getDJFull(String where, Object object);
}
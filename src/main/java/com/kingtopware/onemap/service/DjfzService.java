
package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.DjfzFull;
import com.kingtopware.onemap.entity.DjfzEntity;


/**
 * 
 * =====================================
 * @author luxiaolin
 * @date 2017-9-11
 * @description
 * =====================================
 */
public interface DjfzService extends BaseService<DjfzEntity> {
	
	public List<DjfzFull> getInfoBydjfz(String starttime, String endtime, String countyarea,String flag);
	
}
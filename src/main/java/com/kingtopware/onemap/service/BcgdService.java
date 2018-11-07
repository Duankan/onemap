
package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.BcgdFull;
import com.kingtopware.onemap.entity.BcgdEntity;

public interface BcgdService extends BaseService<BcgdEntity> {
	
	public List<BcgdFull> getInfoBybcgd(String starttime, String endtime, String countyarea,String flag);
}
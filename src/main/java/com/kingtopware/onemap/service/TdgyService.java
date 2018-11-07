
package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.TdgyFull;
import com.kingtopware.onemap.bean.TdgyGhydFull;
import com.kingtopware.onemap.entity.TdgyEntity;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月5日
 * @description：土地供应接口定义
 * =====================================
 */
public interface TdgyService extends BaseService<TdgyEntity> {
	public List<TdgyFull> getinfobytdgy(String starttime, String endtime, String countyarea,String flag);
	
	public List<TdgyGhydFull> getinfobyghyt(String starttime, String endtime, String countyarea,String flag);
}
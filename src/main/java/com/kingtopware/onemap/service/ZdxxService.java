
package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.ZdxxLyxzFull;
import com.kingtopware.onemap.entity.ZdxxEntity;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月31日
 * @description： 征地信息接口类
 * =====================================
 */
public interface ZdxxService extends BaseService<ZdxxEntity> {
	//根据所选时间统计不同市县区征收面积，以土地利用现状进行分类
	public List<ZdxxLyxzFull> getInfoByzdxs(String starttime, String endtime, String countyarea,String flag);
	
}
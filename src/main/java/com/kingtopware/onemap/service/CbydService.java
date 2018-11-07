package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.CbydFull;
import com.kingtopware.onemap.bean.CbydListFull;
import com.kingtopware.onemap.entity.CbydEntity;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月2日
 * @description：储备用地服务接口
 * =====================================
 */
public interface CbydService extends BaseService<CbydEntity> {
	// 时空维度的储备土地审批统计
	public List<CbydListFull> getinfobyxkwd(String nf);

	// 行政区图上统计
	public List<CbydFull> getinfobyxzq(String starttime, String endtime);

}
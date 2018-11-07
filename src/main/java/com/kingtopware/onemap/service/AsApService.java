package com.kingtopware.onemap.service;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.entity.AsApEntity;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年10月28日
 * @description：辅助审批接口
 * =====================================
 */
public interface AsApService extends BaseService<AsApEntity> {
	public AsApEntity setApprovalInfo(String starttime, String endtime, String countyarea, String flag);

	public AsApEntity getInfobyid(String guid);
}
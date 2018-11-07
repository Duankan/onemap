package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.CfdjFull;
import com.kingtopware.onemap.entity.CfEntity;
import com.kingtopware.onemap.entity.CfdjEntity;
/**
 * ==========================
 * @author: xuexian
 * @date: 2018/5/8
 * @description:查封登记接口类
 * ==========================
 */
public interface CfdjService extends BaseService<CfEntity> {
	public List<CfdjFull> getInfoByDjsx(String starttime, String endtime);
	
	public List<CfdjFull> getInfoByDjsx(String starttime, String endtime,String cfjg);
}

package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.bean.JsydSphjListFull;
import com.kingtopware.onemap.bean.JsydspGhyt;
import com.kingtopware.onemap.bean.JsydspListFull;
import com.kingtopware.onemap.bean.JsydspNa;
import com.kingtopware.onemap.entity.JsydspEntity;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月28日
 * @description：建设用地审批接口类
 * =====================================
 */
public interface JsydspService extends BaseService<JsydspEntity>{
	//审批单位不同统计（市级、省级、国务院）/ 以月份、季度、年份为单位，统计不同地区、不同审批单位，根据土地利用现状分类
	public List<JsydspListFull> getInfoByyd(String starttime, String endtime, String countyarea,String flag);
	//市政府审批的项目根据土地利用现状、行政区进行分类 / 以月份、季度、年份为单位，统计不同地区，根据土地利用现状进行分类
	public List<JsydSphjListFull> getInfoByys(String starttime, String endtime, String countyarea,String flag);
	
	//以月份、季度、年份为单位，统计不同地区，根据土地规划用途进行分类
	public List<JsydspGhyt> getInfoByghyt(String starttime, String endtime, String countyarea,String flag);
	
	//根据年份统计数据
	public List<JsydspNa> getInfoByNa(String year);
	public JsydspEntity GetBybusiness(String guid);
	public void Export(String result);
	//返回数据表中数据分布的年份
	public Result<String> getAllDataYear() throws Exception;
	
}

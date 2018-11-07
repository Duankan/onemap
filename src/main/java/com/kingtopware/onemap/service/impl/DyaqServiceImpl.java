package com.kingtopware.onemap.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.bean.DyaqFull;
import com.kingtopware.onemap.dao.DyaqDao;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.entity.DyEntity;
import com.kingtopware.onemap.service.DyaqService;

@Component
public class DyaqServiceImpl extends BaseServiceImpl<DyEntity> implements DyaqService {
	@Resource
	public DyaqDao dao;
	
	@Override
	public void getBaseDao() {
		if(baseDao == null) {
			baseDao = dao;
		}
	}
	
	public DyaqServiceImpl() {
		tableName = "fc_dy";
	}
	
	private Map<String, String> map=null;
	
	public List<DyaqFull> getInfoByTime(String startTime, String endTime) {
		if(map==null || map.size()<1){
			map=new HashMap<String, String>();
			List<CodetblEntity> codetabl=getBySql("select * from fc_codetbl",CodetblEntity.class);
		     for (CodetblEntity codetblEntity : codetabl) {
		    	 map.put(codetblEntity.getCodetype().trim()+codetblEntity.getCode().trim(),
		    			 codetblEntity.getCodename().trim());
	        	}
		}
		
		String sql = " select * from fc_dy ";
		sql += " where djsj between '" + startTime + "' and '" + endTime + "'";
		List<DyEntity> entityList = getBySql(sql);
		List<DyaqFull> DyaqFullList = new ArrayList<DyaqFull>();
		for (DyEntity dyEntity : entityList) {
			DyaqFull DyaqFull = new DyaqFull();
			DyaqFull.setBDCDYH(dyEntity.getBdcdyh());
			DyaqFull.setDYMJ(dyEntity.getDymj());
			DyaqFull.setDYFS(dyEntity.getDyfs());
			String dyfs="抵押方式"+(dyEntity.getDyfs()+"").trim();
	         if(map.containsKey(dyfs))
	        	 DyaqFull.setDYFS(map.get(dyfs));
			DyaqFull.setDyqr(dyEntity.getDyqr());
			DyaqFull.setDyr(dyEntity.getDyr());
			DyaqFull.setDJSJ(dyEntity.getDjsj().toString());
			DyaqFull.setZQSE(dyEntity.getZqse()+"");
			DyaqFull.setZWLXQSSJ(dyEntity.getKsrq().toString());
			DyaqFull.setZWLXJSSJ(dyEntity.getJsrq().toString());
			DyaqFull.setZwr(dyEntity.getZwr());
			if((dyEntity.getBdcdyh()+"").trim().length()>5)
        	DyaqFull.setQXDM((dyEntity.getBdcdyh()+"").trim().substring(0, 6));
			DyaqFullList.add(DyaqFull);
		}
		return DyaqFullList;
	}

	public List<DyaqFull> getInfoByTime(String startTime, String endTime, String djjg) {
		if(map==null || map.size()<1){
			map=new HashMap<String, String>();
			List<CodetblEntity> codetabl=getBySql("select * from fc_codetbl",CodetblEntity.class);
		     for (CodetblEntity codetblEntity : codetabl) {
		    	 map.put(codetblEntity.getCodetype().trim()+codetblEntity.getCode().trim(),
		    			 codetblEntity.getCodename().trim());
	        	}
		}
		
		
		
		String sql = " select * from fc_dy ";
		sql += " where djsj between '" + startTime + "' and '" + endTime + "'";
		sql += " and dyqr like '%" + djjg + "%'";
		List<DyEntity> entityList = getBySql(sql);
		List<DyaqFull> DyaqFullList = new ArrayList<DyaqFull>();
		for (DyEntity dyEntity : entityList) {
			DyaqFull DyaqFull = new DyaqFull();
			DyaqFull.setBDCDYH(dyEntity.getBdcdyh());
			DyaqFull.setDYMJ(dyEntity.getDymj());
			DyaqFull.setDYFS(dyEntity.getDyfs());
			DyaqFull.setDyqr(dyEntity.getDyqr());
			DyaqFull.setDyr(dyEntity.getDyr());
			DyaqFull.setDJSJ(dyEntity.getDjsj().toString());
			DyaqFull.setZQSE(dyEntity.getZqse()+"");
			DyaqFull.setZWLXQSSJ(dyEntity.getKsrq().toString());
			DyaqFull.setZWLXJSSJ(dyEntity.getJsrq().toString());
			DyaqFull.setZwr(dyEntity.getZwr());
			if((dyEntity.getBdcdyh()+"").trim().length()>5)
	        DyaqFull.setQXDM((dyEntity.getBdcdyh()+"").trim().substring(0, 6));
			DyaqFullList.add(DyaqFull);
		}
		return DyaqFullList;
	}

}

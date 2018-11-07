package com.kingtopware.onemap.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.bean.CfdjFull;
import com.kingtopware.onemap.dao.CfdjDao;
import com.kingtopware.onemap.entity.CfEntity;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.service.CfdjService;

@Component
public class CfdjServiceImpl extends BaseServiceImpl<CfEntity> implements CfdjService {
	@Resource
	private CfdjDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public CfdjServiceImpl() {
		tableName = "fc_cf";
	}

	private Map<String, String> map=null;
	
	public List<CfdjFull> getInfoByDjsx(String starttime, String endtime) {
		
		if(map==null || map.size()<1){
			map=new HashMap<String, String>();
			List<CodetblEntity> codetabl=getBySql("select * from fc_codetbl",CodetblEntity.class);
		     for (CodetblEntity codetblEntity : codetabl) {
		    	 map.put(codetblEntity.getCodetype().trim()+codetblEntity.getCode().trim(),
		    			 codetblEntity.getCodename().trim());
	        	}
		}
		
		String userSql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;
		String sql = " select * from fc_cf ";
		userSql = sql + " where status = 1 and  aprldate between '" + mStarttime + "' and '" + mEndtime + "'";
		List<CfEntity> CfdjList = getBySql(userSql);
		List<CfdjFull>  fullList = new ArrayList<CfdjFull>();
		for(int i = 0; i < CfdjList.size(); i++) {
			CfdjFull cfdjFull = new CfdjFull();
			cfdjFull.setXH(i+1);
			cfdjFull.setZxswh(CfdjList.get(i).getZxswh());
			cfdjFull.setCFQSSJ(CfdjList.get(i).getSealdate().toString());
			cfdjFull.setCFJSSJ(CfdjList.get(i).getUsldate().toString());
			cfdjFull.setBDCDYH(CfdjList.get(i).getBdcdyh());
			cfdjFull.setCFJG(CfdjList.get(i).getSealcorp());
			cfdjFull.setDJSJ(CfdjList.get(i).getAprldate()+"");
			cfdjFull.setSharenum(CfdjList.get(i).getSharenum());
			cfdjFull.setProposer(CfdjList.get(i).getProposer() );
			cfdjFull.setBproposer(CfdjList.get(i).getBproposer());
			cfdjFull.setCflx(CfdjList.get(i).getCflx());
			String cflx="查封类型"+(CfdjList.get(i).getCflx()+"").trim();
	        if(map.containsKey(cflx))
	        	 cfdjFull.setCflx(map.get(cflx));
			if((CfdjList.get(i).getBdcdyh()+"").trim().length()>5)
				cfdjFull.setQXDM((CfdjList.get(i).getBdcdyh()+"").trim().substring(0, 6));
			fullList.add(cfdjFull);
		}
		return fullList;
	}

	public List<CfdjFull> getInfoByDjsx(String starttime, String endtime, String cfjg) {
		
		if(map==null || map.size()<1){
			map=new HashMap<String, String>();
			List<CodetblEntity> codetabl=getBySql("select * from fc_codetbl",CodetblEntity.class);
		     for (CodetblEntity codetblEntity : codetabl) {
		    	 map.put(codetblEntity.getCodetype().trim()+codetblEntity.getCode().trim(),
		    			 codetblEntity.getCodename().trim());
	        	}
		}
		
		String userSql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;
		String sql = " select * from fc_cf ";
		userSql = sql + " where status = 1 and aprldate between '" + mStarttime + "' and '" + mEndtime + "'";
		userSql += " and sealcorp like '%" + cfjg + "%'";
		List<CfEntity> CfdjList = getBySql(userSql);
		List<CfdjFull>  fullList = new ArrayList<CfdjFull>();
		for(int i = 0; i < CfdjList.size(); i++) {
			CfdjFull cfdjFull = new CfdjFull();
			cfdjFull.setXH(i+1);
			cfdjFull.setZxswh(CfdjList.get(i).getZxswh());
			cfdjFull.setCFQSSJ(CfdjList.get(i).getSealdate().toString());
			cfdjFull.setCFJSSJ(CfdjList.get(i).getUsldate().toString());
			cfdjFull.setBDCDYH(CfdjList.get(i).getBdcdyh());
			cfdjFull.setCFJG(CfdjList.get(i).getSealcorp());
			cfdjFull.setDJSJ(CfdjList.get(i).getAprldate()+"");
			cfdjFull.setSharenum(CfdjList.get(i).getSharenum());
			cfdjFull.setProposer(CfdjList.get(i).getProposer() );
			cfdjFull.setBproposer(CfdjList.get(i).getBproposer());
			cfdjFull.setCflx(CfdjList.get(i).getCflx());
			String cflx="查封类型"+(CfdjList.get(i).getCflx()+"").trim();
	        if(map.containsKey(cflx))
	        	 cfdjFull.setCflx(map.get(cflx));
			if((CfdjList.get(i).getBdcdyh()+"").trim().length()>5)
				cfdjFull.setQXDM((CfdjList.get(i).getBdcdyh()+"").trim().substring(0, 6));
			fullList.add(cfdjFull);
		}
		return fullList;
	}

}


package com.kingtopware.onemap.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.ZdjbxxDao;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.entity.ZdjbxxEntity;
import com.kingtopware.onemap.entity.ZrzEntity;
import com.kingtopware.onemap.service.ZdjbxxService;

@Component
public class ZdjbxxServiceImpl extends BaseServiceImpl<ZdjbxxEntity> implements ZdjbxxService {
	@Resource
	public ZdjbxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ZdjbxxServiceImpl() {
		tableName = "bdc_zdjbxx";
	}
	
	private Map<String, String> map=null;
	
	public List<ZdjbxxEntity> getByFilter(String where,String orderby) {
		List<ZdjbxxEntity> list=getBySql(getSql(where, null));
		if(map==null || map.size()<1){
			map=new HashMap<String, String>();
			List<CodetblEntity> codetabl=getBySql("select * from fc_codetbl",CodetblEntity.class);
		     for (CodetblEntity codetblEntity : codetabl) {
		    	 map.put(codetblEntity.getCodetype().trim()+codetblEntity.getCode().trim(),
		    			 codetblEntity.getCodename().trim());
	        	}
		}
		
		
		
		for(int i=0;i<list.size();i++)
		 { 
			 String qllx="权利类型"+list.get(i).getQllx();
	         if(map.containsKey(qllx))
	        	 list.get(i).setQllx(map.get(qllx));
	         
	         String qlxz="权利性质"+list.get(i).getQlxz();
	         if(map.containsKey(qlxz))
	        	 list.get(i).setQlxz(map.get(qlxz));
	         
	         String qlsdfs="权利设定方式"+list.get(i).getQlsdfs();
	         if(map.containsKey(qlsdfs))
	        	 list.get(i).setQlsdfs(map.get(qlsdfs));
	         
	         String zdtzm="特征码"+list.get(i).getZdtzm();
	         if(map.containsKey(zdtzm))
	        	 list.get(i).setZdtzm(list.get(i).getZdtzm()+"("+map.get(zdtzm)+")");
		    
	         String yt="地类代码"+list.get(i).getYt();
	         if(map.containsKey(yt))
	        	 list.get(i).setYt(map.get(yt));
	         
	         String mjdw="面积单位"+list.get(i).getMjdw();
	         if(map.containsKey(mjdw))
	        	 list.get(i).setMjdw(map.get(mjdw));
		 }
		
		return list;
	}
}
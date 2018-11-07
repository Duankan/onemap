
package com.kingtopware.onemap.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.ZrzDao;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.entity.ZrzEntity;
import com.kingtopware.onemap.service.ZrzService;

@Component
public class ZrzServiceImpl extends BaseServiceImpl<ZrzEntity> implements ZrzService {
	@Resource
	public ZrzDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ZrzServiceImpl() {
		tableName = "bdc_zrz";
	}
	
	
	public List<ZrzEntity> getByFilter(String where,String orderby) {
		List<ZrzEntity> list=getBySql(getSql(where, null));
		
		for(int i=0;i<list.size();i++)
		 {
			if(list.get(i).getFwjg()!=null)
			{
			 String fwjg= "'"+list.get(i).getFwjg()+"'";
			 String codesql="select * from fc_codetbl where codetype = '房屋结构' and code = "+ fwjg;
			 List<CodetblEntity> codetabl=getBySql(codesql,CodetblEntity.class);
			 if(codetabl!=null && codetabl.size()>0)
				 list.get(i).setFwjg(codetabl.get(0).getCodename());
			}
			
			if(list.get(i).getFwjg()!=null)
			{
			 String ghyt= "'"+list.get(i).getGhyt()+"'";
			 String codesql="select * from fc_codetbl where codetype = '房屋用途' and code = "+ ghyt;
			 List<CodetblEntity> codetabl=getBySql(codesql,CodetblEntity.class);
			 if(codetabl!=null && codetabl.size()>0)
				 list.get(i).setGhyt(codetabl.get(0).getCodename());
			}
		 }
		
		return list;
	}
	
}
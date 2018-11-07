package com.kingtopware.onemap.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.dao.K_APPROVEDao;
import com.kingtopware.onemap.entity.K_APPROVEEntity;
import com.kingtopware.onemap.entity.K_FLOWEntity;
import com.kingtopware.onemap.service.K_APPROVEService;

@Component
public class K_APPROVEServiceImpl extends BaseServiceImpl<K_APPROVEEntity>implements K_APPROVEService{
	@Resource
	public K_APPROVEDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public K_APPROVEServiceImpl() {
		tableName = "K_APPROVE";
	}

	public List<K_APPROVEEntity> getapproves(String approves){
		String condition;
		if(approves.equals("all")){condition="SELECT * FROM " +tableName;}
		else{String a=approves;
		String[] b= a.split(",");
	    condition = "SELECT * FROM " +tableName+" WHERE ";
		for(int i=0;i<b.length-1;i++){
			condition=condition+"ID ='"+b[i]+"' OR";
		}
		condition=condition+"ID ='"+b[b.length-1]+"'";
		condition=condition+" ORDER BY OID";}
		return getBySql(condition, K_APPROVEEntity.class);
	}
}

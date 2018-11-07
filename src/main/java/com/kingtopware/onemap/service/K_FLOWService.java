package com.kingtopware.onemap.service;

import java.util.List;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.entity.K_FLOWEntity;

public interface K_FLOWService extends BaseService<K_FLOWEntity> {
	public List<K_FLOWEntity> getflow(); 
	public void updateflow(String id, String approves); 
	public void updatef(K_FLOWEntity flow); 
	public void addflow(K_FLOWEntity flow); 
	public void deletenode(String id);
	public void addnode(String name);
	public Result<String> getModules(String flowtype,String flowname,String nodename);
}

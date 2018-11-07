package com.kingtopware.onemap.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.BaseService;
import com.kingtopware.onemap.entity.K_FJGLEntity;

@Component
public interface K_FJGLService extends BaseService<K_FJGLEntity> {

	Result<List<K_FJGLEntity>> GetFiles(String fid);

	Result<String> PreFile(String id);

	Result<List<K_FJGLEntity>> GetAffix(String fid);
	
	String Download(String path);
	
	String GetFile(String path);
}

package com.kingtopware.framework.service;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.FolderEntity;

@Component
public interface FolderService extends BaseService<FolderEntity> {

	public boolean deleteByFolderId(String folderId);

	public Result<String> deleteByID(String id);
}
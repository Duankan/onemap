package com.kingtopware.framework.service.impl;

import java.util.ArrayList;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.dao.FileDao;
import com.kingtopware.framework.dao.FolderDao;
import com.kingtopware.framework.entity.FolderEntity;
import com.kingtopware.framework.service.FolderService;

@Component
public class FolderServiceImpl extends BaseServiceImpl<FolderEntity> implements FolderService {
	private static Logger logger=Logger.getLogger(FolderServiceImpl.class);
	@Resource
	public FolderDao dao;

	@Resource
	public FileDao fileDao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public FolderServiceImpl() {
		tableName = "KTW_FOLDER";
	}

	public boolean deleteByFolderId(String folderId) {
		try {
			return fileDao.deleteByFolderId(folderId) > 0;
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return false;
		}
	}

	public Result<String> deleteByID(String id) {
		String sql = "with recursive c as (select a.* from KTW_FOLDER a ";
		sql += "where a.ID='" + id + "' union select b.* from KTW_FOLDER";
		sql += " b inner join c on b.PARENTID=c.ID) select c.ID from c";
		ArrayList list = (ArrayList) getBySql(sql, null);
		for (Object i : list)
			dao.delete(i.toString());
		for (Object i : list)
			deleteByFolderId(i.toString());
		return new Result<String>(id);
	}
}
package com.kingtopware.framework.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.kingtopware.framework.dao.BaseDao;
import com.kingtopware.framework.entity.FileEntity;

public interface FileDao extends BaseDao<FileEntity, String> {
	@Modifying
	@Transactional
	@Query(value = "delete from  ktw_file t where t.folderid in(?1)", nativeQuery = true)
	int deleteByFolderId(String folderIds);
}
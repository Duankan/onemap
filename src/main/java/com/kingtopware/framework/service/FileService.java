package com.kingtopware.framework.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kingtopware.framework.bean.FileInfo;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.entity.FileEntity;

public interface FileService extends BaseService<FileEntity> {

	public ResultList<FileInfo> upload(MultipartFile[] files, String reluri, String basePath) throws Exception;

	public Result view(String reluri, String basePath);

	public boolean deleteFile(String basePath, String relPath);

	public Result<String> deleteByID(String basePath, String id);

	public boolean deleteByFolderId(String folderId);

	public Result<String> deleteInfo(String basePath, List<FileEntity> entitys);

	public ResultList<String> insertEx(List<FileEntity> entitys);
}

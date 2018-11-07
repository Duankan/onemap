package com.kingtopware.framework.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.kingtopware.framework.bean.FileInfo;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.dao.FileDao;
import com.kingtopware.framework.entity.FileEntity;
import com.kingtopware.framework.service.FileService;
import com.kingtopware.framework.util.DocUtil;

@Component
public class FileServiceImpl extends BaseServiceImpl<FileEntity> implements FileService {
	private static Logger logger=Logger.getLogger(FileServiceImpl.class);
	@Resource
	public FileDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public FileServiceImpl() {
		tableName = "KTW_FILE";
	}

	public ResultList<FileInfo> upload(MultipartFile[] files, String reluri, String basePath) throws Exception {
		if (files == null || files.length == 0)
			return new ResultList<FileInfo>(false, "未发现上传的文件");
		if (reluri.isEmpty())
			reluri = "upload\\";
		else {
			reluri = "upload\\" + reluri.replace('/', '\\');
			if (reluri.charAt(reluri.length() - 1) != '\\')
				reluri += "\\";
		}
		File f = new File(basePath + reluri);
		if (!f.exists() && !f.isDirectory()) {
			Boolean flag = f.mkdir();
			if (!flag)
				f.mkdirs();
		}
		List<FileInfo> fis = new ArrayList<FileInfo>();
		for (int i = 0; i < files.length; i++) {
			String byName = files[i].getOriginalFilename();
			String extName = byName.substring(byName.lastIndexOf('.'));
			String fileName = UUID.randomUUID().toString();
			FileOutputStream fs = new FileOutputStream(basePath + reluri + fileName + extName);
			byte[] buffer = new byte[1024 * 1024];
			int byteread = 0;
			Long bytesum = 0L;
			InputStream stream = files[i].getInputStream();
			while ((byteread = stream.read(buffer)) != -1) {
				bytesum += byteread;
				fs.write(buffer, 0, byteread);
				fs.flush();
			}
			fs.close();
			stream.close();
			FileInfo fi = new FileInfo();
			fi.setName(fileName);
			fi.setByname(byName);
			fi.setExtname(extName);
			fi.setSize(bytesum / 1024);
			fi.setPath(reluri.replace('\\', '/') + fileName + extName);
			fis.add(fi);
		}
		return new ResultList<FileInfo>(fis);
	}

	public Result view(String reluri, String basePath) {
		File tempFolder = new File(basePath + "temp");
		if (!tempFolder.isDirectory())
			tempFolder.mkdir();
		reluri=reluri.replace("\\", "/");
		String fileName = reluri.substring(reluri.lastIndexOf('/') + 1);
		String fExtName = reluri.substring(reluri.lastIndexOf('.'));
		String tExtName = convertExtName(fExtName);
		String fPath = basePath + reluri;
		String tPath = basePath + "temp\\" + fileName.replace(fExtName, tExtName == null ? fExtName : tExtName);
		File fFile = new File(fPath), tFile = new File(tPath);
		if (fFile.exists() && !tFile.exists()) {
			if (fExtName.equals(".xls") || fExtName.equals(".xlsx")) {
				//new DocUtil().excelToHtml(fPath, tPath);
				new DocUtil().excelToPdf(fPath, tPath);
			}
			else if (fExtName.equals(".ppt") || fExtName.equals(".pptx")) {
				new DocUtil().pptToPdf(fPath, tPath);
			}
			else if (fExtName.equals(".doc") || fExtName.equals(".docx")) {
				new DocUtil().wordToPdf(fPath, tPath);
			}
			return new Result<String>("temp/" + fileName.replace(fExtName, tExtName == null ? fExtName : tExtName));
		} else if (fFile.exists() && tFile.exists())
			return new Result<String>("temp/" + fileName.replace(fExtName, tExtName == null ? fExtName : tExtName));
		return new Result(false, "执行失败");
	}

	private String convertExtName(String path) {
		String extName = path.substring(path.lastIndexOf('.'));
		if (extName.equals(".xls") || extName.equals(".xlsx"))
			//return ".html";
			return ".pdf";
		else if (extName.equals(".doc") || extName.equals(".docx") || extName.equals(".ppt") || extName.equals(".pptx"))
			return ".pdf";
		else
			return null;
	}

	public boolean deleteFile(String basePath, String relPath) {
		if (relPath == null || relPath.isEmpty())
			return true;
		relPath = relPath.replace('/', '\\');
		if (relPath.charAt(0) == '\\')
			relPath = relPath.substring(1);
		File file = new File(basePath + relPath);
		if (file.exists() && file.isFile())
			return file.delete();
		return true;
	}

	public Result<String> deleteByID(String basePath, String id) {
		FileEntity entity = dao.findOne(id);
		dao.delete(entity);
		deleteFile(basePath, entity.getPath());
		return new Result<String>(id);
	}

	public boolean deleteByFolderId(String folderId) {
		try {
			return dao.deleteByFolderId(folderId) > 0;
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return false;
		}
	}

	public Result<String> deleteInfo(String basePath, List<FileEntity> entitys) {
		List<String> ids = new ArrayList<String>();
		for (FileEntity e : entitys)
			ids.add(e.getId());
		Iterable<FileEntity> es = dao.findAll(ids);
		for (FileEntity e : es)
			deleteFile(basePath, e.getPath());
		return delete(entitys);
	}

	public ResultList<String> insertEx(@RequestBody List<FileEntity> entitys) {
		Iterator<FileEntity> _fs = dao.save(entitys).iterator();
		List<String> ids = new ArrayList<String>();
		while (_fs.hasNext())
			ids.add(_fs.next().getId());
		return new ResultList<String>(ids);
	}

}

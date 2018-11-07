package com.kingtopware.onemap.service.impl;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.aspectj.weaver.ast.Var;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ContextLoader;

import com.alibaba.fastjson.JSONArray;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.framework.util.FtpUtil;
import com.kingtopware.framework.util.PropertyUtil;
import com.kingtopware.framework.util.ZipUtil;
import com.kingtopware.onemap.dao.K_FJGLDao;
import com.kingtopware.onemap.entity.K_FJGLEntity;
import com.kingtopware.onemap.service.K_FJGLService;

@Component
public class K_FJGLServiceImpl extends BaseServiceImpl<K_FJGLEntity> implements K_FJGLService {
	@Resource
	public K_FJGLDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public K_FJGLServiceImpl() {
		tableName = "K_FJGL";
	}

	public String Download(String ids) {
		// TODO Auto-generated method stub
		String p = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/") + "temp\\";
//		String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getContextPath()
//				+ "/temp/";
		String downurl = "temp/";

		File file = null;
		try {
			file = new File(p + "test");
			if (!file.exists()) {
				file.mkdir();
			} else {
				delFolder(p + "test");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		JSONArray jasonObject = JSONArray.parseArray(ids);
		if (jasonObject.size() < 1)
			return "";
		for (int i = 0; i < jasonObject.size(); i++) {
			K_FJGLEntity k = getById((String) jasonObject.get(i).toString());
			String kindname = k.getKindname();
			String path = k.getPath();
			File filec = null;
			try {
				filec = new File(p + file.getName() + "\\" + kindname);
				if (!filec.exists()) {
					filec.mkdir();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			FtpUtil.DownLoadFile(PropertyUtil.get("ftppath") + path,
					p + file.getName() + "\\" + kindname + "\\" + path.replace("/", "-"));
			// FtpUtil.DownLoadFile("ftp://administrator:123456@192.168.1.226/onemap/"
			// + path, p + file.getName() + "\\" + kindname + "\\" +
			// path.replace("/", "-"));
		}
		try {
			String zipPath = p + file.getName();
			File tempFile = new File(zipPath);
			if (tempFile.exists())
				tempFile.delete();
			ZipUtil.makeZip(new String[] { zipPath }, zipPath + ".zip");
			downurl = downurl + file.getName() + ".zip";
		} catch (Exception e) {

		}
		return downurl;
	}

	public Result<List<K_FJGLEntity>> GetFiles(String fid) {
		if (fid == null || "".equals(fid.trim())) {
			return new Result<List<K_FJGLEntity>>(false, "未发现参数值!");
		}
		List<K_FJGLEntity> li = getByFilter(" FID='" + fid + "'", "FILEORDER");
		return new Result<List<K_FJGLEntity>>(li);
	}

	public Result<List<K_FJGLEntity>> GetAffix(String fid) {
		// TODO Auto-generated method stub
		String condition = "SELECT * FROM " + tableName + " WHERE FID='" + fid + "' ORDER BY KINDORDER" + ","
				+ "FILEORDER";
		List<K_FJGLEntity> result = getBySql(condition, K_FJGLEntity.class);
		return new Result<List<K_FJGLEntity>>(result);
	}

	public String GetFile(String path) {
		// TODO Auto-generated method stub
		String p = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/") + "temp\\";

		String s1 = path.replace("/", "-");
		String filepath = p + s1;
		// FtpUtil.DownLoadFile("ftp://administrator:123456@192.168.1.226/onemap/"
		// + path,
		// "D:\\code\\OneMap\\V2.0\\Code\\trunk\\onemap\\src\\main\\webapp\\temp\\"
		// + s1);
		
		FtpUtil.DownLoadFile(PropertyUtil.get("ftppath") + path, filepath);
		return "temp/" + s1;
	}

	public Result<String> PreFile(String id) {
		String path = PropertyUtil.get("ftppath");
		if (path == null || "".equals(path.trim())) {
			return new Result<String>("未配置ftp路径,请检查配置项'ftppath'是否存在");
		}
		if (!path.endsWith("/")) {
			path += "/";
		}

		String basePath = PropertyUtil.get("websitepath");
		K_FJGLEntity fjgl = getById(id);
		String name = UUID.randomUUID() + fjgl.getFiletype();
		if (FtpUtil.DownLoadFile(path + "onemap/" + fjgl.getPath(), basePath + "temp\\" + name)) {
			return new Result<String>("temp\\" + name);
		} else {
			return new Result<String>(false, "准备文件失败!");
		}

	}

	/**
	 * 
	 * @author： luxiaolin
	 * 
	 * @param folderPath
	 *            文件夹完整绝对路径
	 * @description：删除文件夹
	 */
	public static void delFolder(String folderPath) {
		String p = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/") + "temp\\";
		try {
			delAllFile(folderPath); // 删除文件夹里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			java.io.File myFilePath = new java.io.File(filePath);
			String rootpath = p + "test";
			if (!rootpath.equalsIgnoreCase(filePath))
				myFilePath.delete(); // 删除空文件夹
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @author： luxiaolin
	 * 
	 * @param path
	 *            文件夹完整绝对路径
	 * @return
	 * @description：删除指定文件夹下所有文件
	 */
	public static boolean delAllFile(String path) {
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (!file.isDirectory()) {
			return flag;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + File.separator + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
			if (temp.isDirectory()) {
				delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
				delFolder(path + "/" + tempList[i]);// 再删除空文件夹
				flag = true;
			}
		}
		return flag;
	}

}

package com.kingtopware.framework.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.web.context.ContextLoader;

import com.google.common.io.Files;

/**
 * 
 * ===================================== @author： luxiaolin @date： 2017年9月14日
 * 
 * @description：文件处理工具类 =====================================
 */
public class FileUtils {

	/**
	 * 删除指定文件
	 * 
	 * @param path
	 */
	public static void DelFiles(String path) {
		File delFile = new File(path);
		if (delFile.exists()) {
			delFile.delete();
		}
	}

	/*
	 * 拷贝文件
	 */
	public static String CopyFile(String srcPath) throws Exception {
		String p = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
		String absPath = PropertyUtil.get("filedir") + srcPath;
		String destPath = "temp\\"+UUID.randomUUID().toString() + "-" + srcPath.replace('/', '-');
		Files.copy(new File(absPath), new File(p + destPath));
		return destPath;
	}
}

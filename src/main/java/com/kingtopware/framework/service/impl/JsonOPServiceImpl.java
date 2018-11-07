package com.kingtopware.framework.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.JsonOPService;

@Component
public class JsonOPServiceImpl implements JsonOPService {

	public void write(String jsonstr, String path) throws Exception {
		File file = new File(path);
		path = path.replace('/', '\\');
		String dir = path.substring(0, path.lastIndexOf('\\'));
		File file2 = new File(dir);
		file2.mkdirs();
		if (file.exists()) {
			file.delete();
		}
		FileOutputStream fos = new FileOutputStream(file);
		fos.write(jsonstr.getBytes("utf-8"));
		fos.flush();
		fos.close();
	}

}

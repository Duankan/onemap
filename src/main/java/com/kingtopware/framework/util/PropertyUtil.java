/*
 * 文件名：PropertyUtil.java
 * 版权：Copyright 2017-2030湖北金拓维信息技术有限公司 版权所有
 * 描述：网站配置属性读取工具(读取config.properties文件)
 */
package com.kingtopware.framework.util;

import java.io.FileInputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * 网站配置属性读取工具(读取config.properties文件) 例如:读取配置的websitepath的值 String
 * basePath=com.kingtopware.util.PropertyUtil.get("websitepath");
 */
public class PropertyUtil {
	private static Logger logger = Logger.getLogger(PropertyUtil.class);
	public static final Properties PROP = new Properties();

	/**
	 * 读取配置文件的内容（key，value）
	 * 
	 * @param key
	 * @return key对应的value
	 */
	public static String get(String key) {
		if (PROP.isEmpty()) {
			try {
				URL url = PropertyUtil.class.getResource("/config.properties");
				FileInputStream in = new FileInputStream(url.getPath());
				PROP.load(in);
				in.close();
			} catch (Exception e) {
				logger.error(e.getMessage(),e);
			}
		}
		return PROP.getProperty(key);
	}
}

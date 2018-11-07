package com.kingtopware.framework.util;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtils;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月28日
 * @description：日期转换器注册进去,注册时允许Data为空
 * =====================================
 */
public class BeanUtilEx extends BeanUtils {

	    private BeanUtilEx() {
	    }

	    static {
	        // 注册sql.date的转换器，即允许BeanUtils.copyProperties时的源目标的sql类型的值允许为空
	        ConvertUtils.register(new org.apache.commons.beanutils.converters.SqlDateConverter(null), java.sql.Date.class);
	        ConvertUtils.register(new org.apache.commons.beanutils.converters.SqlDateConverter(null), java.util.Date.class);
	        ConvertUtils.register(new org.apache.commons.beanutils.converters.SqlTimestampConverter(null),
	                java.sql.Timestamp.class);
	        // 注册util.date的转换器，即允许BeanUtils.copyProperties时的源目标的util类型的值允许为空
	    }
	    
	    public static void copyProperty(final Object bean, final String name, final Object value)
	            throws IllegalAccessException, InvocationTargetException {

	            BeanUtilsBean.getInstance().copyProperty(bean, name, value);
	        }
}

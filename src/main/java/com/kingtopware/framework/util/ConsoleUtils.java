package com.kingtopware.framework.util;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月5日
 * @description：控制台打印控制
 * =====================================
 */
public class ConsoleUtils
{
	public static boolean isDebug = true;



	/**
	 * 调试用debug
	 * @param msg
	 */
	public static void println(String msg)
	{
		if (isDebug)
		{
			System.out.println( msg);
		}
	}

}

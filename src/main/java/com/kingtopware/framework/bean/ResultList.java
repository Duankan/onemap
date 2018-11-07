package com.kingtopware.framework.bean;

import java.util.List;

/**
 * 集合操作结果模型,操作成功后返回的是一个List集合
 * @param <T> 操作成功后返回的集合盛放的对象类型
 */
public class ResultList<T> {
	private boolean success;
	private String message;
	private List<T> data;

	/**
	 * 返回成功
	 */
	public ResultList() {
		this(true);
	}

	/**
	 * 返回成功或失败
	 * @param success true-成功,false-失败
	 */
	public ResultList(boolean success) {
		this.success=success;
	}
	
	/**
	 * 返回成功或失败并携带字符串信息
	 * @param success true-成功,false-失败
	 * @param message 携带的字符串信息
	 */
	public ResultList(boolean success,String message) {
		this.success=success;
		this.message=message;
	}

	/**
	 * 返回操作成功并携带集合数据结果
	 * @param data 携带的集合数据
	 */
	public ResultList(List<T> data) {
		this(true, "操作成功",data);
	}
	
	/**
	 * 返回操作结果
	 * @param success true-成功,false-失败
	 * @param message 携带的字符串信息
	 * @param data 携带的集合数据
	 */
	public ResultList(boolean success, String message, List<T> data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
	
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

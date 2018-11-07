package com.kingtopware.framework.bean;

/**
 * 分页集合操作结果模型,操作成功后返回的是一个分页的集合
 * @param <T> 操作成功后返回的集合盛放的对象类型
 */
public class ResultPageList<T> {
	private boolean success;
	private PageList<T> data;
	private String message;

	/**
	 * 返回成功
	 */
	public ResultPageList() {
		this(true);
	}

	/**
	 * 返回成功或失败
	 * @param success true-成功,false-失败
	 */
	public ResultPageList(boolean success) {
		this.setSuccess(success);
	}
	
	/**
	 * 返回成功或失败并携带字符串信息
	 * @param success true-成功,false-失败
	 * @param message 携带的字符串信息
	 */
	public ResultPageList(boolean success, String message) {
		this.setSuccess(success);
		this.setMessage(message);
	}
	
	/**
	 * 返回操作成功并携带集合数据结果
	 * @param data 携带的分页集合数据
	 */
	public ResultPageList(PageList<T> data) {
		this(true,"操作成功", data);
	}
	
	/**
	 * 返回操作结果
	 * @param success true-成功,false-失败
	 * @param message 携带的字符串信息
	 * @param data 携带的集合数据
	 */
	public ResultPageList(boolean success, String message, PageList<T> data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}

	public PageList<T> getData() {
		return data;
	}

	public void setData(PageList<T> pl) {
		this.data = pl;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

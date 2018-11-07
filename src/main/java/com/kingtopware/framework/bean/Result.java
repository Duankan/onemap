package com.kingtopware.framework.bean;

/**
 * 简单操作结果模型
 *
 * @param <T> 操作成功后返回的对象类型
 */
public class Result<T> {
	private boolean success;
	private T data;
	private String message;

	/**
	 * 返回成功
	 */
	public Result() {
		this(true);
	}

	/**
	 * 返回成功或失败
	 * @param success true-成功,false-失败
	 */
	public Result(boolean success) {
		this.success=success;
	}
	
	/**
	 * 返回成功或失败并携带字符串信息
	 * @param success true-成功,false-失败
	 * @param message 携带的字符串信息
	 */
	public Result(boolean success,String message) {
		this.success=success;
		this.message=message;
	}

	/**
	 * 返回操作成功并携带数据结果
	 * @param data 携带的数据
	 */
	public Result(T data) {
		this(true,"操作成功", data);
	}
	
	/**
	 * 返回操作结果
	 * @param success true-成功,false-失败
	 * @param message 携带的字符串信息
	 * @param data 携带的数据
	 */
	public Result(boolean success, String message, T data) {
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
	
	public T getData() {
		return data;
	}
	
	public void setData(T data) {
		this.data = data;
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

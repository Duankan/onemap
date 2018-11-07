package com.kingtopware.framework.bean;

import java.io.Serializable;

/**
 * 分页对象模型
 *
 */
public class PageInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	private int pageIndex;
	private int pageSize;
	private int totalCount;
	private int pageCount;

	public PageInfo() {
	}

	/**
	 * 
	 * @param pageIndex 当前页索引
	 * @param pageSize 每页的数据数量
	 */
	public PageInfo(int pageIndex, int pageSize) {
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}

	/**
	 * 
	 * @param pageIndex 当前页索引
	 * @param pageSize 每页的数据数量
	 * @param totalCount 数据总共的数量
	 */
	public PageInfo(int pageIndex, int pageSize, int totalCount) {
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.totalCount = totalCount;
	}

	/**
	 * 
	 * @param pageIndex 当前页索引
	 * @param pageSize 每页的数据数量
	 * @param totalCount 数据总共的数量
	 * @param pageCount 总共分多少页
	 */
	public PageInfo(int pageIndex, int pageSize, int totalCount, int pageCount) {
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.totalCount = totalCount;
		this.pageCount = pageCount;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getPageCount() {
		int s = totalCount / pageSize;
		int y = totalCount % pageSize;
		this.pageCount = y > 0 ? s + 1 : s;
		return this.pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
}

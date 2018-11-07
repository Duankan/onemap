package com.kingtopware.onemap.bean;

import java.io.Serializable;
import java.util.Date;

public class DJFull implements Serializable{
	private static final long serialVersionUID = 1L;
	//djType:登记类型，djTime:登记时间，djJG:登记机构
	
	//登记类型
	private String djType;
	
	//登记时间
	private Date djTime;
	
	//登记机构
	private String djJG;

	public String getDjType() {
		return djType;
	}

	public void setDjType(String djType) {
		this.djType = djType;
	}

	public Date getDjTime() {
		return djTime;
	}

	public void setDjTime(Date djTime) {
		this.djTime = djTime;
	}

	public String getDjJG() {
		return djJG;
	}

	public void setDjJG(String djJG) {
		this.djJG = djJG;
	}
}

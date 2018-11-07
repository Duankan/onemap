package com.kingtopware.onemap.bean;

import java.io.Serializable;

public class DyaqFull implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	//序号
	private Integer XH;
	
	//不动产单元号
	private String BDCDYH;
	
	//抵押面积
	private Double DYMJ;
	
	//抵押方式
	private String DYFS;
	
	//抵押权人
	private String dyqr;
		
	//抵押人
	private String dyr;
	
	//登记时间
	private String DJSJ;
	
	//主债权数额
	private String ZQSE;
	
	//债务履行起始时间
	private String ZWLXQSSJ;
	
	//债务结束时间
	private String ZWLXJSSJ;
	
	//债务人
	private String zwr;

	//区县大妈
	private String QXDM;
	public Integer getXH() {
		return XH;
	}

	public void setXH(Integer xH) {
		XH = xH;
	}

	public String getBDCDYH() {
		return BDCDYH;
	}

	public void setBDCDYH(String bDCDYH) {
		BDCDYH = bDCDYH;
	}

	public Double getDYMJ() {
		return DYMJ;
	}

	public void setDYMJ(Double dYMJ) {
		DYMJ = dYMJ;
	}

	public String getDYFS() {
		return DYFS;
	}

	public void setDYFS(String dYFS) {
		DYFS = dYFS;
	}

	public String getDyqr() {
		return dyqr;
	}

	public void setDyqr(String dyqr) {
		this.dyqr = dyqr;
	}

	public String getDyr() {
		return dyr;
	}

	public void setDyr(String dyr) {
		this.dyr = dyr;
	}

	public String getDJSJ() {
		return DJSJ;
	}

	public void setDJSJ(String dJSJ) {
		DJSJ = dJSJ;
	}

	public String getZQSE() {
		return ZQSE;
	}

	public void setZQSE(String zZQSE) {
		ZQSE = zZQSE;
	}

	public String getZWLXQSSJ() {
		return ZWLXQSSJ;
	}

	public void setZWLXQSSJ(String zWLXQSSJ) {
		ZWLXQSSJ = zWLXQSSJ;
	}

	public String getZWLXJSSJ() {
		return ZWLXJSSJ;
	}

	public void setZWLXJSSJ(String zWLXJSSJ) {
		ZWLXJSSJ = zWLXJSSJ;
	}

	public String getZwr() {
		return zwr;
	}

	public void setZwr(String zwr) {
		this.zwr = zwr;
	}

	public String getQXDM() {
		return QXDM;
	}

	public void setQXDM(String qXDM) {
		QXDM = qXDM;
	}

	
	
}

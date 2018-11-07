package com.kingtopware.onemap.bean;

import java.io.Serializable;
/**
 * 
 * @author xiexian
 * @date 2018/5/10
 *
 */
public class CfdjFull implements Serializable {
	private static final long serialVersionUID = 1L;

	//序号
	private Integer XH;
	
	//执行书文号
	private String zxswh;
	
	//查封起始时间
	private String CFQSSJ;
	
	//查封结束时间
	private String CFJSSJ;
	
	//不动产单元号
	private String BDCDYH;
	
	//查封机构
	private String CFJG;
	
	//登记时间
	private String DJSJ;
	
	//房屋所有权证号
	private String sharenum;
		
	//申请人
	private String proposer;
		
	//被申请人
	private String bproposer;
		
	//查封类型
	private String cflx;

	//区县代码
	private String QXDM;
	
	public Integer getXH() {
		return XH;
	}

	public void setXH(Integer xH) {
		XH = xH;
	}

	public String getZxswh() {
		return zxswh;
	}

	public void setZxswh(String zxswh) {
		this.zxswh = zxswh;
	}

	public String getCFQSSJ() {
		return CFQSSJ;
	}

	public void setCFQSSJ(String cFQSSJ) {
		CFQSSJ = cFQSSJ;
	}

	public String getCFJSSJ() {
		return CFJSSJ;
	}

	public void setCFJSSJ(String cFJSSJ) {
		CFJSSJ = cFJSSJ;
	}

	public String getBDCDYH() {
		return BDCDYH;
	}

	public void setBDCDYH(String bDCDYH) {
		BDCDYH = bDCDYH;
	}

	public String getCFJG() {
		return CFJG;
	}

	public void setCFJG(String cFJG) {
		CFJG = cFJG;
	}

	public String getDJSJ() {
		return DJSJ;
	}

	public void setDJSJ(String dJSJ) {
		DJSJ = dJSJ;
	}

	public String getSharenum() {
		return sharenum;
	}

	public void setSharenum(String sharenum) {
		this.sharenum = sharenum;
	}

	public String getProposer() {
		return proposer;
	}

	public void setProposer(String proposer) {
		this.proposer = proposer;
	}

	public String getBproposer() {
		return bproposer;
	}

	public void setBproposer(String bproposer) {
		this.bproposer = bproposer;
	}

	public String getCflx() {
		return cflx;
	}

	public void setCflx(String cflx) {
		this.cflx = cflx;
	}

	public String getQXDM() {
		return QXDM;
	}

	public void setQXDM(String qXDM) {
		QXDM = qXDM;
	}
	
	
	
	
}

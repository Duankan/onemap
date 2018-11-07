package com.kingtopware.onemap.bean;

import java.io.Serializable;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月2日
 * @description：
 * =====================================
 */
public class CbydFull implements Serializable{
	private static final long serialVersionUID = 1L;
	
	public String STARTTIME;
	public String ENDTIME;
	
	
	public double NF;
	public String XZQDM;
	
	public String XZQMC;
	
	//宗地数
	public int count;
	//宗地面积
	public double ZDMJ;
	//土地取得成本
	public double TDQDCB;
	
	public boolean isComparisoned;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public double getZDMJ() {
		return ZDMJ;
	}

	public void setZDMJ(double zDMJ) {
		ZDMJ = zDMJ;
	}

	public double getTDQDCB() {
		return TDQDCB;
	}

	public void setTDQDCB(double tDQDCB) {
		TDQDCB = tDQDCB;
	}

	public double getNF() {
		return NF;
	}

	public void setNF(double nF) {
		NF = nF;
	}

	public String getXZQDM() {
		return XZQDM;
	}

	public void setXZQDM(String xZQDM) {
		XZQDM = xZQDM;
	}

	public String getXZQMC() {
		return XZQMC;
	}

	public void setXZQMC(String xZQMC) {
		XZQMC = xZQMC;
	}

	public boolean isComparisoned() {
		return isComparisoned;
	}

	public void setComparisoned(boolean isComparisoned) {
		this.isComparisoned = isComparisoned;
	}

	public String getSTARTTIME() {
		return STARTTIME;
	}

	public void setSTARTTIME(String sTARTTIME) {
		STARTTIME = sTARTTIME;
	}

	public String getENDTIME() {
		return ENDTIME;
	}

	public void setENDTIME(String eNDTIME) {
		ENDTIME = eNDTIME;
	}
	
	
	
	
}

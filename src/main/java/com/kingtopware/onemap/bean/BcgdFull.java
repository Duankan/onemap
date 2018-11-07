package com.kingtopware.onemap.bean;

import java.io.Serializable;

public class BcgdFull implements Serializable{
	
	private static final long serialVersionUID = 1L;
	//起始时间
	public String START_TIME;
   //结束时间
	public String END_TIME;
   //行政区代码
	public String XZQDM;
	//行政区名称
	public String XZQMC;
	
	//补充耕地方式
	public String BCGD_FS;
	
	
	
	public int mTzCount;
	public double mTzXZGDMJ;
	public double mTzZJ;
	
	public int mTfCount;
	public double mTfXZGDMJ;
	public double mTfZJ;
	
	
	public int mTkCount;
	public double mTkXZGDMJ;
	public double mTkZJ;
	
	public double mYBC_MJ;
	public double mKBC_MJ;
	
	public boolean isComparisoned;
	
	
	public String getSTART_TIME() {
		return START_TIME;
	}
	public void setSTART_TIME(String sTART_TIME) {
		START_TIME = sTART_TIME;
	}
	public String getEND_TIME() {
		return END_TIME;
	}
	public void setEND_TIME(String eND_TIME) {
		END_TIME = eND_TIME;
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
	public int getmTzCount() {
		return mTzCount;
	}
	public void setmTzCount(int mTzCount) {
		this.mTzCount = mTzCount;
	}
	public double getmTzXZGDMJ() {
		return mTzXZGDMJ;
	}
	public void setmTzXZGDMJ(double mTzXZGDMJ) {
		this.mTzXZGDMJ = mTzXZGDMJ;
	}
	public double getmTzZJ() {
		return mTzZJ;
	}
	public void setmTzZJ(double mTzZJ) {
		this.mTzZJ = mTzZJ;
	}
	public int getmTfCount() {
		return mTfCount;
	}
	public void setmTfCount(int mTfCount) {
		this.mTfCount = mTfCount;
	}
	public double getmTfXZGDMJ() {
		return mTfXZGDMJ;
	}
	public void setmTfXZGDMJ(double mTfXZGDMJ) {
		this.mTfXZGDMJ = mTfXZGDMJ;
	}
	public double getmTfZJ() {
		return mTfZJ;
	}
	public void setmTfZJ(double mTfZJ) {
		this.mTfZJ = mTfZJ;
	}
	public int getmTkCount() {
		return mTkCount;
	}
	public void setmTkCount(int mTkCount) {
		this.mTkCount = mTkCount;
	}
	public double getmTkXZGDMJ() {
		return mTkXZGDMJ;
	}
	public void setmTkXZGDMJ(double mTkXZGDMJ) {
		this.mTkXZGDMJ = mTkXZGDMJ;
	}
	public double getmTkZJ() {
		return mTkZJ;
	}
	public void setmTkZJ(double mTkZJ) {
		this.mTkZJ = mTkZJ;
	}
	public double getmYBC_MJ() {
		return mYBC_MJ;
	}
	public void setmYBC_MJ(double mYBC_MJ) {
		this.mYBC_MJ = mYBC_MJ;
	}
	public double getmKBC_MJ() {
		return mKBC_MJ;
	}
	public void setmKBC_MJ(double mKBC_MJ) {
		this.mKBC_MJ = mKBC_MJ;
	}
	public String getBCGD_FS() {
		return BCGD_FS;
	}
	public void setBCGD_FS(String bCGD_FS) {
		BCGD_FS = bCGD_FS;
	}
	public boolean isComparisoned() {
		return isComparisoned;
	}
	public void setComparisoned(boolean isComparisoned) {
		this.isComparisoned = isComparisoned;
	}
	
	
	
	

}

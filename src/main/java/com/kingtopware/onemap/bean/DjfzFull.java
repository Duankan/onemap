package com.kingtopware.onemap.bean;

import java.io.Serializable;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月11日
 * @description：用地接口返回数据实体类
 * =====================================
 */
public class DjfzFull implements Serializable {

	private static final long serialVersionUID = 1L;
	// 起始时间
	public String START_TIME;
	// 结束时间
	public String END_TIME;
	// 行政区代码
	public String XZQDM;
	// 行政区名称
	public String XZQMC;
	// 供应方式
	public String GY_FS;
	// 登记类型
	public String DJLX;

	// 发证数量
	public int mCount;
	// 发证面积
	public double mZDMJ;
	// 划拨土地面积
	public double mHbZDMJ;
	// 出让土地面积
	public double mCrZDMJ;

	// 发证数量
	public int mBCount;
	// 发证面积
	public double mBZDMJ;
	// 划拨土地面积
	public double mBHbZDMJ;
	// 出让土地面积
	public double mBCrZDMJ;

	// 发证数量
	public int mDCount;
	// 发证面积
	public double mDZDMJ;
	// 划拨土地面积
	public double mDHbZDMJ;
	// 出让土地面积
	public double mDCrZDMJ;
	
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

	public int getmCount() {
		return mCount;
	}

	public void setmCount(int mCount) {
		this.mCount = mCount;
	}

	public double getmZDMJ() {
		return mZDMJ;
	}

	public void setmZDMJ(double mZDMJ) {
		this.mZDMJ = mZDMJ;
	}

	public double getmHbZDMJ() {
		return mHbZDMJ;
	}

	public void setmHbZDMJ(double mHbZDMJ) {
		this.mHbZDMJ = mHbZDMJ;
	}

	public double getmCrZDMJ() {
		return mCrZDMJ;
	}

	public void setmCrZDMJ(double mCrZDMJ) {
		this.mCrZDMJ = mCrZDMJ;
	}

	public int getmBCount() {
		return mBCount;
	}

	public void setmBCount(int mBCount) {
		this.mBCount = mBCount;
	}

	public double getmBZDMJ() {
		return mBZDMJ;
	}

	public void setmBZDMJ(double mBZDMJ) {
		this.mBZDMJ = mBZDMJ;
	}

	public double getmBHbZDMJ() {
		return mBHbZDMJ;
	}

	public void setmBHbZDMJ(double mBHbZDMJ) {
		this.mBHbZDMJ = mBHbZDMJ;
	}

	public double getmBCrZDMJ() {
		return mBCrZDMJ;
	}

	public void setmBCrZDMJ(double mBCrZDMJ) {
		this.mBCrZDMJ = mBCrZDMJ;
	}

	public int getmDCount() {
		return mDCount;
	}

	public void setmDCount(int mDCount) {
		this.mDCount = mDCount;
	}

	public double getmDZDMJ() {
		return mDZDMJ;
	}

	public void setmDZDMJ(double mDZDMJ) {
		this.mDZDMJ = mDZDMJ;
	}

	public double getmDHbZDMJ() {
		return mDHbZDMJ;
	}

	public void setmDHbZDMJ(double mDHbZDMJ) {
		this.mDHbZDMJ = mDHbZDMJ;
	}

	public double getmDCrZDMJ() {
		return mDCrZDMJ;
	}

	public void setmDCrZDMJ(double mDCrZDMJ) {
		this.mDCrZDMJ = mDCrZDMJ;
	}

	public String getGY_FS() {
		return GY_FS;
	}

	public void setGY_FS(String gY_FS) {
		GY_FS = gY_FS;
	}

	public String getDJLX() {
		return DJLX;
	}

	public void setDJLX(String dJLX) {
		DJLX = dJLX;
	}

	public boolean isComparisoned() {
		return isComparisoned;
	}

	public void setComparisoned(boolean isComparisoned) {
		this.isComparisoned = isComparisoned;
	}
	

}

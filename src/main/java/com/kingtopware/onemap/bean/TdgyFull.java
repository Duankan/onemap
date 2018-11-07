package com.kingtopware.onemap.bean;

import java.io.Serializable;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月5日
 * @description：
 * =====================================
 */
public class TdgyFull implements Serializable {
	private static final long serialVersionUID = 1L;

	public String STARTTIME;
	public String ENDTIME;

	// 规划用途
	public String mGhyt;
	// 建设用地供应宗地数
	public int mJianCount;
	// 供应面积
	public double mGyMj;

	// 出让宗地数
	public int mChuCount;
	// 出让供应面积
	public double mChuGyMj;
	// 出让出让价款
	public double mChuCrjk;
	// 出让建筑面积
	public double ChuJzMj;

	// 协议宗地数
	public int mXyCount;
	// 协议供应面积
	public double mXyGyMj;
	// 协议出让价款
	public double mXyCrjk;
	// 协议建筑面积
	public double nXyJzMj;

	// 招拍挂宗地数
	public int mZpgCount;
	// 招拍挂供应面积
	public double mZpgGyMj;
	// 招拍挂出让价款
	public double mZpgCrjk;
	// 招拍挂建筑面积
	public double nZpgJzMj;

	// 划拨宗地数
	public int mHbCount;
	// 划拨供应面积
	public double mHbGyMj;
	// 划拨建筑面积
	public double nHbJzMj;

//	// 租赁宗地数
//	public int mXlCount;
//	// 租赁供应面积
//	public double mXlGyMj;
//	// /租赁出让价款
//	public double mXlCrjk;
//
//	// 其他宗地数
//	public int mQtCount;
//	// 其他供应面积
//	public double mQtGyMj;
//	// /其他出让价款
//	public double mQtCrjk;
	
	
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
	public String getmGhyt() {
		return mGhyt;
	}
	public void setmGhyt(String mGhyt) {
		this.mGhyt = mGhyt;
	}
	public int getmJianCount() {
		return mJianCount;
	}
	public void setmJianCount(int mJianCount) {
		this.mJianCount = mJianCount;
	}
	public double getmGyMj() {
		return mGyMj;
	}
	public void setmGyMj(double mGyMj) {
		this.mGyMj = mGyMj;
	}
	public int getmChuCount() {
		return mChuCount;
	}
	public void setmChuCount(int mChuCount) {
		this.mChuCount = mChuCount;
	}
	public double getmChuGyMj() {
		return mChuGyMj;
	}
	public void setmChuGyMj(double mChuGyMj) {
		this.mChuGyMj = mChuGyMj;
	}
	public double getmChuCrjk() {
		return mChuCrjk;
	}
	public void setmChuCrjk(double mChuCrjk) {
		this.mChuCrjk = mChuCrjk;
	}
	public double getChuJzMj() {
		return ChuJzMj;
	}
	public void setChuJzMj(double chuJzMj) {
		ChuJzMj = chuJzMj;
	}
	public int getmXyCount() {
		return mXyCount;
	}
	public void setmXyCount(int mXyCount) {
		this.mXyCount = mXyCount;
	}
	public double getmXyGyMj() {
		return mXyGyMj;
	}
	public void setmXyGyMj(double mXyGyMj) {
		this.mXyGyMj = mXyGyMj;
	}
	public double getmXyCrjk() {
		return mXyCrjk;
	}
	public void setmXyCrjk(double mXyCrjk) {
		this.mXyCrjk = mXyCrjk;
	}
	public double getnXyJzMj() {
		return nXyJzMj;
	}
	public void setnXyJzMj(double nXyJzMj) {
		this.nXyJzMj = nXyJzMj;
	}
	public int getmZpgCount() {
		return mZpgCount;
	}
	public void setmZpgCount(int mZpgCount) {
		this.mZpgCount = mZpgCount;
	}
	public double getmZpgGyMj() {
		return mZpgGyMj;
	}
	public void setmZpgGyMj(double mZpgGyMj) {
		this.mZpgGyMj = mZpgGyMj;
	}
	public double getmZpgCrjk() {
		return mZpgCrjk;
	}
	public void setmZpgCrjk(double mZpgCrjk) {
		this.mZpgCrjk = mZpgCrjk;
	}
	public double getnZpgJzMj() {
		return nZpgJzMj;
	}
	public void setnZpgJzMj(double nZpgJzMj) {
		this.nZpgJzMj = nZpgJzMj;
	}
	public int getmHbCount() {
		return mHbCount;
	}
	public void setmHbCount(int mHbCount) {
		this.mHbCount = mHbCount;
	}
	public double getmHbGyMj() {
		return mHbGyMj;
	}
	public void setmHbGyMj(double mHbGyMj) {
		this.mHbGyMj = mHbGyMj;
	}
	public double getnHbJzMj() {
		return nHbJzMj;
	}
	public void setnHbJzMj(double nHbJzMj) {
		this.nHbJzMj = nHbJzMj;
	}

}

package com.kingtopware.onemap.bean;

import java.io.Serializable;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月30日
 * @description：
 * =====================================
 */
public class JsydspFull implements Serializable {
	private static final long serialVersionUID = 1L;

	// 行政区代码
	public String XZQDM;
	// 县市区
	public String XZQMC;
	// 批准单位
	public String PZ_DW;
	//用地类型
	public String YD_LX;
	// 批准总面积
	public double PZ_XM_MJ;
	// 新增建设用地面积
	public double XZ_JSYD_MJ;
	// 农用地转用面积
	public double PZ_NYD_MJ;
	// 耕地面积
	public double PZ_GD_MJ;
	// 未利用地面积
	public double PZ_WLYD_MJ;
	// 原有集体建设用地
	public double CL_JSYD_MJ;

	// 批准基本农田
	public double PZ_JBNT_MJ;
	// 耕地林地
	public double PZ_LD_MJ;
	// 批准园地
	public double PZ_YD_MJ;
	// 批准其他农用地
	public double PZ_QTNYD_MJ;

	public boolean isComparisoned;

	public String getXZQMC() {
		return XZQMC;
	}

	public void setXZQMC(String xZQMC) {
		XZQMC = xZQMC;
	}

	public double getPZ_XM_MJ() {
		return PZ_XM_MJ;
	}

	public void setPZ_XM_MJ(double pZ_XM_MJ) {
		PZ_XM_MJ = pZ_XM_MJ;
	}

	public double getXZ_JSYD_MJ() {
		return XZ_JSYD_MJ;
	}

	public void setXZ_JSYD_MJ(double xZ_JSYD_MJ) {
		XZ_JSYD_MJ = xZ_JSYD_MJ;
	}

	public double getPZ_NYD_MJ() {
		return PZ_NYD_MJ;
	}

	public void setPZ_NYD_MJ(double pZ_NYD_MJ) {
		PZ_NYD_MJ = pZ_NYD_MJ;
	}

	public double getPZ_GD_MJ() {
		return PZ_GD_MJ;
	}

	public void setPZ_GD_MJ(double pZ_GD_MJ) {
		PZ_GD_MJ = pZ_GD_MJ;
	}

	public double getPZ_WLYD_MJ() {
		return PZ_WLYD_MJ;
	}

	public void setPZ_WLYD_MJ(double pZ_WLYD_MJ) {
		PZ_WLYD_MJ = pZ_WLYD_MJ;
	}

	public double getCL_JSYD_MJ() {
		return CL_JSYD_MJ;
	}

	public void setCL_JSYD_MJ(double cL_JSYD_MJ) {
		CL_JSYD_MJ = cL_JSYD_MJ;
	}

	public String getPZ_DW() {
		return PZ_DW;
	}

	public void setPZ_DW(String pZ_DW) {
		PZ_DW = pZ_DW;
	}

	public String getXZQDM() {
		return XZQDM;
	}

	public void setXZQDM(String xZQDM) {
		XZQDM = xZQDM;
	}

	public boolean isComparisoned() {
		return isComparisoned;
	}

	public void setComparisoned(boolean isComparisoned) {
		this.isComparisoned = isComparisoned;
	}

	public double getPZ_JBNT_MJ() {
		return PZ_JBNT_MJ;
	}

	public void setPZ_JBNT_MJ(double pZ_JBNT_MJ) {
		PZ_JBNT_MJ = pZ_JBNT_MJ;
	}

	public double getPZ_LD_MJ() {
		return PZ_LD_MJ;
	}

	public void setPZ_LD_MJ(double pZ_LD_MJ) {
		PZ_LD_MJ = pZ_LD_MJ;
	}

	public double getPZ_YD_MJ() {
		return PZ_YD_MJ;
	}

	public void setPZ_YD_MJ(double pZ_YD_MJ) {
		PZ_YD_MJ = pZ_YD_MJ;
	}

	public double getPZ_QTNYD_MJ() {
		return PZ_QTNYD_MJ;
	}

	public void setPZ_QTNYD_MJ(double pZ_QTNYD_MJ) {
		PZ_QTNYD_MJ = pZ_QTNYD_MJ;
	}

	public String getYD_LX() {
		return YD_LX;
	}

	public void setYD_LX(String yD_LX) {
		YD_LX = yD_LX;
	}
	
	

}

package com.kingtopware.onemap.bean;

import java.io.Serializable;

public class JsydspGhFull implements Serializable {
	private static final long serialVersionUID = 1L;

	// 行政区代码
	public String XZQDM;
	// 县市区
	public String XZQMC;

	// 用地类型
	public String YD_LX;

	// 总面积
	public double ZM;

	// 商服用地/交通运输用地
	public double SJ_MJ;

	// 工矿用地/水利设施用地
	public double GS_MJ;

	// 住宅用地总面积
	public double ZZ_ZMJ;

	// 三类住房
	public double SLZF_MJ;

	// 其他
	public double QT_MJ;

	public boolean isComparisoned;

	public String getYD_LX() {
		return YD_LX;
	}

	public void setYD_LX(String yD_LX) {
		YD_LX = yD_LX;
	}

	public double getZM() {
		return ZM;
	}

	public void setZM(double zM) {
		ZM = zM;
	}

	public double getSJ_MJ() {
		return SJ_MJ;
	}

	public void setSJ_MJ(double sJ_MJ) {
		SJ_MJ = sJ_MJ;
	}

	public double getGS_MJ() {
		return GS_MJ;
	}

	public void setGS_MJ(double gS_MJ) {
		GS_MJ = gS_MJ;
	}

	public double getZZ_ZMJ() {
		return ZZ_ZMJ;
	}

	public void setZZ_ZMJ(double zZ_ZMJ) {
		ZZ_ZMJ = zZ_ZMJ;
	}

	public double getSLZF_MJ() {
		return SLZF_MJ;
	}

	public void setSLZF_MJ(double sLZF_MJ) {
		SLZF_MJ = sLZF_MJ;
	}

	public double getQT_MJ() {
		return QT_MJ;
	}

	public void setQT_MJ(double qT_MJ) {
		QT_MJ = qT_MJ;
	}

	public boolean isComparisoned() {
		return isComparisoned;
	}

	public void setComparisoned(boolean isComparisoned) {
		this.isComparisoned = isComparisoned;
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

}

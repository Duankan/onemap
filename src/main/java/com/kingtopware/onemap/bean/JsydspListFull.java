package com.kingtopware.onemap.bean;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月31日
 * @description：
 * =====================================
 */
public class JsydspListFull implements Serializable {
	public static final long serialVersionUID = 1L;
	
	public JsydspListFull(){}
	

	// 起始时间
	public String START_TIME;
	// 结束时间
	public String END_TIME;

	// 行政区代码
	public String XZQDM;

	// 县市区
	public String XZQMC;

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
	
	// 批准总面积
		public double G_PZ_XM_MJ;
		// 新增建设用地面积
		public double G_XZ_JSYD_MJ;
		// 农用地转用面积
		public double G_PZ_NYD_MJ;
		// 耕地面积
		public double G_PZ_GD_MJ;
		// 未利用地面积
		public double G_PZ_WLYD_MJ;
		// 原有集体建设用地
		public double G_CL_JSYD_MJ;

	// 批准总面积
	public double S_PZ_XM_MJ;
	// 新增建设用地面积
	public double S_XZ_JSYD_MJ;
	// 农用地转用面积
	public double S_PZ_NYD_MJ;
	// 耕地面积
	public double S_PZ_GD_MJ;
	// 未利用地面积
	public double S_PZ_WLYD_MJ;
	// 原有集体建设用地
	public double S_CL_JSYD_MJ;

	

	public List<JsydspFull> mJsydspFull;

	public String getXZQMC() {
		return XZQMC;
	}

	public void setXZQMC(String xZQMC) {
		XZQMC = xZQMC;
	}

	public String getXZQDM() {
		return XZQDM;
	}

	public void setXZQDM(String xZQDM) {
		XZQDM = xZQDM;
	}

	public List<JsydspFull> getmJsydspFull() {
		return mJsydspFull;
	}

	public void setmJsydspFull(List<JsydspFull> mJsydspFull) {
		this.mJsydspFull = mJsydspFull;
	}

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

	public double getS_PZ_XM_MJ() {
		return S_PZ_XM_MJ;
	}

	public void setS_PZ_XM_MJ(double s_PZ_XM_MJ) {
		S_PZ_XM_MJ = s_PZ_XM_MJ;
	}

	public double getS_XZ_JSYD_MJ() {
		return S_XZ_JSYD_MJ;
	}

	public void setS_XZ_JSYD_MJ(double s_XZ_JSYD_MJ) {
		S_XZ_JSYD_MJ = s_XZ_JSYD_MJ;
	}

	public double getS_PZ_NYD_MJ() {
		return S_PZ_NYD_MJ;
	}

	public void setS_PZ_NYD_MJ(double s_PZ_NYD_MJ) {
		S_PZ_NYD_MJ = s_PZ_NYD_MJ;
	}

	public double getS_PZ_GD_MJ() {
		return S_PZ_GD_MJ;
	}

	public void setS_PZ_GD_MJ(double s_PZ_GD_MJ) {
		S_PZ_GD_MJ = s_PZ_GD_MJ;
	}

	public double getS_PZ_WLYD_MJ() {
		return S_PZ_WLYD_MJ;
	}

	public void setS_PZ_WLYD_MJ(double s_PZ_WLYD_MJ) {
		S_PZ_WLYD_MJ = s_PZ_WLYD_MJ;
	}

	public double getS_CL_JSYD_MJ() {
		return S_CL_JSYD_MJ;
	}

	public void setS_CL_JSYD_MJ(double s_CL_JSYD_MJ) {
		S_CL_JSYD_MJ = s_CL_JSYD_MJ;
	}

	public double getG_PZ_XM_MJ() {
		return G_PZ_XM_MJ;
	}

	public void setG_PZ_XM_MJ(double g_PZ_XM_MJ) {
		G_PZ_XM_MJ = g_PZ_XM_MJ;
	}

	public double getG_XZ_JSYD_MJ() {
		return G_XZ_JSYD_MJ;
	}

	public void setG_XZ_JSYD_MJ(double g_XZ_JSYD_MJ) {
		G_XZ_JSYD_MJ = g_XZ_JSYD_MJ;
	}

	public double getG_PZ_NYD_MJ() {
		return G_PZ_NYD_MJ;
	}

	public void setG_PZ_NYD_MJ(double g_PZ_NYD_MJ) {
		G_PZ_NYD_MJ = g_PZ_NYD_MJ;
	}

	public double getG_PZ_GD_MJ() {
		return G_PZ_GD_MJ;
	}

	public void setG_PZ_GD_MJ(double g_PZ_GD_MJ) {
		G_PZ_GD_MJ = g_PZ_GD_MJ;
	}

	public double getG_PZ_WLYD_MJ() {
		return G_PZ_WLYD_MJ;
	}

	public void setG_PZ_WLYD_MJ(double g_PZ_WLYD_MJ) {
		G_PZ_WLYD_MJ = g_PZ_WLYD_MJ;
	}

	public double getG_CL_JSYD_MJ() {
		return G_CL_JSYD_MJ;
	}

	public void setG_CL_JSYD_MJ(double g_CL_JSYD_MJ) {
		G_CL_JSYD_MJ = g_CL_JSYD_MJ;
	}

}

package com.kingtopware.onemap.bean;

import java.io.Serializable;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月31日
 * @description：以月份、季度、年份为单位，统计不同地区，根据土地规划用途进行分类接口返回数据实体类
 * =====================================
 */
public class JsydspGhyt implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//起始时间
	public String START_TIME;
   //结束时间
	public String END_TIME;
   //行政区代码
	public String XZQDM;
	//行政区名称
	public String XZQMC;
   //审批合计
	public double SPHE_MJ;
    //圈内用地总面积
	public double QN_ZMJ;
   // 圈内商服用地面积
	public double QN_SFYD_MJ;
   //圈内工矿存储面积
	public double QN_GKCC_MJ;
   //圈内住房总面积
	public double QN_ZZ_ZMJ;
    //圈内三类住房面积
	public double QN_SLZF_MJ;
	// 圈内其他面积
	public double QN_QT;
	//单选总面积
	public double DX_ZMJ;
	//单选交通运输用地面积
	public double DX_JTYS_MJ;
	//单选水利设施用地面积
	public double DX_SLSS_MJ;
	//单选其他面积
	public double DX_QT_MJ;

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

	public String getXZQMC() {
		return XZQMC;
	}

	public void setXZQMC(String xZQMC) {
		XZQMC = xZQMC;
	}

	public double getSPHE_MJ() {
		return SPHE_MJ;
	}

	public void setSPHE_MJ(double sPHE_MJ) {
		SPHE_MJ = sPHE_MJ;
	}

	public double getQN_ZMJ() {
		return QN_ZMJ;
	}

	public void setQN_ZMJ(double qN_ZMJ) {
		QN_ZMJ = qN_ZMJ;
	}

	public double getQN_SFYD_MJ() {
		return QN_SFYD_MJ;
	}

	public void setQN_SFYD_MJ(double qN_SFYD_MJ) {
		QN_SFYD_MJ = qN_SFYD_MJ;
	}

	public double getQN_GKCC_MJ() {
		return QN_GKCC_MJ;
	}

	public void setQN_GKCC_MJ(double qN_GKCC_MJ) {
		QN_GKCC_MJ = qN_GKCC_MJ;
	}

	public double getQN_ZZ_ZMJ() {
		return QN_ZZ_ZMJ;
	}

	public void setQN_ZZ_ZMJ(double qN_ZZ_ZMJ) {
		QN_ZZ_ZMJ = qN_ZZ_ZMJ;
	}

	public double getQN_SLZF_MJ() {
		return QN_SLZF_MJ;
	}

	public void setQN_SLZF_MJ(double qN_SLZF_MJ) {
		QN_SLZF_MJ = qN_SLZF_MJ;
	}

	public double getQN_QT() {
		return QN_QT;
	}

	public void setQN_QT(double qN_QT) {
		QN_QT = qN_QT;
	}

	public double getDX_ZMJ() {
		return DX_ZMJ;
	}

	public void setDX_ZMJ(double dX_ZMJ) {
		DX_ZMJ = dX_ZMJ;
	}

	public double getDX_JTYS_MJ() {
		return DX_JTYS_MJ;
	}

	public void setDX_JTYS_MJ(double dX_JTYS_MJ) {
		DX_JTYS_MJ = dX_JTYS_MJ;
	}

	public double getDX_SLSS_MJ() {
		return DX_SLSS_MJ;
	}

	public void setDX_SLSS_MJ(double dX_SLSS_MJ) {
		DX_SLSS_MJ = dX_SLSS_MJ;
	}

	public double getDX_QT_MJ() {
		return DX_QT_MJ;
	}

	public void setDX_QT_MJ(double dX_QT_MJ) {
		DX_QT_MJ = dX_QT_MJ;
	}

	public String getXZQDM() {
		return XZQDM;
	}

	public void setXZQDM(String xZQDM) {
		XZQDM = xZQDM;
	}

	
	
}

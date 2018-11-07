package com.kingtopware.onemap.bean;

import java.io.Serializable;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月1日
 * @description：根据土地利用现状分类统计征收面积
 * =====================================
 */
public class ZdxxLyxzFull implements Serializable {
	private static final long serialVersionUID = 1L;
	// 起始时间
		public String START_TIME;
		// 结束时间
		public String END_TIME;

		// 行政区代码
		public String XZQDM;

		// 县市区
		public String XZQMC;
		//被征用土地总面积
		public double  ZYTD_ZMJ;
		//征收农用地耕地面积
		public double  ZS_NYD_GDMJ;
		//征收农用地耕地水田面积
		public double ZS_NYD_GDSTMJ;
		//征收农用地耕地旱地面积
		public double ZS_NYD_GDHDMJ;
		//征收农用地耕地菜地面积
		public double ZS_NYD_GDCDMJ;
		//征收农用地林地面积
		public double ZS_NYD_LDMJ;
		//征收农用地园地面积
		public double ZS_NYD_YDMJ;
		//征收农用地牧草地面积
		public double ZS_NYD_MCDMJ;
		//征收农用地其他面积
		public double ZS_NYD_QTMJ;
		//征收建设用地面积
		public double ZS_JSYDMJ;
		//征收未利用地面积
		public double ZS_WLYDMJ;
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
		public double getZYTD_ZMJ() {
			return ZYTD_ZMJ;
		}
		public void setZYTD_ZMJ(double zYTD_ZMJ) {
			ZYTD_ZMJ = zYTD_ZMJ;
		}
		public double getZS_NYD_GDMJ() {
			return ZS_NYD_GDMJ;
		}
		public void setZS_NYD_GDMJ(double zS_NYD_GDMJ) {
			ZS_NYD_GDMJ = zS_NYD_GDMJ;
		}
		public double getZS_NYD_GDSTMJ() {
			return ZS_NYD_GDSTMJ;
		}
		public void setZS_NYD_GDSTMJ(double zS_NYD_GDSTMJ) {
			ZS_NYD_GDSTMJ = zS_NYD_GDSTMJ;
		}
		public double getZS_NYD_GDHDMJ() {
			return ZS_NYD_GDHDMJ;
		}
		public void setZS_NYD_GDHDMJ(double zS_NYD_GDHDMJ) {
			ZS_NYD_GDHDMJ = zS_NYD_GDHDMJ;
		}
		public double getZS_NYD_GDCDMJ() {
			return ZS_NYD_GDCDMJ;
		}
		public void setZS_NYD_GDCDMJ(double zS_NYD_GDCDMJ) {
			ZS_NYD_GDCDMJ = zS_NYD_GDCDMJ;
		}
		public double getZS_NYD_LDMJ() {
			return ZS_NYD_LDMJ;
		}
		public void setZS_NYD_LDMJ(double zS_NYD_LDMJ) {
			ZS_NYD_LDMJ = zS_NYD_LDMJ;
		}
		public double getZS_NYD_YDMJ() {
			return ZS_NYD_YDMJ;
		}
		public void setZS_NYD_YDMJ(double zS_NYD_YDMJ) {
			ZS_NYD_YDMJ = zS_NYD_YDMJ;
		}
		public double getZS_NYD_MCDMJ() {
			return ZS_NYD_MCDMJ;
		}
		public void setZS_NYD_MCDMJ(double zS_NYD_MCDMJ) {
			ZS_NYD_MCDMJ = zS_NYD_MCDMJ;
		}
		public double getZS_NYD_QTMJ() {
			return ZS_NYD_QTMJ;
		}
		public void setZS_NYD_QTMJ(double zS_NYD_QTMJ) {
			ZS_NYD_QTMJ = zS_NYD_QTMJ;
		}
		public double getZS_JSYDMJ() {
			return ZS_JSYDMJ;
		}
		public void setZS_JSYDMJ(double zS_JSYDMJ) {
			ZS_JSYDMJ = zS_JSYDMJ;
		}
		public double getZS_WLYDMJ() {
			return ZS_WLYDMJ;
		}
		public void setZS_WLYDMJ(double zS_WLYDMJ) {
			ZS_WLYDMJ = zS_WLYDMJ;
		}
		
		
		
		
		
		
}

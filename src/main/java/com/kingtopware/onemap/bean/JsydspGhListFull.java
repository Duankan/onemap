package com.kingtopware.onemap.bean;

import java.io.Serializable;
import java.util.List;

public class JsydspGhListFull implements Serializable {
	private static final long serialVersionUID = 1L;
	// 行政区代码
		public String XZQDM;

		// 县市区
		public String XZQMC;
		
		//审批合计面积
		public double SPHJ_MJ;
		
		public List<JsydspGhFull> mJsydspFull;

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

		public List<JsydspGhFull> getmJsydspFull() {
			return mJsydspFull;
		}

		public void setmJsydspFull(List<JsydspGhFull> mJsydspFull) {
			this.mJsydspFull = mJsydspFull;
		}

		public double getSPHJ_MJ() {
			return SPHJ_MJ;
		}

		public void setSPHJ_MJ(double sPHJ_MJ) {
			SPHJ_MJ = sPHJ_MJ;
		}
		
		
}

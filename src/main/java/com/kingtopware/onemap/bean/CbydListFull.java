package com.kingtopware.onemap.bean;

import java.io.Serializable;
import java.util.List;

public class CbydListFull implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public double NF;
	
	public List<CbydFull> mCbydFull;

	public double getNF() {
		return NF;
	}

	public void setNF(double nF) {
		NF = nF;
	}

	public List<CbydFull> getmCbydFull() {
		return mCbydFull;
	}

	public void setmCbydFull(List<CbydFull> mCbydFull) {
		this.mCbydFull = mCbydFull;
	}
	
	
}

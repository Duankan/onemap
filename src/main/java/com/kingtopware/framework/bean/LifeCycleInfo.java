package com.kingtopware.framework.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.kingtopware.onemap.entity.AjdjxxEntity;
import com.kingtopware.onemap.entity.BcgdEntity;
import com.kingtopware.onemap.entity.CbydEntity;
import com.kingtopware.onemap.entity.ZrzEntity;
import com.kingtopware.onemap.entity.JsydspEntity;
import com.kingtopware.onemap.entity.TdgyEntity;
import com.kingtopware.onemap.entity.ZdxxEntity;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月21日
 * @description：生命周期数据
 * =====================================
 */
public class LifeCycleInfo implements Serializable {

	public List<JsydspEntity> p = new ArrayList<JsydspEntity>();

	public List<ZdxxEntity> z = new ArrayList<ZdxxEntity>();

	public List<CbydEntity> c = new ArrayList<CbydEntity>();

	public List<TdgyEntity> g = new ArrayList<TdgyEntity>();

	public List<ZrzEntity> y = new ArrayList<ZrzEntity>();

	public List<BcgdEntity> b = new ArrayList<BcgdEntity>();
	
	public List<AjdjxxEntity> w = new ArrayList<AjdjxxEntity>();

	public List<JsydspEntity> getP() {
		return p;
	}

	public void setP(List<JsydspEntity> p) {
		this.p = p;
	}

	public List<ZdxxEntity> getZ() {
		return z;
	}

	public void setZ(List<ZdxxEntity> z) {
		this.z = z;
	}

	public List<CbydEntity> getC() {
		return c;
	}

	public void setC(List<CbydEntity> c) {
		this.c = c;
	}

	public List<TdgyEntity> getG() {
		return g;
	}

	public void setG(List<TdgyEntity> g) {
		this.g = g;
	}

	public List<ZrzEntity> getY() {
		return y;
	}

	public void setY(List<ZrzEntity> y) {
		this.y = y;
	}

	public List<BcgdEntity> getB() {
		return b;
	}

	public void setB(List<BcgdEntity> b) {
		this.b = b;
	}

	public List<AjdjxxEntity> getW() {
		return w;
	}

	public void setW(List<AjdjxxEntity> w) {
		this.w = w;
	}
	
	

}

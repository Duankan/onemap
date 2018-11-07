package com.kingtopware.onemap.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "T_ASSIS_APPROVE")
public class AsApEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	public static final String selectAll = "select LCMC,SF_KCZYJH,LCXX,XZQ_MC,DZZHFX,ST_AsGeoJson(Geometry),SF_ZLZXJH,TDQSXX,NYDZMJ,XMMC,SQDW,AJMC,TXDW,JSYDMJ,GUID,SF_TKKC,ZBJC,BCGDQK,QZGDMJ,AJBH,JBNTMJ,SF_YG_JBNTSF_YG_JBNT,XMBH,LCLX,KQXQ,SQYDZMJ,TDWZ,TDSMZQ,KCZYYGTJ,CLJSYDMJ,SF_YGKQ,WLYDMJ,YGCLFX,CKQFW,TDYT,SF_ZTGH,MJJY,SBCC,XZJSYDMJ,SF_QNYD,YGTJ,XZQ_DM,epsg";
	public static final String selectKey = "lcmc,sf_kczyjh,lcxx,xzq_mc,dzzhfx,geometry,sf_zlzxjh,tdqsxx,nydzmj,xmmc,sqdw,ajmc,txdw,jsydmj,guid,sf_tkkc,zbjc,bcgdqk,qzgdmj,ajbh,jbntmj,sf_yg_jbntsf_yg_jbnt,xmbh,lclx,kqxq,sqydzmj,tdwz,tdsmzq,kczyygtj,cljsydmj,sf_ygkq,wlydmj,ygclfx,ckqfw,tdyt,sf_ztgh,mjjy,sbcc,xzjsydmj,sf_qnyd,ygtj,xzq_dm,epsg";

	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "GUID", length = 36)
	private String guid;

	public String getPrimaryValue() {
		return getGuid();
	}

	public String getPrimaryKey() {
		return "GUID";
	}

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	// 流程名称
	@Column(name = "LCMC")
	private String lcmc;

	//
	@Column(name = "SF_KCZYJH")
	private String sf_kczyjh;

	//
	@Column(name = "LCXX")
	private String lcxx;

	// 行政区名称
	@Column(name = "XZQ_MC")
	private String xzq_mc;

	//
	@Column(name = "DZZHFX")
	private String dzzhfx;

	// 申请图形信息
	@Column(name = "Geometry")
	private String geometry;

	//
	@Column(name = "SF_ZLZXJH")
	private String sf_zlzxjh;

	//
	@Column(name = "TDQSXX")
	private String tdqsxx;

	// 农用地总面积
	@Column(name = "NYDZMJ")
	private Double nydzmj;

	// 项目名称
	@Column(name = "XMMC")
	private String xmmc;

	// 申请单位
	@Column(name = "SQDW")
	private String sqdw;

	// 案卷名称
	@Column(name = "AJMC")
	private String ajmc;

	//
	@Column(name = "TXDW")
	private String txdw;

	// 建设用地面积
	@Column(name = "JSYDMJ")
	private Double jsydmj;

	//
	@Column(name = "SF_TKKC")
	private String sf_tkkc;

	//
	@Column(name = "ZBJC")
	private String zbjc;

	//
	@Column(name = "BCGDQK")
	private String bcgdqk;

	// 其中耕地面积
	@Column(name = "QZGDMJ")
	private Double qzgdmj;

	// 案卷编号
	@Column(name = "AJBH")
	private String ajbh;

	// 基本农田面积
	@Column(name = "JBNTMJ")
	private Double jbntmj;

	//
	@Column(name = "SF_YG_JBNTSF_YG_JBNT")
	private String sf_yg_jbntsf_yg_jbnt;

	// 项目编号
	@Column(name = "XMBH")
	private String xmbh;

	// 流程类型
	@Column(name = "LCLX")
	private String lclx;

	//
	@Column(name = "KQXQ")
	private String kqxq;

	// 申请用地总面积
	@Column(name = "SQYDZMJ")
	private Double sqydzmj;

	// 土地位置
	@Column(name = "TDWZ")
	private String tdwz;

	//
	@Column(name = "TDSMZQ")
	private String tdsmzq;

	//
	@Column(name = "KCZYYGTJ")
	private String kczyygtj;

	// 存量建设用地面积
	@Column(name = "CLJSYDMJ")
	private Double cljsydmj;

	//
	@Column(name = "SF_YGKQ")
	private String sf_ygkq;

	// 未利用地面积
	@Column(name = "WLYDMJ")
	private Double wlydmj;

	//
	@Column(name = "YGCLFX")
	private String ygclfx;

	//
	@Column(name = "CKQFW")
	private String ckqfw;

	// 土地用途
	@Column(name = "TDYT")
	private String tdyt;

	//
	@Column(name = "SF_ZTGH")
	private String sf_ztgh;

	//
	@Column(name = "MJJY")
	private String mjjy;

	//
	@Column(name = "SBCC")
	private String sbcc;

	// 新增建设用地面积
	@Column(name = "XZJSYDMJ")
	private Double xzjsydmj;

	//
	@Column(name = "SF_QNYD")
	private String sf_qnyd;

	//
	@Column(name = "YGTJ")
	private String ygtj;

	//
	@Column(name = "EPSG")
	private String epsg;

	// 行政区代码
	@Column(name = "XZQ_DM")
	private String xzq_dm;

	public String getLcmc() {
		return lcmc;
	}

	public void setLcmc(String lcmc) {
		this.lcmc = lcmc;
	}

	public String getSf_kczyjh() {
		return sf_kczyjh;
	}

	public void setSf_kczyjh(String sf_kczyjh) {
		this.sf_kczyjh = sf_kczyjh;
	}

	public String getLcxx() {
		return lcxx;
	}

	public void setLcxx(String lcxx) {
		this.lcxx = lcxx;
	}

	public String getXzq_mc() {
		return xzq_mc;
	}

	public void setXzq_mc(String xzq_mc) {
		this.xzq_mc = xzq_mc;
	}

	public String getDzzhfx() {
		return dzzhfx;
	}

	public void setDzzhfx(String dzzhfx) {
		this.dzzhfx = dzzhfx;
	}

	public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

	public String getSf_zlzxjh() {
		return sf_zlzxjh;
	}

	public void setSf_zlzxjh(String sf_zlzxjh) {
		this.sf_zlzxjh = sf_zlzxjh;
	}

	public String getTdqsxx() {
		return tdqsxx;
	}

	public void setTdqsxx(String tdqsxx) {
		this.tdqsxx = tdqsxx;
	}

	public Double getNydzmj() {
		return nydzmj;
	}

	public void setNydzmj(Double nydzmj) {
		this.nydzmj = nydzmj;
	}

	public String getXmmc() {
		return xmmc;
	}

	public void setXmmc(String xmmc) {
		this.xmmc = xmmc;
	}

	public String getSqdw() {
		return sqdw;
	}

	public void setSqdw(String sqdw) {
		this.sqdw = sqdw;
	}

	public String getAjmc() {
		return ajmc;
	}

	public void setAjmc(String ajmc) {
		this.ajmc = ajmc;
	}

	public String getTxdw() {
		return txdw;
	}

	public void setTxdw(String txdw) {
		this.txdw = txdw;
	}

	public Double getJsydmj() {
		return jsydmj;
	}

	public void setJsydmj(Double jsydmj) {
		this.jsydmj = jsydmj;
	}

	public String getSf_tkkc() {
		return sf_tkkc;
	}

	public void setSf_tkkc(String sf_tkkc) {
		this.sf_tkkc = sf_tkkc;
	}

	public String getZbjc() {
		return zbjc;
	}

	public void setZbjc(String zbjc) {
		this.zbjc = zbjc;
	}

	public String getBcgdqk() {
		return bcgdqk;
	}

	public void setBcgdqk(String bcgdqk) {
		this.bcgdqk = bcgdqk;
	}

	public Double getQzgdmj() {
		return qzgdmj;
	}

	public void setQzgdmj(Double qzgdmj) {
		this.qzgdmj = qzgdmj;
	}

	public String getAjbh() {
		return ajbh;
	}

	public void setAjbh(String ajbh) {
		this.ajbh = ajbh;
	}

	public Double getJbntmj() {
		return jbntmj;
	}

	public void setJbntmj(Double jbntmj) {
		this.jbntmj = jbntmj;
	}

	public String getSf_yg_jbntsf_yg_jbnt() {
		return sf_yg_jbntsf_yg_jbnt;
	}

	public void setSf_yg_jbntsf_yg_jbnt(String sf_yg_jbntsf_yg_jbnt) {
		this.sf_yg_jbntsf_yg_jbnt = sf_yg_jbntsf_yg_jbnt;
	}

	public String getXmbh() {
		return xmbh;
	}

	public void setXmbh(String xmbh) {
		this.xmbh = xmbh;
	}

	public String getLclx() {
		return lclx;
	}

	public void setLclx(String lclx) {
		this.lclx = lclx;
	}

	public String getKqxq() {
		return kqxq;
	}

	public void setKqxq(String kqxq) {
		this.kqxq = kqxq;
	}

	public Double getSqydzmj() {
		return sqydzmj;
	}

	public void setSqydzmj(Double sqydzmj) {
		this.sqydzmj = sqydzmj;
	}

	public String getTdwz() {
		return tdwz;
	}

	public void setTdwz(String tdwz) {
		this.tdwz = tdwz;
	}

	public String getTdsmzq() {
		return tdsmzq;
	}

	public void setTdsmzq(String tdsmzq) {
		this.tdsmzq = tdsmzq;
	}

	public String getKczyygtj() {
		return kczyygtj;
	}

	public void setKczyygtj(String kczyygtj) {
		this.kczyygtj = kczyygtj;
	}

	public Double getCljsydmj() {
		return cljsydmj;
	}

	public void setCljsydmj(Double cljsydmj) {
		this.cljsydmj = cljsydmj;
	}

	public String getSf_ygkq() {
		return sf_ygkq;
	}

	public void setSf_ygkq(String sf_ygkq) {
		this.sf_ygkq = sf_ygkq;
	}

	public Double getWlydmj() {
		return wlydmj;
	}

	public void setWlydmj(Double wlydmj) {
		this.wlydmj = wlydmj;
	}

	public String getYgclfx() {
		return ygclfx;
	}

	public void setYgclfx(String ygclfx) {
		this.ygclfx = ygclfx;
	}

	public String getCkqfw() {
		return ckqfw;
	}

	public void setCkqfw(String ckqfw) {
		this.ckqfw = ckqfw;
	}

	public String getTdyt() {
		return tdyt;
	}

	public void setTdyt(String tdyt) {
		this.tdyt = tdyt;
	}

	public String getSf_ztgh() {
		return sf_ztgh;
	}

	public void setSf_ztgh(String sf_ztgh) {
		this.sf_ztgh = sf_ztgh;
	}

	public String getMjjy() {
		return mjjy;
	}

	public void setMjjy(String mjjy) {
		this.mjjy = mjjy;
	}

	public String getSbcc() {
		return sbcc;
	}

	public void setSbcc(String sbcc) {
		this.sbcc = sbcc;
	}

	public Double getXzjsydmj() {
		return xzjsydmj;
	}

	public void setXzjsydmj(Double xzjsydmj) {
		this.xzjsydmj = xzjsydmj;
	}

	public String getSf_qnyd() {
		return sf_qnyd;
	}

	public void setSf_qnyd(String sf_qnyd) {
		this.sf_qnyd = sf_qnyd;
	}

	public String getYgtj() {
		return ygtj;
	}

	public void setYgtj(String ygtj) {
		this.ygtj = ygtj;
	}

	public String getXzq_dm() {
		return xzq_dm;
	}

	public void setXzq_dm(String xzq_dm) {
		this.xzq_dm = xzq_dm;
	}

	public String getEpsg() {
		return epsg;
	}

	public void setEpsg(String epsg) {
		this.epsg = epsg;
	}

}

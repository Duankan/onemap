package com.kingtopware.onemap.entity;

import java.sql.Timestamp;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kingtopware.framework.entity.BaseEntity;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月1日
 * @description：建设用地审批实体类
 * =====================================
 */
@Entity
@Table(name = "T_INF_ONEMAP_JSYDSPXXB")
public class JsydspEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

	public static final String selectAll = "select PZ_NYD_MJ,GH_YT,YD_LX,st_astext(Geometry),PZ_WH,JSYD_GUID,YRC_MJ,LC_LX,YS_WH,XM_MC,PZRQ,BC_PH_SM,PZ_GD_MJ,PZ_JB,SY_KZ_MJ,KRC_MJ,PZ_YD_MJ,XZQDM,YZ_MJ,YG_MJ,SY_KG_MJ,PZ_JSYD_MJ,PZ_LD_MJ,SQ_DW_DH,SQ_DW,PZ_JBNT_MJ,LRSJ,BZ,LC_MC,GH_YT_BM,XZQMC,SQ_ZS_JT,XZ_JSYD_MJ,SQ_DW_LXR,AJ_BH,NF,PZ_DW,PZ_WLYD_MJ,CL_JSYD_MJ,PZ_CD_MJ,AJ_MC,PZ_XM_MJ,PZ_QTNYD_MJ,dah";
	public static final String selectKey = "pz_nyd_mj,gh_yt,yd_lx,geometry,pz_wh,jsyd_guid,yrc_mj,lc_lx,ys_wh,xm_mc,pzrq,bc_ph_sm,pz_gd_mj,pz_jb,sy_kz_mj,krc_mj,pz_yd_mj,xzqdm,yz_mj,yg_mj,sy_kg_mj,pz_jsyd_mj,pz_ld_mj,sq_dw_dh,sq_dw,pz_jbnt_mj,lrsj,bz,lc_mc,gh_yt_bm,xzqmc,sq_zs_jt,xz_jsyd_mj,sq_dw_lxr,aj_bh,nf,pz_dw,pz_wlyd_mj,cl_jsyd_mj,pz_cd_mj,aj_mc,pz_xm_mj,pz_qtnyd_mj,dah";

	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "JSYD_GUID", length = 36)
	private String jsyd_guid;

	public String getJsyd_guid() {
		return jsyd_guid;
	}

	public void setJsyd_guid(String jsyd_guid) {
		this.jsyd_guid = jsyd_guid;
	}

	public String getPrimaryValue() {
		return getJsyd_guid();
	}

	public String getPrimaryKey() {
		return "JSYD_GUID";
	}

	//
	@Column(name = "PZ_NYD_MJ")
	private Double pz_nyd_mj;

	//
	@Column(name = "GH_YT")
	private String gh_yt;

	//
	@Column(name = "YD_LX")
	private String yd_lx;

	//
	@Column(name = "Geometry")
	private String geometry;

	// 批准文号
	@Column(name = "PZ_WH")
	private String pz_wh;
	// 批准文号
	@Column(name = "TD_ZL")
	private String td_zl;

	// 档案号
	@Column(name = "dah")
	private String dah;

	public String getDah() {
		return dah;
	}

	public void setDah(String dah) {
		this.dah = dah;
	}

	public String getTd_zl() {
		return td_zl;
	}

	public void setTd_zl(String td_zl) {
		this.td_zl = td_zl;
	}

	//
	@Column(name = "YRC_MJ")
	private Double yrc_mj;

	//
	@Column(name = "LC_LX")
	private String lc_lx;

	// 预审文号
	@Column(name = "YS_WH")
	private String ys_wh;

	//
	@Column(name = "XM_MC")
	private String xm_mc;

	//
	@Column(name = "PZRQ")
	private Date pzrq;

	//
	@Column(name = "BC_PH_SM")
	private String bc_ph_sm;

	//
	@Column(name = "PZ_GD_MJ")
	private Double pz_gd_mj;

	//
	@Column(name = "SY_KZ_MJ")
	private Double sy_kz_mj;

	//
	@Column(name = "KRC_MJ")
	private Double krc_mj;

	//
	@Column(name = "PZ_YD_MJ")
	private Double pz_yd_mj;

	//
	@Column(name = "XZQDM")
	private String xzqdm;

	//
	@Column(name = "YZ_MJ")
	private Double yz_mj;

	//
	@Column(name = "YG_MJ")
	private Double yg_mj;

	//
	@Column(name = "SY_KG_MJ")
	private Double sy_kg_mj;

	//
	@Column(name = "PZ_JSYD_MJ")
	private Double pz_jsyd_mj;

	//
	@Column(name = "PZ_LD_MJ")
	private Double pz_ld_mj;

	//
	@Column(name = "SQ_DW_DH")
	private String sq_dw_dh;

	//
	@Column(name = "SQ_DW")
	private String sq_dw;

	//
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@Column(name = "LRSJ")
	private Timestamp lrsj;

	//
	@Column(name = "BZ")
	private String bz;

	//
	@Column(name = "LC_MC")
	private String lc_mc;

	//
	@Column(name = "GH_YT_BM")
	private String gh_yt_bm;

	//
	@Column(name = "XZQMC")
	private String xzqmc;

	//
	@Column(name = "SQ_ZS_JT")
	private Double sq_zs_jt;

	//
	@Column(name = "XZ_JSYD_MJ")
	private Double xz_jsyd_mj;

	//
	@Column(name = "SQ_DW_LXR")
	private String sq_dw_lxr;

	//
	@Column(name = "AJ_BH")
	private String aj_bh;

	//
	@Column(name = "NF")
	private Double nf;

	//
	@Column(name = "PZ_WLYD_MJ")
	private Double pz_wlyd_mj;

	//
	@Column(name = "CL_JSYD_MJ")
	private Double cl_jsyd_mj;

	//
	@Column(name = "PZ_CD_MJ")
	private Double pz_cd_mj;

	//
	@Column(name = "AJ_MC")
	private String aj_mc;

	//
	@Column(name = "PZ_XM_MJ")
	private Double pz_xm_mj;

	//
	@Column(name = "PZ_QTNYD_MJ")
	private Double pz_qtnyd_mj;

	public Double getPz_nyd_mj() {
		return pz_nyd_mj;
	}

	public void setPz_nyd_mj(Double pz_nyd_mj) {
		this.pz_nyd_mj = pz_nyd_mj;
	}

	public String getGh_yt() {
		return gh_yt;
	}

	public void setGh_yt(String gh_yt) {
		this.gh_yt = gh_yt;
	}

	public String getYd_lx() {
		return yd_lx;
	}

	public void setYd_lx(String yd_lx) {
		this.yd_lx = yd_lx;
	}

	public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

	public String getPz_wh() {
		return pz_wh;
	}

	public void setPz_wh(String pz_wh) {
		this.pz_wh = pz_wh;
	}

	public Double getYrc_mj() {
		return yrc_mj;
	}

	public void setYrc_mj(Double yrc_mj) {
		this.yrc_mj = yrc_mj;
	}

	public String getLc_lx() {
		return lc_lx;
	}

	public void setLc_lx(String lc_lx) {
		this.lc_lx = lc_lx;
	}

	public String getYs_wh() {
		return ys_wh;
	}

	public void setYs_wh(String ys_wh) {
		this.ys_wh = ys_wh;
	}

	public String getXm_mc() {
		return xm_mc;
	}

	public void setXm_mc(String xm_mc) {
		this.xm_mc = xm_mc;
	}

	public Date getPzrq() {
		return pzrq;
	}

	public void setPzrq(Date pzrq) {
		this.pzrq = pzrq;
	}

	public String getBc_ph_sm() {
		return bc_ph_sm;
	}

	public void setBc_ph_sm(String bc_ph_sm) {
		this.bc_ph_sm = bc_ph_sm;
	}

	public Double getPz_gd_mj() {
		return pz_gd_mj;
	}

	public void setPz_gd_mj(Double pz_gd_mj) {
		this.pz_gd_mj = pz_gd_mj;
	}

	public Double getSy_kz_mj() {
		return sy_kz_mj;
	}

	public void setSy_kz_mj(Double sy_kz_mj) {
		this.sy_kz_mj = sy_kz_mj;
	}

	public Double getKrc_mj() {
		return krc_mj;
	}

	public void setKrc_mj(Double krc_mj) {
		this.krc_mj = krc_mj;
	}

	public Double getPz_yd_mj() {
		return pz_yd_mj;
	}

	public void setPz_yd_mj(Double pz_yd_mj) {
		this.pz_yd_mj = pz_yd_mj;
	}

	public String getXzqdm() {
		return xzqdm;
	}

	public void setXzqdm(String xzqdm) {
		this.xzqdm = xzqdm;
	}

	public Double getYz_mj() {
		return yz_mj;
	}

	public void setYz_mj(Double yz_mj) {
		this.yz_mj = yz_mj;
	}

	public Double getYg_mj() {
		return yg_mj;
	}

	public void setYg_mj(Double yg_mj) {
		this.yg_mj = yg_mj;
	}

	public Double getSy_kg_mj() {
		return sy_kg_mj;
	}

	public void setSy_kg_mj(Double sy_kg_mj) {
		this.sy_kg_mj = sy_kg_mj;
	}

	public Double getPz_jsyd_mj() {
		return pz_jsyd_mj;
	}

	public void setPz_jsyd_mj(Double pz_jsyd_mj) {
		this.pz_jsyd_mj = pz_jsyd_mj;
	}

	public Double getPz_ld_mj() {
		return pz_ld_mj;
	}

	public void setPz_ld_mj(Double pz_ld_mj) {
		this.pz_ld_mj = pz_ld_mj;
	}

	public String getSq_dw_dh() {
		return sq_dw_dh;
	}

	public void setSq_dw_dh(String sq_dw_dh) {
		this.sq_dw_dh = sq_dw_dh;
	}

	public String getSq_dw() {
		return sq_dw;
	}

	public void setSq_dw(String sq_dw) {
		this.sq_dw = sq_dw;
	}

	public Timestamp getLrsj() {
		return lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public String getLc_mc() {
		return lc_mc;
	}

	public void setLc_mc(String lc_mc) {
		this.lc_mc = lc_mc;
	}

	public String getGh_yt_bm() {
		return gh_yt_bm;
	}

	public void setGh_yt_bm(String gh_yt_bm) {
		this.gh_yt_bm = gh_yt_bm;
	}

	public String getXzqmc() {
		return xzqmc;
	}

	public void setXzqmc(String xzqmc) {
		this.xzqmc = xzqmc;
	}

	public Double getSq_zs_jt() {
		return sq_zs_jt;
	}

	public void setSq_zs_jt(Double sq_zs_jt) {
		this.sq_zs_jt = sq_zs_jt;
	}

	public Double getXz_jsyd_mj() {
		return xz_jsyd_mj;
	}

	public void setXz_jsyd_mj(Double xz_jsyd_mj) {
		this.xz_jsyd_mj = xz_jsyd_mj;
	}

	public String getSq_dw_lxr() {
		return sq_dw_lxr;
	}

	public void setSq_dw_lxr(String sq_dw_lxr) {
		this.sq_dw_lxr = sq_dw_lxr;
	}

	public String getAj_bh() {
		return aj_bh;
	}

	public void setAj_bh(String aj_bh) {
		this.aj_bh = aj_bh;
	}

	public Double getNf() {
		return nf;
	}

	public void setNf(Double nf) {
		this.nf = nf;
	}

	public Double getPz_wlyd_mj() {
		return pz_wlyd_mj;
	}

	public void setPz_wlyd_mj(Double pz_wlyd_mj) {
		this.pz_wlyd_mj = pz_wlyd_mj;
	}

	public Double getCl_jsyd_mj() {
		return cl_jsyd_mj;
	}

	public void setCl_jsyd_mj(Double cl_jsyd_mj) {
		this.cl_jsyd_mj = cl_jsyd_mj;
	}

	public Double getPz_cd_mj() {
		return pz_cd_mj;
	}

	public void setPz_cd_mj(Double pz_cd_mj) {
		this.pz_cd_mj = pz_cd_mj;
	}

	public String getAj_mc() {
		return aj_mc;
	}

	public void setAj_mc(String aj_mc) {
		this.aj_mc = aj_mc;
	}

	public Double getPz_xm_mj() {
		return pz_xm_mj;
	}

	public void setPz_xm_mj(Double pz_xm_mj) {
		this.pz_xm_mj = pz_xm_mj;
	}

	public Double getPz_qtnyd_mj() {
		return pz_qtnyd_mj;
	}

	public void setPz_qtnyd_mj(Double pz_qtnyd_mj) {
		this.pz_qtnyd_mj = pz_qtnyd_mj;
	}

}
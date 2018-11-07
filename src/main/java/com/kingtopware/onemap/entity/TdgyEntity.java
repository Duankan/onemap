
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

@Entity
@Table(name = "T_INF_ONEMAP_TDGYXXB")
public class TdgyEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	public static final String selectAll="select SJYT,GHYT,SJ_DG_SJ,MIN_JZMD,XM_MC,JG_SJ,SY_QS_RQ,MIN_LHL,TD_YT,XM_BH,YD_NX,YD_DW_LXR,MAX_LHL,MAX_JZMD,SJ_JG_SJ,MAX_RJL,SD_YT,ZDH,PF_WH,JZ_MJ,CRJK,LC_MC,MIN_JZ_GD,LRSJ,GY_MJ,YD_DW_LX_DH,NF,SQ_DW,HTQDRQ,QT_YD_QK,TD_ZL,SF_KF_JS,XZQDM,BG_JG_RQ,WKFLY_YY,BZ,DG_SJ,BH,MAX_JZ_GD,PZ_RQ,PG_JG,QT_LY_MJ_SM,MIN_RJL,GDXM_GUID,BG_KG_RQ,LC_LX,DX_JZ_MJ,GY_FS,XZQMC,QT_LY_MJ,SY_JZ_RQ,AJ_MC,DZ_BA_BH,st_astext(Geometry),pzjg,dah";
	public static final String selectKey= "sjyt,ghyt,sj_dg_sj,min_jzmd,xm_mc,jg_sj,sy_qs_rq,min_lhl,td_yt,xm_bh,yd_nx,yd_dw_lxr,max_lhl,max_jzmd,sj_jg_sj,max_rjl,sd_yt,zdh,pf_wh,jz_mj,crjk,lc_mc,min_jz_gd,lrsj,gy_mj,yd_dw_lx_dh,nf,sq_dw,htqdrq,qt_yd_qk,td_zl,sf_kf_js,xzqdm,bg_jg_rq,wkfly_yy,bz,dg_sj,bh,max_jz_gd,pz_rq,pg_jg,qt_ly_mj_sm,min_rjl,gdxm_guid,bg_kg_rq,lc_lx,dx_jz_mj,gy_fs,xzqmc,qt_ly_mj,sy_jz_rq,aj_mc,dz_ba_bh,geometry,pzjg,dah";
	
	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "GDXM_GUID", length = 36)
	private String gdxm_guid;
	
	public String getPrimaryValue() {
		return getGdxm_guid();
	}

	public String getPrimaryKey() {
		return "GDXM_GUID";
	}
	

    // 实际用途
    @Column(name = "SJYT")
	private String sjyt;

    //出让价款
    @Column(name = "crjk")
	private String crjk;

    public String getCrjk() {
		return crjk;
	}

	public void setCrjk(String crjk) {
		this.crjk = crjk;
	}


	// 规划用途
    @Column(name = "GHYT")
	private String ghyt;

    // 实际动工时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "SJ_DG_SJ")
	private Timestamp sj_dg_sj;

    // 建筑密度下线
    @Column(name = "MIN_JZMD")
	private Double min_jzmd;

    // 项目名称
    @Column(name = "XM_MC")
	private String xm_mc;

    // 竣工时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "JG_SJ")
	private Timestamp jg_sj;

    // 使用起始日期
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "SY_QS_RQ")
	private Timestamp sy_qs_rq;

    // 绿化率下线
    @Column(name = "MIN_LHL")
	private Double min_lhl;

    // 土地用途
    @Column(name = "TD_YT")
	private String td_yt;

    // 项目编号
    @Column(name = "XM_BH")
	private String xm_bh;

    // 用地年限
    @Column(name = "YD_NX")
	private Double yd_nx;

    // 用地单位联系人
    @Column(name = "YD_DW_LXR")
	private String yd_dw_lxr;

    // 绿化率上限
    @Column(name = "MAX_LHL")
	private Double max_lhl;

    // 建筑密度上限
    @Column(name = "MAX_JZMD")
	private Double max_jzmd;

    // 实际竣工时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "SJ_JG_SJ")
	private Timestamp sj_jg_sj;

    // 最大容积率
    @Column(name = "MAX_RJL")
	private Double max_rjl;

    // 设定用途
    @Column(name = "SD_YT")
	private String sd_yt;

    // 宗地号
    @Column(name = "ZDH")
	private String zdh;

    // 批复文号
    @Column(name = "PF_WH")
	private String pf_wh;

    // 建筑面积
    @Column(name = "JZ_MJ")
	private Double jz_mj;

    // 流程名称
    @Column(name = "LC_MC")
	private String lc_mc;

    // 建筑高度下线
    @Column(name = "MIN_JZ_GD")
	private Double min_jz_gd;

    // 录入时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "LRSJ")
	private Timestamp lrsj;

    // 供应面积
    @Column(name = "GY_MJ")
	private Double gy_mj;

    // 用地单位联系电话
    @Column(name = "YD_DW_LX_DH")
	private String yd_dw_lx_dh;

    // 
    @Column(name = "NF")
	private Double nf;

    // 申请单位
    @Column(name = "SQ_DW")
	private String sq_dw;

    // 合同签订日期
    @Column(name = "HTQDRQ")
	private Date htqdrq;

    // 其他约定情况
    @Column(name = "QT_YD_QK")
	private String qt_yd_qk;

    // 土地坐落
    @Column(name = "TD_ZL")
	private String td_zl;

    // 是否进行开发建设
    @Column(name = "SF_KF_JS")
	private String sf_kf_js;

    // 行政区代码
    @Column(name = "XZQDM")
	private String xzqdm;

    // 变更竣工日期
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "BG_JG_RQ")
	private Timestamp bg_jg_rq;

    // 不开发利用原因
    @Column(name = "WKFLY_YY")
	private String wkfly_yy;

    // 
    @Column(name = "BZ")
	private String bz;

    // 动工时间
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "DG_SJ")
	private Timestamp dg_sj;

    // 合同/划拨编号
    @Column(name = "BH")
	private String bh;

    // 建筑高度上限
    @Column(name = "MAX_JZ_GD")
	private Double max_jz_gd;

    // 批复日期
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "PZ_RQ")
	private Timestamp pz_rq;

    // 评估价格
    @Column(name = "PG_JG")
	private Double pg_jg;

    // 其他来源面积说明
    @Column(name = "QT_LY_MJ_SM")
	private String qt_ly_mj_sm;

    // 最小容积率
    @Column(name = "MIN_RJL")
	private Double min_rjl;

    

    // 变更开工日期
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "BG_KG_RQ")
	private Timestamp bg_kg_rq;

    // 流程类型
    @Column(name = "LC_LX")
	private String lc_lx;

    // 地下建筑面积
    @Column(name = "DX_JZ_MJ")
	private Double dx_jz_mj;

    // 
    @Column(name = "GY_FS")
	private String gy_fs;

    // 行政区名称
    @Column(name = "XZQMC")
	private String xzqmc;

    // 其他来源面积
    @Column(name = "QT_LY_MJ")
	private Double qt_ly_mj;

    // 使用截止日期
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "SY_JZ_RQ")
	private Timestamp sy_jz_rq;

    // 电子监管号
    @Column(name = "DZ_BA_BH")
	private String dz_ba_bh;

    // 
    @Column(name = "Geometry")
	private String geometry;
    
    // 案卷名称
    @Column(name = "AJ_MC")
	private String aj_mc;
    
    // 批准机关
    @Column(name = "pzjg")
	private String pzjg;
    
    // 档案号
 	@Column(name = "dah")
 	private String dah;

 	public String getDah() {
 		return dah;
 	}

 	public void setDah(String dah) {
 		this.dah = dah;
 	}

    public String getSjyt() {
		return sjyt;
	}

	public void setSjyt(String sjyt) {
		this.sjyt = sjyt;
	}

    public String getGhyt() {
		return ghyt;
	}

	public void setGhyt(String ghyt) {
		this.ghyt = ghyt;
	}

    public Timestamp getSj_dg_sj() {
		return sj_dg_sj;
	}

	public void setSj_dg_sj(Timestamp sj_dg_sj) {
		this.sj_dg_sj = sj_dg_sj;
	}

    public Double getMin_jzmd() {
		return min_jzmd;
	}

	public void setMin_jzmd(Double min_jzmd) {
		this.min_jzmd = min_jzmd;
	}

    public String getXm_mc() {
		return xm_mc;
	}

	public void setXm_mc(String xm_mc) {
		this.xm_mc = xm_mc;
	}

    public Timestamp getJg_sj() {
		return jg_sj;
	}

	public void setJg_sj(Timestamp jg_sj) {
		this.jg_sj = jg_sj;
	}

    public Timestamp getSy_qs_rq() {
		return sy_qs_rq;
	}

	public void setSy_qs_rq(Timestamp sy_qs_rq) {
		this.sy_qs_rq = sy_qs_rq;
	}

    public Double getMin_lhl() {
		return min_lhl;
	}

	public void setMin_lhl(Double min_lhl) {
		this.min_lhl = min_lhl;
	}

    public String getTd_yt() {
		return td_yt;
	}

	public void setTd_yt(String td_yt) {
		this.td_yt = td_yt;
	}

    public String getXm_bh() {
		return xm_bh;
	}

	public void setXm_bh(String xm_bh) {
		this.xm_bh = xm_bh;
	}

    public Double getYd_nx() {
		return yd_nx;
	}

	public void setYd_nx(Double yd_nx) {
		this.yd_nx = yd_nx;
	}

    public String getYd_dw_lxr() {
		return yd_dw_lxr;
	}

	public void setYd_dw_lxr(String yd_dw_lxr) {
		this.yd_dw_lxr = yd_dw_lxr;
	}

    public Double getMax_lhl() {
		return max_lhl;
	}

	public void setMax_lhl(Double max_lhl) {
		this.max_lhl = max_lhl;
	}

    public Double getMax_jzmd() {
		return max_jzmd;
	}

	public void setMax_jzmd(Double max_jzmd) {
		this.max_jzmd = max_jzmd;
	}

    public Timestamp getSj_jg_sj() {
		return sj_jg_sj;
	}

	public void setSj_jg_sj(Timestamp sj_jg_sj) {
		this.sj_jg_sj = sj_jg_sj;
	}

    public Double getMax_rjl() {
		return max_rjl;
	}

	public void setMax_rjl(Double max_rjl) {
		this.max_rjl = max_rjl;
	}

    public String getSd_yt() {
		return sd_yt;
	}

	public void setSd_yt(String sd_yt) {
		this.sd_yt = sd_yt;
	}

    public String getZdh() {
		return zdh;
	}

	public void setZdh(String zdh) {
		this.zdh = zdh;
	}

    public String getPf_wh() {
		return pf_wh;
	}

	public void setPf_wh(String pf_wh) {
		this.pf_wh = pf_wh;
	}

    public Double getJz_mj() {
		return jz_mj;
	}

	public void setJz_mj(Double jz_mj) {
		this.jz_mj = jz_mj;
	}

    public String getLc_mc() {
		return lc_mc;
	}

	public void setLc_mc(String lc_mc) {
		this.lc_mc = lc_mc;
	}

    public Double getMin_jz_gd() {
		return min_jz_gd;
	}

	public void setMin_jz_gd(Double min_jz_gd) {
		this.min_jz_gd = min_jz_gd;
	}

    public Timestamp getLrsj() {
		return lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

    public Double getGy_mj() {
		return gy_mj;
	}

	public void setGy_mj(Double gy_mj) {
		this.gy_mj = gy_mj;
	}

    public String getYd_dw_lx_dh() {
		return yd_dw_lx_dh;
	}

	public void setYd_dw_lx_dh(String yd_dw_lx_dh) {
		this.yd_dw_lx_dh = yd_dw_lx_dh;
	}

    public Double getNf() {
		return nf;
	}

	public void setNf(Double nf) {
		this.nf = nf;
	}

    public String getSq_dw() {
		return sq_dw;
	}

	public void setSq_dw(String sq_dw) {
		this.sq_dw = sq_dw;
	}

    public Date getHtqdrq() {
		return htqdrq;
	}

	public void setHtqdrq(Date htqdrq) {
		this.htqdrq = htqdrq;
	}

    public String getQt_yd_qk() {
		return qt_yd_qk;
	}

	public void setQt_yd_qk(String qt_yd_qk) {
		this.qt_yd_qk = qt_yd_qk;
	}

    public String getTd_zl() {
		return td_zl;
	}

	public void setTd_zl(String td_zl) {
		this.td_zl = td_zl;
	}

    public String getSf_kf_js() {
		return sf_kf_js;
	}

	public void setSf_kf_js(String sf_kf_js) {
		this.sf_kf_js = sf_kf_js;
	}

    public String getXzqdm() {
		return xzqdm;
	}

	public void setXzqdm(String xzqdm) {
		this.xzqdm = xzqdm;
	}

    public Timestamp getBg_jg_rq() {
		return bg_jg_rq;
	}

	public void setBg_jg_rq(Timestamp bg_jg_rq) {
		this.bg_jg_rq = bg_jg_rq;
	}

    public String getWkfly_yy() {
		return wkfly_yy;
	}

	public void setWkfly_yy(String wkfly_yy) {
		this.wkfly_yy = wkfly_yy;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public Timestamp getDg_sj() {
		return dg_sj;
	}

	public void setDg_sj(Timestamp dg_sj) {
		this.dg_sj = dg_sj;
	}

    public String getBh() {
		return bh;
	}

	public void setBh(String bh) {
		this.bh = bh;
	}

    public Double getMax_jz_gd() {
		return max_jz_gd;
	}

	public void setMax_jz_gd(Double max_jz_gd) {
		this.max_jz_gd = max_jz_gd;
	}

    public Timestamp getPz_rq() {
		return pz_rq;
	}

	public void setPz_rq(Timestamp pz_rq) {
		this.pz_rq = pz_rq;
	}

    public Double getPg_jg() {
		return pg_jg;
	}

	public void setPg_jg(Double pg_jg) {
		this.pg_jg = pg_jg;
	}

    public String getQt_ly_mj_sm() {
		return qt_ly_mj_sm;
	}

	public void setQt_ly_mj_sm(String qt_ly_mj_sm) {
		this.qt_ly_mj_sm = qt_ly_mj_sm;
	}

    public Double getMin_rjl() {
		return min_rjl;
	}

	public void setMin_rjl(Double min_rjl) {
		this.min_rjl = min_rjl;
	}

    public String getGdxm_guid() {
		return gdxm_guid;
	}

	public void setGdxm_guid(String gdxm_guid) {
		this.gdxm_guid = gdxm_guid;
	}

    public Timestamp getBg_kg_rq() {
		return bg_kg_rq;
	}

	public void setBg_kg_rq(Timestamp bg_kg_rq) {
		this.bg_kg_rq = bg_kg_rq;
	}

    public String getLc_lx() {
		return lc_lx;
	}

	public void setLc_lx(String lc_lx) {
		this.lc_lx = lc_lx;
	}

    public Double getDx_jz_mj() {
		return dx_jz_mj;
	}

	public void setDx_jz_mj(Double dx_jz_mj) {
		this.dx_jz_mj = dx_jz_mj;
	}

    public String getGy_fs() {
		return gy_fs;
	}

	public void setGy_fs(String gy_fs) {
		this.gy_fs = gy_fs;
	}

    public String getXzqmc() {
		return xzqmc;
	}

	public void setXzqmc(String xzqmc) {
		this.xzqmc = xzqmc;
	}

    public Double getQt_ly_mj() {
		return qt_ly_mj;
	}

	public void setQt_ly_mj(Double qt_ly_mj) {
		this.qt_ly_mj = qt_ly_mj;
	}

    public Timestamp getSy_jz_rq() {
		return sy_jz_rq;
	}

	public void setSy_jz_rq(Timestamp sy_jz_rq) {
		this.sy_jz_rq = sy_jz_rq;
	}

    public String getDz_ba_bh() {
		return dz_ba_bh;
	}

	public void setDz_ba_bh(String dz_ba_bh) {
		this.dz_ba_bh = dz_ba_bh;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}
	
	 public String getAjmc() {
		return aj_mc;
	}

	public void setAjmc(String aj_mc) {
		this.aj_mc = aj_mc;
	}
	
	public String getPzjg() {
		return pzjg;
	}

	public void setPzjg(String pzjg) {
		this.pzjg = pzjg;
	}

}
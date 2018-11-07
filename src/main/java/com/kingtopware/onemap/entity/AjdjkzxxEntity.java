
package com.kingtopware.onemap.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "T_INF_ONEMAP_AJDJKZXXB")
public class AjdjkzxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "AJ_KZ_GUID",length = 36)
	private String aj_kz_guid;
	
	public String getPrimaryValue() {
		return getAj_kz_guid();
	}

	public String getPrimaryKey() {
		return "AJ_KZ_GUID";
	}
	 @Column(name = "AJ_DJ_GUID")
	 private String aj_dj_guid;
    // 
    @Column(name = "WKG_MJ")
	private String wkg_mj;

    // 
    @Column(name = "SJ_LHL")
	private String sj_lhl;

    // 
    @Column(name = "SJ_JZMD")
	private String sj_jzmd;

    // 
    @Column(name = "SJ_GDMJ")
	private String sj_gdmj;

    // 
    @Column(name = "SJ_JZGD")
	private String sj_jzgd;

    // 
    @Column(name = "ZG_CS")
	private String zg_cs;

    // 
    @Column(name = "XZ_ZT")
	private String xz_zt;

    // 
    @Column(name = "WY_LX")
	private String wy_lx;

    // 
    @Column(name = "XZ_LX")
	private String xz_lx;

    // 
    @Column(name = "SJ_TDYT")
	private String sj_tdyt;

    // 
    @Column(name = "WFCL_R")
	private String wfcl_r;

    // 
    @Column(name = "SJ_RJL")
	private String sj_rjl;

    // 
    @Column(name = "WY_ZT")
	private String wy_zt;

    // 
    @Column(name = "SJDGSJ")
	private Date sjdgsj;

    // 
    @Column(name = "CF_LX")
	private String cf_lx;

    // 
    @Column(name = "MSJZW_MJ")
	private String msjzw_mj;

    // 
    @Column(name = "CCJZW_MJ")
	private String ccjzw_mj;

    // 
    @Column(name = "YKG_MJ")
	private String ykg_mj;

    // 
    @Column(name = "WFRD_R")
	private String wfrd_r;

    // 
   

    // 
    @Column(name = "SJJD_SJ")
	private Date sjjd_sj;

    // 
    @Column(name = "WFCL_SJ")
	private Date wfcl_sj;

    // 
    @Column(name = "YJG_MJ")
	private String yjg_mj;

    // 
    @Column(name = "WFRD_SJ")
	private Date wfrd_sj;

    // 
    @Column(name = "FGTD_MJ")
	private String fgtd_mj;

    // 
    @Column(name = "SJ_FK")
	private String sj_fk;

    public String getWkg_mj() {
		return wkg_mj;
	}

	public void setWkg_mj(String wkg_mj) {
		this.wkg_mj = wkg_mj;
	}

    public String getSj_lhl() {
		return sj_lhl;
	}

	public void setSj_lhl(String sj_lhl) {
		this.sj_lhl = sj_lhl;
	}

    public String getSj_jzmd() {
		return sj_jzmd;
	}

	public void setSj_jzmd(String sj_jzmd) {
		this.sj_jzmd = sj_jzmd;
	}

    public String getAj_dj_guid() {
		return aj_dj_guid;
	}

	public void setAj_dj_guid(String aj_dj_guid) {
		this.aj_dj_guid = aj_dj_guid;
	}

    public String getSj_gdmj() {
		return sj_gdmj;
	}

	public void setSj_gdmj(String sj_gdmj) {
		this.sj_gdmj = sj_gdmj;
	}

    public String getSj_jzgd() {
		return sj_jzgd;
	}

	public void setSj_jzgd(String sj_jzgd) {
		this.sj_jzgd = sj_jzgd;
	}

    public String getZg_cs() {
		return zg_cs;
	}

	public void setZg_cs(String zg_cs) {
		this.zg_cs = zg_cs;
	}

    public String getXz_zt() {
		return xz_zt;
	}

	public void setXz_zt(String xz_zt) {
		this.xz_zt = xz_zt;
	}

    public String getWy_lx() {
		return wy_lx;
	}

	public void setWy_lx(String wy_lx) {
		this.wy_lx = wy_lx;
	}

    public String getXz_lx() {
		return xz_lx;
	}

	public void setXz_lx(String xz_lx) {
		this.xz_lx = xz_lx;
	}

    public String getSj_tdyt() {
		return sj_tdyt;
	}

	public void setSj_tdyt(String sj_tdyt) {
		this.sj_tdyt = sj_tdyt;
	}

    public String getWfcl_r() {
		return wfcl_r;
	}

	public void setWfcl_r(String wfcl_r) {
		this.wfcl_r = wfcl_r;
	}

    public String getSj_rjl() {
		return sj_rjl;
	}

	public void setSj_rjl(String sj_rjl) {
		this.sj_rjl = sj_rjl;
	}

    public String getWy_zt() {
		return wy_zt;
	}

	public void setWy_zt(String wy_zt) {
		this.wy_zt = wy_zt;
	}

    public Date getSjdgsj() {
		return sjdgsj;
	}

	public void setSjdgsj(Date sjdgsj) {
		this.sjdgsj = sjdgsj;
	}

    public String getCf_lx() {
		return cf_lx;
	}

	public void setCf_lx(String cf_lx) {
		this.cf_lx = cf_lx;
	}

    public String getMsjzw_mj() {
		return msjzw_mj;
	}

	public void setMsjzw_mj(String msjzw_mj) {
		this.msjzw_mj = msjzw_mj;
	}

    public String getCcjzw_mj() {
		return ccjzw_mj;
	}

	public void setCcjzw_mj(String ccjzw_mj) {
		this.ccjzw_mj = ccjzw_mj;
	}

    public String getYkg_mj() {
		return ykg_mj;
	}

	public void setYkg_mj(String ykg_mj) {
		this.ykg_mj = ykg_mj;
	}

    public String getWfrd_r() {
		return wfrd_r;
	}

	public void setWfrd_r(String wfrd_r) {
		this.wfrd_r = wfrd_r;
	}

    public String getAj_kz_guid() {
		return aj_kz_guid;
	}

	public void setAj_kz_guid(String aj_kz_guid) {
		this.aj_kz_guid = aj_kz_guid;
	}

    public Date getSjjd_sj() {
		return sjjd_sj;
	}

	public void setSjjd_sj(Date sjjd_sj) {
		this.sjjd_sj = sjjd_sj;
	}

    public Date getWfcl_sj() {
		return wfcl_sj;
	}

	public void setWfcl_sj(Date wfcl_sj) {
		this.wfcl_sj = wfcl_sj;
	}

    public String getYjg_mj() {
		return yjg_mj;
	}

	public void setYjg_mj(String yjg_mj) {
		this.yjg_mj = yjg_mj;
	}

    public Date getWfrd_sj() {
		return wfrd_sj;
	}

	public void setWfrd_sj(Date wfrd_sj) {
		this.wfrd_sj = wfrd_sj;
	}

    public String getFgtd_mj() {
		return fgtd_mj;
	}

	public void setFgtd_mj(String fgtd_mj) {
		this.fgtd_mj = fgtd_mj;
	}

    public String getSj_fk() {
		return sj_fk;
	}

	public void setSj_fk(String sj_fk) {
		this.sj_fk = sj_fk;
	}

}
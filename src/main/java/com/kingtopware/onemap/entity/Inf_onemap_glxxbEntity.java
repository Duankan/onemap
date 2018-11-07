
package com.kingtopware.onemap.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "t_inf_onemap_glxxb")
public class Inf_onemap_glxxbEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 本次登记面积
    @Column(name = "dj_mj")
	private String dj_mj;

    // 备注
    @Column(name = "bz")
	private String bz;

    // 批地项目名称
    @Column(name = "pdxm_mc")
	private String pdxm_mc;

    // 供地项目名称
    @Column(name = "gd_xmmc")
	private String gd_xmmc;

    // 
    @Column(name = "guid1")
	private String guid1;

    // 征收面积
    @Column(name = "zs_mj")
	private String zs_mj;

    // 补充耕地项目名称
    @Column(name = "bcgd_xmmc")
	private String bcgd_xmmc;

    // 储备面积
    @Column(name = "cb_mj")
	private String cb_mj;

    // 登记发证项目名称
    @Column(name = "djfz_xm_mc")
	private String djfz_xm_mc;

    // 
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "guid")
	private String guid;

    // 占补平衡面积补充面积
    @Column(name = "zbphmj")
	private String zbphmj;

    // 储备来源项目名称
    @Column(name = "cblyxm_mc")
	private String cblyxm_mc;

    // 关联的类型（批-P,征-Z,储-C,供-G,用-Y,补-B,查-W;在批地流程中产生的批地和补地图层的关联表示为PB,在补地流程中产生的补地和批地的关联表示为BP，其他的类推)
    @Column(name = "ltype")
	private String ltype;

    // 储备项目项目名称
    @Column(name = "cbxm_mc")
	private String cbxm_mc;

    // 
    @Column(name = "geometry")
	private String geometry;

    // 供应面积
    @Column(name = "gy_mj")
	private String gy_mj;

    // 
    @Column(name = "guid2")
	private String guid2;

    // 征地项目名称
    @Column(name = "zd_xmmc")
	private String zd_xmmc;

    // 储备土地项目名称
    @Column(name = "cbtd_xm_mc")
	private String cbtd_xm_mc;

    public String getDj_mj() {
		return dj_mj;
	}

	public void setDj_mj(String dj_mj) {
		this.dj_mj = dj_mj;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getPdxm_mc() {
		return pdxm_mc;
	}

	public void setPdxm_mc(String pdxm_mc) {
		this.pdxm_mc = pdxm_mc;
	}

    public String getGd_xmmc() {
		return gd_xmmc;
	}

	public void setGd_xmmc(String gd_xmmc) {
		this.gd_xmmc = gd_xmmc;
	}

    public String getGuid1() {
		return guid1;
	}

	public void setGuid1(String guid1) {
		this.guid1 = guid1;
	}

    public String getZs_mj() {
		return zs_mj;
	}

	public void setZs_mj(String zs_mj) {
		this.zs_mj = zs_mj;
	}

    public String getBcgd_xmmc() {
		return bcgd_xmmc;
	}

	public void setBcgd_xmmc(String bcgd_xmmc) {
		this.bcgd_xmmc = bcgd_xmmc;
	}

    public String getCb_mj() {
		return cb_mj;
	}

	public void setCb_mj(String cb_mj) {
		this.cb_mj = cb_mj;
	}

    public String getDjfz_xm_mc() {
		return djfz_xm_mc;
	}

	public void setDjfz_xm_mc(String djfz_xm_mc) {
		this.djfz_xm_mc = djfz_xm_mc;
	}

    public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public String getPrimaryValue() {
	    return getGuid();
	}

	public String getPrimaryKey() {
		return "guid";
	}
    public String getZbphmj() {
		return zbphmj;
	}

	public void setZbphmj(String zbphmj) {
		this.zbphmj = zbphmj;
	}

    public String getCblyxm_mc() {
		return cblyxm_mc;
	}

	public void setCblyxm_mc(String cblyxm_mc) {
		this.cblyxm_mc = cblyxm_mc;
	}

    public String getLtype() {
		return ltype;
	}

	public void setLtype(String ltype) {
		this.ltype = ltype;
	}

    public String getCbxm_mc() {
		return cbxm_mc;
	}

	public void setCbxm_mc(String cbxm_mc) {
		this.cbxm_mc = cbxm_mc;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getGy_mj() {
		return gy_mj;
	}

	public void setGy_mj(String gy_mj) {
		this.gy_mj = gy_mj;
	}

    public String getGuid2() {
		return guid2;
	}

	public void setGuid2(String guid2) {
		this.guid2 = guid2;
	}

    public String getZd_xmmc() {
		return zd_xmmc;
	}

	public void setZd_xmmc(String zd_xmmc) {
		this.zd_xmmc = zd_xmmc;
	}

    public String getCbtd_xm_mc() {
		return cbtd_xm_mc;
	}

	public void setCbtd_xm_mc(String cbtd_xm_mc) {
		this.cbtd_xm_mc = cbtd_xm_mc;
	}

}
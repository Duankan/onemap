package com.kingtopware.onemap.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;


@Entity
@Table(name = "T_INF_ONEMAP_ZDDKXXB")
public class ZddkxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;


    @Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "DK_GUID", length = 36)
	private String dk_guid;
    
    public String getPrimaryValue() {
		return getDk_guid();
	}

	public String getPrimaryKey() {
		return "DK_GUID";
	}

    // 征地项目标识
    @Column(name = "ZDXM_GUID")
	private String zdxm_guid;

    //报批标识 
    @Column(name = "BP_GUID")
	private String bp_guid;

    // 参数标识
    @Column(name = "ZD_GUID")
	private String zd_guid;

    //图幅号
    @Column(name = "TFH")
	private String tfh;

    // 地块面积
    @Column(name = "DK_MJ")
	private String dk_mj;

    // 地块名称
    @Column(name = "DK_MC")
	private String dk_mc;

    // 地块编号
    @Column(name = "DK_BH")
	private String dk_bh;
    
    // 地块用途
    @Column(name = "DK_YT")
	private String dk_yt;
    
    // 土地用途编码
    @Column(name = "DK_YT_BM")
	private String dk_yt_bm;
    
    // 土地用途编码
    @Column(name = "JZDS")
	private String jzds;


	public String getDk_guid() {
		return dk_guid;
	}

	public void setDk_guid(String dk_guid) {
		this.dk_guid = dk_guid;
	}

	public String getZdxm_guid() {
		return zdxm_guid;
	}

	public void setZdxm_guid(String zdxm_guid) {
		this.zdxm_guid = zdxm_guid;
	}

	public String getBp_guid() {
		return bp_guid;
	}

	public void setBp_guid(String bp_guid) {
		this.bp_guid = bp_guid;
	}

	public String getZd_guid() {
		return zd_guid;
	}

	public void setZd_guid(String zd_guid) {
		this.zd_guid = zd_guid;
	}

	public String getTfh() {
		return tfh;
	}

	public void setTfh(String tfh) {
		this.tfh = tfh;
	}

	public String getDk_mj() {
		return dk_mj;
	}

	public void setDk_mj(String dk_mj) {
		this.dk_mj = dk_mj;
	}

	public String getDk_mc() {
		return dk_mc;
	}

	public void setDk_mc(String dk_mc) {
		this.dk_mc = dk_mc;
	}

	public String getDk_bh() {
		return dk_bh;
	}

	public void setDk_bh(String dk_bh) {
		this.dk_bh = dk_bh;
	}

	public String getDk_yt() {
		return dk_yt;
	}

	public void setDk_yt(String dk_yt) {
		this.dk_yt = dk_yt;
	}

	public String getDk_yt_bm() {
		return dk_yt_bm;
	}

	public void setDk_yt_bm(String dk_yt_bm) {
		this.dk_yt_bm = dk_yt_bm;
	}

	public String getJzds() {
		return jzds;
	}

	public void setJzds(String jzds) {
		this.jzds = jzds;
	}

   

}
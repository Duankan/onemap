
package com.kingtopware.onemap.entity;

import java.sql.Timestamp;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "T_INF_ONEMAP_PDDKXXB")
public class PddkxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 土地用途编码
    @Column(name = "TD_YT_BM")
	private String td_yt_bm;

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
    // 地块面积
    @Column(name = "DK_MJ")
	private String dk_mj;

    // 
    @Column(name = "Geometry")
	private String geometry;

    // 地块名称
    @Column(name = "DK_MC")
	private String dk_mc;

    // 地块编号
    @Column(name = "DK_BH")
	private String dk_bh;

    // 土地用途
    @Column(name = "TD_YT")
	private String td_yt;

    // 报批项目标识
    @Column(name = "JSYD_GUID")
	private String jsyd_guid;

    public String getTd_yt_bm() {
		return td_yt_bm;
	}

	public void setTd_yt_bm(String td_yt_bm) {
		this.td_yt_bm = td_yt_bm;
	}

    public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

    public String getDk_mj() {
		return dk_mj;
	}

	public void setDk_mj(String dk_mj) {
		this.dk_mj = dk_mj;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
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

    public String getTd_yt() {
		return td_yt;
	}

	public void setTd_yt(String td_yt) {
		this.td_yt = td_yt;
	}

    public String getJsyd_guid() {
		return jsyd_guid;
	}

	public void setJsyd_guid(String jsyd_guid) {
		this.jsyd_guid = jsyd_guid;
	}

}
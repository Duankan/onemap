
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
@Table(name = "T_INF_ONEMAP_WFANDKXXB")
public class WfandkxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "DK_GUID",length = 36)
	private String dk_guid;
	public String getPrimaryValue() {
		return getDk_guid();
	}

	public String getPrimaryKey() {
		return "DK_GUID";
	}

    // 
    @Column(name = "Geometry")
	private String geometry;

    // 
    @Column(name = "WFYD_ZMJ")
	private String wfyd_zmj;

    // 
    @Column(name = "TD_YT")
	private String td_yt;

    // 
    @Column(name = "AJ_DJ_GUID")
	private String aj_dj_guid;

    // 
    @Column(name = "DK_MJ")
	private String dk_mj;

    // 
    @Column(name = "TFH")
	private String tfh;

    // 
    @Column(name = "JZDS")
	private String jzds;

    // 
    @Column(name = "DK_BH")
	private String dk_bh;

    // 
    @Column(name = "DK_WZ")
	private String dk_wz;

   
    // 
    @Column(name = "DK_MC")
	private String dk_mc;

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getWfyd_zmj() {
		return wfyd_zmj;
	}

	public void setWfyd_zmj(String wfyd_zmj) {
		this.wfyd_zmj = wfyd_zmj;
	}

    public String getTd_yt() {
		return td_yt;
	}

	public void setTd_yt(String td_yt) {
		this.td_yt = td_yt;
	}

    public String getAj_dj_guid() {
		return aj_dj_guid;
	}

	public void setAj_dj_guid(String aj_dj_guid) {
		this.aj_dj_guid = aj_dj_guid;
	}

    public String getDk_mj() {
		return dk_mj;
	}

	public void setDk_mj(String dk_mj) {
		this.dk_mj = dk_mj;
	}

    public String getTfh() {
		return tfh;
	}

	public void setTfh(String tfh) {
		this.tfh = tfh;
	}

    public String getJzds() {
		return jzds;
	}

	public void setJzds(String jzds) {
		this.jzds = jzds;
	}

    public String getDk_bh() {
		return dk_bh;
	}

	public void setDk_bh(String dk_bh) {
		this.dk_bh = dk_bh;
	}

    public String getDk_wz() {
		return dk_wz;
	}

	public void setDk_wz(String dk_wz) {
		this.dk_wz = dk_wz;
	}

    public String getDk_guid() {
		return dk_guid;
	}

	public void setDk_guid(String dk_guid) {
		this.dk_guid = dk_guid;
	}

    public String getDk_mc() {
		return dk_mc;
	}

	public void setDk_mc(String dk_mc) {
		this.dk_mc = dk_mc;
	}

}

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
@Table(name = "fc_zsx")
public class ZsxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 不动产业务流水
    @Column(name = "bdcywls")
	private String bdcywls;

    // 幢id
    @Column(name = "houseid")
	private String houseid;

    // 建筑面积（单位：平方米）
    @Column(name = "jzmj")
	private String jzmj;

    // 记录产生时间
    @Column(name = "cssj")
	private Timestamp cssj;

    // 推送日期
    @Column(name = "tssj")
	private Timestamp tssj;

    // 建筑结构
    @Column(name = "jzjg")
	private String jzjg;

    // 地籍号;产籍号；测量号；幢号
    @Column(name = "earthnum")
	private String earthnum;

    // 总层数
    @Column(name = "zcs")
	private String zcs;

    // 建筑年代
    @Column(name = "jznd")
	private String jznd;

    // 房屋坐落
    @Column(name = "bsit")
	private String bsit;

    // 状态（1 当前 2 历史）
    @Column(name = "zt")
	private String zt;

    // 
    @Column(name = "flag")
	private String flag;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_zsxid")
	private String fc_zsxid;

    public String getBdcywls() {
		return bdcywls;
	}

	public void setBdcywls(String bdcywls) {
		this.bdcywls = bdcywls;
	}

    public String getHouseid() {
		return houseid;
	}

	public void setHouseid(String houseid) {
		this.houseid = houseid;
	}

    public String getJzmj() {
		return jzmj;
	}

	public void setJzmj(String jzmj) {
		this.jzmj = jzmj;
	}

    public Timestamp getCssj() {
		return cssj;
	}

	public void setCssj(Timestamp cssj) {
		this.cssj = cssj;
	}

    public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

    public String getJzjg() {
		return jzjg;
	}

	public void setJzjg(String jzjg) {
		this.jzjg = jzjg;
	}

    public String getEarthnum() {
		return earthnum;
	}

	public void setEarthnum(String earthnum) {
		this.earthnum = earthnum;
	}

    public String getZcs() {
		return zcs;
	}

	public void setZcs(String zcs) {
		this.zcs = zcs;
	}

    public String getJznd() {
		return jznd;
	}

	public void setJznd(String jznd) {
		this.jznd = jznd;
	}

    public String getBsit() {
		return bsit;
	}

	public void setBsit(String bsit) {
		this.bsit = bsit;
	}

    public String getZt() {
		return zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
	}

    public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

    public String getFc_zsxid() {
		return fc_zsxid;
	}

	public void setFc_zsxid(String fc_zsxid) {
		this.fc_zsxid = fc_zsxid;
	}

	public String getPrimaryValue() {
	    return getFc_zsxid();
	}

	public String getPrimaryKey() {
		return "fc_zsxid";
	}
}
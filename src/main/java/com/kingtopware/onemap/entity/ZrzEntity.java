
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
@Table(name = "bdc_zrz")
public class ZrzEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

	public static final String selectAll="select id, bsm,ysdm,zddm,bdcdyh,zrzh,xmmc,jzwmc,jgrq,jzwgd,zzdmj,zydmj, ycjzmj,scjzmj,zcs,dscs,dxcs,dxsd,clh,fwbh, ghyt,fwjg,zts,jzwjbyt,dah,zt,bz,cq,st_astext(geometry)";
	public static final String selectKey= " id,bsm,ysdm,zddm,bdcdyh,zrzh,xmmc,jzwmc,jgrq,jzwgd,zzdmj,zydmj, ycjzmj,scjzmj,zcs,dscs,dxcs,dxsd,clh,fwbh, ghyt,fwjg,zts,jzwjbyt,dah,zt,bz,cq,geometry";


	
   @Id
   @GeneratedValue(generator = "uuidGen")
   @GenericGenerator(name = "uuidGen", strategy = "uuid")
   @Column(name = "id")
   private Integer id;
	
	
	// 标识码
    @Column(name = "bsm")
	private Integer bsm;
    
    // 要素代码
    @Column(name = "ysdm")
	private String ysdm;
    
    // 宗地代码
    @Column(name = "zddm")
	private String zddm;

    // 不动产单元
    @Column(name = "bdcdyh")
	private String bdcdyh;
    
    // 自然幢号
    @Column(name = "zrzh")
	private String zrzh;
    
    // 项目名称
    @Column(name = "xmmc")
	private String xmmc;
    
    // 建筑物名称
    @Column(name = "jzwmc")
	private String jzwmc;

    // 竣工日期
    @Column(name = "jgrq")
	private Date jgrq;
	
    // 建筑物高度
    @Column(name = "jzwgd")
	private String jzwgd;
    
    // 幢占地面积
    @Column(name = "zzdmj")
	private String zzdmj;
    
    // 幢用地面积
    @Column(name = "zydmj")
	private String zydmj;
    
    // 预测建筑面积
    @Column(name = "ycjzmj")
	private String ycjzmj;
    
    // 实测建筑面积
    @Column(name = "scjzmj")
	private String scjzmj;
    
    // 总层数
    @Column(name = "zcs")
	private String zcs;
    
    // 地上层数
    @Column(name = "dscs")
	private Integer dscs;
    
    // 地下层数
    @Column(name = "dxcs")
	private String dxcs;
    
    
    // 地下深度
    @Column(name = "dxsd")
	private String dxsd;
    
    // 测量号
    @Column(name = "clh")
	private String clh;
    
    // 房屋编号
    @Column(name = "fwbh")
	private String fwbh;


    // 规划用途
    @Column(name = "ghyt")
	private String ghyt;



    // 房屋结构
    @Column(name = "fwjg")
	private String fwjg;

   
    // 总套数
    @Column(name = "zts")
	private String zts;

    // 建筑物基本用途
    @Column(name = "jzwjbyt")
	private String jzwjbyt;

    
    // 档案号
    @Column(name = "dah")
	private String dah;
    
    // 状态
    @Column(name = "zt")
	private String zt;

    // 备注
    @Column(name = "bz")
	private String bz;

    // 拆迁
    @Column(name = "cq")
	private String cq;
    
    // 空间属性
    @Column(name = "geometry")
	private String geometry;
    
    

    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
    
    public String getPrimaryValue() {
	    return getId()+"";
	}

	public String getPrimaryKey() {
		return "id";
	}
    
	
	
	
    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getDxsd() {
		return dxsd;
	}

	public void setDxsd(String dxsd) {
		this.dxsd = dxsd;
	}

    public String getXmmc() {
		return xmmc;
	}

	public void setXmmc(String xmmc) {
		this.xmmc = xmmc;
	}

    public String getGhyt() {
		return ghyt;
	}

	public void setGhyt(String ghyt) {
		this.ghyt = ghyt;
	}

    public String getDah() {
		return dah;
	}

	public void setDah(String dah) {
		this.dah = dah;
	}

    public String getFwjg() {
		return fwjg;
	}

	public void setFwjg(String fwjg) {
		this.fwjg = fwjg;
	}

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

    public Date getJgrq() {
		return jgrq;
	}

	public void setJgrq(Date jgrq) {
		this.jgrq = jgrq;
	}

    public String getJzwgd() {
		return jzwgd;
	}

	public void setJzwgd(String jzwgd) {
		this.jzwgd = jzwgd;
	}

    public Integer getBsm() {
		return bsm;
	}

	public void setBsm(Integer bsm) {
		this.bsm = bsm;
	}

    public String getYcjzmj() {
		return ycjzmj;
	}

	public void setYcjzmj(String ycjzmj) {
		this.ycjzmj = ycjzmj;
	}

    public String getJzwjbyt() {
		return jzwjbyt;
	}

	public void setJzwjbyt(String jzwjbyt) {
		this.jzwjbyt = jzwjbyt;
	}

    public Integer getDscs() {
		return dscs;
	}

	public void setDscs(Integer dscs) {
		this.dscs = dscs;
	}

    public String getJzwmc() {
		return jzwmc;
	}

	public void setJzwmc(String jzwmc) {
		this.jzwmc = jzwmc;
	}

    public String getZddm() {
		return zddm;
	}

	public void setZddm(String zddm) {
		this.zddm = zddm;
	}

    public String getZts() {
		return zts;
	}

	public void setZts(String zts) {
		this.zts = zts;
	}

    public String getCq() {
		return cq;
	}

	public void setCq(String cq) {
		this.cq = cq;
	}

    public String getClh() {
		return clh;
	}

	public void setClh(String clh) {
		this.clh = clh;
	}

    public String getDxcs() {
		return dxcs;
	}

	public void setDxcs(String dxcs) {
		this.dxcs = dxcs;
	}

    public String getZcs() {
		return zcs;
	}

	public void setZcs(String zcs) {
		this.zcs = zcs;
	}

    public String getZzdmj() {
		return zzdmj;
	}

	public void setZzdmj(String zzdmj) {
		this.zzdmj = zzdmj;
	}

    public String getYsdm() {
		return ysdm;
	}

	public void setYsdm(String ysdm) {
		this.ysdm = ysdm;
	}

    public String getZt() {
		return zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
	}

    public String getScjzmj() {
		return scjzmj;
	}

	public void setScjzmj(String scjzmj) {
		this.scjzmj = scjzmj;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getFwbh() {
		return fwbh;
	}

	public void setFwbh(String fwbh) {
		this.fwbh = fwbh;
	}

    public String getZydmj() {
		return zydmj;
	}

	public void setZydmj(String zydmj) {
		this.zydmj = zydmj;
	}

    public String getZrzh() {
		return zrzh;
	}

	public void setZrzh(String zrzh) {
		this.zrzh = zrzh;
	}

}
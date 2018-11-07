
package com.kingtopware.onemap.entity;

import java.sql.Timestamp;

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
 * @date： 2017年9月2日
 * @description：储备用地表映射实体类
 * =====================================
 */

@Entity
@Table(name = "T_INF_ONEMAP_CBYDXXB")
public class CbydEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	public static final String selectAll="select BZ,ZDH,AJBH,TDQDCB,RCYJ,st_astext(Geometry),NF,CBLX,XZQDM,LCLX,LRSJ,YGMJ,RCSJ,LCMC,SYKGMJ,ZDZL,CBDKMC,XZQMC,AJ_MC,CBYD_GUID,XMMC,ZDMJ,dah";
	public static final String selectKey= "bz,zdh,ajbh,tdqdcb,rcyj,geometry,nf,cblx,xzqdm,lclx,lrsj,ygmj,rcsj,lcmc,sykgmj,zdzl,cbdkmc,xzqmc,aj_mc,cbyd_guid,xmmc,zdmj,dah";

	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "CBYD_GUID", length = 36)
	private String cbyd_guid;
	
    public String getCbyd_guid() {
		return cbyd_guid;
	}

	public void setCbyd_guid(String cbyd_guid) {
		this.cbyd_guid = cbyd_guid;
	}
	
	public String getPrimaryValue() {
		return getCbyd_guid();
	}

	public String getPrimaryKey() {
		return "CBYD_GUID";
	}
	
    // 
    @Column(name = "BZ")
	private String bz;

    // 宗地号
    @Column(name = "ZDH")
	private String zdh;

    // 案卷编号
    @Column(name = "AJBH")
	private String ajbh;

    // 土地取得成本
    @Column(name = "TDQDCB")
	private Double tdqdcb;

    // 入储依据
    @Column(name = "RCYJ")
	private String rcyj;

    // 
    @Column(name = "Geometry")
	private String geometry;

    // 
    @Column(name = "NF")
	private Double nf;

    // 纳入储备类型
    @Column(name = "CBLX")
	private String cblx;

    // 行政区代码
    @Column(name = "XZQDM")
	private String xzqdm;

    // 流程类型
    @Column(name = "LCLX")
	private String lclx;

    // 
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "LRSJ")
	private Timestamp lrsj;

    // 已供面积
    @Column(name = "YGMJ")
	private Double ygmj;

    // 
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @Column(name = "RCSJ")
	private Timestamp rcsj;

    // 流程名称
    @Column(name = "LCMC")
	private String lcmc;

    // 剩余可供面积
    @Column(name = "SYKGMJ")
	private Double sykgmj;

    // 宗地坐落
    @Column(name = "ZDZL")
	private String zdzl;

    // 储备地块名称
    @Column(name = "CBDKMC")
	private String cbdkmc;

    // 行政区名称
    @Column(name = "XZQMC")
	private String xzqmc;

    // 案卷名称
    @Column(name = "AJ_MC")
	private String aj_mc;

  
    // 项目名称
    @Column(name = "XMMC")
	private String xmmc;

    // 宗地面积
    @Column(name = "ZDMJ")
	private Double zdmj;
    
    // 档案号
 	@Column(name = "dah")
 	private String dah;

 	public String getDah() {
 		return dah;
 	}

 	public void setDah(String dah) {
 		this.dah = dah;
 	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getZdh() {
		return zdh;
	}

	public void setZdh(String zdh) {
		this.zdh = zdh;
	}

    public String getAjbh() {
		return ajbh;
	}

	public void setAjbh(String ajbh) {
		this.ajbh = ajbh;
	}

    public Double getTdqdcb() {
		return tdqdcb;
	}

	public void setTdqdcb(Double tdqdcb) {
		this.tdqdcb = tdqdcb;
	}

    public String getRcyj() {
		return rcyj;
	}

	public void setRcyj(String rcyj) {
		this.rcyj = rcyj;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public Double getNf() {
		return nf;
	}

	public void setNf(Double nf) {
		this.nf = nf;
	}

    public String getCblx() {
		return cblx;
	}

	public void setCblx(String cblx) {
		this.cblx = cblx;
	}

    public String getXzqdm() {
		return xzqdm;
	}

	public void setXzqdm(String xzqdm) {
		this.xzqdm = xzqdm;
	}

    public String getLclx() {
		return lclx;
	}

	public void setLclx(String lclx) {
		this.lclx = lclx;
	}

    public Timestamp getLrsj() {
		return lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

    public Double getYgmj() {
		return ygmj;
	}

	public void setYgmj(Double ygmj) {
		this.ygmj = ygmj;
	}

    public Timestamp getRcsj() {
		return rcsj;
	}

	public void setRcsj(Timestamp rcsj) {
		this.rcsj = rcsj;
	}

    public String getLcmc() {
		return lcmc;
	}

	public void setLcmc(String lcmc) {
		this.lcmc = lcmc;
	}

    public Double getSykgmj() {
		return sykgmj;
	}

	public void setSykgmj(Double sykgmj) {
		this.sykgmj = sykgmj;
	}

    public String getZdzl() {
		return zdzl;
	}

	public void setZdzl(String zdzl) {
		this.zdzl = zdzl;
	}

    public String getCbdkmc() {
		return cbdkmc;
	}

	public void setCbdkmc(String cbdkmc) {
		this.cbdkmc = cbdkmc;
	}

    public String getXzqmc() {
		return xzqmc;
	}

	public void setXzqmc(String xzqmc) {
		this.xzqmc = xzqmc;
	}

    public String getAjmc() {
		return aj_mc;
	}

	public void setAjmc(String aj_mc) {
		this.aj_mc = aj_mc;
	}


    public String getXmmc() {
		return xmmc;
	}

	public void setXmmc(String xmmc) {
		this.xmmc = xmmc;
	}

    public Double getZdmj() {
		return zdmj;
	}

	public void setZdmj(Double zdmj) {
		this.zdmj = zdmj;
	}

}
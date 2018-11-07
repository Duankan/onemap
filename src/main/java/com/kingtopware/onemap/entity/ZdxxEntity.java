
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
 * @description：征地信息实体类
 * =====================================
 */
@Entity
@Table(name = "T_INF_ONEMAP_ZDXXB")
public class ZdxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	public static final String selectAll="select BCBZ,ZS_WLYDMJ,ZYTD_ZMJ,NF,SQYDDW,st_astext(Geometry),TDYT,BZ,DAJ_BH,LRSJ,SQYDZMJ,GGSJ,ZS_JSYDMJ,ZS_NYD_YDMJ,BZY_TDSJD_QSDW_XZ,XZQ_DM,LCLX,LCMC,ZS_NYD_GDSTMJ,ZS_NYD_GDCDMJ,ZMCJSJ,BZY_TDSJD_QSDW_C,QSDW_QSZK,ZS_NYD_GDMJ,JSYDXMMC,PZWH,ZS_NYD_MCDMJ,ZS_NYD_LDMJ,ZS_NYD_QTMJ,TDWZ,XZQ_MC,PZSJ,AJ_MC,ZS_NYD_GDHDMJ,ZDXM_GUID,dah";
	public static final String selectKey= "bcbz,zs_wlydmj,zytd_zmj,nf,sqyddw,geometry,tdyt,bz,daj_bh,lrsj,sqydzmj,ggsj,zs_jsydmj,zs_nyd_ydmj,bzy_tdsjd_qsdw_xz,xzq_dm,lclx,lcmc,zs_nyd_gdstmj,zs_nyd_gdcdmj,zmcjsj,bzy_tdsjd_qsdw_c,qsdw_qszk,zs_nyd_gdmj,jsydxmmc,pzwh,zs_nyd_mcdmj,zs_nyd_ldmj,zs_nyd_qtmj,tdwz,xzq_mc,pzsj,aj_mc,zs_nyd_gdhdmj,zdxm_guid,dah";

	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "ZDXM_GUID", length = 36)
	private String zdxm_guid;

	

    public String getZdxm_guid() {
		return zdxm_guid;
	}

	public void setZdxm_guid(String zdxm_guid) {
		this.zdxm_guid = zdxm_guid;
	}

	public String getPrimaryValue() {
		return getZdxm_guid();
	}

	public String getPrimaryKey() {
		return "ZDXM_GUID";
	}
	
    // 补偿标准
    @Column(name = "BCBZ")
	private String bcbz;
    // 补偿标准
    @Column(name = "bcbz_dw")
	private String bcbz_dw;
    
    public String getBcbz_dw() {
		return bcbz_dw;
	}

	public void setBcbz_dw(String bcbz_dw) {
		this.bcbz_dw = bcbz_dw;
	}

	// 征收未利用地面积
    @Column(name = "ZS_WLYDMJ")
	private Double zs_wlydmj;

    // 被征用土地总面积
    @Column(name = "ZYTD_ZMJ")
	private Double zytd_zmj;

    // 
    @Column(name = "NF")
	private Double nf;

    // 申请用地单位
    @Column(name = "SQYDDW")
	private String sqyddw;

    // 
    @Column(name = "Geometry")
	private String geometry;

    // 土地用途
    @Column(name = "TDYT")
	private String tdyt;

    // 
    @Column(name = "BZ")
	private String bz;

    // 案卷编号
    @Column(name = "DAJ_BH")
	private String daj_bh;

    // 
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "LRSJ")
	private Timestamp lrsj;

    // 申请用地总面积
    @Column(name = "SQYDZMJ")
	private Double sqydzmj;

    // 公告时间
    @Column(name = "GGSJ")
	private Date ggsj;

    // 征收建设用地面积
    @Column(name = "ZS_JSYDMJ")
	private Double zs_jsydmj;

    // 征收农用地园地面积
    @Column(name = "ZS_NYD_YDMJ")
	private Double zs_nyd_ydmj;

    // 被征用土地设计的权属单位(乡镇)
    @Column(name = "BZY_TDSJD_QSDW_XZ")
	private String bzy_tdsjd_qsdw_xz;

    // 行政区代码
    @Column(name = "XZQ_DM")
	private String xzq_dm;

    // 流程类型
    @Column(name = "LCLX")
	private String lclx;

    // 流程名称
    @Column(name = "LCMC")
	private String lcmc;

    // 征收农用地耕地水田面积
    @Column(name = "ZS_NYD_GDSTMJ")
	private Double zs_nyd_gdstmj;

    // 征收农用地耕地菜地面积
    @Column(name = "ZS_NYD_GDCDMJ")
	private Double zs_nyd_gdcdmj;

    // 证明出具时间
    @Column(name = "ZMCJSJ")
	private Date zmcjsj;

    // 被征用土地设计的权属单位(村)
    @Column(name = "BZY_TDSJD_QSDW_C")
	private String bzy_tdsjd_qsdw_c;

    // 
    @Column(name = "QSDW_QSZK")
	private String qsdw_qszk;

    // 征收农用地耕地面积
    @Column(name = "ZS_NYD_GDMJ")
	private Double zs_nyd_gdmj;

    // 建设用地项目名称
    @Column(name = "JSYDXMMC")
	private String jsydxmmc;

    // 批准文号
    @Column(name = "PZWH")
	private String pzwh;

    // 征收农用地牧草地面积
    @Column(name = "ZS_NYD_MCDMJ")
	private Double zs_nyd_mcdmj;

    // 征收农用地林地面积
    @Column(name = "ZS_NYD_LDMJ")
	private Double zs_nyd_ldmj;

    // 征收农用地其他面积
    @Column(name = "ZS_NYD_QTMJ")
	private Double zs_nyd_qtmj;

    // 土地位置
    @Column(name = "TDWZ")
	private String tdwz;

    // 行政区名称
    @Column(name = "XZQ_MC")
	private String xzq_mc;

    // 批准时间
    @Column(name = "PZSJ")
	private Date pzsj;

    // 案卷名称
    @Column(name = "AJ_MC")
	private String aj_mc;

    // 征收农用地耕地旱地面积
    @Column(name = "ZS_NYD_GDHDMJ")
	private Double zs_nyd_gdhdmj;


    // 档案号
 	@Column(name = "dah")
 	private String dah;

 	public String getDah() {
 		return dah;
 	}

 	public void setDah(String dah) {
 		this.dah = dah;
 	}

    public String getBcbz() {
		return bcbz;
	}

	public void setBcbz(String bcbz) {
		this.bcbz = bcbz;
	}

    public Double getZs_wlydmj() {
		return zs_wlydmj;
	}

	public void setZs_wlydmj(Double zs_wlydmj) {
		this.zs_wlydmj = zs_wlydmj;
	}

    public Double getZytd_zmj() {
		return zytd_zmj;
	}

	public void setZytd_zmj(Double zytd_zmj) {
		this.zytd_zmj = zytd_zmj;
	}

    public Double getNf() {
		return nf;
	}

	public void setNf(Double nf) {
		this.nf = nf;
	}

    public String getSqyddw() {
		return sqyddw;
	}

	public void setSqyddw(String sqyddw) {
		this.sqyddw = sqyddw;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getTdyt() {
		return tdyt;
	}

	public void setTdyt(String tdyt) {
		this.tdyt = tdyt;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getDaj_bh() {
		return daj_bh;
	}

	public void setDaj_bh(String daj_bh) {
		this.daj_bh = daj_bh;
	}

    public Timestamp getLrsj() {
		return lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

    public Double getSqydzmj() {
		return sqydzmj;
	}

	public void setSqydzmj(Double sqydzmj) {
		this.sqydzmj = sqydzmj;
	}

    public Date getGgsj() {
		return ggsj;
	}

	public void setGgsj(Date ggsj) {
		this.ggsj = ggsj;
	}

    public Double getZs_jsydmj() {
		return zs_jsydmj;
	}

	public void setZs_jsydmj(Double zs_jsydmj) {
		this.zs_jsydmj = zs_jsydmj;
	}

    public Double getZs_nyd_ydmj() {
		return zs_nyd_ydmj;
	}

	public void setZs_nyd_ydmj(Double zs_nyd_ydmj) {
		this.zs_nyd_ydmj = zs_nyd_ydmj;
	}

    public String getBzy_tdsjd_qsdw_xz() {
		return bzy_tdsjd_qsdw_xz;
	}

	public void setBzy_tdsjd_qsdw_xz(String bzy_tdsjd_qsdw_xz) {
		this.bzy_tdsjd_qsdw_xz = bzy_tdsjd_qsdw_xz;
	}

    public String getXzq_dm() {
		return xzq_dm;
	}

	public void setXzq_dm(String xzq_dm) {
		this.xzq_dm = xzq_dm;
	}

    public String getLclx() {
		return lclx;
	}

	public void setLclx(String lclx) {
		this.lclx = lclx;
	}

    public String getLcmc() {
		return lcmc;
	}

	public void setLcmc(String lcmc) {
		this.lcmc = lcmc;
	}

    public Double getZs_nyd_gdstmj() {
		return zs_nyd_gdstmj;
	}

	public void setZs_nyd_gdstmj(Double zs_nyd_gdstmj) {
		this.zs_nyd_gdstmj = zs_nyd_gdstmj;
	}

    public Double getZs_nyd_gdcdmj() {
		return zs_nyd_gdcdmj;
	}

	public void setZs_nyd_gdcdmj(Double zs_nyd_gdcdmj) {
		this.zs_nyd_gdcdmj = zs_nyd_gdcdmj;
	}

    public Date getZmcjsj() {
		return zmcjsj;
	}

	public void setZmcjsj(Date zmcjsj) {
		this.zmcjsj = zmcjsj;
	}

    public String getBzy_tdsjd_qsdw_c() {
		return bzy_tdsjd_qsdw_c;
	}

	public void setBzy_tdsjd_qsdw_c(String bzy_tdsjd_qsdw_c) {
		this.bzy_tdsjd_qsdw_c = bzy_tdsjd_qsdw_c;
	}

    public String getQsdw_qszk() {
		return qsdw_qszk;
	}

	public void setQsdw_qszk(String qsdw_qszk) {
		this.qsdw_qszk = qsdw_qszk;
	}

    public Double getZs_nyd_gdmj() {
		return zs_nyd_gdmj;
	}

	public void setZs_nyd_gdmj(Double zs_nyd_gdmj) {
		this.zs_nyd_gdmj = zs_nyd_gdmj;
	}

    public String getJsydxmmc() {
		return jsydxmmc;
	}

	public void setJsydxmmc(String jsydxmmc) {
		this.jsydxmmc = jsydxmmc;
	}

    public String getPzwh() {
		return pzwh;
	}

	public void setPzwh(String pzwh) {
		this.pzwh = pzwh;
	}

    public Double getZs_nyd_mcdmj() {
		return zs_nyd_mcdmj;
	}

	public void setZs_nyd_mcdmj(Double zs_nyd_mcdmj) {
		this.zs_nyd_mcdmj = zs_nyd_mcdmj;
	}

    public Double getZs_nyd_ldmj() {
		return zs_nyd_ldmj;
	}

	public void setZs_nyd_ldmj(Double zs_nyd_ldmj) {
		this.zs_nyd_ldmj = zs_nyd_ldmj;
	}

    public Double getZs_nyd_qtmj() {
		return zs_nyd_qtmj;
	}

	public void setZs_nyd_qtmj(Double zs_nyd_qtmj) {
		this.zs_nyd_qtmj = zs_nyd_qtmj;
	}

    public String getTdwz() {
		return tdwz;
	}

	public void setTdwz(String tdwz) {
		this.tdwz = tdwz;
	}

    public String getXzq_mc() {
		return xzq_mc;
	}

	public void setXzq_mc(String xzq_mc) {
		this.xzq_mc = xzq_mc;
	}

    public Date getPzsj() {
		return pzsj;
	}

	public void setPzsj(Date pzsj) {
		this.pzsj = pzsj;
	}

    public String getAjmc() {
		return aj_mc;
	}

	public void setAjmc(String aj_mc) {
		this.aj_mc = aj_mc;
	}

    public Double getZs_nyd_gdhdmj() {
		return zs_nyd_gdhdmj;
	}

	public void setZs_nyd_gdhdmj(Double zs_nyd_gdhdmj) {
		this.zs_nyd_gdhdmj = zs_nyd_gdhdmj;
	}


}

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
@Table(name = "T_INF_ONEMAP_BCGDXXB")
public class BcgdEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	public static final String selectAll="select XZQ_DM,XZGDMJ,LC_LX,LRSJ,YS_RQ,BH,YS_DW,YBC_MJ,SS_ND,AJ_BH,SS_DW_LXR,CD_DW,NF,KBC_MJ,YS_WH,XZQ_MC,DK_MC,BZ,BCGDFA_GUID,AJ_MC,XM_MC,SS_DW_LX_DH,ZJ,LC_MC,BCGD_FS,LXDW,st_astext(Geometry),dah";
	public static final String selectKey= "xzq_dm,xzgdmj,lc_lx,lrsj,ys_rq,bh,ys_dw,ybc_mj,ss_nd,aj_bh,ss_dw_lxr,cd_dw,nf,kbc_mj,ys_wh,xzq_mc,dk_mc,bz,bcgdfa_guid,aj_mc,xm_mc,ss_dw_lx_dh,zj,lc_mc,bcgd_fs,lxdw,geometry,dah";
	
	
	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "BCGDFA_GUID", length = 36)
	private String bcgdfa_guid;
	
	public String getPrimaryValue() {
		return getBcgdfa_guid();
	}

	public String getPrimaryKey() {
		return "BCGDFA_GUID";
	}
	
	
	
	 // 可补充面积
    @Column(name = "kbc_mj")
	private String kbc_mj;
	
    public String getKbc_mj() {
		return kbc_mj;
	}

	public void setKbc_mj(String kbc_mj) {
		this.kbc_mj = kbc_mj;
	}

	// 行政区代码
    @Column(name = "XZQ_DM")
	private String xzq_dm;

    // 
    @Column(name = "XZGDMJ")
	private Double xzgdmj;

    // 流程类型
    @Column(name = "LC_LX")
	private String lc_lx;

    // 
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "LRSJ")
	private Timestamp lrsj;

    // 验收日期
    @Column(name = "YS_RQ")
	private Date ys_rq;

    // 补充耕地图幅号及地块编号
    @Column(name = "BH")
	private String bh;

    // 验收单位
    @Column(name = "YS_DW")
	private String ys_dw;

    // 已补充面积
    @Column(name = "YBC_MJ")
	private Double ybc_mj;

    // 实施年度
    @Column(name = "SS_ND")
	private String ss_nd;

    // 案卷编号
    @Column(name = "AJ_BH")
	private String aj_bh;

    // 实施单位联系人
    @Column(name = "SS_DW_LXR")
	private String ss_dw_lxr;

    // 承担单位
    @Column(name = "CD_DW")
	private String cd_dw;

    // 
    @Column(name = "NF")
	private Double nf;

    // 
//    @Column(name = "SYZBPHMJ")
//	private Double syzbphmj;

    // 验收文号
    @Column(name = "YS_WH")
	private String ys_wh;

    // 行政区名称
    @Column(name = "XZQ_MC")
	private String xzq_mc;

    // 地块名称
    @Column(name = "DK_MC")
	private String dk_mc;

    // 
    @Column(name = "BZ")
	private String bz;


    // 案卷名称
    @Column(name = "AJ_MC")
	private String aj_mc;

    // 项目名称
    @Column(name = "XM_MC")
	private String xm_mc;

    // 实施单位联系电话
    @Column(name = "SS_DW_LX_DH")
	private String ss_dw_lx_dh;

    // 资金安排
    @Column(name = "ZJ")
	private Double zj;

    // 流程名称
    @Column(name = "LC_MC")
	private String lc_mc;

    // 补充耕地方式
    @Column(name = "BCGD_FS")
	private String bcgd_fs;

    // 
    @Column(name = "Geometry")
	private String geometry;

    // 立项单位
    @Column(name = "LXDW")
	private String lxdw;
    
    // 档案号
 	@Column(name = "dah")
 	private String dah;

 	public String getDah() {
 		return dah;
 	}

 	public void setDah(String dah) {
 		this.dah = dah;
 	}

    public String getXzq_dm() {
		return xzq_dm;
	}

	public void setXzq_dm(String xzq_dm) {
		this.xzq_dm = xzq_dm;
	}

    public Double getXzgdmj() {
		return xzgdmj;
	}

	public void setXzgdmj(Double xzgdmj) {
		this.xzgdmj = xzgdmj;
	}

    public String getLc_lx() {
		return lc_lx;
	}

	public void setLc_lx(String lc_lx) {
		this.lc_lx = lc_lx;
	}

    public Timestamp getLrsj() {
		return lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

    public Date getYs_rq() {
		return ys_rq;
	}

	public void setYs_rq(Date ys_rq) {
		this.ys_rq = ys_rq;
	}

    public String getBh() {
		return bh;
	}

	public void setBh(String bh) {
		this.bh = bh;
	}

    public String getYs_dw() {
		return ys_dw;
	}

	public void setYs_dw(String ys_dw) {
		this.ys_dw = ys_dw;
	}

    public Double getYbc_mj() {
		return ybc_mj;
	}

	public void setYbc_mj(Double ybc_mj) {
		this.ybc_mj = ybc_mj;
	}

    public String getSs_nd() {
		return ss_nd;
	}

	public void setSs_nd(String ss_nd) {
		this.ss_nd = ss_nd;
	}

    public String getAj_bh() {
		return aj_bh;
	}

	public void setAj_bh(String aj_bh) {
		this.aj_bh = aj_bh;
	}

    public String getSs_dw_lxr() {
		return ss_dw_lxr;
	}

	public void setSs_dw_lxr(String ss_dw_lxr) {
		this.ss_dw_lxr = ss_dw_lxr;
	}

    public String getCd_dw() {
		return cd_dw;
	}

	public void setCd_dw(String cd_dw) {
		this.cd_dw = cd_dw;
	}

    public Double getNf() {
		return nf;
	}

	public void setNf(Double nf) {
		this.nf = nf;
	}

//    public Double getSyzbphmj() {
//		return syzbphmj;
//	}
//
//	public void setSyzbphmj(Double syzbphmj) {
//		this.syzbphmj = syzbphmj;
//	}

    public String getYs_wh() {
		return ys_wh;
	}

	public void setYs_wh(String ys_wh) {
		this.ys_wh = ys_wh;
	}

    public String getXzq_mc() {
		return xzq_mc;
	}

	public void setXzq_mc(String xzq_mc) {
		this.xzq_mc = xzq_mc;
	}

    public String getDk_mc() {
		return dk_mc;
	}

	public void setDk_mc(String dk_mc) {
		this.dk_mc = dk_mc;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getBcgdfa_guid() {
		return bcgdfa_guid;
	}

	public void setBcgdfa_guid(String bcgdfa_guid) {
		this.bcgdfa_guid = bcgdfa_guid;
	}

    public String getAj_mc() {
		return aj_mc;
	}

	public void setAj_mc(String aj_mc) {
		this.aj_mc = aj_mc;
	}

    public String getXm_mc() {
		return xm_mc;
	}

	public void setXm_mc(String xm_mc) {
		this.xm_mc = xm_mc;
	}

    public String getSs_dw_lx_dh() {
		return ss_dw_lx_dh;
	}

	public void setSs_dw_lx_dh(String ss_dw_lx_dh) {
		this.ss_dw_lx_dh = ss_dw_lx_dh;
	}

    public Double getZj() {
		return zj;
	}

	public void setZj(Double zj) {
		this.zj = zj;
	}

    public String getLc_mc() {
		return lc_mc;
	}

	public void setLc_mc(String lc_mc) {
		this.lc_mc = lc_mc;
	}

    public String getBcgd_fs() {
		return bcgd_fs;
	}

	public void setBcgd_fs(String bcgd_fs) {
		this.bcgd_fs = bcgd_fs;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getLxdw() {
		return lxdw;
	}

	public void setLxdw(String lxdw) {
		this.lxdw = lxdw;
	}

}
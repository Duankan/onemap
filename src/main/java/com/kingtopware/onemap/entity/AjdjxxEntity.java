
package com.kingtopware.onemap.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "t_inf_onemap_ajdjxxb")
public class AjdjxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	public static final String selectAll="select NF,WF_LX1,AJ_LY,WF_SS,SL_JG,WFYD_ZJZMJ,RKSJ,ZH,FH_GHMJ,GDPZ_WH,TXSJ,WF_LX2,WFYD_ZMJ,AJ_BH,FX_SJ,AY,st_astext(Geometry),SLR_JY,JT_TDMJ,GD_GUID,BFH_GH_MJ,WLYD_MJ,RKCZY,FDDBR,JB_NT_MJ,WFDW_DZ,WFXW,SL_SJ,LA_SJ,CFJD,LC_LX,SH_SJ,HT_BH,XZQ_DM,TB_SJ,SD_FS,TB_BH,GD_MJ,BMQZ,LC_MC,TB_FZH,TB_WZ,GY_TD_MJ,ZF_BH,XM_MC,GDPZ_SJ,SH_R,XM_YD_MJ,LXSX,BP_GUID,LXPF_WH,LX_FS,AJ_MC,TB_R,WFYD_GUID,WFDW_MC,GDPZ_JG,WFFG,SFFH_GH,ZD_GUID,XZQ_MC,dah";
	public static final String selectKey= "nf,wf_lx1,aj_ly,wf_ss,sl_jg,wfyd_zjzmj,rksj,zh,fh_ghmj,gdpz_wh,txsj,wf_lx2,wfyd_zmj,aj_bh,fx_sj,ay,geometry,slr_jy,jt_tdmj,gd_guid,bfh_gh_mj,wlyd_mj,rkczy,fddbr,jb_nt_mj,wfdw_dz,wfxw,sl_sj,la_sj,cfjd,lc_lx,sh_sj,ht_bh,xzq_dm,tb_sj,sd_fs,tb_bh,gd_mj,bmqz,lc_mc,tb_fzh,tb_wz,gy_td_mj,zf_bh,xm_mc,gdpz_sj,sh_r,xm_yd_mj,lxsx,bp_guid,lxpf_wh,lx_fs,aj_mc,tb_r,wfyd_guid,wfdw_mc,gdpz_jg,wffg,sffh_gh,zd_guid,xzq_mc,dah";

    // 图斑位置
    @Column(name = "tb_wz")
	private String tb_wz;

    // 国有土地面积
    @Column(name = "gy_td_mj")
	private String gy_td_mj;

    // 图斑分支号
    @Column(name = "tb_fzh")
	private String tb_fzh;

    // 流程名称
    @Column(name = "lc_mc")
	private String lc_mc;

    // 填表时间
    @Column(name = "tb_sj")
	private Timestamp tb_sj;

    // 送达方式
    @Column(name = "sd_fs")
	private String sd_fs;

    // 图斑号
    @Column(name = "tb_bh")
	private String tb_bh;

    // 其中耕地面积
    @Column(name = "gd_mj")
	private String gd_mj;

    // 部门签章
    @Column(name = "bmqz")
	private String bmqz;

    // 供地批准机关
    @Column(name = "gdpz_jg")
	private String gdpz_jg;

    // 违法单位
    @Column(name = "wfdw_mc")
	private String wfdw_mc;

    // 违反法规
    @Column(name = "wffg")
	private String wffg;

    // 是否符合土地利用总体规划
    @Column(name = "sffh_gh")
	private String sffh_gh;

    // 行政区名称
    @Column(name = "xzq_mc")
	private String xzq_mc;

    // 征地项目标识
    @Column(name = "zd_guid")
	private String zd_guid;

    // 联系方式
    @Column(name = "lx_fs")
	private String lx_fs;

    // 案卷名称
    @Column(name = "aj_mc")
	private String aj_mc;

    // 
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "wfyd_guid")
	private String wfyd_guid;

    // 填表人
    @Column(name = "tb_r")
	private String tb_r;

    // 报批项目标识
    @Column(name = "bp_guid")
	private String bp_guid;

    // 立项批复文号
    @Column(name = "lxpf_wh")
	private String lxpf_wh;

    // 项目名称
    @Column(name = "xm_mc")
	private String xm_mc;

    // 执法编号
    @Column(name = "zf_bh")
	private String zf_bh;

    // 供地批准时间
    @Column(name = "gdpz_sj")
	private Timestamp gdpz_sj;

    // 审核人
    @Column(name = "sh_r")
	private String sh_r;

    // 履行时限
    @Column(name = "lxsx")
	private Integer lxsx;

    // 项目用地面积
    @Column(name = "xm_yd_mj")
	private String xm_yd_mj;

    // 
    @Column(name = "geometry")
	private String geometry;

    // 案由
    @Column(name = "ay")
	private String ay;

    // 集体土地面积
    @Column(name = "jt_tdmj")
	private String jt_tdmj;

    // 供地项目标识
    @Column(name = "gd_guid")
	private String gd_guid;

    // 受理人建议
    @Column(name = "slr_jy")
	private String slr_jy;

    // 违法用地总面积
    @Column(name = "wfyd_zmj")
	private String wfyd_zmj;

    // 案卷编号
    @Column(name = "aj_bh")
	private String aj_bh;

    // 发现时间
    @Column(name = "fx_sj")
	private Timestamp fx_sj;

    // 供地批准文号
    @Column(name = "gdpz_wh")
	private String gdpz_wh;

    // 填写时间
    @Column(name = "txsj")
	private Timestamp txsj;

    // 违法类型二级类
    @Column(name = "wf_lx2")
	private String wf_lx2;

    // 年份
    @Column(name = "nf")
	private String nf;

    // 违法类型一级类
    @Column(name = "wf_lx1")
	private String wf_lx1;

    // 主要违法事实
    @Column(name = "wf_ss")
	private String wf_ss;

    // 案件来源
    @Column(name = "aj_ly")
	private String aj_ly;

    // 受理机关
    @Column(name = "sl_jg")
	private String sl_jg;

    // 违法用地总建筑面积
    @Column(name = "wfyd_zjzmj")
	private String wfyd_zjzmj;

    // 符合规划面积
    @Column(name = "fh_ghmj")
	private String fh_ghmj;

    // 字号
    @Column(name = "zh")
	private String zh;

    // 入库时间
    @Column(name = "rksj")
	private Timestamp rksj;

    // 审核时间
    @Column(name = "sh_sj")
	private Timestamp sh_sj;

    // 行政区代码
    @Column(name = "xzq_dm")
	private String xzq_dm;

    // 合同编号
    @Column(name = "ht_bh")
	private String ht_bh;

    // 立案时间
    @Column(name = "la_sj")
	private Timestamp la_sj;

    // 处罚决定
    @Column(name = "cfjd")
	private String cfjd;

    // 流程类型
    @Column(name = "lc_lx")
	private String lc_lx;

    // 违法单位地址
    @Column(name = "wfdw_dz")
	private String wfdw_dz;

    // 违法行为
    @Column(name = "wfxw")
	private String wfxw;

    // 
    @Column(name = "sl_sj")
	private Timestamp sl_sj;

    // 不符合规划面积
    @Column(name = "bfh_gh_mj")
	private String bfh_gh_mj;

    // 入库操作员
    @Column(name = "rkczy")
	private String rkczy;

    // 未利用地面积
    @Column(name = "wlyd_mj")
	private String wlyd_mj;

    // 法定代表人
    @Column(name = "fddbr")
	private String fddbr;

    // 其中基本农田面积
    @Column(name = "jb_nt_mj")
	private String jb_nt_mj;
    
    // 档案号
 	@Column(name = "dah")
 	private String dah;

 	public String getDah() {
 		return dah;
 	}

 	public void setDah(String dah) {
 		this.dah = dah;
 	}

    public String getTb_wz() {
		return tb_wz;
	}

	public void setTb_wz(String tb_wz) {
		this.tb_wz = tb_wz;
	}

    public String getGy_td_mj() {
		return gy_td_mj;
	}

	public void setGy_td_mj(String gy_td_mj) {
		this.gy_td_mj = gy_td_mj;
	}

    public String getTb_fzh() {
		return tb_fzh;
	}

	public void setTb_fzh(String tb_fzh) {
		this.tb_fzh = tb_fzh;
	}

    public String getLc_mc() {
		return lc_mc;
	}

	public void setLc_mc(String lc_mc) {
		this.lc_mc = lc_mc;
	}

    public Timestamp getTb_sj() {
		return tb_sj;
	}

	public void setTb_sj(Timestamp tb_sj) {
		this.tb_sj = tb_sj;
	}

    public String getSd_fs() {
		return sd_fs;
	}

	public void setSd_fs(String sd_fs) {
		this.sd_fs = sd_fs;
	}

    public String getTb_bh() {
		return tb_bh;
	}

	public void setTb_bh(String tb_bh) {
		this.tb_bh = tb_bh;
	}

    public String getGd_mj() {
		return gd_mj;
	}

	public void setGd_mj(String gd_mj) {
		this.gd_mj = gd_mj;
	}

    public String getBmqz() {
		return bmqz;
	}

	public void setBmqz(String bmqz) {
		this.bmqz = bmqz;
	}

    public String getGdpz_jg() {
		return gdpz_jg;
	}

	public void setGdpz_jg(String gdpz_jg) {
		this.gdpz_jg = gdpz_jg;
	}

    public String getWfdw_mc() {
		return wfdw_mc;
	}

	public void setWfdw_mc(String wfdw_mc) {
		this.wfdw_mc = wfdw_mc;
	}

    public String getWffg() {
		return wffg;
	}

	public void setWffg(String wffg) {
		this.wffg = wffg;
	}

    public String getSffh_gh() {
		return sffh_gh;
	}

	public void setSffh_gh(String sffh_gh) {
		this.sffh_gh = sffh_gh;
	}

    public String getXzq_mc() {
		return xzq_mc;
	}

	public void setXzq_mc(String xzq_mc) {
		this.xzq_mc = xzq_mc;
	}

    public String getZd_guid() {
		return zd_guid;
	}

	public void setZd_guid(String zd_guid) {
		this.zd_guid = zd_guid;
	}

    public String getLx_fs() {
		return lx_fs;
	}

	public void setLx_fs(String lx_fs) {
		this.lx_fs = lx_fs;
	}

    public String getAj_mc() {
		return aj_mc;
	}

	public void setAj_mc(String aj_mc) {
		this.aj_mc = aj_mc;
	}

    public String getWfyd_guid() {
		return wfyd_guid;
	}

	public void setWfyd_guid(String wfyd_guid) {
		this.wfyd_guid = wfyd_guid;
	}

	public String getPrimaryValue() {
	    return getWfyd_guid();
	}

	public String getPrimaryKey() {
		return "wfyd_guid";
	}
    public String getTb_r() {
		return tb_r;
	}

	public void setTb_r(String tb_r) {
		this.tb_r = tb_r;
	}

    public String getBp_guid() {
		return bp_guid;
	}

	public void setBp_guid(String bp_guid) {
		this.bp_guid = bp_guid;
	}

    public String getLxpf_wh() {
		return lxpf_wh;
	}

	public void setLxpf_wh(String lxpf_wh) {
		this.lxpf_wh = lxpf_wh;
	}

    public String getXm_mc() {
		return xm_mc;
	}

	public void setXm_mc(String xm_mc) {
		this.xm_mc = xm_mc;
	}

    public String getZf_bh() {
		return zf_bh;
	}

	public void setZf_bh(String zf_bh) {
		this.zf_bh = zf_bh;
	}

    public Timestamp getGdpz_sj() {
		return gdpz_sj;
	}

	public void setGdpz_sj(Timestamp gdpz_sj) {
		this.gdpz_sj = gdpz_sj;
	}

    public String getSh_r() {
		return sh_r;
	}

	public void setSh_r(String sh_r) {
		this.sh_r = sh_r;
	}

    public Integer getLxsx() {
		return lxsx;
	}

	public void setLxsx(Integer lxsx) {
		this.lxsx = lxsx;
	}

    public String getXm_yd_mj() {
		return xm_yd_mj;
	}

	public void setXm_yd_mj(String xm_yd_mj) {
		this.xm_yd_mj = xm_yd_mj;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getAy() {
		return ay;
	}

	public void setAy(String ay) {
		this.ay = ay;
	}

    public String getJt_tdmj() {
		return jt_tdmj;
	}

	public void setJt_tdmj(String jt_tdmj) {
		this.jt_tdmj = jt_tdmj;
	}

    public String getGd_guid() {
		return gd_guid;
	}

	public void setGd_guid(String gd_guid) {
		this.gd_guid = gd_guid;
	}

    public String getSlr_jy() {
		return slr_jy;
	}

	public void setSlr_jy(String slr_jy) {
		this.slr_jy = slr_jy;
	}

    public String getWfyd_zmj() {
		return wfyd_zmj;
	}

	public void setWfyd_zmj(String wfyd_zmj) {
		this.wfyd_zmj = wfyd_zmj;
	}

    public String getAj_bh() {
		return aj_bh;
	}

	public void setAj_bh(String aj_bh) {
		this.aj_bh = aj_bh;
	}

    public Timestamp getFx_sj() {
		return fx_sj;
	}

	public void setFx_sj(Timestamp fx_sj) {
		this.fx_sj = fx_sj;
	}

    public String getGdpz_wh() {
		return gdpz_wh;
	}

	public void setGdpz_wh(String gdpz_wh) {
		this.gdpz_wh = gdpz_wh;
	}

    public Timestamp getTxsj() {
		return txsj;
	}

	public void setTxsj(Timestamp txsj) {
		this.txsj = txsj;
	}

    public String getWf_lx2() {
		return wf_lx2;
	}

	public void setWf_lx2(String wf_lx2) {
		this.wf_lx2 = wf_lx2;
	}

    public String getNf() {
		return nf;
	}

	public void setNf(String nf) {
		this.nf = nf;
	}

    public String getWf_lx1() {
		return wf_lx1;
	}

	public void setWf_lx1(String wf_lx1) {
		this.wf_lx1 = wf_lx1;
	}

    public String getWf_ss() {
		return wf_ss;
	}

	public void setWf_ss(String wf_ss) {
		this.wf_ss = wf_ss;
	}

    public String getAj_ly() {
		return aj_ly;
	}

	public void setAj_ly(String aj_ly) {
		this.aj_ly = aj_ly;
	}

    public String getSl_jg() {
		return sl_jg;
	}

	public void setSl_jg(String sl_jg) {
		this.sl_jg = sl_jg;
	}

    public String getWfyd_zjzmj() {
		return wfyd_zjzmj;
	}

	public void setWfyd_zjzmj(String wfyd_zjzmj) {
		this.wfyd_zjzmj = wfyd_zjzmj;
	}

    public String getFh_ghmj() {
		return fh_ghmj;
	}

	public void setFh_ghmj(String fh_ghmj) {
		this.fh_ghmj = fh_ghmj;
	}

    public String getZh() {
		return zh;
	}

	public void setZh(String zh) {
		this.zh = zh;
	}

    public Timestamp getRksj() {
		return rksj;
	}

	public void setRksj(Timestamp rksj) {
		this.rksj = rksj;
	}

    public Timestamp getSh_sj() {
		return sh_sj;
	}

	public void setSh_sj(Timestamp sh_sj) {
		this.sh_sj = sh_sj;
	}

    public String getXzq_dm() {
		return xzq_dm;
	}

	public void setXzq_dm(String xzq_dm) {
		this.xzq_dm = xzq_dm;
	}

    public String getHt_bh() {
		return ht_bh;
	}

	public void setHt_bh(String ht_bh) {
		this.ht_bh = ht_bh;
	}

    public Timestamp getLa_sj() {
		return la_sj;
	}

	public void setLa_sj(Timestamp la_sj) {
		this.la_sj = la_sj;
	}

    public String getCfjd() {
		return cfjd;
	}

	public void setCfjd(String cfjd) {
		this.cfjd = cfjd;
	}

    public String getLc_lx() {
		return lc_lx;
	}

	public void setLc_lx(String lc_lx) {
		this.lc_lx = lc_lx;
	}

    public String getWfdw_dz() {
		return wfdw_dz;
	}

	public void setWfdw_dz(String wfdw_dz) {
		this.wfdw_dz = wfdw_dz;
	}

    public String getWfxw() {
		return wfxw;
	}

	public void setWfxw(String wfxw) {
		this.wfxw = wfxw;
	}

    public Timestamp getSl_sj() {
		return sl_sj;
	}

	public void setSl_sj(Timestamp sl_sj) {
		this.sl_sj = sl_sj;
	}

    public String getBfh_gh_mj() {
		return bfh_gh_mj;
	}

	public void setBfh_gh_mj(String bfh_gh_mj) {
		this.bfh_gh_mj = bfh_gh_mj;
	}

    public String getRkczy() {
		return rkczy;
	}

	public void setRkczy(String rkczy) {
		this.rkczy = rkczy;
	}

    public String getWlyd_mj() {
		return wlyd_mj;
	}

	public void setWlyd_mj(String wlyd_mj) {
		this.wlyd_mj = wlyd_mj;
	}

    public String getFddbr() {
		return fddbr;
	}

	public void setFddbr(String fddbr) {
		this.fddbr = fddbr;
	}

    public String getJb_nt_mj() {
		return jb_nt_mj;
	}

	public void setJb_nt_mj(String jb_nt_mj) {
		this.jb_nt_mj = jb_nt_mj;
	}

}
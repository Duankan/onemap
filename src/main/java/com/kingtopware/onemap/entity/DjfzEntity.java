
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
 * @date： 2017年9月11日
 * @description：用地信息实体类
 * =====================================
 */
@Entity
@Table(name = "T_INF_ONEMAP_DJFZXXB")
public class DjfzEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	public static final String selectAll="select SQDJNR,ZDMJ,PZYT,JZQS,LCMC,SYZXZ,NZ,ZJZL,DZMJ,FZRQ,AJBH,NF,FTZMJ,FZJG,QLQX,ZJBH,JZLX,QSZM,CFQQX,DZ,ZSLB,QTXYDJDNR,FTMJ,QLZQX,GYSYQQK,JTTDSYQR,XZQDM,YTXQLZH,TDYT,TDZL,DJH,XYDQLZSH,TDZXLH,CJH,DJZT,SYZQX,QLSQX,YTDSYZ,JZZDMJ,QLSLQK,LRSJ,DJLB,YZBM,TXDZ,SYQLX,FTXS,DJLX,TDSYZ,XYDZL,BZ,XZQMC,AJ_MC,SPRQ,CFZQX,YDDW,LCLX,BEIZHI,DJFZ_GUID,QSXZ,YTDZH,JZMJ,FH,SYQQX,ZDH,TDZH,XZBZ,SYQX,SYQMJ,TDTXQLZH,JS,st_astext(Geometry),TFH,MPBH,XZ,FCZH,CFQX,GYMJ,dah";
	public static final String selectKey= "sqdjnr,zdmj,pzyt,jzqs,lcmc,syzxz,nz,zjzl,dzmj,fzrq,ajbh,nf,ftzmj,fzjg,qlqx,zjbh,jzlx,qszm,cfqqx,dz,zslb,qtxydjdnr,ftmj,qlzqx,gysyqqk,jttdsyqr,xzqdm,ytxqlzh,tdyt,tdzl,djh,xydqlzsh,tdzxlh,cjh,djzt,syzqx,qlsqx,ytdsyz,jzzdmj,qlslqk,lrsj,djlb,yzbm,txdz,syqlx,ftxs,djlx,tdsyz,xydzl,bz,xzqmc,aj_mc,sprq,cfzqx,yddw,lclx,beizhi,djfz_guid,qsxz,ytdzh,jzmj,fh,syqqx,zdh,tdzh,xzbz,syqx,syqmj,tdtxqlzh,js,geometry,tfh,mpbh,xz,fczh,cfqx,gymj,dah";

	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "DJFZ_GUID", length = 36)
	private String djfz_guid;
	
	  public String getDjfz_guid() {
			return djfz_guid;
		}

		public void setDjfz_guid(String djfz_guid) {
			this.djfz_guid = djfz_guid;
		}
		
		public String getPrimaryValue() {
			return getDjfz_guid();
		}

		public String getPrimaryKey() {
			return "DJFZ_GUID";
		}
		
	
    // 申请登记内容
    @Column(name = "SQDJNR")
	private String sqdjnr;

    // 宗地面积
    @Column(name = "ZDMJ")
	private Double zdmj;

    // 批准用途
    @Column(name = "PZYT")
	private String pzyt;

    // 建筑权属
    @Column(name = "JZQS")
	private String jzqs;

    // 流程名称
    @Column(name = "LCMC")
	private String lcmc;

    // 使用者性质
    @Column(name = "SYZXZ")
	private String syzxz;

    // 南至
    @Column(name = "NZ")
	private String nz;

    // 证件种类
    @Column(name = "ZJZL")
	private String zjzl;

    // 独自面积
    @Column(name = "DZMJ")
	private Double dzmj;

    // 发证日期
    @Column(name = "FZRQ")
	private Date fzrq;

    // 案卷编号
    @Column(name = "AJBH")
	private String ajbh;

    // 
    @Column(name = "NF")
	private Double nf;

    // 分摊总面积
    @Column(name = "FTZMJ")
	private Double ftzmj;

    // 发证机关
    @Column(name = "FZJG")
	private String fzjg;

    // 权力期限
    @Column(name = "QLQX")
	private Integer qlqx;

    // 证件编号
    @Column(name = "ZJBH")
	private String zjbh;

    // 建筑类型
    @Column(name = "JZLX")
	private String jzlx;

    // 权属证明
    @Column(name = "QSZM")
	private String qszm;

    // 查封起期限
    @Column(name = "CFQQX")
	private Date cfqqx;

    // 东至
    @Column(name = "DZ")
	private String dz;

    // 证书类别
    @Column(name = "ZSLB")
	private String zslb;

    // 其他需要登记的内容
    @Column(name = "QTXYDJDNR")
	private String qtxydjdnr;

    // 分摊面积
    @Column(name = "FTMJ")
	private Double ftmj;

    // 权力终期限
    @Column(name = "QLZQX")
	private Date qlzqx;

    // 共有使用权情况
    @Column(name = "GYSYQQK")
	private String gysyqqk;

    // 集体土地所有权人
    @Column(name = "JTTDSYQR")
	private String jttdsyqr;

    // 行政区代码
    @Column(name = "XZQDM")
	private String xzqdm;

    // 原他项权利证号
    @Column(name = "YTXQLZH")
	private String ytxqlzh;

    // 土地用途
    @Column(name = "TDYT")
	private String tdyt;

    // 土地座落
    @Column(name = "TDZL")
	private String tdzl;

    // 地籍号
    @Column(name = "DJH")
	private String djh;

    // 需役地权利证书号
    @Column(name = "XYDQLZSH")
	private String xydqlzsh;

    // 土地证序列号
    @Column(name = "TDZXLH")
	private String tdzxlh;

    // 产籍号
    @Column(name = "CJH")
	private String cjh;

    // DJZT
    @Column(name = "DJZT")
	private String djzt;

    // 使用终期限
    @Column(name = "SYZQX")
	private Date syzqx;

    // 权力始期限
    @Column(name = "QLSQX")
	private Date qlsqx;

    // 原土地使用者
    @Column(name = "YTDSYZ")
	private String ytdsyz;

    // 建筑占地面积
    @Column(name = "JZZDMJ")
	private Double jzzdmj;

    // 权利设立情况
    @Column(name = "QLSLQK")
	private String qlslqk;

    // 
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "LRSJ")
	private Timestamp lrsj;

    // 登记类别
    @Column(name = "DJLB")
	private String djlb;

    // 邮政编码
    @Column(name = "YZBM")
	private String yzbm;

    // 通讯地址
    @Column(name = "TXDZ")
	private String txdz;

    // 使用权类型
    @Column(name = "SYQLX")
	private String syqlx;

    // 分摊系数
    @Column(name = "FTXS")
	private Double ftxs;

    // 登记类型
    @Column(name = "DJLX")
	private String djlx;

    // 土地使用者
    @Column(name = "TDSYZ")
	private String tdsyz;

    // 需役地座落
    @Column(name = "XYDZL")
	private String xydzl;

    // 
    @Column(name = "BZ")
	private String bz;

    // 行政区名称
    @Column(name = "XZQMC")
	private String xzqmc;

    // 案卷名称
    @Column(name = "AJ_MC")
	private String aj_mc;

    // SPRQ
    @Column(name = "SPRQ")
	private Date sprq;

    // 查封终期限
    @Column(name = "CFZQX")
	private Date cfzqx;

    // 用地单位
    @Column(name = "YDDW")
	private String yddw;

    // 流程类型
    @Column(name = "LCLX")
	private String lclx;

    // 北至
    @Column(name = "BEIZHI")
	private String beizhi;

    // 
//    @Column(name = "DJFZ_GUID")
//	private String djfz_guid;

    // 权属性质
    @Column(name = "QSXZ")
	private String qsxz;

    // 原土地证号
    @Column(name = "YTDZH")
	private String ytdzh;

    // 建筑面积
    @Column(name = "JZMJ")
	private Double jzmj;

    // 房号
    @Column(name = "FH")
	private String fh;

    // 使用起期限
    @Column(name = "SYQQX")
	private Date syqqx;

    // 宗地号
    @Column(name = "ZDH")
	private String zdh;

    // 土地证号
    @Column(name = "TDZH")
	private String tdzh;

    // XZBZ
    @Column(name = "XZBZ")
	private String xzbz;

    // 使用期限
    @Column(name = "SYQX")
	private Integer syqx;

    // 使用权面积
    @Column(name = "SYQMJ")
	private Double syqmj;

    // 土地他项权利证号
    @Column(name = "TDTXQLZH")
	private String tdtxqlzh;

    // 记事
    @Column(name = "JS")
	private String js;

    // 
    @Column(name = "Geometry")
	private String geometry;

    // 图幅号
    @Column(name = "TFH")
	private String tfh;

    // 门牌编号
    @Column(name = "MPBH")
	private String mpbh;

    // 西至
    @Column(name = "XZ")
	private String xz;

    // 房产证号
    @Column(name = "FCZH")
	private String fczh;

    // 查封期限
    @Column(name = "CFQX")
	private Integer cfqx;

    // 共用面积
    @Column(name = "GYMJ")
	private Double gymj;
    
    // 档案号
 	@Column(name = "dah")
 	private String dah;

 	public String getDah() {
 		return dah;
 	}

 	public void setDah(String dah) {
 		this.dah = dah;
 	}

    public String getSqdjnr() {
		return sqdjnr;
	}

	public void setSqdjnr(String sqdjnr) {
		this.sqdjnr = sqdjnr;
	}

    public Double getZdmj() {
		return zdmj;
	}

	public void setZdmj(Double zdmj) {
		this.zdmj = zdmj;
	}

    public String getPzyt() {
		return pzyt;
	}

	public void setPzyt(String pzyt) {
		this.pzyt = pzyt;
	}

    public String getJzqs() {
		return jzqs;
	}

	public void setJzqs(String jzqs) {
		this.jzqs = jzqs;
	}

    public String getLcmc() {
		return lcmc;
	}

	public void setLcmc(String lcmc) {
		this.lcmc = lcmc;
	}

    public String getSyzxz() {
		return syzxz;
	}

	public void setSyzxz(String syzxz) {
		this.syzxz = syzxz;
	}

    public String getNz() {
		return nz;
	}

	public void setNz(String nz) {
		this.nz = nz;
	}

    public String getZjzl() {
		return zjzl;
	}

	public void setZjzl(String zjzl) {
		this.zjzl = zjzl;
	}

    public Double getDzmj() {
		return dzmj;
	}

	public void setDzmj(Double dzmj) {
		this.dzmj = dzmj;
	}

    public Date getFzrq() {
		return fzrq;
	}

	public void setFzrq(Date fzrq) {
		this.fzrq = fzrq;
	}

    public String getAjbh() {
		return ajbh;
	}

	public void setAjbh(String ajbh) {
		this.ajbh = ajbh;
	}

    public Double getNf() {
		return nf;
	}

	public void setNf(Double nf) {
		this.nf = nf;
	}

    public Double getFtzmj() {
		return ftzmj;
	}

	public void setFtzmj(Double ftzmj) {
		this.ftzmj = ftzmj;
	}

    public String getFzjg() {
		return fzjg;
	}

	public void setFzjg(String fzjg) {
		this.fzjg = fzjg;
	}

    public Integer getQlqx() {
		return qlqx;
	}

	public void setQlqx(Integer qlqx) {
		this.qlqx = qlqx;
	}

    public String getZjbh() {
		return zjbh;
	}

	public void setZjbh(String zjbh) {
		this.zjbh = zjbh;
	}

    public String getJzlx() {
		return jzlx;
	}

	public void setJzlx(String jzlx) {
		this.jzlx = jzlx;
	}

    public String getQszm() {
		return qszm;
	}

	public void setQszm(String qszm) {
		this.qszm = qszm;
	}

    public Date getCfqqx() {
		return cfqqx;
	}

	public void setCfqqx(Date cfqqx) {
		this.cfqqx = cfqqx;
	}

    public String getDz() {
		return dz;
	}

	public void setDz(String dz) {
		this.dz = dz;
	}

    public String getZslb() {
		return zslb;
	}

	public void setZslb(String zslb) {
		this.zslb = zslb;
	}

    public String getQtxydjdnr() {
		return qtxydjdnr;
	}

	public void setQtxydjdnr(String qtxydjdnr) {
		this.qtxydjdnr = qtxydjdnr;
	}

    public Double getFtmj() {
		return ftmj;
	}

	public void setFtmj(Double ftmj) {
		this.ftmj = ftmj;
	}

    public Date getQlzqx() {
		return qlzqx;
	}

	public void setQlzqx(Date qlzqx) {
		this.qlzqx = qlzqx;
	}

    public String getGysyqqk() {
		return gysyqqk;
	}

	public void setGysyqqk(String gysyqqk) {
		this.gysyqqk = gysyqqk;
	}

    public String getJttdsyqr() {
		return jttdsyqr;
	}

	public void setJttdsyqr(String jttdsyqr) {
		this.jttdsyqr = jttdsyqr;
	}

    public String getXzqdm() {
		return xzqdm;
	}

	public void setXzqdm(String xzqdm) {
		this.xzqdm = xzqdm;
	}

    public String getYtxqlzh() {
		return ytxqlzh;
	}

	public void setYtxqlzh(String ytxqlzh) {
		this.ytxqlzh = ytxqlzh;
	}

    public String getTdyt() {
		return tdyt;
	}

	public void setTdyt(String tdyt) {
		this.tdyt = tdyt;
	}

    public String getTdzl() {
		return tdzl;
	}

	public void setTdzl(String tdzl) {
		this.tdzl = tdzl;
	}

    public String getDjh() {
		return djh;
	}

	public void setDjh(String djh) {
		this.djh = djh;
	}

    public String getXydqlzsh() {
		return xydqlzsh;
	}

	public void setXydqlzsh(String xydqlzsh) {
		this.xydqlzsh = xydqlzsh;
	}

    public String getTdzxlh() {
		return tdzxlh;
	}

	public void setTdzxlh(String tdzxlh) {
		this.tdzxlh = tdzxlh;
	}

    public String getCjh() {
		return cjh;
	}

	public void setCjh(String cjh) {
		this.cjh = cjh;
	}

    public String getDjzt() {
		return djzt;
	}

	public void setDjzt(String djzt) {
		this.djzt = djzt;
	}

    public Date getSyzqx() {
		return syzqx;
	}

	public void setSyzqx(Date syzqx) {
		this.syzqx = syzqx;
	}

    public Date getQlsqx() {
		return qlsqx;
	}

	public void setQlsqx(Date qlsqx) {
		this.qlsqx = qlsqx;
	}

    public String getYtdsyz() {
		return ytdsyz;
	}

	public void setYtdsyz(String ytdsyz) {
		this.ytdsyz = ytdsyz;
	}

    public Double getJzzdmj() {
		return jzzdmj;
	}

	public void setJzzdmj(Double jzzdmj) {
		this.jzzdmj = jzzdmj;
	}

    public String getQlslqk() {
		return qlslqk;
	}

	public void setQlslqk(String qlslqk) {
		this.qlslqk = qlslqk;
	}

    public Timestamp getLrsj() {
		return lrsj;
	}

	public void setLrsj(Timestamp lrsj) {
		this.lrsj = lrsj;
	}

    public String getDjlb() {
		return djlb;
	}

	public void setDjlb(String djlb) {
		this.djlb = djlb;
	}

    public String getYzbm() {
		return yzbm;
	}

	public void setYzbm(String yzbm) {
		this.yzbm = yzbm;
	}

    public String getTxdz() {
		return txdz;
	}

	public void setTxdz(String txdz) {
		this.txdz = txdz;
	}

    public String getSyqlx() {
		return syqlx;
	}

	public void setSyqlx(String syqlx) {
		this.syqlx = syqlx;
	}

    public Double getFtxs() {
		return ftxs;
	}

	public void setFtxs(Double ftxs) {
		this.ftxs = ftxs;
	}

    public String getDjlx() {
		return djlx;
	}

	public void setDjlx(String djlx) {
		this.djlx = djlx;
	}

    public String getTdsyz() {
		return tdsyz;
	}

	public void setTdsyz(String tdsyz) {
		this.tdsyz = tdsyz;
	}

    public String getXydzl() {
		return xydzl;
	}

	public void setXydzl(String xydzl) {
		this.xydzl = xydzl;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
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

    public Date getSprq() {
		return sprq;
	}

	public void setSprq(Date sprq) {
		this.sprq = sprq;
	}

    public Date getCfzqx() {
		return cfzqx;
	}

	public void setCfzqx(Date cfzqx) {
		this.cfzqx = cfzqx;
	}

    public String getYddw() {
		return yddw;
	}

	public void setYddw(String yddw) {
		this.yddw = yddw;
	}

    public String getLclx() {
		return lclx;
	}

	public void setLclx(String lclx) {
		this.lclx = lclx;
	}

    public String getBeizhi() {
		return beizhi;
	}

	public void setBeizhi(String beizhi) {
		this.beizhi = beizhi;
	}


    public String getQsxz() {
		return qsxz;
	}

	public void setQsxz(String qsxz) {
		this.qsxz = qsxz;
	}

    public String getYtdzh() {
		return ytdzh;
	}

	public void setYtdzh(String ytdzh) {
		this.ytdzh = ytdzh;
	}

    public Double getJzmj() {
		return jzmj;
	}

	public void setJzmj(Double jzmj) {
		this.jzmj = jzmj;
	}

    public String getFh() {
		return fh;
	}

	public void setFh(String fh) {
		this.fh = fh;
	}

    public Date getSyqqx() {
		return syqqx;
	}

	public void setSyqqx(Date syqqx) {
		this.syqqx = syqqx;
	}

    public String getZdh() {
		return zdh;
	}

	public void setZdh(String zdh) {
		this.zdh = zdh;
	}

    public String getTdzh() {
		return tdzh;
	}

	public void setTdzh(String tdzh) {
		this.tdzh = tdzh;
	}

    public String getXzbz() {
		return xzbz;
	}

	public void setXzbz(String xzbz) {
		this.xzbz = xzbz;
	}

    public Integer getSyqx() {
		return syqx;
	}

	public void setSyqx(Integer syqx) {
		this.syqx = syqx;
	}

    public Double getSyqmj() {
		return syqmj;
	}

	public void setSyqmj(Double syqmj) {
		this.syqmj = syqmj;
	}

    public String getTdtxqlzh() {
		return tdtxqlzh;
	}

	public void setTdtxqlzh(String tdtxqlzh) {
		this.tdtxqlzh = tdtxqlzh;
	}

    public String getJs() {
		return js;
	}

	public void setJs(String js) {
		this.js = js;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getTfh() {
		return tfh;
	}

	public void setTfh(String tfh) {
		this.tfh = tfh;
	}

    public String getMpbh() {
		return mpbh;
	}

	public void setMpbh(String mpbh) {
		this.mpbh = mpbh;
	}

    public String getXz() {
		return xz;
	}

	public void setXz(String xz) {
		this.xz = xz;
	}

    public String getFczh() {
		return fczh;
	}

	public void setFczh(String fczh) {
		this.fczh = fczh;
	}

    public Integer getCfqx() {
		return cfqx;
	}

	public void setCfqx(Integer cfqx) {
		this.cfqx = cfqx;
	}

    public Double getGymj() {
		return gymj;
	}

	public void setGymj(Double gymj) {
		this.gymj = gymj;
	}

}
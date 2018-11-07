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
 * ====================
 * @author xiexian
 * @date 2018/5/9
 * ====================
 */
@Entity
@Table(name = "BDC_DYAQ")
public class DyaqEntity extends BaseEntity {

	private static final long serialVersionUID = 1L;
	public static final String selectAll="select YWH,YSDM,BDCDYH,BMFHOUSEID,DYBDCLX,DYFS,DJLX,DJYY,ZJJZWZL,ZJJZWDYFW,BDBZZQSE,ZWLXQSSJ,ZWLXJSSJ,ZGZQQDSS,ZGZQSE,ZXDYYWH,ZXDYYY,ZXSJ,BDCDJZMH,QXDM,DJJG,DBR,DJSJ,FJ,QSZT,DYSW,DYBW,DYMJ,ISBLFLAG,ISLHDYANEFLAG,FLAG,TSSJ,CLH,SH";
	public static final String selectKey= "ymh,ysdm,bdcdyh,bmghouseid,dybdclx,dyfs,djlx,djyy,zjjzwzl,zjjzwdyfw,bdbzzqse,zwlxqssj,zwlxjssj,zgzqqdss,zgzqse,zxdyywh,zxdyyy,zxsj,bdcdjzmh,qxdm,djjg,dbr,djsj,fj,qszt,dysw,dybw,dymj,idblflag,islhdyaneflag,flag,tssj,clh,sh";

	
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "YWH", length = 50)
	private String ywh;//主键业务号

	public String getYwh() {
		return ywh;
	}

	public void setYwh(String ywh) {
		this.ywh = ywh;
	}
	
	public String getPrimaryValue() {
		return getYwh();
	}

	public String getPrimaryKey() {
		return "YWH";
	}
	
	//要素代码
	@Column(name = "YSDM")
	private String ysdm;
	
	//不动产单元号
	@Column(name = "BDCDYH")
	private String bdcdyh;
	
	//房屋唯一号
	@Column(name = "BMFHOUSEID")
	private Integer bmfhouseid;
	
	//抵押不动产类型
	@Column(name = "DYBDCLX")
	private String dybdclx;
	
	//抵押方式
	@Column(name = "DYFS")
	private String dyfs;
	
	//登记类型
	@Column(name = "DJLX")
	private String djlx;
	
	//登记愿意
	@Column(name = "DJYY")
	private String djyy;
	
	//在建建筑物坐落
	@Column(name = "ZJJZWZL")
	private String zjjzwzl;
	
	//在建建筑物抵押范围
	@Column(name = "ZJJZWDYFW")
	private String zjjzwdyfw;
	
	//被担保主债权数额
	@Column(name = "BDBZZQSE")
	private Double bdbzzqse;
	
	//债务履行起始时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "ZWLXQSSJ")
    private Timestamp zwlxqssj;
    
	//债务履行结束时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "ZWLXJSSJ")
    private Timestamp zwlxjssj;
    
	//最高债权确定事实
    @Column(name = "ZGZQQDSS")
    private String zgzqqdss;
    
	//最高债权数额
    @Column(name = "ZGZQSE")
    private Double zgzqse;
    
    //注销抵押业务号
    @Column(name = "ZXDYYWH")
    private String zxdyywh;
    
    //注销抵押原因
    @Column(name = "ZXDYYY")
    private String zxdyyy;
    
    //注销时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "ZXSJ")
    private Timestamp zxsj;
    
    //不动产登记证明号
    @Column(name = "BDCDJZMH")
    private String bdcdjzmh;
    
    //区县代码
    @Column(name = "QXDM")
    private String qxdm;
    
    //登记机构
    @Column(name = "DJJG")
    private String djjg;
 
    //登薄人
    @Column(name = "DBR")
    private String dbr;
    
    //登记时间
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "DJSJ")
    private Timestamp djsj;
    
    //附记
    @Column(name = "FJ")
    private String fj;
    
    //权属状态
    @Column(name = "QSZT")
    private String qszt;
    
    //抵押顺位
    @Column(name = "DYSW")
    private String dysw;
    
    //抵押部位
    @Column(name = "DYBW")
    private String dybw;
    
    //抵押面积
    @Column(name = "DYMJ")
    private Double dymj;
    
    //是否补录
    @Column(name = "ISBLFLAG")
    private String isblflag;
    
    //是否联合抵押
    @Column(name = "ISLHDYSANEFLAG")
    private String islhdyaneflag;
    
    //登薄标志
    @Column(name = "FLAG")
    private Integer flag;
    
    //推送时间
    @JsonFormat(pattern = "yy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name = "TSSJ")
    private Timestamp tssj;
	
    //测量号
    @Column(name = "CLH")
    private String clh;
    
    //室号
    @Column(name = "SH")	
    private String sh;

	public String getYsdm() {
		return ysdm;
	}

	public void setYsdm(String ysdm) {
		this.ysdm = ysdm;
	}

	public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

	public Integer getBmfhouseid() {
		return bmfhouseid;
	}

	public void setBmfhouseid(Integer bmfhouseid) {
		this.bmfhouseid = bmfhouseid;
	}

	public String getDybdclx() {
		return dybdclx;
	}

	public void setDybdclx(String dybdclx) {
		this.dybdclx = dybdclx;
	}

	public String getDyfs() {
		return dyfs;
	}

	public void setDyfs(String dyfs) {
		this.dyfs = dyfs;
	}

	public String getDjlx() {
		return djlx;
	}

	public void setDjlx(String djlx) {
		this.djlx = djlx;
	}

	public String getDjyy() {
		return djyy;
	}

	public void setDjyy(String djyy) {
		this.djyy = djyy;
	}

	public String getZjjzwzl() {
		return zjjzwzl;
	}

	public void setZjjzwzl(String zjjzwzl) {
		this.zjjzwzl = zjjzwzl;
	}

	public String getZjjzwdyfw() {
		return zjjzwdyfw;
	}

	public void setZjjzwdyfw(String zjjzwdyfw) {
		this.zjjzwdyfw = zjjzwdyfw;
	}

	public Double getBdbzzqse() {
		return bdbzzqse;
	}

	public void setBdbzzqse(Double bdbzzqse) {
		this.bdbzzqse = bdbzzqse;
	}

	public Timestamp getZwlxqssj() {
		return zwlxqssj;
	}

	public void setZwlxqssj(Timestamp zwlxqssj) {
		this.zwlxqssj = zwlxqssj;
	}

	public Timestamp getZwlxjssj() {
		return zwlxjssj;
	}

	public void setZwlxjssj(Timestamp zwlxjssj) {
		this.zwlxjssj = zwlxjssj;
	}

	public String getZgzqqdss() {
		return zgzqqdss;
	}

	public void setZgzqqdss(String zgzqqdss) {
		this.zgzqqdss = zgzqqdss;
	}

	public Double getZgzqse() {
		return zgzqse;
	}

	public void setZgzqse(Double zgzqse) {
		this.zgzqse = zgzqse;
	}

	public String getZxdyywh() {
		return zxdyywh;
	}

	public void setZxdyywh(String zxdyywh) {
		this.zxdyywh = zxdyywh;
	}

	public String getZxdyyy() {
		return zxdyyy;
	}

	public void setZxdyyy(String zxdyyy) {
		this.zxdyyy = zxdyyy;
	}

	public Timestamp getZxsj() {
		return zxsj;
	}

	public void setZxsj(Timestamp zxsj) {
		this.zxsj = zxsj;
	}

	public String getBdcdjzmh() {
		return bdcdjzmh;
	}

	public void setBdcdjzmh(String bdcdjzmh) {
		this.bdcdjzmh = bdcdjzmh;
	}

	public String getQxdm() {
		return qxdm;
	}

	public void setQxdm(String qxdm) {
		this.qxdm = qxdm;
	}

	public String getDjjg() {
		return djjg;
	}

	public void setDjjg(String djjg) {
		this.djjg = djjg;
	}

	public String getDbr() {
		return dbr;
	}

	public void setDbr(String dbr) {
		this.dbr = dbr;
	}

	public Timestamp getDjsj() {
		return djsj;
	}

	public void setDjsj(Timestamp djsj) {
		this.djsj = djsj;
	}

	public String getFj() {
		return fj;
	}

	public void setFj(String fj) {
		this.fj = fj;
	}

	public String getQszt() {
		return qszt;
	}

	public void setQszt(String qszt) {
		this.qszt = qszt;
	}

	public String getDysw() {
		return dysw;
	}

	public void setDysw(String dysw) {
		this.dysw = dysw;
	}

	public String getDybw() {
		return dybw;
	}

	public void setDybw(String dybw) {
		this.dybw = dybw;
	}

	public Double getDymj() {
		return dymj;
	}

	public void setDymj(Double dymj) {
		this.dymj = dymj;
	}

	public String getIsblflag() {
		return isblflag;
	}

	public void setIsblflag(String isblflag) {
		this.isblflag = isblflag;
	}

	public String getIslhdyaneflag() {
		return islhdyaneflag;
	}

	public void setIslhdyaneflag(String islhdyaneflag) {
		this.islhdyaneflag = islhdyaneflag;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

	public String getClh() {
		return clh;
	}

	public void setClh(String clh) {
		this.clh = clh;
	}

	public String getSh() {
		return sh;
	}

	public void setSh(String sh) {
		this.sh = sh;
	}

    
}

package com.kingtopware.onemap.entity;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kingtopware.framework.entity.BaseEntity;
/**
 * ===========================
 * @author xiexian
 *	查封登记属性结构实体
 * ===========================
 */
@Entity
@Table(name = "BDC_CFDJ")
public class CfdjEntity extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final String selectAll = " select YSDM,BDCDYH,BMFHOUSEID,YWH,CFJG,CFLX,CFWJ,CFWH,CFQSSJ,CFJSSJ,CFFW,QXDM,DJJG,DBR,DJSJ,JFYWH,JFJG,JFWH,JFDBR,JFDJSJ,FJ,QSZT,ISBLFLAG,BDCQZH,TSSJ,FLAG,CLH,SH";
	public static final String selectKey = " ysdm,bdcdyh,bmfhouseid,ywh,cfjg,cflx,cfwj,cfwh,cfqssj,cfjssj,cffw,qxdm,djjg,dbr,djsj,jfywh,jfjg,jfwh,jfdbr,jfdjsj,fj,qszt,isblflag,bdcqzh,tssj,flag,clh,sh";
	
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
	private String bmfhouseid;
	
	//c查封机构
	@Column(name = "CFJG")
	private String cfjg;
	
	//查封类型
	@Column(name = "CFLX")
	private Integer cflx;
	
	//查封文件
	@Column(name = "CFWJ")
	private String cfwj;
	
	//查封文号
	@Column(name = "CFWH")
	private String cfwh;
	
	//查封起始时间
	@Column(name = "CFQSSJ")
	private Date cfqssj;
	
	//查封结束时间
	@Column(name = "CFJSSJ")
	private Date cfjssj;
	
	//查封范围
	@Column(name = "CFFW")
	private String cffw;
	
	//区县代码
	@Column(name = "QXDM")
	private String qxdm;
	
	//登记机构
	@Column(name = "dJJG")
	private String djjg;
	
	//登薄人
	@Column(name = "DBR")
	private String dbr;
	
	//登记时间
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	@Column(name = "DJSJ")
	private Timestamp djsj;
	
	//解封业务号
	@Column(name = "JFYWH")
	private String jfywh;
	
	//解封机关
	@Column(name = "JFJG")
	private String jfjg;
	
	//解封文号
	@Column(name = "JFWH")
	private String jfwh;
	
	//解封登薄人
	@Column(name = "JFDBR")
	private String jfdbr;
	
	//解封登记时间
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	@Column(name = "JFDJSJ")
	private Timestamp jfdjsj;
	
	//附记
	@Column(name = "FJ")
	private String fj;
	
	//权属转态
	@Column(name = "QSZT")
	private String qszt;
	
	//是否补录
	@Column(name = "ISBLFLAG")
	private String isblflag;
	
	//不动产权证号
	@Column(name = "BDCQZH")
	private String bdcqzh;
	
	//推送日期
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	@Column(name = "TSSJ")
	private Timestamp tssj;
	
	//登簿标志
	@Column(name = "FLAG")
	private Integer flag;
	
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

	public String getBmfhouseid() {
		return bmfhouseid;
	}

	public void setBmfhouseid(String bmfhouseid) {
		this.bmfhouseid = bmfhouseid;
	}

	public String getCfjg() {
		return cfjg;
	}

	public void setCfjg(String cfjg) {
		this.cfjg = cfjg;
	}

	public Integer getCflx() {
		return cflx;
	}

	public void setCflx(Integer cflx) {
		this.cflx = cflx;
	}

	public String getCfwj() {
		return cfwj;
	}

	public void setCfwj(String cfwj) {
		this.cfwj = cfwj;
	}

	public String getCfwh() {
		return cfwh;
	}

	public void setCfwh(String cfwh) {
		this.cfwh = cfwh;
	}

	public Date getCfqssj() {
		return cfqssj;
	}

	public void setCfqssj(Date cfqssj) {
		this.cfqssj = cfqssj;
	}

	public Date getCfjssj() {
		return cfjssj;
	}

	public void setCfjssj(Date cfjssj) {
		this.cfjssj = cfjssj;
	}

	public String getCffw() {
		return cffw;
	}

	public void setCffw(String cffw) {
		this.cffw = cffw;
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

	public String getJfywh() {
		return jfywh;
	}

	public void setJfywh(String jfywh) {
		this.jfywh = jfywh;
	}

	public String getJfjg() {
		return jfjg;
	}

	public void setJfjg(String jfjg) {
		this.jfjg = jfjg;
	}

	public String getJfwh() {
		return jfwh;
	}

	public void setJfwh(String jfwh) {
		this.jfwh = jfwh;
	}

	public String getJfdbr() {
		return jfdbr;
	}

	public void setJfdbr(String jfdbr) {
		this.jfdbr = jfdbr;
	}

	public Timestamp getJfdjsj() {
		return jfdjsj;
	}

	public void setJfdjsj(Timestamp jfdjsj) {
		this.jfdjsj = jfdjsj;
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

	public String getIsblflag() {
		return isblflag;
	}

	public void setIsblflag(String isblflag) {
		this.isblflag = isblflag;
	}

	public String getBdcqzh() {
		return bdcqzh;
	}

	public void setBdcqzh(String bdcqzh) {
		this.bdcqzh = bdcqzh;
	}

	public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
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

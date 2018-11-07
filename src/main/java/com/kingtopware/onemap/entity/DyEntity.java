
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
@Table(name = "fc_dy")
public class DyEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 宗地代码
    @Column(name = "earthnum")
	private String earthnum;

    // 债务人
    @Column(name = "zwr")
	private String zwr;

    // 同一房屋多笔抵押被变更抵押
    @Column(name = "pywls")
	private String pywls;

    // 抵押人证件类型
    @Column(name = "dyrzjlx")
	private String dyrzjlx;

    // 抵押权人
    @Column(name = "dyqr")
	private String dyqr;

    // 抵押不动产类型
    @Column(name = "dybdclx")
	private String dybdclx;

    // 推送时间
    @Column(name = "tssj")
	private Date tssj;

    // 登记时间
    @Column(name = "djsj")
	private Date djsj;

    // 抵押面积
    @Column(name = "dymj")
	private Double dymj;

    // 被抵押产权证号
    @Column(name = "sharenum")
	private String sharenum;

    // 他项权证号
    @Column(name = "txqzh")
	private String txqzh;

    // 抵押方式
    @Column(name = "dyfs")
	private String dyfs;

    // 抵押权人证件号码
    @Column(name = "dyqrzjh")
	private String dyqrzjh;

    // 是否预告 1是 0否
    @Column(name = "isyg")
	private String isyg;

    // 结束日期
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "jsrq")
	private Timestamp jsrq;

    // 产权人
    @Column(name = "sname")
	private String sname;

    // 抵押权人证件类型
    @Column(name = "dyqrzjlx")
	private String dyqrzjlx;

    // 
    @Column(name = "flag")
	private String flag;

    // 开始日期
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "ksrq")
	private Timestamp ksrq;

    // 登记类型
    @Column(name = "djlx")
	private String djlx;

    // 他项权证书编号
    @Column(name = "txqzsbh")
	private String txqzsbh;

    // 债务人证件类型
    @Column(name = "zwrzjlx")
	private String zwrzjlx;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_dyid")
	private String fc_dyid;

    // 房产测绘房屋编号
    @Column(name = "roomid")
	private String roomid;

    // 抵押类型
    @Column(name = "dylx")
	private String dylx;

    // 抵押人
    @Column(name = "dyr")
	private String dyr;

    // 债务人证件号码
    @Column(name = "zwrzjh")
	private String zwrzjh;

    // 房产业务流水号
    @Column(name = "fcywls")
	private String fcywls;

    // 记录产生时间
    @Column(name = "cssj")
	private Timestamp cssj;

    // 债权数额
    @Column(name = "zqse")
	private Double zqse;

    // 地址
    @Column(name = "bsit")
	private String bsit;

    // 房号
    @Column(name = "roomnum")
	private String roomnum;

    // 面积
    @Column(name = "barea")
	private String barea;

    // 抵押人证件号码
    @Column(name = "dyrzjh")
	private String dyrzjh;

    // 附记
    @Column(name = "fj")
	private String fj;

    // 不动产业务流水号
    @Column(name = "bdcywls")
	private String bdcywls;

    // 被抵押不动产单元号
    @Column(name = "bdcdyh")
	private String bdcdyh;

    public String getEarthnum() {
		return earthnum;
	}

	public void setEarthnum(String earthnum) {
		this.earthnum = earthnum;
	}

    public String getZwr() {
		return zwr;
	}

	public void setZwr(String zwr) {
		this.zwr = zwr;
	}

    public String getPywls() {
		return pywls;
	}

	public void setPywls(String pywls) {
		this.pywls = pywls;
	}

    public String getDyrzjlx() {
		return dyrzjlx;
	}

	public void setDyrzjlx(String dyrzjlx) {
		this.dyrzjlx = dyrzjlx;
	}

    public String getDyqr() {
		return dyqr;
	}

	public void setDyqr(String dyqr) {
		this.dyqr = dyqr;
	}

    public String getDybdclx() {
		return dybdclx;
	}

	public void setDybdclx(String dybdclx) {
		this.dybdclx = dybdclx;
	}

    public Date getTssj() {
		return tssj;
	}

	public void setTssj(Date tssj) {
		this.tssj = tssj;
	}

    public Date getDjsj() {
		return djsj;
	}

	public void setDjsj(Date djsj) {
		this.djsj = djsj;
	}

    public Double getDymj() {
		return dymj;
	}

	public void setDymj(Double dymj) {
		this.dymj = dymj;
	}

    public String getSharenum() {
		return sharenum;
	}

	public void setSharenum(String sharenum) {
		this.sharenum = sharenum;
	}

    public String getTxqzh() {
		return txqzh;
	}

	public void setTxqzh(String txqzh) {
		this.txqzh = txqzh;
	}

    public String getDyfs() {
		return dyfs;
	}

	public void setDyfs(String dyfs) {
		this.dyfs = dyfs;
	}

    public String getDyqrzjh() {
		return dyqrzjh;
	}

	public void setDyqrzjh(String dyqrzjh) {
		this.dyqrzjh = dyqrzjh;
	}

    public String getIsyg() {
		return isyg;
	}

	public void setIsyg(String isyg) {
		this.isyg = isyg;
	}

    public Timestamp getJsrq() {
		return jsrq;
	}

	public void setJsrq(Timestamp jsrq) {
		this.jsrq = jsrq;
	}

    public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

    public String getDyqrzjlx() {
		return dyqrzjlx;
	}

	public void setDyqrzjlx(String dyqrzjlx) {
		this.dyqrzjlx = dyqrzjlx;
	}

    public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

    public Timestamp getKsrq() {
		return ksrq;
	}

	public void setKsrq(Timestamp ksrq) {
		this.ksrq = ksrq;
	}

    public String getDjlx() {
		return djlx;
	}

	public void setDjlx(String djlx) {
		this.djlx = djlx;
	}

    public String getTxqzsbh() {
		return txqzsbh;
	}

	public void setTxqzsbh(String txqzsbh) {
		this.txqzsbh = txqzsbh;
	}

    public String getZwrzjlx() {
		return zwrzjlx;
	}

	public void setZwrzjlx(String zwrzjlx) {
		this.zwrzjlx = zwrzjlx;
	}

    public String getFc_dyid() {
		return fc_dyid;
	}

	public void setFc_dyid(String fc_dyid) {
		this.fc_dyid = fc_dyid;
	}

	public String getPrimaryValue() {
	    return getFc_dyid();
	}

	public String getPrimaryKey() {
		return "fc_dyid";
	}
    public String getRoomid() {
		return roomid;
	}

	public void setRoomid(String roomid) {
		this.roomid = roomid;
	}

    public String getDylx() {
		return dylx;
	}

	public void setDylx(String dylx) {
		this.dylx = dylx;
	}

    public String getDyr() {
		return dyr;
	}

	public void setDyr(String dyr) {
		this.dyr = dyr;
	}

    public String getZwrzjh() {
		return zwrzjh;
	}

	public void setZwrzjh(String zwrzjh) {
		this.zwrzjh = zwrzjh;
	}

    public String getFcywls() {
		return fcywls;
	}

	public void setFcywls(String fcywls) {
		this.fcywls = fcywls;
	}

    public Timestamp getCssj() {
		return cssj;
	}

	public void setCssj(Timestamp cssj) {
		this.cssj = cssj;
	}

    public Double getZqse() {
		return zqse;
	}

	public void setZqse(Double zqse) {
		this.zqse = zqse;
	}

    public String getBsit() {
		return bsit;
	}

	public void setBsit(String bsit) {
		this.bsit = bsit;
	}

    public String getRoomnum() {
		return roomnum;
	}

	public void setRoomnum(String roomnum) {
		this.roomnum = roomnum;
	}

    public String getBarea() {
		return barea;
	}

	public void setBarea(String barea) {
		this.barea = barea;
	}

    public String getDyrzjh() {
		return dyrzjh;
	}

	public void setDyrzjh(String dyrzjh) {
		this.dyrzjh = dyrzjh;
	}

    public String getFj() {
		return fj;
	}

	public void setFj(String fj) {
		this.fj = fj;
	}

    public String getBdcywls() {
		return bdcywls;
	}

	public void setBdcywls(String bdcywls) {
		this.bdcywls = bdcywls;
	}

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

}

package com.kingtopware.onemap.entity;

import java.sql.Timestamp;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "fc_fwsx")
public class FwsxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 南至
    @Column(name = "nz")
	private String nz;

    // 房间用途
    @Column(name = "buse")
	private String buse;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_fwsxid")
	private String fc_fwsxid;

    // 西至
    @Column(name = "xz")
	private String xz;

    // 房号标识，房号别名
    @Column(name = "roomlabel")
	private String roomlabel;

    // 名义层
    @Column(name = "nameflr")
	private String nameflr;

    // 推送日期
    @Column(name = "tssj")
	private Timestamp tssj;

    // 北至
    @Column(name = "bz")
	private String bz;

    // 总层数
    @Column(name = "ttlflrs")
	private String ttlflrs;

    // 行政区划编码
    @Column(name = "xzqhbm")
	private String xzqhbm;

    // 房号
    @Column(name = "roomnum")
	private String roomnum;

    // 户型
    @Column(name = "hx")
	private String hx;

    // 建筑面积
    @Column(name = "barea")
	private String barea;

    // 土地性质（国有/集体）
    @Column(name = "eprop")
	private String eprop;

    // 房屋编码
    @Column(name = "fwbm")
	private String fwbm;

    // 记录产生时间
    @Column(name = "cssj")
	private Date cssj;

    // 房屋所在幢id
    @Column(name = "houseid")
	private String houseid;

    // 单价
    @Column(name = "dj")
	private String dj;

    // 不动产单元号
    @Column(name = "bdcdyh")
	private String bdcdyh;

    // 土地面积
    @Column(name = "ebarea")
	private String ebarea;

    // 层次，所在层
    @Column(name = "curflr")
	private String curflr;

    // 户型结构
    @Column(name = "hxjg")
	private String hxjg;

    // 房屋性质
    @Column(name = "fwxz")
	private String fwxz;

    // 土地用途
    @Column(name = "tdyt")
	private String tdyt;

    // 坐落
    @Column(name = "bsit")
	private String bsit;

    // 东至
    @Column(name = "dz")
	private String dz;

    // 土地使用开始时间
    @Column(name = "ebegin")
	private String ebegin;

    // 土地使用年限
    @Column(name = "uselmt")
	private String uselmt;

    // 分摊面积
    @Column(name = "aarea")
	private String aarea;

    // 房间状态（1 当前  2 历史）
    @Column(name = "status")
	private String status;

    // 地号
    @Column(name = "dh")
	private String dh;

    // 建筑结构
    @Column(name = "bstruct")
	private String bstruct;

    // 房屋id
    @Column(name = "roomid")
	private String roomid;

    // 土地使用结束时间
    @Column(name = "eend")
	private String eend;

    // 测量号（栋号）
    @Column(name = "earthnum")
	private String earthnum;

    // 
    @Column(name = "flag")
	private String flag;

    // 不动产业务流水
    @Column(name = "bdcywls")
	private String bdcywls;

    // 套内面积
    @Column(name = "rarea")
	private String rarea;

    // 土地l来源
    @Column(name = "esource")
	private String esource;

    // 建成时间；建成年份，竣工日期
    @Column(name = "fnshdate")
	private String fnshdate;

    // 土地证号
    @Column(name = "enum")
	private String enuM;

    
    //获取登记类型 状态：0 正常    1 抵押        2查封     (  3 预告  4 异议     )
    @Transient
    private String registerType;
    
    public String getRegisterType() {
		return registerType;
	}

	public void setRegisterType(String registerType) {
		this.registerType = registerType;
	}
    
    
    public String getNz() {
		return nz;
	}

	public void setNz(String nz) {
		this.nz = nz;
	}

    public String getBuse() {
		return buse;
	}

	public void setBuse(String buse) {
		this.buse = buse;
	}

    public String getFc_fwsxid() {
		return fc_fwsxid;
	}

	public void setFc_fwsxid(String fc_fwsxid) {
		this.fc_fwsxid = fc_fwsxid;
	}

	public String getPrimaryValue() {
	    return getFc_fwsxid();
	}

	public String getPrimaryKey() {
		return "fc_fwsxid";
	}
    public String getXz() {
		return xz;
	}

	public void setXz(String xz) {
		this.xz = xz;
	}

    public String getRoomlabel() {
		return roomlabel;
	}

	public void setRoomlabel(String roomlabel) {
		this.roomlabel = roomlabel;
	}

    public String getNameflr() {
		return nameflr;
	}

	public void setNameflr(String nameflr) {
		this.nameflr = nameflr;
	}

    public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getTtlflrs() {
		return ttlflrs;
	}

	public void setTtlflrs(String ttlflrs) {
		this.ttlflrs = ttlflrs;
	}

    public String getXzqhbm() {
		return xzqhbm;
	}

	public void setXzqhbm(String xzqhbm) {
		this.xzqhbm = xzqhbm;
	}

    public String getRoomnum() {
		return roomnum;
	}

	public void setRoomnum(String roomnum) {
		this.roomnum = roomnum;
	}

    public String getHx() {
		return hx;
	}

	public void setHx(String hx) {
		this.hx = hx;
	}

    public String getBarea() {
		return barea;
	}

	public void setBarea(String barea) {
		this.barea = barea;
	}

    public String getEprop() {
		return eprop;
	}

	public void setEprop(String eprop) {
		this.eprop = eprop;
	}

    public String getFwbm() {
		return fwbm;
	}

	public void setFwbm(String fwbm) {
		this.fwbm = fwbm;
	}

    public Date getCssj() {
		return cssj;
	}

	public void setCssj(Date cssj) {
		this.cssj = cssj;
	}

    public String getHouseid() {
		return houseid;
	}

	public void setHouseid(String houseid) {
		this.houseid = houseid;
	}

    public String getDj() {
		return dj;
	}

	public void setDj(String dj) {
		this.dj = dj;
	}

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

    public String getEbarea() {
		return ebarea;
	}

	public void setEbarea(String ebarea) {
		this.ebarea = ebarea;
	}

    public String getCurflr() {
		return curflr;
	}

	public void setCurflr(String curflr) {
		this.curflr = curflr;
	}

    public String getHxjg() {
		return hxjg;
	}

	public void setHxjg(String hxjg) {
		this.hxjg = hxjg;
	}

    public String getFwxz() {
		return fwxz;
	}

	public void setFwxz(String fwxz) {
		this.fwxz = fwxz;
	}

    public String getTdyt() {
		return tdyt;
	}

	public void setTdyt(String tdyt) {
		this.tdyt = tdyt;
	}

    public String getBsit() {
		return bsit;
	}

	public void setBsit(String bsit) {
		this.bsit = bsit;
	}

    public String getDz() {
		return dz;
	}

	public void setDz(String dz) {
		this.dz = dz;
	}

    public String getEbegin() {
		return ebegin;
	}

	public void setEbegin(String ebegin) {
		this.ebegin = ebegin;
	}

    public String getUselmt() {
		return uselmt;
	}

	public void setUselmt(String uselmt) {
		this.uselmt = uselmt;
	}

    public String getAarea() {
		return aarea;
	}

	public void setAarea(String aarea) {
		this.aarea = aarea;
	}

    public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    public String getDh() {
		return dh;
	}

	public void setDh(String dh) {
		this.dh = dh;
	}

    public String getBstruct() {
		return bstruct;
	}

	public void setBstruct(String bstruct) {
		this.bstruct = bstruct;
	}

    public String getRoomid() {
		return roomid;
	}

	public void setRoomid(String roomid) {
		this.roomid = roomid;
	}

    public String getEend() {
		return eend;
	}

	public void setEend(String eend) {
		this.eend = eend;
	}

    public String getEarthnum() {
		return earthnum;
	}

	public void setEarthnum(String earthnum) {
		this.earthnum = earthnum;
	}

    public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

    public String getBdcywls() {
		return bdcywls;
	}

	public void setBdcywls(String bdcywls) {
		this.bdcywls = bdcywls;
	}

    public String getRarea() {
		return rarea;
	}

	public void setRarea(String rarea) {
		this.rarea = rarea;
	}

    public String getEsource() {
		return esource;
	}

	public void setEsource(String esource) {
		this.esource = esource;
	}

    public String getFnshdate() {
		return fnshdate;
	}

	public void setFnshdate(String fnshdate) {
		this.fnshdate = fnshdate;
	}

    public String getEnum() {
		return enuM;
	}

	public void setEnum(String enuM) {
		this.enuM = enuM;
	}

}
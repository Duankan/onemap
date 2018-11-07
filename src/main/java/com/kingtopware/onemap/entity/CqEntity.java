
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
@Table(name = "fc_cq")
public class CqEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 登记时间
    @Column(name = "djsj")
	private Timestamp djsj;

    // 不动产单元号
    @Column(name = "bdcdyh")
	private String bdcdyh;

    // 注销原因
    @Column(name = "zxyy")
	private String zxyy;

    // 房产业务流水号
    @Column(name = "fcywls")
	private String fcywls;

    // 预告义务人证件类型
    @Column(name = "ywrzjlx")
	private String ywrzjlx;

    // 产权状态
    @Column(name = "status")
	private String status;

    // 产权性质
    @Column(name = "cqlb")
	private String cqlb;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_cqid")
	private String fc_cqid;

    // 
    @Column(name = "flag")
	private String flag;

    // 不动产业务流水号
    @Column(name = "bdcywls")
	private String bdcywls;

    // 预告义务人证件号
    @Column(name = "ywrzh")
	private String ywrzh;

    // 共有情况
    @Column(name = "gyqk")
	private String gyqk;

    // 是否为预估登记；1 是   0 否
    @Column(name = "isyg")
	private String isyg;

    // 预告义务人
    @Column(name = "ywr")
	private String ywr;

    // 房屋性质
    @Column(name = "fwxz")
	private String fwxz;

    // 房屋性质（老系统产权性质）
    @Column(name = "cqxz")
	private String cqxz;

    // 推送日期
    @Column(name = "tssj")
	private Timestamp tssj;

    // 房产测绘房间编号
    @Column(name = "roomid")
	private String roomid;

    // 产权来源
    @Column(name = "cqly")
	private String cqly;

    // 记录产生时间
    @Column(name = "cssj")
	private Timestamp cssj;

    // 上一手业务流水
    @Column(name = "pywls")
	private String pywls;

    // 登记类型
    @Column(name = "djlx")
	private String djlx;

    public Timestamp getDjsj() {
		return djsj;
	}

	public void setDjsj(Timestamp djsj) {
		this.djsj = djsj;
	}

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

    public String getZxyy() {
		return zxyy;
	}

	public void setZxyy(String zxyy) {
		this.zxyy = zxyy;
	}

    public String getFcywls() {
		return fcywls;
	}

	public void setFcywls(String fcywls) {
		this.fcywls = fcywls;
	}

    public String getYwrzjlx() {
		return ywrzjlx;
	}

	public void setYwrzjlx(String ywrzjlx) {
		this.ywrzjlx = ywrzjlx;
	}

    public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    public String getCqlb() {
		return cqlb;
	}

	public void setCqlb(String cqlb) {
		this.cqlb = cqlb;
	}

    public String getFc_cqid() {
		return fc_cqid;
	}

	public void setFc_cqid(String fc_cqid) {
		this.fc_cqid = fc_cqid;
	}

	public String getPrimaryValue() {
	    return getFc_cqid();
	}

	public String getPrimaryKey() {
		return "fc_cqid";
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

    public String getYwrzh() {
		return ywrzh;
	}

	public void setYwrzh(String ywrzh) {
		this.ywrzh = ywrzh;
	}

    public String getGyqk() {
		return gyqk;
	}

	public void setGyqk(String gyqk) {
		this.gyqk = gyqk;
	}

    public String getIsyg() {
		return isyg;
	}

	public void setIsyg(String isyg) {
		this.isyg = isyg;
	}

    public String getYwr() {
		return ywr;
	}

	public void setYwr(String ywr) {
		this.ywr = ywr;
	}

    public String getFwxz() {
		return fwxz;
	}

	public void setFwxz(String fwxz) {
		this.fwxz = fwxz;
	}

    public String getCqxz() {
		return cqxz;
	}

	public void setCqxz(String cqxz) {
		this.cqxz = cqxz;
	}

    public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

    public String getRoomid() {
		return roomid;
	}

	public void setRoomid(String roomid) {
		this.roomid = roomid;
	}

    public String getCqly() {
		return cqly;
	}

	public void setCqly(String cqly) {
		this.cqly = cqly;
	}

    public Timestamp getCssj() {
		return cssj;
	}

	public void setCssj(Timestamp cssj) {
		this.cssj = cssj;
	}

    public String getPywls() {
		return pywls;
	}

	public void setPywls(String pywls) {
		this.pywls = pywls;
	}

    public String getDjlx() {
		return djlx;
	}

	public void setDjlx(String djlx) {
		this.djlx = djlx;
	}

}
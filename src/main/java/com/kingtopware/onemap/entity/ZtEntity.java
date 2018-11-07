
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
@Table(name = "fc_zt")
public class ZtEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 不动产单元号
    @Column(name = "bdcdyh")
	private String bdcdyh;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_ztid")
	private Integer fc_ztid;

    // 
    @Column(name = "flag")
	private String flag;

    // 记录产生时间
    @Column(name = "cssj")
	private Timestamp cssj;

    // 不动产业务流水号
    @Column(name = "bdcywls")
	private String bdcywls;

    // 状态数据字典（正抵押，正查封，正办理预告，正办理转移，正登记产权，正异议，已异议等）
    @Column(name = "zt")
	private String zt;

    // 房产业务流水号
    @Column(name = "fcywls")
	private String fcywls;

    // 房间号，产权主键2
    @Column(name = "roomid")
	private String roomid;

    // 推送时间
    @Column(name = "tssj")
	private Timestamp tssj;

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

    public Integer getFc_ztid() {
		return fc_ztid;
	}

	public void setFc_ztid(Integer fc_ztid) {
		this.fc_ztid = fc_ztid;
	}

	public String getPrimaryValue() {
	    return getFc_ztid()+"";
	}

	public String getPrimaryKey() {
		return "fc_ztid";
	}
    public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

    public Timestamp getCssj() {
		return cssj;
	}

	public void setCssj(Timestamp cssj) {
		this.cssj = cssj;
	}

    public String getBdcywls() {
		return bdcywls;
	}

	public void setBdcywls(String bdcywls) {
		this.bdcywls = bdcywls;
	}

    public String getZt() {
		return zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
	}

    public String getFcywls() {
		return fcywls;
	}

	public void setFcywls(String fcywls) {
		this.fcywls = fcywls;
	}

    public String getRoomid() {
		return roomid;
	}

	public void setRoomid(String roomid) {
		this.roomid = roomid;
	}

    public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

}
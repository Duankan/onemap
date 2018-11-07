
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
@Table(name = "fc_cf")
public class CfEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 查封截止期限
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "usldate")
	private Timestamp usldate;

    // 解封单位
    @Column(name = "unsealcorp")
	private String unsealcorp;

    // 测量号
    @Column(name = "earthnum")
	private String earthnum;

    // 房间编号
    @Column(name = "roomid")
	private String roomid;

    // 申请人
    @Column(name = "proposer")
	private String proposer;

    // 执行裁定书（解封登记则为被解封的查封裁定书）
    @Column(name = "civil")
	private String civil;

    // 地址
    @Column(name = "bsit")
	private String bsit;

    // 被解封或被续封业务流水号
    @Column(name = "pcfywlsh")
	private String pcfywlsh;

    // 房号
    @Column(name = "roomnum")
	private String roomnum;

    // 状态 1 查封 2解封
    @Column(name = "status")
	private String status;

    // 解封执行书文号
    @Column(name = "unzxswh")
	private String unzxswh;

    // 产权人
    @Column(name = "sname")
	private String sname;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_cfid")
	private String fc_cfid;

    // 解封执行裁定书
    @Column(name = "uncivil")
	private String uncivil;

    // 查封单位（解封登记则为被解封的查封单位）
    @Column(name = "sealcorp")
	private String sealcorp;

    // 查封类型
    @Column(name = "cflx")
	private String cflx;

    // 面积
    @Column(name = "barea")
	private String barea;

    // 被申请人
    @Column(name = "bproposer")
	private String bproposer;

    // 房屋所有权证号
    @Column(name = "sharenum")
	private String sharenum;

    // 登簿时间
    @Column(name = "aprldate")
	private Date aprldate;

    // 查封开始期限
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @Column(name = "sealdate")
	private Timestamp sealdate;

    // 推送日期
    @Column(name = "tssj")
	private Date tssj;

    // 查封日期（解封登记则为被解封的查封日期）
    @Column(name = "cfrq")
	private Date cfrq;

    // 执行书文号（解封登记则为被解封的查封执行书文号）
    @Column(name = "zxswh")
	private String zxswh;

    // 解封日期
    @Column(name = "uncfrq")
	private Timestamp uncfrq;

    // 记录产生时间
    @Column(name = "cssj")
	private Timestamp cssj;

    // 
    @Column(name = "flag")
	private String flag;

    // 不动产单元号
    @Column(name = "bdcdyh")
	private String bdcdyh;

    // 不动产业务流水号
    @Column(name = "bdcywls")
	private String bdcywls;

    // 备注
    @Column(name = "remark")
	private String remark;

    public Timestamp getUsldate() {
		return usldate;
	}

	public void setUsldate(Timestamp usldate) {
		this.usldate = usldate;
	}

    public String getUnsealcorp() {
		return unsealcorp;
	}

	public void setUnsealcorp(String unsealcorp) {
		this.unsealcorp = unsealcorp;
	}

    public String getEarthnum() {
		return earthnum;
	}

	public void setEarthnum(String earthnum) {
		this.earthnum = earthnum;
	}

    public String getRoomid() {
		return roomid;
	}

	public void setRoomid(String roomid) {
		this.roomid = roomid;
	}

    public String getProposer() {
		return proposer;
	}

	public void setProposer(String proposer) {
		this.proposer = proposer;
	}

    public String getCivil() {
		return civil;
	}

	public void setCivil(String civil) {
		this.civil = civil;
	}

    public String getBsit() {
		return bsit;
	}

	public void setBsit(String bsit) {
		this.bsit = bsit;
	}

    public String getPcfywlsh() {
		return pcfywlsh;
	}

	public void setPcfywlsh(String pcfywlsh) {
		this.pcfywlsh = pcfywlsh;
	}

    public String getRoomnum() {
		return roomnum;
	}

	public void setRoomnum(String roomnum) {
		this.roomnum = roomnum;
	}

    public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    public String getUnzxswh() {
		return unzxswh;
	}

	public void setUnzxswh(String unzxswh) {
		this.unzxswh = unzxswh;
	}

    public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

    public String getFc_cfid() {
		return fc_cfid;
	}

	public void setFc_cfid(String fc_cfid) {
		this.fc_cfid = fc_cfid;
	}

	public String getPrimaryValue() {
	    return getFc_cfid();
	}

	public String getPrimaryKey() {
		return "fc_cfid";
	}
    public String getUncivil() {
		return uncivil;
	}

	public void setUncivil(String uncivil) {
		this.uncivil = uncivil;
	}

    public String getSealcorp() {
		return sealcorp;
	}

	public void setSealcorp(String sealcorp) {
		this.sealcorp = sealcorp;
	}

    public String getCflx() {
		return cflx;
	}

	public void setCflx(String cflx) {
		this.cflx = cflx;
	}

    public String getBarea() {
		return barea;
	}

	public void setBarea(String barea) {
		this.barea = barea;
	}

    public String getBproposer() {
		return bproposer;
	}

	public void setBproposer(String bproposer) {
		this.bproposer = bproposer;
	}

    public String getSharenum() {
		return sharenum;
	}

	public void setSharenum(String sharenum) {
		this.sharenum = sharenum;
	}

    public Date getAprldate() {
		return aprldate;
	}

	public void setAprldate(Date aprldate) {
		this.aprldate = aprldate;
	}

    public Timestamp getSealdate() {
		return sealdate;
	}

	public void setSealdate(Timestamp sealdate) {
		this.sealdate = sealdate;
	}

    public Date getTssj() {
		return tssj;
	}

	public void setTssj(Date tssj) {
		this.tssj = tssj;
	}

    public Date getCfrq() {
		return cfrq;
	}

	public void setCfrq(Date cfrq) {
		this.cfrq = cfrq;
	}

    public String getZxswh() {
		return zxswh;
	}

	public void setZxswh(String zxswh) {
		this.zxswh = zxswh;
	}

    public Timestamp getUncfrq() {
		return uncfrq;
	}

	public void setUncfrq(Timestamp uncfrq) {
		this.uncfrq = uncfrq;
	}

    public Timestamp getCssj() {
		return cssj;
	}

	public void setCssj(Timestamp cssj) {
		this.cssj = cssj;
	}

    public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

    public String getBdcywls() {
		return bdcywls;
	}

	public void setBdcywls(String bdcywls) {
		this.bdcywls = bdcywls;
	}

    public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
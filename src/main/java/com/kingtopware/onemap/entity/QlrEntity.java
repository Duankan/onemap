
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
@Table(name = "fc_qlr")
public class QlrEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 记录产生时间
    @Column(name = "cssj")
	private Timestamp cssj;

    // 占有份额
    @Column(name = "zyfe")
	private String zyfe;

    // 
    @Column(name = "flag")
	private String flag;

    // 不动产业务流水
    @Column(name = "bdcywls")
	private String bdcywls;

    // 产权人证件号码
    @Column(name = "scnum")
	private String scnum;

    // 产权证号编号
    @Column(name = "sharecnum")
	private String sharecnum;

    // 交易中心业务流水
    @Column(name = "fcywls")
	private String fcywls;

    // 权利人性质
    @Column(name = "qlrxz")
	private String qlrxz;

    // 产权证号
    @Column(name = "sharenum")
	private String sharenum;

    // 产权人
    @Column(name = "sname")
	private String sname;

    // 推送日期
    @Column(name = "tssj")
	private Timestamp tssj;

    // 主键
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "fc_qlrid")
	private String fc_qlrid;

    // 产权人证件类型
    @Column(name = "sctype")
	private String sctype;

    public Timestamp getCssj() {
		return cssj;
	}

	public void setCssj(Timestamp cssj) {
		this.cssj = cssj;
	}

    public String getZyfe() {
		return zyfe;
	}

	public void setZyfe(String zyfe) {
		this.zyfe = zyfe;
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

    public String getScnum() {
		return scnum;
	}

	public void setScnum(String scnum) {
		this.scnum = scnum;
	}

    public String getSharecnum() {
		return sharecnum;
	}

	public void setSharecnum(String sharecnum) {
		this.sharecnum = sharecnum;
	}

    public String getFcywls() {
		return fcywls;
	}

	public void setFcywls(String fcywls) {
		this.fcywls = fcywls;
	}

    public String getQlrxz() {
		return qlrxz;
	}

	public void setQlrxz(String qlrxz) {
		this.qlrxz = qlrxz;
	}

    public String getSharenum() {
		return sharenum;
	}

	public void setSharenum(String sharenum) {
		this.sharenum = sharenum;
	}

    public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

    public Timestamp getTssj() {
		return tssj;
	}

	public void setTssj(Timestamp tssj) {
		this.tssj = tssj;
	}

    public String getFc_qlrid() {
		return fc_qlrid;
	}

	public void setFc_qlrid(String fc_qlrid) {
		this.fc_qlrid = fc_qlrid;
	}

	public String getPrimaryValue() {
	    return getFc_qlrid();
	}

	public String getPrimaryKey() {
		return "fc_qlrid";
	}
    public String getSctype() {
		return sctype;
	}

	public void setSctype(String sctype) {
		this.sctype = sctype;
	}

}
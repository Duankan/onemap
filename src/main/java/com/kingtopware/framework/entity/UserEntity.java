package com.kingtopware.framework.entity;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_USER")
public class UserEntity extends BaseEntity{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "ID", length = 36)
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPrimaryValue() {
		return getId();
	}

	public String getPrimaryKey() {
		return "ID";
	}
	
	/*** 版本编号 */
	// 登录名
	@Column(name = "NAME")
	private String name;
	// 电子邮件
	@Column(name = "EMAIL")
	private String email;
	// 手机号码
	@Column(name = "PHONE")
	private String phone;
	// 密码
	@Column(name = "PASSWORD")
	private String password;
	// 编号
	@Column(name = "NO")
	private String no;
	// 真实姓名
	@Column(name = "TRUENAME")
	private String truename;
	// CA证书
	@Column(name = "CANO")
	private String cano;
	// 人员类别
	@Column(name = "TYPE")
	private Integer type;
	// 修改密码最后时间
	@Column(name = "PWDUPDATETIME")
	private Timestamp pwdupdatetime;
	// 用户标记
	@Column(name = "FLAG")
	private Integer flag;
	// 在线状态
	@Column(name = "ONLINESTATUS")
	private Integer onlinestatus;
	// 使用期限
	@Column(name = "USETIME")
	private Date usetime;
	// 登录IP
	@Column(name = "IP")
	private String ip;
	// 组织ID
	@Column(name = "ORGID")
	private String orgid;
	// 岗位ID
	@Column(name = "POSTID")
	private String postid;
	// 责任ID
	@Column(name = "PERMID")
	private String permid;
	// 创建日期
	@Column(name = "SYSCREATETIME")
	private Timestamp syscreatetime;
	// 创建用户
	@Column(name = "SYSCREATOR")
	private String syscreator;
	// 所属岗位
	@Column(name = "SYSTHEPOST")
	private String systhepost;
	// 所属组织
	@Column(name = "SYSTHEORG")
	private String systheorg;
	// 最后修改日期
	@Column(name = "SYSUPDATETIME")
	private Timestamp sysupdatetime;
	// 最后修改用户
	@Column(name = "SYSUPDATER")
	private String sysupdater;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getTruename() {
		return truename;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	public String getCano() {
		return cano;
	}

	public void setCano(String cano) {
		this.cano = cano;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Timestamp getPwdupdatetime() {
		return pwdupdatetime;
	}

	public void setPwdupdatetime(Timestamp pwdupdatetime) {
		this.pwdupdatetime = pwdupdatetime;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Integer getOnlinestatus() {
		return onlinestatus;
	}

	public void setOnlinestatus(Integer onlinestatus) {
		this.onlinestatus = onlinestatus;
	}

	public Date getUsetime() {
		return usetime;
	}

	public void setUsetime(Date usetime) {
		this.usetime = usetime;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getOrgid() {
		return orgid;
	}

	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}

	public String getPostid() {
		return postid;
	}

	public void setPostid(String postid) {
		this.postid = postid;
	}

	public String getPermid() {
		return permid;
	}

	public void setPermid(String permid) {
		this.permid = permid;
	}

	public Timestamp getSyscreatetime() {
		return syscreatetime;
	}

	public void setSyscreatetime(Timestamp syscreatetime) {
		this.syscreatetime = syscreatetime;
	}

	public String getSyscreator() {
		return syscreator;
	}

	public void setSyscreator(String syscreator) {
		this.syscreator = syscreator;
	}

	public String getSysthepost() {
		return systhepost;
	}

	public void setSysthepost(String systhepost) {
		this.systhepost = systhepost;
	}

	public String getSystheorg() {
		return systheorg;
	}

	public void setSystheorg(String systheorg) {
		this.systheorg = systheorg;
	}

	public Timestamp getSysupdatetime() {
		return sysupdatetime;
	}

	public void setSysupdatetime(Timestamp sysupdatetime) {
		this.sysupdatetime = sysupdatetime;
	}

	public String getSysupdater() {
		return sysupdater;
	}

	public void setSysupdater(String sysupdater) {
		this.sysupdater = sysupdater;
	}

}

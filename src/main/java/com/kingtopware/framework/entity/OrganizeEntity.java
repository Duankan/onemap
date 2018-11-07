package com.kingtopware.framework.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_ORGANIZE")
public class OrganizeEntity extends BaseEntity {
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
	
	// 名称
	@Column(name = "NAME")
	private String name;
	// 组织标记
	@Column(name = "FLAG")
	private Integer flag;
	// 激活标记
	@Column(name = "ACTIVEFLAG")
	private Integer activeflag;
	// 组织类型
	@Column(name = "TYPE")
	private Integer type;
	// 描述
	@Column(name = "DESCRIBE")
	private String describe;
	// 电话
	@Column(name = "TEL")
	private String tel;
	// 传真
	@Column(name = "FAX")
	private String fax;
	// 网址
	@Column(name = "WEBSITE")
	private String website;
	// 地址
	@Column(name = "ADDRESS")
	private String address;
	// 邮政编码
	@Column(name = "POSTCODE")
	private String postcode;
	// 联系人
	@Column(name = "CONTACT")
	private String contact;
	// 层次码
	@Column(name = "LEVELCODE")
	private String levelcode;
	// 父组织外键
	@Column(name = "PARENTID")
	private String parentid;
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

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Integer getActiveflag() {
		return activeflag;
	}

	public void setActiveflag(Integer activeflag) {
		this.activeflag = activeflag;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getLevelcode() {
		return levelcode;
	}

	public void setLevelcode(String levelcode) {
		this.levelcode = levelcode;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
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

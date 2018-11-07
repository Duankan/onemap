package com.kingtopware.framework.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class OrganizeExEntity extends BaseEntity {
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
	public String name;
	// 组织标记
	@Column(name = "FLAG")
	public Integer flag;
	// 激活标记
	@Column(name = "ACTIVEFLAG")
	public Integer activeflag;
	// 组织类型
	@Column(name = "TYPE")
	public Integer type;
	// 描述
	@Column(name = "DESCRIBE")
	public String describe;
	// 电话
	@Column(name = "TEL")
	public String tel;
	// 传真
	@Column(name = "FAX")
	public String fax;
	// 网址
	@Column(name = "WEBSITE")
	public String website;
	// 地址
	@Column(name = "ADDRESS")
	public String address;
	// 邮政编码
	@Column(name = "POSTCODE")
	public String postcode;
	// 联系人
	@Column(name = "CONTACT")
	public String contact;
	// 层次码
	@Column(name = "LEVELCODE")
	public String levelcode;
	// 父组织外键
	@Column(name = "PARENTID")
	public String parentid;
	// 创建日期
	@Column(name = "SYSCREATETIME")
	public Timestamp syscreatetime;
	// 创建用户
	@Column(name = "SYSCREATOR")
	public String syscreator;
	// 所属岗位
	@Column(name = "SYSTHEPOST")
	public String systhepost;
	// 所属组织
	@Column(name = "SYSTHEORG")
	public String systheorg;
	// 最后修改日期
	@Column(name = "SYSUPDATETIME")
	public Timestamp sysupdatetime;
	// 最后修改用户
	@Column(name = "SYSUPDATER")
	public String sysupdater;
	// 状态
	@Column(name = "STATE")
	public String state;
}

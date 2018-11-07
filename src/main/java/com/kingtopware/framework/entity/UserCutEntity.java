package com.kingtopware.framework.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class UserCutEntity extends BaseEntity {
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
	public String name;
	// 真实姓名
	@Column(name = "TRUENAME")
	public String truename;
	// 人员类别
	@Column(name = "TYPE")
	public Integer type;
	// 组织ID
	@Column(name = "ORGID")
	public String orgid;
	// 组织名称
	@Column(name = "ORGNAME")
	public String orgname;
	// 岗位ID
	@Column(name = "POSTID")
	public String postid;
	// 是否岗位负责人（1:0）
	@Column(name = "POSTOWNER")
	public Integer postowner;
}

package com.kingtopware.framework.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class PermissionExEntity extends BaseEntity {
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
	
	// 业务标识符
	@Column(name = "BPID")
	public String bpid;
	// 业务名称
	@Column(name = "BPNAME")
	public String bpname;
	// 父节点编号
	@Column(name = "PARENTID")
	public String parentid;
	// 应用程序ID
	@Column(name = "APPID")
	public String appid;
	// 应用程序名称
	@Column(name = "APPNAME")
	public String appname;
	// 状态
	@Column(name = "STATE")
	public String state;
}

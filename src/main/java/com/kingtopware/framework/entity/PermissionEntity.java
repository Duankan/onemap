package com.kingtopware.framework.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.bean.PermTree;

@Entity
@Table(name = "KTW_PERMISSION")
public class PermissionEntity extends BaseEntity {
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
	private String bpid;
	// 业务名称
	@Column(name = "BPNAME")
	private String bpname;
	// 父节点编号
	@Column(name = "PARENTID")
	private String parentid;
	// 应用程序ID
	@Column(name = "APPID")
	private String appid;
	// 应用程序名称
	@Column(name = "APPNAME")
	private String appname;

	public String getBpid() {
		return bpid;
	}

	public void setBpid(String bpid) {
		this.bpid = bpid;
	}

	public String getBpname() {
		return bpname;
	}

	public void setBpname(String bpname) {
		this.bpname = bpname;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getAppname() {
		return appname;
	}

	public void setAppname(String appname) {
		this.appname = appname;
	}

	public PermTree Convert() {
		PermTree pt = new PermTree();
		pt.id = getId();
		pt.text = bpname;
		return pt;
	}
}

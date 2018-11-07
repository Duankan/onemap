package com.kingtopware.framework.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class DictionaryExEntity extends BaseEntity {
	private static final long serialVersionUID = 485352594100504137L;
	
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
	
	@Column(name = "PARENTID")
	private String parentid;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "CODE")
	private String code;

	@Column(name = "DATA")
	private String data;

	@Column(name = "DATA1")
	private String data1;

	@Column(name = "REMARK")
	private String remark;

	@Column(name = "EDITDATE")
	private Timestamp editdate;
	
	@Column(name = "STATE")
	private String state;

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getData1() {
		return data1;
	}

	public void setData1(String data1) {
		this.data1 = data1;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Timestamp getEditdate() {
		return editdate;
	}

	public void setEditdate(Timestamp editdate) {
		this.editdate = editdate;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}

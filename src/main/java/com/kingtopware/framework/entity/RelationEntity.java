package com.kingtopware.framework.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_RELATION")
public class RelationEntity extends BaseEntity {
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
	
	// 人员ID
	@Column(name = "USERID")
	private String USERID;
	// 好友ID
	@Column(name = "FRIENDID")
	private String FRIENDID;
	// 请求状态
	@Column(name = "REQUEST")
	private Integer REQUEST;
	// 请求时间
	@Column(name = "REQUESTDATE")
	private Date REQUESTDATE;
	// 激活黑名单
	@Column(name = "ISBLACKLIST")
	private Integer ISBLACKLIST;
	// 请求信息
	@Column(name = "MESSAGE")
	private String MESSAGE;

	public String getUSERID() {
		return USERID;
	}

	public void setUSERID(String uSERID) {
		USERID = uSERID;
	}

	public String getFRIENDID() {
		return FRIENDID;
	}

	public void setFRIENDID(String fRIENDID) {
		FRIENDID = fRIENDID;
	}

	public Integer getREQUEST() {
		return REQUEST;
	}

	public void setREQUEST(Integer rEQUEST) {
		REQUEST = rEQUEST;
	}

	public Date getREQUESTDATE() {
		return REQUESTDATE;
	}

	public void setREQUESTDATE(Date rEQUESTDATE) {
		REQUESTDATE = rEQUESTDATE;
	}

	public Integer getISBLACKLIST() {
		return ISBLACKLIST;
	}

	public void setISBLACKLIST(Integer iSBLACKLIST) {
		ISBLACKLIST = iSBLACKLIST;
	}

	public String getMESSAGE() {
		return MESSAGE;
	}

	public void setMESSAGE(String mESSAGE) {
		MESSAGE = mESSAGE;
	}
}

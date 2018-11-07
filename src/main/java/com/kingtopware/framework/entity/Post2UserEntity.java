package com.kingtopware.framework.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_POST2USER")
public class Post2UserEntity extends BaseEntity {
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
	
	// 是否为岗位负责人（1:0）
	@Column(name = "POSTOWNER")
	private Integer postowner;
	// 岗位外键
	@Column(name = "POSTID")
	private String postid;
	// 人员外键
	@Column(name = "USERID")
	private String userid;

	public Integer getPostowner() {
		return postowner;
	}

	public void setPostowner(Integer postowner) {
		this.postowner = postowner;
	}

	public String getPostid() {
		return postid;
	}

	public void setPostid(String postid) {
		this.postid = postid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

}

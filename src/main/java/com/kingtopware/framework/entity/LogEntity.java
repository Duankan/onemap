package com.kingtopware.framework.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_LOG")
public class LogEntity extends BaseEntity{
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
	

	// 日志类型
	@Column(name = "TYPE")
	private String type;
	// 所属模块
	@Column(name = "MODULAR")
	private String modular;
	// 描述信息
	@Column(name = "DESCRIPTION")
	private String description;
	// 创建时间
	@Column(name = "CREATEDATE")
	private Timestamp createdate;
	// 日志来源
	@Column(name = "SOURCE")
	private String source;
	// 消息信息
	@Column(name = "MESSAGE")
	private String message;
	// 计算机用户名称
	@Column(name = "HOSTNAME")
	private String hostname;
	// 系统用户名
	@Column(name = "USERNAME")
	private String username;
	// IP
	@Column(name = "IP")
	private String ip;
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getModular() {
		return modular;
	}
	public void setModular(String modular) {
		this.modular = modular;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Timestamp getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getHostname() {
		return hostname;
	}
	public void setHostname(String hostname) {
		this.hostname = hostname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
}

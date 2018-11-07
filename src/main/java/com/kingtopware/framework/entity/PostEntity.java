package com.kingtopware.framework.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.bean.PostFull;

@Entity
@Table(name = "KTW_POST")
public class PostEntity extends BaseEntity {
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

	// 岗位名称
	@Column(name = "NAME")
	private String name;
	// 描述
	@Column(name = "DESCRIBE")
	private String describe;
	// 是否为部门/组织负责岗位
	@Column(name = "MAINPOST")
	private Integer mainpost;
	// 特殊岗位类型
	@Column(name = "TYPE")
	private String type;
	// 层次码
	@Column(name = "LEVELCODE")
	private String levelcode;
	// 组织ID
	@Column(name = "ORGID")
	private String orgid;
	// 父岗位
	@Column(name = "PARENTID")
	private String parentid;
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

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public Integer getMainpost() {
		return mainpost;
	}

	public void setMainpost(Integer mainpost) {
		this.mainpost = mainpost;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLevelcode() {
		return levelcode;
	}

	public void setLevelcode(String levelcode) {
		this.levelcode = levelcode;
	}

	public String getOrgid() {
		return orgid;
	}

	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
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

	public PostFull convert() {
		PostFull post = new PostFull();
		post.id = this.getId();
		post.describe = this.describe;
		post.levelcode = this.levelcode;
		post.mainpost = this.mainpost;
		post.name = this.name;
		post.orgid = this.orgid;
		post.parentid = this.parentid;
		post.permid = this.permid;
		post.syscreatetime = this.syscreatetime;
		post.syscreator = this.syscreator;
		post.systheorg = this.systheorg;
		post.systhepost = this.systhepost;
		post.sysupdater = this.sysupdater;
		post.sysupdatetime = this.sysupdatetime;
		post.type = this.type;
		return post;
	}
}

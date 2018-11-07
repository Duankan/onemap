package com.kingtopware.onemap.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "K_FJGL")
public class K_FJGLEntity extends BaseEntity {
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

	// 附件外键ID
	@Column(name = "FID")
	private String fid;
	// 附件名称
	@Column(name = "NAME")
	private String name;
	// 附件类型
	@Column(name = "FILETYPE")
	private String filetype;
	// 附件大小（KB）
	@Column(name = "FILESIZE")
	private long filesize;
	// 附件排序
	@Column(name = "fileorder")
	private float fileorder;
	// 附件路径
	@Column(name = "PATH")
	private String path;
	// 附件分类名称
	@Column(name = "KINDNAME")
	private String kindname;
	// 附件分类排序
	@Column(name = "KINDORDER")
	private String kindorder;
	// 附件上传者
	@Column(name = "UPUSER")
	private String upuser;
	// 附件上传时间
	@Column(name = "UPTIME")
	private Timestamp uptime;
	// 备注
	@Column(name = "REMARK")
	private String remark;

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFiletype() {
		return filetype;
	}

	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	public long getFilesize() {
		return filesize;
	}

	public void setFilesize(long filesize) {
		this.filesize = filesize;
	}

	public float getFileorder() {
		return fileorder;
	}

	public void setFileorder(float fileorder) {
		this.fileorder = fileorder;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getKindname() {
		return kindname;
	}

	public void setKindname(String kindname) {
		this.kindname = kindname;
	}

	public String getKindorder() {
		return kindorder;
	}

	public void setKindorder(String kindorder) {
		this.kindorder = kindorder;
	}

	public String getUpuser() {
		return upuser;
	}

	public void setUpuser(String upuser) {
		this.upuser = upuser;
	}

	public Timestamp getUptime() {
		return uptime;
	}

	public void setUptime(Timestamp uptime) {
		this.uptime = uptime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}

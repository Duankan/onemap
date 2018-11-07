package com.kingtopware.framework.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_FOLDER")
public class FolderEntity extends BaseEntity {
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
	
	// 文件夹名称
	@Column(name = "NAME")
	private String name;
	// 创建时间
	@Column(name = "CREATEDATE")
	private Date createdate;
	// 总存储空间
	@Column(name = "STORAGE")
	private Double storage;
	// 描述信息
	@Column(name = "REMARK")
	private String remark;
	// 文件类型
	@Column(name = "FILETYPE")
	private String filetype;
	// 单个文件最大大小限制
	@Column(name = "FILEMAXSIZE")
	private Double filemaxsize;
	// 当前路径
	@Column(name = "CURRPATH")
	private String currpath;
	// 父节点编号
	@Column(name = "PARENTID")
	private String parentid;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	public Double getStorage() {
		return storage;
	}
	public void setStorage(Double storage) {
		this.storage = storage;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getFiletype() {
		return filetype;
	}
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}
	public Double getFilemaxsize() {
		return filemaxsize;
	}
	public void setFilemaxsize(Double filemaxsize) {
		this.filemaxsize = filemaxsize;
	}
	public String getCurrpath() {
		return currpath;
	}
	public void setCurrpath(String currpath) {
		this.currpath = currpath;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
}

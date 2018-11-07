package com.kingtopware.framework.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_FILE")
public class FileEntity extends BaseEntity {
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
	
	// 文件夹编号
	@Column(name = "FOLDERID")
	private String folderid;
	// 附件名称
	@Column(name = "NAME")
	private String name;
	// 附件类型
	@Column(name = "TYPE")
	private String type;
	// 附件扩展名
	@Column(name = "EXTNAME")
	private String extname;
	// 附件大小（KB）
	@Column(name = "SIZE")
	private Long size;
	// 附件路径
	@Column(name = "PATH")
	private String path;
	// 备注
	@Column(name = "REMARK")
	private String remark;
	// 上传者
	@Column(name = "UPLOADER")
	private String uploader;
	// 是否安全
	@Column(name = "SAFED")
	private String safed;
	// 创建时间
	@Column(name = "CREATEDATE")
	private Timestamp createdate;
	// 修改时间
	@Column(name = "UPDATEDATE")
	private Timestamp updatedate;
	// 文档标识符
	@Column(name = "FLAG")
	private String flag;
	
	public String getFolderid() {
		return folderid;
	}
	public void setFolderid(String folderid) {
		this.folderid = folderid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getExtname() {
		return extname;
	}
	public void setExtname(String extname) {
		this.extname = extname;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUploader() {
		return uploader;
	}
	public void setUploader(String uploader) {
		this.uploader = uploader;
	}
	public String getSafed() {
		return safed;
	}
	public void setSafed(String safed) {
		this.safed = safed;
	}
	public Timestamp getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
	}
	public Timestamp getUpdatedate() {
		return updatedate;
	}
	public void setUpdatedate(Timestamp updatedate) {
		this.updatedate = updatedate;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
}

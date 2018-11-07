package com.kingtopware.framework.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_DICTIONARY")
public class DictionaryEntity extends BaseEntity {
	private static final long serialVersionUID = 485352594100504137L;
//	public static final Map<String, String> COLUMNS = new HashMap<String, String>();
//	static {
//		COLUMNS.put("getId", "编号");
//		COLUMNS.put("getType", "类型");
//		COLUMNS.put("getCode", "代码");
//		COLUMNS.put("getData", "数据");
//		COLUMNS.put("getData1", "数据1");
//		COLUMNS.put("getEditdate", "更新日期");
//		COLUMNS.put("getRemark", "备注");
//		COLUMNS.put("getParentid", "父节点编号");
//	}
	
	public static final ArrayList<String> colNames=new ArrayList<String>();
	public static final ArrayList<String> colHeaders=new ArrayList<String>();
	static{
		colNames.add("id");colHeaders.add("编号");
		colNames.add("type");colHeaders.add("类型");
		colNames.add("code");colHeaders.add("代码");
		colNames.add("data");colHeaders.add("数据");
		colNames.add("data1");colHeaders.add("数据1");
		colNames.add("editdate");colHeaders.add("更新日期");
		colNames.add("remark");colHeaders.add("备注");
		colNames.add("parentid");colHeaders.add("父节点编号");
	}
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
}

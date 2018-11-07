package com.kingtopware.framework.bean;

import java.io.Serializable;
import java.sql.Timestamp;

public class PostFull implements Serializable {
	private static final long serialVersionUID = 1L;
	
	// 编号
	public String id;
	// 岗位名称
	public String name;
	// 描述
	public String describe;
	// 是否为部门/组织负责岗位
	public Integer mainpost;
	// 特殊岗位类型
	public String type;
	// 层次码
	public String levelcode;
	// 组织ID
	public String orgid;
	// 父岗位编号
	public String parentid;
	// 父岗位名称
	public String parentname;
	// 责任ID
	public String permid;
	// 创建日期
	public Timestamp syscreatetime;
	// 创建用户
	public String syscreator;
	// 所属岗位
	public String systhepost;
	// 所属组织
	public String systheorg;
	// 最后修改日期
	public Timestamp sysupdatetime;
	// 最后修改用户
	public String sysupdater;
}

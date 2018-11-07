package com.kingtopware.framework.bean;

import java.io.Serializable;

public class PostCut implements Serializable {
	private static final long serialVersionUID = 1L;
	// 岗位ID
	public String id;
	// 岗位名称
	public String name;
	// 是否为部门/组织负责岗位
	public Integer mainpost;
	// 是否为岗位负责人
	public Integer postowner;
}

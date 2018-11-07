package com.kingtopware.framework.bean;

import java.io.Serializable;
import java.util.List;
import com.kingtopware.framework.entity.ContactEntity;
import com.kingtopware.framework.entity.Post2UserEntity;
import com.kingtopware.framework.entity.UserEntity;

public class UserContactPost implements Serializable {
	private static final long serialVersionUID = 1L;
	// 用户基础信息
	public UserEntity user;
	// 用户扩展信息
	public ContactEntity contact;
	// 用户和岗位关联信息
	public List<Post2UserEntity> postusers;
}

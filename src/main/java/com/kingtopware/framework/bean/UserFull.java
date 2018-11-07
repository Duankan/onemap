package com.kingtopware.framework.bean;

import java.util.List;
import com.kingtopware.framework.entity.PermissionEntity;
import com.kingtopware.framework.entity.PostCutEntity;
import com.kingtopware.framework.entity.UserFullEntity;

public class UserFull extends UserFullEntity {
	private static final long serialVersionUID = 1L;
	// 组织根ID
	public String orgrootid;
	// 拥有的岗位
	public List<PostCutEntity> posts;
	// 拥有的责任
	public List<PermissionEntity> perms;

	public UserFull() {

	}

	public UserFull(UserFullEntity entity) {
		setId(entity.getId());
		cano = entity.cano;
		email = entity.email;
		flag = entity.flag;
		ip = entity.ip;
		name = entity.name;
		no = entity.no;
		onlinestatus = entity.onlinestatus;
		orgid = entity.orgid;
		orgname = entity.orgname;
		orgparentid = entity.orgparentid;
		password = entity.password;
		permid = entity.permid;
		phone = entity.phone;
		photouri = entity.photouri;
		postid = entity.postid;
		pwdupdatetime = entity.pwdupdatetime;
		syscreator = entity.syscreator;
		systheorg = entity.systheorg;
		systhepost = entity.systhepost;
		sysupdater = entity.sysupdater;
		syscreatetime = entity.syscreatetime;
		sysupdatetime = entity.sysupdatetime;
		truename = entity.truename;
		type = entity.type;
		usetime = entity.usetime;
	}

	public UserFull cut() {
		UserFull u = new UserFull();
		u.setId(getId());
		u.cano = cano;
		u.email = email;
		u.flag = flag;
		u.ip = ip;
		u.name = name;
		u.no = no;
		u.onlinestatus = onlinestatus;
		u.orgid = orgid;
		u.orgname = orgname;
		u.orgparentid = orgparentid;
		u.orgrootid = orgrootid;
		u.password = password;
		u.permid = permid;
		u.phone = phone;
		u.photouri = photouri;
		u.postid = postid;
		u.posts = posts;
		u.pwdupdatetime = pwdupdatetime;
		u.syscreator = syscreator;
		u.systheorg = systheorg;
		u.systhepost = systhepost;
		u.sysupdater = sysupdater;
		u.syscreatetime = syscreatetime;
		u.sysupdatetime = sysupdatetime;
		u.truename = truename;
		u.type = type;
		u.usetime = usetime;
		return u;
	}
}

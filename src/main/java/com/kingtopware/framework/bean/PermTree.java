package com.kingtopware.framework.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.kingtopware.framework.entity.PermissionEntity;

public class PermTree implements Serializable {
	private static final long serialVersionUID = 1L;
	// 主键
	public String id;
	// 业务项目标识名称（权限名称）bpname
	public String text;
	// 是否展开
	public String state;
	// 是否选中
	public boolean checked;
	// 子节点集合
	public List<PermTree> children;

	public PermTree convert(List<PermissionEntity> perms, List<PermissionEntity> ownerPerms) {
		_perms = perms;
		if (_perms == null || _perms.size() == 0) return null;
		_ownerPerms = ownerPerms;
		state = "open";
		id = "kingtopware";
		text = "权限模块";
		children = new ArrayList<PermTree>();
		List<String> ids = new ArrayList<String>();
		for(PermissionEntity e : perms)
			ids.add(e.getId());
		List<PermissionEntity> ps = new ArrayList<PermissionEntity>();
		for(PermissionEntity e : perms) {
			if (!ids.contains(e.getParentid())) ps.add(e);
		}
		ps(this, ps);
		return this;
	}

	private List<PermissionEntity> _perms = null;
	private List<PermissionEntity> _ownerPerms = null;

	private void ps(PermTree pt, List<PermissionEntity> perms) {
		if (pt.children == null) pt.children = new ArrayList<PermTree>();
		for(PermissionEntity p : perms) {
			PermTree _pt = p.Convert();
			_pt.checked = getChecked(_pt.id);
			pt.children.add(_pt);
			List<PermissionEntity> ps = new ArrayList<PermissionEntity>();
			for(PermissionEntity _p : _perms) {
				if (_p.getParentid().equals(_pt.id)) ps.add(_p);
			}
			if (ps.size() > 0) ps(_pt, ps);
		}
	}

	private boolean getChecked(String id) {
		if (_ownerPerms == null || _ownerPerms.size() == 0) return false;
		for(PermissionEntity p : _perms)
			if (id.equals(p.getParentid())) return false;
		for(PermissionEntity p : _ownerPerms)
			if (id.equals(p.getId())) return true;
		return false;
	}
}

package com.kingtopware.framework.service.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.bean.UserContactPost;
import com.kingtopware.framework.bean.UserFull;
import com.kingtopware.framework.controller.PermissionController;
import com.kingtopware.framework.dao.ContactDao;
import com.kingtopware.framework.dao.Post2UserDao;
import com.kingtopware.framework.dao.UserDao;
import com.kingtopware.framework.entity.ContactEntity;
import com.kingtopware.framework.entity.PermissionEntity;
import com.kingtopware.framework.entity.Post2UserEntity;
import com.kingtopware.framework.entity.PostCutEntity;
import com.kingtopware.framework.entity.UserCutEntity;
import com.kingtopware.framework.entity.UserEntity;
import com.kingtopware.framework.entity.UserFullEntity;
import com.kingtopware.framework.service.UserService;

@Component
public class UserServiceImpl extends BaseServiceImpl<UserEntity> implements UserService {
	private static Logger logger = Logger.getLogger(UserServiceImpl.class);
	@Resource
	UserDao dao;
	@Resource
	ContactDao contactDao;
	@Resource
	Post2UserDao postUserDao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public UserServiceImpl() {
		tableName = "KTW_USER";
	}

	/**
	 * 
	 * @param entity：用户信息
	 * @return
	 */
	public Result<UserFull> login(UserEntity entity, String TOKEN) {
		try {
			String name = entity.getName().replace("'", "''");
			String pwd = entity.getPassword().replace("'", "''");
			// 根据用户名和密码去表"KTW_USER"里去找数据
			String userSql = getSql() + " where NAME='" + name + "' AND PASSWORD='" + pwd + "'";
			// 根据用户拿到所属组织信息(组织ID,组织名称,父组织ID)以及用户邮箱地址
			userSql = "select A.*,B.NAME ORGNAME,B.PARENTID ORGPARENTID,C.PHOTOURI from (" + userSql
					+ ") A LEFT JOIN KTW_ORGANIZE B ON A.ORGID=B.ID LEFT JOIN KTW_CONTACT C ON A.ID=C.USERID";
			// 拿到这个用户对应的岗位信息,以及是否是负责人
			String postSql = "SELECT A.ID,A.NAME,A.MAINPOST,B.POSTOWNER FROM KTW_POST A,KTW_POST2USER B WHERE B.USERID='{0}' AND A.ID=B.POSTID";
			// 根据岗位去找权限的ID
			String p2pSql = "SELECT DISTINCT PERMID FROM KTW_POST2PERM WHERE POSTID IN({0})";
			// 根据权限ID去找权限实体
			String permSql = "SELECT * FROM KTW_PERMISSION WHERE ID IN({0})";
			// 拿到用户基本信息(仅表"KTW_USER")
			List list = getBySql(userSql, UserFullEntity.class);
			if (list.size() == 0) {
				// 没有查找到数据
				return new Result<UserFull>(false, "用户名或密码错误");
			}
			UserFull userFull = new UserFull((UserFullEntity) list.get(0));
			userFull.orgrootid = TOKEN;
			String tempSql = postSql.replace("{0}", userFull.getId());
			// 拿到当前用户的岗位信息
			userFull.posts = getBySql(tempSql, PostCutEntity.class);
			if (userFull.posts.size() == 0) {
				// 如果没有查找到岗位信息,直接返回
				return new Result<UserFull>(userFull);
			}
			boolean isAdmin = false;
			// 遍历当前用户的所有岗位,如果存在岗位ID等于指定的管理员岗位ID的就认为当前用户是管理员
			for (PostCutEntity p : userFull.posts) {
				if (TOKEN.equals(p.getId())) {
					isAdmin = true;
					break;
				}
			}
			if (!isAdmin) {
				// 如果不是管理员,就根据用户去找对应的岗位然后再找对应的权限
				tempSql = p2pSql.replace("{0}", "SELECT ID FROM(" + tempSql + ")T");
				userFull.perms = getBySql(permSql.replace("{0}", tempSql), PermissionEntity.class);
			} else {
				// 如果是管理员就获取所有的权限信息
				userFull.perms = getBySql("SELECT * FROM KTW_PERMISSION", PermissionEntity.class);
			}
			// return new Result<UserFull>(userFull.cut());
			// 不再返回cut后的信息
			return new Result<UserFull>(userFull);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<UserFull>(false, "执行失败");
		}
	}

	public boolean updatePassword(UserEntity entity) {
		UserEntity e = dao.findOne(entity.getId());
		if (e != null && e.getPassword().equals(entity.getPassword())) {
			e.setFlag(1);
			e.setPassword(entity.getNo());
			e.setPwdupdatetime(new Timestamp(new Date().getTime()));
			dao.save(e);
			return true;
		}
		return false;
	}

	public ResultPageList<UserCutEntity> getByPostIDAndName(String postID, String name, String pageIndex,
			String pageSize) {
		String sql = "SELECT A.ID,A.NAME,A.TRUENAME,B.POSTOWNER,B.POSTID,"
				+ "-1 TYPE,'' ORGID,'' ORGNAME FROM KTW_USER A,KTW_POST2USER" + " B WHERE A.ID=B.USERID";
		String condition = " AND B.POSTID='" + postID + "'";
		if ((name = "null".equals(name) ? null : name.replace("'", "''")) != null)
			condition += " AND (A.NAME LIKE '%" + name + "%' OR A.TRUENAME LIKE '%" + name + "%')";
		return new ResultPageList<UserCutEntity>(
				getPageBySql(pageIndex, pageSize, sql + condition, UserCutEntity.class));
	}

	public ResultPageList<UserCutEntity> getFriend(String pageIndex, String pageSize, Map<String, Object> map) {
		String fids = "SELECT FRIENDID FROM KTW_RELATION WHERE USERID='" + map.get("USERID") + "'";
		String sql = "SELECT A.*,B.NAME ORGNAME,null POSTID,-1 POSTOWNER FROM(SELECT ID,";
		sql += "NAME,TRUENAME,TYPE,ORGID FROM KTW_USER A WHERE A.ID IN(" + fids + ")";
		if (map.containsKey("ORGID") && !map.get("ORGID").equals(PermissionController.TOKEN))
			sql += " AND ORGID='" + map.get("ORGID") + "'";
		if (map.containsKey("NAME")) {
			String n = map.get("NAME").toString();
			if (!n.isEmpty())
				sql += " AND (NAME LIKE '%" + n + "%' OR TRUENAME LIKE '%" + n + "%')";
		}
		sql += ") A LEFT JOIN KTW_ORGANIZE B ON A.ORGID=B.ID";
		return new ResultPageList<UserCutEntity>(getPageBySql(pageIndex, pageSize, sql, UserCutEntity.class));
	}

	public ResultPageList<UserEntity> getUserByCondition(String pageIndex, String pageSize, Map<String, Object> map) {
		String sqlpost = "";
		String sql = "SELECT * FROM KTW_USER WHERE 1=1";
		if (map.containsKey("ORGID")) {
			String orgId = map.get("ORGID").toString();
			if (!orgId.isEmpty()) {
				sql += " AND ORGID='" + orgId + "'";
				sqlpost = "SELECT ID FROM KTW_POST WHERE ORGID='" + orgId + "'";
			}
		}
		if (map.containsKey("KEYWORD")) {
			String value = map.get("KEYWORD").toString().replace("'", "''");
			if (!value.isEmpty()) {
				if (!sqlpost.equals(""))
					sqlpost += " AND NAME LIKE '%" + value + "%'";
				sql += " AND (NAME LIKE '%" + value + "%' OR TRUENAME LIKE '%" + value + "%' OR ID IN";
				sql += "(SELECT DISTINCT USERID FROM KTW_POST2USER WHERE POSTID IN(" + sqlpost + ")))";
			}
		}
		return new ResultPageList<UserEntity>(getPageBySql(pageIndex, pageSize, sql, UserEntity.class));
	}

	public Result<Boolean> deleteUser(List<String> ids) {
		if (ids == null || ids.size() == 0)
			return new Result<Boolean>(false);
		String _ids = toString(ids);
		executeUpdate("DELETE FROM KTW_RELATION WHERE USERID IN(" + _ids + ")");
		executeUpdate("DELETE FROM KTW_CONTACT WHERE USERID IN(" + _ids + ")");
		executeUpdate("DELETE FROM KTW_USER WHERE ID IN(" + _ids + ")");
		executeUpdate("DELETE FROM KTW_POST2USER WHERE USERID IN(" + _ids + ")");
		return new Result<Boolean>(true);
	}

	private String toString(List list) {
		if (list.size() == 0)
			return "";
		String str = "";
		for (Object s : list) {
			if (s == null || s.toString().isEmpty())
				continue;
			str += "'" + s.toString().replace("'", "''") + "',";
		}
		return str.substring(0, str.length() - 1);
	}

	public Result<String> insertEx(@RequestBody UserContactPost model) {
		if (model == null || model.user == null)
			return new Result<String>(false);
		String condition = " NAME='" + model.user.getName() + "'";
		if (getCountByCondition(condition) > 0)
			return new Result(false, "用户名已存在");
		UserEntity e = dao.save(model.user);
		if (model.contact != null) {
			model.contact.setUserid(e.getId());
			contactDao.save(model.contact);
		}
		if (model.postusers != null && model.postusers.size() > 0) {
			for (Post2UserEntity pe : model.postusers)
				pe.setUserid(e.getId());
			postUserDao.save(model.postusers);
		}
		return new Result<String>(true);
	}

	public Result<Boolean> updatePwd(Map<String, Object> map) {
		if (!map.containsKey("PWD") || !map.containsKey("UERSID"))
			return new Result<Boolean>(false);
		String pwd = map.get("PWD").toString();
		String ids = toString((List) map.get("UERSID"));
		String sql = "UPDATE KTW_USER SET PASSWORD='" + pwd + "' WHERE ID IN(" + ids + ")";
		return new Result<Boolean>(executeUpdate(sql));
	}

	public Result<UserContactPost> getUserByID(String id) {
		if (id.isEmpty())
			return new Result<UserContactPost>(false, "id不能为空");
		UserContactPost user = new UserContactPost();
		user.user = dao.findOne(id);
		String con = " USERID='" + id + "'";
		String contactsql = "SELECT * FROM KTW_CONTACT WHERE" + con;
		String post2usersql = "SELECT * FROM KTW_POST2USER WHERE" + con;
		List list = getBySql(contactsql, ContactEntity.class);
		if (list != null && list.size() > 0)
			user.contact = (ContactEntity) list.get(0);
		user.postusers = getBySql(post2usersql, Post2UserEntity.class);
		return new Result<UserContactPost>(user);
	}

	public Result<Boolean> updateEx(UserContactPost model) {
		if (model == null || model.user == null)
			return new Result<Boolean>(false);
		dao.save(model.user);
		if (model.contact != null)
			contactDao.save(model.contact);
		executeUpdate("DELETE FROM KTW_POST2USER WHERE USERID='" + model.user.getId() + "'");
		if (model.postusers != null && model.postusers.size() > 0)
			postUserDao.save(model.postusers);
		return new Result<Boolean>(true);
	}
}

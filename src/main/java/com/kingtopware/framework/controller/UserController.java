package com.kingtopware.framework.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.bean.UserContactPost;
import com.kingtopware.framework.bean.UserFull;
import com.kingtopware.framework.entity.PermissionEntity;
import com.kingtopware.framework.entity.UserCutEntity;
import com.kingtopware.framework.entity.UserEntity;
import com.kingtopware.framework.service.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController extends BaseController<UserEntity> {
	private static Logger logger = Logger.getLogger(SystradecodeController.class);
	@Resource
	public UserService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 用户登录验证
	 * 
	 * @param request：请求上下文
	 * @param entity：用户信息
	 * @return：完整的用户信息（包括详细信息和拥有的角色）
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Result<UserFull> login(HttpServletRequest request, @RequestBody UserEntity entity) {
		try {
			Result<UserFull> res = srv.login(entity, PermissionController.TOKEN);
			if (res.isSuccess()) {
				request.getServletContext().setAttribute(res.getData().getId(), res.getData());
				return new Result<UserFull>(res.getData().cut());
			}
			return res;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<UserFull>(false, "执行失败");
		}
	}

	/**
	 * 根据令牌获取用户的权限信息
	 * 
	 * @param request：请求上下文
	 * @param token：令牌
	 * @return：权限集合
	 */
	@RequestMapping(value = "/getperm/{token}", method = RequestMethod.GET)
	public ResultList<PermissionEntity> getPermission(HttpServletRequest request, @PathVariable("token") String token) {
		try {
			if (token.isEmpty()) {
				return new ResultList<PermissionEntity>(false, "令牌不能为空");
			}
			Object obj = request.getServletContext().getAttribute(token);
			UserFull user = (UserFull) obj;
			if (obj == null) {
				return new ResultList<PermissionEntity>(false, "没有获取到用户的信息");
			}
			UserEntity u = new UserEntity();
			u.setName(user.name);
			u.setPassword(user.password);
			Result<UserFull> res = srv.login(u, PermissionController.TOKEN);
			return new ResultList<PermissionEntity>(res.getData().perms);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<PermissionEntity>(false, "执行失败");
		}
	}

	/**
	 * 更新用户密码
	 * 
	 * @param entity：用户信息
	 * @return：更新成功或失败
	 */
	@RequestMapping(value = "/updatepassword", method = RequestMethod.POST)
	public Result<Boolean> updatePassword(@RequestBody UserEntity entity) {
		try {
			if (srv.updatePassword(entity)) {
				return new Result<Boolean>(true);
			} else {
				return new Result<Boolean>(false, "修改失败");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 根据岗位编号和用户名获取分页的用户记录
	 * 
	 * @param postID：岗位编号
	 * @param name：用户名
	 * @param pageIndex：页索引
	 * @param pageSize：页大小
	 * @return：用户记录集合
	 */
	@RequestMapping(value = "/getusercut/{postID}/{name}/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResultPageList<UserCutEntity> getByPostIDAndName(@PathVariable("postID") String postID,
			@PathVariable("name") String name, @PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize) {
		try {
			return srv.getByPostIDAndName(postID, name, pageIndex, pageSize);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultPageList<UserCutEntity>(false, "执行失败");
		}
	}

	/**
	 * 根据好友名和组织编号获取分页的好友列表
	 * 
	 * @param pageIndex：页索引
	 * @param pageSize：页大小
	 * @param map：存放好友名和组织编号信息的对象
	 * @return：好友列表
	 */
	@RequestMapping(value = "/getfriend/{pageIndex}/{pageSize}", method = RequestMethod.POST)
	public ResultPageList<UserCutEntity> getFriend(@PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize, @RequestBody Map<String, Object> map) {
		try {
			return srv.getFriend(pageIndex, pageSize, map);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultPageList<UserCutEntity>(false, "执行失败");
		}
	}

	/**
	 * 根据用户名和组织编号获取分页用户列表
	 * 
	 * @param pageIndex：页索引
	 * @param pageSize：页大小
	 * @param map：存放用户名和组织编号信息的对象
	 * @return：用户列表
	 */
	@RequestMapping(value = "/getuserbycondition/{pageIndex}/{pageSize}", method = RequestMethod.POST)
	public ResultPageList<UserEntity> getUserByCondition(@PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize, @RequestBody Map<String, Object> map) {
		try {
			return srv.getUserByCondition(pageIndex, pageSize, map);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultPageList<UserEntity>(false, "执行失败");
		}
	}

	/**
	 * 根据用户主键集合删除相应的用户信息
	 * 
	 * @param ids：用户主键集合
	 * @return：删除成功或失败状态
	 */
	@RequestMapping(value = "/deleteuser", method = RequestMethod.POST)
	public Result<Boolean> deleteUser(@RequestBody List<String> ids) {
		try {
			return srv.deleteUser(ids);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 新增用户信息
	 * 
	 * @param model：用户信息
	 * @return：新增操作的状态
	 */
	@RequestMapping(value = "/insertex", method = RequestMethod.POST)
	public Result<String> insertEx(@RequestBody UserContactPost model) {
		try {
			return srv.insertEx(model);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 批量更新用户密码
	 * 
	 * @param map：用户编号和密码
	 * @return：更新成功或失败状态
	 */
	@RequestMapping(value = "/updatepwd", method = RequestMethod.POST)
	public Result<Boolean> updatePwd(@RequestBody Map<String, Object> map) {
		try {
			return srv.updatePwd(map);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false, "执行失败");
		}
	}

	/**
	 * 根据用户编号获取用户相关信息
	 * 
	 * @param id：用户编号
	 * @return：用户相关信息
	 */
	@RequestMapping(value = "/getuserbyid/{id}", method = RequestMethod.GET)
	public Result<UserContactPost> getUserByID(@PathVariable("id") String id) {
		try {
			return srv.getUserByID(id);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<UserContactPost>(false, "执行失败");
		}
	}

	/**
	 * 更新用户信息
	 * 
	 * @param model：用户信息
	 * @return：更新成功或失败状态
	 */
	@RequestMapping(value = "/updateex", method = RequestMethod.POST)
	public Result<Boolean> updateEx(@RequestBody UserContactPost model) {
		try {
			return srv.updateEx(model);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false, "执行失败");
		}
	}
}

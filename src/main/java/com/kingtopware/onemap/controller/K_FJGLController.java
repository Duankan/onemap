package com.kingtopware.onemap.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.util.FileUtils;
import com.kingtopware.framework.util.PropertyUtil;
import com.kingtopware.onemap.entity.K_FJGLEntity;
import com.kingtopware.onemap.service.K_FJGLService;

@RestController
@RequestMapping(value = "/fjgl")
public class K_FJGLController extends BaseController<K_FJGLEntity> {
	private static Logger logger = Logger.getLogger(K_FJGLController.class);
	@Resource
	public K_FJGLService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 根据外键关系获得附件列表
	 * 
	 * @param fid
	 * @return
	 */
	@RequestMapping(value = "/getfiles", method = RequestMethod.GET)
	public Result<List<K_FJGLEntity>> GetFiles(@RequestParam(value = "fid") String fid) {
		try {
			return srv.GetFiles(fid);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<List<K_FJGLEntity>>(false, "执行方法错误");
		}
	}

	@RequestMapping(value = "/getaffix/{fid}", method = RequestMethod.GET)
	public Result<List<K_FJGLEntity>> GetAffix(@PathVariable(value = "fid") String fid) {
		try {
			return srv.GetAffix(fid);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<List<K_FJGLEntity>>(false, "执行方法错误");
		}
	}

	@RequestMapping(value = "/getfile", method = RequestMethod.POST)
	public String GetFile(@RequestBody String path) {
		try {
			String fileModel=PropertyUtil.get("filemodel");			
			if(fileModel==null||fileModel.equals("")) {
				return srv.GetFile(path);
			}else {
				return FileUtils.CopyFile(path);
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return ("执行方法错误");
		}
	}

	@RequestMapping(value = "/download", method = RequestMethod.POST)
	public Result<String> DownLoad(HttpServletResponse response, HttpServletRequest request, @RequestBody String ids) {
		try {
			String path = srv.Download(ids);
			return new Result<String>(path);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行方法错误");
		}
	}

	@RequestMapping(value = "/prefile", method = RequestMethod.GET)
	public Result<String> PreFile(@RequestParam(value = "id") String id) {
		try {
			return srv.PreFile(id);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行方法错误");
		}
	}

}

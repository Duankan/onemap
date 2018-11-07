package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ContextLoader;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.JsonOPService;

@RestController
@RequestMapping(value = "/jsonop")
public class JsonOPController {
	private static Logger logger = Logger.getLogger(FileController.class);
	String basePath = null;
	@Resource
	public JsonOPService srv;

	private JsonOPService getServ() {
		if (basePath == null) {
			basePath = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
			basePath.replace('\\', '/');
			if (!basePath.endsWith("/")) {
				basePath += "/";
			}
		}
		return srv;
	}

	@RequestMapping(value = "/write", method = RequestMethod.POST)
	public Result<Boolean> write(@RequestParam String jsonstr, @RequestParam String path) {
		try {
			getServ().write(jsonstr, basePath + path);
			return new Result<Boolean>(true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false, "执行失败");
		}
	}
}

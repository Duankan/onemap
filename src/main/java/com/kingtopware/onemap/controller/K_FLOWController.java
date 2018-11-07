package com.kingtopware.onemap.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.K_FJGLEntity;
import com.kingtopware.onemap.entity.K_FLOWEntity;
import com.kingtopware.onemap.service.K_FLOWService;

@RestController
@RequestMapping(value = "/flow")
public class K_FLOWController extends BaseController<K_FLOWEntity> {
	private static Logger logger = Logger.getLogger(K_FLOWController.class);
	@Resource
	public K_FLOWService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	@RequestMapping(value = "/getflow/{fid}", method = RequestMethod.GET)
	public List<K_FLOWEntity> GetFiles(@PathVariable("fid") String fid) {
		try {
			return srv.getflow();
		} catch (Exception ex) {
			return null;
		}
	}

	@RequestMapping(value = "/updateflow/{id}/{approves}", method = RequestMethod.GET)
	public void updateFlow(@PathVariable("id") String id, @PathVariable("approves") String approves) {
		try {
			srv.updateflow(id, approves);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	@RequestMapping(value = "/deleteflow/{id}", method = RequestMethod.GET)
	public void deleteFlow(@PathVariable("id") String id) {
		try {
			srv.deletenode(id);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	@RequestMapping(value = "/addflow", method = RequestMethod.POST)
	public void addFlow(@RequestBody K_FLOWEntity flow) {
		try {
			srv.addflow(flow);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	@RequestMapping(value = "/updatef", method = RequestMethod.POST)
	public void updateF(@RequestBody K_FLOWEntity flow) {
		try {
			srv.updatef(flow);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	@RequestMapping(value = "/getModules", method = RequestMethod.POST)
	public Result<String> getModules(@RequestParam(value = "flowtype", required = false) String flowtype,
			@RequestParam(value = "flowname", required = false) String flowname,
			@RequestParam(value = "nodename", required = false) String nodename) {
		try {
			if (flowname == null || "".equals(flowname)) {
				return new Result<String>(false, "flowname参数不可为空");
			}
			return srv.getModules(flowtype, flowname, nodename);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

}

package com.kingtopware.onemap.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.K_APPROVEEntity;
import com.kingtopware.onemap.entity.K_FLOWEntity;
import com.kingtopware.onemap.service.K_APPROVEService;

@RestController
@RequestMapping(value = "/approve")
public class K_APPROVEController extends BaseController<K_APPROVEEntity>{
	private static Logger logger=Logger.getLogger(K_APPROVEController.class);
	@Resource
	public K_APPROVEService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
	@RequestMapping(value = "/getapproves/{approves}", method = RequestMethod.GET)
	public List<K_APPROVEEntity> GetFiles(@PathVariable("approves") String approves) {
		try {
			return srv.getapproves(approves);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return null;
		}
	}
}

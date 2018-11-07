
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.ZrzEntity;
import com.kingtopware.onemap.service.ZrzService;

@RestController
@RequestMapping(value = "/zrz")
public class ZrzController extends BaseController<ZrzEntity> {
	
	private static Logger logger = Logger.getLogger(ZrzController.class);
	@Resource
	public ZrzService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
	
}
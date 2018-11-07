
package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.entity.SysareacodeEntity;
import com.kingtopware.framework.service.SysareacodeService;

@RestController
@RequestMapping(value = "/sysareacode")
public class SysareacodeController extends BaseController<SysareacodeEntity> {
	private static Logger logger = Logger.getLogger(SysareacodeController.class);
	@Resource
	public SysareacodeService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
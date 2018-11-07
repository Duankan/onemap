
package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.entity.SyslandcodeEntity;
import com.kingtopware.framework.service.SyslandcodeService;

@RestController
@RequestMapping(value = "/syslandcode")
public class SyslandcodeController extends BaseController<SyslandcodeEntity> {
	private static Logger logger = Logger.getLogger(SyslandcodeController.class);
	@Resource
	public SyslandcodeService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}

package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.entity.SystradecodeEntity;
import com.kingtopware.framework.service.SystradecodeService;

@RestController
@RequestMapping(value = "/systradecode")
public class SystradecodeController extends BaseController<SystradecodeEntity> {
	private static Logger logger = Logger.getLogger(SystradecodeController.class);
	@Resource
	public SystradecodeService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}

package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.entity.Sysareacode2Entity;
import com.kingtopware.framework.service.Sysareacode2Service;

@RestController
@RequestMapping(value = "/sysareacode2")
public class Sysareacode2Controller extends BaseController<Sysareacode2Entity> {
	private static Logger logger = Logger.getLogger(Sysareacode2Controller.class);
	@Resource
	public Sysareacode2Service srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}

package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.ZsxEntity;
import com.kingtopware.onemap.service.ZsxService;

@RestController
@RequestMapping(value = "/zsx")
public class ZsxController extends BaseController<ZsxEntity> {
	@Resource
	public ZsxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
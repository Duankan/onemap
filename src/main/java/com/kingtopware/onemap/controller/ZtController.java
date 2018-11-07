
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.ZtEntity;
import com.kingtopware.onemap.service.ZtService;

@RestController
@RequestMapping(value = "/zt")
public class ZtController extends BaseController<ZtEntity> {
	@Resource
	public ZtService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
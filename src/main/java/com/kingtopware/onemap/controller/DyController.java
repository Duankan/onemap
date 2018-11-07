
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.DyEntity;
import com.kingtopware.onemap.service.DyService;

@RestController
@RequestMapping(value = "/dy")
public class DyController extends BaseController<DyEntity> {
	@Resource
	public DyService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
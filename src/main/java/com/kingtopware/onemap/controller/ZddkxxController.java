package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.ZddkxxEntity;
import com.kingtopware.onemap.service.ZddkxxService;

@RestController
@RequestMapping(value = "/zddkxx")
public class ZddkxxController extends BaseController<ZddkxxEntity> {
	@Resource
	public ZddkxxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}

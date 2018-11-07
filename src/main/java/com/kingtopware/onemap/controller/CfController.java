
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.CfEntity;
import com.kingtopware.onemap.service.CfService;

@RestController
@RequestMapping(value = "/cf")
public class CfController extends BaseController<CfEntity> {
	@Resource
	public CfService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
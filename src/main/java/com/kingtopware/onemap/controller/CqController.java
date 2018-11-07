
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.CqEntity;
import com.kingtopware.onemap.service.CqService;

@RestController
@RequestMapping(value = "/cq")
public class CqController extends BaseController<CqEntity> {
	@Resource
	public CqService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
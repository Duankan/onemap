
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.Inf_onemap_glxxbEntity;
import com.kingtopware.onemap.service.Inf_onemap_glxxbService;

@RestController
@RequestMapping(value = "/inf_onemap_glxxb")
public class Inf_onemap_glxxbController extends BaseController<Inf_onemap_glxxbEntity> {
	@Resource
	public Inf_onemap_glxxbService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
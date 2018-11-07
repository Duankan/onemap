
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.service.CodetblService;

@RestController
@RequestMapping(value = "/codetbl")
public class CodetblController extends BaseController<CodetblEntity> {
	@Resource
	public CodetblService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
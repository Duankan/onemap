
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.PddkxxEntity;
import com.kingtopware.onemap.service.PddkxxService;

@RestController
@RequestMapping(value = "/pddkxx")
public class PddkxxController extends BaseController<PddkxxEntity> {
	@Resource
	public PddkxxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
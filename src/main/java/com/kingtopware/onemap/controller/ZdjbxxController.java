
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.ZdjbxxEntity;
import com.kingtopware.onemap.service.ZdjbxxService;

@RestController
@RequestMapping(value = "/zdjbxx")
public class ZdjbxxController extends BaseController<ZdjbxxEntity> {
	@Resource
	public ZdjbxxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
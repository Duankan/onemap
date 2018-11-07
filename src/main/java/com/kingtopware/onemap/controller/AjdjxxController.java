
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.AjdjxxEntity;
import com.kingtopware.onemap.service.AjdjxxService;

@RestController
@RequestMapping(value = "/ajdj")
public class AjdjxxController extends BaseController<AjdjxxEntity> {
	@Resource
	public AjdjxxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
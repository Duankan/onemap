
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.AjdjkzxxEntity;
import com.kingtopware.onemap.service.AjdjkzxxService;

@RestController
@RequestMapping(value = "/ajdjkz")
public class AjdjkzxxController extends BaseController<AjdjkzxxEntity> {
	@Resource
	public AjdjkzxxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
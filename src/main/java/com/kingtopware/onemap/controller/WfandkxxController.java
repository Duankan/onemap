
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.WfandkxxEntity;
import com.kingtopware.onemap.service.WfandkxxService;

@RestController
@RequestMapping(value = "/wfandk")
public class WfandkxxController extends BaseController<WfandkxxEntity> {
	@Resource
	public WfandkxxService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
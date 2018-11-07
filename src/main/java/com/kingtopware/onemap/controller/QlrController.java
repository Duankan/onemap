
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.QlrEntity;
import com.kingtopware.onemap.service.QlrService;

@RestController
@RequestMapping(value = "/qlr")
public class QlrController extends BaseController<QlrEntity> {
	@Resource
	public QlrService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
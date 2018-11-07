package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.entity.RelationEntity;
import com.kingtopware.framework.service.RelationService;

@RestController
@RequestMapping(value = "/relation")
public class RelationController extends BaseController<RelationEntity> {
	private static Logger logger = Logger.getLogger(RelationController.class);
	@Resource
	public RelationService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
}
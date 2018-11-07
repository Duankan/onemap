package com.kingtopware.framework.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.entity.OrganizeEntity;
import com.kingtopware.framework.entity.OrganizeExEntity;
import com.kingtopware.framework.service.OrganizeService;

@RestController
@RequestMapping(value = "/organize")
public class OrganizeController extends BaseController<OrganizeEntity> {
	private static Logger logger = Logger.getLogger(FolderController.class);
	@Resource
	public OrganizeService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 根据组织编号或组织父节点编号获取这个组织,并判断这个组织是否有子组织
	 * 
	 * @param flag：标识（是组织编号或组织父节点编号）
	 * @param id：组织编号/组织父节点编号
	 * @return：组织列表
	 */
	@RequestMapping(value = "/getbyid/{flag}/{id}", method = RequestMethod.GET)
	public List<OrganizeExEntity> getOrganizeByID(@PathVariable("flag") String flag, @PathVariable("id") String id) {
		try {
			return srv.getOrganizeByID(flag, id);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return null;
		}
	}

}
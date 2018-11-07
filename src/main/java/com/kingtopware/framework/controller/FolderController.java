package com.kingtopware.framework.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.FolderEntity;
import com.kingtopware.framework.service.FolderService;

@RestController
@RequestMapping(value = "/folder")
public class FolderController extends BaseController<FolderEntity> {
	private static Logger logger = Logger.getLogger(FolderController.class);
	@Resource
	public FolderService srv;
	FileController fileService;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	@Override
	public Result<String> deleteByID(@PathVariable("id") String id) {
		try {
			return srv.deleteByID(id);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	@Override
	public Result<String> delete(@RequestBody FolderEntity entity) {
		try {
			if (entity != null && !entity.getId().isEmpty())
				return deleteByID(entity.getId());
			else
				return new Result<String>(false, "未指定删除的实体！");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	@Override
	public Result<String> deletes(@RequestBody List<FolderEntity> entitys) {
		try {
			if (entitys != null && entitys.size() > 0) {
				for (FolderEntity e : entitys)
					delete(e);
				return new Result<String>(true);
			} else {
				return new Result<String>(false, "未指定删除的实体！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
}

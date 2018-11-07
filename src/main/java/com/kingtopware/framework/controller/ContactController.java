package com.kingtopware.framework.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.ContactEntity;
import com.kingtopware.framework.service.ContactService;

@RestController
@RequestMapping(value = "/contact")
public class ContactController extends BaseController<ContactEntity> {
	private static Logger logger = Logger.getLogger(ContactController.class);
	@Resource
	public ContactService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 更新联系人的头像
	 * 
	 * @param id：联系人编号
	 * @param photouri：头像图片存放路径
	 * @return：成功或失败状态
	 */
	@RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
	public Result<String> updateInfo(@PathVariable("id") String id, @RequestBody String photouri) {
		try {
			return srv.updateInfo(id, photouri);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false, "执行方法错误");
		}
	}
}

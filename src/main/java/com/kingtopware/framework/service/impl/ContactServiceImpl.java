package com.kingtopware.framework.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.dao.ContactDao;
import com.kingtopware.framework.entity.ContactEntity;
import com.kingtopware.framework.service.ContactService;

@Component
public class ContactServiceImpl extends BaseServiceImpl<ContactEntity> implements ContactService {
	private static Logger logger = Logger.getLogger(ContactServiceImpl.class);
	@Resource
	public ContactDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ContactServiceImpl() {
		tableName = "KTW_CONTACT";
	}

	public ContactEntity findByUserid(String userid) {
		return dao.findByUserid(userid);
	}

	public Result<String> updateInfo(String id, String photouri) {
		try {
			ContactEntity entity = findByUserid(id);
			if (entity == null) {
				entity = new ContactEntity();
			}
			entity.setPhotouri(photouri);
			return new Result(true, update(entity));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result(false, "执行错误");
		}
	}

}

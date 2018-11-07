package com.kingtopware.framework.dao;

import com.kingtopware.framework.dao.BaseDao;
import com.kingtopware.framework.entity.ContactEntity;

public interface ContactDao extends BaseDao<ContactEntity, String> {
	public ContactEntity findByUserid(String userid);
}

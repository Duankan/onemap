package com.kingtopware.framework.service;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.ContactEntity;

public interface ContactService extends BaseService<ContactEntity> {

	public ContactEntity findByUserid(String userid);

	public Result<String> updateInfo(String id, String photouri);

}

package com.kingtopware.framework.service;

import java.util.List;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.entity.BaseEntity;
import com.kingtopware.framework.entity.DictionaryEntity;
import com.kingtopware.framework.entity.DictionaryExEntity;

public interface DictionaryService extends BaseService<DictionaryEntity> {

	void getBaseDao();

	ResultList<DictionaryExEntity> getDictionaryByParentID(String parentId);

	ResultPageList<DictionaryExEntity> getDictionaryByCondition(String condition, String pageIndex, String pageSize);

	Result deleteInfo(DictionaryEntity model);

	ResultList<DictionaryEntity> getDictionaryByTypes(List<String> types);

	List<DictionaryEntity> getDictionaryList(String condition);

}
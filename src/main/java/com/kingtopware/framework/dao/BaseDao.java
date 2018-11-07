package com.kingtopware.framework.dao;

import java.io.Serializable;

import org.springframework.data.repository.NoRepositoryBean;

import com.kingtopware.framework.database.BasePagingAndSortingRepository;

@NoRepositoryBean
public interface BaseDao<T, ID extends Serializable> extends BasePagingAndSortingRepository<T, ID> {
	//PagingAndSortingRepository<T, ID>这个接口提供了分页与排序功能
}
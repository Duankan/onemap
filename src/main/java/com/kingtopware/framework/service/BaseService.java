package com.kingtopware.framework.service;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.kingtopware.framework.bean.PageList;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.entity.BaseEntity;

@SuppressWarnings({ "rawtypes" })
public interface BaseService<T extends BaseEntity> {

	public void getBaseDao();

	/**
	 * 查询表中的所有数据
	 * 
	 * @return
	 */
	public List<T> get();

	/**
	 * 查询表中的数据根据页索引和页大小
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @return
	 */
	public PageList<T> get(String pageIndex, String pageSize);

	/**
	 * 查询表中的数据根据过滤条件
	 * 
	 * @param map
	 *            过滤参数
	 * @return
	 */
	public List<T> getByFilter(Map map);

	/**
	 * 查询表中的数据根据过滤条件
	 * 
	 * @param where
	 *            过滤条件
	 * @param orderby
	 *            排序字段
	 * @return
	 */
	public List<T> getByFilter(String where, String orderby);

	/**
	 * 查询表中的数据根据过滤条件
	 * 
	 * @param where
	 *            过滤条件
	 * @return
	 */
	public List<T> getByFilter(String where);

	/**
	 * 查询表中的数据根据查询SQL命令
	 * 
	 * @param sql
	 *            查询SQL命令
	 * @return
	 */
	public List<T> getBySql(String sql);

	/**
	 * 查询表中的数据根据查询SQL命令
	 * 
	 * @param sql
	 *            查询SQL命令
	 * @param resultClass
	 *            解析对象的类型
	 * @return
	 */
	public List getBySql(String sql, Class resultClass);

	/**
	 * 查询表中的数据根据过滤条件和分页信息
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param map
	 *            过滤参数
	 * @return
	 */
	public PageList<T> getPageByFilter(String pageIndex, String pageSize, Map map);

	/**
	 * 查询表中的数据根据过滤条件和分页信息
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param where
	 *            过滤条件
	 * @param orderby
	 *            排序字段
	 * @return
	 */
	public PageList<T> getPageByFilter(String pageIndex, String pageSize, String where, String orderby);

	/**
	 * 查询表中的数据根据过滤条件和分页信息
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param where
	 *            过滤条件
	 * @return
	 */
	public PageList<T> getPageByFilter(String pageIndex, String pageSize, String where);

	/**
	 * 查询表中的数据根据查询SQL命令和分页信息
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param sql
	 *            查询SQL命令
	 * @return
	 */
	public PageList<T> getPageBySql(String pageIndex, String pageSize, String sql);

	/**
	 * 查询表中的数据根据查询SQL命令和分页信息
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param sql
	 *            查询SQL命令
	 * @param resultClass
	 *            解析对象的类型
	 * @return
	 */
	public PageList getPageBySql(String pageIndex, String pageSize, String sql, Class resultClass);

	/**
	 * 根据sql获取查询结果条数
	 * 
	 * @param sql
	 *            sql命令
	 * @return 结果条数
	 */
	public int getCountBySql(String sql);

	/**
	 * 根据sql获取查询结果条数
	 * 
	 * @param sql
	 *            sql命令
	 * @return 结果条数
	 */
	public int getCountByCondition(String condition);

	/**
	 * 查询数据根据id
	 * 
	 * @param id:主键
	 * @return
	 */
	public T getById(String id);

	/**
	 * 往表中新增一条数据
	 * 
	 * @param entity:实体对象
	 * @return 插入成功后的对象ID（主键）
	 */
	@Transactional
	public String add(T entity);

	/**
	 * 往表中新增多条数据
	 * 
	 * @param entity:实体对象
	 * @return 插入成功后的对象ID（主键）
	 */
	@Transactional
	public String add(List<T> entitys);

	/**
	 * 更新表中的一条数据
	 * 
	 * @param entity:实体对象
	 * @return 修改成功后的对象ID（主键）
	 */
	@Transactional
	public String update(T entity);

	/**
	 * 更新表中的多条数据
	 * 
	 * @param entity:实体对象
	 * @return 修改成功后的对象ID（主键）
	 */
	@Transactional
	public String update(List<T> entitys);

	/**
	 * 删除表中的一条数据
	 * 
	 * @param entity:实体对象
	 * @return 删除成功后的对象ID（主键）
	 */
	@Transactional
	public String delete(T entity);

	/**
	 * 删除表中的多条数据
	 * 
	 * @param entitys：实体对象集合
	 * @return 删除成功后的对象ID（主键）
	 */
	@Transactional
	public Result<String> delete(List<T> entitys);

	/**
	 * 删除表中的数据通过条件
	 * 
	 * @param condition：条件
	 * @return 执行是否成功
	 */
	@Transactional
	public boolean delete(String condition);

	/**
	 * 删除表中的数据通过条件
	 * 
	 * @param id：主键值
	 * @return 执行是否成功
	 */
	@Transactional
	public boolean deleteById(String id) throws Exception;

	/**
	 * 删除表中的数据通过条件
	 * 
	 * @param sql：删改命令
	 * @return 执行是否成功
	 */
	@Transactional
	public boolean executeUpdate(String sql);

	public T findOne(String id);
	
}
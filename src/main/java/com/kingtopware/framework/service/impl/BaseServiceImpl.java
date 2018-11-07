package com.kingtopware.framework.service.impl;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.kingtopware.framework.bean.PageInfo;
import com.kingtopware.framework.bean.PageList;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.dao.BaseDao;
import com.kingtopware.framework.entity.BaseEntity;
import com.kingtopware.framework.service.BaseService;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class BaseServiceImpl<T extends BaseEntity> implements BaseService<T> {
	private static Logger logger=Logger.getLogger(BaseServiceImpl.class);
	@Resource
	protected EntityManagerFactory emf;
	protected BaseDao<T, String> baseDao;
	protected String tableName;

	public void getBaseDao() {
	}

	/**
	 * 查询表中的所有数据
	 * 
	 * @return
	 */
	public List<T> get() {		
		return getBySql(null);
	}

	/**
	 * 查询表中的数据根据页索引和页大小
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @return
	 */
	public PageList<T> get(String pageIndex, String pageSize) {
		return getPageBySql(pageIndex, pageSize, null);
	}

	/**
	 * 查询表中的数据根据过滤条件
	 * 
	 * @param map
	 *            过滤参数
	 * @return
	 */
	public List<T> getByFilter(Map map) {
		return getBySql(getSql(map));
	}

	/**
	 * 查询表中的数据根据过滤条件
	 * 
	 * @param where
	 *            过滤条件
	 * @param orderby
	 *            排序字段
	 * @return
	 */
	public List<T> getByFilter(String where, String orderby) {
		return getBySql(getSql(where, orderby));
	}

	/**
	 * 查询表中的数据根据过滤条件
	 * 
	 * @param where
	 *            过滤条件
	 * @return
	 */
	public List<T> getByFilter(String where) {
		return getBySql(getSql(where, null));
	}

	/**
	 * 查询表中的数据根据查询SQL命令
	 * 
	 * @param sql
	 *            查询SQL命令
	 * @return
	 */
	public List<T> getBySql(String sql) {
		if (sql == null || sql.isEmpty())
			sql = "select * from " + tableName;
		return getBySql(sql, getGenericClass());
	}

	/**
	 * 查询表中的数据根据查询SQL命令
	 * 
	 * @param sql
	 *            查询SQL命令
	 * @param resultClass
	 *            解析对象的类型
	 * @return
	 */
	public List getBySql(String sql, Class resultClass) {
		EntityManager em = emf.createEntityManager();
		Query query = resultClass == null ? em.createNativeQuery(sql) : em.createNativeQuery(sql, resultClass);
		List t = query.getResultList();
		em.close();
		return t;
	}

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
	public PageList<T> getPageByFilter(String pageIndex, String pageSize, Map map) {
		return getPageBySql(pageIndex, pageSize, getSql(map));
	}

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
	public PageList<T> getPageByFilter(String pageIndex, String pageSize, String where, String orderby) {
		return getPageBySql(pageIndex, pageSize, getSql(where, orderby));
	}

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
	public PageList<T> getPageByFilter(String pageIndex, String pageSize, String where) {
		return getPageBySql(pageIndex, pageSize, getSql(where, null));
	}

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
	public PageList<T> getPageBySql(String pageIndex, String pageSize, String sql) {
		if (sql == null || sql.isEmpty())
			sql = "select * from " + tableName;
		return getPageBySql(pageIndex, pageSize, sql, getGenericClass());
	}

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
	public PageList getPageBySql(String pageIndex, String pageSize, String sql, Class resultClass) {
		PageInfo pi = getPageInfo(pageIndex, pageSize);
		if (pi == null)
			return null;
		EntityManager em = emf.createEntityManager();
		Query query = em.createNativeQuery("select count(*) from (" + sql + ") t");
		pi.setTotalCount(Integer.valueOf(query.getSingleResult().toString()));
		int index = pi.getPageIndex(), size = pi.getPageSize();
		query = em.createNativeQuery(sql, resultClass);
		query.setFirstResult((index - 1) * size);
		query.setMaxResults(size);
		PageList result = new PageList(pi, query.getResultList());
		em.close();
		return result;
	}

	/**
	 * 根据sql获取查询结果条数
	 * 
	 * @param sql
	 *            sql命令
	 * @return 结果条数
	 */
	public int getCountBySql(String sql) {
		EntityManager em = emf.createEntityManager();
		Query query = em.createNativeQuery("select count(*) from (" + sql + ") t");
		int count = Integer.valueOf(query.getSingleResult().toString());
		em.close();
		return count;
	}

	/**
	 * 根据sql获取查询结果条数
	 * 
	 * @param sql
	 *            sql命令
	 * @return 结果条数
	 */
	public int getCountByCondition(String condition) {
		if (condition == null || condition.isEmpty())
			condition = "1=1";
		String sql = "select * from " + tableName + " where " + condition;
		return getCountBySql(sql);
	}

	public List<Object[]> getStatisticsBySql(String sql) {
		EntityManager em = emf.createEntityManager();
		Query query = em.createNativeQuery(sql);
		List<Object[]> t = query.getResultList();
		em.close();
		return t;
	}
	
	
	/**
	 * add luxiaolin
	 * @param sql
	 * @return
	 */
	public String getAttributesBySql(String sql) {
		EntityManager em = emf.createEntityManager();
		Query query = em.createNativeQuery(sql);
		String  mAttributes = null;
		if(null != query.getSingleResult())
			mAttributes  = query.getSingleResult().toString();
		em.close();
		return mAttributes;
		
	}

	/**
	 * 查询数据根据id
	 * 
	 * @param id:主键
	 * @return
	 */
	public T getById(String id) {
		EntityManager em = emf.createEntityManager();
		T t = (T) em.find(getGenericClass(), id);
		em.close();
		return t;
	}

	/**
	 * 往表中新增一条数据
	 * 
	 * @param entity:实体对象
	 * @return 插入成功后的对象ID（主键）
	 */
	@Transactional
	public String add(T entity) {
		getBaseDao();
		T m = baseDao.save(entity);
		return m == null ? null : m.getPrimaryValue();
	}

	/**
	 * 往表中新增多条数据
	 * 
	 * @param entity:实体对象
	 * @return 插入成功后的对象ID（主键）
	 */
	@Transactional
	public String add(List<T> entitys) {
		getBaseDao();
		baseDao.save(entitys);
		return "true";
	}

	/**
	 * 更新表中的一条数据
	 * 
	 * @param entity:实体对象
	 * @return 修改成功后的对象ID（主键）
	 */
	@Transactional
	public String update(T entity) {
		String id = entity.getPrimaryValue();
		if (id == null || getById(id) == null)
			return "参数错误";
		getBaseDao();
		T m = baseDao.save(entity);
		return m == null ? null : m.getPrimaryValue();
	}

	/**
	 * 更新表中的多条数据
	 * 
	 * @param entity:实体对象
	 * @return 修改成功后的对象ID（主键）
	 */
	@Transactional
	public String update(List<T> entitys) {
		if (entitys.size() == 0)
			return "参数错误";
		getBaseDao();
		baseDao.save(entitys);
		return "true";
	}

	/**
	 * 删除表中的一条数据
	 * 
	 * @param entity:实体对象
	 * @return 删除成功后的对象ID（主键）
	 */
	@Transactional
	public String delete(T entity) {
		getBaseDao();
		if (entity.getPrimaryValue() == null || !baseDao.exists(entity.getPrimaryValue()))
			return "参数错误";
		baseDao.delete(entity);
		return entity.getPrimaryValue();
	}

	/**
	 * 删除表中的多条数据
	 * 
	 * @param entitys：实体对象集合
	 * @return 删除成功后的对象ID（主键）
	 */
	@Transactional
	public Result<String> delete(List<T> entitys) {
		getBaseDao();
		if (entitys.size() == 0)
			return new Result(false, "参数错误");
		baseDao.delete(entitys);
		return new Result<String>(true);
	}

	/**
	 * 删除表中的数据通过条件
	 * 
	 * @param condition：条件
	 * @return 执行是否成功
	 */
	@Transactional
	public boolean delete(String condition) {
		if (condition == null || condition.isEmpty())
			return false;
		String sql = "delete from " + tableName + " where " + condition;
		return executeUpdate(sql);
	}

	/**
	 * 删除表中的数据通过条件
	 * 
	 * @param condition：条件
	 * @return 执行是否成功
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	@Transactional
	public boolean deleteById(String id) throws Exception{
		if (id == null || id.isEmpty())
			return false;
		String sql = "delete from " + tableName + " where " + createSimpleObject().getPrimaryKey() + "='" + id + "'";
		return executeUpdate(sql);
	}

	/**
	 * 更新表中的数据通过条件
	 * 
	 * @param sql：更新命令
	 * @return 执行是否成功
	 */
	@Transactional
	public boolean executeUpdate(String sql) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		Query query = em.createNativeQuery(sql);
		int count = query.executeUpdate();
		em.getTransaction().commit();
		em.close();
		return count > 0;
	}

	protected PageRequest getPageable(String index, String size) {
		return getPageable(index, size, null, null);
	}

	protected PageRequest getPageable(String index, String size, String sortField, String direction) {
		try {
			int i = Integer.parseInt(index) - 1;
			int s = Integer.parseInt(size);
			if (i < 0 || s < 1)
				return null;
			if (sortField == null)
				return new PageRequest(i, s);
			else {
				Direction d = (direction != "desc") ? Direction.ASC : Direction.DESC;
				return new PageRequest(i, s, new Sort(d, sortField));
			}
		} catch (NumberFormatException e) {
			logger.error(e.getMessage(),e);
			return null;
		}
	}

	protected PageInfo getPageInfo(String index, String size) {
		try {
			int i = Integer.parseInt(index);
			int s = Integer.parseInt(size);
			return (i < 1 || s < 0) ? null : new PageInfo(i, s);
		} catch (NumberFormatException e) {
			logger.error(e.getMessage(),e);
			return null;
		}
	}

	protected PageInfo getPageInfo(PageRequest p) {
		return new PageInfo(p.getPageNumber() + 1, p.getPageSize());
	}

	protected PageInfo getPageInfo(Page<T> p) {
		return new PageInfo(p.getNumber() + 1, p.getSize(), (int) p.getTotalElements());
	}

	protected String getSql() {
		return "select * from " + tableName;
	}

	protected String getSql(Map map) {
		return getSql(map, tableName);
	}

	protected String getSql(Map map, String tableName) {
		String orderBy = map.containsKey("orderby") ? (String) map.get("orderby") : null;
		String where = map.containsKey("where") ? (String) map.get("where") : "1=1";
		return getSql(where, orderBy, tableName);
	}

	protected String getSql(String where, String orderBy) {
		return getSql(where, orderBy, tableName);
	}

	protected String getSql(String where, String orderBy, String tableName) {
		if (orderBy == null)
			return "select * from " + tableName + " where " + where;
		return "select * from " + tableName + " where " + where + " order by " + orderBy;
	}

	private Class getGenericClass() {
		Type genType = getClass().getGenericSuperclass();
		Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
		return (Class) params[0];
	}

	private T createSimpleObject() throws Exception {
		Class clazz = getGenericClass();
		T t = (T) clazz.newInstance();
		return t;

	}

	public T findOne(String id) {
		getBaseDao();
		return baseDao.findOne(id);
	}
}
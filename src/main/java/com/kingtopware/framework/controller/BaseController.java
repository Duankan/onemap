package com.kingtopware.framework.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.ResultPageList;
import com.kingtopware.framework.entity.BaseEntity;
import com.kingtopware.framework.service.BaseService;

public class BaseController<T extends BaseEntity> {

	public BaseService<T> baseSrv;
	private static Logger logger = Logger.getLogger(BaseController.class);

	public void getBaseSrv() {
	}

	/**
	 * 获取所有的信息
	 */
	@RequestMapping(value = "/getall", method = RequestMethod.GET)
	public ResultList<T> getAll() {
		try {
			getBaseSrv();			
			return new ResultList<T>(baseSrv.get());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<T>(false, "执行失败");
		}
	}

	/**
	 * 通过分页信息获取所有信息
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @return
	 */
	@RequestMapping(value = "/getall/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResultPageList<T> getAll(@PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize) {
		try {
			getBaseSrv();
			return new ResultPageList<T>(baseSrv.get(pageIndex, pageSize));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultPageList<T>(false, "执行失败");
		}
	}

	/**
	 * 通过编号获取信息
	 * 
	 * @param id
	 *            编号
	 * @return
	 */
	@RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
	public Result<T> getById(@PathVariable("id") String id) {
		try {
			getBaseSrv();
			return new Result<T>(baseSrv.findOne(id));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<T>(false, "执行失败");
		}
	}

	/**
	 * 通过条件获取信息（GET）
	 * 
	 * @param where
	 *            查询条件
	 * @return
	 */
	@RequestMapping(value = "/getbyfilter/{where:.+}", method = RequestMethod.GET)
	public ResultList<T> getByFilter(@PathVariable("where") String where) {
		try {
			getBaseSrv();
			return new ResultList<T>(baseSrv.getByFilter(where, null));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<T>(false, "执行失败");
		}
	}

	/**
	 * 通过条件获取信息（POST）
	 * 
	 * @param where
	 *            查询条件
	 * @return
	 */
	@RequestMapping(value = "/getbyfilter", method = RequestMethod.POST)
	public ResultList<T> getByFilterOfPost(@RequestBody String where) {
		try {
			getBaseSrv();
			return new ResultList<T>(baseSrv.getByFilter(where, null));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<T>(false, "执行失败");
		}
	}

	/**
	 * 通过查询条件和分页信息获取信息（GET）
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param where
	 *            查询条件
	 * @return
	 */
	@RequestMapping(value = "/getbyfilter/{pageIndex}/{pageSize}/{where}", method = RequestMethod.GET)
	public ResultPageList<T> getByFilter(@PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize, @PathVariable("where") String where) {
		try {
			getBaseSrv();
			return new ResultPageList<T>(baseSrv.getPageByFilter(pageIndex, pageSize, where, null));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultPageList<T>(false, "执行失败");
		}
	}

	/**
	 * 通过查询条件和分页信息获取信息（POST）
	 * 
	 * @param pageIndex
	 *            页索引
	 * @param pageSize
	 *            页大小
	 * @param where
	 *            查询条件
	 * @return
	 */
	@RequestMapping(value = "/getbyfilter/{pageIndex}/{pageSize}", method = RequestMethod.POST)
	public ResultPageList<T> getByFilterOfPost(@PathVariable("pageIndex") String pageIndex,
			@PathVariable("pageSize") String pageSize, @RequestBody String where) {
		try {
			getBaseSrv();
			return new ResultPageList<T>(baseSrv.getPageByFilter(pageIndex, pageSize, where, null));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultPageList<T>(false, "执行失败");
		}
	}

	/**
	 * 新增单条数据
	 * 
	 * @param entity
	 *            新增的实体
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Result<String> add(@RequestBody T entity) {
		try {
			getBaseSrv();
			return new Result<String>(baseSrv.add(entity));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 新增多条数据
	 * 
	 * @param entity
	 *            新增的实体集合
	 * @return
	 */
	@RequestMapping(value = "/adds", method = RequestMethod.POST)
	public Result<String> adds(@RequestBody List<T> entitys) {
		try {
			getBaseSrv();
			return new Result<String>(baseSrv.add(entitys));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 更新单条数据
	 * 
	 * @param entity
	 *            更新的实体
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Result<String> update(@RequestBody T entity) {
		try {
			getBaseSrv();
			return new Result<String>(baseSrv.update(entity));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 更新多条数据
	 * 
	 * @param entity
	 *            多新的实体
	 * @return
	 */
	@RequestMapping(value = "/updates", method = RequestMethod.POST)
	public Result<String> updates(@RequestBody List<T> entitys) {
		try {
			getBaseSrv();
			return new Result<String>(baseSrv.update(entitys));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 根据编号删除数据
	 * 
	 * @param id
	 *            主键编号
	 * @return
	 */
	@RequestMapping(value = "/deletebyid/{id}", method = RequestMethod.GET)
	public Result<String> deleteByID(@PathVariable("id") String id) {
		try {
			getBaseSrv();
			baseSrv.deleteById(id);
			return new Result<String>();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 删除数据
	 * 
	 * @param entity
	 *            实体对象
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public Result<String> delete(@RequestBody T entity) {
		try {
			getBaseSrv();
			return new Result<String>(baseSrv.delete(entity));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 删除多条数据
	 * 
	 * @param entitys
	 *            实体对象集合
	 * @return
	 */
	@RequestMapping(value = "/deletes", method = RequestMethod.POST)
	public Result<String> deletes(@RequestBody List<T> entitys) {
		try {
			getBaseSrv();
			return baseSrv.delete(entitys);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	/**
	 * 根据条件删除数据
	 * 
	 * @param condition
	 *            删除条件
	 * @return
	 */
	@RequestMapping(value = "/deletebycondition/{condition}", method = RequestMethod.GET)
	public Result<String> deleteByCondition(@PathVariable("condition") String condition) {
		try {
			getBaseSrv();
			return new Result<String>(baseSrv.delete(condition));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
}

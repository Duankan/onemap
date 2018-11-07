
package com.kingtopware.onemap.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.bean.DJFull;
import com.kingtopware.onemap.entity.FwsxEntity;
import com.kingtopware.onemap.service.FwsxService;

@RestController
@RequestMapping(value = "/fwsx")
public class FwsxController extends BaseController<FwsxEntity> {
	@Resource
	public FwsxService srv;
	private static Logger logger = Logger.getLogger(FwsxController.class);
	
	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
	
	/**
	 * 通过条件获取信息（GET）
	 * 
	 * @param where
	 *            查询条件
	 * @return
	 */
	@RequestMapping(value = "/getbyfilterlike/{where:.+}", method = RequestMethod.GET)
	public ResultList<FwsxEntity> getByFilter(@PathVariable("where") String where) {
		try {
			getBaseSrv();
			String [] strArr=where.split("=");
			if(strArr!=null && strArr.length==2){
				where=strArr[0]+" like '"+strArr[1]+"%'";				
				return new ResultList<FwsxEntity>(srv.getByFilterlike(where, null));
			}else
			{
				return new ResultList<FwsxEntity>(false, "执行失败");
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<FwsxEntity>(false, "执行失败");
		}
	}
	
	@RequestMapping(value = "/getdjfull/{where:.+}", method = RequestMethod.GET)
	public ResultList<DJFull> getDJFull(@PathVariable("where") String where) {
		try {
			getBaseSrv();
			return new ResultList<DJFull>(srv.getDJFull(where, null));
	
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<DJFull>(false, "执行失败");
		}
	}
}
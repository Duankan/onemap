package com.kingtopware.onemap.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.http.util.TextUtils;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.AsApEntity;
import com.kingtopware.onemap.service.AsApService;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年10月30日
 * @description：辅助审批控制类
 * =====================================
 */
@RestController
@RequestMapping(value = "/asap")
public class AsApController extends BaseController<AsApEntity> {
	private static Logger logger = Logger.getLogger(AsApController.class);
	@Resource
	public AsApService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	@RequestMapping(value = "/setApprovalInfo", method = RequestMethod.POST)
	public Result<AsApEntity> setApprovalInfo(@RequestBody String map) {
		try {

			List<AsApEntity> resall = new ArrayList<AsApEntity>();
			JSONObject jasonObject = JSONObject.parseObject(map);

			String countyarea = jasonObject.getString("countyarea");

			String flag = jasonObject.getString("flag");

			JSONArray jobj = jasonObject.getJSONArray("dt");
			int count = jobj.size();
			
			List<AsApEntity> mAsApEntity = new ArrayList<AsApEntity>();
			if (null != mAsApEntity ) {
				AsApEntity res = srv.setApprovalInfo("","","","");
				return new Result<AsApEntity>(res);
			}
			
			return new Result<AsApEntity>(false, "执行失败");

		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<AsApEntity>(false, "执行失败");
		}

	}
	
	
	@RequestMapping(value = "/getInfobyid/{guid}", method = RequestMethod.GET)
	public Result<AsApEntity> getInfobyid(@PathVariable("guid") String taskid, HttpServletRequest request) {
		try {

			String guid = taskid;
			if (!TextUtils.isEmpty(guid)) {
				AsApEntity res = srv.getInfobyid(guid);
				return new Result<AsApEntity>(res);
			}
			return new Result<AsApEntity>(false, "执行失败");

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<AsApEntity>(false, "执行失败");
		}

	}
}
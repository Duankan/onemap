
package com.kingtopware.onemap.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.http.util.TextUtils;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ContextLoader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.util.ConsoleUtils;
import com.kingtopware.framework.util.ExcelUtil;
import com.kingtopware.framework.util.PropertyUtil;
import com.kingtopware.onemap.bean.DjfzFull;
import com.kingtopware.onemap.entity.DjfzEntity;
import com.kingtopware.onemap.service.DjfzService;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月11日
 * @description：用地信息接口控制类
 * =====================================
 */
@RestController
@RequestMapping(value = "/djfz")
public class DjfzController extends BaseController<DjfzEntity> {
	private static Logger logger=Logger.getLogger(DjfzController.class);
	@Resource
	public DjfzService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
	
	
	@RequestMapping(value = "/getinfobydjfz", method = RequestMethod.POST)
	public ResultList<DjfzFull> getInfoBydjfz(@RequestBody String photouri) {
		try {

			List<DjfzFull> resall = new ArrayList<DjfzFull>();
			JSONObject jasonObject = JSONObject.parseObject(photouri);

			String countyarea = jasonObject.getString("countyarea");

			String flag = jasonObject.getString("flag");

			JSONArray jobj = jasonObject.getJSONArray("dt");
			int count = jobj.size();

			if (!TextUtils.isEmpty(countyarea)) {

				if (count > 0) {
					if ("byyear".equalsIgnoreCase(flag)) {

						JSONObject jdObject = (JSONObject) jobj.get(0);
						String starttime = jdObject.getString("starttime");
						String endtime = jdObject.getString("endtime");

						if (!(4 == starttime.length()) || !(4 == endtime.length())) {
							return new ResultList<DjfzFull>(false, "时间格式不正确！");
						} else {
							int startflagst = Integer.valueOf(starttime);
							int startflaget = Integer.valueOf(endtime);
							int county = startflaget - startflagst + 1;
							if (county > 0) {
								for (int m = 0; m < county; m++) {
									starttime = String.valueOf(startflagst + m);
									List<DjfzFull> res = srv.getInfoBydjfz(starttime, endtime, countyarea, flag);
									if (null != res)
										resall.addAll(res);
								}
							}

						}
						return new ResultList<DjfzFull>(resall);
					} else {
						for (int i = 0; i < count; i++) {
							JSONObject jdObject = (JSONObject) jobj.get(i);
							String starttime = jdObject.getString("starttime");
							String endtime = jdObject.getString("endtime");
							List<DjfzFull> res = srv.getInfoBydjfz(starttime, endtime, countyarea, flag);
							if (null != res)
								resall.addAll(res);
							ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
						}
						return new ResultList<DjfzFull>(resall);
					}

				} else {
					return new ResultList<DjfzFull>(false, "请选择日期！");
				}

			} else {
				return new ResultList<DjfzFull>(false, "请选择行政区划！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<DjfzFull>(false, "执行失败");
		}
	}
	
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public Result<String> Export(@RequestBody String param) throws Exception{
		try {
			ArrayList<DjfzFull> data = new ArrayList<DjfzFull>();
			
			JSONArray jasonObject  = JSONArray.parseArray(param);
			for (int i=0;i<jasonObject.size();i++){
			DjfzFull DjfzFull = new DjfzFull();
			JSONObject jdObject = (JSONObject) jasonObject.get(i);
			DjfzFull.setEND_TIME(""+(i+1));
			DjfzFull.setSTART_TIME(jdObject.getString("time"));
			DjfzFull.setXZQMC(jdObject.getString("XZQMC"));
			DjfzFull.setmCount(jdObject.getInteger("mCount"));
			DjfzFull.setmZDMJ(jdObject.getDouble("mZDMJ"));
			DjfzFull.setmHbZDMJ(jdObject.getDouble("mHbZDMJ"));
			DjfzFull.setmCrZDMJ(jdObject.getDouble("mCrZDMJ"));
			DjfzFull.setmBCount(jdObject.getInteger("mBCount"));
			DjfzFull.setmBZDMJ(jdObject.getDouble("mBZDMJ"));
			DjfzFull.setmBHbZDMJ(jdObject.getDouble("mBHbZDMJ"));
			DjfzFull.setmBCrZDMJ(jdObject.getDouble("mBCrZDMJ"));
			DjfzFull.setmDCount(jdObject.getInteger("mDCount"));
			DjfzFull.setmDZDMJ(jdObject.getDouble("mDZDMJ"));
			DjfzFull.setmDHbZDMJ(jdObject.getDouble("mDHbZDMJ"));
			DjfzFull.setmDCrZDMJ(jdObject.getDouble("mDCrZDMJ"));
			data.add(DjfzFull);
			}

			String filePath = "temp\\"+UUID.randomUUID().toString()+".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("END_TIME");
			cols.add("START_TIME");
			cols.add("XZQMC");
			cols.add("mCount");
			cols.add("mZDMJ");
			cols.add("mHbZDMJ");
			cols.add("mCrZDMJ");
			cols.add("mBCount");
			cols.add("mBZDMJ");
			cols.add("mBHbZDMJ");
			cols.add("mBCrZDMJ");
			cols.add("mDCount");
			cols.add("mDZDMJ");
			cols.add("mDHbZDMJ");
			cols.add("mDCrZDMJ");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("统计时间",3, 1));
			cols2.add(new ExcelUtil.ColHeader("县市区", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("初始登记(公顷/个)",1, 4));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("变更登记(公顷/个)",1, 4));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("抵押登记(公顷/个)",1, 4));

			// 2 第二行表头
			ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols3);
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("发证数量", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("发证面积", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("其中", 1, 2));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("发证数量", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("发证面积", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("其中", 1, 2));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("发证数量", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("发证面积", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("其中", 1, 2));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));

			// 3 第三行表头
			ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols4);
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("划拨土地", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("出让土地",1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("划拨土地", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("出让土地",1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("划拨土地", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("出让土地",1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false, "执行失败");
		}
	}
}
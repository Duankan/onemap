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
import com.kingtopware.onemap.bean.BcgdFull;
import com.kingtopware.onemap.entity.BcgdEntity;
import com.kingtopware.onemap.service.BcgdService;

@RestController
@RequestMapping(value = "/bcgd")
public class BcgdController extends BaseController<BcgdEntity> {
	private static Logger logger = Logger.getLogger(BcgdController.class);
	@Resource
	public BcgdService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	@RequestMapping(value = "/getinfobybcgd", method = RequestMethod.POST)
	public ResultList<BcgdFull> getInfoBybcgd(@RequestBody String param) {
		try {

			List<BcgdFull> resall = new ArrayList<BcgdFull>();
			JSONObject jasonObject = JSONObject.parseObject(param);

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
							return new ResultList<BcgdFull>(false, "时间格式不正确！");
						} else {
							int startflagst = Integer.valueOf(starttime);
							int startflaget = Integer.valueOf(endtime);
							int county = startflaget - startflagst + 1;
							if (county > 0) {
								for (int m = 0; m < county; m++) {
									starttime = String.valueOf(startflagst + m);
									List<BcgdFull> res = srv.getInfoBybcgd(starttime, endtime, countyarea, flag);
									if (null != res)
										resall.addAll(res);
								}
							}

						}
						return new ResultList<BcgdFull>(resall);
					} else {
						for (int i = 0; i < count; i++) {
							JSONObject jdObject = (JSONObject) jobj.get(i);
							String starttime = jdObject.getString("starttime");
							String endtime = jdObject.getString("endtime");
							List<BcgdFull> res = srv.getInfoBybcgd(starttime, endtime, countyarea, flag);
							if (null != res)
								resall.addAll(res);
							ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
						}
						return new ResultList<BcgdFull>(resall);
					}

				} else {
					return new ResultList<BcgdFull>(false, "请选择日期！");
				}

			} else {
				return new ResultList<BcgdFull>(false, "请选择行政区划！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<BcgdFull>(false, "执行失败");
		}
	}

	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public Result<String> Export(@RequestBody String param) throws Exception {
		try {
			ArrayList<BcgdFull> data = new ArrayList<BcgdFull>();

			JSONArray jasonObject = JSONArray.parseArray(param);
			for (int i = 0; i < jasonObject.size(); i++) {
				BcgdFull BcgdFull = new BcgdFull();
				JSONObject jdObject = (JSONObject) jasonObject.get(i);
				BcgdFull.setEND_TIME("" + (i + 1));
				BcgdFull.setSTART_TIME(jdObject.getString("time"));
				BcgdFull.setXZQMC(jdObject.getString("XZQMC"));
				BcgdFull.setmTzCount(jdObject.getInteger("mTzCount"));
				BcgdFull.setmTzXZGDMJ(jdObject.getDouble("mTzXZGDMJ"));
				BcgdFull.setmTzZJ(jdObject.getDouble("mTzZJ"));
				BcgdFull.setmTfCount(jdObject.getInteger("mTfCount"));
				BcgdFull.setmTfXZGDMJ(jdObject.getDouble("mTfXZGDMJ"));
				BcgdFull.setmTfZJ(jdObject.getDouble("mTfZJ"));
				BcgdFull.setmTkCount(jdObject.getInteger("mTkCount"));
				BcgdFull.setmTkXZGDMJ(jdObject.getDouble("mTkXZGDMJ"));
				BcgdFull.setmTkZJ(jdObject.getDouble("mTkZJ"));
				BcgdFull.setmYBC_MJ(jdObject.getDouble("mYBC_MJ"));
				BcgdFull.setmKBC_MJ(jdObject.getDouble("mKBC_MJ"));
				data.add(BcgdFull);
			}

			String filePath = "temp\\" + "补地统计分析" + UUID.randomUUID().toString() + ".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
					+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("END_TIME");
			cols.add("START_TIME");
			cols.add("XZQMC");
			cols.add("mTzCount");
			cols.add("mTzXZGDMJ");
			cols.add("mTzZJ");
			cols.add("mTfCount");
			cols.add("mTfXZGDMJ");
			cols.add("mTfZJ");
			cols.add("mTkCount");
			cols.add("mTkXZGDMJ");
			cols.add("mTkZJ");
			cols.add("mYBC_MJ");
			cols.add("mKBC_MJ");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("统计时间", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("县市区", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("土地整理(个/公顷/万元)", 1, 3));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("土地复垦(个/公顷/万元)", 1, 3));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("土地开发(个/公顷/万元)", 1, 3));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("已补充面积(公顷)", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("可补充面积(公顷)", 2, 1));

			// 3 第三行表头
			ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols3);
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("项目个数", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("面积", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("投资额", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("项目个数", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("面积", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("投资额", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("项目个数", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("面积", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("投资额", 1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
}
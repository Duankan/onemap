package com.kingtopware.onemap.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
import com.kingtopware.onemap.bean.ZdxxLyxzFull;
import com.kingtopware.onemap.entity.ZdxxEntity;
import com.kingtopware.onemap.service.ZdxxService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月31日
 * @description：征地信息控制请求类
 * =====================================
 */

@RestController
@RequestMapping(value = "/zdxx")
public class ZdxxController extends BaseController<ZdxxEntity> {
	private static Logger logger = Logger.getLogger(ZdxxController.class);
	@Resource
	public ZdxxService srv;
	
	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}
	
	/**
	 * 所选时间统计不同市县区征收面积，以土地利用现状进行分类
	 * @param param
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/getinfobyzdxs_", method = RequestMethod.POST)
	public ResultList<ZdxxLyxzFull> getInfoByzdxs(@RequestBody Map<String, String> param) {
		try {
			String starttime = param.containsKey("starttime") ? param.get("starttime") : "";
			String endtime = param.containsKey("endtime") ? param.get("endtime") : "";
			String countyarea = param.containsKey("countyarea") ? param.get("countyarea") : "";
			String flag = param.containsKey("flag") ? param.get("flag") : "";
			
			if (!TextUtils.isEmpty(countyarea)) {
				if (TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
					return new ResultList<ZdxxLyxzFull>(false, "请选择日期！");
				} else {
					List<ZdxxLyxzFull> res = srv.getInfoByzdxs(starttime, endtime, countyarea, flag);
					return new ResultList<ZdxxLyxzFull>(res);
				}

			} else {
				return new ResultList<ZdxxLyxzFull>(false, "请选择行政区划！");
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<ZdxxLyxzFull>(false, "执行失败");
		}
	}

	/**
	 * 所选季度统计不同市县区征收面积，以土地利用现状进行分类
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/getinfobyzdxs", method = RequestMethod.POST)
	public ResultList<ZdxxLyxzFull> getInfoByzdxj(@RequestBody String photouri) {
		try {

			List<ZdxxLyxzFull> resall = new ArrayList<ZdxxLyxzFull>();
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
							return new ResultList<ZdxxLyxzFull>(false, "时间格式不正确！");
						} else {
							int startflagst = Integer.valueOf(starttime);
							int startflaget = Integer.valueOf(endtime);
							int county = startflaget - startflagst + 1;
							if (county > 0) {
								for (int m = 0; m < county; m++) {
									starttime = String.valueOf(startflagst + m);
									List<ZdxxLyxzFull> res = srv.getInfoByzdxs(starttime, endtime, countyarea, flag);
									if (null != res)
										resall.addAll(res);
								}
							}

						}
						return new ResultList<ZdxxLyxzFull>(resall);
					} else {
						for (int i = 0; i < count; i++) {
							JSONObject jdObject = (JSONObject) jobj.get(i);
							String starttime = jdObject.getString("starttime");
							String endtime = jdObject.getString("endtime");
							List<ZdxxLyxzFull> res = srv.getInfoByzdxs(starttime, endtime, countyarea, flag);
							if (null != res)
								resall.addAll(res);
							ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
						}
						return new ResultList<ZdxxLyxzFull>(resall);
					}

				} else {
					return new ResultList<ZdxxLyxzFull>(false, "请选择日期！");
				}

			} else {
				return new ResultList<ZdxxLyxzFull>(false, "请选择行政区划！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<ZdxxLyxzFull>(false, "执行失败");
		}
	}

	@RequestMapping(value = "/exportone", method = RequestMethod.POST)
	public Result<String> ExportOne(@RequestBody String param) throws Exception {
		try {
			ArrayList<ZdxxLyxzFull> data = new ArrayList<ZdxxLyxzFull>();

			JSONArray jasonObject = JSONArray.parseArray(param);
			for (int i = 0; i < jasonObject.size(); i++) {
				ZdxxLyxzFull ZdxxLyxzFull = new ZdxxLyxzFull();
				JSONObject jdObject = (JSONObject) jasonObject.get(i);
				ZdxxLyxzFull.setEND_TIME("" + (i + 1));
				ZdxxLyxzFull.setSTART_TIME(jdObject.getString("time"));
				ZdxxLyxzFull.setXZQMC(jdObject.getString("XZQMC"));
				ZdxxLyxzFull.setZYTD_ZMJ(jdObject.getDouble("ZYTD_ZMJ"));
				ZdxxLyxzFull.setZS_NYD_GDMJ(jdObject.getDouble("ZS_NYD_GDMJ"));
				ZdxxLyxzFull.setZS_NYD_GDSTMJ(jdObject.getDouble("ZS_NYD_GDSTMJ"));
				ZdxxLyxzFull.setZS_NYD_GDHDMJ(jdObject.getDouble("ZS_NYD_GDHDMJ"));
				ZdxxLyxzFull.setZS_NYD_GDCDMJ(jdObject.getDouble("ZS_NYD_GDCDMJ"));
				ZdxxLyxzFull.setZS_NYD_LDMJ(jdObject.getDouble("ZS_NYD_LDMJ"));
				ZdxxLyxzFull.setZS_NYD_YDMJ(jdObject.getDouble("ZS_NYD_YDMJ"));
				ZdxxLyxzFull.setZS_NYD_MCDMJ(jdObject.getDouble("ZS_NYD_MCDMJ"));
				ZdxxLyxzFull.setZS_NYD_QTMJ(jdObject.getDouble("ZS_NYD_QTMJ"));
				ZdxxLyxzFull.setZS_JSYDMJ(jdObject.getDouble("ZS_JSYDMJ"));
				ZdxxLyxzFull.setZS_WLYDMJ(jdObject.getDouble("ZS_WLYDMJ"));
				data.add(ZdxxLyxzFull);
			}

			String filePath = "temp\\" + "征地统计分析结果" + UUID.randomUUID().toString() + ".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
					+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("END_TIME");
			cols.add("START_TIME");
			cols.add("XZQMC");
			cols.add("ZYTD_ZMJ");
			cols.add("ZS_NYD_GDMJ");
			cols.add("ZS_NYD_GDSTMJ");
			cols.add("ZS_NYD_GDHDMJ");
			cols.add("ZS_NYD_GDCDMJ");
			cols.add("ZS_NYD_LDMJ");
			cols.add("ZS_NYD_YDMJ");
			cols.add("ZS_NYD_MCDMJ");
			cols.add("ZS_NYD_QTMJ");
			cols.add("ZS_JSYDMJ");
			cols.add("ZS_WLYDMJ");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("统计时间", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("县市区", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("征收总面积(公顷)", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("农用地(公顷)", 1, 8));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("建设用地(公顷)", 3, 1));
			cols2.add(new ExcelUtil.ColHeader("未利用地(公顷)", 3, 1));

			// 2 第二行表头
			ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols3);
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("耕地", 1, 4));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("林地", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("园地", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("牧草地", 2, 1));
			cols3.add(new ExcelUtil.ColHeader("其他面积", 2, 1));

			// 3 第三行表头
			ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols4);
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("总面积", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("水田面积", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("旱地面积", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("菜地面积", 1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
}
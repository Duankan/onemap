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
import com.kingtopware.onemap.bean.TdgyFull;
import com.kingtopware.onemap.bean.TdgyGhydFull;
import com.kingtopware.onemap.entity.TdgyEntity;
import com.kingtopware.onemap.service.TdgyService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月5日
 * @description：土地供用接口控制类
 * =====================================
 */
@RestController
@RequestMapping(value = "/tdgy")
public class TdgyController extends BaseController<TdgyEntity> {
	private static Logger logger = Logger.getLogger(TdgyController.class);
	@Resource
	public TdgyService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/getinfobytdgy", method = RequestMethod.POST)
	public ResultList<TdgyFull> getinfobytdgy(@RequestBody String photouri) {
		try {

			List<TdgyFull> resall = new ArrayList<TdgyFull>();
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
							return new ResultList<TdgyFull>(false, "时间格式不正确！");
						} else {
							int startflagst = Integer.valueOf(starttime);
							int startflaget = Integer.valueOf(endtime);
							int county = startflaget - startflagst + 1;
							if (county > 0) {
								for (int m = 0; m < county; m++) {
									starttime = String.valueOf(startflagst + m);
									List<TdgyFull> res = srv.getinfobytdgy(starttime, endtime, countyarea, flag);
									if (null != res)
										resall.addAll(res);
								}
							}

						}
						return new ResultList<TdgyFull>(resall);
					} else {
						for (int i = 0; i < count; i++) {
							JSONObject jdObject = (JSONObject) jobj.get(i);
							String starttime = jdObject.getString("starttime");
							String endtime = jdObject.getString("endtime");
							List<TdgyFull> res = srv.getinfobytdgy(starttime, endtime, countyarea, flag);
							if (null != res)
								resall.addAll(res);
							ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
						}
						return new ResultList<TdgyFull>(resall);
					}

				} else {
					return new ResultList<TdgyFull>(false, "请选择日期！");
				}

			} else {
				return new ResultList<TdgyFull>(false, "请选择行政区划！");
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<TdgyFull>(false, "执行失败");
		}
	}

	@RequestMapping(value = "/getinfobyghyt", method = RequestMethod.POST)
	public ResultList<TdgyGhydFull> getinfobyghyt(@RequestBody String photouri) {
		try {

			List<TdgyGhydFull> resall = new ArrayList<TdgyGhydFull>();
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
							return new ResultList<TdgyGhydFull>(false, "时间格式不正确！");
						} else {
							int startflagst = Integer.valueOf(starttime);
							int startflaget = Integer.valueOf(endtime);
							int county = startflaget - startflagst + 1;
							if (county > 0) {
								for (int m = 0; m < county; m++) {
									starttime = String.valueOf(startflagst + m);
									List<TdgyGhydFull> res = srv.getinfobyghyt(starttime, endtime, countyarea, flag);
									if (null != res)
										resall.addAll(res);
								}
							}

						}
						return new ResultList<TdgyGhydFull>(resall);
					} else {
						for (int i = 0; i < count; i++) {
							JSONObject jdObject = (JSONObject) jobj.get(i);
							String starttime = jdObject.getString("starttime");
							String endtime = jdObject.getString("endtime");
							List<TdgyGhydFull> res = srv.getinfobyghyt(starttime, endtime, countyarea, flag);
							if (null != res)
								resall.addAll(res);
							ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
						}
						return new ResultList<TdgyGhydFull>(resall);
					}

				} else {
					return new ResultList<TdgyGhydFull>(false, "请选择日期！");
				}

			} else {
				return new ResultList<TdgyGhydFull>(false, "请选择行政区划！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<TdgyGhydFull>(false, "执行失败");
		}
	}

	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public Result<String> Export(@RequestBody String param) throws Exception {
		try {
			ArrayList<TdgyGhydFull> data = new ArrayList<TdgyGhydFull>();

			JSONArray jasonObject = JSONArray.parseArray(param);
			for (int i = 0; i < jasonObject.size(); i++) {
				TdgyGhydFull TdgyGhydFull = new TdgyGhydFull();
				JSONObject jdObject = (JSONObject) jasonObject.get(i);
				TdgyGhydFull.setENDTIME("" + (i + 1));
				TdgyGhydFull.setSTARTTIME(jdObject.getString("time"));
				TdgyGhydFull.setXZQMC(jdObject.getString("XZQMC"));
				TdgyGhydFull.setmGyMj(jdObject.getDouble("mGyMj"));
				TdgyGhydFull.setmJianCount(jdObject.getInteger("mJianCount"));
				TdgyGhydFull.setmCrjk(jdObject.getDouble("mCrjk"));
				TdgyGhydFull.setmSf(jdObject.getDouble("mSf"));
				TdgyGhydFull.setmGcc(jdObject.getDouble("mGcc"));
				TdgyGhydFull.setmCk(jdObject.getDouble("mCk"));
				TdgyGhydFull.setmPtzf(jdObject.getDouble("mPtzf"));
				TdgyGhydFull.setmJjsyf(jdObject.getDouble("mJjsyf"));
				TdgyGhydFull.setmLzzf(jdObject.getDouble("mLzzf"));
				TdgyGhydFull.setmGdzz(jdObject.getDouble("mGdzz"));
				TdgyGhydFull.setmQtzz(jdObject.getDouble("mQtzz"));
				TdgyGhydFull.setmGggf(jdObject.getDouble("mGggf"));
				TdgyGhydFull.setmTsyd(jdObject.getDouble("mTsyd"));
				TdgyGhydFull.setmJtys(jdObject.getDouble("mJtys"));
				TdgyGhydFull.setmSySl(jdObject.getDouble("mSySl"));
				TdgyGhydFull.setmQtyd(jdObject.getDouble("mQtyd"));
				data.add(TdgyGhydFull);
			}

			String filePath = "temp\\" + UUID.randomUUID().toString() + ".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
					+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("ENDTIME");
			cols.add("STARTTIME");
			cols.add("XZQMC");
			cols.add("mGyMj");
			cols.add("mJianCount");
			cols.add("mCrjk");
			cols.add("mSf");
			cols.add("mGcc");
			cols.add("mCk");
			cols.add("mPtzf");
			cols.add("mJjsyf");
			cols.add("mLzzf");
			cols.add("mGdzz");
			cols.add("mQtzz");
			cols.add("mGggf");
			cols.add("mTsyd");
			cols.add("mJtys");
			cols.add("mSySl");
			cols.add("mQtyd");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("统计时间", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("县市区", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("供应总面积", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("供应总宗数", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("供应所得总价款", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("商服用地(公顷)", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("工矿仓储用地(公顷)", 1, 2));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("住宅用地(公顷)", 1, 5));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("其他用地(公顷)", 1, 5));

			// 2 第二行表头
			ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols3);
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("工业、仓储用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("采矿用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("普通商品住房用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("经济适用住房", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("廉租住房用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("高档住宅用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("其他住宅用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("公共管理与公共服务用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("特殊用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("交通运输用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("水域及水利设施用地", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("其他用地", 1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}

	@RequestMapping(value = "/exporttwo", method = RequestMethod.POST)
	public Result<String> ExportTwo(@RequestBody String param) throws Exception {
		try {
			ArrayList<TdgyFull> data = new ArrayList<TdgyFull>();

			JSONArray jasonObject = JSONArray.parseArray(param);
			for (int i = 0; i < jasonObject.size(); i++) {
				TdgyFull TdgyFull = new TdgyFull();
				JSONObject jdObject = (JSONObject) jasonObject.get(i);
				TdgyFull.setENDTIME("" + (i + 1));
				TdgyFull.setSTARTTIME(jdObject.getString("time"));
				TdgyFull.setmGhyt(jdObject.getString("mGhyt"));
				TdgyFull.setmJianCount(jdObject.getInteger("mJianCount"));
				TdgyFull.setmGyMj(jdObject.getDouble("mGyMj"));
				TdgyFull.setmChuCount(jdObject.getInteger("mChuCount"));
				TdgyFull.setmChuGyMj(jdObject.getDouble("mChuGyMj"));
				TdgyFull.setmChuCrjk(jdObject.getDouble("mChuCrjk"));
				TdgyFull.setChuJzMj(jdObject.getDouble("ChuJzMj"));
				TdgyFull.setmXyCount(jdObject.getInteger("mXyCount"));
				TdgyFull.setmXyGyMj(jdObject.getDouble("mXyGyMj"));
				TdgyFull.setmXyCrjk(jdObject.getDouble("mXyCrjk"));
				TdgyFull.setnXyJzMj(jdObject.getDouble("nXyJzMj"));
				TdgyFull.setmZpgCount(jdObject.getInteger("mZpgCount"));
				TdgyFull.setmZpgGyMj(jdObject.getDouble("mZpgGyMj"));
				TdgyFull.setmZpgCrjk(jdObject.getDouble("mZpgCrjk"));
				TdgyFull.setnZpgJzMj(jdObject.getDouble("nZpgJzMj"));
				TdgyFull.setmHbCount(jdObject.getInteger("mHbCount"));
				TdgyFull.setmHbGyMj(jdObject.getDouble("mHbGyMj"));
				TdgyFull.setnHbJzMj(jdObject.getDouble("nHbJzMj"));
				data.add(TdgyFull);
			}

			String filePath = "temp\\" + UUID.randomUUID().toString() + ".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
					+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("ENDTIME");
			cols.add("STARTTIME");
			cols.add("mGhyt");
			cols.add("mJianCount");
			cols.add("mGyMj");
			cols.add("mChuCount");
			cols.add("mChuGyMj");
			cols.add("mChuCrjk");
			cols.add("chuJzMj");
			cols.add("mXyCount");
			cols.add("mXyGyMj");
			cols.add("mXyCrjk");
			cols.add("nXyJzMj");
			cols.add("mZpgCount");
			cols.add("mZpgGyMj");
			cols.add("mZpgCrjk");
			cols.add("nZpgJzMj");
			cols.add("mHbCount");
			cols.add("mHbGyMj");
			cols.add("nHbJzMj");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 4, 1));
			cols2.add(new ExcelUtil.ColHeader("统计时间", 4, 1));
			cols2.add(new ExcelUtil.ColHeader("规划用途", 4, 1));
			cols2.add(new ExcelUtil.ColHeader("建设用地供应(公顷/万元)", 1, 17));

			// 2 第二行表头
			ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols3);
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("宗地数", 3, 1));
			cols3.add(new ExcelUtil.ColHeader("供应面积", 3, 1));
			cols3.add(new ExcelUtil.ColHeader("出让", 1, 12));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("", 1, 1));
			cols3.add(new ExcelUtil.ColHeader("划拨", 1, 3));

			// 3 第三行表头
			ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols4);
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("宗地数", 2, 1));
			cols4.add(new ExcelUtil.ColHeader("供应面积", 2, 1));
			cols4.add(new ExcelUtil.ColHeader("成交价款", 2, 1));
			cols4.add(new ExcelUtil.ColHeader("建筑面积", 2, 1));
			cols4.add(new ExcelUtil.ColHeader("协议出让", 1, 4));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("招标、拍卖、挂牌、出让", 1, 4));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("", 1, 1));
			cols4.add(new ExcelUtil.ColHeader("宗地数", 2, 1));
			cols4.add(new ExcelUtil.ColHeader("供应面积", 2, 1));
			cols4.add(new ExcelUtil.ColHeader("建筑面积", 2, 1));

			// 4 第四行表头
			ArrayList<ExcelUtil.ColHeader> cols5 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols5);
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("宗地数", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("供应面积", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("成交价款", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("建筑面积", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("宗地数", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("供应面积", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("成交价款", 1, 1));
			cols5.add(new ExcelUtil.ColHeader("建筑面积", 1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
}
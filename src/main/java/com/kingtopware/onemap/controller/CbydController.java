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
import com.kingtopware.framework.util.ExcelUtil;
import com.kingtopware.onemap.bean.CbydFull;
import com.kingtopware.onemap.bean.CbydListFull;
import com.kingtopware.onemap.bean.Cbydexport;
import com.kingtopware.onemap.entity.CbydEntity;
import com.kingtopware.onemap.service.CbydService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月2日
 * @description：储备用地接口控制类
 * =====================================
 */

@RestController
@RequestMapping(value = "/cbyd")
public class CbydController extends BaseController<CbydEntity> {
	private static Logger logger = Logger.getLogger(CbydController.class);
	@Resource
	public CbydService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 时空维度的储备土地审批统计
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/getinfobyxkwd", method = RequestMethod.POST)
	public ResultList<CbydListFull> getInfoByzdxs(
			@RequestBody Map<String, String> param) {
		try {

			String starttime = param.containsKey("starttime") ? param
					.get("starttime") : "";
			String endtime = param.containsKey("endtime") ? param
					.get("endtime") : "";

			if (!(4 == starttime.length()) || !(4 == endtime.length())) {
				return new ResultList<CbydListFull>(false, "时间格式不正确！");
			} else {
				int startflagst = Integer.valueOf(starttime);
				int startflaget = Integer.valueOf(endtime);
				int county = startflaget - startflagst + 1;
				if (county > 0) {
					String text = "";
					for (int m = 0; m < county; m++) {
						starttime = String.valueOf(startflagst + m);
						if (m == (county - 1)) {
							text = text + "" + starttime;
						} else {
							text = text + "" + starttime + ",";
						}

					}
					if (!TextUtils.isEmpty(text)) {
						List<CbydListFull> res = srv.getinfobyxkwd(text);
						return new ResultList<CbydListFull>(res);

					} else {
						return new ResultList<CbydListFull>(false, "请选择年份！");
					}
				}
				else
				{
					return new ResultList<CbydListFull>(false, "请选择年份！");
				}
			}

		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<CbydListFull>(false, "执行失败");
		}
	}

	/**
	 * 时空维度的储备土地审批统计
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "/getinfobyxzq", method = RequestMethod.POST)
	public ResultList<CbydFull> getinfobyxzq(
			@RequestBody Map<String, String> param) {
		try {

			String starttime = param.containsKey("starttime") ? param
					.get("starttime") : "";
			String endtime = param.containsKey("endtime") ? param
					.get("endtime") : "";

			if (TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				return new ResultList<CbydFull>(false, "请选择日期！");
			} else {
				List<CbydFull> res = srv.getinfobyxzq(starttime, endtime);
				return new ResultList<CbydFull>(res);
			}

		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<CbydFull>(false, "执行失败");
		}
	}
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public Result<String> Export(@RequestBody String param) throws Exception{
		try {
			ArrayList<CbydFull> data = new ArrayList<CbydFull>();
			
			JSONArray jasonObject  = JSONArray.parseArray(param);
			for (int i=0;i<jasonObject.size();i++){
			CbydFull ZdxxLyxzFull = new CbydFull();
			JSONObject jdObject = (JSONObject) jasonObject.get(i);
			ZdxxLyxzFull.setENDTIME(""+(i+1));
			ZdxxLyxzFull.setSTARTTIME(jdObject.getString("time"));
			ZdxxLyxzFull.setXZQMC(jdObject.getString("XZQMC"));
			ZdxxLyxzFull.setCount(jdObject.getInteger("count"));
			ZdxxLyxzFull.setZDMJ(jdObject.getDouble("ZDMJ"));
			ZdxxLyxzFull.setTDQDCB(jdObject.getDouble("TDQDCB"));
			data.add(ZdxxLyxzFull);
			}

			String filePath = "temp\\"+"储地统计分析(空间分布)"+UUID.randomUUID().toString()+".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("ENDTIME");
			cols.add("STARTTIME");
			cols.add("XZQMC");
			cols.add("count");
			cols.add("ZDMJ");
			cols.add("TDQDCB");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("统计时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("县市区", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("宗数(个)", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("宗地面积(公顷)", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("土地取得成本(万元)", 1, 1));

			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败!");
		}
	}
	@RequestMapping(value = "/exporttwo", method = RequestMethod.POST)
	public Result<String> ExportTwo(@RequestBody String param) throws Exception{
		try {
			ArrayList<Cbydexport> data = new ArrayList<Cbydexport>();
			
			JSONObject jasonObject  = JSONObject.parseObject(param);
			String result = jasonObject.getString("result");
			String titles = jasonObject.getString("titles");
			JSONArray results=JSONArray.parseArray(result);
			JSONArray title=JSONArray.parseArray(titles);
			for (int i=0;i<results.size();i++){
			Cbydexport CbydListFull = new Cbydexport();
			JSONObject jdObject = (JSONObject) results.get(i);
			CbydListFull.setSort((i+1));
			CbydListFull.setNF(jdObject.getDouble("time"));
			if(title.size()>=1){
				CbydListFull.setCount0(jdObject.getInteger("count0"));
				CbydListFull.setZDMJ0(jdObject.getDouble("ZDMJ0"));
				CbydListFull.setTDQDCB0(jdObject.getDouble("TDQDCB0"));
			}
			if(title.size()>=2){
				CbydListFull.setCount1(jdObject.getInteger("count1"));
				CbydListFull.setZDMJ1(jdObject.getDouble("ZDMJ1"));
				CbydListFull.setTDQDCB1(jdObject.getDouble("TDQDCB1"));
			}
			if(title.size()>=3){
				CbydListFull.setCount2(jdObject.getInteger("count2"));
				CbydListFull.setZDMJ2(jdObject.getDouble("ZDMJ2"));
				CbydListFull.setTDQDCB2(jdObject.getDouble("TDQDCB2"));
			}
			if(title.size()>=4){
				CbydListFull.setCount3(jdObject.getInteger("count3"));
				CbydListFull.setZDMJ3(jdObject.getDouble("ZDMJ3"));
				CbydListFull.setTDQDCB3(jdObject.getDouble("TDQDCB3"));
			}
			if(title.size()>=5){
				CbydListFull.setCount4(jdObject.getInteger("count4"));
				CbydListFull.setZDMJ4(jdObject.getDouble("ZDMJ4"));
				CbydListFull.setTDQDCB4(jdObject.getDouble("TDQDCB4"));
			}
			if(title.size()>=6){
				CbydListFull.setCount5(jdObject.getInteger("count5"));
				CbydListFull.setZDMJ5(jdObject.getDouble("ZDMJ5"));
				CbydListFull.setTDQDCB5(jdObject.getDouble("TDQDCB5"));
			}
			if(title.size()>=7){
				CbydListFull.setCount6(jdObject.getInteger("count6"));
				CbydListFull.setZDMJ6(jdObject.getDouble("ZDMJ6"));
				CbydListFull.setTDQDCB6(jdObject.getDouble("TDQDCB6"));
			}
			if(title.size()>=8){
				CbydListFull.setCount7(jdObject.getInteger("count7"));
				CbydListFull.setZDMJ7(jdObject.getDouble("ZDMJ7"));
				CbydListFull.setTDQDCB7(jdObject.getDouble("TDQDCB7"));
			}
			if(title.size()>=9){
				CbydListFull.setCount8(jdObject.getInteger("count8"));
				CbydListFull.setZDMJ8(jdObject.getDouble("ZDMJ8"));
				CbydListFull.setTDQDCB8(jdObject.getDouble("TDQDCB8"));
			}
			data.add(CbydListFull);
			}

			String filePath = "temp\\"+"储地统计分析(时空分布)"+UUID.randomUUID().toString()+".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("sort");
			cols.add("NF");
			for(int i=0;i<title.size();i++){
				String count="count"+i;
				String ZDMJ="ZDMJ"+i;
				String TDQDCB="TDQDCB"+i;
				cols.add(count);
				cols.add(ZDMJ);
				cols.add(TDQDCB);
				
			}
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 2, 1));
			cols2.add(new ExcelUtil.ColHeader("年份", 2, 1));
			for(int i=0;i<title.size();i++){
				cols2.add(new ExcelUtil.ColHeader(title.get(i).toString(), 1, 3));
				cols2.add(new ExcelUtil.ColHeader("", 1, 1));
				cols2.add(new ExcelUtil.ColHeader("", 1, 1));
			}
			// 2 第二行表头
				ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
				col1.add(cols3);
				cols3.add(new ExcelUtil.ColHeader("", 1, 1));
				cols3.add(new ExcelUtil.ColHeader("", 1, 1));
				for(int i=0;i<title.size();i++){
				cols3.add(new ExcelUtil.ColHeader("宗数(个)", 1, 1));
				cols3.add(new ExcelUtil.ColHeader("面积(公顷)", 1, 1));
				cols3.add(new ExcelUtil.ColHeader("取得成本(万元)", 1, 1));
				}
			
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败!");
		}
	}
}
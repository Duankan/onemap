package com.kingtopware.onemap.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

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
import com.kingtopware.onemap.bean.DyaqFull;
import com.kingtopware.onemap.entity.DyEntity;
import com.kingtopware.onemap.entity.DyaqEntity;
import com.kingtopware.onemap.service.DyaqService;
@RestController
@RequestMapping(value="/dyaq")
public class DyaqController extends BaseController<DyEntity> {
	private static Logger logger = Logger.getLogger(DyaqController.class);
	@Resource
	public DyaqService srv;
	
	@Override
	public void getBaseSrv() {
		if(baseSrv == null) {
			baseSrv = srv;
		}
	}
	
	@RequestMapping(value = "/getInfoByTimes", method = RequestMethod.POST)
	public ResultList<DyaqFull> getInfoByTimes(@RequestBody String param) {
		try {
			JSONObject jsonObject = JSONObject.parseObject(param);
			System.out.println(jsonObject.toString());
			String starttime = jsonObject.getString("starttime");
			String endtime = jsonObject.getString("endtime");
			String djjg = jsonObject.getString("djjg");
			List<DyaqFull> infoByTime = new ArrayList<DyaqFull>();
			if(null == djjg || "".equals(djjg)) {
				infoByTime = srv.getInfoByTime(starttime, endtime);
			}else {
				infoByTime = srv.getInfoByTime(starttime, endtime, djjg);
			}
			return new ResultList<DyaqFull>(infoByTime);
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<DyaqFull>(false, "执行失败");
		}
	}
	
	@RequestMapping(value = "/exportone", method = RequestMethod.POST)
	public Result<String> ExportOne(@RequestBody String param) throws Exception {
		try {
			ArrayList<DyaqFull> data = new ArrayList<DyaqFull>();
			
			JSONArray jasonObject = JSONArray.parseArray(param);
			for(int i = 0; i < jasonObject.size(); i++) {
				DyaqFull DyaqFull = new DyaqFull();
				JSONObject jdObject = (JSONObject) jasonObject.get(i);
				DyaqFull.setXH(i+1);
				DyaqFull.setBDCDYH(jdObject.getString("bdcdyh"));
				DyaqFull.setDYMJ(jdObject.getDouble("dymj"));
				DyaqFull.setDYFS(jdObject.getString("dyfs").trim());
				DyaqFull.setDyqr(jdObject.getString("dyqr").trim());
				DyaqFull.setDyr(jdObject.getString("dyr").trim());
				DyaqFull.setDJSJ(jdObject.getString("djsj"));
				DyaqFull.setZQSE(jdObject.getString("zqse")+"");
				DyaqFull.setZWLXQSSJ(jdObject.getString("zwlxqssj"));
				DyaqFull.setZWLXJSSJ(jdObject.getString("zwlxjssj"));
				DyaqFull.setZwr(jdObject.getString("zwr").trim());
				data.add(DyaqFull);
			}
			String filePath = "temp\\" + "抵押权属分析结果" + UUID.randomUUID().toString() + ".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
					+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("XH");
			cols.add("BDCDYH");
			cols.add("DYMJ");
			cols.add("DYFS");
			cols.add("dyqr");
			cols.add("dyr");
			cols.add("DJSJ");
			cols.add("ZQSE");
			cols.add("ZWLXQSSJ");
			cols.add("ZWLXJSSJ");
			cols.add("zwr");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("不动产单元号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("抵押面积(m2)", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("抵押方式", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("抵押权人", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("抵押人", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("登记时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("债权数额", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("债务履行起始时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("债务履行结束时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("债务人", 1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		}catch(Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

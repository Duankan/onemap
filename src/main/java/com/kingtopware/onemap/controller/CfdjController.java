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
import com.kingtopware.onemap.bean.CfdjFull;
import com.kingtopware.onemap.entity.CfEntity;
import com.kingtopware.onemap.entity.CfdjEntity;
import com.kingtopware.onemap.service.CfdjService;

@RestController
@RequestMapping(value = "/cfdj")
public class CfdjController extends BaseController<CfEntity> {
	private static Logger logger = Logger.getLogger(CfdjEntity.class);

	@Resource
	public CfdjService srv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null) {
			baseSrv = srv;
		}
	}
	/**
	 * 通过时间信息进行查询
	 * @param param
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/getInfoByCfdj", method = RequestMethod.POST)
	public ResultList<CfdjFull> getInfoByCfdj(@RequestBody String param) {
		try {
			JSONObject jasonObject = JSONObject.parseObject(param);
			String starttime = jasonObject.getString("starttime");
			String endtime = jasonObject.getString("endtime");
			String cfjg = jasonObject.getString("cfjg");
			List<CfdjFull> res = new ArrayList<CfdjFull>();
			if(null == cfjg || "".equals(cfjg)) {
				res = srv.getInfoByDjsx(starttime, endtime);
			}else {
				res = srv.getInfoByDjsx(starttime, endtime, cfjg);
			}
			return new ResultList<CfdjFull>(res);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ResultList<CfdjFull>(false, "执行失败");
		}
	}
	
	/**
	 * 查询结果导出到excel
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/exportone", method = RequestMethod.POST)
	public Result<String> ExportOne(@RequestBody String param) throws Exception{
		try{
			ArrayList<CfdjFull> data = new ArrayList<CfdjFull>();
			
			JSONArray jasonObject = JSONArray.parseArray(param);
			for(int i = 0; i < jasonObject.size(); i++) {
				CfdjFull cfdjFull = new CfdjFull();
				JSONObject jdObject = (JSONObject) jasonObject.get(i);
				cfdjFull.setXH(i+1);
				cfdjFull.setZxswh((jdObject.getString("zxswh")+"").trim());
				cfdjFull.setCFQSSJ(jdObject.getString("cfqssj"));
				cfdjFull.setCFJSSJ(jdObject.getString("cfjssj"));
				cfdjFull.setBDCDYH(jdObject.getString("bdcdyh"));
				cfdjFull.setCFJG((jdObject.getString("cfjg")+"").trim());
				cfdjFull.setDJSJ(jdObject.getString("djsj"));
				cfdjFull.setSharenum((jdObject.getString("sharenum")+"").trim());
				cfdjFull.setProposer((jdObject.getString("proposer")+"").trim());
				cfdjFull.setBproposer((jdObject.getString("bproposer")+"").trim());
				cfdjFull.setCflx(jdObject.getString("cflx"));
				data.add(cfdjFull);
			}
			String filePath = "temp\\" + "查封登记分析结果" + UUID.randomUUID().toString() + ".xls";
			String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
					+ filePath;
			ArrayList<String> cols = new ArrayList<String>();
			cols.add("XH");
			cols.add("zxswh");
			cols.add("CFQSSJ");
			cols.add("CFJSSJ");
			cols.add("BDCDYH");
			cols.add("CFJG");
			cols.add("DJSJ");
			cols.add("sharenum");
			cols.add("proposer");
			cols.add("bproposer");
			cols.add("cflx");
			ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
			// 1 第一行表头
			ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
			col1.add(cols2);
			cols2.add(new ExcelUtil.ColHeader("序号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("执行书文号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("查封起始时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("查封结束时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("不动产单元号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("查封机构", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("登记时间", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("房屋所有权证号", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("申请人", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("被申请人", 1, 1));
			cols2.add(new ExcelUtil.ColHeader("查封类型", 1, 1));
			ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
			return new Result<String>(filePath);
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<String>(false, "执行失败");
		}
	}
}

package com.kingtopware.onemap.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.http.util.TextUtils;
import org.apache.log4j.Logger;
import org.geotools.feature.FeatureCollection;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kingtopware.framework.bean.LifeCycleInfo;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.framework.service.PostGISService;
import com.kingtopware.framework.util.JSONOutputFormat;
import com.kingtopware.framework.util.TempleExcelUtil;
import com.kingtopware.onemap.entity.BcgdEntity;
import com.kingtopware.onemap.service.LayerService;

@SuppressWarnings("rawtypes")
@RestController
@RequestMapping(value = "/layer")
public class LayerController extends BaseController<BcgdEntity> {
	private static Logger logger = Logger.getLogger(LayerController.class);
	@Resource
	LayerService srv;
	// LayerServiceImpl srv;
	@Resource
	PostGISService postgissrv;

	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;
	}

	/**
	 * 导出图层数据
	 * 
	 * @param response
	 * @param request
	 * @param fileds
	 *            导出字段的字符串
	 * @param wfsurl
	 *            wfs地址
	 * @throws Throwable
	 * @throws ClientProtocolException
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public void Export(HttpServletResponse response, HttpServletRequest request, String fileds,
			@RequestParam(value = "wfsurl", required = true) String wfsurl,
			@RequestParam(value = "tablename") String tablename) {
		try {
			int columnNum = 0;// 列数初始化
			List<JSONObject> fieldsArray = (List<JSONObject>) JSON.parse(fileds);
			List<String> columnName = new ArrayList<String>();
			List<String> fieldColumn = new ArrayList<String>();
			for (JSONObject object : fieldsArray) {
				Set<Entry<String, Object>> entries = object.entrySet();
				Iterator iter = entries.iterator();
				while (iter.hasNext()) {
					Map.Entry entry = (Map.Entry) iter.next();
					if (entry.getKey().toString().equals("Name")) {
						fieldColumn.add(entry.getValue().toString());
					} else if (entry.getKey().toString().equals("ByName")) {
						columnName.add(entry.getValue().toString());
					}
				}
			}

			List<Object[]> list = new ArrayList<Object[]>();
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpget = new HttpGet(wfsurl);
			CloseableHttpResponse res = httpClient.execute(httpget);
			HttpEntity httpEntity = res.getEntity();
			String strResult = EntityUtils.toString(httpEntity);
			Object tmp = JSON.parse(strResult);
			List<JSONObject> jsonres = (List<JSONObject>) ((JSONObject) tmp).get("features");
			for (int i = 0; i < jsonres.size(); i++) {
				JSONObject json = jsonres.get(i).getJSONObject("properties");
				Object[] objarray = new Object[fieldColumn.size()];
				for (int j = 0; j < fieldColumn.size(); j++) {
					objarray[j] = json.get(fieldColumn.get(j));
				}

				list.add(objarray);
			}

			try {
				columnNum = columnName.size();
				StringBuilder sb = new StringBuilder();
				for (int i = 0; i < columnNum; i++) {
					sb.append("\"" + fieldColumn.get(i) + "\"");// 拼接.
					if (i != columnNum - 1) {// 前面的元素后面全拼上",",最后一个元素后不拼
						sb.append(",");
					}
				}
				TempleExcelUtil te = new TempleExcelUtil();
				te.createExcel(list, response, request, null, columnNum, columnName, 0, tablename);
				response.getOutputStream().close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			response.getOutputStream().close();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 提取上传文件的点坐标
	 * @param files
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/fetchcoor", method = RequestMethod.POST)
	public String FetchCoor(@RequestParam(value = "coorfile") MultipartFile[] files, HttpServletResponse response) {
		response.setHeader("Content-Type", "text/html;charset=utf-8");
		if (files == null || files.length == 0)
			return JSON.toJSONString(new Result<String>(false, "未发现上传的文件"));
		String res = "";
		try {
			byte[] bs = files[0].getBytes();
			String str = new String(bs, Charset.forName("gbk"));
			String[] lines = str.split("\r\n");

			boolean b = true;
			for (int i = 0; i < lines.length; i++) {
				if (b) {
					if (lines[i].trim() != "") {
						res += "#" + lines[i];
					}
				} else {
					if (lines[i].trim().endsWith("@")) {
						b = true;
					}
				}
			}
			if (res.length() > 0) {
				res = res.substring(1);
			}

		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return JSON.toJSONString(new Result<String>(false,"提取坐标出错,请检查坐标格式!"));
		}
		return JSON.toJSONString(new Result<String>(res));
	}

	/**
	 * 新增要素
	 * 
	 * @return：新增成功或失败状态
	 */
	@RequestMapping(value = "/insertfeature/{layername}", method = RequestMethod.POST)
	public Result<Boolean> ImportFeature(@PathVariable("layername") String layername, @RequestBody JSONObject feature) {
		try {
			postgissrv.conn();
			SimpleFeature sfeature = postgissrv.geojsontofeature(feature);
			postgissrv.InsertFeature(layername, sfeature);
			return new Result<Boolean>(true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false);
		}
	}

	/**
	 * 新增要素集
	 * 
	 * @return：新增成功或失败状态
	 */
	@RequestMapping(value = "/insertfeatures/{layername}", method = RequestMethod.POST)
	public Result<Boolean> InsertFeatures(@PathVariable("layername") String layername,
			@RequestBody JSONObject features) {
		try {
			postgissrv.conn();
			FeatureCollection featurecollection = postgissrv.geojsontofeaturecollection(features);
			postgissrv.InsertFeatures(layername, featurecollection);
			return new Result<Boolean>(true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false);
		}
	}

	/**
	 * 根据CQL删除要素
	 * 
	 * @return：删除成功或失败状态
	 */
	@RequestMapping(value = "/deletebycql/{layername}", method = RequestMethod.POST)
	public Result<Boolean> deletebycql(@PathVariable("layername") String layername, @RequestBody String cql) {
		try {
			postgissrv.conn();
			postgissrv.DeleteByCQL(layername, cql);
			return new Result<Boolean>(true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false);
		}
	}

	/**
	 * 修改要素
	 * 
	 * @return：修改成功或失败状态
	 */
	@RequestMapping(value = "/updatefeature/{layername}", method = RequestMethod.POST)
	public Result<Boolean> UpdateFeature(@PathVariable("layername") String layername, @RequestBody JSONObject feature) {
		try {
			postgissrv.conn();
			SimpleFeature sfeature = postgissrv.geojsontofeature(feature);
			postgissrv.UpdataFeature(layername, sfeature);
			return new Result<Boolean>(true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<Boolean>(false);
		}
	}

	/**
	 * 根据CQL查询要素
	 * 
	 * @return：查询结果
	 */
	@RequestMapping(value = "/searchbycql/{layername}/{size}", method = RequestMethod.POST)
	public byte[] SearchByCQL(@PathVariable("layername") String layername, @PathVariable("size") int size,
			@RequestBody String cql) {
		try {

			postgissrv.conn();
			FeatureCollection featurecollection = postgissrv.SeacrchByCQL(layername, cql);
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				new JSONOutputFormat().write(featurecollection, out, size);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return out.toByteArray();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ByteArrayOutputStream().toByteArray();
		}
	}

	/**
	 * 
	 * @author： luxiaolin
	 *  @param layername
	 *  @param size
	 *  @param cql
	 * @description：根据获取生命周期数据
	 */
	@RequestMapping(value = "/lifecycel/{type}/{guid}", method = RequestMethod.GET)
	public Result<LifeCycleInfo> getLifeCycle(@PathVariable("type") String type, @PathVariable("guid") String guid) {
		try {
			if ((!TextUtils.isEmpty(type)) && (!TextUtils.isEmpty(guid))) {
				return new Result<LifeCycleInfo>(srv.getLifeCycle(type, guid));
			} else {
				return new Result<LifeCycleInfo>(false, "参数不正确！");
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new Result<LifeCycleInfo>(false, "执行失败");
		}
	}

}

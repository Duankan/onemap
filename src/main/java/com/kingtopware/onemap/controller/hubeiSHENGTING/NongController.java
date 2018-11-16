package com.kingtopware.onemap.controller.hubeiSHENGTING;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.bean.XzqTudi;
import com.kingtopware.framework.util.ExcelUtil;
import com.kingtopware.framework.util.HttpUtils;
import com.kingtopware.framework.util.RedisUtil;
import com.kingtopware.onemap.bean.Datagrid;
import com.kingtopware.onemap.biz.hubeiSHENGTING.NongBiz;
import org.apache.commons.lang.StringUtils;
import org.nlpcn.commons.lang.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ContextLoader;

import java.util.*;

/**
 * @author dankin
 * 农的后端控制器
 */
@RestController
@RequestMapping(value = "/Nong")
public class NongController {
    @Autowired
    public RedisUtil redisUtil;
    @Autowired
    public NongBiz nongBiz;
    /**
     * 根据行政区（武汉市的县区）统计各县区的土地使用情
     * @param
     * @return
     */
    @RequestMapping(value = "/getLandUseStatus", method = RequestMethod.POST)
    public ResultList<XzqTudi> getLandUseStatus(@RequestBody String map) {
        ResultList<XzqTudi> rs = new ResultList<XzqTudi>();
        List<XzqTudi> l = new ArrayList<XzqTudi>();
        String key = "getLandUseStatus_" + map;
        if (redisUtil.exists(key)) {
            rs.setData((List<XzqTudi>) redisUtil.get(key));
            return rs;
        }
        HttpUtils httpUtils = new HttpUtils();
        JSONObject jasonObject = JSONObject.parseObject(map);
        String url = jasonObject.getString("url") + "?" + "request=aggregate&service=wps";
        jasonObject.remove("url");
        //设置请求头和请求参数
        List<Map<String, Object>> li = HttpUtils.addHeadAndParam("application/x-www-form-urlencoded", jasonObject.toJSONString());
        String re = httpUtils.doPost(url, li.get(1), li.get(0));
        if (!StringUtil.isBlank(re)) {
            JSONArray objects = JSON.parseArray(re);
            for (int i = 0; i < objects.size(); i++) {
                XzqTudi xzqTudi = new XzqTudi();
                xzqTudi.setName(objects.getJSONObject(i).getString("行政区"));
                xzqTudi.setSum(Double.valueOf(objects.getJSONObject(i).getString("SUM_TBMJ"))*0.0001);
                l.add(xzqTudi);
            }
            redisUtil.set(key, l);
        }
        rs.setData(l);
        return rs;
    }
    /**
     * 统计各行政区土地类别表格
     * @param map
     * @return
     * @throws Exception
     */
    @RequestMapping("/staticsBiaoge")
    public Map<String, Object> staticsBiao(@RequestBody String map) throws Exception {
        String key = "staticsBiao_" + map;
        HashMap<String, Object> resultmap = new HashMap<String, Object>();
        List<Datagrid> listDTOs = new ArrayList<Datagrid>();
        if (redisUtil.exists(key)) {
            listDTOs = (List<Datagrid>) redisUtil.get(key);
            resultmap.put("rows", listDTOs);
            return resultmap;
        }
        HttpUtils httpUtils = new HttpUtils();
        JSONObject jasonObject = JSONObject.parseObject(map);
        String url = jasonObject.getString("url") + "?" + "request=aggregate&service=wps";
        String cqlField = jasonObject.getString("cqlField");
        JSONArray cqlConditionArray = (JSONArray) jasonObject.get("cqlCondition");
        List<String> listRES = new ArrayList<String>();//放不同地类的所有请求数据
        for (int i = 0; i < cqlConditionArray.size(); i++) {
            String cqlFilter = cqlField + " like " + "'" + cqlConditionArray.get(i) + "%'";
            jasonObject.put("filter", cqlFilter);
            //设置请求头和请求参数
            List<Map<String, Object>> l = HttpUtils.addHeadAndParam("application/x-www-form-urlencoded", jasonObject.toJSONString());
            String re = httpUtils.doPost(url, l.get(1), l.get(0));
            if (!StringUtils.isEmpty(re)) {
                listRES.add(re);
            }
        }
        //初始化一个容器盛放所有的rows
        if (listRES.size() != 0) {
            JSONArray count = JSONArray.parseArray(listRES.get(2));//取得行政区的个数
            for (int i = 0; i < count.size(); i++) {
                Datagrid datagrid = new Datagrid();
                listDTOs.add(datagrid);
            }
            listDTOs = nongBiz.fillBiaoGeData(listRES, listDTOs);
            redisUtil.set(key, listDTOs);
        }
        resultmap.put("rows", listDTOs);
        return resultmap;
    }
    /**
     * 统计不稳新增
     * @param map
     * @return
     */
    @RequestMapping("/statisticBWXZCharts")
    public Map<String, Object> statisticBWXZCharts(@RequestBody String map) {
        String key = "statisticBWXZCharts_" + map;
        Map<String, Object> resultMap =null;
        if (redisUtil.exists(key)) {
            return (Map<String, Object>) redisUtil.get(key);
        }
        HttpUtils httpUtils = new HttpUtils();
        JSONObject jasonObject = JSONObject.parseObject(map);
        JSONObject jasonObject2 = JSONObject.parseObject(map);
        String url = jasonObject.getString("url") + "?" + "request=aggregate&service=wps";
        String groupField1 = StringUtils.substringBefore(jasonObject.getString("groupFields"), ",");//dlmc
        String groupField2 = StringUtils.substringAfter(jasonObject.getString("groupFields"), ",");//xzqmc
        jasonObject2.put("groupFields",groupField1);
        //设置请求头和请求参数
        List<Map<String, Object>> l = HttpUtils.addHeadAndParam("application/x-www-form-urlencoded", jasonObject.toJSONString());
        List<Map<String, Object>> l2 = HttpUtils.addHeadAndParam("application/x-www-form-urlencoded", jasonObject2.toJSONString());
        String re = httpUtils.doPost(url, l.get(1), l.get(0));
        String re2=httpUtils.doPost(url,l2.get(1),l2.get(0));
        resultMap=nongBiz.statisticBWXZ(re,re2,groupField1,groupField2);
        if(resultMap!=null){
            resultMap.put("code",1);
            resultMap.put("msg","成功");
        }
        else {
            resultMap.put("code",-1);
            resultMap.put("msg","失败");
        }
        redisUtil.set(key, resultMap);
        return resultMap;
    }

    /**
     * 导出excel表格
     * @param param
     * @return
     */
    @RequestMapping("/export")
    public Result<String> exportExcel(@RequestBody String param){
        try{
            ArrayList<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
            JSONObject jsonObject=JSONObject.parseObject(param);
            JSONArray array= (JSONArray) jsonObject.get("data");
            //遍历各行政区的数据
            for (int i = 0; i < array.size(); i++) {
                Map<String,Object> map=new HashMap<String, Object>();
                JSONObject object = (JSONObject) array.get(i);
                Set<String> set=object.keySet();
                Iterator<String> it=set.iterator();
                //把每个行政区的数据放进一个map
                while (it.hasNext()){
                    String key=it.next();
                    String value=object.getString(key);
                    map.put(key,value);
                }
                data.add(map);
            }
            //定义文件路径与名称
            String filePath = "temp\\" + "综合分析（分类统计）" + UUID.randomUUID().toString() + ".xls";
            String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
                    + filePath;
            //表对应字段
            ArrayList<String> cols = new ArrayList<String>();
            JSONArray colsArray= (JSONArray) jsonObject.get("cols");
            //添加表头
            ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
            // 1 第一行表头
            ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
            for (int j=0;j<colsArray.size();j++){
                cols.add((String) colsArray.get(j));
                cols2.add(new ExcelUtil.ColHeader((String) colsArray.get(j), 2, 1));
            }
            col1.add(cols2);
            ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
            return new Result<String>(filePath);
        }
        catch (Exception e){
            e.printStackTrace();
            return new Result<String>(false, "执行失败");
        }
    }
}

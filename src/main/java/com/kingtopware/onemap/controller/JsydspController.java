package com.kingtopware.onemap.controller;

import java.net.URLEncoder;
import java.util.*;
import javax.annotation.Resource;

import com.alibaba.fastjson.JSON;
import com.kingtopware.framework.bean.XzqTudi;
import com.kingtopware.framework.util.*;
import com.kingtopware.onemap.bean.*;
import com.kingtopware.onemap.biz.TudiBiz;
import org.apache.commons.lang.StringUtils;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.TextUtils;
import org.apache.log4j.Logger;
import org.nlpcn.commons.lang.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.ContextLoader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.controller.BaseController;
import com.kingtopware.onemap.entity.JsydspEntity;
import com.kingtopware.onemap.service.JsydspService;

/**
 * =====================================
 *
 * @author： luxiaolin
 * @date： 2017年8月28日
 * @description：建设用地审批控制类 =====================================
 */
@RestController
@RequestMapping(value = "/jsydsp")
public class JsydspController extends BaseController<JsydspEntity> {
    private static Logger logger = Logger.getLogger(JsydspController.class);
    @Resource
    public JsydspService srv;
    @Autowired
    public TudiBiz tudiBiz;//处理统计分析（利用现状）
    @Autowired
    public RedisUtil redisUtil;

    @Override
    public void getBaseSrv() {
        if (baseSrv == null)
            baseSrv = srv;
    }

    /**
     * 审批单位不同统计（市级、省级、国务院） (暂时弃用)
     *
     * @param param
     * @return
     */
    @Deprecated
    @RequestMapping(value = "/getinfobyyd_", method = RequestMethod.POST)
    public ResultList<JsydspListFull> getInfoByyd(@RequestBody Map<String, String> param) {
        try {
            String starttime = param.containsKey("starttime") ? param.get("starttime") : "";
            String endtime = param.containsKey("endtime") ? param.get("endtime") : "";
            String countyarea = param.containsKey("countyarea") ? param.get("countyarea") : "";

            String flag = param.containsKey("flag") ? param.get("flag") : "";

            if (!TextUtils.isEmpty(countyarea)) {
                if (TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
                    return new ResultList<JsydspListFull>(false, "请选择日期！");
                } else {
                    List<JsydspListFull> res = srv.getInfoByyd(starttime, endtime, countyarea, flag);
                    return new ResultList<JsydspListFull>(res);
                }

            } else {
                return new ResultList<JsydspListFull>(false, "请选择行政区划！");
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new ResultList<JsydspListFull>(false, "执行失败");
        }
    }

    /**
     * 市政府审批的项目根据土地利用现状、行政区进行分类
     *
     * @param param
     * @return
     */
    @Deprecated
    @RequestMapping(value = "/getinfobyys_", method = RequestMethod.POST)
    public ResultList<JsydSphjListFull> getInfoByys(@RequestBody Map<String, String> param) {
        try {
            String starttime = param.containsKey("starttime") ? param.get("starttime") : "";
            String endtime = param.containsKey("endtime") ? param.get("endtime") : "";
            String countyarea = param.containsKey("countyarea") ? param.get("countyarea") : "";

            String flag = param.containsKey("flag") ? param.get("flag") : "";

            if (!TextUtils.isEmpty(countyarea)) {
                if (TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
                    return new ResultList<JsydSphjListFull>(false, "请选择日期！");
                } else {
                    List<JsydSphjListFull> res = srv.getInfoByys(starttime, endtime, countyarea, flag);
                    return new ResultList<JsydSphjListFull>(res);
                }

            } else {
                return new ResultList<JsydSphjListFull>(false, "请选择行政区划！");
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new ResultList<JsydSphjListFull>(false, "执行失败");
        }
    }

    /**
     * 以月份、季度、年份为单位，统计不同地区、不同审批单位，根据土地利用现状分类
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/getinfobyyd", method = RequestMethod.POST)
    public ResultList<JsydspListFull> getInfoByjdqd(@RequestBody String map) {
        try {

            List<JsydspListFull> resall = new ArrayList<JsydspListFull>();
            JSONObject jasonObject = JSONObject.parseObject(map);

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
                            return new ResultList<JsydspListFull>(false, "时间格式不正确！");
                        } else {
                            int startflagst = Integer.valueOf(starttime);
                            int startflaget = Integer.valueOf(endtime);
                            int county = startflaget - startflagst + 1;
                            if (county > 0) {
                                for (int m = 0; m < county; m++) {
                                    starttime = String.valueOf(startflagst + m);
                                    List<JsydspListFull> res = srv.getInfoByyd(starttime, endtime, countyarea, flag);
                                    if (null != res)
                                        resall.addAll(res);
                                }
                            }

                        }
                        return new ResultList<JsydspListFull>(resall);
                    } else {
                        for (int i = 0; i < count; i++) {
                            JSONObject jdObject = (JSONObject) jobj.get(i);
                            String starttime = jdObject.getString("starttime");
                            String endtime = jdObject.getString("endtime");
                            if (0 == starttime.length() || 0 == endtime.length()) {
                                return new ResultList<JsydspListFull>(false, "时间格式不正确！");
                            } else {

                                List<JsydspListFull> res = srv.getInfoByyd(starttime, endtime, countyarea, flag);
                                if (null != res)
                                    resall.addAll(res);
                                ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
                            }
                        }

                        return new ResultList<JsydspListFull>(resall);
                    }

                } else {
                    return new ResultList<JsydspListFull>(false, "请选择日期！");
                }

            } else {
                return new ResultList<JsydspListFull>(false, "请选择行政区划！");
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new ResultList<JsydspListFull>(false, "执行失败");
        }
    }

    /**
     * 根据行政区（武汉市的县区）统计各县区的土地使用情
     * @param
     * @return
     */
    @RequestMapping(value = "/getinfobyys", method = RequestMethod.POST)
    public ResultList<XzqTudi> getInfoByjdq(@RequestBody String map) {
        String key="getInfoByjdq_"+map;
        if (redisUtil.exists(key)) {
            return (ResultList<XzqTudi>) redisUtil.get(key);
        }
        tudiBiz.staticsEveryXzqLand(map);
        HttpUtils httpUtils = new HttpUtils();
        JSONObject jasonObject = JSONObject.parseObject(map);
        String url = jasonObject.getString("url");
        String typename = jasonObject.getString("typename");
        String clip = jasonObject.getString("clip");
        String groupFields = jasonObject.getString("groupFields");
        String statisticsFields = jasonObject.getString("statisticsFields");
        JSONArray jsonArray2 = JSON.parseArray(statisticsFields);
        JSONObject jsonObject3 = (JSONObject) jsonArray2.get(0);
        String operate = jsonObject3.getString("operate");
        String field = jsonObject3.getString("field");
        String filter = jasonObject.getString("filter");
        String cql = jasonObject.getString("cql");
        StringBuilder sb = new StringBuilder();
        sb.append(url);
        sb.append("?");
        sb.append("request=aggregate&service=wps");
        JSONObject jsonObject1 = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject2 = new JSONObject();
        jsonObject2.put("field", field);
        jsonObject2.put("operate", operate);
        jsonArray.add(jsonObject2);
        jsonObject1.put("statisticsFields", jsonArray);
        jsonObject1.put("typename", typename);
        jsonObject1.put("clip", clip);
        jsonObject1.put("groupFields", groupFields);
        Map<String, String> params = new HashMap<String, String>();
        params.put("statistics", jsonObject1.toJSONString());
        Map<String, String> head = new HashMap<String, String>();
        head.put("Content-Type", "application/x-www-form-urlencoded");
        String re = httpUtils.doPost(sb.toString(), params, head);
        List<XzqTudi> l = new ArrayList<XzqTudi>();
        if (!StringUtil.isBlank(re)) {
            JSONArray objects = JSON.parseArray(re);
            for (int i = 0; i < objects.size(); i++) {
                XzqTudi xzqTudi = new XzqTudi();
                xzqTudi.setName(objects.getJSONObject(i).getString("行政区"));
                xzqTudi.setSum(Float.valueOf(objects.getJSONObject(i).getString("SUM_TBMJ")));
                l.add(xzqTudi);
            }
        }
        ResultList<XzqTudi> rs = new ResultList<XzqTudi>();
        rs.setData(l);
        redisUtil.set(key,rs,6000L);
        return rs;
    }

    @RequestMapping("/staticsBiaoge")
    public Map<String,Object> staticsBiao() throws Exception {
        HttpUtils httpUtils = new HttpUtils();
        String[] strs = {"01", "02", "03", "04", "10", "11", "12", "20"};
        String url = "http://192.168.1.63:8080/hgis/ows?request=aggregate&service=wps";
        JSONObject j1 = new JSONObject();
        JSONObject j2 = new JSONObject();
        JSONArray jr = new JSONArray();
        j2.put("field", "TBMJ");
        j2.put("operate", "sum");
        jr.add(j2);
        j1.put("statisticsFields", jr);
        j1.put("typename", "ktw:dileituban");
        j1.put("clip", "0");
        j1.put("groupFields", "行政区");
        Map<String, String> params = new HashMap<String, String>();
        Map<String, String> head = new HashMap<String, String>();
        head.put("Content-Type", "application/x-www-form-urlencoded");
        List<String> listRES = new ArrayList<String>();//放不同地类的所有请求数据
        for (String str : strs) {
            String cqlFilter = "DLBM like " + "'" + str + "%'";
            j1.put("filter", cqlFilter);
            params.put("statistics", j1.toJSONString());
            String re = httpUtils.doPost(url, params, head);
            if (!StringUtils.isEmpty(re)) {
                listRES.add(re);
            }
        }
        //赋值
        List<Datagrid> listDTOs = new ArrayList<Datagrid>();
        //初始化一个容器盛放所有的rows
        if (listRES.size() != 0) {
            JSONArray count = JSONArray.parseArray(listRES.get(2));//取得行政区的个数
            for (int i = 0; i < count.size(); i++) {
                Datagrid datagrid = new Datagrid();
                listDTOs.add(datagrid);
            }
        }
        for (int i = 0; i < listRES.size(); i++) {//i=0,1,2...表示地类发生改变
            JSONArray arrayI = JSONArray.parseArray(listRES.get(i));
            for (int j = 0; j < arrayI.size(); j++) {//j=0,1....表示行政区在发生变化
                //添加耕地数据
                if (i == 0) {
                    listDTOs.get(j).setGendi(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加园地数据
                if (i == 1) {
                    listDTOs.get(j).setYuan(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加林地数据
                if (i == 2) {
                    listDTOs.get(j).setLindi(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加草地数据
                if (i == 3) {
                    listDTOs.get(j).setCao(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加交通运输数据
                if (i == 4) {
                    listDTOs.get(j).setJiaot(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加水利数据
                if (i == 5) {
                    listDTOs.get(j).setShuili(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加其他土地数据
                if (i == 6) {
                    listDTOs.get(j).setQita(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
                //添加城镇数据
                if (i == 7) {
                    listDTOs.get(j).setChenzhen(arrayI.getJSONObject(j).getString("SUM_TBMJ"));
                    listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                    listDTOs.get(j).setStartdate("2018-11-10");
                    listDTOs.get(j).setOrder("0001");
                }
            }

        }
        HashMap<String,Object> map=new HashMap<String, Object>();
        map.put("rows",listDTOs);
        return map;
    }
    @RequestMapping(value = "/getinfo/{guid}", method = RequestMethod.GET)
    public JsydspEntity GetBybusiness(@PathVariable(value = "guid") String guid) {
        try {
            return srv.GetBybusiness(guid);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new JsydspEntity();
        }
    }

    /**
     * 以月份、季度、年份为单位，统计不同地区，根据土地规划用途进行分类
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/getInfoByghyt", method = RequestMethod.POST)
    public ResultList<JsydspGhyt> getInfoByghyt(@RequestBody String photouri) {
        try {

            List<JsydspGhyt> resall = new ArrayList<JsydspGhyt>();
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
                            return new ResultList<JsydspGhyt>(false, "时间格式不正确！");
                        } else {
                            int startflagst = Integer.valueOf(starttime);
                            int startflaget = Integer.valueOf(endtime);
                            int county = startflaget - startflagst + 1;
                            if (county > 0) {
                                for (int m = 0; m < county; m++) {
                                    starttime = String.valueOf(startflagst + m);
                                    List<JsydspGhyt> res = srv.getInfoByghyt(starttime, endtime, countyarea, flag);
                                    if (null != res)
                                        resall.addAll(res);
                                }
                            }

                        }
                        return new ResultList<JsydspGhyt>(resall);
                    } else {
                        for (int i = 0; i < count; i++) {
                            JSONObject jdObject = (JSONObject) jobj.get(i);
                            String starttime = jdObject.getString("starttime");
                            String endtime = jdObject.getString("endtime");
                            List<JsydspGhyt> res = srv.getInfoByghyt(starttime, endtime, countyarea, flag);
                            if (null != res)
                                resall.addAll(res);
                            ConsoleUtils.println("dt =" + jdObject.getString("starttime"));
                        }
                        return new ResultList<JsydspGhyt>(resall);
                    }

                } else {
                    return new ResultList<JsydspGhyt>(false, "请选择日期！");
                }

            } else {
                return new ResultList<JsydspGhyt>(false, "请选择行政区划！");
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new ResultList<JsydspGhyt>(false, "执行失败");
        }
    }

    /**
     * 审批单位不同统计（市级、省级、国务院）
     *
     * @param param
     * @return
     */
    @Deprecated
    @RequestMapping(value = "/getinfobyna", method = RequestMethod.POST)
    public ResultList<JsydspNa> getInfoByNa(@RequestBody Map<String, String> param) {
        try {
            String nf = param.containsKey("nf") ? param.get("nf") : "";

            if (TextUtils.isEmpty(nf)) {
                return new ResultList<JsydspNa>(false, "请选择日期！");
            } else {
                List<JsydspNa> res = srv.getInfoByNa(nf);
                return new ResultList<JsydspNa>(res);
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new ResultList<JsydspNa>(false, "执行失败");
        }
    }

    @RequestMapping(value = "/useexport", method = RequestMethod.POST)
    public Result<String> useExport(@RequestBody String param) throws Exception {
        try {
            ArrayList<Datagrid> data = new ArrayList<Datagrid>();
            JSONArray jasonObject = JSONArray.parseArray(param);
            for (int i = 0; i < jasonObject.size(); i++) {
                Datagrid datagrid=new Datagrid();
                JSONObject jdObject = (JSONObject) jasonObject.get(i);
                datagrid.setXzqname(jdObject.getString("xzqname"));
                datagrid.setGendi(jdObject.getString("gendi"));
                datagrid.setYuan(jdObject.getString("yuan"));
                datagrid.setLindi(jdObject.getString("lindi"));
                datagrid.setCao(jdObject.getString("cao"));
                datagrid.setJiaot(jdObject.getString("jiaot"));
                datagrid.setShuili(jdObject.getString("shuili"));
                datagrid.setQita(jdObject.getString("qita"));
                datagrid.setChenzhen(jdObject.getString("chenzhen"));
                datagrid.setAreacode(jdObject.getString("areacode"));
                datagrid.setSum(jdObject.getString("sum"));
                datagrid.setStartdate(jdObject.getString("startdate"));
                datagrid.setOrder(jdObject.getString("order"));
                data.add(datagrid);
            }

            String filePath = "temp\\" + "批地统计分析(利用现状)" + UUID.randomUUID().toString() + ".xls";
            String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
                    + filePath;
            ArrayList<String> cols = new ArrayList<String>();
            cols.add("order");
            cols.add("startdate");
            cols.add("xzqname");
            cols.add("sum");
            cols.add("gendi");
            cols.add("yuan");
            cols.add("lindi");
            cols.add("cao");
            cols.add("jiaot");
            cols.add("shuili");
            cols.add("chenzhen");
            cols.add("qita");
            cols.add("CL_JSYD_MJ");
            ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
            // 1 第一行表头
            ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols2);
            cols2.add(new ExcelUtil.ColHeader("序号", 5, 1));
            cols2.add(new ExcelUtil.ColHeader("统计时间", 5, 1));
            cols2.add(new ExcelUtil.ColHeader("县市区", 5, 1));
            cols2.add(new ExcelUtil.ColHeader("审批合计(公顷)", 1, 10));

            // 2 第二行表头
            ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols3);
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("总面积", 4, 1));
            cols3.add(new ExcelUtil.ColHeader("行政区用地", 1, 8));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("原有集体建设用地", 4, 1));

            // 3 第三行表头
            ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols4);
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("耕地", 3, 1));
            cols4.add(new ExcelUtil.ColHeader("行政区用地", 1, 6));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("其他土地", 3, 1));

            // 4 第四行表头
            ArrayList<ExcelUtil.ColHeader> cols5 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols5);
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("园地", 2, 1));
            cols5.add(new ExcelUtil.ColHeader("耕地demo", 1, 2));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("交通设施", 2, 1));
            cols5.add(new ExcelUtil.ColHeader("水利用地", 2, 1));
            cols5.add(new ExcelUtil.ColHeader("城镇工矿", 2, 1));

            // 4 第四行表头
            ArrayList<ExcelUtil.ColHeader> cols6 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols6);
            cols6.add(new ExcelUtil.ColHeader("", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("林地", 1, 1));
            cols6.add(new ExcelUtil.ColHeader("草地", 1, 1));

            ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
            return new Result<String>(filePath);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new Result<String>(false, "执行失败");
        }
    }

    @RequestMapping(value = "/export", method = RequestMethod.POST)
    public Result<String> Export(@RequestBody String param) throws Exception {
        try {
            ArrayList<JsydspListFull> data = new ArrayList<JsydspListFull>();

            JSONArray jasonObject = JSONArray.parseArray(param);
            for (int i = 0; i < jasonObject.size(); i++) {
                JsydspListFull JsydspListFull = new JsydspListFull();
                JSONObject jdObject = (JSONObject) jasonObject.get(i);
                JsydspListFull.setEND_TIME("" + (i + 1));
                JsydspListFull.setSTART_TIME(jdObject.getString("time"));
                JsydspListFull.setXZQMC(jdObject.getString("XZQMC"));
                JsydspListFull.setPZ_XM_MJ(jdObject.getDouble("PZ_XM_MJ"));
                JsydspListFull.setXZ_JSYD_MJ(jdObject.getDouble("XZ_JSYD_MJ"));
                JsydspListFull.setPZ_NYD_MJ(jdObject.getDouble("PZ_NYD_MJ"));
                JsydspListFull.setPZ_GD_MJ(jdObject.getDouble("PZ_GD_MJ"));
                JsydspListFull.setPZ_WLYD_MJ(jdObject.getDouble("PZ_WLYD_MJ"));
                JsydspListFull.setCL_JSYD_MJ(jdObject.getDouble("CL_JSYD_MJ"));
                JsydspListFull.setG_PZ_XM_MJ(jdObject.getDouble("G_PZ_XM_MJ"));
                JsydspListFull.setG_XZ_JSYD_MJ(jdObject.getDouble("G_XZ_JSYD_MJ"));
                JsydspListFull.setG_PZ_NYD_MJ(jdObject.getDouble("G_PZ_NYD_MJ"));
                JsydspListFull.setG_PZ_GD_MJ(jdObject.getDouble("G_PZ_GD_MJ"));
                JsydspListFull.setG_PZ_WLYD_MJ(jdObject.getDouble("G_PZ_WLYD_MJ"));
                JsydspListFull.setG_CL_JSYD_MJ(jdObject.getDouble("G_CL_JSYD_MJ"));
                JsydspListFull.setS_PZ_XM_MJ(jdObject.getDouble("S_PZ_XM_MJ"));
                JsydspListFull.setS_XZ_JSYD_MJ(jdObject.getDouble("S_XZ_JSYD_MJ"));
                JsydspListFull.setS_PZ_NYD_MJ(jdObject.getDouble("S_PZ_NYD_MJ"));
                JsydspListFull.setS_PZ_GD_MJ(jdObject.getDouble("S_PZ_GD_MJ"));
                JsydspListFull.setS_PZ_WLYD_MJ(jdObject.getDouble("S_PZ_WLYD_MJ"));
                JsydspListFull.setS_CL_JSYD_MJ(jdObject.getDouble("S_CL_JSYD_MJ"));
                data.add(JsydspListFull);
            }

            String filePath = "temp\\" + "批地统计分析(批准级别)" + UUID.randomUUID().toString() + ".xls";
            String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
                    + filePath;
            ArrayList<String> cols = new ArrayList<String>();
            cols.add("END_TIME");
            cols.add("START_TIME");
            cols.add("XZQMC");
            cols.add("PZ_XM_MJ");
            cols.add("XZ_JSYD_MJ");
            cols.add("PZ_NYD_MJ");
            cols.add("PZ_GD_MJ");
            cols.add("PZ_WLYD_MJ");
            cols.add("CL_JSYD_MJ");
            cols.add("g_PZ_XM_MJ");
            cols.add("g_XZ_JSYD_MJ");
            cols.add("g_PZ_NYD_MJ");
            cols.add("g_PZ_GD_MJ");
            cols.add("g_PZ_WLYD_MJ");
            cols.add("g_CL_JSYD_MJ");
            cols.add("s_PZ_XM_MJ");
            cols.add("s_XZ_JSYD_MJ");
            cols.add("s_PZ_NYD_MJ");
            cols.add("s_PZ_GD_MJ");
            cols.add("s_PZ_WLYD_MJ");
            cols.add("s_CL_JSYD_MJ");
            ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
            // 1 第一行表头
            ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols2);
            cols2.add(new ExcelUtil.ColHeader("序号", 4, 1));
            cols2.add(new ExcelUtil.ColHeader("统计时间", 4, 1));
            cols2.add(new ExcelUtil.ColHeader("县市区", 4, 1));
            cols2.add(new ExcelUtil.ColHeader("审批合计(公顷)", 1, 6));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("国务院审批合计(公顷)", 1, 6));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("省政府审批合计(公顷)", 1, 6));

            // 2 第二行表头
            ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols3);
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("总面积", 3, 1));
            cols3.add(new ExcelUtil.ColHeader("新增建设用地", 1, 4));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("原有集体建设用地", 3, 1));
            cols3.add(new ExcelUtil.ColHeader("总面积", 3, 1));
            cols3.add(new ExcelUtil.ColHeader("新增建设用地", 1, 4));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("原有集体建设用地", 3, 1));
            cols3.add(new ExcelUtil.ColHeader("总面积", 3, 1));
            cols3.add(new ExcelUtil.ColHeader("新增建设用地", 1, 4));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("原有集体建设用地", 3, 1));

            // 3 第三行表头
            ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols4);
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("总面积", 2, 1));
            cols4.add(new ExcelUtil.ColHeader("农用地转用", 1, 2));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("未利用地面积", 2, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("总面积", 2, 1));
            cols4.add(new ExcelUtil.ColHeader("农用地转用", 1, 2));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("未利用地面积", 2, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("总面积", 2, 1));
            cols4.add(new ExcelUtil.ColHeader("农用地转用", 1, 2));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("未利用地面积", 2, 1));

            // 4 第四行表头
            ArrayList<ExcelUtil.ColHeader> cols5 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols5);
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("总面积", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("耕地面积", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("总面积", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("耕地面积", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("总面积", 1, 1));
            cols5.add(new ExcelUtil.ColHeader("耕地面积", 1, 1));
            ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
            return new Result<String>(filePath);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new Result<String>(false, "执行失败");
        }
    }

    @RequestMapping(value = "/planexport", method = RequestMethod.POST)
    public Result<String> PlanExport(@RequestBody String param) throws Exception {
        try {
            ArrayList<JsydspGhyt> data = new ArrayList<JsydspGhyt>();

            JSONArray jasonObject = JSONArray.parseArray(param);
            for (int i = 0; i < jasonObject.size(); i++) {
                JsydspGhyt JsydspGhyt = new JsydspGhyt();
                JSONObject jdObject = (JSONObject) jasonObject.get(i);
                JsydspGhyt.setEND_TIME("" + (i + 1));
                JsydspGhyt.setSTART_TIME(jdObject.getString("time"));
                JsydspGhyt.setXZQMC(jdObject.getString("XZQMC"));
                JsydspGhyt.setSPHE_MJ(jdObject.getDouble("SPHE_MJ"));
                JsydspGhyt.setQN_ZMJ(jdObject.getDouble("QN_ZMJ"));
                JsydspGhyt.setQN_SFYD_MJ(jdObject.getDouble("QN_SFYD_MJ"));
                JsydspGhyt.setQN_GKCC_MJ(jdObject.getDouble("QN_GKCC_MJ"));
                JsydspGhyt.setQN_ZZ_ZMJ(jdObject.getDouble("QN_ZZ_ZMJ"));
                JsydspGhyt.setQN_SLZF_MJ(jdObject.getDouble("QN_SLZF_MJ"));
                JsydspGhyt.setQN_QT(jdObject.getDouble("QN_QT"));
                JsydspGhyt.setDX_ZMJ(jdObject.getDouble("DX_ZMJ"));
                JsydspGhyt.setDX_JTYS_MJ(jdObject.getDouble("DX_JTYS_MJ"));
                JsydspGhyt.setDX_SLSS_MJ(jdObject.getDouble("DX_SLSS_MJ"));
                JsydspGhyt.setDX_QT_MJ(jdObject.getDouble("DX_QT_MJ"));
                data.add(JsydspGhyt);
            }

            String filePath = "temp\\" + "批地统计分析(土地用途)" + UUID.randomUUID().toString() + ".xls";
            String downurl = ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/")
                    + filePath;
            ArrayList<String> cols = new ArrayList<String>();
            cols.add("END_TIME");
            cols.add("START_TIME");
            cols.add("XZQMC");
            cols.add("SPHE_MJ");
            cols.add("QN_ZMJ");
            cols.add("QN_SFYD_MJ");
            cols.add("QN_GKCC_MJ");
            cols.add("QN_ZZ_ZMJ");
            cols.add("QN_SLZF_MJ");
            cols.add("QN_QT");
            cols.add("DX_ZMJ");
            cols.add("DX_JTYS_MJ");
            cols.add("DX_SLSS_MJ");
            cols.add("DX_QT_MJ");
            ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
            // 1 第一行表头
            ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols2);
            cols2.add(new ExcelUtil.ColHeader("序号", 3, 1));
            cols2.add(new ExcelUtil.ColHeader("统计时间", 3, 1));
            cols2.add(new ExcelUtil.ColHeader("县市区", 3, 1));
            cols2.add(new ExcelUtil.ColHeader("审批合计(公顷)", 3, 1));
            cols2.add(new ExcelUtil.ColHeader("城镇村建设用地(公顷)", 1, 6));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("", 1, 1));
            cols2.add(new ExcelUtil.ColHeader("单独选址建设用地(公顷)", 1, 4));

            // 2 第二行表头
            ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols3);
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("总面积", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("商服用地", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("工矿仓储", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("住宅用地", 1, 2));
            cols3.add(new ExcelUtil.ColHeader("", 1, 1));
            cols3.add(new ExcelUtil.ColHeader("商服用地", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("总面积", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("交通运输用地", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("水利设施用地", 2, 1));
            cols3.add(new ExcelUtil.ColHeader("其他", 2, 1));

            // 3 第三行表头
            ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
            col1.add(cols4);
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("总面积", 1, 1));
            cols4.add(new ExcelUtil.ColHeader("三类住房", 1, 1));
            ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, downurl);
            return new Result<String>(filePath);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new Result<String>(false, "执行失败");
        }
    }

    @RequestMapping(value = "/alldatayear", method = RequestMethod.GET)
    public Result<String> AllDataYear() {
        try {
            return srv.getAllDataYear();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new Result<String>(false, "执行失败");
        }
    }
}

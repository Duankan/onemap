package com.kingtopware.onemap.biz.hubeiSHENGTING;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kingtopware.onemap.bean.Datagrid;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author dankin
 * 农的业务处理类
 */
@Component
public class NongBiz {
    /**
     * 封装土地利用现状表格数据
     *
     * @return
     */
    public List<Datagrid> fillBiaoGeData(List<String> listRES, List<Datagrid> listDTOs) {
        for (int i = 0; i < listRES.size(); i++) {//i=0,1,2...表示地类发生改变
            JSONArray arrayI = JSONArray.parseArray(listRES.get(i));
            for (int j = 0; j < arrayI.size(); j++) {//j=0,1....表示行政区在发生变化
                listDTOs.get(j).setXzqname(arrayI.getJSONObject(j).getString("行政区"));
                listDTOs.get(j).setStartdate("2018-11-10");
                listDTOs.get(j).setOrder("0001");
                //添加耕地数据
                if (i == 0) {
                    listDTOs.get(j).setGendi(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加园地数据
                if (i == 1) {
                    listDTOs.get(j).setYuan(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加林地数据
                if (i == 2) {
                    listDTOs.get(j).setLindi(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加草地数据
                if (i == 3) {
                    listDTOs.get(j).setCao(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加交通运输数据
                if (i == 4) {
                    listDTOs.get(j).setJiaot(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加水利数据
                if (i == 5) {
                    listDTOs.get(j).setShuili(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加其他土地数据
                if (i == 6) {
                    listDTOs.get(j).setQita(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
                //添加城镇数据
                if (i == 7) {
                    listDTOs.get(j).setChenzhen(Double.valueOf(arrayI.getJSONObject(j).getString("SUM_TBMJ"))*0.0001);
                }
            }
        }
        return listDTOs;
    }
    /**
     * 统计不稳新增的各行政区的各类用地resultMap
     */
    public Map<String, Object> statisticBWXZ(String result1, String result2, String groupField1, String groupField2) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<Map<String, Object>> ls = new ArrayList<Map<String, Object>>();
        String[] legends=null;
        if (!StringUtils.isBlank(result1)) {
            JSONArray jsonArray = JSONArray.parseArray(result1);
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject object = (JSONObject) jsonArray.get(i);
                String DLMC = null;
                String tdmj = null;
                boolean flag = false;
                Map<String, Object> mp = null;
                for (int j = 0; j < ls.size(); j++) {
                    if (ls.get(j).get("行政区").equals(object.getString(groupField2))) {
                        DLMC = object.getString(groupField1);
                        tdmj = object.getString("SUM_TBDLMJ");
                        ls.get(j).put(DLMC, Double.valueOf(tdmj)*0.0001);
                        flag = true;
                    }
                }
                //如果行政区名字不存在，新建Map
                if (!flag) {
                    mp = new HashMap<String, Object>();
                    mp.put("行政区", object.getString(groupField2));
                    DLMC = object.getString(groupField1);
                    tdmj = object.getString("SUM_TBDLMJ");
                    mp.put(DLMC, Double.valueOf(tdmj)*0.0001);
                    ls.add(mp);
                }
            }
            resultMap.put("rows", ls);
        }
        if (!StringUtils.isEmpty(result2)) {
            JSONArray jsonArray2 = JSONArray.parseArray(result2);
            if(jsonArray2.size()>0){
                legends=new String[jsonArray2.size()];
            }
            for (int i = 0; i < jsonArray2.size(); i++) {
                JSONObject object = (JSONObject) jsonArray2.get(i);
                legends[i]=object.getString(groupField1);
            }
            resultMap.put("legends",legends);
        }
        return resultMap;
    }
}

package com.kingtopware.onemap.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.framework.util.StringUtil;
import com.kingtopware.onemap.dao.AsApDao;
import com.kingtopware.onemap.entity.AsApEntity;
import com.kingtopware.onemap.service.AsApService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年10月28日
 * @description：辅助审批接口实现类
 * =====================================
 */
@Component
public class AsApServiceImpl extends BaseServiceImpl<AsApEntity> implements AsApService {
	@Resource
	public AsApDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public AsApServiceImpl() {
		tableName = "T_ASSIS_APPROVE";
	}

	public AsApEntity setApprovalInfo(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub
		
		AsApEntity mAsApEntityT = new AsApEntity();
		mAsApEntityT.setGuid(StringUtil.getUUID());
		mAsApEntityT.setXmbh("20171028号");
		mAsApEntityT.setXmmc("批地统计结果");
		mAsApEntityT.setAjbh("201710281200");
		mAsApEntityT.setAjmc("批地统计结果");
		mAsApEntityT.setLclx("正常");
		mAsApEntityT.setLcmc("正常");
		mAsApEntityT.setXzq_dm("430502");
		mAsApEntityT.setXzq_mc("双清区");
		mAsApEntityT.setTdwz("双清区");
		mAsApEntityT.setTdyt("商服用地");
		mAsApEntityT.setSqydzmj(100.325);
		mAsApEntityT.setJsydmj(25.3562);
		mAsApEntityT.setNydzmj(56.42);
		mAsApEntityT.setQzgdmj(25.123);
		mAsApEntityT.setJbntmj(25.3645);
		mAsApEntityT.setWlydmj(3.025);
		mAsApEntityT.setCljsydmj(41.235);
		mAsApEntityT.setXzjsydmj(10.235);
		mAsApEntityT.setSqdw("建设局");
		add(mAsApEntityT);
		
		return null;
	}

	public AsApEntity getInfobyid(String guid) {
		// TODO Auto-generated method stub
		
		 String pdbasesql = AsApEntity.selectAll + "  FROM T_ASSIS_APPROVE    WHERE GUID='";
		 String basesql = "";
		 AsApEntity mAsApEntityT = new AsApEntity();
				basesql = pdbasesql + guid + "'";
				mAsApEntityT = getObj(basesql);
		return mAsApEntityT;
	}
	
	
	private <T> T getObj(String sql) {
		List<Object[]> t = getStatisticsBySql(sql);
		Map mObjString = null;
		T mBcgdEntity = null;
		Class mClass = null;
		int count = t.size();
		if (count > 0) {
			Object[] objects = t.get(0);
			mObjString = getObjTString(objects);
			if (null != mObjString) {
					mClass = AsApEntity.class;
				try {
					if ((null != mObjString) && (null != mClass))
						mBcgdEntity = StringUtil.convertMap2Bean(mObjString, mClass);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return mBcgdEntity;
	}
	
	private Map getObjTString(Object[] objects) {
		String mSelectKey = "";
			mSelectKey = AsApEntity.selectKey;
			;
		String mselectKeyMap[] = mSelectKey.split(",");
		int countmap = mselectKeyMap.length;
		Map<String, Object> map = null;
		int count = objects.length;
		if ((count > 0) && (countmap > 0) && (countmap == count)) {
			map = new HashMap<String, Object>();
			for (int i = 0; i < count; i++) {
				if (null != objects[i]) {
					if ("ST_AsGeoJson".equalsIgnoreCase(mselectKeyMap[i])) {
						map.put("geometry", objects[i]);
					} else {
						map.put(mselectKeyMap[i], objects[i]);
					}

				} else {
					map.put(mselectKeyMap[i], "");
				}
			}
		}
		return map;
	}
}
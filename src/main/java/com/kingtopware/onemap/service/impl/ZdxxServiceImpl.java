
package com.kingtopware.onemap.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.framework.util.ConsoleUtils;
import com.kingtopware.framework.util.DateUtil;
import com.kingtopware.framework.util.PropertyUtil;
import com.kingtopware.framework.util.StringUtil;
import com.kingtopware.onemap.bean.ZdxxLyxzFull;
import com.kingtopware.onemap.dao.ZdxxDao;
import com.kingtopware.onemap.entity.ZdxxEntity;
import com.kingtopware.onemap.service.ZdxxService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月1日
 * @description：征地信息接口实现类
 * =====================================
 */
@Component
public class ZdxxServiceImpl extends BaseServiceImpl<ZdxxEntity> implements ZdxxService {
	@Resource
	public ZdxxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public ZdxxServiceImpl() {
		tableName = "T_INF_ONEMAP_ZDXXB";
	}

	public List<ZdxxLyxzFull> getInfoByzdxs(String starttime, String endtime,
			String countyarea,String flag) {
		// TODO Auto-generated method stub
		String fullname = PropertyUtil.get("fullname");
		String tjall =fullname;
		List<ZdxxLyxzFull> mJsydspListFullList = new ArrayList<ZdxxLyxzFull>();
		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;
		
		boolean isHasAll = false;

		String databasesql = "SELECT XZQ_DM,sum(ZYTD_ZMJ) as ZYTD_ZMJ,sum(ZS_NYD_GDMJ) as ZS_NYD_GDMJ,sum(ZS_NYD_GDSTMJ) as ZS_NYD_GDSTMJ,sum(ZS_NYD_GDHDMJ) as ZS_NYD_GDHDMJ,sum(ZS_NYD_GDCDMJ) as ZS_NYD_GDCDMJ,sum(ZS_NYD_LDMJ) as ZS_NYD_LDMJ,sum(ZS_NYD_YDMJ) as ZS_NYD_YDMJ,sum(ZS_NYD_MCDMJ) as ZS_NYD_MCDMJ,sum(ZS_NYD_QTMJ) as ZS_NYD_QTMJ ,sum(ZS_JSYDMJ) as ZS_JSYDMJ ,sum(ZS_WLYDMJ) as ZS_WLYDMJ FROM ";
		String dataallsql = "SELECT  sum(ZYTD_ZMJ) as ZYTD_ZMJ,sum(ZS_NYD_GDMJ) as ZS_NYD_GDMJ,sum(ZS_NYD_GDSTMJ) as ZS_NYD_GDSTMJ,sum(ZS_NYD_GDHDMJ) as ZS_NYD_GDHDMJ,sum(ZS_NYD_GDCDMJ) as ZS_NYD_GDCDMJ,sum(ZS_NYD_LDMJ) as ZS_NYD_LDMJ,sum(ZS_NYD_YDMJ) as ZS_NYD_YDMJ,sum(ZS_NYD_MCDMJ) as ZS_NYD_MCDMJ,sum(ZS_NYD_QTMJ) as ZS_NYD_QTMJ ,sum(ZS_JSYDMJ) as ZS_JSYDMJ ,sum(ZS_WLYDMJ) as ZS_WLYDMJ FROM T_INF_ONEMAP_ZDXXB";
		
		String databasexzq = "";

		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_ZDXXB where XZQ_MC in (";
			if ((null != nfs) && (nfs.length > 0)) {
				isHasAll =StringUtil. isHave(nfs, tjall);
				for (int k = 0; k < nfs.length; k++) {
					if (k == (nfs.length - 1)) {
						text = text + "'" + nfs[k] + "'))";
					} else {
						text = text + "'" + nfs[k] + "',";
					}

				}
			}

			ConsoleUtils.println("text = " + text);
			databasexzq = text + " A";
		} else {

			databasexzq = "T_INF_ONEMAP_ZDXXB";
		}
		
		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		}
		else
		{
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where PZSJ between '" + mStarttime + "' and '"
						+ mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where PZSJ <= '" + mEndtime + "'";
			} else {
				timesql = " where PZSJ between '" + mStarttime + "' and '"
						+ mEndtime + "'";
			}
		}

	
		
		userSql = databasesql + databasexzq + timesql
				+  "  group by XZQ_DM";

		
		String userallSql = dataallsql + timesql + "";

		List<Object[]> t = getStatisticsBySql(userSql);

		List<Object[]> tq = new ArrayList<Object[]>();

		int countq = 0;
		
		if(isHasAll)
		{
			tq =  getStatisticsBySql(userallSql);
			countq = tq.size();
		}

		int count = t.size();
		if ((count < 1) && (countq < 1)) {
			// if (count < 1 ) {
			return mJsydspListFullList;
		}
		
		if(isHasAll)
		{
			for (int m = 0; m < countq; m++) {
				Object[] objects = tq.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				ZdxxLyxzFull mJsydspFull = new ZdxxLyxzFull();
				mJsydspFull.setSTART_TIME(starttime);
				mJsydspFull.setEND_TIME(endtime);
				mJsydspFull.setXZQDM(tjall);
				mJsydspFull.setZYTD_ZMJ(objects[0] != null ? Double
						.valueOf(objects[0].toString()) : 0);
				mJsydspFull.setZS_NYD_GDMJ(objects[1] != null ? Double
						.valueOf(objects[1].toString()) : 0);
				mJsydspFull.setZS_NYD_GDSTMJ(objects[2] != null ? Double
						.valueOf(objects[2].toString()) : 0);
				mJsydspFull.setZS_NYD_GDHDMJ(objects[3] != null ? Double
						.valueOf(objects[3].toString()) : 0);
				mJsydspFull.setZS_NYD_GDCDMJ(objects[4] != null ? Double
						.valueOf(objects[4].toString()) : 0);
				mJsydspFull.setZS_NYD_LDMJ(objects[5] != null ? Double
						.valueOf(objects[5].toString()) : 0);
				mJsydspFull.setZS_NYD_YDMJ(objects[6] != null ? Double
						.valueOf(objects[6].toString()) : 0);
				mJsydspFull.setZS_NYD_MCDMJ(objects[7] != null ? Double
						.valueOf(objects[7].toString()) : 0);
				mJsydspFull.setZS_NYD_QTMJ(objects[8] != null ? Double
						.valueOf(objects[8].toString()) : 0);
				mJsydspFull.setZS_JSYDMJ(objects[9] != null ? Double
						.valueOf(objects[9].toString()) : 0);
				mJsydspFull.setZS_WLYDMJ(objects[10] != null ? Double
						.valueOf(objects[10].toString()) : 0);
				mJsydspListFullList.add(mJsydspFull);
			}
		}
		
		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}
			ZdxxLyxzFull mJsydspFull = new ZdxxLyxzFull();
			mJsydspFull.setSTART_TIME(starttime);
			mJsydspFull.setEND_TIME(endtime);
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString()
					: "");
			mJsydspFull.setZYTD_ZMJ(objects[1] != null ? Double
					.valueOf(objects[1].toString()) : 0);
			mJsydspFull.setZS_NYD_GDMJ(objects[2] != null ? Double
					.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setZS_NYD_GDSTMJ(objects[3] != null ? Double
					.valueOf(objects[3].toString()) : 0);
			mJsydspFull.setZS_NYD_GDHDMJ(objects[4] != null ? Double
					.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setZS_NYD_GDCDMJ(objects[5] != null ? Double
					.valueOf(objects[5].toString()) : 0);
			mJsydspFull.setZS_NYD_LDMJ(objects[6] != null ? Double
					.valueOf(objects[6].toString()) : 0);
			mJsydspFull.setZS_NYD_YDMJ(objects[7] != null ? Double
					.valueOf(objects[7].toString()) : 0);
			mJsydspFull.setZS_NYD_MCDMJ(objects[8] != null ? Double
					.valueOf(objects[8].toString()) : 0);
			mJsydspFull.setZS_NYD_QTMJ(objects[9] != null ? Double
					.valueOf(objects[9].toString()) : 0);
			mJsydspFull.setZS_JSYDMJ(objects[10] != null ? Double
					.valueOf(objects[10].toString()) : 0);
			mJsydspFull.setZS_WLYDMJ(objects[11] != null ? Double
					.valueOf(objects[11].toString()) : 0);
			mJsydspListFullList.add(mJsydspFull);
		}
		ConsoleUtils.println("dataxize = " + mJsydspListFullList.size());
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int h = 0; h < mJsydspListFullList.size(); h++) {
				if (tjall.equalsIgnoreCase(mJsydspListFullList.get(h).getXZQDM())) {
					mJsydspListFullList.get(h).setXZQMC(
							mJsydspListFullList.get(h).getXZQMC());
					continue;
				}
				String userSqlget = "SELECT XZQ_MC FROM T_INF_ONEMAP_ZDXXB where XZQ_DM= '"
						+ mJsydspListFullList.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mJsydspListFullList.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		return mJsydspListFullList;
	
	}
		
}
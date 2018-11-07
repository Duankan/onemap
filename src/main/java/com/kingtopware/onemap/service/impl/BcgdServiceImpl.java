
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
import com.kingtopware.onemap.bean.BcgdFull;
import com.kingtopware.onemap.dao.BcgdDao;
import com.kingtopware.onemap.entity.BcgdEntity;
import com.kingtopware.onemap.service.BcgdService;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月7日
 * @description：补充耕地接口实现类
 * =====================================
 */
@Component
public class BcgdServiceImpl extends BaseServiceImpl<BcgdEntity> implements BcgdService {
	@Resource
	public BcgdDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public BcgdServiceImpl() {
		tableName = "T_INF_ONEMAP_BCGDXXB";
	}

	public List<BcgdFull> getInfoBybcgd(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub
		String fullname = PropertyUtil.get("fullname");
		String tjall =fullname;
		List<BcgdFull> mBcgdFull = new ArrayList<BcgdFull>();
		List<BcgdFull> mJsydspListFullList = new ArrayList<BcgdFull>();
		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;
		
		boolean isHasAll = false;

		String databasesql = "SELECT XZQ_DM,BCGD_FS,count(*),sum(XZGDMJ) as XZGDMJ,sum(ZJ) as ZJ,sum(YBC_MJ) as YBC_MJ,sum(KBC_MJ) as KBC_MJ  FROM  ";
		String dataallsql = "SELECT  BCGD_FS,count(*),sum(XZGDMJ) as XZGDMJ,sum(ZJ) as ZJ,sum(YBC_MJ) as YBC_MJ,sum(KBC_MJ) as KBC_MJ FROM T_INF_ONEMAP_BCGDXXB ";
		
		String databasexzq = "";

		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_BCGDXXB where XZQ_MC in (";
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

			databasexzq = "T_INF_ONEMAP_BCGDXXB";
		}
		
		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		}
		else
		{
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where YS_RQ between '" + mStarttime + "' and '"
						+ mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where YS_RQ <= '" + mEndtime + "'";
			} else {
				timesql = " where YS_RQ between '" + mStarttime + "' and '"
						+ mEndtime + "'";
			}
		}

	
		
		userSql = databasesql + databasexzq + timesql
				+  "  group by XZQ_DM,BCGD_FS";

		
		String userallSql = dataallsql + timesql + " group by BCGD_FS";

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
			return mBcgdFull;
		}
		
		if(isHasAll)
		{
			for (int m = 0; m < countq; m++) {
				Object[] objects = tq.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				BcgdFull mJsydspFull = new BcgdFull();
				mJsydspFull.setXZQDM(tjall);
				mJsydspFull.setBCGD_FS(objects[0] != null ? objects[0].toString()
						: "");
				mJsydspFull.setmTzCount(objects[1] != null ? Integer
						.valueOf(objects[1].toString()) : 0);
				mJsydspFull.setmTzXZGDMJ(objects[2] != null ? Double
						.valueOf(objects[2].toString()) : 0);
				mJsydspFull.setmTzZJ(objects[3] != null ? Double
						.valueOf(objects[3].toString()) : 0);
				mJsydspFull.setmYBC_MJ(objects[4] != null ? Double
						.valueOf(objects[4].toString()) : 0);
				mJsydspFull.setmKBC_MJ(objects[5] != null ? Double
						.valueOf(objects[5].toString()) : 0);
				mJsydspFull.setComparisoned(false);
				mJsydspListFullList.add(mJsydspFull);
			}
		}
		
		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}
			BcgdFull mJsydspFull = new BcgdFull();
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString()
					: "");
			mJsydspFull.setBCGD_FS(objects[1] != null ? objects[1].toString()
					: "");
			mJsydspFull.setmTzCount(objects[2] != null ? Integer
					.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setmTzXZGDMJ(objects[3] != null ? Double
					.valueOf(objects[3].toString()) : 0);
			mJsydspFull.setmTzZJ(objects[4] != null ? Double
					.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setmYBC_MJ(objects[5] != null ? Double
					.valueOf(objects[5].toString()) : 0);
			mJsydspFull.setmKBC_MJ(objects[6] != null ? Double
					.valueOf(objects[6].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mJsydspListFullList.add(mJsydspFull);
			
		}
		ConsoleUtils.println("dataxize = " + mJsydspListFullList.size());
		
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int k = 0; k < mJsydspListFullList.size(); k++) {
				if (!mJsydspListFullList.get(k).isComparisoned()) {

					BcgdFull mJsydspListFull = new BcgdFull();
					mJsydspListFull.setSTART_TIME(mStarttime);
					mJsydspListFull.setEND_TIME(mEndtime);
					String xzqdm = mJsydspListFullList.get(k).getXZQDM();
					mJsydspListFull.setXZQDM(xzqdm);

					mJsydspListFullList.get(k).setComparisoned(true);
					
					 int mTzCount =0;
					 double mTzXZGDMJ =0;
					 double mTzZJ =0;
					
					 int mTfCount =0;
					 double mTfXZGDMJ =0;
					 double mTfZJ =0;
					
					
					 int mTkCount =0;
					 double mTkXZGDMJ =0;
					 double mTkZJ =0;
					
					 double mYBC_MJ =0;
					 double mKBC_MJ =0;
					
					String bcgdfs = mJsydspListFullList.get(k).getBCGD_FS();
					if("土地整理".equalsIgnoreCase(bcgdfs))
					{
						mTzCount =  mTzCount + mJsydspListFullList.get(k).getmTzCount();
						mTzXZGDMJ = mTzXZGDMJ + mJsydspListFullList.get(k).getmTzXZGDMJ();
						mTzZJ = mTzZJ + mJsydspListFullList.get(k).getmTzZJ();
					}
					else if("土地复垦".equalsIgnoreCase(bcgdfs))
					{
						mTfCount =  mTfCount + mJsydspListFullList.get(k).getmTzCount();
						mTfXZGDMJ = mTfXZGDMJ + mJsydspListFullList.get(k).getmTzXZGDMJ();
						mTfZJ = mTfZJ + mJsydspListFullList.get(k).getmTzZJ();
					}
					else if("土地开发".equalsIgnoreCase(bcgdfs))
					{
						mTkCount =  mTkCount + mJsydspListFullList.get(k).getmTzCount();
						mTkXZGDMJ = mTkXZGDMJ + mJsydspListFullList.get(k).getmTzXZGDMJ();
						mTkZJ = mTkZJ + mJsydspListFullList.get(k).getmTzZJ();
					}
					mYBC_MJ = mYBC_MJ + mJsydspListFullList.get(k).getmYBC_MJ();
					mKBC_MJ = mKBC_MJ + mJsydspListFullList.get(k).getmKBC_MJ();
					
					
					for (int i1 = k; i1 < mJsydspListFullList.size(); i1++) {
						if (!mJsydspListFullList.get(i1).isComparisoned()) {
							if ((null != xzqdm)
									&& (xzqdm.equalsIgnoreCase(mJsydspListFullList
											.get(i1).getXZQDM()))) {
								mJsydspListFullList.get(i1).setComparisoned(true);
								BcgdFull mTdydTjFullTT = mJsydspListFullList.get(i1);
								String gyfst = mTdydTjFullTT.getBCGD_FS();
								if("土地整理".equalsIgnoreCase(gyfst))
								{
									mTzCount =  mTzCount + mTdydTjFullTT.getmTzCount();
									mTzXZGDMJ = mTzXZGDMJ + mTdydTjFullTT.getmTzXZGDMJ();
									mTzZJ = mTzZJ + mTdydTjFullTT.getmTzZJ();
								}
								else if("土地复垦".equalsIgnoreCase(gyfst))
								{
									mTfCount =  mTfCount + mTdydTjFullTT.getmTzCount();
									mTfXZGDMJ = mTfXZGDMJ + mTdydTjFullTT.getmTzXZGDMJ();
									mTfZJ = mTfZJ + mTdydTjFullTT.getmTzZJ();
								}
								else if("土地开发".equalsIgnoreCase(gyfst))
								{
									mTkCount =  mTkCount + mTdydTjFullTT.getmTzCount();
									mTkXZGDMJ = mTkXZGDMJ + mTdydTjFullTT.getmTzXZGDMJ();
									mTkZJ = mTkZJ + mTdydTjFullTT.getmTzZJ();
								}
								mYBC_MJ = mYBC_MJ + mTdydTjFullTT.getmYBC_MJ();
								mKBC_MJ = mKBC_MJ + mTdydTjFullTT.getmKBC_MJ();
							}
						}
					}
					
					mJsydspListFull.setmTzCount(mTzCount);
					mJsydspListFull.setmTzXZGDMJ(mTzXZGDMJ);
					mJsydspListFull.setmTzZJ(mTzZJ);
					
					mJsydspListFull.setmTfCount(mTfCount);
					mJsydspListFull.setmTfXZGDMJ(mTfXZGDMJ);
					mJsydspListFull.setmTfZJ(mTfZJ);
					
					mJsydspListFull.setmTkCount(mTkCount);
					mJsydspListFull.setmTkXZGDMJ(mTkXZGDMJ);
					mJsydspListFull.setmTkZJ(mTkZJ);
					
					mJsydspListFull.setmYBC_MJ(mYBC_MJ);
					mJsydspListFull.setmKBC_MJ(mKBC_MJ);
					
					mBcgdFull.add(mJsydspListFull);
				}
			}
		}

		if ((null != mBcgdFull) && (mBcgdFull.size() > 0)) {
			for (int h = 0; h < mBcgdFull.size(); h++) {
				if (tjall.equalsIgnoreCase(mBcgdFull.get(h).getXZQDM())) {
					mBcgdFull.get(h).setXZQMC(
							mBcgdFull.get(h).getXZQMC());
					continue;
				}
				String userSqlget = "SELECT XZQ_MC FROM T_INF_ONEMAP_BCGDXXB where XZQ_DM= '"
						+ mBcgdFull.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mBcgdFull.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		return mBcgdFull;
	}
}

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
import com.kingtopware.onemap.bean.DjfzFull;
import com.kingtopware.onemap.dao.DjfzDao;
import com.kingtopware.onemap.entity.DjfzEntity;
import com.kingtopware.onemap.service.DjfzService;


/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月11日
 * @description：用地接口实现类
 * =====================================
 */
@Component
public class DjfzServiceImpl extends BaseServiceImpl<DjfzEntity> implements DjfzService {
	@Resource
	public DjfzDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public DjfzServiceImpl() {
		tableName = "T_INF_ONEMAP_DJFZXXB";
	}

	public List<DjfzFull> getInfoBydjfz(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub

		String fullname = PropertyUtil.get("fullname");
		String tjall =fullname;
		List<DjfzFull> mBcgdFull = new ArrayList<DjfzFull>();
		List<DjfzFull> mJsydspListFullList = new ArrayList<DjfzFull>();
		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;
		
		boolean isHasAll = false;
		
		String databasexzq = " (select c.*,d.GY_FS from (select a.*,b.GUID2 from T_INF_ONEMAP_DJFZXXB a left join T_INF_ONEMAP_GLXXB b on a.DJFZ_GUID=b.GUID1) c left join T_INF_ONEMAP_TDGYXXB d on c.GUID2=d.GDXM_GUID)  ";


		String databasesql = "SELECT e.XZQDM,e.DJLX,e.GY_FS,count(*),sum(ZDMJ) as ZDMJ FROM ";
		String dataallsql = "SELECT e.DJLX,e.GY_FS,count(*),sum(ZDMJ) as ZDMJ FROM  " + databasexzq + " e ";
		
		
		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from " + databasexzq  + " f  where f.XZQMC in (";
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
			databasexzq = text + " e";
		} else {

			databasexzq = databasexzq + " e ";
		}
		
		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		}
		else
		{
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where FZRQ between '" + mStarttime + "' and '"
						+ mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where FZRQ <= '" + mEndtime + "'";
			} else {
				timesql = " where FZRQ between '" + mStarttime + "' and '"
						+ mEndtime + "'";
			}
		}

	
		
		userSql = databasesql + databasexzq + timesql
				+  "  group by e.XZQDM,e.DJLX,e.GY_FS";

		
		String userallSql = dataallsql + timesql + "group by e.DJLX,e.GY_FS";

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
				DjfzFull mJsydspFull = new DjfzFull();
				mJsydspFull.setXZQDM(tjall);
				mJsydspFull.setDJLX(objects[0] != null ? objects[0].toString()
						: "");
				mJsydspFull.setGY_FS(objects[1] != null ? objects[1].toString()
						: "");
				mJsydspFull.setmCount(objects[2] != null ? Integer
						.valueOf(objects[2].toString()) : 0);
				mJsydspFull.setmZDMJ(objects[3] != null ? Double
						.valueOf(objects[3].toString()) : 0);
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
			DjfzFull mJsydspFull = new DjfzFull();
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString()
					: "");
			mJsydspFull.setDJLX(objects[1] != null ? objects[1].toString()
					: "");
			mJsydspFull.setGY_FS(objects[2] != null ? objects[2].toString()
					: "");
			mJsydspFull.setmCount(objects[3] != null ? Integer
					.valueOf(objects[3].toString()) : 0);
			mJsydspFull.setmZDMJ(objects[4] != null ? Double
					.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mJsydspListFullList.add(mJsydspFull);
			
		}
		ConsoleUtils.println("dataxize = " + mJsydspListFullList.size());
		
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int k = 0; k < mJsydspListFullList.size(); k++) {
				if (!mJsydspListFullList.get(k).isComparisoned()) {

					DjfzFull mJsydspListFull = new DjfzFull();
					mJsydspListFull.setSTART_TIME(mStarttime);
					mJsydspListFull.setEND_TIME(mEndtime);
					String xzqdm = mJsydspListFullList.get(k).getXZQDM();
					mJsydspListFull.setXZQDM(xzqdm);

					mJsydspListFullList.get(k).setComparisoned(true);
					
					// 发证数量
					int mCount = 0;
					// 发证面积
					double mZDMJ = 0;
					// 划拨土地面积
					double mHbZDMJ =0;
					// 出让土地面积
					double mCrZDMJ = 0;

					// 发证数量
					int mBCount = 0;
					// 发证面积
					double mBZDMJ = 0;
					// 划拨土地面积
					double mBHbZDMJ = 0;
					// 出让土地面积
					double mBCrZDMJ = 0;

					// 发证数量
					int mDCount =0;
					// 发证面积
					double mDZDMJ = 0;
					// 划拨土地面积
					double mDHbZDMJ = 0;
					// 出让土地面积
					double mDCrZDMJ = 0 ;
					
					String djlx = mJsydspListFullList.get(k).getDJLX();
					String gyfs = mJsydspListFullList.get(k).getGY_FS();
					if("初始登记".equalsIgnoreCase(djlx))
					{
						mCount =  mCount + mJsydspListFullList.get(k).getmCount();
						mZDMJ = mZDMJ + mJsydspListFullList.get(k).getmZDMJ();
						if ("协议出让".equalsIgnoreCase(gyfs) || "招标".equalsIgnoreCase(gyfs) || "拍卖".equalsIgnoreCase(gyfs) || "挂牌".equalsIgnoreCase(gyfs)) {
							mCrZDMJ = mCrZDMJ + mJsydspListFullList.get(k).getmZDMJ();
						} else if ("划拨".equalsIgnoreCase(gyfs)) {
							mHbZDMJ = mHbZDMJ +  mJsydspListFullList.get(k).getmZDMJ();
						}
					}
					else if("变更登记".equalsIgnoreCase(djlx))
					{
						mBCount =  mBCount + mJsydspListFullList.get(k).getmCount();
						mBZDMJ = mBZDMJ + mJsydspListFullList.get(k).getmZDMJ();
						if ("协议出让".equalsIgnoreCase(gyfs) || "招标".equalsIgnoreCase(gyfs) || "拍卖".equalsIgnoreCase(gyfs) || "挂牌".equalsIgnoreCase(gyfs)) {
							mBCrZDMJ = mBCrZDMJ + mJsydspListFullList.get(k).getmZDMJ();
						} else if ("划拨".equalsIgnoreCase(gyfs)) {
							mBHbZDMJ = mBHbZDMJ +  mJsydspListFullList.get(k).getmZDMJ();
						}
					}
					else if("抵押登记".equalsIgnoreCase(djlx))
					{
						mDCount =  mDCount + mJsydspListFullList.get(k).getmCount();
						mDZDMJ = mDZDMJ + mJsydspListFullList.get(k).getmZDMJ();
						if ("协议出让".equalsIgnoreCase(gyfs) || "招标".equalsIgnoreCase(gyfs) || "拍卖".equalsIgnoreCase(gyfs) || "挂牌".equalsIgnoreCase(gyfs)) {
							mDCrZDMJ = mDCrZDMJ + mJsydspListFullList.get(k).getmZDMJ();
						} else if ("划拨".equalsIgnoreCase(gyfs)) {
							mDHbZDMJ = mDHbZDMJ +  mJsydspListFullList.get(k).getmZDMJ();
						}
					}
					
					
					for (int i1 = k; i1 < mJsydspListFullList.size(); i1++) {
						if (!mJsydspListFullList.get(i1).isComparisoned()) {
							if ((null != xzqdm)
									&& (xzqdm.equalsIgnoreCase(mJsydspListFullList
											.get(i1).getXZQDM()))) {
								mJsydspListFullList.get(i1).setComparisoned(true);
								DjfzFull mTdydTjFullTT = mJsydspListFullList.get(i1);
								
								String djlxt = mTdydTjFullTT.getDJLX();
								String gyfst = mTdydTjFullTT.getGY_FS();
								if("初始登记".equalsIgnoreCase(djlxt))
								{
									mCount =  mCount + mTdydTjFullTT.getmCount();
									mZDMJ = mZDMJ + mTdydTjFullTT.getmZDMJ();
									if ("协议出让".equalsIgnoreCase(gyfst) || "招标".equalsIgnoreCase(gyfst) || "拍卖".equalsIgnoreCase(gyfst) || "挂牌".equalsIgnoreCase(gyfst)) {
										mCrZDMJ = mCrZDMJ + mTdydTjFullTT.getmZDMJ();
									} else if ("划拨".equalsIgnoreCase(gyfst)) {
										mHbZDMJ = mHbZDMJ +  mTdydTjFullTT.getmZDMJ();
									}
								}
								else if("变更登记".equalsIgnoreCase(djlxt))
								{
									mBCount =  mBCount + mTdydTjFullTT.getmCount();
									mBZDMJ = mBZDMJ + mTdydTjFullTT.getmZDMJ();
									if ("协议出让".equalsIgnoreCase(gyfst) || "招标".equalsIgnoreCase(gyfst) || "拍卖".equalsIgnoreCase(gyfst) || "挂牌".equalsIgnoreCase(gyfst)) {
										mBCrZDMJ = mBCrZDMJ + mTdydTjFullTT.getmZDMJ();
									} else if ("划拨".equalsIgnoreCase(gyfst)) {
										mBHbZDMJ = mBHbZDMJ +  mTdydTjFullTT.getmZDMJ();
									}
								}
								else if("抵押登记".equalsIgnoreCase(djlxt))
								{
									mDCount =  mDCount + mTdydTjFullTT.getmCount();
									mDZDMJ = mDZDMJ + mTdydTjFullTT.getmZDMJ();
									if ("协议出让".equalsIgnoreCase(gyfst) || "招标".equalsIgnoreCase(gyfst) || "拍卖".equalsIgnoreCase(gyfst) || "挂牌".equalsIgnoreCase(gyfst)) {
										mDCrZDMJ = mDCrZDMJ + mTdydTjFullTT.getmZDMJ();
									} else if ("划拨".equalsIgnoreCase(gyfst)) {
										mDHbZDMJ = mDHbZDMJ +  mTdydTjFullTT.getmZDMJ();
									}
								}
								
								
							}
						}
					}
					
					mJsydspListFull.setmCount(mCount);
					mJsydspListFull.setmZDMJ(mZDMJ);
					mJsydspListFull.setmCrZDMJ(mCrZDMJ);
					mJsydspListFull.setmHbZDMJ(mHbZDMJ);
					
					mJsydspListFull.setmBCount(mBCount);
					mJsydspListFull.setmBZDMJ(mBZDMJ);
					mJsydspListFull.setmBCrZDMJ(mBCrZDMJ);
					mJsydspListFull.setmBHbZDMJ(mBHbZDMJ);
					
					mJsydspListFull.setmDCount(mDCount);
					mJsydspListFull.setmDZDMJ(mDZDMJ);
					mJsydspListFull.setmDCrZDMJ(mDCrZDMJ);
					mJsydspListFull.setmDHbZDMJ(mDHbZDMJ);
					
					
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
				String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_DJFZXXB where XZQDM= '"
						+ mBcgdFull.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mBcgdFull.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		
		return mBcgdFull;
	}
}
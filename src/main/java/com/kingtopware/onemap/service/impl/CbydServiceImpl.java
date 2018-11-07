package com.kingtopware.onemap.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.framework.util.ConsoleUtils;
import com.kingtopware.framework.util.DateUtil;
import com.kingtopware.onemap.bean.CbydFull;
import com.kingtopware.onemap.bean.CbydListFull;
import com.kingtopware.onemap.dao.CbydDao;
import com.kingtopware.onemap.entity.CbydEntity;
import com.kingtopware.onemap.service.CbydService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月2日
 * @description：储备用地接口实现类
 * =====================================
 */

@Component
public class CbydServiceImpl extends BaseServiceImpl<CbydEntity> implements
		CbydService {
	@Resource
	public CbydDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public CbydServiceImpl() {
		tableName = "T_INF_ONEMAP_CBYDXXB";
	}

	public List<CbydListFull> getinfobyxkwd(String nf) {
		// TODO Auto-generated method stub

		List<CbydListFull> mCbydListFull = new ArrayList<CbydListFull>();
		List<CbydFull> mCbydFull = new ArrayList<CbydFull>();
		String userSql = "";
		String databasesql = "SELECT NF,XZQDM,count(*) ,sum(ZDMJ) as ZDMJ,sum(TDQDCB) as TDQDCB  FROM ";// T_INF_ONEMAP_CBYDXXB  group by NF,XZQMC order by NF ASC";
		String databasexzq = "";

		if (nf != null && !"".equalsIgnoreCase(nf)) {
			String[] nfs = nf.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_CBYDXXB where NF in (";
			if ((null != nfs) && (nfs.length > 0)) {
				for (int k = 0; k < nfs.length; k++) {
					if (k == (nfs.length - 1)) {
						text = text + "" + nfs[k] + "))";
					} else {
						text = text + "" + nfs[k] + ",";
					}

				}
			}

			ConsoleUtils.println("text = "  +  text);
			databasexzq = text + " A";
		} else {

			databasexzq = "T_INF_ONEMAP_CBYDXXB";
		}

		userSql = databasesql + databasexzq
				+ "  group by NF,XZQDM order by NF ASC";

		List<Object[]> t = getStatisticsBySql(userSql);

		int count = t.size();
		if (count < 1) {
			return mCbydListFull;
		}

		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}
			CbydFull mJsydspFull = new CbydFull();
			mJsydspFull.setNF(objects[0] != null ? Double.valueOf(objects[0]
					.toString()) : 0);
			mJsydspFull.setXZQDM(objects[1] != null ? objects[1].toString()
					: "");
			mJsydspFull.setCount(objects[2] != null ? Integer
					.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setZDMJ(objects[3] != null ? Double.valueOf(objects[3]
					.toString()) : 0);
			mJsydspFull.setTDQDCB(objects[4] != null ? Double
					.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mCbydFull.add(mJsydspFull);
		}

		ConsoleUtils.println("datasize = "  + mCbydFull.size());
		if ((null != mCbydFull) && (mCbydFull.size() > 0)) {
			for (int h = 0; h < mCbydFull.size(); h++) {
				String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_CBYDXXB where XZQDM= '"
						+ mCbydFull.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mCbydFull.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		if ((null != mCbydFull) && (mCbydFull.size() > 0)) {
			for (int k = 0; k < mCbydFull.size(); k++) {
				if (!mCbydFull.get(k).isComparisoned()) {

					CbydListFull mJsydspListFull = new CbydListFull();
					mJsydspListFull.setNF(mCbydFull.get(k).getNF());
					double xzqdm = mCbydFull.get(k).getNF();

					mCbydFull.get(k).setComparisoned(true);

					List<CbydFull> mJsydspFullListT = new ArrayList<CbydFull>();
					mJsydspFullListT.add(mCbydFull.get(k));
					for (int i1 = k; i1 < mCbydFull.size(); i1++) {
						if (!mCbydFull.get(i1).isComparisoned()) {
							if ((0 != xzqdm)
									&& (xzqdm == mCbydFull.get(i1).getNF())) {
								mCbydFull.get(i1).setComparisoned(true);
								mJsydspFullListT.add(mCbydFull.get(i1));
							}
						}
					}
					mJsydspListFull.setmCbydFull(mJsydspFullListT);
					mCbydListFull.add(mJsydspListFull);
				}
			}
		}

		if ((null != mCbydListFull) && (mCbydListFull.size() > 0)) {
			for (int m = 0; m < mCbydListFull.size(); m++) {
				CbydFull mCbydFullJ = new CbydFull();
				mCbydFullJ.setNF(mCbydListFull.get(m).getNF());
				mCbydFullJ.setXZQDM("全部");
				List<CbydFull> mCbydFullT = mCbydListFull.get(m).getmCbydFull();
				if ((null != mCbydFullT) && (mCbydFullT.size() > 0)) {

					int countM = 0;
					double ZDMJM = 0;
					double TDQDCBM = 0;
					for (int n = 0; n < mCbydFullT.size(); n++) {
						countM = countM + mCbydFullT.get(n).getCount();
						ZDMJM = ZDMJM + mCbydFullT.get(n).getZDMJ();
						TDQDCBM = TDQDCBM + mCbydFullT.get(n).getTDQDCB();
					}
					mCbydFullJ.setZDMJ(ZDMJM);
					mCbydFullJ.setCount(countM);
					mCbydFullJ.setTDQDCB(TDQDCBM);
				}
				mCbydListFull.get(m).getmCbydFull().add(mCbydFullJ);

			}

		}

		return mCbydListFull;

	}

	public List<CbydFull> getinfobyxzq(String starttime, String endtime) {
		// TODO Auto-generated method stub


		List<CbydFull> mJsydspListFullList = new ArrayList<CbydFull>();
		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;

		String databasesql = "SELECT XZQDM,count(*) ,sum(ZDMJ) as ZDMJ,sum(TDQDCB) as TDQDCB FROM (SELECT * FROM T_INF_ONEMAP_CBYDXXB  order by RCSJ ASC) A ";

		if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
			mEndtime = DateUtil.getCurrentDate();
			timesql = " where RCSJ between '" + mStarttime + "' and '"
					+ mEndtime;
		} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
			timesql = " where RCSJ <= '" + mEndtime;
		} else {
			timesql = " where RCSJ between '" + mStarttime + "' and '"
					+ mEndtime;
		}

		userSql = databasesql + timesql + "'  group by XZQDM";

		List<Object[]> t = getStatisticsBySql(userSql);

		int count = t.size();
		if (count < 1) {
			return mJsydspListFullList;
		}
		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}
			CbydFull mJsydspFull = new CbydFull();
			mJsydspFull.setSTARTTIME(starttime);
			mJsydspFull.setENDTIME(endtime);
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString()
					: "");
			mJsydspFull.setCount(objects[1] != null ? Integer
					.valueOf(objects[1].toString()) : 0);
			mJsydspFull.setZDMJ(objects[2] != null ? Double.valueOf(objects[2]
					.toString()) : 0);
			mJsydspFull.setTDQDCB(objects[3] != null ? Double
					.valueOf(objects[3].toString()) : 0);
			mJsydspListFullList.add(mJsydspFull);
		}
		ConsoleUtils.println("datasize = " + mJsydspListFullList.size());
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int h = 0; h < mJsydspListFullList.size(); h++) {
				String userSqlget = "SELECT distinct XZQMC FROM T_INF_ONEMAP_CBYDXXB where XZQDM= '"
						+ mJsydspListFullList.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mJsydspListFullList.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		return mJsydspListFullList;
	}

}
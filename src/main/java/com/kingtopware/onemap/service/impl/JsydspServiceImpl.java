package com.kingtopware.onemap.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.framework.util.ConsoleUtils;
import com.kingtopware.framework.util.DateUtil;
import com.kingtopware.framework.util.PropertyUtil;
import com.kingtopware.framework.util.StringUtil;
import com.kingtopware.onemap.bean.JsydSphjListFull;
import com.kingtopware.onemap.bean.JsydspFull;
import com.kingtopware.onemap.bean.JsydspGhFull;
import com.kingtopware.onemap.bean.JsydspGhListFull;
import com.kingtopware.onemap.bean.JsydspGhyt;
import com.kingtopware.onemap.bean.JsydspListFull;
import com.kingtopware.onemap.bean.JsydspNa;
import com.kingtopware.onemap.dao.JsydspDao;
import com.kingtopware.onemap.entity.JsydspEntity;
import com.kingtopware.onemap.service.JsydspService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年8月30日
 * @description：建设用地审批接口实现类
 * =====================================
 */
@Component
public class JsydspServiceImpl extends BaseServiceImpl<JsydspEntity> implements JsydspService {
	@Resource
	public JsydspDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public JsydspServiceImpl() {
		tableName = "T_INF_ONEMAP_JSYDSPXXB";
	}

	public JsydspEntity GetBybusiness(String guid) {
		JsydspEntity jsydsp = dao.findOne(guid);
		return jsydsp;
	}

	public List<JsydspListFull> getInfoByyd(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub
		List<JsydspListFull> mJsydspListFullList = new ArrayList<JsydspListFull>();

		String fullname = PropertyUtil.get("fullname");

		String tjall = fullname;

		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;

		boolean isHasAll = false;

		String databasesql = "SELECT XZQDM,PZ_JB,sum(PZ_XM_MJ) as PZ_XM_MJ,sum(XZ_JSYD_MJ) as XZ_JSYD_MJ,sum(PZ_NYD_MJ) as PZ_NYD_MJ,sum(PZ_GD_MJ) as PZ_GD_MJ,sum(PZ_WLYD_MJ) as PZ_WLYD_MJ,sum(CL_JSYD_MJ) as CL_JSYD_MJ FROM ";
		String dataallsql = "SELECT PZ_JB,sum(PZ_XM_MJ) as PZ_XM_MJ,sum(XZ_JSYD_MJ) as XZ_JSYD_MJ,sum(PZ_NYD_MJ) as PZ_NYD_MJ,sum(PZ_GD_MJ) as PZ_GD_MJ,sum(PZ_WLYD_MJ) as PZ_WLYD_MJ,sum(CL_JSYD_MJ) as CL_JSYD_MJ FROM  T_INF_ONEMAP_JSYDSPXXB";

		String databasexzq = "";

		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_JSYDSPXXB where XZQMC in (";
			if ((null != nfs) && (nfs.length > 0)) {
				isHasAll = StringUtil.isHave(nfs, tjall);
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

			databasexzq = "T_INF_ONEMAP_JSYDSPXXB";
		}

		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		} else {
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where PZRQ between '" + mStarttime + "' and '" + mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where PZRQ <= '" + mEndtime + "'";

			} else {
				timesql = " where PZRQ between '" + mStarttime + "' and '" + mEndtime + "'";

			}
		}

		userSql = databasesql + databasexzq + timesql + "  group by XZQDM,PZ_JB";

		String userallSql = dataallsql + timesql + " group by PZ_JB";

		List<Object[]> t = getStatisticsBySql(userSql);

		List<Object[]> tq = new ArrayList<Object[]>();

		int countq = 0;

		if (isHasAll) {
			tq = getStatisticsBySql(userallSql);
			countq = tq.size();
		}

		int count = t.size();
		if ((count < 1) && (countq < 1)) {
			return mJsydspListFullList;
		}

		List<JsydspFull> mJsydspFullList = new ArrayList<JsydspFull>();

		if (isHasAll) {
			for (int m = 0; m < countq; m++) {
				Object[] objects = tq.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				JsydspFull mJsydspFull = new JsydspFull();
				mJsydspFull.setXZQDM(tjall);
				mJsydspFull.setXZQMC(tjall);
				mJsydspFull.setPZ_DW(objects[0] != null ? objects[0].toString() : "");
				mJsydspFull.setPZ_XM_MJ(objects[1] != null ? Double.valueOf(objects[1].toString()) : 0);
				mJsydspFull.setXZ_JSYD_MJ(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
				mJsydspFull.setPZ_NYD_MJ(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
				mJsydspFull.setPZ_GD_MJ(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
				mJsydspFull.setPZ_WLYD_MJ(objects[5] != null ? Double.valueOf(objects[5].toString()) : 0);
				mJsydspFull.setCL_JSYD_MJ(objects[6] != null ? Double.valueOf(objects[6].toString()) : 0);
				mJsydspFull.setComparisoned(false);
				mJsydspFullList.add(mJsydspFull);
			}
		}

		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}
			JsydspFull mJsydspFull = new JsydspFull();
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString() : "");
			mJsydspFull.setPZ_DW(objects[1] != null ? objects[1].toString() : "");
			mJsydspFull.setPZ_XM_MJ(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setXZ_JSYD_MJ(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
			mJsydspFull.setPZ_NYD_MJ(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setPZ_GD_MJ(objects[5] != null ? Double.valueOf(objects[5].toString()) : 0);
			mJsydspFull.setPZ_WLYD_MJ(objects[6] != null ? Double.valueOf(objects[6].toString()) : 0);
			mJsydspFull.setCL_JSYD_MJ(objects[7] != null ? Double.valueOf(objects[7].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mJsydspFullList.add(mJsydspFull);
		}
		ConsoleUtils.println("datasize = " + mJsydspFullList.size());

		if ((null != mJsydspFullList) && (mJsydspFullList.size() > 0)) {
			for (int k = 0; k < mJsydspFullList.size(); k++) {
				if (!mJsydspFullList.get(k).isComparisoned()) {

					JsydspListFull mJsydspListFull = new JsydspListFull();
					mJsydspListFull.setXZQDM(mJsydspFullList.get(k).getXZQDM());
					mJsydspListFull.setSTART_TIME(starttime);
					mJsydspListFull.setEND_TIME(endtime);

					String xzqdm = mJsydspFullList.get(k).getXZQDM();

					mJsydspFullList.get(k).setComparisoned(true);

					List<JsydspFull> mJsydspFullListT = new ArrayList<JsydspFull>();
					mJsydspFullListT.add(mJsydspFullList.get(k));
					for (int i1 = k; i1 < mJsydspFullList.size(); i1++) {
						if (!mJsydspFullList.get(i1).isComparisoned()) {
							if ((null != xzqdm) && (xzqdm.equalsIgnoreCase(mJsydspFullList.get(i1).getXZQDM()))) {
								mJsydspFullList.get(i1).setComparisoned(true);
								mJsydspFullListT.add(mJsydspFullList.get(i1));
							}
						}
					}
					// mJsydspListFull.setmJsydspFull(mJsydspFullListT);
					if ((null != mJsydspFullListT) && (mJsydspFullListT.size() > 0)) {
						double PZ_XM_MJ = 0;
						double XZ_JSYD_MJ = 0;
						double PZ_NYD_MJ = 0;
						double PZ_GD_MJ = 0;
						double PZ_WLYD_MJ = 0;
						double CL_JSYD_MJ = 0;
						for (int n = 0; n < mJsydspFullListT.size(); n++) {
							String PZ_JB = mJsydspFullListT.get(n).getPZ_DW();
							if (TextUtils.isEmpty(PZ_JB)) {
								continue;
							}
							if ("省政府".equalsIgnoreCase(PZ_JB)) {
								mJsydspListFull.setS_PZ_XM_MJ(mJsydspFullListT.get(n).getPZ_XM_MJ());
								mJsydspListFull.setS_XZ_JSYD_MJ(mJsydspFullListT.get(n).getXZ_JSYD_MJ());
								mJsydspListFull.setS_PZ_NYD_MJ(mJsydspFullListT.get(n).getPZ_NYD_MJ());
								mJsydspListFull.setS_PZ_GD_MJ(mJsydspFullListT.get(n).getPZ_GD_MJ());
								mJsydspListFull.setS_PZ_WLYD_MJ(mJsydspFullListT.get(n).getPZ_WLYD_MJ());
								mJsydspListFull.setS_CL_JSYD_MJ(mJsydspFullListT.get(n).getCL_JSYD_MJ());

							} else if ("国务院".equalsIgnoreCase(PZ_JB)) {
								mJsydspListFull.setG_PZ_XM_MJ(mJsydspFullListT.get(n).getPZ_XM_MJ());
								mJsydspListFull.setG_XZ_JSYD_MJ(mJsydspFullListT.get(n).getXZ_JSYD_MJ());
								mJsydspListFull.setG_PZ_NYD_MJ(mJsydspFullListT.get(n).getPZ_NYD_MJ());
								mJsydspListFull.setG_PZ_GD_MJ(mJsydspFullListT.get(n).getPZ_GD_MJ());
								mJsydspListFull.setG_PZ_WLYD_MJ(mJsydspFullListT.get(n).getPZ_WLYD_MJ());
								mJsydspListFull.setG_CL_JSYD_MJ(mJsydspFullListT.get(n).getCL_JSYD_MJ());
							}

							PZ_XM_MJ = PZ_XM_MJ + mJsydspFullListT.get(n).getPZ_XM_MJ();
							XZ_JSYD_MJ = XZ_JSYD_MJ + mJsydspFullListT.get(n).getXZ_JSYD_MJ();
							PZ_NYD_MJ = PZ_NYD_MJ + mJsydspFullListT.get(n).getPZ_NYD_MJ();
							PZ_GD_MJ = PZ_GD_MJ + mJsydspFullListT.get(n).getPZ_GD_MJ();
							PZ_WLYD_MJ = PZ_WLYD_MJ + mJsydspFullListT.get(n).getPZ_WLYD_MJ();
							CL_JSYD_MJ = CL_JSYD_MJ + mJsydspFullListT.get(n).getCL_JSYD_MJ();

							// mJsydspListFull.setPZ_XM_MJ(PZ_XM_MJ);
							// mJsydspListFull.setXZ_JSYD_MJ(XZ_JSYD_MJ);
							// mJsydspListFull.setPZ_NYD_MJ(PZ_NYD_MJ);
							// mJsydspListFull.setPZ_GD_MJ(PZ_GD_MJ);
							// mJsydspListFull.setPZ_WLYD_MJ(PZ_WLYD_MJ);
							// mJsydspListFull.setCL_JSYD_MJ(CL_JSYD_MJ);

						}

						mJsydspListFull.setPZ_XM_MJ(PZ_XM_MJ);
						mJsydspListFull.setXZ_JSYD_MJ(XZ_JSYD_MJ);
						mJsydspListFull.setPZ_NYD_MJ(PZ_NYD_MJ);
						mJsydspListFull.setPZ_GD_MJ(PZ_GD_MJ);
						mJsydspListFull.setPZ_WLYD_MJ(PZ_WLYD_MJ);
						mJsydspListFull.setCL_JSYD_MJ(CL_JSYD_MJ);
					}
					mJsydspListFullList.add(mJsydspListFull);
				}
			}
		}
		ConsoleUtils.println("datasize1 = " + mJsydspListFullList.size());
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int h = 0; h < mJsydspListFullList.size(); h++) {
				if (tjall.equalsIgnoreCase(mJsydspListFullList.get(h).getXZQDM())) {
					mJsydspListFullList.get(h).setXZQMC(mJsydspListFullList.get(h).getXZQMC());
					continue;
				}
				String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_JSYDSPXXB where XZQDM= '"
						+ mJsydspListFullList.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mJsydspListFullList.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		return mJsydspListFullList;
	}

	public List<JsydSphjListFull> getInfoByys(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub
		String fullname = PropertyUtil.get("fullname");
		String tjall = fullname;

		List<JsydSphjListFull> mJsydspListFullList = new ArrayList<JsydSphjListFull>();
		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;
		boolean isHasAll = false;

		String databasesql = "SELECT XZQDM,sum(PZ_XM_MJ) as PZ_XM_MJ,sum(XZ_JSYD_MJ) as XZ_JSYD_MJ,sum(PZ_NYD_MJ) as PZ_NYD_MJ,sum(PZ_GD_MJ) as PZ_GD_MJ,sum(PZ_WLYD_MJ) as PZ_WLYD_MJ,sum(CL_JSYD_MJ) as CL_JSYD_MJ,sum(PZ_JBNT_MJ) as PZ_JBNT_MJ,sum(PZ_LD_MJ) as PZ_LD_MJ,sum(PZ_YD_MJ) as PZ_YD_MJ,sum(PZ_QTNYD_MJ) as PZ_QTNYD_MJ FROM ";
		String dataallsql = "SELECT  sum(PZ_XM_MJ) as PZ_XM_MJ,sum(XZ_JSYD_MJ) as XZ_JSYD_MJ,sum(PZ_NYD_MJ) as PZ_NYD_MJ,sum(PZ_GD_MJ) as PZ_GD_MJ,sum(PZ_WLYD_MJ) as PZ_WLYD_MJ,sum(CL_JSYD_MJ) as CL_JSYD_MJ,sum(PZ_JBNT_MJ) as PZ_JBNT_MJ,sum(PZ_LD_MJ) as PZ_LD_MJ,sum(PZ_YD_MJ) as PZ_YD_MJ,sum(PZ_QTNYD_MJ) as PZ_QTNYD_MJ FROM  T_INF_ONEMAP_JSYDSPXXB ";

		String databasexzq = "";

		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_JSYDSPXXB where XZQMC in (";
			if ((null != nfs) && (nfs.length > 0)) {
				isHasAll = StringUtil.isHave(nfs, tjall);
				for (int k = 0; k < nfs.length; k++) {
					if (k == (nfs.length - 1)) {
						text = text + "'" + nfs[k] + "'))";
					} else {
						text = text + "'" + nfs[k] + "',";
					}

				}
			}

			ConsoleUtils.println("text" + text);
			databasexzq = text + " A";
		} else {

			databasexzq = "T_INF_ONEMAP_JSYDSPXXB";
		}

		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		} else {
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where PZRQ between '" + mStarttime + "' and '" + mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where PZRQ <= '" + mEndtime + "'";

			} else {
				timesql = " where PZRQ between '" + mStarttime + "' and '" + mEndtime + "'";

			}
		}

		userSql = databasesql + databasexzq + timesql + "  group by XZQDM";

		String userallSql = dataallsql + timesql + "";
		List<Object[]> t = getStatisticsBySql(userSql);

		List<Object[]> tq = new ArrayList<Object[]>();

		int countq = 0;

		if (isHasAll) {
			tq = getStatisticsBySql(userallSql);
			countq = tq.size();
		}

		if (isHasAll) {
			tq = getStatisticsBySql(userallSql);
			countq = tq.size();
		}

		int count = t.size();
		if ((count < 1) && (countq < 1)) {
			// if (count < 1 ) {
			return mJsydspListFullList;
		}

		// List<JsydspFull> mJsydspFullList = new ArrayList<JsydspFull>();

		if (isHasAll) {
			for (int m = 0; m < countq; m++) {
				Object[] objects = tq.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				JsydSphjListFull mJsydspFull = new JsydSphjListFull();
				mJsydspFull.setSTART_TIME(starttime);
				mJsydspFull.setEND_TIME(endtime);
				mJsydspFull.setXZQDM(tjall);
				mJsydspFull.setXZQMC(tjall);
				mJsydspFull.setPZ_XM_MJ(objects[0] != null ? Double.valueOf(objects[0].toString()) : 0);
				mJsydspFull.setXZ_JSYD_MJ(objects[1] != null ? Double.valueOf(objects[1].toString()) : 0);
				mJsydspFull.setPZ_NYD_MJ(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
				mJsydspFull.setPZ_GD_MJ(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
				mJsydspFull.setPZ_WLYD_MJ(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
				mJsydspFull.setCL_JSYD_MJ(objects[5] != null ? Double.valueOf(objects[5].toString()) : 0);
				mJsydspFull.setPZ_JBNT_MJ(objects[6] != null ? Double.valueOf(objects[6].toString()) : 0);
				mJsydspFull.setPZ_LD_MJ(objects[7] != null ? Double.valueOf(objects[7].toString()) : 0);
				mJsydspFull.setPZ_YD_MJ(objects[8] != null ? Double.valueOf(objects[8].toString()) : 0);
				mJsydspFull.setPZ_QTNYD_MJ(objects[9] != null ? Double.valueOf(objects[9].toString()) : 0);
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
			JsydSphjListFull mJsydspFull = new JsydSphjListFull();
			mJsydspFull.setSTART_TIME(starttime);
			mJsydspFull.setEND_TIME(endtime);
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString() : "");
			mJsydspFull.setPZ_XM_MJ(objects[1] != null ? Double.valueOf(objects[1].toString()) : 0);
			mJsydspFull.setXZ_JSYD_MJ(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setPZ_NYD_MJ(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
			mJsydspFull.setPZ_GD_MJ(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setPZ_WLYD_MJ(objects[5] != null ? Double.valueOf(objects[5].toString()) : 0);
			mJsydspFull.setCL_JSYD_MJ(objects[6] != null ? Double.valueOf(objects[6].toString()) : 0);
			mJsydspFull.setPZ_JBNT_MJ(objects[7] != null ? Double.valueOf(objects[7].toString()) : 0);
			mJsydspFull.setPZ_LD_MJ(objects[8] != null ? Double.valueOf(objects[8].toString()) : 0);
			mJsydspFull.setPZ_YD_MJ(objects[9] != null ? Double.valueOf(objects[9].toString()) : 0);
			mJsydspFull.setPZ_QTNYD_MJ(objects[10] != null ? Double.valueOf(objects[10].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mJsydspListFullList.add(mJsydspFull);
		}
		ConsoleUtils.println("datasize = " + mJsydspListFullList.size());
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int h = 0; h < mJsydspListFullList.size(); h++) {
				if (tjall.equalsIgnoreCase(mJsydspListFullList.get(h).getXZQDM())) {
					continue;
				}

				String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_JSYDSPXXB where XZQDM= '"
						+ mJsydspListFullList.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mJsydspListFullList.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		return mJsydspListFullList;
	}

	public List<JsydspGhyt> getInfoByghyt(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub
		String fullname = PropertyUtil.get("fullname");
		String tjall = fullname;
		List<JsydspGhyt> mJsydspGhytB = new ArrayList<JsydspGhyt>();

		List<JsydspGhListFull> mJsydspListFullList = new ArrayList<JsydspGhListFull>();

		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;

		boolean isHasAll = false;

		String databasesql = "SELECT XZQDM,YD_LX,sum(PZ_XM_MJ) as PZ_XM_MJ  FROM ";

		String dataallsql = "SELECT YD_LX,sum(PZ_XM_MJ) as PZ_XM_MJ  FROM T_INF_ONEMAP_JSYDSPXXB";

		String databasexzq = "";

		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_JSYDSPXXB where XZQMC in (";
			if ((null != nfs) && (nfs.length > 0)) {
				isHasAll = StringUtil.isHave(nfs, tjall);
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

			databasexzq = "T_INF_ONEMAP_JSYDSPXXB";
		}

		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		} else {
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where PZRQ between '" + mStarttime + "' and '" + mEndtime + "'";

			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where PZRQ <= '" + mEndtime + "'";
			} else {
				timesql = " where PZRQ between '" + mStarttime + "' and '" + mEndtime + "'";
			}
		}

		userSql = databasesql + databasexzq + timesql + "  group by XZQDM,YD_LX";

		String userallSql = dataallsql + timesql + "  group by YD_LX";

		List<Object[]> t = getStatisticsBySql(userSql);

		List<Object[]> tq = new ArrayList<Object[]>();

		int countq = 0;

		if (isHasAll) {
			tq = getStatisticsBySql(userallSql);
			countq = tq.size();
		}

		int count = t.size();
		if ((count < 1) && (countq < 1)) {
			// if (count < 1 ) {
			return mJsydspGhytB;
		}

		List<JsydspGhFull> mJsydspFullList = new ArrayList<JsydspGhFull>();

		if (isHasAll) {
			for (int m = 0; m < countq; m++) {
				Object[] objects = tq.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				JsydspGhFull mJsydspFull = new JsydspGhFull();
				mJsydspFull.setXZQDM(tjall);
				mJsydspFull.setYD_LX(objects[0] != null ? objects[0].toString() : "");
				mJsydspFull.setZM(objects[1] != null ? Double.valueOf(objects[1].toString()) : 0);
				mJsydspFull.setComparisoned(false);
				mJsydspFullList.add(mJsydspFull);
			}
		}

		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}
			JsydspGhFull mJsydspFull = new JsydspGhFull();
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString() : "");
			mJsydspFull.setYD_LX(objects[1] != null ? objects[1].toString() : "");
			mJsydspFull.setZM(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mJsydspFullList.add(mJsydspFull);
		}
		ConsoleUtils.println("dataxize = " + mJsydspFullList.size());

		if ((null != mJsydspFullList) && (mJsydspFullList.size() > 0)) {
			for (int k = 0; k < mJsydspFullList.size(); k++) {
				if (!mJsydspFullList.get(k).isComparisoned()) {
					double xzqmj = 0.0;
					JsydspGhListFull mJsydspListFull = new JsydspGhListFull();
					mJsydspListFull.setXZQDM(mJsydspFullList.get(k).getXZQDM());

					xzqmj = xzqmj + mJsydspFullList.get(k).getZM();
					String xzqdm = mJsydspFullList.get(k).getXZQDM();
					mJsydspFullList.get(k).setComparisoned(true);

					List<JsydspGhFull> mJsydspFullListT = new ArrayList<JsydspGhFull>();
					mJsydspFullListT.add(mJsydspFullList.get(k));
					for (int i1 = k; i1 < mJsydspFullList.size(); i1++) {
						if (!mJsydspFullList.get(i1).isComparisoned()) {
							if ((null != xzqdm) && (xzqdm.equalsIgnoreCase(mJsydspFullList.get(i1).getXZQDM()))) {
								xzqmj = xzqmj + mJsydspFullList.get(i1).getZM();
								mJsydspFullList.get(i1).setComparisoned(true);
								mJsydspFullListT.add(mJsydspFullList.get(i1));
							}
						}
					}
					mJsydspListFull.setmJsydspFull(mJsydspFullListT);
					mJsydspListFull.setSPHJ_MJ(xzqmj);
					mJsydspListFullList.add(mJsydspListFull);
				}
			}
		}
		ConsoleUtils.println("dataxize1 = " + mJsydspListFullList.size());
		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int h = 0; h < mJsydspListFullList.size(); h++) {
				if (tjall.equalsIgnoreCase(mJsydspListFullList.get(h).getXZQDM())) {
					mJsydspListFullList.get(h).setXZQMC(mJsydspListFullList.get(h).getXZQMC());
					continue;
				}

				String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_JSYDSPXXB where XZQDM= '"
						+ mJsydspListFullList.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mJsydspListFullList.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		String[] sfyd = new String[] { "商服用地" };
		String[] gkccyd = new String[] { "工矿仓储用地" };
		String[] zzyd = new String[] { "廉租住房", "公共租赁住房", "城市棚户区", "国有工矿棚户区", "国有林区棚户区及国有林场危房", "国有垦区危房", "中央下放地方煤矿棚户区",
				"经济适用住房", "限价商品住房", "其他保障性住房", "安置用地", "其他住宅用地" };
		String[] slzf = new String[] { "经济适用住房", "公共租赁住房", "城市棚户区" };
		String[] jtysyd = new String[] { "交通运输用地" };
		String[] slssyd = new String[] { "水域及水利设施用地" };

		String databasesql1 = "SELECT sum(PZ_XM_MJ) as PZ_XM_MJ  FROM  T_INF_ONEMAP_JSYDSPXXB";

		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int j = 0; j < mJsydspListFullList.size(); j++) {
				JsydspGhListFull mJsydspGhListFullT = new JsydspGhListFull();
				mJsydspGhListFullT = mJsydspListFullList.get(j);
				List<JsydspGhFull> mJsydspFullT = mJsydspGhListFullT.getmJsydspFull();
				if ((null != mJsydspFullT) && (mJsydspFullT.size() > 0)) {
					for (int k = 0; k < mJsydspFullT.size(); k++) {
						double zmj = mJsydspFullT.get(k).getZM();
						String ydlx = mJsydspFullT.get(k).getYD_LX();
						String xzqdm = mJsydspFullT.get(k).getXZQDM();
						if ("圈内用地".equalsIgnoreCase(mJsydspFullT.get(k).getYD_LX())) {
							// 获取商服用地面积
							String databasexzq1 = "";
							databasexzq1 = getsql(sfyd);
							String ydghsql = "";
							if (tjall.equalsIgnoreCase(xzqdm)) {
								ydghsql = databasesql1 + timesql + "  and YD_LX='" + ydlx + "' and " + databasexzq1;
							} else {
								ydghsql = databasesql1 + timesql + "  and YD_LX='" + ydlx + "'  and XZQDM='" + xzqdm
										+ "' and " + databasexzq1;
							}
							String xzqmc = getAttributesBySql(ydghsql);
							double sfmj = xzqmc != null ? Double.valueOf(xzqmc) : 0;
							mJsydspFullT.get(k).setSJ_MJ(sfmj);
							// 获取工矿仓储面积
							databasexzq1 = "";
							databasexzq1 = getsql(gkccyd);
							String ydghsqlgk = "";
							if (tjall.equalsIgnoreCase(xzqdm)) {
								ydghsqlgk = databasesql1 + timesql + "  and YD_LX='" + ydlx + "' and " + databasexzq1;
							} else {
								ydghsqlgk = databasesql1 + timesql + "  and YD_LX='" + ydlx + "'  and XZQDM='" + xzqdm
										+ "' and " + databasexzq1;
							}
							String xzqmcgk = getAttributesBySql(ydghsqlgk);
							double gsmj = xzqmcgk != null ? Double.valueOf(xzqmcgk) : 0;
							mJsydspFullT.get(k).setGS_MJ(gsmj);
							// 获取住宅用地面积
							databasexzq1 = "";
							databasexzq1 = getsql(zzyd);

							String ydghsqlzz = "";
							if (tjall.equalsIgnoreCase(xzqdm)) {
								ydghsqlzz = databasesql1 + timesql + "  and YD_LX='" + ydlx + "' and " + databasexzq1;
							} else {
								ydghsqlzz = databasesql1 + timesql + "  and YD_LX='" + ydlx + "'  and XZQDM='" + xzqdm
										+ "' and " + databasexzq1;
							}
							String xzqmczz = getAttributesBySql(ydghsqlzz);
							double zzzmj = xzqmczz != null ? Double.valueOf(xzqmczz) : 0;
							mJsydspFullT.get(k).setZZ_ZMJ(zzzmj);
							// 三类住房面积
							databasexzq1 = "";
							databasexzq1 = getsql(slzf);
							String ydghsqlsl = "";
							if (tjall.equalsIgnoreCase(xzqdm)) {
								ydghsqlsl = databasesql1 + timesql + "  and YD_LX='" + ydlx + "' and " + databasexzq1;
							} else {
								ydghsqlsl = databasesql1 + timesql + "  and YD_LX='" + ydlx + "'  and XZQDM='" + xzqdm
										+ "' and " + databasexzq1;
							}
							String xzqmcsl = getAttributesBySql(ydghsqlsl);
							double slzfmj = xzqmcsl != null ? Double.valueOf(xzqmcsl) : 0;
							mJsydspFullT.get(k).setSLZF_MJ(slzfmj);
							// 其他面积
							double qtmj = zmj - sfmj - gsmj - zzzmj;
							mJsydspFullT.get(k).setQT_MJ(qtmj);

						} else if ("单独选址".equalsIgnoreCase(mJsydspFullT.get(k).getYD_LX())) {
							// 交通运输用地面积
							String databasexzq2 = "";
							databasexzq2 = getsql(jtysyd);
							String ydghsqljtys = "";
							if (tjall.equalsIgnoreCase(xzqdm)) {
								ydghsqljtys = databasesql1 + timesql + "  and YD_LX='" + ydlx + "' and " + databasexzq2;
							} else {
								ydghsqljtys = databasesql1 + timesql + "  and YD_LX='" + ydlx + "'  and XZQDM='" + xzqdm
										+ "' and " + databasexzq2;
							}
							String xzqmcjtys = getAttributesBySql(ydghsqljtys);
							double jtysmj = xzqmcjtys != null ? Double.valueOf(xzqmcjtys) : 0;
							mJsydspFullT.get(k).setSJ_MJ(jtysmj);
							// 水利设施用地面积
							databasexzq2 = "";
							databasexzq2 = getsql(slssyd);
							String ydghsqlgk = "";
							if (tjall.equalsIgnoreCase(xzqdm)) {
								ydghsqlgk = databasesql1 + timesql + "  and YD_LX='" + ydlx + "' and " + databasexzq2;
							} else {
								ydghsqlgk = databasesql1 + timesql + "  and YD_LX='" + ydlx + "'  and XZQDM='" + xzqdm
										+ "' and " + databasexzq2;
							}
							String xzqmcsl = getAttributesBySql(ydghsqlgk);
							double slssmj = xzqmcsl != null ? Double.valueOf(xzqmcsl) : 0;
							mJsydspFullT.get(k).setGS_MJ(slssmj);
							// 其他面积
							double qtmj = zmj - jtysmj - slssmj;
							mJsydspFullT.get(k).setQT_MJ(qtmj);
						}
					}
				}
			}
		}

		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int i = 0; i < mJsydspListFullList.size(); i++) {
				JsydspGhyt mJsydspGhyt = new JsydspGhyt();
				mJsydspGhyt.setSTART_TIME(starttime);
				mJsydspGhyt.setEND_TIME(endtime);
				mJsydspGhyt.setXZQMC(mJsydspListFullList.get(i).getXZQMC());
				mJsydspGhyt.setXZQDM(mJsydspListFullList.get(i).getXZQDM());
				mJsydspGhyt.setSPHE_MJ(mJsydspListFullList.get(i).getSPHJ_MJ());

				JsydspGhListFull mJsydspGhListFullT = new JsydspGhListFull();
				mJsydspGhListFullT = mJsydspListFullList.get(i);
				List<JsydspGhFull> mJsydspFullT = mJsydspGhListFullT.getmJsydspFull();
				if ((null != mJsydspFullT) && (mJsydspFullT.size() > 0)) {
					for (int k = 0; k < mJsydspFullT.size(); k++) {
						if ("圈内用地".equalsIgnoreCase(mJsydspFullT.get(k).getYD_LX())) {
							mJsydspGhyt.setQN_ZMJ(mJsydspFullT.get(k).getZM());
							mJsydspGhyt.setQN_SFYD_MJ(mJsydspFullT.get(k).getSJ_MJ());
							mJsydspGhyt.setQN_GKCC_MJ(mJsydspFullT.get(k).getGS_MJ());
							mJsydspGhyt.setQN_ZZ_ZMJ(mJsydspFullT.get(k).getZZ_ZMJ());
							mJsydspGhyt.setQN_SLZF_MJ(mJsydspFullT.get(k).getSLZF_MJ());
							mJsydspGhyt.setQN_QT(mJsydspFullT.get(k).getQT_MJ());
						} else if ("单独选址".equalsIgnoreCase(mJsydspFullT.get(k).getYD_LX())) {
							mJsydspGhyt.setDX_ZMJ(mJsydspFullT.get(k).getZM());
							mJsydspGhyt.setDX_JTYS_MJ(mJsydspFullT.get(k).getSJ_MJ());
							mJsydspGhyt.setDX_SLSS_MJ(mJsydspFullT.get(k).getGS_MJ());
							mJsydspGhyt.setDX_QT_MJ(mJsydspFullT.get(k).getQT_MJ());
						}
					}

				}

				mJsydspGhytB.add(mJsydspGhyt);
			}
		}

		return mJsydspGhytB;

	}

	public List<JsydspNa> getInfoByNa(String year) {
		// TODO Auto-generated method stub

		List<JsydspNa> mJsydspNaList = new ArrayList<JsydspNa>();

		List<JsydspListFull> mJsydspListFullList = new ArrayList<JsydspListFull>();

		String userSql = "";

		String databasesql = "SELECT NF,PZ_JB,sum(PZ_XM_MJ) as PZ_XM_MJ,sum(XZ_JSYD_MJ) as XZ_JSYD_MJ,sum(PZ_NYD_MJ) as PZ_NYD_MJ,sum(PZ_GD_MJ) as PZ_GD_MJ,sum(PZ_WLYD_MJ) as PZ_WLYD_MJ,sum(CL_JSYD_MJ) as CL_JSYD_MJ FROM ";

		String databasexzq = "";

		if (year != null && !"".equalsIgnoreCase(year)) {
			String[] nfs = year.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_JSYDSPXXB where NF in (";
			if ((null != nfs) && (nfs.length > 0)) {
				for (int k = 0; k < nfs.length; k++) {
					if (k == (nfs.length - 1)) {
						text = text + "" + nfs[k] + "))";
					} else {
						text = text + "" + nfs[k] + ",";
					}

				}
			}

			ConsoleUtils.println("text = " + text);
			databasexzq = text + " A";
		} else {

			databasexzq = "T_INF_ONEMAP_JSYDSPXXB";
		}

		userSql = databasesql + databasexzq + " group by NF ,PZ_JB";

		List<Object[]> t = getStatisticsBySql(userSql);

		int count = t.size();
		if ((count < 1)) {
			return mJsydspNaList;
		}

		List<JsydspFull> mJsydspFullList = new ArrayList<JsydspFull>();

		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				// return mJsydspListFullList;
				continue;
			}
			JsydspFull mJsydspFull = new JsydspFull();
			mJsydspFull.setXZQDM(objects[0] != null ? objects[0].toString() : "");// 表示年份
			mJsydspFull.setPZ_DW(objects[1] != null ? objects[1].toString() : "");
			mJsydspFull.setPZ_XM_MJ(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
			mJsydspFull.setXZ_JSYD_MJ(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
			mJsydspFull.setPZ_NYD_MJ(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
			mJsydspFull.setPZ_GD_MJ(objects[5] != null ? Double.valueOf(objects[5].toString()) : 0);
			mJsydspFull.setPZ_WLYD_MJ(objects[6] != null ? Double.valueOf(objects[6].toString()) : 0);
			mJsydspFull.setCL_JSYD_MJ(objects[7] != null ? Double.valueOf(objects[7].toString()) : 0);
			mJsydspFull.setComparisoned(false);
			mJsydspFullList.add(mJsydspFull);
		}
		ConsoleUtils.println("dataxize = " + mJsydspFullList.size());

		if ((null != mJsydspFullList) && (mJsydspFullList.size() > 0)) {
			for (int k = 0; k < mJsydspFullList.size(); k++) {
				if (!mJsydspFullList.get(k).isComparisoned()) {

					JsydspListFull mJsydspListFull = new JsydspListFull();
					mJsydspListFull.setXZQDM(mJsydspFullList.get(k).getXZQDM());

					String xzqdm = mJsydspFullList.get(k).getXZQDM();

					mJsydspFullList.get(k).setComparisoned(true);

					List<JsydspFull> mJsydspFullListT = new ArrayList<JsydspFull>();
					mJsydspFullListT.add(mJsydspFullList.get(k));
					for (int i1 = k; i1 < mJsydspFullList.size(); i1++) {
						if (!mJsydspFullList.get(i1).isComparisoned()) {
							if ((null != xzqdm) && (xzqdm.equalsIgnoreCase(mJsydspFullList.get(i1).getXZQDM()))) {
								mJsydspFullList.get(i1).setComparisoned(true);
								mJsydspFullListT.add(mJsydspFullList.get(i1));
							}
						}
					}
					mJsydspListFull.setmJsydspFull(mJsydspFullListT);
					mJsydspListFullList.add(mJsydspListFull);
				}
			}
		}
		ConsoleUtils.println("dataxize1 = " + mJsydspListFullList.size());

		if ((null != mJsydspListFullList) && (mJsydspListFullList.size() > 0)) {
			for (int h = 0; h < mJsydspListFullList.size(); h++) {
				JsydspNa mJsydspNa = new JsydspNa();
				mJsydspNa.setYEAR(mJsydspListFullList.get(h).getXZQDM());
				List<JsydspFull> mJsydspFull = new ArrayList<JsydspFull>();
				mJsydspFull = mJsydspListFullList.get(h).getmJsydspFull();
				if ((null != mJsydspFull) && (mJsydspFull.size() > 0)) {
					double PZ_XM_MJ = 0;
					double XZ_JSYD_MJ = 0;
					double PZ_NYD_MJ = 0;
					double PZ_GD_MJ = 0;
					double PZ_WLYD_MJ = 0;
					double CL_JSYD_MJ = 0;
					for (int m = 0; m < mJsydspFull.size(); m++) {
						if ("省政府".equalsIgnoreCase(mJsydspFull.get(m).getPZ_DW())) {
							mJsydspNa.setS_PZ_XM_MJ(mJsydspFull.get(m).getPZ_XM_MJ());
							mJsydspNa.setS_XZ_JSYD_MJ(mJsydspFull.get(m).getXZ_JSYD_MJ());
							mJsydspNa.setS_PZ_NYD_MJ(mJsydspFull.get(m).getPZ_NYD_MJ());
							mJsydspNa.setS_PZ_GD_MJ(mJsydspFull.get(m).getPZ_GD_MJ());
							mJsydspNa.setS_PZ_WLYD_MJ(mJsydspFull.get(m).getPZ_WLYD_MJ());
							mJsydspNa.setS_CL_JSYD_MJ(mJsydspFull.get(m).getCL_JSYD_MJ());

						} else if ("国务院".equalsIgnoreCase(mJsydspFull.get(m).getPZ_DW())) {
							mJsydspNa.setG_PZ_XM_MJ(mJsydspFull.get(m).getPZ_XM_MJ());
							mJsydspNa.setG_XZ_JSYD_MJ(mJsydspFull.get(m).getXZ_JSYD_MJ());
							mJsydspNa.setG_PZ_NYD_MJ(mJsydspFull.get(m).getPZ_NYD_MJ());
							mJsydspNa.setG_PZ_GD_MJ(mJsydspFull.get(m).getPZ_GD_MJ());
							mJsydspNa.setG_PZ_WLYD_MJ(mJsydspFull.get(m).getPZ_WLYD_MJ());
							mJsydspNa.setG_CL_JSYD_MJ(mJsydspFull.get(m).getCL_JSYD_MJ());
						}

						PZ_XM_MJ = PZ_XM_MJ + mJsydspFull.get(m).getPZ_XM_MJ();
						XZ_JSYD_MJ = XZ_JSYD_MJ + mJsydspFull.get(m).getXZ_JSYD_MJ();
						PZ_NYD_MJ = PZ_NYD_MJ + mJsydspFull.get(m).getPZ_NYD_MJ();
						PZ_GD_MJ = PZ_GD_MJ + mJsydspFull.get(m).getPZ_GD_MJ();
						PZ_WLYD_MJ = PZ_WLYD_MJ + mJsydspFull.get(m).getPZ_WLYD_MJ();
						CL_JSYD_MJ = CL_JSYD_MJ + mJsydspFull.get(m).getCL_JSYD_MJ();
					}

					mJsydspNa.setPZ_XM_MJ(PZ_XM_MJ);
					mJsydspNa.setXZ_JSYD_MJ(XZ_JSYD_MJ);
					mJsydspNa.setPZ_NYD_MJ(PZ_NYD_MJ);
					mJsydspNa.setPZ_GD_MJ(PZ_GD_MJ);
					mJsydspNa.setPZ_WLYD_MJ(PZ_WLYD_MJ);
					mJsydspNa.setCL_JSYD_MJ(CL_JSYD_MJ);
				}

				mJsydspNaList.add(mJsydspNa);

			}
		}

		return mJsydspNaList;

	}

	// 获取当前时间
	public String getsql(String[] countyarea) {
		String databasexzq = "";
		if ((null != countyarea) && (countyarea.length > 0)) {
			String text1 = " GH_YT in (";
			for (int k = 0; k < countyarea.length; k++) {
				if (k == (countyarea.length - 1)) {
					text1 = text1 + "'" + countyarea[k] + "')";
				} else {
					text1 = text1 + "'" + countyarea[k] + "',";
				}

			}

			ConsoleUtils.println("text = " + text1);
			databasexzq = text1;
		}
		return databasexzq;
	}

	public void Export(String result) {
		return;
	}

	public Result<String> getAllDataYear() throws Exception {
		String minsql = "select min(pzrq) from t_inf_onemap_jsydspxxb";
		String maxsql = "select max(pzrq) from t_inf_onemap_jsydspxxb";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String min = getAttributesBySql(minsql);
		String max = getAttributesBySql(maxsql);
		if(min.contains(" ")) {
			min=min.split(" ")[0];
		}
		if(max.contains(" ")) {
			max=max.split(" ")[0];
		}
		Date minDate = sdf.parse(min);
		Date maxDate = sdf.parse(max);
		int start = minDate.getYear()+1900;
		int end = maxDate.getYear()+1900;
		if (start == end) {
			return new Result<String>(String.valueOf(start));
		}
		if (start + 1 == end) {
			return new Result<String>(String.valueOf(start) + "," + String.valueOf(end));
		}
		String str = String.valueOf(start);
		for (int i = start + 1; i < end; i++) {
			String countsql = "select 1 from t_inf_onemap_jsydspxxb where pzrq>='" + i + "-01-01' and pzrq<'" + (i + 1)
					+ "-01-01'";
			int count = getCountBySql(countsql);
			if (count > 0) {
				str += "," + i;
			}
		}
		str += "," + end;
		return new Result<String>(str);
	}

}

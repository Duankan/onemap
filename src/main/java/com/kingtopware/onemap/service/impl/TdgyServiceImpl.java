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
import com.kingtopware.onemap.bean.TdgyFull;
import com.kingtopware.onemap.bean.TdgyGhydFull;
import com.kingtopware.onemap.bean.TdydTjFull;
import com.kingtopware.onemap.dao.TdgyDao;
import com.kingtopware.onemap.entity.TdgyEntity;
import com.kingtopware.onemap.service.TdgyService;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月5日
 * @description：土地公用信息接口实现类
 * =====================================
 */
@Component
public class TdgyServiceImpl extends BaseServiceImpl<TdgyEntity> implements TdgyService {
	@Resource
	public TdgyDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public TdgyServiceImpl() {
		tableName = "T_INF_ONEMAP_TDGYXXB";
	}

	public List<TdgyFull> getinfobytdgy(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub
		String fullname = PropertyUtil.get("fullname");
		String tjall = fullname;
		List<TdgyFull> mTdgyFull = new ArrayList<TdgyFull>();
		List<TdydTjFull> mTdydTjFull = new ArrayList<TdydTjFull>();

		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;

		boolean isHasAll = false;

		String databasesql = "SELECT GHYT,count(*),GY_FS,sum(GY_MJ) as GY_MJ,sum(CRJK) as CRJK,sum(JZ_MJ) as JZ_MJ FROM  T_INF_ONEMAP_TDGYXXB ";
		String databasesqlx = "SELECT XZQDM,count(*),GY_FS,sum(GY_MJ) as GY_MJ,sum(CRJK) as CRJK,sum(JZ_MJ) as JZ_MJ FROM   ";

		String dataallsql = "SELECT count(*),GY_FS,sum(GY_MJ) as GY_MJ,sum(CRJK) as CRJK,sum(JZ_MJ) as JZ_MJ FROM  T_INF_ONEMAP_TDGYXXB ";

		String databasexzq = "";

		if (!"规划用途".equalsIgnoreCase(countyarea)) {
			if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
				String[] nfs = countyarea.split(",");
				String text = "(SELECT * from T_INF_ONEMAP_TDGYXXB where XZQMC in (";
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

				databasexzq = "T_INF_ONEMAP_TDGYXXB";
			}
		}

		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		} else {
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where PZ_RQ between '" + mStarttime + "' and '" + mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where PZ_RQ <= '" + mEndtime + "'";

			} else {
				timesql = " where PZ_RQ between '" + mStarttime + "' and '" + mEndtime + "'";

			}
		}

		if (!"规划用途".equalsIgnoreCase(countyarea)) {
			userSql = databasesqlx + databasexzq + timesql + "  group by XZQDM,GY_FS";
		} else {
			userSql = databasesql + databasexzq + timesql + "  group by GHYT,GY_FS";
		}

		int countq = 0;

		List<Object[]> t = getStatisticsBySql(userSql);

		if (!"规划用途".equalsIgnoreCase(countyarea)) {
			String userallSql = dataallsql + timesql + " group by GY_FS";
			List<Object[]> tq = new ArrayList<Object[]>();

			if (isHasAll) {
				tq = getStatisticsBySql(userallSql);
				countq = tq.size();
			}
			if (isHasAll) {
				for (int m = 0; m < countq; m++) {
					Object[] objects = tq.get(m);
					int count1 = objects.length;
					if (count1 < 1) {
						continue;
					}
					TdydTjFull mTdydTjFullT = new TdydTjFull();
					mTdydTjFullT.setmGhyt(tjall);
					mTdydTjFullT.setmCount(objects[0] != null ? Integer.valueOf(objects[0].toString()) : 0);
					mTdydTjFullT.setmGyFs(objects[1] != null ? objects[1].toString() : "");
					mTdydTjFullT.setmGyMj(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
					mTdydTjFullT.setmCrJk(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
					mTdydTjFullT.setmJzMj(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
					mTdydTjFullT.setComparisoned(false);
					mTdydTjFull.add(mTdydTjFullT);
				}
			}
		}

		int count = t.size();
		if ((count < 1) && (countq < 1)) {
			return mTdgyFull;
		}

		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}

			TdydTjFull mTdydTjFullT = new TdydTjFull();
			mTdydTjFullT.setmGhyt(objects[0] != null ? objects[0].toString() : "");
			mTdydTjFullT.setmCount(objects[1] != null ? Integer.valueOf(objects[1].toString()) : 0);
			mTdydTjFullT.setmGyFs(objects[2] != null ? objects[2].toString() : "");
			mTdydTjFullT.setmGyMj(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
			mTdydTjFullT.setmCrJk(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
			mTdydTjFullT.setmJzMj(objects[5] != null ? Double.valueOf(objects[5].toString()) : 0);
			mTdydTjFullT.setComparisoned(false);
			mTdydTjFull.add(mTdydTjFullT);
		}

		if ((null != mTdydTjFull) && (mTdydTjFull.size() > 0)) {
			for (int k = 0; k < mTdydTjFull.size(); k++) {
				if (!mTdydTjFull.get(k).isComparisoned()) {

					TdgyFull mJsydspListFull = new TdgyFull();
					mJsydspListFull.setSTARTTIME(mStarttime);
					mJsydspListFull.setENDTIME(mEndtime);

					TdydTjFull mTdydTjFullT = mTdydTjFull.get(k);
					String ghyt = mTdydTjFullT.getmGhyt();
					mJsydspListFull.setmGhyt(ghyt);

					mTdydTjFull.get(k).setComparisoned(true);

					int mXyCount = 0;
					double mXyGyMj = 0;
					double mXyCrJk = 0;
					double mXyJzMj = 0;

					int mZpgCount = 0;
					double mZpgGyMj = 0;
					double mZpgCrJk = 0;
					double mZpgJzMj = 0;

					int mHbCount = 0;
					double mHbGyMj = 0;
					double mHbCrJk = 0;
					double mHbJzMj = 0;

					String gyfs = mTdydTjFullT.getmGyFs();
					if (!TextUtils.isEmpty(gyfs)) {
						if ("协议出让".equalsIgnoreCase(gyfs)) {
							mXyCount = mXyCount + mTdydTjFullT.getmCount();
							mXyGyMj = mXyGyMj + mTdydTjFullT.getmGyMj();
							mXyCrJk = mXyCrJk + mTdydTjFullT.getmCrJk();
							mXyJzMj = mXyJzMj + mTdydTjFullT.getmJzMj();
						} else if ("招标".equalsIgnoreCase(gyfs) || "拍卖".equalsIgnoreCase(gyfs) || "挂牌".equalsIgnoreCase(gyfs)) {
							mZpgCount = mZpgCount + mTdydTjFullT.getmCount();
							mZpgGyMj = mZpgGyMj + mTdydTjFullT.getmGyMj();
							mZpgCrJk = mZpgCrJk + mTdydTjFullT.getmCrJk();
							mZpgJzMj = mZpgJzMj + mTdydTjFullT.getmJzMj();
						} else if ("划拨".equalsIgnoreCase(gyfs)) {
							mHbCount = mHbCount + mTdydTjFullT.getmCount();
							mHbGyMj = mHbGyMj + mTdydTjFullT.getmGyMj();
							mHbCrJk = mHbCrJk + mTdydTjFullT.getmCrJk();
							mHbJzMj = mHbJzMj + mTdydTjFullT.getmJzMj();
						}
					}

					for (int i1 = k; i1 < mTdydTjFull.size(); i1++) {
						if (!mTdydTjFull.get(i1).isComparisoned()) {
							if (ghyt.equalsIgnoreCase(mTdydTjFull.get(i1).getmGhyt())) {
								mTdydTjFull.get(i1).setComparisoned(true);
								TdydTjFull mTdydTjFullTT = mTdydTjFull.get(i1);
								String gyfst = mTdydTjFull.get(i1).getmGyFs();
								if (!TextUtils.isEmpty(gyfst)) {
									if ("协议出让".equalsIgnoreCase(gyfst)) {
										mXyCount = mXyCount + mTdydTjFullTT.getmCount();
										mXyGyMj = mXyGyMj + mTdydTjFullTT.getmGyMj();
										mXyCrJk = mXyCrJk + mTdydTjFullTT.getmCrJk();
										mXyJzMj = mXyJzMj + mTdydTjFullTT.getmJzMj();
									} else if ("招标".equalsIgnoreCase(gyfst) || "拍卖".equalsIgnoreCase(gyfst) || "挂牌".equalsIgnoreCase(gyfst)) {
										mZpgCount = mZpgCount + mTdydTjFullTT.getmCount();
										mZpgGyMj = mZpgGyMj + mTdydTjFullTT.getmGyMj();
										mZpgCrJk = mZpgCrJk + mTdydTjFullTT.getmCrJk();
										mZpgJzMj = mZpgJzMj + mTdydTjFullTT.getmJzMj();
									} else if ("划拨".equalsIgnoreCase(gyfst)) {
										mHbCount = mHbCount + mTdydTjFullTT.getmCount();
										mHbGyMj = mHbGyMj + mTdydTjFullTT.getmGyMj();
										mHbCrJk = mHbCrJk + mTdydTjFullTT.getmCrJk();
										mHbJzMj = mHbJzMj + mTdydTjFullTT.getmJzMj();
									}
								}
							}
						}
					}

					mJsydspListFull.setmJianCount(mXyCount + mZpgCount + mHbCount);
					mJsydspListFull.setmGyMj(mXyGyMj + mZpgGyMj + mHbGyMj);

					mJsydspListFull.setmChuCount(mXyCount + mZpgCount);
					mJsydspListFull.setmChuGyMj(mXyGyMj + mZpgGyMj);
					mJsydspListFull.setmChuCrjk(mXyCrJk + mZpgCrJk);
					mJsydspListFull.setChuJzMj(mXyJzMj + mZpgJzMj);

					mJsydspListFull.setmXyCount(mXyCount);
					mJsydspListFull.setmXyGyMj(mXyGyMj);
					mJsydspListFull.setmXyCrjk(mXyCrJk);
					mJsydspListFull.setnXyJzMj(mXyJzMj);

					mJsydspListFull.setmZpgCount(mZpgCount);
					mJsydspListFull.setmZpgGyMj(mZpgGyMj);
					mJsydspListFull.setmZpgCrjk(mZpgCrJk);
					mJsydspListFull.setnZpgJzMj(mZpgJzMj);

					mJsydspListFull.setmHbCount(mHbCount);
					mJsydspListFull.setmHbGyMj(mHbGyMj);
					mJsydspListFull.setnHbJzMj(mHbJzMj);

					mTdgyFull.add(mJsydspListFull);
				}
			}
		}
		if (!"规划用途".equalsIgnoreCase(countyarea)) {
			if ((null != mTdgyFull) && (mTdgyFull.size() > 0)) {
				for (int h = 0; h < mTdgyFull.size(); h++) {
					if (tjall.equalsIgnoreCase(mTdgyFull.get(h).getmGhyt())) {
						continue;
					}
					String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_TDGYXXB where XZQDM= '" + mTdgyFull.get(h).getmGhyt() + "'";
					String xzqmc = getAttributesBySql(userSqlget);
					mTdgyFull.get(h).setmGhyt(xzqmc);
					ConsoleUtils.println("xzqmc = " + xzqmc);
				}
			}
		}

		return mTdgyFull;
	}

	public List<TdgyGhydFull> getinfobyghyt(String starttime, String endtime, String countyarea, String flag) {
		// TODO Auto-generated method stub

		String fullname = PropertyUtil.get("fullname");
		String tjall = fullname;
		List<TdgyGhydFull> mTdgyFull = new ArrayList<TdgyGhydFull>();
		List<TdydTjFull> mTdydTjFull = new ArrayList<TdydTjFull>();

		String userSql = "";
		String timesql = "";
		String mStarttime = starttime;
		String mEndtime = endtime;

		boolean isHasAll = false;

		String databasesql = "SELECT XZQDM,GHYT,sum(GY_MJ) as GY_MJ,count(*),sum(CRJK) as CRJK FROM";

		String dataallsql = "SELECT GHYT,sum(GY_MJ) as GY_MJ,count(*),sum(CRJK) as CRJK  FROM T_INF_ONEMAP_TDGYXXB";

		String databasexzq = "";

		if (countyarea != null && !"".equalsIgnoreCase(countyarea)) {
			String[] nfs = countyarea.split(",");
			String text = "(SELECT * from T_INF_ONEMAP_TDGYXXB where XZQMC in (";
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

			databasexzq = "T_INF_ONEMAP_TDGYXXB";
		}

		if (flag != null && "byyear".equalsIgnoreCase(flag)) {
			timesql = "  where NF in (" + starttime + ")";
		} else {
			if (!TextUtils.isEmpty(starttime) && TextUtils.isEmpty(endtime)) {
				mEndtime = DateUtil.getCurrentDate();
				timesql = " where PZ_RQ between '" + mStarttime + "' and '" + mEndtime + "'";
			} else if (TextUtils.isEmpty(starttime) && !TextUtils.isEmpty(endtime)) {
				timesql = " where PZ_RQ <= '" + mEndtime + "'";

			} else {
				timesql = " where PZ_RQ between '" + mStarttime + "' and '" + mEndtime + "'";

			}
		}

		userSql = databasesql + databasexzq + timesql + "  group by XZQDM,GHYT";

		String userallSql = dataallsql + timesql + " group by GHYT";

		int countq = 0;

		List<Object[]> t = getStatisticsBySql(userSql);

		List<Object[]> tq = new ArrayList<Object[]>();

		if (isHasAll) {
			tq = getStatisticsBySql(userallSql);
			countq = tq.size();
			for (int m = 0; m < countq; m++) {
				Object[] objects = tq.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				TdydTjFull mTdydTjFullT = new TdydTjFull();
				mTdydTjFullT.setmGyFs(tjall);
				mTdydTjFullT.setmGhyt(objects[0] != null ? objects[0].toString() : "");
				mTdydTjFullT.setmGyMj(objects[1] != null ? Double.valueOf(objects[1].toString()) : 0);
				mTdydTjFullT.setmCount(objects[2] != null ? Integer.valueOf(objects[2].toString()) : 0);
				mTdydTjFullT.setmCrJk(objects[3] != null ? Double.valueOf(objects[3].toString()) : 0);
				mTdydTjFullT.setComparisoned(false);
				mTdydTjFull.add(mTdydTjFullT);
			}
		}

		int count = t.size();
		if ((count < 1) && (countq < 1)) {
			return mTdgyFull;
		}

		for (int m = 0; m < count; m++) {
			Object[] objects = t.get(m);
			int count1 = objects.length;
			if (count1 < 1) {
				continue;
			}

			TdydTjFull mTdydTjFullT = new TdydTjFull();
			mTdydTjFullT.setmGyFs(objects[0] != null ? objects[0].toString() : "");
			mTdydTjFullT.setmGhyt(objects[1] != null ? objects[1].toString() : "");
			mTdydTjFullT.setmGyMj(objects[2] != null ? Double.valueOf(objects[2].toString()) : 0);
			mTdydTjFullT.setmCount(objects[3] != null ? Integer.valueOf(objects[3].toString()) : 0);
			mTdydTjFullT.setmCrJk(objects[4] != null ? Double.valueOf(objects[4].toString()) : 0);
			mTdydTjFullT.setComparisoned(false);
			mTdydTjFull.add(mTdydTjFullT);
		}

		if ((null != mTdydTjFull) && (mTdydTjFull.size() > 0)) {
			for (int k = 0; k < mTdydTjFull.size(); k++) {
				if (!mTdydTjFull.get(k).isComparisoned()) {

					TdgyGhydFull mJsydspListFull = new TdgyGhydFull();
					mJsydspListFull.setSTARTTIME(mStarttime);
					mJsydspListFull.setENDTIME(mEndtime);

					TdydTjFull mTdydTjFullT = mTdydTjFull.get(k);
					String ghyt = mTdydTjFullT.getmGyFs();
					mJsydspListFull.setXZQDM(ghyt);// 行政区代码

					mTdydTjFull.get(k).setComparisoned(true);

					int mXyCount = 0;
					double mXyGyMj = 0;
					double mXyCrJk = 0;

					int mZpgCount = 0;
					double mZpgGyMj = 0;
					double mZpgCrJk = 0;

					int mHbCount = 0;
					double mHbGyMj = 0;
					double mHbCrJk = 0;

					int mZpCount = 0;
					double mZpGyMj = 0;
					double mZpCrJk = 0;

					int mZjCount = 0;
					double mZjGyMj = 0;
					double mZjCrJk = 0;

					int mZlCount = 0;
					double mZlGyMj = 0;
					double mZlCrJk = 0;

					int mZgCount = 0;
					double mZgGyMj = 0;
					double mZgCrJk = 0;

					int mZqCount = 0;
					double mZqGyMj = 0;
					double mZqCrJk = 0;

					int mGfCount = 0;
					double mGfGyMj = 0;
					double mGfCrJk = 0;

					int mTsCount = 0;
					double mTsGyMj = 0;
					double mTsCrJk = 0;

					int mJyCount = 0;
					double mJyGyMj = 0;
					double mJyCrJk = 0;

					int mSsCount = 0;
					double mSsGyMj = 0;
					double mSsCrJk = 0;

					int mQtCount = 0;
					double mQtGyMj = 0;
					double mQtCrJk = 0;

					String gyfs = mTdydTjFullT.getmGhyt();
					if (!TextUtils.isEmpty(gyfs)) {
						if ("商服用地".equalsIgnoreCase(gyfs)) {
							mXyCount = mXyCount + mTdydTjFullT.getmCount();
							mXyGyMj = mXyGyMj + mTdydTjFullT.getmGyMj();
							mXyCrJk = mXyCrJk + mTdydTjFullT.getmCrJk();
						} else if ("工业仓储用地".equalsIgnoreCase(gyfs)) {
							mZpgCount = mZpgCount + mTdydTjFullT.getmCount();
							mZpgGyMj = mZpgGyMj + mTdydTjFullT.getmGyMj();
							mZpgCrJk = mZpgCrJk + mTdydTjFullT.getmCrJk();
						} else if ("采矿用地".equalsIgnoreCase(gyfs)) {
							mHbCount = mHbCount + mTdydTjFullT.getmCount();
							mHbGyMj = mHbGyMj + mTdydTjFullT.getmGyMj();
							mHbCrJk = mHbCrJk + mTdydTjFullT.getmCrJk();
						} else if ("普通商品住房用地".equalsIgnoreCase(gyfs)) {
							mZpCount = mZpCount + mTdydTjFullT.getmCount();
							mZpGyMj = mZpGyMj + mTdydTjFullT.getmGyMj();
							mZpCrJk = mZpCrJk + mTdydTjFullT.getmCrJk();
						} else if ("经济适用住房".equalsIgnoreCase(gyfs)) {
							mZjCount = mZjCount + mTdydTjFullT.getmCount();
							mZjGyMj = mZjGyMj + mTdydTjFullT.getmGyMj();
							mZjCrJk = mZjCrJk + mTdydTjFullT.getmCrJk();
						} else if ("廉租住房用地".equalsIgnoreCase(gyfs)) {
							mZlCount = mZlCount + mTdydTjFullT.getmCount();
							mZlGyMj = mZlGyMj + mTdydTjFullT.getmGyMj();
							mZlCrJk = mZlCrJk + mTdydTjFullT.getmCrJk();
						} else if ("高档住宅用地".equalsIgnoreCase(gyfs)) {
							mZgCount = mZgCount + mTdydTjFullT.getmCount();
							mZgGyMj = mZgGyMj + mTdydTjFullT.getmGyMj();
							mZgCrJk = mZgCrJk + mTdydTjFullT.getmCrJk();
						} else if ("其他住宅用地".equalsIgnoreCase(gyfs)) {
							mZqCount = mZqCount + mTdydTjFullT.getmCount();
							mZqGyMj = mZqGyMj + mTdydTjFullT.getmGyMj();
							mZqCrJk = mZqCrJk + mTdydTjFullT.getmCrJk();
						} else if ("公共管理与公共服务用地".equalsIgnoreCase(gyfs)) {
							mGfCount = mGfCount + mTdydTjFullT.getmCount();
							mGfGyMj = mGfGyMj + mTdydTjFullT.getmGyMj();
							mGfCrJk = mGfCrJk + mTdydTjFullT.getmCrJk();
						}

						else if ("特殊用地".equalsIgnoreCase(gyfs)) {
							mTsCount = mTsCount + mTdydTjFullT.getmCount();
							mTsGyMj = mTsGyMj + mTdydTjFullT.getmGyMj();
							mTsCrJk = mTsCrJk + mTdydTjFullT.getmCrJk();
						} else if ("交通运输用地".equalsIgnoreCase(gyfs)) {
							mJyCount = mJyCount + mTdydTjFullT.getmCount();
							mJyGyMj = mJyGyMj + mTdydTjFullT.getmGyMj();
							mJyCrJk = mJyCrJk + mTdydTjFullT.getmCrJk();
						} else if ("水域及水利设施用地".equalsIgnoreCase(gyfs)) {
							mSsCount = mSsCount + mTdydTjFullT.getmCount();
							mSsGyMj = mSsGyMj + mTdydTjFullT.getmGyMj();
							mSsCrJk = mSsCrJk + mTdydTjFullT.getmCrJk();
						} else if ("其他用地".equalsIgnoreCase(gyfs)) {
							mQtCount = mQtCount + mTdydTjFullT.getmCount();
							mQtGyMj = mQtGyMj + mTdydTjFullT.getmGyMj();
							mQtCrJk = mQtCrJk + mTdydTjFullT.getmCrJk();
						}
					}

					for (int i1 = k; i1 < mTdydTjFull.size(); i1++) {
						if (!mTdydTjFull.get(i1).isComparisoned()) {
							if (ghyt.equalsIgnoreCase(mTdydTjFull.get(i1).getmGyFs())) {
								mTdydTjFull.get(i1).setComparisoned(true);
								TdydTjFull mTdydTjFullTT = mTdydTjFull.get(i1);
								String gyfst = mTdydTjFull.get(i1).getmGhyt();
								if (!TextUtils.isEmpty(gyfst)) {

									if ("商服用地".equalsIgnoreCase(gyfst)) {
										mXyCount = mXyCount + mTdydTjFullTT.getmCount();
										mXyGyMj = mXyGyMj + mTdydTjFullTT.getmGyMj();
										mXyCrJk = mXyCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("工业仓储用地".equalsIgnoreCase(gyfst)) {
										mZpgCount = mZpgCount + mTdydTjFullTT.getmCount();
										mZpgGyMj = mZpgGyMj + mTdydTjFullTT.getmGyMj();
										mZpgCrJk = mZpgCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("采矿用地".equalsIgnoreCase(gyfst)) {
										mHbCount = mHbCount + mTdydTjFullTT.getmCount();
										mHbGyMj = mHbGyMj + mTdydTjFullTT.getmGyMj();
										mHbCrJk = mHbCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("普通商品住房用地".equalsIgnoreCase(gyfst)) {
										mZpCount = mZpCount + mTdydTjFullTT.getmCount();
										mZpGyMj = mZpGyMj + mTdydTjFullTT.getmGyMj();
										mZpCrJk = mZpCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("经济适用住房".equalsIgnoreCase(gyfst)) {
										mZjCount = mZjCount + mTdydTjFullTT.getmCount();
										mZjGyMj = mZjGyMj + mTdydTjFullTT.getmGyMj();
										mZjCrJk = mZjCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("廉租住房用地".equalsIgnoreCase(gyfst)) {
										mZlCount = mZlCount + mTdydTjFullTT.getmCount();
										mZlGyMj = mZlGyMj + mTdydTjFullTT.getmGyMj();
										mZlCrJk = mZlCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("高档住宅用地".equalsIgnoreCase(gyfst)) {
										mZgCount = mZgCount + mTdydTjFullTT.getmCount();
										mZgGyMj = mZgGyMj + mTdydTjFullTT.getmGyMj();
										mZgCrJk = mZgCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("其他住宅用地".equalsIgnoreCase(gyfst)) {
										mZqCount = mZqCount + mTdydTjFullTT.getmCount();
										mZqGyMj = mZqGyMj + mTdydTjFullTT.getmGyMj();
										mZqCrJk = mZqCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("公共管理与公共服务用地".equalsIgnoreCase(gyfst)) {
										mGfCount = mGfCount + mTdydTjFullTT.getmCount();
										mGfGyMj = mGfGyMj + mTdydTjFullTT.getmGyMj();
										mGfCrJk = mGfCrJk + mTdydTjFullTT.getmCrJk();
									}

									else if ("特殊用地".equalsIgnoreCase(gyfst)) {
										mTsCount = mTsCount + mTdydTjFullTT.getmCount();
										mTsGyMj = mTsGyMj + mTdydTjFullTT.getmGyMj();
										mTsCrJk = mTsCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("交通运输用地".equalsIgnoreCase(gyfst)) {
										mJyCount = mJyCount + mTdydTjFullTT.getmCount();
										mJyGyMj = mJyGyMj + mTdydTjFullTT.getmGyMj();
										mJyCrJk = mJyCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("水域及水利设施用地".equalsIgnoreCase(gyfst)) {
										mSsCount = mSsCount + mTdydTjFullTT.getmCount();
										mSsGyMj = mSsGyMj + mTdydTjFullTT.getmGyMj();
										mSsCrJk = mSsCrJk + mTdydTjFullTT.getmCrJk();
									} else if ("其他用地".equalsIgnoreCase(gyfst)) {
										mQtCount = mQtCount + mTdydTjFullTT.getmCount();
										mQtGyMj = mQtGyMj + mTdydTjFullTT.getmGyMj();
										mQtCrJk = mQtCrJk + mTdydTjFullTT.getmCrJk();
									}

								}
							}
						}
					}

					mJsydspListFull.setmJianCount(mXyCount + mZpgCount + mHbCount + mZpCount + mZjCount + mZlCount + mZgCount + mZqCount + mGfCount + mTsCount + mJyCount
							+ mSsCount + mQtCount);
					mJsydspListFull.setmGyMj(mXyGyMj + mZpgGyMj + mHbGyMj + mZpGyMj + mZjGyMj + mZlGyMj + mZgGyMj + mZqGyMj + mGfGyMj + mTsGyMj + mJyGyMj + mSsGyMj + mQtGyMj);
					mJsydspListFull.setmCrjk(mXyCrJk + mZpgCrJk + mHbCrJk + mZpCrJk + mZjCrJk + mZlCrJk + mZgCrJk + mZqCrJk + mGfCrJk + mTsCrJk + mJyCrJk + mSsCrJk + mQtCrJk);

					mJsydspListFull.setmSf(mXyGyMj);
					mJsydspListFull.setmGcc(mZpgGyMj);
					mJsydspListFull.setmCk(mHbGyMj);
					mJsydspListFull.setmGkGyMj(mZpgGyMj + mHbGyMj);

					mJsydspListFull.setmPtzf(mZpGyMj);
					mJsydspListFull.setmJjsyf(mZjGyMj);
					mJsydspListFull.setmLzzf(mZlGyMj);
					mJsydspListFull.setmGdzz(mZgGyMj);
					mJsydspListFull.setmQtzz(mZqGyMj);
					mJsydspListFull.setmZzGyMj(mZpGyMj + mZjGyMj + mZlGyMj + mZgGyMj + mZqGyMj);

					mJsydspListFull.setmGggf(mGfGyMj);
					mJsydspListFull.setmTsyd(mTsGyMj);
					mJsydspListFull.setmJtys(mJyGyMj);
					mJsydspListFull.setmSySl(mSsGyMj);
					mJsydspListFull.setmQtyd(mQtGyMj);

					mTdgyFull.add(mJsydspListFull);
				}
			}
		}
		if ((null != mTdgyFull) && (mTdgyFull.size() > 0)) {
			for (int h = 0; h < mTdgyFull.size(); h++) {
				if (tjall.equalsIgnoreCase(mTdgyFull.get(h).getXZQDM())) {
					mTdgyFull.get(h).setXZQMC(tjall);
					continue;
				}
				String userSqlget = "SELECT XZQMC FROM T_INF_ONEMAP_TDGYXXB where XZQDM= '" + mTdgyFull.get(h).getXZQDM() + "'";
				String xzqmc = getAttributesBySql(userSqlget);
				mTdgyFull.get(h).setXZQMC(xzqmc);
				ConsoleUtils.println("xzqmc = " + xzqmc);
			}
		}

		return mTdgyFull;

	}
}
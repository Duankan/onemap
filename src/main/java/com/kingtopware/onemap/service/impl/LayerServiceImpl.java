package com.kingtopware.onemap.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.LifeCycleInfo;
import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.framework.util.StringUtil;
import com.kingtopware.onemap.dao.LayerDao;
import com.kingtopware.onemap.entity.AjdjxxEntity;
import com.kingtopware.onemap.entity.BcgdEntity;
import com.kingtopware.onemap.entity.CbydEntity;
import com.kingtopware.onemap.entity.ZrzEntity;
import com.kingtopware.onemap.entity.JsydspEntity;
import com.kingtopware.onemap.entity.TdgyEntity;
import com.kingtopware.onemap.entity.ZdxxEntity;
import com.kingtopware.onemap.entity.ZrzEntity;
import com.kingtopware.onemap.service.LayerService;

@SuppressWarnings({ "rawtypes" })
@Component
public class LayerServiceImpl extends BaseServiceImpl<BcgdEntity> implements LayerService {

	@Resource
	public LayerDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public LayerServiceImpl() {
		tableName = "T_INF_ONEMAP_BCGDXXB";
	}

	private static String pdbasesql = JsydspEntity.selectAll + "  FROM T_INF_ONEMAP_JSYDSPXXB    WHERE JSYD_GUID='";
	private static String zdbasesql = ZdxxEntity.selectAll + "  FROM T_INF_ONEMAP_ZDXXB    WHERE ZDXM_GUID='";
	private static String cbbasesql = CbydEntity.selectAll + "  FROM T_INF_ONEMAP_CBYDXXB    WHERE CBYD_GUID='";
	private static String gdbasesql = TdgyEntity.selectAll + "  FROM T_INF_ONEMAP_TDGYXXB    WHERE GDXM_GUID='";
	private static String ydbasesql = ZrzEntity.selectAll + "  FROM bdc_zrz    WHERE id=";
	private static String bcbasesql = BcgdEntity.selectAll + "  FROM T_INF_ONEMAP_BCGDXXB    WHERE BCGDFA_GUID='";
	private static String jcbasesql = AjdjxxEntity.selectAll + "  FROM T_INF_ONEMAP_AJDJXXB    WHERE WFYD_GUID='";

	private String beforesqldata = "";
	private String backsqldata = "";

	public LifeCycleInfo getLifeCycle(String param, String uid) {
		// TODO Auto-generated method stub
		String type = param;
		String guid = uid;

		beforesqldata = "";
		backsqldata = "";

		LifeCycleInfo mLifeCycleInfo = new LifeCycleInfo();

		List<JsydspEntity> mJsydspEntity = new ArrayList<JsydspEntity>();

		List<ZdxxEntity> mZdxxEntity = new ArrayList<ZdxxEntity>();

		List<CbydEntity> mCbydEntity = new ArrayList<CbydEntity>();

		List<TdgyEntity> mTdgyEntity = new ArrayList<TdgyEntity>();

		List<ZrzEntity> mZrzEntity = new ArrayList<ZrzEntity>();

		List<BcgdEntity> mBcgdEntity = new ArrayList<BcgdEntity>();

		List<AjdjxxEntity> mAjdjxxEntity = new ArrayList<AjdjxxEntity>();

		String basesql = "";

		/**
		 * 获取直接数据库数据
		 */
		if ("p".equalsIgnoreCase(type)) {
			basesql = pdbasesql + guid + "'";
			JsydspEntity mJsydsp = getObj(basesql, type);
			if (null != mJsydsp) {
				mJsydspEntity.add(mJsydsp);
			} else {
				return mLifeCycleInfo;
			}

		} else if ("z".equalsIgnoreCase(type)) {
			basesql = zdbasesql + guid + "'";
			ZdxxEntity mZdxx = getObj(basesql, type);
			if (null != mZdxx) {
				mZdxxEntity.add(mZdxx);
			} else {
				return mLifeCycleInfo;
			}
		} else if ("c".equalsIgnoreCase(type)) {
			basesql = cbbasesql + guid + "'";
			CbydEntity mCbyd = getObj(basesql, type);
			if (null != mCbyd) {
				mCbydEntity.add(mCbyd);
			} else {
				return mLifeCycleInfo;
			}
		} else if ("g".equalsIgnoreCase(type)) {
			basesql = gdbasesql + guid + "'";
			TdgyEntity mTdgy = getObj(basesql, type);
			if (null != mTdgy) {
				mTdgyEntity.add(mTdgy);
			} else {
				return mLifeCycleInfo;
			}
		} else if ("y".equalsIgnoreCase(type)) {
			basesql = ydbasesql + guid ;
			ZrzEntity mDjfz = getObj(basesql, type);
			if (null != mDjfz) {
				mZrzEntity.add(mDjfz);
			} else {
				return mLifeCycleInfo;
			}
		} else if ("b".equalsIgnoreCase(type)) {
			basesql = bcbasesql + guid + "'";
			BcgdEntity mBcgd = getObj(basesql, type);
			if (null != mBcgd) {
				mBcgdEntity.add(mBcgd);
			} else {
				return mLifeCycleInfo;
			}
		} else if ("w".equalsIgnoreCase(type)) {
			basesql = jcbasesql + guid + "'";
			AjdjxxEntity mJcgd = getObj(basesql, type);
			if (null != mJcgd) {
				mAjdjxxEntity.add(mJcgd);
			} else {
				return mLifeCycleInfo;
			}
		}

		beforeDg(type, guid);
		String mBefore = beforesqldata;
		backDg(type, guid);
		String mBack = backsqldata;

		String mAllsqldata = "";
		if (!TextUtils.isEmpty(mBefore) && !TextUtils.isEmpty(mBack)) {
			mAllsqldata = mBack + mBefore;
		} else if (TextUtils.isEmpty(mBefore) && !TextUtils.isEmpty(mBack)) {
			mAllsqldata = mBack;
		} else if (!TextUtils.isEmpty(mBefore) && TextUtils.isEmpty(mBack)) {
			mAllsqldata = mBefore;
		}

		if (!TextUtils.isEmpty(mAllsqldata)) {
			String mAllsqldataMap[] = mAllsqldata.split(";");
			int mDataMapC = mAllsqldataMap.length;
			if (mDataMapC > 0) {
				for (int m = 0; m < mDataMapC; m++) {
					if (!TextUtils.isEmpty(mAllsqldataMap[m])) {
						String mSqldataMap[] = mAllsqldataMap[m].split(",");
						if (2 == mSqldataMap.length) {
							// 做重复性过滤
							boolean flag = false;
							for (int k = 0; k < m; k++) {
								String[] arr = mAllsqldataMap[k].split(",");
								if (arr[0] == mSqldataMap[0] && arr[1] == mSqldataMap[1]) {
									flag = true;
									break;
								}
							}
							if (flag) {
								continue;
							}

							String mType = mSqldataMap[0];
							String mGuid = mSqldataMap[1];
							if ("p".equalsIgnoreCase(mType)) {
								basesql = pdbasesql + mGuid + "'";
								JsydspEntity mJsydsp = getObj(basesql, mType);
								if (null != mJsydsp)
									mJsydspEntity.add(mJsydsp);
							} else if ("z".equalsIgnoreCase(mType)) {
								basesql = zdbasesql + mGuid + "'";
								ZdxxEntity mZdxx = getObj(basesql, mType);
								if (null != mZdxx)
									mZdxxEntity.add(mZdxx);
							} else if ("c".equalsIgnoreCase(mType)) {
								basesql = cbbasesql + mGuid + "'";
								CbydEntity mCbyd = getObj(basesql, mType);
								if (null != mCbyd)
									mCbydEntity.add(mCbyd);
							} else if ("g".equalsIgnoreCase(mType)) {
								basesql = gdbasesql + mGuid + "'";
								TdgyEntity mTdgy = getObj(basesql, mType);
								if (null != mTdgy)
									mTdgyEntity.add(mTdgy);
							} else if ("y".equalsIgnoreCase(mType)) {
								basesql = ydbasesql + mGuid ;
								ZrzEntity mDjfz = getObj(basesql, mType);
								if (null != mDjfz)
									mZrzEntity.add(mDjfz);
							} else if ("b".equalsIgnoreCase(mType)) {
								basesql = bcbasesql + mGuid + "'";
								BcgdEntity mBcgd = getObj(basesql, mType);
								if (null != mBcgd)
									mBcgdEntity.add(mBcgd);
							} else if ("w".equalsIgnoreCase(mType)) {
								basesql = jcbasesql + mGuid + "'";
								AjdjxxEntity mJcgd = getObj(basesql, mType);
								if (null != mJcgd)
									mAjdjxxEntity.add(mJcgd);
							}
						}
					}
				}
			}
		}

		mLifeCycleInfo.setP(mJsydspEntity);
		mLifeCycleInfo.setZ(mZdxxEntity);
		mLifeCycleInfo.setC(mCbydEntity);
		mLifeCycleInfo.setG(mTdgyEntity);
		mLifeCycleInfo.setY(mZrzEntity);
		mLifeCycleInfo.setB(mBcgdEntity);
		mLifeCycleInfo.setW(mAjdjxxEntity);

		return mLifeCycleInfo;
	}

	/**
	 * 
	 * @author： luxiaolin
	 *  @param type
	 *  @param guid
	 * @description：向后递归算法
	 */
	private void backDg(String type, String guid) {
		String glxxsql1 = "SELECT GUID2 ,LTYPE FROM T_INF_ONEMAP_GLXXB WHERE GUID1='" + guid + "' and ltype like '"+type.toUpperCase()+"_'";
		;
		List<Object[]> t = getStatisticsBySql(glxxsql1);
		int count = t.size();
		if (count > 0) {
			for (int m = 0; m < count; m++) {
				Object[] objects = t.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				String guid2 = objects[0] != null ? objects[0].toString() : "";
				String ltype = objects[1] != null ? objects[1].toString() : "";

				if (!TextUtils.isEmpty(ltype) && (ltype.length() > 1)) {
					String typel = ltype.substring(1, 2);
					backsqldata = backsqldata + typel + "," + guid2 + ";";
					backDg(typel, guid2);
				}
			}

		} else {
		}
	}

	/**
	 * 
	 * @author： luxiaolin
	 *  @param type
	 *  @param guid
	 * @description：向前递归算法
	 */
	private void beforeDg(String type, String guid) {
		String glxxsql2 = "SELECT GUID1 ,LTYPE  FROM T_INF_ONEMAP_GLXXB WHERE GUID2='" + guid + "' and ltype like '_"+type.toUpperCase()+"'";
		List<Object[]> t = getStatisticsBySql(glxxsql2);
		int count = t.size();
		if (count > 0) {
			for (int m = 0; m < count; m++) {
				Object[] objects = t.get(m);
				int count1 = objects.length;
				if (count1 < 1) {
					continue;
				}
				String guid2 = objects[0] != null ? objects[0].toString() : "";
				String ltype = objects[1] != null ? objects[1].toString() : "";

				if (!TextUtils.isEmpty(ltype) && (ltype.length() > 1)) {
					String typel = ltype.substring(0, 1);
					beforesqldata = beforesqldata + typel + "," + guid2 + ";";
					beforeDg(typel, guid2);
				}
			}
		} else {
		}
	}

	/**
	 * 
	 * @author： luxiaolin
	 *  @param sql
	 *  @param type
	 *  @return
	 * @description：得到对应查询数据实体类数据
	 */
	private <T> T getObj(String sql, String type) {
		List<Object[]> t = getStatisticsBySql(sql);
		Map mObjString = null;
		T mBcgdEntity = null;
		Class mClass = null;
		int count = t.size();
		if (count > 0) {
			Object[] objects = t.get(0);
			mObjString = getObjTString(objects, type);
			if (null != mObjString) {
				if ("p".equalsIgnoreCase(type)) {
					mClass = JsydspEntity.class;
				} else if ("z".equalsIgnoreCase(type)) {
					mClass = ZdxxEntity.class;
				} else if ("c".equalsIgnoreCase(type)) {
					mClass = CbydEntity.class;
				} else if ("g".equalsIgnoreCase(type)) {
					mClass = TdgyEntity.class;
				} else if ("y".equalsIgnoreCase(type)) {
					mClass = ZrzEntity.class;
				} else if ("b".equalsIgnoreCase(type)) {
					mClass = BcgdEntity.class;
				} else if ("w".equalsIgnoreCase(type)) {
					mClass = AjdjxxEntity.class;
				}
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

	/**
	 * 
	 * @author： luxiaolin
	 *  @param objects
	 * @param type 
	 *  @return
	 * @description：根据Object[]获取Map
	 */
	private Map getObjTString(Object[] objects, String type) {
		String mSelectKey = "";
		if ("p".equalsIgnoreCase(type)) {
			mSelectKey = JsydspEntity.selectKey;
			;
		} else if ("z".equalsIgnoreCase(type)) {
			mSelectKey = ZdxxEntity.selectKey;
			;
		} else if ("c".equalsIgnoreCase(type)) {
			mSelectKey = CbydEntity.selectKey;
			;
		} else if ("g".equalsIgnoreCase(type)) {
			mSelectKey = TdgyEntity.selectKey;
			;
		} else if ("y".equalsIgnoreCase(type)) {
			mSelectKey = ZrzEntity.selectKey;
			;
		} else if ("b".equalsIgnoreCase(type)) {
			mSelectKey = BcgdEntity.selectKey;
			;
		} else if ("w".equalsIgnoreCase(type)) {
			mSelectKey = AjdjxxEntity.selectKey;
			;
		}
		String mselectKeyMap[] = mSelectKey.split(",");
		int countmap = mselectKeyMap.length;
		Map<String, Object> map = null;
		int count = objects.length;
		if ((count > 0) && (countmap > 0) && (countmap == count)) {
			map = new HashMap<String, Object>();
			for (int i = 0; i < count; i++) {
				if (null != objects[i]) {
					if ("st_astext".equalsIgnoreCase(mselectKeyMap[i])) {
						map.put("geometry", objects[i]);
					} else {
						map.put((mselectKeyMap[i]+"").trim(), objects[i]);
					}

				} else {
					map.put((mselectKeyMap[i]+"").trim(), "");
				}
			}
		}
		return map;
	}

}

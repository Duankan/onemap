package com.kingtopware.framework.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.geotools.data.DataStore;
import org.geotools.data.DataStoreFinder;
import org.geotools.data.DefaultTransaction;
import org.geotools.data.FeatureSource;
import org.geotools.data.FeatureStore;
import org.geotools.data.Transaction;
import org.geotools.data.postgis.PostgisNGDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureStore;
import org.geotools.feature.DefaultFeatureCollection;
import org.geotools.feature.FeatureCollection;
import org.geotools.filter.text.cql2.CQL;
import org.geotools.filter.text.cql2.CQLException;
import org.geotools.geojson.feature.FeatureJSON;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;
import com.kingtopware.framework.service.PostGISService;
import com.kingtopware.framework.util.PropertyUtil;

@Component
public class PostGISServiceImpl implements PostGISService {
	private static Logger logger = Logger.getLogger(PostGISServiceImpl.class);
	static PostgisNGDataStoreFactory factory = new PostgisNGDataStoreFactory();
	static DataStore pgDatastore;

	public void conn() {
		Map params = new HashMap();
		String dbtype = PropertyUtil.get("postgisdbtype");
		String host = PropertyUtil.get("postgisurl");
		String port = PropertyUtil.get("postgisport");
		String database = PropertyUtil.get("postgisdatabase");
		String userName = PropertyUtil.get("postgisusername");
		String password = PropertyUtil.get("postgispassword");
		conn(dbtype, host, port, database, userName, password);

	}

	public void conn(String dbtype, String host, String port, String database, String userName, String password) {
		Map params = new HashMap();
		params.put(PostgisNGDataStoreFactory.DBTYPE.key, dbtype);
		params.put(PostgisNGDataStoreFactory.HOST.key, host);
		params.put(PostgisNGDataStoreFactory.PORT.key, new Integer(port));
		params.put(PostgisNGDataStoreFactory.DATABASE.key, database);
		params.put(PostgisNGDataStoreFactory.SCHEMA.key, "public");
		params.put(PostgisNGDataStoreFactory.USER.key, userName);
		params.put(PostgisNGDataStoreFactory.PASSWD.key, password);
		params.put("Expose primary keys", true);

		try {
			pgDatastore = DataStoreFinder.getDataStore(params);
			if (pgDatastore != null) {
				System.out.println("系统连接到位于：" + host + "的空间数据库" +

						database + "成功！");
			} else {
				System.out.println("系统连接到位于：" + host + "的空间数据库" +

						database + "失败！请检查相关参数");
				// return false;
			}
		} catch (IOException e) {
			logger.info("系统连接到位于：" + host + "的空间数据库" + database + "失败！请检查相关参数");
			logger.error(e.getMessage(), e);
		}

	}

	public SimpleFeature geojsontofeature(JSONObject feature) throws IOException {
		FeatureJSON fj = new FeatureJSON();
		String json = feature.toJSONString();
		InputStream in = new ByteArrayInputStream(json.getBytes());
		SimpleFeature sfeature = fj.readFeature(in);
		return sfeature;
	}

	public FeatureCollection geojsontofeaturecollection(JSONObject feature) throws IOException {
		FeatureJSON fj = new FeatureJSON();
		String json = feature.toJSONString();
		InputStream in = new ByteArrayInputStream(json.getBytes());
		FeatureCollection featurecollection = fj.readFeatureCollection(in);
		return featurecollection;
	}

	public void InsertFeature(String LayerName, SimpleFeature feature) throws IOException {
		FeatureSource featureSource = pgDatastore.getFeatureSource(LayerName);
		FeatureStore featureStore = (FeatureStore) featureSource;
		DefaultFeatureCollection featureCollection = new DefaultFeatureCollection();
		featureCollection.add(feature);
		featureStore.addFeatures(featureCollection);

	}

	public void InsertFeatures(String LayerName, FeatureCollection featurecollection) throws IOException {
		FeatureSource featureSource = pgDatastore.getFeatureSource(LayerName);
		FeatureStore featureStore = (FeatureStore) featureSource;
		featureStore.addFeatures(featurecollection);

	}

	public void DeleteByCQL(String layername, String cql) throws IOException, CQLException {
		FeatureSource featureSource = pgDatastore.getFeatureSource(layername);
		FeatureStore featureStore = (FeatureStore) featureSource;
		featureStore.removeFeatures(CQL.toFilter(cql));

	}

	public FeatureCollection SeacrchByCQL(String layername, String cql) throws IOException, CQLException {
		FeatureSource featureSource = pgDatastore.getFeatureSource(layername);
		FeatureStore featureStore = (FeatureStore) featureSource;
		FeatureCollection featurecollection = featureStore.getFeatures(CQL.toFilter(cql));
		return featurecollection;
	}

	public void UpdataFeature(String LayerName, SimpleFeature feature, String filterStr) throws IOException {
		FeatureSource featureSource = pgDatastore.getFeatureSource(LayerName);
		SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;
		Transaction transaction = new DefaultTransaction("create");
		featureStore.setTransaction(transaction);
		try {
			String[] names = new String[feature.getAttributeCount() - 2];
			Object[] values = new Object[feature.getAttributeCount() - 2];
			for (int i = 0; i < feature.getAttributeCount() - 3; i++) {
				values[i] = feature.getAttribute(i + 1);
				names[i] = feature.getType().getAttributeDescriptors().get(i + 1).getLocalName();
			}
			values[feature.getAttributeCount() - 3] = feature.getAttribute(feature.getAttributeCount() - 1);
			names[feature.getAttributeCount() - 3] = feature.getType().getAttributeDescriptors()
					.get(feature.getAttributeCount() - 1).getLocalName();
			featureStore.modifyFeatures(names, values, CQL.toFilter(filterStr));
			transaction.commit();
		} catch (Exception problem) {
			logger.error(problem.getMessage(), problem);
			try {
				transaction.rollback();
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}

		} finally {
			try {
				transaction.close();
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
		}

	}

	public void UpdataFeature(String LayerName, SimpleFeature feature) throws IOException {
		FeatureSource featureSource = pgDatastore.getFeatureSource(LayerName);
		SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;
		Transaction transaction = new DefaultTransaction("create");
		String filterStr = "";
		filterStr = "ID='" + feature.getAttribute("ID") + "'";
		featureStore.setTransaction(transaction);
		try {
			String[] names = new String[feature.getAttributeCount() - 3];
			Object[] values = new Object[feature.getAttributeCount() - 3];
			for (int i = 0; i < feature.getAttributeCount() - 3; i++) {
				values[i] = feature.getAttribute(i + 2);
				names[i] = feature.getType().getAttributeDescriptors().get(i + 2).getLocalName();
			}
			values[feature.getAttributeCount() - 4] = feature.getAttribute(feature.getAttributeCount() - 1);
			names[feature.getAttributeCount() - 4] = feature.getType().getAttributeDescriptors()
					.get(feature.getAttributeCount() - 1).getLocalName();
			featureStore.modifyFeatures(names, values, CQL.toFilter(filterStr));
			transaction.commit();
		} catch (Exception problem) {
			problem.printStackTrace();
			logger.error(problem.getMessage(), problem);
			try {
				transaction.rollback();
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}

		} finally {
			try {
				transaction.close();
			} catch (IOException e) {
				e.printStackTrace();
				logger.error(e.getMessage(), e);
			}
		}

	}

}

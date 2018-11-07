package com.kingtopware.framework.service;

import java.io.IOException;

import org.geotools.feature.FeatureCollection;
import org.geotools.filter.text.cql2.CQLException;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;

@Component
public interface PostGISService {
	// 读取配置文件连接空间数据库
	public void conn();

	// 根据所传条件连接空间数据库
	public void conn(String dbtype, String host, String port, String database, String userName, String password);

	// 将Geojson对象转化成feature并返回feature对象
	public SimpleFeature geojsontofeature(JSONObject feature) throws IOException;

	// 将Geojson对象转化成featurecollection并返回featurecollection对象
	public FeatureCollection geojsontofeaturecollection(JSONObject feature) throws IOException;

	// 新增要素，LayerName为新增表名，feature为要新增的feature
	public void InsertFeature(String LayerName, SimpleFeature feature) throws IOException;

	// 新增要素，LayerName为新增表名，featurecollection为要新增的featurecollection
	public void InsertFeatures(String LayerName, FeatureCollection featurecollection) throws IOException;

	// 根据CQL删除要素，layername为表名，cql为删除元素条件
	public void DeleteByCQL(String layername, String cql) throws IOException, CQLException;

	// 根据cql查询，返回要素集。
	public FeatureCollection SeacrchByCQL(String layername, String cql) throws IOException, CQLException;

	// 根据条件修改要素，
	public void UpdataFeature(String LayerName, SimpleFeature feature, String filterStr) throws IOException;

	// 修改要素 LayerName为要修改的要素所在的数据表名
	public void UpdataFeature(String LayerName, SimpleFeature feature) throws IOException;

}

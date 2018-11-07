package com.kingtopware.framework.util;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.List;
import java.util.Set;
import net.sf.json.JSONException;

import org.apache.log4j.Logger;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.geotools.gml2.SrsSyntax;
import org.geotools.referencing.CRS;
import org.geotools.referencing.NamedIdentifier;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.feature.type.AttributeDescriptor;
import org.opengis.feature.type.GeometryDescriptor;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.ReferenceIdentifier;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import com.vividsolutions.jts.geom.Geometry;

@SuppressWarnings({ "rawtypes", "unused" })
public class JSONOutputFormat {
	private static Logger logger=Logger.getLogger(JSONOutputFormat.class);

	public void write(FeatureCollection featureCollections, OutputStream output, int k)
			throws IOException {
		String id_option = null; // null - default, "" - none, or "property"
		OutputStreamWriter osw = null;
		Writer outWriter = null;
		try {
			osw = new OutputStreamWriter(output, "UTF-8");
			outWriter = new BufferedWriter(osw);
		    GeoJSONBuilder jsonWriter = new GeoJSONBuilder(outWriter);
			jsonWriter.object().key("type").value("FeatureCollection");
			if (k >= 0) {
				jsonWriter.key("totalFeatures").value(k);
			}
			jsonWriter.key("features");
			jsonWriter.array();
			CoordinateReferenceSystem crs = null;
			//for(int i = 0; i < featureCollections.size(); i++) {
				FeatureIterator iterator = featureCollections.features();
				try {
					SimpleFeatureType fType;
					List<AttributeDescriptor> types;
					while (iterator.hasNext()) {
						SimpleFeature feature = (SimpleFeature)iterator.next();
						jsonWriter.object();
						jsonWriter.key("type").value("Feature");
						fType = feature.getFeatureType();
						types = fType.getAttributeDescriptors();
						if (id_option == null) {
							jsonWriter.key("id").value(feature.getID());
						} else if (id_option.length() != 0) {
							Object value = feature.getAttribute(id_option);
							jsonWriter.key("id").value(value);
						}
						GeometryDescriptor defaultGeomType = fType.getGeometryDescriptor();
						if (defaultGeomType != null) {
							CoordinateReferenceSystem featureCrs = defaultGeomType.getCoordinateReferenceSystem();
							jsonWriter.setAxisOrder(CRS.getAxisOrder(featureCrs));
							if (crs == null) crs = featureCrs;
						} else {
							jsonWriter.setAxisOrder(CRS.AxisOrder.EAST_NORTH);
						}
						jsonWriter.key("geometry");
						Geometry aGeom = (Geometry)feature.getDefaultGeometry();
						if (aGeom == null) {
							for(int j = 0; j < types.size() && aGeom == null; j++) {
								Object value = feature.getAttribute(j);
								if (value != null && value instanceof Geometry) {
									aGeom = (Geometry)value;
								}
							}
						}
						if (aGeom != null) {
							jsonWriter.writeGeom(aGeom);
						} else {
							jsonWriter.value(null);
						}
						if (defaultGeomType != null)
							jsonWriter.key("geometry_name").value(defaultGeomType.getLocalName());
						jsonWriter.key("properties");
						jsonWriter.object();
						for(int j = 0; j < types.size(); j++) {
							Object value = feature.getAttribute(j);
							AttributeDescriptor ad = types.get(j);
							if (id_option != null && id_option.equals(ad.getLocalName())) {
								continue;
							}
							if (value != null) {
								if (value instanceof Geometry) {
									if (ad.equals(defaultGeomType)) {} else {
										jsonWriter.key(ad.getLocalName());
										jsonWriter.writeGeom((Geometry)value);
									}
								} else {
									jsonWriter.key(ad.getLocalName());
									jsonWriter.value(value);
								}
							} else {
								jsonWriter.key(ad.getLocalName());
								jsonWriter.value(null);
							}
						}
						jsonWriter.endObject();
						jsonWriter.endObject();
					}
				} finally {
					iterator.close();
				}
			
			jsonWriter.endArray();
			try {
				writeCrs(jsonWriter, crs);
			} catch (Exception e) {
				logger.error(e.getMessage(),e);
				throw (IOException)new IOException("Error looking up crs identifier").initCause(e);
			}
			jsonWriter.endObject();
			outWriter.flush();
		} catch (JSONException jsonException) {}
	}

	private void writeCrs(final GeoJSONBuilder jsonWriter, CoordinateReferenceSystem crs) throws FactoryException {
		if (crs != null) {
			String identifier = null;
			Integer code = CRS.lookupEpsgCode(crs, true);
			if (code != null) {
				identifier = SrsSyntax.OGC_URN.getPrefix() + code;
			} else {
				identifier = CRS.lookupIdentifier(crs, true);
			}
			jsonWriter.key("crs");
			jsonWriter.object();
			jsonWriter.key("type").value("name");
			jsonWriter.key("properties");
			jsonWriter.object();
			jsonWriter.key("name");
			jsonWriter.value(identifier);
			jsonWriter.endObject(); // end properties
			jsonWriter.endObject(); // end crs
		} else {
			jsonWriter.key("crs");
			jsonWriter.value(null);
		}
	}

	private void writeCrsLegacy(final GeoJSONBuilder jsonWriter, CoordinateReferenceSystem crs) {
		if (crs != null) {
			Set<ReferenceIdentifier> ids = crs.getIdentifiers();
			if (ids != null && ids.size() > 0) {
				NamedIdentifier namedIdent = (NamedIdentifier)ids.iterator().next();
				String csStr = namedIdent.getCodeSpace().toUpperCase();

				if (csStr.equals("EPSG")) {
					jsonWriter.key("crs");
					jsonWriter.object();
					jsonWriter.key("type").value(csStr);
					jsonWriter.key("properties");
					jsonWriter.object();
					jsonWriter.key("code");
					jsonWriter.value(namedIdent.getCode());
					jsonWriter.endObject(); // end properties
					jsonWriter.endObject(); // end crs
				}
			}
		}
	}
}

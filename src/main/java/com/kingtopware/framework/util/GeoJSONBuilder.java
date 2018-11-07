package com.kingtopware.framework.util;

import java.io.Writer;
import java.util.Calendar;
import net.sf.json.JSONException;
import net.sf.json.util.JSONBuilder;
import org.geotools.geometry.jts.coordinatesequence.CoordinateSequences;
import org.geotools.referencing.CRS;
import org.geotools.util.Converters;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.CoordinateSequence;
import com.vividsolutions.jts.geom.Envelope;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.MultiLineString;
import com.vividsolutions.jts.geom.MultiPoint;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.Polygon;
import com.vividsolutions.jts.geom.impl.CoordinateArraySequence;

public class GeoJSONBuilder extends JSONBuilder {
	private CRS.AxisOrder axisOrder = CRS.AxisOrder.EAST_NORTH;

	public GeoJSONBuilder(Writer w) {
		super(w);
	}

	public JSONBuilder writeGeom(Geometry geometry) throws JSONException {
		this.object();
		this.key("type");
		this.value(getGeometryName(geometry));
		int geometryType = getGeometryType(geometry);
		if (geometryType != MULTIGEOMETRY) {
			this.key("coordinates");
			switch (geometryType) {
			case POINT:
				Point point = (Point)geometry;
				Coordinate c = point.getCoordinate();
				writeCoordinate(c.x, c.y, c.z);
				break;
			case LINESTRING:
				writeCoordinates(((LineString)geometry).getCoordinateSequence());
				break;
			case MULTIPOINT:
				writeCoordinates(geometry.getCoordinates());
				break;
			case POLYGON:
				writePolygon((Polygon)geometry);
				break;
			case MULTILINESTRING:
				this.array();
				for(int i = 0, n = geometry.getNumGeometries(); i < n; i++) {
					writeCoordinates(((LineString)geometry.getGeometryN(i)).getCoordinateSequence());
				}
				this.endArray();
				break;
			case MULTIPOLYGON:
				this.array();
				for(int i = 0, n = geometry.getNumGeometries(); i < n; i++) {
					writePolygon((Polygon)geometry.getGeometryN(i));
				}
				this.endArray();
				break;
			}
		} else {
			writeGeomCollection((GeometryCollection)geometry);
		}

		return this.endObject();
	}

	private JSONBuilder writeGeomCollection(GeometryCollection collection) {
		this.key("geometries");
		this.array();
		for(int i = 0, n = collection.getNumGeometries(); i < n; i++) {
			writeGeom(collection.getGeometryN(i));
		}
		return this.endArray();
	}

	private JSONBuilder writeCoordinates(Coordinate[] coords) throws JSONException {
		return writeCoordinates(new CoordinateArraySequence(coords));
	}

	private JSONBuilder writeCoordinates(CoordinateSequence coords) throws JSONException {
		this.array();
		int dim = CoordinateSequences.coordinateDimension(coords);
		for(int i = 0; i < coords.size(); i++) {
			double z = dim > 2 ? coords.getOrdinate(i, 2) : Double.NaN;
			writeCoordinate(coords.getX(i), coords.getY(i), z);
		}
		return this.endArray();
	}

	@SuppressWarnings("unused")
	private JSONBuilder writeCoordinate(double x, double y) {
		return writeCoordinate(x, y, Double.NaN);
	}

	private JSONBuilder writeCoordinate(double x, double y, double z) {
		this.array();
		if (axisOrder == CRS.AxisOrder.NORTH_EAST) {
			this.value(y);
			this.value(x);
		} else {
			this.value(x);
			this.value(y);
		}
		if (!Double.isNaN(z)) {
			this.value(z);
		}
		return this.endArray();
	}

	protected JSONBuilder writeBoundingBox(Envelope env) {
		this.key("bbox");
		this.array();
		if (axisOrder == CRS.AxisOrder.NORTH_EAST) {
			this.value(env.getMinY());
			this.value(env.getMinX());
			this.value(env.getMaxY());
			this.value(env.getMaxX());
		} else {
			this.value(env.getMinX());
			this.value(env.getMinY());
			this.value(env.getMaxX());
			this.value(env.getMaxY());
		}
		return this.endArray();
	}

	private void writePolygon(Polygon geometry) throws JSONException {
		this.array();
		writeCoordinates(geometry.getExteriorRing().getCoordinateSequence());

		for(int i = 0, ii = geometry.getNumInteriorRing(); i < ii; i++) {
			writeCoordinates(geometry.getInteriorRingN(i).getCoordinateSequence());
		}

		this.endArray();
	}

	/** Internal representation of OGC SF Point */
	protected static final int POINT = 1;

	/** Internal representation of OGC SF LineString */
	protected static final int LINESTRING = 2;

	/** Internal representation of OGC SF Polygon */
	protected static final int POLYGON = 3;

	/** Internal representation of OGC SF MultiPoint */
	protected static final int MULTIPOINT = 4;

	/** Internal representation of OGC SF MultiLineString */
	protected static final int MULTILINESTRING = 5;

	/** Internal representation of OGC SF MultiPolygon */
	protected static final int MULTIPOLYGON = 6;

	/** Internal representation of OGC SF MultiGeometry */
	protected static final int MULTIGEOMETRY = 7;

	public static String getGeometryName(Geometry geometry) {
		if (geometry instanceof Point) {
			return "Point";
		} else if (geometry instanceof LineString) {
			return "LineString";
		} else if (geometry instanceof Polygon) {
			return "Polygon";
		} else if (geometry instanceof MultiPoint) {
			return "MultiPoint";
		} else if (geometry instanceof MultiLineString) {
			return "MultiLineString";
		} else if (geometry instanceof MultiPolygon) {
			return "MultiPolygon";
		} else if (geometry instanceof GeometryCollection) {
			return "GeometryCollection";
		} else {
			throw new IllegalArgumentException("Unknown geometry type " + geometry.getClass());
		}
	}

	public static int getGeometryType(Geometry geometry) {
		if (geometry instanceof Point) {
			return POINT;
		} else if (geometry instanceof LineString) {
			return LINESTRING;
		} else if (geometry instanceof Polygon) {
			return POLYGON;
		} else if (geometry instanceof MultiPoint) {
			return MULTIPOINT;
		} else if (geometry instanceof MultiLineString) {
			return MULTILINESTRING;
		} else if (geometry instanceof MultiPolygon) {
			return MULTIPOLYGON;
		} else if (geometry instanceof GeometryCollection) {
			return MULTIGEOMETRY;
		} else {
			throw new IllegalArgumentException("Unable to determine geometry type " + geometry.getClass());
		}
	}

	@Override
	public GeoJSONBuilder value(Object value) {
		if (value instanceof java.util.Date || value instanceof Calendar) {
			value = Converters.convert(value, String.class);
		}
		super.value(value);
		return this;
	}

	public void setAxisOrder(CRS.AxisOrder axisOrder) {
		this.axisOrder = axisOrder;
	}
}

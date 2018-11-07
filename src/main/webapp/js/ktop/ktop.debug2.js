(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ktop"] = factory();
	else
		root["ktop"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var EsriLeaflet = { //jshint ignore:line
  VERSION: '1.0.4',
  Layers: {},
  Services: {},
  Controls: {},
  Tasks: {},
  Util: {},
  Support: {
    CORS: !!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
    pointerEvents: document.documentElement.style.pointerEvents === ''
  }
};

if(typeof window !== 'undefined' && window.L){
  window.L.esri = EsriLeaflet;
}
module.exports = EsriLeaflet;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/** @license
 *
 *  Copyright (C) 2012 K. Arthur Endsley (kaendsle@mtu.edu)
 *  Michigan Tech Research Institute (MTRI)
 *  3600 Green Court, Suite 100, Ann Arbor, MI, 48105
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * @augments Wkt.Wkt
 * A framework-dependent flag, set for each Wkt.Wkt() instance, that indicates
 * whether or not a closed polygon geometry should be interpreted as a rectangle.
 */
const Wkt = __webpack_require__(43);

Wkt.Wkt.prototype.isRectangle = false;

/**
 * @augments Wkt.Wkt
 * Truncates an Array of coordinates by the closing coordinate when it is
 * equal to the first coordinate given--this is only to be used for closed
 * geometries in order to provide merely an "implied" closure to Leaflet.
 * @param   coords  {Array}     An Array of x,y coordinates (objects)
 * @return          {Array}
 */
Wkt.Wkt.prototype.trunc = function (coords) {
	var i, verts = [];

	for (i = 0; i < coords.length; i += 1) {
		if (Wkt.isArray(coords[i])) {
			verts.push(this.trunc(coords[i]));

		} else {

			// Add the first coord, but skip the last if it is identical
			if (i === 0 || !this.sameCoords(coords[0], coords[i])) {
				verts.push(coords[i]);
			}
		}
	}

	return verts;
};

/**
 * @augments Wkt.Wkt
 * An object of framework-dependent construction methods used to generate
 * objects belonging to the various geometry classes of the framework.
 */
Wkt.Wkt.prototype.construct = {
	/**
	 * Creates the framework's equivalent point geometry object.
	 * @param   config      {Object}    An optional properties hash the object should use
	 * @param   component   {Object}    An optional component to build from
	 * @return              {L.marker}
	 */
	point: function (config, component) {
		var coord = component || this.components;
		if (coord instanceof Array) {
			coord = coord[0];
		}

		return L.marker(this.coordsToLatLng(coord), config);
	},

	/**
	 * Creates the framework's equivalent multipoint geometry object.
	 * @param   config  {Object}    An optional properties hash the object should use
	 * @return          {L.featureGroup}
	 */
	multipoint: function (config) {
		var i,
			layers = [],
			coords = this.components;

		for (i = 0; i < coords.length; i += 1) {
			layers.push(this.construct.point.call(this, config, coords[i]));
		}

		return L.featureGroup(layers, config);
	},

	/**
	 * Creates the framework's equivalent linestring geometry object.
	 * @param   config      {Object}    An optional properties hash the object should use
	 * @param   component   {Object}    An optional component to build from
	 * @return              {L.polyline}
	 */
	linestring: function (config, component) {
		var coords = component || this.components,
			latlngs = this.coordsToLatLngs(coords);

		return L.polyline(latlngs, config);
	},

	/**
	 * Creates the framework's equivalent multilinestring geometry object.
	 * @param   config  {Object}    An optional properties hash the object should use
	 * @return          {L.multiPolyline}
	 */
	multilinestring: function (config) {
		var coords = this.components,
			latlngs = this.coordsToLatLngs(coords, 1);

		if (L.multiPolyline) {
			return L.multiPolyline(latlngs, config);
		}
		else {
			return L.polyline(latlngs, config);
		}
	},

	/**
	 * Creates the framework's equivalent polygon geometry object.
	 * @param   config      {Object}    An optional properties hash the object should use
	 * @return              {L.multiPolygon}
	 */
	polygon: function (config) {
		// Truncate the coordinates to remove the closing coordinate
		var coords = this.trunc(this.components),
			latlngs = this.coordsToLatLngs(coords, 1, config);
		return L.polygon(latlngs, config);
	},

	/**
	 * Creates the framework's equivalent multipolygon geometry object.
	 * @param   config  {Object}    An optional properties hash the object should use
	 * @return          {L.multiPolygon}
	 */
	multipolygon: function (config) {
		// Truncate the coordinates to remove the closing coordinate
		var coords = this.trunc(this.components),
			latlngs = this.coordsToLatLngs(coords, 2, config);

		if (L.multiPolygon) {
			return L.multiPolygon(latlngs, config);
		}
		else {
			return L.polygon(latlngs, config);
		}
	},

	/**
	 * Creates the framework's equivalent collection of geometry objects.
	 * @param   config  {Object}    An optional properties hash the object should use
	 * @return          {L.featureGroup}
	 */
	geometrycollection: function (config) {
		var comps, i, layers;

		comps = this.trunc(this.components);
		layers = [];
		for (i = 0; i < this.components.length; i += 1) {
			layers.push(this.construct[comps[i].type].call(this, comps[i]));
		}

		return L.featureGroup(layers, config);

	}
};

L.Util.extend(Wkt.Wkt.prototype, {
	coordsToLatLngs: function (coords, levelsDeep, config, coordsToLatLng) {
		var latlng, i, len,
			latlngs = [];

		for (i = 0, len = coords.length; i < len; i++) {
			latlng = levelsDeep ?
				this.coordsToLatLngs(coords[i], levelsDeep - 1, config, coordsToLatLng) :
				(coordsToLatLng || this.coordsToLatLng)(coords[i],config);

			latlngs.push(latlng);
		}

		return latlngs;
	},
	coordsToLatLng: function (coords, reverse) {
		var lat = reverse ? coords.x : coords.y,
		lng = reverse ? coords.y : coords.x;

		return L.latLng(lat, lng, true);
	}
});

/**
 * @augments Wkt.Wkt
 * A framework-dependent deconstruction method used to generate internal
 * geometric representations from instances of framework geometry. This method
 * uses object detection to attempt to classify members of framework geometry
 * classes into the standard WKT types.
 * @param   obj {Object}    An instance of one of the framework's geometry classes
 * @return      {Object}    A hash of the 'type' and 'components' thus derived
 */
Wkt.Wkt.prototype.deconstruct = function (obj) {
	var attr, coordsFromLatLngs, features, i, verts, rings, tmp;

	/**
	 * Accepts an Array (arr) of LatLngs from which it extracts each one as a
	 *  vertex; calls itself recursively to deal with nested Arrays.
	 */
	coordsFromLatLngs = function (arr) {
		var i, coords;

		coords = [];
		for (i = 0; i < arr.length; i += 1) {
			if (Wkt.isArray(arr[i])) {
				coords.push(coordsFromLatLngs(arr[i]));

			} else {
				coords.push({
					x: arr[i].lng,
					y: arr[i].lat
				});
			}
		}

		return coords;
	};

	// L.Marker ////////////////////////////////////////////////////////////////
	if (obj.constructor === L.Marker || obj.constructor === L.marker) {
		return {
			type: 'point',
			components: [{
				x: obj.getLatLng().lat,
				y: obj.getLatLng().lng
			}]
		};
	}

	// L.Rectangle /////////////////////////////////////////////////////////////
	if (obj.constructor === L.Rectangle || obj.constructor === L.rectangle) {
		tmp = obj.getBounds(); // L.LatLngBounds instance
		return {
			type: 'polygon',
			isRectangle: true,
			components: [
				[
					{ // NW corner
						x: tmp.getSouthWest().lat,
						y: tmp.getNorthEast().lng
					},
					{ // NE corner
						x: tmp.getNorthEast().lat,
						y: tmp.getNorthEast().lng
					},
					{ // SE corner
						x: tmp.getNorthEast().lat,
						y: tmp.getSouthWest().lng
					},
					{ // SW corner
						x: tmp.getSouthWest().lat,
						y: tmp.getSouthWest().lng
					},
					{ // NW corner (again, for closure)
						x: tmp.getSouthWest().lat,
						y: tmp.getNorthEast().lng
					}
				]
			]
		};

	}

	// L.Polyline //////////////////////////////////////////////////////////////
	if (obj.constructor === L.Polyline || obj.constructor === L.polyline) {
		verts = [];
		tmp = obj.getLatLngs();

		if (!tmp[0].equals(tmp[tmp.length - 1])) {

			for (i = 0; i < tmp.length; i += 1) {
				verts.push({
					x: tmp[i].lat,
					y: tmp[i].lng
				});
			}

			return {
				type: 'linestring',
				components: verts
			};

		}
	}

	// L.Polygon ///////////////////////////////////////////////////////////////

	if (obj.constructor === L.Polygon || obj.constructor === L.polygon) {
		rings = [];
		verts = [];
		tmp = obj.getLatLngs();

		// First, we deal with the boundary points
		for (i = 0; i < obj._latlngs.length; i += 1) {
			verts.push({ // Add the first coordinate again for closure
				x: tmp[i].lat,
				y: tmp[i].lng
			});
		}

		verts.push({ // Add the first coordinate again for closure
			x: tmp[0].lat,
			y: tmp[0].lng
		});

		rings.push(verts);

		// Now, any holes
		if (obj._holes && obj._holes.length > 0) {
			// Reworked to support holes properly
			verts = coordsFromLatLngs(obj._holes);
			for (i=0; i < verts.length;i++) {
				verts[i].push(verts[i][0]); // Copy the beginning coords again for closure
				rings.push(verts[i]);
			}
		}

		return {
			type: 'polygon',
			components: rings
		};

	}

	// L.MultiPolyline /////////////////////////////////////////////////////////
	// L.MultiPolygon //////////////////////////////////////////////////////////
	// L.LayerGroup ////////////////////////////////////////////////////////////
	// L.FeatureGroup //////////////////////////////////////////////////////////
	if (obj.constructor === L.MultiPolyline || obj.constructor === L.MultiPolygon
		|| obj.constructor === L.LayerGroup || obj.constructor === L.FeatureGroup) {

		features = [];
		tmp = obj._layers;

		for (attr in tmp) {
			if (tmp.hasOwnProperty(attr)) {
				if (tmp[attr].getLatLngs || tmp[attr].getLatLng) {
					// Recursively deconstruct each layer
					features.push(this.deconstruct(tmp[attr]));
				}
			}
		}

		return {

			type: (function () {
				switch (obj.constructor) {
					case L.MultiPolyline:
						return 'multilinestring';
					case L.MultiPolygon:
						return 'multipolygon';
					case L.FeatureGroup:
						return (function () {
							var i, mpgon, mpline, mpoint;

							// Assume that all layers are of one type (any one type)
							mpgon = true;
							mpline = true;
							mpoint = true;

							for (i in obj._layers) {
								if (obj._layers.hasOwnProperty(i)) {
									if (obj._layers[i].constructor !== L.Marker) {
										mpoint = false;
									}
									if (obj._layers[i].constructor !== L.Polyline) {
										mpline = false;
									}
									if (obj._layers[i].constructor !== L.Polygon) {
										mpgon = false;
									}
								}
							}

							if (mpoint) {
								return 'multipoint';
							}
							if (mpline) {
								return 'multilinestring';
							}
							if (mpgon) {
								return 'multipolygon';
							}
							return 'geometrycollection';

						}());
					default:
						return 'geometrycollection';
				}
			}()),

			components: (function () {
				// Pluck the components from each Wkt
				var i, comps;

				comps = [];
				for (i = 0; i < features.length; i += 1) {
					if (features[i].components) {
						comps.push(features[i].components);
					}
				}

				return comps;
			}())

		};

	}

	// L.Circle ////////////////////////////////////////////////////////////////
	if (obj.constructor === L.Circle || obj.constructor === L.circle) {
		console.log('Deconstruction of L.Circle objects is not yet supported');

	} else {
		console.log('The passed object does not have any recognizable properties.');
	}

};

module.exports = Wkt;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);

__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
const EsriLeaflet = __webpack_require__(42);
const Wkt = __webpack_require__(2);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);
__webpack_require__(52);
__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);

//require('./ktw.highgis/map/util/obj.js');
//require('./ktw.highgis/map/util/math.js');
//require('./ktw.highgis/map/util/util.js');
//require('./ktw.highgis/map/proj/proj.js');
//require('./ktw.highgis/map/util/xml/xml.js');
//require('./ktw.highgis/map/util/xml/format.xml.js');
//require('./ktw.highgis/map/util/xml/format.xlink.js');
//require('./ktw.highgis/map/util/xml/format.xsd.js');
//require('./ktw.highgis/map/util/xml/format.ows.js');
//require('./ktw.highgis/map/util/xml/format.WMTSCapabilities.js');
//require('./ktw.highgis/map/util/xml/X2JS.js');
//require('./ktw.highgis/map/map/map.extend.js');
//require('./ktw.highgis/map/layer/wmts-extend/wmtsgetcapabilities.js');
//require('./ktw.highgis/map/layer/wmts-extend/tilelayer.wmts.js');


module.exports = {
	EsriLeaflet:EsriLeaflet,
	Wkt: Wkt,
};



/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade
*/
(function (window, document, undefined) {
var oldL = window.L,
    L = {};

L.version = '0.7.7';

// define Leaflet for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = L;

// define Leaflet as an AMD module
} else if (true) {
	!(__WEBPACK_AMD_DEFINE_FACTORY__ = (L),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// define Leaflet as a global L variable, saving the original L to restore later if needed

L.noConflict = function () {
	window.L = oldL;
	return this;
};

window.L = L;


/*
 * L.Util contains various utility functions used throughout Leaflet code.
 */

L.Util = {
	extend: function (dest) { // (Object[, Object, ...]) ->
		var sources = Array.prototype.slice.call(arguments, 1),
		    i, j, len, src;

		for (j = 0, len = sources.length; j < len; j++) {
			src = sources[j] || {};
			for (i in src) {
				if (src.hasOwnProperty(i)) {
					dest[i] = src[i];
				}
			}
		}
		return dest;
	},

	bind: function (fn, obj) { // (Function, Object) -> Function
		var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
		return function () {
			return fn.apply(obj, args || arguments);
		};
	},

	stamp: (function () {
		var lastId = 0,
		    key = '_leaflet_id';
		return function (obj) {
			obj[key] = obj[key] || ++lastId;
			return obj[key];
		};
	}()),

	invokeEach: function (obj, method, context) {
		var i, args;

		if (typeof obj === 'object') {
			args = Array.prototype.slice.call(arguments, 3);

			for (i in obj) {
				method.apply(context, [i, obj[i]].concat(args));
			}
			return true;
		}

		return false;
	},

	limitExecByInterval: function (fn, time, context) {
		var lock, execOnUnlock;

		return function wrapperFn() {
			var args = arguments;

			if (lock) {
				execOnUnlock = true;
				return;
			}

			lock = true;

			setTimeout(function () {
				lock = false;

				if (execOnUnlock) {
					wrapperFn.apply(context, args);
					execOnUnlock = false;
				}
			}, time);

			fn.apply(context, args);
		};
	},

	falseFn: function () {
		return false;
	},

	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	trim: function (str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},

	splitWords: function (str) {
		return L.Util.trim(str).split(/\s+/);
	},

	setOptions: function (obj, options) {
		obj.options = L.extend({}, obj.options, options);
		return obj.options;
	},

	getParamString: function (obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			if(i === 'layers'){
				if(obj[i] === ''){
					continue;
				}else{
					params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
				}
			}
			else{
				params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
			}
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	},

	template: function (str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			var value = data[key];
			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);
			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	},

	isArray: Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	},

	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};

(function () {

	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		var i, fn,
		    prefixes = ['webkit', 'moz', 'o', 'ms'];

		for (i = 0; i < prefixes.length && !fn; i++) {
			fn = window[prefixes[i] + name];
		}

		return fn;
	}

	var lastTime = 0;

	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame ||
	        getPrefixed('RequestAnimationFrame') || timeoutDefer;

	var cancelFn = window.cancelAnimationFrame ||
	        getPrefixed('CancelAnimationFrame') ||
	        getPrefixed('CancelRequestAnimationFrame') ||
	        function (id) { window.clearTimeout(id); };


	L.Util.requestAnimFrame = function (fn, context, immediate, element) {
		fn = L.bind(fn, context);

		if (immediate && requestFn === timeoutDefer) {
			fn();
		} else {
			return requestFn.call(window, fn, element);
		}
	};

	L.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};

}());

// shortcuts for most used utility functions
L.extend = L.Util.extend;
L.bind = L.Util.bind;
L.stamp = L.Util.stamp;
L.setOptions = L.Util.setOptions;


/*
 * L.Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (props) {

	// extended class with the new prototype
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		if (this._initHooks) {
			this.callInitHooks();
		}
	};

	// instantiate class without calling constructor
	var F = function () {};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (props.options && proto.options) {
		props.options = L.extend({}, proto.options, props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	proto._initHooks = [];

	var parent = this;
	// jshint camelcase: false
	NewClass.__super__ = parent.prototype;

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parent.prototype.callInitHooks) {
			parent.prototype.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// method for adding properties to prototype
L.Class.include = function (props) {
	L.extend(this.prototype, props);
};

// merge new default options to the Class
L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
};

// add a constructor hook
L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
};


/*
 * L.Mixin.Events is used to add custom events functionality to Leaflet classes.
 */

var eventsKey = '_leaflet_events';

L.Mixin = {};

L.Mixin.Events = {

	addEventListener: function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])

		// types can be a map of types/handlers
		if (L.Util.invokeEach(types, this.addEventListener, this, fn, context)) { return this; }

		var events = this[eventsKey] = this[eventsKey] || {},
		    contextId = context && context !== this && L.stamp(context),
		    i, len, event, type, indexKey, indexLenKey, typeIndex;

		// types can be a string of space-separated words
		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			event = {
				action: fn,
				context: context || this
			};
			type = types[i];

			if (contextId) {
				// store listeners of a particular context in a separate hash (if it has an id)
				// gives a major performance boost when removing thousands of map layers

				indexKey = type + '_idx';
				indexLenKey = indexKey + '_len';

				typeIndex = events[indexKey] = events[indexKey] || {};

				if (!typeIndex[contextId]) {
					typeIndex[contextId] = [];

					// keep track of the number of keys in the index to quickly check if it's empty
					events[indexLenKey] = (events[indexLenKey] || 0) + 1;
				}

				typeIndex[contextId].push(event);


			} else {
				events[type] = events[type] || [];
				events[type].push(event);
			}
		}

		return this;
	},

	hasEventListeners: function (type) { // (String) -> Boolean
		var events = this[eventsKey];
		return !!events && ((type in events && events[type].length > 0) ||
		                    (type + '_idx' in events && events[type + '_idx_len'] > 0));
	},

	removeEventListener: function (types, fn, context) { // ([String, Function, Object]) or (Object[, Object])

		if (!this[eventsKey]) {
			return this;
		}

		if (!types) {
			return this.clearAllEventListeners();
		}

		if (L.Util.invokeEach(types, this.removeEventListener, this, fn, context)) { return this; }

		var events = this[eventsKey],
		    contextId = context && context !== this && L.stamp(context),
		    i, len, type, listeners, j, indexKey, indexLenKey, typeIndex, removed;

		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			type = types[i];
			indexKey = type + '_idx';
			indexLenKey = indexKey + '_len';

			typeIndex = events[indexKey];

			if (!fn) {
				// clear all listeners for a type if function isn't specified
				delete events[type];
				delete events[indexKey];
				delete events[indexLenKey];

			} else {
				listeners = contextId && typeIndex ? typeIndex[contextId] : events[type];

				if (listeners) {
					for (j = listeners.length - 1; j >= 0; j--) {
						if ((listeners[j].action === fn) && (!context || (listeners[j].context === context))) {
							removed = listeners.splice(j, 1);
							// set the old action to a no-op, because it is possible
							// that the listener is being iterated over as part of a dispatch
							removed[0].action = L.Util.falseFn;
						}
					}

					if (context && typeIndex && (listeners.length === 0)) {
						delete typeIndex[contextId];
						events[indexLenKey]--;
					}
				}
			}
		}

		return this;
	},

	clearAllEventListeners: function () {
		delete this[eventsKey];
		return this;
	},

	fireEvent: function (type, data) { // (String[, Object])
		if (!this.hasEventListeners(type)) {
			return this;
		}

		var event = L.Util.extend({}, data, { type: type, target: this });

		var events = this[eventsKey],
		    listeners, i, len, typeIndex, contextId;

		if (events[type]) {
			// make sure adding/removing listeners inside other listeners won't cause infinite loop
			listeners = events[type].slice();

			for (i = 0, len = listeners.length; i < len; i++) {
				listeners[i].action.call(listeners[i].context, event);
			}
		}

		// fire event for the context-indexed listeners as well
		typeIndex = events[type + '_idx'];

		for (contextId in typeIndex) {
			listeners = typeIndex[contextId].slice();

			if (listeners) {
				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].action.call(listeners[i].context, event);
				}
			}
		}

		return this;
	},

	addOneTimeEventListener: function (types, fn, context) {

		if (L.Util.invokeEach(types, this.addOneTimeEventListener, this, fn, context)) { return this; }

		var handler = L.bind(function () {
			this
			    .removeEventListener(types, fn, context)
			    .removeEventListener(types, handler, context);
		}, this);

		return this
		    .addEventListener(types, fn, context)
		    .addEventListener(types, handler, context);
	}
};

L.Mixin.Events.on = L.Mixin.Events.addEventListener;
L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
L.Mixin.Events.once = L.Mixin.Events.addOneTimeEventListener;
L.Mixin.Events.fire = L.Mixin.Events.fireEvent;


/*
 * L.Browser handles different browser and feature detections for internal Leaflet use.
 */

(function () {

	var ie = 'ActiveXObject' in window,
		ielt9 = ie && !document.addEventListener,

	    // terrible browser detection to work around Safari / iOS / Android browser bugs
	    ua = navigator.userAgent.toLowerCase(),
	    webkit = ua.indexOf('webkit') !== -1,
	    chrome = ua.indexOf('chrome') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android = ua.indexOf('android') !== -1,
	    android23 = ua.search('android [23]') !== -1,
		gecko = ua.indexOf('gecko') !== -1,

	    mobile = typeof orientation !== undefined + '',
	    msPointer = !window.PointerEvent && window.MSPointerEvent,
		pointer = (window.PointerEvent && window.navigator.pointerEnabled) ||
				  msPointer,
	    retina = ('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
	             ('matchMedia' in window && window.matchMedia('(min-resolution:144dpi)') &&
	              window.matchMedia('(min-resolution:144dpi)').matches),

	    doc = document.documentElement,
	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera3d = 'OTransition' in doc.style,
	    any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs;

	var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch));

	L.Browser = {
		ie: ie,
		ielt9: ielt9,
		webkit: webkit,
		gecko: gecko && !webkit && !window.opera && !ie,

		android: android,
		android23: android23,

		chrome: chrome,

		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		opera3d: opera3d,
		any3d: any3d,

		mobile: mobile,
		mobileWebkit: mobile && webkit,
		mobileWebkit3d: mobile && webkit3d,
		mobileOpera: mobile && window.opera,

		touch: touch,
		msPointer: msPointer,
		pointer: pointer,

		retina: retina
	};

}());


/*
 * L.Point represents a point with x and y coordinates.
 */

L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {

	clone: function () {
		return new L.Point(this.x, this.y);
	},

	// non-destructive, returns a new point
	add: function (point) {
		return this.clone()._add(L.point(point));
	},

	// destructive, used directly for performance in situations where it's safe to modify existing point
	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(L.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	distanceTo: function (point) {
		point = L.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	equals: function (point) {
		point = L.point(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	contains: function (point) {
		point = L.point(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	toString: function () {
		return 'Point(' +
		        L.Util.formatNum(this.x) + ', ' +
		        L.Util.formatNum(this.y) + ')';
	}
};

L.point = function (x, y, round) {
	if (x instanceof L.Point) {
		return x;
	}
	if (L.Util.isArray(x)) {
		return new L.Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	return new L.Point(x, y, round);
};


/*
 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

L.Bounds = function (a, b) { //(Point, Point) or Point[]
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
};

L.Bounds.prototype = {
	// extend the bounds to contain the given point
	extend: function (point) { // (Point)
		point = L.point(point);

		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	getCenter: function (round) { // (Boolean) -> Point
		return new L.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	getBottomLeft: function () { // -> Point
		return new L.Point(this.min.x, this.max.y);
	},

	getTopRight: function () { // -> Point
		return new L.Point(this.max.x, this.min.y);
	},

	getSize: function () {
		return this.max.subtract(this.min);
	},

	contains: function (obj) { // (Bounds) or (Point) -> Boolean
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof L.Point) {
			obj = L.point(obj);
		} else {
			obj = L.bounds(obj);
		}

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};

L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
	if (!a || a instanceof L.Bounds) {
		return a;
	}
	return new L.Bounds(a, b);
};


/*
 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

L.Transformation = function (a, b, c, d) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
};

L.Transformation.prototype = {
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (point, scale) {
		scale = scale || 1;
		return new L.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};


/*
 * L.DomUtil contains various utility functions for working with DOM.
 */

L.DomUtil = {
	get: function (id) {
		return (typeof id === 'string' ? document.getElementById(id) : id);
	},

	getStyle: function (el, style) {

		var value = el.style[style];

		if (!value && el.currentStyle) {
			value = el.currentStyle[style];
		}

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	getViewportOffset: function (element) {

		var top = 0,
		    left = 0,
		    el = element,
		    docBody = document.body,
		    docEl = document.documentElement,
		    pos;

		do {
			top  += el.offsetTop  || 0;
			left += el.offsetLeft || 0;

			//add borders
			top += parseInt(L.DomUtil.getStyle(el, 'borderTopWidth'), 10) || 0;
			left += parseInt(L.DomUtil.getStyle(el, 'borderLeftWidth'), 10) || 0;

			pos = L.DomUtil.getStyle(el, 'position');

			if (el.offsetParent === docBody && pos === 'absolute') { break; }

			if (pos === 'fixed') {
				top  += docBody.scrollTop  || docEl.scrollTop  || 0;
				left += docBody.scrollLeft || docEl.scrollLeft || 0;
				break;
			}

			if (pos === 'relative' && !el.offsetLeft) {
				var width = L.DomUtil.getStyle(el, 'width'),
				    maxWidth = L.DomUtil.getStyle(el, 'max-width'),
				    r = el.getBoundingClientRect();

				if (width !== 'none' || maxWidth !== 'none') {
					left += r.left + el.clientLeft;
				}

				//calculate full y offset since we're breaking out of the loop
				top += r.top + (docBody.scrollTop  || docEl.scrollTop  || 0);

				break;
			}

			el = el.offsetParent;

		} while (el);

		el = element;

		do {
			if (el === docBody) { break; }

			top  -= el.scrollTop  || 0;
			left -= el.scrollLeft || 0;

			el = el.parentNode;
		} while (el);

		return new L.Point(left, top);
	},

	documentIsLtr: function () {
		if (!L.DomUtil._docIsLtrCached) {
			L.DomUtil._docIsLtrCached = true;
			L.DomUtil._docIsLtr = L.DomUtil.getStyle(document.body, 'direction') === 'ltr';
		}
		return L.DomUtil._docIsLtr;
	},

	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className;

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	hasClass: function (el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = L.DomUtil._getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	},

	addClass: function (el, name) {
		if (el.classList !== undefined) {
			var classes = L.Util.splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!L.DomUtil.hasClass(el, name)) {
			var className = L.DomUtil._getClass(el);
			L.DomUtil._setClass(el, (className ? className + ' ' : '') + name);
		}
	},

	removeClass: function (el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			L.DomUtil._setClass(el, L.Util.trim((' ' + L.DomUtil._getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	},

	_setClass: function (el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	},

	_getClass: function (el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	},

	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {

			var filter = false,
			    filterName = 'DXImageTransform.Microsoft.Alpha';

			// filters collection throws an error if we try to retrieve a filter that doesn't exist
			try {
				filter = el.filters.item(filterName);
			} catch (e) {
				// don't set opacity to 1 if we haven't already set an opacity,
				// it isn't needed and breaks transparent pngs.
				if (value === 1) { return; }
			}

			value = Math.round(value * 100);

			if (filter) {
				filter.Enabled = (value !== 100);
				filter.Opacity = value;
			} else {
				el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
			}
		}
	},

	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	getTranslateString: function (point) {
		// on WebKit browsers (Chrome/Safari/iOS Safari/Android) using translate3d instead of translate
		// makes animation smoother as it ensures HW accel is used. Firefox 13 doesn't care
		// (same speed either way), Opera 12 doesn't support translate3d

		var is3d = L.Browser.webkit3d,
		    open = 'translate' + (is3d ? '3d' : '') + '(',
		    close = (is3d ? ',0' : '') + ')';

		return open + point.x + 'px,' + point.y + 'px' + close;
	},

	getScaleString: function (scale, origin) {

		var preTranslateStr = L.DomUtil.getTranslateString(origin.add(origin.multiplyBy(-1 * scale))),
		    scaleStr = ' scale(' + scale + ') ';

		return preTranslateStr + scaleStr;
	},

	setPosition: function (el, point, disable3D) { // (HTMLElement, Point[, Boolean])

		// jshint camelcase: false
		el._leaflet_pos = point;

		if (!disable3D && L.Browser.any3d) {
			el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance

		// jshint camelcase: false
		return el._leaflet_pos;
	}
};


// prefix style property names

L.DomUtil.TRANSFORM = L.DomUtil.testProp(
        ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

// webkitTransition comes first because some browser versions that drop vendor prefix don't do
// the same for the transitionend event, in particular the Android 4.1 stock browser

L.DomUtil.TRANSITION = L.DomUtil.testProp(
        ['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

L.DomUtil.TRANSITION_END =
        L.DomUtil.TRANSITION === 'webkitTransition' || L.DomUtil.TRANSITION === 'OTransition' ?
        L.DomUtil.TRANSITION + 'End' : 'transitionend';

(function () {
    if ('onselectstart' in document) {
        L.extend(L.DomUtil, {
            disableTextSelection: function () {
                L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
            },

            enableTextSelection: function () {
                L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
            }
        });
    } else {
        var userSelectProperty = L.DomUtil.testProp(
            ['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

        L.extend(L.DomUtil, {
            disableTextSelection: function () {
                if (userSelectProperty) {
                    var style = document.documentElement.style;
                    this._userSelect = style[userSelectProperty];
                    style[userSelectProperty] = 'none';
                }
            },

            enableTextSelection: function () {
                if (userSelectProperty) {
                    document.documentElement.style[userSelectProperty] = this._userSelect;
                    delete this._userSelect;
                }
            }
        });
    }

	L.extend(L.DomUtil, {
		disableImageDrag: function () {
			L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
		},

		enableImageDrag: function () {
			L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
		}
	});
})();


/*
 * L.LatLng represents a geographical point with latitude and longitude coordinates.
 */

L.LatLng = function (lat, lng, alt) { // (Number, Number, Number)
	lat = parseFloat(lat);
	lng = parseFloat(lng);

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	this.lat = lat;
	this.lng = lng;

	if (alt !== undefined) {
		this.alt = parseFloat(alt);
	}
};

L.extend(L.LatLng, {
	DEG_TO_RAD: Math.PI / 180,
	RAD_TO_DEG: 180 / Math.PI,
	MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
});

L.LatLng.prototype = {
	equals: function (obj) { // (LatLng) -> Boolean
		if (!obj) { return false; }

		obj = L.latLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= L.LatLng.MAX_MARGIN;
	},

	toString: function (precision) { // (Number) -> String
		return 'LatLng(' +
		        L.Util.formatNum(this.lat, precision) + ', ' +
		        L.Util.formatNum(this.lng, precision) + ')';
	},

	// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
	// TODO move to projection code, LatLng shouldn't know about Earth
	distanceTo: function (other) { // (LatLng) -> Number
		other = L.latLng(other);

		var R = 6378137, // earth radius in meters
		    d2r = L.LatLng.DEG_TO_RAD,
		    dLat = (other.lat - this.lat) * d2r,
		    dLon = (other.lng - this.lng) * d2r,
		    lat1 = this.lat * d2r,
		    lat2 = other.lat * d2r,
		    sin1 = Math.sin(dLat / 2),
		    sin2 = Math.sin(dLon / 2);

		var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);

		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	},

	wrap: function (a, b) { // (Number, Number) -> LatLng
		var lng = this.lng;

		a = a || -180;
		b = b ||  180;

		lng = (lng + b) % (b - a) + (lng < a || lng === b ? b : a);

		return new L.LatLng(this.lat, lng);
	}
};

L.latLng = function (a, b) { // (LatLng) or ([Number, Number]) or (Number, Number)
	if (a instanceof L.LatLng) {
		return a;
	}
	if (L.Util.isArray(a)) {
		if (typeof a[0] === 'number' || typeof a[0] === 'string') {
			return new L.LatLng(a[0], a[1], a[2]);
		} else {
			return null;
		}
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon);
	}
	if (b === undefined) {
		return null;
	}
	return new L.LatLng(a, b);
};



/*
 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
 */

L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
	if (!southWest) { return; }

	var latlngs = northEast ? [southWest, northEast] : southWest;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
};

L.LatLngBounds.prototype = {
	// extend the bounds to contain the given point or bounds
	extend: function (obj) { // (LatLng) or (LatLngBounds)
		if (!obj) { return this; }

		var latLng = L.latLng(obj);
		if (latLng !== null) {
			obj = latLng;
		} else {
			obj = L.latLngBounds(obj);
		}

		if (obj instanceof L.LatLng) {
			if (!this._southWest && !this._northEast) {
				this._southWest = new L.LatLng(obj.lat, obj.lng);
				this._northEast = new L.LatLng(obj.lat, obj.lng);
			} else {
				this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
				this._southWest.lng = Math.min(obj.lng, this._southWest.lng);

				this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
				this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
			}
		} else if (obj instanceof L.LatLngBounds) {
			this.extend(obj._southWest);
			this.extend(obj._northEast);
		}
		return this;
	},

	// extend the bounds by a percentage
	pad: function (bufferRatio) { // (Number) -> LatLngBounds
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new L.LatLngBounds(
		        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	getCenter: function () { // -> LatLng
		return new L.LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
		return new L.LatLng(this.getNorth(), this.getWest());
	},

	getSouthEast: function () {
		return new L.LatLng(this.getSouth(), this.getEast());
	},

	getWest: function () {
		return this._southWest.lng;
	},

	getSouth: function () {
		return this._southWest.lat;
	},

	getEast: function () {
		return this._northEast.lng;
	},

	getNorth: function () {
		return this._northEast.lat;
	},

	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	intersects: function (bounds) { // (LatLngBounds)
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	equals: function (bounds) { // (LatLngBounds)
		if (!bounds) { return false; }

		bounds = L.latLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
	},

	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

//TODO International date line?

L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
	if (!a || a instanceof L.LatLngBounds) {
		return a;
	}
	return new L.LatLngBounds(a, b);
};


/*
 * L.Projection contains various geographical projections used by CRS classes.
 */

L.Projection = {};


/*
 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
 */

L.Projection.SphericalMercator = {
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    x = latlng.lng * d,
		    y = lat * d;

		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    lng = point.x * d,
		    lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

		return new L.LatLng(lat, lng);
	}
};


/*
 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326 and Simple.
 */

L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point) {
		return new L.LatLng(point.y, point.x);
	}
};


/*
 * L.CRS is a base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
 */

L.CRS = {
	latLngToPoint: function (latlng, zoom) { // (LatLng, Number) -> Point
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	pointToLatLng: function (point, zoom) { // (Point, Number[, Boolean]) -> LatLng
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	project: function (latlng) {
		return this.projection.project(latlng);
	},

	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	getSize: function (zoom) {
		var s = this.scale(zoom);
		return L.point(s, s);
	}
};


/*
 * A simple CRS that can be used for flat non-Earth maps like panoramas or game maps.
 */

L.CRS.Simple = L.extend({}, L.CRS, {
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1, 0, -1, 0),

	scale: function (zoom) {
		return Math.pow(2, zoom);
	}
});


/*
 * L.CRS.EPSG3857 (Spherical Mercator) is the most common CRS for web mapping
 * and is used by Leaflet by default.
 */

L.CRS.EPSG3857 = L.extend({}, L.CRS, {
	code: 'EPSG:3857',

	projection: L.Projection.SphericalMercator,
	transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

	project: function (latlng) { // (LatLng) -> Point
		var projectedPoint = this.projection.project(latlng),
		    earthRadius = 6378137;
		return projectedPoint.multiplyBy(earthRadius);
	},

	projectGeometry: function (geometry) {
		var jsonObj=new L.geoJson(geometry.toGeoJSON(), {
			coordsToLatLng: function (coords) {
				var latlng =new L.LatLng(coords[1], coords[0]);
				var point= this.project(latlng);
				return new L.LatLng(point.x, point.y);

			}.bind(this)
		});
		var geo=jsonObj.toGeoJSON();
		if(geo.features&&geo.features.length>0){
			return geo.features[0];
		}else {
			return null;
		}
	}

});

L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});


/*
 * L.CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
 */

L.CRS.EPSG4326 = L.extend({}, L.CRS, {
	code: 'EPSG:4326',

	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
});


/*
 * L.Map is the central class of the API - it is used to create a map.
 */

L.Map = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		crs: L.CRS.EPSG3857,

		/*
		center: LatLng,
		zoom: Number,
		layers: Array,
		*/

		fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android23,
		trackResize: true,
		markerZoomAnimation: L.DomUtil.TRANSITION && L.Browser.any3d
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = L.setOptions(this, options);

		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = L.bind(this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(L.latLng(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];

		this._layers = {};
		this._zoomBoundLayers = {};
		this._tileLayersNum = 0;

		this.callInitHooks();

		this._addLayers(options.layers);
	},


	// public methods that modify map state

	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		zoom = zoom === undefined ? this.getZoom() : zoom;
		this._resetView(L.latLng(center), this._limitZoom(zoom));
		return this;
	},

	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = this._limitZoom(zoom);
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	zoomIn: function (delta, options) {
		return this.setZoom(this._zoom + (delta || 1), options);
	},

	zoomOut: function (delta, options) {
		return this.setZoom(this._zoom - (delta || 1), options);
	},

	setZoomAround: function (latlng, zoom, options) {
		var scale = this.getZoomScale(zoom),
		    viewHalf = this.getSize().divideBy(2),
		    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),

		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	fitBounds: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);

		var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
		    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),

		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

		zoom = (options.maxZoom) ? Math.min(options.maxZoom, zoom) : zoom;

		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

		    swPoint = this.project(bounds.getSouthWest(), zoom),
		    nePoint = this.project(bounds.getNorthEast(), zoom),
		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		return this.setView(center, zoom, options);
	},

	fitWorld: function (options) {
		return this.fitBounds([[-90, -180], [90, 180]], options);
	},

	panTo: function (center, options) { // (LatLng)
		return this.setView(center, this._zoom, {pan: options});
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.PanAnimation.js
		this.fire('movestart');

		this._rawPanBy(L.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

	setMaxBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		this.options.maxBounds = bounds;

		if (!bounds) {
			return this.off('moveend', this._panInsideMaxBounds, this);
		}

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds, this);
	},

	setVisible: function(layer, boolean){
		if(!boolean){
			layer._container.style.display = 'none';
		}else{
			layer._container.style.display = 'block';
		}
	},

	isVisible: function(thisLayer){
		var	map = this._map;
		if(map){
			for (var layer in map._layers) {
				if(layer === map._layers[layer]){
					if(thisLayer._container.style.display = 'none'){
						return true;
					}else{
						return false;
					}
				}
			}
		}
	},

	panInsideBounds: function (bounds, options) {
		var center = this.getCenter(),
			newCenter = this._limitCenter(center, this._zoom, bounds);

		if (center.equals(newCenter)) { return this; }

		return this.panTo(newCenter, options);
	},

	addLayer: function (layer) {
		// TODO method is too big, refactor

		var id = L.stamp(layer);

		if (this._layers[id]) { return this; }

		this._layers[id] = layer;

		// TODO getMaxZoom, getMinZoom in ILayer (instead of options)
		if (layer.options && (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom))) {
			this._zoomBoundLayers[id] = layer;
			this._updateZoomLevels();
		}

		// TODO looks ugly, refactor!!!
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum++;
			this._tileLayersToLoad++;
			layer.on('load', this._onTileLayerLoad, this);
		}

		if (this._loaded) {
			this._layerAdd(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
		}

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}

		// TODO looks ugly, refactor
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum--;
			this._tileLayersToLoad--;
			layer.off('load', this._onTileLayerLoad, this);
		}

		return this;
	},

	hasLayer: function (layer) {
		if (!layer) { return false; }

		return (L.stamp(layer) in this._layers);
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	invalidateSize: function (options) {
		if (!this._loaded) { return this; }

		options = L.extend({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._initialCenter = null;

		var newSize = this.getSize(),
		    oldCenter = oldSize.divideBy(2).round(),
		    newCenter = newSize.divideBy(2).round(),
		    offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) { return this; }

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	// TODO handler.addTo
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return this; }

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	remove: function () {
		if (this._loaded) {
			this.fire('unload');
		}

		this._initEvents('off');

		try {
			// throws error in IE6-8
			delete this._container._leaflet;
		} catch (e) {
			this._container._leaflet = undefined;
		}

		this._clearPanes();
		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		return this;
	},


	// public methods for getting map state

	getCenter: function () { // (Boolean) -> LatLng
		this._checkIfLoaded();

		if (this._initialCenter && !this._moved()) {
			return this._initialCenter;
		}
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new L.LatLngBounds(sw, ne);
	},

	getMinZoom: function () {
		return this.options.minZoom === undefined ?
			(this._layersMinZoom === undefined ? 0 : this._layersMinZoom) :
			this.options.minZoom;
	},

	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
		bounds = L.latLngBounds(bounds);

		var zoom = this.getMinZoom() - (inside ? 1 : 0),
		    maxZoom = this.getMaxZoom(),
		    size = this.getSize(),

		    nw = bounds.getNorthWest(),
		    se = bounds.getSouthEast(),

		    zoomNotFound = true,
		    boundsSize;

		padding = L.point(padding || [0, 0]);

		do {
			zoom++;
			boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding);
			zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;

		} while (zoomNotFound && zoom <= maxZoom);

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(
				this._container.clientWidth,
				this._container.clientHeight);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	getPixelBounds: function () {
		var topLeftPoint = this._getTopLeftPoint();
		return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._initialTopLeftPoint;
	},

	getPanes: function () {
		return this._panes;
	},

	getContainer: function () {
		return this._container;
	},


	// TODO replace with universal implementation after refactoring projections

	getZoomScale: function (toZoom) {
		var crs = this.options.crs;
		return crs.scale(toZoom) / crs.scale(this._zoom);
	},

	getScaleZoom: function (scale) {
		return this._zoom + (Math.log(scale) / Math.LN2);
	},


	// conversion methods

	project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
	},

	unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(L.point(point), zoom);
	},

	layerPointToLatLng: function (point) { // (Point)
		var projectedPoint = L.point(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	latLngToLayerPoint: function (latlng) { // (LatLng)
		var projectedPoint = this.project(L.latLng(latlng))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return L.point(point).subtract(this._getMapPanePos());
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return L.point(point).add(this._getMapPanePos());
	},

	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(L.point(point));
		return this.layerPointToLatLng(layerPoint);
	},

	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
	},

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return L.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = L.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._leaflet) {
			throw new Error('Map container is already initialized.');
		}

		container._leaflet = true;
	},

	_initLayout: function () {
		var container = this._container;

		L.DomUtil.addClass(container, 'leaflet-container' +
			(L.Browser.touch ? ' leaflet-touch' : '') +
			(L.Browser.retina ? ' leaflet-retina' : '') +
			(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
			(this.options.fadeAnimation ? ' leaflet-fade-anim' : ''));

		var position = L.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};

		this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);

		this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
		panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
		panes.shadowPane = this._createPane('leaflet-shadow-pane');
		panes.overlayPane = this._createPane('leaflet-overlay-pane');
		panes.markerPane = this._createPane('leaflet-marker-pane');
		panes.popupPane = this._createPane('leaflet-popup-pane');

		var zoomHide = ' leaflet-zoom-hide';

		if (!this.options.markerZoomAnimation) {
			L.DomUtil.addClass(panes.markerPane, zoomHide);
			L.DomUtil.addClass(panes.shadowPane, zoomHide);
			L.DomUtil.addClass(panes.popupPane, zoomHide);
		}
	},

	_createPane: function (className, container) {
		return L.DomUtil.create('div', className, container || this._panes.objectsPane);
	},

	_clearPanes: function () {
		this._container.removeChild(this._mapPane);
	},

	_addLayers: function (layers) {
		layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},


	// private methods that modify map state

	_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {

		var zoomChanged = (this._zoom !== zoom);

		if (!afterZoomAnim) {
			this.fire('movestart');

			if (zoomChanged) {
				this.fire('zoomstart');
			}
		}

		this._zoom = zoom;
		this._initialCenter = center;

		this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

		if (!preserveMapOffset) {
			L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
		} else {
			this._initialTopLeftPoint._add(this._getMapPanePos());
		}

		this._tileLayersToLoad = this._tileLayersNum;

		var loading = !this._loaded;
		this._loaded = true;

		this.fire('viewreset', {hard: !preserveMapOffset});

		if (loading) {
			this.fire('load');
			this.eachLayer(this._layerAdd, this);
		}

		this.fire('move');

		if (zoomChanged || afterZoomAnim) {
			this.fire('zoomend');
		}

		this.fire('moveend', {hard: !preserveMapOffset});
	},

	_rawPanBy: function (offset) {
		L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_updateZoomLevels: function () {
		var i,
			minZoom = Infinity,
			maxZoom = -Infinity,
			oldZoomSpan = this._getZoomSpan();

		for (i in this._zoomBoundLayers) {
			var layer = this._zoomBoundLayers[i];
			if (!isNaN(layer.options.minZoom)) {
				minZoom = Math.min(minZoom, layer.options.minZoom);
			}
			if (!isNaN(layer.options.maxZoom)) {
				maxZoom = Math.max(maxZoom, layer.options.maxZoom);
			}
		}

		if (i === undefined) { // we have no tilelayers
			this._layersMaxZoom = this._layersMinZoom = undefined;
		} else {
			this._layersMaxZoom = maxZoom;
			this._layersMinZoom = minZoom;
		}

		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}
	},

	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// map events

	_initEvents: function (onOff) {
		if (!L.DomEvent) { return; }

		onOff = onOff || 'on';

		L.DomEvent[onOff](this._container, 'click', this._onMouseClick, this);

		var events = ['dblclick', 'mousedown', 'mouseup', 'mouseenter',
		              'mouseleave', 'mousemove', 'contextmenu'],
		    i, len;

		for (i = 0, len = events.length; i < len; i++) {
			L.DomEvent[onOff](this._container, events[i], this._fireMouseEvent, this);
		}

		if (this.options.trackResize) {
			L.DomEvent[onOff](window, 'resize', this._onResize, this);
		}
	},

	_onResize: function () {
		L.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = L.Util.requestAnimFrame(
		        function () { this.invalidateSize({debounceMoveend: true}); }, this, false, this._container);
	},

	_onMouseClick: function (e) {
		if (!this._loaded || (!e._simulated &&
		        ((this.dragging && this.dragging.moved()) ||
		         (this.boxZoom  && this.boxZoom.moved()))) ||
		            L.DomEvent._skipped(e)) { return; }

		this.fire('preclick');
		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._loaded || L.DomEvent._skipped(e)) { return; }

		var type = e.type;

		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) { return; }

		if (type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}

		var containerPoint = this.mouseEventToContainerPoint(e),
		    layerPoint = this.containerPointToLayerPoint(containerPoint),
		    latlng = this.layerPointToLatLng(layerPoint);

		this.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});
	},

	_onTileLayerLoad: function () {
		this._tileLayersToLoad--;
		if (this._tileLayersNum && !this._tileLayersToLoad) {
			this.fire('tilelayersload');
		}
	},

	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, this);
		} else {
			this.on('load', callback, context);
		}
		return this;
	},

	_layerAdd: function (layer) {
		layer.onAdd(this);
		this.fire('layeradd', {layer: layer});
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return L.DomUtil.getPosition(this._mapPane);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function () {
		return this.getPixelOrigin().subtract(this._getMapPanePos());
	},

	_getNewTopLeftPoint: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		// TODO round on display, not calculation to increase precision?
		return this.project(center, zoom)._subtract(viewHalf)._round();
	},

	_latLngToNewLayerPoint: function (latlng, newZoom, newCenter) {
		var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
		return this.project(latlng, newZoom)._subtract(topLeft);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (latlng) {
		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) { return center; }

		var centerPoint = this.project(center, zoom),
		    viewHalf = this.getSize().divideBy(2),
		    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	_limitOffset: function (offset, bounds) {
		if (!bounds) { return offset; }

		var viewBounds = this.getPixelBounds(),
		    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
		    seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

		    dx = this._rebound(nwOffset.x, -seOffset.x),
		    dy = this._rebound(nwOffset.y, -seOffset.y);

		return new L.Point(dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom();

		return Math.max(min, Math.min(max, zoom));
	}
});

L.map = function (id, options) {
	return new L.Map(id, options);
};


/*
 * Mercator projection that takes into account that the Earth is not a perfect sphere.
 * Less popular than spherical mercator; used by projections like EPSG:3395.
 */

L.Projection.Mercator = {
	MAX_LATITUDE: 85.0840591556,

	R_MINOR: 6356752.314245179,
	R_MAJOR: 6378137,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    x = latlng.lng * d * r,
		    y = lat * d,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1.0 - tmp * tmp),
		    con = eccent * Math.sin(y);

		con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

		var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
		y = -r * Math.log(ts);

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    lng = point.x * d / r,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1 - (tmp * tmp)),
		    ts = Math.exp(- point.y / r),
		    phi = (Math.PI / 2) - 2 * Math.atan(ts),
		    numIter = 15,
		    tol = 1e-7,
		    i = numIter,
		    dphi = 0.1,
		    con;

		while ((Math.abs(dphi) > tol) && (--i > 0)) {
			con = eccent * Math.sin(phi);
			dphi = (Math.PI / 2) - 2 * Math.atan(ts *
			            Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, lng);
	}
};



L.CRS.EPSG3395 = L.extend({}, L.CRS, {
	code: 'EPSG:3395',

	projection: L.Projection.Mercator,

	transformation: (function () {
		var m = L.Projection.Mercator,
		    r = m.R_MAJOR,
		    scale = 0.5 / (Math.PI * r);

		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});


/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		subdomains: 'abc',
		errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC',
		attribution: '',
		zoomOffset: 0,
		opacity: 1,
		visible: true,//是否隐藏图层
		/*
		maxNativeZoom: null,
		zIndex: null,
		tms: false,
		continuousWorld: false,
		noWrap: false,
		zoomReverse: false,
		detectRetina: false,
		reuseTiles: false,
		bounds: false,
		*/
		unloadInvisibleTiles: L.Browser.mobile,
		updateWhenIdle: L.Browser.mobile
	},

	initialize: function (url, options) {
		options = L.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);
			options.zoomOffset++;

			if (options.minZoom > 0) {
				options.minZoom--;
			}
			this.options.maxZoom--;
		}

		if (options.bounds) {
			options.bounds = L.latLngBounds(options.bounds);
		}

		this._url = url;

		var subdomains = this.options.subdomains;

		if (typeof subdomains === 'string') {
			this.options.subdomains = subdomains.split('');
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._animated = map._zoomAnimated;

		// create a container div for tiles
		this._initContainer();

		// set up events
		map.on({
			'viewreset': this._reset,
			'moveend': this._update
		}, this);

		if (this._animated) {
			map.on({
				'zoomanim': this._animateZoom,
				'zoomend': this._endZoomAnim
			}, this);
		}

		if (!this.options.updateWhenIdle) {
			this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
			map.on('move', this._limitedUpdate, this);
		}

		this._reset();
		this._update();
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		this._container.parentNode.removeChild(this._container);

		map.off({
			'viewreset': this._reset,
			'moveend': this._update
		}, this);

		if (this._animated) {
			map.off({
				'zoomanim': this._animateZoom,
				'zoomend': this._endZoomAnim
			}, this);
		}

		if (!this.options.updateWhenIdle) {
			map.off('move', this._limitedUpdate, this);
		}

		this._container = null;
		this._map = null;
	},

	bringToFront: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.appendChild(this._container);
			this._setAutoZIndex(pane, Math.max);
		}

		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.insertBefore(this._container, pane.firstChild);
			this._setAutoZIndex(pane, Math.min);
		}

		return this;
	},


	getAttribution: function () {
		return this.options.attribution;
	},

	getContainer: function () {
		return this._container;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	setVisible: function(boolean){
		if(!boolean){
			this._container.style.display = 'none';
			this.options.visible = boolean;
		}else{
			this._container.style.display = 'block';
			this.options.visible = boolean;
		}
	},

	isVisible: function(){
		var thisLayer = this,
			map = this._map;
		if(map){
			for (var layer in map._layers) {
				if(thisLayer === map._layers[layer]){
					if(thisLayer._container.style.display = 'none'){
						return true;
					}else{
						return false;
					}
				}
			}
		}
	},

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}
		return this;
	},

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	_setAutoZIndex: function (pane, compare) {

		var layers = pane.children,
		    edgeZIndex = -compare(Infinity, -Infinity), // -Infinity for max, Infinity for min
		    zIndex, i, len;

		for (i = 0, len = layers.length; i < len; i++) {

			if (layers[i] !== this._container) {
				zIndex = parseInt(layers[i].style.zIndex, 10);

				if (!isNaN(zIndex)) {
					edgeZIndex = compare(edgeZIndex, zIndex);
				}
			}
		}

		this.options.zIndex = this._container.style.zIndex =
		        (isFinite(edgeZIndex) ? edgeZIndex : 0) + compare(1, -1);
	},

	_updateOpacity: function () {
		var i,
		    tiles = this._tiles;

		if (L.Browser.ielt9) {
			for (i in tiles) {
				L.DomUtil.setOpacity(tiles[i], this.options.opacity);
			}
		} else {
			L.DomUtil.setOpacity(this._container, this.options.opacity);
		}
	},

	_initContainer: function () {
		var tilePane = this._map._panes.tilePane;

		if (!this._container) {
			this._container = L.DomUtil.create('div', 'leaflet-layer');

			this._updateZIndex();

			if (this._animated) {
				var className = 'leaflet-tile-container';

				this._bgBuffer = L.DomUtil.create('div', className, this._container);
				this._tileContainer = L.DomUtil.create('div', className, this._container);

			} else {
				this._tileContainer = this._container;
			}

			tilePane.appendChild(this._container);

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}

			if(!this.options.visible){
				this.setVisible(this.options.visible);
			}
		}
	},

	_reset: function (e) {
		for (var key in this._tiles) {
			this.fire('tileunload', {tile: this._tiles[key]});
		}

		this._tiles = {};
		this._tilesToLoad = 0;

		if (this.options.reuseTiles) {
			this._unusedTiles = [];
		}

		this._tileContainer.innerHTML = '';

		if (this._animated && e && e.hard) {
			this._clearBgBuffer();
		}

		this._initContainer();
	},

	_getTileSize: function () {
		var map = this._map,
		    zoom = map.getZoom() + this.options.zoomOffset,
		    zoomN = this.options.maxNativeZoom,
		    tileSize = this.options.tileSize;

		if (zoomN && zoom > zoomN) {
			tileSize = Math.round(map.getZoomScale(zoom) / map.getZoomScale(zoomN) * tileSize);
		}

		return tileSize;
	},

	_update: function () {

		if (!this._map) { return; }

		var map = this._map,
		    bounds = map.getPixelBounds(),
		    zoom = map.getZoom(),
		    tileSize = this._getTileSize();

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var tileBounds = L.bounds(
		        bounds.min.divideBy(tileSize)._floor(),
		        bounds.max.divideBy(tileSize)._floor());

		this._addTilesFromCenterOut(tileBounds);

		if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
			this._removeOtherTiles(tileBounds);
		}
	},

	_addTilesFromCenterOut: function (bounds) {
		var queue = [],
		    center = bounds.getCenter();

		var j, i, point;

		for (j = bounds.min.y; j <= bounds.max.y; j++) {
			for (i = bounds.min.x; i <= bounds.max.x; i++) {
				point = new L.Point(i, j);

				if (this._tileShouldBeLoaded(point)) {
					queue.push(point);
				}
			}
		}

		var tilesToLoad = queue.length;

		if (tilesToLoad === 0) { return; }

		// load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		var fragment = document.createDocumentFragment();

		// if its the first batch of tiles to load
		if (!this._tilesToLoad) {
			this.fire('loading');
		}

		this._tilesToLoad += tilesToLoad;

		for (i = 0; i < tilesToLoad; i++) {
			this._addTile(queue[i], fragment);
		}

		this._tileContainer.appendChild(fragment);
	},

	_tileShouldBeLoaded: function (tilePoint) {
		if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
			return false; // already loaded
		}

		var options = this.options;

		if (!options.continuousWorld) {
			var limit = this._getWrapTileNum();

			// don't load if exceeds world bounds
			if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit.x)) ||
				tilePoint.y < 0 || tilePoint.y >= limit.y) { return false; }
		}

		if (options.bounds) {
			var tileSize = this._getTileSize(),
			    nwPoint = tilePoint.multiplyBy(tileSize),
			    sePoint = nwPoint.add([tileSize, tileSize]),
			    nw = this._map.unproject(nwPoint),
			    se = this._map.unproject(sePoint);

			// TODO temporary hack, will be removed after refactoring projections
			// https://github.com/Leaflet/Leaflet/issues/1618
			if (!options.continuousWorld && !options.noWrap) {
				nw = nw.wrap();
				se = se.wrap();
			}

			if (!options.bounds.intersects([nw, se])) { return false; }
		}

		return true;
	},

	_removeOtherTiles: function (bounds) {
		var kArr, x, y, key;

		for (key in this._tiles) {
			kArr = key.split(':');
			x = parseInt(kArr[0], 10);
			y = parseInt(kArr[1], 10);

			// remove tile if it's out of bounds
			if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {
				this._removeTile(key);
			}
		}
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];

		this.fire('tileunload', {tile: tile, url: tile.src});

		if (this.options.reuseTiles) {
			L.DomUtil.removeClass(tile, 'leaflet-tile-loaded');
			this._unusedTiles.push(tile);

		} else if (tile.parentNode === this._tileContainer) {
			this._tileContainer.removeChild(tile);
		}

		// for https://github.com/CloudMade/Leaflet/issues/137
		if (!L.Browser.android) {
			tile.onload = null;
			tile.src = L.Util.emptyImageUrl;
		}

		delete this._tiles[key];
	},

	_addTile: function (tilePoint, container) {
		var tilePos = this._getTilePos(tilePoint);

		// get unused tile - or create a new tile
		var tile = this._getTile();
		/*
		 Chrome 20 layouts much faster with top/left (verify with timeline, frames)
		 Android 4 browser has display issues with top/left and requires transform instead
		 (other browsers don't currently care) - see debug/hacks/jitter.html for an example
		 */
		L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);

		this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;

		this._loadTile(tile, tilePoint);

		if (tile.parentNode !== this._tileContainer) {
			container.appendChild(tile);
		}
	},

	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},

	_getTilePos: function (tilePoint) {
		var origin = this._map.getPixelOrigin(),
		    tileSize = this._getTileSize();

		return tilePoint.multiplyBy(tileSize).subtract(origin);
	},

	// image-specific code (override to implement e.g. Canvas or SVG tile layer)

	getTileUrl: function (tilePoint) {
		return L.Util.template(this._url, L.extend({
			s: this._getSubdomain(tilePoint),
			z: tilePoint.z,
			x: tilePoint.x,
			y: tilePoint.y
		}, this.options));
	},

	_getWrapTileNum: function () {
		var crs = this._map.options.crs,
		    size = crs.getSize(this._map.getZoom());
		return size.divideBy(this._getTileSize())._floor();
	},

	_adjustTilePoint: function (tilePoint) {

		var limit = this._getWrapTileNum();

		// wrap tile coordinates
		if (!this.options.continuousWorld && !this.options.noWrap) {
			tilePoint.x = ((tilePoint.x % limit.x) + limit.x) % limit.x;
		}

		if (this.options.tms) {
			tilePoint.y = limit.y - tilePoint.y - 1;
		}

		tilePoint.z = this._getZoomForUrl();
	},

	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	_getTile: function () {
		if (this.options.reuseTiles && this._unusedTiles.length > 0) {
			var tile = this._unusedTiles.pop();
			this._resetTile(tile);
			return tile;
		}
		return this._createTile();
	},

	// Override if data stored on a tile needs to be cleaned up before reuse
	_resetTile: function (/*tile*/) {},

	_createTile: function () {
		var tile = L.DomUtil.create('img', 'leaflet-tile');
		tile.style.width = tile.style.height = this._getTileSize() + 'px';
		tile.galleryimg = 'no';

		tile.onselectstart = tile.onmousemove = L.Util.falseFn;

		if (L.Browser.ielt9 && this.options.opacity !== undefined) {
			L.DomUtil.setOpacity(tile, this.options.opacity);
		}
		if (this.options.visible !== undefined) {
			this.setVisible(this.options.visible);
		}

		// without this hack, tiles disappear after zoom on Chrome for Android
		// https://github.com/Leaflet/Leaflet/issues/2078
		if (L.Browser.mobileWebkit3d) {
			tile.style.WebkitBackfaceVisibility = 'hidden';
		}
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		this._adjustTilePoint(tilePoint);
		tile.src = this.getTileUrl(tilePoint);

		if(!tile.src){
			this.fire('tileloadstart', {
				tile: tile,
				url: tile.src
			});
		}else {
			return;
		}
	},

	_tileLoaded: function () {
		this._tilesToLoad--;

		if (this._animated) {
			L.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated');
		}

		if (!this._tilesToLoad) {
			this.fire('load');

			if (this._animated) {
				// clear scaled tiles after all new tiles are loaded (for performance)
				clearTimeout(this._clearBgBufferTimer);
				this._clearBgBufferTimer = setTimeout(L.bind(this._clearBgBuffer, this), 500);
			}
		}
	},

	_tileOnLoad: function () {
		var layer = this._layer;

		//Only if we are loading an actual image
		if (this.src !== L.Util.emptyImageUrl) {
			L.DomUtil.addClass(this, 'leaflet-tile-loaded');

			layer.fire('tileload', {
				tile: this,
				url: this.src
			});
		}

		layer._tileLoaded();
	},

	_tileOnError: function () {
		var layer = this._layer;

		layer.fire('tileerror', {
			tile: this,
			url: this.src
		});

		var newUrl = layer.options.errorTileUrl;
		if (newUrl) {
			this.src = newUrl;
		}

		layer._tileLoaded();
	}
});

L.tileLayer = function (url, options) {
	return new L.TileLayer(url, options);
};


/*
 * L.TileLayer.WMS is used for putting WMS tile layers on the map.
 */

L.TileLayer.WMS = L.TileLayer.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	initialize: function (url, options) { // (String, Object)

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams),
		    tileSize = options.tileSize || this.options.tileSize;

		if (options.detectRetina && L.Browser.retina) {
			wmsParams.width = wmsParams.height = tileSize * 2;
		} else {
			wmsParams.width = wmsParams.height = tileSize;
		}

		for (var i in options) {
			// all keys that are not TileLayer options go to WMS params
			if (!this.options.hasOwnProperty(i) && i !== 'crs') {
				wmsParams[i] = options[i];
			}
		}

		this.wmsParams = wmsParams;

		L.setOptions(this, options);
	},

	onAdd: function (map) {

		this._crs = this.options.crs || map.options.crs;

		this._wmsVersion = parseFloat(this.wmsParams.version);

		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
		this.wmsParams[projectionKey] = this._crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (tilePoint) { // (Point, Number) -> String

		var map = this._map,
		    tileSize = this.options.tileSize,

		    nwPoint = tilePoint.multiplyBy(tileSize),
		    sePoint = nwPoint.add([tileSize, tileSize]),

		    nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
		    se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
		    bbox = this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
		        [se.y, nw.x, nw.y, se.x].join(',') :
		        [nw.x, se.y, se.x, nw.y].join(','),

		    url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

		var getUrl = L.Util.getParamString(this.wmsParams, url, true);

		if(getUrl){
			return url + getUrl + '&BBOX=' + bbox;
		}
	},

	setParams: function (params, noRedraw) {

		L.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});

L.tileLayer.wms = function (url, options) {
	return new L.TileLayer.WMS(url, options);
};


/*
 * L.TileLayer.Canvas is a class that you can use as a base for creating
 * dynamically drawn Canvas-based tile layers.
 */

L.TileLayer.Canvas = L.TileLayer.extend({
	options: {
		async: false
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}

		for (var i in this._tiles) {
			this._redrawTile(this._tiles[i]);
		}
		return this;
	},

	_redrawTile: function (tile) {
		this.drawTile(tile, tile._tilePoint, this._map._zoom);
	},

	_createTile: function () {
		var tile = L.DomUtil.create('canvas', 'leaflet-tile');
		tile.width = tile.height = this.options.tileSize;
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer = this;
		tile._tilePoint = tilePoint;

		this._redrawTile(tile);

		if (!this.options.async) {
			this.tileDrawn(tile);
		}
	},

	drawTile: function (/*tile, tilePoint*/) {
		// override with rendering code
	},

	tileDrawn: function (tile) {
		this._tileOnLoad.call(tile);
	}
});


L.tileLayer.canvas = function (options) {
	return new L.TileLayer.Canvas(options);
};


/*
 * L.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
 */

L.ImageOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		opacity: 1,
		visible:true,
		zIndex: null,
	},

	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
		this._url = url;
		this._bounds = L.latLngBounds(bounds);

		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map._tilePane.appendChild(this._image);

		map.on('viewreset', this._reset, this);

		if (map.options.zoomAnimation && L.Browser.any3d) {
			map.on('zoomanim', this._animateZoom, this);
		}

		this._reset();
	},

	onRemove: function (map) {
		map._tilePane.removeChild(this._image);

		map.off('viewreset', this._reset, this);

		if (map.options.zoomAnimation) {
			map.off('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
		return this;
	},

	setVisible: function(boolean){
		if(!boolean){
			this._image.style.display = 'none';
			this.options.visible = boolean;
		}else{
			this._image.style.display = 'block';
			this.options.visible = boolean;
		}
	},

	isVisible: function(){
		var thisLayer = this,
			map = this._map;
		if(map){
			for (var layer in map._layers) {
				if(thisLayer === map._layers[layer]){
					if(thisLayer._image.style.display = 'none'){
						return true;
					}else{
						return false;
					}
				}
			}
		}
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();
		return this;
	},

	_updateZIndex: function () {
		if (this._image && this.options.zIndex !== undefined) {
			this._image.style.zIndex = this.options.zIndex;
		}
	},

	// TODO remove bringToFront/bringToBack duplication from TileLayer/Path
	bringToFront: function () {
		if (this._image) {
			this._map._tilePane.appendChild(this._image);
		}
		return this;
	},

	bringToBack: function () {
		var pane = this._map._tilePane;
		if (this._image) {
			pane.insertBefore(this._image, pane.firstChild);
		}
		return this;
	},

	setUrl: function (url) {
		this._url = url;
		this._image.src = this._url;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	_initImage: function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer');
		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
		} else {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
		}

		this._updateOpacity();

		if(!this.options.visible){
			this.setVisible(this.options.visible);
		}

		//TODO createImage util method to remove duplication
		L.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: L.bind(this._onImageLoad, this),
			src: this._url
		});
	},

	_animateZoom: function (e) {
		var map = this._map,
		    image = this._image,
		    scale = map.getZoomScale(e.zoom),
		    nw = this._bounds.getNorthWest(),
		    se = this._bounds.getSouthEast(),

		    topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
		    size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
		    origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));

		image.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
	},

	_reset: function () {
		var image   = this._image,
		    topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		    size = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);

		L.DomUtil.setPosition(image, topLeft);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_onImageLoad: function () {
		this.fire('load');
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

L.imageOverlay = function (url, bounds, options) {
	return new L.ImageOverlay(url, bounds, options);
};


/*
 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
 */

L.Icon = L.Class.extend({
	options: {
		/*
		iconUrl: (String) (required)
		iconRetinaUrl: (String) (optional, used for retina devices if detected)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (String) (no shadow by default)
		shadowRetinaUrl: (String) (optional, used for retina devices if detected)
		shadowSize: (Point)
		shadowAnchor: (Point)
		*/
		className: ''
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	createIcon: function (oldIcon) {
		return this._createIcon('icon', oldIcon);
	},

	createShadow: function (oldIcon) {
		return this._createIcon('shadow', oldIcon);
	},

	_createIcon: function (name, oldIcon) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error('iconUrl not set in Icon options (see the docs).');
			}
			return null;
		}

		var img;
		if (!oldIcon || oldIcon.tagName !== 'IMG') {
			img = this._createImg(src);
		} else {
			img = this._createImg(src, oldIcon);
		}
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options,
		    size = L.point(options[name + 'Size']),
		    anchor;

		if (name === 'shadow') {
			anchor = L.point(options.shadowAnchor || options.iconAnchor);
		} else {
			anchor = L.point(options.iconAnchor);
		}

		if (!anchor && size) {
			anchor = size.divideBy(2, true);
		}

		img.className = 'leaflet-marker-' + name + ' ' + options.className;

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src, el) {
		el = el || document.createElement('img');
		el.src = src;
		return el;
	},

	_getIconUrl: function (name) {
		if (L.Browser.retina && this.options[name + 'RetinaUrl']) {
			return this.options[name + 'RetinaUrl'];
		}
		return this.options[name + 'Url'];
	}
});

L.icon = function (options) {
	return new L.Icon(options);
};


/*
 * L.Icon.Default is the blue marker icon used by default in Leaflet.
 */

L.Icon.Default = L.Icon.extend({

	options: {
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],

		shadowSize: [41, 41]
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		if (L.Browser.retina && name === 'icon') {
			name += '-2x';
		}

		var path = L.Icon.Default.imagePath;

		if (!path) {
			throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
		}

		return path + '/marker-' + name + '.png';
	}
});

L.Icon.Default.imagePath = (function () {
	var scripts = document.getElementsByTagName('script'),
	    leafletRe = /[\/^]ktop[\-\._]?([\w\-\._]*)\.js\??/;

	var i, len, src, matches, path;

	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;
		matches = src.match(leafletRe);

		if (matches) {
			path = src.split(leafletRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}
}());


/*
 * L.Marker is used to display clickable/draggable icons on the map.
 */

L.Marker = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		icon: new L.Icon.Default(),
		title: '',
		alt: '',
		clickable: true,
		draggable: false,
		keyboard: true,
		zIndexOffset: 0,
		opacity: 1,
		riseOnHover: false,
		riseOffset: 250
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},

	onAdd: function (map) {
		this._map = map;

		map.on('viewreset', this.update, this);

		this._initIcon();
		this.update();
		this.fire('add');

		if (map.options.zoomAnimation && map.options.markerZoomAnimation) {
			map.on('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		if (this.dragging) {
			this.dragging.disable();
		}

		this._removeIcon();
		this._removeShadow();

		this.fire('remove');

		map.off({
			'viewreset': this.update,
			'zoomanim': this._animateZoom
		}, this);

		this._map = null;
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);

		this.update();

		return this.fire('move', { latlng: this._latlng });
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		this.update();

		return this;
	},

	setIcon: function (icon) {

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}

		if (this._popup) {
			this.bindPopup(this._popup);
		}

		return this;
	},

	update: function () {
		if (this._icon) {
			this._setPos(this._map.latLngToLayerPoint(this._latlng).round());
		}
		return this;
	},

	_initIcon: function () {
		var options = this.options,
		    map = this._map,
		    animation = (map.options.zoomAnimation && map.options.markerZoomAnimation),
		    classToAdd = animation ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide';

		var icon = options.icon.createIcon(this._icon),
			addIcon = false;

		// if we're not reusing the icon, remove the old one and init new one
		if (icon !== this._icon) {
			if (this._icon) {
				this._removeIcon();
			}
			addIcon = true;

			if (options.title) {
				icon.title = options.title;
			}

			if (options.alt) {
				icon.alt = options.alt;
			}
		}

		L.DomUtil.addClass(icon, classToAdd);

		if (options.keyboard) {
			icon.tabIndex = '0';
		}

		this._icon = icon;

		this._initInteraction();

		if (options.riseOnHover) {
			L.DomEvent
				.on(icon, 'mouseover', this._bringToFront, this)
				.on(icon, 'mouseout', this._resetZIndex, this);
		}

		var newShadow = options.icon.createShadow(this._shadow),
			addShadow = false;

		if (newShadow !== this._shadow) {
			this._removeShadow();
			addShadow = true;
		}

		if (newShadow) {
			L.DomUtil.addClass(newShadow, classToAdd);
		}
		this._shadow = newShadow;


		if (options.opacity < 1) {
			this._updateOpacity();
		}


		var panes = this._map._panes;

		if (addIcon) {
			panes.markerPane.appendChild(this._icon);
		}

		if (newShadow && addShadow) {
			panes.shadowPane.appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		if (this.options.riseOnHover) {
			L.DomEvent
			    .off(this._icon, 'mouseover', this._bringToFront)
			    .off(this._icon, 'mouseout', this._resetZIndex);
		}

		this._map._panes.markerPane.removeChild(this._icon);

		this._icon = null;
	},

	_removeShadow: function () {
		if (this._shadow) {
			this._map._panes.shadowPane.removeChild(this._shadow);
		}
		this._shadow = null;
	},

	_setPos: function (pos) {
		L.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

		this._setPos(pos);
	},

	_initInteraction: function () {

		if (!this.options.clickable) { return; }

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
		    events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_onMouseClick: function (e) {
		var wasDragged = this.dragging && this.dragging.moved();

		if (this.hasEventListeners(e.type) || wasDragged) {
			L.DomEvent.stopPropagation(e);
		}

		if (wasDragged) { return; }

		if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) { return; }

		this.fire(e.type, {
			originalEvent: e,
			latlng: this._latlng
		});
	},

	_onKeyPress: function (e) {
		if (e.keyCode === 13) {
			this.fire('click', {
				originalEvent: e,
				latlng: this._latlng
			});
		}
	},

	_fireMouseEvent: function (e) {

		this.fire(e.type, {
			originalEvent: e,
			latlng: this._latlng
		});

		// TODO proper custom event propagation
		// this line will always be called if marker is in a FeatureGroup
		if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousedown') {
			L.DomEvent.stopPropagation(e);
		} else {
			L.DomEvent.preventDefault(e);
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._icon, this.options.opacity);
		if (this._shadow) {
			L.DomUtil.setOpacity(this._shadow, this.options.opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	}
});

L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};


/*
 * L.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
 * to use with L.Marker.
 */

L.DivIcon = L.Icon.extend({
	options: {
		iconSize: [12, 12], // also can be set through CSS
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		html: (String)
		bgPos: (Point)
		*/
		className: 'leaflet-div-icon',
		html: false
	},

	createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;

		if (options.html !== false) {
			div.innerHTML = options.html;
		} else {
			div.innerHTML = '';
		}

		if (options.bgPos) {
			div.style.backgroundPosition =
			        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
		}

		this._setIconStyles(div, 'icon');
		return div;
	},

	createShadow: function () {
		return null;
	}
});

L.divIcon = function (options) {
	return new L.DivIcon(options);
};


/*
 * L.Popup is used for displaying popups on the map.
 */

L.Map.mergeOptions({
	closePopupOnClick: true
});

L.Popup = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minWidth: 50,
		maxWidth: 300,
		// maxHeight: null,
		autoPan: true,
		closeButton: true,
		offset: [0, 7],
		autoPanPadding: [5, 5],
		// autoPanPaddingTopLeft: null,
		// autoPanPaddingBottomRight: null,
		keepInView: false,
		className: '',
		zoomAnimation: true
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._source = source;
		this._animated = L.Browser.any3d && this.options.zoomAnimation;
		this._isOpen = false;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initLayout();
		}

		var animFade = map.options.fadeAnimation;

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 0);
		}
		map._panes.popupPane.appendChild(this._container);

		map.on(this._getEvents(), this);

		this.update();

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 1);
		}

		this.fire('open');

		map.fire('popupopen', {popup: this});

		if (this._source) {
			this._source.fire('popupopen', {popup: this});
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	openOn: function (map) {
		map.openPopup(this);
		return this;
	},

	onRemove: function (map) {
		map._panes.popupPane.removeChild(this._container);

		L.Util.falseFn(this._container.offsetWidth); // force reflow

		map.off(this._getEvents(), this);

		if (map.options.fadeAnimation) {
			L.DomUtil.setOpacity(this._container, 0);
		}

		this._map = null;

		this.fire('close');

		map.fire('popupclose', {popup: this});

		if (this._source) {
			this._source.fire('popupclose', {popup: this});
		}
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		if (this._map) {
			this._updatePosition();
			this._adjustPan();
		}
		return this;
	},

	getContent: function () {
		return this._content;
	},

	setContent: function (content) {
		this._content = content;
		this.update();
		return this;
	},

	update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	_getEvents: function () {
		var events = {
			viewreset: this._updatePosition
		};

		if (this._animated) {
			events.zoomanim = this._zoomAnimation;
		}
		if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
			events.preclick = this._close;
		}
		if (this.options.keepInView) {
			events.moveend = this._adjustPan;
		}

		return events;
	},

	_close: function () {
		if (this._map) {
			this._map.closePopup(this);
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-popup',
			containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
			        (this._animated ? 'animated' : 'hide'),
			container = this._container = L.DomUtil.create('div', containerClass),
			closeButton;

		if (this.options.closeButton) {
			closeButton = this._closeButton =
			        L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';
			L.DomEvent.disableClickPropagation(closeButton);

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper =
		        L.DomUtil.create('div', prefix + '-content-wrapper', container);
		L.DomEvent.disableClickPropagation(wrapper);

		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent.disableScrollPropagation(this._contentNode);
		L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_updateContent: function () {
		if (!this._content) { return; }

		if (typeof this._content === 'string') {
			this._contentNode.innerHTML = this._content;
		} else {
			while (this._contentNode.hasChildNodes()) {
				this._contentNode.removeChild(this._contentNode.firstChild);
			}
			this._contentNode.appendChild(this._content);
		}
		this.fire('contentupdate');
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'leaflet-popup-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			L.DomUtil.addClass(container, scrolledClass);
		} else {
			L.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng),
		    animated = this._animated,
		    offset = L.point(this.options.offset);

		if (animated) {
			L.DomUtil.setPosition(this._container, pos);
		}

		this._containerBottom = -offset.y - (animated ? 0 : pos.y);
		this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);

		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = this._containerBottom + 'px';
		this._container.style.left = this._containerLeft + 'px';
	},

	_zoomAnimation: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);

		L.DomUtil.setPosition(this._container, pos);
	},

	_adjustPan: function () {
		if (!this.options.autoPan) { return; }

		var map = this._map,
		    containerHeight = this._container.offsetHeight,
		    containerWidth = this._containerWidth,

		    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

		if (this._animated) {
			layerPos._add(L.DomUtil.getPosition(this._container));
		}

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
		}
		if (containerPos.x - dx - paddingTL.x < 0) { // left
			dx = containerPos.x - paddingTL.x;
		}
		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
		}
		if (containerPos.y - dy - paddingTL.y < 0) { // top
			dy = containerPos.y - paddingTL.y;
		}

		if (dx || dy) {
			map
			    .fire('autopanstart')
			    .panBy([dx, dy]);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	}
});

L.popup = function (options, source) {
	return new L.Popup(options, source);
};


L.Map.include({
	openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
		this.closePopup();

		if (!(popup instanceof L.Popup)) {
			var content = popup;

			popup = new L.Popup(options)
			    .setLatLng(latlng)
			    .setContent(content);
		}
		popup._isOpen = true;

		this._popup = popup;
		return this.addLayer(popup);
	},

	closePopup: function (popup) {
		if (!popup || popup === this._popup) {
			popup = this._popup;
			this._popup = null;
		}
		if (popup) {
			this.removeLayer(popup);
			popup._isOpen = false;
		}
		return this;
	}
});


/*
 * Popup extension to L.Marker, adding popup-related methods.
 */

L.Marker.include({
	openPopup: function () {
		if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
			this._popup.setLatLng(this._latlng);
			this._map.openPopup(this._popup);
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	togglePopup: function () {
		if (this._popup) {
			if (this._popup._isOpen) {
				this.closePopup();
			} else {
				this.openPopup();
			}
		}
		return this;
	},

	bindPopup: function (content, options) {
		var anchor = L.point(this.options.icon.options.popupAnchor || [0, 0]);

		anchor = anchor.add(L.Popup.prototype.options.offset);

		if (options && options.offset) {
			anchor = anchor.add(options.offset);
		}

		options = L.extend({offset: anchor}, options);

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this.togglePopup, this)
			    .on('remove', this.closePopup, this)
			    .on('move', this._movePopup, this);
			this._popupHandlersAdded = true;
		}

		if (content instanceof L.Popup) {
			L.setOptions(content, options);
			this._popup = content;
			content._source = this;
		} else {
			this._popup = new L.Popup(options, this)
				.setContent(content);
		}

		return this;
	},

	setPopupContent: function (content) {
		if (this._popup) {
			this._popup.setContent(content);
		}
		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this.togglePopup, this)
			    .off('remove', this.closePopup, this)
			    .off('move', this._movePopup, this);
			this._popupHandlersAdded = false;
		}
		return this;
	},

	getPopup: function () {
		return this._popup;
	},

	_movePopup: function (e) {
		this._popup.setLatLng(e.latlng);
	}
});


/*
 * L.LayerGroup is a class to combine several layers into one so that
 * you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.LayerGroup = L.Class.extend({
	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	hasLayer: function (layer) {
		if (!layer) { return false; }

		return (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	clearLayers: function () {
		this.eachLayer(this.removeLayer, this);
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		this._map = map;
		this.eachLayer(map.addLayer, map);
	},

	onRemove: function (map) {
		this.eachLayer(map.removeLayer, map);
		this._map = null;
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	getLayer: function (id) {
		return this._layers[id];
	},

	getLayers: function () {
		var layers = [];

		for (var i in this._layers) {
			layers.push(this._layers[i]);
		}
		return layers;
	},

	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	getLayerId: function (layer) {
		return L.stamp(layer);
	},

	setVisible: function(layer, boolean){
		if(!boolean){
			layer._container.style.display = 'none';
		}else{
			layer._container.style.display = 'block';
		}
	},
});

L.layerGroup = function (layers) {
	return new L.LayerGroup(layers);
};


/*
 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and additional methods
 * shared between a group of interactive layers (like vectors or markers).
 */

L.FeatureGroup = L.LayerGroup.extend({
	includes: L.Mixin.Events,

	statics: {
		EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
	},

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		if ('on' in layer) {
			layer.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
		}

		L.LayerGroup.prototype.addLayer.call(this, layer);

		if (this._popupContent && layer.bindPopup) {
			layer.bindPopup(this._popupContent, this._popupOptions);
		}

		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		if ('off' in layer) {
			layer.off(L.FeatureGroup.EVENTS, this._propagateEvent, this);
		}

		L.LayerGroup.prototype.removeLayer.call(this, layer);

		if (this._popupContent) {
			this.invoke('unbindPopup');
		}

		return this.fire('layerremove', {layer: layer});
	},

	bindPopup: function (content, options) {
		this._popupContent = content;
		this._popupOptions = options;
		return this.invoke('bindPopup', content, options);
	},

	openPopup: function (latlng) {
		// open popup on the first layer
		for (var id in this._layers) {
			this._layers[id].openPopup(latlng);
			break;
		}
		return this;
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();

		this.eachLayer(function (layer) {
			bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
		});

		return bounds;
	},

	_propagateEvent: function (e) {
		e = L.extend({
			layer: e.target,
			target: this
		}, e);
		this.fire(e.type, e);
	}
});

L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};


/*
 * L.Path is a base class for rendering vector paths on a map. Inherited by Polyline, Circle, etc.
 */

L.Path = L.Class.extend({
	includes: [L.Mixin.Events],

	statics: {
		// how much to extend the clip area around the map view
		// (relative to its size, e.g. 0.5 is half the screen in each direction)
		// set it so that SVG element doesn't exceed 1280px (vectors flicker on dragend if it is)
		CLIP_PADDING: (function () {
			var max = L.Browser.mobile ? 1280 : 2000,
			    target = (max / Math.max(window.outerWidth, window.outerHeight) - 1) / 2;
			return Math.max(0, Math.min(0.5, target));
		})()
	},

	options: {
		stroke: true,
		color: '#0033ff',
		dashArray: null,
		lineCap: null,
		lineJoin: null,
		weight: 5,
		opacity: 0.5,

		fill: false,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,

		clickable: true
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initElements();
			this._initEvents();
		}

		this.projectLatlngs();
		this._updatePath();

		if (this._container) {
			this._map._pathRoot.appendChild(this._container);
		}

		this.fire('add');

		map.on({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		map._pathRoot.removeChild(this._container);

		// Need to fire remove event before we set _map to null as the event hooks might need the object
		this.fire('remove');
		this._map = null;

		if (L.Browser.vml) {
			this._container = null;
			this._stroke = null;
			this._fill = null;
		}

		map.off({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	projectLatlngs: function () {
		// do all projection stuff here
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._container) {
			this._updateStyle();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._updatePath();
		}
		return this;
	}
});

L.Map.include({
	_updatePathViewport: function () {
		var p = L.Path.CLIP_PADDING,
		    size = this.getSize(),
		    panePos = L.DomUtil.getPosition(this._mapPane),
		    min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
		    max = min.add(size.multiplyBy(1 + p * 2)._round());

		this._pathViewport = new L.Bounds(min, max);
	}
});


/*
 * Extends L.Path with SVG-specific rendering code.
 */

L.Path.SVG_NS = 'http://www.w3.org/2000/svg';

L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);

L.Path = L.Path.extend({
	statics: {
		SVG: L.Browser.svg
	},

	bringToFront: function () {
		var root = this._map._pathRoot,
		    path = this._container;

		if (path && root.lastChild !== path) {
			root.appendChild(path);
		}
		return this;
	},

	bringToBack: function () {
		var root = this._map._pathRoot,
		    path = this._container,
		    first = root.firstChild;

		if (path && first !== path) {
			root.insertBefore(path, first);
		}
		return this;
	},

	getPathString: function () {
		// form path string here
	},

	_createElement: function (name) {
		return document.createElementNS(L.Path.SVG_NS, name);
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._initPath();
		this._initStyle();
	},

	_initPath: function () {
		this._container = this._createElement('g');

		this._path = this._createElement('path');

		if (this.options.className) {
			L.DomUtil.addClass(this._path, this.options.className);
		}

		this._container.appendChild(this._path);
	},

	_initStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke-linejoin', 'round');
			this._path.setAttribute('stroke-linecap', 'round');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill-rule', 'evenodd');
		}
		if (this.options.pointerEvents) {
			this._path.setAttribute('pointer-events', this.options.pointerEvents);
		}
		if (!this.options.clickable && !this.options.pointerEvents) {
			this._path.setAttribute('pointer-events', 'none');
		}
		this._updateStyle();
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke', this.options.color);
			this._path.setAttribute('stroke-opacity', this.options.opacity);
			this._path.setAttribute('stroke-width', this.options.weight);
			if (this.options.dashArray) {
				this._path.setAttribute('stroke-dasharray', this.options.dashArray);
			} else {
				this._path.removeAttribute('stroke-dasharray');
			}
			if (this.options.lineCap) {
				this._path.setAttribute('stroke-linecap', this.options.lineCap);
			}
			if (this.options.lineJoin) {
				this._path.setAttribute('stroke-linejoin', this.options.lineJoin);
			}
		} else {
			this._path.setAttribute('stroke', 'none');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill', this.options.fillColor || this.options.color);
			this._path.setAttribute('fill-opacity', this.options.fillOpacity);
		} else {
			this._path.setAttribute('fill', 'none');
		}
	},

	_updatePath: function () {
		var str = this.getPathString();
		if (!str) {
			// fix webkit empty string parsing bug
			str = 'M0 0';
		}
		this._path.setAttribute('d', str);
	},

	// TODO remove duplication with L.Map
	_initEvents: function () {
		if (this.options.clickable) {
			if (L.Browser.svg || !L.Browser.vml) {
				L.DomUtil.addClass(this._path, 'leaflet-clickable');
			}

			L.DomEvent.on(this._container, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseover',
			              'mouseout', 'mousemove', 'contextmenu'];
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
			}
		}
	},

	_onMouseClick: function (e) {
		if (this._map.dragging && this._map.dragging.moved()) { return; }

		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._map || !this.hasEventListeners(e.type)) { return; }

		var map = this._map,
		    containerPoint = map.mouseEventToContainerPoint(e),
		    layerPoint = map.containerPointToLayerPoint(containerPoint),
		    latlng = map.layerPointToLatLng(layerPoint);

		this.fire(e.type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});

		if (e.type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousemove') {
			L.DomEvent.stopPropagation(e);
		}
	}
});

L.Map.include({
	_initPathRoot: function () {
		if (!this._pathRoot) {
			this._pathRoot = L.Path.prototype._createElement('svg');
			this._panes.overlayPane.appendChild(this._pathRoot);

			if (this.options.zoomAnimation && L.Browser.any3d) {
				L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');

				this.on({
					'zoomanim': this._animatePathZoom,
					'zoomend': this._endPathZoom
				});
			} else {
				L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide');
			}

			this.on('moveend', this._updateSvgViewport);
			this._updateSvgViewport();
		}
	},

	_animatePathZoom: function (e) {
		var scale = this.getZoomScale(e.zoom),
		    offset = this._getCenterOffset(e.center)._multiplyBy(-scale)._add(this._pathViewport.min);

		this._pathRoot.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ') ';

		this._pathZooming = true;
	},

	_endPathZoom: function () {
		this._pathZooming = false;
	},

	_updateSvgViewport: function () {

		if (this._pathZooming) {
			// Do not update SVGs while a zoom animation is going on otherwise the animation will break.
			// When the zoom animation ends we will be updated again anyway
			// This fixes the case where you do a momentum move and zoom while the move is still ongoing.
			return;
		}

		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    max = vp.max,
		    width = max.x - min.x,
		    height = max.y - min.y,
		    root = this._pathRoot,
		    pane = this._panes.overlayPane;

		// Hack to make flicker on drag end on mobile webkit less irritating
		if (L.Browser.mobileWebkit) {
			pane.removeChild(root);
		}

		L.DomUtil.setPosition(root, min);
		root.setAttribute('width', width);
		root.setAttribute('height', height);
		root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

		if (L.Browser.mobileWebkit) {
			pane.appendChild(root);
		}
	}
});


/*
 * Popup extension to L.Path (polylines, polygons, circles), adding popup-related methods.
 */

L.Path.include({

	bindPopup: function (content, options) {

		if (content instanceof L.Popup) {
			this._popup = content;
		} else {
			if (!this._popup || options) {
				this._popup = new L.Popup(options, this);
			}
			this._popup.setContent(content);
		}

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this._openPopup, this)
			    .on('remove', this.closePopup, this);

			this._popupHandlersAdded = true;
		}

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this._openPopup)
			    .off('remove', this.closePopup);

			this._popupHandlersAdded = false;
		}
		return this;
	},

	openPopup: function (latlng) {

		if (this._popup) {
			// open the popup from one of the path's points if not specified
			latlng = latlng || this._latlng ||
			         this._latlngs[Math.floor(this._latlngs.length / 2)];

			this._openPopup({latlng: latlng});
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	_openPopup: function (e) {
		this._popup.setLatLng(e.latlng);
		this._map.openPopup(this._popup);
	}
});


/*
 * Vector rendering for IE6-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

L.Browser.vml = !L.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
	statics: {
		VML: true,
		CLIP_PADDING: 0.02
	},

	_createElement: (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement(
				        '<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	}()),

	_initPath: function () {
		var container = this._container = this._createElement('shape');

		L.DomUtil.addClass(container, 'leaflet-vml-shape' +
			(this.options.className ? ' ' + this.options.className : ''));

		if (this.options.clickable) {
			L.DomUtil.addClass(container, 'leaflet-clickable');
		}

		container.coordsize = '1 1';

		this._path = this._createElement('path');
		container.appendChild(this._path);

		this._map._pathRoot.appendChild(container);
	},

	_initStyle: function () {
		this._updateStyle();
	},

	_updateStyle: function () {
		var stroke = this._stroke,
		    fill = this._fill,
		    options = this.options,
		    container = this._container;

		container.stroked = options.stroke;
		container.filled = options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = this._stroke = this._createElement('stroke');
				stroke.endcap = 'round';
				container.appendChild(stroke);
			}
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;

			if (options.dashArray) {
				stroke.dashStyle = L.Util.isArray(options.dashArray) ?
				    options.dashArray.join(' ') :
				    options.dashArray.replace(/( *, *)/g, ' ');
			} else {
				stroke.dashStyle = '';
			}
			if (options.lineCap) {
				stroke.endcap = options.lineCap.replace('butt', 'flat');
			}
			if (options.lineJoin) {
				stroke.joinstyle = options.lineJoin;
			}

		} else if (stroke) {
			container.removeChild(stroke);
			this._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = this._fill = this._createElement('fill');
				container.appendChild(fill);
			}
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;

		} else if (fill) {
			container.removeChild(fill);
			this._fill = null;
		}
	},

	_updatePath: function () {
		var style = this._container.style;

		style.display = 'none';
		this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
		style.display = '';
	}
});

L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
	_initPathRoot: function () {
		if (this._pathRoot) { return; }

		var root = this._pathRoot = document.createElement('div');
		root.className = 'leaflet-vml-container';
		this._panes.overlayPane.appendChild(root);

		this.on('moveend', this._updatePathViewport);
		this._updatePathViewport();
	}
});


/*
 * Vector rendering for all browsers that support canvas.
 */

L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
	statics: {
		//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
		CANVAS: true,
		SVG: false
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._requestUpdate();
		}
		return this;
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._map) {
			this._updateStyle();
			this._requestUpdate();
		}
		return this;
	},

	onRemove: function (map) {
		map
		    .off('viewreset', this.projectLatlngs, this)
		    .off('moveend', this._updatePath, this);

		if (this.options.clickable) {
			this._map.off('click', this._onClick, this);
			this._map.off('mousemove', this._onMouseMove, this);
		}

		this._requestUpdate();
		
		this.fire('remove');
		this._map = null;
	},

	_requestUpdate: function () {
		if (this._map && !L.Path._updateRequest) {
			L.Path._updateRequest = L.Util.requestAnimFrame(this._fireMapMoveEnd, this._map);
		}
	},

	_fireMapMoveEnd: function () {
		L.Path._updateRequest = null;
		this.fire('moveend');
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._ctx = this._map._canvasCtx;
	},

	_updateStyle: function () {
		var options = this.options;

		if (options.stroke) {
			this._ctx.lineWidth = options.weight;
			this._ctx.strokeStyle = options.color;
		}
		if (options.fill) {
			this._ctx.fillStyle = options.fillColor || options.color;
		}

		if (options.lineCap) {
			this._ctx.lineCap = options.lineCap;
		}
		if (options.lineJoin) {
			this._ctx.lineJoin = options.lineJoin;
		}
	},

	_drawPath: function () {
		var i, j, len, len2, point, drawMethod;

		this._ctx.beginPath();

		for (i = 0, len = this._parts.length; i < len; i++) {
			for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
				point = this._parts[i][j];
				drawMethod = (j === 0 ? 'move' : 'line') + 'To';

				this._ctx[drawMethod](point.x, point.y);
			}
			// TODO refactor ugly hack
			if (this instanceof L.Polygon) {
				this._ctx.closePath();
			}
		}
	},

	_checkIfEmpty: function () {
		return !this._parts.length;
	},

	_updatePath: function () {
		if (this._checkIfEmpty()) { return; }

		var ctx = this._ctx,
		    options = this.options;

		this._drawPath();
		ctx.save();
		this._updateStyle();

		if (options.fill) {
			ctx.globalAlpha = options.fillOpacity;
			ctx.fill(options.fillRule || 'evenodd');
		}

		if (options.stroke) {
			ctx.globalAlpha = options.opacity;
			ctx.stroke();
		}

		ctx.restore();

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_initEvents: function () {
		if (this.options.clickable) {
			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click dblclick contextmenu', this._fireMouseEvent, this);
		}
	},

	_fireMouseEvent: function (e) {
		if (this._containsPoint(e.layerPoint)) {
			this.fire(e.type, e);
		}
	},

	_onMouseMove: function (e) {
		if (!this._map || this._map._animatingZoom) { return; }

		// TODO don't do on each move
		if (this._containsPoint(e.layerPoint)) {
			this._ctx.canvas.style.cursor = 'pointer';
			this._mouseInside = true;
			this.fire('mouseover', e);

		} else if (this._mouseInside) {
			this._ctx.canvas.style.cursor = '';
			this._mouseInside = false;
			this.fire('mouseout', e);
		}
	}
});

L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
	_initPathRoot: function () {
		var root = this._pathRoot,
		    ctx;

		if (!root) {
			root = this._pathRoot = document.createElement('canvas');
			root.style.position = 'absolute';
			ctx = this._canvasCtx = root.getContext('2d');

			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			this._panes.overlayPane.appendChild(root);

			if (this.options.zoomAnimation) {
				this._pathRoot.className = 'leaflet-zoom-animated';
				this.on('zoomanim', this._animatePathZoom);
				this.on('zoomend', this._endPathZoom);
			}
			this.on('moveend', this._updateCanvasViewport);
			this._updateCanvasViewport();
		}
	},

	_updateCanvasViewport: function () {
		// don't redraw while zooming. See _updateSvgViewport for more details
		if (this._pathZooming) { return; }
		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    size = vp.max.subtract(min),
		    root = this._pathRoot;

		//TODO check if this works properly on mobile webkit
		L.DomUtil.setPosition(root, min);
		root.width = size.x;
		root.height = size.y;
		root.getContext('2d').translate(-min.x, -min.y);
	}
});


/*
 * L.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

/*jshint bitwise:false */ // allow bitwise operations for this file

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode) {
		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			// if a,b is outside the clip window (trivial reject)
			} else if (codeA & codeB) {
				return false;
			// other cases
			} else {
				codeOut = codeA || codeB;
				p = this._getEdgeIntersection(a, b, codeOut, bounds);
				newCode = this._getBitCode(p, bounds);

				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max;

		if (code & 8) { // top
			return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
		} else if (code & 4) { // bottom
			return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
		} else if (code & 2) { // right
			return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
		} else if (code & 1) { // left
			return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
		}
	},

	_getBitCode: function (/*Point*/ p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}
		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};


/*
 * L.Polyline is used to display polylines on a map.
 */

L.Polyline = L.Path.extend({
	initialize: function (latlngs, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlngs = this._convertLatLngs(latlngs);
	},

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0,
		noClip: false
	},

	projectLatlngs: function () {
		this._originalPoints = [];

		for (var i = 0, len = this._latlngs.length; i < len; i++) {
			this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
		}
	},

	getPathString: function () {
		for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
			str += this._getPathPartStr(this._parts[i]);
		}
		return str;
	},

	getLatLngs: function () {
		return this._latlngs;
	},

	setLatLngs: function (latlngs) {
		this._latlngs = this._convertLatLngs(latlngs);
		return this.redraw();
	},

	addLatLng: function (latlng) {
		this._latlngs.push(L.latLng(latlng));
		return this.redraw();
	},

	spliceLatLngs: function () { // (Number index, Number howMany)
		var removed = [].splice.apply(this._latlngs, arguments);
		this._convertLatLngs(this._latlngs, true);
		this.redraw();
		return removed;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;

		for (var j = 0, jLen = parts.length; j < jLen; j++) {
			var points = parts[j];
			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];
				var sqDist = L.LineUtil._sqClosestPointOnSegment(p, p1, p2, true);
				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getBounds: function () {
		return new L.LatLngBounds(this.getLatLngs());
	},

	_convertLatLngs: function (latlngs, overwrite) {
		var i, len, target = overwrite ? latlngs : [];

		for (i = 0, len = latlngs.length; i < len; i++) {
			if (L.Util.isArray(latlngs[i]) && typeof latlngs[i][0] !== 'number') {
				return;
			}
			target[i] = L.latLng(latlngs[i]);
		}
		return target;
	},

	_initEvents: function () {
		L.Path.prototype._initEvents.call(this);
	},

	_getPathPartStr: function (points) {
		var round = L.Path.VML;

		for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
			p = points[j];
			if (round) {
				p._round();
			}
			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
		}
		return str;
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    len = points.length,
		    i, k, segment;

		if (this.options.noClip) {
			this._parts = [points];
			return;
		}

		this._parts = [];

		var parts = this._parts,
		    vp = this._map._pathViewport,
		    lu = L.LineUtil;

		for (i = 0, k = 0; i < len - 1; i++) {
			segment = lu.clipSegment(points[i], points[i + 1], vp, i);
			if (!segment) {
				continue;
			}

			parts[k] = parts[k] || [];
			parts[k].push(segment[0]);

			// if segment goes out of screen, or it's the last one, it's the end of the line part
			if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
				parts[k].push(segment[1]);
				k++;
			}
		}
	},

	// simplify each clipped part of the polyline
	_simplifyPoints: function () {
		var parts = this._parts,
		    lu = L.LineUtil;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
		}
	},

	_updatePath: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();

		L.Path.prototype._updatePath.call(this);
	}
});

L.polyline = function (latlngs, options) {
	return new L.Polyline(latlngs, options);
};


/*
 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
 */

/*jshint bitwise:false */ // allow bitwise operations here

L.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
L.PolyUtil.clipPolygon = function (points, bounds) {
	var clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};


/*
 * L.Polygon is used to display polygons on a map.
 */

L.Polygon = L.Polyline.extend({
	options: {
		fill: true
	},

	initialize: function (latlngs, options) {
		L.Polyline.prototype.initialize.call(this, latlngs, options);
		this._initWithHoles(latlngs);
	},

	_initWithHoles: function (latlngs) {
		var i, len, hole;
		if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
			this._latlngs = this._convertLatLngs(latlngs[0]);
			this._holes = latlngs.slice(1);

			for (i = 0, len = this._holes.length; i < len; i++) {
				hole = this._holes[i] = this._convertLatLngs(this._holes[i]);
				if (hole[0].equals(hole[hole.length - 1])) {
					hole.pop();
				}
			}
		}

		// filter out last point if its equal to the first one
		latlngs = this._latlngs;

		if (latlngs.length >= 2 && latlngs[0].equals(latlngs[latlngs.length - 1])) {
			latlngs.pop();
		}
	},

	projectLatlngs: function () {
		L.Polyline.prototype.projectLatlngs.call(this);

		// project polygon holes points
		// TODO move this logic to Polyline to get rid of duplication
		this._holePoints = [];

		if (!this._holes) { return; }

		var i, j, len, len2;

		for (i = 0, len = this._holes.length; i < len; i++) {
			this._holePoints[i] = [];

			for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
				this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
			}
		}
	},

	setLatLngs: function (latlngs) {
		if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
			this._initWithHoles(latlngs);
			return this.redraw();
		} else {
			return L.Polyline.prototype.setLatLngs.call(this, latlngs);
		}
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    newParts = [];

		this._parts = [points].concat(this._holePoints);

		if (this.options.noClip) { return; }

		for (var i = 0, len = this._parts.length; i < len; i++) {
			var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
			if (clipped.length) {
				newParts.push(clipped);
			}
		}

		this._parts = newParts;
	},

	_getPathPartStr: function (points) {
		var str = L.Polyline.prototype._getPathPartStr.call(this, points);
		return str + (L.Browser.svg ? 'z' : 'x');
	}
});

L.polygon = function (latlngs, options) {
	return new L.Polygon(latlngs, options);
};


/*
 * Contains L.MultiPolyline and L.MultiPolygon layers.
 */

(function () {
	function createMulti(Klass) {

		return L.FeatureGroup.extend({

			initialize: function (latlngs, options) {
				this._layers = {};
				this._options = options;
				this.setLatLngs(latlngs);
			},

			setLatLngs: function (latlngs) {
				var i = 0,
				    len = latlngs.length;

				this.eachLayer(function (layer) {
					if (i < len) {
						layer.setLatLngs(latlngs[i++]);
					} else {
						this.removeLayer(layer);
					}
				}, this);

				while (i < len) {
					this.addLayer(new Klass(latlngs[i++], this._options));
				}

				return this;
			},

			getLatLngs: function () {
				var latlngs = [];

				this.eachLayer(function (layer) {
					latlngs.push(layer.getLatLngs());
				});

				return latlngs;
			}
		});
	}

	L.MultiPolyline = createMulti(L.Polyline);
	L.MultiPolygon = createMulti(L.Polygon);

	L.multiPolyline = function (latlngs, options) {
		return new L.MultiPolyline(latlngs, options);
	};

	L.multiPolygon = function (latlngs, options) {
		return new L.MultiPolygon(latlngs, options);
	};
}());


/*
 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
 */

L.Rectangle = L.Polygon.extend({
	initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	},

	setBounds: function (latLngBounds) {
		this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	},

	_boundsToLatLngs: function (latLngBounds) {
		latLngBounds = L.latLngBounds(latLngBounds);
		return [
			latLngBounds.getSouthWest(),
			latLngBounds.getNorthWest(),
			latLngBounds.getNorthEast(),
			latLngBounds.getSouthEast()
		];
	}
});

L.rectangle = function (latLngBounds, options) {
	return new L.Rectangle(latLngBounds, options);
};


/*
 * L.Circle is a circle overlay (with a certain radius in meters).
 */

L.Circle = L.Path.extend({
	initialize: function (latlng, radius, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = L.latLng(latlng);
		this._mRadius = radius;
	},

	options: {
		fill: true
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		return this.redraw();
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	projectLatlngs: function () {
		var lngRadius = this._getLngRadius(),
		    latlng = this._latlng,
		    pointLeft = this._map.latLngToLayerPoint([latlng.lat, latlng.lng - lngRadius]);

		this._point = this._map.latLngToLayerPoint(latlng);
		this._radius = Math.max(this._point.x - pointLeft.x, 1);
	},

	getBounds: function () {
		var lngRadius = this._getLngRadius(),
		    latRadius = (this._mRadius / 40075017) * 360,
		    latlng = this._latlng;

		return new L.LatLngBounds(
		        [latlng.lat - latRadius, latlng.lng - lngRadius],
		        [latlng.lat + latRadius, latlng.lng + lngRadius]);
	},

	getLatLng: function () {
		return this._latlng;
	},

	getPathString: function () {
		var p = this._point,
		    r = this._radius;

		if (this._checkIfEmpty()) {
			return '';
		}

		if (L.Browser.svg) {
			return 'M' + p.x + ',' + (p.y - r) +
			       'A' + r + ',' + r + ',0,1,1,' +
			       (p.x - 0.1) + ',' + (p.y - r) + ' z';
		} else {
			p._round();
			r = Math.round(r);
			return 'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r + ' 0,' + (65535 * 360);
		}
	},

	getRadius: function () {
		return this._mRadius;
	},

	// TODO Earth hardcoded, move into projection code!

	_getLatRadius: function () {
		return (this._mRadius / 40075017) * 360;
	},

	_getLngRadius: function () {
		return this._getLatRadius() / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
	},

	_checkIfEmpty: function () {
		if (!this._map) {
			return false;
		}
		var vp = this._map._pathViewport,
		    r = this._radius,
		    p = this._point;

		return p.x - r > vp.max.x || p.y - r > vp.max.y ||
		       p.x + r < vp.min.x || p.y + r < vp.min.y;
	}
});

L.circle = function (latlng, radius, options) {
	return new L.Circle(latlng, radius, options);
};


/*
 * L.CircleMarker is a circle overlay with a permanent pixel radius.
 */

L.CircleMarker = L.Circle.extend({
	options: {
		radius: 10,
		weight: 2
	},

	initialize: function (latlng, options) {
		L.Circle.prototype.initialize.call(this, latlng, null, options);
		this._radius = this.options.radius;
	},

	projectLatlngs: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
	},

	_updateStyle : function () {
		L.Circle.prototype._updateStyle.call(this);
		this.setRadius(this.options.radius);
	},

	setLatLng: function (latlng) {
		L.Circle.prototype.setLatLng.call(this, latlng);
		if (this._popup && this._popup._isOpen) {
			this._popup.setLatLng(latlng);
		}
		return this;
	},

	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._radius;
	}
});

L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};


/*
 * Extends L.Polyline to be able to manually detect clicks on Canvas-rendered polylines.
 */

L.Polyline.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p, closed) {
		var i, j, k, len, len2, dist, part,
		    w = this.options.weight / 2;

		if (L.Browser.touch) {
			w += 10; // polyline click tolerance on touch devices
		}

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];
			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				if (!closed && (j === 0)) {
					continue;
				}

				dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

				if (dist <= w) {
					return true;
				}
			}
		}
		return false;
	}
});


/*
 * Extends L.Polygon to be able to manually detect clicks on Canvas-rendered polygons.
 */

L.Polygon.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p) {
		var inside = false,
		    part, p1, p2,
		    i, j, k,
		    len, len2;

		// TODO optimization: check if within bounds first

		if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
			// click on polygon border
			return true;
		}

		// ray casting algorithm for detecting if point is in polygon

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];

			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				p1 = part[j];
				p2 = part[k];

				if (((p1.y > p.y) !== (p2.y > p.y)) &&
						(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
					inside = !inside;
				}
			}
		}

		return inside;
	}
});


/*
 * Extends L.Circle with Canvas-specific code.
 */

L.Circle.include(!L.Path.CANVAS ? {} : {
	_drawPath: function () {
		var p = this._point;
		this._ctx.beginPath();
		this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2, false);
	},

	_containsPoint: function (p) {
		var center = this._point,
		    w2 = this.options.stroke ? this.options.weight / 2 : 0;

		return (p.distanceTo(center) <= this._radius + w2);
	}
});


/*
 * CircleMarker canvas specific drawing parts.
 */

L.CircleMarker.include(!L.Path.CANVAS ? {} : {
	_updateStyle: function () {
		L.Path.prototype._updateStyle.call(this);
	}
});


/*
 * L.GeoJSON turns any GeoJSON data into a Leaflet layer.
 */

L.GeoJSON = L.FeatureGroup.extend({

	initialize: function (geojson, options) {
		L.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	addData: function (geojson) {
		var features = L.Util.isArray(geojson) ? geojson : geojson.features,
		    i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// Only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(features[i]);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return; }

		var layer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer, options.coordsToLatLng, options);
		layer.feature = L.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	resetStyle: function (layer) {
		var style = this.options.style;
		if (style) {
			// reset any custom styles
			L.Util.extend(layer.options, layer.defaultOptions);

			this._setLayerStyle(layer, style);
		}
	},

	setStyle: function (style) {
		this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

L.extend(L.GeoJSON, {
	geometryToLayer: function (geojson, pointToLayer, coordsToLatLng, vectorOptions) {
		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry.coordinates,
		    layers = [],
		    latlng, latlngs, i, len;

		coordsToLatLng = coordsToLatLng || this.coordsToLatLng;

		switch (geometry.type) {
		case 'Point':
			latlng = coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = coordsToLatLng(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
			latlngs = this.coordsToLatLngs(coords, 0, coordsToLatLng);
			return new L.Polyline(latlngs, vectorOptions);

		case 'Polygon':
			if (coords.length === 2 && !coords[1].length) {
				throw new Error('Invalid GeoJSON object.');
			}
			latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
			return new L.Polygon(latlngs, vectorOptions);

		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
			return new L.MultiPolyline(latlngs, vectorOptions);

		case 'MultiPolygon':
			latlngs = this.coordsToLatLngs(coords, 2, coordsToLatLng);
			return new L.MultiPolygon(latlngs, vectorOptions);

		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {

				layers.push(this.geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, pointToLayer, coordsToLatLng, vectorOptions));
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToLatLng: function (coords) { // (Array[, Boolean]) -> LatLng
		return new L.LatLng(coords[1], coords[0], coords[2]);
	},

	coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) { // (Array[, Number, Function]) -> Array
		var latlng, i, len,
		    latlngs = [];

		for (i = 0, len = coords.length; i < len; i++) {
			latlng = levelsDeep ?
			        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
			        (coordsToLatLng || this.coordsToLatLng)(coords[i]);

			latlngs.push(latlng);
		}

		return latlngs;
	},

	latLngToCoords: function (latlng) {
		var coords = [latlng.lng, latlng.lat];

		if (latlng.alt !== undefined) {
			coords.push(latlng.alt);
		}
		return coords;
	},

	latLngsToCoords: function (latLngs) {
		var coords = [];

		for (var i = 0, len = latLngs.length; i < len; i++) {
			coords.push(L.GeoJSON.latLngToCoords(latLngs[i]));
		}

		return coords;
	},

	getFeature: function (layer, newGeometry) {
		return layer.feature ? L.extend({}, layer.feature, {geometry: newGeometry}) : L.GeoJSON.asFeature(newGeometry);
	},

	asFeature: function (geoJSON) {
		if (geoJSON.type === 'Feature') {
			return geoJSON;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: geoJSON
		};
	}
});

var PointToGeoJSON = {
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	}
};

L.Marker.include(PointToGeoJSON);
L.Circle.include(PointToGeoJSON);
L.CircleMarker.include(PointToGeoJSON);

L.Polyline.include({
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'LineString',
			coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs())
		});
	}
});

L.Polygon.include({
	toGeoJSON: function () {
		var coords = [L.GeoJSON.latLngsToCoords(this.getLatLngs())],
		    i, len, hole;

		coords[0].push(coords[0][0]);

		if (this._holes) {
			for (i = 0, len = this._holes.length; i < len; i++) {
				hole = L.GeoJSON.latLngsToCoords(this._holes[i]);
				hole.push(hole[0]);
				coords.push(hole);
			}
		}

		return L.GeoJSON.getFeature(this, {
			type: 'Polygon',
			coordinates: coords
		});
	}
});

(function () {
	function multiToGeoJSON(type) {
		return function () {
			var coords = [];

			this.eachLayer(function (layer) {
				coords.push(layer.toGeoJSON().geometry.coordinates);
			});

			return L.GeoJSON.getFeature(this, {
				type: type,
				coordinates: coords
			});
		};
	}

	L.MultiPolyline.include({toGeoJSON: multiToGeoJSON('MultiLineString')});
	L.MultiPolygon.include({toGeoJSON: multiToGeoJSON('MultiPolygon')});

	L.LayerGroup.include({
		toGeoJSON: function () {

			var geometry = this.feature && this.feature.geometry,
				jsons = [],
				json;

			if (geometry && geometry.type === 'MultiPoint') {
				return multiToGeoJSON('MultiPoint').call(this);
			}

			var isGeometryCollection = geometry && geometry.type === 'GeometryCollection';

			this.eachLayer(function (layer) {
				if (layer.toGeoJSON) {
					json = layer.toGeoJSON();
					jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
				}
			});

			if (isGeometryCollection) {
				return L.GeoJSON.getFeature(this, {
					geometries: jsons,
					type: 'GeometryCollection'
				});
			}

			return {
				type: 'FeatureCollection',
				features: jsons
			};
		}
	});
}());

L.geoJson = function (geojson, options) {
	return new L.GeoJSON(geojson, options);
};


/*
 * L.DomEvent contains functions for working with DOM events.
 */

L.DomEvent = {
	/* inspired by John Resig, Dean Edwards and YUI addEvent implementations */
	addListener: function (obj, type, fn, context) { // (HTMLElement, String, Function[, Object])

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler, originalHandler, newType;

		if (obj[key]) { return this; }

		handler = function (e) {
			return fn.call(context || obj, e || L.DomEvent._getEvent());
		};

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			return this.addPointerListener(obj, type, handler, id);
		}
		if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);
		}

		if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {

				originalHandler = handler;
				newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');

				handler = function (e) {
					if (!L.DomEvent._checkMouse(obj, e)) { return; }
					return originalHandler(e);
				};

				obj.addEventListener(newType, handler, false);

			} else if (type === 'click' && L.Browser.android) {
				originalHandler = handler;
				handler = function (e) {
					return L.DomEvent._filterClick(e, originalHandler);
				};

				obj.addEventListener(type, handler, false);
			} else {
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}

		obj[key] = handler;

		return this;
	},

	removeListener: function (obj, type, fn) {  // (HTMLElement, String, Function)

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler = obj[key];

		if (!handler) { return this; }

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.removePointerListener(obj, type, id);
		} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
			} else {
				obj.removeEventListener(type, handler, false);
			}
		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}

		obj[key] = null;

		return this;
	},

	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		L.DomEvent._skipped(e);

		return this;
	},

	disableScrollPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		return L.DomEvent
			.on(el, 'mousewheel', stop)
			.on(el, 'MozMousePixelScroll', stop);
	},

	disableClickPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.on(el, L.Draggable.START[i], stop);
		}

		return L.DomEvent
			.on(el, 'click', L.DomEvent._fakeStop)
			.on(el, 'dblclick', stop);
	},

	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	stop: function (e) {
		return L.DomEvent
			.preventDefault(e)
			.stopPropagation(e);
	},

	getMousePosition: function (e, container) {
		if (!container) {
			return new L.Point(e.clientX, e.clientY);
		}

		var rect = container.getBoundingClientRect();

		return new L.Point(
			e.clientX - rect.left - container.clientLeft,
			e.clientY - rect.top - container.clientTop);
	},

	getWheelDelta: function (e) {

		var delta = 0;

		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	},

	_skipEvents: {},

	_fakeStop: function (e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
		L.DomEvent._skipEvents[e.type] = true;
	},

	_skipped: function (e) {
		var skipped = this._skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		this._skipEvents[e.type] = false;
		return skipped;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_checkMouse: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	_getEvent: function () { // evil magic for IE
		/*jshint noarg:false */
		var e = window.event;
		if (!e) {
			var caller = arguments.callee.caller;
			while (caller) {
				e = caller['arguments'][0];
				if (e && window.Event === e.constructor) {
					break;
				}
				caller = caller.caller;
			}
		}
		return e;
	},

	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	_filterClick: function (e, handler) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events

		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return;
		}
		L.DomEvent._lastClick = timeStamp;

		return handler(e);
	}
};

L.DomEvent.on = L.DomEvent.addListener;
L.DomEvent.off = L.DomEvent.removeListener;


/*
 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

L.Draggable = L.Class.extend({
	includes: L.Mixin.Events,

	statics: {
		START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
		END: {
			mousedown: 'mouseup',
			touchstart: 'touchend',
			pointerdown: 'touchend',
			MSPointerDown: 'touchend'
		},
		MOVE: {
			mousedown: 'mousemove',
			touchstart: 'touchmove',
			pointerdown: 'touchmove',
			MSPointerDown: 'touchmove'
		}
	},

	initialize: function (element, dragStartTarget) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
	},

	enable: function () {
		if (this._enabled) { return; }

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.on(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
		}

		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) { return; }

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.off(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
		}

		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		this._moved = false;

		if (e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }

		L.DomEvent.stopPropagation(e);

		if (L.Draggable._disabled) { return; }

		L.DomUtil.disableImageDrag();
		L.DomUtil.disableTextSelection();

		if (this._moving) { return; }

		var first = e.touches ? e.touches[0] : e;

		this._startPoint = new L.Point(first.clientX, first.clientY);
		this._startPos = this._newPos = L.DomUtil.getPosition(this._element);

		L.DomEvent
		    .on(document, L.Draggable.MOVE[e.type], this._onMove, this)
		    .on(document, L.Draggable.END[e.type], this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    newPoint = new L.Point(first.clientX, first.clientY),
		    offset = newPoint.subtract(this._startPoint);

		if (!offset.x && !offset.y) { return; }
		if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

		L.DomEvent.preventDefault(e);

		if (!this._moved) {
			this.fire('dragstart');

			this._moved = true;
			this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

			L.DomUtil.addClass(document.body, 'leaflet-dragging');
			this._lastTarget = e.target || e.srcElement;
			L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
	},

	_updatePosition: function () {
		this.fire('predrag');
		L.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag');
	},

	_onUp: function () {
		L.DomUtil.removeClass(document.body, 'leaflet-dragging');

		if (this._lastTarget) {
			L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
			this._lastTarget = null;
		}

		for (var i in L.Draggable.MOVE) {
			L.DomEvent
			    .off(document, L.Draggable.MOVE[i], this._onMove)
			    .off(document, L.Draggable.END[i], this._onUp);
		}

		L.DomUtil.enableImageDrag();
		L.DomUtil.enableTextSelection();

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			L.Util.cancelAnimFrame(this._animRequest);

			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}

		this._moving = false;
	}
});


/*
	L.Handler is a base class for handler classes that are used internally to inject
	interaction features like dragging to classes like Map and Marker.
*/

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

	enabled: function () {
		return !!this._enabled;
	}
});


/*
 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
 */

L.Map.mergeOptions({
	dragging: true,

	inertia: !L.Browser.android23,
	inertiaDeceleration: 3400, // px/s^2
	inertiaMaxSpeed: Infinity, // px/s
	inertiaThreshold: L.Browser.touch ? 32 : 18, // ms
	easeLinearity: 0.25,

	// TODO refactor, move to CRS
	worldCopyJump: false
});

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new L.Draggable(map._mapPane, map._container);

			this._draggable.on({
				'dragstart': this._onDragStart,
				'drag': this._onDrag,
				'dragend': this._onDragEnd
			}, this);

			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDrag, this);
				map.on('viewreset', this._onViewReset, this);

				map.whenReady(this._onViewReset, this);
			}
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		var map = this._map;

		if (map._panAnim) {
			map._panAnim.stop();
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function () {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 200) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move')
		    .fire('drag');
	},

	_onViewReset: function () {
		// TODO fix hardcoded Earth values
		var pxCenter = this._map.getSize()._divideBy(2),
		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.project([0, 180]).x;
	},

	_onPreDrag: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function (e) {
		var map = this._map,
		    options = map.options,
		    delay = +new Date() - this._lastTime,

		    noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime + delay - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo([0, 0]),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			if (!offset.x || !offset.y) {
				map.fire('moveend');

			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				L.Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true
					});
				});
			}
		}
	}
});

L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);


/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

L.Map.mergeOptions({
	doubleClickZoom: true
});

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick, this);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick, this);
	},

	_onDoubleClick: function (e) {
		var map = this._map,
		    zoom = map.getZoom() + (e.originalEvent.shiftKey ? -1 : 1);

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPoint, zoom);
		}
	}
});

L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);


/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

L.Map.mergeOptions({
	scrollWheelZoom: true
});

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
		L.DomEvent.on(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
		L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(40 - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.bind(this._performZoom, this), left);

		L.DomEvent.preventDefault(e);
		L.DomEvent.stopPropagation(e);
	},

	_performZoom: function () {
		var map = this._map,
		    delta = this._delta,
		    zoom = map.getZoom();

		delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;
		this._startTime = null;

		if (!delta) { return; }

		if (map.options.scrollWheelZoom === 'center') {
			map.setZoom(zoom + delta);
		} else {
			map.setZoomAround(this._lastMousePos, zoom + delta);
		}
	}
});

L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);


/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

L.extend(L.DomEvent, {

	_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
	_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last,
		    doubleTap = false,
		    delay = 250,
		    touch,
		    pre = '_leaflet_',
		    touchstart = this._touchstart,
		    touchend = this._touchend,
		    trackedTouches = [];

		function onTouchStart(e) {
			var count;

			if (L.Browser.pointer) {
				trackedTouches.push(e.pointerId);
				count = trackedTouches.length;
			} else {
				count = e.touches.length;
			}
			if (count > 1) {
				return;
			}

			var now = Date.now(),
				delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd(e) {
			if (L.Browser.pointer) {
				var idx = trackedTouches.indexOf(e.pointerId);
				if (idx === -1) {
					return;
				}
				trackedTouches.splice(idx, 1);
			}

			if (doubleTap) {
				if (L.Browser.pointer) {
					// work around .type being readonly with MSPointer* events
					var newTouch = { },
						prop;

					// jshint forin:false
					for (var i in touch) {
						prop = touch[i];
						if (typeof prop === 'function') {
							newTouch[i] = prop.bind(touch);
						} else {
							newTouch[i] = prop;
						}
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}
		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		// on pointer we need to listen on the document, otherwise a drag starting on the map and moving off screen
		// will not come through to us, so we will lose track of how many touches are ongoing
		var endElement = L.Browser.pointer ? document.documentElement : obj;

		obj.addEventListener(touchstart, onTouchStart, false);
		endElement.addEventListener(touchend, onTouchEnd, false);

		if (L.Browser.pointer) {
			endElement.addEventListener(L.DomEvent.POINTER_CANCEL, onTouchEnd, false);
		}

		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_';

		obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
		(L.Browser.pointer ? document.documentElement : obj).removeEventListener(
		        this._touchend, obj[pre + this._touchend + id], false);

		if (L.Browser.pointer) {
			document.documentElement.removeEventListener(L.DomEvent.POINTER_CANCEL, obj[pre + this._touchend + id],
				false);
		}

		return this;
	}
});


/*
 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */

L.extend(L.DomEvent, {

	//static
	POINTER_DOWN: L.Browser.msPointer ? 'MSPointerDown' : 'pointerdown',
	POINTER_MOVE: L.Browser.msPointer ? 'MSPointerMove' : 'pointermove',
	POINTER_UP: L.Browser.msPointer ? 'MSPointerUp' : 'pointerup',
	POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',

	_pointers: [],
	_pointerDocumentListener: false,

	// Provides a touch events wrapper for (ms)pointer events.
	// Based on changes by veproza https://github.com/CloudMade/Leaflet/pull/1019
	//ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	addPointerListener: function (obj, type, handler, id) {

		switch (type) {
		case 'touchstart':
			return this.addPointerListenerStart(obj, type, handler, id);
		case 'touchend':
			return this.addPointerListenerEnd(obj, type, handler, id);
		case 'touchmove':
			return this.addPointerListenerMove(obj, type, handler, id);
		default:
			throw 'Unknown touch event type';
		}
	},

	addPointerListenerStart: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    pointers = this._pointers;

		var cb = function (e) {
			if (e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
				L.DomEvent.preventDefault(e);
			}

			var alreadyInArray = false;
			for (var i = 0; i < pointers.length; i++) {
				if (pointers[i].pointerId === e.pointerId) {
					alreadyInArray = true;
					break;
				}
			}
			if (!alreadyInArray) {
				pointers.push(e);
			}

			e.touches = pointers.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchstart' + id] = cb;
		obj.addEventListener(this.POINTER_DOWN, cb, false);

		// need to also listen for end events to keep the _pointers list accurate
		// this needs to be on the body and never go away
		if (!this._pointerDocumentListener) {
			var internalCb = function (e) {
				for (var i = 0; i < pointers.length; i++) {
					if (pointers[i].pointerId === e.pointerId) {
						pointers.splice(i, 1);
						break;
					}
				}
			};
			//We listen on the documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(this.POINTER_UP, internalCb, false);
			document.documentElement.addEventListener(this.POINTER_CANCEL, internalCb, false);

			this._pointerDocumentListener = true;
		}

		return this;
	},

	addPointerListenerMove: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._pointers;

		function cb(e) {

			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches[i] = e;
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		}

		obj[pre + 'touchmove' + id] = cb;
		obj.addEventListener(this.POINTER_MOVE, cb, false);

		return this;
	},

	addPointerListenerEnd: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._pointers;

		var cb = function (e) {
			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches.splice(i, 1);
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchend' + id] = cb;
		obj.addEventListener(this.POINTER_UP, cb, false);
		obj.addEventListener(this.POINTER_CANCEL, cb, false);

		return this;
	},

	removePointerListener: function (obj, type, id) {
		var pre = '_leaflet_',
		    cb = obj[pre + type + id];

		switch (type) {
		case 'touchstart':
			obj.removeEventListener(this.POINTER_DOWN, cb, false);
			break;
		case 'touchmove':
			obj.removeEventListener(this.POINTER_MOVE, cb, false);
			break;
		case 'touchend':
			obj.removeEventListener(this.POINTER_UP, cb, false);
			obj.removeEventListener(this.POINTER_CANCEL, cb, false);
			break;
		}

		return this;
	}
});


/*
 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
 */

L.Map.mergeOptions({
	touchZoom: L.Browser.touch && !L.Browser.android23,
	bounceAtZoomLimits: true
});

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]),
		    viewCenter = map._getCenterLayerPoint();

		this._startCenter = p1.add(p2)._divideBy(2);
		this._startDist = p1.distanceTo(p2);

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		if (map._panAnim) {
			map._panAnim.stop();
		}

		L.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

		if (this._scale === 1) { return; }

		if (!map.options.bounceAtZoomLimits) {
			if ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
			    (map.getZoom() === map.getMaxZoom() && this._scale > 1)) { return; }
		}

		if (!this._moved) {
			L.DomUtil.addClass(map._mapPane, 'leaflet-touching');

			map
			    .fire('movestart')
			    .fire('zoomstart');

			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(
		        this._updateOnMove, this, true, this._map._container);

		L.DomEvent.preventDefault(e);
	},

	_updateOnMove: function () {
		var map = this._map,
		    origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),
		    zoom = map.getScaleZoom(this._scale);

		map._animateZoom(center, zoom, this._startCenter, this._scale, this._delta, false, true);
	},

	_onTouchEnd: function () {
		if (!this._moved || !this._zooming) {
			this._zooming = false;
			return;
		}

		var map = this._map;

		this._zooming = false;
		L.DomUtil.removeClass(map._mapPane, 'leaflet-touching');
		L.Util.cancelAnimFrame(this._animRequest);

		L.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		var origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),

		    oldZoom = map.getZoom(),
		    floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
		    roundZoomDelta = (floatZoomDelta > 0 ?
		            Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),

		    zoom = map._limitZoom(oldZoom + roundZoomDelta),
		    scale = map.getZoomScale(zoom) / this._scale;

		map._animateZoom(center, zoom, origin, scale);
	},

	_getScaleOrigin: function () {
		var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
		return this._startCenter.add(centerOffset);
	}
});

L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);


/*
 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
 */

L.Map.mergeOptions({
	tap: true,
	tapTolerance: 15
});

L.Map.Tap = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
	},

	_onDown: function (e) {
		if (!e.touches) { return; }

		L.DomEvent.preventDefault(e);

		this._fireClick = true;

		// don't simulate click or track longpress if more than 1 touch
		if (e.touches.length > 1) {
			this._fireClick = false;
			clearTimeout(this._holdTimeout);
			return;
		}

		var first = e.touches[0],
		    el = first.target;

		this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);

		// if touching a link, highlight it
		if (el.tagName && el.tagName.toLowerCase() === 'a') {
			L.DomUtil.addClass(el, 'leaflet-active');
		}

		// simulate long hold but setting a timeout
		this._holdTimeout = setTimeout(L.bind(function () {
			if (this._isTapValid()) {
				this._fireClick = false;
				this._onUp();
				this._simulateEvent('contextmenu', first);
			}
		}, this), 1000);

		L.DomEvent
			.on(document, 'touchmove', this._onMove, this)
			.on(document, 'touchend', this._onUp, this);
	},

	_onUp: function (e) {
		clearTimeout(this._holdTimeout);

		L.DomEvent
			.off(document, 'touchmove', this._onMove, this)
			.off(document, 'touchend', this._onUp, this);

		if (this._fireClick && e && e.changedTouches) {

			var first = e.changedTouches[0],
			    el = first.target;

			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.removeClass(el, 'leaflet-active');
			}

			// simulate click if the touch didn't move too much
			if (this._isTapValid()) {
				this._simulateEvent('click', first);
			}
		}
	},

	_isTapValid: function () {
		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	},

	_onMove: function (e) {
		var first = e.touches[0];
		this._newPos = new L.Point(first.clientX, first.clientY);
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent._simulated = true;
		e.target._simulatedClick = true;

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});

if (L.Browser.touch && !L.Browser.pointer) {
	L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
}


/*
 * L.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
  * (zoom to a selected bounding box), enabled by default.
 */

L.Map.mergeOptions({
	boxZoom: true
});

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
		this._moved = false;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
		this._moved = false;
	},

	moved: function () {
		return this._moved;
	},

	_onMouseDown: function (e) {
		this._moved = false;

		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		L.DomUtil.disableTextSelection();
		L.DomUtil.disableImageDrag();

		this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

		L.DomEvent
		    .on(document, 'mousemove', this._onMouseMove, this)
		    .on(document, 'mouseup', this._onMouseUp, this)
		    .on(document, 'keydown', this._onKeyDown, this);
	},

	_onMouseMove: function (e) {
		if (!this._moved) {
			this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
			L.DomUtil.setPosition(this._box, this._startLayerPoint);

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';
			this._map.fire('boxzoomstart');
		}

		var startPoint = this._startLayerPoint,
		    box = this._box,

		    layerPoint = this._map.mouseEventToLayerPoint(e),
		    offset = layerPoint.subtract(startPoint),

		    newPos = new L.Point(
		        Math.min(layerPoint.x, startPoint.x),
		        Math.min(layerPoint.y, startPoint.y));

		L.DomUtil.setPosition(box, newPos);

		this._moved = true;

		// TODO refactor: remove hardcoded 4 pixels
		box.style.width  = (Math.max(0, Math.abs(offset.x) - 4)) + 'px';
		box.style.height = (Math.max(0, Math.abs(offset.y) - 4)) + 'px';
	},

	_finish: function () {
		if (this._moved) {
			this._pane.removeChild(this._box);
			this._container.style.cursor = '';
		}

		L.DomUtil.enableTextSelection();
		L.DomUtil.enableImageDrag();

		L.DomEvent
		    .off(document, 'mousemove', this._onMouseMove)
		    .off(document, 'mouseup', this._onMouseUp)
		    .off(document, 'keydown', this._onKeyDown);
	},

	_onMouseUp: function (e) {

		this._finish();

		var map = this._map,
		    layerPoint = map.mouseEventToLayerPoint(e);

		if (this._startLayerPoint.equals(layerPoint)) { return; }

		var bounds = new L.LatLngBounds(
		        map.layerPointToLatLng(this._startLayerPoint),
		        map.layerPointToLatLng(layerPoint));

		map.fitBounds(bounds);

		map.fire('boxzoomend', {
			boxZoomBounds: bounds
		});
	},

	_onKeyDown: function (e) {
		if (e.keyCode === 27) {
			this._finish();
		}
	}
});

L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);


/*
 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
 */

L.Map.mergeOptions({
	keyboard: true,
	keyboardPanOffset: 80,
	keyboardZoomOffset: 1
});

L.Map.Keyboard = L.Handler.extend({

	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61, 171],
		zoomOut: [189, 109, 173]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanOffset(map.options.keyboardPanOffset);
		this._setZoomOffset(map.options.keyboardZoomOffset);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex === -1) {
			container.tabIndex = '0';
		}

		L.DomEvent
		    .on(container, 'focus', this._onFocus, this)
		    .on(container, 'blur', this._onBlur, this)
		    .on(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .on('focus', this._addHooks, this)
		    .on('blur', this._removeHooks, this);
	},

	removeHooks: function () {
		this._removeHooks();

		var container = this._map._container;

		L.DomEvent
		    .off(container, 'focus', this._onFocus, this)
		    .off(container, 'blur', this._onBlur, this)
		    .off(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .off('focus', this._addHooks, this)
		    .off('blur', this._removeHooks, this);
	},

	_onMouseDown: function () {
		if (this._focused) { return; }

		var body = document.body,
		    docEl = document.documentElement,
		    top = body.scrollTop || docEl.scrollTop,
		    left = body.scrollLeft || docEl.scrollLeft;

		this._map._container.focus();

		window.scrollTo(left, top);
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanOffset: function (pan) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * pan, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [pan, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, pan];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * pan];
		}
	},

	_setZoomOffset: function (zoom) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoom;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoom;
		}
	},

	_addHooks: function () {
		L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		var key = e.keyCode,
		    map = this._map;

		if (key in this._panKeys) {

			if (map._panAnim && map._panAnim._inProgress) { return; }

			map.panBy(this._panKeys[key]);

			if (map.options.maxBounds) {
				map.panInsideBounds(map.options.maxBounds);
			}

		} else if (key in this._zoomKeys) {
			map.setZoom(map.getZoom() + this._zoomKeys[key]);

		} else {
			return;
		}

		L.DomEvent.stop(e);
	}
});

L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);


/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;
		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon);
		}

		this._draggable
			.on('dragstart', this._onDragStart, this)
			.on('drag', this._onDrag, this)
			.on('dragend', this._onDragEnd, this);
		this._draggable.enable();
		L.DomUtil.addClass(this._marker._icon, 'leaflet-marker-draggable');
	},

	removeHooks: function () {
		this._draggable
			.off('dragstart', this._onDragStart, this)
			.off('drag', this._onDrag, this)
			.off('dragend', this._onDragEnd, this);

		this._draggable.disable();
		L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		this._marker
		    .closePopup()
		    .fire('movestart')
		    .fire('dragstart');
	},

	_onDrag: function () {
		var marker = this._marker,
		    shadow = marker._shadow,
		    iconPos = L.DomUtil.getPosition(marker._icon),
		    latlng = marker._map.layerPointToLatLng(iconPos);

		// update shadow position
		if (shadow) {
			L.DomUtil.setPosition(shadow, iconPos);
		}

		marker._latlng = latlng;

		marker
		    .fire('move', {latlng: latlng})
		    .fire('drag');
	},

	_onDragEnd: function (e) {
		this._marker
		    .fire('moveend')
		    .fire('dragend', e);
	}
});


/*
 * L.Control is a base class for implementing map controls. Handles positioning.
 * All other controls extend from this class.
 */

L.Control = L.Class.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	getPosition: function () {
		return this.options.position;
	},

	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	getContainer: function () {
		return this._container;
	},

	addTo: function (map) {
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	removeFrom: function (map) {
		var pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		corner.removeChild(this._container);
		this._map = null;

		if (this.onRemove) {
			this.onRemove(map);
		}

		return this;
	},

	_refocusOnMap: function () {
		if (this._map) {
			this._map.getContainer().focus();
		}
	}
});

L.control = function (options) {
	return new L.Control(options);
};


// adds control-related methods to L.Map

L.Map.include({
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	removeControl: function (control) {
		control.removeFrom(this);
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'leaflet-',
		    container = this._controlContainer =
		            L.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = L.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	},

	_clearControlPos: function () {
		this._container.removeChild(this._controlContainer);
	}
});


/*
 * L.Control.Zoom is used for the default zoom buttons on the map.
 */

L.Control.Zoom = L.Control.extend({
	options: {
		position: 'topleft',
		zoomInText: '+',
		zoomInTitle: 'Zoom in',
		zoomOutText: '-',
		zoomOutTitle: 'Zoom out'
	},

	onAdd: function (map) {
		var zoomName = 'leaflet-control-zoom',
		    container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

		this._map = map;

		this._zoomInButton  = this._createButton(
		        this.options.zoomInText, this.options.zoomInTitle,
		        zoomName + '-in',  container, this._zoomIn,  this);
		this._zoomOutButton = this._createButton(
		        this.options.zoomOutText, this.options.zoomOutTitle,
		        zoomName + '-out', container, this._zoomOut, this);

		this._updateDisabled();
		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

		return container;
	},

	onRemove: function (map) {
		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	},

	_zoomIn: function (e) {
		this._map.zoomIn(e.shiftKey ? 3 : 1);
	},

	_zoomOut: function (e) {
		this._map.zoomOut(e.shiftKey ? 3 : 1);
	},

	_createButton: function (html, title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		var stop = L.DomEvent.stopPropagation;

		L.DomEvent
		    .on(link, 'click', stop)
		    .on(link, 'mousedown', stop)
		    .on(link, 'dblclick', stop)
		    .on(link, 'click', L.DomEvent.preventDefault)
		    .on(link, 'click', fn, context)
		    .on(link, 'click', this._refocusOnMap, context);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
			className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});

L.Map.mergeOptions({
	zoomControl: true
});

L.Map.addInitHook(function () {
	if (this.options.zoomControl) {
		this.zoomControl = new L.Control.Zoom();
		this.addControl(this.zoomControl);
	}
});

L.control.zoom = function (options) {
	return new L.Control.Zoom(options);
};



/*
 * L.Control.Attribution is used for displaying attribution on the map (added by default).
 */

L.Control.Attribution = L.Control.extend({
	options: {
		position: 'bottomright',
		prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
	},

	initialize: function (options) {
		L.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		L.DomEvent.disableClickPropagation(this._container);

		for (var i in map._layers) {
			if (map._layers[i].getAttribution) {
				this.addAttribution(map._layers[i].getAttribution());
			}
		}
		
		map
		    .on('layeradd', this._onLayerAdd, this)
		    .on('layerremove', this._onLayerRemove, this);

		this._update();

		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerAdd)
		    .off('layerremove', this._onLayerRemove);

	},

	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	addAttribution: function (text) {
		if (!text) { return; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	removeAttribution: function (text) {
		if (!text) { return; }

		if (this._attributions[text]) {
			this._attributions[text]--;
			this._update();
		}

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' | ');
	},

	_onLayerAdd: function (e) {
		if (e.layer.getAttribution) {
			this.addAttribution(e.layer.getAttribution());
		}
	},

	_onLayerRemove: function (e) {
		if (e.layer.getAttribution) {
			this.removeAttribution(e.layer.getAttribution());
		}
	}
});

L.Map.mergeOptions({
	attributionControl: false
});

L.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		this.attributionControl = (new L.Control.Attribution()).addTo(this);
	}
});

L.control.attribution = function (options) {
	return new L.Control.Attribution(options);
};


/*
 * L.Control.Scale is used for displaying metric/imperial scale on the map.
 */

L.Control.Scale = L.Control.extend({
	options: {
		position: 'bottomleft',
		maxWidth: 100,
		metric: true,
		imperial: true,
		updateWhenIdle: false
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-scale',
		    container = L.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className, container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		if (options.metric) {
			this._mScale = L.DomUtil.create('div', className + '-line', container);
		}
		if (options.imperial) {
			this._iScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_update: function () {
		var bounds = this._map.getBounds(),
		    centerLat = bounds.getCenter().lat,
		    halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
		    dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

		    size = this._map.getSize(),
		    options = this.options,
		    maxMeters = 0;

		if (size.x > 0) {
			maxMeters = dist * (options.maxWidth / size.x);
		}

		this._updateScales(options, maxMeters);
	},

	_updateScales: function (options, maxMeters) {
		if (options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}

		if (options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var meters = this._getRoundNum(maxMeters);

		this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
		this._mScale.innerHTML = meters < 1000 ? meters + ' 米' : (meters / 1000) + ' 千米';
	},

	_updateImperial: function (maxMeters) {
		var maxFeet = maxMeters * 3.2808399,
		    scale = this._iScale,
		    maxMiles, miles, feet;

		if (maxFeet > 5280) {
			maxMiles = maxFeet / 5280;
			miles = this._getRoundNum(maxMiles);

			scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
			scale.innerHTML = miles + ' 米';

		} else {
			feet = this._getRoundNum(maxFeet);

			scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
			scale.innerHTML = feet + ' 英尺';
		}
	},

	_getScaleWidth: function (ratio) {
		return Math.round(this.options.maxWidth * ratio) - 10;
	},

	_getRoundNum: function (num) {
		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
		    d = num / pow10;

		d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

		return pow10 * d;
	}
});

L.control.scale = function (options) {
	return new L.Control.Scale(options);
};


/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 */

L.Control.Layers = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		autoZIndex: true,
		visible:false
	},

	initialize: function (baseLayers, overlays, options) {
		L.setOptions(this, options);

		this._layers = {};
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (var i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (i in overlays) {
			this._addLayer(overlays[i], i, true);
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._initLayout();
		this._update();

		map
		    .on('layeradd', this._onLayerChange, this)
		    .on('layerremove', this._onLayerChange, this);

		if(this.options.visible){
			map._mapPane.style.display = 'none';
		}else {
			map._mapPane.style.display = 'block';
		}
		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerChange, this)
		    .off('layerremove', this._onLayerChange, this);
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		this._update();
		return this;
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		this._update();
		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);
		delete this._layers[id];
		this._update();
		return this;
	},

	getLayer: function(){
		var map = this._map;
		var layers = [];
		map.eachLayer(function(layer){
			var id = L.stamp(layer);
			if(!map._layers[id]){
				alert("Search Error!");
			} else {
				layers.push({
					layerId: id,
					layer: layer,
				});
			}
		});
		return layers;
	},

	_initLayout: function () {
		var className = 'leaflet-control-layers',
		    container = this._container = L.DomUtil.create('div', className);

		//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		if (!L.Browser.touch) {
			L.DomEvent
				.disableClickPropagation(container)
				.disableScrollPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			if (!L.Browser.android) {
				L.DomEvent
				    .on(container, 'mouseover', this._expand, this)
				    .on(container, 'mouseout', this._collapse, this);
			}
			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent
				    .on(link, 'click', L.DomEvent.stop)
				    .on(link, 'click', this._expand, this);
			}
			else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}
			//Work around for Firefox android issue https://github.com/Leaflet/Leaflet/issues/2033
			L.DomEvent.on(form, 'click', function () {
				setTimeout(L.bind(this._onInputClick, this), 0);
			}, this);

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_addLayer: function (layer, name, overlay) {
		var id = L.stamp(layer);

		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) {
			return;
		}

		this._baseLayersList.innerHTML = '';
		this._overlaysList.innerHTML = '';

		var baseLayersPresent = false,
		    overlaysPresent = false,
		    i, obj;

		for (i in this._layers) {
			obj = this._layers[i];
			this._addItem(obj);
			overlaysPresent = overlaysPresent || obj.overlay;
			baseLayersPresent = baseLayersPresent || !obj.overlay;
		}

		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
	},

	_onLayerChange: function (e) {
		var obj = this._layers[L.stamp(e.layer)];

		if (!obj) { return; }

		if (!this._handlingClick) {
			this._update();
		}

		var type = obj.overlay ?
			(e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :
			(e.type === 'layeradd' ? 'baselayerchange' : null);

		if (type) {
			this._map.fire(type, obj);
		}
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
		if (checked) {
			radioHtml += ' checked="checked"';
		}
		radioHtml += '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    input,
		    checked = this._map.hasLayer(obj.layer);

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}

		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		label.appendChild(input);
		label.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		return label;
	},

	_onInputClick: function () {
		var i, input, obj,
		    inputs = this._form.getElementsByTagName('input'),
		    inputsLen = inputs.length;

		this._handlingClick = true;

		for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			obj = this._layers[input.layerId];

			if (input.checked && !this._map.hasLayer(obj.layer)) {
				this._map.addLayer(obj.layer);

			} else if (!input.checked && this._map.hasLayer(obj.layer)) {
				this._map.removeLayer(obj.layer);
			}
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
	}
});

L.control.layers = function (baseLayers, overlays, options) {
	return new L.Control.Layers(baseLayers, overlays, options);
};


/*
 * L.PosAnimation is used by Leaflet internally for pan animations.
 */

L.PosAnimation = L.Class.extend({
	includes: L.Mixin.Events,

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._newPos = newPos;

		this.fire('start');

		el.style[L.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
		        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';

		L.DomEvent.on(el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
		L.DomUtil.setPosition(el, newPos);

		// toggle reflow, Chrome flickers for some reason if you don't do this
		L.Util.falseFn(el.offsetWidth);

		// there's no native way to track value updates of transitioned properties, so we imitate this
		this._stepTimer = setInterval(L.bind(this._onStep, this), 50);
	},

	stop: function () {
		if (!this._inProgress) { return; }

		// if we just removed the transition property, the element would jump to its final position,
		// so we need to make it stay at the current position

		L.DomUtil.setPosition(this._el, this._getPos());
		this._onTransitionEnd();
		L.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
	},

	_onStep: function () {
		var stepPos = this._getPos();
		if (!stepPos) {
			this._onTransitionEnd();
			return;
		}
		// jshint camelcase: false
		// make L.DomUtil.getPosition return intermediate position value during animation
		this._el._leaflet_pos = stepPos;

		this.fire('step');
	},

	// you can't easily get intermediate values of properties animated with CSS3 Transitions,
	// we need to parse computed style (in case of transform it returns matrix string)

	_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,

	_getPos: function () {
		var left, top, matches,
		    el = this._el,
		    style = window.getComputedStyle(el);

		if (L.Browser.any3d) {
			matches = style[L.DomUtil.TRANSFORM].match(this._transformRe);
			if (!matches) { return; }
			left = parseFloat(matches[1]);
			top  = parseFloat(matches[2]);
		} else {
			left = parseFloat(style.left);
			top  = parseFloat(style.top);
		}

		return new L.Point(left, top, true);
	},

	_onTransitionEnd: function () {
		L.DomEvent.off(this._el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);

		if (!this._inProgress) { return; }
		this._inProgress = false;

		this._el.style[L.DomUtil.TRANSITION] = '';

		// jshint camelcase: false
		// make sure L.DomUtil.getPosition returns the final position value after animation
		this._el._leaflet_pos = this._newPos;

		clearInterval(this._stepTimer);

		this.fire('step').fire('end');
	}

});


/*
 * Extends L.Map to handle panning animations.
 */

L.Map.include({

	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
		options = options || {};

		if (this._panAnim) {
			this._panAnim.stop();
		}

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = L.extend({animate: options.animate}, options.zoom);
				options.pan = L.extend({animate: options.animate}, options.pan);
			}

			// try animating pan or zoom
			var animated = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (animated) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, options) {
		offset = L.point(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset);
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	}
});


/*
 * L.PosAnimation fallback implementation that powers Leaflet pan animations
 * in browsers that don't support CSS3 Transitions.
 */

L.PosAnimation = L.DomUtil.TRANSITION ? L.PosAnimation : L.PosAnimation.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = L.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		this.fire('start');

		this._animate();
	},

	stop: function () {
		if (!this._inProgress) { return; }

		this._step();
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = L.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function () {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		L.DomUtil.setPosition(this._el, pos);

		this.fire('step');
	},

	_complete: function () {
		L.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});


/*
 * Extends L.Map to handle zoom animations.
 */

L.Map.mergeOptions({
	zoomAnimation: true,
	zoomAnimationThreshold: 4
});

if (L.DomUtil.TRANSITION) {

	L.Map.addInitHook(function () {
		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = this.options.zoomAnimation && L.DomUtil.TRANSITION &&
				L.Browser.any3d && !L.Browser.android23 && !L.Browser.mobileOpera;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {
			L.DomEvent.on(this._mapPane, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
		}
	});
}

L.Map.include(!L.DomUtil.TRANSITION ? {} : {

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale),
			origin = this._getCenterLayerPoint()._add(offset);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		this
		    .fire('movestart')
		    .fire('zoomstart');

		this._animateZoom(center, zoom, origin, scale, null, true);

		return true;
	},

	_animateZoom: function (center, zoom, origin, scale, delta, backwards, forTouchZoom) {

		if (!forTouchZoom) {
			this._animatingZoom = true;
		}

		// put transform transition on all layers with leaflet-zoom-animated class
		L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');

		// remember what center/zoom to set after animation
		this._animateToCenter = center;
		this._animateToZoom = zoom;

		// disable any dragging during animation
		if (L.Draggable) {
			L.Draggable._disabled = true;
		}

		L.Util.requestAnimFrame(function () {
			this.fire('zoomanim', {
				center: center,
				zoom: zoom,
				origin: origin,
				scale: scale,
				delta: delta,
				backwards: backwards
			});
			// horrible hack to work around a Chrome bug https://github.com/Leaflet/Leaflet/issues/3689
			setTimeout(L.bind(this._onZoomTransitionEnd, this), 250);
		}, this);
	},

	_onZoomTransitionEnd: function () {
		if (!this._animatingZoom) { return; }

		this._animatingZoom = false;

		L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');

		L.Util.requestAnimFrame(function () {
			this._resetView(this._animateToCenter, this._animateToZoom, true, true);

			if (L.Draggable) {
				L.Draggable._disabled = false;
			}
		}, this);
	}
});


/*
	Zoom animation logic for L.TileLayer.
*/

L.TileLayer.include({
	_animateZoom: function (e) {
		if (!this._animating) {
			this._animating = true;
			this._prepareBgBuffer();
		}

		var bg = this._bgBuffer,
		    transform = L.DomUtil.TRANSFORM,
		    initialTransform = e.delta ? L.DomUtil.getTranslateString(e.delta) : bg.style[transform],
		    scaleStr = L.DomUtil.getScaleString(e.scale, e.origin);

		bg.style[transform] = e.backwards ?
				scaleStr + ' ' + initialTransform :
				initialTransform + ' ' + scaleStr;
	},

	_endZoomAnim: function () {
		var front = this._tileContainer,
		    bg = this._bgBuffer;

		front.style.visibility = '';
		front.parentNode.appendChild(front); // Bring to fore

		// force reflow
		L.Util.falseFn(bg.offsetWidth);

		var zoom = this._map.getZoom();
		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			this._clearBgBuffer();
		}

		this._animating = false;
	},

	_clearBgBuffer: function () {
		var map = this._map;

		if (map && !map._animatingZoom && !map.touchZoom._zooming) {
			this._bgBuffer.innerHTML = '';
			this._bgBuffer.style[L.DomUtil.TRANSFORM] = '';
		}
	},

	_prepareBgBuffer: function () {

		var front = this._tileContainer,
		    bg = this._bgBuffer;

		// if foreground layer doesn't have many tiles but bg layer does,
		// keep the existing bg layer and just zoom it some more

		var bgLoaded = this._getLoadedTilesPercentage(bg),
		    frontLoaded = this._getLoadedTilesPercentage(front);

		if (bg && bgLoaded > 0.5 && frontLoaded < 0.5) {

			front.style.visibility = 'hidden';
			this._stopLoadingImages(front);
			return;
		}

		// prepare the buffer to become the front tile pane
		bg.style.visibility = 'hidden';
		bg.style[L.DomUtil.TRANSFORM] = '';

		// switch out the current layer to be the new bg layer (and vice-versa)
		this._tileContainer = bg;
		bg = this._bgBuffer = front;

		this._stopLoadingImages(bg);

		//prevent bg buffer from clearing right after zoom
		clearTimeout(this._clearBgBufferTimer);
	},

	_getLoadedTilesPercentage: function (container) {
		var tiles = container.getElementsByTagName('img'),
		    i, len, count = 0;

		for (i = 0, len = tiles.length; i < len; i++) {
			if (tiles[i].complete) {
				count++;
			}
		}
		return count / len;
	},

	// stops loading all tiles in the background layer
	_stopLoadingImages: function (container) {
		var tiles = Array.prototype.slice.call(container.getElementsByTagName('img')),
		    i, len, tile;

		for (i = 0, len = tiles.length; i < len; i++) {
			tile = tiles[i];

			if (!tile.complete) {
				tile.onload = L.Util.falseFn;
				tile.onerror = L.Util.falseFn;
				tile.src = L.Util.emptyImageUrl;

				tile.parentNode.removeChild(tile);
			}
		}
	}
});


/*
 * Provides L.Map with convenient shortcuts for using browser geolocation features.
 */

L.Map.include({
	_defaultLocateOptions: {
		watch: false,
		setView: false,
		maxZoom: Infinity,
		timeout: 10000,
		maximumAge: 0,
		enableHighAccuracy: false
	},

	locate: function (/*Object*/ options) {

		options = this._locateOptions = L.extend(this._defaultLocateOptions, options);

		if (!navigator.geolocation) {
			this._handleGeolocationError({
				code: 0,
				message: 'Geolocation not supported.'
			});
			return this;
		}

		var onResponse = L.bind(this._handleGeolocationResponse, this),
			onError = L.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	stopLocate: function () {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		if (this._locateOptions) {
			this._locateOptions.setView = false;
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? 'permission denied' :
		            (c === 2 ? 'position unavailable' : 'timeout'));

		if (this._locateOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		this.fire('locationerror', {
			code: c,
			message: 'Geolocation error: ' + message + '.'
		});
	},

	_handleGeolocationResponse: function (pos) {
		var lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new L.LatLng(lat, lng),

		    latAccuracy = 180 * pos.coords.accuracy / 40075017,
		    lngAccuracy = latAccuracy / Math.cos(L.LatLng.DEG_TO_RAD * lat),

		    bounds = L.latLngBounds(
		            [lat - latAccuracy, lng - lngAccuracy],
		            [lat + latAccuracy, lng + lngAccuracy]),

		    options = this._locateOptions;

		if (options.setView) {
			var zoom = Math.min(this.getBoundsZoom(bounds), options.maxZoom);
			this.setView(latlng, zoom);
		}

		var data = {
			latlng: latlng,
			bounds: bounds,
			timestamp: pos.timestamp
		};

		for (var i in pos.coords) {
			if (typeof pos.coords[i] === 'number') {
				data[i] = pos.coords[i];
			}
		}

		this.fire('locationfound', data);
	}
});
}(window, document));

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * 创建人：易剑
 * 创建时间：2017/3/3
 * 功能描述：wms图层加载
 */

L.ImageOverlay.WMS = L.ImageOverlay.extend({

    defaultWmsParams: {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.1',
        layers: '',
        styles: '',
        format: 'image/png',
        transparent: false,
        tiled: false
    },

    initialize: function (url, options) {
        this._baseUrl = url;

        var wmsParams = L.Util.extend({}, this.defaultWmsParams);

        if (options.detectRetina && L.Browser.retina) {
            wmsParams.width = wmsParams.height = this.options.tileSize * 2;
        } else {
            wmsParams.width = wmsParams.height = this.options.tileSize;
        }

        for (var i in options) {
            // all keys that are not ImageOverlay options go to WMS params
            if (!this.options.hasOwnProperty(i)) {
                wmsParams[i] = options[i];
            }
        }

        this.wmsParams = wmsParams;

        L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
        this._bounds = map.getBounds();
        this._map = map;

        var projectionKey = parseFloat(this.wmsParams.version) >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = map.options.crs.code;

        map.on("moveend", this._reset, this);

        L.ImageOverlay.prototype.onAdd.call(this, map);
    },

    _updateUrl: function () {
        var map = this._map,
            bounds = this._bounds,
            zoom = map.getZoom(),
            crs = map.options.crs,

            topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
            mapSize = map.latLngToLayerPoint(bounds.getSouthEast()).subtract(topLeft),

            nw = crs.project(bounds.getNorthWest()),
            se = crs.project(bounds.getSouthEast());
        var isCrs3857 = false;
        if (crs != undefined && crs.code != undefined && crs.code === "EPSG:3857") {
            isCrs3857 = true;
        }
        var bbox = parseFloat(this.wmsParams.version) >= 1.3 && !isCrs3857 ? [se.y, nw.x, nw.y, se.x] : [nw.x, se.y, se.x, nw.y];

        // bbox = [nw.x, se.y, se.x, nw.y].join(','),

        var urlParams = { width: mapSize.x, height: mapSize.y, bbox: bbox };

        for (var i in this.wmsParams) {
            if (!this.options.hasOwnProperty(i)) {
                if (i === 'layers') {
                    if (this.wmsParams[i] === '') {
                        delete this.wmsParams[i];
                    }
                }
            }
        }
        var url = this._baseUrl + L.Util.getParamString(L.Util.extend({}, this.wmsParams, urlParams));

        this._url = url;
    },

    _updateImagePosition: function () {
        // The original reset function really just sets the position and size, so rename it for clarity.
        L.ImageOverlay.prototype._reset.call(this);
    },

    refresh: function () {
        this._bounds = this._map.getBounds();

        this._updateUrl();
        L.Util.extend(this._image, {
            src: this._url + "&rlt=" + Math.random()
        });
    },

    _reset: function () {
        this._bounds = this._map.getBounds();

        this._updateUrl();
        L.Util.extend(this._image, {
            src: this._url
        });
    },

    _onImageLoad: function () {
        this.fire('load');

        // Only update the image position after the image has loaded.
        // This the old image from visibly shifting before the new image loads.
        this._updateImagePosition();
    },

    fitBounds: function () {
        var getGetCapabilities = this._baseUrl + "?service=wms&version=1.3.0&request=GetCapabilities";
        L.ajax({ url: getGetCapabilities, success: this._callback.bind(this), fail: this._errback.bind(this), type: "GET" });
    },

    _callback: function (data) {
        var xml = new L.X2JS();
        var jsonObj = xml.xml_str2json(data);
        var layers = jsonObj.WMS_Capabilities.Capability.Layer.Layer;
        layers.forEach(function (layer) {
            if (layer.Name == this.options.layers) {
                layer.BoundingBox.forEach(function (box) {
                    if (box._CRS == "CRS:84") {
                        this._map.fitBounds([
                            [box._miny, box._minx],
                            [box._maxy, box._maxx]
                        ]);
                        return;
                    }
                }, this);
            }
        }, this);
    },

    _errback: function (err) {
        return null;
    }
});

L.imageOverlay.wms = function (url, options) {
    return new L.ImageOverlay.WMS(url, options);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: X2JS
 * @prject:
 * @description: XML与JSON的互转
 * @author: yijian
 * @date: 2017/8/8
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */

L.X2JS=  L.Class.extend({
	initialize : function(options){
		this.options = options || {};
		this.DOMNodeTypes = {
			ELEMENT_NODE : 1,
			TEXT_NODE : 3,
			CDATA_SECTION_NODE : 4,
			COMMENT_NODE : 8,
			DOCUMENT_NODE : 9
		};
		this._initConfigDefaults();
		this._initRequiredPolyfills();
	},

	_initConfigDefaults : function(){
		if(this.options.escapeMode === undefined){
			this.options.escapeMode = true;
		}

		this.options.attributePrefix = this.options.attributePrefix || "_";
		this.options.arrayAccessForm = this.options.arrayAccessForm || "none";
		this.options.emptyNodeForm = this.options.emptyNodeForm || "text";

		if(this.options.enableToStringFunc === undefined){
			this.options.enableToStringFunc = true;
		}
		this.options.arrayAccessFormPaths = this.options.arrayAccessFormPaths || [];
		if(this.options.skipEmptyTextNodesForObj === undefined){
			this.options.skipEmptyTextNodesForObj = true;
		}
		if(this.options.stripWhitespaces === undefined){
			this.options.stripWhitespaces = true;
		}
		this.options.datetimeAccessFormPaths = this.options.datetimeAccessFormPaths || [];

		if(this.options.useDoubleQuotes === undefined){
			this.options.useDoubleQuotes = false;
		}

		this.options.xmlElementsFilter = this.options.xmlElementsFilter || [];
		this.options.jsonPropertiesFilter = this.options.jsonPropertiesFilter || [];

		if(this.options.keepCData === undefined){
			this.options.keepCData = false;
		}
	},

	_initRequiredPolyfills : function(){

	},

	getNodeLocalName : function(node){
		var nodeLocalName = node.localName;
		if(nodeLocalName == null) // Yeah, this is IE!!
			nodeLocalName = node.baseName;
		if(nodeLocalName == null || nodeLocalName == "") // =="" is IE too
			nodeLocalName = node.nodeName;
		return nodeLocalName;
	},

	getNodePrefix : function(node){
		return node.prefix;
	},

	escapeXmlChars : function(str){
		if(typeof(str) == "string")
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
		else
			return str;
	},

	unescapeXmlChars : function(str){
		return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
	},

	checkInStdFiltersArrayForm : function(stdFiltersArrayForm, obj, name, path){
		var idx = 0;
		for(; idx < stdFiltersArrayForm.length; idx++){
			var filterPath = stdFiltersArrayForm[idx];
			if(typeof filterPath === "string"){
				if(filterPath == path)
					break;
			}
			else if(filterPath instanceof RegExp){
				if(filterPath.test(path))
					break;
			}
			else if(typeof filterPath === "function"){
				if(filterPath(obj, name, path))
					break;
			}
		}
		return idx != stdFiltersArrayForm.length;
	},

	toArrayAccessForm : function(obj, childName, path){
		switch(this.options.arrayAccessForm){
			case "property":
				if(!(obj[childName] instanceof Array))
					obj[childName + "_this.asArray"] = [obj[childName]];
				else
					obj[childName + "_this.asArray"] = obj[childName];
				break;
			/*case "none":
			 break;*/
		}

		if(!(obj[childName] instanceof Array) && this.options.arrayAccessFormPaths.length > 0){
			if(this.checkInStdFiltersArrayForm(this.options.arrayAccessFormPaths, obj, childName, path)){
				obj[childName] = [obj[childName]];
			}
		}
	},

	fromXmlDateTime : function(prop){
		// Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
		// Improved to support full spec and optional parts
		var bits = prop.split(/[-T:+Z]/g);

		var d = new Date(bits[0], bits[1] - 1, bits[2]);
		var secondBits = bits[5].split("\.");
		d.setHours(bits[3], bits[4], secondBits[0]);
		if(secondBits.length > 1)
			d.setMilliseconds(secondBits[1]);

		// Get supplied time zone offset in minutes
		if(bits[6] && bits[7]){
			var offsetMinutes = bits[6] * 60 + Number(bits[7]);
			var sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+';

			// Apply the sign
			offsetMinutes = 0 + (sign == '-' ? -1 * offsetMinutes : offsetMinutes);

			// Apply offset and local timezone
			d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
		}
		else if(prop.indexOf("Z", prop.length - 1) !== -1){
			d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
		}

		// d is now a local time equivalent to the supplied time
		return d;
	},

	checkFromXmlDateTimePaths : function(value, childName, fullPath){
		if(this.options.datetimeAccessFormPaths.length > 0){
			var path = fullPath.split("\.#")[0];
			if(this.checkInStdFiltersArrayForm(this.options.datetimeAccessFormPaths, value, childName, path)){
				return this.fromXmlDateTime(value);
			}
			else
				return value;
		}
		else
			return value;
	},

	checkXmlElementsFilter : function(obj, childType, childName, childPath){
		if(childType == this.DOMNodeTypes.ELEMENT_NODE && this.options.xmlElementsFilter.length > 0){
			return this.checkInStdFiltersArrayForm(this.options.xmlElementsFilter, obj, childName, childPath);
		}
		else
			return true;
	},

	parseDOMChildren : function(node, path){
		if(node.nodeType == this.DOMNodeTypes.DOCUMENT_NODE){
			var result = new Object;
			var nodeChildren = node.childNodes;
			// Alternative for firstElementChild which is not supported in some environments
			for(var cidx = 0; cidx < nodeChildren.length; cidx++){
				var child = nodeChildren.item(cidx);
				if(child.nodeType == this.DOMNodeTypes.ELEMENT_NODE){
					var childName = this.getNodeLocalName(child);
					result[childName] = this.parseDOMChildren(child, childName);
				}
			}
			return result;
		}
		else if(node.nodeType == this.DOMNodeTypes.ELEMENT_NODE){
			var result = new Object;
			result.__cnt = 0;

			var nodeChildren = node.childNodes;

			// Children nodes
			for(var cidx = 0; cidx < nodeChildren.length; cidx++){
				var child = nodeChildren.item(cidx); // nodeChildren[cidx];
				var childName = this.getNodeLocalName(child);

				if(child.nodeType != this.DOMNodeTypes.COMMENT_NODE){
					var childPath = path + "." + childName;
					if(this.checkXmlElementsFilter(result, child.nodeType, childName, childPath)){
						result.__cnt++;
						if(result[childName] == null){
							result[childName] = this.parseDOMChildren(child, childPath);
							this.toArrayAccessForm(result, childName, childPath);
						}
						else {
							if(result[childName] != null){
								if(!(result[childName] instanceof Array)){
									result[childName] = [result[childName]];
									this.toArrayAccessForm(result, childName, childPath);
								}
							}
							(result[childName])[result[childName].length] = this.parseDOMChildren(child, childPath);
						}
					}
				}
			}

			// Attributes
			for(var aidx = 0; aidx < node.attributes.length; aidx++){
				var attr = node.attributes.item(aidx); // [aidx];
				result.__cnt++;
				result[this.options.attributePrefix + attr.name] = attr.value;
			}

			// Node namespace prefix
			var nodePrefix = this.getNodePrefix(node);
			if(nodePrefix != null && nodePrefix != ""){
				result.__cnt++;
				result.__prefix = nodePrefix;
			}

			if(result["#text"] != null){
				result.__text = result["#text"];
				if(result.__text instanceof Array){
					result.__text = result.__text.join("\n");
				}
				//if(this.options.escapeMode)
				//	result.__text = unthis.escapeXmlChars(result.__text);
				if(this.options.stripWhitespaces)
					result.__text = result.__text.trim();
				delete result["#text"];
				if(this.options.arrayAccessForm == "property")
					delete result["#text_this.asArray"];
				result.__text = this.checkFromXmlDateTimePaths(result.__text, childName, path + "." + childName);
			}
			if(result["#cdata-section"] != null){
				result.__cdata = result["#cdata-section"];
				delete result["#cdata-section"];
				if(this.options.arrayAccessForm == "property")
					delete result["#cdata-section_this.asArray"];
			}

			if(result.__cnt == 0 && this.options.emptyNodeForm == "text"){
				result = '';
			}
			else if(result.__cnt == 1 && result.__text != null){
				result = result.__text;
			}
			else if(result.__cnt == 1 && result.__cdata != null && !this.options.keepCData){
				result = result.__cdata;
			}
			else if(result.__cnt > 1 && result.__text != null && this.options.skipEmptyTextNodesForObj){
				if((this.options.stripWhitespaces && result.__text == "") || (result.__text.trim() == "")){
					delete result.__text;
				}
			}
			delete result.__cnt;

			if(this.options.enableToStringFunc && (result.__text != null || result.__cdata != null )){
				result.toString = function(){
					return (this.__text != null ? this.__text : '') + ( this.__cdata != null ? this.__cdata : '');
				};
			}

			return result;
		}
		else if(node.nodeType == this.DOMNodeTypes.TEXT_NODE || node.nodeType == this.DOMNodeTypes.CDATA_SECTION_NODE){
			return node.nodeValue;
		}
	},

	startTag : function(jsonObj, element, attrList, closed){
		var resultStr = "<" + ( (jsonObj != null && jsonObj.__prefix != null) ? (jsonObj.__prefix + ":") : "") + element;
		if(attrList != null){
			for(var aidx = 0; aidx < attrList.length; aidx++){
				var attrName = attrList[aidx];
				var attrVal = jsonObj[attrName];
				if(this.options.escapeMode)
					attrVal = this.escapeXmlChars(attrVal);
				resultStr += " " + attrName.substr(this.options.attributePrefix.length) + "=";
				if(this.options.useDoubleQuotes)
					resultStr += '"' + attrVal + '"';
				else
					resultStr += "'" + attrVal + "'";
			}
		}
		if(!closed)
			resultStr += ">";
		else
			resultStr += "/>";
		return resultStr;
	},

	endTag : function(jsonObj, elementName){
		return "</" + (jsonObj.__prefix != null ? (jsonObj.__prefix + ":") : "") + elementName + ">";
	},

	endsWith : function(str, suffix){
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	},

	jsonXmlSpecialElem : function(jsonObj, jsonObjField){
		if((this.options.arrayAccessForm == "property" && this.endsWith(jsonObjField.toString(), ("_this.asArray")))
			|| jsonObjField.toString().indexOf(this.options.attributePrefix) == 0
			|| jsonObjField.toString().indexOf("__") == 0
			|| (jsonObj[jsonObjField] instanceof Function))
			return true;
		else
			return false;
	},

	jsonXmlElemCount : function(jsonObj){
		var elementsCnt = 0;
		if(jsonObj instanceof Object){
			for(var it in jsonObj){
				if(this.jsonXmlSpecialElem(jsonObj, it))
					continue;
				elementsCnt++;
			}
		}
		return elementsCnt;
	},

	checkJsonObjPropertiesFilter : function(jsonObj, propertyName, jsonObjPath){
		return this.options.jsonPropertiesFilter.length == 0
			|| jsonObjPath == ""
			|| this.checkInStdFiltersArrayForm(this.options.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);
	},

	parseJSONAttributes : function(jsonObj){
		var attrList = [];
		if(jsonObj instanceof Object){
			for(var ait in jsonObj){
				if(ait.toString().indexOf("__") == -1 && ait.toString().indexOf(this.options.attributePrefix) == 0){
					attrList.push(ait);
				}
			}
		}
		return attrList;
	},

	parseJSONTextAttrs : function(jsonTxtObj){
		var result = "";

		if(jsonTxtObj.__cdata != null){
			result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
		}

		if(jsonTxtObj.__text != null){
			if(this.options.escapeMode)
				result += this.escapeXmlChars(jsonTxtObj.__text);
			else
				result += jsonTxtObj.__text;
		}
		return result;
	},

	parseJSONTextObject : function(jsonTxtObj){
		var result = "";

		if(jsonTxtObj instanceof Object){
			result += this.parseJSONTextAttrs(jsonTxtObj);
		}
		else if(jsonTxtObj != null){
			if(this.options.escapeMode)
				result += this.escapeXmlChars(jsonTxtObj);
			else
				result += jsonTxtObj;
		}

		return result;
	},

	getJsonPropertyPath : function(jsonObjPath, jsonPropName){
		if(jsonObjPath === ""){
			return jsonPropName;
		}
		else
			return jsonObjPath + "." + jsonPropName;
	},

	parseJSONArray : function(jsonArrRoot, jsonArrObj, attrList, jsonObjPath){
		var result = "";
		if(jsonArrRoot.length == 0){
			result += this.startTag(jsonArrRoot, jsonArrObj, attrList, true);
		}
		else {
			for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++){
				result += this.startTag(jsonArrRoot[arIdx], jsonArrObj, this.parseJSONAttributes(jsonArrRoot[arIdx]), false);
				result += this.parseJSONObject(jsonArrRoot[arIdx], this.getJsonPropertyPath(jsonObjPath, jsonArrObj));
				result += this.endTag(jsonArrRoot[arIdx], jsonArrObj);
			}
		}
		return result;
	},

	parseJSONObject : function(jsonObj, jsonObjPath){
		var result = "";

		var elementsCnt = this.jsonXmlElemCount(jsonObj);

		if(elementsCnt > 0){
			for(var it in jsonObj){

				if(this.jsonXmlSpecialElem(jsonObj, it) || (jsonObjPath != "" && !this.checkJsonObjPropertiesFilter(jsonObj, it, this.getJsonPropertyPath(jsonObjPath, it))))
					continue;

				var subObj = jsonObj[it];

				var attrList = this.parseJSONAttributes(subObj)

				if(subObj == null || subObj == undefined){
					result += this.startTag(subObj, it, attrList, true);
				}
				else if(subObj instanceof Object){

					if(subObj instanceof Array){
						result += this.parseJSONArray(subObj, it, attrList, jsonObjPath);
					}
					else if(subObj instanceof Date){
						result += this.startTag(subObj, it, attrList, false);
						result += subObj.toISOString();
						result += this.endTag(subObj, it);
					}
					else {
						var subObjElementsCnt = this.jsonXmlElemCount(subObj);
						if(subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null){
							result += this.startTag(subObj, it, attrList, false);
							result += this.parseJSONObject(subObj, this.getJsonPropertyPath(jsonObjPath, it));
							result += this.endTag(subObj, it);
						}
						else {
							result += this.startTag(subObj, it, attrList, true);
						}
					}
				}
				else {
					result += this.startTag(subObj, it, attrList, false);
					result += this.parseJSONTextObject(subObj);
					result += this.endTag(subObj, it);
				}
			}
		}
		result += this.parseJSONTextObject(jsonObj);

		return result;
	},

	parseXmlString : function(xmlDocStr){
		var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
		if(xmlDocStr === undefined){
			return null;
		}
		var xmlDoc;
		if(window.DOMParser){
			var parser = new window.DOMParser();
			var parsererrorNS = null;
			// IE9+ now is here
			if(!isIEParser){
				try{
					parsererrorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
				}
				catch (err) {
					parsererrorNS = null;
				}
			}
			try{
				xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
				if(parsererrorNS != null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0){
					//throw new Error('Error parsing XML: '+xmlDocStr);
					xmlDoc = null;
				}
			}
			catch (err) {
				xmlDoc = null;
			}
		}
		else {
			// IE :(
			if(xmlDocStr.indexOf("<?") == 0){
				xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
			}
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(xmlDocStr);
		}
		return xmlDoc;
	},

	asArray : function(prop){
		if(prop === undefined || prop == null)
			return [];
		else if(prop instanceof Array)
			return prop;
		else
			return [prop];
	},

	toXmlDateTime : function(dt){
		if(dt instanceof Date)
			return dt.toISOString();
		else if(typeof(dt) === 'number')
			return new Date(dt).toISOString();
		else
			return null;
	},

	asDateTime : function(prop){
		if(typeof(prop) == "string"){
			return this.fromXmlDateTime(prop);
		}
		else
			return prop;
	},

	xml2json : function(xmlDoc){
		return this.parseDOMChildren(xmlDoc);
	},

	xml_str2json : function(xmlDocStr){
		var xmlDoc = this.parseXmlString(xmlDocStr);
		if(xmlDoc != null)
			return this.xml2json(xmlDoc);
		else
			return null;
	},

	json2xml_str : function(jsonObj){
		return this.parseJSONObject(jsonObj, "");
	},

	json2xml : function(jsonObj){
		var xmlDocStr = this.json2xml_str(jsonObj);
		return this.parseXmlString(xmlDocStr);
	}

});


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: ajaxLeaflet
 * @prject:
 * @description: 说明文件的功能--请后续修改
 * @author: huangge
 * @date: 2017/8/15
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
	/**
	 * 扩展Ajax请求
	 */
	L.Ajax=L.Class.extend({
		includes: L.Mixin.Events,
		initialize : function(options){
			/* 传入方式默认为对象 */
			options = options || {};
			options.type = (options.type || "GET").toUpperCase();
			options.dataType = options.dataType || 'json';
			options.async = options.async != undefined ? options.async : true;
			options.proxy = options.proxy != undefined ? options.proxy : null;
			var params = this._getParams(options.data);
			var xhr;
			/* 创建一个 ajax请求* W3C标准和IE标准*/
			if(window.XMLHttpRequest){
				/* W3C标准*/
				xhr = new XMLHttpRequest();
			} else {
				/* IE标准@type {ActiveXObject}*/
				xhr = new ActiveXObject('Microsoft.XMLHTTP')
			}
			//请求前回调
			xhr.onloadstart = function(){
				options.loadstart && options.loadstart();
			};
			//请求完成后回调
			xhr.onloadend = function(){
				options.loadend && options.loadend();
			};
			/*调用xhr的onreadystatechange函数执行回调函数*/
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					var status = xhr.status;
					var readyState=xhr.readyState;
					if(status >= 200 && status < 300){
						options.success && options.success(xhr.responseText, xhr.responseXML);
					} else {
						options.fail && options.fail({status:status,readyState:readyState});
					}
				}
        };
        var _url = options.url;
        if (options.proxy) {
            _url = options.proxy + "?url=" + options.url;
        }
        if (options.type == 'GET') {
            xhr.open("GET", _url, options.async);
            xhr.send(null)
        } else if (options.type == 'POST') {
            /*打开请求*/
            xhr.open('POST', _url, options.async);
            /*POST请求设置请求头*/
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            /* 发送请求参数*/
            xhr.send(params);
        }
			
		},
		/*    处理json为字符串，用&隔开*/
		_getParams : function(data){
			var arr = [];
			for(var param in data){
				arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
			}
			;
			return arr.join('&');
		}
	});

	L.ajax=function(options){
		return new L.Ajax(options);
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: leaflet-compass
 * @prject:
 * @description: 指北针
 * @author: yijian
 * @date: 2017/8/10
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
__webpack_require__(1);
L.Control.Compass = L.Control.extend({
	options : {
		position : 'bottomright'
	},

	// layer is the map layer to be shown in the minimap
	initialize : function(layer, options){
		L.Util.setOptions(this, options);
	},

	onAdd : function(map){
		this._map = map;
		this._container = L.DomUtil.create('div', 'leaflet-control-compass');
		return this._container;
	}
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Created by yijian on 2017/7/20.
 * 鼠标消息提示（跟随鼠标在地图上运动）
 */

L.Tooltip = L.Class.extend({
    initialize: function (map) {
        this._map = map;
        this._drawControlTooltips = true;
        this._popupPane = map._panes.popupPane;
        this._visible = false;
        this._container = this._drawControlTooltips ?
            L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null;
        this._map.on('mouseout', this._onMouseOut, this);
        map.on('mousemove', this._onMouseMove, this);
    },
    includes: L.Mixin.Events,
    _onMouseMove: function (e) {
        var pos = this._map.latLngToLayerPoint(e.latlng),
            tooltipContainer = this._container;
        if (this._container) {
            if (this._visible) {
                tooltipContainer.style.visibility = 'inherit';
            }
            L.DomUtil.setPosition(tooltipContainer, pos);
        }
    },
    close: function () {
        this._map.off('mouseout', this._onMouseOut, this);
        this._map.off('mousemove', this._onMouseMove, this);
        if (this._container) {
            this._popupPane.removeChild(this._container);
            this._container = null;
        }
    },
    setText: function (labelText) {
        //控制隐藏和显示,填充文字
        this._container.innerHTML = '<span>' + labelText + '</span>';

        this._visible = true;
        this._container.style.visibility = 'inherit';

        return this;
    },
    _onMouseOut: function () {
        if (this._container) {
            this._container.style.visibility = 'hidden';
        }
    }
});

L.Map.include({
     openToolTip:function(text){
         if (!map._tooltip) {
             map._tooltip = new L.Tooltip(map);
         }
         map._tooltip.setText(text);
     },
     closeToolTip:function(){
         if(map._tooltip){
             map._tooltip.close();
             map._tooltip=null;
         }
     },
     setToolTipText:function(text){
         if (!map._tooltip) {
             map._tooltip = new L.Tooltip(map);
         }
         map._tooltip.setText(text);
     }
});


/***/ }),
/* 20 */
/***/ (function(module, exports) {



    L.Control.MiniMap = L.Control.extend({
		options: {
			position: 'bottomright',
			toggleDisplay: false,
			zoomLevelOffset: -5,
			zoomLevelFixed: false,
			centerFixed: false,
			zoomAnimation: false,
			autoToggleDisplay: false,
			minimized: false,
			width: 150,
			height: 100,
			collapsedWidth: 19,
			collapsedHeight: 19,
			aimingRectOptions: {color: '#ff7800', weight: 1, clickable: false},
			shadowRectOptions: {color: '#000000', weight: 1, clickable: false, opacity: 0, fillOpacity: 0},
			strings: {hideText: '隐藏小地图', showText: '打开小地图'},
			mapOptions: {}  // Allows definition / override of Leaflet map options.
		},

		// layer is the map layer to be shown in the minimap
		initialize: function (layer, options) {
			L.Util.setOptions(this, options);
			// Make sure the aiming rects are non-clickable even if the user tries to set them clickable (most likely by forgetting to specify them false)
			this.options.aimingRectOptions.clickable = false;
			this.options.shadowRectOptions.clickable = false;
			this._layer = layer;
		},
	    includes: L.Mixin.Events,
		onAdd: function (map) {

			this._mainMap = map;

			// Creating the container and stopping events from spilling through to the main map.
			this._container = L.DomUtil.create('div', 'leaflet-control-minimap');
			this._container.style.width = this.options.width + 'px';
			this._container.style.height = this.options.height + 'px';
			L.DomEvent.disableClickPropagation(this._container);
			L.DomEvent.on(this._container, 'mousewheel', L.DomEvent.stopPropagation);

			var mapOptions = {
				attributionControl: false,
				dragging: !this.options.centerFixed,
				zoomControl: false,
				zoomAnimation: this.options.zoomAnimation,
				autoToggleDisplay: this.options.autoToggleDisplay,
				touchZoom: this.options.centerFixed ? 'center' : !this._isZoomLevelFixed(),
				scrollWheelZoom: this.options.centerFixed ? 'center' : !this._isZoomLevelFixed(),
				doubleClickZoom: this.options.centerFixed ? 'center' : !this._isZoomLevelFixed(),
				boxZoom: !this._isZoomLevelFixed(),
				crs: map.options.crs
			};
			mapOptions = L.Util.extend(this.options.mapOptions, mapOptions);  // merge with priority of the local mapOptions object.

			this._miniMap = new L.Map(this._container, mapOptions);

			this._miniMap.addLayer(this._layer);

			// These bools are used to prevent infinite loops of the two maps notifying each other that they've moved.
			this._mainMapMoving = false;
			this._miniMapMoving = false;

			// Keep a record of this to prevent auto toggling when the user explicitly doesn't want it.
			this._userToggledDisplay = false;
			this._minimized = false;

			if (this.options.toggleDisplay) {
				this._addToggleButton();
			}

			this._miniMap.whenReady(L.Util.bind(function () {
				this._aimingRect = L.rectangle(this._mainMap.getBounds(), this.options.aimingRectOptions).addTo(this._miniMap);
				this._shadowRect = L.rectangle(this._mainMap.getBounds(), this.options.shadowRectOptions).addTo(this._miniMap);
				this._mainMap.on('moveend', this._onMainMapMoved, this);
				this._mainMap.on('move', this._onMainMapMoving, this);
				this._miniMap.on('movestart', this._onMiniMapMoveStarted, this);
				this._miniMap.on('move', this._onMiniMapMoving, this);
				this._miniMap.on('moveend', this._onMiniMapMoved, this);
			}, this));

			return this._container;
		},

		addTo: function (map) {
			L.Control.prototype.addTo.call(this, map);

			var center = this.options.centerFixed || this._mainMap.getCenter();
			this._miniMap.setView(center, this._decideZoom(true));
			this._setDisplay(this.options.minimized);
			return this;
		},

		onRemove: function (map) {
			this._mainMap.off('moveend', this._onMainMapMoved, this);
			this._mainMap.off('move', this._onMainMapMoving, this);
			this._miniMap.off('moveend', this._onMiniMapMoved, this);

			this._miniMap.removeLayer(this._layer);
		},

		changeLayer: function (layer) {
			this._miniMap.removeLayer(this._layer);
			this._layer = layer;
			this._miniMap.addLayer(this._layer);
		},

		_addToggleButton: function () {
			this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton(
				'', this._toggleButtonInitialTitleText(), ('leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-' +
				this.options.position), this._container, this._toggleDisplayButtonClicked, this) : undefined;

			this._toggleDisplayButton.style.width = this.options.collapsedWidth + 'px';
			this._toggleDisplayButton.style.height = this.options.collapsedHeight + 'px';
		},

		_toggleButtonInitialTitleText: function () {
			if (this.options.minimized) {
				return this.options.strings.showText;
			} else {
				return this.options.strings.hideText;
			}
		},

		_createButton: function (html, title, className, container, fn, context) {
			var link = L.DomUtil.create('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;

			var stop = L.DomEvent.stopPropagation;

			L.DomEvent
				.on(link, 'click', stop)
				.on(link, 'mousedown', stop)
				.on(link, 'dblclick', stop)
				.on(link, 'click', L.DomEvent.preventDefault)
				.on(link, 'click', fn, context);

			return link;
		},

		_toggleDisplayButtonClicked: function () {
			this._userToggledDisplay = true;
			if (!this._minimized) {
				this._minimize();
			} else {
				this._restore();
			}
		},

		_setDisplay: function (minimize) {
			if (minimize !== this._minimized) {
				if (!this._minimized) {
					this._minimize();
				} else {
					this._restore();
				}
			}
		},

		_minimize: function () {
			// hide the minimap
			if (this.options.toggleDisplay) {
				this._container.style.width = this.options.collapsedWidth + 'px';
				this._container.style.height = this.options.collapsedHeight + 'px';
				this._toggleDisplayButton.className += (' minimized-' + this.options.position);
				this._toggleDisplayButton.title = this.options.strings.showText;
			} else {
				this._container.style.display = 'none';
			}
			this._minimized = true;
		},

		_restore: function () {
			if (this.options.toggleDisplay) {
				this._container.style.width = this.options.width + 'px';
				this._container.style.height = this.options.height + 'px';
				this._toggleDisplayButton.className = this._toggleDisplayButton.className
					.replace('minimized-'	+ this.options.position, '');
				this._toggleDisplayButton.title = this.options.strings.hideText;
			} else {
				this._container.style.display = 'block';
			}
			this._minimized = false;
		},

		_onMainMapMoved: function (e) {
			if (!this._miniMapMoving) {
				var center = this.options.centerFixed || this._mainMap.getCenter();

				this._mainMapMoving = true;
				this._miniMap.setView(center, this._decideZoom(true));
				this._setDisplay(this._decideMinimized());
			} else {
				this._miniMapMoving = false;
			}
			this._aimingRect.setBounds(this._mainMap.getBounds());
		},

		_onMainMapMoving: function (e) {
			this._aimingRect.setBounds(this._mainMap.getBounds());
		},

		_onMiniMapMoveStarted: function (e) {
			if (!this.options.centerFixed) {
				var lastAimingRect = this._aimingRect.getBounds();
				var sw = this._miniMap.latLngToContainerPoint(lastAimingRect.getSouthWest());
				var ne = this._miniMap.latLngToContainerPoint(lastAimingRect.getNorthEast());
				this._lastAimingRectPosition = {sw: sw, ne: ne};
			}
		},

		_onMiniMapMoving: function (e) {
			if (!this.options.centerFixed) {
				if (!this._mainMapMoving && this._lastAimingRectPosition) {
					this._shadowRect.setBounds(new L.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne)));
					this._shadowRect.setStyle({opacity: 1, fillOpacity: 0.3});
				}
			}
		},

		_onMiniMapMoved: function (e) {
			if (!this._mainMapMoving) {
				this._miniMapMoving = true;
				this._mainMap.setView(this._miniMap.getCenter(), this._decideZoom(false));
				this._shadowRect.setStyle({opacity: 0, fillOpacity: 0});
			} else {
				this._mainMapMoving = false;
			}
		},

		_isZoomLevelFixed: function () {
			var zoomLevelFixed = this.options.zoomLevelFixed;
			return this._isDefined(zoomLevelFixed) && this._isInteger(zoomLevelFixed);
		},

		_decideZoom: function (fromMaintoMini) {
			if (!this._isZoomLevelFixed()) {
				if (fromMaintoMini) {
					return this._mainMap.getZoom() + this.options.zoomLevelOffset;
				} else {
					var currentDiff = this._miniMap.getZoom() - this._mainMap.getZoom();
					var proposedZoom = this._miniMap.getZoom() - this.options.zoomLevelOffset;
					var toRet;

					if (currentDiff > this.options.zoomLevelOffset && this._mainMap.getZoom() < this._miniMap.getMinZoom() - this.options.zoomLevelOffset) {
						// This means the miniMap is zoomed out to the minimum zoom level and can't zoom any more.
						if (this._miniMap.getZoom() > this._lastMiniMapZoom) {
							// This means the user is trying to zoom in by using the minimap, zoom the main map.
							toRet = this._mainMap.getZoom() + 1;
							// Also we cheat and zoom the minimap out again to keep it visually consistent.
							this._miniMap.setZoom(this._miniMap.getZoom() - 1);
						} else {
							// Either the user is trying to zoom out past the mini map's min zoom or has just panned using it, we can't tell the difference.
							// Therefore, we ignore it!
							toRet = this._mainMap.getZoom();
						}
					} else {
						// This is what happens in the majority of cases, and always if you configure the min levels + offset in a sane fashion.
						toRet = proposedZoom;
					}
					this._lastMiniMapZoom = this._miniMap.getZoom();
					return toRet;
				}
			} else {
				if (fromMaintoMini) {
					return this.options.zoomLevelFixed;
				} else {
					return this._mainMap.getZoom();
				}
			}
		},

		_decideMinimized: function () {
			if (this._userToggledDisplay) {
				return this._minimized;
			}

			if (this.options.autoToggleDisplay) {
				if (this._mainMap.getBounds().contains(this._miniMap.getBounds())) {
					return true;
				}
				return false;
			}

			return this._minimized;
		},

		_isInteger: function (value) {
			return typeof value === 'number';
		},

		_isDefined: function (value) {
			return typeof value !== 'undefined';
		}
	});

	L.Map.mergeOptions({
		miniMapControl: false
	});

	L.Map.addInitHook(function () {
		if (this.options.miniMapControl) {
			this.miniMapControl = (new MiniMap()).addTo(this);
		}
	});

	L.control.minimap = function (layer, options) {
		return new L.Control.MiniMap(layer, options);
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/***
 * @param editer: huangge
 */
L.Control.NavBar = L.Control.extend({
    options: {
        position: 'topright',
        view:{
            center: {lon:103.5 , lat:32.9},
            zoom:4
        },
        repeatMode: false,
        shapeOptions: {
            stroke: true,
            color: '#3388ff',
            weight: 4,
            opacity: 0.5,
            fill: true,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: true
        },
        showRadius: true,
        showLength: true,

    },
    onAdd: function(map) {
        if (!this.options.center) {
            this.options.center = map.getCenter();
        }
        if (!this.options.zoom) {
            this.options.zoom = map.getZoom();
        }
        var options = this.options;
        var controlName = 'leaflet-control-navbar',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar');

        if (options.homeTitle.show == true) {
            this._homeButton = this._createButton(options.homeTitle.name, controlName + '-home', container, this._goHome);
        }
        if (options.forwardTitle.show == true) {
            this._fwdButton = this._createButton(options.forwardTitle.name, controlName + '-fwd', container, this._goFwd);
        }
        if (options.backTitle.show == true) {
            this._backButton = this._createButton(options.backTitle.name, controlName + '-back', container, this._goBack);
        }
        if (options.changeMap.show == true) {
            this._changeMap = this._createButton(options.changeMap.name, controlName + '-juan', container, this._juan);
        }
        if (options.changeScrl.show == true) {
            this._changeScrl = this._createButton(options.changeScrl.name, controlName + '-scril', container, this._scril);
        }
        if (options.cutMap.show == true) {
            this._cutMap = this._createButton(options.cutMap.name, controlName + '-cut leaflet-control-easyPrint-button', container, this._cut);
        }
        if (options.culculator.show == true) {
            this._culculator = this._createButton(options.culculator.name, controlName + '-cutor', container, this._cutor);
        }
        if (options.tagging.show == true) {
            this._tagging = this._createButton(options.tagging.name, controlName + '-tagging', container, this._tag);
        }
        this._viewHistory = [{center: this.options.center, zoom: this.options.zoom}];
        this._curIndx = 0;
        this._updateDisabled();
        map.once('moveend', function () {
            this._map.on('moveend', this._updateHistory, this);
        }, this);
        map.setView(options.center, options.zoom);
        return container;
    },
    _goHome: function() {
        this._map.setView(this.options.center, this.options.zoom);
    },
    _goBack: function() {
        if (this._curIndx !== 0) {
            this._map.off('moveend', this._updateHistory, this);
            this._map.once('moveend', function() {this._map.on('moveend', this._updateHistory, this);}, this);
            this._curIndx--;
            this._updateDisabled();
            var view = this._viewHistory[this._curIndx];
            this._map.setView(view.center, view.zoom);
        }
    },
    _goFwd: function() {
        if (this._curIndx != this._viewHistory.length - 1) {
            this._map.off('moveend', this._updateHistory, this);
            this._map.once('moveend', function() {this._map.on('moveend', this._updateHistory, this);}, this);
            this._curIndx++;
            this._updateDisabled();
            var view = this._viewHistory[this._curIndx];
            this._map.setView(view.center, view.zoom);
        }
    },
    _juan:function(){
        var map = this._map;
        var mapb = document.getElementById('mapb');

        if (!this.options.stamenLayer) {
            this._removeTag();
            this._changeMap.style.backgroundColor = '#52C4D4';
            map.setView(this.options.view.center, this.options.view.zoom);
            map.invalidateSize(true);
            var stamenLayer = this.options.changeMap.stamenLayer;//添加卷帘图层
            stamenLayer.addTo(map);
            this.options.stamenLayer = stamenLayer;
            var sideBySide = L.control.sideBySide(stamenLayer);
            this.options.sideBySide = sideBySide;
            sideBySide.addTo(map);
        } else {
            this._changeMap.style.backgroundColor = '#ffffff';
            this.options.stamenLayer = null;
            this.options.sideBySide.remove();
            this.options.sideBySide = null;
            map.setView(this.options.view.center, this.options.view.zoom);
        }
    },
    _scril:function(){
        var map = this._map;
        var mapb = document.getElementById('mapb');

        if(!mapb) {
            this._removeTag();
            if(this._tagLayer){
                this.options.tagLayer = this._tagLayer;
            }
            this._changeScrl.style.backgroundColor = '#52C4D4';
            var baseLayer = this.options.changeScrl.resetLayer;
            var scrillayer = this.options.changeScrl.scrillayer;
            var splitmap = new L.Control.Split(baseLayer, scrillayer, this.options).addTo(map);
            this.options.splitmap = splitmap;
        } else {
            this._changeScrl.style.backgroundColor = '#ffffff';
            this.options.splitmap.removeTo();
            map.setView(this.options.view.center, this.options.view.zoom);
        }
    },
    _cut:function(){
        var elementsToHide = this.options.cutMap.elementsToHide;
        var map = this._map;
        //打印操作
        function printPage(map,elementsToHide){
            if (elementsToHide){
                var htmlElementsToHide = document.querySelectorAll(elementsToHide);
                for (var i = 0; i < htmlElementsToHide.length; i++) {
                    htmlElementsToHide[i].className = htmlElementsToHide[i].className + ' _epHidden';
                }
            }
            map.fire("beforePrint");
            window.print();
            map.fire("afterPrint");
            if (elementsToHide){
                var htmlElementsToHide = document.querySelectorAll(elementsToHide);
                for (var i = 0; i < htmlElementsToHide.length; i++) {
                    htmlElementsToHide[i].className = htmlElementsToHide[i].className.replace(' _epHidden','');
                }
            }
        }
        function addCSS() {
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = "._epHidden{ \
		display:none!important; \
	} \
	@media print { \
		html {padding: 0px!important;} \
		.leaflet-control-easyPrint-button{display: none!important;} \
	}";
            document.body.appendChild(css);
        }
        addCSS();
        printPage(map,elementsToHide);
    },
    _cutor:function(){
        var map = this._map;
        var areaColor = this.options.culculator.areaColor;
        this._culculator.style.backgroundColor = '#52C4D4';
        var mapb = document.getElementById('mapb');

        if(mapb){
            this._changeScrl.style.backgroundColor = '#ffffff';
            this.options.splitmap.removeTo();
            map.setView(this.options.view.center, this.options.view.zoom);
        }
        else if(this.options.stamenLayer){
            this._changeMap.style.backgroundColor = '#ffffff';
            this.options.stamenLayer = null;
            this.options.sideBySide.remove();
            this.options.sideBySide = null;
            map.setView(this.options.view.center, this.options.view.zoom);
        }

        var areaMeasure = this._areaMeasure = {
            allPoints: [],
            points:[],
            layers: L.layerGroup(),
            polygon: null,
            a: 0,
            init:function(){
                areaMeasure.points = [];
                areaMeasure.polygon = null;
                //areaMeasure.layers.addLayer(areaMeasure.polygonagin);
                map.on('click', areaMeasure.click);
                map.on('dblclick', areaMeasure.dblclick);
            },
            click:function(e){
                map.doubleClickZoom.disable();
                // 添加点信息
                areaMeasure.points.push(e.latlng);
                // 添加面
                if(areaMeasure.a == 0){
                    map.on('mousemove', areaMeasure.mousemove);
                }
            },
            //鼠标移动事件
            mousemove:function(e){
                areaMeasure.points.push(e.latlng);
                if(areaMeasure.polygon){
                    map.removeLayer(areaMeasure.polygon);
                }
                //生成面
                areaMeasure.polygon = L.polygon(areaMeasure.points,{
                    showMeasurements: true,
                    color: areaColor,
                    weight: 1,
                });
                areaMeasure.polygon.addTo(areaMeasure.layers);
                areaMeasure.layers.addTo(map);
                areaMeasure.points.pop();
            },
            dblclick:function(e){ // 双击结束
                areaMeasure.allPoints.push(areaMeasure.points);
                //areaMeasure.polygon.addTo(areaMeasure.layers);
                // areaMeasure.polygon.enableEdit();
                areaMeasure.a = 1;
                if(areaMeasure.a == 1){
                    // map.on('editable:vertex:drag editable:vertex:deleted', areaMeasure.polygon.updateMeasurements, areaMeasure.polygon);
                    map.on('editable:vertex:drag editable:vertex:deleted', areaMeasure.polygon);
                    map.off('click', areaMeasure.click);
                    map.off('mousemove', areaMeasure.mousemove);
                    areaMeasure.a = 0;
                }
                if(areaMeasure.a == 0){
                    areaMeasure.polygon = null;
                    map.on('click', areaMeasure.click);
                    map.on('mousemove', areaMeasure.mousemove);
                    // areaMeasure.__proto__(areaMeasure.init());

                    areaMeasure.points = [];
                    //areaMeasure.layers.addLayer(areaMeasure.polygonagin);
                    map.on('dblclick', areaMeasure.dblclick);

                }
            },
            removeEvent:function(){
                areaMeasure.polygon = null;
                areaMeasure.points = null;
                //map.removeLayer(areaMeasure.layers);
                map.off('click', areaMeasure.__proto__.click);
                map.off('mousemove', areaMeasure.__proto__.mousemove);
                map.off('dblclick', areaMeasure.__proto__.dblclick);
            }
        };
        if(this.options.cuortLayer){
            this.options.cuortLayer.clearLayers();
            map.removeLayer(this.options.cuortLayer);
            this.options.cuortLayer = null;
            areaMeasure.removeEvent();
            this._culculator.style.backgroundColor = '#ffffff';
        }else{
            areaMeasure.init();
            this.options.cuortLayer = areaMeasure.layers;
        }
    },
    //各个tab之间清除效果
    _removeTag: function(){
        var map = this._map;
        var mapb = document.getElementById('mapb');

        if(mapb){
            this._changeScrl.style.backgroundColor = '#ffffff';
            this.options.splitmap.removeTo();
        }
        if(this.options.stamenLayer){
            this._changeMap.style.backgroundColor = '#ffffff';
            this.options.stamenLayer = null;
            this.options.sideBySide.remove();
            this.options.sideBySide = null;
        }
        if(this.options.cuortLayer){
            this._culculator.style.backgroundColor = '#ffffff';
            this.options.cuortLayer.clearLayers();
            map.removeLayer(this.options.cuortLayer);
            this.options.cuortLayer = null;
            this._areaMeasure.removeEvent();
        }
        map.setView(this.options.view.center, this.options.view.zoom);
    },
    _tag:function(e){
        var map = this._map;
        var thisL = this;
        var layerGroup = L.layerGroup();
        layerGroup.addTo(map);

        var markname,type,linen,polytype;
        var polyLine,polylinea,polygon;
        var points = [];
        var context, canvas, container;
        var firstpoint = [];
        var bounds,boundsfirst,topLeftscreen;
        var pointleft,pointtop;
        var canvaspoint = [];

        if($('.leaflet-control-navbar-tagging').hasClass('addtag') == true){
            $('.leaflet-control-navbar-tagging').removeClass('addtag');
            $('.tag').hide(400);
            if(this.options.tagLayer){
                map.off('click', editmarkLayer);
                this.options.tagLayer.clearLayers();
                //map.removeLayer(this.options.tagLayer);
                //this.options.tagLayer = null;
                this._tagging.style.backgroundColor = '#ffffff';
            }
        }
        else{
            $('.leaflet-control-navbar-tagging').addClass('addtag');
            $('.tag').show(400);

            this._removeTag();
            this._tagging.style.backgroundColor = '#52C4D4';
            this.options.tagLayer = layerGroup;

            $('.tag-mark span').click(function(){
                type = 'mark';
                //取消绑定其他功能事件
                //面标注
                map
                    .off('mousedown', onMouseDown)
                    .off('mousemove', onMouseMove)
                    .off('touchstart', onMouseDown)
                    .off('touchmove', onMouseMove);
                var text = getTooltipText();
                map.openToolTip(text.text);
                if(this.className == 'mark-point'){
                    markname = 'markred';
                    map.on('click', editmarkLayer);
                    map.on('dblclick', editmarkEvent);
                }
                else if(this.className == 'mark-pointa'){
                    markname = 'markblue';
                    map.on('click', editmarkLayer);
                    map.on('dblclick', editmarkEvent);
                }
                else if(this.className == 'mark-flag'){
                    markname = 'markflag';
                    map.on('click', editmarkLayer);
                    map.on('dblclick', editmarkEvent);
                }
            });

            $('.tag-line span').click(function(){
                type = 'line';
                polylinea = new L.Polyline([],{
                    color:'#F9B140',
                    weight:3,
                });
                polyLine = new L.Polyline([],{
                    color:'#F9B140',
                    weight:3,
                });
                layerGroup.addLayer(polyLine);
                layerGroup.addLayer(polylinea);
                map.off('click', editlineLayer);
                map.off('click', editmarkLayer);
                if(this.className == 'mark-line'){
                    linen = 'linea';
                    var text = getTooltipText();
                    map.openToolTip(text.text);
                    map.on('click', editlineLayer);
                }
                else if(this.className == 'mark-broke'){
                    linen = 'lineb';
                    var text = getTooltipText();
                    map.openToolTip(text.text);
                    map.on('click', editlineLayer);
                    map.on('dblclick', removeEvent);
                }
                else if(this.className == 'mark-curve'){
                    linen = 'linec';
                    var text = getTooltipText();
                    map.openToolTip(text.text);
                    map.on('mousedown', editlineLayer);
                    map.on('mouseup', stoplineLayer);
                }
            });

            this.options.mapDraggable = map.dragging.enabled();
            var mapdrag = this.options.mapDraggable;
            var canvasID = 0;

            $('.tag-area span').click(function(){
                type = 'polygon';
                map.off('click', editmarkLayer);
                if(this.className == 'mark-circle'){
                    polytype = 'circle';
                    addHooks();
                }
                else if(this.className == 'mark-elli'){
                    polytype = 'Elli';
                    if(!container){
                        container = L.DomUtil.create('div', 'leaflet-Layer-container');
                        container.style.position = 'absolute';
                        container.style.width = map.getSize().x + "px";
                        container.style.height = map.getSize().y + "px";
                    }
                    addHooks();
                }
                else if(this.className == 'mark-aquare'){
                    polytype = 'Rectangle';
                    addHooks();
                }
                else if(this.className == 'mark-polygon'){
                    polytype = 'Polygon';
                    points = [];
                    polygon = [];
                    var text = getTooltipText();
                    map.openToolTip(text.text);
                    map.on('click', polygonClick);
                    map.on('dblclick', polygonDblclick);
                }
            });

            $('.tag-text span').click(function(){
                type = 'text';
                map.off('click', editmarkLayer);
                var text = getTooltipText();
                map.openToolTip(text.text);
                if(this.className == 'mark-text'){
                    map.on('click', addMaptext);

                }
            });

            $('.tag-clear span').click(function(){
                map.off('click', editmarkLayer);
                if(thisL.options.tagLayer){
                    thisL.options.tagLayer.clearLayers();
                }
            });
        }

        //提示框
        function getTooltipText() {
            this.map.options.showLength = true;
            var showLength = this.map.options.showLength,
                labelText, distanceStr;
            if(type == 'mark'){
                if (addPoints.length === 0) {
                    labelText = {
                        text: tooltipoptions.mark.tooltip.start,
                    };
                }
                else {
                    distanceStr = showLength ? addPoints : '';

                    if (addPoints.length !== 0) {
                        labelText = {
                            text: tooltipoptions.mark.tooltip.end,
                            subtext: distanceStr
                        };
                    }
                }
            }
            else if(type == 'line'){
                if(linen == 'linea'){
                    labelText = {
                        text: tooltipoptions.line.tooltipa.start,
                    };
                }
                else if(linen == 'lineb'){
                    if (polyLine._latlngs.length === 0) {
                        labelText = {
                            text: tooltipoptions.line.tooltipb.start,
                        };
                    }
                    else {
                        distanceStr = showLength ? addPoints : '';

                        if (polyLine._latlngs.length !== 0) {
                            labelText = {
                                text: tooltipoptions.line.tooltipb.end,
                                subtext: distanceStr
                            };
                        }
                    }
                }
                else if(linen == 'linec'){
                    labelText = {
                        text: tooltipoptions.line.tooltipc.start,
                    };
                }
            }
            else if(type == 'polygon'){
                if(polytype == 'circle' || polytype == 'Rectangle'){
                    labelText = {
                        text: tooltipoptions.polygon.tooltip.start,
                    };
                }
                else if(polytype == 'Polygon'){
                    if(points.length === 0){
                        labelText = {
                            text: tooltipoptions.polygon.tooltipPolygon.start,
                        };
                    }
                    else if(points.length === 1){
                        labelText = {
                            text: tooltipoptions.polygon.tooltipPolygon.con,
                        };
                    }
                    else {
                        labelText = {
                            text: tooltipoptions.polygon.tooltipPolygon.end,
                        };
                    }

                }
            }
            else if(type == 'text'){
                labelText = {
                    text: tooltipoptions.text.tooltip.start,
                };
            }

            return labelText;
        }
        //绘制点
        var addPoints =[];
        var tooltipoptions = this.options.tagging.taggingOptions;

        function editmarkLayer(e){
            var mousePoint =new L.LatLng(e.latlng.lat, e.latlng.lng);
            var iconOptions = L.icon({
                iconUrl: '../../ktw.highgis/map/control/navbar/images/tip/'+markname+'.png',
                iconSize: [25, 25],
                iconAnchor: [14, 25],
                popupAnchor: [-18, -40],
                draggable:true
            });
            var addPoint = L.marker(mousePoint, {icon:iconOptions});
            addPoints.push(addPoint);
            var text = getTooltipText();
            map.openToolTip(text.text);
            layerGroup.addLayer(addPoint);
        }

        function editmarkEvent(){
            addPoints =[];
            map.closeToolTip();
            map.off('click', editmarkLayer);
            map.off('dblclick', editmarkEvent);
        }

        //绘制线
        function editlineLayer(e){
            var text = getTooltipText();
            map.openToolTip(text.text);
            if(linen == 'linea'){
                if(polylinea._latlngs.length == 0 || polylinea._latlngs.length != 2){
                    polylinea.addLatLng(e.latlng);

                    if(polylinea._latlngs.length == 2){
                        map.closeToolTip();
                    }
                    return ;
                }
                else if(polylinea._latlngs.length == 2){
                    map.off('click', editlineLayer);
                    map.closeToolTip();
                }
            }
            else if(linen == 'lineb'){
                polyLine.addLatLng(e.latlng);
            }
            else if(linen == 'linec'){
                polyLine.addLatLng(e.latlng);
                map.dragging.disable();
                map.on('mousemove', editmouse);
            }
        }

        function stoplineLayer(){
            if(type == 'line'){
                map.off('mousedown', editlineLayer);
                map.off('mousemove', editmouse);
                map.off('mouseup', stoplineLayer);
                map.closeToolTip();
                map.dragging.enable();
            }
        }

        function removeEvent(){
            if(type == 'line'){
                map.off('click', editlineLayer);
                map.off('dblclick', removeEvent);
            }
            stoplineLayer();
        }

        function editmouse(e){
            if(linen == 'linea'){
                polylinea.addLatLng(e.latlng);
            }
            else{
                polyLine.addLatLng(e.latlng);
            }
        }

        //绘制面
        //圆
        function drawShapeCircle(latlng) {
            this.map.options.shapeOptions = {
                stroke: true,
                color: '#044223',
                weight: 3,
                fill: true,
                fillColor: '#ffffff',
                fillOpacity: 0.7,
            };
            if (!this.map.options.shape) {
                this.map.options.shape = new L.Circle(this.map.options.startLatLng, this.map.options.startLatLng.distanceTo(latlng), this.map.options.shapeOptions);
                layerGroup.addLayer(this.map.options.shape);
            } else {
                this.map.options.shape.setRadius(this.map.options.startLatLng.distanceTo(latlng));
            }
        }
        //椭圆
        function drawShapeElli(latlng){
            points.push(latlng);

            //获取坐标，转换坐标
            boundsfirst = map.latLngToContainerPoint(firstpoint[0]);
            bounds = map.latLngToContainerPoint(latlng);

            pointleft = boundsfirst.y-bounds.y;
            pointtop = boundsfirst.x-bounds.x;

            if(pointleft<0){
                pointleft = -pointleft;
            }
            else if(pointtop<0){
                pointtop = -pointtop;
            }

            //this.map.options.canvas.style.width = bounds.y;
            //this.map.options.canvas.style.height = bounds.x;

            this.map.options.canvas.style.width = '100%';
            this.map.options.canvas.style.height = '100%';

            this.map.options.canvas.style.position = 'absolute';

            this.map.options.canvas.style.top = pointleft;
            this.map.options.canvas.style.left = pointtop;

            if (!this.map.options.shape) {
                this.map.options.shape = EllipseTwo(context, pointleft, pointtop, pointleft, pointtop);
            } else {
                var r = (pointleft > pointtop) ? pointleft : pointtop;
                var ratioX = pointleft / r;
                var ratioY = pointtop / r;
                this.map.options.shape.scale(ratioX, ratioY);
                this.map.options.shape.arc(pointleft / ratioX, pointtop / ratioY, r, 0, 2 * Math.PI, false);
                this.map.options.shape.fill();
            }
        }

        function EllipseTwo(context, x, y, a, b) {
            //context.save();
            var r = (a > b) ? a : b;
            var ratioX = a / r;
            var ratioY = b / r;
            context.scale(ratioX, ratioY);
            context.beginPath();
            context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
            context.closePath();
            //context.restore();
            context.fillStyle="rgba(255,0,0,.4)";
            context.fill();
            return context;
        }

        //矩形
        function drawShapeRectangle(latlng) {
            this.map.options.shapeOptions = {
                weight: 3,
                color: '#DE5246',
                fill: true,
                fillColor: '#ffffff',
                fillOpacity: 0.5
            };
            if (!this.map.options.shape) {
                this.map.options.shape = new L.Rectangle(new L.LatLngBounds(this.map.options.startLatLng, latlng), this.map.options.shapeOptions);
                layerGroup.addLayer(this.map.options.shape);
            } else {
                this.map.options.shape.setBounds(new L.LatLngBounds(this.map.options.startLatLng, latlng));
            }
        }
        //绘制不规则多边形
        function polygonClick(e) {
            map.doubleClickZoom.disable();
            points.push(e.latlng);
            var text = getTooltipText();
            map.openToolTip(text.text);
            map.on('mousemove', polygonMousemove);
        }

        function polygonMousemove(e){
            points.push(e.latlng);
            var text = getTooltipText();
            map.openToolTip(text.text);
            if(polygon){
                map.removeLayer(polygon);
            }
            polygon = L.polygon(points,{
                weight: 3,
                color: '#F9B140',
                fill: true,
                fillColor: '#ffffff',
                fillOpacity: 0.5
            });
            layerGroup.addLayer(polygon);
            points.pop();
        }

        function polygonDblclick(e){
            map.closeToolTip();
            map.off('click', polygonClick);
            map.off('mousemove', polygonMousemove);
        }

        function onMouseMove(e) {
            var latlng = e.latlng;
            if (this.options.isDrawing) {
                if(polytype == 'circle'){
                    drawShapeCircle(latlng);
                }
                else if(polytype == 'Elli'){
                    drawShapeElli(latlng);
                }
                else if(polytype == 'Rectangle'){
                    drawShapeRectangle(latlng);
                }
            }
        }

        function onMouseDown(e) {
            this.options.isDrawing = true;
            this.options.startLatLng = e.latlng;

            L.DomEvent
                .on(document, 'mouseup', onMouseUp, this)
                .on(document, 'touchend', onMouseUp, this)
                .preventDefault(e.originalEvent);

            if(polytype == 'Elli'){
                //创建canvas容器
                canvas = document.createElement('canvas');
                canvas.className = 'canvas' + canvasID;
                canvasID++;
                context = canvas.getContext('2d');
                container.appendChild(canvas);
                map.getPanes().overlayPane.appendChild(container);

                this.options.canvas = canvas;

                firstpoint.push(e.latlng);
            }
        }

        function onMouseUp() {
            if (this.options.shape) {
                if(polytype == 'circle'){
                    new L.Circle(this.options.startLatLng, this.options.shape.getRadius(), this.options.shapeOptions);
                }
                else if(polytype == 'Elli'){
                    EllipseTwo(context, pointleft, pointtop, pointleft, pointtop);
                }
                else if(polytype == 'Rectangle'){
                    new L.Rectangle(this.options.shape.getBounds(), this.options.shapeOptions);
                }
            }
            removeHooks();
        }

        function addHooks(){
            var text = getTooltipText();
            map.openToolTip(text.text);
            map.options.mapDraggable = map.dragging.enabled();
            if(mapdrag){
                map.dragging.disable();
            }
            if (map){
                map
                    .on('mousedown', onMouseDown)
                    .on('mousemove', onMouseMove)
                    .on('touchstart', onMouseDown)
                    .on('touchmove', onMouseMove);
            }
        }

        function removeHooks() {
            map.closeToolTip();
            if (this.map) {
                if (this.map.options.mapDraggable) {
                    this.map.dragging.enable();
                }

                this.map
                    .off('mousedown', onMouseDown)
                    .off('mousemove', onMouseMove)
                    .off('touchstart', onMouseDown)
                    .off('touchmove', onMouseMove);

                L.DomEvent.off(document, 'mouseup', onMouseUp,this);
                L.DomEvent.off(document, 'touchend', onMouseUp,this);

                if (this.map.options.shape) {
                    delete this.map.options.shape;
                }
            }
            this.map.options.isDrawing = false;
        }

        //    添加文本标签
        var num = 0;
        var divID;
        function  addMaptext(e){
            num++;
            divID = "port port" + num;
            var thispoint = e.latlng;
            var marker = L.marker(thispoint, {
                icon : L.divIcon({
                    className : 'leaflet-text',
                    iconSize : [40, 20],
                    html : '<input type="text" class="' + divID + '" value="标注"/>'
                })
            });
            layerGroup.addLayer(marker);
            map.closeToolTip();
            map.off('click', addMaptext);

            //Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
            function controlEnter(e) {
                map.dragging.disable();
            }
            function controlLeave() {
                map.dragging.enable();
            }

            $.fn.autoFit = function() {
                var $this = $(this);
                var oldWidth = parseInt($this.css('width'));

                $this.keydown(function (event) {
                    var $this = $(this);

                    setTimeout(function() {
                        var val = $this.val().replace(/ /g, ' ');

                        var fontSize = $this.css('font-size');
                        var fontFamily =  $this.css('font-family');
                        var padding = $this.outerWidth() - $this.width();
                        var contentWidth = $('<span id="autowidth" style="font-size: ' + fontSize + '; padding: 0 ' + padding / 2 + 'px; font-family: ' + fontFamily + '; display: block; position: absolute; visibility: hidden;">' + val + '</span>').insertAfter($('body')).outerWidth();

                        $('#autowidth').remove();
                        var newWidth = ((contentWidth + padding) > oldWidth) ? (contentWidth + padding) : oldWidth;
                        $this.width(newWidth + 'px');
                    }, 0);

                });

                return $this;
            };

            var inputTags = document.getElementsByTagName("input");
            for (var i = 0; i < inputTags.length; i++) {
                L.DomEvent.disableClickPropagation(inputTags[i]);
                inputTags[i].onChange = function(){
                    this.size=(this.value.length>4?this.value.length:4);
                }

                $(inputTags[i]).autoFit();
            }
        }
    },

    _createButton: function(title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.href = '#';
        link.title = title;

        L.DomEvent
            .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'touchstart', L.DomEvent.stopPropagation)
            .on(link, 'click', fn, this);
        return link;
    },

    _updateHistory: function() {
        var newView = {center: this._map.getCenter(), zoom: this._map.getZoom()};
        var insertIndx = this._curIndx + 1;
        this._viewHistory.splice(insertIndx, this._viewHistory.length - insertIndx, newView);
        this._curIndx++;
        this._updateDisabled();
    },

    _setFwdEnabled: function(enabled) {
        var leafletDisabled = 'leaflet-disabled';
        var fwdDisabled = 'leaflet-control-navbar-fwd-disabled';
        if (enabled === true) {
            L.DomUtil.removeClass(this._fwdButton, fwdDisabled);
            L.DomUtil.removeClass(this._fwdButton, leafletDisabled);
        }else {
            L.DomUtil.addClass(this._fwdButton, fwdDisabled);
            L.DomUtil.addClass(this._fwdButton, leafletDisabled);
        }
    },

    _setBackEnabled: function(enabled) {
        var leafletDisabled = 'leaflet-disabled';
        var backDisabled = 'leaflet-control-navbar-back-disabled';
        if (enabled === true) {
            L.DomUtil.removeClass(this._backButton, backDisabled);
            L.DomUtil.removeClass(this._backButton, leafletDisabled);
        }else {
            L.DomUtil.addClass(this._backButton, backDisabled);
            L.DomUtil.addClass(this._backButton, leafletDisabled);
        }
    },

    _updateDisabled: function() {
        if (this._curIndx == (this._viewHistory.length - 1)) {
            this._setFwdEnabled(false);
        }else {
            this._setFwdEnabled(true);
        }
        if (this._curIndx <= 0) {
            this._setBackEnabled(false);
        }else {
            this._setBackEnabled(true);
        }
    },

    _resetContainer :function(reset,funmap){
        map.removeLayer(reset);
        map.removeLayer(funmap);
        funmap = null;
        map.addLayer(reset);
    },

});
L.control.navbar = function(options) {
    return new L.Control.NavBar(options);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: scrillayer
 * @prject:
 * @description: 地图分屏
 * @author: huangge
 * @date: 2017/8/29
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
L.Control.Scrillayer = L.Control.extend({
	options : {
		position : 'topleft',
	},
	onAdd : function(map){
		var options = this.options;
		var controlName = 'leaflet-control-navbar',
			container = L.DomUtil.create('div', controlName + ' leaflet-bar');

		this._changeScrl = this._createButton(options.name, controlName + '-scril', container, this._scril);

		return container;
	},
	_createButton: function(title, className, container, fn) {
		var link = L.DomUtil.create('a', className, container);
		link.href = '#';
		link.title = title;

		L.DomEvent
			.on(link, 'mousedown dblclick click', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.stop)
			.on(link, 'touchstart', L.DomEvent.stopPropagation)
			.on(link, 'click', fn, this);
		return link;
	},
	_scril : function(){
		var map = this._map;
		var mapb = document.getElementById('mapb');

		if(!mapb) {
			var baseLayer = this.options.resetLayer;
			var scrillayer = this.options.scrillayer;
			var splitmap = new L.Control.Split(baseLayer, scrillayer, this.options).addTo(map);
			this.options.splitmap = splitmap;
		} else {
			this.options.splitmap.removeTo();
		}
	},
	changeBaseUrl: function(options){
		this.options.splitmap.updataBaseUrl(options);
	},
	changeScrilUrl: function(options){
		this.options.splitmap.updataScrilUrl(options);
	}
});
L.control.scril = function(options) {
	return new L.Control.Scrillayer(options);
};
//分屏
L.Control.Split = L.Control.extend({
	options:{},

	initialize: function(baseLayer,scrillayer, options) {
		this._baseLayer = baseLayer;
		this._scrillayers = scrillayer;
        this._thirdLayer=options.thirdLayer;
		L.Util.extend(this.options, options);
	},

	includes: L.Mixin.Events,

	addTo: function(map){
		this._map = map;
		this.addmap();
		this._addEvents();
		return this;
	},

	addmap:function(){
		var map = document.getElementById('map')
		map.style.width = '49.8%';
		this._map.invalidateSize(true);

		var mapb = document.createElement('div');
		mapb.setAttribute('id','mapb');
		var mapbright = document.createElement('div');
		mapbright.setAttribute('id','mapbright');

		map.parentNode.insertBefore(mapb,map);
		map.parentNode.insertBefore(mapbright,map);

		var mapb= L.map('mapb',{
			center: this.options.view.center,
			zoom: this.options.view.zoom,
			minZoom:this.options.view.minZoom,//地图最小级数
			maxZoom:this.options.view.maxZoom,//地图最大级数
			attributionControl:false
		});

		mapb.addLayer(this._scrillayers);
		this._mapb = mapb;
	},
	removeTo: function () {
		if (!this._mapb) {
			return this;
		}
		this._removeEvents();
		var map = document.getElementById('map');
		var mapb = document.getElementById('mapb');
		var mapbright = document.getElementById('mapbright');
		map.style.width = '100%';

		map.parentNode.removeChild(mapb);
		map.parentNode.removeChild(mapbright);

		this._mapb.removeLayer(this._scrillayers);
		this._map.invalidateSize(true);
	},
	_addEvents: function () {
		var mapa = this._map;
		var mapb = this._mapb;
		if (!mapa) return;
		//所有视图移动时触发
		mapa.on('focus', function () {
			mapa.on('move', this._updateClip, this);
			mapa.on('zoomend', this._updateClip, this);
		}, this);
		mapa.on('blur', function () {
			mapa.off('move', this._updateClip, this);
			mapa.off('zoomend', this._updateClip, this);
		}, this);

		mapb.on('focus', function () {
			mapb.on('move', this._updateClip, this);
			mapb.on('zoomend', this._updateClip, this);
		}, this);
		mapb.on('blur', function () {
			mapb.off('move', this._updateClip, this);
			mapb.off('zoomend', this._updateClip, this);
		}, this);
	},

	_removeEvents:function(){
		var mapa = this._map;
		var mapb = this._mapb;
		mapa.off('focus', function () {
			mapa.off('move', this._updateClip, this);
			mapa.off('zoomend', this._updateClip, this);
		}, this);
		mapa.off('blur', function () {
			mapa.off('move', this._updateClip, this);
			mapa.off('zoomend', this._updateClip, this);
		}, this);

		mapb.off('focus', function () {
			mapb.off('move', this._updateClip, this);
			mapb.off('zoomend', this._updateClip, this);
		}, this);
		mapb.off('blur', function () {
			mapb.off('move', this._updateClip, this);
			mapb.off('zoomend', this._updateClip, this);
		}, this);
	},

	_updateClip:function(e){
		if(!this._mapb.hasLayer(this._scrillayers)) {
			return ;
		}else {
			var tempMap= e.target;
			var mouseMap=tempMap;
			var moveMap=(tempMap === this._map ? this._mapb : this._map);
			moveMap.setView(mouseMap.getCenter(), mouseMap.getZoom());
		}
	},

	updataBaseUrl: function(options){
		L.setOptions(this, options);
		this._map.setView(this.options.view.center, this.options.view.zoom);
		this._map.removeLayer(this._baseLayer);
		this._baseLayer = this.options.basaLayer;
		this._map.addLayer(this._baseLayer);
	},

	updataScrilUrl: function(options){
		L.setOptions(this, options);
		this._mapb.setView(this.options.view.center, this.options.view.zoom);
		this._mapb.removeLayer(this._scrillayers);
		this._scrillayers = this.options.scrillayer;
		this._mapb.addLayer(this._scrillayers);
	}
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: scrillayer
 * @prject:
 * @description: 地图分屏
 * @author: huangge
 * @date: 2017/8/29
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */

//分屏
L.Control.MultiScreen = L.Control.extend({
    options: {},

    initialize: function (baseLayer, multiScreenMap, options) {
        this._baseLayer = baseLayer;
        this._multiScreenMap = multiScreenMap;
        L.Util.extend(this.options, options);
    },

    includes: L.Mixin.Events,

    addTo: function (map) {
        this._map = map;
        this.addmap();
        this._addEvents();
        return this;
    },

    addmap: function () {
        if (this._multiScreenMap != null && this._multiScreenMap.length > 0) {
            //计算每个屏幕的宽度的百分比
            var screenWidth = ((99.5 / (this._multiScreenMap.length + 1))) + "%";
            var map = document.getElementById('map')
            map.style.width = screenWidth;
            this._map.invalidateSize(true);
            var multiMap = [];
            for (var i = 0; i < this._multiScreenMap.length; i++) {
                var multiMapCon = document.createElement('div');
                multiMapCon.setAttribute('id', 'multiScreenMapCon' + i);
                multiMapCon.setAttribute('class', 'multiScreenMapCon');
                multiMapCon.style.width = screenWidth;

                var multiMapBright = document.createElement('div');
                multiMapBright.setAttribute('id', 'multiMapBright' + i);
                multiMapBright.setAttribute('class', 'multiMapBright');

                map.parentNode.insertBefore(multiMapCon, map);
                map.parentNode.insertBefore(multiMapBright, map);

                if (this._multiScreenMap[i] != null && this._multiScreenMap[i].view != undefined) {
                    if (this._multiScreenMap[i].view.attributionControl == undefined) {
                        this._multiScreenMap[i].view.attributionControl = false;
                    }
                    multiMap.push(L.map('multiScreenMapCon' + i, this._multiScreenMap[i].view));
                } else {
                    multiMap.push(L.map('multiScreenMapCon' + i, {
                        center: this._map.getCenter(),
                        zoom: this._map.getZoom(),
                        minZoom: this._map.getMinZoom(), //地图最小级数
                        maxZoom: this._map.getMaxZoom(), //地图最大级数
                        attributionControl: false
                    }));
                }
                multiMap[i].addLayer(this._multiScreenMap[i].layer);
            }
        }
        this._multiMap = multiMap;
    },
    removeTo: function () {
        if (!this._multiMap) {
            return this;
        }
        this._removeEvents();
        var map = document.getElementById('map');

        map.style.width = '100%';
        //获取第三屏进行移除
        for (var i = 0; i < this._multiMap.length; i++) {
            var multiMapCon = document.getElementById('multiScreenMapCon' + i);
            var multiMapBright = document.getElementById('multiMapBright' + i);
            map.parentNode.removeChild(multiMapCon);
            map.parentNode.removeChild(multiMapBright);
            this._multiMap[i].removeLayer(this._multiScreenMap[i].layer);
        }
        this._map.invalidateSize(true);
    },
    _addEvents: function () {
        var mapa = this._map;
        if (!mapa) return;
        //所有视图移动时触发
        mapa.on('focus', function () {
            mapa.on('move', this._updateClip, this);
            mapa.on('zoomend', this._updateClip, this);
        }, this);

        mapa.on('blur', function () {
            mapa.off('move', this._updateClip, this);
            mapa.off('zoomend', this._updateClip, this);
        }, this);

        //添加多屏监听
        for (var i = 0; i < this._multiMap.length; i++) {
            this._multiMap[i].on('focus', function (e) {
                e.target.on('move', this._updateClip, this);
                e.target.on('zoomend', this._updateClip, this);
            }, this);
            this._multiMap[i].on('blur', function (e) {
                e.target.off('move', this._updateClip, this);
                e.target.off('zoomend', this._updateClip, this);
            }, this);
        }
    },

    _removeEvents: function () {
        var mapa = this._map;

        mapa.off('focus', function () {
            mapa.off('move', this._updateClip, this);
            mapa.off('zoomend', this._updateClip, this);
        }, this);
        mapa.off('blur', function () {
            mapa.off('move', this._updateClip, this);
            mapa.off('zoomend', this._updateClip, this);
        }, this);

        //取消监听事件
        for (var i = 0; i < this._multiMap.length; i++) {
            this._multiMap[i].off('focus', function (e) {
                e.target.off('move', this._updateClip, this);
                e.target.off('zoomend', this._updateClip, this);
            }, this)
            this._multiMap[i].on('blur', function (e) {
                e.target.off('move', this._updateClip, this);
                e.target.off('zoomend', this._updateClip, this);
            }, this)
        }
    },

    _updateClip: function (e) {
        var tempMap = e.target;
        if (tempMap === this._map) {
            for (var i = 0; i < this._multiMap.length; i++) {
                this._multiMap[i].setView(tempMap.getCenter(), tempMap.getZoom());
            }
        } else {
            for (var i = 0; i < this._multiMap.length; i++) {
                if (this._multiMap[i] !== tempMap) {
                    this._multiMap[i].setView(tempMap.getCenter(), tempMap.getZoom());
                }
            }
            this._map.setView(tempMap.getCenter(), tempMap.getZoom());
        }
    },

    updataBaseUrl: function (options) {
        L.setOptions(this, options);
        this._map.setView(this.options.view.center, this.options.view.zoom);
        this._map.removeLayer(this._baseLayer);
        this._baseLayer = this.options.basaLayer;
        this._map.addLayer(this._baseLayer);
    },

    updataScrilUrl: function (options) {
        L.setOptions(this, options);
        if (!L.Util.isArray(options)) {
            alert("更新参数需要为数组类型，且需与初始传入多屏数组对应!");
            return;
        }
        if (this._multiMap) {
            for (var i = 0; i < this._multiMap.length; i++) {
                if (options[i] != null && options[i].view != undefined && options[i].view.zoom!=undefined) {
                    this._multiMap[i].setView(options[i].view.center, options[i].view.zoom);
                }
                if (options[i] != null&&options[i].layer != undefined) {
                    if(this._multiScreenMap[i]!= undefined){
                        this._multiMap[i].removeLayer(this._multiScreenMap[i].layer);
                    }
                        this._multiMap[i].addLayer(options[i].layer);
                }
            }
        }
    }
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global){
var mapWasDragEnabled;
var mapWasTapEnabled;

function on (el, types, fn, context) {
  types.split(' ').forEach(function (type) {
    L.DomEvent.on(el, type, fn, context);
  });
}

function off (el, types, fn, context) {
  types.split(' ').forEach(function (type) {
    L.DomEvent.off(el, type, fn, context);
  });
}

function getRangeEvent (rangeInput) {
  return 'oninput' in rangeInput ? 'input' : 'change';
}
//禁止地图拖拽
function cancelMapDrag () {
  mapWasDragEnabled = this._map.dragging.enabled();
  mapWasTapEnabled = this._map.tap && this._map.tap.enabled();
  this._map.dragging.disable();
  this._map.tap && this._map.tap.disable()
}
//允许地图拖拽
function uncancelMapDrag (e) {
  if (mapWasDragEnabled) {
    this._map.dragging.enable();
  }
  if (mapWasTapEnabled) {
    this._map.tap.enable();
  }
}

// convert arg to an array - returns empty array if arg is undefined
function asArray (arg) {
  return (arg === 'undefined') ? [] : Array.isArray(arg) ? arg : [arg]
}

function noop () {
  return ;
}

L.Control.SideBySide = L.Control.extend({
  options: {
    thumbSize: 40,
    padding: 0,
    scrilPosition: 'horizontal'
  },

                    initialize: function (leftLayers, options,rightLayers) {
                        this.setLeftLayers(leftLayers);
						if(rightLayers){
							this.setRightLayers(rightLayers);
						}
                        L.setOptions(this, options);
                    },

  getXPosition: function () {
    var rangeValue = this._range.value;
    var offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize);
    return this._map.getSize().x * rangeValue + offset;
  },

  getYPosition: function () {
    var rangeValue = this._range.value;
    var offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize);
    return this._map.getSize().y * rangeValue + offset;
  },

  setPosition: noop,

  includes: L.Mixin.Events,

  addTo: function (map) {
    this.remove();
    this._map = map;

    var container = this._container = L.DomUtil.create('div', 'leaflet-sbs', map._controlContainer);
    this.container=container;
    this._divider = L.DomUtil.create('div', 'leaflet-sbs-divider', container);
    var range = this._range = L.DomUtil.create('input', 'leaflet-sbs-range', container);
    this.setScrilPosition();
    range.type = 'range';
    range.min = 0;
    range.max = 1;
    range.step = 'any';
    range.value = 0.5;

    this._addEvents();
    this._updateLayers();
    return this;
  },

  remove: function () {
    var map = this._map;
    if (!map) {
      return this;
    }

    this._removeEvents();

                        map.removeLayer(this._leftLayer);
						if(this._rightLayer) map.removeLayer(this._rightLayer);
                        this._map = null;
                        map._controlContainer.removeChild(this.container);

    return this;
  },

  setScrilPosition: function(options){
    var map = this._map;
    if(options){
      L.setOptions(this, options);
    }
    var se = map.containerPointToLayerPoint(map.getSize());
    if(this.options.scrilPosition == 'vertical'){
      if(!L.DomUtil.hasClass(this._divider,'leaflet-sbs-divider-v') || !L.DomUtil.hasClass(this._range,'leaflet-sbs-range-v')){
        L.DomUtil.addClass(this._divider,'leaflet-sbs-divider-v');
        L.DomUtil.addClass(this._range,'leaflet-sbs-range-v');
      }
      this._range.style.paddingtop = this._range.style.paddingbottom = this.options.padding + 'px';
      this._range.style.width = se.y + 'px';
      this._range.style.left = '-' + se.y/2 + 'px';
      this._range.style.marginLeft = '50%';
      this._divider.style.left = 0 + 'px';
    }else if(this.options.scrilPosition == 'horizontal'){
      if(L.DomUtil.hasClass(this._divider,'leaflet-sbs-divider-v') || L.DomUtil.hasClass(this._range,'leaflet-sbs-range-v')){
        L.DomUtil.removeClass(this._divider,'leaflet-sbs-divider-v');
        L.DomUtil.removeClass(this._range,'leaflet-sbs-range-v');
      }
      this._range.style.paddingLeft = this._range.style.paddingRight = this.options.padding + 'px';
      this._range.style.width = '100%';
      this._range.style.marginLeft = '0px';
      this._range.style.left = '0px';
      this._divider.style.top = '0px';
    }
    if(options){
      this._updateClip();
    }
  },

                    setLeftLayers: function (leftLayers) {
                        if (this._leftLayers) {
                            var map = this._map;
                            map.removeLayer(this._leftLayer);
                            leftLayers.addTo(map);
                        }
                        this._leftLayers = null;
                        this._leftLayers = asArray(leftLayers);
                        this._updateLayers();
                        return this;
                    },
					setRightLayers: function (rightLayers) {
                        if (this._rightLayers) {
                            var map = this._map;
							for(var i=0;i<this._rightLayers.length;i++){
									map.removeLayer(this._rightLayers[i]);
							}
                        }
                        this._rightLayers = null;
                        this._rightLayers = asArray(rightLayers);
						for(var i=0;i<this._rightLayers.length;i++){
								if(!this._map.hasLayer(this._rightLayers[i])){
									 this._map.addLayer(this._rightLayers[i]);
								}
						}
                        this._updateLayers();
                        return this;
                    },
					//hqj添加 向右侧添加图层
					addRightLayers: function (rightLayers) {
                        if (!rightLayers) {
							return this;
                        }
                        this._rightLayers = this._rightLayers||[];
                        var arr = asArray(rightLayers);
						for(var i=0;i<arr.length;i++){
								if(!this._map.hasLayer(arr[i])){
									 this._map.addLayer(arr[i]);
								}
								if(!(this._rightLayers.indexOf(arr[i])>=0)){
									 this._rightLayers.push(arr[i]);
								}
						}
                        this._updateLayers();
                        return this;
                    },
					//hqj添加 从右侧移除图形
					removeRightLayers: function (rightLayers) {
						if(!rightLayers){
								return this;
						}
						this._rightLayers = this._rightLayers||[];
						var arr=asArray(rightLayers);
						
						for(var i=arr.length-1;i>=0;i--){
								if(this._map.hasLayer(arr[i])){
									 this._map.addLayer(arr[i]);
								}
								if((this._rightLayers.indexOf(arr[i])>=0)){
									 this._rightLayers.splice(i,1);
								}
						}
                        this._updateLayers();
                        return this;
                    },

                    _updateClip: function () {
                        var map = this._map;
                        var nw = map.containerPointToLayerPoint([0, 0]);
                        var se = map.containerPointToLayerPoint(map.getSize());
                        if (this.options.scrilPosition == 'horizontal') {
                            var clipX = nw.x + this.getXPosition();
                            var dividerX = this.getXPosition();
                            this._divider.style.left = dividerX + 'px';
                            this.fire('dividermove', { x: dividerX });
                            var clipLeft = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
							var clipRight = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)';
                        } else if (this.options.scrilPosition == 'vertical') {
                            this._range.style.width = map.getSize().y + 'px';
                            var clipY = nw.y + this.getYPosition();
                            var dividerY = this.getYPosition();
                            this._divider.style.top = dividerY + 'px';
                            this.fire('dividermove', { y: dividerY });
                            var clipLeft = 'rect(' + [nw.y, se.x, clipY, nw.x].join('px,') + 'px)';
                        }
                        if (this._leftLayer) {
							if(this._leftLayer._container){
								this._leftLayer._container.style.clip = clipLeft;
							}else if(this._leftLayer._currentImage){
									this._leftLayer._currentImage.parentElement.style.clip = clipLeft;									
							}else if(this._leftLayer.getContainer){
								var container=this._leftLayer.getContainer();
								if(container){
									container.style.clip = clipLeft;
								}
							}
                        }
						if (this._rightLayers) {
							for(var i=0;i<this._rightLayers.length;i++){
								if(this._rightLayers[i]._currentImage){
									this._rightLayers[i]._currentImage.parentElement.style.clip = clipRight;									
								}else if(this._rightLayers[i].getContainer){
									var container=this._rightLayers[i].getContainer();
									if(container){
										container.style.clip = clipRight;
									}
								}
							}                            
                        }
                    },

                    _updateLayers: function () {
                        if (!this._map) {
                            return this;
                        }
                        var prevLeft = this._leftLayer;
                        this._leftLayer = this._rightLayer = null;
						if(this._leftLayers){
							this._leftLayers.forEach(function (layer) {
								if (this._map.hasLayer(layer)) {
									this._leftLayer = layer;
								}
							}, this);
						}
                        if (prevLeft !== this._leftLayer) {
                            prevLeft && this.fire('leftlayerremove', { layer: prevLeft });
							//hqj添加,删除图层后将_leftLayers置空
							if(!this._leftLayer)this._leftLayers=null;
                            this._leftLayer && this.fire('leftlayeradd', { layer: this._leftLayer })
                        }
						//hqj添加 删除已移除的图层
						if(this._rightLayers){
							for(var i=this._rightLayers.length;i>=0;i--){
								var layer=this._rightLayers[i];
								if (!this._map.hasLayer(layer)) {
									this._rightLayers.splice(i,1);
								}
							}
						}
                        this._updateClip();
                    },

  _addEvents: function () {
    var range = this._range;
    var map = this._map;
    if (!map || !range) return;
    map.on('move', this._updateClip, this);
    map.on('layeradd layerremove', this._updateLayers, this);
    on(range, getRangeEvent(range), this._updateClip, this);
    on(range, 'mousedown touchstart', cancelMapDrag, this);
    on(range, 'mouseup touchend', uncancelMapDrag, this);
  },

  _removeEvents: function () {
    var range = this._range;
    var map = this._map;
    if (range) {
      off(range, getRangeEvent(range), this._updateClip, this);
      off(range, 'mousedown touchstart', cancelMapDrag, this);
      off(range, 'mouseup touchend', uncancelMapDrag, this);
    }
    if (map) {
      map.off('layeradd layerremove', this._updateLayers, this);
      map.off('move', this._updateClip, this)
    }
  }
});
  L.control.sideBySide = function (leftLayers, options) {
    return new L.Control.SideBySide(leftLayers, options)
  }
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

!(function() {
    'use strict';

    L.Marker.Measurement = L[L.Layer ? 'Layer' : 'Class'].extend({
        options: {
            pane: 'markerPane'
        },

        initialize: function(latlng, measurement, title, rotation, options) {
            L.setOptions(this, options);

            this._latlng = latlng;
            this._measurement = measurement;
            this._title = title;
            this._rotation = rotation;
        },

        addTo: function(map) {
            map.addLayer(this);
            return this;
        },

        onAdd: function(map) {
            this._map = map;
            var pane = this.getPane ? this.getPane() : map.getPanes().markerPane;
            var el = this._element = L.DomUtil.create('div', 'leaflet-zoom-animated leaflet-measure-path-measurement', pane);
            var inner = L.DomUtil.create('div', '', el);
            inner.title = this._title;
            inner.innerHTML = this._measurement;

            map.on('zoomanim', this._animateZoom, this);

            this._setPosition();
        },

        onRemove: function(map) {
            map.off('zoomanim', this._animateZoom, this);
            var pane = this.getPane ? this.getPane() : map.getPanes().markerPane;
            pane.removeChild(this._element);
            this._map = null;
        },

        _setPosition: function() {
            L.DomUtil.setPosition(this._element, this._map.latLngToLayerPoint(this._latlng));
            this._element.style.transform += ' rotate(' + this._rotation + 'rad)';
        },

        _animateZoom: function(opt) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
            L.DomUtil.setPosition(this._element, pos);
            this._element.style.transform += ' rotate(' + this._rotation + 'rad)';
        }
    });

    L.marker.measurement = function(latLng, measurement, title, rotation, options) {
        return new L.Marker.Measurement(latLng, measurement, title, rotation, options);
    };

    var formatDistance = function(d) {
        var unit,
            feet;

        if (this._measurementOptions.imperial) {
            feet = d / 0.3048;
            if (feet > 3000) {
                d = d / 1609.344;
                unit = '英里';
            } else {
                d = feet;
                unit = '英尺';
            }
        } else {
            if (d > 1000) {
                d = d / 1000;
                unit = '千米';
            } else {
                unit = '米';
            }
        }

        if (d < 100) {
            return d.toFixed(1) + ' ' + unit;
        } else {
            return Math.round(d) + ' ' + unit;
        }
    }

    var formatArea = function(a) {
        var unit,
            sqfeet;

        if (this._measurementOptions.imperial) {
            if (a > 404.685642) {
                a = a / 4046.85642;
                unit = 'ac';
            } else {
                a = a / 0.09290304;
                unit = '平方英尺';
            }
        } else {
            if (a > 1000000) {
                a = a / 1000000;
                unit = '平方千米';
            } else {
                unit = '平方米';
            }
        }

        if (a < 100) {
            return a.toFixed(1) + ' ' + unit;
        } else {
            return Math.round(a) + ' ' + unit;
        }
    }

    var RADIUS = 6378137;
    // ringArea function copied from geojson-area
    var ringArea = function ringArea(coords) {
        var rad = function rad(_) {
            return _ * Math.PI / 180;
        };
        var p1, p2, p3, lowerIndex, middleIndex, upperIndex,
        area = 0,
        coordsLength = coords.length;

        if (coordsLength > 2) {
            for (var i = 0; i < coordsLength; i++) {
                if (i === coordsLength - 2) {// i = N-2
                    lowerIndex = coordsLength - 2;
                    middleIndex = coordsLength -1;
                    upperIndex = 0;
                } else if (i === coordsLength - 1) {// i = N-1
                    lowerIndex = coordsLength - 1;
                    middleIndex = 0;
                    upperIndex = 1;
                } else { // i = 0 to N-3
                    lowerIndex = i;
                    middleIndex = i+1;
                    upperIndex = i+2;
                }
                p1 = coords[lowerIndex];
                p2 = coords[middleIndex];
                p3 = coords[upperIndex];

                area += (rad(p3.lng) - rad(p1.lng)) * Math.sin(rad(p2.lat));
            }
            area = area * RADIUS * RADIUS / 2;
        }

        return Math.abs(area);
    };

    var circleArea = function circleArea(d) {
        var rho = d / RADIUS;
        return 2 * Math.PI * RADIUS * RADIUS * (1 - Math.cos(rho));
    };

    var override = function(method, fn, hookAfter) {
        if (!hookAfter) {
            return function() {
                method.apply(this, arguments);
                return fn.apply(this, arguments);
            }
        } else {
            return function() {
                fn.apply(this, arguments);
                return method.apply(this, arguments);
            }
        }
    };

    L.Polyline.include({
        showMeasurements: function(options) {
            if (!this._map || this._measurementLayer) return this;

            this._measurementOptions = L.extend({
                showOnHover: false,
                minPixelDistance: 30,
                showDistances: true,
                showArea: true,
                lang: {
                    totalLength: 'Total length',
                    totalArea: 'Total area',
                    segmentLength: 'Segment length'
                }
            }, options || {});

            this._measurementLayer = L.layerGroup().addTo(this._map);
            this.updateMeasurements();

            this._map.on('zoomend', this.updateMeasurements, this);

            return this;
        },

        hideMeasurements: function() {
            this._map.off('zoomend', this.updateMeasurements, this);

            if (!this._measurementLayer) return this;
            this._map.removeLayer(this._measurementLayer);
            this._measurementLayer = null;

            return this;
        },

        onAdd: override(L.Polyline.prototype.onAdd, function() {
            if (this.options.showMeasurements) {
                this.showMeasurements(this.options.measurementOptions);
            }
        }),

        onRemove: override(L.Polyline.prototype.onRemove, function() {
            this.hideMeasurements();
        }, true),

        setLatLngs: override(L.Polyline.prototype.setLatLngs, function() {
            return this.updateMeasurements();
        }),

        spliceLatLngs: override(L.Polyline.prototype.spliceLatLngs, function() {
            return this.updateMeasurements();
        }),

        formatDistance: formatDistance,
        formatArea: formatArea,

        updateMeasurements: function() {
            if (!this._measurementLayer) return this;

            var latLngs = this.getLatLngs(),
                isPolygon = this instanceof L.Polygon,
                options = this._measurementOptions,
                totalDist = 0,
                formatter,
                ll1,
                ll2,
                p1,
                p2,
                pixelDist,
                dist;

            if (latLngs && latLngs.length && L.Util.isArray(latLngs[0])) {
                // Outer ring is stored as an array in the first element,
                // use that instead.
                latLngs = latLngs[0];
            }

            this._measurementLayer.clearLayers();

            if (this._measurementOptions.showDistances && latLngs.length > 1) {
                formatter = this._measurementOptions.formatDistance || L.bind(this.formatDistance, this);

                for (var i = 1, len = latLngs.length; (isPolygon && i <= len) || i < len; i++) {
                    ll1 = latLngs[i - 1];
                    ll2 = latLngs[i % len];
                    dist = ll1.distanceTo(ll2);
                    totalDist += dist;

                    p1 = this._map.latLngToLayerPoint(ll1);
                    p2 = this._map.latLngToLayerPoint(ll2);

                    pixelDist = p1.distanceTo(p2);

                    if (pixelDist >= options.minPixelDistance) {
                        L.marker.measurement(
                            this._map.layerPointToLatLng([(p1.x + p2.x) / 2, (p1.y + p2.y) / 2]),
                            formatter(dist), options.lang.segmentLength, this._getRotation(ll1, ll2), options)
                            .addTo(this._measurementLayer);
                    }
                }

                // Show total length for polylines
                if (!isPolygon) {
                    L.marker.measurement(ll2, formatter(totalDist), options.lang.totalLength, 0, options)
                        .addTo(this._measurementLayer);
                }
            }

            if (isPolygon && options.showArea && latLngs.length > 2) {
                formatter = options.formatArea || L.bind(this.formatArea, this);
                var area = ringArea(latLngs);
                L.marker.measurement(this.getBounds().getCenter(),
                    formatter(area), options.lang.totalArea, 0, options)
                    .addTo(this._measurementLayer);
            }
            return this;
        },

        _getRotation: function(ll1, ll2) {
            var p1 = this._map.project(ll1),
                p2 = this._map.project(ll2);

            return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
        }
    });

    L.Polyline.addInitHook(function() {
        if (this.options.showMeasurements) {
            this.showMeasurements();
        }
    });

    L.Circle.include({
        showMeasurements: function(options) {
            if (!this._map || this._measurementLayer) return this;

            this._measurementOptions = L.extend({
                showOnHover: false,
                showArea: true,
                lang: {
                    totalArea: 'Total area',
                }
            }, options || {});

            this._measurementLayer = L.layerGroup().addTo(this._map);
            this.updateMeasurements();

            this._map.on('zoomend', this.updateMeasurements, this);

            return this;
        },

        hideMeasurements: function() {
            this._map.on('zoomend', this.updateMeasurements, this);

            if (!this._measurementLayer) return this;
            this._map.removeLayer(this._measurementLayer);
            this._measurementLayer = null;

            return this;
        },

        onAdd: override(L.Circle.prototype.onAdd, function() {
            if (this.options.showMeasurements) {
                this.showMeasurements(this.options.measurementOptions);
            }
        }),

        onRemove: override(L.Circle.prototype.onRemove, function() {
            this.hideMeasurements();
        }, true),

        setLatLng: override(L.Circle.prototype.setLatLng, function() {
            this.updateMeasurements();
        }),

        setRadius: override(L.Circle.prototype.setRadius, function() {
            this.updateMeasurements();
        }),

        formatArea: formatArea,

        updateMeasurements: function() {
            if (!this._measurementLayer) return;

            var latLng = this.getLatLng(),
                options = this._measurementOptions,
                formatter = options.formatArea || L.bind(this.formatArea, this);

            this._measurementLayer.clearLayers();

            if (options.showArea) {
                formatter = options.formatArea || L.bind(this.formatArea, this);
                var area = circleArea(this.getRadius());
                L.marker.measurement(latLng,
                    formatter(area), options.lang.totalArea, 0, options)
                    .addTo(this._measurementLayer);
            }
        }
    })

    L.Circle.addInitHook(function() {
        if (this.options.showMeasurements) {
            this.showMeasurements();
        }
    });
})();


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: measureMap
 * @prject:
 * @description: 地图测量
 * @author: huangge
 * @date: 2017/8/5
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
L.Control.MeasureMap = L.Control.extend({
	options : {
		color: '#F9B140',
		fillColor: '#ffffff',
		fillOpacity: 0.7,
		showMeasurements: true,
		onceMearsure: true, //是否只测量一次就结束测量
		type: 'polyLine',//测量的图形类型，这里支持polyLine，polyGon，circle三种类型
	},
	initialize: function(options){
		L.Util.extend(this.options, options);
	},
	includes: L.Mixin.Events,
	addTo : function(map){
		this._map = map;
		this.options.type === 'polyLine' ?
			this._cutorPolyLine() : this.options.type === 'polyGon' ?
			this._cutorPolyGon() : this.options.type === 'circle' ?
			this._cutorCircle() : alert('暂时不支持此种类型！');
		return this;
	},
	_cutorPolyLine: function(){
		var map = this._map;
		var options = {
			color: this.options.color,
			fillColor: this.options.fillColor,
			fillOpacity: this.options.fillOpacity,
			showMeasurements: true
		}
		var polyLine = new L.Polyline([],options);
		var onceMearsure = this.options.onceMearsure;
		var polyLineMearsure = this._polyLineMearsure = {
			points:[],
			allPoints: [],
			layers: L.layerGroup(),
			polyLine: polyLine,
			contn: false,
			init: function(){
				onceMearsure ? polyLineMearsure.contn = false : polyLineMearsure.contn = true;
				polyLineMearsure.points = [];
				map.on('mousedown', polyLineMearsure.click);
				map.on('dblclick', polyLineMearsure.dblclick);
			},
			click: function(e){
				map.doubleClickZoom.disable();
				polyLineMearsure.points.push(e.latlng);
				polyLineMearsure.polyLine.addLatLng(e.latlng);
				map.on('mousemove',polyLineMearsure.mousemove);
			},
			mousemove: function(e){
				polyLineMearsure.points.push(e.latlng);
				if(polyLineMearsure.polyLine){
					polyLineMearsure.layers.removeLayer(polyLineMearsure.polyLine);
				}
				polyLineMearsure.polyLine = new L.Polyline(polyLineMearsure.points,options);
				polyLineMearsure.layers.addLayer(polyLineMearsure.polyLine);
				polyLineMearsure.layers.addTo(map);
				polyLineMearsure.points.pop();
			},
			dblclick :function(){
				polyLineMearsure.allPoints.push(polyLineMearsure.points);
				if(polyLineMearsure.contn){
					polyLineMearsure.contn = false;
				}
				map.off('mousedown', polyLineMearsure.click);
				map.off('mousemove',polyLineMearsure.mousemove);

				if(!onceMearsure){
					polyLineMearsure.contn = true;
				}else{
					map.off('dblclick', polyLineMearsure.dblclick);
					polyLineMearsure.polyLine = L.polyline([]);
					polyLineMearsure.points = [];
					map.doubleClickZoom.disable();
				}

				if(polyLineMearsure.contn){
					polyLineMearsure.polyLine = null;
					map.on('mousedown', polyLineMearsure.click);
					map.on('mousemove', polyLineMearsure.mousemove);

					polyLineMearsure.points = [];
					map.on('dblclick', polyLineMearsure.dblclick);
				}
			},
			removeEvent: function(){
				polyLineMearsure.polyLine = null;
				polyLineMearsure.points = null;
				map.off('mousedown', polyLineMearsure.__proto__.click);
				map.off('mousemove', polyLineMearsure.__proto__.mousemove);
				map.off('dblclick', polyLineMearsure.__proto__.dblclick);
			}
		};
		if(this.options.cuortLengthLayer){
			this.removeTo();
		}else{
			this._polyLineMearsure.init();
			this.options.cuortLengthLayer = this._polyLineMearsure.layers;
		}
	},
	_cutorPolyGon:function(){
		var map = this._map;
		var color = this.options.color;
		var fillColor = this.options.fillColor;
		var fillOpacity = this.options.fillOpacity;
		var onceMearsure = this.options.onceMearsure;
		var areaMeasure = this._areaMeasure = {
			allPoints: [],
			points:[],
			layers: L.layerGroup(),
			polygon: null,
			contn: false,
			init:function(){
				onceMearsure ? areaMeasure.contn = false : areaMeasure.contn = true;
				areaMeasure.points = [];
				areaMeasure.polygon = null;
				map.on('mousedown', areaMeasure.click);
				map.on('dblclick', areaMeasure.dblclick);
			},
			click:function(e){
				map.doubleClickZoom.disable();
				// 添加点信息
				areaMeasure.points.push(e.latlng);
				// 添加面
				map.on('mousemove', areaMeasure.mousemove);
			},
			//鼠标移动事件
			mousemove:function(e){
				areaMeasure.points.push(e.latlng);
				if(areaMeasure.polygon){
					map.removeLayer(areaMeasure.polygon);
				}
				//生成面
				areaMeasure.polygon = L.polygon(areaMeasure.points,{
					showMeasurements: true,
					color: color,
					weight: 3,
					fillColor: fillColor,
					fillOpacity: fillOpacity
				});
				areaMeasure.polygon.addTo(areaMeasure.layers);
				areaMeasure.layers.addTo(map);
				areaMeasure.points.pop();
			},
			dblclick:function(e){ // 双击结束
				areaMeasure.allPoints.push(areaMeasure.points);
				if(areaMeasure.contn){
					areaMeasure.contn = false;
				}

				map.off('mousedown', areaMeasure.click);
				map.off('mousemove', areaMeasure.mousemove);

				if(!onceMearsure){
					areaMeasure.contn = true;
				}else{
					map.off('dblclick', areaMeasure.dblclick);
				}

				if(areaMeasure.contn){
					areaMeasure.polygon = null;
					map.on('mousedown', areaMeasure.click);
					map.on('mousemove', areaMeasure.mousemove);

					areaMeasure.points = [];
					map.on('dblclick', areaMeasure.dblclick);
				}
			},
			removeEvent:function(){
				areaMeasure.polygon = null;
				areaMeasure.points = null;
				map.off('mousedown', areaMeasure.__proto__.click);
				map.off('mousemove', areaMeasure.__proto__.mousemove);
				map.off('dblclick', areaMeasure.__proto__.dblclick);
			}
		};
		if(this.options.cuortLayer){
			this.removeTo();
		}else{
			this._areaMeasure.init();
			this.options.cuortLayer = this._areaMeasure.layers;
		}
	},
	continueMearsure: function(){
		if(this._areaMeasure){
			this._areaMeasure.init();
		}
		if(this._polyLineMearsure){
			this._polyLineMearsure.init();
		}
	},
	removeTo:function(){
		var map = this._map;
		if(this._areaMeasure){
			this.options.cuortLayer.clearLayers();
			this.options.cuortLayer = null;
			if(this._areaMeasure){
				this._areaMeasure.removeEvent();
			}
		}
		if(this._polyLineMearsure){
			this.options.cuortLengthLayer.clearLayers();
			this.options.cuortLengthLayer = null;
			if(this._polyLineMearsure){
				this._polyLineMearsure.removeEvent();
			}
		}
		map.doubleClickZoom.enable();
	}
});

L.control.measureMap = function(options){
	return new L.Control.MeasureMap(options);
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: navControl
 * @prject:
 * @description: 说明文件的功能--请后续修改
 * @author: huangge
 * @date: 2017/7/20
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
	L.Control.NavControl = L.Control.extend({
		options:{
			position: 'topleft',
			offset:400, //平移距离（屏幕像素）,
			dragging :true
		},
		initialize: function (layer,options) {
			this._baselayer = layer;
			this.options.minZoom=map.options.minZoom;
			this.options.maxZoom=map.options.maxZoom;
			L.Util.extend(this.options, options)
		},
		onAdd: function (map) {
			this._map = map;
			map.navControl=this;
			map.removeControl(map.zoomControl);
			if (!this.options.center) {
				this.options.center = map.getCenter();
			}
			if (!this.options.zoom) {
				this.options.zoom = map.getZoom();
			}
			this._container = L.DomUtil.create('div', 'leaflet-control');

		//	创建鱼骨图
			this._navbar = this._createButton('div', ' ', 'navbar');
			this._allmap = this._createButton('div', ' ', 'allmap');
			this._allmapopen = this._createButton('span', '全图', 'allmap-open');

			this._navControl = this._createButton('div', ' ', 'navControl');
			this._gotop = this._createButton('div', '向上移动', 'go go-top');
			this._goright = this._createButton('div', '向右移动', 'go go-right');
			this._gobottom = this._createButton('div', '向下移动', 'go go-bottom');
			this._goleft = this._createButton('div', '向左移动', 'go go-left');

			this._level = this._createButton('div', ' ', 'level');
			this._leveltext = this._createButton('span', ' ', 'level-text');

			this._changebig = this._createButton('div', '放大', 'change-big');
			this._changesmall = this._createButton('div', '缩小', 'changes-mall');

			this._changeslidebase = this._createButton('div', ' ', 'change-slidebase');
			this._slidebut = this._createButton('div', ' ', 'slide-but');

			this._slideover = this._createButton('div', ' ', 'slide-over');

			this._allmap.appendChild(this._allmapopen);
			this._navbar.appendChild(this._allmap);

			this._navControl.appendChild(this._gotop)
			this._navControl.appendChild(this._goright)
			this._navControl.appendChild(this._gobottom)
			this._navControl.appendChild(this._goleft);
			this._navbar.appendChild(this._navControl);

			this._level.appendChild(this._leveltext);
			this._navbar.appendChild(this._level);

			this._navbar.appendChild(this._changebig);
			this._navbar.appendChild(this._changesmall);

			this._changeslidebase.appendChild(this._slidebut);
			this._navbar.appendChild(this._changeslidebase);

			this._navbar.appendChild(this._slideover);

			this._leveltext.innerText=map.getZoom();

			this._container.appendChild(this._navbar);

			L.DomEvent
				.on(this._navControl, 'dblclick', L.DomEvent.stopPropagation)
				.on(this._navControl, 'click', L.DomEvent.stop)
				.on(this._navControl, 'mouseover', this._radiuOverEvent, this)
				.on(this._navControl, 'click', this._radiuClickEvent, this)

				.on(this._allmap, 'dblclick', L.DomEvent.stopPropagation)
				.on(this._allmap, 'click', L.DomEvent.stop)
				.on(this._allmap, 'click', this._radiuOpenEvent, this)

				.on(this._changebig, 'dblclick', L.DomEvent.stopPropagation)
				.on(this._changebig, 'click', L.DomEvent.stop)
				.on(this._changebig, 'click', this._setbig, this)

				.on(this._changesmall, 'dblclick', L.DomEvent.stopPropagation)
				.on(this._changesmall, 'click', L.DomEvent.stop)
				.on(this._changesmall, 'click', this._setsmall, this)

				.on(this._changeslidebase, 'mousedown dblclick', L.DomEvent.stopPropagation)
				.on(this._slidebut, 'mousedown mousemove dblclick', L.DomEvent.stopPropagation)
				.on(this._slideover, 'mousedown dblclick', L.DomEvent.stopPropagation)

				.on(this._changesmall, 'click', L.DomEvent.stop)
				.on(this._slidebut, 'click', L.DomEvent.stop)
				.on(this._slideover, 'click', L.DomEvent.stop)


				.on(this._changesmall, 'click', this._setsmall, this)
				.on(this._changeslidebase, 'click', this._sliderclick, this)
				.on(this._slidebut, 'mousedown', this._setsliderBut, this);

			this.resetSilde();

			map.on('zoomend zoomlevelschange', this._zoomLevelsChange, this);
			map.on('zoomend',this.resetSilde,this);

			this._navbar.style.opacity = '0.5';
			L.DomEvent.on(this._navbar, 'mouseover', function(){
				this._navbar.style.opacity = '1';
			},this);
			L.DomEvent.on(this._navbar, 'mouseout', function(){
				this._navbar.style.opacity = '0.5';
			},this);
			return this._container;
		},
		_createButton: function(domtype, title, className) {
			if(domtype == 'div'){
				var link = L.DomUtil.create('div', className);
			}
			if(domtype == 'span'){
				var link = L.DomUtil.create('span', className);
			}
			link.title = title;

			return link;
		},
		_zoomLevelsChange:function(e){
			this._leveltext.innerText=map.getZoom();
		},
		_radiuOverEvent:function(){
			$(".navControl .go").mouseout(function(){
				$('.navControl').css({
					'background-position':'0px 0px'
				});
			});
			$(".navControl .go").bind("mouseover",function(){
				var classname = this.className;
				classname = classname.slice(6,classname.length);
				if(classname == 'top'){
					$('.navControl').css({
						'background-position':'0px -53px'
					});
				}
				else if(classname == 'right'){
					$('.navControl').css({
						'background-position':'0px -106px'
					});
				}
				else if(classname == 'bottom'){
					$('.navControl').css({
						'background-position':'0px -159px'
					});
				}
				else if(classname == 'left'){
					$('.navControl').css({
						'background-position':'0px -212px'
					});
				}
			});
		},
		_radiuClickEvent:function(e){
			var classname = e.target.className;
			classname = classname.slice(6,classname.length);
			var point;
			if(classname == 'top'){
				 point = L.point(0, map.navControl.options.offset);
			}
			else if(classname == 'right'){
				point = L.point(map.navControl.options.offset,0);
			}
			else if(classname == 'bottom'){
				point = L.point(0,-(map.navControl.options.offset));
			}
			else if(classname == 'left'){
				point = L.point(-(map.navControl.options.offset),0);
			}
			map.panBy(point);
		},
		_radiuOpenEvent:function(){
			var max = this.options.maxZoom;
			var min = this.options.minZoom;
			var thiszoom = this.options.zoom
			map.setView([this.options.center.lat, this.options.center.lng], this.options.zoom);
			this.setAnimation(max,min,thiszoom);
		},
		_setbig:function(){
			var max = this.options.maxZoom;
			var min = this.options.minZoom;
			var thiszoom = map.getZoom();
			if(max == thiszoom){
				return ;
			}else{
				thiszoom++;
				map.setZoom(thiszoom);
				this.setAnimation(max,min,thiszoom);
			}
		},
		_setsmall:function(){
			var min = this.options.minZoom;
			var max = this.options.maxZoom;
			var thiszoom = map.getZoom();
			if(min == thiszoom){
				return ;
			}else{
				thiszoom--;
				map.setZoom(thiszoom);
				this.setAnimation(max,min,thiszoom);
			}
		},
		resetSilde:function(){
			var min = this.options.minZoom;
			var max = this.options.maxZoom;
			var thiszoom = map.getZoom();
			this.setAnimation(max,min,thiszoom);
		},
		setAnimation:function(max,min,thiszoom){
			var sliderHeight = (max-min+1)*7+4;
			var slidButTop = (max-thiszoom)*7-0.5;
			var slidButHeight = 75+20+5.5+slidButTop+5;
			var smalltop = 75 + 18 + sliderHeight;
			var slideOverHeight = (thiszoom-min+1)*7;
			this._changeslidebase.style.height = sliderHeight + 'px';
			this._changesmall.style.top = smalltop + 'px';
			this._slidebut.style.top = slidButTop + 'px';
			this._slideover.style.height = slideOverHeight + 'px';
			this._slideover.style.top = slidButHeight + 'px';
			if(max == thiszoom){
				this._slidebut.style.marginTop = '2px';
			}else{
				this._slidebut.style.marginTop = '0px';
			}
		},
		_setsliderBut:function(e){
			var thisL = this;
			this.options.dragging = true;
			this.draggingmap();
			var min = this.options.minZoom;
			var max = this.options.maxZoom;
			var e = e || window.event;
			var slideButTop;
			var slideBut = this._slidebut;
			thisL._map.on("mousemove",this._mapMouseMove);
			thisL._map.on("mouseup",this._mapMouseUp);
			slideBut.onmouseup = function(){
				thisL._map.off("mousemove",this._mapMouseMove);
				slideBut.onmousemove = null;
				slideBut.onmouseup = null;
				thisL._map.options.dragging = false;
				thisL.draggingmap();
				slideBut.onmouseup=null;
			};
		},
		_mapMouseUp:function(e){
			map.off("mousemove",map.navControl._mapMouseMove);
			var min = this.options.minZoom;
			var max = this.options.maxZoom;
			var slideButTop=map.navControl._slidebut.style.top;
			slideButTop=parseInt(slideButTop.substr(0,slideButTop.length-2));
			var thiszoom = max - (slideButTop/7).toFixed(0);
			map.navControl.setAnimation(max,min,thiszoom);
			map.setZoom(thiszoom);
			map.navControl.options.dragging = false;
			map.navControl.draggingmap();
			map.off("mouseup",this._mapMouseUp);
		},
		_mapMouseMove:function(e){
			var min = this.options.minZoom;
			var max = this.options.maxZoom;
			var slideButTop;
			if(e.containerPoint.y - 75 - 34<=0){
				slideButTop=0;
			}else  if(e.containerPoint.y - 75 - 34>=(max-min)*7){
				slideButTop=(max-min)*7;
			}else {
				slideButTop =e.containerPoint.y - 75 - 34;
			}
			var movezoom = max - (slideButTop/7).toFixed(0);
			map.navControl.setAnimation(max,min,movezoom);
			map.navControl._slidebut.style.top = slideButTop + 'px';
			map.navControl.draggingmap();
		},
		draggingmap:function(){
			if(this.options.dragging){
				map.dragging.disable();
			}else{
				map.dragging.enable();
			}
		},
		_sliderclick:function(e){
			var min = this.options.minZoom;
			var max = this.options.maxZoom;
			var e = e || window.event;
			var slideButTop = e.clientY - 75 - 34;
			var movezoom = max - (slideButTop/7).toFixed(0);
			this.setAnimation(max,min,movezoom);
			this._slidebut.style.top = slideButTop + 'px';
			this.setAnimation(max,min,movezoom);
			map.setZoom(movezoom);
		}
	});
	L.control.navControl = function(layer,options){
		return new L.Control.NavControl(layer,options);
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) module.exports = simpleheat;

function simpleheat(canvas) {
	if (!(this instanceof simpleheat)) return new simpleheat(canvas);

	this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

	this._ctx = canvas.getContext('2d');
	this._width = canvas.width;
	this._height = canvas.height;

	//强度，范围值（0-1）
	this._max = 1;
	this._data = [];
}
simpleheat.prototype = {
	defaultRadius: 25,
	defaultGradient: {
		.4: "blue",
		.6: "cyan",
		.7: "lime",
		.8: "yellow",
		1 : "red"
	},
	data: function (data) {
		this._data = data;
		return this;
	},

	max: function (max) {
		this._max = max;
		return this;
	},

	add: function (point) {
		this._data.push(point);
		return this;
	},

	clear: function () {
		this._data = [];
		return this;
	},
	radius: function (r, blur) {
		blur = blur === undefined ? 15 : blur;
		var circle = this._circle = document.createElement("canvas"),
			ctx = circle.getContext('2d'),
		//r2和this._r指绘制的（圆的的半径+阴影模糊级数）的和
			r2 = this._r = r + blur;

		circle.width = circle.height = r2 * 2;
		//阴影距离形状的水平和垂直距离
		ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
		//shadowBlur阴影的模糊值越大，红色区域就越小
		ctx.shadowBlur = blur;//阴影的模糊级别
		ctx.shadowColor = 'black';//阴影颜色

		ctx.beginPath();
		//参数表示圆中心的x坐标，y坐标，半径，起始角度，结束角度，顺时针/逆时针
		ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();

		return this;
	},
	gradient: function(grad) {
		var canvas = document.createElement("canvas"),
			ctx = canvas.getContext('2d'),
		//线性渐变的参数，渐变开始的x，y坐标，结束的x，y坐标
			gradient = ctx.createLinearGradient(0, 0, 0, 256);

		canvas.width = 1;
		canvas.height = 256;

		for (var i in grad) {
			//定义渐变的样式，范围值（0-1），这里渲染的顺序是1，0.4，0.6，0.7，0.8
			gradient.addColorStop(+i, grad[i]);
		}

		ctx.fillStyle = gradient;
		//填充画布，参数分别是左上角的x，y坐标，绘制画布的宽和高
		ctx.fillRect(0, 0, 1, 256);

		//复制ctx的内容的像素数据，参数分别是复制内容的左上角的x，y坐标，将要复制的画布的宽和高
		//这里的.data得到4个值，分别是r，g，b，a（alpha通道）
		this._grad = ctx.getImageData(0, 0, 1, 256).data;

		return this;
	},
	draw: function (minOpacity) {
		//minOpacity = ;
		if (!this._circle)
			this.radius(this.defaultRadius);
		if (!this._grad)
			this.gradient(this.defaultGradient);

		var ctx = this._ctx;

		ctx.clearRect(0, 0, this._width, this._height);

		// draw a grayscale heatmap by putting a blurred circle at each data point
		for (var i = 0, len = this._data.length, p; i < len; i++) {
			//获取屏幕坐标和透明度值
			p = this._data[i];
			//返回当前绘制的透明度
			ctx.globalAlpha = Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity);
			//在画布上绘制圆，参数分别代表，当前的圆，画布上放置圆的x坐标，y坐标
			ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
		}

		// colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
		//复制ctx的内容的像素数据，参数分别是复制内容的左上角的x，y坐标，将要复制的画布的宽和高，这里的还和高代表整个画布宽和高
		var colored = ctx.getImageData(0, 0, this._width, this._height);
		//colored.data一个data包含4个值，总共赋值的像素是800*600的面积。总共有800*600*4=1920000个数组
		this._colorize(colored.data, this._grad);
		//将复制的像素数据绘制的画布上面
		ctx.putImageData(colored, 0, 0);

		return this;
	},
	//将展示到画布上的圆的rgba值替换到整个画布中对应的rgba值
	_colorize: function (pixels, gradient) {
		for (var i = 0, len = pixels.length, j; i < len; i += 4) {
			j = pixels[i + 3] * 4; // get gradient color from opacity value

			if (j) {
				pixels[i] = gradient[j];
				pixels[i + 1] = gradient[j + 1];
				pixels[i + 2] = gradient[j + 2];
			}
		}
	},
};
L.HeatLayer = (L.Layer ? L.Layer: L.Class).extend({
	initialize: function(t,options) {
		this._latlngs = t,
			L.setOptions(this, options);
	},
	setLatLngs: function(t) {
		return this._latlngs = t,
			this.redraw();
	},
	addLatLng: function(t) {
		return this._latlngs.push(t),
			this.redraw();
	},
	setOptions: function(t) {
		return L.setOptions(this, t),
		this._heat && this._updateOptions(),
			this.redraw();
	},
	redraw: function() {
		return ! this._heat || this._frame || this._map._animating || (this._frame = L.Util.requestAnimFrame(this._redraw, this)),
			this;
	},
	onAdd: function(map) {
		this._map = map;
		this._canvas || this._initCanvas(),
			map._panes.overlayPane.appendChild(this._canvas),
			map.on("moveend", this._reset, this),
		map.options.zoomAnimation && L.Browser.any3d && map.on("zoomanim", this._animateZoom, this);
		this._reset();
	},
	mapremove: function(heat) {
		var map = heat._map;
		if(heat._canvas){
			map.getPanes().overlayPane.removeChild(heat._canvas);
		}
		map.off("moveend", this._reset, this),
		map.options.zoomAnimation && map.off("zoomanim", this._animateZoom, this);
	},
	onReset:function(heat,addressPointss,options){
		var map = heat._map;
		if(map.getPanes().overlayPane.children.length == 0){
			map.getPanes().overlayPane.appendChild(heat._canvas);
		}
		heat.setOptions(options);
		heat.setLatLngs(addressPointss);
		heat.redraw();
	},
	addTo: function(map) {
		return map.addLayer(this),
			this;
	},
	_initCanvas: function() {
		var t = this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer leaflet-layer"),
			i = L.DomUtil.testProp(["transformOrigin", "WebkitTransformOrigin", "msTransformOrigin"]);
		t.style[i] = "50% 50%";
		var a = this._map.getSize();
		t.width = a.x,
			t.height = a.y;
		var s = this._map.options.zoomAnimation && L.Browser.any3d;
		L.DomUtil.addClass(t, "leaflet-zoom-" + (s ? "animated": "hide")),
			this._heat = simpleheat(t),
			this._updateOptions()
	},
	_updateOptions: function() {
		this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur),
		this.options.gradient && this._heat.gradient(this.options.gradient),
		this.options.max && this._heat.max(this.options.max)
	},
	_reset: function() {
		var t = this._map.containerPointToLayerPoint([0, 0]);
		L.DomUtil.setPosition(this._canvas, t);
		var i = this._map.getSize();
		this._heat._width !== i.x && (this._canvas.width = this._heat._width = i.x),
		this._heat._height !== i.y && (this._canvas.height = this._heat._height = i.y),
			this._redraw();
	},
	_redraw: function() {
		var t, i, a, s, e, n, h, o, r, d = [],
			_ = this._heat._r,
			l = this._map.getSize(),
			m = new L.Bounds(L.point([ - _, -_]), l.add([_, _])),
			c = void 0 === this.options.max ? 1 : this.options.max,
			u = void 0 === this.options.maxZoom ? this._map.getMaxZoom() : this.options.maxZoom,
			f = 1 / Math.pow(2, Math.max(0, Math.min(u - this._map.getZoom(), 12))),
			g = _ / 2,
			p = [],
			v = this._map._getMapPanePos(),
			w = v.x % g,
			y = v.y % g;

		for (t = 0, i = this._latlngs.length; i > t; t++){
			var point = [this._latlngs[t][0],this._latlngs[t][1]];
			if (a = this._map.latLngToContainerPoint(point), m.contains(a)) {
				e = Math.floor((a.x - w) / g) + 2,
					n = Math.floor((a.y - y) / g) + 2;
				var x=void 0!==this._latlngs[t].alt?this._latlngs[t].alt:void 0!==this._latlngs[t][2]?+this._latlngs[t][2]:1;
				r = x * f,
					p[n] = p[n] || [],
					s = p[n][e],
					s ? (s[0] = (s[0] * s[2] + a.x * r) / (s[2] + r), s[1] = (s[1] * s[2] + a.y * r) / (s[2] + r), s[2] += r) : p[n][e] = [a.x, a.y, r]
			}
		}
		for (t = 0, i = p.length; i > t; t++){
			if (p[t]){
				for (h = 0, o = p[t].length; o > h; h++){
					s = p[t][h],
					s && d.push([Math.round(s[0]), Math.round(s[1]), Math.min(s[2], c)]);
				}
			}
		}
		//绘制,d的值是屏幕坐标加上透明度
		this._heat.data(d).draw(this.options.minOpacity);
		this._frame = null;
	},
	_animateZoom: function(t) {
		var i = this._map.getZoomScale(t.zoom),
			a = this._map._getCenterOffset(t.center)._multiplyBy( - i).subtract(this._map._getMapPanePos());
		L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, a, i) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(a) + " scale(" + i + ")"
	}
});
L.heatLayer = function(t, options) {
	return new L.HeatLayer(t, options);
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: scatter
 * @prject:
 * @description: 散点图
 * @author: huangge
 * @date: 2017/7/26
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
/*将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)*/
function colorRgb(sColor) {
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var sColor = sColor.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return sColorChange;
	} else {
		return sColor;
	}
}

/*将rgb表示方式转换为hex表示方式*/
function colorHex(rgb) {
	var _this = rgb;
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if (/^(rgb|RGB)/.test(_this)) {
		var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = _this;
		}
		return strHex;
	} else if (reg.test(_this)) {
		var aNum = _this.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return _this;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return _this;
	}
}

function gradientColor(startColor, endColor, step) {
	var startRGB = colorRgb(startColor);//转换为rgb数组模式
	var startR = startRGB[0];
	var startG = startRGB[1];
	var startB = startRGB[2];

	var endRGB =colorRgb(endColor);
	var endR = endRGB[0];
	var endG = endRGB[1];
	var endB = endRGB[2];

	var sR = (endR - startR) / step;//总差值
	var sG = (endG - startG) / step;
	var sB = (endB - startB) / step;

	var colorArr = [];
	for (var i = 0; i < step; i++) {
		/*计算每一步的hex值*/
		var hex = colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
		colorArr.push(hex);
	}
	return colorArr;
}
/*
 canvasLayer
 */
L.DomUtil.setTransform = L.DomUtil.setTransform || function (el, offset, scale) {
		var pos = offset || new L.Point(0, 0);

		el.style[L.DomUtil.TRANSFORM] =
			(L.Browser.ie3d ?
			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
			(scale ? ' scale(' + scale + ')' : '');
	};

L.CanvasLayer = (L.Layer ? L.Layer : L.Class).extend({
	// -- initialized is called on prototype
	initialize: function (options) {
		this._map    = null;
		this._canvas = null;
		this._frame  = null;
		this._delegate = null;
		L.setOptions(this, options);
	},

	delegate :function(del){
		this._delegate = del;
		return this;
	},

	needRedraw: function () {
		if (!this._frame) {
			this._frame = L.Util.requestAnimFrame(this.drawLayer, this);
		}
		return this;
	},

	//-------------------------------------------------------------
	_onLayerDidResize: function (resizeEvent) {
		this._canvas.width = resizeEvent.newSize.x;
		this._canvas.height = resizeEvent.newSize.y;
	},
	//-------------------------------------------------------------
	_onLayerDidMove: function () {
		var topLeft = this._map.containerPointToLayerPoint([0, 0]);
		L.DomUtil.setPosition(this._canvas, topLeft);
		this.drawLayer();
	},
	//-------------------------------------------------------------
	getEvents: function () {
		var events = {
			resize: this._onLayerDidResize,
			moveend: this._onLayerDidMove,
			mousemove:this._mapMousemove,
		};
		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			events.zoomanim =  this._animateZoom;
		}

		return events;
	},
	_mapMousemove:function(){

	},
	//-------------------------------------------------------------
	onAdd: function (map) {
		this._map = map;
		this._canvas = L.DomUtil.create('canvas', 'leaflet-layer');
		this.tiles = {};

		var size = this._map.getSize();
		this._canvas.width = size.x;
		this._canvas.height = size.y;

		var animated = this._map.options.zoomAnimation && L.Browser.any3d;
		L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

		map._panes.overlayPane.appendChild(this._canvas);
		this._onLayerDidMove();
		map.on(this.getEvents(),this);

		var del = this._delegate || this;
		del.onLayerDidMount && del.onLayerDidMount(); // -- callback
		this.needRedraw();
	},

	//-------------------------------------------------------------
	onRemove: function (map) {
		var del = this._delegate || this;
		del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback


		map.getPanes().overlayPane.removeChild(this._canvas);

		map.off(this.getEvents(),this);

		this._canvas = null;

	},

	//------------------------------------------------------------
	addTo: function (map) {
		map.addLayer(this);
		return this;
	},
	// --------------------------------------------------------------------------------
	LatLonToMercator: function (latlon) {
		return {
			x: latlon.lng * 6378137 * Math.PI / 180,
			y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
		};
	},

	//------------------------------------------------------------------------------
	drawLayer: function () {
		// -- todo make the viewInfo properties  flat objects.
		var size   = this._map.getSize();
		var bounds = this._map.getBounds();
		var zoom   = this._map.getZoom();

		var center = this.LatLonToMercator(this._map.getCenter());
		var corner = this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize()));

		var del = this._delegate || this;
		del.onDrawLayer && del.onDrawLayer( {
			layer : this,
			canvas: this._canvas,
			bounds: bounds,
			size: size,
			zoom: zoom,
			center : center,
			corner : corner
		});
		this._frame = null;
	},
	// -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
	//------------------------------------------------------------------------------
	_setTransform: function (el, offset, scale) {
		var pos = offset || new L.Point(0, 0);

		el.style[L.DomUtil.TRANSFORM] =
			(L.Browser.ie3d ?
			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
			(scale ? ' scale(' + scale + ')' : '');
	},

	//------------------------------------------------------------------------------
	_animateZoom: function (e) {
		var scale = this._map.getZoomScale(e.zoom);
		// -- different calc of offset in leaflet 1.0.0 and 0.0.7 thanks for 1.0.0-rc2 calc @jduggan1
		var offset = L.Layer ? this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center) :
			this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

		L.DomUtil.setTransform(this._canvas, offset, scale);


	}
});

L.canvasLayer = function () {
	return new L.CanvasLayer();
};

/***
 * 散点图,颜色分段专题图图例
 */
L.Control.VisualMap = L.Control.extend({
	includes: L.Mixin.Events,
	options:{
		position:'bottomright',
	},
	initialize: function (options) {
		L.Util.extend(this.options, options);
	},
	onAdd: function (map) {
		this._container= L.DomUtil.create('div', 'leaflet-control');
		//获取颜色数组
		this._colorArray=this.options.colorArray;
		//创建dom
		this._cirleTop = this._createButton('div', 'circle-top');
		this._cirleTop.setAttribute('id','circle-top');
		this._cirleTop.setAttribute('data-attr', this.options.maxValue);
		this._colorBottom = this._createButton('div', 'circle-bottom');
		this._colorBottom.setAttribute('id','circle-bottom');
		this._colorBottom.setAttribute('data-attr', this.options.minValue);

		this._cirleTop.style.borderBottomColor = this.options.maxcolor;
		this._colorBottom.style.borderTopColor = this.options.mincolor;

		//判断是柱形渲染图例还是散点图例，并创建中间的图例
		if(this.options.type === 'rendermap'){
			this._contenter = this._createButton('div', 'content-render');
			this._contenter.setAttribute('id','content-render');
			this._contenter.style.background = this.options.maxcolor;
			this._contenter.style.background = '-moz-linear-gradient(top, ' + this.options.maxcolor + ', ' + this.options.mincolor + ')';
			this._contenter.style.background = '-webkit-gradient(linear, 0 0, 0 bottom, from('+this.options.maxcolor+'), to(' + this.options.mincolor + '))';
			this._contenter.style.background = '-o-linear-gradient(top, ' + this.options.maxcolor + ', ' + this.options.mincolor +')';
		}
		else if(this.options.type === 'scatter'){
			this._contenter = this._createButton('div', 'content-scatter');
			this._contenter.setAttribute('id','content-scatter');
			this._contenter.style.borderTopColor = this.options.maxcolor;
			//判断图例的位置
			if(this.options.position == 'topleft' || this.options.position == 'bottomleft'){
				this._contenter.setAttribute('class','content-scatter content-scatter-left');
			}
			else if(this.options.position == 'topright' || this.options.position == 'bottomright'){
				this._contenter.setAttribute('class','content-scatter content-scatter-right');
			}
		}

		this._mark = this._createButton('span', 'mark');
		this._mark.setAttribute('id','mark');

		this._coverControl = this._createButton('div', 'coverControl');
		this._controlrectancle = this._createButton('div', 'control');
		this._controlrectancle.setAttribute('id','control');

		this._container.appendChild(this._cirleTop);
		this._container.appendChild(this._contenter);
		this._container.appendChild(this._colorBottom);
		this._container.appendChild(this._mark);
		this._container.appendChild(this._coverControl);
		this._coverControl.appendChild(this._controlrectancle);

		this._mark.style.display = 'none';
		this._controlrectancle.style.display = 'none';

		if(this.options.type === 'scatter'){
			this._colorBottom.style.borderTopColor = this.options.maxcolor;
		}
		//判断图例的位置，调整图例
		if(this.options.position == 'topleft' || this.options.position == 'bottomleft'){
			this._container.style.left = '20px';
			this._cirleTop.setAttribute('class','circle-top circle-top-left');
			this._cirleTop.style.left = '50%';
			this._cirleTop.style.marginRight = '-15px';
			if(this.options.maxValue.length == undefined || this.options.minValue.length == undefined){
				var topleft = this.options.maxValue.toString().replace('.','').length + 3;
				var bottomleft = this.options.minValue.toString().replace('.','').length + 3;
			}else{
				var topleft = this.options.maxValue.length + 2;
				var bottomleft = this.options.minValue.length + 2;
			}
			document.styleSheets[0].addRule('.circle-top::after', 'left:'+ topleft +'px');
			this._contenter.style.right = '50%';
			this._colorBottom.setAttribute('class','circle-bottom circle-bottom-left');
			this._colorBottom.style.left = '50%';
			this._colorBottom.style.marginRight = '-15px';
			document.styleSheets[0].addRule('.circle-bottom::after', 'left:'+ bottomleft +'px');
			this._controlrectancle.setAttribute('class','control control-left');
			this._mark.setAttribute('class','mark mark-left');
		}
		else if(this.options.position == 'topright' || this.options.position == 'bottomright'){
			this._container.style.right = '20px';
			this._cirleTop.setAttribute('class','circle-top circle-top-right');
			this._cirleTop.style.right = '50%';
			this._cirleTop.style.marginLeft = '15px';
			if(this.options.maxValue.length == undefined || this.options.minValue.length == undefined){
				var topright = this.options.maxValue.toString().replace('.','').length*8 + 5;
				var bottomleft = this.options.minValue.toString().replace('.','').length*8 + 5;
			}else{
				var topright = this.options.maxValue.length*8;
				var bottomleft = this.options.minValue.length*8;
			}
			document.styleSheets[0].addRule('.circle-top::after', 'right:'+ topright +'px');
			this._contenter.style.left = '50%';
			this._colorBottom.setAttribute('class','circle-bottom circle-bottom-right');
			this._colorBottom.style.right = '50%';
			this._colorBottom.style.marginLeft = '15px';
			document.styleSheets[0].addRule('.circle-bottom::after', 'right:'+ bottomleft +'px');
			this._controlrectancle.setAttribute('class','control control-right');
			this._mark.setAttribute('class','mark mark-right');
		}

		L.DomEvent
			.on(this._contenter, 'dblclick', L.DomEvent.stopPropagation)
			.on(this._contenter, 'mousemove', L.DomEvent.stop);
		//图例触发事件
		L.DomEvent.on(this._contenter, 'mouseover', this.setcontrolOver, this);
		L.DomEvent.on(this._contenter, 'mouseout', this.setcontrolOut, this);

		return this._container;
	},
	_createButton: function(domtype,className) {
		if(domtype == 'div'){
			var link = L.DomUtil.create('div', className);
		}
		if(domtype == 'span'){
			var link = L.DomUtil.create('span', className);
		}
		return link;
	},
	//取消事件
	removeEvent: function(){
		L.DomEvent
			.off(this._contenter, 'dblclick', L.DomEvent.stopPropagation)
			.off(this._contenter, 'mousemove', L.DomEvent.stop);
		L.DomEvent.off(this._contenter, 'mouseover', this.setcontrolOver, this);
		L.DomEvent.off(this._contenter, 'mouseout', this.setcontrolOut, this);
	},
	//图例的鼠标滑过事件，并返回该区域的权值。
	setcontrolOver:function(e){
		var e = e || window.event;
		this._controlrectancle.style.display = 'block';
		this._mark.style.display = 'block';
		var _controlrectancle = this._controlrectancle;
		var _coverControl = this._coverControl;
		var _mark = this._mark;
		var maxValue = this.options.maxValue;
		var minValue = this.options.minValue;
		var colorArray = this._colorArray;
		var position = this.options.position;
		var scatterColor = this.options.maxcolor;
		var type = this.options.type;
		var visualMap=this;
		this._contenter.onmousemove = function(e){
			var e = e || window.event;
			var trueTop = e.layerY;
			var controlretopPx = trueTop-7.5;
			_controlrectancle.style.top =  controlretopPx+'px';
			_mark.style.top =controlretopPx + 15 + 'px';
			if(maxValue < 1 || minValue < 1){
				var thisStep = parseFloat((maxValue-minValue)/150);
				thisStep = (thisStep*(150-trueTop) + parseFloat(minValue)).toFixed(2);
			}else{
				var thisStep = (maxValue-minValue)/150;
				thisStep = parseInt((thisStep*(150-trueTop)).toFixed(0)) + parseInt(minValue);
			}
			//判断图例的位置，调整并渲染当前指向的权值
			if(position == 'topleft' || position == 'bottomleft'){
				_coverControl.style.left = '13px';
				_controlrectancle.setAttribute('class','control control-left');
				_controlrectancle.style.left = '0px';
				_mark.innerHTML = '≈' + thisStep;
				if(type === 'rendermap'){
					_controlrectancle.style.borderLeftColor = colorArray[colorArray.length-trueTop];
				}
				else if(type === 'scatter'){
					_controlrectancle.style.borderLeftColor = scatterColor;
				}
			}
			else if(position == 'topright' || position == 'bottomright'){
				_controlrectancle.setAttribute('class','control control-right');
				_controlrectancle.style.right = '0px';
				_mark.innerHTML = thisStep + '≈';
				if(type === 'rendermap'){
					_controlrectancle.style.borderRightColor = colorArray[colorArray.length-trueTop];
				}
				else if(type === 'scatter'){
					_controlrectancle.style.borderRightColor = scatterColor;
				}
			}
			if (typeof visualMap.options.highLightFun=== 'function') {
				visualMap.options.highLightFun(thisStep);
			}
			return thisStep;
		}
	},
	setcontrolOut:function(){
		this._mark.style.display = 'none';
		this._controlrectancle.style.display = 'none';
		if (typeof this.options.resetStyleFun=== 'function') {
			this.options.resetStyleFun();
		}
	},
	//获取地图块的权值，高亮图例
	getcontrol:function(value){
		if(value == null){
			this._mark.style.display = 'none';
			this._controlrectancle.style.display = 'none';
			return;
		}else{
			this._controlrectancle.style.display = 'block';
			this._mark.style.display = 'block';
			var maxValue = this.options.maxValue;
			var minValue = this.options.minValue;
			var colorArray = this._colorArray;
			var position = this.options.position;
			var type = this.options.type;
			var scatterColor = this.options.maxcolor;

			if(value < 1){
				var thisStep = ((maxValue-minValue)/150).toFixed(4);
				thisStep = (150 - (value - minValue)/thisStep).toFixed(2);
				this._controlrectancle.style.top =  thisStep - 7.5 + 'px';
				this._mark.style.top =  parseFloat(thisStep) + 7.5 + 'px';
			}
			else{
				var thisStep = (maxValue-minValue)/150;
				thisStep = parseInt(150 - (value - parseInt(minValue))/thisStep);
				this._controlrectancle.style.top =  thisStep - 7.5 + 'px';
				this._mark.style.top =  thisStep + 7.5 + 'px';
			}
			if(position == 'topleft' || position == 'bottomleft'){
				this._controlrectancle.style.left = '0.5px';
				this._coverControl.style.left = '12.5px';
				this._mark.innerHTML = value<1 ?  '≈' + value.toFixed(2) : '≈' + value.toFixed(0);
				this._controlrectancle.setAttribute('class','control control-right');
				this._mark.style.marginLeft = '14px';
				if(type === 'rendermap'){
					this._controlrectancle.style.borderRightColor = colorArray[colorArray.length-1-(parseInt(thisStep)).toFixed(0)];
				}
				else if(type === 'scatter'){
					this._controlrectancle.style.borderRightColor = scatterColor;
				}
			}
			else if(position == 'topright' || position == 'bottomright'){
				this._controlrectancle.style.right = '0.5px';
				this._mark.innerHTML = value<1 ? value.toFixed(2) + '≈' : value.toFixed(0) + '≈';
				this._controlrectancle.setAttribute('class','control control-left');
				this._mark.style.marginRight = '14px';
				if(type === 'rendermap'){
					this._controlrectancle.style.borderLeftColor = colorArray[colorArray.length-1-(parseInt(thisStep)).toFixed(0)];
				}
				else if(type === 'scatter'){
					this._controlrectancle.style.borderLeftColor = scatterColor;
				}
			}
		}
	}
});
L.control.visualMap = function(options){
	return new L.Control.VisualMap(options);
};

/**
 * 提示框
 */
L.Tooltip = L.Class.extend({
	initialize: function (map) {
		this._map = map;
		this._drawControlTooltips = true;
		this._popupPane = this._map._panes.popupPane;
		this._visible = false;
		this._container = this._drawControlTooltips ?
			L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null;
		this._map.on('mouseout', this._onMouseOut, this);
		this._map.on('mousemove', this._onMouseMove, this);
	},
	includes: L.Mixin.Events,
	_onMouseMove: function (e) {
		var pos = this._map.latLngToLayerPoint(e.latlng),
			tooltipContainer = this._container;
		if (this._container) {
			if (this._visible) {
				tooltipContainer.style.visibility = 'inherit';
			}
			L.DomUtil.setPosition(tooltipContainer, pos);
		}
	},
	close: function () {
		this._map.off('mouseout', this._onMouseOut, this);
		this._map.off('mousemove', this._onMouseMove, this);
		if (this._container) {
			this._popupPane.removeChild(this._container);
			this._container = null;
		}
	},
	setText: function (labelText) {
		//控制隐藏和显示,填充文字
		this._container.innerHTML = '<span>' + labelText + '</span>';

		this._visible = true;
		this._container.style.visibility = 'inherit';

		return this;
	},
	_onMouseOut: function () {
		if (this._container) {
			this._container.style.visibility = 'hidden';
		}
	}
});

L.Map.include({
	openToolTip:function(text){
		if (!this._tooltip) {
			this._tooltip = new L.Tooltip(this);
		}
		this._tooltip.setText(text);
	},
	closeToolTip:function(){
		if(this._tooltip){
			this._tooltip.close();
			this._tooltip=null;
		}
	},
	setToolTipText:function(text){
		if (!this._tooltip) {
			this._tooltip = new L.Tooltip(this);
		}
		this._tooltip.setText(text);
	}
});

/*数据处理，将name，权值，坐标处理后放在一个数组里面，同时处理得到权值的数组以及得到最大最小值，并返回这些数据。
 形参：包含权值的数据，数据点的坐标，处理数据的属性名
 */
function setdata(data,dataValue){
	var cityContent = [];
	for(var i=0,len=data.features.length; i<len; i++){
		var latlng = data.features[i].geometry.coordinates;
		if (latlng) {
			cityContent.push({
				name: data.features[i].properties.name,
				value: latlng.concat(data.features[i].properties[dataValue])
			});
		}
	};
	Array.prototype.max = function(){
		return Math.max.apply({},this)
	};
	Array.prototype.min = function(){
		return Math.min.apply({},this)
	};
	var allValue = [];
	for(var i=0; i<cityContent.length; i++){
		allValue.push(cityContent[i].value[2])
	}
	function sortNumber(a,b)
	{   return a - b;   }
	allValue = allValue.sort(sortNumber);

	var maxValue = parseInt(allValue.max().toFixed(0));
	var minValue = parseInt(allValue.min().toFixed(0));

	var getdata = [];
	getdata.push(cityContent,allValue,maxValue,minValue);
	return getdata;
}

/*设置标记点的大小。返回当前标记点的大小
 形参：当前标记的权值，标记的最大值，最小值，权值的最大值，最小值
 */
function setRadiuSize(value,maxRadiuSize,minRadiuSize,maxValue,minValue){
	var stepcolor = (maxRadiuSize-minRadiuSize)/150;
	var step = (maxValue-minValue)/150;
	var size = parseInt(((value-parseInt(minValue))/step)*stepcolor) + minRadiuSize;
	if(size>maxRadiuSize){
		size = maxRadiuSize;
	}
	if(size<minRadiuSize){
		size = minRadiuSize;
	}
	return size;
}
/**
 * 散点高亮动画
 */
L.CanvasLayer.PointAnimate = L.CanvasLayer.extend({
	options:{
		maxRadiuSize: 20,//散点最大半径
		minRadiuSize: 3,//散点最小半径
		highAnimateColor:'#DD5347',
		legendShow: true,//是否显示图例
		highAnimate: true,//是否让数据前多少名产生高亮动画
		dataNum: 5,
		type: "scatter",
	},
	initialize: function(options) {
		L.Util.extend(this.options, options);
		this._allPoint = [];
		this._data = [];
		var data = setdata(this.options.data,this.options.dataValue);
		this._cityContent = data[0];
		this._allValue = data[1];
		this.options.maxValue = data[2];
		this.options.minValue = data[3];
	},
	includes: L.Mixin.Events,
	onAdd: function (map) {
		this._map = map;
		this._showPoint = false;
		L.CanvasLayer.prototype.onAdd.call(this,map);
		if(this.options.legendShow){
			this._legend = this._createButton('div', 'content-legend',this);
			this._legendText = this._createButton('div', 'content-text',this);
			this._legendContent = this._createButton('div', 'content-point',this);
			this._addLegend();
		};
	},
	_createButton: function(domtype,className,context) {
		var link = L.DomUtil.create('div', className);
		if(className=="content-point"){
			var stop = L.DomEvent.stopPropagation;
			L.DomEvent
				.on(link, 'click', stop)
				.on(link, 'mousedown', stop)
				.on(link, 'dblclick', stop)
				.on(link, 'click', L.DomEvent.preventDefault)
				.on(link, 'click', this._setPointRemove, context);
		}
		return link;
	},
	_mapMousemove: function(e){
		var thisL = this;
		var map = this._map;
		var hasHover=false;
		for(var i=this._data.length-1;i>-1;i--){
			var c = this._data [i];
			var isContains=((e.containerPoint.x-c.points.x)*(e.containerPoint.x-c.points.x)+(e.containerPoint.y-c.points.y)*(e.containerPoint.y-c.points.y)<=c.radius*c.radius);
			if(isContains&& (!hasHover)){
				c.isHover = true;
				thisL._addTooltip(c.name,c.value)
				hasHover=true;
			}else{
				if(c.isHover){
					c.isHover = false;
					hasHover=false;
					map.closeToolTip();
				}
			}
		}
	},
	onDrawLayer:function(info){
		var map = this._map;
		var thisL = this;
		this._allPoint = [];
		this._data = [];
		var canvas = this._highPointsLayer = info.canvas;
		var ctx = this._highPointsctx = canvas.getContext('2d');
		var backDom;
		this._highPointsctx.clearRect(0, 0, this._highPointsLayer.width, this._highPointsLayer.height);
		if(!backDom){
			//创建一个临时canvas来缓存主canvas的历史图像
			backDom = this._backDom = document.createElement('canvas')
			var backCtx = this._backCtx = backDom.getContext('2d');
			backDom.width = canvas.width;
			backDom.height = canvas.height;
			backCtx.globalCompositeOperation = 'copy';
			ctx.globalAlpha = 0.85;
		}
		this._setcanvasLayer(ctx);
		var workID = setInterval(function(){
			thisL._render()
		}.bind(this),100);
		map.on("movestart",function(e){
			if(workID){
				clearInterval(workID);
			}
		});
	},
	_setcanvasLayer:function(ctx){
		var thisL = this;
		var fillColor = this.options.highAnimateColor;
		ctx.clearRect(0,0,this._highPointsLayer.width,this._highPointsLayer.height);
		for(var i=0,len=this._cityContent.length; i<len; i++){
			var point=new L.latLng(this._cityContent[i].value[1],this._cityContent[i].value[0]);
			point = thisL._map.latLngToContainerPoint(point);
			var radius = setRadiuSize(this._cityContent[i].value[2], thisL.options.maxRadiuSize, thisL.options.minRadiuSize, thisL.options.maxValue, thisL.options.minValue);
			//创建散点对象
			var thisRadiu = new this._setradiuStyle(radius,point,fillColor,this._cityContent[i].name,this._cityContent[i].value[2]);
			this._allPoint.push(thisRadiu);
		}
		if(this.options.highAnimate){
			this._topfivepointData(this.options.dataNum);
		}else {
			this._data = this._allPoint;
		}
	},
	//创建散点对象的属性
	_setradiuStyle:function(radius,point,fillColor,name,value){
		this.radius = radius;
		this.tRadiu = radius;
		this.points = point;
		this.fillColor = fillColor;
		this.isHover = false;
		this.name = name;
		this.value = value;
	},
	//处理前n名的数据
	_topfivepointData:function(num){
		for(var k=this._allValue.length-1; k>this._allValue.length-num-1; k--){
			for(var j=0,lenj=this._allPoint.length; j<lenj; j++){
				if(this._allValue[k] == this._allPoint[j].value){
					this._data.push(this._allPoint[j]);
				}
			}
		}
	},
	//绘制圈外面的光环
	_drawPoint:function(radius,x,y,color){
		this._highPointsctx.beginPath();
		this._highPointsctx.arc(x, y, radius, 0, Math.PI * 2);
		this._highPointsctx.closePath();
		this._highPointsctx.lineWidth = 1;
		this._highPointsctx.strokeStyle = color;
		this._highPointsctx.stroke();
	},
	//绘制实心圈
	_drawInsidePoint:function(radius,x,y,color){
		this._highPointsctx.beginPath();
		this._highPointsctx.arc(x, y, radius, 0, Math.PI * 2);
		this._highPointsctx.closePath();
		this._highPointsctx.fillStyle = color;
		this._highPointsctx.fill();
	},
	_render:function() {
		var color = this.options.highAnimateColor;
		this._backCtx .globalCompositeOperation = 'copy';
		this._backCtx.drawImage(this._highPointsLayer, 0, 0, this._highPointsLayer.width, this._highPointsLayer.height);
		this._highPointsctx.clearRect(0, 0, this._highPointsLayer.width, this._highPointsLayer.height);
		this._highPointsctx.beginPath();
		for(var i=0;i<this._data.length;i++){
			var changeRadius=this._data[i].isHover?this._data[i].tRadiu*1.5:this._data[i].tRadiu;
			this._data[i].radius+=0.5;
			if(this._data[i].radius>= changeRadius+15){
				this._data[i].radius=changeRadius;
			}
			this._drawInsidePoint(changeRadius,this._data[i].points.x,this._data[i].points.y,color);
			this._drawPoint(this._data[i].radius,this._data[i].points.x,this._data[i].points.y,color);
		}
		this._highPointsctx.drawImage(this._backDom, 0, 0, this._backDom.width, this._backDom.height);
	},
	//添加提示框
	_addTooltip:function(name,value){
		value = String(value);
		var tooltipContent = String(this.options.formatter);
		tooltipContent = tooltipContent.replace(/{name}/g,name);
		tooltipContent = tooltipContent.replace(/{value}/g,value);
		this._map.openToolTip(tooltipContent);
	},
	_addLegend:function(){
		var options = {
			position: this.options.position,
			type: this.options.type,
			legend: this._legend,
			text: this._legendText,
			legendContent: this._legendContent,
			orient: this.options.orient,
			legendName: this.options.legendName,
			legendColor: this.options.legendColor,
			highAnimateColor: this.options.highAnimateColor
		};
		this._map.addLegend(options);
	},
	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._canvas);
		map.off(this.getEvents(),this);
		this._canvas = null;
		if(this.options.legendShow){
			this._map.removeLegend(this._legend);
		};
	},
	_setPointRemove: function(){
		if(!this._showPoint){
			this._showPoint = true;
			this._legendText.style.color = '#cccccc';
			this._legendContent.style.backgroundColor = '#cccccc';
		}else{
			this._showPoint = false;
			this._legendText.style.color = this.options.legendColor;
			this._legendContent.style.backgroundColor = this.options.highAnimateColor;
		}
		this._removePoint(this._showPoint);
	},
	_removePoint:function(boolean){
		if(boolean){
			this._highPointsLayer.style.opacity = '0';
		}
		else{
			this._highPointsLayer.style.opacity = '1';
		}
	},
	resetdata:function(options){
		this.initialize(options);
		L.setOptions(this, options);
		setdata(this.options.data,this.options.dataValue);
		this._setcanvasLayer(this._highPointsctx);
		if(this._legend){
			this._map.removeLegend(this._legend);
		}
		if(this.options.legendShow){
			this._addLegend();
		};
	}
});

/**
 * 散点图
 */
L.CanvasLayer.Scatter = L.CanvasLayer.extend({
	options:{
		legendShow: true,//是否显示图例
		type: "scatter",
		radiuColor:'#25CE98',//散点颜色
		radiuHighColor:'#DD5347',//散点高亮颜色
		shadowColor:'rgba(0,0,0,.5)',//阴影颜色
		opacity: 0.8,//散点透明度
		shadowBlur: 15,//阴影模糊级别
		maxRadiuSize: 20,//散点最大半径
		minRadiuSize: 3,//散点最小半径
	},
	initialize: function(options) {
		L.Util.extend(this.options, options);
		var data = setdata(this.options.data,this.options.dataValue);
		this._cityContent = data[0];
		this._allValue = data[1];
		this.options.maxValue = data[2];
		this.options.minValue = data[3];
		this.delegate(this);
	},
	includes: L.Mixin.Events,
	onAdd: function (map) {
		this._map = map;
		L.CanvasLayer.prototype.onAdd.call(this,map);
		if(this.options.legendShow){
			this._addLegend();
		};
	},
	//地图的move事件，用于散点的动画
	_mapMousemove:function(e){
		var hasHover = false;
		for(var i=this._allPoint.length-1;i>-1;i--){
			var c = this._allPoint[i];
			if(((e.containerPoint.x-c.points.x)*(e.containerPoint.x-c.points.x)+(e.containerPoint.y-c.points.y)*(e.containerPoint.y-c.points.y)<=c.radius*c.radius) && (!hasHover)){
				c.isHover = true;
				hasHover = true;
				c.hover();
			}else{
				if(c.isHover){
					c.isHover = false;
					c.out();
				}
			}
		}
	},
	//地图状态发生变化时触发
	onDrawLayer:function(info){
		this._allPoint = [];
		this._canvasLayer = info.canvas;
		var ctx = this._canvasctx = info.canvas.getContext('2d');
		this.setcanvasLayer(ctx);
	},
	setcanvasLayer:function(ctx){
		var thisL = this;
		var shadowColor =  this.options.shadowColor;
		var opacity = this.options.opacity;
		var fillColor = this.options.radiuColor;
		var shadowBlur = this.options.shadowBlur;
		var radiuHighColor = this.options.radiuHighColor;
		ctx.clearRect(0,0,this._canvasLayer.width,this._canvasLayer.height);
		this._allPoint = [];
		for(var i=0,len=this._cityContent.length; i<len; i++){
			var point=new L.latLng(this._cityContent[i].value[1],this._cityContent[i].value[0]);
			point = thisL._map.latLngToContainerPoint(point);
			var radius = setRadiuSize(this._cityContent[i].value[2], thisL.options.maxRadiuSize, thisL.options.minRadiuSize, thisL.options.maxValue, thisL.options.minValue);
			//创建散点对象
			var thisRadiu = new this._setradiuStyle(radius,point,shadowColor,opacity,fillColor,shadowBlur,this._cityContent[i].name,this._cityContent[i].value[2]);
			thisRadiu.hover = function(){
				this.fillColor = radiuHighColor;
				this.radius = this.tRadiu + this.tRadiu/2;
				thisL.drawpoint(ctx);
				thisL._addTooltip(this.name,this.value)
				if(thisL._visamap){
					thisL._visamap.getcontrol(this.value);
				}
			}
			thisRadiu.out = function(){
				this.fillColor = fillColor;
				this.radius = this.radius - this.tRadiu/2;
				thisL.drawpoint(ctx);
				thisL._map.closeToolTip();
				if(thisL._visamap){
					thisL._visamap.getcontrol(null);
				}
			}
			this._allPoint.push(thisRadiu);
		}
		this.drawpoint(ctx);
	},
	//创建散点对象的属性
	_setradiuStyle:function(radius,point,shadowColor,opacity,fillColor,shadowBlur,name,value){
		this.radius = radius;
		this.tRadiu = radius;
		this.points = point;
		this.shadowColor = shadowColor;
		this.opacity = opacity;
		this.fillColor = fillColor;
		this.shadowBlur = shadowBlur;
		this.isHover = false;
		this.name = name;
		this.value = value;
	},
	//绘制散点
	drawpoint:function(ctx){
		ctx.clearRect(0,0,this._canvasLayer.width,this._canvasLayer.height);
		for(var i=0,len=this._allPoint.length; i<len; i++){
			ctx.shadowColor = this._allPoint[i].shadowColor;
			ctx.shadowBlur = this._allPoint[i].shadowBlur;
			ctx.globalAlpha = this._allPoint[i].opacity;
			ctx.beginPath();
			ctx.arc(this._allPoint[i].points.x, this._allPoint[i].points.y, this._allPoint[i].radius, 0, 2*Math.PI, true);
			ctx.fillStyle = this._allPoint[i].fillColor;
			ctx.closePath();
			ctx.fill();
		}
	},
	//添加图例
	_addLegend:function(){
		var visuaMapOptions = {
			maxValue:this.options.maxValue,
			minValue:this.options.minValue,
			maxcolor:this.options.radiuColor,
			position:this.options.position,
			type:this.options.type,
			highLightFun:this.higlightFeatureForValue.bind(this),
			resetStyleFun:this.layerResetStyle.bind(this),
		};
		var visuamap=L.control.visualMap(visuaMapOptions).addTo(this._map);
		this._visamap=visuamap;
	},
	//高亮跟图例数值对应的散点
	higlightFeatureForValue:function(value){
		var stepValue = (this.options.maxValue-this.options.minValue)/150;
		this.layerResetStyle();
		this._highRadiu = [];
		for(var i=0,len=this._allPoint.length; i<len; i++){
			if(this._allPoint[i].value >= (value-stepValue) && this._allPoint[i].value <= (value+stepValue)){
				this._allPoint[i].fillColor = this.options.radiuHighColor;
				this._allPoint[i].radius = this._allPoint[i].tRadiu + this._allPoint[i].tRadiu/2;
				this._highRadiu.push(this._allPoint[i]);
				this.drawpoint(this._canvasctx);
			}
		}
	},
	//高亮跟散点数值对应的图例
	layerResetStyle:function(){
		if(this._highRadiu == undefined || this._highRadiu.length == 0){
			return;
		}else {
			for(var i=0,len=this._allPoint.length; i<len; i++){
				for(var j=0,lenj=this._highRadiu.length; j<lenj; j++){
					if(this._allPoint[i] == this._highRadiu[j]){
						this._allPoint[i].fillColor = this.options.radiuColor;
						this._allPoint[i].radius = this._highRadiu[j].radius - this._highRadiu[j].tRadiu/2;
						this.drawpoint(this._canvasctx);
					}
				}
			}
		}
	},
	//添加提示框
	_addTooltip:function(name,value){
		value = String(value);
		var tooltipContent = String(this.options.formatter);
		tooltipContent = tooltipContent.replace(/{name}/g,name);
		tooltipContent = tooltipContent.replace(/{value}/g,value);
		this._map.openToolTip(tooltipContent);
	},
	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._canvas);
		if(this.options.legendShow){
			if(this._visamap){
				this._visamap.removeFrom(map);
			}
		};
		map.off(this.getEvents(),this);
		this._canvas = null;
	},
	removelegendEvent:function(){
		this._map.off('mousemove',this._mapMousemove,this);
		if(this._visamap){
			this._visamap.removeEvent();
		}
	},
	resetdata:function(options){
		this.initialize(options);
		L.setOptions(this, options);
		setdata(this.options.data,this.options.latLng,this.options.dataValue);
		this.setcanvasLayer(this._canvasctx);
		if(this._visamap){
			this._visamap.removeFrom(this._map);
			this._visamap = null;
		}
		if(this.options.legendShow){
			this._addLegend();
		};
	},
});

/**
 * 图标分段专题图
 */
L.CanvasLayer.DrawImages = L.CanvasLayer.extend({
	options:{
		maxRadiuSize: 20,//散点最大半径
		minRadiuSize: 3,//散点最小半径
	},
	initialize: function(options) {
		L.Util.extend(this.options, options);
		var data = setdata(this.options.data,this.options.dataValue);
		this._cityContent = data[0];
		this._allValue = data[1];
		this.options.maxValue = data[2];
		this.options.minValue = data[3];
		this.delegate(this);
	},
	includes: L.Mixin.Events,
	onAdd: function (map) {
		this._map = map;
		this._showPoint = false;
		L.CanvasLayer.prototype.onAdd.call(this,map);
		if(this.options.legendShow){
			this._legend = this._createButton('div', 'content-legend',this);
			this._legendText = this._createButton('div', 'content-text',this);
			this._legendContent = this._createButton('div', 'content-point',this);
			L.DomUtil.addClass(this._legendContent,'drawimages')
			this._addLegend();
		};
	},
	_createButton: function(domtype,className,context) {
		var link = L.DomUtil.create('div', className);
		if(className=="content-point"){
			var stop = L.DomEvent.stopPropagation;
			L.DomEvent
				.on(link, 'click', stop)
				.on(link, 'mousedown', stop)
				.on(link, 'dblclick', stop)
				.on(link, 'click', L.DomEvent.preventDefault)
				.on(link, 'click', this._setPointRemove, context);
		}
		return link;
	},
	//地图的move事件，用于散点的动画
	_mapMousemove:function(e){
		var hasHover = false;
		for(var i=this._allPoint.length-1;i>-1;i--){
			var c = this._allPoint[i];
			if(((e.containerPoint.x-c.points.x)*(e.containerPoint.x-c.points.x)+(e.containerPoint.y-c.points.y)*(e.containerPoint.y-c.points.y)<=c.radius*c.radius) && (!hasHover)){
				c.isHover = true;
				hasHover = true;
				c.hover();
			}else{
				if(c.isHover){
					c.isHover = false;
					c.out();
				}
			}
		}
	},
	onDrawLayer:function(info){
		this._allPoint = [];
		this._imagesLayer = info.canvas;
		var ctx = this._imagesctx = info.canvas.getContext('2d');
		this._setcanvasLayer(ctx);
	},
	_setcanvasLayer:function(ctx){
		var thisL = this;
		var imagesUrl =  this.options.imagesUrl;
		ctx.clearRect(0,0,this._imagesLayer.width,this._imagesLayer.height);
		this._allPoint = [];
		for(var i=0,len=this._cityContent.length; i<len; i++){
			var point=new L.latLng(this._cityContent[i].value[1],this._cityContent[i].value[0]);
			point = thisL._map.latLngToContainerPoint(point);
			var radius = setRadiuSize(this._cityContent[i].value[2], thisL.options.maxRadiuSize, thisL.options.minRadiuSize, thisL.options.maxValue, thisL.options.minValue);
			//创建散点对象
			var thisRadiu = new this._setradiuStyle(radius,point,this._cityContent[i].name,this._cityContent[i].value[2]);

			thisRadiu.hover = function(){
				this.radius = this.tRadiu + this.tRadiu/2;
				thisL._drawImages(ctx,imagesUrl);
				thisL._addTooltip(this.name, this.value);
			};
			thisRadiu.out = function(){
				this.radius = this.tRadiu;
				thisL._drawImages(ctx,imagesUrl);
				thisL._map.closeToolTip();
			};

			this._allPoint.push(thisRadiu);
		}
		this._drawImages(ctx,imagesUrl);
	},
	//创建散点对象的属性
	_setradiuStyle:function(radius,point,name,value){
		this.radius = radius;
		this.tRadiu = radius;
		this.points = point;
		this.isHover = false;
		this.name = name;
		this.value = value;
	},
	//加载图片
	_preImage:function(url,fn,canvas){
		//创建一个Image对象，实现图片的预下载
		var img = new Image();
		img.src = url;
		// 如果图片已经存在于浏览器缓存，直接调用回调函数,不用再处理onload事件
		if (img.complete) {
			fn.call(img,canvas.x,canvas.y,canvas.width,canvas.height);
			return;
		}
		img.onload = function () {
			//将回调函数的this替换为Image对象
			fn.call(img,canvas.x,canvas.y,canvas.width,canvas.height);
		};
	},
	//绘制图片标记
	_drawImages:function(ctx,imagesUrl){
		ctx.clearRect(0,0,this._imagesLayer.width,this._imagesLayer.height);
		for(var i=0,len=this._allPoint.length; i<len; i++){
			var x = this._allPoint[i].points.x-this._allPoint[i].radius;
			var y = this._allPoint[i].points.y-this._allPoint[i].radius;
			//形参：横坐标，纵坐标，图像宽度,图像高度
			this._preImage(imagesUrl,function(x,y,width,height){
				ctx.drawImage(this,x,y,width,height);
			},{
				"x": x,
				"y": y,
				"width": this._allPoint[i].radius*2,
				"height": this._allPoint[i].radius*2,
			});
		}
	},
	//添加提示框
	_addTooltip:function(name,value){
		value = String(value);
		var tooltipContent = String(this.options.formatter);
		tooltipContent = tooltipContent.replace(/{name}/g,name);
		tooltipContent = tooltipContent.replace(/{value}/g,value);
		this._map.openToolTip(tooltipContent);
	},
	_addLegend:function(){
		var options = {
			position: this.options.position,
			type: this.options.type,
			legend: this._legend,
			text: this._legendText,
			legendContent: this._legendContent,
			orient: this.options.orient,
			legendName: this.options.legendName,
			legendColor: this.options.legendColor,
			imagesUrl: this.options.imagesUrl
		};
		this._map.addLegend(options);
	},
	_setPointRemove: function(){
		if(!this._showPoint){
			this._showPoint = true;
			this._legendText.style.color = '#cccccc';
			this._legendContent.style.backgroundImage = "url("+ this.options.imagesRemoveUrl +")";
		}else{
			this._showPoint = false;
			this._legendText.style.color = this.options.legendColor;
			this._legendContent.style.backgroundImage = "url("+ this.options.imagesUrl +")";
		}
		this._removePoint(this._showPoint);
	},
	_removePoint:function(boolean){
		if(boolean){
			this._pointShow = true;
			this._imagesLayer.style.opacity = '0';
		}
		else{
			this._pointShow = false;
			this._imagesLayer.style.opacity = '1';
		}
	},
	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._canvas);
		if(this.options.legendShow){
			this._map.removeLegend(this._legend);
		};
		map.off(this.getEvents(),this);
		this._canvas = null;
	},
	resetdata:function(options){
		this.initialize(options);
		L.setOptions(this, options);
		setdata(this.options.data,this.options.dataValue);
		this._setcanvasLayer(this._imagesctx);
		if(this._legend){
			this._map.removeLegend(this._legend);
		}
		if(this.options.legendShow){
			this._addLegend();
		};
	},
});

/**
 * 图标分段、散点图图例
 */
L.Control.DrawLegend = L.Control.extend({
	options : {
		position : 'topright',
		type: 'drawPoint',//图例类型
		legendName: 'TOP5',//图例名字
		orient: 'horizontal',//图例方向。horizontal（水平），vertical（垂直）
	},
	initialize : function(options){
		L.Util.extend(this.options, options);
	},
	includes : L.Mixin.Events,
	onAdd: function (map){
		this._pointShow = false;
		this._container = L.DomUtil.create('div', 'leaflet-control-legend');
		this._legendText = this._createButton('div', 'content-text',this);
		this._legendContent = this._createButton('div', 'content-point',this);

		this._container.appendChild(this._legendText);
		this._container.appendChild(this._legendContent);
		this._setStyle();
		//图例触发事件
		//L.DomEvent.on(this._legendContent, 'click', this.setPointRemove);
		return this._container;
	},
	_createButton: function(domtype,className,context) {
		if(domtype == 'div'){
			var link = L.DomUtil.create('div', className);
		}
		if(domtype == 'span'){
			var link = L.DomUtil.create('span', className);
		}
		if(className=="content-point"){
			var stop = L.DomEvent.stopPropagation;
			L.DomEvent
				.on(link, 'click', stop)
				.on(link, 'mousedown', stop)
				.on(link, 'dblclick', stop)
				.on(link, 'click', L.DomEvent.preventDefault)
				.on(link, 'click', this.setPointRemove, context)
				.on(link, 'click', this._refocusOnMap, context);
		}
		return link;
	},
	_setStyle:function(){
		if(this.options.position == 'topleft' || this.options.position == 'bottomleft'){
			if(this.options.orient == 'horizontal'){
				this._container.style.display = 'block-inline';
				this._container.style.float = 'left';
				this._container.style.clear = 'none';
			}else if(this.options.orient == 'vertical'){
				this._container.style.display = 'block';
				this._container.style.float = 'left';
			}
			this._legendText.style.float = 'right';
			this._legendContent.style.float = 'right';
		}
		else if(this.options.position == 'topright' || this.options.position == 'bottomright'){
			if(this.options.orient == 'horizontal'){
				this._container.style.display = 'block-inline';
				this._container.style.float = 'left';
				this._container.style.clear = 'none';
			}else if(this.options.orient == 'vertical'){
				this._container.style.display = 'block';
				this._container.style.float = 'right';
			}
			this._legendText.style.float = 'left';
			this._legendContent.style.float = 'left';
		}
		this._legendText.innerHTML = this.options.legendName;
		this._legendText.style.color = this.options.legendColor;
		if(this.options.type == 'drawPoint'){
			this._legendContent.style.backgroundColor = this.options.highAnimateColor;
		} else if(this.options.type == 'drawImages'){
			L.DomUtil.addClass(this._legendContent,'drawimages')
			this._legendContent.style.backgroundImage = "url("+ this.options.imagesUrl +")";
		}
	},
	setPointRemove:function(){
		var map = this._map;
		if(!this._pointShow){
			this._pointShow = true;
			this._legendText.style.color = '#cccccc';
			if(this.options.type == 'drawPoint'){
				this._legendContent.style.backgroundColor = '#cccccc';
			}else if(this.options.type == 'drawImages'){
				this._legendContent.style.backgroundImage = "url("+ this.options.imagesRemoveUrl +")";
			}
		}else{
			this._pointShow = false;
			this._legendText.style.color = this.options.legendColor;
			if(this.options.type == 'drawPoint'){
				this._legendContent.style.backgroundColor = this.options.highAnimateColor;
			}else if(this.options.type == 'drawImages'){
				this._legendContent.style.backgroundImage = "url("+ this.options.imagesUrl +")";
			}
		}
		if (typeof this.options.removePoint === 'function') {
			this.options.removePoint(map,this._pointShow);
		}
	}
});

L.control.drawLegend = function(options){
	return new L.Control.DrawLegend(options);
}


//图例
L.Legend = L.Control.extend({
	options: {
		position:'topright'
	},
	initialize: function(options){
		L.Util.extend(this.options, options);
	},
	includes: L.Mixin.Events,
	onAdd: function (map){
		this._thisL = this;
		this._map = map;
		this._container = L.DomUtil.create('div', 'leaflet-control-legend');
		return this._container;
	},
	addConLegend: function(options){
		var positions = options.position;
		var orient = options.orient;
		this._thisL.initialize(options);
		L.setOptions(this._thisL, options);
		var legend = this._legend = options.legend;
		var text = this._legendText = options.text;
		var legendPoint = this._legendContent = options.legendContent;
		text.innerHTML = options.legendName;
		text.style.color = options.legendColor;
		if(options.type == 'drawPoint'){
			legendPoint.style.backgroundColor = options.highAnimateColor;
		}else if(options.type == 'drawImages'){
			this._legendContent.style.backgroundImage = "url("+ this.options.imagesUrl +")";
		}
		this._container.appendChild(legend);
		legend.appendChild(text);
		legend.appendChild(legendPoint);
		this._setStyle(positions,orient);
	},
	_setStyle:function(position,orient){
		if(position == 'topleft' || position == 'bottomleft'){
			if(orient == 'horizontal'){
				this._container.style.display = 'block-inline';
				this._container.style.float = 'left';
				this._container.style.clear = 'none';
			}else if(orient == 'vertical'){
				this._container.style.display = 'block';
				this._container.style.float = 'left';
			}
			this._legendText.style.float = 'right';
			this._legendContent.style.float = 'left';
		}
		else if(position == 'topright' || position == 'bottomright'){
			if(orient == 'horizontal'){
				this._container.style.display = 'block-inline';
				this._container.style.float = 'right';
				this._container.style.clear = 'none';
			}else if(orient == 'vertical'){
				this._container.style.display = 'block';
				this._container.style.float = 'right';
			}
			this._legendText.style.float = 'left';
			this._legendContent.style.float = 'right';
		}
	},
	removeConLegend: function(legend){
		this._container.removeChild(legend);
	},
});

L.Map.addInitHook(function () {
	if (!this._legend) {
		this._legend = new L.Legend();
		this._legend._num = 0;
		this.addControl(this._legend);
	}
});

L.Map.include({
	addLegend: function(options){
		this._legend._num++;
		if(this._legend){
			if(this._legend._num<=1){
				this._legend.setPosition(options.position);
			}
			this._legend.addConLegend(options);
		}
	},
	removeLegend: function(legend){
		if(this._legend._container.children.length > 0){
			this._legend.removeConLegend(legend);
		}
	}
});

/**
 * 颜色分类渲染图
 */
L.ColorRenderLayer= L.GeoJSON.extend({
	includes: L.Mixin.Events,
	options: {
		position: 'bottomright',
		type: "rendermap",
		color: '#ffffff',	//边框颜色。
		weight: 1,//边框宽度（以像素为单位）
		opacity: 1,//边框透明度。
		fillOpacity: 1, //填充透明度
		fontColor: '#000000',//文字颜色
		fontSize: 12,//文字大小
		legendShow: true,//是否显示图例
		highLightColor:'#2F4554',//高亮边框颜色
		highLightWeight:1,//高亮边框宽度
		highFillColor:'#FFC324',//高亮填充颜色
		highLightfillOpacity:1,//高亮填充透明度
		highColor: '#BF444C',//最高值填充颜色
		lowColor: '#F6EFA6',//最低填充颜色
	},
	//各项参数初始化
	initialize: function (options) {
		L.setOptions(this, options);
		options=this.options;
		var colorArray = gradientColor(this.options.lowColor, this.options.highColor, 150);
		this._colorArray = colorArray;
		var maxValue, mixValue;
		var datatype = this.options.dataValue;
		this._datatype = datatype;
		this._layers = {};
		for (var i = 0; i < this.options.geojson.features.length; i++) {
			if(this.options.geojson.features[i].properties[datatype]){
				if (!maxValue) {
					maxValue = mixValue = this.options.geojson.features[i].properties[datatype];
				} else {
					if (maxValue < this.options.geojson.features[i].properties[datatype]) {
						maxValue = this.options.geojson.features[i].properties[datatype];
					}
					if (mixValue > this.options.geojson.features[i].properties[datatype]) {
						mixValue = this.options.geojson.features[i].properties[datatype];
					}
				}
			}

		}
		if(maxValue < 1 || mixValue < 1){
			this.maxRenderValue = maxValue;
			this.mixRenderValue = mixValue;
		}else{
			this.maxRenderValue = maxValue.toFixed(0);
			this.mixRenderValue = mixValue.toFixed(0);
		}
		if (options.geojson) {
			this.addData(options.geojson);
		}
	},
	addData: function (geojson) {
		var features = L.Util.isArray(geojson) ? geojson : geojson.features,
			i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// Only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(features[i]);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return; }

		var layer = this._geoLayer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer, options.coordsToLatLng, options);
		layer.feature = L.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);
		this._onEachFeature(geojson, layer);
		return this.addLayer(layer);
	},
	//添加控件到地图
	onAdd: function (map) {
		this._map=map;
		if(this.options.legendShow){
			this._addLegend();
		};
		L.GeoJSON.prototype.onAdd.call(this, map);
		//添加文字标注图层
		this._addNameLayer();
	},
	resetStyle: function (layer) {
		var style = this._getStyle.bind(this);
		if (style) {
			// reset any custom styles
			L.Util.extend(layer.options, layer.defaultOptions);

			this._setLayerStyle(layer, style);
		}
	},

	setStyle: function (style) {
		this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			//给layer添加setStyle这个方法
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	},
	//添加文字图层
	_addNameLayer:function() {
		var nameLayer=L.layerGroup().addTo(this._map);
		this._nameLayer=nameLayer;
		for(var i = 0; i < this.options.geojson.features.length; i++){
			//判断文字和坐标是否完整，缺一不可
			if(this.options.geojson.features[i].properties.name){
				var point=L.latLngBounds(this.options.geojson.features[i].geometry.coordinates[0][0]).getCenter();
				//var point = new L.latLng(this.options.geojson.features[i].properties.cp[1], this.options.geojson.features[i].properties.cp[0]); //坐标参数
				var nameStr = this.options.geojson.features[i].properties.name;
				var myIcon = L.divIcon({
					className : 'label-city',
					html : nameStr,
					iconSize : new L.Point(this.options.fontSize * nameStr.length, 10)
				});
				new L.Marker([point.lng,point.lat], {icon : myIcon}).addTo(nameLayer);
			}
		}
		var cityname = document.getElementsByClassName('label-city');
		for(var i = 0, len = cityname.length; i < len; i++){
			cityname[i].style.fontSize = this.options.fontSize + 'px';
			cityname[i].style.color = this.options.fontColor;
		}
	},
	_onEachFeature:function(featrue, layer){
		layer.on({
			mouseover: this._layerMouseOver.bind(this),
			mouseout: this._layerMouseOut.bind(this),
		});
	},
	_layerMouseOver:function(e){
		var layer = e.target;
		var name,layerValue;
		layer.setStyle({
			weight: this.options.highLightWeight,
			color: this.options.highLightColor,
			dashArray: '',
			fillOpacity: this.options.highLightfillOpacity,
			fillColor: this.options.highFillColor
		});
		layer.bringToFront();
		layerValue=layer.feature.properties[this._datatype];
		name = layer.feature.properties.name;
		this._visamap.getcontrol(layerValue);
		if(this.options.tooltipShow){
			this._addTooltip(name,layerValue);
		}
	},
	_layerMouseOut:function(e){
		this._visamap.getcontrol(null);
		this.resetStyle(e.target);
		if(this._map){
			this._map.closeToolTip();
		}
	},
	higlightFeatureForValue:function(value){
		this.layerResetStyle();
		//记录要高亮的图层
		this.higlightLayer=[];
		if(value<1){
			var stpeValue=((this.maxRenderValue-this.mixRenderValue)/150).toFixed(4);
			stpeValue = parseFloat(stpeValue);
			value = parseFloat(value);
		}else{
			var stpeValue=(this.maxRenderValue-this.mixRenderValue)/150;
		}
		this.eachLayer(function (layer) {
			var layerValue=layer.feature.properties[this._datatype];
			if(layerValue<=(value+stpeValue)&&layerValue>=(value-stpeValue)){
				this.higlightLayer.push(layer);
				layer.setStyle({
					weight: this.options.highLightWeight,
					color: this.options.highLightColor,
					dashArray: '',
					fillOpacity: this.options.highLightfillOpacity,
					fillColor:this.options.highFillColor
				});
				layer.bringToFront();
			}
		}.bind(this));
	},
	layerResetStyle:function(){
		if(this.higlightLayer){
			for(var i=0;i<this.higlightLayer.length;i++){
				this.resetStyle(this.higlightLayer[i]);
			}
		}
	},
	//添加图例
	_addLegend:function(){
		var visuaMapOptions = {
			maxValue:  this.maxRenderValue,
			minValue:  this.mixRenderValue,
			maxcolor:this.options.highColor,
			mincolor:this.options.lowColor,
			position:this.options.position,
			type:this.options.type,
			colorArray: this._colorArray,
			highLightFun:this.higlightFeatureForValue.bind(this),
			resetStyleFun:this.layerResetStyle.bind(this)
		};
		var visuamap=L.control.visualMap(visuaMapOptions).addTo(this._map);
		this._visamap=visuamap;
	},
	setOptions:function(options){
		//移除图例
		if(this._visamap){
			this._visamap.removeFrom(this._map);
			this._visamap=null;
		}
		//移除标注
		if(this._nameLayer){
			this._nameLayer.onRemove(this._map);
			this._nameLayer=null;
		}
		this.clearLayers();
		//重新加载
		this.initialize(options);
		L.setOptions(this,options);
		this._addNameLayer();
		if(this.options.legendShow){
			this._addLegend();
		};
	},
	//移除专题图
	removeTo:function(){
		var map=this._map;
		//移除图例
		if(this._visamap){
			this._visamap.removeFrom(this._map);
		}
		//移除标注
		if(this._nameLayer){
			this._nameLayer.onRemove(this._map);
		}

		//移除图层
		this.onRemove(map);
	},
	_addTooltip:function(name,value){
		if(name&&value){
			value = String(value);
			var tooltipContent = String(this.options.formatter);
			tooltipContent = tooltipContent.replace(/{name}/g,name);
			tooltipContent = tooltipContent.replace(/{value}/g,value);
			if(this._map){
				this._map.openToolTip(tooltipContent);
			}
		}
	},
	_getStyle: function (e) {
		return {
			weight: this.options.weight,
			opacity: this.options.opacity,
			color: this.options.color,
			dashArray: '0',
			fillOpacity: this.options.fillOpacity,
			fillColor: this._getColor(e.properties.gdp)
		};
	},
	_getColor:function(value){
		var index=parseInt((value-this.mixRenderValue)/((this.maxRenderValue-this.mixRenderValue)/150));
		return this._colorArray[(index==0?0:(index-1))];
	}
});

L.DynamicPaths=L.CanvasLayer.extend({
	includes: L.Mixin.Events,
	options: {
		weight : 1,
		opacity : 0.4,
		speed:100
	},
	initialize: function(options) {
		L.Util.extend(this.options, options);
		this._setData();
		this.delegate(this);
	},
	setOptions:function(options){
		this.initialize(options);
	},
	_setData:function(){
		if(!this._groupLayer){
			this._groupLayer=new L.geoJson();
		}
		if(this._groupLayer){
			this._groupLayer.clearLayers();
			this._groupLayer.addData(this.options.geojson);
			this._groupLayer.eachLayer(function (layer) {
				var color="rgb("+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+")";
				layer.setStyle({color: color, weight: this.options.weight, opacity: this.options.opacity});
			}.bind(this));
		}
		this._Lines=this._groupLayer.getLayers();
		if(this._map){
			this._map.fitBounds(this._groupLayer.getBounds());
		}
	},
	//_setStyle:function(){
	//	if(this._groupLayer){
	//		this._groupLayer.eachLayer(function (layer) {
	//			var color="rgb("+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+")";
	//			layer.setStyle({color: color, weight: this.options.weight, opacity: this.options.opacity});
	//		}.bind(this));
	//	}
	//},
	onAdd: function (map){
		this._map = map;
		this._groupLayer.addTo(this._map);
		this._map.fitBounds(this._groupLayer.getBounds());
		//this._setStyle();
		L.CanvasLayer.prototype.onAdd.call(this,map);
		map.on("movestart resize",this._mapMoveStart.bind(this));
	},
	removeTo:function(){
		this.onRemove(this._map);
	},
	onRemove:function(map){
		if(this._workID){
			clearInterval(this._workID);
		}
		if(this._groupLayer){
			this._groupLayer.clearLayers();
			this._groupLayer.onRemove(map);
		}
		map.off("movestart resize",this._mapMoveStart.bind(this));
		L.CanvasLayer.prototype.onRemove.call(this,map);
	},
	_mapMoveStart:function(){
		if(this._workID){
			clearInterval(this._workID);
		}
	},
	//-------------------------------------------------------------
	getEvents: function () {
		var events = {
			moveend: this._onLayerDidMove,
			mousemove:this._mapMousemove,
		};
		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			events.zoomanim =  this._animateZoom;
		}
		return events;
	},
	_onLayerDidResize: function (resizeEvent) {
		this._canvas.width = resizeEvent.newSize.x;
		this._canvas.height = resizeEvent.newSize.y;
		if(this._workID){
			clearInterval(this._workID);
		}
	},
	onDrawLayer:function(info){
		this._canvas=info.canvas;
		this._ctx = info.canvas.getContext('2d');
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		if(!this._backDom){
			//创建一个临时canvas来缓存主canvas的历史图像
			this._backDom = document.createElement('canvas'),
				this._backCtx = this._backDom.getContext('2d');
			this._backDom.width = this._canvas.width;
			this._backDom.height = this._canvas.height;
			this._ctx.globalAlpha = 0.85; //关键
			this._backCtx.globalCompositeOperation = 'copy';
		}
		if(this._workID){
			clearInterval(this._workID);
		}
		this._workID=setInterval(this._draw.bind(this),1000/this.options.speed);
	},

	_draw:function(){
		this._backCtx.globalCompositeOperation = 'copy';
		this._backCtx.drawImage(this._canvas, 0, 0, this._canvas.width, this._canvas.height);
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		for (var k = 0, length =this._Lines.length; k < length; k++) {
			this._Lines[k].start=this._Lines[k].start?this._Lines[k].start:0;
			if(!this._Lines[k].pointStart){
				this._Lines[k].pointStart=L.latLng(this._Lines[k]._latlngs[this._Lines[k].start].lat,this._Lines[k]._latlngs[this._Lines[k].start].lng);
				this._Lines[k].pointStartGIS=this._map.project(this._Lines[k].pointStart,this._map.getZoom());
				this._Lines[k].pointScreenStart=this._map.latLngToContainerPoint(this._Lines[k].pointStart);
			}
			this._ctx.beginPath();
			this._Lines[k].pointScreenStart=this._map.latLngToContainerPoint(this._Lines[k].pointStart);
			this._ctx.fillStyle = this._Lines[k].options.color;
			this._ctx.arc(this._Lines[k].pointScreenStart.x, this._Lines[k].pointScreenStart.y, this.options.weight, 0, Math.PI * 2);
			this._ctx.fill();
			this._ctx.closePath();
			this._doSingleLine(this._Lines[k]);
		}
		this._ctx.drawImage(this._backDom, 0, 0, this._backDom.width, this._backDom.height);
    },
	//处理单条路径
	_doSingleLine:function(path){
		path.pointStartGIS=this._map.project(path.pointStart,this._map.getZoom());
		this._screenPointEnd=this._map.project(path._latlngs[path.start+1],this._map.getZoom());
		this._screenLength = {
			x: this._screenPointEnd.x-path.pointStartGIS.x,
			y: this._screenPointEnd.y - path.pointStartGIS.y
		};
		this._pxDistance=Math.sqrt(Math.pow(this._screenLength.x ,2) + Math.pow(this._screenLength.y ,2));
		if(this._pxDistance<=1){
			path.start++;
			if(path.start>=(path._latlngs.length-1)){
				path.start=0;
			}
			path.pointStart=L.latLng(path._latlngs[path.start].lat,path._latlngs[path.start].lng);
			path.pointStartGIS=this._map.project(path.pointStart,this._map.getZoom());
			path.pointScreenStart=this._map.latLngToContainerPoint(path.pointStart);
			this._screenPointStart=this._map.latLngToContainerPoint(path.pointStart);
			this._screenPointEnd=this._map.latLngToContainerPoint(path._latlngs[path.start+1]);
			this._screenLength = {
				x: this._screenPointEnd.x-this._screenPointStart.x,
				y: this._screenPointEnd.y - this._screenPointStart.y
			};
			this._pxDistance=Math.sqrt(Math.pow(this._screenLength.x ,2) + Math.pow(this._screenLength.y ,2));
			this._latlngDistance=path._latlngs[path.start].distanceTo(path._latlngs[path.start+1]);
		}else {
			var topLeft = this._map.containerPointToLayerPoint([0, 0]);
			//偏移采用屏幕坐标
			path.pointStartGIS.x+=( this._screenLength.x / this._pxDistance);
			path.pointStartGIS.y+=( this._screenLength.y / this._pxDistance);
			//每次偏移完成后重新转换为地理坐标
			path.pointStart=this._map.unproject(path.pointStartGIS,this._map.getZoom());
		}
	},
});

/***/ }),
/* 31 */
/***/ (function(module, exports) {

L.WmtsGetCapabilities = L.Class.extend({

    defaultWmtsParams: {
        service: 'WMTS',
        version: '1.0.0',
        layer: null,
        callback: null,
        errback: null
    },

    initialize: function (url, options) {
        this._url = url;
        var opt = options != undefined ? options : {};
        this.defaultWmtsParams.tilematrixSet = null;
        this.defaultWmtsParams.layer = null;
        for (var i in opt) {
            this.defaultWmtsParams[i] = opt[i];
        }
        //判断请求地址是否输入的为完整地址
        if (url != null && url.toLowerCase().indexOf("request=") < 0) {
            this._url = this._url + "?request=GetCapabilities&service=wmts";
        }
    },

    getGetCapabilities: function (url, callback, errorback, options) {
        var opt = options != undefined ? options : {};
        this._url = url;
        if (this._url != undefined && this._url.toLowerCase().indexOf("request=") < 0) {
            this._url = this._url + "?request=GetCapabilities&service=wmts";
        }
        for (var i in opt) {
            this.defaultWmtsParams[i] = opt[i];
        }
        if (this._url && this.defaultWmtsParams.layer) {
            this._url += "&layer=" + this.defaultWmtsParams.layer;
        }
        this.defaultWmtsParams.callback = callback;
        this.defaultWmtsParams.errback = errorback;
        var async = this.defaultWmtsParams.async != undefined ? this.defaultWmtsParams.async : true;
        L.ajax({ url: this._url, success: this._callback.bind(this), fail: this._errback.bind(this), type: "GET", async: async });
    },
    //将getCapalities的xml转换为json对象
    read: function (data) {
        var xml = new L.X2JS();
        return xml.xml_str2json(data);
    },

    _callback: function (data) {
        var jsonObj = this.read(data);
        if (this.defaultWmtsParams.callback != null) {
            this.defaultWmtsParams.callback(jsonObj);
        }
    },
    _errback: function (err) {
        if (this.defaultWmtsParams.errback != null) {
            this.defaultWmtsParams.errback(err);
        }
    },
    optionsFromCapabilities: function (result, options) {
        var opt = options != undefined ? options : {};
        if (opt.layer != undefined) {
            this.defaultWmtsParams.layer = opt.layer;
        }
        this.tileGrid = {
            extent: null,
            wgs84Extent: null,
            matrixIds: null,
            maxZoom: 0,
            minZoom: 0,
            origin: null,
            origins: null,
            resolutions: null,
            scales: null,
            tileSize: 256,
            level: null
        };
        this.resOptions = {
            layer: null,
            format: "image/png",
            matrixSet: null,
            code: null,
            tileGrid: this.tileGrid,
            urls: [],
            continuousWorld: true
        };
        if (result.Capabilities.Contents.Layer != null) {
            //若返回的是一个则将之变为数组类型
            if (!L.Util.isArray(result.Capabilities.Contents.Layer)) {
                var tmp_layer = result.Capabilities.Contents.Layer;
                result.Capabilities.Contents.Layer = [tmp_layer];
            }
            if (!L.Util.isArray(result.Capabilities.Contents.TileMatrixSet)) {
                var tmp_tileMatrix = result.Capabilities.Contents.TileMatrixSet;
                result.Capabilities.Contents.TileMatrixSet = [tmp_tileMatrix];
            }
            //结果有多条
            if (result.Capabilities.Contents.Layer.length > 0) {
                for (var i = 0; i < result.Capabilities.Contents.Layer.length; i++) {
                    var layer = result.Capabilities.Contents.Layer[i]; //.Layer["0"].Identifier.__text
                    if (layer != null && layer.Identifier.__text == this.defaultWmtsParams.layer) {
                        //获取地图范围
                        var _lowerCorner = layer.BoundingBox.LowerCorner.__text.split(' ');
                        var _upperCorner = layer.BoundingBox.UpperCorner.__text.split(' ');
                        this.tileGrid.extent = new L.latLngBounds([_lowerCorner[1], _lowerCorner[0]], [_upperCorner[1], _upperCorner[0]]);
                        //获取地图的wgs84的范围
                        var wgs84_lowerCorner = layer.WGS84BoundingBox.LowerCorner.__text.split(' ');
                        var wgs84_upperCorner = layer.WGS84BoundingBox.UpperCorner.__text.split(' ');
                        this.tileGrid.wgs84Extent = new L.latLngBounds([wgs84_lowerCorner[1], wgs84_lowerCorner[0]], [wgs84_upperCorner[1], wgs84_upperCorner[0]]);
                        //用来判断取哪个标准的tilematrixSet
                        //获取当前TileMatrixSet
                        var tileMatrixSet = null;
                        //layer.TileMatrixSetLink.TileMatrixSet
                        if (!L.Util.isArray(layer.TileMatrixSetLink)) {
                            var tmp_tileMatrix = layer.TileMatrixSetLink;
                            layer.TileMatrixSetLink = [tmp_tileMatrix];
                        }
                        //若没有输入tilematrixSet或输入的tilematrixSet在当前元数据中没有，则默认赋值索引为0的建塔方案
                        if (this.defaultWmtsParams.tilematrixSet == null) {
                            this.defaultWmtsParams.tilematrixSet = layer.TileMatrixSetLink[0].TileMatrixSet;
                        }

                        if (this.defaultWmtsParams.tilematrixSet != undefined) {
                            for (var m = 0; m < result.Capabilities.Contents.TileMatrixSet.length; m++) {
                                if (this.defaultWmtsParams.tilematrixSet.toLowerCase() == result.Capabilities.Contents.TileMatrixSet[m].Identifier.__text.toLowerCase()) {
                                    tileMatrixSet = result.Capabilities.Contents.TileMatrixSet[m];
                                    break;
                                }
                            }
                        }

                        //获取epsg
                        if (tileMatrixSet.SupportedCRS.__text.toLowerCase().split('epsg')) {
                            var crscode = tileMatrixSet.SupportedCRS.__text.toLowerCase().split("epsg")[1].substring(1);
                            if (crscode.indexOf(":") >= 0) {
                                //部分返回的详细中包含两个::
                                crscode = crscode.substring(1);
                            }
                            crscode = "EPSG:" + crscode;
                        }
                        this.resOptions.code = crscode;
                        this.resOptions.layer = this.defaultWmtsParams.layer;
                        this.resOptions.matrixSet = tileMatrixSet;
                        this.getDefaultMatrix(tileMatrixSet, crscode);
                        break;
                    }
                }
            }


            //获取服务地址
            if (result.Capabilities.OperationsMetadata.Operation != null && result.Capabilities.OperationsMetadata.Operation.length > 0) {
                for (var j = 0; j < result.Capabilities.OperationsMetadata.Operation.length; j++) {
                    if (result.Capabilities.OperationsMetadata.Operation[j]._name.toLowerCase() == "gettile") {
                        if (!L.Util.isArray(result.Capabilities.OperationsMetadata.Operation[j].DCP.HTTP.Get)) {
                            var tmp_httpGet = result.Capabilities.OperationsMetadata.Operation[j].DCP.HTTP.Get;
                            result.Capabilities.OperationsMetadata.Operation[j].DCP.HTTP.Get = [tmp_httpGet];
                        }
                        for (var k = 0; k < result.Capabilities.OperationsMetadata.Operation[j].DCP.HTTP.Get.length; k++) {
                            if (result.Capabilities.OperationsMetadata.Operation[j].DCP.HTTP.Get[k]) {
                                this.resOptions.urls.push(result.Capabilities.OperationsMetadata.Operation[j].DCP.HTTP.Get[k]["_xlink:href"]);
                            }
                        }

                    }
                }
            }

        }
        return this.resOptions;
    },
    getDefaultMatrix: function (tileMatrixSet, crscode) {
        //获取初始级数
        if (tileMatrixSet.TileMatrix[0].Identifier.__text.indexOf(":") > 0) {
            //针对其他GIS的wmts
            this.tileGrid.minZoom = parseInt(tileMatrixSet.TileMatrix[0].Identifier.__text.split(":")[tileMatrixSet.TileMatrix[0].Identifier.__text.split(":").length - 1]);
        } else {
            //针对hgis的WMTS
            this.tileGrid.minZoom = parseInt(tileMatrixSet.TileMatrix[0].Identifier.__text);
        }
        this.tileGrid.maxZoom = this.tileGrid.minZoom + tileMatrixSet.TileMatrix.length - 1;
        //获取初始scale
        var startScale = parseFloat(tileMatrixSet.TileMatrix[0].ScaleDenominator);
        //定义当前服务每一级的信息数组
        var matrixIds = new Array(this.tileGrid.maxZoom);
        //定义当前服务比例尺信息
        var scales = new Array(this.tileGrid.maxZoom);
        //定义当前服务分辨率信息
        var resolutions = new Array(this.tileGrid.maxZoom);
        var orgins = new Array(this.tileGrid.maxZoom);
        var tileSize = 256;

        for (var i = 0; i <= this.tileGrid.maxZoom; i++) {
            var topleft = null;
            if (i < this.tileGrid.minZoom) {
                scales[i] = startScale * Math.pow(2, this.tileGrid.minZoom - i);
                resolutions[i] = this.scaleToResolution(scales[i], crscode);
                matrixIds[i] = null;
                orgins[i] = null;
            } else {
                topleft = tileMatrixSet.TileMatrix[i - this.tileGrid.minZoom].TopLeftCorner.split(' ');
                tileSize = parseInt(tileMatrixSet.TileMatrix[i - this.tileGrid.minZoom].TileWidth);
                var topLeftCorner;
                //epsg:4326的参考系原点坐标是反序的
                if (crscode.toLowerCase() == "epsg:4326") {
                    topLeftCorner = new L.LatLng(topleft[0], topleft[1])
                } else {
                    topLeftCorner = new L.LatLng(topleft[1], topleft[0])
                }
                matrixIds[i] = tileMatrixSet.TileMatrix[i - this.tileGrid.minZoom].Identifier.__text;
                orgins[i] = topLeftCorner;
                scales[i] = parseFloat(tileMatrixSet.TileMatrix[i - this.tileGrid.minZoom].ScaleDenominator);
                resolutions[i] = this.scaleToResolution(scales[i], crscode);
            }
        }
        this.tileGrid.matrixIds = matrixIds;
        this.tileGrid.origins = orgins;
        this.tileGrid.resolutions = resolutions;
        this.tileGrid.scales = scales;
        this.tileGrid.tileSize = tileSize;
    },

    //将获取到的scale转换为resolution
    scaleToResolution: function (scale, crscode) {
        var um = 6378137.0 * 2.0 * Math.PI / 360.0;
        var DEFAULT_PIXEL_SIZE_METER = 0.00028;
        var code = parseInt(crscode.split(":")[1]);
        //判断当前坐标系的单位
        var mapUnit = code && code >= 4000 && code <= 5000 ? "degree" : "meter";
        if (mapUnit == "degree") {
            if (code != 4326) um = 111194.87428468118;
            return (scale * DEFAULT_PIXEL_SIZE_METER) / um;
        } else {
            return scale * DEFAULT_PIXEL_SIZE_METER;
        }

    }


});
L.wmtsGetCapabilities = function (url, options) {
    return new L.WmtsGetCapabilities(url, options);
};


L.TileLayer.WMTS = L.TileLayer.extend({

    defaultWmtsParams: {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        layer: null,
        style: '',
        tilematrixSet: '',
        format: 'image/jpeg',
        tileSize: 256
    },

    initialize: function (url, options) { // (String, Object)
        this.capabilitiesInfo = null;
        this.wmtsParams = L.extend({}, this.defaultWmtsParams);
        if (typeof url === 'object') {
            this.capabilitiesInfo = url;
            this._url = this.capabilitiesInfo.urls[0];
            if (this._url.indexOf("?") > 0) {
                this._url = this._url.split("?")[0];
            }
            this.wmtsParams.layer = this.capabilitiesInfo.layer;
            this.wmtsParams.tileSize = this.capabilitiesInfo.tileGrid.tileSize;
            this.continuousWorld = this.capabilitiesInfo.continuousWorld;
        } else {
            this._url = url;
            for (var i in options) {
                // all keys that are not TileLayer options go to WMTS params
                if (!this.options.hasOwnProperty(i) && i != "matrixIds") {
                    this.wmtsParams[i] = options[i];
                }
            }
        }
        if (this.wmtsParams.layer == null) {
            alert("请输入必填参数layer的值！");
            return;
        }
        L.setOptions(this, options);
    },

    _callback: function (map, data) {
        var xml = new L.X2JS();
        this.capabilitiesInfo = L.wmtsGetCapabilities().optionsFromCapabilities(xml.xml_str2json(data), { layer: this.wmtsParams.layer });
        if (this.capabilitiesInfo.matrixSet == null) {
            alert("wmts服务中不包含服务图层" + this.wmtsParams.layer);
            return;
        }
        //设置是否使用自定义分辨率的切片规则
        if (this.options.continuousWorld) {
            //定义常用的默认的参考系
            if (this.capabilitiesInfo.tileGrid.resolutions != undefined) {
                var def = null;
                switch (this.capabilitiesInfo.code.toLowerCase()) {
                    case "epsg:4326":
                        def = "+proj=longlat +datum=WGS84 +no_defs";
                        break;
                    case "epsg:4545":
                        def = "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
                        break;
                    case "epsg:4546":
                        def = "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
                        break;
                    case "":
                        def = "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
                        break;
                    case "epsg:4490":
                        def = "+proj=longlat +ellps=GRS80 +units=degrees +no_defs";
                        break;
                    case "epsg:3857":
                        def = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
                        break;
                    default:
                        code = "EPSG:4326";
                        def = "+proj=longlat +datum=WGS84 +no_defs";
                }
                if (L.Proj != undefined) {
                    var crs = new L.Proj.CRS(this.capabilitiesInfo.code, def,
                        {
                            resolutions: this.capabilitiesInfo.tileGrid.resolutions,
                            origin: [this.capabilitiesInfo.tileGrid.origins[this.capabilitiesInfo.tileGrid.minZoom].lng, this.capabilitiesInfo.tileGrid.origins[this.capabilitiesInfo.tileGrid.minZoom].lat]
                        });

                    map.options.crs = crs;
                    this.options.crs = crs;
                } else {
                    alert("自定义分辨率出图需引入依赖库proj4-compressed.js和proj4leaflet.js");
                }
            }
        }
        this.options.minZoom = this.capabilitiesInfo.tileGrid.minZoom;
        this.options.maxZoom = this.capabilitiesInfo.tileGrid.maxZoom;
        this.fire('loaded');
        L.TileLayer.prototype.onAdd.call(this, map);
    },
    _errback: function (err) {
        console.log(err);
    },

    onAdd: function (map) {
        this._map = map;
        if (this.capabilitiesInfo != null) {
            this.fire('loaded');
            L.TileLayer.prototype.onAdd.call(this, map);
        } else {
            var getCapabilitiesUrl = this._url + "?request=GetCapabilities&service=wmts&layer=" + this.wmtsParams.layer;
            //解析GetCapabilities文件
            L.ajax({ url: getCapabilitiesUrl, success: this._callback.bind(this, map), fail: this._errback, type: "GET",async:false });
        }
    },
    _loadTile: function (tile, tilePoint) {
        if (this.getTileUrl(tilePoint) != false) {
        tile._layer = this;
        tile.onload = this._tileOnLoad;
        tile.onerror = this._tileOnError;

        this._adjustTilePoint(tilePoint);
        
            tile.src = this.getTileUrl(tilePoint);

            this.fire('tileloadstart', {
                tile: tile,
                url: tile.src
            });
        }

    },
    getTileUrl: function (tilePoint, zoom) { // (Point, Number) -> String
        var map = this._map;
        crs = map.options.crs;
        tileSize = this.capabilitiesInfo.tileGrid.tileSize;
        nwPoint = tilePoint.multiplyBy(tileSize);
        //+/-1 in order to be on the tile
        nwPoint.x += 1;
        nwPoint.y -= 1;
        sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
        nw = crs.project(map.unproject(nwPoint, zoom));
        se = crs.project(map.unproject(sePoint, zoom));
        tilewidth = se.x - nw.x;
        zoom = map.getZoom();
        if (zoom < this.capabilitiesInfo.tileGrid.minZoom || zoom > this.capabilitiesInfo.tileGrid.maxZoom) {
            return;
        }
        ident = this.capabilitiesInfo.tileGrid.matrixIds[zoom];
        //if (map.options.crs.code == "EPSG:3857") {
        //    X0 = this.matrixIds[zoom].topLeftCorner.lat;
        //    Y0 = this.matrixIds[zoom].topLeftCorner.lng;
        //} else {
        Y0 = this.capabilitiesInfo.tileGrid.origins[zoom].lat;
        X0 = this.capabilitiesInfo.tileGrid.origins[zoom].lng;
        //}
        //判断若超出范围则使之不显示
        //if (this.capabilitiesInfo.tileGrid != undefined && this.capabilitiesInfo.tileGrid.extent != undefined) {
        //    var minX = Math.floor((this.capabilitiesInfo.tileGrid.extent.getWest() - X0) / tilewidth);
        //    var maxX = Math.floor((this.capabilitiesInfo.tileGrid.extent.getEast() - X0) / tilewidth);
        //    var minY = Math.floor((Y0-this.capabilitiesInfo.tileGrid.extent.getNorth()) / tilewidth);
        //    var maxY = Math.floor((Y0 - this.capabilitiesInfo.tileGrid.extent.getSouth()) / tilewidth);
        //    if (tilePoint.x < minX || tilePoint.x > maxX || tilePoint.y < minY || tilePoint.y > maxY) {
        //        return false;
        //    }
        //}//注释 by hqh 20180730，dom影像地图加载
        tilecol = Math.floor((nw.x - X0) / tilewidth);
        tilerow = -Math.floor((nw.y - Y0) / tilewidth);

        url = L.Util.template(this._url, { s: this._getSubdomain(tilePoint) });
        return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow + "&tilecol=" + tilecol;
        //return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilePoint.y + "&tilecol=" + tilePoint.x;
    },

    setParams: function (params, noRedraw) {
        L.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    },

    fitBounds: function (bounds) {
        if (bounds) {
            if (this.capabilitiesInfo.tileGrid.maxZoom != undefined) this._map.fitBounds(bounds, { maxZoom: this.capabilitiesInfo.tileGrid.maxZoom });
            else this._map.fitBounds(bounds);

        } else {
            if (this.capabilitiesInfo.tileGrid != undefined && this.capabilitiesInfo.tileGrid.wgs84Extent != undefined) {
                if (this.capabilitiesInfo.tileGrid.maxZoom != undefined) this._map.fitBounds(this.capabilitiesInfo.tileGrid.wgs84Extent, { maxZoom: this.capabilitiesInfo.tileGrid.maxZoom });
                else this._map.fitBounds(this.capabilitiesInfo.tileGrid.wgs84Extent);
            }
        }
    }

});

L.tileLayer.wmts = function (url, options) {
    return new L.TileLayer.WMTS(url, options);
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {


L.TileLayer.WMTSCacheLayer = L.TileLayer.extend({

    defaultWmtsParams: {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        layer: null,
        style: '',
        tilematrixSet: '',
        format: 'image/jpeg',
        tileSize: 256
    },

    initialize: function (url, options) { // (String, Object)
        this.capabilitiesInfo = null;
        this.wmtsParams = L.extend({}, this.defaultWmtsParams);
        if (typeof url === 'object') {
            this.capabilitiesInfo = url;
            this._url = this.capabilitiesInfo.urls[0];
            if (this._url.indexOf("?") > 0) {
                this._url = this._url.split("?")[0];
            }
            this.wmtsParams.layer = this.capabilitiesInfo.layer;
            this.wmtsParams.tileSize = this.capabilitiesInfo.tileGrid.tileSize;
            this.continuousWorld = this.capabilitiesInfo.continuousWorld;
        } else {
            this._url = url;
            for (var i in options) {
                // all keys that are not TileLayer options go to WMTS params
                if (!this.options.hasOwnProperty(i) && i != "matrixIds") {
                    this.wmtsParams[i] = options[i];
                }
            }
        }
        if (this.wmtsParams.layer == null) {
            alert("请输入必填参数layer的值！");
            return;
        }
        L.setOptions(this, options);
    },

    _callback: function (map, data) {
        var xml = new L.X2JS();
        this.capabilitiesInfo = L.wmtsGetCapabilities().optionsFromCapabilities(xml.xml_str2json(data), { layer: this.wmtsParams.layer });
        if (this.capabilitiesInfo.matrixSet == null) {
            alert("wmts服务中不包含服务图层" + this.wmtsParams.layer);
            return;
        }
        //设置是否使用自定义分辨率的切片规则
        if (this.options.continuousWorld) {
            //定义常用的默认的参考系
            if (this.capabilitiesInfo.tileGrid.resolutions != undefined) {
                var def = null;
                switch (this.capabilitiesInfo.code.toLowerCase()) {
                    case "epsg:4326":
                        def = "+proj=longlat +datum=WGS84 +no_defs";
                        break;
                    case "epsg:4545":
                        def = "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
                        break;
                    case "epsg:4546":
                        def = "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
                        break;
                    case "":
                        def = "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
                        break;
                    case "epsg:4490":
                        def = "+proj=longlat +ellps=GRS80 +units=degrees +no_defs";
                        break;
                    case "epsg:3857":
                        def = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
                        break;
                    default:
                        code = "EPSG:4326";
                        def = "+proj=longlat +datum=WGS84 +no_defs";
                }
                if (L.Proj != undefined) {
                    var crs = new L.Proj.CRS(this.capabilitiesInfo.code, def,
                        {
                            resolutions: this.capabilitiesInfo.tileGrid.resolutions,
                            origin: [this.capabilitiesInfo.tileGrid.origins[this.capabilitiesInfo.tileGrid.minZoom].lng, this.capabilitiesInfo.tileGrid.origins[this.capabilitiesInfo.tileGrid.minZoom].lat]
                        });

                    map.options.crs = crs;
                    this.options.crs = crs;
                } else {
                    alert("自定义分辨率出图需引入依赖库proj4-compressed.js和proj4leaflet.js");
                }
            }
        }
        this.fire('loaded');
        L.TileLayer.prototype.onAdd.call(this, map);
    },
    _errback: function (err) {
        console.log(err);
    },

    onAdd: function (map) {
        this._map = map;
        if (this.capabilitiesInfo != null) {
            this.fire('loaded');
            L.TileLayer.prototype.onAdd.call(this, map);
        } else {
            var getCapabilitiesUrl = this._url + "?request=GetCapabilities&service=wmts";
            //解析GetCapabilities文件
            L.ajax({ url: getCapabilitiesUrl, success: this._callback.bind(this, map), fail: this._errback, type: "GET" });
        }
    },

    getTileUrl: function (tilePoint, zoom) { // (Point, Number) -> String
        var map = this._map;
        crs = map.options.crs;
        tileSize = this.capabilitiesInfo.tileGrid.tileSize;
        nwPoint = tilePoint.multiplyBy(tileSize);
        //+/-1 in order to be on the tile
        nwPoint.x += 1;
        nwPoint.y -= 1;
        sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
        nw = crs.project(map.unproject(nwPoint, zoom));
        se = crs.project(map.unproject(sePoint, zoom));
        tilewidth = se.x - nw.x;
        zoom = map.getZoom();
        if (zoom < this.capabilitiesInfo.tileGrid.minZoom || zoom > this.capabilitiesInfo.tileGrid.maxZoom) {
            return;
        }
        ident = this.capabilitiesInfo.tileGrid.matrixIds[zoom];
        //if (map.options.crs.code == "EPSG:3857") {
        //    X0 = this.matrixIds[zoom].topLeftCorner.lat;
        //    Y0 = this.matrixIds[zoom].topLeftCorner.lng;
        //} else {
        Y0 = this.capabilitiesInfo.tileGrid.origins[zoom].lat;
        X0 = this.capabilitiesInfo.tileGrid.origins[zoom].lng;
        //}
        tilecol = Math.floor((nw.x - X0) / tilewidth);
        tilerow = -Math.floor((nw.y - Y0) / tilewidth);
        url = L.Util.template(this._url, { s: this._getSubdomain(tilePoint) });
        return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow + "&tilecol=" + tilecol;
    },


    _addTile: function (tilePoint, container) {
        var tilePos = this._getTilePos(tilePoint);

        // get unused tile - or create a new tile
        var tile = this._getTile();
        /*
        Chrome 20 layouts much faster with top/left (verify with timeline, frames)
        Android 4 browser has display issues with top/left and requires transform instead
        (other browsers don't currently care) - see debug/hacks/jitter.html for an example
        */
        //==================addBy yj-begin==================
        if (this._map.getZoom() < this.capabilitiesInfo.tileGrid.minZoom || this._map.getZoom() > this.capabilitiesInfo.tileGrid.maxZoom) {
            var leftPx = parseInt(this._tempTile.style.left.replace("px", ""));
            var TopPx = parseInt(this._tempTile.style.top.replace("px", ""));
            tile.style.left = leftPx + (tilePoint.x - this._tempTile.pointX) * 256 + 'px';
            tile.style.top = TopPx + (tilePoint.y - this._tempTile.pointY) * 256 + 'px';
            this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;
            this._loadTile(tile, tilePoint);
            container.appendChild(tile);
        } else {
            //==================addBy yj-end==================
            L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);
            //==================addBy yj-begin==================
            if (this._map.getZoom() == this.capabilitiesInfo.tileGrid.minZoom) {
                if (!this._tempTile) {
                    this._tempTile = tile;
                    this._tempTile.pointX = tilePoint.x;
                    this._tempTile.pointY = tilePoint.y;
                }
            } else {
                this._tempTile = null;
            }
            //==================addBy yj-end==================
            this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;

            this._loadTile(tile, tilePoint);

            if (tile.parentNode !== this._tileContainer) {
                container.appendChild(tile);
            }
        }
    },

    _reset: function (e) {
        for (var key in this._tiles) {
            this.fire('tileunload', { tile: this._tiles[key] });
        }
        //====================================================================
        if (this._map.getZoom() >= this.capabilitiesInfo.tileGrid.minZoom && this._map.getZoom() <= this.capabilitiesInfo.tileGrid.maxZoom) {
            this._tiles = {};
            this._tilesToLoad = 0;
        }

        if (this.options.reuseTiles) {
            this._unusedTiles = [];
        }

        this._tileContainer.innerHTML = '';

        if (this._animated && e && e.hard) {
            this._clearBgBuffer();
        }

        this._initContainer();
    },

    _addTilesFromCenterOut_2: function (bounds) {
        var queue = [],
			center = bounds.getCenter();

        var j, i, point;

        for (j = bounds.min.y; j <= bounds.max.y; j++) {
            for (i = bounds.min.x; i <= bounds.max.x; i++) {
                point = new L.Point(i, j);

                if (this._tileShouldBeLoaded(point)) {
                    queue.push(point);
                }
            }
        }
        var tilesToLoad = queue.length;
        if (tilesToLoad === 0) { return; }
        // load tiles in order of their distance to center
        queue.sort(function (a, b) {
            return a.distanceTo(center) - b.distanceTo(center);
        });
        //var fragment = document.createDocumentFragment();
        // if its the first batch of tiles to load
        if (!this._tilesToLoad) {
            this.fire('loading');
        }
        this._tilesToLoad += tilesToLoad;
        for (i = 0; i < tilesToLoad; i++) {
            this._addTile(queue[i], this._bgBuffer);
        }
        //this._tileContainer.appendChild(fragment);
    },

    _update: function () {

        if (!this._map) { return; }

        var map = this._map,
			bounds = map.getPixelBounds(),
			zoom = map.getZoom(),
			tileSize = this._getTileSize();

        if (zoom > this.capabilitiesInfo.tileGrid.maxZoom || zoom < this.capabilitiesInfo.tileGrid.minZoom) {
            console.log('1111111111111111111111111111111111111111111111111111111111');
            return;
        }

        var tileBounds;
        //======================================================================================================
        if (this._map.getZoom() < this.capabilitiesInfo.tileGrid.minZoom || this._map.getZoom() > this.capabilitiesInfo.tileGrid.maxZoom) {
            if (this._tempTileBounds) {
                var x = this._tempTileBounds.max.x - this._tempTileBounds.min.x;
                var y = this._tempTileBounds.max.y - this._tempTileBounds.min.y;
                var OffsetX = x * (Math.pow(2, (this.capabilitiesInfo.tileGrid.minZoom - this._map.getZoom())) - 1);
                var OffsetY = y * (Math.pow(2, (this.capabilitiesInfo.tileGrid.minZoom - this._map.getZoom())) - 1);
                var Xmin = this._tempTileBounds.min.x - OffsetX;
                var Ymin = this._tempTileBounds.min.y - OffsetY;
                var Xmax = this._tempTileBounds.max.x + OffsetX;
                var Ymax = this._tempTileBounds.max.y + OffsetY;
                var mouseX = this._mousePoint.x - this._mousePoint.x * (1 / Math.pow(2, (this.capabilitiesInfo.tileGrid.minZoom - this._map.getZoom())) - 1);
                var mouseY = this._mousePoint.y - this._mousePoint.y * (1 / Math.pow(2, (this.capabilitiesInfo.tileGrid.minZoom - this._map.getZoom())) - 1);
                var p1 = L.point(Xmin + (mouseX / tileSize), (Ymin + mouseY / tileSize))._floor(),
					p2 = L.point(Xmax + (mouseX / tileSize), (Ymax + mouseY / tileSize))._floor();
                var tileBounds = L.bounds(p1, p2);
                this._addTilesFromCenterOut_2(tileBounds);
            }
            //============================================================================
        } else {
            tileBounds = L.bounds(
				bounds.min.divideBy(tileSize)._floor(),
				bounds.max.divideBy(tileSize)._floor());
            //=====================================begin==================================
            if (this._map.getZoom() == this.capabilitiesInfo.tileGrid.minZoom) {
                this._tempTileBounds = tileBounds;
                this._tempBounds = bounds;
            } else if (this._map.getZoom() == this.capabilitiesInfo.tileGrid.maxZoom) {
                this._tempTileBounds = tileBounds;
                this._tempBounds = bounds;
            }
            //=========================================end======================================
            this._addTilesFromCenterOut(tileBounds);
        }



        if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
            this._removeOtherTiles(tileBounds);
        }
    },
    _tileLoaded: function () {
        if (this._map.getZoom() >= this.capabilitiesInfo.tileGrid.minZoom && this._map.getZoom() <= this.capabilitiesInfo.tileGrid.maxZoom) {
            this._tilesToLoad--;
            if (this._animated) {
                L.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated');
            }

            if (!this._tilesToLoad) {

                this.fire('load');
                if (this._animated) {
                    // clear scaled tiles after all new tiles are loaded (for performance)
                    clearTimeout(this._clearBgBufferTimer);
                    this._clearBgBufferTimer = setTimeout(L.bind(this._clearBgBuffer, this), 500);
                }
            }

        }
    },
    _clearBgBuffer: function () {
        var zoom = this._map.getZoom();
        if (zoom >= this.capabilitiesInfo.tileGrid.minZoom && zoom <= this.capabilitiesInfo.tileGrid.maxZoom) {
            var map = this._map;
            if (map && !map._animatingZoom && !map.touchZoom._zooming) {
                this._bgBuffer.innerHTML = '';
                this._bgBuffer.style[L.DomUtil.TRANSFORM] = '';
            }
        }
    },

    _prepareBgBuffer: function () {

        var front = this._tileContainer,
			bg = this._bgBuffer;

        // if foreground layer doesn't have many tiles but bg layer does,
        // keep the existing bg layer and just zoom it some more

        var bgLoaded = this._getLoadedTilesPercentage(bg),
			frontLoaded = this._getLoadedTilesPercentage(front);
        var zoom = this._map.getZoom();
        if (zoom < this.capabilitiesInfo.tileGrid.minZoom || zoom > this.capabilitiesInfo.tileGrid.maxZoom) {
            return;
        }

        if (bgLoaded > 0.5 || frontLoaded < 0.5) {

            return;
        }

        if (bg && bgLoaded > 0.5 && frontLoaded < 0.5) {

            //front.style.visibility = 'hidden';
            //this._stopLoadingImages(front);
            return;
        }

        // prepare the buffer to become the front tile pane
        bg.style.visibility = 'hidden';
        bg.style[L.DomUtil.TRANSFORM] = '';

        // switch out the current layer to be the new bg layer (and vice-versa)
        this._tileContainer = bg;
        bg = this._bgBuffer = front;

        this._stopLoadingImages(bg);

        //prevent bg buffer from clearing right after zoom
        clearTimeout(this._clearBgBufferTimer);
    },

    setParams: function (params, noRedraw) {
        L.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    },

    fitBounds: function (bounds) {
        if (bounds) {
            if (this.capabilitiesInfo.tileGrid.maxZoom != undefined) this._map.fitBounds(bounds, { maxZoom: this.capabilitiesInfo.tileGrid.maxZoom });
            else this._map.fitBounds(bounds);

        } else {
            if (this.capabilitiesInfo.tileGrid.wgs84Extent != undefined) {
                if (this.capabilitiesInfo.tileGrid.maxZoom != undefined) this._map.fitBounds(this.capabilitiesInfo.tileGrid.wgs84Extent, { maxZoom: this.capabilitiesInfo.tileGrid.maxZoom });
                else this._map.fitBounds(this.capabilitiesInfo.tileGrid.wgs84Extent);
            }
        }
    }

});

L.tileLayer.wmtsCacheLayer = function (url, options) {
    return new L.TileLayer.WMTSCacheLayer(url, options);
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

L.TileLayer.TDT = L.TileLayer.extend({

    defaultWmtsParams: {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        layer: '',
        style: '',
        tilematrixSet: '',
        format: 'image/jpeg'
    },

    initialize: function (url, options) { // (String, Object)
        this._url = url;
        var wmtsParams = L.extend({}, this.defaultWmtsParams),
        tileSize = options.tileSize || this.options.tileSize;
        if (options.detectRetina && L.Browser.retina) {
            wmtsParams.width = wmtsParams.height = tileSize * 2;
        } else {
            wmtsParams.width = wmtsParams.height = tileSize;
        }
        for (var i in options) {
            // all keys that are not TileLayer options go to WMTS params
            if (!this.options.hasOwnProperty(i) && i!="matrixIds") {
                wmtsParams[i] = options[i];
            }
        }
        this.wmtsParams = wmtsParams;
        this.matrixIds = options.matrixIds||this.getDefaultMatrix();
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    getTileUrl: function (tilePoint, zoom) { // (Point, Number) -> String
        var map = this._map;
        crs = map.options.crs;
        tileSize = this.options.tileSize;
        nwPoint = tilePoint.multiplyBy(tileSize);
        //+/-1 in order to be on the tile
        nwPoint.x+=1;
        nwPoint.y-=1;
        sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
        nw = crs.project(map.unproject(nwPoint, zoom));
        se = crs.project(map.unproject(sePoint, zoom));
        tilewidth = se.x-nw.x;
        zoom=map.getZoom();
        ident = this.matrixIds[zoom].identifier;
        X0 = this.matrixIds[zoom].topLeftCorner.lng;
        Y0 = this.matrixIds[zoom].topLeftCorner.lat;
        tilecol=Math.floor((nw.x-X0)/tilewidth);
        tilerow=-Math.floor((nw.y-Y0)/tilewidth);
        url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});
        return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow +"&tilecol=" + tilecol;
    },

    setParams: function (params, noRedraw) {
        L.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    },
    
    getDefaultMatrix : function () {
        /**
         * the matrix3857 represents the projection 
         * for in the IGN WMTS for the google coordinates.
         */
        var matrixIds3857 = new Array(20);
        for (var i= 0; i<20; i++) {
            matrixIds3857[i]= {
                identifier: i+"",
                topLeftCorner : new L.LatLng(90,-180)
            };
        }
        return matrixIds3857;
    }
});

L.tileLayer.tdt = function (url, options) {
    return new L.TileLayer.TDT(url, options);
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

L.KML = L.FeatureGroup.extend({
	options: {
		async: true
	},

	initialize: function (kml, options) {
		L.Util.setOptions(this, options);
		this._kml = kml;
		this._layers = {};

		if (kml) {
			this.addKML(kml, options, this.options.async);
		}
	},

	loadXML: function (url, cb, options, async) {
		if (async === undefined) async = this.options.async;
		if (options === undefined) options = this.options;

		var req = new window.XMLHttpRequest();
		
		// Check for IE8 and IE9 Fix Cors for those browsers
		if (req.withCredentials === undefined && typeof window.XDomainRequest !== 'undefined') {
			var xdr = new window.XDomainRequest();
			xdr.open('GET', url, async);
			xdr.onprogress = function () { };
			xdr.ontimeout = function () { };
			xdr.onerror = function () { };
			xdr.onload = function () {
				if (xdr.responseText) {
					var xml = new window.ActiveXObject('Microsoft.XMLDOM');
					xml.loadXML(xdr.responseText);
					cb(xml, options);
				}
			};
			setTimeout(function () { xdr.send(); }, 0);
		} else {
			req.open('GET', url, async);
			req.setRequestHeader('Accept', 'application/vnd.google-earth.kml+xml');
			try {
				req.overrideMimeType('text/xml'); // unsupported by IE
			} catch (e) { }
			req.onreadystatechange = function () {
				if (req.readyState !== 4) return;
				if (req.status === 200) cb(req.responseXML, options);
			};
			req.send(null);
		}
	},

	addKML: function (url, options, async) {
		var _this = this;
		var cb = function (kml) { _this._addKML(kml); };
		this.loadXML(url, cb, options, async);
	},

	_addKML: function (xml) {
		var layers = L.KML.parseKML(xml);
		if (!layers || !layers.length) return;
		for (var i = 0; i < layers.length; i++) {
			this.fire('addlayer', {
				layer: layers[i]
			});
			this.addLayer(layers[i]);
		}
		this.latLngs = L.KML.getLatLngs(xml);
		this.fire('loaded');
	},

	latLngs: []
});

L.Util.extend(L.KML, {

	parseKML: function (xml) {
		var style = this.parseStyles(xml);
		this.parseStyleMap(xml, style);
		var el = xml.getElementsByTagName('Folder');
		var layers = [], l;
		for (var i = 0; i < el.length; i++) {
			if (!this._check_folder(el[i])) { continue; }
			l = this.parseFolder(el[i], style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('Placemark');
		for (var j = 0; j < el.length; j++) {
			if (!this._check_folder(el[j])) { continue; }
			l = this.parsePlacemark(el[j], xml, style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('GroundOverlay');
		for (var k = 0; k < el.length; k++) {
			l = this.parseGroundOverlay(el[k]);
			if (l) { layers.push(l); }
		}
		return layers;
	},

	// Return false if e's first parent Folder is not [folder]
	// - returns true if no parent Folders
	_check_folder: function (e, folder) {
		e = e.parentNode;
		while (e && e.tagName !== 'Folder')
		{
			e = e.parentNode;
		}
		return !e || e === folder;
	},

	parseStyles: function (xml) {
		var styles = {};
		var sl = xml.getElementsByTagName('Style');
		for (var i=0, len=sl.length; i<len; i++) {
			var style = this.parseStyle(sl[i]);
			if (style) {
				var styleName = '#' + style.id;
				styles[styleName] = style;
			}
		}
		return styles;
	},

	parseStyle: function (xml) {
		var style = {}, poptions = {}, ioptions = {}, el, id;

		var attributes = {color: true, width: true, Icon: true, href: true, hotSpot: true};

		function _parse (xml) {
			var options = {};
			for (var i = 0; i < xml.childNodes.length; i++) {
				var e = xml.childNodes[i];
				var key = e.tagName;
				if (!attributes[key]) { continue; }
				if (key === 'hotSpot')
				{
					for (var j = 0; j < e.attributes.length; j++) {
						options[e.attributes[j].name] = e.attributes[j].nodeValue;
					}
				} else {
					var value = e.childNodes[0].nodeValue;
					if (key === 'color') {
						options.opacity = parseInt(value.substring(0, 2), 16) / 255.0;
						options.color = '#' + value.substring(6, 8) + value.substring(4, 6) + value.substring(2, 4);
					} else if (key === 'width') {
						options.weight = value;
					} else if (key === 'Icon') {
						ioptions = _parse(e);
						if (ioptions.href) { options.href = ioptions.href; }
					} else if (key === 'href') {
						options.href = value;
					}
				}
			}
			return options;
		}

		el = xml.getElementsByTagName('LineStyle');
		if (el && el[0]) { style = _parse(el[0]); }
		el = xml.getElementsByTagName('PolyStyle');
		if (el && el[0]) { poptions = _parse(el[0]); }
		if (poptions.color) { style.fillColor = poptions.color; }
		if (poptions.opacity) { style.fillOpacity = poptions.opacity; }
		el = xml.getElementsByTagName('IconStyle');
		if (el && el[0]) { ioptions = _parse(el[0]); }
		if (ioptions.href) {
			style.icon = new L.KMLIcon({
				iconUrl: ioptions.href,
				shadowUrl: null,
				anchorRef: {x: ioptions.x, y: ioptions.y},
				anchorType:	{x: ioptions.xunits, y: ioptions.yunits}
			});
		}
		
		id = xml.getAttribute('id');
		if (id && style) {
			style.id = id;
		}
		
		return style;
	},
	
	parseStyleMap: function (xml, existingStyles) {
		var sl = xml.getElementsByTagName('StyleMap');
		
		for (var i = 0; i < sl.length; i++) {
			var e = sl[i], el;
			var smKey, smStyleUrl;
			
			el = e.getElementsByTagName('key');
			if (el && el[0]) { smKey = el[0].textContent; }
			el = e.getElementsByTagName('styleUrl');
			if (el && el[0]) { smStyleUrl = el[0].textContent; }
			
			if (smKey === 'normal')
			{
				existingStyles['#' + e.getAttribute('id')] = existingStyles[smStyleUrl];
			}
		}
		
		return;
	},

	parseFolder: function (xml, style) {
		var el, layers = [], l;
		el = xml.getElementsByTagName('Folder');
		for (var i = 0; i < el.length; i++) {
			if (!this._check_folder(el[i], xml)) { continue; }
			l = this.parseFolder(el[i], style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('Placemark');
		for (var j = 0; j < el.length; j++) {
			if (!this._check_folder(el[j], xml)) { continue; }
			l = this.parsePlacemark(el[j], xml, style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('GroundOverlay');
		for (var k = 0; k < el.length; k++) {
			if (!this._check_folder(el[k], xml)) { continue; }
			l = this.parseGroundOverlay(el[k]);
			if (l) { layers.push(l); }
		}
		if (!layers.length) { return; }
		if (layers.length === 1) { return layers[0]; }
		return new L.FeatureGroup(layers);
	},

	parsePlacemark: function (place, xml, style, options) {
		var h, i, j, k, el, il, opts = options || {};

		el = place.getElementsByTagName('styleUrl');
		for (i = 0; i < el.length; i++) {
			var url = el[i].childNodes[0].nodeValue;
			for (var a in style[url]) {
				opts[a] = style[url][a];
			}
		}
		
		il = place.getElementsByTagName('Style')[0];
		if (il) {
			var inlineStyle = this.parseStyle(place);
			if (inlineStyle) {
				for (k in inlineStyle) {
					opts[k] = inlineStyle[k];
				}
			}
		}

		var multi = ['MultiGeometry', 'MultiTrack', 'gx:MultiTrack'];
		for (h in multi) {
			el = place.getElementsByTagName(multi[h]);
			for (i = 0; i < el.length; i++) {
				return this.parsePlacemark(el[i], xml, style, opts);
			}
		}
		
		var layers = [];

		var parse = ['LineString', 'Polygon', 'Point', 'Track', 'gx:Track'];
		for (j in parse) {
			var tag = parse[j];
			el = place.getElementsByTagName(tag);
			for (i = 0; i < el.length; i++) {
				var l = this['parse' + tag.replace(/gx:/, '')](el[i], xml, opts);
				if (l) { layers.push(l); }
			}
		}

		if (!layers.length) {
			return;
		}
		var layer = layers[0];
		if (layers.length > 1) {
			layer = new L.FeatureGroup(layers);
		}

		var name, descr = '';
		el = place.getElementsByTagName('name');
		if (el.length && el[0].childNodes.length) {
			name = el[0].childNodes[0].nodeValue;
		}
		el = place.getElementsByTagName('description');
		for (i = 0; i < el.length; i++) {
			for (j = 0; j < el[i].childNodes.length; j++) {
				descr = descr + el[i].childNodes[j].nodeValue;
			}
		}

		if (name) {
			layer.on('add', function () {
				layer.bindPopup('<h2>' + name + '</h2>' + descr);
			});
		}

		return layer;
	},

	parseCoords: function (xml) {
		var el = xml.getElementsByTagName('coordinates');
		return this._read_coords(el[0]);
	},

	parseLineString: function (line, xml, options) {
		var coords = this.parseCoords(line);
		if (!coords.length) { return; }
		return new L.Polyline(coords, options);
	},

	parseTrack: function (line, xml, options) {
		var el = xml.getElementsByTagName('gx:coord');
		if (el.length === 0) { el = xml.getElementsByTagName('coord'); }
		var coords = [];
		for (var j = 0; j < el.length; j++) {
			coords = coords.concat(this._read_gxcoords(el[j]));
		}
		if (!coords.length) { return; }
		return new L.Polyline(coords, options);
	},

	parsePoint: function (line, xml, options) {
		var el = line.getElementsByTagName('coordinates');
		if (!el.length) {
			return;
		}
		var ll = el[0].childNodes[0].nodeValue.split(',');
		return new L.KMLMarker(new L.LatLng(ll[1], ll[0]), options);
	},

	parsePolygon: function (line, xml, options) {
		var el, polys = [], inner = [], i, coords;
		el = line.getElementsByTagName('outerBoundaryIs');
		for (i = 0; i < el.length; i++) {
			coords = this.parseCoords(el[i]);
			if (coords) {
				polys.push(coords);
			}
		}
		el = line.getElementsByTagName('innerBoundaryIs');
		for (i = 0; i < el.length; i++) {
			coords = this.parseCoords(el[i]);
			if (coords) {
				inner.push(coords);
			}
		}
		if (!polys.length) {
			return;
		}
		if (options.fillColor) {
			options.fill = true;
		}
		if (polys.length === 1) {
			return new L.Polygon(polys.concat(inner), options);
		}
		return new L.MultiPolygon(polys, options);
	},

	getLatLngs: function (xml) {
		var el = xml.getElementsByTagName('coordinates');
		var coords = [];
		for (var j = 0; j < el.length; j++) {
			// text might span many childNodes
			coords = coords.concat(this._read_coords(el[j]));
		}
		return coords;
	},

	_read_coords: function (el) {
		var text = '', coords = [], i;
		for (i = 0; i < el.childNodes.length; i++) {
			text = text + el.childNodes[i].nodeValue;
		}
		text = text.split(/[\s\n]+/);
		for (i = 0; i < text.length; i++) {
			var ll = text[i].split(',');
			if (ll.length < 2) {
				continue;
			}
			coords.push(new L.LatLng(ll[1], ll[0]));
		}
		return coords;
	},

	_read_gxcoords: function (el) {
		var text = '', coords = [];
		text = el.firstChild.nodeValue.split(' ');
		coords.push(new L.LatLng(text[1], text[0]));
		return coords;
	},

	parseGroundOverlay: function (xml) {
		var latlonbox = xml.getElementsByTagName('LatLonBox')[0];
		var bounds = new L.LatLngBounds(
			[
				latlonbox.getElementsByTagName('south')[0].childNodes[0].nodeValue,
				latlonbox.getElementsByTagName('west')[0].childNodes[0].nodeValue
			],
			[
				latlonbox.getElementsByTagName('north')[0].childNodes[0].nodeValue,
				latlonbox.getElementsByTagName('east')[0].childNodes[0].nodeValue
			]
		);
		var attributes = {Icon: true, href: true, color: true};
		function _parse (xml) {
			var options = {}, ioptions = {};
			for (var i = 0; i < xml.childNodes.length; i++) {
				var e = xml.childNodes[i];
				var key = e.tagName;
				if (!attributes[key]) { continue; }
				var value = e.childNodes[0].nodeValue;
				if (key === 'Icon') {
					ioptions = _parse(e);
					if (ioptions.href) { options.href = ioptions.href; }
				} else if (key === 'href') {
					options.href = value;
				} else if (key === 'color') {
					options.opacity = parseInt(value.substring(0, 2), 16) / 255.0;
					options.color = '#' + value.substring(6, 8) + value.substring(4, 6) + value.substring(2, 4);
				}
			}
			return options;
		}
		var options = {};
		options = _parse(xml);
		if (latlonbox.getElementsByTagName('rotation')[0] !== undefined) {
			var rotation = latlonbox.getElementsByTagName('rotation')[0].childNodes[0].nodeValue;
			options.rotation = parseFloat(rotation);
		}
		return new L.RotatedImageOverlay(options.href, bounds, {opacity: options.opacity, angle: options.rotation});
	}

});

L.KMLIcon = L.Icon.extend({
	_setIconStyles: function (img, name) {
		L.Icon.prototype._setIconStyles.apply(this, [img, name]);
		var options = this.options;
		this.options.popupAnchor = [0,(-0.83*img.height)];
		if (options.anchorType.x === 'fraction')
			img.style.marginLeft = (-options.anchorRef.x * img.width) + 'px';
		if (options.anchorType.y === 'fraction')
			img.style.marginTop  = ((-(1 - options.anchorRef.y) * img.height) + 1) + 'px';
		if (options.anchorType.x === 'pixels')
			img.style.marginLeft = (-options.anchorRef.x) + 'px';
		if (options.anchorType.y === 'pixels')
			img.style.marginTop  = (options.anchorRef.y - img.height + 1) + 'px';
	}
});


L.KMLMarker = L.Marker.extend({
	options: {
		icon: new L.KMLIcon.Default()
	}
});

// Inspired by https://github.com/bbecquet/Leaflet.PolylineDecorator/tree/master/src
L.RotatedImageOverlay = L.ImageOverlay.extend({
	options: {
		angle: 0
	},
	_reset: function () {
		L.ImageOverlay.prototype._reset.call(this);
		this._rotate();
	},
	_animateZoom: function (e) {
		L.ImageOverlay.prototype._animateZoom.call(this, e);
		this._rotate();
	},
	_rotate: function () {
        if (L.DomUtil.TRANSFORM) {
            // use the CSS transform rule if available
            this._image.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
        } else if (L.Browser.ie) {
            // fallback for IE6, IE7, IE8
            var rad = this.options.angle * (Math.PI / 180),
                costheta = Math.cos(rad),
                sintheta = Math.sin(rad);
            this._image.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' + 
                costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';                
        }
	},
	getBounds: function () {
		return this._bounds;
	}
});



/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);
(function(EsriLeaflet){

  // normalize request animation frame
  var raf = window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(cb) { return window.setTimeout(cb, 1000 / 60); };

  // shallow object clone for feature properties and attributes
  // from http://jsperf.com/cloning-an-object/2
  function clone(obj) {
    var target = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        target[i] = obj[i];
      }
    }
    return target;
  }

  // checks if 2 x,y points are equal
  function pointsEqual(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  // checks if the first and last points of a ring are equal and closes the ring
  function closeRing(coordinates) {
    if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
      coordinates.push(coordinates[0]);
    }
    return coordinates;
  }

  // determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
  // or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
  // points-are-in-clockwise-order
  function ringIsClockwise(ringToTest) {
    var total = 0,i = 0;
    var rLength = ringToTest.length;
    var pt1 = ringToTest[i];
    var pt2;
    for (i; i < rLength - 1; i++) {
      pt2 = ringToTest[i + 1];
      total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
      pt1 = pt2;
    }
    return (total >= 0);
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L504-L519
  function vertexIntersectsVertex(a1, a2, b1, b2) {
    var uaT = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
    var ubT = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
    var uB  = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

    if ( uB !== 0 ) {
      var ua = uaT / uB;
      var ub = ubT / uB;

      if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
        return true;
      }
    }

    return false;
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L521-L531
  function arrayIntersectsArray(a, b) {
    for (var i = 0; i < a.length - 1; i++) {
      for (var j = 0; j < b.length - 1; j++) {
        if (vertexIntersectsVertex(a[i], a[i + 1], b[j], b[j + 1])) {
          return true;
        }
      }
    }

    return false;
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L470-L480
  function coordinatesContainPoint(coordinates, point) {
    var contains = false;
    for(var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
      if (((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1]) ||
           (coordinates[j][1] <= point[1] && point[1] < coordinates[i][1])) &&
          (point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0])) {
        contains = !contains;
      }
    }
    return contains;
  }

  // ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L106-L113
  function coordinatesContainCoordinates(outer, inner){
    var intersects = arrayIntersectsArray(outer, inner);
    var contains = coordinatesContainPoint(outer, inner[0]);
    if(!intersects && contains){
      return true;
    }
    return false;
  }

  // do any polygons in this array contain any other polygons in this array?
  // used for checking for holes in arcgis rings
  // ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L117-L172
  function convertRingsToGeoJSON(rings){
    var outerRings = [];
    var holes = [];
    var x; // iterator
    var outerRing; // current outer ring being evaluated
    var hole; // current hole being evaluated

    // for each ring
    for (var r = 0; r < rings.length; r++) {
      var ring = closeRing(rings[r].slice(0));
      if(ring.length < 4){
        continue;
      }
      // is this ring an outer ring? is it clockwise?
      if(ringIsClockwise(ring)){
        var polygon = [ ring ];
        outerRings.push(polygon); // push to outer rings
      } else {
        holes.push(ring); // counterclockwise push to holes
      }
    }

    var uncontainedHoles = [];

    // while there are holes left...
    while(holes.length){
      // pop a hole off out stack
      hole = holes.pop();

      // loop over all outer rings and see if they contain our hole.
      var contained = false;
      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];
        if(coordinatesContainCoordinates(outerRing, hole)){
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          contained = true;
          break;
        }
      }

      // ring is not contained in any outer ring
      // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320
      if(!contained){
        uncontainedHoles.push(hole);
      }
    }

    // if we couldn't match any holes using contains we can try intersects...
    while(uncontainedHoles.length){
      // pop a hole off out stack
      hole = uncontainedHoles.pop();

      // loop over all outer rings and see if any intersect our hole.
      var intersects = false;
      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];
        if(arrayIntersectsArray(outerRing, hole)){
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          intersects = true;
          break;
        }
      }

      if(!intersects) {
        outerRings.push([hole.reverse()]);
      }
    }

    if(outerRings.length === 1){
      return {
        type: 'Polygon',
        coordinates: outerRings[0]
      };
    } else {
      return {
        type: 'MultiPolygon',
        coordinates: outerRings
      };
    }
  }

  // This function ensures that rings are oriented in the right directions
  // outer rings are clockwise, holes are counterclockwise
  // used for converting GeoJSON Polygons to ArcGIS Polygons
  function orientRings(poly){
    var output = [];
    var polygon = poly.slice(0);
    var outerRing = closeRing(polygon.shift().slice(0));
    if(outerRing.length >= 4){
      if(!ringIsClockwise(outerRing)){
        outerRing.reverse();
      }

      output.push(outerRing);

      for (var i = 0; i < polygon.length; i++) {
        var hole = closeRing(polygon[i].slice(0));
        if(hole.length >= 4){
          if(ringIsClockwise(hole)){
            hole.reverse();
          }
          output.push(hole);
        }
      }
    }

    return output;
  }

  // This function flattens holes in multipolygons to one array of polygons
  // used for converting GeoJSON Polygons to ArcGIS Polygons
  function flattenMultiPolygonRings(rings){
    var output = [];
    for (var i = 0; i < rings.length; i++) {
      var polygon = orientRings(rings[i]);
      for (var x = polygon.length - 1; x >= 0; x--) {
        var ring = polygon[x].slice(0);
        output.push(ring);
      }
    }
    return output;
  }

  // convert an extent (ArcGIS) to LatLngBounds (Leaflet)
  EsriLeaflet.Util.extentToBounds = function(extent){
    var sw = new L.LatLng(extent.ymin, extent.xmin);
    var ne = new L.LatLng(extent.ymax, extent.xmax);
    return new L.LatLngBounds(sw, ne);
  };

  // convert an LatLngBounds (Leaflet) to extent (ArcGIS)
  EsriLeaflet.Util.boundsToExtent = function(bounds) {
    bounds = L.latLngBounds(bounds);
    return {
      'xmin': bounds.getSouthWest().lng,
      'ymin': bounds.getSouthWest().lat,
      'xmax': bounds.getNorthEast().lng,
      'ymax': bounds.getNorthEast().lat,
      'spatialReference': {
        'wkid' : 4326
      }
    };
  };

  EsriLeaflet.Util.arcgisToGeojson = function (arcgis, idAttribute){
    var geojson = {};

    if(typeof arcgis.x === 'number' && typeof arcgis.y === 'number'){
      geojson.type = 'Point';
      geojson.coordinates = [arcgis.x, arcgis.y];
    }

    if(arcgis.points){
      geojson.type = 'MultiPoint';
      geojson.coordinates = arcgis.points.slice(0);
    }

    if(arcgis.paths) {
      if(arcgis.paths.length === 1){
        geojson.type = 'LineString';
        geojson.coordinates = arcgis.paths[0].slice(0);
      } else {
        geojson.type = 'MultiLineString';
        geojson.coordinates = arcgis.paths.slice(0);
      }
    }

    if(arcgis.rings) {
      geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
    }

    if(arcgis.geometry || arcgis.attributes) {
      geojson.type = 'Feature';
      geojson.geometry = (arcgis.geometry) ? EsriLeaflet.Util.arcgisToGeojson(arcgis.geometry) : null;
      geojson.properties = (arcgis.attributes) ? clone(arcgis.attributes) : null;
      if(arcgis.attributes) {
        geojson.id =  arcgis.attributes[idAttribute] || arcgis.attributes.OBJECTID || arcgis.attributes.FID;
      }
    }

    return geojson;
  };

  // GeoJSON -> ArcGIS
  EsriLeaflet.Util.geojsonToArcGIS = function(geojson, idAttribute){
    idAttribute = idAttribute || 'OBJECTID';
    var spatialReference = { wkid: 4326 };
    var result = {};
    var i;

    switch(geojson.type){
    case 'Point':
      result.x = geojson.coordinates[0];
      result.y = geojson.coordinates[1];
      result.spatialReference = spatialReference;
      break;
    case 'MultiPoint':
      result.points = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'LineString':
      result.paths = [geojson.coordinates.slice(0)];
      result.spatialReference = spatialReference;
      break;
    case 'MultiLineString':
      result.paths = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'Polygon':
      result.rings = orientRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'MultiPolygon':
      result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'Feature':
      if(geojson.geometry) {
        result.geometry = EsriLeaflet.Util.geojsonToArcGIS(geojson.geometry, idAttribute);
      }
      result.attributes = (geojson.properties) ? clone(geojson.properties) : {};
      if(geojson.id){
        result.attributes[idAttribute] = geojson.id;
      }
      break;
    case 'FeatureCollection':
      result = [];
      for (i = 0; i < geojson.features.length; i++){
        result.push(EsriLeaflet.Util.geojsonToArcGIS(geojson.features[i], idAttribute));
      }
      break;
    case 'GeometryCollection':
      result = [];
      for (i = 0; i < geojson.geometries.length; i++){
        result.push(EsriLeaflet.Util.geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }
      break;
    }

    return result;
  };

  EsriLeaflet.Util.responseToFeatureCollection = function(response, idAttribute){
    var objectIdField;

    if(idAttribute){
      objectIdField = idAttribute;
    } else if(response.objectIdFieldName){
      objectIdField = response.objectIdFieldName;
    } else if(response.fields) {
      for (var j = 0; j <= response.fields.length - 1; j++) {
        if(response.fields[j].type === 'esriFieldTypeOID') {
          objectIdField = response.fields[j].name;
          break;
        }
      }
    } else {
      objectIdField = 'OBJECTID';
    }

    var featureCollection = {
      type: 'FeatureCollection',
      features: []
    };
    var features = response.features || response.results;
    if(features.length){
      for (var i = features.length - 1; i >= 0; i--) {
        featureCollection.features.push(EsriLeaflet.Util.arcgisToGeojson(features[i], objectIdField));
      }
    }

    return featureCollection;
  };

    // trim url whitespace and add a trailing slash if needed
  EsriLeaflet.Util.cleanUrl = function(url){
    //trim leading and trailing spaces, but not spaces inside the url
    url = url.replace(/^\s+|\s+$|\A\s+|\s+\z/g, '');

    //add a trailing slash to the url if the user omitted it
    if(url[url.length-1] !== '/'){
      url += '/';
    }

    return url;
  };

  EsriLeaflet.Util.isArcgisOnline = function(url){
    /* hosted feature services can emit geojson natively.
    our check for 'geojson' support will need to be revisted
    once the functionality makes its way to ArcGIS Server*/
    return (/\.arcgis\.com.*?FeatureServer/g).test(url);
  };

  EsriLeaflet.Util.geojsonTypeToArcGIS = function (geoJsonType) {
    var arcgisGeometryType;
    switch (geoJsonType) {
    case 'Point':
      arcgisGeometryType = 'esriGeometryPoint';
      break;
    case 'MultiPoint':
      arcgisGeometryType = 'esriGeometryMultipoint';
      break;
    case 'LineString':
      arcgisGeometryType = 'esriGeometryPolyline';
      break;
    case 'MultiLineString':
      arcgisGeometryType = 'esriGeometryPolyline';
      break;
    case 'Polygon':
      arcgisGeometryType = 'esriGeometryPolygon';
      break;
    case 'MultiPolygon':
      arcgisGeometryType = 'esriGeometryPolygon';
      break;
    }
    return arcgisGeometryType;
  };

  EsriLeaflet.Util.requestAnimationFrame = L.Util.bind(raf, window);

  EsriLeaflet.Util.warn = function (message) {
    if(console && console.warn) {
      console.warn(message);
    }
  };

})(EsriLeaflet);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);
(function(EsriLeaflet){

  var callbacks = 0;

  window._EsriLeafletCallbacks = {};

  function serialize(params){
    var data = '';

    params.f = params.f || 'json';

    for (var key in params){
      if(params.hasOwnProperty(key)){
        var param = params[key];
        var type = Object.prototype.toString.call(param);
        var value;

        if(data.length){
          data += '&';
        }

        if (type === '[object Array]'){
          value = (Object.prototype.toString.call(param[0]) === '[object Object]') ? JSON.stringify(param) : param.join(',');
        } else if (type === '[object Object]') {
          value = JSON.stringify(param);
        } else if (type === '[object Date]'){
          value = param.valueOf();
        } else {
          value = param;
        }

        data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    return data;
  }

  function createRequest(callback, context){
    var httpRequest = new XMLHttpRequest();

    httpRequest.onerror = function(e) {
      httpRequest.onreadystatechange = L.Util.falseFn;

      callback.call(context, {
        error: {
          code: 500,
          message: 'XMLHttpRequest error'
        }
      }, null);
    };

    httpRequest.onreadystatechange = function(){
      var response;
      var error;

      if (httpRequest.readyState === 4) {
        try {
          response = JSON.parse(httpRequest.responseText);
        } catch(e) {
          response = null;
          error = {
            code: 500,
            message: 'Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error.'
          };
        }

        if (!error && response.error) {
          error = response.error;
          response = null;
        }

        httpRequest.onerror = L.Util.falseFn;

        callback.call(context, error, response);
      }
    };

    return httpRequest;
  }

  // AJAX handlers for CORS (modern browsers) or JSONP (older browsers)
  EsriLeaflet.Request = {
    request: function(url, params, callback, context){
      var paramString = serialize(params);
      var httpRequest = createRequest(callback, context);
      var requestLength = (url + '?' + paramString).length;

      // request is less then 2000 characters and the browser supports CORS, make GET request with XMLHttpRequest
      if(requestLength <= 2000 && L.esri.Support.CORS){
        httpRequest.open('GET', url + '?' + paramString);
        httpRequest.send(null);

      // request is less more then 2000 characters and the browser supports CORS, make POST request with XMLHttpRequest
      } else if (requestLength > 2000 && L.esri.Support.CORS){
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(paramString);

      // request is less more then 2000 characters and the browser does not support CORS, make a JSONP request
      } else if(requestLength <= 2000 && !L.esri.Support.CORS){
        return L.esri.Request.get.JSONP(url, params, callback, context);

      // request is longer then 2000 characters and the browser does not support CORS, log a warning
      } else {
        EsriLeaflet.Util.warn('a request to ' + url + ' was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html');
        return;
      }

      return httpRequest;
    },

    post: {
      XMLHTTP: function (url, params, callback, context) {
        var httpRequest = createRequest(callback, context);
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(serialize(params));

        return httpRequest;
      }
    },

    get: {
      CORS: function (url, params, callback, context) {
        var httpRequest = createRequest(callback, context);

        httpRequest.open('GET', url + '?' + serialize(params), true);
        httpRequest.send(null);

        return httpRequest;
      },
      JSONP: function(url, params, callback, context){
        var callbackId = 'c' + callbacks;

        params.callback = 'window._EsriLeafletCallbacks.' + callbackId;

        var script = L.DomUtil.create('script', null, document.body);
        script.type = 'text/javascript';
        script.src = url + '?' +  serialize(params);
        script.id = callbackId;

        window._EsriLeafletCallbacks[callbackId] = function(response){
          if(window._EsriLeafletCallbacks[callbackId] !== true){
            var error;
            var responseType = Object.prototype.toString.call(response);

            if(!(responseType === '[object Object]' || responseType === '[object Array]')){
              error = {
                error: {
                  code: 500,
                  message: 'Expected array or object as JSONP response'
                }
              };
              response = null;
            }

            if (!error && response.error) {
              error = response;
              response = null;
            }

            callback.call(context, error, response);
            window._EsriLeafletCallbacks[callbackId] = true;
          }
        };

        callbacks++;

        return {
          id: callbackId,
          url: script.src,
          abort: function(){
            window._EsriLeafletCallbacks._callback[callbackId]({
              code: 0,
              message: 'Request aborted.'
            });
          }
        };
      }
    }
  };

  // choose the correct AJAX handler depending on CORS support
  EsriLeaflet.get = (EsriLeaflet.Support.CORS) ? EsriLeaflet.Request.get.CORS : EsriLeaflet.Request.get.JSONP;

  // always use XMLHttpRequest for posts
  EsriLeaflet.post = EsriLeaflet.Request.post.XMLHTTP;

  // expose a common request method the uses GET\POST based on request length
  EsriLeaflet.request = EsriLeaflet.Request.request;

})(EsriLeaflet);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);
EsriLeaflet.Services.Service = L.Class.extend({

  includes: L.Mixin.Events,

  options: {
    proxy: false,
    useCors: EsriLeaflet.Support.CORS
  },

  initialize: function (options) {
    options = options || {};
    this._requestQueue = [];
    this._authenticating = false;
    L.Util.setOptions(this, options);
    this.options.url = EsriLeaflet.Util.cleanUrl(this.options.url);
  },

  get: function (path, params, callback, context) {
    return this._request('get', path, params, callback, context);
  },

  post: function (path, params, callback, context) {
    return this._request('post', path, params, callback, context);
  },

  request: function (path, params, callback, context) {
    return this._request('request', path, params, callback, context);
  },

  metadata: function (callback, context) {
    return this._request('get', '', {}, callback, context);
  },

  authenticate: function(token){
    this._authenticating = false;
    this.options.token = token;
    this._runQueue();
    return this;
  },

  _request: function(method, path, params, callback, context){
    this.fire('requeststart', {
      url: this.options.url + path,
      params: params,
      method: method
    });

    var wrappedCallback = this._createServiceCallback(method, path, params, callback, context);

    if (this.options.token) {
      params.token = this.options.token;
    }

    if (this._authenticating) {
      this._requestQueue.push([method, path, params, callback, context]);
      return;
    } else {
      var url = (this.options.proxy) ? this.options.proxy + '?' + this.options.url + path : this.options.url + path;

      if((method === 'get' || method === 'request') && !this.options.useCors){
        return EsriLeaflet.Request.get.JSONP(url, params, wrappedCallback);
      } else {
        return EsriLeaflet[method](url, params, wrappedCallback);
      }
    }
  },

  _createServiceCallback: function(method, path, params, callback, context){
    return L.Util.bind(function(error, response){

      if (error && (error.code === 499 || error.code === 498)) {
        this._authenticating = true;

        this._requestQueue.push([method, path, params, callback, context]);

        // fire an event for users to handle and re-authenticate
        this.fire('authenticationrequired', {
          authenticate: L.Util.bind(this.authenticate, this)
        });

        // if the user has access to a callback they can handle the auth error
        error.authenticate = L.Util.bind(this.authenticate, this);
      }

      callback.call(context, error, response);

      if(error) {
        this.fire('requesterror', {
          url: this.options.url + path,
          params: params,
          message: error.message,
          code: error.code,
          method: method
        });
      } else {
        this.fire('requestsuccess', {
          url: this.options.url + path,
          params: params,
          response: response,
          method: method
        });
      }

      this.fire('requestend', {
        url: this.options.url + path,
        params: params,
        method: method
      });
    }, this);
  },

  _runQueue: function(){
    for (var i = this._requestQueue.length - 1; i >= 0; i--) {
      var request = this._requestQueue[i];
      var method = request.shift();
      this[method].apply(this, request);
    }
    this._requestQueue = [];
  }

});

EsriLeaflet.Services.service = function(params){
  return new EsriLeaflet.Services.Service(params);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);
EsriLeaflet.Services.MapService = EsriLeaflet.Services.Service.extend({

  identify: function () {
    return new EsriLeaflet.Tasks.identifyFeatures(this);
  },

  find: function () {
    return new EsriLeaflet.Tasks.Find(this);
  },

  query: function () {
    return new EsriLeaflet.Tasks.Query(this);
  }

});

EsriLeaflet.Services.mapService = function(params){
  return new EsriLeaflet.Services.MapService(params);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);
EsriLeaflet.Layers.RasterLayer =  L.Class.extend({
  includes: L.Mixin.Events,

  options: {
    opacity: 1,
    position: 'front',
    f: 'image'
  },

  onAdd: function (map) {
    this._map = map;

    this._update = L.Util.limitExecByInterval(this._update, this.options.updateInterval, this);

    if (map.options.crs && map.options.crs.code) {
      var sr = map.options.crs.code.split(':')[1];
      this.options.bboxSR = sr;
      this.options.imageSR = sr;
    }

    map.on('moveend', this._update, this);

    // if we had an image loaded and it matches the
    // current bounds show the image otherwise remove it
    if(this._currentImage && this._currentImage._bounds.equals(this._map.getBounds())){
      map.addLayer(this._currentImage);
    } else if(this._currentImage) {
      this._map.removeLayer(this._currentImage);
      this._currentImage = null;
    }

    this._update();

    if(this._popup){
      this._map.on('click', this._getPopupData, this);
      this._map.on('dblclick', this._resetPopupState, this);
    }
  },

  bindPopup: function(fn, popupOptions){
    this._shouldRenderPopup = false;
    this._lastClick = false;
    this._popup = L.popup(popupOptions);
    this._popupFunction = fn;
    if(this._map){
      this._map.on('click', this._getPopupData, this);
      this._map.on('dblclick', this._resetPopupState, this);
    }
    return this;
  },

  unbindPopup: function(){
    if(this._map){
      this._map.closePopup(this._popup);
      this._map.off('click', this._getPopupData, this);
      this._map.off('dblclick', this._resetPopupState, this);
    }
    this._popup = false;
    return this;
  },

  onRemove: function (map) {
    if (this._currentImage) {
      this._map.removeLayer(this._currentImage);
    }

    if(this._popup){
      this._map.off('click', this._getPopupData, this);
      this._map.off('dblclick', this._resetPopupState, this);
    }

    this._map.off('moveend', this._update, this);
    this._map = null;
  },

  addTo: function(map){
    map.addLayer(this);
    return this;
  },

  removeFrom: function(map){
    map.removeLayer(this);
    return this;
  },

  bringToFront: function(){
    this.options.position = 'front';
    if(this._currentImage){
      this._currentImage.bringToFront();
    }
    return this;
  },

  bringToBack: function(){
    this.options.position = 'back';
    if(this._currentImage){
      this._currentImage.bringToBack();
    }
    return this;
  },

  getAttribution: function () {
    return this.options.attribution;
  },

  getOpacity: function(){
    return this.options.opacity;
  },

  setOpacity: function(opacity){
    this.options.opacity = opacity;
    this._currentImage.setOpacity(opacity);
    return this;
  },

  getTimeRange: function(){
    return [this.options.from, this.options.to];
  },

  setTimeRange: function(from, to){
    this.options.from = from;
    this.options.to = to;
    this._update();
    return this;
  },

  metadata: function(callback, context){
    this._service.metadata(callback, context);
    return this;
  },

  authenticate: function(token){
    this._service.authenticate(token);
    return this;
  },

  _renderImage: function(url, bounds){
    if(this._map){
      // create a new image overlay and add it to the map
      // to start loading the image
      // opacity is 0 while the image is loading
      var image = new L.ImageOverlay(url, bounds, {
        opacity: 0
      }).addTo(this._map);

      // once the image loads
      image.once('load', function(e){
        var newImage = e.target;
        var oldImage = this._currentImage;

        // if the bounds of this image matches the bounds that
        // _renderImage was called with and we have a map with the same bounds
        // hide the old image if there is one and set the opacity
        // of the new image otherwise remove the new image
        if(newImage._bounds.equals(bounds) && newImage._bounds.equals(this._map.getBounds())){
          this._currentImage = newImage;

          if(this.options.position === 'front'){
            this.bringToFront();
          } else {
            this.bringToBack();
          }

          if(this._map && this._currentImage._map){
            this._currentImage.setOpacity(this.options.opacity);
          } else {
            this._currentImage._map.removeLayer(this._currentImage);
          }

          if(oldImage && this._map) {
            this._map.removeLayer(oldImage);
          }

          if(oldImage && oldImage._map){
            oldImage._map.removeLayer(oldImage);
          }
        } else {
          this._map.removeLayer(newImage);
        }

        this.fire('load', {
          bounds: bounds
        });

      }, this);

      this.fire('loading', {
        bounds: bounds
      });
    }
  },

  _update: function () {
    if(!this._map){
      return;
    }

    var zoom = this._map.getZoom();
    var bounds = this._map.getBounds();

    if(this._animatingZoom){
      return;
    }

    if (this._map._panTransition && this._map._panTransition._inProgress) {
      return;
    }

    if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
      if (this._currentImage) {
        this._currentImage._map.removeLayer(this._currentImage);
      }
      return;
    }
    var params = this._buildExportParams();

    this._requestExport(params, bounds);
  },

  // TODO: refactor these into raster layer
  _renderPopup: function(latlng, error, results, response){
    latlng = L.latLng(latlng);
    if(this._shouldRenderPopup && this._lastClick.equals(latlng)){
      //add the popup to the map where the mouse was clicked at
      var content = this._popupFunction(error, results, response);
      if (content) {
        this._popup.setLatLng(latlng).setContent(content).openOn(this._map);
      }
    }
  },

  _resetPopupState: function(e){
    this._shouldRenderPopup = false;
    this._lastClick = e.latlng;
  },

  // from https://github.com/Leaflet/Leaflet/blob/v0.7.2/src/layer/FeatureGroup.js
  // @TODO remove at Leaflet 0.8
  _propagateEvent: function (e) {
    e = L.extend({
      layer: e.target,
      target: this
    }, e);
    this.fire(e.type, e);
  }
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);
EsriLeaflet.Layers.TiledMapLayer = L.TileLayer.extend({
  options: {
    zoomOffsetAllowance: 0.1,
    correctZoomLevels: true
  },

  statics: {
    MercatorZoomLevels: {
      '0':156543.03392799999,
      '1':78271.516963999893,
      '2':39135.758482000099,
      '3':19567.879240999901,
      '4':9783.9396204999593,
      '5':4891.9698102499797,
      '6':2445.9849051249898,
      '7':1222.9924525624899,
      '8':611.49622628138002,
      '9':305.74811314055802,
      '10':152.874056570411,
      '11':76.437028285073197,
      '12':38.218514142536598,
      '13':19.109257071268299,
      '14':9.5546285356341496,
      '15':4.7773142679493699,
      '16':2.38865713397468,
      '17':1.1943285668550501,
      '18':0.59716428355981699,
      '19':0.29858214164761698,
      '20':0.14929107082381,
      '21':0.07464553541191,
      '22':0.0373227677059525,
      '23':0.0186613838529763
    }
  },

  initialize: function(options){
    options.url = EsriLeaflet.Util.cleanUrl(options.url);
    options = L.Util.setOptions(this, options);

    // set the urls
    //this.url = L.esri.Util.cleanUrl(url);
    this.tileUrl = L.esri.Util.cleanUrl(options.url) + 'tile/{z}/{y}/{x}';
    this._service = new L.esri.Services.MapService(options);
    this._service.on('authenticationrequired requeststart requestend requesterror requestsuccess', this._propagateEvent, this);

    //if this is looking at the AGO tiles subdomain insert the subdomain placeholder
    if(this.tileUrl.match('://tiles.arcgisonline.com')){
      this.tileUrl = this.tileUrl.replace('://tiles.arcgisonline.com', '://tiles{s}.arcgisonline.com');
      options.subdomains = ['1', '2', '3', '4'];
    }

    if(this.options.token) {
      this.tileUrl += ('?token=' + this.options.token);
    }

    // init layer by calling TileLayers initialize method
    L.TileLayer.prototype.initialize.call(this, this.tileUrl, options);
  },

  getTileUrl: function (tilePoint) {
    return L.Util.template(this.tileUrl, L.extend({
      s: this._getSubdomain(tilePoint),
      z: this._lodMap[tilePoint.z] || tilePoint.z, // try lod map first, then just defualt to zoom level
      x: tilePoint.x,
      y: tilePoint.y
    }, this.options));
  },

  onAdd: function(map){
    if (!this._lodMap && this.options.correctZoomLevels) {
      this._lodMap = {}; // make sure we always have an lod map even if its empty
      this.metadata(function(error, metadata) {
        if(!error) {
          var sr = null;
         if(metadata.spatialReference!=undefined&&metadata.spatialReference.latestWkid!=undefined){
            sr = metadata.spatialReference.latestWkid || metadata.spatialReference.wkid;
         }else{
            sr=metadata.tileInfo.spatialReference.latestWkid||metadata.tileInfo.spatialReference.wkid;
         }
          if (sr === 102100 || sr === 3857) {
            //create the zoom level data
            var arcgisLODs = metadata.tileInfo.lods;
            var correctResolutions = EsriLeaflet.Layers.TiledMapLayer.MercatorZoomLevels;

            for(var i = 0; i < arcgisLODs.length; i++) {
              var arcgisLOD = arcgisLODs[i];
              for(var ci in correctResolutions) {
                var correctRes = correctResolutions[ci];

                if(this._withinPercentage(arcgisLOD.resolution, correctRes, this.options.zoomOffsetAllowance)) {
                  this._lodMap[ci] = arcgisLOD.level;
                  break;
                }
              }
            }
          } else {
            EsriLeaflet.Util.warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');
          }
        }

        L.TileLayer.prototype.onAdd.call(this, map);
      }, this);
    } else {
      L.TileLayer.prototype.onAdd.call(this, map);
    }
  },

  metadata: function(callback, context){
    this._service.metadata(callback, context);
    return this;
  },

  identify: function(){
    return this._service.identify();
  },

  authenticate: function(token){
    var tokenQs = '?token=' + token;
    this.tileUrl = (this.options.token) ? this.tileUrl.replace(/\?token=(.+)/g, tokenQs) : this.tileUrl + tokenQs;
    this.options.token = token;
    this._service.authenticate(token);
    return this;
  },

  // from https://github.com/Leaflet/Leaflet/blob/v0.7.2/src/layer/FeatureGroup.js
  // @TODO remove at Leaflet 0.8
  _propagateEvent: function (e) {
    e = L.extend({
      layer: e.target,
      target: this
    }, e);
    this.fire(e.type, e);
  },

  _withinPercentage: function (a, b, percentage) {
    var diff = Math.abs((a/b) - 1);
    return diff < percentage;
  }
});

L.esri.TiledMapLayer = L.esri.Layers.tiledMapLayer;

L.esri.Layers.tiledMapLayer = function(options){
  return new L.esri.Layers.TiledMapLayer(options);
};

L.esri.tiledMapLayer = function(options){
  return new L.esri.Layers.TiledMapLayer(options);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);

EsriLeaflet.Layers.TileInfo = L.Class.extend({

  initialize: function (url, opt_options) {
        this._url = url;
        var options = (opt_options !== undefined) ? opt_options : {};
        this.async = options.async != undefined ? options.async : true;

    },
    getTileInfo: function (callback, errback) {
        var url =this._url + "?f=pjson";
        this.callback = callback;
        this.errback = errback;
        L.ajax({ url: url, success: this._callback.bind(this), fail: this._errback.bind(this), type: "GET", async: this.async });

    },
    _callback: function (data) {
        var obj=null;
      if(data){
         var json = JSON.parse(data);
         obj=new Object();
         obj.xMin=json.fullExtent.xmin;
         obj.yMin=json.fullExtent.ymin;
         obj.xMax=json.fullExtent.xmax;
         obj.yMax=json.fullExtent.ymax;
         obj.spatialReference=json.fullExtent.spatialReference;
         obj.tileWidth=json.tileInfo.rows;
         obj.tileHeight=json.tileInfo.cols;
         obj.compressionQuality=json.tileInfo.compressionQuality;
         obj.dpi=json.tileInfo.dpi;
         obj.lods=json.tileInfo.lods;
         obj.originX=json.tileInfo.origin.x;
         obj.originY=json.tileInfo.origin.y;
         var res=[];
         for(var lod in json.tileInfo.lods){
            res.push(json.tileInfo.lods[lod].resolution);
         }
         obj.startLevel=json.tileInfo.lods[0].level
         obj.endLevel=json.tileInfo.lods[json.tileInfo.lods.length-1].level
         obj.resolutions=res;
        }
        this.callback(obj);
    },
    _errback: function (err) {
        alert(err);
    }
});

EsriLeaflet.tileInfo = EsriLeaflet.Layers.TileInfo;

EsriLeaflet.Layers.tileInfo = function (name, options) {
    return new EsriLeaflet.Layers.TileInfo(name, options);
};

EsriLeaflet.tileInfo = function (name, options) {
    return new EsriLeaflet.Layers.TileInfo(name, options);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

const EsriLeaflet = __webpack_require__(0);

EsriLeaflet.Layers.DynamicMapLayer = EsriLeaflet.Layers.RasterLayer.extend({

  options: {
    updateInterval: 150,
    layers: false,
    layerDefs: false,
    timeOptions: false,
    format: 'png24',
    transparent: true,
    f: 'json'
  },

  initialize: function (options) {
    options.url = EsriLeaflet.Util.cleanUrl(options.url);
    this._service = new EsriLeaflet.Services.MapService(options);
    this._service.on('authenticationrequired requeststart requestend requesterror requestsuccess', this._propagateEvent, this);
    if ((options.proxy || options.token) && options.f !== 'json'){
      options.f = 'json';
    }
    L.Util.setOptions(this, options);
  },

  getDynamicLayers: function(){
    return this.options.dynamicLayers;
  },

  setDynamicLayers: function(dynamicLayers){
    this.options.dynamicLayers = dynamicLayers;
    this._update();
    return this;
  },

  getLayers: function(){
    return this.options.layers;
  },

  setLayers: function(layers){
    this.options.layers = layers;
    this._update();
    return this;
  },

  getLayerDefs: function(){
    return this.options.layerDefs;
  },

  setLayerDefs: function(layerDefs){
    this.options.layerDefs = layerDefs;
    this._update();
    return this;
  },

  getTimeOptions: function(){
    return this.options.timeOptions;
  },

  setTimeOptions: function(timeOptions){
    this.options.timeOptions = timeOptions;
    this._update();
    return this;
  },

  query: function(){
    return this._service.query();
  },

  identify: function(){
    return this._service.identify();
  },

  find: function(){
    return this._service.find();
  },

  _getPopupData: function(e){
    var callback = L.Util.bind(function(error, featureCollection, response) {
      if(error) { return; } // we really can't do anything here but authenticate or requesterror will fire
      setTimeout(L.Util.bind(function(){
        this._renderPopup(e.latlng, error, featureCollection, response);
      }, this), 300);
    }, this);

    var identifyRequest = this.identify().on(this._map).at(e.latlng);

    if(this.options.layers){
      identifyRequest.layers('visible:' + this.options.layers.join(','));
    } else {
      identifyRequest.layers('visible');
    }

    identifyRequest.run(callback);

    // set the flags to show the popup
    this._shouldRenderPopup = true;
    this._lastClick = e.latlng;
  },

  _buildExportParams: function () {
    var bounds = this._map.getBounds();
    var size = this._map.getSize();
    var ne = this._map.options.crs.project(bounds._northEast);
    var sw = this._map.options.crs.project(bounds._southWest);

    //ensure that we don't ask ArcGIS Server for a taller image than we have actual map displaying
    var top = this._map.latLngToLayerPoint(bounds._northEast);
    var bottom = this._map.latLngToLayerPoint(bounds._southWest);

    if (top.y > 0 || bottom.y < size.y){
      size.y = bottom.y - top.y;
    }

    var params = {
      bbox: [sw.x, sw.y, ne.x, ne.y].join(','),
      size: size.x + ',' + size.y,
      dpi: 96,
      format: this.options.format,
      transparent: this.options.transparent,
      bboxSR: this.options.bboxSR,
      imageSR: this.options.imageSR
    };

    if(this.options.dynamicLayers){
      params.dynamicLayers = this.options.dynamicLayers;
    }

    if(this.options.layers){
      params.layers = 'show:' + this.options.layers.join(',');
    }

    if(this.options.layerDefs){
      params.layerDefs = JSON.stringify(this.options.layerDefs);
    }

    if(this.options.timeOptions){
      params.timeOptions = JSON.stringify(this.options.timeOptions);
    }

    if(this.options.from && this.options.to){
      params.time = this.options.from.valueOf() + ',' + this.options.to.valueOf();
    }

    if(this._service.options.token) {
      params.token = this._service.options.token;
    }

    return params;
  },

  _requestExport: function (params, bounds) {
    if(this.options.f === 'json'){
      this._service.request('export', params, function(error, response){
        if(error) { return; } // we really can't do anything here but authenticate or requesterror will fire
        this._renderImage(response.href, bounds);
      }, this);
    } else {
      params.f = 'image';
      this._renderImage(this.options.url + 'export' + L.Util.getParamString(params), bounds);
    }
  }
});

EsriLeaflet.DynamicMapLayer = EsriLeaflet.Layers.DynamicMapLayer;

EsriLeaflet.Layers.dynamicMapLayer = function(options){
  return new EsriLeaflet.Layers.DynamicMapLayer(options);
};

EsriLeaflet.dynamicMapLayer = function(options){
  return new EsriLeaflet.Layers.DynamicMapLayer(options);
};

//module.exports = EsriLeaflet;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license
 *
 *  Copyright (C) 2012 K. Arthur Endsley (kaendsle@mtu.edu)
 *  Michigan Tech Research Institute (MTRI)
 *  3600 Green Court, Suite 100, Ann Arbor, MI, 48105
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

(function (root, factory) {

	if (true) {
		// AMD (+ global for extensions)
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return factory();
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && typeof exports === "object") {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser
		root.Wkt = factory();
	}
}(this,function () {


	var beginsWith, endsWith, root, Wkt;

	// Establish the root object, window in the browser, or exports on the server
	root = this;

	/**
	 * @desc The Wkt namespace.
	 * @property    {String}    delimiter   - The default delimiter for separating components of atomic geometry (coordinates)
	 * @namespace
	 * @global
	 */
	Wkt = function (obj) {
		if (obj instanceof Wkt) return obj;
		if (!(this instanceof Wkt)) return new Wkt(obj);
		this._wrapped = obj;
	};



	/**
	 * Returns true if the substring is found at the beginning of the string.
	 * @param   str {String}    The String to search
	 * @param   sub {String}    The substring of interest
	 * @return      {Boolean}
	 * @private
	 */
	beginsWith = function (str, sub) {
		return str.substring(0, sub.length) === sub;
	};

	/**
	 * Returns true if the substring is found at the end of the string.
	 * @param   str {String}    The String to search
	 * @param   sub {String}    The substring of interest
	 * @return      {Boolean}
	 * @private
	 */
	endsWith = function (str, sub) {
		return str.substring(str.length - sub.length) === sub;
	};

	/**
	 * The default delimiter for separating components of atomic geometry (coordinates)
	 * @ignore
	 */
	Wkt.delimiter = ' ';

	/**
	 * Determines whether or not the passed Object is an Array.
	 * @param   obj {Object}    The Object in question
	 * @return      {Boolean}
	 * @member Wkt.isArray
	 * @method
	 */
	Wkt.isArray = function (obj) {
		return !!(obj && obj.constructor === Array);
	};

	/**
	 * Removes given character String(s) from a String.
	 * @param   str {String}    The String to search
	 * @param   sub {String}    The String character(s) to trim
	 * @return      {String}    The trimmed string
	 * @member Wkt.trim
	 * @method
	 */
	Wkt.trim = function (str, sub) {
		sub = sub || ' '; // Defaults to trimming spaces
		// Trim beginning spaces
		while (beginsWith(str, sub)) {
			str = str.substring(1);
		}
		// Trim ending spaces
		while (endsWith(str, sub)) {
			str = str.substring(0, str.length - 1);
		}
		return str;
	};

	/**
	 * An object for reading WKT strings and writing geographic features
	 * @constructor this.Wkt.Wkt
	 * @param   initializer {String}    An optional WKT string for immediate read
	 * @property            {Array}     components      - Holder for atomic geometry objects (internal representation of geometric components)
	 * @property            {String}    delimiter       - The default delimiter for separating components of atomic geometry (coordinates)
	 * @property            {Object}    regExes         - Some regular expressions copied from OpenLayers.Format.WKT.js
	 * @property            {String}    type            - The Well-Known Text name (e.g. 'point') of the geometry
	 * @property            {Boolean}   wrapVerticies   - True to wrap vertices in MULTIPOINT geometries; If true: MULTIPOINT((30 10),(10 30),(40 40)); If false: MULTIPOINT(30 10,10 30,40 40)
	 * @return              {this.Wkt.Wkt}
	 * @memberof Wkt
	 */
	Wkt.Wkt = function (initializer) {

		/**
		 * The default delimiter between X and Y coordinates.
		 * @ignore
		 */
		this.delimiter = Wkt.delimiter || ' ';

		/**
		 * Configuration parameter for controlling how Wicket seralizes
		 * MULTIPOINT strings. Examples; both are valid WKT:
		 * If true: MULTIPOINT((30 10),(10 30),(40 40))
		 * If false: MULTIPOINT(30 10,10 30,40 40)
		 * @ignore
		 */
		this.wrapVertices = true;

		/**
		 * Some regular expressions copied from OpenLayers.Format.WKT.js
		 * @ignore
		 */
		this.regExes = {
			'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
			'spaces': /\s+|\+/, // Matches the '+' or the empty space
			'numeric': /-*\d+(\.*\d+)?/,
			'comma': /\s*,\s*/,
			'parenComma': /\)\s*,\s*\(/,
			'coord': /-*\d+\.*\d+ -*\d+\.*\d+/, // e.g. "24 -14"
			'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,
			'trimParens': /^\s*\(?(.*?)\)?\s*$/,
			'ogcTypes': /^(multi)?(point|line|polygon|box)?(string)?$/i, // Captures e.g. "Multi","Line","String"
			'crudeJson': /^{.*"(type|coordinates|geometries|features)":.*}$/ // Attempts to recognize JSON strings
		};

		/**
		 * The internal representation of geometry--the "components" of geometry.
		 * @ignore
		 */
		this.components = undefined;

		// An initial WKT string may be provided
		if (initializer && typeof initializer === 'string') {
			this.read(initializer);
		} else if (initializer && typeof initializer !== undefined) {
			this.fromObject(initializer);
		}

	};



	/**
	 * Returns true if the internal geometry is a collection of geometries.
	 * @return  {Boolean}   Returns true when it is a collection
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	Wkt.Wkt.prototype.isCollection = function () {
		switch (this.type.slice(0, 5)) {
			case 'multi':
				// Trivial; any multi-geometry is a collection
				return true;
			case 'polyg':
				// Polygons with holes are "collections" of rings
				return true;
			default:
				// Any other geometry is not a collection
				return false;
		}
	};

	/**
	 * Compares two x,y coordinates for equality.
	 * @param   a   {Object}    An object with x and y properties
	 * @param   b   {Object}    An object with x and y properties
	 * @return      {Boolean}
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	Wkt.Wkt.prototype.sameCoords = function (a, b) {
		return (a.x === b.x && a.y === b.y);
	};

	/**
	 * Sets internal geometry (components) from framework geometry (e.g.
	 * Google Polygon objects or google.maps.Polygon).
	 * @param   obj {Object}    The framework-dependent geometry representation
	 * @return      {this.Wkt.Wkt}   The object itself
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//图层对象转化成wkt对象
	Wkt.Wkt.prototype.fromObject = function (obj) {
		var result;

		if (obj.hasOwnProperty('type') && obj.hasOwnProperty('coordinates')) {
			result = this.fromJson(obj);
		} else {
			result = this.deconstruct.call(this, obj);
		}

		this.components = result.components;
		this.isRectangle = result.isRectangle || false;
		this.type = result.type;
		return this;
	};

	/**
	 * Creates external geometry objects based on a plug-in framework's
	 * construction methods and available geometry classes.
	 * @param   config  {Object}    An optional framework-dependent properties specification
	 * @return          {Object}    The framework-dependent geometry representation
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//wkt对象转化成图层对象。
	Wkt.Wkt.prototype.toObject = function (config) {
		var obj = this.construct[this.type].call(this, config);
		// Don't assign the "properties" property to an Array
		if (typeof obj === 'object' && !Wkt.isArray(obj)) {
			obj.properties = this.properties;
		}
		return obj;
	};

	/**
	 * Returns the WKT string representation; the same as the write() method.
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	Wkt.Wkt.prototype.toString = function (config) {
		return this.write();
	};

	/**
	 * Parses a JSON representation as an Object.
	 * @param	obj	{Object}	An Object with the GeoJSON schema
	 * @return	{this.Wkt.Wkt}	The object itself
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//把geojson对象转化成wkt对象
	Wkt.Wkt.prototype.fromJson = function (obj,change) {
		var i, j, k, coords, iring, oring;
		this.change = change;
		if(this.change === 'undefined'){
			this.change = false;
		}
		this.type = obj.type.toLowerCase();
		this.components = [];
		if (obj.hasOwnProperty('geometry')) { //Feature
			this.fromJson(obj.geometry,change);
			this.properties = obj.properties;
			return this;
		}
		coords = obj.coordinates;

		if (!Wkt.isArray(coords[0])) { // Point
			if(this.change){
				this.components.push({
					x: coords[0],
					y: coords[1]
				});
			}else{
				this.components.push({
					x: coords[1],
					y: coords[0]
				});
			}
		} else {

			for (i in coords) {
				if (coords.hasOwnProperty(i)) {

					if (!Wkt.isArray(coords[i][0])) { // LineString

						if (this.type === 'multipoint') { // MultiPoint
							if(this.change){
								this.components.push([{
									x : coords[i][0],
									y : coords[i][1]
								}]);
							}else {
								this.components.push([{
									x : coords[i][1],
									y : coords[i][0]
								}]);
							}

						} else {
							if(this.change){
								this.components.push({
									x : coords[i][0],
									y : coords[i][1]
								});
							}else {
								this.components.push({
									x : coords[i][1],
									y : coords[i][0]
								});
							}

						}

					} else {

						oring = [];
						for (j in coords[i]) {
							if (coords[i].hasOwnProperty(j)) {

								if (!Wkt.isArray(coords[i][j][0])) {
									if(this.change){
										oring.push({
											x: coords[i][j][0],
											y: coords[i][j][1]
										});
									}else{
										oring.push({
											x: coords[i][j][1],
											y: coords[i][j][0]
										});
									}

								} else {

									iring = [];
									for (k in coords[i][j]) {
										if (coords[i][j].hasOwnProperty(k)) {
											if(this.change){
												iring.push({
													x : coords[i][j][k][0],
													y : coords[i][j][k][1]
												});
											}else {
												iring.push({
													x : coords[i][j][k][1],
													y : coords[i][j][k][0]
												});
											}

										}
									}

									oring.push(iring);

								}

							}
						}

						this.components.push(oring);
					}
				}
			}

		}

		return this;
	};

	/**
	 * Creates a JSON representation, with the GeoJSON schema, of the geometry.
	 * @return    {Object}    The corresponding GeoJSON representation
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//wkt对象转化成geojson对象
	Wkt.Wkt.prototype.toJson = function () {
		var cs, json, i, j, k, ring, rings;

		cs = this.components;
		json = {
			coordinates: [],
			type: (function () {
				var i, type, s;

				type = this.regExes.ogcTypes.exec(this.type).slice(1);
				s = [];

				for (i in type) {
					if (type.hasOwnProperty(i)) {
						if (type[i] !== undefined) {
							s.push(type[i].toLowerCase().slice(0, 1).toUpperCase() + type[i].toLowerCase().slice(1));
						}
					}
				}

				return s;
			}.call(this)).join('')
		}

		// Wkt BOX type gets a special bbox property in GeoJSON
		if (this.type.toLowerCase() === 'box') {
			json.type = 'Polygon';
			json.bbox = [];

			for (i in cs) {
				if (cs.hasOwnProperty(i)) {
					json.bbox = json.bbox.concat([cs[i].x, cs[i].y]);
				}
			}

			json.coordinates = [
				[
					[cs[0].x, cs[0].y],
					[cs[0].x, cs[1].y],
					[cs[1].x, cs[1].y],
					[cs[1].x, cs[0].y],
					[cs[0].x, cs[0].y]
				]
			];

			return json;
		}

		// For the coordinates of most simple features
		for (i in cs) {
			if (cs.hasOwnProperty(i)) {

				// For those nested structures
				if (Wkt.isArray(cs[i])) {
					rings = [];

					for (j in cs[i]) {
						if (cs[i].hasOwnProperty(j)) {

							if (Wkt.isArray(cs[i][j])) { // MULTIPOLYGONS
								ring = [];

								for (k in cs[i][j]) {
									if (cs[i][j].hasOwnProperty(k)) {
										ring.push([cs[i][j][k].x, cs[i][j][k].y]);
									}
								}

								rings.push(ring);

							} else { // POLYGONS and MULTILINESTRINGS

								if (cs[i].length > 1) {
									rings.push([cs[i][j].x, cs[i][j].y]);

								} else { // MULTIPOINTS
									rings = rings.concat([cs[i][j].x, cs[i][j].y]);
								}
							}
						}
					}

					json.coordinates.push(rings);

				} else {
					if (cs.length > 1) { // For LINESTRING type
						json.coordinates.push([cs[i].x, cs[i].y]);

					} else { // For POINT type
						json.coordinates = json.coordinates.concat([cs[i].x, cs[i].y]);
					}
				}

			}
		}

		return json;
	};

	/**
	 * Absorbs the geometry of another this.Wkt.Wkt instance, merging it with its own,
	 * creating a collection (MULTI-geometry) based on their types, which must agree.
	 * For example, creates a MULTIPOLYGON from a POLYGON type merged with another
	 * POLYGON type, or adds a POLYGON instance to a MULTIPOLYGON instance.
	 * @param   wkt {String}    A Wkt.Wkt object
	 * @return	{this.Wkt.Wkt}	The object itself
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//创建多边形集合
	Wkt.Wkt.prototype.merge = function (wkt) {
		var prefix = this.type.slice(0, 5);

		if (this.type !== wkt.type) {
			if (this.type.slice(5, this.type.length) !== wkt.type) {
				throw TypeError('The input geometry types must agree or the calling this.Wkt.Wkt instance must be a multigeometry of the other');
			}
		}

		switch (prefix) {

			case 'point':
				this.components = [this.components.concat(wkt.components)];
				break;

			case 'multi':
				this.components = this.components.concat((wkt.type.slice(0, 5) === 'multi') ? wkt.components : [wkt.components]);
				break;

			default:
				this.components = [
					this.components,
					wkt.components
				];
				break;

		}

		if (prefix !== 'multi') {
			this.type = 'multi' + this.type;
		}
		return this;
	};

	/**
	 * Reads a WKT string, validating and incorporating it.
	 * @param   str {String}    A WKT or GeoJSON string
	 * @return	{this.Wkt.Wkt}	The object itself
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//读取wkt字符串，并转化成为wkt对象本身
	Wkt.Wkt.prototype.read = function (str) {
		var matches;
		matches = this.regExes.typeStr.exec(str);
		if (matches) {
			this.type = matches[1].toLowerCase();
			this.base = matches[2];
			if (this.ingest[this.type]) {
				this.components = this.ingest[this.type].apply(this, [this.base]);
			}

		} else {
			if (this.regExes.crudeJson.test(str)) {
				if (typeof JSON === 'object' && typeof JSON.parse === 'function') {
					this.fromJson(JSON.parse(str));

				} else {
					console.log('JSON.parse() is not available; cannot parse GeoJSON strings');
					throw {
						name: 'JSONError',
						message: 'JSON.parse() is not available; cannot parse GeoJSON strings'
					};
				}

			} else {
				console.log('Invalid WKT string provided to read()');
				throw {
					name: 'WKTError',
					message: 'Invalid WKT string provided to read()'
				};
			}
		}

		return this;
	}; // eo readWkt

	/**
	 * Writes a WKT string.
	 * @param   components  {Array}     An Array of internal geometry objects
	 * @return              {String}    The corresponding WKT representation
	 * @memberof this.Wkt.Wkt
	 * @method
	 */
	//将wkt对象转化成wkt字符串
	Wkt.Wkt.prototype.write = function (components) {
		var i, pieces, data;

		components = components || this.components;

		pieces = [];

		pieces.push(this.type.toUpperCase() + '(');

		for (i = 0; i < components.length; i += 1) {
			if (this.isCollection() && i > 0) {
				pieces.push(',');
			}

			// There should be an extract function for the named type
			if (!this.extract[this.type]) {
				return null;
			}

			data = this.extract[this.type].apply(this, [components[i]]);
			if (this.isCollection() && this.type !== 'multipoint') {
				pieces.push('(' + data + ')');

			} else {
				pieces.push(data);

				// If not at the end of the components, add a comma
				if (i !== (components.length - 1) && this.type !== 'multipoint') {
					pieces.push(',');
				}

			}
		}

		pieces.push(')');

		return pieces.join('');
	};

	/**
	 * This object contains functions as property names that extract WKT
	 * strings from the internal representation.
	 * @memberof this.Wkt.Wkt
	 * @namespace this.Wkt.Wkt.extract
	 * @instance
	 */
	Wkt.Wkt.prototype.extract = {
		/**
		 * Return a WKT string representing atomic (point) geometry
		 * @param   point   {Object}    An object with x and y properties
		 * @return          {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		point: function (point) {
			return String(point.x) + this.delimiter + String(point.y);
		},

		/**
		 * Return a WKT string representing multiple atoms (points)
		 * @param   multipoint  {Array}     Multiple x-and-y objects
		 * @return              {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		multipoint: function (multipoint) {
			var i, parts = [],
				s;

			for (i = 0; i < multipoint.length; i += 1) {
				s = this.extract.point.apply(this, [multipoint[i]]);

				if (this.wrapVertices) {
					s = '(' + s + ')';
				}

				parts.push(s);
			}

			return parts.join(',');
		},

		/**
		 * Return a WKT string representing a chain (linestring) of atoms
		 * @param   linestring  {Array}     Multiple x-and-y objects
		 * @return              {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		linestring: function (linestring) {
			// Extraction of linestrings is the same as for points
			return this.extract.point.apply(this, [linestring]);
		},

		/**
		 * Return a WKT string representing multiple chains (multilinestring) of atoms
		 * @param   multilinestring {Array}     Multiple of multiple x-and-y objects
		 * @return                  {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		multilinestring: function (multilinestring) {
			var i, parts = [];

			if (multilinestring.length) {
				for (i = 0; i < multilinestring.length; i += 1) {
					parts.push(this.extract.linestring.apply(this, [multilinestring[i]]));
				}
			} else {
				parts.push(this.extract.point.apply(this, [multilinestring]));
			}

			return parts.join(',');
		},

		/**
		 * Return a WKT string representing multiple atoms in closed series (polygon)
		 * @param   polygon {Array}     Collection of ordered x-and-y objects
		 * @return          {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		polygon: function (polygon) {
			// Extraction of polygons is the same as for multilinestrings
			return this.extract.multilinestring.apply(this, [polygon]);
		},

		/**
		 * Return a WKT string representing multiple closed series (multipolygons) of multiple atoms
		 * @param   multipolygon    {Array}     Collection of ordered x-and-y objects
		 * @return                  {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		multipolygon: function (multipolygon) {
			var i, parts = [];
			for (i = 0; i < multipolygon.length; i += 1) {
				parts.push('(' + this.extract.polygon.apply(this, [multipolygon[i]]) + ')');
			}
			return parts.join(',');
		},

		/**
		 * Return a WKT string representing a 2DBox
		 * @param   multipolygon    {Array}     Collection of ordered x-and-y objects
		 * @return                  {String}    The WKT representation
		 * @memberof this.Wkt.Wkt.extract
		 * @instance
		 */
		box: function (box) {
			return this.extract.linestring.apply(this, [box]);
		},

		geometrycollection: function (str) {
			console.log('The geometrycollection WKT type is not yet supported.');
		}
	};

	/**
	 * This object contains functions as property names that ingest WKT
	 * strings into the internal representation.
	 * @memberof this.Wkt.Wkt
	 * @namespace this.Wkt.Wkt.ingest
	 * @instance
	 */
	Wkt.Wkt.prototype.ingest = {

		/**
		 * Return point feature given a point WKT fragment.
		 * @param   str {String}    A WKT fragment representing the point
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		point: function (str) {
			var coords = Wkt.trim(str).split(this.regExes.spaces);
			// In case a parenthetical group of coordinates is passed...
			return [{ // ...Search for numeric substrings
				x: parseFloat(this.regExes.numeric.exec(coords[0])[0]),
				y: parseFloat(this.regExes.numeric.exec(coords[1])[0])
			}];
		},

		/**
		 * Return a multipoint feature given a multipoint WKT fragment.
		 * @param   str {String}    A WKT fragment representing the multipoint
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		multipoint: function (str) {
			var i, components, points;
			components = [];
			points = Wkt.trim(str).split(this.regExes.comma);
			for (i = 0; i < points.length; i += 1) {
				components.push(this.ingest.point.apply(this, [points[i]]));
			}
			return components;
		},

		/**
		 * Return a linestring feature given a linestring WKT fragment.
		 * @param   str {String}    A WKT fragment representing the linestring
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		linestring: function (str) {
			var i, multipoints, components;

			// In our x-and-y representation of components, parsing
			//  multipoints is the same as parsing linestrings
			multipoints = this.ingest.multipoint.apply(this, [str]);

			// However, the points need to be joined
			components = [];
			for (i = 0; i < multipoints.length; i += 1) {
				components = components.concat(multipoints[i]);
			}
			return components;
		},

		/**
		 * Return a multilinestring feature given a multilinestring WKT fragment.
		 * @param   str {String}    A WKT fragment representing the multilinestring
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		multilinestring: function (str) {
			var i, components, line, lines;
			components = [];

			lines = Wkt.trim(str).split(this.regExes.doubleParenComma);
			if (lines.length === 1) { // If that didn't work...
				lines = Wkt.trim(str).split(this.regExes.parenComma);
			}

			for (i = 0; i < lines.length; i += 1) {
				line = lines[i].replace(this.regExes.trimParens, '$1');
				components.push(this.ingest.linestring.apply(this, [line]));
			}

			return components;
		},

		/**
		 * Return a polygon feature given a polygon WKT fragment.
		 * @param   str {String}    A WKT fragment representing the polygon
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		polygon: function (str) {
			var i, j, components, subcomponents, ring, rings;
			rings = Wkt.trim(str).split(this.regExes.parenComma);
			components = []; // Holds one or more rings
			for (i = 0; i < rings.length; i += 1) {
				ring = rings[i].replace(this.regExes.trimParens, '$1').split(this.regExes.comma);
				subcomponents = []; // Holds the outer ring and any inner rings (holes)
				for (j = 0; j < ring.length; j += 1) {
					// Split on the empty space or '+' character (between coordinates)
					var split = ring[j].split(this.regExes.spaces);
					if (split.length > 2) {
						//remove the elements which are blanks
						split = split.filter(function (n) {
							return n != ""
						});
					}
					if (split.length === 2) {
						var x_cord = split[0];
						var y_cord = split[1];

						//now push
						subcomponents.push({
							x: parseFloat(x_cord),
							y: parseFloat(y_cord)
						});
					}
				}
				components.push(subcomponents);
			}
			return components;
		},

		/**
		 * Return box vertices (which would become the Rectangle bounds) given a Box WKT fragment.
		 * @param   str {String}    A WKT fragment representing the box
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		box: function (str) {
			var i, multipoints, components;

			// In our x-and-y representation of components, parsing
			//  multipoints is the same as parsing linestrings
			multipoints = this.ingest.multipoint.apply(this, [str]);

			// However, the points need to be joined
			components = [];
			for (i = 0; i < multipoints.length; i += 1) {
				components = components.concat(multipoints[i]);
			}

			return components;
		},

		/**
		 * Return a multipolygon feature given a multipolygon WKT fragment.
		 * @param   str {String}    A WKT fragment representing the multipolygon
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		multipolygon: function (str) {
			var i, components, polygon, polygons;
			components = [];
			polygons = Wkt.trim(str).split(this.regExes.doubleParenComma);
			for (i = 0; i < polygons.length; i += 1) {
				polygon = polygons[i].replace(this.regExes.trimParens, '$1');
				components.push(this.ingest.polygon.apply(this, [polygon]));
			}
			return components;
		},

		/**
		 * Return an array of features given a geometrycollection WKT fragment.
		 * @param   str {String}    A WKT fragment representing the geometry collection
		 * @memberof this.Wkt.Wkt.ingest
		 * @instance
		 */
		geometrycollection: function (str) {
			console.log('The geometrycollection WKT type is not yet supported.');
		}

	}; // eo ingest

	return Wkt;
}));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

const Wkt = __webpack_require__(2);
L.QueryParameter= L.Class.extend({
	includes : L.Mixin.Events,
	options : {
		url : null,//wfs服务查询地址（必须）
		typename : null,//图层名称 （必须）
		version : "1.1.1",
		type : "GET"

	},
	initialize : function(options){ // (HTMLElement or String, Object)
		options = L.setOptions(this, options);
		this.checkOptions();
	},
	//必填项检查
	checkOptions : function(){
		if(this.options.url && this.options.typename){
			this._check = false;
		} else {
			this._check = true;
		}
		return this._check;
	},
	getQueryParameterUrl : function(){
		var arr = [];
		for(var param in this.options){
			if(param!="url"){
				arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(this.options[param]));
			}
		}
		return this.options.url+"?"+arr.join('&');
	},
	getData : function(){
		var data=new Object();
		for(var param in this.options){
			if(param == 'version'){
				delete this.options[param];
			}
			if(param&&this.options[param]&&param!="url"&&param!="type"&&param!="async"){
				data[param]=this.options[param];
			}
		}
		return data;
	}
});

/**
 * 查询基类
 * @constructor
 */
L.QueryTask= L.Class.extend({
	initialize : function(queryParameter){ // (HTMLElement or String, Object)
		if(queryParameter){
			this._queryParameter=queryParameter;
			this._url=queryParameter.getQueryParameterUrl();
			this._type=queryParameter.options.type;
		}
	},
	executeForDescribeFeatureType:function(callback,errback){
		var url=this._queryParameter.options.url;
		var typename=this._queryParameter.options.typename;
		this.callback=callback;
		this.errback=errback;
		//http://192.168.1.234:8080/hgis/ktw/ows?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=ktw:wfslayer
		url+="?service=wfs&version=2.0.0&request=DescribeFeatureType&typeName="+typename;
		L.ajax({url:url,success:this._describeFeatrueCallback.bind(this),fail:this._errback.bind(this),type:"GET"});
	},
	execute:function(callback,errback,queryOpt){
		this.callback=callback;
		this.errback=errback;
		queryOpt=(queryOpt!=undefined&&queryOpt!=null)?queryOpt:{};
		queryOpt.async=queryOpt.async!=undefined&&queryOpt.async!=null?queryOpt.async:true;

		if(this._type=="POST"){
			L.ajax({url:this._url,success:this._callback.bind(this),fail:this._errback.bind(this),type:this._type,data:this._queryParameter.options.data,async:queryOpt.async});
		}else {
			L.ajax({url:this._url,success:this._callback.bind(this),fail:this._errback.bind(this),type:this._type,async:queryOpt.async});
		}
	},
	_describeFeatrueCallback:function(data){
		var xml=new L.X2JS();
		var jsonStr=xml.xml_str2json(data);
		var filedArray=[];
		var filedTemp=jsonStr.schema.complexType.complexContent.extension.sequence.element;
		for(var i=0;i<filedTemp.length;i++){
			filedArray.push({filename:filedTemp[i]._name,
				type:filedTemp[i]._type,
				maxOccurs:filedTemp[i]._maxOccurs,
				minOccurs:filedTemp[i]._minOccurs,
				nillable:filedTemp[i]._nillable,
			});
		}
		this.callback(filedArray);
	},
	_callback:function(data){
		var exData = this._loadXML(data);
		if(exData.body){
			var geojsonData=JSON.parse(data);
			this.callback(geojsonData);
		}else{
			this._errback(data);
		}
	},
	_errback:function(err){
		this.errback(err);
	},

	_loadXML: function(xmlString){
		var xmlDoc=null;
		if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
			var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
			for(var i=0;i<xmlDomVersions.length;i++){
				try{
					xmlDoc = new ActiveXObject(xmlDomVersions[i]);
					xmlDoc.async = false;
					xmlDoc.loadXML(xmlString);
					break;
				}catch(e){
				}
			}
		}
		else if(window.DOMParser && document.implementation && document.implementation.createDocument){
			try{
				var domParser = new  DOMParser();
				xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
			}catch(e){
			}
		}
		else{
			return null;
		}
		return xmlDoc;
	}
});

L.QueryParameter.WfsQueryParameter = L.QueryParameter.extend({
	includes : L.Mixin.Events,
	options : {
		url : null,//wfs服务查询地址（必须）
		typename : null,//图层名称 （必须）
		propertyName : null,//返回字段名称，逗号隔开
		geometry : null,   //空间查询的图层
		sortBy : null,
		service : "WFS",
		request : "GetFeature",
		outputFormat : 'application/json',
		version : "2.0.0",
		startIndex:null,//查询记录起始索引值
		count:null,//要获取的查询条数
		srsName:"EPSG:4326",//空间参考不赋值的话系统默认也是4326
		filterName: 'the_geom',
		where : null, //查询条件
		returnOnlyId : false,//是否只返回ID
		returnGeometry : true,//是否返回图形信息
		featureID : null,//要素的id,若有多个id则用逗号隔开,
		type : "GET",
		crs:null,//查询参考系
        clip:0,
        clipGeometry:null,
        radius:null,
		spatialRelationship:'Intersects' //执行查询时应用于输入几何的空间关系
										//Equals	等于
										//Disjoint	不相交
										//Intersects 相交（存在交集）
										//Touches	接触
										//Within	在…内部
										//DWithin	在…外部
										//Overlaps	叠加
										//Crosses	通过
										//Contains	包含
										//Beyond	在…以外
										//BBOX	    矩形范围

	},
	getQueryParameterUrl : function(){
		var data=new Object();
		var cql_filterStr;
		for(var param in this.options){
			if(param=='returnOnlyId'&&this.options.returnOnlyId){
				data.propertyName="gid";//hgis平台id指定为gid；
			} else if(param=='geometry'&&this.options.geometry){
				var wkt = new Wkt.Wkt();
				if(this.options.crs!=null){
					var projectGeojson;
					if(typeof this.options.crs.projectGeometry=== 'function'){
						projectGeojson=this.options.crs.projectGeometry(this.options.geometry);
					}else {
						projectGeojson=this.options.crs.projection.projectGeometry(this.options.geometry);
					}
					wkt.fromJson(projectGeojson);
				}else{
					if(this.options.geometry.type && this.options.geometry.geometry){
						if(this.options.change != undefined){
							wkt.fromJson(this.options.geometry, this.options.change);
						}else{
							wkt.fromJson(this.options.geometry);
						}
					}else{
						wkt.fromJson(this.options.geometry.toGeoJSON());
					}
				}
				var wktStr = wkt.write();
				if(data.cql_filter){
					data.cql_filter +=this.options.spatialRelationship+"("+this.options.filterName+", " + wktStr + ")";
				} else {
					data.cql_filter = this.options.spatialRelationship + "("+this.options.filterName+", " + wktStr + ")";
				}
				this.options.type="POST";
			} else if(param=='where'&&this.options.where){
				if(data.cql_filter){
					data.cql_filter += " and " + this.options[param];
				} else {
					data.cql_filter = this.options[param];
				}
			} else if(param=='url'||param=='returnGeometry'||param=='type'||param=='spatialRelationship'||param=='returnGeometry'){

			}
			else {
				if(this.options[param] != null){
                    if(param=="clipGeometry"&&this.options.clipGeometry){
                        data["geometry"]=this.options.clipGeometry;
                    }else{
					    data[param]=this.options[param];
                    }
				}
			}
		}
		var url=this.options.url;
		if(this.options.type=="POST"){
            this.options.data=data;
		}else {
			var arr = [];
			for(var param in data){
				arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
			}
			url+="?"+arr.join('&');
		}
		return url;
	}
});

/**
 * 面积测量参数
 */
L.QueryParameter.MeasureParameter= L.QueryParameter.extend({
	includes : L.Mixin.Events,
	options : {
		url : null,
		service : "wps",
		request : "getLength",//查询服务类型,距离测量：getLength；面积测量：getArea（必填）
		output:"json",
		geometry:null,
		version : "1.0.0",
		type:"POST",
		sourceproject:"EPSG:4326",
		targetproject:"EPSG:3857"
	}
});
/*
 * 投影转换
 */
L.QueryParameter.ProjecteTransform = L.QueryParameter.extend({
	includes : L.Mixin.Events,
	options : {
		url : null,
		service : "wps",
		request : "reproject",
		output:"json",
		geometry:null,
		type:"POST",
		sourceproject:"EPSG:4326",
		targetproject:"EPSG:3857"
	}
});
/*
 * 图形分析
 */
L.QueryParameter.GraphAnalysis = L.QueryParameter.extend({
	includes : L.Mixin.Events,
	options : {
		url : null,
		service : "wps",
		request : "intersection",
		geometry:null,
		geometries:null,
		type:"POST"
	}
});
/**
 * 缓冲区参数
 */
L.QueryParameter.BufferParameter= L.QueryParameter.extend({
	includes : L.Mixin.Events,
	options : {
		url : null,
		service : "wps",
		request : "buffer",
		output:"json",
		geometry:null,
		distance:0.0005
	},

	getData : function(){
		var data=new Object();
		for(var param in this.options){
			if(param&&this.options[param]&&param!="url"&&param!="type"&&param!="unit"&&param!='system'){
				data[param]=this.options[param];
			}
		}
		return data;
	}
});




/**
 * web空间分析服务(类似arcgis的GP服务)
 */
L.GeometryService= L.Class.extend({
	includes : L.Mixin.Events,
	initialize : function(queryParameter){ // (HTMLElement or String, Object)
		if(queryParameter){
			this._queryParameter=queryParameter;
			this._data=queryParameter.getData();
			queryParameter.options.request="getLength";
			this._url=queryParameter.options.url;
			this._type=queryParameter.options.type;
            this._async=queryParameter.options.async!=undefined?queryParameter.options.async:true;
		}
	},

	/**
	 * 测量距离
	 */
	getLenth:function(callback,errback){
		this._data.request="getLength";
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	},

	/**
	 * 测量面积
	 */
	getArea:function(callback,errback){
		this._data.request="getArea";
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	},

	/**
	 * 投影转换
	 */
	reProject:function(callback,errback){
		this._data.request="reproject";
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	},

	/**
	 * 缓冲分析
	 */
	buffer:function(callback,errback){
		this._data.request="buffer";
		if(this._queryParameter.options.system === 'geographic'){
			if(this._queryParameter.options.unit == "meter"){
				this._data.distance = this._queryParameter.options.distance / 111194.872221777; //米转换成度
			}
		}else if(this._queryParameter.options.system === 'projection'){
			if(this._queryParameter.options.unit == "drgree"){
				this._data.distance = this._queryParameter.options.distance * 111194.872221777; //度转换成米
			}
		}
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	},
   

	/**
	 * 图层叠加
	 */
	layersOverlap:function(){

	},

	/**
	 * 图形相交
	 */
	intersection:function(callback,errback){
		this._data.request="intersection";
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	},

	/**
	 * 图形合并
	 */
	union:function(callback,errback){
		this._data.request="union";
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	},

	/**
	 * 图形求差
	 */
	difference:function(callback,errback){
		this._data.request="difference";
		L.ajax({url:this._url,success:callback,fail:errback,type:"POST",data:this._data,async:this._async});
	}

});

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
(function (window, document, undefined) {/*
 * L.MarkerClusterGroup extends L.FeatureGroup by clustering the markers contained within
 */

L.MarkerClusterGroup = L.FeatureGroup.extend({

	options: {
		maxClusterRadius: 80, //A cluster will cover at most this many pixels from its center
		iconCreateFunction: null,

		spiderfyOnMaxZoom: true,
		showCoverageOnHover: true,
		zoomToBoundsOnClick: true,
		singleMarkerMode: false,

		disableClusteringAtZoom: null,

		// Setting this to false prevents the removal of any clusters outside of the viewpoint, which
		// is the default behaviour for performance reasons.
		removeOutsideVisibleBounds: true,

		// Set to false to disable all animations (zoom and spiderfy).
		// If false, option animateAddingMarkers below has no effect.
		// If L.DomUtil.TRANSITION is falsy, this option has no effect.
		animate: true,

		//Whether to animate adding markers after adding the MarkerClusterGroup to the map
		// If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
		animateAddingMarkers: false,

		//Increase to increase the distance away that spiderfied markers appear from the center
		spiderfyDistanceMultiplier: 1,

		// Make it possible to specify a polyline options on a spider leg
		spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0.5 },

		// When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
		chunkedLoading: false,
		chunkInterval: 200, // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
		chunkDelay: 50, // at the end of each interval, give n milliseconds back to system/browser
		chunkProgress: null, // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)

		//Options to pass to the L.Polygon constructor
		polygonOptions: {}
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
		if (!this.options.iconCreateFunction) {
			this.options.iconCreateFunction = this._defaultIconCreateFunction;
		}

		this._featureGroup = L.featureGroup();
		this._featureGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);

		this._nonPointGroup = L.featureGroup();
		this._nonPointGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);

		this._inZoomAnimation = 0;
		this._needsClustering = [];
		this._needsRemoving = []; //Markers removed while we aren't on the map need to be kept track of
		//The bounds of the currently shown area (from _getExpandedVisibleBounds) Updated on zoom/move
		this._currentShownBounds = null;

		this._queue = [];

		// Hook the appropriate animation methods.
		var animate = L.DomUtil.TRANSITION && this.options.animate;
		L.extend(this, animate ? this._withAnimation : this._noAnimation);
		// Remember which MarkerCluster class to instantiate (animated or not).
		this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
	},

	addLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			var array = [];
			for (var i in layer._layers) {
				array.push(layer._layers[i]);
			}
			return this.addLayers(array);
		}

		//Don't cluster non point data
		if (!layer.getLatLng) {
			this._nonPointGroup.addLayer(layer);
			return this;
		}

		if (!this._map) {
			this._needsClustering.push(layer);
			return this;
		}

		if (this.hasLayer(layer)) {
			return this;
		}


		//If we have already clustered we'll need to add this one to a cluster

		if (this._unspiderfy) {
			this._unspiderfy();
		}

		this._addLayer(layer, this._maxZoom);

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		//Work out what is visible
		var visibleLayer = layer,
			currentZoom = this._map.getZoom();
		if (layer.__parent) {
			while (visibleLayer.__parent._zoom >= currentZoom) {
				visibleLayer = visibleLayer.__parent;
			}
		}

		if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
			if (this.options.animateAddingMarkers) {
				this._animationAddLayer(layer, visibleLayer);
			} else {
				this._animationAddLayerNonAnimated(layer, visibleLayer);
			}
		}
		return this;
	},

	removeLayer: function (layer) {

		if (layer instanceof L.LayerGroup)
		{
			var array = [];
			for (var i in layer._layers) {
				array.push(layer._layers[i]);
			}
			return this.removeLayers(array);
		}

		//Non point layers
		if (!layer.getLatLng) {
			this._nonPointGroup.removeLayer(layer);
			return this;
		}

		if (!this._map) {
			if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
				this._needsRemoving.push(layer);
			}
			return this;
		}

		if (!layer.__parent) {
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();
			this._unspiderfyLayer(layer);
		}

		//Remove the marker from clusters
		this._removeLayer(layer, true);

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		if (this._featureGroup.hasLayer(layer)) {
			this._featureGroup.removeLayer(layer);
			if (layer.clusterShow) {
				layer.clusterShow();
			}
		}

		return this;
	},

	//Takes an array of markers and adds them in bulk
	addLayers: function (layersArray) {
		var fg = this._featureGroup,
			npg = this._nonPointGroup,
			chunked = this.options.chunkedLoading,
			chunkInterval = this.options.chunkInterval,
			chunkProgress = this.options.chunkProgress,
			newMarkers, i, l, m;

		if (this._map) {
			var offset = 0,
				started = (new Date()).getTime();
			var process = L.bind(function () {
				var start = (new Date()).getTime();
				for (; offset < layersArray.length; offset++) {
					if (chunked && offset % 200 === 0) {
						// every couple hundred markers, instrument the time elapsed since processing started:
						var elapsed = (new Date()).getTime() - start;
						if (elapsed > chunkInterval) {
							break; // been working too hard, time to take a break :-)
						}
					}

					m = layersArray[offset];

					//Not point data, can't be clustered
					if (!m.getLatLng) {
						npg.addLayer(m);
						continue;
					}

					if (this.hasLayer(m)) {
						continue;
					}

					this._addLayer(m, this._maxZoom);

					//If we just made a cluster of size 2 then we need to remove the other marker from the map (if it is) or we never will
					if (m.__parent) {
						if (m.__parent.getChildCount() === 2) {
							var markers = m.__parent.getAllChildMarkers(),
								otherMarker = markers[0] === m ? markers[1] : markers[0];
							fg.removeLayer(otherMarker);
						}
					}
				}

				if (chunkProgress) {
					// report progress and time elapsed:
					chunkProgress(offset, layersArray.length, (new Date()).getTime() - started);
				}

				// Completed processing all markers.
				if (offset === layersArray.length) {

					// Refresh bounds and weighted positions.
					this._topClusterLevel._recalculateBounds();

					//Update the icons of all those visible clusters that were affected
					this._featureGroup.eachLayer(function (c) {
						if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
							c._updateIcon();
						}
					});

					this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
				} else {
					setTimeout(process, this.options.chunkDelay);
				}
			}, this);

			process();
		} else {
			newMarkers = [];
			for (i = 0, l = layersArray.length; i < l; i++) {
				m = layersArray[i];

				//Not point data, can't be clustered
				if (!m.getLatLng) {
					npg.addLayer(m);
					continue;
				}

				if (this.hasLayer(m)) {
					continue;
				}

				newMarkers.push(m);
			}
			this._needsClustering = this._needsClustering.concat(newMarkers);
		}
		return this;
	},

	//Takes an array of markers and removes them in bulk
	removeLayers: function (layersArray) {
		var i, l, m,
			fg = this._featureGroup,
			npg = this._nonPointGroup;

		if (!this._map) {
			for (i = 0, l = layersArray.length; i < l; i++) {
				m = layersArray[i];
				this._arraySplice(this._needsClustering, m);
				npg.removeLayer(m);
				if (this.hasLayer(m)) {
					this._needsRemoving.push(m);
				}
			}
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();
			for (i = 0, l = layersArray.length; i < l; i++) {
				m = layersArray[i];
				this._unspiderfyLayer(m);
			}
		}

		for (i = 0, l = layersArray.length; i < l; i++) {
			m = layersArray[i];

			if (!m.__parent) {
				npg.removeLayer(m);
				continue;
			}

			this._removeLayer(m, true, true);

			if (fg.hasLayer(m)) {
				fg.removeLayer(m);
				if (m.clusterShow) {
					m.clusterShow();
				}
			}
		}

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		//Fix up the clusters and markers on the map
		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

		fg.eachLayer(function (c) {
			if (c instanceof L.MarkerCluster) {
				c._updateIcon();
			}
		});

		return this;
	},

	//Removes all layers from the MarkerClusterGroup
	clearLayers: function () {
		//Need our own special implementation as the LayerGroup one doesn't work for us

		//If we aren't on the map (yet), blow away the markers we know of
		if (!this._map) {
			this._needsClustering = [];
			delete this._gridClusters;
			delete this._gridUnclustered;
		}

		if (this._noanimationUnspiderfy) {
			this._noanimationUnspiderfy();
		}

		//Remove all the visible layers
		this._featureGroup.clearLayers();
		this._nonPointGroup.clearLayers();

		this.eachLayer(function (marker) {
			delete marker.__parent;
		});

		if (this._map) {
			//Reset _topClusterLevel and the DistanceGrids
			this._generateInitialClusters();
		}

		return this;
	},

	//Override FeatureGroup.getBounds as it doesn't work
	getBounds: function () {
		var bounds = new L.LatLngBounds();

		if (this._topClusterLevel) {
			bounds.extend(this._topClusterLevel._bounds);
		}

		for (var i = this._needsClustering.length - 1; i >= 0; i--) {
			bounds.extend(this._needsClustering[i].getLatLng());
		}

		bounds.extend(this._nonPointGroup.getBounds());

		return bounds;
	},

	//Overrides LayerGroup.eachLayer
	eachLayer: function (method, context) {
		var markers = this._needsClustering.slice(),
			i;

		if (this._topClusterLevel) {
			this._topClusterLevel.getAllChildMarkers(markers);
		}

		for (i = markers.length - 1; i >= 0; i--) {
			method.call(context, markers[i]);
		}

		this._nonPointGroup.eachLayer(method, context);
	},

	//Overrides LayerGroup.getLayers
	getLayers: function () {
		var layers = [];
		this.eachLayer(function (l) {
			layers.push(l);
		});
		return layers;
	},

	//Overrides LayerGroup.getLayer, WARNING: Really bad performance
	getLayer: function (id) {
		var result = null;
		
		id = parseInt(id, 10);

		this.eachLayer(function (l) {
			if (L.stamp(l) === id) {
				result = l;
			}
		});

		return result;
	},

	//Returns true if the given layer is in this MarkerClusterGroup
	hasLayer: function (layer) {
		if (!layer) {
			return false;
		}

		var i, anArray = this._needsClustering;

		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return true;
			}
		}

		anArray = this._needsRemoving;
		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return false;
			}
		}

		return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
	},

	//Zoom down to show the given layer (spiderfying if necessary) then calls the callback
	zoomToShowLayer: function (layer, callback) {
		
		if (typeof callback !== 'function') {
			callback = function () {};
		}

		var showMarker = function () {
			if ((layer._icon || layer.__parent._icon) && !this._inZoomAnimation) {
				this._map.off('moveend', showMarker, this);
				this.off('animationend', showMarker, this);

				if (layer._icon) {
					callback();
				} else if (layer.__parent._icon) {
					this.once('spiderfied', callback, this);
					layer.__parent.spiderfy();
				}
			}
		};

		if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
			//Layer is visible ond on screen, immediate return
			callback();
		} else if (layer.__parent._zoom < this._map.getZoom()) {
			//Layer should be visible at this zoom level. It must not be on screen so just pan over to it
			this._map.on('moveend', showMarker, this);
			this._map.panTo(layer.getLatLng());
		} else {
			var moveStart = function () {
				this._map.off('movestart', moveStart, this);
				moveStart = null;
			};

			this._map.on('movestart', moveStart, this);
			this._map.on('moveend', showMarker, this);
			this.on('animationend', showMarker, this);
			layer.__parent.zoomToBounds();

			if (moveStart) {
				//Never started moving, must already be there, probably need clustering however
				showMarker.call(this);
			}
		}
	},

	//Overrides FeatureGroup.onAdd
	onAdd: function (map) {
		this._map = map;
		var i, l, layer;

		if (!isFinite(this._map.getMaxZoom())) {
			throw "Map has no maxZoom specified";
		}

		this._featureGroup.onAdd(map);
		this._nonPointGroup.onAdd(map);

		if (!this._gridClusters) {
			this._generateInitialClusters();
		}

		this._maxLat = map.options.crs.projection.MAX_LATITUDE;

		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			this._removeLayer(layer, true);
		}
		this._needsRemoving = [];

		//Remember the current zoom level and bounds
		this._zoom = this._map.getZoom();
		this._currentShownBounds = this._getExpandedVisibleBounds();

		this._map.on('zoomend', this._zoomEnd, this);
		this._map.on('moveend', this._moveEnd, this);

		if (this._spiderfierOnAdd) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnAdd();
		}

		this._bindEvents();

		//Actually add our markers to the map:
		l = this._needsClustering;
		this._needsClustering = [];
		this.addLayers(l);
	},

	//Overrides FeatureGroup.onRemove
	onRemove: function (map) {
		map.off('zoomend', this._zoomEnd, this);
		map.off('moveend', this._moveEnd, this);

		this._unbindEvents();

		//In case we are in a cluster animation
		this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');

		if (this._spiderfierOnRemove) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnRemove();
		}

		delete this._maxLat;

		//Clean up all the layers we added to the map
		this._hideCoverage();
		this._featureGroup.onRemove(map);
		this._nonPointGroup.onRemove(map);

		this._featureGroup.clearLayers();

		this._map = null;
	},

	getVisibleParent: function (marker) {
		var vMarker = marker;
		while (vMarker && !vMarker._icon) {
			vMarker = vMarker.__parent;
		}
		return vMarker || null;
	},

	//Remove the given object from the given array
	_arraySplice: function (anArray, obj) {
		for (var i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === obj) {
				anArray.splice(i, 1);
				return true;
			}
		}
	},

	/**
	 * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
	 * @param marker to be removed from _gridUnclustered.
	 * @param z integer bottom start zoom level (included)
	 * @private
	 */
	_removeFromGridUnclustered: function (marker, z) {
		var map = this._map,
		    gridUnclustered = this._gridUnclustered;

		for (; z >= 0; z--) {
			if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
				break;
			}
		}
	},

	//Internal function for removing a marker from everything.
	//dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
	_removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
		var gridClusters = this._gridClusters,
			gridUnclustered = this._gridUnclustered,
			fg = this._featureGroup,
			map = this._map;

		//Remove the marker from distance clusters it might be in
		if (removeFromDistanceGrid) {
			this._removeFromGridUnclustered(marker, this._maxZoom);
		}

		//Work our way up the clusters removing them as we go if required
		var cluster = marker.__parent,
			markers = cluster._markers,
			otherMarker;

		//Remove the marker from the immediate parents marker list
		this._arraySplice(markers, marker);

		while (cluster) {
			cluster._childCount--;
			cluster._boundsNeedUpdate = true;

			if (cluster._zoom < 0) {
				//Top level, do nothing
				break;
			} else if (removeFromDistanceGrid && cluster._childCount <= 1) { //Cluster no longer required
				//We need to push the other marker up to the parent
				otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];

				//Update distance grid
				gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
				gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));

				//Move otherMarker up to parent
				this._arraySplice(cluster.__parent._childClusters, cluster);
				cluster.__parent._markers.push(otherMarker);
				otherMarker.__parent = cluster.__parent;

				if (cluster._icon) {
					//Cluster is currently on the map, need to put the marker on the map instead
					fg.removeLayer(cluster);
					if (!dontUpdateMap) {
						fg.addLayer(otherMarker);
					}
				}
			} else {
				if (!dontUpdateMap || !cluster._icon) {
					cluster._updateIcon();
				}
			}

			cluster = cluster.__parent;
		}

		delete marker.__parent;
	},

	_isOrIsParent: function (el, oel) {
		while (oel) {
			if (el === oel) {
				return true;
			}
			oel = oel.parentNode;
		}
		return false;
	},

	_propagateEvent: function (e) {
		if (e.layer instanceof L.MarkerCluster) {
			//Prevent multiple clustermouseover/off events if the icon is made up of stacked divs (Doesn't work in ie <= 8, no relatedTarget)
			if (e.originalEvent && this._isOrIsParent(e.layer._icon, e.originalEvent.relatedTarget)) {
				return;
			}
			e.type = 'cluster' + e.type;
		}

		this.fire(e.type, e);
	},

	//Default functionality
	_defaultIconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'small';
		} else if (childCount < 100) {
			c += 'medium';
		} else {
			c += 'large';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},

	_bindEvents: function () {
		var map = this._map,
		    spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
		    showCoverageOnHover = this.options.showCoverageOnHover,
		    zoomToBoundsOnClick = this.options.zoomToBoundsOnClick;

		//Zoom on cluster click or spiderfy if we are at the lowest level
		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.on('clusterclick', this._zoomOrSpiderfy, this);
		}

		//Show convex hull (boundary) polygon on mouse over
		if (showCoverageOnHover) {
			this.on('clustermouseover', this._showCoverage, this);
			this.on('clustermouseout', this._hideCoverage, this);
			map.on('zoomend', this._hideCoverage, this);
		}
	},

	_zoomOrSpiderfy: function (e) {
		var cluster = e.layer,
		    bottomCluster = cluster;

		while (bottomCluster._childClusters.length === 1) {
			bottomCluster = bottomCluster._childClusters[0];
		}

		if (bottomCluster._zoom === this._maxZoom && bottomCluster._childCount === cluster._childCount) {
			// All child markers are contained in a single cluster from this._maxZoom to this cluster.
			if (this.options.spiderfyOnMaxZoom) {
				cluster.spiderfy();
			}
		} else if (this.options.zoomToBoundsOnClick) {
			cluster.zoomToBounds();
		}

		// Focus the map again for keyboard users.
		if (e.originalEvent && e.originalEvent.keyCode === 13) {
			this._map._container.focus();
		}
	},

	_showCoverage: function (e) {
		var map = this._map;
		if (this._inZoomAnimation) {
			return;
		}
		if (this._shownPolygon) {
			map.removeLayer(this._shownPolygon);
		}
		if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
			this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
			map.addLayer(this._shownPolygon);
		}
	},

	_hideCoverage: function () {
		if (this._shownPolygon) {
			this._map.removeLayer(this._shownPolygon);
			this._shownPolygon = null;
		}
	},

	_unbindEvents: function () {
		var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
			showCoverageOnHover = this.options.showCoverageOnHover,
			zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
			map = this._map;

		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.off('clusterclick', this._zoomOrSpiderfy, this);
		}
		if (showCoverageOnHover) {
			this.off('clustermouseover', this._showCoverage, this);
			this.off('clustermouseout', this._hideCoverage, this);
			map.off('zoomend', this._hideCoverage, this);
		}
	},

	_zoomEnd: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}
		this._mergeSplitClusters();

		this._zoom = this._map._zoom;
		this._currentShownBounds = this._getExpandedVisibleBounds();
	},

	_moveEnd: function () {
		if (this._inZoomAnimation) {
			return;
		}

		var newBounds = this._getExpandedVisibleBounds();

		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, newBounds);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._map._zoom, newBounds);

		this._currentShownBounds = newBounds;
		return;
	},

	_generateInitialClusters: function () {
		var maxZoom = this._map.getMaxZoom(),
			radius = this.options.maxClusterRadius,
			radiusFn = radius;
	
		//If we just set maxClusterRadius to a single number, we need to create
		//a simple function to return that number. Otherwise, we just have to
		//use the function we've passed in.
		if (typeof radius !== "function") {
			radiusFn = function () { return radius; };
		}

		if (this.options.disableClusteringAtZoom) {
			maxZoom = this.options.disableClusteringAtZoom - 1;
		}
		this._maxZoom = maxZoom;
		this._gridClusters = {};
		this._gridUnclustered = {};
	
		//Set up DistanceGrids for each zoom
		for (var zoom = maxZoom; zoom >= 0; zoom--) {
			this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
			this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
		}

		// Instantiate the appropriate L.MarkerCluster class (animated or not).
		this._topClusterLevel = new this._markerCluster(this, -1);
	},

	//Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
	_addLayer: function (layer, zoom) {
		var gridClusters = this._gridClusters,
		    gridUnclustered = this._gridUnclustered,
		    markerPoint, z;

		if (this.options.singleMarkerMode) {
			this._overrideMarkerIcon(layer);
		}

		//Find the lowest zoom level to slot this one in
		for (; zoom >= 0; zoom--) {
			markerPoint = this._map.project(layer.getLatLng(), zoom); // calculate pixel position

			//Try find a cluster close by
			var closest = gridClusters[zoom].getNearObject(markerPoint);
			if (closest) {
				closest._addChild(layer);
				layer.__parent = closest;
				return;
			}

			//Try find a marker close by to form a new cluster with
			closest = gridUnclustered[zoom].getNearObject(markerPoint);
			if (closest) {
				var parent = closest.__parent;
				if (parent) {
					this._removeLayer(closest, false);
				}

				//Create new cluster with these 2 in it

				var newCluster = new this._markerCluster(this, zoom, closest, layer);
				gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
				closest.__parent = newCluster;
				layer.__parent = newCluster;

				//First create any new intermediate parent clusters that don't exist
				var lastParent = newCluster;
				for (z = zoom - 1; z > parent._zoom; z--) {
					lastParent = new this._markerCluster(this, z, lastParent);
					gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
				}
				parent._addChild(lastParent);

				//Remove closest from this zoom level and any above that it is in, replace with newCluster
				this._removeFromGridUnclustered(closest, zoom);

				return;
			}

			//Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards
			gridUnclustered[zoom].addObject(layer, markerPoint);
		}

		//Didn't get in anything, add us to the top
		this._topClusterLevel._addChild(layer);
		layer.__parent = this._topClusterLevel;
		return;
	},

	//Enqueue code to fire after the marker expand/contract has happened
	_enqueue: function (fn) {
		this._queue.push(fn);
		if (!this._queueTimeout) {
			this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
		}
	},
	_processQueue: function () {
		for (var i = 0; i < this._queue.length; i++) {
			this._queue[i].call(this);
		}
		this._queue.length = 0;
		clearTimeout(this._queueTimeout);
		this._queueTimeout = null;
	},

	//Merge and split any existing clusters that are too big or small
	_mergeSplitClusters: function () {

		//Incase we are starting to split before the animation finished
		this._processQueue();

		if (this._zoom < this._map._zoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) { //Zoom in, split
			this._animationStart();
			//Remove clusters now off screen
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds());

			this._animationZoomIn(this._zoom, this._map._zoom);

		} else if (this._zoom > this._map._zoom) { //Zoom out, merge
			this._animationStart();

			this._animationZoomOut(this._zoom, this._map._zoom);
		} else {
			this._moveEnd();
		}
	},

	//Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
	_getExpandedVisibleBounds: function () {
		if (!this.options.removeOutsideVisibleBounds) {
			return this._mapBoundsInfinite;
		} else if (L.Browser.mobile) {
			return this._checkBoundsMaxLat(this._map.getBounds());
		}

		return this._checkBoundsMaxLat(this._map.getBounds().pad(1)); // Padding expands the bounds by its own dimensions but scaled with the given factor.
	},

	/**
	 * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
	 * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
	 * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
	 * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
	 * making the user think that MCG "eats" them and never displays them again.
	 * @param bounds L.LatLngBounds
	 * @returns {L.LatLngBounds}
	 * @private
	 */
	_checkBoundsMaxLat: function (bounds) {
		var maxLat = this._maxLat;

		if (maxLat !== undefined) {
			if (bounds.getNorth() >= maxLat) {
				bounds._northEast.lat = Infinity;
			}
			if (bounds.getSouth() <= -maxLat) {
				bounds._southWest.lat = -Infinity;
			}
		}

		return bounds;
	},

	//Shared animation code
	_animationAddLayerNonAnimated: function (layer, newCluster) {
		if (newCluster === layer) {
			this._featureGroup.addLayer(layer);
		} else if (newCluster._childCount === 2) {
			newCluster._addToMap();

			var markers = newCluster.getAllChildMarkers();
			this._featureGroup.removeLayer(markers[0]);
			this._featureGroup.removeLayer(markers[1]);
		} else {
			newCluster._updateIcon();
		}
	},

	/**
	 * Implements the singleMarkerMode option.
	 * @param layer Marker to re-style using the Clusters iconCreateFunction.
	 * @returns {L.Icon} The newly created icon.
	 * @private
	 */
	_overrideMarkerIcon: function (layer) {
		var icon = layer.options.icon = this.options.iconCreateFunction({
			getChildCount: function () {
				return 1;
			},
			getAllChildMarkers: function () {
				return [layer];
			}
		});

		return icon;
	}
});

// Constant bounds used in case option "removeOutsideVisibleBounds" is set to false.
L.MarkerClusterGroup.include({
	_mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
});

L.MarkerClusterGroup.include({
	_noAnimation: {
		//Non Animated versions of everything
		_animationStart: function () {
			//Do nothing...
		},
		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			//We didn't actually animate, but we use this event to mean "clustering animations have finished"
			this.fire('animationend');
		},
		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			//We didn't actually animate, but we use this event to mean "clustering animations have finished"
			this.fire('animationend');
		},
		_animationAddLayer: function (layer, newCluster) {
			this._animationAddLayerNonAnimated(layer, newCluster);
		}
	},
	_withAnimation: {
		//Animated versions here
		_animationStart: function () {
			this._map._mapPane.className += ' leaflet-cluster-anim';
			this._inZoomAnimation++;
		},
		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			var bounds = this._getExpandedVisibleBounds(),
			    fg     = this._featureGroup,
			    i;

			//Add all children of current clusters to map and remove those clusters from map
			this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
				var startPos = c._latlng,
				    markers  = c._markers,
				    m;

				if (!bounds.contains(startPos)) {
					startPos = null;
				}

				if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) { //Immediately add the new child and remove us
					fg.removeLayer(c);
					c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
				} else {
					//Fade out old cluster
					c.clusterHide();
					c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
				}

				//Remove all markers that aren't visible any more
				//TODO: Do we actually need to do this on the higher levels too?
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];
					if (!bounds.contains(m._latlng)) {
						fg.removeLayer(m);
					}
				}

			});

			this._forceLayout();

			//Update opacities
			this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
			//TODO Maybe? Update markers in _recursivelyBecomeVisible
			fg.eachLayer(function (n) {
				if (!(n instanceof L.MarkerCluster) && n._icon) {
					n.clusterShow();
				}
			});

			//update the positions of the just added clusters/markers
			this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
				c._recursivelyRestoreChildPositions(newZoomLevel);
			});

			//Remove the old clusters and close the zoom animation
			this._enqueue(function () {
				//update the positions of the just added clusters/markers
				this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
					fg.removeLayer(c);
					c.clusterShow();
				});

				this._animationEnd();
			});
		},

		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);

			//Need to add markers for those that weren't on the map before but are now
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
			//Remove markers that were on the map before but won't be now
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel, this._getExpandedVisibleBounds());
		},
		_animationAddLayer: function (layer, newCluster) {
			var me = this,
			    fg = this._featureGroup;

			fg.addLayer(layer);
			if (newCluster !== layer) {
				if (newCluster._childCount > 2) { //Was already a cluster

					newCluster._updateIcon();
					this._forceLayout();
					this._animationStart();

					layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
					layer.clusterHide();

					this._enqueue(function () {
						fg.removeLayer(layer);
						layer.clusterShow();

						me._animationEnd();
					});

				} else { //Just became a cluster
					this._forceLayout();

					me._animationStart();
					me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._map.getZoom());
				}
			}
		}
	},

	// Private methods for animated versions.
	_animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
		var bounds = this._getExpandedVisibleBounds();

		//Animate all of the markers in the clusters to move to their cluster center point
		cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, previousZoomLevel + 1, newZoomLevel);

		var me = this;

		//Update the opacity (If we immediately set it they won't animate)
		this._forceLayout();
		cluster._recursivelyBecomeVisible(bounds, newZoomLevel);

		//TODO: Maybe use the transition timing stuff to make this more reliable
		//When the animations are done, tidy up
		this._enqueue(function () {

			//This cluster stopped being a cluster before the timeout fired
			if (cluster._childCount === 1) {
				var m = cluster._markers[0];
				//If we were in a cluster animation at the time then the opacity and position of our child could be wrong now, so fix it
				m.setLatLng(m.getLatLng());
				if (m.clusterShow) {
					m.clusterShow();
				}
			} else {
				cluster._recursively(bounds, newZoomLevel, 0, function (c) {
					c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel + 1);
				});
			}
			me._animationEnd();
		});
	},

	_animationEnd: function () {
		if (this._map) {
			this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');
		}
		this._inZoomAnimation--;
		this.fire('animationend');
	},

	//Force a browser layout of stuff in the map
	// Should apply the current opacity and location to all elements so we can update them again for an animation
	_forceLayout: function () {
		//In my testing this works, infact offsetWidth of any element seems to work.
		//Could loop all this._layers and do this for each _icon if it stops working

		L.Util.falseFn(document.body.offsetWidth);
	}
});

L.markerClusterGroup = function (options) {
	return new L.MarkerClusterGroup(options);
};


L.MarkerCluster = L.Marker.extend({
	initialize: function (group, zoom, a, b) {

		L.Marker.prototype.initialize.call(this, a ? (a._cLatLng || a.getLatLng()) : new L.LatLng(0, 0), { icon: this });


		this._group = group;
		this._zoom = zoom;

		this._markers = [];
		this._childClusters = [];
		this._childCount = 0;
		this._iconNeedsUpdate = true;
		this._boundsNeedUpdate = true;

		this._bounds = new L.LatLngBounds();

		if (a) {
			this._addChild(a);
		}
		if (b) {
			this._addChild(b);
		}
	},

	//Recursively retrieve all child markers of this cluster
	getAllChildMarkers: function (storageArray) {
		storageArray = storageArray || [];

		for (var i = this._childClusters.length - 1; i >= 0; i--) {
			this._childClusters[i].getAllChildMarkers(storageArray);
		}

		for (var j = this._markers.length - 1; j >= 0; j--) {
			storageArray.push(this._markers[j]);
		}

		return storageArray;
	},

	//Returns the count of how many child markers we have
	getChildCount: function () {
		return this._childCount;
	},

	//Zoom to the minimum of showing all of the child markers, or the extents of this cluster
	zoomToBounds: function () {
		var childClusters = this._childClusters.slice(),
			map = this._group._map,
			boundsZoom = map.getBoundsZoom(this._bounds),
			zoom = this._zoom + 1,
			mapZoom = map.getZoom(),
			i;

		//calculate how far we need to zoom down to see all of the markers
		while (childClusters.length > 0 && boundsZoom > zoom) {
			zoom++;
			var newClusters = [];
			for (i = 0; i < childClusters.length; i++) {
				newClusters = newClusters.concat(childClusters[i]._childClusters);
			}
			childClusters = newClusters;
		}

		if (boundsZoom > zoom) {
			this._group._map.setView(this._latlng, zoom);
		} else if (boundsZoom <= mapZoom) { //If fitBounds wouldn't zoom us down, zoom us down instead
			this._group._map.setView(this._latlng, mapZoom + 1);
		} else {
			this._group._map.fitBounds(this._bounds);
		}
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();
		bounds.extend(this._bounds);
		return bounds;
	},

	_updateIcon: function () {
		this._iconNeedsUpdate = true;
		if (this._icon) {
			this.setIcon(this);
		}
	},

	//Cludge for Icon, we pretend to be an icon for performance
	createIcon: function () {
		if (this._iconNeedsUpdate) {
			this._iconObj = this._group.options.iconCreateFunction(this);
			this._iconNeedsUpdate = false;
		}
		return this._iconObj.createIcon();
	},
	createShadow: function () {
		return this._iconObj.createShadow();
	},


	_addChild: function (new1, isNotificationFromChild) {

		this._iconNeedsUpdate = true;

		this._boundsNeedUpdate = true;
		this._setClusterCenter(new1);

		if (new1 instanceof L.MarkerCluster) {
			if (!isNotificationFromChild) {
				this._childClusters.push(new1);
				new1.__parent = this;
			}
			this._childCount += new1._childCount;
		} else {
			if (!isNotificationFromChild) {
				this._markers.push(new1);
			}
			this._childCount++;
		}

		if (this.__parent) {
			this.__parent._addChild(new1, true);
		}
	},

	/**
	 * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
	 * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
	 * @private
	 */
	_setClusterCenter: function (child) {
		if (!this._cLatLng) {
			// when clustering, take position of the first point as the cluster center
			this._cLatLng = child._cLatLng || child._latlng;
		}
	},

	/**
	 * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
	 * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
	 * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
	 * @private
	 */
	_resetBounds: function () {
		var bounds = this._bounds;

		if (bounds._southWest) {
			bounds._southWest.lat = Infinity;
			bounds._southWest.lng = Infinity;
		}
		if (bounds._northEast) {
			bounds._northEast.lat = -Infinity;
			bounds._northEast.lng = -Infinity;
		}
	},

	_recalculateBounds: function () {
		var markers = this._markers,
		    childClusters = this._childClusters,
		    latSum = 0,
		    lngSum = 0,
		    totalCount = this._childCount,
		    i, child, childLatLng, childCount;

		// Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.
		if (totalCount === 0) {
			return;
		}

		// Reset rather than creating a new object, for performance.
		this._resetBounds();

		// Child markers.
		for (i = 0; i < markers.length; i++) {
			childLatLng = markers[i]._latlng;

			this._bounds.extend(childLatLng);

			latSum += childLatLng.lat;
			lngSum += childLatLng.lng;
		}

		// Child clusters.
		for (i = 0; i < childClusters.length; i++) {
			child = childClusters[i];

			// Re-compute child bounds and weighted position first if necessary.
			if (child._boundsNeedUpdate) {
				child._recalculateBounds();
			}

			this._bounds.extend(child._bounds);

			childLatLng = child._wLatLng;
			childCount = child._childCount;

			latSum += childLatLng.lat * childCount;
			lngSum += childLatLng.lng * childCount;
		}

		this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);

		// Reset dirty flag.
		this._boundsNeedUpdate = false;
	},

	//Set our markers position as given and add it to the map
	_addToMap: function (startPos) {
		if (startPos) {
			this._backupLatlng = this._latlng;
			this.setLatLng(startPos);
		}
		this._group._featureGroup.addLayer(this);
	},

	_recursivelyAnimateChildrenIn: function (bounds, center, maxZoom) {
		this._recursively(bounds, 0, maxZoom - 1,
			function (c) {
				var markers = c._markers,
					i, m;
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];

					//Only do it if the icon is still on the map
					if (m._icon) {
						m._setPos(center);
						m.clusterHide();
					}
				}
			},
			function (c) {
				var childClusters = c._childClusters,
					j, cm;
				for (j = childClusters.length - 1; j >= 0; j--) {
					cm = childClusters[j];
					if (cm._icon) {
						cm._setPos(center);
						cm.clusterHide();
					}
				}
			}
		);
	},

	_recursivelyAnimateChildrenInAndAddSelfToMap: function (bounds, previousZoomLevel, newZoomLevel) {
		this._recursively(bounds, newZoomLevel, 0,
			function (c) {
				c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);

				//TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
				//As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate
				if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
					c.clusterShow();
					c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel); //Immediately remove our children as we are replacing them. TODO previousBounds not bounds
				} else {
					c.clusterHide();
				}

				c._addToMap();
			}
		);
	},

	_recursivelyBecomeVisible: function (bounds, zoomLevel) {
		this._recursively(bounds, 0, zoomLevel, null, function (c) {
			c.clusterShow();
		});
	},

	_recursivelyAddChildrenToMap: function (startPos, zoomLevel, bounds) {
		this._recursively(bounds, -1, zoomLevel,
			function (c) {
				if (zoomLevel === c._zoom) {
					return;
				}

				//Add our child markers at startPos (so they can be animated out)
				for (var i = c._markers.length - 1; i >= 0; i--) {
					var nm = c._markers[i];

					if (!bounds.contains(nm._latlng)) {
						continue;
					}

					if (startPos) {
						nm._backupLatlng = nm.getLatLng();

						nm.setLatLng(startPos);
						if (nm.clusterHide) {
							nm.clusterHide();
						}
					}

					c._group._featureGroup.addLayer(nm);
				}
			},
			function (c) {
				c._addToMap(startPos);
			}
		);
	},

	_recursivelyRestoreChildPositions: function (zoomLevel) {
		//Fix positions of child markers
		for (var i = this._markers.length - 1; i >= 0; i--) {
			var nm = this._markers[i];
			if (nm._backupLatlng) {
				nm.setLatLng(nm._backupLatlng);
				delete nm._backupLatlng;
			}
		}

		if (zoomLevel - 1 === this._zoom) {
			//Reposition child clusters
			for (var j = this._childClusters.length - 1; j >= 0; j--) {
				this._childClusters[j]._restorePosition();
			}
		} else {
			for (var k = this._childClusters.length - 1; k >= 0; k--) {
				this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
			}
		}
	},

	_restorePosition: function () {
		if (this._backupLatlng) {
			this.setLatLng(this._backupLatlng);
			delete this._backupLatlng;
		}
	},

	//exceptBounds: If set, don't remove any markers/clusters in it
	_recursivelyRemoveChildrenFromMap: function (previousBounds, zoomLevel, exceptBounds) {
		var m, i;
		this._recursively(previousBounds, -1, zoomLevel - 1,
			function (c) {
				//Remove markers at every level
				for (i = c._markers.length - 1; i >= 0; i--) {
					m = c._markers[i];
					if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
						c._group._featureGroup.removeLayer(m);
						if (m.clusterShow) {
							m.clusterShow();
						}
					}
				}
			},
			function (c) {
				//Remove child clusters at just the bottom level
				for (i = c._childClusters.length - 1; i >= 0; i--) {
					m = c._childClusters[i];
					if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
						c._group._featureGroup.removeLayer(m);
						if (m.clusterShow) {
							m.clusterShow();
						}
					}
				}
			}
		);
	},

	//Run the given functions recursively to this and child clusters
	// boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
	// zoomLevelToStart: zoom level to start running functions (inclusive)
	// zoomLevelToStop: zoom level to stop running functions (inclusive)
	// runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
	// runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
	_recursively: function (boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
		var childClusters = this._childClusters,
		    zoom = this._zoom,
		    i, c;

		if (zoomLevelToStart > zoom) { //Still going down to required depth, just recurse to child clusters
			for (i = childClusters.length - 1; i >= 0; i--) {
				c = childClusters[i];
				if (boundsToApplyTo.intersects(c._bounds)) {
					c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
				}
			}
		} else { //In required depth

			if (runAtEveryLevel) {
				runAtEveryLevel(this);
			}
			if (runAtBottomLevel && this._zoom === zoomLevelToStop) {
				runAtBottomLevel(this);
			}

			//TODO: This loop is almost the same as above
			if (zoomLevelToStop > zoom) {
				for (i = childClusters.length - 1; i >= 0; i--) {
					c = childClusters[i];
					if (boundsToApplyTo.intersects(c._bounds)) {
						c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
					}
				}
			}
		}
	},

	//Returns true if we are the parent of only one cluster and that cluster is the same as us
	_isSingleParent: function () {
		//Don't need to check this._markers as the rest won't work if there are any
		return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
	}
});



/*
* Extends L.Marker to include two extra methods: clusterHide and clusterShow.
* 
* They work as setOpacity(0) and setOpacity(1) respectively, but
* they will remember the marker's opacity when hiding and showing it again.
* 
*/


L.Marker.include({
	
	clusterHide: function () {
		this.options.opacityWhenUnclustered = this.options.opacity || 1;
		return this.setOpacity(0);
	},
	
	clusterShow: function () {
		var ret = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
		delete this.options.opacityWhenUnclustered;
		return ret;
	}
	
});





L.DistanceGrid = function (cellSize) {
	this._cellSize = cellSize;
	this._sqCellSize = cellSize * cellSize;
	this._grid = {};
	this._objectPoint = { };
};

L.DistanceGrid.prototype = {

	addObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    stamp = L.Util.stamp(obj);

		this._objectPoint[stamp] = point;

		cell.push(obj);
	},

	updateObject: function (obj, point) {
		this.removeObject(obj);
		this.addObject(obj, point);
	},

	//Returns true if the object was found
	removeObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    i, len;

		delete this._objectPoint[L.Util.stamp(obj)];

		for (i = 0, len = cell.length; i < len; i++) {
			if (cell[i] === obj) {

				cell.splice(i, 1);

				if (len === 1) {
					delete row[x];
				}

				return true;
			}
		}

	},

	eachObject: function (fn, context) {
		var i, j, k, len, row, cell, removed,
		    grid = this._grid;

		for (i in grid) {
			row = grid[i];

			for (j in row) {
				cell = row[j];

				for (k = 0, len = cell.length; k < len; k++) {
					removed = fn.call(context, cell[k]);
					if (removed) {
						k--;
						len--;
					}
				}
			}
		}
	},

	getNearObject: function (point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    i, j, k, row, cell, len, obj, dist,
		    objectPoint = this._objectPoint,
		    closestDistSq = this._sqCellSize,
		    closest = null;

		for (i = y - 1; i <= y + 1; i++) {
			row = this._grid[i];
			if (row) {

				for (j = x - 1; j <= x + 1; j++) {
					cell = row[j];
					if (cell) {

						for (k = 0, len = cell.length; k < len; k++) {
							obj = cell[k];
							dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point);
							if (dist < closestDistSq) {
								closestDistSq = dist;
								closest = obj;
							}
						}
					}
				}
			}
		}
		return closest;
	},

	_getCoord: function (x) {
		return Math.floor(x / this._cellSize);
	},

	_sqDist: function (p, p2) {
		var dx = p2.x - p.x,
		    dy = p2.y - p.y;
		return dx * dx + dy * dy;
	}
};


/* Copyright (c) 2012 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
*/

(function () {
	L.QuickHull = {

		/*
		 * @param {Object} cpt a point to be measured from the baseline
		 * @param {Array} bl the baseline, as represented by a two-element
		 *   array of latlng objects.
		 * @returns {Number} an approximate distance measure
		 */
		getDistant: function (cpt, bl) {
			var vY = bl[1].lat - bl[0].lat,
				vX = bl[0].lng - bl[1].lng;
			return (vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng));
		},

		/*
		 * @param {Array} baseLine a two-element array of latlng objects
		 *   representing the baseline to project from
		 * @param {Array} latLngs an array of latlng objects
		 * @returns {Object} the maximum point and all new points to stay
		 *   in consideration for the hull.
		 */
		findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
			var maxD = 0,
				maxPt = null,
				newPoints = [],
				i, pt, d;

			for (i = latLngs.length - 1; i >= 0; i--) {
				pt = latLngs[i];
				d = this.getDistant(pt, baseLine);

				if (d > 0) {
					newPoints.push(pt);
				} else {
					continue;
				}

				if (d > maxD) {
					maxD = d;
					maxPt = pt;
				}
			}

			return { maxPoint: maxPt, newPoints: newPoints };
		},


		/*
		 * Given a baseline, compute the convex hull of latLngs as an array
		 * of latLngs.
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		buildConvexHull: function (baseLine, latLngs) {
			var convexHullBaseLines = [],
				t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);

			if (t.maxPoint) { // if there is still a point "outside" the base line
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints)
					);
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints)
					);
				return convexHullBaseLines;
			} else {  // if there is no more point "outside" the base line, the current base line is part of the convex hull
				return [baseLine[0]];
			}
		},

		/*
		 * Given an array of latlngs, compute a convex hull as an array
		 * of latlngs
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		getConvexHull: function (latLngs) {
			// find first baseline
			var maxLat = false, minLat = false,
				maxLng = false, minLng = false,
				maxLatPt = null, minLatPt = null,
				maxLngPt = null, minLngPt = null,
				maxPt = null, minPt = null,
				i;

			for (i = latLngs.length - 1; i >= 0; i--) {
				var pt = latLngs[i];
				if (maxLat === false || pt.lat > maxLat) {
					maxLatPt = pt;
					maxLat = pt.lat;
				}
				if (minLat === false || pt.lat < minLat) {
					minLatPt = pt;
					minLat = pt.lat;
				}
				if (maxLng === false || pt.lng > maxLng) {
					maxLngPt = pt;
					maxLng = pt.lng;
				}
				if (minLng === false || pt.lng < minLng) {
					minLngPt = pt;
					minLng = pt.lng;
				}
			}
			
			if (minLat !== maxLat) {
				minPt = minLatPt;
				maxPt = maxLatPt;
			} else {
				minPt = minLngPt;
				maxPt = maxLngPt;
			}

			var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs),
								this.buildConvexHull([maxPt, minPt], latLngs));
			return ch;
		}
	};
}());

L.MarkerCluster.include({
	getConvexHull: function () {
		var childMarkers = this.getAllChildMarkers(),
			points = [],
			p, i;

		for (i = childMarkers.length - 1; i >= 0; i--) {
			p = childMarkers[i].getLatLng();
			points.push(p);
		}

		return L.QuickHull.getConvexHull(points);
	}
});


//This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
//Huge thanks to jawj for implementing it first to make my job easy :-)

L.MarkerCluster.include({

	_2PI: Math.PI * 2,
	_circleFootSeparation: 25, //related to circumference of circle
	_circleStartAngle: Math.PI / 6,

	_spiralFootSeparation:  28, //related to size of spiral (experiment!)
	_spiralLengthStart: 11,
	_spiralLengthFactor: 5,

	_circleSpiralSwitchover: 9, //show spiral instead of circle from this marker count upwards.
								// 0 -> always spiral; Infinity -> always circle

	spiderfy: function () {
		if (this._group._spiderfied === this || this._group._inZoomAnimation) {
			return;
		}

		var childMarkers = this.getAllChildMarkers(),
			group = this._group,
			map = group._map,
			center = map.latLngToLayerPoint(this._latlng),
			positions;

		this._group._unspiderfy();
		this._group._spiderfied = this;

		//TODO Maybe: childMarkers order by distance to center

		if (childMarkers.length >= this._circleSpiralSwitchover) {
			positions = this._generatePointsSpiral(childMarkers.length, center);
		} else {
			center.y += 10; // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.
			positions = this._generatePointsCircle(childMarkers.length, center);
		}

		this._animationSpiderfy(childMarkers, positions);
	},

	unspiderfy: function (zoomDetails) {
		/// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
		if (this._group._inZoomAnimation) {
			return;
		}
		this._animationUnspiderfy(zoomDetails);

		this._group._spiderfied = null;
	},

	_generatePointsCircle: function (count, centerPt) {
		var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
			legLength = circumference / this._2PI,  //radius from circumference
			angleStep = this._2PI / count,
			res = [],
			i, angle;

		res.length = count;

		for (i = count - 1; i >= 0; i--) {
			angle = this._circleStartAngle + i * angleStep;
			res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
		}

		return res;
	},

	_generatePointsSpiral: function (count, centerPt) {
		var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier,
			legLength = spiderfyDistanceMultiplier * this._spiralLengthStart,
			separation = spiderfyDistanceMultiplier * this._spiralFootSeparation,
			lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI,
			angle = 0,
			res = [],
			i;

		res.length = count;

		// Higher index, closer position to cluster center.
		for (i = count - 1; i >= 0; i--) {
			angle += separation / legLength + i * 0.0005;
			res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
			legLength += lengthFactor / angle;
		}
		return res;
	},

	_noanimationUnspiderfy: function () {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			childMarkers = this.getAllChildMarkers(),
			m, i;

		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			fg.removeLayer(m);

			if (m._preSpiderfyLatlng) {
				m.setLatLng(m._preSpiderfyLatlng);
				delete m._preSpiderfyLatlng;
			}
			if (m.setZIndexOffset) {
				m.setZIndexOffset(0);
			}

			if (m._spiderLeg) {
				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
		}
		
		group.fire('unspiderfied', {
			cluster: this,
			markers: childMarkers
		});
		group._spiderfied = null;
	}
});

//Non Animated versions of everything
L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
	_animationSpiderfy: function (childMarkers, positions) {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			legOptions = this._group.options.spiderLegPolylineOptions,
			i, m, leg, newPos;

		// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
		// The reverse order trick no longer improves performance on modern browsers.
		for (i = 0; i < childMarkers.length; i++) {
			newPos = map.layerPointToLatLng(positions[i]);
			m = childMarkers[i];

			// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
			leg = new L.Polyline([this._latlng, newPos], legOptions);
			map.addLayer(leg);
			m._spiderLeg = leg;

			// Now add the marker.
			m._preSpiderfyLatlng = m._latlng;
			m.setLatLng(newPos);
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); //Make these appear on top of EVERYTHING
			}

			fg.addLayer(m);
		}
		this.setOpacity(0.3);
		group.fire('spiderfied', {
			cluster: this,
			markers: childMarkers
		});
	},

	_animationUnspiderfy: function () {
		this._noanimationUnspiderfy();
	}
});

//Animated versions here
L.MarkerCluster.include({

	_animationSpiderfy: function (childMarkers, positions) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerLatLng = this._latlng,
			thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng),
			svg = L.Path.SVG,
			legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), // Copy the options so that we can modify them for animation.
			finalLegOpacity = legOptions.opacity,
			i, m, leg, legPath, legLength, newPos;

		if (finalLegOpacity === undefined) {
			finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
		}

		if (svg) {
			// If the initial opacity of the spider leg is not 0 then it appears before the animation starts.
			legOptions.opacity = 0;

			// Add the class for CSS transitions.
			legOptions.className = (legOptions.className || '') + ' leaflet-cluster-spider-leg';
		} else {
			// Make sure we have a defined opacity.
			legOptions.opacity = finalLegOpacity;
		}

		// Add markers and spider legs to map, hidden at our center point.
		// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
		// The reverse order trick no longer improves performance on modern browsers.
		for (i = 0; i < childMarkers.length; i++) {
			m = childMarkers[i];

			newPos = map.layerPointToLatLng(positions[i]);

			// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
			leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
			map.addLayer(leg);
			m._spiderLeg = leg;

			// Explanations: https://jakearchibald.com/2013/animated-line-drawing-svg/
			// In our case the transition property is declared in the CSS file.
			if (svg) {
				legPath = leg._path;
				legLength = legPath.getTotalLength() + 0.1; // Need a small extra length to avoid remaining dot in Firefox.
				legPath.style.strokeDasharray = legLength; // Just 1 length is enough, it will be duplicated.
				legPath.style.strokeDashoffset = legLength;
			}

			// If it is a marker, add it now and we'll animate it out
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); // Make normal markers appear on top of EVERYTHING
			}
			if (m.clusterHide) {
				m.clusterHide();
			}

			// Vectors just get immediately added
			fg.addLayer(m);

			if (m._setPos) {
				m._setPos(thisLayerPos);
			}
		}

		group._forceLayout();
		group._animationStart();

		// Reveal markers and spider legs.
		for (i = childMarkers.length - 1; i >= 0; i--) {
			newPos = map.layerPointToLatLng(positions[i]);
			m = childMarkers[i];

			//Move marker to new position
			m._preSpiderfyLatlng = m._latlng;
			m.setLatLng(newPos);
			
			if (m.clusterShow) {
				m.clusterShow();
			}

			// Animate leg (animation is actually delegated to CSS transition).
			if (svg) {
				leg = m._spiderLeg;
				legPath = leg._path;
				legPath.style.strokeDashoffset = 0;
				//legPath.style.strokeOpacity = finalLegOpacity;
				leg.setStyle({opacity: finalLegOpacity});
			}
		}
		this.setOpacity(0.3);

		setTimeout(function () {
			group._animationEnd();
			group.fire('spiderfied', {
				cluster: me,
				markers: childMarkers
			});
		}, 200);
	},

	_animationUnspiderfy: function (zoomDetails) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng),
			childMarkers = this.getAllChildMarkers(),
			svg = L.Path.SVG,
			m, i, leg, legPath, legLength, nonAnimatable;

		group._animationStart();

		//Make us visible and bring the child markers back in
		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			//Marker was added to us after we were spiderfied
			if (!m._preSpiderfyLatlng) {
				continue;
			}

			//Fix up the location to the real one
			m.setLatLng(m._preSpiderfyLatlng);
			delete m._preSpiderfyLatlng;

			//Hack override the location to be our center
			nonAnimatable = true;
			if (m._setPos) {
				m._setPos(thisLayerPos);
				nonAnimatable = false;
			}
			if (m.clusterHide) {
				m.clusterHide();
				nonAnimatable = false;
			}
			if (nonAnimatable) {
				fg.removeLayer(m);
			}

			// Animate the spider leg back in (animation is actually delegated to CSS transition).
			if (svg) {
				leg = m._spiderLeg;
				legPath = leg._path;
				legLength = legPath.getTotalLength() + 0.1;
				legPath.style.strokeDashoffset = legLength;
				leg.setStyle({opacity: 0});
			}
		}

		setTimeout(function () {
			//If we have only <= one child left then that marker will be shown on the map so don't remove it!
			var stillThereChildCount = 0;
			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];
				if (m._spiderLeg) {
					stillThereChildCount++;
				}
			}


			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];

				if (!m._spiderLeg) { //Has already been unspiderfied
					continue;
				}

				if (m.clusterShow) {
					m.clusterShow();
				}
				if (m.setZIndexOffset) {
					m.setZIndexOffset(0);
				}

				if (stillThereChildCount > 1) {
					fg.removeLayer(m);
				}

				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
			group._animationEnd();
			group.fire('unspiderfied', {
				cluster: me,
				markers: childMarkers
			});
		}, 200);
	}
});


L.MarkerClusterGroup.include({
	//The MarkerCluster currently spiderfied (if any)
	_spiderfied: null,

	_spiderfierOnAdd: function () {
		this._map.on('click', this._unspiderfyWrapper, this);

		if (this._map.options.zoomAnimation) {
			this._map.on('zoomstart', this._unspiderfyZoomStart, this);
		}
		//Browsers without zoomAnimation or a big zoom don't fire zoomstart
		this._map.on('zoomend', this._noanimationUnspiderfy, this);
	},

	_spiderfierOnRemove: function () {
		this._map.off('click', this._unspiderfyWrapper, this);
		this._map.off('zoomstart', this._unspiderfyZoomStart, this);
		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._map.off('zoomend', this._noanimationUnspiderfy, this);

		//Ensure that markers are back where they should be
		// Use no animation to avoid a sticky leaflet-cluster-anim class on mapPane
		this._noanimationUnspiderfy();
	},

	//On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
	//This means we can define the animation they do rather than Markers doing an animation to their actual location
	_unspiderfyZoomStart: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}

		this._map.on('zoomanim', this._unspiderfyZoomAnim, this);
	},

	_unspiderfyZoomAnim: function (zoomDetails) {
		//Wait until the first zoomanim after the user has finished touch-zooming before running the animation
		if (L.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
			return;
		}

		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._unspiderfy(zoomDetails);
	},

	_unspiderfyWrapper: function () {
		/// <summary>_unspiderfy but passes no arguments</summary>
		this._unspiderfy();
	},

	_unspiderfy: function (zoomDetails) {
		if (this._spiderfied) {
			this._spiderfied.unspiderfy(zoomDetails);
		}
	},

	_noanimationUnspiderfy: function () {
		if (this._spiderfied) {
			this._spiderfied._noanimationUnspiderfy();
		}
	},

	//If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
	_unspiderfyLayer: function (layer) {
		if (layer._spiderLeg) {
			this._featureGroup.removeLayer(layer);

			if (layer.clusterShow) {
				layer.clusterShow();
			}
			//Position will be fixed up immediately in _animationUnspiderfy
			if (layer.setZIndexOffset) {
				layer.setZIndexOffset(0);
			}

			this._map.removeLayer(layer._spiderLeg);
			delete layer._spiderLeg;
		}
	}
});


/**
 * Adds 1 public method to MCG and 1 to L.Marker to facilitate changing
 * markers' icon options and refreshing their icon and their parent clusters
 * accordingly (case where their iconCreateFunction uses data of childMarkers
 * to make up the cluster icon).
 */


L.MarkerClusterGroup.include({
	/**
	 * Updates the icon of all clusters which are parents of the given marker(s).
	 * In singleMarkerMode, also updates the given marker(s) icon.
	 * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
	 * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
	 * clusters need to be updated. If not provided, retrieves all child markers of this.
	 * @returns {L.MarkerClusterGroup}
	 */
	refreshClusters: function (layers) {
		if (!layers) {
			layers = this._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.MarkerClusterGroup) {
			layers = layers._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.LayerGroup) {
			layers = layers._layers;
		} else if (layers instanceof L.MarkerCluster) {
			layers = layers.getAllChildMarkers();
		} else if (layers instanceof L.Marker) {
			layers = [layers];
		} // else: must be an Array(L.Marker)|Map(L.Marker)
		this._flagParentsIconsNeedUpdate(layers);
		this._refreshClustersIcons();

		// In case of singleMarkerMode, also re-draw the markers.
		if (this.options.singleMarkerMode) {
			this._refreshSingleMarkerModeMarkers(layers);
		}

		return this;
	},

	/**
	 * Simply flags all parent clusters of the given markers as having a "dirty" icon.
	 * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
	 * @private
	 */
	_flagParentsIconsNeedUpdate: function (layers) {
		var id, parent;

		// Assumes layers is an Array or an Object whose prototype is non-enumerable.
		for (id in layers) {
			// Flag parent clusters' icon as "dirty", all the way up.
			// Dumb process that flags multiple times upper parents, but still
			// much more efficient than trying to be smart and make short lists,
			// at least in the case of a hierarchy following a power law:
			// http://jsperf.com/flag-nodes-in-power-hierarchy/2
			parent = layers[id].__parent;
			while (parent) {
				parent._iconNeedsUpdate = true;
				parent = parent.__parent;
			}
		}
	},

	/**
	 * Refreshes the icon of all "dirty" visible clusters.
	 * Non-visible "dirty" clusters will be updated when they are added to the map.
	 * @private
	 */
	_refreshClustersIcons: function () {
		this._featureGroup.eachLayer(function (c) {
			if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
				c._updateIcon();
			}
		});
	},

	/**
	 * Re-draws the icon of the supplied markers.
	 * To be used in singleMarkerMode only.
	 * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
	 * @private
	 */
	_refreshSingleMarkerModeMarkers: function (layers) {
		var id, layer;

		for (id in layers) {
			layer = layers[id];

			// Make sure we do not override markers that do not belong to THIS group.
			if (this.hasLayer(layer)) {
				// Need to re-create the icon first, then re-draw the marker.
				layer.setIcon(this._overrideMarkerIcon(layer));
			}
		}
	}
});

L.Marker.include({
	/**
	 * Updates the given options in the marker's icon and refreshes the marker.
	 * @param options map object of icon options.
	 * @param directlyRefreshClusters boolean (optional) true to trigger
	 * MCG.refreshClustersOf() right away with this single marker.
	 * @returns {L.Marker}
	 */
	refreshIconOptions: function (options, directlyRefreshClusters) {
		var icon = this.options.icon;

		L.setOptions(icon, options);

		this.setIcon(icon);

		// Shortcut to refresh the associated MCG clusters right away.
		// To be used when refreshing a single marker.
		// Otherwise, better use MCG.refreshClusters() once at the end with
		// the list of modified markers.
		if (directlyRefreshClusters && this.__parent) {
			this.__parent._group.refreshClusters(this);
		}

		return this;
	}
});


}(window, document));

/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * ### Events
 * Once you have successfully added the Leaflet.draw plugin to your map you will want to respond to the different
 * actions users can initiate. The following events will be triggered on the map:
 *
 * @class L.Draw.Event
 * @aka Draw.Event
 *
 * Use `L.Draw.Event.EVENTNAME` constants to ensure events are correct.
 *
 * @example
 * ```js
 * map.on(L.Draw.Event.CREATED; function (e) {
 *    var type = e.layerType,
 *        layer = e.layer;
 *
 *    if (type === 'marker') {
 *        // Do marker specific actions
 *    }
 *
 *    // Do whatever else you need to. (save to db; add to map etc)
 *    map.addLayer(layer);
 *});
 * ```
 */
L.Draw = {};
L.Draw.Event = {};
/**
 * @event draw:created: PolyLine; Polygon; Rectangle; Circle; Marker | String
 *
 * Layer that was just created.
 * The type of layer this is. One of: `polyline`; `polygon`; `rectangle`; `circle`; `marker`
 * Triggered when a new vector or marker has been created.
 *
 */
L.Draw.Event.CREATED = 'draw:created';

/**
 * @event draw:edited: LayerGroup
 *
 * List of all layers just edited on the map.
 *
 *
 * Triggered when layers in the FeatureGroup; initialised with the plugin; have been edited and saved.
 *
 * @example
 * ```js
 *      map.on('draw:edited', function (e) {
     *          var layers = e.layers;
     *          layers.eachLayer(function (layer) {
     *              //do whatever you want; most likely save back to db
     *          });
     *      });
 * ```
 */

L.Draw.Event.EDITSTART = 'draw:editstart';

/**
 * @event draw:editmove: ILayer
 *
 *  Layer that was just moved.
 *
 * Triggered as the user moves a rectangle; circle or marker.
 */
L.Draw.Event.EDITMOVE = 'draw:editmove';

/**
 * @event draw:editresize: ILayer
 *
 * Layer that was just moved.
 *
 * Triggered as the user resizes a rectangle or circle.
 */
L.Draw.Event.EDITRESIZE = 'draw:editresize';

/**
 * @event draw:editvertex: LayerGroup
 *
 * List of all layers just being edited from the map.
 *
 * Triggered when a vertex is edited on a polyline or polygon.
 */
L.Draw.Event.EDITVERTEX = 'draw:editvertex';

/**
 * @event draw:editstop: String
 *
 * The type of edit this is. One of: `edit`
 *
 * Triggered when the user has finshed editing (edit mode) and saves edits.
 */
L.Draw.Event.EDITSTOP = 'draw:editstop';

/**
 * @event draw:deletestart: String
 *
 * The type of edit this is. One of: `remove`
 *
 * Triggered when the user starts remove mode by clicking the remove tool button.
 */
L.Draw.Event.DELETESTART = 'draw:deletestart';

/**
 * @event draw:deletestop: String
 *
 * The type of edit this is. One of: `remove`
 *
 * Triggered when the user has finished removing shapes (remove mode) and saves.
 */
L.Draw.Event.DELETESTOP = 'draw:deletestop';


/***/ }),
/* 47 */
/***/ (function(module, exports) {

L.Edit = L.Edit || {};
/**
 * @class L.Edit.SimpleShape
 * @aka Edit.SimpleShape
 */
L.Edit.SimpleShape = L.Handler.extend({
	options: {
		moveIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
		}),
		resizeIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize'
		}),
		touchMoveIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon'
		}),
		touchResizeIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize leaflet-touch-icon'
		}),
	},

	// @method intialize(): void
	initialize: function (shape, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.moveIcon = this.options.touchMoveIcon;
			this.options.resizeIcon = this.options.touchResizeIcon;
		}

		this._shape = shape;
		L.Util.setOptions(this, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var shape = this._shape;
		if (this._shape._map) {
			this._map = this._shape._map;
			shape.setStyle(shape.options.editing);

			if (shape._map) {
				this._map = shape._map;
				if (!this._markerGroup) {
					this._initMarkers();
				}
				this._map.addLayer(this._markerGroup);
			}
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		var shape = this._shape;

		shape.setStyle(shape.options.original);

		if (shape._map) {
			this._unbindMarker(this._moveMarker);

			for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
				this._unbindMarker(this._resizeMarkers[i]);
			}
			this._resizeMarkers = null;

			this._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
		}

		this._map = null;
	},

	// @method updateMarkers(): void
	// Remove the edit markers from this layer
	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}

		// Create center marker
		this._createMoveMarker();

		// Create edge marker
		this._createResizeMarker();
	},

	_createMoveMarker: function () {
		// Children override
	},

	_createResizeMarker: function () {
		// Children override
	},

	_createMarker: function (latlng, icon) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: icon,
			zIndexOffset: 10
		});

		this._bindMarker(marker);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_bindMarker: function (marker) {
		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._onMarkerDragEnd, this)
			.on('touchstart', this._onTouchStart, this)
			.on('touchmove', this._onTouchMove, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('touchend', this._onTouchEnd, this)
			.on('MSPointerUp', this._onTouchEnd, this);
	},

	_unbindMarker: function (marker) {
		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._onMarkerDragEnd, this)
			.off('touchstart', this._onTouchStart, this)
			.off('touchmove', this._onTouchMove, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('touchend', this._onTouchEnd, this)
			.off('MSPointerUp', this._onTouchEnd, this);
	},

	_onMarkerDragStart: function (e) {
		var marker = e.target;
		marker.setOpacity(0);

		this._shape.fire('editstart');
	},

	_fireEdit: function () {
		this._shape.edited = true;
		this._shape.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target,
			latlng = marker.getLatLng();

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();
		this._shape.fire('editdrag');
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);

		this._fireEdit();
	},

	_onTouchStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		if (typeof(this._getCorners) === 'function') {
			// Save a reference to the opposite point
			var corners = this._getCorners(),
				marker = e.target,
				currentCornerIndex = marker._cornerIndex;

			marker.setOpacity(0);

			// Copyed from Edit.Rectangle.js line 23 _onMarkerDragStart()
			// Latlng is null otherwise.
			this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];
			this._toggleCornerMarkers(0, currentCornerIndex);
		}

		this._shape.fire('editstart');
	},

	_onTouchMove: function (e) {
		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();

		// prevent touchcancel in IOS
		// e.preventDefault();
		return false;
	},

	_onTouchEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);
		this.updateMarkers();
		this._fireEdit();
	},

	_move: function () {
		// Children override
	},

	_resize: function () {
		// Children override
	}
});

/**
 * @class L.Edit.CircleMarker
 * @aka Edit.Circle
 * @inherits L.Edit.SimpleShape
 */
L.Edit.CircleMarker = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var center = this._shape.getLatLng();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		// To avoid an undefined check in L.Edit.SimpleShape.removeHooks
		this._resizeMarkers = [];
	},

	_move: function (latlng) {
		if (this._resizeMarkers.length) {
			var resizemarkerPoint = this._getResizeMarkerPoint(latlng);
			// Move the resize marker
			this._resizeMarkers[0].setLatLng(resizemarkerPoint);
		}

		// Move the circle
		this._shape.setLatLng(latlng);

		this._map.fire(L.Draw.Event.EDITMOVE, { layer: this._shape });
	},
});

L.CircleMarker.addInitHook(function () {
	if (L.Edit.CircleMarker) {
		this.editing = new L.Edit.CircleMarker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});
/**
 * @class L.Edit.Circle
 * @aka Edit.Circle
 * @inherits L.Edit.CircleMarker
 */
L.Edit.Circle = L.Edit.CircleMarker.extend({

	_createResizeMarker: function () {
		var center = this._shape.getLatLng(),
			resizemarkerPoint = this._getResizeMarkerPoint(center);

		this._resizeMarkers = [];
		this._resizeMarkers.push(this._createMarker(resizemarkerPoint, this.options.resizeIcon));
	},

	_getResizeMarkerPoint: function (latlng) {
		// From L.shape.getBounds()
		var delta = this._shape._radius * Math.cos(Math.PI / 4),
			point = this._map.project(latlng);
		return this._map.unproject([point.x + delta, point.y - delta]);
	},

	_resize: function (latlng) {
		var moveLatLng = this._moveMarker.getLatLng();

		// Calculate the radius based on the version
		if(L.GeometryUtil.isVersion07x()){
			radius = moveLatLng.distanceTo(latlng);
		} else {
			radius = this._map.distance(moveLatLng, latlng);
		}
		this._shape._mRadius = radius;
		this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape });
	}
});

L.Circle.addInitHook(function () {
	if (L.Edit.Circle) {
		this.editing = new L.Edit.Circle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});
/**
 * @class L.Edit.Marker
 * @aka Edit.Marker
 */
L.Edit.Marker = L.Handler.extend({
	// @method initialize(): void
	initialize: function (marker, options) {
		this._marker = marker;
		L.setOptions(this, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var marker = this._marker;

		marker.dragging.enable();
		marker.on('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		var marker = this._marker;

		marker.dragging.disable();
		marker.off('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	_onDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
		this._map.fire(L.Draw.Event.EDITMOVE, { layer: layer });
	},

	_toggleMarkerHighlight: function () {
		var icon = this._marker._icon;

		// Don't do anything if this layer is a marker but doesn't have an icon. Markers
		// should usually have icons. If using Leaflet.draw with Leaflet.markercluster there
		// is a chance that a marker doesn't.
		if (!icon) {
			return;
		}

		// This is quite naughty, but I don't see another way of doing it. (short of setting a new icon)
		icon.style.display = 'none';

		if (L.DomUtil.hasClass(icon, 'leaflet-edit-marker-selected')) {
			L.DomUtil.removeClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, -4);

		} else {
			L.DomUtil.addClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, 4);
		}

		icon.style.display = '';
	},

	_offsetMarker: function (icon, offset) {
		var iconMarginTop = parseInt(icon.style.marginTop, 10) - offset,
			iconMarginLeft = parseInt(icon.style.marginLeft, 10) - offset;

		icon.style.marginTop = iconMarginTop + 'px';
		icon.style.marginLeft = iconMarginLeft + 'px';
	}
});

L.Marker.addInitHook(function () {
	if (L.Edit.Marker) {
		this.editing = new L.Edit.Marker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});
/**
 * @class L.Edit.Polyline
 * @aka L.Edit.Poly
 * @aka Edit.Poly
 */
L.Edit.Poly = L.Handler.extend({
	options: {},

	// @method initialize(): void
	initialize: function (poly, options) {

		this.latlngs = [poly._latlngs];
		if (poly._holes) {
			this.latlngs = this.latlngs.concat(poly._holes);
		}

		this._poly = poly;
		L.setOptions(this, options);

		this._poly.on('revert-edited', this._updateLatLngs, this);
	},

	// Compatibility method to normalize Poly* objects
	// between 0.7.x and 1.0+
	_defaultShape: function () {
		if (!L.Polyline._flat) {
			return this._poly._latlngs;
		}
		return L.Polyline._flat(this._poly._latlngs) ? this._poly._latlngs : this._poly._latlngs[0];
	},

	_eachVertexHandler: function (callback) {
		for (var i = 0; i < this._verticesHandlers.length; i++) {
			callback(this._verticesHandlers[i]);
		}
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		this._initHandlers();
		this._eachVertexHandler(function (handler) {
			handler.addHooks();
		});
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		this._eachVertexHandler(function (handler) {
			handler.removeHooks();
		});
	},

	// @method updateMarkers(): void
	// Fire an update for each vertex handler
	updateMarkers: function () {
		this._eachVertexHandler(function (handler) {
			handler.updateMarkers();
		});
	},

	_initHandlers: function () {
		this._verticesHandlers = [];
		for (var i = 0; i < this.latlngs.length; i++) {
			this._verticesHandlers.push(new L.Edit.PolyVerticesEdit(this._poly, this.latlngs[i], this.options));
		}
	},

	_updateLatLngs: function (e) {
		this.latlngs = [e.layer._latlngs];
		if (e.layer._holes) {
			this.latlngs = this.latlngs.concat(e.layer._holes);
		}
	}

});

/**
 * @class L.Edit.PolyVerticesEdit
 * @aka Edit.PolyVerticesEdit
 */
L.Edit.PolyVerticesEdit = L.Handler.extend({
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		drawError: {
			color: '#b00b00',
			timeout: 1000
		}


	},

	// @method intialize(): void
	initialize: function (poly, latlngs, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}
		this._poly = poly;

		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		this._latlngs = latlngs;

		L.setOptions(this, options);
	},

	// Compatibility method to normalize Poly* objects
	// between 0.7.x and 1.0+
	_defaultShape: function () {
		if (!L.Polyline._flat) {
			return this._latlngs;
		}
		return L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0];
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		var poly = this._poly;

		if (!(poly instanceof L.Polygon)) {
			poly.options.fill = false;
			if (poly.options.editing) {
				poly.options.editing.fill = false;
			}
		}

		poly.setStyle(poly.options.editing);

		if (this._poly._map) {

			this._map = this._poly._map; // Set map

			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._poly._map.addLayer(this._markerGroup);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		var poly = this._poly;

		poly.setStyle(poly.options.original);

		if (poly._map) {
			poly._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
			delete this._markers;
		}
	},

	// @method updateMarkers(): void
	// Clear markers and update their location
	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		this._markers = [];

		var latlngs = this._defaultShape(),
			i, j, len, marker;

		for (i = 0, len = latlngs.length; i < len; i++) {

			marker = this._createMarker(latlngs[i], i);
			marker.on('click', this._onMarkerClick, this);
			this._markers.push(marker);
		}

		var markerLeft, markerRight;

		for (i = 0, j = len - 1; i < len; j = i++) {
			if (i === 0 && !(L.Polygon && (this._poly instanceof L.Polygon))) {
				continue;
			}

			markerLeft = this._markers[j];
			markerRight = this._markers[i];

			this._createMiddleMarker(markerLeft, markerRight);
			this._updatePrevNext(markerLeft, markerRight);
		}
	},

	_createMarker: function (latlng, index) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: this.options.icon,
		});

		marker._origLatLng = latlng;
		marker._index = index;

		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._fireEdit, this)
			.on('touchmove', this._onTouchMove, this)
			.on('touchend', this._fireEdit, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('MSPointerUp', this._fireEdit, this);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_onMarkerDragStart: function () {
		this._poly.fire('editstart');
	},

	_spliceLatLngs: function () {
		var latlngs = this._defaultShape();
		var removed = [].splice.apply(latlngs, arguments);
		this._poly._convertLatLngs(latlngs, true);
		this._poly.redraw();
		return removed;
	},

	_removeMarker: function (marker) {
		var i = marker._index;

		this._markerGroup.removeLayer(marker);
		this._markers.splice(i, 1);
		this._spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);

		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._fireEdit, this)
			.off('touchmove', this._onMarkerDrag, this)
			.off('touchend', this._fireEdit, this)
			.off('click', this._onMarkerClick, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('MSPointerUp', this._fireEdit, this);
	},

	_fireEdit: function () {
		this._poly.edited = true;
		this._poly.fire('edit');
		this._poly._map.fire(L.Draw.Event.EDITVERTEX, { layers: this._markerGroup, poly: this._poly });
	},

	_onMarkerDrag: function (e) {
		var marker = e.target;
		var poly = this._poly;

		L.extend(marker._origLatLng, marker._latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		if (poly.options.poly) {
			var tooltip = poly._map._editTooltip; // Access the tooltip

			// If we don't allow intersections and the polygon intersects
			if (!poly.options.poly.allowIntersection && poly.intersects()) {

				var originalColor = poly.options.color;
				poly.setStyle({ color: this.options.drawError.color });

				// Manually trigger 'dragend' behavior on marker we are about to remove
				// WORKAROUND: introduced in 1.0.0-rc2, may be related to #4484
				if (L.version.indexOf('0.7') !== 0) {
					marker.dragging._draggable._onUp(e);
				}
				this._onMarkerClick(e); // Remove violating marker
				// FIXME: Reset the marker to it's original position (instead of remove)

				if (tooltip) {
					tooltip.updateContent({
						text: L.drawLocal.draw.handlers.polyline.error
					});
				}

				// Reset everything back to normal after a second
				setTimeout(function () {
					poly.setStyle({ color: originalColor });
					if (tooltip) {
						tooltip.updateContent({
							text: L.drawLocal.edit.handlers.edit.tooltip.text,
							subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
						});
					}
				}, 1000);
			}
		}

		this._poly.redraw();
		this._poly.fire('editdrag');
	},

	_onMarkerClick: function (e) {

		var minPoints = L.Polygon && (this._poly instanceof L.Polygon) ? 4 : 3,
			marker = e.target;

		// If removing this point would create an invalid polyline/polygon don't remove
		if (this._defaultShape().length < minPoints) {
			return;
		}

		// remove the marker
		this._removeMarker(marker);

		// update prev/next links of adjacent markers
		this._updatePrevNext(marker._prev, marker._next);

		// remove ghost markers near the removed marker
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}

		// create a ghost marker in place of the removed one
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);

		} else if (!marker._prev) {
			marker._next._middleLeft = null;

		} else if (!marker._next) {
			marker._prev._middleRight = null;
		}

		this._fireEdit();
	},

	_onTouchMove: function (e) {

		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		L.extend(marker._origLatLng, latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		this._poly.redraw();
		this.updateMarkers();
	},

	_updateIndexes: function (index, delta) {
		this._markerGroup.eachLayer(function (marker) {
			if (marker._index > index) {
				marker._index += delta;
			}
		});
	},

	_createMiddleMarker: function (marker1, marker2) {
		var latlng = this._getMiddleLatLng(marker1, marker2),
			marker = this._createMarker(latlng),
			onClick,
			onDragStart,
			onDragEnd;

		marker.setOpacity(0.6);

		marker1._middleRight = marker2._middleLeft = marker;

		onDragStart = function () {
			marker.off('touchmove', onDragStart, this);
			var i = marker2._index;

			marker._index = i;

			marker
				.off('click', onClick, this)
				.on('click', this._onMarkerClick, this);

			latlng.lat = marker.getLatLng().lat;
			latlng.lng = marker.getLatLng().lng;
			this._spliceLatLngs(i, 0, latlng);
			this._markers.splice(i, 0, marker);

			marker.setOpacity(1);

			this._updateIndexes(i, 1);
			marker2._index++;
			this._updatePrevNext(marker1, marker);
			this._updatePrevNext(marker, marker2);

			this._poly.fire('editstart');
		};

		onDragEnd = function () {
			marker.off('dragstart', onDragStart, this);
			marker.off('dragend', onDragEnd, this);
			marker.off('touchmove', onDragStart, this);

			this._createMiddleMarker(marker1, marker);
			this._createMiddleMarker(marker, marker2);
		};

		onClick = function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._fireEdit();
		};

		marker
			.on('click', onClick, this)
			.on('dragstart', onDragStart, this)
			.on('dragend', onDragEnd, this)
			.on('touchmove', onDragStart, this);

		this._markerGroup.addLayer(marker);
	},

	_updatePrevNext: function (marker1, marker2) {
		if (marker1) {
			marker1._next = marker2;
		}
		if (marker2) {
			marker2._prev = marker1;
		}
	},

	_getMiddleLatLng: function (marker1, marker2) {
		var map = this._poly._map,
			p1 = map.project(marker1.getLatLng()),
			p2 = map.project(marker2.getLatLng());

		return map.unproject(p1._add(p2)._divideBy(2));
	}
});

L.Polyline.addInitHook(function () {

	// Check to see if handler has already been initialized. This is to support versions of Leaflet that still have L.Handler.PolyEdit
	if (this.editing) {
		return;
	}

	if (L.Edit.Poly) {

		this.editing = new L.Edit.Poly(this, this.options.poly);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});
/**
 * @class L.Edit.Rectangle
 * @aka Edit.Rectangle
 * @inherits L.Edit.SimpleShape
 */
L.Edit.Rectangle = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var bounds = this._shape.getBounds(),
			center = bounds.getCenter();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		var corners = this._getCorners();

		this._resizeMarkers = [];

		for (var i = 0, l = corners.length; i < l; i++) {
			this._resizeMarkers.push(this._createMarker(corners[i], this.options.resizeIcon));
			// Monkey in the corner index as we will need to know this for dragging
			this._resizeMarkers[i]._cornerIndex = i;
		}
	},

	_onMarkerDragStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		// Save a reference to the opposite point
		var corners = this._getCorners(),
			marker = e.target,
			currentCornerIndex = marker._cornerIndex;

		this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];

		this._toggleCornerMarkers(0, currentCornerIndex);
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target,
			bounds, center;

		// Reset move marker position to the center
		if (marker === this._moveMarker) {
			bounds = this._shape.getBounds();
			center = bounds.getCenter();

			marker.setLatLng(center);
		}

		this._toggleCornerMarkers(1);

		this._repositionCornerMarkers();

		L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, e);
	},

	_move: function (newCenter) {
		var latlngs = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs(),
			bounds = this._shape.getBounds(),
			center = bounds.getCenter(),
			offset, newLatLngs = [];

		// Offset the latlngs to the new center
		for (var i = 0, l = latlngs.length; i < l; i++) {
			offset = [latlngs[i].lat - center.lat, latlngs[i].lng - center.lng];
			newLatLngs.push([newCenter.lat + offset[0], newCenter.lng + offset[1]]);
		}

		this._shape.setLatLngs(newLatLngs);

		// Reposition the resize markers
		this._repositionCornerMarkers();

		this._map.fire(L.Draw.Event.EDITMOVE, { layer: this._shape });
	},

	_resize: function (latlng) {
		var bounds;

		// Update the shape based on the current position of this corner and the opposite point
		this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));

		// Reposition the move marker
		bounds = this._shape.getBounds();
		this._moveMarker.setLatLng(bounds.getCenter());

		this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape });
	},

	_getCorners: function () {
		var bounds = this._shape.getBounds(),
			nw = bounds.getNorthWest(),
			ne = bounds.getNorthEast(),
			se = bounds.getSouthEast(),
			sw = bounds.getSouthWest();

		return [nw, ne, se, sw];
	},

	_toggleCornerMarkers: function (opacity) {
		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setOpacity(opacity);
		}
	},

	_repositionCornerMarkers: function () {
		var corners = this._getCorners();

		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setLatLng(corners[i]);
		}
	}
});

L.Rectangle.addInitHook(function () {
	if (L.Edit.Rectangle) {
		this.editing = new L.Edit.Rectangle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});


/***/ }),
/* 48 */
/***/ (function(module, exports) {

L.Map.mergeOptions({
	touchExtend: true
});

/**
 * @class L.Map.TouchExtend
 * @aka TouchExtend
 */
L.Map.TouchExtend = L.Handler.extend({

	// @method initialize(): void
	// Sets TouchExtend private accessor variables
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	// @method addHooks(): void
	// Adds dom listener events to the map container
	addHooks: function () {
		L.DomEvent.on(this._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.on(this._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.on(this._container, 'touchmove', this._onTouchMove, this);
		if (this._detectIE()) {
			L.DomEvent.on(this._container, 'MSPointerDown', this._onTouchStart, this);
			L.DomEvent.on(this._container, 'MSPointerUp', this._onTouchEnd, this);
			L.DomEvent.on(this._container, 'MSPointerMove', this._onTouchMove, this);
			L.DomEvent.on(this._container, 'MSPointerCancel', this._onTouchCancel, this);

		} else {
			L.DomEvent.on(this._container, 'touchcancel', this._onTouchCancel, this);
			L.DomEvent.on(this._container, 'touchleave', this._onTouchLeave, this);
		}
	},

	// @method removeHooks(): void
	// Removes dom listener events from the map container
	removeHooks: function () {
		L.DomEvent.off(this._container, 'touchstart', this._onTouchStart);
		L.DomEvent.off(this._container, 'touchend', this._onTouchEnd);
		L.DomEvent.off(this._container, 'touchmove', this._onTouchMove);
		if (this._detectIE()) {
			L.DomEvent.off(this._container, 'MSPointerDowm', this._onTouchStart);
			L.DomEvent.off(this._container, 'MSPointerUp', this._onTouchEnd);
			L.DomEvent.off(this._container, 'MSPointerMove', this._onTouchMove);
			L.DomEvent.off(this._container, 'MSPointerCancel', this._onTouchCancel);
		} else {
			L.DomEvent.off(this._container, 'touchcancel', this._onTouchCancel);
			L.DomEvent.off(this._container, 'touchleave', this._onTouchLeave);
		}
	},

	_touchEvent: function (e, type) {
		// #TODO: fix the pageX error that is do a bug in Android where a single touch triggers two click events
		// _filterClick is what leaflet uses as a workaround.
		// This is a problem with more things than just android. Another problem is touchEnd has no touches in
		// its touch list.
		var touchEvent = {};
		if (typeof e.touches !== 'undefined') {
			if (!e.touches.length) {
				return;
			}
			touchEvent = e.touches[0];
		} else if (e.pointerType === 'touch') {
			touchEvent = e;
			if (!this._filterClick(e)) {
				return;
			}
		} else {
			return;
		}

		var containerPoint = this._map.mouseEventToContainerPoint(touchEvent),
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);

		this._map.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			pageX: touchEvent.pageX,
			pageY: touchEvent.pageY,
			originalEvent: e
		});
	},

	/** Borrowed from Leaflet and modified for bool ops **/
	_filterClick: function (e) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events
		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return false;
		}
		L.DomEvent._lastClick = timeStamp;
		return true;
	},

	_onTouchStart: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchstart';
		this._touchEvent(e, type);

	},

	_onTouchEnd: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchend';
		this._touchEvent(e, type);
	},

	_onTouchCancel: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchcancel';
		if (this._detectIE()) {
			type = 'pointercancel';
		}
		this._touchEvent(e, type);
	},

	_onTouchLeave: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchleave';
		this._touchEvent(e, type);
	},

	_onTouchMove: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchmove';
		this._touchEvent(e, type);
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});

L.Map.addInitHook('addHandler', 'touchExtend', L.Map.TouchExtend);


/**
 * @class L.Marker.Touch
 * @aka Marker.Touch
 *
 * This isn't full Touch support. This is just to get markers to also support dom touch events after creation
 * #TODO: find a better way of getting markers to support touch.
 */
L.Marker.Touch = L.Marker.extend({

	_initInteraction: function () {
		if (!this.addInteractiveTarget) {
			// 0.7.x support
			return this._initInteractionLegacy();
		}
		// TODO this may need be updated to re-add touch events for 1.0+
		return L.Marker.prototype._initInteraction.apply(this);
	},

	// This is an exact copy of https://github.com/Leaflet/Leaflet/blob/v0.7/src/layer/marker/Marker.js
	// with the addition of the touch events
	_initInteractionLegacy: function () {

		if (!this.options.clickable) {
			return;
		}

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
			events = ['dblclick',
					  'mousedown',
					  'mouseover',
					  'mouseout',
					  'contextmenu',
					  'touchstart',
					  'touchend',
					  'touchmove'];
		if (this._detectIE) {
			events.concat(['MSPointerDown',
						   'MSPointerUp',
						   'MSPointerMove',
						   'MSPointerCancel']);
		} else {
			events.concat(['touchcancel']);
		}

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});


/***/ }),
/* 49 */
/***/ (function(module, exports) {

(function() {
	/**
	 * @class L.LatLngUtil
	 * @aka LatLngUtil
	 */
	L.LatLngUtil = {
		// Clones a LatLngs[], returns [][]

		// @method cloneLatLngs(LatLngs[]): L.LatLngs[]
		// Clone the latLng point or points or nested points and return an array with those points
		cloneLatLngs: function (latlngs) {
			var clone = [];
			for (var i = 0, l = latlngs.length; i < l; i++) {
				// Check for nested array (Polyline/Polygon)
				if (Array.isArray(latlngs[i])) {
					clone.push(L.LatLngUtil.cloneLatLngs(latlngs[i]));
				} else {
					clone.push(this.cloneLatLng(latlngs[i]));
				}
			}
			return clone;
		},

		// @method cloneLatLng(LatLng): L.LatLng
		// Clone the latLng and return a new LatLng object.
		cloneLatLng: function (latlng) {
			return L.latLng(latlng.lat, latlng.lng);
		}
	};
	var defaultPrecision = {
		km: 2,
		ha: 2,
		m: 0,
		mi: 2,
		ac: 2,
		yd: 0,
		ft: 0,
		nm: 2
	};


	/**
	 * @class L.GeometryUtil
	 * @aka GeometryUtil
	 */
	L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
		// Ported from the OpenLayers implementation. See https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Geometry/LinearRing.js#L270

		// @method geodesicArea(): number
		geodesicArea: function (latLngs) {
			var pointsCount = latLngs.length,
				area = 0.0,
				d2r = Math.PI / 180,
				p1, p2;

			if (pointsCount > 2) {
				for (var i = 0; i < pointsCount; i++) {
					p1 = latLngs[i];
					p2 = latLngs[(i + 1) % pointsCount];
					area += ((p2.lng - p1.lng) * d2r) *
						(2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
				}
				area = area * 6378137.0 * 6378137.0 / 2.0;
			}

			return Math.abs(area);
		},

		// @method formattedNumber(n, precision): string
		// Returns n in specified number format (if defined) and precision
		formattedNumber: function (n, precision) {
			var formatted = parseFloat(n).toFixed(precision),
				format = L.drawLocal.format && L.drawLocal.format.numeric,
				delimiters = format && format.delimiters,
				thousands = delimiters && delimiters.thousands,
				decimal = delimiters && delimiters.decimal;

			if (thousands || decimal) {
				var splitValue = formatted.split('.');
				formatted = thousands ? splitValue[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands) : splitValue[0];
				decimal = decimal || '.';
				if (splitValue.length > 1) {
					formatted = formatted + decimal + splitValue[1];
				}
			}

			return formatted;
		},

		// @method readableArea(area, isMetric, precision): string
		// Returns a readable area string in yards or metric.
		// The value will be rounded as defined by the precision option object.
		readableArea: function (area, isMetric, precision) {
			var areaStr,
				units,
				precision = L.Util.extend({}, defaultPrecision, precision);

			if (isMetric) {
				units = ['ha', 'm'];
				type = typeof isMetric;
				if (type === 'string') {
					units = [isMetric];
				} else if (type !== 'boolean') {
					units = isMetric;
				}

				if (area >= 1000000 && units.indexOf('km') !== -1) {
					areaStr = L.GeometryUtil.formattedNumber(area * 0.000001, precision['km']) + ' km²';
				} else if (area >= 10000 && units.indexOf('ha') !== -1) {
					areaStr = L.GeometryUtil.formattedNumber(area * 0.0001, precision['ha']) + ' ha';
				} else {
					areaStr = L.GeometryUtil.formattedNumber(area, precision['m']) + ' m²';
				}
			} else {
				area /= 0.836127; // Square yards in 1 meter

				if (area >= 3097600) { //3097600 square yards in 1 square mile
					areaStr = L.GeometryUtil.formattedNumber(area / 3097600, precision['mi']) + ' mi²';
				} else if (area >= 4840) { //4840 square yards in 1 acre
					areaStr = L.GeometryUtil.formattedNumber(area / 4840, precision['ac']) + ' acres';
				} else {
					areaStr = L.GeometryUtil.formattedNumber(area, precision['yd']) + ' yd²';
				}
			}

			return areaStr;
		},

		// @method readableDistance(distance, units): string
		// Converts a metric distance to one of [ feet, nauticalMile, metric or yards ] string
		//
		// @alternative
		// @method readableDistance(distance, isMetric, useFeet, isNauticalMile, precision): string
		// Converts metric distance to distance string.
		// The value will be rounded as defined by the precision option object.
		readableDistance: function (distance, isMetric, isFeet, isNauticalMile, precision) {
			var distanceStr,
				units,
				precision = L.Util.extend({}, defaultPrecision, precision);

			if (isMetric) {
				units = typeof isMetric == 'string' ? isMetric : 'metric';
			} else if (isFeet) {
				units = 'feet';
			} else if (isNauticalMile) {
				units = 'nauticalMile';
			} else {
				units = 'yards';
			}

			switch (units) {
				case 'metric':
					// show metres when distance is < 1km, then show km
					if (distance > 1000) {
						distanceStr = L.GeometryUtil.formattedNumber(distance / 1000, precision['km']) + ' km';
					} else {
						distanceStr = L.GeometryUtil.formattedNumber(distance, precision['m']) + ' m';
					}
					break;
				case 'feet':
					distance *= 1.09361 * 3;
					distanceStr = L.GeometryUtil.formattedNumber(distance, precision['ft']) + ' ft';

					break;
				case 'nauticalMile':
					distance *= 0.53996;
					distanceStr = L.GeometryUtil.formattedNumber(distance / 1000, precision['nm']) + ' nm';
					break;
				case 'yards':
				default:
					distance *= 1.09361;

					if (distance > 1760) {
						distanceStr = L.GeometryUtil.formattedNumber(distance / 1760, precision['mi']) + ' miles';
					} else {
						distanceStr = L.GeometryUtil.formattedNumber(distance, precision['yd']) + ' yd';
					}
					break;
			}
			return distanceStr;
		},

		// @method isVersion07x(): boolean
		// Returns true if the Leaflet version is 0.7.x, false otherwise.
		isVersion07x: function(){
			var version = L.version.split(".");
			//If Version is == 0.7.*
			return parseInt(version[0], 10) === 0 && parseInt(version[1], 10) === 7;
		},
	});

})();


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * @class L.LineUtil
 * @aka Util
 * @aka L.Utils
 */
L.Util.extend(L.LineUtil, {

	// @method segmentsIntersect(): boolean
	// Checks to see if two line segments intersect. Does not handle degenerate cases.
	// http://compgeom.cs.uiuc.edu/~jeffe/teaching/373/notes/x06-sweepline.pdf
	segmentsIntersect: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2, /*Point*/ p3) {
		return this._checkCounterclockwise(p, p2, p3) !==
			   this._checkCounterclockwise(p1, p2, p3) &&
			   this._checkCounterclockwise(p, p1, p2) !==
			   this._checkCounterclockwise(p, p1, p3);
	},

	// check to see if points are in counterclockwise order
	_checkCounterclockwise: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return (p2.y - p.y) * (p1.x - p.x) > (p1.y - p.y) * (p2.x - p.x);
	}
});
/**
 * @class L.Polyline
 * @aka Polyline
 */
L.Polyline.include({

	// @method intersects(): boolean
	// Check to see if this polyline has any linesegments that intersect.
	// NOTE: does not support detecting intersection for degenerate cases.
	intersects: function () {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0,
			i, p, p1;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		for (i = len - 1; i >= 3; i--) {
			p = points[i - 1];
			p1 = points[i];


			if (this._lineSegmentsIntersectsRange(p, p1, i - 2)) {
				return true;
			}
		}

		return false;
	},

	// @method newLatLngIntersects(): boolean
	// Check for intersection if new latlng was added to this polyline.
	// NOTE: does not support detecting intersection for degenerate cases.
	newLatLngIntersects: function (latlng, skipFirst) {
		// Cannot check a polyline for intersecting lats/lngs when not added to the map
		if (!this._map) {
			return false;
		}

		return this.newPointIntersects(this._map.latLngToLayerPoint(latlng), skipFirst);
	},

	// @method newPointIntersects(): boolean
	// Check for intersection if new point was added to this polyline.
	// newPoint must be a layer point.
	// NOTE: does not support detecting intersection for degenerate cases.
	newPointIntersects: function (newPoint, skipFirst) {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0,
			lastPoint = points ? points[len - 1] : null,
		// The previous previous line segment. Previous line segment doesn't need testing.
			maxIndex = len - 2;

		if (this._tooFewPointsForIntersection(1)) {
			return false;
		}

		return this._lineSegmentsIntersectsRange(lastPoint, newPoint, maxIndex, skipFirst ? 1 : 0);
	},

	// Polylines with 2 sides can only intersect in cases where points are collinear (we don't support detecting these).
	// Cannot have intersection when < 3 line segments (< 4 points)
	_tooFewPointsForIntersection: function (extraPoints) {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0;
		// Increment length by extraPoints if present
		len += extraPoints || 0;

		return !points || len <= 3;
	},

	// Checks a line segment intersections with any line segments before its predecessor.
	// Don't need to check the predecessor as will never intersect.
	_lineSegmentsIntersectsRange: function (p, p1, maxIndex, minIndex) {
		var points = this._getProjectedPoints(),
			p2, p3;

		minIndex = minIndex || 0;

		// Check all previous line segments (beside the immediately previous) for intersections
		for (var j = maxIndex; j > minIndex; j--) {
			p2 = points[j - 1];
			p3 = points[j];

			if (L.LineUtil.segmentsIntersect(p, p1, p2, p3)) {
				return true;
			}
		}

		return false;
	},

	_getProjectedPoints: function () {
		if (!this._defaultShape) {
			return this._originalPoints;
		}
		var points = [],
			_shape = this._defaultShape();

		for (var i = 0; i < _shape.length; i++) {
			points.push(this._map.latLngToLayerPoint(_shape[i]));
		}
		return points;
	}
});
/**
 * @class L.Polygon
 * @aka Polygon
 */
L.Polygon.include({

	// @method intersects(): boolean
	// Checks a polygon for any intersecting line segments. Ignores holes.
	intersects: function () {
		var polylineIntersects,
			points = this._getProjectedPoints(),
			len, firstPoint, lastPoint, maxIndex;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		polylineIntersects = L.Polyline.prototype.intersects.call(this);

		// If already found an intersection don't need to check for any more.
		if (polylineIntersects) {
			return true;
		}

		len = points.length;
		firstPoint = points[0];
		lastPoint = points[len - 1];
		maxIndex = len - 2;

		// Check the line segment between last and first point. Don't need to check the first line segment (minIndex = 1)
		return this._lineSegmentsIntersectsRange(lastPoint, firstPoint, maxIndex, 1);
	}
});


/***/ }),
/* 51 */
/***/ (function(module, exports) {

/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: editable
 * @prject:
 * @description: 说明文件的功能--请后续修改
 * @author: huangge
 * @date: 2017/9/27
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */
L.EditToolbar = L.Class.extend({
	statics: {
		TYPE: 'edit'
	},

	options: {
		edit: {
			selectedPathOptions: {
				dashArray: '20, 10',
				fill: true,
				color: '#ff0000',
				fillColor: '#ffffff',
				fillOpacity: 0.5,
				maintainColor: false
			}
		},
		remove: {},
		poly: null,
		featureGroup: null
	},

	includes: L.Mixin.Events,

	initialize: function (options) {
		if (options.edit) {
			if (typeof options.edit.selectedPathOptions === 'undefined') {
				options.edit.selectedPathOptions = this.options.edit.selectedPathOptions;
			}
			options.edit.selectedPathOptions = L.extend({}, this.options.edit.selectedPathOptions, options.edit.selectedPathOptions);
		}

		if (options.remove) {
			options.remove = L.extend({}, this.options.remove, options.remove);
		}

		if (options.poly) {
			options.poly = L.extend({}, this.options.poly, options.poly);
		}
		L.setOptions(this, options);
	},

	_getModeHandlers: function (map) {
		var featureGroup = this.options.featureGroup;
		var editHandler = this._editHandler =
			[{
				enabled: this.options.edit,
				handler: new L.EditToolbar.Edit(map, {
					featureGroup: featureGroup,
					selectedPathOptions: this.options.edit.selectedPathOptions,
					poly: this.options.poly
				}),
			},
				{
					enabled: this.options.remove,
					handler: new L.EditToolbar.Delete(map, {
						featureGroup: featureGroup
					}),
				}
			];
		return editHandler;
	},

	editGraphic: function(map){
		if(this._editHandler){
			this._editHandler[1].handler.disable();
			this._editHandler[0].handler.enable();
		}else{
			var edit = this._getModeHandlers(map);
			edit[0].handler.enable();
		}
	},

	saveGraphic: function(){
		if(this._editHandler){
			this._editHandler[0].handler.disable();
		}
	},

	resetLayer: function(){
		if(this._editHandler){
			this._editHandler[0].handler.revertLayers();
		}
	},

	deleteGraphic: function(map){
		if(this._editHandler){
			this._editHandler[0].handler.disable();
			this._editHandler[1].handler.enable();

		}else{
			var edit = this._getModeHandlers(map);
			edit[1].handler.enable();
		}
	},

	saveDelete: function(){
		if(this._editHandler){
			this._editHandler[1].handler.disable();
		}
	},

	resetDelete: function(){
		if(this._editHandler){
			this._editHandler[1].handler.revertLayers();
		}
	},
});

/***/ }),
/* 52 */
/***/ (function(module, exports) {

L.EditToolbar.Edit = L.Handler.extend({
	statics: {
		TYPE: 'edit'
	},

	includes: L.Mixin.Events,

	// @method intialize(): void
	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._featureGroup = options.featureGroup;

		if (!(this._featureGroup instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		this._uneditedLayerProps = {};

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Edit.TYPE;
	},

	// @method enable(): void
	// Enable the edit toolbar
	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', { handler: this.type });
		//this disable other handlers

		this._map.fire(L.Draw.Event.EDITSTART, { handler: this.type });
		//allow drawLayer to be updated before beginning edition.

		L.Handler.prototype.enable.call(this);
		this._featureGroup
			.on('layeradd', this._enableLayerEdit, this)
			.on('layerremove', this._disableLayerEdit, this);
	},

	// @method disable(): void
	// Disable the edit toolbar
	disable: function () {
		if (!this._enabled) {
			return;
		}
		this._featureGroup
			.off('layeradd', this._enableLayerEdit, this)
			.off('layerremove', this._disableLayerEdit, this);
		L.Handler.prototype.disable.call(this);
		this._map.fire(L.Draw.Event.EDITSTOP, { handler: this.type });
		this.fire('disabled', { handler: this.type });
	},

	// @method addHooks(): void
	// Add listener hooks for this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._featureGroup.eachLayer(this._enableLayerEdit, this);

		}
	},

	// @method removeHooks(): void
	// Remove listener hooks for this handler
	removeHooks: function () {
		if (this._map) {
			// Clean up selected layers.
			this._featureGroup.eachLayer(this._disableLayerEdit, this);

			// Clear the backups of the original layers
			this._uneditedLayerProps = {};

		}
	},

	// @method revertLayers(): void
	// Revert each layer's geometry changes
	revertLayers: function () {
		if (!this.enabled()) {
			return;
		}
		this._featureGroup.eachLayer(function (layer) {
			this._revertLayer(layer);
		}, this);
		this.disable();
	},

	// @method save(): void
	// Save the layer geometries
	save: function () {
		var editedLayers = new L.LayerGroup();
		this._featureGroup.eachLayer(function (layer) {
			if (layer.edited) {
				editedLayers.addLayer(layer);
				layer.edited = false;
			}
		});
		this._map.fire(L.Draw.Event.EDITED, { layers: editedLayers });
	},

	_backupLayer: function (layer) {
		var id = L.Util.stamp(layer);

		if (!this._uneditedLayerProps[id]) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				this._uneditedLayerProps[id] = {
					latlngs: L.LatLngUtil.cloneLatLngs(layer.getLatLngs())
				};
			} else if (layer instanceof L.Circle) {
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng()),
					radius: layer.getRadius()
				};
			} else if (layer instanceof L.Marker || layer instanceof L.CircleMarker) { // Marker
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng())
				};
			}
		}
	},

	_revertLayer: function (layer) {
		var id = L.Util.stamp(layer);
		layer.edited = false;
		if (this._uneditedLayerProps.hasOwnProperty(id)) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				layer.setLatLngs(this._uneditedLayerProps[id].latlngs);
			} else if (layer instanceof L.Circle) {
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
				layer.setRadius(this._uneditedLayerProps[id].radius);
			} else if (layer instanceof L.Marker || layer instanceof L.CircleMarker) { // Marker or CircleMarker
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
			}

			layer.fire('revert-edited', { layer: layer });
		}
	},

	_enableLayerEdit: function (e) {
		var layer = e.layer || e.target || e,
			pathOptions, poly;

		// Back up this layer (if haven't before)
		this._backupLayer(layer);

		if (this.options.poly) {
			poly = L.Util.extend({}, this.options.poly);
			layer.options.poly = poly;
		}

		// Set different style for editing mode
		if (this.options.selectedPathOptions) {
			pathOptions = L.Util.extend({}, this.options.selectedPathOptions);

			// Use the existing color of the layer
			if (pathOptions.maintainColor) {
				pathOptions.color = layer.options.color;
				pathOptions.fillColor = layer.options.fillColor;
			}

			layer.options.original = L.extend({}, layer.options);
			layer.options.editing = pathOptions;

		}

		if (layer instanceof L.Marker) {
			if (layer.editing) {
				layer.editing.enable();
			}
			layer.dragging.enable();
			layer
				.on('dragend', this._onMarkerDragEnd)
				// #TODO: remove when leaflet finally fixes their draggable so it's touch friendly again.
				.on('touchmove', this._onTouchMove, this)
				.on('MSPointerMove', this._onTouchMove, this)
				.on('touchend', this._onMarkerDragEnd, this)
				.on('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.enable();
		}
	},

	_disableLayerEdit: function (e) {
		var layer = e.layer || e.target || e;

		layer.edited = false;
		if (layer.editing) {
			layer.editing.disable();
		}

		delete layer.options.editing;
		delete layer.options.original;
		// Reset layer styles to that of before select
		if (this._selectedPathOptions) {
			if (layer instanceof L.Marker) {
				this._toggleMarkerHighlight(layer);
			} else {
				// reset the layer style to what is was before being selected
				layer.setStyle(layer.options.previousOptions);
				// remove the cached options for the layer object
				delete layer.options.previousOptions;
			}
		}

		if (layer instanceof L.Marker) {
			layer.dragging.disable();
			layer
				.off('dragend', this._onMarkerDragEnd, this)
				.off('touchmove', this._onTouchMove, this)
				.off('MSPointerMove', this._onTouchMove, this)
				.off('touchend', this._onMarkerDragEnd, this)
				.off('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.disable();
		}
	},

	_onMarkerDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
		this._map.fire(L.Draw.Event.EDITMOVE, { layer: layer });
	},

	_onTouchMove: function (e) {
		var touchEvent = e.originalEvent.changedTouches[0],
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);
		e.target.setLatLng(latlng);
	},

	_hasAvailableLayers: function () {
		return this._featureGroup.getLayers().length !== 0;
	}
});


/***/ }),
/* 53 */
/***/ (function(module, exports) {

L.EditToolbar.Delete = L.Handler.extend({
	statics: {
		TYPE: 'remove' // not delete as delete is reserved in js
	},

	includes: L.Mixin.Events,

	// @method intialize(): void
	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.Util.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._deletableLayers = this.options.featureGroup;

		if (!(this._deletableLayers instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Delete.TYPE;
	},

	// @method enable(): void
	// Enable the delete toolbar
	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', { handler: this.type });

		this._map.fire(L.Draw.Event.DELETESTART, { handler: this.type });

		L.Handler.prototype.enable.call(this);

		this._deletableLayers
			.on('layeradd', this._enableLayerDelete, this)
			.on('layerremove', this._disableLayerDelete, this);
	},

	// @method disable(): void
	// Disable the delete toolbar
	disable: function () {
		if (!this._enabled) {
			return;
		}

		this._deletableLayers
			.off('layeradd', this._enableLayerDelete, this)
			.off('layerremove', this._disableLayerDelete, this);

		L.Handler.prototype.disable.call(this);

		this._map.fire(L.Draw.Event.DELETESTOP, { handler: this.type });

		this.fire('disabled', { handler: this.type });
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._deletableLayers.eachLayer(this._enableLayerDelete, this);
			this._deletedLayers = new L.LayerGroup();
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		if (this._map) {
			this._deletableLayers.eachLayer(this._disableLayerDelete, this);
			this._deletedLayers = null;
		}
	},

	// @method revertLayers(): void
	// Revert the deleted layers back to their prior state.
	revertLayers: function () {
		if (!this.enabled()) {
			return;
		}
		// Iterate of the deleted layers and add them back into the featureGroup
		this._deletedLayers.eachLayer(function (layer) {
			this._deletableLayers.addLayer(layer);
			layer.fire('revert-deleted', { layer: layer });
		}, this);
		this.disable();
	},

	// @method save(): void
	// Save deleted layers
	save: function () {
		this._map.fire(L.Draw.Event.DELETED, { layers: this._deletedLayers });
	},

	// @method removeAllLayers(): void
	// Remove all delateable layers
	removeAllLayers: function(){
		// Iterate of the delateable layers and add remove them
		this._deletableLayers.eachLayer(function (layer) {
			this._removeLayer({layer:layer});
		}, this);
		this.save();
	},

	_enableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.on('click', this._removeLayer, this);
	},

	_disableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.off('click', this._removeLayer, this);

		// Remove from the deleted layers so we can't accidentally revert if the user presses cancel
		this._deletedLayers.removeLayer(layer);
	},

	_removeLayer: function (e) {
		var layer = e.layer || e.target || e;

		this._deletableLayers.removeLayer(layer);

		this._deletedLayers.addLayer(layer);

		layer.fire('deleted');
	},

	_hasAvailableLayers: function () {
		return this._deletableLayers.getLayers().length !== 0;
	}
});


/***/ }),
/* 54 */
/***/ (function(module, exports) {

(function(factory) {
    window.L.control.iconLayers = factory(window.L);
    window.L.Control.IconLayers = window.L.control.iconLayers.Constructor;
})(function(L) {
    function each(obj, cb) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                cb(obj[p], p, obj);
            }
        }
    }

    function find(ar, cb) {
        if (ar.length) {
            for (var i = 0; i < ar.length; i++) {
                if (cb(ar[i])) {
                    return ar[i];
                }
            }
        } else {
            for (var p in ar) {
                if (ar.hasOwnProperty(p) && cb(ar[p])) {
                    return ar[p];
                }
            }
        }
    }

    function first(obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                return obj[p];
            }
        }
    }

    function culLength(obj) {
        var length = 0;
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                length++;
            }
        }
        return length;
    }

    //确定要添加节点的位置
    function prepend(parent, el) {
        if (parent.children.length) {
            parent.insertBefore(el, parent.children[0]);
        } else {
            parent.appendChild(el);
        }
    }

    var IconLayers = L.Control.extend({
        options: {
            position: 'bottomright',
            behavior: 'previous', // may be 'previous', 'expanded' or 'first'
            expand: 'horizontal', // or 'vertical'
            autoZIndex: true, // from L.Control.Layers
            maxLayersInRow: 10,
            manageLayers: true,
            setServerUrl: false,//使用使用本地图片还是服务地图作为小图片；true(使用服务图片)，false(使用本地图片)。
            tileX: 0,
            tileY: 0,
            tileZ: 1,
        },

        initialize: function(layers, options) {
            if (!L.Util.isArray(arguments[0])) {
                options = layers;
                layers = [];
            }
            L.setOptions(this, options);
            this._expandDirection = (this.options.position.indexOf('left') != -1) ? 'right' : 'left';
            if (this.options.manageLayers) {
                this.on('activelayerchange', this._switchMapLayers, this);
            }
            this.setLayers(layers);
        },

        includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'leaflet-iconLayers');
            L.DomUtil.addClass(this._container, 'leaflet-iconLayers_' + this.options.position);
            this._render();
            map.on('click', this.collapse, this);
            if (this.options.manageLayers) {
                this._switchMapLayers();
            }
            return this._container;
        },

        onRemove: function(map) {
            map.off('click', this.collapse, this);
        },

        //返回当前的图层对象
        _getActiveLayer: function() {
            if (this._activeLayerId) {
                return this._layers[this._activeLayerId];
            } else if (culLength(this._layers)) {
                return first(this._layers);
            } else {
                return null;
            }
        },
        //返回下一个图层对象
        _getPreviousLayer: function() {
            var activeLayer = this._getActiveLayer();
            if (!activeLayer) {
                return null;
            } else if (this._previousLayerId) {
                return this._layers[this._previousLayerId];
            } else {
                return find(this._layers, function(layer) {
                    return layer.id !== activeLayer.id;
                }.bind(this)) || null;
            }
        },
        //返回不是当前也不是下一个的所有图层
        _getInactiveLayers: function() {
            var ar = [];
            var activeLayerId = this._getActiveLayer() ? this._getActiveLayer().id : null;
            var previousLayerId = this._getPreviousLayer() ? this._getPreviousLayer().id : null;
            each(this._layers, function(layer) {
                if ((layer.id !== activeLayerId) && (layer.id !== previousLayerId)) {
                    ar.push(layer);
                }
            });
            return ar;
        },
        //重新整理图层
        _arrangeLayers: function() {
            var behaviors = {};
            behaviors.previous = function() {
                var layers = this._getInactiveLayers();
                if (this._getActiveLayer()) {
                    //向layers添加新的图层
                    layers.push(this._getActiveLayer());
                }
                if (this._getPreviousLayer()) {
                    layers.push(this._getPreviousLayer());
                }
                layers.sort(this._compare('id'));
                return layers;
            };
            return behaviors[this.options.behavior].apply(this, arguments);
        },

        //图层排序
        _compare: function(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },

        //根据图层的id找到控件里面对应的小图片dom
        _getLayerCellByLayerId: function(id) {
            var els = this._container.getElementsByClassName('leaflet-iconLayers-layerCell');
            for (var i = 0; i < els.length; i++) {
                if (els[i].getAttribute('data-layerid') == id) {
                    return els[i];
                }
            }
        },
        //创建控件里面的子节点
        _createLayerElement: function(layerObj) {
            var el = L.DomUtil.create('div', 'leaflet-iconLayers-layer');
            if (layerObj.title) {
                var titleContainerEl = L.DomUtil.create('div', 'leaflet-iconLayers-layerTitleContainer');
                var titleEl = L.DomUtil.create('div', 'leaflet-iconLayers-layerTitle');
                var checkIconEl = L.DomUtil.create('div', 'leaflet-iconLayers-layerCheckIcon');
                titleEl.innerHTML = layerObj.title;
                titleContainerEl.appendChild(titleEl);
                el.appendChild(titleContainerEl);
                el.appendChild(checkIconEl);
            }
            if(this.options.setServerUrl){
                var layer = layerObj.layer;
                var coords = {x: this.options.tileX, y: this.options.tileY};
                var url = L.Util.template(layer._url, L.extend({
                    s: layer._getSubdomain(coords),
                    x: coords.x,
                    y: layer.options.tms ? layer._globalTileRange.max.y - coords.y : coords.y,
                    z: this.options.tileZ
                }, layer.options));
                if (layer instanceof L.TileLayer.WMS) {
                    layer._map = map;
                    var crs = layer.options.crs || map.options.crs;
                    var wmsParams = L.extend({}, layer.wmsParams);
                    var wmsVersion = parseFloat(wmsParams.version);
                    var projectionKey = wmsVersion >= 1.3 ? 'crs' : 'srs';
                    wmsParams[projectionKey] = crs.code;

                    var tileBounds = map.getBounds();
                    var nw = crs.project(tileBounds.getNorthWest());
                    var se = crs.project(tileBounds.getSouthEast());
                    var bbox = (wmsVersion >= 1.3 && crs === EPSG4326 ? [se.y, nw.x, nw.y, se.x] : [nw.x, se.y, se.x, nw.y]).join(',');

                    url += L.Util.getParamString(wmsParams, url, layer.options.uppercase) +
                        (layer.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
                    el.setAttribute('style', 'background-image: url(\'' + url + '\')');
                }else{
                    if (layerObj.icon) {
                        el.setAttribute('style', 'background-image: url(\'' + layerObj.icon + '\')');
                    }
                }
            }else{
                if (layerObj.icon) {
                    el.setAttribute('style', 'background-image: url(\'' + layerObj.icon + '\')');
                }
            }
            return el;
        },
        //创建控件里面的父节点
        _createLayerElements: function() {
            var currentRow, layerCell;
            var layers = this._arrangeLayers();
            var activeLayerId = this._getActiveLayer() && this._getActiveLayer().id;

            for (var i = 0; i < layers.length; i++) {
                if (i % this.options.maxLayersInRow === 0) {
                    currentRow = L.DomUtil.create('div', 'leaflet-iconLayers-layersRow');
                    if (this.options.position.indexOf('bottom') === -1) {
                        this._container.appendChild(currentRow);
                    } else {
                        prepend(this._container, currentRow);
                    }
                }
                layerCell = L.DomUtil.create('div', 'leaflet-iconLayers-layerCell');
                layerCell.setAttribute('data-layerid', layers[i].id);
                if (i !== 0) {
                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_hidden');
                }
                if (layers[i].id === activeLayerId) {
                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_active');
                }
                if (this._expandDirection === 'left') {
                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_expandLeft');
                } else if(this._expandDirection === 'right') {
                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_expandRight');
                }
                layerCell.appendChild(this._createLayerElement(layers[i]));

                if (this.options.position.indexOf('right') === -1) {
                    currentRow.appendChild(layerCell);
                } else {
                    prepend(currentRow, layerCell);
                }
            }
        },

        //小图片的点击事件
        _onLayerClick: function(e) {
            e.stopPropagation();
            var layerId = e.currentTarget.getAttribute('data-layerid');
            var layer = this._layers[layerId];
            this.setActiveLayer(layer.layer);
            this.expand();
        },

        //鼠标移入小图片的事件
        _attachEvents: function() {
            each(this._layers, function(l) {
                var e = this._getLayerCellByLayerId(l.id);
                if (e) {
                    e.addEventListener('click', this._onLayerClick.bind(this));
                }
            }.bind(this));
            var layersRowCollection = this._container.getElementsByClassName('leaflet-iconLayers-layersRow');

            var onMouseEnter = function(e) {
                e.stopPropagation();
                this.expand();
            }.bind(this);

            var onMouseLeave = function(e) {
                e.stopPropagation();
                this.collapse();
            }.bind(this);

            var stopPropagation = function(e) {
                e.stopPropagation();
            };

            for (var i = 0; i < layersRowCollection.length; i++) {
                var el = layersRowCollection[i];
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
                el.addEventListener('mousemove', stopPropagation);
            }
        },

        //创建图层小图片，并添加事件
        _render: function() {
            this._container.innerHTML = '';
            this._createLayerElements();
            this._attachEvents();
        },

        //替换点击图层
        _switchMapLayers: function() {
            if (!this._map) {
                return;
            }
            var activeLayer = this._getActiveLayer();
            each(this._layers, function(layerObject) {
                var layer = layerObject.layer;
                this._map.removeLayer(layer);
            }.bind(this));
            if (activeLayer) {
                this._map.addLayer(activeLayer.layer);
            }
        },

        //给每个图层添加id的选项并重新渲染
        setLayers: function(layers) {
            this._layers = {};
            layers.map(function(layer) {
                var id = L.stamp(layer.layer);
                this._layers[id] = L.extend(layer, {
                    id: id
                });
            }.bind(this));
            if (this._container) {
                this._render();
            }
        },

        //设置当前点击图层
        setActiveLayer: function(layer) {
            var l = layer && this._layers[L.stamp(layer)];
            if (!l || l.id === this._activeLayerId) {
                return;
            }
            this._previousLayerId = this._activeLayerId;
            this._activeLayerId = l.id;
            if (this._container) {
                this._render();
            }
            this.fire('activelayerchange', {
                layer: layer
            });
        },

        //鼠标移入dom
        expand: function() {
            this._arrangeLayers().slice(1).map(function(l) {
                var el = this._getLayerCellByLayerId(l.id);
                L.DomUtil.removeClass(el, 'leaflet-iconLayers-layerCell_hidden');
            }.bind(this));
        },

        //鼠标移出dom
        collapse: function() {
            this._arrangeLayers().slice(1).map(function(l) {
                var el = this._getLayerCellByLayerId(l.id);
                L.DomUtil.addClass(el, 'leaflet-iconLayers-layerCell_hidden');
            }.bind(this));
        }
    });

    var iconLayers = function(layers, options) {
        return new IconLayers(layers, options);
    };

    iconLayers.Constructor = IconLayers;

    return iconLayers;
});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

/*
* L.NonTiledLayer is an addon for leaflet which renders dynamic image overlays
*/

L.NonTiledLayer = (L.Layer || L.Class).extend({
    includes: L.Evented || L.Mixin.Events,

    emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAHAAACH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==', //1px transparent GIF

    options: {
        attribution: '',
        opacity: 1.0,
        zIndex: undefined,
        minZoom: 0,
        maxZoom: 18,
        pointerEvents: null,
        errorImageUrl: 'data:image/gif;base64,R0lGODlhAQABAHAAACH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==', //1px transparent GIF
        bounds: L.latLngBounds([-85.05, -180], [85.05, 180]),
        useCanvas: undefined,
        visible: true
    },

    key: '',

    // override this method in the inherited class
    //getImageUrl: function (bounds, width, height) {},
    //getImageUrlAsync: function (bounds, width, height, f) {},

    initialize: function (options) {
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;

        // don't animate on browsers without hardware-accelerated transitions or old Android/Opera
        if (typeof this._zoomAnimated == 'undefined') // Leaflet 0.7
            this._zoomAnimated = L.DomUtil.TRANSITION && L.Browser.any3d && !L.Browser.mobileOpera && this._map.options.zoomAnimation;

        if (L.version < '1.0') this._map.on(this.getEvents(), this);
        if (!this._div) {
            this._div = L.DomUtil.create('div', 'leaflet-image-layer');
            if (this.options.pointerEvents) {
                this._div.style['pointer-events'] = this.options.pointerEvents;
            }
            if (typeof this.options.zIndex !== 'undefined') {
                this._div.style.zIndex = this.options.zIndex;
            }
            if (typeof this.options.opacity !== 'undefined') {
                this._div.style.opacity = this.options.opacity;
            }
            if (!this.options.visible) {
                this._div.style.display = 'none';
            } else {
                this._div.style.display = 'block';
            }
        }

        this.getPane().appendChild(this._div);

        var canvasSupported = !!window.HTMLCanvasElement;
        if (typeof this.options.useCanvas === 'undefined') {
            this._useCanvas = canvasSupported;
        } else {
            this._useCanvas = this.options.useCanvas;
        }

        if (this._useCanvas) {
            this._bufferCanvas = this._initCanvas();
            this._currentCanvas = this._initCanvas();
        }
        else {
            this._bufferImage = this._initImage();
            this._currentImage = this._initImage();
        }

        this._update();
    },

    getPane: function () {
        if (L.Layer) {
            return L.Layer.prototype.getPane.call(this);
        }
        if (this.options.pane) {
            this._pane = this.options.pane;
        }
        else {
            this._pane = this._map.getPanes().overlayPane;
        }
        return this._pane;
    },

    onRemove: function (map) {
        if (L.version < '1.0') this._map.off(this.getEvents(), this);

        this.getPane().removeChild(this._div);

        if (this._useCanvas) {
            this._div.removeChild(this._bufferCanvas);
            this._div.removeChild(this._currentCanvas);
        }
        else {
            this._div.removeChild(this._bufferImage);
            this._div.removeChild(this._currentImage);
        }
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    _setZoom: function () {
        if (this._useCanvas) {
            if (this._currentCanvas._bounds)
                this._resetImageScale(this._currentCanvas, true);
            if (this._bufferCanvas._bounds)
                this._resetImageScale(this._bufferCanvas);
        }
        else {
            if (this._currentImage._bounds)
                this._resetImageScale(this._currentImage, true);
            if (this._bufferImage._bounds)
                this._resetImageScale(this._bufferImage);
        }
    },

    getEvents: function () {
        var events = {
            moveend: this._update
        };

        if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
        }

        // fix: no zoomanim for pinch with Leaflet 1.0!
        if (L.version >= '1.0') {
            events.zoom = this._setZoom;
        }

        return events;
    },

    getElement: function () {
        return this._div;
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        if (this._div) {
            L.DomUtil.setOpacity(this._div, this.options.opacity);
        }
        return this;
    },

    setZIndex: function (zIndex) {
        if (zIndex) {
            this.options.zIndex = zIndex;
            if (this._div) {
                this._div.style.zIndex = zIndex;
            }
        }
        return this;
    },

    setVisible: function (visible) {
        if (!visible) {
            this._div.style.display = 'none';
            this.options.visible = visible;
        } else {
            this._div.style.display = 'block';
            this.options.visible = visible;
        }
    },

    // TODO remove bringToFront/bringToBack duplication from TileLayer/Path
    bringToFront: function () {
        if (this._div) {
            this.getPane().appendChild(this._div);
        }
        return this;
    },

    bringToBack: function () {
        if (this._div) {
            this.getPane().insertBefore(this._div, this.getPane().firstChild);
        }
        return this;
    },

    getAttribution: function () {
        return this.options.attribution;
    },

    _initCanvas: function () {
        var _canvas = L.DomUtil.create('canvas', 'leaflet-image-layer');

        this._div.appendChild(_canvas);
        _canvas._image = new Image();
        this._ctx = _canvas.getContext('2d');

        if (this._map.options.zoomAnimation && L.Browser.any3d) {
            L.DomUtil.addClass(_canvas, 'leaflet-zoom-animated');
        } else {
            L.DomUtil.addClass(_canvas, 'leaflet-zoom-hide');
        }

        L.extend(_canvas._image, {
            onload: L.bind(this._onImageLoad, this),
            onerror: L.bind(this._onImageError, this)
        });

        return _canvas;
    },

    _initImage: function () {
        var _image = L.DomUtil.create('img', 'leaflet-image-layer');
        this._div.appendChild(_image);

        if (this._map.options.zoomAnimation && L.Browser.any3d) {
            L.DomUtil.addClass(_image, 'leaflet-zoom-animated');
        } else {
            L.DomUtil.addClass(_image, 'leaflet-zoom-hide');
        }


        //TODO createImage util method to remove duplication
        L.extend(_image, {
            galleryimg: 'no',
            onselectstart: L.Util.falseFn,
            onmousemove: L.Util.falseFn,
            onload: L.bind(this._onImageLoad, this),
            onerror: L.bind(this._onImageError, this)
        });

        return _image;
    },

    redraw: function () {
        if (this._map) {
            this._update();
        }
        return this;
    },

    _animateZoom: function (e) {
        if (this._useCanvas) {
            if (this._currentCanvas._bounds)
                this._animateImage(this._currentCanvas, e);
            if (this._bufferCanvas._bounds)
                this._animateImage(this._bufferCanvas, e);
        }
        else {
            if (this._currentImage._bounds)
                this._animateImage(this._currentImage, e);
            if (this._bufferImage._bounds)
                this._animateImage(this._bufferImage, e);
        }
    },

    _animateImage: function (image, e) {
        if (L.version < '1.0') {  // Leaflet 0.7
            var map = this._map,
                scale = image._scale * map.getZoomScale(e.zoom),
                nw = image._bounds.getNorthWest(),
                se = image._bounds.getSouthEast(),

                topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
                size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
                origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));

            image.style[L.DomUtil.TRANSFORM] =
                L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
        } else {
            var map = this._map,
                scale = image._scale * image._sscale * map.getZoomScale(e.zoom),
                nw = image._bounds.getNorthWest(),
                se = image._bounds.getSouthEast(),

                topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center);

            L.DomUtil.setTransform(image, topLeft, scale);
        }

        image._lastScale = scale;
    },

    _resetImageScale: function (image, resetTransform) {
        var bounds = new L.Bounds(
            this._map.latLngToLayerPoint(image._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(image._bounds.getSouthEast())),
            orgSize = image._orgBounds.getSize().y,
            scaledSize = bounds.getSize().y;

        var scale = scaledSize / orgSize;
        image._sscale = scale;

        L.DomUtil.setTransform(image, bounds.min, scale);
    },

    _resetImage: function (image) {
        var bounds = new L.Bounds(
            this._map.latLngToLayerPoint(image._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(image._bounds.getSouthEast())),
            size = bounds.getSize();

        L.DomUtil.setPosition(image, bounds.min);

        image._orgBounds = bounds;
        image._sscale = 1;

        if (this._useCanvas) {
            image.width = size.x;
            image.height = size.y;

        } else {
            image.style.width = size.x + 'px';
            image.style.height = size.y + 'px';
        }
    },

    _getClippedBounds: function () {
        var wgsBounds = this._map.getBounds();

        // truncate bounds to valid wgs bounds
        var mSouth = wgsBounds.getSouth();
        var mNorth = wgsBounds.getNorth();
        var mWest = wgsBounds.getWest();
        var mEast = wgsBounds.getEast();

        var lSouth = this.options.bounds.getSouth();
        var lNorth = this.options.bounds.getNorth();
        var lWest = this.options.bounds.getWest();
        var lEast = this.options.bounds.getEast();

        //mWest = (mWest + 180) % 360 - 180;
        if (mSouth < lSouth) mSouth = lSouth;
        if (mNorth > lNorth) mNorth = lNorth;
        if (mWest < lWest) mWest = lWest;
        if (mEast > lEast) mEast = lEast;

        var world1 = new L.LatLng(mNorth, mWest);
        var world2 = new L.LatLng(mSouth, mEast);

        return new L.LatLngBounds(world1, world2);
    },

    _update: function () {
        var bounds = this._getClippedBounds();

        // re-project to corresponding pixel bounds
        var pix1 = this._map.latLngToContainerPoint(bounds.getNorthWest());
        var pix2 = this._map.latLngToContainerPoint(bounds.getSouthEast());

        // get pixel size
        var width = pix2.x - pix1.x;
        var height = pix2.y - pix1.y;

        var i;
        if (this._useCanvas) {
            // set scales for zoom animation
            this._bufferCanvas._scale = this._bufferCanvas._lastScale;
            this._currentCanvas._scale = this._currentCanvas._lastScale = 1;
            this._bufferCanvas._sscale = 1;

            this._currentCanvas._bounds = bounds;

            this._resetImage(this._currentCanvas);

            i = this._currentCanvas._image;

            L.DomUtil.setOpacity(i, 0);
        } else {
            // set scales for zoom animation
            this._bufferImage._scale = this._bufferImage._lastScale;
            this._currentImage._scale = this._currentImage._lastScale = 1;
            this._bufferImage._sscale = 1;

            this._currentImage._bounds = bounds;

            this._resetImage(this._currentImage);

            i = this._currentImage;

            L.DomUtil.setOpacity(i, 0);
        }

        if (this._map.getZoom() < this.options.minZoom ||
            this._map.getZoom() > this.options.maxZoom ||
            width < 32 || height < 32) {
            this._div.style.visibility = 'hidden';
            i.src = this.emptyImageUrl;
            this.key = i.key = '<empty>';
            i.tag = null;
            return;
        }

        // create a key identifying the current request
        this.key = '' + bounds.getNorthWest() + ', ' + bounds.getSouthEast() + ', ' + width + ', ' + height;

        if (this.getImageUrl) {
            //i.src = this.getImageUrl(bounds, width, height);
            //i.key = this.key;
            if (this.options != undefined && this.options.setImageUrl != undefined) {
                this.options.setImageUrl(i, this.getImageUrl(bounds, width, height), this.key);
            } else {
                this.setImageUrl(i, this.getImageUrl(bounds, width, height), this.key);
            }
        }
        else {
            this.getImageUrlAsync(bounds, width, height, this.key, function (key, url, tag) {
                i.key = key;
                i.src = url;
                i.tag = tag;
            });
        }
    },
    setImageUrl: function (img, url, key) {
        img.src = url;
        img.key = this.key;
    },
    _onImageError: function (e) {
        this.fire('error', e);
        L.DomUtil.addClass(e.target, 'invalid');
        if (e.target.src !== this.options.errorImageUrl) { // prevent error loop if error image is not valid
            e.target.src = this.options.errorImageUrl;
        }
    },
    _onImageLoad: function (e) {
        if (e.target.src !== this.options.errorImageUrl) {
            L.DomUtil.removeClass(e.target, 'invalid');
            if (!e.target.key || e.target.key !== this.key) { // obsolete / outdated image
                return;
            }
        }
        this._onImageDone(e);

        this.fire('load', e);
    },
    _onImageDone: function (e) {
        if (this._useCanvas) {
            this._renderCanvas(e);
        } else {
            L.DomUtil.setOpacity(this._currentImage, 1);
            L.DomUtil.setOpacity(this._bufferImage, 0);

            if (this._addInteraction && this._currentImage.tag)
                this._addInteraction(this._currentImage.tag);

            var tmp = this._bufferImage;
            this._bufferImage = this._currentImage;
            this._currentImage = tmp;
        }

        if (e.target.key !== '<empty>')
            this._div.style.visibility = 'visible';
    },
    _renderCanvas: function (e) {
        var ctx = this._currentCanvas.getContext('2d');

        ctx.drawImage(this._currentCanvas._image, 0, 0);

        L.DomUtil.setOpacity(this._currentCanvas, 1);
        L.DomUtil.setOpacity(this._bufferCanvas, 0);

        if (this._addInteraction && this._currentCanvas._image.tag)
            this._addInteraction(this._currentCanvas._image.tag);

        var tmp = this._bufferCanvas;
        this._bufferCanvas = this._currentCanvas;
        this._currentCanvas = tmp;
    }

});

L.nonTiledLayer = function () {
    return new L.NonTiledLayer();
};

L.NonTiledLayer.WMS = L.NonTiledLayer.extend({

    defaultWmsParams: {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.1',
        layers: '',
        styles: '',
        format: 'image/jpeg',
        transparent: false
    },

    options: {
        crs: null,
        uppercase: false
    },

    initialize: function (url, options) { // (String, Object)
        this._wmsUrl = url;

        var wmsParams = L.extend({}, this.defaultWmsParams);

        // all keys that are not NonTiledLayer options go to WMS params
        for (var i in options) {
            if (!L.NonTiledLayer.prototype.options.hasOwnProperty(i) && !(L.Layer && L.Layer.prototype.options.hasOwnProperty(i))) {
                wmsParams[i] = options[i];
            }
        }

        this.wmsParams = wmsParams;

        L.setOptions(this, options);
    },

    onAdd: function (map) {

        this._crs = this.options.crs || map.options.crs;
        this._wmsVersion = parseFloat(this.wmsParams.version);

        var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = this._crs.code;

        L.NonTiledLayer.prototype.onAdd.call(this, map);
    },

    getImageUrl: function (bounds, width, height) {
        var wmsParams = this.wmsParams;
        wmsParams.width = width;
        wmsParams.height = height;

        var nw = this._crs.project(bounds.getNorthWest());
        var se = this._crs.project(bounds.getSouthEast());

        var url = this._wmsUrl;

        var bbox = bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
            [se.y, nw.x, nw.y, se.x] :
            [nw.x, se.y, se.x, nw.y]).join(',');

        return url +
            L.Util.getParamString(this.wmsParams, url, this.options.uppercase) +
            (this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
    },

    setParams: function (params, noRedraw) {

        L.extend(this.wmsParams, params);

        if (!noRedraw) {
            this.redraw();
        }

        return this;
    },
    refresh: function () {
        this.setParams({ rlt: Math.random() }, false);
    }
});

L.nonTiledLayer.wms = function (url, options) {
    return new L.NonTiledLayer.WMS(url, options);
};

/***/ })
/******/ ]);
});
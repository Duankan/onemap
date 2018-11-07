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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

//require('./ktw.highgis/leaflet0.7.7/leaflet.css');
//require('./ktw.highgis/map/control/compass/leaflet-compass.css');
//require('./ktw.highgis/map/control/map-tooltip/tooltip.css');
//require('./ktw.highgis/map/control/mini-map/Control.MiniMap.css');
//require('./ktw.highgis/map/control/navbar/Leaflet.NavBar.css');
//require('./ktw.highgis/map/control/navControl/navControl.css');
//require('./ktw.highgis/map/layer/scatter/visualMap.css');
//require('./ktw.highgis/map/layer/markerCluster/MarkerCluster.css');
//require('./ktw.highgis/map/control/graphicEdit/leaflet.draw.css');
//require('./ktw.highgis/map/layer/iconLayers/iconLayers.css');

//require('./ktw.highgis/leaflet0.7.7/leaflet-src.js');
//require('./ktw.highgis/map/layer/wms/ktw.highgis.wms.js');
//require('./ktw.highgis/map/util/X2JS.js');
//require('./ktw.highgis/map/query/ajaxLeaflet.js');
//require('./ktw.highgis/map/control/compass/leaflet-compass.js');
//require('./ktw.highgis/map/control/map-tooltip/tooltip.js');
//require('./ktw.highgis/map/control/mini-map/Control.MiniMap.js');
//require('./ktw.highgis/map/control/navbar/Leaflet.NavBar.js');
//require('./ktw.highgis/map/control/navbar/scrillayer.js');
//require('./ktw.highgis/map/control/navbar/multiScreen.js');
//require('./ktw.highgis/map/control/navbar/leaflet-side-by-side.js');
//require('./ktw.highgis/map/control/navbar/leaflet-measure-path.js');
//require('./ktw.highgis/map/control/measureMap/measureMap.js');
//require('./ktw.highgis/map/control/navControl/navControl.js');
//require('./ktw.highgis/map/layer/heatmap/heartLayer.js');
//require('./ktw.highgis/map/layer/scatter/scatter.js');
//require('./ktw.highgis/map/layer/wmts/leaflet-tilelayer-wmts-src.js');
//require('./ktw.highgis/map/layer/wmts/leaflet-tilelayer-wmts-cache.js');
//require('./ktw.highgis/leaflet0.7.7/leaflet-tilelayer-wmts-src.js');
//require('./ktw.highgis/map/layer/kml/leaflet-kml.js');
//require('./ktw.highgis/map/layer/esri/Util.js');
//require('./ktw.highgis/map/layer/esri/Request.js');
//require('./ktw.highgis/map/layer/esri/Service.js');
//require('./ktw.highgis/map/layer/esri/MapService.js');
//require('./ktw.highgis/map/layer/esri/RasterLayer.js');
//require('./ktw.highgis/map/layer/esri/TiledMapLayer.js');
//require('./ktw.highgis/map/layer/esri/EsriTileInfo.js');
//const EsriLeaflet = require('./ktw.highgis/map/layer/esri/DynamicMapLayer.js');
//const Wkt = require('./ktw.highgis/map/layer/wkx/wicket-leaflet.js');
//require('./ktw.highgis/map/query/query.js');
//require('./ktw.highgis/map/layer/markerCluster/leaflet.markercluster-src.js');
//require('./ktw.highgis/map/control/graphicEdit/Leaflet.Draw.Event.js');
//require('./ktw.highgis/map/control/graphicEdit/edit/Edit.SimpleShape.js');
//require('./ktw.highgis/map/control/graphicEdit/ext/TouchEvents.js');
//require('./ktw.highgis/map/control/graphicEdit/ext/GeometryUtil.js');
//require('./ktw.highgis/map/control/graphicEdit/ext/GraphicUtil.Intersect.js');
//require('./ktw.highgis/map/control/graphicEdit/Editable.js');
//require('./ktw.highgis/map/control/graphicEdit/edit/EditToolbar.Edit.js');
//require('./ktw.highgis/map/control/graphicEdit/edit/EditToolbar.Delete.js');
//require('./ktw.highgis/map/layer/iconLayers/iconLayers.js');
//require('./ktw.highgis/map/layer/wms/NonTiledLayer.js');

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
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


//module.exports = {
//	EsriLeaflet:EsriLeaflet,
//	Wkt: Wkt,
//};



/***/ }),
/* 2 */
/***/ (function(module, exports) {

//==========================================================extend-start======================================================
L.obj = {
    assign : (typeof Object.assign === 'function') ? Object.assign : function(target, var_sources) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var i = 1, ii = arguments.length; i < ii; ++i) {
        var source = arguments[i];
        if (source !== undefined && source !== null) {
          for (var key in source) {
            if (source.hasOwnProperty(key)) {
              output[key] = source[key];
            }
          }
        }
      }
      return output;
    },


    /**
     * Removes all properties from an object.
     * @param {Object} object The object to clear.
     */
    clear : function(object) {
      for (var property in object) {
        delete object[property];
      }
    },


    /**
     * Get an array of property values from an object.
     * @param {Object<K,V>} object The object from which to get the values.
     * @return {!Array<V>} The property values.
     * @template K,V
     */
    getValues : function(object) {
      var values = [];
      for (var property in object) {
        values.push(object[property]);
      }
      return values;
    },


    /**
     * Determine if an object has any properties.
     * @param {Object} object The object to check.
     * @return {boolean} The object is empty.
     */
    isEmpty : function(object) {
      var property;
      for (property in object) {
        return false;
      }
      return !property;
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

L.Math = {
    clamp:function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },


    /**
     * Return the hyperbolic cosine of a given number. The method will use the
     * native `Math.cosh` function if it is available, otherwise the hyperbolic
     * cosine will be calculated via the reference implementation of the Mozilla
     * developer network.
     *
     * @param {number} x X.
     * @return {number} Hyperbolic cosine of x.
     */
    cosh :(function() {
      // Wrapped in a iife, to save the overhead of checking for the native
      // implementation on every invocation.
      var cosh;
      if ('cosh' in Math) {
        // The environment supports the native Math.cosh function, use it…
        cosh = Math.cosh;
      } else {
        // … else, use the reference implementation of MDN:
        cosh = function(x) {
          var y = Math.exp(x);
          return (y + 1 / y) / 2;
        };
      }
      return cosh;
    }()),


    /**
     * @param {number} x X.
     * @return {number} The smallest power of two greater than or equal to x.
     */
    roundUpToPowerOfTwo:function(x) {
      ol.asserts.assert(0 < x, 29); // `x` must be greater than `0`
      return Math.pow(2, Math.ceil(Math.log(x) / Math.LN2));
    },


    /**
     * Returns the square of the closest distance between the point (x, y) and the
     * line segment (x1, y1) to (x2, y2).
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} x1 X1.
     * @param {number} y1 Y1.
     * @param {number} x2 X2.
     * @param {number} y2 Y2.
     * @return {number} Squared distance.
     */
    squaredSegmentDistance : function(x, y, x1, y1, x2, y2) {
      var dx = x2 - x1;
      var dy = y2 - y1;
      if (dx !== 0 || dy !== 0) {
        var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
          x1 = x2;
          y1 = y2;
        } else if (t > 0) {
          x1 += dx * t;
          y1 += dy * t;
        }
      }
      return ol.math.squaredDistance(x, y, x1, y1);
    },


    /**
     * Returns the square of the distance between the points (x1, y1) and (x2, y2).
     * @param {number} x1 X1.
     * @param {number} y1 Y1.
     * @param {number} x2 X2.
     * @param {number} y2 Y2.
     * @return {number} Squared distance.
     */
    squaredDistance : function(x1, y1, x2, y2) {
      var dx = x2 - x1;
      var dy = y2 - y1;
      return dx * dx + dy * dy;
    },


    /**
     * Solves system of linear equations using Gaussian elimination method.
     *
     * @param {Array.<Array.<number>>} mat Augmented matrix (n x n + 1 column)
     *                                     in row-major order.
     * @return {Array.<number>} The resulting vector.
     */
    solveLinearSystem :function(mat) {
      var n = mat.length;

      for (var i = 0; i < n; i++) {
        // Find max in the i-th column (ignoring i - 1 first rows)
        var maxRow = i;
        var maxEl = Math.abs(mat[i][i]);
        for (var r = i + 1; r < n; r++) {
          var absValue = Math.abs(mat[r][i]);
          if (absValue > maxEl) {
            maxEl = absValue;
            maxRow = r;
          }
        }

        if (maxEl === 0) {
          return null; // matrix is singular
        }

        // Swap max row with i-th (current) row
        var tmp = mat[maxRow];
        mat[maxRow] = mat[i];
        mat[i] = tmp;

        // Subtract the i-th row to make all the remaining rows 0 in the i-th column
        for (var j = i + 1; j < n; j++) {
          var coef = -mat[j][i] / mat[i][i];
          for (var k = i; k < n + 1; k++) {
            if (i == k) {
              mat[j][k] = 0;
            } else {
              mat[j][k] += coef * mat[i][k];
            }
          }
        }
      }

      // Solve Ax=b for upper triangular matrix A (mat)
      var x = new Array(n);
      for (var l = n - 1; l >= 0; l--) {
        x[l] = mat[l][n] / mat[l][l];
        for (var m = l - 1; m >= 0; m--) {
          mat[m][n] -= mat[m][l] * x[l];
        }
      }
      return x;
    },


    /**
     * Converts radians to to degrees.
     *
     * @param {number} angleInRadians Angle in radians.
     * @return {number} Angle in degrees.
     */
    toDegrees : function(angleInRadians) {
      return angleInRadians * 180 / Math.PI;
    },


    /**
     * Converts degrees to radians.
     *
     * @param {number} angleInDegrees Angle in degrees.
     * @return {number} Angle in radians.
     */
    toRadians : function(angleInDegrees) {
      return angleInDegrees * Math.PI / 180;
    },

    /**
     * Returns the modulo of a / b, depending on the sign of b.
     *
     * @param {number} a Dividend.
     * @param {number} b Divisor.
     * @return {number} Modulo.
     */
    modulo : function(a, b) {
      var r = a % b;
      return r * b < 0 ? r + b : r;
    },

    /**
     * Calculates the linearly interpolated value of x between a and b.
     *
     * @param {number} a Number
     * @param {number} b Number
     * @param {number} x Value to be interpolated.
     * @return {number} Interpolated value.
     */
    lerp : function(a, b, x) {
      return a + x * (b - a);
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

L.Util.extend(L.Util,{
    isNull: function (item) {
        return item === undefined || item === null || item === "";
    },
    isString: function (item) {
        return !this.isNull(item) && typeof item === "string";
    },
    /*功能：验证整数*/
    isInt: function (str) {
        var reg = /^(-|\+)?\d+$/;
        return reg.test(str);
    },
    isNumber: function (item) {
        return !this.isNull(item) &&
            typeof item === "number"
            && !isNaN(item) && isFinite(item);
    },
    isBoolean: function (item) {
        return !this.isNull(item) && typeof item === "boolean";
    },

    isObject: function (item) {
        return !this.isNull(item) && typeof item == "object";
    },
    newGuid: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                guid += "-";
            }
        }
        return guid;
    },
    toJSON: function (object, exclude, splitor, containQuot) {
        if (object == null)
            return null;
        var type = typeof object;
        var results, value;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
            case 'function':
                return;
            case 'boolean':
            case 'regexp':
                return object.toString();
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
            case 'string':
                if (containQuot || containQuot == undefined) {
                    return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
                        var a = arguments[0];
                        return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "";
                    }) + '"';
                }
                else {
                    return object;
                }
            case 'object':
                results = [];
                for (var property in object) {
                    if (exclude != undefined | exclude != null) {
                        //if ($.inArray(property, exclude) > -1)
                        if (exclude.indexOf(property) > -1)
                            continue;
                    }
                    value = L.Util.toJSON(object[property], exclude, null, containQuot);
                    if (value !== undefined) results.push(L.Util.toJSON(property, null, null, containQuot) + ':' + value);
                }
                if (splitor != undefined) {
                    return '{' + results.join(splitor) + '}';
                }
                else {
                    return '{' + results.join(',') + '}';
                }
            case 'array':
                results = [];
                for (var i = 0; i < object.length; i++) {
                    value = L.Util.toJSON(object[i], exclude, null, containQuot);
                    if (value !== undefined) {
                        if (value == null) {
                            value = 'null';
                        }
                        results.push(value);
                    }
                }
                return '[' + results.join(',') + ']';
        }
    },
    boundingExtent: function(coordinates) {
      var extent = [Infinity, Infinity, -Infinity, -Infinity] ;
      for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        this.extendCoordinate(extent, coordinates[i]);
      }
      return extent;
    },
    extendCoordinate : function(extent, coordinate) {
      if (coordinate[0] < extent[0]) {
        extent[0] = coordinate[0];
      }
      if (coordinate[0] > extent[2]) {
        extent[2] = coordinate[0];
      }
      if (coordinate[1] < extent[1]) {
        extent[1] = coordinate[1];
      }
      if (coordinate[1] > extent[3]) {
        extent[3] = coordinate[1];
      }
    },
    /**
     * Appends query parameters to a URI.
     *
     * @param {string} uri The original URI, which may already have query data.
     * @param {!Object} params An object where keys are URI-encoded parameter keys,
     *     and the values are arbitrary types or arrays.
     * @return {string} The new URI.
     */
    appendUrlParams : function(uri, params) {
      var keyParams = [];
      // Skip any null or undefined parameter values
      Object.keys(params).forEach(function(k) {
        if (params[k] !== null && params[k] !== undefined) {
          keyParams.push(k + '=' + encodeURIComponent(params[k]));
        }
      });
      var qs = keyParams.join('&');
      // remove any trailing ? or &
      uri = uri.replace(/[?&]$/, '');
      // append ? or & depending on whether uri has existing parameters
      uri = uri.indexOf('?') === -1 ? uri + '?' : uri + '&';
      return uri + qs;
    },
  /*    处理json为字符串，用&隔开*/
    getPostParams: function (data) {
      var arr = [];
      for (var param in data) {
          var val = data[param];
          if (L.Util.isArray(val) || L.Util.isObject(val)) {
              val = JSON.stringify(data[param]);
          }
          arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(val));

      }
      return arr.join('&');

      //        var arr = [];
      //        for (var param in data) {
      //            arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
      //        };
      return arr.join('&');
  }
});
L.Util.Array = {
    /**
     * @param {Array.<VALUE>} arr  The array to search in.
     * @param {function(VALUE, number, ?) : boolean} func The function to compare.
     * @template VALUE
     * @return {VALUE} The element found.
     */
    find:function(arr, func) {
      var length = arr.length >>> 0;
      var value;
      for (var i = 0; i < length; i++) {
        value = arr[i];
        if (func(value, i, arr)) {
          return value;
        }
      }
      return null;
  },
  /**
  * Whether the array contains the given object.
  * @param {Array.<*>} arr The array to test for the presence of the element.
  * @param {*} obj The object for which to test.
  * @return {boolean} The object is in the array.
  */
    includes : function(arr, obj) {
        return arr.indexOf(obj) >= 0;
    },
    /**
    * @param {Array.<VALUE>} arr  The array to modify.
    * @param {VALUE} obj The element to remove.
    * @template VALUE
    * @return {boolean} If the element was removed.
    */
    remove : function(arr, obj) {
      var i = arr.indexOf(obj);
      var found = i > -1;
      if (found) {
        arr.splice(i, 1);
      }
      return found;
  },
  /**
  * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
  * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
  * @return {boolean} Whether the two arrays are equal.
  */
    equals : function(arr1, arr2) {
      var len1 = arr1.length;
      if (len1 !== arr2.length) {
        return false;
      }
      for (var i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    },
      /**
      * @param {Array.<*>} arr The array to search in.
      * @param {Function} func Comparison function.
      * @return {number} Return index.
      */
    findIndex : function(arr, func) {
      var index;
      var found = !arr.every(function(el, idx) {
        index = idx;
        return !func(el, idx, arr);
      });
      return found ? index : -1;
  },
  /**
  * @param {Array.<number>} arr Array.
  * @param {number} target Target.
  * @param {number} direction 0 means return the nearest, > 0
  *    means return the largest nearest, < 0 means return the
  *    smallest nearest.
  * @return {number} Index.
  */
    linearFindNearest : function(arr, target, direction) {
      var n = arr.length;
      if (arr[0] <= target) {
        return 0;
      } else if (target <= arr[n - 1]) {
        return n - 1;
      } else {
        var i;
        if (direction > 0) {
          for (i = 1; i < n; ++i) {
            if (arr[i] < target) {
              return i - 1;
            }
          }
        } else if (direction < 0) {
          for (i = 1; i < n; ++i) {
            if (arr[i] <= target) {
              return i;
            }
          }
        } else {
          for (i = 1; i < n; ++i) {
            if (arr[i] == target) {
              return i;
            } else if (arr[i] < target) {
              if (arr[i - 1] - target < target - arr[i]) {
                return i - 1;
              } else {
                return i;
              }
            }
          }
        }
        return n - 1;
      }
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

L.Projection.Units = {
    DEGREES: 'degrees',
    FEET: 'ft',
    METERS: 'm',
    PIXELS: 'pixels',
    TILE_PIXELS: 'tile-pixels',
    USFEET: 'us-ft'
};

L.Projection.Units.METERS_PER_UNIT = {};
// use the radius of the Normal sphere
L.Projection.Units.METERS_PER_UNIT[L.Projection.Units.DEGREES] = 2 * Math.PI * 6370997 / 360;
L.Projection.Units.METERS_PER_UNIT[L.Projection.Units.FEET] = 0.3048;
L.Projection.Units.METERS_PER_UNIT[L.Projection.Units.METERS] = 1;
L.Projection.Units.METERS_PER_UNIT[L.Projection.Units.USFEET] = 1200 / 3937;

L.Projection.Extend = {
    //参数1：destinationCode目的投影
    //参数2：sourceCode源投影
    transform: function (sourceCode, destinationCode, coordinates) {
        var desCoordinates = null;
        if (typeof proj4 != 'function') {
            throw "未引入proj4的相应库";
        }
        if (proj4.defs[sourceCode] === undefined) {
            throw 'No projection definition for code ' + sourceCode;
        }
        if (proj4.defs[destinationCode] === undefined) {
            throw 'No projection definition for code ' + destinationCode;
        }
        var transformsfun = proj4(sourceCode, destinationCode)["forward"];
        desCoordinates = this.coordinateTransform(transformsfun, coordinates, undefined, 2);
        return desCoordinates;
    },

    coordinateTransform: function (transform, input, opt_output, opt_dimension) {
        var length = input.length;
        var dimension = opt_dimension !== undefined ? opt_dimension : 2;
        var output = opt_output !== undefined ? opt_output : new Array(length);
        var point, i, j;
        for (i = 0; i < length; i += dimension) {
            point = transform([input[i], input[i + 1]]);
            output[i] = point[0];
            output[i + 1] = point[1];
            for (j = dimension - 1; j >= 2; --j) {
                output[i + j] = input[i + j];
            }
        }
        return output;
    },
    boundingExtentXYs_: function (xs, ys) {
        var minX = Math.min.apply(null, xs);
        var minY = Math.min.apply(null, ys);
        var maxX = Math.max.apply(null, xs);
        var maxY = Math.max.apply(null, ys);
        return [minX, minY, maxX, maxY];
    },

    transformExtent: function (sourceCode, destinationCode, extent) {
        var coordinates = [
            extent[0], extent[1],
            extent[0], extent[3],
            extent[2], extent[1],
            extent[2], extent[3]
          ];
        if (typeof proj4 != 'function') {
            throw "未引入proj4的相应库";
        }
        if (proj4.defs[sourceCode] === undefined) {
            throw 'No projection definition for code ' + sourceCode;
        }
        if (proj4.defs[destinationCode] === undefined) {
            throw 'No projection definition for code ' + destinationCode;
        }
        var transformsfun = proj4(sourceCode, destinationCode)["forward"];
        this.coordinateTransform(transformsfun, coordinates, coordinates, 2);
        var xs = [coordinates[0], coordinates[2], coordinates[4], coordinates[6]];
        var ys = [coordinates[1], coordinates[3], coordinates[5], coordinates[7]];
        return this.boundingExtentXYs_(xs, ys);
    },
    getMetersPerUnit: function (crs) {
        var unit = null;
        var metersPerUnit_ = null;
        if (!L.Util.isNull(crs.projection._proj.oProj.to_meter)) {
            metersPerUnit_ = crs.projection._proj.oProj.to_meter;
        }
        if (!L.Util.isNull(crs.projection._proj.oProj.units)) {
            unit = crs.projection._proj.oProj.units;
        }
        if (L.Util.isNull(unit) && L.Util.isNull(metersPerUnit_)) {
            unit = L.Projection.Units.DEGREES;
        }
        if (crs.code.toUpperCase() === "EPSG:4326") {
            metersPerUnit_ = 111319.49079327358;
        }
        return metersPerUnit_ || L.Projection.Units.METERS_PER_UNIT[unit];
    },
    getAxisOrientation: function (crs) {
        var axis = "enu";
        if (L.Util.isNull(crs.projection._proj.oProj.axis)) {
            axis = crs.projection._proj.oProj.axis;
        }
        if (crs.code.toUpperCase() === "EPSG:4326") {
            axis = "neu";
        }
        return axis;
    },
    setCRSParam: function (crs) {
        if (typeof proj4 != 'function') {
            throw "未引入proj4的相应库";
        }
        var def = proj4.defs(crs.code);
        if (def !== undefined) {
            if (def.axis !== undefined && options.axisOrientation === undefined) {
                crs.axisOrientation_ = def.axis;
            }
            if (options.metersPerUnit === undefined) {
                crs.metersPerUnit_ = def.to_meter;
            }
            if (options.units === undefined) {
                crs.units_ = def.units;
            }
        }
        return crs;
    }


}

//L.proj.extend = L.Proj.Extend;


L.CRS.BDCRS =L.extend({}, L.CRS.EPSG3857,{
    code: 'bd',
    scale: function scale(zoom) {
        return 6378137 * Math.PI * 2 / Math.pow(2, 18 - zoom);
    },

    transformation: function () {
        var scale = 0.5 / (Math.PI * 6378137);
        return new L.Transformation(scale, 0, -scale, 0);
    } ()
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

L.xml={};
/**
 * This document should be used when creating nodes for XML serializations. This
 * document is also used by {@link L.xml.createElementNS} and
 * {@link L.xml.setAttributeNS}
 * @const
 * @type {Document}
 */
L.xml.DOCUMENT = document.implementation.createDocument('', '', null);


/**
 * @param {string} namespaceURI Namespace URI.
 * @param {string} qualifiedName Qualified name.
 * @return {Node} Node.
 */
L.xml.createElementNS = function(namespaceURI, qualifiedName) {
  return L.xml.DOCUMENT.createElementNS(namespaceURI, qualifiedName);
};


/**
 * Recursively grab all text content of child nodes into a single string.
 * @param {Node} node Node.
 * @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
 * breaks.
 * @return {string} All text content.
 * @api
 */
L.xml.getAllTextContent = function(node, normalizeWhitespace) {
  return L.xml.getAllTextContent_(node, normalizeWhitespace, []).join('');
};


/**
 * Recursively grab all text content of child nodes into a single string.
 * @param {Node} node Node.
 * @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
 * breaks.
 * @param {Array.<string>} accumulator Accumulator.
 * @private
 * @return {Array.<string>} Accumulator.
 */
L.xml.getAllTextContent_ = function(node, normalizeWhitespace, accumulator) {
  if (node.nodeType == Node.CDATA_SECTION_NODE ||
      node.nodeType == Node.TEXT_NODE) {
    if (normalizeWhitespace) {
      accumulator.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ''));
    } else {
      accumulator.push(node.nodeValue);
    }
  } else {
    var n;
    for (n = node.firstChild; n; n = n.nextSibling) {
      L.xml.getAllTextContent_(n, normalizeWhitespace, accumulator);
    }
  }
  return accumulator;
};


/**
 * @param {?} value Value.
 * @return {boolean} Is document.
 */
L.xml.isDocument = function(value) {
  return value instanceof Document;
};


/**
 * @param {?} value Value.
 * @return {boolean} Is node.
 */
L.xml.isNode = function(value) {
  return value instanceof Node;
};


/**
 * @param {Node} node Node.
 * @param {?string} namespaceURI Namespace URI.
 * @param {string} name Attribute name.
 * @return {string} Value
 */
L.xml.getAttributeNS = function(node, namespaceURI, name) {
  return node.getAttributeNS(namespaceURI, name) || '';
};


/**
 * @param {Node} node Node.
 * @param {?string} namespaceURI Namespace URI.
 * @param {string} name Attribute name.
 * @param {string|number} value Value.
 */
L.xml.setAttributeNS = function(node, namespaceURI, name, value) {
  node.setAttributeNS(namespaceURI, name, value);
};


/**
 * Parse an XML string to an XML Document.
 * @param {string} xml XML.
 * @return {Document} Document.
 * @api
 */
L.xml.parse = function(xml) {
  return new DOMParser().parseFromString(xml, 'application/xml');
};


/**
 * Make an array extender function for extending the array at the top of the
 * object stack.
 * @param {function(this: T, Node, Array.<*>): (Array.<*>|undefined)}
 *     valueReader Value reader.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {L.xmlParser} Parser.
 * @template T
 */
L.xml.makeArrayExtender = function(valueReader, opt_this) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array.<*>} objectStack Object stack.
     */
    function(node, objectStack) {
      var value = valueReader.call(opt_this, node, objectStack);
      if (value !== undefined) {
        var array = /** @type {Array.<*>} */
              (objectStack[objectStack.length - 1]);
        ol.array.extend(array, value);
      }
    });
};


/**
 * Make an array pusher function for pushing to the array at the top of the
 * object stack.
 * @param {function(this: T, Node, Array.<*>): *} valueReader Value reader.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {L.xmlParser} Parser.
 * @template T
 */
L.xml.makeArrayPusher = function(valueReader, opt_this) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array.<*>} objectStack Object stack.
     */
    function(node, objectStack) {
      var value = valueReader.call(opt_this !== undefined ? opt_this : this,
          node, objectStack);
      if (value !== undefined) {
        var array = objectStack[objectStack.length - 1];
        array.push(value);
      }
    });
};


/**
 * Make an object stack replacer function for replacing the object at the
 * top of the stack.
 * @param {function(this: T, Node, Array.<*>): *} valueReader Value reader.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {L.xmlParser} Parser.
 * @template T
 */
L.xml.makeReplacer = function(valueReader, opt_this) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array.<*>} objectStack Object stack.
     */
    function(node, objectStack) {
      var value = valueReader.call(opt_this !== undefined ? opt_this : this,
          node, objectStack);
      if (value !== undefined) {
        objectStack[objectStack.length - 1] = value;
      }
    });
};


/**
 * Make an object property pusher function for adding a property to the
 * object at the top of the stack.
 * @param {function(this: T, Node, Array.<*>): *} valueReader Value reader.
 * @param {string=} opt_property Property.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {L.xmlParser} Parser.
 * @template T
 */
L.xml.makeObjectPropertyPusher = function(valueReader, opt_property, opt_this) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array.<*>} objectStack Object stack.
     */
    function(node, objectStack) {
      var value = valueReader.call(opt_this !== undefined ? opt_this : this,
          node, objectStack);
      if (value !== undefined) {
        var object = /** @type {Object} */
              (objectStack[objectStack.length - 1]);
        var property = opt_property !== undefined ?
          opt_property : node.localName;
        var array;
        if (property in object) {
          array = object[property];
        } else {
          array = object[property] = [];
        }
        array.push(value);
      }
    });
};


/**
 * Make an object property setter function.
 * @param {function(this: T, Node, Array.<*>): *} valueReader Value reader.
 * @param {string=} opt_property Property.
 * @param {T=} opt_this The object to use as `this` in `valueReader`.
 * @return {L.xmlParser} Parser.
 * @template T
 */
L.xml.makeObjectPropertySetter = function(valueReader, opt_property, opt_this) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array.<*>} objectStack Object stack.
     */
    function(node, objectStack) {
      var value = valueReader.call(opt_this !== undefined ? opt_this : this,
          node, objectStack);
      if (value !== undefined) {
        var object = /** @type {Object} */
              (objectStack[objectStack.length - 1]);
        var property = opt_property !== undefined ?
          opt_property : node.localName;
        object[property] = value;
      }
    });
};


/**
 * Create a serializer that appends nodes written by its `nodeWriter` to its
 * designated parent. The parent is the `node` of the
 * {@link L.xmlNodeStackItem} at the top of the `objectStack`.
 * @param {function(this: T, Node, V, Array.<*>)}
 *     nodeWriter Node writer.
 * @param {T=} opt_this The object to use as `this` in `nodeWriter`.
 * @return {L.xmlSerializer} Serializer.
 * @template T, V
 */
L.xml.makeChildAppender = function(nodeWriter, opt_this) {
  return function(node, value, objectStack) {
    nodeWriter.call(opt_this !== undefined ? opt_this : this,
        node, value, objectStack);
    var parent = objectStack[objectStack.length - 1];
    var parentNode = parent.node;
    parentNode.appendChild(node);
  };
};


/**
 * Create a serializer that calls the provided `nodeWriter` from
 * {@link L.xml.serialize}. This can be used by the parent writer to have the
 * 'nodeWriter' called with an array of values when the `nodeWriter` was
 * designed to serialize a single item. An example would be a LineString
 * geometry writer, which could be reused for writing MultiLineString
 * geometries.
 * @param {function(this: T, Node, V, Array.<*>)}
 *     nodeWriter Node writer.
 * @param {T=} opt_this The object to use as `this` in `nodeWriter`.
 * @return {L.xmlSerializer} Serializer.
 * @template T, V
 */
L.xml.makeArraySerializer = function(nodeWriter, opt_this) {
  var serializersNS, nodeFactory;
  return function(node, value, objectStack) {
    if (serializersNS === undefined) {
      serializersNS = {};
      var serializers = {};
      serializers[node.localName] = nodeWriter;
      serializersNS[node.namespaceURI] = serializers;
      nodeFactory = L.xml.makeSimpleNodeFactory(node.localName);
    }
    L.xml.serialize(serializersNS, nodeFactory, value, objectStack);
  };
};


/**
 * Create a node factory which can use the `opt_keys` passed to
 * {@link L.xml.serialize} or {@link L.xml.pushSerializeAndPop} as node names,
 * or a fixed node name. The namespace of the created nodes can either be fixed,
 * or the parent namespace will be used.
 * @param {string=} opt_nodeName Fixed node name which will be used for all
 *     created nodes. If not provided, the 3rd argument to the resulting node
 *     factory needs to be provided and will be the nodeName.
 * @param {string=} opt_namespaceURI Fixed namespace URI which will be used for
 *     all created nodes. If not provided, the namespace of the parent node will
 *     be used.
 * @return {function(*, Array.<*>, string=): (Node|undefined)} Node factory.
 */
L.xml.makeSimpleNodeFactory = function(opt_nodeName, opt_namespaceURI) {
  var fixedNodeName = opt_nodeName;
  return (
    /**
     * @param {*} value Value.
     * @param {Array.<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Node} Node.
     */
    function(value, objectStack, opt_nodeName) {
      var context = objectStack[objectStack.length - 1];
      var node = context.node;
      var nodeName = fixedNodeName;
      if (nodeName === undefined) {
        nodeName = opt_nodeName;
      }
      var namespaceURI = opt_namespaceURI;
      if (opt_namespaceURI === undefined) {
        namespaceURI = node.namespaceURI;
      }
      return L.xml.createElementNS(namespaceURI, /** @type {string} */ (nodeName));
    }
  );
};


/**
 * A node factory that creates a node using the parent's `namespaceURI` and the
 * `nodeName` passed by {@link L.xml.serialize} or
 * {@link L.xml.pushSerializeAndPop} to the node factory.
 * @const
 * @type {function(*, Array.<*>, string=): (Node|undefined)}
 */
L.xml.OBJECT_PROPERTY_NODE_FACTORY = L.xml.makeSimpleNodeFactory();


/**
 * Create an array of `values` to be used with {@link L.xml.serialize} or
 * {@link L.xml.pushSerializeAndPop}, where `orderedKeys` has to be provided as
 * `opt_key` argument.
 * @param {Object.<string, V>} object Key-value pairs for the sequence. Keys can
 *     be a subset of the `orderedKeys`.
 * @param {Array.<string>} orderedKeys Keys in the order of the sequence.
 * @return {Array.<V>} Values in the order of the sequence. The resulting array
 *     has the same length as the `orderedKeys` array. Values that are not
 *     present in `object` will be `undefined` in the resulting array.
 * @template V
 */
L.xml.makeSequence = function(object, orderedKeys) {
  var length = orderedKeys.length;
  var sequence = new Array(length);
  for (var i = 0; i < length; ++i) {
    sequence[i] = object[orderedKeys[i]];
  }
  return sequence;
};


/**
 * Create a namespaced structure, using the same values for each namespace.
 * This can be used as a starting point for versioned parsers, when only a few
 * values are version specific.
 * @param {Array.<string>} namespaceURIs Namespace URIs.
 * @param {T} structure Structure.
 * @param {Object.<string, T>=} opt_structureNS Namespaced structure to add to.
 * @return {Object.<string, T>} Namespaced structure.
 * @template T
 */
L.xml.makeStructureNS = function(namespaceURIs, structure, opt_structureNS) {
  /**
   * @type {Object.<string, *>}
   */
  var structureNS = opt_structureNS !== undefined ? opt_structureNS : {};
  var i, ii;
  for (i = 0, ii = namespaceURIs.length; i < ii; ++i) {
    structureNS[namespaceURIs[i]] = structure;
  }
  return structureNS;
};


/**
 * Parse a node using the parsers and object stack.
 * @param {Object.<string, Object.<string, L.xmlParser>>} parsersNS
 *     Parsers by namespace.
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @param {*=} opt_this The object to use as `this`.
 */
L.xml.parseNode = function(parsersNS, node, objectStack, opt_this) {
  var n;
  for (n = node.firstElementChild; n; n = n.nextElementSibling) {
    var parsers = parsersNS[n.namespaceURI];
    if (parsers !== undefined) {
      var parser = parsers[n.localName];
      if (parser !== undefined) {
        parser.call(opt_this, n, objectStack);
      }
    }
  }
};


/**
 * Push an object on top of the stack, parse and return the popped object.
 * @param {T} object Object.
 * @param {Object.<string, Object.<string, L.xmlParser>>} parsersNS
 *     Parsers by namespace.
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @param {*=} opt_this The object to use as `this`.
 * @return {T} Object.
 * @template T
 */
L.xml.pushParseAndPop = function(
    object, parsersNS, node, objectStack, opt_this) {
  objectStack.push(object);
  L.xml.parseNode(parsersNS, node, objectStack, opt_this);
  return objectStack.pop();
};


/**
 * Walk through an array of `values` and call a serializer for each value.
 * @param {Object.<string, Object.<string, L.xmlSerializer>>} serializersNS
 *     Namespaced serializers.
 * @param {function(this: T, *, Array.<*>, (string|undefined)): (Node|undefined)} nodeFactory
 *     Node factory. The `nodeFactory` creates the node whose namespace and name
 *     will be used to choose a node writer from `serializersNS`. This
 *     separation allows us to decide what kind of node to create, depending on
 *     the value we want to serialize. An example for this would be different
 *     geometry writers based on the geometry type.
 * @param {Array.<*>} values Values to serialize. An example would be an array
 *     of {@link ol.Feature} instances.
 * @param {Array.<*>} objectStack Node stack.
 * @param {Array.<string>=} opt_keys Keys of the `values`. Will be passed to the
 *     `nodeFactory`. This is used for serializing object literals where the
 *     node name relates to the property key. The array length of `opt_keys` has
 *     to match the length of `values`. For serializing a sequence, `opt_keys`
 *     determines the order of the sequence.
 * @param {T=} opt_this The object to use as `this` for the node factory and
 *     serializers.
 * @template T
 */
L.xml.serialize = function(
    serializersNS, nodeFactory, values, objectStack, opt_keys, opt_this) {
  var length = (opt_keys !== undefined ? opt_keys : values).length;
  var value, node;
  for (var i = 0; i < length; ++i) {
    value = values[i];
    if (value !== undefined) {
      node = nodeFactory.call(opt_this, value, objectStack,
          opt_keys !== undefined ? opt_keys[i] : undefined);
      if (node !== undefined) {
        serializersNS[node.namespaceURI][node.localName]
            .call(opt_this, node, value, objectStack);
      }
    }
  }
};


/**
 * @param {O} object Object.
 * @param {Object.<string, Object.<string, L.xmlSerializer>>} serializersNS
 *     Namespaced serializers.
 * @param {function(this: T, *, Array.<*>, (string|undefined)): (Node|undefined)} nodeFactory
 *     Node factory. The `nodeFactory` creates the node whose namespace and name
 *     will be used to choose a node writer from `serializersNS`. This
 *     separation allows us to decide what kind of node to create, depending on
 *     the value we want to serialize. An example for this would be different
 *     geometry writers based on the geometry type.
 * @param {Array.<*>} values Values to serialize. An example would be an array
 *     of {@link ol.Feature} instances.
 * @param {Array.<*>} objectStack Node stack.
 * @param {Array.<string>=} opt_keys Keys of the `values`. Will be passed to the
 *     `nodeFactory`. This is used for serializing object literals where the
 *     node name relates to the property key. The array length of `opt_keys` has
 *     to match the length of `values`. For serializing a sequence, `opt_keys`
 *     determines the order of the sequence.
 * @param {T=} opt_this The object to use as `this` for the node factory and
 *     serializers.
 * @return {O|undefined} Object.
 * @template O, T
 */
L.xml.pushSerializeAndPop = function(object,
    serializersNS, nodeFactory, values, objectStack, opt_keys, opt_this) {
  objectStack.push(object);
  L.xml.serialize(
      serializersNS, nodeFactory, values, objectStack, opt_keys, opt_this);
  return objectStack.pop();
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

//L.format =L.Class.extend({ initialize: function (options) { } });
L.format = {};
/**
* @classdesc
* Generic format for reading non-feature XML data
*
* @constructor
* @abstract
* @struct
*/
L.format.XML = L.Class.extend({
    read : function (source) {
        if (L.xml.isDocument(source)) {
            return this.readFromDocument(/** @type {Document} */(source));
        } else if (L.xml.isNode(source)) {
            return this.readFromNode(/** @type {Node} */(source));
        } else if (typeof source === 'string') {
            var doc = L.xml.parse(source);
            return this.readFromDocument(doc);
        } else {
            return null;
        }
    },
    readFromDocument : function (doc) { },
    readFromNode :function (node) { }
});





/***/ }),
/* 8 */
/***/ (function(module, exports) {

L.format.XLink = {};
/**
* @const
* @type {string}
*/
L.format.XLink.NAMESPACE_URI = 'http://www.w3.org/1999/xlink';


/**
* @param {Node} node Node.
* @return {boolean|undefined} Boolean.
*/
L.format.XLink.readHref = function (node) {
    return node.getAttributeNS(L.format.XLink.NAMESPACE_URI, 'href');
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

L.format.XSD = {};
/**
* @const
* @type {string}
*/
L.format.XSD.NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';


/**
* @param {Node} node Node.
* @return {boolean|undefined} Boolean.
*/
L.format.XSD.readBoolean = function (node) {
    var s = L.xml.getAllTextContent(node, false);
    return L.format.XSD.readBooleanString(s);
};


/**
* @param {string} string String.
* @return {boolean|undefined} Boolean.
*/
L.format.XSD.readBooleanString = function (string) {
    var m = /^\s*(true|1)|(false|0)\s*$/.exec(string);
    if (m) {
        return m[1] !== undefined || false;
    } else {
        return undefined;
    }
};


/**
* @param {Node} node Node.
* @return {number|undefined} DateTime in seconds.
*/
L.format.XSD.readDateTime = function (node) {
    var s = L.xml.getAllTextContent(node, false);
    var dateTime = Date.parse(s);
    return isNaN(dateTime) ? undefined : dateTime / 1000;
};


/**
* @param {Node} node Node.
* @return {number|undefined} Decimal.
*/
L.format.XSD.readDecimal = function (node) {
    var s = L.xml.getAllTextContent(node, false);
    return L.format.XSD.readDecimalString(s);
};


/**
* @param {string} string String.
* @return {number|undefined} Decimal.
*/
L.format.XSD.readDecimalString = function (string) {
    // FIXME check spec
    var m = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(string);
    if (m) {
        return parseFloat(m[1]);
    } else {
        return undefined;
    }
};


/**
* @param {Node} node Node.
* @return {number|undefined} Non negative integer.
*/
L.format.XSD.readNonNegativeInteger = function (node) {
    var s = L.xml.getAllTextContent(node, false);
    return L.format.XSD.readNonNegativeIntegerString(s);
};


/**
* @param {string} string String.
* @return {number|undefined} Non negative integer.
*/
L.format.XSD.readNonNegativeIntegerString = function (string) {
    var m = /^\s*(\d+)\s*$/.exec(string);
    if (m) {
        return parseInt(m[1], 10);
    } else {
        return undefined;
    }
};


/**
* @param {Node} node Node.
* @return {string|undefined} String.
*/
L.format.XSD.readString = function (node) {
    return L.xml.getAllTextContent(node, false).trim();
};


/**
* @param {Node} node Node to append a TextNode with the boolean to.
* @param {boolean} bool Boolean.
*/
L.format.XSD.writeBooleanTextNode = function (node, bool) {
    L.format.XSD.writeStringTextNode(node, (bool) ? '1' : '0');
};


/**
* @param {Node} node Node to append a CDATA Section with the string to.
* @param {string} string String.
*/
L.format.XSD.writeCDATASection = function (node, string) {
    node.appendChild(L.xml.DOCUMENT.createCDATASection(string));
};


/**
* @param {Node} node Node to append a TextNode with the dateTime to.
* @param {number} dateTime DateTime in seconds.
*/
L.format.XSD.writeDateTimeTextNode = function (node, dateTime) {
    var date = new Date(dateTime * 1000);
    var string = date.getUTCFullYear() + '-' +
      ol.string.padNumber(date.getUTCMonth() + 1, 2) + '-' +
      ol.string.padNumber(date.getUTCDate(), 2) + 'T' +
      ol.string.padNumber(date.getUTCHours(), 2) + ':' +
      ol.string.padNumber(date.getUTCMinutes(), 2) + ':' +
      ol.string.padNumber(date.getUTCSeconds(), 2) + 'Z';
    node.appendChild(L.xml.DOCUMENT.createTextNode(string));
};


/**
* @param {Node} node Node to append a TextNode with the decimal to.
* @param {number} decimal Decimal.
*/
L.format.XSD.writeDecimalTextNode = function (node, decimal) {
    var string = decimal.toPrecision();
    node.appendChild(L.xml.DOCUMENT.createTextNode(string));
};


/**
* @param {Node} node Node to append a TextNode with the decimal to.
* @param {number} nonNegativeInteger Non negative integer.
*/
L.format.XSD.writeNonNegativeIntegerTextNode = function (node, nonNegativeInteger) {
    var string = nonNegativeInteger.toString();
    node.appendChild(L.xml.DOCUMENT.createTextNode(string));
};


/**
* @param {Node} node Node to append a TextNode with the string to.
* @param {string} string String.
*/
L.format.XSD.writeStringTextNode = function (node, string) {
    node.appendChild(L.xml.DOCUMENT.createTextNode(string));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
* @classdesc
* Generic format for reading non-feature XML data
*
* @constructor
* @abstract
* @struct
*/
L.format.OWS = L.format.XML.extend({
    initialize: function () {},
    readFromDocument :function(doc) {
      for (var n = doc.firstChild; n; n = n.nextSibling) {
        if (n.nodeType == Node.ELEMENT_NODE) {
          return this.readFromNode(n);
        }
      }
      return null;
    },


    /**
     * @inheritDoc
     */
    readFromNode : function(node) {
      var owsObject = L.xml.pushParseAndPop({},
          L.format.OWSPARSERS_, node, []);
      return owsObject ? owsObject : null;
    }
  

});


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The address.
 */
L.format.OWSreadAddress_ = function(node, objectStack) {
  return L.xml.pushParseAndPop({},
      L.format.OWSADDRESS_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The values.
 */
L.format.OWSreadAllowedValues_ = function(node, objectStack) {
  return L.xml.pushParseAndPop({},
      L.format.OWSALLOWED_VALUES_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The constraint.
 */
L.format.OWSreadConstraint_ = function(node, objectStack) {
  var name = node.getAttribute('name');
  if (!name) {
    return undefined;
  }
  return L.xml.pushParseAndPop({'name': name},
      L.format.OWSCONSTRAINT_PARSERS_, node,
      objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The contact info.
 */
L.format.OWSreadContactInfo_ = function(node, objectStack) {
  return L.xml.pushParseAndPop({},
      L.format.OWSCONTACT_INFO_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The DCP.
 */
L.format.OWSreadDcp_ = function(node, objectStack) {
  return L.xml.pushParseAndPop({},
      L.format.OWSDCP_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The GET object.
 */
L.format.OWSreadGet_ = function(node, objectStack) {
  var href = L.format.XLink.readHref(node);
  if (!href) {
    return undefined;
  }
  return L.xml.pushParseAndPop({'href': href},
      L.format.OWSREQUEST_METHOD_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The HTTP object.
 */
L.format.OWSreadHttp_ = function(node, objectStack) {
  return L.xml.pushParseAndPop({}, L.format.OWSHTTP_PARSERS_,
      node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The operation.
 */
L.format.OWSreadOperation_ = function(node, objectStack) {
  var name = node.getAttribute('name');
  var value = L.xml.pushParseAndPop({},
      L.format.OWSOPERATION_PARSERS_, node, objectStack);
  if (!value) {
    return undefined;
  }
  var object = /** @type {Object} */
      (objectStack[objectStack.length - 1]);
  object[name] = value;
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The operations metadata.
 */
L.format.OWSreadOperationsMetadata_ = function(node,
    objectStack) {
  return L.xml.pushParseAndPop({},
      L.format.OWSOPERATIONS_METADATA_PARSERS_, node,
      objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The phone.
 */
L.format.OWSreadPhone_ = function(node, objectStack) {
  return L.xml.pushParseAndPop({},
      L.format.OWSPHONE_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The service identification.
 */
L.format.OWSreadServiceIdentification_ = function(node,
    objectStack) {
  return L.xml.pushParseAndPop(
      {}, L.format.OWSSERVICE_IDENTIFICATION_PARSERS_, node,
      objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The service contact.
 */
L.format.OWSreadServiceContact_ = function(node, objectStack) {
  return L.xml.pushParseAndPop(
      {}, L.format.OWSSERVICE_CONTACT_PARSERS_, node,
      objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} The service provider.
 */
L.format.OWSreadServiceProvider_ = function(node, objectStack) {
  return L.xml.pushParseAndPop(
      {}, L.format.OWSSERVICE_PROVIDER_PARSERS_, node,
      objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {string|undefined} The value.
 */
L.format.OWSreadValue_ = function(node, objectStack) {
  return L.format.XSD.readString(node);
};


/**
 * @const
 * @type {Array.<string>}
 * @private
 */
L.format.OWSNAMESPACE_URIS_ = [
  null,
  'http://www.opengis.net/ows/1.1'
];


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSPARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'ServiceIdentification': L.xml.makeObjectPropertySetter(
          L.format.OWSreadServiceIdentification_),
      'ServiceProvider': L.xml.makeObjectPropertySetter(
          L.format.OWSreadServiceProvider_),
      'OperationsMetadata': L.xml.makeObjectPropertySetter(
          L.format.OWSreadOperationsMetadata_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSADDRESS_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'DeliveryPoint': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
      'City': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
      'AdministrativeArea': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
      'PostalCode': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
      'Country': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
      'ElectronicMailAddress': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSALLOWED_VALUES_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'Value': L.xml.makeObjectPropertyPusher(L.format.OWSreadValue_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSCONSTRAINT_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'AllowedValues': L.xml.makeObjectPropertySetter(
          L.format.OWSreadAllowedValues_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSCONTACT_INFO_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'Phone': L.xml.makeObjectPropertySetter(L.format.OWSreadPhone_),
      'Address': L.xml.makeObjectPropertySetter(L.format.OWSreadAddress_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSDCP_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'HTTP': L.xml.makeObjectPropertySetter(L.format.OWSreadHttp_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSHTTP_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'Get': L.xml.makeObjectPropertyPusher(L.format.OWSreadGet_),
      'Post': undefined // TODO
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSOPERATION_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'DCP': L.xml.makeObjectPropertySetter(L.format.OWSreadDcp_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSOPERATIONS_METADATA_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'Operation': L.format.OWSreadOperation_
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSPHONE_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'Voice': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
      'Facsimile': L.xml.makeObjectPropertySetter(L.format.XSD.readString)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSREQUEST_METHOD_PARSERS_ = L.xml.makeStructureNS(
    L.format.OWSNAMESPACE_URIS_, {
      'Constraint': L.xml.makeObjectPropertyPusher(
          L.format.OWSreadConstraint_)
    });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSSERVICE_CONTACT_PARSERS_ =
    L.xml.makeStructureNS(
        L.format.OWSNAMESPACE_URIS_, {
          'IndividualName': L.xml.makeObjectPropertySetter(
              L.format.XSD.readString),
          'PositionName': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
          'ContactInfo': L.xml.makeObjectPropertySetter(
              L.format.OWSreadContactInfo_)
        });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSSERVICE_IDENTIFICATION_PARSERS_ =
    L.xml.makeStructureNS(
        L.format.OWSNAMESPACE_URIS_, {
          'Abstract': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
          'AccessConstraints': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
          'Fees': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
          'Title': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
          'ServiceTypeVersion': L.xml.makeObjectPropertySetter(
              L.format.XSD.readString),
          'ServiceType': L.xml.makeObjectPropertySetter(L.format.XSD.readString)
        });


/**
 * @const
 * @type {Object.<string, Object.<string, L.xmlParser>>}
 * @private
 */
L.format.OWSSERVICE_PROVIDER_PARSERS_ =
    L.xml.makeStructureNS(
        L.format.OWSNAMESPACE_URIS_, {
          'ProviderName': L.xml.makeObjectPropertySetter(L.format.XSD.readString),
          'ProviderSite': L.xml.makeObjectPropertySetter(L.format.XLink.readHref),
          'ServiceContact': L.xml.makeObjectPropertySetter(
              L.format.OWSreadServiceContact_)
        });





/***/ }),
/* 11 */
/***/ (function(module, exports) {

L.format.WMTSCapabilities = L.format.XML.extend({
    initialize: function () {
     this.owsParser_ = new L.format.OWS();
    },
    readFromDocument :function(doc) {
      for (var n = doc.firstChild; n; n = n.nextSibling) {
        if (n.nodeType == Node.ELEMENT_NODE) {
          return this.readFromNode(n);
        }
      }
      return null;
    },

    /**
     * @inheritDoc
     */
    readFromNode : function(node) {
      var version = node.getAttribute('version').trim();
      var WMTSCapabilityObject = this.owsParser_.readFromNode(node);
      if (!WMTSCapabilityObject) {
        return null;
      }
      WMTSCapabilityObject['version'] = version;
      WMTSCapabilityObject = L.xml.pushParseAndPop(WMTSCapabilityObject,
          L.format.WMTSCapabilities.PARSERS_, node, []);
      return WMTSCapabilityObject ? WMTSCapabilityObject : null;
    }


});
/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Attribution object.
*/
L.format.WMTSCapabilities.readContents_ = function (node, objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.CONTENTS_PARSERS_, node, objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Layers object.
*/
L.format.WMTSCapabilities.readLayer_ = function (node, objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.LAYER_PARSERS_, node, objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Tile Matrix Set object.
*/
L.format.WMTSCapabilities.readTileMatrixSet_ = function (node, objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.TMS_PARSERS_, node, objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Style object.
*/
L.format.WMTSCapabilities.readStyle_ = function (node, objectStack) {
    var style = L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.STYLE_PARSERS_, node, objectStack);
    if (!style) {
        return undefined;
    }
    var isDefault = node.getAttribute('isDefault') === 'true';
    style['isDefault'] = isDefault;
    return style;

};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Tile Matrix Set Link object.
*/
L.format.WMTSCapabilities.readTileMatrixSetLink_ = function (node,
    objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.TMS_LINKS_PARSERS_, node, objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Dimension object.
*/
L.format.WMTSCapabilities.readDimensions_ = function (node, objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.DIMENSION_PARSERS_, node, objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Resource URL object.
*/
L.format.WMTSCapabilities.readResourceUrl_ = function (node, objectStack) {
    var format = node.getAttribute('format');
    var template = node.getAttribute('template');
    var resourceType = node.getAttribute('resourceType');
    var resource = {};
    if (format) {
        resource['format'] = format;
    }
    if (template) {
        resource['template'] = template;
    }
    if (resourceType) {
        resource['resourceType'] = resourceType;
    }
    return resource;
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} WGS84 BBox object.
*/
L.format.WMTSCapabilities.readWgs84BoundingBox_ = function (node, objectStack) {
    var coordinates = L.xml.pushParseAndPop([],
      L.format.WMTSCapabilities.WGS84_BBOX_READERS_, node, objectStack);
    if (coordinates.length != 2) {
        return undefined;
    }
    return L.Util.boundingExtent(coordinates);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined}  BBox object.
*/
L.format.WMTSCapabilities.readBoundingBox_ = function (node, objectStack) {
    var coordinates = L.xml.pushParseAndPop([],
      L.format.WMTSCapabilities.WGS84_BBOX_READERS_, node, objectStack);
    if (coordinates.length != 2) {
        return undefined;
    }
    return L.Util.boundingExtent(coordinates);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Legend object.
*/
L.format.WMTSCapabilities.readLegendUrl_ = function (node, objectStack) {
    var legend = {};
    legend['format'] = node.getAttribute('format');
    legend['href'] = L.format.XLink.readHref(node);
    return legend;
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} Coordinates object.
*/
L.format.WMTSCapabilities.readCoordinates_ = function (node, objectStack) {
    var coordinates = L.format.XSD.readString(node).split(' ');
    if (!coordinates || coordinates.length != 2) {
        return undefined;
    }
    var x = +coordinates[0];
    var y = +coordinates[1];
    if (isNaN(x) || isNaN(y)) {
        return undefined;
    }
    return [x, y];
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} TileMatrix object.
*/
L.format.WMTSCapabilities.readTileMatrix_ = function (node, objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.TM_PARSERS_, node, objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} TileMatrixSetLimits Object.
*/
L.format.WMTSCapabilities.readTileMatrixLimitsList_ = function (node,
    objectStack) {
    return L.xml.pushParseAndPop([],
      L.format.WMTSCapabilities.TMS_LIMITS_LIST_PARSERS_, node,
      objectStack);
};


/**
* @private
* @param {Node} node Node.
* @param {Array.<*>} objectStack Object stack.
* @return {Object|undefined} TileMatrixLimits Array.
*/
L.format.WMTSCapabilities.readTileMatrixLimits_ = function (node, objectStack) {
    return L.xml.pushParseAndPop({},
      L.format.WMTSCapabilities.TMS_LIMITS_PARSERS_, node, objectStack);
};


/**
* @const
* @private
* @type {Array.<string>}
*/
L.format.WMTSCapabilities.NAMESPACE_URIS_ = [
  null,
  'http://www.opengis.net/wmts/1.0'
];


/**
* @const
* @private
* @type {Array.<string>}
*/
L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_ = [
  null,
  'http://www.opengis.net/ows/1.1'
];


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'Contents': L.xml.makeObjectPropertySetter(
          L.format.WMTSCapabilities.readContents_)
    });


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.CONTENTS_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'Layer': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readLayer_),
        'TileMatrixSet': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readTileMatrixSet_)
    });


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.LAYER_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'Style': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readStyle_),
        'Format': L.xml.makeObjectPropertyPusher(
          L.format.XSD.readString),
        'TileMatrixSetLink': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readTileMatrixSetLink_),
        'Dimension': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readDimensions_),
        'ResourceURL': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readResourceUrl_)
    }, L.xml.makeStructureNS(L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
        'Title': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'Abstract': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'BoundingBox': L.xml.makeObjectPropertySetter(
          L.format.WMTSCapabilities.readBoundingBox_),
        'WGS84BoundingBox': L.xml.makeObjectPropertySetter(
          L.format.WMTSCapabilities.readWgs84BoundingBox_),
        'Identifier': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString)
    }));


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.STYLE_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'LegendURL': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readLegendUrl_)
    }, L.xml.makeStructureNS(L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
        'Title': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'Identifier': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString)
    }));


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.TMS_LINKS_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'TileMatrixSet': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'TileMatrixSetLimits': L.xml.makeObjectPropertySetter(
          L.format.WMTSCapabilities.readTileMatrixLimitsList_)
    });

/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.TMS_LIMITS_LIST_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'TileMatrixLimits': L.xml.makeArrayPusher(
          L.format.WMTSCapabilities.readTileMatrixLimits_)
    });


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.TMS_LIMITS_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'TileMatrix': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'MinTileRow': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger),
        'MaxTileRow': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger),
        'MinTileCol': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger),
        'MaxTileCol': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger)
    });


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.DIMENSION_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'Default': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'Value': L.xml.makeObjectPropertyPusher(
          L.format.XSD.readString)
    }, L.xml.makeStructureNS(L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
        'Identifier': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString)
    }));


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.WGS84_BBOX_READERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
        'LowerCorner': L.xml.makeArrayPusher(
          L.format.WMTSCapabilities.readCoordinates_),
        'UpperCorner': L.xml.makeArrayPusher(
          L.format.WMTSCapabilities.readCoordinates_)
    });


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.TMS_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'WellKnownScaleSet': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'TileMatrix': L.xml.makeObjectPropertyPusher(
          L.format.WMTSCapabilities.readTileMatrix_)
    }, L.xml.makeStructureNS(L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
        'SupportedCRS': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString),
        'Identifier': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString)
    }));


/**
* @const
* @type {Object.<string, Object.<string, L.xmlParser>>}
* @private
*/
L.format.WMTSCapabilities.TM_PARSERS_ = L.xml.makeStructureNS(
    L.format.WMTSCapabilities.NAMESPACE_URIS_, {
        'TopLeftCorner': L.xml.makeObjectPropertySetter(
          L.format.WMTSCapabilities.readCoordinates_),
        'ScaleDenominator': L.xml.makeObjectPropertySetter(
          L.format.XSD.readDecimal),
        'TileWidth': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger),
        'TileHeight': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger),
        'MatrixWidth': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger),
        'MatrixHeight': L.xml.makeObjectPropertySetter(
          L.format.XSD.readNonNegativeInteger)
    }, L.xml.makeStructureNS(L.format.WMTSCapabilities.OWS_NAMESPACE_URIS_, {
        'Identifier': L.xml.makeObjectPropertySetter(
          L.format.XSD.readString)
    }));

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

L.Map.include({
    getResolutions: function (zoom) {
        var resolutions = [];
        if (!L.Util.isNull(this.options.crs) && !L.Util.isNull(this.options.crs._scales)) {
            for (var i = 0; i < this.options.crs._scales.length; i++) {
                resolutions.push(1 / this.options.crs._scales[i]);
            }
        } else {
            if (!L.Util.isNull(this.options.crs.code)) {
                var _maxZoom = this.getMaxZoom();
                _maxZoom = !L.Util.isNull(_maxZoom) && _maxZoom != Infinity && _maxZoom != -Infinity ? this.getMaxZoom() : 20;
                if (!L.Util.isNull(zoom) && _maxZoom < zoom) {
                    _maxZoom = zoom;
                }
                if (this.options.crs.code.toUpperCase() === "EPSG:4326") {
                    for (var i = 0; i <= _maxZoom; i++) {
                        resolutions.push(360 / (256 * Math.pow(2, i + 1)));
                    }
                }
                if (this.options.crs.code.toUpperCase() === "EPSG:3857" || this.options.crs.code.toUpperCase() === "EPSG:102100" || this.options.crs.code.toUpperCase() === "EPSG:102113" || this.options.crs.code.toUpperCase() === "EPSG:900913") {
                    for (var i = 0; i <= _maxZoom; i++) {
                        resolutions.push((2.0037508342787E7 + 2.0037508342787E7) / (256 * Math.pow(2, i)));
                    }
                }
            }
        }

        return resolutions;
    },
    getCurrentResolution: function (zoom) {
        var resolution = null;
        var resolutions = this.getResolutions(zoom);
        if (zoom >= 0 && resolutions.length > 0) {
            resolution = resolutions[zoom];
        }
        return resolution;
    },
    getNearestZoom: function (layer_resolutions, zoom, percentage) {
        var resolution = this.getCurrentResolution(zoom);
        var nearest = -1;
        if (resolution && layer_resolutions) {
            //nearest = L.Util.Array.linearFindNearest(layer_resolutions, resolution, 1);
            for (var i = 0; i < layer_resolutions.length; i++) {
                var correctRes = layer_resolutions[i];
                if (this._withinPercentage(correctRes, resolution, percentage)) {
                    nearest = i;
                    break;
                }

            }
        }
        return nearest;
    },
    getMapZoomByResolution: function (layer_resolution, percentage) {
        var resolution = null;
        var nearest = -1;
        var resolutions = this.getResolutions();
        if (resolutions.length > 0) {
            for (var i = 0; i < resolutions.length; i++) {
                var correctRes = resolutions[i];
                if (this._withinPercentage(correctRes, layer_resolution, percentage)) {
                    nearest = i;
                    break;
                }
            }
        }
        return nearest;
    },
    _withinPercentage: function (a, b, percentage) {
        if (L.Util.isNull(percentage)) {
            percentage = 0.1;
        }
        var diff = Math.abs((a / b) - 1);
        return diff < percentage;
    }


});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
* Request encoding. One of 'KVP', 'REST'.
* @enum {string}
*/
L.WMTSRequestEncoding = {
    KVP: 'KVP', // see spec §8
    REST: 'REST' // see spec §10
};
L.TileLayer.WmtsGetCapabilities = L.Class.extend({

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
        this.defaultWmtsParams.layer = null;
        for (var i in opt) {
            this.defaultWmtsParams[i] = opt[i];
        }
        //判断请求地址是否输入的为完整地址
        if (url != null && url.toLowerCase().indexOf("request=") < 0) {
            this._url = this._url + "?request=GetCapabilities&service=wmts";
        }
        if (url != null && this.defaultWmtsParams.layer != null) {
            this._url += this._url +"&layer=" + this.defaultWmtsParams.layer;
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
        L.ajax({
            url: this._url,
            success: this._callback.bind(this),
            fail: this._errback.bind(this),
            type: "GET",
            proxy: (opt.proxy != undefined && opt.proxy) ? opt.proxy : null,
            async: async
        });
    },
    //将getCapalities的xml转换为json对象
    read: function (data) {
        var wmtsobj = new L.format.WMTSCapabilities();
        var res = wmtsobj.read(data);
        return res;
        //var xml = new L.X2JS();
        //return xml.xml_str2json(data);
    },

    _callback: function (data) {
        var jsonObj = this.read(data.trim());
        if (this.defaultWmtsParams.callback != null) {
            this.defaultWmtsParams.callback(jsonObj);
        }
    },
    _errback: function (err) {
        if (this.defaultWmtsParams.errback != null) {
            this.defaultWmtsParams.errback(err);
        }
    },
    optionsFromCapabilities: function (wmtsCap, options) {
        if (L.Util.isNull(wmtsCap)) {
            console.log("元数据信息为空!");
        }
        var config = options != undefined ? options : {};
        if (L.Util.isNull(config['layer']) && !L.Util.isNull(this.defaultWmtsParams.layer)) {
            config['layer'] = this.defaultWmtsParams.layer;
        }
        if (L.Util.isNull(config['layer'])) {
            console.log("参数 'layer'不能为空!");
        }
        var layers = wmtsCap['Contents']['Layer'];
        var l = L.Util.Array.find(layers, function (elt, index, array) {
            return elt['Identifier'] == config['layer'];
        });
        if (L.Util.isNull(l)) {
            console.log("未找到图层匹配的元数据信息");
            return null;
        }

        if (l['TileMatrixSetLink'].length > 1) {
            if ('projection' in config) {
                idx = L.Util.Array.findIndex(l['TileMatrixSetLink'],
					function (elt, index, array) {
					    var tileMatrixSet = L.Util.Array.find(tileMatrixSets, function (el) {
					        return el['Identifier'] == elt['TileMatrixSet'];
					    });
					    var supportedCRS = tileMatrixSet['SupportedCRS'];
					    if (supportedCRS.indexOf("::") >= 0) {
					        supportedCRS = supportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, '$1:$3');
					    }
					    return supportedCRS == config['projection'];
					});
            } else {
                idx = L.Util.Array.findIndex(l['TileMatrixSetLink'],
					function (elt, index, array) {
					    return elt['TileMatrixSet'] == config['matrixSet'];
					});
            }

        } else {
            idx = 0;
        }
        if (idx < 0) {
            idx = 0;
        }
        matrixSet = /** @type {string} */
			(l['TileMatrixSetLink'][idx]['TileMatrixSet']);
        matrixLimits = /** @type {Array.<Object>} */
			(l['TileMatrixSetLink'][idx]['TileMatrixSetLimits']);

        var format = /** @type {string} */(l['Format'][0]);
        if ('format' in config) {
            format = config['format'];
        }
        idx = L.Util.Array.findIndex(l['Style'], function (elt, index, array) {
            if ('style' in config) {
                return elt['Title'] == config['style'];
            } else {
                return elt['isDefault'];
            }
        });
        if (idx < 0) {
            idx = 0;
        }
        var style = /** @type {string} */(l['Style'][idx]['Identifier']);
        var dimensions = {};
        if ('Dimension' in l) {
            l['Dimension'].forEach(function (elt, index, array) {
                var key = elt['Identifier'];
                var value = elt['Default'];
                if (value === undefined) {
                    value = elt['Value'][0];
                }
                dimensions[key] = value;
            });
        }
        var matrixSets = wmtsCap['Contents']['TileMatrixSet'];
        var matrixSetObj = L.Util.Array.find(matrixSets, function (elt, index, array) {
            return elt['Identifier'] == matrixSet;
        });

        var projection;
        var code = matrixSetObj['SupportedCRS'];
        if (code && (code.indexOf("::") >= 0 || code.indexOf("urn:ogc:def:crs") >= 0)) {
            projection = code.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, '$1:$3');
        }
        if ('projection' in config) {
            if (config['projection']) {
                projection = config['projection']
            }
        }

        var extent, wrapX;
        var boundingBox = l['BoundingBox'];
        if (boundingBox !== undefined) {
            extent = boundingBox;
        }
        var wgs84BoundingBox = l['WGS84BoundingBox'];
        if (wgs84BoundingBox !== undefined) {
            var wgs84ProjectionExtent = [-180, -90, 180, 90];
            wrapX = (wgs84BoundingBox[0] == wgs84ProjectionExtent[0] &&
				wgs84BoundingBox[2] == wgs84ProjectionExtent[2]);
            //extent = wgs84BoundingBox;
            //=========modify=======
            if (extent == null || extent == undefined) {
                extent = L.Projection.Extend.transformExtent("EPSG:4326", projection, wgs84BoundingBox);
            }
        }
        var tileGrid = this.createFromCapabilitiesMatrixSet(
			matrixSetObj, extent, matrixLimits, wgs84BoundingBox);

        /** @type {!Array.<string>} */
        var urls = [];
        var requestEncoding = config['requestEncoding'];
        requestEncoding = requestEncoding !== undefined ? requestEncoding : '';

        if ('OperationsMetadata' in wmtsCap && 'GetTile' in wmtsCap['OperationsMetadata']) {
            var gets = wmtsCap['OperationsMetadata']['GetTile']['DCP']['HTTP']['Get'];

            for (var i = 0, ii = gets.length; i < ii; ++i) {
                if (gets[i]['Constraint']) {
                    var constraint = L.Util.Array.find(gets[i]['Constraint'], function (element) {
                        return element['name'] == 'GetEncoding';
                    });
                    var encodings = constraint['AllowedValues']['Value'];

                    if (requestEncoding === '') {
                        // requestEncoding not provided, use the first encoding from the list
                        requestEncoding = encodings[0];
                    }
                    if (requestEncoding === L.WMTSRequestEncoding.KVP) {
                        if (L.Util.Array.includes(encodings, L.WMTSRequestEncoding.KVP)) {
                            urls.push( /** @type {string} */(gets[i]['href']));
                        }
                    } else {
                        break;
                    }
                } else if (gets[i]['href']) {
                    requestEncoding = L.WMTSRequestEncoding.KVP;
                    urls.push( /** @type {string} */(gets[i]['href']));
                }
            }
        }
        if (urls.length === 0) {
            requestEncoding = L.WMTSRequestEncoding.REST;
            l['ResourceURL'].forEach(function (element) {
                if (element['resourceType'] === 'tile') {
                    format = element['format'];
                    urls.push( /** @type {string} */(element['template']));
                }
            });
        }
        return {
            urls: urls,
            layer: config['layer'],
            matrixSet: matrixSet,
            format: format,
            projection: projection,
            requestEncoding: requestEncoding,
            tileGrid: tileGrid,
            style: style,
            dimensions: dimensions,
            wrapX: wrapX,
            crossOrigin: config['crossOrigin']
        };

    },
    createFromCapabilitiesMatrixSet: function (matrixSet, opt_extent,
		opt_matrixLimits, wgs84_extent) {
        /** @type {!Array.<number>} */
        var resolutions = [];
        /** @type {!Array.<string>} */
        var matrixIds = [];
        /** @type {!Array.<ol.Coordinate>} */
        var origins = [];
        /** @type {!Array.<ol.Size>} */
        var tileSizes = [];
        /** @type {!Array.<ol.Size>} */
        var sizes = [];

        var matrixLimits = opt_matrixLimits !== undefined ? opt_matrixLimits : [];
        var supportedCRSPropName = 'SupportedCRS';
        var matrixIdsPropName = 'TileMatrix';
        var identifierPropName = 'Identifier';
        var scaleDenominatorPropName = 'ScaleDenominator';
        var topLeftCornerPropName = 'TopLeftCorner';
        var tileWidthPropName = 'TileWidth';
        var tileHeightPropName = 'TileHeight';

        var code = matrixSet[supportedCRSPropName];
        projection = code;
        if (code && (code.indexOf("::") >= 0 || code.indexOf("urn:ogc:def:crs") >= 0)) {
            projection = code.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, '$1:$3');
        }

        var opt_lnglat_extent = null;
        if (!L.Util.isNull(opt_extent) && opt_extent.length > 0) {
            opt_lnglat_extent = new L.LatLngBounds(new L.LatLng(opt_extent[1], opt_extent[0]), new L.LatLng(opt_extent[3], opt_extent[2]));
        }

        var wgs84_lnglatExtent = null;
        if (!L.Util.isNull(wgs84_extent) && wgs84_extent.length > 0) {
            wgs84_lnglatExtent = new L.LatLngBounds(new L.LatLng(wgs84_extent[1], wgs84_extent[0]), new L.LatLng(wgs84_extent[3], wgs84_extent[2]));
        }


        //===========================================================================================
        var projectionObj = new L.Proj.CRS(projection);
        if (L.Util.isNull(projectionObj)) {
            throw "参考系未定义";
        }
        var metersPerUnit = L.Projection.Extend.getMetersPerUnit(projectionObj);
        // var metersPerUnit = projection.getMetersPerUnit();
        var switchOriginXY = L.Projection.Extend.getAxisOrientation(projectionObj).substr(0, 2) == 'ne';
        // var switchOriginXY = projection.getAxisOrientation().substr(0, 2) == 'ne';

        //*******************************************************************************************************

        // swap origin x and y coordinates if axis orientation is lat/long


        //var projection = ol.proj.get(code.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, '$1:$3')) ||
        //	ol.proj.get(code);
        matrixSet[matrixIdsPropName].sort(function (a, b) {
            return b[scaleDenominatorPropName] - a[scaleDenominatorPropName];
        });
        matrixSet[matrixIdsPropName].forEach(function (elt, index, array) {

            var matrixAvailable;
            // use of matrixLimits to filter TileMatrices from GetCapabilities
            // TileMatrixSet from unavailable matrix levels.
            if (matrixLimits.length > 0) {
                matrixAvailable = L.Util.Array.find(matrixLimits,
					function (elt_ml, index_ml, array_ml) {
					    return elt[identifierPropName] == elt_ml[matrixIdsPropName];
					});
            } else {
                matrixAvailable = true;
            }

            if (matrixAvailable) {
                matrixIds.push(elt[identifierPropName]);
                var resolution = elt[scaleDenominatorPropName] * 0.28E-3 / metersPerUnit;
                var tileWidth = elt[tileWidthPropName];
                var tileHeight = elt[tileHeightPropName];
                if (switchOriginXY) {
                    origins.push([elt[topLeftCornerPropName][1],
						elt[topLeftCornerPropName][0]
					]);
                } else {
                    origins.push(elt[topLeftCornerPropName]);
                }
                resolutions.push(resolution);
                tileSizes.push(tileWidth == tileHeight ?
					tileWidth : [tileWidth, tileHeight]);
                // top-left origin, so height is negative
                sizes.push([elt['MatrixWidth'], -elt['MatrixHeight']]);
            }
        });
        return {
            extent: opt_lnglat_extent,
            wgs84_extent: wgs84_lnglatExtent,
            origins: origins,
            resolutions: resolutions,
            matrixIds: matrixIds,
            tileSizes: tileSizes,
            sizes: sizes
        }

    }

});
L.tileLayer.wmtsGetCapabilities = function(url, options) {
    return new L.TileLayer.WmtsGetCapabilities(url, options);
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

L.TileLayer.WMTSService = L.TileLayer.extend({
    //判断是否前端是否设置了zoomOffset的参数,(内部使用)
    _isZoomOffset: false,
    //判断是否需要内部请求GetCapalities（内部使用）
    _isRequestCapatilies: false,
    //请求getCapalities的url地址
    _capalitiesUrl: null,
    options: {
        zIndex: 1,
        continuousWorld:true
    },
    initialize: function (opt_url, options) {
        if (typeof opt_url === 'object') {
            if (!L.Util.isNull(options)) {
                opt_url = L.obj.assign(opt_url, options);
            }
            options = opt_url;
            if (options.urls == undefined && options.url != undefined) {
                options.urls = [options.url];
            }
            if (options.tileGrid == undefined && options.matrixIds) {
                options.tileGrid = {};
                options.tileGrid.matrixIds = options.matrixIds;
            }
            this.initParams(options);
        } else {
            this._capalitiesUrl = opt_url;
            this._isRequestCapatilies = true;
            if (this._capalitiesUrl.toLowerCase().indexOf("http") < 0) {
                throw "wmts url请求参数错误";
                return;
            }
            if (L.Util.isNull(options.layer)) {
                throw "参数layer不能为空";
                return;
            }

        }
        this.opt_options = options;
        this.opt_options.noWrap = !L.Util.isNull(this.opt_options.noWrap) ? this.opt_options.noWrap : true;


        //判断是否前端是否设置了zoomOffset的参数
        if (!L.Util.isNull(options.zoomOffset)) {
            this._isZoomOffset = true;
        }
        var _options = L.setOptions(this, this.opt_options);
        this.options = L.Util.extend(this.options, _options);
        
    },


    initParams: function (options) {

        options = !L.Util.isNull(options) ? options : {};
        if (options.tileGrid.tileSizes && options.tileGrid.tileSizes.length > 0) {
            options.tileSize = options.tileGrid.tileSizes[0];
        }


        /**
        * @private
        * @type {string}
        */
        this.version_ = options.version !== undefined ? options.version : '1.0.0';

        /**
        * @private
        * @type {string}
        */
        this.format_ = options.format !== undefined ? options.format : 'image/jpeg';

        /**
        * @private
        * @type {!Object}
        */
        this.dimensions_ = options.dimensions !== undefined ? options.dimensions : {};

        /**
        * @private
        * @type {string}
        */
        this.layer_ = options.layer;

        /**
        * @private
        * @type {string}
        */
        this.matrixSet_ = options.matrixSet;

        /**
        * @private
        * @type {string}
        */
        this.style_ = options.style;
        /**
        * @private
        * @type {ol.source.WMTSRequestEncoding}
        */
        this.requestEncoding_ = options.requestEncoding !== undefined ?
        /** @type {ol.source.WMTSRequestEncoding} */(options.requestEncoding) :
         L.WMTSRequestEncoding.KVP;

        var urls = options.urls;
        if (urls === undefined && options.url !== undefined) {
            urls = this.expandUrl(options.url);
        }
        this.urls = urls;
        this.requestEncoding = this.requestEncoding_;

        // FIXME: should we create a default tileGrid?
        // we could issue a getCapabilities xhr to retrieve missing configuration
        this.tileGrid = options.tileGrid;
        this.context = {
            'layer': this.layer_,
            'style': this.style_,
            'tilematrixset': this.matrixSet_
        };

        if (this.requestEncoding == L.WMTSRequestEncoding.KVP) {
            this.context = L.obj.assign(this.context, {
                'Service': 'WMTS',
                'Request': 'GetTile',
                'Version': this.version_,
                'Format': this.format_
            });
        }
        //是否开启超出当前服务级数时使用缓存图片
        //public
        this.isNativeZoom = options.isNativeZoom != undefined ? options.isNativeZoom : true;


    },
    getTemplateUrl: function (coords) {
        var template = this._getUrl(coords);
        var context_ = this.context;
        template = (this.requestEncoding == L.WMTSRequestEncoding.KVP) ?
      L.Util.appendUrlParams(template, context_) :
      template.replace(/\{(\w+?)\}/g, function (m, p) {
          return (p.toLowerCase() in context_) ? context_[p.toLowerCase()] : m;
      });
        return template;
    },
    _getUrl: function (coords) {
        if (this.urls.length == 1) {
            return this.urls[0];
        } else {
            var h = (coords.x << coords.z) + coords.y;
            var index = L.Math.modulo(h, this.urls.length);
            return this.urls[index];
        }
    },


    onAdd: function (map) {
        if (this._isRequestCapatilies) {
            this.wmtsCap = L.tileLayer.wmtsGetCapabilities();
            this.wmtsCap.getGetCapabilities(this._capalitiesUrl, this._successBack.bind(this, map), this._errback.bind(this), this.opt_options);
        } else {
            this._crs = this.options.crs || map.options.crs;
            //this.setDisplayBounds();
            L.TileLayer.prototype.onAdd.call(this, map);
           // this.setMinMaxNativeZoom();
        }
    },
    _successBack: function (map, data) {
        //this.wmtsCap.optionsFromCapabilities(xml.xml_str2json(data), { layer: this.opt_options.layer });
        var opt = this.wmtsCap.optionsFromCapabilities(data, this.opt_options);
        opt = L.obj.assign(opt, this.opt_options);
        L.setOptions(this, opt);
        this.initParams(opt);
        this._crs = opt.crs || map.options.crs;
        //this.setDisplayBounds();
        L.TileLayer.prototype.onAdd.call(this, map);
        //this.setMinMaxNativeZoom();

    },
    _errback: function (err) {
        console.log(err);
    },
    /**
    *设置服务需要取缓存的最小级数或最大级数
    */
    setMinMaxNativeZoom: function () {
        if (this.isNativeZoom && !L.Util.isNull(this.tileGrid.resolutions)) {
            var minZoomOffset = this._map.getMapZoomByResolution(this.tileGrid.resolutions[0]);
            if (minZoomOffset != -1) {
                this.options.minNativeZoom = this.opt_options.minZoom != undefined ? this.opt_options.minZoom : minZoomOffset; //minZoomOffset
            }
            this.options.minZoom = this.opt_options.minZoom != undefined ? this.opt_options.minZoom : this._map.getMinZoom();

            var maxZoomOffset = this._map.getMapZoomByResolution(this.tileGrid.resolutions[this.tileGrid.resolutions.length - 1]);
            if (maxZoomOffset != -1) {
                this.options.maxNativeZoom = this.opt_options.maxZoom != undefined ? this.opt_options.maxZoom : maxZoomOffset; //minZoomOffset
            }
            this.options.maxZoom = this.opt_options.maxZoom != undefined ? this.opt_options.maxZoom : this._map.getMaxZoom();

        }
    },
    setDisplayBounds: function (bounds) {
        if (bounds) {
            this.options.bounds = bounds;
        } else {
            if (this.tileGrid && this.tileGrid.wgs84_extent) {
                this.options.bounds = this.tileGrid.wgs84_extent;
            }
        }
    },
    getTileUrl: function (coords) {

        var zoomIndex = coords.z;
        if (this._isZoomOffset) {
            zoomIndex = coords.z + this.options.zoomOffset;
        } else {
            if (!L.Util.isNull(this.tileGrid.resolutions)) {
                var nearLayerZoom = this._map.getNearestZoom(this.tileGrid.resolutions, coords.z);
                if (nearLayerZoom == coords.z) {
                    zoomIndex = nearLayerZoom;
                } else {
                    if (nearLayerZoom >= 0) {
                        zoomIndex = nearLayerZoom;
                    }
                }
            }
        }
        if (zoomIndex < 0) {
            return;

        }
        var localContext = {
            'TileMatrix': this.tileGrid.matrixIds[zoomIndex],
            'TileCol': coords.x,
            'TileRow': coords.y
        };
        var url = this.getTemplateUrl(coords);
        if (this.requestEncoding == L.WMTSRequestEncoding.KVP) {
            url = L.Util.appendUrlParams(url, localContext)
        } else {
            url = url.replace(/\{(\w+?)\}/g, function (m, p) {
                return localContext[p];
            });
        }
        if (!L.Util.isNull(this.options.transparent)) {
            url += "&transparent=" + this.options.transparent;
        }
        if (!L.Util.isNull(this.options.outputtransparentcolor)) {
            url += "&outputtransparentcolor=" + this.options.outputtransparentcolor;
        }

        return url;
    },
    expandUrl: function (url) {
        var urls = [];
        var match = /\{([a-z])-([a-z])\}/.exec(url);
        if (match) {
            // char range
            var startCharCode = match[1].charCodeAt(0);
            var stopCharCode = match[2].charCodeAt(0);
            var charCode;
            for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
                urls.push(url.replace(match[0], String.fromCharCode(charCode)));
            }
            return urls;
        }
        match = match = /\{(\d+)-(\d+)\}/.exec(url);
        if (match) {
            // number range
            var stop = parseInt(match[2], 10);
            for (var i = parseInt(match[1], 10); i <= stop; i++) {
                urls.push(url.replace(match[0], i.toString()));
            }
            return urls;
        }
        urls.push(url);
        return urls;
    },

    // @method setParams(params: Object, noRedraw?: Boolean): this
    // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
    setParams: function (params, noRedraw) {

        L.extend(this.context, params);

        if (!noRedraw) {
            this.redraw();
        }

        return this;
    }

});


// @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
// Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
L.tileLayer.wmtsService = function (url, options) {
    return new L.TileLayer.WMTSService(url, options);
};

//==========================================================extend-end======================================================


/***/ })
/******/ ]);
});
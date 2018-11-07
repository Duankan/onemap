(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ktop_theme"] = factory();
	else
		root["ktop_theme"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KTW; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leaflet_leaflet1_3_1_leaflet__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leaflet_leaflet1_3_1_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__leaflet_leaflet1_3_1_leaflet__);
﻿

var KTW=window.KTW=window.KTW||{};

KTW.Util=KTW.Util||{};
KTW.Feature=KTW.Feature||{};
KTW.Object=KTW.Object||{};
KTW.Map=KTW.Map||{};
KTW.LevelRenderer=KTW.LevelRenderer||{};
KTW.LevelRenderer.Tool = KTW.LevelRenderer.Tool ||{};
KTW.LevelRenderer.Animation = KTW.LevelRenderer.Animation||{};
KTW.Feature = KTW.Feature || {};
KTW.Feature.ShapeParameters = KTW.Feature.ShapeParameters||{};

__WEBPACK_IMPORTED_MODULE_0__leaflet_leaflet1_3_1_leaflet___default.a.KTW=KTW;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return extendDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return copyExcluce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return getElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return removeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return indexOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return modifyDOMElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return applyDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return getParameterString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return getWFParameterString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return urlAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return getParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return IS_GECKO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return getBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return isSupportCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return supportCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return isInTheSameDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return toJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return transformResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return copyAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return copyAttributesWithClip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return cloneObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return newGuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return bindAsEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return getTopAnalysisResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ChineseToUtf8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DeepMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return mixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(0);
﻿


var extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event === "function"
            && source instanceof window.Event;

        if (!sourceIsEvt
            && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
/**
 * @description 判断一个对象是否是数组。
 * @param a - {Object} 对象。
 * @return {boolean} 是否是数组。
 */
var isArray = function (a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
};
var extendDeep = function (destination, source) {
    var i, toStr = Object.prototype.toString, astr = "[object Array]";
    destination = destination || {};
    for (i in source) {
        if (source.hasOwnProperty(i)) {
            if (typeof source[i] === "object") {
                if (toStr.call(destination[i]) === '[object Null]' || toStr.call(destination[i]) === '[object Undefined]') {
                    destination[i] = (toStr.call(source[i]) === astr) ? [] : {};
                }
                extendDeep(destination[i], source[i]);
            } else {
                destination[i] = source[i];
            }
        }
    }
    return destination;
};
/**
 * @description 对象拷贝。
 * @param des - {Object} 目标对象。
 * @param soc - {Object} 源对象
 */
var copy = function (des, soc) {
    des = des || {};
    var v;
    if (soc) {
        for (var p in des) {
            v = soc[p];
            if (typeof v !== 'undefined') {
                des[p] = v;
            }
        }
    }
};

/**
* @description 对象拷贝。
* @param des - {Object} 目标对象。
* @param soc - {Object} 源对象
*/
var copyExcluce = function (des, soc, exclude) {
    des = des || {};
    var v;
    if (soc) {
        for (var p in soc) {
            v = soc[p];
            if (typeof v !== 'undefined' && typeof v !== 'function') {
                if (exclude.indexOf(p) < 0) {
                    des[p] = v;
                }
            }
        }
    }
};
/**
 * @description 销毁对象，将其属性置空
 * @param obj - {Object} 目标对象。
 */
var reset = function (obj) {
    obj = obj || {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (typeof obj[p] === "object" && obj[p] instanceof Array) {
                for (var i in obj[p]) {
                    if (obj[p][i].destroy) {
                        obj[p][i].destroy();
                    }
                }
                obj[p].length = 0;
            } else if (typeof obj[p] === "object" && obj[p] instanceof Object) {
                if (obj[p].destroy) {
                    obj[p].destroy();
                }
            }
            obj[p] = null;
        }
    }
};

/**
 * @description 获取HTML元素数组。
 * @param argument - {String | HTMLElement | Window}
 * @return {Array<HTMLElement>} HTML元素数组。
 */
var getElement = function () {
    var elements = [];

    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

/**
 * @description instance of的跨浏览器实现。
 * @param o - {Object} 对象。
 * @return {boolean} 是否是页面元素
 */
var isElement = function (o) {
    return !!(o && o.nodeType === 1);
};




/**
 * @description 从数组中删除某一项。
 * @param array - {Array} 数组。
 * @param item - {Object} 数组中要删除的一项。
 * @return {Array} 执行删除操作后的数组。
 */
var removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
            array.splice(i, 1);
            //break;more than once??
        }
    }
    return array;
};

/**
 * @description 获取某对象再数组中的索引值。
 * @param array - {Array} 数组。
 * @param obj - {Object} 对象。
 * @return {number} 某对象再数组中的索引值。
 */
var indexOf = function (array, obj) {
    if (array == null) {
        return -1;
    } else {
        // use the build-in function if available.
        if (typeof array.indexOf === "function") {
            return array.indexOf(obj);
        } else {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
};


/**
 * @description 修改某DOM元素的许多属性。
 * @param element - {HTMLElement} 待修改的DOM元素。
 * @param id - {string} DOM元素的id。
 * @param px - {SuperMap.Pixel} 包含DOM元素的style属性的left和top属性。
 * @param sz - {SuperMap.Size} 包含DOM元素的width和height属性。
 * @param position - {string} DOM元素的position属性。
 * @param border - {string} DOM元素的style属性的border属性。
 * @param overflow - {string} DOM元素的style属性的overflow属性。
 * @param opacity - {number} 不透明度值。取值范围为 (0.0 - 1.0)。
 */
var modifyDOMElement = function (element, id, px, sz, position,
                                           border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};


/**
 * @description Takes an object and copies any properties that don't exist from
 *     another properties, by analogy with SuperMap.Util.extend() from
 *     Prototype.js.
 *
 * @param to -{Object} The destination object.
 * @param from -{Object} The source object.  Any properties of this object that
 *     are undefined in the to object will be set on the to object.
 *
 * @return {Object} A reference to the to object.  Note that the to argument is modified
 *     in place and returned by this function.
 */
var applyDefaults = function (to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === "function"
        && from instanceof window.Event;

    for (var key in from) {
        if (to[key] === undefined ||
            (!fromIsEvt && from.hasOwnProperty
                && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if (!fromIsEvt && from && from.hasOwnProperty
        && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }

    return to;
};


/**
 * @param params - {Object} 参数对象。
 * @return {string} HTTP的GEI请求中的参数字符串。
 * @description 将参数对象转换为HTTP的GEI请求中的参数字符串。例如："key1=value1&key2=value2&key3=value3"。
 */
var getParameterString = function (params) {
    var paramsArray = [];

    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value !== 'function')) {
            var encodedValue;
            if (typeof value === 'object' && value.constructor === Array) {
                /* value is an array; encode items and separate with "," */
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent(
                        (item === null || item === undefined) ? "" : item)
                    );
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                /* value is a string; simply encode */
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }

    return paramsArray.join("&");
};

//获取工作流参数字符串
var getWFParameterString = function (params) {
    var paramsArray = [];

    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value !== 'function')) {
            var encodedValue;
            if (typeof value === 'object' && value.constructor === Array) {
                /* value is an array; encode items and separate with "," */
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent(
                        (item === null || item === undefined) ? "" : item)
                    );
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                /* value is a string; simply encode */
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + ":" + encodedValue);
        }
    }

    return paramsArray.join(";");
};

/**
 * @description 给url追加参数。
 * @param url - {string} 待追加参数的url字符串。
 * @param paramStr - {string} 待追加的参数。
 * @return {string} The new url
 */
var urlAppend = function (url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ?
            paramStr :
            parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};

/**
 * @description 从URL字符串中解析出参数对象。
 * @param url - {string} url。
 * @return {Object} 解析出的参数对象。
 */
var getParameters = function (url) {
    // if no url specified, take it from the location bar
    url = (url === null || url === undefined) ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = "";
    if (SuperMap.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = SuperMap.String.contains(url, "#") ?
            url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }

    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {

            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }

            // being liberal by replacing "+" with " "
            var value = (keyValue[1] || '').replace(/\+/g, " ");

            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }

            // follow OGC convention of comma delimited values
            value = value.split(",");

            //if there's only one value, do not return as array                    
            if (value.length == 1) {
                value = value[0];
            }

            parameters[key] = value;
        }
    }
    return parameters;
};
/**
 * @memberOf SuperMap
 * @description 如果userAgent捕获到浏览器使用的是Gecko引擎则返回true。
 * @constant
 */
var  IS_GECKO = (function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") === -1 && ua.indexOf("gecko") !== -1;
})();

/**
 * @memberOf SuperMap
 * @description 浏览器名称，依赖于userAgent属性，BROWSER_NAME可以是空，或者以下浏览器：
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 * @constant
 */
var Browser = (function () {
    var name = '', version = '', device = 'pc', uaMatch;
    //以下进行测试
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") > -1 || (ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1)) {
        name = 'msie';
        uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
    } else if (ua.indexOf("chrome") > -1) {
        name = 'chrome';
        uaMatch = ua.match(/chrome\/([\d.]+)/);
    } else if (ua.indexOf("firefox") > -1) {
        name = 'firefox';
        uaMatch = ua.match(/firefox\/([\d.]+)/);
    } else if (ua.indexOf("opera") > -1) {
        name = 'opera';
        uaMatch = ua.match(/version\/([\d.]+)/);
    } else if (ua.indexOf("safari") > -1) {
        name = 'safari';
        uaMatch = ua.match(/version\/([\d.]+)/);
    }
    version = uaMatch ? uaMatch[1] : '';

    if (ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("iphone") > -1) {
        device = 'apple';
    } else if (ua.indexOf("android") > -1) {
        uaMatch = ua.match(/version\/([\d.]+)/);
        version = uaMatch ? uaMatch[1] : '';
        device = 'android';
    }
    return {name: name, version: version, device: device};
})();

/**
 * @description 获取浏览器相关信息。支持的浏览器包括：Opera，Internet Explorer，Safari，Firefox。
 * @return {Object} 获取浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
 */
var getBrowser = function () {
    return Browser;
};

/**
 * @description 浏览器是否支持Canvas。
 * @return {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
var isSupportCanvas = (function () {
    var checkRes = true, broz = getBrowser();
    if (document.createElement("canvas").getContext) {
        if (broz.name === 'firefox' && parseFloat(broz.version) < 5) {
            checkRes = false;
        }
        if (broz.name === 'safari' && parseFloat(broz.version) < 4) {
            checkRes = false;
        }
        if (broz.name === 'opera' && parseFloat(broz.version) < 10) {
            checkRes = false;
        }
        if (broz.name === 'msie' && parseFloat(broz.version) < 9) {
            checkRes = false;
        }
    } else {
        checkRes = false;
    }
    return checkRes;
})();

/**
 * @description 判断；浏览器是否支持Canvas。
 * @return {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
var supportCanvas = function () {
    return isSupportCanvas;
};



/**
 * @description 判断一个 URL 请求是否在当前域中。
 * @param url - {string}  URL 请求字符串。
 * @return {boolean} URL请求是否在当前域中。
 */
var isInTheSameDomain = function (url) {
    if (!url) {
        return true;
    }
    var index = url.indexOf("//");
    var documentUrl = document.location.toString();
    var documentIndex = documentUrl.indexOf("//");
    if (index === -1) {
        return true;
    } else {
        var protocol;
        var substring = protocol = url.substring(0, index);
        var documentSubString = documentUrl.substring(documentIndex + 2);
        documentIndex = documentSubString.indexOf("/");
        var documentPortIndex = documentSubString.indexOf(":");
        var documentDomainWithPort = documentSubString.substring(0, documentIndex);
        //var documentPort;

        var documentprotocol = document.location.protocol;
        if (documentPortIndex !== -1) {
            // documentPort = +documentSubString.substring(documentPortIndex, documentIndex);
        } else {
            documentDomainWithPort += ':' + (documentprotocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
            return false;
        }
        substring = url.substring(index + 2);
        var portIndex = substring.indexOf(":");
        index = substring.indexOf("/");
        var domainWithPort = substring.substring(0, index);
        var domain;
        if (portIndex !== -1) {
            domain = substring.substring(0, portIndex);
        } else {
            domain = substring.substring(0, index);
            domainWithPort += ':' + (protocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        var documentDomain = document.domain;
        if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
            return true;
        }
    }
    return false;
};


/**
 * @description 将对象转换成 JSON 字符串。
 * @param obj - {Object} 要转换成 JSON 的 Object 对象。
 * @return {string} 返回转换后的 JSON 对象。
 */
var toJSON = function (obj) {
    var objInn = obj;
    if (objInn == null) {
        return null;
    }
    switch (objInn.constructor) {
        case String:
            //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
            objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
            objInn = objInn.replace(/\n/g, "\\n");
            objInn = objInn.replace(/\r/g, "\\r");
            objInn = objInn.replace("<", "&lt;");
            objInn = objInn.replace(">", "&gt;");
            objInn = objInn.replace(/%/g, "%25");
            objInn = objInn.replace(/&/g, "%26");
            return objInn;
        case Array:
            var arr = [];
            for (var i = 0, len = objInn.length; i < len; i++) {
                arr.push(toJSON(objInn[i]));
            }
            return "[" + arr.join(",") + "]";
        case Number:
            return isFinite(objInn) ? String(objInn) : null;
        case Boolean:
            return String(objInn);
        case Date:
            var dateStr = "{" + "'__type':\"System.DateTime\"," +
                "'Year':" + objInn.getFullYear() + "," +
                "'Month':" + (objInn.getMonth() + 1) + "," +
                "'Day':" + objInn.getDate() + "," +
                "'Hour':" + objInn.getHours() + "," +
                "'Minute':" + objInn.getMinutes() + "," +
                "'Second':" + objInn.getSeconds() + "," +
                "'Millisecond':" + objInn.getMilliseconds() + "," +
                "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
            return dateStr;
        default:
            //if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
            //    return objInn.toJSON();
            //}
            if (typeof objInn === "object") {
                if (objInn.length) {
                    var arr = [];
                    for (var i = 0, len = objInn.length; i < len; i++) {
                        arr.push(toJSON(objInn[i]));
                    }
                    return "[" + arr.join(",") + "]";
                }
                var arr1 = [];
                for (var attr in objInn) {
                    if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME") {
                        arr1.push("'" + attr + "':" + toJSON(objInn[attr]));
                    }
                }

                if (arr1.length > 0) {
                    return "{" + arr1.join(",") + "}";
                } else {
                    return "{}";
                }
            }
            return objInn.toString();
    }
};




/**
 * @description 转换查询结果。
 * @param result - {Object} 查询结果。
 * @return {Object} 转换后的查询结果。
 */
var transformResult = function (result) {
    if (result.responseText && typeof result.responseText === "string") {
        result = JSON.parse(result.responseText);
    }
    return result;
};

/**
 * @description 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
 * @param destination - {Object} 拷贝目标。
 * @param source - {Object} 源对象。
 *
 */
var copyAttributes = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/**
 * @description 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象。
 * @param clip - {Array<string>} 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
 *
 */
var copyAttributesWithClip = function (destination, source, clip) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            //去掉禁止拷贝的属性
            var isInClip = false;
            if (clip && clip.length) {
                for (var i = 0, len = clip.length; i < len; i++) {
                    if (property === clip[i]) {
                        isInClip = true;
                        break;
                    }
                }
            }
            if (isInClip === true) {
                continue;
            }

            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/**
 * @description 克隆一份Object对象
 * @param obj - {Object}  需要克隆的对象。
 * @return {Object} 返回对象的拷贝对象，注意是新的对象，不是指向。
 */
var cloneObject = function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) {
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = obj.slice(0);
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = cloneObject(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

var newGuid = function () {
    /// <summary>生成一个guid</summary>
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
};

var bind = function (func, object) {
    // create a reference to all arguments past the second one
    var args = Array.prototype.slice.apply(arguments, [2]);
    return function () {
        // Push on any additional arguments from the actual function call.
        // These will come after those sent to the bind call.
        var newArgs = args.concat(
            Array.prototype.slice.apply(arguments, [0])
        );
        return func.apply(object, newArgs);
    };
};

/**
    * @description 绑定函数到对象,在调用该函数时配置并使用事件对象作为第一个参数.
    * @param func - {function} 用于监听事件的函数.
    * @param object - {Object} this 对象的引用.
    * @returns {function}
    */
var bindAsEventListener = function (func, object) {
    return function (event) {
        return func.call(object, event || window.event);
    };
};

var getTopAnalysisResult = function (data) {
    /// <summary>解析拓扑分析的服务器REST返回结果，以更友好的形式返回给客户端</summary>
    var enumNum = data.result.value;
    switch (enumNum) {
        case 0:
            return "Intersect";
        case 1:
            return "Disjoin";
        case 2:
            return "Include";
        case 3:
            return "Adjacent";
        default:
            return "Unknown";
    }
};

var ChineseToUtf8 = function(s){ 
      return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,function(newStr){
            return EncodeUtf8(newStr); 
　　　　　　}); 
} ;
var EncodeUtf8 = function(s1)
{
      var s = escape(s1);
      var sa = s.split("%");
      var retV ="";
      if(sa[0] != "")
      {
         retV = sa[0];
      }
      for(var i = 1; i < sa.length; i ++)
      {
           if(sa[i].substring(0,1) == "u")
           {
               retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));

           }
           else retV += "%" + sa[i];
      }

      return retV;
};
var Str2Hex = function(s)
{
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++)
      {
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += Dec2Dig(eval(n));

      }
      //return value;
      return digS;
};
var Hex2Utf8 = function(s)
{
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16)
     {
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" + s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++)
         {
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);



            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
} ;
var Dig2Dec = function(s)
{
      var retV = 0;
      if(s.length == 4)
      {
          for(var i = 0; i < 4; i ++)
          {
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
};

var Dec2Dig = function(n1)
{
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++)
      {
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2)
         {
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';

      }
      return s;
}; 
//深度合并
var DeepMerge = function(obj1,obj2){
    if(Object.prototype.toString.call(obj1) === '[object Object]' && Object.prototype.toString.call(obj2) === '[object Object]'){
        for(var prop2 in obj2){//obj1无值,都有取obj2
            if(!obj1[prop2]){
                obj1[prop2] =obj2[prop2];
            }else{//递归赋值
                obj1[prop2]=DeepMerge(obj1[prop2],obj2[prop2]);
            }
        }
    }else if(Object.prototype.toString.call(obj1) === '[object Array]' && Object.prototype.toString.call(obj2) === '[object Array]'){
        // 两个都是数组，进行合并
        obj1=obj1.concat(obj2);
    }else{//其他情况，取obj2的值
        obj1 = obj2;
    }
    return obj1;
};

    /**
     * Method: mergeItem
     * 合并源对象的单个属性到目标对象。
     *
     * Parameters:
     * target - {Object} 目标对象。
     * source - {Object} 源对象。
     * key - {String} 键。
     * overwrite - {Boolean} 是否覆盖。
     *
     * Returns:
     * {Object} 目标对象。
     */
var mergeItem = function(target, source, key, overwrite) {
    var BUILTIN_OBJECT = {
            '[object Function]': 1,
            '[object RegExp]': 1,
            '[object Date]': 1,
            '[object Error]': 1,
            '[object CanvasGradient]': 1
    };
    if (source.hasOwnProperty(key)) {
        if (typeof target[key] == 'object'
            && !BUILTIN_OBJECT[Object.prototype.toString.call(target[key])]
        ) {
            // 如果需要递归覆盖，就递归调用merge
            merge(
                target[key],
                source[key],
                overwrite
            );
        } else if (overwrite || !(key in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[key] = source[key];
        }
    }
};


    /**
     * APIMethod: merge
     * 合并源对象的属性到目标对象。
     *
     * Parameters:
     * target - {Object} 目标对象。
     * source - {Object} 源对象。
     * overwrite - {Boolean} 是否覆盖。
     *
     * Returns:
     * {Object} 目标对象。
     */
var merge = function(target, source, overwrite) {
    for (var i in source) {
        mergeItem(target, source, i, overwrite);
    }
    return target;
};

/**
 * @description 实现多重继承
 * @memberOf SuperMap
 * @param ...mixins {Class|Object}继承的类
 */
var mixin = function (...mixins) {

    class Mix {
        constructor(options) {
            for (var index = 0; index < mixins.length; index++) {
                copyProperties(this, new mixins[index](options));
            }
        }
    }

    for (var index = 0; index < mixins.length; index++) {
        var mixin = mixins[index];
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
        copyProperties(Mix.prototype, new mixin());
    }
    return Mix;

    function copyProperties(target, source) {
        var ownKeys = Object.getOwnPropertyNames(source);
        if (Object.getOwnPropertySymbols) {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source));
        }
        for (var index = 0; index < ownKeys.length; index++) {
            var key = ownKeys[index];
            if (key !== "constructor"
                && key !== "prototype"
                && key !== "name" && key !== "length") {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                if (window["ActiveXObject"]) {
                    Object.defineProperty(target, key, desc || {});
                } else {
                    Object.defineProperty(target, key, desc);
                }
            }
        }
    }
};

__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.extend =  extend;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.isArray= isArray;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.extendDeep =extendDeep;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.copy = copy;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.copyExcluce = copyExcluce;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.reset = reset;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.getElement = getElement;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.isElement = isElement;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.removeItem = removeItem;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.indexOf = indexOf;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.modifyDOMElement = modifyDOMElement;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.applyDefaults =applyDefaults;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.getParameterString = getParameterString;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.getWFParameterString = getWFParameterString;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.urlAppend = urlAppend;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.getParameters = getParameters;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].IS_GECKO = IS_GECKO;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Browser = Browser;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.getBrowser = getBrowser;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.isSupportCanvas = isSupportCanvas;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.supportCanvas = supportCanvas;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.isInTheSameDomain = isInTheSameDomain;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.toJSON = toJSON;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.transformResult = transformResult;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.copyAttributes = copyAttributes;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.copyAttributesWithClip = copyAttributesWithClip;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.cloneObject = cloneObject;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.newGuid = newGuid;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.bind = bind;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.bindAsEventListener = bindAsEventListener;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.getTopAnalysisResult = getTopAnalysisResult;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.ChineseToUtf8 = ChineseToUtf8;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.DeepMerge = DeepMerge;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.merge = merge;
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Util.mixin = mixin;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Eventful__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Transformable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SUtil__ = __webpack_require__(3);







/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape
 * 图形（shape）基类。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Eventful>
 *  - <SuperMap.LevelRenderer.Transformable>
 */
class Shape extends Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["A" /* mixin */])(__WEBPACK_IMPORTED_MODULE_2__Eventful__["a" /* Eventful */], __WEBPACK_IMPORTED_MODULE_3__Transformable__["a" /* Transformable */]) {

    /**
     * Constructor: SuperMap.LevelRenderer.Shape
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);

        options = options || {};
        /**
         * APIProperty: id
         * {String} 唯一标识。
         */
        this.id = null;

        /**
         * APIProperty: style
         * {Object} 基础绘制样式。
         *
         * Symbolizer properties:
         * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
         * color - {String} 填充颜色。默认值："#000000'"。
         * strokeColor - {String} 描边颜色。默认值："#000000'"。
         * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
         * lineWidth - {Number} 描边宽度。默认值：1。
         * opacity - {Number} 绘制透明度。默认值：1。
         * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
         * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
         * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
         * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
         * text - {String} 图形中的附加文本。默认值：""。
         * textColor - {String} 文本颜色。默认值："#000000'"。
         * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
         * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
         * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
         * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
         *
         */
        this.style = {};

        /**
         * APIProperty: style.__rect
         * {Object} 包围图形的最小矩形盒子。该对象包含以下属性：
         *
         * Symbolizer properties:
         * x - {Number} 左上角顶点x轴坐标。
         * y - {Number} 左上角顶点y轴坐标。
         * width - {Number} 包围盒矩形宽度。
         * height - {Number} 包围盒矩形高度。
         */

        /**
         * Property: highlightStyle
         * {Object} 高亮样式。
         *
         * Symbolizer properties:
         * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
         * color - {String} 填充颜色。默认值："#000000'"。
         * strokeColor - {String} 描边颜色。默认值："#000000'"。
         * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
         * lineWidth - {Number} 描边宽度。默认值：1。
         * opacity - {Number} 绘制透明度。默认值：1。
         * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
         * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
         * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
         * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
         * text - {String} 图形中的附加文本。默认值：""。
         * textColor - {String} 文本颜色。默认值："#000000'"。
         * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
         * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
         * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
         * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
         */
        this.highlightStyle = null;

        /**
         * APIProperty: parent
         * {Object} 父节点，只读属性。<SuperMap.LevelRenderer.Group>
         */
        this.parent = null;

        /**
         * Property: __dirty
         * {Boolean}
         */
        this.__dirty = true;

        /**
         * Property: __clipShapes
         * {Array}
         */
        this.__clipShapes = [];

        /**
         * APIProperty: invisible
         * {Boolean} 图形是否可见，为 true 时不绘制图形，但是仍能触发鼠标事件。默认值：false。
         */
        this.invisible = false;

        /**
         * APIProperty: ignore
         * {Boolean} 图形是否忽略，为 true 时忽略图形的绘制以及事件触发。默认值：false。
         */
        this.ignore = false;

        /**
         * APIProperty: zlevel
         * {Number} z 层 level，决定绘画在哪层 canvas 中。默认值：0。
         */
        this.zlevel = 0;

        /**
         * APIProperty: draggable
         * {Boolean} 是否可拖拽。默认值：false。
         */
        this.draggable = false;

        /**
         * APIProperty: clickable
         * {Boolean} 是否可点击。默认值：false。
         */
        this.clickable = false;

        /**
         * APIProperty: hoverable
         * {Boolean} 是否可以 hover。默认值：true。
         */
        this.hoverable = true;

        /**
         * APIProperty: z
         * {Number} z值，跟zlevel一样影响shape绘制的前后顺序，z值大的shape会覆盖在z值小的上面，
         * 但是并不会创建新的canvas，所以优先级低于zlevel，而且频繁改动的开销比zlevel小很多。
         * 默认值：0。
         */
        this.z = 0;

        //地理扩展
        /**
         * APIProperty: refOriginalPosition
         * {Array} 图形参考原点位置，图形的参考中心位置。
         * refOriginalPosition 是长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         *
         * refOriginalPosition 表示图形的参考中心，通常情况下，图形是使用 canvas 的原点位置作为位置参考，
         * 但 refOriginalPosition 可以改变图形的参考位置，例如： refOriginalPosition = [80, 80],
         * 图形圆的 style.x = 20, style.y = 20，那么圆在 canvas 中的实际位置是 [100, 100]。
         *
         * 图形（Shape） 的所有位置相关属性都是以 refOriginalPosition 为参考中心，
         * 也就是说图形的所有位置信息在 canvas 中都是以 refOriginalPosition 为参考的相对位置，只有
         * refOriginalPosition 的值为 [0, 0] 时，形的位置信息才是 canvas 绝对位置。
         *
         * 图形的位置信息通常有：style.pointList，style.x，style.y。
         *
         * refOriginalPosition。默认值是： [0, 0]。
         */
        this.refOriginalPosition = [0, 0];

        /**
         * APIProperty: refDataID
         * {String} 图形所关联数据的 ID。
         *
         */
        this.refDataID = null;

        /**
         * APIProperty: isHoverByRefDataID
         * {Boolean} 是否根据 refDataID 进行高亮。用于同时高亮所有 refDataID 相同的图形。
         *
         */
        this.isHoverByRefDataID = false;

        /**
         * APIProperty: refDataHoverGroup
         * {String} 高亮图形组的组名。此属性在 refDataID 有效且 isHoverByRefDataID 为 true 时生效。
         * 一旦设置此属性，且属性值有效，只有关联同一个数据的图形且此属性相同的图形才会高亮。
         *
         */
        this.refDataHoverGroup = null;

        /**
         * APIProperty: dataInfo
         * {Object} 图形的数据信息。
         *
         */
        this.dataInfo = null;
        Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["m" /* extend */])(this, options);
        this.id = this.id  || Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])();
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape";
        /**
         * APIMethod: getTansform
         * 变换鼠标位置到 shape 的局部坐标空间
         *
         */
        this.getTansform = (function () {
            var invTransform = [];

            return function (x, y) {
                var originPos = [x, y];
                // 对鼠标的坐标也做相同的变换
                if (this.needTransform && this.transform) {
                    __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_matrix.invert(invTransform, this.transform);

                    __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_matrix.mulVector(originPos, invTransform, [x, y, 1]);

                    if (x == originPos[0] && y == originPos[1]) {
                        // 避免外部修改导致的 needTransform 不准确
                        this.updateNeedTransform();
                    }
                }
                return originPos;
            };
        })();

    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.id = null;
        this.style = null;
        this.highlightStyle = null;
        this.parent = null;
        this.__dirty = null;
        this.__clipShapes = null;
        this.invisible = null;
        this.ignore = null;
        this.zlevel = null;
        this.draggable = null;
        this.clickable = null;
        this.hoverable = null;
        this.z = null;

        this.refOriginalPosition = null;
        this.refDataID = null;
        this.refDataHoverGroup = null;
        this.isHoverByRefDataID = null;
        this.dataInfo = null;
        super.destroy();
    }


    /**
     * APIMethod: brush
     * 绘制图形。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * isHighlight - {Boolean} 是否使用高亮属性。
     * updateCallback - {Function} 需要异步加载资源的 shape 可以通过这个 callback(e),
     * 让painter更新视图，base.brush 没用，需要的话重载 brush。
     *
     */
    brush(ctx, isHighlight) {

        var style = this.beforeBrush(ctx, isHighlight);

        ctx.beginPath();
        this.buildPath(ctx, style);

        switch (style.brushType) {
            /* jshint ignore:start */
            case 'both':
                this.setCtxGlobalAlpha(ctx, "fill", style);
                ctx.fill();
                if (style.lineWidth > 0) {
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    ctx.stroke();
                }
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
            case 'stroke':
                this.setCtxGlobalAlpha(ctx, "stroke", style);
                style.lineWidth > 0 && ctx.stroke();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
            /* jshint ignore:end */
            default:
                this.setCtxGlobalAlpha(ctx, "fill", style);
                ctx.fill();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
        }

        this.drawText(ctx, style, this.style);

        this.afterBrush(ctx);
    }


    /**
     * APIMethod: beforeBrush
     * 具体绘制操作前的一些公共操作。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * isHighlight - {Boolean} 是否使用高亮属性。
     *
     * Returns:
     * {Object} 处理后的样式。
     */
    beforeBrush(ctx, isHighlight) {
        var style = this.style;

        if (this.brushTypeOnly) {
            style.brushType = this.brushTypeOnly;
        }

        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style,
                this.highlightStyle || {},
                this.brushTypeOnly
            );
        }

        if (this.brushTypeOnly == 'stroke') {
            style.strokeColor = style.strokeColor || style.color;
        }

        ctx.save();

        this.doClip(ctx);

        this.setContext(ctx, style);

        // 设置transform
        this.setTransform(ctx);

        return style;
    }


    /**
     * APIMethod: afterBrush
     * 绘制后的处理。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     *
     */
    afterBrush(ctx) {
        ctx.restore();
    }


    /**
     * APIMethod: setContext
     * 设置 fillStyle, strokeStyle, shadow 等通用绘制样式。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} 样式。
     *
     */
    setContext(ctx, style) {
        var STYLE_CTX_MAP = [
            ['color', 'fillStyle'],
            ['strokeColor', 'strokeStyle'],
            ['opacity', 'globalAlpha'],
            ['lineCap', 'lineCap'],
            ['lineJoin', 'lineJoin'],
            ['miterLimit', 'miterLimit'],
            ['lineWidth', 'lineWidth'],
            ['shadowBlur', 'shadowBlur'],
            ['shadowColor', 'shadowColor'],
            ['shadowOffsetX', 'shadowOffsetX'],
            ['shadowOffsetY', 'shadowOffsetY']
        ];

        for (var i = 0, len = STYLE_CTX_MAP.length; i < len; i++) {
            var styleProp = STYLE_CTX_MAP[i][0];
            var styleValue = style[styleProp];
            var ctxProp = STYLE_CTX_MAP[i][1];

            if (typeof styleValue != 'undefined') {
                ctx[ctxProp] = styleValue;
            }
        }
    }


    /**
     * Method: doClip
     *
     */
    doClip(ctx) {
        var clipShapeInvTransform = __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_matrix.create();

        if (this.__clipShapes) {
            for (var i = 0; i < this.__clipShapes.length; i++) {
                var clipShape = this.__clipShapes[i];
                if (clipShape.needTransform) {
                    let m = clipShape.transform;
                    __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_matrix.invert(clipShapeInvTransform, m);
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
                ctx.beginPath();
                clipShape.buildPath(ctx, clipShape.style);
                ctx.clip();
                // Transform back
                if (clipShape.needTransform) {
                    let m = clipShapeInvTransform;
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
            }
        }
    }


    /**
     * APIMethod: getHighlightStyle
     * 根据默认样式扩展高亮样式
     *
     * Parameters:
     * style - {Object} 样式。
     * highlightStyle - {Object} 高亮样式。
     * brushTypeOnly - {String} brushTypeOnly。
     *
     */
    getHighlightStyle(style, highlightStyle, brushTypeOnly) {
        var newStyle = {};
        for (let k in style) {
            newStyle[k] = style[k];
        }

        var highlightColor = __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_color.getHighlightColor();
        // 根据highlightStyle扩展
        if (style.brushType != 'stroke') {
            // 带填充则用高亮色加粗边线
            newStyle.strokeColor = highlightColor;
            // SMIC-方法修改 - start
            newStyle.lineWidth = (style.lineWidth || 1);
            // 原始代码
            //      newStyle.lineWidth = (style.lineWidth || 1)
            //          + this.getHighlightZoom();
            // 修改代码1
            // if(!style.lineType || style.lineType === "solid"){
            //     newStyle.lineWidth = (style.lineWidth || 1)
            //         + this.getHighlightZoom();
            // }
            // else{
            //     newStyle.lineWidth = (style.lineWidth || 1);
            // }
            // SMIC-方法修改 - end
            newStyle.brushType = 'both';
        } else {
            if (brushTypeOnly != 'stroke') {
                // 描边型的则用原色加工高亮
                newStyle.strokeColor = highlightColor;
                // SMIC-方法修改 - start
                newStyle.lineWidth = (style.lineWidth || 1);
                // 原始代码
                //      newStyle.lineWidth = (style.lineWidth || 1)
                //          + this.getHighlightZoom();
                // 修改代码1
                // if(!style.lineType || style.lineType === "solid"){
                //     newStyle.lineWidth = (style.lineWidth || 1)
                //         + this.getHighlightZoom();
                // }
                // else{
                //     newStyle.lineWidth = (style.lineWidth || 1);
                // }
                // SMIC-方法修改 - end
            } else {
                // 线型的则用原色加工高亮
                newStyle.strokeColor = highlightStyle.strokeColor
                    || __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_color.mix(
                        style.strokeColor,
                        __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_color.toRGB(highlightColor)
                    );
            }
        }

        // 可自定义覆盖默认值
        for (let k in highlightStyle) {
            if (typeof highlightStyle[k] != 'undefined') {
                newStyle[k] = highlightStyle[k];
            }
        }

        return newStyle;
    }


    /**
     * Method: getHighlightZoom
     * 高亮放大效果参数，当前统一设置为6，如有需要差异设置，通过 this.type 判断实例类型
     *
     */
    getHighlightZoom() {
        return this.type != 'text' ? 6 : 2;
    }


    /**
     * APIMethod: drift
     * 移动位置
     *
     * Parameters:
     * dx - {Object} 横坐标变化。
     * dy - {Object} 纵坐标变化。
     *
     */
    drift(dx, dy) {
        this.position[0] += dx;
        this.position[1] += dy;
    }




    /**
     * APIMethod: buildPath
     * 构建绘制的Path。子类必须重新实现此方法。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} 样式。
     */
    buildPath(ctx, style) { // eslint-disable-line no-unused-vars
       
    }


    /**
     * APIMethod: getRect
     * 计算返回包围盒矩形。子类必须重新实现此方法。
     *
     * Parameters:
     * style - {Object} 样式。
     */
    getRect(style) { // eslint-disable-line no-unused-vars
       
    }


    /**
     * APIMethod: isCover
     * 判断鼠标位置是否在图形内。
     *
     * Parameters:
     * x - {Number} x。
     * y - {Number} y。
     */
    isCover(x, y) {
        var originPos = this.getTansform(x, y);
        x = originPos[0];
        y = originPos[1];

        // 快速预判并保留判断矩形
        var rect = this.style.__rect;
        if (!rect) {
            rect = this.style.__rect = this.getRect(this.style);
        }

        if (x >= rect.x
            && x <= (rect.x + rect.width)
            && y >= rect.y
            && y <= (rect.y + rect.height)
        ) {
            // 矩形内
            return __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_area.isInside(this, this.style, x, y);
        }

        return false;
    }


    /**
     * APIMethod: drawText
     * 绘制附加文本。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {String} 样式。
     * normalStyle - {String} normalStyle 默认样式，用于定位文字显示。
     */
    drawText(ctx, style, normalStyle) {
        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }
        // 字体颜色策略
        var textColor = style.textColor || style.color || style.strokeColor;
        ctx.fillStyle = textColor;

        // 文本与图形间空白间隙
        var dd = 10;
        var al;         // 文本水平对齐
        var bl;         // 文本垂直对齐
        var tx;         // 文本横坐标
        var ty;         // 文本纵坐标

        var textPosition = style.textPosition       // 用户定义
            || this.textPosition     // shape默认
            || 'top';                // 全局默认

        // Smic 方法修改 -start
        var __OP = [];
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            __OP = [0, 0];
        } else {
            __OP = this.refOriginalPosition;
        }
        //原代码：
        // Smic 方法修改 -end

        switch (textPosition) {
            case 'inside':
            case 'top':
            case 'bottom':
            case 'left':
            case 'right':
                if (this.getRect) {
                    var rect = (normalStyle || style).__rect
                        || this.getRect(normalStyle || style);

                    switch (textPosition) {
                        case 'inside':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y + rect.height / 2;
                            al = 'center';
                            bl = 'middle';
                            if (style.brushType != 'stroke'
                                && textColor == style.color
                            ) {
                                ctx.fillStyle = '#fff';
                            }
                            break;
                        case 'left':
                            tx = rect.x - dd;
                            ty = rect.y + rect.height / 2;
                            al = 'end';
                            bl = 'middle';
                            break;
                        case 'right':
                            tx = rect.x + rect.width + dd;
                            ty = rect.y + rect.height / 2;
                            al = 'start';
                            bl = 'middle';
                            break;
                        case 'top':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y - dd;
                            al = 'center';
                            bl = 'bottom';
                            break;
                        case 'bottom':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y + rect.height + dd;
                            al = 'center';
                            bl = 'top';
                            break;
                    }
                }
                break;
            case 'start':
            case 'end':
                var xStart = 0;
                var xEnd = 0;
                var yStart = 0;
                var yEnd = 0;
                if (typeof style.pointList != 'undefined') {
                    var pointList = style.pointList;
                    if (pointList.length < 2) {
                        // 少于2个点就不画了~
                        return;
                    }
                    var length = pointList.length;
                    switch (textPosition) {
                        // Smic 方法修改 -start
                        case 'start':
                            xStart = pointList[0][0] + __OP[0];
                            xEnd = pointList[1][0] + __OP[0];
                            yStart = pointList[0][1] + __OP[1];
                            yEnd = pointList[1][1] + __OP[1];
                            break;
                        case 'end':
                            xStart = pointList[length - 2][0] + __OP[0];
                            xEnd = pointList[length - 1][0] + __OP[0];
                            yStart = pointList[length - 2][1] + __OP[1];
                            yEnd = pointList[length - 1][1] + __OP[1];
                            break;
                        //原代码：
                        /*
                         case 'start':
                         xStart = pointList[0][0];
                         xEnd = pointList[1][0];
                         yStart = pointList[0][1];
                         yEnd = pointList[1][1];
                         break;
                         case 'end':
                         xStart = pointList[length - 2][0];
                         xEnd = pointList[length - 1][0];
                         yStart = pointList[length - 2][1];
                         yEnd = pointList[length - 1][1];
                         break;
                         */
                        // Smic 方法修改 -end
                    }
                } else {
                    // Smic 方法修改 -start
                    xStart = (style.xStart + __OP[0]) || 0;
                    xEnd = (style.xEnd + __OP[0]) || 0;
                    yStart = (style.yStart + __OP[1]) || 0;
                    yEnd = (style.yEnd + __OP[1]) || 0;
                    //原代码：
                    /*
                     xStart = style.xStart || 0;
                     xEnd = style.xEnd || 0;
                     yStart = style.yStart || 0;
                     yEnd = style.yEnd || 0;
                     */
                    // Smic 方法修改 -end
                }

                switch (textPosition) {
                    case 'start':
                        al = xStart < xEnd ? 'end' : 'start';
                        bl = yStart < yEnd ? 'bottom' : 'top';
                        tx = xStart;
                        ty = yStart;
                        break;
                    case 'end':
                        al = xStart < xEnd ? 'start' : 'end';
                        bl = yStart < yEnd ? 'top' : 'bottom';
                        tx = xEnd;
                        ty = yEnd;
                        break;
                }
                dd -= 4;
                if (xStart && xEnd && xStart != xEnd) {
                    tx -= (al == 'end' ? dd : -dd);
                } else {
                    al = 'center';
                }

                if (yStart != yEnd) {
                    ty -= (bl == 'bottom' ? dd : -dd);
                } else {
                    bl = 'middle';
                }
                break;
            case 'specific':
                tx = style.textX || 0;
                ty = style.textY || 0;
                al = 'start';
                bl = 'middle';
                break;
        }

        // Smic 方法修改 -start
        if (style.labelXOffset && !isNaN(style.labelXOffset)) {
            tx += style.labelXOffset;
        }
        if (style.labelYOffset && !isNaN(style.labelYOffset)) {
            ty += style.labelYOffset;
        }
        //原代码：
        // Smic 方法修改 -end

        if (tx != null && ty != null) {
            Shape._fillText(
                ctx,
                style.text,
                tx, ty,
                style.textFont,
                style.textAlign || al,
                style.textBaseline || bl
            );
        }
    }


    /**
     * Method: modSelf
     * 图形发生改变
     */
    modSelf() {
        this.__dirty = true;
        if (this.style) {
            this.style.__rect = null;
        }
        if (this.highlightStyle) {
            this.highlightStyle.__rect = null;
        }
    }


    /**
     * APIMethod: isSilent
     * 图形是否会触发事件，通过 bind 绑定的事件
     */
    isSilent() {
        return !(
            this.hoverable || this.draggable || this.clickable
            || this.onmousemove || this.onmouseover || this.onmouseout
            || this.onmousedown || this.onmouseup || this.onclick
            || this.ondragenter || this.ondragover || this.ondragleave
            || this.ondrop
        );
    }


    /**
     * Method: setCtxGlobalAlpha
     * 设置 Cavans 上下文全局透明度
     *
     * Parameters:
     * _ctx - {Object} Cavans 上下文
     * type - {String} one of 'stroke', 'fill', or 'reset'
     * style - {Object} Symbolizer hash
     */
    setCtxGlobalAlpha(_ctx, type, style) {
        if (type === "fill") {
            _ctx.globalAlpha = typeof(style["fillOpacity"]) === "undefined" ? (typeof(style["opacity"]) === "undefined" ? 1 : style['opacity']) : style['fillOpacity'];
        } else if (type === "stroke") {
            _ctx.globalAlpha = typeof(style["strokeOpacity"]) === "undefined" ? (typeof(style["opacity"]) === "undefined" ? 1 : style['opacity']) : style['strokeOpacity'];
        } else {
            _ctx.globalAlpha = typeof(style["opacity"]) === "undefined" ? 1 : style['opacity'];
        }
    }

    /**
     * Method: SuperMap.LevelRenderer.Shape._fillText
     * 填充文本
     */
    static _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
        if (textFont) {
            ctx.font = textFont;
        }
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var rect = Shape._getTextRect(
            text, x, y, textFont, textAlign, textBaseline
        );

        text = (text + '').split('\n');

        var lineHeight = __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_area.getTextHeight('ZH', textFont);

        switch (textBaseline) {
            case 'top':
                y = rect.y;
                break;
            case 'bottom':
                y = rect.y + lineHeight;
                break;
            default:
                y = rect.y + lineHeight / 2;
        }

        for (var i = 0, l = text.length; i < l; i++) {
            ctx.fillText(text[i], x, y);
            y += lineHeight;
        }
    }

    /**
     * Method: SuperMap.LevelRenderer.Shape._getTextRect
     * 返回矩形区域，用于局部刷新和文字定位
     *
     * Parameters:
     * text - {String} text。
     * x - {Number} x。
     * y - {Number} y。
     * textFont - {String} textFont。
     * textAlign - {String} textAlign。
     * textBaseline - {String} textBaseline。
     *
     * Returns:
     * {Object} 矩形区域。
     */
    static _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
        var width = __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_area.getTextWidth(text, textFont);
        var lineHeight = __WEBPACK_IMPORTED_MODULE_4__SUtil__["a" /* SUtil */].Util_area.getTextHeight('ZH', textFont);

        text = (text + '').split('\n');

        switch (textAlign) {
            case 'end':
            case 'right':
                x -= width;
                break;
            case 'center':
                x -= (width / 2);
                break;
        }

        switch (textBaseline) {
            case 'top':
                break;
            case 'bottom':
                y -= lineHeight * text.length;
                break;
            default:
                y -= lineHeight * text.length / 2;
        }

        return {
            x: x,
            y: y,
            width: width,
            height: lineHeight * text.length
        };
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Shape = Shape;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Area__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Color__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ComputeBoundingBox__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Curve__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Env__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Math__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Matrix__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Vector__ = __webpack_require__(14);













class SUtil {
    /**
     * APIFunction: KTW.LevelRenderer.SUtil_smoothBezier
     * 贝塞尔平滑曲线。
     *
     * Parameters:
     * points - {Array} 线段顶点数组。
     * smooth - {Number} 平滑等级, 0-1。
     * isLoop - {Boolean} isLoop。
     * constraint - {Array} 将计算出来的控制点约束在一个包围盒内，比如 [[0, 0], [100, 100]], 这个包围盒会与整个折线的包围盒做一个并集用来约束控制点。
     * originalPosition - {Array} 参考原点。默认值：[0, 0]。
     *
     * Returns:
     * {Array} 生成的平滑节点数组。
     */
    static SUtil_smoothBezier(points, smooth, isLoop, constraint, originalPosition) {
        if (!originalPosition || originalPosition !== 2) {
            originalPosition = [0, 0];
        }
        var __OP = originalPosition;

        var cps = [];

        var v = [];
        var v1 = [];
        var v2 = [];

        var hasConstraint = !!constraint;
        var min, max;
        if (hasConstraint) {
            min = [Infinity, Infinity];
            max = [-Infinity, -Infinity];
            let len = points.length;
            for (let i = 0; i < len; i++) {
                SUtil.Util_vector.min(min, min, [points[i][0] + __OP[0], points[i][1] + __OP[1]]);
                SUtil.Util_vector.max(max, max, [points[i][0] + __OP[0], points[i][1] + __OP[1]]);
            }
            // 与指定的包围盒做并集
            SUtil.Util_vector.min(min, min, constraint[0]);
            SUtil.Util_vector.max(max, max, constraint[1]);
        }

        let len = points.length;
        for (let i = 0; i < len; i++) {
            let point = [points[i][0] + __OP[0], points[i][1] + __OP[1]];
            let prevPoint;
            let nextPoint;

            if (isLoop) {
                prevPoint = [points[i ? i - 1 : len - 1][0] + __OP[0], points[i ? i - 1 : len - 1][1] + __OP[1]];
                nextPoint = [points[(i + 1) % len][0] + __OP[0], points[(i + 1) % len][1] + __OP[1]];
            } else {
                if (i === 0 || i === len - 1) {
                    cps.push([points[i][0] + __OP[0], points[i][1] + __OP[1]]);
                    continue;
                } else {
                    prevPoint = [points[i - 1][0] + __OP[0], points[i - 1][1] + __OP[1]];
                    nextPoint = [points[i + 1][0] + __OP[0], points[i + 1][1] + __OP[1]];
                }
            }

            SUtil.Util_vector.sub(v, nextPoint, prevPoint);

            // use degree to scale the handle length
            SUtil.Util_vector.scale(v, v, smooth);

            let d0 = SUtil.Util_vector.distance(point, prevPoint);
            let d1 = SUtil.Util_vector.distance(point, nextPoint);
            let sum = d0 + d1;
            if (sum !== 0) {
                d0 /= sum;
                d1 /= sum;
            }

            SUtil.Util_vector.scale(v1, v, -d0);
            SUtil.Util_vector.scale(v2, v, d1);
            let cp0 = SUtil.Util_vector.add([], point, v1);
            let cp1 = SUtil.Util_vector.add([], point, v2);
            if (hasConstraint) {
                SUtil.Util_vector.max(cp0, cp0, min);
                SUtil.Util_vector.min(cp0, cp0, max);
                SUtil.Util_vector.max(cp1, cp1, min);
                SUtil.Util_vector.min(cp1, cp1, max);
            }
            cps.push(cp0);
            cps.push(cp1);
        }

        if (isLoop) {
            cps.push(cps.shift());
        }

        return cps;
    }

    /**
     * APIFunction: KTW.LevelRenderer.SUtil_smoothSpline
     * 插值折线。
     *
     * Parameters:
     * points - {Array} 线段顶点数组。
     * isLoop - {Boolean} isLoop。
     * constraint - {Array} 将计算出来的控制点约束在一个包围盒内，比如 [[0, 0], [100, 100]], 这个包围盒会与整个折线的包围盒做一个并集用来约束控制点。
     * originalPosition - {Array} 参考原点。默认值：[0, 0]。
     *
     * Returns:
     * {Array} 生成的平滑节点数组。
     */
    static SUtil_smoothSpline(points, isLoop, constraint, originalPosition) {
        if (!originalPosition || originalPosition !== 2) {
            originalPosition = [0, 0];
        }
        var __OP = originalPosition;

        var len = points.length;
        var ret = [];

        var distance = 0;
        for (let i = 1; i < len; i++) {
            distance += SUtil.Util_vector.distance([points[i - 1][0] + __OP[0], points[i - 1][1] + __OP[1]], [points[i][0] + __OP[0], points[i][1] + __OP[1]]);
        }

        var segs = distance / 5;
        segs = segs < len ? len : segs;
        for (let i = 0; i < segs; i++) {
            let pos = i / (segs - 1) * (isLoop ? len : len - 1);
            let idx = Math.floor(pos);

            let w = pos - idx;

            let p0;
            let p1 = [points[idx % len][0] + __OP[0], points[idx % len][1] + __OP[1]];
            let p2;
            let p3;
            if (!isLoop) {
                p0 = [points[idx === 0 ? idx : idx - 1][0] + __OP[0], points[idx === 0 ? idx : idx - 1][1] + __OP[1]];
                p2 = [points[idx > len - 2 ? len - 1 : idx + 1][0] + __OP[0], points[idx > len - 2 ? len - 1 : idx + 1][1] + __OP[1]];
                p3 = [points[idx > len - 3 ? len - 1 : idx + 2][0] + __OP[0], points[idx > len - 3 ? len - 1 : idx + 2][1] + __OP[1]];
            } else {

                p0 = [points[(idx - 1 + len) % len][0] + __OP[0], points[(idx - 1 + len) % len][1] + __OP[1]];
                p2 = [points[(idx + 1) % len][0] + __OP[0], points[(idx + 1) % len][1] + __OP[1]];
                p3 = [points[(idx + 2) % len][0] + __OP[0], points[(idx + 2) % len][1] + __OP[1]];
            }

            let w2 = w * w;
            let w3 = w * w2;

            ret.push([
                interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
                interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
            ]);
        }
        return ret;

        // inner Function
        function interpolate(p0, p1, p2, p3, t, t2, t3) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            return (2 * (p1 - p2) + v0 + v1) * t3
                + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
                + v0 * t + p1;
        }
    }

    /**
     * APIFunction: KTW.LevelRenderer.SUtil_dashedLineTo
     * 虚线 lineTo。
     */
    static SUtil_dashedLineTo(ctx, x1, y1, x2, y2, dashLength, customDashPattern) {
        // http://msdn.microsoft.com/en-us/library/ie/dn265063(v=vs.85).aspx
        var dashPattern = [5, 5];
        dashLength = typeof dashLength != 'number'
            ? 5
            : dashLength;

        if (ctx.setLineDash) {
            dashPattern[0] = dashLength;
            dashPattern[1] = dashLength;

            if (customDashPattern && (customDashPattern instanceof Array)) {
                ctx.setLineDash(customDashPattern);
            } else {
                ctx.setLineDash(dashPattern);
            }
            // ctx.setLineDash(dashPattern);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            return;
        }

        var dx = x2 - x1;
        var dy = y2 - y1;
        var numDashes = Math.floor(
            Math.sqrt(dx * dx + dy * dy) / dashLength
        );
        dx = dx / numDashes;
        dy = dy / numDashes;
        var flag = true;
        for (var i = 0; i < numDashes; ++i) {
            if (flag) {
                ctx.moveTo(x1, y1);
            } else {
                ctx.lineTo(x1, y1);
            }
            flag = !flag;
            x1 += dx;
            y1 += dy;
        }
        ctx.lineTo(x2, y2);
    }
};

// 把所有工具对象放到全局静态变量上，以便直接调用工具方法，
// 避免使用工具时频繁的创建工具对象带来的性能消耗。
SUtil.Util_area = new __WEBPACK_IMPORTED_MODULE_1__Area__["a" /* Area */]();
SUtil.Util_color = new __WEBPACK_IMPORTED_MODULE_2__Color__["a" /* Color */]();
SUtil.Util_computeBoundingBox = new __WEBPACK_IMPORTED_MODULE_3__ComputeBoundingBox__["a" /* ComputeBoundingBox */]();
SUtil.Util_curve = new __WEBPACK_IMPORTED_MODULE_4__Curve__["a" /* Curve */]();
SUtil.Util_env = new __WEBPACK_IMPORTED_MODULE_5__Env__["a" /* Env */]();
SUtil.Util_event = new __WEBPACK_IMPORTED_MODULE_6__Event__["a" /* Event */]();
SUtil.Util_http = new __WEBPACK_IMPORTED_MODULE_7__Http__["a" /* Http */]();
SUtil.Util_math = new __WEBPACK_IMPORTED_MODULE_8__Math__["a" /* Math */]();
SUtil.Util_matrix = new __WEBPACK_IMPORTED_MODULE_9__Matrix__["a" /* Matrix */]();
SUtil.Util = new __WEBPACK_IMPORTED_MODULE_10__Util__["a" /* Util */]();
SUtil.Util_vector = new __WEBPACK_IMPORTED_MODULE_11__Vector__["a" /* Vector */]();


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SUtil = SUtil;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Point__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Line__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Polygon__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rectangle__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Sector__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Label__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Image__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Circle__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__levelRender_SmicPoint__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__levelRender_SmicText__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__levelRender_SmicCircle__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__levelRender_SmicBrokenLine__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__levelRender_SmicImage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__levelRender_SmicPolygon__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__levelRender_SmicRectangle__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__levelRender_SmicSector__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__service_common_Util__ = __webpack_require__(1);



















/**
 * @private
 * @class  KTW.Feature.ShapeFactory
 * 图形工厂类。
 *
 * 目前支持创建的图形有：
 *
 * 用于统计专题图：
 * 点 - 参数对象： <KTW.Feature.ShapeParameters.Point>
 *
 * 线 - 参数对象： <KTW.Feature.ShapeParameters.Line>
 *
 * 面 - 参数对象： <KTW.Feature.ShapeParameters.Polygon>
 *
 * 矩形 - 参数对象： <KTW.Feature.ShapeParameters.Rectangle>
 *
 * 扇形 - 参数对象： <KTW.Feature.ShapeParameters.Sector>
 *
 * 标签 - 参数对象： <KTW.Feature.ShapeParameters.Label>
 *
 * 图片 - 参数对象： <KTW.Feature.ShapeParameters.Image>
 *
 *
 * 用于符号专题图：
 * 圆形 -  参数对象：<KTW.Feature.ShapeParameters.Cilcle>
 */
class ShapeFactory {



    /**
     * Constructor: KTW.Feature.ShapeFactory
     * 构建图形工厂对象。
     *
     * Parameters:
     * shapeParameters - {Object}  图形参数对象，<KTW.Feature.ShapeParameters> 子类对象，可选参数。
     *
     * Returns:
     * {Object} 返回图形工厂类对象。
     */
    constructor(shapeParameters) {
        /**
         * APIProperty: shapeParameters
         * {Object} 图形参数对象， <KTW.Feature.ShapeParameters> 子类对象。必设参数，默认值 null。
         */
        this.shapeParameters = shapeParameters;

        this.CLASS_NAME = "KTW.Feature.ShapeFactory";
    }


    /**
     * APIMethod: destroy
     * 销毁图形工厂类对象。
     */
    destroy() {
        this.shapeParameters = null;
    }


    /**
     * APIMethod: createShape
     * 创建一个图形。具体图形由 shapeParameters 决定。
     *
     * Parameters:
     * shapeParameters - {Object} 图形参数对象， <KTW.Feature.ShapeParameters> 子类对象。
     * 此参数可选，如果使用此参数（不为 null），shapeParameters 属性值将被修改为参数的值，然后再使用 shapeParameters 属性值创建图形；
     * 如果不使用此参数，createShape 方法将直接使用 shapeParameters 属性创建图形。
     *
     * Returns:
     * {Object} - 图形对象（或 null - 图形创建失败）。
     */
    createShape(shapeParameters) {
        if (shapeParameters) {
            this.shapeParameters = shapeParameters;
        }

        if (!this.shapeParameters) {
            return null;
        }

        var sps = this.shapeParameters;


        if (sps instanceof __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* Point */]) {        // 点
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["r"] = sps.r;

            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['x', 'y']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_9__levelRender_SmicPoint__["a" /* SmicPoint */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['x', 'y', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_2__Line__["a" /* Line */]) {        // 线
            //检查参数 pointList 是否存在
            if (!sps.pointList) {
                return null;
            }

            // 设置style
            let style = new Object();
            style["pointList"] = sps.pointList;
            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['pointList']);

            // 创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_12__levelRender_SmicBrokenLine__["a" /* SmicBrokenLine */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['pointList', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_3__Polygon__["a" /* Polygon */]) {        // 面
            //检查参数 pointList 是否存在
            if (!sps.pointList) {
                return null;
            }

            //设置style
            let style = new Object();
            style["pointList"] = sps.pointList;
            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['pointList']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_14__levelRender_SmicPolygon__["a" /* SmicPolygon */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['pointList', 'style', "highlightStyle"]);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_4__Rectangle__["a" /* Rectangle */]) {        // 矩形
            //检查参数 pointList 是否存在
            if (!sps.x && !sps.y & !sps.width & !sps.height) {
                return null;
            }

            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["width"] = sps.width;
            style["height"] = sps.height;

            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['x', 'y', 'width', 'height']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_15__levelRender_SmicRectangle__["a" /* SmicRectangle */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['x', 'y', 'width', 'height', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_5__Sector__["a" /* Sector */]) {        // 扇形
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["r"] = sps.r;
            style["startAngle"] = sps.startAngle;
            style["endAngle"] = sps.endAngle;
            if (sps["r0"]) {
                style["r0"] = sps.r0
            }

            if (sps["clockWise"]) {
                style["clockWise"] = sps.clockWise
            }


            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['x', 'y', 'r', 'startAngle', 'endAngle', 'r0', 'endAngle']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_16__levelRender_SmicSector__["a" /* SmicSector */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['x', 'y', 'r', 'startAngle', 'endAngle', 'r0', 'endAngle', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_6__Label__["a" /* Label */]) {        // 标签
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["text"] = sps.text;

            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['x', 'y', 'text']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_10__levelRender_SmicText__["a" /* SmicText */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['x', 'y', 'text', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_7__Image__["a" /* Image */]) {        // 图片
            //设置style
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            if (sps["image"]) {
                style["image"] = sps.image;
            }
            if (sps["width"]) {
                style["width"] = sps.width;
            }
            if (sps["height"]) {
                style["height"] = sps.height;
            }
            if (sps["sx"]) {
                style["sx"] = sps.sx;
            }
            if (sps["sy"]) {
                style["sy"] = sps.sy;
            }
            if (sps["sWidth"]) {
                style["sWidth"] = sps.sWidth
            }
            if (sps["sHeight"]) {
                style["sHeight"] = sps.sHeight
            }

            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['x', 'y', 'image', 'width', 'height', 'sx', 'sy', 'sWidth', 'sHeight']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_13__levelRender_SmicImage__["a" /* SmicImage */]();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['x', 'y', 'image', 'width', 'height', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof __WEBPACK_IMPORTED_MODULE_8__Circle__["a" /* Circle */]) {       //圆形 用于符号专题图
            //设置stytle
            let style = new Object();
            style["x"] = sps.x;
            style["r"] = sps.r;
            style["y"] = sps.y;

            style = Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(style, sps.style, ['x', 'y', 'r']);

            //创建图形
            let shape = new __WEBPACK_IMPORTED_MODULE_11__levelRender_SmicCircle__["a" /* SmicCircle */]();
            shape.style = new ShapeFactory.transformStyle(style);
            shape.highlightStyle = new ShapeFactory.transformStyle(sps.highlightStyle);
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(shape, sps, ['x', 'y', 'r', 'style', 'highlightStyle', 'lineWidth', 'text', 'textPosition']);

            return shape;
        }

        return null
    }


    /**
     * Function: ShapeFactory.transformStyle
     * 将用户 feature.style (类 Svg style 标准) 的样式，转换为 levelRenderer 的样式标准（类 CSS-Canvas 样式）
     *
     * Parameters:
     * style - {Object} 用户 style。
     *
     * Returns:
     * {Object} 符合 levelRenderer 的 tyle。
     */
    static transformStyle(style) {
        var newStyle = {};

        //字体 ["font-style", "font-variant", "font-weight", "font-size / line-height", "font-family"];
        var fontStr = ["normal", "normal", "normal", "12", "arial,sans-serif"];

        //画笔类型 ["fill", "stroke"];
        var brushType = [true, false];

        for (var ss in style) {
            switch (ss) {
                case "fill":
                    brushType[0] = style[ss];
                    break;
                case "fillColor":
                    newStyle["color"] = style[ss];
                    break;
                case "stroke":
                    brushType[1] = style[ss];
                    break;
                case "strokeWidth":
                    newStyle["lineWidth"] = style[ss];
                    break;
                case "strokeLinecap":
                    newStyle["lineCap"] = style[ss];
                    break;
                case "strokeLineJoin":
                    newStyle["lineJoin"] = style[ss];
                    break;
                case "strokeDashstyle":
                    newStyle["lineType"] = style[ss];
                    break;
                case "pointRadius":
                    newStyle["r"] = style[ss];
                    break;
                case "label":
                    newStyle["text"] = style[ss];
                    break;
                case "labelRect":
                    newStyle["labelRect"] = style[ss];
                    break;
                case "fontColor":
                    newStyle["textColor"] = style[ss];
                    break;
                case "fontStyle":
                    fontStr[0] = style[ss];
                    break;
                case "fontVariant":
                    fontStr[1] = style[ss];
                    break;
                case "fontWeight":
                    fontStr[2] = style[ss];
                    break;
                case "fontSize":
                    var unit = "";
                    if (style[ss] && style[ss].toString().indexOf("px") < 0) {
                        unit = "px";
                    }
                    fontStr[3] = style[ss] + unit;
                    break;
                case "fontFamily":
                    fontStr[4] = style[ss];
                    break;
                case "fontOpacity":
                    newStyle["opacity"] = style[ss];
                    break;
                case "labelPosition":
                    newStyle["textPosition"] = style[ss];
                    break;
                case "labelAlign":
                    newStyle["textAlign"] = style[ss];
                    break;
                case "labelBaseline":
                    newStyle["textBaseline"] = style[ss];
                    break;
                case "labelRotation":
                    newStyle["textRotation"] = style[ss];
                    break;

                default:
                    newStyle[ss] = style[ss];
                    break;
            }
        }

        //拼接字体字符串
        newStyle["textFont"] = fontStr.join(" ");

        //画笔类型
        if (brushType[0] === true && brushType[1] === false) {
            newStyle["brushType"] = "fill";
        } else if (brushType[0] === false && brushType[1] === true) {
            newStyle["brushType"] = "stroke";
        } else if (brushType[0] === true && brushType[1] === true) {
            newStyle["brushType"] = "both";
        } else {
            newStyle["brushType"] = "fill";
        }

        //默认线宽 1
        if (newStyle["lineWidth"] == null) {
            newStyle["lineWidth"] = 1;
        }

        return newStyle;
    }

    /**
     * APIFunction: ShapeFactory.Background
     * 创建一个矩形背景框图形对象。
     *
     * Parameters:
     * shapeFactory - {<KTW.Feature.ShapeFactory>} 图形工厂对象，必设参数。
     * box - {Array{Number}} 框区域，长度为 4 的一维数组，像素坐标，[left, bottom, right, top]，必设参数。
     * setting - {Object} 图表配置参数，必设参数。
     *
     * 本函数中图形配置对象 setting 可设属性：
     *
     * Symbolizer properties:
     * backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Rectangle::style>。
     * backgroundRadius - {Array} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,
     * 则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。
     *
     * Returns:
     * {Object} 背景框图形，一个可视化图形（矩形）对象。
     */
    static Background(shapeFactory, box, setting) {
        var sets = setting ? setting : {};

        // 背景框图形参数对象
        var bgSP = new __WEBPACK_IMPORTED_MODULE_4__Rectangle__["a" /* Rectangle */](box[0], box[3], Math.abs(box[2] - box[0]), Math.abs(box[3] - box[1]));

        // 默认样式
        bgSP.style = {
            fillColor: "#f3f3f3"
        };

        // 设置用户 style
        if (sets.backgroundStyle) {
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(bgSP.style, sets.backgroundStyle);
        }

        // 设置背景框圆角参数
        if (sets.backgroundRadius) {
            bgSP.style["radius"] = sets.backgroundRadius;
        }

        // 禁止背景框响应事件
        bgSP.clickable = false;
        bgSP.hoverable = false;

        return shapeFactory.createShape(bgSP);
    }

    /**
     * APIFunction: ShapeFactory.GraphAxis
     * 创建一个统计图表坐标轴图形对象组。
     *
     * Parameters:
     * shapeFactory - {<KTW.Feature.ShapeFactory>} 图形工厂对象，必设参数。
     * dataViewBox - {Array{Number}} 统计图表模型的数据视图框，长度为 4 的一维数组，像素坐标，[left, bottom, right, top]，必设参数。
     * setting - {Object} 图表配置参数，必设参数。
     * xShapeInfo - {Object} X 方向上的图形信息对象，包含两个属性，
     * 属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     * 如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     * width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     * xShapeInfo 包含两个属性
     *
     * Symbolizer properties:
     * xPositions - {Array{Number}} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     * width - {Number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *
     * 本函数中图形配置对象 setting 可设属性：
     *
     * Symbolizer properties:
     * axisStyle - {Object} 坐标轴样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。
     * axisUseArrow - {Boolean} 坐标轴是否使用箭头，默认值：false，不使用箭头。
     * axisYTick - {Number} y 轴刻度数量，默认值：0 ，不使用刻度。
     * axisYLabels - {Array{String}} y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。
     * axisYLabelsStyle - {Object} y 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。
     * axisYLabelsOffset - {Array{Number}} y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；
     * 数组第二项表示 y 轴标签组纵向上的偏移量，向下为正，默认值：0。
     * axisXLabels - {Array{String}} x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。
     * 标签排布规则：当标签数量与 xShapeInfo 中的属性 xPositions 数量相同（即标签个数与数据个数相等时）, 按照 xPositions 提供的位置在水平方向上排布标签，
     * 否则沿数据视图框下面条边等距排布标签。
     * axisXLabelsStyle - {Object} x 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。
     * axisXLabelsOffset - {Array{Number}} x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：0；
     * 数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：0。
     * useXReferenceLine - {Boolean) 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。
 * xReferenceLineStyle - {Object) 水平参考线样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。
 * axis3DParameter - {Number} 3D 坐标轴参数，此属性值在大于等于 15 时有效，默认值：0。
 *
 * Returns:
 * {Array{Object}} 统计图表坐标轴图形对象数组。
 */
    static GraphAxis(shapeFactory, dataViewBox, setting, xShapeInfo) {
        var dvb = dataViewBox;
        var sets = setting ? setting : {};

        // 参考线图形对象组
        var refLines = [];
        //坐标轴箭头对象组
        var arrows = [];
        // 是否使用参水平考线，默认不使用
        var isAddRefLine = sets.useXReferenceLine ? sets.useXReferenceLine : false;
        // y 轴上的刻度
        var axisytick = (sets.axisYTick && !isNaN(sets.axisYTick)) ? sets.axisYTick : 0;
        // 坐标轴节点数组
        var pois = [];
        //z 轴箭头数组
        var zArrowPois = [];
        // x,y 轴主干节点数组
        var xMainPois = [];
        if (axisytick == 0) {
            xMainPois.push([dvb[0], dvb[3] - 5]);
            xMainPois.push([dvb[0], dvb[1]]);

            // 3D 坐标轴  第三象限平分线
            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                let axis3DParameter = parseInt(sets.axis3DParameter);
                let axis3DPoi = [dvb[0] - axis3DParameter, dvb[1] + axis3DParameter];

                // 添加 3D 轴节点
                if (sets.axisUseArrow) {      // 添加 3D 轴箭头节点坐标
                    //箭头坐标
                    zArrowPois.push([axis3DPoi[0] + 1.5, axis3DPoi[1] - 7.5]);
                    zArrowPois.push([axis3DPoi[0] - 1, axis3DPoi[1] + 1]);
                    zArrowPois.push([axis3DPoi[0] + 7.5, axis3DPoi[1] - 1.5]);
                    //3D轴
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                } else {
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                }

                xMainPois.push([dvb[0], dvb[1]]);
            }
            xMainPois.push([dvb[2] + 5, dvb[1]]);
        } else {
            // 单位刻度长度
            var unitTick = Math.abs(dvb[1] - dvb[3]) / axisytick;
            // 刻度 y 坐标
            var thckY = dvb[3];

            xMainPois.push([dvb[0], thckY - 5]);

            for (var i = 0; i < axisytick; i++) {
                xMainPois.push([dvb[0], thckY]);
                xMainPois.push([dvb[0] - 5, thckY]);
                xMainPois.push([dvb[0], thckY]);

                // 参考线
                if (isAddRefLine) {
                    // 参考线参数对象
                    var refLineSP = new __WEBPACK_IMPORTED_MODULE_2__Line__["a" /* Line */]([
                        [dvb[0], thckY],
                        [dvb[2], thckY]
                    ]);
                    // 参考线默认样式对象
                    refLineSP.style = {
                        strokeColor: "#cfcfcf",
                        strokeLinecap: "butt",
                        strokeLineJoin: "round",
                        strokeWidth: 1
                    };
                    // 禁止事件
                    refLineSP.clickable = false;
                    refLineSP.hoverable = false;
                    // 用户style
                    if (sets.xReferenceLineStyle) {
                        Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(refLineSP.style, sets.xReferenceLineStyle);
                    }
                    // 生成参考线图形对象
                    refLines.push(shapeFactory.createShape(refLineSP))
                }

                // y 刻度增量
                thckY += unitTick;
            }

            xMainPois.push([dvb[0], dvb[1]]);

            // 3D 坐标轴  第三象限平分线
            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                let axis3DParameter = parseInt(sets.axis3DParameter);
                let axis3DPoi = [dvb[0] - axis3DParameter, dvb[1] + axis3DParameter];

                // 添加 3D 轴节点
                if (sets.axisUseArrow) {      // 添加 3D 轴和箭头坐标
                    //箭头坐标
                    zArrowPois.push([axis3DPoi[0] + 1.5, axis3DPoi[1] - 7.5]);
                    zArrowPois.push([axis3DPoi[0] - 1, axis3DPoi[1] + 1]);
                    zArrowPois.push([axis3DPoi[0] + 7.5, axis3DPoi[1] - 1.5]);
                    //3D轴
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                } else {
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                }

                xMainPois.push([dvb[0], dvb[1]]);
            }

            xMainPois.push([dvb[2] + 5, dvb[1]]);
        }
        // 坐标轴箭头
        if (sets.axisUseArrow) {
            // x 轴箭头节点数组
            var xArrowPois = [
                [dvb[2] + 5, dvb[1] + 4],
                [dvb[2] + 13, dvb[1]],
                [dvb[2] + 5, dvb[1] - 4]
            ];

            // y 轴箭头节点数组
            var yArrowPois = [
                [dvb[0] - 4, dvb[3] - 5],
                [dvb[0], dvb[3] - 13],
                [dvb[0] + 4, dvb[3] - 5]
            ];

            //x轴箭头
            var xSP = new __WEBPACK_IMPORTED_MODULE_3__Polygon__["a" /* Polygon */](xArrowPois);
            xSP.style = {fillColor: "#008acd"};
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(xSP.style, sets.axisStyle);
            arrows.push(shapeFactory.createShape(xSP));

            //y轴箭头
            var ySP = new __WEBPACK_IMPORTED_MODULE_3__Polygon__["a" /* Polygon */](yArrowPois);
            ySP.style = {fillColor: "#008acd"};
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(ySP.style, sets.axisStyle);
            arrows.push(shapeFactory.createShape(ySP));

            // z轴箭头 坐标轴箭头是否要使用
            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                var zSP = new __WEBPACK_IMPORTED_MODULE_3__Polygon__["a" /* Polygon */](zArrowPois);
                zSP.style = {fillColor: "#008acd"};
                Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(zSP.style, sets.axisStyle);
                arrows.push(shapeFactory.createShape(zSP));
            }

        }
        //不带箭头的坐标轴
        pois = xMainPois;

        // 坐标轴参数对象
        var axisSP = new __WEBPACK_IMPORTED_MODULE_2__Line__["a" /* Line */](pois);
        // 坐标轴默认style
        axisSP.style = {
            strokeLinecap: "butt",
            strokeLineJoin: "round",
            strokeColor: "#008acd",
            strokeWidth: 1
        };
        // 用户 style
        if (sets.axisStyle) {
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(axisSP.style, sets.axisStyle);
        }
        // 禁止事件
        axisSP.clickable = false;
        axisSP.hoverable = false;
        // 创建坐标轴图形对象
        var axisMain = [shapeFactory.createShape(axisSP)];

        // Y 轴标签
        var yLabels = [];
        if (sets.axisYLabels && sets.axisYLabels.length && sets.axisYLabels.length > 0) {
            var axisYLabels = sets.axisYLabels;
            let len = axisYLabels.length;

            // 标签偏移量
            var ylOffset = [0, 0];
            if (sets.axisYLabelsOffset && sets.axisYLabelsOffset.length) {
                ylOffset = sets.axisYLabelsOffset;
            }

            if (len == 1) {
                // 标签参数对象
                let labelYSP = new __WEBPACK_IMPORTED_MODULE_6__Label__["a" /* Label */](dvb[0] - 5 + ylOffset[0], dvb[3] + ylOffset[1], axisYLabels[0]);
                labelYSP.style = {
                    labelAlign: "right"
                };
                // 用户 style
                if (sets.axisYLabelsStyle) {
                    Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(labelYSP.style, sets.axisYLabelsStyle);
                }
                // 禁止事件
                labelYSP.clickable = false;
                labelYSP.hoverable = false;
                // 制作标签
                yLabels.push(shapeFactory.createShape(labelYSP));
            } else {
                var labelY = dvb[3];
                // y 轴标签单位距离
                var yUnit = Math.abs(dvb[1] - dvb[3]) / (len - 1);

                for (var j = 0; j < len; j++) {
                    // 标签参数对象
                    let labelYSP = new __WEBPACK_IMPORTED_MODULE_6__Label__["a" /* Label */](dvb[0] - 5 + ylOffset[0], labelY + ylOffset[1], axisYLabels[j]);
                    labelYSP.style = {
                        labelAlign: "right"
                    };
                    // 用户 style
                    if (sets.axisYLabelsStyle) {
                        Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(labelYSP.style, sets.axisYLabelsStyle);
                    }
                    // 禁止事件
                    labelYSP.clickable = false;
                    labelYSP.hoverable = false;
                    // 制作标签
                    yLabels.push(shapeFactory.createShape(labelYSP));
                    // y 轴标签 y 方向增量
                    labelY += yUnit;
                }
            }
        }

        // X 轴标签
        var xLabels = [];
        if (sets.axisXLabels && sets.axisXLabels.length && sets.axisXLabels.length > 0) {
            let axisXLabels = sets.axisXLabels;
            let len = axisXLabels.length;

            // 标签偏移量
            let xlOffset = [0, 0];
            if (sets.axisXLabelsOffset && sets.axisXLabelsOffset.length) {
                xlOffset = sets.axisXLabelsOffset;
            }

            // 标签个数与数据字段个数相等等时，标签在 x 轴均匀排列
            if (xShapeInfo && xShapeInfo.xPositions && xShapeInfo.xPositions.length && xShapeInfo.xPositions.length == len) {
                let xsCenter = xShapeInfo.xPositions;
                for (let K = 0; K < len; K++) {
                    // 标签参数对象
                    let labelXSP = new __WEBPACK_IMPORTED_MODULE_6__Label__["a" /* Label */](xsCenter[K] + xlOffset[0], dvb[1] + xlOffset[1], axisXLabels[K]);
                    // 默认 style
                    labelXSP.style = {
                        labelAlign: "center",
                        labelBaseline: "top"
                    };
                    // 用户 style
                    if (sets.axisXLabelsStyle) {
                        Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(labelXSP.style, sets.axisXLabelsStyle);
                    }
                    // 禁止事件
                    labelXSP.clickable = false;
                    labelXSP.hoverable = false;
                    // 创建标签对象
                    xLabels.push(shapeFactory.createShape(labelXSP));
                }
            } else {
                if (len == 1) {
                    // 标签参数对象
                    let labelXSP = new __WEBPACK_IMPORTED_MODULE_6__Label__["a" /* Label */](dvb[0] - 5 + xlOffset[0], dvb[1] + xlOffset[0], axisXLabels[0]);
                    // 默认 style
                    labelXSP.style = {
                        labelAlign: "center",
                        labelBaseline: "top"
                    };
                    // 用户 style
                    if (sets.axisXLabelsStyle) {
                        Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(labelXSP.style, sets.axisXLabelsStyle);
                    }
                    // 禁止事件
                    labelXSP.clickable = false;
                    labelXSP.hoverable = false;
                    // 创建标签对象
                    xLabels.push(shapeFactory.createShape(labelXSP));
                } else {
                    let labelX = dvb[0];
                    // x 轴标签单位距离
                    let xUnit = Math.abs(dvb[2] - dvb[0]) / (len - 1);

                    for (let m = 0; m < len; m++) {
                        // 标签参数对象
                        let labelXSP = new __WEBPACK_IMPORTED_MODULE_6__Label__["a" /* Label */](labelX + xlOffset[0], dvb[1] + xlOffset[1], axisXLabels[m]);
                        // 默认 style
                        labelXSP.style = {
                            labelAlign: "center",
                            labelBaseline: "top"
                        };
                        // 用户 style
                        if (sets.axisXLabelsStyle) {
                            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(labelXSP.style, sets.axisXLabelsStyle);
                        }
                        // 禁止事件
                        labelXSP.clickable = false;
                        labelXSP.hoverable = false;
                        // 创建标签对象
                        xLabels.push(shapeFactory.createShape(labelXSP));
                        // x 轴标签 x 方向增量
                        labelX += xUnit;
                    }
                }
            }
        }

        // 组装并返回构成坐标轴的图形
        return ((refLines.concat(axisMain)).concat(yLabels)).concat(xLabels).concat(arrows);
    }

    /**
     * APIFunction: ShapeFactory.ShapeStyleTool
     * 一个图形 style 处理工具。此工具将指定的默认 style，通用 style，按 styleGroup 取得的 style 和按数据值 value 范围取得的 style 进行合并，得到图形最终的 style。
     *
     * Parameters:
     * defaultStyle - {Object} 默认 style，此样式对象可设属性根据图形类型参考 <KTW.Feature.ShapeParameters> 子类对象的 style 属性。
     * style - {Object} 图形对象基础 style，此参数控制图形的基础样式，
     * 可设属性根据图形类型参考 <KTW.Feature.ShapeParameters> 子类对象的 style 属性。
     * 优先级低于 styleGroup，styleByCodomain。
     * styleGroup - {Array{Object}} 一个 style 数组，优先级低于 styleByCodomain，高于 style。
     * 此数组每个元素是样式对象，其可设属性根据图形类型参考 <KTW.Feature.ShapeParameters> 子类对象的 style 属性。
     * 通过 index 参数从 styleGroup 中取 style。
     * styleByCodomain - {Array{Object}} 按数据（参数 value）所在值域范围控制数据的可视化对象样式。
     * (start code)
     * // styleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
     * // start: 值域值下限（包含）;
     * // end: 值域值上限（不包含）;
     * // style: 数据可视化图形的 style，其可设属性根据图形类型参考 <KTW.Feature.ShapeParameters> 子类对象的 style 属性。。
     * // dataStyleByCodomain 数组形如：
     * [
     *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
     *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
     *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
     *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
     * ]
     * (end)
     * index - {Number} styleGroup 的索引值，用于取出 styleGroup 指定的 style。
     * value - {Number} 数据值，用于取出 styleByCodomain 指定的 style。
     *
     * Returns:
     * {Object} 合并后的样式 （style） 对象。
     */
    static ShapeStyleTool(defaultStyle, style, styleGroup, styleByCodomain, index, value) {
        // 用 defaultStyle 初始化 style 对象
        var finalStyle = defaultStyle ? defaultStyle : {};

        // 基础 style
        if (style) {
            Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(finalStyle, style);
        }

        // 按索引赋 style
        if (styleGroup && styleGroup.length && typeof(index) !== "undefined" && !isNaN(index) && index >= 0) {
            if (styleGroup[index]) {
                Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(finalStyle, styleGroup[index]);
            }
        }

        // 按值域赋 style
        if (styleByCodomain && styleByCodomain.length && typeof(value) !== "undefined") {
            var dsc = styleByCodomain;
            var dscLen = dsc.length;
            var v = parseFloat(value);
            for (var i = 0; i < dscLen; i++) {
                if (dsc[i].start <= v && v < dsc[i].end) {
                    Object(__WEBPACK_IMPORTED_MODULE_17__service_common_Util__["k" /* copyAttributesWithClip */])(finalStyle, dsc[i].style);
                    break;
                }
            }
        }

        return finalStyle;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeFactory = ShapeFactory;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShapeParameters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.Feature.ShapeParameters
 * 图形参数基类，此类不可实例化
 */
class ShapeParameters {
    /**
     * Constructor: KTW.Feature.ShapeParameters
     * 图形参数对象。
     *
     * Returns:
     * {Object} 图形参数对象。
     */
    constructor() {
        /**
         * APIProperty: refOriginalPosition
         * {Array} 图形参考原点位置，图形的参考中心位置。
         * refOriginalPosition 是长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         *
         * refOriginalPosition 表示图形的参考中心，通常情况下，图形是使用 canvas 的原点位置作为位置参考，
         * 但 refOriginalPosition 可以改变图形的参考位置，例如： refOriginalPosition = [80, 80],
         * 图形圆的 style.x = 20, style.y = 20，那么圆在 canvas 中的实际位置是 [100, 100]。
         *
         * 图形（Shape） 的所有位置相关属性都是以 refOriginalPosition 为参考中心，
         * 也就是说图形的所有位置信息在 canvas 中都是以 refOriginalPosition 为参考的相对位置，只有
         * refOriginalPosition 的值为 [0, 0] 时，图形的位置信息才是 canvas 绝对位置。
         *
         * 图形的位置信息通常有：style.pointList，style.x，style.y。
         *
         * refOriginalPosition。默认值是： [0, 0]。
         */
        this.refOriginalPosition = [0, 0];

        /**
         * APIProperty: refDataID
         * {String} 图形所关联数据的 ID （ <KTW.Feature.Vector> 的 id ）。
         */
        this.refDataID = null;

        /**
         * APIProperty: isHoverByRefDataID
         * {Boolean} 是否根据 refDataID 进行高亮。用于同时高亮所有 refDataID 相同的图形。
         */
        this.isHoverByRefDataID = false;

        /**
         * APIProperty: refDataHoverGroup
         * {String} 高亮图形组的组名。此属性在 refDataID 有效且 isHoverByRefDataID 为 true 时生效。
         * 一旦设置此属性，且属性值有效，只有关联同一个数据的图形且此属性相同的图形才会高亮。
         */
        this.refDataHoverGroup = null;

        /**
         * APIProperty: dataInfo
         * {Object} 图形携带的附加数据。
         */
        this.dataInfo = null;

        /**
         * APIProperty: clickable
         * {Boolean} 是否可点击。
         */
        this.clickable = true;

        /**
         * APIProperty: hoverable
         * {Boolean} 是否可 hover。
         */
        this.hoverable = true;

        /**
         * Property: style。
         * {Object} 图形样式对象，可设样式属性在子类中确定。
         */
        this.style = null;

        /**
         * Property: highlightStyle
         * {Object} 高亮样式对象，可设样式属性与 style 的可设样式属性相同。
         */
        this.highlightStyle = {};

        this.CLASS_NAME = "KTW.Feature.ShapeParameters";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.refOriginalPosition = null;
        this.refDataID = null;
        this.isHoverByRefDataID = null;
        this.refDataHoverGroup = null;
        this.dataInfo = null;
        this.clickable = null;
        this.hoverable = null;
        this.style = null;
        this.highlightStyle = null;
    }

};


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters = ShapeParameters;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Graph; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_Theme__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_Rectangle__ = __webpack_require__(24);





/**
 * @class KTW.Feature.Theme.Graph
 * @classdesc 统计专题要素基类。
 * @description 此类定义了统计专题要素基础模型，具体的图表模型通过继承此类，在子类中实现 assembleShapes 方法。
 *              统计专题要素模型采用了可视化图形大小自适应策略，用较少的参数控制着图表诸多图形，图表配置对象 <KTW.Feature.Theme.Graph::setting> 的基础属性只有 7 个，
 *              它们控制着图表结构、值域范围、数据小数位等基础图表形态。构成图表的图形必须在图表结构里自适应大小。
 *              此类不可实例化，此类的可实例化子类必须实现 assembleShapes() 方法。
 * @extends KTW.Feature.Theme
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.Theme} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @return {KTW.Feature.Theme.Graph} 返回一个统计专题要素。
 */
class Graph extends __WEBPACK_IMPORTED_MODULE_1__feature_Theme__["a" /* Theme */] {


    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);

        /**
         * @member KTW.Feature.Theme.Graph.prototype.shapeFactory -{KTW.Feature.ShapeFactory}
         * @description 内置的图形工厂对象，调用其 createShape 方法创建图形。
         */
        this.shapeFactory = new __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */]();

        /**
         * @member KTW.Feature.Theme.Graph.prototype.shapeParameters -{Object}
         * @description 当前图形参数对象，<KTW.Feature.ShapeParameters> 的子类对象。
         */
        this.shapeParameters = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.RelativeCoordinate -{bool}
         * @description 图形是否已经计算了相对坐标。
         */
        this.RelativeCoordinate = false;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.setting -{Object}
         * @description 图表配置对象，该对象控制着图表的可视化显示。<br>
         *              下面是此配置对象的 7 个基础可设属性：<br>
         *              Symbolizer properties:<br>
         *              width - {number}专题要素（图表）宽度，必设参数。<br>
         *              height - {number}专题要素（图表）高度，必设参数。<br>
         *              codomain - {Array<number>} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。<br>
         *              XOffset - {number}  专题要素（图表）在 X 方向上的偏移值，单位像素。<br>
         *              YOffset - {number}  专题要素（图表）在 Y 方向上的偏移值，单位像素。<br>
         *              dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，它是指图表框 chartBox
         *                                                    （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。<br>
         *              decimalNumber - {number}数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。
         *                                       如果不设置此参数，在取数据值时不对数据做小数位处理。<br>
         *              除了以上 7 个基础属性，此对象的可设属性在不同子类中有较大差异，不同子类中对同一属性的解释也可能不同。
         *              请在此类的子类中查看 setting 对象的可设属性和属性含义。
         */
        this.setting = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.origonPoint - {Array<number>} {ReadOnly}
         * @description 专题要素（图表）原点，图表左上角点像素坐标，是长度为 2 的一维数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.origonPoint = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.chartBox - {Array<number>} {ReadOnly}
         * @description 专题要素（图表）区域，即图表框，长度为 4 的一维数组，数组的 4 个元素依次表示图表框左端 x 坐标值、
         *              下端 y坐标值、 右端 x坐标值、 上端 y 坐标值；[left, bottom, right, top]。
         */
        this.chartBox = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.chartBounds - {KTW.Bounds} {ReadOnly}
         * @description 图表 Bounds 随着 lonlat、XOffset、YOffset 更新，注意 chartBounds 是图表像素范围，不是地理范围。
         */
        this.chartBounds = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.width - {number}{ReadOnly}
         * @description 专题要素（图表）宽度 ，必设属性。
         */
        this.width = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.height - {number}{ReadOnly}
         * @description 专题要素（图表）高度 ，必设属性。
         */
        this.height = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.XOffset - {number}{ReadOnly}
         * @description 专题要素（图表）在 X 方向上的偏移值，单位像素。
         */
        this.XOffset = 0;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.YOffset - {number}{ReadOnly}
         * @description 专题要素（图表）在 Y 方向上的偏移值，单位像素。
         */
        this.YOffset = 0;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBParameter - {Array<number>} {ReadOnly}
         * @description 数据视图框参数，长度为 4 的一维数组（数组元素值 >= 0），[leftOffset, bottomOffset, rightOffset, topOffset]，chartBox 内偏距值。
         *               此属性用于指定数据视图框 dataViewBox 的范围。
         */
        this.DVBParameter = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.dataViewBox - {Array<number>} {ReadOnly}
         * @description 数据视图框，长度为 4 的一维数组，[left, bottom, right, top]。
         *              dataViewBox 是统计专题要素最核心的内容，它负责解释数据在一个像素区域里的数据可视化含义，
         *              这种含义用可视化图形表达出来，这些表示数据的图形和一些辅助图形组合在一起构成统计专题图表。
         */
        this.dataViewBox = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBCodomain - {Array<number>} {ReadOnly}
         * @description 数据视图框的内允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
         *              dataViewBox 中允许的数据范围，对数据溢出值域范围情况的处理需要在 assembleShapes 中进行。
         */
        this.DVBCodomain = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBCenterPoint - {Array<number>} {ReadOnly}
         * @description 数据视图框中心点，长度为 2 的一维数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.DVBCenterPoint = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBUnitValue - {string} {ReadOnly}
         * @description 单位值。在 assembleShapes() 中初始化其具体意义，例如：饼图的 DVBUnitValue 可以定义为"360/数据总和"，
         *              折线图的 DVBUnitValue 可以定义为 "DVBCodomain/DVBHeight"。
         */
        this.DVBUnitValue = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBOrigonPoint - {Array<number>} {ReadOnly}
         * @description 数据视图框原点，数据视图框左上角点，长度为 2 的一维数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.DVBOrigonPoint = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBWidth - {number}{ReadOnly}
         * @description 数据视图框宽度。
         */
        this.DVBWidth = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.DVBHeight - {number}{ReadOnly}
         * @description 数据视图框高度。
         */
        this.DVBHeight = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.origonPointOffset - {Array<number>} {ReadOnly}
         * @description 数据视图框原点相对于图表框的原点偏移量，长度为 2 的一维数组，第一个元素表示 x 偏移量，第二个元素表示 y 偏移量。
         */
        this.origonPointOffset = null;

        /**
         * @member KTW.Feature.Theme.Graph.prototype.fields - {Array<string>}
         * @description 数据{KTW.Feature.Vector}属性字段。
         */
        this.fields = fields || [];

        /**
         * @member KTW.Feature.Theme.Graph.prototype.dataValues {Array<number>}
         * @description 图表展示的数据值，通过 fields 从数据feature属性中获得。
         */
        this.dataValues = null;
        // 图表位置
        if (lonlat) {
            this.lonlat = lonlat;
        } else {
            // 默认使用 bounds 中心
            var dataBounds = data.bound;
            this.lonlat = [(dataBounds.xmin+dataBounds.xmax)/2.0,(dataBounds.ymin+dataBounds.ymax)/2.0];
           // this.lonlat = 
           // this.lonlat = this.data.geometry.getBounds().getCenterLonLat();
        }

        // 配置项检测与赋值
        if (setting && setting.width && setting.height && setting.codomain) {
            this.setting = setting;
        }
        this.CLASS_NAME = "KTW.Feature.Theme.Graph";

    }

    /**
     * @function KTW.Feature.Theme.Graph.prototype.destroy
     * @description 销毁专题要素。
     */
    destroy() {
        this.shapeFactory = null;
        this.shapeParameters = null;
        this.width = null;
        this.height = null;
        this.origonPoint = null;
        this.chartBox = null;
        this.dataViewBox = null;
        this.chartBounds = null;
        this.DVBParameter = null;
        this.DVBOrigonPoint = null;
        this.DVBCenterPoint = null;
        this.DVBWidth = null;
        this.DVBHeight = null;
        this.DVBCodomain = null;
        this.DVBUnitValue = null;
        this.origonPointOffset = null;
        this.XOffset = null;
        this.YOffset = null;
        this.fields = null;
        this.dataValues = null;
        this.setting = null;
        super.destroy();
    }


    /**
     * @function KTW.Feature.Theme.Graph.prototype.initBaseParameter
     * @description 初始化专题要素（图表）基础参数。在调用此方法前，此类的图表模型相关属性都是不可用的 ，此方法在 assembleShapes 函数中调用。<br>
     *              调用此函数关系到 setting 对象的以下属性。<br>
     *              width - {number} 专题要素（图表）宽度，必设参数。<br>
     *              height - {number} 专题要素（图表）高度，必设参数。<br>
     *              codomain - {Array<number>} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。<br>
     *              XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。<br>
     *              YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。<br>
     *              dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，它是指图表框 chartBox。<br>
     *                                     （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。<br>
     *              decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     * @return {Boolean} 初始化参数是否成功。
     */
    initBaseParameter() {
        // 参数初始化是否成功
        var isSuccess = true;

        // setting 属性是否已成功赋值
        if (!this.setting) {
            return false;
        }
        var sets = this.setting;
        // 检测 setting 的必设参数
        if (!(sets.width && sets.height && sets.codomain)) {
            return false;
        }

        // 数据
        var decimalNumber = (typeof(sets.decimalNumber) !== "undefined" && !isNaN(sets.decimalNumber)) ? sets.decimalNumber : -1;
        var dataEffective = __WEBPACK_IMPORTED_MODULE_1__feature_Theme__["a" /* Theme */].getDataValues(this.data, this.fields, decimalNumber);
        this.dataValues = dataEffective ? dataEffective : [];

        // 基础参数  width, height, codomain
        this.width = parseFloat(sets.width);
        this.height = parseFloat(sets.height);
        this.DVBCodomain = sets.codomain;

        // 图表偏移
        // if(sets.XOffset) {this.XOffset = sets.XOffset};
        // if(sets.YOffset) {this.YOffset = sets.YOffset};
        this.XOffset = sets.XOffset ? sets.XOffset : 0;
        this.YOffset = sets.YOffset ? sets.YOffset : 0;

        // 其他默认值
        this.origonPoint = [];
        this.chartBox = [];
        this.dataViewBox = [];

        this.DVBParameter = sets.dataViewBoxParameter ? sets.dataViewBoxParameter : [0, 0, 0, 0];

        this.DVBOrigonPoint = [];
        this.DVBCenterPoint = [];
        this.origonPointOffset = [];

        // 图表位置
        this.resetLocation();

        // 专题要素宽度 w
        var w = this.width;
        // 专题要素高度 h
        var h = this.height;
        // 专题要素像素位置 loc
        var loc = this.location;

        // 专题要素像素位置 loc
        this.origonPoint = [loc[0] - w / 2, loc[1] - h / 2];
        // 专题要素原点（左上角）
        var op = this.origonPoint;

        // 图表框（[left, bottom, right, top]）
        this.chartBox = [op[0], op[1] + h, op[0] + w, op[1]];
        // 图表框
        var cb = this.chartBox;

        // 数据视图框参数，它是图表框各方向对应的内偏距
        var dbbP = this.DVBParameter;
        // 数据视图框 （[left, bottom, right, top]）
        this.dataViewBox = [cb[0] + dbbP[0], cb[1] - dbbP[1], cb[2] - dbbP[2], cb[3] + dbbP[3]];
        // 数据视图框
        var dvb = this.dataViewBox;
        //检查数据视图框是否合法
        if (dvb[0] >= dvb[2] || dvb[1] <= dvb[3]) {
            return false;
        }

        // 数据视图框原点
        this.DVBOrigonPoint = [dvb[0], dvb[3]];
        // 数据视图框宽度
        this.DVBWidth = Math.abs(dvb[2] - dvb[0]);
        // 数据视图框高度
        this.DVBHeight = Math.abs(dvb[1] - dvb[3]);
        // 数据视图框中心点
        this.DVBCenterPoint = [this.DVBOrigonPoint[0] + this.DVBWidth / 2, this.DVBOrigonPoint[1] + this.DVBHeight / 2]

        // 数据视图框原点与图表框的原点偏移量
        this.origonPointOffset = [this.DVBOrigonPoint[0] - op[0], this.DVBOrigonPoint[1] - op[1]];

        return isSuccess;
    }

    /**
     * @function KTW.Feature.Theme.Graph.prototype.resetLocation
     * @description 根据地理位置 lonlat 重置专题要素（图表）位置。
     * @param lonlat - {KTW.LonLat} 专题要素新的像素中心位置。
     * @return {Array<number>} - 新专题要素像素参考位置。长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    resetLocation(lonlat) {
        if (lonlat) {
            this.lonlat = lonlat;
        }

        // 获取地理位置对应的像素坐标 newLocalLX
        var newLocalLX = this.getLocalXY(this.lonlat);
        // 处理偏移量 XOffset, YOffset
        newLocalLX[0] += this.XOffset;
        newLocalLX[1] += this.YOffset;
        // 将图形位置赋予  location 属性（注意 location 属性表示的是专题要素中心位置）
        this.location = newLocalLX;

        // 更新图表像素 Bounds
        var w = this.width;
        var h = this.height;
        var loc = this.location;
     //   this.chartBounds = new Bounds(loc[0] - w / 2, loc[1] + h / 2, loc[0] + w / 2, loc[1] - h / 2);
        this.chartBounds = new __WEBPACK_IMPORTED_MODULE_3__service_common_Rectangle__["a" /* Rectangle */](loc[0] - w / 2, loc[1] - h / 2, loc[0] + w / 2, loc[1] + h / 2);

        //重新计算当前渐变色
        this.resetLinearGradient();

        return loc;
    }

    /**
     * @function KTW.Feature.Theme.Graph.prototype.resetLinearGradient
     * @description resetLocation中调用 图表的相对坐标存在的时候，重新计算渐变的颜色。(目前用于二维柱状图渐变色 所以子类实现此方法)
     */
    resetLinearGradient() {
        //子类实现此方法
    }

    /**
     * @function KTW.Feature.Theme.Graph.prototype.shapesConvertToRelativeCoordinate
     * @description 将（构成图表）图形的节点转为相对坐标表示，此函数必须且只能在 assembleShapes() 结束时调用。
     */
    shapesConvertToRelativeCoordinate() {
        var shapes = this.shapes;
        var shapeROP = this.location;
        for (var i = 0, len = shapes.length; i < len; i++) {
            shapes[i].refOriginalPosition = shapeROP;

            var style = shapes[i].style;

            for (var sty in style) {
                switch (sty) {
                    case "pointList":
                        var pl = style[sty];
                        for (var j = 0, len2 = pl.length; j < len2; j++) {
                            pl[j][0] -= shapeROP[0];
                            pl[j][1] -= shapeROP[1];
                        }
                        break;
                    case "x":
                        style[sty] -= shapeROP[0];
                        break;
                    case "y":
                        style[sty] -= shapeROP[1];
                        break;
                    default:
                        break;
                }
            }
        }
        this.RelativeCoordinate = true;
    }


    /**
     * @function KTW.Feature.Theme.Graph.prototype.assembleShapes
     * @description 图形装配函数。抽象方法，可视化子类必须实现此方法。<br>
     *              重写此方法的步骤：<br>
     *              1. 图表的某些特殊配置项（setting）处理，例如多数图表模型需要重新指定 dataViewBoxParameter 的默认值。<br>
     *              2. 调用 initBaseParameter() 方法初始化模型属性值，此步骤必须执行，只有当 initBaseParameter 返回 true 时才可以允许进行后续步骤。<br>
     *              3. 计算图形参数，制作图形，图形组合。在组装图表过程中，应该特别注意数据视图框单位值的定义、数据值溢出值域范围的处理和图形大小自适应。<br>
     *              4. 调用 shapesConvertToRelativeCoordinate() 方法，将图形的坐标值转为相对坐标，此步骤必须执行。
     * @example
     *  //子类实现 assembleShapes() 接口的步骤示例：
     *  assembleShapes: function(){
     *    // 第一步：图表的某些特殊配置项（setting）处理，例如多数图表模型需要重新指定 dataViewBoxParameter 的默认值。此步骤是非必须过程。
     *
     *    // 图表配置对象
     *    var sets = this.setting;
     *    // 默认数据视图框，这里展示在使用坐标轴和不使用坐标轴情况下对数据视图框参数赋予不同的默认值
     *    if(!sets.dataViewBoxParameter){
     *          if(typeof(sets.useAxis) === "undefined" || sets.useAxis){
     *              sets.dataViewBoxParameter = [45, 15, 15, 15];
     *          }
     *          else{
     *                  sets.dataViewBoxParameter = [5, 5, 5, 5];
     *          }
     *    }
     *
     *    // 第二步：初始化图表模型基本参数，只有在图表模型基本参数初始化成功时才可模型相关属性，如 this.dataViewBox、 this.DVBCodomain等。此步骤是必须过程。
     *    if(!this.initBaseParameter()) return;
     *
     *    // 第三步：用图形组装图表，在组装图表过程中，应该特别注意数据视图框单位值的定义、数据值溢出值域范围的处理和图形大小自适应。
     *    // 定义图表数据视图框中单位值的含义，下面行代码表示将数据视图框单位值定义为数据视图框高度上每像素代表的数据值
     *    this.DVBUnitValue =  (this.codomain[1] - this.codomain[0])/this.DVBHeight;
     *    var uv = this.DVBUnitValue;
     *
     *    // 图形参数计算代码......
     *
     *    // 关于图形装配，实际上就是利用图形工程对象 this.shapeFactory 的 createShape() 方法通过图形参数对象创建可视化的图形对象，并把这些图形对象按序添加到模型的图形库（his.shapes）中。下面的代码演示创建一个面图形参数对象，并允许通过图形配置对象设置图形的 style 和 highlightStyle，
     *    var barParams = new KTW.Feature.ShapeParameters.Polygon(poiLists);
     *    barParams.style = sets.barStyle? sets.barStyle:{fillColor: "lightblue"};
     *    barParams.highlightStyle = sets.barHoverStyle? sets.barHoverStyle:{fillColor: "blue"};
     *    // 图形携带数据ID信息
     *    barParams.refDataID = this.data.id;
     *    // 创建图形并添加到图表图形数组中
     *    this.shapes.push(this.shapeFactory.createShape(barParams));
     *
     *    // 第四步：调用 shapesConvertToRelativeCoordinate() 方法，将图形库（his.shapes）中的图形转为由相对坐标表示的图形，客户端统计专题图模块从结构上要求可视化图形使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数。此步骤是必须过程。
     *    this.shapesConvertToRelativeCoordinate();
     * },
     */
    assembleShapes() {
        //子类必须实现此方法
    }

    /**
     * @function KTW.Feature.Theme.Graph.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param lonlat - {KTW.Lonlat} 带转换的地理坐标。
     * @return 屏幕像素坐标。
     */
    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }

};

/**
 * @function KTW.Feature.Theme.getDataValues
 * @description 根据字段名数组获取指定数据（feature）的属性值数组。属性值类型必须为 Number。
 * @param data - {KTW.Feature.Vector} 数据。
 * @param fields - {Array<string>} 字段名数组。
 * @param decimalNumber - {number} 小数位处理参数，对获取到的属性数据值进行小数位处理。
 * @return {Array<string>} 字段名数组对应的属性数据值数组。
 */
__WEBPACK_IMPORTED_MODULE_1__feature_Theme__["a" /* Theme */].getDataValues = function (data, fields, decimalNumber) {
    if (!data.attributes) {
        return false;
    }

    var fieldsValue = [];

    var attrs = data.attributes;
    for (var i = 0; i < fields.length; i++) {
        for (var field in attrs) {
            if (field !== fields[i]) {
                continue
            }
            // 数字转换判断
            try {
                if (!isNaN(decimalNumber) && decimalNumber >= 0) {
                    fieldsValue.push(parseFloat(attrs[field].toString()).toFixed(decimalNumber));
                } else {
                    fieldsValue.push(parseFloat(attrs[field].toString()));
                }
            } catch (e) {
                throw new Error("not a number")
            }
        }
    }

    if (fieldsValue.length === fields.length) {
        return fieldsValue;
    } else {
        return false;
    }
};

//KTW.Client.Graph = Graph;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Graph = Graph;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Util
 * LevelRenderer 基础工具类
 *
 */
class Util {

    /**
     * Constructor: KTW.LevelRenderer.Tool.Util
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: BUILTIN_OBJECT
         * {Object} 用于处理merge时无法遍历Date等对象的问题
         */
        this.BUILTIN_OBJECT = {
            '[object Function]': 1,
            '[object RegExp]': 1,
            '[object Date]': 1,
            '[object Error]': 1,
            '[object CanvasGradient]': 1
        };

        /**
         * Property: _ctx
         * {Object}
         */
        this._ctx = null;

        /**
         * Property: _canvas
         * {Object}
         */
        this._canvas = null;

        /**
         * Property: _pixelCtx
         * {Object}
         */
        this._pixelCtx = null;

        /**
         * Property: _width
         * {Object}
         */
        this._width = null;

        /**
         * Property: _height
         * {Object}
         */
        this._height = null;

        /**
         * Property: _offsetX
         * {Object}
         */
        this._offsetX = 0;

        /**
         * Property: _offsetY
         * {Object}
         */
        this._offsetY = 0;

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Util";

    }


    /**
     * APIMethod: clone
     * 对一个object进行深度拷贝。
     *
     * Parameters:
     * source - {Object} 需要进行拷贝的对象。
     *
     * Returns:
     * {Object} 拷贝后的新对象。
     */
    clone(source) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (typeof source == 'object' && source !== null) {
            var result = source;
            if (source instanceof Array) {
                result = [];
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = this.clone(source[i]);
                }
            } else if (!BUILTIN_OBJECT[Object.prototype.toString.call(source)]) {
                result = {};
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        result[key] = this.clone(source[key]);
                    }
                }
            }

            return result;
        }

        return source;
    }


    /**
     * Method: mergeItem
     * 合并源对象的单个属性到目标对象。
     *
     * Parameters:
     * target - {Object} 目标对象。
     * source - {Object} 源对象。
     * key - {String} 键。
     * overwrite - {Boolean} 是否覆盖。
     *
     * Returns:
     * {Object} 目标对象。
     */
    mergeItem(target, source, key, overwrite) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (source.hasOwnProperty(key)) {
            if (typeof target[key] == 'object'
                && !BUILTIN_OBJECT[Object.prototype.toString.call(target[key])]
            ) {
                // 如果需要递归覆盖，就递归调用merge
                this.merge(
                    target[key],
                    source[key],
                    overwrite
                );
            } else if (overwrite || !(key in target)) {
                // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                target[key] = source[key];
            }
        }
    }


    /**
     * APIMethod: merge
     * 合并源对象的属性到目标对象。
     *
     * Parameters:
     * target - {Object} 目标对象。
     * source - {Object} 源对象。
     * overwrite - {Boolean} 是否覆盖。
     *
     * Returns:
     * {Object} 目标对象。
     */
    merge(target, source, overwrite) {
        for (var i in source) {
            this.mergeItem(target, source, i, overwrite);
        }

        return target;
    }


    /**
     * Method: getContext
     * 获取 Cavans 上下文
     *
     * Returns:
     * {Object} Cavans 上下文。
     */
    getContext() {
        if (!this._ctx) {
            this._ctx = document.createElement('canvas').getContext('2d');
        }
        return this._ctx;
    }


    /**
     * APIMethod: getPixelContext
     * 获取像素拾取专用的上下文
     *
     * Returns:
     * {Object}像素拾取专用的上下文。
     */
    getPixelContext() {
        if (!this._pixelCtx) {
            this._canvas = document.createElement('canvas');
            this._width = this._canvas.width;
            this._height = this._canvas.height;
            this._pixelCtx = this._canvas.getContext('2d');
        }
        return this._pixelCtx;
    }


    /**
     * APIMethod: adjustCanvasSize
     * 如果坐标处在_canvas外部，改变_canvas的大小
     *
     * 注意 修改canvas的大小 需要重新设置translate
     *
     * Parameters:
     * x - {Number} 横坐标。
     * y - {Number} 纵坐标。
     *
     */
    adjustCanvasSize(x, y) {
        var _canvas = this._canvas;
        var _pixelCtx = this._pixelCtx;
        var _width = this._width;
        var _height = this._height;
        var _offsetX = this._offsetX;
        var _offsetY = this._offsetY;

        // 每次加的长度
        var _v = 100;
        var _flag;

        if (x + _offsetX > _width) {
            _width = x + _offsetX + _v;
            _canvas.width = _width;
            _flag = true;
        }

        if (y + _offsetY > _height) {
            _height = y + _offsetY + _v;
            _canvas.height = _height;
            _flag = true;
        }

        if (x < -_offsetX) {
            _offsetX = Math.ceil(-x / _v) * _v;
            _width += _offsetX;
            _canvas.width = _width;
            _flag = true;
        }

        if (y < -_offsetY) {
            _offsetY = Math.ceil(-y / _v) * _v;
            _height += _offsetY;
            _canvas.height = _height;
            _flag = true;
        }

        if (_flag) {
            _pixelCtx.translate(_offsetX, _offsetY);
        }
    }


    /**
     * APIMethod: getPixelOffset
     * 获取像素canvas的偏移量
     *
     * Returns:
     * {Object}偏移量。
     */
    getPixelOffset() {
        return {
            x: this._offsetX,
            y: this._offsetY
        };
    }


    /**
     * APIMethod: indexOf
     * 查询数组中元素的index
     *
     * Returns:
     * {Object}偏移量。
     */
    indexOf(array, value) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }


    /**
     * APIMethod: inherits
     * 构造类继承关系
     *
     * Parameters:
     * clazz - {Function} 源类。
     * baseClazz - {Function} 基类。
     *
     * Returns:
     * {Object}偏移量。
     */
    inherits(clazz, baseClazz) {
        var clazzPrototype = clazz.prototype;

        function F() {
        }

        F.prototype = baseClazz.prototype;
        clazz.prototype = new F();

        for (var prop in clazzPrototype) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
        clazz.constructor = clazz;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Util = Util;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Eventful; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Eventful
 * 事件分发器超类，所有支持事件处理的类均是此类的子类。
 *
 * 此类不可实例化。
 *
 */
class Eventful {




    /*
     * Constructor: KTW.LevelRenderer.Eventful
     * 构造函数。
     *
     * 对象可以通过 onxxxx 绑定事件。
     *
     * 支持的事件：
     * Symbolizer properties:
     * onclick - {Function} 默认值：null。
     * onmouseover - {Function} 默认值：null。
     * onmouseout - {Function} 默认值：null。
     * onmousemove - {Function} 默认值：null。
     * onmousewheel - {Function} 默认值：null。
     * onmousedown - {Function} 默认值：null。
     * onmouseup - {Function} 默认值：null。
     * ondragstart - {Function} 默认值：null。
     * ondragend - {Function} 默认值：null。
     * ondragenter - {Function} 默认值：null。
     * ondragleave - {Function} 默认值：null。
     * ondragover - {Function} 默认值：null。
     * ondrop - {Function} 默认值：null。
     */
    constructor() {
        /**
         * Property: _handlers
         * {Object} 事件处理对象（事件分发器）。
         */
        this._handlers = {};
        this.CLASS_NAME = "KTW.LevelRenderer.Eventful";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this._handlers = null;
    }


    /**
     * APIMethod: one
     * 单次触发绑定，dispatch后销毁。
     *
     * Parameters:
     * event - {String} 事件名。
     * handler - {Boolean} 响应函数。
     * context - {Object} context。
     *
     * Returns:
     * {<KTW.LevelRenderer.Eventful>} this。
     */
    one(event, handler, context) {
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h: handler,
            one: true,
            ctx: context || this
        });

        return this;
    }


    /**
     * APIMethod: bind
     * 绑定事件。
     *
     * Parameters:
     * event - {String} 事件名。
     * handler - {Boolean} 事件处理函数。
     * context - {Object} context。
     *
     * Returns:
     * {<KTW.LevelRenderer.Eventful>} this。
     */
    bind(event, handler, context) {
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h: handler,
            one: false,
            ctx: context || this
        });

        return this;
    }


    /**
     * APIMethod: unbind
     * 解绑事件。
     *
     * Parameters:
     * event - {String} 事件名。
     * handler - {Boolean} 事件处理函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Eventful>} this。
     */
    unbind(event, handler) {
        var _h = this._handlers;

        if (!event) {
            this._handlers = {};
            return this;
        }

        if (handler) {
            if (_h[event]) {
                var newList = [];
                for (var i = 0, l = _h[event].length; i < l; i++) {
                    if (_h[event][i]['h'] != handler) {
                        newList.push(_h[event][i]);
                    }
                }
                _h[event] = newList;
            }

            if (_h[event] && _h[event].length === 0) {
                delete _h[event];
            }
        } else {
            delete _h[event];
        }

        return this;
    }


    /**
     * APIMethod: dispatch
     * 事件分发。
     *
     * Parameters:
     * type - {String} 事件类型。
     *
     * Returns:
     * {<KTW.LevelRenderer.Eventful>} this。
     */
    dispatch(type) {
        if (this._handlers[type]) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 3) {
                args = Array.prototype.slice.call(args, 1);
            }

            var _h = this._handlers[type];
            var len = _h.length;
            for (var i = 0; i < len;) {
                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        _h[i]['h'].call(_h[i]['ctx']);
                        break;
                    case 2:
                        _h[i]['h'].call(_h[i]['ctx'], args[1]);
                        break;
                    case 3:
                        _h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        _h[i]['h'].apply(_h[i]['ctx'], args);
                        break;
                }

                if (_h[i]['one']) {
                    _h.splice(i, 1);
                    len--;
                } else {
                    i++;
                }
            }
        }

        return this;
    }


    /**
     * APIMethod: dispatchWithContext
     * 带有context的事件分发, 最后一个参数是事件回调的 context。
     *
     * Parameters:
     * type - {String} 事件类型。
     *
     * Returns:
     * {<KTW.LevelRenderer.Eventful>} this。
     */
    dispatchWithContext(type) {
        if (this._handlers[type]) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 4) {
                args = Array.prototype.slice.call(args, 1, args.length - 1);
            }
            var ctx = args[args.length - 1];

            var _h = this._handlers[type];
            var len = _h.length;
            for (var i = 0; i < len;) {
                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        _h[i]['h'].call(ctx);
                        break;
                    case 2:
                        _h[i]['h'].call(ctx, args[1]);
                        break;
                    case 3:
                        _h[i]['h'].call(ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        _h[i]['h'].apply(ctx, args);
                        break;
                }

                if (_h[i]['one']) {
                    _h.splice(i, 1);
                    len--;
                } else {
                    i++;
                }
            }
        }

        return this;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Eventful = Eventful;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Point
 * 点参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Point extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {

    /**
     * Constructor: KTW.Feature.ShapeParameters.Point
     * 创建一个图形点参数对象。
     *
     * Parameters:
     * x - {Number} 点 x 坐标，必设参数
     * y - {Number} 点 y 坐标，必设参数。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Point>} 图形点参数对象。
     */
    constructor(x, y) {
        super(x, y);
        /**
         * APIProperty: x
         * {Number} 点 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 点 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * Property: y
         * {Number} 点的半径。style.pointRadius 默认值。
         */
        this.r = 6;


        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Point";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;

        super.destroy();
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Point = Point;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Polygon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Polygon
 * 面参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Polygon extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {

    /**
     * Constructor: KTW.Feature.ShapeParameters.Polygon
     * 创建一个图形面参数对象。
     *
     * Parameters:
     * pointList - {Array} 面要素节点数组，二维数组，必设参数。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Polygon>} 图形面参数对象。
     */
    constructor(pointList) {
        super(pointList);
        /**
         * APIProperty: pointList
         * {Array} 面要素节点数组，二维数组。
         *
         * 数组形如：
         * (start code)
         *  [
         *  [10, 20],         //节点
         *  [30, 40],
         *  [25, 30]         //最后一个节点和第一个节点不必相同，绘制时自动封闭
         *   ]
         * (end)
         */
        this.pointList = pointList;

        /**
         * Property: holePolygonPointLists
         * {Array} 岛洞面多边形顶点数组（三维数组）
         */
        this.holePolygonPointLists = null;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Polygon";
    }

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.pointList = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Polygon = Polygon;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Sector
 * 扇形参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Sector extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {


    /**
     * Constructor: KTW.Feature.ShapeParameters.Sector
     * 创建一个扇形参数对象。
     *
     * Parameters:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 外圆半径，必设参数。
     * startAngle - {Number} 起始角度，必设参数。取值范围[0, 360)。
     * endAngle - {Number} 结束角度，必设参数。取值范围(0, 360]。
     * r0 - {Number} 内圆半径，指定后将出现内弧，同时扇边长度为`r - r0`。取值范围[0, r)，默认值：0。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Sector>} 扇形参数对象。
     */
    constructor(x, y, r, startAngle, endAngle, r0, clockWise) {
        super(x, y, r, startAngle, endAngle, r0, clockWise);
        /**
         * APIProperty: x
         * {Number} 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 圆心 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * APIProperty: r
         * {Number} 外圆半径。
         */
        this.r = !isNaN(r) ? r : 0;

        /**
         * APIProperty: startAngle
         * {Number} 起始角度。取值范围[0, 360)，默认值：null。
         */
        this.startAngle = !isNaN(startAngle) ? startAngle : 0;

        /**
         * APIProperty: endAngle
         * {Number} 结束角度。取值范围(0, 360]，默认值：null。
         */
        this.endAngle =  !isNaN(endAngle) ? endAngle : 0;

        /**
         * APIProperty: r0
         * {Number} 内圆半径，指定后将出现内弧，同时扇边长度为 r 减 r0。取值范围[0, r)，默认值：0。
         */
        this.r0 = !isNaN(r0) ? r0 : 0;

        /**
         * Property: clockWise
         * {Boolean} 是否是顺时针。默认值：false。
         */
        this.clockWise = clockWise;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Sector";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        this.startAngle = null;
        this.endAngle = null;
        this.r0 = null;
        this.clockWise = null;

        super.destroy();
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Sector = Sector;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Transformable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SUtil__ = __webpack_require__(3);



/**
 * @private
 * @class  KTW.LevelRenderer.Transformable
 * 可变换超类，所有支持 Canvas Transform 变换操作的类均是此类的子类。
 *
 * 此类不可实例化。
 *
 */
class Transformable {

    /**
     * Constructor: KTW.LevelRenderer.Transformable
     * 构造函数。
     */
    constructor() {
        /**
         * APIProperty: position
         * {Array{Number}} 平移， 默认值：[0, 0]。
         */
        this.position = [0, 0];

        /**
         * APIProperty: rotation
         * {Array{Number}} 旋转，可以通过数组二三项指定旋转的原点， 默认值：[0, 0, 0]。
         */
        this.rotation = [0, 0, 0];

        /**
         * APIProperty: scale
         * {Array{Number}} 缩放，可以通过数组三四项指定缩放的原点， 默认值：[1, 1, 0, 0]。
         */
        this.scale = [1, 1, 0, 0];

        /**
         * Property: needLocalTransform
         * {Boolean} 是否变换。默认值：false。
         */
        this.needLocalTransform = false;

        /**
         * APIProperty: needTransform
         * {Boolean} 是否有坐标变换。默认值：false。
         */
        this.needTransform = false;

        this.CLASS_NAME = "KTW.LevelRenderer.Transformable";
        /**
         * APIMethod: lookAt
         * 设置图形的朝向。
         *
         */
        this.lookAt = (function () {
            var v = __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_vector.create();
            // {Array{Number}|Float32Array} target
            return function (target) {
                if (!this.transform) {
                    this.transform = __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.create();
                }
                var m = this.transform;
                __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_vector.sub(v, target, this.position);
                if (isAroundZero(v[0]) && isAroundZero(v[1])) {
                    return;
                }
                __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_vector.normalize(v, v);
                // Y Axis
                // TODO Scale origin ?
                m[2] = v[0] * this.scale[1];
                m[3] = v[1] * this.scale[1];
                // X Axis
                m[0] = v[1] * this.scale[0];
                m[1] = -v[0] * this.scale[0];
                // Position
                m[4] = this.position[0];
                m[5] = this.position[1];

                this.decomposeTransform();

                function isAroundZero(val) {
                    var EPSILON = 5e-5;
                    return val > -EPSILON && val < EPSILON;
                }
            };
        })();
    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.needLocalTransform = null;
        this.needTransform = null;
    }


    /**
     * Method: updateNeedTransform
     * 更新  needLocalTransform
     *
     */
    updateNeedTransform() {
        this.needLocalTransform = isNotAroundZero(this.rotation[0])
            || isNotAroundZero(this.position[0])
            || isNotAroundZero(this.position[1])
            || isNotAroundZero(this.scale[0] - 1)
            || isNotAroundZero(this.scale[1] - 1);

        function isNotAroundZero(val) {
            var EPSILON = 5e-5;
            return val > EPSILON || val < -EPSILON;
        }
    }


    /**
     * APIMethod: updateTransform
     * 判断是否需要有坐标变换，更新 needTransform 属性。
     * 如果有坐标变换, 则从 position, rotation, scale 以及父节点的 transform 计算出自身的 transform 矩阵
     *
     */
    updateTransform() {
        this.updateNeedTransform();

        if (this.parent) {
            this.needTransform = this.needLocalTransform || this.parent.needTransform;
        } else {
            this.needTransform = this.needLocalTransform;
        }

        if (!this.needTransform) {
            return;
        }

        var origin = [0, 0];

        var m = this.transform || __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.create();
        __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.identity(m);

        if (this.needLocalTransform) {
            if (
                isNotAroundZero(this.scale[0])
                || isNotAroundZero(this.scale[1])
            ) {
                origin[0] = -this.scale[2] || 0;
                origin[1] = -this.scale[3] || 0;
                let haveOrigin = isNotAroundZero(origin[0])
                    || isNotAroundZero(origin[1]);
                if (haveOrigin) {
                    __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.translate(
                        m, m, origin
                    );
                }
                __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.scale(m, m, this.scale);
                if (haveOrigin) {
                    origin[0] = -origin[0];
                    origin[1] = -origin[1];
                    __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.translate(
                        m, m, origin
                    );
                }
            }

            if (this.rotation instanceof Array) {
                if (this.rotation[0] !== 0) {
                    origin[0] = -this.rotation[1] || 0;
                    origin[1] = -this.rotation[2] || 0;
                    let haveOrigin = isNotAroundZero(origin[0])
                        || isNotAroundZero(origin[1]);
                    if (haveOrigin) {
                        __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.translate(
                            m, m, origin
                        );
                    }
                    __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.rotate(m, m, this.rotation[0]);
                    if (haveOrigin) {
                        origin[0] = -origin[0];
                        origin[1] = -origin[1];
                        __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.translate(
                            m, m, origin
                        );
                    }
                }
            } else {
                if (this.rotation !== 0) {
                    __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.rotate(m, m, this.rotation);
                }
            }

            if (
                isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1])
            ) {
                __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.translate(m, m, this.position);
            }
        }

        // 保存这个变换矩阵
        this.transform = m;

        // 应用父节点变换
        if (this.parent && this.parent.needTransform) {
            if (this.needLocalTransform) {
                __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.mul(this.transform, this.parent.transform, this.transform);
            } else {
                __WEBPACK_IMPORTED_MODULE_1__SUtil__["a" /* SUtil */].Util_matrix.copy(this.transform, this.parent.transform);
            }
        }

        function isNotAroundZero(val) {
            var EPSILON = 5e-5;
            return val > EPSILON || val < -EPSILON;
        }
    }


    /**
     * APIMethod: setTransform
     * 将自己的 transform 应用到 context 上。
     *
     * Parameters:
     * ctx - {Context2D} Context2D 上下文。
     */
    setTransform(ctx) {
        if (this.needTransform) {
            var m = this.transform;
            ctx.transform(
                m[0], m[1],
                m[2], m[3],
                m[4], m[5]
            );
        }
    }



    /**
     * APIMethod: decomposeTransform
     * 分解`transform`矩阵到`position`, `rotation`, `scale` 。
     *
     */
    decomposeTransform() {
        if (!this.transform) {
            return;
        }
        var m = this.transform;
        var sx = m[0] * m[0] + m[1] * m[1];
        var position = this.position;
        var scale = this.scale;
        var rotation = this.rotation;
        if (isNotAroundZero(sx - 1)) {
            sx = Math.sqrt(sx);
        }
        var sy = m[2] * m[2] + m[3] * m[3];
        if (isNotAroundZero(sy - 1)) {
            sy = Math.sqrt(sy);
        }
        position[0] = m[4];
        position[1] = m[5];
        scale[0] = sx;
        scale[1] = sy;
        scale[2] = scale[3] = 0;
        rotation[0] = Math.atan2(-m[1] / sy, m[0] / sx);
        rotation[1] = rotation[2] = 0;

        function isNotAroundZero(val) {
            var EPSILON = 5e-5;
            return val > EPSILON || val < -EPSILON;
        }
    }

};


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Transformable = Transformable;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Curve; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vector__ = __webpack_require__(14);



/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Curve
 * LevelRenderer 工具-曲线
 *
 */
class Curve {

    /**
     * Constructor: KTW.LevelRenderer.Tool.Curve
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: vector
         * {<KTW.LevelRenderer.Tool.Vector>} 矢量工具
         */
        this.vector = new __WEBPACK_IMPORTED_MODULE_1__Vector__["a" /* Vector */]();

        /**
         * Property: EPSILON
         * {Number} e
         */
        this.EPSILON = 1e-4;

        /**
         * Property: THREE_SQRT
         * {Number} 3 的平方根
         */
        this.THREE_SQRT = Math.sqrt(3);

        /**
         * Property: ONE_THIRD
         * {Number} 1/3
         */
        this.ONE_THIRD = 1 / 3;

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Curve";
    }


    /**
     * Method: evalCubicCoeff
     *
     * Parameters:
     * a - {Number} 值。
     * b - {Number} 值。
     * c - {Number} 值。
     * d - {Number} 值。
     * t - {Number} 值。
     *
     * Returns:
     * {Number}
     */

    /*
     evalCubicCoeff: function(a, b, c, d, t){
     return ((a * t + b) * t + c) * t + d;
     },
     */

    /**
     * Method: isAroundZero
     * 判断一个值是否趋于0，判断参考值：1e-4。
     *
     * Parameters:
     * val - {Number} 值。
     *
     * Returns:
     * {Boolean} 值是否趋于0。
     */
    isAroundZero(val) {
        return val > -this.EPSILON && val < this.EPSILON;
    }


    /**
     * Method: isNotAroundZero
     * 判断一个值是否不趋于0，判断参考值：1e-4。
     *
     * Parameters:
     * val - {Number} 值。
     *
     * Returns:
     * {Boolean} 值是否不趋于0。
     */
    isNotAroundZero(val) {
        return val > this.EPSILON || val < -this.EPSILON;
    }


    /**
     * APIMethod: cubicAt
     * 计算三次贝塞尔值
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * p3 - {Number}
     * t - {Number}
     *
     * Returns:
     * {number} 三次贝塞尔值
     */
    cubicAt(p0, p1, p2, p3, t) {
        var onet = 1 - t;
        return onet * onet * (onet * p0 + 3 * t * p1)
            + t * t * (t * p3 + 3 * onet * p2);
    }


    /**
     * APIMethod: cubicDerivativeAt
     * 计算三次贝塞尔导数值
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * p3 - {Number}
     * t - {Number}
     *
     * Returns:
     * {number} 三次贝塞尔导数值
     */
    cubicDerivativeAt(p0, p1, p2, p3, t) {
        var onet = 1 - t;
        return 3 * (
            ((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
            + (p3 - p2) * t * t
        );
    }


    /**
     * APIMethod: cubicRootAt
     * 计算三次贝塞尔方程根，使用盛金公式
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * p3 - {Number}
     * val - {Number}
     * roots -{Array<number>} 有效根数目
     *
     * Returns:
     * {number} 有效根
     */
    cubicRootAt(p0, p1, p2, p3, val, roots) {
        // Evaluate roots of cubic functions
        var a = p3 + 3 * (p1 - p2) - p0;
        var b = 3 * (p2 - p1 * 2 + p0);
        var c = 3 * (p1 - p0);
        var d = p0 - val;

        var A = b * b - 3 * a * c;
        var B = b * c - 9 * a * d;
        var C = c * c - 3 * b * d;

        var n = 0;

        if (this.isAroundZero(A) && this.isAroundZero(B)) {
            if (this.isAroundZero(b)) {
                roots[0] = 0;
            } else {
                let t1 = -c / b;  //t1, t2, t3, b is not zero
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        } else {
            var disc = B * B - 4 * A * C;

            if (this.isAroundZero(disc)) {
                var K = B / A;
                let t1 = -b / a + K;  // t1, a is not zero
                let t2 = -K / 2;  // t2, t3
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            } else if (disc > 0) {
                let discSqrt = Math.sqrt(disc);
                let Y1 = A * b + 1.5 * a * (-B + discSqrt);
                let Y2 = A * b + 1.5 * a * (-B - discSqrt);
                if (Y1 < 0) {
                    Y1 = -Math.pow(-Y1, this.ONE_THIRD);
                } else {
                    Y1 = Math.pow(Y1, this.ONE_THIRD);
                }
                if (Y2 < 0) {
                    Y2 = -Math.pow(-Y2, this.ONE_THIRD);
                } else {
                    Y2 = Math.pow(Y2, this.ONE_THIRD);
                }
                let t1 = (-b - (Y1 + Y2)) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            } else {
                var T = (2 * A * b - 3 * a * B) / (2 * Math.sqrt(A * A * A));
                var theta = Math.acos(T) / 3;
                var ASqrt = Math.sqrt(A);
                var tmp = Math.cos(theta);

                let t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
                let t2 = (-b + ASqrt * (tmp + this.THREE_SQRT * Math.sin(theta))) / (3 * a);
                let t3 = (-b + ASqrt * (tmp - this.THREE_SQRT * Math.sin(theta))) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
                if (t3 >= 0 && t3 <= 1) {
                    roots[n++] = t3;
                }
            }
        }
        return n;
    }


    /**
     * APIMethod: cubicExtrema
     * 计算三次贝塞尔方程极限值的位置
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * p3 - {Number}
     * extrema - {Array<number>}
     *
     * Returns:
     * {number} 有效数目
     */
    cubicExtrema(p0, p1, p2, p3, extrema) {
        var b = 6 * p2 - 12 * p1 + 6 * p0;
        var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
        var c = 3 * p1 - 3 * p0;

        var n = 0;
        if (this.isAroundZero(a)) {
            if (this.isNotAroundZero(b)) {
                let t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
            }
        } else {
            var disc = b * b - 4 * a * c;
            if (this.isAroundZero(disc)) {
                extrema[0] = -b / (2 * a);
            } else if (disc > 0) {
                let discSqrt = Math.sqrt(disc);
                let t1 = (-b + discSqrt) / (2 * a);
                let t2 = (-b - discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    extrema[n++] = t2;
                }
            }
        }
        return n;
    }


    /**
     * APIMethod cubicSubdivide
     * 细分三次贝塞尔曲线
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * p3 - {Number}
     * t - {Number}
     * out - {Array{Number}}
     *
     * Returns:
     * {number} out
     */
    cubicSubdivide(p0, p1, p2, p3, t, out) {
        var p01 = (p1 - p0) * t + p0;
        var p12 = (p2 - p1) * t + p1;
        var p23 = (p3 - p2) * t + p2;

        var p012 = (p12 - p01) * t + p01;
        var p123 = (p23 - p12) * t + p12;

        var p0123 = (p123 - p012) * t + p012;
        // Seg0
        out[0] = p0;
        out[1] = p01;
        out[2] = p012;
        out[3] = p0123;
        // Seg1
        out[4] = p0123;
        out[5] = p123;
        out[6] = p23;
        out[7] = p3;
    }


    /**
     * APIMethod: cubicProjectPoint
     * 投射点到三次贝塞尔曲线上，返回投射距离。投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
     *
     * Parameters:
     * x0 - {Number}
     * y0 - {Number}
     * x1 - {Number}
     * y1 - {Number}
     * x2 - {Number}
     * y2 - {Number}
     * x3 - {Number}
     * y3 - {Number}
     * x - {Number}
     * y - {Number}
     * out - {Array{Number}}  投射点
     *
     * Returns:
     * {number} out
     */
    cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
        // 临时变量
        var _v0 = this.vector.create();
        var _v1 = this.vector.create();
        var _v2 = this.vector.create();
        // var _v3 = vector.create();

        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // 先粗略估计一下可能的最小距离的 t 值
        // PENDING
        for (let _t = 0; _t < 1; _t += 0.05) {
            _v1[0] = this.cubicAt(x0, x1, x2, x3, _t);
            _v1[1] = this.cubicAt(y0, y1, y2, y3, _t);
            let d1 = this.vector.distSquare(_v0, _v1);
            if (d1 < d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (let i = 0; i < 32; i++) {
            if (interval < this.EPSILON) {
                break;
            }
            let prev = t - interval;
            let next = t + interval;
            // t - interval
            _v1[0] = this.cubicAt(x0, x1, x2, x3, prev);
            _v1[1] = this.cubicAt(y0, y1, y2, y3, prev);

            let d1 = this.vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 < d) {
                t = prev;
                d = d1;
            } else {
                // t + interval
                _v2[0] = this.cubicAt(x0, x1, x2, x3, next);
                _v2[1] = this.cubicAt(y0, y1, y2, y3, next);
                let d2 = this.vector.distSquare(_v2, _v0);

                if (next <= 1 && d2 < d) {
                    t = next;
                    d = d2;
                } else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = this.cubicAt(x0, x1, x2, x3, t);
            out[1] = this.cubicAt(y0, y1, y2, y3, t);
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }


    /**
     * APIMethod: quadraticAt
     * 计算二次方贝塞尔值
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * t - {Number}
     *
     * Returns:
     * {number} 二次方贝塞尔值
     */
    quadraticAt(p0, p1, p2, t) {
        var onet = 1 - t;
        return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
    }


    /**
     * APIMethod: quadraticDerivativeAt
     * 计算二次方贝塞尔导数值
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * t - {Number}
     *
     * Returns:
     * {number} 二次方贝塞尔导数值
     */
    quadraticDerivativeAt(p0, p1, p2, t) {
        return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
    }


    /**
     * APIMethod: quadraticRootAt
     * 计算二次方贝塞尔方程根
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     * val - {Number}
     * roots - {Array{Number}}
     *
     * Returns:
     * {number} 有效根数目
     */
    quadraticRootAt(p0, p1, p2, val, roots) {
        var a = p0 - 2 * p1 + p2;
        var b = 2 * (p1 - p0);
        var c = p0 - val;

        var n = 0;
        if (this.isAroundZero(a)) {
            if (this.isNotAroundZero(b)) {
                var t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        } else {
            var disc = b * b - 4 * a * c;
            if (this.isAroundZero(disc)) {
                let t1 = -b / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            } else if (disc > 0) {
                let discSqrt = Math.sqrt(disc);
                let t1 = (-b + discSqrt) / (2 * a);
                let t2 = (-b - discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            }
        }
        return n;
    }


    /**
     * APIMethod: quadraticExtremum
     * 计算二次贝塞尔方程极限值
     *
     * Parameters:
     * p0 - {Number}
     * p1 - {Number}
     * p2 - {Number}
     *
     * Returns:
     * {number}  二次贝塞尔方程极限值
     */
    quadraticExtremum(p0, p1, p2) {
        var divider = p0 + p2 - 2 * p1;
        if (divider === 0) {
            // p1 is center of p0 and p2
            return 0.5;
        } else {
            return (p0 - p1) / divider;
        }
    }


    /**
     * APIMethod: quadraticProjectPoint
     * 投射点到二次贝塞尔曲线上，返回投射距离。投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
     *
     * Parameters:
     * x0 - {Number}
     * y0 - {Number}
     * x1 - {Number}
     * y1 - {Number}
     * x2 - {Number}
     * y2 - {Number}
     * x - {Number}
     * y - {Number}
     * out - {Array{Number}}  投射点
     *
     * Returns:
     * {number} 投射距离
     */
    quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
        // 临时变量
        var _v0 = this.vector.create();
        var _v1 = this.vector.create();
        var _v2 = this.vector.create();

        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // 先粗略估计一下可能的最小距离的 t 值
        // PENDING
        for (let _t = 0; _t < 1; _t += 0.05) {
            _v1[0] = this.quadraticAt(x0, x1, x2, _t);
            _v1[1] = this.quadraticAt(y0, y1, y2, _t);
            let d1 = this.vector.distSquare(_v0, _v1);
            if (d1 < d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (let i = 0; i < 32; i++) {
            if (interval < this.EPSILON) {
                break;
            }
            let prev = t - interval;
            let next = t + interval;
            // t - interval
            _v1[0] = this.quadraticAt(x0, x1, x2, prev);
            _v1[1] = this.quadraticAt(y0, y1, y2, prev);

            let d1 = this.vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 < d) {
                t = prev;
                d = d1;
            } else {
                // t + interval
                _v2[0] = this.quadraticAt(x0, x1, x2, next);
                _v2[1] = this.quadraticAt(y0, y1, y2, next);
                let d2 = this.vector.distSquare(_v2, _v0);
                if (next <= 1 && d2 < d) {
                    t = next;
                    d = d2;
                } else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = this.quadraticAt(x0, x1, x2, t);
            out[1] = this.quadraticAt(y0, y1, y2, t);
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Curve = Curve;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Vector
 * LevelRenderer 二维向量类
 *
 */
class Vector {

    /**
     * Constructor: KTW.LevelRenderer.Tool.Vector
     * 构造函数。
     *
     */
    constructor() {
        this.ArrayCtor = typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Vector";
    }

    /**
     * APIMethod: create
     * 创建一个向量。
     *
     * Parameters:
     * x - {Number} x 坐标。
     * y - {Number} y 坐标。
     *
     * Returns:
     * {Vector2} 向量。
     */
    create(x, y) {
        var ArrayCtor = this.ArrayCtor;

        var out = new ArrayCtor(2);
        out[0] = x || 0;
        out[1] = y || 0;

        return out;
    }

    /**
     * APIMethod: copy
     * 复制一个向量。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Vector2} 克隆向量。
     */
    copy(out, v) {
        out[0] = v[0];
        out[1] = v[1];
        return out;
    }

    /**
     * APIMethod: set
     * 设置向量的两个项。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * a - {Number} 项 a。
     * b - {Number} 项 b。
     *
     * Returns:
     * {Vector2} 结果。
     */
    set(out, a, b) {
        out[0] = a;
        out[1] = b;
        return out;
    }

    /**
     * APIMethod: add
     * 向量相加。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    add(out, v1, v2) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        return out;
    }

    /**
     * APIMethod: scaleAndAdd
     * 向量缩放后相加。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2（缩放向量）。
     * a - {Number} 缩放参数。
     *
     * Returns:
     * {Vector2} 结果。
     */
    scaleAndAdd(out, v1, v2, a) {
        out[0] = v1[0] + v2[0] * a;
        out[1] = v1[1] + v2[1] * a;
        return out;
    }

    /**
     * APIMethod: sub
     * 向量相减。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    sub(out, v1, v2) {
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        return out;
    }

    /**
     * APIMethod: len
     * 向量长度。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度。
     */
    len(v) {
        return Math.sqrt(this.lenSquare(v));
    }

    /**
     * APIMethod: lenSquare
     * 向量长度平方。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度平方。
     */
    lenSquare(v) {
        return v[0] * v[0] + v[1] * v[1];
    }

    /**
     * APIMethod: mul
     * 向量乘法。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    mul(out, v1, v2) {
        out[0] = v1[0] * v2[0];
        out[1] = v1[1] * v2[1];
        return out;
    }

    /**
     * APIMethod: div
     * 向量除法。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    div(out, v1, v2) {
        out[0] = v1[0] / v2[0];
        out[1] = v1[1] / v2[1];
        return out;
    }

    /**
     * APIMethod: dot
     * 向量点乘。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量点乘。
     */
    dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }

    /**
     * APIMethod: scale
     * 向量缩放。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     * s - {Number} 缩放参数。
     *
     * Returns:
     * {Vector2} 结果。
     */
    scale(out, v, s) {
        out[0] = v[0] * s;
        out[1] = v[1] * s;
        return out;
    }

    /**
     * APIMethod: normalize
     * 向量归一化。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     *
     * Returns:
     * {Vector2} 结果。
     */
    normalize(out, v) {
        var d = this.len(v);
        if (d === 0) {
            out[0] = 0;
            out[1] = 0;
        } else {
            out[0] = v[0] / d;
            out[1] = v[1] / d;
        }
        return out;
    }

    /**
     * APIMethod: distance
     * 计算向量间距离。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量间距离。
     */
    distance(v1, v2) {
        return Math.sqrt(
            (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1])
        );
    }

    /**
     * APIMethod: distanceSquare
     * 向量距离平方。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量距离平方。
     */
    distanceSquare(v1, v2) {
        return (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1]);
    }

    /**
     * APIMethod: negate
     * 求负向量。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     *
     * Returns:
     * {Vector2} 负向量。
     */
    negate(out, v) {
        out[0] = -v[0];
        out[1] = -v[1];
        return out;
    }

    /**
     * APIMethod: lerp
     * 插值两个点。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     * t - {Number} 。
     *
     * Returns:
     * {Vector2} 结果。
     */
    lerp(out, v1, v2, t) {
        out[0] = v1[0] + t * (v2[0] - v1[0]);
        out[1] = v1[1] + t * (v2[1] - v1[1]);
        return out;
    }

    /**
     * APIMethod: applyTransform
     * 矩阵左乘向量。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v - {Vector2} 向量 v。
     * m - {Vector2} 向量 m。
     *
     * Returns:
     * {Vector2} 结果。
     */
    applyTransform(out, v, m) {
        var x = v[0];
        var y = v[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
    }

    /**
     * APIMethod: min
     * 求两个向量最小值。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    min(out, v1, v2) {
        out[0] = Math.min(v1[0], v2[0]);
        out[1] = Math.min(v1[1], v2[1]);
        return out;
    }

    /**
     * APIMethod: max
     * 求两个向量最大值。
     *
     * Parameters:
     * out - {Vector2} 基础向量。
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Vector2} 结果。
     */
    max(out, v1, v2) {
        out[0] = Math.max(v1[0], v2[0]);
        out[1] = Math.max(v1[1], v2[1]);
        return out;
    }


    /**
     * APIMethod: length
     * 向量长度。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度。
     */
    length(v) {
        return this.len(v);
    }

    /**
     * APIMethod: lengthSquare
     * 向量长度平方。
     *
     * Parameters:
     * v - {Vector2} 向量。
     *
     * Returns:
     * {Number} 向量长度平方。
     */
    lengthSquare(v) {
        return this.lenSquare(v);
    }

    /**
     * APIMethod: dist
     * 计算向量间距离。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量间距离。
     */
    dist(v1, v2) {
        return this.distance(v1, v2);
    }

    /**
     * APIMethod: distSquare
     * 向量距离平方。
     *
     * Parameters:
     * v1 - {Vector2} 向量 v1。
     * v2 - {Vector2} 向量 v2。
     *
     * Returns:
     * {Number} 向量距离平方。
     */
    distSquare(v1, v2) {
        return this.distanceSquare(v1, v2);
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Vector = Vector;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicPolygon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SUtil__ = __webpack_require__(3);





/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicPolygon
 * 多边形。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicPolygon({
 *         style: {
 *             // 100x100 的正方形
 *             pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
 *             color: 'blue'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 */
class SmicPolygon extends __WEBPACK_IMPORTED_MODULE_2__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * pointList - {Array} 节点数组，二维数组。默认值：null，必设参数。其形式如下：
     * (code)
     * (start code)
     *  [
     *  [10, 20],         //单个节点
     *  [30, 40],
     *  [25, 30]
     *   ]
     * (end)
     * smooth - {string} 是否做平滑插值, 平滑算法可以选择 "bezier", "spline"。默认值："";
     * smoothConstraint - {Number} 平滑约束。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicPolygon
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型.
         */
        this.type = 'smicpolygon';

        /**
         * APIProperty: _holePolygonPointList
         * {Array} 岛洞面多边形顶点数组（三维数组）
         *
         */
        this.holePolygonPointLists = null;

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicPolygon";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }


    /**
     * APIMethod: brush
     * 笔触。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * isHighlight - {Boolean} 是否使用高亮属性。
     *
     */
    brush(ctx, isHighlight) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        var style = this.style;
        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style,
                this.highlightStyle || {}
            );
        }

        ctx.save();
        this.setContext(ctx, style);

        // 设置 transform
        this.setTransform(ctx);

        // 先 fill 再stroke
        var hasPath = false;
        if (style.brushType == 'fill' || style.brushType == 'both' || typeof style.brushType == 'undefined') {    // 默认为fill
            ctx.beginPath();
            if (style.lineType == 'dashed'
                || style.lineType == 'dotted'
                || style.lineType == 'dot'
                || style.lineType == 'dash'
                || style.lineType == 'dashot'
                || style.lineType == 'longdash'
                || style.lineType == 'longdashdot'
            ) {
                // 特殊处理，虚线围不成path，实线再build一次
                this.buildPath(ctx, {
                        lineType: 'solid',
                        lineWidth: style.lineWidth,
                        pointList: style.pointList
                    }
                );
            } else {
                this.buildPath(ctx, style);
                hasPath = true; // 这个path能用
            }
            ctx.closePath();
            this.setCtxGlobalAlpha(ctx, "fill", style);
            ctx.fill();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        if (style.lineWidth > 0 && (style.brushType == 'stroke' || style.brushType == 'both')) {
            if (!hasPath) {
                ctx.beginPath();
                this.buildPath(ctx, style);
            }
            this.setCtxGlobalAlpha(ctx, "stroke", style);
            ctx.stroke();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        this.drawText(ctx, style, this.style);

        //岛洞
        var hpStyle = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["h" /* cloneObject */])(style);

        if (hpStyle.pointList) {
            if (this.holePolygonPointLists && this.holePolygonPointLists.length > 0) {
                var holePLS = this.holePolygonPointLists;
                var holePLSen = holePLS.length;
                for (var i = 0; i < holePLSen; i++) {
                    var holePL = holePLS[i];
                    //岛洞面
                    hpStyle.pointList = holePL;

                    ctx.globalCompositeOperation = "destination-out";
                    // 先 fill 再stroke
                    hasPath = false;
                    if (hpStyle.brushType == 'fill' || hpStyle.brushType == 'both' || typeof hpStyle.brushType == 'undefined') {    // 默认为fill
                        ctx.beginPath();
                        if (hpStyle.lineType == 'dashed'
                            || hpStyle.lineType == 'dotted'
                            || hpStyle.lineType == 'dot'
                            || hpStyle.lineType == 'dash'
                            || hpStyle.lineType == 'dashot'
                            || hpStyle.lineType == 'longdash'
                            || hpStyle.lineType == 'longdashdot'
                        ) {
                            // 特殊处理，虚线围不成path，实线再build一次
                            this.buildPath(ctx, {
                                    lineType: 'solid',
                                    lineWidth: hpStyle.lineWidth,
                                    pointList: hpStyle.pointList
                                }
                            );
                        } else {
                            this.buildPath(ctx, hpStyle);
                            hasPath = true; // 这个path能用
                        }
                        ctx.closePath();
                        this.setCtxGlobalAlpha(ctx, "fill", hpStyle);
                        ctx.fill();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    }

                    if (hpStyle.lineWidth > 0 && (hpStyle.brushType == 'stroke' || hpStyle.brushType == 'both')) {
                        if (!hasPath) {
                            ctx.beginPath();
                            this.buildPath(ctx, hpStyle);
                        }
                        //如果描边，先回复 globalCompositeOperation 默认值再描边。
                        ctx.globalCompositeOperation = "source-over";
                        this.setCtxGlobalAlpha(ctx, "stroke", hpStyle);
                        ctx.stroke();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    } else {
                        ctx.globalCompositeOperation = "source-over";
                    }
                }
            }

        }
        ctx.restore();
        return;
    }


    /**
     * APIMethod: buildPath
     * 创建多边形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (style.showShadow) {
            ctx.shadowBlur = style.shadowBlur;
            ctx.shadowColor = style.shadowColor;
            ctx.shadowOffsetX = style.shadowOffsetX;
            ctx.shadowOffsetY = style.shadowOffsetY;
        }
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        // 虽然能重用 brokenLine，但底层图形基于性能考虑，重复代码减少调用吧
        var pointList = style.pointList;

        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_smoothBezier(pointList, style.smooth, true, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            var len = pointList.length;
            for (var i = 0; i < len; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[(i + 1) % len][0] + __OP[0], pointList[(i + 1) % len][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth === 'spline') {
                pointList = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_smoothSpline(pointList, true, null, __OP);
            }

            if (!style.lineType || style.lineType == 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < pointList.length; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
                ctx.lineTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            } else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
            ) {
                // SMIC-方法修改 - start
                let dashLengthForStyle = style._dashLength || (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLengthForStyle;

                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;

                //dashed
                if (style.lineType === 'dashed') {
                    pattern1 *= 5;
                    pattern2 *= 5;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //dotted
                if (style.lineType === 'dotted') {
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dot
                if (style.lineType === 'dot') {
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dash
                if (style.lineType === 'dash') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //longdash
                if (style.lineType === 'longdash') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }


                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < pointList.length; i++) {
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0],
                        pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0],
                        pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
                __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0] + __OP[0],
                    pointList[pointList.length - 1][1] + __OP[1],
                    pointList[0][0] + __OP[0],
                    pointList[0][1] + __OP[1],
                    dashLength,
                    [pattern1, pattern2]
                );
            } else if (style.lineType === 'dashot'
                || style.lineType === 'longdashdot'
            ) {
                let dashLengthForStyle = style._dashLength || (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLengthForStyle;

                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;
                let pattern3 = dashLength;
                let pattern4 = dashLength;

                //dashot
                if (style.lineType === 'dashot') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                //longdashdot
                if (style.lineType === 'longdashdot') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }


                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < pointList.length; i++) {
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0],
                        pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0],
                        pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2, pattern3, pattern4]
                    );
                }
                __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0] + __OP[0],
                    pointList[pointList.length - 1][1] + __OP[1],
                    pointList[0][0] + __OP[0],
                    pointList[0][1] + __OP[1],
                    dashLength,
                    [pattern1, pattern2, pattern3, pattern4]
                );
            }

        }
        return;
    }


    /**
     * APIMethod: getRect
     * 计算返回多边形包围盒矩阵。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style, refOriginalPosition) {
        var __OP;
        if (!refOriginalPosition) {
            if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
                this.refOriginalPosition = [0, 0];
            }
            __OP = this.refOriginalPosition;
        } else {
            __OP = refOriginalPosition;
        }

        if (style.__rect) {
            return style.__rect;
        }

        var minX = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;

        var pointList = style.pointList;
        for (var i = 0, l = pointList.length; i < l; i++) {
            if (pointList[i][0] + __OP[0] < minX) {
                minX = pointList[i][0] + __OP[0];
            }
            if (pointList[i][0] + __OP[0] > maxX) {
                maxX = pointList[i][0] + __OP[0];
            }
            if (pointList[i][1] + __OP[1] < minY) {
                minY = pointList[i][1] + __OP[1];
            }
            if (pointList[i][1] + __OP[1] > maxY) {
                maxY = pointList[i][1] + __OP[1];
            }
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }

        style.__rect = {
            x: Math.round(minX - lineWidth / 2),
            y: Math.round(minY - lineWidth / 2),
            width: maxX - minX + lineWidth,
            height: maxY - minY + lineWidth
        };
        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicPolygon = SmicPolygon;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Theme; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);



/**
 * @private
 * @class  KTW.Feature.Theme
 * 专题要素基类，此类不可实例化。
 */
class Theme {

    /**
     * Constructor: KTW.Feature.Theme
     * 构造函数。
     *
     * Parameters:
     * data - {Object}  用户数据，用于生成可视化 shape，必设参数。
     * layer - {<KTW.Layer.Theme>} 此专题要素所在图层，必设参数。
     *
     * Returns:
     * {<KTW.Feature.Theme>} 返回一个专题要素。
     */
    constructor(data, layer) {

        if (!data) {
            return;
        }
        // layer 必须已经添加到地图, 且已初始化渲染器
        if (!layer || !layer.map || !layer.renderer) {
            return;
        }

        /**
         * Property: id
         * {String} 专题要素唯一标识。
         */
        this.id = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])();

        /**
         * APIProperty: lonlat
         * {<KTW.LonLat>} 专题要素地理参考位置。子类中必须根据用户数据（或地理位置参数）对其赋值,长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 。
         */
        this.lonlat = [];

        /**
         * APIProperty: location
         * {Array} 专题要素像素参考位置。通常由地理参考位置决定。长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.location = [];

        /**
         * APIProperty: data
         * {Object} {ReadOnly} 用户数据，用于生成可视化 shape，可在子类中规定数据格式或类型，如： <KTW.Feature.Vector> 。
         */
        this.data = data;

        /**
         * APIProperty: shapes
         * {Array} {ReadOnly} 构成此专题要素的可视化图形对象数组，数组顺序控制渲染。
         */
        this.shapes = [];

        /**
         * APIProperty: layer
         * {<KTW.Layer.Theme>} {ReadOnly} 此专题要素所在专题图层。
         */
        this.layer = layer;

        this.CLASS_NAME = "KTW.Feature.Theme";

    }


    /**
     * APIMethod: destroy
     * 销毁专题要素。
     */
    destroy() {
        this.data = null;
        this.id = null;
        this.lonlat = null;
        this.location = null;
        this.shapes = null;
        this.layer = null;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme = Theme;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Line; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Line
 * 线参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Line extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {
    /**
     * Constructor: KTW.Feature.ShapeParameters.Line
     * 创建一个图形线参数对象。
     *
     * Parameters:
     * pointList - {Array} 线要素节点数组，二维数组，必设参数。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Line>} 图形线参数对象。
     */
    constructor(pointList) {
        super(pointList);
        /**
         * APIProperty: pointList
         * {Array} 线要素节点数组，二维数组。
         *
         * 数组形如：
         * (start code)
         *  [
         *  [10, 20],         //节点
         *  [30, 40],
         *  [25, 30]         //最后一个节点和第一个节点不必相同，绘制时自动封闭
         *   ]
         * (end)
         */
        this.pointList = pointList;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Line";

    }

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.pointList = null;
        super.destroy();
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Line = Line;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Circle
 * 圆形参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */


class Circle extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {


    /**
     * Constructor: KTW.Feature.ShapeParameters.Circle
     * 创建一个圆形参数对象。
     *
     * Parameters:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 圆半径，必设参数。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Circle>} 圆形参数对象。
     */
    constructor(x, y, r) {
        super(x, y, r);
        /**
         * APIProperty: x
         * {Number} 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 圆心 y 坐标。
         */
        this.y =  !isNaN(y) ? y : 0;

        /**
         * APIProperty: r
         * {Number} 圆半径。
         */
        this.r =  !isNaN(r) ? r : 0;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Circle";
        /**
         * APIProperty: style
         * {Object} 圆形样式对象，可设属性如下：
         *
         * Symbolizer properties:
         * brushType - {string} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
         * color - {string} 填充颜色,默认值"#000000"
         * strokeColor - {string} 描边颜色,默认值为'#000000'
         * lineCape — {string} 线帽样式，可以是 butt, round, square，默认是butt
         * lineWidth - {number} 描边宽度、默认是1
         * opacity - {number} 绘制透明度、默认是1，不透明
         * shadowBlur - {number} 阴影模糊度，大于0有效，默认是0
         * shadowColor - {string} 阴影颜色，默认是'#000000'
         * shadowOffsetX - {number} 阴影横向偏移，默认是0
         * shadowOffsetY - {number} 阴影纵向偏移，默认是0
         */

    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        super.destroy();
    }

}

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Circle = Circle;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicPoint; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);



/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicPoint
 * 点。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicPoint({
 *       style: {
 *           x: 100,
 *           y: 100,
 *           r: 40,
 *           brushType: 'both',
 *           color: 'blue',
 *           strokeColor: 'red',
 *           lineWidth: 3,
 *           text: 'point'
 *       }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicPoint extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 圆心x坐标，必设参数。
     * y - {Number} 圆心y坐标，必设参数。
     * r - {Number} 半径，必设参数。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style


    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicPoint
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicpoint';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicPoint";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 创建点触。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r, 0, Math.PI * 2, true);
        return;
    }


    /**
     * APIMethod: getRect
     * 计算返回点的包围盒矩形。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if (style.__rect) {
            return style.__rect;
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.r - lineWidth / 2),
            y: Math.round((style.y + __OP[1]) - style.r - lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicPoint = SmicPoint;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(7);



/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Color
 * LevelRenderer 工具-颜色辅助类
 *
 */
class Color {
    constructor() {
        /**
         * Property: util
         * {<KTW.LevelRenderer.Tool.Util>} LevelRenderer 基础工具对象
         */
        this.util = new __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* Util */]();

        /**
         * Property: _ctx
         * {Object} _ctx
         */
        this._ctx = null;

        /**
         * Property: palette
         * {Array} 默认色板
         * 色板是一个包含图表默认颜色系列的数组，当色板中所有颜色被使用过后，又将从新回到色板中的第一个颜色。
         *
         * [
         * '#ff9277', '#dddd00', '#ffc877', '#bbe3ff', '#d5ffbb', '#bbbbff', '#ddb000', '#b0dd00', '#e2bbff', '#ffbbe3',
         * '#ff7777', '#ff9900', '#83dd00', '#77e3ff', '#778fff', '#c877ff', '#ff77ab', '#ff6600', '#aa8800', '#77c7ff',  '
         * #ad77ff', '#ff77ff', '#dd0083', '#777700', '#00aa00', '#0088aa', '#8400dd', '#aa0088', '#dd0000', '#772e00'
         * ];
         */
        this.palette = [
            '#ff9277', ' #dddd00', ' #ffc877', ' #bbe3ff', ' #d5ffbb',
            '#bbbbff', ' #ddb000', ' #b0dd00', ' #e2bbff', ' #ffbbe3',
            '#ff7777', ' #ff9900', ' #83dd00', ' #77e3ff', ' #778fff',
            '#c877ff', ' #ff77ab', ' #ff6600', ' #aa8800', ' #77c7ff',
            '#ad77ff', ' #ff77ff', ' #dd0083', ' #777700', ' #00aa00',
            '#0088aa', ' #8400dd', ' #aa0088', ' #dd0000', ' #772e00'
        ];

        /**
         * Property: _palette
         * {Array} 复位色板，用于复位  palette
         */
        this._palette = this.palette;

        /**
         * Property: highlightColor
         * {String} 高亮色
         */
        this.highlightColor = 'rgba(0,0,255,1)';

        /**
         * Property: _highlightColor
         * {String} 复位高亮色
         */
        this._highlightColor = this.highlightColor;

        /**
         * Property: colorRegExp
         * {String} 颜色格式，正则表达式。
         */
        this.colorRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;

        /**
         * Property: _nameColors
         * {String} 颜色名。
         */
        this._nameColors = {
            aliceblue: '#f0f8ff',
            antiquewhite: '#faebd7',
            aqua: '#0ff',
            aquamarine: '#7fffd4',
            azure: '#f0ffff',
            beige: '#f5f5dc',
            bisque: '#ffe4c4',
            black: '#000',
            blanchedalmond: '#ffebcd',
            blue: '#00f',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chartreuse: '#7fff00',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            cornsilk: '#fff8dc',
            crimson: '#dc143c',
            cyan: '#0ff',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgray: '#a9a9a9',
            darkgrey: '#a9a9a9',
            darkgreen: '#006400',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkslategrey: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deeppink: '#ff1493',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            floralwhite: '#fffaf0',
            forestgreen: '#228b22',
            fuchsia: '#f0f',
            gainsboro: '#dcdcdc',
            ghostwhite: '#f8f8ff',
            gold: '#ffd700',
            goldenrod: '#daa520',
            gray: '#808080',
            grey: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            honeydew: '#f0fff0',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            ivory: '#fffff0',
            khaki: '#f0e68c',
            lavender: '#e6e6fa',
            lavenderblush: '#fff0f5',
            lawngreen: '#7cfc00',
            lemonchiffon: '#fffacd',
            lightblue: '#add8e6',
            lightcoral: '#f08080',
            lightcyan: '#e0ffff',
            lightgoldenrodyellow: '#fafad2',
            lightgray: '#d3d3d3',
            lightgrey: '#d3d3d3',
            lightgreen: '#90ee90',
            lightpink: '#ffb6c1',
            lightsalmon: '#ffa07a',
            lightseagreen: '#20b2aa',
            lightskyblue: '#87cefa',
            lightslategray: '#789',
            lightslategrey: '#789',
            lightsteelblue: '#b0c4de',
            lightyellow: '#ffffe0',
            lime: '#0f0',
            limegreen: '#32cd32',
            linen: '#faf0e6',
            magenta: '#f0f',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370d8',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumspringgreen: '#00fa9a',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            mintcream: '#f5fffa',
            mistyrose: '#ffe4e1',
            moccasin: '#ffe4b5',
            navajowhite: '#ffdead',
            navy: '#000080',
            oldlace: '#fdf5e6',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palegoldenrod: '#eee8aa',
            palegreen: '#98fb98',
            paleturquoise: '#afeeee',
            palevioletred: '#d87093',
            papayawhip: '#ffefd5',
            peachpuff: '#ffdab9',
            peru: '#cd853f',
            pink: '#ffc0cb',
            plum: '#dda0dd',
            powderblue: '#b0e0e6',
            purple: '#800080',
            red: '#f00',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            seashell: '#fff5ee',
            sienna: '#a0522d',
            silver: '#c0c0c0',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#fffafa',
            springgreen: '#00ff7f',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            thistle: '#d8bfd8',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            wheat: '#f5deb3',
            white: '#fff',
            whitesmoke: '#f5f5f5',
            yellow: '#ff0',
            yellowgreen: '#9acd32'
        };

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Color";
    }

    /**
     * APIMethod: customPalette
     * 自定义调色板。
     *
     * Parameters:
     * userPalete - {Array} 颜色板。
     */
    customPalette(userPalete) {
        this.palette = userPalete;
    }

    /**
     * APIMethod: resetPalette
     * 复位默认色板。
     *
     */
    resetPalette() {
        this.palette = this._palette;
    }

    /**
     * APIMethod: getColor
     * 获取色板颜色。
     *
     * Parameters:
     * idx - {Number} 色板位置。
     * userPalete - {Array} 色板。
     *
     * Returns:
     * {String} 颜色值。
     */
    getColor(idx, userPalete) {
        idx = idx | 0;
        userPalete = userPalete || this.palette;
        return userPalete[idx % userPalete.length];
    }

    /**
     * APIMethod: customHighlight
     * 自定义默认高亮颜色。
     *
     * Parameters:
     * userHighlightColor - {String} 自定义高亮色。
     */
    customHighlight(userHighlightColor) {
        this.highlightColor = userHighlightColor;
    }

    /**
     * APIMethod: resetHighlight
     * 重置默认高亮颜色。将当前的高亮色作为默认高亮颜色
     *
     */
    resetHighlight() {
        this.highlightColor = this._highlightColor;
    }

    /**
     * APIMethod: getHighlightColor
     * 获取默认高亮颜色
     *
     * Returns:
     * {String} 颜色值。
     */
    getHighlightColor() {
        return this.highlightColor;
    }

    /**
     * APIMethod: getRadialGradient
     * 径向渐变。
     *
     * Parameters:
     * x0 - {Number} 渐变起点。
     * y0 - {Number}
     * r0 - {Number}
     * x1 - {Number} 渐变终点。
     * y1 - {Number}
     * r1 - {Number}
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {CanvasGradient} Cavans 渐变颜色。
     */
    getRadialGradient(x0, y0, r0, x1, y1, r1, colorList) {
        var util = this.util;

        if (!this._ctx) {
            this._ctx = util.getContext();
        }
        var gradient = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0, l = colorList.length; i < l; i++) {

            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }


    /**
     * APIMethod: getLinearGradient
     * 线性渐变。
     *
     * Parameters:
     * x0 - {Number} 渐变起点。
     * y0 - {Number}
     * x1 - {Number} 渐变终点。
     * y1 - {Number}
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {CanvasGradient} Cavans 渐变颜色。
     */
    getLinearGradient(x0, y0, x1, y1, colorList) {
        var util = this.util;

        if (!this._ctx) {
            this._ctx = util.getContext();
        }
        var gradient = this._ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * APIMethod: getStepColors
     * 获取两种颜色之间渐变颜色数组。
     *
     * Parameters:
     * start - {color} 起始颜色。
     * end - {color} 结束颜色。
     * step - {Number} 渐变级数。
     * colorList - {Array} 颜色列表。
     *
     * Returns:
     * {Array} 颜色数组。
     */
    getStepColors(start, end, step) {
        start = this.toRGBA(start);
        end = this.toRGBA(end);
        start = this.getData(start);
        end = this.getData(end);

        var colors = [];
        var stepR = (end[0] - start[0]) / step;
        var stepG = (end[1] - start[1]) / step;
        var stepB = (end[2] - start[2]) / step;
        var stepA = (end[3] - start[3]) / step;
        // 生成颜色集合
        // fix by linfeng 颜色堆积
        for (var i = 0, r = start[0], g = start[1], b = start[2], a = start[3]; i < step; i++) {
            colors[i] = this.toColor([
                this.adjust(Math.floor(r), [0, 255]),
                this.adjust(Math.floor(g), [0, 255]),
                this.adjust(Math.floor(b), [0, 255]),
                a.toFixed(4) - 0
            ], 'rgba');
            r += stepR;
            g += stepG;
            b += stepB;
            a += stepA;
        }
        r = end[0];
        g = end[1];
        b = end[2];
        a = end[3];
        colors[i] = this.toColor([r, g, b, a], 'rgba');
        return colors;
    }

    /**
     * APIMethod: getGradientColors
     * 获取指定级数的渐变颜色数组。
     *
     * Parameters:
     * colors - {Array{String}} 颜色组。
     * step - {Number}  渐变级数，默认值 20。
     *
     * Returns:
     * {Array{String}} 颜色数组。
     */
    getGradientColors(colors, step) {
        var ret = [];
        var len = colors.length;
        if (step === undefined) {
            step = 20;
        }
        if (len === 1) {
            ret = this.getStepColors(colors[0], colors[0], step);
        } else if (len > 1) {
            for (var i = 0, n = len - 1; i < n; i++) {
                var steps = this.getStepColors(colors[i], colors[i + 1], step);
                if (i < n - 1) {
                    steps.pop();
                }
                ret = ret.concat(steps);
            }
        }
        return ret;
    }

    /**
     * APIMethod: toColor
     *  颜色值数组转为指定格式颜色。
     *
     * Parameters:
     * data - {Array} 颜色值数组。
     * format - {String}  格式，默认rgb
     *
     * Returns:
     * {String} 颜色。
     */
    toColor(data, format) {
        format = format || 'rgb';
        if (data && (data.length === 3 || data.length === 4)) {
            data = this.map(data,
                function (c) {
                    return c > 1 ? Math.ceil(c) : c;
                }
            );

            if (format.indexOf('hex') > -1) {
                return '#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + (+data[2])).toString(16).slice(1);
            } else if (format.indexOf('hs') > -1) {
                var sx = this.map(data.slice(1, 3),
                    function (c) {
                        return c + '%';
                    }
                );
                data[1] = sx[0];
                data[2] = sx[1];
            }

            if (format.indexOf('a') > -1) {
                if (data.length === 3) {
                    data.push(1);
                }
                data[3] = this.adjust(data[3], [0, 1]);
                return format + '(' + data.slice(0, 4).join(',') + ')';
            }

            return format + '(' + data.slice(0, 3).join(',') + ')';
        }
    }

    /**
     * APIMethod: toArray
     *  颜色字符串转换为rgba数组。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {Array{Number}} 颜色值数组。
     */
    toArray(color) {
        color = this.trim(color);
        if (color.indexOf('rgba') < 0) {
            color = this.toRGBA(color);
        }

        var data = [];
        var i = 0;
        color.replace(/[\d.]+/g, function (n) {
            if (i < 3) {
                n = n | 0;
            } else {
                // Alpha
                n = +n;
            }
            data[i++] = n;
        });
        return data;
    }

    /**
     * APIMethod: convert
     *  颜色格式转化。
     *
     * Parameters:
     * color - {String} 颜色值数组。
     * format - {String} 格式，默认rgb
     *
     * Returns:
     * {String} 颜色。
     */
    convert(color, format) {
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var data = this.getData(color);
        var alpha = data[3];
        if (typeof alpha === 'undefined') {
            alpha = 1;
        }

        if (color.indexOf('hsb') > -1) {
            data = this._HSV_2_RGB(data);
        } else if (color.indexOf('hsl') > -1) {
            data = this._HSL_2_RGB(data);
        }

        if (format.indexOf('hsb') > -1 || format.indexOf('hsv') > -1) {
            data = this._RGB_2_HSB(data);
        } else if (format.indexOf('hsl') > -1) {
            data = this._RGB_2_HSL(data);
        }

        data[3] = alpha;

        return this.toColor(data, format);
    }

    /**
     * APIMethod: toRGBA
     *  转换为rgba格式的颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} rgba颜色，rgba(r,g,b,a)。
     */
    toRGBA(color) {
        return this.convert(color, 'rgba');
    }

    /**
     * APIMethod: toRGB
     *  转换为rgb数字格式的颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} rgb颜色，rgb(0,0,0)格式
     */
    toRGB(color) {
        return this.convert(color, 'rgb');
    }

    /**
     * APIMethod: toHex
     *  转换为16进制颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 16进制颜色，#rrggbb格式
     */
    toHex(color) {
        return this.convert(color, 'hex');
    }

    /**
     * APIMethod: toHSVA
     *  转换为HSV颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSVA颜色，hsva(h,s,v,a)
     */
    toHSVA(color) {
        return this.convert(color, 'hsva');
    }

    /**
     * APIMethod: toHSV
     *  转换为HSV颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSV颜色，hsv(h,s,v)
     */
    toHSV(color) {
        return this.convert(color, 'hsv');
    }

    /**
     * APIMethod: toHSBA
     *  转换为HSBA颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSBA颜色，hsba(h,s,b,a)
     */
    toHSBA(color) {
        return this.convert(color, 'hsba');
    }

    /**
     * APIMethod: toHSB
     *  转换为HSB颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSB颜色，hsb(h,s,b)
     */
    toHSB(color) {
        return this.convert(color, 'hsb');
    }

    /**
     * APIMethod: toHSLA
     *  转换为HSLA颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSLA颜色，hsla(h,s,l,a)
     */
    toHSLA(color) {
        return this.convert(color, 'hsla');
    }

    /**
     * APIMethod: toHSL
     *  转换为HSL颜色。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} HSL颜色，hsl(h,s,l)
     */
    toHSL(color) {
        return this.convert(color, 'hsl');
    }

    /**
     * APIMethod: toName
     * 转换颜色名。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 颜色名
     */
    toName(color) {
        for (var key in this._nameColors) {
            if (this.toHex(this._nameColors[key]) === this.toHex(color)) {
                return key;
            }
        }
        return null;
    }

    /**
     * APIMethod: trim
     * 移除颜色中多余空格。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 无空格颜色
     */
    trim(color) {
        return String(color).replace(/\s+/g, '');
    }

    /**
     * APIMethod: normalize
     * 颜色规范化。
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 规范化后的颜色
     */
    normalize(color) {
        // 颜色名
        if (this._nameColors[color]) {
            color = this._nameColors[color];
        }
        // 去掉空格
        color = this.trim(color);
        // hsv与hsb等价
        color = color.replace(/hsv/i, 'hsb');
        // rgb转为rrggbb
        if (/^#[\da-f]{3}$/i.test(color)) {
            color = parseInt(color.slice(1), 16);
            var r = (color & 0xf00) << 8;
            var g = (color & 0xf0) << 4;
            var b = color & 0xf;

            color = '#' + ((1 << 24) + (r << 4) + r + (g << 4) + g + (b << 4) + b).toString(16).slice(1);
        }
        // 或者使用以下正则替换，不过 chrome 下性能相对差点
        // color = color.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3');
        return color;
    }

    /**
     * APIMethod: lift
     * 颜色加深或减淡，当level>0加深，当level<0减淡。
     *
     * Parameters:
     * color - {String} 颜色。
     * level - {Number} 升降程度,取值区间[-1,1]。
     *
     * Returns:
     * {String} 加深或减淡后颜色值
     */
    lift(color, level) {
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var direct = level > 0 ? 1 : -1;
        if (typeof level === 'undefined') {
            level = 0;
        }
        level = Math.abs(level) > 1 ? 1 : Math.abs(level);
        color = this.toRGB(color);
        var data = this.getData(color);
        for (var i = 0; i < 3; i++) {
            if (direct === 1) {
                data[i] = data[i] * (1 - level) | 0;
            } else {
                data[i] = ((255 - data[i]) * level + data[i]) | 0;
            }
        }
        return 'rgb(' + data.join(',') + ')';
    }

    /**
     * APIMethod: reverse
     * 颜色翻转,[255-r,255-g,255-b,1-a]
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {String} 翻转颜色
     */
    reverse(color) {
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var data = this.getData(this.toRGBA(color));
        data = this.map(data,
            function (c) {
                return 255 - c;
            }
        );
        return this.toColor(data, 'rgb');
    }

    /**
     * APIMethod: mix
     * 简单两种颜色混合
     *
     * Parameters:
     * color1 - {String} 第一种颜色。
     * color2 - {String} 第二种颜色。
     * weight - {Number} 混合权重[0-1]。
     *
     * Returns:
     * {String} 结果色,rgb(r,g,b)或rgba(r,g,b,a)
     */
    mix(color1, color2, weight) {
        if (!this.isCalculableColor(color1) || !this.isCalculableColor(color2)) {
            return color1;
        }

        if (typeof weight === 'undefined') {
            weight = 0.5;
        }
        weight = 1 - this.adjust(weight, [0, 1]);

        var w = weight * 2 - 1;
        var data1 = this.getData(this.toRGBA(color1));
        var data2 = this.getData(this.toRGBA(color2));

        var d = data1[3] - data2[3];

        var weight1 = (((w * d === -1) ? w : (w + d) / (1 + w * d)) + 1) / 2;
        var weight2 = 1 - weight1;

        var data = [];

        for (var i = 0; i < 3; i++) {
            data[i] = data1[i] * weight1 + data2[i] * weight2;
        }

        var alpha = data1[3] * weight + data2[3] * (1 - weight);
        alpha = Math.max(0, Math.min(1, alpha));

        if (data1[3] === 1 && data2[3] === 1) {// 不考虑透明度
            return this.toColor(data, 'rgb');
        }
        data[3] = alpha;
        return this.toColor(data, 'rgba');
    }

    /**
     * APIMethod: random
     * 随机颜色
     *
     * Returns:
     * {String} 颜色值，#rrggbb格式
     */
    random() {
        return '#' + Math.random().toString(16).slice(2, 8);
    }

    /**
     * APIMethod: getData
     * 获取颜色值数组,返回值范围:
     *
     * RGB 范围[0-255]
     *
     * HSL/HSV/HSB 范围[0-1]
     *
     * A透明度范围[0-1]
     *
     * 支持格式：
     *
     * #rgb
     *
     * #rrggbb
     *
     * rgb(r,g,b)
     *
     * rgb(r%,g%,b%)
     *
     * rgba(r,g,b,a)
     *
     * hsb(h,s,b) // hsv与hsb等价
     *
     * hsb(h%,s%,b%)
     *
     * hsba(h,s,b,a)
     *
     * hsl(h,s,l)
     *
     * hsl(h%,s%,l%)
     *
     * hsla(h,s,l,a)
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {Array{Number}} 颜色值数组或null
     */
    getData(color) {
        color = this.normalize(color);
        var r = color.match(this.colorRegExp);
        if (r === null) {
            throw new Error('The color format error'); // 颜色格式错误
        }
        var d;
        var a;
        var data = [];
        var rgb;

        if (r[2]) {
            // #rrggbb
            d = r[2].replace('#', '').split('');
            rgb = [d[0] + d[1], d[2] + d[3], d[4] + d[5]];
            data = this.map(rgb,
                function (c) {
                    return Color.prototype.adjust.call(this, parseInt(c, 16), [0, 255]);
                }
            );

        } else if (r[4]) {
            // rgb rgba
            var rgba = (r[4]).split(',');
            a = rgba[3];
            rgb = rgba.slice(0, 3);
            data = this.map(
                rgb,
                function (c) {
                    c = Math.floor(
                        c.indexOf('%') > 0 ? parseInt(c, 0) * 2.55 : c
                    );
                    return Color.prototype.adjust.call(this, c, [0, 255]);
                }
            );

            if (typeof a !== 'undefined') {
                data.push(this.adjust(parseFloat(a), [0, 1]));
            }
        } else if (r[5] || r[6]) {
            // hsb hsba hsl hsla
            var hsxa = (r[5] || r[6]).split(',');
            var h = parseInt(hsxa[0], 0) / 360;
            var s = hsxa[1];
            var x = hsxa[2];
            a = hsxa[3];
            data = this.map([s, x],
                function (c) {
                    return Color.prototype.adjust.call(this, parseFloat(c) / 100, [0, 1]);
                }
            );
            data.unshift(h);
            if (typeof a !== 'undefined') {
                data.push(this.adjust(parseFloat(a), [0, 1]));
            }
        }
        return data;
    }

    /**
     * APIMethod: alpha
     * 设置颜色透明度
     *
     * Parameters:
     * color - {String} 颜色。
     * a - {Number} 透明度,区间[0,1]。
     *
     * Returns:
     * {String} rgba颜色值
     */
    alpha(color, a) {
        if (!this.isCalculableColor(color)) {
            return color;
        }
        if (a === null) {
            a = 1;
        }
        var data = this.getData(this.toRGBA(color));
        data[3] = this.adjust(Number(a).toFixed(4), [0, 1]);

        return this.toColor(data, 'rgba');
    }

    /**
     * APIMethod: map
     * 数组映射
     *
     * Parameters:
     * array - {String} 数组。
     * fun - {Number} 函数。
     *
     * Returns:
     * {String} 数组映射结果
     */
    map(array, fun) {
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var len = array ? array.length : 0;
        for (var i = 0; i < len; i++) {
            array[i] = fun(array[i]);
        }
        return array;
    }

    /**
     * APIMethod: adjust
     * 调整值区间
     *
     * Parameters:
     * value - {Number} 数组。
     * region - {Array(Number)} 区间。
     *
     * Returns:
     * {Number} 调整后的值
     */
    adjust(value, region) {
        // < to <= & > to >=
        // modify by linzhifeng 2014-05-25 because -0 == 0
        if (value <= region[0]) {
            value = region[0];
        } else if (value >= region[1]) {
            value = region[1];
        }
        return value;
    }

    /**
     * APIMethod: isCalculableColor
     * 判断是否是可计算的颜色
     *
     * Parameters:
     * color - {String} 颜色。
     *
     * Returns:
     * {Boolean} 是否是可计算的颜色
     */
    isCalculableColor(color) {
        return color instanceof Array || typeof color === 'string';
    }

    /**
     * APIMethod: _HSV_2_RGB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _HSV_2_RGB(data) {
        var H = data[0];
        var S = data[1];
        var V = data[2];
        // HSV from 0 to 1
        var R;
        var G;
        var B;
        if (S === 0) {
            R = V * 255;
            G = V * 255;
            B = V * 255;
        } else {
            var h = H * 6;
            if (h === 6) {
                h = 0;
            }
            var i = h | 0;
            var v1 = V * (1 - S);
            var v2 = V * (1 - S * (h - i));
            var v3 = V * (1 - S * (1 - (h - i)));
            var r = 0;
            var g = 0;
            var b = 0;

            if (i === 0) {
                r = V;
                g = v3;
                b = v1;
            } else if (i === 1) {
                r = v2;
                g = V;
                b = v1;
            } else if (i === 2) {
                r = v1;
                g = V;
                b = v3;
            } else if (i === 3) {
                r = v1;
                g = v2;
                b = V;
            } else if (i === 4) {
                r = v3;
                g = v1;
                b = V;
            } else {
                r = V;
                g = v1;
                b = v2;
            }

            // RGB results from 0 to 255
            R = r * 255;
            G = g * 255;
            B = b * 255;
        }
        return [R, G, B];
    }

    /**
     * APIMethod: _HSL_2_RGB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _HSL_2_RGB(data) {
        var H = data[0];
        var S = data[1];
        var L = data[2];
        // HSL from 0 to 1
        var R;
        var G;
        var B;
        if (S === 0) {
            R = L * 255;
            G = L * 255;
            B = L * 255;
        } else {
            var v2;
            if (L < 0.5) {
                v2 = L * (1 + S);
            } else {
                v2 = (L + S) - (S * L);
            }

            var v1 = 2 * L - v2;

            R = 255 * this._HUE_2_RGB(v1, v2, H + (1 / 3));
            G = 255 * this._HUE_2_RGB(v1, v2, H);
            B = 255 * this._HUE_2_RGB(v1, v2, H - (1 / 3));
        }
        return [R, G, B];
    }

    /**
     * APIMethod: _HUE_2_RGB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _HUE_2_RGB(v1, v2, vH) {
        if (vH < 0) {
            vH += 1;
        }
        if (vH > 1) {
            vH -= 1;
        }
        if ((6 * vH) < 1) {
            return (v1 + (v2 - v1) * 6 * vH);
        }
        if ((2 * vH) < 1) {
            return (v2);
        }
        if ((3 * vH) < 2) {
            return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
        }
        return v1;
    }

    /**
     * APIMethod: _RGB_2_HSB
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _RGB_2_HSB(data) {
        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value
        var V = vMax;
        var H;
        var S;

        // HSV results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        } else {
            S = delta / vMax;

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            } else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            } else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }
            if (H > 1) {
                H -= 1;
            }
        }
        H = H * 360;
        S = S * 100;
        V = V * 100;
        return [H, S, V];
    }

    /**
     * APIMethod: _RGB_2_HSL
     * 参见 http:// www.easyrgb.com/index.php?X=MATH
     */
    _RGB_2_HSL(data) {

        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value

        var L = (vMax + vMin) / 2;
        var H;
        var S;
        // HSL results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        } else {
            if (L < 0.5) {
                S = delta / (vMax + vMin);
            } else {
                S = delta / (2 - vMax - vMin);
            }

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            } else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            } else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }

            if (H > 1) {
                H -= 1;
            }
        }

        H = H * 360;
        S = S * 100;
        L = L * 100;

        return [H, S, L];
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Color = Color;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicBrokenLine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SmicPolygon__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SUtil__ = __webpack_require__(3);





/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicBrokenLine
 * 折线(ic)。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicBrokenLine({
 *         style: {
 *             pointList: [[0, 0], [100, 100], [100, 0]],
 *             smooth: 'bezier',
 *             strokeColor: 'purple'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicBrokenLine extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * pointList - {Array} 节点数组，二维数组。默认值：null，必设参数。其形式如下：
     * (code)
     * (start code)
     *  [
     *  [10, 20],         //单个节点
     *  [30, 40],
     *  [25, 30]
     *   ]
     * (end)
     * smooth - {string} 是否做平滑插值, 平滑算法可以选择 "bezier", "spline"。默认值："";
     * smoothConstraint - {Number} 平滑约束。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicBrokenLine
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: brushTypeOnly
         * {String}  线条只能描边。
         */
        this.brushTypeOnly = 'stroke';

        /**
         * Property: textPosition
         * {String} 文本位置。
         */
        this.textPosition = 'end';

        /**
         * Property: type
         * {String} 图形类型.
         */
        this.type = 'smicbroken-line';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicBrokenLine";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.brushTypeOnly = null;
        this.textPosition = null;
        this.type = null;

        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 创建折线路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        var __OP = this.refOriginalPosition;

        var pointList = style.pointList;
        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        var len = Math.min(style.pointList.length, Math.round(style.pointListLength || style.pointList.length));

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_smoothBezier(pointList, style.smooth, false, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            for (let i = 0; i < len - 1; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[i + 1][0] + __OP[0], pointList[i + 1][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth === 'spline') {
                pointList = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_smoothSpline(pointList, null, null, __OP);
                len = pointList.length;
            }
            if (!style.lineType || style.lineType === 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < len; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
            } else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
            ) {
                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;

                //dashed
                if (style.lineType === 'dashed') {
                    pattern1 *= 5;
                    pattern2 *= 5;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //dotted
                if (style.lineType === 'dotted') {
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dot
                if (style.lineType === 'dot') {
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dash
                if (style.lineType === 'dash') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //longdash
                if (style.lineType === 'longdash') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1; i < len; i++) {
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
            } else if (style.lineType === 'dashot'
                || style.lineType === 'longdashdot'
            ) {
                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;
                let pattern3 = dashLength;
                let pattern4 = dashLength;

                //dashot
                if (style.lineType === 'dashot') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                //longdashdot
                if (style.lineType === 'longdashdot') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                dashLength = (style.lineWidth || 1)
                    * (style.lineType === 'dashed' ? 5 : 1);
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < len; i++) {
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2, pattern3, pattern4]
                    );
                }
            }

        }
        return;
    }


    /**
     * APIMethod: getRect
     * 计算返回折线包围盒矩形。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;
        return __WEBPACK_IMPORTED_MODULE_2__SmicPolygon__["a" /* SmicPolygon */].prototype.getRect.apply(this, [style, __OP]);
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicBrokenLine = SmicBrokenLine;

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);



/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicImage
 * 图片绘制。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicImage({
 *         style: {
 *             image: 'test.jpg',
 *             x: 100,
 *             y: 100
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicImage extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 左上角横坐标，必设参数。
     * y - {Number} 左上角纵坐标，必设参数。
     * image - {String/Cavans} 图片地址或cavans对象，必设参数。
     * width - {Number} 绘制到画布上的宽度，默认为图片高度。
     * height - {Number} 绘制到画布上的高度，默认为图片高度。
     * sx - {Number} 从图片中裁剪的左上角横坐标。
     * sy - {Number} 从图片中裁剪的左上角纵坐标。
     * sWidth - {Number} 从图片中裁剪的宽度，默认为图片高度。
     * sHeight - {Number} 绘制到画布上的高度，默认为图片高度。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicImage
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicimage';

        /**
         * Property: _imageCache
         * {String} 图片缓存。
         */
        this._imageCache = {};
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicImage";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        this._imageCache = null;
        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 创建图片。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    brush(ctx, isHighlight, refresh) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var style = this.style || {};

        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        var image = style.image;
        var me = this;

        if (typeof(image) === 'string') {
            var src = image;
            if (this._imageCache[src]) {
                image = this._imageCache[src];
            } else {
                image = new Image();
                image.onload = function () {
                    image.onload = null;
                    clearTimeout(SmicImage._refreshTimeout);
                    SmicImage._needsRefresh.push(me);
                    // 防止因为缓存短时间内触发多次onload事件
                    SmicImage._refreshTimeout = setTimeout(function () {
                        refresh && refresh(SmicImage._needsRefresh);
                        // 清空 needsRefresh
                        SmicImage._needsRefresh = [];
                    }, 10);
                };

                image.src = src;
                this._imageCache[src] = image;
            }
        }
        if (image) {
            // 图片已经加载完成
            if (image.nodeName.toUpperCase() == 'IMG') {
                if (window.ActiveXObject) {
                    if (image.readyState != 'complete') {
                        return;
                    }
                } else {
                    if (!image.complete) {
                        return;
                    }
                }
            }
            // Else is canvas
            var width = style.width || image.width;
            var height = style.height || image.height;
            var x = style.x + __OP[0];
            var y = style.y + __OP[1];

            // 图片加载失败
            if (!image.width || !image.height) {
                return;
            }

            ctx.save();

            this.doClip(ctx);

            this.setContext(ctx, style);

            // 设置transform
            this.setTransform(ctx);

            if (style.sWidth && style.sHeight) {
                let sx = (style.sx + __OP[0]) || 0;
                let sy = (style.sy + __OP[1]) || 0;
                ctx.drawImage(
                    image,
                    sx, sy, style.sWidth, style.sHeight,
                    x, y, width, height
                );
            } else if (style.sx && style.sy) {
                let sx = style.sx + __OP[0];
                let sy = style.sy + __OP[1];
                var sWidth = width - sx;
                var sHeight = height - sy;
                ctx.drawImage(
                    image,
                    sx, sy, sWidth, sHeight,
                    x, y, width, height
                );
            } else {
                ctx.drawImage(image, x, y, width, height);
            }
            // 如果没设置宽和高的话自动根据图片宽高设置
            if (!style.width) {
                style.width = width;
            }
            if (!style.height) {
                style.height = height;
            }
            if (!this.style.width) {
                this.style.width = width;
            }
            if (!this.style.height) {
                this.style.height = height;
            }

            this.drawText(ctx, style, this.style);

            ctx.restore();
        }
    }


    /**
     * APIMethod: getRect
     * 计算返回图片的包围盒矩形。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        return {
            x: style.x + __OP[0],
            y: style.y + __OP[1],
            width: style.width,
            height: style.height
        };
    }


    /**
     * APIMethod: clearCache
     * 清除图片缓存。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    clearCache() {
        this._imageCache = {};
    }

};
SmicImage._needsRefresh = [];
SmicImage._refreshTimeout = null;


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicImage = SmicImage;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

class Config {

}
/**
 * APIProperty: EVENT
 * {Object} 事件
 */
Config.EVENT = {
    //窗口大小变化
    RESIZE: 'resize',

    //鼠标按钮被（手指）按下，事件对象是：目标图形元素或空
    CLICK: 'click',

    //双击事件
    DBLCLICK: 'dblclick',

    //鼠标滚轮变化，事件对象是：目标图形元素或空
    MOUSEWHEEL: 'mousewheel',

    //鼠标（手指）被移动，事件对象是：目标图形元素或空
    MOUSEMOVE: 'mousemove',

    //鼠标移到某图形元素之上，事件对象是：目标图形元素
    MOUSEOVER: 'mouseover',

    //鼠标从某图形元素移开，事件对象是：目标图形元素
    MOUSEOUT: 'mouseout',

    //鼠标按钮（手指）被按下，事件对象是：目标图形元素或空
    MOUSEDOWN: 'mousedown',

    //鼠标按键（手指）被松开，事件对象是：目标图形元素或空
    MOUSEUP: 'mouseup',

    //全局离开，MOUSEOUT触发比较频繁，一次离开优化绑定
    GLOBALOUT: 'globalout',

    // 一次成功元素拖拽的行为事件过程是：
    // dragstart > dragenter > dragover [> dragleave] > drop > dragend

    //开始拖拽时触发，事件对象是：被拖拽图形元素
    DRAGSTART: 'dragstart',

    //拖拽完毕时触发（在drop之后触发），事件对象是：被拖拽图形元素
    DRAGEND: 'dragend',

    //拖拽图形元素进入目标图形元素时触发，事件对象是：目标图形元素
    DRAGENTER: 'dragenter',

    //拖拽图形元素在目标图形元素上移动时触发，事件对象是：目标图形元素
    DRAGOVER: 'dragover',

    //拖拽图形元素离开目标图形元素时触发，事件对象是：目标图形元素
    DRAGLEAVE: 'dragleave',

    //拖拽图形元素放在目标图形元素内时触发，事件对象是：目标图形元素
    DROP: 'drop',

    //touch end - start < delay is click
    touchClickDelay: 300
};

/**
 * APIProperty: catchBrushException
 * {Boolean} 是否异常捕获
 */
Config.catchBrushException = false;

/**
 * APIProperty: debugMode
 * {Boolean} debug 日志选项：catchBrushException 为 true 下有效
 *
 * 0 : 不生成debug数据，发布用
 * 1 : 异常抛出，调试用
 * 2 : 控制台输出，调试用
 */
Config.debugMode = 0;


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Config = Config;

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rectangle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tangram__ = __webpack_require__(25);
﻿

class Rectangle extends __WEBPACK_IMPORTED_MODULE_0__Tangram__["a" /* Tangram */]{
    /// <summary>矩形几何对象构造函数</summary>
    /// <param name="m_arguments" type="String">矩形坐标（"xmin,ymin,xmax,ymax"）</param>
    /// <param name="opt_options" type="Object">属性键值对</param>
    constructor(xmin, ymin, xmax, ymax, opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
    /// <summary>
    /// 使用一个由Openlayers定义的矩形来构造本对象
    /// </summary>
    /// <param name="openlayersRect" type="ol.extent">
    /// 由OpenLayers定义的矩形对象
    /// </param>
    setByOL(openlayersRect) {
        if (openlayersRect === undefined || openlayersRect == null) {
            return;
        }
        this.xmin = openlayersRect[0];
        this.ymin = openlayersRect[1];
        this.xmax = openlayersRect[2];
        this.ymax = openlayersRect[3];
    }

    /// <summary>
    /// 返回一个字符串来表示此矩形
    /// </summary>
    toString() {
        return "" + this.xmin + ',' + this.ymin + ',' + this.xmax + ',' + this.ymax;
    }

    /// <summary>
    /// 获取几何类型名称
    /// </summary>
    getGeometryType() {
        return "rect";
    }

    /// <summary>
    /// 将本对象转换为一个OpenLayers.Bound对象
    /// </summary>
    /// <returns type="ol.extent" />
    convertToBound() {
        var bounds = [this.xmin, this.ymin, this.xmax, this.ymax];
        return bounds;
    }

    intersectsBounds(bounds, options) {
        if (typeof options === "boolean") {
            options = {inclusive: options};
        }
        options = options || {};
        if (options.inclusive == null) {
            options.inclusive = true;
        }
        var self = this;
        var intersects = false;
        var mightTouch = (
            self.xmin === bounds.xmax ||
            self.xmax === bounds.xmin ||
            self.ymax === bounds.ymin ||
            self.ymin === bounds.ymax
        );

        // if the two bounds only touch at an edge, and inclusive is false,
        // then the bounds don't *really* intersect.
        if (options.inclusive || !mightTouch) {
            // otherwise, if one of the boundaries even partially contains another,
            // inclusive of the edges, then they do intersect.
            var inBottom = (
                ((bounds.ymin >= self.ymin) && (bounds.ymin <= self.ymax)) ||
                ((self.ymin >= bounds.ymin) && (self.ymin <= bounds.ymax))
            );
            var inTop = (
                ((bounds.ymax >= self.ymin) && (bounds.ymax <= self.ymax)) ||
                ((self.ymax > bounds.ymin) && (self.ymax < bounds.ymax))
            );
            var inLeft = (
                ((bounds.xmin >= self.xmin) && (bounds.xmin <= self.xmax)) ||
                ((self.xmin >= bounds.xmin) && (self.xmin <= bounds.xmax))
            );
            var inRight = (
                ((bounds.xmax >= self.xmin) && (bounds.xmax <= self.xmax)) ||
                ((self.xmax >= bounds.xmin) && (self.xmax <= bounds.xmax))
            );
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        return intersects;
    }
};

KTW.Object.Rectangle = Rectangle;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tangram; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(1);
﻿


/// <summary> 几何对象基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
class Tangram {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        Object(__WEBPACK_IMPORTED_MODULE_1__Util__["m" /* extend */])(this, options);
    }
    /// <summary> 
    /// 实现将openlayers的geomerty转换为KTW的几何类型
    /// 此方法由子类实现
    /// </summary>
    setByOL(openlayersObj) {
        return null;
    }

    /// <summary>
    /// 对象转化为字符串
    /// </summary>
    toString() {
        return "";
    }

    /// <summary>
    /// 获取几何类型名称,由子类实现
    /// </summary>
    getGeometryType() {
        return;
    }

    /// <summary>
    /// 1.去除字符串前后所有空格
    /// 2.去除字符串中所有空格(包括中间空格,需要设置第2个参数为:g) 
    /// </summary>
    Trim(str, is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global.toLowerCase() == "g") {
            result = result.replace(/\s/g, "");
        }
        return result;
    }
};

 
__WEBPACK_IMPORTED_MODULE_0__Base__["a" /* KTW */].Object.Tangram = Tangram;

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rectangle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Rectangle
 * 矩形参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Rectangle extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {
    /**
     * Constructor: KTW.Feature.ShapeParameters.Rectangle
     * 创建一个图形矩形参数对象。
     *
     * Parameters:
     * x - {Number} 矩形 x 坐标，必设参数。
     * y - {Number} 矩形 y 坐标，必设参数。
     * width - {Number} 矩形 width 坐标，必设参数。
     * height - {Number} 矩形 height 坐标，必设参数。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Rectangle>} 图形矩形参数对象。
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        /**
         * APIProperty: x
         * {Number} 左上角 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 左上角 y 坐标。
         */
        this.y = !isNaN(x) ? y : 0;

        /**
         * APIProperty: width
         * {Number} 宽度。
         */
        this.width = !isNaN(width) ? width : 0;

        /**
         * APIProperty: height
         * {Number} 高度。
         */
        this.height = !isNaN(height) ? height : 0;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Rectangle";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        super.destroy();
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Rectangle = Rectangle;

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Label; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Label
 * 标签参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Label extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {

    /**
     * Constructor: KTW.Feature.ShapeParameters.Label
     * 创建一个标签参数对象。
     *
     * Parameters:
     * x - {Number} 横坐标，必设参数。
     * y - {Number} 纵坐标，必设参数。
     * text - {String} 图形中的附加文本，必设参数。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Label>} 标签参数对象。
     */
    constructor(x, y, text) {
        super(x, y, text);
        /**
         * APIProperty: x
         * {Number} 标签 x 坐标。
         */
        this.x = x;

        /**
         * APIProperty: y
         * {Number} 标签 y 坐标。
         */
        this.y = y;

        /**
         * APIProperty: text
         * {String} 标签的文本内容。
         */
        this.text = text;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Label";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.text = null;

        super.destroy();
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Label = Label;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Image; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);



/**
 * @private
 * @class  KTW.Feature.ShapeParameters.Image
 * 图片参数对象。
 *
 * Inherits:
 *  - <KTW.Feature.ShapeParameters>
 */
class Image extends __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a" /* ShapeParameters */] {


    /**
     * Constructor: KTW.Feature.ShapeParameters.Image
     * 创建一个图片参数对象。
     *
     * Parameters:
     * x - {Number} 左上角横坐标，必设参数。
     * y - {Number} 左上角纵坐标，必设参数。
     * image - {String/Cavans} 图片地址或cavans对象，必设参数。
     * width - {Number} 绘制到画布上的宽度，默认为图片高度。
     * height - {Number} 绘制到画布上的高度，默认为图片高度。
     *
     * Returns:
     * {<KTW.Feature.ShapeParameters.Image>} 图片参数对象。
     */
    //     * sx - {Number} 从图片中裁剪的左上角横坐标。
    //     * sy - {Number} 从图片中裁剪的左上角纵坐标。
    //     * sWidth - {Number} 从图片中裁剪的宽度，默认为图片高度。
    //     * sHeight - {Number} 绘制到画布上的高度，默认为图片高度。
    constructor(x, y, image, width, height, sx, sy, sWidth, sHeight) {
        super(x, y, image, width, height, sx, sy, sWidth, sHeight);
        /**
         * APIProperty: x
         * {Number} 图片左上角横坐标。
         */
        this.x = x;

        /**
         * APIProperty: y
         * {Number} 左上角纵坐标。
         */
        this.y = y;

        /**
         * APIProperty: image
         * {String} 图片地址。
         */
        this.image = image;

        /**
         * APIProperty: width
         * {Number} 绘制到画布上的宽度，默认为图片高度。
         */
        this.width = width;

        /**
         * APIProperty: height
         * {Number} 绘制到画布上的高度，默认为图片高度。
         */
        this.height = height;

        /**
         * Property: sx
         * {Number} 从图片中裁剪的左上角横坐标。
         */
        this.sx = sx;

        /**
         * Property: sy
         * {Number} 从图片中裁剪的左上角纵坐标。
         */
        this.sy = sy;

        /**
         * Property: sWidth
         * {Number} 从图片中裁剪的宽度，默认为图片高度。
         */
        this.sWidth = sWidth;

        /**
         * Property: sHeight
         * {Number} 绘制到画布上的高度，默认为图片高度。
         */
        this.sHeight = sHeight;

        this.CLASS_NAME = "KTW.Feature.ShapeParameters.Image";

    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.image = null;
        this.width = null;
        this.height = null;
        this.sx = null;
        this.sy = null;
        this.sWidth = null;
        this.sHeight = null;
        super.destroy();
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Feature.ShapeParameters.Image = Image;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Area; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Curve__ = __webpack_require__(13);




/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Area
 * LevelRenderer 工具-图形范围判断
 *
 */
class Area {

    /**
     * Constructor: KTW.LevelRenderer.Tool.Area
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: util
         * {<KTW.LevelRenderer.Tool.Util>} 基础工具对象
         */
        this.util = new __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* Util */]();

        /**
         * Property: curve
         * {<KTW.LevelRenderer.Tool.Curve>} 曲线工具对象
         */
        this.curve = new __WEBPACK_IMPORTED_MODULE_2__Curve__["a" /* Curve */]();

        /**
         * Property: _ctx
         * {Object} Cavans2D 渲染上下文
         */
        this._ctx = null;

        /**
         * Property: _textWidthCache
         * {Object} 文本宽度缓存
         */
        this._textWidthCache = {};

        /**
         * Property: _textHeightCache
         * {Object} 文本高度缓存
         */
        this._textHeightCache = {};

        /**
         * Property: _textWidthCacheCounter
         * {Object} 文本宽度缓存数量
         */
        this._textWidthCacheCounter = 0;

        /**
         * Property: _textHeightCacheCounter
         * {Object} 文本高度缓存数量
         */
        this._textHeightCacheCounter = 0;

        /**
         * Property: TEXT_CACHE_MAX
         * {Object} 文本最大缓存数量
         */
        this.TEXT_CACHE_MAX = 5000;

        /**
         * Property: PI2
         * {Object} 2*PI 的值
         */
        this.PI2 = Math.PI * 2;

        /**
         * Property: roots
         * {Array} 临时数组
         */
        this.roots = [-1, -1, -1];

        /**
         * Property: extrema
         * {Array} 临时数组
         */
        this.extrema = [-1, -1];

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Area";
    }

    /**
     * Method: normalizeRadian
     * 弧度标准化函数。
     *
     * Parameters:
     * angle - {Number} 弧度值。
     *
     * Returns:
     * {Number} 标准化后的弧度值。
     */
    normalizeRadian(angle) {
        angle %= this.PI2;
        if (angle < 0) {
            angle += this.PI2;
        }
        return angle;
    }

    /**
     * APIMethod: normalizeRadian
     * 包含判断。
     *
     * Parameters:
     * shape - {Object} 图形。
     * area - {Number} 目标区域。
     * x - {Number} 横坐标。
     * y - {Number} 纵坐标。
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置。
     */
    isInside(shape, area, x, y) {
        if (!area || !shape) {
            // 无参数或不支持类型
            return false;
        }
        var zoneType = shape.type;

        this._ctx = this._ctx || this.util.getContext();

        // 未实现或不可用时则数学运算，主要是line，brokenLine，ring
        var _mathReturn = this._mathMethod(shape, area, x, y);
        if (typeof _mathReturn != 'undefined') {
            return _mathReturn;
        }

        if (shape.buildPath && this._ctx.isPointInPath) {
            return this._buildPathMethod(shape, this._ctx, area, x, y);
        }

        // 上面的方法都行不通时
        switch (zoneType) {
            case 'ellipse': // Todo，不精确
            case 'smicellipse': // Todo，不精确
                return true;
            // 旋轮曲线  不准确
            case 'trochoid':
                var _r = area.location == 'out'
                    ? area.r1 + area.r2 + area.d
                    : area.r1 - area.r2 + area.d;
                return this.isInsideCircle(area, x, y, _r);
            // 玫瑰线 不准确
            case 'rose' :
                return this.isInsideCircle(area, x, y, area.maxr);
            // 路径，椭圆，曲线等-----------------13
            default:
                return false;   // Todo，暂不支持
        }
    }

    /**
     * Method: _mathMethod
     * 用数学方法判断，三个方法中最快，但是支持的shape少。
     *
     * Parameters:
     * shape - {Object} 图形。
     * area - {Number} 目标区域。
     * x - {Number} 横坐标。
     * y - {Number} 纵坐标。
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置，true表示坐标处在图形中。
     */
    _mathMethod(shape, area, x, y) {
        var zoneType = shape.type;
        // 在矩形内则部分图形需要进一步判断
        switch (zoneType) {
            // 贝塞尔曲线
            case 'bezier-curve':
                if (typeof(area.cpX2) === 'undefined') {
                    return this.isInsideQuadraticStroke(
                        area.xStart, area.yStart,
                        area.cpX1, area.cpY1,
                        area.xEnd, area.yEnd,
                        area.lineWidth, x, y
                    );
                }
                return this.isInsideCubicStroke(
                    area.xStart, area.yStart,
                    area.cpX1, area.cpY1,
                    area.cpX2, area.cpY2,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
            // 线
            case 'line':
                return this.isInsideLine(
                    area.xStart, area.yStart,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
            // 折线
            case 'broken-line':
                return this.isInsideBrokenLine(
                    area.pointList, area.lineWidth, x, y
                );
            // 扩展折线
            case 'smicbroken-line': {
                // SMIC-修改 - start
                let icX = x;
                let icY = y;
                if (shape.refOriginalPosition) {
                    icX = x - shape.refOriginalPosition[0];
                    icY = y - shape.refOriginalPosition[1];
                }
                return this.isInsideBrokenLine(
                    area.pointList, area.lineWidth, icX, icY
                );
            }
            //初始代码：
            //      return isInsideBrokenLine(
            //          area.pointList, area.lineWidth, x, y
            //      );
            // SMIC-修改 - end
            // 圆环
            case 'ring':
                return this.isInsideRing(
                    area.x, area.y, area.r0, area.r, x, y
                );
            case 'smicring': {
                let areaX = area.x;
                let areaY = area.y;
                if (shape.refOriginalPosition) {
                    areaX = area.x + shape.refOriginalPosition[0];
                    areaY = area.y + shape.refOriginalPosition[1];
                }
                return this.isInsideRing(
                    areaX, areaY, area.r0, area.r, x, y
                );
            }
            // 圆形
            case 'circle':
                return this.isInsideCircle(
                    area.x, area.y, area.r, x, y
                );
            // 扩展-点
            case 'smicpoint': {
                // SMIC-修改 - start
                let icX = x;
                let icY = y;
                if (shape.refOriginalPosition) {
                    icX = x - shape.refOriginalPosition[0];
                    icY = y - shape.refOriginalPosition[1];
                }
                return this.isInsideCircle(
                    area.x, area.y, area.r, icX, icY
                );
            }
            //初始代码：
            //  无
            // SMIC-修改 - end
            // 扇形
            case 'sector': {
                let startAngle = area.startAngle * Math.PI / 180;
                let endAngle = area.endAngle * Math.PI / 180;
                if (!area.clockWise) {
                    startAngle = -startAngle;
                    endAngle = -endAngle;
                }
                return this.isInsideSector(
                    area.x, area.y, area.r0, area.r,
                    startAngle, endAngle,
                    !area.clockWise,
                    x, y
                );
            }
            //初始代码：
            //  无
            // SMIC-增加 - end
            // 扇形
            case 'smicsector': {
                let startAngle = area.startAngle * Math.PI / 180;
                let endAngle = area.endAngle * Math.PI / 180;
                if (!area.clockWise) {
                    startAngle = -startAngle;
                    endAngle = -endAngle;
                }

                let areaX = area.x;
                let areaY = area.y;
                if (shape.refOriginalPosition) {
                    areaX = area.x + shape.refOriginalPosition[0];
                    areaY = area.y + shape.refOriginalPosition[1];
                }

                return this.isInsideSector(
                    areaX, areaY, area.r0, area.r,
                    startAngle, endAngle,
                    !area.clockWise,
                    x, y
                );
            }
            // 多边形
            case 'path':
                return this.isInsidePath(
                    area.pathArray, Math.max(area.lineWidth, 5),
                    area.brushType, x, y
                );
            case 'polygon':
            case 'star':
            case 'smicstar':
            case 'isogon':
            case 'smicisogon':
                return this.isInsidePolygon(area.pointList, x, y);
            // 扩展多边形
            case 'smicpolygon': {
                // SMIC-修改 - start
                let icX = x;
                let icY = y;
                if (shape.refOriginalPosition) {
                    icX = x - shape.refOriginalPosition[0];
                    icY = y - shape.refOriginalPosition[1];
                }

                //岛洞面
                if (shape.holePolygonPointLists && shape.holePolygonPointLists.length > 0) {
                    var isOnBase = this.isInsidePolygon(area.pointList, icX, icY);

                    // 遍历岛洞子面
                    var holePLS = shape.holePolygonPointLists;
                    var isOnHole = false;
                    for (var i = 0, holePLSen = holePLS.length; i < holePLSen; i++) {
                        var holePL = holePLS[i];
                        var isOnSubHole = this.isInsidePolygon(holePL, icX, icY);
                        if (isOnSubHole === true) {
                            isOnHole = true;
                        }
                    }

                    // 捕获判断
                    if (isOnBase === true && isOnHole === false) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return this.isInsidePolygon(area.pointList, icX, icY);
                }
            }
            // 初始代码：
            //  无
            // SMIC-修改 - end
            // 文本
            case 'text':
                var rect = area.__rect || shape.getRect(area);
                return this.isInsideRect(
                    rect.x, rect.y, rect.width, rect.height, x, y
                );
            // 扩展文本
            case 'smictext':
                //用文本背景矩形判断
                var textBg = shape.getTextBackground(area);
                return this.isInsidePolygon(textBg, x, y);
            //初始代码：
            //  无
            // SMIC-修改 - end
            // 矩形
            case 'rectangle':
            case 'image':
                // 图片
                return this.isInsideRect(
                    area.x, area.y, area.width, area.height, x, y
                );
            case 'smicimage': {
                let areaX = area.x;
                let areaY = area.y;
                if (shape.refOriginalPosition) {
                    areaX = area.x + shape.refOriginalPosition[0];
                    areaY = area.y + shape.refOriginalPosition[1];
                }
                return this.isInsideRect(
                    areaX, areaY, area.width, area.height, x, y
                );
            }
            //// 扩展矩形
            //case 'smicpolygon':
            //    // SMIC-修改 - start
            //    var icX = x;
            //    var icY = y;
            //    if(shape.refOriginalPosition) {
            //        icX = x - shape.refOriginalPosition[0];
            //        icY = y - shape.refOriginalPosition[1];
            //    }
            //    return this.isInsideRect(
            //        area.x, area.y, area.width, area.height, icX, icY
            //    );
            //初始代码：
            //  无
            // SMIC-修改 - end
        }
    }

    /**
     * Method: _buildPathMethod
     * 通过buildPath方法来判断，三个方法中较快，但是不支持线条类型的 shape
     *
     * Parameters:
     * shape - {Object} 图形。
     * context - {Object} 上下文。
     * area - {Number} 目标区域。
     * x - {Number} 横坐标。
     * y - {Number} 纵坐标。
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置, true表示坐标处在图形中。
     */
    _buildPathMethod(shape, context, area, x, y) {
        // 图形类实现路径创建了则用类的path
        context.beginPath();
        shape.buildPath(context, area);
        context.closePath();
        return context.isPointInPath(x, y);
    }

    /**
     * APIMethod: isOutside
     * 图形是否不包含鼠标位置。
     *
     * Parameters:
     * shape - {Object} 图形。
     * area - {Number} 目标区域。
     * x - {Number} 横坐标。
     * y - {Number} 纵坐标。
     *
     * Returns:
     * {Boolean} 图形是否不包含鼠标位置, true表示坐标处在图形外。
     */
    isOutside(shape, area, x, y) {
        return !this.isInside(shape, area, x, y);
    }

    /**
     * APIMethod: isInsideLine
     * 线段包含判断。
     *
     * Parameters:
     * x0 - {Number}
     * y0 - {Number}
     * x1 - {Number}
     * y1 - {Number}
     * lineWidth - {Number}
     * x - {Number}
     * y - {Number}
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideLine(x0, y0, x1, y1, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        var _a = 0;
        var _b = 0;
        // Quick reject
        if (
            (y > y0 + _l && y > y1 + _l)
            || (y < y0 - _l && y < y1 - _l)
            || (x > x0 + _l && x > x1 + _l)
            || (x < x0 - _l && x < x1 - _l)
        ) {
            return false;
        }

        if (x0 !== x1) {
            _a = (y0 - y1) / (x0 - x1);
            _b = (x0 * y1 - x1 * y0) / (x0 - x1);
        } else {
            return Math.abs(x - x0) <= _l / 2;
        }
        var tmp = _a * x - y + _b;
        var _s = tmp * tmp / (_a * _a + 1);
        return _s <= _l / 2 * _l / 2;
    }

    /**
     * Method: isInsideCubicStroke
     * 三次贝塞尔曲线描边包含判断。
     *
     * Parameters:
     * x0 - {Number}
     * y0 - {Number}
     * x1 - {Number}
     * y1 - {Number}
     * x2 - {Number}
     * y2 - {Number}
     * x3 - {Number}
     * y3 - {Number}
     * lineWidth - {Number}
     * x - {Number}
     * y - {Number}
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideCubicStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        // Quick reject
        if (
            (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
            || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
            || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
            || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)
        ) {
            return false;
        }
        var d = this.curve.cubicProjectPoint(
            x0, y0, x1, y1, x2, y2, x3, y3,
            x, y, null
        );
        return d <= _l / 2;
    }

    /**
     * Method: isInsideQuadraticStroke
     * 二次贝塞尔曲线描边包含判断。
     *
     * Parameters:
     * x0 - {Number}
     * y0 - {Number}
     * x1 - {Number}
     * y1 - {Number}
     * x2 - {Number}
     * y2 - {Number}
     * lineWidth - {Number} 纵坐标。
     * x - {Number}
     * y - {Number}
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideQuadraticStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        // Quick reject
        if (
            (y > y0 + _l && y > y1 + _l && y > y2 + _l)
            || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
            || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
            || (x < x0 - _l && x < x1 - _l && x < x2 - _l)
        ) {
            return false;
        }
        var d = this.curve.quadraticProjectPoint(
            x0, y0, x1, y1, x2, y2,
            x, y, null
        );
        return d <= _l / 2;
    }

    /**
     * Method: isInsideArcStroke
     * 圆弧描边包含判断。
     *
     * Parameters:
     * cx - {Number}
     * cy - {Number}
     * r - {Number}
     * startAngle - {Number}
     * endAngle - {Number}
     * anticlockwise - {Number}
     * lineWidth - {Number}
     * x - {Number}
     * y - {Number}
     *
     * Returns:
     * {Boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideArcStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
        var PI2 = this.PI2;

        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);

        x -= cx;
        y -= cy;
        var d = Math.sqrt(x * x + y * y);
        if ((d - _l > r) || (d + _l < r)) {
            return false;
        }
        if (Math.abs(startAngle - endAngle) >= PI2) {
            // Is a circle
            return true;
        }
        if (anticlockwise) {
            var tmp = startAngle;
            startAngle = this.normalizeRadian(endAngle);
            endAngle = this.normalizeRadian(tmp);
        } else {
            startAngle = this.normalizeRadian(startAngle);
            endAngle = this.normalizeRadian(endAngle);
        }
        if (startAngle > endAngle) {
            endAngle += PI2;
        }

        var angle = Math.atan2(y, x);
        if (angle < 0) {
            angle += PI2;
        }
        return (angle >= startAngle && angle <= endAngle)
            || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
    }

    /**
     * APIMethod: isInsideBrokenLine
     * 图形 BrokenLine 是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideBrokenLine(points, lineWidth, x, y) {
        var _lineWidth = Math.max(lineWidth, 10);
        for (var i = 0, l = points.length - 1; i < l; i++) {
            var x0 = points[i][0];
            var y0 = points[i][1];
            var x1 = points[i + 1][0];
            var y1 = points[i + 1][1];

            if (this.isInsideLine(x0, y0, x1, y1, _lineWidth, x, y)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Method: isInsideRing
     * 图形 Ring 是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideRing(cx, cy, r0, r, x, y) {
        var d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        return (d < r * r) && (d > r0 * r0);
    }

    /**
     * APIMethod: isInsideRect
     * 图形 Rect 是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideRect(x0, y0, width, height, x, y) {
        return x >= x0 && x <= (x0 + width) && y >= y0 && y <= (y0 + height);
    }

    /**
     * APIMethod: isInsideCircle
     * 图形 Circle 是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideCircle(x0, y0, r, x, y) {
        return (x - x0) * (x - x0) + (y - y0) * (y - y0) < r * r;
    }

    /**
     * APIMethod: isInsideSector
     * 图形 Sector 是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideSector(cx, cy, r0, r, startAngle, endAngle, anticlockwise, x, y) {
        return this.isInsideArcStroke(cx, cy, (r0 + r) / 2, startAngle, endAngle, anticlockwise, r - r0, x, y);
    }

    /**
     * APIMethod: isInsidePolygon
     * 图形 Polygon 是否包含鼠标位置, true表示坐标处在图形内。与 canvas 一样采用 non-zero winding rule
     */
    isInsidePolygon(points, x, y) {
        var N = points.length;
        var w = 0;

        for (var i = 0, j = N - 1; i < N; i++) {
            var x0 = points[j][0];
            var y0 = points[j][1];
            var x1 = points[i][0];
            var y1 = points[i][1];
            w += this.windingLine(x0, y0, x1, y1, x, y);
            j = i;
        }
        return w !== 0;
    }

    /**
     * Method: windingLine
     */
    windingLine(x0, y0, x1, y1, x, y) {
        if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
            return 0;
        }
        if (y1 == y0) {
            return 0;
        }
        var dir = y1 < y0 ? 1 : -1;
        var t = (y - y0) / (y1 - y0);
        var x_ = t * (x1 - x0) + x0;

        return x_ > x ? dir : 0;
    }

    /**
     * Method: swapExtrema
     */
    swapExtrema() {
        var tmp = this.extrema[0];
        this.extrema[0] = this.extrema[1];
        this.extrema[1] = tmp;
    }

    /**
     * Method: windingCubic
     */
    windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
        var curve = this.curve;
        var roots = this.roots;
        var extrema = this.extrema;

        // Quick reject
        if (
            (y > y0 && y > y1 && y > y2 && y > y3)
            || (y < y0 && y < y1 && y < y2 && y < y3)
        ) {
            return 0;
        }
        var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
        if (nRoots === 0) {
            return 0;
        } else {
            var w = 0;
            var nExtrema = -1;
            var y0_, y1_;
            for (var i = 0; i < nRoots; i++) {
                var t = roots[i];
                var x_ = curve.cubicAt(x0, x1, x2, x3, t);
                if (x_ < x) { // Quick reject
                    continue;
                }
                if (nExtrema < 0) {
                    nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
                    if (extrema[1] < extrema[0] && nExtrema > 1) {
                        this.swapExtrema();
                    }
                    y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
                    if (nExtrema > 1) {
                        y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
                    }
                }
                if (nExtrema == 2) {
                    // 分成三段单调函数
                    if (t < extrema[0]) {
                        w += y0_ < y0 ? 1 : -1;
                    } else if (t < extrema[1]) {
                        w += y1_ < y0_ ? 1 : -1;
                    } else {
                        w += y3 < y1_ ? 1 : -1;
                    }
                } else {
                    // 分成两段单调函数
                    if (t < extrema[0]) {
                        w += y0_ < y0 ? 1 : -1;
                    } else {
                        w += y3 < y0_ ? 1 : -1;
                    }
                }
            }
            return w;
        }
    }

    /**
     * Method: windingQuadratic
     */
    windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
        var curve = this.curve;
        var roots = this.roots;

        // Quick reject
        if (
            (y > y0 && y > y1 && y > y2)
            || (y < y0 && y < y1 && y < y2)
        ) {
            return 0;
        }
        var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
        if (nRoots === 0) {
            return 0;
        } else {
            var t = curve.quadraticExtremum(y0, y1, y2);
            if (t >= 0 && t <= 1) {
                var w = 0;
                var y_ = curve.quadraticAt(y0, y1, y2, t);
                for (let i = 0; i < nRoots; i++) {
                    let x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
                    if (x_ > x) {
                        continue;
                    }
                    if (roots[i] < t) {
                        w += y_ < y0 ? 1 : -1;
                    } else {
                        w += y2 < y_ ? 1 : -1;
                    }
                }
                return w;
            } else {
                let x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
                if (x_ > x) {
                    return 0;
                }
                return y2 < y0 ? 1 : -1;
            }
        }
    }

    /**
     * Method: windingArc
     *     // TODO   Arc 旋转
     */
    windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
        var roots = this.roots;
        var PI2 = this.PI2;

        y -= cy;
        if (y > r || y < -r) {
            return 0;
        }
        let tmp = Math.sqrt(r * r - y * y);
        roots[0] = -tmp;
        roots[1] = tmp;

        if (Math.abs(startAngle - endAngle) >= PI2) {
            // Is a circle
            startAngle = 0;
            endAngle = PI2;
            var dir = anticlockwise ? 1 : -1;
            if (x >= roots[0] + cx && x <= roots[1] + cx) {
                return dir;
            } else {
                return 0;
            }
        }

        if (anticlockwise) {
            let tmp = startAngle;
            startAngle = this.normalizeRadian(endAngle);
            endAngle = this.normalizeRadian(tmp);
        } else {
            startAngle = this.normalizeRadian(startAngle);
            endAngle = this.normalizeRadian(endAngle);
        }
        if (startAngle > endAngle) {
            endAngle += PI2;
        }

        var w = 0;
        for (let i = 0; i < 2; i++) {
            var x_ = roots[i];
            if (x_ + cx > x) {
                let angle = Math.atan2(y, x_);
                let dir = anticlockwise ? 1 : -1;
                if (angle < 0) {
                    angle = PI2 + angle;
                }
                if (
                    (angle >= startAngle && angle <= endAngle)
                    || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)
                ) {
                    if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                        dir = -dir;
                    }
                    w += dir;
                }
            }
        }
        return w;
    }


    /**
     * APIMethod: isInsidePath
     * 与 canvas 一样采用 non-zero winding rule
     */
    isInsidePath(pathArray, lineWidth, brushType, x, y) {
        var w = 0;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        var beginSubpath = true;
        var firstCmd = true;

        brushType = brushType || 'fill';

        var hasStroke = brushType === 'stroke' || brushType === 'both';
        var hasFill = brushType === 'fill' || brushType === 'both';

        // var roots = [-1, -1, -1];
        for (var i = 0; i < pathArray.length; i++) {
            var seg = pathArray[i];
            var p = seg.points;
            // Begin a new subpath
            if (beginSubpath || seg.command === 'M') {
                if (i > 0) {
                    // Close previous subpath
                    if (hasFill) {
                        w += this.windingLine(xi, yi, x0, y0, x, y);
                    }
                    if (w !== 0) {
                        return true;
                    }
                }
                x0 = p[p.length - 2];
                y0 = p[p.length - 1];
                beginSubpath = false;
                if (firstCmd && seg.command !== 'A') {
                    // 如果第一个命令不是M, 是lineTo, bezierCurveTo
                    // 等绘制命令的话，是会从该绘制的起点开始算的
                    // Arc 会在之后做单独处理所以这里忽略
                    firstCmd = false;
                    xi = x0;
                    yi = y0;
                }
            }
            switch (seg.command) {
                case 'M':
                    xi = p[0];
                    yi = p[1];
                    break;
                case 'L':
                    if (hasStroke) {
                        if (this.isInsideLine(
                                xi, yi, p[0], p[1], lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingLine(xi, yi, p[0], p[1], x, y);
                    }
                    xi = p[0];
                    yi = p[1];
                    break;
                case 'C':
                    if (hasStroke) {
                        if (this.isInsideCubicStroke(
                                xi, yi, p[0], p[1], p[2], p[3], p[4], p[5],
                                lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingCubic(
                            xi, yi, p[0], p[1], p[2], p[3], p[4], p[5], x, y
                        );
                    }
                    xi = p[4];
                    yi = p[5];
                    break;
                case 'Q':
                    if (hasStroke) {
                        if (this.isInsideQuadraticStroke(
                                xi, yi, p[0], p[1], p[2], p[3],
                                lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingQuadratic(
                            xi, yi, p[0], p[1], p[2], p[3], x, y
                        );
                    }
                    xi = p[2];
                    yi = p[3];
                    break;
                case 'A':
                    // TODO Arc 旋转
                    // TODO Arc 判断的开销比较大
                    var cx = p[0];
                    var cy = p[1];
                    var rx = p[2];
                    var ry = p[3];
                    var theta = p[4];
                    var dTheta = p[5];
                    var x1 = Math.cos(theta) * rx + cx;
                    var y1 = Math.sin(theta) * ry + cy;
                    // 不是直接使用 arc 命令
                    if (!firstCmd) {
                        w += this.windingLine(xi, yi, x1, y1);
                    } else {
                        firstCmd = false;
                        // 第一个命令起点还未定义
                        x0 = x1;
                        y0 = y1;
                    }
                    // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
                    var _x = (x - cx) * ry / rx + cx;
                    if (hasStroke) {
                        if (this.isInsideArcStroke(
                                cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                                lineWidth, _x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingArc(
                            cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                            _x, y
                        );
                    }
                    xi = Math.cos(theta + dTheta) * rx + cx;
                    yi = Math.sin(theta + dTheta) * ry + cy;
                    break;
                case 'z':
                    if (hasStroke) {
                        if (this.isInsideLine(
                                xi, yi, x0, y0, lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    beginSubpath = true;
                    break;
            }
        }
        if (hasFill) {
            w += this.windingLine(xi, yi, x0, y0, x, y);
        }
        return w !== 0;
    }

    /**
     * APIMethod: getTextWidth
     * 测算多行文本宽度
     */
    getTextWidth(text, textFont) {
        var key = text + ':' + textFont;
        if (this._textWidthCache[key]) {
            return this._textWidthCache[key];
        }
        this._ctx = this._ctx || this.util.getContext();
        this._ctx.save();

        if (textFont) {
            this._ctx.font = textFont;
        }

        text = (text + '').split('\n');
        var width = 0;
        for (var i = 0, l = text.length; i < l; i++) {
            width = Math.max(
                this._ctx.measureText(text[i]).width,
                width
            );
        }
        this._ctx.restore();

        this._textWidthCache[key] = width;
        if (++this._textWidthCacheCounter > this.TEXT_CACHE_MAX) {
            // 内存释放
            this._textWidthCacheCounter = 0;
            this._textWidthCache = {};
        }

        return width;
    }

    /**
     * APIMethod: getTextHeight
     * 测算多行文本高度
     */
    getTextHeight(text, textFont) {
        var key = text + ':' + textFont;
        if (this._textHeightCache[key]) {
            return this._textHeightCache[key];
        }

        this._ctx = this._ctx || this.util.getContext();

        this._ctx.save();
        if (textFont) {
            this._ctx.font = textFont;
        }

        text = (text + '').split('\n');
        // 比较粗暴
        //var height = (this._ctx.measureText('国').width + 2) * text.length;  //打包不支持中文，替换掉
        var height = (this._ctx.measureText('ZH').width + 2) * text.length;

        this._ctx.restore();

        this._textHeightCache[key] = height;
        if (++this._textHeightCacheCounter > this.TEXT_CACHE_MAX) {
            // 内存释放
            this._textHeightCacheCounter = 0;
            this._textHeightCache = {};
        }
        return height;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Area = Area;

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComputeBoundingBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Curve__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Vector__ = __webpack_require__(14);




/**
 * @private
 * @class  KTW.LevelRenderer.Tool.ComputeBoundingBox
 * LevelRenderer 工具-图形 Bounds 计算
 *
 */
class ComputeBoundingBox {

    /**
     * Constructor: KTW.LevelRenderer.Tool.ComputeBoundingBox
     * 构造函数。
     *
     */
    constructor() {
        if (arguments.length === 3) {
            this.computeBoundingBox(arguments);
        }

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.ComputeBoundingBox";
    }

    /**
     * APIMethod: computeBoundingBox
     * 从顶点数组中计算出最小包围盒，写入`min`和`max`中。
     *
     * Parameters:
     * points - {Array{Object}} 顶点数组。
     * min - {Number}
     * max - {Number}
     *
     */
    computeBoundingBox(points, min, max) {
        if (points.length === 0) {
            return;
        }
        var left = points[0][0];
        var right = points[0][0];
        var top = points[0][1];
        var bottom = points[0][1];

        for (var i = 1; i < points.length; i++) {
            var p = points[i];
            if (p[0] < left) {
                left = p[0];
            }
            if (p[0] > right) {
                right = p[0];
            }
            if (p[1] < top) {
                top = p[1];
            }
            if (p[1] > bottom) {
                bottom = p[1];
            }
        }

        min[0] = left;
        min[1] = top;
        max[0] = right;
        max[1] = bottom;
    }

    /**
     * APIMethod: cubeBezier
     * 从三阶贝塞尔曲线(p0, p1, p2, p3)中计算出最小包围盒，写入`min`和`max`中。
     *
     * 原：computeCubeBezierBoundingBox
     *
     * Parameters:
     * p0 - {Array{Number}}
     * p1 - {Array{Number}}
     * p2 - {Array{Number}}
     * p3 - {Array{Number}}
     * min - {Array{Number}}
     * max - {Array{Number}}
     *
     */
    cubeBezier(p0, p1, p2, p3, min, max) {
        var curve = new __WEBPACK_IMPORTED_MODULE_1__Curve__["a" /* Curve */]();

        var xDim = [];
        curve.cubicExtrema(p0[0], p1[0], p2[0], p3[0], xDim);
        for (let i = 0; i < xDim.length; i++) {
            xDim[i] = curve.cubicAt(p0[0], p1[0], p2[0], p3[0], xDim[i]);
        }
        var yDim = [];
        curve.cubicExtrema(p0[1], p1[1], p2[1], p3[1], yDim);
        for (let i = 0; i < yDim.length; i++) {
            yDim[i] = curve.cubicAt(p0[1], p1[1], p2[1], p3[1], yDim[i]);
        }

        xDim.push(p0[0], p3[0]);
        yDim.push(p0[1], p3[1]);

        var left = Math.min.apply(null, xDim);
        var right = Math.max.apply(null, xDim);
        var top = Math.min.apply(null, yDim);
        var bottom = Math.max.apply(null, yDim);

        min[0] = left;
        min[1] = top;
        max[0] = right;
        max[1] = bottom;
    }

    /**
     * APIMethod: quadraticBezier
     * 从二阶贝塞尔曲线(p0, p1, p2)中计算出最小包围盒，写入`min`和`max`中
     *
     * 原：computeQuadraticBezierBoundingBox
     *
     * Parameters:
     * p0 - {Array{Number}}
     * p1 - {Array{Number}}
     * p2 - {Array{Number}}
     * min - {Array{Number}}
     * max - {Array{Number}}
     *
     */
    quadraticBezier(p0, p1, p2, min, max) {
        var curve = new __WEBPACK_IMPORTED_MODULE_1__Curve__["a" /* Curve */]();

        // Find extremities, where derivative in x dim or y dim is zero
        var t1 = curve.quadraticExtremum(p0[0], p1[0], p2[0]);
        var t2 = curve.quadraticExtremum(p0[1], p1[1], p2[1]);

        t1 = Math.max(Math.min(t1, 1), 0);
        t2 = Math.max(Math.min(t2, 1), 0);

        var ct1 = 1 - t1;
        var ct2 = 1 - t2;

        var x1 = ct1 * ct1 * p0[0]
            + 2 * ct1 * t1 * p1[0]
            + t1 * t1 * p2[0];
        var y1 = ct1 * ct1 * p0[1]
            + 2 * ct1 * t1 * p1[1]
            + t1 * t1 * p2[1];

        var x2 = ct2 * ct2 * p0[0]
            + 2 * ct2 * t2 * p1[0]
            + t2 * t2 * p2[0];
        var y2 = ct2 * ct2 * p0[1]
            + 2 * ct2 * t2 * p1[1]
            + t2 * t2 * p2[1];
        min[0] = Math.min(p0[0], p2[0], x1, x2);
        min[1] = Math.min(p0[1], p2[1], y1, y2);
        max[0] = Math.max(p0[0], p2[0], x1, x2);
        max[1] = Math.max(p0[1], p2[1], y1, y2);
    }

    /**
     * APIMethod: arc
     * 从圆弧中计算出最小包围盒，写入`min`和`max`中
     *
     * 原：computeArcBoundingBox
     *
     * Parameters:
     * x - {Number}  圆弧中心点 x
     * y - {Number}  圆弧中心点 y
     * r - {Number}  圆弧半径
     * startAngle - {Number}  圆弧开始角度
     * endAngle - {Number}  圆弧结束角度
     * anticlockwise - {Number}  是否是顺时针
     * min - {Number}
     * max - {Number}
     */
    arc(x, y, r, startAngle, endAngle, anticlockwise, min, max) {
        var vec2 = new __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* Vector */]();

        var start = vec2.create();
        var end = vec2.create();
        var extremity = vec2.create();

        start[0] = Math.cos(startAngle) * r + x;
        start[1] = Math.sin(startAngle) * r + y;

        end[0] = Math.cos(endAngle) * r + x;
        end[1] = Math.sin(endAngle) * r + y;

        vec2.min(min, start, end);
        vec2.max(max, start, end);

        // Thresh to [0, Math.PI * 2]
        startAngle = startAngle % (Math.PI * 2);
        if (startAngle < 0) {
            startAngle = startAngle + Math.PI * 2;
        }
        endAngle = endAngle % (Math.PI * 2);
        if (endAngle < 0) {
            endAngle = endAngle + Math.PI * 2;
        }

        if (startAngle > endAngle && !anticlockwise) {
            endAngle += Math.PI * 2;
        } else if (startAngle < endAngle && anticlockwise) {
            startAngle += Math.PI * 2;
        }
        if (anticlockwise) {
            var tmp = endAngle;
            endAngle = startAngle;
            startAngle = tmp;
        }

        // var number = 0;
        // var step = (anticlockwise ? -Math.PI : Math.PI) / 2;
        for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
            if (angle > startAngle) {
                extremity[0] = Math.cos(angle) * r + x;
                extremity[1] = Math.sin(angle) * r + y;

                vec2.min(min, extremity, min);
                vec2.max(max, extremity, max);
            }
        }
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.ComputeBoundingBox = ComputeBoundingBox;

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Env; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Env
 * 环境识别
 *
 */
class Env {
    constructor() {
        // Zepto.js
        // (c) 2010-2013 Thomas Fuchs
        // Zepto.js may be freely distributed under the MIT license.
        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Env";
        var me = this;
        function detect(ua) {
            var os = me.os = {};
            var browser = me.browser = {};
            var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
            var touchpad = webos && ua.match(/TouchPad/);
            var kindle = ua.match(/Kindle\/([\d.]+)/);
            var silk = ua.match(/Silk\/([\d._]+)/);
            var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
            var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
            var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
            var playbook = ua.match(/PlayBook/);
            var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
            var firefox = ua.match(/Firefox\/([\d.]+)/);
            var ie = ua.match(/MSIE ([\d.]+)/);
            var safari = webkit && ua.match(/Mobile\//) && !chrome;
            var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;

            // Todo: clean this up with a better OS/browser seperation:
            // - discern (more) between multiple browsers on android
            // - decide if kindle fire in silk mode is android or not
            // - Firefox on Android doesn't specify the Android version
            // - possibly devide in os, device and browser hashes

            /*eslint-disable*/
            if (browser.webkit = !!webkit) {
                browser.version = webkit[1];
            }

            if (android) {
                os.android = true, os.version = android[2];
            }
            if (iphone && !ipod) {
                os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
            }
            if (ipad) {
                os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
            }
            if (ipod) {
                os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            }
            if (webos) {
                os.webos = true, os.version = webos[2];
            }
            if (touchpad) {
                os.touchpad = true;
            }
            if (blackberry) {
                os.blackberry = true, os.version = blackberry[2];
            }
            if (bb10) {
                os.bb10 = true, os.version = bb10[2];
            }
            if (rimtabletos) {
                os.rimtabletos = true, os.version = rimtabletos[2];
            }
            if (playbook) {
                browser.playbook = true;
            }
            if (kindle) {
                os.kindle = true, os.version = kindle[1];
            }
            if (silk) {
                browser.silk = true, browser.version = silk[1];
            }
            if (!silk && os.android && ua.match(/Kindle Fire/)) {
                browser.silk = true;
            }
            if (chrome) {
                browser.chrome = true, browser.version = chrome[1];
            }
            if (firefox) {
                browser.firefox = true, browser.version = firefox[1];
            }
            if (ie) {
                browser.ie = true, browser.version = ie[1];
            }
            if (safari && (ua.match(/Safari/) || !!os.ios)) {
                browser.safari = true;
            }
            if (webview) {
                browser.webview = true;
            }
            if (ie) {
                browser.ie = true, browser.version = ie[1];
            }

            os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
                (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
            os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
                (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
                (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

            return {
                browser: browser,
                os: os,
                // 原生canvas支持
                canvasSupported: document.createElement('canvas').getContext ? true : false
            };
        }

        return detect(navigator.userAgent);
    }
    destory() {
        return true;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Env = Env;

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Event; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Event
 * LevelRenderer 工具-事件辅助类
 *
 */
class Event {


    /**
     * Constructor: KTW.LevelRenderer.Tool.Event
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: stop
         * {Function} 停止冒泡和阻止默认行为
         */
        this.stop = typeof window.addEventListener === 'function'
            ? function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.cancelBubble = true;
            }
            : function (e) {
                e.returnValue = false;
                e.cancelBubble = true;
            };

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Event";
    }


    /**
     * APIMethod: getX
     * 提取鼠标（手指）x坐标。
     *
     * Parameters:
     * e - {Event} 事件。
     *
     * Returns:
     * {Number} 鼠标（手指）x坐标。
     */
    getX(e) {
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    }


    /**
     * APIMethod: getY
     * 提取鼠标y坐标。
     *
     * Parameters:
     * e - {Event} 事件。
     *
     * Returns:
     * {Number} 鼠标（手指）y坐标。
     */
    getY(e) {
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
    }


    /**
     * APIMethod: getDelta
     * 提取鼠标滚轮变化。
     *
     * Parameters:
     * e - {Event} 事件。
     *
     * Returns:
     * {Number} 滚轮变化，正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动。
     */
    getDelta(e) {
        return typeof e.zrenderDelta != 'undefined' && e.zrenderDelta
            || typeof e.wheelDelta != 'undefined' && e.wheelDelta
            || typeof e.detail != 'undefined' && -e.detail;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Event = Event;

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Http; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Http
 * LevelRenderer 工具-Http
 *
 */
class Http {

    /**
     * Constructor: KTW.LevelRenderer.Tool.Http
     * 构造函数。
     *
     */
    constructor() {
        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Http"

    }

    /**
     * Method: get
     * get请求。
     *
     * Parameters:
     * url - {string|IHTTPGetOption}
     * onsuccess - {Function}
     * onerror - {Function}
     * opts - {Object} 额外参数
     *
     * Returns:
     * {Number} cos 值。
     */
    get(url, onsuccess, onerror) {
        if (typeof(url) === 'object') {
            var obj = url;
            url = obj.url;
            onsuccess = obj.onsuccess;
            onerror = obj.onerror;

        }
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    onsuccess && onsuccess(xhr.responseText);
                } else {
                    onerror && onerror();
                }
                xhr.onreadystatechange = new Function();
                xhr = null;
            }
        };

        xhr.send(null);
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Http = Http;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Math; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Math
 * LevelRenderer 工具-数学辅助类
 *
 */
class Math {



    /**
     * Constructor: KTW.LevelRenderer.Tool.Math
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: _radians
         * {Number} 角度与弧度转化参数
         */
        this._radians = window.Math.PI / 180;

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Math";
    }


    /**
     * APIMethod: sin
     * 正弦函数。
     *
     * Parameters:
     * angle - {Number} 弧度（角度）参数。
     * isDegrees - {Boolean} angle参数是否为角度计算，默认为false，angle为以弧度计量的角度。
     *
     * Returns:
     * {Number} sin 值。
     */
    sin(angle, isDegrees) {
        return window.Math.sin(isDegrees ? angle * this._radians : angle);
    }


    /**
     * APIMethod: cos
     * 正弦函数。
     *
     * Parameters:
     * angle - {Number} 弧度（角度）参数。
     * isDegrees - {Boolean} angle参数是否为角度计算，默认为false，angle为以弧度计量的角度。
     *
     * Returns:
     * {Number} cos 值。
     */
    cos(angle, isDegrees) {
        return window.Math.cos(isDegrees ? angle * this._radians : angle);
    }


    /**
     * APIMethod: degreeToRadian
     * 角度转弧度。
     *
     * Parameters:
     * angle - {Number} 角度参数。
     *
     * Returns:
     * {Number} 弧度值。
     */
    degreeToRadian(angle) {
        return angle * this._radians;
    }


    /**
     * APIMethod: radianToDegree
     * 弧度转角度。
     *
     * Parameters:
     * angle - {Number} 弧度参数。
     *
     * Returns:
     * {Number} 角度。
     */
    radianToDegree(angle) {
        return angle / this._radians;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Math = Math;

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Matrix; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Tool.Matrix
 * LevelRenderer 工具-3x2矩阵操作类
 *
 */
class Matrix {


    /**
     * Constructor: KTW.LevelRenderer.Tool.Matrix
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: ArrayCtor
         * {Object} 数组类型控制
         */
        this.ArrayCtor = typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;

        this.CLASS_NAME = "KTW.LevelRenderer.Tool.Matrix";
    }


    /**
     * APIMethod: create
     * 创建一个单位矩阵。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 单位矩阵。
     */
    create() {
        var ArrayCtor = this.ArrayCtor;

        var out = new ArrayCtor(6);
        this.identity(out);

        return out;
    }


    /**
     * APIMethod: identity
     * 设置矩阵为单位矩阵。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 单位矩阵。
     */
    identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = 0;
        out[5] = 0;
        return out;
    }


    /**
     * APIMethod: copy
     * 复制矩阵。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * m - {Float32Array|Array.<Number>} 原始矩阵。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 克隆矩阵。
     */
    copy(out, m) {
        out[0] = m[0];
        out[1] = m[1];
        out[2] = m[2];
        out[3] = m[3];
        out[4] = m[4];
        out[5] = m[5];
        return out;
    }


    /**
     * APIMethod: mul
     * 矩阵相乘。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * m1 - {Float32Array|Array.<Number>} 矩阵m1。
     * m2- {Float32Array|Array.<Number>} 矩阵m2。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 结果矩阵。
     */
    mul(out, m1, m2) {
        out[0] = m1[0] * m2[0] + m1[2] * m2[1];
        out[1] = m1[1] * m2[0] + m1[3] * m2[1];
        out[2] = m1[0] * m2[2] + m1[2] * m2[3];
        out[3] = m1[1] * m2[2] + m1[3] * m2[3];
        out[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
        out[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
        return out;
    }


    /**
     * APIMethod: translate
     * 平移变换。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * a - {Float32Array|Array.<Number>} 矩阵。
     * v- {Float32Array|Array.<Number>} 平移参数。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 结果矩阵。
     */
    translate(out, a, v) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4] + v[0];
        out[5] = a[5] + v[1];
        return out;
    }


    /**
     * APIMethod: rotate
     * 旋转变换。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * a - {Float32Array|Array.<Number>} 矩阵。
     * rad- {Float32Array|Array.<Number>} 旋转参数。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 结果矩阵。
     */
    rotate(out, a, rad) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];
        var st = Math.sin(rad);
        var ct = Math.cos(rad);

        out[0] = aa * ct + ab * st;
        out[1] = -aa * st + ab * ct;
        out[2] = ac * ct + ad * st;
        out[3] = -ac * st + ct * ad;
        out[4] = ct * atx + st * aty;
        out[5] = ct * aty - st * atx;
        return out;
    }


    /**
     * APIMethod: scale
     * 缩放变换。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * a - {Float32Array|Array.<Number>} 矩阵。
     * v- {Float32Array|Array.<Number>} 缩放参数。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 结果矩阵。
     */
    scale(out, a, v) {
        var vx = v[0];
        var vy = v[1];
        out[0] = a[0] * vx;
        out[1] = a[1] * vy;
        out[2] = a[2] * vx;
        out[3] = a[3] * vy;
        out[4] = a[4] * vx;
        out[5] = a[5] * vy;
        return out;
    }


    /**
     * APIMethod: invert
     * 求逆矩阵。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * a - {Float32Array|Array.<Number>} 矩阵。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 结果矩阵。
     */
    invert(out, a) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];

        var det = aa * ad - ab * ac;
        if (!det) {
            return null;
        }
        det = 1.0 / det;

        out[0] = ad * det;
        out[1] = -ab * det;
        out[2] = -ac * det;
        out[3] = aa * det;
        out[4] = (ac * aty - ad * atx) * det;
        out[5] = (ab * atx - aa * aty) * det;
        return out;
    }


    /**
     * APIMethod: mulVector
     * 矩阵左乘向量。
     *
     * Parameters:
     * out - {Float32Array|Array.<Number>} 单位矩阵。
     * a - {Float32Array|Array.<Number>} 矩阵。
     * v- {Float32Array|Array.<Number>} 缩放参数。
     *
     * Returns:
     * {Float32Array|Array.<Number>} 结果矩阵。
     */
    mulVector(out, a, v) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];

        out[0] = v[0] * aa + v[1] * ac + atx;
        out[1] = v[0] * ab + v[1] * ad + aty;

        return out;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Tool.Matrix = Matrix;

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicText; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SUtil__ = __webpack_require__(3);




/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicText
 * 文本。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicText({
 *         style: {
 *             text: 'Label',
 *             x: 100,
 *             y: 100,
 *             textFont: '14px Arial'
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 * (end)
 */
class SmicText extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 横坐标，必设参数。
     * y - {Number} 纵坐标，必设参数。
     * text - {String} 图形中的附加文本。默认值：""。
     * maxWidth - {Number} 最大宽度限制。默认值：null。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     */
    //打开接口 style


    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicText
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * APIProperty: type
         * {String} 图形类型.
         */
        this.type = 'smictext';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicText";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;

        super.destroy();
    }


    /**
     * APIMethod: brush
     * 笔触。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * isHighlight - {Boolean} 是否使用高亮属性。
     *
     */
    brush(ctx, isHighlight) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var style = this.style;
        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }

        ctx.save();
        this.doClip(ctx);

        this.setContext(ctx, style);

        // 设置transform
        this.setTransform(ctx);

        if (style.textFont) {
            ctx.font = style.textFont;
        }
        ctx.textAlign = style.textAlign || 'start';
        ctx.textBaseline = style.textBaseline || 'middle';

        var text = (style.text + '').split('\n');
        var lineHeight = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_area.getTextHeight('ZH', style.textFont);
        var rect = this.getRectNoRotation(style);
        // var x = style.x;
        var x = style.x + __OP[0];
        var y;
        if (style.textBaseline == 'top') {
            y = rect.y;
        } else if (style.textBaseline == 'bottom') {
            y = rect.y + lineHeight;
        } else {
            y = rect.y + lineHeight / 2;
        }
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //文本绘制
        for (var i = 0, l = text.length; i < l; i++) {
            //是否渲染矩形背景及颜色
            if (style.labelRect) {
                //+4,-2是为了让文字距边框左右边缘有点间隔
                ctx.fillRect(rect.x - 2, rect.y, rect.width + 4, rect.height);
                ctx.fillStyle = style.strokeColor;
                ctx.strokeRect(rect.x - 2, rect.y, rect.width + 4, rect.height);
                ctx.fillStyle = style.textColor;
            }

            switch (style.brushType) {
                case 'stroke':
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * i, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * i);
                            }
                        } else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height);
                            }
                        } else {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                        } else {
                            ctx.strokeText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
                    break;
                case 'both':
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        } else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        } else {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        } else {
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        }
                    }
                    break;
                default:
                    //fill or others
                    this.setCtxGlobalAlpha(ctx, "fill", style);
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * i, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * i);
                            }
                        } else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height);
                            }
                        } else {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            ctx.fillText(text[i], x, y, style.maxWidth);
                        } else {
                            ctx.fillText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
            }
            y += lineHeight;
        }

        ctx.restore();
        return;
    }


    /**
     * Method: getRect
     * 返回文字包围盒矩形
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        var left, top, right, bottom
        var tbg = this.getTextBackground(style, true);
        for (var i = 0, len = tbg.length; i < len; i++) {
            var poi = tbg[i];

            //用第一个点初始化
            if (i == 0) {
                left = poi[0];
                right = poi[0];
                top = poi[1];
                bottom = poi[1];
            } else {
                if (poi[0] < left) {
                    left = poi[0]
                }
                if (poi[0] > right) {
                    right = poi[0]
                }
                if (poi[1] < top) {
                    top = poi[1]
                }
                if (poi[1] > bottom) {
                    bottom = poi[1]
                }
            }
        }

        style.__rect = {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };

        return style.__rect;
    }


    /**
     * Method: getRectNoRotation
     * 返回忽略旋转和maxWidth时文字包围盒矩形
     */
    getRectNoRotation(style) {

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineHeight = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_area.getTextHeight('ZH', style.textFont);

        var width = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_area.getTextWidth(style.text, style.textFont);
        var height = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_area.getTextHeight(style.text, style.textFont);

        //处理文字位置，注：文本的绘制是由此 rect 决定
        var textX = style.x + __OP[0];                 // 默认start == left
        if (style.textAlign == 'end' || style.textAlign == 'right') {
            textX -= width;
        } else if (style.textAlign == 'center') {
            textX -= (width / 2);
        }

        var textY;
        if (style.textBaseline == 'top') {
            // textY = style.y;
            textY = style.y + __OP[1];
        } else if (style.textBaseline == 'bottom') {
            textY = (style.y + __OP[1]) - height;
        } else {
            // middle
            textY = (style.y + __OP[1]) - height / 2;
        }

        var isWidthChangeByMaxWidth = false;
        var widthBeforeChangeByMaxWidth;

        //处理 maxWidth
        if (style.maxWidth) {
            var maxWidth = parseInt(style.maxWidth);
            if (maxWidth < width) {
                widthBeforeChangeByMaxWidth = width;
                isWidthChangeByMaxWidth = true;
                width = maxWidth;
            }

            textX = style.x + __OP[0];
            if (style.textAlign == 'end' || style.textAlign == 'right') {
                textX -= width;
            } else if (style.textAlign == 'center') {
                textX -= (width / 2);
            }
        }

        //处理斜体字
        if (style.textFont) {
            var textFont = style.textFont;
            var textFontStr = textFont.toLowerCase()
            if (textFontStr.indexOf("italic") > -1) {
                if (widthBeforeChangeByMaxWidth && isWidthChangeByMaxWidth === true) {
                    width += (lineHeight / 3) * (width / widthBeforeChangeByMaxWidth);
                } else {
                    width += lineHeight / 3;
                }
            }
        }

        var rect = {
            x: textX,
            y: textY,
            width: width,
            height: height
        };

        return rect;
    }


    /**
     * Method: getTextBackground
     * 获取文本背景框范围
     *
     * Parameters:
     * style - {Object} 样式。
     * redo - {Boolean} 是否强制重新计算 textBackground。
     */
    getTextBackground(style, redo) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if ((!redo || redo === false) && style.__textBackground) {
            return style.__textBackground;
        }

        //不旋转时矩形框
        var rect = this.getRectNoRotation(style);

        //旋转中心点
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //背景框
        var background = [];

        if (style.textRotation && style.textRotation !== 0) {
            let textRotation = style.textRotation;
            let ltPoi = this.getRotatedLocation(rect.x, rect.y, ox, oy, textRotation);
            let rtPoi = this.getRotatedLocation(rect.x + rect.width, rect.y, ox, oy, textRotation);
            let rbPoi = this.getRotatedLocation(rect.x + rect.width, rect.y + rect.height, ox, oy, textRotation);
            let lbPoi = this.getRotatedLocation(rect.x, rect.y + rect.height, ox, oy, textRotation);

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        } else {
            let ltPoi = [rect.x, rect.y];
            let rtPoi = [rect.x + rect.width, rect.y];
            let rbPoi = [rect.x + rect.width, rect.y + rect.height];
            let lbPoi = [rect.x, rect.y + rect.height];

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        }

        style.__textBackground = background;

        return style.__textBackground;
    }


    /**
     * Method: getRotatedLocation
     * 获取一个点绕旋转中心顺时针旋转后的位置。（此方法用于屏幕坐标）
     *
     * Parameters:
     * x - {Number}  旋转点横坐标。
     * y - {Number}  旋转点纵坐标。
     * rx - {Number}  旋转中心点横坐标。
     * ry - {Number}  旋转中心点纵坐标。
     * angle - {Number} 旋转角度（度）。
     *
     * Returns:
     * {Array} 旋转后的坐标位置，长度为 2 的一维数组，数组第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    getRotatedLocation(x, y, rx, ry, angle) {
        var loc = new Array(), x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle;//顺时针旋转
        x0 = (x - rx) * Math.cos((angle / 180) * Math.PI) - (y - ry) * Math.sin((angle / 180) * Math.PI) + rx;
        y0 = (x - rx) * Math.sin((angle / 180) * Math.PI) + (y - ry) * Math.cos((angle / 180) * Math.PI) + ry;

        loc[0] = x0;
        loc[1] = -y0;
        return loc;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicText = SmicText;

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicCircle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);



/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicCircle
 * 圆形
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicCircle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 60,
 *             brushType: "both",
 *             color: "blue",
 *             strokeColor: "red",
 *             lineWidth: 3,
 *             text: "Circle"
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicCircle extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {number} 圆心x坐标,必设参数
     * y - {number} 圆心y坐标，必设参数
     * r - {number} 半径，必设参数
     * brushType - {string} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {string} 填充颜色,默认值"#000000"
     * strokeColor - {string} 描边颜色,默认值为'#000000'
     * lineCape — {string} 线帽样式，可以是 butt, round, square，默认是butt
     * lineWidth - {number} 描边宽度、默认是1
     * opacity - {number} 绘制透明度、默认是1，不透明
     * shadowBlur - {number} 阴影模糊度，大于0有效，默认是0
     * shadowColor - {string} 阴影颜色，默认是'#000000'
     * shadowOffsetX - {number} 阴影横向偏移，默认是0
     * shadowOffsetY - {number} 阴影纵向偏移，默认是0
     * text - {string} 图形中的附加文本，默认是0
     * textColor - {string} 文本颜色，默认是'#000000'
     * textFont - {string} 附加文本样式，eg:'bold 18px verdana'
     * textPosition - {string} 附加文本位置, 可以是 inside, left, right, top, bottom
     * textAlign - {string} 默认根据textPosition自动设置，附加文本水平对齐。可以是start, end, left, right, center
     * textBaseline {string} 默认根据textPosition自动设置，附加文本垂直对齐。可以是top, bottom, middle, alphabetic, hanging, ideographic
     */
    //打开接口 style


    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicCircle
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smiccircle';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicCircle";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 创建图形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y

        ctx.moveTo(x + style.r, y);
        ctx.arc(x, y, style.r, 0, Math.PI * 2, true);

        return true;
    }


    /**
     * APIMethod: getRect
     * 返回圆形包围盒矩形
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r = style.r;             // 圆r

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round(x - r - lineWidth / 2),
            y: Math.round(y - r - lineWidth / 2),
            width: r * 2 + lineWidth,
            height: r * 2 + lineWidth
        };

        return style.__rect;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicCircle = SmicCircle;

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicRectangle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);



/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicRectangle
 * 矩形。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicRectangle({
 *         style: {
 *             x: 0,
 *             y: 0,
 *             width: 100,
 *             height: 100,
 *             radius: 20
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 * (end)
 */
class SmicRectangle extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 左上角 x 坐标，必设参数。
     * y - {Number} 左上角 y 坐标，必设参数。
     * width - {Number} 宽度，必设参数。
     * height - {Number} 高度，必设参数。
     * radius - {Array} 矩形圆角，可以用数组分别指定四个角的圆角，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 则 radius为 [r1、r2、r3、r4 ]。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicRectangle
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型.
         */
        this.type = 'smicrectangle';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicRectangle";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: _buildRadiusPath
     * 创建矩形的圆角路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    _buildRadiusPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
        // r缩写为1         相当于 [1, 1, 1, 1]
        // r缩写为[1]       相当于 [1, 1, 1, 1]
        // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
        // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var width = style.width;
        var height = style.height;
        var r = style.radius;
        var r1;
        var r2;
        var r3;
        var r4;

        if (typeof r === 'number') {
            r1 = r2 = r3 = r4 = r;
        } else if (r instanceof Array) {
            if (r.length === 1) {
                r1 = r2 = r3 = r4 = r[0];
            } else if (r.length === 2) {
                r1 = r3 = r[0];
                r2 = r4 = r[1];
            } else if (r.length === 3) {
                r1 = r[0];
                r2 = r4 = r[1];
                r3 = r[2];
            } else {
                r1 = r[0];
                r2 = r[1];
                r3 = r[2];
                r4 = r[3];
            }
        } else {
            r1 = r2 = r3 = r4 = 0;
        }

        var total;
        if (r1 + r2 > width) {
            total = r1 + r2;
            r1 *= width / total;
            r2 *= width / total;
        }
        if (r3 + r4 > width) {
            total = r3 + r4;
            r3 *= width / total;
            r4 *= width / total;
        }
        if (r2 + r3 > height) {
            total = r2 + r3;
            r2 *= height / total;
            r3 *= height / total;
        }
        if (r1 + r4 > height) {
            total = r1 + r4;
            r1 *= height / total;
            r4 *= height / total;
        }
        ctx.moveTo(x + r1, y);
        ctx.lineTo(x + width - r2, y);
        r2 !== 0 && ctx.quadraticCurveTo(
            x + width, y, x + width, y + r2
        );
        ctx.lineTo(x + width, y + height - r3);
        r3 !== 0 && ctx.quadraticCurveTo(
            x + width, y + height, x + width - r3, y + height
        );
        ctx.lineTo(x + r4, y + height);
        r4 !== 0 && ctx.quadraticCurveTo(
            x, y + height, x, y + height - r4
        );
        ctx.lineTo(x, y + r1);
        r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
    }


    /**
     * APIMethod: _buildRadiusPath
     * 创建矩形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if (!style.radius) {
            ctx.moveTo(style.x + __OP[0], style.y + __OP[1]);
            ctx.lineTo((style.x + __OP[0]) + style.width, (style.y + __OP[1]));
            ctx.lineTo((style.x + __OP[0]) + style.width, (style.y + __OP[1]) + style.height);
            ctx.lineTo((style.x + __OP[0]), (style.y + __OP[1]) + style.height);
            ctx.lineTo(style.x + __OP[0], style.y + __OP[1]);
            // ctx.rect(style.x, style.y, style.width, style.height);
        } else {
            this._buildRadiusPath(ctx, style);
        }
        ctx.closePath();
        return;
    }


    /**
     * APIMethod: getRect
     * 计算返回矩形包围盒矩阵。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if (style.__rect) {
            return style.__rect;
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - lineWidth / 2),
            y: Math.round((style.y + __OP[1]) - lineWidth / 2),
            width: style.width + lineWidth,
            height: style.height + lineWidth
        };

        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicRectangle = SmicRectangle;

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicSector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SUtil__ = __webpack_require__(3);




/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicSector
 * 扇形。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicSector({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 60,
 *             r0: 30,
 *             startAngle: 0,
 *             endEngle: 180
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicSector extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 外圆半径，必设参数。
     * r0 - {Number} 内圆半径，指定后将出现内弧，同时扇边长度为`r - r0`。取值范围[0, r)，默认值：0。
     * startAngle - {Number} 起始角度，必设参数。取值范围[0, 360)。
     * endAngle - {Number} 结束角度，必设参数。取值范围(0, 360。
     * clockWise - {Boolean} 是否是顺时针。默认值：false。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style


    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicSector
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicsector';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicSector";
    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }

    /**
     * APIMethod: buildPath
     * 创建扇形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r0 = style.r0 || 0;     // 形内半径[0,r)
        var r = style.r;            // 扇形外半径(0,r]
        var startAngle = style.startAngle;          // 起始角度[0,360)
        var endAngle = style.endAngle;              // 结束角度(0,360]
        var clockWise = style.clockWise || false;

        startAngle = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.degreeToRadian(startAngle);
        endAngle = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.degreeToRadian(endAngle);

        if (!clockWise) {
            // 扇形默认是逆时针方向，Y轴向上
            // 这个跟arc的标准不一样，为了兼容echarts
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        var unitX = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.cos(startAngle);
        var unitY = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.sin(startAngle);
        ctx.moveTo(
            unitX * r0 + x,
            unitY * r0 + y
        );

        ctx.lineTo(
            unitX * r + x,
            unitY * r + y
        );

        ctx.arc(x, y, r, startAngle, endAngle, !clockWise);

        ctx.lineTo(
            __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.cos(endAngle) * r0 + x,
            __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.sin(endAngle) * r0 + y
        );

        if (r0 !== 0) {
            ctx.arc(x, y, r0, endAngle, startAngle, clockWise);
        }

        ctx.closePath();

        return;
    }

    /**
     * APIMethod: getRect
     * 返回扇形包围盒矩形
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var min0 = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_vector.create();
        var min1 = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_vector.create();
        var max0 = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_vector.create();
        var max1 = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_vector.create();

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r0 = style.r0 || 0;     // 形内半径[0,r)
        var r = style.r;            // 扇形外半径(0,r]
        var startAngle = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.degreeToRadian(style.startAngle);
        var endAngle = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.degreeToRadian(style.endAngle);
        var clockWise = style.clockWise;

        if (!clockWise) {
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        if (r0 > 1) {
            __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_computeBoundingBox.arc(
                x, y, r0, startAngle, endAngle, !clockWise, min0, max0
            );
        } else {
            min0[0] = max0[0] = x;
            min0[1] = max0[1] = y;
        }
        __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_computeBoundingBox.arc(
            x, y, r, startAngle, endAngle, !clockWise, min1, max1
        );

        __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_vector.min(min0, min0, min1);
        __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_vector.max(max0, max0, max1);
        style.__rect = {
            x: min0[0],
            y: min0[1],
            width: max0[0] - min0[0],
            height: max0[1] - min0[1]
        };
        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicSector = SmicSector;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankSymbol; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Graph__ = __webpack_require__(6);



/**
 * @class KTW.Feature.Theme.RankSymbol
 * @classdesc 符号专题要素基类。
 * @description 此类定义了符号专题要素基础模型，具体的图表模型通过继承此类，在子类中实现 assembleShapes 方法。
 * 符号专题要素模型采用了可视化图形大小自适应策略，用较少的参数控制着图表诸多图形，图表配置对象 <KTW.Feature.Theme.RankSymbol::setting> 的基础属性只有 5 个，
 * 它们控制着图表结构、值域范围、数据小数位等基础图表形态。构成图表的图形必须在图表结构里自适应大小。
 * 此类不可实例化，此类的可实例化子类必须实现 assembleShapes() 方法。
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.RankSymbol} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 *
 * @extends KTW.Feature.Theme.Graph
 *
 */
class RankSymbol extends __WEBPACK_IMPORTED_MODULE_1__Graph__["a" /* Graph */] {

    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
        /**
         * @member KTW.Feature.Theme.RankSymbol.prototype.setting -{Object}
         * @description 符号配置对象，该对象控制着图表的可视化显示。
         * 下面是此配置对象的 5 个基础可设属性：</br>
         * codomain - {Array<number>} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
         * XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
         * YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
         * dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。</br>
         * decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
         * 除了以上 5 个基础属性，此对象的可设属性在不同子类中有较大差异，不同子类中对同一属性的解释也可能不同。
         * 请在此类的子类中查看 setting 对象的可设属性和属性含义。
         */
        this.setting = null;
        // 配置项检测与赋值
        if (setting && setting.codomain) {
            this.setting = setting;
            this.DVBCodomain = this.setting.codomain;
        }
        this.CLASS_NAME = "KTW.Feature.Theme.RankSymbol";
    }

    /**
     * @function KTW.Feature.Theme.RankSymbol.prototype.destroy
     * @description 销毁专题要素。
     */
    destroy() {
        this.setting = null;
        super.destroy();
    }


    /**
     * @function KTW.Feature.Theme.RankSymbol.prototype.initBaseParameter
     * @description 初始化专题要素（图形）基础参数。
     * 在调用此方法前，此类的图表模型相关属性都是不可用的 ，此方法在 assembleShapes 函数中调用。
     * 调用此函数关系到 setting 对象的以下属性</br>
     * codomain - {Array<number>} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
     * XOffset - {number} 专题要素（图形）在 X 方向上的偏移值，单位像素。</br>
     * YOffset - {number} 专题要素（图形）在 Y 方向上的偏移值，单位像素。</br>
     * dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，它是指图形框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。</br>
     * decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
     * @returns {boolean} 初始化参数是否成功。
     */
    initBaseParameter() {
        // 参数初始化是否成功
        var isSuccess = true;

        // setting 属性是否已成功赋值
        if (!this.setting) {
            return false;
        }
        var sets = this.setting;

        // 图表偏移
        if (sets.XOffset) {
            this.XOffset = sets.XOffset;
        }
        if (sets.YOffset) {
            this.YOffset = sets.YOffset;
        }
        this.XOffset = sets.XOffset ? sets.XOffset : 0;
        this.YOffset = sets.YOffset ? sets.YOffset : 0;

        // 其他默认值
        this.origonPoint = [];
        this.chartBox = [];
        this.dataViewBox = [];

        this.DVBParameter = sets.dataViewBoxParameter ? sets.dataViewBoxParameter : [0, 0, 0, 0];

        this.DVBOrigonPoint = [];
        this.DVBCenterPoint = [];
        this.origonPointOffset = [];

        // 图表位置
        this.resetLocation();

        // 专题要素宽度 w
        var w = this.width;
        // 专题要素高度 h
        var h = this.height;
        // 专题要素像素位置 loc
        var loc = this.location;

        // 专题要素像素位置 loc
        this.origonPoint = [loc[0] - w / 2, loc[1] - h / 2];
        // 专题要素原点（左上角）
        var op = this.origonPoint;

        // 图表框（[left, bottom, right, top]）
        this.chartBox = [op[0], op[1] + h, op[0] + w, op[1]];
        // 图表框
        var cb = this.chartBox;

        // 数据视图框参数，它是图表框各方向对应的内偏距
        var dbbP = this.DVBParameter;
        // 数据视图框 （[left, bottom, right, top]）
        this.dataViewBox = [cb[0] + dbbP[0], cb[1] - dbbP[1], cb[2] - dbbP[2], cb[3] + dbbP[3]];
        // 数据视图框
        var dvb = this.dataViewBox;
        //检查数据视图框是否合法
        if (dvb[0] >= dvb[2] || dvb[1] <= dvb[3]) {
            return false;
        }

        // 数据视图框原点
        this.DVBOrigonPoint = [dvb[0], dvb[3]];
        // 数据视图框宽度
        this.DVBWidth = Math.abs(dvb[2] - dvb[0]);
        // 数据视图框高度
        this.DVBHeight = Math.abs(dvb[1] - dvb[3]);
        // 数据视图框中心点
        this.DVBCenterPoint = [this.DVBOrigonPoint[0] + this.DVBWidth / 2, this.DVBOrigonPoint[1] + this.DVBHeight / 2];

        // 数据视图框原点与图表框的原点偏移量
        this.origonPointOffset = [this.DVBOrigonPoint[0] - op[0], this.DVBOrigonPoint[1] - op[1]];

        return isSuccess;
    }
};

//KTW.Client.RankSymbol = RankSymbol;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.RankSymbol = RankSymbol;

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Render; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Painter__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Handler__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Animation__ = __webpack_require__(46);
/**
 * @private
 * @class KTW.LevelRenderer.Render
 * Render 接口类，对外可用的所有接口都在这里。内部使用
 * 非 get 接口统一返回 this 对象，支持链式调用。
 *
 */









class Render {


    /*
     * 构造函数。
     *
     * Parameters:
     * id - {String} 唯一标识。
     * dom - {HTMLElement} Dom 对象。
     */
    constructor(id, dom) {
        /**
         * Property: id
         * {String}  唯一标识。
         *
         */
        this.id = id;

        /**
         * Property: storage
         * {<KTW.LevelRenderer.Storage>} 图形仓库对象。
         *
         */
        this.storage = new __WEBPACK_IMPORTED_MODULE_2__Storage__["a" /* Storage */]();

        /**
         * Property: painter
         * {<Painter>} 绘制器对象。
         *
         */
        this.painter = new __WEBPACK_IMPORTED_MODULE_3__Painter__["b" /* Painter */](dom, this.storage);

        /**
         * Property: handler
         * {<KTW.LevelRenderer.Handler>} 事件处理对象。
         *
         */
        this.handler = new __WEBPACK_IMPORTED_MODULE_4__Handler__["a" /* Handler */](dom, this.storage, this.painter);

        /**
         * Property: animatingElements
         * {Array} 动画控制数组。
         *
         */
        this.animatingElements = [];

        /**
         * Property: animation
         * {<SuperMap.LevelRenderer.animation.Animation>} 动画对象。
         *
         */
        this.animation = new __WEBPACK_IMPORTED_MODULE_5__Animation__["a" /* Animation */]({
            stage: {
                update: Render.getFrameCallback(this)
            }
        });

        /**
         * Property: _needsRefreshNextFrame
         * {Boolean} 是否需要刷新下一帧。
         *
         */
        this._needsRefreshNextFrame = false;
        this.animation.start();
        this.CLASS_NAME = "KTW.LevelRenderer.Render";

    }

    /**
     * Method: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.id = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;
        this.animatingElements = null;
        this.animation = null;
        this._needsRefreshNextFrame = null;
    }

    /**
     * APIMethod: getId
     * 获取实例唯一标识。
     *
     * Returns:
     * {String} 实例唯一标识。
     */
    getId() {
        return this.id;
    }

    /**
     * APIMethod: addShape
     * 添加图形形状到根节点。
     *
     * Parameters:
     * shape - {<KTW.LevelRenderer.Shape>} 图形对象，可用属性全集，详见各 shape。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    addShape(shape) {
        this.storage.addRoot(shape);
        return this;
    }

    /**
     * APIMethod: addGroup
     * 添加组到根节点。
     *
     * (code)
     * //添加组到根节点例子
     * var render = new KTW.LevelRenderer.Render("Render",document.getElementById('lRendertest'));
     * render.clear();
     * var g = new KTW.LevelRenderer.Group();
     * g.addChild(new KTW.LevelRenderer.Shape.Circle({
     *     style: {
     *         x: 100,
     *         y: 100,
     *         r: 20,
     *         brushType: 'fill'
     *     }
     * }));
     * render.addGroup(g);
     * render.render();
     * (end)
     *
     * Parameters:
     * group - {<KTW.LevelRenderer.Group>} 组对象。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    addGroup(group) {
        this.storage.addRoot(group);
        return this;
    }

    /**
     * APIMethod: delShape
     * 从根节点删除图形形状。
     *
     * Parameters:
     * shapeId - {String} 图形对象唯一标识。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    delShape(shapeId) {
        this.storage.delRoot(shapeId);
        return this;
    }

    /**
     * APIMethod: delGroup
     * 从根节点删除组。
     *
     * Parameters:
     * groupId - {String} 组对象唯一标识。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    delGroup(groupId) {
        this.storage.delRoot(groupId);
        return this;
    }

    /**
     * Method: modShape
     * 修改图形形状。
     *
     * Parameters:
     * shapeId - {String} 图形对象唯一标识。
     * shape - {<KTW.LevelRenderer.Shape>} 图形对象。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    modShape(shapeId, shape) {
        this.storage.mod(shapeId, shape);
        return this;
    }

    /**
     * Method: modGroup
     * 修改组。
     *
     * Parameters:
     * groupId - {String} 组对象唯一标识。
     * group - {<KTW.LevelRenderer.Group>} 组对象。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    modGroup(groupId, group) {
        this.storage.mod(groupId, group);
        return this;
    }

    /**
     * Method: modLayer
     * 修改指定 zlevel 的绘制配置项。
     *
     * Parameters:
     * zLevel - {String} 组对象唯一标识。
     * config - {Object} 配置对象。可用属性如下：
     *
     * Symbolizer properties:
     * clearColor - {String} 每次清空画布的颜色。默认值：0。
     * motionBlur - {Boolean} 是否开启动态模糊。默认值：false。
     * lastFrameAlpha - {Number}  在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显。默认值：0.7。
     * position - {Array{Number}}  层的平移。
     * rotation - {Array{Number}}  层的旋转。
     * scale - {Array{Number}}  层的缩放。
     * zoomable - {Boolean} 层是否支持鼠标缩放操作。默认值：false。
     * panable - {Boolean} 层是否支持鼠标平移操作。默认值：false。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    modLayer(zLevel, config) {
        this.painter.modLayer(zLevel, config);
        return this;
    }

    /**
     * APIMethod: addHoverShape
     * 添加额外高亮层显示，仅提供添加方法，每次刷新后高亮层图形均被清空。
     *
     * Parameters:
     * shape - {<KTW.LevelRenderer.Shape>} 图形对象。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    addHoverShape(shape) {
        this.storage.addHover(shape);
        return this;
    }

    /**
     * APIMethod: render
     * 渲染。
     *
     * Parameters:
     * callback - {Function} 渲染结束后回调函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    render(callback) {
        this.painter.render(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * APIMethod: refresh
     * 视图更新。
     *
     * Parameters:
     * callback - {Function} 视图更新后回调函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    refresh(callback) {
        this.painter.refresh(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * APIMethod: refreshNextFrame
     * 标记视图在浏览器下一帧需要绘制。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    refreshNextFrame() {
        this._needsRefreshNextFrame = true;
        return this;
    }

    /**
     * APIMethod: refreshHover
     * 绘制（视图更新）高亮层。
     *
     * Parameters:
     * callback - {Function} 视图更新后回调函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    refreshHover(callback) {
        this.painter.refreshHover(callback);
        return this;
    }

    /**
     * APIMethod: refreshShapes
     * 视图更新。
     *
     * Parameters:
     * shapeList - {Array<KTW.LevelRenderer.Shape>} 需要更新的图形列表。
     * callback - {Function} 视图更新后回调函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    refreshShapes(shapeList, callback) {
        this.painter.refreshShapes(shapeList, callback);
        return this;
    }

    /**
     * APIMethod: resize
     * 调整视图大小。
     *
     * Returns:
     * {<SuperMap.LevelRenderer.Render>} this。
     */
    resize() {
        this.painter.resize();
        return this;
    }

    /**
     * APIMethod: animate
     * 动画。
     *
     * (code)
     *     zr.animate(circle.id, 'style', false)
     *         .when(1000, {x: 10} )
     *         .done(function(){ // Animation done })
     *         .start()
     * (end)
     *
     * Parameters:
     * el - {Array{<KTW.LevelRenderer.Shape>/<KTW.LevelRenderer.Group>}} 动画对象。
     * path - {String} 需要添加动画的属性获取路径，可以通过 a.b.c 来获取深层的属性。若传入对象为<SuperMap.LevelRenderer.Group>,path需为空字符串。
     * loop - {Function} 动画是否循环。
     *
     * Returns:
     * {<KTW.LevelRenderer.animation.Animator>} Animator。
     */
    animate(el, path, loop) {
        if (typeof(el) === 'string') {
            el = this.storage.get(el);
        }
        if (el) {
            var target;
            if (path) {
                var pathSplitted = path.split('.');
                var prop = el;
                for (var i = 0, l = pathSplitted.length; i < l; i++) {
                    if (!prop) {
                        continue;
                    }
                    prop = prop[pathSplitted[i]];
                }
                if (prop) {
                    target = prop;
                }
            } else {
                target = el;
            }

            if (!target) {
                return;
            }

            var animatingElements = this.animatingElements;
            if (typeof el.__aniCount === 'undefined') {
                // 正在进行的动画记数
                el.__aniCount = 0;
            }
            if (el.__aniCount === 0) {
                animatingElements.push(el);
            }
            el.__aniCount++;

            return this.animation.animate(target, {loop: loop})
                .done(function () {
                    el.__aniCount--;
                    if (el.__aniCount === 0) {
                        // 从animatingElements里移除
                        var idx = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["u" /* indexOf */])(animatingElements, el);
                        animatingElements.splice(idx, 1);
                    }
                });
        } 
    }

    /**
     * APIMethod: clearAnimation
     * 停止所有动画。
     *
     */
    clearAnimation() {
        this.animation.clear();
    }

    /**
     * APIMethod: getWidth
     * 获取视图宽度。
     *
     * Returns:
     * {Number} 视图宽度。
     */
    getWidth() {
        return this.painter.getWidth();
    }

    /**
     * APIMethod: getHeight
     * 获取视图高度。
     *
     * Returns:
     * {Number} 视图高度。
     */
    getHeight() {
        return this.painter.getHeight();
    }

    /**
     * APIMethod: toDataURL
     * 图像导出。
     *
     * Parameters:
     * type - {string} 类型。
     * backgroundColor - {string} 背景色，默认值："#FFFFFF"。
     * args - {string} 参数。
     *
     * Returns:
     * {String} 图片的 Base64 url。
     */
    toDataURL(type, backgroundColor, args) {
        return this.painter.toDataURL(type, backgroundColor, args);
    }

    /**
     * APIMethod: shapeToImage
     * 将常规 shape 转成 image shape。
     *
     * Parameters:
     * e - {<SuperMap.LevelRenderer.Shape>} 图形。
     * width - {Number} 宽度。
     * height - {Number} 高度。
     *
     * Returns:
     * {Object} image shape。
     */
    shapeToImage(e, width, height) {
        var id = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])();
        return this.painter.shapeToImage(id, e, width, height);
    }

    /**
     * APIMethod: on
     * 事件绑定。
     *
     * Parameters:
     * eventName - {String} 事件名称。
     * eventHandler - {Function} 响应函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    on(eventName, eventHandler) {
        this.handler.on(eventName, eventHandler);
        return this;
    }

    /**
     * APIMethod: un
     * 事件解绑定，参数为空则解绑所有自定义事件。
     *
     * Parameters:
     * eventName - {String} 事件名称。
     * eventHandler - {Function} 响应函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    un(eventName, eventHandler) {
        this.handler.un(eventName, eventHandler);
        return this;
    }

    /**
     * APIMethod: trigger
     * 事件触发。
     *
     * Parameters:
     * eventName - {String} 事件名称，resize，hover，drag，etc。
     * event - {event} event dom事件对象。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    trigger(eventName, event) {
        this.handler.trigger(eventName, event);
        return this;
    }

    /**
     * APIMethod: clear
     * 清除当前 Render 下所有类图的数据和显示，clear 后 MVC 和已绑定事件均还存在在，Render 可用。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    clear() {
        this.storage.delRoot();
        this.painter.clear();
        return this;
    }

    /**
     * APIMethod: dispose
     * 释放当前 Render 实例（删除包括 dom，数据、显示和事件绑定），dispose后 Render 不可用。
     *
     */
    dispose() {
        this.animation.stop();

        this.clear();
        this.storage.dispose();
        this.painter.dispose();
        this.handler.dispose();

        this.animation = null;
        this.animatingElements = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;

    }

    // SMIC-方法扩展 - start
    /**
     * APIMethod: updateHoverShapes
     * 更新设置显示高亮图层。
     *
     * Parameters:
     * shapes - {Array<KTW.LevelRenderer.Shape>} 图形数组。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    updateHoverShapes(shapes) {
        this.painter.updateHoverLayer(shapes);
        return this;
    }

    /**
     * APIMethod: getAllShapes
     * 获取所有图形。
     *
     * Returns:
     * {Array<KTW.LevelRenderer.Shape>} 图形数组。
     */
    getAllShapes() {
        return this.storage._shapeList;
    }

    /**
     * APIMethod: clearAll
     *  清除高亮和图形图层。
     *
     * Returns:
     * {<KTW.LevelRenderer.Render>} this。
     */
    clearAll() {
        this.clear();
        this.painter.clearHover();
        return this;
    }

    /**
     * APIMethod: getHoverOne
     * 获取单个高亮图形，当前鼠标对应。
     *
     * Returns:
     * {<KTW.LevelRenderer.Shape>} 高亮图形。
     */
    getHoverOne() {
        return this.handler.getLastHoverOne();
    }

    static getFrameCallback(renderInstance) {
        return function () {
            var animatingElements = renderInstance.animatingElements;

            //animatingElements instanceof Array 临时解决 destory 报错
            if (animatingElements instanceof Array) {
                for (var i = 0, l = animatingElements.length; i < l; i++) {
                    renderInstance.storage.mod(animatingElements[i].id);
                }

                if (animatingElements.length || renderInstance._needsRefreshNextFrame) {
                    renderInstance.refresh();
                }
            }
        };
    }

    // SMIC-方法扩展 - end


};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Render = Render;

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Storage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Group__ = __webpack_require__(43);





/**
 * @private
 * @class  KTW.LevelRenderer.Storage
 * 内容（图像）仓库 (M) 。
 */
class Storage {
    /**
     * Constructor: KTW.LevelRenderer.Storage
     * 构造函数。
     */
    constructor() {
        /**
         * Property: _elements
         * {Object} 所有常规形状，id 索引的 map。
         *
         */
        this._elements = {};

        /**
         * Property: _hoverElements
         * {Array} 高亮层形状，不稳定，动态增删，数组位置也是 z 轴方向，靠前显示在下方。
         *
         */
        this._hoverElements = [];

        /**
         * Property: _roots
         * {Array} _roots。
         *
         */
        this._roots = [];

        /**
         * Property: _shapeList
         * {Array}  _shapeList。
         *
         */
        this._shapeList = [];

        /**
         * Property: _shapeListOffset
         * {Number}  _shapeListOffset。默认值：0。
         *
         */
        this._shapeListOffset = 0;

        this.CLASS_NAME = "KTW.LevelRenderer.Storage";
    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._shapeList = null;
        this._shapeListOffset = null;
    }

    /**
     * APIMethod: iterShape
     * 遍历迭代器。
     *
     * Parameters:
     * fun - {Function} 迭代回调函数，return true终止迭代。
     * option - {Object} 迭代参数，缺省为仅降序遍历普通层图形。可设属性如下：
     *
     * Symbolizer properties:
     * hover - {Boolean} 是否是高亮层图形。默认值：true。
     * normal - {String} 是否是普通层图形，迭代时是否指定及z轴顺序。可设值：'down' ，'up'；默认值："down"。
     * update - {Boolean} 是否在迭代前更新形状列表。默认值：false。
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    iterShape(fun, option) {
        if (!option) {
            var defaultIterateOption = {
                hover: false,
                normal: 'down',
                update: false
            };
            option = defaultIterateOption;
        }

        if (option.hover) {
            // 高亮层数据遍历
            for (var i = 0, l = this._hoverElements.length; i < l; i++) {
                var el = this._hoverElements[i];
                el.updateTransform();
                if (fun(el)) {
                    return this;
                }
            }
        }

        if (option.update) {
            this.updateShapeList();
        }

        // 遍历: 'down' | 'up'
        switch (option.normal) {
            case 'down':
            {
                // 降序遍历，高层优先
                let l = this._shapeList.length;
                while (l--) {
                    if (fun(this._shapeList[l])) {
                        return this;
                    }
                }
                break;
            }
            // case 'up':
            default:
            {
                // 升序遍历，底层优先
                for (let i = 0, l = this._shapeList.length; i < l; i++) {
                    if (fun(this._shapeList[i])) {
                        return this;
                    }
                }
                break;
            }
        }

        return this;
    }

    /**
     * APIMethod: getHoverShapes
     * 返回 hover 层的形状数组。
     *
     * Parameters:
     * update - {Boolean} 是否在返回前更新图形的变换。默认值：false。
     *
     * Returns:
     * {Array<KTW.LevelRenderer.Shape>} 图形数组。
     */
    getHoverShapes(update) {
        // hoverConnect
        var hoverElements = [], len = this._hoverElements.length;
        for (let i = 0; i < len; i++) {
            hoverElements.push(this._hoverElements[i]);
            var target = this._hoverElements[i].hoverConnect;
            if (target) {
                var shape;
                target = target instanceof Array ? target : [target];
                for (var j = 0, k = target.length; j < k; j++) {
                    shape = target[j].id ? target[j] : this.get(target[j]);
                    if (shape) {
                        hoverElements.push(shape);
                    }
                }
            }
        }
        hoverElements.sort(Storage.shapeCompareFunc);
        if (update) {
            for (let i = 0, l = hoverElements.length; i < l; i++) {
                hoverElements[i].updateTransform();
            }
        }
        return hoverElements;
    }

    /**
     * APIMethod: getShapeList
     * 返回所有图形的绘制队列。
     *
     * Parameters:
     * update - {Boolean} 是否在返回前更新该数组。默认值：false。  详见：<KTW.LevelRenderer.Shape> updateShapeList。
     *
     * Returns:
     * {<KTW.LevelRenderer.Shape>} 图形。
     */
    getShapeList(update) {
        if (update) {
            this.updateShapeList();
        }
        return this._shapeList;
    }

    /**
     * APIMethod: updateShapeList
     * 更新图形的绘制队列。
     * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
     * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列。
     */
    updateShapeList() {
        this._shapeListOffset = 0;
        var rootsLen = this._roots.length;
        for (let i = 0; i < rootsLen; i++) {
            let root = this._roots[i];
            this._updateAndAddShape(root);
        }
        this._shapeList.length = this._shapeListOffset;

        var shapeListLen = this._shapeList.length;
        for (let i = 0; i < shapeListLen; i++) {
            this._shapeList[i].__renderidx = i;
        }

        this._shapeList.sort(Storage.shapeCompareFunc);
    }

    /**
     * Method: _updateAndAddShape
     * 跟新并添加图形。
     */
    _updateAndAddShape(el, clipShapes) {
        if (el.ignore) {
            return;
        }

        el.updateTransform();

        if (el.type == 'group') {

            if (el.clipShape) {
                // clipShape 的变换是基于 group 的变换
                el.clipShape.parent = el;
                el.clipShape.updateTransform();

                // PENDING 效率影响
                if (clipShapes) {
                    clipShapes = clipShapes.slice();
                    clipShapes.push(el.clipShape);
                } else {
                    clipShapes = [el.clipShape];
                }
            }

            for (var i = 0; i < el._children.length; i++) {
                var child = el._children[i];

                // Force to mark as dirty if group is dirty
                child.__dirty = el.__dirty || child.__dirty;

                this._updateAndAddShape(child, clipShapes);
            }

            // Mark group clean here
            el.__dirty = false;

        } else {
            el.__clipShapes = clipShapes;

            this._shapeList[this._shapeListOffset++] = el;
        }
    }

    /**
     * APIMethod: mod
     * 修改图形(Shape)或者组(Group)。
     *
     * Parameters:
     * elId - {String} 唯一标识。
     * params - {Object} 参数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    mod(elId, params) {
        var el = this._elements[elId];
        if (el) {

            el.modSelf();

            if (params) {
                // 如果第二个参数直接使用 shape
                // parent, _storage, __startClip 三个属性会有循环引用
                if (params.parent || params._storage || params.__startClip) {
                    var target = {};
                    for (var name in params) {
                        if (
                            name == 'parent'
                            || name == '_storage'
                            || name == '__startClip'
                        ) {
                            continue;
                        }
                        if (params.hasOwnProperty(name)) {
                            target[name] = params[name];
                        }
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["z" /* merge */])(el, target, true);
                } else {
                    Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["z" /* merge */])(el, params, true);
                }
            }
        }

        return this;
    }

    /**
     * APIMethod: drift
     * 移动指定的图形(Shape)的位置。
     *
     * Parameters:
     * shapeId - {String} 唯一标识。
     * dx - {Number}
     * dy - {Number}
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    drift(shapeId, dx, dy) {
        var shape = this._elements[shapeId];
        if (shape) {
            shape.needTransform = true;
            if (shape.draggable === 'horizontal') {
                dy = 0;
            } else if (shape.draggable === 'vertical') {
                dx = 0;
            }
            if (!shape.ondrift // ondrift
                // 有onbrush并且调用执行返回false或undefined则继续
                || (shape.ondrift && !shape.ondrift(dx, dy))
            ) {
                shape.drift(dx, dy);
            }
        }

        return this;
    }

    /**
     * APIMethod: addHover
     * 添加高亮层数据。
     *
     * Parameters:
     * shape - {<KTW.LevelRenderer.Shape>} 图形。
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    addHover(shape) {
        shape.updateNeedTransform();
        this._hoverElements.push(shape);
        return this;
    }

    /**
     * APIMethod: delHover
     * 清空高亮层数据。
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    delHover() {
        this._hoverElements = [];
        return this;
    }

    /**
     * APIMethod: hasHoverShape
     * 是否有图形在高亮层里。
     *
     * Returns:
     * {Boolean} 是否有图形在高亮层里。
     */
    hasHoverShape() {
        return this._hoverElements.length > 0;
    }

    /**
     * APIMethod: addRoot
     * 添加图形(Shape)或者组(Group)到根节点。
     *
     * Parameters:
     * el - {<KTW.LevelRenderer.Shape>/<KTW.LevelRenderer.Group>} 图形。
     *
     */
    addRoot(el) {
        if (el instanceof __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* Group */]) {
            el.addChildrenToStorage(this);
        }

        this.addToMap(el);
        this._roots.push(el);
    }

    /**
     * APIMethod: delRoot
     * 删除指定的图形(Shape)或者组(Group)。
     *
     * Parameters:
     * elId - {Array{String}} 删除图形(Shape)或者组(Group)的 id 数组。如果为空清空整个Storage。
     *
     */
    delRoot(elId) {
        if (typeof(elId) == 'undefined') {
            // 不指定elId清空
            for (var i = 0; i < this._roots.length; i++) {
                var root = this._roots[i];

                if (root instanceof __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* Group */]) {
                    root.delChildrenFromStorage(this);
                }
            }

            this._elements = {};
            this._hoverElements = [];
            this._roots = [];

            return;
        }

        if (elId instanceof Array) {
            var elIdLen = elId.length;
            for (let i = 0; i < elIdLen; i++) {
                this.delRoot(elId[i]);
            }
            return;
        }

        var el;
        if (typeof(elId) == 'string') {
            el = this._elements[elId];
        } else {
            el = elId;
        }

        var idx = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["u" /* indexOf */])(this._roots, el);
        if (idx >= 0) {
            this.delFromMap(el.id);
            this._roots.splice(idx, 1);
            if (el instanceof __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* Group */]) {
                el.delChildrenFromStorage(this);
            }
        }
    }

    /**
     * APIMethod: addToMap
     * 添加图形到 map。
     *
     * Parameters:
     * el - {<KTW.LevelRenderer.Shape>} 图形。
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    addToMap(el) {
        if (el instanceof __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* Group */]) {
            el._storage = this;
        }
        el.modSelf();

        this._elements[el.id] = el;

        return this;
    }

    /**
     * APIMethod: get
     * 获取指定图形。
     *
     * Parameters:
     * elId - {String} 图形 id。
     *
     * Returns:
     * {<KTW.LevelRenderer.Shape>} 图形。
     */
    get(elId) {
        return this._elements[elId];
    }

    /**
     * APIMethod: delFromMap
     * 从 map 中删除指定图形。
     *
     * Parameters:
     * elId - {String} 图形id。
     *
     * Returns:
     * {<KTW.LevelRenderer.Storage>} this。
     */
    delFromMap(elId) {
        var el = this._elements[elId];
        if (el) {
            delete this._elements[elId];

            if (el instanceof __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* Group */]) {
                el._storage = null;
            }
        }

        return this;
    }

    /**
     * APIMethod: dispose
     * 清空并且释放 Storage。
     */
    dispose() {
        this._elements = null;
        // this._renderList = null;
        this._roots = null;
        this._hoverElements = null;
    }

    static shapeCompareFunc(a, b) {
        if (a.zlevel == b.zlevel) {
            if (a.z == b.z) {
                return a.__renderidx - b.__renderidx;
            }
            return a.z - b.z;
        }
        return a.zlevel - b.zlevel;
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Storage = Storage;

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Group; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Eventful__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Transformable__ = __webpack_require__(12);







/**
 * @private
 * @class  KTW.LevelRenderer.Group
 * Group 是一个容器，可以插入子节点，Group 的变换也会被应用到子节点上。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Transformable>
 *
 * (code)
 *     var g = new KTW.LevelRenderer.Group();
 *     var Circle = new KTW.LevelRenderer.Shape.Circle();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.addChild(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *             brushType: 'fill'
 *         }
 *     }));
 *     LR.addGroup(g);
 * (end)
 */

class Group extends Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["A" /* mixin */])(__WEBPACK_IMPORTED_MODULE_2__Eventful__["a" /* Eventful */], __WEBPACK_IMPORTED_MODULE_3__Transformable__["a" /* Transformable */]) {

    /**
     * Constructor: KTW.LevelRenderer.Group
     * 构造函数。
     *
     * Parameters:
     * options - {Array} Group 的配置（options）项，可以是 Group 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options)
        options = options || {};
        /**
         * APIProperty: id
         * {String} Group 的唯一标识。
         */
        this.id = null;

        /**
         * APIProperty: type
         * {Readonly{String}} 类型，默认值：'group'。
         */
        this.type = 'group';

        //http://www.w3.org/TR/2dcontext/#clipping-region
        /**
         * APIProperty: clipShape
         * {String} 用于裁剪的图形(shape)，所有 Group 内的图形在绘制时都会被这个图形裁剪，该图形会继承 Group 的变换。
         *
         */
        this.clipShape = null;

        /**
         * Property: _children
         * {Array}
         *
         */
        this._children = [];

        /**
         * Property: _storage
         * {Array}
         *
         */
        this._storage = null;

        /**
         * Property: __dirty
         * {Boolean} 默认值：true。
         *
         */
        this.__dirty = true;

        /**
         * APIProperty: ignore
         * {Boolean} 是否忽略该 Group 及其所有子节点。默认值：false。
         *
         */
        this.ignore = false;
        Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["m" /* extend */])(this, options);
        this.id = this.id || Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])();
        this.CLASS_NAME = "KTW.LevelRenderer.Group";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.id = null;
        this.type = null;
        this.clipShape = null;
        this._children = null;
        this._storage = null;
        this.__dirty = null;
        this.ignore = null;

        super.destroy();
    }


    /**
     * Method: children
     * 复制并返回一份新的包含所有儿子节点的数组。
     *
     * Returns:
     * {Array<KTW.LevelRenderer.Shape>} 图形数组。
     */
    children() {
        return this._children.slice();
    }


    /**
     * APIMethod: childAt
     * 获取指定 index 的儿子节点。
     *
     * Parameters:
     * idx - {Number} 节点索引。
     *
     * Returns:
     * {<KTW.LevelRenderer.Shape>} 图形。
     */
    childAt(idx) {
        return this._children[idx];
    }


    /**
     * APIMethod: addChild
     * 添加子节点，可以是 Shape 或者 Group。
     *
     * Parameters:
     * child - {<KTW.LevelRenderer.Shape>/<KTW.LevelRenderer.Group>} 节点图形。
     *
     */
    // TODO Type Check
    addChild(child) {
        if (child == this) {
            return;
        }

        if (child.parent == this) {
            return;
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this._children.push(child);
        child.parent = this;

        if (this._storage && this._storage !== child._storage) {

            this._storage.addToMap(child);

            if (child instanceof Group) {
                child.addChildrenToStorage(this._storage);
            }
        }
    }


    /**
     * APIMethod: removeChild
     * 移除子节点。
     *
     * Parameters:
     * child - {<KTW.LevelRenderer.Shape>} 需要移除的子节点图形。
     *
     */
    removeChild(child) {
        var idx = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["u" /* indexOf */])(this._children, child);

        this._children.splice(idx, 1);
        child.parent = null;

        if (this._storage) {

            this._storage.delFromMap(child.id);

            if (child instanceof Group) {
                child.delChildrenFromStorage(this._storage);
            }
        }
    }


    /**
     * APIMethod: eachChild
     * 遍历所有子节点。
     *
     * Parameters:
     * cb - {Function} 回调函数。
     * context - {Object} 上下文。
     *
     */
    eachChild(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }
        }
    }


    /**
     * APIMethod: traverse
     * 深度优先遍历所有子孙节点。
     *
     * Parameters:
     * cb - {Function} 回调函数。
     * context - {Object} 上下文。
     *
     */
    traverse(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }

            if (child.type === 'group') {
                child.traverse(cb, context);
            }
        }
    }


    /**
     * Method: addChildrenToStorage
     * 把子图形添加到仓库。
     *
     * Parameters:
     * storage - {<KTW.LevelRenderer.Storage>} 图形仓库。
     *
     */
    addChildrenToStorage(storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.addToMap(child);
            if (child.type === 'group') {
                child.addChildrenToStorage(storage);
            }
        }
    }


    /**
     * Method: delChildrenFromStorage
     * 从仓库把子图形删除。
     *
     * Parameters:
     * storage - {<KTW.LevelRenderer.Storage>} 图形仓库。
     *
     */
    delChildrenFromStorage(storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.delFromMap(child.id);
            if (child.type === 'group') {
                child.delChildrenFromStorage(storage);
            }
        }
    }


    /**
     * Method: modSelf。
     * 是否  修改。
     *
     */
    modSelf() {
        this.__dirty = true;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Group = Group;

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Painter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaintLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Transformable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Config__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SmicImage__ = __webpack_require__(22);








/**
 * @private
 * @class  KTW.LevelRenderer.Painter
 * Painter 绘图模块。
 */
class Painter {

    /**
     * Constructor: KTW.LevelRenderer.Painter
     * 构造函数。
     *
     * Parameters:
     * root - {HTMLElement} 绘图区域（DIV）。
     * storage - {<KTW.LevelRenderer.Storage>} Storage 实例。
     *
     */
    constructor(root, storage) {
        /**
         * APIProperty: root
         * {HTMLElement} 绘图容器。
         *
         */
        this.root = root;

        /**
         * APIProperty: storage
         * {Array} 图形仓库。
         *
         */
        this.storage = storage;

        /**
         * Property: _domRoot
         * {HTMLElement} 容器根 dom 对象。
         *
         */
        this._domRoot = null;

        /**
         * Property: _layers
         * {Object} 绘制层对象。
         *
         */
        this._layers = {};

        /**
         * Property: _zlevelList
         * {Array} 层列表。
         *
         */
        this._zlevelList = [];

        /**
         * Property: _layerConfig
         * {Object} 绘制层配置对象。
         *
         */
        this._layerConfig = {};

        /**
         * Property: _bgDom
         * {Object} 背景层 Canvas （Dom）。
         *
         */
        this._bgDom = null;

        /**
         * Property: shapeToImage
         * {Function} 形状转图像函数。
         *
         */
        this.shapeToImage = null;
        // retina 屏幕优化
        Painter.devicePixelRatio = Math.max((window.devicePixelRatio || 1), 1);

        this.CLASS_NAME = "KTW.LevelRenderer.Painter";
        this.root.innerHTML = '';
        this._width = this._getWidth(); // 宽，缓存记录
        this._height = this._getHeight(); // 高，缓存记录

        var domRoot = document.createElement('div');
        this._domRoot = domRoot;

        // domRoot.onselectstart = returnFalse; // 避免页面选中的尴尬
        domRoot.style.position = 'relative';
        domRoot.style.overflow = 'hidden';
        domRoot.style.width = this._width + 'px';
        domRoot.style.height = this._height + 'px';
        this.root.appendChild(domRoot);

        this.shapeToImage = this._createShapeToImageProcessor();

        // 创建各层canvas
        // 背景
        //this._bgDom = Painter.createDom('bg', 'div', this);
        this._bgDom = Painter.createDom(Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), 'div', this);
        domRoot.appendChild(this._bgDom);
        this._bgDom.onselectstart = returnFalse;
        this._bgDom.style['-webkit-user-select'] = 'none';
        this._bgDom.style['user-select'] = 'none';
        this._bgDom.style['-webkit-touch-callout'] = 'none';

        // 高亮
        //var hoverLayer = new PaintLayer('_hoverLayer_', this);
        var hoverLayer = new PaintLayer(Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), this);
        this._layers['hover'] = hoverLayer;
        domRoot.appendChild(hoverLayer.dom);
        hoverLayer.initContext();

        hoverLayer.dom.onselectstart = returnFalse;
        hoverLayer.dom.style['-webkit-user-select'] = 'none';
        hoverLayer.dom.style['user-select'] = 'none';
        hoverLayer.dom.style['-webkit-touch-callout'] = 'none';

        var me = this;
        this.updatePainter = function (shapeList, callback) {
            me.refreshShapes(shapeList, callback);
        };

        // 返回false的方法，用于避免页面被选中
        function returnFalse() {
            return false;
        }

        /* eslint-disable */
        // 什么都不干的空方法
        function doNothing() {  //NOSONAR
        }
        /* eslint-enable */
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._zlevelList = null;
        this._layerConfig = null;
        this._bgDom = null;
        this.shapeToImage = null;
    }


    /**
     * APIMethod: render
     * 渲染。
     *
     * 首次绘图，创建各种 dom 和 context。
     *
     * Parameters:
     * callback - {Function} 绘画结束后的回调函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    render(callback) {
        // TODO
        this.refresh(callback, true);

        return this;
    }


    /**
     * APIMethod: refresh
     * 刷新。
     *
     * Parameters:
     * callback - {Function} 刷新结束后的回调函数。
     * paintAll - {Boolean} 强制绘制所有 shape。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    refresh(callback, paintAll) {
        var list = this.storage.getShapeList(true);
        this._paintList(list, paintAll);

        if (typeof callback == 'function') {
            callback();
        }

        return this;
    }


    /**
     * Method: _paintList
     * 按列表绘制图形。
     */
    _paintList(list, paintAll) {
        if (typeof(paintAll) == 'undefined') {
            paintAll = false;
        }

        this._updateLayerStatus(list);

        var currentLayer;
        var currentZLevel;
        var ctx;

        for (var id in this._layers) {
            if (id !== 'hover') {
                this._layers[id].unusedCount++;
                this._layers[id].updateTransform();
            }
        }

        var invTransform = [];

        for (var i = 0, l = list.length; i < l; i++) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                if (currentLayer && currentLayer.needTransform) {
                    ctx.restore();
                }

                currentLayer = this.getLayer(shape.zlevel);
                ctx = currentLayer.ctx;
                currentZLevel = shape.zlevel;

                // Reset the count
                currentLayer.unusedCount = 0;

                if (currentLayer.dirty || paintAll) {
                    currentLayer.clear();
                }

                if (currentLayer.needTransform) {
                    ctx.save();
                    currentLayer.setTransform(ctx);
                }
            }

            // Start group clipping
            if (ctx && shape.__startClip) {
                var clipShape = shape.__startClip;
                ctx.save();
                // Set transform
                if (clipShape.needTransform) {
                    let m = clipShape.transform;
                    __WEBPACK_IMPORTED_MODULE_5__SUtil__["a" /* SUtil */].Util_matrix.invert(invTransform, m);
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }

                ctx.beginPath();
                clipShape.buildPath(ctx, clipShape.style);
                ctx.clip();

                // Transform back
                if (clipShape.needTransform) {
                    let m = invTransform;
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
            }

            if (((currentLayer && currentLayer.dirty) || paintAll) && !shape.invisible) {
                if (
                    !shape.onbrush
                    || (shape.onbrush && !shape.onbrush(ctx, false))
                ) {
                    if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].catchBrushException) {
                        try {
                            shape.brush(ctx, false, this.updatePainter);
                        } catch (error) {
                        }
                    } else {
                        shape.brush(ctx, false, this.updatePainter);
                    }
                }
            }

            // Stop group clipping
            if (ctx && shape.__stopClip) {
                ctx.restore();
            }

            shape.__dirty = false;
        }

        if (ctx && currentLayer && currentLayer.needTransform) {
            ctx.restore();
        }

        for (let id in this._layers) {
            if (id !== 'hover') {
                var layer = this._layers[id];
                layer.dirty = false;
                // 删除过期的层
                // PENDING
                // if (layer.unusedCount >= 500) {
                //     this.delLayer(id);
                // }
                if (layer.unusedCount == 1) {
                    layer.clear();
                }
            }
        }

    }


    /**
     * APIMethod: getLayer
     * 获取 zlevel 所在层，如果不存在则会创建一个新的层。
     *
     * Parameters:
     * zlevel - {Number} zlevel。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    getLayer(zlevel) {
        // Change draw layer
        var currentLayer = this._layers[zlevel];
        if (!currentLayer) {
            var len = this._zlevelList.length;
            var prevLayer = null;
            var i = -1;
            if (len > 0 && zlevel > this._zlevelList[0]) {
                for (i = 0; i < len - 1; i++) {
                    if (
                        this._zlevelList[i] < zlevel
                        && this._zlevelList[i + 1] > zlevel
                    ) {
                        break;
                    }
                }
                prevLayer = this._layers[this._zlevelList[i]];
            }
            this._zlevelList.splice(i + 1, 0, zlevel);

            // Create a new layer
            //currentLayer = new PaintLayer(zlevel, this);
            currentLayer = new PaintLayer(Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), this);
            var prevDom = prevLayer ? prevLayer.dom : this._bgDom;
            if (prevDom.nextSibling) {
                prevDom.parentNode.insertBefore(
                    currentLayer.dom,
                    prevDom.nextSibling
                );
            } else {
                prevDom.parentNode.appendChild(
                    currentLayer.dom
                );
            }
            currentLayer.initContext();

            this._layers[zlevel] = currentLayer;

            if (this._layerConfig[zlevel]) {
                 new __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* Util */]().merge(currentLayer, this._layerConfig[zlevel], true);
            }

            currentLayer.updateTransform();
        }

        return currentLayer;
    }


    /**
     * Method: getLayers
     * 获取所有已创建的层。
     *
     * Returns:
     * {Array{<Painter.Layer>}} 已创建的层
     */
    getLayers() {
        return this._layers;
    }


    /**
     * Method: _updateLayerStatus
     * 更新绘制层状态。
     */
    _updateLayerStatus(list) {
        var layers = this._layers;

        var elCounts = {};
        for (let z in layers) {
            if (z !== 'hover') {
                elCounts[z] = layers[z].elCount;
                layers[z].elCount = 0;
            }
        }

        for (let i = 0; i < list.length; i++) {
            var shape = list[i];
            var zlevel = shape.zlevel;
            var layer = layers[zlevel];
            if (layer) {
                layer.elCount++;
                // 已经被标记为需要刷新
                if (layer.dirty) {
                    continue;
                }
                layer.dirty = shape.__dirty;
            }
        }

        // 层中的元素数量有发生变化
        for (let z in layers) {
            if (z !== 'hover') {
                if (elCounts[z] !== layers[z].elCount) {
                    layers[z].dirty = true;
                }
            }
        }
    }


    /**
     * APIMethod: refreshShapes
     * 更新的图形元素列表。
     *
     * Parameters:
     * shapeList - {Number} 需要更新的图形元素列表。
     * callback - {Number} 视图更新后回调函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    refreshShapes(shapeList, callback) {
        for (var i = 0, l = shapeList.length; i < l; i++) {
            var shape = shapeList[i];
            this.storage.mod(shape.id);
        }

        this.refresh(callback);
        return this;
    }


    /**
     * APIMethod: clear
     * 清除 hover 层外所有内容。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    clear() {
        for (var k in this._layers) {
            if (k == 'hover') {
                continue;
            }
            this._layers[k].clear();
        }

        return this;
    }


    /**
     * APIMethod: modLayer
     * 修改指定 zlevel 的绘制参数。
     *
     * Parameters:
     * zlevel - {String} zlevel。
     * config - {Object} 配置对象。可用属性如下：
     *
     * Symbolizer properties:
     * clearColor - {String} 每次清空画布的颜色。默认值：0。
     * motionBlur - {Boolean} 是否开启动态模糊。默认值：false。
     * lastFrameAlpha - {Number}  在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显。默认值：0.7。
     * position - {Array{Number}}  层的平移。
     * rotation - {Array{Number}}  层的旋转。
     * scale - {Array{Number}}  层的缩放。
     * zoomable - {Boolean} 层是否支持鼠标缩放操作。默认值：false。
     * panable - {Boolean} 层是否支持鼠标平移操作。默认值：false。
     *
     */
    modLayer(zlevel, config) {
        if (config) {
            if (!this._layerConfig[zlevel]) {
                this._layerConfig[zlevel] = config;
            } else {
                 new __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* Util */]().merge(this._layerConfig[zlevel], config, true);
            }

            var layer = this._layers[zlevel];

            if (layer) {
                 new __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* Util */]().merge(layer, this._layerConfig[zlevel], true);
            }
        }
    }


    /**
     * APIMethod: delLayer
     * 删除指定层。
     *
     * Parameters:
     * zlevel - {Ntring} 层所在的 zlevel。
     *
     */
    delLayer(zlevel) {
        var layer = this._layers[zlevel];
        if (!layer) {
            return;
        }
        // Save config
        this.modLayer(zlevel, {
            position: layer.position,
            rotation: layer.rotation,
            scale: layer.scale
        });
        layer.dom.parentNode.removeChild(layer.dom);
        delete this._layers[zlevel];

        this._zlevelList.splice(new __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* Util */]().indexOf(this._zlevelList, zlevel), 1);
    }


    /**
     * APIMethod: refreshHover
     * 刷新 hover 层。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    refreshHover() {
        this.clearHover();
        var list = this.storage.getHoverShapes(true);
        for (var i = 0, l = list.length; i < l; i++) {
            this._brushHover(list[i]);
        }
        this.storage.delHover();

        return this;
    }


    /**
     * APIMethod: clearHover
     * 清除 hover 层所有内容。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    clearHover() {
        var hover = this._layers.hover;
        hover && hover.clear();

        return this;
    }


    /**
     * APIMethod: resize
     * 区域大小变化后重绘。
     *
     * Returns:
     * {<KTW.LevelRenderer.Painter>} this。
     */
    resize() {
        var domRoot = this._domRoot;
        domRoot.style.display = 'none';

        var width = this._getWidth();
        var height = this._getHeight();

        domRoot.style.display = '';

        // 优化没有实际改变的resize
        if (this._width != width || height != this._height) {
            this._width = width;
            this._height = height;

            domRoot.style.width = width + 'px';
            domRoot.style.height = height + 'px';

            for (var id in this._layers) {

                this._layers[id].resize(width, height);
            }

            this.refresh(null, true);
        }

        return this;
    }


    /**
     * APIMethod: clearLayer
     * 清除指定的一个层。
     *
     * Parameters:
     * zLevel - {Number} 层。
     */
    clearLayer(zLevel) {
        var layer = this._layers[zLevel];
        if (layer) {
            layer.clear();
        }
    }


    /**
     * APIMethod: dispose
     * 释放。
     *
     */
    dispose() {
        this.root.innerHTML = '';

        this.root = null;
        this.storage = null;
        this._domRoot = null;
        this._layers = null;
    }


    /**
     * Method: getDomHover
     * 获取 Hover 层的 Dom。
     *
     */
    getDomHover() {
        return this._layers.hover.dom;
    }


    /**
     * APIMethod: toDataURL
     * 图像导出。
     *
     * Parameters:
     * type - {String} 图片类型。
     * backgroundColor - {String} 背景色。默认值：'#fff'。
     * args - {Object}。
     *
     * Returns:
     * {String} 图片的Base64 url。
     */
    toDataURL(type, backgroundColor, args) {
        //var imageDom = Painter.createDom('image', 'canvas', this);
        var imageDom = Painter.createDom(Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), 'canvas', this);
        this._bgDom.appendChild(imageDom);
        var ctx = imageDom.getContext('2d');
        Painter.devicePixelRatio != 1
        && ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);

        ctx.fillStyle = backgroundColor || '#fff';
        ctx.rect(
            0, 0,
            this._width * Painter.devicePixelRatio,
            this._height * Painter.devicePixelRatio
        );
        ctx.fill();

        var self = this;
        // 升序遍历，shape上的zlevel指定绘画图层的z轴层叠

        this.storage.iterShape(
            function (shape) {
                if (!shape.invisible) {
                    if (!shape.onbrush // 没有onbrush
                        // 有onbrush并且调用执行返回false或undefined则继续粉刷
                        || (shape.onbrush && !shape.onbrush(ctx, false))
                    ) {
                        if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].catchBrushException) {
                            try {
                                shape.brush(ctx, false, self.updatePainter);
                            } catch (error) {
                            }
                        } else {
                            shape.brush(ctx, false, self.updatePainter);
                        }
                    }
                }
            },
            {normal: 'up', update: true}
        );
        var image = imageDom.toDataURL(type, args);
        ctx = null;
        this._bgDom.removeChild(imageDom);
        return image;
    }


    /**
     * APIMethod: getWidth
     * 获取绘图区域宽度。
     *
     * Returns:
     * {Number} 绘图区域宽度。
     */
    getWidth() {
        return this._width;
    }


    /**
     * APIMethod: getHeight
     * 获取绘图区域高度。
     *
     * Returns:
     * {Number} 绘图区域高度。
     */
    getHeight() {
        return this._height;
    }


    /**
     * Method: _getWidth
     *
     */
    _getWidth() {
        var root = this.root;
        var stl = root.currentStyle
            || document.defaultView.getComputedStyle(root);

        return ((root.clientWidth || parseInt(stl.width, 10))
            - parseInt(stl.paddingLeft, 10) 
            - parseInt(stl.paddingRight, 10)).toFixed(0) - 0;
    }


    /**
     * Method: _getHeight
     *
     */
    _getHeight() {
        var root = this.root;
        var stl = root.currentStyle
            || document.defaultView.getComputedStyle(root);

        return ((root.clientHeight || parseInt(stl.height, 10))
            - parseInt(stl.paddingTop, 10) 
            - parseInt(stl.paddingBottom, 10)).toFixed(0) - 0;
    }


    /**
     * Method: _brushHover
     *
     */
    _brushHover(shape) {
        var ctx = this._layers.hover.ctx;

        if (!shape.onbrush // 没有onbrush
            // 有onbrush并且调用执行返回false或undefined则继续粉刷
            || (shape.onbrush && !shape.onbrush(ctx, true))
        ) {
            var layer = this.getLayer(shape.zlevel);
            if (layer.needTransform) {
                ctx.save();
                layer.setTransform(ctx);
            }
            // Retina 优化
            if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].catchBrushException) {
                try {
                    shape.brush(ctx, true, this.updatePainter);
                } catch (error) {
                }
            } else {
                shape.brush(ctx, true, this.updatePainter);
            }
            if (layer.needTransform) {
                ctx.restore();
            }
        }

    }


    /**
     * Method: _shapeToImage
     *
     */
    _shapeToImage(id, shape, width, height, devicePixelRatio) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var _devicePixelRatio = devicePixelRatio || window.devicePixelRatio || 1;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.setAttribute('width', width * _devicePixelRatio);
        canvas.setAttribute('height', height * _devicePixelRatio);

        ctx.clearRect(0, 0, width * _devicePixelRatio, height * _devicePixelRatio);

        var shapeTransform = {
            position: shape.position,
            rotation: shape.rotation,
            scale: shape.scale
        };
        shape.position = [0, 0, 0];
        shape.rotation = 0;
        shape.scale = [1, 1];
        if (shape) {
            shape.brush(ctx, false);
        }

        var imgShape = new __WEBPACK_IMPORTED_MODULE_6__SmicImage__["a" /* SmicImage */]({
            id: id,
            style: {
                x: 0,
                y: 0,
                image: canvas
            }
        });

        if (shapeTransform.position != null) {
            imgShape.position = shape.position = shapeTransform.position;
        }

        if (shapeTransform.rotation != null) {
            imgShape.rotation = shape.rotation = shapeTransform.rotation;
        }

        if (shapeTransform.scale != null) {
            imgShape.scale = shape.scale = shapeTransform.scale;
        }

        return imgShape;
    }


    /**
     * Method: _createShapeToImageProcessor
     *
     */
    _createShapeToImageProcessor() {
        var me = this;

        return function (id, e, width, height) {
            return me._shapeToImage(
                id, e, width, height, Painter.devicePixelRatio
            );
        };
    }


    // SMIC-方法扩展 - start
    /**
     * APIMethod: updateHoverLayer
     * 更新设置显示高亮图层。
     *
     * Parameters:
     * shapes - {Array} 图形数组。
     */
    updateHoverLayer(shapes) {
        if (!(shapes instanceof Array)) {
            return this;
        }

        //清除高亮
        this.clearHover();
        this.storage.delHover();

        for (var i = 0; i < shapes.length; i++) {
            this.storage.addHover(shapes[i]);
            this._brushHover(shapes[i]);
        }
    }


    /**
     * Method: createDom
     * 创建 Dom。
     *
     * Parameters:
     * id - {String} Dom id
     * type - {String} Dom type
     * painter - {<KTW.LevelRenderer.Painter>} Painter 实例。
     *
     * Returns:
     * {Object} Dom
     */
    static createDom(id, type, painter) {
        var newDom = document.createElement(type);
        var width = painter._width;
        var height = painter._height;

        newDom.style.position = 'absolute';
        newDom.style.left = 0;
        newDom.style.top = 0;
        newDom.style.width = width + 'px';
        newDom.style.height = height + 'px';
        newDom.setAttribute('width', width * Painter.devicePixelRatio);
        newDom.setAttribute('height', height * Painter.devicePixelRatio);

        // id不作为索引用，避免可能造成的重名，定义为私有属性
        //newDom.setAttribute('data-zr-dom-id', id);
        newDom.setAttribute('id', id);
        return newDom;
    }
};

/**
 * @private
 * @class Painter.Layer
 * 绘制层类。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Transformable>
 */
class PaintLayer extends __WEBPACK_IMPORTED_MODULE_3__Transformable__["a" /* Transformable */] {

    /**
     * Constructor: Painter.Layer
     * 构造函数。
     *
     * Parameters:
     * id - {String} id。
     * painter - {<KTW.LevelRenderer.Painter>} Painter 实例。
     *
     */
    constructor(id, painter) {
        super(id, painter);
        /**
         * Property: dom
         * {Object} dom。
         */
        this.dom = null;

        /**
         * Property: domBack
         * {Object} domBack。
         */
        this.domBack = null;

        /**
         * Property: ctxBack
         * {Object} ctxBack。
         */
        this.ctxBack = null;

        /**
         * Property: painter
         * {<KTW.LevelRenderer.Painter>} painter。
         */
        this.painter = painter;

        /**
         * Property: unusedCount
         * {Number} unusedCount。
         */
        this.unusedCount = 0;

        /**
         * Property: config
         * {Object} config。
         */
        this.config = null;

        /**
         * Property: dirty
         * {Boolean} dirty。
         */
        this.dirty = true;

        /**
         * Property: elCount
         * {Number} elCount。
         */
        this.elCount = 0;

        // Configs
        /**
         * Property: clearColor
         * {String} 每次清空画布的颜色。默认值：0；
         */
        this.clearColor = 0;

        /**
         * Property: motionBlur
         * {Boolean} 是否开启动态模糊。默认值：false；
         */
        this.motionBlur = false;

        /**
         * Property: lastFrameAlpha
         * {Number} 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
         */
        this.lastFrameAlpha = 0.7;

        /**
         * Property: zoomable
         * {Boolean} 层是否支持鼠标平移操作。默认值：false；
         */
        this.zoomable = false;

        /**
         * Property: panable
         * {Boolean} 层是否支持鼠标缩放操作。默认值：false；
         */
        this.panable = false;

        /**
         * Property: maxZoom
         * {Number} maxZoom。默认值：Infinity。
         */
        this.maxZoom = Infinity;

        /**
         * Property: minZoom
         * {Number} minZoom。默认值：0。
         */
        this.minZoom = 0;

        /**
         * Property: ctx
         * {Object} Cavans 上下文。
         */
        this.ctx = null;
        this.dom = Painter.createDom(Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), 'canvas', painter);
        this.dom.onselectstart = returnFalse; // 避免页面选中的尴尬
        this.dom.style['-webkit-user-select'] = 'none';
        this.dom.style['user-select'] = 'none';
        this.dom.style['-webkit-touch-callout'] = 'none';
        // Function
        // 返回false的方法，用于避免页面被选中
        function returnFalse() {
            return false;
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Painter.Layer";
    }

    /**
     * Method: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dom = null;
        this.domBack = null;
        this.ctxBack = null;
        this.painter = null;
        this.unusedCount = null;
        this.config = null;
        this.dirty = null;
        this.elCount = null;
        this.clearColor = null;
        this.motionBlur = null;
        this.lastFrameAlpha = null;
        this.zoomable = null;
        this.panable = null;
        this.maxZoom = null;
        this.minZoom = null;
        this.ctx = null;

        __WEBPACK_IMPORTED_MODULE_3__Transformable__["a" /* Transformable */].destroy.apply(this, arguments);
    }

    /**
     * Method: initContext
     * 初始化 Canvan 2D 上下文。
     */
    initContext() {
        this.ctx = this.dom.getContext('2d');
        if (Painter.devicePixelRatio != 1) {
            this.ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
        }
    }

    /**
     * Method: createBackBuffer
     * 创建备份缓冲。
     */
    createBackBuffer() {
        this.domBack = Painter.createDom(Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), 'canvas', this.painter);
        this.ctxBack = this.domBack.getContext('2d');

        if (Painter.devicePixelRatio != 1) {
            this.ctxBack.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
        }
    }

    /**
     * Method: resize
     * 改变大小。
     *
     * Parameters:
     * width - {Number} 宽。
     * height - {Number} 高。
     */
    resize(width, height) {
        this.dom.style.width = width + 'px';
        this.dom.style.height = height + 'px';

        this.dom.setAttribute('width', width * Painter.devicePixelRatio);
        this.dom.setAttribute('height', height * Painter.devicePixelRatio);

        if (Painter.devicePixelRatio != 1) {
            this.ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
        }

        if (this.domBack) {
            this.domBack.setAttribute('width', width * Painter.devicePixelRatio);
            this.domBack.setAttribute('height', height * Painter.devicePixelRatio);

            if (Painter.devicePixelRatio != 1) {
                this.ctxBack.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
            }
        }
    }

    /**
     * Method: clear
     * 清空该层画布。
     */
    clear() {
        var dom = this.dom;
        var ctx = this.ctx;
        var width = dom.width;
        var height = dom.height;

        var haveClearColor = this.clearColor;
        var haveMotionBLur = this.motionBlur;
        var lastFrameAlpha = this.lastFrameAlpha;

        if (haveMotionBLur) {
            if (!this.domBack) {
                this.createBackBuffer();
            }

            this.ctxBack.globalCompositeOperation = 'copy';
            this.ctxBack.drawImage(
                dom, 0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
        }

        if (haveClearColor) {
            ctx.save();
            ctx.fillStyle = this.config.clearColor;
            ctx.fillRect(
                0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
            ctx.restore();
        } else {
            ctx.clearRect(
                0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
        }

        if (haveMotionBLur) {
            var domBack = this.domBack;
            ctx.save();
            ctx.globalAlpha = lastFrameAlpha;
            ctx.drawImage(
                domBack, 0, 0,
                width / Painter.devicePixelRatio,
                height / Painter.devicePixelRatio
            );
            ctx.restore();
        }
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Painter = Painter;

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.PaintLayer = PaintLayer;

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Handler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Eventful__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Config__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SUtil__ = __webpack_require__(3);





/**
 * @private
 * @class  KTW.LevelRenderer.Handler
 * Handler 控制模块。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Eventful>
 */
class Handler extends __WEBPACK_IMPORTED_MODULE_1__Eventful__["a" /* Eventful */] {

    /**
     * Constructor: KTW.LevelRenderer.Handler
     * 构造函数。
     *
     * Parameters:
     * root - {HTMLElement} 绘图区域。
     * storage - {<KTW.LevelRenderer.Storage>} Storage 实例。
     * painter - {<KTW.LevelRenderer.Painter>} Painter 实例。
     *
     */
    constructor(root, storage, painter) {
        super(root, storage, painter);
        /**
         * Property: root
         * {HTMLElement} 绘图区域。
         *
         */
        this.root = root;

        /**
         * Property: storage
         * {<KTW.LevelRenderer.Storage>} Storage 实例。
         *
         */
        this.storage = storage;

        /**
         * Property: painter
         * {<KTW.LevelRenderer.Painter>} Painter 实例。
         *
         */
        this.painter = painter;

        /**
         * Property: _lastX
         * {Number} 默认值：0。
         *
         */
        this._lastX = 0;

        /**
         * Property: _lastY
         * {Number} 默认值：0。
         *
         */
        this._lastY = 0;

        /**
         * Property: _mouseX
         * {Number} 默认值：0。
         *
         */
        this._mouseX = 0;

        /**
         * Property: _mouseY
         * {Number} 默认值：0。
         *
         */
        this._mouseY = 0;

        /**
         * Property: _findHover
         * {Function} 查找 Hover 图形。
         *
         */
        this._findHover = null;

        /**
         * Property: _domHover
         * {Object} 高亮 DOM。
         *
         */
        this._domHover = null;

        // 各种事件标识的私有变量
        // this._hasfound = false;              // 是否找到 hover 图形元素
        // this._lastHover = null;              // 最后一个 hover 图形元素
        // this._mouseDownTarget = null;
        // this._draggingTarget = null;         // 当前被拖拽的图形元素
        // this._isMouseDown = false;
        // this._isDragging = false;
        // this._lastMouseDownMoment;
        // this._lastTouchMoment;
        // this._lastDownButton;

        this._findHover = bind3Arg(findHover, this);
        this._domHover = painter.getDomHover();

        this.CLASS_NAME = "KTW.LevelRenderer.Handler";
        var domHandlers = {
            /**
             * Method: resize
             * 窗口大小改变响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            resize: function (event) {
                event = event || window.event;
                this._lastHover = null;
                this._isMouseDown = 0;

                // 分发KTW.LevelRenderer.Config.EVENT.RESIZE事件，global
                this.dispatch(__WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.RESIZE, event);
            },

            /**
             * Method: click
             * 点击响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            click: function (event) {
                event = this._zrenderEventFixed(event);

                // 分发KTW.LevelRenderer.Config.EVENT.CLICK事件
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable)
                    || !_lastHover
                ) {

                    // 判断没有发生拖拽才触发click事件
                    if (this._clickThreshold < 10) {
                        this._dispatchAgency(_lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.CLICK, event);
                    }
                }

                this._mousemoveHandler(event);
            },

            /**
             * Method: dblclick
             * 双击响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            dblclick: function (event) {
                event = event || window.event;
                event = this._zrenderEventFixed(event);

                // 分发KTW.LevelRenderer.Config.EVENT.DBLCLICK事件
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable)
                    || !_lastHover
                ) {

                    // 判断没有发生拖拽才触发dblclick事件
                    if (this._clickThreshold < 5) {
                        this._dispatchAgency(_lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DBLCLICK, event);
                    }
                }

                this._mousemoveHandler(event);
            },

            /**
             * Method: mousewheel
             * 鼠标滚轮响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mousewheel: function (event) {
                event = this._zrenderEventFixed(event);

                // http://www.sitepoint.com/html5-javascript-mouse-wheel/
                // https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
                var delta = event.wheelDelta // Webkit
                    || -event.detail; // Firefox
                var scale = delta > 0 ? 1.1 : 1 / 1.1;

                var layers = this.painter.getLayers();

                var needsRefresh = false;
                for (var z in layers) {
                    if (z !== 'hover') {
                        var layer = layers[z];
                        var pos = layer.position;
                        if (layer.zoomable) {
                            layer.__zoom = layer.__zoom || 1;
                            var newZoom = layer.__zoom;
                            newZoom *= scale;
                            newZoom = Math.max(
                                Math.min(layer.maxZoom, newZoom),
                                layer.minZoom
                            );
                            scale = newZoom / layer.__zoom;
                            layer.__zoom = newZoom;
                            // Keep the mouse center when scaling
                            pos[0] -= (this._mouseX - pos[0]) * (scale - 1);
                            pos[1] -= (this._mouseY - pos[1]) * (scale - 1);
                            layer.scale[0] *= scale;
                            layer.scale[1] *= scale;
                            layer.dirty = true;
                            needsRefresh = true;
                        }
                    }
                }
                if (needsRefresh) {
                    this.painter.refresh();
                }

                // 分发KTW.LevelRenderer.Config.EVENT.MOUSEWHEEL事件
                this._dispatchAgency(this._lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.MOUSEWHEEL, event);
                this._mousemoveHandler(event);
            },

            /**
             * Method: mousemove
             * 鼠标（手指）移动响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mousemove: function (event) {
                // 拖拽不触发click事件
                this._clickThreshold++;

                event = this._zrenderEventFixed(event);
                this._lastX = this._mouseX;
                this._lastY = this._mouseY;
                this._mouseX = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_event.getX(event);
                this._mouseY = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_event.getY(event);
                var dx = this._mouseX - this._lastX;
                var dy = this._mouseY - this._lastY;

                // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGSTART事件
                // 避免手抖点击误认为拖拽
                // if (this._mouseX - this._lastX > 1 || this._mouseY - this._lastY > 1) {
                this._processDragStart(event);
                // }
                this._hasfound = 0;
                this._event = event;

                this._iterateAndFindHover();

                // 找到的在迭代函数里做了处理，没找到得在迭代完后处理
                if (!this._hasfound) {
                    // 过滤首次拖拽产生的mouseout和dragLeave
                    if (!this._draggingTarget
                        || (this._lastHover && this._lastHover != this._draggingTarget)
                    ) {
                        // 可能出现SuperMap.LevelRenderer.Config.EVENT.MOUSEOUT事件
                        this._processOutShape(event);

                        // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE事件
                        this._processDragLeave(event);
                    }

                    this._lastHover = null;
                    this.storage.delHover();
                    this.painter.clearHover();
                }

                // set cursor for root element
                var cursor = '';

                // 如果存在拖拽中元素，被拖拽的图形元素最后addHover
                if (this._draggingTarget) {
                    this.storage.drift(this._draggingTarget.id, dx, dy);
                    this._draggingTarget.modSelf();
                    this.storage.addHover(this._draggingTarget);
                } else if (this._isMouseDown) {
                    // Layer dragging
                    var layers = this.painter.getLayers();

                    var needsRefresh = false;
                    for (var z in layers) {
                        if (z !== 'hover') {
                            var layer = layers[z];
                            if (layer.panable) {
                                // PENDING
                                cursor = 'move';
                                // Keep the mouse center when scaling
                                layer.position[0] += dx;
                                layer.position[1] += dy;
                                needsRefresh = true;
                                layer.dirty = true;
                            }
                        }
                    }
                    if (needsRefresh) {
                        this.painter.refresh();
                    }
                }

                if (this._draggingTarget || (this._hasfound && this._lastHover.draggable)) {
                    cursor = 'move';
                } else if (this._hasfound && this._lastHover.clickable) {
                    cursor = 'pointer';
                }
                this.root.style.cursor = cursor;

                // 分发KTW.LevelRenderer.Config.EVENT.MOUSEMOVE事件
                this._dispatchAgency(this._lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.MOUSEMOVE, event);

                if (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) {
                    this.painter.refreshHover();
                }
            },

            /**
             * Method: mouseout
             * 鼠标（手指）离开响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mouseout: function (event) {
                event = this._zrenderEventFixed(event);

                var element = event.toElement || event.relatedTarget;
                if (element != this.root) {
                    while (element && element.nodeType != 9) {
                        // 忽略包含在root中的dom引起的mouseOut
                        if (element == this.root) {
                            this._mousemoveHandler(event);
                            return;
                        }

                        element = element.parentNode;
                    }
                }

                event.zrenderX = this._lastX;
                event.zrenderY = this._lastY;
                this.root.style.cursor = '';
                this._isMouseDown = 0;

                this._processOutShape(event);
                this._processDrop(event);
                this._processDragEnd(event);

                this.painter.refreshHover();

                this.dispatch(__WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.GLOBALOUT, event);
            },

            /**
             * Method: mousedown
             * 鼠标（手指）按下响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mousedown: function (event) {
                // 重置 clickThreshold
                this._clickThreshold = 0;

                if (this._lastDownButton == 2) {
                    this._lastDownButton = event.button;
                    this._mouseDownTarget = null;
                    // 仅作为关闭右键菜单使用
                    return;
                }

                this._lastMouseDownMoment = new Date();
                event = this._zrenderEventFixed(event);
                this._isMouseDown = 1;

                // 分发KTW.LevelRenderer.Config.EVENT.MOUSEDOWN事件
                this._mouseDownTarget = this._lastHover;
                this._dispatchAgency(this._lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.MOUSEDOWN, event);
                this._lastDownButton = event.button;
            },

            /**
             * Method: mouseup
             * 鼠标（手指）抬起响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            mouseup: function (event) {
                event = this._zrenderEventFixed(event);
                this.root.style.cursor = '';
                this._isMouseDown = 0;
                this._mouseDownTarget = null;

                // 分发KTW.LevelRenderer.Config.EVENT.MOUSEUP事件
                this._dispatchAgency(this._lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.MOUSEUP, event);
                this._processDrop(event);
                this._processDragEnd(event);
            },

            /**
             * Method: touchstart
             * Touch 开始响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            touchstart: function (event) {
                // SUtil.Util_event.stop(event);// 阻止浏览器默认事件，重要
                event = this._zrenderEventFixed(event, true);
                this._lastTouchMoment = new Date();

                // 平板补充一次findHover
                this._mobildFindFixed(event);
                this._mousedownHandler(event);
            },

            /**
             * Method: touchmove
             * Touch 移动响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            touchmove: function (event) {
                event = this._zrenderEventFixed(event, true);
                this._mousemoveHandler(event);
                if (this._isDragging) {
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_event.stop(event);// 阻止浏览器默认事件，重要
                }
            },

            /**
             * Method: touchend
             * Touch 结束响应函数。
             *
             * Parameters:
             * event - {Event} event。
             *
             */
            touchend: function (event) {
                // SUtil.Util_event.stop(event);// 阻止浏览器默认事件，重要
                event = this._zrenderEventFixed(event, true);
                this._mouseupHandler(event);

                var now = new Date();
                if (now - this._lastTouchMoment < __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.touchClickDelay) {
                    this._mobildFindFixed(event);
                    this._clickHandler(event);
                    if (now - this._lastClickMoment < __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.touchClickDelay / 2) {
                        this._dblclickHandler(event);
                        if (this._lastHover && this._lastHover.clickable) {
                            __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_event.stop(event);// 阻止浏览器默认事件，重要
                        }
                    }
                    this._lastClickMoment = now;
                }
                this.painter.clearHover();
            }
        };

        initDomHandler(this);

        // 初始化，事件绑定，支持的所有事件都由如下原生事件计算得来
        if (window.addEventListener) {
            window.addEventListener('resize', this._resizeHandler);

            if (__WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_env.os.tablet || __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_env.os.phone) {
                // mobile支持
                root.addEventListener('touchstart', this._touchstartHandler);
                root.addEventListener('touchmove', this._touchmoveHandler);
                root.addEventListener('touchend', this._touchendHandler);
            } else {
                // mobile的click/move/up/down自己模拟
                root.addEventListener('click', this._clickHandler);
                root.addEventListener('dblclick', this._dblclickHandler);
                root.addEventListener('mousewheel', this._mousewheelHandler);
                root.addEventListener('mousemove', this._mousemoveHandler);
                root.addEventListener('mousedown', this._mousedownHandler);
                root.addEventListener('mouseup', this._mouseupHandler);
            }
            root.addEventListener('DOMMouseScroll', this._mousewheelHandler);
            root.addEventListener('mouseout', this._mouseoutHandler);
        } else {
            window.attachEvent('onresize', this._resizeHandler);

            root.attachEvent('onclick', this._clickHandler);
            //root.attachEvent('ondblclick ', this._dblclickHandler);
            root.ondblclick = this._dblclickHandler;
            root.attachEvent('onmousewheel', this._mousewheelHandler);
            root.attachEvent('onmousemove', this._mousemoveHandler);
            root.attachEvent('onmouseout', this._mouseoutHandler);
            root.attachEvent('onmousedown', this._mousedownHandler);
            root.attachEvent('onmouseup', this._mouseupHandler);
        }

        // 辅助函数 start
        /**
         * Method: bind1Arg
         * bind 一个参数的 function。
         *
         * Parameters:
         * handler - {Function} 要 bind 的 function。
         * context - {Object} 运行时 this 环境。
         *
         * Returns:
         * {Function}
         */
        function bind1Arg(handler, context) {
            return function (e) {
                return handler.call(context, e);
            };
        }

        /*
         // bind 两个参数的 function
         function bind2Arg(handler, context) {
         return function (arg1, arg2) {
         return handler.call(context, arg1, arg2);
         };
         }
         */

        // bind 三个参数的 function
        function bind3Arg(handler, context) {
            return function (arg1, arg2, arg3) {
                return handler.call(context, arg1, arg2, arg3);
            };
        }

        /**
         * Method: initDomHandler
         * 为控制类实例初始化 dom 事件处理函数。
         *
         * Parameters:
         * instance - {<KTW.LevelRenderer.Handler>} 控制类实例 。
         *
         * Returns:
         * {Function}
         */
        function initDomHandler(instance) {
            var domHandlerNames = [
                'resize', 'click', 'dblclick',
                'mousewheel', 'mousemove', 'mouseout', 'mouseup', 'mousedown',
                'touchstart', 'touchend', 'touchmove'
            ];

            var len = domHandlerNames.length;
            while (len--) {
                var name = domHandlerNames[len];
                instance['_' + name + 'Handler'] = bind1Arg(domHandlers[name], instance);
            }
        }

        /**
         * Method: findHover
         * 迭代函数，查找 hover 到的图形元素并即时做些事件分发。
         *
         * Parameters:
         * shape - {Object} 图形。
         * x - {Number} 鼠标 x。
         * y - {Number} 鼠标 y。
         *
         * Returns:
         * {Boolean} 是否找到图形。
         *
         */
        function findHover(shape, x, y) {
            var me = this;
            if (
                (me._draggingTarget && me._draggingTarget.id == shape.id) // 迭代到当前拖拽的图形上
                || shape.isSilent() // 打酱油的路过，啥都不响应的shape~
            ) {
                return false;
            }

            var event = me._event;
            if (shape.isCover(x, y)) {
                if (shape.hoverable) {
                    // SMIC-修改 - start
                    if (shape.isHoverByRefDataID && shape.isHoverByRefDataID === true) {
                        if (shape.refDataID) {
                            var fid = shape.refDataID;
                            //me.painter.clearHover();
                            //me.storage.delHover();

                            var hoverGroup = null;
                            if (shape.refDataHoverGroup) {
                                hoverGroup = shape.refDataHoverGroup;
                            }

                            //查找同一个用户数据 feature 的所有图形
                            var shapeList = me.storage._shapeList;
                            for (var i = 0, len = shapeList.length; i < len; i++) {
                                var si = shapeList[i];
                                if (si.refDataID && fid === si.refDataID) {
                                    if (hoverGroup) {
                                        if (si.refDataHoverGroup && hoverGroup === si.refDataHoverGroup) {
                                            me.storage.addHover(si);
                                        }
                                    } else {
                                        me.storage.addHover(si);
                                    }
                                }
                            }
                        }
                    } else {
                        me.storage.addHover(shape);
                    }
                    //初始代码：
                    //  me.storage.addHover(shape);
                    // SMIC-修改 - end
                }
                // 查找是否在 clipShape 中
                var p = shape.parent;
                while (p) {
                    if (p.clipShape && !p.clipShape.isCover(me._mouseX, me._mouseY)) {
                        // 已经被祖先 clip 掉了
                        return false;
                    }
                    p = p.parent;
                }

                if (me._lastHover != shape) {
                    me._processOutShape(event);

                    // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE事件
                    me._processDragLeave(event);

                    me._lastHover = shape;

                    // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGENTER事件
                    me._processDragEnter(event);
                }

                me._processOverShape(event);

                // 可能出现SuperMap.LevelRenderer.Config.EVENT.DRAGOVER
                me._processDragOver(event);

                me._hasfound = 1;

                return true;    // 找到则中断迭代查找
            }

            return false;
        }

        // 辅助函数 end
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._lastX = null;
        this._lastY = null;
        this._mouseX = null;
        this._mouseY = null;
        this._findHover = null;

        __WEBPACK_IMPORTED_MODULE_1__Eventful__["a" /* Eventful */].prototype.destroy.apply(this, arguments);
    }


    /**
     * APIMethod: on
     * 自定义事件绑定。
     *
     * Parameters:
     * eventName - {string} 事件名称，resize、hover、drag 等。
     * handler - {Function} 响应函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Handler>} this。
     */
    on(eventName, handler) {
        this.bind(eventName, handler);
        return this;
    }


    /**
     * APIMethod: un
     * 自定义事件解除绑定。
     *
     * Parameters:
     * eventName - {string} 事件名称，resize、hover、drag 等。
     * handler - {Function} 响应函数。
     *
     * Returns:
     * {<KTW.LevelRenderer.Handler>} this。
     */
    un(eventName, handler) {
        this.unbind(eventName, handler);
        return this;
    }


    /**
     * APIMethod: trigger
     * 事件触发。
     *
     * Parameters:
     * eventName - {string} 事件名称，resize、hover、drag 等。
     * eventArgs - {event} dom事件对象。
     *
     */
    trigger(eventName, eventArgs) {
        var EVENT = __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT;
        switch (eventName) {
            case EVENT.RESIZE:
            case EVENT.CLICK:
            case EVENT.DBLCLICK:
            case EVENT.MOUSEWHEEL:
            case EVENT.MOUSEMOVE:
            case EVENT.MOUSEDOWN:
            case EVENT.MOUSEUP:
            case EVENT.MOUSEOUT:
                this['_' + eventName + 'Handler'](eventArgs);
                break;
        }
    }


    /**
     * APIMethod: dispose
     * 释放，解绑所有事件。
     */
    dispose() {
        var root = this.root;

        if (window.removeEventListener) {
            window.removeEventListener('resize', this._resizeHandler);

            if (__WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_env.os.tablet || __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_env.os.phone) {
                // mobile支持
                root.removeEventListener('touchstart', this._touchstartHandler);
                root.removeEventListener('touchmove', this._touchmoveHandler);
                root.removeEventListener('touchend', this._touchendHandler);
            } else {
                // mobile的click自己模拟
                root.removeEventListener('click', this._clickHandler);
                root.removeEventListener('dblclick', this._dblclickHandler);
                root.removeEventListener('mousewheel', this._mousewheelHandler);
                root.removeEventListener('mousemove', this._mousemoveHandler);
                root.removeEventListener('mousedown', this._mousedownHandler);
                root.removeEventListener('mouseup', this._mouseupHandler);
            }
            root.removeEventListener('DOMMouseScroll', this._mousewheelHandler);
            root.removeEventListener('mouseout', this._mouseoutHandler);
        } else {
            window.detachEvent('onresize', this._resizeHandler);

            root.detachEvent('onclick', this._clickHandler);
            root.detachEvent('dblclick', this._dblclickHandler);
            root.detachEvent('onmousewheel', this._mousewheelHandler);
            root.detachEvent('onmousemove', this._mousemoveHandler);
            root.detachEvent('onmouseout', this._mouseoutHandler);
            root.detachEvent('onmousedown', this._mousedownHandler);
            root.detachEvent('onmouseup', this._mouseupHandler);
        }

        this.root = null;
        this._domHover = null;
        this.storage = null;
        this.painter = null;

        this.un();
    }


    /**
     * Method: _processDragStart
     * 拖拽开始。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragStart(event) {
        var _lastHover = this._lastHover;

        if (this._isMouseDown
            && _lastHover
            && _lastHover.draggable
            && !this._draggingTarget
            && this._mouseDownTarget == _lastHover
        ) {
            // 拖拽点击生效时长阀门，某些场景需要降低拖拽敏感度
            if (_lastHover.dragEnableTime &&
                new Date() - this._lastMouseDownMoment < _lastHover.dragEnableTime
            ) {
                return;
            }

            var _draggingTarget = _lastHover;
            this._draggingTarget = _draggingTarget;
            this._isDragging = 1;

            _draggingTarget.invisible = true;
            this.storage.mod(_draggingTarget.id);

            // 分发 Config.EVENT.DRAGSTART事件
            this._dispatchAgency(
                _draggingTarget,
                __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DRAGSTART,
                event
            );
            this.painter.refresh();
        }
    }


    /**
     * Method: _processDragEnter
     * 拖拽进入目标元素。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragEnter(event) {
        if (this._draggingTarget) {
            // 分发KTW.LevelRenderer.Config.EVENT.DRAGENTER事件
            this._dispatchAgency(
                this._lastHover,
                __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DRAGENTER,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDragOver
     * 拖拽在目标元素上移动。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragOver(event) {
        if (this._draggingTarget) {
            // 分发KTW.LevelRenderer.Config.EVENT.DRAGOVER事件
            this._dispatchAgency(
                this._lastHover,
                __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DRAGOVER,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDragLeave
     * 拖拽离开目标元素。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragLeave(event) {
        if (this._draggingTarget) {
            // 分发KTW.LevelRenderer.Config.EVENT.DRAGLEAVE事件
            this._dispatchAgency(
                this._lastHover,
                __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DRAGLEAVE,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDrop
     * 拖拽在目标元素上完成。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDrop(event) {
        if (this._draggingTarget) {
            this._draggingTarget.invisible = false;
            this.storage.mod(this._draggingTarget.id);
            this.painter.refresh();

            // 分发KTW.LevelRenderer.Config.EVENT.DROP事件
            this._dispatchAgency(
                this._lastHover,
                __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DROP,
                event,
                this._draggingTarget
            );
        }
    }


    /**
     * Method: _processDragEnd
     * 拖拽结束。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processDragEnd(event) {
        if (this._draggingTarget) {
            // 分发KTW.LevelRenderer.Config.EVENT.DRAGEND事件
            this._dispatchAgency(
                this._draggingTarget,
                __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.DRAGEND,
                event
            );

            this._lastHover = null;
        }

        this._isDragging = 0;
        this._draggingTarget = null;
    }


    /**
     * Method: _processOverShape
     * 鼠标在某个图形元素上移动。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processOverShape(event) {
        // 分发KTW.LevelRenderer.Config.EVENT.MOUSEOVER事件
        this._dispatchAgency(this._lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.MOUSEOVER, event);
    }


    /**
     * Method: _processOutShape
     * 鼠标离开某个图形元素。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _processOutShape(event) {
        // 分发KTW.LevelRenderer.Config.EVENT.MOUSEOUT事件
        this._dispatchAgency(this._lastHover, __WEBPACK_IMPORTED_MODULE_2__Config__["a" /* Config */].EVENT.MOUSEOUT, event);
    }


    /**
     * Method: _dispatchAgency
     * 鼠标离开某个图形元素。
     *
     * Parameters:
     * targetShape - {Object} 目标图形元素。
     * eventName - {Object} 事件名称。
     * event - {Object} 事件对象。
     * draggedShape - {Object} 拖拽事件特有，当前被拖拽图形元素。
     *
     */
    _dispatchAgency(targetShape, eventName, event, draggedShape) {
        var eventHandler = 'on' + eventName;
        var eventPacket = {
            type: eventName,
            event: event,
            target: targetShape,
            cancelBubble: false
        };

        var el = targetShape;

        if (draggedShape) {
            eventPacket.dragged = draggedShape;
        }

        while (el) {
            el[eventHandler]
            && (eventPacket.cancelBubble = el[eventHandler](eventPacket));
            el.dispatch(eventName, eventPacket);

            el = el.parent;

            if (eventPacket.cancelBubble) {
                break;
            }
        }

        if (targetShape) {
            // 冒泡到顶级 zrender 对象
            if (!eventPacket.cancelBubble) {
                this.dispatch(eventName, eventPacket);
            }
        } else if (!draggedShape) {
            // 无hover目标，无拖拽对象，原生事件分发
            this.dispatch(eventName, {
                type: eventName,
                event: event
            });
        }
    }


    /**
     * Method: _iterateAndFindHover
     * 迭代寻找 hover shape。
     *
     */
    _iterateAndFindHover() {
        var invTransform = __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_matrix.create();

        var list = this.storage.getShapeList();
        var currentZLevel;
        var currentLayer;
        var tmp = [0, 0];
        for (var i = list.length - 1; i >= 0; i--) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                currentLayer = this.painter.getLayer(shape.zlevel, currentLayer);
                tmp[0] = this._mouseX;
                tmp[1] = this._mouseY;

                if (currentLayer.needTransform) {
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_matrix.invert(invTransform, currentLayer.transform);
                    __WEBPACK_IMPORTED_MODULE_3__SUtil__["a" /* SUtil */].Util_vector.applyTransform(tmp, tmp, invTransform);
                }
            }

            if (this._findHover(shape, tmp[0], tmp[1])) {
                break;
            }
        }
    }


    /**
     * Method: _mobildFindFixed
     * touch 有指尖错觉，四向尝试，让touch上的点击更好触发事件。
     *
     * Parameters:
     * event - {Object} 事件对象。
     *
     */
    _mobildFindFixed(event) {
        // touch指尖错觉的尝试偏移量配置
        var MOBILE_TOUCH_OFFSETS = [
            {x: 10},
            {x: -20},
            {x: 10, y: 10},
            {y: -20}
        ];

        this._lastHover = null;
        this._mouseX = event.zrenderX;
        this._mouseY = event.zrenderY;

        this._event = event;

        this._iterateAndFindHover();

        for (var i = 0; !this._lastHover && i < MOBILE_TOUCH_OFFSETS.length; i++) {
            var offset = MOBILE_TOUCH_OFFSETS[i];
            offset.x && (this._mouseX += offset.x);
            offset.y && (this._mouseX += offset.y);

            this._iterateAndFindHover();
        }

        if (this._lastHover) {
            event.zrenderX = this._mouseX;
            event.zrenderY = this._mouseY;
        }
    }


    /**
     * Method: _zrenderEventFixed
     * 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标 。
     *
     * Parameters:
     * event - {Object} 事件。
     * isTouch - {Boolean} 是否触摸。
     *
     */
    _zrenderEventFixed(event, isTouch) {
        if (event.zrenderFixed) {
            return event;
        }

        if (!isTouch) {
            event = event || window.event;
            // 进入对象优先~
            var target = event.toElement
                || event.relatedTarget
                || event.srcElement
                || event.target;

            if (target && target != this._domHover) {
                event.zrenderX = (typeof event.offsetX != 'undefined'
                    ? event.offsetX
                    : event.layerX)
                    + target.offsetLeft;
                event.zrenderY = (typeof event.offsetY != 'undefined'
                    ? event.offsetY
                    : event.layerY)
                    + target.offsetTop;
            }
        } else {
            var touch = event.type != 'touchend'
                ? event.targetTouches[0]
                : event.changedTouches[0];
            if (touch) {
                var rBounding = this.root.getBoundingClientRect();
                // touch事件坐标是全屏的~
                event.zrenderX = touch.clientX - rBounding.left;
                event.zrenderY = touch.clientY - rBounding.top;
            }
        }

        event.zrenderFixed = 1;
        return event;
    }


    // SMIC-方法扩展 - start
    /**
     * Method: getLastHoverOne
     * 获取单个高亮图形。
     *
     */
    getLastHoverOne() {
        if (this._lastHover) {
            return this._lastHover;
        }
        return null;
    }

    // SMIC-方法扩展 - end

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Handler = Handler;

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Animator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Eventful__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Clip__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SUtil__ = __webpack_require__(3);







/**
 * @private
 * @class KTW.LevelRenderer.Animation
 * @classdesc 动画主类, 调度和管理所有动画控制器。
 * @extends KTW.LevelRenderer.Eventful
 */
class Animation extends __WEBPACK_IMPORTED_MODULE_3__Eventful__["a" /* Eventful */] {
    /*
     * Constructor: KTW.LevelRenderer.Animation
     * 构造函数。
     *
     * Parameters:
     * options - {Object} 动画参数选项，可设属性如下：
     *
     * Symbolizer properties:
     * onframe - {Object} onframe。
     * stage - {Object} stage。
     *
     * (code)
     *     var animation = new KTW.LevelRenderer.Animation();
     *     var obj = {
     *         x: 100,
     *         y: 100
     *     };
     *     animation.animate(node.position)
     *         .when(1000, {
     *             x: 500,
     *             y: 500
     *         })
     *         .when(2000, {
     *             x: 100,
     *             y: 100
     *         })
     *         .start('spline');
     * (end)
     */
    constructor(options) {
        super(options);

        options = options || {};
        /**
         * Property: stage
         * {Object}
         *
         */
        this.stage = {};

        /**
         * Property: onframe
         * {Object}
         *
         */
        this.onframe = function () {
        };

        /**
         * Property: _clips
         * {Array}
         *
         */
        this._clips = [];

        /**
         * Property: _running
         * {Boolean}
         *
         */
        this._running = false;

        /**
         * Property: _time
         * {Number}
         *
         */
        this._time = 0;

        Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["m" /* extend */])(this, options);

        this.CLASS_NAME = "KTW.LevelRenderer.Animation";

    }


    /**
     * APIMethod: add
     * 添加动画片段
     *
     * Parameters:
     * clip - {<KTW.LevelRenderer.Animation.Clip>} 动画片段
     *
     */
    add(clip) {
        this._clips.push(clip);
    }


    /**
     * APIMethod: remove
     * 删除动画片段
     *
     * Parameters:
     * clip - {<KTW.LevelRenderer.Animation.Clip>} 动画片段
     *
     */
    remove(clip) {
        var idx = new __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* Util */]().indexOf(this._clips, clip);
        if (idx >= 0) {
            this._clips.splice(idx, 1);
        }
    }


    /**
     * Method: _update
     *
     */
    _update() {
        var time = new Date().getTime();
        var delta = time - this._time;
        var clips = this._clips;
        var len = clips.length;

        var deferredEvents = [];
        var deferredClips = [];
        for (let i = 0; i < len; i++) {
            var clip = clips[i];
            var e = clip.step(time);
            // Throw out the events need to be called after
            // stage.update, like destroy
            if (e) {
                deferredEvents.push(e);
                deferredClips.push(clip);
            }
        }
        if (this.stage.update) {
            this.stage.update();
        }

        // Remove the finished clip
        for (let i = 0; i < len;) {
            if (clips[i]._needsRemove) {
                clips[i] = clips[len - 1];
                clips.pop();
                len--;
            } else {
                i++;
            }
        }

        len = deferredEvents.length;
        for (let i = 0; i < len; i++) {
            deferredClips[i].fire(deferredEvents[i]);
        }

        this._time = time;

        this.onframe(delta);

        this.dispatch('frame', delta);
    }


    /**
     * APIMethod: start
     * 开始运行动画
     *
     */
    start() {
        var requestAnimationFrame = window.requestAnimationFrame
            || window.msRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || function (func) {
                setTimeout(func, 16);
            };

        var self = this;

        this._running = true;

        function step() {
            if (self._running) {
                self._update();
                requestAnimationFrame(step);
            }
        }

        this._time = new Date().getTime();
        requestAnimationFrame(step);
    }


    /**
     * APIMethod: stop
     * 停止运行动画
     *
     */
    stop() {
        this._running = false;
    }


    /**
     * APIMethod: clear
     * 清除所有动画片段
     *
     */
    clear() {
        this._clips = [];
    }


    /**
     * Method: animate
     * 对一个目标创建一个animator对象，可以指定目标中的属性使用动画
     *
     * Parameters:
     * target - {Object} target
     * options - {Object} 动画参数选项，可设属性如下：
     *
     * Symbolizer properties:
     * loop - {Boolean} 是否循环播放动画。默认值：false。
     * getter - {Function} 如果指定getter函数，会通过getter函数取属性值。默认值：null。
     * setter - {Function} 如如果指定setter函数，会通过setter函数设置属性值。默认值：null。
     *
     * Returns:
     * {<KTW.LevelRenderer.Animation.Animator>} Animator
     */
    animate(target, options) {
        options = options || {};
        var deferred = new Animator(
            target,
            options.loop,
            options.getter,
            options.setter
        );
        deferred.animation = this;
        return deferred;
    }

    static _interpolateNumber(p0, p1, percent) {
        return (p1 - p0) * percent + p0;
    }

    static _interpolateArray(p0, p1, percent, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (let i = 0; i < len; i++) {
                out[i] = Animation._interpolateNumber(p0[i], p1[i], percent);
            }
        } else {
            var len2 = p0[0].length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len2; j++) {
                    out[i][j] = Animation._interpolateNumber(
                        p0[i][j], p1[i][j], percent
                    );
                }
            }
        }
    }

    static _isArrayLike(data) {
        switch (typeof data) {
            case 'undefined':
            case 'string':
                return false;
        }

        return typeof data.length !== 'undefined';
    }

    static _catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (let i = 0; i < len; i++) {
                out[i] = Animation._catmullRomInterpolate(
                    p0[i], p1[i], p2[i], p3[i], t, t2, t3
                );
            }
        } else {
            var len2 = p0[0].length;
            for (let i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    out[i][j] = Animation._catmullRomInterpolate(
                        p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                        t, t2, t3
                    );
                }
            }
        }
    }

    static _catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        return (2 * (p1 - p2) + v0 + v1) * t3
            + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
            + v0 * t + p1;
    }

    static _cloneValue(value) {
        var arraySlice = Array.prototype.slice;

        if (Animation._isArrayLike(value)) {
            var len = value.length;
            if (Animation._isArrayLike(value[0])) {
                var ret = [];
                for (var i = 0; i < len; i++) {
                    ret.push(arraySlice.call(value[i]));
                }
                return ret;
            } else {
                return arraySlice.call(value);
            }
        } else {
            return value;
        }
    }

    static rgba2String(rgba) {
        rgba[0] = Math.floor(rgba[0]);
        rgba[1] = Math.floor(rgba[1]);
        rgba[2] = Math.floor(rgba[2]);

        return 'rgba(' + rgba.join(',') + ')';
    }
};

/**
 * @private
 * @class KTW.LevelRenderer.Animation.Animator
 */
class Animator {

    /*
     * Constructor: KTW.LevelRenderer.Animation.Animator
     * 构造函数。
     *
     * Parameters:
     * target - {Object} target
     * loop - {Boolean} 是否循环播放动画。默认值：false。
     * getter - {Function} 如果指定getter函数，会通过getter函数取属性值。默认值：null。
     * setter - {Function} 如如果指定setter函数，会通过setter函数设置属性值。默认值：null。
     *
     */
    constructor(target, loop, getter, setter) {
        /**
         * Property: _tracks
         * {Object}
         */
        this._tracks = {};

        /**
         * Property: _target
         * {Object}
         */
        this._target = target;

        /**
         * Property: _loop
         * {Boolean}
         */
        this._loop = loop || false;

        /**
         * Property: _getter
         * {Function}
         */
        this._getter = getter || _defaultGetter;

        /**
         * Property: _setter
         * {Function}
         */
        this._setter = setter || _defaultSetter;

        /**
         * Property: _clipCount
         * {Number}
         */
        this._clipCount = 0;

        /**
         * Property: _delay
         * {Number}
         */
        this._delay = 0;

        /**
         * Property: _doneList
         * {Array}
         */
        this._doneList = [];

        /**
         * Property: _onframeList
         * {Array}
         */
        this._onframeList = [];

        /**
         * Property: _clipList
         * {Array}
         */
        this._clipList = [];
        this.CLASS_NAME = "KTW.LevelRenderer.Animation.Animator";
        //Function
        function _defaultGetter(target, key) {
            return target[key];
        }

        function _defaultSetter(target, key, value) {
            target[key] = value;
        }
    }


    /**
     * Method: when
     * 设置动画关键帧
     *
     * Parameters:
     * time - {Number} 关键帧时间，单位是ms
     * props - {Object} 关键帧的属性值，key-value表示
     *
     * Returns:
     * {<KTW.LevelRenderer.Animation.Animator>} Animator
     */
    when(time /* ms */, props) {
        for (var propName in props) {
            if (!this._tracks[propName]) {
                this._tracks[propName] = [];
                // If time is 0
                //  Then props is given initialize value
                // Else
                //  Initialize value from current prop value
                if (time !== 0) {
                    this._tracks[propName].push({
                        time: 0,
                        value: Animation._cloneValue(
                            this._getter(this._target, propName)
                        )
                    });
                }
            }
            this._tracks[propName].push({
                time: parseInt(time, 10),
                value: props[propName]
            });
        }
        return this;
    }


    /**
     * Method: during
     * 添加动画每一帧的回调函数
     *
     * Parameters:
     * callback - {Function} callback
     *
     * Returns:
     * {<KTW.LevelRenderer.Animation.Animator>} Animator
     */
    during(callback) {
        this._onframeList.push(callback);
        return this;
    }


    /**
     * Method: start
     * 开始执行动画
     *
     * Parameters:
     * easing - {String|Function} 动画缓动函数。详见：<KTW.LevelRenderer.Animation.easing>。
     *
     * Returns:
     * {<KTW.LevelRenderer.Animation.Animator>} Animator
     */
    start(easing) {
        var self = this;
        var setter = this._setter;
        var getter = this._getter;
        var onFrameListLen = self._onframeList.length;
        var useSpline = easing === 'spline';

        var ondestroy = function () {
            self._clipCount--;
            if (self._clipCount === 0) {
                // Clear all tracks
                self._tracks = {};

                var len = self._doneList.length;
                for (var i = 0; i < len; i++) {
                    self._doneList[i].call(self);
                }
            }
        };

        var createTrackClip = function (keyframes, propName) {
            var trackLen = keyframes.length;
            if (!trackLen) {
                return;
            }
            // Guess data type
            var firstVal = keyframes[0].value;
            var isValueArray = Animation._isArrayLike(firstVal);
            var isValueColor = false;

            // For vertices morphing
            var arrDim = (
                isValueArray
                && Animation._isArrayLike(firstVal[0])
            )
                ? 2 : 1;
            // Sort keyframe as ascending
            keyframes.sort(function (a, b) {
                return a.time - b.time;
            });
            var trackMaxTime = keyframes[trackLen - 1].time;
            // Percents of each keyframe
            var kfPercents = [];
            // Value of each keyframe
            var kfValues = [];
            for (let i = 0; i < trackLen; i++) {
                kfPercents.push(keyframes[i].time / trackMaxTime);
                // Assume value is a color when it is a string
                var value = keyframes[i].value;
                if (typeof(value) == 'string') {
                    value = __WEBPACK_IMPORTED_MODULE_5__SUtil__["a" /* SUtil */].Util_color.toArray(value);
                    if (value.length === 0) {    // Invalid color
                        value[0] = value[1] = value[2] = 0;
                        value[3] = 1;
                    }
                    isValueColor = true;
                }
                kfValues.push(value);
            }

            // Cache the key of last frame to speed up when
            // animation playback is sequency
            var cacheKey = 0;
            var cachePercent = 0;
            var start;
            var i;
            var w;
            var p0;
            var p1;
            var p2;
            var p3;


            if (isValueColor) {
                var rgba = [0, 0, 0, 0];
            }

            var onframe = function (target, percent) {
                // Find the range keyframes
                // kf1-----kf2---------current--------kf3
                // find kf2 and kf3 and do interpolation
                if (percent < cachePercent) {
                    // Start from next key
                    start = Math.min(cacheKey + 1, trackLen - 1);
                    for (i = start; i >= 0; i--) {
                        if (kfPercents[i] <= percent) {
                            break;
                        }
                    }
                    i = Math.min(i, trackLen - 2);
                } else {
                    for (i = cacheKey; i < trackLen; i++) {
                        if (kfPercents[i] > percent) {
                            break;
                        }
                    }
                    i = Math.min(i - 1, trackLen - 2);
                }
                cacheKey = i;
                cachePercent = percent;

                var range = (kfPercents[i + 1] - kfPercents[i]);
                if (range === 0) {
                    return;
                } else {
                    w = (percent - kfPercents[i]) / range;
                }
                if (useSpline) {
                    p1 = kfValues[i];
                    p0 = kfValues[i === 0 ? i : i - 1];
                    p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                    p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                    if (isValueArray) {
                        Animation._catmullRomInterpolateArray(
                            p0, p1, p2, p3, w, w * w, w * w * w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        let value;
                        if (isValueColor) {
                            // value = KTW.LevelRenderer.Animation._catmullRomInterpolateArray(
                            //     p0, p1, p2, p3, w, w * w, w * w * w,
                            //     rgba, 1
                            // );
                            value = Animation.rgba2String(rgba);
                        } else {
                            value = Animation._catmullRomInterpolate(
                                p0, p1, p2, p3, w, w * w, w * w * w
                            );
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                } else {
                    if (isValueArray) {
                        Animation._interpolateArray(
                            kfValues[i], kfValues[i + 1], w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        let value;
                        if (isValueColor) {
                            Animation._interpolateArray(
                                kfValues[i], kfValues[i + 1], w,
                                rgba, 1
                            );
                            value = Animation.rgba2String(rgba);
                        } else {
                            value = Animation._interpolateNumber(kfValues[i], kfValues[i + 1], w);
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                }

                for (i = 0; i < onFrameListLen; i++) {
                    self._onframeList[i](target, percent);
                }
            };

            var clip = new __WEBPACK_IMPORTED_MODULE_4__Clip__["a" /* Clip */]({
                target: self._target,
                life: trackMaxTime,
                loop: self._loop,
                delay: self._delay,
                onframe: onframe,
                ondestroy: ondestroy
            });

            if (easing && easing !== 'spline') {
                clip.easing = easing;
            }
            self._clipList.push(clip);
            self._clipCount++;
            self.animation.add(clip);
        };

        for (var propName in this._tracks) {
            createTrackClip(this._tracks[propName], propName);
        }
        return this;
    }


    /**
     * Method: stop
     * 停止动画
     */
    stop() {
        for (var i = 0; i < this._clipList.length; i++) {
            var clip = this._clipList[i];
            this.animation.remove(clip);
        }
        this._clipList = [];
    }


    /**
     * Method: delay
     * 设置动画延迟开始的时间
     *
     * Parameters:
     * time - {Number} time 单位ms
     *
     * Returns:
     * {<KTW.LevelRenderer.Animation.Animator>} Animator
     */
    delay(time) {
        this._delay = time;
        return this;
    }


    /**
     * Method: done
     * 添加动画结束的回调
     *
     * Parameters:
     * cb - {Function} Function
     *
     * Returns:
     * {<KTW.LevelRenderer.Animation.Animator>} Animator
     */
    done(cb) {
        if (cb) {
            this._doneList.push(cb);
        }
        return this;
    }

};


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Animation = Animation;


__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Animation.Animator = Animator;




/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Clip; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Easing__ = __webpack_require__(48);



/**
 * @private
 * @class  SuperMap.LevelRenderer.Animation.Clip
 * 动画片段
 *
 */
class Clip {


    /**
     * 动画主控制器
     * @config target
     * @config life(1000)
     * @config delay(0)
     * @config loop(true)
     * @config gap(0)
     * @config onframe
     * @config easing(optional)
     * @config ondestroy(optional)
     * @config onrestart(optional)
     */


    /**
     * Constructor: SuperMap.LevelRenderer.Animation.Clip
     * 构造函数。
     *
     *
     * Parameters:
     * options - {Object} 可选参数：
     *
     * Symbolizer properties:
     * target - {Object} 动画对象，可以是数组，如果是数组的话会批量分发 onframe 等事件。
     * life - {Number} 动画时长，默认值：1000。
     * delay - {Number}  动画延迟时间。默认值：0。
     * loop - {Boolean}  是否循环，默认值：true。
     * gap - {Number}  循环的间隔时间。默认值：0。
     * onframe - {Object}  帧。
     * easing - {Boolean}
     * ondestroy - {Boolean}
     * onrestart - {Boolean}
     *
     */
    constructor(options) {
        this._targetPool = options.target || {};
        if (!(this._targetPool instanceof Array)) {
            this._targetPool = [this._targetPool];
        }

        // 生命周期
        this._life = options.life || 1000;
        // 延时
        this._delay = options.delay || 0;
        // 开始时间
        this._startTime = new Date().getTime() + this._delay;// 单位毫秒

        // 结束时间
        this._endTime = this._startTime + this._life * 1000;

        // 是否循环
        this.loop = typeof options.loop == 'undefined'
            ? false : options.loop;

        this.gap = options.gap || 0;

        this.easing = options.easing || 'Linear';

        this.onframe = options.onframe;
        this.ondestroy = options.ondestroy;
        this.onrestart = options.onrestart;
        this.CLASS_NAME = "SuperMap.LevelRenderer.Animation.Clip";
    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {

    }

    step(time) {
        var easing = new __WEBPACK_IMPORTED_MODULE_1__Easing__["a" /* Easing */]();
        var percent = (time - this._startTime) / this._life;

        // 还没开始
        if (percent < 0) {
            return;
        }

        percent = Math.min(percent, 1);

        var easingFunc = typeof this.easing == 'string'
            ? easing[this.easing]
            : this.easing;
        var schedule = typeof easingFunc === 'function'
            ? easingFunc(percent)
            : percent;

        this.fire('frame', schedule);

        // 结束
        if (percent == 1) {
            if (this.loop) {
                this.restart();
                // 重新开始周期
                // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                return 'restart';

            }

            // 动画完成将这个控制器标识为待删除
            // 在Animation.update中进行批量删除
            this._needsRemove = true;
            return 'destroy';
        }

        return null;
    }

    restart() {
        var time = new Date().getTime();
        var remainder = (time - this._startTime) % this._life;
        this._startTime = new Date().getTime() - remainder + this.gap;
    }

    fire(eventType, arg) {
        for (var i = 0, len = this._targetPool.length; i < len; i++) {
            if (this['on' + eventType]) {
                this['on' + eventType](this._targetPool[i], arg);
            }
        }
    }
};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Animation.Clip = Clip;

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Easing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);

/**
 * @private
 * @class  KTW.LevelRenderer.Animation.easing
 * 缓动
 */
class Easing {

    /*
     * Constructor: KTW.LevelRenderer.Animation.easing
     * 构造函数。
     *
     */
    constructor() {
        this.CLASS_NAME = "KTW.LevelRenderer.Animation.easing";
    }


    /*
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {

    }


    // 线性
    /*
     * @param {number} k
     * @return {number} 返回输入值
     */
    Linear(k) {
        return k;
    }


    // 二次方的缓动（t^2）
    /*
     * @param {number} k
     * @return {number} 返回二次方的缓动的值
     */
    QuadraticIn(k) {
        return k * k;
    }

    /*
     * @param {number} k
     * @return {number} 返回按二次方缓动退出的值
     */
    QuadraticOut(k) {
        return k * (2 - k);
    }

    /*
     * @param {number} k
     * @return {number} 返回按二次方缓动进入和退出的值
     */
    QuadraticInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    }


    // 三次方的缓动（t^3）
    /*
     * @param {number} k
     * @return {number} 返回按三次方缓动的值
     */
    CubicIn(k) {
        return k * k * k;
    }

    /*
     * @param {number} k
     * @return {number} 返回按三次方缓动退出的值
     */
    CubicOut(k) {
        return --k * k * k + 1;
    }

    /*
     * @param {number} k
     * @return {number} 返回按三次方缓动进入退出的值
     */
    CubicInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    }


    // 四次方的缓动（t^4）
    /*
     * @param {number} k
     * @return {number} 返回按四次方缓动进入的值
     */
    QuarticIn(k) {
        return k * k * k * k;
    }

    /*
     * @param {number} k
     * @return {number} 返回按四次方缓动退出的值
     */
    QuarticOut(k) {
        return 1 - (--k * k * k * k);
    }

    /*
     * @param {number} k
     * @return {number} 返回按四次方缓动进入退出的值
     */
    QuarticInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    }


    // 五次方的缓动（t^5）
    /*
     * @param {number} k
     * @return {number} 返回按五次方缓动的值
     */
    QuinticIn(k) {
        return k * k * k * k * k;
    }

    /*
     * @param {number} k
     * @return {number} 返回按五次方缓动退出的值
     */
    QuinticOut(k) {
        return --k * k * k * k * k + 1;
    }

    /*
     * @param {number} k
     * @return {number} 返回按五次方缓动进入退出的值
     */
    QuinticInOut(k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }


    // 正弦曲线的缓动（sin(t)）
    /*
     * @param {number} k
     * @return {number} 返回按正弦曲线的缓动进入的值
     */
    SinusoidalIn(k) {
        return 1 - Math.cos(k * Math.PI / 2);
    }

    /*
     * @param {number} k
     * @return {number} 返回按正弦曲线的缓动退出的值
     */
    SinusoidalOut(k) {
        return Math.sin(k * Math.PI / 2);
    }

    /*
     * @param {number} k
     * @return {number} 返回按正弦曲线的缓动进入退出的值
     */
    SinusoidalInOut(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    }


    // 指数曲线的缓动（2^t）
    /*
     * @param {number} k
     * @return {number} 返回按指数曲线的缓动进入的值
     */
    ExponentialIn(k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    }

    /*
     * @param {number} k
     * @return {number} 返回按指数曲线的缓动退出的值
     */
    ExponentialOut(k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    }

    /*
     * @param {number} k
     * @return {number} 返回按指数曲线的缓动进入退出的值
     */
    ExponentialInOut(k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }


    // 圆形曲线的缓动（sqrt(1-t^2)）
    /*
     * @param {number} k
     * @return {number} 返回按圆形曲线的缓动进入的值
     */
    CircularIn(k) {
        return 1 - Math.sqrt(1 - k * k);
    }

    /*
     * @param {number} k
     * @return {number} 返回按圆形曲线的缓动退出的值
     */
    CircularOut(k) {
        return Math.sqrt(1 - (--k * k));
    }

    /*
     * @param {number} k
     * @return {number} 返回按圆形曲线的缓动进入退出的值
     */
    CircularInOut(k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }


    // 创建类似于弹簧在停止前来回振荡的动画
    /*
     * @param {number} k
     * @return {number} 返回按类似于弹簧在停止前来回振荡的动画的缓动进入的值
     */
    ElasticIn(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1)) *
            Math.sin((k - s) * (2 * Math.PI) / p));
    }

    /*
     * @param {number} k
     * @return {number} 返回按类似于弹簧在停止前来回振荡的动画的缓动退出的值
     */
    ElasticOut(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k) *
            Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    }

    /*
     * @param {number} k
     * @return {number} 返回按类似于弹簧在停止前来回振荡的动画的缓动进入退出的值
     */
    ElasticInOut(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1))
            * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    }


    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    /*
     * @param {number} k
     * @return {number} 返回按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动进入的值
     */
    BackIn(k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    }

    /*
     * @param {number} k
     * @return {number} 返回按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动退出的值
     */
    BackOut(k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    }

    /*
     * @param {number} k
     * @return {number} 返回按在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动的缓动进入退出的值
     */
    BackInOut(k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }


    // 创建弹跳效果
    /*
     * @param {number} k
     * @return {number} 返回按弹跳效果的缓动进入的值
     */
    BounceIn(k) {
        return 1 - this.BounceOut(1 - k);
    }

    /*
     * @param {number} k
     * @return {number} 返回按弹跳效果的缓动退出的值
     */
    BounceOut(k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        } else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    }

    /*
     * @param {number} k
     * @return {number} 返回按弹跳效果的缓动进入退出的值
     */
    BounceInOut(k) {
        if (k < 0.5) {
            return this.BounceIn(k * 2) * 0.5;
        }
        return this.BounceOut(k * 2 - 1) * 0.5 + 0.5;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.Animation.Easing = Easing;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);






/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "KTW", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Tangram", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendDeep", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "copyExcluce", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["H"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getElement", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "removeItem", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["G"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "indexOf", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "modifyDOMElement", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["E"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyDefaults", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getParameterString", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getWFParameterString", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["w"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "urlAppend", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["L"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getParameters", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IS_GECKO", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Browser", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getBrowser", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportCanvas", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["B"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "supportCanvas", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["I"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isInTheSameDomain", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["A"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toJSON", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["J"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "transformResult", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["K"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "copyAttributes", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "copyAttributesWithClip", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObject", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "newGuid", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["F"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindAsEventListener", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getTopAnalysisResult", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChineseToUtf8", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DeepMerge", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["C"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mixin", function() { return __WEBPACK_IMPORTED_MODULE_0__service_common__["D"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Bar", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Bar3D", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OverlayCircle", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["E"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["B"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Pie", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["I"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OverlayPoint", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["F"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RankSymbol", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["K"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ring", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["M"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeVector", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_5"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeFactory", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["Q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeParameters", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["R"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureCircle", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["w"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureLine", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["J"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturePolygon", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureRectangle", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sector", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["O"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureTheme", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LevelRenderer", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Render", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["L"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Area", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Clip", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ComputeBoundingBox", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LevelRendererCurve", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Env", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LevelRendererEvent", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Eventful", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Http", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Math", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["C"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["D"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Painter", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["H"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PaintLayer", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["G"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["P"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicBrokenLine", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["S"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicCircle", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["T"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicEllipse", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["U"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicImage", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["V"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicIsogon", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["W"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicPoint", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["X"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicPolygon", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["Y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicRectangle", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["Z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicRing", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_0"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicSector", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_1"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicStar", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_2"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmicText", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_3"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_4"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Transformable", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_6"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["_7"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LevelRendererVector", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["A"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SUtil", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay__["N"]; });
﻿


    




 

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Rectangle__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Tangram__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__Base__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["E"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["w"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["D"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["B"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["I"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["F"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["G"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["H"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["C"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_1__Util__["A"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__Rectangle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__Tangram__["a"]; });
﻿



 





  
 

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* @preserve
 * Leaflet 1.3.1+Detached: ba6f97fff8647e724e4dfe66d2ed7da11f908989.ba6f97f, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2017 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
!function(t,i){ true?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i(t.L={})}(this,function(t){"use strict";function i(t){var i,e,n,o;for(e=1,n=arguments.length;e<n;e++){o=arguments[e];for(i in o)t[i]=o[i]}return t}function e(t,i){var e=Array.prototype.slice;if(t.bind)return t.bind.apply(t,e.call(arguments,1));var n=e.call(arguments,2);return function(){return t.apply(i,n.length?n.concat(e.call(arguments)):arguments)}}function n(t){return t._leaflet_id=t._leaflet_id||++ti,t._leaflet_id}function o(t,i,e){var n,o,s,r;return r=function(){n=!1,o&&(s.apply(e,o),o=!1)},s=function(){n?o=arguments:(t.apply(e,arguments),setTimeout(r,i),n=!0)}}function s(t,i,e){var n=i[1],o=i[0],s=n-o;return t===n&&e?t:((t-o)%s+s)%s+o}function r(){return!1}function a(t,i){var e=Math.pow(10,void 0===i?6:i);return Math.round(t*e)/e}function h(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function u(t){return h(t).split(/\s+/)}function l(t,i){t.hasOwnProperty("options")||(t.options=t.options?Qt(t.options):{});for(var e in i)t.options[e]=i[e];return t.options}function c(t,i,e){var n=[];for(var o in t)n.push(encodeURIComponent(e?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(i&&-1!==i.indexOf("?")?"&":"?")+n.join("&")}function _(t,i){return t.replace(ii,function(t,e){var n=i[e];if(void 0===n)throw new Error("No value provided for variable "+t);return"function"==typeof n&&(n=n(i)),n})}function d(t,i){for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1}function p(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}function m(t){var i=+new Date,e=Math.max(0,16-(i-oi));return oi=i+e,window.setTimeout(t,e)}function f(t,i,n){if(!n||si!==m)return si.call(window,e(t,i));t.call(i)}function g(t){t&&ri.call(window,t)}function v(){}function y(t){if("undefined"!=typeof L&&L&&L.Mixin){t=ei(t)?t:[t];for(var i=0;i<t.length;i++)t[i]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}}function x(t,i,e){this.x=e?Math.round(t):t,this.y=e?Math.round(i):i}function w(t,i,e){return t instanceof x?t:ei(t)?new x(t[0],t[1]):void 0===t||null===t?t:"object"==typeof t&&"x"in t&&"y"in t?new x(t.x,t.y):new x(t,i,e)}function P(t,i){if(t)for(var e=i?[t,i]:t,n=0,o=e.length;n<o;n++)this.extend(e[n])}function b(t,i){return!t||t instanceof P?t:new P(t,i)}function T(t,i){if(t)for(var e=i?[t,i]:t,n=0,o=e.length;n<o;n++)this.extend(e[n])}function z(t,i){return t instanceof T?t:new T(t,i)}function M(t,i,e){if(isNaN(t)||isNaN(i))throw new Error("Invalid LatLng object: ("+t+", "+i+")");this.lat=+t,this.lng=+i,void 0!==e&&(this.alt=+e)}function C(t,i,e){return t instanceof M?t:ei(t)&&"object"!=typeof t[0]?3===t.length?new M(t[0],t[1],t[2]):2===t.length?new M(t[0],t[1]):null:void 0===t||null===t?t:"object"==typeof t&&"lat"in t?new M(t.lat,"lng"in t?t.lng:t.lon,t.alt):void 0===i?null:new M(t,i,e)}function Z(t,i,e,n){if(ei(t))return this._a=t[0],this._b=t[1],this._c=t[2],void(this._d=t[3]);this._a=t,this._b=i,this._c=e,this._d=n}function S(t,i,e,n){return new Z(t,i,e,n)}function E(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t,i){var e,n,o,s,r,a,h="";for(e=0,o=t.length;e<o;e++){for(n=0,s=(r=t[e]).length;n<s;n++)a=r[n],h+=(n?"L":"M")+a.x+" "+a.y;h+=i?Xi?"z":"x":""}return h||"M0 0"}function A(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}function I(t,i,e,n){return"touchstart"===i?O(t,e,n):"touchmove"===i?W(t,e,n):"touchend"===i&&H(t,e,n),this}function B(t,i,e){var n=t["_leaflet_"+i+e];return"touchstart"===i?t.removeEventListener(Qi,n,!1):"touchmove"===i?t.removeEventListener(te,n,!1):"touchend"===i&&(t.removeEventListener(ie,n,!1),t.removeEventListener(ee,n,!1)),this}function O(t,i,n){var o=e(function(t){if("mouse"!==t.pointerType&&t.MSPOINTER_TYPE_MOUSE&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE){if(!(ne.indexOf(t.target.tagName)<0))return;$(t)}j(t,i)});t["_leaflet_touchstart"+n]=o,t.addEventListener(Qi,o,!1),se||(document.documentElement.addEventListener(Qi,R,!0),document.documentElement.addEventListener(te,D,!0),document.documentElement.addEventListener(ie,N,!0),document.documentElement.addEventListener(ee,N,!0),se=!0)}function R(t){oe[t.pointerId]=t,re++}function D(t){oe[t.pointerId]&&(oe[t.pointerId]=t)}function N(t){delete oe[t.pointerId],re--}function j(t,i){t.touches=[];for(var e in oe)t.touches.push(oe[e]);t.changedTouches=[t],i(t)}function W(t,i,e){var n=function(t){(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons)&&j(t,i)};t["_leaflet_touchmove"+e]=n,t.addEventListener(te,n,!1)}function H(t,i,e){var n=function(t){j(t,i)};t["_leaflet_touchend"+e]=n,t.addEventListener(ie,n,!1),t.addEventListener(ee,n,!1)}function F(t,i,e){function n(t){var i;if(Ui){if(!Pi||"mouse"===t.pointerType)return;i=re}else i=t.touches.length;if(!(i>1)){var e=Date.now(),n=e-(s||e);r=t.touches?t.touches[0]:t,a=n>0&&n<=h,s=e}}function o(t){if(a&&!r.cancelBubble){if(Ui){if(!Pi||"mouse"===t.pointerType)return;var e,n,o={};for(n in r)e=r[n],o[n]=e&&e.bind?e.bind(r):e;r=o}r.type="dblclick",i(r),s=null}}var s,r,a=!1,h=250;return t[ue+ae+e]=n,t[ue+he+e]=o,t[ue+"dblclick"+e]=i,t.addEventListener(ae,n,!1),t.addEventListener(he,o,!1),t.addEventListener("dblclick",i,!1),this}function U(t,i){var e=t[ue+ae+i],n=t[ue+he+i],o=t[ue+"dblclick"+i];return t.removeEventListener(ae,e,!1),t.removeEventListener(he,n,!1),Pi||t.removeEventListener("dblclick",o,!1),this}function V(t,i,e,n){if("object"==typeof i)for(var o in i)G(t,o,i[o],e);else for(var s=0,r=(i=u(i)).length;s<r;s++)G(t,i[s],e,n);return this}function q(t,i,e,n){if("object"==typeof i)for(var o in i)K(t,o,i[o],e);else if(i)for(var s=0,r=(i=u(i)).length;s<r;s++)K(t,i[s],e,n);else{for(var a in t[le])K(t,a,t[le][a]);delete t[le]}return this}function G(t,i,e,o){var s=i+n(e)+(o?"_"+n(o):"");if(t[le]&&t[le][s])return this;var r=function(i){return e.call(o||t,i||window.event)},a=r;Ui&&0===i.indexOf("touch")?I(t,i,r,s):!Vi||"dblclick"!==i||!F||Ui&&Si?"addEventListener"in t?"mousewheel"===i?t.addEventListener("onwheel"in t?"wheel":"mousewheel",r,!1):"mouseenter"===i||"mouseleave"===i?(r=function(i){i=i||window.event,ot(t,i)&&a(i)},t.addEventListener("mouseenter"===i?"mouseover":"mouseout",r,!1)):("click"===i&&Ti&&(r=function(t){st(t,a)}),t.addEventListener(i,r,!1)):"attachEvent"in t&&t.attachEvent("on"+i,r):F(t,r,s),t[le]=t[le]||{},t[le][s]=r}function K(t,i,e,o){var s=i+n(e)+(o?"_"+n(o):""),r=t[le]&&t[le][s];if(!r)return this;Ui&&0===i.indexOf("touch")?B(t,i,s):!Vi||"dblclick"!==i||!U||Ui&&Si?"removeEventListener"in t?"mousewheel"===i?t.removeEventListener("onwheel"in t?"wheel":"mousewheel",r,!1):t.removeEventListener("mouseenter"===i?"mouseover":"mouseleave"===i?"mouseout":i,r,!1):"detachEvent"in t&&t.detachEvent("on"+i,r):U(t,s),t[le][s]=null}function Y(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,nt(t),this}function X(t){return G(t,"mousewheel",Y),this}function J(t){return V(t,"mousedown touchstart dblclick",Y),G(t,"click",et),this}function $(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Q(t){return $(t),Y(t),this}function tt(t,i){if(!i)return new x(t.clientX,t.clientY);var e=i.getBoundingClientRect(),n=e.width/i.offsetWidth||1,o=e.height/i.offsetHeight||1;return new x(t.clientX/n-e.left-i.clientLeft,t.clientY/o-e.top-i.clientTop)}function it(t){return Pi?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/ce:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0}function et(t){_e[t.type]=!0}function nt(t){var i=_e[t.type];return _e[t.type]=!1,i}function ot(t,i){var e=i.relatedTarget;if(!e)return!0;try{for(;e&&e!==t;)e=e.parentNode}catch(t){return!1}return e!==t}function st(t,i){var e=t.timeStamp||t.originalEvent&&t.originalEvent.timeStamp,n=pi&&e-pi;n&&n>100&&n<500||t.target._simulatedClick&&!t._simulated?Q(t):(pi=e,i(t))}function rt(t){return"string"==typeof t?document.getElementById(t):t}function at(t,i){var e=t.style[i]||t.currentStyle&&t.currentStyle[i];if((!e||"auto"===e)&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);e=n?n[i]:null}return"auto"===e?null:e}function ht(t,i,e){var n=document.createElement(t);return n.className=i||"",e&&e.appendChild(n),n}function ut(t){var i=t.parentNode;i&&i.removeChild(t)}function lt(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function ct(t){var i=t.parentNode;i.lastChild!==t&&i.appendChild(t)}function _t(t){var i=t.parentNode;i.firstChild!==t&&i.insertBefore(t,i.firstChild)}function dt(t,i){if(void 0!==t.classList)return t.classList.contains(i);var e=gt(t);return e.length>0&&new RegExp("(^|\\s)"+i+"(\\s|$)").test(e)}function pt(t,i){if(void 0!==t.classList)for(var e=u(i),n=0,o=e.length;n<o;n++)t.classList.add(e[n]);else if(!dt(t,i)){var s=gt(t);ft(t,(s?s+" ":"")+i)}}function mt(t,i){void 0!==t.classList?t.classList.remove(i):ft(t,h((" "+gt(t)+" ").replace(" "+i+" "," ")))}function ft(t,i){void 0===t.className.baseVal?t.className=i:t.className.baseVal=i}function gt(t){return void 0===t.className.baseVal?t.className:t.className.baseVal}function vt(t,i){"opacity"in t.style?t.style.opacity=i:"filter"in t.style&&yt(t,i)}function yt(t,i){var e=!1,n="DXImageTransform.Microsoft.Alpha";try{e=t.filters.item(n)}catch(t){if(1===i)return}i=Math.round(100*i),e?(e.Enabled=100!==i,e.Opacity=i):t.style.filter+=" progid:"+n+"(opacity="+i+")"}function xt(t){for(var i=document.documentElement.style,e=0;e<t.length;e++)if(t[e]in i)return t[e];return!1}function wt(t,i,e){var n=i||new x(0,0);t.style[pe]=(Oi?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(e?" scale("+e+")":"")}function Lt(t,i){t._leaflet_pos=i,Ni?wt(t,i):(t.style.left=i.x+"px",t.style.top=i.y+"px")}function Pt(t){return t._leaflet_pos||new x(0,0)}function bt(){V(window,"dragstart",$)}function Tt(){q(window,"dragstart",$)}function zt(t){for(;-1===t.tabIndex;)t=t.parentNode;t.style&&(Mt(),ve=t,ye=t.style.outline,t.style.outline="none",V(window,"keydown",Mt))}function Mt(){ve&&(ve.style.outline=ye,ve=void 0,ye=void 0,q(window,"keydown",Mt))}function Ct(t,i){if(!i||!t.length)return t.slice();var e=i*i;return t=kt(t,e),t=St(t,e)}function Zt(t,i,e){return Math.sqrt(Rt(t,i,e,!0))}function St(t,i){var e=t.length,n=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(e);n[0]=n[e-1]=1,Et(t,n,i,0,e-1);var o,s=[];for(o=0;o<e;o++)n[o]&&s.push(t[o]);return s}function Et(t,i,e,n,o){var s,r,a,h=0;for(r=n+1;r<=o-1;r++)(a=Rt(t[r],t[n],t[o],!0))>h&&(s=r,h=a);h>e&&(i[s]=1,Et(t,i,e,n,s),Et(t,i,e,s,o))}function kt(t,i){for(var e=[t[0]],n=1,o=0,s=t.length;n<s;n++)Ot(t[n],t[o])>i&&(e.push(t[n]),o=n);return o<s-1&&e.push(t[s-1]),e}function At(t,i,e,n,o){var s,r,a,h=n?Se:Bt(t,e),u=Bt(i,e);for(Se=u;;){if(!(h|u))return[t,i];if(h&u)return!1;a=Bt(r=It(t,i,s=h||u,e,o),e),s===h?(t=r,h=a):(i=r,u=a)}}function It(t,i,e,n,o){var s,r,a=i.x-t.x,h=i.y-t.y,u=n.min,l=n.max;return 8&e?(s=t.x+a*(l.y-t.y)/h,r=l.y):4&e?(s=t.x+a*(u.y-t.y)/h,r=u.y):2&e?(s=l.x,r=t.y+h*(l.x-t.x)/a):1&e&&(s=u.x,r=t.y+h*(u.x-t.x)/a),new x(s,r,o)}function Bt(t,i){var e=0;return t.x<i.min.x?e|=1:t.x>i.max.x&&(e|=2),t.y<i.min.y?e|=4:t.y>i.max.y&&(e|=8),e}function Ot(t,i){var e=i.x-t.x,n=i.y-t.y;return e*e+n*n}function Rt(t,i,e,n){var o,s=i.x,r=i.y,a=e.x-s,h=e.y-r,u=a*a+h*h;return u>0&&((o=((t.x-s)*a+(t.y-r)*h)/u)>1?(s=e.x,r=e.y):o>0&&(s+=a*o,r+=h*o)),a=t.x-s,h=t.y-r,n?a*a+h*h:new x(s,r)}function Dt(t){return!ei(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]}function Nt(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Dt(t)}function jt(t,i,e){var n,o,s,r,a,h,u,l,c,_=[1,4,2,8];for(o=0,u=t.length;o<u;o++)t[o]._code=Bt(t[o],i);for(r=0;r<4;r++){for(l=_[r],n=[],o=0,s=(u=t.length)-1;o<u;s=o++)a=t[o],h=t[s],a._code&l?h._code&l||((c=It(h,a,l,i,e))._code=Bt(c,i),n.push(c)):(h._code&l&&((c=It(h,a,l,i,e))._code=Bt(c,i),n.push(c)),n.push(a));t=n}return t}function Wt(t,i){var e,n,o,s,r="Feature"===t.type?t.geometry:t,a=r?r.coordinates:null,h=[],u=i&&i.pointToLayer,l=i&&i.coordsToLatLng||Ht;if(!a&&!r)return null;switch(r.type){case"Point":return e=l(a),u?u(t,e):new Xe(e);case"MultiPoint":for(o=0,s=a.length;o<s;o++)e=l(a[o]),h.push(u?u(t,e):new Xe(e));return new qe(h);case"LineString":case"MultiLineString":return n=Ft(a,"LineString"===r.type?0:1,l),new tn(n,i);case"Polygon":case"MultiPolygon":return n=Ft(a,"Polygon"===r.type?1:2,l),new en(n,i);case"GeometryCollection":for(o=0,s=r.geometries.length;o<s;o++){var c=Wt({geometry:r.geometries[o],type:"Feature",properties:t.properties},i);c&&h.push(c)}return new qe(h);default:throw new Error("Invalid GeoJSON object.")}}function Ht(t){return new M(t[1],t[0],t[2])}function Ft(t,i,e){for(var n,o=[],s=0,r=t.length;s<r;s++)n=i?Ft(t[s],i-1,e):(e||Ht)(t[s]),o.push(n);return o}function Ut(t,i){return i="number"==typeof i?i:6,void 0!==t.alt?[a(t.lng,i),a(t.lat,i),a(t.alt,i)]:[a(t.lng,i),a(t.lat,i)]}function Vt(t,i,e,n){for(var o=[],s=0,r=t.length;s<r;s++)o.push(i?Vt(t[s],i-1,e,n):Ut(t[s],n));return!i&&e&&o.push(o[0]),o}function qt(t,e){return t.feature?i({},t.feature,{geometry:e}):Gt(e)}function Gt(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}function Kt(t,i){return new nn(t,i)}function Yt(t,i){return new dn(t,i)}function Xt(t){return Yi?new fn(t):null}function Jt(t){return Xi||Ji?new xn(t):null}var $t=Object.freeze;Object.freeze=function(t){return t};var Qt=Object.create||function(){function t(){}return function(i){return t.prototype=i,new t}}(),ti=0,ii=/\{ *([\w_-]+) *\}/g,ei=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},ni="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",oi=0,si=window.requestAnimationFrame||p("RequestAnimationFrame")||m,ri=window.cancelAnimationFrame||p("CancelAnimationFrame")||p("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)},ai=(Object.freeze||Object)({freeze:$t,extend:i,create:Qt,bind:e,lastId:ti,stamp:n,throttle:o,wrapNum:s,falseFn:r,formatNum:a,trim:h,splitWords:u,setOptions:l,getParamString:c,template:_,isArray:ei,indexOf:d,emptyImageUrl:ni,requestFn:si,cancelFn:ri,requestAnimFrame:f,cancelAnimFrame:g});v.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},n=e.__super__=this.prototype,o=Qt(n);o.constructor=e,e.prototype=o;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&"__super__"!==s&&(e[s]=this[s]);return t.statics&&(i(e,t.statics),delete t.statics),t.includes&&(y(t.includes),i.apply(null,[o].concat(t.includes)),delete t.includes),o.options&&(t.options=i(Qt(o.options),t.options)),i(o,t),o._initHooks=[],o.callInitHooks=function(){if(!this._initHooksCalled){n.callInitHooks&&n.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,i=o._initHooks.length;t<i;t++)o._initHooks[t].call(this)}},e},v.include=function(t){return i(this.prototype,t),this},v.mergeOptions=function(t){return i(this.prototype.options,t),this},v.addInitHook=function(t){var i=Array.prototype.slice.call(arguments,1),e="function"==typeof t?t:function(){this[t].apply(this,i)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(e),this};var hi={on:function(t,i,e){if("object"==typeof t)for(var n in t)this._on(n,t[n],i);else for(var o=0,s=(t=u(t)).length;o<s;o++)this._on(t[o],i,e);return this},off:function(t,i,e){if(t)if("object"==typeof t)for(var n in t)this._off(n,t[n],i);else for(var o=0,s=(t=u(t)).length;o<s;o++)this._off(t[o],i,e);else delete this._events;return this},_on:function(t,i,e){this._events=this._events||{};var n=this._events[t];n||(n=[],this._events[t]=n),e===this&&(e=void 0);for(var o={fn:i,ctx:e},s=n,r=0,a=s.length;r<a;r++)if(s[r].fn===i&&s[r].ctx===e)return;s.push(o)},_off:function(t,i,e){var n,o,s;if(this._events&&(n=this._events[t]))if(i){if(e===this&&(e=void 0),n)for(o=0,s=n.length;o<s;o++){var a=n[o];if(a.ctx===e&&a.fn===i)return a.fn=r,this._firingCount&&(this._events[t]=n=n.slice()),void n.splice(o,1)}}else{for(o=0,s=n.length;o<s;o++)n[o].fn=r;delete this._events[t]}},fire:function(t,e,n){if(!this.listens(t,n))return this;var o=i({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var r=0,a=s.length;r<a;r++){var h=s[r];h.fn.call(h.ctx||this,o)}this._firingCount--}}return n&&this._propagateEvent(o),this},listens:function(t,i){var e=this._events&&this._events[t];if(e&&e.length)return!0;if(i)for(var n in this._eventParents)if(this._eventParents[n].listens(t,i))return!0;return!1},once:function(t,i,n){if("object"==typeof t){for(var o in t)this.once(o,t[o],i);return this}var s=e(function(){this.off(t,i,n).off(t,s,n)},this);return this.on(t,i,n).on(t,s,n)},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[n(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[n(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,i({layer:t.target,propagatedFrom:t.target},t),!0)}};hi.addEventListener=hi.on,hi.removeEventListener=hi.clearAllEventListeners=hi.off,hi.addOneTimeEventListener=hi.once,hi.fireEvent=hi.fire,hi.hasEventListeners=hi.listens;var ui=v.extend(hi),li=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};x.prototype={clone:function(){return new x(this.x,this.y)},add:function(t){return this.clone()._add(w(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(w(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new x(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new x(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=li(this.x),this.y=li(this.y),this},distanceTo:function(t){var i=(t=w(t)).x-this.x,e=t.y-this.y;return Math.sqrt(i*i+e*e)},equals:function(t){return(t=w(t)).x===this.x&&t.y===this.y},contains:function(t){return t=w(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+a(this.x)+", "+a(this.y)+")"}},P.prototype={extend:function(t){return t=w(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new x((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new x(this.min.x,this.max.y)},getTopRight:function(){return new x(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var i,e;return(t="number"==typeof t[0]||t instanceof x?w(t):b(t))instanceof P?(i=t.min,e=t.max):i=e=t,i.x>=this.min.x&&e.x<=this.max.x&&i.y>=this.min.y&&e.y<=this.max.y},intersects:function(t){t=b(t);var i=this.min,e=this.max,n=t.min,o=t.max,s=o.x>=i.x&&n.x<=e.x,r=o.y>=i.y&&n.y<=e.y;return s&&r},overlaps:function(t){t=b(t);var i=this.min,e=this.max,n=t.min,o=t.max,s=o.x>i.x&&n.x<e.x,r=o.y>i.y&&n.y<e.y;return s&&r},isValid:function(){return!(!this.min||!this.max)}},T.prototype={extend:function(t){var i,e,n=this._southWest,o=this._northEast;if(t instanceof M)i=t,e=t;else{if(!(t instanceof T))return t?this.extend(C(t)||z(t)):this;if(i=t._southWest,e=t._northEast,!i||!e)return this}return n||o?(n.lat=Math.min(i.lat,n.lat),n.lng=Math.min(i.lng,n.lng),o.lat=Math.max(e.lat,o.lat),o.lng=Math.max(e.lng,o.lng)):(this._southWest=new M(i.lat,i.lng),this._northEast=new M(e.lat,e.lng)),this},pad:function(t){var i=this._southWest,e=this._northEast,n=Math.abs(i.lat-e.lat)*t,o=Math.abs(i.lng-e.lng)*t;return new T(new M(i.lat-n,i.lng-o),new M(e.lat+n,e.lng+o))},getCenter:function(){return new M((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new M(this.getNorth(),this.getWest())},getSouthEast:function(){return new M(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof M||"lat"in t?C(t):z(t);var i,e,n=this._southWest,o=this._northEast;return t instanceof T?(i=t.getSouthWest(),e=t.getNorthEast()):i=e=t,i.lat>=n.lat&&e.lat<=o.lat&&i.lng>=n.lng&&e.lng<=o.lng},intersects:function(t){t=z(t);var i=this._southWest,e=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>=i.lat&&n.lat<=e.lat,r=o.lng>=i.lng&&n.lng<=e.lng;return s&&r},overlaps:function(t){t=z(t);var i=this._southWest,e=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>i.lat&&n.lat<e.lat,r=o.lng>i.lng&&n.lng<e.lng;return s&&r},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,i){return!!t&&(t=z(t),this._southWest.equals(t.getSouthWest(),i)&&this._northEast.equals(t.getNorthEast(),i))},isValid:function(){return!(!this._southWest||!this._northEast)}},M.prototype={equals:function(t,i){return!!t&&(t=C(t),Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng))<=(void 0===i?1e-9:i))},toString:function(t){return"LatLng("+a(this.lat,t)+", "+a(this.lng,t)+")"},distanceTo:function(t){return _i.distance(this,C(t))},wrap:function(){return _i.wrapLatLng(this)},toBounds:function(t){var i=180*t/40075017,e=i/Math.cos(Math.PI/180*this.lat);return z([this.lat-i,this.lng-e],[this.lat+i,this.lng+e])},clone:function(){return new M(this.lat,this.lng,this.alt)}};var ci={latLngToPoint:function(t,i){var e=this.projection.project(t),n=this.scale(i);return this.transformation._transform(e,n)},pointToLatLng:function(t,i){var e=this.scale(i),n=this.transformation.untransform(t,e);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var i=this.projection.bounds,e=this.scale(t);return new P(this.transformation.transform(i.min,e),this.transformation.transform(i.max,e))},infinite:!1,wrapLatLng:function(t){var i=this.wrapLng?s(t.lng,this.wrapLng,!0):t.lng;return new M(this.wrapLat?s(t.lat,this.wrapLat,!0):t.lat,i,t.alt)},wrapLatLngBounds:function(t){var i=t.getCenter(),e=this.wrapLatLng(i),n=i.lat-e.lat,o=i.lng-e.lng;if(0===n&&0===o)return t;var s=t.getSouthWest(),r=t.getNorthEast();return new T(new M(s.lat-n,s.lng-o),new M(r.lat-n,r.lng-o))}},_i=i({},ci,{wrapLng:[-180,180],R:6371e3,distance:function(t,i){var e=Math.PI/180,n=t.lat*e,o=i.lat*e,s=Math.sin((i.lat-t.lat)*e/2),r=Math.sin((i.lng-t.lng)*e/2),a=s*s+Math.cos(n)*Math.cos(o)*r*r,h=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));return this.R*h}}),di={R:6378137,MAX_LATITUDE:85.0511287798,project:function(t){var i=Math.PI/180,e=this.MAX_LATITUDE,n=Math.max(Math.min(e,t.lat),-e),o=Math.sin(n*i);return new x(this.R*t.lng*i,this.R*Math.log((1+o)/(1-o))/2)},unproject:function(t){var i=180/Math.PI;return new M((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*i,t.x*i/this.R)},bounds:function(){var t=6378137*Math.PI;return new P([-t,-t],[t,t])}()};Z.prototype={transform:function(t,i){return this._transform(t.clone(),i)},_transform:function(t,i){return i=i||1,t.x=i*(this._a*t.x+this._b),t.y=i*(this._c*t.y+this._d),t},untransform:function(t,i){return i=i||1,new x((t.x/i-this._b)/this._a,(t.y/i-this._d)/this._c)}};var pi,mi,fi,gi,vi=i({},_i,{code:"EPSG:3857",projection:di,transformation:function(){var t=.5/(Math.PI*di.R);return S(t,.5,-t,.5)}()}),yi=i({},vi,{code:"EPSG:900913"}),xi=document.documentElement.style,wi="ActiveXObject"in window,Li=wi&&!document.addEventListener,Pi="msLaunchUri"in navigator&&!("documentMode"in document),bi=A("webkit"),Ti=A("android"),zi=A("android 2")||A("android 3"),Mi=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Ci=Ti&&A("Google")&&Mi<537&&!("AudioNode"in window),Zi=!!window.opera,Si=A("chrome"),Ei=A("gecko")&&!bi&&!Zi&&!wi,ki=!Si&&A("safari"),Ai=A("phantom"),Ii="OTransition"in xi,Bi=0===navigator.platform.indexOf("Win"),Oi=wi&&"transition"in xi,Ri="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!zi,Di="MozPerspective"in xi,Ni=!window.L_DISABLE_3D&&(Oi||Ri||Di)&&!Ii&&!Ai,ji="undefined"!=typeof orientation||A("mobile"),Wi=ji&&bi,Hi=ji&&Ri,Fi=!window.PointerEvent&&window.MSPointerEvent,Ui=!(!window.PointerEvent&&!Fi),Vi=!window.L_NO_TOUCH&&(Ui||"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),qi=ji&&Zi,Gi=ji&&Ei,Ki=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Yi=!!document.createElement("canvas").getContext,Xi=!(!document.createElementNS||!E("svg").createSVGRect),Ji=!Xi&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(t){return!1}}(),$i=(Object.freeze||Object)({ie:wi,ielt9:Li,edge:Pi,webkit:bi,android:Ti,android23:zi,androidStock:Ci,opera:Zi,chrome:Si,gecko:Ei,safari:ki,phantom:Ai,opera12:Ii,win:Bi,ie3d:Oi,webkit3d:Ri,gecko3d:Di,any3d:Ni,mobile:ji,mobileWebkit:Wi,mobileWebkit3d:Hi,msPointer:Fi,pointer:Ui,touch:Vi,mobileOpera:qi,mobileGecko:Gi,retina:Ki,canvas:Yi,svg:Xi,vml:Ji}),Qi=Fi?"MSPointerDown":"pointerdown",te=Fi?"MSPointerMove":"pointermove",ie=Fi?"MSPointerUp":"pointerup",ee=Fi?"MSPointerCancel":"pointercancel",ne=["INPUT","SELECT","OPTION"],oe={},se=!1,re=0,ae=Fi?"MSPointerDown":Ui?"pointerdown":"touchstart",he=Fi?"MSPointerUp":Ui?"pointerup":"touchend",ue="_leaflet_",le="_leaflet_events",ce=Bi&&Si?2*window.devicePixelRatio:Ei?window.devicePixelRatio:1,_e={},de=(Object.freeze||Object)({on:V,off:q,stopPropagation:Y,disableScrollPropagation:X,disableClickPropagation:J,preventDefault:$,stop:Q,getMousePosition:tt,getWheelDelta:it,fakeStop:et,skipped:nt,isExternalTarget:ot,addListener:V,removeListener:q}),pe=xt(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),me=xt(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),fe="webkitTransition"===me||"OTransition"===me?me+"End":"transitionend";if("onselectstart"in document)mi=function(){V(window,"selectstart",$)},fi=function(){q(window,"selectstart",$)};else{var ge=xt(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);mi=function(){if(ge){var t=document.documentElement.style;gi=t[ge],t[ge]="none"}},fi=function(){ge&&(document.documentElement.style[ge]=gi,gi=void 0)}}var ve,ye,xe=(Object.freeze||Object)({TRANSFORM:pe,TRANSITION:me,TRANSITION_END:fe,get:rt,getStyle:at,create:ht,remove:ut,empty:lt,toFront:ct,toBack:_t,hasClass:dt,addClass:pt,removeClass:mt,setClass:ft,getClass:gt,setOpacity:vt,testProp:xt,setTransform:wt,setPosition:Lt,getPosition:Pt,disableTextSelection:mi,enableTextSelection:fi,disableImageDrag:bt,enableImageDrag:Tt,preventOutline:zt,restoreOutline:Mt}),we=ui.extend({run:function(t,i,e,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=e||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Pt(t),this._offset=i.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=f(this._animate,this),this._step()},_step:function(t){var i=+new Date-this._startTime,e=1e3*this._duration;i<e?this._runFrame(this._easeOut(i/e),t):(this._runFrame(1),this._complete())},_runFrame:function(t,i){var e=this._startPos.add(this._offset.multiplyBy(t));i&&e._round(),Lt(this._el,e),this.fire("step")},_complete:function(){g(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),Le=ui.extend({options:{crs:vi,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,i){i=l(this,i),this._initContainer(t),this._initLayout(),this._onResize=e(this._onResize,this),this._initEvents(),i.maxBounds&&this.setMaxBounds(i.maxBounds),void 0!==i.zoom&&(this._zoom=this._limitZoom(i.zoom)),i.center&&void 0!==i.zoom&&this.setView(C(i.center),i.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._zoomAnimated=me&&Ni&&!qi&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),V(this._proxy,fe,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,n){return e=void 0===e?this._zoom:this._limitZoom(e),t=this._limitCenter(C(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&!0!==n&&(void 0!==n.animate&&(n.zoom=i({animate:n.animate},n.zoom),n.pan=i({animate:n.animate,duration:n.duration},n.pan)),this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan))?(clearTimeout(this._sizeTimer),this):(this._resetView(t,e),this)},setZoom:function(t,i){return this._loaded?this.setView(this.getCenter(),t,{zoom:i}):(this._zoom=t,this)},zoomIn:function(t,i){return t=t||(Ni?this.options.zoomDelta:1),this.setZoom(this._zoom+t,i)},zoomOut:function(t,i){return t=t||(Ni?this.options.zoomDelta:1),this.setZoom(this._zoom-t,i)},setZoomAround:function(t,i,e){var n=this.getZoomScale(i),o=this.getSize().divideBy(2),s=(t instanceof x?t:this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1-1/n),r=this.containerPointToLatLng(o.add(s));return this.setView(r,i,{zoom:e})},_getBoundsCenterZoom:function(t,i){i=i||{},t=t.getBounds?t.getBounds():z(t);var e=w(i.paddingTopLeft||i.padding||[0,0]),n=w(i.paddingBottomRight||i.padding||[0,0]),o=this.getBoundsZoom(t,!1,e.add(n));if((o="number"==typeof i.maxZoom?Math.min(i.maxZoom,o):o)===1/0)return{center:t.getCenter(),zoom:o};var s=n.subtract(e).divideBy(2),r=this.project(t.getSouthWest(),o),a=this.project(t.getNorthEast(),o);return{center:this.unproject(r.add(a).divideBy(2).add(s),o),zoom:o}},fitBounds:function(t,i){if(!(t=z(t)).isValid())throw new Error("Bounds are not valid.");var e=this._getBoundsCenterZoom(t,i);return this.setView(e.center,e.zoom,i)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,i){return this.setView(t,this._zoom,{pan:i})},panBy:function(t,i){if(t=w(t).round(),i=i||{},!t.x&&!t.y)return this.fire("moveend");if(!0!==i.animate&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new we,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),i.noMoveStart||this.fire("movestart"),!1!==i.animate){pt(this._mapPane,"leaflet-pan-anim");var e=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,e,i.duration||.25,i.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,i,e){function n(t){var i=(g*g-m*m+(t?-1:1)*x*x*v*v)/(2*(t?g:m)*x*v),e=Math.sqrt(i*i+1)-i;return e<1e-9?-18:Math.log(e)}function o(t){return(Math.exp(t)-Math.exp(-t))/2}function s(t){return(Math.exp(t)+Math.exp(-t))/2}function r(t){return o(t)/s(t)}function a(t){return m*(s(w)/s(w+y*t))}function h(t){return m*(s(w)*r(w+y*t)-o(w))/x}function u(t){return 1-Math.pow(1-t,1.5)}function l(){var e=(Date.now()-L)/b,n=u(e)*P;e<=1?(this._flyToFrame=f(l,this),this._move(this.unproject(c.add(_.subtract(c).multiplyBy(h(n)/v)),p),this.getScaleZoom(m/a(n),p),{flyTo:!0})):this._move(t,i)._moveEnd(!0)}if(!1===(e=e||{}).animate||!Ni)return this.setView(t,i,e);this._stop();var c=this.project(this.getCenter()),_=this.project(t),d=this.getSize(),p=this._zoom;t=C(t),i=void 0===i?p:i;var m=Math.max(d.x,d.y),g=m*this.getZoomScale(p,i),v=_.distanceTo(c)||1,y=1.42,x=y*y,w=n(0),L=Date.now(),P=(n(1)-w)/y,b=e.duration?1e3*e.duration:1e3*P*.8;return this._moveStart(!0,e.noMoveStart),l.call(this),this},flyToBounds:function(t,i){var e=this._getBoundsCenterZoom(t,i);return this.flyTo(e.center,e.zoom,i)},setMaxBounds:function(t){return(t=z(t)).isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds))},setMinZoom:function(t){var i=this.options.minZoom;return this.options.minZoom=t,this._loaded&&i!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var i=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&i!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,i){this._enforcingBounds=!0;var e=this.getCenter(),n=this._limitCenter(e,this._zoom,z(t));return e.equals(n)||this.panTo(n,i),this._enforcingBounds=!1,this},invalidateSize:function(t){if(!this._loaded)return this;t=i({animate:!1,pan:!0},!0===t?{animate:!0}:t);var n=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var o=this.getSize(),s=n.divideBy(2).round(),r=o.divideBy(2).round(),a=s.subtract(r);return a.x||a.y?(t.animate&&t.pan?this.panBy(a):(t.pan&&this._rawPanBy(a),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(e(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:n,newSize:o})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=i({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var n=e(this._handleGeolocationResponse,this),o=e(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(n,o,t):navigator.geolocation.getCurrentPosition(n,o,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var i=t.code,e=t.message||(1===i?"permission denied":2===i?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:i,message:"Geolocation error: "+e+"."})},_handleGeolocationResponse:function(t){var i=new M(t.coords.latitude,t.coords.longitude),e=i.toBounds(t.coords.accuracy),n=this._locateOptions;if(n.setView){var o=this.getBoundsZoom(e);this.setView(i,n.maxZoom?Math.min(o,n.maxZoom):o)}var s={latlng:i,bounds:e,timestamp:t.timestamp};for(var r in t.coords)"number"==typeof t.coords[r]&&(s[r]=t.coords[r]);this.fire("locationfound",s)},addHandler:function(t,i){if(!i)return this;var e=this[t]=new i(this);return this._handlers.push(e),this.options[t]&&e.enable(),this},remove:function(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),ut(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)ut(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,i){var e=ht("div","leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),i||this._mapPane);return t&&(this._panes[t]=e),e},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds();return new T(this.unproject(t.getBottomLeft()),this.unproject(t.getTopRight()))},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,i,e){t=z(t),e=w(e||[0,0]);var n=this.getZoom()||0,o=this.getMinZoom(),s=this.getMaxZoom(),r=t.getNorthWest(),a=t.getSouthEast(),h=this.getSize().subtract(e),u=b(this.project(a,n),this.project(r,n)).getSize(),l=Ni?this.options.zoomSnap:1,c=h.x/u.x,_=h.y/u.y,d=i?Math.max(c,_):Math.min(c,_);return n=this.getScaleZoom(d,n),l&&(n=Math.round(n/(l/100))*(l/100),n=i?Math.ceil(n/l)*l:Math.floor(n/l)*l),Math.max(o,Math.min(s,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new x(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,i){var e=this._getTopLeftPoint(t,i);return new P(e,e.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,i){var e=this.options.crs;return i=void 0===i?this._zoom:i,e.scale(t)/e.scale(i)},getScaleZoom:function(t,i){var e=this.options.crs;i=void 0===i?this._zoom:i;var n=e.zoom(t*e.scale(i));return isNaN(n)?1/0:n},project:function(t,i){return i=void 0===i?this._zoom:i,this.options.crs.latLngToPoint(C(t),i)},unproject:function(t,i){return i=void 0===i?this._zoom:i,this.options.crs.pointToLatLng(w(t),i)},layerPointToLatLng:function(t){var i=w(t).add(this.getPixelOrigin());return this.unproject(i)},latLngToLayerPoint:function(t){return this.project(C(t))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(C(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(z(t))},distance:function(t,i){return this.options.crs.distance(C(t),C(i))},containerPointToLayerPoint:function(t){return w(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return w(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var i=this.containerPointToLayerPoint(w(t));return this.layerPointToLatLng(i)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(C(t)))},mouseEventToContainerPoint:function(t){return tt(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var i=this._container=rt(t);if(!i)throw new Error("Map container not found.");if(i._leaflet_id)throw new Error("Map container is already initialized.");V(i,"scroll",this._onScroll,this),this._containerId=n(i)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&Ni,pt(t,"leaflet-container"+(Vi?" leaflet-touch":"")+(Ki?" leaflet-retina":"")+(Li?" leaflet-oldie":"")+(ki?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var i=at(t,"position");"absolute"!==i&&"relative"!==i&&"fixed"!==i&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Lt(this._mapPane,new x(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(pt(t.markerPane,"leaflet-zoom-hide"),pt(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,i){Lt(this._mapPane,new x(0,0));var e=!this._loaded;this._loaded=!0,i=this._limitZoom(i),this.fire("viewprereset");var n=this._zoom!==i;this._moveStart(n,!1)._move(t,i)._moveEnd(n),this.fire("viewreset"),e&&this.fire("load")},_moveStart:function(t,i){return t&&this.fire("zoomstart"),i||this.fire("movestart"),this},_move:function(t,i,e){void 0===i&&(i=this._zoom);var n=this._zoom!==i;return this._zoom=i,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(n||e&&e.pinch)&&this.fire("zoom",e),this.fire("move",e)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return g(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Lt(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[n(this._container)]=this;var i=t?q:V;i(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&i(window,"resize",this._onResize,this),Ni&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){g(this._resizeRequest),this._resizeRequest=f(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,i){for(var e,o=[],s="mouseout"===i||"mouseover"===i,r=t.target||t.srcElement,a=!1;r;){if((e=this._targets[n(r)])&&("click"===i||"preclick"===i)&&!t._simulated&&this._draggableMoved(e)){a=!0;break}if(e&&e.listens(i,!0)){if(s&&!ot(r,t))break;if(o.push(e),s)break}if(r===this._container)break;r=r.parentNode}return o.length||a||s||!ot(r,t)||(o=[this]),o},_handleDOMEvent:function(t){if(this._loaded&&!nt(t)){var i=t.type;"mousedown"!==i&&"keypress"!==i||zt(t.target||t.srcElement),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,n){if("click"===t.type){var o=i({},t);o.type="preclick",this._fireDOMEvent(o,o.type,n)}if(!t._stopped&&(n=(n||[]).concat(this._findEventTargets(t,e))).length){var s=n[0];"contextmenu"===e&&s.listens(e,!0)&&$(t);var r={originalEvent:t};if("keypress"!==t.type){var a=s.getLatLng&&(!s._radius||s._radius<=10);r.containerPoint=a?this.latLngToContainerPoint(s.getLatLng()):this.mouseEventToContainerPoint(t),r.layerPoint=this.containerPointToLayerPoint(r.containerPoint),r.latlng=a?s.getLatLng():this.layerPointToLatLng(r.layerPoint)}for(var h=0;h<n.length;h++)if(n[h].fire(e,r,!0),r.originalEvent._stopped||!1===n[h].options.bubblingMouseEvents&&-1!==d(this._mouseEvents,e))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,i=this._handlers.length;t<i;t++)this._handlers[t].disable()},whenReady:function(t,i){return this._loaded?t.call(i||this,{target:this}):this.on("load",t,i),this},_getMapPanePos:function(){return Pt(this._mapPane)||new x(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,i){return(t&&void 0!==i?this._getNewPixelOrigin(t,i):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,i){var e=this.getSize()._divideBy(2);return this.project(t,i)._subtract(e)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,i,e){var n=this._getNewPixelOrigin(e,i);return this.project(t,i)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,i,e){var n=this._getNewPixelOrigin(e,i);return b([this.project(t.getSouthWest(),i)._subtract(n),this.project(t.getNorthWest(),i)._subtract(n),this.project(t.getSouthEast(),i)._subtract(n),this.project(t.getNorthEast(),i)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,i,e){if(!e)return t;var n=this.project(t,i),o=this.getSize().divideBy(2),s=new P(n.subtract(o),n.add(o)),r=this._getBoundsOffset(s,e,i);return r.round().equals([0,0])?t:this.unproject(n.add(r),i)},_limitOffset:function(t,i){if(!i)return t;var e=this.getPixelBounds(),n=new P(e.min.add(t),e.max.add(t));return t.add(this._getBoundsOffset(n,i))},_getBoundsOffset:function(t,i,e){var n=b(this.project(i.getNorthEast(),e),this.project(i.getSouthWest(),e)),o=n.min.subtract(t.min),s=n.max.subtract(t.max);return new x(this._rebound(o.x,-s.x),this._rebound(o.y,-s.y))},_rebound:function(t,i){return t+i>0?Math.round(t-i)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(i))},_limitZoom:function(t){var i=this.getMinZoom(),e=this.getMaxZoom(),n=Ni?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(i,Math.min(e,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){mt(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,i){var e=this._getCenterOffset(t)._trunc();return!(!0!==(i&&i.animate)&&!this.getSize().contains(e))&&(this.panBy(e,i),!0)},_createAnimProxy:function(){var t=this._proxy=ht("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(t){var i=pe,e=this._proxy.style[i];wt(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),e===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",function(){var t=this.getCenter(),i=this.getZoom();wt(this._proxy,this.project(t,i),this.getZoomScale(i,1))},this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ut(this._proxy),delete this._proxy},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,i,e){if(this._animatingZoom)return!0;if(e=e||{},!this._zoomAnimated||!1===e.animate||this._nothingToAnimate()||Math.abs(i-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(i),o=this._getCenterOffset(t)._divideBy(1-1/n);return!(!0!==e.animate&&!this.getSize().contains(o))&&(f(function(){this._moveStart(!0,!1)._animateZoom(t,i,!0)},this),!0)},_animateZoom:function(t,i,n,o){this._mapPane&&(n&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=i,pt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:i,noUpdate:o}),setTimeout(e(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&mt(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),f(function(){this._moveEnd(!0)},this))}}),Pe=v.extend({options:{position:"topright"},initialize:function(t){l(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var i=this._map;return i&&i.removeControl(this),this.options.position=t,i&&i.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var i=this._container=this.onAdd(t),e=this.getPosition(),n=t._controlCorners[e];return pt(i,"leaflet-control"),-1!==e.indexOf("bottom")?n.insertBefore(i,n.firstChild):n.appendChild(i),this},remove:function(){return this._map?(ut(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),be=function(t){return new Pe(t)};Le.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){function t(t,o){var s=e+t+" "+e+o;i[t+o]=ht("div",s,n)}var i=this._controlCorners={},e="leaflet-",n=this._controlContainer=ht("div",e+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)ut(this._controlCorners[t]);ut(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Te=Pe.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,i,e,n){return e<n?-1:n<e?1:0}},initialize:function(t,i,e){l(this,e),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in i)this._addLayer(i[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return Pe.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,i){return this._addLayer(t,i),this._map?this._update():this},addOverlay:function(t,i){return this._addLayer(t,i,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var i=this._getLayer(n(t));return i&&this._layers.splice(this._layers.indexOf(i),1),this._map?this._update():this},expand:function(){pt(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._form.clientHeight?(pt(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=t+"px"):mt(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return mt(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",i=this._container=ht("div",t),e=this.options.collapsed;i.setAttribute("aria-haspopup",!0),J(i),X(i);var n=this._form=ht("form",t+"-list");e&&(this._map.on("click",this.collapse,this),Ti||V(i,{mouseenter:this.expand,mouseleave:this.collapse},this));var o=this._layersLink=ht("a",t+"-toggle",i);o.href="#",o.title="Layers",Vi?(V(o,"click",Q),V(o,"click",this.expand,this)):V(o,"focus",this.expand,this),e||this.expand(),this._baseLayersList=ht("div",t+"-base",n),this._separator=ht("div",t+"-separator",n),this._overlaysList=ht("div",t+"-overlays",n),i.appendChild(n)},_getLayer:function(t){for(var i=0;i<this._layers.length;i++)if(this._layers[i]&&n(this._layers[i].layer)===t)return this._layers[i]},_addLayer:function(t,i,n){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:i,overlay:n}),this.options.sortLayers&&this._layers.sort(e(function(t,i){return this.options.sortFunction(t.layer,i.layer,t.name,i.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;lt(this._baseLayersList),lt(this._overlaysList),this._layerControlInputs=[];var t,i,e,n,o=0;for(e=0;e<this._layers.length;e++)n=this._layers[e],this._addItem(n),i=i||n.overlay,t=t||!n.overlay,o+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&o>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=i&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var i=this._getLayer(n(t.target)),e=i.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;e&&this._map.fire(e,i)},_createRadioElement:function(t,i){var e='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(i?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=e,n.firstChild},_addItem:function(t){var i,e=document.createElement("label"),o=this._map.hasLayer(t.layer);t.overlay?((i=document.createElement("input")).type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=o):i=this._createRadioElement("leaflet-base-layers",o),this._layerControlInputs.push(i),i.layerId=n(t.layer),V(i,"click",this._onInputClick,this);var s=document.createElement("span");s.innerHTML=" "+t.name;var r=document.createElement("div");return e.appendChild(r),r.appendChild(i),r.appendChild(s),(t.overlay?this._overlaysList:this._baseLayersList).appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){var t,i,e=this._layerControlInputs,n=[],o=[];this._handlingClick=!0;for(var s=e.length-1;s>=0;s--)t=e[s],i=this._getLayer(t.layerId).layer,t.checked?n.push(i):t.checked||o.push(i);for(s=0;s<o.length;s++)this._map.hasLayer(o[s])&&this._map.removeLayer(o[s]);for(s=0;s<n.length;s++)this._map.hasLayer(n[s])||this._map.addLayer(n[s]);this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){for(var t,i,e=this._layerControlInputs,n=this._map.getZoom(),o=e.length-1;o>=0;o--)t=e[o],i=this._getLayer(t.layerId).layer,t.disabled=void 0!==i.options.minZoom&&n<i.options.minZoom||void 0!==i.options.maxZoom&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expand:function(){return this.expand()},_collapse:function(){return this.collapse()}}),ze=Pe.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"&#x2212;",zoomOutTitle:"Zoom out"},onAdd:function(t){var i="leaflet-control-zoom",e=ht("div",i+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,i+"-in",e,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,i+"-out",e,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),e},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,i,e,n,o){var s=ht("a",e,n);return s.innerHTML=t,s.href="#",s.title=i,s.setAttribute("role","button"),s.setAttribute("aria-label",i),J(s),V(s,"click",Q),V(s,"click",o,this),V(s,"click",this._refocusOnMap,this),s},_updateDisabled:function(){var t=this._map,i="leaflet-disabled";mt(this._zoomInButton,i),mt(this._zoomOutButton,i),(this._disabled||t._zoom===t.getMinZoom())&&pt(this._zoomOutButton,i),(this._disabled||t._zoom===t.getMaxZoom())&&pt(this._zoomInButton,i)}});Le.mergeOptions({zoomControl:!0}),Le.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new ze,this.addControl(this.zoomControl))});var Me=Pe.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var i=ht("div","leaflet-control-scale"),e=this.options;return this._addScales(e,"leaflet-control-scale-line",i),t.on(e.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,i,e){t.metric&&(this._mScale=ht("div",i,e)),t.imperial&&(this._iScale=ht("div",i,e))},_update:function(){var t=this._map,i=t.getSize().y/2,e=t.distance(t.containerPointToLatLng([0,i]),t.containerPointToLatLng([this.options.maxWidth,i]));this._updateScales(e)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var i=this._getRoundNum(t),e=i<1e3?i+" m":i/1e3+" km";this._updateScale(this._mScale,e,i/t)},_updateImperial:function(t){var i,e,n,o=3.2808399*t;o>5280?(i=o/5280,e=this._getRoundNum(i),this._updateScale(this._iScale,e+" mi",e/i)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o))},_updateScale:function(t,i,e){t.style.width=Math.round(this.options.maxWidth*e)+"px",t.innerHTML=i},_getRoundNum:function(t){var i=Math.pow(10,(Math.floor(t)+"").length-1),e=t/i;return e=e>=10?10:e>=5?5:e>=3?3:e>=2?2:1,i*e}}),Ce=Pe.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){l(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=ht("div","leaflet-control-attribution"),J(this._container);for(var i in t._layers)t._layers[i].getAttribution&&this.addAttribution(t._layers[i].getAttribution());return this._update(),this._container},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var i in this._attributions)this._attributions[i]&&t.push(i);var e=[];this.options.prefix&&e.push(this.options.prefix),t.length&&e.push(t.join(", ")),this._container.innerHTML=e.join(" | ")}}});Le.mergeOptions({attributionControl:!0}),Le.addInitHook(function(){this.options.attributionControl&&(new Ce).addTo(this)});Pe.Layers=Te,Pe.Zoom=ze,Pe.Scale=Me,Pe.Attribution=Ce,be.layers=function(t,i,e){return new Te(t,i,e)},be.zoom=function(t){return new ze(t)},be.scale=function(t){return new Me(t)},be.attribution=function(t){return new Ce(t)};var Ze=v.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});Ze.addTo=function(t,i){return t.addHandler(i,this),this};var Se,Ee={Events:hi},ke=Vi?"touchstart mousedown":"mousedown",Ae={mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},Ie={mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"},Be=ui.extend({options:{clickTolerance:3},initialize:function(t,i,e,n){l(this,n),this._element=t,this._dragStartTarget=i||t,this._preventOutline=e},enable:function(){this._enabled||(V(this._dragStartTarget,ke,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Be._dragging===this&&this.finishDrag(),q(this._dragStartTarget,ke,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(!t._simulated&&this._enabled&&(this._moved=!1,!dt(this._element,"leaflet-zoom-anim")&&!(Be._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(Be._dragging=this,this._preventOutline&&zt(this._element),bt(),mi(),this._moving)))){this.fire("down");var i=t.touches?t.touches[0]:t;this._startPoint=new x(i.clientX,i.clientY),V(document,Ie[t.type],this._onMove,this),V(document,Ae[t.type],this._onUp,this)}},_onMove:function(t){if(!t._simulated&&this._enabled)if(t.touches&&t.touches.length>1)this._moved=!0;else{var i=t.touches&&1===t.touches.length?t.touches[0]:t,e=new x(i.clientX,i.clientY).subtract(this._startPoint);(e.x||e.y)&&(Math.abs(e.x)+Math.abs(e.y)<this.options.clickTolerance||($(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=Pt(this._element).subtract(e),pt(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),pt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(e),this._moving=!0,g(this._animRequest),this._lastEvent=t,this._animRequest=f(this._updatePosition,this,!0)))}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),Lt(this._element,this._newPos),this.fire("drag",t)},_onUp:function(t){!t._simulated&&this._enabled&&this.finishDrag()},finishDrag:function(){mt(document.body,"leaflet-dragging"),this._lastTarget&&(mt(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null);for(var t in Ie)q(document,Ie[t],this._onMove,this),q(document,Ae[t],this._onUp,this);Tt(),fi(),this._moved&&this._moving&&(g(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,Be._dragging=!1}}),Oe=(Object.freeze||Object)({simplify:Ct,pointToSegmentDistance:Zt,closestPointOnSegment:function(t,i,e){return Rt(t,i,e)},clipSegment:At,_getEdgeIntersection:It,_getBitCode:Bt,_sqClosestPointOnSegment:Rt,isFlat:Dt,_flat:Nt}),Re=(Object.freeze||Object)({clipPolygon:jt}),De={project:function(t){return new x(t.lng,t.lat)},unproject:function(t){return new M(t.y,t.x)},bounds:new P([-180,-90],[180,90])},Ne={R:6378137,R_MINOR:6356752.314245179,bounds:new P([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var i=Math.PI/180,e=this.R,n=t.lat*i,o=this.R_MINOR/e,s=Math.sqrt(1-o*o),r=s*Math.sin(n),a=Math.tan(Math.PI/4-n/2)/Math.pow((1-r)/(1+r),s/2);return n=-e*Math.log(Math.max(a,1e-10)),new x(t.lng*i*e,n)},unproject:function(t){for(var i,e=180/Math.PI,n=this.R,o=this.R_MINOR/n,s=Math.sqrt(1-o*o),r=Math.exp(-t.y/n),a=Math.PI/2-2*Math.atan(r),h=0,u=.1;h<15&&Math.abs(u)>1e-7;h++)i=s*Math.sin(a),i=Math.pow((1-i)/(1+i),s/2),a+=u=Math.PI/2-2*Math.atan(r*i)-a;return new M(a*e,t.x*e/n)}},je=(Object.freeze||Object)({LonLat:De,Mercator:Ne,SphericalMercator:di}),We=i({},_i,{code:"EPSG:3395",projection:Ne,transformation:function(){var t=.5/(Math.PI*Ne.R);return S(t,.5,-t,.5)}()}),He=i({},_i,{code:"EPSG:4326",projection:De,transformation:S(1/180,1,-1/180,.5)}),Fe=i({},ci,{projection:De,transformation:S(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,i){var e=i.lng-t.lng,n=i.lat-t.lat;return Math.sqrt(e*e+n*n)},infinite:!0});ci.Earth=_i,ci.EPSG3395=We,ci.EPSG3857=vi,ci.EPSG900913=yi,ci.EPSG4326=He,ci.Simple=Fe;var Ue=ui.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[n(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[n(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var i=t.target;if(i.hasLayer(this)){if(this._map=i,this._zoomAnimated=i._zoomAnimated,this.getEvents){var e=this.getEvents();i.on(e,this),this.once("remove",function(){i.off(e,this)},this)}this.onAdd(i),this.getAttribution&&i.attributionControl&&i.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),i.fire("layeradd",{layer:this})}}});Le.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var i=n(t);return this._layers[i]?this:(this._layers[i]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var i=n(t);return this._layers[i]?(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),delete this._layers[i],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return!!t&&n(t)in this._layers},eachLayer:function(t,i){for(var e in this._layers)t.call(i,this._layers[e]);return this},_addLayers:function(t){for(var i=0,e=(t=t?ei(t)?t:[t]:[]).length;i<e;i++)this.addLayer(t[i])},_addZoomLimit:function(t){!isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[n(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var i=n(t);this._zoomBoundLayers[i]&&(delete this._zoomBoundLayers[i],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,i=-1/0,e=this._getZoomSpan();for(var n in this._zoomBoundLayers){var o=this._zoomBoundLayers[n].options;t=void 0===o.minZoom?t:Math.min(t,o.minZoom),i=void 0===o.maxZoom?i:Math.max(i,o.maxZoom)}this._layersMaxZoom=i===-1/0?void 0:i,this._layersMinZoom=t===1/0?void 0:t,e!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Ve=Ue.extend({initialize:function(t,i){l(this,i),this._layers={};var e,n;if(t)for(e=0,n=t.length;e<n;e++)this.addLayer(t[e])},addLayer:function(t){var i=this.getLayerId(t);return this._layers[i]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var i=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[i]&&this._map.removeLayer(this._layers[i]),delete this._layers[i],this},hasLayer:function(t){return!!t&&(t in this._layers||this.getLayerId(t)in this._layers)},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var i,e,n=Array.prototype.slice.call(arguments,1);for(i in this._layers)(e=this._layers[i])[t]&&e[t].apply(e,n);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,i){for(var e in this._layers)t.call(i,this._layers[e]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return n(t)}}),qe=Ve.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Ve.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Ve.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new T;for(var i in this._layers){var e=this._layers[i];t.extend(e.getBounds?e.getBounds():e.getLatLng())}return t}}),Ge=v.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0]},initialize:function(t){l(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,i){var e=this._getIconUrl(t);if(!e){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(e,i&&"IMG"===i.tagName?i:null);return this._setIconStyles(n,t),n},_setIconStyles:function(t,i){var e=this.options,n=e[i+"Size"];"number"==typeof n&&(n=[n,n]);var o=w(n),s=w("shadow"===i&&e.shadowAnchor||e.iconAnchor||o&&o.divideBy(2,!0));t.className="leaflet-marker-"+i+" "+(e.className||""),s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),o&&(t.style.width=o.x+"px",t.style.height=o.y+"px")},_createImg:function(t,i){return i=i||document.createElement("img"),i.src=t,i},_getIconUrl:function(t){return Ki&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}}),Ke=Ge.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return Ke.imagePath||(Ke.imagePath=this._detectIconPath()),(this.options.imagePath||Ke.imagePath)+Ge.prototype._getIconUrl.call(this,t)},_detectIconPath:function(){var t=ht("div","leaflet-default-icon-path",document.body),i=at(t,"background-image")||at(t,"backgroundImage");return document.body.removeChild(t),i=null===i||0!==i.indexOf("url")?"":i.replace(/^url\(["']?/,"").replace(/marker-icon\.png["']?\)$/,"")}}),Ye=Ze.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new Be(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),pt(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&mt(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var i=this._marker,e=i._map,n=this._marker.options.autoPanSpeed,o=this._marker.options.autoPanPadding,s=L.DomUtil.getPosition(i._icon),r=e.getPixelBounds(),a=e.getPixelOrigin(),h=b(r.min._subtract(a).add(o),r.max._subtract(a).subtract(o));if(!h.contains(s)){var u=w((Math.max(h.max.x,s.x)-h.max.x)/(r.max.x-h.max.x)-(Math.min(h.min.x,s.x)-h.min.x)/(r.min.x-h.min.x),(Math.max(h.max.y,s.y)-h.max.y)/(r.max.y-h.max.y)-(Math.min(h.min.y,s.y)-h.min.y)/(r.min.y-h.min.y)).multiplyBy(n);e.panBy(u,{animate:!1}),this._draggable._newPos._add(u),this._draggable._startPos._add(u),L.DomUtil.setPosition(i._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=f(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup().fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(g(this._panRequest),this._panRequest=f(this._adjustPan.bind(this,t)))},_onDrag:function(t){var i=this._marker,e=i._shadow,n=Pt(i._icon),o=i._map.layerPointToLatLng(n);e&&Lt(e,n),i._latlng=o,t.latlng=o,t.oldLatLng=this._oldLatLng,i.fire("move",t).fire("drag",t)},_onDragEnd:function(t){g(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),Xe=Ue.extend({options:{icon:new Ke,interactive:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",bubblingMouseEvents:!1},initialize:function(t,i){l(this,i),this._latlng=C(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var i=this._latlng;return this._latlng=C(t),this.update(),this.fire("move",{oldLatLng:i,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,i="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),e=t.icon.createIcon(this._icon),n=!1;e!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(e.title=t.title),"IMG"===e.tagName&&(e.alt=t.alt||"")),pt(e,i),t.keyboard&&(e.tabIndex="0"),this._icon=e,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var o=t.icon.createShadow(this._shadow),s=!1;o!==this._shadow&&(this._removeShadow(),s=!0),o&&(pt(o,i),o.alt=""),this._shadow=o,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),o&&s&&this.getPane("shadowPane").appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),ut(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ut(this._shadow),this._shadow=null},_setPos:function(t){Lt(this._icon,t),this._shadow&&Lt(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(i)},_initInteraction:function(){if(this.options.interactive&&(pt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Ye)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Ye(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;vt(this._icon,t),this._shadow&&vt(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}}),Je=Ue.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return l(this,t),this._renderer&&this._renderer._updateStyle(this),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+this._renderer.options.tolerance}}),$e=Je.extend({options:{fill:!0,radius:10},initialize:function(t,i){l(this,i),this._latlng=C(t),this._radius=this.options.radius},setLatLng:function(t){return this._latlng=C(t),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var i=t&&t.radius||this._radius;return Je.prototype.setStyle.call(this,t),this.setRadius(i),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,i=this._radiusY||t,e=this._clickTolerance(),n=[t+e,i+e];this._pxBounds=new P(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}}),Qe=$e.extend({initialize:function(t,e,n){if("number"==typeof e&&(e=i({},n,{radius:e})),l(this,e),this._latlng=C(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new T(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Je.prototype.setStyle,_project:function(){var t=this._latlng.lng,i=this._latlng.lat,e=this._map,n=e.options.crs;if(n.distance===_i.distance){var o=Math.PI/180,s=this._mRadius/_i.R/o,r=e.project([i+s,t]),a=e.project([i-s,t]),h=r.add(a).divideBy(2),u=e.unproject(h).lat,l=Math.acos((Math.cos(s*o)-Math.sin(i*o)*Math.sin(u*o))/(Math.cos(i*o)*Math.cos(u*o)))/o;(isNaN(l)||0===l)&&(l=s/Math.cos(Math.PI/180*i)),this._point=h.subtract(e.getPixelOrigin()),this._radius=isNaN(l)?0:h.x-e.project([u,t-l]).x,this._radiusY=h.y-r.y}else{var c=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=e.latLngToLayerPoint(this._latlng),this._radius=this._point.x-e.latLngToLayerPoint(c).x}this._updateBounds()}}),tn=Je.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,i){l(this,i),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var i,e,n=1/0,o=null,s=Rt,r=0,a=this._parts.length;r<a;r++)for(var h=this._parts[r],u=1,l=h.length;u<l;u++){var c=s(t,i=h[u-1],e=h[u],!0);c<n&&(n=c,o=s(t,i,e))}return o&&(o.distance=Math.sqrt(n)),o},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,i,e,n,o,s,r,a=this._rings[0],h=a.length;if(!h)return null;for(t=0,i=0;t<h-1;t++)i+=a[t].distanceTo(a[t+1])/2;if(0===i)return this._map.layerPointToLatLng(a[0]);for(t=0,n=0;t<h-1;t++)if(o=a[t],s=a[t+1],e=o.distanceTo(s),(n+=e)>i)return r=(n-i)/e,this._map.layerPointToLatLng([s.x-r*(s.x-o.x),s.y-r*(s.y-o.y)])},getBounds:function(){return this._bounds},addLatLng:function(t,i){return i=i||this._defaultShape(),t=C(t),i.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new T,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return Dt(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var i=[],e=Dt(t),n=0,o=t.length;n<o;n++)e?(i[n]=C(t[n]),this._bounds.extend(i[n])):i[n]=this._convertLatLngs(t[n]);return i},_project:function(){var t=new P;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t);var i=this._clickTolerance(),e=new x(i,i);this._bounds.isValid()&&t.isValid()&&(t.min._subtract(e),t.max._add(e),this._pxBounds=t)},_projectLatlngs:function(t,i,e){var n,o,s=t[0]instanceof M,r=t.length;if(s){for(o=[],n=0;n<r;n++)o[n]=this._map.latLngToLayerPoint(t[n]),e.extend(o[n]);i.push(o)}else for(n=0;n<r;n++)this._projectLatlngs(t[n],i,e)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else{var i,e,n,o,s,r,a,h=this._parts;for(i=0,n=0,o=this._rings.length;i<o;i++)for(e=0,s=(a=this._rings[i]).length;e<s-1;e++)(r=At(a[e],a[e+1],t,e,!0))&&(h[n]=h[n]||[],h[n].push(r[0]),r[1]===a[e+1]&&e!==s-2||(h[n].push(r[1]),n++))}},_simplifyPoints:function(){for(var t=this._parts,i=this.options.smoothFactor,e=0,n=t.length;e<n;e++)t[e]=Ct(t[e],i)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,i){var e,n,o,s,r,a,h=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(e=0,s=this._parts.length;e<s;e++)for(n=0,o=(r=(a=this._parts[e]).length)-1;n<r;o=n++)if((i||0!==n)&&Zt(t,a[o],a[n])<=h)return!0;return!1}});tn._flat=Nt;var en=tn.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,i,e,n,o,s,r,a,h,u=this._rings[0],l=u.length;if(!l)return null;for(s=r=a=0,t=0,i=l-1;t<l;i=t++)e=u[t],n=u[i],o=e.y*n.x-n.y*e.x,r+=(e.x+n.x)*o,a+=(e.y+n.y)*o,s+=3*o;return h=0===s?u[0]:[r/s,a/s],this._map.layerPointToLatLng(h)},_convertLatLngs:function(t){var i=tn.prototype._convertLatLngs.call(this,t),e=i.length;return e>=2&&i[0]instanceof M&&i[0].equals(i[e-1])&&i.pop(),i},_setLatLngs:function(t){tn.prototype._setLatLngs.call(this,t),Dt(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Dt(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,i=this.options.weight,e=new x(i,i);if(t=new P(t.min.subtract(e),t.max.add(e)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var n,o=0,s=this._rings.length;o<s;o++)(n=jt(this._rings[o],t,!0)).length&&this._parts.push(n)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var i,e,n,o,s,r,a,h,u=!1;if(!this._pxBounds.contains(t))return!1;for(o=0,a=this._parts.length;o<a;o++)for(s=0,r=(h=(i=this._parts[o]).length)-1;s<h;r=s++)e=i[s],n=i[r],e.y>t.y!=n.y>t.y&&t.x<(n.x-e.x)*(t.y-e.y)/(n.y-e.y)+e.x&&(u=!u);return u||tn.prototype._containsPoint.call(this,t,!0)}}),nn=qe.extend({initialize:function(t,i){l(this,i),this._layers={},t&&this.addData(t)},addData:function(t){var i,e,n,o=ei(t)?t:t.features;if(o){for(i=0,e=o.length;i<e;i++)((n=o[i]).geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var s=this.options;if(s.filter&&!s.filter(t))return this;var r=Wt(t,s);return r?(r.feature=Gt(t),r.defaultOptions=r.options,this.resetStyle(r),s.onEachFeature&&s.onEachFeature(t,r),this.addLayer(r)):this},resetStyle:function(t){return t.options=i({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this},setStyle:function(t){return this.eachLayer(function(i){this._setLayerStyle(i,t)},this)},_setLayerStyle:function(t,i){"function"==typeof i&&(i=i(t.feature)),t.setStyle&&t.setStyle(i)}}),on={toGeoJSON:function(t){return qt(this,{type:"Point",coordinates:Ut(this.getLatLng(),t)})}};Xe.include(on),Qe.include(on),$e.include(on),tn.include({toGeoJSON:function(t){var i=!Dt(this._latlngs),e=Vt(this._latlngs,i?1:0,!1,t);return qt(this,{type:(i?"Multi":"")+"LineString",coordinates:e})}}),en.include({toGeoJSON:function(t){var i=!Dt(this._latlngs),e=i&&!Dt(this._latlngs[0]),n=Vt(this._latlngs,e?2:i?1:0,!0,t);return i||(n=[n]),qt(this,{type:(e?"Multi":"")+"Polygon",coordinates:n})}}),Ve.include({toMultiPoint:function(t){var i=[];return this.eachLayer(function(e){i.push(e.toGeoJSON(t).geometry.coordinates)}),qt(this,{type:"MultiPoint",coordinates:i})},toGeoJSON:function(t){var i=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===i)return this.toMultiPoint(t);var e="GeometryCollection"===i,n=[];return this.eachLayer(function(i){if(i.toGeoJSON){var o=i.toGeoJSON(t);if(e)n.push(o.geometry);else{var s=Gt(o);"FeatureCollection"===s.type?n.push.apply(n,s.features):n.push(s)}}}),e?qt(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});var sn=Kt,rn=Ue.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,i,e){this._url=t,this._bounds=z(i),l(this,e)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(pt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ut(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&ct(this._image),this},bringToBack:function(){return this._map&&_t(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=z(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t="IMG"===this._url.tagName,i=this._image=t?this._url:ht("img");pt(i,"leaflet-image-layer"),this._zoomAnimated&&pt(i,"leaflet-zoom-animated"),this.options.className&&pt(i,this.options.className),i.onselectstart=r,i.onmousemove=r,i.onload=e(this.fire,this,"load"),i.onerror=e(this._overlayOnError,this,"error"),this.options.crossOrigin&&(i.crossOrigin=""),this.options.zIndex&&this._updateZIndex(),t?this._url=i.src:(i.src=this._url,i.alt=this.options.alt)},_animateZoom:function(t){var i=this._map.getZoomScale(t.zoom),e=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;wt(this._image,e,i)},_reset:function(){var t=this._image,i=new P(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),e=i.getSize();Lt(t,i.min),t.style.width=e.x+"px",t.style.height=e.y+"px"},_updateOpacity:function(){vt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)}}),an=rn.extend({options:{autoplay:!0,loop:!0},_initImage:function(){var t="VIDEO"===this._url.tagName,i=this._image=t?this._url:ht("video");if(pt(i,"leaflet-image-layer"),this._zoomAnimated&&pt(i,"leaflet-zoom-animated"),i.onselectstart=r,i.onmousemove=r,i.onloadeddata=e(this.fire,this,"load"),t){for(var n=i.getElementsByTagName("source"),o=[],s=0;s<n.length;s++)o.push(n[s].src);this._url=n.length>0?o:[i.src]}else{ei(this._url)||(this._url=[this._url]),i.autoplay=!!this.options.autoplay,i.loop=!!this.options.loop;for(var a=0;a<this._url.length;a++){var h=ht("source");h.src=this._url[a],i.appendChild(h)}}}}),hn=Ue.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function(t,i){l(this,t),this._source=i},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&vt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&vt(this._container,1),this.bringToFront()},onRemove:function(t){t._fadeAnimated?(vt(this._container,0),this._removeTimeout=setTimeout(e(ut,void 0,this._container),200)):ut(this._container)},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=C(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&ct(this._container),this},bringToBack:function(){return this._map&&_t(this._container),this},_updateContent:function(){if(this._content){var t=this._contentNode,i="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof i)t.innerHTML=i;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(i)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),i=w(this.options.offset),e=this._getAnchor();this._zoomAnimated?Lt(this._container,t.add(e)):i=i.add(t).add(e);var n=this._containerBottom=-i.y,o=this._containerLeft=-Math.round(this._containerWidth/2)+i.x;this._container.style.bottom=n+"px",this._container.style.left=o+"px"}},_getAnchor:function(){return[0,0]}}),un=hn.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t.openPopup(this),this},onAdd:function(t){hn.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Je||this._source.on("preclick",Y))},onRemove:function(t){hn.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Je||this._source.off("preclick",Y))},getEvents:function(){var t=hn.prototype.getEvents.call(this);return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t="leaflet-popup",i=this._container=ht("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),e=this._wrapper=ht("div",t+"-content-wrapper",i);if(this._contentNode=ht("div",t+"-content",e),J(e),X(this._contentNode),V(e,"contextmenu",Y),this._tipContainer=ht("div",t+"-tip-container",i),this._tip=ht("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=ht("a",t+"-close-button",i);n.href="#close",n.innerHTML="&#215;",V(n,"click",this._onCloseButtonClick,this)}},_updateLayout:function(){var t=this._contentNode,i=t.style;i.width="",i.whiteSpace="nowrap";var e=t.offsetWidth;e=Math.min(e,this.options.maxWidth),e=Math.max(e,this.options.minWidth),i.width=e+1+"px",i.whiteSpace="",i.height="";var n=t.offsetHeight,o=this.options.maxHeight;o&&n>o?(i.height=o+"px",pt(t,"leaflet-popup-scrolled")):mt(t,"leaflet-popup-scrolled"),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),e=this._getAnchor();Lt(this._container,i.add(e))},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var t=this._map,i=parseInt(at(this._container,"marginBottom"),10)||0,e=this._container.offsetHeight+i,n=this._containerWidth,o=new x(this._containerLeft,-e-this._containerBottom);o._add(Pt(this._container));var s=t.layerPointToContainerPoint(o),r=w(this.options.autoPanPadding),a=w(this.options.autoPanPaddingTopLeft||r),h=w(this.options.autoPanPaddingBottomRight||r),u=t.getSize(),l=0,c=0;s.x+n+h.x>u.x&&(l=s.x+n-u.x+h.x),s.x-l-a.x<0&&(l=s.x-a.x),s.y+e+h.y>u.y&&(c=s.y+e-u.y+h.y),s.y-c-a.y<0&&(c=s.y-a.y),(l||c)&&t.fire("autopanstart").panBy([l,c])}},_onCloseButtonClick:function(t){this._close(),Q(t)},_getAnchor:function(){return w(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}});Le.mergeOptions({closePopupOnClick:!0}),Le.include({openPopup:function(t,i,e){return t instanceof un||(t=new un(e).setContent(t)),i&&t.setLatLng(i),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t))},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),Ue.include({bindPopup:function(t,i){return t instanceof un?(l(t,i),this._popup=t,t._source=this):(this._popup&&!i||(this._popup=new un(i,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t,i){if(t instanceof Ue||(i=t,t=this),t instanceof qe)for(var e in this._layers){t=this._layers[e];break}return i||(i=t.getCenter?t.getCenter():t.getLatLng()),this._popup&&this._map&&(this._popup._source=t,this._popup.update(),this._map.openPopup(this._popup,i)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var i=t.layer||t.target;this._popup&&this._map&&(Q(t),i instanceof Je?this.openPopup(t.layer||t.target,t.latlng):this._map.hasLayer(this._popup)&&this._popup._source===i?this.closePopup():this.openPopup(i,t.latlng))},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){13===t.originalEvent.keyCode&&this._openPopup(t)}});var ln=hn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:.9},onAdd:function(t){hn.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0)},onRemove:function(t){hn.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0)},getEvents:function(){var t=hn.prototype.getEvents.call(this);return Vi&&!this.options.permanent&&(t.preclick=this._close),t},_close:function(){this._map&&this._map.closeTooltip(this)},_initLayout:function(){var t="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=ht("div",t)},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var i=this._map,e=this._container,n=i.latLngToContainerPoint(i.getCenter()),o=i.layerPointToContainerPoint(t),s=this.options.direction,r=e.offsetWidth,a=e.offsetHeight,h=w(this.options.offset),u=this._getAnchor();"top"===s?t=t.add(w(-r/2+h.x,-a+h.y+u.y,!0)):"bottom"===s?t=t.subtract(w(r/2-h.x,-h.y,!0)):"center"===s?t=t.subtract(w(r/2+h.x,a/2-u.y+h.y,!0)):"right"===s||"auto"===s&&o.x<n.x?(s="right",t=t.add(w(h.x+u.x,u.y-a/2+h.y,!0))):(s="left",t=t.subtract(w(r+u.x-h.x,a/2-u.y-h.y,!0))),mt(e,"leaflet-tooltip-right"),mt(e,"leaflet-tooltip-left"),mt(e,"leaflet-tooltip-top"),mt(e,"leaflet-tooltip-bottom"),pt(e,"leaflet-tooltip-"+s),Lt(e,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&vt(this._container,t)},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(i)},_getAnchor:function(){return w(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}});Le.include({openTooltip:function(t,i,e){return t instanceof ln||(t=new ln(e).setContent(t)),i&&t.setLatLng(i),this.hasLayer(t)?this:this.addLayer(t)},closeTooltip:function(t){return t&&this.removeLayer(t),this}}),Ue.include({bindTooltip:function(t,i){return t instanceof ln?(l(t,i),this._tooltip=t,t._source=this):(this._tooltip&&!i||(this._tooltip=new ln(i,this)),this._tooltip.setContent(t)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(t||!this._tooltipHandlersAdded){var i=t?"off":"on",e={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?e.add=this._openTooltip:(e.mouseover=this._openTooltip,e.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(e.mousemove=this._moveTooltip),Vi&&(e.click=this._openTooltip)),this[i](e),this._tooltipHandlersAdded=!t}},openTooltip:function(t,i){if(t instanceof Ue||(i=t,t=this),t instanceof qe)for(var e in this._layers){t=this._layers[e];break}return i||(i=t.getCenter?t.getCenter():t.getLatLng()),this._tooltip&&this._map&&(this._tooltip._source=t,this._tooltip.update(),this._map.openTooltip(this._tooltip,i),this._tooltip.options.interactive&&this._tooltip._container&&(pt(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this},closeTooltip:function(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(mt(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this},toggleTooltip:function(t){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(t)),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_openTooltip:function(t){var i=t.layer||t.target;this._tooltip&&this._map&&this.openTooltip(i,this._tooltip.options.sticky?t.latlng:void 0)},_moveTooltip:function(t){var i,e,n=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),e=this._map.containerPointToLayerPoint(i),n=this._map.layerPointToLatLng(e)),this._tooltip.setLatLng(n)}});var cn=Ge.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var i=t&&"DIV"===t.tagName?t:document.createElement("div"),e=this.options;if(i.innerHTML=!1!==e.html?e.html:"",e.bgPos){var n=w(e.bgPos);i.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(i,"icon"),i},createShadow:function(){return null}});Ge.Default=Ke;var _n=Ue.extend({options:{tileSize:256,opacity:1,updateWhenIdle:ji,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){l(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),ut(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(ct(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(_t(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=o(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof x?t:new x(t,t)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var i,e=this.getPane().children,n=-t(-1/0,1/0),o=0,s=e.length;o<s;o++)i=e[o].style.zIndex,e[o]!==this._container&&i&&(n=t(n,+i));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Li){vt(this._container,this.options.opacity);var t=+new Date,i=!1,e=!1;for(var n in this._tiles){var o=this._tiles[n];if(o.current&&o.loaded){var s=Math.min(1,(t-o.loaded)/200);vt(o.el,s),s<1?i=!0:(o.active?e=!0:this._onOpaqueTile(o),o.active=!0)}}e&&!this._noPrune&&this._pruneTiles(),i&&(g(this._fadeFrame),this._fadeFrame=f(this._updateOpacity,this))}},_onOpaqueTile:r,_initContainer:function(){this._container||(this._container=ht("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,i=this.options.maxZoom;if(void 0!==t){for(var e in this._levels)this._levels[e].el.children.length||e===t?(this._levels[e].el.style.zIndex=i-Math.abs(t-e),this._onUpdateLevel(e)):(ut(this._levels[e].el),this._removeTilesAtZoom(e),this._onRemoveLevel(e),delete this._levels[e]);var n=this._levels[t],o=this._map;return n||((n=this._levels[t]={}).el=ht("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=i,n.origin=o.project(o.unproject(o.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,o.getCenter(),o.getZoom()),n.el.offsetWidth,this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:r,_onRemoveLevel:r,_onCreateLevel:r,_pruneTiles:function(){if(this._map){var t,i,e=this._map.getZoom();if(e>this.options.maxZoom||e<this.options.minZoom)this._removeAllTiles();else{for(t in this._tiles)(i=this._tiles[t]).retain=i.current;for(t in this._tiles)if((i=this._tiles[t]).current&&!i.active){var n=i.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}}},_removeTilesAtZoom:function(t){for(var i in this._tiles)this._tiles[i].coords.z===t&&this._removeTile(i)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)ut(this._levels[t].el),this._onRemoveLevel(t),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,i,e,n){var o=Math.floor(t/2),s=Math.floor(i/2),r=e-1,a=new x(+o,+s);a.z=+r;var h=this._tileCoordsToKey(a),u=this._tiles[h];return u&&u.active?(u.retain=!0,!0):(u&&u.loaded&&(u.retain=!0),r>n&&this._retainParent(o,s,r,n))},_retainChildren:function(t,i,e,n){for(var o=2*t;o<2*t+2;o++)for(var s=2*i;s<2*i+2;s++){var r=new x(o,s);r.z=e+1;var a=this._tileCoordsToKey(r),h=this._tiles[a];h&&h.active?h.retain=!0:(h&&h.loaded&&(h.retain=!0),e+1<n&&this._retainChildren(o,s,e+1,n))}},_resetView:function(t){var i=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),i,i)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var i=this.options;return void 0!==i.minNativeZoom&&t<i.minNativeZoom?i.minNativeZoom:void 0!==i.maxNativeZoom&&i.maxNativeZoom<t?i.maxNativeZoom:t},_setView:function(t,i,e,n){var o=this._clampZoom(Math.round(i));(void 0!==this.options.maxZoom&&o>this.options.maxZoom||void 0!==this.options.minZoom&&o<this.options.minZoom)&&(o=void 0);var s=this.options.updateWhenZooming&&o!==this._tileZoom;n&&!s||(this._tileZoom=o,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==o&&this._update(t),e||this._pruneTiles(),this._noPrune=!!e),this._setZoomTransforms(t,i)},_setZoomTransforms:function(t,i){for(var e in this._levels)this._setZoomTransform(this._levels[e],t,i)},_setZoomTransform:function(t,i,e){var n=this._map.getZoomScale(e,t.zoom),o=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i,e)).round();Ni?wt(t.el,o,n):Lt(t.el,o)},_resetGrid:function(){var t=this._map,i=t.options.crs,e=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=i.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,i.wrapLng[0]],n).x/e.x),Math.ceil(t.project([0,i.wrapLng[1]],n).x/e.y)],this._wrapY=i.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([i.wrapLat[0],0],n).y/e.x),Math.ceil(t.project([i.wrapLat[1],0],n).y/e.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var i=this._map,e=i._animatingZoom?Math.max(i._animateToZoom,i.getZoom()):i.getZoom(),n=i.getZoomScale(e,this._tileZoom),o=i.project(t,this._tileZoom).floor(),s=i.getSize().divideBy(2*n);return new P(o.subtract(s),o.add(s))},_update:function(t){var i=this._map;if(i){var e=this._clampZoom(i.getZoom());if(void 0===t&&(t=i.getCenter()),void 0!==this._tileZoom){var n=this._getTiledPixelBounds(t),o=this._pxBoundsToTileRange(n),s=o.getCenter(),r=[],a=this.options.keepBuffer,h=new P(o.getBottomLeft().subtract([a,-a]),o.getTopRight().add([a,-a]));if(!(isFinite(o.min.x)&&isFinite(o.min.y)&&isFinite(o.max.x)&&isFinite(o.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var u in this._tiles){var l=this._tiles[u].coords;l.z===this._tileZoom&&h.contains(new x(l.x,l.y))||(this._tiles[u].current=!1)}if(Math.abs(e-this._tileZoom)>1)this._setView(t,e);else{for(var c=o.min.y;c<=o.max.y;c++)for(var _=o.min.x;_<=o.max.x;_++){var d=new x(_,c);if(d.z=this._tileZoom,this._isValidTile(d)){var p=this._tiles[this._tileCoordsToKey(d)];p?p.current=!0:r.push(d)}}if(r.sort(function(t,i){return t.distanceTo(s)-i.distanceTo(s)}),0!==r.length){this._loading||(this._loading=!0,this.fire("loading"));var m=document.createDocumentFragment();for(_=0;_<r.length;_++)this._addTile(r[_],m);this._level.el.appendChild(m)}}}}},_isValidTile:function(t){var i=this._map.options.crs;if(!i.infinite){var e=this._globalTileRange;if(!i.wrapLng&&(t.x<e.min.x||t.x>e.max.x)||!i.wrapLat&&(t.y<e.min.y||t.y>e.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return z(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var i=this._map,e=this.getTileSize(),n=t.scaleBy(e),o=n.add(e);return[i.unproject(n,t.z),i.unproject(o,t.z)]},_tileCoordsToBounds:function(t){var i=this._tileCoordsToNwSe(t),e=new T(i[0],i[1]);return this.options.noWrap||(e=this._map.wrapLatLngBounds(e)),e},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var i=t.split(":"),e=new x(+i[0],+i[1]);return e.z=+i[2],e},_removeTile:function(t){var i=this._tiles[t];i&&(Ci||i.el.setAttribute("src",ni),ut(i.el),delete this._tiles[t],this.fire("tileunload",{tile:i.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){pt(t,"leaflet-tile");var i=this.getTileSize();t.style.width=i.x+"px",t.style.height=i.y+"px",t.onselectstart=r,t.onmousemove=r,Li&&this.options.opacity<1&&vt(t,this.options.opacity),Ti&&!zi&&(t.style.WebkitBackfaceVisibility="hidden")},_addTile:function(t,i){var n=this._getTilePos(t),o=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),e(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&f(e(this._tileReady,this,t,null,s)),Lt(s,n),this._tiles[o]={el:s,coords:t,current:!0},i.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,i,n){if(this._map){i&&this.fire("tileerror",{error:i,tile:n,coords:t});var o=this._tileCoordsToKey(t);(n=this._tiles[o])&&(n.loaded=+new Date,this._map._fadeAnimated?(vt(n.el,0),g(this._fadeFrame),this._fadeFrame=f(this._updateOpacity,this)):(n.active=!0,this._pruneTiles()),i||(pt(n.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:n.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Li||!this._map._fadeAnimated?f(this._pruneTiles,this):setTimeout(e(this._pruneTiles,this),250)))}},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var i=new x(this._wrapX?s(t.x,this._wrapX):t.x,this._wrapY?s(t.y,this._wrapY):t.y);return i.z=t.z,i},_pxBoundsToTileRange:function(t){var i=this.getTileSize();return new P(t.min.unscaleBy(i).floor(),t.max.unscaleBy(i).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}}),dn=_n.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(t,i){this._url=t,(i=l(this,i)).detectRetina&&Ki&&i.maxZoom>0&&(i.tileSize=Math.floor(i.tileSize/2),i.zoomReverse?(i.zoomOffset--,i.minZoom++):(i.zoomOffset++,i.maxZoom--),i.minZoom=Math.max(0,i.minZoom)),"string"==typeof i.subdomains&&(i.subdomains=i.subdomains.split("")),Ti||this.on("tileunload",this._onTileRemove)},setUrl:function(t,i){return this._url=t,i||this.redraw(),this},createTile:function(t,i){var n=document.createElement("img");return V(n,"load",e(this._tileOnLoad,this,i,n)),V(n,"error",e(this._tileOnError,this,i,n)),this.options.crossOrigin&&(n.crossOrigin=""),n.alt="",n.setAttribute("role","presentation"),n.src=this.getTileUrl(t),n},getTileUrl:function(t){var e={r:Ki?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var n=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=n),e["-y"]=n}return _(this._url,i(e,this.options))},_tileOnLoad:function(t,i){Li?setTimeout(e(t,this,null,i),0):t(null,i)},_tileOnError:function(t,i,e){var n=this.options.errorTileUrl;n&&i.getAttribute("src")!==n&&(i.src=n),t(e,i)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,i=this.options.maxZoom,e=this.options.zoomReverse,n=this.options.zoomOffset;return e&&(t=i-t),t+n},_getSubdomain:function(t){var i=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[i]},_abortLoading:function(){var t,i;for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&((i=this._tiles[t].el).onload=r,i.onerror=r,i.complete||(i.src=ni,ut(i),delete this._tiles[t]))}}),pn=dn.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var n=i({},this.defaultWmsParams);for(var o in e)o in this.options||(n[o]=e[o]);var s=(e=l(this,e)).detectRetina&&Ki?2:1,r=this.getTileSize();n.width=r.x*s,n.height=r.y*s,this.wmsParams=n},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var i=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[i]=this._crs.code,dn.prototype.onAdd.call(this,t)},getTileUrl:function(t){var i=this._tileCoordsToNwSe(t),e=this._crs,n=b(e.project(i[0]),e.project(i[1])),o=n.min,s=n.max,r=(this._wmsVersion>=1.3&&this._crs===He?[o.y,o.x,s.y,s.x]:[o.x,o.y,s.x,s.y]).join(","),a=L.TileLayer.prototype.getTileUrl.call(this,t);return a+c(this.wmsParams,a,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+r},setParams:function(t,e){return i(this.wmsParams,t),e||this.redraw(),this}});dn.WMS=pn,Yt.wms=function(t,i){return new pn(t,i)};var mn=Ue.extend({options:{padding:.1,tolerance:0},initialize:function(t){l(this,t),n(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&pt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,i){var e=this._map.getZoomScale(i,this._zoom),n=Pt(this._container),o=this._map.getSize().multiplyBy(.5+this.options.padding),s=this._map.project(this._center,i),r=this._map.project(t,i).subtract(s),a=o.multiplyBy(-e).add(n).add(o).subtract(r);Ni?wt(this._container,a,e):Lt(this._container,a)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,i=this._map.getSize(),e=this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();this._bounds=new P(e,e.add(i.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),fn=mn.extend({getEvents:function(){var t=mn.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){mn.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");V(t,"mousemove",o(this._onMouseMove,32,this),this),V(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),V(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d")},_destroyContainer:function(){delete this._ctx,ut(this._container),q(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){this._redrawBounds=null;for(var t in this._layers)this._layers[t]._update();this._redraw()}},_update:function(){if(!this._map._animatingZoom||!this._bounds){this._drawnLayers={},mn.prototype._update.call(this);var t=this._bounds,i=this._container,e=t.getSize(),n=Ki?2:1;Lt(i,t.min),i.width=n*e.x,i.height=n*e.y,i.style.width=e.x+"px",i.style.height=e.y+"px",Ki&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){mn.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[n(t)]=t;var i=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=i),this._drawLast=i,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var i=t._order,e=i.next,n=i.prev;e?e.prev=n:this._drawLast=n,n?n.next=e:this._drawFirst=e,delete t._order,delete this._layers[L.stamp(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(t.options.dashArray){var i,e=t.options.dashArray.split(","),n=[];for(i=0;i<e.length;i++)n.push(Number(e[i]));t.options._dashArray=n}},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||f(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var i=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new P,this._redrawBounds.extend(t._pxBounds.min.subtract([i,i])),this._redrawBounds.extend(t._pxBounds.max.add([i,i]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var i=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,i.x,i.y)}else this._ctx.clearRect(0,0,this._container.width,this._container.height)},_draw:function(){var t,i=this._redrawBounds;if(this._ctx.save(),i){var e=i.getSize();this._ctx.beginPath(),this._ctx.rect(i.min.x,i.min.y,e.x,e.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!i||t._pxBounds&&t._pxBounds.intersects(i))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,i){if(this._drawing){var e,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(this._drawnLayers[t._leaflet_id]=t,h.beginPath(),e=0;e<a;e++){for(n=0,o=r[e].length;n<o;n++)s=r[e][n],h[n?"lineTo":"moveTo"](s.x,s.y);i&&h.closePath()}this._fillStroke(h,t)}}},_updateCircle:function(t){if(this._drawing&&!t._empty()){var i=t._point,e=this._ctx,n=Math.max(Math.round(t._radius),1),o=(Math.max(Math.round(t._radiusY),1)||n)/n;this._drawnLayers[t._leaflet_id]=t,1!==o&&(e.save(),e.scale(1,o)),e.beginPath(),e.arc(i.x,i.y/o,n,0,2*Math.PI,!1),1!==o&&e.restore(),this._fillStroke(e,t)}},_fillStroke:function(t,i){var e=i.options;e.fill&&(t.globalAlpha=e.fillOpacity,t.fillStyle=e.fillColor||e.color,t.fill(e.fillRule||"evenodd")),e.stroke&&0!==e.weight&&(t.setLineDash&&t.setLineDash(i.options&&i.options._dashArray||[]),t.globalAlpha=e.opacity,t.lineWidth=e.weight,t.strokeStyle=e.color,t.lineCap=e.lineCap,t.lineJoin=e.lineJoin,t.stroke())},_onClick:function(t){for(var i,e,n=this._map.mouseEventToLayerPoint(t),o=this._drawFirst;o;o=o.next)(i=o.layer).options.interactive&&i._containsPoint(n)&&!this._map._draggableMoved(i)&&(e=i);e&&(et(t),this._fireEvent([e],t))},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var i=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,i)}},_handleMouseOut:function(t){var i=this._hoveredLayer;i&&(mt(this._container,"leaflet-interactive"),this._fireEvent([i],t,"mouseout"),this._hoveredLayer=null)},_handleMouseHover:function(t,i){for(var e,n,o=this._drawFirst;o;o=o.next)(e=o.layer).options.interactive&&e._containsPoint(i)&&(n=e);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(pt(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t)},_fireEvent:function(t,i,e){this._map._fireDOMEvent(i,e||i.type,t)},_bringToFront:function(t){var i=t._order,e=i.next,n=i.prev;e&&(e.prev=n,n?n.next=e:e&&(this._drawFirst=e),i.prev=this._drawLast,this._drawLast.next=i,i.next=null,this._drawLast=i,this._requestRedraw(t))},_bringToBack:function(t){var i=t._order,e=i.next,n=i.prev;n&&(n.next=e,e?e.prev=n:n&&(this._drawLast=n),i.prev=null,i.next=this._drawFirst,this._drawFirst.prev=i,this._drawFirst=i,this._requestRedraw(t))}}),gn=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),vn={_initContainer:function(){this._container=ht("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(mn.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var i=t._container=gn("shape");pt(i,"leaflet-vml-shape "+(this.options.className||"")),i.coordsize="1 1",t._path=gn("path"),i.appendChild(t._path),this._updateStyle(t),this._layers[n(t)]=t},_addPath:function(t){var i=t._container;this._container.appendChild(i),t.options.interactive&&t.addInteractiveTarget(i)},_removePath:function(t){var i=t._container;ut(i),t.removeInteractiveTarget(i),delete this._layers[n(t)]},_updateStyle:function(t){var i=t._stroke,e=t._fill,n=t.options,o=t._container;o.stroked=!!n.stroke,o.filled=!!n.fill,n.stroke?(i||(i=t._stroke=gn("stroke")),o.appendChild(i),i.weight=n.weight+"px",i.color=n.color,i.opacity=n.opacity,n.dashArray?i.dashStyle=ei(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):i.dashStyle="",i.endcap=n.lineCap.replace("butt","flat"),i.joinstyle=n.lineJoin):i&&(o.removeChild(i),t._stroke=null),n.fill?(e||(e=t._fill=gn("fill")),o.appendChild(e),e.color=n.fillColor||n.color,e.opacity=n.fillOpacity):e&&(o.removeChild(e),t._fill=null)},_updateCircle:function(t){var i=t._point.round(),e=Math.round(t._radius),n=Math.round(t._radiusY||e);this._setPath(t,t._empty()?"M0 0":"AL "+i.x+","+i.y+" "+e+","+n+" 0,23592600")},_setPath:function(t,i){t._path.v=i},_bringToFront:function(t){ct(t._container)},_bringToBack:function(t){_t(t._container)}},yn=Ji?gn:E,xn=mn.extend({getEvents:function(){var t=mn.prototype.getEvents.call(this);return t.zoomstart=this._onZoomStart,t},_initContainer:function(){this._container=yn("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=yn("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ut(this._container),q(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_onZoomStart:function(){this._update()},_update:function(){if(!this._map._animatingZoom||!this._bounds){mn.prototype._update.call(this);var t=this._bounds,i=t.getSize(),e=this._container;this._svgSize&&this._svgSize.equals(i)||(this._svgSize=i,e.setAttribute("width",i.x),e.setAttribute("height",i.y)),Lt(e,t.min),e.setAttribute("viewBox",[t.min.x,t.min.y,i.x,i.y].join(" ")),this.fire("update")}},_initPath:function(t){var i=t._path=yn("path");t.options.className&&pt(i,t.options.className),t.options.interactive&&pt(i,"leaflet-interactive"),this._updateStyle(t),this._layers[n(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){ut(t._path),t.removeInteractiveTarget(t._path),delete this._layers[n(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var i=t._path,e=t.options;i&&(e.stroke?(i.setAttribute("stroke",e.color),i.setAttribute("stroke-opacity",e.opacity),i.setAttribute("stroke-width",e.weight),i.setAttribute("stroke-linecap",e.lineCap),i.setAttribute("stroke-linejoin",e.lineJoin),e.dashArray?i.setAttribute("stroke-dasharray",e.dashArray):i.removeAttribute("stroke-dasharray"),e.dashOffset?i.setAttribute("stroke-dashoffset",e.dashOffset):i.removeAttribute("stroke-dashoffset")):i.setAttribute("stroke","none"),e.fill?(i.setAttribute("fill",e.fillColor||e.color),i.setAttribute("fill-opacity",e.fillOpacity),i.setAttribute("fill-rule",e.fillRule||"evenodd")):i.setAttribute("fill","none"))},_updatePoly:function(t,i){this._setPath(t,k(t._parts,i))},_updateCircle:function(t){var i=t._point,e=Math.max(Math.round(t._radius),1),n="a"+e+","+(Math.max(Math.round(t._radiusY),1)||e)+" 0 1,0 ",o=t._empty()?"M0 0":"M"+(i.x-e)+","+i.y+n+2*e+",0 "+n+2*-e+",0 ";this._setPath(t,o)},_setPath:function(t,i){t._path.setAttribute("d",i)},_bringToFront:function(t){ct(t._path)},_bringToBack:function(t){_t(t._path)}});Ji&&xn.include(vn),Le.include({getRenderer:function(t){var i=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return i||(i=this._renderer=this.options.preferCanvas&&Xt()||Jt()),this.hasLayer(i)||this.addLayer(i),i},_getPaneRenderer:function(t){if("overlayPane"===t||void 0===t)return!1;var i=this._paneRenderers[t];return void 0===i&&(i=xn&&Jt({pane:t})||fn&&Xt({pane:t}),this._paneRenderers[t]=i),i}});var wn=en.extend({initialize:function(t,i){en.prototype.initialize.call(this,this._boundsToLatLngs(t),i)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=z(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});xn.create=yn,xn.pointsToPath=k,nn.geometryToLayer=Wt,nn.coordsToLatLng=Ht,nn.coordsToLatLngs=Ft,nn.latLngToCoords=Ut,nn.latLngsToCoords=Vt,nn.getFeature=qt,nn.asFeature=Gt,Le.mergeOptions({boxZoom:!0});var Ln=Ze.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){V(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){q(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ut(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||1!==t.which&&1!==t.button)return!1;this._clearDeferredResetState(),this._resetState(),mi(),bt(),this._startPoint=this._map.mouseEventToContainerPoint(t),V(document,{contextmenu:Q,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=ht("div","leaflet-zoom-box",this._container),pt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var i=new P(this._point,this._startPoint),e=i.getSize();Lt(this._box,i.min),this._box.style.width=e.x+"px",this._box.style.height=e.y+"px"},_finish:function(){this._moved&&(ut(this._box),mt(this._container,"leaflet-crosshair")),fi(),Tt(),q(document,{contextmenu:Q,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(e(this._resetState,this),0);var i=new T(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(i).fire("boxzoomend",{boxZoomBounds:i})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}});Le.addInitHook("addHandler","boxZoom",Ln),Le.mergeOptions({doubleClickZoom:!0});var Pn=Ze.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var i=this._map,e=i.getZoom(),n=i.options.zoomDelta,o=t.originalEvent.shiftKey?e-n:e+n;"center"===i.options.doubleClickZoom?i.setZoom(o):i.setZoomAround(t.containerPoint,o)}});Le.addInitHook("addHandler","doubleClickZoom",Pn),Le.mergeOptions({dragging:!0,inertia:!zi,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var bn=Ze.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new Be(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}pt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){mt(this._map._container,"leaflet-grab"),mt(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var i=z(this._map.options.maxBounds);this._offsetLimit=b(this._map.latLngToContainerPoint(i.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(i.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var i=this._lastTime=+new Date,e=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(e),this._times.push(i),this._prunePositions(i)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),i=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=i.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,i){return t-(t-i)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),i=this._offsetLimit;t.x<i.min.x&&(t.x=this._viscousLimit(t.x,i.min.x)),t.y<i.min.y&&(t.y=this._viscousLimit(t.y,i.min.y)),t.x>i.max.x&&(t.x=this._viscousLimit(t.x,i.max.x)),t.y>i.max.y&&(t.y=this._viscousLimit(t.y,i.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,i=Math.round(t/2),e=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-i+e)%t+i-e,s=(n+i+e)%t-i-e,r=Math.abs(o+e)<Math.abs(s+e)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r},_onDragEnd:function(t){var i=this._map,e=i.options,n=!e.inertia||this._times.length<2;if(i.fire("dragend",t),n)i.fire("moveend");else{this._prunePositions(+new Date);var o=this._lastPos.subtract(this._positions[0]),s=(this._lastTime-this._times[0])/1e3,r=e.easeLinearity,a=o.multiplyBy(r/s),h=a.distanceTo([0,0]),u=Math.min(e.inertiaMaxSpeed,h),l=a.multiplyBy(u/h),c=u/(e.inertiaDeceleration*r),_=l.multiplyBy(-c/2).round();_.x||_.y?(_=i._limitOffset(_,i.options.maxBounds),f(function(){i.panBy(_,{duration:c,easeLinearity:r,noMoveStart:!0,animate:!0})})):i.fire("moveend")}}});Le.addInitHook("addHandler","dragging",bn),Le.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Tn=Ze.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),V(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),q(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,i=document.documentElement,e=t.scrollTop||i.scrollTop,n=t.scrollLeft||i.scrollLeft;this._map._container.focus(),window.scrollTo(n,e)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var i,e,n=this._panKeys={},o=this.keyCodes;for(i=0,e=o.left.length;i<e;i++)n[o.left[i]]=[-1*t,0];for(i=0,e=o.right.length;i<e;i++)n[o.right[i]]=[t,0];for(i=0,e=o.down.length;i<e;i++)n[o.down[i]]=[0,t];for(i=0,e=o.up.length;i<e;i++)n[o.up[i]]=[0,-1*t]},_setZoomDelta:function(t){var i,e,n=this._zoomKeys={},o=this.keyCodes;for(i=0,e=o.zoomIn.length;i<e;i++)n[o.zoomIn[i]]=t;for(i=0,e=o.zoomOut.length;i<e;i++)n[o.zoomOut[i]]=-t},_addHooks:function(){V(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){q(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var i,e=t.keyCode,n=this._map;if(e in this._panKeys){if(n._panAnim&&n._panAnim._inProgress)return;i=this._panKeys[e],t.shiftKey&&(i=w(i).multiplyBy(3)),n.panBy(i),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds)}else if(e in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else{if(27!==e||!n._popup||!n._popup.options.closeOnEscapeKey)return;n.closePopup()}Q(t)}}});Le.addInitHook("addHandler","keyboard",Tn),Le.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var zn=Ze.extend({addHooks:function(){V(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){q(this._map._container,"mousewheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var i=it(t),n=this._map.options.wheelDebounceTime;this._delta+=i,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var o=Math.max(n-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(e(this._performZoom,this),o),Q(t)},_performZoom:function(){var t=this._map,i=t.getZoom(),e=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=e?Math.ceil(o/e)*e:o,r=t._limitZoom(i+(this._delta>0?s:-s))-i;this._delta=0,this._startTime=null,r&&("center"===t.options.scrollWheelZoom?t.setZoom(i+r):t.setZoomAround(this._lastMousePos,i+r))}});Le.addInitHook("addHandler","scrollWheelZoom",zn),Le.mergeOptions({tap:!0,tapTolerance:15});var Mn=Ze.extend({addHooks:function(){V(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){q(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if($(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],n=i.target;this._startPos=this._newPos=new x(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&pt(n,"leaflet-active"),this._holdTimeout=setTimeout(e(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),this._simulateEvent("mousedown",i),V(document,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),q(document,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],e=i.target;e&&e.tagName&&"a"===e.tagName.toLowerCase()&&mt(e,"leaflet-active"),this._simulateEvent("mouseup",i),this._isTapValid()&&this._simulateEvent("click",i)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var i=t.touches[0];this._newPos=new x(i.clientX,i.clientY),this._simulateEvent("mousemove",i)},_simulateEvent:function(t,i){var e=document.createEvent("MouseEvents");e._simulated=!0,i.target._simulatedClick=!0,e.initMouseEvent(t,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),i.target.dispatchEvent(e)}});Vi&&!Ui&&Le.addInitHook("addHandler","tap",Mn),Le.mergeOptions({touchZoom:Vi&&!zi,bounceAtZoomLimits:!0});var Cn=Ze.extend({addHooks:function(){pt(this._map._container,"leaflet-touch-zoom"),V(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){mt(this._map._container,"leaflet-touch-zoom"),q(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var e=i.mouseEventToContainerPoint(t.touches[0]),n=i.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=i.getSize()._divideBy(2),this._startLatLng=i.containerPointToLatLng(this._centerPoint),"center"!==i.options.touchZoom&&(this._pinchStartLatLng=i.containerPointToLatLng(e.add(n)._divideBy(2))),this._startDist=e.distanceTo(n),this._startZoom=i.getZoom(),this._moved=!1,this._zooming=!0,i._stop(),V(document,"touchmove",this._onTouchMove,this),V(document,"touchend",this._onTouchEnd,this),$(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var i=this._map,n=i.mouseEventToContainerPoint(t.touches[0]),o=i.mouseEventToContainerPoint(t.touches[1]),s=n.distanceTo(o)/this._startDist;if(this._zoom=i.getScaleZoom(s,this._startZoom),!i.options.bounceAtZoomLimits&&(this._zoom<i.getMinZoom()&&s<1||this._zoom>i.getMaxZoom()&&s>1)&&(this._zoom=i._limitZoom(this._zoom)),"center"===i.options.touchZoom){if(this._center=this._startLatLng,1===s)return}else{var r=n._add(o)._divideBy(2)._subtract(this._centerPoint);if(1===s&&0===r.x&&0===r.y)return;this._center=i.unproject(i.project(this._pinchStartLatLng,this._zoom).subtract(r),this._zoom)}this._moved||(i._moveStart(!0,!1),this._moved=!0),g(this._animRequest);var a=e(i._move,i,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=f(a,this,!0),$(t)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,g(this._animRequest),q(document,"touchmove",this._onTouchMove),q(document,"touchend",this._onTouchEnd),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}});Le.addInitHook("addHandler","touchZoom",Cn),Le.BoxZoom=Ln,Le.DoubleClickZoom=Pn,Le.Drag=bn,Le.Keyboard=Tn,Le.ScrollWheelZoom=zn,Le.Tap=Mn,Le.TouchZoom=Cn;var Zn=window.L;window.L=t,Object.freeze=$t,t.version="1.3.1+HEAD.ba6f97f",t.noConflict=function(){return window.L=Zn,this},t.Control=Pe,t.control=be,t.Browser=$i,t.Evented=ui,t.Mixin=Ee,t.Util=ai,t.Class=v,t.Handler=Ze,t.extend=i,t.bind=e,t.stamp=n,t.setOptions=l,t.DomEvent=de,t.DomUtil=xe,t.PosAnimation=we,t.Draggable=Be,t.LineUtil=Oe,t.PolyUtil=Re,t.Point=x,t.point=w,t.Bounds=P,t.bounds=b,t.Transformation=Z,t.transformation=S,t.Projection=je,t.LatLng=M,t.latLng=C,t.LatLngBounds=T,t.latLngBounds=z,t.CRS=ci,t.GeoJSON=nn,t.geoJSON=Kt,t.geoJson=sn,t.Layer=Ue,t.LayerGroup=Ve,t.layerGroup=function(t,i){return new Ve(t,i)},t.FeatureGroup=qe,t.featureGroup=function(t){return new qe(t)},t.ImageOverlay=rn,t.imageOverlay=function(t,i,e){return new rn(t,i,e)},t.VideoOverlay=an,t.videoOverlay=function(t,i,e){return new an(t,i,e)},t.DivOverlay=hn,t.Popup=un,t.popup=function(t,i){return new un(t,i)},t.Tooltip=ln,t.tooltip=function(t,i){return new ln(t,i)},t.Icon=Ge,t.icon=function(t){return new Ge(t)},t.DivIcon=cn,t.divIcon=function(t){return new cn(t)},t.Marker=Xe,t.marker=function(t,i){return new Xe(t,i)},t.TileLayer=dn,t.tileLayer=Yt,t.GridLayer=_n,t.gridLayer=function(t){return new _n(t)},t.SVG=xn,t.svg=Jt,t.Renderer=mn,t.Canvas=fn,t.canvas=Xt,t.Path=Je,t.CircleMarker=$e,t.circleMarker=function(t,i){return new $e(t,i)},t.Circle=Qe,t.circle=function(t,i,e){return new Qe(t,i,e)},t.Polyline=tn,t.polyline=function(t,i){return new tn(t,i)},t.Polygon=en,t.polygon=function(t,i){return new en(t,i)},t.Rectangle=wn,t.rectangle=function(t,i){return new wn(t,i)},t.Map=Le,t.map=function(t,i){return new Le(t,i)}});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bar__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bar3D__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Circle__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Graph__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Line__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Pie__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Point__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__RankSymbol__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Ring__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ThemeVector__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__feature__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__levelRender__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__Bar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__Bar3D__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_2__Circle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_3__Graph__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_4__Line__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_5__Pie__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_6__Point__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_7__RankSymbol__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __WEBPACK_IMPORTED_MODULE_8__Ring__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_5", function() { return __WEBPACK_IMPORTED_MODULE_9__ThemeVector__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_10__feature__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["A"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["B"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["C"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["D"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["E"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["F"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_0", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["G"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_1", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["H"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_2", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["I"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_3", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["J"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_4", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["K"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_6", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["L"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_7", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["M"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return __WEBPACK_IMPORTED_MODULE_11__levelRender__["w"]; });




























/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feature_Polygon__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__levelRender_Color__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Graph__ = __webpack_require__(6);







/**
 * @class KTW.Feature.Theme.Bar
 * @classdesc 柱状图 。
 * @description 图表 Bar 配置对象 chartsSetting（<KTW.Layer.Graph::chartsSetting>） 可设属性如下：</br>
 *              width - {number} 专题要素（图表）宽度，必设参数。</br>
 *              height - {number} 专题要素（图表）高度，必设参数。</br>
 *              codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
 *              XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
 *              YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
 *              dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）
 *                                                     在左、下，右，上四个方向上的内偏距值。当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 15, 15, 15]；
 *                                                     不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。</br>
 *              decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
 *              useBackground - {boolean} 是否使用图表背景框，默认使用。</br>
 *              backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Rectangle::style>。</br>
 *              backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,
 *                                         则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。</br>
 *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
 *                                            第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。</br>
 *              showShadow - {boolean} 阴影开关 默认是打开。</br>
 *              barShadowStyle - {Object} 阴影样式,如：{shadowBlur : 8, shadowOffsetX: 2 , shadowOffsetY : 2,shadowColor : "rgba(100,100,100,0.8)"}</br>
 *              barLinearGradient - {Array<string>} 按字段设置柱条样式[渐变开始颜色,渐变终止颜色]  与 themeLayer.themeFields 中的字段一一对应），
 *                                                  如：[["#00FF00","#00CD00"],["#00CCFF","#5E87A2"],["#00FF66","#669985"],["#CCFF00","#94A25E"],["#FF9900","#A2945E"]]</br>
 *              useAxis - {boolean} 是否使用坐标轴，默认使用坐标轴。</br>
 *              axisStyle - {Object} 坐标轴样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。</br>
 *              axisUseArrow - {boolean} 坐标轴是否使用箭头，默认值：false，不使用箭头。</br>
 *              axisYTick - {number} y 轴刻度数量，默认值：0 ，不使用刻度。</br>
 *              axisYLabels - {Array<string>} y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。</br>
 *              axisYLabelsStyle - {Object} y 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。</br>
 *              axisYLabelsOffset - {Array<number>} y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；数组第二项表示 y 轴标签组纵向上的偏移量，向下为正，默认值：0。</br>
 *              axisXLabels - {Array<string>} x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签,否则沿数据视图框下面条边等距排布标签。</br>
 *              axisXLabelsStyle - {Object} x 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。</br>
 *              axisXLabelsOffset - {Array<number>} x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：0；数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：0。</br>
 *              useXReferenceLine - {boolean) 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。</br>
 *              xReferenceLineStyle - {Object) 水平参考线样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。</br>
 *              barStyle - {Object} 柱状图柱条基础 style，此参数控制柱条基础样式，优先级低于 barStyleByFields 和 barStyleByCodomain。此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。</br>
 *              barStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为柱条赋 style，此参数按字段控制柱条样式，优先级低于 barStyleByCodomain，高于 barStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条使用 style1，字段 POP_1995 对应的柱条使用 style2 ，字段 POP_1999 对应的柱条使用 style3。</br>
 *              barStyleByCodomain - {Array<Object>} 按柱条代表的数据值所在值域范围控制柱条样式，优先级高于 barStyle 和 barStyleByFields。</br>
 *              barHoverStyle - {Object} 柱条 hover 状态时的样式，barHoverAble 为 true 时有效。</br>
 *              barHoverAble - {Object} 是否允许柱条使用 hover 状态，默认允许。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。</br>
 *              barClickAble - {Object} 是否允许柱条被点击，默认允许。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。</br>
 * @example
 * // barStyleByCodomain参数用法如下：
 * // barStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。
 * // barStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 * @extends KTW.Feature.Theme.Graph
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 属性中的参与此图表生成的属性字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @return {KTW.Feature.Theme.Bar} 返回一个柱状图表对象。
 */
class Bar extends __WEBPACK_IMPORTED_MODULE_5__Graph__["a" /* Graph */] {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "KTW.Feature.Theme.Bar";
    }

    /**
     * @function KTW.Feature.Theme.Bar.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.Bar.prototype.assembleShapes
     * @description 图表图形装配函数。
     */
    assembleShapes() {
        //默认渐变颜色数组
        var deafaultColors = [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]];

        //默认阴影
        var deafaultShawdow = {
            showShadow: true,
            shadowBlur: 8,
            shadowColor: "rgba(100,100,100,0.8)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
        };

        // 图表配置对象
        var sets = this.setting;

        if (typeof (sets.barLinearGradient) !== "undefined") {
            sets.barLinearGradient = deafaultColors;
        }

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 15, 15, 15];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }
        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;

        // 数据视图域
        var dvb = this.dataViewBox;
        // 用户数据值
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 数据溢出值域范围处理
        for (let i = 0, fvLen = fv.length; i < fvLen; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 每个柱条 x 位置
        var xsLoc = xShapeInfo.xPositions;
        // 柱条宽度
        var xsWdith = xShapeInfo.width;

        // 背景框，默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            // 将背景框图形添加到模型的 shapes 数组，注意添加顺序，后添加的图形在先添加的图形之上。
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].Background(this.shapeFactory, this.chartBox, sets));
        }

        // 坐标轴, 默认启用
        if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
            // 添加坐标轴图形数组
            this.shapes = this.shapes.concat(__WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        for (var i = 0; i < fv.length; i++) {
            // 计算柱条 top 边的 y 轴坐标值
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;

            // 柱条节点数组
            var poiLists = [
                [xsLoc[i] - xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, yPx],
                [xsLoc[i] - xsWdith / 2, yPx]
            ];

            // 柱条参数对象（一个面参数对象）
            var barParams = new __WEBPACK_IMPORTED_MODULE_3__feature_Polygon__["a" /* Polygon */](poiLists);

            // 柱条 阴影 style
            if (typeof(sets.showShadow) === "undefined" || sets.showShadow) {
                if (sets.barShadowStyle) {
                    var sss = sets.barShadowStyle;
                    if (sss.shadowBlur) {
                        deafaultShawdow.shadowBlur = sss.shadowBlur;
                    }
                    if (sss.shadowColor) {
                        deafaultShawdow.shadowColor = sss.shadowColor;
                    }
                    if (sss.shadowOffsetX) {
                        deafaultShawdow.shadowOffsetX = sss.shadowOffsetX;
                    }
                    if (sss.shadowOffsetY) {
                        deafaultShawdow.shadowOffsetY = sss.shadowOffsetY;
                    }
                }
                barParams.style = {};
                Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(barParams.style, deafaultShawdow);
            }

            // 图形携带的数据信息
            barParams.refDataID = this.data.FID;
            barParams.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 柱条 hover click
            if (typeof(sets.barHoverAble) !== "undefined") {
                barParams.hoverable = sets.barHoverAble;
            }
            if (typeof(sets.barClickAble) !== "undefined") {
                barParams.clickable = sets.barClickAble;
            }

            // 创建柱条并添加到图表图形数组中
            this.shapes.push(this.shapeFactory.createShape(barParams));
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function KTW.Feature.Theme.Bar.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性：
     *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。
     *              长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
     *              第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
     * @return {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性：
     *         xPositions - {Array<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *         width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *
     */
    calculateXShapeInfo() {
        var dvb = this.dataViewBox;     // 数据视图框
        var sets = this.setting;     // 图表配置对象
        var fvc = this.dataValues.length;      // 数组值个数

        if (fvc < 1) {
            return null;
        }

        var xBlank;        // x 轴空白间隔参数
        var xShapePositions = [];         // x 轴上图形的位置
        var xShapeWidth = 0;          // x 轴上图形宽度(自适应)
        var dvbWidth = this.DVBWidth;            // 数据视图框宽度

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 3) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1]);
            if (xsLen <= fvc) {
                return null;
            }
            xShapeWidth = xsLen / fvc
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            xShapeWidth = dvbWidth / (2 * fvc + 1);
            xBlank = [xShapeWidth, xShapeWidth, xShapeWidth];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0] + xShapeWidth / 2;
            } else {
                xOffset += (xShapeWidth + xBlank[1]);
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }

    /**
     * @function KTW.Feature.Theme.Bar.prototype.resetLinearGradient
     * @description 图表的相对坐标存在的时候，重新计算渐变的颜色(目前用于二维柱状图 所以子类实现此方法)。
     */
    resetLinearGradient() {
        if (this.RelativeCoordinate) {
            var shpelength = this.shapes.length;
            var barLinearGradient = this.setting.barLinearGradient;
            var index = -1;
            for (var i = 0; i < shpelength; i++) {
                var shape = this.shapes[i];
                if (shape.CLASS_NAME === "KTW.LevelRenderer.Shape.SmicPolygon") {
                    var style = shape.style;
                    //计算出当前的绝对 x y
                    var x1 = this.location[0] + style.pointList[0][0];
                    var x2 = this.location[0] + style.pointList[1][0];

                    //渐变颜色
                    index++;
                    //以防定义的颜色数组不够用
                    if (index >= barLinearGradient.length) {
                        index = index % barLinearGradient.length;
                    }
                    var color1 = barLinearGradient[index][0];
                    var color2 = barLinearGradient[index][1];

                    //颜色
                    var zcolor = new __WEBPACK_IMPORTED_MODULE_4__levelRender_Color__["a" /* Color */]();
                    var linearGradient = zcolor.getLinearGradient(x1, 0, x2, 0,
                        [[0, color1], [1, color2]]);

                    //赋值
                    shape.style.color = linearGradient;
                }
            }
        }
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Bar = Bar;
//KTW.Client.Bar = Bar;

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bar3D; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feature_Polygon__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Graph__ = __webpack_require__(6);






/**
 * @class KTW.Feature.Theme.Bar3D
 * @classdesc 三维柱状图 。
 * @extends KTW.Feature.Theme.Graph
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @return {KTW.Feature.Theme.Bar3D} 返回一个三维柱状图表对象。
 *
 * @description 图表 Bar3D 配置对象 chartsSetting（<KTW.Layer.Graph::chartsSetting>） 可设属性如下：</br>
 *              width - {number} 专题要素（图表）宽度，必设参数。</br>
 *              height - {number} 专题要素（图表）高度，必设参数。</br>
 *              codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
 *              XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
 *              YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
 *              dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 25, 20, 20]；不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。</br>
 *              decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
 *              useBackground - {boolean} 是否使用图表背景框，默认使用。</br>
 *              backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Rectangle::style>。</br>
 *              backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。</br>
 *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。</br>
 *              bar3DParameter - {number} 3D 柱状参数，3d柱形正面相对于背面向 x 轴和 y 轴负方向偏移的绝对值，默认值：10。</br>
 *              useAxis - {boolean} 是否使用坐标轴，默认使用坐标轴。</br>
 *              axisStyle - {Object} 坐标轴样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。</br>
 *              axisUseArrow - {boolean} 坐标轴是否使用箭头，默认值：true，使用箭头。</br>
 *              axisYTick - {number} y 轴刻度数量，默认值：0 ，不使用刻度。</br>
 *              axisYLabels - {Array<string>} y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。</br>
 *              axisYLabelsStyle - {Object} y 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。</br>
 *              axisYLabelsOffset - {Array<number>} y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；数组第二项表示 y 轴标签组纵向上的偏移量，向下为正，默认值：0。</br>
 *              axisXLabels - {Array<string>} x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签，否则沿数据视图框下面条边等距排布标签。</br>
 *              axisXLabelsStyle - {Object} x 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。</br>
 *              axisXLabelsOffset - {Array<number>} x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：-10；数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：10。</br>
 *              useXReferenceLine - {boolean) 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。</br>
 *              xReferenceLineStyle - {Object) 水平参考线样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。</br>
 *              axis3DParameter - {number} 3D 坐标轴参数，此属性值在大于等于 15 时有效，默认值：20。</br>
 *              barFaceStyle - {Object} 3d 柱状图柱条正面基础 style，此参数控制柱条正面基础样式，优先级低于 barFaceStyleByFields 和 barFaceStyleByCodomain。此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Polygon::style>。</br>
 *              barFaceStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为柱条正面赋 style，此参数按字段控制柱条正面样式，优先级低于 barFaceStyleByCodomain，高于 barFaceStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barFaceStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条正面使用 style1，字段 POP_1995 对应的柱条正面使用 style2 ，字段 POP_1999 对应的柱条正面使用 style3。</br>
 *              barFaceStyleByCodomain - {Array<Object>} 按柱条正面代表的数据值所在值域范围控制柱条正面样式，优先级高于 barFaceStyle 和 barFaceStyleByFields。</br>
 *              barSideStyle - {Object} 3d 柱状图柱条侧面基础 style，此参数控制柱条侧面基础样式，优先级低于 barSideStyleByFields 和 barSideStyleByCodomain此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Polygon::style> ，默认值：barFaceStyle。</br>
 *              barSideStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为柱条侧面赋style，此数按字段控制柱条侧面样式，优先级低于 barSideStyleByCodomain，高于 barSideStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barSideStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条侧面使用 style1，字段 POP_1995对应的柱条侧面使用style2，字段POP_1999对应的柱条侧面使用style3。默认值：barFaceStyleByFields。</br>
 *              barSideStyleByCodomain - {Array<Object>} 按柱条侧面代表的数据值所在值域范围控制柱条侧面样式，优先级高于 barSideStyle 和 barSideStyleByFields。默认值：barFaceStyleByCodomain。</br>
 *              barFaceHoverStyle - {Object} 3d 柱条正面 hover 状态时的样式，barHoverAble 为 true 时有效。</br>
 *              barSideHoverStyle - {Object} 3d 柱条侧面 hover 状态时的样式，barHoverAble 为 true 时有效，默认值：barFaceHoverStyle。</br>
 *              barTopHoverStyle - {Object} 3d 柱条顶面 hover 状态时的样式，barHoverAble 为 true 时有效，默认值：barFaceHoverStyle。</br>
 *              barHoverAble - {Object} 是否允许柱条使用 hover 状态，默认允许。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。</br>
 *              barClickAble - {Object} 是否允许柱条被点击，默认允许。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。</br>
 *              barTopStyle - {Object} 3d 柱状图柱条顶面基础 style，此参数控制柱条顶面基础样式，优先级低于 barTopStyleByFields 和 barTopStyleByCodomain此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Polygon::style> ，默认值：barFaceStyle。</br>
 *              barTopStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为柱条顶面赋 style，此参数按字段控制柱条顶面样式，优先级低于 barTopStyleByCodomain，高于 barTopStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barTopStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条顶面使用 style1，字段 POP_1995 对应的柱条顶面使用 style2 ，字段 POP_1999 对应的柱条顶面使用 style3。默认值：barFaceStyleByFields。</br>
 *              barTopStyleByCodomain - {Array<Object>} 按柱条顶面代表的数据值所在值域范围控制柱条顶面样式，优先级高于 barTopStyle 和 barTopStyleByFields。默认值：barFaceStyleByCodomain。</br>
 *
 * @example
 * // barFaceStyleByCodomain 用法示例如下：
 * // barFaceStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。
 * // barFaceStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 *
 * @example
 * // barSideStyleByCodomain 用法示例如下：
 * // barSideStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。
 * // barSideStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 *
 * @example
 * // barTopStyleByCodomain 用法示例如下：
 * // barTopStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Polygon::style> 。
 * // barTopStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 */

class Bar3D extends __WEBPACK_IMPORTED_MODULE_4__Graph__["a" /* Graph */] {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "KTW.Feature.Theme.Bar3D";
    }

    /**
     * @function KTW.Feature.Theme.Bar3D.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.Bar3D.prototype.assembleShapes
     * @description 图形装配实现（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 25, 20, 20];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 3d 柱图的坐标轴默认使用坐标轴箭头
        sets.axisUseArrow = (typeof(sets.axisUseArrow) !== "undefined") ? sets.axisUseArrow : true;
        sets.axisXLabelsOffset = (typeof(sets.axisXLabelsOffset) !== "undefined") ? sets.axisXLabelsOffset : [-10, 10];

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        // 数据视图域
        var dvb = this.dataViewBox;
        // 用户数据值
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 数据溢出值域范围处理
        for (let i = 0, fvLen = fv.length; i < fvLen; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 每个柱条 x 位置
        var xsLoc = xShapeInfo.xPositions;
        // 柱条宽度
        var xsWdith = xShapeInfo.width;

        // 坐标轴, 默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].Background(this.shapeFactory, this.chartBox, sets));
        }

        // 坐标轴
        if (!sets.axis3DParameter || isNaN(sets.axis3DParameter) || sets.axis3DParameter < 15) {
            sets.axis3DParameter = 20;
        }
        if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
            this.shapes = this.shapes.concat(__WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        // 3d 偏移量, 默认值 10;
        var offset3d = (sets.bar3DParameter && !isNaN(sets.bar3DParameter)) ? sets.bar3DParameter : 10;

        for (let i = 0; i < fv.length; i++) {
            // 无 3d 偏移量时的柱面顶部 y 坐标
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;
            // 无 3d 偏移量时的柱面的左、右端 x 坐标
            var iPoiL = xsLoc[i] - xsWdith / 2;
            var iPoiR = xsLoc[i] + xsWdith / 2;

            // 3d 柱顶面节点
            var bar3DTopPois = [
                [iPoiL, yPx],
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];

            // 3d 柱侧面节点
            var bar3DSidePois = [
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR, dvb[1]]
            ];

            // 3d 柱正面节点
            var bar3DFacePois = [
                [iPoiL - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];
            if (offset3d <= 0) {  // offset3d <= 0 时正面不偏移
                bar3DFacePois = [
                    [iPoiL, dvb[1]],
                    [iPoiR, dvb[1]],
                    [iPoiR, yPx],
                    [iPoiL, yPx]
                ];
            }

            // 新建 3d 柱面顶面、侧面、正面图形参数对象
            var polyTopSP = new __WEBPACK_IMPORTED_MODULE_3__feature_Polygon__["a" /* Polygon */](bar3DTopPois);
            var polySideSP = new __WEBPACK_IMPORTED_MODULE_3__feature_Polygon__["a" /* Polygon */](bar3DSidePois);
            var polyFaceSP = new __WEBPACK_IMPORTED_MODULE_3__feature_Polygon__["a" /* Polygon */](bar3DFacePois);


            // 侧面、正面图形 style 默认值
            sets.barSideStyle = sets.barSideStyle ? sets.barSideStyle : sets.barFaceStyle;
            sets.barSideStyleByFields = sets.barSideStyleByFields ? sets.barSideStyleByFields : sets.barFaceStyleByFields;
            sets.barSideStyleByCodomain = sets.barSideStyleByCodomain ? sets.barSideStyleByCodomain : sets.barFaceStyleByCodomain;
            sets.barTopStyle = sets.barTopStyle ? sets.barTopStyle : sets.barFaceStyle;
            sets.barTopStyleByFields = sets.barTopStyleByFields ? sets.barTopStyleByFields : sets.barFaceStyleByFields;
            sets.barTopStyleByCodomain = sets.barTopStyleByCodomain ? sets.barTopStyleByCodomain : sets.barFaceStyleByCodomain;
            // 顶面、侧面、正面图形 style
            polyFaceSP.style = __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barFaceStyle, sets.barFaceStyleByFields, sets.barFaceStyleByCodomain, i, fv[i]);
            polySideSP.style = __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barSideStyle, sets.barSideStyleByFields, sets.barSideStyleByCodomain, i, fv[i]);
            polyTopSP.style = __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barTopStyle, sets.barTopStyleByFields, sets.barTopStyleByCodomain, i, fv[i]);

            // 3d 柱条高亮样式
            sets.barSideHoverStyle = sets.barSideHoverStyle ? sets.barSideHoverStyle : sets.barFaceHoverStyle;
            sets.barTopHoverStyle = sets.barTopHoverStyle ? sets.barTopHoverStyle : sets.barFaceHoverStyle;
            polyFaceSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({stroke: true}, sets.barFaceHoverStyle);
            polySideSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({stroke: true}, sets.barSideHoverStyle);
            polyTopSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_2__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({stroke: true}, sets.barTopHoverStyle);

            // 图形携带的数据 id 信息 & 高亮模式
            polyTopSP.refDataID = polySideSP.refDataID = polyFaceSP.refDataID = this.data.FID;
            // hover 模式（组合）
            polyTopSP.isHoverByRefDataID = polySideSP.isHoverByRefDataID = polyFaceSP.isHoverByRefDataID = true;
            // 高亮组(当鼠标 hover 到组内任何一个图形，整个组的图形都会高亮。refDataHoverGroup 在 isHoverByRefDataID 为 true 时有效)
            polyTopSP.refDataHoverGroup = polySideSP.refDataHoverGroup = polyFaceSP.refDataHoverGroup = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])();
            // 图形携带的数据信息
            polyTopSP.dataInfo = polySideSP.dataInfo = polyFaceSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 3d 柱条顶面、侧面、正面图形 hover click 设置
            if (typeof(sets.barHoverAble) !== "undefined") {
                polyTopSP.hoverable = polySideSP.hoverable = polyFaceSP.hoverable = sets.barHoverAble;
            }
            if (typeof(sets.barClickAble) !== "undefined") {
                polyTopSP.clickable = polySideSP.clickable = polyFaceSP.clickable = sets.barClickAble;
            }

            // 创建3d 柱条的顶面、侧面、正面图形并添加到图表的图形列表数组
            this.shapes.push(this.shapeFactory.createShape(polySideSP));
            this.shapes.push(this.shapeFactory.createShape(polyTopSP));
            this.shapes.push(this.shapeFactory.createShape(polyFaceSP));
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function KTW.Feature.Theme.Bar3D.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性:</br>
     *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。
     *              长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
     *              第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
     * @return {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性:</br>
     *                  xPositions - {Array<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。</br>
     *                  width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     */
    calculateXShapeInfo() {
        var dvb = this.dataViewBox;     // 数据视图框
        var sets = this.setting;     // 图表配置对象
        var fvc = this.dataValues.length;      // 数组值个数

        if (fvc < 1) {
            return null;
        }

        var xBlank;        // x 轴空白间隔参数
        var xShapePositions = [];         // x 轴上图形的位置
        var xShapeWidth = 0;          // x 轴上图形宽度(自适应)
        var dvbWidth = this.DVBWidth;            // 数据视图框宽度

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 3) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1])
            if (xsLen <= fvc) {
                return null;
            }
            xShapeWidth = xsLen / fvc
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            xShapeWidth = dvbWidth / (2 * fvc + 1);
            xBlank = [xShapeWidth, xShapeWidth, xShapeWidth];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0] + xShapeWidth / 2;
            } else {
                xOffset += (xShapeWidth + xBlank[1]);
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }
};

//KTW.Client.Bar3D = Bar3D;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Bar3D = Bar3D;

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_Theme__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_Circle__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RankSymbol__ = __webpack_require__(40);






/**
 * @class KTW.Feature.Theme.Circle
 * @classdesc 圆类。
 * @description 符号 Circle 配置对象 symbolSetting（<KTW.Layer.RankSymbol::setting>） 可设属性如下：<br>
 *            codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。<br>
 *            maxR - {number} 圆形的最大半径。<br>
 *            minR - {number} 圆形的最小半径。<br>
 *            fillColor - {string} 圆形的填充色，如：fillColor: "#FFB980"。<br>
 *            circleStyle - {Object} 圆形的基础 style，此参数控制圆形基础样式，优先级低于 circleStyleByFields 和 circleStyleByCodomain。<br>
 *            decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。<br>
 *            circleHoverStyle - {Object} 圆形 hover 状态时的样式，circleHoverAble 为 true 时有效。<br>
 *            circleHoverAble - {Object} 是否允许圆形使用 hover 状态，默认允许。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。<br>
 *            circleClickAble - {Object} 是否允许圆形被点击，默认允许。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 * @extends KTW.Feature.Theme.RankSymbol
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.RankSymbol} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @return {KTW.Feature.Theme.Circle} 返回一个圆图。
 */
class Circle extends __WEBPACK_IMPORTED_MODULE_4__RankSymbol__["a" /* RankSymbol */] {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "KTW.Feature.Theme.Circle";
    }

    /**
     * @function KTW.Feature.Theme.Circle.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.Circle.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        //默认填充颜色
        var defaultFillColor = "#ff9277";

        // setting 属性是否已成功赋值
        if (!this.setting) {
            return false;
        }
        var sets = this.setting;
        // 检测 setting 的必设参数
        if (!(sets.codomain)) {
            return false;
        }

        // 数据
        var decimalNumber = (typeof(sets.decimalNumber) !== "undefined" && !isNaN(sets.decimalNumber)) ? sets.decimalNumber : -1;
        var dataEffective = __WEBPACK_IMPORTED_MODULE_1__feature_Theme__["a" /* Theme */].getDataValues(this.data, this.fields, decimalNumber);
        this.dataValues = dataEffective ? dataEffective : [];

        // 数据值数组
        var fv = this.dataValues;
        //if(fv.length != 1) return;       // 没有数据 或者数据不唯一
        //if(fv[0] < 0) return;            //数据为负值

        //用户应该定义最大 最小半径  默认最大半径MaxR:100 最小半径MinR:0;
        if (!sets.maxR) {
            sets.maxR = 100;
        }
        if (!sets.minR) {
            sets.minR = 0;
        }

        // 值域范围
        var codomain = this.DVBCodomain;

        // 重要步骤：定义Circle数据视图框中单位值的含义，单位值：1所代表的长度
        // 用户定义了值域范围
        if (codomain && codomain[1] - codomain[0] > 0) {
            this.DVBUnitValue = sets.maxR / (codomain[1] - codomain[0]);
        } else {
            //this.DVBUnitValue = sets.maxR / maxValue;
            this.DVBUnitValue = sets.maxR;
        }

        var uv = this.DVBUnitValue;
        //圆半径
        var r = fv[0] * uv + sets.minR;
        this.width = 2 * r;
        this.height = 2 * r;

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        //假如用户设置了值域范围 没有在值域范围直接返回
        if (codomain) {
            if (fv[0] < codomain[0] || fv[0] > codomain[1]) {
                return;
            }
        }

        var dvbCenter = this.DVBCenterPoint;        // 数据视图框中心作为圆心

        //圆形对象参数
        var circleSP = new __WEBPACK_IMPORTED_MODULE_2__feature_Circle__["a" /* Circle */](dvbCenter[0], dvbCenter[1], r);

        //circleSP.sytle 初始化
        circleSP.style = __WEBPACK_IMPORTED_MODULE_3__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.circleStyle, null, null, 0);
        //图形的填充颜色
        if (typeof (sets.fillColor) !== "undefined") {
            //用户自定义
            circleSP.style.fillColor = sets.fillColor;
        } else {
            //当前默认
            circleSP.style.fillColor = defaultFillColor;
        }
        //圆形 Hover样式
        circleSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_3__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.circleHoverStyle);
        //圆形 Hover 与 click 设置
        if (typeof(sets.circleHoverAble) !== "undefined") {
            circleSP.hoverable = sets.circleHoverAble;
        }
        if (typeof(sets.circleClickAble) !== "undefined") {
            circleSP.clickable = sets.circleClickAble;
        }

        //图形携带的数据信息
        circleSP.refDataID = this.data.FID;
        circleSP.dataInfo = {
            field: this.fields[0],
            r: r,
            value: fv[0]
        };

        // 创建扇形并把此扇形添加到图表图形数组
        this.shapes.push(this.shapeFactory.createShape(circleSP));

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

};

//KTW.Client.Circle = Circle;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Circle = Circle;

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Line; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_Point__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feature_Line__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Graph__ = __webpack_require__(6);






/**
 * @class KTW.Feature.Theme.Line
 * @classdesc 折线图。
 * @description 图表 Line 配置对象 chartsSetting（<KTW.Layer.Graph::chartsSetting>）可设属性如下：<br>
 *              width - {number} 专题要素（图表）宽度，必设参数。<br>
 *              height - {number} 专题要素（图表）高度，必设参数。<br>
 *              codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。<br>
 *              XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。<br>
 *              YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。<br>
 *              dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，
 *                      它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
 *                      当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 15, 15, 15]；不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。<br>
 *              decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。<br>
 *              useBackground - {boolean} 是否使用图表背景框。<br>
 *              backgroundStyle - {Object} 背景样式，此样式对象对象可设属性：<KTW.Feature.ShapeParameters.Rectangle::style>。<br>
 *              backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,
 *                      则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。<br>
 *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。长度为 2 的数组，第一元素表示折线左端点与数据视图框左端的空白间距，
 *                       第二个元素表示折线右端点右端与数据视图框右端端的空白间距。<br>
 *              axisStyle - {Object} 坐标轴样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style>。<br>
 *              axisUseArrow - {boolean} 坐标轴是否使用箭头，默认值：false，不使用箭头。<br>
 *              axisYTick - {number} y 轴刻度数量，默认值：0 ，不使用刻度。<br>
 *              axisYLabels - {Array<string>} y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。<br>
 *              axisYLabelsStyle - {Object} y 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。<br>
 *              axisYLabelsOffset - {Array<number>} y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；
 *                       数组第二项表示 y 轴标签组纵向上的偏移量，向下为正，默认值：0。<br>
 *              axisXLabels - {Array<string>} x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。
 *                       标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签，
 *                       否则沿数据视图框下面条边等距排布标签。<br>
 *              axisXLabelsStyle - {Object} x 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。<br>
 *              axisXLabelsOffset - {Array<number>} x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：0；
 *                       数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：0。<br>
 *              useXReferenceLine - {Boolean} 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。<br>
 *              xReferenceLineStyle - {Object} 水平参考线样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style>。<br>
 *              lineStyle - {Object} 折线图中折线 style，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style>。<br>
 *              pointStyle - {Object} 折线图中折线节点基础 style，此参数控制折线节点基础样式，优先级低于 pointStyleByFields 和 pointStyleByCodomain。
 *                       此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Point::style> 。<br>
 *              pointStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为折线节点赋 style，此参数按字段控制折线节点样式，
 *                       优先级低于 pointStyleByCodomain，高于 pointStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Point::style> 。
 *                       此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],
 *                       pointStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的折线节点使用 style1，字段 POP_1995 对应的折线节点使用 style2 ，字段 POP_1999 对应的折线节点使用 style3。<br>
 *              pointStyleByCodomain - {Array<Object>} 按折线节点代表的数据值所在值域范围控制折线节点样式，优先级高于 pointStyle 和 pointStyleByFields。<br>
 *              pointHoverStyle - {Object} 折线节点 hover 状态时的样式，pointHoverAble 为 true 时有效。<br>
 *              pointHoverAble - {Object} 是否允许折线节点使用 hover 状态，默认允许。同时设置 pointHoverAble 和 pointClickAble 为 false，可以直接屏蔽折线节点对专题图层事件的响应。<br>
 *              pointClickAble - {Object} 是否允许折线节点被点击，默认允许。同时设置 pointHoverAble 和 pointClickAble 为 false，可以直接屏蔽折线节点对专题图层事件的响应。
 * @example
 * // pointStyleByCodomain 参数用法示例
 * // pointStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Point::style> 。
 * // pointStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 *
 * @extends KTW.Feature.Theme.Graph
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 * @return {KTW.Feature.Theme.Line} 返回一个折线图。
 */
class Line extends __WEBPACK_IMPORTED_MODULE_4__Graph__["a" /* Graph */] {
    /*
     * @function KTW.Feature.Theme.Line.prototype.Constructor
     * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
     * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。
     * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
     * @param setting - {Object} 图表配置对象，必设参数。
     * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
     * @return {KTW.Feature.Theme.Line} 返回一个折线图。
     */
    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
        this.CLASS_NAME = "KTW.Feature.Theme.Line";
    }

    /**
     * @function KTW.Feature.Theme.Line.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.Line.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 15, 15, 15];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        var dvb = this.dataViewBox;

        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        var uv = this.DVBUnitValue;
        // 数据值数组
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 折线每个节点的 x 位置
        var xsLoc = xShapeInfo.xPositions;

        // 背景框，默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            // 将背景框图形添加到模型的 shapes 数组，注意添加顺序，后添加的图形在先添加的图形之上。
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].Background(this.shapeFactory, this.chartBox, sets));
        }

        // 折线图必须使用坐标轴
        this.shapes = this.shapes.concat(__WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));

        // var isDataEffective = true;

        var xPx;        // 折线节点 x 坐标
        var yPx;        // 折线节点 y 坐标
        var poiLists = [];        // 折线节点数组

        var shapePois = [];     // 折线节点图形数组
        for (var i = 0, len = fv.length; i < len; i++) {
            // 数据溢出值域检查
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                // isDataEffective = false;
                return null;
            }

            xPx = xsLoc[i];
            yPx = dvb[1] - (fv[i] - codomain[0]) / uv;

            // 折线节点参数对象
            var poiSP = new __WEBPACK_IMPORTED_MODULE_2__feature_Point__["a" /* Point */](xPx, yPx);
            // 折线节点 style
            poiSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({fillColor: "#ee9900"}, sets.pointStyle, sets.pointStyleByFields, sets.pointStyleByCodomain, i, fv[i]);
            // 折线节点 hover 样式
            poiSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.pointHoverStyle);

            // 折线节点 hover click
            if (typeof(sets.pointHoverAble) !== "undefined") {
                poiSP.hoverable = sets.pointHoverAble;
            }
            if (typeof(sets.pointClickAble) !== "undefined") {
                poiSP.clickable = sets.pointClickAble;
            }

            // 图形携带的数据信息
            poiSP.refDataID = this.data.FID;
            poiSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建图形并把此图形添加到折线节点图形数组
            shapePois.push(this.shapeFactory.createShape(poiSP));

            // 添加折线节点到折线节点数组
            var poi = [xPx, yPx];
            poiLists.push(poi);
        }

        // 折线参数对象
        var lineSP = new __WEBPACK_IMPORTED_MODULE_3__feature_Line__["a" /* Line */](poiLists);
        lineSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({strokeColor: "#ee9900"}, sets.lineStyle);
        // 禁止事件响应
        lineSP.clickable = false;
        lineSP.hoverable = false;
        var shapeLine = this.shapeFactory.createShape(lineSP);
        this.shapes.push(shapeLine);

        // 添加节点到图表图形数组
        this.shapes = this.shapes.concat(shapePois);

        // // 数据范围检测未通过，清空图形
        // if (isDataEffective === false) {
        //     this.shapes = [];
        // }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function KTW.Feature.Theme.Line.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性：<br>
     *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。
     *              长度为 2 的数组，第一元素表示第折线左端点与数据视图框左端的空白间距，第二个元素表示折线右端点右端与数据视图框右端端的空白间距 。
     * @return {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性：<br>
     *         xPositions - {Array<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。<br>
     *         width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     */
    calculateXShapeInfo() {
        var dvb = this.dataViewBox;     // 数据视图框
        var sets = this.setting;     // 图表配置对象
        var fvc = this.dataValues.length;      // 数组值个数

        if (fvc < 1) {
            return null;
        }

        var xBlank;        // x 轴空白间隔参数
        var xShapePositions = [];         // x 轴上图形的位置
        var xShapeWidth = 0;          // x 轴上图形宽度(自适应)
        var dvbWidth = this.DVBWidth;            // 数据视图框宽度
        var unitOffset = 0;               // 单位偏移量

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 2) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[1]);
            if (xsLen <= fvc) {
                return null;
            }
            unitOffset = xsLen / (fvc - 1);
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            unitOffset = dvbWidth / (fvc + 1);
            xBlank = [unitOffset, unitOffset, unitOffset];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0];
            } else {
                xOffset += unitOffset;
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }

};

//KTW.Client.Line = Line;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Line = Line;

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pie; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_Sector__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Graph__ = __webpack_require__(6);





/**
 * @class KTW.Feature.Theme.Pie
 * @classdesc 饼图。
 * @description 图表 Pie 配置对象 chartsSetting（<KTW.Layer.Graph::chartsSetting>） 可设属性如下：</br>
 * width - {number} 专题要素（图表）宽度，必设参数。</br>
 * height - {number} 专题要素（图表）高度，必设参数。</br>
 * codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
 * XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
 * YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
 * dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，
 * 它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。默认值为：[0, 0, 0, 0]。</br>
 * decimalNumber - {Array<number>}数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
 * useBackground - {boolean} 是否使用图表背景框，默认不使用。</br>
 * backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Rectangle::style>。</br>
 * backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。</br>
 * sectorStyle - {Object} 饼图中扇形的基础 style，此参数控制饼图扇形基础样式，优先级低于 sectorStyleByFields 和 sectorStyleByCodomain。
 * 此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Sector::style> 。</br>
 * sectorStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为饼图扇形赋 style，此参数按字段控制饼图扇形样式，优先级低于 sectorStyleByCodomain，高于 sectorStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Sector::style> 。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],
 * sectorStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的饼图扇形使用 style1，字段 POP_1995 对应的饼图扇形使用 style2 ，字段 POP_1999 对应的饼图扇形使用 style3。</br>
 * sectorStyleByCodomain - {Array<Object>} 按饼图扇形代表的数据值所在值域范围控制饼图扇形样式，优先级高于 sectorStyle 和 sectorStyleByFields。
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 *
 * @example
 * // sectorStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Sector::style> 。
 * // sectorStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 * sectorHoverStyle - {Object} 饼图扇形 hover 状态时的样式，sectorHoverAble 为 true 时有效。</br>
 * sectorHoverAble - {Object} 是否允许饼图扇形使用 hover 状态，默认允许。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽饼图扇形对专题图层事件的响应。</br>
 * sectorClickAble - {Object} 是否允许饼图扇形被点击，默认允许。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽饼图扇形对专题图层事件的响应。
 * @extends {KTW.Feature.Theme.Graph}
 */
class Pie extends __WEBPACK_IMPORTED_MODULE_3__Graph__["a" /* Graph */] {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "KTW.Feature.Theme.Pie";
    }

    /**
     * @function KTW.Feature.Theme.Pie.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.Pie.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 一个默认 style 组
        var defaultStyleGroup = [
            {fillColor: "#ff9277"}, {fillColor: "#dddd00"}, {fillColor: "#ffc877"}, {fillColor: "#bbe3ff"}, {fillColor: "#d5ffbb"},
            {fillColor: "#bbbbff"}, {fillColor: "#ddb000"}, {fillColor: "#b0dd00"}, {fillColor: "#e2bbff"}, {fillColor: "#ffbbe3"},
            {fillColor: "#ff7777"}, {fillColor: "#ff9900"}, {fillColor: "#83dd00"}, {fillColor: "#77e3ff"}, {fillColor: "#778fff"},
            {fillColor: "#c877ff"}, {fillColor: "#ff77ab"}, {fillColor: "#ff6600"}, {fillColor: "#aa8800"}, {fillColor: "#77c7ff"},
            {fillColor: "#ad77ff"}, {fillColor: "#ff77ff"}, {fillColor: "#dd0083"}, {fillColor: "#777700"}, {fillColor: "#00aa00"},
            {fillColor: "#0088aa"}, {fillColor: "#8400dd"}, {fillColor: "#aa0088"}, {fillColor: "#dd0000"}, {fillColor: "#772e00"}
        ];

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 背景框，默认不启用
        if (sets.useBackground) {
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].Background(this.shapeFactory, this.chartBox, sets));
        }

        // 数据值数组
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 值域范围
        var codomain = this.DVBCodomain;
        // 值域范围检测
        for (let i = 0; i < fv.length; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 值的绝对值总和
        var valueSum = 0;
        for (let i = 0; i < fv.length; i++) {
            valueSum += Math.abs(fv[i]);
        }

        // 重要步骤：定义图表 Pie 数据视图框中单位值的含义，单位值：每度代表的数值
        this.DVBUnitValue = 360 / valueSum;
        var uv = this.DVBUnitValue;

        var dvbCenter = this.DVBCenterPoint;        // 数据视图框中心作为扇心

        var startAngle = 0;         // 扇形起始边角度
        var endAngle = 0;          // 扇形终止边角度
        var startAngleTmp = startAngle;           // 扇形临时起始边角度
        // 扇形（自适应）半径
        var r = this.DVBHeight < this.DVBWidth ? this.DVBHeight / 2 : this.DVBWidth / 2;

        for (var i = 0; i < fv.length; i++) {
            var fvi = Math.abs(fv[i]);
            //计算终止角
            if (i === 0) {
                endAngle = startAngle + fvi * uv;
            } else if (i === fvi.length - 1) {
                endAngle = startAngleTmp;
            } else {
                endAngle = startAngle + fvi * uv;
            }
            //矫正误差计算
            if ((endAngle - startAngle) >= 360) {
                endAngle = 359.9999999;
            }

            // 扇形参数对象
            var sectorSP = new __WEBPACK_IMPORTED_MODULE_2__feature_Sector__["a" /* Sector */](dvbCenter[0], dvbCenter[1], r, startAngle, endAngle);
            // 扇形样式
            if (typeof(sets.sectorStyleByFields) === "undefined") {
                // 使用默认 style 组
                var colorIndex = i % defaultStyleGroup.length;
                sectorSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.sectorStyle, defaultStyleGroup, null, colorIndex);
            } else {
                sectorSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.sectorStyle, sets.sectorStyleByFields, sets.sectorStyleByCodomain, i, fv[i]);
            }

            // 扇形 hover 样式
            sectorSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.sectorHoverStyle);
            // 扇形 hover 与 click 设置
            if (typeof(sets.sectorHoverAble) !== "undefined") {
                sectorSP.hoverable = sets.sectorHoverAble;
            }
            if (typeof(sets.sectorClickAble) !== "undefined") {
                sectorSP.clickable = sets.sectorClickAble;
            }
            // 图形携带的数据信息
            sectorSP.refDataID = this.data.FID;
            sectorSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建扇形并把此扇形添加到图表图形数组
            this.shapes.push(this.shapeFactory.createShape(sectorSP));

            // 把上一次的结束角度作为下一次的起始角度
            startAngle = endAngle;
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

};

//KTW.Client.Pie = Pie;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Pie = Pie;

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_Point__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Graph__ = __webpack_require__(6);





/**
 * @class KTW.Feature.Theme.Point
 * @classdesc 点状图。
 * @description 图表 Point 配置对象 chartsSetting(KTW.Layer.Graph::chartsSetting) 可设属性如下：</br>
 * width - {number} 专题要素（图表）宽度，必设参数。</br>
 * height - {number} 专题要素（图表）高度，必设参数。</br>
 * codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
 * XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
 * YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
 * dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，
 *                     它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。
 *                     当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 15, 15, 15]；不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。</br>
 * decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
 * useBackground - {boolean} 是否使用图表背景框。</br>
 * backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Rectangle::style>。</br>
 * backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,
 *                 则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。</br>
 * xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。
 *                 长度为 2 的数组，第一个元素表示第一个（沿 x 轴方向）图形点与数据视图框左端的空白间距，第二个元素表示最后一个（沿 x 轴方向）图形点与数据视图框右端端的空白间距 。</br>
 * axisStyle - {Object} 坐标轴样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。</br>
 * axisUseArrow - {boolean} 坐标轴是否使用箭头，默认值：false，不使用箭头。</br>
 * axisYTick - {number} y 轴刻度数量，默认值：0 ，不使用刻度。</br>
 * axisYLabels - {Array<string>} y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。</br>
 * axisYLabelsStyle - {Object} y 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。</br>
 * axisYLabelsOffset - {Array<number>} y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；
 *                 数组第二项表示 y 轴标签组纵向上的偏移量，向下为正，默认值：0。</br>
 * axisXLabels - {Array<string>} x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。
 *                 标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签，
 *                 否则沿数据视图框下面条边等距排布标签。</br>
 * axisXLabelsStyle - {Object} x 轴上的标签组样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Label::style> 。</br>
 * axisXLabelsOffset - {Array<number>} x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：0；
 *                 数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：0。</br>
 * useXReferenceLine - {Boolean} 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。</br>
 * xReferenceLineStyle - {Object} 水平参考线样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Line::style> 。</br>
 * pointStyle - {Object} 点状图中图形点基础 style，此参数控制图形点基础样式，优先级低于 pointStyleByFields 和 pointStyleByCodomain。
 *               此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Point::style> 。</br>
 * pointStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为图形点赋 style，此参数按字段控制图形点样式，
 *               优先级低于 pointStyleByCodomain，高于 pointStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Point::style> 。
 *               此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],
 * pointStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的图形点使用 style1，字段 POP_1995 对应的图形点使用 style2 ，字段 POP_1999 对应的图形点使用 style3。</br>
 * pointStyleByCodomain - {Array<Object>} 按图形点代表的数据值所在值域范围控制图形点样式，优先级高于 pointStyle 和 pointStyleByFields。</br>
 *
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。
 * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。
 * @param setting - {Object} 图表配置对象，必设参数。
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 *
 * @example
 * // pointStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Point::style> 。
 * // pointStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 * pointHoverStyle - {Object} 图形点 hover 状态时的样式，pointHoverAble 为 true 时有效。
 * pointHoverAble - {Object} 是否允许图形点使用 hover 状态，默认允许。同时设置 pointHoverAble 和 pointClickAble 为 false，可以直接屏蔽图形点对专题图层事件的响应。
 * pointClickAble - {Object} 是否允许图形点被点击，默认允许。同时设置 pointHoverAble 和 pointClickAble 为 false，可以直接屏蔽图形点对专题图层事件的响应。
 *@extends {KTW.Feature.Theme.Graph}

 */
class Point extends __WEBPACK_IMPORTED_MODULE_3__Graph__["a" /* Graph */] {

    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
        this.CLASS_NAME = "KTW.Feature.Theme.Point";
    }

    /**
     * @function KTW.Feature.Theme.Point.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.prototype.Point.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 15, 15, 15];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        var dvb = this.dataViewBox;

        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        var uv = this.DVBUnitValue;
        var fv = this.dataValues;

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 折线每个节点的 x 位置
        var xsLoc = xShapeInfo.xPositions;

        // 背景框，默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            // 将背景框图形添加到模型的 shapes 数组，注意添加顺序，后添加的图形在先添加的图形之上。
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].Background(this.shapeFactory, this.chartBox, sets));
        }

        // 点状图必须使用坐标轴
        this.shapes = this.shapes.concat(__WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));

        var xPx;        // 图形点 x 坐标
        var yPx;        // 图形点 y 坐标
        for (var i = 0, len = fv.length; i < len; i++) {
            // 数据溢出值域检查
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                //isDataEffective = false;
                return null;
            }

            xPx = xsLoc[i];
            yPx = dvb[1] - (fv[i] - codomain[0]) / uv;

            // 图形点参数对象
            var poiSP = new __WEBPACK_IMPORTED_MODULE_2__feature_Point__["a" /* Point */](xPx, yPx);
            // 图形点 style
            poiSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool({fillColor: "#ee9900"}, sets.pointStyle, sets.pointStyleByFields, sets.pointStyleByCodomain, i, fv[i]);
            // 图形点 hover 样式
            poiSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.pointHoverStyle);

            // 图形点 hover click
            if (typeof(sets.pointHoverAble) !== "undefined") {
                poiSP.hoverable = sets.pointHoverAble;
            }
            if (typeof(sets.pointClickAble) !== "undefined") {
                poiSP.clickable = sets.pointClickAble;
            }

            // 图形携带的数据信息
            poiSP.refDataID = this.data.FID;
            poiSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建图形点并把此图形添加到图表图形数组
            this.shapes.push(this.shapeFactory.createShape(poiSP));
        }

        // 数据范围检测未通过，清空图形
        // if (isDataEffective === false) {
        //     this.shapes = [];
        // }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function KTW.Feature.Theme.Point.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性：<br>
     *              xShapeBlank - {Array<number>} 水平方向上的图形空白间隔参数。
     *              长度为 2 的数组，第一元素表示第折线左端点与数据视图框左端的空白间距，第二个元素表示折线右端点右端与数据视图框右端端的空白间距 。
     * @return {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性：<br>
     *         xPositions - {Array<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。</br>
     *         width - {number}表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     */
    calculateXShapeInfo() {
        var dvb = this.dataViewBox;     // 数据视图框
        var sets = this.setting;     // 图表配置对象
        var fvc = this.dataValues.length;      // 数组值个数

        if (fvc < 1) {
            return null;
        }

        var xBlank;        // x 轴空白间隔参数
        var xShapePositions = [];         // x 轴上图形的位置
        var xShapeWidth = 0;          // x 轴上图形宽度(自适应)
        var dvbWidth = this.DVBWidth;            // 数据视图框宽度
        var unitOffset = 0;               // 单位偏移量

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 2) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[1]);
            if (xsLen <= fvc) {
                return null;
            }
            unitOffset = xsLen / (fvc - 1);
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            unitOffset = dvbWidth / (fvc + 1);
            xBlank = [unitOffset, unitOffset, unitOffset];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0];
            } else {
                xOffset += unitOffset;
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }

};

//KTW.Client.Point = Point;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Point = Point;

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ring; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_Sector__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Graph__ = __webpack_require__(6);





/**
 * @class KTW.Feature.Theme.Ring
 * @classdesc 环状图。
 * @description 基于路由对象计算指定点M值操作的参数类。通过该类提供参数信息。
 * 图表 Ring 配置对象 chartsSetting（KTW.Layer.Graph::chartsSetting） 可设属性如下：</br>
 * width - {number} 专题要素（图表）宽度，必设参数。</br>
 * height - {number} 专题要素（图表）高度，必设参数。</br>
 * codomain - {Array<number>} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。</br>
 * XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。</br>
 * YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。</br>
 * dataViewBoxParameter - {Array<number>} 数据视图框 dataViewBox 参数，
 * 它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。默认值为：[0, 0, 0, 0]。</br>
 * decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。</br>
 * useBackground - {boolean} 是否使用图表背景框，默认不使用。</br>
 * backgroundStyle - {Object} 背景样式，此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Rectangle::style>。</br>
 * backgroundRadius - {Array<number>} 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,则 backgroundRadius 为 [r1、r2、r3、r4 ]，默认值[0, 0, 0, 0]。</br>
 *innerRingRadius - {number} 环状图内环半径，默认值: 0，取值范围大于 0，小于外环半径（外环半径：数据视图框长和宽中较小值的二分之一）。</br>
 *sectorStyle - {Object} 环状图中扇形的基础 style，此参数控制环状图扇形基础样式，优先级低于 sectorStyleByFields 和 sectorStyleByCodomain。
 * 此样式对象对象可设属性： <KTW.Feature.ShapeParameters.Sector::style> 。</br>
 * sectorStyleByFields - {Array<Object>} 按专题字段 themeFields（<KTW.Layer.Graph::themeFields>）为环状图扇形赋 style，此参数按字段控制环状图扇形样式，优先级低于 sectorStyleByCodomain，高于 sectorStyle。此数组中的元素是样式对象，其可设属性： <KTW.Feature.ShapeParameters.Sector::style> 。</br>
 * 此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<KTW.Layer.Graph::themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],sectorStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的环状图扇形使用 style1，字段 POP_1995 对应的环状图扇形使用 style2 ，字段 POP_1999 对应的环状图扇形使用 style3。</br>
 * sectorStyleByCodomain - {Array<Object>} 按环状图扇形代表的数据值所在值域范围控制环状图扇形样式，优先级高于 sectorStyle 和 sectorStyleByFields。</br>
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数。</br>
 * @param layer - {KTW.Layer.Graph} 此专题要素所在图层，必设参数。</br>
 * @param fields - {Array<string>} data 中的参与此图表生成的字段名称，必设参数。</br>
 * @param setting - {Object} 图表配置对象，必设参数。</br>
 * @param lonlat - {KTW.LonLat} 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。</br>
 *
 * @example
 * // sectorStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <KTW.Feature.ShapeParameters.Sector::style> 。
 * // sectorStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 * sectorHoverStyle - {Object} 环状图扇形 hover 状态时的样式，sectorHoverAble 为 true 时有效。
 * sectorHoverAble - {Object} 是否允许环状图扇形使用 hover 状态，默认允许。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽环状图扇形对专题图层事件的响应。
 * sectorClickAble - {Object} 是否允许环状图扇形被点击，默认允许。同时设置 sectorHoverAble 和 sectorClickAble 为 false，可以直接屏蔽环状图扇形对专题图层事件的响应。
 *
 * @extends {KTW.Feature.Theme.Graph}
 */
class Ring extends __WEBPACK_IMPORTED_MODULE_3__Graph__["a" /* Graph */] {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "KTW.Feature.Theme.Ring";
    }

    /**
     * @function KTW.Feature.Theme.Ring.prototype.destroy
     * @description 销毁此专题要素。调用 destroy 后此对象所以属性置为 null。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KTW.Feature.Theme.Ring.prototype.assembleShapes
     * @description 装配图形（扩展接口）。
     */
    assembleShapes() {
        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 一个默认 style 组
        var defaultStyleGroup = [
            {fillColor: "#ff9277"}, {fillColor: "#dddd00"}, {fillColor: "#ffc877"}, {fillColor: "#bbe3ff"}, {fillColor: "#d5ffbb"},
            {fillColor: "#bbbbff"}, {fillColor: "#ddb000"}, {fillColor: "#b0dd00"}, {fillColor: "#e2bbff"}, {fillColor: "#ffbbe3"},
            {fillColor: "#ff7777"}, {fillColor: "#ff9900"}, {fillColor: "#83dd00"}, {fillColor: "#77e3ff"}, {fillColor: "#778fff"},
            {fillColor: "#c877ff"}, {fillColor: "#ff77ab"}, {fillColor: "#ff6600"}, {fillColor: "#aa8800"}, {fillColor: "#77c7ff"},
            {fillColor: "#ad77ff"}, {fillColor: "#ff77ff"}, {fillColor: "#dd0083"}, {fillColor: "#777700"}, {fillColor: "#00aa00"},
            {fillColor: "#0088aa"}, {fillColor: "#8400dd"}, {fillColor: "#aa0088"}, {fillColor: "#dd0000"}, {fillColor: "#772e00"}
        ];

        // 图表配置对象
        var sets = this.setting;

        // 背景框，默认不启用
        if (sets.useBackground) {
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].Background(this.shapeFactory, this.chartBox, sets));
        }

        // 数据值数组
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 值域范围
        var codomain = this.DVBCodomain;
        // 值域范围检测
        for (let i = 0; i < fv.length; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 值的绝对值总和
        var valueSum = 0;
        for (let i = 0; i < fv.length; i++) {
            valueSum += Math.abs(fv[i]);
        }

        // 重要步骤：定义图表 Ring 数据视图框中单位值的含义，单位值：每度代表的数值
        this.DVBUnitValue = 360 / valueSum;
        var uv = this.DVBUnitValue;

        var dvbCenter = this.DVBCenterPoint;        // 数据视图框中心作为扇心

        var startAngle = 0;         // 扇形起始边角度
        var endAngle = 0;          // 扇形终止边角度
        var startAngleTmp = startAngle;           // 扇形临时起始边角度
        // 扇形外环（自适应）半径
        var r = this.DVBHeight < this.DVBWidth ? this.DVBHeight / 2 : this.DVBWidth / 2;

        // 扇形内环（自适应）半径
        var isInRange = sets.innerRingRadius >= 0 && sets.innerRingRadius < r;
        var r0 = (
            typeof(sets.innerRingRadius) !== "undefined"
            && !isNaN(sets.innerRingRadius)
            && isInRange
        ) ? sets.innerRingRadius : 0;

        for (var i = 0; i < fv.length; i++) {
            var fvi = Math.abs(fv[i]);

            // 计算结束角度
            if (i === 0) {
                endAngle = startAngle + fvi * uv;
            } else if (i === fvi.length - 1) {
                endAngle = startAngleTmp;
            } else {
                endAngle = startAngle + fvi * uv;
            }

            // 扇形参数对象
            var sectorSP = new __WEBPACK_IMPORTED_MODULE_2__feature_Sector__["a" /* Sector */](dvbCenter[0], dvbCenter[1], r, startAngle, endAngle, r0);
            // 扇形样式
            if (typeof(sets.sectorStyleByFields) === "undefined") {
                // 使用默认 style 组
                var colorIndex = i % defaultStyleGroup.length;
                sectorSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.sectorStyle, defaultStyleGroup, null, colorIndex);
            } else {
                sectorSP.style = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.sectorStyle, sets.sectorStyleByFields, sets.sectorStyleByCodomain, i, fv[i]);
            }
            // 扇形 hover 样式
            sectorSP.highlightStyle = __WEBPACK_IMPORTED_MODULE_1__feature_ShapeFactory__["a" /* ShapeFactory */].ShapeStyleTool(null, sets.sectorHoverStyle);
            // 扇形 hover 与 click 设置
            if (typeof(sets.sectorHoverAble) !== "undefined") {
                sectorSP.hoverable = sets.sectorHoverAble;
            }
            if (typeof(sets.sectorClickAble) !== "undefined") {
                sectorSP.clickable = sets.sectorClickAble;
            }
            // 图形携带的数据信息
            sectorSP.refDataID = this.data.FID;
            sectorSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 创建扇形并把此扇形添加到图表图形数组
            this.shapes.push(this.shapeFactory.createShape(sectorSP));

            // 把上一次的结束角度作为下一次的起始角度
            startAngle = endAngle;
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

};

//KTW.Client.Ring = Ring;
__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.Ring = Ring;

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeVector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_Theme__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__levelRender_SmicBrokenLine__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__levelRender_SmicPoint__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__levelRender_SmicPolygon__ = __webpack_require__(15);


//import {FeatureGeometry} from '../service/common/FeatureGeometry'





// import {Rectangle as GeometryRectangle} from './geometry/Rectangle';
// import {Point as GeometryPoint} from './geometry/Point';
// import {Collection} from './geometry/Collection';
// import {MultiPoint} from './geometry/MultiPoint';
// import {LineString} from './geometry/LineString';
// import {MultiLineString} from './geometry/MultiLineString';
// import {LinearRing} from './geometry/LinearRing';
// import {Polygon as GeometryPolygon} from './geometry/Polygon';
// import {MultiPolygon as GeometryMultiPolygon} from './geometry/MultiPolygon';
// import {Curve} from './geometry/Curve';
// import {GeoText} from './geometry/GeoText';





/**
 * @class KTW.Feature.Theme.Vector
 * @classdesc 矢量专题要素类。
 * @extends KTW.Feature.Theme
 * @param data - {KTW.Feature.Vector}  用户数据，必设参数, 矢量专题要素的类型为矢量数据 feature。
 * @param layer - {KTW.Layer} 此专题要素所在图层，必设参数。
 * @param style - {Object} 样式。
 * @param options - {Object} 创建专题要素时的可选参数。<br>
 *        nodesClipPixel - {number}节点抽稀像素距离，默认值 2, 单位：像素。<br>
 *        isHoverAble - {boolean} 图形是否可 hover，默认 true。<br>
 *        isMultiHover - {boolean} 是否使用多图形高亮，isHoverAble 为 true 时生效 ，默认 true。<br>
 *        isClickAble - {boolean} 图形是否可点击，默认 true。<br>
 *        highlightStyle - {Object} 高亮样式。
 */

 //data为 KTW.Object.Feature,这个修改直接对应mapgis的相关数据，不再做对应的转换
class ThemeVector extends __WEBPACK_IMPORTED_MODULE_2__feature_Theme__["a" /* Theme */] {

    constructor(data, layer, style, options, shapeOptions) {
        super(data, layer);
        //数据的 geometry 属性必须存在且类型是 KTW.Geometry 或其子类的类型
        if (!data.fGeom) {
            return;
        }
        /**
         * @member dataBounds - {KTW.Object.Rectangle}
         * @description 用户数据的（feature）地理范围。
         */
        this.dataBounds = data.bound;

        /**
         * @member nodesClipPixel - {number}
         * @description 节点抽稀像素距离，默认值 2。
         */
        this.nodesClipPixel = 2;

        /**
         * @member isHoverAble - {boolean}
         * @description 图形是否可 hover，默认 true。
         */
        this.isHoverAble = true;

        /**
         * @member isMultiHover - {boolean}
         * @description 是否使用多图形高亮，isHoverAble 为 true 时生效 ，默认 true。
         */
        this.isMultiHover = true;

        /**
         * @member isClickAble - {boolean}
         * @description 图形是否可点击，默认 true。
         */
        this.isClickAble = true;

        /**
         * @member highlightStyle - {Object}
         * @description 高亮样式。
         */
        this.highlightStyle = null;

        /**
         * @member shapeOptions - {Object}
         * @description 添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做。
         */
        this.shapeOptions = {};

        /**
         * @member style - {Object}
         * @description 可视化图形的 style。在子类中规定其对象结构和默认属性值。
         */
        this.style = style || {};


        this.CLASS_NAME = "KTW.Feature.Theme.Vector";
        this.style = style ? style : {};
        if (options) {
            Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(this, options, ["shapeOptions", "dataBounds"])
        }
        if (shapeOptions) {
            Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(this.shapeOptions, shapeOptions);
        }

        //设置基础参数 dataBounds、lonlat、location
        var geometry = data.fGeom;
        this.lonlat = [(this.dataBounds.xmin+this.dataBounds.xmax)/2.0,(this.dataBounds.ymin+this.dataBounds.ymax)/2.0];
        this.location = this.getLocalXY(this.lonlat);

        //将地理要素转为专题要素
        switch(data.ftype)
        {
            case 0:
            break;
            case 1:
               this.pointsToTF(data.fGeom.PntGeom);
            break;
            case 2:
               this.linesToTF(data.fGeom.LinGeom)
            break;
            case 3:
               this.regsToTF(data.fGeom.RegGeom);
            break;
        }
    }

    /**
     * @function KTW.Feature.Theme.Vector.prototype.destroy
     * @override
     */
    destroy() {
        this.style = null;
        this.dataBounds = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;
        this.highlightStyle = null;
        this.shapeOptions = null;
        super.destroy();
    }
    
    pointsToTF(geometry)
    {
        if(geometry==null || geometry.length<=0)
        {
            return;
        }
        var components = geometry.components;

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < geometry.length; i++) {
            var components_i = geometry[i];
            refLocal = [];
            localLX = this.getLocalXY([components_i.Dot.x,components_i.Dot.y]);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            //抽稀
            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            //使用参考点
            pointList.push(refLocal);

            //赋 style
            var style = new Object();
            style.r = 6; //防止漏设此参数，默认 6 像素
            style = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(style, this.style);
            style.x = refLocal[0];
            style.y = refLocal[1];

            //创建图形
            var shape = new __WEBPACK_IMPORTED_MODULE_4__levelRender_SmicPoint__["a" /* SmicPoint */]({
                style: style,
                clickable: this.isClickAble,
                hoverable: this.isHoverAble
            });

            //设置高亮样式
            if (this.highlightStyle) {
                shape.highlightStyle = this.highlightStyle;
            }

            //设置参考中心，指定图形位置
            shape.refOriginalPosition = location;

            //储存数据 id 属性，用于事件
            shape.refDataID = this.data.FID;

            //储存数据 id 属性，用于事件-多图形同时高亮
            shape.isHoverByRefDataID = this.isMultiHover;

            //修改一些 shape 可选属性，通常不需要这么做
            if (this.shapeOptions) {
                Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(shape, this.shapeOptions);
            }

            this.shapes.push(shape);
        }
    }

    linesToTF(geometry)
    {
        if(geometry==null || geometry.length<=0)
        {
            return;
        }
        for (var i = 0; i < geometry.length; i++) {
            this.lineToTF(geometry[i]);
        }
    }

    lineToTF(geometry)
    {
        var components = [];
        if(geometry.line!=null && geometry.Line.Arcs!=null &&geometry.Line.Arcs.length>0)
        {
           var arcs = geometry.Line.Arcs;
           for(var i=0;i<arcs.length;i++)
           {
               var dots = arcs[i].Dots;
               for(var j=0;j<dots.length;j++)
               {
                    components.push([dots[j].x,dots[j].y]);
               }
           }
        }
        if(components.length<=0)
        {
            return;
        }

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            refLocal = [];
            localLX = this.getLocalXY(components_i);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            //抽稀 - 2 px
            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            //使用参考点
            pointList.push(refLocal);
        }

        if (pointList.length < 2) {
            return null;
        }

        //赋 style
        var style = new Object();
        style = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(style, this.style, ['pointList']);
        style.pointList = pointList;

        //创建图形
        var shape = new __WEBPACK_IMPORTED_MODULE_3__levelRender_SmicBrokenLine__["a" /* SmicBrokenLine */]({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = this.location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.FID;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做
        if (this.shapeOptions) {
            Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }
    regsToTF(geometry)
    {
        if(geometry==null || geometry.length<=0)
        {
            return;
        }
        for (var i = 0; i < geometry.length; i++) {
            this.regToTF(geometry[i]);
        }
    }
    regToTF(geometry)
    {

        var components = geometry.Rings;
        if(components==null || components.length<=0)
        {
            return;
        }


        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //岛洞
        var holePolygonPointList = [];
        var holePolygonPointLists = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            if (i === 0) {
                // 第一个 component 正常绘制
                pointList = [];
                if(components[i]!=null && components[i].Arcs!=null &&components[i].Arcs.length>0)
                {
                   var arcs =  components[i].Arcs;
                   for(var j=0;j<arcs.length;j++)
                   {
                       var dots = arcs[j].Dots;
                       for(var k=0;k<dots.length;k++)
                       {
                            refLocal = [];
                            localLX = this.getLocalXY([dots[k].x,dots[k].y]);
                            refLocal[0] = localLX[0] - location[0];
                            refLocal[1] = localLX[1] - location[1];
                            //抽稀 - 2 px
                            if (pointList.length > 0) {
                                var lastLocalXY = pointList[pointList.length - 1];
                                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                                    continue;
                                }
                            }

                            //使用参考点
                            pointList.push(refLocal);
                       }
                   }
                }
            }
            else {
                // 其它 component 作为岛洞
                holePolygonPointList = [];
                if(components[i]!=null && components[i].Arcs!=null &&components[i].Arcs.length>0)
                {
                   var arcs =  components[i].Arcs;
                   for(var j=0;j<arcs.length;j++)
                   {
                       var dots = arcs[j].Dots;
                       for(var k=0;k<dots.length;k++)
                       {
                            refLocal = [];
                            localLX = this.getLocalXY([dots[k].x,dots[k].y]);
                            refLocal[0] = localLX[0] - location[0];
                            refLocal[1] = localLX[1] - location[1];
                            //抽稀 - 2 px
                            if (holePolygonPointList.length > 0) {
                                var lastXY = holePolygonPointList[holePolygonPointList.length - 1];
                                if ((Math.abs(lastXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastXY[1] - refLocal[1]) <= nCPx)) {
                                    continue;
                                }
                            }

                            //使用参考点
                            holePolygonPointList.push(refLocal);
                       }
                   }
                }
            }

            if (holePolygonPointList.length < 2) {
                continue;
            }

            holePolygonPointLists.push(holePolygonPointList);
        }

        if (pointList.length < 2) {
            return;
        }

        //赋 style
        var style = {};
        style = Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(style, this.style, ['pointList']);
        style.pointList = pointList;

        //创建图形
        var shape = new __WEBPACK_IMPORTED_MODULE_5__levelRender_SmicPolygon__["a" /* SmicPolygon */]({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = this.location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.FID;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //岛洞面
        if (holePolygonPointLists.length > 0) {
            shape.holePolygonPointLists = holePolygonPointLists;
        }

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["k" /* copyAttributesWithClip */])(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }
    /**
     * @function KTW.Feature.Theme.Vector.prototype.updateAndAddShapes
     * @description 修改位置，针对地图平移操作，地图漫游操作后调用此函数。
     */
    updateAndAddShapes() {
        var newLocalLX = this.getLocalXY(this.lonlat);
        this.location = newLocalLX;

        var render = this.layer.renderer;
        for (var i = 0, len = this.shapes.length; i < len; i++) {
            var shape = this.shapes[i];
            //设置参考中心，指定图形位置
            shape.refOriginalPosition = newLocalLX;
            render.addShape(shape);
        }
    }
    /**
     * @function KTW.Feature.Theme.Vector.prototype.getShapesCount
     * @description 获得专题要素中可视化图形的数量。
     * @return {number} 可视化图形的数量。
     */
    getShapesCount() {
        return this.shapes.length;
    }
    /**
     * @function KTW.Feature.Theme.Vector.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param lonlat - {KTW.LonLat} 专题要素地理位置。
     */
    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].Theme.ThemeVector = ThemeVector;

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShapeFactory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Circle__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Image__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Label__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Line__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Point__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Polygon__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Rectangle__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Sector__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Theme__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__ShapeFactory__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_1__ShapeParameters__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Circle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__Image__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__Label__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__Line__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__Point__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__Polygon__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__Rectangle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__Sector__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__Theme__["a"]; });


































/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LevelRenderer__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Render__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Animation__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Area__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Clip__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Color__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ComputeBoundingBox__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Config__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Curve__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Easing__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Env__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Eventful__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Group__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Handler__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Math__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Matrix__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Painter__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__SmicBrokenLine__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__SmicCircle__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__SmicEllipse__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__SmicImage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__SmicIsogon__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__SmicPoint__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__SmicPolygon__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__SmicRectangle__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__SmicRing__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__SmicSector__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__SmicStar__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__SmicText__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__Storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__Transformable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__Util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__Vector__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__SUtil__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_0__LevelRenderer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_1__Render__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Animation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__Animation__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__Area__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__Clip__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__Color__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__ComputeBoundingBox__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__Config__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_8__Curve__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__Easing__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_10__Env__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_11__Event__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_12__Eventful__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_13__Group__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_14__Handler__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_15__Http__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_16__Math__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_17__Matrix__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_18__Painter__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_18__Painter__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_19__Shape__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_20__SmicBrokenLine__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_21__SmicCircle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_22__SmicEllipse__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_23__SmicImage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_24__SmicIsogon__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_25__SmicPoint__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_26__SmicPolygon__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_27__SmicRectangle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_28__SmicRing__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_29__SmicSector__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_30__SmicStar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_31__SmicText__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_32__Storage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_33__Transformable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __WEBPACK_IMPORTED_MODULE_34__Util__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_35__Vector__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_36__SUtil__["a"]; });












































































/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LevelRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Render__ = __webpack_require__(41);




/**
 * @private
 * LevelRenderer 渲染器。
 *
 */
class LevelRenderer {
    constructor() {
        /**
         * Property: _instances
         * {Object} LevelRenderer 实例 map 索引。
         */
        LevelRenderer._instances = {};
        LevelRenderer.Tool = {};
        this.CLASS_NAME = "KTW.LevelRenderer";

    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
    }

    /**
     * APIMethod: init
     * 创建 LevelRenderer 实例。
     * Parameters:
     * dom - {HTMLElement} 绘图容器。
     *
     * Returns:
     * {<Render>} Render实例。
     */
    init(dom) {
        var zr = new __WEBPACK_IMPORTED_MODULE_2__Render__["a" /* Render */](Object(__WEBPACK_IMPORTED_MODULE_1__service_common_Util__["C" /* newGuid */])(), dom);
        LevelRenderer._instances[zr.id] = zr;
        return zr;
    }

    /**
     * APIMethod: dispose
     * LevelRenderer 实例销毁。
     *
     *
     * Parameters:
     * zr - {<Render>} ZRender对象，不传则销毁全部。
     *
     * Returns:
     * {<KTW.LevelRenderer>} this。
     */
    dispose(zr) {
        if (zr) {
            zr.dispose();
            this.delInstance(zr.id);
        } else {
            for (var key in LevelRenderer._instances) {
                LevelRenderer._instances[key].dispose();
            }
            LevelRenderer._instances = {};
        }

        return this;
    }

    /**
     * APIMethod: getInstance
     * 获取 Render 实例。
     *
     * Parameters:
     * id - {String} ZRender对象索引。
     * Returns:
     * {<Render>} Render 实例。
     */
    getInstance(id) {
        return LevelRenderer._instances[id];
    }

    /**
     * Parameters:
     * id - {String} Render 对象索引。
     * Returns:
     * {<KTW.LevelRenderer>} this。
     */
    delInstance(id) {
        delete LevelRenderer._instances[id];
        return this;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer = LevelRenderer;

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicEllipse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);



/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicEllipse
 * 椭圆。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicEllipse({
 *       style: {
 *           x: 100,
 *           y: 100,
 *           a: 40,
 *           b: 20,
 *           brushType: 'both',
 *           color: 'blue',
 *           strokeColor: 'red',
 *           lineWidth: 3,
 *           text: 'SmicEllipse'
 *       }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicEllipse extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * a - {Number} 横轴半径，必设参数。
     * b - {Number} 纵轴半径，必设参数。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style
    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicEllipse
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);

        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicellipse';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicEllipse";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 构建椭圆的 Path。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var k = 0.5522848;
        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var a = style.a;
        var b = style.b;
        var ox = a * k; // 水平控制点偏移量
        var oy = b * k; // 垂直控制点偏移量
        // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
    }


    /**
     * APIMethod: getRect
     * 计算返回椭圆包围盒矩形
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.a - lineWidth / 2),
            y: Math.round((style.x + __OP[1]) - style.b - lineWidth / 2),
            width: style.a * 2 + lineWidth,
            height: style.b * 2 + lineWidth
        };

        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicEllipse = SmicEllipse;

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicIsogon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SUtil__ = __webpack_require__(3);




/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicIsogon
 * 正多边形。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 */
class SmicIsogon extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 正 n 边形外接圆心 x 坐标，必设参数。
     * y - {Number} 正 n 边形外接圆心 y 坐标，必设参数。
     * r - {Number} 正n边形外接圆半径，必设参数。
     *ｎ - {Number} 指明正几边形，必设参数（n>=3）。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style



    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicIsogon
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicisogon';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicIsogon";
    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 创建n角星（n>=3）路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var sin = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.sin;
        var cos = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.cos;
        var PI = Math.PI;

        var n = style.n;
        if (!n || n < 2) {
            return;
        }

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;

        var dStep = 2 * PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断insight
        var pointList = style.pointList = [];
        pointList.push([xStart, yStart]);
        for (let i = 0, end = n - 1; i < end; i++) {
            pointList.push([x + r * cos(deg), y + r * sin(deg)]);
            deg += dStep;
        }
        pointList.push([xStart, yStart]);

        // 绘制
        ctx.moveTo(pointList[0][0], pointList[0][1]);
        for (let i = 0; i < pointList.length; i++) {
            ctx.lineTo(pointList[i][0], pointList[i][1]);
        }
        ctx.closePath();

        return;
    }


    /**
     * APIMethod: getRect
     * 计算返回正多边形的包围盒矩形。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.r - lineWidth / 2),
            y: Math.round((style.y + __OP[1]) - style.r - lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicIsogon = SmicIsogon;

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicRing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);



/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicRing
 * 圆环。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicRing({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r0: 30,
 *             r: 50
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 * (end)
 */
class SmicRing extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 外圆半径，必设参数。
     * r0 - {Number} 内圆半径，必设参数。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicRing
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicring';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicRing";

    }


    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: buildPath
     * 创建圆环路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        // 非零环绕填充优化
        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r, 0, Math.PI * 2, false);
        ctx.moveTo((style.x + __OP[0]) + style.r0, style.y + __OP[1]);
        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r0, 0, Math.PI * 2, true);
        return;
    }


    /**
     * APIMethod: getRect
     * 计算返回圆环包围盒矩阵
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.r - lineWidth / 2),
            y: Math.round((style.y + __OP[1]) - style.r - lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicRing = SmicRing;

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmicStar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_common_Base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SUtil__ = __webpack_require__(3);




/**
 * @private
 * @class  KTW.LevelRenderer.Shape.SmicStar
 * n 角星（n>3）。
 *
 * Inherits from:
 *  - <KTW.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new KTW.LevelRenderer.Shape.SmicStar({
 *         style: {
 *             x: 200,
 *             y: 100,
 *             r: 150,
 *             n: 5,
 *             text: '五角星'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
class SmicStar extends __WEBPACK_IMPORTED_MODULE_1__Shape__["a" /* Shape */] {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} n 角星外接圆心 x 坐标，必设参数。
     * y - {Number} n 角星外接圆心 y 坐标，必设参数。
     * r - {Number} n 角星外接圆半径，必设参数。
     * r0 - {Number} n 角星内部顶点（凹点）的外接圆半径。如果不指定此参数，则自动计算：取相隔外部顶点连线的交点作内部顶点。
     * n - {Number} 指明几角星，必设参数。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style


    /**
     * Constructor: KTW.LevelRenderer.Shape.SmicStar
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * Property: type
         * {String} 图形类型。
         */
        this.type = 'smicstar';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "KTW.LevelRenderer.Shape.SmicStar";
    }

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }

    /**
     * APIMethod: buildPath
     * 创建n  角星（n>3）路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var n = style.n;
        if (!n || n < 2) {
            return;
        }

        var sin = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.sin;
        var cos = __WEBPACK_IMPORTED_MODULE_2__SUtil__["a" /* SUtil */].Util_math.cos;
        var PI = Math.PI;

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;
        var r0 = style.r0;

        // 如果未指定内部顶点外接圆半径，则自动计算
        if (r0 == null) {
            r0 = n > 4
                // 相隔的外部顶点的连线的交点，
                // 被取为内部交点，以此计算r0
                ? r * cos(2 * PI / n) / cos(PI / n)
                // 二三四角星的特殊处理
                : r / 3;
        }

        var dStep = PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断inside
        var pointList = style.pointList = [];
        pointList.push([xStart, yStart]);
        for (var i = 0, end = n * 2 - 1, ri; i < end; i++) {
            ri = i % 2 === 0 ? r0 : r;
            pointList.push([x + ri * cos(deg), y + ri * sin(deg)]);
            deg += dStep;
        }
        pointList.push([xStart, yStart]);

        // 绘制
        ctx.moveTo(pointList[0][0], pointList[0][1]);
        for (let i = 0; i < pointList.length; i++) {
            ctx.lineTo(pointList[i][0], pointList[i][1]);
        }

        ctx.closePath();

        return;
    }

    /**
     * APIMethod: getRect
     * 返回 n 角星包围盒矩形。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.r - lineWidth / 2),
            y: Math.round((style.y + __OP[1]) - style.r - lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }

};

__WEBPACK_IMPORTED_MODULE_0__service_common_Base__["a" /* KTW */].LevelRenderer.SmicStar = SmicStar;

/***/ })
/******/ ]);
});
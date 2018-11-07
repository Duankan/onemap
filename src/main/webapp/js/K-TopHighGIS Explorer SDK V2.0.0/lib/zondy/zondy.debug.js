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










/***/ }),
/* 2 */
/***/ (function(module, exports) {

var ZondyLeaflet = { //jshint ignore:line
    Layers: {},
    Service: {}
};

if (typeof window !== 'undefined' && window.L) {
    window.L.zondy = ZondyLeaflet;
}
window.ZondyLeaflet = ZondyLeaflet;
ZondyLeaflet.ZondyClass = L.Class.extend({
    initialize: function (options) {
        options = L.setOptions(this, options);
    },
    toJSON: function () {
        return L.Util.toJSON(this, ["_initHooksCalled", "_initHooks"], null, true);
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

﻿//========================================================MapGIS样式类=========================================================


﻿/*ZondyLeaflet.CDisplayStyle--------------------------------------------------------------------------------------------------
* 地图文档显示样式对象
*/
ZondyLeaflet.CDisplayStyle = ZondyLeaflet.ZondyClass.extend({
   
	initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>地图显示参数</summary>
        /// <summary>注记符号大小固定</summary>
        this.AnnSizeFixed = (options.AnnSizeFixed !== undefined) ? options.AnnSizeFixed : false;

        /// <summary>图像质量</summary>可选值为：1（低）、2（中）、3（高）
        this.DriverQuality = (options.DriverQuality !== undefined) ? options.DriverQuality : 0;

        /// <summary>是否动态投影</summary>
        this.DynProjFlag = (options.DynProjFlag !== undefined) ? options.DynProjFlag : false;

        /// <summary>符号是否跟随显示放大（该属性已过时，请使用各个要素类的大小固定及线宽固定）</summary>
        this.FollowScale = (options.FollowScale !== undefined) ? options.FollowScale : false;

        /// <summary>线状符号线宽固定</summary>
        this.LinPenWidFixed = (options.LinPenWidFixed !== undefined) ? options.LinPenWidFixed : false;

        /// <summary>线状符号大小固定</summary>
        this.LinSizeFixed = (options.LinSizeFixed !== undefined) ? options.LinSizeFixed : false;

        /// <summary>点状符号线宽固定</summary>
        this.PntPenWidFixed = (options.PntPenWidFixed !== undefined) ? options.PntPenWidFixed : false;

        /// <summary>点状符号大小固定</summary>
        this.PntSizeFixed = (options.PntSizeFixed !== undefined) ? options.PntSizeFixed : false;

        /// <summary>填充符号线宽固定</summary>
        this.RegPenWidFixed = (options.RegPenWidFixed !== undefined) ? options.RegPenWidFixed : false;

        /// <summary> 填充符号大小固定</summary>
        this.RegSizeFixed = (options.RegSizeFixed !== undefined) ? options.RegSizeFixed : false;

        /// <summary>显示坐标点</summary>
        this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

        /// <summary>显示元素的外包矩形</summary>
        this.ShowElemRect = (options.ShowElemRect !== undefined) ? options.ShowElemRect : false;

        /// <summary>图层显示参数Array,Zondy.Object.DynShowStyle in Array</summary>
        this.ShowStyle = (options.ShowStyle !== undefined) ? options.ShowStyle : null;

        /// <summary>是否进行还原显示</summary>
        this.SymbleShow = (options.SymbleShow !== undefined) ? options.SymbleShow : false;
	}
});



﻿/*ZondyLeaflet.CDisplayStyle--------------------------------------------------------------------------------------------------
* 地图矢量图层显示样式对象
*/
ZondyLeaflet.CDisplayStyleExtend = ZondyLeaflet.ZondyClass.extend({
   
	initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>图层索引</summary>
        this.Index = (options.Index !== undefined) ? options.Index : 0;

        /// <summary>是否进行还原显示</summary>
        this.SymbleShow = (options.SymbleShow !== undefined) ? options.SymbleShow : false;

        /// <summary>线状符号线宽固定</summary>
        this.LinPenWidFixed = (options.LinPenWidFixed !== undefined) ? options.LinPenWidFixed : false;

        /// <summary>线状符号大小固定</summary>
        this.LinSizeFixed = (options.LinSizeFixed !== undefined) ? options.LinSizeFixed : false;

        /// <summary>点状符号线宽固定</summary>
        this.PntPenWidFixed = (options.PntPenWidFixed !== undefined) ? options.PntPenWidFixed : false;

        /// <summary>点状符号大小固定</summary>
        this.PntSizeFixed = (options.PntSizeFixed !== undefined) ? options.PntSizeFixed : false;

        /// <summary>填充符号线宽固定</summary>
        this.RegPenWidFixed = (options.RegPenWidFixed !== undefined) ? options.RegPenWidFixed : false;

        /// <summary> 填充符号大小固定</summary>
        this.RegSizeFixed = (options.RegSizeFixed !== undefined) ? options.RegSizeFixed : false;

        /// <summary>注记符号大小固定</summary>
        this.AnnSizeFixed = (options.AnnSizeFixed !== undefined) ? options.AnnSizeFixed : false;

        /// <summary>//符号是否跟随显示放大，该属性已过时，请使用各个要素类的大小固定及线宽固定</summary>
        this.FollowScale = (options.FollowScale !== undefined) ? options.FollowScale : false;

        /// <summary>显示坐标点</summary>
        this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

        /// <summary>显示元素的外包矩形</summary>
        this.ShowElemRect = (options.ShowElemRect !== undefined) ? options.ShowElemRect : false;

        /// <summary>图像质量</summary>可选值为：1（低）、2（中）、3（高）
        this.DriverQuality = (options.DriverQuality !== undefined) ? options.DriverQuality : 0;

        /// <summary>是否动态投影</summary>
        this.DynProjFlag = (options.DynProjFlag !== undefined) ? options.DynProjFlag : false;
	}
});



﻿/*ZondyLeaflet.DynShowStyle-----------------------------------------------------------------------------------------------------
* 图层动态显示样式对象
*/
ZondyLeaflet.DynShowStyle = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
	    var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>透明度</summary>
        this.Alpha = (options.Alpha !== undefined) ? options.Alpha : 0;

        /// <summary>是否使用错误处理符号</summary>
        this.BugSpare = (options.BugSpare !== undefined) ? options.BugSpare : false;

        /// <summary>是否自绘驱动</summary>
        this.CustomRender = (options.CustomRender !== undefined) ? options.CustomRender : false;

        /// <summary>自绘驱动路径设置,String</summary>
        this.CustomRenderPath = (options.CustomRenderPath !== undefined) ? options.CustomRenderPath : null;

        /// <summary>显示的线方向线符号(只适用于其颜色)</summary>
        this.DirectionLineClr = (options.DirectionLineClr !== undefined) ? options.DirectionLineClr : 0;

        /// <summary>是否动态注记</summary>
        this.DynNoteFlag = (options.DynNoteFlag !== undefined) ? options.DynNoteFlag : false;

        /// <summary>动态注记参数,Zondy.Object.CDynNoteInfo</summary>
        this.DynNoteInfo = (options.DynNoteInfo !== undefined) ? options.DynNoteInfo : null;

        /// <summary>是否显示填充区域的弧段,Zondy.Enum.ISShowArc;枚举类型</summary>
        /// 取值范围： 1（Zondy.Enum.ISShowArc.Reg）,2（Zondy.Enum.ISShowArc.Arc）,3（Zondy.Enum.ISShowArc.All）
        this.IsShowArc = (options.IsShowArc !== undefined) ? options.IsShowArc : 0;

        /// <summary>是否显示线方向</summary>
        this.ISShowLineDirection = (options.ISShowLineDirection !== undefined) ? options.ISShowLineDirection : false;

        /// <summary>显示的弧段样式(只适用于其颜色),Zondy.Object.CLineInfo</summary>
        this.LineInfo = (options.LineInfo !== undefined) ? options.LineInfo : null;

        /// <summary>最大显示比率</summary>
        this.MaxScale = (options.MaxScale !== undefined) ? options.MaxScale : 0.00;

        /// <summary>最小显示比率</summary>
        this.MinScale = (options.MinScale !== undefined) ? options.MinScale : 0.00;

        /// <summary>显示坐标点</summary>
        this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

        /// <summary>错误处理线符号,Zondy.Object.CLineInfo</summary>
        this.SpareLineInfo = (options.SpareLineInfo !== undefined) ? options.SpareLineInfo : null;

        /// <summary>错误处理点符号,Zondy.Object.CPointInfo</summary>
        this.SparePointInfo = (options.SparePointInfo !== undefined) ? options.SparePointInfo : null;

        /// <summary>错误处理区符号,Zondy.Object.CRegionInfo</summary>
        this.SpareRegInfo = (options.SpareRegInfo !== undefined) ? options.SpareRegInfo : null;

        /// <summary>符号显示比例</summary>
        this.SymbleScale = (options.SymbleScale !== undefined) ? options.SymbleScale : 0.00;
	}

});

/**
* 定义线要素的相关参数
*/
ZondyLeaflet.CLineInfo = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		 var options = (opt_options!==undefined) ? opt_options : {};
        /// <summary>线颜色</summary>
        this.Color = (options.Color!==undefined && options.Color!=null) ? options.Color : 1;

        /// <summary>线型ID</summary>
        this.LinStyleID = (options.LinStyleID!==undefined && options.LinStyleID!=null) ? options.LinStyleID : 1;

        /// <summary>辅助线型ID</summary>
        this.LinStyleID2 = (options.LinStyleID2!==undefined && options.LinStyleID2!=null) ? options.LinStyleID2 : 0;

        /// <summary>线宽度</summary>
        this.LinWidth = (options.LinWidth!==undefined && options.LinWidth!=null) ? options.LinWidth : 1;

        /// <summary>x比例系数</summary>
        this.Xscale = (options.Xscale!==undefined && options.Xscale!=null) ? options.Xscale : 1;

        /// <summary>y比例系数</summary>
        this.Yscale = (options.Yscale!==undefined && options.Yscale!=null) ? options.Yscale : 1;
	}

});

/**
* 定义点要素的相关参数
*/
ZondyLeaflet.CPointInfo = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options!==undefined) ? opt_options : {};
          /// <summary>子图角度</summary>
        this.Angle = (options.Angle!==undefined && options.Angle!=null) ? options.Angle : 1;

        /// <summary>子图颜色</summary>
        this.Color = (options.Color!==undefined && options.Color!=null) ? options.Color : 1;

        /// <summary>子图高度</summary>
        this.SymHeight = (options.SymHeight!==undefined && options.SymHeight!=null) ? options.SymHeight : 1;

        /// <summary>子图ID</summary>
        this.SymID = (options.SymID!==undefined && options.SymID!=null) ? options.SymID : 1;

        /// <summary>子图宽度</summary>
        this.SymWidth = (options.SymWidth!==undefined && options.SymWidth!=null) ? options.SymWidth : 1; 
		
	}

});
/**
* 定义区要素的相关参数
*/
ZondyLeaflet.CRegionInfo = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		 var options = (opt_options!==undefined) ? opt_options : {};
        /// <summary>结束填充色</summary>
        this.EndColor = (options.EndColor!==undefined && options.EndColor!=null) ? options.EndColor : 1;

        /// <summary>填充颜色</summary>
        this.FillColor = (options.FillColor!==undefined && options.FillColor!=null) ? options.FillColor : 1;

        /// <summary>填充模式</summary>
        this.FillMode = (options.FillMode!==undefined && options.FillMode!=null) ? options.FillMode : 0;

        /// <summary>填充图案笔宽</summary>
        this.OutPenWidth = (options.OutPenWidth!==undefined && options.OutPenWidth!=null) ? options.OutPenWidth : 1;

        /// <summary>填充图案角度</summary>
        this.PatAngle = (options.PatAngle!==undefined && options.PatAngle!=null) ? options.PatAngle : 1;

        /// <summary>填充图案颜色</summary>
        this.PatColor = (options.PatColor!==undefined && options.PatColor!=null) ? options.PatColor : 1;

        /// <summary>填充图案高度</summary>
        this.PatHeight = (options.PatHeight!==undefined && options.PatHeight!=null) ? options.PatHeight : 1;

        /// <summary>填充图案ID</summary>
        this.PatID = (options.PatID!==undefined && options.PatID!=null) ? options.PatID : 1;

        /// <summary>填充图案宽度</summary>
        this.PatWidth = (options.PatWidth!==undefined && options.PatWidth!=null) ? options.PatWidth : 1;
	}

});
/**
* 定义点要素的相关参数
*/
ZondyLeaflet.CDynNoteInfo = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>动态注记字符串角度</summary>
        this.Angle = (options.Angle !== undefined) ? options.Angle : 0.00;

        /// <summary>背景颜色</summary>取值请参照MapGIS颜色库中颜色编号
        this.Backclr = (options.Backclr !== undefined) ? options.Backclr : 0;

        /// <summary>轮廓宽度</summary>
        this.Backexp = (options.Backexp !== undefined) ? options.Backexp : 0.00;

        /// <summary>加粗</summary>
        this.Bold = (options.Bold !== undefined) ? options.Bold : 0;

        /// <summary>注记字段名称</summary>
        this.FieldName = (options.FieldName !== undefined) ? options.FieldName : null;

        /// <summary>字体角度</summary>
        this.FontAngle = (options.FontAngle !== undefined) ? options.FontAngle : 0.00;

        /// <summary>注记颜色</summary>
        this.FontColor = (options.FontColor !== undefined) ? options.FontColor : 0;

        /// <summary>注记大小</summary>
        this.FontSize = (options.FontSize !== undefined) ? options.FontSize : 0;

        /// <summary>注记字体</summary>
        this.FontStyle = (options.FontStyle !== undefined) ? options.FontStyle : 0;

        /// <summary>中文字体</summary>
        this.Ifnt = (options.Ifnt !== undefined) ? options.Ifnt : 0;

        /// <summary>字形</summary>
        this.Ifnx = (options.Ifnx !== undefined) ? options.Ifnx : ZondyLeaflet.Enum.FontShape.Positive;

        /// <summary>是否填充背景</summary>
        this.IsFilled = (options.IsFilled !== undefined) ? options.IsFilled : false;

        /// <summary>是否水平显示</summary>
        this.IsHzpl = (options.IsHzpl !== undefined) ? options.IsHzpl : false;

        /// <summary>覆盖方式（表明透明还是覆盖）</summary>
        this.IsOvprnt = (options.IsOvprnt !== undefined) ? options.IsOvprnt : false;

        /// <summary>Description</summary>
        this.LabelLevel = (options.LabelLevel !== undefined) ? options.LabelLevel : 0;

        /// <summary>动态注记方位属性,Zondy.Object.DynNoteLableType</summary>
        this.LableType = (options.LableType !== undefined) ? options.LableType : null;

        /// <summary> x方向的偏移</summary>
        this.Offsetx = (options.Offsetx !== undefined) ? options.Offsetx : 0.00;

        /// <summary>y方向的偏移</summary>
        this.Offsety = (options.Offsety !== undefined) ? options.Offsety : 0.00;

        /// <summary>字间距</summary>
        this.Space = (options.Space !== undefined) ? options.Space : 0.00;

        /// <summary>删除线</summary>
        this.StrikeThrough = (options.StrikeThrough !== undefined) ? options.StrikeThrough : 0;

        /// <summary>下划线</summary>
        this.UnderLine = (options.UnderLine !== undefined) ? options.UnderLine : 0;
	}

});
/**
* 方位属性
*/
ZondyLeaflet.DynNoteLableType = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>点方位属性,Zondy.Object.LablePntInfo</summary>
        this.PntInfo = (options.PntInfo !== undefined && options.PntInfo != null) ? options.PntInfo : null;

        /// <summary>线方位属性,Zondy.Object.LabelLinInfo</summary>
        this.LinInfo = (options.LinInfo !== undefined && options.LinInfo != null) ? options.LinInfo : null;

        /// <summary>区方位属性,Zondy.Object.LabelRegInfo</summary>
        this.RegInfo = (options.RegInfo !== undefined && options.RegInfo != null) ? options.RegInfo : null;
	}

});

/**
* 线方位属性
*/
ZondyLeaflet.LabelLinInfo = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options!==undefined) ? opt_options : {};
        /// <summary> 不完全注记</summary>
        this.ClientOutLabel = (options.ClientOutLabel!==undefined && options.ClientOutLabel!=null) ? options.ClientOutLabel : false;

        /// <summary>偏离线约束 偏移线的距离</summary>
        this.DistFromLine = (options.DistFromLine!==undefined && options.DistFromLine!=null) ? options.DistFromLine : 0.00;

        /// <summary>Zondy.Enum.LineConstrain,枚举类型,偏离线约束</summary>
        this.FromLineConstrain = (options.FromLineConstrain!==undefined && options.FromLineConstrain!=null) ? options.FromLineConstrain : 0;

        /// <summary>线重复注记 每段的长度</summary>
        this.Interval = (options.Interval!==undefined && options.Interval!=null) ? options.Interval : 0.00;

        /// <summary>Zondy.Enum.LabelLinType,枚举类型, 线方位</summary>
        this.LinType = (options.LinType!==undefined && options.LinType!=null) ? options.LinType : 0;

        /// <summary>Zondy.Enum.RepeatType,枚举类型,线重复注记策略</summary>
        this.Repeat = (options.Repeat!==undefined && options.Repeat!=null) ? options.Repeat : 0;

        /// <summary>Zondy.Enum.LabelSpreadType,枚举类型,注记分布的策略</summary>
        this.SpreadType = (options.SpreadType!==undefined && options.SpreadType!=null) ? options.SpreadType : null;
		
	}

});

/**
* 点方位属性
*/
ZondyLeaflet.LablePntInfo = ZondyLeaflet.ZondyClass.extend({
    initialize : function(opt_options){ // (HTMLElement or String, Object)
        var options = (opt_options!==undefined) ? opt_options : {};
        /// <summary>点任意方位的角度值，Array,Double in an Array</summary>
        this.Ang = (options.Ang!==undefined && options.Ang!=null) ? options.Ang : null;

        /// <summary>不完全注记</summary>
        this.ClientOutLabel = (options.ClientOutLabel!==undefined && options.ClientOutLabel!=null) ? options.ClientOutLabel : false;

        /// <summary>偏移距离，单位为像素</summary>
        this.Distance = (options.Distance!==undefined && options.Distance!=null) ? options.Distance : 0.00;

        /// <summary>点八方位注记类型，Array,Zondy.Enum.EightDirType in an Array</summary>
        this.EightDirLableType = (options.EightDirLableType!==undefined && options.EightDirLableType!=null) ? options.EightDirLableType : null;

        /// <summary>Zondy.Enum.LabelPntType 枚举类型, 点方位</summary>
        this.PntType = (options.PntType!==undefined && options.PntType!=null) ? options.PntType : 0;
	}

});

/**
* 区方位属性
*/
ZondyLeaflet.LabelRegInfo = ZondyLeaflet.ZondyClass.extend({
    
    initialize : function(opt_options){ // (HTMLElement or String, Object)
		var options = (opt_options!==undefined) ? opt_options : {};
        /// <summary>不完全注记</summary>
        this.ClientOutLabel =(options.ClientOutLabel!==undefined && options.ClientOutLabel!=null)?options.ClientOutLabel: false;

        /// <summary>是否尝试水平注记微小区 short</summary>
        this.LabelMiniRegion = (options.LabelMiniRegion!==undefined && options.LabelMiniRegion!=null) ? options.LabelMiniRegion  : 0;

        /// <summary>自适应策略 区内不能注记时，是否可以注记在外部 short</summary>
        this.MayPlaceOutside = (options.MayPlaceOutside!==undefined && options.MayPlaceOutside!=null) ? options.MayPlaceOutside : 0;

        /// <summary>微小区最大面积 short</summary>
        this.MiniRegionArea = (options.MiniRegionArea!==undefined && options.MiniRegionArea!=null) ? options.MiniRegionArea : 0;

        /// <summary>区域外注记时，注记偏移的距离</summary>
        this.Offset = (options.Offset!==undefined && options.Offset!=null) ? options.Offset : 0.00;

        /// <summary>区方位，Zondy.Enum.LabelRegType,枚举类型</summary>
        this.RegType = (options.RegType!==undefined && options.RegType!=null) ? options.RegType : 0;
		
	}

});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

ZondyLeaflet.Tangram = ZondyLeaflet.ZondyClass.extend({
    initialize: function (opt_options) { // (HTMLElement or String, Object)
        var options = (opt_options !== undefined) ? opt_options : {};
    },
    /// <summary> 
    /// 实现将openlayers的geomerty转换为zondy的几何类型
    /// 此方法由子类实现
    /// </summary>
    setByOL : function (openlayersObj) {
        return null;
    },

    /// <summary>
    /// 对象转化为字符串
    /// </summary>
    toString : function () {
        return "";
    },

    /// <summary>
    /// 获取几何类型名称,由子类实现
    /// </summary>
    getGeometryType :function () {
        return;
    },

    /// <summary>
    /// 1.去除字符串前后所有空格
    /// 2.去除字符串中所有空格(包括中间空格,需要设置第2个参数为:g) 
    /// </summary>
    Trim :function (str, is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global.toLowerCase() == "g") {
            result = result.replace(/\s/g, "");
        }
        return result;
    }

});
///Zondy.Object.Circle----------------------------------------------------------------------------------------------------------
/// <summary>点几何对象构造函数</summary>
/// <param name="x" type="double">点x坐标</param>
/// <param name="y" type="double">点y坐标</param>
/// <param name="opt_options" type="Object">属性键值对</param>
ZondyLeaflet.Point2D = ZondyLeaflet.Tangram.extend({
    /// <summary>x轴坐标</summary>
    x: null,

    /// <summary>y轴坐标</summary>
    y: null,

    initialize: function (x, y,opt_options) {
        this.x = x!==undefined ? x : null;
        this.y = y!==undefined ? y : null;

        var options = opt_options ? opt_options : {};

         /// <summary>容差半径 double</summary>(**只在做点查询时需赋值**)
        this.nearDis = options.nearDis!==undefined ? parseFloat(options.nearDis) : null;

 
    },

    setByOL: function (point) {
        /// <summary>通过传入Openlayers的OpenLayers.Geometry.Point类型来设置参数</summary>
        /// <param name="point" type="OpenLayers.Geometry.Point">Openlayers定义的点类型</param>
        this.x = point.x;
        this.y = point.y;

    },

    toString: function () {
       /// <summary>返回一个以字符串形式表示的点</summary>
        if (this.x == null || this.y == null)
            return "";
        var str = this.x + ',' + this.y;
        if (this.nearDis!==undefined) {
          str += ";" + this.nearDis;
        }
        return str;
    },

    getGeometryType: function () {
        /// <summary>获取几何类型名称</summary>
        return "point";
    }

  });

  ﻿/*Zondy.Object.Circle----------------------------------------------------------------------------------------------------------
    * 圆几何对象
    */
  ZondyLeaflet.Circle = ZondyLeaflet.Tangram.extend({
    /// <summary>
    ///  圆心点
    ///  Zondy.Object.Point2D
    /// </summary>
    point: null,

    /// <summary>
    ///  半径
    ///  Float
    /// </summary>
    radius: null,
    initialize: function (point, radious) {
        /// <summary>构造函数</summary>
        /// <param name="point" type="Zondy.Object.Point2D">圆心点</param>
        /// <param name="radious" type="Float">半径</param>
        this.point = point;
        this.radious = radious;
    },

    setByOL: function (openlayersCircle) {
        /// <summary>通过传入Openlayers的OpenLayers.Geometry类型来设置参数</summary>
        /// <param name="openlayersCircle" type="由Openlayers定义的圆类型">Description</param>
        var geoObj = openlayersCircle.components;
        var linearRing = new OpenLayers.Geometry.LinearRing(geoObj[0].components);
        //圆心
        var centerPoint = linearRing.getCentroid();
        //圆半径
        var radious = Math.abs(geoObj[0].components[0].x - centerPoint.x);
        this.point = new Zondy.Object.Point2D(centerPoint.x, centerPoint.y);
        this.radious = radious;
    },

    toString: function () {
        /// <summary>返回一个字符串来表示此圆</summary>
        if (this.point == null || this.radious == null)
            return "";
        return this.point.x + ',' + this.point.y + ',' + this.radious;
    },

    getGeometryType: function () {
        /// <summary>获取几何类型名称</summary>
        return "Circle";
    }

  });
﻿/*Zondy.Object.PolyLine---------------------------------------------------------------------------------------------------------
* 线几何对象
*/
  ZondyLeaflet.PolyLine = ZondyLeaflet.Tangram.extend({
     /// <summary>Array ,Zondy.Object.Point2D in an Array</summary>
    pointArr: null,
    initialize: function (pointArr, opt_options) {
         /// <summary>构造函数</summary>
        /// <param name="pointArr" type="Array,Zondy.Object.Point2D in an Array">一组点类型</param>

         var options = (opt_options!==undefined) ? opt_options : {};
        /// <summary>线搜素半径 double</summary>(**只在做线查询时需赋值**)
        this.nearDis = (options.nearDis!==undefined && options.nearDis!=null) ? parseFloat(options.nearDis) : null;
        this.pointArr = ((pointArr!==undefined && pointArr!=null) && Array.isArray(pointArr)) ? pointArr : new Array();

    },

    setByOL: function (openlayersLine) {
        /// <summary> 通过传入Openlayers的OpenLayers.Geometry类型来设置参数</summary>
        /// <param name="openlayersPoly" type="OpenLayers.Geometry">由Openlayers定义的折线</param>
        // var len = openlayersLine.components[0].components.length;
        var len = openlayersLine.components.length;
        var i;
        for (i = 0; i < len; i++) {
            this.pointArr[i] = new Zondy.Object.Point2D(openlayersLine.components[i].x, openlayersLine.components[i].y);
        }
    },

    toString: function () {
        /// <summary>返回一个字符串来表示该折线</summary>
        if (this.pointArr == null || this.pointArr.length == 0)
            return "";
        var i;
        var str = "";
        for (i = 0; i < this.pointArr.length; i++) {
            str += this.pointArr[i].x + ',' + this.pointArr[i].y + ",";
        }
        return str.substring(0, str.length - 1);
    },

    getGeometryType: function () {
        /// <summary>获取几何类型名称</summary>
        return "Line";
    }

  });
﻿/*Zondy.Object.Rectangle---------------------------------------------------------------------------------------------------------
* 矩形几何对象
*/
ZondyLeaflet.Rectangle = ZondyLeaflet.Tangram.extend({
    /// <summary>表示一个矩形</summary>

    xmin: 0.0,

    xmax: 0.0,

    ymin: 0.0,

    ymax: 0.0,
    initialize: function (xmin,ymin, xmax,ymax, opt_options) {
         /// <summary>构造函数</summary>
            this.xmin = xmin;
            this.xmax = xmax;
            this.ymin = ymin;
            this.ymax = ymax;

    },
    setByOL: function (openlayersRect) {
        /// <summary>使用一个由Openlayers定义的矩形来构造本对象</summary>
        /// <param name="openlayersRect" type="OpenLayers.Geometry.Polygon">由OpenLayers定义的矩形对象</param>
        this.xmin = openlayersRect.components[0].components[3].x;
        this.ymin = openlayersRect.components[0].components[3].y;
        this.xmax = openlayersRect.components[0].components[1].x;
        this.ymax = openlayersRect.components[0].components[1].y;
    },

    toString: function () {
        /// <summary>返回一个字符串来表示此矩形</summary>
        return "" + this.xmin + ',' + this.ymin + ',' + this.xmax + ',' + this.ymax;
    },

    getGeometryType: function () {
        /// <summary>获取几何类型名称</summary>
        return "Rect";
    },

    convertToBound: function () {
        /// <summary>将本对象转换为一个OpenLayers.Bound对象</summary>
        /// <returns type="OpenLayers.Bound" />
        //var bounds = new OpenLayers.Bounds(this.xmin, this.ymin, this.ymax, this.xmax);
        var bounds = [this.xmin, this.ymin, this.ymax, this.xmax];
        return bounds;
    }
    

  });


﻿/*Zondy.Object.Polygon---------------------------------------------------------------------------------------------------------
* 多边形几何对象
*/
ZondyLeaflet.Polygon = ZondyLeaflet.Tangram.extend({
    /// <summary>Array ,Zondy.Object.Point2D in an Array</summary>
    pointArr: null,
    initialize: function (pointArr) {
         /// <summary>构造函数</summary>
        /// <param name="pointArr" type="Array,Zondy.Object.Point2D in an Array">一组点类型</param>
        this.pointArr = new Array();
        if (pointArr != undefined) {
            this.pointArr = pointArr;
        }

    },
    setByOL: function (openlayersPoly) {
        if (openlayersPoly!==undefined && openlayersPoly!=null) {
            var linering = openlayersPoly.getLinearRing(0);
            var pointArr = linering.getCoordinates();
            var len = pointArr.length;
            for (var i = 0; i < len; i++) {
                this.pointArr[i] = new Zondy.Object.Point2D(pointArr[i][0], pointArr[i][1]);
            }
         }
    },

    toString: function () {
         if (this.pointArr == null || this.pointArr.length == 0) {
            return "";
        }
        var str = "";
        for (var i = 0; i < this.pointArr.length; i++) {
            str += this.pointArr[i].x + ',' + this.pointArr[i].y + ',';
        }
        return str.substring(0, str.length - 1);

        },

    getGeometryType: function () {
        /// <summary>获取几何类型名称</summary>
        return "Polygon";
    }

  });


  /*Zondy.Object.Polygon---------------------------------------------------------------------------------------------------------
* 多边形几何对象
*/

ZondyLeaflet.MultiPolygon = ZondyLeaflet.Tangram.extend({
    /// <summary>Array ,Zondy.Object.Point2D in an Array</summary>
    pointArr: null,
    /// <summary>多多边形几何对象构造函数</summary>
    /// <param name="polygonArr" type="Zondy.Object.Polygon in an Array">
    /// 多边形数组
    /// </param>
    initialize: function (polygonArr) {
        this.polygonArr = ((polygonArr !== undefined && polygonArr != null) && Array.isArray(polygonArr)) ? polygonArr : new Array();

    },
    setByOL: function (openlayersPoly) {
        if (openlayersPoly!==undefined && openlayersPoly!=null) {
            var linering = openlayersPoly.getLinearRing(0);
            var pointArr = linering.getCoordinates();
            var len = pointArr.length;
            for (var i = 0; i < len; i++) {
                this.pointArr[i] = new Zondy.Object.Point2D(pointArr[i][0], pointArr[i][1]);
            }
         }
    },

    toString: function () {
        if (this.polygonArr === undefined || this.polygonArr == null || this.polygonArr.length == 0)
            return "";
            var str = "";
            for (var i = 0; i < this.polygonArr.length; i++) {
                str += this.polygonArr[i].toString() + ";";
            }
            return str.substring(0, str.length - 1);
        },

    getGeometryType: function () {
        /// <summary>获取几何类型名称</summary>
        return "MultiPolygon";
    }

  });

/***/ }),
/* 5 */
/***/ (function(module, exports) {

﻿ZondyLeaflet.Layers.Doc = L.NonTiledLayer.extend({

    defaultOptions: {
        //取图的图层设置
        layers: '',
        //图片的格式，取值：jpg|png|gif
        f: 'png',
        //用户指定的图层过滤条件
        filters: null,
        //显示参数，指整个地图文档的显示参数
        style: null,
        //投影参数设置
        proj: null,
        //地图文档唯一标识
        guid: L.Util.newGuid()
    },

    options: {
        crs: null,
        pane: "tilePane",
        opacity: 1,
        uppercase: false
    },

    initialize: function (name, options) { // (String, Object)
        options = L.extend({}, options);
        if (!L.Util.isNull(options)) {
            for (var p in this.defaultOptions) {
                if (!L.Util.isNull(options[p])) {
                    this.defaultOptions[p] = options[p];
                    delete options[p];
                }
            }
        }
        this._ip = !L.Util.isNull(options.ip) ? options.ip : "127.0.0.1";
        this._port = !L.Util.isNull(options.port) ? options.port : "6163";
        this._baseUrl = "http://" + this._ip + ":" + this._port + "/igs/rest/mrms/";
        this._layerName = name;
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;
        this._crs = this.options.crs || map.options.crs;
        L.NonTiledLayer.prototype.onAdd.call(this, map);
    },

    getImageUrl: function (bounds, width, height) {

        var nw = this._crs.project(bounds.getNorthWest());
        var se = this._crs.project(bounds.getSouthEast());
        var url = this._wmsUrl;

        var bbox = bbox = [nw.x, se.y, se.x, nw.y].join(',');

        var params = {
            w: width,
            h: height,
            bbox: bbox
        };
        this.defaultOptions["style"] =!L.Util.isNull(this.defaultOptions["style"])? L.Util.toJSON(style, ["_initHooksCalled", "_initHooks"], null, true):null;
        var formatParam = {};
        //过滤为null的参数
        for (var i in this.defaultOptions) {
            if (this.defaultOptions[i] != null) {
                formatParam[i] = this.defaultOptions[i];
            }
        };

        this._url = this._baseUrl + "docs/" + this._layerName + L.Util.getParamString(L.Util.extend({}, formatParam, params));
        return this._url;
    },

    setParams: function (params, noRedraw) {

        L.extend(this.wmsParams, params);

        if (!noRedraw) {
            this.redraw();
        }

        return this;
    },
    //    redraw: function () {
    //        this.redraw();
    //    },
    /**
    * Source for MapGIS servers 
    * 设置地图文档图层显示，隐藏，追加和删除等情况
    * opt_filters 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
    * 以“，”分隔,
    * 如：1:ID>4,3:ID>1
    * 如：1:面积>920
    * 如：1:name='中华人民共和国'
    * 如：FIRST_FIRS='Asia'
    */
    setFilters: function (filters) {
        this.defaultOptions["filters"] = filters;
        this.redraw();
    },

    /**
    * 仅仅显示指定了图层序号的图层
    * 如0,1,2以“，”分隔
    */
    setShowLayers: function (layers) {
        if (layers != null && layers != "") {
            this.defaultOptions["layers"] = "show:" + layers;
            this.redraw();
        }
    },
    /**
    * 显示除hide参数指定图层外所有的图层
    * 如0,1,2以“，”分隔
    */
    setHideLayers: function (layers) {
        if (layers != null && layers != "") {
            this.defaultOptions["layers"] = "hide:" + layers;
            this.redraw();
        }
    },
    /**
    * 将设置过Exclude不可见的图层的显示状态变为可见
    * 除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层。
    * 如0,1,2以“，”分隔
    * 一般若是设置某个图层可见不可见，建议使用setIncludeLayers和setExcludeLayers方法
    */
    setIncludeLayers: function (layers) {
        if (layers != null && layers != "") {
            this.defaultOptions["layers"] = "include:" + layers;
            this.redraw();
        }
    },
    /**
    * 从默认图层列表里删除这些被指定的图层后，进行显示
    * 如:0,1,2以“，”分隔
    * 一般若是设置某个图层可见不可见，建议使用setIncludeLayers和setExcludeLayers方法
    */
    setExcludeLayers: function (layers) {
        if (layers != null && layers != "") {
            this.defaultOptions["layers"] = "exclude:" + layers;
            this.redraw();
        }
    },
    /**
    * @public
    * @type {Zondy.Object.CDisplayStyle}
    * 显示参数
    */
    setStyle: function (style) {
        if (style != null) {
            this.defaultOptions["style"] = L.Util.toJSON(style, ["_initHooksCalled", "_initHooks"], null, true);
            this.redraw();
        }
    },
    /**
    *设置地图文档唯一标识id
    */
    setGuid: function (guid) {
        if (guid != null && L.Util.trim(guid) != "") {
            this.defaultOptions["guid"] = L.Util.trim(guid);
        }
    },
    /**
    * 获取地图文档唯一标识id
    */
    getGuid: function () {
        return this.defaultOptions["guid"];
    },
    fitBounds: function (options) {
        var info_url = this._baseUrl + "info/" + this._layerName + "?f=json";
        var params = { url: info_url, success: this._callback.bind(this), fail: this._errback.bind(this), type: "GET" };
        L.extend(params, options);
        L.ajax(params);
    },

    _callback: function (data) {
        
        if (data != null) {
            var obj = JSON.parse(data);
            console.log([obj.xMin, obj.yMin], [obj.xMax, obj.yMax]);
            if (obj != null && obj.xMin != null && (obj.xMin != obj.xMax)) {
                this._map.fitBounds([
                        [obj.yMin, obj.xMin],
                        [obj.yMax, obj.xMax]
                    ]);
            }
        }
    },
    _errback: function (err) {
        return null;
    }
});


ZondyLeaflet.doc = ZondyLeaflet.Layers.Doc;

ZondyLeaflet.Layers.doc = function (name, options) {
    return new ZondyLeaflet.Layers.Doc(name, options);
};

ZondyLeaflet.doc = function (name, options) {
    return new ZondyLeaflet.Layers.Doc(name, options);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

﻿ZondyLeaflet.Layers.VectorLayer = L.NonTiledLayer.extend({
    defaultOptions: {
        gdbps: null,
        //图片的格式，取值：jpg|png|gif
        f: 'png',
        //用户指定的图层过滤条件
        filters: null,
        //显示参数，指整个地图文档的显示参数
        style: null,
        //地图文档唯一标识
        guid: L.Util.newGuid()
    },

    options: {
        crs: null,
        pane: "tilePane",
        opacity: 1,
        uppercase: false
    },

    initialize: function (gdbps, options) { // (String, Object)
        options = L.extend({}, options);
        if (!L.Util.isNull(options)) {
            for (var p in this.defaultOptions) {
                if (!L.Util.isNull(options[p])) {
                    this.defaultOptions[p] = options[p];
                    delete options[p];
                }
            }
        }
        this._ip = !L.Util.isNull(options.ip) ? options.ip : "127.0.0.1";
        this._port = !L.Util.isNull(options.port) ? options.port : "6163";
        this._baseUrl = "http://" + this._ip + ":" + this._port + "/igs/rest/mrms/layers";
        this._gdbps = gdbps;
        if (!L.Util.isNull(gdbps) != null) {
            this.defaultOptions.gdbps = gdbps.join(',');
        }
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;
        this._crs = this.options.crs || map.options.crs;
        L.NonTiledLayer.prototype.onAdd.call(this, map);
    },

    getImageUrl: function (bounds, width, height) {

        var nw = this._crs.project(bounds.getNorthWest());
        var se = this._crs.project(bounds.getSouthEast());
        var url = this._wmsUrl;

        var bbox = bbox = [nw.x, se.y, se.x, nw.y].join(',');

        var params = {
            w: width,
            h: height,
            bbox: bbox
        };
        var formatParam = {};
        //过滤为null的参数
        for (var i in this.defaultOptions) {
            if (this.defaultOptions[i] != null) {
                formatParam[i] = this.defaultOptions[i];
            }
        };

        this._url = this._baseUrl + L.Util.getParamString(L.Util.extend({}, formatParam, params));
        return this._url;
    },

    setParams: function (params, noRedraw) {

        L.extend(this.wmsParams, params);

        if (!noRedraw) {
            this.redraw();
        }

        return this;
    },
    /**
    * Source for MapGIS servers 
    * 设置地图文档图层显示，隐藏，追加和删除等情况
    * opt_filters 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
    * 以“，”分隔,
    * 如：1:ID>4,3:ID>1
    * 如：1:面积>920
    * 如：1:name='中华人民共和国'
    * 如：FIRST_FIRS='Asia'
    */
    setFilters: function (filters) {
        this.defaultOptions["filters"] = filters;
        this.redraw();
    },

    /**
    * @public
    * @type {Zondy.Object.CDisplayStyle}
    * 显示参数
    */
    setStyle: function (style) {
        if (style != null) {
            this.defaultOptions["style"] = L.toJSON(style, ["_initHooksCalled", "_initHooks"], null, true);
            this.redraw();
        }
    },
    /**
    *设置地图文档唯一标识id
    */
    setGuid: function (guid) {
        if (guid != null && L.Util.trim(guid) != "") {
            this.defaultOptions["guid"] = L.Util.trim(guid);
        }
    },
    /**
    * 获取地图文档唯一标识id
    */
    getGuid: function () {
        return this.defaultOptions["guid"];
    },
    fitBounds: function (options) {
        var layerIndex = 0;
        if (L.Util.isNull(options)||L.Util.isNull(options.layerIndex)) {
            layerIndex = 0;
        }
        if (L.Util.isNull(this._gdbps)) {
            console.log("图层路径不能为空!");
            return;
        }
        var info_url = "http://" + this._ip + ":" + this._port + "/igs/rest/mrcs/layerinfo?f=json&gdbpUrl=" + this._gdbps[layerIndex];
        var params = { url: info_url, success: this._callback.bind(this), fail: this._errback.bind(this), type: "GET" };
        L.extend(params, options);
        L.ajax(params);
    },

    _callback: function (data) {
        if (data != null) {
            var obj = JSON.parse(data);
            console.log([obj.xMin, obj.yMin], [obj.xMax, obj.yMax]);
            if (obj != null && obj.Range && obj.Range.xmin != null && (obj.Range.xmin != obj.Range.xmax)) {
                this._map.fitBounds([
                        [obj.Range.ymin, obj.Range.xmin],
                        [obj.Range.ymax, obj.Range.xmax]
                    ]);
            }
        }
    },
    _errback: function (err) {
        return null;
    }
});


//ZondyLeaflet.Layers.Doc
ZondyLeaflet.vectorLayer = ZondyLeaflet.Layers.VectorLayer;

ZondyLeaflet.Layers.vectorLayer = function (name, options) {
    return new ZondyLeaflet.Layers.VectorLayer(name, options);
};

ZondyLeaflet.vectorLayer = function (name, options) {
    return new ZondyLeaflet.Layers.VectorLayer(name, options);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

ZondyLeaflet.Layers.TileInfo = L.Class.extend({
    defalutTileInfo: {
        ip: "127.0.0.1",
        port: "6163"
    },
    initialize: function (name, opt_options) {
        var options = (opt_options !== undefined) ? opt_options : {};
        this.defalutTileInfo["name"] = name;
        for (var i in options) {
            this.defalutTileInfo[i] = options[i];
        }

    },
    getTileInfo: function (callback, errback, options) {
        var url = "http://" + this.defalutTileInfo.ip + ":" + this.defalutTileInfo.port + "/igs/rest/mrms/info/" + this.defalutTileInfo.name + "?f=json";
        var version = "2.0";
        if (this.defalutTileInfo.version != undefined && this.defalutTileInfo.version != null) {
            version = this.defalutTileInfo.version;
        }
        url = url + "&v=" + version;
        this.callback = callback;
        this.errback = errback;
        var params = { url: url, success: this._callback.bind(this), fail: this._errback.bind(this), type: "GET" };
        L.extend(params, options);
        L.ajax(params);

    },
    _callback: function (data) {
        var tileInfo = JSON.parse(data);
        tileInfo.ip = this.defalutTileInfo["ip"];
        tileInfo.port = this.defalutTileInfo["port"];
        tileInfo.latLngBounds = new L.LatLngBounds(new L.LatLng(tileInfo.yMin, tileInfo.xMin), new L.LatLng(tileInfo.yMax, tileInfo.xMax));
        tileInfo.center = L.latLng((tileInfo.yMax + tileInfo.yMin) / 2, (tileInfo.xMax + tileInfo.xMin) / 2);
        this.callback(tileInfo);

    },
    _errback: function (err) {
        alert("请求瓦片元数据信息失败，请检查服务或地址！");
    }
});

ZondyLeaflet.tileInfo = ZondyLeaflet.Layers.TileInfo;

ZondyLeaflet.Layers.tileInfo = function (name, options) {
    return new ZondyLeaflet.Layers.TileInfo(name, options);
};

ZondyLeaflet.tileInfo = function (name, options) {
    return new ZondyLeaflet.Layers.TileInfo(name, options);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

ZondyLeaflet.Layers.TileLayer = L.TileLayer.extend({
    //判断是否需要内部请求GetCapalities（内部使用）
    _isRequestInfo: false,
    initialize: function (opt_name, options) { // (String, Object)
        options = L.extend({}, options);
        if (typeof opt_name === 'object') {
            if (!L.Util.isNull(options)) {
                opt_name = L.obj.assign(opt_name, options);
            }
            options = opt_name;
            this._tileName = options.name;
        } else {
            this._tileName = opt_name;
            this._isRequestInfo = true;
        }
        this._ip = !L.Util.isNull(options.ip) ? options.ip : "127.0.0.1";
        this._port = !L.Util.isNull(options.port) ? options.port : "6163";
        this.opt_options = options;
        if (!L.Util.isNull(this.opt_options.tileWidth)) {
            this.opt_options.tileSize = this.opt_options.tileWidth;
        }
        //判断是否前端是否设置了zoomOffset的参数
        if (!L.Util.isNull(options.zoomOffset)) {
            this._isZoomOffset = true;
        }
        L.setOptions(this, this.opt_options);
        //是否开启超出当前服务级数时使用缓存图片
        //public
        this.isNativeZoom = this.opt_options.isNativeZoom != undefined ? this.opt_options.isNativeZoom : true;
    },

//    beforeAdd: function (map) {
//        map._addZoomLimit(this);
//    },

    onAdd: function (map) {
        this._map = map;
        if (this._isRequestInfo) {
            var async = this.opt_options.async ? this.opt_options.async : true;
            var param = { ip: this._ip, port: this._port, async: async };
            if (this.opt_options.proxy) {
                param.proxy = this.opt_options.proxy;
            }
            var tileInfo = new L.zondy.tileInfo(this._tileName, param);
            tileInfo.getTileInfo(this._callback.bind(this), this._fail.bind(this));
        } else {
            this.setDisplayBounds();
            L.TileLayer.prototype.onAdd.call(this, map);
            this.setMinMaxNativeZoom();
        }

    },
    _callback: function (data) {

        this.opt_options = L.extend(data, this.opt_options);
        this.setDisplayBounds();

        L.TileLayer.prototype.onAdd.call(this, map);
        if (!L.Util.isNull(this.loadTileInfo)) {
            this.fitBounds();
        }
        this.setMinMaxNativeZoom();

    },
    _fail: function (e) {
        alert("获取瓦片数据信息失败!");
    },
    /**
    *设置服务需要取缓存的最小级数或最大级数
    */
    setMinMaxNativeZoom: function () {
        if (this.isNativeZoom && !L.Util.isNull(this.opt_options.startLevel) && !L.Util.isNull(this.opt_options.endLevel)) {
           // this.options.minNativeZoom = this.opt_options.startLevel; //minZoomOffset
            var minZoomOffset = this._map.getMapZoomByResolution(this.opt_options.resolutions[this.opt_options.startLevel]);
            if (minZoomOffset != -1) {
                this.options.minNativeZoom = minZoomOffset; //minZoomOffset
            }
            this.options.minZoom = this.opt_options.minZoom != undefined ? this.opt_options.minZoom : this._map.getMinZoom();
            //this.options.maxNativeZoom = this.opt_options.endLevel; //minZoomOffset
            var maxZoomOffset = this._map.getMapZoomByResolution(this.opt_options.resolutions[this.opt_options.endLevel]);
            if (maxZoomOffset != -1) {
                this.options.maxNativeZoom =  maxZoomOffset; //minZoomOffset
            }
            this.options.maxZoom = this.opt_options.maxZoom != undefined ? this.opt_options.maxZoom : this._map.getMaxZoom();

        }
    },
    setDisplayBounds: function (bounds) {
        if (bounds) {
            this.options.bounds = bounds;
        } else {
            if (this.opt_options.latLngBounds) {
                this.options.bounds = this.opt_options.latLngBounds;
            }
        }
    },
    getTileUrl: function (tilePoint, zoom) { // (Point, Number) -> String
        var map = this._map;
        crs = map.options.crs;

        var zoomIndex = tilePoint.z;
        if (this._isZoomOffset) {
            zoomIndex = tilePoint.z + this.opt_options.zoomOffset;
        } else {
            if (!L.Util.isNull(this.opt_options.resolutions)) {
                var nearLayerZoom = this._map.getNearestZoom(this.opt_options.resolutions, tilePoint.z);
                if (nearLayerZoom == tilePoint.z) {
                    zoomIndex = nearLayerZoom;
                } else {
                    if (nearLayerZoom >= 0) {
                        zoomIndex = nearLayerZoom;
                    }
                }
            }
        }

        var row = tilePoint.y;
        if (this.opt_options.originType.toLowerCase() != "lefttop" && this.opt_options.originType.toLowerCase() != "lefttop_tianditu") {
            row = -(tilePoint.y + 1);
            if (tilePoint.x < 0 || tilePoint.x >= Math.pow(2, tilePoint.z) || row >= Math.pow(2, tilePoint.z) || row < 0) {
                return false;
            }
        }
        var urlTemplate = 'http://' + this._ip + ':' + this._port + '/igs/rest/mrms/tile/' + this._tileName + '/' + zoomIndex + '/' + row + '/' + tilePoint.x;

        return urlTemplate;
    },

    setParams: function (params, noRedraw) {
        L.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    },
    fitBounds: function () {
        if (!L.Util.isNull(this.opt_options) && !L.Util.isNull(this.opt_options.latLngBounds)) {
            this._map.fitBounds(this.opt_options.latLngBounds);
        } else {
            this.loadTileInfo = true;
        }
    }
});

//ZondyLeaflet.Layers.Doc
ZondyLeaflet.tileLayer = ZondyLeaflet.Layers.TileLayer;

ZondyLeaflet.Layers.tileLayer = function (name, options) {
    return new ZondyLeaflet.Layers.TileLayer(name, options);
};

ZondyLeaflet.tileLayer = function (name, options) {
    return new ZondyLeaflet.Layers.TileLayer(name, options);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

//===================================================解析数据===============================================================
/*
* L.GeoJSON turns any GeoJSON data into a Leaflet layer.
*/
ZondyLeaflet.FeatureJSON = L.Class.extend({
    defaultStyle: {
        clickable: false,
        color: "#FF0000",
        dashArray: null,
        fill: true,
        fillColor: null,
        fillOpacity: 0.2,
        lineCap: null,
        lineJoin: null,
        noClip: false,
        opacity: 0.5,
        smoothFactor: 1,
        stroke: true,
        weight: 2
    },

    initialize: function () {

    },
    read: function (json, opt_options) {
        var options = (opt_options !== undefined) ? opt_options : {};
        this.featureLayer = options.layer != undefined ? options.layer : new L.FeatureGroup();
        this.style = options.style != undefined ? options.style : this.defaultStyle;
        this.markerStyle = options.markerStyle != undefined ? options.markerStyle : null;
        if (json === undefined) {
            return null;
        }
        var obj = null;
        if (typeof json === 'string') {
            obj = JSON.parse(json);
        } else {
            obj = json;
        }
        if (obj !== null) {
            return this.parseVectors(obj);
        }
    },

    parseVectors: function (zfeatureset) {
        // an array of OpenLayers.Feature.Vector
        if (zfeatureset === undefined || zfeatureset.SFEleArray === undefined) {
            return null;
        }
        if (zfeatureset.SFEleArray.length == 0) {
            return null;
        }
        var results = new Array();
        for (var i = 0, len = zfeatureset.SFEleArray.length; i < len; i++) {
            var zfeature = zfeatureset.SFEleArray[i];
            var attribute = this.parseAttribute(zfeatureset.AttStruct, zfeature.AttValue);
            var layer = this.parseGeometry(zfeature.fGeom, zfeature.ftype);
            //var vector = new OpenLayers.Feature.Vector(geometry, attribute, null);
            //var feature = new ol.Feature();
            // layer.setGeometry(geometry);
            // layer.gid(zfeature.FID.toString());
            // layer.properties = attribute;
            results[i] = layer;

            layer.feature = {
                type: 'Feature',
                fid: zfeature.FID.toString(),
                properties: attribute
                // geometry: geoJSON
            };

            this.featureLayer.addLayer(layer);
        }
        return this.featureLayer;
    },
    parseBound: function (zBound) {
        if (zBound === undefined) {
            return null;
        }
        var result = [zBound.xmin, zBound.ymin, zBound.xmax, zBound.ymax];
        return result;
    },
    parseAttribute: function (attstruct, attvalue) {
        if (attstruct === undefined || attvalue === undefined) {
            return null;
        }
        if (attstruct.FldName.length != attvalue.length) {
            return null;
        }
        var attributes = new Object();
        for (var i = 0, len = attstruct.FldName.length; i < len; i++) {
            //attributes.set(attstruct.FldName[i], attvalue[i]);
            attributes[attstruct.FldName[i]] = attvalue[i];
        };
        return attributes;
    },
    parseGeometry: function (fGeom, type) {
        var result = null;
        if (type == "Unknow") {
            if (fGeom.PntGeom.length > 0) {
                type = 1;
            }
            else if (fGeom.LinGeom.length > 0) {
                type = 2;
            } else {
                type = 3;
            }
        }

        switch (type) {
            case 1:
                result = this.parseGPoint(fGeom.PntGeom);
                break;
            case 2:
                // if the obj is type of Line
                result = this.parseGLine(fGeom.LinGeom);
                break;
            case 3:
                // if the obj is type of Region
                result = this.parseGRegion(fGeom.RegGeom);
                break;
        }
        return result;
    },
    parseGRegion: function (gRegions) {
        if (gRegions === undefined || gRegions.length === undefined || gRegions.length == 0) {
            return null;
        }

        var m = 0;
        var results = new Array();
        for (var i = 0; i < gRegions.length; i++) {
            var specifiedGRegion = gRegions[i];
            if (specifiedGRegion === undefined || specifiedGRegion.Rings === undefined) {
                return null;
            }
            var specifiedGRegionLength = specifiedGRegion.Rings.length;
            for (var j = 0, len = specifiedGRegionLength; j < len; j++) {
                var zondyAnyLine = specifiedGRegion.Rings[j];
                var points = new Array();
                var zondyDots = zondyAnyLine.Arcs[0].Dots;
                for (var k = 0, zLen = zondyDots.length; k < zLen; k++) {
                    points[k] = new L.LatLng(zondyDots[k].y, zondyDots[k].x);
                }
                results[m++] = points;
            }
        }
        return new L.Polygon(results, this.style);
    },
    parseGLine: function (glines) {
        if (glines === undefined || glines.length === undefined || glines.length == 0) {
            return null;
        }
        var glinesLength;
        var results = []; // an array of ol.geom.LineString;
        if (!glines)
            return null;
        glinesLength = glines.length;
        if (glinesLength === 0)
            return null;
        for (var i = 0, len = glines.length; i < len; i++) {
            var points = new Array();
            var zondyDots = glines[i].Line.Arcs[0].Dots;
            for (var j = 0, dLen = zondyDots.length; j < dLen; j++) {
                //points[j] = [zondyDots[j].x, zondyDots[j].y];
                points[j] = new L.LatLng(zondyDots[j].y, zondyDots[j].x);
            }
            results[i] = points;
        }
        if (this.style != null) {
            this.style.fill = false;
        }
        var mulLineString = new L.Polyline(results, this.style);
        // var mulLineString = new ol.geom.MultiLineString(results);

        return mulLineString;
    },
    parseGPoint: function (gpoint) {
        if (gpoint === undefined || gpoint.length === undefined || gpoint.length == 0) {
            return null;
        }
        var points = [];
        var dot = null;
        for (var i = 0, len = gpoint.length; i < len; i++) {
            dot = gpoint[i].Dot;
            //points[i] = new ol.geom.Point([dot.x, dot.y], ol.geom.GeometryLayout.XY);
            latlng = new L.LatLng(dot.y, dot.x);
            points.push(new L.Marker(latlng, this.markerStyle));
        }
        var result = new L.FeatureGroup(points);
        return result;

    }

});

ZondyLeaflet.featureJSON = function () {
    return new ZondyLeaflet.FeatureJSON();
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
* Class: Zondy.Service.QueryFeatureRule
* 要素查询规则基类
*/
ZondyLeaflet.QueryFeatureRule = ZondyLeaflet.ZondyClass.extend({
    initialize: function (opt_options) { // (HTMLElement or String, Object)
        var options = (opt_options !== undefined) ? opt_options : {};
        /**
        *  是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集
        *  {Bool}
        **/
        this.CompareRectOnly = (options.CompareRectOnly !== undefined && (typeof (options.CompareRectOnly) == "boolean")) ? options.CompareRectOnly : false;

        /**
        *  是否将要素的可见性计算在内
        *  {Bool}
        **/
        this.EnableDisplayCondition = (options.EnableDisplayCondition !== undefined && (typeof (options.EnableDisplayCondition) == "boolean")) ? options.EnableDisplayCondition : false;

        /**
        *  是否完全包含
        *  {Bool}
        **/
        this.MustInside = (options.MustInside !== undefined && (typeof (options.MustInside) == "boolean")) ? options.MustInside : false;

        /**
        *  是否相交
        *  {Bool}
        **/
        this.Intersect = (options.Intersect !== undefined && (typeof (options.Intersect) == "boolean")) ? options.Intersect : true;

     }
});

/**
* Class: Zondy.Service.QueryParameterBase
* 查询参数基类
*/
ZondyLeaflet.QueryFeatureStruct = ZondyLeaflet.ZondyClass.extend({

    initialize: function (opt_options) { // (HTMLElement or String, Object)
        var options = (opt_options !== undefined) ? opt_options : {};
        /**
        *  是否包含属性值
        *  {Bool}
        **/
        this.IncludeAttribute = options.IncludeAttribute!==undefined && (typeof (options.IncludeAttribute) == "boolean") ? options.IncludeAttribute : true;

        /**
        *  是否包含几何图形信息
        *  {Bool}
        **/
        this.IncludeGeometry = options.IncludeGeometry!==undefined && (typeof (options.IncludeGeometry) == "boolean") ? options.IncludeGeometry : false;

        /**
        *  是否包含图形参数
        *  {Bool}
        **/
        this.IncludeWebGraphic = options.IncludeWebGraphic!==undefined && (typeof (options.IncludeWebGraphic) == "boolean") ? options.IncludeWebGraphic : false;
        }
});


/**
* Class: Zondy.Service.QueryParameterBase
* 查询参数基类
*/
ZondyLeaflet.QueryParameterBase = ZondyLeaflet.ZondyClass.extend({

    initialize: function (opt_options) { // (HTMLElement or String, Object)
        var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>用于查询的几何描述
        /// {Zondy.Object.Tangram}
        /// </summary>
        this.geometry = options.geometry!==undefined ? options.geometry : null;

        /// <summary>
        /// 条件查询的SQL语句,如果为空，则表示为单一的几何查询；
        ///  如果取值，表示为几何和条件混合查询
        ///  {String}
        ///</summary>
        this.where = options.where!==undefined ?options.where : null;

        /// <summary>几何查询的规则
        ///{Zondy.Service.QueryFeatureRule}
        ///</summary>
        this.rule = options.rule!==undefined ?options.rule : null;

        /// <summary>
        /// 需要查询的要素OID号，多个间用‘，’分隔
        /// 如果此参数有值，查询将默认转化为使用要素ID查询，而忽略条件查询
        ///</summary>
        this.objectIds = options.objectIds!==undefined ?options.objectIds : null;

        /// <summary>
        /// 分页号{Interger}
        ///</summary>
        this.pageIndex = options.pageIndex!==undefined ?options.pageIndex : 0;

        /// <summary>
        /// 每页记录数{Interger}
        ///</summary>
        this.pageCount = options.pageCount!==undefined ?options.pageCount : 20;

        /// <summary>
        /// 查询结果的序列化形式(json（默认值）|xml|kml|gml|georss，对于xml，kml，gml或者georss格式的类xml类型将以text文本返回，如需要可调用$.parseXML(text)得到其xml包装)
        /// {String}
        ///</summary>
        this.resultFormat = options.resultFormat!==undefined ?options.resultFormat : "json";

        /// <summary>
        /// 指定查询返回结果所包含的要素信息
        /// {Zondy.Service.QueryFeatureStruct}
        ///</summary>
        this.struct = options.struct!==undefined ?options.struct : new ZondyLeaflet.QueryFeatureStruct();

         /// <summary>
        /// 指定查询返回结果的排序字段
        /// {Zondy.Service.QueryFeatureStruct}
        ///</summary>
        this.orderField = options.orderField !== undefined ? options.orderField : null;

        /// <summary>
        /// 是否升序排列，与orderField配合使用
        /// {Zondy.Service.QueryFeatureStruct}
        ///</summary>
        this.isAsc = options.isAsc !== undefined ? options.isAsc : false;

        }
});
//**********************************************************Zondy.Service.QueryParameterBase(end)************************************************//


﻿/*ZondyLeaflet.CDisplayStyle--------------------------------------------------------------------------------------------------
* 地图文档显示样式对象
*/
ZondyLeaflet.QueryParameter = ZondyLeaflet.QueryParameterBase.extend({
   
	initialize : function(opt_options){ 
         ZondyLeaflet.QueryParameterBase.prototype.initialize.call(this, opt_options);
	},
    /// <summary>
    ///获取相关参数的REST-URL表示形式
    ///</summary>
    getParameterURL: function () {
        var paramUrl = "";
        if(this.geometry!=null){
            paramUrl += "geometry=" + this.geometry.toString();
            paramUrl += "&geometryType=" + this.geometry.getGeometryType();
        }
        paramUrl += "&page=" + this.pageIndex.toString();
        paramUrl += "&pageCount=" + this.pageCount.toString();
        paramUrl += "&f=" + this.resultFormat;

        if (this.struct != null) {
            paramUrl += "&structs=" +  this.struct.toJSON();
        }
        if (this.where != null) {
            paramUrl += "&where=" + this.where;
        }
        if (this.rule != null) {
            paramUrl += "&rule=" + this.rule.toJSON();
        }
        if (this.objectIds != null) {
            paramUrl += "&objectIds=" + this.objectIds;
        }
        if (this.orderField != null) {
            paramUrl += "&orderField=" + this.orderField;
        }
        if (this.isAsc != null) {
            paramUrl += "&isAsc=" + this.isAsc;
        }
        return paramUrl;
    },
    /// <summary>
    ///获取相关参数的Object形式,私有方法
    ///</summary>
    getParameterObject: function () {
        var obj = {};
        obj.f = this.resultFormat;
        if (this.struct != null) {
            obj.structs = this.struct.toJSON();
        }

        if (this.objectIds != null) {

            obj.objectIds = this.objectIds;
            return obj;
        };

        obj.page = this.pageIndex.toString();
        obj.pageCount = this.pageCount.toString();

        if (this.geometry != null) {
            obj.geometry = this.geometry.toString();
            obj.geometryType = this.geometry.getGeometryType();
        }
        if (this.where != null)
            obj.where = this.where;
        if (this.rule != null)
            obj.rule = this.rule.toJSON();
        if (this.orderField != null)
            obj.orderField = this.orderField;
        if (this.isAsc != null)
            obj.isAsc = this.isAsc;
        return obj;
    }
});



/*ZondyLeaflet.CDisplayStyle--------------------------------------------------------------------------------------------------
* 矢量图层查询对象
*/
ZondyLeaflet.QueryByLayerParameter = ZondyLeaflet.QueryParameter.extend({
   
	initialize : function(opt_options){ 
         var options = (opt_options !== undefined) ? opt_options : {};
         ZondyLeaflet.QueryParameterBase.prototype.initialize.call(this, options);
         this.gdbp = options.gdbp!==undefined ? encodeURI(options.gdbp) : null;
	},
    /// <summary>
    ///获取相关参数的REST-URL表示形式
    ///</summary>
    getParameterURL: function () {
          var paramUrl = ZondyLeaflet.QueryParameter.prototype.getParameterURL.apply(this);
          return paramUrl + "&gdbp=" + this.gdbp;
    },
    /// <summary>
    ///获取相关参数的Object形式,私有方法
    ///</summary>
    getParameterObject: function () {
        var obj = ZondyLeaflet.QueryParameter.prototype.getParameterObject.apply(this);
        obj.gdbp = this.gdbp;
        return obj;
    }
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

//===============================================================矢量地图文档及矢量图层查询===========================================================
/**
* 创建人：郑黎
* 创建时间：2017/10/12
* 功能描述：MapGIS矢量地图文档加载
*/

ZondyLeaflet.Service.QueryTask = L.Class.extend({
    initialize: function (opt_options) { // (HTMLElement or String, Object)
        var options = (opt_options !== undefined) ? opt_options : {};
        /// <summary>服务地址</summary>
        this.ip = (options.ip !== undefined) ? options.ip : "127.0.0.1";
        /// <summary>服务端口号</summary>
        this.port = (options.port !== undefined) ? options.port : "6163";
        //查询参数ZondyLeaflet.QueryParameter（矢量地图文档查询）或ZondyLeaflet.QueryByLayerParameter（矢量图层查询）
        this._queryParameter = (options.queryParameter !== undefined) ? options.queryParameter : null;
        //当为ZondyLeaflet.QueryParameter（矢量地图文档查询）时为必填参数
        this.name = (options.name !== undefined) ? options.name : null;
        this._type = (options.type !== undefined) ? options.type : "GET";
        ///当为ZondyLeaflet.QueryParameter（矢量地图文档查询）时为必填参数，要查询的图层索引号，多个图层以逗号隔开,如：0,1,2
        this._queryLayers = (options.queryLayers !== undefined) ? options.queryLayers : "0";
        //请求地址前缀{string}，只在用户修改了IGServer的基类服务才进行修改
        this._baseUrl = (options.baseUrl !== undefined) ? options.baseUrl : "/igs/rest/mrfs/";

    },
    execute: function (callback, errback) {
        this.callback = callback;
        this.errback = errback;
        this._getQueryUrl();
        if (this._type == "POST") {
            var queryObj = null;
            if (this._queryParameter != null) {
                queryObj = this._queryParameter.getParameterObject();
            }
            L.ajax({ url: this._url, success: this._callback.bind(this), fail: this._errback.bind(this), type: this._type, data: L.Util.toJSON(queryObj) });
        } else {
            if (this._queryParameter != null) {
                this._url = this._url + "?" + this._queryParameter.getParameterURL();
            }
            L.ajax({ url: this._url, success: this._callback.bind(this), fail: this._errback.bind(this), type: this._type });
        }

    },
    _getQueryUrl: function () {
        if (this._queryParameter instanceof ZondyLeaflet.QueryByLayerParameter) {
            //基于图层查询
            this._url = 'http://' + this.ip + ':' + this.port + this._baseUrl + 'layer/query';
        } else {
            this._url = 'http://' + this.ip + ':' + this.port + this._baseUrl + 'docs/' + this.name + '/0/' + this._queryLayers + '/query';
        }
    },
    _callback: function (data) {
        var geojsonData = data;
        if (this._queryParameter != null && this._queryParameter.resultFormat != null && this._queryParameter.resultFormat.toLowerCase() == "json") {
            geojsonData = JSON.parse(data);
        }
        this.callback(geojsonData);
    },
    _errback: function (err) {
        this.errback(err);
    }

});

//ZondyLeaflet.Layers.Doc
ZondyLeaflet.queryTask = ZondyLeaflet.Service.QueryTask;

ZondyLeaflet.Service.queryTask = function (name, options) {
    return new ZondyLeaflet.Service.QueryTask(name, options);
};

ZondyLeaflet.queryTask = function (name, options) {
    return new ZondyLeaflet.Service.QueryTask(name, options);
};

/***/ })
/******/ ]);
});
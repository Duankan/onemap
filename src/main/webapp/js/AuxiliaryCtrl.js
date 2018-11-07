/**
** create by luxiaolin
*/
(function () {
    ktw.App = ktw.App || {};
    var assistant = ktw.assistant = ktw.assistant || {};
    function GetRootPath() {
        var pathName = window.document.location.pathname;
        var localhost = window.location.host;
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return ("http://" + localhost + projectName + "/");
    }
    function GetServerPath() {
        if (ktw.assistant.Config.SystemTheme.IsDebug !== "false") {
            return ktw.GetSystemUrlByRelID("SysService");
        } else {
            return ktw.assistant.Root;
        }
    };
    function param(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function dealLayer(config) {
        //处理图层的引用
        //根据引用的id值从图层树的配置中查找图层的配置
        function searchLayerTree(layers, refid) {
            if (layers && !layers.length) layers = [layers];
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].ID == refid) {
                    return layers[i];
                } else if (layers[i].Children && layers[i].Children.MapLayer) {
                    var tmp = searchLayerTree(layers[i].Children.MapLayer, refid);
                    if (tmp) { return tmp; }
                }
            }
            return null;
        }
        for (var i = 0; i < config.Extend.Approve.Layer.length; i++) {
            if (config.Extend.Approve.Layer[i].Ref) {
                config.Extend.Approve.Layer[i] = $.extend({}, searchLayerTree(ktw.App.Config.SystemMap.ArrayOfMapLayer.MapLayer, config.Extend.Approve.Layer[i].Ref), config.Extend.Approve.Layer[i]);
            }
        }
        function getLayer(id) {
            for (var i = 0; i < approveconf.Layer.length; i++) {
                if (approveconf.Layer[i].ID == id) {
                    return approveconf.Layer[i];
                }
            }
        }
        layer_jbnt = getLayer("JBNT");
        layer_tdlygh = getLayer("TDLYZTGH");
        layer_tdlyxz = getLayer("TDLYXZ");
        layer_kq = getLayer("KQ");
        layer_dzd = getLayer("DZD");
        layer_cld = getLayer("CLD");
        layer_p = getLayer("P");
        layer_z = getLayer("Z");
        layer_c = getLayer("C");
        layer_g = getLayer("G");
        layer_y = getLayer("Y");
        layer_b = getLayer("B");
        layer_w = getLayer("W");
    }
    //分析的流程的guid,已存储到了一张图临时数据库
    var guid = param("guid");
    if (ktw.IsNull(guid)) guid = "402881245f6b2836015f6b290eeb0000";

    //分析的流程类型,如：规划管理、建设用地、土地储备、征地等
    var flowtype = param("flowtype");
    if (ktw.IsNull(flowtype)) flowtype = "GHGL";

    //分析的流程的名称，如：建设用地预审、建设用地报批、农村村民建房、建设用地预审
    var flowname = param("flowname");
    if (ktw.IsNull(flowname)) flowname = "JSYDYS";

    //分析的流程的节点，如：收件、领导审批
    var nodename = param("nodename");
    //if (ktw.IsNull(nodename)) nodename = "SJ";

    var style = {
        weight: 5,
        color: '#0099CC',
        fill: true,
        fillColor: '#FFFFFF',
        fillOpacity: 0.4
    };


    var initdatas = undefined;
    var conf = undefined;
    var approveconf = undefined;

    //基本农田
    var layer_jbnt = undefined;
    //土地利于总体规划
    var layer_tdlygh = undefined;
    //土地利用现状
    var layer_tdlyxz = undefined;
    //矿区
    var layer_kq = undefined;
    //地灾点
    var layer_dzd = undefined;
    //测量点
    var layer_cld = undefined;
    //批地图层
    var layer_p = undefined;
    //征地图层
    var layer_z = undefined;
    //储地图层
    var layer_c = undefined;
    //供地图层
    var layer_g = undefined;
    //用地图层
    var layer_y = undefined;
    //补地图层
    var layer_b = undefined;
    //查地图层
    var layer_w = undefined;


    //页面入口
    assistant.init = function (parameters) {
        if (ktw.IsNull(this.Config)) {
            var config = null;
            $.ajax({
                url: "../../config/app.xml",
                dataType: 'xml',
                type: 'GET',
                cache: false,
                timeout: 2000,
                async: false,
                error: function (xml) {
                    ktw.Alert("加载系统配置文件出错！");
                    console.error(arguments);
                },
                success: function (xml) {
                    config = $.xml2json(xml);
                }
            });
            ktw.App.Config = this.Config = config;
            approveconf = config.Extend.Approve;
            dealLayer(config);
            ktw.App.Root = this.Root = GetRootPath();
            ktw.App.ServerUrl = this.ServerUrl = GetServerPath();
            this.initLayerOut();
            this.initMap();//初始化地图
            this.initData(parameters);
            this.initModules();//初始化辅助审批模块
            //this.HighLight = new ktw.HighLight();//初始化高亮对象
            //ktw.App.InitMapSwitch();   //初始化地图切换工具
            //this.InitScaleLine();//初始化比例尺
            //this.InitMousePosition();   //初始化地图坐标显示  add by wlf 
        }
    }
    //初始化布局
    assistant.initLayerOut = function () {
        //var wid = document.body.clientWidth;
        //$("#map").width(wid * 0.6);
        //$("#contentau").width(wid * 0.4);
    }
    //初始化地图
    assistant.initMap = function () {
        //解析基础配置图层的服务地址
        if (this.Config.SystemMap.LayerInfo == "") {
            this.Config.SystemMap.LayerInfo = {};
            this.Config.SystemMap.LayerInfo.BaseLayers = [];
        }
        if (!this.Config.SystemMap.LayerInfo.BaseLayers || !this.Config.SystemMap.LayerInfo.BaseLayers.length) {
            this.Config.SystemMap.LayerInfo.BaseLayers = [this.Config.SystemMap.LayerInfo.BaseLayers];
        }
        for (var i = 0; i < this.Config.SystemMap.LayerInfo.BaseLayers.length; i++) {
            if (ktw.IsNull(this.Config.SystemMap.LayerInfo.BaseLayers[i].Url)) {
                continue;
            }
            var tmp = ktw.GetSystemUrlByRelID(this.Config.SystemMap.LayerInfo.BaseLayers[i].Url);
            this.Config.SystemMap.LayerInfo.BaseLayers[i].Url = tmp == "" ? this.Config.SystemMap.LayerInfo.BaseLayers[i].Url : tmp;
        }
        ktw.Project.InitProjectParam("../../config/coordinateSystem.json");
        var config = this.Config.SystemMap;
        var minZoom = parseInt(config.MinZoom);
        var maxZoom = parseInt(config.MaxZoom);
        var zoom = parseInt(this.Config.SystemMap.Zoom);
        var center = { lon: config.Center.split(",")[0], lat: config.Center.split(",")[1] };
        var map = ktw.assistant.map = ktw.App.Map = L.map('map', {
            center: center,
            zoom: zoom,
            minZoom: minZoom,//地图最小级数
            maxZoom: maxZoom,//地图最大级数
            attributionControl: false,
            zoomControl: false,
            crs: ktw.Project.GetCRSByCode(ktw.EPSG.split(":")[1])
        });
        ktw.MapLoad.InitMap($.extend({ Map: ktw.App.Map }, config));
        assistant.initSwitch();
        assistant.iniScaleLine();
        assistant.HighLight = new ktw.HighLight(map);

    }
    assistant.initModules = function () {
        $.ajax({
            url: ktw.App.ServerUrl + "flow/getModules",
            type: "post",
            data: { flowtype: $.trim(flowtype), flowname: $.trim(flowname), nodename: $.trim(nodename) },
            async: true,
            success: function (res) {
                if (res.success) {
                    var modules = (res.data || "").split(",");
                    for (var i = 0; i < modules.length; i++) {
                        if (assistant.modules[modules[i]] && assistant.modules[modules[i]].func) {
                            assistant.modules[modules[i]].func(i + 1);
                        }
                    }
                } else {
                    ktw.Error(res.message);
                }
            },
            error: function () {
                ktw.Error("网络错误");
                console.error(arguments);
            }
        });
    }
    assistant.initData = function getInitData(parameters) {
        //改从父页面接收数据
        initdatas = parameters.data;
        conf = parameters.conf;
        /* var config = null;
         $.ajax({
             url: ktw.App.ServerUrl + "asap/getInfobyid/" + guid,
             contentType: "application/json",
             type: 'GET',
             cache: false,
             timeout: 2000,
             async: false,
             error: function (json) {
                 console.error(json);
                 ktw.Error("加载数据出错!");
             },
             success: function (json) {
                 if (ktw.IsNull(json) || !json.success) return;
                 var data = json.data;
                 initdatas = data;
             }
         });
         */

    };
    //初始化统计图
    assistant.initCharts = function (data, type, legendarray, list) {
        if ("ygtj" == type) {
            var lyxzChart = echarts.init(document.getElementById('tdlyxzc'));
            var lyxzoption = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    bottom: 10,
                    data: legendarray,
                },
                series: [
                    {
                        name: '饼图',
                        type: 'pie',
                        radius: '60%',
                        selectedMode: 'single',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: data
                    }
                ]
            };

            var layers = {};
            lyxzChart.setOption(lyxzoption);
            lyxzChart.on('click', function (arg) {
                var rows = list[arg.name];
                if (layers[arg.name]) {
                    for (var _i = 0; _i < layers[arg.name].length; _i++) {
                        ktw.assistant.map.removeLayer(layers[arg.name][_i]);
                    }
                    layers[arg.name] = undefined;
                } else {
                    layers[arg.name] = [];
                    for (var ii = 0; ii < rows.length; ii++) {
                        var feature = rows[ii];
                        if (!feature.__hasTransform) {
                            feature = ktw.Project.Transform(layer_tdlyxz.EPSG, ktw.EPSG, feature);
                            feature.__hasTransform = true;
                        }
                        var layer = new L.GeoJSON().addTo(ktw.assistant.map);
                        layers[arg.name].push(layer);
                        layer.addData(feature);
                        layer.setStyle(style);
                        ktw.assistant.map.fitBounds(layer.getBounds(), {
                            animate: true,
                            duration: 1
                        });
                        var props = feature.properties;
                        var str = "<div style='overflow:auto;width:100%;height:100%;'>";
                        var t = 0;
                        for (var i in props) {
                            str += "<div class='con-row" + (t % 2 == 0 ? " color-row" : " color-row2") + "'><div class='con-title'>" + i + "</div><div class='con-content'>" + props[i] + "</div></div>";
                            t++;
                        }
                        str += "</div>";
                        layer.on('click', (function (str) {
                            return function () {
                                var ctr = new ktw.Window({
                                    ID: "mapblock",
                                    Title: "图斑信息",
                                    IconCls: "icon-Search2 ",
                                    Height: 400,
                                    Width: 500,
                                    Parent: $(document.body),
                                    IsMaximize: false,
                                    Top: (window.document.body.clientHeight - 500) / 2,
                                    Left: (window.document.body.clientWidth - 800) / 2,
                                    Maximizable: true,
                                    Minimizable: true,
                                    Draggable: true,
                                    Resizable: true,
                                    Content: str
                                });
                                ctr.Layout();
                            }
                        })(str), layer);
                    }
                }
            });
        }
        else if ("tcdj" == type) {
            var myChart = echarts.init(document.getElementById('chart'));

            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: legendarray,
                },
                series: [
                    {
                        name: '饼图',
                        type: 'pie',
                        radius: '50%',
                        selectedMode: 'single',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: data
                    }
                ]
            };
            var layers = {};
            myChart.setOption(option);
            myChart.on("click", function (arg) {
                var rows = list[arg.name];
                if (layers[arg.name]) {
                    for (var _i = 0; _i < layers[arg.name].length; _i++) {
                        ktw.assistant.map.removeLayer(layers[arg.name][_i]);
                    }
                    layers[arg.name] = undefined;
                } else {
                    layers[arg.name] = [];
                    for (var ii = 0; ii < rows.length; ii++) {
                        var feature = rows[ii];
                        if (!feature.__hasTransform) {
                            feature = ktw.Project.Transform(layer_p.EPSG, ktw.EPSG, feature);
                            feature.__hasTransform = true;
                        }
                        var layer = new L.GeoJSON().addTo(ktw.assistant.map);
                        layers[arg.name].push(layer);
                        layer.addData(feature);
                        layer.setStyle(style);
                        ktw.assistant.map.fitBounds(layer.getBounds(), {
                            animate: true,
                            duration: 1
                        });
                        var props = feature.properties;
                        var str = "<div style='overflow:auto;width:100%;height:100%;'>";
                        var t = 0;
                        for (var i in props) {
                            str += "<div class='con-row" + (t % 2 == 0 ? " color-row" : " color-row2") + "'><div class='con-title'>" + i + "</div><div class='con-content'>" + props[i] + "</div></div>";
                            t++;
                        }
                        str += "</div>";
                        layer.on('click', (function (str) {
                            return function () {
                                var ctr = new ktw.Window({
                                    ID: "mapblock",
                                    Title: "图斑信息",
                                    IconCls: "icon-Search2 ",
                                    Height: 400,
                                    Width: 500,
                                    Parent: $(document.body),
                                    IsMaximize: false,
                                    Top: (window.document.body.clientHeight - 500) / 2,
                                    Left: (window.document.body.clientWidth - 800) / 2,
                                    Maximizable: true,
                                    Minimizable: true,
                                    Draggable: true,
                                    Resizable: true,
                                    Content: str
                                });
                                ctr.Layout();
                            }
                        })(str), layer);
                    }
                }
            });
        }
    };

    var MapTypes = null;
    //初始化底图切换
    assistant.initSwitch = function () {
        var Config = this.Config.SystemMap;
        var SwitchWidth = ktw.IsNumber(Config.MapSwitchInfo.SwitchWidth) ? Config.MapSwitchInfo.SwitchWidth : 40;
        var SwitchHeight = ktw.IsNumber(Config.MapSwitchInfo.SwitchHeight) ? Config.MapSwitchInfo.SwitchHeight : 40;

        var parentTarget = $("#map");
        Target = $('<div class="MapSwitch" style="display: block; width: 30px; top: 10px; right: 10px"></div>');
        var types = [];
        var SwitchMaps = Enumerable.From(Config.MapSwitchInfo.SwitchMaps).OrderBy('s=>s.Order').ToArray();
        for (var i = 0; i < SwitchMaps.length; i++) {
            if (SwitchMaps[i].IsVisible != "true") continue;
            types.push(SwitchMaps[i].Type);
            var div = $('<div id="' + SwitchMaps[i].ID + '" class="MapSwitch-Single" style="width:' + (SwitchWidth) + 'px;height:' + (SwitchHeight) + 'px;right:' + (i === 0 ? 1 : i * (SwitchWidth)) + 'px;display:' + (i === 0 ? "block" : "none") + ';background-image:url(' + ktw.App.Root + SwitchMaps[i].BackImg + ');"></div>');
            div.css({ "border": "1px solid #979393" });
            div.mouseover(function () {
                var id = $(this).attr("id");
                if (id === SwitchMaps[0].ID) {
                    for (var j = 0; j < $(this).parent()[0].children.length; j++) $($(this).parent()[0].children[j]).css({ "display": "block" });
                }
                $("#" + id + "content").css({
                    "background-color": "#0000FF",
                    "opacity": "0.4",
                    "filter": "alpha(opacity:40)"
                });
                $(this).css({ "border": "1px solid #f3f5f6" });
            })
            .mouseleave(function () {
                var id = $(this).attr("id");
                $("#" + id + "content").css({
                    "background-color": "#000000",
                    "opacity": "0.3",
                    "filter": "alpha(opacity:30)"
                });
                $(this).css({ "border": "1px solid #979393" });
            }).click(function () {
                var id = $(this).attr("id");
                var currType = $("#" + id + "text").attr("tag");
                SetStyleByType(currType, SwitchMaps);
                SetLayersVisble(types, currType);
                Target.triggerHandler("onSwitch", currType);
            });
            var contentid = SwitchMaps[i].ID + "content";
            var divcontent = $('<div id="' + contentid + '" class="MapSwitch-ContentTip" style="margin-top:' + (SwitchHeight - 20) + 'px;"></div>');
            divcontent.appendTo(div);
            var textid = SwitchMaps[i].ID + "text";
            var divText = $('<span id="' + textid + '" style="font-size:12px;color:#fff" tag="' + SwitchMaps[i].Type + '">' + SwitchMaps[i].Text + '</span>');
            divText.appendTo(divcontent);
            div.appendTo(Target);
        }


        MapTypes = types;
        type = types[0];
        Target.mouseleave(function () {
            var childrens = $(this).children();
            for (var j = 0; j < childrens.length; j++) {
                if ($(childrens[j]).attr("id") === SwitchMaps[0].ID) continue;
                $(childrens[j]).css({ "display": "none" });
            }
            $(this).css({ width: SwitchWidth + "px" });
        });
        Target.mouseover(function () {
            $(this).css({ width: SwitchWidth + "px" });
        });


        Target.appendTo(parentTarget);

        function SetStyleByType(type, switchMaps) {
            if (MapTypes.indexOf(type) < 0) return;
            for (var i = 0; i < switchMaps.length; i++) {
                var id = switchMaps[i].ID;
                $("#" + id).css({ "background-image": 'url("' + ktw.App.Root + switchMaps[i].BackImg + '")' });
                $("#" + id + "text").html(switchMaps[i].Text);
                $("#" + id + "text").attr("tag", switchMaps[i].Type);
            }

            var selectid = type + "Map";
            var defaultid = switchMaps[0].ID;
            var selectMap = Enumerable.From($(switchMaps)).Where("s=>s.ID==='" + selectid + "'").ToArray();
            var defaultMap = switchMaps[0];
            var tembgimg = 'url("' + ktw.App.Root + defaultMap.BackImg + '")';
            var temtext = defaultMap.Text;
            var temptag = defaultMap.Type;
            $("#" + selectid).css({ "background-image": tembgimg });
            $("#" + selectid + "text").html(temtext);
            $("#" + selectid + "text").attr("tag", temptag);
            $("#" + defaultid).css({ "background-image": 'url("' + ktw.App.Root + selectMap[0].BackImg + '")' });
            $("#" + defaultid + "text").html(selectMap[0].Text);
            $("#" + defaultid + "text").attr("tag", selectMap[0].Type);
            Target.triggerHandler("onSwitch", type);
            type = type;
        };

        //设置图层是否显示
        function SetLayersVisble(types, currtype) {
            //首先判断有多少种
            if (ktw.IsNull(types) || types.length === 0 || ktw.IsNull(currtype)) return;
            //配置的所有底图
            var alllayers = ktw.assistant.Config.SystemMap.LayerInfo.BaseLayers;
            //排除掉了将要显示的地图
            var exceptCurrentLayers = [];
            //将要切换显示的地图,支持TypeEx属性设置多个切换值,以","分割
            var currlayers = [];
            for (var i = alllayers.length - 1; i >= 0; i--) {
                if (alllayers[i].TypeEx) {
                    var arr = alllayers[i].TypeEx.split(",");
                    if (arr.contains(currtype)) {
                        currlayers.push(alllayers[i]);
                        continue;
                    }
                }
                exceptCurrentLayers.push(alllayers[i]);
            }
            //将要切换关闭的地图
            var otherlayers = [];
            for (var i = 0; i < types.length; i++) {
                if (types[i] === currtype) continue;
                for (var j = 0; j < exceptCurrentLayers.length; j++) {
                    if (exceptCurrentLayers[j].TypeEx) {
                        var arr = exceptCurrentLayers[j].TypeEx.split(",");
                        if (arr.contains(types[i])) otherlayers.push(exceptCurrentLayers[j]);
                    }
                }
            }

            ktw.assistant.map.eachLayer(function (layer) {
                var tmpLayer;
                if (ktw.IsNull(layer.options) || ktw.IsNull(layer.options.id)) { return; }
                var temlayer = Enumerable.From(currlayers).Where('s=>s.ID==="' + layer.options.id + '"').ToArray();
                if (!ktw.IsNull(temlayer) && temlayer.length > 0) {
                    tmpLayer = layer;
                    tmpLayer.setVisible(true);
                }
                var temlayer1 = Enumerable.From(otherlayers).Where('s=>s.ID==="' + layer.options.id + '"').ToArray();
                if (!ktw.IsNull(temlayer1) && temlayer1.length > 0) {
                    tmpLayer = layer;
                    tmpLayer.setVisible(false);
                }
            });

        };
    }
    //初始化比例尺
    assistant.iniScaleLine = function () {
        L.control.scale({
            metric: true,
            imperial: false
        }).addTo(ktw.assistant.map);
    }

    //辅助审批各模块定义
    assistant.modules = (function () {
        return {
            "1": {
                name: "坐标定位",
                func: function () { }
            },
            "2": {
                name: "项目流程基本信息",
                func: function () { }
            },
            "3": {
                name: "检查坐标",
                func: function () { }
            },
            "4": {
                name: "面积校核",
                func: function () { }
            },
            "5": {
                name: "查重报批",
                func: function () { }
            },
            "6": {
                name: "是否符合土地利用总体规划",
                func: function () { }
            },
            "7": {
                name: "是否是城市规划圈内用地",
                func: function () { }
            },
            "8": {
                name: "是否压盖基本农田",
                func: function () { }
            },
            "9": {
                name: "土地利用现状压盖统计",
                func: function () { }
            },
            "10": {
                name: "是否压盖矿区",
                func: function () { }
            },
            "11": {
                name: "地质灾害点缓冲分析",
                func: function () { }
            },
            "12": {
                name: "压盖测量点分析",
                func: function () { }
            },
            "13": {
                name: "主项目信息（临时用地审批）",
                func: function () { }
            },
            "14": {
                name: "土地生命周期图层叠加",
                func: function () { }
            },
            "15": {
                name: "土地权属信息",
                func: function () { }
            },
            "16": {
                name: "补充耕地情况",
                func: function () { }
            },
            "17": {
                name: "是否符合土地开发整理专项规划",
                func: function () { }
            },
            "18": {
                name: "矿产资源现状压盖统计",
                func: function () { }
            },
            "19": {
                name: "是否符合矿产资源规划",
                func: function () { }
            },
            "20": {
                name: "采矿权范围是否和矿区划定范围一致",
                func: function () { }
            },
            "21": {
                name: "是否符合探矿勘察数据",
                func: function () { }
            },
            "22": {
                name: "矿区详情",
                func: function () { }
            }
        };
    })();

    //坐标定位
    assistant.modules[1].func = function (index) {
        //坐标定位
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.图形定位</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        try {
            var read = new ktop.Wkt.Wkt();
            read.read(initdatas.geometry);
            var feature = read.toObject(false);
            var epsg = conf.Layer.EPSG || "EPSG:2382";
            feature = ktw.Project.Transform(epsg, ktw.EPSG, feature);
            assistant.HighLight.hightLightFit(feature);
            var geojsonLayer = new L.GeoJSON(feature, {
                showMeasurements: true,
                weight: 1,
                opacity: 0.2,
                color: '#ffffff',
                dashArray: '1',
                fillOpacity: 0.4,
                fillColor: '#2E2E31'
            });
            geojsonLayer.addTo(ktw.assistant.map);
            var center = geojsonLayer.getBounds().getCenter();
            var str = "当前地块属于<span class='xzq'></span>，中心坐标点 <a class='btna' style='color:#0643f7'>" + center.lng + "," + center.lat + "。</a>";
            dom.find(".module-content").html(str);
            dom.find(".btna").click(function () { assistant.HighLight.hightLightFit(feature); });
            $.ajax({
                type: "get",
                url: ktw.assistant.ServerUrl + "sysareacode/getbyid/" + initdatas.xzqdm,
                data: null,
                async: true,
                success: function (res) {
                    if (res.success) {
                        res.data = res.data || {};
                        dom.find(".xzq").html(res.data.fullname);
                    }
                }
            });
        } catch (ex) {
            console.error(ex);
        }
    }
    //坐标检查
    assistant.modules[2].func = function (index) {
        //坐标检查
        initdatas.__sfxj = "否";
        initdatas.__sffb = "否";
        switch (conf.Layer.EPSG) {
            case "EPSG:2382":
                {
                    initdatas.__zbx = "西安80";
                    initdatas.__tycs = "高斯克吕格投影 3度分带 中央经线 111E";
                    break;
                }
            case "EPSG:4490": {
                initdatas.__zbx = "大地2000";
                initdatas.__tycs = "无";
                break;
            }
        }
        initdatas.__tycs = initdatas.__tycs || "";
        var tbl = '' +
                '<table class="form-tbl" style="margin-top: 5px">' +
                '<colgroup>' +
                    '<col style="width: 18%">' +
                    '<col style="width: 30%">' +
                    '<col style="width: 18%">' +
                    '<col style="width: 30%">' +
                '</colgroup>' +
                '<tbody>' +
                    '<tr>' +
                        '<td class="from-title">坐标系</td>' +
                        '<td class="form-text">' +
                            '<div>' + "大地2000" + '</div>' +
                        '</td>' +
                        '<td class="from-title">投影参数</td>' +
                        '<td class="form-text">' +
                            '<div title="' + initdatas.__tycs + '">' + (initdatas.__tycs.length > 12 ? (initdatas.__tycs.substr(0, 12) + "...") : initdatas.__tycs) + '</div>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="from-title">是否相交</td>' +
                        '<td class="form-text">' +
                            '<div>' + initdatas.__sfxj + '</div>' +
                        '</td>' +
                        '<td class="from-title">是否封闭</td>' +
                        '<td class="form-text" style="width: 78%">' +
                            '<div>' + initdatas.__sffb + '</div>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>';
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.坐标检查</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        dom.find(".module-content").append(tbl);
    }
    //流程信息
    assistant.modules[3].func = function (index) {
        //流程信息
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.流程信息</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        initdatas.aj_mc = initdatas.aj_mc || "";
        initdatas.xm_mc = initdatas.xm_mc || "";
        var tbl = '' +
            '<table class="form-tbl" style="margin-top: 5px">' +
                '<colgroup>' +
                    '<col style="width: 18%">' +
                    '<col style="width: 30%">' +
                    '<col style="width: 18%">' +
                    '<col style="width: 30%">' +
                '</colgroup>' +
                '<tbody>' +
                    '<tr>' +
                        '<td class="from-title">案件编号</td>' +
                        '<td class="form-text">' +
                            '<div>' + initdatas.aj_bh + '</div>' +
                        '</td>' +
                        '<td class="from-title">案卷名称</td>' +
                        '<td class="form-text">' +
                            '<div title="' + initdatas.aj_mc + '">' + (initdatas.aj_mc.length > 8 ? (initdatas.aj_mc.substr(0, 8) + "...") : initdatas.aj_mc) + '</div>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="from-title">项目名称</td>' +
                        '<td class="form-text" colspan="3">' +
                            '<div title="' + initdatas.xm_mc + '">' + (initdatas.xm_mc.length > 25 ? (initdatas.xm_mc.substr(0, 25) + "...") : initdatas.xm_mc) + '</div>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="from-title">批准总面积</td>' +
                        '<td class="form-text">' +
                            '<div>' + initdatas.pz_xm_mj + '</div>' +
                        '</td>' +
                        '<td class="from-title">规划用途</td>' +
                        '<td class="form-text">' +
                            '<div>' + initdatas.gh_yt + '</div>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>';
        dom.append(tbl);
    }
    //面积校核
    assistant.modules[4].func = function (index) {
        //面积校验
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.面积校验</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        var mjjh = [];
        mjjh.push({
            mjnx: "申报总面积",
            sbmj: initdatas.pz_xm_mj,
            jsmj: initdatas.pz_xm_mj,
            xc: 0
        });
        mjjh.push({
            mjnx: "建设用地面积",
            sbmj: initdatas.pz_jsyd_mj,
            jsmj: initdatas.pz_jsyd_mj,
            xc: 0
        });
        mjjh.push({
            mjnx: "农用地面积",
            sbmj: initdatas.pz_nyd_mj,
            jsmj: initdatas.pz_nyd_mj,
            xc: 0
        });
        mjjh.push({
            mjnx: "未利用地面积",
            sbmj: initdatas.pz_wlyd_mj,
            jsmj: initdatas.pz_wlyd_mj,
            xc: 0
        });
        var tbl = '' +
            '<table id="mjjh" class="form-tbl" style="margin-top: 5px">' +
                '<colgroup>' +
                    '<col style="width: 18%">' +
                    '<col style="width: 30%">' +
                    '<col style="width: 18%">' +
                    '<col style="width: 30%">' +
                '</colgroup>' +
                '<tbody>' +
                    '<tr>' +
                        '<td class="from-title">面积类别</td>' +
                        '<td class="from-title">申报面积</td>' +
                        '<td class="from-title">计算面积</td>' +
                        '<td class="from-title">相差</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>';
        var tbldom = $(tbl);
        dom.append(tbldom);
        $(mjjh).each(function (i, item) {
            var str = "";
            (i % 2 == 0) ? str += '<tr bgcolor="#DBE5F1">' : str += '<tr>';
            str += '<td class="form-text">' + item.mjnx + '</td>' +
               '<td class="form-text">' + item.sbmj + '</td>' +
              ' <td class="form-text">' + item.jsmj + '</td>' +
               '<td class="form-text">' + item.xc + '</td>' +
           '</tr>'
            tbldom.find("tbody").append(str);
        });
    }
    //是否符合土地利用总体规划
    assistant.modules[6].func = function (index) {
        //是否符合土地利用总体规划
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.是否符合土地利用总体规划</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);

        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_tdlygh.Url),
            count: 20,
            startIndex: 0,
            SourceProject: layer_tdlygh.EPSG,
            TargetProject: ktw.Project
        }
        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();

        args.Geometry = geojsonFeature;
        args.TypeName = layer_tdlygh.TypeName;//土地利用总体规划
        args.filterName = layer_tdlygh.GeometryName;
        var GlandArea = new ktw.GetGlandArea();
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var ghdlmc = [];
            var ghdlt = "";//土地利用总体规划 规划地类
            var Features = arg2.Features;//压盖地块（图层中的完整图形）
            if (Features.length > 0) {
                for (var i = 0; i < Features.length; i++) {
                    var ghdl = Features[i].properties[layer_tdlygh.GHDLMC];
                    if (!ktw.IsNull(ghdl) && (!ghdlmc.contains(ghdl))) {
                        ghdlmc.push(ghdl);
                    }
                }

                if ((null != ghdlmc) && (ghdlmc.length > 0)) {
                    for (var j = 0; j < ghdlmc.length; j++) {
                        ghdlt = ghdlt + ghdlmc[j] + "、";
                    }
                    if (1 == ghdlmc.length) {
                        if (ghdlmc[0] == initdatas.gh_yt) {
                            dom.append("该项目申报地块的土地用途是" + initdatas.gh_yt + "，而土地利用总体规划中的地块位置为" + ghdlmc[0] + "符合湖南省土地利用总体规划.<a href='" + ktw.App.Root + "upload/231611-23.pdf' target='_blank'>(湖南省2016-2030土地利用总体规划.pdf)</a>");
                        }
                        else {
                            dom.append("该项目申报地块的土地用途是" + initdatas.gh_yt + "，而土地利用总体规划中的地块位置为" + ghdlmc[0] + "不符合湖南省土地利用总体规划.<a href='" + ktw.App.Root + "upload/231611-23.pdf' target='_blank'>(湖南省2016-2030土地利用总体规划.pdf)</a>")

                        }
                    }
                    else {
                        dom.append("该项目申报地块的土地用途是" + initdatas.gh_yt + "，而土地利用总体规划中的地块位置为" + ghdlt + "不符合湖南省土地利用总体规划.<a href='" + ktw.App.Root + "upload/231611-23.pdf' target='_blank' style='text-decoration: underline; color:#0000ff;'>(湖南省2016-2030土地利用总体规划.pdf)</a>")

                    }
                } else {
                    dom.append("发现压盖地块，但未获取到数据，请检查配置\"GHDLMC\"！");
                }
            } else {
                dom.append("该项目申报地块与土地利用总体规划无压盖！");
            }
        });
        GlandArea.call(args);
    }
    //是否是城市规划圈内用地
    assistant.modules[7].func = function (index) {
        //是否是城市规划圈内用地
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.是否是城市规划圈内用地</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        initdatas.yd_lx = initdatas.yd_lx || "";
        if (initdatas.yd_lx.indexOf("单独") > 0) {
            var content = '' +
            '<span id="sfztgh" style="font-size: 16px">' + "不是。" + '</span>';
        } else {
            var content = '' +
                '<span id="sfztgh" style="font-size: 16px">' + "是。" + '</span>';
        }

        dom.append(content);
    }
    //是否压盖基本农田
    assistant.modules[8].func = function (index) {
        //是否压盖基本农田
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.压盖基本农田</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        dom.append("<div id='loading'>运算中...</div>");
        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_jbnt.Url),
            SourceProject: layer_jbnt.EPSG,
            TargetProject: ktw.ProEPSG
        }
        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();

        args.Geometry = geojsonFeature;
        args.TypeName = layer_jbnt.TypeName;
        args.filterName = layer_jbnt.GeometryName;
        var GlandArea = new ktw.GetGlandArea();
        var layers = {};
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            dom.find("#loading").remove();
            if (!GlandArea.GetGlandArgs.Success) {
                dom.append("<div style='color:#ff0000'>运算出错!</div>");
                return;
            }
            var Features = arg2.Features;//压盖地块（图层中的完整图形）
            var jbnt = [];
            if (Features.length > 0) {
                for (var i = 0; i < Features.length; i++) {
                    Features[i].properties.YZB = ((Features[i].properties.glandarea / Features[i].properties.allarea) * 100).toFixed(2) + "%";
                    jbnt.push({
                        name: Features[i].properties[layer_jbnt.DLMC],
                        allarea: (Features[i].properties.allarea).toFixed(2),
                        glandarea: (Features[i].properties.glandarea).toFixed(2),
                        YZB: Features[i].properties.YZB,
                        feature: Features[i]
                    });
                }
                loadData(1, jbnt, dom);
            } else {
                dom.append("未发现压盖！");
            }
        });
        GlandArea.call(args);
        var currentIndex = 1;
        function loadData(pageindex, jbnt, dom) {
            dom.find("table").remove();
            var tbl = '' +
                '<table id="mjjh" class="form-tbl" style="margin-top: 5px">' +
                    '<tbody>' +
                        '<tr>' +
                            '<td class="from-title" style="width:8%;">序号</td>' +
                            '<td class="from-title" style="width:50%;">地类名称</td>' +
                            '<td class="from-title" style="width:12%;">总面积</td>' +
                            '<td class="from-title" style="width:15%;">压占面积</td>' +
                            '<td class="from-title" style="width:15%;">压占比</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>';
            var tbldom = $(tbl);
            dom.append(tbldom);
            var startindex = (pageindex - 1) * 5;
            var count = 0;
            $(jbnt).each(function (i, item) {
                if (i < startindex) return true;
                if (count == 5) return;
                count++;
                var str = "";
                (i % 2 == 0) ? str += '<tr bgcolor="#DBE5F1">' : str += '<tr>';
                str += '<td class="form-text">' + (i + 1) + '</td>' +
                    '<td class="form-text"><a href="#" style="color: #0643f7;" index="' + i + '">' + item.name + '</a></td>' +
                   '<td class="form-text">' + item.allarea + '</td>' +
                  ' <td class="form-text">' + item.glandarea + '</td>' +
                   '<td class="form-text">' + item.YZB + '</td>' +
               '</tr>'
                tbldom.find("tbody").append(str);
            });
            tbldom.find("a").click(function () {
                var index = $(this).attr("index");
                if (layers[index]) {
                    ktw.assistant.map.removeLayer(layers[index]);
                    layers[index] = undefined;
                } else {
                    var feature = jbnt[index].feature;
                    if (!feature.__hasTransform) {
                        feature = ktw.Project.Transform(layer_jbnt.EPSG, ktw.EPSG, feature);
                        feature.__hasTransform = true;
                    }
                    var layer = new L.GeoJSON().addTo(ktw.assistant.map);
                    layer.addData(feature);
                    layer.setStyle(style);
                    ktw.assistant.map.fitBounds(layer.getBounds(), {
                        animate: true,
                        duration: 1
                    });
                    console.log(feature);
                    var props = feature.properties;
                    var str = "<div style='overflow:auto;width:100%;height:100%;'>";
                    var t = 0;
                    for (var i in props) {
                        str += "<div class='con-row" + (t % 2 == 0 ? " color-row" : " color-row2") + "'><div class='con-title'>" + i + "</div><div class='con-content'>" + props[i] + "</div></div>";
                        t++;
                    }
                    str += "</div>";
                    layer.on('click', function () {
                        var ctr = new ktw.Window({
                            ID: "mapblock",
                            Title: "图斑信息",
                            IconCls: "icon-Search2 ",
                            Height: 400,
                            Width: 500,
                            Parent: $(document.body),
                            IsMaximize: false,
                            Top: (window.document.body.clientHeight - 500) / 2,
                            Left: (window.document.body.clientWidth - 800) / 2,
                            Maximizable: true,
                            Minimizable: true,
                            Draggable: true,
                            Resizable: true,
                            Content: str
                        });
                        ctr.Layout();
                    }, layer);
                    layers[index] = layer;
                }
            });
            if (jbnt.length > 5) {
                var footrow = $("<tr></tr>");
                tbldom.find("tbody").append(footrow);
                var footercontainer = $("<td colspan='5' style='border:0;text-align:right;'></td>");
                footrow.append(footercontainer);
                footercontainer.append("<span>" + pageindex + "/" + Math.ceil(jbnt.length / 5) + "页</span>&nbsp;");
                var first = $("<a style='color: #0643f7;'>首页&nbsp;</a>").appendTo(footercontainer);
                first.click(function () {
                    currentIndex = 1;
                    loadData(1, jbnt, dom);
                });
                var first = $("<a style='color: #0643f7;'>上一页&nbsp;</a>").appendTo(footercontainer);
                first.click(function () {
                    if (currentIndex == 1) {
                        return;
                    }
                    loadData(--currentIndex, jbnt, dom);
                });
                var first = $("<a style='color: #0643f7;'>下一页&nbsp;</a>").appendTo(footercontainer);
                first.click(function () {
                    if (currentIndex == Math.ceil(jbnt.length / 5)) {
                        return;
                    }
                    loadData(++currentIndex, jbnt, dom);
                });
                var first = $("<a style='color: #0643f7;'>尾页</a>").appendTo(footercontainer);
                first.click(function () {
                    currentIndex = Math.ceil(jbnt.length / 5);
                    loadData(Math.ceil(jbnt.length / 5), jbnt, dom);
                });
            }
        }
    }
    //土地利用现状压盖统计
    assistant.modules[9].func = function (index) {
        //土地利用现状压盖统计
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.土地利用现状压盖统计</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '<div id="tdlyxzc" style="width:100%;height:300px;"></div>' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_tdlyxz.Url),
            count: 20,
            startIndex: 0,
            SourceProject: layer_tdlyxz.EPSG,
            TargetProject: ktw.ProEPSG
        }
        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();
        args.Geometry = geojsonFeature;
        args.TypeName = layer_tdlyxz.TypeName;//土地利用现状
        args.filterName = layer_tdlyxz.GeometryName;
        var GlandArea = new ktw.GetGlandArea();
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var Features = arg2.Features;
            if (Features.length > 0) {
                var list = {};
                var data = [];
                var legendarray = [];
                for (var i = 0; i < Features.length; i++) {
                    //地类名称
                    var dlmc = Features[i].properties[layer_tdlyxz.DLMC];
                    if (!ktw.IsNull(dlmc) && (!legendarray.contains(dlmc))) {
                        legendarray.push(dlmc);
                        data.push({ "name": dlmc, "value": Features[i].properties.glandarea });
                        list[dlmc] = [];
                        list[dlmc].push(Features[i]);
                    }
                    else {
                        for (var j = 0; j < data.length; j++) {
                            if (dlmc == data[j].name) {
                                data[j].value = data[j].value + Features[i].properties.glandarea;
                            }
                        }
                        list[dlmc].push(Features[i]);
                    }

                }
                assistant.initCharts(data, "ygtj", legendarray, list);
            }
        });
        GlandArea.call(args);
    }
    //是否压盖矿区
    assistant.modules[10].func = function (index) {
        //是否压盖矿区
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.是否压盖矿区</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);

        if (layer_kq.CanUse == "false") {
            //dom.append("<div style='color:#ff0000'>缺少矿区数据，无法分析！</div>");
			dom.append("<div>未发现压盖！</div>");
            return;
        }

        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_kq.Url),
            filterName: layer_kq.GeometryName,
            count: 20,
            startIndex: 0,
            SourceProject: layer_kq.EPSG,
            TargetProject: ktw.ProEPSG,
            TypeName: layer_kq.TypeName,
            sortBy: layer_kq.SortBy
        }

        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();
        args.Geometry = geojsonFeature;
        var GlandArea = new ktw.GetGlandArea();
        var mark = 0;
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var Features = arg2.Features;
            var bufferPram = new L.QueryParameter.BufferParameter({
                url: ktw.GetSystemUrlByRelID(layer_kq.Url),
                geometry: JSON.stringify(args.Geometry.geometry),
                system: 'projection',
                unit: "metre",
            });
            if (Features.length > 0) {
                var str = "";
                var strdzzh = "";
                if (mark == 0) dom.append("<div><span>当前地块压盖矿区:</span></div>");
                else if (mark == 1 && dom.html() == null) {
                    dom.append("<div><span>当前地块未压盖矿区，但该地块周围1公里内发现一处矿山:</span></div>");
                }
                else if (mark != 0 && dom == null) {
                    dom.append("<div><span>当前地块未压盖矿区。</span></div>");
                }
                var mj = 0.0;
                //压盖矿区
                if (mark == 0 || (mark == 1 && dom[0].childNodes.length <= 1)) {
                    for (var i = 0; i < Features.length; i++) {
                        dom.append("<div><span>" + Features[i].properties[layer_kq.KSMC] + "(" + Features[i].properties.allarea + "平方米,压占比为" + Features[i].properties.glandarea / Features[i].properties.allarea * 100 + "%)。</span></div>");
                    }
                }
                //1公里
                if (mark == 0) {
                    bufferPram.options.distance = 1000;
                    var gs = new L.GeometryService(bufferPram);
                    gs.buffer(function (data) {
                        args.Geometry.geometry = JSON.parse(data);
                        GlandArea.call(args);
                    });
                }
                mark++;
            }
            else {
                dom.append("<div><span>未发现压盖情况。</span></div>");
            }
        });
        GlandArea.call(args);
    }
    //地质灾害点缓冲分析
    assistant.modules[11].func = function (index) {
        //地质灾害点缓冲分析
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.地质灾害点缓冲分析</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        if (layer_kq.CanUse == "false") {
            //dom.append("<div style='color:#ff0000'>缺少地质灾害点数据，无法分析！</div>");
			dom.append("<div>未发现压盖情况!</div>");
            return;
        }
        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_dzd.Url),
            filterName: layer_dzd.GeometryName,
            count: 20,
            startIndex: 0,
            SourceProject: layer_dzd.EPSG,
            TargetProject: ktw.ProEPSG,
            TypeName: layer_dzd.TypeName,
            sortBy: layer_dzd.SortBy
        }

        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();
        args.Geometry = geojsonFeature;
        var GlandArea = new ktw.GetGlandArea();
        var mark = 0;
        var ygcl = [];
        var strdzzh = "";

        var layers = [];
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var Features = arg2.Features;
            var bufferPram = new L.QueryParameter.BufferParameter({
                url: ktw.GetSystemUrlByRelID(layer_dzd.Url),
                geometry: JSON.stringify(args.Geometry.geometry),
                system: 'projection',
                unit: "metre",
            });
            if (Features.length > 0) {
                for (var i = 0; i < Features.length; i++) {
                    //地质灾害点缓冲分析
                    if (!ygcl.contains(Features[i])) {
                        Features[i].fw = mark == 0 ? "压盖" : mark;
                        ygcl.push(Features[i]);
                    }
                }
            }
            //1公里
            if (mark == 0) {
                bufferPram.options.distance = 1000;
                var gs = new L.GeometryService(bufferPram);
                gs.buffer(function (data) {
                    args.Geometry.geometry = JSON.parse(data);
                    GlandArea.call(args);
                });
            }
            else if (mark == 1) {
                //2公里
                bufferPram.options.distance = 2000;
                var gs = new L.GeometryService(bufferPram);
                gs.buffer(function (data) {
                    args.Geometry.geometry = JSON.parse(data);
                    GlandArea.call(args);
                });
            }
            else if (mark == 2) {
                //3公里
                bufferPram.options.distance = 3000;
                var gs = new L.GeometryService(bufferPram);
                gs.buffer(function (data) {
                    args.Geometry.geometry = JSON.parse(data);
                    GlandArea.call(args);
                });
            } else if (mark == 3) {
                if (ygcl.length > 0) {
                    var content = '' +
                        '<table id="dzzhd" class="form-tbl" style="margin-top: 5px">' +
                            '<colgroup>' +
                                '<col style="width: 18%">' +
                                '<col style="width: 30%">' +
                                '<col style="width: 18%">' +
                                '<col style="width: 30%">' +
                            '</colgroup>' +
                            '<tbody>' +
                                '<tr>' +
                                    '<td class="from-title">序号</td>' +
                                    '<td class="from-title">范围</td>' +
                                    '<td class="from-title">等级</td>' +
                                    '<td class="from-title">类型</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>';
                    dom.append(content);
                    for (var i = 0; i < ygcl.length; i++) {
                        if (i % 2 != 0) strdzzh += '<tr>';
                        else { strdzzh += '<tr bgcolor="#DBE5F1">' }
                        strdzzh += '<td class="form-text">' + (i + 1) + '</td>' +
                            '<td class="form-text">' + ygcl[i].fw + '公里</td>' +
                            '<td class="form-text">' + ygcl[i].properties[layer_dzd.DZDJ] + '</td>' +
                            ' <td class="form-text"><a href="#" index="' + i + '">' + ygcl[i].properties[layer_dzd.DZLX] + '</a></td>' +
                        '</tr>'
                    }
                    dom.find("#dzzhd tbody").append(strdzzh);
                    dom.find("#dzzhd a").click(function () {
                        var index = $(this).attr("index");
                        var feature = ygcl[index];
                        if (layers[index]) {
                            ktw.assistant.map.removeLayer(layers[index]);
                            layers[index] = undefined;
                        } else {
                            var feature = ygcl[index];
                            if (!feature.__hasTransform) {
                                feature = ktw.Project.Transform(layer_dzd.EPSG, ktw.EPSG, feature, true);
                                feature.__hasTransform = true;
                            }
                            var layer = new L.GeoJSON().addTo(ktw.assistant.map);
                            layer.addData(feature);
                            layer.setStyle(style);
                            var props = feature.properties;
                            var str = "<div style='overflow:auto;width:100%;height:100%;'>";
                            var t = 0;
                            for (var i in props) {
                                str += "<div class='con-row" + (t % 2 == 0 ? " color-row" : " color-row2") + "'><div class='con-title'>" + i + "</div><div class='con-content'>" + props[i] + "</div></div>";
                                t++;
                            }
                            str += "</div>";
                            layer.on('click', function () {
                                var ctr = new ktw.Window({
                                    ID: "mapblock2",
                                    Title: "图斑信息",
                                    IconCls: "icon-Search2 ",
                                    Height: 400,
                                    Width: 500,
                                    Parent: $(document.body),
                                    IsMaximize: false,
                                    Top: (window.document.body.clientHeight - 500) / 2,
                                    Left: (window.document.body.clientWidth - 800) / 2,
                                    Maximizable: true,
                                    Minimizable: true,
                                    Draggable: true,
                                    Resizable: true,
                                    Content: str
                                });
                                ctr.Layout();
                            }, layer);
                            layers[index] = layer;
                        }
                    });
                } else {
                    dom.append("未发现压盖地址灾害点。");
                }
            }
            mark++;
        });
        GlandArea.call(args);
    }
    //压盖测量点分析
    assistant.modules[12].func = function (index) {
        //压盖测量点分析
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.压盖测量点分析</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        if (layer_kq.CanUse == "false") {
            //dom.append("<div style='color:#ff0000'>缺少测量点数据，无法分析！</div>");
			dom.append("<div>未发现压盖！</div>");
            return;
        }
        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_cld.Url),
            filterName: layer_cld.GeometryName,
            count: 20,
            startIndex: 0,
            SourceProject: layer_cld.EPSG,
            TargetProject: ktw.ProEPSG,
            TypeName: layer_cld.TypeName,
            sortBy: layer_cld.SortBy
        }

        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();
        args.Geometry = geojsonFeature;
        var GlandArea = new ktw.GetGlandArea();
        var mark = 0;
        var ygcl = [];
        var str = "";
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var Features = arg2.Features;
            var bufferPram = new L.QueryParameter.BufferParameter({
                url: ktw.GetSystemUrlByRelID(layer_cld.Url),
                geometry: JSON.stringify(args.Geometry.geometry),
                system: 'projection',
                unit: "metre",
            });
            if (Features.length > 0) {
                var content = '' +
                        '<table id="ygclfx" class="form-tbl" style="margin-top: 5px">' +
                            '<colgroup>' +
                                '<col style="width: 18%">' +
                                '<col style="width: 80%">' +
                            '</colgroup>' +
                            '<tbody>' +
                                '<tr>' +
                                    '<td class="from-title">序号</td>' +
                                    '<td class="from-title">名称</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>';
                dom.append(content);
                for (var i = 0; i < Features.length; i++) {
                    //压盖测量点
                    if (mark == 0) {
                        (i % 2 == 0) ? str += '<tr bgcolor="#DBE5F1">' : str += '<tr>'
                        str += '<td class="form-text">' + (i + 1) + '</td>' +
                            '<td class="form-text">' + Features[i].properties[layer_cld.CLDMC] + '</td>' +
                        '</tr>'
                    }
                }
                dom.find("#ygclfx tbody").append(str);
            } else {
                dom.append("未发现压盖情况。");
            }
        });
        GlandArea.call(args);
    }
    //土地生命周期图层叠加
    assistant.modules[14].func = function (index) {
        //土地生命周期叠加
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.土地生命周期叠加</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '<div id="chart" style="width:100%;height:300px;"></div>' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_p.Url),
            count: 20,
            startIndex: 0,
            SourceProject: layer_p.EPSG,
            TargetProject: ktw.ProEPSG
        }
        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();
        args.Geometry = geojsonFeature;
        args.TypeName = layer_p.TypeName;
        args.sortBy = layer_p.Key;
        args.filterName = layer_p.GeometryName;
        args.reqtype = "smzqp";
        var GlandArea = new ktw.GetGlandArea();

        var smzqdata = [];
        var smzqlegend = [];
        var smzqinfo = "";

        var list = {};
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var Features = arg2.Features || [];
            var reqtype = arg2.reqtype;
            //批地图层分析结果
            if ("smzqp" == reqtype) {
                list["批"] = [];
                if ((Features.length > 0)) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["批"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "批", "value": Features.length });
                    smzqlegend.push("批");
                    smzqinfo = smzqinfo + "批：压盖地块" + Features.length + "个，总面积" + mj + "平方米<br />";
                }

                //构造征地图层分析参数
                args.reqtype = "smzqz";
                args.Url = ktw.GetSystemUrlByRelID(layer_z.Url);
                args.TypeName = layer_z.TypeName;
                args.sortBy = layer_z.Key;
                args.filterName = layer_z.GeometryName;
                GlandArea.call(args);
            }
                //征地图层分析结果
            else if ("smzqz" == reqtype) {
                list["征"] = [];
                if ((Features.length > 0)) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["征"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "征", "value": Features.length });
                    smzqlegend.push("征");
                    smzqinfo = smzqinfo + "征：压盖地块" + Features.length + "个，总面积" + mj + "平方米<br />";
                }

                //构造储地分析参数
                args.reqtype = "smzqc";
                args.Url = ktw.GetSystemUrlByRelID(layer_c.Url);
                args.TypeName = layer_c.TypeName;
                args.sortBy = layer_c.Key;
                args.filterName = layer_c.GeometryName;
                GlandArea.call(args);
            }
                //储地图层分析结果
            else if ("smzqc" == reqtype) {
                list["储"] = [];
                if (Features.length > 0) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["储"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "储", "value": Features.length });
                    smzqlegend.push("储");
                    smzqinfo = smzqinfo + "储：压盖地块" + Features.length + "个，总面积" + mj + "平方米<br />";
                }

                //构造供地分析参数
                args.reqtype = "smzqg";
                args.Url = ktw.GetSystemUrlByRelID(layer_g.Url);
                args.TypeName = layer_g.TypeName;
                args.sortBy = layer_g.Key;
                args.filterName = layer_g.GeometryName;
                GlandArea.call(args);
            }
                //供地图层分析结果
            else if ("smzqg" == reqtype) {
                list["供"] = [];
                if (Features.length > 0) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["供"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "供", "value": Features.length });
                    smzqlegend.push("供");
                    smzqinfo = smzqinfo + "供：压盖地块" + Features.length + "个，总面积" + mj + "平方米<br />";
                }

                //构造用地分析参数
                args.reqtype = "smzqy";
                args.Url = ktw.GetSystemUrlByRelID(layer_y.Url);
                args.TypeName = layer_y.TypeName;
                args.sortBy = layer_y.Key;
                args.filterName = layer_y.GeometryName;
                GlandArea.call(args);
            }

                //用地图层分析结果
            else if ("smzqy" == reqtype) {
                list["用"] = [];
                if (Features.length > 0) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["用"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "用", "value": Features.length });
                    smzqlegend.push("用");
                    smzqinfo = smzqinfo + "用：压盖地块" + Features.length + "个，总面积" + mj + "平方米<br />";
                }

                //构造补地分析参数
                args.reqtype = "smzqb";
                args.Url = ktw.GetSystemUrlByRelID(layer_b.Url);
                args.TypeName = layer_b.TypeName;
                args.sortBy = layer_b.Key;
                args.filterName = layer_b.GeometryName;
                GlandArea.call(args);
            }

                //补地图层分析结果
            else if ("smzqb" == reqtype) {
                list["补"] = [];
                if (Features.length > 0) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["补"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "补", "value": Features.length });
                    smzqlegend.push("补");
                    smzqinfo = smzqinfo + "补：压盖地块" + Features.length + "个，总面积" + mj + "平方米<br />";
                }

                //构造查地分析参数
                args.reqtype = "smzqw";
                args.Url = ktw.GetSystemUrlByRelID(layer_w.Url);
                args.TypeName = layer_w.TypeName;
                args.sortBy = layer_w.Key;
                args.filterName = layer_w.GeometryName;
                GlandArea.call(args);
            }

                //查地图层分析结果
            else if ("smzqw" == reqtype) {
                list["查"] = [];
                if (Features.length > 0) {
                    var mj = 0.0;
                    for (var i = 0; i < Features.length; i++) {
                        mj += Features[i].properties.glandarea;
                        list["查"].push(Features[i]);
                    }
                    smzqdata.push({ "name": "查", "value": Features.length });
                    smzqlegend.push("查");
                    smzqinfo = smzqinfo + "查：压盖地块" + Features.length + "个，总面积" + mj + "平方米";
                }
                $("#smzq").html(smzqinfo);
                ktw.assistant.initCharts(smzqdata, "tcdj", smzqlegend, list);
            }
        });
        GlandArea.call(args);

    }
    //土地权属信息
    assistant.modules[15].func = function (index) {
        //土地权属信息
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.土地权属信息</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        var args = {
            Url: ktw.GetSystemUrlByRelID(layer_tdlyxz.Url),
            filterName: layer_tdlyxz.GeometryName,
            count: 20,
            startIndex: 0,
            SourceProject: layer_tdlyxz.EPSG,
            TargetProject: ktw.ProEPSG
        }
        var read = new ktop.Wkt.Wkt();
        read.read(initdatas.geometry);
        var feature = read.toObject(false);
        var geojsonFeature = feature.toGeoJSON();
        args.Geometry = geojsonFeature;
        args.TypeName = layer_tdlyxz.TypeName;//土地利用现状
        args.filterName = layer_tdlyxz.GeometryName;
        var GlandArea = new ktw.GetGlandArea();
        $(GlandArea.obj).bind("onGlandAreaSuccess", function (arg1, arg2) {
            var Features = arg2.Features;
            if (Features.length > 0) {
                var syouq = [];
                var syongq = [];
                var qsdwmt = "";
                for (var i = 0; i < Features.length; i++) {
                    var qsxz = Features[i].properties[layer_tdlyxz.QSXZ];
                    if (!ktw.IsNull(qsxz) && (!syouq.contains(qsxz))) {
                        syouq.push(qsxz);
                    }
                    var qsdwm = Features[i].properties[layer_tdlyxz.QSDWM];
                    if (!ktw.IsNull(qsdwm) && (!syongq.contains(qsdwm))) {
                        syongq.push(qsdwm);
                    }
                }
                if ((null != syongq) && (syongq.length > 0)) {
                    for (var j = 0; j < syongq.length; j++) {
                        if (j == syongq.length - 1) {
                            qsdwmt = qsdwmt + syongq[j] + "。";
                        } else {
                            qsdwmt = qsdwmt + syongq[j] + ",";
                        }
                    }
                }
                if ((null != syouq) && (syouq.length > 0)) {
                    if ((1 == syouq.length)) {
                        if (syouq.contains("30")) {
                            dom.append("当前土地所有权属集体土地；使用权所属" + qsdwmt)
                        }
                        else {
                            dom.append("当前土地所有权属国有土地；使用权所属" + qsdwmt)
                        }
                    }
                    else {
                        dom.append("当前土地部分属国有土地，部分属集体土地；使用权所属" + qsdwmt)
                    }
                }
            } else {
                dom.append("未发现土地利用现状压盖地块,请检查数据!")
            }
        });
        GlandArea.call(args);
    }
    //补充耕地情况
    assistant.modules[16].func = function (index) {
        //补充耕地情况
        var html = '' +
            '<div class="module">' +
                '<div class="module-header">' +
                    '<span>' + index + '.补充耕地情况</span>' +
                    '<div class="module-bar"></div>' +
                '</div>' +
                '<div class="module-content">' +
                '</div>' +
            '</div>';
        var dom = $(html);
        $("#contentau").append(dom);
        $.ajax({
            type: "get",
            url: ktw.App.ServerUrl + "layer/lifecycel/p/" + initdatas[conf.Layer.Key],
            async: true,
            success: function (res) {
                if (res.success) {
                    if (res.data && res.data.b && res.data.b.length > 0) {
                        loadData(1, res.data.b, dom);
                    } else {
                        dom.append("未发现补充耕地！");
                    }
                } else {
                    ktw.Alert(res.message);
                }
            },
            error: function (res) {
                ktw.Error("出错!")
            }
        });
        var layers = {};
        var currentIndex = 1;
        function loadData(pageindex, bcgd, dom) {
            dom.find("table").remove();
            var tbl = '' +
                        '<table id="mjjh" class="form-tbl" style="margin-top: 5px">' +
                        '<colgroup>' +
                            '<col style="width: 10%">' +
                            '<col style="width: 30%">' +
                            '<col style="width: 20%">' +
                            '<col style="width: 20%">' +
                            '<col style="width: 20%">' +
                        '</colgroup>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td class="from-title">序号</td>' +
                                '<td class="from-title">项目名称</td>' +
                                '<td class="from-title">补充类型</td>' +
                                '<td class="from-title">剩余补充面积(㎡)</td>' +
                                '<td class="from-title">占补使用面积(㎡)</td>' +
                            '</tr>' +
                        '</tbody>' +
                    '</table>';
            var tbldom = $(tbl);
            dom.append(tbldom);
            var startindex = (pageindex - 1) * 5;
            var count = 0;
            $(bcgd).each(function (i, item) {
                if (i < startindex) return true;
                if (count == 5) return;
                count++;

                $.ajax({
                    type: "get",
                    async: false,
                    url: ktw.App.ServerUrl + "inf_onemap_glxxb/getbyfilter/" + encodeURIComponent("guid1='" + initdatas[conf.Layer.Key] + "' and guid2='" + item.bcgdfa_guid + "' and ltype='PB'"),
                    success: function (res) {
                        if (res.success && res.data.length > 0) {
                            item.zbphmj = res.data[0].zbphmj;
                            item.zbphmj = window.parseFloat(item.zbphmj);
                            if (isNaN(item.zbphmj)) {
                                item.zbphmj = "未知";
                            } else {
                                item.zbphmj = item.zbphmj.toFixed(4);
                            }
                        }
                    }
                });
                var xmmc = item.xm_mc || "";
                if (xmmc.length > 14) {
                    xmmc = xmmc.substr(0, 12) + "...";
                }
                var str = "";
                var symj = window.parseFloat(item.kbc_mj);
                isNaN(symj) ? symj = 0 : null;
                symj = symj.toFixed(4);
                (i % 2 == 0) ? str += '<tr bgcolor="#DBE5F1">' : str += '<tr>';
                str += '<td class="form-text">' + (i + 1) + '</td>' +
                    '<td class="form-text" title="' + item.xm_mc + '"><a href="#" style="color: #0643f7;" index="' + i + '">' + xmmc + '</a></td>' +
                   '<td class="form-text">' + item.bcgd_fs + '</td>' +
                  ' <td class="form-text">' + symj + '</td>' +
                   '<td class="form-text">' + item.zbphmj + '</td>' +
               '</tr>'
                tbldom.find("tbody").append(str);
            });
            tbldom.find("a").click(function () {
                var index = $(this).attr("index");
                if (layers[index]) {
                    ktw.assistant.map.removeLayer(layers[index]);
                    layers[index] = undefined;
                } else {
                    var read = new ktop.Wkt.Wkt();
                    read.read(bcgd[index].geometry);
                    var feature = read.toObject(false);
                    var epsg = layer_b.EPSG || "EPSG:2382";
                    feature = ktw.Project.Transform(epsg, ktw.EPSG, feature.toGeoJSON());
                    feature.properties = bcgd[0];
                    var layer = new L.GeoJSON().addTo(ktw.assistant.map);
                    layer.addData(feature);
                    ktw.assistant.map.fitBounds(layer.getBounds(), {
                        animate: true,
                        duration: 1
                    });
                    layer.setStyle(style);
                    console.log(feature);
                    var props = feature.properties;
                    var str = "<div style='overflow:auto;width:100%;height:100%;'>";
                    var t = 0;
                    for (var i in props) {
                        str += "<div class='con-row" + (t % 2 == 0 ? " color-row" : " color-row2") + "'><div class='con-title'>" + i + "</div><div class='con-content'>" + props[i] + "</div></div>";
                        t++;
                    }
                    str += "</div>";
                    layer.on('click', function () {
                        var ctr = new ktw.Window({
                            ID: "mapbcgd",
                            Title: "图斑信息",
                            Height: 400,
                            IconCls: "icon-Search2 ",
                            Width: 500,
                            Parent: $(document.body),
                            IsMaximize: false,
                            Top: (window.document.body.clientHeight - 500) / 2,
                            Left: (window.document.body.clientWidth - 800) / 2,
                            Maximizable: true,
                            Minimizable: true,
                            Draggable: true,
                            Resizable: true,
                            Content: str
                        });
                        ctr.Layout();
                    }, layer);
                    layers[index] = layer;
                }
            });
            if (bcgd.length > 5) {
                var footrow = $("<tr></tr>");
                tbldom.find("tbody").append(footrow);
                var footercontainer = $("<td colspan='5' style='border:0;text-align:right;'></td>");
                footrow.append(footercontainer);
                footercontainer.append("<span>" + pageindex + "/" + Math.ceil(jbnt.length / 5) + "页</span>&nbsp;");
                var first = $("<a style='color: #0643f7;'>首页&nbsp;</a>").appendTo(footercontainer);
                first.click(function () {
                    currentIndex = 1;
                    loadData(1, bcgd, dom);
                });
                var first = $("<a style='color: #0643f7;'>上一页&nbsp;</a>").appendTo(footercontainer);
                first.click(function () {
                    if (currentIndex == 1) {
                        return;
                    }
                    loadData(--currentIndex, bcgd, dom);
                });
                var first = $("<a style='color: #0643f7;'>下一页&nbsp;</a>").appendTo(footercontainer);
                first.click(function () {
                    if (currentIndex == Math.ceil(bcgd.length / 5)) {
                        return;
                    }
                    loadData(++currentIndex, bcgd, dom);
                });
                var first = $("<a style='color: #0643f7;'>尾页</a>").appendTo(footercontainer);
                first.click(function () {
                    currentIndex = Math.ceil(bcgd.length / 5);
                    loadData(Math.ceil(bcgd.length / 5), bcgd, dom);
                });
            }
        }
    }
})(jQuery);
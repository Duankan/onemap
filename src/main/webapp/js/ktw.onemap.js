/// <reference path="../html/onemap/TYGN/SplitTwoScreen.html" />
(function ($) {
    // 初始化工具箱
    ktw.InitTool = function () {
        // 工具箱工具函数
        //保存侧面板是否可见
        var rightVisible, bottomVisible, leftVisible, topVisible;
        //保存图层树、图层选择树位置、高级查询位置、影像切换图标位置、工具箱位置、比例尺位置、坐标提示位置
        var pos_tree = {}, pos_tree_select = {}, pos_globalQuery = {}, pos_tools = {}, pos_tools2 = {}, pos_switch = {}, pos_scale = {}, pos_latlng = {};
        var options = {
            weight: 2,
            color: '#F9B140', //多边形颜色
            fillColor: '#ffffff',//多边形填充颜色
            fillOpacity: 0.4, //填充的透明度
            type: "polyGon"
        };
        //测量控件
        var measure;
        function startMearsure(type) {
            if (measure) {
                measure.removeTo();
                measure = null;
            }
            measure = L.control.measureMap($.extend(options, { type: type })).addTo(ktw.App.Map);
        }

        //全屏函数
        function fullscreen(isunfull) {
            if (!isunfull) {
                rightVisible = ktw.App.RightPanel.Visible;
                bottomVisible = ktw.App.BottomPanel.Visible;
                leftVisible = ktw.App.LeftPanel.Visible;
                topVisible = ktw.App.TopPanel.Visible;
                pos_globalQuery = { top: $(".commontab").css("top"), left: $(".commontab").css("left") };
                pos_tree = { top: $("#total-layertree").css("top"), left: $("#total-layertree").css("left") };
                pos_switch = { top: $(".MapSwitch").css("top") };
                pos_tree_select = { top: $("#selectLayer").css("top") };
                pos_tools = { top: $("#toolsbox").css("top") };
                pos_tools2 = { top: $("#toolsbox2").css("top") };
                pos_statistic = { top: $("#onemap-statistic").css("top") };
                pos_scale = { "margin-left": $(".leaflet-control-scale").css("margin-left") };
                pos_latlng = { "margin-left": $(".ktw-control-mouseposition").css("margin-left") };

            }
            ktw.App.TopPanel.SetVisible(!isunfull ? false : topVisible);
            ktw.App.LeftPanel.SetVisible(!isunfull ? false : leftVisible);
            ktw.App.RightPanel.SetVisible(!isunfull ? false : rightVisible);
            ktw.App.BottomPanel.SetVisible(!isunfull ? false : bottomVisible);
            $(".commontab").css(!isunfull ? { top: "5px", left: "60px" } : { top: pos_globalQuery.top, left: pos_globalQuery.left });
            $("#total-layertree").css(!isunfull ? { top: "5px", left: "5px" } : { top: pos_tree.top, left: pos_tree.left });
            $(".MapSwitch").css(!isunfull ? { top: "5px" } : { top: pos_switch.top });
            $("#selectLayer").css(!isunfull ? { top: "55px" } : { top: pos_tree_select.top });
            $("#toolsbox").css(!isunfull ? { top: "201px" } : { top: pos_tools.top });
            $("#toolsbox2").css(!isunfull ? { top: "102px" } : { top: pos_tools2.top });
            $("#onemap-statistic").css(!isunfull ? { top: "151px" } : { top: pos_statistic.top });
            $(".leaflet-control-scale").css(!isunfull ? { "margin-left": "10px !important" } : { "margin-left": pos_scale["margin-left"] + " !important" });
            $(".ktw-control-mouseposition").css(!isunfull ? { "margin-left": "110px !important" } : { "margin-left": pos_scale["margin-left"] + " !important" });

        };
        //清除测量
        ktw.MeasureClear = function () {
            if (measure) {
                measure.removeTo();
                measure = null;
            }
        };
        //清除地图
        ktw.ClearFinal = function (map) {
            map = map || ktw.App.Map;
            //清除所有高亮显示
            map.HighLightContainer.clear();
            //清除临时图层
            ktw.MapUtils.ClearTempLayer(map);
            //清除通用查询
            if (ktw.App.GlobalQuery) {
                ktw.App.GlobalQuery.Clear();
            }
            //隐藏土地生命周期
            if (ktw.App.LifeCtr) {
                ktw.App.LifeCtr.Hide();
            }
            //清除绘制图层
            ktw.App.Draw.clear();
            //清除测量
            ktw.MeasureClear();
        }
        //全图函数
        ktw.GlobeFinal = function () {
            var zoom = ktw.App.Config.SystemMap.Zoom;
            var center = ktw.App.Config.SystemMap.Center;
            ktw.App.Map.setView([center.split(",")[1], center.split(",")[0]], zoom);
        }

        // 放置工具箱
        var toolsDiv = $('<div id="toolsbox" style="position: absolute;top:265px;width:35px;height:42px; right:10px;z-index:3"></div>');
        //放置多屏对比、双拼对比、卷帘
        var toolsDiv2 = $('<div id="toolsbox2" style="position: absolute;top:165px;width:40px;height:36px;right:10px;z-index:3"></div>');
        var SplitTwoScreen = $(
        		'<div  class="mappanelsymbol toolsymbol"  style=top:0px;right:0px;background-color:#196a86;opacity:0.8;" tag="maptool-SplitTwoScreen" title="双屏对比"><div class="Icon icon-maptool-SplitTwoScreen"></div></div>')
        		.appendTo(toolsDiv2);
        var toolsPanel2 = $(
             '<div id="toolsPanel2" class="mappanelsymbol" style="top:0px;height:35px;width:72px;display:none;right:40px;border-right:0px;"></div>')
             .appendTo(toolsDiv2);
        var SplitFourScreen = $(
          '<div class="toolsymbol" style="solid #999;top:0px;opacity: 0.8;right:0px;" tag="maptool-SplitFourScreen" title="多屏对比"><div class="Icon icon-maptool-SplitFourScreen"></div></div>')
          .appendTo(toolsPanel2);
        var RollingScreen = $(
        		'<div class="toolsymbol" style="border-left:1px solid #999;top:0px; opacity: 0.8;" tag="maptool-RollingScreen" title="卷帘对比"><div class="Icon icon-maptool-RollingScreen"></div></div>')
        		.appendTo(toolsPanel2);
        ktw.App.MapPanel.Target.append(toolsDiv);
        ktw.App.MapPanel.Target.append(toolsDiv2);
        var toolsymbol = $('<div class="mappanelsymbol" style=top:0px;right:0px;background-color:#196a86;opacity:0.8;"><div class="Icon icon-maptool-tool"></div></div>').appendTo(toolsDiv);
        toolsDiv.mouseenter(function () {
            toolsymbol.css({
                "border": "1px solid #0099cc",
                "opacity": "1"
            });
            $("#toolsPanel").css("display", "block");
        }).mouseleave(function () {
            toolsymbol.css({
                "border": "1px solid #999",
                "opacity": "0.8"
            });
            $("#toolsPanel").css("display", "none");
        });
        toolsDiv2.mouseenter(function () {
            SplitTwoScreen.css({
                "border": "1px solid #0099cc",
                "opacity": "1"
            });
            $("#toolsPanel2").css("display", "block");
        }).mouseleave(function () {
            SplitTwoScreen.css({
                "border": "1px solid #999",
                "opacity": "0.8"
            });
            $("#toolsPanel2").css("display", "none");
        });
        toolsymbol.click(function () {
            toolsymbol.next().toggle();
        });
        var toolsPanel = $(
				'<div id="toolsPanel" class="mappanelsymbol" style="top:42px;height:252px;display:none;right:0px;border-top:0px;"></div>')
				.appendTo(toolsDiv);
        var screenfull = $(
				'<div class="toolsymbol" style="border-bottom:1px solid #999;top:0px;" tag="maptool-fullscreen" title="全屏"><div class="Icon icon-maptool-fullscreen"></div></div>')
				.appendTo(toolsPanel);
        var fullmap = $(
				'<div class="toolsymbol" style="border-bottom:1px solid #999;top:36px;" tag="maptool-fullmap" title="全图"><div class="Icon icon-maptool-fullmap"></div></div>')
				.appendTo(toolsPanel);
        var measuredistance = $(
				'<div class="toolsymbol" style="top:72px;border-bottom: 1px solid #999;" tag="maptool-measuredistance" title="测距"><div class="Icon icon-maptool-measuredistance"></div></div>')
				.appendTo(toolsPanel);
        var measurearea = $(
				'<div class="toolsymbol" style="top:108px;border-bottom: 1px solid #999;" tag="maptool-measurearea" title="测面积"><div class="Icon icon-maptool-measurearea"></div></div>')
				.appendTo(toolsPanel);
        var zoomin = $(
				'<div class="toolsymbol" style="top:144px;border-bottom: 1px solid #999;" tag="maptool-zoomin" title="放大"><div class="Icon icon-maptool-zoomin"></div></div>')
				.appendTo(toolsPanel);
        var zoomout = $(
				'<div class="toolsymbol" style="top:180px;border-bottom: 1px solid #999;" tag="maptool-zoomout" title="缩小"><div class="Icon icon-maptool-zoomout"></div></div>')
				.appendTo(toolsPanel);
        var clearmap = $(
				'<div class="toolsymbol" style="top:216px;" tag="maptool-clearmap"><div class="Icon icon-maptool-clearmap" title="清除屏幕"></div></div>').appendTo(toolsPanel);
        $(".toolsymbol").mouseenter(function () {
            var tag = $(this).attr("tag");
            $(".Icon", $(this)).removeClass("icon-" + tag);
            $(".Icon", $(this)).addClass("icon-" + tag + "1");
        }).mouseleave(function () {
            var tag = $(this).attr("tag");
            $(".Icon", $(this)).removeClass("icon-" + tag + "1");
            $(".Icon", $(this)).addClass("icon-" + tag);
        }).click(function () {
            var tag = $(this).attr("tag");
            if (tag == "maptool-fullscreen"
                    || tag == "maptool-unfullscreen") {
                // 全屏
                if (tag == "maptool-fullscreen") {
                    fullscreen();
                    $('.Icon', $(this)).removeClass("icon-" + tag + "1");
                    $(this).attr("tag", "maptool-unfullscreen").attr("title", "还原");
                    $('.Icon', $(this)).addClass("icon-maptool-unfullscreen1");
                } else {
                    fullscreen(true);
                    $('.Icon', $(this)).removeClass("icon-" + tag + "1");
                    $(this).attr("tag", "maptool-fullscreen").attr("title", "全屏");
                    $('.Icon', $(this)).addClass("icon-maptool-fullscreen1");
                }
            }
            if (tag == "maptool-fullmap") {
                // 全图
                ktw.GlobeFinal();
            }
            if (tag == "maptool-SplitTwoScreen") {
                // 双屏对比
                var ctr = new ktw.Window({
                    ID: "ktw-SplitTwoScreen",
                    Title: "双屏对比",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: false,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/onemap/TYGN/SplitTwoScreen.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            }
            if (tag == "maptool-SplitFourScreen") {
                // 多屏对比
                var ctr = new ktw.Window({
                    ID: "ktw-SplitFourScreen",
                    Title: "多屏对比",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: false,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/onemap/TYGN/SplitFourScreen.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            }
            if (tag == "maptool-RollingScreen") {
                // 卷帘对比
                var ctr = new ktw.Window({
                    ID: "ktw-RollingScreen",
                    Title: "卷帘对比",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: false,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/onemap/TYGN/RollingScreen.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            }
            if (tag == "maptool-measuredistance") {
                // 测距离
                startMearsure("polyLine");
            }
            if (tag == "maptool-measurearea") {
                // 测面积
                startMearsure("polyGon");
            }
            if (tag == "maptool-clearmap") {
                // 清除地图
                ktw.ClearFinal();
            }
            if (tag == "maptool-zoomin") {
                // 放大一级地图
                ktw.App.Map.zoomIn();
            }
            if (tag == "maptool-zoomout") {
                // 缩小一级地图
                ktw.App.Map.zoomOut();
            }
        });
    }
    // 初始化放大缩小按钮
    ktw.InitScaleIcon = function () {
        var icon = $("<div class='zoom-box'><div class='zoom-in-box'><div class='zoom-in'></div></div><div class='zoom-out-box'><div class='zoom-out'></div></div></div>");
        ktw.App.MapPanel.Target.append(icon);
        icon.find(".zoom-in-box").bind("click", function () {
            // 放大事件
            ktw.App.Map.zoomIn();
        });
        icon.find(".zoom-out-box").bind("click", function () {
            // 缩小事件
            ktw.App.Map.zoomOut();
        });
    }
    // 初始化图例
    ktw.InitLegend = function (opt) {
        new ktw.Legend(opt);
    };
    // 初始化土地生命周期导航
    ktw.InitLifeCtr = function (opt) {
        var lifectr = ktw.App.LifeCtr = new ktw.LifeCycle(opt);
        lifectr.Hide();
        ktw.App.MapPanel.Target.append(lifectr.Target);
    }
    //初始化通用查询和通用分析tab
    ktw.InitCommonTab = function () {
        var strhtml = "" +
             '<div class="commontab">' +
                '<div class="commontab-query active">查询</div>' +
                '<div class="commontab-analysis">分析</div>' +
             '</div>';
        var tabs = $(strhtml);
        tabs.find(".commontab-query").click(function () {
            if (ktw.App.GlobalQuery.Target.css("display") == "none") {
                ktw.App.GlobalQuery.Target.show();
                tabs.find("div").removeClass("active");
                $(this).addClass("active");
            }
            ktw.App.GlobalGlandAnalysis.Target.hide();
        });
        tabs.find(".commontab-analysis").click(function () {
            if (ktw.App.GlobalGlandAnalysis.Target.css("display") == "none") {
                ktw.App.GlobalGlandAnalysis.Target.show();
                tabs.find("div").removeClass("active");
                $(this).addClass("active");
            }
            ktw.App.GlobalQuery.Target.hide();
        });
        ktw.App.MapPanel.Target.append(tabs);
        return tabs;
    }
})(jQuery);

/* 图层树 */
(function ($) {
    var layers;// 图层列表的外层容器
    var layerdata = [];// 存储可以显示的图层
    var layerdata_deleted = []; // 记录本次选中操作移除了的图层
    var ArrayOfMapLayer;
    var query;
    var dataGrid;
    var checkflag = false;//记录是否点击复选框,防止点击复选框时折叠节点

    function doCheck(layer) {
        if (!layer.length) layer = [layer];
        for (var i = 0; i < layer.length; i++) {
            if (layer[i]) layer[i].Checked = true;
            if (layer[i] && layer[i].Children && layer[i].Children.MapLayer) {
                doCheck(layer[i].Children.MapLayer);
            }
        }
    }

    //预处理图层目录的默认选中
    function preDealChecked(MapLayer) {
        if (!ktw.IsArray(MapLayer))
            MapLayer = [MapLayer];
        var curarr = Enumerable.From(MapLayer).Where(
                "s=>s.Visible!='false'").ToArray();
        for (var i = 0; i < curarr.length; i++) {
            if (curarr[i].Children && curarr[i].Children.MapLayer) {
                if (curarr[i].Checked == true || curarr[i].Checked == "true") {
                    doCheck(curarr[i]);
                } else {
                    preDealChecked(curarr[i].Children.MapLayer);
                }
            }
        }
    }
    ktw.LayerTree = function (_ArrayOfMapLayer) {
        var $this = this;
        $this.layerdata = layerdata;
        debugger;
        ArrayOfMapLayer = _ArrayOfMapLayer;
        funExt($this);
        preDealChecked(ArrayOfMapLayer.MapLayer);
        var layertreedata = [];
        // 记录在选中列表中的图层列表
        $this.GetData(layertreedata, ArrayOfMapLayer.MapLayer, layerdata);
        $this.InitTree(layertreedata);
        $this.layertreedata = layertreedata;
        $this.InitTreeMenu();
        $this.InitSelectedList();
        $this.LayoutSelectedList();
    }
    function funExt(control) {
        $.extend(control, {
            LayoutSelectedList: function () {
                var $this = this;
                layerdata = Enumerable.From(layerdata).OrderByDescending('$.Order').ToArray();
                layers.html("");

                // 首先清空全局搜索框的结果列表tab项
                var headersbark;
                if (ktw.App.GlobalQuery) {
                    // 首先克隆一个备用
                    headersbark = ktw.App.GlobalQuery.ResultHeaders.clone(true);
                    ktw.App.GlobalQuery.ResultHeaders.empty();
                }
                var headersbark2;
                if (ktw.App.GlobalGlandAnalysis) {
                    // 首先克隆一个备用
                    headersbark2 = ktw.App.GlobalGlandAnalysis.ResultHeaders.clone(true);
                    ktw.App.GlobalGlandAnalysis.ResultHeaders.empty();
                }
                ktw.App.Map.__legend.ClearData();
                for (var i = 0; i < layerdata.length; i++) {
                    var div = $('<div class="row"></div>').appendTo(layers);
                    div.prop("data", layerdata[i]);
                    var layerNameDiv = $('<div class="namepanel"></div>').appendTo(div);
                    var layericon = $('<div class="icon icon-element"></div>').appendTo(layerNameDiv);
                    var layername = $('<div class="text">' + layerdata[i].Text + '</div>').appendTo(layerNameDiv);
                    var layerswitch = $('<div class="switch"></div>').appendTo(layerNameDiv);
                    layerswitch.addClass(layerdata[i].Visible ? "switchstateopen" : "switchstateclose");
                    var layerwitchbtn = $('<div class="btn"></div>').appendTo(layerswitch);
                    layerwitchbtn.addClass(layerdata[i].Visible ? "switchbtnopen" : "switchbtnclose");
                    layerwitchbtn.prop("data", layerdata[i]);
                    var operatDiv = $('<div class="layeroperat"></div>').appendTo(div);
                    var slideDiv = $('<div class="sliderDiv"></div>').appendTo(operatDiv);
                    var slider = $('<input class="sliderFlg" style="height:100%;width:100%;color:#fcfcfc" tag="' + layerdata[i].ID + '"/>').appendTo(slideDiv);
                    var templayer = ktw.MapUtils.GetLayer("tipicLayer" + layerdata[i].ID, ktw.App.Map);
                    var tempopt = ktw.IsNull(templayer) ? 1 : templayer.options.opacity;
                    slider.slider({
                        showTip: true,
                        value: parseInt(tempopt * 100),
                        disabled: layerdata[i].Visible ? false : true,
                        onChange: function (value, oldvalue) {
                            var layerid = $(this).attr("tag");
                            var currlayer = ktw.MapUtils.GetLayer("tipicLayer" + layerid, ktw.App.Map);
                            if (!ktw.IsNull(currlayer)) currlayer.setOpacity(value / 100);
                        }
                    });
                    $(".slider-inner", slideDiv).css({
                        "color": "#fcfcfc",
                        "background": "rgba(255,255,255,0.2)",
                        "border-color": "#cdcdcd"
                    });
                    var buttonsDiv = $('<div class="range"></div>').appendTo(operatDiv);
                    if (i != 0) {
                        var upbtn = $('<div class="btnicon icon-layerup "></div>').appendTo(buttonsDiv);
                        upbtn.prop("data", layerdata[i]);
                        upbtn.click(function () {
                            $this.RangeLayer(true, $(this).prop("data"));
                        });
                    }

                    // 最后一个图层没有底边框,没有向下箭头
                    if (i == layerdata.length - 1) {
                        div.css("border-bottom", "0px");
                    } else {
                        var downbtn = $('<div class="btnicon icon-layerdown" style="margin-left:3px;"></div>').appendTo(buttonsDiv);
                        downbtn.prop("data", layerdata[i]);
                        downbtn.click(function () {
                            $this.RangeLayer(false, $(this).prop("data"));
                        });
                    }
                    // 设置这个图层是否在地图上显示
                    $this.ShowLayer(layerdata[i], layerdata[i].Visible);
                    // 如果存在全局搜索框,将每个显示的图层的配置添加到全局搜索框中
                    if (ktw.App.GlobalQuery) {
                        var tag = ktw.IsNull(layerdata[i].LifeCycle) ? ("_id" + layerdata[i].ID) : layerdata[i].LifeCycle;
                        var header = headersbark.find("span[tag='" + tag + "']");
                        if (header.length == 0 && (layerdata[i].NoQuery != "true")) {
                            header = $('<span tag="' + tag + '" class="classItem">' + layerdata[i].Text + '</span>');
                        }
                        ktw.App.GlobalQuery.ResultHeaders.append(header);
                    }
                    // 如果存在通用分析框,将每个显示的图层的配置添加到通用分析中
                    if (ktw.App.GlobalGlandAnalysis) {
                        var tag = ktw.IsNull(layerdata[i].LifeCycle) ? ("_id" + layerdata[i].ID) : layerdata[i].LifeCycle;
                        var flhz = ktw.IsNull(layerdata[i].FLHZ) ? ("") : layerdata[i].FLHZ;
                        var header = headersbark2.find("span[tag='" + tag + "']");
                        if (header.length == 0 && (layerdata[i].NoQuery != "true")) {
                            header = $('<span tag="' + tag + '" flhz="' + flhz + '" class="classItem">' + layerdata[i].Text + '</span>');
                        }
                        ktw.App.GlobalGlandAnalysis.ResultHeaders.append(header);
                    }
                }
                //如果没有选中任何图层,设置全局搜索使用默认的搜索方案
                if (ktw.App.GlobalQuery && ktw.App.GlobalQuery.Target.find(".resultPanel .headerPanel .classItem").length == 0) {
                    //遍历图层树找到默认的搜索图层
                    var tmpdata = (function search(res, arr) {
                        if (!arr) return res;
                        if (!$.isArray(arr)) arr = [arr];
                        for (var i = 0; i < arr.length; i++) {
                            if ((arr[i].NoQuery == "false" || arr[i].NoQuery == undefined) && arr[i].DefaultQuery == "true") {
                                res.push(arr[i]);
                            }
                            if (arr[i].Children)
                                search(res, arr[i].Children.MapLayer);
                        }
                        return res;
                    })([], ktw.App.Config.SystemMap.ArrayOfMapLayer.MapLayer);
                    $(tmpdata).each(function (i, item) {
                        var tag = ktw.IsNull(item.LifeCycle) ? ("_id" + item.ID) : item.LifeCycle;
                        ktw.App.GlobalQuery.ResultHeaders.append($('<span tag="' + tag + '" class="classItem ' + (i == 0 ? "classItem-select" : "") + '">' + item.Text + '</span>'));
                    });
                }


                //如果没有选中任何图层,设置全局分析使用默认的搜索方案
                if (ktw.App.GlobalGlandAnalysis && ktw.App.GlobalGlandAnalysis.Target.find(".resultPanel .headerPanel .classItem").length == 0) {
                    //遍历图层树找到默认的搜索图层
                    var tmpdata = (function search(res, arr) {
                        if (!arr) return res;
                        if (!$.isArray(arr)) arr = [arr];
                        for (var i = 0; i < arr.length; i++) {
                            if ((arr[i].NoQuery == "false" || arr[i].NoQuery == undefined) && arr[i].DefaultQuery == "true") {
                                res.push(arr[i]);
                            }
                            if (arr[i].Children)
                                search(res, arr[i].Children.MapLayer);
                        }
                        return res;
                    })([], ktw.App.Config.SystemMap.ArrayOfMapLayer.MapLayer);
                    $(tmpdata).each(function (i, item) {
                        var tag = ktw.IsNull(item.LifeCycle) ? ("_id" + item.ID) : item.LifeCycle;
                        ktw.App.GlobalGlandAnalysis.ResultHeaders.append($('<span tag="' + tag + '" class="classItem ' + (i == 0 ? "classItem-select" : "") + '">' + item.Text + '</span>'));
                    });
                }


                //设置排序
                var indicator = $('<div class="indicator">>></div>').appendTo('body');
                //标记是否是拖动的图层(首先触发onDrop然后触发onStopDrag)
                var layerdrag = false;
                $('#selectLayer .tipicLayer>.row').each(function (i, item) {
                    $(item).draggable({
                        revert: true,
                        deltaX: 0,
                        deltaY: 0,
                        handle: $(item).find(".namepanel>.icon"),
                        proxy: 'clone',
                        onDrag: function () {
                            layerdrag = true;
                        },
                        onStopDrag: function () {
                            layerdrag = false;
                        }
                    }).droppable({
                        onDragOver: function (e, source) {
                            if (!layerdrag) return;
                            indicator.css({
                                display: 'block',
                                left: $(this).offset().left - 10,
                                top: $(this).offset().top + $(this).outerHeight() - 5
                            });
                        },
                        onDragLeave: function (e, source) {
                            if (!layerdrag) return;
                            indicator.hide();
                        },
                        onDrop: function (e, source) {
                            if (!layerdrag) return;
                            $(source).insertAfter(this);
                            indicator.hide();
                            //对layerdata进行排序
                            var orders = [];
                            var tmpmap = {};
                            $($this.layerdata).each(function (i, item) {
                                orders.push(parseInt(item.Order));
                                tmpmap[parseInt(item.Order)] = item;
                            });
                            orders.sort();
                            var tmparr = [];
                            var rows = $("#selectLayer .tipicLayer>.row");
                            for (var j = rows.length - 2, i = 0; i < rows.length; i++) {
                                item = rows[i];
                                var tmp = $(item).prop("data");
                                if (tmp == undefined) continue;//clone的元素
                                tmp.Order = orders[j];
                                j--;
                                tmparr.push(tmp);
                                var currlayer = ktw.MapUtils.GetLayer("tipicLayer" + tmp.ID, ktw.App.Map);
                                if (!ktw.IsNull(currlayer))
                                    currlayer.setZIndex(parseInt(tmp.Order));
                            }
                            $this.layerdata = tmparr;
                            $this.LayoutSelectedList();
                        }
                    });
                })
                if (ktw.App.GlobalQuery) {
                    // 进行事件绑定
                    ktw.App.GlobalQuery.bindSourceChangeEvent();
                    //直接将第一个tab项设置为选中状态
                    ktw.App.GlobalQuery.ResultHeaders.children("span").removeClass("classItem-select").eq(0).addClass("classItem-select");
                    /*if (ktw.App.GlobalQuery.ResultHeaders
                            .find("span.classItem-select").length == 0) {
                        ktw.App.GlobalQuery.ResultHeaders
                                .children("span").eq(0)
                                .addClass("classItem-select");
                    }*/
                    //处理图层树中取消了现有的查询结果图层的展示
                    if (ktw.App.GlobalQuery.Target.find(".poiPanel").css("display") == "block") {
                        if (headersbark.find(".classItem-select").length > 0) {
                            //如果备份的dom中发现了选中的图层说明把选中的图层给移除掉了，执行通用查询的清除
                            ktw.App.GlobalQuery.Clear();
                        }
                    }
                    //每改变图层树的选择就触发一次查询
                    if (ktw.App.GlobalQuery.Target.css("display") != "none" && ktw.App.GlobalQuery.hasSearched) {
                        ktw.App.GlobalQuery.Search();
                    }
                }
                if (ktw.App.GlobalGlandAnalysis) {
                    // 进行事件绑定
                    ktw.App.GlobalGlandAnalysis.bindSourceChangeEvent();
                    //直接将第一个tab项设置为选中状态
                    ktw.App.GlobalGlandAnalysis.ResultHeaders.children("span").removeClass("classItem-select").eq(0).addClass("classItem-select");
                    /*if (ktw.App.GlobalGlandAnalysis.ResultHeaders
                            .find("span.classItem-select").length == 0) {
                        ktw.App.GlobalGlandAnalysis.ResultHeaders
                                .children("span").eq(0)
                                .addClass("classItem-select");                        
                    }*/
                    //处理图层树中取消了现有的分析结果图层的展示
                    if (ktw.App.GlobalGlandAnalysis.Target.find(".poiPanel").css("display") == "block") {
                        if (headersbark2.find(".classItem-select").length > 0) {
                            //如果备份的dom中发现了选中的图层说明把选中的图层给移除掉了，执行通用查询的清除
                            ktw.App.GlobalGlandAnalysis.Clear();
                        }
                    }
                    //每改变图层树的选择就触发一次分析
                    if (ktw.App.GlobalGlandAnalysis.Target.css("display") != "none" && ktw.App.GlobalGlandAnalysis.hasSearched) {
                        ktw.App.GlobalGlandAnalysis.Search();
                    }
                }
                // 移除那些取消选中状态的图层
                for (var i = 0; i < layerdata_deleted.length; i++) {
                    //如果要移除的图层在当前的搜索结果内就把搜索痕迹、通用分析清空
                    try {
                        if (layerdata_deleted[i].Type == ktw.MapUtils.GetLayer("searchLayer").get("tag")) {
                            ktw.App.GlobalQuery.Clear();
                            ktw.App.GlobalGlandAnalysis.Clear();
                        };
                    } catch (ex) { }
                    ktw.MapUtils.RemoveLayer("tipicLayer" + layerdata_deleted[i].ID, ktw.App.Map);

                }
                // 绑定切换图层显示或隐藏事件
                $('.btn', layers).click(function () {
                    var isopen = $(this).hasClass("switchbtnopen");

                    var currdata = $(this).prop("data");
                    //var type = currdata.Type;
                    //if (isopen) {
                    //    $(".globalQuery #headerTop>span[tag='" + type + "']").addClass("classItem-disabled");
                    //} else {
                    //    $(".globalQuery #headerTop>span[tag='" + type + "']").removeClass("classItem-disabled");
                    //}
                    $this.ShowLayer(currdata, !isopen);
                    currdata.Visible = !isopen;
                    var sliders = $('.sliderFlg', layers);
                    for (var i = 0; i < sliders.length; i++) {
                        if ($(sliders[i]).attr("tag") == currdata.ID) {
                            $(sliders[i]).slider(isopen ? "disable" : "enable");
                            var currL = ktw.MapUtils.GetLayer("tipicLayer" + currdata.ID, ktw.App.Map);
                            var opacity = ktw.IsNull(currL) ? 1 : currL.options.opacity;
                            $(sliders[i]).slider("setValue", parseInt(opacity * 100));
                            break;
                        }
                    }
                    $($(this).parent()).removeClass(isopen ? "switchstateopen" : "switchstateclose").addClass(isopen ? "switchstateclose" : "switchstateopen");
                    $(this).removeClass(isopen ? "switchbtnopen" : "switchbtnclose").addClass(isopen ? "switchbtnclose" : "switchbtnopen");
                });
                // 触发加载选中列表后的刷新事件
                $($this).trigger("onLayoutSelectedList");
            },
            RangeLayer: function (isup, currdata) {
                var tempnode;
                if (isup)
                    tempnode = Enumerable.From(layerdata).Where('s=>s.Order>"' + currdata.Order + '"').OrderBy('$.Order').FirstOrDefault();
                else
                    tempnode = Enumerable.From(layerdata).Where('s=>s.Order<"' + currdata.Order + '"').OrderByDescending('$.Order').FirstOrDefault();
                if (ktw.IsNull(tempnode))
                    return;
                var temporder = currdata.Order;
                currdata.Order = tempnode.Order;
                tempnode.Order = temporder;
                var currlayer = ktw.MapUtils.GetLayer("tipicLayer" + currdata.ID, ktw.App.Map);
                if (!ktw.IsNull(currlayer))
                    currlayer.setZIndex(parseInt(currdata.Order));
                var templayer = ktw.MapUtils.GetLayer("tipicLayer" + tempnode.ID, ktw.App.Map);
                if (!ktw.IsNull(templayer))
                    templayer.setZIndex(parseInt(tempnode.Order));
                this.LayoutSelectedList();
                $(this).trigger("onRangeLayer");
            },
            ShowLayer: function (currdata, isvisible) {
                var currlayer = ktw.MapUtils.GetLayer("tipicLayer" + currdata.ID, ktw.App.Map);
                if (ktw.IsNull(currlayer)) {
                    // 没有该图层的情况
                    if (!isvisible)
                        return;
                    // 初始化图层
                    var tmp = ktw.GetSystemUrlByRelID(currdata.Url);
                    currdata.Url = tmp == "" ? currdata.Url : tmp;
                    switch (currdata.Type) {
                        case ktw.LayerType.Mapping:
                            {
                                var param = {
                                    Map: ktw.App.Map,
                                    ID: "tipicLayer" + currdata.ID
                                };
                                ktw.MapLoad.AddArcGISLayer($.extend({}, currdata, param));
                                break;
                            }
                        case ktw.LayerType.Tile:
                            {
                                var param = { Map: ktw.App.Map, ID: "tipicLayer" + currdata.ID };
                                //处理图例
                                if (!ktw.IsNull(currdata.Legend)) {
                                    ktw.App.Map.__legend.AddData(currdata.Legend);
                                }
                                ktw.MapLoad.AddTileLayer($.extend({}, currdata, param));
                                break;
                            }
                        case ktw.LayerType.WMS:
                            {
                                var param = {
                                    ID: "tipicLayer" + currdata.ID,
                                    Url: currdata.Url,
                                    Layers: currdata.TypeName,
                                    ServerType: currdata.ServerType ? currdata.ServerType : "hgis",
                                    Map: ktw.App.Map,
                                    ZIndex: parseInt(currdata.Order),
                                    Styles: currdata.Styles,
                                    MaxZoom: currdata.MaxZoom,
                                    MinZoom: currdata.MinZoom
                                }
                                if (!ktw.IsNull(currdata.Sld)) {
                                    var sldbody = ktw.MapUtils.LoadSLD(currdata.Sld);
                                    sldbody = sldbody.replace("%LayerName%", currdata.TypeName);
                                    param.Sldbody = sldbody;
                                    //使用sldbody时不能指定layers参数
                                    param.Layers = undefined;
                                }
                                if (!ktw.IsNull(currdata.Legend)) {
                                    ktw.App.Map.__legend.AddData(currdata.Legend);
                                }
                                //处理Filter参数
                                if (!ktw.IsNull(currdata.Filter)) {
                                    param.CQLFilter = currdata.Filter;
                                }
                                if (!ktw.IsNull(currdata.Bounds) &&
                                    !ktw.IsNull(currdata.Bounds.XMin) &&
                                    !ktw.IsNull(currdata.Bounds.XMax) &&
                                    !ktw.IsNull(currdata.Bounds.YMin) &&
                                    !ktw.IsNull(currdata.Bounds.YMax)) {
                                    var ext = currdata.Bounds;
                                    var southWest = L.latLng(parseFloat(ext.YMin), parseFloat(ext.XMin)),
                                            northEast = L.latLng(parseFloat(ext.YMax), parseFloat(ext.XMax));
                                    param.bounds = L.latLngBounds(southWest, northEast);
                                }
                                ktw.MapLoad.AddWMSLayer(param);
                                break;
                            }
                        case ktw.LayerType.WMTS:
                            {
                                var param = {
                                    Map: ktw.App.Map,
                                    ID: "tipicLayer" + currdata.ID,
                                    Layers: currdata.TypeName
                                };
                                if (!ktw.IsNull(currdata.Legend)) {
                                    ktw.App.Map.__legend.AddData(currdata.Legend);
                                }
                                if (!ktw.IsNull(currdata.Bounds) &&
                                    !ktw.IsNull(currdata.Bounds.XMin) &&
                                    !ktw.IsNull(currdata.Bounds.XMax) &&
                                    !ktw.IsNull(currdata.Bounds.YMin) &&
                                    !ktw.IsNull(currdata.Bounds.YMax)) {
                                    var ext = currdata.Bounds;
                                    var southWest = L.latLng(parseFloat(ext.YMin), parseFloat(ext.XMin)),
                                            northEast = L.latLng(parseFloat(ext.YMax), parseFloat(ext.XMax));
                                    param.bounds = L.latLngBounds(southWest, northEast);
                                }
                                ktw.MapLoad.AddWMTSLayer($.extend({}, currdata, param));
                                break;
                            }
                    }
                } else {
                    // 已经存在了该图层
                    if (!ktw.IsNull(currdata.Legend)) {
                        if (isvisible) {
                            ktw.App.Map.__legend.AddData(currdata.Legend);
                        } else {
                            ktw.App.Map.__legend.RemoveData(currdata.Legend);
                        }

                    }
                    currlayer.setVisible(isvisible);
                }
                $(this).trigger("onShowLayer", {
                    currdata: currdata,
                    isvisible: isvisible
                });
            },
            GetData: function (data, MapLayer, layerdata) {
                // 获取后台配置图层树的数据,以及默认显示的图层
                if (!ktw.IsArray(MapLayer))
                    MapLayer = [MapLayer];
                var curarr = Enumerable.From(MapLayer).Where(
                        "s=>s.Visible!='false'").OrderBy(
                        "x=>x.Order").ToArray();
                for (var i = 0; i < curarr.length; i++) {
                    var layer = {};
                    layer.Tag = curarr[i];
                    $.extend(layer, {
                        "Value": curarr[i].ID,
                        "Text": curarr[i].Text,
                        "State": curarr[i].Open === "true" ? "open"
                                : "close",
                        "Checked": (curarr[i].Checked === true || curarr[i].Checked == "true"),
                        "iconCls": curarr[i].IconCls,
                        "icon": curarr[i].Icon
                    });
                    data.push(layer);
                    min = 500;
                    if (curarr[i].Url && curarr[i].Url != ""
                            && (curarr[i].Checked === true || curarr[i].Checked == "true")) {
                        curarr[i].Order = min--;
                        layerdata.push(curarr[i]);
                    }
                    if (curarr[i].Children
                            && curarr[i].Children.MapLayer) {
                        layer.Child = [];
                        this.GetData(layer.Child, curarr[i].Children.MapLayer, layerdata);
                    }
                }
            },
            InitTree: function (layertreedata) {
                var $this = this;
                var tree_control = new ktw.Tree({
                    CheckBox: true,
                    ValueField: "Value",
                    TextField: "Text",
                    ChildrenField: "Child",
                    CheckedField: "Checked",
                    Data: layertreedata,
                    StateField: "State",
                    TagField: "Tag"
                });

                tree_control.Target.bind("onChecking", function (evt, arg) {
                }).bind("onChecked", function (evt, arg) {
                    // 首先获取所有选中的图层列表
                    var nodes = tree_control.GetChecked(true);
                    // 只获取哪些具有url属性的节点
                    var tmp = [];
                    layerdata_deleted = [];
                    tmp = $(nodes).map(function (i, item) {
                        var lay = $(item).prop("$this")["Tag"];
                        if (lay.Url && lay.Url != "") {
                            return lay;
                        }
                    });
                    // 用选中的图层列表去过滤layerdata,去掉那些不在当前选中节点列表中的图层
                    $this.layerdata = layerdata = $.map(layerdata, function (item, i) {
                        var flag = false;
                        for (var i = 0; i < tmp.length; i++) {
                            if (tmp[i].ID == item.ID) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
                            return item;
                        } else {
                            layerdata_deleted.push(item);
                        }
                    });
                    // 将还没有添加到选中图层列表的节点,添加到列表中,从后面依次添加,Order重新赋值,递减
                    var min = 500;
                    $(tmp).each(function (i, item) {
                        var flag = false;
                        for (var i = 0; i < layerdata.length; i++) {
                            if (layerdata[i].ID == item.ID) {
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) {
                            if (layerdata.length > 0) {
                                item.Order = parseInt(layerdata[0].Order) + 1;
                            } else {
                                item.Order = ++min;
                            }
                            // 新添加到地图中的图层默认是显示的
                            item.Visible = true;
                            layerdata.unshift(item);
                        }
                    });
                    // 先把图例隐藏
                    if (ktw.App.Legend) {
                        ktw.App.Legend.SetVisible(false);
                    }

                    // 如果有通用查询就把通用查询恢复初始状态
                    //if (ktw.App.GlobalQuery) {
                    //    ktw.App.GlobalQuery.ShowPanel(false);
                    //    ktw.App.GlobalQuery.Clear();
                    //}
                    $this.LayoutSelectedList();
                    checkflag = true;
                    evt.preventDefault();
                }).bind("onClick", function () {
                    if (checkflag) { checkflag = false; return; }
                    if ($(arguments[1]).find("span.arrow.expanded").length > 0) {
                        tree_control.Collapse(arguments[1]);
                    } else {
                        tree_control.Expand(arguments[1]);
                    }
                }).bind("onContextMenu", function (e, data) {
                    e.preventDefault();
                    try {
                        $this.contextLayer = null;
                        $this.contextLayer = $(data.target).prop("$this").Tag;
                    } catch (ex) { }
                    if ($this.contextLayer && (!ktw.IsNull($this.contextLayer.Url) || !ktw.IsNull($this.contextLayer.OWS)))
                        $('#mtree').menu('show', { left: data.event.pageX, top: data.event.pageY });
                });

                var pos = ArrayOfMapLayer.Default.Position;
                var css = {
                    top: "5px",
                    left: "5px"
                };
                if (pos.Top || pos.Top == "0") {
                    css.top = pos.Top + "px";
                }
                if (pos.Left || pos.Left == "0") {
                    css.left = pos.Left + "px";
                }
                var size = ArrayOfMapLayer.Default.Size;
                css = $.extend(css, {
                    width: "300px",
                    height: "500px"
                });
                if (size || size.Width) {
                    size.width = parseFloat(size.Width) + "px";
                }
                if (size || size.Height) {
                    size.height = parseFloat(size.Height) + "px";
                }
                var popbox = $this.PopBox = new ktw.PopBox({
                    ID: "total-layertree",
                    Position: pos,
                    Size: size,
                    Parent: ktw.App.MapPanel.Target,
                    ContentIconCls: "icon-type",
                    ContentTitle: "图层树"
                });
                $("#total-layertree").css("z-index", 3).find(".popbox-icon>").hover(function () {
                    $(this).css({
                        //"background-color": "#0099CC",
                        "opacity": "1",
                        //"background-image": "url(../image/layer.bar2.png)"
                    });
                }, function () {
                    $(this).css({
                        //"background-color": "#0099CC",
                        "opacity": "0.8",
                        //"background-image": "url(../image/layer.png)"
                    });
                });
                popbox.Add(tree_control.Target);
            },
            InitSelectedList: function () {
                // 初始化选中的图层列表
                var pos = ArrayOfMapLayer.Selected.Position;
                var css = {
                    top: "5px",
                    left: "5px"
                };
                if (pos.Top || pos.Top == "0") {
                    css.top = pos.Top + "px";
                }
                if (pos.Left || pos.Left == "0") {
                    css.left = pos.Left + "px";
                }
                var size = ArrayOfMapLayer.Selected.Size;
                css = $.extend(css, {
                    width: "300px",
                    height: "500px"
                });
                if (size || size.Width) {
                    size.width = parseFloat(size.Width) + "px";
                }
                if (size || size.Height) {
                    size.height = parseFloat(size.Height)
                            + "px";
                }
                var popbox = new ktw.PopBox({
                    ID: "selectLayer",
                    Position: pos,
                    Size: size,
                    Parent: ktw.App.MapPanel.Target,
                    ContentIconCls: "icon-type",
                    ContentTitle: "选中图层"
                });
                $("#selectLayer").css("z-index", 3).find(".popbox-icon").hover(function () {
                    //$(this).find(".icon").css("background-position", "-480px -113px");
                    $(this).css("opacity", "1");
                }, function () {
                    //$(this).find(".icon").css("background-position", "-464px -113px");
                    $(this).css("opacity", "0.8");
                });
                layers = $("<div class='tipicLayer' style='position: absolute; margin-top: 0px;'></div>");
                popbox.Add(layers);
            },
            ShowLayerData: function (layerinfo) {
                ktw.App.BottomPanel.Clear();
                ktw.App.BottomPanel.SetVisible(true);
                if (ktw.App.GlobalQuery) {
                    ktw.App.GlobalQuery.Clear();
                }
                ktw.App.BottomPanel.Add(ktw.App.Root
                        + "html/onemap/layerdata.html", {
                            layerinfo: layerinfo
                        });
            },
            InitTreeMenu: function () {
                var $this = this;
                var dom = '<div id="mtree" class="easyui-menu" style="width: 120px; border: 0px">' +
        '<div id="miProp" data-options="iconCls:\'icon-print\'">查看属性表</div>' +
        '<div id="miNavLayer" data-options="iconCls:\'icon-search\'">缩放至图层</div>' +
        '<div id="layer_exout" data-options="iconCls:\'icon-search\'">导出属性表</div>' +
    '</div>';
                var menu = $(dom);
                menu.menu({
                    onShow: function () {
                        //右键菜单出现时图层树不能自动收缩
                        $this.PopBox.CanFlex = false;
                    },
                    onHide: function () {
                        //右键菜单隐藏时图层树可以自动收缩
                        $this.PopBox.CanFlex = true;
                    }
                });
                $(document.body).append(menu);
                //查看属性表
                menu.find("#miProp").click(function () {
                    if (ktw.App.LayerTree.contextLayer.Type != ktw.LayerType.WMS) {
                        ktw.Alert_Short("当前图层不支持查看属性!");
                        return;
                    }
                    ktw.App.LayerTree.ShowLayerData(ktw.App.LayerTree.contextLayer);
                });
                //缩放至图层
                menu.find("#miNavLayer").click(function () {
                    var ext;
                    try {
                        var layer = ktw.MapUtils.GetLayer("tipicLayer" +
                        ktw.App.LayerTree.contextLayer.ID);
                        var ext = ktw.App.LayerTree.contextLayer.Extent;
                        if (!ext) ext = ktw.App.LayerTree.contextLayer.Bounds;
                        if (ext && ext.XMin) {
                            var southWest = L.latLng(parseFloat(ext.YMin), parseFloat(ext.XMin)),
                                            northEast = L.latLng(parseFloat(ext.YMax), parseFloat(ext.XMax)),
                                            bounds = L.latLngBounds(southWest, northEast);

                            ktw.App.Map.fitBounds(bounds, { animate: true, duration: 1 });
                        } else {
                            if (ktw.App.LayerTree.contextLayer.LayerType == "WMTS") {
                                ktw.Alert_Short("WMTS图层不支持自动缩放至图层!");
                                return;
                            }
                            var tmp = ktw.GetSystemUrlByRelID(ktw.App.LayerTree.contextLayer.Url);
                            var url = tmp == "" ? ktw.App.LayerTree.contextLayer.Url : tmp;
                            url += "?service=wms&version=1.1.1&request=GetCapabilities&format=text/xml";
                            //通过ajax请求当前GetCapabilities服务地址
                            $.ajax({
                                type: "Get",
                                url: url,
                                dataType: "text",
                                async: true,
                                success: function (text) {
                                    var result = $.xml2json(text);
                                    for (var i = 0; i < result.Capability.Layer.Layer.length; i++) {
                                        if (result.Capability.Layer.Layer[i].Name == ktw.App.LayerTree.contextLayer.TypeName.split(":")[1]) {
                                            var box = result.Capability.Layer.Layer[i].LatLonBoundingBox;
                                            var southWest = L.latLng(parseFloat(box.miny), parseFloat(box.minx)),
                                                northEast = L.latLng(parseFloat(box.maxy), parseFloat(box.maxx)),
                                                bounds = L.latLngBounds(southWest, northEast);

                                            ktw.App.Map.fitBounds(bounds, { animate: true, duration: 1 });
                                            break;
                                        }
                                    }

                                },
                                error: function (res) {
                                    ktw.Alert_Short("无法缩放图层范围!");
                                }
                            });
                        }
                    } catch (ex) { }
                });
                //导出属性表
                menu.find("#layer_exout").click(function () {
                    if (ktw.App.LayerTree.contextLayer.Type != ktw.LayerType.WMS) {
                        ktw.Alert_Short("当前图层不支持导出!");
                        return;
                    }
                    var wfs = ktw.GetSystemUrlByRelID(ktw.App.LayerTree.contextLayer.Url);
                    if (wfs == "") wfs = ktw.App.LayerTree.contextLayer.Url;
                    var url = wfs + "?service=wfs&version=1.0.0&request=getfeature&typename=" + ktw.App.LayerTree.contextLayer.TypeName + "&outputformat=excel";
                    window.top.open(url);
                });
            }
        });
    }
    ;
})(jQuery);

/* 地图冒泡提示 */
(function ($) {
    var ucMapTip = null;
    var detailPanel;
    var detailBox;
    var isDetail = false;
    ktw.ShowMapTip = function (feature, param) {
        if (ktw.IsNull(feature) || ktw.IsNull(param))
            return;
        if (feature.type != 'Feature' && feature.type != 'FeatureCollection') {
            feature = feature.toGeoJSON();
        }
        // 根据feature获取中心点
        var center = L.geoJson(feature).getBounds().getCenter();
        if (ucMapTip === null) {
            ucMapTip = new ktw.UCMapTip({
                ID: ktw.IsNull(param.ID) ? "mapTip" : param.ID,
                Title: ktw.IsNull(param.Title) ? "详细信息" : param.Title,
                IconUri: ktw.IsNull(param.IconUri) ? "" : param.IconUri,
                Position: center,
                Width: 280,
                Height: 271
            });
            ucMapTip.SetPosition(center, ktw.TrianglePosition.Left,
					ktw.TrianglePosition.Left);
            $(ucMapTip).one("onClosed", function () {
                ucMapTip = null;
                //ktw.App.LifeCtr.HideFlash();//关闭窗口的时候，隐藏生命周期框
            });
            detailBox = new ktw.Box({
                Width: 278,
                Height: 243,
                HasBorder: true
            });
            ucMapTip.Add(detailBox.Target);
            detailPanel = $('<div class="MapTipContent"></div>');
            detailBox.SetContent(detailPanel);
        } else {
            ucMapTip.SetPosition(center, ktw.TrianglePosition.Left);
        }
        ktw.MapTipContent(feature, param);
    };
    ktw.ClearMapTip = function () {
        if (!ktw.IsNull(ucMapTip))
            ucMapTip.Close();
    }
    ktw.MapTipContent = function (data, param) {
        detailPanel.empty();
        detailPanel.css("margin-top", "0px");
        var title, DetailInfo;
        //title = "详细信息";
        title = ktw.IsNull(param.Title) ? "详细信息" : param.Title,
        ucMapTip.SetTitle(title);
        if (param.Content) {
            //如果传递进来内容
            detailPanel.append(param.Content);
        }
        detailBox.Layout();
    };
})(jQuery);

/* 通用查询 */
(function ($) {
    ktw.GlobalQuery = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        // 初始化layerinfoconfiger
        var $this = this;
        $this.init = function (opt) {
            $this.curText = undefined;
            $this.curLayerinfo = undefined;
            $this.curFilter = undefined;
            $this.finalFilter = undefined;
            $this.drawfeature = undefined;//当前绘制的元素
            $this.drawfeature_epsg = undefined;//当前绘制的元素的epsg
            $this.bufferRadius = 0;// 缓冲半径
            $this.dataGrid = undefined;;
            $this.polyganKey = undefined;;
            $this.curPageStyle = undefined;
            $this.totalFeatures = undefined;
            $this.PageIndex = ktw.IsNumber(opt.PageIndex) ? opt.PageIndex : 1;
            $this.PageSize = ktw.IsNumber(opt.PageSize) ? opt.PageSize : 5;
            $this.LayerInfoConfiger = [];
            $this._timeout;
            (function getData(MapLayer) {
                if (!ktw.IsArray(MapLayer))
                    MapLayer = [MapLayer];
                var curarr = Enumerable.From(MapLayer).Where(
                        "s=>s.Visible!='false'").OrderBy("x=>x.Order").ToArray();
                for (var i = 0; i < curarr.length; i++) {
                    $this.LayerInfoConfiger.push(curarr[i]);
                    if (curarr[i].Children && curarr[i].Children.MapLayer) {
                        getData(curarr[i].Children.MapLayer);
                    }
                }
            })(ktw.App.Config.SystemMap.ArrayOfMapLayer.MapLayer);
            $this.curLayerinfo = $this.LayerInfoConfiger[0];
            var version = $this.curLayerinfo.ServerType == "geoserver" ? "1.0.0"
                : "2.0.0";
            $this.initDomx();
            $this.shapeType = ktw.DrawType.Polygon;
            $this.draw = (function () {
                var draw = ktw.App.Draw;
                draw.unbind("onDrawCompleted.query");
                draw.bind("onDrawCompleted.query", function (e, obj) {
                    if ($this.Target.css("display") == "none") return;
                    $this.drawfeature = obj.obj;
                    $this.SearchButton.click();
                });
                return draw;
            })();
            $this.queryOption = {
                startIndex: $this.PageIndex,
                //count: $this.PageSize,
                maxFeatures: $this.PageSize,
                typename: $this.curLayerinfo.TypeName,
                url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url),
                where: "",
                successFunc: function (res) {
                    clearTimeout($this._timeout);
                    $this.HeaderPanel.show();
                    $this.DataPanel.show();
                    $this.ShowPanel();//结果框展示
                    if ($this.totalFeatures == undefined) {
                        $this.totalFeatures = res.totalFeatures;
                    }
                    var pageInfo = {
                        pageIndex: $this.PageIndex,
                        pageSize: $this.PageSize,
                        totalCount: $this.totalFeatures,
                        msg: "共{total}条数据"
                    };
                    $this.dataGrid.Load(res.features, pageInfo);
                    $this.waitbox.Close();
                },
                failFunc: function (res) {
                    $this.waitbox.Close();
                    $this.dataGrid.Load([], { totalCount: 0, pageIndex: 1, pageSize: 5 });
                    ktw.Error(res);
                    console.error(res);
                }
            }
        }
        $this.initDomx = function () {
            var dom = [];
            dom.push('<div class="globalQuery">');
            dom.push('  <div id="divSearch" class="searchBox">');
            dom.push('   <div id="txtKey" class="ktw-textbox" style="width: 300px; height: 30px; line-height: 30px; float: left;" opt=\'{"TipInfo":"请输入关键字","TextAlign":"center"}\'></div>');
            dom.push('   <div  class="searchButton">搜索</div>');
            dom.push('  </div>');
            dom.push('  <div class="resultPanel">');
            dom.push('    <div class="headerPanel">');
            dom.push('      <div id="headerTop" class="clearfix" style="margin-left: 5px;">');
            // TO DO 改为读取配置文件添加
            dom.push('      </div>');
            dom.push('     </div>');
            dom.push('    <div class="poiPanel"></div>');
            dom.push('  </div>');
            dom.push('  <div class="spatialBox">');
            dom.push('   <div class="Button" title="矩形" shapetype="Rectangle" style="margin-left:5px;">');
            dom.push('     <div class="icon-draw-rect" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div title="清除绘制图形" class="Button" shapetype="Clear">');
            dom.push('     <div class="icon-maptool-clearmap2" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('<div class="popsearch">');
            dom.push('   <div class="Button" title="多边形" shapetype="Polygon">');
            dom.push('     <div class="icon-draw-polygon" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="圆" shapetype="Circle">');
            dom.push('     <div class="icon-draw-circle" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="点" shapetype="Point">');
            dom.push('     <div class="icon-draw-point" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="导入坐标文件" shapetype="File">');
            dom.push('     <div class="icon-draw-import" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('<input type="file" accept="text/plain" id="ImportFile" name="coorfile" style="display:none" />')
            dom.push('  </div>');
            dom.push('</div>');
            dom.push(' </div>');
            $this.Target = $(dom.join(''));
            $this.Target.find(".spatialBox").hover(function () {
                $(this).height(55);
                $this.Target.find(".popsearch").show();
            }, function () {
                $(this).height(28);
                $this.Target.find(".popsearch").hide();
            })
            //ktw.App.MapPanel.Target.append($this.Target);
            $(".commontab").append($this.Target);
            ktw.InitControl();// 初始化框架控件
            //绑定回车键
            $this.Target.find("input:text").keydown(function (evt) {
                if (evt.keyCode == 13) {
                    $this.Target.find(".searchButton").click();
                }
            });
            $this.DrawButtons = $this.Target.find(".Button");
            $this.SearchButton = $this.Target.find(".searchButton");
            $this.ResultPanel = $this.Target.find(".resultPanel");
            $this.DataPanel = $this.Target.find(".poiPanel");
            $this.waitbox = new ktw.UCWaitBox($this.DataPanel);
            $this.ResultHeaders = $this.Target.find("#headerTop");
            $this.HeaderPanel = $this.Target.find(".headerPanel");
            $this.Target.find("#txtKey").hover(function () {
                if ($this._timeout) clearTimeout($this._timeout);
                if ($this.ResultPanel.css("display") == "none") {
                    $this.DataPanel.hide();
                    $this.HeaderPanel.show();
                    $this.ResultPanel.show();
                }
            }, function () {
                if ($this.ResultPanel.css("display") == "block" && $this.DataPanel.css("display") == "none") {
                    $this._timeout = setTimeout(function () {
                        $this.DataPanel.show();
                        $this.HeaderPanel.show();
                        $this.ResultPanel.hide();
                    }, 100);
                }
            });
            $this.HeaderPanel.hover(function () {
                if ($this._timeout) clearTimeout($this._timeout);
            }, function () {
                if ($this.ResultPanel.css("display") == "block" && $this.DataPanel.css("display") == "none") {
                    $this._timeout = setTimeout(function () {
                        $this.ResultPanel.hide();
                        $this.DataPanel.show();
                        $this.HeaderPanel.show();
                    }, 100);
                }
            });
            $this.DrawButtons.click(function () {
                spatialFilter = "";
                $this.drawfeature = null;
                $this.draw.clear();
                var type = $(this).attr("shapetype");
                switch (type) {
                    case "Rectangle":
                    case "Polygon":
                    case "Circle":
                    case "Point": {
                        $this.totalFeatures = undefined;
                        $this.Draw(type, $this);
                        break;
                    }
                    case "Clear": {
                        $this.Clear();
                        break;
                    }
                    case "File": {
                        ////暂时屏蔽导入查询功能
                        //ktw.Alert_Short("功能未提供!");
                        //return;
                        $this.Clear();
                        $this.Target.find("#ImportFile").bind("change", (function () {
                            if ($.trim($(this).val()) == "")
                                return;
                            var baseUri = ktw.App.ServerUrl;
                            var url = baseUri + "layer/fetchcoor";
                            $.ajaxFileUpload({
                                url: url, // 用于文件上传的服务器端请求地址
                                type: 'post',
                                data: {}, // 此参数非常严谨，写错一个引号都不行
                                secureuri: false, // 一般设置为false
                                fileElementId: 'ImportFile',
                                dataType: 'json', // 返回值类型
                                // 一般设置为json
                                success: function (data, status) // 服务器成功响应处理函数
                                {
                                    $("#ImportFile").val("");
                                    $this.refreshCurrlayer();
                                    if (status && data.success) {
                                        if (ktw.App.RightPanel) {
                                            ktw.App.RightPanel.SetVisible(false);
                                        }
                                        if (ktw.App.BottomPanel) {
                                            ktw.App.BottomPanel.SetVisible(false);
                                        }

                                        ktw.App.GlobalQuery.Clear();
                                        var arr = data.data.split('#');
                                        var wkt = '';
                                        for (var i = 0; i < arr.length; i++) {
                                            var tmp = arr[i].split(',');
                                            if (tmp.length < 2) {
                                                ktw.Alert("坐标格式不规范,请检查!");
                                                /**
                                                 * 113.06647008888432,27.878057293379666
                                                 * 113.06647008888432,27.818319134199978
                                                 * 113.15710729591557,27.818319134199978
                                                 * 113.15710729591557,27.878057293379666
                                                 * 113.06647008888432,27.878057293379666
                                                 * 113.06647008888432,27.878057293379666
                                                 */
                                                return;
                                            }
                                            wkt += "," + tmp[0] + " ";
                                            wkt += tmp[1];
                                        }
                                        wkt = 'POLYGON((' + wkt.substring(1) + "))";
                                        var read = new ktop.Wkt.Wkt();
                                        read.read(wkt);
                                        $this.drawfeature = read.toObject(true);
                                        //将图形加入绘制图层,统一管理
                                        ktw.App.Draw.Container.addLayer($this.drawfeature);
                                        var optionp = {
                                            weight: 1,
                                            color: '#ff0000',
                                            fill: true,
                                            fillColor: '#ffffff',
                                            fillOpacity: 0.3,
                                            zIndex: 500
                                        }
                                        $this.drawfeature.setStyle(optionp);
                                        ktw.App.Map.fitBounds($this.drawfeature.getBounds(), {
                                            animate: true,
                                            duration: 1
                                        });
                                        $this.Search();
                                    } else {
                                        ktw.Alert(data.message);
                                    }
                                },
                                error: function (data,
                                        status, e)// 服务器响应失败处理函数
                                {
                                    $("#ImportFile")
                                            .val("");
                                    ktw.Alert(e);
                                }
                            });
                            return false;
                        }));
                        $this.Target.find("#ImportFile").click();
                    }
                }
            });
            // 文本框输入变化事件
            $this.Target.find("#txtKey").prop("$this").bind("onChange",
                    function (s, e) {
                        //搜索条件发生变化时不再清除
                        /*$this.ShowPanel(false);
                        $this.Clear();*/
                    });
            // 查询按钮点击事件
            $this.SearchButton.click(function () {
                $this.Search();
            });
        }
        $this.Search = function () {
            //不清除绘制图层
            $this.Clear(1);
            $this.totalFeatures = undefined;
            $this.ShowPanel(false);
            //通用查询不再清除上一个菜单页面
            //ktw.App.ClearPreWidget();
            $this.Target.find(".classItem-select").eq(0).click();// 默认查询第一个
        }

        $this.refreshCurrlayer = function () {
            // 设置当前要进行查询的图层
            var item = $this.Target.find("#headerTop>span.classItem-select").not(".classItem-disabled");
            if (item.length == 0) {
                ktw.Alert("未找到可查询的图层,请使图层在选中列表后再查询!");
                return false;
            }
            if (item.length > 0) {
                for (var i = 0; i < ktw.App.GlobalQuery.LayerInfoConfiger.length; i++) {
                    if (item.attr("tag") == ktw.App.GlobalQuery.LayerInfoConfiger[i].Type) {
                        $this.curLayerinfo = ktw.App.GlobalQuery.LayerInfoConfiger[i];
                        break;
                    }
                }
                return true;
            }
        }
        $this.initDataGrid = function (target) {
            // 初始化dataGrid
            var taxView = $.extend({}, $.fn.datagrid.defaults.view,
                            {
                                renderRow: function (target, fields, frozen,
                                              rowIndex, rowData) {
                                    var col = [];
                                    // 必须保证有显示的字段列表,即使是没有的字段名
                                    if (ktw.IsNull($this.curLayerinfo.DisplayFields)) {
                                        $this.curLayerinfo.DisplayFields = "#emptyname#,#emptyaddress#";
                                    }
                                    rowData.properties = rowData.properties || {};
                                    var data = rowData.properties;
                                    var key = $this.curLayerinfo.DisplayFields.split(",");
                                    var name = ktw.IsNull(data[key[0]]) ? "暂无信息"
                                            : data[key[0]];
                                    var address = ktw.IsNull(data[key[1]]) ? "暂无信息"
                                            : data[key[1]];
                                    col.push('<td>');
                                    col.push(' <div style="width: 387px; height: 60px; margin: 5px; position: relative;">');
                                    col.push(' <span style="width: 24px; height: 36px; position: absolute; left: 3px; top: 6px; background-image: url(image/poi_red.png)">');
                                    col.push('   <b style="font-size: 15px; color: white; position: absolute; left: 8px; top: 3px;">' + (rowIndex + 1) + '</b></span>');
                                    col.push(' <span style="position: absolute; left: 35px; top: 10px; max-height:30px;overflow:hidden;color: blue;" title="' + name + '">' + name + '</span>');
                                    col.push(' <span style="position: absolute; left: 35px; top: 35px;">' + address + '</span>');
                                    col.push('</div>');
                                    col.push('</td>');
                                    return col.join('');
                                }
                            });
            $this.dataGrid = new ktw.UCDataGrid({
                ID: "resultGrid",
                View: taxView,
                RowNumbers: false,
                FitColumns: false,
                ShowHeader: false,
                PageIndex: target.PageIndex,
                PageSize: target.PageSize,
                CSS: {
                    "height": target.DataPanel.height() + "px",
                    "width": target.ResultPanel.width() + "px"
                },
                pagequery: false,
                buttons: $("<div/>")
            });

            target.DataPanel.append($this.dataGrid.Target);
            $this.dataGrid.Layout([]);

            // 分页变化事件
            $this.dataGrid.Target.bind("onSelectPage", function (s, e) {
                $this.PageIndex = e.index;
                $this.queryOption.startIndex = (e.index - 1) * e.size;
                ktw.WFSQ($.extend($this.queryOption, { startIndex: (e.index - 1) * e.size }));
            });
            // 行选中事件
            $this.dataGrid.Target.bind("onSelectRow", { target: target }, function (s, e) {
                if (ktw.App.LifeCtr) {
                    ktw.App.LifeCtr.Hide();
                }
                $this.SelectRowData = e.Row;
                var type = $this.ResultHeaders.find(".classItem-select").attr("tag");
                if (['p', 'z', 'c', 'g', 'y', 'b', 'w'].contains(type)) {
                    //hgis生成id的机制不同于geoserver
                    var guid = e.Row.properties[ktw.App.GlobalQuery.curLayerinfo.Key];
                    if (guid == undefined) {
                        ktw.Alert("未获取到数据关键字,请检查配置!");
                        console.error("未获取到数据关键字,请检查配置!检查配置的主键字段[" + ktw.App.GlobalQuery.curLayerinfo.Key + "],后台发布postgis图层要勾选暴露主键复选框!");
                        return;
                    }
                    $.ajax({
                        type: "get",
                        async: true,
                        url: ktw.App.ServerUrl + "layer/lifecycel/" + type + "/" + guid,
                        success: function (res) {
                            if (res.success) {
                                ktw.App.LifeCtr.Load(res.data, type);
                                ktw.App.LifeCtr.Show();
                                ktw.App.LifeCtr.ShowType();
                            }
                        }
                    });
                    return;
                }
                ktw.App.HighLight.hightLightFit(e.Row);
                var data = e.Row;
                var content = $("<div></div>");
                var fields = $this.curLayerinfo.DetailFields.Field;
                for (var i = 0; i < fields.length; i++) {
                    var rowdiv = $(
                            '<div class="row"><div class="Title">'
                                    + fields[i].ByName
                                    + '</div><div class="Content" title="'
                                    + (ktw.IsNull(data.properties[fields[i].Name]) ? "-"
                                            : data.properties[fields[i].Name])
                                    + '">'
                                    + (ktw.IsNull(data.properties[fields[i].Name]) ? "-"
                                            : data.properties[fields[i].Name])
                                    + '</div></div>').appendTo(content);
                }
                ktw.ShowMapTip(e.Row, {
                    ID: "taxInfo",
                    Title: "详细信息",
                    Content: content
                });
            });
        }
        $this.Draw = function (_shapeType, target) {
            $this.shapeType = _shapeType;
            if (!$this.refreshCurrlayer()) return;
            $this.draw.start($this.shapeType);// 开始画
        }
        // 根据数据类型查询
        $this.searchByType = function (type, target) {
            $this.curLayerinfo = Enumerable.From(target.LayerInfoConfiger).Where(
                's=>s.LifeCycle=="' + type + '"').FirstOrDefault();
            if (ktw.IsNull($this.curLayerinfo) || ktw.IsNull($this.curLayerinfo.TypeName)) {
                $this.curLayerinfo = Enumerable.From(target.LayerInfoConfiger).Where(
                's=>s.ID=="' + type.substring(3) + '"').FirstOrDefault();
            }
            if (ktw.IsNull($this.curLayerinfo) || ktw.IsNull($this.curLayerinfo.TypeName)) return;
            // 构造过滤条件
            $this.curFilter = "";
            //加入配置项Filter
            if ($this.curLayerinfo.Filter) {
                $this.curFilte = $this.curLayerinfo.Filter;
            }
            if ($this.curLayerinfo.SearchFields && $this.curLayerinfo.SearchFields.length > 0 && $this.curText) {
                var arryKey = $this.curLayerinfo.SearchFields.split(",");
                for (var i = 0; i < arryKey.length; i++) {
                    $this.curFilter += " OR " + arryKey[i] + " LIKE '%" + $this.curText + "%'";
                }
                if ($this.curFilter.length > 0) {
                    $this.curFilter = $.trim($this.curFilter.substring(3));
                } else {
                    $this.curFilter = undefined;
                }
            }

            $this.addWMS($this.curFilter, $this.drawfeature, target, $this.bufferRadius);
        }
        // 根据条件渲染和查询,attr:字符串查询语句,feature:要素,target:global实例
        $this.addWMS = function (attr, feature, target) {
            var spatial_wms, spatial_wfs;
            if (!ktw.IsNull(feature)) {
                var radius;
                if ($this.shapeType === ktw.DrawType.Circle) {
                    radius = feature.getRadius();
                }
                var tmp = ktw.Project.Transform(ktw.EPSG, $this.curLayerinfo.EPSG, feature.toGeoJSON());
                var wkt_wms = ktw.GetWKTByFeature(tmp, false);
                var wkt_wfs = ktw.GetWKTByFeature(tmp, true);
                if ($this.shapeType === ktw.DrawType.Circle) {
                    spatial_wms = ktw.MapUtils.GetCql_DWITHIN(wkt_wms,
                            $this.bufferRadius + radius);
                    spatial_wfs = ktw.MapUtils.GetCql_DWITHIN(wkt_wfs,
                            $this.bufferRadius + radius);
                } else if ($this.shapeType === ktw.DrawType.Point) {
                    spatial_wms = ktw.MapUtils.GetCql_INTERSECTS(wkt_wms);
                    spatial_wfs = ktw.MapUtils.GetCql_INTERSECTS(wkt_wfs);
                } else {
                    spatial_wms = ktw.MapUtils
                            .GetCql_DWITHIN(wkt_wms);
                    spatial_wfs = ktw.MapUtils
                            .GetCql_DWITHIN(wkt_wfs);
                }
                spatial_wms = spatial_wms.replace("the_geom",
                        $this.curLayerinfo.GeometryName);
                spatial_wfs = spatial_wfs.replace("the_geom",
                        $this.curLayerinfo.GeometryName);

            }
            finalFilter = "";
            if (!ktw.IsNull(spatial_wfs))
                finalFilter += "AND " + spatial_wfs;
            if (!ktw.IsNull(attr))
                finalFilter += "AND (" + attr + ") ";
            finalFilter = $.trim(finalFilter.substring(3));
            var final_wms = "";
            if (!ktw.IsNull(spatial_wms))
                final_wms += "AND " + spatial_wms;
            if (!ktw.IsNull(attr))
                final_wms += "AND (" + attr + ") ";
            final_wms = $.trim(final_wms.substring(3));
            // 加载渲染底图
            var wmsparam = {
                ID: "temp_search",
                CQLFilter: final_wms,
                Url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url),
                Sldbody: ktw.MapUtils.LoadSLD(ktw.App.Root + "config/searchpolygon.sld").replace("%LayerName%", $this.curLayerinfo.TypeName),
                ServerType: $this.curLayerinfo.ServerType,
                Map: ktw.App.Map,
                Styles: $this.curLayerinfo.Styles,
                ZIndex: 9999
            };
            ktw.MapUtils.RemoveLayer(wmsparam.ID, ktw.App.Map);
            ktw.MapLoad.AddWMSLayer(wmsparam);
            var startIndex = ($this.PageIndex - 1) * $this.PageSize;
            $.extend($this.queryOption, {
                url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url), //wfs服务地址
                typename: $this.curLayerinfo.TypeName, //查询图层名称
                startIndex: startIndex,//总记录数索引
                count: $this.PageSize,//页面大小
                where: finalFilter, //过滤条件;
                //version: "1.1.0"
            });
            $this.totalFeatures = undefined;
            $this.waitbox.Show();
            ktw.WFSQ($this.queryOption);
        }
        // 显示搜索的结果框
        $this.ShowPanel = function (bVisible) {
            if (ktw.IsNull(bVisible))
                bVisible = true;
            if (bVisible)
                this.ResultPanel.slideDown();
            else
                this.ResultPanel.hide();
        }
        // 清除冒泡和动画,flag=1:不清除绘制的图层,默认会把绘制的图层也清除掉
        $this.Clear = function (flag) {
            if (flag != 1) {
                //清除已经产生的绘制的数据
                $this.drawfeature = null;
                // 清除绘图框的数据
                ktw.App.Draw.clear();
                $this.hasSearched = false;
                //清除搜索属性条件
                $this.Target.find("#txtKey").prop("$this").Clear();
            }

            // 隐藏结果面板
            this.ShowPanel(false);
            // 清除提示框
            ktw.ClearMapTip();
            // 清除临时图层
            ktw.MapUtils.ClearTempLayer(ktw.App.Map);
            //清除高亮
            ktw.App.Map.HighLightContainer.clear();
            //清除测量
            ktw.MeasureClear();
            //清除土地生命周期导航
            if (ktw.App.LifeCtr) {
                ktw.App.LifeCtr.Hide();
            }
        }
        // 绑定事件
        $this.bind = function () {
            this.Target.bind(arguments[0], arguments[1], arguments[2]);
            return this;
        },
        // 解绑事件
        $this.unbind = function (eventName) {
            this.Target.unbind(eventName);
            return this;
        }
        // 绑定事件
        $this.bindSourceChangeEvent = function () {
            $this.Target.find(".classItem").unbind(
                    "mouseenter mouseleave click").mouseenter(function () {
                        if ($(this).hasClass("classItem-select"))
                            return;
                        $(this).addClass("classItem-hover");
                    }).mouseleave(function () {
                        $(this).removeClass("classItem-hover");
                    }).click(function () {
                        if ($(this).hasClass("classItem-disabled"))
                            return;
                        $(this).siblings().removeClass("classItem-select");
                        $(this).addClass("classItem-select");
                        $this.refreshCurrlayer();
                        //当切换查询图层时不进行实际查询
                        if ($this.DataPanel.css("display") == "none" && $this.ResultPanel.css("display") == "block") return;
                        $this.hasSearched = true;
                        $this.curText = $.trim($this.Target.find("#txtKey").prop(
                                "$this").GetValue());
                        var type = $(this).attr("tag");
                        $this.searchByType(type, $this);
                    });
        }
        $this.init(opt);
        $this.initDataGrid($this);
    }
})(jQuery);

//通用分析
(function ($) {
    ktw.GlobalGlandAnalysis = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        $this.init = function (opt) {
            $this.curText = undefined;
            $this.curLayerinfo = undefined;
            $this.curFilter = undefined;
            $this.finalFilter = undefined;
            $this.drawfeature = undefined;//当前绘制的元素
            $this.drawfeature_epsg = undefined;//当前绘制的元素的epsg
            $this.bufferRadius = 0;// 缓冲半径
            $this.geom = undefined;
            $this.tGeometry = undefined;
            //$this.dataGrid = undefined;
            $this.layerdata = undefined;
            $this.polyganKey = undefined;
            $this.curPageStyle = undefined;
            $this.totalFeatures = undefined;
            $this.PageIndex = ktw.IsNumber(opt.PageIndex) ? opt.PageIndex : 1;
            $this.PageSize = ktw.IsNumber(opt.PageSize) ? opt.PageSize : 5;
            $this.LayerInfoConfiger = [];
            (function getData(MapLayer) {
                if (!ktw.IsArray(MapLayer))
                    MapLayer = [MapLayer];
                var curarr = Enumerable.From(MapLayer).Where(
                        "s=>s.Visible!='false'").OrderBy("x=>x.Order").ToArray();
                for (var i = 0; i < curarr.length; i++) {
                    $this.LayerInfoConfiger.push(curarr[i]);
                    if (curarr[i].Children && curarr[i].Children.MapLayer) {
                        getData(curarr[i].Children.MapLayer);
                    }
                }
            })(ktw.App.Config.SystemMap.ArrayOfMapLayer.MapLayer);
            $this.curLayerinfo = $this.LayerInfoConfiger[0];
            var version = $this.curLayerinfo.ServerType == "geoserver" ? "1.0.0"
                : "2.0.0";
            $this.initDomx();
        }
        $this.initDomx = function () {
            var dom = [];
            dom.push('<div class="globalGlandAnalysis">');
            dom.push('  <div id="divSearch" class="searchBox">');
            dom.push('   <div id="txtKey" class="ktw-textbox" style="width: 130px; height: 30px; line-height: 30px; float: left;" opt=\'{"TipInfo":"请输入缓冲距离(米)","TextAlign":"center"}\'></div>');
            dom.push('   <div  class="searchButton">分析</div>');
            dom.push('  </div>');
            dom.push('  <div class="resultPanel">');
            dom.push('    <div class="headerPanel">');
            dom.push('      <div id="headerTop" class="clearfix" style="margin-left: 5px;">');
            // TO DO 改为读取配置文件添加
            dom.push('      </div>');
            dom.push('     </div>');
            dom.push('    <div class="poiPanel"></div>');
            dom.push('  </div>');
            dom.push('  <div class="analysislBox">');
            dom.push('   <div class="Button" title="矩形" shapetype="Rectangle" style="margin-left:5px;">');
            dom.push('     <div class="icon-draw-rect" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="多边形" shapetype="Polygon" style="margin-left:5px;">');
            dom.push('     <div class="icon-draw-polygon" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="圆" shapetype="Circle" style="margin-left:5px;">');
            dom.push('     <div class="icon-draw-circle" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="点" shapetype="Point" style="margin-left:5px;">');
            dom.push('     <div class="icon-draw-point" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div class="Button" title="导入坐标文件" shapetype="File" style="margin-left:5px;">');
            dom.push('     <div class="icon-draw-import" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('   <div title="清除绘制图形" class="Button" shapetype="Clear">');
            dom.push('     <div class="icon-maptool-clearmap2" style="height: 16px; width: 16px; margin-top: 3px; margin-left: 3px;"></div>');
            dom.push('   </div>');
            dom.push('<input type="file" id="ImportFile2" name="coorfile" style="display:none" />')
            dom.push('</div>');
            dom.push(' </div>');
            $this.Target = $(dom.join(''));
            $this.Target.find(".spatialBox").hover(function () {
                $(this).height(55);
                $this.Target.find(".popsearch").show();
            }, function () {
                $(this).height(28);
                $this.Target.find(".popsearch").hide();
            })
            //ktw.App.MapPanel.Target.append($this.Target);
            $(".commontab").append($this.Target);
            ktw.InitControl();// 初始化框架控件
            //绑定回车键
            $this.Target.find("input:text").keydown(function (evt) {
                if (evt.keyCode == 13) {
                    $this.Target.find(".searchButton").click();
                }
            });
            $this.DrawButtons = $this.Target.find(".Button");
            $this.SearchButton = $this.Target.find(".searchButton");
            $this.ResultPanel = $this.Target.find(".resultPanel");
            $this.DataPanel = $this.Target.find(".poiPanel");
            $this.waitbox = new ktw.UCWaitBox($this.DataPanel);
            $this.ResultHeaders = $this.Target.find("#headerTop");
            $this.HeaderPanel = $this.Target.find(".headerPanel");

            $this.DrawButtons.click(function () {
                spatialFilter = "";
                $this.drawfeature = null;
                $this.draw.clear();//清除绘制
                ktw.App.Map.HighLightContainer.clear();//清除高亮
                var type = $(this).attr("shapetype");
                switch (type) {
                    case "Rectangle":
                    case "Polygon":
                    case "Circle":
                    case "Point": {
                        $this.totalFeatures = undefined;
                        $this.Draw(type, $this);
                        break;
                    }
                    case "Clear": {
                        $this.Clear();
                        break;
                    }
                    case "File": {
                        ////暂时屏蔽导入查询功能
                        //ktw.Alert_Short("功能未提供!");
                        //return;
                        $this.Clear();
                        $this.Target.find("#ImportFile2").bind("change", (function () {
                            if ($.trim($(this).val()) == "")
                                return;
                            var baseUri = ktw.App.ServerUrl;
                            var url = baseUri + "layer/fetchcoor";
                            $.ajaxFileUpload({
                                url: url, // 用于文件上传的服务器端请求地址
                                type: 'post',
                                data: {}, // 此参数非常严谨，写错一个引号都不行
                                secureuri: false, // 一般设置为false
                                fileElementId: 'ImportFile2',
                                dataType: 'json', // 返回值类型
                                // 一般设置为json
                                success: function (data, status) // 服务器成功响应处理函数
                                {
                                    $("#ImportFile2").val("");
                                    $this.refreshCurrlayer();
                                    if (status && data.success) {
                                        if (ktw.App.RightPanel) {
                                            ktw.App.RightPanel.SetVisible(false);
                                        }
                                        if (ktw.App.BottomPanel) {
                                            ktw.App.BottomPanel.SetVisible(false);
                                        }

                                        ktw.App.GlobalQuery.Clear();
                                        var arr = data.data.split('#');
                                        var wkt = '';
                                        for (var i = 0; i < arr.length; i++) {
                                            var tmp = arr[i].split(',');
                                            if (tmp.length < 2) {
                                                ktw.Alert("坐标格式不规范,请检查!");
                                                /**
                                                 * 113.06647008888432,27.878057293379666
                                                 * 113.06647008888432,27.818319134199978
                                                 * 113.15710729591557,27.818319134199978
                                                 * 113.15710729591557,27.878057293379666
                                                 * 113.06647008888432,27.878057293379666
                                                 * 113.06647008888432,27.878057293379666
                                                 */
                                                return;
                                            }
                                            wkt += "," + tmp[0] + " ";
                                            wkt += tmp[1];
                                        }
                                        wkt = 'POLYGON((' + wkt.substring(1) + "))";
                                        var read = new ktop.Wkt.Wkt();
                                        read.read(wkt);
                                        $this.drawfeature = read.toObject(true);
                                        //将图形加入绘制图层,统一管理
                                        ktw.App.Draw.Container.addLayer($this.drawfeature);
                                        var optionp = {
                                            weight: 1,
                                            color: '#ff0000',
                                            fill: true,
                                            fillColor: '#ffffff',
                                            fillOpacity: 0.3,
                                            zIndex: 500
                                        }
                                        $this.drawfeature.setStyle(optionp);
                                        ktw.App.Map.fitBounds($this.drawfeature.getBounds(), {
                                            animate: true,
                                            duration: 1
                                        });
                                        $this.Search();
                                    } else {
                                        ktw.Alert(data.message);
                                    }
                                },
                                error: function (data,
                                        status, e)// 服务器响应失败处理函数
                                {
                                    $("#ImportFile2")
                                            .val("");
                                    ktw.Alert(e);
                                }
                            });
                            return false;
                        }));
                        $this.Target.find("#ImportFile2").click();
                    }
                }
            });

            $this.Target.find("#txtKey").hover(function () {
                if ($this._timeout) clearTimeout($this._timeout);
                if ($this.ResultPanel.css("display") == "none") {
                    $this.DataPanel.hide();
                    $this.HeaderPanel.show();
                    $this.ResultPanel.show();
                }
            }, function () {
                if ($this.ResultPanel.css("display") == "block" && $this.DataPanel.css("display") == "none") {
                    $this._timeout = setTimeout(function () {
                        $this.DataPanel.show();
                        $this.HeaderPanel.show();
                        $this.ResultPanel.hide();
                    }, 100);
                }
            });

            $this.HeaderPanel.hover(function () {
                if ($this._timeout) clearTimeout($this._timeout);
            }, function () {
                if ($this.ResultPanel.css("display") == "block" && $this.DataPanel.css("display") == "none") {
                    $this._timeout = setTimeout(function () {
                        $this.ResultPanel.hide();
                        $this.DataPanel.show();
                        $this.HeaderPanel.show();
                    }, 100);
                }
            });

            // 文本框输入变化事件
            $this.Target.find("#txtKey").prop("$this").bind("onChange",
                    function (s, e) {
                        //$this.ShowPanel(false);
                        //$this.Clear();
                    });
            // 查询按钮点击事件
            $this.SearchButton.click(function () {
                $this.Search();
            });
        }
        $this.Search = function () {
            $this.totalFeatures = undefined;
            $this.curText = $.trim($this.Target.find("#txtKey").prop("$this").GetValue());
            $this.ShowPanel(false);
            ktw.App.ClearPreWidget();
            $this.Target.find(".classItem-select").eq(0).click();// 默认查询第一个
        }
        // 初始化dataGrid
        $this.initDataGrid = function (target) {

            // 初始化dataGrid
            var taxView = $.extend({}, $.fn.datagrid.defaults.view,
                            {
                                renderRow: function (target, fields, frozen,
                                              rowIndex, rowData) {
                                    var col = [];
                                    // 必须保证有显示的字段列表,即使是没有的字段名
                                    if (ktw.IsNull($this.curLayerinfo.DisplayFields)) {
                                        $this.curLayerinfo.DisplayFields = "#emptyname#,#emptyaddress#";
                                    }
                                    if (ktw.IsNull(rowData) || ktw.IsNull($this.curLayerinfo.DetailFields.Field[0].Name))
                                        return col.join('');
                                    var data = rowData;
                                    //var key = $this.curLayerinfo.DisplayFields.split(",");
                                    var name = ktw.IsNull(data[$this.curLayerinfo.DetailFields.Field[0].Name]) ? "暂无信息"
                                            : data[$this.curLayerinfo.DetailFields.Field[0].Name];
                                    var allarea = ktw.IsNull(data["allarea"]) ? "暂无信息"
                                            : data["allarea"];
                                    var glandarea = ktw.IsNull(data["glandarea"]) ? "暂无信息"
                                            : data["glandarea"];
                                    var yzb = ktw.IsNull(data["YZB"]) ? "暂无信息"
                                           : data["YZB"];
                                    col.push('<td>');
                                    col.push(' <div style="width: 387px; height: 60px; margin: 5px; position: relative;">');
                                    col.push(' <span style="width: 24px; height: 36px; position: absolute; left: 3px; top: 6px; background-image: url(image/poi_red.png)">');
                                    col.push('   <b style="font-size: 15px; color: white; position: absolute; left: 8px; top: 3px;">' + (rowIndex + 1) + '</b></span>');
                                    col.push(' <span style="position: absolute; left: 35px; top: -5px; max-height:30px;overflow:hidden;color: blue;" title="' + name + '">' + name + '</span>');
                                    //col.push(' <span style="position: absolute; left: 35px; top: 20px;">' + "总面积" + allarea + '</span>');
                                    col.push(' <span style="position: absolute; left: 35px; top: 17px;">' + "压占面积：" + glandarea + '平方米</span>');
                                    col.push(' <span style="position: absolute; left: 35px; top: 39px;">' + "压占比：" + yzb + '</span>');
                                    col.push('</div>');
                                    col.push('</td>');
                                    return col.join('');
                                }
                            });
            $this.dataGrid = new ktw.UCDataGrid({
                ID: "resultGrid",
                View: taxView,
                RowNumbers: false,
                FitColumns: false,
                ShowHeader: false,
                PageIndex: target.PageIndex,
                PageSize: target.PageSize,
                CSS: {
                    "height": target.DataPanel.height() + "px",
                    "width": target.ResultPanel.width() + "px"
                },
                pagequery: false,
                buttons: $("<div/>")
            });
            target.DataPanel.append($this.dataGrid.Target);
            // 分页变化事件
            $this.dataGrid.Target.bind("onSelectPage", function (s, e) {
                $this.PageIndex = e.index;
                var args = {
                    Url: ktw.GetSystemUrlByRelID($this.curLayerinfo.OWS || $this.curLayerinfo.Url),
                    TypeName: $this.curLayerinfo.TypeName,
                    Geometry: $this.geom,
                    filterName: $this.curLayerinfo.GeometryName,
                    SourceProject: $this.curLayerinfo.EPSG,
                    TargetProject: ktw.ProEPSG,
                    startIndex: ($this.PageIndex - 1) * $this.PageSize,
                    count: $this.PageSize,
                    sortBy: $this.curLayerinfo.Key
                }
                $this.GlandArea.call(args);
            });

            // 行选中事件
            $this.dataGrid.Target.bind("onSelectRow", { target: target }, function (s, e) {
                if (ktw.App.LifeCtr) {
                    ktw.App.LifeCtr.Hide();
                }
                var type = $this.ResultHeaders.find(".classItem-select").attr("tag");
                if (['p', 'z', 'c', 'g', 'y', 'b', 'w'].contains(type)) {
                    var guid = $this.layerdata[e.index].properties[$this.curLayerinfo.Key];
                    $.ajax({
                        type: "get",
                        async: true,
                        url: ktw.App.ServerUrl + "layer/lifecycel/" + type + "/" + guid,
                        success: function (res) {
                            if (res.success) {
                                ktw.App.LifeCtr.Load(res.data, type);
                                ktw.App.LifeCtr.Show();
                                ktw.App.LifeCtr.ShowType();
                            }
                        }
                    });
                    return;
                }
                if ($this.isbuffer == true) {
                    ktw.App.HighLight.hightLightSearch($this.tGeometry);
                }

                ktw.App.HighLight.hightLightFit($this.layerdata[e.index]);
                var data = $this.layerdata[e.index];
                var content = $("<div></div>");
                var fields = $this.curLayerinfo.DetailFields.Field;
                for (var i = 0; i < fields.length; i++) {
                    var rowdiv = $(
                            '<div class="row"><div class="Title">'
                                    + fields[i].ByName
                                    + '</div><div class="Content" title="'
                                    + (ktw.IsNull(data.properties[fields[i].Name]) ? "-"
                                            : data.properties[fields[i].Name])
                                    + '">'
                                    + (ktw.IsNull(data.properties[fields[i].Name]) ? "-"
                                            : data.properties[fields[i].Name])
                                    + '</div></div>').appendTo(content);
                }
                ktw.ShowMapTip($this.layerdata[e.index], {
                    ID: "taxInfo",
                    Title: "详细信息",
                    Content: content
                });
            });
        }
        //开始绘制压盖分析图形
        $this.Draw = function (_shapeType, target) {
            $this.shapeType = _shapeType;
            if (!$this.refreshCurrlayer()) return;
            $this.draw.start($this.shapeType);// 开始画
        }
        $this.fail = function () {
            ktw.Alert("缓冲失败,请检查网络请求!");
        }
        // 根据条件渲染和查询,attr:字符串查询语句,feature:要素
        $this.addWMS = function (attr, feature) {
            var spatial_wms, spatial_wfs;
            if (!ktw.IsNull($this.curText)) {
                $this.bufferRadius = parseFloat($this.curText)
            }
			else
			{
		        $this.bufferRadius=0.0;
			}
            if (!ktw.IsNull(feature)) {
                var radius;
				if (feature.hasOwnProperty("_mRadius"))
				{
					radius = feature.getRadius();
                    $this.bufferRadius = $this.bufferRadius + radius;
				}
                // if ($this.shapeType === ktw.DrawType.Circle) {
                    // radius = feature.getRadius();
                    // $this.bufferRadius = $this.bufferRadius + radius;
                // }
                var tmp = ktw.Project.Transform(ktw.EPSG, $this.curLayerinfo.EPSG, feature.toGeoJSON());
                var wkt_wms = ktw.GetWKTByFeature(tmp, false);
                var wkt_wfs = ktw.GetWKTByFeature(tmp, true);
                if ($this.shapeType === ktw.DrawType.Circle) {
                    spatial_wms = ktw.MapUtils.GetCql_DWITHIN(wkt_wms,
                            $this.bufferRadius + radius);
                    spatial_wfs = ktw.MapUtils.GetCql_DWITHIN(wkt_wfs,
                            $this.bufferRadius + radius);
                } else if ($this.shapeType === ktw.DrawType.Point) {
                    spatial_wms = ktw.MapUtils.GetCql_INTERSECTS(wkt_wms);
                    spatial_wfs = ktw.MapUtils.GetCql_INTERSECTS(wkt_wfs);
                } else {
                    spatial_wms = ktw.MapUtils
                            .GetCql_DWITHIN(wkt_wms);
                    spatial_wfs = ktw.MapUtils
                            .GetCql_DWITHIN(wkt_wfs);
                }
                spatial_wms = spatial_wms.replace("the_geom",
                        $this.curLayerinfo.GeometryName);
                spatial_wfs = spatial_wfs.replace("the_geom",
                        $this.curLayerinfo.GeometryName);
            }
            finalFilter = "";
            if (!ktw.IsNull(attr))
                finalFilter += "AND (" + attr + ") ";
            if (!ktw.IsNull(spatial_wfs))
                finalFilter += "AND " + spatial_wfs;
            finalFilter = finalFilter.substring(3);
            var final_wms = "";
            if (!ktw.IsNull(attr))
                final_wms += "AND (" + attr + ") ";
            if (!ktw.IsNull(spatial_wms))
                final_wms += "AND " + spatial_wms;
            final_wms = final_wms.substring(3);
            // 加载渲染底图
            var wmsparam = {
                ID: "temp_search",
                CQLFilter: final_wms,
                Url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url),
                Sldbody: ktw.MapUtils.LoadSLD(ktw.App.Root + "config/searchpolygon.sld").replace("%LayerName%", $this.curLayerinfo.TypeName),
                ServerType: $this.curLayerinfo.ServerType,
                Map: ktw.App.Map,
                EPSG: $this.curLayerinfo.EPSG,
                ZIndex: 9999
            };
            ktw.MapUtils.RemoveLayer(wmsparam.ID, ktw.App.Map);
            ktw.MapLoad.AddWMSLayer(wmsparam);
            //压盖查询
            if ($this.bufferRadius > 0) {
                var geom = ktw.Project.Transform(ktw.EPSG, $this.curLayerinfo.EPSG, $this.drawfeature.toGeoJSON(), true);
                var bufferPram = new L.QueryParameter.BufferParameter({
                    url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url),
                    geometry: JSON.stringify(geom.geometry),//JSON.stringify([polygon.toGeoJSON().geometry]),
                    system: 'geographic', //geometry是什么坐标系，geographic（经纬度坐标系），projection（投影坐标系）
                    unit: "metre", //规定缓冲半径单位 米：metre  度：drgree
                    distance: $this.bufferRadius //单位为米
                });
                $this.geom = geom;
                $this.PageIndex = 1;
                $this.isbuffer = true;
                var gs = new L.GeometryService(bufferPram);
                gs.buffer(function (data) {
                    //if (!$this.bufferPolygon) { 
                    $this.geom.geometry = JSON.parse(data);
                    var args = {
                        Url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url),
                        TypeName: $this.curLayerinfo.TypeName,
                        Geometry: $this.geom,
                        filterName: $this.curLayerinfo.GeometryName,
                        SourceProject: $this.curLayerinfo.EPSG,
                        TargetProject: ktw.ProEPSG,
                        startIndex: ($this.PageIndex - 1) * $this.PageSize,
                        count: $this.PageSize,
                        sortBy: $this.curLayerinfo.Key
                    }
                    $this.waitbox.Show();
                    $this.GlandArea.call(args);
                }.bind(this), $this.fail);
            }
            else {
                $this.geom = ktw.Project.Transform(ktw.EPSG, $this.curLayerinfo.EPSG, $this.drawfeature.toGeoJSON(), true);
                $this.isbuffer = false;
                $this.PageIndex = 1;
                var args = {
                    Url: ktw.GetSystemUrlByRelID($this.curLayerinfo.Url),
                    TypeName: $this.curLayerinfo.TypeName,
                    Geometry: $this.geom,
                    filterName: $this.curLayerinfo.GeometryName,
                    SourceProject: $this.curLayerinfo.EPSG,
                    TargetProject: ktw.ProEPSG,
                    startIndex: ($this.PageIndex - 1) * $this.PageSize,
                    count: $this.PageSize,
                    sortBy: $this.curLayerinfo.Key
                }
                $this.waitbox.Show();

                $this.GlandArea.call(args);
            }
        }
        //压盖分析图层
        $this.refreshCurrlayer = function () {
            // 设置当前要进行压盖分析的图层
            var item = $this.Target.find("#headerTop>span.classItem-select").not(".classItem-disabled");
            if (item.length == 0) {
                ktw.Alert("未找到可进行压盖分析的图层,请使图层在选中列表后再分析!");
                return false;
            }
            if (item.length > 0) {
                for (var i = 0; i < ktw.App.GlobalGlandAnalysis.LayerInfoConfiger.length; i++) {
                    var tag = ktw.IsNull(ktw.App.GlobalGlandAnalysis.LayerInfoConfiger[i].LifeCycle) ? "_id" + ktw.App.GlobalGlandAnalysis.LayerInfoConfiger[i].ID : ktw.App.GlobalGlandAnalysis.LayerInfoConfiger[i].LifeCycle;
                    if (item.attr("tag") == tag) {
                        $this.curLayerinfo = ktw.App.GlobalGlandAnalysis.LayerInfoConfiger[i];
                        break;
                    }
                }
                return true;
            }
        }
        // 显示搜索的结果框
        $this.ShowPanel = function (bVisible) {
            if (ktw.IsNull(bVisible))
                bVisible = true;
            if (bVisible)
                this.ResultPanel.slideDown();
            else
                this.ResultPanel.hide();
        }
        // 清除冒泡和动画
        $this.Clear = function () {
            // 清除绘图框的数据
            ktw.App.Draw.clear();
            // 隐藏结果面板
            this.ShowPanel(false);
            // 清除提示框
            ktw.ClearMapTip();
            // 清除临时图层
            ktw.MapUtils.ClearTempLayer(ktw.App.Map);
            //清除高亮
            ktw.App.Map.HighLightContainer.clear();
            //清除测量
            ktw.MeasureClear();
            //清除土地生命周期导航
            if (ktw.App.LifeCtr) {
                ktw.App.LifeCtr.Hide();
            }
        }
        // 绑定事件
        $this.bind = function () {
            this.Target.bind(arguments[0], arguments[1], arguments[2]);
            return this;
        },
        // 解绑事件
        $this.unbind = function (eventName) {
            this.Target.unbind(eventName);
            return this;
        }
        // 绑定事件
        $this.bindSourceChangeEvent = function () {
            $this.Target.find(".classItem").unbind(
                    "mouseenter mouseleave click").mouseenter(function () {
                        if ($(this).hasClass("classItem-select")) {
                            var itemstr = $(this).attr("flhz");
                            if (!ktw.IsNull(itemstr)) {
                                if ($this.HeaderPanel.css("display") == "block" && $this.DataPanel.css("display") != "none") {
                                    var strs = itemstr.split(",");
                                    var str = "<div style='width:100px'>";
                                    if (strs.contains("tdlyxz")) {
                                        str += "<div class='item' id='_tdlyxz' onclick='__tdlyxzfl(this)'>分类汇总</div>";
                                    }
                                    if (strs.contains("gzq")) {
                                        str += "<div class='item' id='_ydqgz' onclick='__ydqgz(this)'>用地区管制</div>";
                                    }
                                    str += "</div>";
                                    tooltip.pop(this, str, { offsetY: -20, cssClass: "pop-flhz" });
                                }
                            }
                            return;
                        }
                        $(this).addClass("classItem-hover");
                    }).mouseleave(function () {
                        $(this).removeClass("classItem-hover");
                    }).click(function () {
                        if ($(this).hasClass("classItem-disabled"))
                            return;
                        $this.curText = $.trim($this.Target.find("#txtKey").prop(
                                "$this").GetValue());
                        $(this).siblings().removeClass("classItem-select");
                        $(this).addClass("classItem-select");
                        $this.refreshCurrlayer();
                        if ($this.HeaderPanel.css("display") == "block" && $this.DataPanel.css("display") == "none") {
                            //悬浮提示切换,不进行实际查询
                            return;
                        }
                        var type = $(this).attr("tag");
                        $this.analysisByType(type, $this);
                    });
        }
        //土地利用现状分类汇总
        window.__tdlyxzfl = window.__tdlyxzfl || function () {
            tooltip.hide();
            var args = {
                Url: ktw.GetSystemUrlByRelID(ktw.App.GlobalGlandAnalysis.curLayerinfo.Url),
                TypeName: ktw.App.GlobalGlandAnalysis.curLayerinfo.TypeName,
                Geometry: ktw.App.GlobalGlandAnalysis.geom,
                filterName: ktw.App.GlobalGlandAnalysis.curLayerinfo.GeometryName,
                SourceProject: ktw.App.GlobalGlandAnalysis.curLayerinfo.EPSG,
                TargetProject: ktw.ProEPSG,
                startIndex: 0,
                sortBy: ktw.App.GlobalGlandAnalysis.curLayerinfo.Key
            }
            var GlandArea = new ktw.GetGlandArea();
            ktw.App.GlobalGlandAnalysis.waitbox.Show();
            $(GlandArea.obj).bind("onGlandAreaSuccess", function (e, obj) {
                if (obj.Success) {
                    if (obj.Features.length > 0) {
                        var datagriddata = [];
                        for (var i = 0; i < obj.Features.length; i++) {
                            if (obj.Features[i].properties.YZB == undefined) {
                                obj.Features[i].properties.YZB = ((obj.Features[i].properties.glandarea / obj.Features[i].properties.allarea) * 100).toFixed(2) + "%";
                                obj.Features[i].properties.glandarea = (obj.Features[i].properties.glandarea / 10000).toFixed(4);
                                obj.Features[i].properties.allarea = (obj.Features[i].properties.allarea / 10000).toFixed(4);
                            }
                            datagriddata.push(obj.Features[i].properties);
                        }
                        var result = Enumerable.From(datagriddata).GroupBy("{地类名称:" + "$.地类名称,权属性质:" + "$.权属性质" + "}", null,
                                                                  function (key, g) {
                                                                      var result = {
                                                                          dlmc: key.地类名称,
                                                                          qsxz: key.权属性质,
                                                                          glandtotal: parseFloat(g.Sum("$.glandarea")).toFixed(4),
                                                                          alltotal: parseFloat(g.Sum("$.allarea")).toFixed(4),
                                                                          count: g.Count()
                                                                      }
                                                                      return result;
                                                                  }, "$.地类名称 + '-'+ $.权属性质").ToArray();
                        var StatisticsData = result;
                        var ctr = new window.top.ktw.Window({
                            ID: "ktw_flhz_2",
                            Title: "分类汇总",
                            IconCls: "icon-Search2 ",
                            Height: 475,
                            Width: 900,
                            Left: 20,
                            Top: 80,
                            Parent: $(window.top).Target,
                            IsMaximize: true,
                            IsMinimize: false,
                            Maximizable: true,
                            Minimizable: true,
                            Draggable: true,
                            Resizable: true,
                            Url: "html/onemap/table_flhz.html",
                            Parameters: { result: StatisticsData, data: { xm_mc: "临时绘制图形" } }
                        });
                        ctr.Layout();
                        ctr.Open();
                    } else {
                        ktw.Alert("无计算数据!");
                    };
                    ktw.App.GlobalGlandAnalysis.waitbox.Close();
                } else {
                    ktw.App.GlobalGlandAnalysis.waitbox.Close();
                    ktw.Error("计算出错!");
                }
            });
            GlandArea.call(args);
        };
        //管制区汇总
        window.__ydqgz = window.__ydqgz || function () {
            //找到管制区分类的配置
            var btnAnakysis = ktw.App.Config.Extend.Analysis.P.BtnAnalysis;
            for (var i = 0; i < btnAnakysis.length; i++) {
                if (btnAnakysis[i].BtnName == "土地利用规划") {
                    for (var j = 0; j < btnAnakysis[i].Statistics.length; j++) {
                        if (btnAnakysis[i].Statistics[j].ByName == "根据用地管制区分类汇总") {
                            btnAnakysis = btnAnakysis[i].Statistics[j];
                            break;
                        }
                    }

                }
            }

            var result = {};
            var total = 1000;
            //求绘制的地块面积
            var measurePram = new L.QueryParameter.MeasureParameter({
                url: ktw.GetSystemUrlByRelID(ktw.App.GlobalGlandAnalysis.curLayerinfo.Url),
                geometry: JSON.stringify(ktw.App.GlobalGlandAnalysis.geom.geometry),
                //投影变换参考
                sourceproject: ktw.App.GlobalGlandAnalysis.curLayerinfo.EPSG,
                targetproject: ktw.ProEPSG
            });
            var gs = new L.GeometryService(measurePram);
            //求压盖部分面积
            gs.getArea(function (res) {
                total = parseFloat(res) / 10000;
                total = isNaN(total) ? 1000 : total;
                total = total.toFixed(2);
            }, function () { });
            var kinds = btnAnakysis.Kinds.Kind;
            for (var tt_k = 0; tt_k < kinds.length; tt_k++) {
                result[kinds[tt_k].ByName] = {};
                result[kinds[tt_k].ByName].coverarea = 0;
                result[kinds[tt_k].ByName].coverallarea = 0;
                result[kinds[tt_k].ByName].percent = 0;
            }
            var args = {
                Url: ktw.GetSystemUrlByRelID(ktw.App.GlobalGlandAnalysis.curLayerinfo.Url),
                TypeName: ktw.App.GlobalGlandAnalysis.curLayerinfo.TypeName,
                Geometry: ktw.App.GlobalGlandAnalysis.geom,
                filterName: ktw.App.GlobalGlandAnalysis.curLayerinfo.GeometryName,
                SourceProject: ktw.App.GlobalGlandAnalysis.curLayerinfo.EPSG,
                TargetProject: ktw.ProEPSG,
                startIndex: 0,
                sortBy: ktw.App.GlobalGlandAnalysis.curLayerinfo.Key
            }
            var GlandArea = new ktw.GetGlandArea();
            ktw.App.GlobalGlandAnalysis.waitbox.Show();
            $(GlandArea.obj).bind("onGlandAreaSuccess", function (e, obj) {
                if (obj.Success) {
                    if (obj.Features.length > 0) {
                        for (var tt_k = 0; tt_k < obj.Features.length; tt_k++) {
                            var groupbyvalue = obj.Features[tt_k].properties[btnAnakysis.GroupBy];
                            var coverarea = window.parseFloat(obj.Features[tt_k].properties[btnAnakysis.CoverArea]);
                            var coverallarea = window.parseFloat(obj.Features[tt_k].properties[btnAnakysis.CoverAllArea]);
                            if (isNaN(coverarea)) {
                                coverarea = 0;
                            }
                            if (isNaN(coverallarea)) {
                                coverallarea = 0;
                            }
                            for (var tt_j = 0; tt_j < kinds.length; tt_j++) {
                                if (kinds[tt_j].Values.Value.length == undefined) {
                                    kinds[tt_j].Values.Value = [kinds[tt_j].Values.Value];
                                }
                                if (kinds[tt_j].Values.Value.contains(groupbyvalue)) {
                                    result[kinds[tt_j].ByName].coverarea += coverarea / 10000;
                                    result[kinds[tt_j].ByName].coverallarea += coverallarea / 10000;
                                    result[kinds[tt_j].ByName].percent = ((result[kinds[tt_j].ByName].coverarea / total) * 100).toFixed(2) + "%";
                                    break;
                                }
                            }
                        }
                        var StatisticsData = result;
                        var tbl = $("<table class='form-tbl' style='width:100%;font-size:12px;'></table>");
                        var tbl_head = $("<tr class='ydgz-tr'>" +
                            "<td class='from-title' style='background-color:#F3F3F3;'>地块总面积(公顷)</td>" +
                            "<td class='from-title' style='background-color:#F3F3F3;'>类型</td>" +
                            "<td class='from-title' style='background-color:#F3F3F3;'>面积(公顷)</td>" +
                            "<td class='from-title' style='background-color:#F3F3F3;'>地块总面积</td>" +
                            "<td class='from-title' style='background-color:#F3F3F3;'>占总面积比例</td>" +
                            "</tr>").appendTo(tbl);
                        var tt_o = 0;
                        for (var tt_kind in result) {
                            if (tt_o == 0) {
                                var tbl_row = $("<tr>" +
                            "<td rowspan='4' class='form-text'>" + total + "</td>" +
                            "<td class='form-text'>" + tt_kind + "</td>" +
                            "<td class='form-text'>" + (result[tt_kind].coverarea).toFixed(2) + "</td>" +
                            "<td class='form-text'>" + (result[tt_kind].coverallarea).toFixed(2) + "</td>" +
                            "<td class='form-text'>" + result[tt_kind].percent + "</td></tr>").appendTo(tbl);
                            } else {
                                var tbl_row = $("<tr>" +
                           "<td class='form-text'>" + tt_kind + "</td>" +
                           "<td class='form-text'>" + (result[tt_kind].coverarea).toFixed(2) + "</td>" +
                            "<td class='form-text'>" + (result[tt_kind].coverallarea).toFixed(2) + "</td>" +
                           "<td class='form-text'>" + result[tt_kind].percent + "</td></tr>").appendTo(tbl);
                            }
                            tt_o++;
                        }

                        var ctr = new window.top.ktw.Window({
                            ID: "ktw_flhz_ydgz",
                            Title: "管制区分类汇总",
                            IconCls: "icon-Search2 ",
                            Height: 230,
                            Width: 600,
                            Left: (document.body.clientWidth - 600) / 2,
                            Top: (document.body.clientHeight - 400) / 2,
                            Parent: $(window).Target,
                            IsMaximize: false,
                            IsMinimize: false,
                            Maximizable: true,
                            Minimizable: true,
                            Draggable: true,
                            Resizable: true,
                            Content: tbl
                        });
                        ctr.Layout();
                        ctr.Open();
                    } else {
                        ktw.Alert("无计算数据!");
                    };
                    ktw.App.GlobalGlandAnalysis.waitbox.Close();
                } else {
                    ktw.App.GlobalGlandAnalysis.waitbox.Close();
                    ktw.Error("计算出错!");
                }
            });
            GlandArea.call(args);
        };
        $this.analysisByType = function (type, target) {
            $this.addWMS($this.curFilter, $this.drawfeature);
        }
        $this.shapeType = ktw.DrawType.Polygon;
        //绘制图形完成事件
        $this.draw = (function () {
            var draw = ktw.App.Draw;
            draw.unbind("onDrawCompleted.analysis");
            draw.bind("onDrawCompleted.analysis", function (e, obj) {
                if ($this.Target.css("display") == "none") return;
                $this.curText = $.trim(ktw.App.GlobalGlandAnalysis.Target.find("#txtKey").prop("$this").GetValue());
                $this.drawfeature = obj.obj;
                $this.curFilter = undefined;
                $this.addWMS($this.curFilter, obj.obj);
            });
            return draw;
        })();
        $this.init(opt);
        $this.initDataGrid($this);
        $this.GlandArea = new ktw.GetGlandArea();
        $($this.GlandArea.obj).bind("onGlandAreaSuccess", function (e, obj) {
            $this.waitbox.Close();
            if (obj.Success == false) {
				//通用功能发生错误原因暂未解决，暂时注释掉
                //ktw.Alert("分析失败,请检查网络请求!");
				//错误返回同时，清除datagrid数据
				$this.dataGrid.Load([], { totalCount: 0, pageIndex: 1, pageSize: 5 });
				
                return;
            }
            $this.DataPanel.show();
            $this.ShowPanel();//结果框展示
            $this.datagriddata = [];
            $this.layerdata = obj.layerdata.features;
            //判断有无压盖（根据totalfeatrues参数） 目前totalfeatrues异常  暂时屏蔽判断
            if (obj.Count == 0) {
                //ktw.Alert("分析图形与该图层无压盖情况！");
            }
            if (obj.Features.length > 0) {
                for (var i = 0; i < obj.Features.length; i++) {
                    obj.Features[i].properties.YZB = ((obj.Features[i].properties.glandarea / obj.Features[i].properties.allarea) * 100).toFixed(2) + "%";
                    $this.datagriddata.push(obj.Features[i].properties);
                }
            }
            var columns = [];
            gridfields = [
               { "Name": $this.curLayerinfo.DetailFields.Field[0].Name, "ByName": $this.curLayerinfo.DetailFields.Field[0].ByName },
               { "Name": "allarea", "ByName": "总面积" },
               { "Name": "glandarea", "ByName": "压盖面积" },
               { "Name": "YZB", "ByName": "压占比" },
            ];
            for (var i = 0; i < gridfields.length; i++) {
                columns.push({ field: gridfields[i].Name, title: gridfields[i].ByName, height: 50, width: 79, align: 'center', sortable: false });
            }
            $this.dataGrid.Layout(columns);
            //$this.PageIndex = 1;
            var pageInfo = {
                pageIndex: $this.PageIndex,
                pageSize: $this.PageSize,
                totalCount: obj.layerdata.totalFeatures,
                msg: "共{total}条数据"
            };
            $this.dataGrid.Load($this.datagriddata, pageInfo);
            if ($this.isbuffer == true) {
                var tgeom = ktw.ObjClone($this.geom);
                $this.tGeometry = ktw.Project.TransformG(ktw.ProEPSG, ktw.EPSG, tgeom, true);
                //清除高亮
                ktw.App.Map.HighLightContainer.clear();
                ktw.App.HighLight.hightLightSearch($this.tGeometry);
            }
        });
    }
})(jQuery);

/* 样式查询 */
(function ($) {
    /* 条件符号 */
    ktw.ComparisonOps = {
        PropertyIsEqualTo: "=",
        PropertyIsNotEqualTo: "<>",
        PropertyIsLessThan: "<",
        PropertyIsGreaterThan: ">",
        PropertyIsLessThanOrEqualTo: "<=",
        PropertyIsGreaterThanOrEqualTo: ">=",
        PropertyIsLike: " LIKE ",
        PropertyIsNull: " IS ",
        PropertyWithIN: " IN "
    };

    ktw.GetSLDString = function (typeName, strrule, IsFeatureStyle) {
        if (ktw.IsNull(typeName) || ktw.IsNull(strrule))
            return "";
        var strsld = ktw.MapUtils.LoadSLD(ktw.App.Root + "config/templet.sld");
        strsld = strsld.replace("%LayerName%", typeName);
        if (IsFeatureStyle == true)
            strsld = strsld.replace("%FeatureTypeStyle%", strrule);
        else
            strsld = strsld.replace("%FeatureTypeStyle%", "<FeatureTypeStyle>"
                    + strrule + "</FeatureTypeStyle>");
        return strsld;
    };
    ktw.LegendToRule = function (legends) {
        var strRules = "";
        $.each($(legends), function (i, o) {
            strRules += "<Rule>";
            if (!ktw.IsNull(o.Text))
                strRules += "<Name>" + o.Text + "</Name>";
            if (!ktw.IsNull(o.Filter))
                strRules += ktw.Filter(o.Filter, "", "", true);
            strRules += "<PolygonSymbolizer>";
            if (!ktw.IsNull(o.Fill)) {
                strRules += "<Fill><CssParameter name=\"fill\">" + o.Fill.Color
                        + "</CssParameter>";
                strRules += "<CssParameter name=\"fill-opacity\">"
                        + (ktw.IsNull(o.Fill.Opacity) ? 1 : o.Fill.Opacity)
                        + "</CssParameter>";
                strRules += "</Fill>";
            }
            if (!ktw.IsNull(o.Border)) {
                strRules += "<Stroke><CssParameter name=\"stroke\">"
                        + o.Border.Color + "</CssParameter>";
                strRules += "<CssParameter name=\"stroke-opacity\">"
                        + (ktw.IsNull(o.Border.Opacity) ? 1 : o.Border.Opacity)
                        + "</CssParameter>";
                strRules += "<CssParameter name=\"stroke-width\">"
                        + (ktw.IsNull(o.Border.Width) ? 1 : o.Border.Width)
                        + "</CssParameter>";
                strRules += "</Stroke>";
            }
            strRules += "</PolygonSymbolizer></Rule>";
        });
        return strRules;
    };
    ktw.Filter = function (strWhere, spatialParam, version, isPR) {
        var strfilter = "";
        var prefix = isPR ? "ogc:" : "";
        var condition = '<' + prefix
                + 'Filter xmlns:ogc="http://www.opengis.net/ogc">';
        if (!ktw.IsNull(spatialParam) && !ktw.IsNull(spatialParam.bbox)) {
            if (!ktw.IsNull(strWhere))
                condition += '<ogc:And>';
            condition += ktw.BBOX(spatialParam.bbox, spatialParam.geometryName,
                    version);
        }
        if (!ktw.IsNull(spatialParam) && !ktw.IsNull(spatialParam.geometry)) {
            if (!ktw.IsNull(strWhere))
                condition += '<ogc:And>';
            condition += ktw.Geometry(spatialParam, version);
        }
        if (!ktw.IsNull(strWhere)) {
            strWhere = strWhere.replace(
                    /1=1\s*AND|1=1\s*and|1=1\s*OR|1=1\s*or|1=1\s*/, "");
            var arrCondition = strWhere
                    .split(/\) AND \(|\) AND|AND \(|\)AND\(|\)AND|AND\(/);
            var orCondition = [];
            if (!ktw.IsNull(strWhere)) {
                if (arrCondition.length == 1)
                    condition += FilterORQuote(arrCondition[0]);
                else if (arrCondition.length > 1) {
                    var andstr = '<ogc:And>';
                    $.each($(arrCondition), function (i, o) {
                        if (o)
                            andstr += FilterORQuote(o);
                    });
                    andstr += "</ogc:And>";
                    condition += andstr;
                }
            }
        }
        strfilter += condition;
        if (((!ktw.IsNull(spatialParam) && !ktw.IsNull(spatialParam.bbox)) || (!ktw
                .IsNull(spatialParam) && !ktw.IsNull(spatialParam.geometry)))
                && !ktw.IsNull(strWhere))
            strfilter += '</ogc:And>';
        strfilter += '</' + prefix + 'Filter>';
        return strfilter;
    };
    function FilterORQuote(con) {
        var arrCon = con.split(/\) OR \(|\) OR|OR \(|\)OR\(|\)OR|OR\(/);
        var orstr = "";
        if (arrCon.length > 1) {
            var orstr = '<ogc:Or>';
            $.each($(arrCon), function (j, item) {
                orstr += FilterAND(item);
            });
            orstr += '</ogc:Or>';
        } else
            orstr += FilterAND(con);
        return orstr;
    }
    function FilterAND(con) {
        var arrCon = con.split(/ AND /);
        var condition = "", andstr = "";
        if (arrCon.length == 1)
            andstr += FilterOR(arrCon[0]);
        else if (arrCon.length > 1) {
            var andstr = '<ogc:And>';
            $.each($(arrCon), function (i, o) {
                if (o)
                    andstr += FilterOR(o);
            });
            andstr += "</ogc:And>";
        }
        condition = andstr;
        return condition;
    }
    function FilterOR(con) {
        var arrCon = con.split(/ OR /);
        var orstr = "";
        if (arrCon.length > 1) {
            var orstr = '<ogc:Or>'
            $.each($(arrCon), function (j, item) {
                orstr += propertyFilter(item);
            });
            orstr += '</ogc:Or>'
        } else
            orstr += propertyFilter(con);
        return orstr;
    }
    function propertyFilter(arr) {
        var strFilter = "";
        if (!arr)
            return strFilter;
        arr = arr.replace(/\(/g, "");
        arr = arr.replace(/\)/g, "");
        var arr1 = arr.trim().split(
                /=|>|<|>=|<=|<>| in | IN | IS | is | LIKE | like /);
        arr1[0] = arr1[0].trim();
        arr1[arr1.length - 1] = arr1[arr1.length - 1].replace(/\'/g, "").trim();
        if (arr1[0] === "1")
            return "";
        if (arr.toUpperCase().indexOf(ktw.ComparisonOps.PropertyIsNotEqualTo) >= 0)
            strFilter = '<ogc:PropertyIsNotEqualTo><ogc:PropertyName>'
                    + arr1[0] + '</ogc:PropertyName><ogc:Literal>'
                    + arr1[arr1.length - 1]
                    + '</ogc:Literal></ogc:PropertyIsNotEqualTo>';
        else if (arr.toUpperCase().indexOf(
                ktw.ComparisonOps.PropertyIsLessThanOrEqualTo) >= 0)
            strFilter = '<ogc:PropertyIsLessThanOrEqualTo><ogc:PropertyName>'
                    + arr1[0] + '</ogc:PropertyName><ogc:Literal>'
                    + arr1[arr1.length - 1]
                    + '</ogc:Literal></ogc:PropertyIsLessThanOrEqualTo>';
        else if (arr.toUpperCase().indexOf(
                ktw.ComparisonOps.PropertyIsGreaterThanOrEqualTo) >= 0)
            strFilter = '<ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>'
                    + arr1[0]
                    + '</ogc:PropertyName><ogc:Literal>'
                    + arr1[arr1.length - 1]
                    + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo>';
        else if (arr.toUpperCase()
                .indexOf(ktw.ComparisonOps.PropertyIsLessThan) >= 0)
            strFilter = '<ogc:PropertyIsLessThan><ogc:PropertyName>' + arr1[0]
                    + '</ogc:PropertyName><ogc:Literal>'
                    + arr1[arr1.length - 1]
                    + '</ogc:Literal></ogc:PropertyIsLessThan>';
        else if (arr.toUpperCase().indexOf(
                ktw.ComparisonOps.PropertyIsGreaterThan) >= 0)
            strFilter = '<ogc:PropertyIsGreaterThan><ogc:PropertyName>'
                    + arr1[0] + '</ogc:PropertyName><ogc:Literal>'
                    + arr1[arr1.length - 1]
                    + '</ogc:Literal></ogc:PropertyIsGreaterThan>';
        else if (arr.toUpperCase().indexOf(ktw.ComparisonOps.PropertyIsEqualTo) >= 0) {
            if (arr1[arr1.length] === "")
                strFilter = '<ogc:PropertyIsNull><ogc:PropertyName>' + arr1[0]
                        + '</ogc:PropertyName></ogc:PropertyIsNull>';
            else
                strFilter = '<ogc:PropertyIsEqualTo><ogc:PropertyName>'
                        + arr1[0] + '</ogc:PropertyName><ogc:Literal>'
                        + arr1[arr1.length - 1]
                        + '</ogc:Literal></ogc:PropertyIsEqualTo>';
        } else if (arr.toUpperCase().indexOf(ktw.ComparisonOps.PropertyIsLike) >= 0)
            strFilter = '<ogc:PropertyIsLike wildCard="*" singleChar="_" escapeChar="!"><ogc:PropertyName>'
                    + arr1[0]
                    + '</ogc:PropertyName><ogc:Literal>'
                    + arr1[arr1.length - 1].replace(/\%/g, "*")
                    + '</ogc:Literal></ogc:PropertyIsLike>';
        else if (arr.toUpperCase().indexOf(ktw.ComparisonOps.PropertyIsNull) >= 0)
            strFilter = '<ogc:PropertyIsNull><ogc:PropertyName>' + arr1[0]
                    + '</ogc:PropertyName></ogc:PropertyIsNull>';
        else if (arr.toUpperCase().indexOf(ktw.ComparisonOps.PropertyWithIN) >= 0)
            strFilter = PropertyWithINFilter(arr1);
        return strFilter.trim();
    }
    function PropertyWithINFilter(condition) {
        var values = condition[condition.length - 1].trim();
        values = values.replace(/\(/g, "");
        values = values.replace(/\)/g, "");
        values = values.split(',');
        var orstr = '<ogc:Or>';
        $.each(values, function (i, o) {
            if (o)
                orstr += '<ogc:PropertyIsEqualTo><ogc:PropertyName>'
                        + condition[0].trim()
                        + '</ogc:PropertyName><ogc:Literal>'
                        + o.replace(/\'/g, "").trim()
                        + '</ogc:Literal></ogc:PropertyIsEqualTo>';
        });
        orstr += '</ogc:Or>';
        return orstr;
    }

    // 四至范围
    ktw.BBOX = function (bbox, field, version) {
        if (ktw.IsNull(bbox) || ktw.IsNull(field))
            return "";
        var strbbox = "";
        if (ktw.IsNull(version))
            version = "1.0.0";
        if (version === "1.0.0")
            strbbox = '<ogc:BBOX><ogc:PropertyName>'
                    + field
                    + '</ogc:PropertyName>'
                    + '<gml:Box srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">'
                    + '<gml:coordinates decimal="." cs="," ts=" ">' + bbox[0]
                    + ',' + bbox[1] + ' ' + bbox[2] + ',' + bbox[3]
                    + '</gml:coordinates>' + '</gml:Box></ogc:BBOX>'
        else if (version === "1.1.0")
            strbbox = '<ogc:BBOX><ogc:PropertyName>'
                    + field
                    + '</ogc:PropertyName>'
                    + '<gml:Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">'
                    + '<gml:lowerCorner>' + bbox[0] + ' ' + bbox[1]
                    + '</gml:lowerCorner>' + '<gml:upperCorner>' + bbox[2]
                    + ' ' + bbox[3] + '</gml:upperCorner>'
                    + '</gml:Envelope></ogc:BBOX>';
        return strbbox;
    };

    // 图形
    ktw.Geometry = function (param, version) {
        var strgeometry = '<ogc:PropertyName>' + param.geometryName
                + '</ogc:PropertyName>';
        var type = param.geometry.getType().toLowerCase();
        if (type === "point" || type === "circle") {// 点
            var point;
            if (type === "circle") {
                point = param.geometry.getCenter().toString();
                param.distance = param.geometry.getRadius();
                param.relation = ktw.Relations.DWITHIN;
            } else
                point = param.geometry.getCoordinates().toString();
            strgeometry += '<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326" xmlns:gml="http://www.opengis.net/gml">';
            if (version === "1.1.0")
                strgeometry += '<gml:pos>' + point.replace(/,/g, " ")
                        + '</gml:pos>';
            else if (version === "1.0.0")
                strgeometry += '<gml:coordinates decimal="." cs="," ts=" ">'
                        + point.toString() + '</gml:coordinates>';
            strgeometry += '</gml:Point>';
        } else if (type === "polygon") {
            strgeometry += '<gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#4326" xmlns:gml="http://www.opengis.net/gml">';
            var linearRings = param.geometry.getLinearRings();
            $.each(linearRings, function (i, o) {
                if (version === "1.1.0") {
                    var linearRing = '<gml:LinearRing><gml:posList>'
                            + o.getCoordinates().toString().replace(/,/g, " ")
                            + '</gml:posList></gml:LinearRing>';
                    if (i === 0)
                        strgeometry += '<gml:exterior>' + linearRing + '</gml:exterior>';
                    else
                        strgeometry += linearRing;
                } else if (version === "1.0.0") {
                    var linearRing = '<gml:LinearRing><gml:coordinates decimal="." cs="," ts=" ">'
                            + o.getCoordinates().toString().replace(/,/g, " ")
                            + '</gml:coordinates></gml:LinearRing>';
                    if (i === 0)
                        strgeometry += '<gml:outerBoundaryIs>' + linearRing + '</gml:outerBoundaryIs>';
                    else
                        strgeometry += '<gml:innerBoundaryIs>' + linearRing + '</gml:innerBoundaryIs>';
                }
            });
            strgeometry += '</gml:Polygon>';
        } else if (type === "linestring") {
            strgeometry += '<gml:LineString srsName="http://www.opengis.net/gml/srs/epsg.xml#4326" xmlns:gml="http://www.opengis.net/gml">'
            if (version === "1.1.0")
                strgeometry += '<gml:posList>'
                        + param.geometry.getCoordinates().toString().replace(
                                /,/g, " ") + '</gml:posList>';
            else if (version === "1.0.0")
                strgeometry += '<gml:coordinates decimal="." cs="," ts=" ">'
                        + param.geometry.getCoordinates().toString()
                        + '</gml:coordinates>';
            strgeometry += '</gml:LineString>';
            param.distance = 0.0006;
            param.relation = ktw.Relations.DWITHIN;
        }
        var isbuffer = param.relation.toLowerCase() != ktw.Relations.DWITHIN.toLowerCase()
                || ktw.IsNull(param.distance) || param.distance <= 0;
        strgeometry = '<ogc:' + param.relation + '>' + strgeometry + (isbuffer ? "" : '<ogc:Distance units="'
                        + (ktw.IsNull(param.unit) ? "degrees" : param.unit)
                        + '">' + param.distance + '</ogc:Distance>') + '</ogc:'
                + param.relation + '>';
        return strgeometry;
    };
})(jQuery);

/* 土地生命周期导航 */
(function ($) {
    ktw.LifeCycle = function (opt) {
        var $this = this;
        $this.YWXX = true;
        var funcnull = function () { };
        opt = opt || {};
        $this.map = opt.map || ktw.App.Map;
        if (opt.conf) {
            $this.conf = opt.conf;

            $this._formatters = {};
            //生成提示框函数
            var func = function (conf) {
                return function (data) {
                    if (ktw.IsNull(conf) || ktw.IsNull(conf.Tips) || ktw.IsNull(conf.Tips.Col)) return;
                    if (ktw.IsNull(data) || data.length == 0) return;
                    var strhtml = '<table class="life-tip-tbl"><tr>';
                    $(conf.Tips.Col).each(function (i, item) {
                        strhtml += '<th style="';
                        if (item.Width) {
                            strhtml += 'width:' + item.Width + 'px;';
                        }
                        if (item.MaxWidth) {
                            strhtml += 'max-width:' + item.MaxWidth + 'px;';
                        }
                        if (item.MinWidth) {
                            strhtml += 'min-width:' + item.MinWidth + 'px;';
                        }
                        strhtml += '">' + item["ByName"] + '</th>';
                    });
                    strhtml += '</tr>';
                    $(data).each(function (index, row) {
                        if (null == row) {
                            return;
                        }
                        strhtml += '<tr>';
                        $(conf.Tips.Col).each(function (i, item) {
                            if (item.Type == "index") {
                                strhtml += '<td>' + (index + 1) + '</td>';
                            }
                            if (item.Type == "text") {
                                if (item.Text) {
                                    strhtml += '<td>' + item.Text + '</td>';
                                } else {
                                    strhtml += '<td>' + row[item.Name] + '</td>';
                                }
                            }
                            if (item.Type == "goto") {
                                if (item.Text) {
                                    strhtml += '<td><a onclick="window.lifecycle_handlers[\'' + row[conf.Layer.Key.toLowerCase()] + '\']()">' + item.Text + '</a></td>';
                                } else {
                                    strhtml += '<td><a onclick="window.lifecycle_handlers[\'' + row[conf.Layer.Key.toLowerCase()] + '\']()">' + row[item.Name] + '</a></td>';
                                }
                            }
                        });
                        strhtml += '</tr>';
                    });
                    strhtml += '</table>';
                    return strhtml;
                }
            };
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
            $(["p", "z", "c", "g", "y", "b", "w"]).each(function (i, item) {
                if ($this.conf[item.toUpperCase()] && $this.conf[item.toUpperCase()].Layer && $this.conf[item.toUpperCase()].Layer.Ref) {
                    //土地生命周期中图层的配置继承字图层树的配置
                    $this.conf[item.toUpperCase()].Layer = $.extend({}, searchLayerTree(ktw.App.Config.SystemMap.ArrayOfMapLayer.MapLayer, $this.conf[item.toUpperCase()].Layer.Ref), $this.conf[item.toUpperCase()].Layer);
                }
                $this._formatters[item] = func($this.conf[item.toUpperCase()]);
            });
        }
        if (opt.Layers) {
            $this._dataLayers = opt.Layers;
        }
        //导航环结构
        var html = '<div style="position: absolute;right: 210px;top: 70px;z-index: 2;">'
            + '<div class="life-outer">'
            + '<div class="life-ring life-bottomright" life="y"><div><span class="label">用<span class="count"><span></span></span></span></div></div>'
            + '<div class="life-ring life-bottommiddle" life="g"><div><span class="label">供</span><span class="count"><span></span></span></span></div></div>'
            + '<div class="life-ring life-bottomleft" life="c"><div><span class="label">储</span><span class="count"><span></span></span></span></div></div>'
            + '<div class="life-ring life-topright" life="z"><div><span class="label">征</span><span class="count"><span></span></span></span></div></div>'
            + '<div class="life-ring life-topmiddle" life="b"><div><span class="label">补</span><span class="count"><span></span></span></span></div></div>'
            + '<div class="life-ring life-topleft" life="w"><div><span class="label">查</span><span class="count"><span></span></span></span></div></div>'
            + '<div class="life-ring life-inner" life="p"><div><span class="label">批</span><span class="count"><span></span></span></div></div>'
        + '</div>';
        +'</div>';
        $this.Target = $(html);
        //注册导航环鼠标移入事件
        $this.Target.find(".life-ring .label").hover(function () {
            var lifetime = $(this).parent().parent().attr("life");
            var strhtml = "";
            if ($.isFunction($this._formatters)) {
                strhtml = $this._formatters($this._data[lifetime]);
            } else {
                strhtml = $this._formatters[lifetime]($this._data[lifetime]);
            }
            if (!ktw.IsNull(strhtml)) {
                tooltip.pop(this, strhtml, {});
            }
        });
        //显示或关闭导航换
        $this.Show = function () { $this.Target.show() };
        $this.Hide = function () {
            $this.Target.hide();//清除生命周期
            ktw.ClearMapTip();//清除冒泡弹出框
            $this.map.HighLightContainer.clear();//清除高亮
            if ($this.AnalysisWin != undefined)//清除统计面板
            {
                $this.AnalysisWin.Target.unbind("onClosed", $this.AnalysisWinonClosed);
                $this.AnalysisWin.Close();

            }
        };
        $this.AnalysisWinonClosed = function () {
            //关闭分类统计表返回之前数据
            if ($this.YWXXHT) {
                ktw.App.HighLight.clearHighLight();
                window.lifecycle_handlers[ktw.App.LifeCtr._data[ktw.App.LifeCtr.loadlifecycleconf.Layer.LifeCycle][0][ktw.App.LifeCtr.loadlifecycleconf.Layer.Key.toLowerCase()]]();
            }
        }
        $this.HideFlash = function () {
            $this.Target.hide();//清除生命周期
            ktw.ClearMapTip();//清除冒泡弹出框
            ktw.App.HighLight.clearHighLight();
        };

        /** 数据格式
            var data = {
                p: [],//批地项目列表
                z: [],//征地项目列表
                c: [],//储地项目列表
                g: [],//供地项目列表
                y: [],//用地项目列表
                b: [],//补地项目列表
                w: [],//查地项目列表
            };
        */
        $this._data = { p: [], z: [], c: [], g: [], y: [], b: [], w: [] };
        $this.type = null;//生命周期的当前周期类型:p、z、c、g、y、b、w
        /* 加载数据和提示框输出函数
         * data:要加载的数据
         * formatters:提示框格式化函数,为函数时作用于所有的生命周期,为其他对象时表示为每个生命周期单独使用格式化函数,不传递时表示使用配置文件默认的方式
        */
        $this.Load = function (data, type, formatters) {
            if (ktw.IsNull(data) || ktw.IsNull(type)) return;
            this.LoadData = data;//赋值保存导航环展示数据
            this.LoadType = type;//赋值保存导航环展示数据
            $this.type = type;
            if ($.isFunction(formatters)) {
                $this._formatters = formatters;
            }
            else if (!ktw.IsNull(formatters)) {
                $this._formatters = { p: funcnull, z: funcnull, c: funcnull, g: funcnull, y: funcnull, b: funcnull, w: funcnull };
                $.extend($this._formatters, formatters);
            }

            $this._data = data;
            window.lifecycle_handlers = {};
            for (var i in $this._data) {
                if ($this._data[i].length > 0) {

                    $this.Target.find(".life-ring[life='" + i + "'] .count").css("display", "inline-block").find("span").html($this._data[i].length);
                    //循环生成地图定位函数                    
                    for (var j = 0; j < $this._data[i].length; j++) {
                        var details = $this._data[i][j];
                        if (null == details) {
                            continue;
                        }
						
						//当type和data的类型保持一致时，才能进行下一步    HKH:2018.7.5
						var tempvalue = details.primaryKey;
						var tempChar=tempvalue[0].toLowerCase();
						var keyValue;
						switch(type)
						{
							case "p": keyValue="j";break;
							case "z":keyValue="z";break;
							case "c":keyValue="c";break;
							case "g":keyValue="g";break;
							case "y":keyValue="d";break;
							case "b":keyValue="b";break;
							case "w":keyValue="w";break;
							
						}
						if(tempChar!=keyValue)
						{
				            continue;
						}
						
                        window.lifecycle_handlers[$this._data[i][j][$this.conf[i.toUpperCase()].Layer.Key.toLowerCase()]] = (function (data, conf) {
                            return function () {
                                $this.loadlifecycleconf = conf;
                                $this.loadlifecycledata = data;
                                var title = conf.Layer.Text;
                                var aj_mc = data.aj_mc;
                                if (null != aj_mc) {
                                    var cd = aj_mc.length;
                                    if (cd > 7) {
                                        aj_mc = aj_mc.substring(0, 7) + "...";
                                        title = title + "(" + aj_mc + ")";
                                    }
                                }

                                var wkt = new ktop.Wkt.Wkt();
                                wkt.read(data.geometry);
                                var polygons = wkt.toObject(true);
                                polygons = ktw.Project.Transform(conf.Layer.EPSG, ktw.EPSG, polygons);
                                ktw.App.HighLight.addHighLight(polygons);
                                ktw.App.HighLight.fit();

                                var content = $("<div></div>");
                                var tabContent = new ktw.Tab({
                                    Visible: true,
                                    Width: 278,
                                    Height: 243,
                                    //Items: items,
                                    TabNormalCls: 'normalTabCls',
                                    TabSelectedCls: 'selectTabCls',
                                    IsDeletedLastTab: false,
                                    Position: "top"
                                });
                                content.append(tabContent.Target);
                                var detailTabPanel = $('<div class="MapTipTabContent" style="/*position:relative;*/"></div>');
                                var fields = conf.Layer.DetailFields.Field;
                                for (var i = 0; i < fields.length; i++) {
                                    var rowdiv = $(
                                            '<div><div class="Title">'
                                                    + fields[i].ByName
                                                    + '</div><div class="TabContent" title="'
                                                    + (ktw.IsNull(data[fields[i].Name.toLowerCase()]) ? "-"
                                                            : data[fields[i].Name.toLowerCase()])
                                                    + '">'
                                                    + (ktw.IsNull(data[fields[i].Name.toLowerCase()]) ? "-"
                                                            : data[fields[i].Name.toLowerCase()])
                                                    + '</div></div>').appendTo(detailTabPanel);


                                }
                                //增加一行空白列,防止悬浮"附件及详情"遮盖最后一行数据
                                $('<div><div class="Title"> </div><div class="TabContent" title=" "></div></div>').appendTo(detailTabPanel);

                                var PanelFjxq = $("<div style=\"height: 30px;position:absolute;/*margin-right: 1px;*/right:17px;line-height:30px;font-size:14px;bottom:0;left:0;text-align:right;padding-right:2px;border-top:1px solid #eee;background-color:#F8F8FF;\"></div>");
                                var type = "";
                                for (var k in $this.conf) { if ($this.conf[k] == conf) { type = k.toLowerCase(); break; } }
                                /*if (ktw.App.Config.Extend.Archive) {
                                    //如果配置了档案就显示档案的超链接
                                    var url_t = ktw.App.Config.Extend.Archive.Url;
                                    if (ktw.App.Config.Extend.Archive.Parameters && ktw.App.Config.Extend.Archive.Parameters.Parameter) {
                                        if (ktw.App.Config.Extend.Archive.Parameters.Parameter.length == undefined) {
                                            ktw.App.Config.Extend.Archive.Parameters.Parameter = [ktw.App.Config.Extend.Archive.Parameters.Parameter];
                                        }
                                        for (var u_i = 0; u_i < ktw.App.Config.Extend.Archive.Parameters.Parameter.length; u_i++) {
                                            if (url_t.indexOf("?") > 0) {
                                                url_t += "&" + ktw.App.Config.Extend.Archive.Parameters.Parameter[u_i].Name + "=" + data[ktw.App.Config.Extend.Archive.Parameters.Parameter[u_i].Attr];
                                            } else {
                                                url_t += "?" + ktw.App.Config.Extend.Archive.Parameters.Parameter[u_i].Name + "=" + data[ktw.App.Config.Extend.Archive.Parameters.Parameter[u_i].Attr];
                                            }
                                        }
                                    }
                                    var daxx = $("<a  href='" + url_t + "' target='_blank' style='color:#206fd5;margin-right:20px'>档案信息</a>").appendTo(PanelFjxq);
                                }*/
                                var fjxq;
                                if (['y'].contains(type)) {
                                    fjxq = $("<a  href='" + ktw.App.Root + "html/onemap/Annex.html?type=" + type + "&guid=" + data[conf.Layer.Key.toLowerCase()] + "' target='_blank' style='color:#206fd5'>附件及详情</a>").appendTo(PanelFjxq);
                                }
                                else {
                                    fjxq = $("<a  href='" + ktw.App.Root + "html/onemap/Annex.html?type=" + type + "&guid=" + data[conf.Layer.Key.toLowerCase()] + "' target='_blank' style='color:#206fd5'>附件及详情</a>").appendTo(PanelFjxq);
                                }
                                //var fjxq = $("<a  href='" + ktw.App.Root + "html/onemap/Annex.html?type=" + type + "&guid=" + data[conf.Layer.Key.toLowerCase()] + "' target='_blank' style='color:#206fd5'>附件及详情</a>").appendTo(PanelFjxq);
                                PanelFjxq.appendTo(detailTabPanel);

                                var PanelFxx = $("<div style=\"height: 41px; margin-left: 5px;margin-right: 5px;margin-top:40px;\"></div>");
                                //一键式分析配置项
                                var btnAnalysis = ktw.App.Config.Extend.Analysis[type.toUpperCase()];

                                $this.GlandArea = new ktw.GetGlandArea();
                                $this.waitbox = new ktw.UCWaitBox(ktw.App.GlobalQuery.DataPanel);
                                $($this.GlandArea.obj).bind("onGlandAreaSuccess", function (e, obj) {
                                    if (obj.Success == false) {
                                        //alert("分析范围过大，请缩小范围");
                                        ktw.Alert("分析失败,请检查网络请求!");
                                        $this.waitbox.Close();
                                        return;
                                    }
                                    if (obj.Count == 0) {
                                        ktw.Alert("与该图层无叠加部分！");
                                        $this.waitbox.Close();
                                        return;
                                    }
                                    else {
                                        $this.datagriddata = [];
                                        $this.layerdata = obj.layerdata.features;
                                        if (obj.Features.length > 0) {
                                            for (var i = 0; i < obj.Features.length; i++) {

                                                obj.Features[i].properties.YZB = ((obj.Features[i].properties.glandarea / obj.Features[i].properties.allarea) * 100).toFixed(2) + "%";
                                                obj.Features[i].properties.glandarea = (obj.Features[i].properties.glandarea / 10000).toFixed(4);
                                                obj.Features[i].properties.allarea = (obj.Features[i].properties.allarea / 10000).toFixed(4);
                                                $this.datagriddata.push(obj.Features[i].properties);
                                            }
                                        }
                                        var content = $("<div style=\"height:100%;width:100%;\"></div>");
                                        var columns = [];
                                        var gridfields = [];
                                        if ($this.CurrertAnalysis.DetailFields.Field.length == undefined) {
                                            $this.CurrertAnalysis.DetailFields.Field = [$this.CurrertAnalysis.DetailFields.Field];
                                        }
                                        for (var i = 0; i < $this.CurrertAnalysis.DetailFields.Field.length; i++) {
                                            var a = { "Name": $this.CurrertAnalysis.DetailFields.Field[i].Name, "ByName": $this.CurrertAnalysis.DetailFields.Field[i].ByName };
                                            gridfields.push(a);
                                        }
                                        gridfields.push({ "Name": "allarea", "ByName": "总面积" });
                                        gridfields.push({ "Name": "glandarea", "ByName": "压占面积" });
                                        gridfields.push({ "Name": "YZB", "ByName": "压占比" });
                                        for (var i = 0; i < gridfields.length; i++) {
                                            columns.push({ field: gridfields[i].Name, title: gridfields[i].ByName, width: 70, align: 'center', sortable: false });
                                        }
                                        //
                                        var exdata = [];
                                        if (($this.CurrertAnalysis.Statistics instanceof Array) == false && $this.CurrertAnalysis.Statistics != null) {
                                            exdata.push($this.CurrertAnalysis.Statistics);
                                            $this.CurrertAnalysis.Statistics = exdata;
                                        }
                                        for (var i = 0; i < $this.CurrertAnalysis.Statistics.length; i++) {
                                            var button = $("<span class='button' Name=\"" + $this.CurrertAnalysis.Statistics[i].Name + "\"Tag=\"" + $this.CurrertAnalysis.Statistics[i].GroupBy + "\"  style=\"margin-top: 8px;margin-bottom: 8px;margin-left:35px; \">" + $this.CurrertAnalysis.Statistics[i].ByName + "</span>").appendTo(content);
                                            //汇总统计
                                            button.click(function () {
                                                var byname = $(this).text();
                                                if ($this.CurrertAnalysis.Statistics.length == undefined) {
                                                    $this.CurrertAnalysis.Statistics = [$this.CurrertAnalysis.Statistics];
                                                }
                                                for (var t_k = 0; t_k < $this.CurrertAnalysis.Statistics.length; t_k++) {
                                                    if ($this.CurrertAnalysis.Statistics[t_k].ByName == byname) {
                                                        $this.CurrertAnalysis.CurrertStatistic = $this.CurrertAnalysis.Statistics[t_k];
                                                        break;
                                                    }
                                                }
                                                if ($this.CurrertAnalysis.BtnName == "土地利用现状" && byname == "根据土地用途汇总统计") {
                                                    var result = Enumerable.From($this.datagriddata).GroupBy("{" + this.attributes.tag.nodeValue + ":" + "$." + this.attributes.tag.nodeValue + ",权属性质:" + "$.权属性质" + "}", null,
                                                          function (key, g) {
                                                              var result = {
                                                                  //currency: key,
                                                                  dlmc: key.地类名称,
                                                                  qsxz: key.权属性质,
                                                                  glandtotal: parseFloat(g.Sum("$.glandarea")).toFixed(4),
                                                                  alltotal: parseFloat(g.Sum("$.allarea")).toFixed(4),
                                                                  count: g.Count()
                                                              }
                                                              return result;
                                                          }, "$.地类名称 + '-'+ $.权属性质").ToArray();
                                                    $this.StatisticsData = result;
                                                    var ctr = new window.top.ktw.Window({
                                                        ID: "ktw_flhz",
                                                        Title: "分类汇总",
                                                        IconCls: "icon-Search2 ",
                                                        Height: 475,
                                                        Width: 900,
                                                        Left: 20,
                                                        Top: 80,
                                                        Parent: $(window).Target,
                                                        IsMaximize: true,
                                                        IsMinimize: false,
                                                        Maximizable: true,
                                                        Minimizable: true,
                                                        Draggable: true,
                                                        Resizable: true,
                                                        Url: "html/onemap/table_flhz.html",
                                                        Parameters: { result: $this.StatisticsData, conf: $this.loadlifecycleconf, data: $this.loadlifecycledata }
                                                    });
                                                    ctr.Layout();
                                                    ctr.Open();
                                                }
                                                else if ($this.CurrertAnalysis.BtnName == "土地利用规划" && byname == "根据用地管制区分类汇总") {
                                                    var result = {};
                                                    var total = window.parseFloat($this.loadlifecycledata[$this.CurrertAnalysis.CurrertStatistic.AllArea]);
                                                    //
                                                    if (isNaN(total)) {
                                                        total = 10000;
                                                        console.error("计算出错,结果将出现较大误差,请检查配置：Extend>Analysis>P|Z|C|G|Y|B|W>BtnAnalysis>Statistics>AllArea的配置是否存在数字!");
                                                    }
                                                    //total = total / 10000;//换算成公顷
                                                    var kinds = $this.CurrertAnalysis.CurrertStatistic.Kinds.Kind;
                                                    for (var tt_k = 0; tt_k < kinds.length; tt_k++) {
                                                        result[kinds[tt_k].ByName] = {};
                                                        result[kinds[tt_k].ByName].coverarea = 0;
                                                        result[kinds[tt_k].ByName].coverallarea = 0;
                                                        result[kinds[tt_k].ByName].percent = 0;
                                                    }
                                                    for (var tt_k = 0; tt_k < $this.datagriddata.length; tt_k++) {
                                                        var groupbyvalue = $this.datagriddata[tt_k][$this.CurrertAnalysis.CurrertStatistic.GroupBy];
                                                        var coverarea = window.parseFloat($this.datagriddata[tt_k][$this.CurrertAnalysis.CurrertStatistic.CoverArea]);
                                                        var coverallarea = window.parseFloat($this.datagriddata[tt_k][$this.CurrertAnalysis.CurrertStatistic.CoverAllArea]);
                                                        if (isNaN(coverarea)) {
                                                            coverarea = 0;
                                                        }
                                                        if (isNaN(coverallarea)) {
                                                            coverallarea = 0;
                                                        }
                                                        for (var tt_j = 0; tt_j < kinds.length; tt_j++) {
                                                            if (kinds[tt_j].Values.Value.length == undefined) {
                                                                kinds[tt_j].Values.Value = [kinds[tt_j].Values.Value];
                                                            }
                                                            if (kinds[tt_j].Values.Value.contains(groupbyvalue)) {
                                                                result[kinds[tt_j].ByName].coverarea += coverarea;
                                                                result[kinds[tt_j].ByName].coverallarea += coverallarea;
                                                                result[kinds[tt_j].ByName].percent = ((result[kinds[tt_j].ByName].coverarea / total) * 100).toFixed(2) + "%";
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    $this.StatisticsData = result;
                                                    var tbl = $("<table class='form-tbl' style='width:100%;font-size:12px;'></table>");
                                                    var tbl_head = $("<tr class='ydgz-tr'>" +
                                                        "<td class='from-title' style='background-color:#F3F3F3;'>地块总面积(公顷)</td>" +
                                                        "<td class='from-title' style='background-color:#F3F3F3;'>类型</td>" +
                                                        "<td class='from-title' style='background-color:#F3F3F3;'>面积(公顷)</td>" +
                                                        "<td class='from-title' style='background-color:#F3F3F3;'>地块总面积</td>" +
                                                        "<td class='from-title' style='background-color:#F3F3F3;'>占总面积比例</td>" +
                                                        "</tr>").appendTo(tbl);
                                                    var tt_o = 0;
                                                    for (var tt_kind in result) {
                                                        if (tt_o == 0) {
                                                            var tbl_row = $("<tr>" +
                                                        "<td rowspan='4' class='form-text'>" + total + "</td>" +
                                                        "<td class='form-text'>" + tt_kind + "</td>" +
                                                        "<td class='form-text'>" + (result[tt_kind].coverarea).toFixed(2) + "</td>" +
                                                        "<td class='form-text'>" + (result[tt_kind].coverallarea).toFixed(2) + "</td>" +
                                                        "<td class='form-text'>" + result[tt_kind].percent + "</td></tr>").appendTo(tbl);
                                                        } else {
                                                            var tbl_row = $("<tr>" +
                                                       "<td class='form-text'>" + tt_kind + "</td>" +
                                                       "<td class='form-text'>" + (result[tt_kind].coverarea).toFixed(2) + "</td>" +
                                                        "<td class='form-text'>" + (result[tt_kind].coverallarea).toFixed(2) + "</td>" +
                                                       "<td class='form-text'>" + result[tt_kind].percent + "</td></tr>").appendTo(tbl);
                                                        }
                                                        tt_o++;
                                                    }

                                                    var ctr = new window.top.ktw.Window({
                                                        ID: "ktw_flhz_ydgz",
                                                        Title: "管制区分类汇总",
                                                        IconCls: "icon-Search2 ",
                                                        Height: 230,
                                                        Width: 600,
                                                        Left: (document.body.clientWidth - 600) / 2,
                                                        Top: (document.body.clientHeight - 400) / 2,
                                                        Parent: $(window).Target,
                                                        IsMaximize: false,
                                                        IsMinimize: false,
                                                        Maximizable: true,
                                                        Minimizable: true,
                                                        Draggable: true,
                                                        Resizable: true,
                                                        Content: tbl
                                                    });
                                                    ctr.Layout();
                                                    ctr.Open();
                                                }
                                                else {
                                                    var result = Enumerable.From($this.datagriddata).GroupBy("$." + this.attributes.tag.nodeValue, null,
                                                              function (key, g) {
                                                                  var result = {
                                                                      currency: key,
                                                                      glandtotal: parseFloat(g.Sum("$.glandarea")).toFixed(4),
                                                                      alltotal: parseFloat(g.Sum("$.allarea")).toFixed(4),
                                                                      count: g.Count()
                                                                  }
                                                                  return result;
                                                              }).ToArray();
                                                    $this.StatisticsData = result;
                                                    var dataGrid;
                                                    var content = $("<div style=\"height:100%;width:100%;\"></div>");
                                                    dataGrid = new ktw.UCDataGrid({
                                                        PageIndex: 1,
                                                        PageSize: 10,
                                                        RowNumbers: true,
                                                        ID: "StatisticsSourceGrid",
                                                        pagequery: false,
                                                        CSS: {
                                                            "height": "100%",
                                                            "width": "100%"
                                                        }
                                                    });
                                                    // 分页变化事件
                                                    dataGrid.Target.bind("onSelectPage", function (s, e) {
                                                        var pageInfo = {
                                                            pageIndex: e.index,
                                                            pageSize: 10,
                                                            totalCount: $this.StatisticsData.length,
                                                            msg: "共{total}条数据"
                                                        };
                                                        var data = $this.StatisticsData.clone();
                                                        dataGrid.Load(data.splice((e.index - 1) * e.size, e.size), pageInfo);
                                                    });
                                                    content.append(dataGrid.Target);
                                                    $this.StatisticsWin = new ktw.Window({
                                                        ID: "ktw-Statistics",
                                                        Content: content,
                                                        IconCls: "icon-Search2 ",
                                                        Height: 340,
                                                        Width: 410,
                                                        Left: (top.document.body.clientWidth - 500) / 2,
                                                        Top: (top.document.body.clientHeight - 350) / 2,
                                                        Draggable: true,
                                                        Title: '统计结果',
                                                        Parent: ktw.App.MapPanel.Target,
                                                        InitVisible: false,
                                                        Modal: false,
                                                        IsMaximize: false,
                                                        IsMinimize: false,
                                                        Maximizable: false,
                                                        Minimizable: true
                                                    });
                                                    $this.StatisticsWin.Open();
                                                    var columns = [];
                                                    var gridfields = [];
                                                    gridfields.push({ "Name": "currency", "ByName": this.attributes.name.nodeValue });
                                                    gridfields.push({ "Name": "glandtotal", "ByName": "压占面积(㎡)" });
                                                    gridfields.push({ "Name": "alltotal", "ByName": "总面积(㎡)" });
                                                    gridfields.push({ "Name": "count", "ByName": "地块数" });
                                                    for (var i = 0; i < gridfields.length; i++) {
                                                        columns.push({ field: gridfields[i].Name, title: gridfields[i].ByName, width: 50, align: 'center', sortable: false });
                                                    }
                                                    dataGrid.Layout(columns);
                                                    var pageInfo = {
                                                        pageIndex: 1,
                                                        pageSize: 10,
                                                        totalCount: $this.StatisticsData.length,
                                                        msg: "共{total}条数据"
                                                    };
                                                    var data = $this.StatisticsData.clone();
                                                    dataGrid.Load(data.splice(0, 10), pageInfo);
                                                }
                                            });
                                        }
                                        /////
                                        var dataGrid = new ktw.UCDataGrid({
                                            PageIndex: 1,
                                            PageSize: 10,
                                            RowNumbers: true,
                                            ID: "taxSourceGrid",
                                            pagequery: false,
                                            CSS: {
                                                "margin-top": "50px",
                                                "height": "310px",
                                                "width": "100%"
                                            },
                                        });
                                        // 分页变化事件
                                        dataGrid.Target.bind("onSelectPage", function (s, e) {
                                            $this.PageIndex = e.index;
                                            $this.PageSize = e.size;
                                            $this.startIndex = (e.index - 1) * e.size;
                                            var pageInfo = {
                                                pageIndex: $this.PageIndex,
                                                pageSize: 10,
                                                totalCount: $this.datagriddata.length,
                                                msg: "共{total}条数据"
                                            };
                                            var data = $this.datagriddata.clone();
                                            dataGrid.Load(data.splice($this.startIndex, e.size), pageInfo);
                                        });
                                        // 行选中事件
                                        dataGrid.Target.bind("onSelectRow", {}, function (s, e) {
                                            //if (ktw.App.LifeCtr) {
                                            //    ktw.App.LifeCtr.Hide();
                                            //}
                                            $this.YWXXHT = true;
                                            $this.RowIndex = ($this.PageIndex - 1) * $this.PageSize + e.index;
                                            $this.curLayerinfo = undefined;
                                            ktw.App.HighLight.hightLightFit($this.layerdata[$this.RowIndex]);
                                            for (var i = 0; i < ktw.App.GlobalQuery.LayerInfoConfiger.length; i++) {
                                                if ($this.CurrertAnalysis.Ref == ktw.App.GlobalQuery.LayerInfoConfiger[i].ID) {
                                                    $this.curLayerinfo = ktw.App.GlobalQuery.LayerInfoConfiger[i]
                                                }
                                            }
                                            if (!$this.curLayerinfo && $this.CurrertAnalysis.DetailFields) {
                                                $this.curLayerinfo = $this.CurrertAnalysis;
                                            }
                                            if ($this.curLayerinfo != undefined) {
                                                var data = $this.layerdata[$this.RowIndex];
                                                var content = $("<div></div>");
                                                var fields = $this.curLayerinfo.DetailFields.Field;
                                                for (var i = 0; i < fields.length; i++) {
                                                    var rowdiv = $(
                                                            '<div class="row"><div class="Title">'
                                                                    + fields[i].ByName
                                                                    + '</div><div class="Content" style="width:180px;" title="'
                                                                    + (ktw.IsNull(data.properties[fields[i].Name]) ? "-"
                                                                            : data.properties[fields[i].Name])
                                                                    + '">'
                                                                    + (ktw.IsNull(data.properties[fields[i].Name]) ? "-"
                                                                            : data.properties[fields[i].Name])
                                                                    + '</div></div>').appendTo(content);
                                                }
                                                //增加一行空白列,防止悬浮"附件及详情"遮盖最后一行数据
                                                $('<div class="row"><div class="Title"> </div><div class="Content" title=" "></div></div>').appendTo(content);
                                                var type = $this.CurrertAnalysis.Tag;
                                                var PanelFjxq = null;
                                                if (['p', 'z', 'c', 'g', 'y', 'b', 'w'].contains(type)) {
                                                    var guid = $this.layerdata[$this.RowIndex].properties[$this.CurrertAnalysis.Key];
                                                    PanelFjxq = $('<div style="height: 30px;z-index:999;position:absolute;/*margin-right: 1px;*/right:17px;line-height:30px;font-size:14px;bottom:0;left:0;text-align:right;padding-right:2px;border-top:1px solid #eee;background-color:#F8F8FF;"></div>')
                                                    var fjxq;
                                                    if (['y'].contains(type)) {
                                                        fjxq = $("<a  href='" + ktw.App.Root + "html/onemap/Annex3.html?type=" + type + "&guid=" + guid + "' target='_blank' style=\"color:#206fd5\" >附件及详情</a>").appendTo(PanelFjxq);
                                                    }
                                                    else {
                                                        fjxq = $("<a  href='" + ktw.App.Root + "html/onemap/Annex.html?type=" + type + "&guid=" + guid + "' target='_blank' style=\"color:#206fd5\" >附件及详情</a>").appendTo(PanelFjxq);
                                                    }

                                                    PanelFjxq.appendTo(content);
                                                    PanelFjxq.appendTo($("#taxInfo"));
                                                }
                                                ktw.ShowMapTip($this.layerdata[$this.RowIndex], {
                                                    ID: "taxInfo",
                                                    Title: "详细信息",
                                                    Content: content
                                                });
                                            }
                                        });

                                        content.append(dataGrid.Target);

                                        if ($this.AnalysisWin != undefined) {
                                            $this.YWXXHT = false;
                                            $this.AnalysisWin.Close();
                                        }
                                        $this.AnalysisWin = new ktw.Window({
                                            ID: "ktw-YJSFX",
                                            Content: content,
                                            IconCls: "icon-Search2 ",
                                            Height: 395,
                                            Width: 435,
                                            Left: 100,
                                            Top: 158,
                                            Draggable: true,
                                            Title: $this.CurrertAnalysis.BtnName + " （单位：公顷）",
                                            Parent: ktw.App.MapPanel.Target,
                                            InitVisible: false,
                                            Modal: false,
                                            IsMaximize: false,
                                            IsMinimize: false,
                                            Maximizable: false,
                                            Minimizable: true
                                        });
                                        dataGrid.Layout(columns);
                                        $this.AnalysisWin.Open();
                                        $this.AnalysisWin.Target.bind("onClosed", $this.AnalysisWinonClosed);
                                        $this.waitbox.Close();
                                        $this.PageIndex = 1;
                                        $this.PageSize = 10;
                                        var pageInfo = {
                                            pageIndex: $this.PageIndex,
                                            pageSize: $this.PageSize,
                                            totalCount: $this.datagriddata.length,
                                            msg: "共{total}条数据"
                                        };
                                        var data = $this.datagriddata.clone();
                                        dataGrid.Load(data.splice(0, 10), pageInfo);

                                    }
                                });
                                for (var i = 0; i < btnAnalysis.BtnAnalysis.length; i++) {
                                    var pddj = $("<span class='button' Tag=\"" + btnAnalysis.BtnAnalysis[i].Tag + "\"style=\"margin-top: 10px;width: 75px;margin-left:15px;\">" + btnAnalysis.BtnAnalysis[i].BtnName + "</span>");
                                    pddj.click(function (analysis, analysisBtn) {
                                        return function () {
                                            if (analysisBtn.Type == "window") {
                                                var ctr = new ktw.Window({
                                                    ID: "onemap-fzsp",
                                                    Title: "辅助分析",
                                                    IconCls: "icon-Search2 ",
                                                    Height: window.innerHeight * 0.8,
                                                    Width: window.innerWidth * 0.9,
                                                    Left: window.innerWidth * 0.05,
                                                    Top: 120,
                                                    Parent: $(document.body),
                                                    IsMaximize: true,
                                                    Maximizable: true,
                                                    Minimizable: true,
                                                    Draggable: true,
                                                    Resizable: true,
                                                    Url: analysisBtn.Window.Url,
                                                    Parameters: { conf: conf, data: data },
                                                });
                                            }
                                            else {
                                                $this.CurrertAnalysis = analysisBtn;
                                                var wkt1 = new ktop.Wkt.Wkt();
                                                wkt1.read(ktw.ConvertWKT(data.geometry));
                                                var polygons1 = wkt1.toObject(true);
                                                var args = {
                                                    Url: ktw.GetSystemUrlByRelID(analysisBtn.OWS),
                                                    TypeName: analysisBtn.AnalysisLayer,
                                                    Geometry: polygons1.toGeoJSON(),
                                                    filterName: analysisBtn.GeometryName,
                                                    SourceProject: analysisBtn.EPSG,
                                                    TargetProject: ktw.ProEPSG
                                                }
                                                $this.GlandArea.call(args);
                                                $this.waitbox.Show();
                                            }
                                        }
                                    }(btnAnalysis, btnAnalysis.BtnAnalysis[i]));
                                    pddj.appendTo(PanelFxx);
                                }
                                var items = [];
                                items.push({
                                    ID: 'tab1',
                                    Name: '基本信息',
                                    Content: detailTabPanel,
                                    IsScrolling: true,
                                    IsDeleted: false,
                                    IsSelected: true
                                });
                                items.push({
                                    ID: 'tab2',
                                    Name: '辅助决策',
                                    Content: PanelFxx,
                                    IsScrolling: false,
                                    IsDeleted: false,//false隐藏delete控件
                                    IsSelected: false
                                });
                                tabContent.Items = items;
                                $this.YWXX = true;
                                tabContent.RefreshItem();
                                tabContent.Layout();

                                ktw.ShowMapTip($.extend(polygons, {
                                    "properties": data
                                }), {
                                    ID: "taxInfo",
                                    //Title: "详细信息",
                                    Title: title,
                                    Content: content
                                });

                            }
                        })($this._data[i][j], $this.conf[i.toUpperCase()]);
                    }
                } else {
                    $this.Target.find(".life-ring[life='" + i + "'] .count").hide();
                }
            }
        }

        $this.ShowType = function () {
            if ($this.type) {
                ktw.App.HighLight.clearHighLight();
                var key = $this.conf[$this.type.toUpperCase()].Layer.Key.toLowerCase();
                window.lifecycle_handlers[$this._data[$this.type][0][key]]();
            }
        }
    }
})(jQuery);

/* 地图图例,每个地图有且只有一个图例容器,存储在map.__legend */
(function ($) {
    ktw.Legend = function (opt) {
        var $this = this;
        //引用图例控件
        $this._legend = {};
        opt = opt || {};
        //记录全局的图例配置
        $this.conf = opt.conf = opt.conf || {};
        $this.map = opt.map = opt.map || ktw.App.Map;
        opt.mapSwitch = opt.mapSwitch || ktw.App.MapSwitch;
        //记录最近一次底图开关的切换值
        $this._type = opt.mapSwitch.type;
        if (!opt.conf.length) opt.conf = [opt.conf];
        //记录最近一次设置的图例数据源配置
        $this._dataLegend = [];
        //加载图例数据,会将_dataLegend覆盖掉
        $this.LoadData = function (dataLegend, type) {
            try {
                if (dataLegend) $this._dataLegend = $.isArray(dataLegend) ? dataLegend : [dataLegend];
                if (type) $this.type = type;
                var opt2 = {
                    itemSource: []
                };
                $($this.conf).each(function (i, item) {
                    if (item.TypeEx == $this.type) {
                        item.Item = item.Item || [];
                        if (!item.Item.length) item.Item = [item.Item];
                        $(item.Item).each(function (j, item2) {
                            opt2.itemSource.push({
                                text: item2.Text,
                                subType: item2.SubType,
                                fillColor: item2.Fill.Color,
                                fillOpacity: item2.Fill.Opacity,
                                borderColor: item2.Border.Color,
                                borderOpacity: item2.Border.Opacity,
                            });
                        });
                    }
                });
                $($this._dataLegend).each(function (j, item3) {
                    item3.Type = item3.Type || "Part";
                    item3.Item = item3.Item || [];
                    $(item3.Item).each(function (i, item2) {
                        opt2.itemSource.push({
                            text: item2.Text,
                            subType: item2.SubType,
                            fillColor: item2.Fill.Color,
                            fillOpacity: item2.Fill.Opacity,
                            borderColor: item2.Border.Color,
                            borderOpacity: item2.Border.Opacity,
                        });
                    });
                });
                if (opt2.itemSource.length > 0) { opt2.visible = true; } else { opt2.visible = false; }
                if (!opt.map.__legend) {
                    opt.map.__legend = $this;
                    opt.map.__legend._legend = new ktw.MapLegend(opt2).addTo(opt.map);
                    opt.map.__legend._legend.setTitle('图例');
                } else {
                    opt.map.__legend._legend.setData(opt2.itemSource);
                    opt.map.__legend._legend.setVisible(opt2.visible);
                }
            } catch (e) {
                console.error(e);
            }
        }
        //清除图例数据,清除_dataLegend数据,重新加载全局的图例
        $this.ClearData = function () {
            $this.LoadData({});
        }
        //添加图例数据,向_dataLegend中添加数据,重新加载
        $this.AddData = function (dataLegend) {
            $this._dataLegend.push(dataLegend);
            $this.LoadData($this._dataLegend);
        }
        //从图例容器中移除数据
        $this.RemoveData = function (dataLegend) {
            $this._dataLegend.remove(dataLegend);
            $this.LoadData($this._dataLegend);
        }
        //加载数据到图例容器中
        $this.LoadData([], opt.mapSwitch.type);
        opt.mapSwitch.Target.bind("onSwitch", function (event, type) {
            $this.LoadData($this._data, opt.mapSwitch.type);
        });
    }
})(jQuery);

/*页面弹出框*/
(function ($) {
    var opt = {
        Parent: $(document.body),
        Effect: "up",
        ButtonVisible: true,
        AutoVisible: false,
        AutoShow: false,
        HAlign: "center",
        VAlign: "center",
        HideCancle: true
    };
    window.ktw = ktw || {};
    ktw.Alert = function (msg, isModal, callback) {
        if (ktw.IsNull(isModal)) isModal = true;
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: !!isModal ? true : false, Type: "warn" }));
        ctr.Alert(msg, null, callback);
    }
    ktw.Alert_Short = function (msg) {
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: false, Type: "warn", ButtonVisible: false, AutoVisible: true, Timeout: 1400 }));
        ctr.Alert(msg);
    }
    ktw.Info = function (msg, isModal, callback) {
        if (ktw.IsNull(isModal)) isModal = true;
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: !!isModal ? true : false, Type: "info" }));
        ctr.Alert(msg, null, callback);
    }
    ktw.Info_Short = function (msg) {
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: false, Type: "info", ButtonVisible: false, AutoVisible: true, Timeout: 1400 }));
        ctr.Alert(msg);
    }
    ktw.Error = function (msg, isModal, callback) {
        if (ktw.IsNull(isModal)) isModal = true;
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: !!isModal ? true : false, Type: "error" }));
        ctr.Alert(msg, null, callback);
    }
    ktw.Error_Short = function (msg) {
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: false, Type: "error", ButtonVisible: false, AutoVisible: true, Timeout: 1400 }));
        ctr.Alert(msg);
    }
    ktw.Confirm = function (msg, okBack, cancelBack) {
        var ctr = new ktw.Messager($.extend({}, opt, { Modal: true, Type: "question", HideCancle: false }));
        ctr.Confirm(msg, function (res) {
            if (res && typeof (okBack) == "function") okBack();
            if (!res && typeof (cancelBack) == "function") cancelBack();
        }, null);
    }
})(jQuery);

/*表单加载数据*/
(function ($) {
    ktw.InitForm = function (guid) {
        var data = {
            //批地
            T_INF_ONEMAP_JSYDSPXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "jsydsp/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_ZDXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/zdxx/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_CBYDXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/cbyd/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_TDGYXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/tdgy/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_DJFZXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/djfz/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_BCGDXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/bcgd/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_AJDJXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/ajdj/getbyid/#guid#",
                isInit: false,
                fail: false,//是否初始化失败
            },
            T_INF_ONEMAP_AJDJKZXXB: {
                data: {},
                url: ktw.cookie.ServerUrl + "/ajdjkz/getbyfilter/AJ_DJ_GUID=\'#guid#\'",
                isInit: false,
                fail: false,//是否初始化失败
                type: "array"
            },
            BDC_ZRZ: {
                data: {},
                url: ktw.cookie.ServerUrl + "zrz/getbyfilter/id=\'#guid#\'",
                isInit: false,
                fail: false,//是否初始化失败
                type: "array"
            },
            BDC_ZDJBXX: {
                data: {},
                url: ktw.cookie.ServerUrl + "zdjbxx/getbyfilter/zddm=\'#guid#\'",
                isInit: false,
                fail: false,//是否初始化失败
                type: "array"
            },
        };
        $("[readname]").each(function (i, item) {
            var attr = $(item).attr("readname");
            var pre = attr.split(".")[0];
            var col = attr.split(".")[1];
            if (!data[pre].isInit && !data[pre].fail) {
                $.ajax({
                    type: "get",
                    url: data[pre].url.replace("#guid#", guid),
                    async: false,
                    success: function (res) {
                        if (res.success) {
                            if (data[pre].type == "array") {
                                res.data = (res.data || [])[0];
                            }
                            data[pre].data = res.data;
                            data[pre].isInit = true;
                        } else {
                            ktw.Error(res.message);
                            data[pre].fail = true;
                        }
                        if (!data[pre].data) data[pre].fail = true;
                    },
                    error: function (res) {
                        ktw.Error("请求数据出错!");
                        console.error(res);
                    }
                });
            }
            try {
                if (pre == "T_INF_ONEMAP_ZDXXB") {
                    if (data[pre].data.bcbz_dw != null)
                        $("#bcbz").html("补偿标准(" + data[pre].data.bcbz_dw + ")")
                }
                if (data[pre].data == undefined) return;
                var reg = /^$|^(\d+)(\.\d+)?$/;
                var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,4}';
                if (reg.test(data[pre].data[col.toLowerCase()]) == true && col != "NF") {
                    $(item).html(data[pre].data[col.toLowerCase()].toString().match(RegStr));
                }
                else $(item).html(data[pre].data[col.toLowerCase()]);
            } catch (ex) {
                console.error(ex);
            }

        });
    }
})(jQuery);

/*应用统计弹框*/
(function ($) {
    ktw.Statistic = function () {
        var $this = this;
        $this.Init = function () {
            var pos = {
                Top: 215,
                Right: 10,
                ContentTop: 0,
                ContentRight: 40
            };
            var size = {
                Width: 220,
                //Height: 235
                Height: 310
            };
            var popbox = $this.PopBox = new ktw.PopBox({
                ID: "onemap-statistic",
                PopIconCls: "icon-pop-statistic",
                Position: pos,
                Size: size,
                Parent: ktw.App.MapPanel.Target,
                ContentIconCls: "icon-type",
                ContentTitle: "统计分析"
            });
            $("#onemap-statistic").css("z-index", 3);
            /*function _hover() {
                var cls = $(this).attr("class");
                $(this).removeAttr("class");
                cls = cls.indexOf("1") > 0 ? cls.substr(0, cls.length - 1) : cls + "1";
                $(this).addClass(cls);
            }*/
            //土地利用动态变化检测
            var btn = $('<div class="statistic-common icon-statistic-tdjc"><span>土地监测</span></div>');
            popbox.Add(btn);
            btn.hover(function () { }).click(function () {
                // 土地监测				
                var ctr = new ktw.Window({
                    ID: "ktw-LandMonitoring;",
                    Title: "土地监测",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: true,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "tdlybhjc.html"
                });
                ctr.Layout();
                ctr.bind("onClosed", function () {
                    $("#ktw_lxfx").parent().remove();
                    $("#ktw - Statistics_zzt").parent().remove();
                })
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });
            //供地专题
            var btn2 = $('<div class="statistic-common icon-statistic-gdzt"><span>供地专题</span></div>');
            popbox.Add(btn2);
            btn2.hover(function () { }).click(function () {
                // 土地监测
                var ctr = new ktw.Window({
                    ID: "ktw-LandMonitoring;",
                    Title: "土地监测",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: true,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/policysupport/gongdi/index.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });
            //土地资源
            var btn3 = $('<div class="statistic-common icon-statistic-tdzy"><span>土地资源</span></div>');
            popbox.Add(btn3);
            btn3.hover(function () { }).click(function () {
                // 土地资源
                var ctr = new ktw.Window({
                    ID: "ktw-LandMonitoring;",
                    Title: "土地资源",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: true,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/policysupport/landresources/landResources.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });
            //旅游
            var btn3 = $('<div class="statistic-common icon-statistic-ly"><span>旅游</span></div>');
            popbox.Add(btn3);
            btn3.hover(function () { }).click(function () {
                // 旅游
                var ctr = new ktw.Window({
                    ID: "ktw-LandMonitoring;",
                    Title: "旅游",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: true,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/policysupport/lvyou/tour.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });
            //耕地保护
            var btn3 = $('<div class="statistic-common icon-statistic-gdbh"><span>耕地保护</span></div>');
            popbox.Add(btn3);
            btn3.hover(function () { }).click(function () {
                // 耕地保护
                var ctr = new ktw.Window({
                    ID: "ktw-LandMonitoring;",
                    Title: "耕地保护",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: true,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/policysupport/gengdi/ploughProtect.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });
            //建设用地宏观分析
            var btn3 = $('<div class="statistic-common icon-statistic-jsyd"><span>建设用地</span></div>');
            popbox.Add(btn3);
            btn3.hover(function () { }).click(function () {
                // 建设用地宏观分析
                var ctr = new ktw.Window({
                    ID: "ktw-LandMonitoring;",
                    Title: "建设用地宏观分析",
                    Height: window.innerHeight * 0.8,
                    Width: window.innerWidth * 0.9,
                    Left: window.innerWidth * 0.05,
                    Top: 120,
                    Parent: $(document.body),
                    IsMaximize: true,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/policysupport/jianshe/macroAnalysis.html"
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });

            //土地现状
            var btn3 = $('<div class="statistic-common icon-statistic-tdzy"><span>土地现状</span></div>');
            popbox.Add(btn3);
            window.__tdlyxz_flhz = function (item) {
                var areacode = $(item).attr("data-xzqdm");
                var areaname = $(item).attr("data-xzqmc");
                console.log(areacode + areaname);
                var ctr = new ktw.Window({
                    ID: "ktw_tdxz",
                    Title: "分类汇总",
                    IconCls: "icon-Search2 ",
                    Height: 475,
                    Width: 900,
                    Left: 20,
                    Top: 80,
                    Parent: $(window).Target,
                    IsMaximize: true,
                    IsMinimize: false,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/onemap/table_flhz.html",
                    Parameters: { result: null, conf: null, data: null, areacode: areacode, areaname: areaname }
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            }
            btn3.hover(function () {
                var str = "";
                for (var tt_i = 0; tt_i < ktw.cookie.AreaTree.Children.length; tt_i++) {
                    var area = ktw.cookie.AreaTree.Children[tt_i];
                    str += '<div class="statistic-common icon-statistic-tdzy" onclick="__tdlyxz_flhz(this)" data-xzqdm="' + area.areacode + '" data-xzqmc="' + area.areaname + '"><span>' + area.areaname + '</span></div>';
                }
                tooltip.pop(this, str, {
                    cssClass: "pop-xzqh"
                });
            }).click(function () {
                // 土地现状
                var ctr = new ktw.Window({
                    ID: "ktw_tdxz",
                    Title: "分类汇总",
                    IconCls: "icon-Search2 ",
                    Height: 475,
                    Width: 900,
                    Left: 20,
                    Top: 80,
                    Parent: $(window).Target,
                    IsMaximize: true,
                    IsMinimize: false,
                    Maximizable: true,
                    Minimizable: true,
                    Draggable: true,
                    Resizable: true,
                    Url: "html/onemap/table_flhz.html",
                    Parameters: { result: null, conf: null, data: null, areacode: ktw.cookie.AreaTree.areacode, areaname: ktw.cookie.AreaTree.areaname }
                });
                ctr.Layout();
                if (ktw.App.CommonWin) {
                    ktw.App.CommonWin.Close();
                }
                ktw.App.CommonWin = ctr;
            });
        }
        $this.Init();
    }

})(jQuery);
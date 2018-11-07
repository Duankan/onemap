/*App(应用程序)*/
(function ($) {
    window.ktw = window.ktw || {};
    function GetWinIndex(id) {
        for (var i = 0; i < ktw.App.PopBoxs.length; i++) {
            if (ktw.App.PopBoxs[i].ID === id) return i;
        }
        return -1;
    };
    function GetRootPath() {
        var pathName = window.document.location.pathname;
        var localhost = window.location.host;
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return ("http://" + localhost + projectName + "/");
    }
    function GetServerPath() {
        if (ktw.App.Config.SystemTheme.IsDebug !== "false") {
            return ktw.GetSystemUrlByRelID("SysService");
        } else {
            return ktw.App.Root;
        }
    };

    ktw.App = {
        Map: null,
        User: null,
        TabPanel: null,
        FillPanel: null,
        CenterPanel: null,
        MapPanel: null,
        MapTool: null,
        PopBoxs: [],//存放打开的window
        EventObject: null,
        Root: null,//网站页面基地址
        ServerUrl: null,//网站后台服务基地址
        HighLight: null,//高亮显示对象
        Draw: null,//绘制对象
    };
    //初始化去解析app.xml,然后去布局
    ktw.App.Init = function () {
        if (ktw.IsNull(this.Config)) {
            var config = null;
            $.ajax({
                url: "config/app.xml",
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
            this.Config = config;
        }
        this.Layout();
    };
    //初始化加载后台管理配置文件
    ktw.App.SysInit = function () {
        if (ktw.IsNull(this.SysConfig)) {
            var config = null;
            $.ajax({
                url: "../config/sys.xml",
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
            this.SysConfig = config;
        }
    };
    //初始化布局
    ktw.App.Layout = function () {
        //调用不可拖拽方法
        ktw.NoDrag();
        this.WidgetParent, this.WidgetClear, this.WidgetParam, this.IsWidget = true;
        this.EventObject = $(ktw);
        var layoutConfig = this.Config.SystemLayout;
        this.TempStyle = ktw.CreateTempStyle();
        this.Root = GetRootPath();
        this.ServerUrl = GetServerPath();
        this.TopPanel = new ktw.TopPanel(layoutConfig.TopPanel);
        this.TopPanel.Target.appendTo(document.body);
        this.NavPanel = new ktw.NavPanel(layoutConfig.NavPanel);
        this.NavPanel.Target.appendTo(document.body);
        this.FootPanel = new ktw.FootPanel(layoutConfig.FootPanel);
        this.FootPanel.Target.appendTo(document.body);
        this.MainPanel = new ktw.MainPanel(layoutConfig.MainPanel);
        this.MainPanel.Target.appendTo(document.body);
        this.MainPanel.Layout();
        this.CenterPanel = this.MainPanel.CenterPanel;
        this.MapPanel = this.CenterPanel.MapPanel;
        this.FillPanel = new ktw.FillPanel({ MainPanel: this.MainPanel });
        //this.TabPanel = new $.TabPanel(layoutConfig.TabPanel);
        //$(document.body).append(this.TabPanel);
        //this.TabPanel.Layout();
        this.InitMap();//初始化地图
        this.InitMapMenu();//初始化地图的右键菜单
        this.HighLight = new ktw.HighLight();//初始化高亮对象
        this.Draw = new ktw.Draw();//初始化绘制对象
        //this.InitMapTool(); //初始化工具栏(全图,漫游,常用,工具)
        //ktw.InitMapTool();    //初始化悬浮在地图上的工具条
        //this.InitNavigation(); //初始化地图导航工具
        ktw.App.InitMapSwitch();   //初始化地图切换工具
        this.InitScaleLine();//初始化比例尺
        this.InitMousePosition();   //初始化地图坐标显示  add by wlf
        //ktw.App.InitOverviewMap();//初始化鹰眼地图

        /**左侧Menu菜单初始化**/
        this.MenuInit = new ktw.MenuInit({ SystemTheme: this.Config.SystemTheme });
        this.MenuInit.Init();
        this.MenuInit.Layout();

        //this.InitScaleIcon();//加载放大缩小级别
        ktw.InitTool();//初始化工具箱
        ktw.InitLegend({ conf: ktw.App.Config.SystemMap.Legend, map: this.Map, mapSwitch: this.MapSwitch });//初始化图例容器
        this.CommonTab = ktw.InitCommonTab();//初始化通用查询和通用分析切换面板
        this.GlobalQuery = new ktw.GlobalQuery();//初始化通用查询
        this.GlobalGlandAnalysis = new ktw.GlobalGlandAnalysis();//初始化通用分析
        this.LayerTree = new ktw.LayerTree(ktw.App.Config.SystemMap.ArrayOfMapLayer);//初始化图层树
        this.Statistic = new ktw.Statistic();//初始化应用统计
        ktw.InitLifeCtr({ map: ktw.App.Map, conf: ktw.App.Config.Extend.LifeCycle });
    };

    //窗口大小变化刷新布局
    ktw.App.Resize = function () {
        this.MainPanel.Layout();
        this.MenuInit.Layout();
    };
    //初始化地图工具
    ktw.App.InitMapTool = function () {
        var align = this.Config.SystemMap.ToolInfo.Align.toLowerCase();
        var parent = align == "left" ? this.MapToolPanel.LeftBox : align == "right"
             ? this.MapToolPanel.RightBox : this.MapToolPanel.CenterBox;
        var param = $.extend({
            Map: this.Map,
            Parent: parent
        }, this.Config.SystemMap.ToolInfo);
        this.MapTool = new ktw.UCMapTool(param);
        ktw.App.MapTool = this.MapTool;
    };
    //初始化地图
    ktw.App.InitMap = function () {
        //解析基础配置图层的服务地址
        if (ktw.App.Config.SystemMap.LayerInfo == "") {
            ktw.App.Config.SystemMap.LayerInfo = {};
            ktw.App.Config.SystemMap.LayerInfo.BaseLayers = [];
        }
        if (!ktw.App.Config.SystemMap.LayerInfo.BaseLayers || !ktw.App.Config.SystemMap.LayerInfo.BaseLayers.length) {
            ktw.App.Config.SystemMap.LayerInfo.BaseLayers = [ktw.App.Config.SystemMap.LayerInfo.BaseLayers];
        }
        //为baseLayers赋url
        for (var i = 0; i < ktw.App.Config.SystemMap.LayerInfo.BaseLayers.length; i++) {
            if (ktw.IsNull(ktw.App.Config.SystemMap.LayerInfo.BaseLayers[i].Url)) {
                continue;
            }
            var tmp = ktw.GetSystemUrlByRelID(ktw.App.Config.SystemMap.LayerInfo.BaseLayers[i].Url);
            ktw.App.Config.SystemMap.LayerInfo.BaseLayers[i].Url = tmp == "" ? ktw.App.Config.SystemMap.LayerInfo.BaseLayers[i].Url : tmp;
        }
        ktw.Project.InitProjectParam();
        var config = this.Config.SystemMap;
        var minZoom = parseInt(config.MinZoom);
        var maxZoom = parseInt(config.MaxZoom);
        var zoom = parseInt(ktw.App.Config.SystemMap.Zoom);
        var bounds = ktw.App.Config.SystemMap.Bounds;
        if (bounds && bounds.XMin && bounds.XMax && bounds.YMin && bounds.YMax) {
            bounds = [[bounds.YMin, bounds.XMin], [bounds.YMax, bounds.XMax]];
        }
        var center = { lon: config.Center.split(",")[0], lat: config.Center.split(",")[1] };
        var map = ktw.App.Map = L.map('map', {
            minZoom: minZoom,//地图最小级数
            maxZoom: maxZoom,//地图最大级数
            attributionControl: false,
            zoomControl: false,
            crs: ktw.Project.GetCRSByCode(ktw.EPSG.split(":")[1])
        });
        map.setView(center, zoom);
        if (bounds && bounds.length) {
            map.setMaxBounds(bounds);
        }
        //To-->底图加载,/* config 合并到 { Map: ktw.App.Map } 中 */
        ktw.MapLoad.InitMap($.extend({ Map: ktw.App.Map }, config));
    };
    //初始化坐标显示控件
    ktw.App.InitMousePosition = function () {
        var options = {
            position: 'bottomleft',
            backgroundColor: 'transparent',
            fontColor: '#333',
            cssText: 'margin-left:155px;position:absolute;margin-top:-10px',
            xyReverse: true
        };
        this.MousePosition = new ktw.MousePosition(options).addTo(this.Map);
        if (ktw.App.MapSwitch.MapTypes[0] == "Vector") {
            $(".ktw-control-mouseposition").css({
                "border-color": "#333",
                "color": "#333"
            });
        } else {
            $(".ktw-control-mouseposition").css({
                "border-color": "#eee",
                "color": "#eee"
            });
        }
        ktw.App.MapSwitch.Target.bind("onSwitch", function (event, type) {
            if (type == "Vector") {
                $(".ktw-control-mouseposition").css({
                    "border-color": "#333",
                    "color": "#333"
                });
            } else {
                $(".ktw-control-mouseposition").css({
                    "border-color": "#eee",
                    "color": "#eee"
                });
            }
        });
    };
    //初始化地图指北针
    ktw.App.InitNavigation = function () {
        var param = $.extend({
            Map: ktw.App.Map,
            Parent: ktw.App.MapPanel.Target,
        }, this.Config.SystemMap.LevelInfo);
        this.Navigation = new $.UCNavigation(param);
    };
    //初始化比例尺
    ktw.App.InitScaleLine = function () {
        L.control.scale({
            metric: true,
            imperial: false
        }).addTo(ktw.App.Map);
        if (ktw.App.MapSwitch.MapTypes[0] == "Vector") {
            $(".leaflet-control-scale-line").css({
                "border-color": "#333",
                "color": "#333"
            });
        } else {
            $(".leaflet-control-scale-line").css({
                "border-color": "#eee",
                "color": "#eee"
            });
        }
        ktw.App.MapSwitch.Target.bind("onSwitch", function (event, type) {
            if (type == "Vector") {
                $(".leaflet-control-scale-line").css({
                    "border-color": "#333",
                    "color": "#333"
                });
            } else {
                $(".leaflet-control-scale-line").css({
                    "border-color": "#eee",
                    "color": "#eee"
                });
            }
        });
    };
    //初始化鹰眼地图
    ktw.App.InitOverviewMap = function () {
        //TODO
    }
    //初始化地图菜单
    ktw.App.InitMapMenu = function () {
        var param = $.extend({
            Map: this.Map,
            LinkDOM: this.MapPanel.MapDOM
        }, this.Config.SystemMap.RightMenuInfo);
        this.MapMeun = new ktw.UCMapMenu(param);
        this.MapMeun.bind("onItemClick", function (s, d) {
            if (d.id == "zoomin") {
                ktw.App.Map.zoomIn();
            } else if (d.id == "zoomout") {
                ktw.App.Map.zoomOut();
            } else if (d.id == "clear") {
                ktw.ClearFinal();
            }
            else if (d.id == "globe") {
                ktw.GlobeFinal();
            }
            else {
                ktw.Alert(d.id);
            }
        });
    };
    //初始化地图切换
    ktw.App.InitMapSwitch = function () {
        if (ktw.IsNull(this.Config.SystemMap.MapSwitchInfo) || this.Config.SystemMap.MapSwitchInfo.length == 0) return;
        var param = $.extend({
            Parent: ktw.App.MapPanel.Target
        }, this.Config.SystemMap.MapSwitchInfo);
        this.MapSwitch = new ktw.UCMapSwitch(param);
    };
    //获取窗体
    ktw.App.GetWindow = function (id) {
        var index = GetWinIndex(id)
        return ktw.App.PopBoxs[index];
    };
    //清除上一个插件
    ktw.App.ClearPreWidget = function () {
        if (ktw.IsNull(this.WidgetParent) || ktw.IsNull(this.WidgetClear)) return;
        if (this.WidgetParam === ktw.WidgetLayout.FloatHTML) {
            this.WidgetParent.frame.triggerHandler("onClosing");
            this.WidgetParent.frame.remove();
        }
        else this.WidgetParent[this.WidgetClear](this.WidgetParam);
        if (!this.IsWidget) { this.MenuInit.currentParent = null; this.MenuInit.currentItem = null; }
        this.WidgetParent = null; this.WidgetClear = null; this.WidgetParam = null; this.IsWidget = true;
    };
})(jQuery);
//Control
(function ($) {
    ktw.Control = function (opt) {
        this.Target = $(opt.Target);
        if (ktw.IsNull(opt.ID)) opt.ID = opt.Target.attr("id");
        this.ID = ktw.IsNull(opt.ID) ? "c" + new Date().getTime() : opt.ID;
        this.Target.prop("id", this.ID);
        this.Width = ktw.IsNumber(opt.Width) ? opt.Width : parseInt(opt.Width);
        this.Height = ktw.IsNumber(opt.Height) ? opt.Height : parseInt(opt.Height);
        if (!ktw.IsNull(opt.CSS)) this.Target.css(opt.CSS);
        this.Visible = ktw.IsBoolean(opt.Visible) ? opt.Visible : opt.Visible !== "false";
        this.Target.css("display", this.Visible ? "block" : "none");
    };
    $.fn.extend(ktw.Control.prototype, {
        GetActualWidth: function () {
            if (!this.Visible || this.Target == null) return 0;
            return this.Target.outerWidth();
        },
        GetActualHeight: function () {
            if (!this.Visible || this.Target == null) return 0;
            return this.Target.outerHeight();
        },
        GetActualSize: function () {
            return {
                Width: this.GetActualWidth(),
                Height: this.GetActualHeight()
            };
        },
        outerWidth: function () {
            return this.Target.outerWidth();
        },
        outerHeight: function () {
            return this.Target.outerHeight();
        },
        SetWidth: function (width) {
            if (!ktw.IsNumber(width)) return;
            this.Target.css('width', this.Width = width);
            this.Target.trigger("onResize");//大小变化事件
        },
        SetHeight: function (height) {
            if (!ktw.IsNumber(height)) return;
            this.Target.css('height', this.Height = height);
            this.Target.trigger("onResize");//大小变化事件
        },
        SetSize: function (size) {
            if (!ktw.IsNumber(size.Width) || !ktw.IsNumber(size.Height)) return;
            this.Target.css('width', this.Width = size.Width);
            this.Target.css('height', this.Height = size.Height);
            this.Target.trigger("onResize");//大小变化事件
        },
        SetVisible: function (visible) {
            if (!ktw.IsBoolean(visible) || this.Visible == visible) return;
            this.Target.css('display', (this.Visible = visible) ? 'block' : 'none');
            this.Target.trigger("onVisible");//大小变化事件
        },
        SetCSS: function (css) {
            if (!ktw.IsNull(css)) this.Target.css(css);
        },
        GetBorder: function (el) { return ktw.GetBorder(el); },
        GetPadding: function (el) { return ktw.GetPadding(el); },
        bind: function () {
            this.Target.bind(arguments[0], arguments[1], arguments[2]);
        },
        unbind: function (eventName) { this.Target.unbind(eventName); }
    });
})(jQuery);
//Panel
(function ($) {
    ktw.Panel = function (opt) {
        $.extend(this, new ktw.Control(opt));
        this.Target = opt.Target;
        this.Border = opt.Border;
        this.BorderTop = opt.BorderTop;
        this.BorderRight = opt.BorderRight;
        this.BorderBottom = opt.BorderBottom;
        this.BorderLeft = opt.BorderLeft;
        this.HasBorder = ktw.IsBoolean(opt.HasBorder) ? opt.HasBorder : opt.HasBorder == "true";
        this.TargetName = opt.TargetName;
        this.SplitClass = opt.SplitClass;
        this.Split = ktw.IsBoolean(opt.Split) ? opt.Split : opt.Split == "true";
        this.MinWidth = ktw.IsNumber(opt.MinWidth) ? opt.MinWidth : parseInt(opt.MinWidth);
        this.MinHeight = ktw.IsNumber(opt.MinHeight) ? opt.MinHeight : parseInt(opt.MinHeight);
        this.Resizable = ktw.IsBoolean(opt.Resizable) ? opt.Resizable : opt.Resizable == "true";
        this.Region = ktw.IsNull(opt.Region) ? "NONE" : opt.Region;
        this.SplitElement = $("<div class='" + this.SplitClass + "'></div>").appendTo(this.Target);
        this.mt = $("<div class='Panel-MainTank'></div>").appendTo(this.Target);
        if (!this.HasBorder) this.mt.css("border", "0px");
        else {
            if (ktw.IsString(this.Border)) this.mt.css("border", this.Border);
            if (ktw.IsString(this.BorderTop)) this.mt.css("border-top", this.BorderTop);
            if (ktw.IsString(this.BorderRight)) this.mt.css("border-right", this.BorderRight);
            if (ktw.IsString(this.BorderBottom)) this.mt.css("border-bottom", this.BorderBottom);
            if (ktw.IsString(this.BorderLeft)) this.mt.css("border-left", this.BorderLeft);
        }
    };
    $.fn.extend(ktw.Panel.prototype, {
        DragResize: function (p) {
            var $this = this;
            var el = p.SplitElement[0];
            if (!this.Resizable) {
                p.SplitElement.css("cursor", "default");
                $(el).unbind("mousedown");
            }
            else {
                var x = y = 0, s = p.Target[0].style;
                var div = $("<div style='z-index:10;top:0px;left:0px;width:100%;height:100%;position:absolute;'></div>");
                function mouseDown(e) {
                    if (!$this.Resizable) { return; }
                    $(document.body).append(div);
                    switch (p.Region) {
                        case ktw.Region.East: x = e.clientX + p.Target[0].offsetWidth; break;
                        case ktw.Region.West: x = e.clientX - p.Target[0].offsetWidth; break;
                        case ktw.Region.South: y = e.clientY + p.Target[0].offsetHeight; break;
                        case ktw.Region.North: y = e.clientY - p.Target[0].offsetHeight; break;
                    }
                    if (el.setCapture) {
                        el.setCapture();
                        el.onmouseup = mouseUp;
                        el.onmousemove = function (ev) { mouseMove(ev || event); };
                    }
                    else $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
                    e.preventDefault();
                };
                function mouseMove(e) {
                    if (!$this.Resizable) return;
                    switch (p.Region) {
                        case ktw.Region.East:
                            div.css("cursor", "e-resize");
                            var dx = x - e.clientX;
                            if (dx < p.MinWidth && p.Width == p.MinWidth) return;
                            var mw = $(window).width() - ktw.App.LeftPanel.GetActualWidth();
                            if (dx > mw && p.Width == mw) return;
                            if (p.Width < p.MinWidth) p.Width = p.MinWidth;
                            else if (dx > mw) p.Width = mw;
                            else p.Width = dx;
                            s.width = p.Width + 'px';
                            break;
                        case ktw.Region.West:
                            div.css("cursor", "e-resize");
                            var dx = e.clientX - x;
                            if (dx < p.MinWidth && p.Width == p.MinWidth) return;
                            var mw = $(window).width();
                            if (dx > mw && p.Width == mw) return;
                            if (p.Width < p.MinWidth) p.Width = p.MinWidth;
                            else if (dx > mw) p.Width = mw;
                            else p.Width = dx;
                            s.width = p.Width + 'px';
                            break;
                        case ktw.Region.South:
                            div.css("cursor", "n-resize");
                            var dy = y - e.clientY;
                            if (dy < p.MinHeight && p.Height == p.MinHeight) return;
                            var mh = 0;
                            if (p.TargetName == "FootPanel") mh = $(window).height() -
                                ktw.App.TopPanel.GetActualHeight() - ktw.App.NavPanel.GetActualHeight();
                            else if (p.TargetName == "BottomPanel") mh = ktw.App.MainPanel.GetActualHeight() -
                                ktw.App.MapToolPanel.GetActualHeight();
                            if (dy > mw && p.Height == mh) return;
                            if (p.Height < p.MinHeight) p.Height = p.MinHeight;
                            else if (dy > mh) p.Height = mh;
                            else p.Height = dy;
                            s.height = p.Height + 'px';
                            break;
                        case ktw.Region.North:
                            div.css("cursor", "n-resize");
                            var dy = e.clientY - y;
                            if (dy < p.MinHeight && p.Height == p.MinHeight) return;
                            var mh = 0;
                            if (p.TargetName == "TopPanel") mh = $(window).height();
                            else if (p.TargetName == "NavPanel") mh = $(window).height() - ktw.App.TopPanel.GetActualHeight();
                            else if (p.TargetName == "MapToolPanel") mh = ktw.App.MainPanel.GetActualHeight();
                            if (dy > mw && p.Height == mh) return;
                            if (p.Height < p.MinHeight) p.Height = p.MinHeight;
                            else if (dy > mh) p.Height = mh;
                            else p.Height = dy;
                            s.height = p.Height + 'px';
                            break;
                    }
                    ktw.App.MainPanel.Layout();
                };
                function mouseUp() {
                    div.remove();
                    el.releaseCapture ? (el.releaseCapture(), el.onmousemove = el.onmouseup = null)
                        : ($(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp));
                };
                $(el).bind("mousedown", mouseDown);
            }
        },
        SetResizable: function (resizable) {
            this.Resizable = resizable;
        },
        Resize: function () {
            if (!this.Visible) return;
            if (this.Region == ktw.Region.West || this.Region == ktw.Region.East) {
                var w = this.Width - (this.mt.outerWidth() - this.mt.width());
                if (!this.Split) this.mt.css("width", w);
                else this.mt.css("width", w - this.SplitElement.outerWidth());
                this.Height = this.Target.parent().height();
                var hei = this.Height - (this.mt.outerHeight() - this.mt.height());
                if (this.Top) {
                    hei = hei - parseFloat(this.Top);
                }
                this.mt.css("height", hei);
                if (this.Region == ktw.Region.East && this.Minimize) {
                    this.Width = 0;
                    this.mt.css({ width: "21px" });
                }
            }
            else if (this.Region == ktw.Region.South || this.Region == ktw.Region.North) {
                var h = this.Height - (this.mt.outerHeight() - this.mt.height());
                if (!this.Split) this.mt.css("height", h);
                else {
                    var sh = this.SplitElement.outerHeight();
                    if (this.Region == ktw.Region.South) this.mt.css("top", sh);
                    this.mt.css("height", h - sh);
                }
                this.Width = this.Target.parent().width();
                this.mt.css("width", this.Width - (this.mt.outerWidth() - this.mt.width()));
            }
            this.Target.trigger("onResize");
        },
        SetHasBorder: function (hasBorder) {
            if (!ktw.IsBoolean(hasBorder)) return;
            this.HasBorder = hasBorder;
            this.mt.css("border", hasBorder ? "" : "0px");
            this.Resize();
        },
        SetBorder: function (border) {
            this.mt.css("border", this.Border = border);
            this.Resize();
        },
        SetBorderTop: function (border) {
            this.mt.css("border-top", this.BorderTop = border);
            this.Resize();
        },
        SetBorderRight: function (border) {
            this.mt.css("border-right", this.BorderRight = border);
            this.Resize();
        },
        SetBorderBottom: function (border) {
            this.mt.css("border-bottom", this.BorderBottom = border);
            this.Resize();
        },
        SetBorderLeft: function (border) {
            this.mt.css("border-left", this.BorderLeft = border);
            this.Resize();
        }
    });
})(jQuery);
//DockPanel
(function ($) {
    ktw.DockPanel = function (opt) {
        $.extend(this, new ktw.Panel(opt));
        this.Title = opt.Title;
        if (opt.HasHeader == undefined) opt.HasHeader = true;
        if (opt.HasHeader == "false") opt.HasHeader = false;
        this.HeaderHeight = ktw.IsNull(opt.HeaderHeight) ? 26 : opt.HeaderHeight;
        this.Header = $("<div class='Panel-Header'></div>");
        this.Header.css("height", this.HeaderHeight + "px");
        this.Header.append($("<span class='Title'>" + this.Title + "</span>"));
        this.HeaderVisible = ktw.IsBoolean(opt.HeaderVisible) ? opt.HeaderVisible : opt.HeaderVisible !== "false";
        this.Icon = $("<div class='Icon " + opt.IconCls + "'></div>");
        this.SetIconVisible(opt.IconVisible);
        this.Header.append(this.Icon);
        if (opt.HasLeftButton) {
            this.ButtonPanel_Left = $("<div class='ButtonPanel'></div>");
            this.ButtonPanel_Left.appendTo(this.Header);
        }
        this.ButtonPanel = $("<div class='ButtonPanel'></div>");
        this.ButtonPanel.appendTo(this.Header);
        var icon = "Dock-Panel-Button-" + this.Region;
        this.AddTool({ ID: "scalable", IconCls: icon, TipTitle: "" });
        this.mt.append(this.Header);
        this.Content = $("<div class='Panel-DockContent'></div>");
        if (opt.Height) {
            this.Content.css("height", (opt.Height - (opt.HasHeader ? this.HeaderHeight : 0)) + "px");
        } else {
            this.Content.css("bottom", 0);
        }
        if (!opt.HasHeader) {
            this.Content.css("top", 0);
        }
        this.mt.append(this.Content);
        this.Target.css("display", "block");
    };
    $.fn.extend(ktw.DockPanel.prototype, {
        SetTitle: function (title) {
            this.Title = title;
            $(".Title", this.Target).html(title);
            if (this.ButtonPanel_Left) {
                var wid = (parseFloat(this.Header.find(".Title").width()) + parseFloat(this.Header.find(".icon-ResourceView").width())) + 25 + "px";
                this.ButtonPanel_Left.css("left", wid);
            }
        },//设置标题
        SetHeaderVisible: function (visible) {
            var iv = this.HeaderVisible = ktw.IsBoolean(visible) ? visible : visible != "false";
            $(".Panel-Header", this.Target).css({ "display": iv ? "block" : "none" });
            if (!iv) this.Content.css({ height: this.Height + "px", top: "0px" });
            else {
                this.Content.css({ height: (this.Height - this.HeaderHeight) + "px", top: this.HeaderHeight + "px" });
                if (this.ButtonPanel_Left) {
                    var wid = (parseFloat(this.Header.find(".Title").width()) + parseFloat(this.Header.find(".icon-ResourceView").width())) + 25 + "px";
                    this.ButtonPanel_Left.css("left", wid);
                }
            }
        },
        AddTool: function (tools) {
            var ts = $(tools), $this = this;
            for (var i = 0; i < ts.length; i++) {
                var btnpanel = ts[i].Pos == "left" ? this.ButtonPanel_Left : this.ButtonPanel;
                if (ts[i].Content) {
                    btnpanel.append(ts[i].Content);
                    continue;
                }
                var a = $("<a class='Button " + ts[i].IconCls + "' style='" + (ts[i].Pos == "left" ? "float:left" : "") + "' title='" + ts[i].TipTitle + "' id='" + ts[i].ID + "'></a>").appendTo(btnpanel);
                a.prop("toolItem", ts[i]);
                a.bind("click", $this, function (o) {
                    var toolItem = $(this).prop("toolItem");
                    var en = toolItem.ID == "scalable" ? "onScaleClick" : "onToolClick";
                    $(o.data.Target).trigger(en, { Sender: this, ToolItem: toolItem });
                });
            }
            var childCount = this.ButtonPanel.children().length;
            this.ButtonPanel.css("width", (21 * childCount) + "px");
            //调整左边距
            if (this.ButtonPanel_Left) {
                var wid = (parseFloat(this.Header.find(".Title").width()) + parseFloat(this.Header.find(".icon-ResourceView").width())) + 25 + "px";
                this.ButtonPanel_Left.css("left", wid);
            }
        },
        RemoveTool: function (ids) {
            var btns = $(".Button", this.ButtonPanel);
            for (var i = 0; i < btns.length; i++)
                if ($.inArray(btns[i].id, ids) >= 0 || btns[i].id == ids) $(btns[i]).remove();
            this.ButtonPanel.css("width", (21 * $(".Button", this.ButtonPanel).length) + "px");
        },
        ClearTool: function () {
            if (this.ButtonPanel_Left) {
                this.ButtonPanel_Left.empty();
            }
            $(".Button:gt(0)", this.ButtonPanel).remove();
            this.ButtonPanel.css("width", "21px");
        },
        SetIconCls: function (iconCls) {
            this.Icon.attr("class", "Icon " + iconCls);
        },
        SetIconVisible: function (visible) {
            var iv = ktw.IsBoolean(visible) ? visible : visible != "false";
            this.Icon.css("display", iv ? "block" : "none");
            $(".Title", this.Header).css("left", iv ? "26px" : "5px");
        },
        Add: function (element, parameters) {
            var $this = this;
            if (ktw.IsString(element)) {
                this.Target.trigger("onClosing", { element: $this, id: $this.ID });
                var frame = ktw.CreateFrame(element, false);
                var waitbox = new ktw.UCWaitBox(this.Target);
                frame.bind('load', function () {
                    ktw.CallWidgetCommunication(frame[0], $this.Target, parameters);
                    waitbox.Close();
                    $this.Target.trigger("onLoaded", $this);
                });
                this.Content.html(frame);
                waitbox.Show();
            }
            else if (ktw.IsDOMElement(element) || ktw.IsjQueryObject(element)) {
                this.Content.append(element);
                this.Target.trigger("onLoaded", $this);
            }
            return $this.Target;
        },
        Remove: function (element) {
            element = ktw.IsString(element) ? $('#' + element, this.Content) : (ktw.IsObject(element) ? $(element) : null);
            if (element == null || element.length == 0) return;
            element.remove();
        },
        Clear: function () {
            this.Target.trigger("onClosing", { element: this, id: this.ID });
            this.Content.empty();
        }
    });
})(jQuery);
//TopPanel
(function ($) {
    ktw.TopPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Region = ktw.Region.North;
        opt.TargetName = "TopPanel";
        opt.SplitClass = "Panel-Split-V";
        opt.Target = $("<div class='Panel-Top' id='" + opt.ID
            + "' style='height:" + opt.Height + "px'></div>");
        if (opt.Opacity !== undefined) {
            opt.Target.css("opacity", opt.Opacity);
        }
        if (opt.ZIndex !== undefined) {
            opt.Target.css("z-index", opt.ZIndex);
        }
        //opt.Target.css("border-bottom", "1px solid rgba(255,255,255,0.4)");
        $.extend(this, new ktw.Panel(opt));
        this.DragResize(this);
        this.Target.css("display", this.Visible ? "block" : "none");
        this.BackgroundImage = opt.BackgroundImage;
        this.LeftImage = opt.LeftImage;
        this.LeftBoxVisible = opt.LeftBoxVisible == "true";
        this.LeftBoxWidth = parseInt(opt.LeftBoxWidth);
        this.RightImage = opt.RightImage;
        this.RightBoxVisible = opt.RightBoxVisible == "true";
        this.RightBoxWidth = parseInt(opt.RightBoxWidth);
        this.CenterBoxVisible = opt.CenterBoxVisible == "true";
        if (!ktw.IsNull(this.BackgroundImage)) this.mt.css("background-image", "url(" + this.BackgroundImage + ")");
        var rb = $('<div tpid="rb" class="RightBackground"></div>').appendTo(this.mt);
        if (!ktw.IsNull(this.RightImage)) rb.css("background-image", "url(" + this.RightImage + ")");
        var lb = $('<div tpid="lb" class="LeftBackground"></div>').appendTo(this.mt);
        if (!ktw.IsNull(this.LeftImage)) lb.css("background-image", "url(" + this.LeftImage + ")");
        this.mt.append($('<div tpid="ContentBox" class="ContentBox"></div>'));
        this.LeftBox = $('<div tpid="LeftBox" class="LeftBox" style="width:' + this.LeftBoxWidth +
            'px;display:' + (this.LeftBoxVisible ? 'block' : 'none') + '"></div>').appendTo(this.mt);
        this.RightBox = $('<div tpid="RightBox" class="RightBox" style="width:' + this.RightBoxWidth +
            'px;display:' + (this.RightBoxVisible ? 'block' : 'none') + ';"></div>').appendTo(this.mt);
        var cw = $(window).width() - this.RightBoxWidth - this.LeftBoxWidth;
        this.CenterBox = $('<div tpid="CenterBox" class="CenterBox" style="width:' + cw + 'px;left:' + this.LeftBoxWidth
            + 'px;display:' + (this.CenterBoxVisible ? 'block' : 'none') + ';"></div>').appendTo(this.mt);
        funExt(this);
    };
    function funExt(control) {
        $.fn.extend(control, {
            SetHeight: function (height) {
                if (!ktw.IsNumber(height)) return;
                this.Target.css("height", this.Height = height);
                ktw.App.MainPanel.Layout();
            },//设置高度
            SetVisible: function (visible) {
                if (!ktw.IsBoolean(visible) || this.Visible == visible) return;
                this.Target.css('display', (this.Visible = visible) ? 'block' : 'none');
                ktw.App.MainPanel.Layout();
            },//设置是否可见
            SetBackgroundIamge: function (uri) {
                if (!ktw.IsString(uri)) return;
                this.BackgroundImage = uri;
                this.Target.css({
                    'background-repeat': 'repeat-x',
                    'background-image': 'url(' + uri + ')'
                });
            },//设置背景图片
            SetLeftImage: function (uri) {
                if (!ktw.IsString(uri)) return;
                this.LeftImage = uri;
                this.LeftImage.css({
                    'background-repeat': 'no-repeat',
                    'background-image': 'url(' + uri + ')'
                });
            },//设置左边背景图片
            SetRightImage: function (uri) {
                if (!ktw.IsString(uri)) return;
                this.RightImage = uri;
                this.RightImage.css({
                    'background-repeat': 'no-repeat',
                    'background-position': 'right top',
                    'background-image': 'url(' + uri + ')'
                });
            },//设置右边背景图片
            SetLeftBoxVisible: function (visible) {
                if (!ktw.IsBoolean(visible)) return;
                this.LeftBoxVisible = visible;
                this.LeftBox.css('display', visible ? 'block' : 'none');
                var l = visible ? this.LeftBox.width() : 0;
                var centerwidth = this.Target.width() - (this.RightBoxVisible ? l + this.RightBox.width() : l);
                this.CenterBox.css({ 'width': centerwidth, 'left': l });
            },//设置左边容器是否可见
            SetLeftBoxWidth: function (width) {
                if (!ktw.IsNumber(width)) return;
                this.LeftBox.css('width', this.LeftBoxWidth = width);
                var l = this.LeftBoxVisible ? this.LeftBox.width() : 0;
                var centerwidth = this.Target.width() - (this.RightBoxVisible ? l + this.RightBox.width() : l);
                this.CenterBox.css({ 'width': centerwidth, 'left': l });
                this.LeftBox.trigger("onLeftBoxResize");//大小变化事件
            },//设置左边容器的宽度
            SetRightBoxVisible: function (visible) {
                if (!ktw.IsBoolean(visible)) return;
                this.RightBoxVisible = visible;
                this.RightBox.css('display', visible ? 'block' : 'none');
                var l = visible ? this.RightBox.width() : 0;
                var centerwidth = this.Target.width() - (this.LeftBoxVisible ? l + this.LeftBox.width() : l);
                this.CenterBox.css({ 'width': centerwidth });
            },//设置右边边容器是否可见
            SetRightBoxWidth: function (width) {
                if (!ktw.IsNumber(width)) return;
                this.RightBox.css('width', this.RightBoxWidth = width);
                var centerwidth = this.Target.width() - width - this.LeftBox.width();
                var l = this.RightBoxVisible ? this.RightBox.width() : 0;
                var centerwidth = this.Target.width() - (this.LeftBoxVisible ? l + this.LeftBox.width() : l);
                this.CenterBox.css('width', centerwidth);
                this.RightBox.trigger("onRightBoxResize");//大小变化事件
            },//设置右边容器的宽度
            SetCenterBoxVisble: function (visible) {
                if (!ktw.IsBoolean(visible)) return;
                this.CenterBoxVisible = visible;
                this.CenterBox.css('display', visible ? 'block' : 'none');
            },//设置中间容器是否可见
            Add: function (element, parent, isScolling, frameId) {
                if (ktw.IsNull(element)) return;
                parent = ktw.IsNull(parent) ? $(".ContentBox", this.mt) : $(parent);
                var tpid = parent.attr("tpid");
                if (tpid !== undefined && (tpid === "ContentBox" || tpid === "LeftBox"
                    || tpid === "RightBox" || tpid === "CenterBox")) {
                    if (ktw.IsString(element)) parent.html(ktw.CreateFrame(url, isScolling, frameId));
                    else if (ktw.IsObject(element)) parent.append(element);
                }
                return parent;
            },//添加元素
            Remove: function (element) {
                element = ktw.IsString(element) ? $('#' + element)
                    : (ktw.IsObject(element) ? $(element) : null);
                if (element == null || element.attr("tpid") !== undefined) return;
                if (element.parent().attr("tpid") !== undefined) element.remove();
            },//移除元素
            Clear: function (parent) {
                if (ktw.IsNull(parent)) {
                    var children = this.Target.children()
                    for (var i = 0; i < children.length; i++) {
                        var item = $(children[i]);
                        var isleftBox = this.LeftBox == null ? false : (item.attr('id') == this.LeftBox.attr('id'));
                        var isrightBox = this.RightBox == null ? false : (item.attr('id') == this.RightBox.attr('id'));
                        var iscenterBox = this.CenterBox == null ? false : (item.attr('id') == this.CenterBox.attr('id'));
                        if (item.attr('data') == 'leftbg' || item.attr('data') == 'rightbg' || item.attr('data') == 'content'
                            || isleftBox || isrightBox || iscenterBox) continue;
                        item.remove();
                    }
                    this.LeftBox.empty();
                    this.RightBox.empty();
                    this.CenterBox.empty();
                    this.Target.children('div[data=content]').empty();
                }
                else if ($(parent).attr('id') != this.Target.attr('id')) $(parent).empty();
            },//清楚所有元素
            Layout: function () {
                if (!this.Visible) return;
                this.Resize();
                this.ResizeEx();
            },
            ResizeEx: function () {
                var cw = this.mt.width() - this.RightBoxWidth - this.LeftBoxWidth;
                this.CenterBox.css("width", cw < 0 ? 0 : cw);
                $(this).trigger("onResize");//大小变化事件
            }
        });
    };
})(jQuery);
//NavPanel
(function ($) {
    function GetTop() {
        if (ktw.App.TopPanel == null) return "0px";
        return ktw.App.TopPanel.GetActualHeight() + "px";
    }
    ktw.NavPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Region = ktw.Region.North;
        opt.TargetName = "NavPanel";
        opt.SplitClass = "Panel-Split-V";
        opt.Target = $("<div class='Panel-Nav' id='" + opt.ID
            + "' style='height:" + this.Height + "px'></div>");
        $.extend(this, new ktw.Panel(opt));
        this.Target.css("display", this.Visible ? "block" : "none");
        this.DragResize(this);
        this.Open = ktw.IsBoolean(opt.Open) ? opt.Open : opt.Open == "true";
        //this.mt.append(ktw.CreateFrame("hp.html"));
    };
    $.fn.extend(ktw.NavPanel.prototype, {
        SetTitle: function (title) {

        },//设置标题
        Layout: function () { this.Resize(); },
        UpdateTop: function () {
            if (!this.Visible) return;
            this.Target.css("top", GetTop());
        }
    });
})(jQuery);
//MainPanel
(function ($) {
    function GetTop(opt) {
        var top = 0;
        if (opt && (opt.Top !== undefined)) {
            return opt.Top;
        }
        if (ktw.App.TopPanel != null) {
            top += ktw.App.TopPanel.GetActualHeight();
        }
        if (ktw.App.NavPanel != null) {
            top += ktw.App.NavPanel.GetActualHeight();
        }
        return top + "px";
    }
    function GetHeight() {
        var h = $(window).height();
        if (ktw.App.TopPanel != null && ktw.App.TopPanel.Visible) {
            h -= ktw.App.TopPanel.Height;
        }
        if (ktw.App.NavPanel != null && ktw.App.NavPanel.Visible) {
            h -= ktw.App.NavPanel.Height;
        }
        if (ktw.App.FootPanel != null && ktw.App.FootPanel.Visible) {
            h -= ktw.App.FootPanel.Height;
        }
        return h + "px";
    }
    ktw.MainPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Target = $("<div class='Panel-Main' id='" + opt.ID +
            "' style='height:" + GetHeight() + ";top:" + GetTop(opt) + "'></div>");
        $.extend(this, new ktw.Control(opt));
        this.Top = opt.Top;
        this.Target.css("display", this.Visible ? "block" : "none");
        var layoutConfig = ktw.App.Config.SystemLayout;
        ktw.App.LeftPanel = this.LeftPanel = new ktw.LeftPanel(layoutConfig.LeftPanel);
        this.Target.append(this.LeftPanel.Target);
        ktw.App.RightPanel = this.RightPanel = new ktw.RightPanel(layoutConfig.RightPanel);
        this.Target.append(this.RightPanel.Target);
        ktw.App.CenterPanel = this.CenterPanel = new ktw.CenterPanel(layoutConfig.CenterPanel);
        this.Target.append(this.CenterPanel.Target);
        funExt(this);
    };
    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () {
                var h = $(window).height(), t = this.Top;
                if (ktw.App.TopPanel != null && ktw.App.TopPanel.Visible) {
                    if (ktw.IsNull(this.Top)) {
                        h -= ktw.App.TopPanel.Height;
                        t += ktw.App.TopPanel.Height;
                    }
                    else {
                        h -= this.Top;
                        t += this.Top;
                    }
                    ktw.App.TopPanel.Layout();
                }
                if (ktw.App.NavPanel != null && ktw.App.NavPanel.Visible) {
                    h -= ktw.App.NavPanel.Height;
                    ktw.App.NavPanel.Target.css("top", t + "px");
                    t += ktw.App.NavPanel.Height;
                    ktw.App.NavPanel.Layout();
                }
                if (ktw.App.FootPanel != null && ktw.App.FootPanel.Visible) {
                    h -= ktw.App.FootPanel.Height;
                    ktw.App.FootPanel.Layout();
                }
                this.Target.css("top", t.replace("px", "") + "px");
                this.Target.css("height", h < 0 ? 0 : h);
                this.LeftPanel.Layout();
                this.RightPanel.Layout();
                this.CenterPanel.Layout();
                this.Target.trigger("onResize");
            },
            Resize: function () { this.Layout(); }
        });
    }
})(jQuery);
//FootPanel
(function ($) {
    ktw.FootPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Region = ktw.Region.South;
        opt.TargetName = "FootPanel";
        opt.SplitClass = "Panel-Split-V";
        opt.Target = $("<div class='Panel-Foot' id='" + opt.ID
            + "' style='height:" + opt.Height + "px'><div style='color:white;line-height:24px'>Copyright © 2016 &nbsp;&nbsp; 湖北金拓维信息技术有限公司&nbsp;&nbsp;  版权所有</div></div>");
        $.extend(this, new ktw.Panel(opt));
        this.DragResize(this);
    };
    $.fn.extend(ktw.FootPanel.prototype, {
        Layout: function () { this.Resize(); }
    });
})(jQuery);
//LeftPanel
(function ($) {
    ktw.LeftPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.IconCls = "icon-Maintence";
        opt.Region = ktw.Region.West;
        opt.SplitClass = "Panel-Split-H";
        opt.Target = $("<div class='Panel-Left' id='" + opt.ID
            + "' style='width:" + opt.Width + "px'></div>");
        if (!ktw.IsNull(opt.ZIndex)) {
            opt.Target.css("z-index", opt.ZIndex);
        }
        if (!ktw.IsNull(opt.Opacity)) {
            opt.Target.css("opacity", opt.Opacity);
        }
        if (!ktw.IsNull(opt.Top)) {
            opt.Target.css("top", opt.Top);
        }
        $.extend(this, new ktw.DockPanel(opt));
        this.RemoveTool("scalable");
        var $this = this;
        this.IsTab = ktw.IsBoolean(opt.Minimize) ? opt.IsTab : opt.IsTab === "true";
        this.Items = opt.Items;
        this.DragResize(this);
        this.Minimize = ktw.IsBoolean(opt.Minimize) ? opt.Minimize : opt.Minimize === "true";// 初始化是否折叠起来
        this._Width = this.Width;
        this.Width = this.Minimize ? 0 : this.Width;
        this.Target.css({ "display": (this.Visible ? "block" : "none"), "width": this.Width + "px" });
        this.MinimizeVisible = ktw.IsBoolean(opt.MinimizeVisible) ? opt.MinimizeVisible : opt.MinimizeVisible === "true";
        this.MinimizeButton = $("<div class='Panel-Left-MinimizeButton" + (this.Minimize ? " Panel-Left-MinimizeButton-Closed" : "") + "'></div>");
        this.MinimizeButton.appendTo(document.body);
        this.MinimizeButton.css("display", this.MinimizeVisible ? "block" : "none");
        this.MinimizeButton.bind("click", $this, function (lp) {
            lp.data.SetMinimize(!$this.Minimize);
        });
        if (this.IsTab) {
            this.Tab = new ktw.Tab({
                Visible: true,
                Width: parseFloat(this.Width),
                Height: 600,
                Items: $(this.Items),
                IsDeletedLastTab: true,
                Position: "bottom"
            });
            this.Content.append(this.Tab.Target);
        }
        funExt(this);
    };
    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () {
                this.Resize();
                this.MinimizeButton.css("left", this.Visible ? this.Width + "px" : "0px");
                this.MinimizeButton.css("visibility", (this.Height <= 47) || !this.Visible ? "hidden" : "visible");
                this.MinimizeButton.css("top", ((this.Height - 47) / 2 + this.Target.offset().top) + "px");
                if (this.IsTab) {
                    var height = this.Height;
                    if (this.HeaderVisible == true) height -= 26;
                    this.Tab.SetSize({ Width: this.Width, Height: height });
                    this.Tab.Layout();
                }
            },
            SetWidth: function (width) {
                if (!ktw.IsNumber(width)) return;
                if (this.Width === width) return;
                this._Width = this.Width = width;
                if (!this.Visible || this.Minimize) return;
                this.Target.css({ "width": width + "px" });
                ktw.App.MainPanel.Layout();
            },
            SetVisible: function (visible) {
                if (!ktw.IsBoolean(visible) || this.Visible === visible) return;
                var $this = this;
                var l = (this.Visible = visible) ? this.Width : 0;
                if (this.Visible) {//显示leftPanel要在动画之前，动画效果会好很多
                    this.Target.css("display", "block");
                    this.Height = this.Target.height();
                    this.MinimizeButton.css("left", "0px");
                    this.MinimizeButton.css("visibility", "visible");
                    this.MinimizeButton.css("top", ((this.Height - 47) / 2 + this.Target.offset().top) + "px");
                }
                this.MinimizeButton.animate({ "left": l }, "fast");
                this.Target.animate({ width: l }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        ktw.App.MainPanel.Layout();
                        if (!$this.Visible) {//隐藏leftPanel要在动画做完了以后，动画效果也会好很多
                            $this.Target.css("display", "none");
                            $this.MinimizeButton.css("left", "0px");
                            $this.MinimizeButton.css("visibility", "hidden");
                        }
                        $this.Target.trigger("onVisible", $this.Visible);
                    }
                });
            },//重写SetVisible
            SetMinimize: function (isMinimize) {
                if (!ktw.IsBoolean(isMinimize) || !this.Visible || this.Minimize === isMinimize) return;
                var l = 0;
                if ((this.Minimize = isMinimize)) {
                    this._Width = this.Width;
                    this.MinimizeButton.addClass("Panel-Left-MinimizeButton-Closed");
                }
                else {
                    l = this._Width;
                    this.MinimizeButton.removeClass("Panel-Left-MinimizeButton-Closed");
                }
                var $this = this;
                this.MinimizeButton.animate({ "left": l }, "fast");
                this.Target.animate({ width: l }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        $this.Width = l;
                        ktw.App.MainPanel.Layout();
                        $this.Target.trigger((isMinimize ? "onCollapse" : "onExpand"));
                    }
                });
            },
            Clear: function () {
                if (this.IsTab) this.Tab.Clear();
                else {
                    if (this.Content.Clear) {
                        this.Content.Clear();
                    }
                }
            }
        });
    }
})(jQuery);
//RightPanel
(function ($) {
    ktw.RightPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.IconCls = "icon-SystemManageMenu";
        opt.Region = ktw.Region.East;
        opt.SplitClass = "Panel-Split-H";
        opt.Target = $("<div class='Panel-Right' id='" + opt.ID
            + "' style='width:" + opt.Width + "px'></div>");
        if (!ktw.IsNull(opt.Top)) {
            opt.Target.css("top", this.Top = opt.Top);
        }
        $.extend(this, new ktw.DockPanel(opt));
        var $this = this;
        this.Title = opt.Title;
        this._Width = this.Width, this._Height = this.Height;
        this.DragResize(this);
        this.Minimize = ktw.IsBoolean(opt.Minimize) ? opt.Minimize : opt.Minimize == "true";
        funExt(this);
        if (!this.Visible) this.Target.css("width", (this.Width = 0) + "px");
        else if (this.Minimize) {
            this.Target.css("width", (this.Width = 21) + "px");
            $(".Icon", this.Header).css("display", "none");
            $(".Title", this.Header).css("display", "none");
            var scalable = $("#scalable", this.ButtonPanel);
            scalable.removeClass("Dock-Panel-Button-EAST");
            scalable.addClass("Dock-Panel-Button-WEST");
            $this.SetResizable(false);
        }
        this.bind("onScaleClick", function (a, b) {
            if (b.ToolItem.ID == "scalable") $this.SetMinimize();
        });
        this.animating = false;
    };
    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () {
                this.Resize();
                this.SetHeaderVisible(this.HeaderVisible);
            },
            SetWidth: function (width) {
                if (!ktw.IsNumber(width)) return;
                this._Width = this.Width = width;
                if (!this.Visible || this.Minimize) return;
                if (this.Target.is(":animated")) this.Target.stop();
                this.Target.css({ "width": this.Width + "px" });
                ktw.App.MainPanel.Layout();
            },
            SetMinimize: function (isMin) {
                this.animating = true;
                var $this = this;
                if (isMin === undefined) isMin = !this.Minimize;
                if (!this.Minimize) this._Width = this.Width;
                var l = isMin ? 21 : this._Width;
                $this.SetResizable(!isMin);
                this.Target.animate({ width: l }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        $this.Width = l;
                        $this.Minimize = isMin;
                        var scalable = $("#scalable", $this.ButtonPanel);
                        if ($this.Minimize) {
                            $(".Icon", $this.Header).css("display", "none");
                            $(".Title", $this.Header).css("display", "none");
                            scalable.removeClass("Dock-Panel-Button-EAST");
                            scalable.addClass("Dock-Panel-Button-WEST");
                        }
                        else {
                            $(".Icon", $this.Header).css("display", "block");
                            $(".Title", $this.Header).css("display", "block");
                            scalable.removeClass("Dock-Panel-Button-WEST");
                            scalable.addClass("Dock-Panel-Button-EAST");
                        }
                        ktw.App.MainPanel.Layout();
                        $this.Header.css("height", ($this.Minimize ? 27 : 26) + "px");//zzy add 2016-11-17
                        $this.animating = false;
                        $this.Target.trigger((isMin ? "onCollapse" : "onExpand"));
                    }
                });
            },
            SetVisible: function (visible) {
                this.animating = true;
                var $this = this;
                if (visible === undefined) visible = !this.Visible;
                if (this.Visible && !this.Minimize) this._Width = this.Width;
                this.Visible = visible;
                var l = visible ? this._Width : 0;
                this.Target.animate({ width: l }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        $this.Width = l;
                        if (visible) {
                            $this.Minimize = false;
                            $(".Icon", $this.Header).css("display", "block");
                            $(".Title", $this.Header).css("display", "block");
                            var scalable = $("#scalable", $this.ButtonPanel);
                            scalable.removeClass("Dock-Panel-Button-WEST");
                            scalable.addClass("Dock-Panel-Button-EAST");
                        }
                        ktw.App.MainPanel.Layout();
                        $this.animating = false;
                        $this.Target.trigger("onVisible", $this.Visible);
                    }
                });
            },
            SetHeaderVisible: function (visible) {
                this.HeaderVisible = ktw.IsBoolean(visible) ? visible : visible != "false";
                this.Header.css({ "display": this.HeaderVisible ? "block" : "none" });
                var hei = this.Height;
                if (this.Top) {
                    hei = this.Height - parseFloat(this.Top);
                }
                if (!this.HeaderVisible) this.Content.css({ height: hei + "px", top: "0px" });
                else this.Content.css({ height: (hei - 26) + "px", top: (this.Minimize ? 28 : 26) + "px" });
            },
        });
    }
})(jQuery);
//CenterPanel
(function ($) {
    function GetLeft(opt) {
        if (!ktw.IsNull(opt.Left)) return opt.Left;
        if (ktw.App.LeftPanel == null) return "0px";
        return ktw.App.LeftPanel.GetActualWidth() + "px";
    }
    function GetWidth(opt) {
        var w = $(window).width();
        if (ktw.App.LeftPanel != null) {
            if (!opt || ktw.IsNull(opt.Left))
                w -= ktw.App.LeftPanel.GetActualWidth();
        }
        if (ktw.App.RightPanel != null) {
            w -= ktw.App.RightPanel.Width;
        }
        return w + "px";
    }
    ktw.CenterPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.opt = opt;
        opt.Visible = true;
        opt.Target = $("<div class='Panel-Center' id='" + opt.ID +
            "' style='width:" + GetWidth(opt) + ";left:" + GetLeft(opt) + "'></div>");
        $.extend(this, new ktw.Control(opt));
        this.Target.css("display", this.Visible ? "block" : "none");
        var lc = ktw.App.Config.SystemLayout;
        ktw.App.MapToolPanel = this.MapToolPanel = new ktw.MapToolPanel(lc.MapToolPanel);
        this.Target.append(this.MapToolPanel.Target);
        ktw.App.MapPanel = this.MapPanel = new ktw.MapPanel(lc.MapPanel);
        this.Target.append(this.MapPanel.Target);
        ktw.App.BottomPanel = this.BottomPanel = new ktw.BottomPanel(lc.BottomPanel);
        this.Target.append(this.BottomPanel.Target);
    };
    $.fn.extend(ktw.CenterPanel.prototype, {
        Layout: function () {
            this.Target.css("left", GetLeft(this.opt));
            this.Target.css("width", GetWidth(this.opt));
            this.MapToolPanel.Layout();
            this.BottomPanel.Layout();
            this.MapPanel.Layout();
            this.Target.trigger("onResize");
        }
    });
})(jQuery);
//MapToolPanel(地图工具栏)
(function ($) {
    ktw.MapToolPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Region = ktw.Region.North;
        opt.TargetName = "MapToolPanel";
        opt.SplitClass = "Panel-Split-V";
        opt.Target = $("<div class='Panel-MapTool' id='" + opt.ID
            + "' style='height:" + opt.Height + "px;background-color:#dddddd'></div>");
        $.extend(this, new ktw.Panel(opt));
        this.Target.css("display", this.Visible ? "block" : "none");
        this.DragResize(this);
        this.LeftBoxVisible = ktw.IsBoolean(opt.LeftBoxVisible) ?
            opt.LeftBoxVisible : opt.LeftBoxVisible == "true";
        this.LeftBoxWidth = ktw.IsNumber(opt.LeftBoxWidth) ?
            opt.LeftBoxWidth : parseInt(opt.LeftBoxWidth);
        this.RightBoxVisible = ktw.IsBoolean(opt.RightBoxVisible) ?
            opt.RightBoxVisible : opt.RightBoxVisible == "true";
        this.RightBoxWidth = ktw.IsNumber(opt.RightBoxWidth) ?
            opt.RightBoxWidth : parseInt(opt.RightBoxWidth);
        this.CenterBoxVisible = ktw.IsBoolean(opt.CenterBoxVisible) ?
            opt.CenterBoxVisible : opt.CenterBoxVisible == "true";

        var contentPanel = $('<div data="mapToolContent" tag="maptool" ' +
            'style="position:absolute;left:0px;height:100%;width:100%;display:' + (this.LeftBoxVisible ? 'block' : 'none')
            + ';margin:0px;"></div>');
        this.mt.append(contentPanel);

        this.LeftBox = $('<div id="mapTooLeftBox" tag="maptool" ' +
            'style="position:absolute;left:0px;height:' + (this.Height - 2)
            + 'px;width:' + this.LeftBoxWidth + 'px;display:' +
            (this.LeftBoxVisible ? 'block' : 'none') + ';margin:0px;"></div>');
        this.mt.append(this.LeftBox);

        this.RightBox = $('<div id="mapTooRightBox" tag="maptool" ' +
            'style="position:absolute;right:0px;height:' + (this.Height - 2)
            + 'px;width:' + this.RightBoxWidth + 'px;display:' +
            (this.RightBoxVisible ? 'block' : 'none') + ';margin:0px;"></div>');
        this.mt.append(this.RightBox);

        var centerWidth = this.mt.width() - this.RightBoxWidth - this.LeftBoxWidth;
        this.CenterBox = $('<div id="mapToolCenterBox" tag="maptool" ' +
            'style="position:absolute;left: ' + this.LeftBoxWidth + 'px;height:'
            + (this.Height - 2) + 'px;width:' + centerWidth + 'px;display:' +
            (this.CenterBoxVisible ? 'block' : 'none') + ';margin:0px;"></div>');
        this.mt.append(this.CenterBox);

    };
    $.fn.extend(ktw.MapToolPanel.prototype, {
        Layout: function () { this.Resize(); },
        SetHeight: function (height) {
            if (!ktw.IsNumber(height)) return;
            this.Target.panel({ height: this.Height = height });
            $("div[tag='maptool']").css('height', (height - 2) + 'px');
            this.Target.trigger("onResize");//大小变化事件
        },//设置高度
        SetVisible: function (visible) {
            if (!ktw.IsBoolean(visible)) return;
            if (this.Visible == visible) return;
            this.Target.attr("Visible", visible);
            var v = visible ? 'show' : 'hidden';
            this.Target.parent().parent().layout(v, this.Target.panel('options').region);
            this.Visible = visible;
        },//设置是否可见
        SetLeftBoxVisible: function (visible) {
            if (!ktw.IsBoolean(visible)) return;
            this.LeftBox.css('display', visible ? 'block' : 'none');
            var l = visible ? this.LeftBox.width() : 0;
            var centerwidth = this.Target.width() - (this.RightBoxVisible ? l + this.RightBox.width() : l);
            this.CenterBox.css({ 'width': centerwidth, 'left': l });
            this.LeftBoxVisible = visible;
        },//设置左边容器是否可见
        SetLeftBoxWidth: function (width) {
            if (!ktw.IsNumber(width)) return;
            this.LeftBox.css('width', this.LeftBoxWidth = width);
            var l = this.LeftBoxVisible ? this.LeftBox.width() : 0;
            var centerwidth = this.Target.width() - (this.RightBoxVisible ? l + this.RightBox.width() : l);
            this.CenterBox.css({ 'width': centerwidth, 'left': l });
            this.LeftBox.Target.trigger("onLeftBoxResize");//大小变化事件
        },//设置左边容器的宽度
        SetRightBoxVisible: function (visible) {
            if (!ktw.IsBoolean(visible)) return;
            this.RightBox.css('display', visible ? 'block' : 'none');
            var l = visible ? this.RightBox.width() : 0;
            var centerwidth = this.Target.width() - (this.LeftBoxVisible ? l + this.LeftBox.width() : l);
            this.CenterBox.css({ 'width': centerwidth });
            this.RightBoxVisible = visible;
        },//设置右边边容器是否可见
        SetRightBoxWidth: function (width) {
            if (!ktw.IsNumber(width)) return;
            this.RightBox.css('width', this.RightBoxWidth = width);
            var l = this.RightBoxVisible ? this.RightBox.width() : 0;
            var centerwidth = this.Target.width() - (this.LeftBoxVisible ? l + this.LeftBox.width() : l);
            this.CenterBox.css('width', centerwidth);
            this.RightBox.Target.trigger("onRightBoxResize");//大小变化事件
        },//设置右边容器的宽度
        SetCenterBoxVisble: function (visible) {
            if (!ktw.IsBoolean(visible)) return;
            this.CenterBox.css('display', visible ? 'block' : 'none');
            this.CenterBoxVisible = visible;
        },//设置中间容器是否可见
        Add: function (element, parent, isScolling, frameId) {
            if (ktw.IsNull(element)) return;
            parent = ktw.IsNull(parent) ? this.mt.children('div[data=mapToolContent]') : parent;
            var childByID = this.mt.find("#" + parent.attr("id"));
            var childByData = this.mt.find("div[data=" + parent.attr("data") + "]");
            var isChild = (ktw.IsNull(childByID) || childByID.length == 0) || (ktw.IsNull(childByData) || childByData.length == 0);
            if (!isChild) return;
            if (ktw.IsString(element)) parent.html(ktw.CreateFrame(element, isScolling, frameId));
            else if (ktw.IsObject(element)) parent.append(element);
        },//添加元素
        Remove: function (element) {
            element = ktw.IsString(element) ? $('#' + element) : (ktw.IsObject(element) ? $(element) : null);
            if (element == null) return;
            var isleftBox = ktw.IsNull(this.LeftBox) ? false : element.attr('id') === this.RightBox.attr('id');
            var isrightBox = ktw.IsNull(this.RightBox) ? false : element.attr('id') === this.RightBox.attr('id');
            var iscenterBox = ktw.IsNull(this.CenterBox) ? false : element.attr('id') == this.CenterBox.attr('id');
            if (element.attr('data') == 'mapToolContent' || isleftBox || isrightBox || iscenterBox || element.attr('id') === this.ID) return;
            if (element.parents('#' + this.ID).length > 0) element.remove();
        },//移除元素
        Clear: function (parent) {
            if (ktw.IsNull(parent) || $(parent).attr('id') == this.Target.attr('id')) {
                var children = this.mt.children();
                for (var i = 0; i < children.length; i++) {
                    var item = $(children[i]);
                    var isleftBox = this.LeftBox == null ? false : (item.attr('id') == this.LeftBox.attr('id'));
                    var isrightBox = this.RightBox == null ? false : (item.attr('id') == this.RightBox.attr('id'));
                    var iscenterBox = this.CenterBox == null ? false : (item.attr('id') == this.CenterBox.attr('id'));
                    if (item.attr('data') == 'mapToolContent' || isleftBox || isrightBox || iscenterBox) continue;
                    item.remove();
                }
                this.LeftBox.empty();
                this.RightBox.empty();
                this.CenterBox.empty();
                this.mt.children('div[data=mapToolContent]').empty();
            }
            else {
                var child = this.mt.find("#" + parent.attr("id"));
                if (ktw.IsNull(child) && child.length > 0) $(parent).empty();
            }
        }//清除所有元素
    });
})(jQuery);
//MapPanel(地图容器)
(function ($) {
    ktw.MapPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Visible = true;
        opt.Target = $("<div id='" + opt.ID + "' class='Panel-Map'></div>");
        $.extend(this, new ktw.Control(opt));
        this.MapDOM = $("<div id='map' style='border:0px;position:absolute;' tabindex='0'></div>"); //需要设置tabindex，才能使div获得键盘事件
        this.Content = $("<div style='border:0px;display:none;position:absolute;z-index:9997'></div>");
        this.Target.append(this.MapDOM);
        this.Target.append(this.Content);
    };
    $.fn.extend(ktw.MapPanel.prototype, {
        SetContentVisible: function (visible) {
            if (!ktw.IsBoolean(visible)) return;
            this.Content.css('display', (visible ? 'block' : 'none'));
        },
        Add: function (element, id) {
            var $this = this;
            if (ktw.IsString(element)) {
                // this.Target.trigger("onClosing", { element: $this, id: $this.ID });
                var frame = ktw.CreateFrame(element, false, id);
                var waitbox = new ktw.UCWaitBox(this.Target);
                frame.bind('load', function () {
                    waitbox.Close();
                    $this.Target.trigger("onLoaded");
                });
                this.Content.append(frame);
                waitbox.Show();
            }
            else if (ktw.IsObject(element)) {
                this.Content.append($(element)); $this.Target.trigger("onLoaded");
            }
            this.Content.css('display', 'block');
        },//添加内容
        Remove: function (element) {
            if (ktw.IsString(element)) element = $('#' + element, this.Content);
            else if (ktw.IsDOMElement(element)) element = $(element);
            if (element != null && element.length > 0) element.remove();
            if (this.Content.children().length == 0) this.Content.css('display', 'none');
        },
        Clear: function () {
            this.Content.empty();
            this.Content.css('display', 'none');
        },//清除
        Layout: function () {
            this.Height = ktw.App.MainPanel.GetActualHeight() -
                ktw.App.BottomPanel.GetActualHeight() - ktw.App.MapToolPanel.GetActualHeight();
            this.Target.css("top", ktw.App.MapToolPanel.GetActualHeight());
            this.Target.css("height", this.Height);
            this.MapDOM.css("height", this.Height - (this.MapDOM.outerHeight() - this.MapDOM.height()));
            this.MapDOM.css("width", this.GetActualWidth() - (this.MapDOM.outerWidth() - this.MapDOM.width()));
            if (!ktw.IsNull(ktw.App.Map)) ktw.App.Map.invalidateSize();
            this.Target.trigger("onResize");
        }//初始布局
    });
})(jQuery);
//BottomPanel
(function ($) {
    ktw.BottomPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.IconCls = "icon-ResourceView";
        //opt.IconVisible = false;
        opt.Region = ktw.Region.South;
        opt.TargetName = "BottomPanel";
        opt.SplitClass = "Panel-Split-V";
        opt.Target = $("<div class='Panel-Bottom' id='" + opt.ID
            + "' style='height:" + opt.Height + "px'></div>");
        if (!ktw.IsNull(opt.ZIndex)) {
            opt.Target.css("z-index", opt.ZIndex);
        }
        $.extend(this, new ktw.DockPanel(opt));
        var $this = this;
        this._Height = this.Height;
        this.Header.css("background-color", "#dddddd");
        this.DragResize(this);
        this.Title = opt.Title;
        this.Minimize = ktw.IsBoolean(opt.Minimize) ? opt.Minimize : opt.Minimize == "true";
        funExt(this);
        if (!this.Visible) this.Target.css("height", (this.Height = 0) + "px");
        else if (this.Minimize) {
            this.Target.css("height", (this.Height = 26) + "px");
            var scalable = $("#scalable", this.ButtonPanel);
            scalable.removeClass("Dock-Panel-Button-SOUTH");
            scalable.addClass("Dock-Panel-Button-NORTH");
            $this.SetResizable(false);
        }
        this.bind("onScaleClick", function (a, b) {
            if (b.ToolItem.ID == "scalable") $this.SetMinimize();
        });
        this.animating = false;
    };
    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () {
                this.Resize();
                this.SetHeaderVisible(this.HeaderVisible);
            },
            SetVisible: function (visible) {
                //if (this.animating) return;
                this.animating = true;
                var $this = this;
                if (visible === undefined) visible = !this.Visible;
                if (this.Visible && !this.Minimize) this._Height = this.Height;
                var h = visible ? this._Height : 0;
                this.Target.animate({ height: h }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        $this.Height = h;
                        $this.Visible = visible;
                        if (visible) {
                            $this.Minimize = false;
                            var scalable = $("#scalable", $this.ButtonPanel);
                            scalable.removeClass("Dock-Panel-Button-NORTH");
                            scalable.addClass("Dock-Panel-Button-SOUTH");
                        }
                        ktw.App.CenterPanel.Layout();
                        $this.animating = false;
                    }
                });
            },
            SetMinimize: function (isMin) {
                if (!this.Visible) return;//this.animating || 
                this.animating = true;
                var $this = this;
                if (isMin === undefined) isMin = !this.Minimize;
                if (!this.Minimize) this._Height = this.Height;
                var h = isMin ? 26 : this._Height;
                $this.SetResizable(!isMin);
                this.Target.animate({ height: h }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        $this.Height = h;
                        $this.Minimize = isMin;
                        var scalable = $("#scalable", $this.ButtonPanel);
                        if ($this.Minimize) {
                            scalable.removeClass("Dock-Panel-Button-SOUTH");
                            scalable.addClass("Dock-Panel-Button-NORTH");
                        }
                        else {
                            scalable.removeClass("Dock-Panel-Button-NORTH");
                            scalable.addClass("Dock-Panel-Button-SOUTH");
                        }
                        ktw.App.CenterPanel.Layout();
                        $this.animating = false;
                        $this.Target.trigger((isMin ? "onCollapse" : "onExpand"));
                    }
                });
            },
            SetHeight: function (height) {
                if (!ktw.IsNumber(height)) return;
                this._Height = this.Height = height;
                if (!this.Visible || this.Minimize) return;
                this.Target.css({ "height": this.Height + "px" });
                ktw.App.CenterPanel.Layout();
            }
        });
    }
})(jQuery);
//FillPanel(填充容器[中间部分])
(function ($) {
    ktw.FillPanel = function (opt) {
        if (ktw.IsNull(opt) || ktw.IsNull(opt.MainPanel)) return;
        $t = this;
        this.MainPanel = opt.MainPanel;
        this.Target = this.MainPanel.CenterPanel.Target;
    };
    $.fn.extend(ktw.FillPanel.prototype, {
        Add: function (element, params, id) {
            var $this = this;
            this.MainPanel.RightPanel.SetVisible(false);
            if (ktw.IsString(element)) {
                //this.Target.trigger("onClosing", { element: $this, id: $this.ID });
                var frame = ktw.CreateFrame(element, false, id);
                frame.css({ "position": "absolute", "z-index": 4 });
                var waitbox = new ktw.UCWaitBox(this.Target);
                frame.bind('load', function () {
                    waitbox.Close();
                    ktw.CallWidgetCommunication(frame[0], $this.Target, params);
                    $this.Target.trigger("onLoaded", $this);
                });
                this.Target.append(frame);
                waitbox.Show();
            }
            else if (ktw.IsDOMElement(element) || ktw.IsjQueryObject(element)) {
                $(element).css({ "position": "absolute", "z-index": 4 });
                this.Target.append(element);
                this.Target.trigger("onLoaded", $this);
            }
            //return this.Target;
        },
        Remove: function (element) {
            element = ktw.IsString(element) ? $('#' + element, this.Target)
                : (ktw.IsObject(element) ? $(element) : null);
            if (element == null || element.length == 0) return;
            if (element.hasClass("Panel-MapTool") || element.hasClass("Panel-Map")
                || element.hasClass("Panel-Bottom")) return;
            element.remove();
        },
        Clear: function () {
            //this.Target.trigger("onClosing", { element: this, id: this.ID });
            this.Target.trigger("onClosing", { element: this });
            var children = this.Target.children();
            for (var i = 0; i < children.length; i++) {
                var e = $(children[i]);
                if (!e.hasClass("Panel-MapTool") && !e.hasClass("Panel-Map")
                && !e.hasClass("Panel-Bottom")) e.remove();
            }
        },
        bind: function () {
            this.Target.bind(arguments[0], arguments[1], arguments[2]);
        },
        unbind: function (eventName) { this.Target.unbind(eventName); }
    });
})(jQuery);
//Tab
(function ($) {
    var tabItemHeight = 24;
    function layoutTabItem(tabItems, left) {
        for (var i = 0; i < tabItems.length; i++) {
            var item = $(tabItems[i]);
            item.css("left", left + "px");
            left += item.outerWidth();
        }
    };
    ktw.Tab = function (opt) {
        function tabItemScroll(obj) {
            if (animating) return;
            animating = true;
            var tabItems = $this.tabPanel.children("[tabIndex]");
            var aw = Enumerable.From(tabItems).Sum("s=>$(s).outerWidth()");
            var left = 19 - parseInt($(tabItems[0]).css("left"));
            var d = 100;
            if (obj.hasClass("LeftScrollButton")) {
                if (left < d) d = left;
            }
            else if (obj.hasClass("RightScrollButton")) {
                if (aw - left - $this.Width + 38 < d) d = aw - left - $this.Width + 38;
            }
            if ($this.Width - 38 < d) d = $this.Width - 38;
            if (d <= 0) {
                animating = false;
                return;
            }
            if (obj.hasClass("LeftScrollButton")) d = -d;
            for (var i = 0; i < tabItems.length; i++) {
                var l = parseInt($(tabItems[i]).css("left"));
                $(tabItems[i]).animate({ left: l - d }, {
                    duration: "fast", queue: false,
                    complete: function () {
                        animating = false;
                    }
                });
            }
        }
        if (ktw.IsNull(opt)) opt = { Visible: true, Width: 200, Height: 600, Position: "bottom" };
        if (ktw.IsNull(opt.Target))
            opt.Target = $("<div class='ktw-tab' style='width:" + opt.Width + "px;height:" +
                opt.Height + "px;display:" + (opt.Visible ? "block" : "none") + "'></div>");
        else opt.ID = opt.Target.attr("id");
        $.extend(this, new ktw.Control(opt));
        var $this = this;
        var animating = false;
        this.SelectedIndex = 0;
        this.TabNormalCls = opt.TabNormalCls;
        this.TabSelectedCls = opt.TabSelectedCls;
        this.Target = opt.Target;
        this.Position = ktw.IsNull(opt.Position) ? "top" : opt.Position;
        this.IsDeletedLastTab = ktw.IsBoolean(opt.IsDeletedLastTab) ? opt.IsDeletedLastTab : opt.IsDeletedLastTab == "true";
        this.content = $("<div style='width:100%;height:" + (opt.Height - tabItemHeight) + "px;margin-top:" + (this.Position === "bottom" ? "0px" : tabItemHeight + "px") + "'></div>");
        this.content.appendTo(this.Target);
        this.tabPanel = $("<div class='" + (this.Position === "bottom" ? "TabPanelBottom" : "TabPanelTop") + "'></div>");
        this.tabLS = $("<div class='LeftScrollButton'></div>");
        this.tabRS = $("<div class='RightScrollButton'></div>");
        this.tabLS.appendTo(this.tabPanel);
        this.tabRS.appendTo(this.tabPanel);
        this.tabLS.bind("click", function () { tabItemScroll($(this)); });
        this.tabRS.bind("click", function () { tabItemScroll($(this)); });
        this.tabPanel.appendTo(this.Target);
        if (ktw.IsNull(opt.Items)) this.Items = [];
        else this.Items = opt.Items;
        funExt(this);
        this.RefreshItem();
        this.bind("onResize", this, function (e) {
            var height = e.data.Height;
            if (e.data.content.children > 1) height -= tabItemHeight;
            e.data.content.css("height", height + "px");
            var tabItem = $this.tabPanel.children("[tabIndex='" + $this.SelectedIndex + "']");
            tabItem.triggerHandler("onResize");
        });
    };
    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () {
                var tabItems = this.tabPanel.children("[tabIndex]");
                for (var i = 0; i < tabItems.length; i++) $(tabItems[i]).first().css("width", "");
                var aw = Enumerable.From(tabItems).Sum("s=>$(s).children(':first').outerWidth()");
                if (aw > this.Width) {
                    this.tabLS.css("display", "block");
                    this.tabRS.css("display", "block");
                    var l0 = parseInt($(tabItems[0]).css("left"));
                    if (l0 == 0 || l0 == 19 || isNaN(l0)) layoutTabItem(tabItems, 19);
                    else {
                        if (l0 + aw < this.Width - 19) layoutTabItem(tabItems, this.Width - 19 - aw);
                        else layoutTabItem(tabItems, (l0 < 0) ? 19 : (19 - l0));
                    }
                    var item = this.tabPanel.children("[tabIndex='" + this.SelectedIndex + "']");
                    var left = parseInt($(item).css("left"));
                    if (left < 19) {
                        var tabItems = this.tabPanel.children("[tabIndex]");
                        for (var i = 0; i < tabItems.length; i++) {
                            var l = parseInt($(tabItems[i]).css("left"));
                            $(tabItems[i]).css("left", (l + 19 - left) + "px");
                        }
                    }
                    else if (left + $(item).outerWidth() > this.Width - 19) {
                        var tabItems = this.tabPanel.children("[tabIndex]");
                        var _l = left - this.Width + 19 + $(item).outerWidth();
                        for (var i = 0; i < tabItems.length; i++) {
                            var l = parseInt($(tabItems[i]).css("left"));
                            $(tabItems[i]).css("left", (l - _l) + "px");
                        }
                    }
                }
                else {
                    this.tabLS.css("display", "none");
                    this.tabRS.css("display", "none");
                    var res = (this.Width - aw) % tabItems.length;//取余
                    var uw = ((this.Width - aw) - res) / tabItems.length;//单位平均值
                    var left = 0;
                    for (var i = 0; i < tabItems.length; i++) {
                        var item = $(tabItems[i]);
                        var w = item.first().outerWidth();
                        if (res == 0) w += uw;
                        else {
                            w += uw + 1;
                            res--;
                        }
                        item.css("left", left + "px");
                        item.css("width", w + "px");
                        left += w;
                    }
                }
            },
            SelectItem: function (item) {
                if (!ktw.IsObject(item)) return;
                this.SelectedIndex = parseInt($(item).attr("tabIndex"));
                this.tabPanel.children("[tabIndex]").removeClass("TabItem-Selected" + (ktw.IsNull(this.TabSelectedCls) ? "" : " " + this.TabSelectedCls));
                var tabItem = this.tabPanel.children("[tabIndex='" + this.SelectedIndex + "']");
                tabItem.addClass("TabItem-Selected" + (ktw.IsNull(this.TabSelectedCls) ? "" : " " + this.TabSelectedCls));
                this.content.children("[tabIndex]").css("display", "none");
                this.content.children("[tabIndex='" + this.SelectedIndex + "']").css("display", "block");
                if (this.tabLS.css("display") == "none") {
                    tabItem.trigger("onSelected", { element: tabItem, index: this.SelectedIndex })
                    return;
                }
                var left = parseInt($(item).css("left"));
                if (left < 19) {
                    var tabItems = this.tabPanel.children("[tabIndex]");
                    for (var i = 0; i < tabItems.length; i++) {
                        var l = parseInt($(tabItems[i]).css("left"));
                        $(tabItems[i]).animate({ left: l + 19 - left }, {
                            duration: "fast", queue: false
                        });
                    }
                }
                else if (left + $(item).outerWidth() > this.Width - 19) {
                    var tabItems = this.tabPanel.children("[tabIndex]");
                    var _l = left - this.Width + 19 + $(item).outerWidth();
                    for (var i = 0; i < tabItems.length; i++) {
                        var l = parseInt($(tabItems[i]).css("left"));
                        $(tabItems[i]).animate({ left: l - _l }, {
                            duration: "fast", queue: false
                        });
                    }
                }
                tabItem.trigger("onSelected", { element: tabItem, index: this.SelectedIndex });//选中事件
            },
            SelectIndex: function (index) {
                if (!ktw.IsNumber(index)) return;
                var item = this.tabPanel.children("[tabIndex='" + index + "']");
                this.SelectItem(item);
            },
            SelectID: function (id) {
                if (!ktw.IsString(id)) return;
                var item = this.tabPanel.find("div#" + id).parent();
                this.SelectItem(item);
            },
            RefreshItem: function () {
                this.content.empty();
                var $this = this;
                this.tabPanel.children("[tabIndex]").remove();
                for (var i = 0; i < this.Items.length; i++) {
                    if (ktw.IsNull(this.Items[i].Content) && ktw.IsNull(this.Items[i].Url)) continue;
                    this.Items[i].IsDeleted = ktw.IsBoolean(this.Items[i].IsDeleted) ? this.Items[i].IsDeleted : this.Items[i].IsDeleted === "true";
                    this.Items[i].IsSelected = ktw.IsBoolean(this.Items[i].IsSelected) ? this.Items[i].IsSelected : this.Items[i].IsSelected === "true";
                    this.Items[i].IsScrolling = ktw.IsBoolean(this.Items[i].IsScrolling) ? this.Items[i].IsScrolling : this.Items[i].IsScrolling === "true";
                    if (this.Items[i].IsSelected) this.SelectedIndex = i;
                    var item = $("<div class='TabItem" + (ktw.IsNull($this.TabNormalCls) ? "" : " " + $this.TabNormalCls) + "' tabIndex='" + i + "'></div>");
                    item.bind("click", this, function (obj) {
                        obj.data.SelectItem(this);
                    });
                    var itemContent = $("<div class='ItemContent' id='" + this.Items[i].ID + "'></div>");
                    var title = $("<span class='Title'>" + this.Items[i].Name + "</span>");
                    itemContent.append(title);
                    itemContent.appendTo(item);
                    if (this.Items[i].IsDeleted) {
                        var img = $("<img class='CloseButton' id='img" + this.Items[i].ID + "' />");
                        img.bind("click", this, function (obj) {
                            obj.data.RemoveItem($(this).parents("div.TabItem"));
                        });
                        title.append(img);
                    }
                    item.appendTo(this.tabPanel);
                    if (!ktw.IsNull(this.Items[i].Content)) {
                        var content = $(this.Items[i].Content);
                        content.css("display", "none");
                        content.attr("tabIndex", "" + i);
                        this.content.append(content);
                        item.trigger("onLoaded", $this);
                    }
                    else if (!ktw.IsNull(this.Items[i].Url)) {
                        var frame = ktw.CreateFrame(this.Items[i].Url, this.Items[i].IsScrolling, this.Items[i].ID);
                        frame.css("display", "none").attr("tabIndex", "" + i);
                        frame.bind('load', {
                            frame: frame[0],
                            tabItem: item,
                            parameters: this.Items[i].Parameters
                        }, function (s, e) {
                            ktw.CallWidgetCommunication(s.data.frame, s.data.tabItem, s.data.parameters);
                            s.data.tabItem.trigger("onLoaded", $this);
                        });
                        this.content.append(frame);

                    }
                }
                if (this.IsDeletedLastTab && this.content.children().length === 1) {
                    if (this.Position.toLowerCase() !== "bottom") this.content.css("margin-top", "0px");
                    this.content.css("height", (this.content.height() + tabItemHeight) + "px");
                    this.tabPanel.css("display", "none");
                }
                this.SelectIndex(this.SelectedIndex);
            },
            Add: function (itemObj, isScrolling, frameId) {
                if (!ktw.IsObject(itemObj) || (ktw.IsNull(itemObj.Content) && ktw.IsNull(itemObj.Url))) return;
                var $this = this;
                itemObj.IsDeleted = ktw.IsBoolean(itemObj.IsDeleted) ? itemObj.IsDeleted : itemObj.IsDeleted === "true";
                itemObj.IsSelected = ktw.IsBoolean(itemObj.IsSelected) ? itemObj.IsSelected : itemObj.IsSelected === "true";
                var index = parseInt(this.tabPanel.children("div.TabItem:last").attr("tabIndex"));//获取最后一个TabItems的索引值
                if (this.IsDeletedLastTab) {
                    if (index === 0) {//当获取的最后一个索引为0
                        if (this.Position.toLowerCase() !== "bottom") this.content.css("margin-top", tabItemHeight + "px");
                        this.content.css("height", (this.content.height() - tabItemHeight) + "px");
                        this.tabPanel.css("display", "block");
                    }
                    else if (isNaN(index)) {//如果现在加的是第一个tab，那么就是完全填充
                        if (this.Position.toLowerCase() !== "bottom") this.content.css("margin-top", "0px");
                        this.tabPanel.css("display", "none");
                        this.content.css("height", (this.content.height()) + "px");
                    }
                }
                index = isNaN(index) ? 0 : index + 1;
                if (itemObj.IsSelected) this.SelectedIndex = index;
                var tabItem = $("<div class='TabItem " + (ktw.IsNull($this.TabNormalCls) ? "" : " " + $this.TabNormalCls) + "' tabIndex='" + index + "'></div>");
                tabItem.bind("click", this, function (obj) { obj.data.SelectItem(this); });
                var itemContent = $("<div class='ItemContent' id='" + itemObj.ID + "'></div>");
                var title = $("<span class='Title'>" + itemObj.Name + "</span>");
                itemContent.append(title);
                itemContent.appendTo(tabItem);
                if (itemObj.IsDeleted) {
                    var img = $("<img class='CloseButton' id='img" + itemObj.ID + "'/>");
                    img.bind("click", this, function (obj) {
                        obj.data.RemoveItem($(this).parents("div.TabItem"));
                    });
                    title.append(img);
                }
                tabItem.appendTo(this.tabPanel);
                if (!ktw.IsNull(itemObj.Content)) {
                    var content = $(itemObj.Content);
                    content.css("display", "none");
                    content.attr("tabIndex", "" + index);
                    this.content.append(content);
                    tabItem.triggerHandler("onLoaded", $this);
                }
                else if (!ktw.IsNull(itemObj.Url)) {
                    var frame = ktw.CreateFrame(itemObj.Url, isScrolling, frameId);
                    frame.css("display", "none").attr("tabIndex", "" + index);
                    var waitbox = new ktw.UCWaitBox({ Parent: this.Target, BackColor: "#293038" });//zzy 2016-10-22
                    frame.bind('load', {
                        frame: frame[0],
                        tabItem: tabItem,
                        parameters: itemObj.Parameters
                    }, function (e) {
                        ktw.CallWidgetCommunication(e.data.frame, e.data.tabItem, e.data.parameters);
                        waitbox.Close();
                        e.data.tabItem.triggerHandler("onLoaded", $this);
                    });
                    this.content.append(frame);
                    waitbox.Show();
                }
                this.Items.push(itemObj);
                this.Layout();
                if (itemObj.IsSelected) {
                    this.SelectedIndex = index;
                    this.SelectItem(tabItem);
                }
                return tabItem;
            },
            RemoveItem: function (item) {
                if (!ktw.IsObject(item)) return;
                var index = $(item).attr("tabIndex");
                this.RemoveIndex(parseInt(index));
            },
            RemoveID: function (id) {
                if (!ktw.IsString(id)) return;
                var item = this.tabPanel.find("#" + id).parent();
                var index = $(item).attr("tabIndex");
                this.RemoveIndex(parseInt(index));
            },
            RemoveIndex: function (index) {
                if (!ktw.IsNumber(index)) return;
                var currentContent = this.content.children("[tabIndex='" + index + "']");
                var tabItem = this.tabPanel.children("[tabIndex='" + index + "']");
                tabItem.trigger("onClosing", { element: { Target: tabItem }, id: tabItem.attr("id"), index: index });
                var lastindex = parseInt(this.tabPanel.children("div.TabItem:last").attr("tabIndex"));//获取最后一个TabItems的索引值
                var left = undefined;
                if (index === 0) { left = 19; }
                currentContent.remove();
                tabItem.remove();
                this.Items.splice(index, 1);
                if (this.IsDeletedLastTab && this.content.children().length === 1) {
                    if (this.Position.toLowerCase() !== "bottom") this.content.css("margin-top", "0px");
                    this.content.css("height", (this.content.height() + tabItemHeight) + "px");
                    this.tabPanel.css("display", "none");
                }
                if (index === lastindex)
                    this.SelectedIndex = index === this.SelectedIndex ? (index - 1) : this.SelectedIndex;
                else {
                    var i = index + 1;
                    while (i <= lastindex) {
                        var button = this.tabPanel.children("[tabIndex='" + i + "']");
                        this.content.children("[tabIndex='" + i + "']").attr("tabIndex", "" + (i - 1));
                        button.attr("tabIndex", "" + (i - 1));
                        if (i === (index + 1) && left) button.css("left", left + "px");
                        i++;
                    }
                    if (this.SelectedIndex > index) this.SelectedIndex = this.SelectedIndex - 1;
                    else if (this.SelectedIndex === index) this.SelectedIndex = index;
                }
                this.Layout();
                this.SelectIndex(this.SelectedIndex);
                tabItem.trigger("onClosed", { parent: { Target: tabItem }, id: tabItem.attr("id"), index: index });
            },
            GetTabItemByID: function (id) {
                if (!ktw.IsString(id)) return;
                var item = this.tabPanel.find("div#" + id).parent();
                return this.tabPanel.children("[tabIndex='" + item.attr("tabIndex") + "']");
            },
            GetTabItemByIndex: function (index) {
                if (!ktw.IsNumber(index)) return;
                return this.tabPanel.children("[tabIndex='" + index + "']");
            },
            GetContentByID: function (id) {
                if (!ktw.IsString(id)) return;
                return this.content.children("#" + id);
            },
            GetContentByIndex: function (index) {
                if (!ktw.IsString(id)) return;
                return this.content.children("[tabIndex='" + index + "']");
            },
            Clear: function () {
                this.content.children("[tabIndex]").Clear();
                this.tabPanel.children("[tabIndex]").Clear();
            }
        });
    };
})(jQuery);
//NavButton 2016-07-08 zzy
(function ($) {
    ktw.NavButton = function (opt) {
        if (ktw.IsNull(opt)) opt = { IconVisible: true, Text: "按钮" };
        this.IconVisible = ktw.IsBoolean(opt.IconVisible) ? opt.IconVisible : opt.IconVisible != "false";
        this.TrigonVisible = ktw.IsBoolean(opt.TrigonVisible) ? opt.TrigonVisible : opt.TrigonVisible == "true";
        var title = "<span class='Title'>" + (this.Text = opt.Text) + "</span>";
        var moreIcon = "<div class='Icon-Trigon' style='display:" + (this.TrigonVisible ? "block" : "none") + "'></div>";
        this.Padding = ktw.IsNull(opt.Padding) ? "" : "padding:" + opt.Padding;
        this.IconCls = opt.Icon ? ktw.InsertIconRule(ktw.App.TempStyle, ".icon" + this.ID, opt.Icon) : opt.IconCls;
        var sizeStyle = "";
        opt.Target = $("<a class='Nav-Button' style='" + this.Padding + ";'><div class='Icon " + this.IconCls
            + "' style='display:" + (this.IconVisible ? "block" : "none") + ";'></div>" + title + moreIcon + "</a>");
        $.extend(this, new ktw.Control(opt));
        this.Target.prop("Tag", opt.Tag);
        this.Target.bind("mouseenter", this, function (e) {
            e.data.Target.trigger("onMouseenter");
        });
        this.Target.bind("mouseleave", this, function (e) {
            e.data.Target.css("background-color", "");
            e.data.Target.trigger("onMouseleave");
        });
        this.Target.bind("mousedown", this, function (e) {
            e.data.Target.css("background-color", "#00779f");
            e.data.Target.trigger("onMousedown");
        });
        this.Target.bind("mouseup", this, function (e) {
            e.data.Target.css("background-color", "");
            e.data.Target.trigger("onMouseup");
        });
        //这里的click事件是绑定的最顶层一级菜单的事件,一级、二级、三级菜单统一触发最顶层菜单对象的onItemClick事件，然后由MenuInit的WidgetLoad方法统一处理
        this.Target.bind("click", this, function (e) {
            e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
        });
    };
    $.fn.extend(ktw.NavButton.prototype, {
        SetBackgroundColor: function (color) {
            this.Target.css("background-color", color);
        },
        SetPadding: function (padding) {
            this.Target.css("padding", padding);
        },
        SetTitle: function (title) {
            this.Text = title;
            $('.Title', this.Target).html(title);
        }
    });
})(jQuery);
//NavMenu 2016-07-08 zzy
(function ($) {
    function filter(menus) {
        var ms = [];
        if (ktw.IsNull(menus)) return ms;
        menus = $(menus);
        for (var i = 0; i < menus.length; i++) {
            var m = null;
            if (ktw.IsNull(menus[i].IsVisible)) ms.push(m = menus[i]);
            else if (menus[i].IsVisible == "true") ms.push(m = menus[i]);
            if (m == null || ktw.IsNull(m.Widgets) || $(m.Widgets).length == 0) continue;
            m.Widgets = Enumerable.From($(m.Widgets)).Where('s=>s.IsVisible.toString()=="true"').ToArray();
        }
        return ms;
    }
    ktw.NavMenu = function (opt) {
        if (ktw.IsNull(opt)) opt = { OpState: "hover", Menus: [] };
        $.extend(this, new ktw.NavButton(opt));
        var $this = this;
        this.Menus = filter(opt.Menus);
        this.OpState = ktw.IsNull(opt.OpState) ? "hover" : opt.OpState;
        //创建二级菜单容器并且直接添加到body中
        this.MenuPanel = $("<div class='NavMenu'></div>");
        this.MenuPanel.appendTo(document.body);

        //二级菜单容器-鼠标移入,移入时先清除延迟执行,结合二级菜单项本身的鼠标移入事件,来显示三级菜单的大小位置
        this.MenuPanel.bind("mouseenter", this, function (e) {
            clearTimeout(e.data.timeout);
            //e.data.SetBackgroundColor("#008dbf");
            e.data.SetCSS({ "background": "rgba(0,0,0,0.3)" });
        });
        //二级菜单容器-鼠标移出,使用50ms延迟,方便后面清除
        this.MenuPanel.bind("mouseleave", this, function (e) {
            //移出时停止二级菜单面板和三级菜单面板上的动画,并且使二级菜单容器和三级菜单容器快速隐藏
            e.data.timeout = setTimeout(function () {
                e.data.SetBackgroundColor("");
                if (e.data.MenuPanel.is(":animated")) e.data.MenuPanel.stop();
                e.data.MenuPanel.animate({ "height": 0 }, "fast");
                if (e.data.SubMenuPanel.is(":animated")) e.data.SubMenuPanel.stop();
                e.data.SubMenuPanel.animate({ "width": 0, "height": 0 }, "fast");
            }, 50);
        });
        this.SubMenuPanel = $("<div class='SubNavMenu'><div class='Content'></div></div>");
        //三级菜单容器-鼠标移入,鼠标移出时删除在二级菜单和三级菜单上延迟执行的函数
        this.SubMenuPanel.bind("mouseenter", this, function (e) {
            clearTimeout(e.data.timeout);
            clearTimeout(e.data.timeout1);
        });
        //三级菜单容器-鼠标移出,使用50ms延迟
        this.SubMenuPanel.bind("mouseleave", this, function (e) {
            $("[ItemIndex]", e.data.MenuPanel).removeClass("SelectItem");
            e.data.timeout = setTimeout(function () {
                e.data.SetBackgroundColor("");
                if (e.data.MenuPanel.is(":animated")) e.data.MenuPanel.stop();
                e.data.MenuPanel.animate({ "height": 0 }, "fast");
                if (e.data.SubMenuPanel.is(":animated")) e.data.SubMenuPanel.stop();
                e.data.SubMenuPanel.animate({ "width": 0, "height": 0 }, "fast");
            }, 50);
        });
        //将三级菜单容器直接添加到body中
        this.SubMenuPanel.appendTo(document.body);
        this.Target.prop("Tag", opt.Tag);
        for (var i = 0; i < this.Menus.length; i++) {
            this.MenuPanel.append($("<div class='SplitBar'><div class='Left'></div><div class='Center'></div><div class='Right'></div></div>"));
            //创建二级菜单
            var item = $("<div ItemIndex='" + i + "' class='Item'><span style='margin-left:20px'>" + this.Menus[i].Title + "</span></div>");
            //如果当前二级菜单有三级菜单,就添加箭头
            if (!ktw.IsNull(this.Menus[i].Widgets) && $(this.Menus[i].Widgets).length > 0) item.append($("<div class='Arrow'></div>"));
            //将二级菜单携带的数据放入dom对象的属性中
            item.prop("Tag", this.Menus[i]);
            //给二级菜单添加鼠标移入事件
            item.bind("mouseenter", $this, function (e) {
                var _item = $(this), p = _item.offset(),
                    w = e.data.MenuPanel.outerWidth();
                p.left += (w - 5), p.width = w + 6;
                _item.addClass("SelectItem");
                _item.prev().children().css("display", "none");
                _item.next().children().css("display", "none");
                e.data.ShowSubMenu(_item.prop("Tag").Widgets, p, _item.attr("ItemIndex"));
            });
            //给二级菜单添加鼠标移出事件,移出时有延迟50ms方便后面取消
            item.bind("mouseleave", $this, function (e) {
                var _item = $(this);
                e.data.timeout1 = setTimeout(function () {
                    _item.removeClass("SelectItem");
                    _item.prev().children().css("display", "block");
                    _item.next().children().css("display", "block");
                }, 50);
            });
            //给二级菜单添加单击事件
            item.bind("click", $this, function (e) {
                e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
            });
            this.MenuPanel.append(item);
        }
        //鼠标移入的时候,先检查是否存在延迟执行的句柄,如果存在就清除
        this.Target.bind("onMouseenter", this, function (e) {
            //鼠标移入一级菜单的时候,先将面板的延迟函数取消
            //将三级菜单容器的动画取消,并且使用动画快速缩小
            //将二级菜单容器的动画取消,并且快速展开
            if (e.data.OpState != "hover") return;
            if (!ktw.IsNull(e.data.timeout)) clearTimeout(e.data.timeout);
            if (e.data.SubMenuPanel.is(":animated")) e.data.SubMenuPanel.stop();
            e.data.SubMenuPanel.animate({ "width": 0, "height": 0 }, "fast");
            $(".SplitBar", e.data.MenuPanel).children().css("display", "block");
            if (e.data.MenuPanel.is(":animated")) e.data.MenuPanel.stop();
            e.data.MenuPanel.animate({ "height": e.data.Menus.length * 42 }, "fast");
        });
        //鼠标移出的时候,延迟50ms,并记录下执行句柄可以后面将这个延迟取消
        this.Target.bind("onMouseleave", this, function (e) {
            e.data.timeout = setTimeout(function () {
                if (e.data.MenuPanel.is(":animated")) e.data.MenuPanel.stop();
                e.data.MenuPanel.animate({ "height": 0 }, "fast");
            }, 50);
        });
        this.Target.bind("onMousedown", this, function (e) {
            var a = 1;
        });
        //一级菜单点击事件,只有在一级菜单操作配置为"active"的时候才有效
        this.Target.bind("onMouseup", this, function (e) {
            if (e.data.OpState != "active") return;
            if (!ktw.IsNull(e.data.timeout)) clearTimeout(e.data.timeout);
            if (e.data.SubMenuPanel.is(":animated")) e.data.SubMenuPanel.stop();
            e.data.SubMenuPanel.animate({ "width": 0, "height": 0 }, "fast");
            $(".SplitBar", e.data.MenuPanel).children().css("display", "block");
            if (e.data.MenuPanel.is(":animated")) e.data.MenuPanel.stop();
            e.data.MenuPanel.animate({ "height": e.data.Menus.length * 42 }, "fast");
        });
    };
    $.fn.extend(ktw.NavMenu.prototype, {
        Layout: function () {
            var p = this.Target.offset();
            this.MenuPanel.css({ "height": "0px", "left": p.left + "px" });
            this.MenuPanel.css("width", this.Target.outerWidth() + "px");
            this.MenuPanel.css("top", (this.Target.outerHeight()) + "px")
        },
        ShowSubMenu: function (subMenus, p, parentIndex) {
            //显示三级菜单
            if (ktw.IsNull(subMenus) || $(subMenus).length == 0) {
                if (this.SubMenuPanel.is(":animated")) this.SubMenuPanel.stop();
                this.SubMenuPanel.animate({ "width": 0, "height": 0 }, "fast");
                return;
            }
            subMenus = $(subMenus);
            p.height = subMenus.length * 42 - 2;
            this.SubMenuPanel.css({
                "top": p.top + "px", "left": p.left + "px",
                "width": p.width + "px", "height": p.height + "px"
            });
            var subMenuPanel = $(".Content", this.SubMenuPanel);
            subMenuPanel.empty();
            subMenuPanel.css("height", p.height + "px");
            subMenuPanel.css("width", (p.width - 6) + "px");
            subMenuPanel.append($("<div class='Arrow'></div>"));
            for (var i = 0; i < subMenus.length; i++) {
                if (i > 0) subMenuPanel.append($("<div class='SplitBar'><div class='Left'></div><div class='Center'></div><div class='Right'></div></div>"));
                var item = $("<div ItemIndex='" + i + "' ParentIndex='" + parentIndex + "' class='Item'><span style='margin-left:20px'>" + subMenus[i].Title + "</span></div>");
                //将三级菜单携带的数据放入dom属性中保存
                item.prop("Tag", subMenus[i]);
                //三级菜单鼠标移入事件
                item.bind("mouseenter", this, function (e) {
                    var _item = $(this);
                    var arrow = $(".Arrow", $(".Content", e.data.SubMenuPanel));
                    if (_item.attr("ItemIndex") == "0") arrow.addClass("SelectArrow");
                    else arrow.removeClass("SelectArrow");
                    _item.addClass("SelectItem");
                    _item.prev().children().css("display", "none");
                    _item.next().children().css("display", "none");
                });
                //三级菜单鼠标移出事件
                item.bind("mouseleave", this, function (e) {
                    var _item = $(this);
                    _item.removeClass("SelectItem");
                    _item.prev().children().css("display", "block");
                    _item.next().children().css("display", "block");

                });
                //三级菜单鼠标点击事件
                item.bind("click", this, function (e) {
                    //这里触发NavMenu对象的onItemClick事件,也就是最顶层一级菜单的事件。
                    e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
                });
                subMenuPanel.append(item);
            }
            this.SubMenuPanel.css({ width: "0px", height: "0px" });
            if (this.SubMenuPanel.is(":animated")) this.SubMenuPanel.stop();
            this.SubMenuPanel.animate({ "width": p.width, "height": p.height }, "fast");
        }
    });
})(jQuery);

//NavPopup 2016-07-09 zzy
(function ($) {
    function filter(menus) {
        var ms = [];
        if (ktw.IsNull(menus)) return ms;
        menus = $(menus);
        for (var i = 0; i < menus.length; i++) {
            var m = null;
            if (ktw.IsNull(menus[i].IsVisible)) ms.push(m = menus[i]);
            else if (menus[i].IsVisible || menus[i].IsVisible == "true") ms.push(m = menus[i]);
            if (m == null || ktw.IsNull(m.Widgets) || $(m.Widgets).length == 0) continue;
            m.Widgets = Enumerable.From($(m.Widgets)).Where('s=>s.IsVisible.toString()=="true"').ToArray();
        }
        return ms;
    }
    ktw.NavPopup = function (opt) {
        function open(np) {
            if (!ktw.IsNull(np.timeout)) clearTimeout(np.timeout);
            if (np.PopupPanel.is(":animated")) np.PopupPanel.stop();
            if (np.VerticalAlign == "left") {
                np.PopupPanel.animate({ width: np.PopupWidth, height: np.PopupHeight }, "fast");
            }
            else if (np.VerticalAlign == "right") {
                var p = np.Target.offset();
                var l = p.left + np.Left + np.Target.outerWidth();
                np.PopupPanel.css("left", (l - np.PopupPanel.outerWidth()) + "px");
                np.PopupPanel.animate({ width: np.PopupWidth, height: np.PopupHeight, left: l - np.PopupWidth }, "fast");
            }
            else if (np.VerticalAlign == "center") {
                np.PopupPanel.css("width", np.PopupWidth + "px");
                np.PopupPanel.animate({ height: np.PopupHeight }, "fast");
            }
        }
        function close(np) {
            if (np.PopupPanel.is(":animated")) np.PopupPanel.stop();
            if (np.VerticalAlign == "left") np.PopupPanel.animate({ width: 0, height: 0 }, "fast");
            else if (np.VerticalAlign == "right") {
                var p = np.Target.offset();
                np.PopupPanel.animate({ width: 0, height: 0, left: p.left + np.Left + np.Target.outerWidth() }, "fast");
            }
            else if (np.VerticalAlign == "center") np.PopupPanel.animate({ height: 0 }, "fast");
        }
        if (ktw.IsNull(opt)) opt = { OpState: "hover", PopupWidth: 720, PopupHeight: 360 };
        $.extend(this, new ktw.NavButton(opt));
        var $this = this;
        this.Content = opt.Content;
        this.Left = ktw.IsNumber(opt.Left) ? opt.Left : 0;
        if (!ktw.IsNull(opt.VerticalAlign)) this.VerticalAlign = opt.VerticalAlign.toLowerCase();
        if (this.VerticalAlign != "right" || this.VerticalAlign != "center") this.VerticalAlign = "left";
        this.InitVerticalAlign = this.VerticalAlign;
        this.Menus = filter(opt.Menus);
        this.OpState = ktw.IsNull(opt.OpState) ? "hover" : opt.OpState;
        this.PopupWidth = ktw.IsNumber(opt.PopupWidth) ? opt.PopupWidth : parseInt(opt.PopupWidth);
        this.PopupHeight = ktw.IsNumber(opt.PopupHeight) ? opt.PopupHeight : parseInt(opt.PopupHeight);
        this.PopupPanel = $("<div class='NavPopup' style='width:0px;height:0px'></div>");
        this.PopupPanel.append($(this.Content));
        if (!ktw.IsNull(this.Menus) && this.Menus.length > 0) {
            if (this.Menus.length > 4) this.PopupWidth = 720;
            else this.PopupWidth = 180 * this.Menus.length;
            var defIconCls = "icon-Maintence";
            for (var i = 0; i < this.Menus.length; i++) {
                if (i < 4) {
                    var div = $("<div Column='" + i + "' style='position:absolute;top:0px;width:180px;'></div>");
                    var h = (!ktw.IsNull(this.Menus[i].Widgets) && !ktw.IsNull(this.Menus[i].Widgets.length))
                        ? (this.Menus[i].Widgets.length + 1) * 28 : 28;
                    div.css({ "left": (180 * i) + "px", "height": h + "px" });
                    var titleDiv = $("<div class='Item-Title'>" + this.Menus[i].Title + "</div>")
                    titleDiv.prop("Tag", this.Menus[i]);
                    if (this.Menus[i].Url) {
                        titleDiv.addClass("Item-Active");
                        titleDiv.bind("click", this, function (e) {
                            e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
                        });
                    }
                    var item = $("<div style='width:100%;'></div>").append(titleDiv);
                    for (var j = 0; j < this.Menus[i].Widgets.length; j++) {
                        var iconCls = this.Menus[i].Widgets[j].IconCls ? this.Menus[i].Widgets[j].IconCls : defIconCls;
                        iconCls = this.Menus[i].Widgets[j].Icon ? ktw.InsertIconRule(ktw.App.TempStyle, ".icon" + this.Menus[i].Widgets[j].ID, this.Menus[i].Widgets[j].Icon) : iconCls;
                        var subItem = $("<a class='Item'><div class='" + iconCls + " Icon'></div>" + this.Menus[i].Widgets[j].Title + "</a>");
                        subItem.prop("Tag", this.Menus[i].Widgets[j]);
                        subItem.bind("click", this, function (e) {
                            e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
                        });
                        item.append(subItem);
                    }
                    div.append(item);
                    this.PopupPanel.append(div);
                }
                else {
                    var ds = $("[Column]", this.PopupPanel);
                    var div = null, h = 0;
                    for (var j = 0; j < ds.length; j++) {
                        var _d = $(ds[j]);
                        if (j == 0 || parseInt(_d.css("height")) < h) {
                            div = _d, h = parseInt(_d.css("height"));
                        }
                    }
                    if (div != null) {
                        var h = (!ktw.IsNull(this.Menus[i].Widgets) && !ktw.IsNull(this.Menus[i].Widgets.length))
                        ? (this.Menus[i].Widgets.length + 1) * 28 : 28;
                        div.css("height", (div.height() + h + 14) + "px");
                        div.append($("<div class='SplitBar'><div class='Left'></div><div class='Center'></div><div class='Right'></div></div>"));
                        var titleDiv = $("<div class='Item-Title'>" + this.Menus[i].Title + "</div>")
                        titleDiv.prop("Tag", this.Menus[i]);
                        if (this.Menus[i].Url) {
                            titleDiv.addClass("Item-Active");
                            titleDiv.bind("click", this, function (e) {
                                e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
                            });
                        }
                        var item = $("<div style='width:100%;'></div>").append(titleDiv);
                        for (var j = 0; j < this.Menus[i].Widgets.length; j++) {
                            var iconCls = this.Menus[i].Widgets[j].IconCls ? this.Menus[i].Widgets[j].IconCls : defIconCls;
                            iconCls = this.Menus[i].Widgets[j].Icon ? ktw.InsertIconRule(ktw.App.TempStyle, ".icon" + this.Menus[i].Widgets[j].ID, this.Menus[i].Widgets[j].Icon) : iconCls;
                            var subItem = $("<a class='Item'><div class='" + iconCls + " Icon'></div>" + this.Menus[i].Widgets[j].Title + "</a>");
                            subItem.prop("Tag", this.Menus[i].Widgets[j]);
                            subItem.append(subItem);
                            subItem.bind("click", this, function (e) {
                                e.data.Target.trigger("onItemClick", $(this).prop("Tag"));
                            });
                            item.append(subItem);
                        }
                        div.append(item);
                    }
                }
            }
            var ds = $("[Column]", this.PopupPanel);
            var ph = 0;
            for (var i = 0; i < ds.length; i++) {
                if (i == 0 || $(ds[i]).height() > ph) ph = $(ds[i]).height();
            }
            this.PopupPanel.css("height", (this.PopupHeight = (ph + 6)) + "px");
        }
        this.PopupPanel.appendTo(document.body);
        this.PopupPanel.bind("mouseenter", this, function (e) {
            clearTimeout(e.data.timeout);
            e.data.SetBackgroundColor("#008dbf");
        });
        this.PopupPanel.bind("mouseleave", this, function (e) {
            e.data.timeout = setTimeout(function () {
                e.data.SetBackgroundColor("");
                close(e.data);
            }, 50);
        });
        this.Target.bind("onMouseenter", this, function (e) {
            if (e.data.OpState == "hover") open(e.data);
        });
        this.Target.bind("onMouseleave", this, function (e) {
            e.data.timeout = setTimeout(function () { close(e.data); }, 50);
        });
        this.Target.bind("onMousedown", this, function (e) {

        });
        this.Target.bind("onMouseup", this, function (e) {
            if (e.data.OpState == "active") open(e.data);
        });
    };
    $.fn.extend(ktw.NavPopup.prototype, {
        Layout: function () {
            this.VerticalAlign = this.InitVerticalAlign;
            var p = this.Target.offset();
            this.PopupPanel.css("top", (this.Target.outerHeight() + p.top) + "px");
            if (this.VerticalAlign == "left") {
                if (p.left + this.Left + this.PopupWidth > $(window).width()) {
                    if (p.left + this.Left + this.Target.outerWidth() < this.PopupWidth) {
                        this.VerticalAlign = "center";
                        this.PopupPanel.css("left", (p.left + this.Left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
                    }
                    else {
                        this.VerticalAlign = "right";
                        this.PopupPanel.css("left", (p.left + this.Left + this.Target.outerWidth() - this.PopupWidth) + "px");
                    }
                }
                else this.PopupPanel.css("left", (p.left + this.Left) + "px");
            }
            if (this.VerticalAlign == "right") {
                if (p.left + this.Left + this.Target.outerWidth() < this.PopupWidth) {
                    if (p.left + this.Left + this.PopupWidth > $(window).width()) {
                        this.VerticalAlign = "center";
                        this.PopupPanel.css("left", (p.left + this.Left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
                    }
                    else {
                        this.VerticalAlign = "left";
                        this.PopupPanel.css("left", (p.left + this.Left) + "px");
                    }
                }
                else this.PopupPanel.css("left", (p.left + this.Left + this.Target.outerWidth() - this.PopupWidth) + "px");
            }
            if (this.VerticalAlign == "center")
                this.PopupPanel.css("left", (p.left + this.Left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
        },
        SetContent: function (el) {
            this.Content = el;
            this.PopupPanel.empty();
            this.PopupPanel.append($(this.Content));
        }
    });
})(jQuery);
//NavTip 2016-07-09 zzy
(function ($) {
    function open(np) {
        if (!ktw.IsNull(np.timeout)) clearTimeout(np.timeout);
        if (np.PopupPanel.is(":animated")) np.PopupPanel.stop();
        np.PopupPanel.animate({ height: np.PopupHeight }, "fast");
    }
    function close(np) {
        if (np.PopupPanel.is(":animated")) np.PopupPanel.stop();
        np.PopupPanel.animate({ height: 0 }, "fast");
    }
    ktw.NavTip = function (opt) {
        if (ktw.IsNull(opt)) opt = { OpState: "hover", PopupWidth: 720, PopupHeight: 360 };
        $.extend(this, new ktw.NavButton(opt));
        var $this = this;
        this.Content = opt.Content;
        this.OpState = ktw.IsNull(opt.OpState) ? "hover" : opt.OpState;
        this.PopupWidth = ktw.IsNumber(opt.PopupWidth) ? opt.PopupWidth : parseInt(opt.PopupWidth);
        this.PopupHeight = ktw.IsNumber(opt.PopupHeight) ? opt.PopupHeight : parseInt(opt.PopupHeight);
        this.PopupPanel = $("<div class='NavTip' style='width:" + this.PopupWidth + "px;height:0px'></div>");
        this.PopupPanel.append($("<div class='Arrow'></div>"));
        this.ContentPanel = $("<div class='Content'></div>");
        this.ContentPanel.css("width", (this.PopupWidth - 2) + "px");
        this.ContentPanel.css("height", (this.PopupHeight - 7) + "px");
        this.ContentPanel.append($(this.Content));
        this.PopupPanel.append($(this.ContentPanel));
        this.PopupPanel.appendTo(document.body);
        this.PopupPanel.bind("mouseenter", this, function (e) {
            clearTimeout(e.data.timeout);
            e.data.SetBackgroundColor("#008dbf");
        });
        this.PopupPanel.bind("mouseleave", this, function (e) {
            e.data.timeout = setTimeout(function () {
                e.data.SetBackgroundColor("");
                close(e.data);
            }, 50);
        });
        this.Target.bind("onMouseenter", this, function (e) {
            if (e.data.OpState == "hover") open(e.data);
        });
        this.Target.bind("onMouseleave", this, function (e) {
            e.data.timeout = setTimeout(function () { close(e.data); }, 50);
        });
        this.Target.bind("onMousedown", this, function (e) {

        });
        this.Target.bind("onMouseup", this, function (e) {
            if (e.data.OpState == "active") open(e.data);
        });
    };
    $.fn.extend(ktw.NavTip.prototype, {
        Layout: function () {
            var p = this.Target.offset();
            this.PopupPanel.css("top", (this.Target.outerHeight() + p.top - 5) + "px");
            this.PopupPanel.css("left", (p.left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
        },
        SetContent: function (el) {
            this.Content = el;
            this.ContentPanel.empty();
            this.ContentPanel.append($(this.Content));
        },
        Open: function () {
            open(this);
        },
        Close: function () {
            this.SetBackgroundColor("");
            close(this);
        }
    });
})(jQuery);
//NavBox 2017-02-13 zzy
(function ($) {
    ktw.NavBox = function (opt) {
        function open(np) {
            if (!ktw.IsNull(np.timeout)) clearTimeout(np.timeout);
            if (np.PopupPanel.is(":animated")) np.PopupPanel.stop();
            if (np.VerticalAlign == "left") {
                np.PopupPanel.animate({ width: np.PopupWidth, height: np.PopupHeight }, "fast");
            }
            else if (np.VerticalAlign == "right") {
                var p = np.Target.offset();
                var l = p.left + np.Left + np.Target.outerWidth();
                np.PopupPanel.css("left", (l - np.PopupPanel.outerWidth()) + "px");
                np.PopupPanel.animate({ width: np.PopupWidth, height: np.PopupHeight, left: l - np.PopupWidth }, "fast");
            }
            else if (np.VerticalAlign == "center") {
                np.PopupPanel.css("width", np.PopupWidth + "px");
                np.PopupPanel.animate({ height: np.PopupHeight }, "fast");
            }
        }
        function close(np) {
            if (np.PopupPanel.is(":animated")) np.PopupPanel.stop();
            if (np.VerticalAlign == "left") np.PopupPanel.animate({ width: 0, height: 0 }, "fast");
            else if (np.VerticalAlign == "right") {
                var p = np.Target.offset();
                np.PopupPanel.animate({ width: 0, height: 0, left: p.left + np.Left + np.Target.outerWidth() }, "fast");
            }
            else if (np.VerticalAlign == "center") np.PopupPanel.animate({ height: 0 }, "fast");
        }
        if (ktw.IsNull(opt)) opt = { OpState: "hover", PopupWidth: 300, PopupHeight: 240 };
        $.extend(this, new ktw.NavButton(opt));
        var $this = this;
        this.Content = opt.Content, this.Fixed = false;
        this.Left = ktw.IsNumber(opt.Left) ? opt.Left : 0;
        if (!ktw.IsNull(opt.VerticalAlign)) this.VerticalAlign = opt.VerticalAlign.toLowerCase();
        if (this.VerticalAlign != "right" || this.VerticalAlign != "center") this.VerticalAlign = "left";
        this.InitVerticalAlign = this.VerticalAlign;
        this.OpState = ktw.IsNull(opt.OpState) ? "hover" : opt.OpState;
        this.PopupWidth = ktw.IsNumber(opt.PopupWidth) ? opt.PopupWidth : parseInt(opt.PopupWidth);
        this.PopupHeight = ktw.IsNumber(opt.PopupHeight) ? opt.PopupHeight : parseInt(opt.PopupHeight);
        this.PopupPanel = $("<div class='NavPopup' style='width:0px;height:0px'></div>");
        this.Shot = $("<div class='Shot icon-h-shot'></div>").appendTo(this.PopupPanel);
        this.Shot.bind("click", function () { $this.SetFixed(!$this.Fixed); });
        this.PopupPanel.append($(this.Content));
        this.PopupPanel.appendTo(document.body);
        this.PopupPanel.bind("mouseenter", this, function (e) {
            if ($this.Fixed) return;
            clearTimeout(e.data.timeout);
            e.data.SetBackgroundColor("#008dbf");
        });
        this.PopupPanel.bind("mouseleave", this, function (e) {
            if ($this.Fixed) return;
            e.data.timeout = setTimeout(function () {
                e.data.SetBackgroundColor("");
                close(e.data);
            }, 50);
        });
        this.Target.bind("onMouseenter", this, function (e) {
            if ($this.Fixed) return;
            if (e.data.OpState == "hover") open(e.data);
        });
        this.Target.bind("onMouseleave", this, function (e) {
            if ($this.Fixed) {
                e.data.SetBackgroundColor("#008dbf");
                return;
            }
            e.data.timeout = setTimeout(function () {
                close(e.data);
            }, 50);
        });
        this.Target.bind("onMousedown", this, function (e) {

        });
        this.Target.bind("onMouseup", this, function (e) {
            if ($this.Fixed) return;
            if (e.data.OpState == "active") open(e.data);
        });
    };
    $.fn.extend(ktw.NavBox.prototype, {
        Layout: function () {
            this.VerticalAlign = this.InitVerticalAlign;
            var p = this.Target.offset();
            this.PopupPanel.css("top", (this.Target.outerHeight() + p.top) + "px");
            if (this.VerticalAlign == "left") {
                if (p.left + this.Left + this.PopupWidth > $(window).width()) {
                    if (p.left + this.Left + this.Target.outerWidth() < this.PopupWidth) {
                        this.VerticalAlign = "center";
                        this.PopupPanel.css("left", (p.left + this.Left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
                    }
                    else {
                        this.VerticalAlign = "right";
                        this.PopupPanel.css("left", (p.left + this.Left + this.Target.outerWidth() - this.PopupWidth) + "px");
                    }
                }
                else this.PopupPanel.css("left", (p.left + this.Left) + "px");
            }
            if (this.VerticalAlign == "right") {
                if (p.left + this.Left + this.Target.outerWidth() < this.PopupWidth) {
                    if (p.left + this.Left + this.PopupWidth > $(window).width()) {
                        this.VerticalAlign = "center";
                        this.PopupPanel.css("left", (p.left + this.Left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
                    }
                    else {
                        this.VerticalAlign = "left";
                        this.PopupPanel.css("left", (p.left + this.Left) + "px");
                    }
                }
                else this.PopupPanel.css("left", (p.left + this.Left + this.Target.outerWidth() - this.PopupWidth) + "px");
            }
            if (this.VerticalAlign == "center")
                this.PopupPanel.css("left", (p.left + this.Left - (this.PopupWidth - this.Target.outerWidth()) / 2) + "px");
        },
        SetContent: function (el) {
            var c = $(this.Content);
            c.remove();
            this.PopupPanel.append(this.Content = el);
        },
        Clear: function () {
            this.PopupPanel.empty();
            this.Content = null;
            this.Target.triggerHandler("onClosing");
        },
        SetPopupWidth: function (width) {
            if (!ktw.IsNumber(width)) return;
            this.PopupWidth = width;
            this.PopupPanel.css("width", width + "px");
            this.Layout();
        },
        SetFixed: function (fixed) {
            if (this.Fixed == fixed) return;
            this.Fixed = fixed;
            this.Shot.removeClass(fixed ? "icon-h-shot" : "icon-v-shot");
            this.Shot.addClass(fixed ? "icon-v-shot" : "icon-h-shot");
        },
        ClosePopup: function () {
            this.SetBackgroundColor("");
            this.PopupPanel.css({ width: 0, height: 0 });
        }
    });
})(jQuery);
//NavSideMenu 2017-6-20 hqj
(function ($) {
    /**
     * 过滤二级、三级菜单,将不可见的菜单删除掉
     * @param menus
     * @returns {Array}
     */
    function filter(menus) {
        var ms = [];
        if (ktw.IsNull(menus)) return ms;
        menus = $(menus);
        for (var i = 0; i < menus.length; i++) {
            var m = null;
            if (ktw.IsNull(menus[i].IsVisible)) ms.push(m = menus[i]);
            else if (menus[i].IsVisible == "true") ms.push(m = menus[i]);
            if (m == null || ktw.IsNull(m.Widgets) || $(m.Widgets).length == 0) continue;
            m.Widgets = Enumerable.From($(m.Widgets)).Where('s=>s.IsVisible.toString()=="true"').ToArray();
        }
        return ms;
    }

    /*选中左边一级菜单*/
    function showSide(id) {
        $(".nav-left-side>.side-item").removeClass("left-side-active");
        var sideitem = $("#" + id);
        sideitem.addClass("left-side-active");
        var tmp;
        if ((tmp = $("div[side-id='" + id + "']")).is(":hidden")) {
            $(".nav-left-menu>.nav-left-menu-item").hide();
            $(".nav-left-menu>.nav-left-menu-top>.menu-top-content").text($("#" + id).attr("title"));
            tmp.show();
        }
        var s = sideitem.prop("tag");
        if (ktw.IsNull(s) || ktw.IsNull(s.DockStyle) || ktw.IsNull(s.Url)) return;

        ktw.App.MenuInit.WidgetLoad(sideitem.prop("tag"), sideitem);
    }

    /*选中左边二级菜单*/
    function showMenu(id) {
        $(".nav-left-menu>.nav-left-menu-item").removeClass("left-menu-active");
        var leftmenuitem = $("#" + id);
        leftmenuitem.addClass("left-menu-active");
        ktw.App.MenuInit.WidgetLoad(leftmenuitem.prop("tag"), leftmenuitem);
    }

    ktw.NavSideMenu = function (opt) {
        if (ktw.IsNull(opt)) opt = { OpState: "hover", Menus: [] };
        $.extend(this, new ktw.NavButton(opt));
        var $this = this;
        $this.Target.hide();
        $this.Menus = filter(opt.Menus);
        $this.OpState = ktw.IsNull(opt.OpState) ? "hover" : opt.OpState;
        //添加固定导航图标到body中
        var fixside = $("<div class='side-fix'><div class='side-top'><div></div></div></div>").appendTo(document.body);
        //注册固定导航图标点击事件
        fixside.click(function () {
            ktw.App.LeftPanel.SetWidth(50);
            $(".nav-left-side").animate({
                width: "50px"
            });
            $(".side-fix").hide();
            $("#total-layertree").css("top", "5px");
        });
        //创建一级菜单容器并且直接添加到LeftPanel中
        $this.SidePanel = $("<div class='nav-left-side'><div class='side-top'><div></div></div></div>").appendTo(ktw.App.LeftPanel.Target);

        //盛放二级创建的二级菜单容器
        $this.LeftMenuPanels = {};

        //循环创建一级和二级菜单
        for (var i = 0; i < $this.Menus.length; i++) {
            $this.Menus[i].ID = $this.Menus[i].ID || "side-item-" + new Date().getTime();
            //创建一级菜单项,以及子菜单的容器
            var sideitem = $("<div class='side-item' id='" + $this.Menus[i].ID + "' title='" + $this.Menus[i].Title + "'><div class='side-icon'></div></div>").html($this.Menus[i].Abbr).appendTo($this.SidePanel);
            //一级菜单添加背景图片
            if ($this.Menus[i].Icon) {
                sideitem.find(".side-icon").css({
                    "background-image": 'url("' + ktw.App.Root + $this.Menus[i].Icon + '")',
                    "background-repeat": "no-repeat",
                    "height": "34px",
                    "position": "relative",
                    "top": "9px",
                    "left": "2px"
                });
            } else if ($this.Menus[i].IconCls) {
                sideitem.find(".side-icon").addClass($this.Menus[i].IconCls);
            }
            //将一级菜单的配置信息放到tag属性里面保存
            sideitem.prop("tag", $this.Menus[i]);
            var containerID = $this.Menus[i].ID + "-" + i;
            //如果有二级菜单就创建二级菜单面板
            if ($this.Menus[i].Widgets && $this.Menus[i].Widgets.length > 0) {
                $this.LeftMenuPanels[$this.Menus[i].ID] = $("<div class='nav-left-menu'><div class='nav-left-menu-top'><div class='menu-top-content'></div><div class='icon'></div></div></div>").appendTo($(document.body)).hide();
                //将二级菜单容器放入二级菜单面板中
                var item = $("<div class='nav-left-menu-item' id='" + containerID + "' side-id='" + $this.Menus[i].ID + "'><ul></ul></div>").appendTo($this.LeftMenuPanels[$this.Menus[i].ID]).children();

                //创建二级菜单
                for (var j = 0; j < $this.Menus[i].Widgets.length; j++) {
                    $this.Menus[i].Widgets[j].ID = $this.Menus[i].Widgets[j].ID || "nav-left-menu-item-" + new Date().getTime();
                    var leftmenuitem = $("<li nav-ulr='" + $this.Menus[i].Widgets[j].Url + "' id='" + $this.Menus[i].Widgets[j].ID + "'><div class='item-icon'></div><div class='item-text'>" + $this.Menus[i].Widgets[j].Title + "</div></li>").appendTo(item);
                    //二级菜单添加图片
                    if ($this.Menus[i].Widgets[j].Icon) {
                        leftmenuitem.find(".item-icon").css({
                            "background-image": 'url("' + ktw.App.Root + $this.Menus[i].Widgets[j].Icon + '")',
                            "background-repeat": "no-repeat"
                        });
                    } else if ($this.Menus[i].Widgets[j].IconCls) {
                        leftmenuitem.find(".item-icon").addClass($this.Menus[i].Widgets[j].IconCls);
                    }
                    leftmenuitem.prop("tag", $this.Menus[i].Widgets[j]);
                }
            }
        }

        var _timeout, _timeout2;
        /*一级菜单项点击事件、悬浮事件*/
        $this.SidePanel.find(".side-item").click(function () {
            showSide($(this).attr("id"));
        }).hover(function () {
            var id = $(this).attr("id");
            for (var i in $this.LeftMenuPanels) {
                $this.LeftMenuPanels[i].hide();
            }
            if ($this.LeftMenuPanels[id]) {
                $this.LeftMenuPanels[id].show();

                if ($("div[side-id='" + id + "']").is(":hidden")) {
                    $(".nav-left-menu>.nav-left-menu-item").hide();
                    $(".nav-left-menu>.nav-left-menu-top>.menu-top-content").text($(this).attr("title"));
                    $this.LeftMenuPanels[id].show();
                    $("div[side-id='" + id + "']").show();
                }
            }
        }, function () {
            var id = $(this).attr("id");
            for (var i in $this.LeftMenuPanels) {
                $this.LeftMenuPanels[i].hide();
            }
            if ($this.LeftMenuPanels[id]) {
                $this.LeftMenuPanels[id].hide();
            }
        });

        /*二级菜单点击事件*/
        $(".nav-left-menu-item>ul>li").click(function () {
            var url = $(this).attr("nav-ulr");
            $(".nav-left-menu-item>ul>li").removeClass("left-menu-active");
            $(this).addClass("left-menu-active");
            var item = $(this).parent().parent();
            _side_id = item.attr("side-id");
            if (!$("#" + _side_id).is(".left-side-active")) {
                $(".nav-left-side>.side-item").removeClass("left-side-active");
                $("#" + _side_id).addClass("left-side-active");
            }
            $(this).parents(".nav-left-menu").hide();
            showMenu($(this).attr("id"));
        });
        /*二级菜单面板鼠标滑动事件*/
        $(".nav-left-menu").hover(function () {
            $(this).show();

        }, function () {
            $(this).hide();
        });
        /*侧边栏顶部icon点击事件*/
        //$(".nav-left-side>.side-top").click(function () {
        //    $(this).parent().animate({
        //        "width": 0
        //    }, "fast", function () {
        //        ktw.App.LeftPanel.SetWidth(0);
        //        $("#total-layertree").css("top", "50px");
        //        $(".side-fix").show();
        //    });
        //});
    };
})(jQuery);
//MenuInit 2016-07-10 zzy
(function ($) {
    //根据权限去过滤菜单
    function FilterMenus(SubSystems) {

        for (var i = SubSystems.length - 1; i >= 0; i--) {
            //过滤子系统
            if (!ContainsID(SubSystems[i].ID)) {
                SubSystems.splice(i, 1);
                continue;
            }
            if (!SubSystems[i].Menus) continue;
            //过滤menu
            for (var j = SubSystems[i].Menus.length - 1; j >= 0; j--) {
                if (!ContainsID(SubSystems[i].Menus[j].ID)) {
                    SubSystems[i].Menus.splice(j, 1);
                    continue;
                }
                if (!SubSystems[i].Menus[j].Widgets) continue;
                for (var k = SubSystems[i].Menus[j].Widgets.length - 1; k >= 0; k--) {
                    if (!ContainsID(SubSystems[i].Menus[j].Widgets[k].ID)) {
                        SubSystems[i].Menus[j].Widgets.splice(k, 1);
                        continue;
                    }
                }
            }
        }
    }
    function ContainsID(id) {
        if (!ktw.cookie.perms) return false;
        for (var i = 0; i < ktw.cookie.perms.length; i++) {
            if (ktw.cookie.perms[i].appid == id) {
                return true;
            }
        }
        return false;
    }
    function GetIconCls(iconCls, icon) {
        var ic = iconCls;
        if (!ktw.IsString(ic) && ktw.IsString(icon)) {
            var e = icon.lastIndexOf('.');
            if (e > 0) {
                var s = icon.lastIndexOf('/');
                if (s < 0) s = 0;
                if (e - s > 0) {
                    ic = "maptool_" + icon.substring(s + 1, e);
                    ktw.InsertRule(ktw.App.TempStyle, "." + ic,
                        "background: url('" + icon + "') no-repeat center center;");
                }
            }
        }
        return ic;
    };
    function GetMenu(id, items) {
        var menu = $('<div class="easyui-menu" id="' + id + '"></div>');
        var list = ktw.GroupBy(items, "Group", "Order");
        $(list).each(function (j, n) {
            $(n.Items).each(function (i, m) {
                var ic = GetIconCls(m.IconCls, m.Icon);
                var item = $("<div id=\"" + m.Name + "\" data-options="
                    + "\"iconCls:'" + ic + "'\">" + m.Title + "</div>");
                item.appendTo(menu);
            });
            $("<div class='menu-sep'></div>").appendTo(menu);
        });
        $(":last", menu).remove();
        return menu;
    };
    function Menu_Simple(subSystems, target) {
        var subs = $.grep($(subSystems), function (n, i) { return n.IsVisible === "true"; });
        var f = ktw.IsNull(target.SystemTheme.Align) || target.SystemTheme.Align.toLowerCase() != "right";
        subs = ktw.OrderBy(subs, "Order", f ? ktw.OrderWay.ASC : ktw.OrderWay.DESC, true);
        for (var i = 0; i < subs.length; i++) {
            var TrigonVisible = subs[i].TrigonVisible == "true";
            var iconCls = subs[i].IconCls;
            if (ktw.IsNull(iconCls)) iconCls = ktw.InsertIconRule(ktw.App.TempStyle, ".Icon" + subs[i].ID, subs[i].Icon)
            var navBtn = null;
            if (subs[i].Type === "Popup") {
                navBtn = new ktw.NavPopup({
                    ID: subs[i].ID, IconCls: iconCls, Text: subs[i].Title, Left: -1,
                    TrigonVisible: TrigonVisible, VerticalAlign: "left", Menus: subs[i].Menus
                });
            }
            else if (subs[i].Type === "Tip") {
                navBtn = new ktw.NavTip({
                    ID: subs[i].ID, IconCls: iconCls, Text: subs[i].Title,
                    PopupWidth: 300, PopupHeight: 240,
                    Content: "<div style='height:100%;width:100%;background-color:#FFFFFF'><div style='height:32px;width:100%;background-color:#00779f'></div></div>"
                });
            }
            else if (subs[i].Type === "Menu") {
                //如果是这个1级菜单是"Menu"类型的,就实例化NavMenu对象
                navBtn = new ktw.NavMenu({
                    ID: subs[i].ID, IconCls: iconCls, Text: subs[i].Title,
                    TrigonVisible: TrigonVisible, Menus: subs[i].Menus, Tag: subs[i]
                });
            }
            else if (subs[i].Type === "SideMenu") {
                //如果是这个1级菜单是"SideMenu"类型的,就实例化NavSideMenu对象
                navBtn = new ktw.NavSideMenu({
                    ID: subs[i].ID, IconCls: iconCls, Text: subs[i].Title,
                    TrigonVisible: false, Menus: subs[i].Menus, Tag: subs[i]
                });
            }
            else if (subs[i].Type === "Box") {
                navBtn = new ktw.NavBox({
                    ID: subs[i].ID,
                    IconCls: iconCls,
                    Text: subs[i].Title,
                    Tag: subs[i],
                    PopupWidth: subs[i].BoxSize.Width || subs[i].Size.Width,
                    PopupHeight: subs[i].BoxSize.Height || subs[i].Size.Height
                });
            }
            else {
                navBtn = new ktw.NavButton({
                    ID: subs[i].ID,
                    IconCls: iconCls,
                    Text: subs[i].Title,
                    TrigonVisible: TrigonVisible,
                    Tag: subs[i]
                });
            }
            if (navBtn != null) {
                //将初始化后的所有以及菜单对象放到ktw.MenuInit.NavButtons属性中
                //这里给所有的菜单绑定了点击事件,事件冒泡???
                target.NavButtons.push(navBtn);
                ktw.App.TopPanel.CenterBox.append(navBtn.Target);
                navBtn.Target.bind("onItemClick", function (e, s) {
                    //给菜单绑定"onItemClick"事件
                    ktw.App.ClearPreWidget(); // add by wlf at 2017-9-6 09:26:09
                    if (ktw.IsNull(s) || ktw.IsNull(s.DockStyle) || ktw.IsNull(s.Url)) return;
                    target.WidgetLoad(s, this);
                });
                if (target.SystemTheme.Align) navBtn.Target.css("float", target.SystemTheme.Align);
                if (subs[i].Type === "Box" && !ktw.IsNull(subs[i].BoxUrl) && subs[i].IsBoxLoad === "true")
                    target.SetContent(subs[i].BoxUrl, subs[i].ID);
            }
        }
    };
    function GetParent(item) {
        return (function (item) {
            switch (item.DockParent.toLocaleLowerCase()) {
                case "full":
                    return $(document.body);
                case "main":
                    return ktw.App.MainPanel;
                case "fill":
                    return ktw.App.FillPanel;
                case "center":
                    return ktw.App.CenterPanel;
                case "map":
                    return ktw.App.MapPanel;
                default:
                    return ktw.App.MainPanel;
            }
        })(item);
    };
    ktw.MenuInit = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.Target = $(this);
        this.SystemTheme = opt.SystemTheme;
        this.NavButtons = [];//存放初始化后的一级菜单,即后台配置的SubSystems项
    };
    $.fn.extend(ktw.MenuInit.prototype, {
        Init: function () {
            //首先根据权限去过滤菜单
            //FilterMenus(this.SystemTheme.SubSystems);
            Menu_Simple(this.SystemTheme.SubSystems, this);
        },
        Layout: function () {
            for (var i = 0; i < this.NavButtons.length; i++) {
                if (this.NavButtons[i].Layout === undefined) continue;
                this.NavButtons[i].Layout();
            }
        },
        WidgetLoad: function (item, menuButton) {
            if (!ktw.App.IsWidget) ktw.App.ClearPreWidget();
            this.IsWidget = true;
            var parent = null, content = item.Url, isTab = false;
            switch (item.DockStyle.toUpperCase()) {
                case ktw.WidgetLayout.Left:
                    if (!ktw.IsNull(item.Size.Width)) {
                        var w = parseInt(item.Size.Width);
                        if (!isNaN(w)) ktw.App.LeftPanel.SetWidth(w);
                    }
                    ktw.App.LeftPanel.SetMinimize(false);
                    if (ktw.App.LeftPanel.IsTab) {
                        isTab = true;
                        parent = ktw.App.LeftPanel.Tab;
                        content = {
                            ID: item.ID,
                            Name: item.Title,
                            IsDeleted: true,
                            IsSelected: true,
                            Url: item.Url,
                            Parameters: item.Parameters
                        };
                        ktw.App.WidgetClear = "RemoveID";
                        ktw.App.WidgetParam = item.ID;
                    }
                    else parent = ktw.App.LeftPanel;
                    break;
                case ktw.WidgetLayout.Right:
                    parent = ktw.App.RightPanel;
                    ktw.App.WidgetClear = "Clear";
                    ktw.App.WidgetParam = null;
                    break;
                case ktw.WidgetLayout.Bottom:
                    parent = ktw.App.BottomPanel;
                    ktw.App.WidgetClear = "Clear";
                    ktw.App.WidgetParam = null;
                    break;
                case ktw.WidgetLayout.Float:
                    parent = ktw.App.GetWindow(item.ID);
                    var container = ktw.IsNull(item.DockParent) ? $(document.body) : GetParent(item);
                    if (ktw.IsNull(parent) || parent.length == 0) {
                        parent = new ktw.Window({
                            ID: item.ID,
                            TriggerEl: menuButton,
                            Title: item.Title,
                            IconCls: item.IconCls,
                            Parent: container.Target,
                            IsMaximize: ktw.IsNull(item.IsMaximize) ? false : item.IsMaximize === "true",
                            Maximizable: ktw.IsNull(item.Maximizable) ? true : item.Maximizable === "true",
                            Minimizable: ktw.IsNull(item.Minimizable) ? true : item.Minimizable === "true",
                            Modal: ktw.IsNull(item.Modal) ? true : item.Modal === "true",
                            Draggable: ktw.IsNull(item.Draggable) ? true : item.Draggable === "true",
                            Left: parseFloat(item.Position.X),
                            Top: parseFloat(item.Position.Y),
                            HAlign: item.Position.HAlign,
                            VAlign: item.Position.VAlign,
                            Resizable: ktw.IsNull(item.Resizable) ? true : item.Resizable === "true",
                            IsDestroy: ktw.IsNull(item.IsDestroy) ? true : item.IsDestroy === "true",
                            Height: parseFloat(item.Size.Height),
                            Width: parseFloat(item.Size.Width),
                            Url: item.Url,
                            Parameters: item.Parameters,
                            Content: item.Content
                        });
                        parent.Target.one("onClosed", function (s, e) {
                            if (parent.IsDestroy) parent.Destroy();
                        });
                        ktw.App.WidgetClear = "Close";
                        ktw.App.WidgetParam = null;
                    }
                    break;
                case ktw.WidgetLayout.Fill:
                    parent = ktw.App.FillPanel;
                    ktw.App.WidgetClear = 'Clear';
                    ktw.App.WidgetParam = null;
                    break;
                    //ktw.App.TabPanel.SetVisible(false);ktw.App.RightPanel.SetVisible(false);ktw.App.BottomPanel.SetVisible(false);
                case ktw.WidgetLayout.FloatHTML:
                    if (ktw.IsNull(item.DockParent)) return;
                    var container = GetParent(item);
                    if (!ktw.IsNull(container.Target)) var childfloat = container.Target.find("iframe#" + item.ID);
                    else childfloat = container.find("iframe#" + item.ID);
                    //update by wlf at 2017-9-6 09:25:03
                    var x = item.Position.X.indexOf("%") < 0 ? item.Position.X + "px" : item.Position.X;
                    var y = item.Position.Y.indexOf("%") < 0 ? item.Position.Y + "px" : item.Position.Y;
                    var z = ktw.IsInt(item.Position.Z) ? item.Position.Z : 0;

                    var height = item.Size.Height.indexOf("%") < 0 ? item.Size.Height + "px" : item.Size.Height;
                    var width = item.Size.Width.indexOf("%") < 0 ? item.Size.Width + "px" : item.Size.Width;
                    var strStyle = "position:absolute;background-color:transparent;left:"
                                   + x + ";top:" + y + ";height:" + height + ";width:" + width + ";z-index:" + z + ";";
                    parent = {};
                    parent.Target = container.Target || container;
                    parent.WidgetLayout = ktw.WidgetLayout.FloatHTML;
                    parent.frame = ktw.CreateFrameBase(item.Url, false, item.ID, strStyle);
                    var waitbox = new ktw.UCWaitBox(parent.Target);
                    parent.frame.bind('load', {
                        frame: parent.frame[0],
                        parent: parent.frame,
                        parameters: item.Parameters
                    }, function (e) {
                        ktw.CallWidgetCommunication(e.data.frame, e.data.parent, e.data.parameters);
                        //e.data.parent.css("z-index", '4');
                        e.data.parent.triggerHandler("onLoaded");
                        waitbox.Close();
                    });
                    ktw.App.WidgetClear = 'remove';
                    ktw.App.WidgetParam = ktw.WidgetLayout.FloatHTML;
                    break;
            }
            ktw.App.WidgetParent = parent;
            var child = parent.Target.find("iframe#" + item.ID);
            if ((ktw.IsNull(child) || child.length === 0)) {
                item.ScrollVisible = ktw.IsNull(item.ScrollVisible) ? false : item.ScrollVisible.toString() === "true";
                this.Target.triggerHandler("onWidgetChanged");
                if (!ktw.IsNull(this.currentItem) && this.currentItem.ID !== item.ID) {//当前插件与前一个插件不是同一个
                    if (this.currentItem.DockStyle.toUpperCase() === ktw.WidgetLayout.Left && ktw.App.LeftPanel.IsTab) {
                        this.currentParent.RemoveID(this.currentItem.ID);
                        ktw.App.LeftPanel.SetVisible(false);//zzy?
                    }
                    else if (!ktw.IsNull(this.currentParent.Clear)) this.currentParent.Clear();
                    else if (!ktw.IsNull(this.currentParent.Close)) this.currentParent.Close();
                    else if (!ktw.IsNull(this.currentParent.WidgetLayout)) {
                        this.currentParent.frame.triggerHandler("onClosing");
                        this.currentParent.frame.remove();
                    }
                    if (!ktw.IsNull(this.currentParent.SetVisible) && this.currentParent !== parent) this.currentParent.SetVisible(false);
                }
                if (isTab) parent.Add(content, item.ScrollVisible, item.ID, item.Parameters);
                else if (parent.Add) parent.Add(content, item.Parameters, item.ID);
                else if (!ktw.IsNull(parent.WidgetLayout)) {
                    if (ktw.IsNull(childfloat) || childfloat.length === 0) {
                        waitbox.Show();
                        if (parent.Add) parent.Add(parent.frame);
                        else parent.Target.append(parent.frame);
                    }
                }
            }
            else if (isTab) parent.SelectID(item.ID);
            else if (!ktw.IsNull(parent.WidgetLayout) && !ktw.IsNull(childfloat) && childfloat.length > 0) return;
            if (!ktw.IsNull(parent.SetVisible)) parent.SetVisible(true);
            if (!ktw.IsNull(parent.SetMinimize)) parent.SetMinimize(false);
            if (!ktw.IsNull(parent.SetTitle)) parent.SetTitle(item.Title);
            if (item.DockStyle.toUpperCase() === ktw.WidgetLayout.Left && ktw.App.LeftPanel.IsTab) {
                ktw.App.LeftPanel.SetTitle(item.Title);
                ktw.App.LeftPanel.SetVisible(true);
                ktw.App.LeftPanel.SetMinimize(false);
            }
            this.currentItem = item;
            this.currentParent = parent;
        },
        CloseCurrentWidget: function () {
            if (!ktw.IsNull(this.currentItem)) {
                if (this.currentItem.DockStyle.toUpperCase() === ktw.WidgetLayout.Left && ktw.App.LeftPanel.IsTab) {
                    this.currentParent.RemoveID(this.currentItem.ID);
                    ktw.App.LeftPanel.SetVisible(false);//zzy?
                }
                else if (!ktw.IsNull(this.currentParent.Clear)) this.currentParent.Clear();
                else if (!ktw.IsNull(this.currentParent.Close)) this.currentParent.Close();
                if (!ktw.IsNull(this.currentParent.SetVisible) && this.currentParent !== parent) this.currentParent.SetVisible(false);
            }
            this.currentItem = null;
        },
        GetNavButton: function (id) {
            if (this.NavButtons.length <= 0) return;
            var currentButton;
            for (var i = 0; i < this.NavButtons.length; i++) {
                var button = this.NavButtons[i];
                if (button.ID === id) {
                    currentButton = button;
                    break;
                }
            }
            return currentButton;
        },
        SetContent: function (element, id, parameters) {
            if (ktw.IsNull(element) || ktw.IsNull(id)) return;
            var currentButton = this.GetNavButton(id);
            if (ktw.IsNull(currentButton) || ktw.IsNull(currentButton.SetContent)) return;
            if (ktw.IsString(element)) {
                var frame = ktw.CreateFrame(element, false);
                frame.bind('load', function () {
                    ktw.CallWidgetCommunication(frame[0], currentButton, parameters);
                    currentButton.Target.triggerHandler("onLoaded");
                });
                element = frame;
            }
            currentButton.SetContent(element);
        }
    });
})(jQuery);
//Box 2016-07-12 zzy
(function ($) {
    function getPadding(box) {
        var ctd = $(".CTD", box.Target);
        var p = {
            l: parseInt(ctd.css("padding-left")),
            t: parseInt(ctd.css("padding-top")),
            r: parseInt(ctd.css("padding-right")),
            b: parseInt(ctd.css("padding-bottom"))
        };
        p.w = p.l + p.r, p.h = p.t + p.b;
        return p;
    }
    function setScrollBar(box, vsv, hsv) {
        var p = getPadding(box), v = vsv == "visible", h = hsv == "visible";
        box.VerScrollVisibility = v, box.HorScrollVisibility = h;
        box.c.css("width", box.Target.width() - p.w - (v ? box.ScrollWidth : 0) + "px");
        $(".scrollVTD", box.Target).css("width", (v ? box.ScrollWidth + "px" : "0px"));
        box.c.css("height", box.Target.height() - p.h - (h ? box.ScrollWidth : 0) + "px");
        $(".scrollHTD", box.Target).css("height", (h ? "" : "0px"));
    }
    function scrollBarRefresh(box) {
        var w = box.Target.width(), h = box.Target.height(),
            pw = box.c.width(), ph = box.c.height(), p = getPadding(box),
            sw = box.el.outerWidth(), sh = box.el.outerHeight();
        if (box.VerScroll == "hidden" && box.HorScroll == "auto") {
            if (pw < sw) {
                setScrollBar(box, "hidden", "visible");
                _h();
            }
            else box.el.css({ "margin-left": 0 });
        }
        else if (box.VerScroll == "auto" && box.HorScroll == "auto") {
            if (pw < sw) {
                setScrollBar(box, "hidden", "visible");
                ph = box.c.height(), sh = box.el.outerHeight();
                if (ph < sh) _vh(); else {
                    box.el.css({ "margin-top": 0 });
                    _h();
                }
            }
            else if (ph < sh) {
                setScrollBar(box, "visible", "hidden");
                pw = box.c.width(), sw = box.el.outerWidth();
                if (pw < sw) _vh(); else {
                    box.el.css({ "margin-left": 0 });
                    _v();
                }
            }
            else {
                box.el.css({ "margin-left": 0, "margin-top": 0 });
            }
        }
        else {
            if (ph < sh) {
                setScrollBar(box, "visible", "hidden");
                _v();
            }
            else box.el.css({ "margin-top": 0 });
        }
        function _v() {
            sh = box.el.outerHeight();
            var sch = ph * (h - 16) / sh;
            box.svbtn.css("height", sch + "px");
            var top = parseFloat(box.el.css("margin-top"));
            if (sh + top < ph) top = ph - sh;
            box.el.css("margin-top", top + "px");
            top = top * (h - 16 - sch) / (ph - sh);
            if (top + sch + 16 > ph) top = ph - sch - 16;
            if (top < 0) top = 0;
            box.svbtn.css("top", top + "px");
        }
        function _h() {
            sw = box.el.outerWidth();
            var scw = pw * (w - 16) / sw;
            box.shbtn.css("width", scw + "px");
            var left = parseFloat(box.el.css("margin-left"));
            if (sw + left < pw) left = pw - sw;
            box.el.css("margin-left", left + "px");
            left = left * (w - 16 - scw) / (pw - sw);
            if (left + scw + 16 > pw) left = pw - scw - 16;
            if (left < 0) left = 0;
            box.shbtn.css("left", left + "px");
        }
        function _vh() {
            setScrollBar(box, "visible", "visible");
            pw -= box.ScrollWidth, ph -= box.ScrollWidth, _v(), _h();
        }
    }
    ktw.Box = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-box'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else {
            if (!opt.Target.hasClass("ktw-box")) opt.Target.addClass("ktw-box");
            if (!opt.Content) {
                var el = $(":first-child", opt.Target);
                if (el.length > 0) opt.Content = el[0];
                else opt.Content = opt.Target.html();
                opt.Target.html("");
            }
            if (!opt.Padding) {
                var p = ktw.GetPadding(opt.Target);
                opt.Padding = p.t + "px " + p.r + "px " + p.b + "px " + p.l + "px";
            }
            opt.Target.css("padding", "0px");
        }
        if (!ktw.IsNull(opt.Width)) opt.Target.width(opt.Width);
        if (!ktw.IsNull(opt.Height)) opt.Target.height(opt.Height);
        var w = opt.Target[0].style.width, h = opt.Target[0].style.height;
        if (!ktw.IsNull(w)) w = w.substring(w.length - 1);
        if (!ktw.IsNull(h)) h = h.substring(h.length - 1);
        if (w == "%" || h == "%") this.Stretched = true;
        if (ktw.IsBoolean(opt.Stretched)) this.Stretched = opt.Stretched;
        else if (opt.Stretched) this.Stretched = opt.Stretched === "true";
        $.extend(this, this.control = new ktw.Control(opt)), funExt(this), this.Target.prop("$this", this);
        this.HasBorder = ktw.IsBoolean(opt.HasBorder) ? opt.HasBorder : opt.HasBorder !== "false";
        this.ScrollWidth = ktw.IsNumber(opt.ScrollWidth) ? opt.ScrollWidth : 9;
        if (opt.HasBorder === false || opt.HasBorder === "false") this.Target.css("border", "0px");
        this.HorScroll = "hidden", this.VerScroll = "auto", this.Speed = 100;//鼠标滚动的速率（px）
        if (!ktw.IsNull(opt.HorScroll) && opt.HorScroll.toLowerCase() == "auto") this.HorScroll = "auto";
        if (!ktw.IsNull(opt.VerScroll) && opt.VerScroll.toLowerCase() == "hidden") this.VerScroll = "hidden";
        $("<table class='Table B'><tr class='B'><td class='CTD B'><div class='box-content'></div></td>" +
            "<td class='scrollVTD B'><a scrollEl='0' class='upArrow'></a><a scrollEl='1' class='downArrow'>" +
            "</a><div scrollEl='2' class='scrollVButton'></div></td></tr><tr class='B'><td class='scrollHTD B'>" +
            "<a scrollEl='3' class='leftArrow'></a><a scrollEl='4' class='rightArrow'></a><div scrollEl='5' " +
            "class='scrollHButton'></div></td><td class='placeTD B'></td></tr></table>").appendTo(this.Target);
        this.el = null, this.c = $(".box-content", this.Target);//内容盛放的容器
        if (!ktw.IsNull(opt.Content)) {
            this.el = $(opt.Content);
            if (this.el.length == 0) this.el = $("<div>" + opt.Content + "</div>");
            this.c.append(this.el);
            this.el.css("position", "absolute");
        }
        this.svbtn = $(".scrollVButton", this.Target);//垂直滚动按钮
        //  this.svbtn.css('width',this.sco"px");
        this.shbtn = $(".scrollHButton", this.Target);//水平滚动按钮
        if (opt.Padding) $(".CTD", this.Target).css("padding", opt.Padding);
        var isMouseDown = false, positionX = 0, positionY = 0, clientLeft = 0,
            clientTop = 0, scrollType = null, $this = this;
        this.Target.bind("mousewheel DOMMouseScroll", this, function (event, delta) {
            if (ktw.IsNull($this.el)) return;
            var ph = $this.c.height(), sh = $this.el.outerHeight();
            if (ph >= sh) return;
            var sch = $this.svbtn.height(), p = getPadding($this);
            var top = parseInt($this.el.css("margin-top"));
            var hit = event.originalEvent.wheelDelta / 120;
            if (isNaN(hit)) hit = -event.originalEvent.detail / 3;
            top = top + $this.Speed * hit;
            if (hit > 0 && top > 0) top = 0;
            else if (sh + top < ph) top = ph - sh;
            $this.el.css("margin-top", top + "px");
            top = top * (ph + p.h - 16 - sch) / (ph - sh);
            $this.svbtn.css("top", top + "px");
        });
        $(".scrollVButton,.scrollHButton", this.Target).bind("mousedown", function (e) {
            if ($(this).hasClass("scrollVButton")) {
                scrollType = "V", positionY = e.clientY, clientTop = parseFloat($(this).css("top"));
            } else {
                scrollType = "H", positionX = e.clientX, clientLeft = parseFloat($(this).css("left"));
            }
            $(this).addClass("scrollButton-Down");
            if (this.setCapture) {
                this.setCapture();
                this.onmouseup = mouseUp;
                this.onmousemove = function (ev) {
                    scrollBtnMouseMove(ev || event);
                };
            }
            else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                document.onmouseup = mouseUp;
                document.onmousemove = scrollBtnMouseMove;
            }
            $this.Target.addClass("user_unselect");
        });
        $(".downArrow,.upArrow,.leftArrow,.rightArrow", this.Target).bind("mousedown", function (e) {
            isMouseDown = true, currElement = this, scrollType = "H";
            if ($(this).hasClass("downArrow") || $(this).hasClass("upArrow")) scrollType = "V";
            if (currElement.setCapture) {
                currElement.setCapture();
                currElement.onmouseup = mouseUp;
            }
            else {
                window.captureEvents(Event.MOUSEUP);
                document.onmouseup = mouseUp;
            }
            setTimeout(_scroll), $this.Target.addClass("user_unselect");
        });
        function _scroll() {
            if (!isMouseDown) return;
            var ph = $this.c.height(), pw = $this.c.width(), sh = $this.el.outerHeight(), sw = $this.el.outerWidth(),
                sch = $this.svbtn.height(), scw = $this.shbtn.width(), top = parseInt($this.el.css("margin-top")),
                left = parseInt($this.el.css("margin-left")), p = getPadding($this);
            top = parseFloat($this.el.css("margin-top")), left = parseFloat($this.el.css("margin-left"));
            if ($(currElement).hasClass("upArrow")) {
                top += 10;
                if (top > 0) {
                    top = 0;
                    isMouseDown = false;
                }
            }
            else if ($(currElement).hasClass("downArrow")) {
                top -= 10;
                if (sh + top < ph) {
                    top = ph - sh;
                    isMouseDown = false;
                }
            }
            else if ($(currElement).hasClass("leftArrow")) {
                left += 10;
                if (left > 0) {
                    left = 0;
                    isMouseDown = false;
                }
            }
            else if ($(currElement).hasClass("rightArrow")) {
                left -= 10;
                if (sw + left < pw) {
                    left = pw - sw;
                    isMouseDown = false;
                }
            }
            if ($(currElement).hasClass("upArrow") || $(currElement).hasClass("downArrow")) {
                $this.el.css("margin-top", top + "px");
                top = top * (ph + p.h - 16 - sch) / (ph - sh);
                $this.svbtn.css("top", top + "px");
            } else {
                $this.el.css("margin-left", left + "px");
                left = left * (pw + p.w - 16 - scw) / (pw - sw);
                $this.shbtn.css("left", left + "px");
            }
            $this.Target.trigger("onScroll", { ScrollType: scrollType });
            setTimeout(_scroll, 75);
        }
        function mouseUp() {
            isMouseDown = false, scrollType = null, $this.Target.removeClass("user_unselect");
            $(".scrollVButton,.scrollHButton", this.Target).removeClass("scrollButton-Down");
            if (this.releaseCapture) {
                this.releaseCapture();
                this.onmousemove = this.onmouseup = null;
            } else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                document.onmousemove = document.onmouseup = null;
            }
        }
        function scrollBtnMouseMove(e) {
            if (scrollType == "V") {
                var ph = $this.c.height(), sh = $this.el.outerHeight(), p = getPadding($this),
                    sch = $this.svbtn.height(), top = clientTop + (e.clientY - positionY);
                if (top < 0) top = 0;
                else if (top + sch + 16 > ph + p.h) top = ph + p.h - sch - 16;
                $this.svbtn.css("top", top + "px");
                top = top * (ph - sh) / (ph + p.h - sch - 16);
                $this.el.css("margin-top", top + "px");
            }
            else if (scrollType == "H") {
                var pw = $this.c.width(), sw = $this.el.outerWidth(), p = getPadding($this),
                    scw = $this.shbtn.width(), left = clientLeft + (e.clientX - positionX);
                if (left < 0) left = 0;
                else if (left + scw + 16 > pw + p.w) left = pw + p.w - scw - 16;
                $this.shbtn.css("left", left + "px");
                left = left * (pw - sw) / (pw + p.w - scw - 16);
                $this.el.css("margin-left", left + "px");
            }
            $this.Target.trigger("onScroll", { ScrollType: scrollType });
        }
        if ($(document.body).has(this.Target).length > 0) this.Layout();
    };
    function funExt(control) {
        $.fn.extend(control, {
            Add: function (el) {
                this.c.append($(el));
                this.el = $(el);
            },
            Layout: function () {
                setScrollBar(this, "hidden", "hidden");
                if (!ktw.IsNull(this.el)) scrollBarRefresh(this);
            },
            SetContent: function (el) {
                this.Clear();
                if (ktw.IsNull(el)) return;
                this.el = $(el);
                if (this.el.length == 0) this.el = $("<div>" + el + "</div>");
                this.c.append(this.el);
                this.el.css("position", "absolute");
                this.Layout();
            },
            Clear: function () {
                this.c.empty();
                this.el = null;
            },
            Animate: function (p) {
                var $this = this;
                if (this.Target.is(":animated")) this.Target.stop();
                this.Target.animate(p, {
                    duration: "fast", queue: false,
                    complete: function () {
                        $this.SetSize({ Width: p.width, Height: p.height });
                        $this.Target.triggerHandler("onRefresh");
                    }
                });
            },
            SetWidth: function (width) {
                this.Target.css('width', this.Width = width);
                this.Layout();
                this.Target.trigger("onResize");//大小变化事件
            },
            SetHeight: function (height) {
                this.Target.css('height', this.Height = height);
                this.Layout();
                this.Target.trigger("onResize");//大小变化事件
            },
            SetSize: function (size) {
                this.Target.css('width', this.Width = size.Width);
                this.Target.css('height', this.Height = size.Height);
                this.Layout();
                this.Target.triggerHandler("onResize");//大小变化事件
            }
        });
    }
})(jQuery);
//弹出框 PopBox 2017-6-20 hqj
(function ($) {
    ktw.PopBox = function (opt) {
        var $this = this;
        this.Target = $("<div class='popbox' id='" + opt.ID + "'>" +
            "<div class='popbox-icon'>" +
            "<div class='icon'></div>" +
            "</div>" +
            "<div class='popbox-content'>" +
            "<div class='popbox-content-bar'>" +
            "<div class='icon icon-h-shot'></div>" +
            "</div>" +
            //"<div style='width:26px;height:26px;background-color:pink;float:left;'><div class='content-icon'></div></div>" +
            "<div class='content-bar-text' style='float:left;margin-left:5px;font-weight:bold;line-height:26px;color:#FCFCFC'></div>" +
            "<div style='height:0;clear:both;'></div>" +
            "<div class='popbox-content-content'></div>" +
            "</div>" +
            "</div>");
        if (opt.PopIconCls) {
            this.Target.find(".popbox-icon .icon").addClass(opt.PopIconCls);
        }
        if (opt.ContentIconCls) {
            this.Target.find(".popbox-content .content-icon").addClass(opt.ContentIconCls);
        }
        if (opt.ContentTitle) {
            this.Target.find(".content-bar-text").html(opt.ContentTitle);
        }
        //对外提供控制,是否可以自动伸缩
        this.CanFlex = true;
        //设置浮动框的位置
        var pos = opt.Position;
        var css = { top: "5px", left: "5px", right: "5px" };
        if (pos.Top || pos.Top == "0") {
            css.top = pos.Top + "px";
        }
        if (pos.Left || pos.Left == "0") {
            css.left = pos.Left + "px";
            css.right = undefined;
        }
        if (pos.Right || pos.Right == "0") {
            css.right = pos.Right + "px";
            css.left = undefined;
        }
        var size = opt.Size;
        css = $.extend(css, { "max-width": "300px", "max-height": "500px" });
        if (size || size.Width) {
            css["max-width"] = parseFloat(size.Width) + "px";
        }
        if (size || size.Height) {
            css["max-height"] = parseFloat(size.Height) + "px";
        }
        this.Target.css(css);
        if (css.right) {
            this.Target.find(".popbox-icon").css({ right: "0" });
            this.Target.find(".popbox-content").css({ right: "0" });
        }

        //设置浮动框内容的位置
        var contentPos = { "top": opt.Position.ContentTop, "left": opt.Position.ContentLeft, "right": opt.Position.ContentRight };
        for (var i in contentPos) {
            if (contentPos[i] != "" && contentPos[i] != undefined) {
                contentPos[i] += "px";
            }
        }
        this.Target.find(".popbox-content").css(contentPos);
        $(opt.Parent).append(this.Target);
        /*注册图层树事件*/
        var _tree_can_collapse = true;
        var _timeinterval, _timeinterval2;
        this.Target.find(".popbox-icon").bind("mouseenter", function () {
            if (_timeinterval) {
                clearInterval(_timeinterval);
            }
            if (_timeinterval2) {
                clearInterval(_timeinterval2);
            }
            if ($this.Target.find(".popbox-content").is(":animated")) {
                $this.Target.find(".popbox-content").stop(true, true).show();
            } else {
                $this.Target.find(".popbox-content").show("fast");
            }
        }).bind("mouseleave", function () {
            _timeinterval = setInterval(function () {
                if (_tree_can_collapse && $this.CanFlex) {
                    if ($this.Target.find(".popbox-content").is(":animated")) {
                        $this.Target.find(".popbox-content").stop(true, true).hide();
                    } else {
                        $this.Target.find(".popbox-content").hide("fast");
                    }
                }
            }, 500);
        });
        this.Target.find(".popbox-content").bind("mouseenter", function () {
            if (_timeinterval) {
                clearInterval(_timeinterval);
            }
            if (_timeinterval2) {
                clearInterval(_timeinterval2);
            }
            if ($this.Target.find(".popbox-content").is(":animated")) {
                $this.Target.find(".popbox-content").stop(true, true).show();
            } else {
                $this.Target.find(".popbox-content").show("fast");
            }
        }).bind("mouseleave", function () {
            _timeinterval2 = setInterval(function () {
                if (_tree_can_collapse && $this.CanFlex) {
                    if ($this.Target.find(".popbox-content").is(":animated")) {
                        $this.Target.find(".popbox-content").stop(true, true).hide();
                    } else {
                        $this.Target.find(".popbox-content").hide("fast");
                    }
                }
            }, 500);
        });
        this.Target.find(".popbox-content-bar").click(function () {
            if (!$this.CanFlex) return;
            _tree_can_collapse = !_tree_can_collapse;
            var tmp;
            if ((tmp = $(this).find(".icon")).hasClass("icon-h-shot")) {
                tmp.removeClass("icon-h-shot").addClass("icon-v-shot").parent().css("background-color", "#0099cc");
            } else {
                tmp.removeClass("icon-v-shot").addClass("icon-h-shot").parent().css("background-color", "");
            }
        });
        this.box = new ktw.Box({
            HasBorder: true,
            HorScroll: "auto",//默认是隐藏的
            Width: opt.Size.Width,
            Height: opt.Size.Height - 26 - 32
        });
        this.Target.find(".popbox-content-content").append(this.box.Target);
        funExt(this);
    }
    function funExt(control) {
        $.extend(control, {
            Add: function (el) {
                this.box.Add(el);
            }
        });
    }
})(jQuery);
//Window(弹出窗) 2016-07-20 zzy
(function ($) {
    function GetIconCls(icon, id) {
        if (!ktw.IsNull(icon))
            return ktw.InsertIconRule(ktw.App.TempStyle, "." + id + "WinIcon", icon);
        return "icon-add";
    };
    function GetContent(url, con, win, isScrolling) {
        if (!ktw.IsNull(url)) {
            var waitbox = new ktw.UCWaitBox(win.Target);
            var frame = ktw.CreateFrame(url, isScrolling);
            frame.bind('load', function () {
                ktw.CallWidgetCommunication(frame[0], win, win.Parameters);
                waitbox.Close();
                win.Target.trigger("onLoaded", win);
            });
            waitbox.Show();
            var iframePanel = $("#iframePanel", win.Win);
            if (iframePanel.length == 0) iframePanel = $("<div id='iframePanel' style='width:" + (win.Width - 2)
                + "px;height:" + (win.Height - 32) + "px;margin:31px 1px 1px 1px;background:#fff;'></div>");
            return iframePanel.html(frame);
        }
        else if (!ktw.IsNull(con)) {
            return ktw.IsString(con) ? $('<p>' + con + '</p>') : con;
        }
        return null;
    };
    function ResizeBarLayout(win) {
        for (var i = 0; i < win.ResizeBar.length; i++) {
            var el = $(win.ResizeBar[i]);
            if (el.hasClass("S")) {
                el.css("width", (win.Width - 3) + "px");
            }
            else if (el.hasClass("N")) {
                var w = 44;
                if (win.Maximizable) w += 40;
                if (win.Minimizable) w += 40;
                el.css("width", (win.Width - w) + "px");
            }
            else if (el.hasClass("E")) {
                el.css("height", (win.Height - 32) + "px");
            }
            else if (el.hasClass("W")) {
                el.css("height", (win.Height - 3) + "px");
            }
        }
    };
    function GetStartPosition(win) {
        var el = (ktw.IsDOMElement(win.TriggerEl) || (ktw.IsjQueryObject(win.TriggerEl)
            && ktw.IsDOMElement(win.TriggerEl[0]))) ? $(win.TriggerEl) : null;
        if (el != null) {
            var p = el.offset(), p1 = win.Parent.offset();
            var l = p.left - p1.left, t = p.top - p1.top;
            if (l < 0) l = 0;
            else if (l > win.Parent.outerWidth()) l = win.Parent.outerWidth();
            if (t < 0) t = 0;
            else if (t > win.Parent.outerHeight()) t = win.Parent.outerHeight();
            return { top: t, left: l };
        }
        else {
            if (!ktw.IsObject(win.StartPoint))
                win.StartPoint = { top: ktw.PositionEnum.Center, left: ktw.PositionEnum.Center };
            var sp = { top: win.StartPoint.top, left: win.StartPoint.left };
            if (!isNaN(parseInt(sp.top))) sp.top = parseInt(sp.top);
            else {
                var h = win.Parent.outerHeight();
                switch (sp.top.toUpperCase()) {
                    case ktw.PositionEnum.Top:
                        sp.top = 0;
                        break;
                    case ktw.PositionEnum.Bottom:
                        sp.top = h;
                        break;
                    case ktw.PositionEnum.Center:
                        sp.top = parseInt(h / 2);
                        break;
                    default:
                        sp.top = parseInt(h / 2);
                }
            }
            if (!isNaN(parseInt(sp.left))) sp.left = parseInt(sp.left);
            else {
                var w = win.Parent.outerWidth();
                switch (sp.left.toUpperCase()) {
                    case ktw.PositionEnum.Left:
                        sp.left = 0;
                        break;
                    case ktw.PositionEnum.Right:
                        sp.left = w;
                        break;
                    case ktw.PositionEnum.Center:
                        sp.left = parseInt(w / 2);
                        break;
                    default:
                        sp.left = parseInt(w / 2);
                }
            }
            return sp;
        }
    };
    function ButtonsLayout(window) {
        if (window.IsMinimize) {
            window.btnMaximize.css("display", "none");
            if (window.Minimizable) {
                window.btnMinimize.css("display", "block");
                window.btnMinimize.css("right", "40px");
                if (window.IsMaximize) window.btnMinimize.addClass("Minimized-Max");
                else window.btnMinimize.addClass("Minimized-Nor");
            }
            else window.btnMinimize.css("display", "none");
        }
        else {
            if (window.Maximizable) {
                window.btnMaximize.css("display", "block");
                if (window.Minimizable) {
                    window.btnMinimize.css("right", "80px");
                    window.btnMinimize.css("display", "block");
                    window.btnMinimize.removeClass("Minimized-Nor");
                    window.btnMinimize.removeClass("Minimized-Max");
                }
                else window.btnMinimize.css("display", "none");
            }
            else {
                window.btnMaximize.css("display", "none");
                if (window.Minimizable) {
                    window.btnMinimize.css("right", "40px");
                    window.btnMinimize.css("display", "block");
                    window.btnMinimize.removeClass("Minimized-Nor");
                    window.btnMinimize.removeClass("Minimized-Max");
                }
                else window.btnMinimize.css("display", "none");
            }
        }
    };
    function GetAlign(align) {
        if (ktw.IsNull(align)) return "absolute";
        align = align.toLowerCase();
        if (align == "left" || align == "right" || align == "top"
            || align == "bottom" || align == "center") return align;
        else if (align == "middle") return "center";
        return "absolute";
    };
    function GetTop(win) {
        if (win.VAlign == "top") return 0;
        if (win.VAlign == "absolute") return win.Top;
        var h = win.WinMask.parent().outerHeight() - win.Height;
        if (win.VAlign == "center") h = h / 2;
        return h < 0 ? 0 : h;
    };
    function GetLeft(win) {
        if (win.HAlign == "left") return 0;
        if (win.HAlign == "absolute") return win.Left;
        var w = win.WinMask.parent().outerWidth() - win.Width;
        if (win.HAlign == "center") w = w / 2;
        return w < 0 ? 0 : w;
    };
    ktw.Window = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.ID = ktw.IsNull(opt.ID) ? "window" + new Date().getTime() : opt.ID;
        this.MinHeight = 32;
        this.MinWidth = 172;
        this.Visible = ktw.IsBoolean(opt.Visible) ? opt.Visible : opt.Visible !== "false";//是否显示
        this.IsMaximize = ktw.IsBoolean(opt.IsMaximize) ? opt.IsMaximize : opt.IsMaximize === "true";//是否最大化
        this.IsMinimize = ktw.IsBoolean(opt.IsMinimize) ? opt.IsMinimize : opt.IsMinimize === "true";//是否最小化
        this.Parent = (ktw.IsDOMElement(opt.Parent) || (ktw.IsjQueryObject(opt.Parent)
        && ktw.IsDOMElement(opt.Parent[0]))) ? $(opt.Parent) : $(document.body);
        this.TriggerEl = opt.TriggerEl;
        this.StartPoint = opt.StartPoint;
        this.WinMask = $("<div class='Window-Mask'></div>").appendTo(this.Parent);
        if (opt.InitVisible === false) {
            this.WinMask.hide();
        }
        this.Win = this.Target = $("<div class='Window' id='" + this.ID + "'></div>").appendTo(this.WinMask);
        this.Header = $("<div class='Header'></div>").appendTo(this.Win);
        this.IconCls = ktw.IsNull(opt.IconCls) ? (!ktw.IsNull(opt.Icon) ? GetIconCls(opt.Icon, this.ID) : "") : opt.IconCls;//窗口左上角的图标
        var iconEl = $("<div class='Icon " + this.IconCls + "'></div>").appendTo(this.Header);
        this.Title = ktw.IsNull(opt.Title) ? "窗口标题" : opt.Title;//窗口的标题文本
        var titleEl = $("<div class='Title'>" + this.Title + "</div>").appendTo(this.Header);
        this.btnClose = $("<div class='CloseButton'></div>").appendTo(this.Header);
        this.btnMaximize = $("<div class='MaximizeButton'></div>").appendTo(this.Header);
        this.btnMinimize = $("<div class='MinimizeButton'></div>").appendTo(this.Header);
        this.Tools = ktw.IsNull(opt.Tools) ? [] : opt.Tools;//窗体右上角添加自定义工具
        this.ZIndex = ktw.IsNull(opt.ZIndex) ? 9999 : opt.ZIndex;//设置窗体索引
        this.IsDestroy = ktw.IsBoolean(opt.IsDestroy) ? opt.IsDestroy : opt.IsDestroy !== "false";//是否关闭就销毁ktw.App.PopBoxs
        this.HAlign = GetAlign(opt.HAlign);//窗体的水平停靠位置
        this.VAlign = GetAlign(opt.VAlign);//窗体的垂直停靠位置
        this.Top = ktw.IsNumber(opt.Top) ? opt.Top : isNaN(parseInt(opt.Top)) ? 0 : parseInt(opt.Top);//窗体的上边位置
        this.Left = ktw.IsNumber(opt.Left) ? opt.Left : isNaN(parseInt(opt.Left)) ? 0 : parseInt(opt.Left);//窗体的左边位置
        this.Width = ktw.IsNumber(opt.Width) ? opt.Width : parseInt(opt.Width);//窗体的宽度
        this.Height = ktw.IsNumber(opt.Height) ? opt.Height : parseInt(opt.Height);//窗体的高度
        if (isNaN(this.Width)) this.Width = 400;
        if (isNaN(this.Height)) this.Height = 300;
        this.Modal = ktw.IsBoolean(opt.Modal) ? opt.Modal : opt.Modal === "true";//定义窗口是不是模态窗口
        this.Closeable = ktw.IsBoolean(opt.Closeable) ? opt.Closeable : opt.Closeable === "true";//定义是否显示关闭按钮
        this.Maximizable = ktw.IsBoolean(opt.Maximizable) ? opt.Maximizable : opt.Maximizable === "true";//定义是否显示最大化按钮
        //显示或隐藏最大化按钮
        this.btnMaximize.css("display", this.Maximizable ? "block" : "none");
        this.Minimizable = ktw.IsBoolean(opt.Minimizable) ? opt.Minimizable : opt.Minimizable === "true";//定义是否显示最小化按钮
        //显示或隐藏最小化按钮
        this.btnMinimize.css("display", this.Minimizable ? "block" : "none");
        this.Resizable = ktw.IsBoolean(opt.Resizable) ? opt.Resizable : opt.Resizable === "true",//定义窗口是否可调整尺寸
        this.Draggable = ktw.IsBoolean(opt.Draggable) ? opt.Draggable : opt.Draggable === "true",//定义窗口是否可拖拽
        this.Parameters = opt.Parameters;
        this.Url = opt.Url;//窗体填充内容
        this.Content = opt.Content;//窗体填充内容
        this.Box = new ktw.Box({ HasBorder: false, CSS: { "margin": "31px 1px 1px 1px" } });
        this.Win.append(this.Box.Target);
        if (!ktw.IsNull(this.Url)) {
            this.Box.SetVisible(false);
            this.Win.append(GetContent(this.Url, null, this));
        }
        else if (!ktw.IsNull(this.Content)) {
            this.Box.SetVisible(true);
            this.Box.SetContent(GetContent(null, this.Content, this));
            this.Target.trigger("onLoaded", this);
        }
        this.Win.append($("<div class='ResizeBar S'></div><div class='ResizeBar N'></div>" +
            "<div class='ResizeBar W'></div><div class='ResizeBar E'></div><div class='ResizeBar NW'></div>"
            + "<div class='ResizeBar SE'></div><div class='ResizeBar SW'></div>"));
        this.ResizeBar = $(".ResizeBar", this.Win);
        $.extend(this, this.Win);
        this.Left = GetLeft(this), this.Top = GetTop(this);
        var $this = this;
        this.oTop = this.Top, this.oLeft = this.Left, this.oWidth = this.Width, this.oHeight = this.Height;
        funExt(this);
        this.Layout();
        if (this.Visible) {
            if (this.IsMinimize) this.Minimize();
            else this.IsMaximize ? this.Maximize() : this.Normal();
        }
        (function () {
            var tempMask = $("<div style='z-index:9999;top:0;left:0;width:100%;height:100%;position:absolute;'></div>");
            var isMouseDown = false, currElement, elPos, elSize, mousePos;
            $this.Header.bind("mousedown", $this, function (e) {
                if (!e.data.Draggable) return;
                $(document.body).append(tempMask);
                isMouseDown = true, currElement = this;
                tempMask.css("cursor", $(this).css("cursor"));
                mousePos = { x: e.clientX, y: e.clientY };
                if (e.data.IsMinimize) elPos = {
                    l: parseInt(e.data.WinMask.css("left")),
                    t: parseInt(e.data.WinMask.css("top"))
                };
                else if (e.data.Modal) elPos = {
                    l: parseInt(e.data.Win.css("left")),
                    t: parseInt(e.data.Win.css("top"))
                };
                else elPos = { l: parseInt(e.data.WinMask.css("left")), t: parseInt(e.data.WinMask.css("top")) };
                if (currElement.setCapture) {
                    currElement.setCapture();
                    currElement.onmouseup = HeaderMouseUp;
                    currElement.onmousemove = function (ev) {
                        HeaderMouseMove(ev || event);
                    };
                }
                else $(document).bind("mouseup", HeaderMouseUp).bind("mousemove", HeaderMouseMove);
                e.preventDefault();
            });
            function HeaderMouseUp() {
                tempMask.remove();
                isMouseDown = false;
                if (!$this.IsMaximize || $this.IsMinimize) {
                    $this.oTop = $this.Top, $this.oLeft = $this.Left, $this.oWidth = $this.Width, $this.oHeight = $this.Height;
                }
                currElement.releaseCapture ? (currElement.releaseCapture(), currElement.onmousemove = currElement.onmouseup = null)
                    : ($(document).unbind("mouseup", HeaderMouseUp).unbind("mousemove", HeaderMouseMove));
            }
            function HeaderMouseMove(e) {
                if (!isMouseDown) return;
                $this.VAlign = $this.HAlign = "absolute";
                var top = elPos.t + (e.clientY - mousePos.y);
                var left = elPos.l + (e.clientX - mousePos.x);
                if ($this.IsMinimize) {
                    if (top < 0) top = 0;
                    else if (top + $this.WinMask.outerHeight() > $this.Parent.outerHeight())
                        top = $this.Parent.outerHeight() - $this.WinMask.outerHeight();
                    if (left < 0) left = 0;
                    else if (left + $this.WinMask.outerWidth() > $this.Parent.outerWidth())
                        left = $this.Parent.outerWidth() - $this.WinMask.outerWidth();
                    $this.WinMask.css({ top: ($this.Top = top) + "px", left: ($this.Left = left) + "px" });
                    return;
                }
                if (top < 0) top = 0;
                else if ($this.Modal && top + $this.Win.outerHeight() > $this.WinMask.outerHeight()) {
                    top = $this.WinMask.outerHeight() - $this.Win.outerHeight();
                    if (top < 0) top = 0;
                }
                else if (!$this.Modal && top + $this.WinMask.outerHeight() > $this.Parent.outerHeight()) {
                    top = $this.Parent.outerHeight() - $this.WinMask.outerHeight();
                    if (top < 0) top = 0;
                }
                if (left < 0) left = 0;
                else if ($this.Modal && left + $this.Win.outerWidth() > $this.WinMask.outerWidth()) {
                    left = $this.WinMask.outerWidth() - $this.Win.outerWidth();
                    if (left < 0) left = 0;
                }
                else if (!$this.Modal && left + $this.WinMask.outerWidth() > $this.Parent.outerWidth()) {
                    left = $this.Parent.outerWidth() - $this.WinMask.outerWidth();
                    if (left < 0) left = 0;
                }
                if ($this.Modal) $this.Win.css({ top: ($this.Top = top) + "px", left: ($this.Left = left) + "px" });
                else $this.WinMask.css({ top: ($this.Top = top) + "px", left: ($this.Left = left) + "px" });
            }

            $this.ResizeBar.bind("mousedown", $this, function (e) {
                if (e.data.IsMinimize || !e.data.Resizable) return;
                $(document.body).append(tempMask);
                isMouseDown = true, currElement = this;
                tempMask.css("cursor", $(this).css("cursor"));
                mousePos = { x: e.clientX, y: e.clientY };
                var target = e.data.Modal ? e.data.Win : e.data.WinMask;
                elSize = { h: target.outerHeight(), w: target.outerWidth() };
                elPos = { l: parseInt(target.css("left")), t: parseInt(target.css("top")) };
                if (currElement.setCapture) {
                    currElement.setCapture();
                    currElement.onmouseup = ResizeBarMouseUp;
                    currElement.onmousemove = function (ev) {
                        ResizeBarMouseMove(ev || event);
                    };
                }
                else $(document).bind("mouseup", ResizeBarMouseUp).bind("mousemove", ResizeBarMouseMove);
                e.preventDefault();
            });
            function ResizeBarMouseUp() {
                tempMask.remove();
                isMouseDown = false;
                if (!$this.IsMaximize) {
                    $this.oTop = $this.Top, $this.oLeft = $this.Left, $this.oWidth = $this.Width, $this.oHeight = $this.Height;
                }
                currElement.releaseCapture ? (currElement.releaseCapture(), currElement.onmousemove = currElement.onmouseup = null)
                    : ($(document).unbind("mouseup", ResizeBarMouseUp).unbind("mousemove", ResizeBarMouseMove));
            }
            function ResizeBarMouseMove(e) {
                if (!isMouseDown) return;
                $this.VAlign = $this.HAlign = "absolute";
                var psize = $this.Modal ? { w: $this.WinMask.outerWidth(), h: $this.WinMask.outerHeight() }
                    : { w: $this.Parent.outerWidth(), h: $this.Parent.outerHeight() };
                var dw = e.clientX - mousePos.x, dh = e.clientY - mousePos.y;
                if ($(currElement).hasClass("S")) {
                    $this.Height = elSize.h + dh;
                    if ($this.Height < $this.MinHeight) $this.Height = $this.MinHeight;
                    else if ($this.Height + elPos.t > psize.h) $this.Height = psize.h - elPos.t;
                }
                else if ($(currElement).hasClass("N")) {
                    $this.Height = elSize.h - dh, $this.Top = elPos.t + dh;
                    if ($this.Height <= $this.MinHeight) {
                        $this.Height = $this.MinHeight, $this.Top = elPos.t + elSize.h - $this.MinHeight;
                    }
                    else if (-dh > elPos.t) {
                        $this.Height = elSize.h + elPos.t, $this.Top = 0;
                    }
                }
                else if ($(currElement).hasClass("E")) {
                    $this.Width = elSize.w + dw;
                    if ($this.Width < $this.MinWidth) $this.Width = $this.MinWidth;
                    else if ($this.Width + elPos.l > psize.w) $this.Width = psize.w - elPos.l;
                }
                else if ($(currElement).hasClass("W")) {
                    $this.Width = elSize.w - dw, $this.Left = elPos.l + dw;
                    if ($this.Width <= $this.MinWidth) {
                        $this.Width = $this.MinWidth, $this.Left = elPos.l + elSize.w - $this.MinWidth;
                    }
                    else if (-dw > elPos.l) {
                        $this.Width = elSize.w + elPos.l, $this.Left = 0;
                    }
                }
                else if ($(currElement).hasClass("NW")) {
                    $this.Height = elSize.h - dh, $this.Top = elPos.t + dh;
                    if ($this.Height <= $this.MinHeight) {
                        $this.Height = $this.MinHeight, $this.Top = elPos.t + elSize.h - $this.MinHeight;
                    }
                    else if (-dh > elPos.t) {
                        $this.Height = elSize.h + elPos.t, $this.Top = 0;
                    }

                    $this.Width = elSize.w - dw, $this.Left = elPos.l + dw;
                    if ($this.Width <= $this.MinWidth) {
                        $this.Width = $this.MinWidth, $this.Left = elPos.l + elSize.w - $this.MinWidth;
                    }
                    else if (-dw > elPos.l) {
                        $this.Width = elSize.w + elPos.l, $this.Left = 0;
                    }
                }
                else if ($(currElement).hasClass("SE")) {
                    $this.Height = elSize.h + dh;
                    if ($this.Height < $this.MinHeight) $this.Height = $this.MinHeight;
                    else if ($this.Height + elPos.t > psize.h) $this.Height = psize.h - elPos.t;

                    $this.Width = elSize.w + dw
                    if ($this.Width < $this.MinWidth) $this.Width = $this.MinWidth;
                    else if ($this.Width + elPos.l > psize.w) $this.Width = psize.w - elPos.l;
                }
                else if ($(currElement).hasClass("SW")) {
                    $this.Height = elSize.h + dh;
                    if ($this.Height < $this.MinHeight) $this.Height = $this.MinHeight;
                    else if ($this.Height + elPos.t > psize.h)
                        $this.Height = psize.h - elPos.t;

                    $this.Width = elSize.w - dw, $this.Left = elPos.l + dw;
                    if ($this.Width <= $this.MinWidth) {
                        $this.Width = $this.MinWidth, $this.Left = elPos.l + elSize.w - $this.MinWidth;
                    }
                    else if (-dw > elPos.l) {
                        $this.Width = elSize.w + elPos.l, $this.Left = 0;
                    }
                }
                $this.Layout();
            }
            $(window).resize(function () {
                $this.Layout();
                if ($this.HAlign == "absolute" && $this.VAlign == "absolute") return;
                $this.Left = GetLeft($this), $this.Top = GetTop($this);
                $this.oTop = $this.Top, $this.oLeft = $this.Left;
                $this.Layout();
            });

            $this.btnMaximize.bind("mousedown", $this, function (e) { e.stopPropagation(); });
            $this.btnMaximize.bind("click", $this, function (e) {
                if (!e.data.IsMaximize) {
                    e.data.oTop = e.data.Top, e.data.oLeft = e.data.Left;
                    e.data.oWidth = e.data.Width, e.data.oHeight = e.data.Height;
                }
                e.data.IsMaximize ? e.data.Normal() : e.data.Maximize();
            });

            $this.btnClose.bind("mousedown", $this, function (e) { e.stopPropagation(); });
            $this.btnClose.bind("click", $this, function (e) { e.data.Close(); });

            $this.btnMinimize.bind("mousedown", $this, function (e) { e.stopPropagation(); });
            $this.btnMinimize.bind("click", $this, function (e) {
                if (!e.data.IsMinimize) e.data.Minimize();
                else e.data.IsMaximize ? e.data.Maximize() : e.data.Normal();
            });
        }());
        ktw.App.PopBoxs.push(this);
    };
    function funExt(control) {
        $.fn.extend(control, {
            SetHAlign: function (align) {
                this.HAlign = GetAlign(align);
                this.Left = GetLeft(this);
                this.oLeft = this.Left;
            },
            SetVAlign: function (align) {
                this.VAlign = GetAlign(align);
                this.Top = GetTop(this);
                this.oTop = this.Top;
            },
            SetTitle: function (title) {
                $(".Title", this.Header).html(title);
            },
            SetWidth: function (width) {
                if (ktw.IsNumber(width)) this.Layout(this.Width = width);
            },//设置窗体宽度
            SetHeight: function (height) {
                if (ktw.IsNumber(height)) this.Layout(this.Height = this.oHeight = height);
            },//设置窗体高度
            SetSize: function (width, height) {
                if (ktw.IsNumber(height) && ktw.IsNumber(width)) {
                    this.Width = width, this.Height = height, this.Layout();
                }
            },//设置窗体大小
            SetTop: function (top) {
                if (ktw.IsNumber(top)) this.Layout(this.Top = top);
            },//设置窗体与父容器上边边距
            SetLeft: function (left) {
                if (ktw.IsNumber(left)) this.Layout(this.Left = left);
            },//设置窗体与父容器左边边距
            SetPosition: function (top, left) {
                if (ktw.IsNumber(top) && ktw.IsNumber(left)) {
                    this.Top = top, this.Left = left, this.Layout();
                }
            },//设置窗体相对于父窗体的位置
            SetContent: function (content) {
                this.Url = null;
                this.Box.SetVisible(true);
                this.Box.SetContent(content);
                $("#iframePanel", this.Win).empty();
                $("#iframePanel", this.Win).css("display", "none");
                this.Target.trigger("onLoaded", this);
            },//设置内容
            SetUrl: function (url, isScrolling) {
                if (ktw.IsNull(url)) return;
                this.Box.SetVisible(false);
                this.Win.append(GetContent(url, null, this, isScrolling));
            },
            Open: function () {
                if (this.Visible) return;
                this.IsMaximize ? this.Maximize() : this.Normal();
            },//打开窗体
            Close: function () {
                if (!this.Visible) return;
                this.Target.triggerHandler("onClosing", { element: this, id: this.ID });
                var $this = this, sp = GetStartPosition(this);
                if (this.Modal) {
                    if (this.IsMinimize) {
                        this.WinMask.animate({ top: sp.top, left: sp.left }, "fast");
                        this.Win.animate({ width: 0, height: 0 }, {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Visible = false;
                                $this.WinMask.css("display", "none");
                                $this.Target.trigger("onClosed", { element: $this, id: $this.ID });
                            }
                        });
                    }
                    else {
                        this.Win.animate({ top: sp.top, left: sp.left, width: 0, height: 0 },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Visible = false;
                                $this.WinMask.css("display", "none");
                                $this.Target.triggerHandler("onClosed", { element: $this, id: $this.ID });
                            }
                        });
                    }
                }
                else {
                    this.Win.animate({ width: 0, height: 0 }, "fast");
                    this.WinMask.animate({ top: sp.top, left: sp.left, width: 0, height: 0 },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Visible = false;
                                $this.WinMask.css("display", "none");
                                $this.Target.triggerHandler("onClosed", { element: $this, id: $this.ID });
                            }
                        });
                }
                this.Header.animate({ width: 0 }, "fast");
                this.Box.Animate({ width: 0, height: 0 });
            },//关闭窗体
            Destroy: function () {
                for (var i = 0; i < ktw.App.PopBoxs.length; i++) {
                    if (ktw.App.PopBoxs[i].ID === this.ID && ktw.App.PopBoxs[i] === this) {
                        ktw.App.PopBoxs.splice(i, 1);
                        break;
                    }
                }
                this.WinMask.remove();
            },//销毁窗体
            Layout: function () {
                if (!this.Visible) return;
                var iframePanel = $("#iframePanel", this.Win);
                if (this.IsMinimize) {
                    if (this.oTop + this.MinHeight > this.Parent.outerHeight()) {
                        this.Top = this.oTop = this.Parent.outerHeight() - this.MinHeight;
                        if (this.Top < 0) this.Top = this.oTop = 0;
                    }
                    if (this.oLeft + this.MinWidth > this.Parent.outerWidth()) {
                        this.Left = this.oLeft = this.Parent.outerWidth() - this.MinWidth;
                        if (this.Left < 0) this.Left = this.oLeft = 0;
                    }
                    this.WinMask.css({ top: this.oTop, left: this.oLeft });
                    if (!ktw.IsNull(this.Url)) iframePanel.css("display", "none");
                    return;
                }
                if (!ktw.IsNull(this.Url)) iframePanel.css("display", "block");
                if (this.IsMaximize) {
                    this.Width = this.Parent.outerWidth();
                    this.Height = this.Parent.outerHeight();
                }
                if (this.Modal) {
                    this.WinMask.css({ width: this.Parent.outerWidth(), height: this.Parent.outerHeight() });
                    if (this.Top < 0) this.Top = this.oTop = 0;
                    else if (this.Top + this.Win.outerHeight() > this.WinMask.outerHeight()) {
                        this.Top = this.oTop = this.WinMask.outerHeight() - this.Win.outerHeight();
                        if (this.Top < 0) this.Top = this.oTop = 0;
                    }
                    if (this.Left < 0) this.Left = this.oLeft = 0;
                    else if (this.Left + this.Win.outerWidth() > this.WinMask.outerWidth()) {
                        this.Left = this.oLeft = this.WinMask.outerWidth() - this.Win.outerWidth();
                        if (this.Left < 0) this.Left = this.oLeft = 0;
                    }
                    this.Win.css({ width: this.Width, height: this.Height, top: this.Top, left: this.Left });
                }
                else {
                    if (this.Top < 0) this.Top = 0;
                    else if (this.Top + this.Height > this.Parent.outerHeight()) {
                        this.Top = this.Parent.outerHeight() - this.Height;
                        if (this.Top < 0) this.Top = 0;
                    }
                    if (this.Left < 0) this.Left = 0;
                    else if (this.Left + this.Width > this.Parent.outerWidth()) {
                        this.Left = this.Parent.outerWidth() - this.Width;
                        if (this.Left < 0) this.Left = 0;
                    }
                    this.WinMask.css({ width: this.Width, height: this.Height, top: this.Top, left: this.Left });
                    this.Win.css({ width: this.Width, height: this.Height, top: 0, left: 0 });
                }
                ResizeBarLayout(this);
                this.Header.css("width", (this.Width - 2) + "px");
                this.Box.SetSize({ Width: this.Width - 2, Height: this.Height - 32 });
                if (!ktw.IsNull(this.Url)) iframePanel.css({ width: this.Width - 2, height: this.Height - 32 });
                this.Target.triggerHandler("onResize");//大小变化事件
            },//窗体布局刷新
            Maximize: function () {
                var $this = this, w = this.Parent.outerWidth(), h = this.Parent.outerHeight();
                if (!ktw.IsNull(this.Url)) $("#iframePanel", this.Win).css("display", "block");
                this.WinMask.css("display", "block");
                if (this.Modal) {
                    this.WinMask.animate({ top: 0, left: 0, width: w, height: h }, "fast");
                    this.Win.animate({ top: 0, left: 0, width: w, height: h },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Top = $this.Left = 0;
                                $this.Width = w, $this.Height = h;
                                $this.btnMaximize.addClass("Maximized");
                                $this.Visible = $this.IsMaximize = true;
                                $this.IsMinimize = false;
                                ButtonsLayout($this);
                                $this.Layout();
                            }
                        });
                }
                else {
                    this.Win.animate({ width: w, height: h }, "fast");
                    this.WinMask.animate({ top: 0, left: 0, width: w, height: h },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Top = $this.Left = 0;
                                $this.Width = w, $this.Height = h;
                                $this.btnMaximize.addClass("Maximized");
                                $this.Visible = $this.IsMaximize = true;
                                $this.IsMinimize = false;
                                ButtonsLayout($this);
                                $this.Layout();
                            }
                        });
                }
                this.Header.animate({ width: w - 2 }, "fast");
                this.Box.Animate({ width: w - 2, height: h - 32 });
            },//窗体最大状态
            Normal: function () {
                var $this = this, t = this.oTop, l = this.oLeft, w = this.oWidth, h = this.oHeight;
                if (!ktw.IsNull(this.Url)) $("#iframePanel", this.Win).css("display", "block");
                this.WinMask.css("display", "block");
                if (this.Modal) {
                    if (this.IsMinimize) {
                        this.WinMask.animate({
                            left: 0, width: this.Parent.outerWidth(),
                            top: 0, height: this.Parent.outerHeight()
                        }, "fast");
                    }
                    this.Win.animate({ top: t, left: l, width: w, height: h },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Top = t, $this.Left = l;
                                $this.Width = w, $this.Height = h;
                                $this.btnMaximize.removeClass("Maximized");
                                $this.Visible = true;
                                $this.IsMaximize = $this.IsMinimize = false;
                                ButtonsLayout($this);
                                $this.Layout();
                            }
                        });
                }
                else {
                    this.Win.animate({ width: w, height: h }, "fast");
                    this.WinMask.animate({ top: t, left: l, width: w, height: h },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.Top = t, $this.Left = l;
                                $this.Width = w, $this.Height = h;
                                $this.btnMaximize.removeClass("Maximized");
                                $this.Visible = true;
                                $this.IsMaximize = $this.IsMinimize = false;
                                ButtonsLayout($this);
                                $this.Layout();
                            }
                        });
                }
                this.Header.animate({ width: w - 2 }, "fast");
                this.Box.Animate({ width: w - 2, height: h - 32 });
            },//窗体普通状态
            Minimize: function () {
                if (!this.Visible) return;
                var $this = this;
                if (this.Modal) {
                    this.Win.animate({ width: this.MinWidth, height: this.MinHeight, left: 0, top: 0 }, "fast");
                    this.WinMask.animate({
                        width: this.MinWidth,
                        height: this.MinHeight,
                        left: this.oLeft,
                        top: this.oTop
                    },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.IsMinimize = true;
                                ButtonsLayout($this);
                                $this.Layout();
                            }
                        });
                }
                else {
                    if (this.oLeft + this.MinWidth > this.Parent.outerWidth())
                        this.oLeft = this.Parent.outerWidth() - this.MinWidth;
                    if (this.oTop + this.MinHeight > this.Parent.outerHeight())
                        this.oTop = this.Parent.outerHeight() - this.MinHeight;
                    this.Win.animate({ width: this.MinWidth, height: this.MinHeight, left: 0, top: 0 }, "fast");
                    this.WinMask.animate({
                        width: this.MinWidth,
                        height: this.MinHeight,
                        left: this.oLeft,
                        top: this.oTop
                    },
                        {
                            duration: "fast", queue: false,
                            complete: function () {
                                $this.IsMinimize = true;
                                ButtonsLayout($this);
                                $this.Layout();
                            }
                        });
                }
                this.Header.animate({ width: this.MinWidth - 2 }, "fast");
                this.Box.Animate({ width: 0, height: 0 });
            },//窗体最小状态
            bind: function () {
                this.Target.bind(arguments[0], arguments[1], arguments[2]);
            },
            unbind: function (eventName) {
                this.Target.unbind(eventName);
            }
        });
    }
})(jQuery);
//Messager(消息窗) 2016-09-01 zzy
(function ($) {
    function GetCls(type) {
        if (ktw.IsNull(type)) return "icon-Messager-info";
        var t = type.toLowerCase();
        if (t == "question" || t == "warn" ||
            t == "error") return "icon-Messager-" + t;
        else return "icon-Messager-info";
    };
    function GetAlign(align) {
        if (ktw.IsNull(align)) return "center";
        align = align.toLowerCase();
        if (align == "left" || align == "right" || align == "top"
            || align == "bottom" || align == "center") return align;
        return "center";
    };
    function Show(t, message, callback, opt, f) {
        t.Callback = callback;
        t.WinMask.appendTo(t.Parent);
        if (ktw.IsString(opt)) $("#iconDiv", t.Target).attr("class", GetCls(t.Type = opt));
        else if (!ktw.IsNull(opt) && !ktw.IsNull(opt.Type))
            $("#iconDiv", t.Target).attr("class", GetCls(t.Type = opt.Type));
        if (!ktw.IsNull(opt)) {
            if (!ktw.IsNull(opt.Width) && (ktw.IsNumber(opt.Width) || !isNaN(parseInt(opt.Width)))) t.Width = t.oWidth = parseInt(opt.Width);
            if (!ktw.IsNull(opt.Height) && (ktw.IsNumber(opt.Height) || !isNaN(parseInt(opt.Height)))) t.Height = t.oHeight = parseInt(opt.Height);
            t.SetVAlign(ktw.IsNull(opt.VAlign) ? "center" : opt.VAlign);
            t.SetHAlign(ktw.IsNull(opt.HAlign) ? "center" : opt.HAlign);
            if (!ktw.IsNull(opt.Title)) t.SetTitle(opt.Title);
        }
        else {
            t.SetVAlign(t.VAlign);
            t.SetHAlign(t.HAlign);
        }
        t.Visible = false;
        t.Open();
        $("#msgContent", t.Target).width(t.Width - 2);
        $("#msgContent", t.Target).height(t.Height - 32);
        var btnDiv = $("#btnDiv", t.Target);
        if (f && t.AutoVisible) setTimeout(function () { MoveOut(t) }, t.Timeout);
        //btnDiv.width(f ? 60 : 132);
        $('#cancel', btnDiv).css("display", f ? "none" : (opt.HideCancle ? "none" : ""));
        btnDiv.css("margin-left", -btnDiv.outerWidth() / 2 + "px");
        $("#infoDiv", t.Target).width(t.Width - 64);
        $("#contentDiv", t.Target).width(t.Width - 2);
        t.SetButtonVisible(t.ButtonVisible);
        var infoDiv = $("#infoDiv", t.Target);
        infoDiv.empty();
        if (ktw.IsString(message)) {
            var p = $("<p style='line-height:16px'>" + message + "</p>").appendTo(infoDiv);
            if (p.outerHeight() <= 16) p.css("margin-top", "10px");
        }
        else infoDiv.append(message);
    }
    function MoveOut(win) {
        var t = win.WinMask, d = win.Duration, e = win.Effect.toLowerCase();
        if (e === undefined || (e != "down" && e != "up")) {
            t.fadeOut(d);
            return;
        }
        var top = e == "down" ? $(window).height() : -t.outerHeight();
        t.animate({ top: top }, {
            duration: d, queue: false,
            complete: function () { t.remove(); }
        });
    }
    ktw.Messager = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        $this.opt = opt;
        if (ktw.IsNull(opt.ID)) opt.ID = "msg" + new Date().getTime();
        opt.Visible = opt.Draggable = true, opt.Url = null;
        if (ktw.IsNull(opt.Title)) opt.Title = "信息提示";
        opt.VAlign = GetAlign(opt.VAlign);
        opt.HAlign = GetAlign(opt.HAlign);
        opt.IsMinimize = opt.IsMaximize = opt.Resizable
            = opt.Minimizable = opt.Maximizable = false;
        opt.Modal = ktw.IsBoolean(opt.Modal) ? opt.Modal : opt.Modal !== "false";
        var av = ktw.IsBoolean(opt.AutoVisible) ? opt.AutoVisible : opt.AutoVisible === "true";
        if (av) opt.Modal = false;
        opt.Width = ktw.IsNumber(opt.Width) ? opt.Width : parseInt(opt.Width);//窗体的宽度
        opt.Height = ktw.IsNumber(opt.Height) ? opt.Height : parseInt(opt.Height);//窗体的高度
        if (isNaN(opt.Width)) opt.Width = 250;
        if (isNaN(opt.Height)) opt.Height = 150;
        var content = $("<div id='msgContent' style='position:relative;overflow:hidden'></div>");
        var contentDiv = $("<div id='contentDiv' style='position:absolute;top:0px;left:0px;'></div>").appendTo(content);
        var iconDiv = $("<div id='iconDiv' style='position:absolute;top:10px;left:10px;height:32px;width:32px'></div>").appendTo(contentDiv);
        var infoDiv = $("<div id='infoDiv' style='position:absolute;top:10px;left:52px;'></div>").appendTo(contentDiv);
        var btnDiv = $("<div id='btnDiv' style='height:36px;position:absolute;bottom:0px;left:38%;right:40px;'></div>").appendTo(content);

        var btnCancel = $("<a id='cancel' tabindex='1' class='easyui-linkbutton' style='width:60px;height:26px;margin-left:12px;float:right;'></a>").appendTo(btnDiv);
        btnCancel.css("display", opt.HideCancle ? "none" : "inline-block"); var btnOK = $("<a id='ok' tabindex='0' class='easyui-linkbutton' style='width:60px;height:26px;float:right;'></a>").appendTo(btnDiv);
        btnOK.css("display", opt.HideOk ? "none" : "inline-block");
        opt.Content = content;
        var win = new ktw.Window(opt);
        win.Type = ktw.IsNull(opt.Type) ? "info" : opt.Type;
        iconDiv.addClass(GetCls(win.Type));
        win.AutoVisible = av;
        win.Timeout = ktw.IsNumber(opt.Timeout) ? opt.Timeout : 5000;
        win.Effect = ktw.IsNull(opt.Effect) ? undefined : opt.Effect;
        win.Duration = ktw.IsNull(opt.Duration) ? "normal" : opt.Duration;
        win.OK = ktw.IsNull(opt.OK) ? "确定" : opt.OK;
        win.Cancel = ktw.IsNull(opt.Cancel) ? "取消" : opt.Cancel;
        btnOK.linkbutton({ text: win.OK });
        btnCancel.linkbutton({ text: win.Cancel });
        $('#ok', btnDiv).click(function () {
            win.Close();
            if (win.Callback) win.Callback(true);
        });
        $('#cancel', btnDiv).click(function () {
            win.Close();
            if (win.Callback) win.Callback(false);
        });
        win.Alert = function (message, opt, callback) {
            Show(this, message, callback, $.extend($this.opt, opt), true);
        };
        win.Confirm = function (message, callback, opt) {
            Show(this, message, callback, $.extend($this.opt, opt), false);
        };
        win.SetButtonVisible = function (visible) {
            $("#btnDiv", this.Target).css("display", (this.ButtonVisible = visible) ? "" : "none");
            $("#infoDiv", this.Target).height(this.Height - (this.ButtonVisible ? 88 : 52));
            $("#contentDiv", this.Target).height(this.Height - (this.ButtonVisible ? 78 : 32));
        };
        win.SetButtonVisible(ktw.IsBoolean(opt.ButtonVisible) ? opt.ButtonVisible : opt.ButtonVisible !== "false");
        if (opt.AutoShow === false) win.WinMask.css("display", "none");
        return win;
    };
})(jQuery);
//Dialog(对话窗) 2016-09-02 zzy
(function ($) {
    function GetAlign(align) {
        if (ktw.IsNull(align)) return "center";
        align = align.toLowerCase();
        if (align == "left" || align == "right" || align == "top"
            || align == "bottom" || align == "center") return align;
        return "center";
    };
    function Show(t, callback, opt) {
        if (!ktw.IsNull(opt)) {
            if (!ktw.IsNull(opt.Callback)) t.Callback = opt.Callback;
            if (!ktw.IsNull(opt.Width) && (ktw.IsNumber(opt.Width) ||
                !isNaN(parseInt(opt.Width)))) t.Width = t.oWidth = parseInt(opt.Width);
            if (!ktw.IsNull(opt.Height) && (ktw.IsNumber(opt.Height) ||
                !isNaN(parseInt(opt.Height)))) t.Height = t.oHeight = parseInt(opt.Height);
            t.SetVAlign(ktw.IsNull(opt.VAlign) ? "center" : opt.VAlign);
            t.SetHAlign(ktw.IsNull(opt.HAlign) ? "center" : opt.HAlign);
            if (!ktw.IsNull(opt.Title)) t.SetTitle(opt.Title);
        }
        if (!ktw.IsNull(callback)) t.Callback = callback;
        t.Visible = false;
        t.Open();
        $("#dlgContent", t.Target).width(t.Width - 2);
        $("#dlgContent", t.Target).height(t.Height - 32);
        $("#contentDiv", t.Target).width(t.Width - 2);
        $("#contentDiv", t.Target).height(t.Height - 59);
    }
    ktw.Dialog = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        if (ktw.IsNull(opt.ID)) opt.ID = "dlg" + new Date().getTime();
        opt.Visible = opt.Modal = opt.Draggable = true;
        if (ktw.IsNull(opt.Title)) opt.Title = "对话框";
        opt.VAlign = GetAlign(opt.VAlign);
        opt.HAlign = GetAlign(opt.HAlign);
        opt.IsMinimize = opt.IsMaximize = opt.Resizable = opt.Minimizable = opt.Maximizable = false;
        var content = $("<div id='dlgContent' style='position:relative;overflow:hidden'></div>");
        var contentDiv = $("<div id='contentDiv' style='position:absolute;top:0px;left:0px;'></div>").appendTo(content);
        contentDiv.append(opt.Content);
        var bottomDiv = $("<div style='border-top:solid #DDDDDD 1px;height:36px;position:absolute;bottom:0px;width:100%;background-color:#F4F4F4'></div>").appendTo(content);
        var btnDiv = $("<div id='btnDiv' style='position:absolute;right:12px;top:5px'></div>").appendTo(bottomDiv);
        var btnOK = $("<a id='ok' tabindex='0' class='easyui-linkbutton' style='padding:0px 8px'></a>").appendTo(btnDiv);
        var btnCancel = $("<a id='cancel' tabindex='0' class='easyui-linkbutton' style='padding:0px 8px;margin-left:12px'>取消</a>").appendTo(btnDiv);
        opt.Content = content;
        var win = new ktw.Window(opt);
        if (!ktw.IsNull(opt.Callback)) win.Callback = opt.Callback;
        win.OK = ktw.IsNull(opt.OK) ? "确定" : opt.OK;
        win.Cancel = ktw.IsNull(opt.Cancel) ? "取消" : opt.Cancel;
        btnOK.linkbutton({ text: win.OK });
        btnCancel.linkbutton({ text: win.Cancel });
        $('#ok', btnDiv).click(function () {
            win.Close();
            if (win.Callback) win.Callback(true);
        });
        $('#cancel', btnDiv).click(function () {
            win.Close();
            if (win.Callback) win.Callback(false);
        });
        win.Show = function (callback, opt) {
            Show(this, callback, opt);
        };
        return win;
    };
})(jQuery);
/*UCMapTool*/
(function ($) {
    function GetIconCls(iconCls, icon) {
        var ic = iconCls;
        if (!ktw.IsString(ic) && ktw.IsString(icon)) {
            var e = icon.lastIndexOf('.');
            if (e > 0) {
                var s = icon.lastIndexOf('/');
                if (s < 0) s = 0;
                if (e - s > 0) {
                    ic = "maptool_" + icon.substring(s + 1, e);
                    ktw.InsertRule(ktw.App.TempStyle, "." + ic,
                        "background: url('" + icon + "') no-repeat center center;");
                }
            }
        }
        return ic;
    }
    function GetMenu(id, items) {
        var menu = $('<div class="easyui-menu" id="' + id + '"></div>');
        var list = ktw.GroupBy(items, "Group", "Order");
        $(list).each(function (j, n) {
            $(n.Items).each(function (i, m) {
                var ic = GetIconCls(m.IconCls, m.Icon);
                var item = $("<div id=\"" + m.Name + "\" data-options="
                    + "\"iconCls:'" + ic + "'\">" + m.Title + "</div>");
                item.appendTo(menu);
            });
            $("<div class='menu-sep'></div>").appendTo(menu);
        });
        $(":last", menu).remove();
        return menu;
    }
    ktw.UCMapTool = function (opt) {
        if (ktw.IsNull(opt)) opt = { ID: "maptool" + new Date().getTime() };
        if (ktw.IsNull(opt.Target)) opt.Target = $("<div class='MapTool'></div>");
        opt.Tools = $.grep(opt.Tools, function (n, i) { return n["IsVisible"] == "true"; });
        $.extend(this, new ktw.Control(opt));
        var list = Enumerable.From(opt.Tools).OrderBy("s=>parseInt(s.Order)").ToArray();
        var $this = this;
        this.ClickHandler = function (ops) {
            if (ops === undefined) ops = $(this).linkbutton("options");
            $this.Target.trigger("onItemClick", ops);
            if (ktw.IsNull(ops.tool) || ops.tool.Type != "Switch") return;
            $(this).linkbutton({
                id: ops.checked ? ops.id_ : ops.id_switch,
                text: ops.checked ? ops.text_ : ops.text_switch,
                iconCls: ops.checked ? ops.iconCls_ : ops.iconCls_switch
            });
            ops.checked = !ops.checked;
        };
        $(list).each(function (j, n) {
            switch (n.Type) {
                case "Normal":
                    var btn = $('<a id="' + n.Name + '" class="easyui-linkbutton"></a>');
                    var options = {
                        plain: true, tool: n,
                        onClick: $this.ClickHandler,
                        iconCls: GetIconCls(n.IconCls, n.Icon)
                    };
                    if (n.IsText == "true") options.text = n.Title;
                    btn.appendTo($this.Target);
                    btn.linkbutton(options);
                    btn.bind("mouseover", function () {
                        $this.Target.trigger("onItemMouseOver", { Sender: this, Ops: options });
                    });
                    btn.bind("mouseleave", function () { $this.Target.trigger("onItemMouseLeave", { Sender: this, Ops: options }); });
                    break;
                case "Switch":
                    var btn = $('<a id="' + n.Name + '" class="easyui-linkbutton"></a>');
                    var options = {
                        plain: true, checked: false,
                        onClick: $this.ClickHandler, tool: n,
                        id: n.Name,
                        id_: n.Name,
                        id_switch: n.Items.Name,
                        iconCls: GetIconCls(n.IconCls, n.Icon),
                        iconCls_: GetIconCls(n.IconCls, n.Icon),
                        iconCls_switch: GetIconCls(n.Items.IconCls, n.Items.Icon),
                        text: (n.IsText == "true") ? n.Title : "",
                        text_: (n.IsText == "true") ? n.Title : "",
                        text_switch: (n.IsText == "true") ? n.Items.Title : ""
                    };
                    btn.appendTo($this.Target);
                    btn.linkbutton(options);

                    break;
                case "Menu":
                    var btn = $('<a id="' + n.Name + '" class="easyui-menubutton"></a>');
                    var ops = {
                        iconCls: GetIconCls(n.IconCls, n.Icon),
                        menu: GetMenu(n.Name + "Menu", n.Items)
                    };
                    ops.menu.menu({ onClick: $this.ClickHandler });
                    if (n.IsText == "true") ops.text = n.Title;
                    btn.menubutton(ops);
                    btn.appendTo($this.Target);
                    break;
                case "Split":
                    var btn = $('<a id="' + n.Name + '" class="easyui-splitbutton"></a>');
                    var ops = {
                        onClick: $this.ClickHandler, tool: n,
                        iconCls: GetIconCls(n.IconCls, n.Icon),
                        menu: GetMenu(n.Name + "Menu", n.Items)
                    };
                    ops.menu.menu({ onClick: $this.ClickHandler });
                    if (n.IsText == "true") ops.text = n.Title;
                    btn.splitbutton(ops);
                    btn.appendTo($this.Target);
                    break;
            }
        });
        this.Target.appendTo(opt.Parent);
        var width = 0;
        this.Target.children().each(function () {
            width += $(this).outerWidth();
        });
        this.SetWidth(width);
    };
})(jQuery);
/*UCMapMenu*/
(function ($) {
    /*add by wlf to filter menus by proporty IsVisible at 2017-6-7 10:40:33*/
    function filter(menus) {
        var ms = [];
        if (ktw.IsNull(menus)) return ms;
        menus = $(menus);
        for (var i = 0; i < menus.length; i++) {

            if (ktw.IsNull(menus[i].IsVisible)) ms.push(menus[i]);
            else if (menus[i].IsVisible == "true") ms.push(menus[i]);
        }
        return ms;
    }
    ktw.UCMapMenu = function (opt) {
        if (ktw.IsNull(opt)) opt = { ID: "mapmenu" + new Date().getTime() };
        if (ktw.IsNull(opt.Target)) opt.Target = $("<div class='easyui-menu'></div>");
        $.extend(this, new ktw.Control(opt));
        var $this = this;
        this.ClickHandler = function (ops) {
            $this.Target.trigger("onItemClick", ops);
        };
        var ms = filter(opt.Menus);
        var list = ktw.GroupBy(ms, "Group", "Order");
        $(list).each(function (j, n) {
            $(n.Items).each(function (i, m) {
                var ic = m.IconCls;
                if (!ktw.IsString(ic) && ktw.IsString(m.Icon)) {
                    var e = m.Icon.lastIndexOf('.');
                    if (e > 0) {
                        var s = m.Icon.lastIndexOf('/');
                        if (s < 0) s = 0;
                        if (e - s > 0) {
                            ic = "mapmenu_" + m.Icon.substring(s + 1, e);
                            ktw.InsertRule(ktw.App.TempStyle, "." + ic,
                                "background: url('" + m.Icon + "') no-repeat center center;");
                        }
                    }
                }
                var item = $("<div id=\"" + m.Name + "\" data-options=\"iconCls:'"
                    + ic + "'\">" + m.Title + "</div>");
                item.appendTo($this.Target);
            });
            $("<div class='menu-sep'></div>").appendTo($this.Target);
        });
        $(":last", $this.Target).remove();
        this.Target.appendTo(document.body);
        this.Target.menu({ onClick: this.ClickHandler });
        $(opt.LinkDOM).bind('contextmenu', function (e) {
            e.preventDefault();
            $this.Target.menu('show', { left: e.pageX, top: e.pageY });
        });
    };
})(jQuery);
/*UCMapSwitch*/
(function ($) {
    ktw.UCMapSwitch = function (opt) {
        if (ktw.IsNull(opt)) opt = { ID: "MapSwitch" + new Date().getTime() };
        if (ktw.IsNull(opt.Target)) opt.Target = $('<div class="MapSwitch"></div>');
        var $this = this;
        $this.map = opt.map || ktw.App.Map;
        $this.Target = opt.Target;
        try {
            opt.SwitchWidth = parseFloat(opt.SwitchWidth);
            opt.SwitchHeight = parseFloat(opt.SwitchHeight);
        } catch (ex) { }
        this.SwitchWidth = ktw.IsNumber(opt.SwitchWidth) ? opt.SwitchWidth : 40;
        this.SwitchHeight = ktw.IsNumber(opt.SwitchHeight) ? opt.SwitchHeight : 40;
        //this.SwitchMaps = Enumerable.From(opt.SwitchMaps).Where("s=>s.IsVisible==='true'&&s.IsFloat==='true'").ToArray();
        this.SwitchMaps = Enumerable.From(opt.SwitchMaps).Where("s=>s.IsVisible==='true'").ToArray();
        opt.Width = (this.SwitchMaps.length * (this.SwitchWidth + 15)) - 8;
        this.VerticalAlignment = ktw.IsNull(opt.VerticalAlignment) ? "top" : opt.VerticalAlignment;
        this.HorizontalAlignment = ktw.IsNull(opt.HorizontalAlignment) ? "right" : opt.HorizontalAlignment;
        this.Top = ktw.IsNull(opt.Margin.Top) ? 20 : parseInt(opt.Margin.Top);
        this.Left = ktw.IsNull(opt.Margin.Left) ? 20 : parseInt(opt.Margin.Left);
        this.Right = ktw.IsNull(opt.Margin.Right) ? 20 : parseInt(opt.Margin.Right);
        this.Bottom = ktw.IsNull(opt.Margin.Bottom) ? 20 : parseInt(opt.Margin.Bottom);
        $.extend(this, new ktw.Control(opt));
        this.SetWidth(opt.SwitchWidth);
        var v = opt.VerticalAlignment;
        var h = opt.HorizontalAlignment;
        if (this.VerticalAlignment === "top") {
            this.Target.css({ "top": this.Top + "px" });
        } else {
            this.Target.css({ "bottom": this.Bottom + "px" });
        }
        if (this.HorizontalAlignment === "left") {
            this.Target.css({ "left": this.Left + "px" });
        } else {
            this.Target.css({ "right": this.Right + "px" });
        }
        /*修改切换图层图标位置设置*/
        /*this.Target.css({
         "top": (this.VerticalAlignment === "top" ? this.Top : this.Bottom) + "px",
         "right": (this.HorizontalAlignment === "left" ? this.Left : this.Right) + "px"
         });*/
        var types = [];
        this.SwitchMaps = Enumerable.From(this.SwitchMaps).OrderBy('s=>s.Order').ToArray();
        for (var i = 0; i < this.SwitchMaps.length; i++) {
            types.push(this.SwitchMaps[i].Type);
            var div = $('<div id="' + this.SwitchMaps[i].ID + '" class="MapSwitch-Single" style="width:' + (this.SwitchWidth) + 'px;height:' + (this.SwitchHeight) + 'px;right:' + (i === 0 ? 1 : i * (this.SwitchWidth + 15)) + 'px;display:' + (i === 0 ? "block" : "none") + ';background-image:url(' + ktw.App.Root + this.SwitchMaps[i].BackImg + ');"></div>');
            div.css({ "border": "1px solid #979393" });
            div.mouseover(function () {
                var id = $(this).attr("id");
                if (id === $this.SwitchMaps[0].ID) {
                    for (var j = 0; j < $(this).parent()[0].children.length; j++) $($(this).parent()[0].children[j]).css({ "display": "block" });
                }
                $("#" + id + "content").css({
                    "background-color": "#0000FF",
                    "opacity": "0.4",
                    "filter": "alpha(opacity:40)"
                });
                $(this).css({ "border": "1px solid #f3f5f6" });
            }).mouseleave(function () {
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
                $this.SetStyleByType(currType, $this.SwitchMaps);
                ktw.SetLayersVisble(types, currType, $this.map);
                $this.Target.triggerHandler("onSwitch", currType);
            });
            var contentid = this.SwitchMaps[i].ID + "content";
            var divcontent = $('<div id="' + contentid + '" class="MapSwitch-ContentTip" style="margin-top:' + (this.SwitchHeight - 20) + 'px;"></div>');
            divcontent.appendTo(div);
            var textid = this.SwitchMaps[i].ID + "text";
            var divText = $('<span id="' + textid + '" style="font-size:12px;color:#fff" tag="' + this.SwitchMaps[i].Type + '">' + this.SwitchMaps[i].Text + '</span>');
            divText.appendTo(divcontent);
            div.appendTo(this.Target);
        }
        this.MapTypes = types;
        this.type = types[0];
        this.Target.mouseleave(function () {
            var childrens = $(this).children();
            for (var j = 0; j < childrens.length; j++) {
                if ($(childrens[j]).attr("id") === $this.SwitchMaps[0].ID) continue;
                $(childrens[j]).css({ "display": "none" });
            }
            $(this).css({ width: $this.SwitchWidth + "px" });
        });
        this.Target.mouseover(function () {
            $(this).css({ width: opt.Width + "px" });
        });
        this.Target.appendTo(opt.Parent);
    };
    $.fn.extend(ktw.UCMapSwitch.prototype, {
        SetStyleByType: function (type, switchMaps) {
            if (this.MapTypes.indexOf(type) < 0) return;
            for (var i = 0; i < switchMaps.length; i++) {
                var id = switchMaps[i].ID;
                $("#" + id).css({ "background-image": 'url("' + ktw.App.Root + switchMaps[i].BackImg + '")' });
                $("#" + id + "text").html(switchMaps[i].Text);
                $("#" + id + "text").attr("tag", switchMaps[i].Type);
            }

            //var selectid = type + "Map";
            var defaultid = switchMaps[0].ID;
            var selectMap = Enumerable.From($(switchMaps)).Where("s=>s.Type==='" + type + "'").ToArray();
            var selectid = selectMap[0].ID;
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
            this.Target.triggerHandler("onSwitch", type);
            this.type = type;
        }
    });
})(jQuery);
/*UCScreenPanel*/
(function ($) {
    ktw.UCScreenPanel = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.Target = $('<div class="Panel-Screen"></div>');
        $.extend(this, new ktw.Control(opt));
        this.leftBox = $('<div class="Panel-Screen-Left"></div>').appendTo(this.Target);
        this.rightBox = $('<div class="Panel-Screen-Right"></div>').appendTo(this.Target);
        this.SplitBorderWidth = ktw.IsNull(opt.SplitBorderWidth) ? 1 : opt.SplitBorderWidth;
        this.SplitBorderColor = ktw.IsNull(opt.SplitBorderColor) ? "red" : opt.SplitBorderColor;
        if (this.SplitBorderWidth > 0) {
            this.splitBorder = $("<div style='position:absolute;height:100%;'></div>").appendTo(this.Target);
            this.splitBorder.css({ width: this.SplitBorderWidth + "px", "background-color": this.SplitBorderColor });
        }
    }
    $.fn.extend(ktw.UCScreenPanel.prototype, {
        Layout: function () {
            var w = this.Target.outerWidth(), l = 0, r = 0;
            if (this.splitBorder) w -= this.SplitBorderWidth;
            if (w % 2 == 0) l = r = w / 2;
            else {
                l = (w + 1) / 2;
                r = w - l;
            }
            this.leftBox.css("width", l + "px");
            this.rightBox.css("width", r + "px");
            if (this.splitBorder) this.splitBorder.css("left", l + "px");
        },
        AddContent: function (element, isLeft) {
            var $this = this;
            if (ktw.IsNull(isLeft)) isLeft = true;
            if (ktw.IsString(element)) {
                var frame = ktw.CreateFrame(element, false);
                var waitbox = new ktw.UCWaitBox(this.Target);
                frame.bind('load', function () {
                    waitbox.Close();
                    $this.Target.triggerHandler("onLoaded", isLeft);
                });
                if (isLeft) $this.leftBox.html(frame);
                else $this.rightBox.html(frame);
                waitbox.Show();
            }
            else if (ktw.IsObject(element)) {
                if (isLeft) $this.leftBox.append($(element));
                else $this.rightBox.append($(element));
                $this.Target.triggerHandler("onLoaded", isLeft);
            }
        },
        RemoveContent: function (element, isLeft) {
            if (ktw.IsNull(isLeft)) isLeft = true;
            element = ktw.IsString(element) ? $('#' + element, (isLeft ? this.leftBox : this.rightBox)) : (ktw.IsObject(element) ? $(element) : null);
            if (element == null || element.length == 0) return;
            element.remove();
        },
        ClearContent: function (isLeft) {
            if (ktw.IsNull(isLeft)) {
                this.leftBox.empty();
                this.rightBox.empty();
            }
            if (isLeft) this.leftBox.empty();
            else this.rightBox.empty();
        }
    });
})(jQuery);
/*SplitScreen*/
(function ($) {
    function InitMap(parent, defaultConfig, view) {
        var map = new ktw.Map({
            controls: new ktw.control.defaults({
                zoom: false,
                rotate: false,
                attribution: false
            }),
            interactions: ktw.interaction.defaults().extend([
                new ktw.interaction.DragRotateAndZoom()
            ]),
            target: parent[0],
            logo: false,
            view: view
        });
        if (ktw.IsNull(defaultConfig)) defaultConfig = ktw.App.Config.SystemMap;
        for (var i = 0; i < defaultConfig.LayerInfo.BaseLayers.length; i++) {
            if (defaultConfig.LayerInfo.BaseLayers[i].Type == "TempVector") continue;
            var currlayer = ktw.MapUtils.GetLayer(defaultConfig.LayerInfo.BaseLayers[i].Name, ktw.App.Map);
            if (ktw.IsNull(currlayer)) continue;
            defaultConfig.LayerInfo.BaseLayers[i].Visible = currlayer.getVisible();
        }
        ktw.MapLoad.InitMap($.extend({ Map: map }, defaultConfig));
        var initExtent = [parseFloat(defaultConfig.Extent.XMin), parseFloat(defaultConfig.Extent.YMin), parseFloat(defaultConfig.Extent.XMax), parseFloat(defaultConfig.Extent.YMax)];
        map.getView().fit(initExtent, map.getSize());
        return map;
    }
    function InitNavigation(parent, map, defaultConfig) {
        if (ktw.IsNull(defaultConfig)) defaultConfig = ktw.App.Config.SystemMap;
        var param = $.extend({
            Map: map,
            Parent: parent,
        }, defaultConfig.LevelInfo);
        var navigation = new $.UCNavigation(param);
        return navigation;
    }
    function InitScaleLine(map) {
        var scaleLine = new ktw.control.ScaleLine();
        scaleLine.id = "scaleLine";
        $(scaleLine.element).bind("mouseover", function () { $(this).css("opacity", 1); });
        $(scaleLine.element).bind("mouseout", function () { $(this).css("opacity", 0.2); });
        map.on('postrender', function () {
            var text = $(":first", scaleLine.element);
            text.html(text.html().replace("mm", "毫米").replace("km", "千米").replace("m", "米"));
        });
        map.addControl(scaleLine);
        return scaleLine;
    }
    ktw.UCSplitScreen = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        opt.SplitBorderColor = "#0099CC";
        $.extend(this, new ktw.UCScreenPanel(opt));
        this.LeftBottomHeight = ktw.IsNumber(opt.LeftBottomHeight) ? opt.LeftBottomHeight : 120;
        this.RightBottomHeight = ktw.IsNumber(opt.RightBottomHeight) ? opt.RightBottomHeight : 120;
        this.LeftBottomVisible = ktw.IsBoolean(opt.LeftBottomVisible) ? opt.LeftBottomVisible : opt.LeftBottomVisible != "false";
        this.RightBottomVisible = ktw.IsBoolean(opt.RightBottomVisible) ? opt.RightBottomVisible : opt.RightBottomVisible != "false";
        this.LeftTopContent = $('<div class="Panel-SplitScreenTop"></div>').appendTo(this.leftBox);
        this.LeftBottomContent = $('<div class="Panel-SplitScreenBottom" style="height:' + this.LeftBottomHeight + 'px"></div>').appendTo(this.leftBox);
        if (!this.LeftBottomVisible) this.LeftBottomContent.css("display", "none");
        this.RightTopContent = $('<div id="rigthtop" class="Panel-SplitScreenTop"></div>').appendTo(this.rightBox);
        this.RightBottomContent = $('<div id="rightbottom" class="Panel-SplitScreenBottom" style="height:' + this.RightBottomHeight + 'px"></div>').appendTo(this.rightBox);
        if (!this.RightBottomVisible) this.RightBottomContent.css("display", "none");
        this.LeftMapDom = $("<div id='splitleftmap' class='Panel-SplitScreenMap'></div>").appendTo(this.LeftTopContent);
        this.RightMapDom = $("<div id='splitrightmap' class='Panel-SplitScreenMap'></div>").appendTo(this.RightTopContent);
        this.Isinit = true;//显示地图
        this.NavigationVisible = ktw.IsBoolean(opt.NavigationVisible) ? opt.NavigationVisible : opt.NavigationVisible != "false";
        this.ScaleLineVisible = ktw.IsBoolean(opt.ScaleLineVisible) ? opt.ScaleLineVisible : opt.ScaleLineVisible != "false";
    }
    $.fn.extend(ktw.UCSplitScreen.prototype, {
        LayoutEx: function () {
            this.Layout();
            var height = this.GetActualHeight();
            if (!this.LeftBottomVisible) this.LeftTopContent.css("height", height + "px");
            else {
                var th = height - this.LeftBottomHeight;
                this.LeftTopContent.css("height", (th < 0 ? "0px" : th + "px"));
                this.LeftBottomContent.css("top", (th < 0 ? "0px" : th + "px"));
                this.LeftBottomContent.css("height", this.LeftBottomHeight + "px");
            }
            if (!this.RightBottomVisible) this.RightTopContent.css("height", height + "px");
            else {
                var th = height - this.RightBottomHeight;
                this.RightTopContent.css("height", (th < 0 ? "0px" : th + "px"));
                this.RightBottomContent.css("top", (th < 0 ? "0px" : th + "px"));
                this.RightBottomContent.css("height", this.RightBottomHeight + "px");
            }
            if (this.Isinit) {
                this.Isinit = false;
                var initconfig = ktw.App.Config.SystemMap;
                var resolutions;
                if (!ktw.IsNull(initconfig.LevelInfo) && !ktw.IsNull(initconfig.LevelInfo.IsVisibleLevel)
                    && initconfig.LevelInfo.IsVisibleLevel == "true") {
                    resolutions = [];
                    for (var i = 0; i < initconfig.LevelInfo.Levels.length; i++)
                        resolutions.push(parseFloat(initconfig.LevelInfo.Levels[i].Resolution));
                }
                var mapview = new ktw.View({
                    projection: ktw.proj.get('EPSG:4326'),
                    resolutions: resolutions,
                    minZoom: 1,
                    maxResolution: initconfig.LevelInfo.MaxResolution,
                    maxZoom: 20,
                    minResolution: initconfig.LevelInfo.MinResolution,
                })
                this.LeftMap = InitMap(this.LeftMapDom, null, mapview);
                this.RightMap = InitMap(this.RightMapDom, null, mapview);
                var $this = this;
                this.leftsingleclick = this.LeftMap.on("singleclick", function (o, e) {

                    $this.Target.triggerHandler("OnMapClick", { data: o, map: $this.LeftMap, isleft: true });
                });
                this.rightsingleclick = this.RightMap.on("singleclick", function (o, e) {

                    $this.Target.triggerHandler("OnMapClick", { data: o, map: $this.RightMap, isleft: false });
                });
                if (this.NavigationVisible) {
                    this.LeftNavigation = InitNavigation(this.LeftTopContent, this.LeftMap);
                    this.RightNavigation = InitNavigation(this.RightTopContent, this.RightMap);
                }
                if (this.ScaleLineVisible) {
                    this.LeftScaleLine = InitScaleLine(this.LeftMap);
                    this.RightScaleLine = InitScaleLine(this.RightMap);
                }
            }
            if (!ktw.IsNull(this.LeftMap)) this.LeftMap.updateSize();
            if (!ktw.IsNull(this.RightMap)) this.RightMap.updateSize();
        },
        Resize: function () {
            this.LayoutEx();
            this.Target.triggerHandler("onSplitResize");
        },
        SetBottomContentVisible: function (visible, isLeft) {
            if (ktw.IsNull(visible) || !ktw.IsBoolean(visible)) return;
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (isLeft) {
                if (this.LeftBottomVisible == visible) return;
                this.LeftBottomContent.css({ display: visible ? "block" : "none" });
                this.LeftBottomVisible = visible;
            }
            else {
                if (this.RightBottomVisible == visible) return;
                this.RightBottomContent.css({ display: visible ? "block" : "none" });
                this.RightBottomVisible = visible;
            }
            this.LayoutEx();
        },
        SetBottomContentHeight: function (height, isLeft) {
            if (ktw.IsNull(height) || !ktw.IsNumber(height)) return;
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (isLeft) this.LeftBottomHeight = height;
            else this.RightBottomHeight = height;
            this.LayoutEx();
        },
        SetNavigationVisible: function (visible, isLeft) {
            if (ktw.IsNull(visible) || !ktw.IsBoolean(visible)) return;
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (isLeft) $(this.LeftNavigation.Target).css({ display: visible ? "block" : "none" });
            else $(this.RightNavigation.Target).css({ display: visible ? "block" : "none" });
        },
        SetScaleLineVisible: function (visible, isLeft) {
            if (ktw.IsNull(visible) || !ktw.IsBoolean(visible)) return;
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (isLeft) {
                if (!visible) {
                    if (ktw.IsNull(this.LeftScaleLine)) return;
                    this.LeftMap.removeControl(this.LeftScaleLine);
                    this.LeftScaleLine = null;
                }
                else this.LeftScaleLine = InitScaleLine(this.LeftMap);
            }
            else {
                if (!visible) {
                    if (ktw.IsNull(this.RightScaleLine)) return;
                    this.RightMap.removeControl(this.RightScaleLine);
                    this.RightScaleLine = null;
                }
                else this.RightScaleLine = InitScaleLine(this.RightMap);
            }
        },
        SetSplitBorderStyle: function (style) {
            if (ktw.IsNull(style) || !ktw.IsString(style)) return;
            this.LeftTopContent.css({ "border-right": style });
            this.LeftBottomContent.css({ "border-right": style });
        },
        SetBottomBorderTop: function (border, isLeft) {
            if (ktw.IsNull(border) || !ktw.IsString(border)) return;
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (isLeft) this.LeftBottomContent.css({ "border-top": border });
            else this.RightBottomContent.css({ "border-top": border });
        },
        Add: function (element, isTop, isLeft) {
            if (ktw.IsNull(element)) return;
            isTop = ktw.IsBoolean(isTop) ? isTop : isTop != "false";
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (ktw.IsString(element)) {
                var frame = ktw.CreateFrame(element, false);
                var waitbox = new ktw.UCWaitBox(this.Target);
                frame.bind('load', function () {
                    waitbox.Close();
                    $this.Target.triggerHandler("onSplitContentLoaded", { IsTop: isTop, IsLeft: isLeft });
                });
                if (isTop) {
                    if (isLeft) this.LeftTopContent.html(frame);
                    else this.RightTopContent.html(frame);
                }
                else {
                    if (isLeft) this.LeftBottomContent.html(frame);
                    else this.RightBottomContent.html(frame);
                }
                waitbox.Show();
            }
            else if (ktw.IsObject(element)) {
                if (isTop) {
                    if (isLeft) this.LeftTopContent.append($(element));
                    else this.RightTopContent.append($(element));
                }
                else {
                    if (isLeft) this.LeftBottomContent.append($(element));
                    else this.RightBottomContent.append($(element));
                }
            }
        },
        Remove: function (element, isTop, isLeft) {
            if (ktw.IsNull(element)) return;
            isTop = ktw.IsBoolean(isTop) ? isTop : isTop != "false";
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            var parent = this.LeftTopContent;
            if (isTop) parent = isLeft ? this.LeftTopContent : this.RightTopContent;
            else parent = isLeft ? this.LeftBottomContent : this.RightBottomContent;
            element = ktw.IsString(element) ? $('#' + element, parent) : (ktw.IsObject(element) ? $(element) : null);
            if (element == null || element.length == 0) return;
            element.remove();
        },
        Clear: function (isLeft) {
            isLeft = ktw.IsBoolean(isLeft) ? isLeft : isLeft != "false";
            if (isLeft) this.LeftBottomContent.empty();
            else this.RightBottomContent.empty();
        },
        Destroy: function () {
            this.Target.unbind("OnMapClick");
            this.Target.unbind("onSplitResize");
            if (!ktw.IsNull(this.leftsingleclick)) this.LeftMap.unByKey(this.leftsingleclick);
            if (!ktw.IsNull(this.rightsingleclick)) this.RightMap.unByKey(this.rightsingleclick);
        }
    });
})(jQuery);
/*UCTimeLine时间轴*/
(function ($) {
    function PositionChanged(point, offset) {
        var currleft = $(point).css("left");
        if (currleft != null && currleft != "") currleft = parseInt(currleft.substring(0, currleft.length + offset));
        var currtop = $(point).css("top");
        if (currtop != null && currtop != "") currtop = parseInt(currtop.substring(0, currtop.length + offset));
        $(point).css({ "left": (currleft + offset) + "px", "top": (currtop + offset) + "px" });
    }
    ktw.UCTimeLine = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.Data = ktw.IsNull(opt.Data) ? [{ Text: "开始", Children: [{ Text: "1" }, { Text: "2" }] }] : opt.Data;
        this.IsHorizontal = ktw.IsBoolean(opt.IsHorizontal) ? opt.IsHorizontal : opt.IsHorizontal != "false";
        this.Left = ktw.IsNumber(opt.Left) ? opt.Left : 0;
        this.Top = ktw.IsNumber(opt.Top) ? opt.Top : 0;
        this.autoIndex = 0;
        this.SelectIndex = ktw.IsNumber(opt.SelectIndex) ? opt.SelectIndex : 2;
        this.CircleSelectable = ktw.IsBoolean(opt.CircleSelectable) ? opt.CircleSelectable : opt.CircleSelectable != "true";//圈是否可选
        if (this.IsHorizontal) opt.Target = $('<div class="TimeLine" style="width:' + (ktw.IsNumber(opt.Width) ? (opt.Width + "px") : "100%") + '; height:' + (ktw.IsNumber(opt.Height) ? opt.Height : 50) + 'px;left:' + this.Left + 'px;top:' + this.Top + 'px;">');
        else opt.Target = $('<div class="TimeLine" style="width:' + (ktw.IsNumber(opt.Width) ? opt.Width : 50) + 'px;height:' + (ktw.IsNumber(opt.Height) ? (opt.Height + "px") : "100%") + '; overflow:hidden;left:' + this.Left + 'px;top:' + this.Top + 'px;">');
        $.extend(this, new ktw.Control(opt));
        var $this = this;
        this.playButton = $('<div class="playbutton"><div class="imagestop"></div></div>');
        this.playButton.bind("click", function () {
            if ($("div", this).hasClass("imageplay")) $this.Start();
            else $this.Stop();
        });
        this.playButton.appendTo(opt.Target);
    }
    $.fn.extend(ktw.UCTimeLine.prototype, {
        Layout: function () {
            var $this = this;
            var yearNum = this.Data.length;
            var pointNum = Enumerable.From(this.Data).Sum('s=>s.Children.length');
            var pointsLength = pointNum * 20;
            var yearsLength = (yearNum + 1) * 36;
            var minLength = pointsLength + yearsLength;
            var allLength;
            if (this.IsHorizontal) allLength = ktw.IsNumber(this.Width) ? this.Width : (this.Target.width() - this.Left);
            else allLength = ktw.IsNumber(this.Height) ? this.Height : (this.Target.height() - this.Top);
            var margin = 5;
            if (allLength == minLength) margin = 0;
            if (allLength > minLength) {
                var splitnum = (yearNum + pointNum);
                margin = Math.round((allLength - minLength - 5) / splitnum);
            }
            var initpoisiton = (36 - 20) / 2;
            var position = 32;
            if ($(".Line", this.Target).length <= 0) {
                var style = "";
                if (this.IsHorizontal) style = "height:4px;top:16px;left:" + position + "px;";
                else style = "width:4px;top:16px;left:" + position + "px;";
                var line = $('<div class="Line" style="' + style + '"></div>');
                this.Target.append(line);
                var selectindex = 1;
                for (var i = 0; i < this.Data.length; i++) {
                    var itemYear = this.Data[i];
                    if (i > 0) {
                        var prePointNum = this.Data[i - 1].Children.length;
                        position = position + 36 + prePointNum * 20 + (prePointNum + 1) * margin;
                    }
                    var circlestyle = this.IsHorizontal ? ("left:" + position + "px") : ("top:" + position + "px");
                    var yearpoint = $('<div class="Circle" selectIndex=' + (selectindex === 1 ? 1 : (selectindex = selectindex + 1)) + ' index=' + i + ' yearTag="' + itemYear.Text + '" style="' + circlestyle + '">' + itemYear.Text + '</div>');//top 和left互换了
                    this.Target.append(yearpoint);
                    yearpoint.mouseover(itemYear, function (o) {
                        // if ($(this).hasClass("SelectCircle")) $this.Target.triggerHandler("onSelectedMouseover", { Point: this, Data: o.data });
                    });
                    yearpoint.mouseleave(itemYear, function (o) {
                        // if ($(this).hasClass("SelectCircle")) $this.Target.triggerHandler("onSelectedMouseleave", { Point: this, Data: o.data });
                    });
                    yearpoint.click(itemYear, function (o) {
                        $this.Stop();
                        var index = $(this).index() - 1;
                        if ($this.CircleSelectable) $this.Select(index);
                        $this.Target.triggerHandler("onTimePointClick", {
                            Year: $(this).html(),
                            State: "YearPoint",
                            Data: o.data,
                            SelectIndex: index
                        });
                    });
                    if (ktw.IsNull(itemYear.Children) || itemYear.Children.length === 0) continue;
                    for (var j = 0; j < itemYear.Children.length; j++) {
                        var itemPoint = itemYear.Children[j];
                        var newposition = position + 36 + (j + 1) * margin + j * 20;
                        var point = $('<div class="Point" selectIndex=' + (selectindex = selectindex + 1) + ' style="left:' + (this.IsHorizontal ? newposition : initpoisiton) + 'px;top:' + (this.IsHorizontal ? initpoisiton : newposition) + 'px" index="' + j + '" title="' + itemPoint.Text + '" tag="' + itemYear.Text + '"></div>');//top 和left互换了
                        point.mouseover(itemPoint, function (o) {
                            if ($(this).hasClass("Point")) {
                                $(this).attr("hover", "1");
                                PositionChanged(this, -2);
                            }
                            else if ($(this).hasClass("SelectPoint")) $this.Target.triggerHandler("onSelectedMouseover", {
                                Point: this,
                                Data: o.data
                            });
                        });
                        point.mouseleave(itemPoint, function (o) {
                            if ($(this).hasClass("Point")) {
                                $(this).attr("hover", "0");
                                PositionChanged(this, 2);
                            }
                            else if ($(this).hasClass("SelectPoint")) $this.Target.triggerHandler("onSelectedMouseleave", {
                                Point: this,
                                Data: o.data
                            });
                        });
                        point.click(itemPoint, function (o) {
                            $this.Stop();
                            var index = $(this).index() - 1;
                            $this.Select(index);
                            $this.Target.triggerHandler("onTimePointClick", {
                                Year: $(this).attr("tag"),
                                TimePoint: $(this).attr("title"),
                                PointIndex: $(this).attr("index"),
                                State: "Point",
                                Data: o.data,
                                SelectIndex: index
                            });
                        });
                        this.Target.append(point);
                    }
                }
                var endposition = (yearNum + pointNum) * margin + yearNum * 36 + pointNum * 20;
                if (this.IsHorizontal) line.css({ width: (endposition - 48) + "px" });
                else line.css({ height: endposition + "px" });
                var endpoint = $('<div class="Circle" selectIndex=' + (selectindex = selectindex + 1) + ' index=' + yearNum + ' style="left:' + (this.IsHorizontal ? endposition : 0) + 'px;top:' + (this.IsHorizontal ? 0 : endposition) + 'px;">总计</div>');
                endpoint.click(function (o) {
                    $this.Stop();
                    var index = $(this).index() - 1;
                    $this.Target.triggerHandler("onTimePointClick", { State: "End", SelectIndex: index });
                });
                this.Target.append(endpoint);
                this.Select(this.SelectIndex);
                this.Start();
            }
            else {
                var children = this.Target.children();
                var lineLength = (yearNum + pointNum) * margin + yearNum * 36 + pointNum * 20;
                for (var m = 0; m < children.length ; m++) {
                    var o = $(children[m]);
                    if (o.hasClass("Line"))
                        o.css((this.IsHorizontal ? "width" : "height"), lineLength + "px");
                    else if (o.hasClass("Circle") || o.hasClass("SelectCircle")) {
                        var circleIndex = parseInt($(o).attr("index"));
                        if (children.length - 1 === m) position = lineLength;
                        else if (circleIndex > 0) {
                            var prePointNum = this.Data[circleIndex - 1].Children.length;
                            position = position + 36 + prePointNum * 20 + (prePointNum + 1) * margin;
                        }
                        o.css((this.IsHorizontal ? "left" : "top"), position + "px");
                    }
                    else if (o.hasClass("Point") || o.hasClass("SelectPoint")) {
                        var pointIndex = parseInt($(o).attr("index"));
                        var newposition = position + 36 + (pointIndex + 1) * margin + pointIndex * 20;
                        o.css((this.IsHorizontal ? "left" : "top"), newposition + "px");
                    }
                }
            }
        },
        Resize: function () {
            if (this.IsHorizontal) this.Width = this.Target.width();
            else this.Height = this.Target.heightS();
            this.Layout();
        },
        Select: function (index) {
            index = index + 1;//SelectCircle
            var points = this.Target.children();
            if (points.length - 1 <= index) return;
            var currentPoint = $(points[index]);
            var prePoint = $(points[(this.SelectIndex + 1)]);
            var isSelect = false;
            if (prePoint.hasClass("SelectPoint")) {
                prePoint.removeClass("SelectPoint").addClass("Point");
                isSelect = true;
            }
            else if (prePoint.hasClass("SelectCircle")) {
                prePoint.removeClass("SelectCircle").addClass("Circle");
                isSelect = true;
            }
            var data = null;
            if (currentPoint.hasClass("Point")) {
                this.autoIndex = $(".Point,.SelectPoint", this.Target).index(currentPoint);
                if (currentPoint.attr("hover") === "1") {
                    PositionChanged(currentPoint[0], 2);
                    currentPoint.attr("hover", "0");
                }
                currentPoint.removeClass("Point").addClass("SelectPoint");
                var brotherCircle = currentPoint.prevAll("[yearTag=" + currentPoint.attr("tag") + "]");
                data = {
                    Year: currentPoint.attr("tag"),
                    TimePoint: currentPoint.attr("title"),
                    PointIndex: currentPoint.attr("index"),
                    State: "Point",
                    Data: this.Data[parseInt(brotherCircle.attr("index"))].Children[parseInt(currentPoint.attr("index"))]
                };
            }
            else if (currentPoint.hasClass("Circle")) {
                currentPoint.removeClass("Circle").addClass("SelectCircle");
                data = {
                    Year: currentPoint.html(),
                    State: "YearPoint",
                    Data: this.Data[parseInt(currentPoint.attr("index"))]
                }
            }
            this.SelectIndex = index - 1;
            this.Target.triggerHandler("onTimePointSelect", data);//触发index
        },
        Start: function () {
            var $this = this;
            if ($("div", this.playButton).hasClass('imageplay'))
                $("div", this.playButton).removeClass("imageplay").addClass("imagestop");
            var points = $(".Point,.SelectPoint", $this.Target);
            if (!ktw.IsNull(this.interval)) {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.interval = setInterval(function () {
                var index = parseInt($(points[$this.autoIndex]).attr("selectIndex"));
                $this.Select(index);
                $this.autoIndex++;
                if ($this.autoIndex === points.length) $this.autoIndex = 0;
            }, 5000);
        },
        Stop: function () {
            if ($("div", this.playButton).hasClass('imageplay')) return;
            if (!ktw.IsNull(this.interval)) {
                clearInterval(this.interval);
                this.interval = null;
            }
            if ($("div", this.playButton).hasClass('imagestop'))
                $("div", this.playButton).removeClass("imagestop").addClass("imageplay");
        },
        SetBackGround: function (background) {
            if (ktw.IsNull(background) || !ktw.IsString(background)) return;
            this.Target.css({ "background": background });
        }
    });
})(jQuery);
/*UCTypeLayerTree专题图层树*/
(function ($) {
    function ConvertToTreeDatas(data) {
        var treeData = [];
        ToTreeData(data, treeData);
        return treeData;
    };
    function ToTreeData(data, treeDatas) {
        data = Enumerable.From($(data)).Where('s=>s.Visible!="false"').OrderBy('a=>parseInt(a.Order)').ToArray();
        $.each(data, function (i, o) {
            var treedata = {};
            treedata.id = o.ID;
            treedata.text = o.AliasName;
            treedata.name = o.Name;
            if (o.IsExpand == undefined || o.IsExpand == "true") treedata.state = "open";
            else treedata.state = "closed";
            if (!ktw.IsNull(o.Icon)) {
                ktw.InsertIconRule(ktw.App.TempStyle,
              ".layertreeIconof" + o.ID, o.Icon);
                treedata.iconCls = "layertreeIconof" + o.ID;
            }
            if (!ktw.IsNull(o.IconCls)) treedata.iconCls = o.IconCls;
            treedata.checked = o.IsChecked === "true";
            if (!ktw.IsNull($(o.Children)) && $(o.Children).length > 0) {
                if (treedata.checked) {
                    var checkedchilds = Enumerable.From(o.Children).Where('s=>s.IsChecked!="false"').ToArray();
                    if (ktw.IsNull(checkedchilds) || checkedchilds.length < o.Children.length) treedata.checked = false;
                }
                treedata.children = [];
                ToTreeData(o.Children, treedata.children);
            }
            treedata.attributes = {};
            $.extend(treedata.attributes, o);
            treeDatas.push(treedata);
        });
    };
    function GetNeedData(node, checked) {
        var needdata = { NodeID: node.id, NodeName: node.name, NodeAttributes: node.attributes, Checked: checked };
        return needdata;
    }
    ktw.UCTypeLayerTree = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.Width = ktw.IsNumber(opt.Width) ? opt.Width + "px" : ktw.IsString(opt.Width) ? opt.Width : "100%";
        this.Height = ktw.IsNumber(opt.Height) ? opt.Height + "px" : ktw.IsString(opt.Height) ? opt.Height : "100%";
        this.Data = ktw.IsNull(opt.Data) ? ktw.App.Config.TreeLayers : opt.Data;
        opt.Target = $('<div style="width:' + this.Width + ';height:' + this.Height + '"></div>');
        $.extend(this, new ktw.Control(opt));
        this.Tree = $('<ul class="easyui-tree" data-options="animate:true,checkbox:true" style="height:100%;;width:100%;"></ul>');
        this.Target.append(this.Tree);
    }
    $.fn.extend(ktw.UCTypeLayerTree.prototype, {
        Layout: function () {
            var $this = this;
            var treedata = ConvertToTreeDatas(this.Data);
            this.Tree.tree({
                animate: true,
                checkbox: true,
                data: treedata,
                onCheck: function (node, checked) {
                    var senddata = [];
                    var isLeaf = $this.Tree.tree('isLeaf', node.target);
                    if (isLeaf) senddata.push(GetNeedData(node, checked));
                    else {
                        var children = node.children;
                        for (var i = 0; i < children.length; i++) senddata.push(GetNeedData(children[i], checked));
                    }
                    $this.Target.trigger("onTreeChecked", { Data: senddata, Checked: checked, node: node });
                }
            });
            var checkednode = this.Tree.tree("getChecked");
            var checkedLeafNode = [];
            for (var i = 0; i < checkednode.length; i++) {
                if (this.Target.tree("isLeaf", checkednode[i].target)) checkedLeafNode.push(GetNeedData(checkednode[i], true));
            }
            this.Target.trigger("onTreeLoaded", { Data: checkedLeafNode, Checked: true });
        },
        SetAllCheck: function (checkstate) {
            var checkstate = ktw.IsBoolean(checkstate) ? checkstate : checkstate != "false";
            var state = checkstate ? "check" : "uncheck";
            var roots = this.Tree.tree("getRoots");
            if (ktw.IsNull(roots) || roots.length == 0) return;
            var senddate = [];
            for (var i = 0; i < roots.length; i++) {
                this.Tree.tree(state, roots[i].target);
                var childs = roots[i].children;
                for (var j = 0; j < childs.length; j++) senddate.push(GetNeedData(childs[j], checkstate));
            }
            $this.Target.trigger("onTreeChecked", { Data: senddate, Checked: checkstate });
        },
        AddNode: function (data, parentTarget) {
            if (ktw.IsNull(data)) return;
            var treedata = ConvertToTreeDatas(data);
            if (ktw.IsNull(parentTarget)) this.Tree.tree("append", { data: treedata });
            else this.Tree.tree("append", { parent: parentTarget, data: treedata });
            //根据treedata
            var senddate = [];
            for (var i = 0; i < treedata.length; i++) {
                if (ktw.IsNull(treedata[i].children) || treedata[i].children.length == 0) {
                    if (treedata[i].checked) senddate.push(GetNeedData(treedata[i], true));
                }
                else {
                    var children = treedata[i].children;
                    for (var j = 0; j < children.length; j++) {
                        if (children.checked) senddate.push(GetNeedData(treedata[i], true));
                    }
                }
            }
            $this.Target.trigger("onTreeChecked", { Data: senddate, Checked: true });
        },
        SetIcon: function (icon, nodeid) {
            if (ktw.IsNull(icon) || ktw.IsNull(nodeid) || nodeid == "") return;
            ktw.InsertIconRule(ktw.App.TempStyle, ".layertreeIconof" + nodeid, icon);
            var newnode = this.Tree.tree("find", nodeid);
            this.Tree.tree('update', {
                target: newnode.target,
                iconCls: "layertreeIconof" + nodeid
            });
        },
        SetIconCls: function (iconClsStyle, nodeid) {
            if (ktw.IsNull(iconClsStyle) || ktw.IsNull(nodeid) || nodeid == "") return;
            var newnode = this.Tree.tree("find", nodeid);
            this.Tree.tree('update', {
                target: newnode.target,
                iconCls: iconClsStyle
            });
        },
        GetNodes: function () {
            return this.Tree.data("tree").data;
        }
    });
})(jQuery);
/*UCLegend地图图例*/
(function ($) {
    function getNewstr(str) {
        var bytesCount = 0;
        var newStr = "";
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);//匹配双字节
            newStr += c;
            if (/^[\u0000-\u00ff]$/.test(c)) bytesCount += 1;
            else bytesCount += 2;
            if (bytesCount >= 48) {
                newStr += "...";
                break;
            }
        }
        return newStr;
    }
    ktw.UCLegend = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.Right = ktw.IsNumber(opt.Right) ? opt.Right : 5;
        this.Bottom = ktw.IsNumber(opt.Bottom) ? opt.Bottom : 5;
        this.Left = ktw.IsNumber(opt.Left) ? opt.Left : null;
        this.Top = ktw.IsNumber(opt.Top) ? opt.Top : null;
        opt.Target = $('<div class="Legend"></div>');
        $.extend(this, new ktw.Control(opt));
        if (!ktw.IsNull(this.Right)) this.Target.css("right", this.Right + "px");
        if (!ktw.IsNull(this.Bottom)) this.Target.css("bottom", this.Bottom + "px");
        if (!ktw.IsNull(this.Left)) this.Target.css({ "left": this.Left + "px", "right": "" });
        if (!ktw.IsNull(this.Top)) this.Target.css({ "top": this.Top + "px", "bottom": "" });
        //ktw.App.MapPanel.Target.append(this.Target);
        this.IsPointStyle = ktw.IsBoolean(opt.IsPointStyle) ? opt.IsPointStyle : opt.IsPointStyle == "true";
        this.Data = ktw.IsNull(opt.Data) ? [] : opt.Data;
        this.Parent = ktw.IsNull(opt.Parent) ? ktw.App.MapPanel.Target : $(opt.Parent);
        this.Title = ktw.IsNull(opt.Title) ? "图例" : opt.Title;
        this.TitleAlign = ktw.IsNull(opt.TitleAlign) ? 'left' : opt.TitleAlign;
        this.TitleSize = ktw.IsNull(opt.TitleSize) ? 13 : opt.TitleSize;
        this.TitleColor = ktw.IsNull(opt.TitleColor) ? 'black' : opt.TitleColor;
        this.Header = $('<div class="Legend-Title" style="font-size:' + this.TitleSize + 'px;text-align:' + this.TitleAlign +
        ';color=' + this.TitleColor + ';">' + this.Title + '</div>');
        $(this.Parent).append(this.Target);
        this.Target.append(this.Header);
        var contentDiv = $('<div id="legend-contentDiv" style="width: 100%; height: auto;"></div>');
        if (!ktw.IsNull(this.Data) && this.Data.length > 0) {
            this.Target.show();
            for (var i = 0; i < this.Data.length; i++) {
                var row = $('<div class="Legend-Content-Row"></div>');
                var strText = getNewstr(this.Data[i].Text) === this.Data[i].Text ? this.Data[i].Text : getNewstr(this.Data[i].Text);
                var rowText = $('<span title="' + this.Data[i].Text + '">' + strText + '</span>');
                rowText.text(strText);
                var rowIconstring = '<div class="Legend-Content-RowIcon" style="width:14px;height:14px;line-height: 14px;';
                if (!ktw.IsNull(this.Data[i].Fill.Color)) rowIconstring += 'background-color: ' + this.Data[i].Fill.Color + ';';
                if (!ktw.IsNull(this.Data[i].Fill.Opacity)) rowIconstring += 'fill-opacity: ' + this.Data[i].Fill.Opacity + ';';
                if (!ktw.IsNull(this.Data[i].Border.Color)) rowIconstring += 'border-color: ' + this.Data[i].Border.Color + ';';
                if (!ktw.IsNull(this.Data[i].Border.Opacity)) rowIconstring += 'stroke-opacity: ' + this.Data[i].Border.Opacity + ';';
                if (!ktw.IsNull(this.Data[i].Border.Width)) rowIconstring += 'border-width: ' + this.Data[i].Border.Width + 'px;';
                rowIconstring += '"></div>';
                rowIcon = $(rowIconstring);
                var iconWidth = rowIcon.width();
                row.append(rowIcon);
                row.append(rowText);
                contentDiv.append(row);
                if (!ktw.IsNull(this.Data[i].Border.Width)) {
                    var errorsize = iconWidth - parseInt(this.Data[i].Border.Width) * 2;
                    var realWidth = errorsize > 0 ? errorsize : 0;
                    this.Data[i].Border.Width = errorsize > 0 ? this.Data[i].Border.Width : iconWidth / 2;
                    if (this.IsPointStyle) {
                        rowIcon.css({
                            "border-width": this.Data[i].Border.Width + "px",
                            "width": realWidth + "px",
                            "height": realWidth + "px",
                            "line-height": realWidth + "px"
                        });
                        rowIcon.css("border-radius", iconWidth / 2);
                    }
                    else rowIcon.css({
                        "border-width": "1px",
                        "width": iconWidth + "px",
                        "height": iconWidth + "px",
                        "line-height": iconWidth + "px"
                    });
                }
            }
        }
        this.Target.append(contentDiv);
    }
    $.fn.extend(ktw.UCLegend.prototype, {
        Layout: function () {
            this.Target.css({ bottom: this.Bottom, right: this.Right });
        },
        SetTitle: function (title) {
            this.Header.html(title);
        },
        SetPointStyle: function (yes) {
            if (ktw.IsBoolean(yes)) {
                this.IsPointStyle = yes;
                this.SetData(this.Data);
            }
        },
        SetBottom: function (bottom) {
            if (ktw.IsNumber(bottom)) this.Layout(this.Bottom = bottom);
        },
        SetRight: function (right) {
            if (ktw.IsNumber(right)) this.Layout(this.Right = right);
        },
        SetCss: function (css) {
            if (!ktw.IsNull(css)) this.Target.css(css);
            if (!ktw.IsNull(css.width)) this.Width = parseFloat(css.width);
            if (!ktw.IsNull(css.height)) this.Height = parseFloat(css.height);
            if (!ktw.IsNull(css.left)) this.Left = parseFloat(css.left);
            if (!ktw.IsNull(css.right)) this.Right = parseFloat(css.right);
            if (!ktw.IsNull(css.top)) this.Top = parseFloat(css.top);
            if (!ktw.IsNull(css.bottom)) this.Bottom = parseFloat(css.bottom);
        },
        SetParent: function (parent) {
            if (ktw.IsDOMElement(parent) || ktw.IsjQueryObject(parent)) {
                this.Parent.remove(this.Target);
                $(parent).append(this.Target);
                this.Parent = $(parent);
            }
        },
        SetData: function (newData) {
            this.Data = newData;
            var tempcontent = $("#legend-contentDiv", this.Target);
            tempcontent.empty();
            this.Target.hide();
            if (!ktw.IsNull(this.Data) && this.Data.length > 0) {
                this.Target.show();
                this.Visible = true;
                for (var i = 0; i < this.Data.length; i++) {
                    var row = $('<div class="Legend-Content-Row"></div>');
                    var strText = getNewstr(this.Data[i].Text) === this.Data[i].Text ? this.Data[i].Text : getNewstr(this.Data[i].Text);
                    var rowText = $('<span title="' + this.Data[i].Text + '"></span>');
                    rowText.text(strText);
                    var rowIconstring = '<div class="Legend-Content-RowIcon" style="width:14px;height:14px;line-height: 14px;';
                    if (!ktw.IsNull(this.Data[i].Fill.Color)) rowIconstring += 'background-color: ' + this.Data[i].Fill.Color + ';';
                    if (!ktw.IsNull(this.Data[i].Fill.Opacity)) rowIconstring += 'fill-opacity: ' + this.Data[i].Fill.Opacity + ';';
                    if (!ktw.IsNull(this.Data[i].Border.Color)) rowIconstring += 'border-color: ' + this.Data[i].Border.Color + ';';
                    if (!ktw.IsNull(this.Data[i].Border.Opacity)) rowIconstring += 'stroke-opacity: ' + this.Data[i].Border.Opacity + ';';
                    if (!ktw.IsNull(this.Data[i].Border.Width)) rowIconstring += 'border-width: ' + this.Data[i].Border.Width + 'px;';
                    rowIconstring += '"></div>';
                    rowIcon = $(rowIconstring);
                    var iconWidth = rowIcon.width();
                    row.append(rowIcon);
                    row.append(rowText);
                    tempcontent.append(row);
                    if (!ktw.IsNull(this.Data[i].Border.Width)) {
                        var errorsize = iconWidth - parseInt(this.Data[i].Border.Width) * 2;
                        var realWidth = errorsize > 0 ? errorsize : 0;
                        this.Data[i].Border.Width = errorsize > 0 ? this.Data[i].Border.Width : iconWidth / 2;
                        if (this.IsPointStyle) {
                            rowIcon.css({
                                "border-width": this.Data[i].Border.Width + "px",
                                "width": realWidth + "px",
                                "height": realWidth + "px",
                                "line-height": realWidth + "px"
                            });
                            rowIcon.css("border-radius", iconWidth / 2);
                        }
                        else rowIcon.css({
                            "border-width": "1px",
                            "width": iconWidth + "px",
                            "height": iconWidth + "px",
                            "line-height": iconWidth + "px"
                        });

                    }
                }
            }
            //var left = ktw.App.MapPanel.Target.width() - this.Target.outerWidth() - 5;
            //this.SetLeft(left);
        }
    });
})(jQuery);
/*UCWaitBox(等待框)*/
(function (window, document, undefined) {
    var width = 'width',
        length = 'length',
        radius = 'radius',
        lines = 'lines',
        trail = 'trail',
        color = 'color',
        opacity = 'opacity',
        speed = 'speed',
        shadow = 'shadow',
        style = 'style',
        height = 'height',
        left = 'left',
        top = 'top',
        px = 'px',
        childNodes = 'childNodes',
        firstChild = 'firstChild',
        parentNode = 'parentNode',
        position = 'position',
        relative = 'relative',
        absolute = 'absolute',
        animation = 'animation',
        transform = 'transform',
        Origin = 'Origin',
        Timeout = 'Timeout',
        coord = 'coord',
        black = '#000',
        styleSheets = style + 'Sheets',
        prefixes = "webkit0Moz0ms0O".split(0),
        animations = {},
        useCssAnimations;
    function eachPair(args, it) {
        var end = ~~((args[length] - 1) / 2);
        for (var i = 1; i <= end; i++) {
            it(args[i * 2 - 1], args[i * 2]);
        }
    }
    function createEl(tag) {
        var el = document.createElement(tag || 'div');
        eachPair(arguments, function (prop, val) { el[prop] = val; });
        return el;
    }
    function ins(parent, child1, child2) {
        if (child2 && !child2[parentNode]) ins(parent, child2);
        parent.insertBefore(child1, child2 || null);
        return parent;
    }
    ins(document.getElementsByTagName('head')[0], createEl(style));
    var sheet = document[styleSheets][document[styleSheets][length] - 1];
    function addAnimation(to, end) {
        var name = [opacity, end, ~~(to * 100)].join('-'),
            dest = '{' + opacity + ':' + to + '}', i;
        if (!animations[name]) {
            for (i = 0; i < prefixes[length]; i++) {
                try {
                    sheet.insertRule('@' +
                      (prefixes[i] && '-' + prefixes[i].toLowerCase() + '-' || '') +
                      'keyframes ' + name + '{0%{' + opacity + ':1}' +
                      end + '%' + dest + 'to' + dest + '}', sheet.cssRules[length]);
                }
                catch (err) { }
            }
            animations[name] = 1;
        }
        return name;
    }
    function vendor(el, prop) {
        var s = el[style], pp, i;
        if (s[prop] !== undefined) return prop;
        prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        for (i = 0; i < prefixes[length]; i++) {
            pp = prefixes[i] + prop;
            if (s[pp] !== undefined) return pp;
        }
    }
    function css(el) {
        eachPair(arguments, function (n, val) {
            el[style][vendor(el, n) || n] = val;
        });
        return el;
    }
    function defaults(obj) {
        eachPair(arguments, function (prop, val) {
            if (obj[prop] === undefined) obj[prop] = val;
        });
        return obj;
    }
    var Spinner = function Spinner(o) {
        this.opts = defaults(o || {},
          lines, 12, trail, 60, length, 7,
          width, 3, radius, 10, color, black,
          opacity, 1 / 4, speed, 1);
    },
    proto = Spinner.prototype = {
        spin: function (target) {
            var self = this, el = self.el = self[lines](self.opts);
            if (target) {
                var width = target.offsetWidth == 0 ? $(target).parent().width() : target.offsetWidth;
                var height = target.offsetHeight == 0 ? $(target).parent().height() : target.offsetHeight;
                ins(target, css(el,
                  left, ~~(width / 2) + px,
                  top, ~~(height / 2) + px
                ), target[firstChild]);
            }
            if (!useCssAnimations) {
                var o = self.opts, i = 0, f = 20 / o[speed],
                    ostep = (1 - o[opacity]) / (f * o[trail] / 100),
                    astep = f / o[lines];
                (function anim() {
                    i++;
                    for (var s = o[lines]; s; s--) {
                        var alpha = Math.max(1 - (i + s * astep) % f * ostep, o[opacity]);
                        self[opacity](el, o[lines] - s, alpha, o);
                    }
                    self[Timeout] = self.el && window['set' + Timeout](anim, 50);
                })();
            }
            return self;
        },
        stop: function () {
            var self = this, el = self.el;
            window['clear' + Timeout](self[Timeout]);
            if (el && el[parentNode]) el[parentNode].removeChild(el);
            self.el = undefined;
            return self;
        }
    };
    proto[lines] = function (o) {
        var el = css(createEl(), position, relative),
            animationName = addAnimation(o[opacity], o[trail]),
            i = 0, seg;
        function fill(color, shadow) {
            return css(createEl(),
              position, absolute,
              width, (o[length] + o[width]) + px,
              height, o[width] + px,
              'background', color,
              'boxShadow', shadow,
              transform + Origin, left,
              transform, 'rotate(' + ~~(360 / o[lines] * i) + 'deg) translate(' + o[radius] + px + ',0)',
              'borderRadius', '100em'
            );
        }
        for (; i < o[lines]; i++) {
            seg = css(createEl(),
              position, absolute,
              top, 1 + ~(o[width] / 2) + px,
              transform, 'translate3d(0,0,0)',
              animation, animationName + ' ' + 1 / o[speed] + 's linear infinite ' + (1 / o[lines] / o[speed] * i - 1 / o[speed]) + 's'
            );
            if (o[shadow]) ins(seg, css(fill(black, '0 0 4px ' + black), top, 2 + px));
            ins(el, ins(seg, fill(o[color], '0 0 1px rgba(0,0,0,.1)')));
        }
        return el;
    };
    proto[opacity] = function (el, i, val) {
        el[childNodes][i][style][opacity] = val;
    };
    var behavior = 'behavior', URL_VML = 'url(#default#VML)',
        tag = 'group0roundrect0fill0stroke'.split(0);
    (function () {
        var s = css(createEl(tag[0]), behavior, URL_VML), i;
        if (!vendor(s, transform) && s.adj) {
            for (i = 0; i < tag[length]; i++) {
                sheet.addRule(tag[i], behavior + ':' + URL_VML);
            }
            proto[lines] = function () {
                var o = this.opts, r = o[length] + o[width], s = 2 * r;
                function grp() {
                    return css(createEl(tag[0], coord + 'size', s + ' ' + s, coord + Origin, -r + ' ' + -r), width, s, height, s);
                }
                var g = grp(), margin = ~(o[length] + o[radius] + o[width]) + px, i;
                function seg(i, dx, filter) {
                    ins(g,
                      ins(css(grp(), 'rotation', 360 / o[lines] * i + 'deg', left, ~~dx),
                        ins(css(createEl(tag[1], 'arcsize', 1), width, r, height, o[width], left, o[radius], top, -o[width] / 2, 'filter', filter),
                          createEl(tag[2], color, o[color], opacity, o[opacity]),
                          createEl(tag[3], opacity, 0)
                        )
                      )
                    );
                }
                if (o[shadow]) {
                    for (i = 1; i <= o[lines]; i++) {
                        seg(i, -2, 'progid:DXImage' + transform + '.Microsoft.Blur(pixel' + radius + '=2,make' + shadow + '=1,' + shadow + opacity + '=.3)');
                    }
                }
                for (i = 1; i <= o[lines]; i++) {
                    seg(i);
                }
                return ins(css(createEl(),
                  'margin', margin + ' 0 0 ' + margin,
                  position, relative), g);
            };
            proto[opacity] = function (el, i, val, o) {
                o = o[shadow] && o[lines] || 0;
                el[firstChild][childNodes][i + o][firstChild][firstChild][opacity] = val;
            };
        }
        else { useCssAnimations = vendor(s, animation); }
    })();
    window.Spinner = Spinner;
})(window, document);
(function ($) {
    ktw.UCWaitBox = function (param) {
        this.Parent = ktw.IsjQueryObject(param) || ktw.IsDOMElement(param) ? param : param.Parent;
        this.MaskColor = ktw.IsNull(param.MaskColor) ? 'black' : param.MaskColor;
        this.SpinnerColor = ktw.IsNull(param.SpinnerColor) ? 'black' : param.SpinnerColor;
        this.MaskOpacity = ktw.IsNull(param.MaskOpacity) ? 0.1 : param.MaskOpacity;
        this.Width = ktw.IsNumber(param.Width) ? param.Width + "px" : "100%";
        this.Height = ktw.IsNumber(param.Height) ? param.Height + "px" : "100%";
        this.Options = {
            lines: 12, length: 7, width: 3, radius: 10,
            corners: 1, rotate: 0, color: this.SpinnerColor, speed: 1,
            trail: 60, shadow: false, hwaccel: false,
            className: 'spinner', zIndex: 99999, top: '50%', left: '50%'
        };
        this.Target = $('<div ucWaitBox="" style="position:absolute;left:0px;top:0px;width:' + this.Width + ';height: ' + this.Height + ';z-index:999999;">'
                       + '<div id="modal" style="position:absolute;width:100%;height:100%;left:0px;right:0px; background-color:' + this.MaskColor
                       + '; opacity:' + this.MaskOpacity + ';filter: alpha(opacity=10);">' + '</div></div>');
        if (!ktw.IsNull(param.BackColor)) this.Target.css("background-color", param.BackColor);
    };
    $.fn.extend(ktw.UCWaitBox.prototype, {
        Show: function (parent) {
            if (!ktw.IsNull(parent)) this.Parent = parent;
            this.Parent.append(this.Target);
            var target = this.Target;
            if (ktw.IsNull(this.Spinner)) this.Spinner = new Spinner(this.Options).spin(target[0]);
        },//展示等待框
        Close: function () {
            if (this.Spinner) this.Spinner.stop();
            this.Target.remove();
            this.Spinner = null;
        }//关闭等待框
    });
})(jQuery);
//Text(基础文本输入框)
(function ($) {
    function parseBorder(t) {
        if (ktw.IsNull(t.Border)) return { t: 0, r: 0, b: 0, l: 0, w: 0, h: 0 };
        var bs = t.Border.split(" "), bl, bt, br, bb;
        if (bs.length == 1) bl = bt = br = bb = isNaN(parseInt(bs[0])) ? 0 : parseInt(bs[0]);
        else if (ps.length == 2) {
            bt = bb = isNaN(parseInt(bs[0])) ? 0 : parseInt(bs[0]),
            bl = br = isNaN(parseInt(bs[1])) ? 0 : parseInt(bs[1]);
        }
        else {
            bt = parseInt(ps[0]), br = parseInt(ps[1]), bb = parseInt(ps[2]), bl = parseInt(ps[3]);
            if (isNaN(bt)) bt = 0;
            if (isNaN(br)) br = 0;
            if (isNaN(bb)) bb = 0;
            if (isNaN(bl)) bl = 0;
        }
        return { t: bt, r: br, b: bb, l: bl, w: bl + br, h: bt + bb };
    }
    function parsePadding(t) {
        if (ktw.IsNull(t.Padding)) return { t: 0, r: 0, b: 0, l: 0, w: 0, h: 0 };
        var ps = t.Padding.split(" "), pl, pt, pr, pb;
        if (ps.length == 1) pl = pt = pr = pb = isNaN(parseInt(ps[0])) ? 0 : parseInt(ps[0]);
        else if (ps.length == 2) {
            pt = pb = isNaN(parseInt(ps[0])) ? 0 : parseInt(ps[0]),
            pl = pr = isNaN(parseInt(ps[1])) ? 0 : parseInt(ps[1]);
        }
        else {
            pt = parseInt(ps[0]), pr = parseInt(ps[1]), pb = parseInt(ps[2]), pl = parseInt(ps[3]);
            if (isNaN(pt)) pt = 0;
            if (isNaN(pr)) pr = 0;
            if (isNaN(pb)) pb = 0;
            if (isNaN(pl)) pl = 0;
        }
        return { t: pt, r: pr, b: pb, l: pl, w: pl + pr, h: pt + pb };
    }
    function refreshClearButton(t) {
        if (ktw.IsNull(t) || ktw.IsNull(t.xButton)) return;
        t.xButton.css("display", t.textBox.val().length > 0 ? "" : "none");
    }
    function refreshRequireDiv(t) {
        if (ktw.IsNull(t) || ktw.IsNull(t.requireDiv)) return;
        t.requireDiv.css("display", t.textBox.val().length > 0 ? "none" : "block");
    }
    function layout(t) {
        var b = parseBorder(t), p = parsePadding(t), _p = t.GetPadding(t.Target),
            w = t.Target.width() + _p.w, h = t.Target.height() + _p.h;
        if (t.header) {
            w -= t.header.outerWidth();
            if (ktw.IsNull(t.HeaderLineHeight)) t.header.css("line-height", h + "px");
        }
        t.body.css({
            width: (w - b.w) + "px",
            left: (!!t.header ? t.header.outerWidth() : 0) + "px",
            height: h - b.h + "px"
        });
        if (t.xButton) {
            w -= 12;
            t.xButton.css("top", (h - b.h) / 2 - 11 + "px");
        }
        if (t.requireDiv) {
            t.requireDiv.css({ right: p.r + "px", "line-height": (h - b.h) + "px" });
            refreshRequireDiv(t);
        }
        t.textBox.css({
            top: "0px",
            left: "0px",
            width: w - p.w - b.w + "px",
            height: h - p.h - b.h + "px",
            padding: t.Padding
        });
        if (!t.Enable && t.enableEl) t.enableEl.css({
            left: t.body.css("left"),
            width: t.body.width() + t.GetBorder(t.body).w
        });
        if (t.tipEl) { //提示框布局更新
            var tipInfo = $(".text-tipInfo-" + t.TipAlign, t.tipEl), btw = t.Target.css("borderTopWidth"), blw = t.Target.css("borderLeftWidth");
            if (t.TipAlign == "right" || t.TipAlign == "left") {
                var l = t.TipAlign == "right" ? t.Target.outerWidth() - parseInt(blw) : -tipInfo.outerWidth() - parseInt(blw) - 3;
                t.tipEl.css({
                    top: "-" + btw,
                    left: l + "px",
                    width: tipInfo.outerWidth() + 3,
                    height: tipInfo.outerHeight()
                });
            }
            else if (t.TipAlign == "top" || t.TipAlign == "bottom") {
                var _t = t.TipAlign == "top" ? -tipInfo.outerHeight() - parseInt(btw) - 3 : t.Target.outerHeight() - parseInt(btw);
                t.tipEl.css({
                    top: _t + "px",
                    left: "-" + blw,
                    width: tipInfo.outerWidth(),
                    height: tipInfo.outerHeight() + 3
                });
            }
        }
    }
    function showTip(t) {
        var tipEl = t.tipEl = $("<div class='text-tip'></div>").appendTo(t.Target);
        var tipInfo = $("<div class='text-tipInfo-" + t.TipAlign + "'>用户名不能为空，请输入用户名...</div>").appendTo(tipEl);
        var tipArrow = $("<div class='text-tipArrow-" + t.TipAlign + "'></div>").appendTo(tipEl);
        if (t.TipAlign == "right" || t.TipAlign == "left") {
            if (ktw.IsNull(t.TipWidth)) {
                tipInfo.css("height", t.Target.outerHeight() - 10 + "px");
                tipInfo.css("line-height", t.Target.outerHeight() - 10 + "px");
            }
            else {
                tipInfo.css("width", t.TipWidth + "px");
                tipInfo.css("line-height", t.LineHeight + "px");
            }
            if (t.TipAlign == "right") tipInfo.css("left", 3 + "px");
            else tipArrow.css("left", tipInfo.outerWidth() - 1 + "px");
            tipArrow.css("top", t.Target.outerHeight() / 2 - 3 + "px");
        }
        else if (t.TipAlign == "top" || t.TipAlign == "bottom") {
            tipInfo.css({ "height": "14px", "line-height": "14px" });
            if (t.TipAlign == "bottom") tipInfo.css("top", "3px");
            else tipArrow.css("top", tipInfo.outerHeight() - 1 + "px");
        }
    }
    ktw.Text = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-text'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-text")) opt.Target.addClass("ktw-text");
        if (!ktw.IsNull(opt.Width)) opt.Target.width(opt.Width);
        if (!ktw.IsNull(opt.Height)) opt.Target.height(opt.Height);
        else if (ktw.IsNull(opt.Target[0].style.height)) opt.Target.height(opt.Height = 24);
        $.extend(this, this.control = new ktw.Control(opt));
        funExt(this);
        this.TipWidth = opt.TipWidth;
        this.Target.prop("$this", $this);
        this.Border = ktw.IsNull(opt.Border) ? "1px" : opt.Border;
        this.Padding = ktw.IsNull(opt.Padding) ? "2px" : opt.Padding;
        this.Readonly = ktw.IsNull(opt.Readonly) ? false : opt.Readonly;
        this.Stretched = ktw.IsBoolean(opt.Stretched) ? opt.Stretched : opt.Stretched === "true";
        this.LineHeight = ktw.IsNull(opt.LineHeight) ? 18 : opt.LineHeight;
        this.Required = ktw.IsBoolean(opt.Required) ? opt.Required : opt.Required === "true";
        this.TipAlign = ktw.IsNull(opt.TipAlign) ? "right" : opt.TipAlign.toLocaleLowerCase();
        this.TextAlign = ktw.IsNull(opt.TextAlign) ? 'left' : opt.TextAlign;
        this.TipInfo = opt.TipInfo;
        if (!ktw.IsNull(opt.Title)) {
            this.header = $("<div class='text-header'>" + opt.Title + "</div>").appendTo(this.Target);
            this.header.bind("contextmenu", function (e) { return false; });
            if (!ktw.IsNull(opt.HeaderCSS)) this.header.css(opt.HeaderCSS);
            if (!ktw.IsNull(opt.HeaderWidth)) this.header.css("width", opt.HeaderWidth);
            if (!ktw.IsNull(opt.HeaderAlign)) this.header.css("text-align", opt.HeaderAlign);
            if (!ktw.IsNull(opt.HeaderLineHeight)) this.header.css("line-height", this.HeaderLineHeight = opt.HeaderLineHeight);
        }
        this.body = $("<div class='text-text'></div>").css("border-width", this.Border).appendTo(this.Target);
        if (parseInt(this.Border) == 0) this.body.css("box-shadow", "none");
        if (!ktw.IsNull(opt.BodyCSS)) this.body.css(opt.BodyCSS);
        this.SetEnable(this.Enable = ktw.IsNull(opt.Enable) ? true : opt.Enable, true);
        this.textBox = $("<input type='text'/>").css("text-align", this.TextAlign).appendTo(this.body);
        this.textBox.bind('input propertychange', function () {
            refreshClearButton($this);
            refreshRequireDiv($this);
            if ($this.textBox.val() == $this.oldValue) return;
            $this.Target.triggerHandler("onChange", { newValue: $(this).val(), oldValue: $this.oldValue });
            $this.oldValue = $this.textBox.val();
        });
        this.textBox.bind("focus", function () {
            $this.body.addClass("focus");
            refreshClearButton($this);
        });
        this.textBox.bind("blur", function () {
            $this.body.removeClass("focus");
            if ($this.xButton) $this.xButton.css("display", "none");
        });
        if (ktw.IsNull(opt.ShowClearButton) || opt.ShowClearButton != false) {
            this.xButton = $("<div class='icon-textbox-x text-button-x' style='display:none'></div>").appendTo(this.body);
            this.xButton.bind("mousedown", function () {
                $this.SetValue("");
                refreshClearButton($this);
                refreshRequireDiv($this);
            });
        }
        if (this.Required) this.requireDiv = $("<div class='text-required'>*</div>").appendTo(this.body);
        this.readonlyEl = $("<div class='text-readonly'></div>").appendTo(this.body);
        this.readonlyEl.css("display", this.Readonly ? "block" : "");
        this.textBox[0].placeholder = ktw.IsNull(opt.TipInfo) ? "" : opt.TipInfo;
        this.textBox.val(ktw.IsNull(opt.Value) ? opt.Text : opt.Value);
        this.oldValue = this.textBox.val();
        if ($(document.body).has(this.Target).length > 0) this.Layout();//showTip(this);
    }
    function funExt(control) {
        $.fn.extend(control, {
            GetBorder: function (el) {
                if (ktw.IsNull(el)) return parseBorder(this);
                else return this.control.GetBorder(el);
            },
            GetPadding: function (el) {
                if (ktw.IsNull(el)) return parsePadding(this);
                else return this.control.GetPadding(el);
            },
            SetValue: function (value) {
                if (ktw.IsNull(value)) value = "";
                if (this.textBox.val() == value) return;
                this.textBox.val(value);
                this.Target.triggerHandler("onChange", { newValue: this.textBox.val(), oldValue: this.oldValue });
                this.oldValue = this.textBox.val();
            },
            SetWidth: function (width) {
                this.control.SetWidth(width);
                this.Layout();
            },
            SetHeight: function (height) {
                this.control.SetHeight(height);
                this.Layout();
            },
            SetSize: function (size) {
                this.control.SetSize(size)
                this.Layout();
            },
            Clear: function () {
                this.SetValue("");
                //后期验证等的隐藏
            },
            GetValue: function () { return this.textBox.val(); },
            Layout: function () { layout(this); },
            SetEnable: function (enable, f) {
                if (ktw.IsNull(f) && this.Enable == enable) return;
                this.Enable = enable;
                if (!enable) {
                    if (this.enableEl) this.enableEl.css("display", "block");
                    else {
                        this.body.after(this.enableEl = $("<div class='text-enable'></div>"));
                        this.enableEl.css({
                            left: this.body.css("left"),
                            width: this.body.width() + this.GetBorder(this.body).w
                        });
                    }
                }
                else if (this.enableEl) this.enableEl.css("display", "none");
            },
            RefreshRequire: function () {
                refreshRequireDiv(this);
            }
        });
    }
})(jQuery);
//TextBox(文本输入框)
(function ($) {
    function layout(tb) {
        tb.text.Layout();
        if (tb.Type != "multi-text") return;
        var p = tb.GetPadding(), w = tb.body.width() - p.w, h = tb.body.height() - p.h;
        tb.textBox.css({ width: w + "px", height: h + "px", padding: tb.Padding });
        tb.textBox[0].placeholder = ktw.IsNull(tb.TipInfo) ? "" : tb.TipInfo;
    }
    ktw.TextBox = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-textbox'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-textbox")) opt.Target.addClass("ktw-textbox");
        this.Type = ktw.IsNull(opt.Type) ? "text" : opt.Type.toLocaleLowerCase();
        if (this.Type != "password" && this.Type != "multi-text") this.Type = "text";
        if (this.Type != "multi-text") this.LineHeight = ktw.IsNull(opt.LineHeight) ? 18 : opt.LineHeight;
        else {
            this.LineHeight = ktw.IsNull(opt.LineHeight) ? 14 : opt.LineHeight;
            opt.ShowClearButton = false;
        }
        $.extend(this, this.text = new ktw.Text(opt)), this.Target.prop("$this", $this), funExt(this);
        if (this.Type == "password") this.textBox[0].type = "password";
        else if (this.Type == "multi-text") {
            $(":first-child", this.body).remove();
            this.textBox = $("<textarea></textarea>").prependTo(this.body);
            this.Layout();
        }
    }
    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () { layout(this); }
        });
    }
})(jQuery);
//NumberBox(数字输入框)
(function ($) {
    function getBorder(tb) {
        if (ktw.IsNull(tb.Border)) return { t: 0, r: 0, b: 0, l: 0, w: 0, h: 0 };
        var bs = tb.Border.split(" "), bl, bt, br, bb;
        if (bs.length == 1) bl = bt = br = bb = isNaN(parseInt(bs[0])) ? 0 : parseInt(bs[0]);
        else if (ps.length == 2) {
            bt = bb = isNaN(parseInt(bs[0])) ? 0 : parseInt(bs[0]),
            bl = br = isNaN(parseInt(bs[1])) ? 0 : parseInt(bs[1]);
        }
        else {
            bt = parseInt(ps[0]), br = parseInt(ps[1]), bb = parseInt(ps[2]), bl = parseInt(ps[3]);
            if (isNaN(bt)) bt = 0;
            if (isNaN(br)) br = 0;
            if (isNaN(bb)) bb = 0;
            if (isNaN(bl)) bl = 0;
        }
        return { t: bt, r: br, b: bb, l: bl, w: bl + br, h: bt + bb };
    }
    function getPadding(tb) {
        if (ktw.IsNull(tb.Padding)) return { t: 0, r: 0, b: 0, l: 0, w: 0, h: 0 };
        var ps = tb.Padding.split(" "), pl, pt, pr, pb;
        if (ps.length == 1) pl = pt = pr = pb = isNaN(parseInt(ps[0])) ? 0 : parseInt(ps[0]);
        else if (ps.length == 2) {
            pt = pb = isNaN(parseInt(ps[0])) ? 0 : parseInt(ps[0]),
            pl = pr = isNaN(parseInt(ps[1])) ? 0 : parseInt(ps[1]);
        }
        else {
            pt = parseInt(ps[0]), pr = parseInt(ps[1]), pb = parseInt(ps[2]), pl = parseInt(ps[3]);
            if (isNaN(pt)) pt = 0;
            if (isNaN(pr)) pr = 0;
            if (isNaN(pb)) pb = 0;
            if (isNaN(pl)) pl = 0;
        }
        return { t: pt, r: pr, b: pb, l: pl, w: pl + pr, h: pt + pb };
    }
    function refreshClearButton(tb) {
        if (ktw.IsNull(tb) || ktw.IsNull(tb.xButton)) return;
        tb.xButton.css("display", tb.textBox.val().length > 0 ? "" : "none");
    }
    function refreshRequireDiv(tb) {
        if (ktw.IsNull(tb) || ktw.IsNull(tb.requireDiv)) return;
        tb.requireDiv.css("display", tb.textBox.val().length > 0 ? "none" : "block");
    }
    function layout(tb) {
        var b = getBorder(tb), w = tb.Target.width() + parseInt(tb.Target.css("padding-left")) + parseInt(tb.Target.css("padding-right")),
            p = getPadding(tb), h = tb.Target.height() + parseInt(tb.Target.css("padding-top")) + parseInt(tb.Target.css("padding-bottom"));
        if (tb.header) {
            w -= tb.header.outerWidth();
            if (ktw.IsNull(tb.HeaderLineHeight)) tb.header.css("line-height", h + "px");
        }
        tb.body.css({
            width: (w - b.w) + "px",
            left: (!!tb.header ? tb.header.outerWidth() : 0) + "px",
            height: h - b.h + "px"
        });
        if (tb.xButton) {
            w -= 12;
            tb.xButton.css("top", (h - b.h) / 2 - 11 + "px");
        }
        if (tb.requireDiv) {
            tb.requireDiv.css({ right: p.r + "px", "line-height": h + "px" });
            refreshRequireDiv(tb);
        }
        tb.textBox.css({
            top: "0px",
            left: "0px",
            width: w - p.w - b.w + "px",
            height: h - p.h - b.h + "px",
            padding: tb.Padding
        });
    }
    function showTip(tb) {
        var tipEl = $("<div class='tip'></div>").appendTo(tb.Target);
        var tipInfo = $("<div class='tipInfo-" + tb.TipAlign + "'>用户名不能为空，请输入用户名...</div>").appendTo(tipEl);
        var tipArrow = $("<div class='tipArrow-" + tb.TipAlign + "'></div>").appendTo(tipEl);
        if (tb.TipAlign == "right" || tb.TipAlign == "left") {
            if (ktw.IsNull(tb.TipWidth)) {
                tipInfo.css("height", tb.Target.height() - 8 + "px");
                tipInfo.css("line-height", tb.Target.height() - 8 + "px");
            }
            else {
                tipInfo.css("width", tb.TipWidth + "px");
                tipInfo.css("line-height", tb.LineHeight + "px");
            }
            if (tb.TipAlign == "right") tipInfo.css("left", 3 + "px");
            else tipArrow.css("left", tipInfo.outerWidth() - 1 + "px");
            tipArrow.css("top", tb.Target.outerHeight() / 2 - 3 + "px");
            var btw = tb.Target.css("borderTopWidth"), blw = tb.Target.css("borderLeftWidth");
            var l = tb.TipAlign == "right" ? tb.Target.outerWidth() - parseInt(blw) : -tipInfo.outerWidth() - 4;
            tipEl.css({ top: "-" + btw, left: l + "px", width: tipInfo.outerWidth() + 3, height: tipInfo.outerHeight() });
        }
        else if (tb.TipAlign == "top" || tb.TipAlign == "bottom") {
            tipInfo.css({ "height": "14px", "line-height": "14px" });
            var btw = tb.Target.css("borderTopWidth"), blw = tb.Target.css("borderLeftWidth");
            if (tb.TipAlign == "bottom") tipInfo.css("top", "3px");
            else tipArrow.css("top", tipInfo.outerHeight() - 1 + "px");
            var t = tb.TipAlign == "top" ? -tipInfo.outerHeight() - parseInt(btw) - 3 : tb.Target.outerHeight() - parseInt(btw);
            tipEl.css({ top: t + "px", left: "-" + blw, width: tipInfo.outerWidth(), height: tipInfo.outerHeight() + 3 });
        }
    }
    ktw.NumberBox = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-numberbox'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-numberbox")) opt.Target.addClass("ktw-numberbox");
        $.extend(this, this.text = new ktw.Text(opt)), this.Target.prop("$this", $this), funExt(this);
        this.GroupSeparator = ktw.IsNull(opt.GroupSeparator) ? "" : opt.GroupSeparator;
        this.DecimalSeparator = ktw.IsNull(opt.DecimalSeparator) ? "." : opt.DecimalSeparator;
        this.Step = ktw.IsNull(opt.Step) ? null : opt.Step;
        this.Min = ktw.IsNull(opt.Min) ? null : opt.Min;
        this.Max = ktw.IsNull(opt.Max) ? null : opt.Max;
        this.Prefix = ktw.IsNull(opt.Prefix) ? "" : opt.Prefix;
        this.Suffix = ktw.IsNull(opt.Suffix) ? "" : opt.Suffix;
        this.Precision = ktw.IsNull(opt.Precision) ? 0 : opt.Precision;
        this.Text = opt.Value;
        this.Value = ktw.IsNull(opt.Value) ? "" : this.Parser(opt.Value);
        this.textBox.bind("focus", function () {
            this.style.imeMode = 'disabled';   // 禁用输入法,禁止输入中文字符
        });
        this.textBox.bind("blur", function () {
            $this.SetValue($this.textBox[0].value);
        });
        this.textBox.keypress(function (event) {
            return $this.Filter(event);
        });
        this.textBox.keydown(function (event) {
            return $this.Filter(event);
        });
        this.textBox.val(ktw.IsNull(opt.Value) ? "" : this.Formatter(this.Value));
    }
    function funExt(control) {
        $.fn.extend(control, {
            Options: function () {
                return this.Target[0].$this;
            },
            Destroy: function () {
                this.Target.remove();
            },
            SetValue: function (value) {
                var float = this.Formatter(this.Parser(value));
                this.textBox.val(ktw.IsNull(float) ? "" : float);

            },
            SetWidthEx: function (width) {
                if (!ktw.IsNumber(width)) return;
                this.Width = width;
                layout(this);
            },
            SetSizeEx: function (width, height) {
                if (!ktw.IsNumber(width) || !ktw.IsNumber(height)) return;
                this.Width = width;
                this.Height = height;
                layout(this);
            },
            Clear: function () {
                this.textBox.val("");
                //后期验证等的隐藏
            },
            GetValue: function () {
                return this.Fix();
            },
            Layout: function () { layout(this); },
            Filter: function (e) {
                var ispass = false;
                var val = this.textBox.val();
                var k = e.key;
                if (k == "Enter") this.SetValue(val);
                var rightKey = k == "Backspace" || k == "Spacebar" || k == "," || k == "Left" || k == "Right";
                var isNum = /\d/.test(k);
                if (ktw.IsNull(val)) {
                    if (isNum || (!isNum && (k == "." || k == "-" || rightKey))) ispass = true;
                }
                else {
                    if (isNum || (!isNum && ((val.indexOf("-") < 0 && k == "-") || (val.indexOf(".") < 0 && k == "."))) || rightKey)
                        ispass = true;
                }
                return ispass;
            },
            Formatter: function (value) {
                var step = this.Step;
                var splitor = this.GroupSeparator;
                if (!ktw.IsNull(value)) {
                    value = value.toFixed(this.Precision)
                    var str = value.toString(), str1, str2;
                    var index = str.indexOf(".");
                    if (index != -1) {
                        str1 = str.substring(0, index);
                        str2 = str.substring(index + 1, str.length);
                    } else {
                        str1 = str;
                        str2 = "";
                    }
                    if (step > 0) {
                        var len = str1.length;
                        if (len > step) {
                            var l1 = len % step,
                                l2 = parseInt(len / step),
                                arr = [],
                                first = str1.substr(0, l1);
                            if (first != '') {
                                arr.push(first);
                            };
                            for (var i = 0; i < l2 ; i++) {
                                arr.push(str1.substr(l1 + i * step, step));
                            };
                            str1 = arr.join(splitor);
                        };
                    }
                    return this.Prefix + str1 + ((index == -1) ? "" : this.DecimalSeparator) + str2 + this.Suffix;;
                } else {
                    return "";
                }
            },
            Parser: function (value) {
                value = value.toString().replace(/\s+/g, "").replace(/,/g, "").replace(this.Prefix, "").replace(this.Suffix, "");
                if (!ktw.IsNull(value)) {
                    var float = parseFloat(value);
                    var min = this.Min;
                    var max = this.Max;
                    if (!ktw.IsNull(min) && min > float) float = min;
                    if (!ktw.IsNull(max) && max < float) float = max;
                    return float;
                } else {
                    return null;
                }
            },
            Fix: function () {
                var value = this.textBox.val();
                var arr = value.split(this.GroupSeparator);
                value = arr.join("").replace(this.DecimalSeparator, ".").replace(this.Prefix, "").replace(this.Suffix, "");
                return value;
            },
            Disable: function () {
                this.textBox.attr("disabled", true);
            },
            Enable: function () {
                this.textBox.attr("disabled", false);
            },
            Reset: function () {
                var value = this.Formatter(this.Parser(this.Text));
                this.textBox.val(value);
            }
        });
    }
})(jQuery);
//Combo(下拉选择框)
(function ($) {
    function layout(cb) {
        cb.text.Layout();
        var _p = cb.GetPadding(cb.Target), h = cb.Target.height() + _p.h,
            b = cb.GetBorder(), p = cb.GetPadding(), w = cb.textBox.width();
        if (cb.downButton) {
            if (cb.requireDiv) {
                var r = cb.requireDiv.css("right");
                cb.requireDiv.css("right", (parseInt(r) + 12) + "px");
            }
            if (cb.xButton) cb.xButton.css("right", "12px");
            cb.downButton.css({ "height": h - b.h + "px" });
            w -= 12;
        }
        cb.textBox.css({ width: w + "px" });
    }
    function enter(cb) {
        cb.body.addClass("text-focus");
        if (cb.downButton) {
            cb.downButton.addClass("combo-down-button-focus");
            cb.downButton.children().addClass("icon-combobox2");
        }
    }
    function leave(cb) {
        cb.body.removeClass("text-focus");
        if (cb.downButton) {
            cb.downButton.removeClass("combo-down-button-focus");
            cb.downButton.removeClass("combo-down-button-down");
            cb.downButton.children().removeClass("icon-combobox2");
            cb.downButton.children().removeClass("icon-combobox3");
        }
    }
    function down(cb) {
        cb.downButton.addClass("combo-down-button-down");
        cb.downButton.children().addClass("icon-combobox3");
    }
    function up(cb) {
        cb.downButton.removeClass("combo-down-button-down");
        cb.downButton.children().removeClass("icon-combobox3");
    }
    function popup(cb, v) {
        if (v && v == "none") {
            cb.popup.css("display", v);
            return;
        }
        cb.popup.css("display", "block");
        if (cb.Target.prop("$this").listBox) cb.Target.prop("$this").listBox.Layout();
        var b = cb.GetBorder(), p = cb.GetPadding(cb.Target), w = cb.body.outerWidth() - 2,
            l = cb.header ? cb.header.outerWidth() : 0, t = cb.Target.height() + p.h - 1;
        if (cb.PopupAlign == "top") t = -cb.popup.outerHeight() + 1;
        cb.popup.css({ "width": w + "px", "left": l + "px", top: t + "px" });
    }
    ktw.Combo = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-combo'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-combo")) opt.Target.addClass("ktw-combo");
        if (ktw.IsNull(opt.Readonly)) {
            opt.Readonly = true;
            opt.ShowClearButton = false;
        }
        opt.MultiSelect = ktw.IsNull(opt.MultiSelect) ? false : opt.MultiSelect;
        if (opt.MultiSelect) opt.Readonly = true;
        $.extend(this, this.text = new ktw.Text(opt)), funExt(this), this.Target.prop("$this", $this);
        if (this.Readonly && this.xButton) this.xButton.remove(), this.xButton = this.text.xButton = null;
        this.PopupAlign = ktw.IsNull(opt.PopupAlign) ? "bottom" : opt.PopupAlign;
        this.IsOverShow = ktw.IsBoolean(opt.IsOverShow) ? opt.IsOverShow : opt.IsOverShow == "true";
        this.popup = $("<div class='combo-popup'></div>").appendTo(this.Target);
        this.popup.bind("contextmenu", function (e) { return false; });
        if (ktw.IsNull(opt.ShowDownButton) || opt.ShowDownButton != false) {
            this.downButton = $("<div class='combo-down-button'><div class='combo-arrow icon-combobox1'></div></div>").appendTo(this.body);
            if (parseInt(this.Border) == 0) this.downButton.css({
                "border-left-color": "transparent",
                "background-color": "transparent"
            });
            if (!ktw.IsNull(opt.DownButtonCSS)) this.downButton.css(opt.DownButtonCSS);
            this.downButton.bind("contextmenu", function (e) {
                return false;
            });
            this.downButton.bind("click", function () {
                up($this);
                $this.ShowPopup();
            });
            this.downButton.mousedown(function () {
                down($this);
            });
            this.downButton.mouseenter(function () {
                $this.over = true;
                enter($this);
            });
            this.downButton.mouseleave(function () {
                $this.over = false;
                if (!$this.focused) leave($this);
            });
        }
        this.textBox.mouseenter(function () {
            enter($this);
        });
        this.textBox.mouseleave(function () {
            if (!$this.focused) leave($this);
        });
        this.textBox.bind("focus", function () {
            $this.focused = true;
            enter($this);
        });
        this.textBox.bind("blur", function () {
            $this.focused = false;
            if (!$this.over) leave($this);
        });
        this.textBox.bind('onChange', function () {
            $this.RefreshRequire();
        });
        this.textBox.mousedown(function () {
            down($this);
        });
        this.textBox.mouseup(function () {
            up($this);
        });
        this.textBox.click(function () {
            $this.ShowPopup();
        });
        this.readonlyEl.mouseenter(function () {
            enter($this);
            if ($this.IsOverShow) $this.ShowPopup();
        });
        this.readonlyEl.mouseleave(function () {
            leave($this);
        });
        this.readonlyEl.mousedown(function () {
            down($this);
        });
        this.readonlyEl.mouseup(function () {
            up($this);
        });
        this.readonlyEl.click(function () {
            $this.ShowPopup();
        });
        this.Target.mouseleave(function () {
            if ($this.ShowPopup) $this.HidePopup();
        });
        if (this.header) this.header.mouseenter(function () {
            if ($this.ShowPopup) $this.HidePopup();
        });
        layout(this);
    }
    function funExt(control) {
        $.fn.extend(control, {
            SetText: function (text) {
                this.text.SetValue(text);
            },
            ShowPopup: function () {
                popup(this, "block");
            },
            HidePopup: function () {
                popup(this, "none");
            },
            GetText: function () {
                return this.textBox.val();
            },
            Clear: function () {
                this.text.Clear();
            },
            SetWidth: function (width) {
                this.text.SetWidth(width);
                this.Layout();
            },
            SetHeight: function (height) {
                this.text.SetHeight(height);
                this.Layout();
            },
            SetSize: function (size) {
                this.text.SetSize(size);
                this.Layout();
            },
            SetPopueHeight: function (height) {
                this.popup.height(height);
            },
            Layout: function () {
                layout(this);
            }
        });
    }
})(jQuery);
//Combobox(下拉选择输入框)
(function ($) {
    ktw.Combobox = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-combobox'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-combobox")) opt.Target.addClass("ktw-combobox");
        $.extend(this, this.combo = new ktw.Combo(opt)), funExt(this), this.Target.prop("$this", $this);
        this.listBox = new ktw.ListBox({
            TextField: opt.TextField, ValueField: opt.ValueField, Height: opt.PopupHeight, Parent: this.popup,
            Data: ktw.IsNull(opt.Data) ? [] : opt.Data, MultiSelect: opt.MultiSelect, ShowCheckBox: opt.MultiSelect,
            SelectedItem: opt.SelectedItem, SelectedIndex: opt.SelectedIndex, CSS: { "border": "0px" }
        });
        this.listBox.bind("onSelectChanged", function () {
            $this.text.SetValue($this.listBox.GetText());
            $this.Target.triggerHandler("onSelectChanged", $this.listBox.SelectedItem);
            if (!$this.listBox.MultiSelect) $this.HidePopup();
        });
        this.text.SetValue(this.listBox.GetText());
        this.Layout();
    }
    function funExt(control) {
        $.fn.extend(control, {
            SetValue: function (value) {
                var lb = this.listBox;
                if (ktw.IsNull(lb.Data) || ktw.IsNull(value)) return lb.SetSelectedIndex(-1);
                for (var i = 0; i < lb.Data.length; i++) {
                    if (value == lb.GetValue(lb.Data[i])) return lb.SetSelectedIndex(i);
                }
                return lb.SetSelectedIndex(-1);
            },
            SetData: function (data) {
                this.listBox.SetData(data);
                this.RefreshRequire();
            },
            SetSelectedItem: function (item) {
                this.listBox.SetSelectedItem(item);
            },
            SetSelectedIndex: function (index) {
                this.listBox.SetSelectedIndex(index);
            },
            GetData: function () {
                return this.listBox.Data;
            },
            GetValue: function () {
                return this.listBox.GetValue();
            },
            ShowPopup: function () {
                this.combo.ShowPopup(), this.listBox.Layout();
            },
            GetSelectedItem: function () {
                return this.listBox.SelectedItem;
            },
            Clear: function () {
                this.listBox.SetData([]);
                this.text.Clear();
            },
            SetWidth: function (width) {
                this.text.SetWidth(width);
                this.Layout();
            },
            SetHeight: function (height) {
                this.text.SetHeight(height);
                this.Layout();
            },
            SetSize: function (size) {
                this.text.SetSize(size);
                this.Layout();
            },
            SetPopueHeight: function (height) {
                this.listBox.SetHeight(height);
            },
            Layout: function () {
                this.combo.Layout();
                this.listBox.SetCSS({ "width": (this.body.outerWidth() - 2) + "px" });
            }
        });
    }
})(jQuery);
//CheckBox
(function ($) {
    function getChecked(checked, threeState) {
        if (threeState && ktw.IsNull(checked)) return null;
        return ktw.IsBoolean(checked) ? checked : checked == "true";
    }
    ktw.CheckBox = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this, guid = Guid.NewGuid().ToString('N');
        if (ktw.IsNull(opt.Target)) opt.Target = $("<div class='ktw-checkbox'></div>");
        else if (ktw.IsNull(opt.ID)) opt.ID = opt.Target.attr("id");
        $.extend(this, this.control = new ktw.Control(opt)), funExt(this), this.Target.prop("$this", this);
        this.Target.css("display", this.Visible ? "inline-block" : "none");
        this.ThreeState = ktw.IsBoolean(opt.ThreeState) ? opt.ThreeState : opt.ThreeState == "true";
        this.checkboxPanel = $("<div class='checkboxPanel icon-checkbox-0'></div>").appendTo(this.Target);
        this.checkbox = $("<input id='" + guid + "' type='checkbox' value='" + (ktw.IsNull(opt.Value) ? "" : opt.Value) + "'/>").appendTo(this.checkboxPanel);
        this.label = $("<label for='" + guid + "' class='Text'>" + (ktw.IsNull(opt.Text) ? "" : opt.Text) + "</label>").appendTo(this.Target);
        this.SetChecked(this.Checked = getChecked(opt.Checked, this.ThreeState), true);
        this.checkbox.change(function () {
            $this.SetChecked($this.checkbox[0].checked);
        });
    }
    function funExt(control) {
        $.fn.extend(control, {
            SetChecked: function (checked, flag) {
                checked = getChecked(checked, this.ThreeState);
                if (ktw.IsNull(flag) && this.Checked == checked) return;
                this.Checked = checked;
                if (this.Checked != null) {
                    this.checkbox[0].checked = this.Checked;
                    this.checkboxPanel.removeClass("icon-checkbox-2");
                    this.checkboxPanel.removeClass(this.Checked ? "icon-checkbox-0" : "icon-checkbox-1");
                    this.checkboxPanel.addClass(this.Checked ? "icon-checkbox-1" : "icon-checkbox-0");
                }
                else {
                    this.checkbox[0].checked = false;
                    this.checkboxPanel.removeClass("icon-checkbox-0");
                    this.checkboxPanel.removeClass("icon-checkbox-1");
                    this.checkboxPanel.addClass("icon-checkbox-2");
                }
                this.Target.attr("_checked", '' + this.Checked);
                this.Target.trigger("onChange", this.Checked);//选择变化事件
            },
            SetValue: function (value) {
                this.checkbox.val(ktw.IsNull(value) ? "" : value);
            },
            GetValue: function () {
                return this.checkbox.val();
            }
        });
    }
})(jQuery);
//Radio
(function ($) {
    ktw.Radio = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        opt.Height = ktw.IsNull(opt.Height) ? 16 : opt.Height;
        if (ktw.IsNull(opt.Target)) opt.Target = $('<span class="ktw-radio"></span>');
        else opt.ID = opt.Target.attr("id");
        $.extend(this, new ktw.Control(opt));
        this.Target.css("display", "inline-block");
        this.Checked = ktw.IsBoolean(opt.Checked) ? opt.Checked : false;
        this.Parent = opt.Parent;
        this.Value = opt.Value;
        this.Name = opt.Name;
        this.Text = opt.Text;
        var id = Guid.NewGuid().ToString('N');
        this.radio = $('<span class="radio ' + (this.Checked ? 'icon-radio-1' : "icon-radio-0")
                     + '" name="' + this.Name + '"><input id="' + id + '" checked="' + (this.Checked ? "checked" : "")
                     + '" type="radio" name="' + this.Name + '" value="' + this.Value + '"/></span>');
        $("input[type=radio]", this.radio).change(function (s, e) {
            $this.Checked = $(this).prop("checked");
            $("span[group=" + $this.Name + "]").attr("_checked", false);
            $("span[name='" + $(this).attr("name") + "']").removeClass("icon-radio-1").removeClass("icon-radio-0").addClass("icon-radio-0");
            var className = $this.Checked ? 'icon-radio-1' : "icon-radio-0";
            $(this).parent().addClass(className);
            $this.Target.attr("_checked", $this.Checked);
            $this.Target.triggerHandler("onChange", $this);
        });
        this.Target.append(this.radio);
        this.Target.append($('<label class="Text" for="' + id + '">' + this.Text + '</label>'));
        $("input[type=radio]", this.radio).prop("checked", this.Checked);
        this.Target.attr("_checked", this.Checked).attr("group", this.Name);
        if (!ktw.IsNull(this.Parent) && ktw.IsjQueryObject(this.Parent)) this.Parent.append(this.Target);
        funExt(this);
        this.Target.prop("$this", this);
    };
    function funExt(control) {
        $.fn.extend(control, {
            GetLabel: function () {
                return $(".Text", this.Target);
            },
            GetValue: function () {
                return $("input[type = radio]", this.radio).val();
            },
            SetValue: function (value) {
                $("input[type = radio]", this.radio).val(this.Value = value);
            },
            GetText: function () {
                return $(".Text", this.Target).text();
            },
            SetText: function (text) {
                $(".Text", this.Target).text(this.Text = text);
            },
            GetChecked: function () {
                return $("input[type = radio]", this.radio).prop("checked");
            },
            SetChecked: function (checked) {
                if (!ktw.IsBoolean(checked) || this.Checked === checked) return;
                this.Checked = checked;
                var radioButton = $("input[type = radio]", this.radio);
                radioButton.prop("checked", this.Checked);
                radioButton.change();
            },
            GetCheckedRadio: function () {
                return $("[name=" + $("[type = radio]", this.radio).attr("name") + "]").find(".icon-radio-1");
            },
            GetGroupCheckValue: function (group) {
                var radio = $("[group=2014]").filter(function (i, o) {
                    return $(o).attr("_checked") === "true";
                });

                return radio.prop("$this").GetValue();
            },
            GetGroupRadio: function () {
                return $("[name=" + $("[type = radio]", this.radio).attr("name") + "]");
            }
        });
    }
})(jQuery);
//ListBox
(function ($) {
    function do_selected(cb) {
        function doItem(c, arr) {
            for (var i = 0; i < c.SelectedItem.length; i++) {
                var _i = $.inArray(c.SelectedItem[i], c.Data);
                if (_i >= 0 && $.inArray(_i, arr) < 0) arr.push(_i);
            }
        }
        function doIndex(c, arr) {
            for (var i = 0; i < c.SelectedIndex.length; i++) {
                if (c.SelectedIndex[i] >= 0 && c.SelectedIndex[i] < c.Data.length
                    && $.inArray(c.SelectedIndex[i], arr) < 0) arr.push(c.SelectedIndex[i]);
            }
        }
        function doResult(c, arr) {
            if (arr.length == 0) {
                c.SelectedIndex = $([]);
                c.SelectedItem = $([]);
            } else {
                var item = [];
                for (var i = 0; i < arr.length; i++) {
                    item.push(cb.Data[arr[i]]);
                }
                c.SelectedIndex = $(arr);
                c.SelectedItem = $(item);
            }
        }
        if (cb.Data.length == 0) {
            cb.SelectedItem = $([]);
            cb.SelectedIndex = $([]);
        }
        else {
            var index = [];
            doItem(cb, index);
            doIndex(cb, index);
            doResult(cb, index);
        }
    }
    function select(cb, selection, isIndex) {
        cb.SelectedIndex = [], cb.SelectedItem = [];
        selection = ktw.IsBaseType(selection) ? $([selection]) : $(selection);
        if (selection.length > 0 && isIndex) {
            var arrIndex = [], arrItem = [];
            for (var i = 0; i < selection.length; i++) {
                if (selection[i] >= 0 && selection[i] < cb.Data.length) {
                    arrIndex.push(selection[i]), arrItem.push(cb.Data[selection[i]]);
                }
            }
            cb.SelectedIndex = arrIndex, cb.SelectedItem = arrItem;
        }
        else if (selection.length > 0 && !isIndex) {
            var arrIndex = [], arrItem = [];
            for (var i = 0; i < selection.length; i++) {
                var _i = $.inArray(selection[i], cb.Data);
                if (_i >= 0) {
                    arrIndex.push(_i), arrItem.push(cb.Data[_i])
                }
            }
            cb.SelectedIndex = arrIndex, cb.SelectedItem = arrItem;
        }
        $(".listbox-item", cb.Target).each(function (i, o) {
            var item = $(o).prop("$this"), sed = $.inArray(item, cb.SelectedItem) >= 0;
            $(o).css("background-color", sed ? "#FFE48D" : "");
            if (cb.ShowCheckBox) {
                if (sed) $(".listbox-text", o).removeClass("icon-checkbox-3").addClass("icon-checkbox-4");
                else $(".listbox-text", o).removeClass("icon-checkbox-4").addClass("icon-checkbox-3");
            }
        });
        cb.Target.triggerHandler("onSelectChanged", cb.SelectedItem);
    }
    ktw.ListBox = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-listbox'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-listbox")) opt.Target.addClass("ktw-listbox");
        if (!ktw.IsNull(opt.Width)) opt.Target.width(opt.Width);
        if (!ktw.IsNull(opt.Height)) opt.Target.height(opt.Height);
        $.extend(this, this.control = new ktw.Control(opt)), funExt(this), this.Target.prop("$this", this);
        this.ShowCheckBox = ktw.IsNull(opt.ShowCheckBox) ? false : opt.ShowCheckBox;
        this.MultiSelect = ktw.IsNull(opt.MultiSelect) ? false : opt.MultiSelect;
        this.Data = ktw.IsNull(opt.Data) ? [] : opt.Data;
        this.Stretched = false;
        this.TextField = opt.TextField, this.ValueField = opt.ValueField;
        if (ktw.IsBaseType(opt.SelectedItem)) opt.SelectedItem = [opt.SelectedItem];
        this.SelectedItem = ktw.IsNull(opt.SelectedItem) ? $([]) : $(opt.SelectedItem);
        if (ktw.IsNumber(opt.SelectedIndex)) opt.SelectedIndex = [opt.SelectedIndex];
        this.SelectedIndex = ktw.IsNull(opt.SelectedIndex) ? $([]) : $(opt.SelectedIndex);
        do_selected(this);
        this.SetData(this.Data, true);
    }
    function funExt(control) {
        $.fn.extend(control, {
            SetData: function (data, f) {
                if (ktw.IsNull(f)) this.SelectedItem = [], this.SelectedIndex = [];
                if (ktw.IsNull(data)) data = $([]);
                if (!ktw.IsjQueryObject(data)) data = $(data);
                var $this = this;
                this.Data = data;
                var v = ktw.IsNull(this.ValueField), t = ktw.IsNull(this.TextField);
                var panel = $("<div class='listbox-panel'></div>");
                if (this.Target[0].style.height != "") {
                    this.Stretched = true;
                    if (this.Box) this.Box.SetContent(panel);
                    else this.Box = new ktw.Box({ HasBorder: false, Parent: this.Target, Content: panel });
                }
                else this.Target.empty(), panel.appendTo(this.Target), this.Stretched = false;
                for (var i = 0; i < data.length; i++) {
                    var div = $("<div class='listbox-item'></div>").appendTo(panel);
                    div.prop("$this", data[i]);
                    div.click(function () {
                        if ($this.MultiSelect) {
                            var o = $(this).prop("$this"), d = $this.Data, si = $this.SelectedIndex,
                                item = $this.SelectedItem, sed = $.inArray(o, item) == -1;
                            if (sed) {
                                var i = $.inArray(o, d);
                                item.push(o);
                                si.push(i);
                            }
                            else {
                                var i = $.inArray(o, item);
                                item.splice(i, 1);
                                si.splice(i, 1);
                            }
                            $this.SetSelectedItem(item);
                        }
                        else $this.SetSelectedItem($(this).prop("$this"));
                    });
                    if (!v) div.prop("value", data[i][this.ValueField]);
                    var text = t ? data[i] : data[i][this.TextField];
                    var hasIcon = data[i].icon || data[i].iconCls;
                    if (hasIcon) {
                        if (data[i].icon) div.append("<img class='listbox-icon' src='" + data[i].icon + "'/>");
                        else div.append("<img src='../image/transparent.png' class='listbox-icon " + data[i].iconCls + "'/>");
                    }
                    var span = $("<span class='listbox-text'>" + text + "</span>").appendTo(div);
                    var sed = $.inArray(i, this.SelectedIndex) >= 0;
                    var padding = "0px", left = "22px";
                    if (this.ShowCheckBox && hasIcon) padding = "36px", left = "20px";
                    else if (!this.ShowCheckBox && hasIcon) padding = "20px", left = "4px";
                    else if (this.ShowCheckBox && !hasIcon) padding = "16px";
                    if (this.ShowCheckBox) span.addClass(sed ? "icon-checkbox-4" : "icon-checkbox-3");
                    if (hasIcon) $(".listbox-icon", div).css("left", left);
                    span.css("padding-left", padding);
                    if (sed) div.css("background-color", "#FFE48D");
                }
            },
            SetSelectedItem: function (item) {
                select(this, item, false);
            },
            SetSelectedIndex: function (index) {
                if (index == 0) index = [0];
                select(this, index, true);
            },
            SetHeight: function (height) {
                var f = !ktw.IsNull(height) && ("" + height).indexOf('%') > 0;
                if (!f && isNaN(parseInt(height))) {
                    if (this.Target[0].style.height != "") {
                        var panel = $(".listbox-panel", this.Target);
                        panel.css("position", "relative");
                        this.Target[0].style.height = "";
                        this.Target.append(panel);
                        this.Box.Target.remove();
                        this.Box = null;
                        this.Stretched = false;
                    }
                }
                else {
                    if (!this.Box) this.Box = new ktw.Box({ HasBorder: false, Parent: this.Target });
                    this.Target.css("height", height);
                    this.Stretched = true;
                    this.Box.SetContent($(".listbox-panel", this.Target));
                }
                this.Target.trigger("onResize");//大小变化事件
            },
            GetText: function (item) {
                if (ktw.IsNull(item)) item = this.SelectedItem;
                if (ktw.IsNull(item)) return "";
                if (ktw.IsBaseType(item)) item = [item];
                var text = "", $this = this;
                $(item).each(function (i, o) {
                    if (!ktw.IsNull(o)) {
                        if (!ktw.IsNull($this.TextField)) {
                            if (o[$this.TextField])
                                text += o[$this.TextField] + "，";
                        }
                        else text += o + "，";
                    }
                });
                if (text == "") return text;
                return text.substring(0, text.length - 1);
            },
            GetValue: function (item) {
                if (ktw.IsNull(item)) item = this.SelectedItem;
                if (ktw.IsNull(item)) return "";
                if (ktw.IsBaseType(item)) item = [item];
                var vals = [], $this = this;
                $(item).each(function (i, o) {
                    if (!ktw.IsNull(o)) {
                        if (!ktw.IsNull($this.ValueField)) {
                            vals.push(o[$this.ValueField]);
                        } else vals.push(o);
                    }
                    else vals.push(undefined);
                });
                if (vals.length > 1 || this.MultiSelect) return vals;
                return vals.length == 0 ? undefined : vals[0];
            },
            Layout: function () { if (this.Box) this.Box.Layout(); }
        });
    }
})(jQuery);
//NumberSpinnerBox(数字微调)
(function ($) {
    function enter(target) {
        if (!target._over) return;
        target.Target.addClass("ktw-numberspinner-hover");
        target.Target.children("div").addClass("spinnerbutton-hover");
        target.spinupButton.children().addClass("icon-combobox5");
        target.spindownButton.children().addClass("icon-combobox2");
    }

    function leave(target) {
        if (target._focused && target._over) return;
        target.Target.removeClass("ktw-numberspinner-hover");
        target.Target.children("div").removeClass("spinnerbutton-hover");
        target.spinupButton.children().removeClass("icon-combobox5");
        target.spindownButton.children().removeClass("icon-combobox2");
    }

    function layout(target) {
        target.Target.outerWidth(target.Target.width());
        target.numberbox.height(target.Target.height() - 2);
        target.numberbox.width(target.Target.width() - target.spinner.outerWidth() - 1);
        target.spinner.height(target.Target.height());
    }

    function resetValue(target) {
        if (ktw.IsNull(target.Value)) return;
        var vlstring = "";
        if (!ktw.IsNull(target.Prefix)) vlstring += target.Prefix;
        if (!ktw.IsNull(target.Value)) vlstring += target.Value.toFixed(target.Precision);
        if (!ktw.IsNull(target.Suffix)) vlstring += target.Suffix;
        target.numberbox.val(vlstring);
        if (ktw.IsNull(target.oldvalue)) target.oldvalue = null;
        if (target._oldvalue == target.Value) return;
        target.Target.triggerHandler("onChange", { newValue: target.Value, oldValue: target.oldvalue });
    }

    ktw.NumberSpinnerBox = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        opt.Width = ktw.IsNull(opt.Width) ? 150 : opt.Width;
        opt.Height = ktw.IsNull(opt.Height) ? 22 : opt.Height;
        if (ktw.IsNull(opt.Target)) opt.Target = $('<div class="ktw-numberspinner"></div>');
        else opt.ID = opt.Target.attr("id");
        opt.Target.css({ "width": opt.Width, "height": opt.Height });
        if (!ktw.IsNull(opt.CSS)) opt.Target.css(opt.CSS);
        $.extend(this, new ktw.Control(opt));
        this.Precision = ktw.IsNumber(opt.Precision) ? opt.Precision : 0;
        this.Value = !ktw.IsNumber(opt.Value) ? null : parseFloat(opt.Value.toFixed(this.Precision));
        this.Prefix = ktw.IsNull(opt.Prefix) ? "" : opt.Prefix;
        this.Suffix = ktw.IsNull(opt.Suffix) ? "" : opt.Suffix;
        this.Min = !ktw.IsNumber(opt.Min) ? null : opt.Min;
        this.Max = !ktw.IsNumber(opt.Max) ? null : opt.Max;
        this.Increment = !ktw.IsNumber(opt.Increment) ? 1 : opt.Increment;
        this.numberbox = $('<input class="numberbox" type="text"/>');
        this.spinner = $('<div class="spinnerbutton"></div>');
        this.spinupButton = $('<div class="btnArrowup"><div class="icon-combobox4" style="width: 5px; height: 3px; position: absolute; left: 3px; top: 4px;"></div></div>');
        this.spindownButton = $('<div class="btnArrowdown"><div class="icon-combobox1" style="width: 5px; height: 3px; position: absolute; left: 3px; top: 4px;"></div></div>');
        this.spinner.append(this.spinupButton).append(this.spindownButton);
        this.Target.append(this.numberbox).append(this.spinner);
        resetValue(this);
        this.Target.bind("focusin", function () { $this._focused = true; });
        this.Target.bind("focusout", function () {
            leave($this);
            $this._focused = false;
            if ($this._over) return;
            var valString = $this.numberbox.val().replace($this.Prefix, "").replace($this.Suffix, "");
            if (ktw.IsNull(valString)) return;
            else if (valString == "." || valString == "-" || valString == ".-" || valString == "-." || isNaN(parseFloat(valString)) || !isFinite(parseFloat(valString))) {
                $this.numberbox.val("");
                return;
            }
            $this._oldvalue = $this.Value;
            var newvalue = parseFloat(parseFloat(valString).toFixed($this.Precision));
            if (!ktw.IsNull($this.Max) && newvalue > $this.Max) newvalue = parseFloat($this.Max.toFixed($this.Precision));
            if (!ktw.IsNull($this.Min) && newvalue < $this.Min) newvalue = parseFloat($this.Min.toFixed($this.Precision));
            $this.Value = newvalue;
            resetValue($this);

        });
        this.Target.bind("mouseover", function () {
            $this._over = true;
            enter($this);
        });
        this.Target.bind("mouseleave", function () {
            leave($this);
            $this._over = false;
        });
        this.Target.bind("keypress", function (e) {
            var ispass = false;
            var val = $this.numberbox.val();
            var isNum = /\d/.test(e.key);
            if (ktw.IsNull(val)) {
                if (isNum || (!isNum && (e.key == "." || e.key == "-"))) ispass = true;
            }
            else {
                if (isNum || (!isNum && ((val.indexOf("-") < 0 && e.key == "-") ||
                    (val.indexOf(".") < 0 && e.key == ".")))) ispass = true;
            }
            return ispass;
        });

        this.spinupButton.mousedown(function () {
            $(this).css("background-color", "#c9def5");
            $(this).children().addClass("icon-combobox6");
        }).mouseup(function () {
            $(this).css("background-color", "");
            $(this).children().removeClass("icon-combobox6");
            if (ktw.IsNull($this.Value)) $this.Value = 0;
            var newvalue = $this.Value + $this.Increment;
            if (!ktw.IsNull($this.Max)) newvalue = $this.Value + $this.Increment > $this.Max ? $this.Max : $this.Value + $this.Increment;
            newvalue = parseFloat(newvalue.toFixed($this.Precision));
            $this._oldvalue = $this.Value;
            $this.Target.triggerHandler("onSpinUp", { newValue: newvalue, oldValue: $this.Value });
            $this.Value = newvalue;
            resetValue($this);
        });

        this.spindownButton.mousedown(function () {
            $(this).css("background-color", "#c9def5");
            $(this).children().addClass("icon-combobox3");
        }).mouseup(function () {
            $(this).css("background-color", "");
            $(this).children().removeClass("icon-combobox3");
            if (ktw.IsNull($this.Value)) $this.Value = 0;
            var newvalue = $this.Value - $this.Increment;
            if (!ktw.IsNull($this.Min)) newvalue = $this.Value - $this.Increment < $this.Min ? $this.Min : $this.Value - $this.Increment;
            newvalue = parseFloat(newvalue.toFixed($this.Precision));
            $this._oldvalue = $this.Value;
            $this.Target.triggerHandler("onSpinDown", { newValue: newvalue, oldValue: $this.Value });
            $this.Value = newvalue;
            resetValue($this);
        });

        funExt(this);
        this.Target.prop("$this", this);
    }

    function funExt(control) {
        $.fn.extend(control, {
            Layout: function () { layout(control); }
        });
    }
})(jQuery);
//Tree(级联树)
(function ($) {
    function refNodes(t, d, p, index) {
        var d = $(d), is = 0;
        if (d.length == 0) return;
        if (p != t.rootNodeEL) is = p.prev().children(".indent").length + 1;
        for (var i = 0; i < d.length; i++) {
            if (ktw.IsNull(d[i][t.ValueField])) d[i].id = d[i][t.ValueField] = "node" + new Date().getTime();
            var n = $("<div id='" + d[i][t.ValueField] + "' class='node'></div>");
            if (!ktw.IsNull(index) && index >= 0) n.insertBefore($("div .node:nth-child(" + i + ")", p));
            else n.appendTo(p);
            var hasChildren = $(d[i][t.ChildrenField]).length > 0;
            if (!ktw.IsNull(d[i][t.ChildrenField]) && !ktw.IsNull(d[i][t.ChildrenField].length) && d[i][t.ChildrenField].length == 0 && t.IsShowArrowNoChild) hasChildren = true;
            for (var j = 0; j < is; j++) $('<span class="indent"></span>').appendTo(n);//这个可以判断是第几级节点
            var expandclass = d[i][t.StateField] === 'open' && hasChildren ? "expanded" : (!hasChildren ? "" : "collapsed");
            var arrow = $('<span class="arrow ' + expandclass + '"></span>').appendTo(n);
            if (t.CheckBox && (!t.OnlyLeafCheckBox || (!hasChildren && t.OnlyLeafCheckBox)) && !d[i].noCheckbox) {
                var checkType = "checkbox0";
                if (d[i][t.CheckedField] && d[i][t.CheckedField] === null) checkType = "checkbox2";
                else if (d[i][t.CheckedField] && d[i][t.CheckedField] === true) checkType = "checkbox1";
                $('<span class="checkbox-default ' + checkType + '"></span>').appendTo(n).prop("checked", d[i][t.CheckedField]);
            }
            if (d[i].iconCls) $('<span class="icon-default ' + d[i].iconCls + '"></span>').appendTo(n);
            else if (d[i].icon) {
                ktw.InsertIconRule(t.TempStyle, ".nodeIcon" + d[i][t.ValueField], d[i].icon);
                $('<span class="icon-default ' + "nodeIcon" + d[i][t.ValueField] + '"></span>').appendTo(n);
            }
            $('<span class="title">' + d[i][t.TextField] + '</span>').appendTo(n);
            n.prop("$this", $.extend({ Target: n[0] }, d[i]));
            if (hasChildren) {
                if (d[i][t.CheckedField]) d[i][t.ChildrenField] = childChecked(d[i][t.ChildrenField], d[i][t.CheckedField], t.CheckedField);
                refNodes(t, d[i][t.ChildrenField], $('<div style="display:' + (d[i][t.StateField] === 'open' ? "" : "none") + ';"></div>').appendTo(p));
                if (!d[i][t.CheckedField] && $("span.checkbox-default", n).length > 0) d[i][t.CheckedField] = refParent(n, t);
            }
            $(".arrow", n).click(function () {//折叠事件
                var nodes = $(this).parent();
                var state = nodes.next().css("display") == "none" ? "open" : "close";
                doFold(t, nodes, state);
            });//折叠展开按钮点击事件
            $(".checkbox-default", n).click(function (s, e) {//选中框点击事件
                //checkbox0-表示未选中,checkbox2-表示部分选中,checkbox1-表示选中
                if ($(this).hasClass("checkbox0") || $(this).hasClass("checkbox2")) var checked = true;
                else if ($(this).hasClass("checkbox1")) checked = false;
                doCheck(t, $(this).parent(), checked);
            });//复选框勾选
            n.click(function (s, e) {//节点点击事件
                doSelect(t, $(this));
                t.Target.triggerHandler("onClick", this);
            }).contextmenu(function (e) {//节点菜单右键
                doSelect(t, $(this));
                t.Target.triggerHandler("onContextMenu", { event: e, target: this });
                return false;
            });
            if (d[i][t.SelectedField]) doSelect(t, n);
        }
    }
    function childChecked(children, checked, checkField) {
        if (!children || children.length === 0) return children;
        for (var i = 0; i < children.length; i++) {
            children[i][checkField] = checked;
        }
        return children;
    }
    function doCheck(t, node, checked) {
        var nodeData = node.prop("$this");
        var checkbox = $("span.checkbox-default", node);
        t.Target.triggerHandler("onChecking", { node: node, checked: checked, nodeData: nodeData });
        //t.Target.triggerHandler("onChecking", { node: node, checked: nodeData.checkedqa })
        var checkClass = checked ? "checkbox1" : checked === null ? "checkbox2" : "checkbox0";
        checkbox.removeClass("checkbox0").removeClass("checkbox2").removeClass("checkbox1").addClass(checkClass);
        nodeData[t.CheckedField] = checked;
        refChild(node, checked, t);
        if (node.children(".indent").length > 0) refParent(node.parent().prev(), t);
        t.Target.triggerHandler("onChecked", { node: node, checked: checked, nodeData: nodeData });
    }//checkbox选择变换方法
    function refParent(p, t) {
        if (!p.hasClass("node") || p.length === 0) return;
        var checked = true;
        var cl = $("span.checkbox-default", p.next()).length;
        var children = $("span.checkbox1", p.next());
        if (children.length === 0) checked = false;
        else if (children.length < cl) checked = null;
        var checkClass = checked === true ? "checkbox1" : (checked === null ? "checkbox2" : "checkbox0");
        $("span.checkbox-default", p).removeClass("checkbox0").removeClass("checkbox2").removeClass("checkbox1").addClass(checkClass);
        p.prop("$this")[t.CheckedField] = checked;
        if (p.children(".indent").length > 0) refParent(p.parent().prev(), t);
    }//帅新父节点
    function refChild(node, checked, t) {
        if (node.next().hasClass("node") || node.next().length === 0 || checked === null) return;
        var children = $("span.checkbox-default", node.next());//刷新子节点
        for (var i = 0; i <= children.length - 1; i++) {
            var child = $(children[i]);
            var nodeData = $(children[i]).parent().prop("$this");
            var checkClass = checked ? "checkbox1" : "checkbox0";
            child.removeClass("checkbox0").removeClass("checkbox2").removeClass("checkbox1").addClass(checkClass);
            nodeData[t.CheckedField] = checked;
        }
    }//刷新子节点
    function doSelect(t, node) {
        if (ktw.IsNull(t.SelectedItem) || t.SelectedItem[0] != node[0]) {
            if (t.SelectedItem) {
                t.SelectedItem.removeClass("node-selected");
                t.SelectedItem.prop("$this")[t.SelectedField] = false;
            }
            node.addClass("node-selected");
            t.SelectedItem = node;
            t.SelectedItem.prop("$this")[t.SelectedField] = true;
        }
        t.Target.triggerHandler("onSelectChanged", t.SelectedItem);
    }//选择节点
    function doFold(t, node, state) {
        var arrow = $(".arrow", node);
        var nodeData = node.prop("$this");
        var childNode = node.next();
        if (state == nodeData) return;
        if (childNode.hasClass("node") || childNode.length === 0) return;
        if (state == "open") {
            t.Target.triggerHandler("onExpanding", { node: node, nodeData: nodeData });
            arrow.removeClass("collapsed").addClass("expanded");
            var h = childNode.css({ display: "", height: "" }).height();
            childNode.css("height", "0px");
            childNode.animate({ height: h }, {
                duration: "fast", queue: true,
                complete: function () {
                    childNode.css("height", "");
                    nodeData[t.StateField] = "open";
                    t.Target.triggerHandler("onExpanded", { node: node, nodeData: nodeData });
                }
            });
        } else {
            t.Target.triggerHandler("onCollapsing", { node: node, nodeData: nodeData });
            arrow.removeClass("expanded").addClass("collapsed");
            childNode.animate({ height: 0 }, {
                duration: "fast", queue: true,
                complete: function () {
                    childNode.css("display", "none");
                    nodeData[t.StateField] = "close";
                    t.Target.triggerHandler("onCollapsed", { node: node, nodeData: nodeData });
                }
            });
        }
    }//展开折叠方法
    function domToObj(nodes) {
        var ns = [];
        $.each(nodes, function (i, o) {
            ns.push($(o).attr("$this"));
        });
        return ns;
    }//将dom转换成对象
    function getLeafs(t, target, checked, hasCheckBox) {
        if (ktw.IsNull(target)) target = t.rootNodeEL;//获取所有的叶子节点
        else target = $(target).next();
        if (target.hasClass("node") || target.length == 0) return target;
        var nodes = $(".node", target);
        return nodes.filter(function (i, o) {
            var data = $(o).prop("$this");
            var isright = ktw.IsNull(data[t.ChildrenField]) || data[t.ChildrenField].length === 0;
            if (checked == null || checked == true || checked == false) isright = isright && data[t.CheckedField] === checked;
            return isright;
        });
    }//获取所有的叶子节点
    function getCheked(t, target, checked) {
        if (ktw.IsNull(target)) target = t.rootNodeEL;//获取所有的叶子节点
        else target = $(target).next();
        var selector = checked ? ".checkbox1" : checked == null ? ".checkbox2" : ".checkbox0";
        if (target.hasClass("node") || target.length == 0) return;
        var nodes = $(".node", target);
        return nodes.filter(function (i, o) {
            return $(o).prop("$this")[t.CheckedField] === checked;
        });
    }//获取所有的选中的
    function fold(t, target, isAll, state) {
        var nodes = target;
        if (ktw.IsNull(target)) nodes = t.GetRoots();
        flodNode(t, nodes, isAll, state);
    }//折叠展开节点
    function flodNode(t, nodes, isAll, state) {
        $.each($(nodes), function (i, o) {
            var data = $(o).prop("$this");
            if (data[t.StateField] != state && !ktw.IsNull(data[t.ChildrenField]) && data[t.ChildrenField].length > 0) doFold(t, $(o), state);
            if (isAll && data.children && data.children.length > 0) {
                var child = $(o).next();
                flodNode(t, $(".node", child), isAll, state);
            }
        });
    }
    function addNode(t, nodes, target) {
        if (ktw.IsNull(node) || ktw.IsNull(target)) return;
        var c = $(target).next();
        if ($(target).hasClass("node") && c.hasClass("node"))
            $('<div style="display:' + (state === 'open' ? "" : "none") + ';"></div>').insertAfter($(target));
        refNodes($this, nodes, $(target).next());
    }
    function getText(t, target) {
        if (ktw.IsNull(t.Data) || t.Data.length === 0) return;
        var checkedNodes = null, str = [];
        if (t.DisplayPText === false) {
            checkedNodes = getLeafs(t, target, true);
            str = Enumerable.From(checkedNodes).Select('s=>s.$this["' + t.TextField + '"]').ToArray();
        }
        else getChildText(t, target, str);
        return str.toString();
    }
    function getChildText(t, target, str) {
        if (ktw.IsNull(str)) str = "";
        if (ktw.IsNull(target)) nodes = t.rootNodeEL.children(".node");//获取所有的叶子节点
        else nodes = $(target).next().children(".node");
        nodes.filter(function (i, o) {
            var $this = $(o).prop("$this");
            var isChecked = $this[t.CheckedField] || $this[t.CheckedField] === null;
            if (isChecked) str.push($this[t.TextField]);
            if (!ktw.IsNull($this[t.ChildrenField]) && $this[t.ChildrenField].length > 0)
                getChildText(t, o, str);
            return isChecked;
        });
    }
    ktw.Tree = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var t = this;
        if (ktw.IsNull(opt.Target)) opt.Target = $("<div class='ktw-tree'></div>");
        else {
            if (ktw.IsNull(opt.ID)) opt.ID = opt.Target.attr("id");
            if (opt.Target.hasClass("ktw-tree")) opt.Target.addClass("ktw-tree");
        }
        $.extend(this, new ktw.Control(opt));
        this.rootNodeEL = $("<div style='width:100%;'></div>").appendTo(this.Target);
        this.TempStyle = ktw.CreateTempStyle();
        this.DisplayPText = ktw.IsNull(opt.DisplayPText) ? true : opt.DisplayPText;
        this.CheckBox = ktw.IsNull(opt.CheckBox) ? false : opt.CheckBox;
        this.OnlyLeafCheckBox = ktw.IsNull(opt.OnlyLeafCheckBox) ? false : opt.OnlyLeafCheckBox;
        this.CascadeCheck = ktw.IsNull(opt.CascadeCheck) ? true : opt.CascadeCheck;
        this.ValueField = ktw.IsNull(opt.ValueField) ? "id" : opt.ValueField;
        this.TextField = ktw.IsNull(opt.TextField) ? "text" : opt.TextField;
        this.ChildrenField = ktw.IsNull(opt.ChildrenField) ? "children" : opt.ChildrenField;
        this.CheckedField = ktw.IsNull(opt.CheckedField) ? "checked" : opt.CheckedField;
        this.SelectedField = ktw.IsNull(opt.SelectedField) ? "selected" : opt.SelectedField;
        this.StateField = ktw.IsNull(opt.StateField) ? "state" : opt.StateField;
        //这里的TagField属性没有发现什么用
        this.TagField = ktw.IsNull(opt.TagField) ? "tag" : opt.TagField;
        this.IsShowArrowNoChild = ktw.IsBoolean(opt.IsShowArrowNoChild) ? opt.IsShowArrowNoChild : (opt.IsShowArrowNoChild == "true");
        if (this.OnlyLeafCheckBox) this.CheckBox = true;
        if (!ktw.IsNull(opt.CSS)) this.Target.css(opt.CSS);
        this.Data = ktw.IsNull(opt.Data) ? [] : opt.Data;
        funExt(this);
        var $this = this;
        if (!isNaN(this.Width)) this.SetWidth(opt.Width);
        if (!isNaN(this.Height)) this.SetHeight(opt.Height);
        this.LoadData(this.Data);
        this.Target.prop("$this", this);
    }
    function funExt(control) {
        $.fn.extend(control, {
            LoadData: function (data) {
                this.Target.html();
                this.Data = data;
                refNodes(this, data, this.rootNodeEL);
            },//加载数据
            GetText: function (target, isLeaf) {
                if (this.CheckBox === false) return this.SelectedItem ? this.SelectedItem.prop("$this")[this.TextField] : "";
                else return getText(this, target);
            },
            GetNode: function (target) {
                if (ktw.IsNull(target) || !$(target).hasClass("node")) return;
                return $(target).prop("$this");
            },//通过DOM获取当前节点
            GetData: function (target) {
                if (ktw.IsNull(target) || !$(target).hasClass("node")) return;
                return ktw.ObjCloneExceptAttr($(target).prop("$this"), ["Target"]);
            },//通过DOM获取该节点上的数据
            GetChildren: function (target) {
                if (ktw.IsNull(target) || !$(target).hasClass("node")) return;
                if ($(target).next().hasClass("node") || $(target).next().length === 0) return;
                return $(target).next().children(".node");
            },//通过DOM获取该节点的所有子节点
            GetAllChildren: function (target) {
                if (ktw.IsNull(target) || !$(target).hasClass("node")) return;
                if ($(target).next().hasClass("node") || $(target).next().length === 0) return;
                return $(".node", $(target).next());
            },//通过DOM获取该节点下所有子孙节点
            GetParent: function (target) {
                if (ktw.IsNull(target) || !$(target).hasClass("node")) return;
                return $(target).parent().prev();
            },//通过DOM获取父容器
            GetRoot: function (target) {
                if (ktw.IsNull(target) || !$(target).hasClass("node")) return;
                return this.rootNodeEL.children(".node").filter(function (i, o) {
                    return !$(o).next().hasClass("node") && $(o).next().length === 0 && $(o).next().has($(target)).length > 0;
                });
            },//通过DOM获取根节点
            GetRoots: function () {
                return this.rootNodeEL.children(".node");
            },//获取所有根节点
            GetLeafs: function (target, checked) {
                return getLeafs(this, target, checked);
            },//通过DOM或者选中状态获取叶子节点
            GetChecked: function (checked, target) {
                return getCheked(this, target, checked);
            },//根据选中状态获取节点
            GetSelectNode: function () {
                return this.SelectedItem;
            },//获取选择项
            SetSelectNode: function (target) {
                doSelect(this, $(target));
            },//设置选择项
            Check: function (target, checked) {
                if (checked === "" || checked === undefined) return;
                var $this = this;
                if (ktw.IsNull(target)) target = this.GetRoots();
                $.each($(target), function (i, o) {
                    doCheck($this, $(o), checked);
                });
            },//设置当前节点的            
            Expand: function (target, isAll) {
                fold(this, target, isAll, "open");
            },//展开节点
            Collapse: function (target, isAll) {
                fold(this, target, isAll, "close");
            },//折叠节点
            Add: function (nodes, target) {
                addNode(nodes, target);
            },
            Insert: function (nodes, target, index) {
                if (ktw.IsNull(nodes)) return;
                if (ktw.IsNull(target)) target = this.rootNodeEL;
            },
            IsLeaf: function (target) {
                var nextNode = $(target).next();
                return !(!nextNode.hasClass("node") && (!ktw.IsNull(target.$this) && target.$this.children.length > 0));
            },
            SetCSS: function (css) {
                if (!ktw.IsNull(css)) this.Target.css(css);
            },
            outerWidth: function () {
                return this.Target.outerWidth();
            },
            outerHeight: function () {
                return this.Target.outerHeight();
            },
            SetWidth: function (width) {
                if (ktw.IsNull(width)) return;
                this.Target.css('width', width);
                this.Width = this.Target.width();
                this.Target.trigger("onResize");//大小变化事件
            },
            SetHeight: function (height) {
                if (ktw.IsNull(height)) return;
                this.Target.css('height', height);
                this.Height = this.Target.height();
                this.Target.trigger("onResize");//大小变化事件
            },
            Clear: function () {
                this.rootNodeEL.empty();
            }
        });
    }
})(jQuery);
//Combotree(下拉树选择框)
(function ($) {
    ktw.Combotree = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        var $this = this;
        opt.Readonly = true;
        opt.ShowClearButton = false;
        if (ktw.IsNull(opt.Target)) {
            opt.Target = $("<div class='ktw-combotree'></div>");
            opt.Target.appendTo(ktw.IsDOMElementEx(opt.Parent) ? opt.Parent : document.body);
        }
        else if (!opt.Target.hasClass("ktw-combotree")) opt.Target.addClass("ktw-combotree");
        $.extend(this, this.combo = new ktw.Combo(opt)), funExt(this), this.Target.prop("$this", $this);
        if (ktw.IsNull(opt.treeOpt)) opt.treeOpt = {};
        opt.treeOpt.CheckBox = opt.MultiSelect;
        opt.treeOpt.Height = opt.PopupHeight;
        if (!ktw.IsNull(opt.ValueField)) opt.treeOpt.ValueField = opt.ValueField;
        if (!ktw.IsNull(opt.TextField)) opt.treeOpt.TextField = opt.TextField;
        this.tree = new ktw.Tree(opt.treeOpt);
        this.popup.append(this.tree.Target);
        this.tree.bind("onSelectChanged", function () {
            $this.text.SetValue($this.tree.GetText());
            $this.Target.triggerHandler("onSelectChanged", $this.tree.SelectedItem);
        });
        this.text.SetValue(this.tree.GetText());
        this.Layout();
    }
    function funExt(control) {
        $.fn.extend(control, {
            SetData: function (data) {
                this.tree.LoadData(data);
                this.RefreshRequire();
                this.text.SetValue(this.tree.GetText());
                this.Target.triggerHandler("onSelectChanged", this.tree.SelectedItem);
            },
            SetSelectedItem: function (target, checked) {
                if (!ktw.IsNull(target)) target = target.$this.Target;
                if (this.tree.CheckBox) this.tree.Check(target, checked);
                else this.tree.SetSelectNode(target);
                this.text.SetValue(this.tree.GetText());
                this.Target.triggerHandler("onSelectChanged", this.tree.SelectedItem);
            },
            GetData: function () {
                return this.tree.Data;
            },
            GetValue: function () {
            },
            ShowPopup: function () {
                this.combo.ShowPopup(), this.tree.Layout();
            },
            GetSelectedItem: function (isLeaf) {
                if (this.tree.CheckBox) {
                    if (isLeaf) return this.tree.GetLeafs("", true);
                    return this.tree.GetChecked(true);
                }
                else return this.tree.SelectedItem;
            },
            Clear: function () {
                this.tree.Clear();
                this.text.Clear();
            },
            SetWidth: function (width) {
                this.text.SetWidth(width);
                this.Layout();
            },
            SetHeight: function (height) {
                this.text.SetHeight(height);
                this.Layout();
            },
            SetSize: function (size) {
                this.text.SetSize(size);
                this.Layout();
            },
            SetPopueHeight: function (height) {
                this.tree.SetHeight(height);
            },
            Layout: function () {
                this.combo.Layout();
            }
        });
    }
})(jQuery);
//Pager(分页控件)
(function ($) {
    function getPageNum(total, pagesize) {
        if (ktw.IsNull(total) || ktw.IsNull(pagesize) || pagesize == 0) return;
        var temp = total % pagesize;
        return temp == 0 ? (total / pagesize) : (((total - temp) / pagesize) + 1);
    }
    function pageBtnState($this) {
        $this.enableElFirst.css("display", ($this.PageIndex > 1 ? "none" : "block"));
        $this.enableElPre.css("display", ($this.PageIndex > 1 ? "none" : "block"));
        $this.enableElNext.css("display", ($this.PageIndex < $this.PageNum ? "none" : "block"));
        $this.enableElLast.css("display", ($this.PageIndex < $this.PageNum ? "none" : "block"));
        //显示数据
        var endlength = ($this.PageIndex * $this.PageSize) > $this.RecordNum ? $this.RecordNum : ($this.PageSize * $this.PageIndex);
        if (ktw.IsNull($this.DisPlayMsg)) $this.PageMsg = "显示" + (($this.PageIndex - 1) * $this.PageSize + 1) + "到" + endlength + "条记录,共有" + $this.RecordNum + "条记录";
        $this.RightContent.html(ktw.IsNull($this.DisPlayMsg) ? $this.PageMsg : $this.DisPlayMsg);
    }
    function pageclick($this, state) {
        if (state == "first") $this.PageIndex = 1;
        if (state == "previous") {
            if ($this.PageIndex <= 1) return;
            $this.PageIndex -= 1;
        }
        if (state == "next") {
            if ($this.PageIndex == $this.PageNum) return;
            $this.PageIndex += 1;
        }
        if (state == "last") $this.PageIndex = $this.PageNum;
        $this.PageIndexBox.val($this.PageIndex);
        pageBtnState($this);
        $this.Target.triggerHandler("onSelectPage", { pageNumber: $this.PageIndex, pageSize: $this.PageSize });
    }
    ktw.Pager = function (opt) {
        if (ktw.IsNull(opt)) opt = {};
        this.IsSearcher = ktw.IsBoolean(opt.IsSearcher) ? opt.IsSearcher : opt.IsSearcher == "true";
        this.PageSize = ktw.IsNumber(opt.PageSize) ? opt.PageSize : 10;
        this.PageIndex = ktw.IsNumber(opt.PageIndex) ? opt.PageIndex : 1;
        this.RecordNum = ktw.IsNumber(opt.RecordNum) ? opt.RecordNum : 0;
        this.PageNum = ktw.IsNumber(opt.PageNum) ? opt.PageNum : getPageNum(this.RecordNum, this.PageSize);
        this.DisplayMsg = opt.DisplayMsg;
        this.PageMsg = "显示" + ((this.PageIndex - 1) * this.PageSize + 1) + "到" + (this.PageIndex * this.PageSize) + "条记录,共有" + this.RecordNum + "条记录";
        this.ContentEx = opt.ContentEx;
        opt.Target = $('<div class="Pagination"></div>');
        $.extend(this, new ktw.Control(opt));
        var $this = this;
        this.LeftContent = $('<div class="Left"></div>').appendTo(this.Target);
        this.RightContent = $('<div class="Right">' + (ktw.IsNull(this.DisPlayMsg) ? this.PageMsg : this.DisPlayMsg) + '</div>');
        this.RightContent.appendTo(this.Target);
        this.FirstIndexBtn = $('<div class="Btns" style="left:5px;background-position: 0px,0px;"></div>').appendTo(this.LeftContent);
        this.enableElFirst = $('<div class="enable" style="left:5px;display:block"></div>').appendTo(this.LeftContent);
        this.Previousbtn = $('<div class="Btns" style="left:26px;background-position:-16px,0px;"></div>').appendTo(this.LeftContent);
        this.enableElPre = $('<div class="enable" style="left:26px;"></div>').appendTo(this.LeftContent);
        var split1 = $('<div class="Split" style="left:47px;"></div>').appendTo(this.LeftContent);
        this.PageTextDiv = $('<div class="PageText" style="left:53px;"><span style="position:absolute;left:0px;">第</span></div>').appendTo(this.LeftContent);
        this.PageIndexBox = $('<input style="position:absolute;left:15px;height:22px;width:35px;top:3px;text-align:center" type="text"/>').appendTo(this.PageTextDiv);
        this.PageNumber = $('<span style="position:absolute;left:55px;">共' + this.PageNum + '页</span>').appendTo(this.PageTextDiv);
        var split2 = $('<div class="Split" style="left:152px;"></div>').appendTo(this.LeftContent);
        this.NextBtn = $('<div class="Btns" style="left:158px;background-position:-32px,0px;"></div>').appendTo(this.LeftContent);
        this.enableElNext = $('<div class="enable" style="left:158px;"></div>').appendTo(this.LeftContent);
        this.LastBtn = $('<div class="Btns" style="left:179px;background-position:-48px,0px;"></div>').appendTo(this.LeftContent);
        this.enableElLast = $('<div class="enable" style="left:179px;"></div>').appendTo(this.LeftContent);
        if (this.IsSearcher) {
            var split3 = $('<div class="Split" style="left:200px;"></div>').appendTo(this.LeftContent);
            var searcherDiv = $('<div class="Searcher" style="left:206px;top:3px;"></div>').appendTo(this.LeftContent);
            this.SearcherBox = $('<input type="search" class="Box" placeholder="关键查询信息"/>').appendTo(searcherDiv);
            this.Searchbtn = $('<div class="Button"></div>').appendTo(searcherDiv);
            this.Searchbtn.click(function () {
                var searchvalue = this.SearcherBox.val();
                $this.Target.triggerHandler("onSearchChange", { searchValue: searchvalue });
            });
        }
        this.ContenExDiv = $('<div style="position:absolute;height:100%;left:200px;"></div>').appendTo(this.LeftContent);
        if (this.IsSearcher) this.ContenExDiv.css("left", "375px");
        if (!ktw.IsNull(this.ContentEx)) this.ContenExDiv.append(this.ContentEx);
        pageBtnState(this);
        this.FirstIndexBtn.click(function () {
            pageclick($this, "first");
        });
        this.Previousbtn.click(function () {
            pageclick($this, "previous");
        });
        this.NextBtn.click(function () {
            pageclick($this, "next");
        });
        this.LastBtn.click(function () {
            pageclick($this, "last");
        });
        this.PageIndexBox.val(this.PageIndex);
        this.PageIndexBox.bind('input propertychange', function () {
            var pageindex = $(this).val();
            if (ktw.IsNull(pageindex)) return;
            var reg = /^[0-9]*[1-9][0-9]*$/;
            if (!reg.test(pageindex)) {
                $(this).val($this.PageIndex);
                return;
            }
            var index = parseInt(pageindex);
            if (index > $this.PageNum) {
                $this.PageIndex = $this.PageNum;
                $(this).val($this.PageIndex);
                return;
            }
            $this.PageIndex = index;
        }).bind("keydown", function (event) {
            if (event.keyCode == "13")
                $this.Target.triggerHandler("onSelectPage", { pageNumber: $this.PageIndex, pageSize: $this.PageSize });
        });
        funExt(this);
        this.Target.prop("$this", this);
    }
    function funExt(control) {
        $.fn.extend(control, {
            SetDisplayMsg: function (displayMsg) {
                this.DisPlayMsg = displayMsg;
                this.RightContent.html(displayMsg);
            },
            Refresh: function (opt) {
                this.RecordNum = opt.RecordNum;
                if (!ktw.IsNull(opt.PageSize)) this.PageSize = opt.PageSize;
                if (!ktw.IsNull(opt.PageIndex)) this.PageIndex = opt.PageIndex;
                this.PageNum = ktw.IsNull(opt.PageNum) ? getPageNum(this.RecordNum, this.PageSize) : opt.PageNum;
                this.DisPlayMsg = opt.DisPlayMsg;
                if (ktw.IsNull(this.DisPlayMsg)) this.PageMsg = "显示" + ((this.PageIndex - 1) * this.PageSize + 1) + "到" + (this.PageIndex * this.PageSize) + "条记录,共有" + this.RecordNum + "条记录";
                this.SetDisplayMsg(ktw.IsNull(this.DisPlayMsg) ? this.PageMsg : this.DisPlayMsg);
                this.PageNumber.html("共" + this.PageNum + "页");
                pageBtnState(this);
                this.Target.triggerHandler("onRefreshed", { pageNumber: this.PageIndex, pageSize: this.PageSize });
            },
            Select: function (pageindex) {
                this.PageIndex = pageindex;
                this.PageIndexBox.val(this.PageIndex);
                pageBtnState($this);
            },
            AddContentEx: function (element) {
                this.ContenExDiv.append(element);
            },
            SetIsSearcher: function (issearch) {
                this.IsSearcher = issearch;
                $('.Searcher', this.LeftContent).css("display", this.IsSearcher ? "block" : "none");
                this.ContenExDiv.css("left", this.IsSearcher ? "375px" : "200px");
            },
            SetPageIndex: function (index) {
                this.PageIndex = index;
                $this.PageIndexBox.val(this.PageIndex);
                pageBtnState(this);
            }
        });
    }
})(jQuery);
//UCDataGrid(表格控件)
(function ($) {
    ktw.UCDataGrid = function (param) {
        if (ktw.IsNull(param)) param = {};
        this.Visible = ktw.IsBoolean(param.Visible) ? opt.Visible : true;
        param.Target = $('<div style="width:' + param.Width + '; height:' + param.Height + ';"></div>');
        $.extend(this, new ktw.Control(param));
        this.ID = param.ID;
        this.TextPrompt = ktw.IsNull(param.TextPrompt) ? "" : param.TextPrompt;
        this.PageIndex = parseInt(param.PageIndex);
        this.PageSize = parseInt(param.PageSize);
        this.Columns = param.Columns;
        this.RowNumbers = ktw.IsNull(param.RowNumbers) ? true : param.RowNumbers;
        this.IsPage = ktw.IsNull(param.IsPage) ? true : param.IsPage;
        this.ShowHeader = ktw.IsNull(param.ShowHeader) ? true : param.ShowHeader;
        this.FitColumns = ktw.IsNull(param.FitColumns) ? true : param.FitColumns;
        this.View = param.View;
        //var options = $('<div id="buttons"><table style="border-spacing:0"><tr><td><input id="searchFilter" class="easyui-searchbox" style="width:200px;"></td><td>'
        //               + '<span id="lblMsg" style="height: 30px;color:red;"></span></td></tr></table></div>');
        var options = $('<div id="buttons"></div>');
        var table = $('<table style="border-spacing:0"></table>').appendTo(options);
        var tr = $('<tr></tr>').appendTo(table);
        this.buttons = ktw.IsNull(param.buttons) ? options : param.buttons;
        if (!ktw.IsNull(this.buttons) && this.buttons.length > 0) {
            for (var i = 0; i < this.buttons.length; i++) {
                var td = $('<td style="padding-right:5px;"></td>').appendTo(tr);
                var currbtn = $('<div style="width:16px;height:16px;" class="' + this.buttons[i].iconCls + '"></div>');
                currbtn.click(this.buttons[i].handler);
                td.append(currbtn);
            }
        }
        this.DataGrid = $('<table id="' + this.ID + '" class="easyui-datagrid" style="width: 100%; height: 100%;"></table>');
        this.Target.append(this.DataGrid);
        this.pagequery = ktw.IsBoolean(param.pagequery) ? param.pagequery : (param.pagequery != "false");
        if (this.pagequery) tr.append($('<td><input id="searchFilter" class="easyui-searchbox" style="width:200px;"></td>'));
        tr.append($('<td><span id="lblMsg" style="height: 30px;color:red;"></span></td>'));
        this.buttons = options;
        FuncEx(this);
    };
    function FuncEx(control) {
        $.fn.extend(control, {
            Layout: function (columns) {
                var $this = this;
                this.DataGrid.datagrid({
                    border: 0,
                    singleSelect: true,
                    fitColumns: this.FitColumns,
                    animate: true,
                    loadMsg: "请等待...",
                    collapsible: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    rownumbers: this.RowNumbers,
                    showHeader: this.ShowHeader,
                    pagination: this.IsPage,
                    columns: [(!ktw.IsNull(columns) ? columns : this.Columns)],
                    onClickRow: function (index, row) {
                        $this.Target.triggerHandler("onClickRow", { index: index, Row: row });
                    },
                    onSelect: function (index, row) {
                        $this.Target.triggerHandler("onSelectRow", { index: index, Row: row });
                    },
                    onClickCell: function (index, field, value) {
                        $this.Target.triggerHandler("onClickCell", { index: index, field: field, value: value });
                    },
                    onDblClickCell: function (index, field, value) {
                        $this.Target.triggerHandler("onDblClickCell", { index: index, field: field, value: value });
                    },
                    onDblClickRow: function (index, row) {
                        $this.Target.triggerHandler("onDblClickRow", { index: index, Row: row });
                    },
                    view: this.View
                });
                if (this.IsPage) {
                    this.Pager = this.DataGrid.datagrid('getPager');
                    var parampage = {
                        showPageList: false,
                        showRefresh: false,
                        pageNumber: this.PageIndex,
                        pageSize: this.PageSize,
                        onSelectPage: function (index, size) {
                            if (index == 0) index++;
                            $this.Target.triggerHandler("onSelectPage", { index: index, size: size });
                        },
                        buttons: this.buttons
                    }
                    if (this.pagequery) parampage.buttons = this.buttons;
                    this.Pager.pagination(parampage);
                }
                var searchButton = this.buttons.find("input#searchFilter");
                searchButton.searchbox({
                    prompt: this.TextPrompt,
                    value: "",
                    searcher: function (value, name) {
                        $this.Target.triggerHandler("onSearchClick", { value: value, name: name });
                    }
                });
            },
            Load: function (data, pageInfo) {
                this.DataGrid.datagrid('loadData', data);
                if (this.IsPage)
                    this.Pager.pagination('refresh', { total: pageInfo.totalCount, pageNumber: pageInfo.pageIndex, displayMsg: (!pageInfo.msg) ? "显示记录" + (((pageInfo.pageIndex - 1) * pageInfo.pageSize) + 1) + "-" + (pageInfo.pageIndex * pageInfo.pageSize) + "条,共{total}条" : pageInfo.msg });
            },
            ShowMessage: function (msg) {
                var lblMsg = this.buttons.find("span#lblMsg");
                lblMsg.text(msg);
            },
            Resize: function (width, height) {
                this.Target.css({ width: width, height: height });
                this.DataGrid.datagrid("resize");
            },
            ClearSearchFilter: function () {
                var searchButton = this.buttons.find("input#searchFilter");
                searchButton.searchbox("clear");
            }
        });
    }
})(jQuery);
//在地图上显示弹出框
/*ktw.UCMapTip*/
(function ($) {
    function CreateIconStyle(icon) {
        var className = 'MapTipHeadICon';
        ktw.InsertIconRule(ktw.App.TempStyle, "." + className, icon);
        return className;
    };
    function GetContent(popup, con, url) {
        var content = null;
        if (!ktw.IsNull(url)) {
            var waitbox = new ktw.UCWaitBox(popup.popup);
            content = ktw.CreateFrame(url, false);
            content.bind('load', function () {
                waitbox.Close();
                $(popup).trigger("onLoaded", { Parent: popup, Data: popup.ID });
            });
            waitbox.Show();
        }
        else if (!ktw.IsNull(con)) {
            content = ktw.IsString(con) ? $('<p>' + con + '</p>') : con;
            $(popup).trigger("onLoaded", { Parent: popup, Data: popup.ID });
        }
        return content;
    };
    function DeleteRule(name) {
        for (var i = 0; i < ktw.App.TempStyle.cssRules.length; i++)
            if (ktw.App.TempStyle.cssRules[i]["selectorText"] == name) {
                if (ktw.App.TempStyle.removeRule) {
                    ktw.App.TempStyle.removeRule(i);
                    if (ktw.App.TempStyle.cssRules[i]["selectorText"] == name)
                        ktw.App.TempStyle.removeRule(i)
                    break;
                }
                else if (ktw.App.TempStyle.deleteRule) {
                    ktw.App.TempStyle.deleteRule(i);
                    if (ktw.App.TempStyle.cssRules[i]["selectorText"] == name)
                        ktw.App.TempStyle.deleteRule(i);
                    break;
                }
            }
    };
    /*根据冒泡的三角形指向的方向生成冒泡窗体*/
    function CreateStyleOfMaptip(maptip) {
        var triangleBottom = 22;
        var triangleHeight = 15;
        var olpopup = "position: absolute;padding: 0px;margin: 0px;min-width:" + maptip.MinWidth + "px;";
        var olpopupafterAndbefore = "content: \" \";height: 0; width: 0;position: absolute;pointer-events: none;";
        var olpopupafter = "";
        var olpopupbefore = "";
        switch (maptip.TrianglePosition) {
            case ktw.TrianglePosition.Top:
                olpopup += "top:" + (triangleHeight - 1) + "px;left: " + -(maptip.Width / 2 + 2) + "px;";
                olpopupafterAndbefore += " left:" + (maptip.Width + triangleBottom) / 2 + "px;";
                olpopupafter = "top: " + -(triangleHeight - 1) + "px;margin-left: -20px;"
                            + " border-bottom: " + triangleHeight + "px solid " + maptip.TriangleColor + ";"
                            + "border-left: " + triangleBottom / 2 + "px solid transparent;"
                            + "border-right:  " + triangleBottom / 2 + "px solid transparent;";
                olpopupbefore = "top: " + -(triangleHeight) + "px;margin-left: -22px;"
                              + "border-bottom: " + (triangleHeight + 1) + "px solid rgb(149,184,231);"
                              + "border-left: " + (triangleBottom / 2 + 2) + "px solid transparent;"
                              + " border-right: " + (triangleBottom / 2 + 2) + "px solid transparent;";
                break;
            case ktw.TrianglePosition.Bottom:
                olpopup += "bottom:" + (triangleHeight - 1) + "px;left: " + -(maptip.Width / 2 + 2) + "px;";
                olpopupafterAndbefore += " left:" + (maptip.Width + triangleBottom) / 2 + "px;";
                olpopupafter = "bottom: " + -(triangleHeight - 1) + "px;margin-left: -20px;"
                            + " border-top: " + triangleHeight + "px solid " + maptip.TriangleColor + ";"
                            + "border-left: " + triangleBottom / 2 + "px solid transparent;"
                            + "border-right:  " + triangleBottom / 2 + "px solid transparent;";
                olpopupbefore = "bottom: " + -(triangleHeight) + "px;margin-left: -22px;"
                              + "border-top: " + (triangleHeight + 1) + "px solid rgb(149,184,231);"
                              + "border-left: " + (triangleBottom / 2 + 2) + "px solid transparent;"
                              + " border-right: " + (triangleBottom / 2 + 2) + "px solid transparent;";
                break;
            case ktw.TrianglePosition.Left:
                olpopup += "left:" + triangleHeight + "px;top: " + -(maptip.Height / 2 + 2) + "px;";
                olpopupafterAndbefore += " top: " + (maptip.Height + triangleBottom) / 2 + "px;";
                olpopupafter = "left: " + -(triangleHeight - 1) + "px;margin-top: -20px;"
                            + " border-right: " + triangleHeight + "px solid " + maptip.TriangleColor + ";"
                            + "border-bottom: " + triangleBottom / 2 + "px solid transparent;"
                            + "border-top:  " + triangleBottom / 2 + "px solid transparent;";
                olpopupbefore = "left: " + -(triangleHeight) + "px;margin-top: -22px;"
                              + "border-right: " + (triangleHeight + 1) + "px solid rgb(149,184,231);"
                              + "border-bottom: " + (triangleBottom / 2 + 2) + "px solid transparent;"
                              + " border-top: " + (triangleBottom / 2 + 2) + "px solid transparent;";
                break;
            case ktw.TrianglePosition.Right:
                olpopup += "right:" + (triangleHeight - 1) + "px;top: " + -(maptip.Height / 2 + 2) + "px;";
                olpopupafterAndbefore += " top:" + (maptip.Height + triangleBottom) / 2 + "px;";
                olpopupafter = "right: " + -(triangleHeight - 1) + "px;margin-top: -20px;"
                            + " border-left: " + triangleHeight + "px solid " + maptip.TriangleColor + ";"
                            + "border-bottom: " + triangleBottom / 2 + "px solid transparent;"
                            + "border-top:  " + triangleBottom / 2 + "px solid transparent;";
                olpopupbefore = "right: " + -(triangleHeight) + "px;margin-top: -22px;"
                              + "border-left: " + (triangleHeight + 1) + "px solid rgb(149,184,231);"
                              + "border-bottom: " + (triangleBottom / 2 + 2) + "px solid transparent;"
                              + " border-top: " + (triangleBottom / 2 + 2) + "px solid transparent;";
                break;
        }
        DeleteRule(".ol-popup");
        ktw.InsertRule(ktw.App.TempStyle, ".ol-popup", olpopup);
        DeleteRule(".ol-popup::after");
        ktw.InsertRule(ktw.App.TempStyle, ".ol-popup:after", olpopupafterAndbefore + olpopupafter);
        DeleteRule(".ol-popup::before");
        ktw.InsertRule(ktw.App.TempStyle, ".ol-popup:before", olpopupafterAndbefore + olpopupbefore);
    };
    function LayoutMaptip(sreenPoint, maptipWidth, maptipHeight, first, force) {
        //first:提示框的优先方向,force:强制提示框的方向
        var left = sreenPoint["x"];
        var top = sreenPoint["y"];
        var right = ktw.App.MapPanel.MapDOM.width() - left;
        var bottom = ktw.App.MapPanel.MapDOM.height() - top;
        var firstList = {};
        var position;
        if (force) {
            return force;
        }
        if (left > maptipWidth + 20 && bottom > maptipHeight / 2 && top > maptipHeight / 2) {
            firstList[ktw.TrianglePosition.Right] = position = ktw.TrianglePosition.Right;
        }
        if (right > maptipWidth + 20 && bottom > maptipHeight / 2 && top > maptipHeight / 2) {
            firstList[ktw.TrianglePosition.Left] = position = ktw.TrianglePosition.Left;
        }
        if (top > maptipWidth + 20 && left > maptipHeight / 2 && right > maptipHeight / 2) {
            firstList[ktw.TrianglePosition.Bottom] = position = ktw.TrianglePosition.Bottom;
        }
        if (bottom > maptipWidth + 20 && left > maptipHeight / 2 && right > maptipHeight / 2) {
            firstList[ktw.TrianglePosition.Top] = position = ktw.TrianglePosition.Top;
        }
        if (first && firstList[first]) return firstList[first];
        return position;
    };

    ktw.UCMapTip = function (param) {
        this.ID = ktw.IsNull(param.ID) ? "maptip" : param.ID;
        this.Title = ktw.IsNull(param.Title) ? "信息提示" : param.Title;
        this.IconUri = ktw.IsNull(param.IconUri) ? null : param.IconUri;
        this.Content = param.Content;
        this.Url = param.Url;
        this.Offset = ktw.IsNull(param.Offset) ? [0, 0] : param.Offset;
        this.Position = ktw.IsNull(param.Position) ? undefined : param.Position;
        this.Positioning = ktw.IsNull(param.Positioning) ? 'top-left' : param.Positioning;
        this.StopEvent = !ktw.IsBoolean(param.StopEvent) ? true : param.StopEvent;
        this.InsertFirst = !ktw.IsBoolean(param.InsertFirst) ? true : param.InsertFirst;
        this.AutoPan = !ktw.IsBoolean(param.AutoPan) ? true : param.AutoPan;
        this.AutoPanAnimation = ktw.IsNull(param.AutoPanAnimation) ? { duration: 250 } : param.AutoPanAnimation;
        this.AutoPanMargin = ktw.IsNull(param.AutoPanMargin) ? 20 : param.AutoPanMargin;
        this.MinWidth = !ktw.IsNumber(param.MinWidth) ? 50 : param.MinWidth;
        this.Collapsible = !ktw.IsBoolean(param.Collapsible) ? false : param.Collapsible;
        this.Maximizable = !ktw.IsBoolean(param.Maximizable) ? false : param.Maximizable;
        this.Width = !ktw.IsNumber(param.Width) ? 200 : param.Width;
        this.Height = !ktw.IsNumber(param.Height) ? 150 : param.Height;
        this.TrianglePosition = ktw.IsNull(param.TrianglePosition) ? ktw.TrianglePosition.Bottom : param.TrianglePosition;
        this.TriangleColor = ktw.IsNull(param.TriangleColor) ? (this.TrianglePosition === ktw.TrianglePosition.Top ? "rgb(238,245,255)" : "rgb(255,255,255)") : param.TriangleColor;
        this.Visible = !ktw.IsBoolean(param.Visible) ? true : param.Visible;
        var triangleBottom = 22;
        var triangleHeight = 15;
        CreateStyleOfMaptip(this);
        this.popup = $('<div id=' + this.ID + ' class="ol-popup" >'
            + '<div id="tipContent" class="easyui-panel" title="' + this.Title + '" style="width: ' + this.Width
            + 'px; height: ' + this.Height + 'px;overflow:hidden;" data-options="iconCls:\'' + CreateIconStyle(this.IconUri)
            + '\',closable:true,collapsible:' + this.Collapsible + ',minimizable:false,maximizable:' + this.Maximizable + '">'
            + '</div></div>');
        var content = this.popup.children('div#tipContent');
        this.Target = new ktw.CommonOverLay().setLatLng(this.Position).setContent(this.popup[0]);
        ktw.App.Map.addLayer(this.Target);
        this.SetPosition(this.Position, this.TrianglePosition);
        this.tipContent = content.panel({
            onClose: function (sender) {
                $($this).trigger("onClosed");
                $this.tipContent.panel("destroy");
                $this.Target._onCloseButtonClick(window.event);
            }
        });
        content.append(GetContent(this, this.Content, this.Url));
        var $this = this;
    };
    $.fn.extend(ktw.UCMapTip.prototype, {
        SetVisible: function (visible) {
            if (!ktw.IsBoolean(visible)) return;
            if (this.Visible == visible) return;
            this.Visible = visible;
            this.Target.setPosition(this.Visible ? this.Position : undefined);
        },
        SetTitle: function (title) {
            if (ktw.IsNull(title)) return;
            this.tipContent.panel("setTitle", title);
            this.Title = title;
        },
        SetIcon: function (iconUri) {
            if (!ktw.IsString(iconUri)) return;
            this.IconUri = iconUri;
            this.tipContent.panel({ iconCls: CreateIconStyle(iconUri) });
        },
        SetIconcls: function (className) {
            if (!ktw.IsString(className)) return;
            this.tipContent.panel({ iconCls: className });
        },
        SetOffset: function (left, top) {
            if (ktw.IsNull(left) && ktw.IsNull(top)) return;
            this.Target.setOffset(this.Offset = [left, top]);
        },
        SetPosition: function (coordion, first, force) {
            //coordion:显示提示的中心坐标,first:优先选择的提示框方向,force:强制提示框的方向
            if (ktw.IsNull(coordion)) return;
            //var screenpoint = ktw.App.Map.getPixelFromCoordinate(coordion, first);
            var screenpoint = ktw.App.Map.latLngToLayerPoint(coordion);
            this.TrianglePosition = LayoutMaptip(screenpoint, this.Width, this.Height, first, force);
            if (!this.TrianglePosition) {
                this.TrianglePosition = ktw.TrianglePosition.Left;
            }
            this.TriangleColor = this.TrianglePosition === ktw.TrianglePosition.Top ? "rgb(238,245,255)" : "rgb(255,255,255)";
            CreateStyleOfMaptip(this);
            this.Target.setLatLng(coordion);
        },
        SetPositioning: function (positioning) {
            if (!ktw.IsString(positioning)) return;
            this.Target.setPositioning(positioning);
        },
        SetCollapse: function (collapse) {
            if (!ktw.IsBoolean(collapse)) return;
            this.tipContent.panel(collapse ? "collapse" : "expand");
        },
        Show: function () {
            this.tipContent.panel("open");
        },
        Close: function () {
            this.tipContent.panel("close");
        },
        Add: function (element, url) {
            if (ktw.IsNull(element) && ktw.IsNull(url)) return;
            var content = GetContent(this, element, url);
            if (!ktw.IsNull(element)) this.tipContent.append(content);
            else if (!ktw.IsNull(url)) this.tipContent.html(content);
        },
        Remove: function (element) {
            element = ktw.IsString(element) ? $('#' + element) : (ktw.IsObject(element) ? $(element) : null);
            if (element == null) return;
            var contentID = this.tipContent.attr('id');
            if (element.attr('id') === this.ID && element.attr('id') === contentID) return;
            if (element.parents('#' + contentID).length > 0) element.remove();
        },
        Clear: function () {
            this.tipContent.panel("clear");
        }
    });
})(jQuery);

/*通用方法的封装*/
(function ($) {
    //动态创建Iframe
    ktw.CreateFrame = function (url, isScroll, id) {
        if (ktw.IsNull(id)) id = "frame" + new Date().getTime();
        return ktw.CreateFrameBase(url, isScroll, id, "width:100%;height:100%;");
    };
    //动态创建frame
    ktw.CreateFrameBase = function (url, isScroll, id, style) {
        if (ktw.IsNull(id)) id = "frame" + new Date().getTime();
        return $('<iframe id="' + id + '" scrolling="' + (ktw.IsBoolean(isScroll) && isScroll === true ? "yes" : "no") + '" frameborder="0" src="' + url + '" style="' + style + '"></iframe>');
    };
    //插件通讯传输函数
    ktw.CallWidgetCommunication = function (frame, parent, param) {
        if (ktw.IsNull(frame) || ktw.IsNull(frame.contentWindow)) return;
        try {
            if (frame.contentWindow.WidgetCommunication)
                frame.contentWindow.WidgetCommunication({ parent: parent, param: param });
        }
        catch (e) {
            ktw.Alert("页面加载出错");
            console.error(e.stack);
        }
    };
    //动态创建Style
    ktw.CreateTempStyle = function () {
        var style = $('<style type="text/css"></style>').appendTo(document.head);
        return style[0].sheet || style[0].styleSheet;
    };
    //获取元素padding
    ktw.GetPadding = function (el) {
        if (el) el = el[0] || el;
        var pt = ktw.IsNull(el.style.paddingTop) ? 0 : parseInt(el.style.paddingTop),
            pr = ktw.IsNull(el.style.paddingRight) ? 0 : parseInt(el.style.paddingRight),
            pb = ktw.IsNull(el.style.paddingBottom) ? 0 : parseInt(el.style.paddingBottom),
            pl = ktw.IsNull(el.style.paddingLeft) ? 0 : parseInt(el.style.paddingLeft);
        return { t: pt, r: pr, b: pb, l: pl, w: pl + pr, h: pt + pb };
    };
    //获取元素border
    ktw.GetBorder = function (el) {
        if (el) el = el[0] || el;
        var bt = ktw.IsNull(el.style.borderTopWidth) ? 0 : parseInt(el.style.borderTopWidth),
            br = ktw.IsNull(el.style.borderRightWidth) ? 0 : parseInt(el.style.borderRightWidth),
            bb = ktw.IsNull(el.style.borderBottomWidth) ? 0 : parseInt(el.style.borderBottomWidth),
            bl = ktw.IsNull(el.style.borderLeftWidth) ? 0 : parseInt(el.style.borderLeftWidth);
        return { t: bt, r: br, b: bb, l: bl, w: bl + br, h: bt + bb };
    };
    //动态创建Icon样式
    ktw.InsertIconRule = function (sheet, selectorName, imgsrc) {
        if (ktw.IsNull(imgsrc) || ktw.IsNull(sheet) || ktw.IsNull(selectorName)) return;
        if (sheet.insertRule) {
            sheet.insertRule(selectorName + '{top:2px;background:url(' + imgsrc + ') no-repeat center center; background-size:16px 16px;}', 0);
        } else if (sheet.addRule) {
            sheet.addRule(selectorName, 'top:2px;background:url(' + imgsrc + ') no-repeat center center; background-size:16px 16px');
        }
        return selectorName.substring(1, selectorName.length);
    };
    //动态创建Css样式
    ktw.InsertRule = function (sheet, selectorName, cssText) {
        if (ktw.IsNull(cssText) || ktw.IsNull(sheet) || ktw.IsNull(selectorName)) return;
        if (sheet.insertRule) {
            sheet.insertRule(selectorName + "{" + cssText + "}", 0);
        } else if (sheet.addRule) {
            sheet.addRule(selectorName, cssText);
        }
        return selectorName.substring(1, selectorName.length);
    };
    //获取元素的位置
    ktw.Position = function (domObject, position) {
        if ($(domObject).css(position) && $(domObject).css(position) != "auto")
            return parseFloat($(domObject).css(position).replace("px", ""));
    };
    /** 功能：过滤子系统标题文字部分,如果是五个字以上就显示四个字*/
    ktw.FilterTitle = function (text) {
        var arrTitle = text.split("");
        if (arrTitle.length <= 0) return "子系统标题";
        else if (arrTitle.length <= 5) return text;
        else return arrTitle[0] + arrTitle[1] + arrTitle[2] + arrTitle[3] + "..";
    };
    /*功能：根据插件信息动态创建按钮*/
    ktw.CreateImgStyle = function (cssText) {
        if (imagestyle == null) imagestyle = $('<style type="text/css"></style>');
        imagestyle.text(cssText);
        imagestyle.appendTo($("head"));
    };
    /*功能：验证空值*/
    ktw.IsNull = function (item) {
        return item === undefined || item === null || item === "";
    };
    /*功能：去掉首尾空白符*/
    ktw.Trim = function (item) {
        if (ktw.IsNull(item)) return item;
        else return item.replace(/(^\s*)|(\s*$)/g, "");
    };
    /*功能：验证字符串*/
    ktw.IsString = function (item) {
        return !ktw.IsNull(item) && typeof item === "string";
    };
    ktw.IsInt = function (str) {
        var reg = /^(-|\+)?\d+$/;
        return reg.test(str);
    };
    /*功能：验证数字类型*/
    ktw.IsNumber = function (item) {
        return !ktw.IsNull(item) &&
            typeof item === "number"
            && !isNaN(item) && isFinite(item);
    };
    /*功能：验证布尔类型*/
    ktw.IsBoolean = function (item) {
        return !ktw.IsNull(item) && typeof item === "boolean";
    };
    /*功能：是否是对象类型*/
    ktw.IsObject = function (item) {
        return !ktw.IsNull(item) && typeof item == "object";
    };
    /*功能：是否是数组类型*/
    ktw.IsArray = function (obj) {
        return obj && typeof obj === 'object' && typeof obj.length === 'number' && typeof obj.splice === 'function' && !(obj.propertyIsEnumerable('length'));
    }
    /*功能：是否是基本数据类型（非对象）*/
    ktw.IsBaseType = function (obj) {
        return (typeof obj == "string" || typeof obj == "boolean" || typeof obj == "number");
    }
    /*功能：是否是DOM元素*/
    ktw.IsDOMElement = function (item) {
        return !!(item && item.nodeType);
    };
    /*功能：是否是DOM元素*/
    ktw.IsDOMElementEx = function (item) {
        if (ktw.IsNull(item)) return false;
        else if (item.nodeType) return true;
        return !!item.jquery && !!item[0] && !!item[0].nodeType;
    };
    /*功能：是否是jQuery对象*/
    ktw.IsjQueryObject = function (item) {
        return !ktw.IsNull(item) && typeof item == "object" && !!item.jquery;
    };
    /*功能：获取窗体展示的位置*/
    ktw.GetPosition = function (position, size, parentPos) {
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var left = ktw.IsNull(parentPos) ? 0 : parentPos.Left;
        var top = ktw.IsNull(parentPos) ? 0 : parentPos.Top;
        switch (position.X.toString().toUpperCase()) {
            case ktw.PositionEnum.Left:
                left = left + 0;
                break;
            case ktw.PositionEnum.Right:
                left = winWidth - size.Width;
                break;
            case ktw.PositionEnum.Center:
                left = (winWidth - size.Width + left) / 2;
                break;
            default:
                if (size.Width = winWidth) left = 0;
                else {
                    left = left + parseFloat(position.X);
                    if (left > winWidth) {
                        left = left - parseFloat(position.X);
                        if ((left + size.Width) > winWidth || size.Width > winWidth) left = 0;
                    }
                }
                break;
        }
        switch (position.Y.toString().toUpperCase()) {
            case ktw.PositionEnum.Top:
                top = top + 0;
                break;
            case ktw.PositionEnum.Bottom:
                top = winHeight - size.Height;
                break;
            case ktw.PositionEnum.Center:
                top = (winHeight - size.Height + top) / 2;
                break;
            default:
                if (size.Width = winWidth) top = 0;
                else {
                    top = top + parseFloat(position.Y);
                    if (top > winHeight) {
                        top = top - parseFloat(position.Y);
                        if ((top + size.Height) > winHeight || size.Height > winHeight) top = 0;
                    }
                }
                break;
        }
        return { X: left, Y: top };
    };
    /*功能：获取窗体展示的位置*/
    ktw.AddElement = function (element, position, parent) {
        if (ktw.IsNull(parent) || ktw.IsNull(element)) return;
        if (ktw.IsNull(position)) position = {};
        $(parent).append($(element));
        var pw = $(parent).outerWidth();
        var ph = $(parent).outerHeight();
        var left = 0, top = 0;
        var w = $(element).outerWidth();
        var h = $(element).outerHeight();
        if (ktw.IsNull(position.X)) position.X = ktw.PositionEnum.Left;
        if (ktw.IsNull(position.Y)) position.Y = ktw.PositionEnum.Top;
        if (w >= pw) left = 0;
        else {
            switch (position.X.toUpperCase()) {
                case ktw.PositionEnum.Left:
                    left = left;
                    break;
                case ktw.PositionEnum.Right:
                    left = pw - w;
                    break;
                case ktw.PositionEnum.Center:
                    left = (pw - w + left) / 2;
                    break;
                default:
                    left = left + parseFloat(position.X);
                    if (left >= pw) {
                        left = left - parseFloat(position.X);
                        if ((left + w) > pw || w >= pw) left = 0;
                    }
                    break;
            }
        }
        if (h >= ph) top = 0;
        else {
            switch (position.Y.toUpperCase()) {
                case ktw.PositionEnum.Top:
                    top = top;
                    break;
                case ktw.PositionEnum.Bottom:
                    top = ph - h;
                    break;
                case ktw.PositionEnum.Center:
                    top = (ph - h + top) / 2;
                    break;
                default:
                    top = top + parseFloat(position.Y);
                    if (top > ph) {
                        top = top - parseFloat(position.Y);
                        if ((top + h) > ph || h > ph) top = 0;
                    }
                    break;
            }
        }
        $(element).css({ 'position': 'absolute', 'top': top, 'left': left });
    };
    /*功能：分组函数
     *参数：groupProp：分组字段，orderProp：排序字段*/
    ktw.GroupBy = function (arr, groupProp, orderProp) {
        if (!arr || arr.length < 1) return;
        var groupData = [];
        if (!ktw.IsNull(groupProp)) {
            var array = [];
            $.each(arr, function (i, o) {
                if ($.inArray(o[groupProp], array) < 0) array.push(o[groupProp]);
            });
            $.each(array, function (j, o) {
                var item = { Key: o };
                var arry = $.grep(arr, function (n, i) {
                    return n[groupProp] == o;
                });
                item.Items = ktw.IsNull(orderProp) ? arry : ktw.OrderBy(arry, orderProp);
                item.Index = ktw.IsNull(orderProp) ? 0 : item.Items[0][orderProp];
                item.index = j;
                groupData.push(item);
            });
            return ktw.OrderBy(groupData, 'Index');
        }
        return arr;
    };
    /*功能：排序函数
     *参数：orderProp：排序字段，orderway：排序方式*/
    ktw.OrderBy = function (arr, orderProp, orderway, IgnoreType) {
        orderway = ktw.IsNull(orderway) ? ktw.OrderWay.ASC : orderway.toUpperCase();
        return arr.sort(function (a, b) {
            var max = orderway == ktw.OrderWay.DESC ? b[orderProp] : a[orderProp];
            var min = orderway == ktw.OrderWay.DESC ? a[orderProp] : b[orderProp];
            if (!IgnoreType) {
                if (ktw.IsString(max) || ktw.IsString(min)) return max.localeCompare(min);
                else if (ktw.IsNumber(max) || ktw.IsNumber(min)) return (max - min);
            }
            else return (parseFloat(max) - parseFloat(min));
        });
    };
    /*功能：将/Date(...)格式转换为yyyy-MM-dd HH:mm:ss型日期格式
     *参数：Date(...)格式
     *返回值：yyy-MM-dd HH:mm:ss格式的字符串*/
    ktw.DateToString = function (str) {
        var d = eval('new ' + str.substr(1, str.length - 2));
        var year = dFormat(d.getFullYear());
        var month = dFormat(d.getMonth() + 1);
        var date = dFormat(d.getDate());
        var hours = dFormat(d.getHours());
        var min = dFormat(d.getMinutes());
        var sed = dFormat(d.getSeconds());
        return year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sed;
        function dFormat(i) {
            return i < 10 ? "0" + i.toString() : i;
        }
    };
    /*功能：将/Date(...)格式转换为yyyy-MM-dd型日期格式
    *参数：Date(...)格式
    *返回值：yyy-MM-dd格式的字符串*/
    ktw.ShortDateToString = function (str) {
        var d = eval('new ' + str.substr(1, str.length - 2));
        var year = dFormat(d.getFullYear());
        var month = dFormat(d.getMonth() + 1);
        var date = dFormat(d.getDate());
        return year + "-" + month + "-" + date;
        function dFormat(i) {
            return i < 10 ? "0" + i.toString() : i;
        }
    };
    /*
    **UTC格式时间转timestamp格式时间
    */
    ktw.UtcToTtamp = function (str) {
        if (!ktw.IsNull(str)) {
            var dt = new Date(str);
            var date = [
              [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'),
              [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')
            ].join(' ').replace(/(?=\b\d\b)/g, '0'); // 正则补零

            return date;
        }
        else {
            return "";
        }
    }

    /*
    **UTC格式时间转Date格式时间
    */
    ktw.UtcToDate = function (str) {
        if (!ktw.IsNull(str)) {
            var dt = new Date(str);
            dt.setHours(dt.getHours() + 16);
            var date = [
              [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-')
            ].join(' ').replace(/(?=\b\d\b)/g, '0'); // 正则补零

            return date;
        }
        else {
            return "";
        }
    }

    ktw.DateToUtc = function (str) {
        if (!ktw.IsNull(str)) {
            var dt = new Date(str);
            return dt.toISOString();
        }
        else {
            return "";
        }
    }
    /**
    ** 计算百分比
    **/
    ktw.Percentage = function (num, total) {
        return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比
    }



    ktw.toJSON = function (obj) {
        return $.toJSON(obj);
    };
    ktw.evalJSON = function (str) {
        //return $.toJSON(str);
        return $.evalJSON(str);
    };
    /*数组求和*/
    ktw.Sum = function (arr, proName) {
        var sum = 0;
        if (ktw.IsNull(arr)) return sum;
        if (ktw.IsNull(proName)) for (var i = 0; i < arr.length; i++) sum += arr[i];
        else for (var i = 0; i < arr.length; i++) sum += arr[i][proName];
        return sum;
    };
    /*功能:获取系统基址*/
    ktw.GetRootUri = function () {
        var pathName = window.document.location.pathname;
        var localhost = window.location.host;
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return ("http://" + localhost + projectName + "/");
    };
    /*功能:禁止页面元素拖拽*/
    ktw.NoDrag = function () {
        $(document).bind("contextmenu", function () {
            return false;
        });
        document.ondragstart = function () {
            return false;
        };
        document.onselectstart = function () {
            return false;
        };
        document.onselect = function () {
            if (document.selection) {
                document.selection.empty();
            }
        };
    };
    /*功能:系统风格*/
    ktw.ThemeType = { WebOS: 'WEBOS', Office: 'OFFICE', Simple: 'SIMPLE' };
    /*功能:位置枚举*/
    ktw.PositionEnum = { Left: 'LEFT', Right: 'RIGHT', Center: 'CENTER', Top: 'TOP', Bottom: 'BOTTOM' };
    /*功能：插件布局位置*/
    ktw.WidgetLayout = {
        Float: "FLOAT",
        Left: "LEFT",
        Right: 'RIGHT',
        Bottom: "BOTTOM",
        Fill: "FILL",
        Tab: "TAB",
        FloatHTML: "FLOATHTML"
    };
    /*功能：排序方式*/
    ktw.OrderWay = { DESC: 'DESC', ASC: 'ASC' };
    /*功能：日志类型*/
    ktw.LogType = { Fatal: "Fatal", Error: "Error", Warn: "Warn", Info: "Info", Debug: "Debug" };

    /*功能：冒泡位置*/
    ktw.TrianglePosition = { Left: 'LEFT', Right: 'RIGHT', Top: 'TOP', Bottom: 'BOTTOM' };
    /*功能：冒泡位置*/
    ktw.Region = { West: 'WEST', East: 'EAST', South: 'SOUTH', North: 'NORTH' };
    /*功能：文件类型*/
    ktw.FileType = { Word: "WORD", PPT: "PPT", Excel: "EXCEL", PDF: "PDF", Image: "IMAGE", Text: "TEXT" };
    /*功能：控件类型*/
    ktw.ControlType = {
        "TextBox": ".ktw-textbox",
        "NumberBox": ".ktw-numberbox",
        "Combobox": ".ktw-combobox",
        "Combotree": ".ktw-combotree",
        "CheckBox": ".ktw-checkbox",
        "Radio": ".ktw-radio",
        "NumberSpinnerBox": ".ktw-numberspinner",
        "Tree": ".ktw-tree",
        "DataGrid": ".ktw-datagrid",
        "Text": ".ktw-text",
        "ListBox": ".ktw-listbox",
        "Box": ".ktw-box"
    };
    /*功能：控件继承关系*/
    ktw.InheritType = { "Text": [".ktw-textbox", ".ktw-numberbox", ".ktw-combobox"] };
    /*设置图层是否显示*/
    ktw.SetLayersVisble = function (types, currtype, map) {
        //首先判断有多少种
        if (ktw.IsNull(types) || types.length === 0 || ktw.IsNull(currtype)) return;
        //配置的所有底图
        var alllayers = ktw.App.Config.SystemMap.LayerInfo.BaseLayers;
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
        map = map || ktw.App.Map;
        map.eachLayer(function (layer) {
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
        //var layers = ktw.App.Map._layers();
        //layers.forEach(function (o, i) {
        //    var tmpLayer;
        //    var temlayer = Enumerable.From(currlayers).Where('s=>s.ID==="' + o.getProperties().id + '"').ToArray();
        //    if (!ktw.IsNull(temlayer) && temlayer.length > 0) {
        //        tmpLayer = o;
        //        tmpLayer.setVisible(true);
        //    }
        //    var temlayer1 = Enumerable.From(otherlayers).Where('s=>s.ID==="' + o.getProperties().id + '"').ToArray();
        //    if (!ktw.IsNull(temlayer1) && temlayer1.length > 0) {
        //        tmpLayer = o;
        //        tmpLayer.setVisible(false);
        //    }
        //});
    }
    /*根据ID获取基础地址*/
    ktw.GetSystemUrlByBasicID = function (basicid) {
        var basicurls = ktw.App.Config.SystemUri.BasicUris;
        if (ktw.IsNull(basicurls) || basicurls.length === 0) return "";
        var basicInfo = Enumerable.From(basicurls).Where('s=>s.ID==="' + basicid + '"').ToArray();
        if (basicInfo.length === 0) return "";
        else return basicInfo[0].Uri;
    };
    /*根据ID获取相对地址*/
    ktw.GetSystemUrlByRelID = function (relativeid) {
        if (!ktw.IsNull(relativeid) && relativeid.indexOf("http") == 0) return relativeid;
        var relurls = ktw.App.Config.SystemUri.RelativeUris;
        if (ktw.IsNull(relurls) || relurls.length === 0) return "";
        var relativeInfo = Enumerable.From(relurls).Where('s=>s.ID==="' + relativeid + '"').ToArray();
        if (relativeInfo.length === 0) return "";
        var relativuri = relativeInfo[0].Uri;
        var basicid = relativeInfo[0].BasicID;
        if (ktw.IsNull(basicid)) return relativuri;
        var basicuri = ktw.GetSystemUrlByBasicID(basicid);
        return basicuri + relativuri;
    };
    /*获取URL中参数值*/
    ktw.GetQueryString = function (name, url) {
        if (ktw.IsNull(url)) url = window.location.search.substr(1);
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
        var r = url.match(reg);
        return r == null ? null : unescape(r[2]);
    };
    //获取请求地址参数
    ktw.GetRequestParams = function (url) {
        if (ktw.IsNull(url)) url = window.location.search.substr(1);
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var urls = url.split("?");
            theRequest["BaseUri"] = urls[0];
            var str = urls[1];
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var param = strs[i].split("=");
                theRequest[param[0]] = unescape(param[1]);
            }
        }
        return theRequest;
    };
    /*对象克隆*/
    ktw.ObjClone = function (obj) {
        return $.extend(true, {}, obj);
    };
    /*对象克隆去除某些属性*/
    ktw.ObjCloneExceptAttr = function (obj, attrArr) {
        var cloneData = $.extend(true, {}, obj);
        $.each($(attrArr), function (i, o) {
            delete cloneData[o];
        });
        return cloneData;
    };
    /*获取当前时间的String*/
    ktw.GetNowDateString = function () {
        var datestr = "";
        var date = new Date();
        date.getYear()
        var year = date.getUTCFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var mins = date.getMinutes();
        var seconds = date.getSeconds();
        datestr = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day) + " ";
        datestr += (hour < 10 ? ("0" + hour) : hour) + ":" + (mins < 10 ? ("0" + mins) : mins) + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
        return datestr;
    };
    /*将rgb写法转成16进制写法,如rgb(255,255,255)转换为#ffffff*/
    ktw.GetHex = function (rgb) {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        if (parseFloat(Sys.ie) > 8 || parseFloat(Sys.firefox) > 4 || parseFloat(Sys.chrome) > 10 || parseFloat(Sys.opera) > 11.1 || parseFloat(Sys.safari) > 5) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }
            rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
        return rgb;
    };
    /*数组相关方法*/
    (function () {
        Array.prototype.each = function (fn) {
            fn = fn || Function.K;
            var a = [];
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < this.length; i++) {
                var res = fn.apply(this, [this[i], i].concat(args));
                if (res != null) a.push(res);
            }
            return a;
        };
        /*数组去重*/
        Array.prototype.uniquelize = function () {
            var ra = new Array();
            for (var i = 0; i < this.length; i++) {
                if (!ra.contains(this[i])) {
                    ra.push(this[i]);
                }
            }
            return ra;
        };
        Array.prototype.contains = function (b) {
            return this.indexOf(b) >= 0;
        }
        /*数组补集*/
        Array.prototype.complement = function (b) {
            return this.union(b).minus(this.intersect(b));
        };
        /*数组交集*/
        Array.prototype.intersect = function (b) {
            return this.uniquelize().each(function (o) {
                return b.contains(o) ? o : null
            });
        };
        /*数组差值*/
        Array.prototype.minus = function (b) {
            return this.uniquelize().each(function (o) {
                return b.contains(o) ? null : o
            });
        };
        /*数组并集*/
        Array.prototype.union = function (b) {
            return this.concat(b).uniquelize();
        };
        /*数组克隆*/
        Array.prototype.clone = function () {
            return $.extend(true, {}, { tmp: this }).tmp;
        };
        /*数组查找索引*/
        Array.prototype.indexOf = Array.prototype.indexOf || function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        /*数组移除元素*/
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    })();
    //验证数据绑定关键字
    ktw.ParseOpt = function (o, obj) {
        if (ktw.IsNull(obj)) return { Target: o };
        var reg = /^<\$[a-zA-Z_][a-zA-Z0-9_.\[\]\:]*\$>$/m;
        for (var item in obj) {
            if (!reg.test(obj[item])) continue;
            var key = obj[item].replace(/^<\$|\$>$/g, "");
            obj.Data = convertSource(key, window);
        }
        return $.extend({ Target: o }, obj);
    };
    //初始化界面
    ktw.InitControl = function () {
        for (var key in ktw.ControlType) {
            var selector = ktw.ControlType[key] + getNotSelector(key);
            $.each($(selector), function (i, o) {
                if (ktw.IsNull($(o).prop("$this"))) {
                    var opt = $(o).attr("opt");
                    opt = ktw.IsNull(opt) ? null : JSON.parse(opt);
                    opt = ktw.ParseOpt($(o), opt);
                    new ktw[key](opt);
                }
            });
        }
    };
    ktw.UrlPara = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function convertSource(key, data) {
        var isFun = key.indexOf("fun:") >= 0;
        var arrSource = key.split(/\./g);
        for (var i = 0; i < arrSource.length; i++) {
            var item = arrSource[i].split(/\[/g);
            for (var j = 0; j < item.length; j++) {
                if (item[j].indexOf("]") >= 0) data = data[parseInt(item[j].replace(/\]/g, ""))];
                else if (isFun) {
                    data = data[item[j].replace(/fun\:/g, "")];
                    if ($.isFunction(data)) data = data();
                }
                else data = data[item[j]];
            }
        }
        return data;
    };
    function getNotSelector(key) {
        if (ktw.IsNull(ktw.InheritType[key])) return "";
        return ":not(" + ktw.InheritType[key].toString() + ")";
    };
    //鼠标点击隐藏控件
    function hideControl(doc) {
        //$.each($(ktw.ControlType.Combobox, doc.body), function (i, o) {
        //    var $this = $(o).prop("$this");
        //    if ($this && !$this.over1) $this.HidePopup();
        //});
    };
    //窗体大小改变自适应控件大小
    function resizeControl(doc) {
        for (var key in ktw.ControlType) {
            var selector = ktw.ControlType[key] + getNotSelector(key);
            $.each($(selector, doc.body), function (i, o) {
                var $this = $(o).prop("$this");
                if ($this.Stretched && $this.Layout) $this.Layout();
            });
        }
    };

    $(function () {
        ktw.InitControl();
        //$(document).mousedown(function () {
        //    hideControl(this);
        //});
        $(window).resize(function () {
            resizeControl(this.document);
        });
    });
})(jQuery);
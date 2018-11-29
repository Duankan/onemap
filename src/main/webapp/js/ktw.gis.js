/* 描述：GIS通用方法的封装
 * 日期：2015-11-20
 * 创建：郑良 */
/**
 规定地图上所有的临时图层都以"temp_"作为图层id的前缀,方便统一管理(清除)
*/
; (function ($) {
    ktw.Platform = { KTOPHIGHGIS: 'KTopGIS', ArcGIS: 'ArcGIS', MapGIS: 'MapGIS', SuperMap: 'SuperMap' };
    ktw.FieldType = { Number: 'Number', Text: 'Text', Date: 'Date' };
    ktw.GeometryType = { Point: 'Point', Line: 'Line', Polygon: 'Polygon' };
    //地图使用的坐标系代码
    ktw.EPSG = "EPSG:4326";
    //求面积使用的投影坐标系
    ktw.ProEPSG = "EPSG:2382";
    //缓存全局的sld文件
    ktw.Slds = {};
    ktw.LayerType = {
        Mapping: 'Mapping',//Arcgis矢量服务
        TileMapping: 'TileMapping',//Arcgis瓦片服务
        WMS: 'WMS',//OGC WMS服务
        Tile: "Tile",//瓦片
        WMTS: "WMTS",//
    };
    ktw.Relations = {
        BBOX: 'BBOX',
        INTERSECTS: 'Intersects',
        DWITHIN: 'DWithin',
        WITHIN: "Within",
        CONTAINS: 'Contains'
    };
    /* 描述：MapLoad(地图加载)
     * 日期：2015-11-16
     * 创建：郑良 */
    ktw.MapLoad = {
        AddArcGISLayer: function (args) {
            if (!args || !args.Url) return;
            if (ktw.IsNull(args.Map)) args.Map = ktw.App.Map;
            var option = {
                url: args.Url,
                detectRetina: false,
                visible: args.Visible,
                id: args.ID
            };
            if (!ktw.IsNull(args.MinZoom)) {
                option.minZoom = args.MinZoom;
            }
            if (!ktw.IsNull(args.MaxZoom)) {
                option.maxZoom = args.MaxZoom;
            }
            if (args.Args && typeof (args.Args) == "string") {
                args.Args = eval("(" + args.Args + ")");
            }
            option = $.extend(option, args.Args || {});
            var layer = L.esri.tiledMapLayer(option);
            args.Map.addLayer(layer);
            return layer;
        },
        AddTileLayer: function (args) {
            if (!args || !args.Url) return;
            if (!args.Map) args.Map = ktw.App.Map;
            var option = {
                visible: ktw.IsNull(args.Visible) ? true : args.Visible,
                id: args.ID,
                opacity: ktw.IsNull(args.Opacity) ? 1.0 : args.Opacity,
                zIndex: ktw.IsNull(args.ZIndex) ? 0 : args.ZIndex,
                visible: ktw.IsBoolean(args.Visible) ? args.Visible : true
            };
            if (!ktw.IsNull(args.MinZoom)) {
                option.minZoom = args.MinZoom;
            }
            if (!ktw.IsNull(args.MaxZoom)) {
                option.maxZoom = args.MaxZoom;
            }
            if (args.Args && typeof (args.Args) == "string") {
                args.Args = eval("(" + args.Args + ")");
            }
            option = $.extend(option, args.Args || {});
            var layer = L.tileLayer(args.Url, option);
            args.Map.addLayer(layer);
            return layer;
        },
        AddWMSLayer: function (args) {
            if (!args || !args.Url) return;
            if (!args.Map) args.Map = ktw.App.Map;
            var option = {
                format: ktw.IsNull(args.Format) ? 'image/png' : args.Format,
                id: args.ID,
                transparent: ktw.IsBoolean(args.Transparent) ? args.Transparent : true,
                version: ktw.IsNull(args.Version) ? "1.1.1" : args.Version,
                opacity: ktw.IsNull(args.Opacity) ? 1.0 : args.Opacity,
                zIndex: ktw.IsNull(args.ZIndex) ? 0 : args.ZIndex,
                visible: ktw.IsBoolean(args.Visible) ? args.Visible : true,
                pane: args.Map.getPanes().tilePane,
                useCanvas: false
            };
            if (!ktw.IsNull(args.MinZoom)) {
                option.minZoom = args.MinZoom;
            }
            if (!ktw.IsNull(args.MaxZoom)) {
                option.maxZoom = args.MaxZoom;
            }
            if (!ktw.IsNull(args.Bounds)) {
                option.bounds = args.Bounds;
            }
            if (!ktw.IsNull(args.Sldbody)) {
                option.SLD_BODY = args.Sldbody;
            } else {
                if (!ktw.IsNull(args.Layers)) option.layers = args.Layers;
            }
            if (!ktw.IsNull(args.Styles)) option.styles = args.Styles;
            var tmp;
            if (!ktw.IsNull(args.CQLFilter)) tmp = args.CQLFilter.replace(/1=1\s*AND|1=1\s*and|1=1\s*OR|1=1\s*or|1=1\s*/, "");
            if (!ktw.IsNull(tmp)) option.CQL_FILTER = tmp;
            if (args.Args && typeof (args.Args) == "string") {
                args.Args = eval("(" + args.Args + ")");
            }
            option = $.extend(option, args.Args || {});
            var layer = new L.nonTiledLayer.wms(args.Url, option);
            args.Map.addLayer(layer);
            return layer;
        },
        AddWMSLayers: function (args) {//多个WMS出图
            if (!args || args.length === 0) return;
            for (var i = 0; i < args.length; i++) {
                ktw.MapLoad.AddWMSLayer(args[i]);
            }
        },
        AddWMTSLayer: function (args) {
            if (!args || !args.Url) return;
            if (ktw.IsNull(args.Map)) args.Map = ktw.App.Map;
            var option = {
                layer: args.Layers,//图层名称
                tilematrixSet: ktw.IsNull(args.EPSG) ? ktw.EPSG : args.EPSG,//地图参考系（一般无需修改）
                format: ktw.IsNull(args.Format) ? 'image/png' : args.Format,//地图图片返回格式（默认即可）
                noWrap: true,
                visible: ktw.IsNull(args.Visible) ? true : args.Visible,
                id: args.ID
            }
            if (!ktw.IsNull(args.MinZoom)) {
                option.minZoom = args.MinZoom;
            }
            if (!ktw.IsNull(args.MaxZoom)) {
                option.maxZoom = args.MaxZoom;
            }
            if (!ktw.IsNull(args.Bounds)) {
                option.bounds = args.Bounds;
            }
            if (!ktw.IsNull(args.Styles)) option.styles = args.Styles;
            if (args.Args && typeof (args.Args) == "string") {
                args.Args = eval("(" + args.Args + ")");
            }
            option = $.extend(option, args.Args || {});
            var layer = new L.TileLayer.WMTS(args.Url, option);
            args.Map.addLayer(layer);
            return layer;
        },
        //底图加载
        InitMap: function (config) {
            //检查是否配置了初始化图层列表
            if (ktw.IsNull(config) || ktw.IsNull(config.Map)
                || ktw.IsNull(config.LayerInfo) || ktw.IsNull(config.LayerInfo.BaseLayers)) return;
            //初始化地图坐标系
            //TODO
            var baseLayers = config.LayerInfo.BaseLayers;
            if (baseLayers.length == undefined) baseLayers = [config.LayerInfo.BaseLayers];
            //图层排序
            baseLayers = ktw.OrderBy(baseLayers, "Order", ktw.OrderWay.ASC, true);
            for (var i = 0; i < baseLayers.length; i++) {
                //设置Map参数
                baseLayers[i].Map = config.Map;
                //设置地图是否可见参数
                if (ktw.IsNull(baseLayers[i].Visible)) baseLayers[i].Visible = false;
                else if (!ktw.IsBoolean(baseLayers[i].Visible)) {
                    baseLayers[i].Visible = baseLayers[i].Visible.toString().toLowerCase() == "true" ? true : false;
                }

                switch (baseLayers[i].Type) {
                    case ktw.LayerType.Mapping:
                        ktw.MapLoad.AddArcGISLayer(baseLayers[i]);
                        break;
                    case ktw.LayerType.Tile:
                        ktw.MapLoad.AddTileLayer(baseLayers[i]);
                        break;
                    case ktw.LayerType.WMS:
                        //处理底图配置的sld和typename参数
                        if (!ktw.IsNull(baseLayers[i].Sld)) {
                            var sldbody = ktw.MapUtils.LoadSLD(baseLayers[i].Sld);
                            sldbody = sldbody.replace("%LayerName%", baseLayers[i].TypeName);
                            baseLayers[i].Sldbody = sldbody;
                            //使用sldbody时不能指定layers参数
                            baseLayers[i].Layers = undefined;
                        } else {
                            baseLayers[i].Layers = baseLayers[i].TypeName;
                        }
                        //处理Filter参数
                        if (!ktw.IsNull(baseLayers[i].Filter)) {
                            baseLayers[i].CQLFilter = baseLayers[i].Filter;
                        }
                        //处理配置文件中的边界设置
                        if (!ktw.IsNull(baseLayers[i].Bounds) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.XMin) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.XMax) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.YMin) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.YMax)) {
                            var ext = baseLayers[i].Bounds;
                            var southWest = L.latLng(parseFloat(ext.YMin), parseFloat(ext.XMin)),
                                    northEast = L.latLng(parseFloat(ext.YMax), parseFloat(ext.XMax));
                            baseLayers[i].Bounds = L.latLngBounds(southWest, northEast);
                        } else {
                            baseLayers[i].Bounds = undefined;
                        }
                        ktw.MapLoad.AddWMSLayer(baseLayers[i]);
                        break;
                    case ktw.LayerType.WMTS:
                        baseLayers[i].Layers = baseLayers[i].TypeName || baseLayers[i].Layers;
                        //处理配置文件中的边界设置
                        if (!ktw.IsNull(baseLayers[i].Bounds) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.XMin) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.XMax) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.YMin) &&
                                    !ktw.IsNull(baseLayers[i].Bounds.YMax)) {
                            var ext = baseLayers[i].Bounds;
                            var southWest = L.latLng(parseFloat(ext.YMin), parseFloat(ext.XMin)),
                                    northEast = L.latLng(parseFloat(ext.YMax), parseFloat(ext.XMax));
                            baseLayers[i].Bounds = L.latLngBounds(southWest, northEast);
                        } else {
                            baseLayers[i].Bounds = undefined;
                        }
                        ktw.MapLoad.AddWMTSLayer(baseLayers[i]);
                        break;
                }
            }
        }
    };

    ktw.Project = {
        InitProjectParam: function (path) {
            $.ajax({
                url: path ? path : "config/coordinateSystem.json",
                dataType: 'json',
                type: 'GET',
                timeout: 2000,
                async: false,
                cache: false,
                success: function (json) {
                    ktw.ProjectInfo = json;
                },
                error: function (json, e, s) {
                    ktw.ProjectInfo = null
                }

            });
        },
        GetStrProject: function (id) {
            var project = Enumerable.From(ktw.ProjectInfo).Where('s=>s.id===' + parseInt(id)).ToArray();
            return project[0];
        },//获取投影字符串
        DefinedProject: function (id) {
            if (id === "4326" || id === "3857") return;
            var project = Enumerable.From(ktw.ProjectInfo).Where('s=>s.id===' + parseInt(id)).ToArray();
            if (ktw.IsNull(project) || project.length === 0) return;
            proj4.defs("EPSG:" + project[0].id, project[0].strProject);
        },//定义投影
        GetUnitByEPSG: function (id) {
            var project = Enumerable.From(ktw.ProjectInfo).Where('s=>s.id===' + parseInt(id)).ToArray();
            if (ktw.IsNull(project) || project.length === 0) return 'degrees';
            if (project[0].type === 0) return 'degrees';
            else if (project[0].type === 1) return 'm';
        },
        GetCRSByCode: function (id) {
            if (ktw.IsNull(id)) return;
            if (id.indexOf("EPSG:") > -1) {
                id = id.split(":")[1];
            }
            if (id === "4326") return L.CRS.EPSG4326;
            if (id === "3857") return L.CRS.EPSG3857;
            //if (id === "3395") return L.CRS.EPSG3395;
            if (id === "3395") {
                var crs = new L.Proj.CRS('EPSG:3395',
                    '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
                    {
                        resolutions: function () {
                            level = 19
                            var res = [];
                            res[0] = Math.pow(2, 18);
                            for (var i = 1; i < level; i++) {
                                res[i] = Math.pow(2, (18 - i))
                            }
                            return res;
                        }(),
                        origin: [0, 0],
                        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
                    });
                return crs;
            };
            try {
                return new L.Proj.CRS("EPSG:" + id);
            } catch (ex) {
                ktw.Project.DefinedProject(id);
                return new L.Proj.CRS("EPSG:" + id);
            }

        },//根据epsg代码获取坐标参考系
        Transform: function (srcEPSG, destEPSG, coordinate, isXY) {
            if (ktw.IsNull(srcEPSG) || ktw.IsNull(destEPSG)) return;
            if (isXY == undefined) isXY = false;
            srcEPSG += "";
            destEPSG += "";
            if (srcEPSG.indexOf("EPSG:") > -1) srcEPSG = srcEPSG.split(":")[1];
            if (destEPSG.indexOf("EPSG:") > -1) destEPSG = destEPSG.split(":")[1];
            if (!proj4.defs["EPSG:" + srcEPSG]) {
                ktw.Project.DefinedProject(srcEPSG);
            }
            if (!proj4.defs["EPSG:" + destEPSG]) {
                ktw.Project.DefinedProject(destEPSG);
            }
            //支持直接转换点坐标
            if (coordinate instanceof Array) {
                return proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, coordinate);
            }
            //支持转换L.LatLng对象
            if (coordinate instanceof L.LatLng) {
                var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [coordinate.lng, coordinate.lat]);
                return new L.LatLng(res[0], res[1]);
            }
            //支持转换L.LatLngBounds对象
            if (coordinate instanceof L.LatLngBounds) {
                var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [coordinate._southWest.lng, coordinate._southWest.lat]);
                var southWest = L.latLng(res[0], res[1]);
                res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [coordinate._northEast.lng, coordinate._northEast.lat]);
                var northEast = L.latLng(res[0], res[1]);
                return bounds = L.latLngBounds(southWest, northEast);
            }
            //支持包含_latlngs属性的对象的转换            
            if ((coordinate instanceof Object) && (coordinate._latlngs instanceof Array) && (coordinate._latlngs.length > 0)) {
                var tmp = $.extend({}, coordinate);
                tmp._latlngs = [];
                for (var i = 0; i < coordinate._latlngs.length; i++) {
                    var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [coordinate._latlngs[i].lng, coordinate._latlngs[i].lat]);
                    tmp._latlngs[i] = {};
                    tmp._latlngs[i].lat = res[0];
                    tmp._latlngs[i].lng = res[1];
                }
                return tmp;
            }
            //其他对象转换为geojson格式转换
            var tmp;
            if (coordinate.type != 'Feature' && coordinate.type != 'FeatureCollection') {
                coordinate = coordinate.toGeoJSON();
            }
            tmp = coordinate;
            if (tmp && tmp.type == "Feature") {
                if (tmp.geometry.type == "Point") {
                    //转换点数据
                    if (tmp.geometry.coordinates && tmp.geometry.coordinates.length > 0) {
                        var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[0], tmp.geometry.coordinates[1]]);
                        if (isXY) {
                            tmp.geometry.coordinates[0] = res[0];
                            tmp.geometry.coordinates[1] = res[1];
                        } else {
                            tmp.geometry.coordinates[0] = res[1];
                            tmp.geometry.coordinates[1] = res[0];
                        }
                    }
                } else if (tmp.geometry.type == "MultiPolygon") {
                    //转换多面数据
                    if (tmp.geometry && tmp.geometry.coordinates && tmp.geometry.coordinates.length > 0) {
                        for (var i = 0; i < tmp.geometry.coordinates.length; i++) {
                            for (var j = 0; j < tmp.geometry.coordinates[i].length; j++) {
                                var len = tmp.geometry.coordinates[i][j].length;
                                //防止重复转换坐标 兼容写法
                                if (tmp.geometry.coordinates[i][j][tmp.geometry.coordinates[i][j].length - 1] === tmp.geometry.coordinates[i][j][0]) {
                                    len = len - 1;
                                }
                                for (var k = 0; k < len; k++) {
                                    var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[i][j][k][1], tmp.geometry.coordinates[i][j][k][0]]);
                                    if (res[0] < 10 || res[1] < 10) {
                                        //纬度不能小于10
                                        var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[i][j][k][0], tmp.geometry.coordinates[i][j][k][1]]);
                                    }
                                    tmp.geometry.coordinates[i][j][k][0] = res[0];
                                    tmp.geometry.coordinates[i][j][k][1] = res[1];
                                }
                            }
                        }
                    }
                } else {
                    if (tmp.geometry && tmp.geometry.coordinates && tmp.geometry.coordinates.length > 0) {
                        for (var i = 0; i < tmp.geometry.coordinates.length; i++) {
                            var len = tmp.geometry.coordinates[i].length;
                            //防止重复转换坐标 兼容写法
                            if (tmp.geometry.coordinates[0][tmp.geometry.coordinates[i].length - 1] === tmp.geometry.coordinates[0][0]) {
                                len = len - 1;
                            }
                            for (var j = 0; j < len; j++) {
                                var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[i][j][0], tmp.geometry.coordinates[i][j][1]]);
                                if (res[0] < 10 || res[1] < 10) {
                                    //纬度不能小于10
                                    var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[i][j][1], tmp.geometry.coordinates[i][j][0]]);
                                }
                                if (isXY) {
                                    tmp.geometry.coordinates[i][j][0] = res[0];
                                    tmp.geometry.coordinates[i][j][1] = res[1];
                                } else {
                                    tmp.geometry.coordinates[i][j][0] = res[1];
                                    tmp.geometry.coordinates[i][j][1] = res[0];
                                }
                            }
                        }
                    }
                }
            }
            return tmp;

        },
        TransformG: function (srcEPSG, destEPSG, coordinate, isXY) {
            if (ktw.IsNull(srcEPSG) || ktw.IsNull(destEPSG)) return;
            srcEPSG += "";
            destEPSG += "";
            if (srcEPSG.indexOf("EPSG:") > -1) srcEPSG = srcEPSG.split(":")[1];
            if (destEPSG.indexOf("EPSG:") > -1) destEPSG = destEPSG.split(":")[1];
            if (!proj4.defs["EPSG:" + srcEPSG]) {
                ktw.Project.DefinedProject(srcEPSG);
            }
            if (!proj4.defs["EPSG:" + destEPSG]) {
                ktw.Project.DefinedProject(destEPSG);
            }
            //其他对象转换为geojson格式转换
            var tmp;
            if (coordinate.type != 'Feature' && coordinate.type != 'FeatureCollection') {
                coordinate = coordinate.toGeoJSON();
            }
            tmp = coordinate;
            if (tmp && tmp.type == "Feature") {
                if (tmp.geometry.type == "Point") {
                    //转换点数据
                    if (tmp.geometry.coordinates && tmp.geometry.coordinates.length > 0) {
                        var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[0], tmp.geometry.coordinates[1]]);
                        tmp.geometry.coordinates[0] = res[1];
                        tmp.geometry.coordinates[1] = res[0];
                    }
                } else if (tmp.geometry.type == "MultiPolygon") {
                    //转换多面数据
                    if (tmp.geometry && tmp.geometry.coordinates && tmp.geometry.coordinates.length > 0) {
                        for (var i = 0; i < tmp.geometry.coordinates.length; i++) {
                            for (var j = 0; j < tmp.geometry.coordinates[i].length; j++) {
                                for (var k = 0; k < tmp.geometry.coordinates[i][j].length ; k++) {

                                    var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[i][j][k][0], tmp.geometry.coordinates[i][j][k][1]]);

                                    if (isXY) {
                                        tmp.geometry.coordinates[i][j][k][0] = res[0];
                                        tmp.geometry.coordinates[i][j][k][1] = res[1];
                                    } else {
                                        tmp.geometry.coordinates[i][j][k][0] = res[1];
                                        tmp.geometry.coordinates[i][j][k][1] = res[0];
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (tmp.geometry && tmp.geometry.coordinates && tmp.geometry.coordinates.length > 0) {
                        for (var i = 0; i < tmp.geometry.coordinates.length; i++) {
                            for (var j = 0; j < tmp.geometry.coordinates[i].length; j++) {
                                var res = proj4("EPSG:" + srcEPSG, "EPSG:" + destEPSG, [tmp.geometry.coordinates[i][j][0], tmp.geometry.coordinates[i][j][1]]);
                                if (isXY) {
                                    tmp.geometry.coordinates[i][j][0] = res[0];
                                    tmp.geometry.coordinates[i][j][1] = res[1];
                                } else {
                                    tmp.geometry.coordinates[i][j][0] = res[1];
                                    tmp.geometry.coordinates[i][j][1] = res[0];
                                }
                            }
                        }
                    }
                }
            }
            return tmp;
        }//转换后台查询到的geometry
    };

    /* 描述：MapUtils(GIS常用函数库)
     * 日期：2015-11-16
     * 创建：郑良 */
    ktw.MapUtils = {
        /**
         * 功能：根据范围获取比例尺
         * 参数：map：地图，extent：地图范围
         * 返回值：比例尺（number）
         */
        GetResolutionByExtent: function (map, extent) {
            var geoPointLB = [parseFloat(extent[0]), parseFloat(extent[1])];    //左下角点地理坐标
            var geoPointRT = [parseFloat(extent[2]), parseFloat(extent[3])];    //右上角点地理坐标
            var resX = (geoPointRT[0] - geoPointLB[0]) / (map.getSize().x);    //分辨率 = 经度差 / x差
            var resY = (geoPointRT[1] - geoPointLB[1]) / (map.getSize().y);    //分辨率 = 纬度差 / y差
            return Math.sqrt(Math.pow(resX, 2) + Math.pow(resY, 2));
        },
        /**
         * 功能：根据分辨率获取比例尺
         * 参数：resolution分辨率
         * 返回值：比例尺（number）
         */
        GetScaleByResolution: function (resolution) {
            var scale = 0.0;
            var limit = 111194.872221777;//1度约等于 111194.872221777米
            var foot = 0.0254000508;//1英寸约等于0.0254000508米
            var dpi = 96;
            scale = resolution * limit * dpi / foot;
            return scale;
        },
        /**
         * 功能：根据比例尺获取分辨率
         * 参数：scale比例尺
         * 返回值：分辨率（number）
         */
        GetResolutionByScale: function (scale) {
            var resolution = 0.0;
            var limit = 111194.872221777;//1度约等于 111194.872221777米
            var foot = 0.0254000508;//1英寸约等于0.0254000508米
            var dpi = 96;
            resolution = scale * foot / (limit * dpi);
            return resolution;
        },
        /**
         * 功能：获取最近数据
         * 参数：value:当前值,values:集合数组
         * 返回值：分辨率（number）
         */
        GetNearValue: function (value, values) {
            if (!values || values.length == 0) return 0;
            var temp = [];
            for (var i = 0; i < values.length; i++) {
                temp.push(Math.abs(values[i] - value));
            }
            var index = temp.indexOf(Math.min.apply(Math, temp));
            return values[index];
        },
        /**
         * 功能：比较范围
         * 参数：extent1:大范围,extent2:小范围
         * 返回值：是否在范围内（Boolean）
         */
        Contain: function (extent1, extent2) {
            return L.LatLngBounds.contains.extent.containsExtent(extent1, extent2);
        },
        GetDpi: function () {
            var sp = new ktw.Sphere(6378137);
            var size = ktw.App.Map.getSize();
            var map = ktw.App.Map.getView().calculateExtent(size);
            var distance = sp.haversineDistance([120.21592590991689, 30.210793016606], [120.21670777384473, 30.211168525868086]);
            var screenDistance = Math.pow(size[0], 2) + Math.pow(size[1], 2);
            return distance / screenDistance;
        },
        GetBufferGeometry: function (geometry, radius) {
            var parser = new jsts.io.OL3Parser();
            var jstsGeom = parser.read(geometry);
            var feature = new ktw.Feature();
            feature.setGeometry(parser.write(jstsGeom.buffer(radius)));
            return feature;
        },
        /**
         * 功能：获取范围
         * 参数：features:要素集合
         * 返回值：范围（ktw.Extent）
         */
        GetExtent: function (features) {
            if (!features || features.length == 0) return null;
            var extent = [0, 0, 0, 0];
            for (var i = 0; i < features.length; i++) {
                var ext = features[i].getGeometry().getExtent();
                if (ext[0] < extent[0]) extent[0] = ext[0];
                if (ext[1] < extent[1]) extent[1] = ext[1];
                if (ext[2] > extent[2]) extent[2] = ext[2];
                if (ext[3] > extent[3]) extent[3] = ext[3];
            }
            return extent;
        },

        Rad: function (d) {
            return d * Math.PI / 180.0;
        },
        /**
         * 功能：根据两点经纬度坐标获取长度（地理坐标系）
         * 参数：lat1:经度1,lng1:纬度1,lat2:经度2,lng2:纬度2
         * 返回值：距离（number）
         */
        GetDistanceByGeo: function (lat1, lng1, lat2, lng2) {
            var radLat1 = this.Rad(lat1);
            var radLat2 = this.Rad(lat2);
            var a = radLat1 - radLat2;
            var b = this.Rad(lng1) - this.Rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378137.0;
            s = Math.round(s * 10000) / 10000;
            return s;
        },
        /**
         * 功能：根据两点经纬度坐标获取长度（平面坐标系）
         * 参数：lat1:经度1,lng1:纬度1,lat2:经度2,lng2:纬度2
         * 返回值：距离（number）
         */
        GetDistanceByPro: function (lat1, lng1, lat2, lng2) {
            //return Math.round(((Math.sqrt((lat1 - lat2) * (lat1 - lat2) + (lng1 - lng2) * (lng1 - lng2))) / 1000), 5);
            return Math.round((Math.sqrt((lat1 - lat2) * (lat1 - lat2) + (lng1 - lng2) * (lng1 - lng2))), 5);
        },
        /**
         * 功能：获取临时图层
         * 参数：tmpLayerID：图层编号
         * 返回值：临时图层
         */
        GetTempLayer: function (tmpLayerID, map) {
            if (ktw.IsNull(tmpLayerID)) tmpLayerID = "tempGraphicLayer";
            if (ktw.IsNull(map)) map = ktw.App.Map;
            var layers = map.getLayers();
            var tmpLayer = null;
            layers.forEach(function (o, i) {
                if ((o.getProperties().type !== undefined) && o.getProperties().type.toLowerCase() === "tempvector"
                    && o.getProperties().id === tmpLayerID) tmpLayer = o;
            });
            return tmpLayer;
        },

        /*** 功能：向临时图层移除单个元素
         * 参数：feature：元素集合，tmpLayerID：图层编号
         * 返回值：null */
        RemoveFeature: function (feature, tmpLayerID, map) {
            if (ktw.IsNull(feature)) return;
            if (ktw.IsNull(map)) map = ktw.App.Map;
            var tmpLayer = ktw.MapUtils.GetTempLayer(tmpLayerID, map);
            var features = tmpLayer.getSource();
            var tmpFeature = ktw.MapUtils.GetFeatureByID(feature.getProperties().id, tmpLayerID, map);//增加map参数 wlf 2017年2月8日14:59:04
            if (!ktw.IsNull(tmpFeature)) features.removeFeature(feature);
        },
        GetFeatureByID: function (id, tmpLayerID, map) {
            if (ktw.IsNull(map)) map = ktw.App.Map;
            var feature = null;
            var tmpLayer = ktw.MapUtils.GetTempLayer(tmpLayerID, map);
            var features = tmpLayer.getSource();
            var source = features.getFeatures();
            for (var i = 0; i < source.length; i++) {
                if (source[i].getProperties().id === id) {
                    feature = source[i];
                    break;
                }
            }
            return feature;
        },

        //根据图层id返回图层  id为创建图层时指定的id非_leaflet_id
        GetLayer: function (layerID, map) {
            if (ktw.IsNull(map)) map = ktw.App.Map;
            var layer = null;
            map.eachLayer(function (item) {
                if (item.options && item.options.id == layerID) {
                    layer = item;
                    return;
                }
            });
            return layer;
        },
        //根据图层id移除图层  id为创建图层时指定的id非_leaflet_id
        RemoveLayer: function (id, map) { //移除图层
            if (ktw.IsNull(map)) map = ktw.App.Map;
            var layer;
            map.eachLayer(function (item) {
                if (item.options && item.options.id == id) {
                    layer = item;
                    return;
                }
            });
            if (layer) map.removeLayer(layer);
            return layer;
        },
        //设置图层是否可见
        SetLayerVisible: function (id, visible, map) {
            if (ktw.IsNull(map)) map = ktw.App.Map;
            map.eachLayer(function (layer) {
                if (layer.options.id === id)
                    layer.setVisible(visible);
            });
        },
        LoadSLD: function (url) {
            if (ktw.IsNull(url)) return;
            var attr = hex_md5(url);
            if (ktw.Slds[attr]) {
                return ktw.Slds[attr];
            }
            var strXml = null;
            $.ajax({
                url: url,
                dataType: 'text',
                type: 'GET',
                timeout: 2000,
                async: false,
                error: function (xml) {
                    ktw.Alert("加载XML文件出错！");
                    console.error(arguments);
                },
                success: function (xml) {
                    ktw.Slds[attr] = strXml = xml.replace(/\r\n\s*/g, "");
                }
            });
            return strXml;
        },
        UpdateStyle: function (map, layerID, style, cqlfilter, filter) {
            if (ktw.IsNull(map)) return;
            var layer = ktw.MapUtils.GetLayer(layerID, map);
            var osource = layer.getSource();
            var param = osource.getParams();
            if (!ktw.IsNull(style)) {
                delete layerParam.SLD_BODY;
                param.STYLES = style;
            }
            if (!ktw.IsNull(cqlfilter)) param.CQL_FILTER = encodeURI(cqlfilter);
            if (!ktw.IsNull(filter)) param.FILTER = filter;
            osource.updateParams(param);
        },
        UpdateSldbody: function (map, layerID, sldbody, sldsrc, cqlfilter, filter) {
            var layer = ktw.MapUtils.GetLayer(layerID, map);
            var osource = layers.getSource();
            var param = osource.getParams();
            if (!ktw.IsNull(sldbody)) {
                param.SLD_BODY = args.Sldbody
                param.STYLES = '';
            }
            else if (!ktw.IsNull(sldsrc)) {
                param.SLD_BODY = ktw.MapUtils.LoadSLD(sldsrc);
                param.STYLES = '';
            }
            if (!ktw.IsNull(cqlfilter)) param.CQL_FILTER = encodeURI(cqlfilter);
            if (!ktw.IsNull(filter)) param.FILTER = filter;
            osource.updateParams(param);
        },
        GetMaxZIndex: function (map) {
            var layers = map.getLayers();
        },
        PointSymbolStyle: function (feature, radius, strRGBA, map) {
            if (ktw.IsNull(map)) map = ktw.App.Map;
            function animate(event) {
                var vectorContext = event.vectorContext;
                var frameState = event.frameState;
                var flashGeom = feature.getGeometry().clone();
                if (radius > 50) radius = 10;
                var style = new ktw.style.Style({
                    image: new ktw.style.Circle({
                        radius: radius,
                        snapToPixel: false,
                        stroke: new ktw.style.Stroke({
                            color: ktw.IsNull(strRGBA) ? 'rgba(255, 0, 0, 1)' : strRGBA,
                            width: 2
                        })
                    })
                });
                vectorContext.setStyle(style);
                vectorContext.drawGeometry(flashGeom);
                radius++;
                map.render();
            }
            var listenerKey = map.on('postcompose', animate);
            return listenerKey;
        },//点渲染样式
        LineSymbolStyle: function (feature, map, colors) {
            if (ktw.IsNull(map)) map = ktw.App.Map;
            if (ktw.IsNull(colors)) colors = ['red', 'yellow'];
            var lineColorIndex = 0, currentColor, a = 0;
            function animate(event) {
                var vectorContext = event.vectorContext;
                var frameState = event.frameState;
                var flashGeom = feature.getGeometry().clone();
                if (!ktw.IsNull(lineColorIndex) && lineColorIndex === currentColor) {
                    if (a === 20) {
                        a = 0;
                        lineColorIndex = lineColorIndex === 0 ? 1 : 0;
                    }
                    else lineColorIndex = currentColor;
                }
                var style = new ktw.style.Style({
                    stroke: new ktw.style.Stroke({ width: 1, color: colors[lineColorIndex] })
                });
                vectorContext.setStyle(style);
                vectorContext.drawGeometry(flashGeom);
                currentColor = lineColorIndex;
                a++;
                map.render();
            }
            var listenerKey = map.on('postcompose', animate);
            return listenerKey;
        },//线渲染样式
        GetExtentByMapClick: function (point, map, px) {
            if (ktw.IsNull(point)) return;
            if (ktw.IsNull(map)) map = ktw.App.Map;
            var clientSize = map.getSize();
            if (ktw.IsNull(px) || !ktw.IsNumber(px)) px = 2;
            var extent = map.getView().calculateExtent(clientSize);
            var clientWidth = clientSize[0], clientHeight = clientSize[1];
            var latdistance = extent[2] - extent[0], londistance = extent[3] - extent[1];
            var pixwR = (latdistance / clientWidth) * px, pixhR = (londistance / clientHeight) * px;
            var radius = Math.sqrt(Math.pow(pixwR, 2) + Math.pow(pixhR, 2));
            var xMin = point[0] - radius, yMin = point[1] - radius, xMax = point[0] + radius, yMax = point[1] + radius;
            return ktw.geom.Polygon.fromExtent([xMin, yMin, xMax, yMax]);
        },
        GetCql_INTERSECTS: function (wkt, field) {
            if (ktw.IsNull(field)) return "INTERSECTS(the_geom," + wkt + ")";
            else return "INTERSECTS(" + field + "," + wkt + ")";
        },
        GetCql_CONTAINS: function (wkt) {
            return "CONTAINS(the_geom," + wkt + ")";
        },
        GetCql_WITHIN: function (wkt) {
            return "WITHIN(the_geom," + wkt + ")";
        },
        GetCql_DWITHIN: function (wkt, distance, unit) {
            if (ktw.IsNull(unit)) unit = "meters";
            if (ktw.IsNull(distance)) distance = "0";
            return "DWITHIN(the_geom," + wkt + "," + distance + "," + unit + ")";
            //return "INTERSECTS(the_geom," + wkt + ")";
        },
        //清除临时图层
        ClearTempLayer: function (map) {
            if (ktw.IsNull(map)) {
                map = ktw.App.Map;
            }
            map.eachLayer(function (layer) {
                if (layer.options && layer.options.id && layer.options.id.indexOf("temp_") == 0) {
                    map.removeLayer(layer);
                }
            })
        }
    };

    ktw.GetFeaturesForArcGIS = function (graphics, type) {
        if (!graphics) return null;
        var features = [];
        for (var i = 0; i < graphics.length; i++) {
            var feature = new ktw.Feature();
            var geo = null;
            switch (type) {
                case ktw.GeometryType.Point:
                    geo = new ktw.geom.Point([graphics[i].geometry.x, graphics[i].geometry.y]);
                    break;
                case ktw.GeometryType.Line:
                    if (graphics[i].geometry.paths.length <= 0) continue;
                    if (graphics[i].geometry.paths.length > 1) {
                        geo = new ktw.geom.MultiLineString(graphics[i].geometry.paths);
                    }
                    else {
                        var lines = graphics[i].geometry.paths[0];
                        geo = new ktw.geom.LineString([lines]);
                    }
                    break;
                case ktw.GeometryType.Polygon:
                    if (graphics[i].geometry.rings.length <= 0) continue;
                    if (graphics[i].geometry.rings.length > 1) {
                        geo = new ktw.geom.MultiPolygon(graphics[i].geometry.rings);
                    }
                    else {
                        var polygon = graphics[i].geometry.rings[0];
                        geo = new ktw.geom.Polygon([polygon]);
                    }
                    break;
            }
            feature.setGeometry(geo);
            feature.Attributes = graphics[i].attributes;
            features.push(feature);
        }
        return features;
    };
    ktw.GetFieldTypeForArcGIS = function (type) {
        if (type == "esriFieldTypeSmallInteger" || type == "esriFieldTypeInteger" || type == "esriFieldTypeOID"
            || type == "esriFieldTypeSingle" || type == "esriFieldTypeDouble") return ktw.FieldType.Number;
        else if (type == "esriFieldTypeString") return "Text";
        else if (type == "esriFieldTypeDate") return "Date";
        return null;
    };
    ktw.GetGeometryTypeForArcGIS = function (type) {
        if (type == "esriGeometryPoint") return ktw.GeometryType.Point;
        else if (type == "esriGeometryPolyline") return ktw.GeometryType.Line;
        else if (type == "esriGeometryPolygon") return ktw.GeometryType.Polygon;
        return null;
    };
    ktw.GetProjectionForArcGIS = function (spatialReference) {
        if (!spatialReference) return null;
        return new ktw.proj.Projection({
            code: "EPSG:" + spatialReference.wkid + ""
        });
    };
    //获取范围
    ktw.getExtentByFeatures = function (features) {
        if (ktw.IsNull(features) || features.length == 0) return;
        var currextent = features[0].getGeometry().getExtent();
        var minX = currextent[0];
        var minY = currextent[1];
        var maxX = currextent[2];
        var maxY = currextent[3];
        for (var i = 1; i < features.length; i++) {
            var newextent = features[i].getGeometry().getExtent();
            if (minX > newextent[0]) minX = newextent[0];
            if (minY > newextent[1]) minY = newextent[1];
            if (maxX < newextent[2]) maxX = newextent[2];
            if (maxY < newextent[3]) maxY = newextent[3];
        }
        return [minX, minY, maxX, maxY];
    };
    /**
     * 功能：将图形转换成WKT,
     * 参数：feature：图形，isConvert:是否将xy格式转换为yx
     * 返回值：返回WKT字符串
     */
    ktw.GetWKTByFeature = function (feature, isConvert) {
        if (ktw.IsNull(feature)) return;
        if (feature.type == 'Feature' || feature.type == 'FeatureCollection') {
            ktop.Wkt.Wkt.prototype.fromJson(feature);
        } else {
            ktop.Wkt.Wkt.prototype.fromObject(feature);
        }
        var wktStr = ktop.Wkt.Wkt.prototype.write();
        wktStr = wktStr.replace(/undefined/g, ' ');
        if (isConvert === true) wktStr = ktw.ConvertWKT(wktStr);;
        return wktStr;
    };
    /**
     * 功能：将xy格式转换成yx
     * 参数：strWKT：xy格式的WKT
     * 返回值：返回WKT字符串
     */
    ktw.ConvertWKT = function (strWKT) {
        var arrWKT = strWKT.split(",");
        var newWKT = "";
        $.each(arrWKT, function (i, o) {
            var point = o.split(" ");
            var x = point[0].trim();
            var y = point[1].trim();
            var newx;
            var endchars = "";
            if (x.lastIndexOf("(") >= 0) {
                newWKT += x.substr(0, x.lastIndexOf("(") + 1).trim();
                newx = x.substr(x.lastIndexOf("(") + 1, x.length - x.lastIndexOf("(") - 1).trim();
            }
            else newx = x.trim();
            if (y.lastIndexOf(")") >= 0) {
                newWKT += y.substr(0, y.indexOf(")")).trim();
                endchars = y.substr(y.indexOf(")"), y.lastIndexOf(")") + 1 - y.indexOf(")")).trim();
            }
            else newWKT += y.trim();
            newWKT += " " + newx + (endchars === "" ? "," : endchars);
        });
        newWKT = newWKT.replace("))((", ")),((");
        return newWKT;
    };
    /**
     * 功能：将多边形图形转换成对象字符串
     * 参数：geometry：多边形对象（ktw.geom.Polygon）
     * 返回值：对象字符串（string）
     */
    ktw.GetPolygonJSON = function (geometry) {
        var coors = geometry.getCoordinates();
        var geo = '{"rings":[';
        for (var i = 0; i < coors.length; i++) {
            geo += '[';
            for (var j = 0; j < coors[i].length; j++) {
                geo += $.toJSON(coors[i][j]);
                if (j !== coors[i].length - 1) geo += ',';
            }
            geo += ']';
            if (i !== coors.length - 1) geo += ',';
        }
        geo += ']}';
        return geo;
    };
    /**
     * 功能：将多线图形转换成对象字符串
     * 参数：geometry：多线对象（ktw.geom.MultiLine）
     * 返回值：多对象字符串（string）
     */
    ktw.GetMultiLineJSON = function (geometry) {
        var coors = geometry.getCoordinates();
        var geo = '{"paths":[';
        for (var i = 0; i < coors.length; i++) {
            geo += '[';
            for (var j = 0; j < coors[i].length; j++) {
                geo += $.toJSON(coors[i][j]);
                if (j !== coors[i].length - 1) geo += ',';
            }
            geo += ']';
            if (i !== coors.length - 1) geo += ',';
        }
        geo += ']}';
        return geo;
    };
    /**
     * 功能：将线图形转换成对象字符串
     * 参数：geometry：线对象（ktw.geom.Line）
     * 返回值：对象字符串（string）
     */
    ktw.GetLineJSON = function (geometry) {
        var coors = geometry.getCoordinates();
        var geo = '{"paths":[[';
        for (var i = 0; i < coors.length; i++) {
            geo += '[';
            for (var j = 0; j < coors[i].length; j++) {
                geo += $.toJSON(coors[i][j]);
                if (j !== coors[i].length - 1) geo += ',';
            }
            geo += ']';
            if (i !== coors.length - 1) geo += ',';
        }
        geo += ']]}';
        return geo;
    };
    /**
     * 功能：将点图形转换成对象字符串
     * 参数：geometry：点对象（ktw.geom.Point）
     * 返回值：对象字符串（string）
     */
    ktw.GetPointJSON = function (geometry) {
        return geometry.getCoordinates().join(',');
    };
    /**
     * 功能：获取最近索引
     * 参数：values：网络分析结果集合，value：值，index：起始索引
     * 返回值：ArcGIS对象字符串（string）
     */
    ktw.GetNANearIndex = function (values, value, index) {
        var temp = [];
        for (var i = index; i < values.length; i++) {
            temp.push(Math.abs(values[i][2] - value));
        }
        return temp.indexOf(Math.min.apply(Math, temp));
    };
    /**
     * 功能：将图形序列化成ArcGIS对象字符串
     * 参数：geometrys：图形对象集合（Array<ktw.geom>）
     * 返回值：ArcGIS对象字符串（string）
     */
    ktw.GetNAFeatureJSON = function (geometrys) {
        if (geometrys.length <= 0) return null;
        var json = '{"features":[';
        var type = geometrys[0].getType();
        switch (type) {
            case "Point":
                for (var i = 0; i < geometrys.length; i++) {
                    json += '{"geometry":';
                    var coor = geometrys[i].getCoordinates();
                    json += '{"x":' + coor[0] + ',"y":' + coor[1] + '}';
                    json += '}';
                    if (i !== geometrys.length - 1) json += ',';
                }
                break;
            case "LineString":
                for (var i = 0; i < geometrys.length; i++) {
                    json += '{"geometry":';
                    json += ktw.GetLineJSON(geometrys[i]);
                    json += '}';
                    if (i !== geometrys.length - 1) json += ',';
                }
                break;
            case "MultiLineString":
                for (var i = 0; i < geometrys.length; i++) {
                    json += '{"geometry":';
                    json += ktw.GetMultiLineJSON(geometrys[i]);
                    json += '}';
                    if (i !== geometrys.length - 1) json += ',';
                }
                break;
            case "Polygon":
                for (var i = 0; i < geometrys.length; i++) {
                    json += '{"geometry":';
                    json += ktw.GetPolygonJSON(geometrys[i]);
                    json += '}';
                    if (i !== geometrys.length - 1) json += ',';
                }
                break;
        }
        json += ']}';
        return json;
    };
    /**
     * 功能：获取ArcGIS位置关系
     * 参数：relation：位置关系（ktw.Relations）
     * 返回值：ArcGIS位置关系字符串（string）
     */
    ktw.GetRelationToArcGIS = function (relation) {
        if (relation) return 'esriGeometryRelation' + relation;
        else return 'esriGeometryRelationIn';
    };
    /**
     * 功能：将图形序列化成ArcGIS对象字符串
     * 参数：geometrys：图形对象集合（Array<ktw.geom>）
     * 返回值：ArcGIS对象字符串（string）
     */
    ktw.GetGeometryJSONToArcGIS = function (geometrys) {
        if (geometrys.length <= 0) return null;
        var json = '';
        var type = geometrys[0].getType();
        switch (type) {
            case "Point":
                for (var i = 0; i < geometrys.length; i++) {
                    json += ktw.GetPointJSON(geometrys[i]);
                    if (i !== geometrys.length - 1) json += ',';
                }
                break;
            case "LineString":
                json += '{"geometryType":"esriGeometryPolyline",';
                json += '"geometries":[';
                for (var i = 0; i < geometrys.length; i++) {
                    json += ktw.GetLineJSON(geometrys[i]);
                    if (i !== geometrys.length - 1) json += ',';
                }
                json += "]}";
                break;
            case "MultiLineString":
                json += '{"geometryType":"esriGeometryPolyline",';
                json += '"geometries":[';
                for (var i = 0; i < geometrys.length; i++) {
                    json += ktw.GetMultiLineJSON(geometrys[i]);
                    if (i !== geometrys.length - 1) json += ',';
                }
                json += "]}";
                break;
            case "Polygon":
                json += '{"geometryType":"esriGeometryPolygon",';
                json += '"geometries":[';
                for (var i = 0; i < geometrys.length; i++) {
                    json += ktw.GetPolygonJSON(geometrys[i]);
                    if (i !== geometrys.length - 1) json += ',';
                }
                json += "]}";
                break;
        }
        return json;
    };

    /**
    * 移除掉地图上所有的临时图层
    * 根据图层的id是否为有"temp_"前缀来判别是否是临时图层
    */
    ktw.RemoveTempLayers = function (map) {
        if (ktw.IsNull(map)) map = ktw.App.Map;
        map.eachLayer(function (item) {
            if (item.options && item.options.id && item.options.id.indexOf("temp_") == 0) {
                map.removeLayer(item);
                return;
            }
        });
    }
})(jQuery);

//压盖查询 2017年9月22日 张滔
(function ($) {
    /** 分析过程
    * 1.根据几何图形空间查询到压盖的图层要素(返回的结果与底图坐标系一致,用于渲染)
    * 2.根据几何图形空间查询到压盖的图层要素(返回的结果与源图形一致)
    * 3.测量查询到的要素的总面积
    * 4.将查询到的几何要素和源几何图形做空间相交(返回相交的图形)
    * 5.对空间相交的结果图形做测量,计算出压盖的面积
    */
    ktw.GetGlandArea = function () {
        var $this = this;
        $this.GetGlandArgs = null;
        /* 过程参数:
         $this.GetGlandArgs.layerdata:与系统坐标系对应数据，用于定位渲染
         $this.GetGlandArgs.Features:相交要素(与源数据坐标系一致)
         $this.GetGlandArgs.Features_Geometry:相交图形(与源数据坐标系一致)
         $this.GetGlandArgs.Features[i].properties.allarea:相交图形的总面积
         $this.GetGlandArgs.GlandGeomerys:压盖的图形
         $this.GetGlandArgs.Features[i].properties.glandarea:压盖的图形面积
        */
        $this.obj = {};
        $this.bind = function () {
            $($this.obj).bind(arguments);
        }
        $this.call = function (args) {
            $this.GetGlandArgs = args;
            var queryPram = new L.QueryParameter.WfsQueryParameter({
                url: args.Url,
                typename: args.TypeName,
                geometry: args.Geometry,
                filterName: (args.filterName == undefined) ? "the_geom" : args.filterName,
                srsName: ktw.EPSG,
                startIndex: $this.GetGlandArgs.startIndex,
                count: $this.GetGlandArgs.count,
                change: (args.change == undefined) ? false : args.change,
                sortBy: ($this.GetGlandArgs.sortBy == undefined) ? "gid" : $this.GetGlandArgs.sortBy,
            });
            var queryTack = new L.QueryTask(queryPram);
            queryTack.execute(QueryDataSuccess, fail);
        }
        //
        function QueryDataSuccess(data) {
            $this.GetGlandArgs.layerdata = data;
            var queryPram = new L.QueryParameter.WfsQueryParameter({
                url: $this.GetGlandArgs.Url,
                typename: $this.GetGlandArgs.TypeName,
                geometry: $this.GetGlandArgs.Geometry,
                filterName: ($this.GetGlandArgs.filterName == undefined) ? "the_geom" : $this.GetGlandArgs.filterName,
                srsName: $this.GetGlandArgs.SourceProject,
                startIndex: $this.GetGlandArgs.startIndex,
                count: $this.GetGlandArgs.count,
                change: ($this.GetGlandArgs.change == undefined) ? false : $this.GetGlandArgs.change,
                sortBy: $this.GetGlandArgs.sortBy
            });
            var queryTack = new L.QueryTask(queryPram);
            queryTack.execute(QuerySuccess, fail);
        }
        //返回相交图形(与源数据坐标系一致)
        function QuerySuccess(data) {
            $this.GetGlandArgs.Features = data.features;
            $this.GetGlandArgs.Features_Geometry = [];
            if (data.totalFeatures <= 0) {
                $this.GetGlandArgs.Success = true;
                $this.GetGlandArgs.Count = data.totalFeatures;
                $($this.obj).trigger("onGlandAreaSuccess", $this.GetGlandArgs);
            }
            else {
                $this.GetGlandArgs.Count = data.totalFeatures;
                for (var i = 0; i < data.features.length; i++) {
                    $this.GetGlandArgs.Features_Geometry.push(data.features[i].geometry);
                }
                var measurePram = new L.QueryParameter.MeasureParameter({
                    url: $this.GetGlandArgs.Url,
                    geometry: JSON.stringify($this.GetGlandArgs.Features_Geometry),
                    //投影变换参考
                    sourceproject: ($this.GetGlandArgs.SourceProject == undefined) ? ktw.EPSG : $this.GetGlandArgs.SourceProject,
                    targetproject: ($this.GetGlandArgs.TargetProject == undefined) ? ktw.ProEPSG : $this.GetGlandArgs.TargetProject
                });
                var gs = new L.GeometryService(measurePram);
                //求相交图形面积
                gs.getArea(areaSuccess, fail);
            }
        }
        //得到相交图形面积（总面积）
        function areaSuccess(data) {
            if (data.indexOf(",") != -1) {
                var Areadata = JSON.parse(data);
                for (var i = 0; i < Areadata.length; i++) {
                    $this.GetGlandArgs.Features[i].properties.allarea = Areadata[i];
                }
            }
            else { $this.GetGlandArgs.Features[0].properties.allarea = data; }
            var GlandGeo = new L.QueryParameter.GraphAnalysis({
                url: $this.GetGlandArgs.Url,
                geometry: JSON.stringify($this.GetGlandArgs.Geometry.geometry),
                geometries: JSON.stringify($this.GetGlandArgs.Features_Geometry)
            });
            var gra = new L.GeometryService(GlandGeo);
            //求压盖部分图形
            gra.intersection(InterSectionCompelete, fail);
        }
        //返回压盖部分图形
        function InterSectionCompelete(data) {
            var GlandGeo = JSON.parse(data);
            $this.GetGlandArgs.GlandGeomerys = [];//压盖的图形
            for (var i = 0; i < GlandGeo.length; i++) {
                var geoPoly = L.GeoJSON.geometryToLayer(GlandGeo[i]);
                if (geoPoly.toGeoJSON().geometry != undefined) {
                    $this.GetGlandArgs.GlandGeomerys.push(geoPoly.toGeoJSON().geometry)
                }
            }
            var measurePram = new L.QueryParameter.MeasureParameter({
                url: $this.GetGlandArgs.Url,
                geometry: JSON.stringify($this.GetGlandArgs.GlandGeomerys),
                //投影变换参考
                sourceproject: ($this.GetGlandArgs.SourceProject == undefined) ? ktw.EPSG : $this.GetGlandArgs.SourceProject,
                targetproject: ($this.GetGlandArgs.TargetProject == undefined) ? ktw.ProEPSG : $this.GetGlandArgs.TargetProject
            });
            var gs = new L.GeometryService(measurePram);
            //求压盖部分面积
            gs.getArea(areaSucess2, fail);
        }
        //得到压盖部分图形面积（压盖面积）
        function areaSucess2(data) {
            if (data.indexOf(",") != -1) {
                var glandarea = JSON.parse(data);
                for (var i = 0; i < glandarea.length; i++) {
                    $this.GetGlandArgs.Features[i].properties.glandarea = glandarea[i];
                }
            } else { $this.GetGlandArgs.Features[0].properties.glandarea = data; }
            $this.GetGlandArgs.Success = true;
            $($this.obj).trigger("onGlandAreaSuccess", $this.GetGlandArgs);
        }
        function fail(data) {
            $this.GetGlandArgs.Success = false;
            $($this.obj).trigger("onGlandAreaSuccess", $this.GetGlandArgs);
        }
    }
})(jQuery);

//高亮对象 2017-9-6 胡庆杰
//可以创建多个高亮对象,新创建的对象都加入map.HighLightContainer数组中
(function ($) {
    var style = {
        weight: 5,
        color: '#FF0000',
        fill: true,
        fillColor: '#8080FF',
        fillOpacity: 0.2
    };
    var style2 = {
        weight: 1,
        color: '#FFFFFF',
        fill: true,
        fillColor: '#8080FF',
        fillOpacity: 0.2
    };
    ktw.HighLight = function (map) {
        var $this = this;
        if (!map) map = ktw.App.Map;
        if (!map.HighLightContainer) {
            map.HighLightContainer = [];
            map.HighLightContainer.clear = function () {
                for (var i = 0; i < this.length; i++) this[i].clearHighLight();


                //初始化删除搜索图层
                for (var i = 0; i < this.length; i++) this[i].clearHighLightSearch();
            }
        }
        map.HighLightContainer.push($this);
        $this.map = map;
        $this.Container = new L.GeoJSON().addTo(map);

        //高亮不闪烁 add by luxiaolin
        $this.ContainerSearch = new L.GeoJSON().addTo(map);

        //高亮动画句柄
        $this.Container.Interval = undefined;
        //清除高亮显示
        $this.clearHighLight = function () {
            $this.Container.clearLayers();
            clearInterval($this.Container.Interval);
        }

        //清除高亮不闪烁  add by luxiaolin
        $this.clearHighLightSearch = function () {
            $this.ContainerSearch.clearLayers();

        }

        //增加高亮显示
        $this.addHighLight = function (feature) {
            if (feature.type != 'Feature' && feature.type != 'FeatureCollection') {
                feature = feature.toGeoJSON();
            }
            var layer = $this.Container.addData(feature);
            //用来记录定时器，有新的高亮图层加入时，关闭上一个高亮定时器
            if ($this.Container.Interval) clearInterval($this.Container.Interval);
            $this.Container.Interval = setInterval(highlight, 500);

        }
        var flag = 0;
        function highlight() {
            if (flag == 0) {
                $this.Container.eachLayer(function (layer) {
                    layer.setStyle(style);
                });
                flag = 1;
            } else {
                $this.Container.eachLayer(function (layer) {
                    layer.setStyle(style2);
                });
                flag = 0;
            }
        }
        //使高亮居中
        $this.fit = function () {
            $this.map.fitBounds($this.Container.getBounds(), {
                animate: true,
                duration: 0.5
            });
        }
        //高亮显示重置
        $this.hightLight = function (feature) {
            ////赋值保存，用以一键式分析之后返回
            //ktw.App.GlobalQuery.SelectRowData=feature;
            $this.clearHighLight();
            $this.addHighLight(feature);
        }
        //高亮显示重置并居中
        $this.hightLightFit = function (feature) {
            $this.hightLight(feature);
            $this.fit();
        }

        //单独显示搜索图层 add by luxiaolin
        $this.hightLightSearch = function (feature) {
            if (feature.type != 'Feature' && feature.type != 'FeatureCollection') {
                feature = feature.toGeoJSON();
            }
            $this.ContainerSearch.addData(feature);
        }

        //移除高亮对象
        $this.remove = function () {
            for (var i = 0; i < $this.map.HighLightContainer.length; i++) {
                if ($this.map.HighLightContainer[i] === $this) {
                    $this.map.HighLightContainer = $this.map.HighLightContainer.slice(0, i).concat($this.map.HighLightContainer.slice(i + 1, $this.map.HighLightContainer.length));
                }
            }
            $this.map.removeLayer($this.Container);
            $this.map = null;
            $this.Container = null;
        }
    }
})(jQuery);

//图形绘制 2017-9-6 胡庆杰
//一个地图对象只可以有一个绘制对象,新创建的对象赋值给map.ex_draw属性
(function ($) {
    ktw.DrawType = {
        Point: "Point",//点
        PointI: "PointI",//点
        Polyline: "Polyline",//线
        Polygon: "Polygon",//多边形
        Circle: "Circle",//圆形
        Square: "Square",//正方形
        Rectangle: "Rectangle"//矩形
    };
    ktw.Draw = function (map, drawType) {
        if (!map) map = ktw.App.Map;
        if (map.ex_drawcount > 0) throw new Error("全局只能存在一个绘制对象!");
        map.ex_drawcount = 1;
        var $this = this;
        map.ex_draw = $this;
        $this.target = $($this);
        $this.map = map;
        $this.drawType = ktw.DrawType.Polygon;//默认绘制多边形
        if (drawType) $this.drawType = drawType;
        $this.Container = new L.layerGroup().addTo(map);//绘制容器
        //$this.Container.setZIndex(9999999);//设置为最顶层
        $this.options = {
            weight: 1,
            color: '#ff0000',
            stroke: true,
            lineJoin: 'round'
        }
        $this.optionp = {
            weight: 1,
            color: '#ff0000',
            fill: true,
            fillColor: '#ffffff',
            fillOpacity: 0.3,
            zIndex: 500
        }
        $this.optionc = {
            weight: 1,
            color: '#ff0000',
            fill: true,
            fillColor: '#ffffff',
            fillOpacity: 0.3
        }
        $this.init = function () {
            $this.mark = null;//绘制的点
            $this.circle = null;//绘制的圆
            $this.polyLine = new L.Polyline([], $this.options);//绘制的线
            $this.polygon = L.polygon([], $this.optionp);//绘制的多边形
            $this.latlng = [];//坐标容器
            $this.isDraw = false;//表示是否在画圆
            $this.startLatLng = null;//画圆的起点
            $this.circle = null;//圆
            $this.rectangle = null;//矩形
            //整个绘制过程由三个事件完成
            $this.map.off('click', $this.drawGraph);
            $this.map.off('dblclick', $this.removeEvent);
            $this.map.off('mousemove', $this.mouseMoveEvent);
        }
        $this.init();
        $this.start = function (drawType) {  
            $this.target.triggerHandler("onDrawStart", drawType);
            $this.Container.clearLayers();
            //$this.Container.bringToFront();
            if (!ktw.IsNull(drawType)) {
                $this.drawType = drawType;
            }
            switch ($this.drawType) {
                case ktw.DrawType.Point:
                case ktw.DrawType.Polyline:
                case ktw.DrawType.Polygon:
                case ktw.DrawType.Circle:
                case ktw.DrawType.Rectangle:
                    {
                        map.on('click', $this.drawGraph);
                        map.on('dblclick', $this.removeEvent);
                        break;
                    }
                case ktw.DrawType.PointI:
                    {
                        map.on('click', $this.drawGraph);
                        map.on('dblclick', $this.removeEvent);
                        break;
                    }
            }
        }
        $this.drawGraph = function (e) {
            var mousePosition = new L.LatLng(e.latlng.lat, e.latlng.lng);
            if ($this.drawType === ktw.DrawType.Point) {
                var marker = L.marker(mousePosition).addTo($this.Container);
                //对于点绘制,只执行一次
                $this.map.off('click', $this.drawGraph);
                $this.target.triggerHandler("onDrawCompleted", { $this: $this, event: e, obj: marker });
            }
            else if ($this.drawType === ktw.DrawType.PointI) {
                $this.Container.clearLayers();//清除上一次符号
                var marker = L.marker(mousePosition).addTo($this.Container);
               //对于识别点绘制,要执行多次              
             //   $this.map.off('click', $this.drawGraph);
                $this.target.triggerHandler("onDrawCompleted", { $this: $this, event: e, obj: marker });
              
            }
            else if ($this.drawType === ktw.DrawType.Polyline) {
                $this.latlng.push(e.latlng);
                $this.polyLine.addLatLng(e.latlng);
                $this.map.on('mousemove', $this.mouseMoveEvent);
            }
            else if ($this.drawType === ktw.DrawType.Polygon) {
                $this.latlng.push(e.latlng);
                $this.map.on('mousemove', $this.mouseMoveEvent);
            } else if ($this.drawType === ktw.DrawType.Circle) {
                if (!$this.isDraw) {
                    //开始绘制
                    $this.isDraw = true;
                    $this.startLatLng = e.latlng;
                    $this.map.on('mousemove', $this.mouseMoveEvent);
                } else {
                    //停止绘制
                    $this.isDraw = false;
                    $this.map.off('click', $this.drawGraph);
                    $this.map.off('mousemove', $this.mouseMoveEvent);
                    $this.target.triggerHandler("onDrawCompleted", { $this: $this, event: e, obj: $this.circle });
                    $this.circle = undefined;
                }
            } else if ($this.drawType === ktw.DrawType.Rectangle) {
                if (!$this.isDraw) {
                    //开始绘制
                    $this.isDraw = true;
                    $this.startLatLng = e.latlng;
                    $this.map.on('mousemove', $this.mouseMoveEvent);
                } else {
                    //停止绘制
                    $this.isDraw = false;
                    $this.map.off('click', $this.drawGraph);
                    $this.map.off('mousemove', $this.mouseMoveEvent);
                    $this.target.triggerHandler("onDrawCompleted", { $this: $this, event: e, obj: $this.rectangle });
                    $this.Rectangle = undefined;
                }
            }
        }
        //双击结束绘制
        $this.removeEvent = function (e) {
            $this.map.doubleClickZoom.disable();
            if ($this.drawType == ktw.DrawType.Polyline) {
                $this.map.off('click', $this.drawGraph);
                $this.map.off('mousemove', $this.mouseMoveEvent);
                $this.polyLine = L.polyline([]);
                $this.latlng = [];
                $this.target.triggerHandler("onDrawCompleted", { $this: $this, event: e, obj: $this.polyLine });
            }
            else if ($this.drawType == ktw.DrawType.Polygon) {
                $this.map.off('click', $this.drawGraph);
                $this.map.off('mousemove', $this.mouseMoveEvent);
                var polygon = $this.polygon;
                $this.polygon = L.polygon([], $this.optionp);
                $this.latlng = [];
                $this.target.triggerHandler("onDrawCompleted", { $this: $this, event: e, obj: polygon });
            }
            $this.map.dragging.enable();
        }
        //鼠标移动绘制
        $this.mouseMoveEvent = function (e) {
            $this.latlng.push(e.latlng);
            if ($this.drawType == ktw.DrawType.Polyline) {
                if ($this.polyLine) {
                    $this.Container.removeLayer($this.polyLine);
                }
                $this.polyLine = new L.Polyline($this.latlng, $this.options);
                $this.Container.addLayer($this.polyLine);
                $this.latlng.pop();
            }
            else if ($this.drawType === ktw.DrawType.Polygon) {
                if ($this.polygon) {
                    $this.Container.removeLayer($this.polygon);
                }
                $this.polygon = L.polygon($this.latlng, $this.optionp);
                $this.Container.addLayer($this.polygon);
                $this.latlng.pop();
            }
            else if ($this.drawType === ktw.DrawType.Circle) {
                if ($this.isDraw) {
                    if (!$this.circle) {
                        $this.circle = new L.Circle($this.startLatLng, $this.startLatLng.distanceTo(e.latlng), $this.optionc);
                        $this.Container.addLayer($this.circle);
                    } else {
                        $this.circle.setRadius($this.startLatLng.distanceTo(e.latlng));
                    }
                }
            }
            else if ($this.drawType === ktw.DrawType.Rectangle) {
                if ($this.isDraw) {
                    if (!$this.rectangle) {
                        var bounds = L.latLngBounds($this.startLatLng, e.latlng);
                        $this.rectangle = L.rectangle(bounds, $this.optionc);
                        $this.Container.addLayer($this.rectangle);
                    } else {
                        var bounds = L.latLngBounds($this.startLatLng, e.latlng);
                        $this.rectangle.setBounds(bounds);
                        $this.rectangle.bringToFront();
                    }
                }
            }
        }
        //清除绘制痕迹
        $this.clear = function () {
            $this.Container.clearLayers();
            $this.init();
        }
        //绑定事件
        $this.bind = function () {
            $this.target.bind.apply($this.target, arguments);
        }
        //解除绑定事件
        $this.unbind = function () {
            $this.target.unbind.apply($this.target, arguments);
        }
    }
})(jQuery);

//查询工具方法 2017-9-7 胡庆杰
(function ($) {
    ktw.WFSQ = function (param) {
        var option = {};
        if (ktw.IsNull(param)
            || ktw.IsNull(param.url)
            || ktw.IsNull(param.typename)) throw new Error("查询参数缺少必要信息！");
        option.url = param.url;
        option.typename = param.typename;
        if (!param.successFunc) param.successFunc = function () { }
        else param.successFunc = param.successFunc;
        if (!param.failFunc) param.failFunc = function () { }
        else param.failFunc = param.failFunc;
        if (ktw.IsNumber(param.startIndex)) option.startIndex = param.startIndex;
        if (ktw.IsNumber(param.count)) option.count = param.count;
        if (!ktw.IsNull(param.srsName)) option.srsName = param.srsName;
        if (!ktw.IsNull(param.where)) option.where = param.where;
        if (!ktw.IsNull(param.propertyName)) option.propertyName = param.propertyName;
        if (!ktw.IsNull(param.sortBy)) option.sortBy = param.sortBy;
        if (!ktw.IsNull(param.outputFormat)) option.outputFormat = param.outputFormat;
        if (ktw.IsNumber(param.maxFeatures)) option.maxFeatures = param.maxFeatures;
        if (ktw.IsBoolean(param.returnGeometry)) option.returnGeometry = param.returnGeometry;
        if (!ktw.IsNull(param.version)) option.version = param.version;
        if (!ktw.IsNull(param.geometry)) option.geometry = param.geometry;
        if (!ktw.IsNull(param.crs)) option.crs = param.crs;

        var queryPram = new L.QueryParameter.WfsQueryParameter(option);
        var queryTack = new L.QueryTask(queryPram);
        queryTack.execute(param.successFunc, param.failFunc);
    }
})(jQuery);

/**
 * 地图坐标显示控件
 * 坐标显示，支持自定义扩展信息显示
 * 吴良锋 2017-9-8
 */
(function ($) {
    ktw.MousePosition = L.Control.extend({
        /*
         *公开属性配置对象：options
         */
        options: {
            /*
             * 控件显示的位置
             * 可选值：['topleft'|'topright'|'bottomleft'|'bottomright']
            **/
            position: 'bottomright',

            /*
             * 前缀，例如：'('
            **/
            prefix: '',

            /*
             * 分隔符，默认逗号分隔
            **/
            separator: ' ,',

            /*
             * 后缀，例如：')'
            **/
            suffix: '',

            /*
             * 小数精度，默认为小数点后6位
            **/
            toFix: 6,

            /* 
             * 是否互换经纬度坐标
            **/
            xyReverse: false,

            /* TODO
             * 是否显示单位
            **/
            showUnit: false,

            /*
             * 透明度
            **/
            opacity: 1,

            /*
             * 背景色
            **/
            backgroundColor: '#2F374C',

            /*
             * 字体颜色
            **/
            fontColor: '#33FF99',

            /*
             * 字体大小
            **/
            fontSize: 20,

            /*
             * 自定义样式，此属性优先级比以上设置控件样式的低
            **/
            cssText: ''
        },
        initialize: function (options) {
            L.Util.extend(this.options, options);
        },
        includes: L.Mixin.Events,
        onAdd: function (map) {
            this._lastlatlng = null; //记录鼠标移出时的坐标
            this._map = map;
            this._container = L.DomUtil.create('div', 'ktw-control-mouseposition');

            this._container.style.cssText = this.options.cssText;
            this._container.style.color = this.options.fontColor;
            this._container.style.fontSize = this.options.fontSize + 'px';
            this._container.style.backgroundColor = this.options.backgroundColor;
            this._container.style.opacity = this.options.opacity;

            //默认显示地图中心点
            this._container.innerHTML = this._textFormatter(this._map.getCenter());

            this._map.on('mousemove', this._setPositions, this);
            this._map.on('mouseout', this._resetPositions, this);

            return this._container;
        },
        _setPositions: function (e) {
            var mousePoint = new L.LatLng(e.latlng.lat, e.latlng.lng);
            this._container.innerHTML = this._textFormatter(mousePoint);
        },
        _resetPositions: function (e) {
            this._lastlatlng = new L.LatLng(e.latlng.lat, e.latlng.lng);
            this._container.innerHTML = this._textFormatter(this._lastlatlng);
        },
        _textFormatter: function (point) {
            var digits = parseInt(this.options.toFix);
            var pos = this.options.xyReverse ?
                       L.Util.formatNum(point.lng, digits) + this.options.separator + L.Util.formatNum(point.lat, digits) :
                       L.Util.formatNum(point.lat, digits) + this.options.separator + L.Util.formatNum(point.lng, digits);
            return this.options.prefix + pos + this.options.suffix;
        }
    });
})(jQuery);

/**
 * 地图图例控件
 * 支持按照颜色、形状（点、线、面）显示地图图例
 * 吴良锋 2017-9-9
 */
(function ($) {
    ktw.MapLegend = L.Control.extend({

        /*
         *公开属性配置对象：options
         */
        options: {
            /*
             * 控件显示的位置
             * 可选值：['topleft'|'topright'|'bottomleft'|'bottomright']
            **/
            position: 'bottomright',

            /*
             * 图例标题
            **/
            title: '标题1',

            /*
             * 标题样式
            **/
            titleStyle: {
                /*
                 * 标题水平停靠方式
                 * 可选值：['left'|'center'|'right']
                **/
                align: 'left',

                /*
                 * 标题字体颜色
                **/
                color: 'black',

                /*
                 * 图例标题水平停靠方式
                 * 同 CSS 'font-weight'用法  
                **/
                fontWeight: 'normal',

                /*
                 * 图例标题水平停靠方式
                **/
                fontSize: 13
            },

            /*
             * 是否阻止控件与地图的交互（穿透控件拖动地图）
             * boolean
            **/
            stopInteractive: true,

            /*
             * 图层要素类型
             * 可选值：['point'|'polyline'|'polygon']
            **/
            geometryType: 'polygon',

            /*
            * 图例数据源
            **/
            itemSource: [{
                /*
                * 类别显示文本
                **/
                text: '区域1',

                /*
                * 图形类型，同'geometryType'用法，其优先级比'geometryType'高
                * 用来支持在同一图例中用图形区分，暂支持点线面
                **/
                subType: null,

                /*
                * 图形填充色，当图形类型为'poline'时无用
                **/
                fillColor: '#2F374C',

                /*
                * 图形填充透明度，当图形类型为'poline'时无用
                **/
                fillOpacity: 0.5,

                /*
                * 图形边框色
                **/
                borderColor: '#33FF99',

                /*
                * 图形边框透明度
                **/
                borderOpacity: 1
            }],

            /*
             * 控件透明度
            **/
            opacity: 1,

            /*
             * 控件背景色
            **/
            backgroundColor: '#eef6f9',

            /*
             * 控件边框色
            **/
            borderColor: '#808080',

            /*
             * 控件边框宽度
            **/
            borderWidth: 1,

            /*
             * 字体颜色
            **/
            fontColor: '#333',

            /*
             * 字体大小
            **/
            fontSize: 15,

            /*
             * 自定义样式，此属性优先级比以上设置控件样式的低
            **/
            cssText: '',

            /*
             * 是否可见
             **/
            visible: true
        },
        initialize: function (options) {

            L.Util.extend(this.options, options);
        },
        includes: L.Mixin.Events,
        onAdd: function (map) {
            this._map = map;
            this._container = L.DomUtil.create('div', 'ktw-control-maplegend');
            this._container.style.cssText = this.options.cssText;
            this._container.style.color = this.options.fontColor;
            this._container.style.fontSize = this.options.fontSize + 'px';
            this._container.style.backgroundColor = this.options.backgroundColor;
            this._container.style.opacity = this.options.opacity;
            this._container.style.borderColor = this.options.borderColor;
            this._container.style.borderWidth = this.options.borderWidth;
            this._container.style.display = this.options.visible ? "block" : "none";

            //标题
            this._header = L.DomUtil.create('div', 'legend-title');
            this._header.innerHTML = this.options.title;
            this._container.style.textAlign = this.options.titleStyle.align;
            this._container.style.color = this.options.titleStyle.color;
            this._container.style.fontWeight = this.options.titleStyle.fontWeight;
            this._container.style.fontSize = this.options.titleStyle.fontSize;
            this._container.appendChild(this._header);

            //数据面板
            this._dataPanel = L.DomUtil.create('div', 'legend-dataPanel');
            this._drawToPanel(this._dataPanel);
            this._container.appendChild(this._dataPanel);

            //扩展方法
            L.Util.extend(this, {
                setTitle: function (title) {
                    this.options.title = title;
                    this._settitle(title, this._header);
                },
                getTitle: function () {
                    return _gettitle(this._header);
                },
                setData: function (data) {
                    this.options.itemSource = data;
                    this._dataPanel.innerHTML = '';
                    this._drawToPanel(this._dataPanel);
                },
                getData: function () {
                    return this.options.itemSource;
                }
            });

            if (this.options.stopInteractive) {
                L.DomEvent.disableClickPropagation(this._container);
                L.DomEvent.disableScrollPropagation(this._container);
            }
            return this._container;
        },
        _drawToPanel: function (panel) {
            if (!L.Util.isArray(this.options.itemSource) || !panel) return;
            for (var i = 0; i < this.options.itemSource.length; i++) {
                var item = this.options.itemSource[i];
                var geoType = item.subType || this.options.geometryType;
                var rowdiv = L.DomUtil.create('div', 'legendRow');


                var symbolIcon = L.DomUtil.create('div', 'rowIcon-' + geoType);
                var fillRgb = this._colorRGB(item.fillColor);
                var borderRgb = this._colorRGB(item.borderColor);
                if (geoType == 'point') {
                    symbolIcon = L.DomUtil.create('div', 'rowIcon-point');
                    symbolIcon.style.backgroundColor = 'rgba(' + fillRgb[0] + ', ' + fillRgb[1] + ', ' + fillRgb[2] + ', ' + (fillRgb[3] || item.fillOpacity) + ')';
                } else if (geoType == 'polyline') {
                    symbolIcon = L.DomUtil.create('div', 'rowIcon-polyline');
                }
                else if (geoType == 'polygon') {
                    symbolIcon = L.DomUtil.create('div', 'rowIcon-polygon');
                    symbolIcon.style.backgroundColor = 'rgba(' + fillRgb[0] + ', ' + fillRgb[1] + ', ' + fillRgb[2] + ', ' + (fillRgb[3] || item.fillOpacity) + ')';
                }

                symbolIcon.style.borderColor = 'rgba(' + borderRgb[0] + ', ' + borderRgb[1] + ', ' + borderRgb[2] + ', ' + (fillRgb[3] || item.borderOpacity) + ')';

                var textSpan = L.DomUtil.create('span', '');
                textSpan.innerHTML = item.text;
                rowdiv.appendChild(symbolIcon);
                rowdiv.appendChild(textSpan);

                panel.appendChild(rowdiv);
            }
            return panel;
        },
        _settitle: function (title, header) {
            header.innerHTML = title;
        },
        _gettitle: function (header) {
            return header.innerHTML;
        },
        _colorRGB: function (color) {
            /*16进制颜色转为RGB格式*/
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();
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
            } else if (/^(rgb|rgba)/.test(sColor)) {
                var aColor = sColor.replace(/rgba/g, '').replace(/rgb/g, '').replace(/\(/g, '').replace(/\)/g, '').split(",");
                var sColorChange = [];
                for (var j = 0; j < aColor.length; j++) {
                    sColorChange.push(parseFloat(aColor[j].trim()));
                }
                return sColorChange;
            }
        },
        //控制显示或隐藏
        setVisible: function (isvisible) {
            isvisible = !!isvisible;
            this._container.style.display = isvisible ? "block" : "none";
        }
    });

})(jQuery);

/**
 * 地图弹框基础组件
 * 胡庆杰 2017-9-9
 */
(function () {
    ktw.CommonOverLay = L.Popup.extend({
        options: {
            maxWidth: null,
            minWidth: 50,
            maxHeight: null,
            autoPan: true,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            offset: [26, 0],
            keepInView: false,
            closeButton: true,
            autoClose: false,
            className: '',
            closeOnClick: false,
            zoomAnimation: true
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
            this._animated = L.Browser.any3d && this.options.zoomAnimation;
        },
        _initLayout: function () {
            var prefix = 'leaflet-popup',
        container = this._container =
                $("<div class='" + prefix + ' ' + (this.options.className || '') +
        " leaflet-zoom-animated'></div>")[0];
            this._contentNode = $("<div></div>")[0];
            $(container).append(this._contentNode);
            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);
        },
        _updateLayout: function () {
            var container = this._container,
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
        _adjustPan: function () {

        },
        _animateZoom: function (e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
                anchor = this._getAnchor();
            L.DomUtil.setPosition(this._container, pos.add(anchor));
        },
        _onCloseButtonClick: function (e) {
            this._close();
            if (!ktw.IsNull(e)) L.DomEvent.stop(e);
        },
        _close: function () {
            $(this._container).remove();
        },
        _updateContent: function () {
            if (!this._content) { return; }

            var node = this._contentNode;
            var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

            if (typeof content === 'string') {
                node.innerHTML = content;
            } else {
                while (node.hasChildNodes()) {
                    node.removeChild(node.firstChild);
                }
                node.appendChild(content);
            }
        }
    });
})(jQuery);
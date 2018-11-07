(function ($) {
    window.ktw = window.ktw || {};
    ktw.App = ktw.App || {};
    var appmana = ktw.appmana = ktw.appmana || {};
    function GetRootPath() {
        var pathName = window.document.location.pathname;
        var localhost = window.location.host;
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return ("http://" + localhost + projectName + "/");
    }
    function GetServerPath() {
        if (ktw.appmana.Config.SystemTheme.IsDebug !== "false") {
            return ktw.GetSystemUrlByRelID("SysService");
        } else {
            return ktw.appmana.Root;
        }
    };
    appmana.alert = function (msg) {
        var d = dialog({
            title: "提示",
            content: msg,
            okValue: '确定',
            ok: function () { d.close().remove(); return false; }
        });
        d.showModal();
    }
    appmana.tip = function (msg) {
        var d = dialog({ content: msg });
        d.showModal();
        setTimeout(function () {
            d.close().remove();
        }, 500);
    }

    appmana.refreshApp = function (path) {
        this.path = this.path || path;
        $.ajax({
            url: this.path + "?" + new Date().getTime(),
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
                ktw.App.Config = appmana.Config = $.xml2json(xml);
            }
        });
    }
    appmana.init = function (path) {
        if (ktw.IsNull(this.Config)) {
            appmana.refreshApp(path);
            ktw.App.Root = this.Root = GetRootPath();
            ktw.App.ServerUrl = this.ServerUrl = GetServerPath();
        }
    }

    //根据菜单(可以是Subsystem、Menu、Widget)的id获取到菜单对象
    appmana.getMenubyid = function (id) {
        appmana.refreshApp();
        var subsystems = this.Config.SystemTheme.SubSystems;
        subsystems = subsystems.length ? subsystems : [subsystems];
        for (var i = 0; i < subsystems.length; i++) {
            if (subsystems.ID == id) {
                return subsystems[i];
            }
            if (subsystems[i].Menus) {
                subsystems[i].Menus = subsystems[i].Menus.length ? subsystems[i].Menus : [subsystems[i].Menus];
                for (var j = 0; j < subsystems[i].Menus.length; j++) {
                    if (subsystems[i].Menus[j].ID == id) {
                        return subsystems[i].Menus[j];
                    }
                    if (subsystems[i].Menus[j].Widgets) {
                        subsystems[i].Menus[j].Widgets = subsystems[i].Menus[j].Widgets.length ? subsystems[i].Menus[j].Widgets : [subsystems[i].Menus[j].Widgets];
                        for (var k = 0; k < subsystems[i].Menus[j].Widgets.length; k++) {
                            if (subsystems[i].Menus[j].Widgets[k].ID == id) {
                                return subsystems[i].Menus[j].Widgets[k];
                            }
                        }
                    }
                }
            }
        }
    }

    //修改主题
    appmana.updateTheme = function (arg, successCall, failCall) {
        var paths = ["/App/SystemTheme/AreaCode", "/App/SystemTheme/AreaName"];
        var values = [arg.AreaCode, arg.AreaName];
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall(res);
                }
            }
        });
    }

    appmana.updateTheme.validate = function (arg) {
        if (ktw.IsNull(arg) || ktw.IsNull(arg.AreaCode) || ktw.IsNull(arg.AreaName)) {
            appmana.alert("设置主题的内容不能为空");
            return false;
        }
        if (!/^\d{6}$/.test(arg.AreaCode)) {
            appmana.alert("行政区划代码为6位数字,如：430300表示湘潭市");
            return false;
        }
        return true;
    }

    //修改Widget
    appmana.updateWidget = function (id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/../Title");
        values.push(arg.Title);

        paths.push("/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/../Url");
        values.push(arg.Url);

        paths.push("/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/../IsVisible");
        values.push(arg.IsVisible);

        paths.push("/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/../Parameters");
        values.push(arg.Parameters);

        var flag = true;
        //首先删除这个widget的Parameters参数
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/delete",
            async: false,
            data: { path: "/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/../Parameters", onlyone: true },
            success: function (res) { },
            error: function () {
                flag = false;
                console.error("判断请求widget参数出错:");
                console.error(arguments);
                appmana.alert("判断请求widget参数出错!");
            }
        });
        $.ajax({
            type: "post",
            data: { path: "/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/..", name: "Parameters", value: arg.Parameters, onlyone: true },
            async: false,
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (!res.success) {
                    appmana.alert("添加Parameters节点失败,检查语法问题!");
                    flag = false;
                }
            },
            error: function (res) {
                flag = false;
                appmana.alert("添加Parameters节点失败,检查网络问题!");
            }
        });
        if (!flag) { return; }
        $.ajax({
            type: "post",
            data: { path: "/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/..", path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateWidget.validate = function (curMenu, id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Title) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.IsVisible)) {
            appmana.alert("设置widget的ID、名称、地址、是否可见均不能为空!");
            return false;
        }
        if (!/^true|false$/.test(arg.IsVisible)) {
            appmana.alert("是否可见必须是真或假!");
            return false;
        }
        try {
            if (!ktw.IsNull(arg.Parameters)) {
                $.xml2json(arg.Parameters);
            }
        } catch (e) {
            console.error("参数校验失败:");
            console.error(e);
            appmana.alert("参数校验失败!");
        }
        if (arg.ID != id) {
            var ids = [];
            if (curMenu != null) {
                curMenu.Widgets = curMenu.Widgets || [];
                for (var i = 0; i < curMenu.Widgets.length; i++) {
                    ids.push(curMenu.Widgets[i]["ID"]);
                }
                if (ids.indexOf(id) > -1) {
                    appmana.alert("ID唯一!");
                    return false;
                }
            }
        }
        return true;
    }

    //添加Widget
    appmana.addWidget = function (id, arg, successCall, failCall) {
        var path = "/App/SystemTheme/SubSystems/Menus/ID[text()='" + id + "']/..";
        var name = "Widgets";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addWidget.validate = function (curMenu, id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Title) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.IsVisible)) {
            appmana.alert("设置widget的ID、名称、地址、是否可见均不能为空!");
            return false;
        }
        if (!/^true|false$/.test(arg.IsVisible)) {
            appmana.alert("是否可见必须是真或假!");
            return false;
        }
        //重复widget校验
        var flag = true;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/select",
            async: false,
            data: { path: "/App/SystemTheme/SubSystems//Widgets/ID[text()='" + arg.ID + "']/.." },
            success: function (res) {
                if (res.success && res.data && res.data.length) {
                    flag = false;
                    appmana.alert("widget的ID必须唯一!");
                }
            },
            error: function () {
                console.error("widget的ID必须唯一:");
                console.error(arguments);
                flag = false;
            }
        });
        if (!flag) {
            return false;
        }
        return true;
    }

    //删除Widget
    appmana.deleteWidget = function (id, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemTheme/SubSystems//Widgets/ID[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteWidget.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的菜单id不能为空!");
            return false;
        }
        return true;
    }

    //更新Menu
    appmana.updateMenu = function (id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/SystemTheme/SubSystems/Menus/ID[text()='" + id + "']/../Title");
        values.push(arg.Title);

        paths.push("/App/SystemTheme/SubSystems/Menus/ID[text()='" + id + "']/../IsVisible");
        values.push(arg.IsVisible);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (successCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateMenu.validate = function (id, arg) {
        if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Title) || ktw.IsNull(arg.IsVisible)) {
            appmana.alert("设置菜单的ID、名称、图片、排序号、是否可见均不能为空!");
            return false;
        }
        if (!/^true|false$/.test(arg.IsVisible)) {
            appmana.alert("是否可见必须是真或假!");
            return false;
        }
        return true;
    }

    //地址管理

    //添加BasicUris
    appmana.addBasicUris = function (arg, successCall, failCall) {
        var path = "/App/SystemUri";
        var name = "BasicUris";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.addBasicUris.validate = function (arg) {
        if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Uri)) {
            appmana.alert("新增加的基础地址的主键、地址均不能为空!");
            return false;
        }
        if (/["'<>%;)(&+]/.test(arg.ID) && /["'<>%;)(&+]/.test(arg.Uri)) {
            appmana.alert("内容不能有特殊字符!");
            return false;
        }
        //做地址唯一判断
        var flag = true;
        $.ajax({
            url: ktw.App.ServerUrl + "confmana/select",
            type: "post",
            async: false,
            data: { path: "/App/SystemUri/BasicUris/ID[text()='" + arg.ID + "']/.." },
            success: function (res) {
                if (res.success && res.data && res.data.length > 0) {
                    flag = false;
                    appmana.alert("基础地址ID重复!");
                }
            },
            error: function () {
                appmana.alert("验证基础地址是否唯一出错!");
                flag = false;
            }
        });
        if (!flag) return false;
        return true;
    }

    //删除基础地址
    appmana.deleteBasicUris = function (id, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemUri/BasicUris/ID[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.deleteBasicUris.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的基础地址id不能为空!");
            return false;
        }
        //判断是否被相对地址引用
        var flag = true;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/select",
            data: { path: "/App/SystemUri/RelativeUris/BasicID[text()='" + id + "']/.." },
            async: false,
            success: function (res) {
                if (res.success && res.data && res.data.length > 0) {
                    flag = false;
                    appmana.alert("存在引用该基础地址的相对地址,请先删除引用的相对地址!");
                }
            },
            error: function () {
                console.error(arguments);
                flag = false;
                appmana.alert("验证是否可删除基础地址出错!");
            }
        });
        if (!flag) return false;
        return true;
    }

    //根据基础地址的id获取到基础地址对象
    appmana.getBasicUrisbyid = function (id) {
        appmana.refreshApp();
        var BasicUris = this.Config.SystemUri.BasicUris;
        BasicUris = BasicUris.length ? BasicUris : [BasicUris];
        for (var i = 0; i < BasicUris.length; i++) {
            if (BasicUris[i].ID == id) {
                return BasicUris[i];
            }
        }
    }

    //修改基础地址
    appmana.updateBasicUris = function (id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/SystemUri/BasicUris/ID[text()='" + id + "']/../Uri");
        values.push(arg.Uri);

        paths.push("/App/SystemUri/BasicUris/ID[text()='" + id + "']/../ID");
        values.push(arg.ID);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.updateBasicUris.validate = function (id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Uri)) {
            appmana.alert("设置基础地址的主键、地址均不能为空!");
            return false;
        }
        if (/["'<>%;)(&+]/.test(arg.ID) && /["'<>%;)(&+]/.test(arg.Uri)) {
            appmana.alert("内容不能有特殊字符!");
            return false;
        }
        return true;
    }

    //添加RelativeUris
    appmana.addRelativeUris = function (arg, successCall, failCall) {
        var path = "/App/SystemUri";
        var name = "RelativeUris";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.addRelativeUris.validate = function (arg) {
        if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Uri) || ktw.IsNull(arg.BasicID)) {
            appmana.alert("设置相对地址的主键、相对地址、基础地址均不能为空!");
            return false;
        }
        if (/["'<>%;)(&+]/.test(arg.ID) && /["'<>%;)(&+]/.test(arg.Uri) && /["'<>%;)(&+]/.test(arg.BasicID)) {
            appmana.alert("内容不能有特殊字符!");
            return false;
        }
        //做地址唯一判断
        var flag = true;
        $.ajax({
            url: ktw.App.ServerUrl + "confmana/select",
            type: "post",
            async: false,
            data: { path: "/App/SystemUri/RelativeUris/ID[text()='" + arg.ID + "']/.." },
            success: function (res) {
                if (res.success && res.data && res.data.length > 0) {
                    flag = false;
                    appmana.alert("相对地址ID重复!");
                }
            },
            error: function () {
                appmana.alert("验证相对地址是否唯一出错!");
                flag = false;
            }
        });
        if (!flag) return false;
        return true;
    }

    //根据相对地址的id获取到相对地址对象
    appmana.getRelativeUrisbyid = function (id) {
        appmana.refreshApp();
        var RelativeUris = this.Config.SystemUri.RelativeUris;
        RelativeUris = RelativeUris.length ? RelativeUris : [RelativeUris];
        for (var i = 0; i < RelativeUris.length; i++) {
            if (RelativeUris[i].ID == id) {
                return RelativeUris[i];
            }
        }
    }

    //修改相对地址
    appmana.updateRelativeUris = function (id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/SystemUri/RelativeUris/ID[text()='" + id + "']/../ID");
        values.push(arg.ID);

        paths.push("/App/SystemUri/RelativeUris/ID[text()='" + id + "']/../Uri");
        values.push(arg.Uri);

        paths.push("/App/SystemUri/RelativeUris/ID[text()='" + id + "']/../BasicID");
        values.push(arg.BasicID);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.updateRelativeUris.validate = function (id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Uri) || ktw.IsNull(arg.BasicID)) {
            appmana.alert("设置菜单的主键、相对地址、基础地址均不能为空!");
            return false;
        }
        if (/["'<>%;)(&+]/.test(arg.ID) && /["'<>%;)(&+]/.test(arg.Uri) && /["'<>%;)(&+]/.test(arg.BasicID)) {
            appmana.alert("内容不能有特殊字符!");
            return false;
        }
        return true;
    }

    //删除相对地址
    appmana.deleteRelativeUris = function (id, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemUri/RelativeUris/ID[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.deleteRelativeUris.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的相对地址id不能为空!");
            return false;
        }
        return true;
    }


    //底图配置
    //根据菜单(底图配置)的id获取到菜单对象
    appmana.Swibyid = function (id) {
        appmana.refreshApp();
        var subsystems = this.Config.SystemMap.MapSwitchInfo.SwitchMaps;
        SwitchMaps = SwitchMaps.length ? SwitchMaps : [SwitchMaps];
        for (var i = 0; i < SwitchMaps.length; i++) {
            if (SwitchMaps[i].ID == id) {
                return SwitchMaps[i];
            }
        }
    }

    appmana.getBasbyid = function (id) {
        appmana.refreshApp();
        var subsystems = this.Config.SystemMap.LayerInfo.BaseLayers;
        BaseLayers = BaseLayers.length ? BaseLayers : [BaseLayers];
        for (var i = 0; i < BaseLayers.length; i++) {
            if (BaseLayers[i].ID == id) {
                return BaseLayers[i];
            }
        }
    }

    //修改基本信息
    appmana.updateMapSwitchInfo = function (adddata, successCall, failCall) {
        var path = [];
        var value = [];
        path.push("/App/SystemMap/MapSwitchInfo/Margin/Top");
        value.push(adddata["Top"]);

        path.push("/App/SystemMap/MapSwitchInfo/Margin/Left");
        value.push(adddata["Left"]);

        path.push("/App/SystemMap/MapSwitchInfo/Margin/Right");
        value.push(adddata["Right"]);

        path.push("/App/SystemMap/MapSwitchInfo/Margin/Bottom");
        value.push(adddata["Bottom"]);

        path.push("/App/SystemMap/MapSwitchInfo/SwitchWidth");
        value.push(adddata["SwitchWidth"]);

        path.push("/App/SystemMap/MapSwitchInfo/SwitchHeight");
        value.push(adddata["SwitchHeight"]);

        path.push("/App/SystemMap/MapSwitchInfo/VerticalAlignment");
        value.push(adddata["VerticalAlignment"]);

        path.push("/App/SystemMap/MapSwitchInfo/HorizontalAlignment");
        value.push(adddata["HorizontalAlignment"]);

        path.push("/App/SystemMap/Zoom");
        value.push(adddata["Zoom"]);

        path.push("/App/SystemMap/MaxZoom");
        value.push(adddata["MaxZoom"]);

        path.push("/App/SystemMap/MinZoom");
        value.push(adddata["MinZoom"]);

        path.push("/App/SystemMap/Center");
        value.push(adddata["Center"]);

        path.push("/App/SystemMap/EPSG");
        value.push(adddata["EPSG"]);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(path), value: JSON.stringify(value), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall(res);
                }
            }
        });
    }
    appmana.updateMapSwitchInfo.validate = function (adddata) {
        //匹配数字
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        //0-22
        var reg2 = /(^[0-9]$)|((^1\d{1}$)|(^2([0-2]{1})$))/;
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        //匹配地图中心点	
        var reg4 = /^(\d+)(\.\d+)?(\,){1}\s*(\d+)(\.\d+)?$/;
        if (reg.test(adddata["Top"]) == false) {
            appmana.alert("上边距为数字");
            $("#basehint").html("上边距为数字");
            return false;
        }
        if (reg.test(adddata["Left"]) == false) {
            appmana.alert("左边距为数字");
            return false;
        }
        if (reg.test(adddata["Right"]) == false) {
            appmana.alert("右边距为数字");
            return false;
        }
        if (reg.test(adddata["Bottom"]) == false) {
            appmana.alert("下边距为数字");
            return false;
        }
        if (reg.test(adddata["SwitchWidth"]) == false) {
            appmana.alert("宽度为数字");
            return false;
        }
        if (reg.test(adddata["SwitchHeight"]) == false) {
            appmana.alert("高度为数字");
            return false;
        }
        if (reg3.test(adddata["EPSG"]) == false) {
            appmana.alert("坐标参考系以EPSG:+1-6位数字");
            return false;
        }
        if (reg4.test(adddata["Center"]) == false) {
            appmana.alert("地图中心点格式不正确");
            return false;
        }
        if (reg2.test(adddata["MinZoom"]) == false || reg2.test(adddata["MaxZoom"]) == false) {
            appmana.alert("最大级别和最小级别应介于0-22内");
            return false;
        }
        if (parseInt(adddata["Zoom"]) > parseInt(adddata["MaxZoom"]) || parseInt(adddata["Zoom"]) < parseInt(adddata["MinZoom"])) {
            appmana.alert("默认级别应介于最大级别和最小级别内");
            return false;
        }
        if (parseFloat(adddata["MinZoom"]) >= parseFloat(adddata["MaxZoom"])) {
            appmana.alert("最大级别应大于最小级别");
            return false;
        }
        return true;
    }


    //修改底图类型
    appmana.updateSwitchMaps = function (id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/../Order");
        values.push(arg.Order);

        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/../Text");
        values.push(arg.Text);

        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/../BackImg");
        values.push(arg.BackImg);

        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/../Type");
        values.push(arg.Type);

        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/../IsVisible");
        values.push(arg.IsVisible);


        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/../ID");
        values.push(arg.ID);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateSwitchMaps.validate = function (id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.BackImg) || ktw.IsNull(arg.Type)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        if (!/^\d+$/.test(arg.Order)) {
            appmana.alert("排序号必须是一个整数!");
            return false;
        }
        if (!/^true|false$/.test(arg.IsVisible)) {
            appmana.alert("是否可见必须是真或假!");
            return false;
        }
        if (id != arg.ID) {
            var SwitchMaps = appmana.Config.SystemMap.MapSwitchInfo.SwitchMaps || []
            for (var i = 0; i < SwitchMaps.length; i++) {
                if (SwitchMaps[i]["ID"] == arg.ID) {
                    appmana.alert("ID唯一");
                    return false;
                }
            }
        }
        return true;
    }

    //添加底图类型
    appmana.addSwitchMaps = function (arg, successCall, failCall) {
        var path = "/App/SystemMap/MapSwitchInfo";
        var name = "SwitchMaps";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addSwitchMaps.validate = function (arg) {
        appmana.refreshApp();
        if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.BackImg) || ktw.IsNull(arg.Type)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        if (!/^\d+$/.test(arg.Order)) {
            appmana.alert("排序号必须是一个整数!");
            return false;
        }
        if (!/^true|false$/.test(arg.IsVisible)) {
            appmana.alert("是否可见必须是真或假!");
            return false;
        }
        var SwitchMaps = appmana.Config.SystemMap.MapSwitchInfo.SwitchMaps || []
        for (var i = 0; i < SwitchMaps.length; i++) {
            if (SwitchMaps[i]["ID"] == arg.ID) {
                appmana.alert("底图类型的ID必须唯一!");
                return false;
            }
        }
        return true;
    }

    //删除底图类型
    appmana.deleteSwitchMaps = function (id, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemMap/MapSwitchInfo/SwitchMaps/ID[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteSwitchMaps.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的底图类型id不能为空!");
            return false;
        }
        return true;
    }

    //根据底图类型的id获取到底图类型对象
    appmana.getSwitchMapsbyid = function (id) {
        appmana.refreshApp();
        var SwitchMaps = this.Config.SystemMap.MapSwitchInfo.SwitchMaps;
        SwitchMaps = SwitchMaps.length ? SwitchMaps : [SwitchMaps];
        for (var i = 0; i < SwitchMaps.length; i++) {
            if (SwitchMaps[i].ID == id) {
                return SwitchMaps[i];
            }
        }
    }
    //根据底图配置的id获取到底图配置对象
    appmana.getBaseLayersbyid = function (id) {
        appmana.refreshApp();
        var BaseLayers = this.Config.SystemMap.LayerInfo.BaseLayers;
        BaseLayers = BaseLayers.length ? BaseLayers : [BaseLayers];
        for (var i = 0; i < BaseLayers.length; i++) {
            if (BaseLayers[i].ID == id) {
                return BaseLayers[i];
            }
        }
    }
    //修改底图配置
    appmana.updateBaseLayers = function (id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        if (arg.Type == "WMS") {
            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Name");
            values.push(arg.Name);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Visible");
            values.push(arg.Visible);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Url");
            values.push(arg.Url);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Filter");
            values.push(arg.Filter);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../TypeName");
            values.push(arg.TypeName);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Sld");
            values.push(arg.Sld);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Styles");
            values.push(arg.Styles);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Type");
            values.push(arg.Type);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../ServerType");
            values.push(arg.ServerType);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../MaxZoom");
            values.push(arg.MaxZoom);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../MinZoom");
            values.push(arg.MinZoom);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../WMSVersion");
            values.push(arg.WMSVersion);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Args");
            values.push(arg.Args);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Order");
            values.push(arg.Order);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../TypeEx");
            values.push(arg.TypeEx);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/XMin");
            values.push(arg.XMin);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/YMin");
            values.push(arg.YMin);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/XMax");
            values.push(arg.XMax);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/YMax");
            values.push(arg.YMax);
        }
        else if (arg.Type == "WMTS") {
            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Text");
            values.push(arg.Text);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Visible");
            values.push(arg.Visible);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Url");
            values.push(arg.Url);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../EPSG");
            values.push(arg.EPSG);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Args");
            values.push(arg.Args);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../TypeName");
            values.push(arg.TypeName);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Styles");
            values.push(arg.Styles);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Type");
            values.push(arg.Type);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../MaxZoom");
            values.push(arg.MaxZoom);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../MinZoom");
            values.push(arg.MinZoom);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Order");
            values.push(arg.Order);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../TypeEx");
            values.push(arg.TypeEx);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/XMin");
            values.push(arg.XMin);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/YMin");
            values.push(arg.YMin);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/XMax");
            values.push(arg.XMax);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds/YMax");
            values.push(arg.YMax);
        }
        else if (arg.Type == "Tile") {
            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Name");
            values.push(arg.Name);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Visible");
            values.push(arg.Visible);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Url");
            values.push(arg.Url);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Args");
            values.push(arg.Args);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Type");
            values.push(arg.Type);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../MaxZoom");
            values.push(arg.MaxZoom);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../MinZoom");
            values.push(arg.MinZoom);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Order");
            values.push(arg.Order);

            paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../TypeEx");
            values.push(arg.TypeEx);
        }
        var flag = true;
        //首先删除掉Bounds节点
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/delete",
            data: { path: "/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/../Bounds", onlyone: true },
            async: false,
            success: function (res) {
                if (!res.success) {
                    flag = false;
                    appmana.alert("删除Bounds节点出错!");
                    console.error("删除Bounds节点出错:");
                    console.error(arguments);
                }
            },
            error: function () {
                appmana.alert("删除Bounds节点出错!");
                console.error("删除Bounds节点出错:");
                console.error(arguments);
            }
        });
        if (!flag) return;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/add",
            async: false,
            data: { path: "/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/..", name: "Bounds", value: $.json2xml(arg.Bounds), onlyone: true },
            success: function (res) {
                if (!res.success) {
                    flag = false;
                    appmana.alert("添加Bounds节点出错!");
                    console.error("添加Bounds节点出错:");
                    console.error(arguments);
                }
            },
            error: function () {
                flag = false;
                appmana.alert("添加Bounds节点出错!");
                console.error("添加Bounds节点出错:");
                console.error(arguments);
            }
        });
        if (!flag) return;
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateBaseLayers.validate = function (id, arg) {
        //0-22
        var reg2 = /^$|(^[0-9]$)|((^1\d{1}$)|(^2([0-2]{1})$))/;
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        if (arg.Type == "WMS") {
            if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.TypeName) || ktw.IsNull(arg.Type) /*|| ktw.IsNull(arg.ServerType)*/ || ktw.IsNull(arg.Order) || ktw.IsNull(arg.TypeEx)) {
                appmana.alert("主键(ID),名称,图层地址,图层名称,图层类型,索引,影像开关不能为空!");
                return false;
            }
        }
        else if (arg.Type == "WMTS") {
            if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.EPSG) || ktw.IsNull(arg.TypeName) || ktw.IsNull(arg.Type) || ktw.IsNull(arg.Order) || ktw.IsNull(arg.TypeEx)) {
                appmana.alert("主键(ID),名称,图层地址,坐标参考系,图层名称,图层类型,索引,影像开关不能为空!");
                return false;
            }
            if (reg3.test(arg["EPSG"]) == false) {
                appmana.alert("坐标参考系以EPSG:+1-6位数字");
                return false;
            }
        }
        else if (arg.Type == "Tile") {
            if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.Type) || ktw.IsNull(arg.Order) || ktw.IsNull(arg.TypeEx)) {
                appmana.alert("主键(ID),名称,图层地址,图层类型,索引,影像开关不能为空!");
                return false;
            }
        }
        if (!/^true|false$/.test(arg.Visible)) {
            appmana.alert("可见必须是真或假!");
            return false;
        }
        if (reg2.test(arg["MinZoom"]) == false || reg2.test(arg["MaxZoom"]) == false) {
            appmana.alert("最大级别和最小级别应介于0-22内");
            return false;
        }
        if (parseFloat(arg["MinZoom"]) >= parseFloat(arg["MaxZoom"])) {
            appmana.alert("最大级别应大于最小级别");
            return false;
        }
        if (!/^\d+$/.test(arg.Order)) {
            appmana.alert("排序号必须是一个整数!");
            return false;
        }
        try {
            if (eval(arg["Args"]) instanceof Object == false && eval(arg["Args"]) != null) {
                appmana.alert("其他参数为对象类型");
                return false;
            }
        } catch (e) {
            appmana.alert("其他参数为对象类型");
            return false;
        }
        if (id != arg.ID) {
            var BaseLayers = appmana.Config.SystemMap.LayerInfo.BaseLayers || []
            for (var i = 0; i < BaseLayers.length; i++) {
                if (BaseLayers[i]["ID"] == arg.ID) {
                    appmana.alert("ID唯一");
                    return false;
                }
            }
        }
        return true;
    }

    //添加底图配置
    appmana.addBaseLayers = function (arg, successCall, failCall) {
        var path = "/App/SystemMap/LayerInfo";
        var name = "BaseLayers";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addBaseLayers.validate = function (arg) {
        //0-22
        var reg2 = /^$|(^[0-9]$)|((^1\d{1}$)|(^2([0-2]{1})$))/;
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        if (arg.Type == "WMS") {
            if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.TypeName) || ktw.IsNull(arg.Type) || ktw.IsNull(arg.ServerType) || ktw.IsNull(arg.Order) || ktw.IsNull(arg.TypeEx)) {
                appmana.alert("主键(ID),名称,图层地址,图层名称,图层类型,服务器类型,索引,影像开关不能为空!");
                return false;
            }
        }
        if (arg.Type == "WMTS") {
            if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.EPSG) || ktw.IsNull(arg.TypeName) || ktw.IsNull(arg.Type) || ktw.IsNull(arg.Order) || ktw.IsNull(arg.TypeEx)) {
                appmana.alert("主键(ID),名称,图层地址,坐标参考系,图层名称,图层类型,索引,影像开关不能为空!");
                return false;
            }
            if (reg3.test(arg["EPSG"]) == false) {
                appmana.alert("坐标参考系以EPSG:+1-6位数字");
                return false;
            }
        }
        if (arg.Type == "Tile") {
            if (ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.Url) || ktw.IsNull(arg.Type) || ktw.IsNull(arg.Order) || ktw.IsNull(arg.TypeEx)) {
                appmana.alert("主键(ID),名称,图层地址,图层类型,索引,影像开关不能为空!");
                return false;
            }
        }
        if (!/^true|false$/.test(arg.Visible)) {
            appmana.alert("是否可见必须是真或假!");
            return false;
        }
        if (reg2.test(arg["MinZoom"]) == false || reg2.test(arg["MaxZoom"]) == false) {
            appmana.alert("最大级别和最小级别应介于0-22内");
            return false;
        }
        if (parseFloat(arg["MinZoom"]) >= parseFloat(arg["MaxZoom"])) {
            appmana.alert("最大级别应大于最小级别");
            return false;
        }
        if (!/^\d+$/.test(arg.Order)) {
            appmana.alert("排序号必须是一个整数!");
            return false;
        }
        try {
            if (eval(arg["Args"]) instanceof Object == false && eval(arg["Args"]) != null) {
                appmana.alert("其他参数为对象类型");
                return false;
            }
        } catch (e) {
            appmana.alert("其他参数为对象类型");
            return false;
        }
        var BaseLayers = appmana.Config.SystemMap.LayerInfo.BaseLayers || []
        for (var i = 0; i < BaseLayers.length; i++) {
            if (BaseLayers[i]["ID"] == arg.ID) {
                appmana.alert("ID必须唯一!");
                return false;
            }
        }

        return true;
    }

    //删除底图配置
    appmana.deleteBaseLayers = function (id, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemMap/LayerInfo/BaseLayers/ID[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteBaseLayers.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的底图配置id不能为空!");
            return false;
        }
        return true;
    }

    //修改图例
    appmana.updateLegend = function (TypeEx, Text, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../SubType");
        values.push(arg.SubType);

        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../Text");
        values.push(arg.Text);

        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../Fill/Color");
        values.push(arg.Fill.Color);

        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../Fill/Opacity");
        values.push(arg.Fill.Opacity);

        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../Border/Width");
        values.push(arg.Border.Width);

        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../Border/Color");
        values.push(arg.Border.Color);

        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/../Border/Opacity");
        values.push(arg.Border.Opacity);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateLegend.validate = function (TypeEx, Text, arg) {
        appmana.refreshApp();
        if (ktw.IsNull(TypeEx) || ktw.IsNull(Text) || ktw.IsNull(arg.SubType) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Fill.Color) || ktw.IsNull(arg.Fill.Opacity) || ktw.IsNull(arg.Border.Width) || ktw.IsNull(arg.Border.Color) || ktw.IsNull(arg.Border.Opacity)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        if (Text != arg.Text) {
            var Text = [];
            var Legend = appmana.Config.SystemMap.Legend.length ? appmana.Config.SystemMap.Legend : [appmana.Config.SystemMap.Legend];
            for (var i = 0; i < Legend.length; i++) {
                if (Legend[i].TypeEx == TypeEx) {
                    var Item = Legend[i].Item.length ? Legend[i].Item : [Legend[i].Item];
                    for (var j = 0; j < Item.length; j++) {
                        Text.push(Item[j]["Text"]);
                    }
                    if (Text.indexOf(arg.Text) > -1) {
                        appmana.alert("图例名称唯一!");
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //添加图例
    appmana.addLegend = function (id, arg, successCall, failCall) {
        //首先判断是否有这种类型的全局图例
        var path = "/App/SystemMap/Legend/TypeEx[text()='" + id + "']/..";
        var flag = true;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/select",
            data: { path: path },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (!res.data || res.data.length == 0) {
                        $.ajax({
                            type: "post",
                            url: ServerUrl + "confmana/add",
                            data: { path: "/App/SystemMap", name: "Legend", value: "<TypeEx>" + id + "</TypeEx>", onlyone: true },
                            async: false,
                            success: function (res) {
                                if (!res.success) {
                                    flag = false;
                                    console.error("新增底图图例开关失败:");
                                    console.error(arguments);
                                    appmana.alert("新增底图图例开关失败!");
                                }
                            },
                            error: function () {
                                flag = false;
                                console.error("新增底图图例开关失败:");
                                console.error(arguments);
                                appmana.alert("新增底图图例开关失败!");
                            }
                        });
                    }
                } else {
                    flag = false;
                    appmana.alert("判断后台是否有底图图例开关失败!");
                }
            },
            error: function () {
                flag = false;
                console.error("判断后台是否有底图图例开关失败:");
                console.error(arguments);
                appmana.alert("判断后台是否有底图图例开关失败!");
            }
        });
        if (!flag) return;
        var name = "Item";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addLegend.validate = function (id, arg) {
        appmana.refreshApp();
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.SubType) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Fill) || ktw.IsNull(arg.Fill.Color) || ktw.IsNull(arg.Fill.Opacity) || ktw.IsNull(arg.Border) || ktw.IsNull(arg.Border.Color) || ktw.IsNull(arg.Border.Opacity) || ktw.IsNull(arg.Border.Width)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        if (!/(^1$)|(^0$)|(^0\.\d+$)/.test(arg.Fill.Opacity)) {
            appmana.alert("填充色的透明度必须是数据,并且最大值为1!");
            return false;
        }
        if (!/(^1$)|(^0$)|(^0\.\d+$)/.test(arg.Border.Opacity)) {
            appmana.alert("边框色的透明度必须是数据,并且最大值为1!");
            return false;
        }
        if (!/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/.test(arg.Fill.Color)) {
            appmana.alert("填充色的格式参照:#ffffff,或#fff");
            return false;
        }
        if (!/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/.test(arg.Border.Color)) {
            appmana.alert("填充色的格式参照:#ffffff,或#fff");
            return false;
        }
        if (!/(^0$)|(^[1-9][0-9]?$)/.test(arg.Border.Width)) {
            appmana.alert("边框的宽度必须是一个正整数!");
            return false;
        }
        var Text = [];
        if (appmana.Config.SystemMap.Legend != undefined) {
            var Legend = appmana.Config.SystemMap.Legend.length ? appmana.Config.SystemMap.Legend : [appmana.Config.SystemMap.Legend];
            for (var i = 0; i < Legend.length; i++) {
                if (Legend[i].TypeEx == id) {
                    if (Legend[i].Item == undefined) {
                        break;
                    }
                    var Item = Legend[i].Item.length ? Legend[i].Item : [Legend[i].Item];
                    for (var j = 0; j < Item.length; j++) {
                        Text.push(Item[j]["Text"]);
                    }
                    if (Text.indexOf(arg.Text) > -1) {
                        appmana.alert("图例名称唯一!");
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //删除图例
    appmana.deleteLegend = function (Text, TypeEx, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemMap/Legend/TypeEx[text()='" + TypeEx + "']/../Item/Text[text()='" + Text + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteLegend.validate = function (Text, TypeEx) {
        if (ktw.IsNull(Text) || ktw.IsNull(TypeEx)) {
            appmana.alert("删除项的标识类型和名称不能为空!");
            return false;
        }
        return true;
    }
    //根据全局图例的Text获取到图例对象
    appmana.getLegendbyid = function (Text, TypeEx) {
        appmana.refreshApp();
        var Legend = this.Config.SystemMap.Legend;
        Legend = Legend.length ? Legend : [Legend];
        for (var i = 0; i < Legend.length; i++) {
            if (Legend[i].TypeEx == TypeEx) {
                var Item = Legend[i].Item;
                Item = Item.length ? Item : [Item];
                for (var j = 0; j < Item.length; j++) {
                    if (Item[j].Text == Text) {
                        return Item[j];
                    }
                }
            }
        }
        return null;
    }

    //图层树配置
    //修改基本信息
    appmana.updateArrayOfMapLayer = function (arg, successCall, failCall) {
        var paths = ["/App/SystemMap/ArrayOfMapLayer/Default/Size/Height"];
        var values = [arg.Height];
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Size/Width");
        values.push(arg.Width);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Position/Top");
        values.push(arg.Top);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Position/Right");
        values.push(arg.Right);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Position/Left");
        values.push(arg.Left);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Position/ContentTop");
        values.push(arg.ContentTop);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Position/ContentLeft");
        values.push(arg.ContentLeft);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Default/Position/ContentRight");
        values.push(arg.ContentRight);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Size/Height");
        values.push(arg.Height2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Size/Width");
        values.push(arg.Width2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Position/Top");
        values.push(arg.Top2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Position/Right");
        values.push(arg.Right2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Position/Left");
        values.push(arg.Left2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Position/ContentTop");
        values.push(arg.ContentTop2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Position/ContentLeft");
        values.push(arg.ContentLeft2);
        paths.push("/App/SystemMap/ArrayOfMapLayer/Selected/Position/ContentRight");
        values.push(arg.ContentRight2);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall(res);
                }
            }
        });
    }

    appmana.updateArrayOfMapLayer.validate = function (adddata) {
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        if (reg.test(adddata["Height"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Width"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Top"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Right"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Left"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["ContentTop"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["ContentLeft"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["ContentRight"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }

        if (reg.test(adddata["Height2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Width2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Top2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Right2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["ContentTop2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["ContentRight2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["Left2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        if (reg.test(adddata["ContentLeft2"]) == false) {
            appmana.alert("请填写数字类型数据");
            return false;
        }
        return true;
    }

    //修改图层目录
    appmana.updateMapLayer = function (currentnode, adddata, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var path = [];
        var value = [];
        path.push(currentnode.path + "/ID");
        value.push(adddata["ID"]);

        path.push(currentnode.path + "/Text");
        value.push(adddata["Text"]);

        path.push(currentnode.path + "/Icon");
        value.push(adddata["Icon"]);

        path.push(currentnode.path + "/IconCls");
        value.push(adddata["IconCls"]);

        path.push(currentnode.path + "/Visible");
        value.push(adddata["Visible"]);

        path.push(currentnode.path + "/Open");
        value.push(adddata["Open"]);

        path.push(currentnode.path + "/Checked");
        value.push(adddata["Checked"]);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(path), value: JSON.stringify(value), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateMapLayer.validate = function (parent, curmaplayer, arg) {
        var ids = [];
        if (curmaplayer["ID"] != arg.ID) {
            var curmaplayer = Getmaplayer(parent);
        }
        if (curmaplayer.Children != null) {
            var maplayers = curmaplayer.Children.MapLayer || [];
            for (var i = 0; i < maplayers.length; i++) {
                ids.push(maplayers[i]["ID"]);
            }
        }
        if (ids.indexOf(arg.ID) > -1) {
            appmana.alert("主键唯一!");
            return false;
        }
        if (ktw.IsNull(currentnode) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Icon)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        return true;
    }

    //添加图层目录
    appmana.addMapLayer = function (id, adddata, successCall, failCall) {
        adddata.Children = "";
        var data = { path: "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/../Children", name: "MapLayer", value: $.json2xml(adddata), onlyone: true };
        if (id == "__1001__") {
            var data = { path: "/App/SystemMap/ArrayOfMapLayer", name: "MapLayer", value: $.json2xml(adddata), onlyone: true };
        }
        $.ajax({
            type: "post",
            data: data,
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addMapLayer.validate = function (id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ID) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Icon)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        //校验图层名称不能重复
        var path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + arg.ID + "']/..";
        var flag = false;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/select",
            async: false,
            data: { path: path },
            success: function (res) {
                if (res.success) {
                    if (res.data && res.data.length > 0) {
                        flag = true;
                        console.error("图层ID重复:");
                        console.error(arguments);
                        appmana.alert("图层ID重复!");
                        return;
                    }
                }
            },
            error: function () {
                console.error("判断图层ID是否重复出错:");
                console.error(arguments);
                appmana.alert("判断图层ID是否重复出错!");
                flag = true;
            }
        });
        return !flag;
    }

    //根据图层节点id获取图层对象
    appmana.getMaplayerByid = function (id) {
        var layer = null;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/select?i=" + new Date().getTime(),
            data: { path: "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/.." },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (res.data && res.data.length == 1) {
                        layer = $.xml2json(res.data[0]);
                    } else {
                        appmana.alert("发现重复的图层ID节点");
                    }
                } else {
                    appmana.alert(res.message);
                }
            },
            error: function () {
                appmana.alert("根据id获取图层节点对象出错!");
                console.error("根据id获取图层节点对象出错");
                console.error(arguments);
            }
        });
        return layer;
    }

    //根据图层节点id获取图层对象
    appmana.getMaplayerParentByid = function (id) {
        var layer = null;
        $.ajax({
            type: "post",
            url: ServerUrl + "confmana/select?i=" + new Date().getTime(),
            data: { path: "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/../../.." },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (res.data && res.data.length == 1) {
                        layer = $.xml2json(res.data[0]);
                        if (layer.ArrayOfMapLayer) {
                            layer = layer.ArrayOfMapLayer;
                        }
                    } else {
                        appmana.alert("发现重复的图层ID节点");
                    }
                } else {
                    appmana.alert(res.message);
                }
            },
            error: function () {
                appmana.alert("根据id获取图层节点对象出错!");
                console.error("根据id获取图层节点对象出错");
                console.error(arguments);
            }
        });
        return layer;
    }

    //删除图层目录
    appmana.deleteMapLayer = function (id, successCall, failCall) {
        var path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/..";
        $.ajax({
            type: "post",
            data: { path: path, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/delete",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteMapLayer.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的图层目录不能为空!");
            return false;
        }
        return true;
    }

    //添加节点
    function AddNode(currentnode, name) {
        var path = currentnode.path;
        if (name == "XMin" || name == "YMin" || name == "XMax" || name == "YMax") {
            path += "/Extent"
        }
        var adddata = {};
        var data = { path: path, name: name, value: $.json2xml(adddata), onlyone: true };
        $.ajax({
            type: "POST",
            async: false,
            data: data,
            url: ServerUrl + "confmana/add",
            success: function (data) {
                if (data.success == true) {
                } else appmana.alert('添加失败！', 'warn');
            },
            error: function (data) {
                appmana.alert('服务请求失败！', 'error');
            }
        });
    }

    //获取当前点击节点图层信息
    function Getmaplayer(node) {
        appmana.refreshApp();
        var layerid = node.id.substring(1);
        return appmana.getMaplayerByid(layerid);
    }
    //修改图层
    appmana.updateMapLayerChild = function (getmaplayer, currentnode, adddata, successCall, failCall) {
        getmaplayer = Getmaplayer(currentnode);
        var path = [];
        var value = [];

        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        switch (adddata.Type) {
            case "WMS":
                path.push(currentnode.path + "/ID");
                value.push(adddata["ID"]);

                path.push(currentnode.path + "/Text");
                value.push(adddata["Text"]);

                path.push(currentnode.path + "/Url");
                value.push("<![CDATA[" + adddata["Url"] + "]]>");

                path.push(currentnode.path + "/Visible");
                value.push(adddata["Visible"]);

                path.push(currentnode.path + "/Filter");
                value.push(adddata["Filter"]);

                path.push(currentnode.path + "/EPSG");
                value.push(adddata["EPSG"]);

                path.push(currentnode.path + "/IconCls");
                value.push(adddata["IconCls"]);

                path.push(currentnode.path + "/TypeName");
                value.push(adddata["TypeName"]);

                path.push(currentnode.path + "/Sld");
                value.push(adddata["Sld"]);

                path.push(currentnode.path + "/Styles");
                value.push(adddata["Styles"]);

                path.push(currentnode.path + "/Checked");
                value.push(adddata["Checked"]);

                path.push(currentnode.path + "/LifeCycle");
                value.push(adddata["LifeCycle"]);

                path.push(currentnode.path + "/ServerType");
                value.push(adddata["ServerType"]);

                path.push(currentnode.path + "/MaxZoom");
                value.push(adddata["MaxZoom"]);

                path.push(currentnode.path + "/MinZoom");
                value.push(adddata["MinZoom"]);

                path.push(currentnode.path + "/Args");
                value.push(adddata["Args"]);
                if (adddata.Bounds != null) {
                    path.push(currentnode.path + "/Bounds/XMin");
                    value.push(adddata.Bounds["XMin"]);

                    path.push(currentnode.path + "/Bounds/YMin");
                    value.push(adddata.Bounds["YMin"]);

                    path.push(currentnode.path + "/Bounds/XMax");
                    value.push(adddata.Bounds["XMax"]);

                    path.push(currentnode.path + "/Bounds/YMax");
                    value.push(adddata.Bounds["YMax"]);
                }

                path.push(currentnode.path + "/NoQuery");
                if ($('input:radio[name="NoQuery"]:checked').val() == "true")
                    value.push("true");
                else value.push("false");

                path.push(currentnode.path + "/GeometryName");
                value.push(adddata["GeometryName"]);

                path.push(currentnode.path + "/Key");
                value.push(adddata["Key"]);

                path.push(currentnode.path + "/DefaultQuery");
                value.push(adddata["DefaultQuery"]);

                path.push(currentnode.path + "/SearchFields");
                value.push(adddata["SearchFields"]);

                path.push(currentnode.path + "/DisplayFields");
                value.push(adddata["DisplayFields"]);

                path.push(currentnode.path + "/WFSVersion");
                value.push(adddata["WFSVersion"]);

                path.push(currentnode.path + "/WMSVersion");
                value.push(adddata["WMSVersion"]);
                break;
            case "WMTS":
                path.push(currentnode.path + "/ID");
                value.push(adddata["ID"]);

                path.push(currentnode.path + "/Text");
                value.push(adddata["Text"]);

                path.push(currentnode.path + "/Url");
                value.push("<![CDATA[" + adddata["Url"] + "]]>");

                path.push(currentnode.path + "/Visible");
                value.push(adddata["Visible"]);

                path.push(currentnode.path + "/EPSG");
                value.push(adddata["EPSG"]);

                path.push(currentnode.path + "/Args");
                value.push(adddata["Args"]);

                path.push(currentnode.path + "/TypeName");
                value.push(adddata["TypeName"]);

                path.push(currentnode.path + "/Checked");
                value.push(adddata["Checked"]);

                path.push(currentnode.path + "/MaxZoom");
                value.push(adddata["MaxZoom"]);

                path.push(currentnode.path + "/MinZoom");
                value.push(adddata["MinZoom"]);

                path.push(currentnode.path + "/Args");
                value.push(adddata["Args"]);
                if (adddata.Bounds != null) {
                    path.push(currentnode.path + "/Bounds/XMin");
                    value.push(adddata.Bounds["XMin"]);

                    path.push(currentnode.path + "/Bounds/YMin");
                    value.push(adddata.Bounds["YMin"]);

                    path.push(currentnode.path + "/Bounds/XMax");
                    value.push(adddata.Bounds["XMax"]);

                    path.push(currentnode.path + "/Bounds/YMax");
                    value.push(adddata.Bounds["YMax"]);
                }

                path.push(currentnode.path + "/IconCls");
                value.push(adddata["IconCls"]);
                break;
            case "Tile":
                path.push(currentnode.path + "/ID");
                value.push(adddata["ID"]);

                path.push(currentnode.path + "/Text");
                value.push(adddata["Text"]);

                path.push(currentnode.path + "/Url");
                value.push("<![CDATA[" + adddata["Url"] + "]]>");

                path.push(currentnode.path + "/Visible");
                value.push(adddata["Visible"]);

                path.push(currentnode.path + "/Args");
                value.push(adddata["Args"]);

                path.push(currentnode.path + "/Checked");
                value.push(adddata["Checked"]);

                path.push(currentnode.path + "/IconCls");
                value.push(adddata["IconCls"]);

                path.push(currentnode.path + "/MaxZoom");
                value.push(adddata["MaxZoom"]);

                path.push(currentnode.path + "/MinZoom");
                value.push(adddata["MinZoom"]);

                path.push(currentnode.path + "/Args");
                value.push(adddata["Args"]);
                if (adddata.Bounds != null) {
                    path.push(currentnode.path + "/Bounds/XMin");
                    value.push(adddata.Bounds["XMin"]);

                    path.push(currentnode.path + "/Bounds/YMin");
                    value.push(adddata.Bounds["YMin"]);

                    path.push(currentnode.path + "/Bounds/XMax");
                    value.push(adddata.Bounds["XMax"]);

                    path.push(currentnode.path + "/Bounds/YMax");
                    value.push(adddata.Bounds["YMax"]);
                }
                break;
            default: break;
        }
        var data = { path: JSON.stringify(path), value: JSON.stringify(value), onlyone: true };
        $.ajax({
            type: "post",
            data: data,
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateMapLayerChild.validate = function (parent, currentnode, adddata) {
        //匹配数字
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        //0-22
        var reg2 = /^$|(^[0-9]$)|((^1\d{1}$)|(^2([0-2]{1})$))/;
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        switch (adddata.Type) {
            case "WMS": if (ktw.IsNull(adddata) || ktw.IsNull(adddata["ID"]) || ktw.IsNull(adddata["Text"]) || ktw.IsNull(adddata["Visible"]) || ktw.IsNull(adddata["Url"]) || ktw.IsNull(adddata["EPSG"]) || ktw.IsNull(adddata["TypeName"]) || ktw.IsNull(adddata["IconCls"]) || ktw.IsNull(adddata["ServerType"])) {
                appmana.alert("不能为空!");
                return false;
            }
                if (reg3.test(adddata["EPSG"]) == false) {
                    appmana.alert("主键、名称、图层地址、是否可见、坐标参考系、图层名称、图标样式、服务器类型不能为空!");
                    return false;
                }
                if (adddata["NoQuery"] != "true") {
                    if (ktw.IsNull(adddata["GeometryName"]) || ktw.IsNull(adddata["Key"]) || ktw.IsNull(adddata["DefaultQuery"]) || ktw.IsNull(adddata["SearchFields"]) || ktw.IsNull(adddata["DisplayFields"])) {
                        appmana.alert("查询主键、几何字段、默认查询、查询字段、字段名不能为空!");
                        return false;
                    }
                }
                break;
            case "WMTS": if (ktw.IsNull(adddata) || ktw.IsNull(adddata["ID"]) || ktw.IsNull(adddata["Text"]) || ktw.IsNull(adddata["Visible"]) || ktw.IsNull(adddata["Url"]) || ktw.IsNull(adddata["EPSG"]) || ktw.IsNull(adddata["IconCls"])) {
                appmana.alert("主键、名称、图层地址、是否可见、坐标参考系、图层名称、图标样式不能为空!");
                return false;
            }
                if (reg3.test(adddata["EPSG"]) == false) {
                    appmana.alert("坐标参考系以EPSG:+1-6位数字");
                    return false;
                }
                break;
            case "Tile": if (ktw.IsNull(adddata) || ktw.IsNull(adddata["ID"]) || ktw.IsNull(adddata["Text"]) || ktw.IsNull(adddata["Visible"]) || ktw.IsNull(adddata["Url"]) || ktw.IsNull(adddata["IconCls"])) {
                appmana.alert("主键、名称、是否可见、图层名称、图标样式不能为空!");
                return false;
            }
                break;
            default: break;
        }
        if (reg2.test(adddata["MinZoom"]) == false || reg2.test(adddata["MaxZoom"]) == false) {
            appmana.alert("最大级别和最小级别应介于0-22内");
            return false;
        }
        if (parseFloat(adddata["MinZoom"]) >= parseFloat(adddata["MaxZoom"])) {
            appmana.alert("最大级别应大于最小级别");
            return false;
        }
        if (reg.test(adddata.Bounds["XMin"]) == false) {
            appmana.alert("XMin为数字");
            return false;
        }
        if (reg.test(adddata.Bounds["YMin"]) == false) {
            appmana.alert("YMin为数字");
            return false;
        }
        if (reg.test(adddata.Bounds["XMax"]) == false) {
            appmana.alert("XMax为数字");
            return false;
        }
        if (reg.test(adddata.Bounds["YMax"]) == false) {
            appmana.alert("YMax为数字");
            return false;
        }
        try {
            if ($.trim(adddata["Args"]) != "") {
                if (eval("("+adddata["Args"]+")") instanceof Object == false && eval(adddata["Args"]) != null) {
                    appmana.alert("其他参数为对象类型");
                    return false;
                }
            }            
        } catch (e) {
            appmana.alert("其他参数为对象类型");
            return false;
        }
        //验证图层id唯一,图层ID是不允许修改值
        /*var _path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + adddata.ID + "']/..";
        var b = true;
        $.ajax({
            type: "post",
            data: { path: _path },
            url: ktw.App.ServerUrl + "confmana/select",
            async: false,
            success: function (res) {
                if (res.success && res.data.length == 0) {
                    b = false;
                }
            },
            error: function (res) {
                console.error("验证图层唯一出错!");
                console.error(res);
            }
        });
        if (b) {
            appmana.alert("同目录下图层主键唯一!");
            return false;
        }*/
        return true;
    }

    //添加图层
    appmana.addMapLayerChild = function (currentnode, arg, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        if (currentnode.text == "图层树配置") {
            var data = { path: currentnode.path, name: "MapLayer", value: $.json2xml(arg), onlyone: true };
        }
        else {
            var data = { path: currentnode.path + "/Children", name: "MapLayer", value: $.json2xml(arg), onlyone: true };
        }
        $.ajax({
            type: "post",
            data: data,
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addMapLayerChild.validate = function (curmaplayer, currentnode, adddata) {
        //匹配数字
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        //0-22
        var reg2 = /^$|(^[0-9]$)|((^1\d{1}$)|(^2([0-2]{1})$))/;
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        switch (adddata.Type) {
            case "WMS":
                {
                    if (ktw.IsNull(adddata) || ktw.IsNull(adddata["ID"]) || ktw.IsNull(adddata["Text"]) || ktw.IsNull(adddata["Visible"]) || ktw.IsNull(adddata["Url"]) || ktw.IsNull(adddata["EPSG"]) || ktw.IsNull(adddata["TypeName"]) || ktw.IsNull(adddata["IconCls"]) || ktw.IsNull(adddata["ServerType"])) {
                        appmana.alert("主键、名称、图层地址、是否可见、坐标参考系、图层名称、图标样式、服务器类型不能为空!");
                        return false;
                    }
                    if (reg3.test(adddata["EPSG"]) == false) {
                        appmana.alert("坐标参考系以EPSG:+1-6位数字");
                        return false;
                    }
                    if (adddata["NoQuery"] == "false") {
                        if ((!adddata["Filter"]) || (!adddata["Key"]) || (!adddata["GeometryName"]) || (!adddata["SearchFields2"])) {
                            appmana.alert("支持查询的wms图层必须填写图层的主键、查询字段、几何字段、显示字段!");
                            return false;
                        }
                    }
                    break;
                }
            case "WMTS":
                {
                    if (ktw.IsNull(adddata) || ktw.IsNull(adddata["ID"]) || ktw.IsNull(adddata["Text"]) || ktw.IsNull(adddata["Visible"]) || ktw.IsNull(adddata["Url"]) || ktw.IsNull(adddata["TypeName"]) || ktw.IsNull(adddata["EPSG"]) || ktw.IsNull(adddata["IconCls"])) {
                        appmana.alert("主键、名称、图层地址、是否可见、坐标参考系、图层名称、图标样式不能为空!");
                        return false;
                    }
                    if (reg3.test(adddata["EPSG"]) == false) {
                        appmana.alert("坐标参考系以EPSG:+1-6位数字");
                        return false;
                    }
                    break;
                }
            case "Tile":
                {
                    if (ktw.IsNull(adddata) || ktw.IsNull(adddata["ID"]) || ktw.IsNull(adddata["Text"]) || ktw.IsNull(adddata["Visible"]) || ktw.IsNull(adddata["Url"]) || ktw.IsNull(adddata["IconCls"])) {
                        appmana.alert("主键、名称、是否可见、图层名称、图标样式不能为空!");
                        return false;
                    }
                    break;
                }
            default: break;
        }
        if (reg2.test(adddata["MinZoom"]) == false || reg2.test(adddata["MaxZoom"]) == false) {
            appmana.alert("最大级别和最小级别应介于0-22内");
            return false;
        }
        if (parseFloat(adddata["MinZoom"]) >= parseFloat(adddata["MaxZoom"])) {
            appmana.alert("最大级别应大于最小级别");
            return false;
        }
        if (reg.test(adddata.Bounds["XMin"]) == false) {
            appmana.alert("XMin为数字");
            return false;
        }
        if (reg.test(adddata.Bounds["YMin"]) == false) {
            appmana.alert("YMin为数字");
            return false;
        }
        if (reg.test(adddata.Bounds["XMax"]) == false) {
            appmana.alert("XMax为数字");
            return false;
        }
        if (reg.test(adddata.Bounds["YMax"]) == false) {
            appmana.alert("YMax为数字");
            return false;
        }
        try {
            if (eval(adddata["Args"]) instanceof Object == false && eval(adddata["Args"]) != null) {
                appmana.alert("其他参数为对象类型");
                return false;
            }
        } catch (e) {
            appmana.alert("其他参数为对象类型");
            return false;
        }
        var ids = []
        if (curmaplayer.Children != null) {
            var maplayers = curmaplayer.Children.MapLayer || [];
            for (var i = 0; i < maplayers.length; i++) {
                ids.push(maplayers[i]["ID"]);
            }
        }
        if (ids.indexOf(adddata.ID) > -1) {
            appmana.alert("同目录下图层主键唯一!");
            return false;
        }
        return true;
    }

    //删除图层
    appmana.deleteMapLayerChild = function (id, successCall, failCall) {
        var paths = [];
        paths.push("/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteMapLayerChild.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除的图层id不能为空!");
            return false;
        }
        return true;
    }
    //移动图层
    appmana.moveLayer = function (srcid, destid, successCall, failCall) {
        var items = ["/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + srcid + "']/.."];
        var path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + destid + "']/../Children";
        if (destid == "_1001__") {
            path = "/App/SystemMap/ArrayOfMapLayer";
        }

        if (destid != "_1001__") {
            var b = false;
            $.ajax({
                type: "post",
                url: ktw.App.ServerUrl + "confmana/select",
                data: { path: path },
                async: false,
                success: function (res) {
                    if (res.success && res.data.length == 1) {
                        b = true;
                    }
                }
            });
            if (!b) {
                $.ajax({
                    type: "post",
                    url: ktw.App.ServerUrl + "confmana/add",
                    data: { path: ppath, name: "Children", value: "", onlyone: true },
                    async: false,
                    success: function (res) {
                        if (res.success) {
                            b = true;
                        }
                    }
                });
            }
            if (!b) {
                console.log("移动节点失败(正式移动之前)!");
                return failCall();
            }
        }
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/move",
            data: { path: path, items: JSON.stringify(items), onlyone: true },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        })
    }
    appmana.moveLayer.validate = function (srcid, destid) {
        if (ktw.IsNull(srcid)) {
            appmana.alert("要移动的原节点ID不能为空!");
            return false;
        }
        if (ktw.IsNull(destid)) {
            appmana.alert("要移动的目标节点ID不能为空!");
            return false;
        }
        return true;
    }

    //添加图层图例
    appmana.addmLegend = function (currentnode, arg, successCall, failCall) {
        var id = currentnode.id.substring(1);
        var path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/../Legend";
        var name = "Item";
        var value = $.json2xml(arg);
        var layer = ktw.appmana.getMaplayerByid(id);
        if (layer.Legend == undefined) {
            path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + id + "']/..";
            name = "Legend";
            value = "<Item>" + value + "</Item>";;
        }
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.addmLegend.validate = function (curmaplayer, currentnode, arg) {
        if (ktw.IsNull(currentnode) || ktw.IsNull(arg) || ktw.IsNull(arg.SubType) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Fill) || ktw.IsNull(arg.Fill.Color) || ktw.IsNull(arg.Fill.Opacity) || ktw.IsNull(arg.Border) || ktw.IsNull(arg.Border.Color) || ktw.IsNull(arg.Border.Opacity) || ktw.IsNull(arg.Border.Width)) {
            appmana.alert("设置的内容均不能为空!");
            return false;
        }
        if (curmaplayer.Legend != null) {
            var Text = [];
            curmaplayer.Legend.Item = curmaplayer.Legend.Item || [];
            curmaplayer.Legend.Item = curmaplayer.Legend.Item.length ? curmaplayer.Legend.Item : [curmaplayer.Legend.Item];
            for (var i = 0; i < curmaplayer.Legend.Item.length; i++) {
                Text.push(curmaplayer.Legend.Item[i].Text);
            }
            if (Text.indexOf(arg.Text) > -1) {
                appmana.alert("同一图层下图例名称唯一!");
                return false;
            }
        }
        return true;
    }

    //修改图层图例
    appmana.updatemLegend = function (currentnode, id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../SubType");
        values.push(arg.SubType);

        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../Fill/Color");
        values.push(arg.Fill.Color);

        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../Fill/Opacity");
        values.push(arg.Fill.Opacity);

        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../Border/Width");
        values.push(arg.Border.Width);

        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../Border/Color");
        values.push(arg.Border.Color);

        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../Border/Opacity");
        values.push(arg.Border.Opacity);

        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/../Text");
        values.push(arg.Text);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updatemLegend.validate = function (curmaplayer, id, arg) {
        appmana.refreshApp();
        if (ktw.IsNull(id) || ktw.IsNull(arg.SubType) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Fill.Color) || ktw.IsNull(arg.Fill.Opacity) || ktw.IsNull(arg.Border.Width) || ktw.IsNull(arg.Border.Color) || ktw.IsNull(arg.Border.Opacity)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        if (id != arg.Text && curmaplayer.Legend != null) {
            var Text = [];
            curmaplayer.Legend.Item = curmaplayer.Legend.Item || [];
            curmaplayer.Legend.Item = curmaplayer.Legend.Item.length ? curmaplayer.Legend.Item : [curmaplayer.Legend.Item];
            for (var i = 0; i < curmaplayer.Legend.Item.length; i++) {
                Text.push(curmaplayer.Legend.Item[i].Text);
            }
            if (Text.indexOf(arg.Text) > -1) {
                appmana.alert("同一图层下图例名称唯一!");
                return false;
            }
        }
        return true;
    }
    //删除图层图例
    appmana.deletemLegend = function (currentnode, id, successCall, failCall) {
        var paths = [];
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        paths.push(currentnode.path + "/Legend/Item/Text[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.deletemLegend.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除数据的字段名不能为空!");
            return false;
        }
        return true;
    }
    //根据图例名称获取图层图例对象
    appmana.getmLegendbyid = function (curmaplayer, id) {
        if (curmaplayer.Legend != null) {
            curmaplayer.Legend.Item = curmaplayer.Legend.Item || [];
            curmaplayer.Legend.Item = curmaplayer.Legend.Item.length ? curmaplayer.Legend.Item : [curmaplayer.Legend.Item];
            for (var i = 0; i < curmaplayer.Legend.Item.length; i++) {
                if (curmaplayer.Legend.Item[i].Text == id) {
                    return curmaplayer.Legend.Item[i];
                }
            }
        }
    }
    //添加表格数据DetailFields-Field
    appmana.addField = function (currentnode, arg, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var path = currentnode.path + "/DetailFields";
        var name = "Field";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addField.validate = function (curmaplayer, currentnode, arg) {
        if (ktw.IsNull(currentnode) || ktw.IsNull(arg) || ktw.IsNull(arg.ByName) || ktw.IsNull(arg.Name)) {
            appmana.alert("设置的内容均不能为空!");
            return false;
        }
        if (curmaplayer.DetailFields != null) {
            var ByName = [];
            curmaplayer.DetailFields.Field = curmaplayer.DetailFields.Field || [];
            curmaplayer.DetailFields.Field = curmaplayer.DetailFields.Field.length ? curmaplayer.DetailFields.Field : [curmaplayer.DetailFields.Field];
            for (var i = 0; i < curmaplayer.DetailFields.Field.length; i++) {
                ByName.push(curmaplayer.DetailFields.Field[i].ByName);
            }
            if (ByName.indexOf(arg.ByName) > -1) {
                appmana.alert("字段名唯一!");
                return false;
            }
        }
        return true;
    }

    //批量初始化表格数据DetailFields-Field
    appmana.addFieldBatch = function (currentnode, arg, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var path = currentnode.path + "/DetailFields";
        var name = "Field";
        var value = "";
        for (var i = 0; i < arg.length; i++) {
            value += $.json2xml(arg[i]);
        }
        $.ajax({
            type: "post",
            data: { path: path },
            url: ktw.App.ServerUrl + "confmana/select",
            async: false,
            success: function (res) {
                if (res.success && res.data.length == 0) {
                    $.ajax({
                        type: "post",
                        url: ktw.App.ServerUrl + "confmana/add",
                        async: false,
                        data: { path: currentnode.path, name: "DetailFields", value: "", onlyone: true }
                    });
                }
            }
        });
        $.ajax({
            type: "post",
            data: { path: path, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/update",
            async: false,
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    //删除表格数据DetailFields-Field
    appmana.deleteField = function (currentnode, byname, successCall, failCall) {
        var paths = [];
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        paths.push(currentnode.path + "/DetailFields/Field/ByName[text()='" + byname + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteField.validate = function (byname) {
        if (ktw.IsNull(byname)) {
            appmana.alert("删除数据的字段名不能为空!");
            return false;
        }
        return true;
    }

    //更新表格数据DetailFields-Field
    appmana.updateField = function (currentnode, keyStr, dataModel, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var value = $.json2xml(dataModel);
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/update",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + keyStr + "']/..", value: value, onlyone: true },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.updateField.validate = function (currentnode, keyStr, dataModel) {
        if (ktw.IsNull(keyStr) || ktw.IsNull(dataModel) || ktw.IsNull(dataModel.ByName)) {
            appmana.alert("更新数据的字段名不能为空!");
            return false;
        }
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var b = true;
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/select",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + keyStr + "']" },
            async: false,
            success: function (res) {
                if (!res.success || res.data.length != 1) {
                    b = false;
                    console.error(res);
                }
            },
            error: function (res) {
                b = false;
                console.error(res);
            }
        });
        if (!b) {
            appmana.alert("找不到要更新的字段(" + keyStr + ")!");
            return false;
        }
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/select",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + dataModel.ByName + "']" },
            async: false,
            success: function (res) {
                if (res.success && res.data.length >= 2) {
                    b = false;
                }
                if (!res.success) {
                    b = false;
                }
            },
            error: function (res) {
                b = false;
                console.error(res);
            }
        });
        if (!b) {
            appmana.alert("已经存在d多个将要更新了的字段名(" + dataModel.ByName + ")!");
            return false;
        }
        return true;
    }

    //排序表格数据DetailFields-Field-升序
    appmana.orderFieldASC = function (currentnode, currentByname, lastByname, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var ppath = currentnode.path + "/DetailFields";
        var item = [];
        item.push(currentnode.path + "/DetailFields/Field/ByName[text()='" + currentByname + "']/..");
        item.push(currentnode.path + "/DetailFields/Field/ByName[text()='" + lastByname + "']/..");
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/order",
            data: { path: ppath, items: JSON.stringify(item) },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.orderFieldASC.validate = function (currentnode, currentByname, lastByname) {
        if (ktw.IsNull(currentByname) || ktw.IsNull(lastByname)) {
            appmana.alert("排序数据的字段名不能为空!");
            return false;
        }
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var b = true;
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/select",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + currentByname + "']" },
            async: false,
            success: function (res) {
                if (!res.success || res.data.length != 1) {
                    b = false;
                    console.error(res);
                }
            },
            error: function (res) {
                b = false;
                console.error(res);
            }
        });
        if (!b) {
            appmana.alert("找不到要排序的字段(" + currentByname + ")!");
            return false;
        }
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/select",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + lastByname + "']" },
            async: false,
            success: function (res) {
                if (!res.success || res.data.length != 1) {
                    b = false;
                    console.error(res);
                }
            },
            error: function (res) {
                b = false;
                console.error(res);
            }
        });
        if (!b) {
            appmana.alert("找不到要排序的字段(" + lastByname + ")!");
            return false;
        }
        return true;
    }

    //排序表格数据DetailFields-Field-降序
    appmana.orderFieldDESC = function (currentnode, currentByname, nextByname, successCall, failCall) {
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var ppath = currentnode.path + "/DetailFields";
        var item = [];
        item.push(currentnode.path + "/DetailFields/Field/ByName[text()='" + nextByname + "']/..");
        item.push(currentnode.path + "/DetailFields/Field/ByName[text()='" + currentByname + "']/..");
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/order",
            data: { path: ppath, items: JSON.stringify(item) },
            async: false,
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }
    appmana.orderFieldDESC.validate = function (currentnode, currentByname, nextByname) {
        if (ktw.IsNull(currentByname) || ktw.IsNull(nextByname)) {
            appmana.alert("排序数据的字段名不能为空!");
            return false;
        }
        currentnode.path = "/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='" + currentnode.id.substring(1) + "']/..";
        var b = true;
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/select",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + currentByname + "']" },
            async: false,
            success: function (res) {
                if (!res.success || res.data.length != 1) {
                    b = false;
                    console.error(res);
                }
            },
            error: function (res) {
                b = false;
                console.error(res);
            }
        });
        if (!b) {
            appmana.alert("找不到要排序的字段(" + currentByname + ")!");
            return false;
        }
        $.ajax({
            type: "post",
            url: ktw.App.ServerUrl + "confmana/select",
            data: { path: currentnode.path + "/DetailFields/Field/ByName[text()='" + nextByname + "']" },
            async: false,
            success: function (res) {
                if (!res.success || res.data.length != 1) {
                    b = false;
                    console.error(res);
                }
            },
            error: function (res) {
                b = false;
                console.error(res);
            }
        });
        if (!b) {
            appmana.alert("找不到要排序的字段(" + nextByname + ")!");
            return false;
        }
        return true;
    }

    //同级树节点拖动
    appmana.orderMapLayer = function (parent, successCall, failCall) {
        var items = [];
        var childrens = parent.children;;
        for (var i = 0; i < childrens.length; i++) {
            items.push(childrens[i].path);
        }
        var data = { path: parent.path + "/Children", items: JSON.stringify(items) }
        $.ajax({
            type: "POST",
            data: data,
            url: ServerUrl + "confmana/order",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        })
    }

    //土地生命周期
    //修改图层
    appmana.updateRef = function (curnode, adddata, successCall, failCall) {
        var paths = curnode.path.split("/");
        var path = [];
        var value = [];
        path.push("/App/Extend/LifeCycle/" + paths[0] + "/Layer/Ref");
        value.push(adddata)
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(path), value: JSON.stringify(value), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall(res);
                }
            }
        });
    }
    appmana.updateRef.validate = function (adddata) {
        //匹配数字
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        //0-22
        var reg2 = /(^[0-9]$)|((^1\d{1}$)|(^2([0-2]{1})$))/;
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        //匹配地图中心点	
        var reg4 = /^(\d+)(\.\d+)?(\,){1}\s*(\d+)(\.\d+)?$/;
        if (reg.test(adddata["Top"]) == false) {
            appmana.alert("上边距为数字");
            $("#basehint").html("上边距为数字");
            return false;
        }
        if (reg.test(adddata["Left"]) == false) {
            appmana.alert("左边距为数字");
            return false;
        }
        if (reg.test(adddata["Right"]) == false) {
            appmana.alert("右边距为数字");
            return false;
        }
        if (reg.test(adddata["Bottom"]) == false) {
            appmana.alert("下边距为数字");
            return false;
        }
        if (reg.test(adddata["SwitchWidth"]) == false) {
            appmana.alert("宽度为数字");
            return false;
        }
        if (reg.test(adddata["SwitchHeight"]) == false) {
            appmana.alert("高度为数字");
            return false;
        }
        if (reg3.test(adddata["EPSG"]) == false) {
            appmana.alert("坐标参考系以EPSG:+1-6位数字");
            return false;
        }
        if (reg4.test(adddata["Center"]) == false) {
            appmana.alert("地图中心点格式不正确");
            return false;
        }
        if (reg2.test(adddata["MinZoom"]) == false || reg2.test(adddata["MaxZoom"]) == false) {
            appmana.alert("最大级别和最小级别应介于0-22内");
            return false;
        }
        if (parseInt(adddata["Zoom"]) > parseInt(adddata["MaxZoom"]) || parseInt(adddata["Zoom"]) < parseInt(adddata["MinZoom"])) {
            appmana.alert("默认级别应介于最大级别和最小级别内");
            return false;
        }
        if (parseFloat(adddata["MinZoom"]) > parseFloat(adddata["MaxZoom"])) {
            appmana.alert("最大级别应大于等于最小级别");
            return false;
        }
        return true;
    }

    //修改提示表格信息
    appmana.updatePanelFields = function (curnode, arg, id, successCall, failCall) {
        var paths = [];
        var values = [];
        var path = curnode.path.split("/");

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../Name");
        values.push(arg.Name);

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../Type");
        values.push(arg.Type);

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../Text");
        values.push(arg.Text);

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../Width");
        values.push(arg.Width);

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../MaxWidth");
        values.push(arg.MaxWidth);

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../MinWidth");
        values.push(arg.MinWidth);

        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/../ByName");
        values.push(arg.ByName);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updatePanelFields.validate = function (curnode, id, arg) {
        if (ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ByName) || ktw.IsNull(arg.Type)) {
            appmana.alert("设置的列头名称和类型不能为空!");
            return false;
        }
        //匹配数字
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        if (reg.test(arg["Width"]) == false) {
            appmana.alert("宽度为数字");
            return false;
        }
        if (reg.test(arg["MaxWidth"]) == false) {
            appmana.alert("最大宽度为数字");
            return false;
        }
        if (reg.test(arg["MinWidth"]) == false) {
            appmana.alert("最小宽度为数字");
            return false;
        }
        if (arg.ByName != id) {
            var path = curnode.path.split("/");
            var Tips = appmana.Config.Extend.LifeCycle[path[0]].Tips;
            if (Tips.Col != null) {
                var ByName = [];
                Tips.Col = Tips.Col.length ? Tips.Col : [Tips.Col];
                for (var i = 0; i < Tips.Col.length; i++) {
                    ByName.push(Tips.Col[i].ByName);
                }
                if (ByName.indexOf(arg.ByName) > -1) {
                    appmana.alert("提示表格列头名称唯一!");
                    return false;
                }
            }
        }
        return true;
    }

    //添加提示表格信息
    appmana.addPanelFields = function (curnode, arg, successCall, failCall) {
        var path = curnode.path.split("/");
        var path = "/App/Extend/LifeCycle/" + path[0] + "/Tips";
        var name = "Col";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addPanelFields.validate = function (curnode, arg) {
        if (ktw.IsNull(arg) || ktw.IsNull(arg.ByName) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.Type) || ktw.IsNull(arg.Text) || ktw.IsNull(arg.Width) || ktw.IsNull(arg.MaxWidth) || ktw.IsNull(arg.MaxWidth)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        //匹配数字
        var reg = /^$|^(-?\d+)(\.\d+)?$/;
        if (reg.test(arg["Width"]) == false) {
            appmana.alert("宽度为数字");
            return false;
        }
        if (reg.test(arg["MaxWidth"]) == false) {
            appmana.alert("最大宽度为数字");
            return false;
        }
        if (reg.test(arg["MinWidth"]) == false) {
            appmana.alert("最小宽度为数字");
            return false;
        }
        var path = curnode.path.split("/");
        var Tips = appmana.Config.Extend.LifeCycle[path[0]].Tips;
        if (Tips.Col != null) {
            var ByName = [];
            Tips.Col = Tips.Col.length ? Tips.Col : [Tips.Col];
            for (var i = 0; i < Tips.Col.length; i++) {
                ByName.push(Tips.Col[i].ByName);
            }
            if (ByName.indexOf(arg.ByName) > -1) {
                appmana.alert("提示表格列头名称唯一!");
                return false;
            }
        }
        return true;
    }

    //删除提示表格信息
    appmana.deletePanelFields = function (curnode, id, successCall, failCall) {
        var paths = [];
        var path = curnode.path.split("/");
        paths.push("/App/Extend/LifeCycle/" + path[0] + "/Tips/Col/ByName[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deletePanelFields.validate = function (id) {
        if (ktw.IsNull(id)) {
            appmana.alert("删除项列头名称不能为空!");
            return false;
        }
        return true;
    }

    //根据提示表格的ByName获取到提示表格对象
    appmana.getColbyByName = function (curnode, id) {
        appmana.refreshApp();
        var path = curnode.path.split("/");
        var Col = this.Config.Extend.LifeCycle[path[0]].Tips.Col;
        Col = Col.length ? Col : [Col];
        for (var i = 0; i < Col.length; i++) {
            if (Col[i].ByName == id) {
                return Col[i];
            }
        }
    }

    //一键式分析
    //修改分析按钮信息
    appmana.updateBtnAnalysis = function (curnode, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/ App / Extend / Analysis / " + curnode.path + "/BtnName");
        values.push(arg["BtnName"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/Tag");
        values.push(arg["Tag"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/EPSG");
        values.push(arg["EPSG"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/GeometryName");
        values.push(arg["GeometryName"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/OWS");
        values.push(arg["OWS"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/AnalysisLayer");
        values.push(arg["AnalysisLayer"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/Ref");
        values.push(arg["Ref"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/Key");
        values.push(arg["Key"]);

        paths.push("/ App / Extend / Analysis / " + curnode.path + "/DetailFields");
        values.push(arg["DetailFields"]);

        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall(res);
                }
            }
        });
    }

    appmana.updateBtnAnalysis.validate = function (curnode, arg) {
        if (ktw.IsNull(arg) || ktw.IsNull(arg.BtnName) || ktw.IsNull(arg.Tag) || ktw.IsNull(arg.EPSG) || ktw.IsNull(arg.GeometryName) || ktw.IsNull(arg.OWS) || ktw.IsNull(arg.AnalysisLayer) || ktw.IsNull(arg.Ref) || ktw.IsNull(arg.Key)) {
            appmana.alert("设置的内容不能为空");
            return false;
        }
        //匹配坐标系
        var reg3 = /^(EPSG:)(\d){1,6}$/;
        if (reg3.test(arg["EPSG"]) == false) {
            appmana.alert("坐标参考系以EPSG:+1-6位数字");
            return false;
        }
        var name = curnode.BtnName;
        if (name != arg.BtnName) {
            var BtnAnalysis = appmana.Config.Extend.Analysis[curnode.path.split("/")[0]].BtnAnalysis;
            if (BtnAnalysis != null) {
                var BtnName = [];
                BtnAnalysis = BtnAnalysis.length ? BtnAnalysis : [BtnAnalysis];
                for (var i = 0; i < BtnAnalysis.length; i++) {
                    BtnName.push(BtnAnalysis[i].BtnName);
                }
                if (BtnName.indexOf(arg.BtnName) > -1) {
                    appmana.alert("同一目录下按钮名称唯一!");
                    return false;
                }
            }
        }
        return true;
    }

    //删除分析按钮信息
    appmana.deleteBtnAnalysis = function (node, successCall, failCall) {
        var paths = [];
        paths.push("/App/Extend/Analysis/" + node.path);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteBtnAnalysis.validate = function (node) {
        if (ktw.IsNull(node)) {
            appmana.alert("删除项不能为空!");
            return false;
        }
        return true;
    }

    //添加分析按钮信息
    appmana.addBtnAnalysis = function (curnode, arg, successCall, failCall) {
        var path = "/App/Extend/Analysis/" + curnode.path;
        var name = "BtnAnalysis";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addBtnAnalysis.validate = function (curnode, arg) {
        if (ktw.IsNull(curnode) || ktw.IsNull(arg) || ktw.IsNull(arg.BtnName)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        var BtnAnalysis = appmana.Config.Extend.Analysis[curnode.path].BtnAnalysis;
        if (BtnAnalysis != null) {
            var BtnName = [];
            BtnAnalysis = BtnAnalysis.length ? BtnAnalysis : [BtnAnalysis];
            for (var i = 0; i < BtnAnalysis.length; i++) {
                BtnName.push(BtnAnalysis[i].BtnName);
            }
            if (BtnName.indexOf(arg.BtnName) > -1) {
                appmana.alert("同一目录下按钮名称唯一!");
                return false;
            }
        }
        return true;
    }
    //修改叠加后分类
    appmana.updateStatistics = function (curnode, id, arg, successCall, failCall) {
        var paths = [];
        var values = [];
        paths.push("/App/Extend/Analysis/" + curnode.path + "/Statistics/ByName[text()='" + id + "']/../ByName");
        values.push(arg.ByName);

        paths.push("/App/Extend/Analysis/" + curnode.path + "/Statistics/ByName[text()='" + id + "']/../Name");
        values.push(arg.Name);

        paths.push("/App/Extend/Analysis/" + curnode.path + "/Statistics/ByName[text()='" + id + "']/../GroupBy");
        values.push(arg.GroupBy);
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), value: JSON.stringify(values), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/updatebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.updateStatistics.validate = function (curnode, id, arg) {
        if (ktw.IsNull(curnode) || ktw.IsNull(id) || ktw.IsNull(arg) || ktw.IsNull(arg.ByName) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.GroupBy)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        if (arg.ByName != id) {
            var BtnAnalysis = appmana.Config.Extend.Analysis[curnode.path.split("/")[0]].BtnAnalysis;
            if (BtnAnalysis != null) {
                BtnAnalysis = BtnAnalysis.length ? BtnAnalysis : [BtnAnalysis];
                for (var i = 0; i < BtnAnalysis.length; i++) {
                    if (BtnAnalysis[i]["BtnName"] == curnode.BtnName) {
                        var Statistics = BtnAnalysis[i].Statistics;
                        if (Statistics != null) {
                            Statistics = Statistics.length ? Statistics : [Statistics];
                            var ByName = [];
                            for (var j = 0; j < Statistics.length; j++) {
                                ByName.push(Statistics[j]["ByName"]);
                            }
                            if (ByName.indexOf(arg.ByName) > -1) {
                                appmana.alert("同一目录下按钮名称唯一!");
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    //添加叠加后分类
    appmana.addStatistics = function (curnode, arg, successCall, failCall) {
        var path = "/App/Extend/Analysis/" + curnode.path;
        var name = "Statistics";
        var value = $.json2xml(arg);
        $.ajax({
            type: "post",
            data: { path: path, name: name, value: value, onlyone: true },
            url: ktw.App.ServerUrl + "confmana/add",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                console.error(res);
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.addStatistics.validate = function (curnode, arg) {
        if (ktw.IsNull(curnode) || ktw.IsNull(arg) || ktw.IsNull(arg.ByName) || ktw.IsNull(arg.Name) || ktw.IsNull(arg.GroupBy)) {
            appmana.alert("设置内容均不能为空!");
            return false;
        }
        var BtnAnalysis = appmana.Config.Extend.Analysis[curnode.path.split("/")[0]].BtnAnalysis;
        if (BtnAnalysis != null) {
            BtnAnalysis = BtnAnalysis.length ? BtnAnalysis : [BtnAnalysis];
            for (var i = 0; i < BtnAnalysis.length; i++) {
                if (BtnAnalysis[i]["BtnName"] == curnode.BtnName) {
                    var Statistics = BtnAnalysis[i].Statistics;
                    if (Statistics != null) {
                        Statistics = Statistics.length ? Statistics : [Statistics];
                        var ByName = [];
                        for (var j = 0; j < Statistics.length; j++) {
                            ByName.push(Statistics[j]["ByName"]);
                        }
                        if (ByName.indexOf(arg.ByName) > -1) {
                            appmana.alert("同一目录下按钮名称唯一!");
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    //删除叠加后分类
    appmana.deleteStatistics = function (curnode, id, successCall, failCall) {
        var paths = [];
        paths.push("/App/Extend/Analysis/" + curnode.path + "/Statistics/ByName[text()='" + id + "']/..");
        $.ajax({
            type: "post",
            data: { path: JSON.stringify(paths), onlyone: true },
            url: ktw.App.ServerUrl + "confmana/deletebatch",
            success: function (res) {
                if (res.success) {
                    if (typeof (successCall) == "function") {
                        successCall();
                    }
                } else {
                    if (typeof (failCall) == "function") {
                        failCall();
                    }
                }
            },
            error: function (res) {
                if (typeof (failCall) == "function") {
                    failCall();
                }
            }
        });
    }

    appmana.deleteStatistics.validate = function (curnode, id) {
        if (ktw.IsNull(id) || ktw.IsNull(curnode)) {
            appmana.alert("删除项按钮名称不能为空!");
            return false;
        }
        return true;
    }

    //根据按钮名称获取到表格对象
    appmana.getStatisticsbyByName = function (curdata, id) {
        appmana.refreshApp();
        var Statistics = curdata.Statistics;
        Statistics = Statistics.length ? Statistics : [Statistics];
        for (var i = 0; i < Statistics.length; i++) {
            if (Statistics[i].ByName == id) {
                return Statistics[i];
            }
        }
    }
})(jQuery);
(function () {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read
        var result = key ? undefined : {};

        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        $.cookie(key, '', $.extend({}, options, { expires: -100 }));
        return !$.cookie(key);
    };
    ktw.cookie = ktw.cookie || {};
    ktw.cookie.Root = undefined;
    ktw.cookie.ServerUrl = undefined;
    ktw.cookie.init = function (path) {
        var configer = null;
        $.ajax({
            url: path ? path : "config/app.xml",
            dataType: 'xml',
            type: 'GET',
            cache: false,
            timeout: 2000,
            async: false,
            error: function () {
                console.log(arguments);
                ktw.Error("加载XML文件出错！");
            },
            success: function (xml) {
                configer = $.xml2json(xml);
            }
        });
        this.config = ktw.App.Config = configer;
        //指向html等静态页面地址,直接截取浏览器url
        this.Root = this.getRootPath();
        //指向后台服务方法地址
        //当app.xml配置项[SystemTheme->IsDebug]为true时表示开发模式可以允许this.Root和this.ServerUrl取不同的值
        //当app.xml配置项[SystemTheme->IsDebug]为false时表示正式运行模式this.ServerUrl取值来自this.Root
        this.ServerUrl = this.getServerPath();
        ktw.App = ktw.App || {};
        ktw.App.Root = this.Root;
        ktw.App.ServerUrl = this.ServerUrl;
    };
    /*获取网站根目录*/
    ktw.cookie.getRootPath = function () {
        var pathName = window.document.location.pathname;
        var localhost = window.location.host;
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return ("http://" + localhost + projectName + "/");
    };
    /*获取网站后台服务基地址*/
    ktw.cookie.getServerPath = function () {
        if (this.config.SystemTheme.IsDebug !== "false") {
            return this.getRelativeUrl("SysService");
        } else {
            return this.Root;
        }
    };
})();
(function () {
    var admin = window.ktw.admin = window.ktw.admin || {};
    //记录选中过的tab项
    var selectTabs = [];
    ktw.App.SysInit();
    var CurSysMenus = [];
    var CurChildMenus = [];
    var MenusContent = undefined;
    var CurSelectMenus = undefined;
    $(function () {
        ktw.cookie.init("../config/app.xml");
        initEvent();
        validateAdmin();
        if (ktw.App.SysConfig != undefined) {
            initMenu();
        }
    });
    function initEvent() {
        var _timer, _timer2;
        $(".login-input input").focus("focus", function () {
            var p = $(this).parent();
            $(".login-input").removeClass("login-focus");
            if (!p.hasClass("login-focus")) {
                p.addClass("login-focus");
            }
        }).blur(function () {
            var p = $(this).parent();
            p.removeClass("login-focus");
        }).filter("#username").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#userpwd").focus();
            }

        }).end().filter("#userpwd").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#btnlogin").click();
            }
        }).end().filter("#oldpwd").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#newpwd").focus();
            }
        }).end().filter("#newpwd").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#newpwd2").focus();
            }
        }).end().filter("#newpwd2").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#chgpwd").click();
            }
        });
        $("#chgpwd").click(function () {
            if (!$("#winpwd").form('enableValidation').form('validate')
            || !$("#winpwd").form('validate')) return;
            var user = {
                id: ktw.cookie.user.id,
                no: hex_md5($("#newpwd").val()),
                password: hex_md5($("#oldpwd").val())
            };
            $.ajax({
                type: "POST",
                data: JSON.stringify(user),
                contentType: "application/json",
                url: ktw.cookie.ServerUrl + "user/updatepassword",
                success: function (res) {
                    if (res.success) {
                        hidePWD();
                    }
                    else {
                        showErrorPWD(res.message);
                    }
                },
                error: function (e) {
                    showErrorPWD("密码修改失败!");
                    console.error(e);
                }
            });
        });
        $("#cacelpwd").click(function () {
            hidePWD();
        });
        function showError(msg) {
            $("#winlogin .error-msg").html(msg);
        }
        function showErrorPWD(msg) {
            $("#winpwd .error-msg").html(msg);
        }
        function showError(msg) {
            $(".error-msg").html(msg);
        }
        $("#btnlogin").click(function () {
            var name = $("#username").val();
            var pwd = $("#userpwd").val();
            if (ktw.IsNull(name)) {
                showError("请输入用户名!");
                return;
            }
            if (ktw.IsNull(pwd)) {
                showError("请输入登录密码!");
                return;
            }
            var user = { name: name, password: hex_md5(pwd) };
            $.ajax({
                type: "POST",
                data: JSON.stringify(user),
                contentType: "application/json",
                url: ktw.cookie.ServerUrl + "user/login",
                success: function (res) {
                    if (!res.success) {
                        showError(res.message);
                        return;
                    }
                    if (ktw.IsNull(res.data.photouri)) {
                        res.data.photouri = "image/authorization/default.jpg";
                    }
                    $.cookie("usertokenadmin", JSON.stringify(res.data), { expires: 1 });
                    validateAdmin();
                    hideLogin();
                },
                error: function (res) {
                    showError(res.message);
                }
            });
        });
        $(".top-user img,.info-tip").hover(function () {
            if (_timer) {
                clearTimeout(_timer);
            }
            $(".info-tip").show();
        }, function () {
            if (_timer) {
                clearTimeout(_timer);
            }
            _timer = setTimeout(function () {
                $(".info-tip").hide();
            }, 200);
        });
        $(".tab-select-icon,.tab-select-tip").hover(function () {
            if (_timer2) {
                clearTimeout(_timer2);
            }
            $(".tab-select-tip").show();
        }, function () {
            if (_timer2) {
                clearTimeout(_timer2);
            }
            _timer2 = setTimeout(function () {
                $(".tab-select-tip").hide();
            }, 100);
        });
        $("#changepwd").click(function () {
            showPWD();
        });
        $("#logout").click(function () {
            $.removeCookie("usertokenadmin");
            this.user = this.perms = null;
            window.location.reload();
        });
    }
    function showLogin() {
        $(".dia-mask,#winlogin").show();
        $("#username,#userpwd").val("");
        $("#winlogin .error-msg").html("");
        $("#username").focus();
    }
    function hideLogin() {
        $(".dia-mask,#winlogin").hide();
    }
    function showPWD() {
        $(".dia-mask,#winpwd").show();
        $("#oldpwd,#newpwd,#newpwd2").val("")
        $("#winpwd .error-msg").html("");
        $("#oldpwd").focus();
        $("#username").focus();
    }
    function hidePWD() {
        $(".dia-mask,#winpwd").hide();
    }
    function validateAdmin() {
        var u = $.cookie("usertokenadmin");
        if (ktw.IsNull(u)) {
            showLogin();
            return;
        }
        u = JSON.parse(u);
        if (u.name != "admin") {
            showLogin();
            return;
        }
        ktw.cookie.user = u;
    }
    function initMenu() {
        MenusContent = $(".lay-left");
        for (i = 0; i < ktw.App.SysConfig.Menus.length; i++) {
            if (ktw.App.SysConfig.Menus[i].IsVisible == "true") {
                CurSysMenus.push(ktw.App.SysConfig.Menus[i]);
                var menus = $('<div class="menu-group"></div>').appendTo(MenusContent);
                var isshow = ktw.App.SysConfig.Menus[i].Open == "true";
                var menustitle = $('<div class="menu-header ' + (isshow ? 'active' : '') + '"><div class="menu-header-icon ' + ktw.App.SysConfig.Menus[i].IconCls + '"></div><h4 class="menu-header-text">' + ktw.App.SysConfig.Menus[i].Title + '</h4><div class="menu-toggle-icon fa fa-chevron-down ' + (isshow ? "icon-collapse" : "icon-expand") + '"></div></div>').appendTo(menus);
                /*menustitle.find(".menu-toggle-icon").click(function () {
                    if ($(this).hasClass("icon-collapse")) {
                        $(this).removeClass("icon-collapse").addClass("icon-expand");
                        $(this).parent().parent().find(".menu-item-list").hide();
                    } else {
                        $(this).removeClass("icon-expand").addClass("icon-collapse");
                        $(this).parent().parent().find(".menu-item-list").show();
                    }
                });*/
                menustitle.click(function () {
                    if ($(this).parent().find(".menu-item-list").is(":hidden")) {
                        var item = this;
                        $(this).parent().siblings().find(".menu-header").removeClass("active");
                        $(this).parent().siblings().find(".menu-item-list").hide("normal", function () {
                            $(item).addClass("active").parent().find(".menu-item-list").show("normal");
                        });
                    } else {
                        $(this).parent().find(".menu-item-list").hide("normal");
                        $(this).parent().find(".menu-header").removeClass('active');
                    }
                });
                var menusitems = $('<div class="menu-item-list"></div>').appendTo(menus);
                if (isshow) { menusitems.show(); } else { menusitems.hide(); }
                for (j = 0; j < ktw.App.SysConfig.Menus[i].Widgets.length; j++) {
                    if (ktw.App.SysConfig.Menus[i].Widgets[j].IsVisible == "true") {
                        CurChildMenus.push(ktw.App.SysConfig.Menus[i].Widgets[j]);
                        var menuschilddiv = $('<div class="menu-item ' + (ktw.App.SysConfig.Menus[i].Widgets[j].Active ? 'active' : '') + '"></div>').appendTo(menusitems);
                        var str = '' +
                            '<div class="menu-item-content" menu-id="' + ktw.App.SysConfig.Menus[i].Widgets[j].ID + '" onclick="ktw.admin.menunav(this)" url="' + ktw.App.SysConfig.Menus[i].Widgets[j].Url + '">' +
                            '<div class="menu-item-bar"></div>' +
                                '<div class="menu-item-icon ' + ktw.App.SysConfig.Menus[i].Widgets[j].IconCls + '"></div>' +
                                '<a class="menu-item-text">' + ktw.App.SysConfig.Menus[i].Widgets[j].Title + '</a>' +
                            '</div>';
                        var content = $(str);
                        menuschilddiv.append(content);
                        content.hover(function () {
                            $(".menu-item-content").removeClass("active-bottom");
                            $(this).addClass("active-bottom");
                        }, function () {
                            $(".menu-item-content").removeClass("active-bottom");
                        }).click(function () {
                            $(".menu-item").removeClass("active");
                            $(this).parent().addClass("active");
                        });
                    }
                }

            }
        }
        //createTab("_shouye_");
        $(".lay-left").find(".menu-item.active").find(".menu-item-content").click();
    }
    admin.menunav = function (item) {
        var url = $(item).attr("url");
        $("#srcframe").attr("src", url);
        /*var text = $(item).find(".menu-item-text").text();
        var id = $(item).attr("menu-id");
        var parent = $(item).parent();
        if ($.trim(url) != "") {
            createTab(id, text, url);
        }*/

    }
    function createTab(id, text, url) {
        var tabobj = $(".lay-tab>.tab-item[nav-menu='" + id + "']");
        if (tabobj.length > 0) {
            admin.selectTab(tabobj[0]);
            return;
        }
        var html = "";
        if (id == "_shouye_") {
            text = "首&nbsp;页";
            url = "welcome.html";
            html =
           '<div class="tab-item" url="' + url + '" nav-menu="' + id + '" onclick="ktw.admin.selectTab(this)">' +
           '    <div class="tab-refresh" onclick="ktw.admin.refreshTab(this)"></div>' +
           '    <div class="tab-text">' + text + '</div>' +
           '</div>';
        } else {
            html =
           '<div class="tab-item" url="' + url + '" nav-menu="' + id + '" onclick="ktw.admin.selectTab(this)">' +
           '    <div class="tab-refresh" onclick="ktw.admin.refreshTab(this)"></div>' +
           '    <div class="tab-text">' + text + '</div>' +
           '    <div class="tab-close" onclick="ktw.admin.closeTab(this)"></div>' +
           '</div>';
        }
        var tab = $(html);
        if (id == "_shouye_") {
            $(".lay-tab").append(tab);
        } else {
            tab.insertAfter(".tab-item[nav-menu='_shouye_']");
        }
        admin.selectTab(tab[0]);
    }
    function checkWid() {
        var tabs = $('div[nav-menu]');
        tabs.css("visibility", "visible");
        if (tabs.eq(tabs.length - 1).offset().top < 70) {
            $(".tab-select-tip,.tab-select").hide();
            $(".tab-select-content").html("");
            return;
        }
        var index = tabs.length - 1;
        for (var i = tabs.length - 1; i >= 0; i--) {
            if (tabs.eq(i).offset().top < 70) {
                break;
            } else {
                index = i;
            }
        }
        $(".tab-select-content").height(0).html("");
        $(".tab-select-tip").height(16);
        for (var i = index; i <= tabs.length - 1; i++) {
            var text = tabs.eq(i).css("visibility", "hidden").find(".tab-text").html();
            $(".tab-select-content").height(parseFloat($(".tab-select-content").height()) + 30);
            $(".tab-select-tip").height(parseFloat($(".tab-select-tip").height()) + 30);
            $(".tab-select-content").append("<div class='tab-select-item' tab-menu='" + tabs.eq(i).attr("nav-menu") + "'>" + text + "</div>");
        }
        $(".tab-select-content .tab-select-item").off("click").click(function () {
            var tabid = $(this).attr("tab-menu");
            console.log(tabid);
            var item = $(".tab-item[nav-menu='" + tabid + "'");
            item.insertAfter(".tab-item[nav-menu='_shouye_']");
            admin.selectTab(item);
        });
        $(".tab-select").show();
    }
    admin.selectTab = function (item) {
        $(".tab-item").removeClass("tab-active");
        $(item).addClass("tab-active");
        var id = $(item).attr("nav-menu");
        var url = $(item).attr("url");
        var frame = $(".lay-content>iframe[menu-id='" + id + "']");
        if (frame.length == 0) {
            frame = $('<iframe style="height: 100%; width: 100%;" src="' + url + '" menu-id="' + id + '"></iframe>').appendTo($(".lay-content"));
        }
        $(".lay-content>iframe").hide();
        if (selectTabs[selectTabs.length - 1] != item) {
            for (var i = 0; i < selectTabs.length; i++) {
                if (selectTabs[i] == item) selectTabs.splice(i, 1);

            }
            selectTabs.push(item);
        }
        checkWid();
        frame.show();
    }

    admin.refreshTab = function (item) {
        var menu = $(item).parent();
        if (!menu.hasClass("tab-active")) {
            admin.selectTab(menu[0]);
        }
        if (window.event.stopPropagation) {
            window.event.stopPropagation();
        }
        if (window.event.cancelBubble) {
            window.event.cancelBubble = true;
        }
        var menuid = menu.attr("nav-menu");
        $(".lay-content>iframe[menu-id='" + menuid + "']")[0].contentWindow.location.reload();
    }

    admin.closeTab = function (item) {
        var menu = $(item).parent();
        var menuid = menu.attr("nav-menu");
        menu.remove();
        $(".lay-content>iframe[menu-id='" + menuid + "']").remove();
        for (var i = 0; i < selectTabs.length; i++) {
            if (selectTabs[i] == menu[0]) selectTabs.splice(i, 1);
        }
        admin.selectTab(selectTabs[selectTabs.length - 1]);
        if (window.event.stopPropagation) {
            window.event.stopPropagation();
        }
        if (window.event.cancelBubble) {
            window.event.cancelBubble = true;
        }
    }
})();
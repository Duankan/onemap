(function (factory) {
    if (typeof define === 'function' && define.amd) define(['jquery'], factory);
    else if (typeof exports === 'object') factory(require('jquery'));
    else factory(jQuery);
}(function ($) {
    try {
        if (!ktw) ktw = {};
    } catch (e) { ktw = {}; }

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
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

    //以下是自定义扩展内容
    try {
        $.extend($.fn.validatebox.defaults.rules, {
            number: {
                validator: function (value) {
                    return !isNaN(value);
                },
                message: '只能输入0~9之间的数字！'
            },
            chinese: {
                validator: function (value) {
                    var rec = /^[a-zA-Z0-9_]{1,}$/;
                    return rec.test(value);
                },
                message: '只能输入数字，英文字母及下划线！'
            },
            numEnglish: {
                validator: function (value) {
                    var res = value.replace(/[^\w\.\/]/ig, '');
                    return res === value ? true : false
                },
                message: '只能输入数字和字母！'
            },
            check: {
                validator: function (value) {
                    return value == $("#newcode").textbox("getText") ? true : false;
                },
                message: '请确认密码！'
            },
            deadline: {
                validator: function (value) {
                    var input = new Date(value);
                    return input > new Date();
                },
                message: '有效期至少为一天！'
            },
            birthday: {
                validator: function (value) {
                    var input = new Date(value);
                    return input < new Date();
                },
                message: '生日小于当前日期！'
            },
            idCard: {
                validator: function (value) {
                    var rec = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
                    if (rec.test(value)) return true;
                    else false;
                },
                message: '请输入正确的身份证号！'
            },
            fileSize: {  //验证文件大小调用'fileSize[4,"MB"]' 最大4MB
                validator: function (value, array) {
                    var ss = $(this).next().get(0).files[0].size;
                    var size = array[0];
                    var unit = array[1];
                    if (!size || isNaN(size) || size == 0) {
                        $.error('验证文件大小的值不能为 "' + size + '"');
                    } else if (!unit) {
                        $.error('请指定验证文件大小的单位');
                    }
                    var index = -1;
                    var unitArr = new Array("bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb");
                    for (var i = 0; i < unitArr.length; i++) {
                        if (unitArr[i] == unit.toLowerCase()) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        $.error('请指定正确的验证文件大小的单位：["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"]');
                    }
                    // 转换为bytes公式  
                    var formula = 1;
                    while (index > 0) {
                        formula = formula * 1024;
                        index--;
                    }
                    // this为页面上能看到文件名称的文本框，而非真实的file  
                    // $(this).next()是file元素  
                    _photoSizeflag = $(this).next().get(0).files[0].size < parseFloat(size) * formula;
                    ktw.cookie.showCheckMessage(_photoSizeflag);
                    return _photoSizeflag;
                },
                message: '文件大小必须小于 {0}{1}'
            }
        });
    } catch (ex) { console.error("加载jquery.cookie.js脚本出错!"); console.log(ex); }

    /*定义cookie*/
    ktw.cookie = {
        user: null,//用户信息
        perms: null,//权限信息
        messager: null,
        imguri: null,
        Root: null,
        ServerUrl: null,
        AreaTree: null
    };

    /*验证cookie*/
    ktw.cookie.validateUser = function (path) {
        if (ktw.IsNull(ktw.App.Config)) this.init(path);
        if (ktw.App) ktw.App.Config = this.config;
        var u = $.cookie("usertoken");
        if (ktw.IsNull(u)) {
            this.user = null;
            if (ktw.IsNull(this.Root)) this.Root = this.getRootPath();
            location.href = this.Root + "login.html";
        }
        else {
            this.user = JSON.parse(u);
            ktw.cookie.getPerms();
        }
    };
    /*移除cookie*/
    ktw.cookie.removeUser = function () {
        $.removeCookie("usertoken");
        this.user = this.perms = null;
        location.href = this.Root + "login.html";
    }
    /*获取是否为负责岗位*/
    ktw.cookie.getMainPost = function () {
        if (!this.hasPost()) return false;
        for (var i = 0; i < this.user.posts.length; i++) {
            //1是负责岗位，0不是负责岗位
            if (1 == this.user.posts[i].mainpost) return true;
        }
        return false;
    };
    /*获取是否为岗位负责人*/
    ktw.cookie.getPostOwner = function () {
        if (!this.hasPost()) return false;
        for (var i = 0; i < this.user.posts.length; i++) {
            //1是岗位负责人，0不是岗位负责人
            if (1 == this.user.posts[i].postowner) return true;
        }
        return false;
    };
    /*判断选择岗位与当前用户岗位是否为同一岗位*/
    ktw.cookie.containPost = function (id) {
        if (!this.hasPost()) return false;
        for (var i = 0; i < this.user.posts.length; i++) {
            if (id == this.user.posts[i].id) return true;
        }
        return false;
    };
    /*判断是否有岗位设置*/
    ktw.cookie.hasPost = function () {
        return !(ktw.IsNull(this.user) || ktw.IsNull(this.user.posts)
             || this.user.posts.length == 0);
    }
    /*获取岗位名称*/
    ktw.cookie.getPostNames = function () {
        if (!this.hasPost()) return "";
        var names = "";
        for (var i = 0; i < this.user.posts.length; i++) {
            names += this.user.posts[i].name;
            if (i < this.user.posts.length - 1) names += "/";
        }
        return names;
    }
    /*获取权限*/
    ktw.cookie.getPerms = function () {
        if (ktw.IsNull(this.user) || ktw.IsNull(this.user.id)) return;
        var $this = this;
        $.ajax({
            async: false,
            cache: false,
            dataType: "json",
            url: this.ServerUrl + "user/getperm/" + this.user.id,
            success: function (res) {
                if (res.success) {
                    $this.perms = res.data;
                } else {
                    $this.user = null;
                    if (ktw.IsNull(this.Root)) $this.Root = $this.getRootPath();
                    location.href = $this.Root + "login.html";
                }
            }
        });
    };
    /*获取头像*/
    ktw.cookie.getFace = function () {
        var name = this.user.truename, uri = this.user.photouri, th = this.config.SystemLayout.TopPanel.Height - 20;
        var str = '<div id="banner" style="position:absolute;right:0px;top:10px;width:120px;cursor:pointer;height:' + th + 'px;font-size:14px;color:#fff">';
        str += '<div id="name" style="white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;line-height:' + th + 'px;width:70px;text-align:center">' + name + '</div>';
        str += '<div id="face" style="right:10px;position:absolute;top:0px"><img id="loginFace" style="border-radius:50%;width:' + th + 'px;height: ' + th + 'px;" src="' + uri + '" /></div></div>';
        return str;
    };
    /*获取详细信息*/
    ktw.cookie.getUserDetail = function () {
        var faceUri = this.user.photouri;
        var userName = this.user.truename;
        var orgName = this.user.orgname == null ? "" : this.user.orgname;
        var postName = this.getPostNames();
        //详细信息
        var userDetail = '<div id="tips" style="width: 280px; height: 120px;line-height:20px">';
        userDetail += '<div style="float: left; width: 100px; height: 100px; background-color: #FFF;">';
        userDetail += '<div style="width: 60px; height: 70px; margin:10px auto;"><img id="imgdetail" style="border-radius:50%;width: 60px;height: 60px;" src="' + faceUri + '" /></div>';
        userDetail += '<div style="font-size: 12px; color: #999; text-align: center; width: 60px; margin: 0 auto;"><a id="btnFace" class="easyui-linkbutton" onclick="ktw.cookie.showEditImgDlg();">编辑头像</a></div>';
        userDetail += '</div>';
        userDetail += '<div style="float: left; width: 180px; height: 100px; background-color: #FFF;">';
        userDetail += '<div style="width: 180px; height: 70px; background-color: #FFF; margin: 20px auto 10px;">';
        userDetail += '<p><span style="font-size: 14px; font: bold;">' + userName + '</span><span style="font-size: 12px; padding-left: 10px;"><a id="btnSafe" class="easyui-linkbutton" onclick="ktw.cookie.showEditPwdDlg();">账户安全</a></span><a style="font-size: 12px; padding-left: 10px;" id="btnExit" class="easyui-linkbutton" onclick="ktw.cookie.removeUser();">退出</a></span></p>';
        userDetail += '<p style="font-size: 12px;"><span style="font-size: 12px;">组织机构：</span><span style="font-size: 12px;">' + orgName + '</span></p>';
        userDetail += '<p style="font-size: 12px;"><span style="font-size: 12px;">岗位：</span><span style="font-size: 12px;">' + postName + '</span></p>';
        userDetail += '</div></div></div>';
        return userDetail;
    };
    /*展示详细信息*/
    ktw.cookie.getUserTip = function () {
        $('#banner').tooltip({
            position: 'bottom',
            content: this.getUserDetail(),
            onShow: function (e) {
                var t = $(this);
                t.tooltip('tip').unbind().bind('mouseenter',
                    function () { t.tooltip('show'); }).bind('mouseleave',
                    function () { t.tooltip('hide'); });
            }
        });
        ktw.cookie.messager = $.messager;
        ktw.cookie.messager.defaults.height = 150;
        ktw.cookie.messager.defaults.width = 250;
    }
    /*添加密码修改对话框*/
    ktw.cookie.addEditDlg = function () {
        return '<div id="dlg" closed="true" class="easyui-dialog" title="修改密码" ' +
            'style="width:300px;height:180px;padding:5px" buttons="#dlg-buttons"></div>';
    }
    /*密码修改标签*/
    ktw.cookie.getEditDlg = function () {
        var stringEdit = '<form id="userEdit" method="post" style="position:absolute;top:32px;">';

        stringEdit += '<div style="position:absolute;width:80px;height:32px;line-height:32px;text-align:right;">原密码</div>';
        stringEdit += '<div style="position:absolute;width:150px;height:29px;top:3px;left:90px">';
        stringEdit += '<input id="oldcode" style="width:150px;height:26px;" class="easyui-textbox" type="password" data-options="required:true,validType:[\'numEnglish\',\'length[6,30]\'],missingMessage:\'必填项！\',invalidMessage:[\'请输入6~30个英文或数字！\']"/></div>';

        stringEdit += '<div style="position:absolute;width:80px;height:32px;line-height:32px;text-align:right;top:32px;">新密码</div>';
        stringEdit += '<div style="position:absolute;width:150px;height:29px;top:35px;left:90px">';
        stringEdit += '<input id="newcode" style="width:150px;height:26px;" class="easyui-textbox" type="password" data-options="required:true,validType:[\'numEnglish\',\'length[6,30]\'],missingMessage:\'必填项！\',invalidMessage:[\'请输入6~30个英文或数字！\']"/></div>';

        stringEdit += '<div style="position:absolute;width:80px;height:32px;line-height:32px;text-align:right;top:64px;">确认密码</div>';
        stringEdit += '<div style="position:absolute;width:150px;height:29px;top:67px;left:90px">';
        stringEdit += '<input id="confirmcode" style="width:150px;height:26px;" class="easyui-textbox" type="password" data-options="required:true,validType:[\'check\',\'length[6,30]\'],missingMessage:\'必填项！\',invalidMessage:[\'请确认密码！\']"/></div>';

        stringEdit += '</form>';

        stringEdit += '<div id="dlg-buttons">';
        stringEdit += '<a id="btnsave" class="easyui-linkbutton" iconcls="icon-ok" style="width: 60px;" onclick="ktw.cookie.saveEdit();">保存</a>';
        stringEdit += '</div>';
        return stringEdit;
    }
    /*展示修改密码对话框*/
    ktw.cookie.showEditPwdDlg = function () {
        $('#dlg').form("clear");
        $('#dlg').dialog('open').dialog('center');
    }
    /*添加头像修改对话框*/
    ktw.cookie.getEditImgDialog = function () {
        return '<div id="editImage" closed="true" class="easyui-dialog" title="修改头像"' +
            ' style="width:300px;height:220px;padding:5px;overflow:hidden" buttons="#image-buttons"></div>';
    }
    /*添加头像修改对话框*/
    ktw.cookie.getEditImg = function () {
        var uri = ktw.App.Root + this.user.photouri;
        var str = '<form id="userPhoto" method="post">';
        str += '<div style="line-height:20px;">';
        str += '<img id="imgpreview" style="width:106px;height:106px" src="' + uri + '"/>';
        str += '<div style="right:24px;position:absolute;top:50px;">1、支持PNG、GIF、BMP、</div>'
        str += '<div style="right:6px;position:absolute;top:70px;">JPG/JPEG格式，文件小于4M；</div>'
        str += '<div style="right:11px;position:absolute;top:90px;">2、上传的图片会生成小尺寸，</div>'
        str += '<div style="right:6px;position:absolute;top:110px;">请注意小尺寸的头像是否清晰。</div>'
        str += '<div style="width:108px;height:30px;">';
        str += '<div style="width:58px;height:30px;margin-top:2px;margin-left:25px;">';
        str += '<input id="choosefile" name="ktwfile" style="width:58px;margin:0 auto;" class="easyui-filebox"/>';
        str += '</div></div></div></form><div id="image-buttons">';
        str += '<a id="btnSave" class="easyui-linkbutton" iconcls="icon-ok" style="width:60px;" onclick="ktw.cookie.saveFace();">保存</a></div>'
        return str;
    }

    /*展示修改头像对话框*/
    var _photoSizeflag = true; //图片大小是否正确
    ktw.cookie.showEditImgDlg = function () {
        $('#editImage').dialog('open').dialog('center');
        $('#choosefile').filebox({
            buttonText: '选择照片',
            buttonAlign: 'left',
            validType: ['fileSize[4,"MB"]'],
            onChange: function (newvalue, oldvalue) {
                if (_photoSizeflag) {
                    if (ktw.cookie.checkImgType(newvalue)) {
                        ktw.cookie.changeFace();
                    }
                }
            }
        })
    }

    /*检测照片格式,支持PNG、GIF、BMP、JPG/JPEG格式*/
    ktw.cookie.checkImgType = function (image) {
        var extStart = image.lastIndexOf(".");
        var ext = image.substring(extStart, image.length).toUpperCase();
        if (ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG" && ext != ".BMP") {
            ktw.cookie.messager.alert('系统提示', '图片限于png，gif，jpeg，jpg，bmp格式！', 'warning');
            return false;
        }
        return true;
    }

    /*图片验证提示信息*/
    ktw.cookie.showCheckMessage = function (flag) {
        if (!flag) {
            ktw.cookie.messager.alert('系统提示', '文件大小不能超过4M！', 'warning');
        }
    }

    /*保存密码*/
    ktw.cookie.saveEdit = function () {
        if (!$("#userEdit").form('enableValidation').form('validate')
            || !$("#userEdit").form('validate')) return;
        var user = {
            id: this.user.id,
            no: hex_md5($("#newcode").textbox("getText")),
            password: hex_md5($("#oldcode").textbox("getText"))
        };
        $.ajax({
            type: "POST",
            data: JSON.stringify(user),
            contentType: "application/json",
            url: this.ServerUrl + "user/updatepassword",
            success: function (res) {
                if (res.statusCode == 200 && res.data) {
                    $('#dlg').dialog('close');
                    ktw.cookie.user.password = user.password;
                    ktw.cookie.messager.alert('系统提示', '密码修改成功！', 'info');
                }
                else {
                    ktw.cookie.messager.alert('系统提示', '密码修改失败！', 'error');
                }
            },
            error: function (e) {
                ktw.cookie.messager.alert('系统提示', '服务请求失败！', 'error');
            }
        });
    }
    /*改变头像*/
    ktw.cookie.changeFace = function () {
        $("#userPhoto").serializeArray();
        $("#userPhoto").ajaxSubmit({
            type: "post",
            dataType: "json",
            url: this.ServerUrl + 'file/upload?reluri=' + this.user.id,
            success: function (res) {
                if (!res.success) return;
                ktw.cookie.user.imguri = res.data[0].path;
                $("#imgpreview").attr("src", ktw.App.Root + res.data[0].path);
            },
            error: function (error) { }
        });
    }
    /*保存头像*/
    ktw.cookie.saveFace = function () {
        $.ajax({
            type: "POST",
            data: this.user.imguri,
            contentType: "application/json",
            url: this.ServerUrl + "contact/update/" + this.user.id,
            success: function (res) {
                if (res.success) {
                    ktw.cookie.messager.alert('系统提示：', '保存成功！', 'info');
                    $("#imgdetail")[0].src = ktw.App.Root + ktw.cookie.user.imguri;
                    $("#loginFace")[0].src = ktw.App.Root + ktw.cookie.user.imguri;
                    /*重新设置cookie，避免浏览器刷新显示的上次cookie的数据*/
                    ktw.cookie.user.photouri = ktw.cookie.user.imguri;
                    $.cookie("usertoken", JSON.stringify(ktw.cookie.user), { expires: 1 });
                    $("#editImage").dialog("close");
                }
                else {
                    ktw.cookie.messager.alert('系统提示：', '保存失败！', 'error');
                }
            },
            error: function (e) {
                ktw.cookie.messager.alert('系统提示', '服务请求失败！', 'error');
            }
        });
    }
    /*刷新banner*/
    ktw.cookie.refershBanner = function (url) {
        $("#imgdetail")[0].src = url;
        $("#loginFace")[0].src = url;
    }
    /*初始化读取配置文件*/
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
        this.AreaTree = this.initAreaTree();
    };
    /*获取当前系统部署的行政区划树(二级结构)*/
    ktw.cookie.initAreaTree = function () {
        var areacode = this.config.SystemTheme.AreaCode;
        if (ktw.IsNull(areacode)) {
            console.error("未检测到系统的部署行政区划配置！请检查app.xml文件[SystemTheme->AreaCode|SystemTheme->AreaName]");
            ktw.Error("未检测到行政区划配置!");
            return;
        }
        var $this = this;
        var cfg=this.ServerUrl + "sysareacode/getbyfilter/" + encodeURIComponent("areacode like '" + this.config.SystemTheme.AreaCode.substr(0, 2) + "%'");
        $.get(cfg, null, function (res) {
            if (res.success) {
                if (!res.data || res.data.length == 0) {
                    ktw.Error("未找到当前行政区划!");
                    console.error("未找到当前行政区划,请检查配置文件是否正确!");
                    return;
                }
                var tmp = [];
                for (var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        $this.AreaTree = item;
                        $this.AreaTree.Children = tmp;
                        tmp.push(item);
                    }
            } else {
                console.error(res.message);
            }
        });
    }
    /*根据ID获取基础地址*/
    ktw.cookie.getBaseUrl = function (basicid) {
        var basicurls = this.config.SystemUri.BasicUris;
        if (ktw.IsNull(basicurls) || basicurls.length === 0) return "";
        var basicInfo = Enumerable.From(basicurls).Where('s=>s.ID==="' + basicid + '"').ToArray();
        if (basicInfo.length === 0) return "";
        else return basicInfo[0].Uri;
    };
    /*根据ID获取相对地址*/
    ktw.cookie.getRelativeUrl = function (relativeid) {
        var relurls = this.config.SystemUri.RelativeUris;
        if (ktw.IsNull(relurls) || relurls.length === 0) return "";
        var relativeInfo = Enumerable.From(relurls).Where('s=>s.ID==="' + relativeid + '"').ToArray();
        if (relativeInfo.length === 0) return "";
        var relativuri = relativeInfo[0].Uri;
        var basicid = relativeInfo[0].BasicID;
        if (ktw.IsNull(basicid)) return relativuri;
        var basicuri = ktw.cookie.getBaseUrl(basicid);
        return basicuri + relativuri;
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
}));

(function () {
    ktw.BrowserMatch = {
        init: function () {
            this.browser = this.getBrowser().browser || "An Unknown Browser";
            this.version = this.getBrowser().version || "An Unknown Version";
            this.OS = this.getOS() || "An Unknown OS";
        },
        getOS: function () {
            if (navigator.platform.indexOf("Win") != -1) return "Windows";
            if (navigator.platform.indexOf("Mac") != -1) return "Mac";
            if (navigator.platform.indexOf("Linux") != -1) return "Linux";
            if (navigator.userAgent.indexOf("iPhone") != -1) return "iPhone/iPod";
        },
        getBrowser: function () {
            var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
            var rTrident = /(trident)\/([\w.]+)/;
            var rFirefox = /(firefox)\/([\w.]+)/;
            var rOpera = /(opera).+version\/([\w.]+)/;
            var rNewOpera = /(opr)\/(.+)/;
            var rChrome = /(chrome)\/([\w.]+)/;
            var rSafari = /version\/([\w.]+).*(safari)/;
            var ua = navigator.userAgent.toLowerCase();
            var matchBS, matchBS2;
            matchBS = rMsie.exec(ua);
            if (matchBS != null) {
                matchBS2 = rTrident.exec(ua);
                if (matchBS2 != null) {
                    switch (matchBS2[2]) {
                        case "4.0": return { browser: "IE", version: "8" }; break;
                        case "5.0": return { browser: "IE", version: "9" }; break;
                        case "6.0": return { browser: "IE", version: "10" }; break;
                        case "7.0": return { browser: "IE", version: "11" }; break;
                        default: return { browser: "IE", version: "Undefined" };
                    }
                } else {
                    return { browser: "IE", version: matchBS[2] || "0" };
                }
            }
            matchBS = rFirefox.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
            }
            matchBS = rOpera.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
            }
            matchBS = rChrome.exec(ua);
            if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
                matchBS2 = rNewOpera.exec(ua);
                if (matchBS2 == null) {
                    return { browser: matchBS[1] || "", version: matchBS[2] || "0" };
                } else {
                    return { browser: "Opera", version: matchBS2[2] || "0" };
                }
            }
            matchBS = rSafari.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                return { browser: matchBS[2] || "", version: matchBS[1] || "0" };
            }
        },
        checkTip: function () {
            var strhtml = '' +
                '<div class="chrome-tip">' +
	                '<div class="tip-img"></div>' +
	                '<div class="tip-content">' +
		                '检测到您使用的浏览器为：<span id="name"></span>，为提高使用体验，请使用最新版本的谷歌浏览器。' +
	                '</div>' +
	                '<a class="tip-button" href="" target="_blank">' +
		                '立即下载' +
	                '</a>' +
	                '<div class="tip-close">' +
	                '</div>' +
                '</div>';
            var __dom = $(strhtml);
            __dom.find("#name").html(this.browser + " " + this.version);
            __dom.find(".tip-button").attr("href", ktw.App.Root + "upload/ChromeStandalone_62.0.3202.89_Setup.exe");
            __dom.find(".tip-close").click(function () {
                __dom.remove();
            });
            if (this.browser.indexOf("chrome") == -1) {
                $(document.body).append(__dom);
            }
        }
    };
    ktw.BrowserMatch.init();
})();

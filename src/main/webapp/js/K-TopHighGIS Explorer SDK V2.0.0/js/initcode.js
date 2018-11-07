/***
 * @param data: 2017-3-16
 * @param editer: huangge
 */
(function ($) {
    $(document).ready(function(){  
        // 初始化内容
        loadJson();
    });  

    /*请求获取菜单数据*/
    function loadJson()
    {
        var jsonDate = samplesTree;
            /*遍历json节点，动态显示左侧菜单内容*/
            /*遍历一级节点*/
            for(var i=0;i<jsonDate.length;i++){
                /*创建一级菜单并获取一级菜单的信息*/
                createFirstNode(jsonDate[i]);
                /*遍历二级节点*/
                for(var j=0;j<jsonDate[i].child.length;j++){
                    var second=jsonDate[i].child[j];
                    if(jsonDate[i].child.length==0){
                        break;
                    }
                    else {
                        /*创建二级菜单并获取二级菜单的信息*/
                        createSecondNode(second);
                    }
                }
            }
            activemenu();/*设置菜单的动态效果*/
            activeCodeMenu();/*设置代码编辑区菜单的动态效果*/
            setcode(jsonDate[0].child[0].sendpagename, jsonDate[0].child[0].implement); /*加载默认页面的源码*/
            copyx();/*复制代码*/
    }
    var ul1;
    /*创建一级菜单*/
    function  createFirstNode(data){
        var firstDiv=document.createElement("div");
        firstDiv.className="bar-r ba-li";
        var span3=document.createElement("span");
        span3.className="high-icon";
        //图标
        var span1=document.createElement("span");
        span1.className="icon-user";
        //标题
        var span2=document.createElement("span");
        span2.className="i-name";
        span2.innerHTML=data.text;
        ul1=document.createElement("ul");
        ul1.className="sub ba-li";
        $(".left-slip").append(firstDiv);
        firstDiv.appendChild(span3);
        firstDiv.appendChild(span1);
        firstDiv.appendChild(span2);
        //添加二级菜单ul
        $(".left-slip").append(ul1);
    }
    /*创建二级菜单*/
    function  createSecondNode(data){
        var li=document.createElement("li");
        li.className="sub-li";
        var a=document.createElement("a");
        a.setAttribute('href','javascript:void(0);');
        a.value=data;
        a.onclick=function(e){
            var data=e.currentTarget.value;
            var name=data.sendpagename;
            var impname=data.implement;
            setcode(name,impname);
        };
        ul1.appendChild(li);
        a.innerHTML=data.text;
        li.appendChild(a);
    }
   // loadJson();
    /*交互效果*/
    function activemenu(){
        $('.left-slip').css('height',$(document.body).height()-70 + 'px');
        $(".left-slip .sub").eq(0).show().siblings(".left-slip .sub").hide();
        /*设置一级图标和初始样式*/
        $(function () {
            for(var i=0,len=$('.left-slip .bar-r').length; i<len; i++){
                $(".left-slip .bar-r .icon-user").eq(i).css({
                    "background-image":"url(../images/icon/init" + i + ".png)",
                    "background-position":"0px 0px"
                });
                $(".left-slip .bar-r").eq(0).css('color','#35FC97');
                $(".left-slip .bar-r").eq(0).find('.icon-user').css({"background-position":"0px -29px"});
            }
            $(".left-slip .bar-r .high-icon").eq(0).css("background-color","#35FC97");
            var $choose = '<span class="choose"></span>';
            $('.left-slip .sub .sub-li').eq(0).find("a").css({'color': '#35FC97'});
            $(".left-slip .sub .sub-li").eq(0).append($choose);
        });
        /*一级菜单状态*/
        $(".left-slip .bar-r").click(function () {
            var index=$(this).index()+1; /*找到当前一级菜单的二级菜单*/
            if($(".left-slip .ba-li:eq("+index+")").is(":hidden")){/*判断当前的二级菜单是不是隐藏状态*/
                $(".left-slip .bar-r").css({"background-color":"#1B212F"});
                $(".left-slip .sub").hide();
                $(this).css({"color":'#35FC97'}).siblings('.left-slip .bar-r').css({"color":'#ffffff'});
                $('.left-slip .bar-r .high-icon').css("background-color","rgba(0,0,0,0)");
                $(this).find('.high-icon').css("background-color","#35FC97");
                $(".left-slip .bar-r .icon-user").css({"background-position":"0px 0px"});
                $(this).find('.icon-user').css({"background-position":"0px -29px"});
                $(".left-slip .ba-li:eq("+index+")").slideToggle();
            }
            else{
                $(this).css({"color":"#ffffff"});
                $(this).find('.high-icon').css("background-color","rgba(0,0,0,0)");
                $(".left-slip .bar-r .icon-user").css({"background-position":"0px 0px"});
                $(".left-slip .ba-li:eq("+index+")").slideUp();
            }
        });
        /*二级菜单的点击状态*/
        $(".left-slip .sub .sub-li").click(function(){
            var $choose = '<span class="choose"></span>';
            if($(this).length === 1){
                $('.left-slip .sub .sub-li').find("a").css({'color': '#cccccc'});
                $(this).find("a").css({"color": "#35FC97"});
                for(var i=0,len=$(".left-slip .sub .sub-li").length; i<len; i++){
                    if($(".left-slip .sub .sub-li")[i].children.length === 2){
                        $(".left-slip .sub .sub-li").find('.choose').remove();
                    }
                }
                $(this).append($choose);
            }
        });
        //菜单收缩
        $('.menu-slider').click(function(){
            if($(this).hasClass('show')){
                $('.content-left').animate({'left':"-=180"},400).fadeIn();
                $('.left-slip').hide();
                $('.menu-slider').removeClass('show').addClass('hide');
                $('.code-wrap').animate({'margin-left':"-=180",'width':'+=5%'},400);
                $('.right-showmap').animate({'margin-left':"-=100",'width':'+=6.5%'},400,function(){});
            }else if($(this).hasClass('hide')){
                $('.content-left').animate({'left':"+=180"},400).fadeIn();
                $('.left-slip').show();
                $('.menu-slider').removeClass('hide').addClass('show');
                $('.code-wrap').animate({'margin-left':"+=180",'width':'-=5%'},400);
                $('.right-showmap').animate({'margin-left':"+=100",'width':'-=6.5%'},400,function(){});
            }
        });
    }
    /*获取代码数据*/
    function setcode(pagename,implementname){
        var htmlurl=pagename;
        var impname=implementname;
        var htmlString="";

        var htmlobj=$.ajax({
            url:htmlurl,
            async:false,
            datatype:"html",
            success: function (result) {
                htmlString = result;
                for(var p in commonConfig){
                    if(htmlString.indexOf(p) > 0){
                        var cfg_val=commonConfig[p];
                        if(typeof(cfg_val) == "object" && Object.prototype.toString.call(cfg_val).toLowerCase() == "[object object]" && !cfg_val.length){
                            for(var q in cfg_val){
                                var crg_secVal=cfg_val[q];
                                var re_cfgparam="'"+p+"."+q+"'";
                                if(htmlString.indexOf(p+"."+q) > 0){
                                    var cfg_param =new RegExp(re_cfgparam,"g");
                                    var re_cfgval=crg_secVal;
                                    if(typeof(crg_secVal) == "object" && Object.prototype.toString.call(crg_secVal).toLowerCase() == "[object object]" && !crg_secVal.length){
//                                        var re_cfgthrparam=
                                        if(htmlString.indexOf(p+"."+q+".") > 0){
                                            for (var t in crg_secVal){
                                                var re_cfgThrVal=crg_secVal[t];
                                                var thr_cfgparam=p+"."+q+"."+t;
                                                var thr_param =new RegExp(thr_cfgparam,"g");
                                                if(htmlString.indexOf(p+"."+q+"."+t) > 0){
                                                    htmlString = htmlString.replace(thr_cfgparam,re_cfgThrVal);
                                                }
                                            }
                                        }
                                        re_cfgval=JSON.stringify(crg_secVal);
                                    }
                                    htmlString = htmlString.replace(cfg_param,re_cfgval);
                                }
                            }
                        }
                    }
                   
                };
                $('#code').val(htmlString);
                localStorage.code = $("#code").val();/*赋值给本地存储*/
            }
        });
        //$('#implement-iframe').attr("src", htmlurl);
        initEditor();/*代码高亮*/
        //$('#implement-pro').attr("src",impname);
        run();
    }
    /*代码高亮*/
    var addJs = true;
    var editor=null;
    function initEditor() {
        if(!editor){
            editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineWrapping: true, /*是否显示scroll*/
                lineNumbers: true, /*是否显示number*/
                styleActiveLine: true,
                matchBrackets: true,
                mode: "htmlmixed", /*样式类型*/
                viewportMargin: Infinity,
            });
        }else {
            editor.setValue($("#code").val());
        }
    }
    /*运行*/
    function run() {
        var iframeContent = $("#code").val();
        if (editor) {
            iframeContent = editor.getValue();
        }
        /*获取站点地址*/
        var urlStr = window.location.href;
        var nr = urlStr.indexOf("apisample/initexample.html");
        urlStr = urlStr.slice(0, nr);
        /*替换相对路径为绝对路径..*/
        var req = /\.\.\/\.\.\//g;
        iframeContent = iframeContent.replace(req, urlStr);
        var iFrame = document.getElementById("implement-iframe").contentWindow;
        iFrame.document.open();
        iFrame.document.write(iframeContent);
        iFrame.document.close();
    }
    /*还原*/
    function reset(){
        $("#code").val(localStorage.code);
        initEditor();
        run();
    }
    /*显示代码编辑区*/
    function  showedit(){
        $(".content-mid #code-edit").show();
        $(".content-mid #code-implement").hide();
        $(".left-code").show();
    }
    /*显示接口说明*/
    function  showimplement(){
        $(".content-mid #code-edit").hide();
        $(".content-mid #code-implement").show();
        $(".left-code").hide();
    }
    /*复制代码*/
    function copyx() {
        $('#flash').zclip({
            path: '../lib/ZeroClipboard.swf',
            copy: function () {
                return $("#code").val();
            },
            afterCopy: function () {
                layer.msg('代码已复制成功，CTRL+V粘贴 ！',{time: 3000});
            }
        });
    }
    //代码区菜单事件
    function activeCodeMenu(){
        $('.content-head span').click(function(){
            var id = $(this)[0].id;
            $(".content-head span").removeClass("show1");
            $(this).removeClass("show2").addClass("show1").siblings('span').removeClass("show1");
            if(id == 'edit'){
                showedit();
            }else if(id == 'run'){
                run();
            }else if(id == 'repalce'){
                reset();
            }
        });
    }
    window.onresize = function () {
        $('.left-slip').css('height',$(document.body).height()-70 + 'px');
        setView();
    }

    function setView() {
        var w = $(".content").width() - $(".content-left").width();
        var cw = parseInt(w / 2);
        $(".code-wrap").width(cw+1);
        $(".right-showmap").width(w - (cw + 1));
        $(".right-showmap").css('margin-left', $(".content-left").width()+cw+1);
    }
    window.onload = function () { setView(); }
})($);
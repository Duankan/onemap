(function () {
    var ktw = window.ktw = window.ktw || {};
    ktw.Grid = function () {
        var _this = this;
        window.__tablegrid = window.__tablegrid || {};
        _this.__ID = "grid_" + new Date().getTime();
        window.__tablegrid[_this.__ID] = _this;
        _this.columnArr = null; //记录行属性数组
        _this.headArr = null;//记录表格头,支持多行
        /*后台交互属性*/
        _this.FilterStr = ""; //查询条件，以and开头，可以为空 
        _this.OrderColumn = "",
        _this.OrderType = "",
        _this.OrderStr = "";//排序字符串,优先级高于OrderColumn和OrderType
        _this.PageSize = 10;
        _this.PageIndex = 1;
        _this.isEdit = false;
        _this.isPage = true;//是否分页

        /*前台样式属性*/
        this.rowHeight = "40px";//标题头高
        this.rowContentHeight = "40px";//内容行高
        this.rowAlternate = true; //是否有交替样式
        this.tableHtml = "";
        var tmpCols = 0;

        /*前台数据记录属性*/
        this.pageCount = 1;
        this.headHtml = "";
        this.deleteFun = null;
        this.updateFun = null;

        this.trdatas = [];//参与行合并的列数据容器

        //返回向后台传递参数模型
        _this.getModel = function () {
            ///<summary>返回向后台传递参数模型</summary>
            if (this.IsPage == false)
                this.PageSize = 0;

            var vModel = {
                FilterStr: this.FilterStr,
                OrderColumn: this.OrderColumn,
                OrderType: this.OrderType,
                OrderStr: this.OrderStr,
                PageIndex: this.PageIndex,
                PageSize: this.PageSize
            };

            return vModel;
        }

        //根据得到的数据初始化表格
        _this.init = function (res) {
            tmpCols = _this.columnArr.length;
            _this.tableHtml = "";
            $("#" + _this.ID).addClass("grid");
            _this.initHead();
            _this.initBody(res);
            _this.initBottom(res);
            $("#" + _this.ID).attr("cellpadding", "0");
            $("#" + _this.ID).attr("cellspacing", "0");
            $("#" + _this.ID).css("border-collapse", "collapse");
            if (_this.headHtml == "") {
                _this.headHtml = $("#" + _this.ID).html();
            }
            $("#" + _this.ID).html(_this.headHtml + _this.tableHtml);
            _this.mergeRow($("#" + _this.ID).find("tr.grid_row_alternate,tr.grid_row"), _this.trdatas);
        }

        //初始化表格头
        _this.initHead = function () {
            if (_this.headArr) {
                //如果定义了headArr就初始化
                $("#" + _this.ID).html("");
                $(_this.headArr).each(function (i, tr) {
                    _this.tableHtml += "<tr class='grid-head'";
                    var height = _this.rowHeight;
                    if (tr.rowHeight) {
                        height = tr.rowHeight;
                    }
                    _this.tableHtml += " style='height:" + height + "'>";

                    $(this).each(function (ii, td) {
                        _this.tableHtml += "<td align='center' ";
                        if (td.colspan) {
                            _this.tableHtml += " colspan='" + td.colspan + "'";
                        }
                        if (td.rowspan) {
                            _this.tableHtml += " rowspan='" + td.rowspan + "'";
                        }
                        _this.tableHtml += " style='width:" + td.width + ";'>";
                        _this.tableHtml += "<div>";
                        if (td.type == "chk") {
                            if (td.selectAllDown) {
                                _this.tableHtml += "<input type='checkbox' onclick='window.__tablegrid[\"" + _this.__ID + "\"].selectAllDown(this,\"" + _this.ID + "\")' />";
                            } else {
                                _this.tableHtml += "<input type='checkbox' />";
                            }
                        } else {
                            _this.tableHtml += td.text;
                        }
                        _this.tableHtml += "</div></td>";
                    });
                    _this.tableHtml += "</tr>";
                });
            }
        }

        ///根据数据初始化表格体
        _this.initBody = function (res) {
            //直接从tr开始创建
            $(res.DataList).each(function (i, item) {
                var rowColorClass = "grid-row";
                if (parseInt(i % 2) == 0) {
                    rowColorClass = "grid-row-alternate";
                }
                var heitxt = "style='height:" + _this.rowContentHeight + "'";
                _this.tableHtml += "<tr " + heitxt + " class='" + rowColorClass + "' onmouseover='window.__tablegrid[\"" + _this.__ID + "\"].itemMouseOver(this);' onmouseout='window.__tablegrid[\"" + _this.__ID + "\"].itemMouseOut(this);'>";
                $(_this.columnArr).each(function (ii, td) {
                    //将判断是否合并的数据存到临时数组里面
                    if (this.mergeKey) {
                        if (i == 0) {
                            //第一行
                            _this.trdatas.push({ index: ii, dat: [] });
                        }
                        var dat;
                        for (var k = 0; k < _this.trdatas.length; k++) {
                            if (_this.trdatas[k].index == ii) {
                                dat = _this.trdatas[k].dat;
                                break;
                            }
                        }
                        dat[i] = item[this.mergeKey];
                    }
                    //遍历属性
                    var attrTxt = "";
                    if (this.Attr) {
                        for (var p in this.Attr) {
                            attrTxt += " " + p + "='" + this.Attr[p] + "'";
                        }
                    }
                    _this.tableHtml += "<td align='center' rowIndex='" + i + "' " + attrTxt + " class='grid-cell'>";

                    _this.tableHtml += "<div>";
                    switch (td.type) {
                        case "lab":
                            {
                                //首先处理格式化函数,和格式化参数
                                var tdtext = item[td.name];
                                if (typeof (td.formatter) == "function") {
                                    var args = {};
                                    if (td.formatkey) {
                                        var keys = td.formatkey.split(",");
                                        $(keys).each(function (i, keyitem) {
                                            if ($.trim(keyitem) != "") {
                                                args[keyitem] = item[keyitem];
                                            }
                                        });
                                    }
                                    tdtext = td.formatter(tdtext, args);
                                }
                                var titleTxt = "";
                                if (td.title) {//动态的ttitle
                                    titleTxt = " title='" + item[td.title] + "' ";
                                }
                                if (td.titleText) {//强制的title,优先级高
                                    titleTxt = " title='" + td.titleText + "' ";
                                }
                                //内容超过最大长度截取
                                if (td.cutLen != undefined) {
                                    tdtext = tdtext || "";
                                    if (tdtext.length > td.cutLen) {
                                        tdtext = (tdtext || "").substr(0, td.cutLen) + "...";
                                    }
                                }
                                var clickTexta = "";
                                var canHide = "";
                                if (_this.isEdit && td.canEdit) {
                                    canHide = "canHide='true'";
                                }
                                if (td.clickName) {
                                    var keyText = "";
                                    if (td.key) {
                                        var arr = td.key.split(",");
                                        $(arr).each(function (i) {
                                            if (i == 0) {
                                                keyText = " btnKey='" + item[arr[i]] + "";
                                            } else {
                                                keyText += "," + item[arr[i]];
                                            }
                                        });
                                        if (keyText.length > 0) {
                                            keyText += "'";
                                        }
                                    }
                                    clickTexta = " onclick='" + td.clickName + "(this)'"
                                    _this.tableHtml += "<a " + canHide + " href='javascript:void(0)' " + clickTexta + " " + keyText + titleTxt + " >" + (tdtext || "") + "</a>";
                                } else {
                                    _this.tableHtml += "<span " + canHide + titleTxt + " >" + (tdtext || "") + "</span>";
                                }
                                if (_this.isEdit && td.canEdit) {
                                    var clickText = "";
                                    if (td.editClickName) {
                                        clickText = " onclick='" + td.editClickName + "(this)'"
                                    }
                                    _this.tableHtml += "<input type='text' style='display:none;' class='txt-grid-form' dataName='" + td.name + "' " + clickText + " value='" + (tdtext || "") + "' />";
                                }
                                break;
                            }

                        case "btn":
                            {
                                //首先处理格式化函数,和格式化参数
                                var btnText = item[td.name];
                                if (typeof (td.formatter) == "function") {
                                    var args = {};
                                    if (td.formatkey) {
                                        var keys = td.formatkey.split(",");
                                        $(keys).each(function (i, keyitem) {
                                            if ($.trim(keyitem) != "") {
                                                args[keyitem] = item[keyitem];
                                            }
                                        });
                                    }
                                    btnText = td.formatter(btnText, args, item);
                                }
                                var b = true;
                                //使用隐藏键控制按钮生成
                                if (td.isHideKey != undefined) {
                                    if (item[td.isHideKey] == true) {
                                        b = false;
                                    }
                                }
                                if (b) {
                                    var titleTxt = "";//提示文本
                                    if (td.title) {//动态的ttitle
                                        titleTxt = " title='" + item[td.title] + "' ";
                                    }
                                    if (td.titleText) {//强制的title,优先级高
                                        titleTxt = " title='" + td.titleText + "' ";
                                    }
                                    var keyText = "";
                                    if (td.key) {
                                        var arr = td.key.split(",");
                                        $(arr).each(function (i) {
                                            if (i == 0) {
                                                keyText = " btnKey='" + item[arr[i]] + "";
                                            } else {
                                                keyText += "," + item[arr[i]];
                                            }
                                        });
                                        if (keyText.length > 0) {
                                            keyText += "'";
                                        }
                                    }
                                    if (td.text) {//对于按钮来说text属性优先级高于name属性
                                        btnText = td.text;//按钮文本
                                    }
                                    _this.tableHtml += "<a onclick='" + td.clickName + "(this);' href='javascript:void(0)' " + keyText + titleTxt + ">" + btnText + "</a>";
                                }
                                break;
                            }
                        case "img":
                            {
                                //首先处理格式化图片地址函数
                                var srcpath = item[td.src];
                                if (typeof (td.formatter) == "function") {
                                    var args = {};
                                    if (td.formatkey) {
                                        var keys = td.formatkey.split(",");
                                        $(keys).each(function (i, keyitem) {
                                            if ($.trim(keyitem) != "") {
                                                args[keyitem] = item[keyitem];
                                            }
                                        });
                                    }
                                    srcpath = td.formatter(srcpath, args);
                                }

                                var titleTxt = "";//提示文本
                                if (td.title) {//动态的ttitle
                                    titleTxt = " title='" + item[td.title] + "' ";
                                }
                                if (td.titleText) {//强制的title,优先级高
                                    titleTxt = " title='" + td.titleText + "' ";
                                }
                                var keyText = "";//关键字文本
                                if (td.key) {
                                    var arr = td.key.split(",");
                                    $(arr).each(function (i) {
                                        if (i == 0) {
                                            keyText = " btnKey='" + item[arr[i]] + "";
                                        } else {
                                            keyText += "," + item[arr[i]];
                                        }
                                    });
                                    if (keyText.length > 0) {
                                        keyText += "'";
                                    }
                                }

                                var clicktxt = "";//点击文本
                                var styletxt = "";
                                if (td.clickName) {
                                    clicktxt = " onclick='" + td.clickName + "(this);' ";
                                    styletxt = "cursor:pointer;";
                                }

                                _this.tableHtml += "<image src='" + srcpath + "' " + clicktxt + " style='" + styletxt + "'" + keyText + titleTxt + " />";
                                break;
                            }
                        case "btnGroup": {
                            $(td.btns).each(function (i, btnItem) {
                                //首先处理格式化函数,和格式化参数
                                var btnText = item[btnItem.name];
                                if (typeof (btnItem.formatter) == "function") {
                                    var args = {};
                                    if (btnItem.formatkey) {
                                        var keys = btnItem.formatkey.split(",");
                                        $(keys).each(function (i, keyitem) {
                                            if ($.trim(keyitem) != "") {
                                                args[keyitem] = item[keyitem];
                                            }
                                        });
                                    }
                                    btnText = btnItem.formatter(btnText, args);
                                }

                                var keyText = "";//关键字文本
                                if (btnItem.key) {
                                    var arr = btnItem.key.split(",");
                                    $(arr).each(function (i) {
                                        if (i == 0) {
                                            keyText = " btnKey='" + item[arr[i]] + "";
                                        } else {
                                            keyText += "," + item[arr[i]];
                                        }
                                    });
                                    if (keyText.length > 0) {
                                        keyText += "'";
                                    }
                                }
                                if (btnItem.text) {//对于按钮组中的按钮text属性优先级高于name属性
                                    btnText = btnItem.text;
                                }
                                if (i > 0) {
                                    _this.tableHtml += "&nbsp;&nbsp;";
                                }
                                _this.tableHtml += "<a onclick='" + btnItem.clickName + "(this);' href='javascript:void(0)' " + keyText + ">" + btnText + "</a>";
                            });
                            break;
                        }
                        case "btnEdit": {
                            var keyText = "";
                            if (td.key) {
                                var arr = td.key.split(",");
                                $(arr).each(function (i) {
                                    if (i == 0) {
                                        keyText = " btnKey='" + item[arr[i]] + "";
                                    } else {
                                        keyText += "," + item[arr[i]];
                                    }
                                });
                                if (keyText.length > 0) {
                                    keyText += "'";
                                }
                            }
                            _this.tableHtml += "<a onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].edit(this);\"  btnFlag='__edit' href='javascript:void(0)' rowIndex='" + i + "' " + keyText + ">" + "编辑" + "</a>&nbsp;&nbsp;";
                            _this.tableHtml += "<a onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].delete(this,'" + _this.name + "');\" btnFlag='__delete' href='javascript:void(0)' rowIndex='" + i + "' " + keyText + ">" + "删除" + "</a>";
                            _this.tableHtml += "<a onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].update(this,'" + _this.name + "');\" btnFlag='__update' href='javascript:void(0)' style='display:none;' rowIndex='" + i + "' " + keyText + ">" + "更新" + "</a>&nbsp;&nbsp;";
                            _this.tableHtml += "<a onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].cancel(this);\"  btnFlag='__cancel' href='javascript:void(0)' style='display:none;' rowIndex='" + i + "'" + keyText + ">" + "取消" + "</a>";
                            break;
                        }
                        case "chk": {
                            var titleTxt = "";
                            if (td.title) {//动态的ttitle
                                titleTxt = " title='" + item[td.title] + "' ";
                            }
                            if (td.titleText) {//强制的title,优先级高
                                titleTxt = " title='" + td.titleText + "' ";
                            }
                            var keyText = "";
                            if (td.key) {
                                var arr = td.key.split(",");
                                $(arr).each(function (i) {
                                    if (i == 0) {
                                        keyText = " btnKey='" + item[arr[i]] + "";
                                    } else {
                                        keyText += "," + item[arr[i]];
                                    }
                                });
                                if (keyText.length > 0) {
                                    keyText += "'";
                                }
                            }
                            if (td.selectRow) {
                                _this.tableHtml += "<input type='checkbox' " + keyText + titleTxt + " onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].selectRow(this)\" />";
                            } else {
                                _this.tableHtml += "<input type='checkbox' " + keyText + " />";
                            }

                            break;
                        }
                        case "index":
                            {
                                var ind = i + 1;
                                if (_this.isPage) {
                                    var base = window.parseInt(_this.PageIndex * _this.pageCount);
                                    if (isNaN(base)) {
                                        console.error("算行号时出错");
                                    } else {
                                        ind += base;
                                    }
                                }
                                _this.tableHtml += "<span>" + ind + "</span>";
                                break;
                            }
                    }
                    _this.tableHtml += "</div></td>";
                });
                _this.tableHtml += "</tr>";
            });
        }
        _this.initBottom = function (res) {
            if (_this.isPage && _this.PageSize > 0) {
                //如果这是分页显示就初始化表格尾           
                var pageCount = _this.pageCount = Math.ceil(res.Count / _this.PageSize);
                _this.tableHtml += "<tr style='border:1px solid blank;'><td colspan='" + tmpCols + "' class='grid-cell' style='text-align:left;padding-left:10px;border:0;vertical-align:middle;'>";
                if (_this.PageIndex == 1) {
                    _this.tableHtml += "<a href='javascript:void(0)' style='color:gray;text-decoration:none;' >首页</a>&nbsp;&nbsp;";
                    _this.tableHtml += "<a href='javascript:void(0)' style='color:gray;text-decoration:none;' >上一页</a>&nbsp;&nbsp;";
                } else {
                    _this.tableHtml += "<a href='javascript:void(0)' onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].jumpFirstPage('" + _this.name + "')\">首页</a>&nbsp;&nbsp;";
                    _this.tableHtml += "<a href='javascript:void(0)' onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].jumpPreviousPage('" + _this.name + "')\">上一页</a>&nbsp;&nbsp;";
                }
                if (_this.PageIndex == pageCount) {
                    _this.tableHtml += "<a href='javascript:void(0)' style='color:gray;text-decoration:none;' >下一页</a>&nbsp;&nbsp;";
                    _this.tableHtml += "<a href='javascript:void(0)' style='color:gray;text-decoration:none;' >尾页</a>&nbsp;&nbsp;";
                } else {
                    _this.tableHtml += "<a href='javascript:void(0)' onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].jumpNextPage('" + _this.name + "')\">下一页</a>&nbsp;&nbsp;";
                    _this.tableHtml += "<a href='javascript:void(0)' onclick=\"window.__tablegrid[\'" + _this.__ID + "\'].jumpLastPage('" + _this.name + "')\">尾页</a>&nbsp;&nbsp;";
                }
                _this.tableHtml += "跳转到第";
                _this.tableHtml += "<select id='page_Nav' onchange=\"window.__tablegrid[\'" + _this.__ID + "\'].selectPage(this,'" + _this.name + "')\">";
                for (var i = 1; i <= pageCount; i++) {
                    if (i == _this.PageIndex) {
                        _this.tableHtml += "<option value='" + i + "' selected='selected'>" + i + "</option>";
                    } else {
                        _this.tableHtml += "<option value='" + i + "'>" + i + "</option>";
                    }

                }
                _this.tableHtml += "</select>页&nbsp;&nbsp;";
                _this.tableHtml += "当前显示第 " + _this.PageIndex + " / " + pageCount + " 页&nbsp;,";
                var currentIndex = (_this.PageIndex - 1) * _this.PageSize + 1;
                _this.tableHtml += "&nbsp;&nbsp;第" + (currentIndex < 0 ? 0 : currentIndex) + "条到" + ((currentIndex + res.DataList.length - 1) < 0 ? 0 : (currentIndex + res.DataList.length - 1)) + "条记录,一共" + res.Count + "条";
                _this.tableHtml += "</td></tr>";
            }
        }

        //鼠标经过
        _this.itemMouseOver = function (item) {
            $(item).addClass("table-row-mouseover");
        }

        //鼠标离开
        _this.itemMouseOut = function (item) {
            $(item).removeClass("table-row-mouseover");
        }

        //选中行
        _this.selectRow = function (item) {
            if ($(item).is(':checked')) {
                $(item).parent().parent().parent().addClass("select-row");
            } else {
                $(item).parent().parent().parent().removeClass("select-row");
            }

        }

        //选中所有项
        _this.selectAllDown = function (item, tableID) {
            if ($(item).is(':checked')) {
                $("#" + tableID).find(":checkbox").each(function () {
                    if ($(this).is(':checked')) {

                    } else {
                        $(this).click();
                    }
                });

            } else {
                $("#" + tableID).find(":checkbox").each(function () {
                    if ($(this).is(':checked')) {
                        $(this).click();
                    } else {

                    }
                });
            }
        }
        _this.onSelectPage = _this.onSelectPage || funnull;
        _this.onDeleteRow = _this.onDeleteRow || funnull;
        _this.onUpdateRow = _this.onUpdateRow || funnull;
        function funnull() { };
        //选中分页
        _this.selectPage = function (item, name) {
            _this.PageIndex = $(item).val();
            _this.onSelectPage(_this.PageIndex);
        }

        //第一页
        _this.jumpFirstPage = function (name) {
            _this.PageIndex = 1;
            _this.onSelectPage(_this.PageIndex);
        }

        //上一页
        _this.jumpPreviousPage = function (name) {
            if (_this.PageIndex > 1) {
                _this.PageIndex--;
                _this.onSelectPage(_this.PageIndex);
            }
        }

        //下一页
        _this.jumpNextPage = function (name) {
            if (_this.PageIndex < _this.pageCount) {
                _this.PageIndex++;
                _this.onSelectPage(_this.PageIndex);
            }
        }

        //最后一页
        _this.jumpLastPage = function (name) {
            _this.PageIndex = _this.pageCount;
            _this.onSelectPage(_this.PageIndex);
        }

        //行编辑
        _this.edit = function (item) {
            var rowIndex = $(item).attr("rowIndex");
            var tds = $("td[rowIndex=" + rowIndex + "]");
            tds.find("span[canHide=true],a[canHide=true]").hide();
            tds.find("input").show();
            tds.find("a[btnFlag=__edit]").hide();
            tds.find("a[btnFlag=__delete]").hide();
            tds.find("a[btnFlag=__update]").show();
            tds.find("a[btnFlag=__cancel]").show();
        }
        //行删除
        _this.delete = function (item, name) {
            var keyStr = $(item).attr("btnKey");
            _this.onDeleteRow(keyStr);
        }

        //行更新
        _this.update = function (item, name) {
            var keyStr = $(item).attr("btnKey");
            var rowIndex = $(item).attr("rowIndex");
            var tds = $("td[rowIndex=" + rowIndex + "]");
            var dataModel = {};
            tds.find("input[dataName]").each(function (i) {
                var dataName = $(this).attr("dataName");
                dataModel[dataName] = $(this).val();
            });

            var b = _this.onUpdateRow(keyStr, dataModel);
            if (b) {
                tds.each(function () {
                    $(this).find("span").html($(this).find("input").val());
                });
                _this.cancel(item);
            }
        }

        //行取消
        _this.cancel = function (item) {
            var rowIndex = $(item).attr("rowIndex");
            var tds = $("td[rowIndex=" + rowIndex + "]");
            tds.find("span[canHide=true],a[canHide=true]").show();
            tds.find("input[dataName]").hide();
            tds.find("a[btnFlag=__edit]").show();
            tds.find("a[btnFlag=__delete]").show();
            tds.find("a[btnFlag=__update]").hide();
            tds.find("a[btnFlag=__cancel]").hide();
        }

        //合并行
        _this.mergeRow = function (trs, trdatas) {
            ///<summary>合并指定行的数据</summary>
            ///<param name="trs">jquery选择的数据行集合</param>
            ///<param name="trdatas">参与合并计算的数据</param>
            $(trdatas).each(function (i, item) {
                var index = item.index;//参与合并的列索引
                var dat = item.dat;//参与合并的列数据
                var lastdat = "";
                var lastindex = -1;
                for (var i = dat.length - 1; i >= 0; i--) {
                    if (i == dat.length - 1) {
                        lastdat = dat[i];
                        lastindex = i;
                        continue;
                    }
                    if (dat[i] != lastdat) {
                        if (lastindex - i > 1) {
                            //进行合并操作
                            trs.eq(i + 1).find("td").eq(index).attr("rowspan", lastindex - i);
                            trs.each(function (ii, item) {
                                if (ii <= lastindex && ii > i + 1) {
                                    $(item).find("td").eq(index).remove();
                                }
                            });
                        }
                        lastdat = dat[i];
                        lastindex = i;
                    } else {
                        //相等时最后一行要参与合并
                        if (i == 0) {
                            trs.eq(i).find("td").eq(index).attr("rowspan", lastindex + 1);
                            trs.each(function (ii, item) {
                                if (ii <= lastindex && ii > i) {
                                    $(item).find("td").eq(index).remove();
                                }
                            });
                        }
                    }
                }
            });
        }

    }
    ktw.Grid.prototype.settings = {

    };
})();
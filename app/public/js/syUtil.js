(function($) {
    //初始化清除按钮  
    function initClear(target) {
        var jq = $(target);
        var opts = jq.data('combo').options;
        var combo = jq.data('combo').combo;
        var arrow = combo.find('span.combo-arrow');

        var clear = arrow.siblings("span.combo-clear");
        if (clear.size() == 0) {
            //创建清除按钮。  
            clear = $('<span class="combo-clear" style="height: 20px;"></span>');

            //清除按钮添加悬停效果。  
            clear.unbind("mouseenter.combo mouseleave.combo").bind("mouseenter.combo mouseleave.combo",
                function(event) {
                    var isEnter = event.type == "mouseenter";
                    clear[isEnter ? 'addClass' : 'removeClass']("combo-clear-hover");
                }
            );
            //清除按钮添加点击事件，清除当前选中值及隐藏选择面板。  
            clear.unbind("click.combo").bind("click.combo", function() {
                jq.combo("setValue", "").combo("setText", "");
                jq.combo('hidePanel');
            });
            arrow.before(clear);
        };
        var input = combo.find("input.combo-text");
        input.outerWidth(input.outerWidth() - clear.outerWidth());

        opts.initClear = true; //已进行清除按钮初始化。  
    }

    //扩展easyui combo添加清除当前值。  
    var oldResize = $.fn.combo.methods.resize;
    $.extend($.fn.combo.methods, {
        initClear: function(jq) {
            return jq.each(function() {
                initClear(this);
            });
        },
        resize: function(jq) {
            //调用默认combo resize方法。  
            var returnValue = oldResize.apply(this, arguments);
            var opts = jq.data("combo").options;
            if (opts.initClear) {
                jq.combo("initClear", jq);
            }
            return returnValue;
        }
    });
}(jQuery));

function clone3(obj) {
    function Clone() {}
    Clone.prototype = obj;
    var o = new Clone();
    for (var a in o) {
        if (typeof o[a] == "object") {
            o[a] = clone3(o[a]);
        }
    }
    return o;
}
/**
 * 设置系统统一的时间
 */
var time = new Date();
var year = time.getFullYear();
var month = time.getMonth() + 1;
var day = time.getDate();
if (eval(month) < 10) {
    month = "0" + month;
};
if (day < 10) {
    day = "0" + day;
}
var nowdate = year + "-" + month + "-" + day;
//获取昨天
function getYestoday() {
    var d = new Date();
    d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
    var month = d.getMonth() + 1;
    var date = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    var s = d.getFullYear() + "-" + month + "-" + date;
    return s;
}
//获取第一天的时间
function getFirstDay() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var firstDay = year + "-" + month + "-01";
    return firstDay;
}
//获取月份
function getMonth() {
    var d = new Date();
    d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
    var month = d.getMonth() + 1;
    var date = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    var s = d.getFullYear() + "-" + month;
    return s;
}
//提示信息显示
function showMsg(msg) {
    $.messager.show({
        title: '提示',
        msg: msg,
        width: "210",
        height: "100",
        showType: 'slide',
        timeout: 6000,
        position: "bottomRight"
    });
}
//提示信息显示
function showAlert(msg) {
    $.messager.alert('警告', msg);
}
/**
 * 返回指定格式的时间
 * @param {Object} time
 */
function formatterTime(time) {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var second = time.getSeconds();
    if (eval(month) < 10) {
        month = "0" + month;
    };
    if (day < 10) {
        day = "0" + day;
    };
    if (hour < 10) {
        hour = "0" + hour
    };
    if (min < 10) {
        min = "0" + min
    };
    if (second < 10) {
        second = "0" + second
    };
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" +
        second;
}

function getDays(strDateStart, strDateEnd) {
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
    return iDays;
}

function add0(m) {
    return m < 10 ? '0' + m : m
}

function timetostr(shijianchuo) {
    // shijianchuo是整数，否则要parseInt转换
    //console.info(shijianchuo);
    var time = new Date(shijianchuo * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) +
        ':' + add0(s);
}

function strtotime(dateStr) {
    var newstr = dateStr.replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}

function disableForm(formId, isDisabled) {
    var attr = "disable";
    if (!isDisabled) {
        attr = "enable";
    }
    $("form[id='" + formId + "'] :text").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] textarea").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] select").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] :radio").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] :checkbox").attr("disabled", isDisabled);

    //禁用jquery easyui中的下拉选（使用input生成的combox）

    $("#" + formId + " input[class='combobox-f combo-f']").each(function() {
        if (this.id) {
            //alert("input"+this.id);
            $("#" + this.id).combobox(attr);
        }
    });

    //禁用jquery easyui中的下拉选（使用select生成的combox）
    $("#" + formId + " select[class='combobox-f combo-f']").each(function() {
        if (this.id) {
            //alert(this.id);
            $("#" + this.id).combobox(attr);
        }
    });

    //禁用jquery easyui中的日期组件dataBox
    $("#" + formId + " input[class='datebox-f combo-f']").each(function() {
        if (this.id) {
            //alert(this.id)
            $("#" + this.id).datebox(attr);
        }
    });
}
/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.fn.panel.defaults.onBeforeDestroy = function() {
    var frame = $('iframe', this);
    try {
        if (frame.length > 0) {
            for (var i = 0; i < frame.length; i++) {
                frame[i].contentWindow.document.write('');
                frame[i].contentWindow.close();
            }
            frame.remove();
            if ($.browser.msie) {
                CollectGarbage();
            }
        }
    } catch (e) {}
};
/*
// 使panel和datagrid在加载时提示
$.fn.panel.defaults.loadingMessage = '加载中....';
$.fn.datagrid.defaults.loadMsg = '加载中....';

// 通用错误提示,用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	$.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;
 
/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 
var createGridHeaderContextMenu = function(e, field) {
	e.preventDefault();
	var grid = $(this);//grid本身 
	var headerContextMenu = this.headerContextMenu;//grid上的列头菜单对象 
	if (!headerContextMenu) {
		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
		var fields = grid.datagrid('getColumnFields');
		for ( var i = 0; i < fields.length; i++) {
			var fildOption = grid.datagrid('getColumnOption', fields[i]);
			if (!fildOption.hidden) {
				$('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			} else {
				$('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			}
		}
		headerContextMenu = this.headerContextMenu = tmenu.menu({
			onClick : function(item) {
				var field = $(item.target).attr('field');
				if (item.iconCls == 'icon-ok') {
					grid.datagrid('hideColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-empty'
					});
				} else {
					grid.datagrid('showColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-ok'
					});
				}
			}
		});
	}
	headerContextMenu.menu('show', {
		left : e.pageX,
		top : e.pageY
	});
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
*/
///扩展validatebox，添加验证两次密码功能
$.extend($.fn.validatebox.defaults.rules, {
    eqPwd: {
        validator: function(value, param) {
            return value == $(param[0]).val();
        },
        message: '密码不一致！'
    },
    phoneNum: { //验证手机号   
        validator: function(value, param) {
            return /^1[3-8]+\d{9}$/.test(value);
        },
        message: '请输入正确的手机号码。'
    },

    telNum: { //既验证手机号，又验证座机号
        validator: function(value, param) {
            return /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d{3})|(\d{3}\-))?(1[358]\d{9})$)/.test(value);
        },
        message: '请输入正确的电话号码。'
    }
});
///扩展tree，使其支持平滑数据格式
$.fn.tree.defaults.loadFilter = function(data, parent) {
    var opt = $(this).data().tree.options;
    var idFiled, textFiled, parentField;
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'title';
        parentField = opt.parentField;
        var i, l, treeData = [],
            tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

///扩展treegrid，使其支持平滑数据格式
$.fn.treegrid.defaults.loadFilter = function(data, parentId) {
    var opt = $(this).data().treegrid.options;
    var idFiled, textFiled, parentField;
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'title';
        parentField = opt.parentField;
        var i, l, treeData = [],
            tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

///扩展combotree，使其支持平滑数据格式
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;
//////////////////合并单元格函数
mergeCellsByField = function(tableID, colList) {
    var ColArray = colList.split(",");
    var tTable = $("#" + tableID);
    var TableRowCnts = tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    for (j = ColArray.length - 1; j >= 0; j--) {
        PerTxt = "";
        tmpA = 1;
        tmpB = 0;

        for (i = 0; i <= TableRowCnts; i++) {
            if (i == TableRowCnts) {
                CurTxt = "";
            } else {
                CurTxt = tTable.datagrid("getRows")[i][ColArray[j]];
            }
            if (PerTxt == CurTxt) {
                tmpA += 1;
            } else {
                tmpB += tmpA;

                tTable.datagrid("mergeCells", {
                    index: i - tmpA,
                    field: ColArray[j],
                    　　 //合并字段
                    rowspan: tmpA,
                    colspan: null
                });
                tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
                    index: i - tmpA,
                    field: "Ideparture",
                    rowspan: tmpA,
                    colspan: null
                });

                tmpA = 1;
            }
            PerTxt = CurTxt;
        }
    }
}
/**
 * author ____′↘夏悸
 * create date 2012-11-5
 *	表格数据自动合并
 **/
$.extend($.fn.datagrid.methods, {
    autoMergeCells: function(jq, fields) {
        return jq.each(function() {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
                j = 0,
                temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp, function(field, colunm) {
                $.each(colunm, function() {
                    var group = this;

                    if (group.length > 1) {
                        var before,
                            after,
                            megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index: megerIndex,
                                    field: field,
                                    rowspan: rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});
/////////表格合计
$.extend($.fn.datagrid.methods, {
    statistics: function(jq) {
        var opt = $(jq).datagrid('options').columns;
        var rows = $(jq).datagrid("getRows");
        var footer = new Array();
        footer['sum'] = "";
        for (var i = 0; i < opt[0].length; i++) {
            if (opt[0][i].sum) {
                footer['sum'] = footer['sum'] + sum(opt[0][i].field) + ',';
            }
        }
        var footerObj = new Array();
        if (footer['sum'] != "") {
            var tmp = '{' + footer['sum'].substring(0, footer['sum'].length - 1) + "}";
            var obj = eval('(' + tmp + ')');
            if (obj[opt[0][0].field] == undefined) {
                footer['sum'] += '"' + opt[0][0].field + '":"<b>当页合计:</b>"';
                obj = eval('({' + footer['sum'] + '})');
            } else {
                obj[opt[0][0].field] = "<b>当页合计:</b>" + obj[opt[0][0].field];
            }
            footerObj.push(obj);
        }
        if (footerObj.length > 0) {
            $(jq).datagrid('reloadFooter', footerObj);
        }

        function sum(filed) {
            var sumNum = 0;
            for (var i = 0; i < rows.length; i++) {
                sumNum += Number(rows[i][filed]);
            }
            return '"' + filed + '":"' + sumNum.toFixed(0) + '"';
        }
    }
})
//在layout的panle全局配置中,增加一个onCollapse处理title
var buttonDir = {
    north: 'down',
    south: 'up',
    east: 'left',
    west: 'right'
};
$.extend($.fn.layout.paneldefaults, {        
    onBeforeCollapse: function() {             /**/             
        var popts = $(this).panel('options');            
        var dir = popts.region;            
        var btnDir = buttonDir[dir];            
        if (!btnDir) return false;             
        setTimeout(function() {                
            var pDiv = $('.layout-button-' + btnDir).closest('.layout-expand').css({                    
                textAlign: 'center',
                lineHeight: '18px',
                fontWeight: 'bold'                
            });                 
            if (popts.title) {                    
                var vTitle = popts.title;                    
                if (dir == "east" || dir == "west") {                        
                    var vTitle = popts.title.split('').join('<br/>');                        
                    pDiv.find('.panel-body').html(vTitle);                    
                } else {                        
                    $('.layout-button-' + btnDir).closest('.layout-expand').find('.panel-title')                        .css({
                        textAlign: 'left'
                    })                        .html(vTitle)                    
                }                                     
            }               
        }, 100);          
    }
});
///防止panel/window/dialog组件超出浏览器边界
var easyuiPanelOnMove = function(left, top) {
    var l = left;
    var t = top;
    if (l < 1) {
        l = 1;
    }
    if (t < 1) {
        t = 1;
    }
    var width = parseInt($(this).parent().css('width')) + 14;
    var height = parseInt($(this).parent().css('height')) + 14;
    var right = l + width;
    var buttom = t + height;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    if (right > browserWidth) {
        l = browserWidth - width;
    }
    if (buttom > browserHeight) {
        t = browserHeight - height;
    }
    $(this).parent().css({ // 修正面板位置 
        left: l,
        top: t
    });
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

///更换EasyUI主题的方法
changeTheme = function(themeName) {
    var $easyuiTheme = $('#easyuiTheme');
    var url = $easyuiTheme.attr('href');
    var href = url.substring(0, url.indexOf('jquery-easyui-theme')) + 'jquery-easyui-theme/' + themeName + '/easyui.css';
    $easyuiTheme.attr('href', href);

    var $iframe = $('iframe');
    if ($iframe.length > 0) {
        for (var i = 0; i < $iframe.length; i++) {
            var ifr = $iframe[i];
            $(ifr).contents().find('#easyuiTheme').attr('href', href);
        }
    }

    $.cookie('easyuiThemeName', themeName, {
        expires: 7
    });
};

///将form表单元素的值序列化成对象
serializeObject = function(form) {
    var o = {};
    $.each(form.serializeArray(), function(index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};

/**
 * @author 孙宇
 * 
 * 增加formatString功能
 * 
 * 使用方法：formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 
 * @returns 格式化后的字符串

formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};
 */
/**
 * @author 孙宇
 * 
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * 
 * @returns list
 */
stringToList = function(value) {
    if (value != undefined && value != '') {
        var values = [];
        var t = value.split(',');
        for (var i = 0; i < t.length; i++) {
            values.push('' + t[i]); //避免他将ID当成数字 
        }
        return values;
    } else {
        return [];
    }
};

/**
 * @author 孙宇
 * 
 * @requires jQuery
 * 
 * 改变jQuery的AJAX默认属性和方法
 
$.ajaxSetup({
	type : 'POST',
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		$.messager.progress('close');
		$.messager.alert('错误', XMLHttpRequest.responseText);
	}
});*/
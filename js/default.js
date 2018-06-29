var pageindex;
var lastPage;
// 判断当前是那一类：
var listType = 0;
var index = 0;
$(function () {
    pageindex = 1
    setWidth();
    setSidebar();
    // pageInitModule.setWidth();
    // pageInitModule.setSidebar();
})
$(window).resize(function () {
    setWidth();
    // pageInitModule.setWidth();
})
blogID = location.href.split("vip=")[1];
if (blogID) {
    $(".container-fluid>.sidebar>ul>li").eq(3).addClass("active");
    $("#vipClub").addClass("active");
    hidesub(3);
} else {
    $(".container-fluid>.sidebar>ul>li").eq(0).addClass("active")
    $("#home").addClass("active");
    hidesub(0);
}
/*
 * init page when page load
 */
function setWidth() {
    if ($(window).width() < 768) {
        $(".sidebar").css({
            top: -408
        });
        $(".all").css({
            marginLeft: 0
        });
        $(".all").css({
            marginTop: 0
        });
    } else {
        $(".sidebar").css({
            top: 60
        });
        $(".all").css({
            marginLeft: 210
        });
        $(".all").css({
            marginTop: 60
        });
    }
}

function setSidebar() {
    $('[data-target="sidebar"]').click(function () {
        var asidetop = $(".sidebar").offset().top;
        if (asidetop > 0) {
            $(".sidebar").animate({
                top: -408
            });
            $(".all").animate({
                marginTop: 0
            });
            $(".sidebar").removeClass("active");
        } else {
            $(".sidebar").addClass("active");
            $(".sidebar").animate({
                top: -5
            });
            $(".all").animate({
                marginTop: 408
            });
        }
    });
}
var pageInitModule = (function (mod) {
    mod.setWidth = function () {
        if ($(window).width() < 768) {
            $(".sidebar").css({
                top: -408
            });
            $(".all").css({
                marginLeft: 0
            });
            $(".all").css({
                marginTop: 0
            });
        } else {
            $(".sidebar").css({
                top: 60
            });
            $(".all").css({
                marginLeft: 210
            });
            $(".all").css({
                marginTop: 60
            });
        }
    };
    mod.setSidebar = function () {
        $('[data-target="sidebar"]').click(function () {
            var asidetop = $(".sidebar").offset().top;
            if (asidetop > 0) {
                $(".sidebar").animate({
                    top: -408
                });
                $(".all").animate({
                    marginTop: 0
                });
                $(".sidebar").removeClass("active");
            } else {
                $(".sidebar").addClass("active");
                $(".sidebar").animate({
                    top: -5
                });
                $(".all").animate({
                    marginTop: 408
                });
            }
        });
    }
    return mod;
})(window.pageInitModule || {});

// 侧边菜单点击
function hidesub(n) {
    if ($(window).width() < 768) {
        $(".sidebar").animate({
            top: -408
        });
        $(".all").animate({
            marginTop: 0
        });
        $(".sidebar").removeClass("active");
    }
    // 判断点击的是那一个标签去获取对应的数据
    switch (n) {
        case 0:
            pageindex = 1
            // 个人资料
            first();
            listType = 0
            $(".pagination-custom").hide()
            break;
        case 1:
            pageindex = 1

            // 我的订单
            index = 0
            $("#order").show();
            $("#orderdetail").hide();
            order(pageindex, 0)
            listType = 1
            $(".pagination-custom").show()
            break;
        case 2:
            //收货地址
            index = 0
            address(1)
            listType = 2
            // pageindex = 1
            $(".pagination-custom").hide()
            break;
        case 3:
            // vip
            // listType = 3
            // pageindex = 1
            vip()
            $(".pagination-custom").hide()
            break;
        case 4:
            // 站内信
            index = 0
            $("#infoXin").show();
            $("#infoXindetail").hide();
            myMsg(pageindex, 0)
            listType = 4
            pageindex = 1
            $(".pagination-custom").show()
            break;
        case 5:
            // 我报名的活动
            index = 0
            myactivity(pageindex, 0)
            listType = 5
            pageindex = 1
            $(".pagination-custom").show()
            break;
        case 6:
            // 我的发帖
            index = 0
            getpost(pageindex, 0)
            listType = 6
            pageindex = 1
            $(".pagination-custom").show()
            break;
    }

}

// 小屏幕 左侧菜单响应
function gototop() {
    $('html').scrollTop(0);
}

$(".showP>img").mouseenter(function () {
    $(".imgshow").css("display", "block");
});
$(".showP>img").mouseleave(function () {
    $(".imgshow").css("display", "none");
});

$(".xgtx").mouseenter(function () {
    $(".imgshow").css("display", "block");
});
$(".xgtx").mouseleave(function () {
    $(".imgshow").css("display", "none");
});

$("#edit").click(function () {
    $(".showP").each(function () {
        $("#edit").hide();
        $(this).children("span").hide();
        $(".radiochoose").show();
        $(this).children("input").show();
    })
})

$("#save").click(function () {
    $(".showP").each(function () {
        $("#edit").show();
        $(this).children("span").show();
        $(".radiochoose").hide();
        $(this).children("input").hide();
    })
})

$("#reset").click(function () {
    $(".showP").each(function () {
        $("#edit").show();
        $(this).children("span").show();
        $(".radiochoose").hide();
        $(this).children("input").hide();
    })
})

// 订单详情点击
function detail(index) {
    if (list[index].Status == 0) {
        $(".firstbz").addClass("greycard")
        $(".twobz").addClass("greycard")
        $(".threebz").addClass("greycard")
    } else if (list[index].Status == 1) {
        $(".firstbz").removeClass("greycard")
        $(".twobz").addClass("greycard")
        $(".threebz").addClass("greycard")
    } else if (list[index].Status == 2) {
        $(".firstbz").removeClass("greycard")
        $(".twobz").removeClass("greycard")
        $(".threebz").addClass("greycard")
    } else {
        $(".firstbz").removeClass("greycard")
        $(".twobz").removeClass("greycard")
        $(".threebz").removeClass("greycard")
    }
    $("#Company").html("快递公司：" + list[index].Company)
    $("#LogisticsNo").html("运单编号：" + list[index].LogisticsNo)
    $("#Name").html("收货人：" + list[index].Name)
    $("#detailPhone").html("手机号：" + list[index].Phone)
    $("#Address").html("收货地址：" + list[index].Address)
    $("#detailCreateTime").html("创建时间：" + list[index].CreateTime)
    $("#OrderNO").html("订单号：" + list[index].OrderNO)
    $("#ProductImage").attr("src", list[index].ProductImage)
    $("#ProductName").html(list[index].ProductName)
    switch (Number(list[index].Status)) {
        case 0:
            status = "待付款"
            break;
        case 1:
            status = "等待卖家发货"
            break;
        case 2:
            status = '物流运输中'
            break;
        default:
            status = '交易完成'
            break;
    }
    $("#Status").html(status)
    $("#UnitPrice").html(list[index].UnitPrice)
    $("#Num").html(list[index].Num)
    $("#Postage").html(list[index].Postage)
    $("#Price").html(list[index].Price)
    $("#order").hide();
    $("#orderdetail").show();
    $(".pagination-custom").hide()
}
//确认收货
function receipt(index) {
    layer.confirm('确认收货该商品？', {
            btn: ['确定', '取消']
        },
        function () {
            $.ajax({
                type: "get",
                url: mainurl + "Order/Receipt",
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader('Authorization', getCookie('token'));
                // },
                data: {
                    id: list[index].ID,
                    token:getCookie("token")
                },
                success: function (data) {
                    if (data.Status == 1) {
                        layer.msg(data.Result, {
                            icon: 1
                        });
                        order(1, 0)
                    } else if (data.Status == 40001) {
                        $(".page-loader").addClass("loaded");
                        layer.msg(data.Result, {
                            icon: 5
                        });
                        setTimeout(
                            againlogin, 2000);
                    } else {
                        layer.msg(data.Result, {
                            icon: 5
                        });
                    }
                },
                error: function () {
                    $(".page-loader").addClass("loaded");
                    $('#animate').addClass('fadeInLeftBig' + ' animated');
                    setTimeout(removeClass, 1200);

                    function removeClass() {
                        $('#animate').removeClass('fadeInLeftBig' + ' animated');
                    }
                    $("section").html("");
                    layer.msg('服务器异常', {
                        icon: 5
                    });
                }
            })
        }
    )
}
// 站内信点击跳转详情。

var xinId = ""

function openmsg(event) {
    $.ajax({
        type: "get",
        url: mainurl + "User/MsgDetail",
        data: {
            msgid: $(event).attr("id"),
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                $("#AllCount").html(data.Result.AllCount)
                $("#NotSeeCount").html(data.Result.NotSeeCount)
                $("#xinCreateTime").html(data.Result.CreateTime)
                $("#ComeFrom").html(data.Result.ComeFrom)
                $("#xinContent").html(data.Result.Content)
                $(".lastpage").click(function () {
                    openmsg(data.Result.LastID)
                })
                $(".nextpage").click(function () {
                    openmsg(data.Result.NextID)
                })
                $(event).children(".xinImg").html('<img src="./images/xin_kai.png">')
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function () {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
    $("#infoXin").hide();
    $("#infoXindetail").show();
    $(".pagination-custom").hide()
}

// 返回订单列表页
$(".orderbox>h3").click(function () {
    $("#order").show();
    $("#orderdetail").hide();
    $(".pagination-custom").show()
})

// 返回站内信列表页
$(".xinTop>h3").click(function () {
    $("#infoXin").show();
    $("#infoXindetail").hide();
    $(".pagination-custom").show()
})
// 关闭活动模态框
$(".closeBtn").click(function () {
    $("#actDetail").modal("hide")
})
addressInit1('cmbProvince1', 'cmbCity1', 'cmbArea1');

// ---------------------获取数据分割线
// 个人资料
function first() {
    $.ajax({
        type: "get",
        url: mainurl + "User/PCGetInfo",
        data: {
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                $("#Username").html(data.Result.Username)
                if (data.Result.Gender == 0) {
                    data.Result.Gender = "男"
                    $("#optionsRadios1").attr("checked", "checked")
                } else if (data.Result.Gender == 1) {
                    data.Result.Gender = "女"
                    $("#optionsRadios2").attr("checked", "checked")
                } else {
                    data.Result.Gender = "未设定"
                }
                $("#Gender").html(data.Result.Gender)
                $("#Phone").html(data.Result.Phone)
                $("#Occupation").html(data.Result.Occupation)
                $("#Specialty").html(data.Result.Specialty)
                $("#Branch").html(data.Result.Branch)
                $("#Signature").html(data.Result.Signature)
                $("#icon").attr("src", url + data.Result.Icon)
                $(".rd-navbar-socials-toggle").html("<img src='" + url + data.Result.Icon + "'>")

                //编辑
                $("#Username1").attr("value", data.Result.Username)
                $("#Gender1").attr("value", data.Result.Gender)
                $("#Phone1").attr("value", data.Result.Phone)
                $("#Occupation1").attr("value", data.Result.Occupation)
                $("#Specialty1").attr("value", data.Result.Specialty)
                $("#Branch1").attr("value", data.Result.Branch)
                $("#Signature1").attr("value", data.Result.Signature)
                $(".page-loader").addClass("loaded");
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
                $(".page-loader").addClass("loaded");
            }
        },
        error: function () {
            $(".page-loader").addClass("loaded");
            $('#animate').addClass('fadeInLeftBig' + ' animated');
            setTimeout(removeClass, 1200);

            function removeClass() {
                $('#animate').removeClass('fadeInLeftBig' + ' animated');
            }
            $("section").html("");
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}
var img_value = "";
//上传图片  
$(".modal-body").delegate("#add", "change", function () {
    var formdata = new FormData();
    formdata.append("file", $("#add")[0].files[0]); //获取文件法二
    $.ajax({
        type: 'post',
        url: mainurl + 'Photo/UpdateForImage?Type=4',
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function (data) {
            img_value = data.Result[0];
            editicon()
        },
        error: function (data) {
            layer.msg(data.Result, {
                icon: 5
            });
        }
    })
})

// 修改头像
function editicon() {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/EdidImage',
        data: {
            token: getCookie("token"),
            image: img_value
        },
        success: function (data) {
            layer.msg(data.Result, {
                icon: 1
            });
            first();
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}
$(".pagination-custom").hide()

$("#save").click(function () {
    $.ajax({
        type: 'post',
        url: mainurl + 'User/PCEdit',
        data: {
            Phone: $("#Phone1").val(),
            Occupation: $("#Occupation1").val(),
            Specialty: $("#Specialty1").val(),
            Signature: $("#Signature1").val(),
            Gender: $("input[name='optionsRadios']:checked").val(),
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                first();
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
})

$("#savepwd").click(function () {
    if ($(".oldPsw").val == '' || $(".newPsw").val == '' || $(".repetPsw").val == '') {
        layer.msg('请完善信息', {
            icon: 5
        });
        return;
    }
    $.ajax({
        type: 'get',
        url: mainurl + 'User/ChangePwd',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', getCookie("token"))
        // },
        data: {
            oldPwd: $.md5($(".oldPsw").val()),
            newPwd: $.md5($(".repetPsw").val()),
            token:getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg("修改成功", {
                    icon: 1
                });
                setCookie("token", data.Result, "d5");
                $('#editpwd').modal('hide');
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg(data.Result, {
                icon: 5
            });
        }
    })
})

// 我的订单
function order(pageindex, index) {
    console.log(pageindex)
    $.ajax({
        type: 'get',
        url: mainurl + 'Order/PCGetMyOrder?type=-1&pageIndex=' + pageindex + '&pageSize=3&token=' + getCookie("token"),
        success: function (data) {
            if (data.Status == 1) {
                var li = ''
                list = data.Result.List;
                var page = data.Result.Page;
                lastPage = data.Result.Page
                if (data.Result.List.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $(".tablebox").html(li);
                    return;
                }
                for (var i = 0; i < list.length; i++) {
                    var status = ""
                    var status1 = ""
                    switch (Number(list[i].Status)) {
                        case 0:
                            status = "<span>待付款</span>"
                            status1 = "<span>待付款</span>"
                            statusbtn = '<button type="button" class="btn btn-warning" onclick="detail(' + i + ')">订单详情</button>'
                            break;
                        case 1:
                            status = "<span>等待卖家发货</span>"
                            status1 = "<span>待发货</span>"
                            statusbtn = '<button type="button" class="btn btn-warning" onclick="detail(' + i + ')">订单详情</button>'
                            break;
                        case 2:
                            status = "<span>物流运输中</span>"
                            status1 = "<span>待收货</span>"
                            statusbtn = '<button type="button" class="btn btn-default" onclick="receipt(' + i + ')">确认收货</button><br/><button type="button" class="btn btn-warning" onclick="detail(' + i + ')" style="margin-top: 10px;">订单详情</button>'
                            break;
                        default:
                            status = "<span>交易完成</span>"
                            status1 = "<span>已完成</span>"
                            statusbtn = '<button type="button" class="btn btn-warning" onclick="detail(' + i + ')">订单详情</button>'
                            break;
                    }
                    li += '<div class="table-custom-wrap"><table class="table-custom table-gray-light table-fixed"><tbody><tr><th>订单号：' + list[i].OrderNO + '</th><th></th><th></th><th></th><th></th><th></th><th>' + list[i].CreateTime.split(" ")[0] + '</th></tr><tr><td><img src="' + list[i].ProductImage + '" style="width: 100px;height: 100px;"></td><td class="ProductName">' + list[i].ProductName + '</td><td>' + status1 + '</td><td>' + list[i].UnitPrice + '</td><td>' + list[i].Num + '</td><td>' + list[i].Price + '</td><td><p>' + status + '</p>' + statusbtn + '</td></tr></tbody></table></div>'

                }
                $(".tablebox").html(li)
                if (index == 0) {
                    getPage(pageindex, page)
                }
                if (page == 0) {
                    $("#fenghui-pagination").hide();
                } else {
                    $("#fenghui-pagination").show();
                }
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            console.log(data)
            layer.msg("服务器异常", {
                icon: 5
            });
        }
    })

}

// 我的地址
var list;
var editid;

function address() {
    $.ajax({
        type: 'get',
        url: mainurl + 'Address/PCGetListByPage',
        data:{
            pageIndex:1,
            token:getCookie("token")
        },
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', token);
        // },
        success: function (data) {
            if (data.Status == 1) {
                var li = '<tr><th>收货人</th><th>手机号码</th><th>所在地区</th><th>详细地址</th><th>操作</th></tr>';
                list = data.Result.Data;
                if (list.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $("#address tbody").html(li);
                    return;
                }
                for (var i = 0; i < list.length; i++) {
                    if (!data.Result.Data[i].IsDefault) {
                        moren = '<button type="button" class="btn btn-warning" onclick="setdefault(this)">设为默认</button>'
                    } else {
                        moren = ''
                    }
                    li += '<tr id="' + data.Result.Data[i].ID + '"><td>' + data.Result.Data[i].Name + '</td><td>' + data.Result.Data[i].Phone + '</td><td>' + data.Result.Data[i].Province + data.Result.Data[i].City + data.Result.Data[i].Region + '</td><td>' + data.Result.Data[i].Address + '</td><td><p><label class="edit" onclick="editadd(' + i + ')">修改</label>|<label class="del" onclick="deladd(this)">删除</label></p>' + moren + '</td></tr>'
                }
                $("#address tbody").html(li)

            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg(data.Result, {
                icon: 5
            });
        }
    })

}

function editadd(index) {
    $(".editname").val(list[index].Name)
    $(".editphone").val(list[index].Phone)
    $(".editaddress").val(list[index].Address)
    $("#cmbProvince").val(list[index].Province)
    $("#cmbProvince").trigger("onchange");
    $("#cmbCity").val(list[index].City)
    $("#cmbCity").trigger("onchange");
    $("#cmbArea").val(list[index].Region)
    if (list[index].IsDefault) {
        $(".isMoRen1").prop("checked", true);
    } else {
        $(".isMoRen1").prop("checked", false);
    }
    $('#editadd').modal('show');
    editid = list[index].ID;
}

function setdefault(event) {
    $.ajax({
        type: 'get',
        url: mainurl + 'Address/PCSetDefault',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', getCookie('token'));
        // },
        data: {
            id: $(event).parents("tr").attr("id"),
            token:getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                address();
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}

function deladd(event) {
    layer.confirm('确定要删除？', {
            btn: ['确定', '取消']
        },
        function () {
            var delid = $(event).parents("tr").attr("id");
            $.ajax({
                type: 'get',
                url: mainurl + 'Address/PCDel',
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader('Authorization', getCookie('token'));
                // },
                data: {
                    id: delid,
                    token:getCookie("token")
                },
                success: function (data) {
                    if (data.Status == 1) {
                        layer.msg(data.Result, {
                            icon: 1
                        });
                        address();
                    } else if (data.Status == 40001) {
                        $(".page-loader").addClass("loaded");
                        layer.msg(data.Result, {
                            icon: 5
                        });
                        setTimeout(
                            againlogin, 2000);
                    } else {
                        layer.msg(data.Result, {
                            icon: 5
                        });
                    }
                },
                error: function (data) {
                    layer.msg('服务器异常', {
                        icon: 5
                    });
                }
            })
        }
    )

}

function addaddress() {
    if ($("#addname").val() == '' || $("#addphone").val() == '' || $("#addadd").val() == '') {
        layer.msg('请完善信息', {
            icon: 5
        });
        return;
    }
    if (!$(".isMoRen").is(':checked')) {
        isDefault = 0;
    } else {
        isDefault = 1;
    }
    $.ajax({
        type: 'post',
        url: mainurl + 'Address/PCAdd',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', getCookie('token'));
        // },
        data: {
            name: $("#addname").val(),
            phone: $("#addphone").val(),
            provice: $("#cmbProvince1").val(),
            city: $("#cmbCity1").val(),
            region: $("#cmbArea1").val(),
            address: $("#addadd").val(),
            isDefault: isDefault,
            token:getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                $("#addname").val('')
                $("#addphone").val('')
                $("#addadd").val('')
                address();
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}

$("#saveadd").click(function () {
    if ($(".editname").val == '' || $(".editphone").val == '' || $(".editaddress").val == '') {
        layer.msg('请完善信息', {
            icon: 5
        });
        return;
    }
    if (!$(".isMoRen1").is(':checked')) {
        isDefault = 0;
    } else {
        isDefault = 1;
    }
    $.ajax({
        type: 'post',
        url: mainurl + 'Address/PCEdit',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', token)
        // },
        data: {
            AddressID: editid,
            name: $(".editname").val(),
            phone: $(".editphone").val(),
            provice: $("#cmbProvince").val(),
            city: $("#cmbCity").val(),
            region: $("#cmbArea").val(),
            address: $(".editaddress").val(),
            isDefault: isDefault,
            token:getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg("修改成功", {
                    icon: 1
                });
                $('#editadd').modal('hide');
                address(1);
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg(data.Result, {
                icon: 5
            });
        }
    })
})
// 站内信
function myMsg(pageindex, index) {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/GetMyMail?token=' + getCookie("token") + '&pageIndex=' + pageindex + '&pageSize=4',
        success: function (data) {
            if (data.Status == 1) {
                var li = ''
                list = data.Result.List;
                var page = data.Result.Page;
                lastPage = data.Result.Page
                if (data.Result.List.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $(".tablebox").html(li);
                    return;
                }
                for (var i = 0; i < list.length; i++) {
                    var status = ""
                    var status1 = ""
                    switch (list[i].IsSee) {
                        case true:
                            statusbtn = '<img src="./images/xin_kai.png">'
                            break;
                        case false:
                            statusbtn = '<img src="./images/xin.png">'
                            break;
                    }
                    li += '<div class="xinBox" onclick="openmsg(this)" id="' + list[i].MsgID + '"><div class="xinImg">' + statusbtn + '</div><div class="xinMsg"><h4>' + list[i].ComeFrom + '</h4><div>' + list[i].Content + '</div></div></div>'

                }
                $(".tablebox").html(li)
                if (index == 0) {
                    getPage(pageindex, page)
                }
                if (page == 0) {
                    $("#fenghui-pagination").hide();
                } else {
                    $("#fenghui-pagination").show();
                }
                $("#zhenneixin").html(li)
            } else if (data.Status == 40001) {
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })

}

// 我报名的活动
function myactivity(pageindex, index) {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/MySignActivity?token=' + getCookie("token") + '&pageIndex=' + pageindex + '&pageSize=2&keyword=-1',
        success: function (data) {
            if (data.Status == 1) {
                var li = ''
                list = data.Result.List;
                var page = data.Result.Page;
                if (page == 0) {
                    $("#fenghui-pagination").hide();
                } else {
                    $("#fenghui-pagination").show();
                }
                if (list.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $(".activityBox").html(li);
                    return;
                }
                for (var i = 0; i < list.length; i++) {
                    li += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" id="' + list[i].ID + '"><div class="post-blog"><div class="post-blog__media"><img src="' + list[i].Display_Image + '" width="369" height="263" class="imghei"></div><div class="post-blog__body"><div class="post-blog__title"><a>' + list[i].Title + '</a><span class="detailBtn" onclick="actdetail(' + i + ')">报名详情</span></div><div class="post-blog__meta"><div class="post-blog__meta-views">' + list[i].Address + '</div><div class="post-blog__meta-date">' + list[i].Time + '</div></div></div></div></div>'
                }
                if (index == 0) {
                    getPage(pageindex, page)
                }
                $(".activityBox").html(li)
                height = $(".imghei").eq(0).width();
                height1 = height / 3 * 2;
                $(".imghei").css('height', height1)
                $(".post-blog__media").each(function () {
                    $(this).click(function () {
                        var blogid = $(this).parents(".col-xs-12").attr("id")
                        window.location.href = "tip-post.html?id=" + blogid;
                    })
                })
            } else if (data.Status == 40001) {

                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}

// 我的发帖
function getpost(pageindex, index) {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/PCGetPosts?token=' + getCookie("token") + '&pageIndex=' + pageindex + '&pageSize=8',
        success: function (data) {
            if (data.Status == 1) {
                var li = ''
                list = data.Result.list;
                var page = data.Result.page;
                if (page == 0) {
                    $("#fenghui-pagination").hide();
                } else {
                    $("#fenghui-pagination").show();
                }
                if (list.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $(".tiezibox").html(li);
                    return;
                }
                for (var i = 0; i < list.length; i++) {
                    list[i].postdate = list[i].postdate.substring(0, 10)

                    li +=
                        '<div class="offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm" id="' + list[i].ID + '"><div class="unit__left"><span title="一级分类">' + list[i].ModularName + '</span><p class="text-snow" title="二级分类">' + list[i].ClassName + '</p></div><div class="unit__body"><p title="标题">' + list[i].sub + '</p></div><div class="unit__Modular"><p title="一级分类">' + list[i].ModularName + '</p></div><div class="unit__Modular"><p title="二级分类">' + list[i].ClassName + '</p></div><div class="unit__foot"><span class="post-blog__meta-comments" title="回复数">回复(' + list[i].replies + ')</span><p title="发帖时间" class="text-snow">' + list[i].postdate + '</p></div><div class="unit__left"><span title="发帖时间">' + list[i].postdate + '</span><p class="text-snow" title="回复数">回复(' + list[i].replies + ')</p></div></div>'

                }
                if (index == 0) {
                    getPage(pageindex, page)
                }
                $(".tiezibox").html(li)
                $(".post-blog-sm>.unit__body").each(function () {
                    $(this).click(function () {
                        var bbsid = $(this).parents(".offset-top-30").attr("id");
                        window.open("bbs-post.html?id=" + bbsid);
                    })
                })
                $(".post-blog__meta-comments").each(function () {
                    $(this).click(function () {
                        var bbsid = $(this).parents(".offset-top-30").attr("id");
                        window.open("bbs-post.html?id=" + bbsid);
                    })
                })
            } else if (data.Status == 40001) {
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}

window.onresize = function () {
    changeDivHeight();
}

function changeDivHeight() {
    height = $(".imghei").eq(0).width();
    height1 = height / 3 * 2;
    $(".imghei").css('height', height1)
}

function actdetail(i) {
    $("#num").html(list[i].Num)
    $("#actphone").html(list[i].Phone)
    $("#acrbz").html(list[i].Remarks)
    $('#actDetail').modal('show');
}


// 分页
function getPage(p, a) {
    $('#fenghui-pagination').pagination({
        pages: a,
        pageNumber: p,
        // displayedPages: 3,
        // edges: 3,
        // currentPage: 1,
        // prevText: '<',
        // nextText: '>',
        onPageClick: function (p) {
            switch (listType) {
                case 0:
                    first()
                    break;
                case 1:
                    order(p, 1)
                    break;
                case 2:

                    break;
                case 3:

                    break;
                case 4:

                    break;
                case 5:
                    myactivity(p, 1)
                    break;
                case 6:
                    getpost(p, 1)
                    break;
                case 7:
                    orderlist(p, 1)
                    break;

            }
        }
    });
}

function editlogion() {
    layer.confirm('确定要退出登录吗？', {
            btn: ['确定', '取消']
        },
        function () {
            delCookie("token");
            window.location.href = "index-video.html";
        }
    )
}

if (!ispc) {
    $(".tab-content").css("min-height", $("html").height())
}
//vip
var vipstatus = 0;

function vip() {
    $.ajax({
        type: "get",
        url: mainurl + "User/CheckVip",
        data: {
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                $("#vipname").html(data.Result.Username)
                $(".photo").attr("src", url + data.Result.icon)
                vipstatus = data.Status;
                if (data.Result.EndTime == "不是") {
                    isvip = false;
                    $(".novip").show();
                } else {
                    isvip = true;
                    $("#vipendtime").html("" + data.Result.EndTime + "到期")
                    $(".yesvip").show();
                }
                $(".page-loader").addClass("loaded");
            }
        },
        error: function () {
            $(".page-loader").addClass("loaded");
            $('#animate').addClass('fadeInLeftBig' + ' animated');
            setTimeout(removeClass, 1200);

            function removeClass() {
                $('#animate').removeClass('fadeInLeftBig' + ' animated');
            }
            $("section").html("");
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}
// 加入vip
function joinvipbtn() {
    if (vipstatus == 0) {
        $("#vip").hide();
        $("#joinfirst").show();
        $("#joinsecond").hide();
    } else if (vipstatus == 1 || vipstatus == 2) {
        $("#vip").hide();
        $("#joinfirst").hide();
        $("#joinsecond").show();
        $("#steptwo").removeClass("greycard")
    } else {
        layer.msg("您已是会员，无需申请", {
            icon: 5
        });
        return;
    }
}
$(".vipTop>h3").click(function () {
    $("#joinfirst").hide();
    $("#joinsecond").hide();
    $("#vip").show();
    $("#vipinfo").hide();
    $("#buytable").hide()
    $("#xufeivip").hide();
    $(".pagination-custom").hide()
})
// 会员资料
function vipinfo() {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/VipUserDetail',
        data: {
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                $("#infoRealName").html(data.Result.RealName)
                $("#infoBirthday").html(data.Result.Birthday)
                $("#infoBranch").html(data.Result.Branch)
                if (data.Result.Sex == 0) {
                    $("#infoSex").html("男")
                } else {
                    $("#infoSex").html("女")
                }
                $("#infoLocalAdress").html(data.Result.LocalAdress)
                $("#infoPhone").html(data.Result.Phone)
                $("#infoAddress").html(data.Result.Address)
                $("#infoZipCode").html(data.Result.ZipCode)
                $("#infoMsn").html(data.Result.Msn)
                $("#infoQQ").html(data.Result.QQ)
                $("#infoEmail").html(data.Result.Email)
                $("#infoHob").html(data.Result.Hob1)
                $("#infoRemarks").html(data.Result.Remarks)
                $("#infoSize").html(data.Result.Size)

                //编辑
                $("#infoRealName1").attr("value", data.Result.RealName)
                $("#infoBirthday1").attr("value", data.Result.Birthday)
                $("#infoBranch1").attr("value", data.Result.Branch)
                if (data.Result.Sex == 0) {
                    $("#infosex1").attr("checked", "checked")
                } else {
                    $("#infosex2").attr("checked", "checked")
                }
                $("#infoLocalAdress1").attr("value", data.Result.LocalAdress)
                $("#infoPhone1").attr("value", data.Result.Phone)
                $("#infoAddress1").attr("value", data.Result.Address)
                $("#infoZipCode1").attr("value", data.Result.ZipCode)
                $("#infoMsn1").attr("value", data.Result.Msn)
                $("#infoQQ1").attr("value", data.Result.QQ)
                $("#infoEmail1").attr("value", data.Result.Email)
                $("#infoHob1").attr("value", data.Result.Hob)
                $("#infoRemarks1").attr("value", data.Result.Remarks)
                $("#infoSize1").attr("value", data.Result.Size)
                $("#vip").hide();
                $("#joinfirst").hide();
                $("#joinsecond").hide();
                $("#vipinfo").show();
                $("#xufeivip").hide();
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg("服务器异常", {
                icon: 5
            });
        }
    })

}
$("#editinfo").click(function () {
    $(".viptable").each(function () {
        $("#editinfo").hide();
        $("#saveinfo").show();
        $("#resetinfo").show();
        $(".inforadio").show();
        $(this).children("span").hide();
        $(this).children("input").show();
        $(this).children("textarea").show();
        $(this).children("select").show();
    })
})

function resetinfo() {
    $(".viptable").each(function () {
        $("#editinfo").show();
        $("#resetinfo").hide();
        $("#saveinfo").hide();
        $(".inforadio").hide();
        $(this).children("span").show();
        $(this).children("select").hide();
        $(this).children("input").hide();
        $(this).children("textarea").hide();
    })
}

//修改会员资料
$("#saveinfo").click(function () {
    console.log($("#infoBirthday").val())
    if ($("#infoRealName1").val() == '' || $("#infoBirthday1").val() == '' || $("#infoLocalAdress1").val() == '' || $("#infoPhone1").val() == '' || $("#infoAddress1").val() == '' || $("#infoZipCode1").val() == '' || $("#infoEmail1").val() == '') {
        layer.msg("请完善信息哦", {
            icon: 5
        });
        return;
    }
    $.ajax({
        type: 'post',
        url: mainurl + 'User/EditVipDetail',
        data: {
            Sex: $("input[name='inforsex']:checked").val(),
            Branch: $("#infoBranch1").val(),
            Birthday: $("#infoBirthday1").val(),
            LocalAdress: $("#infoLocalAdress1").val(),
            RealName: $("#infoRealName1").val(),
            Phone: $("#infoPhone1").val(),
            Address: $("#infoAddress1").val(),
            ZipCode: $("#infoZipCode1").val(),
            Size: $("#infoSize").val(),
            Occupation: $("#infoOccupation1").val(),
            Hob: $("#infoHob").val(),
            QQ: $("#infoQQ1").val(),
            Email: $("#infoEmail1").val(),
            Msn: $("#infoMsn1").val(),
            Remarks: $("#infoRemarks1").val(),
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                vipinfo();
                resetinfo();
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg("服务器异常", {
                icon: 5
            });
        }
    })
})

$("#savetable").click(function () {
    if (!isvip) {
        if ($("input[name='vipsex']:checked").val() == undefined) {
            layer.msg("请完善信息哦", {
                icon: 5
            });
            return;
        }
        if ($("#vipRealName").val() == '' || $("#vipBirthday").val() == '' || $("#vipLocalAdress").val() == '' || $("#vipPhone").val() == '' || $("#vipAddress").val() == '' || $("#vipZipCode").val() == '' || $("#vipEmail").val() == '') {
            layer.msg("请完善信息哦", {
                icon: 5
            });
            return;
        }
        $.ajax({
            type: 'post',
            url: mainurl + 'User/ApplyVip',
            data: {
                Sex: $("input[name='vipsex']:checked").val(),
                Branch: $("#vipBranch").val(),
                Birthday: $("#vipBirthday").val(),
                LocalAdress: $("#vipLocalAdress").val(),
                RealName: $("#vipRealName").val(),
                Phone: $("#vipPhone").val(),
                Address: $("#vipAddress").val(),
                ZipCode: $("#vipZipCode").val(),
                Size: $("#vipSize").val(),
                Occupation: $("#vipOccupation").val(),
                Hob: $("#vipHob").val(),
                QQ: $("#vipQQ").val(),
                Email: $("#vipEmail").val(),
                Msn: $("#vipMsn").val(),
                Remarks: $("#vipRemarks").val(),
                token: getCookie("token")
            },
            success: function (data) {
                if (data.Status == 1) {
                    $("#joinfirst").hide();
                    $("#joinsecond").show();
                    vipstatus = 2;
                } else if (data.Status == 40001) {
                    $(".page-loader").addClass("loaded");
                    layer.msg(data.Result, {
                        icon: 5
                    });
                    setTimeout(
                        againlogin, 2000);
                } else {
                    layer.msg(data.Result, {
                        icon: 5
                    });
                }
            },
            error: function (data) {
                layer.msg("服务器异常", {
                    icon: 5
                });
            }
        })
    }
})
var paytype = 0;
// 确认支付
function choosetype(enent) {
    console.log($(enent).attr("id"))
    if ($(enent).attr("id") == "ailpay") {
        paytype = 0;
    } else {
        paytype = 1;
    }
    $(".list-group-item").removeClass("active")
    $(enent).addClass("active")
}

function choosechange(e) {
    if (e.value == 1) {
        $(vipmoney).html("￥168")
    } else if (e.value == 2) {
        $(vipmoney).html("￥168")
    } else {
        $(vipmoney).html("￥380")
    }
}
// 去支付
$("#gotopay").click(function () {

    $.ajax({
        type: 'get',
        url: mainurl + 'Order/AddZFBOrder',
        data: {
            Month: $("input[name='chooseradio']:checked").val(),
            type: paytype,
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                window.location.href = "pay.html?data=" + data.Result + ""
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg("服务器异常", {
                icon: 5
            });
        }
    })
})

function vipxufei() {
    $("#vip").hide();
    $("#joinfirst").hide();
    $("#joinsecond").hide();
    $("#xufeivip").show()
}

$("#gotoxufei").click(function () {
    $.ajax({
        type: 'get',
        url: mainurl + 'Order/AddZFBOrder',
        data: {
            Month: $("input[name='inlineRadioOptions']:checked").val(),
            type: paytype,
            token: getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                window.location.href = "pay.html?data=" + data.Result + ""
            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg("服务器异常", {
                icon: 5
            });
        }
    })
})

// 购买记录
function buydetail(pageindex, index) {
    orderlist(pageindex, index)
    listType = 7
    $(".pagination-custom").show()

}

function orderlist(pageindex, index) {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/UserVipOrderList?token=' + getCookie("token") + '&pageIndex=' + pageindex + '&pageSize=8',
        success: function (data) {
            if (data.Status == 1) {
                $("#vip").hide();
                $("#joinfirst").hide();
                $("#joinsecond").hide();
                $("#buytable").show()
                $("#xufeivip").hide()
                var li = ''
                list = data.Result.List;
                var page = data.Result.Page;
                if (page == 0) {
                    $("#fenghui-pagination").hide();
                } else {
                    $("#fenghui-pagination").show();
                }
                if (list.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $("#nullinfo").html(li);
                    return;
                }
                var typebtn = '';
                for (var i = 0; i < list.length; i++) {
                    switch (list[i].Type) {
                        case 1:
                            typebtn = ''
                            break;
                        case 2:
                            typebtn = '<button type="button" class="btn btn-warning upload">上传凭证</button>'
                            break;
                        case 3:
                            typebtn = '<button type="button" class="btn btn-warning lookload">查看凭证</button>'
                            break;
                        case 4:
                            typebtn = ''
                            break;
                    }

                    li +=
                        '<tr id=' + list[i].ID + ' name=' + list[i].Image + '><td>' + list[i].Order + '</td><td>' + list[i].Status + '</td><td>' + list[i].CreateTime + '</td><td>' + typebtn + '</td></tr>'

                }
                if (index == 0) {
                    getPage(pageindex, page)
                }
                $(".ordertr").html(li)
                //上传凭证
                $(".upload").each(function () {
                    $(this).click(function () {
                        var sta = $(this).parents("tr").attr("id");
                        upimg(sta)
                    })
                })
                //查看凭证
                $(".lookload").each(function () {
                    $(this).click(function () {
                        var imgurl = $(this).parents("tr").attr("name");
                        lookimg(imgurl)
                    })
                })

            } else if (data.Status == 40001) {
                $(".page-loader").addClass("loaded");
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
}
var orderid = "";

function upimg(id) {
    orderid = id;
    $(".imgorder").attr("src", "images/shangchuangtupian.png")
    $('#uporderimg').modal('show');

}

function lookimg(img) {
    $(".imgorder").attr("src", url + img)
    $('#lookorderimg').modal('show');
}

// $("#editorderimg").onclick(function(){

// })

var orderimg_value = "";
//上传图片  
$(".modal-body").delegate("#orderimg", "change", function () {
    var formdata = new FormData();
    // console.log($("#orderimg")[0].files[0])
    formdata.append("file", $("#orderimg")[0].files[0]); //获取文件法二
    $.ajax({
        type: 'post',
        url: mainurl + 'Photo/UpdateForImage?Type=4',
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function (data) {
            orderimg_value = data.Result[0];
            $(".imgorder").attr("src", url + orderimg_value)
        },
        error: function (data) {
            layer.msg(data.Result, {
                icon: 5
            });
        }
    })
})

// 修改头像
$("#editorderimg").click(function () {
    $.ajax({
        type: 'get',
        url: mainurl + 'User/UpOrderImage',
        data: {
            token: getCookie("token"),
            Image: orderimg_value,
            ID: orderid
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                $('#uporderimg').modal('hide');
                orderlist(pageindex, 0)
            } else if (data.Status == 40001) {
                layer.msg(data.Result, {
                    icon: 5
                });
                setTimeout(
                    againlogin, 2000);
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('服务器异常', {
                icon: 5
            });
        }
    })
})
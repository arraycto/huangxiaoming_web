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
    console.log(pageindex)
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
            address(pageindex)
            listType = 2
            pageindex = 1
            $(".pagination-custom").hide()
            break;
        case 3:
            // vip
            listType = 3
            pageindex = 1
            vip(pageindex)
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
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', getCookie('token'));
                },
                data: {
                    id: list[index].ID,
                },
                success: function (data) {
                    if (data.Status == 1) {
                        layer.msg(data.Result, {
                            icon: 1
                        });
                        order(1, 0)
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
            token: token
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
            token: token
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
            } else if (data.Status == -1) {
                layer.msg(data.Result, {
                    icon: 5
                });
                $(".page-loader").addClass("loaded");
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
$(".showP").delegate("#add", "change", function () {
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
            token: token,
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
            token: token
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                first();
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
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token)
        },
        data: {
            oldPwd: $.md5($(".oldPsw").val()),
            newPwd: $.md5($(".repetPsw").val()),
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg("修改成功", {
                    icon: 1
                });
                setCookie("token", data.Result, "d5");
                $('#editpwd').modal('hide');
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
        url: mainurl + 'Order/GetMyOrder?type=-1&pageIndex=' + pageindex + '&pageSize=3',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', getCookie('token'));
        },
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
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            console.log(data)
            layer.msg("登录失效,请重新登录", {
                icon: 5
            });
        }
    })

}

// 我的地址
var list;
var editid;

function address(pageindex) {
    $.ajax({
        type: 'get',
        url: mainurl + 'Address/GetListByPage?pageIndex=' + pageindex + '',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', getCookie('token'));
        },
        success: function (data) {
            if (data.Status == 1) {
                var li = '<tr><th>收货人</th><th>手机号码</th><th>所在地区</th><th>详细地址</th><th>操作</th></tr>';
                list = data.Result.Data;
                if (list.length == 0) {
                    li = "<div class='shell phone'><img src='images/kong.png'></div>";
                    $("#address .table-custom-wrap").html(li);
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
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg("登录失效,请重新登录", {
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
        url: mainurl + 'Address/SetDefault',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', getCookie('token'));
        },
        data: {
            id: $(event).parents("tr").attr("id")
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                address(1);
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
                url: mainurl + 'Address/Del',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', getCookie('token'));
                },
                data: {
                    id: delid
                },
                success: function (data) {
                    if (data.Status == 1) {
                        layer.msg(data.Result, {
                            icon: 1
                        });
                        address(1);
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
        url: mainurl + 'Address/Add',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', getCookie('token'));
        },
        data: {
            name: $("#addname").val(),
            phone: $("#addphone").val(),
            provice: $("#cmbProvince1").val(),
            city: $("#cmbCity1").val(),
            region: $("#cmbArea1").val(),
            address: $("#addadd").val(),
            isDefault: isDefault
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg(data.Result, {
                    icon: 1
                });
                address(1);
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
        url: mainurl + 'Address/Edit',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token)
        },
        data: {
            AddressID: editid,
            name: $(".editname").val(),
            phone: $(".editphone").val(),
            provice: $("#cmbProvince").val(),
            city: $("#cmbCity").val(),
            region: $("#cmbArea").val(),
            address: $(".editaddress").val(),
            isDefault: isDefault
        },
        success: function (data) {
            if (data.Status == 1) {
                layer.msg("修改成功", {
                    icon: 1
                });
                $('#editadd').modal('hide');
                address(1);
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
        url: mainurl + 'User/GetMyMail?token=' + token + '&pageIndex=' + pageindex + '&pageSize=4',
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
        url: mainurl + 'User/MySignActivity?token=' + token + '&pageIndex=' + pageindex + '&pageSize=2&keyword=-1',
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
        url: mainurl + 'User/PCGetPosts?token=' + token + '&pageIndex=' + pageindex + '&pageSize=8',
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
function vip() {
    $.ajax({
        type: "get",
        url: mainurl + "api/User/CheckVip",
        data: {
            token: token
        },
        success: function (data) {
            $(".page-loader").addClass("loaded");
            $("#vipname").html(data.Result.Username)
            $(".photo").attr("src",url+data.Result.icon)
            if (data.Status == 1) {
                
            } else if (data.Status == -1) {
                layer.msg(data.Result, {
                    icon: 5
                });
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
// 加入vip
function joinvipbtn(){
    $("#vip").hide();
    $(".jointable").show()
}
$(".vipTop>h3").click(function () {
    $(".jointable").hide();
    $("#vip").show();
    $("#vipinfo").hide();
    $("#buytable").hide()
})
// 会员资料
function vipinfo(){
    $("#vip").hide();
    $("#vipinfo").show();
}
$("#editinfo").click(function () {
    $(".viptable").each(function () {
        $("#editinfo").hide();
        $("#saveinfo").show();
        $(".inforadio").show();
        $(this).children("span").hide();
        $(this).children("input").show();
        $(this).children("textarea").show();
    })
})

$("#saveinfo").click(function () {
    $(".viptable").each(function () {
        $("#editinfo").show();
        $("#saveinfo").hide();
        $(".inforadio").hide();
        $(this).children("span").show();
        $(this).children("input").hide();
        $(this).children("textarea").hide();
    })
})

// 购买记录
function buydetail(){
    $("#vip").hide();
    $("#buytable").show()
}

$("#savetable").click(function(){
    $("#joinfirst").hide();
    $("#joinsecond").show();
})
var paytype = 0;
// 确认支付
function choosetype(enent){
    console.log($(enent).attr("id"))
    if ($(enent).attr("id") == "ailpay") {
        paytype = 0;
    }else{
        paytype = 1;
    }
    $(".list-group-item").removeClass("active")
    $(enent).addClass("active")
}

function choosechange(e){
    if(e.value == 1){
        $(vipmoney).html("￥168")
    }else {
        $(vipmoney).html("￥380")
    }
}
// 去支付
$("#gotopay").click(function(){
    if ($("input[name='inlineRadioOptions']:checked").val() == 1) {
        var price = 168
    }else{
        var price = 380
    }
    $.ajax({
        type: 'get',
        url: mainurl + 'api/Order/AddZFBOrder',
        data:{
            month:$("input[name='inlineRadioOptions']:checked").val(),
            price:'0.01',
            type:paytype,
            token:getCookie("token")
        },
        success: function (data) {
            if (data.Status == 1) {
                window.open("pay.html?data="+data.Result+"")
            } else {
                layer.msg(data.Result, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg("登录失效,请重新登录", {
                icon: 5
            });
        }
    })
})
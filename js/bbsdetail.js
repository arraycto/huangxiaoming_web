var ue = UE.getEditor('container');
ue.ready(function () {
	ue.setContent(decodeURIComponent(""));
})
//上级目录
var thisurl = "";
//本级目录
var thisadd = "";
var blogID = location.href.split("id=")[1].split("#")[0].split("&")[0];
var pageNumber = location.href.split("page-")[1];
if (pageNumber == undefined) {
	pageNumber = 1
}
var FenghuiPage = 1;
$(function () {
	hqhf(pageNumber, true);
});

function hqhf(pageNumber, isnew) {
	$.ajax({
		type: "GET",
		url: mainurl + "BBS/CommentList",
		async: false,
		data: {
			PostID: blogID,
			pageIndex: pageNumber,
			pageSize: 10,
		},
		success: function (data) {
			if (data.Status == 1) {
				commit = "";
				FenghuiPage = data.Result.page;
				//地址栏
				if (data.Result.post.isNew == 3) {
					data.Result.post['Content'] = decodeURIComponent(data.Result.post['Content']);
				} else {
					data.Result.post['Content'] = transform(data.Result.post['Content'])
				}

				$("#contentbox>p").html(data.Result.post['Content']);
				thisadd = data.Result.post['Class']
				thisurl = data.Result.post['Modular']
				$(".post-blog--single>h3").html(''+data.Result.post['Title']+'<button class="button button-sm button-default floatright" id="pinglun">评论</button>')
				document.title = data.Result.post['Title'];
				$("#firsturl>a").html(data.Result.post['Modular'])
				$("#secordurl>a").html(data.Result.post['Class'])
				//给教主留言隐藏最后一个路径
				if ($("#firsturl").html().indexOf(thisurl) == -1) {
					if (data.Result.post.Modular !== "圣火令（教主留言）") {
						$(".breadcrumb-custom").append("<li id='lasturl'></li> ")
					}
					$("#firsturl").append("<span>" + thisurl + "<span class='caret'>")
				}
				if (data.Result.post['ClassID'] == "29f54fe2-dddf-e711-ad57-c74e1272e605") {
					if (token == '-1') {
						$("section").html("<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>");
						layer.confirm('您还不是vip会员哦，只有vip会员才能进去vip专区哦', {
								btn: ['是vip，去登录', '取消']
							},
							function () {
								layer.msg();
								$(".activespan").css("color", "black");
								$(".activespan").css("font-size", "22px");
								$(".grey").css("font-size", "17px");
								$(".grey").css("color", "#9a9a9a");
								$(".registerbox").hide();
								$(".loginbox").show();
								$('#myModal').modal('show');
							}
						)
					} else {
						$.ajax({
							type: "get",
							url: mainurl + "User/CheckVip",
							data: {
								token: token
							},
							success: function (data) {
								if (data.Status == 40001) {
									layer.msg(data.Result, {
										icon: 5
									});
									setTimeout(
										againlogin, 2000);
									retuen;
								} else {
									if (data.Result.EndTime == "不是") {
										$(".page-loader").addClass("loaded");
										$('#animate').addClass('fadeInLeftBig' + ' animated');
										setTimeout(removeClass, 1200);

										function removeClass() {
											$('#animate').removeClass('fadeInLeftBig' + ' animated');
										}
										$("section").html("<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>");
										layer.confirm('您还不是会员哦，无法进入vip专区', {
												btn: ['去开通', '取消']
											},
											function () {
												window.location.href = "user.html?vip=true";
											}
										)
										retuen;
									}
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
				}
				else if(data.Result.post['ClassID'] == "19f54fe2-dddf-e711-ad57-c74e1272e605" || data.Result.post['ClassID'] == "1af54fe2-dddf-e711-ad57-c74e1272e605"){
					if (token == '-1') {
						$("section").html("<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>");
						layer.confirm('您还不是vip会员哦，只有vip会员才能进去vip专区哦', {
								btn: ['是vip，去登录', '取消']
							},
							function () {
								layer.msg();
								$(".activespan").css("color", "black");
								$(".activespan").css("font-size", "22px");
								$(".grey").css("font-size", "17px");
								$(".grey").css("color", "#9a9a9a");
								$(".registerbox").hide();
								$(".loginbox").show();
								$('#myModal').modal('show');
							}
						)
					}else{
						$.ajax({
							type: "get",
							url: mainurl + "User/CheckMaster",
							data: {
								token: token
							},
							success: function (data) {
								if (data.Status == 40001) {
									layer.msg(data.Result, {
										icon: 5
									});
									setTimeout(
										againlogin, 2000);
								} else if (data.Status == -1) {
									$(".page-loader").addClass("loaded");
									$('#animate').addClass('fadeInLeftBig' + ' animated');
									setTimeout(removeClass, 1200);
									function removeClass() {
										$('#animate').removeClass('fadeInLeftBig' + ' animated');
									}
									$(".page-loader").addClass("loaded");
									$("section").html("<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>");
									layer.msg("您还不是管理员或版主哦，不能进入站务专区", {
										icon: 5
									});
									return;
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
					
				}
				$("#pinglun").click(function(){
					$("html, body").scrollTop($("body").outerHeight(true) - $(window).outerHeight(true));
				})
				//时间截转换
				var timeTrans = data.Result.post.Posttime.substring(0, 19);
				timeTrans = timeTrans.replace('T', ' ')
				$(".post-blog__meta-date").html(timeTrans);
				$(".post-blog__meta-look").html(data.Result.post.Hits); //浏览量
				$(".post-blog__meta-comments").html(data.Result.post.replies); //回复数
				$("#iconimage").attr("src", data.Result.post.icon); //头像
				$(".nickname").html(data.Result.post.author); //作者
				$("#Postnum").html(data.Result.post.Postnum); //发帖数
				$("#money").html(data.Result.post.money); //铜币
				$("#Rvrc").html(data.Result.post.Rvrc); //威望
				$("#credit").html(data.Result.post.credit); //贡献值
				if (data.Result.post.comment.length == 0) {
					$(".post-blog--single>h4").eq(0).html("暂无评论");
					$(".pagination-custom").hide();
					$(".comment-box").css("border-top", "none")
				} else {
					$(".post-blog--single>h4").eq(0).html(data.Result.post.replies + "条评论");
					for (var i = 0; i < data.Result.post.comment.length; i++) {
						replycom = "";
						content = decodeURIComponent(data.Result.post.comment[i]['content']);
						content = transform(content);
						for (var x = 0; x < data.Result.post.comment[i].commentReply.length; x++) {
							reply = data.Result.post.comment[i].commentReply[x];
							reply.Content = decodeURIComponent(reply.Content);
							reply.Content = transform(reply.Content);
							// replycom += "<div class='comment comment-reply'><div class='comment-top-panel'><h5 class='comment__author'><img src="+url+reply.Icon+" style='width:50px;height:50px;border-radius:50%;display:block'><span>"+reply.Username+"</span></h5><div class='comment__date'>"+reply.CreaTime+"</div></div></div>"

							replycom += "<div class='comment comment-reply'><div class='unit unit-xs-horizontal unit-sm-horizontal unit-md-horizontal unit-lg-horizontal'><div class='unit__left' id='pchide'><img src=" + url + reply.Icon + " style='width:50px;height:50px;border-radius:50%'></div><div class='unit__body'><div class='comment-top-panel'><img src=" + url + reply.Icon + " style='width:50px;height:50px;border-radius:50%'><h5 class='comment__author'>" + reply.Username + "</h5><div class='comment__date'>" + reply.CreaTime + "</div></div><p>" + reply.Content + "</p></div></div></div>"
						}
						commit += "<div class='comment'><div class='unit unit-xs-horizontal unit-sm-horizontal unit-md-horizontal unit-lg-horizontal'><div class='unit__left'><img src=" + data.Result.post.comment[i]['icon'] + " style='width:100px;height:100px;border-radius:50%'><h4>" + data.Result.post.comment[i]['author'] + "</h4><ul class='list-marked list-marked-variant-2'><li><span>发帖</span><span>" + data.Result.post.comment[i]['Postnum'] + "</span></li><li><span>铜币</span><span>" + data.Result.post.comment[i]['money'] + "</span></li><li><span>威望</span><span>" + data.Result.post.comment[i]['Rvrc'] + "</span></li><li><span>贡献值</span><span>" + data.Result.post.comment[i]['credit'] + "</span></li></ul></div><div class='unit__body'><div class='comment-top-panel'><h5 class='comment__author'><img src=" + data.Result.post.comment[i]['icon'] + " style='width:66px;height:66px;border-radius:50%'><span>" + data.Result.post.comment[i]['floor'] + "楼</span></h5><div class='comment__date'>" + data.Result.post.comment[i]['creatime'] + "</div></div><div class='contentdetail'><p>" + content + "</p></div>" + replycom + "<div class='comment__footer'><div class='comment-top-panel'><a class='comment__reply'>回复</a></div><div class='replybox fadeInDown animated row' style='display: none;'><div class='col-md-10'><textarea class='form-control' id='erea' rows='1' cols='10' onkeyup='changerow()'></textarea></div><div class='col-md-2'><button type='button' class='btn btn-warning replybtn' name=" + data.Result.post.comment[i]['ID'] + ">评论</button></div></div></div></div></div></div>"
					}
					$("#commentlist").html(commit)
				}
				if (isnew) {
					$('#animate').addClass('fadeInLeftBig' + ' animated');
					setTimeout(removeClass, 1200);

					function removeClass() {
						$('#animate').removeClass('fadeInLeftBig' + ' animated');
					}
				}
				$(".page-loader").addClass("loaded");
				$(".comment__reply").each(function () {
					$(this).click(function () {
						$(this).parents(".comment__footer").children(".replybox").show();
					})
				})
				$(".replybtn").each(function () {
					$(this).click(function () {
						if (token == -1) {
							$(".activespan").css("color", "black");
							$(".activespan").css("font-size", "22px");
							$(".grey").css("font-size", "17px");
							$(".grey").css("color", "#9a9a9a");
							$(".registerbox").hide();
							$(".loginbox").show();
							$('#myModal').modal('show');
							return;
						}
						if ($(this).parents('.col-md-2').parents('.replybox').children(".col-md-10").children("#erea").val() == "") {
							layer.msg("请输入评论内容", {
								icon: 5
							});
							return;
						}
						$.ajax({
							type: "post",
							url: mainurl + "BBS/CommentReply",
							data: {
								PostID: blogID,
								CommentID: $(this).attr('name'),
								Content: $(this).parents('.col-md-2').parents('.replybox').children(".col-md-10").children("#erea").val(),
								token: token,
								CommentImages: '-1'
							},
							success: function (data) {
								if (data.Status == 1) {
									layer.msg("评论成功", {
										icon: 1
									});
									pageNumber = 1;
									$(".replybox").val('')
									hqhf(1, false)
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
					})
				})
			} else {
				$(".page-loader").addClass("loaded");
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);

				function removeClass() {
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
				layer.msg(data.Result, {
					icon: 5
				});
				$(".page-loader").addClass("loaded");
				$("section").html("<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>");
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

window.onload = function () {
	$('#fenghui-pagination').pagination({
		pages: FenghuiPage,
		pageNumber: pageNumber,
		displayedPages: 3,
		edges: 3,
		currentPage: pageNumber,
		prevText: '<',
		nextText: '>',
		onPageClick: function (pageNumber, event) {
			hqhf(pageNumber, false);
		}
	});
}

function transform(str) {
	// str = str.replace(/</ig,'&lt;');
	// str = str.replace(/>/ig,'&gt;');
	str = str.replace(/\n/ig, '<br />');
	str = str.replace(/\[code\](.+?)\[\/code\]/ig, function ($1, $2) {
		return phpcode($2);
	});

	str = str.replace(/\[hr\]/ig, '<hr />');
	str = str.replace(/\[\/(size|color|font|backcolor)\]/ig, '</font>');
	str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '<$1>');
	str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '</$1>');
	str = str.replace(/\[\/align\]/ig, '</p>');
	str = str.replace(/\[(\/)?h([1-6])\]/ig, '<$1h$2>');

	str = str.replace(/\[align=(left|center|right|justify)\]/ig, '<p align="$1">');
	str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
	str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
	str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
	str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
	str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig, '<ol type="$1">$2</ol>');
	str = str.replace(/\[(\/)?list\]/ig, '<$1ul>');

	// str = str.replace(/\[s:(\d+)\]/ig,function($1,$2){ return smilepath($2);});
	str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig, '<img src="$1" border="0" />');
	str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">' + '$2' + '</a>');
	str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">' + '$1' + '</a>');
	str = str.replace(/\\n/g, "</br>");
	str = str.replace(/\\r/g, "</br>");
	str = str.replace(/\%/g, "%25");
	return str;
}

if (token == '-1') {
	$("#ReleasePost1").html("<div class='comment_form'><div class='form-wrap'><span>目前您尚未登录，请<a data-toggle='modal' data-target='#myModal' onclick='activespan()'>登录</a>或<a data-toggle='modal' data-target='#myModal' onclick='grey()'>注册</a>后进行评论</span></div></div>")
}

$("#bbscomment").click(function () {
	if (token == -1) {
		$(".activespan").css("color", "black");
		$(".activespan").css("font-size", "22px");
		$(".grey").css("font-size", "17px");
		$(".grey").css("color", "#9a9a9a");
		$(".registerbox").hide();
		$(".loginbox").show();
		$('#myModal').modal('show');
		return;
	}
	if (ue.getContent() == "") {
		layer.msg("请输入评论内容", {
			icon: 5
		});
		return;
	}
	$.ajax({
		type: "post",
		url: mainurl + "BBS/Comment",
		data: {
			subject: 1,
			content: encodeURIComponent(ue.getContent()),
			classID: blogID,
			token: token,
			CommentImages: '-1'
		},
		success: function (data) {
			if (data.Status == 1) {
				layer.msg(data.Result, {
					icon: 1
				});
				pageNumber = 1;
				ue.setContent(decodeURIComponent(""));
				hqhf(1, false);
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
})

// var rows=1;//根据文本框初始值设置。
// var cols=10;//根据文本框初始值设置。
// var num=0;
// function changerow(){
// 	num++;
// 	if(num==rows*cols-1){
// 		rows=rows+2;
// 		document.getElementById("erea").rows=rows;
// 	}
// }

$.ajax({
	type: "get",
	url: mainurl + "BBS/ModularList",
	data: {},
	success: function (data) {
		urllist = "";
		lasturllist = "";
		if (data.Status == 1) {
			for (var i = 0; i < data.Result.list.length; i++) {
				if (data.Result.list[i].Name !== thisurl) {
					urllist += "<div><a href='gallery-grid-1.html?id=" + data.Result.list[i].ID + "'>" + data.Result.list[i].Name + "</a></div>"
				} else {
					for (var a = 0; a < data.Result.list[i].PostClass.length; a++) {
						if (data.Result.list[i].PostClass[a].Name !== thisadd) {
							lasturllist += '<div><a href="forum.html?id=' + data.Result.list[i].PostClass[a].ID + '">' + data.Result.list[i].PostClass[a].Name + '</a></div>'
						}
					}
					$("#lasturl").html('<div class="tooltip bottom" role="tooltip" id="lasttip"><div class="tooltip-arrow"></div><div class="tooltip-inner" id="lastbox">' + lasturllist + '</div></div>' + thisadd + '</span><span class="caret">')
					$("#lasturl").on("click", function (e) {
						$("#lasttip").show();
						$(document).on("click touchstart", function () {
							$("#lasttip").hide();
						});
						e.stopPropagation();
					});
					$("#lasttip").on("click", function (e) {
						e.stopPropagation();
					});
					$("#lasttip").on("click", function (e) {
						e.stopPropagation();
					});
				}
				$("#firstbox").html(urllist)
			}
		} else {
			layer.msg(data.Result, {
				icon: 5
			});
		}
	},
})

$("#firsturl").on("click", function (e) {
	$("#firsttip").show();

	$(document).on("click touchstart", function () {
		$("#firsttip").hide();
	});

	e.stopPropagation();
});
$("#firsttip").on("click", function (e) {
	e.stopPropagation();
});
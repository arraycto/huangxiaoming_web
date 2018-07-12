		// var pageIndex = 1;
		// var isnew = false;
		$("#ReleasePost2").hide();
		$("#backbbs").hide();
		var ue = UE.getEditor('container');
		ue.ready(function () {
			ue.setContent(decodeURIComponent(""));
		})
		var blogID = location.href.split("id=")[1].split("#")[0];
		var pageNumber = location.href.split("page-")[1];
		//上级目录
		var thisurl = "";
		//本级目录
		var thisadd = "";
		if (pageNumber == undefined) {
			pageNumber = 1
		}
		var FenghuiPage = 1;
		$(function () {
			if (location.href.split("id=")[1].split("#")[0] == "19f54fe2-dddf-e711-ad57-c74e1272e605" || location.href.split("id=")[1].split("#")[0] == "1af54fe2-dddf-e711-ad57-c74e1272e605") {
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
							} else {
								hqhf(pageNumber, true);
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

			} else if (location.href.split("id=")[1].split("#")[0] == "29f54fe2-dddf-e711-ad57-c74e1272e605") {
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
								} else {
									hqhf(pageNumber, true);
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
			} else {
				hqhf(pageNumber, true);
			}
			modular();
		});
		var isnew = false
		//isnew判断是否是关键字搜索
		function hqhf(pageNumber, isnew) {
			if ($("#rd-search-form-input").val() == "") {
				Keyword = '-1'
				datalist = {
					ClassID: blogID,
					pageIndex: pageNumber,
					pageSize: 60,
				};
			} else {
				Keyword = $("#rd-search-form-input").val();
				datalist = {
					ClassID: blogID,
					pageIndex: pageNumber,
					pageSize: 60,
					Keyword: Keyword
				};
			}
			$.ajax({
				type: "GET",
				url: mainurl + "BBS/PostList",
				data: datalist,
				async: false,
				success: function (data) {
					if (data.Status == 1) {
						commit = "";
						jingcommit = "";
						topcommit = "";
						ggcommit = "";
						FenghuiPage = data.Result.page;
						if (data.Result.list.length == 0) {
							$(".pagination-custom").hide()
							commit = "<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>"
						} else {
							thisadd = data.Result.list[0]['ClassName']
							thisurl = data.Result.list[0]['ModularName']
							$(".pagination-custom").show()
							$(".text-sm-left>h3").html(thisadd)
							document.title = thisadd;

							for (var i = 0; i < data.Result.list.length; i++) {
								data.Result.list[i]['lasttime'] = data.Result.list[i]['lasttime'].substring(0, 10);
								data.Result.list[i]['postdate'] = data.Result.list[i]['postdate'].substring(0, 10);
								if (data.Result.list[i].digest == 4) {
									ggcommit += "<a class='offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm' id=" + data.Result.list[i]['ID'] + "><div class='unit__left'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__body'><p title='标题'><i class='gonggao'></i>" + data.Result.list[i]['sub'] + "</p><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__right'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><span class='post-blog__meta-comments' title='回复数'>" + data.Result.list[i]['replies'] + "</span></div><div class='unit__foot'><p title='最后回复人'>" + data.Result.list[i]['lastpeople'] + "</p><p title='最后回复时间' class='text-snow'>" + data.Result.list[i]['lasttime'] + "</p></div></a>"
								} else if (data.Result.list[i].digest == 0) {
									commit += "<a class='offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm' id=" + data.Result.list[i]['ID'] + "><div class='unit__left'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__body'><p title='标题'>" + data.Result.list[i]['sub'] + "</p><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__right'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><span class='post-blog__meta-comments' title='回复数'>" + data.Result.list[i]['replies'] + "</span></div><div class='unit__foot'><p title='最后回复人'>" + data.Result.list[i]['lastpeople'] + "</p><p title='最后回复时间' class='text-snow'>" + data.Result.list[i]['lasttime'] + "</p></div></a>"
								} else if (data.Result.list[i].digest == 1) {
									jingcommit += "<a class='offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm' id=" + data.Result.list[i]['ID'] + "><div class='unit__left'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__body'><p title='标题'><i class='jiajing'></i>" + data.Result.list[i]['sub'] + "</p><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__right'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><span class='post-blog__meta-comments' title='回复数'>" + data.Result.list[i]['replies'] + "</span></div><div class='unit__foot'><p title='最后回复人'>" + data.Result.list[i]['lastpeople'] + "</p><p title='最后回复时间' class='text-snow'>" + data.Result.list[i]['lasttime'] + "</p></div></a>"
								} else if (data.Result.list[i].digest == 2) {
									topcommit += "<a class='offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm' id=" + data.Result.list[i]['ID'] + "><div class='unit__left'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__body'><p title='标题'><i class='zhiding'></i>" + data.Result.list[i]['sub'] + "</p><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__right'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><span class='post-blog__meta-comments' title='回复数'>" + data.Result.list[i]['replies'] + "</span></div><div class='unit__foot'><p title='最后回复人'>" + data.Result.list[i]['lastpeople'] + "</p><p title='最后回复时间' class='text-snow'>" + data.Result.list[i]['lasttime'] + "</p></div></a>"
								} else if (data.Result.list[i].digest == 3) {
									topcommit += "<a class='offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm' id=" + data.Result.list[i]['ID'] + "><div class='unit__left'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__body'><p title='标题'><i class='zhiding'></i><i class='jiajing'></i>" + data.Result.list[i]['sub'] + "</p><p class='text-snow' title='发帖时间'>" + data.Result.list[i]['postdate'] + "</p></div><div class='unit__right'><span class='post-blog__meta-look' title='浏览数'>" + data.Result.list[i]['hits'] + "</span><span class='post-blog__footer-author' title='作者'>" + data.Result.list[i]['Username'] + "</span><span class='post-blog__meta-comments' title='回复数'>" + data.Result.list[i]['replies'] + "</span></div><div class='unit__foot'><p title='最后回复人'>" + data.Result.list[i]['lastpeople'] + "</p><p title='最后回复时间' class='text-snow'>" + data.Result.list[i]['lasttime'] + "</p></div></a>"
								}
							}
						}
						$(".tiezibox").html(ggcommit + topcommit + jingcommit + commit)
						if (isnew) {
							fenye();
							$('#animate').addClass('fadeInLeftBig' + ' animated');
							setTimeout(removeClass, 1200);

							function removeClass() {
								$('#animate').removeClass('fadeInLeftBig' + ' animated');
							}
						}
						$(".page-loader").addClass("loaded");
						$(".post-blog-sm>.unit__body").each(function () {
							$(this).click(function () {
								var bbsid = $(this).parents(".offset-top-30").attr("id");
								window.open("bbs-post.html?id=" + bbsid);
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

		function fenye() {
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

		$("#rd-search-form-input").change(function () {
			var a = $(this).attr('value');
			if ($(this).val() != a) {
				console.log("没改变")
			} else {
				isnew = false;
				pageIndex = 1;
			}
		})

		$("#postblog").click(function () {
			if (token == '-1') {
				$("#ReleasePost2").hide();
				$(".activespan").css("color", "black");
				$(".activespan").css("font-size", "22px");
				$(".grey").css("font-size", "17px");
				$(".grey").css("color", "#9a9a9a");
				$(".registerbox").hide();
				$(".loginbox").show();
				$('#myModal').modal('show');
			} else {
				$("#container").show();
				$("#ReleasePost2").show();
				if (ispc) {
					$("#backbbs").hide();
					$("html, body").scrollTop($("body").outerHeight(true) - $(window).outerHeight(true));
				} else {
					$("#backbbs").show();
					$("#select").hide();
					$(".pagination-custom").hide();
					$(".tiezibox").hide();
					$("header").hide();
					$("#ReleasePost2").css("margin-top", "-80px");
				}
			}
		})

		function backpost() {
			$("#backbbs").hide();
			$("#select").show();
			$(".pagination-custom").show();
			$(".tiezibox").show();
			$("header").show();
			$("#ReleasePost2").css("margin-top", "0");
		}


		function releasepost() {
			if (ue.getContent() == "") {
				layer.msg("请输入内容", {
					icon: 5
				});
				return;
			}
			if ($("#subject").val() == "") {
				layer.msg("请输入标题", {
					icon: 5
				});
				return;
			}
			if (blogID == "29f54fe2-dddf-e711-ad57-c74e1272e605") {
				if (!isvip) {
					layer.confirm('您还不是会员哦，无法进入vip专区', {
							btn: ['去开通', '取消']
						},
						function () {
							window.location.href = "user.html?vip=true";
						}
					)
					return;
				}
			}
			$.ajax({
				type: "post",
				url: mainurl + "BBS/ReleasePost",
				data: {
					subject: $("#subject").val(),
					content: encodeURIComponent(ue.getContent()),
					classID: blogID,
					token: getCookie("token")
				},
				success: function (data) {
					if (data.Status == 1) {
						layer.msg(data.Result, {
							icon: 1
						});
						if (!ispc) {
							backpost()
						}
						$("html, body").scrollTop(0);
						ue.setContent(decodeURIComponent(""));
						$("#subject").val('')
						hqhf(1, true)
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
		}

		document.onkeypress = function () {
			if (event.keyCode == 13) {
				pageNumber = 1;
				hqhf(1, true)
				return false;
			}
		}

		function modular() {
			$.ajax({
				type: "get",
				url: mainurl + "BBS/ModularList",
				data: {},
				async: false,
				success: function (data) {
					urllist = '';
					lasturllist = "";
					if (data.Status == 1) {
						for (var i = 0; i < data.Result.list.length; i++) {
							if (data.Result.list[i].Name !== thisurl) {
								urllist += '<li><a href="gallery-grid-1.html?id=' + data.Result.list[i].ID + '">' + data.Result.list[i].Name + '</a></li>'
							} else {
								for (var a = 0; a < data.Result.list[i].PostClass.length; a++) {
									if (data.Result.list[i].PostClass[a].Name !== thisadd) {
										lasturllist += '<li><a href="forum.html?id=' + data.Result.list[i].PostClass[a].ID + '">' + data.Result.list[i].PostClass[a].Name + '</li>'
									}
								}
							}
							$("#firstbox").html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + thisurl + ' <span class="caret"></span></a><ul class="dropdown-menu">' + urllist + '</ul>')
							if (lasturllist !== '') {
								$("#sencondbox").html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + thisadd + ' <span class="caret"></span></a><ul class="dropdown-menu">' + lasturllist + '</ul>')
							} else {
								$("#sencondbox").html(thisadd)
							}
							//给教主留言隐藏第三个路径
							// if (blogID == "14f54fe2-dddf-e711-ad57-c74e1272e605") {
							// 	 $("#sencondbox").hide()
							// }
						}
					} else {
						layer.msg(data.Result, {
							icon: 5
						});
					}
				},
			})
		}



		// $("#firsturl").on("click", function (e) {
		// 	$("#firsttip").show();

		// 	$(document).on("click touchstart", function () {
		// 		$("#firsttip").hide();
		// 	});

		// 	e.stopPropagation();
		// });
		// $("#firsttip").on("click", function (e) {
		// 	e.stopPropagation();
		// });
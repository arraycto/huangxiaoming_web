$.ajax({
	type: "get",
	url: mainurl + "BBS/ModularList",
	data: {},
	// async: false,
	success: function (data) {
		bbs = "";
		if (data.Status == 1) {
			for (var i = 0; i < data.Result.list.length; i++) {
				imagelist = "";
				if (data.Result.list[i].PostClass.length > 2) {
					for (var x = 0; x < 2; x++) {
						imagelist += "<img src=" + url + data.Result.list[i].PostClass[x].logo + " width='390' height='260'/>"
					}
				} else {
					for (var x = 0; x < data.Result.list[i].PostClass.length; x++) {
						imagelist += "<img src=" + url + data.Result.list[i].PostClass[x].logo + " width='390' height='260'/>"
					}
				}
				bbs += "<div class='cell-xs-12 cell-sm-6 cell-md-4 cell-lg-4' id=" + data.Result.list[i]['ID'] + "><div class='thumbnail-type-6'><a class='stack-coverflow'>" + imagelist + "<img src='" + url + "" + data.Result.list[i]['Imageb'] + "' width='390' height='260'></a><div class='caption'><h3>" + data.Result.list[i]['Name'] + "</h3></div></div></div>"
			}
			$(".range-60").html(bbs);
			$(".page-loader").addClass("loaded");
			$('#animate').addClass('fadeInLeftBig' + ' animated');
			setTimeout(removeClass, 1200);

			function removeClass() {
				$('#animate').removeClass('fadeInLeftBig' + ' animated');
			}
			$(".stack-coverflow").each(function () {
				$(this).click(function () {
					var blogid = $(this).parents(".cell-lg-4").attr("id");
					//教主专区
					if (blogid == "474f9b1c-9b2d-e811-8460-fc024f74c319") {
						window.location.href = "forum.html?id=14f54fe2-dddf-e711-ad57-c74e1272e605"
					}else if(blogid == "65d41637-9be0-e711-ad57-c74e1272e605"){
						if (token == "-1") {
							layer.confirm('只有管理员和版主才能进去站务专区哦', {
									btn: ['是管理员/版主，去登录', '取消']
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
										layer.msg("您还不是管理员或版主哦，不能进入站务专区", {
											icon: 5
										});
									}else{
										window.location.href = "gallery-grid-1.html?id=" + blogid;
									}
								}
							})
						}
						
					}
					else {
						window.location.href = "gallery-grid-1.html?id=" + blogid;
					}
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
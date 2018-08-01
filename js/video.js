	//分页操作
	imageID = location.href.split("id=")[1];
	$("#imageurl").html(decodeURIComponent(imageID))
	$(".text-sm-left>h3").html(decodeURIComponent(imageID))
	document.title = decodeURIComponent(imageID);
	var pageNumber = 1;
	var height = "";
	var height1 = "";
	isfirst = true;

	function first(pageNumber) {
		$.ajax({
			type: "get",
			url: mainurl + "XmImage/GetVideoList",
			async: false,
			data: {
				pageIndex: pageNumber,
				pageSize: 999,
				classid: decodeURIComponent(imageID)
			},
			success: function (data) {
				if (data.Status == 1) {
					smlist = '';
					biglist = '';
					urllist = '';
					if (data.Result.IsNext == false) {
						$("#showmore").hide();
					}
					if (isfirst == 1) {
						for (var i = 0; i < data.Result.List.length; i++) {
							smlist += "<div class='col-xs-12 col-sm-6 col-lg-4 isotope-item' data-filter=" + data.Result.List[i].ClassID + " id=" + data.Result.List[i].ID + "><div class='thumbnail-type-4' data-lightgallery='item' data-lg-skin='lg-skin-center' data-poster=" + data.Result.List[i]['CoverImage'] + " data-html=#" + data.Result.List[i]['ID'] + "><div class='thumbnail-img'><div class='thumbnail-play-icon'></div><img src=" + data.Result.List[i]['CoverImage'] + " style='width:100%;' class='imghei'></div><div class='caption'><h4>" + data.Result.List[i]['Title'] + "</h4></div></div></div>"
						}
					} else {
						height1 += 'px';
						for (var i = 0; i < data.Result.List.length; i++) {
							smlist += "<div class='col-xs-12 col-sm-6 col-lg-4 isotope-item' data-filter=" + data.Result.List[i].ClassID + " id=" + data.Result.List[i].ID + "><div class='thumbnail-type-4' data-lightgallery='item' data-lg-skin='lg-skin-center' data-poster=" + data.Result.List[i]['CoverImage'] + " data-html=#" + data.Result.List[i]['ID'] + "><div class='thumbnail-img'><div class='thumbnail-play-icon'></div><img src=" + data.Result.List[i]['CoverImage'] + " style='width:100%;height:" + height1 + "' class='imghei'></div><div class='caption'><h4>" + data.Result.List[i]['Title'] + "</h4></div></div></div>"
						}
					}
					$("#videolist").html(smlist);
					height = $(".isotope-item").eq(0).width();
					height1 = height / 3 * 2;
					$(".imghei").css('height', height1)
					$(".page-loader").addClass("loaded");
					$('#animate').addClass('fadeInLeftBig' + ' animated');
					setTimeout(removeClass, 1200);

					function removeClass() {
						$('#animate').removeClass('fadeInLeftBig' + ' animated');
					}
					$(".isotope-item").each(function () {
						$(this).click(function () {
							var videoid = $(this).attr("id")
							$.ajax({
								type: "get",
								url: mainurl + "XmImage/VideoDetail",
								data: {
									id: videoid,
								},
								success: function (data) {
									if (data.Status == 1) {
										var audio = document.getElementById('mymusic');
										if (audio !== null) {
											audio.pause(); // 暂停
										}
										detail = "<div id=" + videoid + " style='display:none;'><video class='lg-video-object lg-html5 video-js vjs-default-skin' controls=''><source src=" + data.Result.VideoUrl + " type='video/mp4'></video></div>";
										$("#videourl").html(detail)
									} else {
										swal(data.Result)
									}
								}
							})
						})
					})


				} else {
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

	first(1);

	$("#showmore").click(function () {
		pageNumber++;
		liid = $(".active").parent("li").index();
		isfirst = false;
		first(pageNumber);
		// $.getScript('js/core.min.js',function(){
		// 	$.getScript('js/script.js',function(){
		// 	})
		// })
	})

	window.onresize = function () {
		changeDivHeight();
	}

	function changeDivHeight() {
		height = $(".imghei").eq(0).width();
		height1 = height / 3 * 2;
		$(".imghei").css('height', height1)
	}
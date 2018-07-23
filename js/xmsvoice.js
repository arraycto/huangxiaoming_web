function first(){
	StrarTime = $("#starttime").val();
	EndTime = $("#endtime").val();
	if(StrarTime == ''){
		StrarTime = '-1'
	}
	if(EndTime == ''){
		EndTime = '-1'
	}
	$.ajax({
		type:"post",
		url: mainurl+"Information/GetMessage",
		async:false,
		data:{
			StrarTime:-1,
			EndTime:-1,
		},
		success:function(data){
			if(data.Status == 1){
				message = "";
				time = "";
				time = "<li><span></span>"+data.Result[0]['Time']+"</li>";
				if (data.Result[0].Type == 1) {
					message += "<div class='slideBox'><h3>"+decodeURIComponent(data.Result[0]['Content'])+"<div class='title-h-in'><span class='color_vice color_span'></span><div class='simpline bg_simpline' style='width:80%'></div></div></h3></div>"
				}else if(data.Result[0].Type == 2){
					message += "<div class='slideBox'><div class='title-h-in'><h3 class='color_main color_h'>"+decodeURIComponent(data.Result[0].Content)+"</h3><span class='color_vice color_span'></span><div class='simpline bg_simpline'></div></div><p><video class='lg-video-object lg-html5 video-js vjs-default-skin' controls='' style='width:100%;' poster='images/活动/微信图片_20171109093946.jpg'><source src="+data.Result[0]['Url']+" type='video/mp4'>您的浏览器不支持HTML5video标签</video></p></div>"
				}
				for (var i = 1; i < data.Result.length; i++) {
					if (data.Result[i].Type == 1) {
						message += "<div class='slideBox' style='display: none;'><h3>"+decodeURIComponent(data.Result[i]['Content'])+"</h3><div class='title-h-in'><span class='color_vice color_span'></span><div class='simpline bg_simpline' style='width:80%'></div></div></div>"
					}else if(data.Result[i].Type == 2){
						message += "<div class='slideBox' style='display: none;'><div class='title-h-in'><h3 class='color_main color_h'>"+decodeURIComponent(data.Result[i].Content)+"</h3><span class='color_vice color_span'></span><div class='simpline bg_simpline'></div></div><p><video class='lg-video-object lg-html5 video-js vjs-default-skin' controls='' style='width:100%;' poster='images/活动/微信图片_20171109093946.jpg'><source src="+data.Result[i]['Url']+" type='video/mp4'>您的浏览器不支持HTML5video标签</video></p></div>"
					}
					time += "<li><span></span>"+data.Result[i]['Time']+"</li>"
				}
				console.log(time)
				$("#timelist>ul").html(time);
				$(".parBd").html(message)
				$("#timelist>ul>li:first").addClass("act")
				$.getScript('js/jquery.SuperSlide2.1.2.js',function(){
				})
				jQuery(".event_box").slide({ titCell: ".parHd li", mainCell: ".parBd", defaultPlay: false, titOnClassName: "act", prevCell: ".sPrev", nextCell: ".sNext" });
				jQuery(".parHd").slide({ mainCell: " ul", vis: 2, effect: "leftLoop", defaultPlay: false, prevCell: ".sPrev", nextCell: ".sNext" });
				$(".page-loader").addClass("loaded");
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);
				function removeClass(){
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
			}else{
				$(".page-loader").addClass("loaded");
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);
				function removeClass(){
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
				layer.msg(data.Result, {
					icon: 5
				});
				$(".page-loader").addClass("loaded");
				$("section").html("<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>");
			}
		},
		error: function(){
			$(".page-loader").addClass("loaded");
			$('#animate').addClass('fadeInLeftBig' + ' animated');
			setTimeout(removeClass, 1200);
			function removeClass(){
				$('#animate').removeClass('fadeInLeftBig' + ' animated');
			}
			$("section").html("");
			layer.msg('服务器异常', {
				icon: 5
			});
		}
	})
}
if (token == -1) {
	layer.confirm('登录后才能进入该板块哦', {
		btn: ['去登录', '取消']
	},
	function () {
		layer.closeAll('dialog');
		againlogin()
	}
)
}else{
	first();
}

setInterval(
	listen
, 1500);

function listen() {
	/*
	实时监控是否切换了时间轴
	判断css是否为none。然后把对应的标签放进数组中。
	*/
	var slide = $(".slideBox")
	// 每次调用都为空
	/*
	isArr:当前播放页数组
	noArr:已经隐藏页数组	
	*/
	var isArr = []
	var noArr = []
	$.each(slide, function (i, s) {
		if ($(slide[i]).css("display") != 'none') {
			var divVideo = $($(slide[i]).children()[0])//包裹video标签的div
			var videoDom = $(divVideo[0]).children()[0]//video标签

			isArr.push(videoDom)
		} else {
			var divVideo = $($(slide[i]).children()[0])
			var videoDom = $(divVideo[0]).children()[0]
			if (videoDom.tagName == 'H3') {
				var video = $($(videoDom).parents(".title-h-in").parents(".slideBox").children("p")).children()[0]
				noArr.push(video)
			}
		}
	});
	// 
	$.each(isArr, function (i) {
		// isArr[i].play()//自动播放，此处不用
	})
	$.each(noArr, function (i) {
		noArr[i].pause()//暂停播放
	})
  }

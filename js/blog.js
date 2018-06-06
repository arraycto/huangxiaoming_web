var boxlist = new Array();
var firstlist = new Array();
$.ajax({
	type:"get",
	url: mainurl+"Information/GetNewsOrActivites",
	async: false,
	data:{
		pageIndex:1,
		pageSize:999,
		type:2,
	},
	success:function(data){
		if(data.Status==1){
			message = "";
			let firstnum = 0;
			bigmessage = "";
			time = "";
			for (let i = 0; i < data.Result.List.length; i++) {
				if(data.Result.List[i]['Time'].substring(0,data.Result.List[i]['Time'].length-3) == data.Result.TimeList[0]['Time']){
					firstnum++;
					firstlist.push(i);
				}
			}
			if (firstnum == 1) {
				if (data.Result.List[firstlist[0]]['IsOnline']) {
					message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[0]]['ID']+"><p>"+data.Result.List[firstlist[0]]['Time'].substring(5,data.Result.List[firstlist[0]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[0]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[0]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><div style='position:relative'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><img class='img-right' src="+data.Result.List[firstlist[0]]['Display_Image']+"></div></div></div></div>";
				}else{
					message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[0]]['ID']+"><p>"+data.Result.List[firstlist[0]]['Time'].substring(5,data.Result.List[firstlist[0]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[0]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[0]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[firstlist[0]]['Display_Image']+"></div></div></div>";
				}
			}else{
				if (firstnum % 2 == 0) {
					for (let i = 0; i < firstlist.length; i = i+2) {
						if (data.Result.List[firstlist[i]]['IsOnline']) {
							message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[i]]['ID']+"><p>"+data.Result.List[firstlist[i]]['Time'].substring(5,data.Result.List[firstlist[i]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><div style='position:relative'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><img class='img-right' src="+data.Result.List[firstlist[i]]['Display_Image']+"></div></div></div></div><div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-left' src="+data.Result.List[firstlist[i+1]]['Display_Image']+"></div><div class='cell-sm-6 cell-lg-6'><span class='text-box text-right' id="+data.Result.List[firstlist[i+1]]['ID']+"><p>"+data.Result.List[firstlist[i+1]]['Time'].substring(5,data.Result.List[firstlist[i+1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i+1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i+1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div></div></div>"
						}else{
							message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[i]]['ID']+"><p>"+data.Result.List[firstlist[i]]['Time'].substring(5,data.Result.List[firstlist[i]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[firstlist[i]]['Display_Image']+"></div></div></div><div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-left' src="+data.Result.List[firstlist[i+1]]['Display_Image']+"></div><div class='cell-sm-6 cell-lg-6'><span class='text-box text-right' id="+data.Result.List[firstlist[i+1]]['ID']+"><p>"+data.Result.List[firstlist[i+1]]['Time'].substring(5,data.Result.List[firstlist[i+1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i+1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i+1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div></div></div>"
						}
					}
				}else{
					for (let i = 0; i < firstlist.length-1; i = i+2) {
						if (data.Result.List[firstlist[i]]['IsOnline']) {
							message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[i]]['ID']+"><p>"+data.Result.List[firstlist[i]]['Time'].substring(5,data.Result.List[firstlist[i]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><div style='position:relative'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><img class='img-right' src="+data.Result.List[firstlist[i]]['Display_Image']+"></div></div></div></div><div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-left' src="+data.Result.List[firstlist[i+1]]['Display_Image']+"></div><div class='cell-sm-6 cell-lg-6'><span class='text-box text-right' id="+data.Result.List[firstlist[i+1]]['ID']+"><p>"+data.Result.List[firstlist[i+1]]['Time'].substring(5,data.Result.List[firstlist[i+1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i+1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i+1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div></div></div>"
						}else{
							message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[i]]['ID']+"><p>"+data.Result.List[firstlist[i]]['Time'].substring(5,data.Result.List[firstlist[i]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[firstlist[i]]['Display_Image']+"></div></div></div><div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-left' src="+data.Result.List[firstlist[i+1]]['Display_Image']+"></div><div class='cell-sm-6 cell-lg-6'><span class='text-box text-right' id="+data.Result.List[firstlist[i+1]]['ID']+"><p>"+data.Result.List[firstlist[i+1]]['Time'].substring(5,data.Result.List[firstlist[i+1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[i+1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[i+1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div></div></div>"
						}
					}
					var index = Number(firstlist.length)-Number(1);
					if (data.Result.List[index]['IsOnline']) {
						message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[firstlist.length-1]]['ID']+"><p>"+data.Result.List[firstlist[firstlist.length-1]]['Time'].substring(5,data.Result.List[firstlist[firstlist.length-1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[firstlist.length-1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[firstlist.length-1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><div style='position:relative'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><img class='img-right' src="+data.Result.List[firstlist[firstlist.length-1]]['Display_Image']+"></div></div></div></div>";
					}else{
						message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[firstlist[firstlist.length-1]]['ID']+"><p>"+data.Result.List[firstlist[firstlist.length-1]]['Time'].substring(5,data.Result.List[firstlist[firstlist.length-1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[firstlist[firstlist.length-1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[firstlist[firstlist.length-1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[firstlist[firstlist.length-1]]['Display_Image']+"></div></div></div>";
					}
				}
			}
			bigmessage = "<div class='slideBox'>"+message+"</div>"
			data.Result.List[0]['Time'] = data.Result.List[0]['Time'].replace('-','.').replace('-','.')
			time = "<li class='act'><span></span>"+data.Result.List[0]['Time'].substring(0,data.Result.List[0]['Time'].length-3)+"</li>";
			for (let i = 1; i < data.Result.TimeList.length; i++) {
				time += "<li><span></span>"+data.Result.TimeList[i]['Time'].replace('-','.')+"</li>"
			}

			for (let x = 1; x < data.Result.TimeList.length; x++) {
				message = "";
				let num = 0;
				boxlist = [];
				var timemouth = data.Result.TimeList[x]['Time'];
				for (let i = 1; i < data.Result.List.length; i++) {
					if(data.Result.List[i]['Time'].substring(0,data.Result.List[i]['Time'].length-3) == timemouth){
						num ++;
						boxlist.push(i);
					}
				}
				if (num == 1) {
					message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[0]['ID']+"><p>"+data.Result.List[boxlist[0]]['Time'].substring(5,data.Result.List[boxlist[0]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[boxlist[0]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[boxlist[0]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[boxlist[0]]['Display_Image']+"></div></div></div>";
				}else{
					if (num % 2 == 0) {
						for (let i = 0; i < boxlist.length; i = i+2) {
							message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[boxlist[i]]['ID']+"><p>"+data.Result.List[boxlist[i]]['Time'].substring(5,data.Result.List[boxlist[i]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[boxlist[i]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[boxlist[i]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[boxlist[i]]['Display_Image']+"></div></div></div><div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-left' src="+data.Result.List[boxlist[i+1]]['Display_Image']+"></div><div class='cell-sm-6 cell-lg-6'><span class='text-box text-right' id="+data.Result.List[boxlist[i+1]]['ID']+"><p>"+data.Result.List[boxlist[i+1]]['Time'].substring(5,data.Result.List[boxlist[i+1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[boxlist[i+1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[boxlist[i+1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div></div></div>"
						}
					}else{
						for (let i = 0; i < boxlist.length-1; i = i+2) {
							message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[boxlist[i]]['ID']+"><p>"+data.Result.List[boxlist[i]]['Time'].substring(5,data.Result.List[boxlist[i]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[boxlist[i]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[boxlist[i]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[boxlist[i]]['Display_Image']+"></div></div></div><div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-left' src="+data.Result.List[boxlist[i+1]]['Display_Image']+"></div><div class='cell-sm-6 cell-lg-6'><span class='text-box text-right' id="+data.Result.List[boxlist[i+1]]['ID']+"><p>"+data.Result.List[boxlist[i+1]]['Time'].substring(5,data.Result.List[boxlist[i+1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[boxlist[i+1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[boxlist[i+1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div></div></div>"
						}
						message += "<div class='shell'><div class='range range-xs-center range-md-left'><div class='cell-sm-6 cell-lg-6 col-right'><span class='text-box' id="+data.Result.List[boxlist[boxlist.length-1]]['ID']+"><p>"+data.Result.List[boxlist[boxlist.length-1]]['Time'].substring(5,data.Result.List[boxlist[boxlist.length-1]]['Time'].length).replace('-','/')+"&nbsp;&nbsp;&nbsp;"+data.Result.List[boxlist[boxlist.length-1]]['Address']+"</p><div class='title-h-in'><p class='color_main color_h'>"+data.Result.List[boxlist[boxlist.length-1]]['Title']+"</p><div class='simpline bg_simpline'></div></div></span></div><div class='cell-sm-6 cell-md-6 cell-lg-6'><img class='img-right' src="+data.Result.List[boxlist[boxlist.length-1]]['Display_Image']+"></div></div></div>";
					}
				}
				bigmessage += "<div class='slideBox' style='display: none;'>"+message+"</div>"
			}
			$("#timelist>ul").html(time);
			$(".parBd").html(bigmessage)
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
			$(".text-box").mouseenter(function(){
				$(".text-box>p").css("color","#B88E42");
				$(".color_main").css("color","#B88E42");
			});
			$(".text-box").mouseleave(function(){
				$(".text-box>p").css("color","#3f3f3f");
				$(".color_main").css("color","#3f3f3f");
			});
			$(".text-box").each(function(){
				$(this).click(function(){
					var blogid = $(this).attr("id")
					window.open("blog-post.html?id="+blogid);
				})
			})
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



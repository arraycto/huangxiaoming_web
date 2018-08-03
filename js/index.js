
if (ispc) {
	type = 0;
} else {
	type = 2
}
$.ajax({
	type:"get",
	url: mainurl+"Home/Info",
	async: false,
	data:{
		pageIndex:1,
		pageSize:5,
		type:type
	},
	success:function(data){
		if(data.Status==1){
			bannerlist = "";
			acth3 = "";
			newh3 = "";
			tiph3 = "";
			actlist = "";
			newlist = "";
			tiplist = "";
			for (var i = 0; i < data.Result.Banner.length; i++) {
				bannerlist += "<div class='swiper-slide'><div class='swiper-slide-cover' style='background: url(&quot;"+data.Result.Banner[i]['Image']+"&quot;) center; background-size: cover;'></div></div>";
			}
			$(".hero__back").css("background","url(&quot;"+data.Result.Banner[0]['Image']+"&quot;) center; background-size: cover")
			$(".swiper-wrapper").html(bannerlist)
			//最新活动                                                           
			for (var i = 0; i < data.Result.Activity.length; i++) {
				if (data.Result.Activity[i]['Title'].length>10) {
					data.Result.Activity[i]['Title'] = data.Result.Activity[i]['Title'].substring(0,10)
					data.Result.Activity[i]['Title'] += "..."
				}
				acth3 = "<h3 class='stack-title'><a href='#' data-text='最新活动'><span>最新活动</span></a><span class='icon-cursor'></span>"
				if (!data.Result.Activity[i]['IsOnline']) {
					actlist += "</h3><div class='item' id="+data.Result.Activity[i]['ID']+"><div class='item__content'><div class='item__content--inner'><div class='thumbnail-type-2'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-img'><img src="+data.Result.Activity[i]['Display_Image']+" width='770' height='493'></a></li></ul><div class='caption-2'><dl class='list-terms-2'><dt>"+data.Result.Activity[i]['Title']+"</dt></dl><dl class='list-terms-2'><dt>地点</dt><dd>"+data.Result.Activity[i]['Address']+"</dd></dl><dl class='list-terms-2'><dt>时间</dt><dd>"+data.Result.Activity[i]['Time']+"</dd></dl></div></div></div></div></div>";
				}else{
					actlist += "</h3><div class='item' id="+data.Result.Activity[i]['ID']+"><div class='item__content'><div class='item__content--inner'><div class='thumbnail-type-2'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-img'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><img src="+data.Result.Activity[i]['Display_Image']+" width='770' height='493' style='position:unset'></a></li></ul><div class='caption-2'><dl class='list-terms-2'><dt>"+data.Result.Activity[i]['Title']+"</dt></dl><dl class='list-terms-2'><dt>地点</dt><dd>"+data.Result.Activity[i]['Address']+"</dd></dl><dl class='list-terms-2'><dt>时间</dt><dd>"+data.Result.Activity[i]['Time']+"</dd></dl></div></div></div></div></div>";
				}
			}
			$("#activelist").html(acth3+actlist)
			//最新资讯
			for (var i = 0; i < data.Result.News.length; i++) {
				if (data.Result.News[i]['Title'].length>10) {
					data.Result.News[i]['Title'] = data.Result.News[i]['Title'].substring(0,10)
					data.Result.News[i]['Title'] += "..."
				}
				newh3 = "<h3 class='stack-title'><a href='#' data-text='最新资讯'><span>最新资讯</span></a><span class='icon-cursor'></span>"
				newlist += "</h3><div class='item' id="+data.Result.News[i]['ID']+"><div class='item__content'><div class='item__content--inner'><div class='thumbnail-type-2'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-img'><img src="+data.Result.News[i]['Display_Image']+" width='770' height='493'/></a></li></ul><div class='caption-2'><dl class='list-terms-2'><dt>"+data.Result.News[i]['Title']+"</dt></dl><dl class='list-terms-2'><dt>地点</dt><dd>"+data.Result.News[i]['Address']+"</dd></dl><dl class='list-terms-2'><dt>时间</dt><dd>"+data.Result.News[i]['Time']+"</dd></dl></div></div></div></div></div>"
			}
			$("#newslist").html(newh3+newlist)
			//最新行程
			bigmessage = "";
			time = "";
			$("#tipimg").attr("src",data.Result.Trip[0]['Display_Image'])
			if (data.Result.TimeList[0].Time[5] == 0) {
				time1 = data.Result.TimeList[0].Time.substring(6,data.Result.TimeList[0].Time.length)
			}else{
				time1 = data.Result.TimeList[0].Time.substring(5,data.Result.TimeList[0].Time.length)
			}
			time = "<li><a href='#0' data-date='01/12/2013' class='selected'>"+time1+"月</a></li>"
			firstmessage = "";
			firstboxlist = [];
			for (var i = 0; i < data.Result.Trip.length; i++) {
				if(data.Result.Trip[i]['Time'].substring(0,data.Result.Trip[i]['Time'].length-3) == data.Result.TimeList[0]['Time']){
					firstboxlist.push(i);
				}
			}
			for (var i = 0; i < firstboxlist.length; i++) {
				if (data.Result.Trip[firstboxlist[i]].IsOnline) {
					firstmessage += '<li class="selected" data-date="01/12/2013"><div class="selectedbox thumbnail-type-2"><a class="thumbnail-img"><div class="tabletag"><div class="smalltag">(可报名)</div></div><div class="tripimage" id='+data.Result.Trip[firstboxlist[i]].ID+'><img src='+data.Result.Trip[firstboxlist[i]].Display_Image+'></div></a><div class="caption-2"><dl class="list-terms-2"><dt>'+data.Result.Trip[firstboxlist[i]].Title+'</dt></dl><dl class="list-terms-2"><dt>时间</dt><dd>'+data.Result.Trip[firstboxlist[i]].Time+'</dd></dl><dl class="list-terms-2"><dt>地点</dt><dd>'+data.Result.Trip[firstboxlist[i]].Address+'</dd></dl></div></div></li>'
				}else{
					firstmessage += '<li class="selected" data-date="01/12/2013"><div class="selectedbox thumbnail-type-2"><a class="thumbnail-img"><div class="tripimage" id='+data.Result.Trip[firstboxlist[i]].ID+'><img src='+data.Result.Trip[firstboxlist[i]].Display_Image+'></div></a><div class="caption-2"><dl class="list-terms-2"><dt>'+data.Result.Trip[firstboxlist[i]].Title+'</dt></dl><dl class="list-terms-2"><dt>时间</dt><dd>'+data.Result.Trip[firstboxlist[i]].Time+'</dd></dl><dl class="list-terms-2"><dt>地点</dt><dd>'+data.Result.Trip[firstboxlist[i]].Address+'</dd></dl></div></div></li>'
				}
			}
			for (var i = 1; i < data.Result.TimeList.length; i++) {
				a = Number(i)*2;
				if (data.Result.TimeList[i].Time[5] == 0) {
					time1 = data.Result.TimeList[i].Time.substring(6,data.Result.TimeList[i].Time.length)
				}else{
					time1 = data.Result.TimeList[i].Time.substring(5,data.Result.TimeList[i].Time.length)
				}
				time += "<li><a href='#0' data-date='01/0"+a+"/2014'>"+time1+"月</a></li>"
			}
			//行程
			for (var x = 1; x < data.Result.TimeList.length; x++) {
				message = "";
				a = Number(x)*2;
				boxlist = [];
				var timemouth = data.Result.TimeList[x]['Time']
				for (var i = 0; i < data.Result.Trip.length; i++) {
					if(data.Result.Trip[i]['Time'].substring(0,data.Result.Trip[i]['Time'].length-3) == timemouth){
						boxlist.push(i);
					}
				}
				for (var i = 0; i < boxlist.length; i++) {
					if (data.Result.Trip[boxlist[i]].IsOnline) {
						message += "<div class='selectedbox thumbnail-type-2'><a class='thumbnail-img'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><div class='tripimage' id="+data.Result.Trip[boxlist[i]].ID+"><img src="+data.Result.Trip[boxlist[i]].Display_Image+"></div></a><div class='caption-2'><dl class='list-terms-2'><dt>"+data.Result.Trip[boxlist[i]].Title+"</dt></dl><dl class='list-terms-2'><dt>时间</dt><dd>"+data.Result.Trip[boxlist[i]].Time+"</dd></dl><dl class='list-terms-2'><dt>地点</dt><dd>"+data.Result.Trip[boxlist[i]].Address+"</dd></dl></div></div>"
					}else{
						message += "<div class='selectedbox thumbnail-type-2'><a class='thumbnail-img'><div class='tripimage' id="+data.Result.Trip[boxlist[i]].ID+"><img src="+data.Result.Trip[boxlist[i]].Display_Image+"></div></a><div class='caption-2'><dl class='list-terms-2'><dt>"+data.Result.Trip[boxlist[i]].Title+"</dt></dl><dl class='list-terms-2'><dt>时间</dt><dd>"+data.Result.Trip[boxlist[i]].Time+"</dd></dl><dl class='list-terms-2'><dt>地点</dt><dd>"+data.Result.Trip[boxlist[i]].Address+"</dd></dl></div></div>"
					}
				}
				bigmessage += "<li data-date='01/0"+a+"/2014'>"+message+"</li>"
			}
			
			//结束
			$(".events>ol").html(time)
			$(".events-content>ol").html(firstmessage+bigmessage)
			// 点击详情
			$(".selectedbox>.thumbnail-img").each(function(){
				$(this).click(function(){
					var blogid = $(this).children(".tripimage").attr("id")
					window.location.href = "blog-post.html?id="+blogid;
				})
			})
			$("div#activelist .thumbnail-type-2").each(function(){
				$(this).click(function(){
					var blogid = $(this).parents(".item").attr("id")
					window.location.href = "tip-post.html?id="+blogid;
				})
			})
			$("div#newslist .thumbnail-type-2").each(function(){
				$(this).click(function(){
					var blogid = $(this).parents(".item").attr("id")
					window.location.href = "active-post.html?id="+blogid;
				})
			})
		}else{
			$(".page-loader").addClass("loaded");
			layer.msg(data.Result, {
				icon: 5
			});
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







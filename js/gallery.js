	//分页操作
	var pageNumber = 1;
	imageID = location.href.split("id=")[1];
	$("#imageurl").html(decodeURIComponent(imageID))
	$(".text-sm-left>h3").html(decodeURIComponent(imageID))
	document.title = decodeURIComponent(imageID);
	function first(pageNumber){
		$.ajax({
			type:"get",
			url: mainurl+"XmImage/GetPictureList",
			async: false,
			data:{
				pageIndex:pageNumber,
				pageSize:999,
				classid:decodeURIComponent(imageID)
			},
			success:function(data){
				if(data.Status==1){
					smlist = '';
					if (data.Result.IsNext == false) {
						$("#showmore").hide();
					}
					for (var i = 0; i < data.Result.List.length; i++) {
						smlist += "<div id="+data.Result.List[i]['ID']+" class='col-xs-12 col-sm-6 col-md-4 col-lg-3 isotope-item' data-filter="+data.Result.List[i].ClassID+"><div class='thumbnail-type-2'><div class='grid__item' data-size='886x590'><a class='thumbnail-type-1' data-lightgallery='group-item' data-sub-html='.lg-item-caption' href="+data.Result.List[i]['ImageUrl']+"><img src="+data.Result.List[i]['ImageUrl']+"><div class='thumbnail-caption'><h3>"+data.Result.List[i]['Title']+"</h3><div class='thumbnail-caption__footer'><span class='icon mdi mdi-eye'></span><span>"+data.Result.List[i]['Browse']+"</span></div></div></a></div></div></div>"
					} 
					$("#picturelist").append(smlist);
					$('#animate').addClass('fadeInLeftBig' + ' animated');
					setTimeout(removeClass, 1200);
					function removeClass(){
						$('#animate').removeClass('fadeInLeftBig' + ' animated');
					}
					$(".page-loader").addClass("loaded");
					$(".isotope-item").each(function(){
						$(this).click(function(){
							$.ajax({
								type:"get",
								url: mainurl+"XmImage/PictureDetail",
								data:{
									id:$(this).attr("id"),
								},
								success:function(data){
									if(data.Status==1){
										detail = "<h3>"+data.Result['Title']+"</h3><hr><p>"+data.Result['Brife']+"</p>";
										$(".description--preview").html(detail)
									}else{
										layer.msg(data.Result, {
											icon: 5
										});
									}
								},
								error: function(){
									layer.msg('服务器异常', {
										icon: 5
									});
								}
							})
						})
					})
				}else{
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

	first(1);

	$("#showmore").click(function(){
		pageNumber++;
		liid = $(".active").parent("li").index();
		first(pageNumber);
		// $.getScript('js/core.min.js',function(){
		// 	$.getScript('js/script.js',function(){
		// 	})
		// })
		
	})


//2

// var pageNumber=1;
// var classid = -1;
// function first(){
// 	smlist = '';
// 	$.ajax({
// 		type:"get",
// 		url: mainurl+"XmImage/GetPictureList",
// 		async: false,
// 		data:{
// 			pageIndex:1,
// 			pageSize:99999999,
// 			classid:-1
// 		},
// 		success:function(data){
// 			if(data.Status==1){
// 				classlist = "<li id='all'><a class='active' data-isotope-filter='*' data-isotope-group='gallery' href='#'><span class='link-inner'>全部</span></a></li>"
// 				for (var i = 0; i < data.Result.ClassList.length; i++) {
// 					classlist += "<li id="+data.Result.ClassList[i].ClassID+"><a data-isotope-filter="+data.Result.ClassList[i].ClassID+" data-isotope-group='gallery' href='#'><span class='link-inner'>"+data.Result.ClassList[i].ClassName+"</span></a></li>"
// 				}
// 				$("#isotope-filters").html(classlist);
// 				for (var i = 0; i < data.Result.List.length; i++) {
// 					data.Result.List[i]['ImageUrl'] = data.Result.List[i]['ImageUrl'].replace("localhost","192.168.1.112")
// 					smlist += "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 isotope-item' data-filter="+data.Result.List[i].ClassID+"><div class='thumbnail-type-2'><div class='grid__item' data-size='886x590'><a class='thumbnail-type-1' data-lightgallery='group-item' data-sub-html='.lg-item-caption' href="+data.Result.List[i]['ImageUrl']+"><img src="+data.Result.List[i]['ImageUrl']+"><div class='thumbnail-caption'><h3>"+data.Result.List[i]['Title']+"</h3><div class='thumbnail-caption__footer'><span class='icon mdi mdi-eye'></span><span>"+data.Result.List[i]['Browse']+"</span></div></div></a></div></div></div>"
// 				}
// 				$("#picturelist").html(smlist);
// 				$(".isotope-item").css("visibility","hidden"); 
// 				// $(".isotope-item").css("display","none"); 
// 				for (var i = 0; i < 2; i++) {
// 					$(".isotope-item").eq(i).css("visibility","");  
// 				}
// 				var resizeTimout;
// 					$("[data-isotope-filter]").on("click", function(e) {
// 						e.preventDefault();
// 						var filter = $(this);
// 						clearTimeout(resizeTimout);
// 						filter.parents(".isotope-filters").find('.active').removeClass("active");
// 						filter.addClass("active");
// 					}).eq(0).trigger("click")
// 			}else{
// 				swal(data.Result)
// 			}
// 		}
// 	})

// }

// first();

// $("#showmore").click(function(){
// 	pageNumber++;
// 	var showlist = pageNumber*2;
// 	for (var i = 0; i < showlist; i++) {
// 		$(".isotope-item").eq(i).css("visibility","");  
// 	}
// })

// var resizeTimout;
// $("[data-isotope-filter]").on("click", function(e) {
// 	e.preventDefault();
// 	var filter = $(this);
// 	clearTimeout(resizeTimout);
// 	filter.parents(".isotope-filters").find('.active').removeClass("active");
// 	filter.addClass("active");
// 	var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]');
// 			iso.isotope({
// 				itemSelector: '.isotope-item',
// 				layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
// 				filter: this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]'
// 			});
// 	classid = $(".active").parents("li").attr("id");
// 	if (classid == 'all') {
// 		classid = '-1';
// 	}
// 	pageNumber = 1;
// 	// second(classid)
// })

// function second(classid){
// 	smlist = "";
// 	$.ajax({
// 		type:"get",
// 		url: mainurl+"XmImage/GetPictureList",
// 		async: false,
// 		data:{
// 			pageIndex:1,
// 			pageSize:'99999999',
// 			classid:classid
// 		},
// 		success:function(data){
// 			if(data.Status==1){
// 				for (var i = 0; i < data.Result.List.length; i++) {
// 					data.Result.List[i]['ImageUrl'] = data.Result.List[i]['ImageUrl'].replace("localhost","192.168.1.112")
// 					smlist += "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 isotope-item' data-filter="+data.Result.List[i].ClassID+"><div class='thumbnail-type-2'><div class='grid__item' data-size='886x590'><a class='thumbnail-type-1' data-lightgallery='group-item' data-sub-html='.lg-item-caption' href="+data.Result.List[i]['ImageUrl']+"><img src="+data.Result.List[i]['ImageUrl']+"><div class='thumbnail-caption'><h3>"+data.Result.List[i]['Title']+"</h3><div class='thumbnail-caption__footer'><span class='icon mdi mdi-eye'></span><span>"+data.Result.List[i]['Browse']+"</span></div></div></a></div></div></div>"
// 				}
// 				$("#picturelist").html(smlist);
// 				$(".isotope-item").css("display","none");
// 				for (var i = 0; i < 2; i++) {
// 					$(".isotope-item").eq(i).css("display","block")
// 				}
// 			}else{
// 				swal(data.Result)
// 			}
// 		}
// 	})
// }

//show more会重新加载页面
// if (location.href.indexOf("size") > 0) {
// 	pagesize = location.href.split("size=")[1].split("&")[0];
// 	first(pagesize);
// }else{
// 	pagesize = 2;
// 	first(pagesize);
// }

// function first(pagesize){
// 	$.ajax({
// 		type:"get",
// 		url: mainurl+"XmImage/GetPictureList",
// 		async: false,
// 		data:{
// 			pageIndex:1,
// 			pageSize:pagesize,
// 			classid:-1
// 		},
// 		success:function(data){
// 			smlist = '';
// 			if(data.Status==1){
// 				if (data.Result.IsNext == false) {
// 					$("#showmore").hide();
// 				}
// 				classlist = "<li id='all'><a class='active' data-isotope-filter='*' data-isotope-group='gallery' href='#'><span class='link-inner'>全部</span></a></li>"
// 				for (var i = 0; i < data.Result.ClassList.length; i++) {
// 					classlist += "<li id="+data.Result.ClassList[i].ClassID+"><a data-isotope-filter="+data.Result.ClassList[i].ClassID+" data-isotope-group='gallery' href='#'><span class='link-inner'>"+data.Result.ClassList[i].ClassName+"</span></a></li>"
// 				}
// 				$("#isotope-filters").html(classlist);
// 				for (var i = 0; i < data.Result.List.length; i++) {
// 					data.Result.List[i]['ImageUrl'] = data.Result.List[i]['ImageUrl'].replace("localhost","192.168.1.112")
// 					smlist += "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 isotope-item' data-filter="+data.Result.List[i].ClassID+"><div class='thumbnail-type-2'><div class='grid__item' data-size='886x590'><a class='thumbnail-type-1' data-lightgallery='group-item' data-sub-html='.lg-item-caption' href="+data.Result.List[i]['ImageUrl']+"><img src="+data.Result.List[i]['ImageUrl']+"><div class='thumbnail-caption'><h3>"+data.Result.List[i]['Title']+"</h3><div class='thumbnail-caption__footer'><span class='icon mdi mdi-eye'></span><span>"+data.Result.List[i]['Browse']+"</span></div></div></a></div></div></div>"
// 				}
// 				$("#picturelist").html(smlist);
// 				if (location.href.indexOf("id") > 0) {
// 					id = location.href.split("id=")[1];
// 					var resizeTimout;
// 					$("[data-isotope-filter]").on("click", function(e) {
// 						e.preventDefault();
// 						var filter = $(this);
// 						clearTimeout(resizeTimout);
// 						filter.parents(".isotope-filters").find('.active').removeClass("active");
// 						filter.addClass("active");
// 					}).eq(id).trigger("click")
// 				}else{
// 					var resizeTimout;
// 					$("[data-isotope-filter]").on("click", function(e) {
// 						e.preventDefault();
// 						var filter = $(this);
// 						clearTimeout(resizeTimout);
// 						filter.parents(".isotope-filters").find('.active').removeClass("active");
// 						filter.addClass("active");
// 					}).eq(0).trigger("click")
// 				}
// 				// $('html,body').animate({scrollTop:$('footer').offset().top});
// 			}else{
// 				swal(data.Result)
// 			}
// 		}
// 	})
// }

// // window.onload = function(){
// //   var h = document.documentElement.scrollHeight || document.body.scrollHeight;
// //   window.scrollTo(h,h);
// // }

// $("#showmore").click(function(){
// 	pagesize = Number(pagesize)+2;
// 	var id = $(".active").parent("li").index();
// 	location.href="gallery-masonry-2.html?size="+pagesize+"&id="+id;
// })

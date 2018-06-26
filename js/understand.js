var tv = "";
var moive = "";
var music = "";
var act = "";
var tvnav = "";
var moivenav = "";
var musicnav = "";
var actnav = "";
var zynav = "";
$.ajax({
	type:"get",
	url: mainurl+"Sys/UnderstandXM",
	data:{},
	async: false,
	success:function(data){
		if(data.Status == 1){
			smlist = "";
			hreflist = "";
			tv = "";
			moive = "";
			music = "";
			act = "";
			zy = "";
			nav = "";
			for (var i = 0; i < data.Result.data.length; i++) {
				if (data.Result.data[i]['Type'] == 0) {
					smlist += "<li class='出演作品'><a href='#tabs-0-"+i+"' data-toggle='tab'>"+data.Result.data[i]['Title']+"</a></li>";
					hreflist += "<div class='tab-pane fade animated fadeInLeft' id='tabs-0-"+i+"'><div class='understandiframe'>"+decodeURIComponent(data.Result.data[i]['Detail'])+"</div></div>"
				}
				else if (data.Result.data[i]['Type'] == 1) {
					smlist += "<li class='所获荣誉'><a href='#tabs-1-"+i+"' data-toggle='tab'>"+data.Result.data[i]['Title']+"</a></li>";
					hreflist += "<div class='tab-pane fade animated fadeInLeft' id='tabs-1-"+i+"'><div class='understandiframe'>"+decodeURIComponent(data.Result.data[i]['Detail'])+"</div></div>"
				}else if (data.Result.data[i]['Type'] == 2) {
					smlist += "<li class='公益'><a href='#tabs-2-"+i+"' data-toggle='tab'>"+data.Result.data[i]['Title']+"</a></li>";
					hreflist += "<div class='tab-pane fade animated fadeInLeft' id='tabs-2-"+i+"'><div class='understandiframe'>"+decodeURIComponent(data.Result.data[i]['Detail'])+"</div></div>"
				}
			}
			for (var i = 0; i < data.Result.relist.length; i++) {
				if (data.Result.relist[i]['Action'] == null) {
					data.Result.relist[i]['Action'] = ""
				}
				if (data.Result.relist[i].Type == 0) {
					tv += "<div class='sly-item__wrapper'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-type-1'><img src="+data.Result.relist[i]['Image']+" alt='' width='500' height='300' id='voice'><div class='thumbnail-caption'><h3>"+data.Result.relist[i]['Title']+"</h3><p><span class='voicetype'>"+data.Result.relist[i]['Action']+"</span><span class='voicetime'>"+data.Result.relist[i]['Year']+"</span></p><div class='thumbnail-caption__footer twoline' style='margin-top:0;margin-left:0'><span class='briefText'>"+data.Result.relist[i]['Brief']+"</span></div><div class='thumbnail-caption__footer' style='cursor: pointer;'><span class='icon mdi mdi-eye'></span><span class='goto' id="+data.Result.relist[i]['Url']+">查看</span></div></div></a></li></ul></div>"
				}else if (data.Result.relist[i].Type == 1) {
					moive += "<div class='sly-item__wrapper'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-type-1'><img src="+data.Result.relist[i]['Image']+" alt='' width='500' height='300' id='voice'><div class='thumbnail-caption'><h3>"+data.Result.relist[i]['Title']+"</h3><p><span class='voicetype'>"+data.Result.relist[i]['Action']+"</span><span class='voicetime'>"+data.Result.relist[i]['Year']+"</span></p><div class='thumbnail-caption__footer twoline' style='margin-top:0;margin-left:0'><span class='briefText'>"+data.Result.relist[i]['Brief']+"</span></div><div class='thumbnail-caption__footer' style='cursor: pointer;'><span class='icon mdi mdi-eye'></span><span class='goto' id="+data.Result.relist[i]['Url']+">查看</span></div></div></a></li></ul></div>"
				}else if (data.Result.relist[i].Type == 2) {
					music += "<div class='sly-item__wrapper'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-type-1'><img src="+data.Result.relist[i]['Image']+" alt='' width='500' height='300' id='voice'><div class='thumbnail-caption'><h3>"+data.Result.relist[i]['Title']+"</h3><p><span class='voicetype'>"+data.Result.relist[i]['Drama']+"</span><span class='voicetime'>"+data.Result.relist[i]['Year']+"</span></p><div class='thumbnail-caption__footer twoline' style='margin-top:0;margin-left:0'><span class='briefText'>"+data.Result.relist[i]['Brief']+"</span></div><div class='thumbnail-caption__footer' style='cursor: pointer;'><span class='icon mdi mdi-eye'></span><span class='goto' id="+data.Result.relist[i]['Url']+">查看</span></div></div></a></li></ul></div>"
				}else if (data.Result.relist[i].Type == 3) {
					act += "<div class='sly-item__wrapper'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-type-1'><img src="+data.Result.relist[i]['Image']+" alt='' width='500' height='300' id='voice'><div class='thumbnail-caption'><h3>"+data.Result.relist[i]['Title']+"</h3><p><span class='voicetype'>"+data.Result.relist[i]['Drama']+"</span><span class='voicetime'>"+data.Result.relist[i]['Year']+"</span></p><div class='thumbnail-caption__footer twoline' style='margin-top:0;margin-left:0'><span class='briefText'>"+data.Result.relist[i]['Brief']+"</span></div><div class='thumbnail-caption__footer'></div></div></a></li></ul></div>"
				}else if (data.Result.relist[i].Type == 4) {
					zy += "<div class='sly-item__wrapper'><ul class='lightgallery-album' data-lightgallery='group'><li><a class='thumbnail-type-1'><img src="+data.Result.relist[i]['Image']+" alt='' width='500' height='300' id='voice'><div class='thumbnail-caption'><h3>"+data.Result.relist[i]['Title']+"</h3><p><span class='voicetype'>"+data.Result.relist[i]['Drama']+"</span><span class='voicetime'>"+data.Result.relist[i]['Year']+"</span></p><div class='thumbnail-caption__footer twoline' style='margin-top:0;margin-left:0'><span class='briefText'>"+data.Result.relist[i]['Brief']+"</span></div><div class='thumbnail-caption__footer' style='cursor: pointer;'><span class='icon mdi mdi-eye'></span><span class='goto' id="+data.Result.relist[i]['Url']+">查看</span></div></div></a></li></ul></div>"
				}

			}

			tvnav = '<div class="sly"><div class="sly--inner">'+tv+'</div></div><div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>'
			moivenav = '<div class="sly"><div class="sly--inner">'+moive+'</div></div><div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>'
			musicnav = '<div class="sly"><div class="sly--inner">'+music+'</div></div><div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>'
			actnav = '<div class="sly"><div class="sly--inner">'+act+'</div></div><div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>'
			zynav = '<div class="sly"><div class="sly--inner">'+zy+'</div></div><div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>'
			$(".sly-wrapper").html(moivenav)
			$(".nav-custom-tabs").eq(2).html(smlist);
			$("#smalltab").html(hreflist);
			$(".goto").each(function(){
				$(this).click(function(){
					var blogid = $(this).attr("id")
					window.open(blogid);
				})
			})
			$(".tab1>li").eq(0).addClass("active");
			$(".tab2>li").eq(0).addClass("active");
			$("#smalltab>div").eq(0).addClass("active in");
			$(".tab2>li").css("display","none");
			$(".出演作品").css("display","block")
			var first = data.Result.data[0].Title;
			var btn = $(".tab1 li");
			$("[class='"+first+"']").css("display","block");
			for(i = 0;i < btn.length;i++){
				btn[i].onclick = function(){
					if ($(this).attr('class') == 'active') {
						return;
					}
					for(j = 0;j < btn.length;j++){
						$(".tab2 li").css("display","none");
					}
					var conen = $(this).text();
					$("[class='"+conen+"']").css("display","block");
					$("[class='"+conen+"']").eq(0).css("border-top","none");
					$("[class='"+conen+"'] a").eq(0).trigger("click");
				}
			}
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


$("#moive").click(function(){
	$(".sly-wrapper").html(moivenav)
	slyinit()
})
$("#tv").click(function(){
	$(".sly-wrapper").html(tvnav)
	slyinit()
})
$("#act").click(function(){
	$(".sly-wrapper").html(actnav)
	slyinit()
})
$("#music").click(function(){
	$(".sly-wrapper").html(musicnav)
	slyinit()
})
$("#zy").click(function(){
	$(".sly-wrapper").html(zynav);
	slyinit()
})

function slyinit(){
	var $sly = $(".sly").sly({
		itemSelector: '.sly-item__wrapper',
		horizontal: 1,
		itemNav: 'basic',
		smart: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 0,
		scrollBar: $(".sly-wrapper").find('.scrollbar'),
		scrollBy: 1,
		activatePageOn: 'click',
		speed: 300,
		elasticBounds: 1,
		easing: 'easeOutExpo',
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1
	});
	$(".sly-wrapper .thumbnail-type-1").css("display","block");
	// $(".loading").hide()
	$window.on('resize', function(e) {
		$sly.sly('reload');
	});
	$(".goto").each(function(){
		$(this).click(function(){
			var blogid = $(this).attr("id")
			window.open(blogid);
		})
	})
}
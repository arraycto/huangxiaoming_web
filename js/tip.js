var pageNumber=1;
var FenghuiPage=1;
$(function(){
	hqhf(1);
});
function hqhf(pageNumber){
	$.ajax({
		type:"get",
		url: mainurl+"Information/GetNewsOrActivites",
		async: false,
		data:{
			pageIndex:pageNumber,
			pageSize:6,
			type:1,
		},
		success:function(data){
			if(data.Status==1){
				FenghuiPage = data.Result.Page;
				if (FenghuiPage <= 1) {
					$(".pagination-custom").css("visibility","hidden");
				}
				tip = "";
				for (var i = 0; i < data.Result.List.length; i++) {
					// data.Result.List[i]['Display_Image'] = data.Result.List[i]['Display_Image'].replace("localhost","192.168.1.112")
					if (data.Result.List[i]['IsOnline']&&!data.Result.List[i]['IsOnline']) {
						tip += "<div class='cell-md-4 cell-sm-6 cell-xs-10' id="+data.Result.List[i]['ID']+"><div class='post-blog'><div class='tabletag'><div class='smalltag'>(可报名)</div></div><div class='post-blog__media'><a><img src="+data.Result.List[i]['Display_Image']+" width='369' height='263' class='imghei'></a></div><div class='post-blog__body'><div class='post-blog__title'><a>"+data.Result.List[i]['Title']+"</a></div><div class='post-blog__meta'><div class='post-blog__meta-views'>"+data.Result.List[i]['Address']+"</div><div class='post-blog__meta-date'>"+data.Result.List[i]['Time']+"</div></div></div></div></div>"
					}
					else{
						tip += "<div class='cell-md-4 cell-sm-6 cell-xs-10' id="+data.Result.List[i]['ID']+"><div class='post-blog'><div class='post-blog__media'><a><img src="+data.Result.List[i]['Display_Image']+" width='369' height='263' class='imghei'></a></div><div class='post-blog__body'><div class='post-blog__title'><a>"+data.Result.List[i]['Title']+"</a></div><div class='post-blog__meta'><div class='post-blog__meta-views'>"+data.Result.List[i]['Address']+"</div><div class='post-blog__meta-date'>"+data.Result.List[i]['Time']+"</div></div></div></div></div>"
					}
				}
				$(".range-60").html(tip);
				$(".page-loader").addClass("loaded");
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);
				function removeClass(){
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
				height = $(".imghei").eq(0).width();
				height1 = height/3*2;
				$(".imghei").css('height',height1)
				$(".post-blog__media>a").each(function(){
					$(this).click(function(){
						var blogid = $(this).parents(".cell-xs-10").attr("id")
						window.location.href = "tip-post.html?id="+blogid;
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
}

window.onload=function(){
	$('#fenghui-pagination').pagination({
		pages: FenghuiPage,
		pageNumber:1,
		displayedPages: 3,
		edges:3,
		currentPage:1,
		// prevText: '<',
		// nextText: '>',
		onPageClick:function(pageNumber, event)
		{
			hqhf(pageNumber); 
		}
	});
}
window.onresize=function(){  
	changeDivHeight();  
} 

function changeDivHeight(){
	height = $(".imghei").eq(0).width();
	height1 = height/3*2;
	$(".imghei").css('height',height1)
}
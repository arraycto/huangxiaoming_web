var pageNumber=1;
var FenghuiPage=1;
$(function(){
	hqhf(1);
});
function hqhf(pageNumber){
	StrarTime = $("#starttime").val();
	EndTime = $("#endtime").val();
	if(StrarTime == ''){
		StrarTime = '-1'
	}
	if(EndTime == ''){
		EndTime = '-1'
	}
	$.ajax({
		type:"get",
		url: mainurl+"Information/GetNewsOrActivites",
		async: false,
		data:{
			strTime:StrarTime,
			endTime:EndTime,
			pageIndex:pageNumber,
			pageSize:6,
			type:0,
		},
		success:function(data){
			if(data.Status==1){
				FenghuiPage = data.Result.Page;
				if (FenghuiPage <= 1) {
					$(".pagination-custom").css("visibility","hidden");
				}
				tip = "";
				if (data.Result.List.length == 0) {
					tip = "<div class='shell' style='text-align:center;padding-top:80px;'><img src='images/kong.png'></div>"
					$(".grid-system-row").html(tip);
					return;
				}
				for (var i = 0; i < data.Result.List.length; i++) {
					data.Result.List[i]['Time'] = data.Result.List[i]['Time'].replace("-",".").replace("-",".")
					tip += "<div class='col-xs-12'><li><a class='news-item' href='active-post.html?id="+data.Result.List[i]['ID']+"'><img class='news-item-avatar' src="+data.Result.List[i]['Display_Image']+"><p id='pc-time' class='news-item-time'>"+data.Result.List[i]['Time']+"</p><div class='news-item-right'><p class='news-item-caption'>"+data.Result.List[i]['Title']+"</p><p class='news-item-brief'>"+data.Result.List[i]['Brief']+"</p><p id='phone-time' class='news-item-time'>"+data.Result.List[i]['Time']+"</p></div></a></li></div>"
				}
				$(".grid-system-row").html(tip);
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

window.onload=function(){
	$('#fenghui-pagination').pagination({
		pages: FenghuiPage,
		pageNumber:1,
		displayedPages: 3,
		edges:3,
		currentPage:1,
		onPageClick:function(pageNumber, event)
		{
			hqhf(pageNumber); 
		}
	});
}
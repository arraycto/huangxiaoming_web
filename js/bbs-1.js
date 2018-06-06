blogID = location.href.split("id=")[1];
// setCookie("bbsurl",blogID,'d10');
var index = '';
//本级目录
var thisurl = "";

$.ajax({
	type:"get",
	url: mainurl+"BBS/ModularList",
		// async: false,
		data:{},
		success:function(data){
			if(data.Status==1){
				tip = "";
				for (let i = 0; i < data.Result.list.length; i++) {
					if (data.Result.list[i]['ID'] == blogID) {
						index = i
					}
				}
				thisurl = data.Result.list[index]['Name']
				document.title = thisurl;
				$(".text-sm-left>h3").html(thisurl)
				// $("#lasturl").append(data.Result.list[index]['Name'])
				for (let i = 0; i < data.Result.list[index].PostClass.length; i++) {
					tip += "<div class='cell-md-4 cell-sm-6 cell-xs-10' id="+data.Result.list[index].PostClass[i]['ID']+"><div class='post-blog' style='display:block'><div class='post-blog__media'><a><img src="+url+data.Result.list[index].PostClass[i]['logo']+" class='imghei' style='width:100%;'></a></div><div class='post-blog__body'><div class='post-blog__title'><a>"+data.Result.list[index].PostClass[i]['Name']+"</a></div><div class='post-blog__meta'>"+data.Result.list[index].PostClass[i]['Descrip']+"</div></div></div></div>"
				}
				$("#bbsbox").html(tip);
				height = $(".cell-xs-10").eq(0).width();
				height1 = height/3*2;
				$(".imghei").css('height',height1)
				$(".thumbnail-type-3").each(function(){
					$(this).click(function(){
						var imageid = $(this).attr("id")
						window.location.href = "gallery-masonry-2.html?id="+imageid;
					})
				})
				//获取地址栏下拉菜单
				urllist = "";
				for (let i = 0; i < data.Result.list.length; i++) {
					if (data.Result.list[i].Name !== thisurl) {
						urllist += "<div><a href='gallery-grid-1.html?id="+data.Result.list[i].ID+"'>"+data.Result.list[i].Name+"</a></div>"
					}
					$("#firstbox").html(urllist)
					
				}$("#lasturl").append(""+thisurl+"<span class='caret'></span>")
				//获取地址栏下拉菜单结束
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);
				function removeClass(){
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
				$(".post-blog__media>a").each(function(){
					$(this).click(function(){
						var bbsid = $(this).parents(".cell-xs-10").attr("id");
						window.location.href = "forum.html?id="+bbsid;
					})
				})
				$(".page-loader").addClass("loaded");
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

window.onresize=function(){  
	changeDivHeight();  
} 

function changeDivHeight(){
	height = $(".imghei").eq(0).width();
	height1 = height/3*2;
	$(".imghei").css('height',height1)
}
$("#lasturl").on("click", function(e){
	$("#firsttip").show();

	$(document).on("click touchstart", function(){
		$("#firsttip").hide();
	});

	e.stopPropagation();
});
$("#firsttip").on("click", function(e){
	e.stopPropagation();
});

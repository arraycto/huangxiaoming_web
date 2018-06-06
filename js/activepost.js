	
var commit = "";
var pageIndex = 1;

blogID = location.href.split("id=")[1];
function first(){
	other = "";
	news = "";
	tips = "";
	imagelist = ""
	videolist = "";
	$.ajax({
		type:"post",
		url: mainurl+"Home/GetDetail",
		data:{
			ID:blogID,
			pageIndex:pageIndex,
			pageSize:5,
			token:token
		},
		async:false,
		success:function(data){
			if(data.Status==1){
				$(".post-blog--single>h3").html(data.Result.Title);
				$(".post-blog__meta-views").html(data.Result.Address);
				$("#datail").html(decodeURIComponent(data.Result.Details));
				$(".post-blog__meta-date").html(data.Result.Time.substring(0,10));
				if (data.Result.Eva.length == 0) {
					$("#conmentnum").eq(0).html("暂无评论");
					$(".comment-box").css("border-top","none")
				}else{
					$("#conmentnum").eq(0).html(data.Result.EvaCount+"条评论");
					for (let i = 0; i < data.Result.Eva.length; i++) {
						data.Result.Eva[i]['Icon'] = data.Result.Eva[i]['Icon'].replace("localhost","192.168.1.112")
						if (data.Result.Eva[i]['IsPraise']) {
							commit += "<div class='comment' id='comments' name="+data.Result.Eva[i]['EvaID']+"><div class='unit unit-xs-horizontal unit-sm-horizontal unit-md-horizontal unit-lg-horizontal'><div class='unit__left'><img src="+data.Result.Eva[i]['Icon']+" width='65' height='66'/></div><div class='unit__body'><div class='comment-top-panel'><h5 class='comment__author'>"+data.Result.Eva[i]['Name']+"</h5><div class='comment__date'>"+data.Result.Eva[i]['CreateTime']+"</div></div><p>"+data.Result.Eva[i]['Content']+"</p><div class='comment__footer'><a class='fa fa-thumbs-up' id='dianzan'>"+data.Result.Eva[i]['PraiseCount']+"</a></div></div></div></div>"
						}else{
							commit += "<div class='comment' id='comments' name="+data.Result.Eva[i]['EvaID']+"><div class='unit unit-xs-horizontal unit-sm-horizontal unit-md-horizontal unit-lg-horizontal'><div class='unit__left'><img src="+data.Result.Eva[i]['Icon']+" width='65' height='66'/></div><div class='unit__body'><div class='comment-top-panel'><h5 class='comment__author'>"+data.Result.Eva[i]['Name']+"</h5><div class='comment__date'>"+data.Result.Eva[i]['CreateTime']+"</div></div><p>"+data.Result.Eva[i]['Content']+"</p><div class='comment__footer'><a class='fa fa-thumbs-o-up' id='dianzan'>"+data.Result.Eva[i]['PraiseCount']+"</a></div></div></div></div>"
						}
					}
					$("#commentlist").html(commit)
				}

				if (data.Result.NewList.length % 2 == 0) {
					var num = data.Result.NewList.length/2
				}else{
					num = data.Result.NewList.length+1/2;
				}
				for (let x = 0; x <= num; x = x+2) {
					let a = x+1;
					other += "<li><div class='range range-xs-center range-30'><div class='cell-sm-6 cell-xs-10'><div class='post-blog' id="+data.Result.NewList[x]['ID']+"><div class='post-blog__media'></div><div class='post-blog__body bg-wans'> <div class='post-blog__title'>"+data.Result.NewList[x]['Title']+"</div><div class='post-blog__meta'><div class='post-blog__meta-date'>"+data.Result.NewList[x]['Time']+"</div><div class='post-blog__meta-views'>"+data.Result.NewList[x]['Browse']+"</div></div></div></div></div><div class='cell-sm-6 cell-xs-10'><div class='post-blog' id="+data.Result.NewList[a]['ID']+"><div class='post-blog__media'></div><div class='post-blog__body bg-wans'><div class='post-blog__title'>"+data.Result.NewList[a]['Title']+"</div><div class='post-blog__meta'><div class='post-blog__meta-date'>"+data.Result.NewList[a]['Time']+"</div><div class='post-blog__meta-views'>"+data.Result.NewList[a]['Browse']+"</div></div></div></div>"
				}
				$(".slides").html(other)
				$(".post-blog").each(function(){
					$(this).click(function(){
						var blogid = $(this).attr("id")
						window.location.href = "active-post.html?id="+blogid;
					})
				})
				for (let i = 0; i < data.Result.TripList.length; i++) {
					if (data.Result.TripList[i]['Title'].length >= 12) {
						data.Result.TripList[i]['Title'] = data.Result.TripList[i]['Title'].substring(0,12);
						data.Result.TripList[i]['Title'] += "...";
					}
					tips += "<li><a href='blog-post.html?id="+data.Result.TripList[i]['ID']+"'><span>"+data.Result.TripList[i]['Title']+"</span><span>"+data.Result.TripList[i]['Time']+"</span></a></li>"
				}
				$("#tipslist").html(tips)  
				//资讯
				for (let i = 0; i < data.Result.ActivityList.length; i++) {
					news += "<a class='offset-top-30 bg-wans unit unit-horizontal unit-middle post-blog-sm' href='tip-post.html?id="+data.Result.ActivityList[i]['ID']+"'><div class='unit__left'><img src="+data.Result.ActivityList[i]['Image']+" class='activeimg'></div><div class='unit__body'><p>"+data.Result.ActivityList[i]['Title']+"</p><p class='text-snow' style='display:block'>"+data.Result.ActivityList[i]['Time']+"</p></div></a>"
				}
				$("#newlist").html(news)
				//图像
				for (var i = 0; i < data.Result.ImageList.length; i++) {
					imagelist += "<div class='cell-xxs-6 cell-xs-4'><div class='thumbnail-instafeed thumbnail-instafeed-minimal'><a href='album-gallery.html'><img src="+data.Result.ImageList[i]['Image']+"></a></div></div>"
				}
				$("#imageslist").html(imagelist)
				//视频
				for (var i = 0; i < data.Result.VideoList.length; i++) {
					videolist += "<div class='cell-xxs-6 cell-xs-4'><div class='thumbnail-instafeed thumbnail-instafeed-minimal'><a href='album-video.html'><img src="+data.Result.VideoList[i]['Image']+"></a></div></div>"
				}
				$("#videolist").html(videolist)
				//加载完毕
				$(".page-loader").addClass("loaded");
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);
				function removeClass(){
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
				if (data.Result.IsNext == true) {
					pageIndex++;
					$(".isnext").html("<a class='button button-lined' onclick='first()'>查看更多</a>")
				}else{
					$(".isnext").html("")
				}
				//点赞
				$(".comment__footer>a").each(function(){
					$(this).click(function(){
						var succ = false;
						if (token == -1) {
							$('#myModal').modal('show');
							$(".activespan").css("color","black");
							$(".activespan").css("font-size","20px");
							$(".grey").css("font-size","17px");
							$(".grey").css("color","#9E9E9E");
							$(".registerbox").hide();
							$(".loginbox").show();
							return;
						}
						if ($(this).attr("class") == "fa fa-thumbs-o-up") {
							$(this).addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");
							$(this).html(Number($(this).html())+1)
						}else{
							$(this).addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
							$(this).html(Number($(this).html())-1)
						}
						var sta = $(this).parents("#comments").attr("name");
						$.ajax({
							type:"get",
							url: mainurl+"Eva/Fabulous",
							data:{
								evaID:sta,
								token:token
							},
							success:function(data){
								if(data.Status==40001){
									delCookie("token")
									$('#myModal').modal('show');
									$(".activespan").css("color","black");
									$(".activespan").css("font-size","20px");
									$(".grey").css("font-size","17px");
									$(".grey").css("color","#9E9E9E");
									$(".registerbox").hide();
									$(".loginbox").show();
								}else if(data.Status==1){
									succ = true;
								}
								else{
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
	})
}

first()
if (token == '-1') {
	$("#commentbox").html("<div class='comment_form'><div class='form-wrap'><span>目前您尚未登录，请<a data-toggle='modal' data-target='#myModal' onclick='activespan()'>登录</a>或<a data-toggle='modal' data-target='#myModal' onclick='grey()'>注册</a>后进行评论</span></div></div>")
}

function btnchange(){
	if($("#comment-message").val() ==''){
		$(".button-square").removeClass("button-defaults").addClass("btn-dis")
		$('.button-square').attr("disabled",true); 
	}else{
		$(".button-square").removeClass("btn-dis").addClass("button-default")
		$('.button-square').attr("disabled",false); 
	}
}

$("#comment").click(function(){
	$.ajax({
		type:"post",
		url: mainurl+"Eva/NewsCreate",
		data:{
			Content:$("#comment-message").val(),
			NewsID:blogID,
			token:token
		},
		success:function(data){
			if(data.Status == 1){
				layer.msg(data.Result, {
					icon: 1
				});
				$("#comment-message").val('');
				commit = "";
				pageIndex = 1;
				first();
			}else if (data.Status == 40001) {
				layer.msg(data.Result, {
					icon: 5
				});
				delCookie("token");
				$(".rd-navbar-collapse").html("<li><a href='#'>个人资料</a></li><li><a href='#'>VIP俱乐部</a></li>")
			}else{
				layer.msg(data.Result, {
					icon: 5
				});
			}
		}
	})
})

$("#tipmore").click(function(){
	window.location.href = "blog.html"
})

$("#zixunmore").click(function(){
	window.location.href = "tip.html"
})

$("#imagemore").click(function(){
	window.location.href = "album-gallery.html"
})

$("#videomore").click(function(){
	window.location.href = "album-video.html"
})


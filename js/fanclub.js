
$.ajax({
	type:"get",
	url: mainurl+"Information/FansClub",
	data:{},
	success:function(data){
		if(data.Status == 1){
			smlist = "";
			biglist = "";
			hreflist = "";
			for (var i = 0; i < data.Result.length; i++) {
				biglist += "<li><a data-toggle='tab'>"+data.Result[i]['ClassName']+"</a></li>";
				for (var x = 0; x < data.Result[i].List.length; x++) {
					smlist += "<li id="+data.Result[i]['ClassName']+"><a href='#tabs-"+i+"-"+x+"' data-toggle='tab'>"+data.Result[i].List[x]['Name']+"</a></li>";
					hreflist += "<div class='tab-pane fade animated fadeInLeft' id='tabs-"+i+"-"+x+"'><div style='width:100%'>"+decodeURIComponent(data.Result[i].List[x]['Details'])+"</div></div>"
				}
			}
			$(".nav-custom-tabs").eq(0).append(biglist);
			$(".nav-custom-tabs").eq(1).append(smlist);
			$(".text-left").append(hreflist);
			// $(".tab1>li").eq(0).addClass("active");
			// $(".tab2>li").eq(0).addClass("active");
			// $(".text-left>div").eq(0).addClass("active in");
			$(".tab2>li").css("display","none");
			// $("#"+data.Result[0]['ClassName']+"").css("display","block")
			$(".tab2>li").eq(0).css("display","block")
			var first = data.Result[0].List[0].Name;
			var btn = $(".tab1 li");
			$("[class='"+first+"']").css("display","block");
				for(i = 0;i < btn.length;i++){
					btn[i].onclick = function(){
						for(j = 0;j < btn.length;j++){
							$(".tab2 li").css("display","none");
						}
						var conen = $(this).text();
						$("[id='"+conen+"']").css("display","block");
						$("[id='"+conen+"']").eq(0).css("border-top","none");
						$("[id='"+conen+"'] a").eq(0).trigger("click");
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

function joinvip(){
	if (token == -1) {
	$(".activespan").css("color","black");
      $(".activespan").css("font-size","22px");
      $(".grey").css("font-size","17px");
      $(".grey").css("color","#9a9a9a");
      $(".registerbox").hide();
      $(".loginbox").show();
      $('#myModal').modal('show');
	}else{
		window.location.href = "user.html?vip=true"
	}
	
}


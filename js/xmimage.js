// isfresh = 2;
// $.getScript('js/core.min1.js',function(){
// 	$.getScript('js/script.js',function(){
// 	})
// })
$.ajax({
	type:"get",
	url: mainurl+"XmImage/ImageBook",
	data:{},
	async: false,
	success:function(data){
		if(data.Status == 1){
			smlist = '';
			classlist = "<li id='all'><a class='active' data-isotope-filter='*' data-isotope-group='gallery'><span class='link-inner'>全部</span></a></li>"
			for (let i = 0; i < data.Result.length; i++) {
				for (let x = 0; x < data.Result[i].Book.length; x++) {
					smlist += "<div class='col-xs-12 col-sm-6 col-lg-4 isotope-item' data-filter="+data.Result[i]['ClassName']+"><ul class='lightgallery-album'><li><div class='thumbnail-type-3' id="+data.Result[i].Book[x]['Tag']+"><a class='thumbnail-img'><img src="+data.Result[i].Book[x]['Image']+" class='imghei' style='width:100%;'><div class='caption'><div class='caption-inner'><div class='caption-title'>"+data.Result[i].Book[x]['Tag']+"</div><hr/><div class='caption-date'>"+data.Result[i].Book[x]['Count']+"张</div></div></div></a></div></li></ul></div>"
				}
				classlist += "<li><a data-isotope-filter="+data.Result[i].ClassName+" data-isotope-group='gallery'><span class='link-inner'>"+data.Result[i].ClassName+"</span></a></li>"
			}
			$("#isotope-filters").html(classlist);
			$("#xmimage").html(smlist);
			height = $(".isotope-item").eq(0).width();
			height1 = height/3*2;
			$(".imghei").css('height',height1)
			$(".thumbnail-type-3").each(function(){
				$(this).click(function(){
					var imageid = $(this).attr("id")
					window.location.href = "gallery-masonry-2.html?id="+imageid;
				})
			})
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

window.onresize=function(){  
	changeDivHeight();  
} 

function changeDivHeight(){
	height = $(".isotope-item").eq(0).width();
	height1 = height/3*2;
	$(".imghei").css('height',height1)
}
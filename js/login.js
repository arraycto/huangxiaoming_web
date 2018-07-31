	// delCookie("token")
	addressInit('cmbProvince', 'cmbCity', 'cmbArea');

	//判断PC还是移动端
	var ispc = true;
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		ispc = false;
	} else {
		ispc = true;
	}

	function againlogin() {
		$(".activespan").css("color", "black");
		$(".activespan").css("font-size", "22px");
		$(".grey").css("font-size", "17px");
		$(".grey").css("color", "#9a9a9a");
		$(".registerbox").hide();
		$(".loginbox").show();
		$('#myModal').modal('show');
	}
	var isvip = false;
	var token = getCookie("token");
	if (token == undefined || token == null) {
		token = '-1';
		isvip = false;
	} else {
		geticon()
	}

	function gotomsg(){
		if (token == -1) {
			layer.confirm('登录后才能进入该板块哦', {
				btn: ['去登录', '取消']
			},
			function () {
				layer.closeAll('dialog');
				againlogin()
			}
		)
		}else{
			window.location.href = "xmsvoice.html"
		}
	}

	$(".rd-navbar-socials-toggle").click(function () {
		if (token == '-1') {
			$(".activespan").css("color", "black");
			$(".activespan").css("font-size", "22px");
			$(".grey").css("font-size", "17px");
			$(".grey").css("color", "#9a9a9a");
			$(".registerbox").hide();
			$(".loginbox").show();
			$('#myModal').modal('show');
		} else {
			window.location.href = "user.html"
		}
	})



	function geticon() {
		$.ajax({
			type: "get",
			url: mainurl + "User/CheckVip",
			data: {
				token: token
			},
			success: function (data) {
				if (data.Status == 40001) {
					layer.msg(data.Result, {
						icon: 5
					});
					setTimeout(
						againlogin, 2000);
				} else {
					if ( data.Result.MsgCount > 99) {
						MsgCount = "99+"
					}else{
						MsgCount = data.Result.MsgCount
					}
					if(MsgCount>0){
						$(".rd-navbar-socials-toggle").html("<img src='" + url + data.Result.icon + "'><div class='MsgCount'>"+ MsgCount+"</div>")
					}else{
						$(".rd-navbar-socials-toggle").html("<img src='" + url + data.Result.icon + "'>")
					}
					if (window.location.href.indexOf("user") >= 0) {
						if(MsgCount>0){
							$(".rd-navbar-socials-toggle").html("<img src='" + url + data.Result.icon + "'><div class='MsgCount'>"+ MsgCount+"</div>")
							$("#user-msg").html('<span class="user-sgCount">'+MsgCount+'</span>')
						}	
					}
					if (data.Result.EndTime == "不是") {
						isvip = false;
					} else {
						isvip = true;
					}
				}
			},
			error: function () {
				$(".page-loader").addClass("loaded");
				$('#animate').addClass('fadeInLeftBig' + ' animated');
				setTimeout(removeClass, 1200);
				function removeClass() {
					$('#animate').removeClass('fadeInLeftBig' + ' animated');
				}
				$("section").html("");
				layer.msg('服务器异常', {
					icon: 5
				});
			}
		})

	}

	var userok = false;
	var userok1 = false;
	var pwdok1 = false;
	var pwdok = false;
	var emailok = false;
	var numok = false
	var phone2 = false
	var foremail = false
	var forpwd = false
	var forpwd2 = false
	var cmzok = false;
	var pwdok2 = false;
	var emailok1 = false;

	// 验证用户名
	$('input[name="username"]').blur(function () {
		if ($(this).val() != '') {
			userok = true;
			$(this).next('.form-validation').text('');
		} else {
			userok = false;
			$(this).next('.form-validation').text('请输入用户名');
		}

	});

	//验证密码
	$('input[name="password"]').blur(function () {
		if ($(this).val() != '') {
			$(this).next('.form-validation').text('');
		} else {
			$(this).next('.form-validation').text('请输入密码');
		}

	});

	//验证确认密码
	$('input[name="repass"]').blur(function () {

		if ($(this).val() != '' && $(this).val() == $('input[name="password"]').val()) {
			$(this).next('.form-validation').text('');
			pwdok = true;
		} else if ($(this).val() == '') {
			pwdok = false;
			$(this).next('.form-validation').text('请输入密码');
		} else {

			pwdok = false;
			$(this).next('.form-validation').text('两次密码不同');
		}

	});

	//验证邮箱
	$('input[name="email"]').blur(function () {
		if ($(this).val() == '') {
			emailok = false;
			$(this).next('.form-validation').text('请输入邮箱');
		} else if ($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
			$(this).next('.form-validation').text('请输入正确的EMAIL格式');
			emailok = false;
		} else {
			emailok = true;
			$(this).next('.form-validation').text('');
		}

	})

	// 验证用户名
	$('input[name="username1"]').blur(function () {
		if ($(this).val() != '') {
			userok1 = true;
			$(this).next('.form-validation').text('');
		} else {
			userok1 = false;
			$(this).next('.form-validation').text('请输入用户名');
		}

	});

	//验证密码
	$('input[name="phone1"]').blur(function () {
		if ($(this).val() != '') {
			pwdok1 = true;
			$(this).next('.form-validation').text('');
		} else {
			pwdok1 = false;
			$(this).next('.form-validation').text('请输入密码');
		}

	});

	//验证人数
	$('input[name="Num"]').blur(function () {
		reg = /^\d+$/;
		if ($(this).val() == '') {
			$(this).next('.form-validation').text('请输入人数');
			numok = false;
		} else if (!reg.test($(this).val())) {
			$(this).next('.form-validation').text('请输入正确的格式');
			numok = false;
		} else {
			$(this).next('.form-validation').text('');
			numok = true;
		}

	});

	//验证联系人电话
	$('input[name="Phone2"]').blur(function () {
		reg = /^\d+$/;
		if ($(this).val() == '') {
			$(this).next('.form-validation').text('请输入联系方式');
			phone2 = false;
		} else if (!reg.test($(this).val())) {
			$(this).next('.form-validation').text('请输入正确的格式');
			phone2 = false;
		} else {
			$(this).next('.form-validation').text('');
			phone2 = true;
		}
	});
	//忘记密码
	//验证密码
	$('#forgetpassword').blur(function () {
		if ($(this).val() != '') {
			$(this).next('.form-validation').text('');
		} else {
			$(this).next('.form-validation').text('请输入密码');
		}

	});

	//验证确认密码
	$('#forgetpassword1').blur(function () {
		if ($(this).val() != '' && $(this).val() == $('#forgetpassword').val()) {
			$(this).next('.form-validation').text('');
			pwdok2 = true;
		} else if ($(this).val() == '') {
			pwdok2 = false;
			$(this).next('.form-validation').text('请输入密码');
		} else {
			pwdok2 = false;
			$(this).next('.form-validation').text('两次密码不同');
		}

	});

	//重置码
	$('#forms-czm').blur(function () {
		if ($(this).val() != '') {
			$(this).next('.form-validation').text('');
			cmzok = true;
		} else {
			cmzok = false;
			$(this).next('.form-validation').text('请输入重置码');
		}

	});

	//验证邮箱
	$('#forgetemail').blur(function () {
		if ($(this).val() == '') {
			emailok1 = false;
			$(this).next('.form-validation').text('请输入邮箱');
		} else if ($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
			$(this).next('.form-validation').text('请输入正确的EMAIL格式');
			emailok1 = false;
		} else {
			emailok1 = true;
			$(this).next('.form-validation').text('');
		}

	})

	var verifyCode = new GVerify("v_container");

	$("#register").click(function () {
		var res = verifyCode.validate($("#forms-yzm").val());
		if (!userok || !pwdok || !emailok) {
			layer.msg("请填写正确的信息", {
				icon: 5
			});
		} else if (!res) {
			layer.msg("验证码错误", {
				icon: 5
			});
		} else {
			$.ajax({
				type: "post",
				url: mainurl + "User/Login",
				data: {
					UserName: $("#forms-name").val(),
					Pwd: $.md5($("#forms-message").val()),
					Email: $("#forms-email").val(),
					Province: $("#cmbProvince").val(),
					City: $("#cmbCity").val(),
					Region: $("#cmbArea").val(),
				},
				success: function (data) {
					if (data.Status == 1) {
						layer.msg("注册成功", {
							icon: 1
						});
						setCookie("token", data.Result, "d5");
						token = data.Result;
						$('#myModal').modal('hide');
						geticon()
						loginok()
					} else if (data.Status == 40043) {
						layer.msg("账号名已存在", {
							icon: 5
						});
					} else {
						layer.msg(data.Result, {
							icon: 5
						});
					}
				},
				error: function () {
					layer.msg('服务器异常', {
						icon: 5
					});
				}
			})
		}
	})

	$("#login").click(function () {
		if (!userok1 || !pwdok1) {
			layer.msg("请输入信息", {
				icon: 5
			});
		} else {
			$.ajax({
				type: "post",
				url: mainurl + "User/Login",
				data: {
					UserName: $("#forms-name1").val(),
					Pwd: $.md5($("#forms-phone1").val()),
				},
				success: function (data) {
					if (data.Status == 1) {
						layer.msg("登陆成功", {
							icon: 1
						});
						setCookie("token", data.Result, "d5");
						token = data.Result
						geticon()
						$('#myModal').modal('hide');
						loginok()
					} else {
						layer.msg(data.Result, {
							icon: 5
						});
					}
				},
				error: function () {
					layer.msg('服务器异常', {
						icon: 5
					});
				}
			})
		}
	})

	$("#editpwdbyemail").click(function () {
		var res = verifyCode.validate($("#forms-yzm").val());
		if (!cmzok || !emailok1 || !pwdok2) {
			layer.msg("请填写正确的信息", {
				icon: 5
			});
		} else {
			$.ajax({
				type: "get",
				url: mainurl + "User/CreatePassword",
				data: {
					Password: $.md5($("#forgetpassword1").val()),
					Email: $("#forgetemail").val(),
					Code: $("#forms-czm").val(),
				},
				success: function (data) {
					if (data.Status == 1) {
						layer.msg(data.Result, {
							icon: 1
						});
						$('#forgetmodal').modal('hide');
						$('#myModal').modal('show');
						loginok()
					} else if (data.Status == 40043) {
						layer.msg("账号名已存在", {
							icon: 5
						});
					} else {
						layer.msg(data.Result, {
							icon: 5
						});
					}
				},
				error: function () {
					layer.msg('服务器异常', {
						icon: 5
					});
				}
			})
		}
	})

	var countdown = 60;
	$(".getymz").click(function (obj) {
		var phone = $("#forgetemail").val();
		if (!emailok1) {
			layer.msg("请输入注册邮箱", {
				icon: 1
			});
			return;
		} else {
			cod();

			function cod(obj) {
				if (countdown == 0) {
					$(".getymz").text("获取重置码");
					$(".getymz").attr("onclick", "code(this)");
					$(".getymz").css("background", "#b88e42");
					countdown = 60;
					return;
				} else {
					$(".getymz").attr("onclick", "null");
					$(".getymz").css("background", "#888a8c");
					$(".getymz").text("重新发送(" + countdown + ")");
					countdown--;
				}
				setTimeout(function () {
						cod(obj)
					},
					1000);
			}
			$.ajax({
				type: "get",
				url: "http://api.huangxiaoming.com.cn/api/User/ReturnPassword",
				data: {
					Email: phone
				},
				success: function (data) {
					if (data.Status == 1) {
						layer.msg(data.Result, {
							icon: 1
						});
					} else {
						layer.msg(data.Result, {
							icon: 5
						});
					}
				},
				error: function () {
					layer.msg("服务器异常", {
						icon: 5
					});
				},

			});
		}
	})

	function activespan() {
		$(".activespan").css("color", "black");
		$(".activespan").css("font-size", "20px");
		$(".grey").css("font-size", "17px");
		$(".grey").css("color", "#9a9a9a");
		$(".registerbox").hide();
		$(".loginbox").show();
	}

	function grey() {
		$(".grey").css("color", "black");
		$(".grey").css("font-size", "20px");
		$(".activespan").css("font-size", "17px");
		$(".activespan").css("color", "#9a9a9a");
		$(".loginbox").hide();
		$(".registerbox").show();
	}

	function forget() {
		$('#myModal').modal('hide');
		$('#forgetmodal').modal('show');
	}

	function loginok() {
		if (window.location.href.indexOf("forum") >= 0) {
			if (ispc) {
				$("#container").show();
				$("#ReleasePost1").hide();
				$("#ReleasePost2").show();
				$("#ReleasePost3").hide();
			} else {
				$("#container").hide();
				$("#ReleasePost1").hide();
				$("#ReleasePost2").hide();
				$("#ReleasePost3").show();
			}
			// $("#bbsform").hide();
		}
		if (window.location.href.indexOf("-post") >= 0) {
			$("#commentbox").html("<div class='form-wrap'><textarea class='form-input' id='comment-message' name='comment-message' placeholder='写下你的评论' oninput='btnchange()' onpropertychange='btnchange()'></textarea></div><button class='button button-square btn-dis' type='button' id='comment' disabled='disabled'>评论</button>")
			$("#comment").click(function () {
				$.ajax({
					type: "post",
					url: mainurl + "Eva/NewsCreate",
					data: {
						Content: $("#comment-message").val(),
						NewsID: blogID,
						token: token
					},
					success: function (data) {
						if (data.Status == 1) {
							layer.msg(data.Result, {
								icon: 1
							});
							$("#comment-message").val('');
							commit = "";
							pageIndex = 1;
							first();
							$(".page-loader").addClass("loaded");
						} else if (data.Status == 40001) {
							layer.msg(data.Result, {
								icon: 5
							});
							setTimeout(
								againlogin, 2000);
							// delCookie("token");
						} else {
							layer.msg(data.Result, {
								icon: 5
							});
						}
					}
				})
			})
			// $("#bbscommentbox").append("<button class='button button-square button-default' type='button' id='bbscomment' style='margin-top:20px;'>评论</button>")
		}
		$(".rd-navbar-socials-toggle").click(function () {
			window.location.href = "user.html"
		})

	}
$(function () {
    $.fn.smohanfacebox = function (options) {
        var defaults = {
            Event: "click",
            divid: "Smohan_FaceBox",
            textid: "TextArea"
        };
        var options = $.extend(defaults, options);
        var $btn = $(this);
        var faceimg = '';
        for (i = 0; i < 60; i++) {
            faceimg += '<li><a href="javascript:void(0)"><img src="images/face/' + (i + 1) + '.gif" face="<emt>' + (i + 1) + '</emt>"/></a></li>';
        };
        var $iconbtn = $(this).parents("#Smohan_FaceBox")
        // $("#" + options.divid).prepend("<div id='SmohanFaceBox'><span class='Corner'></span><div class='Content'><h3><span>常用表情</span><a class='close' title='关闭'></a></h3><ul>" + faceimg + "</ul></div></div>");
        $iconbtn.prepend("<div id='SmohanFaceBox'><div class='Content'><h3><span>常用表情</span><a class='close' title='关闭'></a></h3><ul>" + faceimg + "</ul></div></div>");
        var $SmohanFaceBox = $iconbtn.children("#SmohanFaceBox")
        $SmohanFaceBox.css("display", 'none');
        // var $facepic = $("#SmohanFaceBox li img");
        var $facepic = $SmohanFaceBox.find("li img")
        $btn.live(options.Event, function (e) {
            if ($SmohanFaceBox.is(":hidden")) {
                $SmohanFaceBox.show(360);
                $btn.addClass('in');
            } else {
                $SmohanFaceBox.hide(360);
                $btn.removeClass('in');
            }
        });
        $facepic.die().click(function () {
            $SmohanFaceBox.hide(360);
            var $textid = $(this).parents("#Smohan_FaceBox").children("#Smohan_text")
            // $("#" + options.textid).die().insertContent($(this).attr("face"));
            $textid.die().insertContent($(this).attr("face"));
            $btn.removeClass('in');
        });
        $('#SmohanFaceBox h3 a.close').click(function () {
            $SmohanFaceBox.hide(360);
            $btn.removeClass('in');
        });
        $SmohanFaceBox.mouseleave(function () {
            $SmohanFaceBox.hide(560);
            $btn.removeClass('in');
        });
    };
    $.fn.extend({
        insertContent: function (myValue, t) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd("character", wee + t);
                    t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);
                    sel.select();
                }
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t, $t.selectionEnd + t);
                    this.focus();
                }
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    });
    // $.fn.extend({
    //     replaceface: function (faces) {
    //         for (i = 0; i < 60; i++) {
    //             faces = faces.replace('<emt>' + (i + 1) + '</emt>', '<img src="images/face/' + (i + 1) + '.gif">');
    //         }
    //         // $(this).html(faces);
    //     }
    // });
});
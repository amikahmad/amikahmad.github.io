var active = false;
    $('.slide').click(function() {
        $(".slide").toggle();
        if (!active) {
            $('#main').fadeOut(300);
            $('#plus').delay(300).fadeIn(300);
            $('.slide').css({
                'color': '#707070'
            });
            active = true;
        } else {
            $('#plus').fadeOut(300);
            $('#main').delay(300).fadeIn(300);
            $('.slide').css({
                'color': '#505050'
            });
            active = false;
        }
    });

    $(".experience").hover(function () {
    $("#color").addClass("experience-border");
}, function () {
    $("#color").removeClass("experience-border");
});

$(".awards").hover(function () {
    $("#color").addClass("awards-border");
}, function () {
    $("#color").removeClass("awards-border");
});

$(".slide").hover(function () {
    $("#color").addClass("slide-border");
}, function () {
    $("#color").removeClass("slide-border");
});

var mobile;
    if ((/iPhone|iPod|Android|BlackBerry/).test(navigator.userAgent)) {
        mobile = true;
    } else {
        mobile = false;
    }

    adjustHeight();

    $(window).resize(function() {
        adjustHeight();
    });

    function adjustHeight() {
        if (!mobile) {
            var height = $(window).height();
            var adjust = height;

            if (height > 400) {
                $("#description ").css({
                    "margin-top ": adjust / 2 - 120 + "px ",
                    "padding-bottom ": adjust / 2 - 150 + "px "
                });
            }
        }



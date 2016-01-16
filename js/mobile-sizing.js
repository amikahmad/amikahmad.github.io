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

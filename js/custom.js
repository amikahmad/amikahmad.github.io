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

$(".experience").hover(function() {
    $("#color").addClass("experience-border");
}, function() {
    $("#color").removeClass("experience-border");
});

$(".awards").hover(function() {
    $("#color").addClass("awards-border");
}, function() {
    $("#color").removeClass("awards-border");
});

$(".slide").hover(function() {
    $("#color").addClass("slide-border");
}, function() {
    $("#color").removeClass("slide-border");
});

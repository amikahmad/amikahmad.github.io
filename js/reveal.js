
var active = false;
$('.slide').click(function() {
        $(".slide").toggle();
    if (!active) {
        $('#main').fadeOut(200);
        $('#plus').delay(200).fadeIn(200);
        $('.slide').css({'color': '#707070'});
        active = true;
    } else {
        $('#plus').fadeOut(200);
        $('#main').delay(200).fadeIn(200);
        $('.slide').css({'color': '#505050'});
        active = false;
    }
});

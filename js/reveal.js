var active = false;
$('#name').click(function() {
    if (!active) {
        $('#main').fadeOut(200);
        $('#info').delay(200).fadeIn(200);
        $('h1').css({
            'color': '#808080'
        });
        active = true;
    } else {
        $('#info').fadeOut(200);
        $('#main').delay(200).fadeIn(200);
        $('h1').css({
            'color': '#505050'
        });
        active = false;
    }
});

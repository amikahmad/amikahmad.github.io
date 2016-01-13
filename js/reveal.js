var active = false;
$('#name').click(function() {
    if (!active) {
        $('#main').fadeOut(200);
        $('#info').delay(200).fadeIn(200);
        $('h1').css({
            'color': 'grey'
        });
        active = true;
    } else {
        $('#info').fadeOut(200);
        $('#main').delay(200).fadeIn(200);
        $('h1').css({
            'color': 'dimgrey'
        });
        active = false;
    }
});

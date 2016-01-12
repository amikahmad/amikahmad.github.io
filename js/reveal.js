var active = false;
$('#name').click(function() {
    if (!active) {
        $('#container2').fadeOut(500);
        $('#container3').delay(500).fadeIn(800);
        $('h1').css({
            'border-left: '2px solid yellowgreen'
        });
        active = true;
    } else {
        $('#container3').fadeOut(500);
        $('#container2').delay(500).fadeIn(800);
        $('h1').css({
            'border-left': 'none'
        });
        active = false;
    }
});

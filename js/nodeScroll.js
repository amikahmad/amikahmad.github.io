$(document).ready(function(){

    var clickable = true;

    if ($('.story-panels').length > 0){
        $('.story-panels').onepage_scroll({
            sectionContainer: ".section",     // sectionContainer accepts any kind of selector in case you don't want to use section
            easing: "ease-in-out",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",                                       // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
            animationTime: 1300,             // AnimationTime let you define how long each section takes to animate
            pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
            updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
            beforeMove: function(index) {
                if (index < currentIndex)
                    updateAnimation(index);
            },  // This option accepts a callback function. The function will be called before the page moves.
            afterMove: function(index) {
                if (index > currentIndex)
                    updateAnimation(index);
            },   // This option accepts a callback function. The function will be called after the page moves.
            loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
            keyboard: true,                  // You can activate the keyboard controls
            responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                            // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                            // the browser's width is less than 600, the fallback will kick in.
            direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
        });
    }

    $('.scroll-btn').on('click', function(){
        if (clickable){
            clickable = false;
            $('.story-panels').moveDown();

            setTimeout(function(){
                clickable = true;
            }, 2000);
        }
    })

    $('#field_1jlg8c').prop('disabled', true);
    $('.submit-btn').prop('disabled', true);
    $('.social-media-icon').children('a').prop("tabIndex", -1);
});

var stopped = false,
    reset = true,
    exploded = false,
    separated = false,
    connected = false,
    isMobile = false,
    currentIndex = 0,
    circleRadius = 65,
    moveSpeed = 40;

var networkCircle = new Shape.Circle({
    center: [view.center.x, view.center.y],
    radius: view.size.width / 2,
    strokeColor: 'red',
    fillColor: 'red',
    strokeWidth: 3
});

var networkCircle2 = new Shape.Circle({
    center: [view.center.x, view.center.y],
    radius: view.size.width / 2,
    strokeColor: 'red',
    strokeWidth: 3
});

var networkCircle3 = new Shape.Circle({
    center: [view.center.x, view.center.y],
    radius: view.size.width / 2,
    strokeColor: 'red',
    strokeWidth: 3
});

// var networkCricleSymbol = new Symbol(networkCircle);

networkCircle.strokeColor.alpha = 0;
networkCircle.fillColor.alpha = 0;
networkCircle2.strokeColor.alpha = 0;
networkCircle3.strokeColor.alpha = 0;

function updateAnimation(index){

    if ($('#myCanvas').css('display') == 'none'){
        isMobile = true;
    }

    $('.status-bar').css({
        "left":(index-1) * 16.66666 + "%"
    })

    var target = 0,
        offset = 0;


    currentIndex = index;

    if (index == 1){
        stopped = false;
        reset = true;
        exploded = false;
        separated = false;
        $('.small-logo').addClass('hidden');
    }

    if (index == 2){
        exploded = true;
        separated = false;
        moveSpeed = 40;
        reset = true;
        $('.small-logo').removeClass('hidden');

        var target = $('.section-2').children('.story-content');
        if (!isMobile)
            var offset = target.height();
        else
            var offset = target.height() / 2;

        centerContent(target, offset);
    }

    if (index == 3){
        exploded = false;
        stopped = false;
        reset = false;
        separated = true;
        connected = false;
        moveSpeed = 10;

        target = $('.section-3').children('.story-content');
        if (!isMobile)
            offset = target.height() / 2 + 200;
        else
            offset = target.height() / 2;
        centerContent(target, offset);
    }

    if (index == 4){
        separated = true;
        connected = true;

        target = $('.section-4').children('.story-content');
        offset = target.height() / 2;
        centerContent(target, offset);

    }

    if (index == 5){
        moveSpeed = 25;
        separated = true;
        connected = true;

        target = $('.section-5').children('.story-content');

        if (!isMobile)
            offset = target.height() +  ($('.icon-wrapper').height() / 2);
        else
            offset = (target.height() +  $('.icon-wrapper').height()) / 2;

        centerContent(target, offset);
        $('.scroll-btn').removeClass('hidden');
        $('.footer').removeClass('is-shown');

        $('#field_1jlg8c').prop('disabled', true);
        $('.submit-btn').prop('disabled', true);
    }

    if (index == 6){
        moveSpeed = 60;
        separated = true;
        connected = true;
        $('.small-logo').removeClass('hidden');
        $('.scroll-btn').addClass('hidden');
        $('.footer').addClass('is-shown');
        $('#field_1jlg8c').prop('disabled', false);
        $('.submit-btn').prop('disabled', false);

        target = $('.section-6').children('.story-content');

        if (!isMobile){
            offset = target.height() / 2 + $('.footer').height() / 2;
            centerContent(target, offset);
        }
        // else
        //  target.css({"top": "15px"});

    }
}

var Line = function(){
    var color = {
        red: (Math.random() * (.9 - .7)) + .7,
        alpha: (Math.random() * (.4 - .2)) + .2,
        saturation: 1,
        brightness: 1,
    };

    var firstSegment = new Segment({
        point: [0,0]
    })

    var secondSegment = new Segment({
        point: [0,0]
    })

    var line = new Path({
        segments: [firstSegment, secondSegment],
        strokeColor: color,
        strokeWidth: .2
    });

    this.line = line;
}

Line.prototype.drawLines = function(startPoint, endPoint){
    this.line.segments[0].point = new Point (startPoint.x, startPoint.y);
    this.line.segments[1].point = new Point (endPoint.x, endPoint.y);
}

Line.prototype.reset = function(){
    var point = new Point(0,0);
    this.line.segments[0].point = point;
    this.line.segments[1].point = point;
}

var Node = function(point, dest){
    this.point = point;

    var color = {
        alpha: .5,
        saturation: 1,
        brightness: 1,
    };

    var node = new Path.Circle({
        center: point,
        radius: 1.5,
        fillColor: color
    })

    this.color = color;
    this.dragColor = 'red';
    this.node = node;
    this.dest = dest;
    this.sepDest = getPositionInCircle();
    this.width = node.bounds.width;

}


Node.prototype.reset = function(){
    var vector = this.point.y - this.node.position.y - (Math.random() * (20 - 1) + 1);
    this.node.position.y += (vector / moveSpeed)
}

Node.prototype.move = function(){
    var vector = this.dest - this.node.position;
    if (vector.length < 30){
        this.dest = newDestination(this.point);
        vector = this.dest - this.node.position;
    }

    this.node.position += vector / moveSpeed;
    this.node.fillColor = this.color;

}

Node.prototype.separated = function(i){
    var distance;

    var vector = this.sepDest - this.node.position;
    if (vector.length < 10){
        this.sepDest = getPositionInCircle();
        vector = this.sepDest - this.node.position;
    }

    this.node.position += vector/moveSpeed;

    distance = this.node.position.getDistance(nodes[i].node.position);

    if (connected){
        this.node.fillColor = this.dragColor;

        if (distance < 120 && i < lineCount - 1){
            lines[i].drawLines(this.node.position, nodes[i+1].node.position);
        } else if (distance > 120 && i < lineCount - 1) {
            lines[i].drawLines(new Point(0,0), new Point(0,0));
        }
    } else if (i <= lineCount) {
        this.node.fillColor = this.color;
        lines[i].drawLines(new Point(0,0), new Point(0,0));
    }
}

var nodes = [],
    lines = [],
    size = view.size,
    nodeCount = size.width/10,
    lineCount = size.width/10,
    separatedGroup = new Group();

for (var i = 0; i < nodeCount; i++) {
    var position = new Point(Math.floor(Math.random() * (size.width)), Math.floor(Math.random() + size.height) - 100);
    var dest = newDestination(position.clone());
    node = new Node(position, dest);
    nodes.push(node);
}

for (var i = 0; i < lineCount; i++) {
    line = new Line();
    lines.push(line);

    separatedGroup.addChild(nodes[i].node);
}

function newDestination(currentPosition){
    var yMax = 0,
        xMax = 0;
    if (exploded){
        yMax = view.size.height;
        xMax = view.size.width / 4;
    } else {
        xMax = view.size.width / 10;
        yMax = view.size.height / 6;
    }
   var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
   var randomX = (Math.floor(Math.random() * (xMax) * plusOrMinus));
   var randomY = (Math.floor(Math.random() * (yMax) * plusOrMinus));
   var dest = new Point(currentPosition.x + randomX, currentPosition.y + randomY);
   return dest;
}

function getPositionInCircle(){
    var posX = Math.random() * 2 * circleRadius - circleRadius;
    var ylim = Math.sqrt(circleRadius * circleRadius - posX * posX);
    var posY = Math.random() * 2 * ylim - ylim;
    var dest = new Point(posX + view.center.x, posY + view.center.y);

    return dest;
}


function onResize(event){
    $('.content').height($(window).height());
    size = view.size;
    for (var i = 0; i < nodeCount; i++) {
        var position = new Point(Math.floor(Math.random() * (size.width)), Math.floor(Math.random() + size.height) - 100);
        var dest = newDestination(position.clone());
        nodes[i].point= position;
        // nodes[i].dest = dest;
    }

    networkCircle.position = view.center;
    networkCircle2.position = view.center;
    networkCircle3.position = view.center;

    updateAnimation(currentIndex);

    var environmentSlide = $('.section-5').children('.story-content');
    var center = view.center.y;
    var offset = center - environmentSlide.height() + ($('.icon-wrapper').height() / 2) + 10;


    environmentSlide.css({
        "top": offset
    })
}

function onFrame(event){
    if (stopped){
        for (var i = 0; i < nodes.length; i ++){
            nodes[i].reset();
        }
    }

    if (!stopped && !separated){
        for (var i = 0; i < nodes.length; i ++){
            nodes[i].move();

        }

        for (var i = 0; i < lines.length; i ++){
            lines[i].reset();
        }
    }

    if (separated){
        for (var i = 0; i < nodes.length; i ++){
            nodes[i].separated(i);
        }
    }

    if (currentIndex == 3){

        var circleRadiusCopy = 65;
        circleRadius = 65;

        if (networkCircle.radius > circleRadiusCopy - 10){
            networkCircle.radius -= 20;
            moveSpeed = 15;
        } else {
            networkCircle.radius = circleRadiusCopy - 20;
            moveSpeed = 30;

            if (networkCircle2.radius > circleRadiusCopy){
                circleRadius = 75;
                networkCircle2.radius -= 15;
            } else {
                networkCircle2.radius = circleRadiusCopy
                circleRadius = 95;

                if (networkCircle3.radius > circleRadiusCopy + 20){
                    circleRadius = 95;
                    networkCircle3.radius -= 15;
                } else {
                    networkCircle3.radius = circleRadiusCopy + 20;
                    circleRadius = 135;
                }
            }
        }

        if (networkCircle.radius < view.size.width / 4){
            networkCircle.strokeColor.alpha += .05;
        }

        if (networkCircle2.radius < view.size.width / 4){
            networkCircle2.strokeColor.alpha += .05;
        }

        if (networkCircle3.radius < view.size.width / 4){
            networkCircle3.strokeColor.alpha += .05;
        }

    } else if (currentIndex == 4) {
        if (networkCircle.radius < view.size.width/2 + 100){
            networkCircle.radius += 20;
            networkCircle2.radius += 25;
            networkCircle3.radius += 30;
            moveSpeed = 20;
        } else {
            networkCircle.radius = view.size.width/2 + 100;
            networkCircle2.radius = view.size.width/2 + 100;
            networkCircle3.radius = view.size.width/2 + 100;
            moveSpeed = 50;
        }

        if (networkCircle.radius < view.size.width / 2){
            networkCircle.fillColor.alpha += .05;
            networkCircle.strokeColor.alpha -= .05;
            networkCircle2.strokeColor.alpha -= .05;
            networkCircle3.strokeColor.alpha -= .05;
        } else {
            networkCircle.fillColor.alpha -= .05;
            networkCircle2.strokeColor.alpha -= .05;
            networkCircle3.strokeColor.alpha -= .05;
        }

        if (circleRadius < view.size.width / 1.5){
            circleRadius += 35;
        } else {
            circleRadius = view.size.width / 1.5
        }
    } else if (currentIndex == 5){
        resetCircles();
        if (circleRadius > 140){
            circleRadius -= 30;
        } else {
            circleRadius = 140;
            moveSpeed = 20;
        }

        $('.footer').removeClass('shown');
    } else if (currentIndex == 6){
        resetCircles();
        if (circleRadius < view.size.width / 1.5){
            circleRadius += 35;
        } else {
            circleRadius = view.size.width / 1.5
        }

        $('.footer').addClass('shown');
    } else{
        resetCircles();
        if (networkCircle.radius < view.size.width / 2){
            networkCircle.radius += 10;
            networkCircle2.radius += 10;
            networkCircle3.radius += 10;
        }
        else {
            networkCircle.radius = view.size.width / 2;
            networkCircle2.radius = view.size.width / 2;
            networkCircle3.radius = view.size.width / 2;
        }

        networkCircle.strokeColor.alpha -= .05;
        networkCircle2.strokeColor.alpha -= .05;
        networkCircle3.strokeColor.alpha -= .05;

        circleRadius = 35;
    }
}

function resetCircles(){
    if (networkCircle.strokeColor.alpha > .01){
        networkCircle.strokeColor.alpha -= .05;
    }

    if (networkCircle.fillColor.alpha > .01){
        networkCircle.fillColor.alpha -= .05;
    }

    if (networkCircle2.strokeColor.alpha > .01){
        networkCircle2.strokeColor.alpha -= .05;
    }

    if (networkCircle3.strokeColor.alpha > .01){
        networkCircle3.strokeColor.alpha -= .05;
    }
}

function centerContent(target, offset){
    var center = view.center.y;
    offset = center - offset;
    if (offset < 20){
        offset = 20;
    }

    target.css({
        "top":offset
    })
}

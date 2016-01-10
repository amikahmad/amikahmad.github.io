// Config
var width = 600;
var height = 400;
var halfWidth = width/2;
var halfHeight = height/2;
var scale = 0.8;
var begin = 1.6;
var minR = 4;
var maxR = 12;
// SVG
var svg = Draw('svg', {
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  width: getSize().width,
  height: getSize().height,
  style: 'background: #414956',
  viewBox: '0 0 ' + width + ' ' + height,
  preserveAspectRatio: 'xMidYMid meet'
});
// Shadow
var defs = createShadowFilter();
svg.appendChild(defs);
// Big circles
var bigCircles = drawBigCircles();
svg.appendChild(bigCircles);
// Shapes
var shapes = drawShapes();
svg.appendChild(shapes);
// Add to document
document.body.appendChild(svg);

/**
 * Helpers
 *
 */

// Resize
window.addEventListener('resize', function(evt) {
	svg.setAttribute('width', getSize().width);
	svg.setAttribute('height', getSize().height);
});

function getSize() {
	return {
		width: window.innerWidth,
		height: window.innerWidth * 0.7
	};
};

function createShadowFilter() {
  var defs = Draw('defs', {});
  var filter = Draw('filter', {
    id: 'shadow',
    height: '130%'
  });
  var feGaussianBlur = Draw('feGaussianBlur', {
    in: 'SourceAlpha',
    stdDeviation: '8'
  });
  var feOffset = Draw('feOffset', {
    result: 'offsetBlur',
    dx: '0',
    dy: '2'
  });
  var feComponentTransfer = Draw('feComponentTransfer', {});
  var feFuncA = Draw('feFuncA', {
    type: 'linear',
    slope: '0.2'
  });
  feComponentTransfer.appendChild(feFuncA);
  var feMerge = Draw('feMerge', {});
  var feMergeNode0 = Draw('feMergeNode', {});
  var feMergeNode1 = Draw('feMergeNode', {
    in: 'SourceGraphic'
  });
  feMerge.appendChild(feMergeNode0);
  feMerge.appendChild(feMergeNode1);
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feOffset);
  filter.appendChild(feComponentTransfer);
  filter.appendChild(feMerge);
  defs.appendChild(filter);
  return defs;
}

function drawBigCircles() {
  var g = Draw('g', {});
  var c0 = drawBigCircle({
    x1: halfWidth,
    x2: halfWidth,
    y1: (halfHeight) + 20,
    y2: halfHeight,
    r: 28,
    opacity: 1.0,
    begin: 0.6
  });
  var c1 = drawBigCircle({
    x1: halfWidth,
    x2: halfWidth,
    y1: halfHeight,
    y2: halfHeight - 25,
    r: 40,
    opacity: 0.6,
    begin: 0.8
  });
  var c2 = drawBigCircle({
    x1: halfWidth,
    x2: halfWidth + 25,
    y1: halfHeight,
    y2: halfHeight + 20,
    r: 40,
    opacity: 0.6,
    begin: 0.8
  });
  var c3 = drawBigCircle({
    x1: halfWidth,
    x2: halfWidth - 25,
    y1: halfHeight,
    y2: halfHeight + 20,
    r: 40,
    opacity: 0.6,
    begin: 0.8
  });
  g.appendChild(c0);
  g.appendChild(c1);
  g.appendChild(c2);
  g.appendChild(c3);
  return g;
}

function drawBigCircle(config) {
  var c = Draw('circle', {
    r: config.r,
    fill: '#22E2ED',
    opacity: 0,
    filter: 'url(#shadow)'
  });
  var a0 = Draw('animate', {
    attributeName: 'cx',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: config.x1 + ';' + config.x2 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a1 = Draw('animate', {
    attributeName: 'cy',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: config.y1 + ';' + config.y2 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a2 = Draw('animate', {
    attributeName: 'opacity',
    begin: config.begin + 's',
    dur: '0.4s',
    fill: 'freeze',
    values: '0;' + config.opacity + ';',
  });
  c.appendChild(a0);
  c.appendChild(a1);
  c.appendChild(a2);
  return c;
}

function drawShapes() {
  var g = Draw('g', {});
  var s0 = generateElements(60, drawCircle);
  s0.map(function(shape) {
    g.appendChild(shape);
  });
  var s1 = generateElements(30, drawRect);
  s1.map(function(shape) {
    g.appendChild(shape);
  });
  var s2 = generateElements(30, drawTriangle);
  s2.map(function(shape) {
    g.appendChild(shape);
  });
  return g;
}

function generateElements(length, drawFunction) {
  var elements = [];
  for(var i = 0; i < length; i++) {
    var pAsc = (i / length);
    var pDesc = (length - i) / length;
    var p = (pAsc + (pDesc / 9));
    var x = scatterFromPoint((-halfWidth*scale), (halfWidth*scale), p, (halfWidth));
    var y = scatterFromPoint((-halfHeight*scale), (halfHeight*scale), p, (halfHeight));
    var r = getRandomBetween(minR, maxR);
    var b = getRandomBetween(begin, begin + 0.8);
    var o = 0.2 * (r / maxR);
    var element = drawFunction({
      x1: x, x2: x,
      y1: y + 20, y2: y,
      r: r,
      opacity: o,
      begin: b
    });
    elements.push(element)
  }
  return elements;
}

function drawCircle(config) {
  var c = Draw('circle', {
    r: config.r,
    fill: '#22E2ED',
    opacity: 0
  });
  var a0 = Draw('animate', {
    attributeName: 'cx',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: config.x1 + ';' + config.x2 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a1 = Draw('animate', {
    attributeName: 'cy',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: config.y1 + ';' + config.y2 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a2 = Draw('animate', {
    attributeName: 'opacity',
    begin: config.begin + 's',
    dur: '4.0s',
    fill: 'freeze',
    repeatCount: 'indefinite',
    values: (config.opacity - 0.1) + ';' +
            (config.opacity - 0.0) + ';' +
            (config.opacity - 0.1) + ';'
  });
  c.appendChild(a0);
  c.appendChild(a1);
  c.appendChild(a2);
  return c;
}

function drawRect(config) {
  var r = Draw('rect', {
    width: config.r * 3.5,
    height: config.r,
    rx: 5,
    ry: 5,
    fill: '#22E2ED',
    opacity: 0
  });
  var a0 = Draw('animate', {
    attributeName: 'x',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: config.x1 + ';' + config.x2 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a1 = Draw('animate', {
    attributeName: 'y',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: config.y1 + ';' + config.y2 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a2 = Draw('animate', {
    attributeName: 'opacity',
    begin: config.begin + 's',
    dur: '4.0s',
    fill: 'freeze',
    repeatCount: 'indefinite',
    values: (config.opacity - 0.1) + ';' +
            (config.opacity - 0.0) + ';' +
            (config.opacity - 0.1) + ';'
  });
  r.appendChild(a0);
  r.appendChild(a1);
  r.appendChild(a2);
  return r;
}

function drawTriangle(config) {
  var d0 = 'M ' + config.x1 + ' ' + config.y1 + ' ' +
  (config.x1 + (config.r*2)) + ' ' + (config.y1 + config.r) +
  ' ' + config.x1 + ' ' + (config.y1 + (config.r*2)) + ' Z';
  var d1 = 'M ' + config.x2 + ' ' + config.y2 + ' ' +
  (config.x2 + (config.r*2)) + ' ' + (config.y2 + config.r) +
  ' ' + config.x2 + ' ' + (config.y2 + (config.r*2)) + ' Z';
  var r = Draw('path', {
    fill: '#22E2ED',
    opacity: 0
  });
  var a0 = Draw('animate', {
    attributeName: 'd',
    begin: config.begin + 's',
    dur: '0.4s',
    calcMode: 'spline',
    fill: 'freeze',
    values: d0 + ';' + d1 + ';',
    keySplines: '0.0 0.4 0.6 1.0'
  });
  var a1 = Draw('animate', {
    attributeName: 'opacity',
    begin: config.begin + 's',
    dur: '4.0s',
    fill: 'freeze',
    repeatCount: 'indefinite',
    values: (config.opacity - 0.1) + ';' +
            (config.opacity - 0.0) + ';' +
            (config.opacity - 0.1) + ';'
  });
  r.appendChild(a0);
  r.appendChild(a1);
  return r;
}

function Draw(type, attributes) {
  var setElementAttributes = function(element, attributes) {
    for(var attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  };
  var element = document.createElementNS('http://www.w3.org/2000/svg', type);
  setElementAttributes(element, attributes);
  return element;
}

function scatterFromPoint(min, max, p, offset) {
  var newMin = Math.floor(min * p);
  var newMax = Math.floor(max * p);
  var point = getRandomBetween(offset - newMin, offset - newMax);
  return point;
}

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
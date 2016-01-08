$(function() {
  $("#box").addClass("color0");
});
var myFunction = function() {
  $("#box").switchClass("color0", "color1", 2000);
  $("#box").switchClass("color1", "color2", 2000);
  $("#box").switchClass("color2", "color3", 2000);
  $("#box").switchClass("color3", "color4", 2000);
  $("#box").switchClass("color4", "color5", 2000);
  $("#box").switchClass("color5", "color6", 2000);
  $("#box").switchClass("color6", "color7", 2000);
  $("#box").switchClass("color7", "color8", 2000);
  $("#box").switchClass("color8", "color9", 2000);
  $("#box").switchClass("color9", "color0", 2000);
};
setInterval(myFunction, 0, 20000);

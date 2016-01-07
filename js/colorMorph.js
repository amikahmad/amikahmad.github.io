$(function(){
  $("article").addClass( "color0" );
});
var myFunction = function(){
  $("article").switchClass( "color0", "color1", 2000 );
  $("article").switchClass( "color1", "color2", 2000 );
  $("article").switchClass( "color2", "color3", 2000 );
  $("article").switchClass( "color3", "color4", 2000 );
  $("article").switchClass( "color4", "color5", 2000 );
  $("article").switchClass( "color5", "color6", 2000 );
  $("article").switchClass( "color6", "color7", 2000 );
  $("article").switchClass( "color7", "color8", 2000 );
  $("article").switchClass( "color8", "color9", 2000 );
  $("article").switchClass( "color9", "color0", 2000 );
};
setInterval(myFunction, 0, 20000);

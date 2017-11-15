let container = document.getElementById("main-demo")
let dat = require('../../node_modules/dat.gui/build/dat.gui.min.js');
window.onload = () => {
   let gui = new dat.GUI();
   let scc = new SvgCircularCircle();
   gui.add(scc, 'size', 10, 1000).onChange(scc.render);
   gui.add(scc, 'borderSize', 1, 5).onChange(scc.render);
   gui.add(scc, 'corridorSize', 1, 50).onChange(scc.render);
   gui.add(scc, 'doorSize', 0, 30).onChange(scc.render);
   gui.add(scc, 'rotate').onChange(scc.render);
   gui.addColor(scc, 'color').onChange(scc.render);
   gui.addColor(scc, 'bgcolor').onChange(scc.render);
}


let SvgCircularCircle = function() {
   this.size = 200;
   this.borderSize = 2;
   this.corridorSize = 30;
   this.doorSize = 10;
   this.color = "#ffb52a";
   this.bgcolor = "#111";
   this.rotate = true;
   this.id = "scc-"+Math.round(Math.random()*100)
   this.createSVG = () => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", this.size)
    svg.setAttribute("height", this.size)
    svg.setAttribute("id", this.id)
    container.appendChild(svg)
    for(var i =0; i<this.size; i+=this.corridorSize)
      this.makeCircle(svg,this.size-i)
}
this.makeCircle = (svg,size) => {
 var svgNS = "http://www.w3.org/2000/svg";
 var rect = document.createElementNS(svgNS,'path');
 rect.setAttributeNS(null,'d',this.describeArc(this.size/2,  this.size/2, size/2-size/10/5, 0, 359 - (this.size/size)*this.doorSize));
 rect.setAttributeNS(null,'stroke-width',this.borderSize);
 rect.setAttributeNS(null,'stroke',this.color);
 rect.setAttributeNS(null,"stroke-linecap", "round")
 rect.setAttributeNS(null,'fill',this.bgcolor);
 if(this.rotate)
   rect.setAttributeNS(null,'transform','rotate('+Math.random()*360+','+this.size/2+', '+this.size/2+')');
svg.appendChild(rect);
}
this.circlePath = (cx, cy, r, d1, d2) => {
 return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
}
this.polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
 var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

 return {
  x: centerX + (radius * Math.cos(angleInRadians)),
  y: centerY + (radius * Math.sin(angleInRadians))
};
}
this.describeArc = (x, y, radius, startAngle, endAngle) => {

   var start = this.polarToCartesian(x, y, radius, endAngle);
   var end = this.polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
  "M", start.x, start.y,
  "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ]
  if(radius*2>this.corridorSize) d.push("L", end.x, end.y+this.corridorSize/2)
  d = d.join(" ");

  return d;
}
this.resetSVG = () => {
   if(document.getElementById(this.id)) document.getElementById(this.id).outerHTML = "";
}
this.render = () => {
   this.resetSVG()
   this.createSVG()
}
this.render()
}

/*

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
function makeCircle(svg, size) {
  var svgNS = "http://www.w3.org/2000/svg";
  var rect = document.createElementNS(svgNS,'path');
    rect.setAttributeNS(null,'d',describeArc(size/2,  size/2, size/2-size/10/5, 0, 350));
    rect.setAttributeNS(null,'stroke-width',2);
    rect.setAttributeNS(null,'stroke','black');
    rect.setAttributeNS(null,'fill','none');
    rect.setAttributeNS(null,'transform','rotate('+Math.random()*360+','+size/2+', '+size/2+')');
    svg.appendChild(rect);
}
function render(id){
  var svg = document.getElementById(id);
  var size = sliderValue("size");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  makeCircle(svg, size);
}

function initSlider(name, cb){
  var input = document.getElementById(name);
  var view = document.getElementById(name + "-view");
  view.innerHTML = name + ":" +input.value;

  input.oninput = function(){
    view.innerHTML = name + ":" +input.value;
    cb(input.value);
  };
}
function sliderValue(id){
  return document.getElementById(id).value;
}
initSlider("size",function(value){
  render("s");
});
render("s"); */
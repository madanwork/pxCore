var root = scene.root;

var url;
url = process.cwd() + "/../../images/skulls.png";
var bg = scene.createImage({url:url,xStretch:2,yStretch:2,parent:root});

url = process.cwd() + "/../../images/radial_gradient.png";
var bgShade = scene.createImage({url:url,xStretch:1,yStretch:1,parent:root});

var txt1 = scene.createText({x:10,text:"",parent:root,pixelSize:24});

url = process.cwd() + "/../../images/ball.png"
var ball = scene.createImage({url:url,x:450,y:350,parent:root,clip:true});
ball.cx = ball.w/2;
ball.cy = ball.h/2;

var childText = scene.createText({text:"Hello There!!!",parent:ball,textColor:0xff0000ff,pixelSize:64});
childText.y = ball.h/2-childText.h/2;
childText.x = ball.w/2-childText.w/2;
childText.cx = childText.w/2;
childText.cy = childText.h/2;
childText.animateTo({"r":360}, 1, 0, 2);

function fancy(p) {
  x1(p);
  y1(p);
  rotate1(p);
  scale1(p);
}

function x1(p) {
    p.animateTo({x:50}, 1.0, scene.PX_LINEAR, 0, x2);
}

function x2(p) {
    p.animateTo({x:450}, 3.0, scene.PX_EASEOUTELASTIC, 0, fancy);
}

function y1(p) {
    p.y = 100;
    p.animateTo({y:350}, 1.0, scene.PX_EASEOUTBOUNCE, 0, y2);
}

function y2(p) {
    p.animateTo({y:150}, 1.0, scene.PX_EASEOUTELASTIC, 0);
}

function rotate1(p) {
    p.r = 0;
    p.animateTo({r:-360}, 2.5, scene.PX_EASEOUTELASTIC, 0);
}

function scale1(p) {
    p.animateTo({sx:0.2,sy:0.2}, 1, scene.PX_LINEAR, 0, scale2);
}

function scale2(p) {
    p.animateTo({sx:2.0,sy:2.0}, 1.0, scene.PX_EXP1, 0, scale3);
}

function scale3(p) {
    p.animateTo({sx:1.0,sy:1.0}, 1.0, scene.PX_EASEOUTELASTIC, 0);
}

fancy(ball);

scene.on('onKeyDown', function(e) {
  console.log("onKeyDown:" + e.keyCode);
});

scene.on("onMouseMove", function(e) {
    txt1.text = "" + e.x+ ", " + e.y;
});

function updateSize(w, h) {
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
    txt1.y = h-txt1.h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.w, scene.h);

h = 1000;
w = 1000;

imgs = new Array(160);

function preload() {
    for(var i = 0; i < 160; ++i){
        imgs[i] = loadImage("work/mandels/mandel" + i.toString() + ".png");
    }
  }

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    frameRate(30);
}

i = 0

function draw(){

    image(imgs[i], 0, 0);

    if(i == 159) noLoop();

    i += 1

}
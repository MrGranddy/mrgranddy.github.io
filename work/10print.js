var h = 500
var w = 500
var box_len = 20

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    frameRate(30);
    background(0);
}

var i = 0
var j = 0

function draw(){
    stroke(255);

    if( random() < 0.5 )
        line(i, j, i + box_len, j + box_len);
    else
        line(i, j + box_len, i + box_len, j);

    i += box_len;
    if(i == w){
        i = 0;
        j += box_len;
    }
    if(j == h)
        noLoop();
        
}
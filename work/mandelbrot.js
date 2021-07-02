var w = 600;
var h = 400;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    frameRate(60);
}

function mandelIter(cx, cy, maxIter){

    var i = maxIter;

    var x = 0.0;
    var y = 0.0;
    var xx = 0;
    var yy = 0;
    var xy = 0;

    while(--i && xx + yy <= 16){

        xx = x * x;
        yy = y * y;
        xy = x * y;
        x = xx - yy + cx;
        y = xy + xy + cy;
    }

    return maxIter - i;

}

var xmin = -2;
var xmax = 1;
var ymin = -1;
var ymax = 1;
var xdif = xmax - xmin;
var ydif = ymax - ymin;
var maxIterations = 100;

var c1 = [ 146, 168, 209 ];
var c2 = [ 247, 202, 201 ];

function draw(){

    for( var i = 0; i < height; ++i ){
        for( var j = 0; j < width; ++j ){

            var x = xmin + xdif * j / (width - 1);
            var y = ymin + ydif * i / (height - 1);
            var iter = mandelIter(x, y, maxIterations);

            stroke( c1[0] + iter * (c2[0] - c1[0]) / maxIterations , c1[1] + iter * (c2[1] - c1[1]) / maxIterations , c1[2] + iter * (c2[2] - c1[2]) / maxIterations );
            point( j, i );

        }
    }

    noLoop();

}
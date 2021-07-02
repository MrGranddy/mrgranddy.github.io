var fibs = {}
fibs[1] = 1;
fibs[2] = 1;
function fibo(x){
    if( fibs[x] != null ) return fibs[x];
    fibs[x] = fibo(x - 1) + fibo(x - 2);
    return fibs[x];
}

var start_fibo = 15;
var margin = 2;
var w = fibo(start_fibo) + fibo(start_fibo - 1) + margin * 2;
var h = fibo(start_fibo) + margin * 2;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    background(51);
    noFill();

    frameRate(5);
}

function polar2cart(radius, theta){ return [cos(theta) * radius, sin(theta) * radius]; }
function deg2rad(deg){ return deg * PI / 180; }

var c1 = [118, 75, 162];
var c2 = [102, 126, 234];
var c_dif = [c2[0] - c1[0], c2[1] - c1[1], c2[2] - c1[2]];

var curr_iter = 0;
var left_corner = [margin, margin];

function draw(){

    strokeWeight(1);
    stroke(0);

    rect(left_corner[0], left_corner[1], fibo(start_fibo - curr_iter), fibo(start_fibo - curr_iter));

    strokeWeight(margin);
    stroke(200, 0, 0);

    if( curr_iter % 4 == 0 ){
        arc(left_corner[0] + fibo(start_fibo - curr_iter), left_corner[1] + fibo(start_fibo - curr_iter),
        fibo(start_fibo - curr_iter) * 2, fibo(start_fibo - curr_iter) * 2, PI, -HALF_PI);
        left_corner[0] += fibo(start_fibo - curr_iter);
    }
    else if( curr_iter % 4 == 1 ){
        arc(left_corner[0], left_corner[1] + fibo(start_fibo - curr_iter),
        fibo(start_fibo - curr_iter) * 2, fibo(start_fibo - curr_iter) * 2, -HALF_PI, 0);
        left_corner[0] += fibo(start_fibo - curr_iter - 2);
        left_corner[1] += fibo(start_fibo - curr_iter);
    }
    else if( curr_iter % 4 == 2 ){
        arc(left_corner[0], left_corner[1],
        fibo(start_fibo - curr_iter) * 2, fibo(start_fibo - curr_iter) * 2, 0, HALF_PI);
        left_corner[0] -= fibo(start_fibo - curr_iter - 1);
        left_corner[1] += fibo(start_fibo - curr_iter - 2);
    }
    else if( curr_iter % 4 == 3 ){
        arc(left_corner[0] + fibo(start_fibo - curr_iter), left_corner[1],
        fibo(start_fibo - curr_iter) * 2, fibo(start_fibo - curr_iter) * 2, HALF_PI, PI);
        left_corner[1] -= fibo(start_fibo - curr_iter - 1);
    }

    if(curr_iter == start_fibo - 2) noLoop();

    curr_iter += 1;
    
}
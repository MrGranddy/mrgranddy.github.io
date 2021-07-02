var w = 300;
var h = 300;
var c1 = [118, 75, 162];
var c2 = [102, 126, 234];
var frame = [-2, 2, -2, 2]; // x_left, x_right, y_left, y_right
var max_iter = 50
var div_range = 4

function julia_iter(zx, zy, cx, cy){
    var xx = 0;
    var yy = 0;
    var xy = 0;
    var x = zx;
    var y = zy;
    var iter = max_iter;
    while( iter-- && xx + yy < div_range ){
        xx = x * x;
        yy = y * y;
        xy = x * y;
        x = xx - yy + cx;
        y = 2 * xy + cy;
    }
    return max_iter - iter - 1;
}

var c_dif = [c2[0] - c1[0], c2[1] - c1[1], c2[2] - c1[2]];
var c_unit = [c_dif[0] / max_iter, c_dif[1] / max_iter, c_dif[2] / max_iter];
var f_dif = [frame[1] - frame[0], frame[3] - frame[2]];
var f_unit = [f_dif[0] / w, f_dif[1] / h];

function setup(){
    var canvas = createCanvas(w * 2, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    
    var iter;
    for(var i = 0; i < w; ++i){
        for(var j = 0; j < h; ++j){
            iter = julia_iter(0, 0, frame[0] + i * f_unit[0], frame[2] + j * f_unit[1]);
            stroke(c1[0] + c_unit[0] * iter, c1[1] + c_unit[1] * iter, c1[2] + c_unit[2] * iter);
            point(i + w, j);
        }
    }
    stroke(0);
    line(w, 0, w, h);
}

function draw(){

    cx = frame[0] + (mouseX - w) * f_unit[0];
    cy = frame[2] + mouseY * f_unit[1];
    var iter;

    for(var i = 0; i < w; ++i){
        for(var j = 0; j < h; ++j){
            iter = julia_iter(frame[0] + i * f_unit[0], frame[2] + j * f_unit[1], cx, cy);
            stroke(c1[0] + c_unit[0] * iter, c1[1] + c_unit[1] * iter, c1[2] + c_unit[2] * iter);
            point(i, j);
        }
    }

}
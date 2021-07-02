var num_stck_squares = 3;



var h = 320 * 2
var w = 320 * 2
var num_ang_squares = 20
var center = [w / 2, h / 2]

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    frameRate(30);
    background(255);
}

function polar_2_cart(rad, thet){
    return [ rad * cos(thet), rad * sin(thet) ];
}

function draw(){
    var theta = 0.31415;
    var alpha = 10 * 10;
    var x = 10 * 10;
    var y = 6.83231 * 10;
    var z = 4.66804 * 10;
    var beta = 3.16768 * 10;
    var num_ang_sqrs = 20;

    var reaches = [ alpha, alpha + z, alpha + z + y, alpha + z + y + x ];

    for(var i = 0; i < num_ang_sqrs; ++i){
        var end_line = [ polar_2_cart(reaches[3], theta * i), polar_2_cart(reaches[3], theta * (i + 1)) ];
        var end_y = [ polar_2_cart(reaches[2], theta * i), polar_2_cart(reaches[2], theta * (i + 1)) ];
        var end_z = [ polar_2_cart(reaches[1], theta * i), polar_2_cart(reaches[1], theta * (i + 1)) ];
        var end_alpha = [ polar_2_cart(reaches[0], theta * i), polar_2_cart(reaches[0], theta * (i + 1)) ];
        stroke(0);
        line(center[0], h - center[1], center[0] + end_line[0][0], h - (center[1] + end_line[0][1]));
        stroke(255, 0, 0);
        fill(255, 0, 0);
        ellipse(center[0] + end_y[0][0], h - (center[1] + end_y[0][1]), 3);
        ellipse(center[0] + end_z[0][0], h - (center[1] + end_z[0][1]), 3);
        ellipse(center[0] + end_alpha[0][0], h - (center[1] + end_alpha[0][1]), 3);
        stroke(0);
        line( center[0] + end_line[0][0], h - (center[1] + end_line[0][1]), center[0] + end_line[1][0], h - (center[1] + end_line[1][1]) );
        line( center[0] + end_y[0][0], h - (center[1] + end_y[0][1]), center[0] + end_y[1][0], h - (center[1] + end_y[1][1]) );
        line( center[0] + end_z[0][0], h - (center[1] + end_z[0][1]), center[0] + end_z[1][0], h - (center[1] + end_z[1][1]) );
        line( center[0] + end_alpha[0][0], h - (center[1] + end_alpha[0][1]), center[0] + end_alpha[1][0], h - (center[1] + end_alpha[1][1]) );
    }

    noLoop();
}
var sqr_len = 10;
var num_of_sqrs = 50;
var h = (sqr_len + 1) * num_of_sqrs - 1;
var w = h;
var grid = new Array(num_of_sqrs);
var colors = [];

var curr_pos = [];
var curr_dir = 0;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    colors = [ 'white', 'red' ];
    for(var i = 0; i < num_of_sqrs; ++i){
        grid[i] = new Array(num_of_sqrs);
        for(var j = 0; j < num_of_sqrs; ++j) grid[i][j] = 0;
    }

    curr_pos = [ floor(num_of_sqrs / 2), floor(num_of_sqrs / 2) ];

    frameRate(60);
}



function draw(){

    background(255);

    stroke(0);
    strokeWeight(1);
    
    for(var i = 0; i < num_of_sqrs; ++i){
        for(var j = 0; j < num_of_sqrs; ++j){
            fill(colors[grid[i][j]]);
            rect(i * sqr_len, j * sqr_len, sqr_len, sqr_len);
        }
    }
    
    if( grid[ curr_pos[0] ][ curr_pos[1] ] == 0 ){
        curr_dir += 1;
    }
    else if( grid[ curr_pos[0] ][ curr_pos[1] ] == 1 ){
        curr_dir += 3;
    }
    curr_dir %= 4;

    grid[ curr_pos[0] ][ curr_pos[1] ] += 1;
    grid[ curr_pos[0] ][ curr_pos[1] ] %= 2;

    if( curr_dir == 0 ){
        curr_pos[1] += num_of_sqrs - 1;
        curr_pos[1] %= num_of_sqrs;
    }
    else if( curr_dir == 1 ){
        curr_pos[0] += 1;
        curr_pos[0] %= num_of_sqrs;
    }
    else if( curr_dir == 2 ){
        curr_pos[1] += 1;
        curr_pos[1] %= num_of_sqrs;
    }
    else if( curr_dir == 3 ){
        curr_pos[0] += num_of_sqrs - 1;
        curr_pos[0] %= num_of_sqrs;
    }

}
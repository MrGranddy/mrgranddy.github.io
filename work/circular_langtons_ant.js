var h = 600;
var w = 600;
var r = 300;
var number_of_rows = 6;
var row_width = 50;
var grid = new Array(number_of_rows);

var colors = [];

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    colors = [ 'white', 'red', 'blue', 'green'];
    for(var i = 0; i < number_of_rows; ++i){
        var num = pow(3, i);
        grid[i] = new Array( num );
        for(var j = 0; j < num; ++j) grid[i][j] = 0;
    }
    frameRate(60);
}

function polar2cart(theta, radius){ return [cos(theta) * radius, sin(theta) * radius]; }

var curr_pos = [0, 0];
var curr_dir = 0;

// 0 right, 1 left

function draw(){

    background(151);

    stroke(0);
    strokeWeight(1);
    fill(255);
    
    for(var i = number_of_rows; i >= 1; --i){
        var angle = 2 * PI / pow(3, i - 1);
        for(var j = 0; j < pow(3, i - 1); ++j){
            console.log('value', grid[i-1][j]);
            console.log('direction', curr_dir);
            console.log('i', i);
            console.log('j', j)
            fill(colors[grid[i-1][j]]);
            translate(width/2, height/2);
            arc(0, 0, i * row_width * 2, i * row_width * 2, 0, angle);
            rotate(angle);
            translate(-width/2, -height/2);
        }
    }

    if( grid[ curr_pos[0] ][curr_pos[1] ] == 0 || grid[ curr_pos[0] ][curr_pos[1] ] == 2 ){
        curr_dir = (curr_dir + 1) % 6;
    }
    else if( grid[ curr_pos[0] ][curr_pos[1] ] == 1 || grid[ curr_pos[0] ][curr_pos[1] ] == 3){
        curr_dir = (curr_dir + 4) % 6;
    }

    grid[ curr_pos[0] ][curr_pos[1] ] = (grid[ curr_pos[0] ][curr_pos[1] ] + 1) % 4;

    if( curr_dir == 0 ){
        curr_pos[1] += pow(3, curr_pos[0]) - 1;
        curr_pos[1] %= pow(3, curr_pos[0]);
    }
    else if( curr_dir == 1 ){
        if( curr_pos[0] < number_of_rows - 1){
            curr_pos[1] = (curr_pos[1] * 3) % pow(3, curr_pos[0] + 1);
            curr_pos[0] += 1;
        }
        else{
            curr_pos[0] = 0;
            curr_pos[1] = 0;
        }
    }
    else if( curr_dir == 2 ){
        if( curr_pos[0] < number_of_rows - 1 ){
            curr_pos[1] = (curr_pos[1] * 3 + 1) % pow(3, curr_pos[0] + 1);
            curr_pos[0] += 1;
        }
        else{
            curr_pos[0] = 0;
            curr_pos[1] = 0;
        }
    }
    else if( curr_dir == 3 ){
        if( curr_pos[0] < number_of_rows - 1){
            curr_pos[1] = (curr_pos[1] * 3 + 2) % pow(3, curr_pos[0] + 1);
            curr_pos[0] += 1;
        }
        else{
            curr_pos[0] = 0;
            curr_pos[1] = 0;
        }
    }
    else if( curr_dir == 4 ){
        if(curr_pos[0] != 0) curr_pos[0] -= 1;
        curr_pos[1] = floor(curr_pos[1] / 3);
    }
    else if( curr_dir == 5){
        curr_pos[1] += 1;
        curr_pos[1] %= pow(3, curr_pos[0]);
    }
}
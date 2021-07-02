
var frame_len, radius, num_of_directions, num_of_rows, web_points, drawn, angle_gap;

function setup(){

    frame_len = 500;

    var canvas = createCanvas(frame_len, frame_len);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    frameRate(60);

    radius = floor(frame_len / 2);

    num_of_directions = 10;
    num_of_rows = 10;
    angle_gap = TWO_PI / num_of_directions;

    var radius_fluctuation_rate = 0.3;
    var angle_fluctuation_rate = 0.1;
    var row_gap = floor(radius / num_of_rows);
    
    web_points = [];
    drawn = [];

    for(var i = 0; i < num_of_directions; ++i){
        web_points.push([]);
        for(var j = 0; j < num_of_rows; ++j){
            var rad_val = row_gap * ((j + 1) + random(-0.5, 0.5) * angle_fluctuation_rate);
            var ang_val = angle_gap * (i + random(-0.5, 0.5) * angle_fluctuation_rate);
            web_points[i].push([ang_val, rad_val]);
        }
    }

    for(var i = 0; i < num_of_directions; ++i){
        drawn.push([]);
        for(var j = 0; j < num_of_rows; ++j)
            drawn[i].push([0, 0]); // 0 is row, 1 is col
    }

}

function draw_background(){
    background(255);
    for(var dir = 0; dir < num_of_directions; ++dir){
        for(var row = 0; row < num_of_rows; ++row){
            if(drawn[dir][row][0]){
                var x1, x2, y1, y2;
                if(dir == num_of_directions - 1){
                    x1 = cos(web_points[dir][row][0]) * web_points[dir][row][1];
                    x2 = cos(web_points[0][row][0]) * web_points[0][row][1];
                    y1 = sin(web_points[dir][row][0]) * web_points[dir][row][1];
                    y2 = sin(web_points[0][row][0]) * web_points[0][row][1];   
                }
                else{
                    x1 = cos(web_points[dir][row][0]) * web_points[dir][row][1];
                    x2 = cos(web_points[dir+1][row][0]) * web_points[dir+1][row][1];
                    y1 = sin(web_points[dir][row][0]) * web_points[dir][row][1];
                    y2 = sin(web_points[dir+1][row][0]) * web_points[dir+1][row][1];   
                }
                line(radius + x1, radius - y1, radius + x2, radius - y2);
            }
            if(drawn[dir][row][1]){
                var x1, x2, y1, y2;
                if(row == 0){
                    x1 = 0;
                    x2 = cos(web_points[dir][row][0]) * web_points[dir][row][1];
                    y1 = 0;
                    y2 = sin(web_points[dir][row][0]) * web_points[dir][row][1];   
                }
                else{
                    x1 = cos(web_points[dir][row-1][0]) * web_points[dir][row-1][1];
                    x2 = cos(web_points[dir][row][0]) * web_points[dir][row][1];
                    y1 = sin(web_points[dir][row-1][0]) * web_points[dir][row-1][1];
                    y2 = sin(web_points[dir][row][0]) * web_points[dir][row][1];   
                }
                line(radius + x1, radius - y1, radius + x2, radius - y2);
            }
        }
    }
}

var context_switch = 1;

function draw_row(dir, row, time, duration){
    var x1, x2, y1, y2, x_step, y_step;
    if( dir == num_of_directions - 1 ){
        x1 = cos(web_points[dir][row][0]) * web_points[dir][row][1];
        x2 = cos(web_points[0][row][0]) * web_points[0][row][1];
        y1 = sin(web_points[dir][row][0]) * web_points[dir][row][1];
        y2 = sin(web_points[0][row][0]) * web_points[0][row][1];
    }
    else{
        x1 = cos(web_points[dir][row][0]) * web_points[dir][row][1];
        x2 = cos(web_points[dir+1][row][0]) * web_points[dir+1][row][1];
        y1 = sin(web_points[dir][row][0]) * web_points[dir][row][1];
        y2 = sin(web_points[dir+1][row][0]) * web_points[dir+1][row][1];
    }
    x_step = (x2 - x1) / duration;
    y_step = (y2 - y1) / duration;
    stroke(0);
    line(radius + x1, radius - y1, radius + x1 + x_step * time, radius - y1 - y_step * time);
    if(time + 1 == duration){
        drawn[dir][row][0] = 1;
        context_switch = 0;
    }
}

var r_step;

function pull_release(dir, row, time, duration){
    var half_duration = duration / 2;
    if(time == 0){
        var r1 = web_points[dir][row][1];
        var r2 = web_points[dir][row+1][1];
        var dif_r = r2 - r1;
        r_step = dif_r / (duration * 2);
    }
    if( time < half_duration ){
        for(var i = row+1; i < num_of_rows; ++i)
            web_points[dir - 1][i][1] -= r_step * (time % half_duration);
    }
    else{
        for(var i = row+1; i < num_of_rows; ++i)
            web_points[dir - 1][i][1] += r_step * (time % half_duration);
    }
    if(time + 1 == duration){
        drawn[dir-1][row+1][1] = 1;
        context_switch = 1;
    }
}

function jump_row(dir, row, time, duration){

}

var glob_time = 0;
var glob_dir = 0;
var glob_row = 1;
var duration = 20;

function draw(){

    draw_background();

    if(glob_row == 0){
        if(glob_time < duration * (glob_dir + 1) && glob_dir < num_of_directions)
            draw_row(glob_dir, num_of_rows - glob_row - 1, glob_time % duration, duration);
        else
            glob_dir += 1;
    }
    else{
        if(glob_time < duration * (glob_dir + 1) * 2 && glob_dir < num_of_directions){
            if(context_switch == 1){
                draw_row(glob_dir, num_of_rows - glob_row - 1, glob_time % duration, duration);
                console.log("Nay");
            }
            else if(glob_dir + 1 < num_of_directions){
                pull_release(glob_dir + 1, num_of_rows - glob_row - 1, glob_time % duration, duration);
                console.log("Yeah");
            }
        }
        else{ 
            glob_dir += 1;
        }
    }

    if(glob_dir == num_of_directions){ glob_dir = 0; glob_row += 1; glob_time = 0;}
    if(glob_row == num_of_rows) noLoop();

    glob_time += 1;

}

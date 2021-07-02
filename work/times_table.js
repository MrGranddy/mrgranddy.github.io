var w = 600;
var h = 600;
var R;
var r;

var partition = 200;
var times = 0;
var unit_angle;

var connection_map;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    R = min(w, h) * 0.95;
    r = R / 2;
    unit_angle = TWO_PI / partition;

    connection_map = new Array(partition);
    for(var i = 0; i < partition; ++i){
        connection_map[i] = -1;
    }
    
}

function polar2cart(radius, theta){ return [cos(theta) * radius, sin(theta) * radius]; }

function draw(){

    background(51);
    stroke(51, 0, 0);
    strokeWeight(2);
    noFill();
    ellipse(width / 2, height / 2, R, R);

    fill(200, 0, 0);
    stroke(0);
    strokeWeight(1);

    for(var i = 0; i < partition; ++i){
        var temp = polar2cart(r, i * unit_angle);
        ellipse(temp[0] + width / 2, height / 2 - temp[1], 3, 3);
    }

    for(var curr_point = 0; curr_point < partition; ++curr_point){
        var connected = false;

        for(var i = 0; i < partition; ++i){
            if(connection_map[i] == curr_point){
                connected = true;
                break;
            }
        }

        if(!connected){
            connection_map[curr_point] = (curr_point * times) % partition;
        }

    }

    strokeWeight(2);
    stroke(200, 0, 0);

    for(var i = 0; i < partition; ++i){
        var temp1 = polar2cart(r, i * unit_angle);
        var temp2 = polar2cart(r, connection_map[i] * unit_angle);
        line(width / 2 + temp1[0], height / 2 - temp1[1], width / 2 + temp2[0], height / 2 - temp2[1]);
    }

    times += 0.005;

    var fps = frameRate();
    fill(255);
    noStroke();
    text("FPS: " + fps.toFixed(2), 10, height - 10);

}
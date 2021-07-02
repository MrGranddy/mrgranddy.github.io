var w = 800;
var h = 800;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    frameRate(30);
}

var points = [ [-w/4, -h/4], [-w/4, h/4], [w/4, h/4], [w/4, -h/4] ];

var partition = 4;

function mouseClicked(){
    var mini = new Array(points.length);
    for(var i = 0; i < points.length; ++i){
        mini[i] = new Array(2);
        mini[i][0] = points[i][0] / 2;
        mini[i][1] = points[i][1] / 2;
    }
    partition *= 2;
    unit_x = w / partition;
    unit_y = h / partition;
    var temp = new Array(points.length * 4);
    for(var i = points.length; i < points.length * 2; ++i){
        temp[i] = new Array(2);
        temp[i][0] = mini[i % points.length][0] - w / 4;
        temp[i][1] = mini[i % points.length][1] + h / 4; 
    }
    for(var i = points.length * 2; i < points.length * 3; ++i){
        temp[i] = new Array(2);
        temp[i][0] = mini[i % points.length][0] + w / 4;
        temp[i][1] = mini[i % points.length][1] + h / 4; 
    }
    for(var i = 0; i < points.length; ++i){
        temp[points.length - 1 - i] = new Array(2);
        temp[points.length - 1 - i][0] = mini[i][1]  - w / 4;
        temp[points.length - 1 - i][1] = -mini[i][0] - h / 4;
    }
    for(var i = 0; i < points.length; ++i){
        temp[points.length * 4 - 1 - i] = new Array(2);
        temp[points.length * 4 - 1 - i][0] = -mini[i][1] + w / 4;
        temp[points.length * 4 - 1 - i][1] = mini[i][0] - h / 4;
    }
    points = temp;
    loop();
}

function draw(){

    background(101);
    stroke(101, 0, 0);
    strokeWeight(1);
    
    for(var i = 0; i < points.length - 1; ++i){
        line(points[i][0] + w/2, h/2 - points[i][1], points[i+1][0] + w/2, h/2 - points[i+1][1]);
    }

    noLoop();

}
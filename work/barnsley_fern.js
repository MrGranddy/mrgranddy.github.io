var h = 800;
var w = 800;

let matmul;
let vector_add;
let f;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    matmul = (matrix, vector) => {
        return { "x": matrix[0][0] * vector.x + matrix[0][1] * vector.y,
                 "y": matrix[1][0] * vector.x + matrix[1][1] * vector.y };
    };

    vector_add = (v1, v2) => {
        return { "x": v1.x + v2.x, "y": v1.y + v2.y };
    };

    f = new Array(5);

    f[1] = v => { return vector_add( matmul( [[0.00, 0.00],[0.00, 0.16]], v ), {"x": 0.00, "y": 0.00}); };
    f[2] = v => { return vector_add( matmul( [[0.85, 0.04],[-0.04, 0.85]], v ), {"x": 0.00, "y": 1.60}); };
    f[3] = v => { return vector_add( matmul( [[0.20, -0.26],[0.23, 0.22]], v ), {"x": 0.00, "y": 1.60}); };
    f[4] = v => { return vector_add( matmul( [[-0.15, 0.28],[0.26, 0.24]], v ), {"x": 0.00, "y": 0.44}); };

    background(51);
    stroke(0,255,0);
    strokeWeight(1);

}

let curr_point = { "x": 0, "y": 0};

function draw(){

    translate(w/2,10);

    point(curr_point.x * w / 10, curr_point.y * h / 10);

    r = random();
    if(r >= 0 && r < 0.01)
        curr_point = f[1](curr_point);
    else if(r >= 0.01 && r < 0.01 + 0.85)
        curr_point = f[2](curr_point);
    else if(r >= 0.01 + 0.85 && r < 0.01 + 0.85 + 0.07)
        curr_point = f[3](curr_point);
    else if(r >= 0.01 + 0.85 + 0.07 && r < 0.01 + 0.85 + 0.07 + 0.07)
        curr_point = f[4](curr_point);

    console.log("A");

    translate(-w/2,-10);

}
let h = 500;
let w = 500;

let points;
let matrix;
let num_parts;

let matmul;
let connect;
let mult;
let pol_to_cart;


function setup(){
    let canvas = createCanvas(w, h, WEBGL);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    matmul = (matrix, vector) => {
        result = new Array(matrix.length);
        for(let i = 0; i < matrix.length; ++i){
            result[i] = 0;
            for(let j = 0; j < vector.length; ++j){
                result[i] += matrix[i][j] * vector[j];
            }
        }
        return result;
    };

    connect = (offset, p1, p2, arr) => {
        line(arr[p1+offset][0], arr[p1+offset][1], arr[p1+offset][2], arr[p2+offset][0], arr[p2+offset][1], arr[p2+offset][2]);
    };

    mult = (vector, scale) => {
        for(let i = 0; i < vector.length; ++i){
                vector[i] *= scale;
            }
    }

    pol_to_cart = (r, gamma, theta) => {
        return [ r * cos(theta) * cos(gamma), r * cos(theta) * sin(gamma), r * sin(theta) ];
    }

    let scale = 1;
    points = new Array(16);
    points[0] = [-scale,-scale,-scale,-scale];
    points[1] = [scale,-scale,-scale,-scale];
    points[2] = [scale,scale,-scale,-scale];
    points[3] = [-scale,scale,-scale,-scale];
    points[4] = [-scale,-scale,scale,-scale];
    points[5] = [scale,-scale,scale,-scale];
    points[6] = [scale,scale,scale,-scale];
    points[7] = [-scale,scale,scale,-scale];
    points[8] = [-scale,-scale,-scale,scale];
    points[9] = [scale,-scale,-scale,scale];
    points[10] = [scale,scale,-scale,scale];
    points[11] = [-scale,scale,-scale,scale];
    points[12] = [-scale,-scale,scale,scale];
    points[13] = [scale,-scale,scale,scale];
    points[14] = [scale,scale,scale,scale];
    points[15] = [-scale,scale,scale,scale];

    num_parts = 10;
    let gamma = TWO_PI / num_parts;
    let theta = PI / num_parts;

    matrix = new Array(num_parts);
    for(let i = 0; i < num_parts; ++i) matrix[i] = new Array(num_parts);
    for(let i = 0; i < num_parts; ++i){
        for(let j = 0; j < num_parts; ++j){
            matrix[i][j] = pol_to_cart(200, i * theta, j * gamma);
        }
    } 

    background(51);
}

let angle = 0;

function draw(){

    background(51);
    rotateX(QUARTER_PI);
    rotateY(angle);
    rotateZ(-QUARTER_PI);

    /*
    let projecteds = new Array(points.length);

    for(let i = 0; i < points.length; ++i){

        let distance = 2;
        let rotateXY = [[cos(angle),-sin(angle),0,0],
                        [sin(angle),cos(angle),0,0],
                        [0,0,1,0],
                        [0,0,0,1]];
        let rotateYW = [[1,0,0,0],
                        [0,cos(angle),0,-sin(angle)],
                        [0,0,1,0],
                        [0,sin(angle),0,cos(angle)]];
        let rotateZW = [[1,0,0,0],
                        [0,1,0,0],
                        [0,0,cos(angle),-sin(angle)],
                        [0,0,sin(angle),cos(angle)]];

        let rotated = matmul(rotateXY, points[i]);
        //rotated = matmul(rotateYW, rotated);
        rotated = matmul(rotateZW, rotated);
        let w = 1 / (distance - rotated[3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];

        let projected = matmul(projection_matrix, rotated);
        mult(projected, 75);
        projecteds[i] = projected;

        stroke(100,0,0);
        translate(projected[0], projected[1], projected[2]);
        sphere(4);
        translate(-projected[0], -projected[1], -projected[2]);

    }*/

    stroke(255);

    for(let i = 0; i < num_parts; ++i){
        for(let j = 0; j < num_parts; ++j){
            let p = matrix[i][j];
            translate(p[0], p[1], p[2]);
            sphere(2);
            translate(-p[0], -p[1], -p[2]);
        }
    }

    for(let i = 0; i < num_parts; ++i){
        for(let j = 0; j < num_parts-1; ++j){
            let p1 = matrix[i][j];
            let p2 = matrix[i][j+1];
            line(p1[0],p1[1],p1[2],p2[0],p2[1],p2[2]);
        }
        let p1 = matrix[i][num_parts-1];
        let p2 = matrix[i][0];
        line(p1[0],p1[1],p1[2],p2[0],p2[1],p2[2]);
    }

    //translate(projected[0], projected[1], projected[2]);
    //sphere(4);
    //translate(-projected[0], -projected[1], -projected[2]);

    /*
    for(let i = 0; i < 4; ++i){
        stroke(255,0,0);
        connect(0, i, i+4, projecteds);
        stroke(0,255,0);
        connect(0, i, (i+1)%4, projecteds);
        stroke(0,0,255);
        connect(0, i+4, ((i+1)%4)+4, projecteds);
    }
    for(let i = 0; i < 4; ++i){
        stroke(255,0,0);
        connect(8, i, i+4, projecteds);
        stroke(0,255,0);
        connect(8, i, (i+1)%4, projecteds);
        stroke(0,0,255);
        connect(8, i+4, ((i+1)%4)+4, projecteds);
    }
    for(let i = 0; i < 8; ++i){
        stroke(175,175,0);
        connect(0, i, i+8, projecteds);
    }
    */

    rotateX(-QUARTER_PI);
    rotateZ(QUARTER_PI);

    angle += 0.03;

}
var h = 500;
var w = 500;

let side_len = 1;

let points;
let connect;
let matmul;
let translate_point;
let mult;

function sleep( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function setup(){

    var canvas = createCanvas(w, h, WEBGL);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    points = new Array(36);

    for(let i = 0; i < 5; ++i){
        points[i * 4 + 0] = [ -0.5 * side_len, -0.5 * side_len, 1.5 * side_len - i * side_len, 0 ];
        points[i * 4 + 1] = [ -0.5 * side_len, 0.5 * side_len, 1.5 * side_len - i * side_len, 0 ];
        points[i * 4 + 2] = [ 0.5 * side_len, 0.5 * side_len, 1.5 * side_len - i * side_len, 0 ];
        points[i * 4 + 3] = [ 0.5 * side_len, -0.5 * side_len, 1.5 * side_len - i * side_len, 0 ];
    }
    points[20] = [ -0.5 * side_len, -1.5 * side_len, -0.5 * side_len, 0 ];
    points[21] = [ -0.5 * side_len, -1.5 * side_len, 0.5 * side_len, 0 ];
    points[22] = [ 0.5 * side_len, -1.5 * side_len, 0.5 * side_len, 0 ];
    points[23] = [ 0.5 * side_len, -1.5 * side_len, -0.5 * side_len, 0 ];
    points[24] = [ -0.5 * side_len, 1.5 * side_len, -0.5 * side_len, 0 ];
    points[25] = [ -0.5 * side_len, 1.5 * side_len, 0.5 * side_len, 0 ];
    points[26] = [ 0.5 * side_len, 1.5 * side_len, 0.5 * side_len, 0 ];
    points[27] = [ 0.5 * side_len, 1.5 * side_len, -0.5 * side_len, 0 ];
    points[28] = [ -1.5 * side_len, -0.5 * side_len, -0.5 * side_len, 0 ];
    points[29] = [ -1.5 * side_len, -0.5 * side_len, 0.5 * side_len, 0 ];
    points[30] = [ -1.5 * side_len, 0.5 * side_len, 0.5 * side_len, 0 ];
    points[31] = [ -1.5 * side_len, 0.5 * side_len, -0.5 * side_len, 0 ];
    points[32] = [ 1.5 * side_len, -0.5 * side_len, -0.5 * side_len, 0 ];
    points[33] = [ 1.5 * side_len, -0.5 * side_len, 0.5 * side_len, 0 ];
    points[34] = [ 1.5 * side_len, 0.5 * side_len, 0.5 * side_len, 0 ];
    points[35] = [ 1.5 * side_len, 0.5 * side_len, -0.5 * side_len, 0 ];

    cubes = new Array(7);

    cubes[0] = [ points[0], points[1], points[2], points[3] ];
    cubes[1] = [ points[12], points[13], points[14], points[15] ];
    cubes[2] = [ points[20], points[21], points[22], points[23] ];
    cubes[3] = [ points[24], points[25], points[26], points[27] ];
    cubes[4] = [ points[28], points[29], points[30], points[31] ];
    cubes[5] = [ points[32], points[33], points[34], points[35] ];
    cubes[6] = [ points[16], points[17], points[18], points[19] ];

    connect = (arr, p1, p2) => {
        line(arr[p1][0], arr[p1][1], arr[p1][2], arr[p2][0], arr[p2][1], arr[p2][2]);
    };

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

    translate_point = (v1, v2) => {
        return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2], v1[3] + v2[3]];
    };

    negate_point = p => {
        return [ -p[0], -p[1], -p[2], -p[3] ];
    };

    mult = p => {
        let s = 100;
        return [ p[0] * s, p[1] * s, p[2] * s, p[3] * s ];
    }

}

let angle = 0;

let swtch = false;

async function draw(){

    background(255);

    let rotateXW = a => [[cos(a),0,0,-sin(a)],
                        [0,1,0,0],
                        [0,0,1,0],
                        [sin(a),0,0,cos(a)]];

    let rotateYW = a => [[1,0,0,0],
                        [0,cos(a),0,-sin(a)],
                        [0,0,1,0],
                        [0,sin(a),0,cos(a)]];

    let rotateZW = a => [[1,0,0,0],
                        [0,1,0,0],
                        [0,0,cos(a),-sin(a)],
                        [0,0,sin(a),cos(a)]];

    rotateX(QUARTER_PI * 1.5);
    rotateZ(HALF_PI * 0.75 + angle * 3);

    let distance = 1;

    let new_points = new Array(points.length); 

    for(let i = 0; i < cubes[0].length; ++i){
        let temp = [0, 0, cubes[0][i][2] - side_len, 0];
        let moved = translate_point(cubes[0][i], negate_point(temp));
        let rotated = matmul( rotateZW(-min(angle, HALF_PI)), moved );
        let demoved = translate_point(rotated, temp);
        let w = 1 / (distance - demoved[3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];
        let projected = matmul( projection_matrix, demoved );
        new_points[i] = mult( projected );
    }

    for(let i = 0; i < cubes[2].length; ++i){
        let temp = [0, cubes[2][i][1] + side_len, 0, 0];
        let moved = translate_point(cubes[2][i], negate_point(temp));
        let rotated = matmul( rotateYW(min(angle, HALF_PI)), moved );
        let demoved = translate_point(rotated, temp);
        let w = 1 / (distance - demoved[3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];
        let projected = matmul( projection_matrix, demoved );
        new_points[20 + i] = mult( projected );
    }
    
    for(let i = 0; i < cubes[3].length; ++i){
        let temp = [0, cubes[3][i][1] - side_len, 0, 0];
        let moved = translate_point(cubes[3][i], negate_point(temp));
        let rotated = matmul( rotateYW(-min(angle, HALF_PI)), moved );
        let demoved = translate_point(rotated, temp);
        let w = 1 / (distance - demoved[3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];
        let projected = matmul( projection_matrix, demoved );
        new_points[24 + i] = mult( projected );
    }

    for(let i = 0; i < cubes[4].length; ++i){
        let temp = [cubes[4][i][0] + side_len, 0, 0, 0];
        let moved = translate_point(cubes[4][i], negate_point(temp));
        let rotated = matmul( rotateXW(min(angle, HALF_PI)), moved );
        let demoved = translate_point(rotated, temp);
        let w = 1 / (distance - demoved[3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];
        let projected = matmul( projection_matrix, demoved );
        new_points[28 + i] = mult( projected );
    }

    for(let i = 0; i < cubes[5].length; ++i){
        let temp = [cubes[5][i][0] - side_len, 0, 0, 0];
        let moved = translate_point(cubes[5][i], negate_point(temp));
        let rotated = matmul( rotateXW(-min(angle, HALF_PI)), moved );
        let demoved = translate_point(rotated, temp);
        let w = 1 / (distance - demoved[3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];
        let projected = matmul( projection_matrix, demoved );
        new_points[32 + i] = mult( projected );
    }


    let special = new Array(4);

    for(let i = 0; i < cubes[6].length; ++i){
        let temp = [0, 0, cubes[6][i][2] + side_len, 0];
        let moved = translate_point(cubes[6][i], negate_point(temp));
        let rotated = matmul( rotateZW(min(angle, HALF_PI)), moved );
        let demoved = translate_point(rotated, temp);
        special[i] = demoved;
    }

    for(let i = 0; i < cubes[1].length; ++i){
        let temp1 = [0, 0, cubes[1][i][2] + side_len, 0];
        let temp2 = [0, 0, special[i][2] + side_len, 0];
        let moved1 = translate_point(cubes[1][i], negate_point(temp1));
        let moved2 = translate_point(special[i], negate_point(temp2));
        let rotated1 = matmul( rotateZW(min(angle, HALF_PI)), moved1 );
        let rotated2 = matmul( rotateZW(min(angle, HALF_PI)), moved2 );
        let demoved1 = translate_point(rotated1, temp1);
        let demoved2 = translate_point(rotated2, temp2);
        let w1 = 1 / (distance - demoved1[3]);
        let w2 = 1 / (distance - demoved2[3]);
        let projection_matrix1 = [[w1, 0, 0, 0],[0, w1, 0, 0],[0, 0, w1, 0]];
        let projection_matrix2 = [[w2, 0, 0, 0],[0, w2, 0, 0],[0, 0, w2, 0]];
        let projected1 = matmul( projection_matrix1, demoved1 );
        let projected2 = matmul( projection_matrix2, demoved2 );
        new_points[12 + i] = mult( projected1 );
        new_points[16 + i] = mult( projected2 );
    }

    for(i = 4; i < 12; ++i){
        let w = 1 / (distance - points[i][3]);
        let projection_matrix = [[w, 0, 0, 0],[0, w, 0, 0],[0, 0, w, 0]];
        let projected = matmul( projection_matrix, points[i] );
        new_points[i] = mult( projected ); 
    }

    stroke(0);

    for(let i = 0; i < 1; ++i){
        connect(new_points, i * 4 + 0, i * 4 + 1);
        connect(new_points, i * 4 + 1, i * 4 + 2);
        connect(new_points, i * 4 + 2, i * 4 + 3);
        connect(new_points, i * 4 + 3, i * 4 + 0);
    }

    for(let i = 1; i < 5; ++i){
        connect(new_points, i * 4 + 0, i * 4 + 1);
        connect(new_points, i * 4 + 1, i * 4 + 2);
        connect(new_points, i * 4 + 2, i * 4 + 3);
        connect(new_points, i * 4 + 3, i * 4 + 0);
    }
    for(let i = 0; i < 4; ++i){
        connect(new_points, 4 * 0 + i, 4 * 1 + i);
        connect(new_points, 4 * 1 + i, 4 * 2 + i);
        connect(new_points, 4 * 2 + i, 4 * 3 + i);
        connect(new_points, 4 * 3 + i, 4 * 4 + i);
    }
    for(let i = 0; i < 4; ++i){
        connect(new_points, 20 + i * 4 + 0, 20 + i * 4 + 1);
        connect(new_points, 20 + i * 4 + 1, 20 + i * 4 + 2);
        connect(new_points, 20 + i * 4 + 2, 20 + i * 4 + 3);
        connect(new_points, 20 + i * 4 + 3, 20 + i * 4 + 0);
    }
    
    connect(new_points, 20 + 0 * 4 + 0, 2 * 4 + 0);
    connect(new_points, 20 + 0 * 4 + 1, 1 * 4 + 0);
    connect(new_points, 20 + 0 * 4 + 2, 1 * 4 + 3);
    connect(new_points, 20 + 0 * 4 + 3, 2 * 4 + 3);

    connect(new_points, 20 + 1 * 4 + 0, 2 * 4 + 1);
    connect(new_points, 20 + 1 * 4 + 1, 1 * 4 + 1);
    connect(new_points, 20 + 1 * 4 + 2, 1 * 4 + 2);
    connect(new_points, 20 + 1 * 4 + 3, 2 * 4 + 2);
    
    connect(new_points, 20 + 2 * 4 + 0, 2 * 4 + 0);
    connect(new_points, 20 + 2 * 4 + 1, 1 * 4 + 0);
    connect(new_points, 20 + 2 * 4 + 2, 1 * 4 + 1);
    connect(new_points, 20 + 2 * 4 + 3, 2 * 4 + 1);

    connect(new_points, 20 + 3 * 4 + 0, 2 * 4 + 3);
    connect(new_points, 20 + 3 * 4 + 1, 1 * 4 + 3);
    connect(new_points, 20 + 3 * 4 + 2, 1 * 4 + 2);
    connect(new_points, 20 + 3 * 4 + 3, 2 * 4 + 2);
    
   if(!swtch)
        angle += 0.005;
    else
        angle -= 0.005;

    if(angle > HALF_PI || angle < 0){ 
        swtch = !swtch;
        await sleep(3000);
    }

}
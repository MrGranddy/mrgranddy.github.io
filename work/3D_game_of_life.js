let len = 800;
let ratio = 0.8
let side_len = 30;
let num_sides = parseInt(len * ratio / side_len);
let margin = parseInt(len * (1 - ratio));

let game;


function setup(){
    let canvas = createCanvas(len, len, WEBGL);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    fill(200);

    game = new Array(num_sides);
    for(let i = 0; i < num_sides; ++i){
        game[i] = new Array(num_sides);
        for(let j = 0; j < num_sides; ++j){
            game[i][j] = new Array(num_sides);
            for(let k = 0; k < num_sides; ++k) game[i][j][k] = 0;
        }
    }

    for(let i = 0; i < 55; ++i){
        game[parseInt(Math.random()*(num_sides/4)+num_sides*0.25)]
            [parseInt(Math.random()*(num_sides/4)+num_sides*0.25)]
            [parseInt(Math.random()*(num_sides/4)+num_sides*0.25)]
            = 1;
    }

    frameRate(10);

    console.log("Number of sides:", num_sides);
    console.log("Margin:", margin);

}

function draw(){

    background(51);

    translate(0, 0, -len / 2);

    rotateX(QUARTER_PI * 1.5);
    rotateZ(-QUARTER_PI);

    for(let i = 0; i < num_sides; ++i){
        for(let j = 0; j < num_sides; ++j){
            for(let k = 0; k < num_sides; ++k){
                if( game[i][j][k] == 0 ) continue;
                translate((i - 0.5) * side_len + margin - len / 2,
                          (j - 0.5) * side_len + margin - len / 2,
                          (k - 0.5) * side_len + margin - len / 2);

                box(side_len);

                translate((0.5 - i) * side_len - margin + len / 2,
                          (0.5 - j) * side_len - margin + len / 2,
                          (0.5 - k) * side_len - margin + len / 2);
            }
        }
    }

    let temp = new Array(num_sides);
    for(let i = 0; i < num_sides; ++i){
        temp[i] = new Array(num_sides);
        for(let j = 0; j < num_sides; ++j){
            temp[i][j] = new Array(num_sides);
            for(let k = 0; k < num_sides; ++k) temp[i][j][k] = game[i][j][k];
        }
    }

    for(let i = 1; i < num_sides - 1; ++i){
        for(let j = 1; j < num_sides - 1; ++j){
            for(let k = 1; k < num_sides - 1; ++k){
                let sum = 0;
                for(let ii = i-1; ii <= i+1; ++ii ){
                    for(let jj = j-1; jj <= j+1; ++jj ){
                        for(let kk = k-1; kk <= k+1; ++kk){
                            if(i == ii && j == jj && k == kk) continue;
                            sum += game[ii][jj][kk] == 1 ? 1 : 0;
                        }
                    }
                }
                if(sum < 2 * 26 / 8) temp[i][j][k] = 0;
                else if(sum > 2 * 26 / 8 && sum < 3 * 26 / 8) temp[i][j][k] = 1;
                else if(sum >= 4 * 26 / 8) temp[i][j][k] = 0;
            }
        }
    }

    game = temp;

}
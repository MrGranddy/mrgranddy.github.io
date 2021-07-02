var h = 101;
var w = 101;

var scaling_factor = 5;

var grid = new Array(h);
for(var i = 0; i < h; ++i){
    grid[i] = new Array(w);
}
for(var i = 0; i < h; ++i){
    for(var j = 0; j < w; ++j){
        grid[i][j] = 0;
    }
}

var colors = null;

function setup(){
    var canvas = createCanvas(w * scaling_factor, h * scaling_factor);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    frameRate(60);
    grid[floor(h/2)][floor(w/2)] = 10000;
    colors = [ '#6b5b95', '#feb236', '#d64161', '#ff7b25' ];
}

function topple(){
    nextgrid = new Array(h);
    for(var i = 0; i < h; ++i){
        nextgrid[i] = new Array(w);
    }
    for(var i = 0; i < h; ++i){
        for(var j = 0; j < w; ++j){
            nextgrid[i][j] = 0;
        }
    }

    for(var i = 0; i < h; ++i){
        for(var j = 0; j < w; ++j){
            if( grid[i][j] > 3 ){
                nextgrid[i][j] += grid[i][j] - 4;
                if( i > 0 ) nextgrid[i - 1][j] += 1;
                if( j > 0 ) nextgrid[i][j - 1] += 1;
                if( i < h - 1 ) nextgrid[i + 1][j] += 1;
                if( j < w - 1 ) nextgrid[i][j + 1] += 1;
            }
            else{
                nextgrid[i][j] += grid[i][j];
            }
        }
    }

    grid = nextgrid;
}

var iter = 0;

function draw(){

    for(var i = 0; i < h; ++i){
        for(var j = 0; j < w; ++j){
            if(grid[i][j] < 4){
                stroke(colors[grid[i][j]]);
                fill(colors[grid[i][j]]);
            }
            else{
                stroke('#878f99');
                fill('#878f99');
            }
            rect(i * scaling_factor, j * scaling_factor, scaling_factor, scaling_factor);
        }
    }
    for(var i = 0; i < 5; ++i) topple();

    console.log(iter);
    iter += 1;

}
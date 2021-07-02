var len_sqr = 4;
var sqr_h = 50;
var sqr_w = 200;
var w = sqr_w * len_sqr;
var h = sqr_h * len_sqr;

var grid = [];

var rule;
var binary_rule = new Array(8);

var start = false;
var atagun = false;

var slide_lock;

function give_start(){
    var rulebox = select('#rule');
    rule = parseInt(rulebox.value());
    if(rule > 255){
        start = false;
        atagun = true;
    }
    else{
        atagun = false;
        start = true;
        for(var i = 7; i >= 0; --i){
            binary_rule[i] = Math.floor( rule / Math.pow(2, i) );
            rule -= binary_rule[i] * Math.pow(2, i);
        }
        grid = new Array(sqr_h);
        for(var i = 0; i < sqr_h; ++i){
            grid[i] = new Array(sqr_w);
            for(var j = 0; j < sqr_w; ++j)
                grid[i][j] = 0;
        }
        grid[0][floor(sqr_w / 2)] = 1;
        slide_lock = 0;
    }
}

function keyPressed(){
    if( keyCode == ENTER ){
        var rulebox = select('#rule');
        rule = parseInt(rulebox.value());
        if( rule > 255){
            start = false;
            atagun = true;
        }
        else{
            atagun = false;
            start = true;
            for(var i = 7; i >= 0; --i){
                binary_rule[i] = Math.floor( rule / Math.pow(2, i) );
                rule -= binary_rule[i] * Math.pow(2, i);
            }
            grid = new Array(sqr_h);
            for(var i = 0; i < sqr_h; ++i){
                grid[i] = new Array(sqr_w);
                for(var j = 0; j < sqr_w; ++j)
                    grid[i][j] = 0;
            }
            grid[0][floor(sqr_w / 2)] = 1;
            slide_lock = 0;
        }
    }
}

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    grid = new Array(sqr_h);
    for(var i = 0; i < sqr_h; ++i){
        grid[i] = new Array(sqr_w);
        for(var j = 0; j < sqr_w; ++j)
            grid[i][j] = 0;
    }
    grid[0][floor(sqr_w / 2)] = 1;

    var button = select('#startbutton');
    button.mouseClicked(give_start);

    textSize(24);

    frameRate(60);
}

function draw(){

    if(start){
        noStroke();

        for(var i = 0; i < sqr_h; ++i){
            for(var j = 0; j < sqr_w; ++j){
                if( grid[i][j] ) fill(0);
                else fill(255);
                rect(j * len_sqr, i * len_sqr, len_sqr, len_sqr);
            }
        }

        if( slide_lock >= sqr_h - 1 ){
            for(var i = 1; i < sqr_h; ++i){
                grid[i - 1] = grid[i];
            }
            grid[sqr_h - 1] = new Array(sqr_w);
            grid[sqr_h - 1][0] = 1;
            grid[sqr_h - 1][sqr_w - 1] = 1;
            for(var i = 1; i < sqr_w - 1; ++i){
                grid[sqr_h - 1][i] = binary_rule[ 4 * grid[sqr_h - 2][i - 1] + 2 * grid[sqr_h - 2][i] + grid[sqr_h - 2][i + 1] ];
            }
        }
        else{
            for(var i = 1; i < sqr_w - 1; ++i){
                grid[slide_lock + 1][i] = binary_rule[ 4 * grid[slide_lock][i - 1] + 2 * grid[slide_lock][i] + grid[slide_lock][i + 1] ];
            }
            slide_lock += 1;
        }
    }

    else if(atagun){
        background(255);
        fill(0);
        stroke(0);
        textSize(40);
        text("Rules above 255 are not valid.", width / 8 + 30, height / 2);
    }

}
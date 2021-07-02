let num_row = 11;
let num_col = 11;
let col_width = 100;
let row_height = 100;
let ellipse_ratio = 0.8;
let d_angle = 0.01;

let give_center;
let pol_to_cart;

let curve_matrix;

let buffer;


function setup(){
    var canvas = createCanvas(col_width * num_col, row_height * num_row);
    buffer = createGraphics(col_width * num_col, row_height * num_row);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    give_center = (i,j) => { return { "x": (i + 0.5) * col_width, "y":(j + 0.5) * row_height }; };
    pol_to_cart = (r, theta) => { return { "x": r * Math.cos(theta), "y": r * Math.sin(theta) }; };

    buffer.background(51);
    buffer.noFill();
    buffer.strokeWeight(1);
    buffer.stroke(0);
    for(let i = 1; i < num_row; ++i){
        buffer.line(0,i*row_height,width,i*row_height);
    }
    for(let i = 1; i < num_col; ++i){
        buffer.line(i*col_width,0,i*col_width,height);
    }

    frameRate(60);

}

let angle = 0;

function draw(){
    
    cross_point_arr = new Array(num_row - 1);


    buffer.stroke(255,0,0);
    buffer.strokeWeight(1);
    for(let i = 1; i < num_row; ++i){
        p = give_center(0, i);
        buffer.ellipse(p.x, p.y, col_width * ellipse_ratio, row_height * ellipse_ratio);
        pp = pol_to_cart(row_height * ellipse_ratio / 2, angle * (num_row - i));
        cross_point_arr[i - 1] = p.y + pp.y;
    }

    for(let i = 1; i < num_col; ++i){
        buffer.stroke(255,0,0);
        buffer.strokeWeight(1);
        p = give_center(i, 0);
        buffer.ellipse(p.x, p.y, col_width * ellipse_ratio, row_height * ellipse_ratio);
        buffer.stroke(255,255,0);
        buffer.strokeWeight(1);
        pp = pol_to_cart(row_height * ellipse_ratio / 2, angle * (num_col - i));
        for(let j = 0; j < num_row - 1; ++j){
            buffer.point(p.x + pp.x, cross_point_arr[j]);
        }
    }

    image(buffer, 0, 0);

    for(let i = 1; i < num_row; ++i){
        stroke(0);
        strokeWeight(3);
        p1 = give_center(0, i);
        pp1 = pol_to_cart(row_height * ellipse_ratio / 2, angle * (num_row - i));
        p2 = give_center(i, 0);
        pp2 = pol_to_cart(row_height * ellipse_ratio / 2, angle * (num_col - i));
        point(p1.x + pp1.x, p1.y + pp1.y);
        point(p2.x + pp2.x, p2.y + pp2.y);
        strokeWeight(1);
        line(0, p1.y + pp1.y, width, p1.y + pp1.y);
        line(p2.x + pp2.x, 0, p2.x + pp2.x, height);
        stroke(255, 0, 0, width, height);
        strokeWeight(2);
        for(let j = 0; j < num_row - 1; ++j){
            point(p2.x + pp2.x, cross_point_arr[j]);
        }
    }


    angle += d_angle;

}
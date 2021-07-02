let w = 600;
let h = 500;

let d = 3;
let stop_length = 7;

let point_point_vector;
let get_length;
let move_on_vector;
let shorten_vector;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    point_point_vector = (p_start, p_end) => {
        return { "vector": { "x": p_end.x - p_start.x, "y": p_end.y - p_start.y }, "point": { "x": p_start.x, "y": p_start.y } };
    };

    get_length = (vector) => {
        return sqrt(vector.vector.x * vector.vector.x + vector.vector.y * vector.vector.y);
    };

    move_on_vector = (vector, len) => {
        let len_vector = get_length(vector);
        let unit = { "x": vector.vector.x / len_vector, "y": vector.vector.y / len_vector };
        return { "vector": { "x": unit.x * len, "y": unit.y * len }, "point": { "x": vector.point.x, "y": vector.point.y } };
    };

    shorten_vector = (vector, len) => {
        let len_vector = get_length(vector);
        let unit = { "x": vector.vector.x / len_vector, "y": vector.vector.y / len_vector };
        return { "vector": { "x": unit.x * (len_vector - len), "y": unit.y * (len_vector - len) }, "point": { "x": vector.point.x, "y": vector.point.y } };
    };

    stroke(0);
    strokeWeight(1);
    background(255);

    frameRate(60);
}

// WARNING !!! : THERE WILL BE REAL LINEAR ALGEBRA AND ANALYTICAL GEOMETRY SHIT GOING ON !!!

main_lines = {
    "top": { "vector": { "x": w, "y": 0 }, "point": { "x": 0, "y": 0 } },
    "right": { "vector": { "x": 0, "y": h }, "point": { "x": w, "y": 0 } },
    "bottom": { "vector": { "x": -w, "y": 0 }, "point": { "x": w, "y": h } },
    "left": { "vector": { "x": 0, "y": -h }, "point": { "x": 0, "y": h } }
}

let count = 0;

function draw(){

    if( count % 4 == 0 ){
        //stroke(81,19,1);
        let dest = move_on_vector(main_lines.right, d);
        let dest_point = { "x": dest.point.x + dest.vector.x, "y": dest.point.y + dest.vector.y };
        let new_line = point_point_vector( main_lines.top.point, dest_point );
        line(main_lines.top.point.x, main_lines.top.point.y, dest_point.x, dest_point.y);
        main_lines.top = new_line;
        main_lines.right = shorten_vector(main_lines.right, d);
        main_lines.right.point = dest_point;
        if( get_length( new_line ) <= stop_length ) noLoop();
    }
    else if( count % 4 == 1 ){
        //stroke(141,42,17);
        let dest = move_on_vector(main_lines.bottom, d);
        let dest_point = { "x": dest.point.x + dest.vector.x, "y": dest.point.y + dest.vector.y };
        let new_line = point_point_vector( main_lines.right.point, dest_point );
        line(main_lines.right.point.x, main_lines.right.point.y, dest_point.x, dest_point.y);
        main_lines.right = new_line;
        main_lines.bottom = shorten_vector(main_lines.bottom, d);
        main_lines.bottom.point = dest_point;
        if( get_length( new_line ) <= stop_length ) noLoop();
    }
    else if( count % 4 == 2 ){
        //stroke(193,59,25);
        let dest = move_on_vector(main_lines.left, d);
        let dest_point = { "x": dest.point.x + dest.vector.x, "y": dest.point.y + dest.vector.y };
        let new_line = point_point_vector( main_lines.bottom.point, dest_point );
        line(main_lines.bottom.point.x, main_lines.bottom.point.y, dest_point.x, dest_point.y);
        main_lines.bottom = new_line;
        main_lines.left = shorten_vector(main_lines.left, d);
        main_lines.left.point = dest_point;
        if( get_length( new_line ) <= stop_length ) noLoop();
    }
    else if( count % 4 == 3 ){
        //stroke(221,128,96);
        let dest = move_on_vector(main_lines.top, d);
        let dest_point = { "x": dest.point.x + dest.vector.x, "y": dest.point.y + dest.vector.y };
        let new_line = point_point_vector( main_lines.left.point, dest_point );
        line(main_lines.left.point.x, main_lines.left.point.y, dest_point.x, dest_point.y);
        main_lines.left = new_line;
        main_lines.top = shorten_vector(main_lines.top, d);
        main_lines.top.point = dest_point;
        if( get_length( new_line ) <= stop_length ) noLoop();
    }

    count += 1;

}
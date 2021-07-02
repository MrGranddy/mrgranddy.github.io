var w = 800;
var h = 800;

var num_of_polygons = 20;
var side_len = 100;
var base_height = 100;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    frameRate(8);
}

function polar2cart(radius, theta){ return [cos(theta) * radius, sin(theta) * radius]; }
function deg2rad(deg){ return deg * PI / 180; }

var curr_poly = 3;

var c1 = [118, 75, 162];
var c2 = [102, 126, 234];
var c_dif = [c2[0] - c1[0], c2[1] - c1[1], c2[2] - c1[2]];
var c_unit = [c_dif[0] / num_of_polygons, c_dif[1] / num_of_polygons, c_dif[2] / num_of_polygons];

var mode = 0;

var loop_mode = 1;

function mouseClicked(){
    if(loop_mode){ noLoop(); loop_mode = 0; }
    else{ loop(); loop_mode = 1; }
}

function draw(){

    background(255);
    background(200, 170, 250, 100);
    strokeWeight(2);
    noFill();

    if(!mode){
        for(var pol = 3; pol <= curr_poly; ++pol){
            var center_angle = TWO_PI / pol;
            var side_angle = (PI - center_angle) / 2;

            var r = sin(side_angle) * side_len / sin(center_angle);
            var center_height = sin(side_angle) * side_len / (2 * sin(center_angle / 2));
            var start_angle = -(PI - center_angle) / 2;

            stroke(c1[0] + (pol - 3) * c_unit[0], c1[1] + (pol - 3) * c_unit[1], c1[2] + (pol - 3) * c_unit[2]);

            beginShape();
            for(var i = 0; i < pol; ++i){
                var v = polar2cart(r, start_angle - i * center_angle);
                console.log(start_angle - i * center_angle);
                vertex(v[0] + width / 2, height / 2 - (v[1] - height / 2 + base_height + center_height));
            }
            endShape(CLOSE);
        }
        curr_poly += 1;
        if(curr_poly > num_of_polygons + 3){
            mode = 1;
            curr_poly -= 1;
        }
    }
    else{
        for(var pol = 3; pol <= curr_poly; ++pol){
            var center_angle = TWO_PI / pol;
            var side_angle = (PI - center_angle) / 2;

            var r = sin(side_angle) * side_len / sin(center_angle);
            var center_height = sin(side_angle) * side_len / (2 * sin(center_angle / 2));
            var start_angle = -(PI - center_angle) / 2;

            stroke(c1[0] + (pol - 3) * c_unit[0], c1[1] + (pol - 3) * c_unit[1], c1[2] + (pol - 3) * c_unit[2]);

            beginShape();
            for(var i = 0; i < pol; ++i){
                var v = polar2cart(r, start_angle - i * center_angle);
                console.log(start_angle - i * center_angle);
                vertex(v[0] + width / 2, height / 2 - (v[1] - height / 2 + base_height + center_height));
            }
            endShape(CLOSE);
        }
        curr_poly -= 1;
        if(curr_poly == 2){
            curr_poly += 1;
            mode = 0;
        }
    }

}
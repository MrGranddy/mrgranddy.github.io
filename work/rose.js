let max_n = 10;
let max_d = 10;
let side_len = 100;

var h = max_d * side_len;
var w = max_n * side_len;

let pol2cart;

function setup(){

    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    pol2cart = (r, theta) => { return [r * Math.cos(theta), r * Math.sin(theta)]; }
    
    background(51);

}

let angle = 0;

function draw(){

    for(let n = 1; n <= max_n; ++n){
        for(let d = 1; d <= max_d; ++d){
            let r = Math.cos( angle * n / d ) * side_len * 0.4;
            let p = pol2cart(r, angle);
            point(p[0] + (n-0.5) * side_len, p[1] + (d-0.5) * side_len);
        }
    }

    angle += PI / 360;
    //if (angle >= PI) noLoop();
}
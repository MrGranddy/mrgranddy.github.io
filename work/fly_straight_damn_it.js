var h = 500;
var w = 500;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    
    background(51);

    stroke(255);
    strokeWeight(1);

}

function gcd(x, y){
    if( y > x )
        return gcd(y, x);
    if( y )
        return gcd(y, x%y);
    return x;
}

var i = 0;
var j = 0;

var n = 1;
var fn = 1;

function draw(){

    n += 1;

    var gcd_val = gcd( fn, n );

    if( gcd_val == 1 ){
        fn = fn + n + 1;
    }
    else{
        fn = fn / gcd_val;
    }
    
    point(n / 4, h - fn / 4);

    if( n > w * 4 ) noLoop();
    console.log("A");

}
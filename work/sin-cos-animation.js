
var h, w, radius, discrete_time;
var time, counter;
var cos_array, sin_array;
var array_ratio, screen_ratio;

function setup(){
    screen_ratio = 7; // This is the scale factor, the bigger this is the bigger the screen is
                      // if you want to make the screen bigger it is recommended you only
                      // change the screen ratio but do not change h and w because they make
                      // computation harder if they are big
    // h is the height of the screen
    // w is the width of the screen
    // radius is the radius of the circle
    // Discrete time is how fast is the animation, the bigger the faster
    h = 100; w = 100; radius = 75; discrete_time = 0.1;
    var canvas = createCanvas(w * screen_ratio, h * screen_ratio);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    frameRate(30);
    time = 0;
    cos_array = [];
    sin_array = [];
    array_ratio = 1; // It is recommended you do not change this, it makes waves slow and move discrete
    for(var i = 0; i < h/2 / array_ratio; ++i)
        cos_array.push("");
    for(var i = 0; i < w/2 / array_ratio; ++i)
        sin_array.push("");
    counter = 0;
}

function draw(){

    background(255, 255, 255);
    stroke(0,0,0);
    strokeWeight(1);
    ellipse(w/2 * screen_ratio, h/2 * screen_ratio, radius * screen_ratio);
    line(w/2  * screen_ratio, 0, w/2  * screen_ratio, h * screen_ratio);
    line(0, h/2 * screen_ratio, w * screen_ratio, h/2 * screen_ratio);

    time += discrete_time;

    x = cos(time) * radius / 2;
    y = sin(time) * radius / 2;

    stroke(150, 20, 120);
    strokeWeight(2);
    line(w/2 * screen_ratio, h/2 * screen_ratio, (w/2 + x) * screen_ratio, (h/2 - y) * screen_ratio);
    stroke(0, 0, 255);
    stroke(40 * 1.2, 30 * 1.2, 200 * 1.2);
    line((w/2 + x) * screen_ratio, (h/2 - y) * screen_ratio, (w/2 + x) * screen_ratio, h/2 * screen_ratio);
    stroke(200 * 1.2, 40 * 1.2, 30 * 1.2);
    line((w/2 + x) * screen_ratio, (h/2 - y) * screen_ratio, w/2 * screen_ratio, (h/2 - y) * screen_ratio);

    strokeWeight(10);
    stroke(40, 30, 200);
    point((w/2 + x) * screen_ratio, h/2 * screen_ratio);
    stroke(200, 40, 30);
    point(w/2 * screen_ratio, (h/2 - y) * screen_ratio);

    if(counter == 0){
        for(var i = h/2 / array_ratio - 2; i >= 0; --i){
            cos_array[i + 1] = cos_array[i];
        }
        for(var i = w/2 / array_ratio - 2; i >= 0; --i){
            sin_array[i + 1] = sin_array[i];
        }
        cos_array[0] = w/2 + x;
        sin_array[0] = h/2 - y;
    }

    strokeWeight(2);
    stroke(40, 30, 200);
    for(var i = 1; i < h/2 / array_ratio; ++i){
        if( cos_array[i] != "")
            line(cos_array[i - 1] * screen_ratio,
                (h/2 + (i - 1) * array_ratio) * screen_ratio,
                cos_array[i] * screen_ratio,
                (h/2 + i * array_ratio) * screen_ratio);
    }
    stroke(200, 40, 30);
    for(var i = 1; i < w/2 / array_ratio; ++i){
        if( sin_array[i] != "")
            line((w/2 + (i - 1) * array_ratio) * screen_ratio,
                sin_array[i - 1] * screen_ratio,
                (w/2 + i * array_ratio) * screen_ratio,
                sin_array[i] * screen_ratio);
    }

    counter = (counter + 1) % array_ratio;

}
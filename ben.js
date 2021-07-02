var h = 300;
var w = 300;

var pic;
var contourWeight = 10;

function setup(){
    var canvas = createCanvas(w, h);
    canvas.parent('about');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block')    ;

    pic = loadImage("img/ben.png");

    noStroke();

    frameRate(60);
}

//var angle = 0;
//var rot_dir = 0;
//var ang_speed = 0.005;
var shake_par1 = 0;
var shake_par2 = 0;

function draw(){

    //translate(width/2, height/2); // edit 0 0 coordinates of image!
    //rotate(angle);
    image(pic, shake_par1, shake_par2, width, height);
    //rotate(-angle);
    //translate(-width/2, -height/2);

    beginShape();
    vertex(0, 0);
    vertex(0, height);
    vertex(width, height);
    vertex(width, 0);
    beginContour();
    vertex(width - contourWeight, contourWeight);
    vertex(width - contourWeight, height - contourWeight);
    vertex(contourWeight, height - contourWeight);
    vertex(contourWeight, contourWeight);
    endContour();
    endShape(CLOSE);

    //if(rot_dir == 1) angle += ang_speed;
    //else angle -= ang_speed;

    //if(abs(angle) > TWO_PI){
    //    rot_dir += 1;
    //    rot_dir %= 2;
    //    angle = 0;
    //}

    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        shake_par1 = random(-1000, 1000) / 500;
        shake_par2 = random(-1000, 1000) / 500;
    }
    else{
        shake_par1 = 0;
        shake_par2 = 0;
    }

}
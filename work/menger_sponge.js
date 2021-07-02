class Box {
    constructor(x, y, z, r){
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
    }

    show(){
        translate(this.x, this.y, this.z);
        ambientMaterial(101, 30, 62);
        box(this.r);
        translate(-this.x, -this.y, -this.z);
    }

    generate(){

        var new_r = this.r / 3;

        var boxes = []

        for(var i = -1; i < 2; ++i){
            for(var j = -1; j < 2; ++j){
                for(var k = -1; k < 2; ++k){
                    if( !((i == 0 && j == 0) || (j == 0 && k == 0) || (i == 0 && k == 0)) ){
                        var b = new Box(this.x + i * new_r, this.y + j * new_r, this.z + k * new_r, new_r);
                        boxes.push(b);
                    }
                }
            }
        }

        return boxes;

    }

}

let angle = 0;
var sponge = [];

function setup(){
    var canvas = createCanvas(800, 800, WEBGL);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    frameRate(30);
    var b = new Box(0, 0, 0, 400);
    sponge.push(b);
}

function mouseClicked(){
    var next = [];
    for(var i = 0; i < sponge.length; ++i){
        var boxes = sponge[i].generate();
        for(var j = 0; j < boxes.length; ++j){
            next.push(boxes[j]);
        }
    }
    sponge = next;
}

function draw(){

    background(51);
    rectMode(CENTER);
    stroke(0);
    strokeWeight(1);
    ambientLight(150);
    directionalLight(250, 250, 250, -1, -1, 0.25);
    directionalLight(250, 250, 250, 1, 1, 0.15);

    rotateX(angle);
    rotateY(angle);

    for(var i = 0; i < sponge.length; ++i)
        sponge[i].show();

    angle += 0.004;

}
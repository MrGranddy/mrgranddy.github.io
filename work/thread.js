var res = 600;
var frame_rate = 60;
var G = 0.0002;

class Particle {

  constructor(x, y){
    this.pos_x = x;
    this.pos_y = y;
    this.vel_x = 0.01;
    this.vel_y = 0;
    this.radius = 0.01;
  }

  accelerate(){
    this.vel_y += -G;
  }

  move(){
    this.pos_x += this.vel_x;
    this.pos_y += this.vel_y;
    
    if( this.pos_x - this.radius < -1 || this.pos_x + this.radius > 1 ){
      this.vel_x *= -1;
    }
    if( this.pos_y - this.radius < -1 || this.pos_y + this.radius > 1 ){
      this.vel_y *= -1;
    }
  }

}

function setup() {

  var canvas = createCanvas(res, res);
  canvas.parent('animation');
  canvas.style('margin', 'auto');
  canvas.style('display', 'block');
  canvas.style('padding-top', '3%');
  frameRate(frame_rate);

  colorMode(HSB, 360, 100, 100, 100);

  p = new Particle(0, 0.5);

}

function draw() {

  background(360,100,100,1);

  p.accelerate();
  p.move();

  noStroke();
  fill(100, 100, 100, 100);
  ellipse( res / 2 + p.pos_x * res / 2, res / 2 - p.pos_y * res / 2, p.radius * res, p.radius * res );

}
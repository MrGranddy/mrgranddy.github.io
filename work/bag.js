/*   AUTHORS:  */
/* # Burak Bilge Yalçınkaya */
/* # Vahit Buğra Yeşilkaynak */
/* 06.02.2021 */

var h = 450;
var w = 800;

var frame_rate = 30;
var bag = { pos: {x: w * 0.5, y: h * 0.5}, vel: {x: 0, y: 0}, rotate : 0 };

var leaves = [];
for( let i = 0; i < 500; i++ ){
  leaves.push( { pos: {x: (Math.random() - 0.5) * w * 3, y: (0.85 + Math.random() * 0.19) * h}, vel: {x: 0, y: 0} } );
}

var nnodes = 10;
var nodes = [];
var bsize = 20;

var frequency = 0.01;
var freqs = [0.01, 0.1, 1.0];
var mags = [1, 3, 1];

/* _______   ______   ______  __       ______ __      __  ______  _______  __    __ ________ 
|       \ /      \ /      \|  \     |      |  \    /  \/      \|       \|  \  |  |        \
| $$$$$$$|  $$$$$$|  $$$$$$| $$      \$$$$$$\$$\  /  $|  $$$$$$| $$$$$$$| $$  | $$\$$$$$$$$
| $$__/ $| $$__| $| $$___\$| $$       | $$   \$$\/  $$| $$  | $| $$__| $| $$  | $$   /  $$ 
| $$    $| $$    $$\$$    \| $$       | $$    \$$  $$ | $$  | $| $$    $| $$  | $$  /  $$  
| $$$$$$$| $$$$$$$$_\$$$$$$| $$       | $$     \$$$$  | $$  | $| $$$$$$$| $$  | $$ /  $$   
| $$__/ $| $$  | $|  \__| $| $$_____ _| $$_    | $$   | $$__/ $| $$  | $| $$__/ $$/  $$___ 
| $$    $| $$  | $$\$$    $| $$     |   $$ \   | $$    \$$    $| $$  | $$\$$    $|  $$    \
 \$$$$$$$ \$$   \$$ \$$$$$$ \$$$$$$$$\$$$$$$    \$$     \$$$$$$ \$$   \$$ \$$$$$$ \$$$$$$$$
*/
function init_nodes() {
  
  for(let i=0; i<nnodes; i++) {
    nodes.push({ 
      pos: {
        x: bag.pos.x + random(-bsize, bsize), 
        y: bag.pos.y + random(-bsize, bsize)
      }, 
      vel: {x: 0, y: 0}
    });
  }
}

function move_nodes() {
  nodes.forEach(node => {
    
    node.vel.x += (bag.pos.x - node.pos.x) * 0.0001;
    node.vel.y += (bag.pos.y - node.pos.y) * 0.0001;
  
    node.pos.x += node.vel.x * deltaTime;
    node.pos.y += node.vel.y * deltaTime;
  });
}

function draw_bag() {
  for(let i=0; i<nnodes; i++) {
    curve(
      nodes[i].pos.x, 
      nodes[i].pos.y, 
      nodes[(i+1) %nnodes].pos.x, 
      nodes[(i+1) %nnodes].pos.y,
      nodes[(i+2) %nnodes].pos.x, 
      nodes[(i+2) %nnodes].pos.y,
      nodes[(i+3) %nnodes].pos.x, 
      nodes[(i+3) %nnodes].pos.y
    );
  }
}

function setup() {

  frameRate(frame_rate);
  var canvas = createCanvas(w, h);
  canvas.parent('animation');
  canvas.style('margin', 'auto');
  canvas.style('display', 'block');
  canvas.style('padding-top', '3%');
  frameRate(frame_rate);

  colorMode(HSB, 360, 100, 100, 100);
  init_nodes();
}

function sum(l){
  return l.reduce((a, b) => a + b, 0);
}

function create_vector_field(t){
  function vector_field(x, y){
    val = [0, 0]
    for( let i = 0; i < freqs.length; i++ ){
      val[0] += ((noise(x * freqs[i] / (i+1), y * freqs[i], t) - 0.5) * mags[i]) / sum(mags);
      val[1] += ((noise(x * freqs[i] / (i+1), y * freqs[i], t+1000007) - 0.5) * mags[i]) / sum(mags);
    }
    return val;
  }
  return vector_field;
}

function minmax(x, l) {
  return Math.min(l, Math.max(0, x));
}

function obstacle(bag){
  if( bag.pos.x < 0){
    bag.pos.x = 0;
    bag.vel.x = 0;
  }
  if( bag.pos.x > w){
    bag.pos.x = w;
    bag.vel.x = 0;
  }
  if( bag.pos.y < 0 ){
    bag.pos.y = 0;
    bag.vel.y = 0;
  }
  if( bag.pos.y > 0.85 * h ){
    bag.pos.y = 0.85 * h;
    bag.vel.y = 0;
  }
}

function obstacle_leaf(leaf){
  if( leaf.pos.x < -3*w){
    leaf.pos.x = -3*w;
    leaf.vel.x = 0;
  }
  if( leaf.pos.x > 3*w){
    leaf.pos.x = 3*w;
    leaf.vel.x = 0;
  }
  if( leaf.pos.y < h * 0.8 ){
    leaf.pos.y = h * 0.8;
    leaf.vel.y = 0;
  }
  if( leaf.pos.y > 2*h ){
    leaf.pos.y = 2*h;
    leaf.vel.y = 0;
  }
}

function draw_field(vf) {
  for(let x = 0; x<= width; x+= 20) {
    for(let y = 0; y<= height; y+=20) {
      
      circle(x,y,5);
      
      force = vf(x, y);
      line( 
        x, y,
        x + force[0] * 100, y + force[1] * 100          
      );
    }
  }
}

function sigmoid(x){
  return (1 / (1 + Math.exp(-x))) - 0.5;
}

function centerX(x) {
  const c = x / w - 0.5;
  return -Math.pow(c * 2, 7);
}

function centerY(y) {
  const c = y / h - 0.5;
  return -Math.pow(c * 2, 7);
}

function draw_bg(t){
  let brick_width = 50;
  let brick_height = 20;

  let pos = ((Math.sin(t) % 100) / 10);

  console.log(cam.pos.x);

  stroke(0, 0, 100, 100);
  strokeWeight(1);

  for( let i = -10; i < 0.8 * h / brick_height; i++ ){
    let start = (i % 2 == 0) ? -10.5 + 0 : - 10;
    for( let j = start; j < 20 + w / brick_width; j++ ){
      let top = i * brick_height - cam.pos.y;
      let bottom = (i+1) * brick_height - cam.pos.y;
      let left = j * brick_width  - cam.pos.x;
      let right = (j + 1) * brick_width - cam.pos.x;

      line(left, top, right, top);
      line(left, top, left, bottom);
      line(left, bottom, right, bottom);
      line(right, bottom, right, top);
    }
  }

  let top = 0.8 * h - cam.pos.y;
  let bottom = 1.0 * h - cam.pos.y;
  let left = 0.0 * w;
  let right = 1.0 * w;

  fill(0, 0, 50, 100);
  rect(left, top, right - left, bottom - top + 500);

  strokeWeight(10);
  stroke(39, 78, 40, 5);
  for(let i = top; i <= (bottom + 300); i += 10){
    for( let j = left; j <= right; j += 10 ){
      if( noise(j, i, t) > 0.5 ){
        point(j*10, i*10);
      }
    }
  }
  strokeWeight(1);

  for( let i = 0; i < h / 3; i++ ){
    let flux = 0;
    if( (t % 2) + (i % 2) == 1 )
      flux = 10;
    flux += noise(t, i) * 10;
    stroke(0, 0, 0, 10 + flux);
    line(0, i * 3, w, (i+1) * 3);
  }

}

var time_multiplier = 1.0 / frame_rate;
var bag_rotate = 0;
function draw() {
  
  const t = frameCount * time_multiplier * 7;
  const nfm = noise(t * 0.03);
  const force_multiplier = Math.pow(nfm, 3) * 0.3;

  
  force = [ noise(t) - 0.5 + centerX(bag.pos.x)
          , noise(t + 100) - 0.5 + centerY(bag.pos.y)];
  
  bag.vel.x += force[0] * force_multiplier;
  bag.vel.y += force[1] * force_multiplier + 0.01;
  
  bag.pos.x = bag.vel.x * deltaTime + bag.pos.x;
  bag.pos.y = bag.vel.y * deltaTime + bag.pos.y;

  
  bag.rotate += bag.vel.x;

  const w_ = w/2;
  const h_ = h/2;
  cam.pos.x = lerp(cam.pos.x + w_, bag.pos.x, 0.1) - w_;
  cam.pos.y = lerp(cam.pos.y + h_, bag.pos.y, 0.1) - h_;
  
  obstacle(bag);
  
  background(5, 60, 80, 100);
  draw_bg(t);
  
  draw_bag(t);
}


function draw_bag(t) {
  push();
    
    stroke(100, 100, 100, 100);
    fill(0, 0, 100, 40);

    noStroke();
    
    translate(bag.pos.x - cam.pos.x, bag.pos.y - cam.pos.y);

    rotate(bag.rotate);
    const nnodes = 10;
    const nodes = [];
    for(let i=0; i<nnodes; i++) {
      const n = noise(t * 0.1, i);
      const k = i * TWO_PI / nnodes;
      const r = n * 30 + 20;
      nodes.push([
        cos(k) * (r ),
        sin(k) * (r )
      ]); 
    }
    console.log(nodes.length);
    
    beginShape();
    nodes.forEach(n => {
      curveVertex(n[0], n[1]);
    });
    endShape(CLOSE);

    
    beginShape();
    nodes.slice(nnodes/4).forEach(n => {
      curveVertex(n[0], n[1]);
    });
    endShape(CLOSE);
  pop();
}


var cam = {
  pos: { x: 0, y: 0}
}
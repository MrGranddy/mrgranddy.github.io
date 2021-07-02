
let img;
var font,
  fontsize = 40

function preload(){
    img = loadImage('ezgi.jpeg');
}

let scale;

function setup(){
    scale = 2;
    canvas = createCanvas(img.width / 2, img.height / 2);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');
    img.loadPixels();
    noStroke();
    background(255);
}

let off = 0.0;
let radius = 150;
let index;
let rgb = [0, 0, 0];
let angle = 0;
let heart_radius = Math.min(img.height/(2*scale), img.width/(2*scale));

function heart(t){
    return [16 * Math.pow(Math.sin(t), 3), 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)];
}

function draw(){
    
    if(radius >= 1){
    let r = parseInt(radius / 2);

    noiseSeed(98);
    let x = noise(off) * (width - r) + r;
    noiseSeed(99);
    let y = noise(off) * (height - r) + r;

    rgb = [0, 0, 0, 0];
    for(let i = -r; i < r; ++i){
        for(let j = -r; j < r; ++j){
            index = parseInt(((y+i) * width * scale + (x+j) * scale) * 4);
            rgb[0] += img.pixels[index];
            rgb[1] += img.pixels[index+1];
            rgb[2] += img.pixels[index+2];
            rgb[3] += img.pixels[index+3];
        }
    }

    if(rgb[0] / (r*r*4) >= 255 || rgb[1] / (r*r*4) >= 255 || rgb[2] / (r*r*4) >= 255){
    }
    else{

        fill( parseInt(rgb[0] / (r*r*4)),
            parseInt(rgb[1] / (r*r*4)),
            parseInt(rgb[2] / (r*r*4)),
            parseInt(rgb[3] / (r*r*4*5)));

        ellipse(x, y, radius, radius);

        radius -= 0.15;

    }

    off += 0.1;
    }
    else{
        strokeWeight(3);
        stroke(220, 20, 20, 70);
        angle += 0.5 * Math.PI / 180;
        let coords = heart(angle);
        point(coords[0] * 10 + width / 2, height / 2 - coords[1] * 10);
        if(angle >= Math.PI * 4) noLoop();
    }

}
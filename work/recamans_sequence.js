w = 600;
h = 500;

let numbers = [];
let count = 1;
let sequence = []
let curr = 0;

function setup(){

    canvas = createCanvas(w, h);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');

    background(51);
    noFill();
    strokeWeight(1);

    numbers[curr] = true;
    sequence.push(curr);

}

function step(){
    if( curr - count > 0 && numbers[curr - count] != true ){
        curr = curr - count;
        count += 1;
        numbers[curr] = true;
        sequence.push(curr);
    }
    else{
        curr = curr + count;
        count += 1;
        numbers[curr] = true;
        sequence.push(curr);
    }
}

let diameter;
let middle;
let i = 0;
let ratio = 1;
let scale = 4;


function draw(){

    background(51);

    step();
    
    for(let i = 0; i < sequence.length; ++i){
        diameter = scale * Math.abs(sequence[i] - sequence[i+1]);
        if(diameter * ratio <= 10){
            sequence.splice(i,i+1);
            --i;
            continue;
        }
        middle = scale * (sequence[i] + sequence[i+1])/2;
        if( diameter * ratio > height ){
            ratio = height / diameter;
        }
        ellipse(middle * ratio, height/2, diameter * ratio, diameter * ratio);
    }

}
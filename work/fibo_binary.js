var s = 1000;
var sqr_len = 1;

var fibo_array;
var fibo_binary_matrix;

function setup(){

    let fibo_array_creator = (size) => {
        let arr = new Array(size);
        arr[0] = bigInt(1);
        arr[1] = bigInt(1);
        for(let i = 2; i < size; ++i){
            arr[i] = arr[i - 1].plus(arr[i - 2]);
        }
        return arr;
    };
    
    let array_to_binary_matrix = (arr) => {
        let matrix = new Array(arr.length);
        let max_binary_len = parseInt(log(arr[arr.length - 1]) / log(2)) + 1;
        for(let i = 0; i < arr.length; ++i)
            matrix[i] = new Array(max_binary_len);
        
        for(let i = 0; i < arr.length; ++i){
            for(let j = max_binary_len - 1; j >= 0; --j){
                if(arr[i].isOdd())
                    matrix[i][j] = 1;
                else
                    matrix[i][j] = 0;
                arr[i] = arr[i].divide(2);
            }
        }

        return matrix;

    }; // Works only with increasing ordered arrays (A quick fix can generalize)

    console.log(s);
    fibo_array = fibo_array_creator(s);
    console.log(fibo_array);
    fibo_binary_matrix = array_to_binary_matrix(fibo_array);
    console.log(fibo_binary_matrix);

    canvas = createCanvas(fibo_binary_matrix[0].length * sqr_len, fibo_binary_matrix.length * sqr_len);
    canvas.parent('animation');
    canvas.style('margin', 'auto');
    canvas.style('display', 'block');
    canvas.style('padding-top', '3%');



}

function draw(){

    //background(200, 170, 250);
    background(255);

    noStroke();
    //fill(255, 0, 255);
    fill(0);
    for(let i = 0; i < fibo_binary_matrix.length; ++i){
        for(let j = 0; j < fibo_binary_matrix[0].length; ++j){
            if(fibo_binary_matrix[i][j] == 1) rect(j * sqr_len, i * sqr_len, sqr_len, sqr_len);
        }
    }

    noLoop();

}
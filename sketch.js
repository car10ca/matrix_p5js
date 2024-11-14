/* 
    This fun matrix movie screen was developed as part of freely available here: 
    https://www.youtube.com/watch?v=S1TQCi9axzg. 
    All credits belong to 'Emily Xie' and 'The Coding Train'.
*/


var symbolSize = 24;
var streams = [];

function setup() {
    createCanvas(
        window.innerWidth, //use entire screen width
        window.innerHeight //use entire screen height
    );
    background(0);
    var x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize
    }
    textSize(symbolSize);
}




function draw() {
    background(0, 150);
    streams.forEach(function (stream) {
        stream.render();
    });
}



function Symbol(x, y, speed, first) {

    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2, 20));
    this.first = first;

    this.setToRandomSymbol = function () {
        if (frameCount % this.switchInterval == 0) {
            //Create Katakana Unicode symbols 
            this.value = String.fromCharCode(
                //start at first symbol then go all the way through up to the 96 symbols that exist within Katakana
                0x30A0 + round(random(0, 96))
            );
        }
    }


    this.rain = function () {
        //ternary operator: replaces an if statement
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}




function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(1, 5);

    this.generateSymbols = function (x, y) {
        var first = round(random(0, 4)) == 1; //get a random number, check if it's equal to 1, if so, then it's true, otherwise false
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                fill(180, 255, 180);
            }
            else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }


}
let values = null;
let marginLeft = 40;
let textMargin = 10;
let rectWidth = 40;

function setup() {
    values = Array.from({ length: 10 }, item => random(10, 200));
    createCanvas(windowWidth / 2, windowHeight / 2);
    colorMode(HSL);
    textAlign(CENTER);
    noLoop();
}

function draw() {
    background(0, 0, 100);
    noStroke();
    fill(240, 40, 60);
    values.forEach((value, i) => {
        let posX = map(i, 0, values.length, marginLeft, width);
        rect(posX, height, rectWidth, -value);
        text(round(value), posX + (rectWidth / 2), height - value - textMargin);
    });
}

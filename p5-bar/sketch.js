let values = null;
const marginLeft = 40;
const textMargin = 10;
const rectWidth = 40;

function setup() {
    values = Array.from({ length: 10 }, _ => random(10, 200));
    createCanvas(windowWidth / 2, windowHeight / 2);
    colorMode(HSL);
    textAlign(CENTER);
    noLoop();
}

function draw() {
    background(255);
    noStroke();
    fill(240, 40, 60);
    values.forEach((_, i) => {
        let posX = map(i, 0, values.length, marginLeft, width);
        rect(posX, height, rectWidth, -_);
        text(round(_), posX + (rectWidth / 2), height - _ - textMargin);
    });
}

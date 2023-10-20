function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('sketch');
    colorMode(HSL, 360, 100, 100, 1);
}

function draw() {
    background(0, 0, 100);
    fill(0, 0, 80);
    noStroke();
    circle(200, 200, 400);
    noFill();
    stroke(0, 0, 10);
    strokeWeight(10);
    const phi = map(scrollY, 0, document.body.clientHeight - window.innerHeight, .001, 2 * PI);
    arc(200, 200, 250, 250, 0, phi);
}

let _flights;
let flights;

function preload() {
    _flights = loadTable('flights.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    const distances = _flights.getColumn('distance');
    const minDistance = min(distances);
    const maxDistance = max(distances);
    flights = _flights.getRows().map(_ => ({
        fx: map(_.getNum('from_long'), -180, 180, 0, width),
        fy: map(_.getNum('from_lat'), -90, 90, height, 0),
        tx: map(_.getNum('to_long'), -180, 180, 0, width),
        ty: map(_.getNum('to_lat'), -90, 90, height, 0),
        d: map(_.getNum('distance'), minDistance, maxDistance, 2, 10),
    }));
    colorMode(HSL);
    noLoop();
}

function draw() {
    background(10);
    noStroke();
    fill(240, 0, 60, .15);
    flights.forEach(_ => {
        circle(_.fx, _.fy, _.d);
    });
}

function mouseClicked() {
    draw();
    flights.forEach(_ => {
        if (dist(_.fx, _.fy, mouseX, mouseY) < 20) {
            fill(0, 90, 50, .5);
            circle(_.tx, _.ty, _.d);
            fill(240, 80, 90, .15);
            circle(_.fx, _.fy, _.d);
        }
    });
}

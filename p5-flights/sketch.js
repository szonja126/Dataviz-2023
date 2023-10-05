let data;
let flights;

function preload() {
    data = loadTable('flights.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    const distances = data.getColumn('distance');
    const minDistance = min(distances);
    const maxDistance = max(distances);
    flights = data.getRows().map(row => ({
        fx: map(row.getNum('from_long'), -180, 180, 0, width),
        fy: map(row.getNum('from_lat'), -90, 90, height, 0),
        tx: map(row.getNum('to_long'), -180, 180, 0, width),
        ty: map(row.getNum('to_lat'), -90, 90, height, 0),
        d: map(row.getNum('distance'), minDistance, maxDistance, 2, 10),
    }));
    colorMode(HSL);
    noLoop();
}

function draw() {
    background(10);
    noStroke();
    fill(240, 0, 60, .15);
    flights.forEach(f => {
        circle(f.fx, f.fy, f.d);
    });
}

function mouseClicked() {
    draw();
    flights.forEach(f => {
        if (dist(f.fx, f.fy, mouseX, mouseY) < 20) {
            fill(0, 90, 50, .5);
            circle(f.tx, f.ty, f.d);
            fill(240, 80, 90, .15);
            circle(f.fx, f.fy, f.d);
        }
    });
}

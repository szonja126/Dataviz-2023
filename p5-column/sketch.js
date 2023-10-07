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
    noStroke(); //nincs körvonal
    fill(240, 40, 60);
    values.forEach((value, i) => { 
        let posX = map(i, 0, values.length, marginLeft, width); //map fgv: 2 tartomány között transzformál egy értéket
        //az i-t transzformáljuk, legkisebb értéke a bal margó, legnagyobb a teljes szélessége, 
        //így ezt a területet felosztjuk az elemszámainkkal, automatikusan lesz térköz is
        rect(posX, height, rectWidth, -value); //kirajzoljuk a téglalapot, P5.JS-ben felülről jönnek az értékek
        //ezért teljes nagyságban kezdünk rajzolni és mínusz értékkel rajzoljuk  "lefelé"
        text(round(value), posX + (rectWidth / 2), height - value - textMargin);
    });
}

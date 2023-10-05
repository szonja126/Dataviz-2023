let hMargin = 30;
let vMargin = 200;
let countries;
let females;
let males;
let activeItem = {};

function preload() {
    countries = loadJSON('data/countries.json');
    females = loadJSON('data/females.json');
    males = loadJSON('data/males.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL);
    textAlign(CENTER);
}

function draw() {
    background(200, 40, 35);
    let data = Object.entries(countries).filter(([code, name]) => {
        return (typeof females[code] !== 'undefined' && Object.keys(females[code]).includes('2012'))
            && (typeof males[code] !== 'undefined' && Object.keys(males[code]).includes('2012'));
    });

    activeItem = {};
    data.forEach(([code, name], i) => {
        let x = map(i, 0, data.length, hMargin, width - hMargin);
        let yf = map(females[code]['2012'], 0, 100, height - vMargin, vMargin);
        let ym = map(males[code]['2012'], 0, 100, height - vMargin, vMargin);
        if (abs(mouseX - x) <= 3) {
            activeItem = { code, x, yf, ym };
            stroke(200, 28, 95);
        } else {
            stroke(200, 28, 45);
        }
        line(x, yf, x, ym);
        noStroke();
        fill(22, 100, 55);
        circle(x, yf, 5);
        fill(180, 80, 40);
        circle(x, ym, 5);
    });
    fill(0, 0, 100);
    if (typeof activeItem.code !== 'undefined') {
        text(
            `${females[activeItem.code]['2012']}`,
            activeItem.x,
            activeItem.yf < activeItem.ym ? activeItem.yf - 20 : activeItem.yf + 20
        );
        text(
            `${males[activeItem.code]['2012']}`,
            activeItem.x,
            activeItem.yf < activeItem.ym ? activeItem.ym + 10 : activeItem.ym - 10
        );
        text(
            countries[activeItem.code],
            activeItem.x,
            activeItem.yf < activeItem.ym ? activeItem.ym + 30 : activeItem.ym - 30
        )
    }
}

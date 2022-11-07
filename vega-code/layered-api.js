const options = {
    view: {
        renderer: "canvas",
    },
};

function makeLayer(field, title, color, domain) {
    return vl.markLine({
        interpolate: 'monotone',
    })
        .encode(
            vl.x().field('year').type('temporal').timeUnit('year').axis({
                tickCount: 'year',
                title: null,
            }),
            vl.y().field(field).type('quantitative').axis({
                title,
                titleColor: color,
            }).scale({
                domain,
            }),
            vl.color().value(color),
        );
}

vl.register(vega, vegaLite, options);
vl.layer(
    makeLayer('meteors', 'Total meteors observed', colors.meteor, [20000, 120000]),
    makeLayer('corn', 'Fresh sweet corn (lbs per capita)', colors.corn, [5.0, 10.0]),
)
    .data('data.csv')
    .config({
        axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleFontWeight: 'normal',
        },
    })
    .resolve({
        scale: {
            y: 'independent',
        },
    })
    .width(800)
    .height(500)
    .render()
    .then((el) => {
        document.querySelector('#graph').appendChild(el);
    });

const schema = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    data: {
        name: 'data',
        url: 'data.csv',
        format: {
            type: 'csv',
        },
    },
    width: 800,
    height: 500,
    padding: 0,
    config: {
        axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleFontWeight: 'normal',
        },
    },
    scales: [
        {
            name: 'x',
            type: 'linear',
            domain: {
                data: 'data',
                field: 'year',
            },
            range: 'width',
            zero: false,
            round: true,
        },
        {
            name: 'y',
            type: 'linear',
            domain: [20000, 120000],
            range: 'height',
            zero: false,
        },
    ],
    axes: [
        {
            orient: 'bottom',
            scale: 'x',
            title: 'Year',
            format: 'd',
            labelFlush: true,
            zindex: 1,
        },
        {
            orient: 'left',
            scale: 'y',
            title: 'Total meteors observed',
            grid: true,
            zindex: 0,
        },
    ],
    marks: [
        {
            type: 'line',
            from: {
                data: 'data',
            },
            encode: {
                enter: {
                    x: {
                        scale: 'x',
                        field: 'year',
                    },
                    y: {
                        scale: 'y',
                        field: 'meteors',
                    },
                    interpolate: {
                        value: 'monotone',
                    },
                },
            },
        },
    ],
};

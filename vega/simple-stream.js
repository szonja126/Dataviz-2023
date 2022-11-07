const schema = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { name: 'table' },
    width: 800,
    height: 500,
    padding: 0,
    config: {
        axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleFontWeight: 'normal',
        },
        style: {
            cell: {
                stroke: '#d5d5d5',
                strokeOpacity: 0.8,
                strokeWidth: 1,
            },
        },
    },
    mark: {
        type: 'line',
        interpolate: 'monotone',
    },
    encoding: {
        x: {
            field: 'year',
            type: 'temporal',
            timeUnit: 'year',
            axis: {
                grid: false,
                tickCount: 'year',
            },
        },
        y: {
            field: 'meteors',
            type: 'quantitative',
            axis: {
                title: 'Total meteors observed',
            },
            scale: {
                domain: [20000, 120000],
            },
        },
    }
};

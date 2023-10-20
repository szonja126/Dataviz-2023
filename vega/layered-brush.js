const schema = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    config: {
        axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleFontWeight: 'normal',
        },
    },
    data: {
        url: 'https://raw.githubusercontent.com/nandordevai/Dataviz-2023/main/vega/data.csv',
    },
    vconcat: [
        {
            width: 800,
            height: 400,
            encoding: {
                x: {
                    field: 'year',
                    type: 'temporal',
                    timeUnit: 'year',
                    axis: {
                        tickCount: 'year',
                        title: null,
                    },
                    scale: {
                        domain: {
                            param: 'brush',
                        },
                    },
                },
                y: {
                    field: 'meteors',
                    type: 'quantitative',
                    axis: {
                        title: 'Total meteors observed',
                        titleColor: colors.meteor,
                    },
                    scale: {
                        domain: [20000, 120000],
                    },
                    orient: 'left',
                },
            },
            mark: {
                type: 'line',
                interpolate: 'monotone',
                color: colors.meteor,
            },
        },
        {
            width: 800,
            height: 100,
            encoding: {
                x: {
                    field: 'year',
                    type: 'temporal',
                    timeUnit: 'year',
                    axis: {
                        tickCount: 'year',
                        title: null,
                    },
                },
                y: {
                    field: 'meteors',
                    type: 'quantitative',
                    axis: {
                        title: 'Total meteors observed',
                        titleColor: colors.meteor,
                    },
                    scale: {
                        domain: [20000, 120000],
                    },
                    orient: 'left',
                },
            },
            mark: {
                type: 'line',
                interpolate: 'monotone',
                color: colors.meteor,
            },
            params: [
                {
                    name: 'brush',
                    select: {
                        type: 'interval',
                        encodings: ['x'],
                    },
                },
            ],
        },
    ],
};

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
        url: 'data.csv',
    },
    params: [
        {
            name: 'cOpacity',
            value: 100,
            bind: {
                input: 'range',
                name: 'Corn Opacity',
                min: 0,
                max: 100,
                step: 1,
            },
        },
        {
            name: 'mOpacity',
            value: 100,
            bind: {
                input: 'range',
                name: 'Meteors Opacity',
                min: 0,
                max: 100,
                step: 1,
            },
        },
    ],
    width: 800,
    height: 500,
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
    },
    layer: [
        {
            mark: {
                type: 'line',
                interpolate: 'monotone',
                color: colors.meteor,
                opacity: {
                    expr: 'mOpacity / 100',
                },
                tooltip: true,
            },
            encoding: {
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
        },
        {
            mark: {
                type: 'line',
                interpolate: 'monotone',
                color: colors.corn,
                opacity: {
                    expr: 'cOpacity / 100',
                },
                tooltip: {
                    content: 'data', // v. encoding
                },
            },
            encoding: {
                y: {
                    field: 'corn',
                    type: 'quantitative',
                    axis: {
                        title: 'Fresh sweet corn (lbs per capita)',
                        titleColor: colors.corn,
                    },
                    scale: {
                        domain: [5.0, 10.0],
                    },
                },
            },
        },
        {
            mark: 'rule',
            encoding: {
                opacity: {
                    condition: {
                        value: .5,
                        param: 'hover',
                        empty: false,
                    },
                    value: 0,
                },
                tooltip: [
                    {
                        field: 'year',
                        type: 'temporal',
                        timeUnit: 'year',
                        title: 'Year',
                    },
                    {
                        field: 'meteors',
                        type: 'quantitative',
                        title: 'Meteors',
                    },
                    {
                        field: 'corn',
                        type: 'quantitative',
                        title: 'Corn',
                    },
                ],
            },
            params: [
                {
                    name: 'hover',
                    select: {
                        type: 'point',
                        fields: ['year'],
                        nearest: true,
                        on: 'mouseover',
                        clear: 'mouseout',
                    },
                }
            ],
        },
    ],
    resolve: {
        scale: {
            y: 'independent',
        },
    },
};

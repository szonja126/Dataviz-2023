const schema = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    data: [
        {
            name: 'tree',
            url: '/vega/top-1000-extended-posters.json',
            transform: [
                {
                    type: 'filter',
                    expr: 'datum.year > 2016 && datum.metascore !== ""',
                },
                {
                    type: 'nest',
                    keys: ['year', 'genre'],
                    generate: true
                },
                {
                    type: 'tree',
                    method: 'tidy',
                    separation: true,
                    as: ['y', 'x', 'depth', 'children'],
                    size: [1200, 800],
                },
            ],
        },
        {
            name: 'links',
            source: 'tree',
            transform: [
                { type: 'treelinks' }, // links between nodes
                { type: 'linkpath', orient: 'horizontal', shape: 'diagonal' }, // visual link ie. the path itself
            ],
        },
        {
            name: 'nodes',
            source: 'tree',
            transform: [{ type: 'filter', expr: 'datum.children > 0' }],
        },
        {
            name: 'leaves',
            source: 'tree',
            transform: [{ type: 'filter', expr: 'datum.children == 0' }],
        },
    ],
    scales: [
        {
            name: 'grossusd',
            type: 'linear',
            domain: {
                data: 'tree',
                field: 'gross_usd',
            },
            range: [5, 1000],
        },
        {
            name: 'metascore',
            type: 'log',
            domain: {
                data: 'tree',
                field: 'metascore',
            },
            range: [1, 10],
        },
    ],
    marks: [
        {
            type: 'path',
            from: { data: 'links' },
            encode: {
                enter: {
                    path: { field: 'path' },
                    stroke: { value: 'hsla(0, 0%, 80%, 1)' },
                    strokeWidth: {
                        field: 'target.metascore',
                        scale: 'metascore',
                    },
                },
            },
        },
        {
            type: 'symbol',
            from: { data: 'nodes' },
            encode: {
                enter: {
                    size: { value: 100 },
                    stroke: { value: 'hsla(0, 0%, 40%, 1)' },
                    x: { field: 'x' },
                    y: { field: 'y' },
                    fill: { value: 'hsla(120, 25%, 60%, 1)' },
                },
            },
        },
        {
            type: 'symbol',
            from: { data: 'leaves' },
            encode: {
                enter: {
                    size: { field: 'gross_usd', scale: 'grossusd' },
                    stroke: { value: 'hsla(0, 0%, 40%, 1)' },
                    x: { field: 'x' },
                    y: { field: 'y' },
                    fill: { value: 'hsla(120, 25%, 60%, 1)' },
                },
            },
        },
        {
            type: 'text',
            from: { data: 'leaves' },
            encode: {
                enter: {
                    x: { field: 'x', offset: 20 },
                    y: { field: 'y', offset: 4 },
                    text: { field: 'title_hu' },
                },
            },
        },
        {
            type: 'text',
            from: { data: 'nodes' },
            encode: {
                enter: {
                    x: { field: 'x', offset: 10 },
                    y: { field: 'y', offset: 4 },
                    text: { field: 'key' },
                },
            },
        },
    ],
};

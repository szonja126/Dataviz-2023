const schema = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 800,
    height: 500,
    padding: 0,
    signals: [
        { name: 'cx', update: 'width / 2' },
        { name: 'cy', update: 'height / 2' },
    ],
    data: [
        {
            name: 'node-data',
            url: '/miserables.json',
            format: { type: 'json', property: 'nodes' },
        },
        {
            name: 'link-data',
            url: '/miserables.json',
            format: { type: 'json', property: 'links' },
        },
    ],
    scales: [
        {
            name: 'color',
            type: 'ordinal',
            domain: { data: 'node-data', field: 'group' },
            range: { scheme: 'category20c' },
        },
    ],
    marks: [
        {
            name: 'nodes',
            type: 'symbol',
            zindex: 1,
            from: { data: 'node-data' },
            encode: {
                enter: {
                    fill: { scale: 'color', field: 'group' },
                    size: 128,
                },
            },
            transform: [
                {
                    type: 'force',
                    iterations: 300,
                    static: false,
                    forces: [
                        { force: 'center', x: { signal: 'cx' }, y: { signal: 'cy' } },
                        { force: 'nbody', strength: -30 },
                        { force: 'link', links: 'link-data', distance: 50 },
                    ],
                },
            ],
        },
        {
            name: 'links',
            type: 'path',
            from: { data: 'link-data' },
            interactive: false,
            encode: {
                update: {
                    stroke: { value: '#ccc' },
                    strokeWidth: { value: 0.5 },
                },
            },
            transform: [
                {
                    type: 'linkpath',
                    shape: 'line',
                    sourceX: 'datum.source.x', sourceY: 'datum.source.y',
                    targetX: 'datum.target.x', targetY: 'datum.target.y',
                },
            ],
        },
    ],
};

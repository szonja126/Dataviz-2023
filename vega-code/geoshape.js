const schema = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 800,
    height: 500,
    padding: 0,
    data: {
        url: 'https://cdn.jsdelivr.net/npm/vega-datasets@2/data/world-110m.json',
        format: {
            type: 'topojson',
            feature: 'countries',
        }
    },
    projection: {
        type: 'naturalEarth1',
    },
    mark: {
        type: 'geoshape',
        fill: 'hsla(260, 20%, 75%, 1)',
        stroke: 'hsla(0, 0%, 0%, .5)',
    },
};

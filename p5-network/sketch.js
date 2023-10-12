import p5 from 'p5';
import createGraph from 'ngraph.graph';
import createLayout from 'ngraph.forcelayout';
import { data } from './miserables';

let sketch = (s) => {
    let graph;
    let layout;
    let physicsSettings = {
        timeStep: 5,
        dimensions: 2,
        gravity: -20,
        theta: 1,
        springLength: 35,
        springCoefficient: .0005,
        dragCoefficient: .1,
    };
    let width = window.innerWidth;
    let height = window.innerHeight;

    s.setup = () => {
        graph = createGraph();
        data.nodes.forEach((node, i) => {
            graph.addNode(i, node);
        });
        data.links.forEach(link => {
            graph.addLink(link.source, link.target, link.value);
        });
        layout = createLayout(graph, physicsSettings);
        s.createCanvas(width, height);
        s.colorMode(s.HSL, 360, 100, 100);
        s.noLoop();
    };

    s.draw = () => {
        s.background(0, 0, 10);
        for (let i = 0; i < 200; i++) {
            layout.step();
        }
        s.translate(width / 2, height / 2);
        s.stroke(30, 50, 40);
        graph.forEachLink(drawLink);
        s.fill(240, 80, 80);
        s.stroke(0, 0, 30);
        graph.forEachNode(drawNode);
    };

    const drawNode = (node) => {
        console.log(node);
        const pos = layout.getNodePosition(node.id);
        const circle = s.ellipse(pos.x, pos.y, 10, 10);
        s.text(node.data.name, pos.x + 10, pos.y + 10);
    };

    const drawLink = (link) => {
        const pos = layout.getLinkPosition(link.id);
        s.line(
            pos.from.x,
            pos.from.y,
            pos.to.x,
            pos.to.y
        );
    };
}

const app = new p5(sketch, 'graph-container');

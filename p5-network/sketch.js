import p5 from 'p5';
import createGraph from 'ngraph.graph';
import createLayout from 'ngraph.forcelayout';
import { data } from './miserables';

let sketch = (p) => {
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
    let linkEndColor = null;
    let linkMidColor = null;

    p.setup = () => {
        graph = createGraph();
        data.nodes.forEach((node, i) => {
            graph.addNode(i, node);
        });
        data.links.forEach(link => {
            graph.addLink(link.source, link.target, link.value);
        });
        layout = createLayout(graph, physicsSettings);
        p.createCanvas(width, height);
        p.colorMode(p.HSL, 360, 100, 100);
        linkEndColor = p.color(240, 80, 80);
        linkMidColor = p.color(240, 80, 50);
        p.noLoop();
    };

    p.draw = () => {
        p.background(0, 0, 10);
        for (let i = 0; i < 200; i++) {
            layout.step();
        }
        p.translate(width / 2, height / 2);
        graph.forEachLink(drawLink);
        p.fill(240, 80, 80);
        p.stroke(0, 0, 30);
        graph.forEachNode(drawNode);
        p.fill(0, 0, 100);
        graph.forEachNode(drawLabel);
    };

    const drawNode = (node) => {
        const pos = layout.getNodePosition(node.id);
        const circle = p.ellipse(pos.x, pos.y, 12, 12);
    };

    const drawLabel = (node) => {
        const pos = layout.getNodePosition(node.id);
        p.text(node.data.name, pos.x + 10, pos.y + 10);
    };

    const drawLink = (link) => {
        const pos = layout.getLinkPosition(link.id);
        gradientLine(
            p.drawingContext,
            pos.from.x,
            pos.from.y,
            pos.to.x,
            pos.to.y,
            linkEndColor,
            linkMidColor
        );
    };

    const gradientLine = (ctx, x1, y1, x2, y2, c1, c2) => {
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, c1);
        gradient.addColorStop(.5, c2);
        gradient.addColorStop(1, c1);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };
}

const app = new p5(sketch, 'graph-container');

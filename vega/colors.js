function hsl(h, s, l) {
    return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
}

const h = 200;
const s = .6;
const l = .4;
const colors = {
    meteor: hsl(h + 120, s, l),
    corn: hsl(h, s, l),
};

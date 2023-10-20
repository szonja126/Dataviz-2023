const show = function () {
    const fn = (num) => {
        document.querySelectorAll('section').forEach((section, i) => {
            section.classList.toggle('current', i === num);
        });
    }
    const next = (dir) => {
        const el = document.querySelector('.current');
        const newEl = el[`${dir}ElementSibling`];
        if (newEl !== null && newEl.tagName === 'SECTION') {
            el.classList.remove('current');
            newEl.classList.add('current');
        }
    }
    fn.next = () => {
        next('next');
    }
    fn.previous = () => {
        next('previous');
    }
    return fn;
}();
window.onload = () => {
    if (document.body.classList.contains('test')) {
        Array.from(document.querySelectorAll('section')).at(-1).classList.add('current');
    } else {
        show(0);
    }
};
document.body.onkeydown = (event) => {
    if (['ArrowRight', ' '].includes(event.key)) show.next();
    if (event.key === 'ArrowLeft') show.previous();
    if (event.key === 'Home') show(0);
};

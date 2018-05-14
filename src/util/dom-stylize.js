// add styles to a dom element
function stylize(domElem, styles) {
    for(let prop in styles) {
        domElem.style[prop] = styles[prop];
    }

    return domElem;
}

export { stylize };
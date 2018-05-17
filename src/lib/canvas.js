// API related to canvas
// Canvas is area in which curved menu points (navigation elements) will be rendered

import { getCanvasSize } from '../util/geometry';
import { stylize } from '../util/dom-stylize';

// Stylize (css) canvas area
function stylizeCanvas({canvasElem, radius, angle, pointSize}) {
    // get recommended size of canvas element
    let { width, height } = getCanvasSize(radius, angle);

    // add reference class
    canvasElem.classList.add('curved-menu');

    // return canvas element
    return stylize(canvasElem, {
        width: width + 'px',
        height: height + 'px',
        marginTop: pointSize + 'px',
        marginLeft: pointSize + 'px',
    });
}

// Get curve path DOM element
// Curve path element is dashed (or solid) path on which menu points will be placed
function getPathElement({radius, angle}) {
    let pathContainerElem = document.createElement('div');
    let pathElem = document.createElement('div');

    // add reference classes
    pathContainerElem.classList.add('curved-menu__curve-container');
    pathElem.classList.add('curved-menu__curve-container__curve');

    // stylize path element
    stylize(pathElem, {
        width: (radius * 2) + 'px',
        height: (radius * 2) + 'px',
    });

    // append path DOM element to path container
    pathContainerElem.appendChild(pathElem);

    return pathContainerElem;
}

// get svg node
function _getNode(tag, config) {
    tag = document.createElementNS('http://www.w3.org/2000/svg', tag);
    
    for (let prop in config){
        tag.setAttributeNS(null, prop, config[prop]);
    }

    return tag;
}

// get svg filter element
function getSVGElement() {
    let svgElement = document.createElement('svg');
    svgElement.setAttribute('version', '1.1');

    let defs = svgElement.appendChild( _getNode('defs') );
    let filter = defs.appendChild( _getNode('filter', { id: 'curved-menu-goo-effect' }) );
    filter.appendChild( _getNode('feGaussianBlur', {in: 'SourceGraphic', stdDeviation: '3', result: 'blurred'}) );
    filter.appendChild( _getNode('feColorMatrix', {in: 'blurred', mode: 'matrix', values:'1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5', result: 'goo'}) );
    filter.appendChild( _getNode('feBlend', {in: 'SourceGraphic', in2: 'goo'}) );

    return svgElement;
}

// get canvas element
// stylize canavs and add path element
function getCanvas({rootElem, radius, angle, pointSize}) {
    // empty root element
    rootElem.innerHTML = '';

    // stylize canvas
    stylizeCanvas({canvasElem: rootElem, radius, angle, pointSize});

    // get path element
    let pathElement = getPathElement({radius, angle});

    // get SVG element
    let svgElement = getSVGElement();
    
    // append path and svg element to root element
    rootElem.appendChild(pathElement);
    rootElem.appendChild(svgElement);

    return rootElem;
}

export { getCanvas, stylizeCanvas, getPathElement };
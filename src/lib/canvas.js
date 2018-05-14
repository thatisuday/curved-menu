// API related to canvas
// Canvas is area in which curved menu points (navigation elements) will be rendered

import { getCanvasSize } from '../util/geometry';
import { stylize } from '../util/dom-stylize';

// Stylize (css) canvas area
function stylizeCanvas({canvasElem, radius, angle, pointSize}) {
    // get recommended size of canvas element
    let { width, height } = getCanvasSize(radius, angle);

    // return canvas element
    return stylize(canvasElem, {
        position: 'relative',
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

    // stylize path element
    stylize(pathElem, {
        width: (radius* 2) + 'px',
        height: (radius * 2) + 'px',
        borderRadius: '100%',
        border: '1px dashed #999',
        boxSizing: 'border-box',
        position: 'absolute',
        right: '0px',
        top: '50%',
        transform: 'translateY(-50%)',
    });;

    // stylize path container element
    stylize(pathContainerElem, {
        width : '100%',
        height : '100%',
        overflow : 'hidden',
        boxSizing : 'border-box',
        position : 'absolute',
        right : '0',
        top : '0',
    });

    // append path DOM element to path container
    pathContainerElem.appendChild(pathElem);

    return pathContainerElem;
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
    
    // append path element to root element
    rootElem.appendChild(pathElement);

    return rootElem;
}

export { getCanvas, stylizeCanvas, getPathElement };
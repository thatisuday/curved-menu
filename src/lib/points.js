// API related to menu points (navigation elements)

import { getSin, getCos } from '../util/angle';
import { getCanvasSize } from '../util/geometry';
import { stylize } from '../util/dom-stylize';

// set point element position relative to canvas
function _setPointElemPosition({ radius, angle, elements, totalElements, atBottom }) {
    let { width, height } = getCanvasSize(radius, angle);

    // current angle of first point element to render at from x-axis
    let currentAngle = (angle / 2);

    // angle between two adjacent point
    let separationAngle = (angle / 2) / elements.length;

    for (let index in elements) {
        let top = (height / 2) - (getSin(currentAngle) * radius);
        let left = (getCos(currentAngle) * radius) - (radius - width);

        // if bottom points, position vertically relative to bottom of the canvas
        if (atBottom) {
            top = height - top;
        }

        // stylize pointElement
        stylize(elements[index], {
            top : Math.round(top) + 'px',
            left : Math.round(left) + 'px',
        });
        
        // if even total point elements, add extra angle of separation
        // to compensate lack of middle point
        if ((totalElements % 2 == 0)) {
            currentAngle -= (separationAngle + (separationAngle / (totalElements - 1)));
        }
        else {
            currentAngle -= separationAngle;
        }
    }

    return elements;
}

// Get list of DOM point elements
function getPointElements({ radius, angle, pointsCount, pointSize }) {
    let { width, height } = getCanvasSize(radius, angle);

    // make list of DOM point elements
    let pointElements = Array(pointsCount).fill(null).map(() => {
        let pointElem = document.createElement('div');

        // style point element
        stylize(pointElem, {
            position: 'absolute',
            width: pointSize + 'px',
            height: pointSize + 'px',
            top: (height / 2) + 'px',
            left: width + 'px',
            borderRadius: '100%',
            background: '#dc6262',
            boxSizing: 'border-box',
            zIndex: '1',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 3px #fff, 0 0 0 6px #eee',
        });

        return pointElem;
    });

    // split point elements into three vertical zones
    let topElements = [];
    let middleElements = [];
    let bottomElements = [];

    if (pointsCount > 1 && (pointsCount % 2) == 0) {
        topElements = pointElements.slice(0, pointsCount / 2);
        bottomElements = pointElements.slice(pointsCount / 2).reverse();
    } else if (pointsCount > 1 && pointsCount % 2 != 0) {
        topElements = pointElements.slice(0, pointsCount / 2);
        middleElements = pointElements.slice((pointsCount / 2), ((pointsCount / 2) + 1));
        bottomElements = pointElements.slice(((pointsCount / 2) + 1));
    } else {
        topElements = pointElements;
    }

    // set margin to point elements to render on circumference
    if (pointsCount > 1) {
        //radius, angle, elements, totalElements, atBottom
        _setPointElemPosition({
            radius, 
            angle, 
            elements: topElements, 
            totalElements: pointsCount, 
            atBottom: false
        });

        _setPointElemPosition({
            radius, 
            angle, 
            elements: bottomElements.reverse(), 
            totalElements: pointsCount, 
            atBottom: true
        });
    }

    // return point DOM elements
    return [...topElements, ...middleElements, ...bottomElements.reverse()];
}

export { getPointElements };
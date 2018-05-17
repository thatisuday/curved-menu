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
function getPointElements({ radius, angle, points = [{id: 'POINT_ID_1', label: 'provide some points'}], pointSize }, actionHandlers) {
    let { width, height } = getCanvasSize(radius, angle);

    let pointsCount = points.length;

    // make list of DOM point elements
    let pointElements = points.map(({ id, label }) => {
        let pointElem = document.createElement('div');
        let pointElemBullet = document.createElement('div');
        let pointElemLabel = document.createElement('div');

        // add point attribute to point label
        pointElem.setAttribute('point-id', id);

        // add text inside point element label
        pointElemLabel.innerText = label;

        // insert point bullet and label inside point element
        pointElem.appendChild(pointElemBullet);
        pointElem.appendChild(pointElemLabel);

        // style point element
        stylize(pointElem, {
            top: (height / 2) + 'px',
            left: width + 'px',
            marginLeft: ( -pointSize / 2 ) - 5 + 'px',      // 5px extra because of css padding
            marginTop: ( -pointSize / 2 ) - 5 + 'px',       // 5px extra because of css padding
        });

        // style point bullet element
        stylize(pointElemBullet, {
            width: pointSize + 'px',
            height: pointSize + 'px'
        });

        // add reference classes
        pointElem.classList.add('curved-menu__point');
        pointElemBullet.classList.add('curved-menu__point__bullet');
        pointElemLabel.classList.add('curved-menu__point__label');

        // attach click event handler
        pointElem.addEventListener('click', function( event ) {
            actionHandlers.click( event.currentTarget );
        });

        return pointElem;
    });

    // split point elements into three vertical zones
    let topElements = [];
    let middleElements = [];
    let bottomElements = [];

    if (pointsCount > 1 && (pointsCount % 2) == 0) {
        topElements = pointElements.slice(0, pointsCount / 2);
        bottomElements = pointElements.slice(pointsCount / 2);
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
import { getSin, getCos } from './angle';

// get minimum width of div to fit points
// r - (cos(angle/2) * r)
function getWidth(radius, angle) {
    var cos = getCos(angle / 2);
    return Math.round(radius - (cos * radius));
}

// get minimum height of div to fit points
// r * sin(angle/2) * 2
function getHeight(radius, angle) {
    var sin = getSin(angle / 2);
    return Math.round(radius * sin * 2);
}

// get canvas width and height
// canvas: area in which navigation menu will be rendered
function getCanvasSize(radius, angle) {
    var width = getWidth(radius, angle);
    var height = getHeight(radius, angle);

    return {
        width,
        height
    };
}

export { getWidth, getCos, getCanvasSize };
const navElement = document.getElementById('nav');

let radius = 300; // radius of circle in px
let angle = 90; // span angle of points on circle
let pointsCount = 4; // number of points
let pointSize = 15; // size of points in px

import { getCanvas } from './lib/canvas';
import { getPointElements } from './lib/points';

export class CurvedMenu {
    constructor(rootElem, config) {
        this.rootElem = rootElem;
        this.config = config;
    }

    // initialize curved menu
    init() {
        this.canvasElement = getCanvas({rootElem: this.rootElem, ...this.config});
        let pointElements = getPointElements(this.config);
        this.canvasElement = this.canvasElement.append(...pointElements);

        // notify init event
        this.notify('INIT');
    }

    // notitfy
    notify(type) {
        console.log('NOTIF: ', type);
    }
}

// instance
const instance = new CurvedMenu(navElement, {
    radius, angle, pointSize, pointsCount
});
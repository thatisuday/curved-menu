import { getCanvas } from './lib/canvas';
import { getPointElements } from './lib/points';
import css from './lib/styles';

// add styles to document
let style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.getElementsByTagName('head')[0].appendChild(style);

// CurvedMenu plugin constructor class
export default class CurvedMenu {
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
        if( this.config.onInit && ( typeof this.config.onInit == 'function' ) ) {
            this.config.onInit();
        }
    }
}
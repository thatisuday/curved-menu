import { getCanvas } from './lib/canvas';
import { getPointElements } from './lib/points';
import './scss/styles.scss';

// CurvedMenu plugin constructor class
export default class CurvedMenu {
    constructor(rootElem, config) {
        this.rootElem = rootElem;
        this.config = config;
        this.activePoint = null;
    }

    // initialize curved menu
    init() {
        this.canvasElement = getCanvas({rootElem: this.rootElem, ...this.config});

        this.pointElements = getPointElements(this.config,  {
            click: ( pointElem ) => {
                this.setActivePoint( pointElem.getAttribute('point-id') );
            }
        });

        this.canvasElement = this.canvasElement.append(...this.pointElements);

        // notify init event
        if( this.config.onInit && ( typeof this.config.onInit == 'function' ) ) {
            this.config.onInit();
        }
    }

    // set active point ( class )
    setActivePoint( selectedPointId ) {
        // toggle active class
        for( let pointElem of this.pointElements ) {
            let pointId = pointElem.getAttribute('point-id');

            if( selectedPointId  ==  pointId ) {
                this.activePoint = selectedPointId;
                pointElem.classList.add('curved-menu__point--active');
            }
            else {
                pointElem.classList.remove('curved-menu__point--active');
            }
        }

        // dispatch on click callback
        this.config.onClick( selectedPointId );
    }
}
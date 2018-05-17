import { getCanvas } from './lib/canvas';
import { getPointElements } from './lib/points';
import defaultConfig from './lib/config';
import './scss/styles.scss';

// CurvedMenu plugin constructor class
export default class CurvedMenu {
    constructor(rootElem, config) {
        this.initialized = false;
        this.rootElem = rootElem;
        this.config = Object.assign(defaultConfig, config);
    }

    // initialize curved menu
    init() {
        // destroy previous instance, if exists
        if( this.initialized ) {
            this.destroy();
        }

        // create canvas element from root element
        this.canvasElement = getCanvas({rootElem: this.rootElem, ...this.config});

        // create DOM point elements
        this.pointElements = getPointElements(this.config,  {
            click: ( pointElem ) => {
                this.setActivePoint( pointElem.getAttribute('point-id') );
            }
        });

        // append ppints to canvas element
        this.canvasElement = this.canvasElement.append(...this.pointElements);

        // notify init event
        if( this.config.onInit && ( typeof this.config.onInit == 'function' ) ) {
            this.config.onInit();
        }

        // set initialized value to true
        this.initialized = true;
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
        if( this.config.onClick && ( typeof this.config.onClick == 'function' ) ) {
            this.config.onClick( selectedPointId );
        }
    }

    // destroy component
    destroy() {
        this.canvasElement = null;
        this.pointElements = null;
        this.activePoint = null;
        
        // reset root element container
        this.rootElem.style = '';
        this.rootElem.innerHTML = '';

        // unset initialized value to true
        this.initialized = false;
    }

}
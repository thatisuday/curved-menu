# Curved Menu
VanillaJS Curved Menu (circular navigation) with radius and angle control.

<div>
    <img src="https://i.imgur.com/yUQMBpT.png" height="600px"/>
</div>

# Preview
[click here](https://rawgit.com/thatisuday/curved-menu/master/dist/index.html)

# Install
```js
npm install --save curved-menu

import CurveMenu from 'curved-menu';
```

> or use `index.js` file from `dist` folder

# Use
```html
<div id="nav">
    <h3>Curveed menu will initialize here.</h3>
    <h4>Check your console for info.</h4>

    <button id="button">initialize curved menu</button>
</div>
```

```js
var radius = 300; // radius of circle in px
var angle = 90; // span angle of points on circle
var pointSize = 25; // size of points in px

// point elements (bullet/buttons)
var points = [
    { id: 1, label: 'Point label 1' },
    { id: 2, label: 'Point label 2' },
    { id: 3, label: 'Point label 3' },
    { id: 4, label: 'Point label 4' },
    { id: 5, label: 'Point label 5' },
];

function insertNotification(message) {
    var notifier = document.getElementById('notifier');

    var notif = document.createElement('p');
    notif.textContent = message;

    notifier.appendChild(notif);
}

// once DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    // DOM element for curve menu
    var navElem = document.getElementById('nav');

    // create curve menu instance
    var instance = new CurvedMenu(navElem, {
        radius: radius,
        angle: angle,
        pointSize: pointSize,
        points, points,
        onInit: function(  ) {
            insertNotification( 'Curved menu initialized!' );
            console.log( 'Curved menu initialized!' );
        },
        onClick: function( id ) {
            insertNotification( 'Clicked point id: ' + id );
            console.log( 'Selected point id: ', id );
        }
    });

    // initialize curve menu instance at your will
    document.getElementById('button').addEventListener('click', function(){
        if(instance) {
            // initialize
            instance.init();

            // set active point using `id`
            setTimeout(function() {
                instance.setActivePoint('POINT_ID_2');
            }, 2000);

            // destroy instance
            setTimeout(function() {
                // destory
                instance.destroy();

                setTimeout(function(){
                    // re-initialize
                    instance.init();
                }, 3000);
            }, 6000);
        }
    });
});
```

# CSS classes
you can override style using these classes

- .curved-menu
- .curved-menu__curve-container
- .curved-menu__curve-container__curve
- .curved-menu__point
- .curved-menu__point__bullet
- .curved-menu__point__label

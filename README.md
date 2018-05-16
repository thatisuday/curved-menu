# Curved Menu
VanillaJS curved menu (circular navigation)

<div>
    <img src="https://i.imgur.com/NSo9o63.png" height="300px"/>
</div>

# preview
[click here](https://rawgit.com/thatisuday/curved-menu/master/dist/index.html)

# install
```js
npm install --save curved-menu

import CurveMenu from 'curved-menu';
```

# use
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
            instance.init();

            setTimeout(function() {
                instance.setActivePoint('2');
            }, 2000);
        }
    });
});
```

# CSS classes
- .curved-menu
- .curved-menu__curve-container
- .curved-menu__curve-container__curve
- .curved-menu__point
- .curved-menu__point__bullet
- .curved-menu__point__label

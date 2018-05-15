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
<div id="nav"></div>
```

```js
var radius = 300; // radius of circle in px
var angle = 90; // span angle of points on circle
var pointSize = 15; // size of points in px

// point elements (bullet/buttons)
var points = [
    { id: 1, label: 'Point label 1' },
    { id: 2, label: 'Point label 2' },
    { id: 3, label: 'Point label 3' },
    { id: 4, label: 'Point label 4' },
    { id: 5, label: 'Point label 5' },
];

// once DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    // DOM element for curve menu
    var navElem = document.getElementById('nav');

    // create curve menu instance
    const instance = new CurvedMenu(navElem, {
        radius: radius,
        angle: angle,
        pointSize: pointSize,
        points, points,
        onInit: function(  ) {
            console.log( 'curve menu initialized' );
        },
        onClick: function( id ) {
            console.log( 'clicked id', id );
        }
    });

    // initialize curve menu instance at your will
    setTimeout(function() {
        instance.init();
    }, 3000);
});
```

# CSS classes
- .curved-menu
- .curved-menu__curve-container
- .curved-menu__curve-container__curve
- .curved-menu__point
- .curved-menu__point__bullet
- .curved-menu__point__label

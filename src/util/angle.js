// get sin of an angle
function getSin( angle ) {
    if (angle < 90) {
        return Math.sin(angle * (Math.PI / 180));
    } else {
        return 1;
    }
}

// get cos of an angle
function getCos( angle ) {
    if (angle < 90) {
        return Math.cos(angle * (Math.PI / 180));
    } else {
        return 0;
    }
}

export { getSin, getCos };
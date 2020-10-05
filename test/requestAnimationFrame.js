"use strict";
let sec = Date.now();
let fps = 0;
(function animation() {
    let now = Date.now();
    if (now - sec >= 1000) {
        console.log(fps)
        sec = sec + 1000;
        fps = 0;
    }
    fps++;
    window.requestAnimationFrame(animation,);
})();

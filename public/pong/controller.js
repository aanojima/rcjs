/**
 * controller.js
 * Demo controller for rc.js
 *
 * Eric Schmidt 2014
 */

(function(win, doc) {

    var button;

    var trackpad;

    // Entry point
    function init() {
        rc.initController("rcjs-pong", function(res) {
            if(res.success) {
                start();
            }
        });
    }

    // Controller setup
    function start() {
        console.log("Controller starting");

        trackpad = rc.widgets.Trackpad("trackpad", 0, 0, 320, 400);
        doc.body.appendChild(trackpad);
    }

    doc.addEventListener("DOMContentLoaded", init);

})(window, document);
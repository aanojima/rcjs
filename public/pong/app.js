/**
 * app.js
 * Demo application for rc.js
 *
 * Eric Schmidt 2014
 */

(function(win, doc) {

    // Game elements
    var leftPaddle;
    var rightPaddle;
    var ball;
    var scoreText;

    // Game variables
    var leftScore = 0;
    var rightScore = 0;
    var ballVelocity = {x: 20, y: -8};

    // Controller variables
    var leftController;
    var leftControllerY = 0;
    var rightController;
    var rightControllerY = 0;

    // Entry point
    function init() {
        rc.initApp("rcjs-pong", function(res) {
            if(res.success) start();
        });
    }

    // Setup
    function start() {
        console.log("Starting rc.js PONG");

        // Set up Action.JS
        action.createStage(0, 0, 1200, 640, "#000000");
        leftPaddle = new action.Rectangle(25, 150, "#FFFFFF");
        leftPaddle.center = {x: 0, y: 75};
        leftPaddle.x = 0;
        leftPaddle.y = 320;
        rightPaddle = new action.Rectangle(25, 150, "#FFFFFF");
        rightPaddle.center = {x: 25, y: 75};
        rightPaddle.x = 1200;
        rightPaddle.y = 320;
        ball = new action.Rectangle(25, 25, "#FFFFFF");
        ball.center = {x: 12, y: 12};
        ball.x = 600;
        ball.y = 320;
        scoreText = new action.Text("32pt Consolas", "0 : 0", "#FFFFFF");
        scoreText.center = {x: 0, y: -32};
        scoreText.x = (action.stageWidth-scoreText.width)/2;
        scoreText.y = 5;
        action.display(leftPaddle);
        action.display(rightPaddle);
        action.display(ball);
        action.display(scoreText);
        action.fps = 32;
        action.addEventListener(action.events.ENTER_FRAME, onEnterFrame);

        // Set up rc listeners
        rc.controller(onConnect);
        rc.disconnect(onDisconnect);
        rc.listen(rc.events.TRACKPAD_MOVE, onTrackpadMove);
    }

    doc.addEventListener("DOMContentLoaded", init);

    // Game logic

    function resetBall() {
        ball.x = 600;
        ball.y = 320;
        scoreText.text = leftScore+" : "+rightScore;
        scoreText.x = (action.stageWidth-scoreText.width)/2;
    }

    // FRAME LOOP
    function onEnterFrame() {
        leftPaddle.y = leftControllerY;
        rightPaddle.y = rightControllerY;
        if(!(typeof(leftController) === "undefined" || typeof(rightController) === "undefined")) {
            ball.x += ballVelocity.x;
            ball.y += ballVelocity.y;
        }
        if(action.calc.collisionRect(ball, leftPaddle) || action.calc.collisionRect(ball, rightPaddle)) ballVelocity.x *= -1;
        if(ball.y <= 0 || ball.y >= action.stageHeight) {
            ballVelocity.y *= -1;
        }
        if(ball.x <= 0) {
            rightScore++;
            resetBall();
        }
        if(ball.x >= action.stageWidth) {
            leftScore++;
            resetBall();
        }
    }

    // CONTROLLER EVENT HANDLERS

    function onTrackpadMove(e) {
        if(e.controllerId == leftController) {
            leftControllerY = e.y*action.stageHeight;
        } else if(e.controllerId == rightController) {
            rightControllerY = e.y*action.stageHeight;
        }
    }

    function onConnect(id) {
        console.log("Connected: "+id);
        if(typeof(leftController) === "undefined") leftController = id;
        else if(typeof(rightController) === "undefined") rightController = id;
    }

    function onDisconnect(id) {
        console.log("Disconnected: "+id);
        if(id == leftController) leftController = undefined;
        else if(id == rightController) rightController = undefined;
    }

})(window, document);
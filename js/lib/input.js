"use strict";
var keyboard_1 = require('./input/keyboard');
var mouse_1 = require('./input/mouse');
var touch_1 = require('./input/touch');
/**
 * Manages all input events.
 */
var Input = (function () {
    function Input(canvas) {
        this.canvas = canvas;
        this.keyboard = new keyboard_1.Keyboard(canvas);
        this.mouse = new mouse_1.Mouse(canvas);
        this.touch = new touch_1.Touch(canvas);
    }
    //Keyboard
    Input.prototype.getKey = function (key) {
        return this.keyboard.getKey(key);
    };
    //Mouse
    Input.prototype.mousePosition = function () {
        return this.mouse.mousePosition;
    };
    Input.prototype.mouseClick = function () {
        return this.mouse.mouseClick;
    };
    //Touch
    Input.prototype.touches = function () {
        return this.touch.touches;
    };
    return Input;
}());
exports.Input = Input;

"use strict";
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Escape"] = 27] = "Escape";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["ArrowLeft"] = 37] = "ArrowLeft";
    KeyCode[KeyCode["ArrowUp"] = 38] = "ArrowUp";
    KeyCode[KeyCode["ArrowRight"] = 39] = "ArrowRight";
    KeyCode[KeyCode["ArrowDown"] = 40] = "ArrowDown";
})(KeyCode || (KeyCode = {}));
var Keyboard = (function () {
    function Keyboard(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.keys = {};
        this.canvas.addEventListener('keydown', function (e) { return _this.keyDownCallback(e); });
        this.canvas.addEventListener('keyup', function (e) { return _this.keyUpCallback(e); });
    }
    Keyboard.prototype.keyDownCallback = function (event) {
        this.keys[KeyCode[event.keyCode]] = true;
    };
    Keyboard.prototype.keyUpCallback = function (event) {
        this.keys[KeyCode[event.keyCode]] = false;
    };
    Keyboard.prototype.getKey = function (key) {
        return (this.keys[key] === undefined || !this.keys[key]) ? false : true;
    };
    return Keyboard;
}());
exports.Keyboard = Keyboard;

"use strict";
var scene_1 = require('./scene');
var input_1 = require('./input');
var clock_1 = require('./clock');
var viewport_1 = require('./viewport');
/**
 * Manages rendering objects on canvas.
 */
var Renderer = (function () {
    // Initzalize Renderer
    function Renderer() {
        this.canvas = document.createElement('canvas');
        this.canvas.tabIndex = 1;
        this.canvas.width = 640;
        this.canvas.height = 360;
        this.context = this.canvas.getContext('2d');
        //Initialize Singletons
        this.input = new input_1.Input(this.canvas);
        this.scene = new scene_1.Scene(new viewport_1.Viewport(), 800, 800);
        this.clock = new clock_1.Clock();
    }
    //Updates all the objects in the scene.
    Renderer.prototype.update = function () {
        var _this = this;
        var deltaTime = this.clock.deltaTime();
        this.scene.array.map(function (o) {
            if ('update' in o)
                o.update(_this.scene, _this.input, deltaTime);
        });
    };
    //Refreshes the screen with everything in the scene.
    Renderer.prototype.render = function () {
        var _this = this;
        this.context.save();
        //Viewport
        this.context.translate(-this.scene.viewport.position.x, -this.scene.viewport.position.y);
        this.context.clearRect(this.scene.viewport.position.x, this.scene.viewport.position.y, this.scene.viewport.width, this.scene.viewport.height);
        //Render Scene
        this.scene.array.map(function (o) {
            if ('render' in o)
                o.render(_this.context);
        });
        this.context.restore();
    };
    return Renderer;
}());
exports.Renderer = Renderer;

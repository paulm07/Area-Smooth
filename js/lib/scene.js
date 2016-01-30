"use strict";
var Scene = (function () {
    function Scene(viewport, width, height) {
        this.viewport = viewport;
        this.width = width;
        this.height = height;
        this.array = [];
    }
    //Destroys a given instance in the scene.
    Scene.prototype.destroy = function (gameObject) {
        this.array = this.array.filter(function (g) { return g !== gameObject; });
    };
    Scene.prototype.add = function (gameObject) {
        this.array.push(gameObject);
    };
    Scene.prototype.find = function (gameObject) {
        return this.array.filter(function (g) { return g.name === gameObject; })[0];
    };
    return Scene;
}());
exports.Scene = Scene;

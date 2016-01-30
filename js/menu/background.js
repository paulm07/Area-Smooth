"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject_1 = require('../lib/gameobject');
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        _super.call(this);
        this.backImage = new Image();
        this.backImage.src = 'sprites/stars.png';
    }
    Background.prototype.update = function (scene) {
        this.scene = scene;
    };
    Background.prototype.render = function (ctx) {
        ctx.strokeStyle = "#ffffff";
        ctx.strokeRect(0, 0, this.scene.width, this.scene.height);
        ctx.drawImage(this.backImage, 0, 0);
    };
    return Background;
}(gameobject_1.GameObject));
exports.Background = Background;

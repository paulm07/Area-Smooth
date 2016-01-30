"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject_1 = require('../lib/gameobject');
var easing_1 = require('../lib/math/easing');
var clock_1 = require('../lib/clock');
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.call(this);
        this.clock = new clock_1.Clock();
        this.alpha = 0;
        this.startgame = false;
        this.logo = new Image();
        this.logo.src = 'sprites/logo.png';
    }
    Menu.prototype.update = function (scene, input) {
        this.scene = scene;
        if (!this.startgame && input.mouseClick()) {
            this.startgame = true;
            this.clock = new clock_1.Clock();
        }
        // Fade in and Fade out
        if (this.startgame) {
            this.alpha = easing_1.Easing.easeOutExpo(1 - this.clock.getElapsedTime(), 0, 1, 1);
            if (this.alpha <= 0) {
                this.alpha = 0;
                scene.destroy(this);
            }
        }
        else {
            this.alpha = easing_1.Easing.easeOutExpo(this.clock.getElapsedTime(), 0, 1, 1);
        }
    };
    Menu.prototype.render = function (context) {
        var vx = this.scene.viewport.position.x + (this.scene.viewport.width / 2);
        var vy = this.scene.viewport.position.y + (this.scene.viewport.height / 2);
        context.save();
        context.globalAlpha = this.alpha;
        context.drawImage(this.logo, vx - (this.logo.width / 2), vy - (this.logo.height / 2));
        context.fillStyle = "#ffffff";
        context.font = "12px 'PixelFont'";
        context.textAlign = "center";
        context.fillText("Click to Start", vx, vy + 64, 128);
        // Background
        var my_gradient = context.createLinearGradient(0, 0, 0, 360);
        my_gradient.addColorStop(0, "rgba(0,0,0,0)");
        my_gradient.addColorStop(1, "rgba(0,0,0,0.1)");
        context.fillStyle = my_gradient;
        context.fillRect(this.scene.viewport.position.x, this.scene.viewport.position.y, this.scene.viewport.position.x + this.scene.viewport.width, this.scene.viewport.position.y + this.scene.viewport.height);
        context.restore();
    };
    return Menu;
}(gameobject_1.GameObject));
exports.Menu = Menu;

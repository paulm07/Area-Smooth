"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ship_1 = require('./ship');
var mathex_1 = require('../lib/math/mathex');
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(team, position) {
        if (team === void 0) { team = 0; }
        _super.call(this, team, position);
        this.team = team;
        this.position = position;
    }
    Player.prototype.update = function (scene, input, deltaTime) {
        _super.prototype.update.call(this, scene, input, deltaTime);
        //Keyboard
        var l = input.getKey('ArrowLeft');
        var r = input.getKey('ArrowRight');
        var u = input.getKey('ArrowUp');
        var d = input.getKey('ArrowDown');
        this.nextRotation = mathex_1.MathEx.keyboardAngle(u, l, d, r);
        this.moving = (u || l || d || r);
        this.shooting = input.getKey('Space');
        //Sync Viewport with Screen
        scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
        scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
        if (this.hp < 0) {
            this.lives -= 1;
            if (this.lives == 0) {
                scene.destroy(this);
            }
        }
    };
    return Player;
}(ship_1.Ship));
exports.Player = Player;

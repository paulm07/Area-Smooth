"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ship_1 = require('./ship');
var mathex_1 = require('../lib/math/mathex');
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(team, position) {
        if (team === void 0) { team = 0; }
        _super.call(this, team, position);
        this.team = team;
        this.position = position;
        this.timer = 0;
        this.hp = 10;
    }
    Enemy.prototype.update = function (scene, i, deltaTime) {
        var _this = this;
        _super.prototype.update.call(this, scene, i, deltaTime);
        this.timer -= deltaTime;
        this.moving = true;
        this.shooting = true;
        scene.array.map(function (o) {
            if (_this.isColliding(o)) {
                if ("team" in o)
                    if (o.team !== _this.team && typeof o != 'bullet') {
                        o.hp -= 10;
                    }
            }
        });
        if (this.timer < 0)
            this.changeTarget(scene);
        if (this.hp < 0) {
            scene.destroy(this);
        }
    };
    Enemy.prototype.changeTarget = function (scene) {
        this.timer = Math.random();
        var index = 1;
        var player = scene.array[index]; //scene.find('Player');
        this.nextRotation = mathex_1.MathEx.getAngleTwoPoints(this.position.x, this.position.y, player.position.x, player.position.y);
    };
    return Enemy;
}(ship_1.Ship));
exports.Enemy = Enemy;

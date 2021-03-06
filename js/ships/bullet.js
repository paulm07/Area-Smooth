"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject_1 = require('../lib/gameobject');
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(team, x, y, xdir, ydir) {
        _super.call(this);
        this.team = team;
        this.xdir = xdir;
        this.ydir = ydir;
        this.spd = 1280;
        this.hitbox = { width: 16, height: 16, x: -8, y: -8 };
        this.position.x = x;
        this.position.y = y;
        this.xprev = x;
        this.yprev = y;
        switch (this.team) {
            case 0:
                this.teamColor = "148,228,255";
                break;
            case 1:
            case 2:
                this.teamColor = "245,89,81";
                break;
            default:
                this.teamColor = "255,255,255";
        }
    }
    Bullet.prototype.update = function (scene, i, deltaTime) {
        var _this = this;
        // Movement
        this.xprev = this.position.x;
        this.yprev = this.position.y;
        this.position.x += this.xdir * this.spd * deltaTime;
        this.position.y += this.ydir * this.spd * deltaTime;
        // Out of scene bounds
        if (this.position.x < 0 || this.position.y < 0 || this.position.x > scene.width || this.position.y > scene.height) {
            scene.destroy(this);
        }
        // Check every object in the scene if it collided with this bullet.
        // if it has a team,
        // if that team isn't the same as this bullet,
        // destroy this bullet.
        scene.array.map(function (o) {
            if (_this.isColliding(o)) {
                if ("team" in o)
                    if (o.team !== _this.team) {
                        scene.destroy(_this);
                        o.hp--;
                    }
            }
        });
    };
    Bullet.prototype.render = function (context) {
        context.beginPath();
        var gradient = context.createLinearGradient(this.position.x, this.position.y, this.xprev, this.yprev);
        gradient.addColorStop(0.0, "rgba(" + this.teamColor + ",0)");
        gradient.addColorStop(0.2, "rgba(" + this.teamColor + ",1)");
        gradient.addColorStop(0.8, "rgba(" + this.teamColor + ",1)");
        gradient.addColorStop(1.0, "rgba(" + this.teamColor + ",0)");
        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.lineTo(this.xprev, this.yprev);
        context.lineTo(this.position.x, this.position.y);
        context.stroke();
    };
    return Bullet;
}(gameobject_1.GameObject));
exports.Bullet = Bullet;

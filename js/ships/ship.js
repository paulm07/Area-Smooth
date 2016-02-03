"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject_1 = require('../lib/gameobject');
var mathex_1 = require('../lib/math/mathex');
var bullet_1 = require('./bullet');
/**
 * The player ship.
 */
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(team, position) {
        if (team === void 0) { team = 0; }
        _super.call(this);
        this.team = team;
        //Ship Kinematics/Stats
        this.hp = 10;
        this.spd = 0;
        this.acc = 128;
        this.deacc = 160;
        this.spdMax = 256;
        this.handling = 10;
        this.lives = 3;
        this.prevDir = 1;
        //Ship Guns
        this.gunTimer = 0;
        this.gunReloadTime = .1;
        this.name = "Ship";
        this.team = team;
        //Transform
        this.position = position;
        //Sprites
        this.sprites = new Image();
        this.sprites.src = 'sprites/ship.png';
    }
    Ship.prototype.update = function (scene, input, deltaTime) {
        //Ship Controls
        this.gunTimer -= deltaTime;
        if (this.shooting) {
            if (this.gunTimer < 0) {
                this.gunTimer = this.gunReloadTime;
                var bullet = new bullet_1.Bullet(this.team, this.position.x, this.position.y, Math.cos(this.rotation * (Math.PI / 180)), -Math.sin(this.rotation * (Math.PI / 180)));
                scene.add(bullet);
            }
        }
        if (this.moving) {
            this.spd = mathex_1.MathEx.clamp(this.spd + (deltaTime * this.acc), 0, this.spdMax);
            this.rotation += mathex_1.MathEx.angleDifference(this.nextRotation, this.rotation) / (this.spd / this.handling);
            this.prevDir = this.velocity.x > 0 ? 1 : -1;
        }
        else {
            this.spd = mathex_1.MathEx.clamp(this.spd - (deltaTime * this.deacc), 0, this.spdMax);
        }
        // Apply Kinematics
        this.velocity.x = deltaTime * this.spd * Math.cos(this.rotation * (Math.PI / 180));
        this.velocity.y = deltaTime * this.spd * -Math.sin(this.rotation * (Math.PI / 180));
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //Keep in bounds
        this.position.x = mathex_1.MathEx.clamp(this.position.x, 0, scene.width);
        this.position.y = mathex_1.MathEx.clamp(this.position.y, 0, scene.height);
    };
    Ship.prototype.render = function (context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(-this.rotation * (Math.PI / 180));
        context.drawImage(this.sprites, 64 * this.team, 0, 64, 64, -32, -32, 64, 64);
        context.restore();
    };
    return Ship;
}(gameobject_1.GameObject));
exports.Ship = Ship;

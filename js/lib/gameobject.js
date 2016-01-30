"use strict";
/**
 * Holds core parameters needed to render/manage a game object.
 */
var GameObject = (function () {
    function GameObject() {
        this.name = "";
        // Collision Box
        this.hitbox = { width: 64, height: 64, x: -32, y: -32 };
        //Position of GameObject.
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        //An angle in degrees.
        this.rotation = 0;
        //Stats
        this.hp = 3;
    }
    GameObject.prototype.isColliding = function (target) {
        return !(((this.position.y + this.hitbox.y + this.hitbox.height) < (target.position.y + target.hitbox.y)) ||
            (this.position.y + this.hitbox.y > (target.position.y + target.hitbox.height + target.hitbox.y)) ||
            ((this.position.x + this.hitbox.x + this.hitbox.width) < target.position.x + target.hitbox.x) ||
            (this.position.x + this.hitbox.x > (target.position.x + target.hitbox.width + target.hitbox.y)));
    };
    return GameObject;
}());
exports.GameObject = GameObject;

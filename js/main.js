"use strict";
var renderer_1 = require('./lib/renderer');
var background_1 = require('./menu/background');
//import {Menu} from './menu/menu';
var player_1 = require('./ships/player');
var enemy_1 = require('./ships/enemy');
var renderer;
function start() {
    renderer = new renderer_1.Renderer();
    document.getElementById('game').appendChild(renderer.canvas);
}
// Testing for changes - Paul
function createScene() {
    renderer.scene.add(new background_1.Background());
    createPlayer();
    //Spawn 10 Enemies
    for (var i = 0; i < Math.floor((Math.random() * 7) + 3); i++)
        renderer.scene.add(new enemy_1.Enemy(1, {
            x: Math.floor(Math.random() * renderer.scene.width),
            y: Math.floor(Math.random() * renderer.scene.height)
        }));
}
function animate() {
    renderer.update();
    renderer.render();
    requestAnimationFrame(animate);
}
function createPlayer() {
    renderer.scene.add(new player_1.Player(0, {
        x: Math.floor(Math.random() * renderer.scene.width),
        y: Math.floor(Math.random() * renderer.scene.height)
    }));
}
start();
createScene();
animate();

import {Renderer} from './lib/renderer';
import {Background} from './menu/background';
//import {Menu} from './menu/menu';
import {Player} from './ships/player';
import {Enemy} from './ships/enemy';
var renderer;

function start() {
  renderer = new Renderer();
  document.getElementById('game').appendChild(renderer.canvas);
}

// Testing for changes - Paul

function createScene() {

  renderer.scene.add(new Background());

  createPlayer();

  //Spawn 10 Enemies
  for (var i = 0; i <  Math.floor((Math.random() * 7) + 3); i++)
  renderer.scene.add(new Enemy( 1, {
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
  renderer.scene.add(new Player(0, {
    x: Math.floor(Math.random() * renderer.scene.width),
    y: Math.floor(Math.random() * renderer.scene.height)
  }));
}

start();
createScene();
animate();

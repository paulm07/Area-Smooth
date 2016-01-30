![Screenshot](sprites/screenshot.gif)

# Canvas Bullet Hell Example

An example [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) game built with a custom engine influenced by [Phaser](https://github.com/photonstorm/phaser/), [Pixi](https://github.com/pixijs/pixi.js/), [Angular](http://angular.io/), [React](https://facebook.github.io/react/) and [Three](http://threejs.org/) libraries.

To try out draft features of JavaScript like Classes, Modules, and lambda (anonymous) functions, this project was written in **TypeScript**, which has all the next generation features of JavaScript built in.

That being said, this project depends on TypeScript, Node, and SystemJS (A [polyfill](https://en.wikipedia.org/wiki/Polyfill) for modules). To use these features, we need to process our files so they can work with older browsers.

## Getting Started

Download [Gitub Atom](https://atom.io/) (our text editor), [Node.js](https://nodejs.org/en/download/) (Our Server) and download the [TypeScript plugin](https://atom.io/packages/atom-typescript) by pressing `Ctrl + Shift + P` and typing in `Install Packages and Themes`, and search for `TypeScript` in the search bar.

In atom, **save** the `main.ts` file, this will trigger the plugin to compile your files down from ECMAScript 2015 to ECMAScript 5.

Make sure you have node installed, and then just `node server.js` and open up [`localhost:3000`](localhost:3000) on your browser!

## Quickstart

### Creating your own Objects

All you need to do is extend the GameObject class, and you're set!

```javascript
//Find the GameObject Class from the file in lib/gameobject.
import {GameObject} from './lib/gameobject';

//
class MyObject extends GameObject {
  constructor() {
    //Initialize your Object
  }
  update(scene, input, deltaTime) {
    //Manipulate the scene, access inputs, and get the change in time between each frame.
  }

  render(context) {
    //Draw whatever you need to with the render context.
  }
}
```

### Spawning

Anywhere you have a reference to a `scene`, all you need to do is call `scene.add(yourgameobject)`. For example, say you want to spawn a new bullet every time you press the space button.

```javascript
import {GameObject} from './lib/gameobject';

//
class MyObject extends GameObject {
  constructor() {

  }

update(scene, input, deltaTime) {
  if (input.getKey('Space'))
      scene.add(new Bullet(this.position.x, this.position.y, 1, 0)); //Shoots a bullet to the right.
  }
  render(context) {

  }
```

### Drawing

You can draw pretty much anything with a reference to the [canvas context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).

```javascript
import {GameObject} from './lib/gameobject';

//
class MyObject extends GameObject {
  public img;
  constructor() {
    this.img = new Image();
    this.img.src = 'folder/myimage.png';
  }

update(scene, input, deltaTime) {
  if (input.getKey('Space'))
      scene.add(new Bullet(this.position.x, this.position.y, 1, 0)); //Shoots a bullet to the right.
  }
  render(context) {
    context.drawImage(this.img, 0, 0, 64, 64, -32, -32, 64, 64);
  }
```

## Design decisions

1. Every GameObject is responsible for handling how it is rendered. This *can be dangerous since you're in control of the draw stack* so most libraries would add helper methods you can use that then reference a given context, however this gives you more control. Every GameObject is drawn in the order it has been added. In the future rendering can be influenced by the depth value of an object, then it's call order.

2. GameObjects have optional dependencies injected into them in the form of Scene and Input singletons. This would be better with `@decorators` to inject dependencies as you need them. Another approach could be signal based, for example a `GameObject.destroy()` abstract method, sends a signal up to the scene node to destroy its reference (Phaser does this), rather than the GameObject referencing the scene and calling `scene.destroy(this)`.

3. GameObjects could be made of components like [Angular](https://angular.io/docs/ts/latest/api/core/Component-decorator.html), [Unity](http://docs.unity3d.com/ScriptReference/Component.html) and [Unreal](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html), and these components would be responsible for rendering, movement, physics, etc. If they need to communicate between each other it would be easy to make references to each of them.

4. Input function names are modeled after the [Unity Game Engine](http://unity3d.com/), however the code is modeled after the [official javascript spec](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode), a polyfill of the new draft of `KeyboardEvent.code`. Keyboard Events are still very fragmented, so this `KeyboardEvent.code` tried to unite them across browsers. Keys are mapped to a JavaScript object. This could perform faster if you used another data structure (Set, Int32Array). This could also become full of garbage data after a while.

5. Vectors don't have operators. Depending on the glMatrix.js library or something similar would be better for the future.

6. Rendering is coupled to Canvas. In the future, this could be injectable, so you can choose your renderer, an abstact one, or one closer to the metal.

## Appendix

 * [Keith Clark's Space Defender Game](http://keithclark.co.uk/articles/js1k-2015-defender/) - A canvas side scrolling space fighting game reminiscent of old games like [pixelships](http://www.pixelships.com/).

 * [Andrea Venuta's Endless Wireframe Tunnel Run](http://veeenu.github.io/2014/04/07/js1k-2014-post-mortem.html) - A WebGL endless tunnel reminiscent of games like [Super Hexagon](http://superhexagon.com/).

 * [Jeff Thomas's Gravity Cloud](http://codepen.io/aecend/pen/rabgvq) - A little game where thousands of particles follow your mouse.

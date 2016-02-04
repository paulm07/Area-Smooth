import {Ship} from './ship';
import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';
import {Input} from '../lib/input';
import {MathEx} from '../lib/math/mathex';

export class Player extends Ship {
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    this.hp = 100;
  }


  update(scene: Scene, input: Input, deltaTime:number) {
    super.update(scene, input, deltaTime);

    //Keyboard
    var l = input.getKey('ArrowLeft');
    var r = input.getKey('ArrowRight');
    var u = input.getKey('ArrowUp');
    var d = input.getKey('ArrowDown');

    this.nextRotation = MathEx.keyboardAngle(u, l, d, r);

    this.moving = (u || l || d || r);
    this.shooting = input.getKey('Space');

    //Sync Viewport with Screen
    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);

    scene.array.map((o) => {
      if (this.isColliding(o)) {
        if ("team" in o)
          if (o.team !== this.team && typeof o != 'bullet' ) {
              o.hp -= 5;
              }
      }
    });



    if (this.hp < 0)
     {
      this.lives -=1;
      this.isDestory = true;
      this.position.x = Math.floor(Math.random() * scene.width);
      this.position.y = Math.floor(Math.random() * scene.height);
      this.hp = 100

      if(this.lives == 0)
      {
        scene.destroy(this);
      }
    }
  }



}

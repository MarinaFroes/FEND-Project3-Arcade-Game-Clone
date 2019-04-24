class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
}


class Enemy extends Entity {
  constructor() {
    super();
    this.sprite += 'enemy-bug.png';
  }

}

class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-pink-girl.png';
  }
  
  update() {
    
  }

  checkCollision() {

  }

  handleInput(direction) {
    
  }
}

const allEnemies = [];

const player = new Player();

document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
})
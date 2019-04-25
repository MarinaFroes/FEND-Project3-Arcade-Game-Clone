class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  update(dt) {
    this.isOutOfBoard = this.x > 5;
    this.isInTheWater = this.y === 0;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
}

class Enemy extends Character {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    super.update();
    this.randomPace = Math.floor(Math.random() * 6) * dt;
    this.isOutOfBoard ? this.x = -1 : this.x += this.randomPace;
  }
}

class Player extends Character {
  constructor() {
    super();
    this.sprite += 'char-pink-girl.png';
  }

  update(dt) {
    super.update();
    this.isInTheWater && alert('You win');
  }

  checkCollisions(enemy) {
    return (this.y === enemy.y) && (this.x >= enemy.x - 0.7) && (this.x <= enemy.x + 0.7);
  }

  handleInput(direction) {
    switch (direction) {
      case 'up':
        this.y > 0 ? this.y -= 1 : this.y;
        break;
      case 'down':
        this.y < 5 ? this.y += 1 : this.y;
        break;
      case 'left':
        this.x > 0 ? this.x -= 1 : this.x;
        break;
      case 'right':
        this.x < 4 ? this.x += 1 : this.x;
        break;
      default:
        break;
    }
  }
}

const allEnemies = [new Enemy(0,1), new Enemy(0,2), new Enemy(0,3)];

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

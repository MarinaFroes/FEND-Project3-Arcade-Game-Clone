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
    this.isMoving = false;
    this.isWinner = false;
    this.score = 0;
    this.life = 3;
  }

  update(dt) {
    super.update();
    if (this.isInTheWater && !this.isWinner && !this.isMoving) {
      this.isWinner = true;
      window.openModal = modal.open.bind(modal);
      window.openModal();
    }
  }

  checkCollisions() {
    allEnemies.forEach(enemy => {
      if (this.y === enemy.y && this.x >= enemy.x - 0.7 && this.x <= enemy.x + 0.7) {
        player.x = 2;
        player.y = 5;
        this.score = 0;
        console.log(`Ooops! ${this.score} is your score`);
        //TODO: Add score
        this.life > 0 ? this.life -= 1 : 'game over';
        console.log(this.life);
        //TODO: Add game over
      }
    })
  }

  checkScore() {
    allGems.forEach(gem => {
      if (this.y === gem.y && this.x === gem.x) {
        this.score += 1;
        console.log(this.score);
      }
    })
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
    this.isMoving = true;
  }
  
  render() {
    super.render();
    this.isMoving = false;
  }
}

class Modal {
  constructor(overlay) {
    this.overlay = overlay;
    const closeButton = overlay.querySelector('button')
    closeButton.addEventListener('click', this.close.bind(this));
    overlay.addEventListener('click', event => {
      if (event.srcElement.id === this.overlay.id) {
        this.close();
      }
    });
  }
  open() {
    this.overlay.classList.remove('is-hidden');
  }

  close() {
    this.overlay.classList.add('is-hidden');
  }
}

class Gem extends Character {
  constructor(color) {
    super();
    this.sprite += 'Gem ' + color +'.png';
    this.x = (Math.floor(Math.random() * 5));
    this.y = (Math.floor(Math.random() * 6));
  }
  
  update(dt) {
    super.update();
  }
  
}

const modal = new Modal(document.querySelector('.modal-overlay'));

const allEnemies = [
  new Enemy(0, 1),
  new Enemy(0, 2),
  new Enemy(0, 3),
  new Enemy(-3, 3),
  new Enemy(-3, 2),
  new Enemy(-3, 1)];

const player = new Player();

const allGems = [
  new Gem('Blue'),
  new Gem('Orange'),
  new Gem('Green')
];

document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
})

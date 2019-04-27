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
    if (this.isInTheWater && !this.isWinner && !this.isMoving && this.score === 3) {
      this.isWinner = true;
      window.openModal = modal.open.bind(modal);
      window.openModal();
    }
  }

  checkCollisions() {
    allEnemies.forEach(enemy => {
      if (this.y >= enemy.y - 0.3 && this.y <= enemy.y + 0.3 && this.x >= enemy.x - 0.7 && this.x <= enemy.x + 0.7) {
        player.x = 2;
        player.y = 5;
        this.life > 0 ? this.life -= 1 : console.log('game over');
        console.log(`You have ${this.life} lives`);
        const heart = document.querySelector('.fa-heart');
        heart.parentNode.removeChild(heart);
      }
    })
  }

  checkScore() {
    allGems.forEach(gem => {
      if (this.y === gem.y && this.x >= gem.x - 0.7 && this.x <= gem.x + 0.7) {
        this.score += 1;
        console.log(`Your score: ${this.score}`);
        gem.x = -1;
        gem.y = -1;
        const star = document.createElement('i');
        star.setAttribute('class', 'fas fa-star');
        document.getElementById('star').appendChild(star);
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
    this.x = (Math.floor(Math.random() * 5) + 0.15);
    this.y = (Math.floor(Math.random() * 6));
  }
  
  update(dt) {
    super.update();
  }
}

const modal = new Modal(document.querySelector('.modal-overlay'));

const allEnemies = [
  new Enemy(0, 0.7),
  new Enemy(0, 1.7),
  new Enemy(0, 2.7),
  // new Enemy(-3, 2.7),
  // new Enemy(-3, 1.7),
  // new Enemy(-3, 0.7)
];

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

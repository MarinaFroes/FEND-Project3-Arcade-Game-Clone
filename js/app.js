class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    
  }

  render() {
    AudioContext.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor() {
    this.sprite = 'images/char-pink-girl.png';
  }

  update(dt) {

  }

  render() {

  }

  handleInput(direction) {
    
  }
}

const allEnemies = [];

const player = {};

document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  Player.handleInput(allowedKeys[e.keyCode]);
})
class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }
  
  //Variables to check if the enemy is out of the board and if the player is in the water
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

  //Updates the position of the enemies with random pace
  update(dt) {
    super.update();
    this.randomPace = Math.floor(Math.random() * 5) * dt;
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
  
  //Updates the player and if all the conditions are met, invokes the modal open method
  //Updates isWinner variable to avoid infinite loop when the player meets winning conditions
  update(dt) {
    super.update();
    if (this.isInTheWater && !this.isWinner && !this.isMoving && this.score === 3) {
      this.isWinner = true;
      modal.open('win');
    }
  }
  
  //Changes the caracter based on the argument received
  changeChar(name) {
    this.sprite = 'images/char-' + name + '.png';
  }
  
  //Checks collisions between the player and each of the enemies
  //If there was a collision: resets the player position and loses heart
  //If the player loses all the hearts: it invokes lose modal
  checkCollisions() {
    allEnemies.forEach(enemy => {
      if (this.y >= enemy.y - 0.3 && this.y <= enemy.y + 0.3 && this.x >= enemy.x - 0.7 && this.x <= enemy.x + 0.7) {
        if (this.life > 1) {
          player.x = 2;
          player.y = 5;
          this.life -= 1;
          const heart = document.querySelector('.fa-heart');
          heart.parentNode.removeChild(heart);
        } else if (this.life === 1 && !this.isWinner){
          modal.open('lose');
        }
      }
    });
  }
  
  //Increments the score and adds a star each time the player gets a gem
  //When the player gets a gem, it is removed from the screen
  checkScore() {
    allGems.forEach(gem => {
      if (this.y === gem.y && this.x >= gem.x - 0.7 && this.x <= gem.x + 0.7) {
        this.score += 1;
        gem.x = -1;
        gem.y = -1;
        const star = document.createElement('i');
        star.setAttribute('class', 'icon fas fa-star');
        document.querySelector('.star-container').appendChild(star);
      } 
    })
  }
  
  //Makes the player move based on the keys pressed
  //Updates the isMoving variable to avoid winning the game before the player is rendered in the water
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
  
  //Reassigns the isMoving variable to false again to guarantee that the movement is over and allow the player to win the game if the conditions are met
  render() {
    super.render();
    this.isMoving = false;
  }
}

//Creates gems in a random position on the column but in a specific row
class Gem extends Character {
  constructor(color, y) {
    super();
    this.sprite += 'Gem ' + color + '.png';
    this.x = (Math.floor(Math.random() * 5) + 0.15);
    this.y = y;
  }
}

//Creates a modal to be shown when the player win ou lose the game
class Modal {
  constructor(overlay) {
    this.overlay = overlay;
  }

  open(winOrLose) {
    let modalText = document.querySelector('.modal-text');
    if (winOrLose === 'win') {
      modalText.innerText = 'You win :D';
      document.querySelector('.modal').classList.add('is-winner');
      document.querySelector('.princess').classList.add('jumping');
    } else {
      modalText.innerText = 'You lose :(';
      document.querySelector('.modal').classList.add('is-loser');
    }
    this.overlay.classList.remove('is-hidden');
  }
}

//Creates a modal
const modal = new Modal(document.querySelector('.modal-overlay'));

//Creates an array with all the enemies
const allEnemies = [
  new Enemy(0, 0.7),
  new Enemy(0, 1.7),
  new Enemy(0, 2.7),
  new Enemy(-3, 2.7),
  new Enemy(-3, 1.7),
  new Enemy(-3, 0.7)
];

//Creates the player
let player = new Player();

//Adds 3 different gems distributed on the road
const allGems = [
  new Gem('Blue', 1),
  new Gem('Orange', 2),
  new Gem('Green', 3)
];

//Allows the user to change the player by clicking on the images
document.querySelector('.char-menu').addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    player.changeChar(e.target.id);
  }
});

//Arrow keys for right handed people: 37, 38, 39, 40
//WASD keys for left handed people: 87, 65, 68, 83
document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'left',
    87: 'up',
    68: 'right',
    83: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

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
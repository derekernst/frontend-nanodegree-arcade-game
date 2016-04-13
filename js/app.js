// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    return this.x += (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    player.speed *= dt;

    // TO DO:
    // don't update if at the edge of the board
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left": this.x -= 101;
        break;

        case "up": this.y -= 101;
        break;

        case "right": this.x += 101;
        break;

        case "down": this.y += 101;
        break;
    }
    player.update();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
var enemy = new Enemy();
window.setInterval(function() {
    var randomNum = Math.random() * 100;
    if (randomNum <= 33) {
        enemy = new Enemy(-100, 62, ((Math.random() + 0.5) * 300), 85, 60);
    } else if (randomNum <= 66 && randomNum > 33) {
        enemy = new Enemy(-100, 145, ((Math.random() + 0.5) * 300), 85, 60);
    } else if (randomNum > 66) {
        enemy = new Enemy(-100, 228, ((Math.random() + 0.5) * 300), 85, 60);
    }
    allEnemies.push(enemy);
    return allEnemies;
}, 800);


// Place the player object in a variable called player
var player = new Player(454.5,,2000);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

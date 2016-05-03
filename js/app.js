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
    //Multiply by dt to keep the animations consistent for all users
    return this.x += (this.speed * dt);
};

// Draw the enemy on the screen
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
    this.speed *= dt;

    // this.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 404.5;
    this.y = 560;
    this.speed = 2000;
};

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            if (this.x > 51) {
                this.x -= 101
            };
            break;

        case "up":
            if (this.y > 62) {
                this.y -= 83
            } else {
                player.reset()
            };
            break;

        case "right":
            if (this.x < 757) {
                this.x += 101
            };
            break;

        case "down":
            if (this.y < 560) {
                this.y += 83
            };
            break;
    }
    player.update();
};

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (this.x <= enemy.x + 44 &&
            this.x + 44 >= enemy.x &&
            this.y <= enemy.y + 44 &&
            44 + this.y >= enemy.y) {
            console.log("collision");
            this.reset();
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy = new Enemy();

//Create enemies at a set interval
window.setInterval(function() {
    // Starting postion is off the canvas
    var startX = -100;
    // Add a factor of 0.4 so the enemies aren't too slow
    var speed = Math.random() + 0.4;
    var randomNum = Math.random() * 100;
    // You could clean this up but essentially gets a number between 0-100 and assigns
    // a row based on how many rows of stone there are
    if (randomNum <= 20) {
        enemy = new Enemy(startX, 62, (speed * 400));
    } else if (randomNum <= 40) {
        enemy = new Enemy(startX, 145, (speed * 400));
    } else if (randomNum <= 60) {
        enemy = new Enemy(startX, 228, (speed * 400));
    } else if (randomNum <= 80) {
        enemy = new Enemy(startX, 311, (speed * 400));
    } else if (randomNum > 80) {
        enemy = new Enemy(startX, 394, (speed * 400));
    }
    //Add the new Enemy to the allEnemies array
    allEnemies.push(enemy);
    return allEnemies;

    //Close the function and set the interval for performing the enemy creation (miliseconds)
}, 450);

// Place the player object in a variable called player
var player = new Player(404.5, 560, 2000);

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
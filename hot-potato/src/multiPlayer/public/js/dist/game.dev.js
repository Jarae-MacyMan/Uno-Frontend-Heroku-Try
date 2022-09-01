"use strict";

//let timedEvent2;
var potatoVisibilityTimerDone = false;
var touchPo = false;
var playerSpeed = 150;
var showPotatoText = false;
var potatoText;
var potaotTimedEvent;
var text;
var timedEvent;
var touchSandwich = false;
var sandwichText;
var sandwichTimedEvent;
var showSandwichText = false;
var touchJuice = false;
var gotJuice = false;
var juiceText;
var juiceTimedEvent;
var showJuiceText = false;
var pausedText;
var playerPaused = false;
var potatoMove = false;
var showPausedText = false;
var explosions;
var c = 10;
var s = 10;
var p = 15;
var j = 10;
var potaotStartTimedEvent;
var start = 3; //let potatoVisibility = 0
//let potatoVisibilityTimerDone = false

var potatoVisibleTimedEvent;
var hasJuice = false; //no stack

var hasSandwich = false;
var hasPotato = false; //movement after juice

var jc = false;
var juiceCollider;
var player1Score;
var player2Score;
var player3Score;
var player4Score;
var player1WinText;
var player2WinText;
var player3WinText;
var player4WinText; //let redScoreText

var game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1422,
  height: 800,
  physics: {
    "default": 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
});

function preload() {
  this.load.image('sky', 'assets/city3.png');
  this.load.image('ship', 'assets/spaceShips_001.png');
  this.load.image('otherPlayer', 'assets/enemyBlack5.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('star2', 'assets/star.png');
  this.load.image('potato', 'assets/potato.png');
  this.load.image('sandwich', 'assets/sandwich.png');
  this.load.image('juice', 'assets/juice.png');
  this.load.image('circle', 'assets/circle1.png');
  this.load.spritesheet('kaboom', 'assets/explode.png', {
    frameWidth: 128,
    frameHeight: 128
  });
}

function create() {
  //this.add.image(700, 300, 'sky').setScale(2);
  var self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group(); //console.log(this.otherPlayers)

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });
  this.cursors = this.input.keyboard.createCursorKeys();
  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });
  this.socket.on('starLocation', function (starLocation) {
    if (self.star) self.star.destroy();
    self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
    self.physics.add.overlap(self.ship, self.star, function () {
      this.socket.emit('starCollected');
    }, null, self);
  });
  this.socket.on('starTwoLocation', function (starTwoLocation) {
    if (self.starTwo) self.starTwo.destroy();
    self.starTwo = self.physics.add.image(starTwoLocation.x, starTwoLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starTwo, function () {
      console.log(2);
      this.socket.emit('starTwoCollected');
    }, null, self);
  });
  this.socket.on('starThreeLocation', function (starThreeLocation) {
    if (self.starThree) self.starThree.destroy();
    self.starThree = self.physics.add.image(starThreeLocation.x, starThreeLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starThree, function () {
      console.log(3);
      this.socket.emit('starThreeCollected');
    }, null, self);
  });
  this.socket.on('starFourLocation', function (starFourLocation) {
    if (self.starFour) self.starFour.destroy();
    self.starFour = self.physics.add.image(starFourLocation.x, starFourLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starFour, function () {
      console.log(4);
      this.socket.emit('starFourCollected');
    }, null, self);
  });
  this.socket.on('starFiveLocation', function (starFiveLocation) {
    if (self.starFive) self.starFive.destroy();
    self.starFive = self.physics.add.image(starFiveLocation.x, starFiveLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starFive, function () {
      console.log(5);
      this.socket.emit('starFiveCollected');
    }, null, self);
  });
  this.socket.on('starSixLocation', function (starSixLocation) {
    if (self.starSix) self.starSix.destroy();
    self.starSix = self.physics.add.image(starSixLocation.x, starSixLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starSix, function () {
      console.log(6);
      this.socket.emit('starSixCollected');
    }, null, self);
  });
  this.socket.on('starSevenLocation', function (starSevenLocation) {
    if (self.starSeven) self.starSeven.destroy();
    self.starSeven = self.physics.add.image(starSevenLocation.x, starSevenLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starSeven, function () {
      console.log(7);
      this.socket.emit('starSevenCollected');
    }, null, self);
  });
  this.socket.on('starEightLocation', function (starEightLocation) {
    if (self.starEight) self.starEight.destroy();
    self.starEight = self.physics.add.image(starEightLocation.x, starEightLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starEight, function () {
      console.log(8);
      this.socket.emit('starEightCollected');
    }, null, self);
  });
  this.socket.on('starNineLocation', function (starNineLocation) {
    if (self.starNine) self.starNine.destroy();
    self.starNine = self.physics.add.image(starNineLocation.x, starNineLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starNine, function () {
      console.log(9);
      this.socket.emit('starNineCollected');
    }, null, self);
  });
  this.socket.on('starTenLocation', function (starTenLocation) {
    if (self.starTen) self.starTen.destroy();
    self.starTen = self.physics.add.image(starTenLocation.x, starTenLocation.y, 'star2');
    self.physics.add.overlap(self.ship, self.starTen, function () {
      console.log(10);
      this.socket.emit('starTenCollected');
    }, null, self);
  });
  this.player1WinText = this.add.text(700, 400, {
    fontSize: '100px',
    fill: '#0000FF'
  });
  this.player1WinText.setVisible(false);
  this.player2WinText = this.add.text(700, 400, {
    fontSize: '100px',
    fill: '#FF0000'
  });
  this.player2WinText.setVisible(false);
  this.player3WinText = this.add.text(700, 400, {
    fontSize: '100px',
    fill: '#FFE400'
  });
  this.player3WinText.setVisible(false);
  this.player4WinText = this.add.text(700, 400, {
    fontSize: '100px',
    fill: '#FFE400'
  });
  this.player4WinText.setVisible(false);
  this.player1ScoreText = this.add.text(16, 16, 'Player:', {
    fontSize: '32px',
    fill: '#0000FF'
  });
  this.player2ScoreText = this.add.text(250, 16, 'Player:', {
    fontSize: '32px',
    fill: '#FF0000'
  });
  this.player3ScoreText = this.add.text(450, 16, 'Player:', {
    fontSize: '32px',
    fill: '#FFE400'
  });
  this.player4ScoreText = this.add.text(700, 16, 'Player:', {
    fontSize: '32px',
    fill: '#00FF51'
  });
  this.socket.on('playerScoreUpdate', function (arg) {
    var theScore = arg.theScore,
        playerNum = arg.playerNum;

    if (playerNum == 1) {
      self.player1ScoreText.setText('Player' + playerNum + ':' + theScore);
      player1Score = theScore;
      stopGame(self);
    } else if (playerNum == 2) {
      self.player2ScoreText.setText('Player' + playerNum + ': ' + theScore);
      player2Score = theScore;
      stopGame(self);
    } else if (playerNum == 3) {
      self.player3ScoreText.setText('Player' + playerNum + ': ' + theScore);
      player3Score = theScore;
      stopGame(self);
    } else if (playerNum == 4) {
      self.player4ScoreText.setText('Player' + playerNum + ': ' + theScore);
      player4Score = theScore;
      stopGame(self);
    }
  });
  this.socket.on('potatoLocation', function (potatoLocation) {
    if (self.potato) self.potato.destroy();
    self.potato = self.physics.add.image(potatoLocation.x, potatoLocation.y, 'potato').setScale(.2);
    self.physics.add.overlap(self.ship, self.potato, function () {
      this.socket.emit('potatoCollected');

      if (gotJuice == false) {
        jc = true; //adds text and initiats timer 

        if (hasPotato == false) {
          touchPo = true;
          potatoMove = false;
          potatoText = this.add.text(1100, 20);
          potaotTimedEvent = this.time.addEvent({
            delay: 500,
            callback: function callback() {
              return onEvent(self);
            },
            callbackScope: this,
            loop: true
          });
          pausedText = this.add.text(1100, 40);
          potatoVisibleTimedEvent = this.time.addEvent({
            delay: 500,
            callback: function callback() {
              return onVisible(self);
            },
            callbackScope: this,
            loop: true
          });
        }
      }
    }, null, self);
  });
  potaotStartTimedEvent = this.time.addEvent({
    delay: 3000,
    callback: function callback() {
      return onStart(self);
    },
    callbackScope: this,
    loop: true
  });
  this.socket.on('sandwichLocation', function (sandwichLocation) {
    if (self.sandwich) self.sandwich.destroy();
    self.sandwich = self.physics.add.image(sandwichLocation.x, sandwichLocation.y, 'sandwich').setScale(.1);
    self.physics.add.collider(self.ship, self.sandwich, function () {
      self.sandwich.setVisible(false);
      this.socket.emit('sandwichCollected');
      touchSandwich = true; //hasSandwich = true 
      //self.sandwich.setVisible(false)

      if (hasSandwich == false) {
        sandwichText = this.add.text(1100, 60);
        sandwichTimedEvent = this.time.addEvent({
          delay: 500,
          callback: function callback() {
            return onSandwich(self);
          },
          callbackScope: this,
          loop: true
        });
      }
    }, null, self);
  });
  this.socket.on('juiceLocation', function (juiceLocation) {
    if (self.juice) self.juice.destroy();
    self.juice = self.physics.add.image(juiceLocation.x, juiceLocation.y, 'juice').setScale(.25);
    self.physics.add.overlap(self.ship, self.juice, function () {
      this.socket.emit('juiceCollected');
      touchJuice = true;
      gotJuice = true;
      self.juice.setVisible(false);

      if (hasJuice == false) {
        juiceText = this.add.text(1100, 80);
        juiceTimedEvent = this.time.addEvent({
          delay: 500,
          callback: function callback() {
            return onJuice(self);
          },
          callbackScope: this,
          loop: true
        });
      }
    }, null, self);
  });
  this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('kaboom', {
      start: 0,
      end: 15
    }),
    frameRate: 16,
    repeat: 0,
    hideOnComplete: true
  });
  explosions = this.add.group({
    defaultKey: 'kaboom',
    maxSize: 30
  });
} /////////////////////////////////////////


function update() {
  if (this.ship) {
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-playerSpeed);
      console.log(playerSpeed); //this.ship.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(playerSpeed); //this.ship.setAngularVelocity(150);
    } else if (this.cursors.down.isDown) {
      this.ship.setVelocityY(playerSpeed);
    } else if (this.cursors.up.isDown) {
      this.ship.setVelocityY(-playerSpeed);
    } else {
      this.ship.setVelocityX(0);
      this.ship.setVelocityY(0);
    } // if (this.cursors.up.isDown) {
    //   this.physics.velocityFromRotation(this.ship.rotation + 1.5, playerSpeed, this.ship.body.acceleration);
    // } else {
    //   this.ship.setAcceleration(0);
    // }


    this.ship.body.velocity.normalize().scale(150);
    this.physics.world.wrap(this.ship, 5);
    this.physics.world.wrap(this.potato, 5); // emit player movement

    var x = this.ship.x;
    var y = this.ship.y;
    var r = this.ship.rotation;

    if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
      this.socket.emit('playerMovement', {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation
      });
    } // save old position data


    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation
    };

    if (potatoMove == true && hasPotato == false) {
      var px = this.potato.x;
      var py = this.potato.y;
      var pr = this.potato.rotation;
      var dx = this.ship.x - px;
      var dy = this.ship.y - py;

      if (Math.abs(dx) < 1422 && Math.abs(dx) < 800) {
        this.potato.setVelocityX(Math.sign(dx) * 150);
        this.potato.setVelocityY(Math.sign(dy) * 150);
      }

      this.potato.body.velocity.normalize().scale(150);
    } // if (this.potato.oldPosition && (px !== this.potato.oldPosition.x || py !== this.potato.oldPosition.y)) {
    //   this.socket.emit('potatoLocation', { x: this.potato.x, y: this.potato.y });
    // }
    // save old position data
    // this.potato.oldPosition = {
    //   x: this.potato.x,
    //   y: this.potato.y,
    //   rotation: this.potato.rotation
    // };

  } //console.log(this.potato.x)
  // let potatoY = this.potato.x
  // let potatoX = this.potato.y
  // let rotation = Phaser.Math.Angle.Between(potatoX, potatoY, x, y)
  // this.setRotation(rotation)
  //this.enemyFollows () 
  //console.log(potatoVisibleTimedEvent.getProgress().toString().substr(0, 4));
  //updtes the boerd to wait unitl a person touches the potato to start timer 


  if (touchPo == true) {
    if (showPotatoText == false) {
      potatoText.setText('PAUSED IN ' + c);
    } else if (showPotatoText == true) {
      potatoText.destroy();
      showPotatoText = false;
    }
  }

  if (touchSandwich == true) {
    if (showSandwichText == false) {
      sandwichText.setText('SPEED BOOST ' + s);
    } else if (showSandwichText == true) {
      sandwichText.destroy();
      showSandwichText = false;
    }
  }

  if (touchJuice == true) {
    if (showJuiceText == false) {
      juiceText.setText('YOU ARE SHEILDED ' + j);
    } else if (showJuiceText == true) {
      juiceText.destroy();
      showJuiceText = false;
    }
  }

  if (playerPaused == true) {
    if (showPausedText == false) {
      pausedText.setText('PAUSED FOR  ' + p);
    } else if (showPausedText == true) {
      pausedText.destroy();
      showPausedText = false;
    }
  }
} // function enemyFollows (self) {
//   this.physics.moveToObject(self.potato, self.ship, 100);
// }


function onStart() {
  potatoMove = true;
  start--; // if(start == 0){
  //   potaotStartTimedEvent.remove(false);
  //   potatoMove = true
  // }
}

function onVisible(self) {
  p--;
  potatoMove = false;
  hasPotato = true;

  if (p == 5) {
    playerPaused = true;
    self.explosion = explosions.get().setActive(true);
    self.explosion.setOrigin(0.5, 0.5);
    self.explosion.x = self.ship.x;
    self.explosion.y = self.ship.y;
    self.explosion.play('explode');
    self.physics.pause();
  }

  if (p <= 5 && p % 2 == 1) {
    self.ship.setVisible(false);
  } else {
    self.ship.setVisible(true);
  }

  if (p === 0) {
    potatoVisibleTimedEvent.remove(false);
    self.potato.setVisible(true); //potatoVisibilityTimerDone = true

    self.physics.resume();
    showPausedText = true;
    p = 15;
    potatoMove = true;
    hasPotato = false;
  }
}

function onEvent(self) {
  c--;

  if (c === 0) {
    potaotTimedEvent.remove(false);
    showPotatoText = true;
    c = 10;
  }
}

function onSandwich(self) {
  s--;
  playerSpeed = 900;
  hasSandwich = true;
  hasSandwich = true;

  if (s === 0) {
    sandwichTimedEvent.remove(false);
    showSandwichText = true; // self.sandwich.setVisible(true)

    playerSpeed = 150;
    s = 10;
    self.sandwich.setVisible(true);
    hasSandwich = false;
  }
}

function onJuice(self) {
  hasPotato = false;
  j--; //hasJuice = true

  if (jc == true) {
    potaotTimedEvent.remove(false);
    potatoVisibleTimedEvent.remove(false);
    showPotatoText = true;
    showPausedText = true;
  }

  potatoMove = false;
  c = 10;
  p = 15;
  self.physics.resume();

  if (j == 0) {
    juiceTimedEvent.remove(false);
    showJuiceText = true;
    self.physics.resume();
    j = 10;
    gotJuice = false;
    touchJuice == false;
    hasJuice = false;
    potatoMove = true;
    jc = false;
  }
}

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

  if (playerInfo.playerNum == 1) {
    self.ship.setTint(0x0000ff);
  } else if (playerInfo.playerNum == 2) {
    self.ship.setTint(0xff0000);
  } else if (playerInfo.playerNum == 3) {
    self.ship.setTint(0xffe400);
  } else if (playerInfo.playerNum == 4) {
    self.ship.setTint(0x00ff51);
  } // } else if(playerInfo.team === 'green'){
  //   self.ship.setTint(0xff0000);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }


  self.ship.setDrag(1);
  self.ship.setAngularDrag(1);
  self.ship.setMaxVelocity(200);
}

function stopGame(self) {
  if (player1Score == 50) {
    self.physics.pause();
    self.player1WinText.setText('Player 1 wins');
    self.player1WinText.setVisible(true);
  } else if (player2Score == 50) {
    self.physics.pause();
    self.player2WinText.setText('Player 2 wins');
    self.player2WinText.setVisible(true);
  } else if (player3Score == 50) {
    self.physics.pause();
    self.player3WinText.setText('Player 3 wins');
    self.player3WinText.setVisible(true);
  } else if (player4Score == 50) {
    self.physics.pause();
    self.player4WinText.setText('Player 4 wins');
    self.player4WinText.setVisible(true);
  }
}

function addOtherPlayers(self, playerInfo) {
  var otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

  if (playerInfo.playerNum == 1) {
    otherPlayer.setTint(0x0000ff);
  } else if (playerInfo.playerNum == 2) {
    otherPlayer.setTint(0xff0000);
  } else if (playerInfo.playerNum == 3) {
    self.ship.setTint(0xffe400);
  } else if (playerInfo.playerNum == 4) {
    self.ship.setTint(0x00ff51);
  }

  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
} //make platforms 
//more stars 
// make power up invisible acter collection 
//no stacking
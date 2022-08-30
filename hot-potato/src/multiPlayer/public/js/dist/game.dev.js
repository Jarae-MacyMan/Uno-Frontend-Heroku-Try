"use strict";

var config = {
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
}; //let timedEvent2;

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
var j = 10;
var p = 15;
var potaotStartTimedEvent;
var start = 3; //let potatoVisibility = 0
//let potatoVisibilityTimerDone = false

var potatoVisibleTimedEvent; //let redScoreText

var game = new Phaser.Game(config);

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
      this.socket.emit('starTwoCollected');
    }, null, self);
  }); // this.socket.on('star3Location', function (star3Location) {
  //   if (self.star3) self.star3.destroy();
  //   self.star3 = self.physics.add.image(star3Location.x, star3Location.y, 'star');
  //   self.physics.add.overlap(self.ship, self.star3, function () {
  //     this.socket.emit('star3Collected');
  //   }, null, self);
  // });

  this.blueScoreText = this.add.text(16, 16, 'Blue:', {
    fontSize: '32px',
    fill: '#0000FF'
  });
  this.redScoreText = this.add.text(550, 16, 'Red:', {
    fontSize: '32px',
    fill: '#FF0000'
  });
  this.socket.on('scoreUpdate', function (scores) {
    self.blueScoreText.setText('Blue: ' + scores.blue);
    self.redScoreText.setText('Red: ' + scores.red);
  });
  this.socket.on('potatoLocation', function (potatoLocation) {
    if (self.potato) self.potato.destroy();
    self.potato = self.physics.add.image(potatoLocation.x, potatoLocation.y, 'potato').setScale(.2); //if(potatoVisibilityTimerDone == false){
    //self.potato.setVisible(false)
    //self.potato.setVelocityX(0);
    //self.potato.body.stop()

    self.physics.add.overlap(self.ship, self.potato, function () {
      this.socket.emit('potatoCollected');

      if (gotJuice == false) {
        touchPo = true;
        potatoMove = false; //adds text and initiats timer 

        potatoText = this.add.text(1100, 20);
        potaotTimedEvent = this.time.addEvent({
          delay: 500,
          callback: function callback() {
            return onEvent(self);
          },
          callbackScope: this,
          loop: true
        });
        pausedText = this.add.text(1100, 40); //self.showPausedTextsetVisible(false)

        potatoVisibleTimedEvent = this.time.addEvent({
          delay: 500,
          callback: function callback() {
            return onVisible(self);
          },
          callbackScope: this,
          loop: true
        });
      }
    }, null, self); //}
    //}
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
      this.socket.emit('sandwichCollected');
      touchSandwich = true;
      sandwichText = this.add.text(1100, 60);
      sandwichTimedEvent = this.time.addEvent({
        delay: 500,
        callback: function callback() {
          return onSandwich(self);
        },
        callbackScope: this,
        loop: true
      }); //console.log()  
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
      juiceText = this.add.text(1100, 80);
      juiceTimedEvent = this.time.addEvent({
        delay: 500,
        callback: function callback() {
          return onJuice(self);
        },
        callbackScope: this,
        loop: true
      });
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
  }); // stars = this.physics.add.group({
  //   key: 'sandwich',
  //   repeat: 20,
  //   setXY: { x: 12, y: 0, stepX: 70 }
  // });
  // if(self.ship){
  // console.log(self.ship)
  // }
  // console.log(self.otherPlayers)
}

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

    if (potatoMove == true) {
      var px = this.potato.x;
      var py = this.potato.y;
      var pr = this.potato.rotation;
      var dx = this.ship.x - px;
      var dy = this.ship.y - py;

      if (Math.abs(dx) < 1422 && Math.abs(dx) < 800) {
        this.potato.setVelocityX(Math.sign(dx) * 150);
        this.potato.setVelocityY(Math.sign(dy) * 150);
      }
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
  } //sandwichText.setText('Event.progress: ' + sandwichTimedEvent.getProgress().toString().substr(0, 4));
  //console.log(text)
  // var progress = timedEvent.getProgress();
  // text.setText([
  //   //'Click to restart the Timer',
  //   'Event.progress: ' + progress.toString().substr(0, 4)
  // ]);
  //console.log(progress += 1)

} // function enemyFollows (self) {
//   this.physics.moveToObject(self.potato, self.ship, 100);
// }


function onStart() {
  potatoMove = true;
  start--;
  console.log(start); // if(start == 0){
  //   potaotStartTimedEvent.remove(false);
  //   potatoMove = true
  // }
}

function onVisible(self) {
  p--;
  potatoMove = false;

  if (p == 5) {
    playerPaused = true;
    self.explosion = explosions.get().setActive(true);
    self.explosion.setOrigin(0.5, 0.5);
    self.explosion.x = self.ship.x;
    self.explosion.y = self.ship.y;
    self.explosion.play('explode');
    self.physics.pause();
  }

  if (p === 0) {
    potatoVisibleTimedEvent.remove(false);
    self.potato.setVisible(true); //potatoVisibilityTimerDone = true

    self.physics.resume();
    showPausedText = true;
    p = 15;
    potatoMove = true; //self.ship.body.stop()
    //self.ship.setVelocityY(0);
    //potatoVisibilityTimerDone == true
  }
}

function onEvent(self) {
  //image.rotation += 0.04;
  //potatoVisibility++
  c--;
  potatoMove = false; //self.potato.setVisible(false)
  //console.log(c)

  if (c === 0) {
    potaotTimedEvent.remove(false);
    showPotatoText = true;
    potatoMove = true; //self.physics.pause();
    //self.potato.setVisible(true)
    //self.physics.potato.pause()

    c = 10; //self.socket.emit('sandwichCollected');
  }
}

function onSandwich(self) {
  s--; //console.log(s)

  playerSpeed = 900;
  self.sandwich.setVisible(false); // if(s % 2 == 1){ 
  //   self.ship.setTint(0xE0FF00);
  // } else {
  //   self.ship.setTint(0x0000ff);
  // }

  if (s === 0) {
    sandwichTimedEvent.remove(false);
    showSandwichText = true; // self.sandwich.setVisible(true)

    playerSpeed = 150;
    s = 10; //self.socket.emit('sandwichCollected');
    //self.socket.emit('sandwichCollected');
  }
} //if (touchJuice = false ){


function onJuice(self) {
  //image.rotation += 0.04;
  //potatoMove = false
  j--;
  potaotTimedEvent.remove(false);
  potatoVisibleTimedEvent.remove(false);
  showPotatoText = true;
  showPausedText = true; //potatoMove = true

  c = 10;
  p = 15;
  self.physics.resume();

  if (j == 0) {
    juiceTimedEvent.remove(false); //self.ship.setTint(0xff0000);

    showJuiceText = true;
    self.physics.resume(); //gotJuice = false

    potatoMove = true; //self.physics.pause();

    j = 10; //self.socket.emit('sandwichCollected');

    gotJuice = false;
    touchJuice == false;
  }
} //}


function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

  if (playerInfo.team === 'blue') {
    self.ship.setTint(0x0000ff);
    console.log(self.ship);
  } else if (playerInfo.team === 'red') {
    self.ship.setTint(0xff0000);
    console.log(self.ship);
  } // } else if(playerInfo.team === 'green'){
  //   self.ship.setTint(0xff0000);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }


  self.ship.setDrag(1);
  self.ship.setAngularDrag(1);
  self.ship.setMaxVelocity(200);
}

function addOtherPlayers(self, playerInfo) {
  var otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
  } else if (playerInfo.team === 'red') {
    otherPlayer.setTint(0xff0000);
  } // } else if(playerInfo.team === 'green'){
  //   self.ship.setTint(0xff0000);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }


  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
} // function collide (self, playerInfo){
//   if(self){
//   }
// }
var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1422,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};

let touchPo = false
let touchSandwich = false 

let playerSpeed = 150
let getPo = true 

let text;
let timedEvent;

let sandwichText;
let sandwichTimedEvent;
let showSandwichText = false 


var c = 0;
var s = 0

//let redScoreText
var game = new Phaser.Game(config);
function preload() {
  this.load.image('sky', 'assets/city3.png');

  this.load.image('ship', 'assets/spaceShips_001.png');
  this.load.image('otherPlayer', 'assets/enemyBlack5.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('potato', 'assets/potato.png');
  this.load.image('sandwich', 'assets/sandwich.png');
  this.load.image('juice', 'assets/juice.png');
  this.load.image('circle', 'assets/circle1.png');



}
function create() {
  //this.add.image(700, 300, 'sky').setScale(2);


  var self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();
  //console.log(this.otherPlayers)
  this.socket.on('currentPlayers', function (players ) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
        //console.log(playerInfo)
      } else {
        addOtherPlayers(self, players[id]);
        //console.log(playerInfo)
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
    // stars = this.physics.add.group({
    //   key: 'star',
    //   repeat: 10,
    //   setXY: { x: starLocation.x, y: starLocation.y, stepX: 70 }
    // });
      if (self.star) self.star.destroy();
      self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
      self.physics.add.overlap(self.ship, self.star, function () {
        this.socket.emit('starCollected');
      }, null, self);
      // self.physics.add.overlap(self.ship, stars, function () {
      //   this.socket.emit('starCollected');
      // }, null, self);
    });

  this.blueScoreText = this.add.text(16, 16, 'Blue:', { fontSize: '32px', fill: '#0000FF' });
  this.redScoreText = this.add.text(550, 16, 'Red:', { fontSize: '32px', fill: '#FF0000' });
  this.greenScoreText = this.add.text(850, 16, 'Green: 0', { fontSize: '32px', fill: '#22e81c' });
  this.yellowScoreText = this.add.text(1150, 16, 'Yellow: 0', { fontSize: '32px', fill: '#fbe103' });

  
// this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
// this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });
  
  this.socket.on('scoreUpdate', function (scores) {
    self.blueScoreText.setText('Blue: ' + scores.blue);
    self.redScoreText.setText('Red: ' + scores.red);
    // self.blueScoreText.setText('Green: ' + scores.green);
    // self.redScoreText.setText('Yellow: ' + scores.yellow);
  });
  // //  star = self.physics.add.image(starLocation.x, starLocation.y, 'star');

  this.socket.on('potatoLocation', function (potatoLocation) {
      if (self.potato) self.potato.destroy();
      self.potato = self.physics.add.image(potatoLocation.x, potatoLocation.y, 'potato').setScale(.2)
      self.physics.add.overlap(self.ship, self.potato, function () {
        this.socket.emit('potatoCollected');
        //once secket is receved 
        
        touchPo = true
        //adds text and initiats timer 
        text = this.add.text(32, 32);
        timedEvent = this.time.addEvent({ delay: 500, callback: () => onEvent(self),  callbackScope: this, loop: true });  
        //console.log(playerSpeed)
        // timedEvent = new Phaser.Time.TimerEvent({ delay: 4000 });
        // this.time.addEvent(timedEvent);
        //timedEvent = new Phaser.Time.TimerEvent({ delay: 4000 });
      }, null, self);
    });
  //sandwich

  this.socket.on('sandwichLocation', function (sandwichLocation) {
    
    if (self.sandwich) self.sandwich.destroy();
    self.sandwich = self.physics.add.image(sandwichLocation.x, sandwichLocation.y, 'sandwich').setScale(.1)
    self.physics.add.overlap(self.ship, self.sandwich, function () {
      this.socket.emit('sandwichCollected');
     
      touchSandwich = true

      sandwichText = this.add.text(40, 40);
      sandwichTimedEvent = this.time.addEvent({ delay: 500, callback: () => onSandwich(self), callbackScope: this, loop: true});
      //console.log()  
        
    }, null, self);
        // self.physics.add.overlap(self.ship, stars, function () {
        //   this.socket.emit('starCollected');
        // }, null, self);
  });

  this.socket.on('juiceLocation', function (juiceLocation) {
    if (self.juice) self.juice.destroy();
    self.juice = self.physics.add.image(juiceLocation.x, juiceLocation.y, 'juice').setScale(.25)
    self.physics.add.overlap(self.ship, self.juice, function () {
      this.socket.emit('juiceCollected');
    }, null, self);
  });
      
    //timedEvent = this.time.delayedCall(3000, onEvent, [], this);
    
  // stars = this.physics.add.group({
  //   key: 'sandwich',
  //   repeat: 20,
  //   setXY: { x: 12, y: 0, stepX: 70 }
  // });

      //potato = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'potato').setScale(.2)
      //potato.body.setGravityY(300)
      //this.physics.add.collider(potato, platforms);
    //sandwich = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'sandwich').setScale(.09)

    //juice = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'juice').setScale(.25)

      //this.physics.add.overlap(self, sandwich, hitSandwich, null, this);

    // function hitSandwich (self, sandwich){

    //   sandwich.disableBody(true, true);

    //   //playerSpeed = 500

    //   //console.log(playerSpeed)

    //   //gameOver = true;

    // }


    // timedEvent = this.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this });

    //  The same as above, but uses a method signature to declare it (shorter, and compatible with GSAP syntax)
    //timedEvent = this.time.delayedCall(3000,  [], this);
    

    // text = this.add.text(32, 32);

    // timedEvent = new Phaser.Time.TimerEvent({ delay: 4000 });

    // this.time.addEvent(timedEvent);
    // if(touchPo == true){
    //   text = this.add.text(32, 32);
    //   timedEvent = this.time.addEvent({ delay: 2000,  callbackScope: this });
    // }
}

function update() {


  if (this.ship) {
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-playerSpeed);
      console.log(playerSpeed)

      //this.ship.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(playerSpeed);
      //this.ship.setAngularVelocity(150);
    } else if (this.cursors.down.isDown) {
      this.ship.setVelocityY(playerSpeed);
    } else if (this.cursors.up.isDown) {
      this.ship.setVelocityY(-playerSpeed);
    } else {
      this.ship.setVelocityX(0);
      this.ship.setVelocityY(0);
    }
  
    // if (this.cursors.up.isDown) {
    //   this.physics.velocityFromRotation(this.ship.rotation + 1.5, playerSpeed, this.ship.body.acceleration);
    // } else {
    //   this.ship.setAcceleration(0);
    // }
  
    this.physics.world.wrap(this.ship, 5);

    // emit player movement
    var x = this.ship.x;
    var y = this.ship.y;
    var r = this.ship.rotation;
    if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
    }
    // save old position data
    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation
    };
  }

  //updtes the boerd to wait unitl a person touches the potato to start timer 
  if(touchPo == true){
    text.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
  }
  if (touchSandwich == true){
    if(showSandwichText == false ){
      sandwichText.setText('Event.progress: ' + sandwichTimedEvent.getProgress().toString().substr(0, 4));
    } else if (showSandwichText == true){
      sandwichText.destroy()
      showSandwichText = false
    }
  }
  //sandwichText.setText('Event.progress: ' + sandwichTimedEvent.getProgress().toString().substr(0, 4));

  //console.log(text)
  // var progress = timedEvent.getProgress();

  // text.setText([
  //   //'Click to restart the Timer',
  //   'Event.progress: ' + progress.toString().substr(0, 4)
  // ]);
  //console.log(progress += 1)

}

function onEvent (self){
    //image.rotation += 0.04;

  c++;
  console.log(c)

  if(c % 2 == 1){
    self.ship.setTint(0xE0FF00);
  } else {
    self.ship.setTint(0x0000ff);
  }


  if (c === 10){
    timedEvent.remove(false);
  
    self.ship.setTint(0xff0000)
    self.physics.pause();
    c = 0
    //self.socket.emit('sandwichCollected');
  }
}

function onSandwich (self){
  s++;
  console.log(s)
  playerSpeed = 900


  if(s % 2 == 1){ 
    self.ship.setTint(0xE0FF00);
  } else {
    self.ship.setTint(0x0000ff);
  }


  if (s === 10){
    sandwichTimedEvent.remove(false);
    showSandwichText = true
    self.ship.setTint(0xff0000)
    playerSpeed = 150
    s = 0
    //self.socket.emit('sandwichCollected');
    
    //self.socket.emit('sandwichCollected');
  }

}


// function addStar(self, sandwichLocation) {
//   self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
// }

// function addpotato(self, starLocation) {
//   self.potato = self.physics.add.image(starLocation.x, starLocation.y, 'potato');
// }

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  if (playerInfo.team === 'blue') {
    self.ship.setTint(0x0000ff);
  } else if (playerInfo.team === 'red'){
    self.ship.setTint(0xff0000);
  }
  // } else if(playerInfo.team === 'green'){
  //   self.ship.setTint(0xff0000);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }
  self.ship.setDrag(1);
  self.ship.setAngularDrag(1);
  self.ship.setMaxVelocity(200);

 
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
  } else if (playerInfo.team === 'red'){
    otherPlayer.setTint(0xff0000);
  }
  // } else if(playerInfo.team === 'green'){
  //   self.ship.setTint(0xff0000);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}
// let config = {
//     width:1420,
//     height: 800,
//     backgroundColor: 0x000000,
//     scene: [Scene1, Scene2]
// }

//const { update } = require("lodash");

// let game = new Phaser.Game(config);

var config = {
  type: Phaser.AUTO,
  width: 1422,
  height: 800,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update

  }
};

let game = new Phaser.Game(config);

let text;
let graphics;
let hsv;
let timerEvents = [];
let playerSpeed = 250
let playerJump = 550
let getPotato = true
let touchPo = false


let score = 0;
let scoreText;

function preload ()
{
  //this.load.setBaseURL('http://labs.phaser.io');

  this.load.image('sky', '../sprites/NYBG.png');

  this.load.image('ground', '../sprites/platform.png');
  this.load.image('star', '../sprites/star.png');
  this.load.image('potato', '../sprites/potato.png');
  this.load.image('sandwich', '../sprites/sandwich.png');
  this.load.image('juice', '../sprites/juice.png');
  this.load.image('timbs', '../sprites/timbs.png');
  //this.load.image('bomb', '../sprites/bomb.png');


  //this.load.image('bomb', '../sprites/bomb.png');
  this.load.spritesheet('dude', 
      '../sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
  //this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  //this.load.image('red', 'assets/particles/red.png');
}

function create ()
{

 
 


  this.add.image(700, 300, 'sky').setScale(2);

  // var particles = this.add.particles('red');

  // var emitter = particles.createEmitter({
  //     speed: 100,
  //     scale: { start: 1, end: 0 },
  //     blendMode: 'ADD'
  // });

  //new TextStyle(scoreText, color: '#000000' )

  
  


  platforms = this.physics.add.staticGroup();
  //ground
  platforms.create(700, 745, 'ground').setScale(4).refreshBody();
  //single
  platforms.create(700, 200, 'ground').setScale(2).refreshBody();
  //right
  platforms.create(70, 450, 'ground').setScale(2).refreshBody();
  //left
  platforms.create(1350, 450, 'ground').setScale(2).refreshBody();

  // var logo = this.physics.add.image(400, 100, 'logo');

  // logo.setVelocity(100, 200);
  // logo.setBounce(1, 1);
  // logo.setCollideWorldBounds(true);

  // emitter.startFollow(logo);

  scoreText = this.add.text(1120, 32, 'score: 0', { fontSize: '32px', fill: '#000' });
  
  


  player = this.physics.add.sprite(100, 450, 'dude').setScale(2)
  player.body.setGravityY(300)
  this.physics.add.collider(player, platforms);


  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  

  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  stars = this.physics.add.group({
      key: 'star',
      repeat: 20,
      setXY: { x: 12, y: 0, stepX: 70 }
  });
  
  stars.children.iterate(function (child) {
  
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });

  this.physics.add.collider(stars, platforms);

  this.physics.add.overlap(player, stars, collectStar, null, this);

  function collectStar (player, star){
      star.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);
      console.log(score)
  }

  timbs = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'timbs').setScale(.05)
  timbs.body.setGravityY(300)
  this.physics.add.collider(timbs, platforms);
  
  potato = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'potato').setScale(.2)
  potato.body.setGravityY(300)
  this.physics.add.collider(potato, platforms);


  sandwich = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'sandwich').setScale(.09)
  sandwich.body.setGravityY(300)
  this.physics.add.collider(sandwich, platforms);

  juice = this.physics.add.sprite(Math.floor(Math.random() * (1290 - 20 + 1) + 20), Math.floor(Math.random() * (650- 0 + 1) + 0), 'juice').setScale(.25)
  juice.body.setGravityY(300)
  this.physics.add.collider(juice, platforms);

  // bombs = this.physics.add.group();

  // this.physics.add.collider(bombs, platforms);

  // this.physics.add.collider(player, bombs, hitBomb, null, this);

  // function hitBomb (player, bomb){
  //      this.physics.pause();

  //     player.setTint(0xff0000);

  //     player.anims.play('turn');

  //     gameOver = true;
  // }

  

  this.physics.add.overlap(player, sandwich, hitSandwich, null, this);

  function hitSandwich (player, sandwich){

      
      sandwich.disableBody(true, true);

     playerSpeed = 350

      
      //gameOver = true;
  }
  
  this.physics.add.overlap(player, timbs, hitTimbs, null, this);

  function hitTimbs (player, timbs){

      
      timbs.disableBody(true, true);

     playerJump = 700

      
      //gameOver = true;
  }


  this.physics.add.overlap(player, juice, hitJuice, null, this);

  function hitJuice (player, juice){

      getPotato = false

      juice.disableBody(true, true);

      

      //sheildText = "sheild activated"
     

      
      //gameOver = true;
  }


  this.physics.add.overlap(player, potato, hitPo, null, this);
  

  //let playerPotato = false

  function hitPo (player, potato){

      if(getPotato == true){
          potato.disableBody(true, true);

          // if (playerPotato == true){
          //     //stext = this.add.text(400, 32, "stuff", { fontSize: '32px', fill: '#000' });

      
          // }
          


          // let timeleft = 5;
          // var downloadTimer = setInterval(function(){
          //     if(timeleft <= 0){
                  //this.physics.pause();

                  // touchPo = true

                  // clearInterval(downloadTimer);
                  this.physics.pause();

                  player.setTint(0xff0000);

                  player.anims.play('turn');
                  
                
            //   } else {
            //       console.log(timeleft)
            //     //document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            //   }
            //   timeleft -= 1;
            // }, 1000);

          // this.physics.pause();

          // player.setTint(0xff0000);

          // player.anims.play('turn');
          // if (touchPo == true){
          //     this.physics.pause();
          // }
      }


      //gameOver = true;
  }

  text = this.add.text(100, 32, { fontSize: '32px', fill: '#000' });

  timerEvents.push(this.time.addEvent({ delay: 25000, loop: false }));

  hsv = Phaser.Display.Color.HSVColorWheel();

  graphics = this.add.graphics({ x: 240, y: 36 });
   
  
  }

function update(){
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown){
  player.setVelocityX(-playerSpeed);

  player.anims.play('left', true);

  }else if (cursors.right.isDown){
  player.setVelocityX(playerSpeed);

  player.anims.play('right', true);

  }else{
  player.setVelocityX(0);

  player.anims.play('turn');
  }

  if (cursors.space.isDown && player.body.touching.down){
  player.setVelocityY(-playerJump);
  }

  var output = [];

  graphics.clear();

      output.push('Pass the potato!: ' + timerEvents[0].getProgress().toString().substr(0, 4));

      graphics.fillStyle(hsv[0 * 8].color, 1);
      graphics.fillRect(90, 0 * 16, 500 * timerEvents[0].getProgress(), 8);
  

  text.setText(output);

}



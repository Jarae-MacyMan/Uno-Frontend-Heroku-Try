var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var players = {};

var star = {
    x: Math.floor(Math.random() * 1350) + 50,
    y: Math.floor(Math.random() * 700) + 50
};

var starTwo = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starThree = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starFour = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starFive = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starSix = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starSeven = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starEight = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starNine = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};

var starTen = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
};







var sandwich = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
}

var juice = {
  x: Math.floor(Math.random() * 1350) + 50,
  y: Math.floor(Math.random() * 700) + 50
}


  
  


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 1350) + 50,
    y: Math.floor(Math.random() *  700) + 50,
    playerId: socket.id,
    playerScore: 0,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
  currPlayers = Object.keys(players)
  numPlayers = currPlayers.length
  console.log(currPlayers)
  console.log(numPlayers)
  players[socket.id]["playerNum"] = numPlayers
  console.log(players)



  potato = {
    rotation: 0,
    x: Math.floor(Math.random() * 1350) + 50,
    y: Math.floor(Math.random() * 700) + 50
  };
  // send the players object to the new player
    socket.emit('currentPlayers', players);
    // send the star object to the new player
    socket.emit('starLocation', star);
    socket.emit('starTwoLocation', starTwo);
    socket.emit('starThreeLocation', starThree);
    socket.emit('starFourLocation', starFour);
    socket.emit('starFiveLocation', starFive);
    socket.emit('starSixLocation', starSix);
    socket.emit('starSevenLocation', starSeven);
    socket.emit('starEightLocation', starEight);
    socket.emit('starNineLocation', starNine);
    socket.emit('starTenLocation', starTen);
    
    //socket.emit('star3Location', star3);


    socket.emit('potatoLocation', potato);
    socket.emit('potatoMovement', potato);

    //setTimeout(() => {  
      socket.emit('sandwichLocation', sandwich);
    //}, 5000);

    socket.emit('juiceLocation', juice);

    // send the current scores

    //theScore = players[socket.id].playerScore

    socket.emit('playerScoreUpdate',{ 
      theScore: players[socket.id].playerScore,
      playerNum: players[socket.id].playerNum
    });
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
    
    console.log('user disconnected');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnected', socket.id);
  });


  // when a player moves, update the player data
   socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  
  

  // socket.on('starCollected', function () {
  //   if (players[socket.id].team === 'red') {
  //     scores.red += 10;
  //   } else {
  //     scores.blue += 10;
  //   }
  //   star.x = Math.floor(Math.random() * 1350) + 50;
  //   star.y = Math.floor(Math.random() * 700) + 50;
  //   io.emit('starLocation', star);
  //   io.emit('scoreUpdate', scores);
  // });

   socket.on('starCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });


  socket.on('starTwoCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starTwoLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starThreeCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starThreeLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starFourCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starFourLocation', star);
    io.emit('playerFourScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starFiveCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starFiveLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starSixCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starSixLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starSevenCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starSevenLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starEightCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starEightLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });



  socket.on('starNineCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starNineLocation', star);
    io.emit('playerScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });

  socket.on('starTenCollected', function () {
    if (players[socket.id].playerNum == 1) {
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 2){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 3){
      players[socket.id].playerScore += 10;
    } else if (players[socket.id].playerNum == 4){
      players[socket.id].playerScore += 10;
    }
    star.x = Math.floor(Math.random() * 1350) + 50;

    star.y = Math.floor(Math.random() * 700) + 50;
    io.emit('starTenLocation', star);
    io.emit('playerThreeScoreUpdate', { theScore: players[socket.id].playerScore, playerNum: players[socket.id].playerNum});
  });





  

  socket.on('potatoCollected', function () {
    
    potato.x = Math.floor(Math.random() * 1350) + 50;
    potato.y = Math.floor(Math.random() * 700) + 50;
    io.emit('potatoLocation', potato);
  });
  

  socket.on('sandwichCollected', function () {
   
      sandwich.x = Math.floor(Math.random() * 1350) + 50;
      sandwich.y = Math.floor(Math.random() * 700) + 50;
      io.emit('sandwichLocation', sandwich);
   
    
  });

  socket.on('juiceCollected', function () {
    
    juice.x = Math.floor(Math.random() * 1350) + 50;
    juice.y = Math.floor(Math.random() * 700) + 50;
    io.emit('juiceLocation', juice);
   
  });


});

server.listen(8082, function () {
  //console.log(players.length)
  console.log(`Listening on ${server.address().port}`);
});
const got = require('got');
const urls = reuqire('./urls.json');
const ks = require('node-key-sender');
var inGame = false

function press(q) {
  var keys = q.split("")
  console.log('Simulating ' + q + '. Array: ' + keys);
  for (i=0; i<q.length; i++) {
    var key = q[i]
    ks.sendKey(key)
  }
}

function join() {
  if (!inGame) {
    inGame = true
    press('/join GameWide');
    console.log('Attempting to join game...');
  }
}

function leave() {
  if (inGame) {
    inGame = false
    press('/hub');
    console.log('Attempting to leave game...');
  }
}

function checkPlayers() {
  got(urls.servers, function(err, res, body) {
    var servers = JSON.parse(body)
    for (i=0; i<servers.length; i++) {
      var s = servers[i]
      if (s.name == "GameWide") {
        var time = s.timeNoPlayers
        var p + s.playerCount
        if (time>10) {
          if (!inGame) {
            join();
          }
        }
        if (p > 0) {
          if (inGame) {
            leave()
          }
        }
      }
    }
  }
}

setInterval(checkPlayers, 3000)

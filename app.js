
new PlayerService('http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json', ready)

function Player(playername, position, jersey) {
  var newPlayer = this

  newPlayer.playername = playername;
  newPlayer.position = position;
  newPlayer.jersey = jersey;
  newPlayer.img = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"

}

var players = []


$('form').on('submit', function (e) {
  e.preventDefault();

  var form = this;
  var player = new Player(form.playerName.value, form.position.value, form.jersey.value)
  players.push(player)
  update(players)
  // console.log(players)
  form.reset();
})


/*update the DOM with new player Card*/
function update(list) {


  var playerElem = $('.player-roster');
  playerElem.empty()

  for (var i = 0; i < list.length; i++) {
    playerElem.append('<div class="player-card text-center"><img class="media-object img-rounded" src="' + list[i].img + '"alt ="..."/><p>' + list[i].playername + '</p><p>' + list[i].position + '</p><p>' + list[i].jersey + '</p></div>')

  // var playerElem = $('.player-roster');
  // playerElem.empty()
  // for(var i = 0; i < list.length; i++){
  //     console.log(list[i])
  //   playerElem.append('<div class="player-card text-center"><img class="media-object img-rounded" src="' + list[i].img + '"alt ="..."/><p>'+ list[i].playername +'</p><p>'+list[i].position +'</p><p>'+list[i].jersey+'</p></div>')


/*ANOTHER WAY TO WRITE THIS IN jQUERY*/
$('.player-roster').empty();
for(var i = 0; i < list.length; i++){
var playerCard = $('<div class="player-card text-center"><img class="media-object img-rounded" src="' + list[i].img + '"alt ="..."/><p>'+ list[i].playername +'</p><p>'+list[i].position +'</p><p>'+list[i].jersey+'</p></div>')
      console.log(list[i])
      playerCard.appendTo($('.player-roster'));
 }

  }



/* Remove Player Start*/
$('.player-roster').on('click', '.player-card', function () {
  var username = $(this).text()
  removeUserByName(username);
  update(players);
})

function removeUserByName(name) {
  for (var i = 0; i < players.length; i++) {
    var currentPlayer = players[i];
    if (currentPlayer.name == name) {
      return players.splice(i, 1)
    }
  }
}
}
/*Remove Player Finish*/



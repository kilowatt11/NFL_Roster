function PlayerService (url, callWhenDone){

  if(typeof callWhenDone !== 'function'){
      return 'Error: you must provide a function to call when done'
  }
    
  var self = this;
  var playerData = []
  
  self.getAllPlayers = function(){
      return playerData;
  }
  
  self.getPlayersBySomeValue = function(value){
      debugger;
    var team = [];
    for (var i = 0; i < playerData.length; i++) {
        var currentPlayer = playerData[i];
        var hasValue = false;
        for(var prop in currentPlayer){
            if(typeof currentPlayer[prop] === 'string' && currentPlayer[prop].toLowerCase() === value.toLowerCase()){
                hasValue = true;
            }   
        }
        if(hasValue){
            team.push(currentPlayer)
        }
    }
    return team;      
  } 
  
  function goGetData(){
      console.log('getting data')
      var BCWServer = "http://bcw-getter.herokuapp.com/?url=";
      var modifiedUrl = BCWServer + encodeURIComponent(url);
      var data = localStorage.getItem('playerData');
      if(data){
        playerData = JSON.parse(data)
        return callWhenDone(self);
      }
      $.get(modifiedUrl, function(response){
          var data = JSON.parse(response)
          playerData = data.body.players.filter(function(player){
              if(player.pro_status === 'A'){
                  return player; 
              }
          }).slice(0, 50)
          localStorage.setItem('playerData', JSON.stringify(playerData))
          callWhenDone(self)
      })
  }
  
  goGetData()
  
}

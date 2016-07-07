var PlayersService = function(endpointUri, callback){
    var playersData = [];
    
    this.getPlayersByTeam = function(teamName){
    	playersData.filter(function(player){
    	  if(player.team == teamName){
    	    return true;
        }
    	});
    }
    
    this.getPlayersByPosition = function(position){
        playersData.filter(function(player){
          if(player.position == position){
            return true;
          }
        });
    }
    
    function loadPlayersData(){
      
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 
      
      var localData = localStorage.getItem('playerData');
      if(localData){
      	playerData = JSON.parse(localData);
      	return callback(); 
      	//return will short circut the loadPlayersData function
      	//this will prevent the code below from ever executing
      }
      
      var url = "http://bcw-getter.herokuapp.com/?url=";
      var apiUrl = url + encodeURIComponent(endpointUri);
    
        $.getJSON(endpointUri, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playerData', JSON.stringify(playerData))
          console.log('Finished Writing Player Data to localStorage')
          callback()
        });
    }	
loadPlayersData(); //call the function above every time we create a new service
} 

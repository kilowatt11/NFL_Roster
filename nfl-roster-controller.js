
new PlayerService('http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json', ready)

function ready(dataStore) {
    console.log('ready');
    var roster = $('.roster');
    var draftRoster = $('.draft-roster')
    var players = dataStore.getAllPlayers();

    var myPlayers = [];

    /*START DRAFT NEW PLAYER ON CLICK*/
    $('.roster').on('click', '#draft-pick', function () {
        var username = $(this).text()
        var check = checkPlayer(username);

        addUserByName(username, check);
        draftUpdate();
    })

    function addUserByName(name, check) {
        
        if (check == true) {
            return;
        }

        for (var i = 0; i < players.length; i++) {
            var currentPlayer = players[i];
            if (currentPlayer.fullname == name) {
                myPlayers.push(currentPlayer)
                console.log(myPlayers);
            }
        }
    }

    function checkPlayer(name) {
        
        for (var i = 0; i < myPlayers.length; i++) {
            var currentPlayer = myPlayers[i];
            if (currentPlayer.fullname == name) {
                return true;
            }
        }
    }
    /*END DRAFT NEW PLAYER*/


    /*START REMOVE PLAYER FROM ROSTER*/
    $('.draft-roster').on('click', '#player-name', function () {
        
        var username = $(this).text()
        removeUserByName(username);
        draftUpdate();
    })


    function removeUserByName(name) {
        
        for (var i = 0; i < myPlayers.length; i++) {
            var currentPlayer = myPlayers[i];
            if (currentPlayer.fullname == name) {
                myPlayers.splice(i, 1)
                draftUpdate();
            }
        }
    }

    function draftUpdate() {
        
        draftRoster.empty();
        


        myPlayers.forEach(function (player) {
            console.log(myPlayers)
            var template = '<div id="player-card" class=" text-center"><img class="media-object img-rounded" src="' + player.photo + '"alt ="..."/><p id="player-name">' + player.fullname + '</p><p>' + player.position + '</p><p>' + player.jersey + '</p></div>'
            draftRoster.append(template);
        })
    }
    /*END REMOVE PLAYER FROM ROSTER*/

$('.saveRoster').on('click', function () {
    
         localStorage.setItem('myTeam', JSON.stringify(myPlayers))
         draftUpdate();

    })

    /*FILTER NFL PLAYER LIST*/
    $('#find').on('click', function (event) {
        var query = $('#query').val()
        players = dataStore.getPlayersBySomeValue(query)
        update();
    })


    $('.clear-filter-button').on('click', function () {
        players = dataStore.getAllPlayers()
        update();
    })


    function update() {
        roster.empty()
        
        var data = localStorage.getItem('myTeam');
        if(data){
        playerData = JSON.parse(data)
        myPlayers = playerData
        draftUpdate();

        }

        roster.append('<h3>Showing ' + players.length + ' Active Players</h3>')
        players.forEach(function (player) {
            console.log(players)
            var template = '<ul class="player-list"><li id="draft-pick"><img src="' + player.photo + '" width="80"/>' + player.fullname + '</li></ul>'
            roster.append(template);
        })
    }

    update();
    /*END FILTER NFL PLAYER LIST*/
}

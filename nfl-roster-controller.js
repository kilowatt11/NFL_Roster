
new PlayerService('http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json', ready)

function ready(dataStore) {
    console.log('ready');
    var roster = $('.roster');
    var draftRoster = $('.draft-roster')
    var players = dataStore.getAllPlayers();

    var myPlayers = [];

    /*START DRAFT NEW PLAYER ON CLICK*/
    $('.roster').on('click', '#draft-pick', function () {
        debugger;
        var username = $(this).text()
        var check = checkPlayer(username);


        addUserByName(username, check);
        draftUpdate();
    })
    function addUserByName(name, check) {
        debugger;
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
        debugger;
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
        // debugger;
        var username = $(this).text()
        removeUserByName(username);
        draftUpdate();
    })


    function removeUserByName(name) {
        // debugger;
        for (var i = 0; i < myPlayers.length; i++) {
            var currentPlayer = myPlayers[i];
            if (currentPlayer.fullname == name) {
                myPlayers.splice(i, 1)
                draftUpdate();
            }
        }
    }

    function draftUpdate() {
        // debugger;
        draftRoster.empty();
        myPlayers.forEach(function (player) {
            var template = '<div id="player-card" class=" text-center"><img class="media-object img-rounded" src="' + player.photo + '"alt ="..."/><p id="player-name">' + player.fullname + '</p><p>' + player.position + '</p><p>' + player.jersey + '</p></div>'
            draftRoster.append(template);
        })
    }
    /*END REMOVE PLAYER FROM ROSTER*/

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

        roster.append('<h3>Showing ' + players.length + ' Active Players</h3>')
        players.forEach(function (player) {
            var template = '<ul class="player-list"><li id="draft-pick"><img src="' + player.photo + '" width="80"/>' + player.fullname + '</li></ul>'
            roster.append(template);
        })
    }

    update();
    /*END FILTER NFL PLAYER LIST*/
}
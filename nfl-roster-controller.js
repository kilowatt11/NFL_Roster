
new PlayerService('http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json', ready)

function ready(dataStore) {
    console.log('ready');
    var roster = $('.roster');
    var draftRoster = $('.draft-roster')
    var players = dataStore.getAllPlayers();

    var myPlayers = [];

    /*add to draft on click event*/
    $('.roster').on('click', '#draft-pick', function () {
        // debugger;
        var username = $(this).text()
        addUserByName(username);
        draftUpdate();
    })
    function addUserByName(name) {
        debugger;
        for (var i = 0; i < players.length; i++) {
            var currentPlayer = players[i];
            if (currentPlayer.fullname == name) {
                myPlayers.push(currentPlayer)
                console.log(myPlayers);
            }
        }
    }

    function draftUpdate() {
        debugger;
        myPlayers.forEach(function (player) {
            var template = '<div class="player-card text-center"><img class="media-object img-rounded" src="' + player[i].img + '"alt ="..."/><p>' + player[i].playername + '</p><p>' + player[i].position + '</p><p>' + player[i].jersey + '</p></div>'
            draftRoster.append(template);
        })
    }
    /*end draft*/


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

}

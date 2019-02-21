// accept new friend input.  Add to friend array.  
// you will already have friends data in arrays saved from previous inputs
// first get new friends total score (do we really need this???)
// Loop thru saved friends and see which has the least difference. 
// the loop withing this loop will be getting score totals of all old friends

//required for friends data source
var oldFriends = require('../data/friends');

// Routes and export
module.exports = function(app){

	// Get route to display a JSON of all possible friends
	app.get('/api/friends', function(req, res){
		res.json(oldFriends);
    });

    app.post('/api/friends', function(req, res){
        console.log(req.body);
        debugger;
        var matchedFriend = {
            name: "",
            photo: "",
            matchDiff: 0
        }
        var newFriend = req.body;
        var newFriendScores = req.body.scores;
        //console.log("NewFriend scores from survey: " + newFriendScores);

        // debugging code
        //var newFriendTotal = 0;
        //for (var i = 0; i < newFriend.scores.length; i++) {
        //        newFriendTotal += parseInt(newFriend.scores[i]);  
            }
        //console.log("NewFriend total score from survey: " + newFriendTotal);

        for (var r = 0; r < oldFriends.length; r++) {
            var oldFriendsTotal = 0;
            //console.log("Old Friends: ", oldFriends[r].name);
            for (var k = 0; k < oldFriends[r].scores.length; k++) {
                oldFriendsTotal += Math.abs(parseInt(newFriendScores[r]) - parseInt(oldFriends[r].scores[k]));
                if (oldFriendsTotal <= matchedFriend.matchDiff) {
                    debugger;
                    matchedFriend.name = oldFriends[r].name;
                    matchedFriend.photo = oldFriends[r].photo;
                    matchedFriend.matchDiff = oldFriendsTotal;
                  }
            }
            console.log("oldFriend total: " + oldFriendsTotal);
        };
        console.log("matched Friend: " + matchedFriend.name);  

        oldFriends.push(newFriend);
        res.json(matchedFriend);
        console.log("UPDATED: ", newFriend);
    });

};
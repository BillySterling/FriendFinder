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
        var matchedFriend = {
            name: "",
            photo: "",
        };
        var matchDiff = 1000;
        //console.log("NewFriend scores from survey: " + newFriendScores);

        // debugging code
        //var newFriendTotal = 0;
        //for (var i = 0; i < newFriend.scores.length; i++) {
        //        newFriendTotal += parseInt(newFriend.scores[i]);  
        //    }
        //console.log("NewFriend total score from survey: " + newFriendTotal);

/*

        for (var r = 0; r < oldFriends.length; r++) {
            var oldFriendsTotal = 0;
            //console.log("Old Friends: ", oldFriends[r].name);
            for (var k = 0; k < oldFriends[r].scores.length; k++) {
                debugger;
                oldFriendsTotal += Math.abs(parseInt(newFriendScores[r]) - parseInt(oldFriends[r].scores[k]));
                if (oldFriendsTotal <= matchedFriend.matchDiff) {
                    debugger;
                    matchedFriend.name = oldFriends[r].name;
                    matchedFriend.photo = oldFriends[r].photo;
                    matchedFriend.matchDiff = oldFriendsTotal;
                  }
            }
            console.log("oldFriend total: " + oldFriendsTotal);
        }
        console.log("matched Friend: " + matchedFriend.name);  
        debugger;
        // push (save) the new friends data
        oldFriends.push(newFriend);
        res.json(matchedFriend);
        console.log("UPDATED: ", newFriend);
    });
*/
        for (var r = 0; r < oldFriends.length; r++) {
            var matchArr = [];

            for (var k = 0; k < oldFriends[r].scores.length; k++) {
                debugger;
                var testVal = Math.abs((oldFriends[r].scores[k]) - (req.body.scores[k])); //debugging
                // array to keep score calculations between input friend data and stored friend data
                // use Math.abs to keep positive value
                matchArr.push(Math.abs((oldFriends[r].scores[k]) - (req.body.scores[k])));
                }
                debugger;

                var bestScore = matchArr.reduce((acc, val) => acc + val);

                if (bestScore < matchDiff) {
                    debugger;
                    matchedFriend.name = oldFriends[r].name;
                    matchedFriend.photo = oldFriends[r].photo;
                    matchDiff = bestScore;
                    }
            }
            console.log("matched Friend: " + matchedFriend.name);  
            debugger;
            // save the new friends data
            console.log("UPDATED: ", req.body);
            oldFriends.push(req.body);
            // respond to user with best match
            console.log("BEST MATCH: ", matchedFriend);
            res.json(matchedFriend);
    });
};
/* eslint-disable no-console */
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
        // pre-load diff value greater than zero for first comparison
        var matchDiff = 1000;
        for (var r = 0; r < oldFriends.length; r++) {
            // array to keep score calculations between input friend data and stored friend data
            var matchArr = [];
            // loop thru the scores; compare the difference between current user's scores against those from other users, question by question.
            for (var k = 0; k < oldFriends[r].scores.length; k++) {
                // Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
                matchArr.push(Math.abs((oldFriends[r].scores[k]) - (req.body.scores[k])));
                }
                // use reduce function to add up the array amounts
                const bestScore = matchArr.reduce((acc, val) => acc + val);

                //The closest match will be the user with the least amount of difference.
                if (bestScore < matchDiff) {
                    matchedFriend.name = oldFriends[r].name;
                    matchedFriend.photo = oldFriends[r].photo;
                    matchDiff = bestScore;
                    }
            }
            console.log("matched Friend: " + matchedFriend.name);  
            // save the new friends data
            console.log("UPDATED: ", req.body);
            oldFriends.push(req.body);
            // respond to user with best match
            console.log("BEST MATCH: ", matchedFriend);
            res.json(matchedFriend);
    });
};
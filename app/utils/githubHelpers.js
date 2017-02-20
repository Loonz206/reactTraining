var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

//ajbogh

function getUserInfo (userName){
    return axios.get('https://api.github.com/users/' + userName + param)
}

var helpers = {
    getPlayersInfo: function (players){
        return axios.all(players.map(function (username){
            return getUserInfo(username)
        })).then(function (info){
            return info.map(function (user) {
                return user.data;
            })
        }).catch(function (err){
            console.warn('Error in getPlayersInfo', err);
        });
    }
};

module.exports = helpers;
Pooch = require('../models/pooch.js');

var getUsername = function(req) {
  user_id = req.cookies.user_id;
  name = false
  if(user_id){
    user = User.find(user_id)
    if(user){
      name = User.find(user_id).name;
    }
  }
  
  return name;
}

exports.view = function(req, res){

  res.render('matchup', {
    title: res.app.get('appName'),
    dogs: Pooch.pickTwo(),
    name: getUsername(req)
  });
};

exports.winner = function(req, res, params) {
  var id = req.params["id"];
  console.log("the id is " + id);
  Pooch.incrementDonation(id, 1);
  
  res.render('matchup', {
    title: res.app.get('appName'),
    dogs: Pooch.pickTwo(),
    name: getUsername(req)
  });
};


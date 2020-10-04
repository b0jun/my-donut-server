
const passport = require(__base + 'lib/passport');

//module.exports = passport.authenticate('github', { 
//    scope: ['user:email'] 
//});

module.exports = (req, res) => {
    res.sendFile(__base + 'github.html');
}
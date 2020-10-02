const GithubStrategy = require('passport-gitgub2').Strategy;
require('dotenv').config();

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_CALLBACK } = process.env;
const { User } = require(__base + 'models');

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CLIENT_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    
    let [user, created] = await User.findOrCreate({ 
        where: {
            githubId: profile.id
        } 
    });

    

}))

module.exports = passport;
const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const { User } = require(__base + 'models');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_CALLBACK } = process.env;
require('dotenv').config();
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => { //세션에 user.id 저장(로그인할 때만)
    console.log('serialize: ', user.dataValues);

    done(null, user.dataValues.id);
});

passport.deserializeUser(async (userId, done) => { //세션으로부터 userId 가져옴(로그인 이후 api 요청할 때)

    let user = await User.findByPk(userId);
    console.log('deserialize: ', user.dataValues);
    if(user){
        done(null, user.dataValues);
    } 

})

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CLIENT_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {

    console.log('verify callback: ', accessToken, refreshToken, profile);
    const { id, username, email } = profile;

    let user, created;
    try{
        [user, created] = await User.findOrCreate({ 
            where: {
                githubId: id
            },
            defaults: {
                email,
                username,
                accessToken,
                refreshToken
            }
        });
    } catch(e){
        return done(e, false);
    }

    return done(null, user)   //그 다음에 passport.serializeUser에 user를 넘겨줌

}))

module.exports = passport;
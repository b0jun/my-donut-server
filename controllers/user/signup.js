const { User } = require(__base + 'models');
const { setPassword } = require(__base + '/lib/auth');
 
module.exports = async (req, res) => {

    const { email, password, username, latlon } = req.body;
    console.log('body: ', req.body);
    
    const [hashedPassword, salt] = setPassword(password);
    console.log('hashed: ', salt);

    let [user, created] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            password: hashedPassword,
            username,
            latlon,
            salt
        }
    });

    if(!created){
        return res.status(409).json({
            message: 'This email already exists'
        });
    } 

    return res.status(201).json({
        message: 'Successfully registered'
    });
};
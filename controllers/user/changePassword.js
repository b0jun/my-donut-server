const { User } = require(__base + 'models');
const { setPassword, checkPassword } = require(__base + 'lib/auth');

module.exports = async (req, res) => {
    const { currentPassword, password, passwordConfirm } = req.body;
    //console.log('password: ', currentPassword, password, passwordConfirm);
    if(password !== passwordConfirm){
        return res.status(400).json({
            message: 'New password is not identical'
        });
    }

    let user = await User.findByPk(req.user.id);

    if(!user){
        return res.status(404).json({
            message: 'Invalid Account'
        });
    }

    if(!checkPassword(user.dataValues, currentPassword)){
        return res.status(400).json({
            message: 'Incorrect password'
        });
    }

    try{
        const [hashedPassword, salt] = setPassword(password);
        user.password = hashedPassword;
        user.salt = salt;
        user.save({
            fields: ['password', 'salt']
        });
    } catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Can not save new password"
        });
    }

    res.status(204).json({
        message: 'Password changed successfully'
    });

}
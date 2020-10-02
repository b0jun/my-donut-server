const { User } = require('../../models');
const user = require('../../models/user');

module.exports = async (req, res) => {
    
    let count = await User.destroy({
        where: {
            id: req.user.id
        }
    });

    if(count === 0){
        return res.status(404).json({
            message: 'Invalid account'
        });
    }

    res.status(204).json({
        message: 'Account was deleted successfully'
    });

};

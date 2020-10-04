const { User } = require(__base + 'models');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ['id', 'username'],
    });
    if (!user) throw Error('유저가 존재하지 않습니다.');
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
};

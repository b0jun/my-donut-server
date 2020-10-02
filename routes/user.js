const userControllers = require(__base + 'controllers/user');
const router = require('express').Router();
const { checkAccessToken } = require(__base + 'lib/auth');

router.post('/signup', userControllers.signup);
router.post('/signin', userControllers.signin);
router.post('/signout', checkAccessToken(), userControllers.signout);
router.post('/refresh', checkAccessToken('refresh'), userControllers.refresh);
router.get('/profile', checkAccessToken(), userControllers.getProfile);
router.patch('/profile', checkAccessToken(), userControllers.editProfile);
router.delete('/profile', checkAccessToken(), userControllers.deleteProfile);
router.patch('/password', checkAccessToken(), userControllers.changePassword);

module.exports = router;
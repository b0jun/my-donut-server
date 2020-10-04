const userControllers = require(__base + 'controllers/user');
const router = require('express').Router();
const { authMiddleware } = require(__base + 'lib/auth');
const passport = require(__base + 'lib/passport');

router.post('/signup', userControllers.signup);
router.post('/signin', userControllers.signin);
router.post('/signout', authMiddleware, userControllers.signout);
router.get('/check', authMiddleware, userControllers.check);
router.post('/refresh', authMiddleware, userControllers.refresh);
router.get('/profile', authMiddleware, userControllers.getProfile);
router.patch('/profile', authMiddleware, userControllers.editProfile);
router.delete('/profile', authMiddleware, userControllers.deleteProfile);
router.patch('/password', authMiddleware, userControllers.changePassword);
router.get('/github', userControllers.socialSignin);
router.get(
  '/github/callback',
  passport.authenticate('github'),
  userControllers.redirectCallback
);

module.exports = router;

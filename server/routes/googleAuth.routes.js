const passport = require('passport');
require('../middleware/passport');

const googleAuthController = require('../controller/googleAuth.controller');

module.exports = function Route(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', googleAuthController.loadAuth);

    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: 'http://localhost:3000/product',
            failureRedirect: '/failure'
        })
    );
    app.get('/success', googleAuthController.successGoogleLogin);
    app.get('/failure', googleAuthController.failureGoogleLogin);
};
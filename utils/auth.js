const withAuth = (req, res, next) => {
    if(!req.session.loggedIn) {
        res.redirect('/signup-login');
    } else {
        next();
    }
};

module.exports = withAuth;
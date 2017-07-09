// Dependencies
const express   = require('express');
const path      = require('path');
const fs        = require('fs');
const session   = require('express-session');
const router    = new express.Router();
const config    = require('./config.json');

// Initial Session
router.use(session({
    secret: config.sessionSecret,
    name: 'SESSID',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
}));

// Check if the user is logged in
router.use((req, res, next) => {

    // Only login if the user is not authenticated
    if (!req.session.authenticated_user) {

        // Defaults to false
        req.session.authenticated_user = undefined;

        // Check if both password and username were given
        if (req.body.username && req.body.password) {

            // Check if the username exists
            let found_user;

            config.users.map((user) => {
                if (found_user) return;
                if (user.username == req.body.username) found_user = user;
            });

            // If a user with this username was found, check his password
            if (found_user) {
                if (found_user.password == req.body.password) {
                    req.session.authenticated_user = found_user;
                }
            }
        }
    }

    req.session.save((err) => {
        if (err) throw err;
        next();
    });
});

router.use('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect(req.headers.referer || '/');
});

router.use('/auth/status', (req, res) => {
    res.json({
        authenticated: req.session.authenticated_user != undefined,
    });
});

router.use('/auth/register', (req, res) => {

    // Check if both parameters were given
    if (!req.body.username || !req.body.password) {
        return res.json({
            authenticated: false
        });
    }

    // Check if the user doesn't exist already
    let user_already_exists = false;
    config.users.map((user) => {
        if (user_already_exists) return;
        if (user.username == req.body.username) user_already_exists = true;
    });

    if (user_already_exists) {
        return res.json({
            authenticated: false
        });
    }

    // Add the user to the list
    config.users.push({
        username: req.body.username,
        password: req.body.password
    });

    req.session.authenticated_user = config.users[config.users.length - 1];

    return res.json({
        authenticated: true
    });
});

module.exports.router = router;
module.exports.requiresAuthentication = (req, res, next) => {

    // Send the error
    function err(res, message) {
        res.status(401).json({
            error: 'This route requires you to be authenticated.',
            message,
        });
    }

    // If there is no session or not authenticated
    if (!req.session) return err(res, 'No session found');
    if (!req.session.authenticated_user) return err(res, 'Not authenticated');

    // If properly authenticated, call the next route
    next();
};

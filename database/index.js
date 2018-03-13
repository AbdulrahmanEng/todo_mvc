const bCrypt = require('bcrypt');
const User = require('./models').user;


const database = {
    auth: {
        register: (req, res) => {
            // Check input validity.
            req.check('email', 'Invalid email address')
                .isEmail();
            req.check('password', 'Password is invalid')
                .isLength({ min: 5 })
                .matches(/\d/); // Password contains a number.
            const errors = req.validationErrors();
            if (errors) {
                req.session.errors = errors;
                res.render('form', {
                    title: 'Register',
                    flash: {
                        message: 'Could not be registered'
                    },
                    errors: errors,
                    loggedIn: req.session.user !== undefined
                });
                req.session.errors = null;
            } else {
                // User model to create user if email doesn't exist
                const email = req.body.email;
                const password = req.body.password;
                const forename = req.body.forename;
                const surname = req.body.surname;
                bCrypt.genSalt(8, function (err, salt) {
                    if (err) {
                        console.error(err);
                    }
                    bCrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            console.error(err);
                        }
                        // Search for user.
                        User.findOne({
                            where: {
                                email: email
                            }
                        })
                            .then((user) => {
                                if (user) {
                                    res.render('form', {
                                        title: 'Register',
                                        flash: { message: 'User already exists.' },
                                        errors: req.session.errors,
                                        loggedIn: req.session.user !== undefined
                                    });
                                    req.session.errors = null;
                                }
                                // If user does not exist, create user.
                                else {
                                    const data = {
                                        email: email,
                                        password: hash,
                                        forename: forename,
                                        surname: surname,
                                        role: 'user'
                                    }
                                    // Create user
                                    User.create(data)
                                        .then((newUser, created) => {
                                            console.log('User has been created:', data);
                                            res.redirect('/login');
                                        })
                                        .catch(error => {
                                            console.log('Failed to create user.');
                                            res.redirect('/signup');
                                        })
                                }
                            });
                    });
                });
            }
        },
        login: (req, res) => {
            // Check input validity.
            req.check('email', 'Invalid email address')
                .isEmail();
            req.check('password', 'Password is invalid')
                .isLength({ min: 5 })
                .matches(/\d/); // Password contains a number.
            const errors = req.validationErrors();
            if (errors) {
                res.render('form', {
                    title: 'Log In',
                    flash: {
                        message: 'Could not be signed in'
                    },
                    errors: errors,
                    loggedIn: req.session.user !== undefined
                });
                req.session.errors = null;
            } else {
                User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                    .then(user => {
                        const dbUser = user.dataValues;
                        // Compare form password with password from user table.
                        bCrypt.compare(req.body.password, dbUser.password, (err, result) => {
                            if (err) {
                                console.error(error);
                            }
                            if (result === true) {
                                const userInfo = {
                                    id: dbUser.id,
                                    forename: dbUser.forename,
                                    surname: dbUser.surname,
                                    join_date: dbUser.createdAt
                                };
                                req.session.user = userInfo;
                                req.app.locals.user = userInfo;
                                res.redirect('/todos');
                            }
                        });
                    })
                    .catch(error => {
                        console.log('User does not exist.');
                        res.render('form', {
                            title: 'Log In',
                            flash: { message: 'User does not exists.' },
                            errors: req.session.errors,
                            loggedIn: req.session.user !== undefined
                        });
                        req.session.errors = null;
                    });
            }
        }
    }
}

module.exports = database;
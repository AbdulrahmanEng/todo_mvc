const bCrypt = require('bcrypt');
const User = require('./models').user;

const database = {
    auth: {
        register: (req, res) => {
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
                                res.render('form', Object.assign({}, data, { flash: { message: 'User already exists.' } }));
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
                                        res.redirect('/login');
                                    })
                                    .catch(error => {
                                        res.redirect('/signup');
                                    })
                            }
                        });
                });
            });
        },
        login: (req, res) => {
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
            .catch(error=>{
                console.log('User does not exist.');
                res.redirect('/login');
            })
        }
    }
}

module.exports = database;
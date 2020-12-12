const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.singup = async (req, res) => {
    await bcrypt.hash(req.body.password, 10)
        .then(async hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                specialize: req.body.specialize
            });
            await user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created!',
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Invalid authentication credentials!'
                })
            });

        })
};

exports.login = async (req, res) => {
    let feachedUser;
    await User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User does not exist in the database"
                });
            }
            feachedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    message: 'Your password is incorrect, please enter another one'
                });
            }
            const accessToken = jwt.sign({
                email: feachedUser.email,
                userId: feachedUser._id,
                role: [feachedUser.role]
            }, process.env.SECRET_TOKEN, { expiresIn: "24h" });

            res.status(200).json({
                accessToken,
                expiresIn: '24h',
                userId: feachedUser._id,
                email: feachedUser.email,
                name: feachedUser.name
            })
        })
        .catch(() => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        })
};
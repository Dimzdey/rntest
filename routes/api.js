const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {User} = require('../models/User.model');

router.post('/user', (req, res) => {
    let body = _.pick(req.body, ['email', 'firstname', 'lastname']);

    let newUser = new User({
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
    });

    if (!body.email || !body.firstname || !body.lastname) {

        res.status(400).json({
            success: false,
            message: 'Please fill in all fields'
        });

    } else {
        newUser.save().then(() => {

            res.status(200).json({
                success: true,
                message: 'New user created'
            });

        }).catch((e) => {

            res.status(400).json({
                success: false,
                message: 'Failed to create',
                error: e.message
            });

        });
    }
});


router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).json({
            success: true,
            users: users
        });
    });
});

router.put('/user/:id', (req, res) => {
    let body = _.pick(req.body, ['email', 'firstname', 'lastname']);
    let userId = req.params.id;

    if (!userId) {
        res.status(404).json({
            success: false,
            message: 'Please provide user ID'
        })
    } else {
        User.findByIdAndUpdate(userId, {
            email: body.email,
            firstname: body.firstname,
            lastname: body.lastname
        }).then(result => {
            if (!result) {
                res.status(400).json({
                    success: false,
                    message: 'No such user'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'User has been updated'
                })
            }
        }).catch(e => {
            res.status(400).json({
                success: false,
                message: e.message
            })
        });
    }
});

router.delete('/user/:id', (req, res) => {
    let userIdToDelete = req.params.id;

    User.findByIdAndRemove(userIdToDelete)
        .then(result => {
            if (!result) {
                res.status(400).json({
                    success: false,
                    message: 'No such user'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'User hasa been successfully removed'
                });
            }
        })
        .catch(e => {
            res.status(400).json({
                success: false,
                message: e.message
            })
        });
});


module.exports = router;
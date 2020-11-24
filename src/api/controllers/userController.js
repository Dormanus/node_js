const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const regex = /^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[a-zA-Z]{2,4}$/;
const saltRounds = 10;

exports.create_an_user = (req, res) => {
    let new_user = new User(req.body);

    if(req.body.email.match(regex)){

        new_user.save((error, user) => {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            user.password = hash;
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur."
                })
            } else {
                res.status(201);
                res.json({
                    message: `Utilisateur crée : ${user.email}`
                })
            }
            });
        })
    }
    else{
        res.status(500);
        console.log(error);
        res.json({
            message: "Erreur serveur."
        })
    }
}

exports.login_an_user = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            if (user.password === req.body.password) {
                jwt.sign({
                    email: user.email,
                    role: "user"
                }, process.env.JWT_SECRET, {
                    expiresIn: '30 days'
                }, (error, token) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({
                            message: "Mot de passe ou email erroné."
                        })
                    } else {
                        res.json({
                            token
                        })
                    }
                })
            } else {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Mot de passe ou email erroné."
                })
            }


        }
    })
}
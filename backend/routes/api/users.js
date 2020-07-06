const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//score model
const User = require('../../models/userModel');


//GET api/users
//get all user information


router.get("/", (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})


//route PUT api/users
//updating users totalHandicap

router.put('/:userId', (req, res) => {

    User.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, user) => {
        if (err) {
            res.status(500)
        }
        return res.send(user)
    })

})



//route POST api/users

//register new users

router.post('/', (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }

    //check for exsiting user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exsists" });
        })

    const newUser = new User({
        email,
        password
    });

    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash
            newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    email: user.email
                                }
                            })
                        }
                    )

                })
        })
    })
});


module.exports = router;
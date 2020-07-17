const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const JWTSECRET = process.env.JWT_SECRET;

//score model
const User = require('../../models/userModel')

//route POST api/auth
//authenticate user

router.post('/', (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }

    //check for exsiting user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exsist" })

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

                    jwt.sign(
                        { id: user.id },
                        JWTSECRET,
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
});


//route GET api/auth/user
//get user data Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user)
        })
        ;
})


module.exports = router;
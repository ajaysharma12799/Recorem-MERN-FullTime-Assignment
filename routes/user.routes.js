const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.get('/:id', async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        return res.json({error: error.message});
    }
})

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({email});
        if(user) {
            return res.status(400).json({error: "User Already Exists"});
        }
        user = new UserModel({ email, password });
        const salt = await bcrypt.genSalt(10); // Genetating Salt for Password Hashing
        user.password = await bcrypt.hash(password, salt); // Hashing Password
        await user.save(); // Saving user in db
        const payload = { // Returning Payload to Frontend
            user: {
                id: user.id,
                email: user.email,
            }
        };
        jwt.sign(payload, process.env.JWTSecret, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) {
                console.log(error);
                throw error;
            }
            return res.status(200).json({token}); // Returning Token
        })
    } catch (error) {
        console.log(error.message);
        return res.json({error: error.message});
    }
}); // Route to Register User

module.exports = router;
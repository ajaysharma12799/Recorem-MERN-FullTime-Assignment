const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const auth = require("../middleware/Auth");

router.get("/", auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password"); // Find user from DB and remove password from user object
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({error: error.message});
    }
}); // Route to get LoggedIn User

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({email});
        if(!user) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password); // Comparing User entered Password with registered user password
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

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
}); // Route to Login User

module.exports = router;
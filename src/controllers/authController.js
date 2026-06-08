const { Auth } = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash_password = bcrypt.hash(password, 10);

        const user = await Auth.create({
            name,
            email,
            password: hash_password
        });

        res.status(201).json({ message: 'User Registered Successfully.', user });
    } catch (error) {
        console.log(error)
        res.json('Error', error)
    }
}


const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash_password = bcrypt.hash(password, 10);

        const user = await Auth.create({
            name,
            email,
            password: hash_password
        })

        res.status(201).json({ message: 'User Registered Successfully.', user });
    } catch (error) {
        console.log(error);
        res.json('Error', error)
    }
}


module.exports = { register, login }
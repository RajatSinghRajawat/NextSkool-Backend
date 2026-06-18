const { Auth } = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(422).json('All fields are required, Please fill all the fields.')
        }

        const hash_password = await bcrypt.hash(password, 10);

        const user = await Auth.create({
            name,
            email,
            password: hash_password
        });

        if (user) {
            const token = await jwt.sign({ id: user._id }, 'Secret_Key', { expireIn: '1d' });
        }

        res.status(201).json({ message: 'User Registered Successfully.', user, token });
    } catch (error) {
        res.status(500).json(error)
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json('All fields are required, Please fill all the fields.')
        }

        const user = Auth.find({ email });
        
        const verifing_Password = await bcrypt.compare(password, user.password);

        if (verifing_Password) {
            const token = await jwt.sign({ id: user._id }, 'Secret_Key', { expireIn: '1h' });
        }

        res.status(200).json({ message: 'User Registered Successfully.', user });
    } catch (error) {
        res.status(500).json(error)
    }
}


const logout = async (req, res) => {
    try {
        jwt.sign({ expireIn: null });
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = { register, login, logout };
const User = require("../models/User");
const Student = require("../models/students");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Email regex helper
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields (name, email, password) are required.' 
            });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 2 characters long.'
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long.'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'A user with this email already exists.' 
            });
        }

        // Hash password
        const hash_password = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hash_password,
            role: 'student'
        });

        // Create the linked Student profile in database
        const student = await Student.create({
            userId: user._id,
            FullName: name.trim(),
            Email: email.trim().toLowerCase(),
            MobileNumber: "" // Initially empty, can be updated later by student
        });

        // Sign JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'Secret_Key', 
            { expiresIn: '1d' }
        );

        // Exclude password from the returned user details
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(201).json({ 
            success: true, 
            message: 'User Registered Successfully.', 
            user: userResponse, 
            student,
            token 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ 
                success: false, 
                message: 'All fields are required. Please fill all the fields.' 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password.' 
            });
        }
        
        const verifying_Password = await bcrypt.compare(password, user.password);
        if (!verifying_Password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password.' 
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'Secret_Key', 
            { expiresIn: '1d' }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({ 
            success: true, 
            message: 'User Logged In Successfully.', 
            user: userResponse, 
            token 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).json({ 
            success: true, 
            message: 'Logged out successfully.' 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { register, login, logout };
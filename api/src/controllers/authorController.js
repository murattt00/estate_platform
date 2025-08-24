const Author = require('../models/Author');
const bcrypt = require('bcrypt');
const session = require('express-session');


exports.createAuthor = async (req, res) => {
    try {
        const newAuthor = await Author.create(req.body);
        res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating author', error });
    }
};

exports.loginAuthor = async (req,res) => {
    const author = await Author.findOne({email: req.body.email });
    if(author){
        const same = await bcrypt.compare(req.body.password, author.password);
        if(same){
            req.session.userID = user._id;
            res.status(200).json({ message: 'Login successful', author });
        }else{
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }else{
        res.status(404).json({ message: 'Author not found' });
    }
};

exports.logoutAuthor = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', err });
        }
        global.userIN = null;
        res.status(200).json({ message: 'Logout successful' });
    });
};

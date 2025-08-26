const Author = require('../models/Author');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
        if(!same){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: author._id, email: author.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        res.status(200).json({ 
            message: 'Login successful', 
            token,
            author:{
                  id: author._id,
                name: author.name,
                email: author.email
            }
        });

    }else{
        res.status(404).json({ message: 'Author not found' });
    }
}
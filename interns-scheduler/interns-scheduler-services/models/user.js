var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            dropDups: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        email: {
            type: String,
            unique: true
        }
    },
    {
        collection: 'users'
    }
);

var User = mongoose.model('User', userSchema);

module.exports = User;
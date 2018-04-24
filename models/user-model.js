const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    googleId: {
        type: String
    }
});

// it's use user collection
const User = dynamoose.model('user', userSchema);

module.exports = User;
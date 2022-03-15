const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    //this line of code is to be able to identify each goal created to a user.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true,
}
)

module.exports = mongoose.model('Goal', goalSchema)
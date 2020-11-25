var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    membership: {
        type: Number,
        required: true
    }
});

// PlantSchema.virtual('link').get(function () {
//     return `/inventory/plant/${this._id}`;
// });

// Export model
module.exports = mongoose.model('User', UserSchema);
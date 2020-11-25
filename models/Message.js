var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    timestamp: {
        type: String,
        required: true,
    },
    text: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// PlantSchema.virtual('link').get(function () {
//     return `/inventory/plant/${this._id}`;
// });

// Export model
module.exports = mongoose.model('Message', MessageSchema);
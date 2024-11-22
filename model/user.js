const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    shortId: {
        type: String,
        required: true,  // Changed `require` to `required`
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,  // Changed `require` to `required`
    },
    VisiteHistory: [
        {
            timestamp: { type: Number } // Changed `timestamps` to `timestamp`
        }
    ]
}, { timestamps: true });  // Keep global timestamps for createdAt and updatedAt

const URL = model("url", UserSchema);
module.exports = URL;

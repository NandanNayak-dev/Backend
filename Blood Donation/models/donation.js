const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    
    date: {
        type: Date,
        required: true,
    },
});
const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
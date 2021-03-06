const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    gender: { type: String, required: true },
    gymMembership: [{ type: String, required: true }],
    athleteTypes: [{ type: String, required: true }],
    image: { type: String, required: true },
    likes: { type: Number, required: true },
    backgroundImage: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    interests: [{ type: mongoose.Types.ObjectId, required: true, ref: "Tag" }],
    // Creator create an appoinment
    appointments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Appointment" }],
    // User recieve an appoinment, pending
    invitations: [{ type: mongoose.Types.ObjectId, required: true, ref: "Appointment" }],
    reviews: [{ type: mongoose.Types.ObjectId, required: true, ref: "Review" }],
    likedPosts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
    posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
    collections: [{ type: mongoose.Types.ObjectId, required: true, ref: "Collection" }],
    follows: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    followers: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
    unreadNotifications: { type: Number, required: true },
    unreadComments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
    date: { type: Date, default: Date.now },
});

//? WIth unique, we can query form db as fast as possible.
//? With uniqueValidator, we make sure we can only create user if email doesnot exist.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)

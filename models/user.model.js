// Import necessary modules
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["pupil", "leader"]
    }
});

const PupilSchema = new mongoose.Schema({
    leader: {
        type: String
    }
})
PupilSchema.add(UserSchema);

// Create a new model using the UserSchema
const User = mongoose.model("User", UserSchema);
const Pupil = mongoose.model("Pupil", PupilSchema);

export {User, Pupil};

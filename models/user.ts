import mongoose from "mongoose";

const user = new mongoose.Schema({
    personalCode: {
      required: true,
      type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    password: {
      required: true,
      type: String
    },
    admin: {
      required: true,
      type: Boolean
    },
    created: {
      required: true,
      type: Date
    },
    contact: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'Contact'
      }
})

export default mongoose.model('User', user);
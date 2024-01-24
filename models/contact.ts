import mongoose from "mongoose";

const contact = new mongoose.Schema({
    address: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
      }
})

export default mongoose.model('ContactData', contact);
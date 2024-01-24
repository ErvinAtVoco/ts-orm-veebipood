import mongoose from "mongoose";

const document = new mongoose.Schema({
    type: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: Number
    },
    country: {
        required: true,
        type: String
    },
    creationDate: {
        required: true,
        type: Date
    },
    effectiveDate: {
        required: true,
        type: Date
    },
    countryOfOrigin: {
        required: true,
        type: String
    }

    
})

export default mongoose.model('ContactData', document);
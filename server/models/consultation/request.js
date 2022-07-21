import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    direction: {type: String, required: true},
    service: {type: String, required: true},
    lang: {type: String, required: true}, 
    status: {type: String, default: 'new'}
}, {
    timestamps: true
});

export default mongoose.model('ConsultationRequest', requestSchema);
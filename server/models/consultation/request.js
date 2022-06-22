import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    branch: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultationBranch', required: true},
    service: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultationService', required: true},
    status: {type: String, default: 'new'}
}, {
    timestamps: true
});

export default mongoose.model('ConsultationRequest', requestSchema);
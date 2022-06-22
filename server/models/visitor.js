import mongoose from "mongoose";

const visitorSchema = mongoose.Schema({
    ip: String,
    date: Date
});

export default mongoose.model('Visitor', visitorSchema);
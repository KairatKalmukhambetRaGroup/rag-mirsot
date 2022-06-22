import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
    name_kz: String,
    name_ru: String,
    name_en: String,
}, {
    timestamps: true
});

export default mongoose.model('ConsultationBranch', branchSchema);
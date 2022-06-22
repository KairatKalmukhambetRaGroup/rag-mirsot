import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name_kz: String,
    name_ru: String,
    name_en: String,
}, {
    timestamps: true
});

export default mongoose.model('ConsultationService', serviceSchema);
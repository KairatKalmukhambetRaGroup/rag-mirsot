import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    title:{
        ru: String,
        en: String,
        kz: String,
    },
    subtitle:{
        ru: String,
        en: String,
        kz: String,
    },
}, {
    timestamps: true
});

export default mongoose.model('Card', cardSchema);
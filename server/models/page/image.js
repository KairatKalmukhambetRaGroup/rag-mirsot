import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    src: String,
    name: {
        type: String,
        unique: true,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('Image', imageSchema);
import mongoose from "mongoose";

const pageSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    title: {
        kz: String,
        ru: String,
        en: String
    },
    subpages: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Page'
    }],
    blocks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ContentBlock'
    }],
    showOnHeader: {type: Boolean, default: true}
}, {
    timestamps: true
});

var autoPopulate = function(next) {
    this.populate('blocks');
    next();
};

pageSchema
.pre('findOne', autoPopulate)
.pre('find', autoPopulate)

export default mongoose.model('Page', pageSchema);

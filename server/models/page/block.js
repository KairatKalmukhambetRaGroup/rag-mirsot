import mongoose from "mongoose";


const blockSchema = mongoose.Schema({
    type: {type: String, required: true},
    classname: String,
    text: {
        kz: String,
        ru: String,
        en: String
    },
    src: String,
    href: String,
    id: String,
    subblocks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ContentBlock',
    }],
    editable: {type: Boolean, default: true}
}, {
    timestamps: true
});

var autoPopulate = function(next) {
    this.populate('subblocks');
    next();
};

blockSchema
    .pre('findOne', autoPopulate)
    .pre('find', autoPopulate)


export default mongoose.model('ContentBlock', blockSchema);
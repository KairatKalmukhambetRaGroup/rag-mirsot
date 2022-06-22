import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const blockSchema = mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, slug: "name", unique: true},
    block_type: {type: String, required: true},
    classname: String,
    text_kz: String,
    text_ru: String,
    text_en: String,
    src: String,
    href: String,
    subblocks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ContentBlock',
    }]
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
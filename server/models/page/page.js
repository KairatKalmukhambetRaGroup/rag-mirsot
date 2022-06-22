import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const pageSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    title_kz: String,
    title_ru: String,
    title_en: String,
    slug: {type: String, slug: "name", unique: true},
    blocks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ContentBlock'
    }]
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

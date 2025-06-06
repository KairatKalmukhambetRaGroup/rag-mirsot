import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const roleSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, slug: "name"}
},{
    timestamps: true
});

export default mongoose.model('Role', roleSchema);
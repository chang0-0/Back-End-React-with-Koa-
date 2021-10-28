import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  published: {
    type: Date,
    default: Date.now,
  },
});

const ImageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Post = mongoose.model('Post', PostSchema);
const Image = mongoose.model('Image', ImageSchema);

export default { Image, Post };

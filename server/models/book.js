import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    authorname: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    booksummary: {
      type: String,
      required: true,
      maxlength: 512,
      trim: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    currentexchange: {
      type: Boolean,
      required: true,
      default: false,
    },
    exchangedate: {
      type: Date,
      default: Date.now,
    },
    returndate: {
      type: Date,
      required: true,
    },
    coverphoto: {
      type: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

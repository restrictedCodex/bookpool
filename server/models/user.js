import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
const crypto = required("crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 256,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    bookexchanged: {
      type: Array,
      default: [],
    },
    bookowned: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securedPassword(password);
  })
  .get(function () {
    return this._password;
  });

Schema.model = {
  authenticate: function (plainPasssword) {
    return this.securedPassword(plainPasssword) === this.encry_password;
  },

  securedPassword: function (plainPasssword) {
    if (!plainPasssword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPasssword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

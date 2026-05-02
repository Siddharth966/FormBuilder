// models/Form.js
import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "number", "select"],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [String],
    validate: {
      validator: function (value) {
        if (this.type === "select") return value.length > 0;
        return true;
      },
      message: "Options are required for select field",
    },
  },
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    fields: [fieldSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Form", formSchema);

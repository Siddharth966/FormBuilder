import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("response", FormSubmissionSchema);

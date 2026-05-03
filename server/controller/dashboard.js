import Form from "../model/Form.js";
import Response from "../model/Response.js";

export const getDashboardItems = async (req, res) => {
  try {
    const forms = await Form.find().select("title");

    const final = await Promise.all(
      forms.map(async (form) => {
        const responseCount = await Response.countDocuments({
          formId: form._id,
        });

        return {
          _id: form._id,
          title: form.title,
          responseCount,
        };
      })
    );

    res.status(200).json({
      totalForms: forms.length,
      data: final,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
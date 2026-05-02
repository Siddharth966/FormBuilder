import Response from "../model/Response.js";

export const createResponse = async (req, res) => {
  try {
    const { formId, data } = req.body;
    const response = await Response.create({ formId, data });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResponsesByForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ formId }).populate("formId");
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id).populate("formId");
    if (!response)
      return res.status(404).json({ message: "Response not found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResponse = async (req, res) => {
  try {
    const response = await Response.findByIdAndDelete(req.params.id);
    if (!response)
      return res.status(404).json({ message: "Response not found" });
    res.status(200).json({ message: "Response deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/form.controller.js

import Form from "../model/Form.js";

// Create form
export const createForm = async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all forms
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find()
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFormById = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id, // ID from URL hai
      req.body, // data to update krna hai
      { new: true, runValidators: true }, // return updated doc hai
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete form karne ke liye
export const deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



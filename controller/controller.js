const Student = require("../model/model");
module.exports = {
  create_data: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(404).json({ message: "all fields are required!" });
      }
      const createuser = await Student.create(req.body);
      res.status(201).json({ createuser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  get_all_data: async (req, res) => {
    try {
      const createuser = await Student.find();
      res.status(200).json({ createuser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  get_data_by_id: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Student.findById({ id });
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      } else {
        res.status(200).json({ data: result });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updata_data: async (req, res) => {
    const result = await Student.findByIdAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ data: result });
  },

  delete_data: async (req, res) => {
    try {
      const result = await Student.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const result = await Student.findOne({ email: req.body.email });
    const db_pass = result.password;
    const user_pass = req.body.password;
    if (db_pass == user_pass) {
      res.status(200).json({ message: "login successfully" });
    } else {
      res.status(401).json({ message: "invalid credential" });
    }
  },
};

const express = require("express");
const route = new express.Router();
const {
  create_data,
  get_all_data,
  get_data_by_id,
  updata_data,
  delete_data,
  login,
} = require("../controller/controller");

route.get("/", (req, res) => {
  res.send("hello mr. sadik");
});

route.post("/login", login);

route.post("/create", create_data);

route.get("/getAll", get_all_data);

route.get("/getById/:id", get_data_by_id);

route.patch("/update/:id", updata_data);

route.delete("/delete/:id", delete_data);

module.exports = route;

// Create -: Post mehtod
// Read -: Get method
// Update -: Put/ Patch method
// Delete -: delete method

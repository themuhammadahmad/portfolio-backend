const {getPrevData, addContactData} = require("../utils/functions.js");
const paths = require("../config/paths.js");
const dataFilePath = paths.dataFile;
let prevData = getPrevData(dataFilePath);
function createContact(req, res) {
  const { name, email, message } = req.body;

  // 400 Bad Request – missing fields
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required",
      success: false
    });
  }

  const ExistAlready = prevData.find(item => item.email === email);

  // 409 Conflict – duplicate email
  if (ExistAlready) {
    return res.status(409).json({
      message: "Email already exists",
      success: false
    });
  }

  try {
    addContactData(dataFilePath, { name, email, message });

    // 201 Created – success
    return res.status(201).json({
      message: "Submitted Successfully",
      success: true
    });
  } catch (error) {
    console.error(error);

    // 500 Internal Server Error – catch block
    return res.status(500).json({
      message: "Something went wrong",
      success: false
    });
  }
}


module.exports = {createContact};
// const {getPrevData, addContactData} = require("../utils/functions.js");
// const paths = require("../config/paths.js");
// const dataFilePath = paths.dataFile;
// let prevData = getPrevData(dataFilePath);
const db = require("../firebase/firebase.js");
async function createContact(req, res) {
  const { name, email, message } = req.body;

  // 400 Bad Request – missing fields
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required",
      success: false
    });
  }

  // const ExistAlready = prevData.find(item => item.email === email);

  // 409 Conflict – duplicate email
  // if (ExistAlready) {
  //   return res.status(409).json({
  //     message: "Email already exists",
  //     success: false
  //   });
  // }

  // try {
  //   addContactData(dataFilePath, { name, email, message });

  //   // 201 Created – success
  //   return res.status(201).json({
  //     message: "Submitted Successfully",
  //     success: true
  //   });
  // } catch (error) {
  //   console.error(error);

  //   // 500 Internal Server Error – catch block
  //   return res.status(500).json({
  //     message: "Something went wrong",
  //     success: false
  //   });
  // }


  

   try {
        const existingUser = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const docRef = await db.collection('users').add({ name, email, message });
    res.status(201).json({ message: 'User added', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
}


module.exports = {createContact};
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

   try {
        const existingUser = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({ error: 'Email already exists', success: false });
    }
    
    const docRef = await db.collection('users').add({ name, email, message });
    res.status(201).json({ message: 'Submited Successfully', id: docRef.id, success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}


module.exports = {createContact};
const { v4: uuidv4 } = require('uuid');
const db = require("../firebase/firebase.js");
async function trackVisitor(req, res) {
  const visitorId = req.cookies.visitor_id;

  // Visitor already counted
  if (visitorId) {
    return res.status(200).json({ message: "Returning visitor", success: true });
  }

  try {
    const newVisitorId = uuidv4();

    // Save new visitor in Firestore
    await db.collection('visitors').add({
      visitorId: newVisitorId,
      timestamp: new Date()
    });

    // Set cookie for future visits
    res.cookie('visitor_id', newVisitorId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      sameSite: 'Lax'
    });

    res.status(201).json({ message: "New visitor counted", success: true });
  } catch (error) {
    console.error("Visitor tracking failed:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}

module.exports = { trackVisitor };
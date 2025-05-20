const admin = require('firebase-admin');
const serviceAccount = require('./portfolio-ba819-firebase-adminsdk-fbsvc-47a888752e.json');


admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
  }),
});


const db = admin.firestore();

// Optional: Check connection by writing and reading a test document
(async () => {
  try {
    const testDocRef = db.collection('connectionTest').doc('test');
    await testDocRef.set({ connectedAt: new Date().toISOString() });
    const doc = await testDocRef.get();

    if (doc.exists) {
      console.log('✅ Successfully connected to Firestore.');
    } else {
      console.log('⚠️ Test document not found, something may be wrong.');
    }
  } catch (error) {
    console.error('❌ Error connecting to Firestore:', error.message);
  }
})();

module.exports = db;

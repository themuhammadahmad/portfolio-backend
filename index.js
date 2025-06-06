const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const contactRoutes = require("./routes/contactRoutes.js");
const {trackVisitor} = require("./controllers/visitControllers.js");
const db = require("./firebase/firebase.js");
const app = express();
const PORT = process.env.PORT || 5000;
// middlewares
app.use(cors({
  origin: "https://muhammad-ahmad-iota.vercel.app",
  credentials: true
}));
// app.use(cors({
//   origin: "http://localhost:5173", // 👈 your frontend's origin
//   credentials: true               // 👈 allow cookies
// }));

app.use(cookieParser());
app.use(express.json());



// app routes
app.get("/asdf@57000", async (req, res) => {
   const snapshot = await db.collection('visitors').get();

     res.json({
        message: "Working fine",
        NumberOfVisitors: snapshot?.size
     });
})

app.use("/api/contact", contactRoutes);
app.use("/track-visitor", trackVisitor);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
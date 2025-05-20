const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// middlewares
app.use(cors());
// app.use(cors({
//   origin: "https://muhammad-ahmad-iota.vercel.app"
// }));
app.use(express.json());

// app routes
app.get("/", (req, res) => {
     res.json({
        message: "Hello World"
     });
})

app.use("/api/contact", contactRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
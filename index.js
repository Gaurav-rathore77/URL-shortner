require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const urlRoute = require('./routes/user');
const mdConnect = require('./connect/user');
const URL = require('./model/user');
const staticRouter = require('./routes/static')
const menRouter = require('./routes/men')
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use('/',staticRouter)
app.set("view engine" , "ejs")
app.set("/views", path.resolve('./views'))

// app.get("/",async (req,res)=>{
//     const allUrl = await URL.find({})
//     return res.render('home',{
//         urls : allUrl,
//     })
// })

// Route setup
app.use('/men' ,menRouter )
app.use('/url', urlRoute);

// Database connection
mdConnect(process.env.MONGO_URL);

// GET route for redirecting based on shortId
app.get('/api/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        // Find and update the entry with the shortId
        const entry = await URL.findOneAndUpdate(
            { shortId }, // Find by shortId
            { $push: { VisiteHistory: { timestamp: Date.now() } } }, // Update with new visit timestamp
            { new: true } // Return the updated document
        );

        // Check if entry exists
        if (!entry) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Redirect to the original URL
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error during redirection:", error);
        res.status(500).json({ error: "An error occurred during redirection" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

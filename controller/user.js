const shortid = require("shortid");
const URL = require('../model/user');

async function handleShortIdGenrator(req, res) {
    const body = req.body;

    // Check if URL is provided
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortID = shortid.generate();

    try {
        // Create a new short URL entry in the database
        const newEntry = await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            VisiteHistory: []
        });

        // Respond with the generated short ID
        
        return res.render('home' ,{
            id : newEntry.shortId
        })
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "An error occurred while generating the short URL" });
    }
}
async function handleAnalytics(req, res) {

    const shortId = req.params.shortId;


    try {
        // Find the URL entry by shortId
        const result = await URL.findOne({ shortId });
        
        
        // Check if the result exists
        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Return the total clicks and visit history
        return res.json({
            totalClicks: result.VisiteHistory.length,
            analytics: result.VisiteHistory
        });
    } catch (error) {
        console.error("Error in handleAnalytics:", error);
        return res.status(500).json({ error: "An error occurred while fetching analytics" });
    }
}

module.exports ={
    handleShortIdGenrator,
    handleAnalytics,

}
const express = require("express")
const router = express.Router()
// const URL = require('../model/user')

// router.get('/', async (req, res) => {
//     try {
//         const allUrl = await URL.find({});
//         return res.render('home', {
//             urls: allUrl,
//         });
//     } catch (error) {
//         console.error("Error fetching URLs:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// });

router.get('/', (req,res) =>{
    return res.render('signup')
});

router.get('/home',(req,res)=>{
    return res.render('home')
})



router.get('/login' , (req,res)=>{
    return res.render('login')
})
module.exports = router;
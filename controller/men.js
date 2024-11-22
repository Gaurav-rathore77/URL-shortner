const IIT = require("../model/men")

async function handleBond(req,res) {
    const {name , email , password} = req.body

    await IIT.create({
        name,
        email,
        password,

    })
    return res.render('home')
}

async function toLogin(req, res) {
    try {
        // Destructure name and password from request body
        const { email, password } = req.body;

        // Check if both name and password are provided
        if (!email || !password) {
            return res.render('login', {
                Err: "Both name and password are required!",
            });
        }

        // Log for debugging
        console.log(`Login Attempt: name=${email}, password=${password}`);

        // Find user in database
        const user = await IIT.findOne({ email, password}); 

        // If user is not found
        if (!user) {
            return res.render('login', {
                Err: "Invalid credentials. Please try again.",
            });
        }

        // Successful login
        console.log('Login successful');
        return res.render('home');

    } catch (error) {
        // Catch and log any unexpected errors
        console.error('Error during login:', error);
        return res.render('login', {
            Err: "An unexpected error occurred. Please try again later.",
        });
    }
}


module.exports = {
    handleBond,
    toLogin,
}
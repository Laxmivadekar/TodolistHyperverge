const express = require("express")
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const jwtSecret = "mysuperdupersecret";
const { check,validationResult }=require("express-validator")
const auth=require("../../middleware/auth");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  public


/** 
 @api {post} /api/v1/users  for login(authention) of user
 * @apiName postusers
 * @apiGroup user
 *
 * @apiSuccess {String}  email of the user
 * @apiSuccess {number}  password of the user
 * 
 * @apiSuccess jwtoken
 * 
 * @apiError {String} 500
 * @apiError msg:server error
; */
router.get("/",auth,async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")  
        res.json(user);                
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// Get user information for the authenticated user
// @route   POST api/usersnom run generate:docs
// @desc    authentication user and GET token
// @access  public
router.post("/",[

    check("email","please include a valid email").isEmail(),
    check(
        "password",
        "password is required"
    ).exists()

],
async(req,res) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return;
    }

    const { email,password }=req.body;

    try{
        // see if user exists
        const user = await User.findOne({ email })

        if(!user) {
            // res.send("user route");        
            res.status(400).json({ errors: [ { msg: "Invalid credentials" }]});
            return;
        }
       

        
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
           res.status(400).json({ errors: [ { msg: "Invalid credentials" }]});
           return;
        }

        
        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign( 
            payload, 
            jwtSecret,
            { expiresIn:360000},
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            } )

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
        
    }   
})

module.exports=router;
             
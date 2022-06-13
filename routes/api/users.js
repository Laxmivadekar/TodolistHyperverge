const express = require("express")
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwtSecret = "mysuperdupersecret";
const jwt=require("jsonwebtoken")
const config = require("config")
const { check,validationResult }=require("express-validator")
const User=require("../../models/User")

/** 
 @api {post} /api/v1/users  for regestration of user
 * @apiName postUsers
 * @apiGroup users
 *
 * @apiSuccess {String} name of the user
 *  @apiSuccess {String} email email of the user
 * @apiSuccess {number} password password of the user
 * 
 * @apiSuccess jwtoken
 * 
 * @apiError {String} 500
 * @apiError msg:server error
; */
router.post("/",[
    check("name","Name is required")  // with rout we can listen another routes
        .not()
        .isEmpty(),
    check("email","please include a valid email").isEmail(),
    check(
        "password",
        "please enter a password with 6 or more characters"
    ).isLength({ min:6 ,max:12 }),

    // email checking
    check("email").custom(async(email) => {
      const user=await User.findOne({ email})
      if (user){
          throw new Error("email is already exist")
      }
      return true
    })

],
async(req,res) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return;
    }

    const { name,email,password }=req.body;

    try{  
        const user = new User({
            name,
            email,
            password
        })
        // token
        // encrypt password by using bcrypt
        const salt = await bcrypt.genSalt(10);   
        user.password = await bcrypt.hash(password,salt)

        await user.save();
        // return json webtoken
        // res.send("user registered");
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

    }catch(err){ config.get("jwtSecret")
        console.error(err.message);
        res.status(500).send("server error");
         
    }   
})
module.exports=router;






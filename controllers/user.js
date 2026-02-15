const user = require("../models/user");
module.exports.rendersignup=(req,res)=>{
    res.render("user/signup.ejs");
}
module.exports.signup=async(req,res) =>{

    try{
        let {username,email,password} = req.body;
   const newuser = new user({email,username});
   const registeruser = await user.register(newuser,password);
   req.login(registeruser,(err)=>{
    if(err){
        return next(err);
    }
   req.flash("success","welcome to StayEase");
   res.redirect("/listings");
   });
   
   
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

};

module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=async (req,res)=>{
req.flash("success", "you are logged in !!");
let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
};

module.exports.logout=(req ,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out !!");
res.redirect("/listings");
    });
}
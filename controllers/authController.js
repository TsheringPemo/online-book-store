constbcrypt=require('bcryptjs'); 
constdb=require('../config/db'); 

//Signup 
exports.registerUser=async(req,res)=>{ 
    const{name,email,password}=req.body; 
    consthashedPassword=awaitbcrypt.hash(password,10); 

    try{ 
        awaitdb.none('INSERTINTOusers(name,email,password)VALUES($1, $2,$3)', 
            [name,email,hashedPassword]); 
            res.status(201).json({message:'Userregisteredsuccessfully'}); 
        }catch(err){ 
            res.status(500).json({error:'Errorregisteringuser'}); 
        } 
    }; 
    
    //Login 
    exports.loginUser=async(req,res)=>{ 
        const{email,password}=req.body; 
        
        try{ 
            constuser=awaitdb.oneOrNone('SELECT*FROMusersWHEREemail =$1',[email]); 
            
            if(!user){ 
                returnres.status(401).json({error:'Invalidemailorpassword'}); 
            } 
            
            constisMatch=awaitbcrypt.compare(password,user.password); 
            if(!isMatch){ 
                returnres.status(401).json({error:'Invalidemailorpassword'}); 
            } 
            
            req.session.user={id:user.id,name:user.name,email:user.email}; 
            res.json({message:'Loginsuccessful',user:req.session.user}); 
        }catch(err){ 
            res.status(500).json({error:'Errorloggingin'}); 
        } 
    }; 
    
 //Logout 
exports.logoutUser=(req,res)=>{ 
    req.session.destroy(); 
    res.json({message:'Loggedoutsuccessfully'}); 
};
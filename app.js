// Import required modules 
const express = require('express'); 
const path = require('path'); 
const dotenv = require('dotenv') 
const session = require('express-session'); 
const bodyParser = require('body-parser'); 
const db = require('./config/db'); //Import database connection 
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config(); 

//load environment variables 
dotenv.config(); 

// Initialize Express app 
const app = express(); 
const PORT = process.env.PORT || 3000; 

// Set view engine to EJS 
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname,'views')); 

// Serve static files 
app.use(express.static(path.join(__dirname, 'public')));
//Middleware 
app.use(bodyParser.json()); 
app.use(express.urlencoded({extended:true})); 

//Sessionmanagement 
app.use(session({ 
    secret: 'your_secret_key', 
    resave: false, 
    saveUninitialized: true, 
    cookie:{secure:false} 
})); 

//Databasetestroute 
app.get('/db-test',async(req,res)=>{ 
    try{ 
        constresult=awaitdb.one('SELECTNOW()AScurrent_time'); 
        res.json({message: 'Databaseconnectedsuccessfully',time: 
            result.current_time});
        }catch(err){ 
            res.status(500).json({error: 'Databaseconnectionfailed',details:err.message}); 
        } 
    }); 

// Import routes 
const indexRoutes = require('./routes/index'); 
app.use('/', indexRoutes); 
app.use('/auth',authRoutes);

// Start server 
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); 
});
const express  = require('express')
const route = express.Router()
const user = require('../model/user');
const bcrypt = require('bcrypt')



//bcrypt args
const salt = 10;

route.get('/', async function (req,res){

    await user.findById(req.cookies.userid)
    .then(userData=>{
        res.render("index.ejs",{data:userData})
    })
})



route.get('/login', function(req,res){
    if(req.cookies.userid){
        res.redirect("/")

    }
    else{
        res.render('login.ejs')

    }
})



route.get('/signup', (req,res)=>{
    res.render("signup.ejs")
})

route.get('/learn',(req,res)=>{
    res.render('learn');
})

route.get('/questions',(req,res)=>{
    res.render('questions.ejs')
})

route.get("/submissions",(req,res)=>{
    res.render("submissions.ejs")
})  


//API Routes
route.post('/api/signup',async (req,res) => {
    if(!req.body){
        res.send("some error occured")
    }
    else{
        //logic of creating user in mongo database
        await bcrypt.hash(req.body.password,salt,async (err,hash)=>{
            
            if(err){
                console.log(err)
            }

            else{
            const userData = new user({
                username:req.body.username,
                name:req.body.name,
                email:req.body.email,
                password:hash
            })
    
            await userData
            .save(userData)
            .then(data =>{
                res.redirect('/login')
            })
            .catch((err)=>{
                console.log(err)
            })
            
        }
        })
       

    }
});

route.post('/api/login', async (req,res) =>{
    if(!req.body){  
        res.send("Fields can't be empty")
    }
    else{

        await user.findOne({email:req.body.email})
        
        .then(userData=>{
            // let isPaas = await bcrypt.compare(req.body.password,userData.password);
            
            res.cookie('userid' ,userData._id);
            console.log(userData)
            res.redirect("/")
        })
        .catch(e=>{
            res.send(e)
            console.log(e)
        })
    
}


})


module.exports = route;
const express  = require('express')
const route = express.Router()
const user = require('../model/model');

route.get('/', async function (req,res){
    if(!req.cookies.userid){
        res.render("index.ejs",{data:{username:"",name:"",email:""}})
    }
    await user.findById(req.cookies.userid)
    .then(userData=>{
        res.render("index.ejs",{data:userData})
    })
    

})



route.get('/login', function(req,res){
    if(!req.cookies.userid){
        res.render('login.ejs')

    }
    res.redirect("/")
})

route.get('/signup', (req,res)=>[
    res.render("signup.ejs")
])

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
    if(req){
        console.log(req.body)
    }
    //logic of creating user in mongo database
    const userData = new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    userData
    .save(userData)
    .then(data =>{
        res.redirect('/login')
    })
    .catch((err)=>{
        console.log(err)
    })


});

route.post('/api/login', async (req,res) =>{
    if(!req.body){
        res.response("Fields can't be empty")
    }
    await user.findOne({email:req.body.email,password:req.body.password})
    .then(userData=>{
        res.cookie('userid' ,userData._id);

        res.redirect("/")
    })
    .catch(e=>{
        console.log(e)
    })



})


module.exports = route;
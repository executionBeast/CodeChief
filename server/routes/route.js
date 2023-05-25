const express  = require('express')
const route = express.Router()
const user = require('../model/model');

route.get('/',function (req,res){
    // if(document.cookie){
    //     res.json({"content":"Sastaa CodeChef!"})
    // }
    // req.session.views = 1  //it is a way to store data in session
    if(req.session.name){
        res.render('index.ejs',{data:req.session.name,sessTime:"will destroyed in 10 sec"})
    }
    else{
        req.session.name = 'ROHAN'
    res.render('index.ejs',{data:req.session.name,sessTime:"sessTime is Set now"})
    }
})



route.get('/login', function(req,res){
    res.render('login.ejs')
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

route.post('/api/login',(req,res) =>{
    if(!req){
        res.response("Fields can't be empty")
    }


})


module.exports = route;
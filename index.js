const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const PORT  =5500
const app = express()
const route = require('./server/routes/route')
const connectDb = require('./server/database/connectDb')
const session = require('express-session')
const cookieparser = require('cookie-parser')


app.set('title','Sasta Codechef')  //referenced by app.get('title')
app.set('view engine', 'ejs')
app.set('trust proxy',1)


app.use(cookieparser())
app.use(bodyparser.urlencoded({extended:true}))

//initializing express session middleware

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,maxAge:10000}   //if not https then false, false for localhost
    
}))


app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//connect to database
connectDb()


//routes
app.use(route)



app.listen(PORT,()=>{
    console.log(`I am on....http://localhost:${PORT}`)
})

module.exoprts = app
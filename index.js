const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const PORT  =5500
const app = express()
const route = require('./server/routes/route')
const connectDb = require('./server/database/connectDb')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')


app.set('title','Sasta Codechef')  //referenced by app.get('title')
app.set('view engine', 'ejs')


app.use(cookieparser())   //cookie-parser
app.use(bodyparser.urlencoded({extended:true}))





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
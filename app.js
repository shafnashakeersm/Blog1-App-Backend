const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")
const postModel=require("./models/posts")

let app = Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")


//***************************//create a post**********
app.post("/create",async(req,res)=>{
    let input=req.body             //passing input through body
    let token=req.headers.token    //passing token through headers
    jwt.verify(token,"blogApp",async(error,decoded)=>{
        if (decoded && decoded.email) {
            let result=new postModel(input)
            await result.save()
            res.json({"status":"success"})
        } else {
            res.json({"status":"Invalid Authentication"})   //if token is wrong it will not insert
        }
    })
})


//***************************//signin***************
app.post("/signin", async (req, res) => {
let result=userModel.find({email:req.body.email}).then(
    (items)=>{
        if (items.length>0) {
            const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
            if (passwordValidator) {
                jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                    (error,token)=>{
                        if (error) {
                            res.json({"status":"error","errorMessage":error})
                        } else {
                            res.json({"status":"success","token":token,"userId":items[0]._id})
                        }
                    })
            } else {
                res.json({"status":"Incorrect password"})
            }
            
        } else {
            res.json({"status":"Invalid Email Id"})
        }
    }
).catch()
})
   



//*************************//signup*****************
app.post("/signup", async (req, res) => {
    let input = req.body   //collect input
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword   //to store password in req.body
    //cconsole.log(data)   //to display data with only password is hashed
    //res.send(data)    //to send data to check whether it is work or not
    userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "email id already exist" })
            } else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }

        }
    ).catch((error) => { }

    )
})

app.listen(3030, () => {
    console.log("server started")
})
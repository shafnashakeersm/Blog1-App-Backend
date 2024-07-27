const Express=require("express")
const Mongoose=require("mongoose")
const Bcrypt =require("bcrypt")
const Cors =require("cors")
const jwt =require("jsonwebtoken")
const userModel=require("./models/users")

let app=Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")


//*************************//signup*****************
app.post("/signup", async(req,res)=>{
    let input=req.body   //collect input
    let hashedPassword= Bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword   //to store password in req.body
    //cconsole.log(data)   //to display data with only password is hashed
    //res.send(data)    //to send data to check whether it is work or not
    userModel.find({email:req.body.email}).then(
        (items)=>{
            if(items.length>0){
                res.json({"status":"email id already exist"})
            }else{
                let result=new userModel(input)
                result.save()
                res.json({"status":"success"})
            }
               
            }
        ).catch((error)=>{}

)
})

app.listen(3030,()=>{
    console.log("server started")
})
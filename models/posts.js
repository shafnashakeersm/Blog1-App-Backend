const Mongoose = require("mongoose")


const postSchema=Mongoose.Schema(
    {
        userId:{
            type:Mongoose.Schema.Types.ObjectId,
            ref:"users"   //to link objectId in users table (as foreign key from users.js)
        },
        Message:String,

        postedDate:{
            type:Date,
            default:Date.now  //automatically inserted
        }  
    }
)
var postModel=Mongoose.model("posts",postSchema)
module.exports=postModel
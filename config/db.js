import mongoose from "mongoose";
const MONGO_URL= "mongodb://localhost:27017/Oauth"
// console.log(MONGO_URL)

// Connect Database
export const connectDB = mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log("DB Connected Succesfully...."))
.catch((err)=>{
    console.log("DB Connection Failed!")
    console.log(err)
    process.exit(1)
});

export default connectDB;
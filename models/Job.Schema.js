const {Schema,model}=require("mongoose")

const JobList=new Schema({
    company:String,
    postedAt:Number,
    city:String,
    location:String,
    role:String,
    contract:String,
    position:String,
    language:String

},
{
    versionKey:false
})

const JobModel=model("job",JobList)

module.exports=JobModel
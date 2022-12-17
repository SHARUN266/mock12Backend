const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const JobModel=require("./models/Job.Schema")
const app=express()
const PORT=process.env.PORT||8080
app.use(express.json())
app.use(cors())
app.get("/",async(req,res)=>{
    try{
        const page=req.query.page||1;
        const size=req.query.size||10;
        const sort=req.query.sort||"asc"?1:-1
        const filter=req.query.filter||""
        const search=req.query.search||""
        //console.log(search)
        if(filter===""){
            console.log(search)
            const JobList= await (await JobModel.find({language:{$regex:search,$options:"i"}}).sort({postedAt:sort}).skip(((page-1)*size)).limit(size))
            res.status(200).send(JobList)

        }
        
        else{
            console.log(search)
            const JobList= await  JobModel.find({role:filter,language:{$regex:search,$options:"i"}}).sort({postedAt:sort}).skip(((page-1)*size)).limit(size)

            res.status(200).send(JobList)
        }

        

    }catch(e){
        res.status(404).send("Getting data from mongo db failed")
    }
    
})
app.post("/",async(req,res)=>{
    const {company,postedAt,city,location,role,contract,position,language,level}=req.body
    try{
        let job=new JobModel({company,postedAt,city,location,role,contract,position,language,level})
        await job.save()
        res.send(job)
    }catch(e){
        res.status(404).send(e.message)
    }
    
})

mongoose.connect("mongodb+srv://sharun:123@atlascluster.qwa1fxi.mongodb.net/mock12?retryWrites=true&w=majority").then(()=>{
    app.listen(PORT,()=>{
        console.log(`Your app is running now on port no. ${PORT}`)
    })
})
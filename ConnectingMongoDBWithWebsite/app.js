let app = require("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})

app.get("/addCourse.html",(req,res)=>{
    res.sendFile(__dirname+"/addCourse.html");
})

app.get("/deleteCourse.html",(req,res)=>{
    res.sendFile(__dirname+"/deleteCourse.html");
})

app.get("/fetchCourse.html",(req,res)=>{
    res.sendFile(__dirname+"/fetchCourse.html");
})

app.get("/updateCourse.html",(req,res)=>{
    res.sendFile(__dirname+"/updateCourse.html");
})

app.post("/storeDetails",(req,res)=> {
        let id = req.body.id;
        let name = req.body.name;
        let desc=req.body.desc
        let amount=req.body.amount
        
        mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
            db.collection("CoursesTable").insertOne({_id:id,CourseName:name,Description:desc,amount:amount},(err2,result)=>{
            if(!err2){
                console.log(`Result added Succesfully`);
                console.log(result.insertedCount);
            }
            else {
                console.log(err2.message);
            }
            client.close();    
        });
        
        }
    });

    res.sendFile(__dirname+"/home.html")
        
})
app.post("/updateDetails",(req,res)=> {
        let id = req.body.id;
        let amount=req.body.amount
      
        mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
            db.collection("CoursesTable").updateOne({_id:id},{$set:{amount:amount}},(err2,result)=>{
            if(!err2){
                if(result.modifiedCount>0){
                    console.log("Record updated successfully")
                }
                else {
                    console.log("Record didn't update");
                }
            }
                client.close();    
            });
        
        }
    });
        res.sendFile(__dirname + "/updateCourse.html")
        
})

app.post("/deleteDetails",(req,res)=> {
    let id = req.body.id;
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            db.collection("CoursesTable").deleteOne({_id:id},(err2,result)=> {
                if(!err2){
                       if(result.deletedCount>0){
                            console.log("Record deleted successfully")
                       }else {
                            console.log("Invalid Record!!")
                       }
    
                }
                client.close();
            })           
        }
    })
    res.sendFile(__dirname+"/home.html")
})


app.get("/fetchDetails",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    var tinfo=  `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <h1 style="background-color: 	rgb(48,48,48); color: white; text-align: center; margin-top: 0px">List of Courses</h1>
            <div style="margin-left:200px;">
            <table  class="table table-striped table-bordered" style="width:300px; margin-left: 310px; text-align :center;" id="itemList">
            <tr>
            <th style="padding:30px;">Course Id</th>
            <th style="padding:30px;">Course Name</th>
            <th style="padding:30px;">Description</th>
            <th style="padding:30px;">Amount</th>
            </div>
            `
   
    var itemsList=[]
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
      if(!err1){
      let db = client.db("meanstack");
      let cursor = db.collection("CoursesTable").find().toArray(function(err, result) {
        if (err) throw err;
     
          for(let i=0;i<result.length;i++){
            itemsList[i]=result[i]
          }
          console.log(itemsList)
          for(let i=0;i<itemsList.length;i++){
            tinfo+=`<tr>
                      <td style="padding:10px;">${itemsList[i]._id}</td>
                      <td style="padding:10px;">${itemsList[i].CourseName} 
                      </td>
                      <td style="padding:10px;">${itemsList[i].Description}</td>
                      <td style="padding:10px;">${itemsList[i].amount}</td>
                      </tr>`
        }
        tinfo+=`</table>`
      
          res.send(tinfo)
      });

    }

}) 
})


app.listen(9898,()=>console.log("Runing on port nubmer 9898....\n"));
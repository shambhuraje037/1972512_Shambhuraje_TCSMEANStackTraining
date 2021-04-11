
let http = require("http");
let url = require("url");
let port = 9898;
let fs=require("fs")
let ifError= `<div>
              <p>No Such Task to Delete...</p>

              </div>      
            `
let htmlINFO = 
            `
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    
                <form action="/store" method="get">
                <div stylee="">  
                <h1 style="background-color:	rgb(40,40,40); color:white;"><center>Task Planner</center></h1><br/>
                </div>    
                <h3>Add Details</h3>

                    <br/>
                    <label>Employee Id</label>
                    <input type="text" name="empid" style="margin-left:60px"/><br/><br/>
        
                    <label >Task Id </label>
                    <input type="text" name="taskid" style="margin-left:100px"/><br/><br/>
        
                    <label>Task</label>
                    <input type="text" name="task" style="margin-left:118px"/><br/><br/>
       
                    <div>
                    <label>DeadLine</label>
                    <input type="date" name="date" style="margin-left:82px"/>&nbsp;&nbsp;
                    <input type="submit" value="Add Task"/>
                    </div>
                </form>
                <br/>
                <hr>
                <br/>
                <form action="/remove" method="get">
                    <h3>Delete Task</h3>
                    <br/>
                    <div>
                    <label>Task Id</label>
                    <input type="text" name="taskid"/>&nbsp;&nbsp;
                    <input type="submit" value="Delete Task"/>
                    </div>    
                </form>
        
                <div>
                    <form action="/display" method="get">
                        <input type="submit" value="Show Tasks" style="margin-left:250px"/>
                    </form>
                </div>
            `
let server = http.createServer((req,res)=> {
    //console.log(url.parse(req.url,true))
    var pathInfo = url.parse(req.url,true).pathname;
    if(req.url=="/")
    {
        res.setHeader("content-type","text/html"); 
        res.end(htmlINFO);
        
    }
    else 
        if(pathInfo=="/store"){  
            res.setHeader("content-type","text/html");  
            res.end(htmlINFO);
            var data = url.parse(req.url,true).query;
            let eid=data.empid 
            let tid=data.taskid
            let task=data.task
            let deadline=data.date
            let emp1={"empId":eid,"taskId":tid,"task":task,"deadline":deadline}
            
            fs.readFile('task.json',function(err,data){
                var obj=JSON.parse(data)
                obj.push(emp1)
                var empString = JSON.stringify(obj);
                fs.writeFile("task.json",empString,(err)=> {
                if(!err)
                {
                    console.log("Record stored successfully...")
                }
                else
                    console.log("Error occured...")
                
            })
        })
        
        }
        else if(pathInfo=="/display")
        {
              
            res.setHeader("content-type","text/html"); 
            var data=fs.readFileSync('task.json')
            let  obj=JSON.parse(data)
            var tinfo
                 
            console.log(obj)
            tinfo=  `<div class="inner-table" style="margin-left:450px">
            <table class="table table-striped table-bordered" style="width:500px; margin-left: 60px; text-align :center;" id="itemList" >
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Task ID</th>
                        <th>Task Name</th>
                        <th>Deadline</th>
                    </tr>
                
                
           `
                for(let i=0;i<obj.length;i++){
                    console.log(obj[i].empId)
                    tinfo+=  `
                    
                    <tr>
                    <td>${obj[i].empId}</td>
                    <td>${obj[i].taskId} 
                    </td>
                    <td>${obj[i].task}</td>
                    <td>${obj[i].deadline}</td>
                    </tr>
                      
                      `
                     
                      
                }
                tinfo+=  `
                </thead>
                <tbody>
                </tbody>
                </table>
                </div>
                `
                res.end(htmlINFO+tinfo)
            
           }
        else if(pathInfo=="/remove"){
            res.setHeader("content-type","text/html");
            res.end(htmlINFO);
            var obj=new Array()
            var jsondata= fs.readFileSync('task.json')
            obj= JSON.parse(jsondata)
            
            var data = url.parse(req.url,true).query;
            let tid=data.taskid
            let index = null;
            for(let i=0;i<obj.length;i++)
                {
                    if(tid==obj[i].taskId)
                    {
                        index=i;
                        var arr=obj.splice(i,1)
                        console.log(arr)
            
                        var empString = JSON.stringify(obj);
                        fs.writeFile("task.json",empString,(err)=> {
                        if(!err)
                                {   
                                    console.log("Record stored successfully...")
                                }
                            else
                                {
                                    res.end(htmlINFO+"Invalid Task Id")
                                }
                })
                    }
                }
                if(index==null){
                    console.log(`Task ${tid} does not exists`)
                }
        }
  
    res.end();
    }
)
server.listen(port,()=>console.log(`running on port num ${port}`));
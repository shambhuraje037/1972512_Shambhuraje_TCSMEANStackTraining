let app =require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req,res)=>{
    res.sendFile(__dirname+ "/index.html");
})

io.on("connection", (socket)=>{
    console.log("\nClient connected to application....")
    
    socket.on("name" ,(name)=>{
        console.log("\nHello "+name);
    })

    socket.on("msg",(msg)=>{
        console.log("Your Meassage From Client: "+ msg);
    });


})
http.listen(9000, ()=>console.log("Server Running..."));
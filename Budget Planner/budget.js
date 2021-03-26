var clientNumber = 1;
var currRow = 0;
var totalBudget = 0;
function retrieveData() {
    for(let i = 1; i < sessionStorage.length+1; i++){
        var obj = sessionStorage.getItem("clientInfo" + i);
        newItem(JSON.parse(obj))
        console.log(obj);
    }
    insertTotalBudget()
}
function onFormSubmit(){
    var data = addData();
    sessionStorage.setItem("clientInfo" + clientNumber, JSON.stringify(data));
    clientNumber++;
    clearData();
    
}

function addData() {
    var obj = {}    // client object
    obj.clientName = document.getElementById("client").value;
    obj.project = document.getElementById("clientProject").value;
    obj.budget = document.getElementById("budget").value;
    console.log(obj);
    return obj; 
}
function newItem(data){
    var table = document.getElementById("information")
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);  // row created 

    var cell1 = newRow.insertCell(0);          // cell created 
    cell1.innerHTML=data.clientName;                 // value placed 

    var cell2 = newRow.insertCell(1);          // cell created 
    cell2.innerHTML=data.project;                 // value placed

    var cell3 = newRow.insertCell(2);          // cell created 
    cell3.innerHTML=data.budget;                 // value placed
    totalBudget += parseInt(data.budget);
}
function printTotalBudget(){
    document.write("Total Budget = " + totalBudget)
}
function clearData() {
    document.getElementById("client").value="";
    document.getElementById("clientProject").value="";
    document.getElementById("budget").value="";
}


// var totalBudget =0;

// function retrieveData(){
//     for(var i=1; i<sessionStorage.length+1; i++){
//         var obj = sessionStorage.getItem("data", i);
//         newItem(JSON.parse(obj));
//     }
     
//     insertTotalBudget();
//  }
 
// function onFormSubmit()
// {
//     var data= addData();
//     console.log(data);
//     sessionStorage.setItem("Client", JSON.stringify(data));
//     clearData();

// }

// function addData(){
//     var obj= {};
//     obj.name = document.getElementById("client").value;
//     obj.project = document.getElementById("clientProject").value;
//     obj.budget = document.getElementById("budget").value;
//     return obj;
// }




// function newItem(data){
//     var table= document.getElementById("information");
//     var body = table.getElementsByTagName("tbody")[0];
//     var newRow = body.insertRow(body.length);
//     var cell1 = newRow.insertCell(0);
//     cell1.innerHTML = data.name;

//     var cell2 = newRow.insertCell(1);
//     cell1.innerHTML = data.project;


//     var cell3 = newRow.insertCell(2);
//     cell1.innerHTML = data.budget;
//     totalBudget +=data.budget;
// }

// function clearData(){
//     document.getElementById("client").value= " ";
//     document.getElementById("clientProject").value=" ";
//     document.getElementById("budget").value= " ";
// }

let obj = require("readline-sync");
let fs = require("fs");

module.exports.logRecord = function () {
  let id = obj.question("Enter your Id: ");

  let firstname = obj.question("Enter your First Name: ");
  
  let lastname = obj.question("Enter your Last Name: ");

  let gender = obj.question("Enter your Gender: ");
 
  let salary = obj.question("Enter your Salary: ");

  let email = obj.question("Enter your Email: ");
  Loop1:    
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false){
          console.log("Please enter correct email format and start over");
            
        }
        else console.log("success!!")
    debugger;

  let empArray = new Array();
  let data = fs.readFileSync("records.json");       
  if (data.toString()) {
    empArray = JSON.parse(data.toString());
  }

  let currentDate = new Date();                  
  let date =  currentDate.getDate() + "-" +(currentDate.getMonth() + 1) + "-" +   currentDate.getFullYear() + " time : " +  currentDate.getHours() +":" +  currentDate.getMinutes() + ":" + currentDate.getSeconds();
  currentDate.getDate() 

  let jsObj = {id,firstname,lastname,gender,salary,email,date,};
  empArray.push(jsObj);

  let jsString = JSON.stringify(empArray);
  fs.writeFileSync("records.json","\n\n" +jsString);           
  debugger;
};
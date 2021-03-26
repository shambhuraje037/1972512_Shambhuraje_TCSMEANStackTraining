let Obj = [];
let itemName:string;

class Item {
    constructor(public item:any, public price:any){
    }
}

function storeInSession() {
    sessionStorage.setItem("items",itemName);
}

function retrieveFromSession() {
    let data = JSON.parse(sessionStorage.getItem("items"));
    let total = 0;
    for(let i=0;i<data.length;i++){
        insertNewItem(data[i]);
        total += data[i].price;
    }
    addTotal(total);
}

function addToCart(item:string,price:number) {

    let data = new Item(item,price);
    Obj.push(data); 
    itemName = JSON.stringify(Obj);
    storeInSession();
    document.getElementById("total").innerHTML = "Total Items: " + (Obj.length);
}

function insertNewItem(data:any) {
    let table = document.getElementById("itemList");
    let body = table.getElementsByTagName("tbody")[0]; 
    let newRow = body.insertRow(-1);   
    
    let cell1 = newRow.insertCell(0);           
    cell1.innerHTML=data.item;                  

    let cell3 = newRow.insertCell(1);           
    cell3.innerHTML="$"+data.price;                  
}
function addTotal(total) {
    let table = document.getElementById("itemList");
    let body = table.getElementsByTagName("tbody")[0]; 
    let newRow = body.insertRow(-1);

    let cell1 = newRow.insertCell(0);           
    cell1.innerHTML="Total";                  

    let cell2 = newRow.insertCell(1);          
    cell2.innerHTML="$"+total;     
}            
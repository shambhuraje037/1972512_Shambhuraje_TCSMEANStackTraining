var Obj = [];
var itemName;
var Item = /** @class */ (function () {
    function Item(item, price) {
        this.item = item;
        this.price = price;
    }
    return Item;
}());
function storeInSession() {
    sessionStorage.setItem("items", itemName);
}
function retrieveFromSession() {
    var data = JSON.parse(sessionStorage.getItem("items"));
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        insertNewItem(data[i]);
        total += data[i].price;
    }
    addTotal(total);
}
function addToCart(item, price) {
    var data = new Item(item, price);
    Obj.push(data);
    itemName = JSON.stringify(Obj);
    storeInSession();
    document.getElementById("total").innerHTML = "Total Items: " + (Obj.length);
}
function insertNewItem(data) {
    var table = document.getElementById("itemList");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.item;
    var cell3 = newRow.insertCell(1);
    cell3.innerHTML = "$" + data.price;
}
function addTotal(total) {
    var table = document.getElementById("itemList");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = "Total";
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "$" + total;
}

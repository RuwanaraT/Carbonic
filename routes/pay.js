var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')





var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["receiptId"] = document.getElementById("receiptId").value;
    formData["buyerId"] = document.getElementById("buyerId").value;
    formData["orderId"] = document.getElementById("orderId").value;
    formData["totalPrice"] = document.getElementById("totalPrice").value;
    formData["cash"] = document.getElementById("cash").value;
    formData["balance"] = document.getElementById("balance").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.receiptId;
    
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.buyerId;
    
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.orderId;
    
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.totalPrice;
    
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.cash;
 
   
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.balance;

    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("receiptId").value = "";
    document.getElementById("buyerId").value = "";
    document.getElementById("orderId").value = "";
    document.getElementById("totalPrice").value = "";
    document.getElementById("subTotal").value = "";
    document.getElementById("balance").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("receiptId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("buyerId").value = selectedRow.cells[1].innerHTML;
    document.getElementById("orderId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("totalPrice").value = selectedRow.cells[3].innerHTML;
    document.getElementById("cash").value = selectedRow.cells[4].innerHTML;
    document.getElementById("balance").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.receiptId;
    selectedRow.cells[1].innerHTML = formData.buyerId;
    selectedRow.cells[2].innerHTML = formData.orderId;
    selectedRow.cells[3].innerHTML = formData.totalPrice;
    selectedRow.cells[4].innerHTML = formData.cash;
    selectedRow.cells[5].innerHTML = formData.balance;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("receiptId").value == "") {
        isValid = false;
        document.getElementById("receiptIdValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("receiptIdValidationError").classList.contains("hide"))
            document.getElementById("receiptIdValidationError").classList.add("hide");
    }
    return isValid;
}

module.exports = router;
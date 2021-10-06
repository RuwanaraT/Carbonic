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
    formData["invoiceId"] = document.getElementById("invoiceId").value;
    formData["buyerId"] = document.getElementById("buyerId").value;
    formData["orderId"] = document.getElementById("orderId").value;
    formData["dueDate"] = document.getElementById("dueDate").value;
    formData["subTotal"] = document.getElementById("subTotal").value;
    formData["orderStatus"] = document.getElementById("orderStatus").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.invoiceId;
    
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.buyerId;
    
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.orderId;
    
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.dueDate;
    
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.subTotal;
 
   
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.orderStatus;

    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<a onClick="onEdit(this)"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                       <a onClick="onDelete(this)"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE254;</i></a>`;
}

function resetForm() {
    document.getElementById("invoiceId").value = "";
    document.getElementById("buyerId").value = "";
    document.getElementById("orderId").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("subTotal").value = "";
    document.getElementById("orderStatus").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("invoiceId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("buyerId").value = selectedRow.cells[1].innerHTML;
    document.getElementById("orderId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("dueDate").value = selectedRow.cells[3].innerHTML;
    document.getElementById("subTotal").value = selectedRow.cells[4].innerHTML;
    document.getElementById("orderStatus").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.invoiceId;
    selectedRow.cells[1].innerHTML = formData.buyerId;
    selectedRow.cells[2].innerHTML = formData.orderId;
    selectedRow.cells[3].innerHTML = formData.dueDate;
    selectedRow.cells[4].innerHTML = formData.subTotal;
    selectedRow.cells[5].innerHTML = formData.orderStatus;
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
    if (document.getElementById("invoiceId").value == "") {
        isValid = false;
        document.getElementById("invoiceIdValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("invoiceIdValidationError").classList.contains("hide"))
            document.getElementById("invoiceIdValidationError").classList.add("hide");
    }
    return isValid;
}
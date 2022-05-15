$(document).ready(function() {
    if ($("#alertSuccess").text().trim() == "") {
        $("#alertSuccess").hide();
    }
    $("#alertError").hide();
});





// SAVE ============================================
$(document).on("click", "#btnSave", function() {
// Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
// Form validation-------------------
    var status = validateClientForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
// If valid------------------------
    $("#formClient").submit();
});





// UPDATE==========================================
$(document).on("click", ".btnUpdate", function() {
    $("#hidClientIDSave").val($(this).closest("tr").find('#hidClientIDUpdate').val());
    $("#accountNo").val($(this).closest("tr").find('td:eq(0)').text());
    $("#userName").val($(this).closest("tr").find('td:eq(1)').text());
    $("#email").val($(this).closest("tr").find('td:eq(2)').text());
    $("#mobileNo").val($(this).closest("tr").find('td:eq(3)').text());
    $("#home").val($(this).closest("tr").find('td:eq(4)').text());
    $("#date").val($(this).closest("tr").find('td:eq(5)').text());
});




// Delete============================================
$(document).on("click", ".btnRemove", function(event) {
    $.ajax({
        url : "ClientsAPI",
        type : "DELETE",
        data : "id=" + $(this).data("id"),
        dataType : "text",
        complete : function(response, status) {
            onClientDeleteComplete(response.responseText, status);
        }
    });
});





// CLIENT-MODEL==============================================================
function validateClientForm() {
// NAME
    if ($("#accountNo").val().trim() == "") {
        return "Please Insert Account Number";
    }

    if ($("#userName").val().trim() == "") {
        return "Please Insert the User Name";
    }

    if ($("#email").val().trim() == "") {
        return "Please Insert the Email";
    }

    if ($("#mobileNo").val().trim() == "") {
        return "Please Insert the Mobile Number";
    }

    if ($("#home").val().trim() == "") {
        return "Please Insert the Home Address";
    }

    if ($("#date").val().trim() == "") {
        return "Please Insert the Date";
    }


    return true;
}



$(document).on("click", "#btnSave", function(event) {
// Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
// Form validation-------------------
    var status = validateClientForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
// If valid------------------------
    var type = ($("#hidClientIDSave").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "ClientsAPI",
            type: type,
            data: $("#formClient").serialize(),
            dataType: "text",
            complete: function(response, status) {
                onBillSaveComplete(response.responseText, status);
            }
        });
});




function onClientSaveComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully saved.");
            $("#alertSuccess").show();
            $("#divClientsGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error while saving.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while saving..");
        $("#alertError").show();
    }
    $("#hidClientIDSave").val("");
    $("#formClient")[0].reset();
}





function onClientDeleteComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully Deleted.");
            $("#alertSuccess").show();
            $("#divClientsGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while deleting..");
        $("#alertError").show();
    }
}
function ValidateFullName() {
    let fullName = $("#fullName").val().trim();
    let nameParts = fullName.split(/\s+/);
    if (!/^[a-zA-Z\s]+$/.test(fullName) || nameParts.length < 2) {
        $("#fullNameWarning").show();
        return false;
    } else {
        $("#fullNameWarning").hide();
        return true;
    }
}

function ValidateContactNumber() {
    let contactNumber = $("#contactNumber").val().trim();
    let localFormat = /^0\d{9}$/;
    let internationalFormat = /^\+?27\d{9}$/;
    if (!localFormat.test(contactNumber) && !internationalFormat.test(contactNumber)) {
        $("#contactNumberWarning").show();
        return false;
    } else {
        $("#contactNumberWarning").hide();
        return true;
    }
}

function ValidateEmail() {
    let email = $("#email").val().trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        $("#emailAddressWarning").show();
        return false;
    } else {
        $("#emailAddressWarning").hide();
        return true;
    }
}

function ValidateWhatsApp() {
    let whatsapp = $("#whatsapp").val().trim();
    let phonePattern = /^0\d{9}$|^\+?27\d{9}$/;

    if (!phonePattern.test(whatsapp)) {
        $("#whatsappWarning").show();
        return false;
    } else {
        $("#whatsappWarning").hide();
        return true;
    }
}

function ValidateEmailStep3() {
    let email = $("#emailStep3").val().trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        $("#emailAddressWarningStep3").show();
        return false;
    } else {
        $("#emailAddressWarningStep3").hide();
        return true;
    }
}

function ValidateWhatsAppStep3() {
    let whatsapp = $("#whatsappStep3").val().trim();
    let phonePattern = /^0\d{9}$|^\+?27\d{9}$/;

    if (!phonePattern.test(whatsapp)) {
        $("#whatsappWarningStep3").show();
        return false;
    } else {
        $("#whatsappWarningStep3").hide();
        return true;
    }
}

function ValidateUploadedFile() {
    let fileInput = $("#policyDocument")[0];
    let file = fileInput.files[0];

    if (!file) {
        return true;
    }

    let allowedExtensions = ["pdf", "docx", "jpg", "jpeg", "png"];
    let maxSize = 5 * 1024 * 1024;
    let fileName = file.name;
    let fileSize = file.size;
    let fileExtension = fileName.split(".").pop().toLowerCase();

    if (fileSize > maxSize) {
        $("#policyDocumentWarning").text("File size exceeds 5MB. Please upload a smaller file.").show();
        return false;
    }

    if (!allowedExtensions.includes(fileExtension)) {
        $("#policyDocumentWarning").text("Invalid file type. Only PDF, DOCX, JPG, and PNG files are allowed.").show();
        return false;
    }

    $("#policyDocumentWarning").hide();
    return true;
}

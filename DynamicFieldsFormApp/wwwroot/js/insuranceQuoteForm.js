$(function () {
    $("#step2, #step3, #fullNameWarning, #contactNumberWarning, #otherInsurerField, #contactPreferences, #termsCheckboxWrapper, #submitButton, #prevStep, #prevStep3").hide();

    let step1 = $("#step1");
    let step2 = $("#step2");
    let step3 = $("#step3");
    let quotePreference = $("#quotePreference");
    let quotePreferenceStep3 = $("#quotePreferenceStep3");
    $("#step1Icon").addClass("active");

    let prevStep = $("#prevStep");
    let termsCheckboxWrapper = $("#termsCheckboxWrapper");
    let submitButton = $("#submitButton");
    let comments = $("#comments");
    let label = $("label[for='comments']");

    $("#closeBanner").on("click", function () {
        $("#cookieConsentBanner").fadeOut();
    });

    function UpdateTimeline(step) {
        $(".timeline-item").removeClass("active").removeClass("completed");

        if (step > 1) {
            for (let i = 1; i < step; i++) {
                $("#step" + i + "Icon").addClass("completed");
            }
        }
        $("#step" + step + "Icon").addClass("active");

        if (step === 2 || step === 3) {
            $(comments).show();
            $(label).show();
            $(termsCheckboxWrapper).show();
            $(submitButton).show();
            $(prevStep).show();
        } else {
            $(comments).hide();
            $(label).hide();
            $(termsCheckboxWrapper).hide();
            $(submitButton).hide();
            $(prevStep).hide();
        }
    }

    $("#contactMethod").on("change", function () {
        let selectedMethod = $(this).val();

        if (selectedMethod === "Email") {
            $("#emailField").show();
            $("#whatsappField").hide();
        } else if (selectedMethod === "WhatsApp") {
            $("#whatsappField").show();
            $("#emailField").hide();
        } else {
            $("#emailField, #whatsappField").hide();
        }
        SaveFormData();
    });

    $("#contactMethodStep3").on("change", function () {
        let selectedMethod3 = $(this).val();

        if (selectedMethod3 === "Email") {
            $("#emailFieldStep3").show();
            $("#whatsappFieldStep3").hide();
        } else if (selectedMethod3 === "WhatsApp") {
            $("#whatsappFieldStep3").show();
            $("#emailFieldStep3").hide();
        } else {
            $("#emailFieldStep3, #whatsappFieldStep3").hide();
        }
        SaveFormData();
    });

    $(fullName).on("blur", ValidateFullName);
    $(contactNumber).on("blur", ValidateContactNumber);
    $(email).on("input", ValidateEmail);
    $(whatsapp).on("input", ValidateWhatsApp);
    $(emailStep3).on("blur", ValidateEmailStep3);
    $(whatsappStep3).on("blur", ValidateWhatsAppStep3);
    $("#policyDocument").on("blur", ValidateUploadedFile);

    $("#nextStep").on("click", function () {
        if (!ValidateFullName() || !ValidateContactNumber() || $("#currentlyInsured").val() === "") {
            alert("Please complete all fields before proceeding.");
            return;
        }
        SaveFormData();
        $(step1).hide();

        if ($("#currentlyInsured").val() === "Yes") {
            $(step2).show();
            UpdateTimeline(2);
        } else {
            $(step3).show();
            UpdateTimeline(2);
        }
    });

    $("#insurer").on("change", function () {
        if ($(this).val() === "Other") {
            $("#otherInsurerField").show();
            $("#uploadPolicyDocumentField").show();
        } else {
            $("#otherInsurerField").hide();
            $("#uploadPolicyDocumentField").hide();
            $("#otherInsurer").val("");
            $("#policyDocument").val("");
        }
        SaveFormData();
    });

    function HandleQuotePreferenceVisibility() {
        if ($(quotePreference).val() === "Yes") {
            $("#contactPreferences").show();
        } else {
            $("#contactPreferences").hide();
        }

        if ($(quotePreferenceStep3).val() === "Yes") {
            $("#contactPreferencesStep3").show();
        } else {
            $("#contactPreferencesStep3").hide();
        }
        SaveFormData();
    }

    $(quotePreference).on("change", function () {
        HandleQuotePreferenceVisibility();
    });

    $(quotePreferenceStep3).on("change", function () {
        HandleQuotePreferenceVisibility();
    });

    $(prevStep).on("click", function () {
        if ($(step2).is(":visible")) {
            $(step2).hide();
        } else if ($(step3).is(":visible")) {
            $(step3).hide();
        }

        $(step1).show();
        UpdateTimeline(1);
    });

    $("#insuranceQuote").on("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        let selectedMethod = $("#contactMethod").val();
        let selectedMethod3 = $("#contactMethodStep3").val();

        if (selectedMethod === "Email") {
            isValid = ValidateEmail();
        } else if (selectedMethod === "WhatsApp") {
            isValid = ValidateWhatsApp();
        }

        if (selectedMethod3 === "Email3") {
            isValid = ValidateEmailStep3();
        } else if (selectedMethod3 === "WhatsApp3") {
            isValid = ValidateWhatsAppStep3();
        }

        if (!ValidateUploadedFile()) {
            $("#policyDocumentWarning").show();
            isValid = false;
        } else {
            $("#policyDocumentWarning").hide();
        }

        if (!$("#termsCheckbox").prop("checked")) {
            $("#termsWarning").show();
            isValid = false;
        } else {
            $("#termsWarning").hide();
        }

        if ($("#currentlyInsured").val() === "Yes") {
            if ($("#insurer").val() === "") {
                alert("Please select an insurer.");
                isValid = false;
            } else if ($("#insurer").val() === "Other" && $("#otherInsurer").val().trim() === "") {
                alert("Please enter the name of your insurer.");
                isValid = false;
            } else if ($("#policyNumber").val().trim() === "") {
                alert("Please enter your policy number.");
                isValid = false;
            } else if ($("#coverageType").val() === "") {
                alert("Please select a coverage type.");
                isValid = false;
            } else if ($("#renewalDate").val().trim() === "") {
                alert("Please select a renewal date.");
                isValid = false;
            } else if ($(quotePreference).val() === "") {
                alert("Please select an answer.");
                isValid = false;
            } else if ($(quotePreference).val() === "Yes" && $("#contactMethod").val() === "") {
                alert("Please select a preferred contact method.");
                isValid = false;
            } else if ($(quotePreference).val() === "Yes" && $("#contactTime").val() === "") {
                alert("Please select the best time to contact you.");
                isValid = false;
            }
        } else {
            if ($("#noInsuranceReason").val() === "") {
                alert("Please select a reason for not being insured.");
                isValid = false;
            } else if ($(quotePreferenceStep3).val() === "Yes" && $("#contactMethodStep3").val() === "") {
                alert("Please select a preferred contact method.");
                isValid = false;
            } else if ($(quotePreferenceStep3).val() === "Yes" && $("#contactTimeStep3").val() === "") {
                alert("Please select the best time to contact you.");
                isValid = false;
            }
        }

        if (isValid) {
            sessionStorage.removeItem("formData");
            document.cookie = "formData=; path=/; max-age=0";
            var fullName = encodeURIComponent($("#fullName").val().trim());
            window.location.href = "/Home/ThankYou?fullName=" + fullName;
        }
    });
    RestoreFormData();
});

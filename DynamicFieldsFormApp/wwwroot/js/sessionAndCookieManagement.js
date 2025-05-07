function ShowCookieConsentBanner() {
    let consent = GetCookie("cookieConsent");

    if (!consent || (consent !== "accepted" && consent !== "declined")) {
        $("#cookieConsentBanner").show();
    } else {
        $("#cookieConsentBanner").hide();
    }
}

$("#acceptCookies").on("click", AcceptCookies);
$("#declineCookies").on("click", DeclineCookies);

ShowCookieConsentBanner();

function AcceptCookies() {
    document.cookie = "cookieConsent=accepted; path=/; max-age=30; SameSite=Lax; Secure";
    $("#cookieConsentBanner").hide();
}
function DeclineCookies() {
    document.cookie = "cookieConsent=accepted; path=/; max-age=30; SameSite=Lax; Secure";
    $("#cookieConsentBanner").hide();
}
function GetCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

function SaveFormData() {
    let formData = {
        fullName: $("#fullName").val().trim(),
        contactNumber: $("#contactNumber").val().trim(),
        currentlyInsured: $("#currentlyInsured").val(),
        insurer: $("#insurer").val(),
        otherInsurer: $("#otherInsurer").val().trim(),
        policyNumber: $("#policyNumber").val().trim(),
        coverageType: $("#coverageType").val(),
        renewalDate: $("#renewalDate").val().trim(),
        noInsuranceReason: $("#noInsuranceReason").val(),
        quotePreference: $("#quotePreference").val(),
        contactMethod: $("#contactMethod").val(),
        email: $("#email").val().trim(),
        whatsapp: $("#whatsapp").val().trim(),
        contactTime: $("#contactTime").val().trim(),
        comments: $("#comments").val().trim(),
        termsAccepted: $("#termsCheckbox").prop("checked"),
        quotePreferenceStep3: $("#quotePreferenceStep3").val(),
        contactMethodStep3: $("#contactMethodStep3").val(),
        emailStep3: $("#emailStep3").val().trim(),
        whatsappStep3: $("#whatsappStep3").val().trim(),
        contactTimeStep3: $("#contactTimeStep3").val().trim(),
        policyDocument: $("#policyDocument").val().trim(),
        currentStep: GetCurrentStep(),
        timestamp: new Date().getTime()
    };

    sessionStorage.setItem("formData", JSON.stringify(formData));
    document.cookie = "formData=" + encodeURIComponent(JSON.stringify(formData)) + "; path=/; max-age=30"; // Cookie expiry time can be adjusted
}


function RestoreFormData() {
    let storedData = sessionStorage.getItem("formData");
    if (!storedData) {
        let cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            if (cookie.trim().startsWith('formData=')) {
                storedData = decodeURIComponent(cookie.split('=')[1]);
            }
        });
    }

    if (storedData) {
        let data = JSON.parse(storedData);

        $("#fullName").val(data.fullName || "");
        $("#contactNumber").val(data.contactNumber || "");
        $("#currentlyInsured").val(data.currentlyInsured || "");
        $("#insurer").val(data.insurer || "");
        $("#otherInsurer").val(data.otherInsurer || "");
        $("#policyNumber").val(data.policyNumber || "");
        $("#coverageType").val(data.coverageType || "");
        $("#renewalDate").val(data.renewalDate || "");
        $("#noInsuranceReason").val(data.noInsuranceReason || "");
        $("#quotePreference").val(data.quotePreference || "");
        $("#contactMethod").val(data.contactMethod || "");
        $("#email").val(data.email || "");
        $("#whatsapp").val(data.whatsapp || "");
        $("#contactTime").val(data.contactTime || "");
        $("#comments").val(data.comments || "");
        $("#termsCheckbox").prop("checked", data.termsAccepted || false);
        $("#quotePreferenceStep3").val(data.quotePreferenceStep3 || "");
        $("#contactMethodStep3").val(data.contactMethodStep3 || "");
        $("#emailStep3").val(data.emailStep3 || "");
        $("#whatsappStep3").val(data.whatsappStep3 || "");
        $("#contactTimeStep3").val(data.contactTimeStep3 || "");
        $("#policyDocument").val(data.policyDocument || "");

        let currentStep = data.currentStep || 1;
        ShowStep(currentStep);
    }
}

function ShowStep(step) {
    $("#step1, #step2, #step3").hide();

    if (step === 1) {
        $("#step1").show();
    } else if (step === 2) {
        $("#step2").show();
    } else if (step === 3) {
        $("#step3").show();
    }

    UpdateTimeline(step);
}

function GetCurrentStep() {
    if ($("#step1").is(":visible")) {
        return 1;
    } else if ($("#step2").is(":visible")) {
        return 2;
    } else if ($("#step3").is(":visible")) {
        return 3;
    }
    return 1;
}

function CheckSessionExpiration() {
    let formData = sessionStorage.getItem("formData");
    if (!formData) {
        let cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            if (cookie.trim().startsWith('formData=')) {
                formData = decodeURIComponent(cookie.split('=')[1]);
            }
        });
    }
}

CheckSessionExpiration();

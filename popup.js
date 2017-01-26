submitReport = function () {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE ) {
           if (xhr.status == 200 || xhr.status == 0) { // xhr.status == 0 because of CORS. Usually it gets sent anyways
               document.getElementById("submit").remove();
               document.getElementById("desc").innerHTML = chrome.i18n.getMessage("responseThanks");
           }
           else {
               document.getElementById("desc").innerHTML = chrome.i18n.getMessage("responseMail");
               document.getElementById("submit").innerHTML = chrome.i18n.getMessage("sendMail");
               document.getElementById("submit").addEventListener("click", sendMail);

           }
        }
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        xhr.open("GET", "https://pablo.io/onepage/report.php?url=" + encodeURI(tabs[0].url), true);
        xhr.send();
    });
}

sendMail = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        newURL = 'mailto:pt-onepage@pablo-t.de?subject=One%20Page%3A%20new%20report&body=Hey%2C%0Athis%20article%20is%20split%20up%20on%20multiple%20pages%3A%0A' + encodeURI(tabs[0].url) + '%0AThanks!';
        chrome.tabs.create({ url: newURL });
    });
}

document.getElementById("submit").innerText = chrome.i18n.getMessage("btnSubmit");
document.getElementById("desc").innerText = chrome.i18n.getMessage("notWorking");
document.getElementById("submit").addEventListener("click", submitReport);

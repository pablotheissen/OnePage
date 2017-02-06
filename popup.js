/**
 * Submit new or not working website to https://pablo.io/onepage/report.php
 */
submitReport = function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200 || xhr.status == 0) { // xhr.status == 0 because of CORS. Usually it gets sent anyways
                document.getElementById("submit_btn").remove();
                document.getElementById("submit_desc").innerHTML = chrome.i18n.getMessage("responseThanks");
            }
            else {
                /* report couldn't be sent automatically, offer manual mailto-link */
                document.getElementById("submit_desc").innerHTML = chrome.i18n.getMessage("responseMail");
                document.getElementById("submit_btn").innerHTML = chrome.i18n.getMessage("sendMail");
                document.getElementById("submit_btn").addEventListener("click", sendMail);
            }
        }
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        xhr.open("GET", "https://pablo.io/onepage/report.php?url=" + encodeURI(tabs[0].url), true);
        xhr.send();
    });
}

/**
 * Open a new tab to send a mail for reporting a new or not working website
 */
sendMail = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        newURL = 'mailto:pt-onepage@pablo-t.de?subject=One%20Page%3A%20new%20report&body=Hey%2C%0Athis%20article%20is%20split%20up%20on%20multiple%20pages%3A%0A' + encodeURI(tabs[0].url) + '%0AThanks!';
        chrome.tabs.create({ url: newURL });
    });
}

/**
 * Enable or disable extension for a specific domain
 */
toggleExtension = function () {
    /* Get list of disabled domains and pass list and current domain to next helper function */
    getDisabledDomains = function (domain) {
        chrome.storage.sync.get("disabledPages", function (data) {
            toggleAndSetDisabledDomains(data["disabledPages"], domain)
        });
    }
    /* Check if domain is in list and then either add or remove it from list. Then save new list
    to storage */
    toggleAndSetDisabledDomains = function (data, domain) {
        domainRemoved = false; // variable for saving if domain gets added or removed from list
        indexDomain = data.indexOf(domain);
        if (indexDomain === -1) {
            data.push(domain);
        } else {
            domainRemoved = true;
            data.splice(indexDomain, 1);
        }
        chrome.storage.sync.set({
            "disabledPages": data
        }, function () {
            /* toggle button state */
            if (domainRemoved) {
                enableDisableBtn();
                enableReloadButton();
            } else {
                disableDisableBtn();
            }
        });
    }

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        getDisabledDomains(extractDomain(tabs[0].url));
    });
}

/**
 * Reload current tab
 */
reloadTab = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
        window.close();
    });
}

/**
 * Enable "Disable Extension" button (making the background blue)
 */
enableDisableBtn = function () {
    disable_btn = document.getElementById("disable_btn");
    disable_btn.textContent = chrome.i18n.getMessage("btnDisable");
    disable_btn.classList = null; // TODO: just remove "disabled" class
}

/**
 * Disable "Disable Extension" button (making the background gray)
 */
disableDisableBtn = function () {
    disable_btn = document.getElementById("disable_btn");
    disable_btn.textContent = chrome.i18n.getMessage("btnEnable");
    disable_btn.classList.add("disabled");
}

/**
 * Show button "Reload page"
 */
enableReloadButton = function () {
    reload_btn = document.getElementById("reload_btn");
    reload_btn.style.display = "block";
}

/* initialize i18n text */
document.getElementById("version").textContent = "v" + chrome.runtime.getManifest().version;
document.getElementById("submit_btn").textContent = chrome.i18n.getMessage("btnSubmit");
document.getElementById("submit_desc").textContent = chrome.i18n.getMessage("notWorking");
document.getElementById("disable_desc").textContent = chrome.i18n.getMessage("descDisable");
document.getElementById("reload_btn").textContent = chrome.i18n.getMessage("btnReload");

/* initialize button actions */
document.getElementById("submit_btn").addEventListener("click", submitReport);
document.getElementById("disable_btn").addEventListener("click", toggleExtension);
document.getElementById("reload_btn").addEventListener("click", reloadTab);

/* check if domain is on disabled list */
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.storage.sync.get("disabledPages", function (data) {
        if (typeof data["disabledPages"] === typeof undefined) {
            chrome.storage.sync.set({ "disabledPages": [] });
            data["disabledPages"] = [];
        }
        if (data["disabledPages"].indexOf(extractDomain(tabs[0].url)) > -1) {
            disableDisableBtn();
        } else {
            enableDisableBtn();
        }
    });
});

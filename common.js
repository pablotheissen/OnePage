cleanUrl = function (url) {
    if (url.indexOf("#") != -1) {
        url = url.substring(0, url.indexOf("#"));
    }
    if (url.indexOf("?") != -1) {
        url = url.substring(0, url.indexOf("?"));
    }
    return url;
}

/* TODO: combine getDomByUrl and getContentByUrl */
getDomByUrl = function (url, callfunction) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200 || xhr.status == 0) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr.responseText, "text/html");
                callfunction(doc);
                return true;
            }
            else {
                console.log("Error while loading " + url + ".\n");
                console.log(xhr.status);
                return false;
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

getContentByUrl = function (url, callfunction) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200 || xhr.status == 0) {
                callfunction(xhr.responseText);
                return true;
            }
            else {
                console.log("Error while loading " + url + ".\n");
                console.log(xhr.status);
                return false;
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

var sending = chrome.runtime.sendMessage({ cmd: "showActiveIcon" });

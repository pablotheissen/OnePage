/**
 * Strip URL from parameters like ? and #
 */
cleanUrl = function (url) {
    if (url.indexOf("#") != -1) {
        url = url.substring(0, url.indexOf("#"));
    }
    if (url.indexOf("?") != -1) {
        url = url.substring(0, url.indexOf("?"));
    }
    return url;
}

/**
 * url: URL to call
 * getQuery: query-selector on next page whos children will be extracted
 * appendQuery: query-selector on current page in which the new content will be appended
 * asyncCallback: function to call when finished with extracting and appending content
 */
loadPageIntoDom = function (url, getQuery, appendQuery, asyncCallback) {
    getDomByUrl(url, _loadPageIntoDom, {
        getQuery: getQuery,
        appendQuery: appendQuery,
        asyncCallback: asyncCallback
    });
}
_loadPageIntoDom = function (dom, asyncPass) {
    dom.querySelectorAll(asyncPass["getQuery"]).forEach(function (element) {
        document.querySelector(asyncPass["appendQuery"]).appendChild(element);
    });
    if (asyncPass["asyncCallback"]) {
        asyncPass["asyncCallback"](dom);
    }
}

getDomByUrl = function (url, asyncCallback, asyncPass) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                asyncCallback(htmlToDom(xhr.responseText), asyncPass);
                return true;
            }
            else {
                console.log("Error while loading " + url + ".\n");
                console.log(xhr.status);
                return false;
            }
        }
    }

    xhr.open("GET", url);
    xhr.send();
}

/**
 * Convert HTML sourcecode to DOM
 */
htmlToDom = function (htmlSourceCode) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlSourceCode, "text/html");
}

var sending = chrome.runtime.sendMessage({ cmd: "showActiveIcon" });

/**
 * Convert relative path to absolute path
 * http://stackoverflow.com/a/14781678/4096957
 */
var absolutePath = function (href) {
    var link = document.createElement("a");
    link.href = href;
    return (link.protocol + "//" + link.host + link.pathname + link.search + link.hash);
}

/**
 * Get all DOM elements containing certain text
 * http://stackoverflow.com/a/37098508/4096957
 */
function contains(selector, text, dom) {
    if (!dom) {
        dom = document;
    }
    var elements = dom.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

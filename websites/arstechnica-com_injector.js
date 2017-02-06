/* inject arstechnica.js into website so that it has access to $ars variable */
runOnePage = function () {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('websites/arstechnica-com.js');
    (document.head || document.documentElement).appendChild(s);
    s.onload = function () {
        s.remove();
    };
}

/* inject arstechnica.js into website so that it has access to $ars variable */
var s = document.createElement('script');
s.src = chrome.extension.getURL('websites/arstechnica.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.remove();
};

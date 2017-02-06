/** Example:
  * http://www.tagesspiegel.de/19282294.html
  */
runOnePage = function () {
    var re = /nächste\sSeite/i;
    if (re.test(document.body.textContent) && window.location.href.search("-all") == -1) {
        var url = cleanUrl(window.location.href);
        url = url.replace('.html', '-all.html')
        /* check if article was loaded on second or third page */
        url = url.replace(/-\d+-all\.html/i, '-all.html')
        window.location.href = url;
    }
}

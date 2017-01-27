/** Example:
  * https://www.wiwo.de/19311936.html
  */
var re = /Alles\szeigen/i;
if (re.test(document.body.innerText) && window.location.href.search("-all") == -1) {
    var url = cleanUrl(window.location.href);
    url = url.replace('.html', '-all.html')
    /* check if article was loaded on second or third page */
    url = url.replace(/-\d+-all\.html/i, '-all.html')
    window.location.href = url;
}
else if (window.location.href.search("-all") != -1) {
    /* remove pagination */
    document.getElementsByClassName("hcf-article-paging")[0].remove();
}

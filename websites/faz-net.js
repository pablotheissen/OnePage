/** Example:
  * http://www.faz.net/-gqe-8s7et
  */
runOnePage = function () {
    var re = /Artikel\sauf\seiner\sSeite/i;
    if (re.test(document.body.innerText) && window.location.href.search("printPagedArticle") == -1) {
        var url = cleanUrl(window.location.href);
        window.location.href = url + "?printPagedArticle=true";
    }
}

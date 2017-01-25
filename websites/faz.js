/** Example:
  * http://www.faz.net/-gqe-8s7et
  */
var re = /Artikel\sauf\seiner\sSeite/i;
console.log(re.test(document.body.innerText));
if (re.test(document.body.innerText) && window.location.href.search("printPagedArticle") == -1) {
    var url = cleanUrl(window.location.href);
    window.location.href = url + "?printPagedArticle=true";
}
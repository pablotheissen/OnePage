/**
 * Example:
 * http://www.stuttgarter-zeitung.de/inhalt..084a9970-40ff-4537-804c-0095c4c6bed5.html
 */
var url;
var page = 0;
var maxpage = 0;

runOnePage = function () {
    var re = /Seite\s2/i;
    if (re.test(document.body.textContent)) {
        url = document.querySelector("a.icon-printer").href;
        document.querySelector(".mod-article").innerHTML = "";
        loadPageIntoDom(url,
            ".mod-article",
            ".mod-article");
    }
}

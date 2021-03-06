/** Example:
  * http://www.zeit.de/wirtschaft/unternehmen/2017-01/rossmann-dm-drogerie-preiskampf-mitarbeiter-image
  */

runOnePage = function () {
    var re = /Auf\seiner\sSeite\slesen/i;
    if (re.test(document.body.textContent) && window.location.href.search("komplettansicht") == -1) {
        var url = cleanUrl(window.location.href);
        window.location.href = url + "/komplettansicht";
    }
}

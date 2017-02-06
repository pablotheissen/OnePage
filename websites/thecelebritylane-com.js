/** Example:
  * http://thecelebritylane.com/2310/
  */
var re = /Read\sfull\sarticle/i;
if (re.test(document.body.innerText) && window.location.href.search("FullArticle") == -1) {
    document.querySelectorAll("a.share_menu").forEach(function (element) {
        if (element.innerHTML.substring(0, 17) == "Read full article") {
            window.location.href = element.href;
        }
    });
}

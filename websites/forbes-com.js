/** Example:
  * http://www.forbes.com/sites/michaelellsberg/2011/07/18/how-i-overcame-bipolar-ii/
  */
var url;

runOnePage = function () {
    var re = /Page\s1\s\/\s/i;
    if (re.test(document.body.textContent)) {
        var url = absolutePath(cleanUrl(location.href) + "/print");
        document.querySelectorAll(".article-text *").forEach(function (element) {
            element.remove();
        });
        loadPageIntoDom(url,
            ".body_inner",
            ".article-text"
        );
        document.querySelector(".article-pagination").remove();
    }
}





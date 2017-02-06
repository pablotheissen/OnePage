/**
 * Example
 * https://social.diply.com/kirsten-dunst-jake-gyllenhaal-split
 */

var url;
loadNextPage = function (dom) {
    if (dom.querySelector(".feature-article-next-btn")) {
        url = absolutePath(dom.querySelector(".feature-article-next-btn").getAttribute("href"));
        loadPageIntoDom(url,
            ".article-body",
            ".article-body",
            loadNextPage);
    } else {
        document.querySelector(".article-bottom-controls").remove();
    }
}

runOnePage = function () {
    var re = /next\spage/i;
    if (re.test(document.body.textContent)) {
        loadNextPage(document);
    }
}    

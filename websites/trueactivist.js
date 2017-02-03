/**
 * Example
 * http://www.trueactivist.com/25-locations-youre-not-allowed-to-visit-gallery/
 */

var url;

loadNextPage = function (dom) {
    url = absolutePath(dom.querySelector(".wspn_right").parentNode.href);
    var loc = location.href.split("/");
    basePath = loc[0] + "//" + loc[2] + "/" + loc[3];
    if (url.substring(0, basePath.length) === basePath) {
        loadPageIntoDom(url,
            "#content-main > div:nth-child(1)",
            "#content-main > div:nth-child(1)",
            loadNextPage);
    } else {
        document.querySelector(".wspn_navigation_layout").remove();
    }
}

var re = /keep\sreading/i;
if (re.test(document.body.innerText)) {
    loadNextPage(document);
}

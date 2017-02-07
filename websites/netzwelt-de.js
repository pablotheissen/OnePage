/**
 * Example
 * https://www.netzwelt.de/vpn/index.html
 */

var url;

loadNextPage = function (dom) {
    link_next = dom.querySelector("link[rel=next]");
    if (link_next) {
        url = absolutePath(link_next.href);
        loadPageIntoDom(url,
            ".content",
            ".content",
            loadNextPage);
    } else {
        document.querySelectorAll(".content nav").forEach(function (element) {
            element.remove();
        });
        document.querySelectorAll(".content .content h1").forEach(function (element) {
            element.remove();
        });
        /* images are loaded dynamically by javascript */
        document.querySelectorAll(".content .content img").forEach(function (element) {
            if (element.dataset.original) {
                element.src = element.dataset.original;
            }
        });
    }
}

runOnePage = function () {
    if (document.querySelector("link[rel=next]")) {
        loadNextPage(document);
    }
}

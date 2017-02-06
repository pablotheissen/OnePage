/**
 * Example:
 * http://www.lifebuzz.com/celebrity-records/
 */

lifebuzzLoader = function (doc) {
    doc.querySelectorAll(".section30").forEach(function (element) {
        element.querySelectorAll("img").forEach(function (image) {
            image.src = image.getAttribute("data-original");
        });
        document.querySelector(".single").appendChild(element);
    });
    /* remove junk from inbetween two pages like pagination and fb button */
    document.querySelectorAll(".single > *").forEach(function (element) {
        if (element.innerHTML.search("post-pagination") !== -1) {
            element.remove();
        }
        else if (element.innerHTML.search("share-bar") !== -1) {
            element.remove();
        }
        else if (element.innerHTML.search("fb-comments") !== -1) {
            element.remove();
        }
        else if (element.innerHTML.search("Trending on LifeBuzz") !== -1) {
            element.remove();
        }
    });
    /* check if article contains another page */
    loadNextPage();
}
loadNextPage = function () {
    if (page < totalPages) {
        page++;
        getDomByUrl(url + "/" + page, lifebuzzLoader);
    }
}

var page = 1;
var totalPages = 0;
var url;
runOnePage = function () {
    /* check if article is multipage */
    var re = /Page\s1\sof\s(\d+)/i;
    if (re.test(document.body.textContent)) {
        /* get total number by reading "Page 1 of XXX"" */
        totalPages = re.exec(document.body.textContent)[1];
        url = cleanUrl(window.location.href);
        loadNextPage();
    }
}

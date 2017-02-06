/**
 * Example:
 * http://thephoenix.com/Boston/food/152872-
 */

var page = 1;
var totalPages = 0;
var url;

loadNextPage = function () {
    if (page < totalPages) {
        page++;
        loadPageIntoDom(url + "?page=" + page, "#article > div:nth-child(2)", "#article > div:nth-child(2)", loadNextPage);
    } else {
        /* remove pagination */
        document.querySelector("#article > div:nth-child(3)").remove();
    }
}

runOnePage = function () {
    /* check if article is multipage */
    var re = /1\s+(?:\|\s+\d\s+)*(?:\|\s+(\d+)\s+)\|\s+next/i;
    if (re.test(document.body.textContent)) {
        totalPages = re.exec(document.body.textContent)[1];
        url = cleanUrl(location.href)
        loadNextPage();
    }
}

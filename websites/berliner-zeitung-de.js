/** Example:
  * http://www.berliner-zeitung.de/berlin/stadtratskandidat-in-neukoelln-schwul--migranten-lehrer--afd-politiker-25608022
  */
runOnePage = function () {
    var re = /nächste\sSeite/i;
    if (re.test(document.body.textContent)) {
        /* article is fully accessible on site but hidden as printonly */
        var textContainer = document.querySelector(".dm_article_text");
        var printContainer = textContainer.querySelector(".printonly");

        /* we'll fetch each element hidden by printonly and append it to the non-hidden container */
        printContainer.childNodes.forEach(function (element) {
            textContainer.appendChild(element.cloneNode(true));
        });

        /* clean up pagination and printonly area, as it is not needed anymore */
        printContainer.remove();
        document.querySelector(".dm_table_of_contents_wrapper").remove();
        document.querySelector(".dm_pagination_simple").remove();

        /* convert <p class="article_pagebreak"> to <h3> */
        var headings_old = document.querySelectorAll(".article_pagebreak");
        headings_old.forEach(function (heading_old) {
            var heading_new = document.createElement("h3");
            heading_new.innerHTML = heading_old.innerHTML;
            heading_old.parentElement.replaceChild(heading_new, heading_old);
            heading_new = null;
        })
    }
}

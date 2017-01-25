/** Example:
  * http://www.berliner-zeitung.de/berlin/stadtratskandidat-in-neukoelln-schwul--migranten-lehrer--afd-politiker-25608022
  */
/* article is fully accessible on site but hidden as printonly */
var textContainer = document.getElementsByClassName("dm_article_text")[0];
var printContainer = textContainer.getElementsByClassName("printonly")[0];


/* we'll fetch each element hidden by printonly and append it to the non-hidden container */
printContainer.childNodes.forEach(function (element, index, array) {
    textContainer.appendChild(element.cloneNode(true));
});

/* clean up pagination and printonly area, as it is not needed anymore */
printContainer.remove();
document.getElementsByClassName("dm_table_of_contents_wrapper")[0].remove();
document.getElementsByClassName("dm_pagination_simple")[0].remove();

/* convert <p class="article_pagebreak"> to <h3> */
var headings_old = document.getElementsByClassName("article_pagebreak");
[].forEach.call(headings_old, function (element, index, array) { /* http://stackoverflow.com/a/3871602 */
    var heading_new = document.createElement("h3");
    heading_new.innerHTML = element.innerHTML;
    element.parentElement.replaceChild(heading_new, element);
    heading_new = null;
});
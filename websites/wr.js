/** Example:
  * http://www.wr.de/-id6647514.html
  */

/* wait for the slow js to render the page */
if (document.querySelector(".pager") != null) {
    window.addEventListener("load", wr, false);
}
function wr(evt) {
    /* pagination is done client-side by splitting article on every <h5> and hiding the pages by adding .page-container class to divs */
    pages = document.querySelectorAll(".page-container");
    pages.forEach(function (element) {
        element.style.display = "block";
    });

    /* convert <h5> to <h3> */
    var headings_old = document.querySelectorAll("h5");
    headings_old.forEach(function (heading_old) {
        var heading_new = document.createElement("h3");
        heading_new.innerHTML = heading_old.innerHTML;
        heading_old.parentElement.replaceChild(heading_new, heading_old);
    });

    /* hide pagination */    
    document.querySelector(".pager").style.display = "none";
}

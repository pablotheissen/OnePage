/** Example:
  * https://arstechnica.com/staff/2016/12/the-most-popular-stories-of-2016/
  * https://arstechnica.com/gadgets/2016/10/building-android-a-40000-word-history-of-googles-mobile-os/
  * https://arstechnica.com/video/2016/11/the-2016-13-and-15-inch-touch-bar-macbook-pros-reviewed/
  * https://arstechnica.com/apple/2011/07/mac-os-x-10-7/
  */
var all_pages_loaded = false;
/* replace-function for ars.superscroll.init() */
onepage_init = function(e) {
    /* e: page
       n: content wrapper
       r: pagination
       a: url to next page
       s: placeholder to put content of next page into */
    if (all_pages_loaded) { $('.page-numbers').hide(); return; }
    var n, r, a;
    var s = $('<div class="superscroll-placeholder" data-page="' + e + '"></div>')

    if(e === 1) {
        n = $(".article-content").closest(".column-wrapper");
        n.attr("data-page", e);
    } else {
        n = $('.column-wrapper[data-page="' + e + '"]');
    }
    r = n.find("nav.page-numbers");
    if(a = r.find("a span.next").parents("a").attr("href")) {
        n.after(s);
        e++;
        ars.superscroll.fetch_page(e, n, r, a, s);
    } else {
        r.hide();
    }
    if(e >= ars.ARTICLE.pages) {
        all_pages_loaded = true;
    }
    clearInterval(ars.superscroll.scroll_watch);
}

onepage_loader = function() {
    ars.superscroll.init = function(a) { return; };
    clearInterval(ars.superscroll.scroll_watch);
    /* overwrite interal init-function with custom one, so that ars.superscroll.fetch_page() calls onepage_init() */
    ars.superscroll.init = onepage_init;
    onepage_init(1);
}

/* wait for arstechnica scripts to fully load */
window.addEventListener("load", onepage_loader, false);

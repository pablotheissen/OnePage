/** Example:
  * http://www.macworld.co.uk/feature/mac-software/best-alternatives-itunes-for-mac-best-music-players-for-macos-3653318/
  */
var re = /Next\s(»|&raquo;)/i;
if (re.test(document.body.innerText)) {
    /* all slides are in the DOM; a JS script simply replaces the content of the current slide */
    slides = document.getElementsByClassName("slide");
    for (var key in slides) {
        /* show all hidden slides and images */
        slides[key].style.display = "block";
        imgTag = slides[key].getElementsByTagName("img")[0];
        imgTag.style.opacity = "1";
        /* the preloaded images are of bad quality (350px wide) so we'll replace them by the 800px
           full-width versions. data-src attribute contains a template for the filename */
        dataSrc = imgTag.getAttribute('data-src');
        if (typeof (dataSrc) == 'string') {
            if (dataSrc.search('{width}') != -1) {
                imgTag.src = imgTag.getAttribute('data-src').replace('{width}', '800');
            }
        }
        /* heading of article is repeated for each slide, hide them */
        if (key != 0) {
            slides[key].getElementsByClassName("slideTitle")[0].style.display = "none";
            swapDiv(slides[key].getElementsByClassName("slideDescription")[0]);
        }
        /* make all slides have the same ID as CSS only styles the slide with ID "firstSlide" */
        slides[key].id = "firstSlide";
    }
}

/* switch position of element $elm with element before $elm in DOM
   see http://stackoverflow.com/a/2943189/4096957 */
function findPrevious(elm) {
   do {
       elm = elm.previousSibling;
   } while (elm && elm.nodeType != 1);
   return elm;
}
function swapDiv(elm) {
    var previous = findPrevious(elm);
    if (previous) {
        elm.parentNode.insertBefore(elm, previous);
    }
}

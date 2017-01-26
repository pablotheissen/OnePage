
var re = /Next\s(»|&raquo;)/i;
if (re.test(document.body.innerText)) {
    slides = document.getElementsByClassName("slide");
    for (var key in slides) {
        slides[key].style.display = "block";
        imgTag = slides[key].getElementsByTagName("img")[0];
        imgTag.style.opacity = "1";
        dataSrc = imgTag.getAttribute('data-src');
        if (typeof (dataSrc) == 'string') {
            if (dataSrc.search('{width}') != -1) {
                imgTag.src = imgTag.getAttribute('data-src').replace('{width}', '800');
            }
        }
        if (key != 0) {
            slides[key].getElementsByClassName("slideTitle")[0].style.display = "none";
            swapDiv(slides[key].getElementsByClassName("slideDescription")[0]);
        }
        slides[key].id = "firstSlide";
    }
}

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

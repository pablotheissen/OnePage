/** Example:
  * http://sz.de/1.3348711
  */
runOnePage = function () {
    var re = /Alles\sauf\seiner\sSeite/i;
    if (re.test(document.body.textContent)/* && window.location.href.search("onepage") == -1*/) {
        var url = cleanUrl(window.location.href);

        var form = document.createElement("form");
        var input = document.createElement("input");

        form.action = url/* + "?onepage"*/;
        form.method = "post"

        input.type = "hidden";
        input.name = "article.singlePage";
        input.value = "true";
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    }
}

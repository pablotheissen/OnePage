/**
 * Example:
 * https://www.golem.de/news/indiegames-rundschau-u-boote-astronauten-und-haruki-murakami-1702-125929.html
 */
var url;

loadNextPage = function (dom) {
    if (dom.querySelector("link[rel=next]") !== null) {
        /* dom.querySelector("link[rel=next]").href doesn't work for fetched DOM, so we'll manually
           extract the next page URL */
        url = absolutePath(dom.querySelector("link[rel=next]").getAttribute("href"));

        if (url) {
            loadPageIntoDom(url,
                "article > .formatted",
                "article > .formatted",
                loadNextPage);
        } else {
            /* recall function to remove pagination */
            loadNextPage();
        }
    } else {
        /* run videos as they are usually loaded by a script */
        var videos = document.querySelectorAll("figure.gvideofig")
        videos.forEach(function (element) {
            if (element.childNodes.length === 0) {
                elementId = element.id;
                videoId = elementId.split("_")[1];
                videoElement = document.createElement("video");
                videoElement.setAttribute("controls", "");
                sourceElement = document.createElement("source");
                sourceElement.setAttribute("type", "video/mp4");
                sourceElement.setAttribute("src", "https://video.golem.de/download/" + videoId);
                videoElement.append(sourceElement);
                element.append(videoElement);
            }
        });

        /* remove pagination */
        document.querySelector("#list-jtoc").remove();
        document.querySelector("#table-jtoc").remove();
    }
}

runOnePage = function () {
    /* check if article is multipage */
    if (document.querySelector("link[rel=next]")) {
        loadNextPage(document);
    }
}    

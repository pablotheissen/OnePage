function cleanUrl(url) {
    if (url.indexOf("#") != -1) {
        url = url.substring(0, url.indexOf("#"));
    }
    if (url.indexOf("?") != -1) {
        url = url.substring(0, url.indexOf("?"));
    }
    return url;
}

// Takes a local path to intended 19x19 icon
//   and passes a correct SetIcon action to the callback
function createSetIconAction(path, callback) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image,0,0,19,19);
    var imageData = ctx.getImageData(0,0,19,19);
    var action = new chrome.declarativeContent.SetIcon({imageData: imageData});
    callback(action);
  }
  image.src = chrome.runtime.getURL(path);
}

createSetIconAction("what.png");

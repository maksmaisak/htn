// auto-redirects from "#/xxx" to "docs.html#/xxx"
// otherwise to "front.html"
let oldURL = "/#/";
let newURL = "/docs.html#/";
let indexURL = "/index.html";
let frontURL = "/front.html";
if (location && location.href && location.href.includes(oldURL) && !location.href.includes(newURL)) {
    location.replace(location.href.replace(oldURL, newURL));
} else if (location.href.includes(indexURL)) {
    location.replace(location.href.replace(indexURL, frontURL));
} else {
    location.replace(location.href + frontURL);
}

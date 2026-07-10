document.body.querySelector("input#t").setAttribute("inputmode", "none")

const link = document.createElement("link");
link.rel = "icon";
link.type="image/png";
link.href = chrome.runtime.getURL("ptt.png");
document.head.appendChild(link);

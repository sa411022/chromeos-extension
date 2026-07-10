interval = setInterval(() => {
  if(document.body.querySelector("div.fc-monetization-dialog-container")) {
    document.body.querySelector("div.fc-monetization-dialog-container").style.setProperty("display", "none", "important");
    clearInterval(interval);
  }
}, 1000);

const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = chrome.runtime.getURL("twpkinfo.png");
document.head.appendChild(link);

interval = setInterval(() => {
  if(document.body.querySelector("div.fc-monetization-dialog-container")) {
    document.body.querySelector("div.fc-monetization-dialog-container").style.setProperty("display", "none", "important");
    clearInterval(interval);
  }
}, 1000);

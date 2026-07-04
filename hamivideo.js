document.addEventListener("fullscreenchange", () => {
  const video = document.fullscreenElement?.querySelector("video#h5video");
  const dpr = window.devicePixelRatio;

  if (!video || dpr === Math.floor(dpr)) {
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.transform = "";
    video.style.transformOrigin = "";
    video.style.position = "";
    video.style.top = "";
    video.style.left = "";
    return;
  };

  video.style.width = "1920px";
  video.style.height = "1080px";
  video.style.transform = `scale(${window.innerWidth / 1920})`;
  video.style.transformOrigin = "top left";
  video.style.position = "fixed";
  video.style.top = "0";
  video.style.left = "0";
});

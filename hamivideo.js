document.addEventListener('fullscreenchange', () => {
  const video = document.fullscreenElement?.querySelector('video')
    || (document.fullscreenElement?.tagName === 'VIDEO' ? document.fullscreenElement : null);

  if (!video) return;

  const dpr = window.devicePixelRatio; // 2.4
  if (dpr === Math.floor(dpr)) return; // 整數倍不需修正

  // 讓 video 以物理像素尺寸渲染，再用 transform 縮回畫面大小
  video.style.width = `${window.innerWidth * dpr}px`;
  video.style.height = `${window.innerHeight * dpr}px`;
  video.style.transform = `scale(${1 / dpr})`;
  video.style.transformOrigin = 'top left';
  video.style.position = 'fixed';
  video.style.top = '0';
  video.style.left = '0';
});

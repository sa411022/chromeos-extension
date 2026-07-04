const displaySelect = document.getElementById('displaySelect');
const zoomInput = document.getElementById('zoomInput');
const applyBtn = document.getElementById('applyBtn');
const statusEl = document.getElementById('status');

let displays = [];

function loadDisplays() {
  chrome.system.display.getInfo({}, (info) => {
    if (chrome.runtime.lastError) {
      statusEl.textContent = '讀取螢幕資訊失敗: ' + chrome.runtime.lastError.message;
      return;
    }
    displays = info;
    displaySelect.innerHTML = '';
    info.forEach((d, idx) => {
      const opt = document.createElement('option');
      opt.value = d.id;
      const currentZoom = Math.round((d.displayZoomFactor || 1) * 100);
      opt.textContent = `${d.name} (${d.isPrimary ? '主要, ' : ''}目前 ${currentZoom}%)`;
      displaySelect.appendChild(opt);
    });
    // 預設帶入目前選取螢幕的縮放值，方便對照
    if (info.length > 0) {
      const first = info[0];
      zoomInput.value = Math.round((first.displayZoomFactor || 1) * 100);
    }
  });
}

displaySelect.addEventListener('change', () => {
  const d = displays.find(x => x.id === displaySelect.value);
  if (d) {
    zoomInput.value = Math.round((d.displayZoomFactor || 1) * 100);
  }
});

applyBtn.addEventListener('click', () => {
  const displayId = displaySelect.value;
  const percent = parseFloat(zoomInput.value);

  if (!displayId) {
    statusEl.textContent = '找不到選取的螢幕';
    return;
  }
  if (isNaN(percent) || percent < 10 || percent > 500) {
    statusEl.textContent = '請輸入 10 ~ 500 之間的數字';
    return;
  }

  const zoomFactor = percent / 100;

  chrome.system.display.setDisplayProperties(
    displayId,
    { displayZoomFactor: zoomFactor },
    () => {
      if (chrome.runtime.lastError) {
        statusEl.textContent = '套用失敗: ' + chrome.runtime.lastError.message;
      } else {
        statusEl.textContent = `已套用 ${percent}% 縮放，畫面應該立即改變。若沒反應，可重新整理此彈出視窗確認數值。`;
        loadDisplays();
      }
    }
  );
});

loadDisplays();

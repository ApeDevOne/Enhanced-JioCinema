// popup.js
document.getElementById('change').addEventListener('click', () => {
  let size = document.getElementById('size').value;
  let font = document.getElementById('font').value;
  let opacity = document.getElementById('opacity').value;
  chrome.action.setBadgeText({text: 'ON'});
  chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: changeSubtitleStyle,
      args: [size, font, opacity]
    });
  });
});

document.getElementById('size').addEventListener('input', () => {
  let size = document.getElementById('size').value;
  document.getElementById('sizeValue').innerText = size + '%';
});

document.getElementById('opacity').addEventListener('input', () => {
  let opacity = document.getElementById('opacity').value;
  document.getElementById('opacityValue').innerText = Math.round(opacity * 100) + '%';
});

function changeSubtitleStyle(size, font, opacity) {
  const textContainer = document.querySelector('.shaka-text-container');
  if (textContainer) {
    const observer = new MutationObserver(() => {
      const textRegions = document.querySelectorAll('.shaka-text-region');
      textRegions.forEach(region => {
        const textSpans = region.querySelectorAll('span');
        textSpans.forEach(span => {
          span.classList.add('custom-subtitle-style');
        });
      });
      const style = document.createElement('style');
      style.innerHTML = `
        .custom-subtitle-style {
          font-size: ${size}px !important;
          font-family: ${font} !important;
          background-color: rgba(0, 0, 0, ${opacity}) !important;
        }
      `;
      document.head.appendChild(style);
    });
    observer.observe(textContainer, {childList: true, subtree: true});
  }
}

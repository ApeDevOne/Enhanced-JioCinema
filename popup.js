// popup.js
document.getElementById('change').addEventListener('click', () => {
  let size = document.getElementById('size').value;
  chrome.action.setBadgeText({text: 'ON'});
  chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: changeSubtitleSize,
      args: [size]
    });
  });
});

function changeSubtitleSize(size) {
  const textContainer = document.querySelector('.shaka-text-container');
  if (textContainer) {
    const observer = new MutationObserver(() => {
      const textRegions = document.querySelectorAll('.shaka-text-region');
      textRegions.forEach(region => {
        const textSpans = region.querySelectorAll('span');
        textSpans.forEach(span => {
          span.classList.add('custom-subtitle-size');
        });
      });
      const style = document.createElement('style');
      style.innerHTML = `
        .custom-subtitle-size {
          font-size: ${size}px !important;
        }
      `;
      document.head.appendChild(style);
    });
    observer.observe(textContainer, {childList: true, subtree: true});
  }
}

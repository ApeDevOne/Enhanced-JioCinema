document.addEventListener('DOMContentLoaded', () => {
  
  chrome.storage.sync.get(['font', 'size', 'opacity'], (data) => {
    const font = data.font || 'Arial';
    const size = data.size || 50; // Default size
    const opacity = data.opacity || 0.5; // Default opacity

    document.getElementById('font').value = font;
    document.getElementById('size').value = size;
    document.getElementById('sizeValue').innerText = size + '%';
    document.getElementById('opacity').value = opacity;
    document.getElementById('opacityValue').innerText = Math.round(opacity * 100) + '%';

    
    changeSubtitleStyle(size, font, opacity);
  });

  
  document.getElementById('change').addEventListener('click', () => {
    let size = document.getElementById('size').value;
    let font = document.getElementById('font').value;
    let opacity = document.getElementById('opacity').value;

    
    chrome.storage.sync.set({ font, size, opacity }, () => {
      console.log('Settings saved:', { font, size, opacity });
    });

    
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#4688F1' });

    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `(${changeSubtitleStyle.toString()})(${size}, '${font}', ${opacity});`
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
});



function changeSubtitleStyle(size, font, opacity) {
  const observer = new MutationObserver(() => {
    const textContainers = document.querySelectorAll('div[class^="mui-style-"][class$="-subtitlesContainer"]');
    textContainers.forEach(container => {
      const textSpans = container.querySelectorAll('span');
      textSpans.forEach(span => {
        span.classList.add('custom-subtitle-style');
      });
    });

    const style = document.createElement('style');
    style.innerHTML = `
      div[class^="mui-style-"][class$="-subtitlesContainer"] span.custom-subtitle-style {
        font-size: ${size}px !important;
        font-family: ${font} !important;
        background-color: rgba(0, 0, 0, ${opacity}) !important;
      }
    `;
    document.head.appendChild(style);
  });

  const subtitleContainer = document.querySelector('#subtitle-1');
  if (subtitleContainer) {
    observer.observe(subtitleContainer, { childList: true, subtree: true });
  }
}



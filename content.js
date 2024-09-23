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





















function hideElements() {
    
    const element1 = document.querySelector('.mui-style-14bpygg-showScrim.mui-style-1pgbicw-scrim');
    if (element1) {
        element1.style.display = 'none'; 
        console.log('First element hidden');
    }

    
    const element2 = document.querySelector('.h-fit.ml-6');
    if (element2) {
        element2.style.display = 'none'; 
        console.log('Second element hidden');
    }

    
    const element3 = document.querySelector('.mui-style-1p87yg8-watermarkContainer');
    if (element3) {
        element3.style.display = 'none'; 
        console.log('Third element hidden');
    }
}


hideElements();


const observer = new MutationObserver(hideElements);
observer.observe(document.body, { childList: true, subtree: true });






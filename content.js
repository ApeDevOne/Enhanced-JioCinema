function changeSubtitleStyle(size, font, opacity) {
  const textContainer = document.querySelector('.shaka-text-container');
  if (textContainer) {
    const observer = new MutationObserver(() => {
      const textRegions = document.querySelectorAll('.shaka-text-region');
      textRegions.forEach(region => {
        const textSpans = region.querySelectorAll('span span');
        textSpans.forEach(span => {
          span.classList.add('custom-subtitle-style');
        });
      });
      const style = document.createElement('style');
      style.innerHTML = `
        .shaka-text-region span span.custom-subtitle-style {
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






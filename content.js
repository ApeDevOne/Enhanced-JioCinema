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

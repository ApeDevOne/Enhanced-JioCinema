function changeSubtitleSize(size) {
  const textContainer = document.querySelector('.shaka-text-container');
  if (textContainer) {
    const textSpans = textContainer.querySelectorAll('.shaka-text-region span span');
    textSpans.forEach(span => {
      span.style.fontSize = `${size}px`;
    });
  }
}

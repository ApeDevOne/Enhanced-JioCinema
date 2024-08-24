chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    const oldStrings = ["hst264_web_premium", "jc_web_premium"];
    const newString = "jc_androidtv_premium";

    if (url.pathname.endsWith(".mpd")) {
      let newUrl = url.href;
      oldStrings.forEach(oldString => {
        if (newUrl.includes(oldString)) {
          newUrl = newUrl.replace(oldString, newString);
        }
      });

      if (newUrl !== url.href) {
        return { redirectUrl: newUrl };
      }
    }
    return {};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);













function changeSubtitleSize(size) {
  const textContainer = document.querySelector('.shaka-text-container');
  if (textContainer) {
    const textSpans = textContainer.querySelectorAll('.shaka-text-region span span');
    textSpans.forEach(span => {
      span.style.fontSize = `${size}px`;
    });
  }
}







const currentVersion = '1.4'; // Current version of your extension

function checkForUpdate() {
  fetch('https://apedevone.github.io/Enhanced-JioCinema/update.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      if (data.version !== currentVersion) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Update Available',
          message: `A new version (${data.version}) is available. Click to update.`,
          buttons: [{ title: 'Update Now' }],
        }, function(notificationId) {
          chrome.notifications.onButtonClicked.addListener(function(buttonIndex) {
            if (buttonIndex === 0) {
              chrome.tabs.create({ url: data.url });
            }
          });
        });
      }
    })
    .catch(error => console.error('Error checking for updates:', error));
}

// Check for updates periodically (e.g., every hour)
setInterval(checkForUpdate, 3600000); // 1 hour in milliseconds

// Check for updates immediately when the extension starts
checkForUpdate();



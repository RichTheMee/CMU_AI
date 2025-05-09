(function() {
  // Create style tag
  const style = document.createElement('style');
  style.textContent = `
    #calloutBox {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #007BFF;
      color: white;
      padding: 10px 15px;
      border-radius: 10px;
      cursor: pointer;
      z-index: 999;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }
    #iframePopup {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      background-color: white;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
    }
    #closePopup {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
    }
    #iframePopup iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 15px;
    }
  `;
  document.head.appendChild(style);

  // Create callout box
  const calloutBox = document.createElement('div');
  calloutBox.id = 'calloutBox';
  calloutBox.textContent = 'Open AI Module';
  document.body.appendChild(calloutBox);

  // Create popup container
  const iframePopup = document.createElement('div');
  iframePopup.id = 'iframePopup';

  const closePopup = document.createElement('div');
  closePopup.id = 'closePopup';
  closePopup.textContent = '×';

  const iframe = document.createElement('iframe');
  iframe.src = 'https://script.google.com/macros/s/AKfycbxdhAeccjOfZu6La-yz6Y1ylBJk8c_MQCUj_S4stjqFmO2ODEySwUJEmK5SmkDGDBk5/exec?courseId=732&pageName=module-1-3-dot-4-the-evolution-of-ai';
  iframe.loading = 'lazy';

  iframePopup.appendChild(closePopup);
  iframePopup.appendChild(iframe);
  document.body.appendChild(iframePopup);

  // Add event listeners
  calloutBox.addEventListener('click', () => {
    iframePopup.style.display = 'block';
  });

  closePopup.addEventListener('click', () => {
    iframePopup.style.display = 'none';
  });
})();

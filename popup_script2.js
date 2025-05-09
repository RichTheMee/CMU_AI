(function() {
  // ——— Inject styles ———
  const style = document.createElement('style');
  style.textContent = `
    /* Backdrop behind popup */
    #iframeBackdrop {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9998;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    /* Callout button */
    #calloutBox {
      position: fixed;
      bottom: 40px;
      right: 40px;
      background: linear-gradient(135deg, #4A90E2, #357ABD);
      colour: #fff;
      font-family: "Segoe UI", Tahoma, sans-serif;
      font-size: 1rem;
      padding: 12px 18px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      z-index: 10000;
    }
    #calloutBox:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    }

    /* Popup container */
    #iframePopup {
      display: none;
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      width: 80%; max-width: 900px;
      height: 80%; max-height: 600px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      z-index: 9999;
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    #iframePopup.open {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    /* Close button */
    #closePopup {
      position: absolute;
      top: 8px; right: 12px;
      font-size: 1.4rem;
      line-height: 1;
      color: #666;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    #closePopup:hover {
      color: #000;
    }

    /* Iframe styling */
    #iframePopup iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `;
  document.head.appendChild(style);

  // ——— Create backdrop ———
  const backdrop = document.createElement('div');
  backdrop.id = 'iframeBackdrop';
  document.body.appendChild(backdrop);

  // ——— Create callout button ———
  const calloutBox = document.createElement('button');
  calloutBox.id = 'calloutBox';
  calloutBox.textContent = 'Open AI Module';
  document.body.appendChild(calloutBox);

  // ——— Create popup container ———
  const iframePopup = document.createElement('div');
  iframePopup.id = 'iframePopup';

  const closePopup = document.createElement('div');
  closePopup.id = 'closePopup';
  closePopup.textContent = '✕';

  const iframe = document.createElement('iframe');
  iframe.src = 'https://script.google.com/macros/s/AKfycbxdhAeccjOfZu6La-yz6Y1ylBJk8c_MQCUj_S4stjqFmO2ODEySwUJEmK5SmkDGDBk5/exec?courseId=732&pageName=module-1-3-dot-4-the-evolution-of-ai';
  iframe.loading = 'lazy';

  iframePopup.appendChild(closePopup);
  iframePopup.appendChild(iframe);
  document.body.appendChild(iframePopup);

  // ——— Open & close logic ———
  calloutBox.addEventListener('click', () => {
    backdrop.style.display = 'block';
    iframePopup.classList.add('open');
    // trigger fade-in
    setTimeout(() => backdrop.style.opacity = '1', 10);
  });

  closePopup.addEventListener('click', () => {
    backdrop.style.opacity = '0';
    iframePopup.classList.remove('open');
    // after transition, hide backdrop
    backdrop.addEventListener('transitionend', () => {
      if (!iframePopup.classList.contains('open')) backdrop.style.display = 'none';
    }, { once: true });
  });

  // also close if backdrop clicked
  backdrop.addEventListener('click', () => closePopup.click());
})();

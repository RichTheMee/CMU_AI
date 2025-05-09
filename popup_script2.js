<!-- 1) Configuration: position, size, etc. -->
<script>
  window.PopupConfig = {
    width:  '300px',   // panel width
    height: '200px',   // panel height
    bottom: '20px',    // distance from bottom
    right:  '20px'     // distance from right
  };
</script>

<!-- 2) Popup script with page-context capture -->
<script>
(function() {
  console.log('popup_script2.js loaded with config:', window.PopupConfig);

  // ——— Configurable settings ———
  const cfg = window.PopupConfig || {
    width:  '300px',
    height: '200px',
    bottom: '20px',
    right:  '20px'
  };

  // ——— Capture page context ———
  const pageUrl   = window.location.href;
  const pageTitle = document.title;
  // Try to grab main content; adjust selector if your theme differs
  let pageText = '';
  const mainRegion = document.querySelector('.region-content, #page-content, .course-content');
  if (mainRegion) {
    pageText = mainRegion.innerText.trim();
  } else {
    pageText = document.body.innerText.trim();
  }
  // Truncate to 8000 chars to avoid URL overflow
  pageText = pageText.substring(0, 8000);

  // ——— Build iframe src with encoded params ———
  const baseEndpoint = 'https://script.google.com/macros/s/AKfycbxdhAeccjOfZu6La-yz6Y1ylBJk8c_MQCUj_S4stjqFmO2ODEySwUJEmK5SmkDGDBk5/exec';
  const params = new URLSearchParams({
    courseId: '732',
    pageUrl,
    pageTitle,
    pageText
  });
  const iframeSrc = `${baseEndpoint}?${params.toString()}`;
  console.log('Loading iframe from:', iframeSrc);

  // ——— Inject styles ———
  const style = document.createElement('style');
  style.textContent = `
    #iframePopup {
      position: fixed;
      width: ${cfg.width};
      height: ${cfg.height};
      bottom: ${cfg.bottom};
      right: ${cfg.right};
      background: rgba(255,255,255,0.95);
      border: 1px solid #ccc;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      overflow: auto;
      resize: both;
      z-index: 10000;
      display: flex;
      flex-direction: column;
    }
    /* Drag handle */
    #iframePopup .drag-handle {
      background: #f0f0f0;
      padding: 4px 8px;
      cursor: move;
      user-select: none;
      border-bottom: 1px solid #ddd;
      font-size: 0.9rem;
    }
    #iframePopup iframe {
      flex: 1;
      border: none;
    }
    /* Controls (minimise & close) */
    #iframePopup .controls {
      position: absolute;
      top: 4px;
      right: 8px;
    }
    #iframePopup .controls span {
      margin-left: 8px;
      cursor: pointer;
      font-weight: bold;
    }
    /* Callout button */
    #calloutBox {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #357ABD;
      color: #fff;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      z-index: 10001;
      font-family: sans-serif;
    }
  `;
  document.head.appendChild(style);

  // ——— Build elements ———
  const callout = document.createElement('div');
  callout.id = 'calloutBox';
  callout.textContent = 'Open Module';
  document.body.appendChild(callout);

  const popup = document.createElement('div');
  popup.id = 'iframePopup';
  popup.style.display = 'none';

  // drag handle
  const handle = document.createElement('div');
  handle.className = 'drag-handle';
  handle.textContent = pageTitle || 'Module';
  popup.appendChild(handle);

  // controls: minimise & close
  const ctrl = document.createElement('div');
  ctrl.className = 'controls';
  const minBtn = document.createElement('span');
  minBtn.textContent = '—';
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  ctrl.append(minBtn, closeBtn);
  popup.appendChild(ctrl);

  // iframe
  const iframe = document.createElement('iframe');
  iframe.src = iframeSrc;
  popup.appendChild(iframe);

  document.body.appendChild(popup);

  // ——— Behaviour ———
  callout.onclick = () => popup.style.display = 'block';
  closeBtn.onclick = () => popup.style.display = 'none';
  minBtn.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  };

  // ——— Simple drag logic ———
  handle.onmousedown = e => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const rect = popup.getBoundingClientRect();
    const onMouseMove = ev => {
      popup.style.left   = rect.left + (ev.clientX - startX) + 'px';
      popup.style.top    = rect.top  + (ev.clientY - startY) + 'px';
      popup.style.bottom = 'auto';
      popup.style.right  = 'auto';
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', onMouseMove), { once: true }
    );
  };
})();
</script>

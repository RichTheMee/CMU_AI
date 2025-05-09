<script>
(function() {
  // ——— Configurable settings ———
  const cfg = window.PopupConfig || {
    width: '300px',
    height: '200px',
    bottom: '20px',
    right: '20px'
  };

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
    /* Buttons */
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
      colour: #fff;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      z-index: 10001;
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
  handle.textContent = 'AI Module';
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
  iframe.src = 'https://…/exec?courseId=732&pageName=…';
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
      popup.style.left  = rect.left + (ev.clientX - startX) + 'px';
      popup.style.top   = rect.top  + (ev.clientY - startY) + 'px';
      popup.style.bottom = 'auto';
      popup.style.right  = 'auto';
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  };
})();
</script>

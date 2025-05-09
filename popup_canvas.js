<script>
(function() {
  const url = window.location.href;

  // only run on course 729’s assignments, pages or modules
  const shouldRun =
       url.includes('/courses/729/assignments/')
    || url.includes('/courses/729/pages/')
    || url.includes('/courses/729/modules/');

  if (!shouldRun) return;

  // —— your existing popup code starts here ——
  const cfg = window.PopupConfig || {
    width:  '300px',
    height: '200px',
    bottom: '20px',
    right:  '20px'
  };

  // inject styles
  const style = document.createElement('style');
  style.textContent = `
    #iframePopup { position: fixed; width: ${cfg.width}; height: ${cfg.height};
      bottom: ${cfg.bottom}; right: ${cfg.right};
      background: rgba(255,255,255,0.95); border: 1px solid #ccc;
      border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      overflow: auto; resize: both; z-index: 10000;
      display: flex; flex-direction: column;
    }
    #iframePopup .drag-handle { background: #f0f0f0; padding: 4px 8px;
      cursor: move; user-select: none; border-bottom: 1px solid #ddd;
      font-size: 0.9rem;
    }
    #iframePopup iframe { flex: 1; border: none; }
    #iframePopup .controls { position: absolute; top: 4px; right: 8px; }
    #iframePopup .controls span { margin-left: 8px; cursor: pointer; font-weight: bold; }
    #calloutBox { position: fixed; bottom: 20px; right: 20px;
      background: #357ABD; color: #fff; padding: 8px 12px;
      border-radius: 4px; cursor: pointer; z-index: 10001;
      font-family: sans-serif;
    }
  `;
  document.head.appendChild(style);

  // build callout button
  const callout = document.createElement('div');
  callout.id = 'calloutBox';
  callout.textContent = 'Open Module';
  document.body.appendChild(callout);

  // build popup container
  const popup = document.createElement('div');
  popup.id = 'iframePopup';
  popup.style.display = 'none';

  // drag handle
  const handle = document.createElement('div');
  handle.className = 'drag-handle';
  handle.textContent = document.title || 'Module';
  popup.appendChild(handle);

  // minimise & close buttons
  const ctrl = document.createElement('div');
  ctrl.className = 'controls';
  const minBtn   = document.createElement('span'); minBtn.textContent   = '—';
  const closeBtn = document.createElement('span'); closeBtn.textContent = '✕';
  ctrl.append(minBtn, closeBtn);
  popup.appendChild(ctrl);

  // iframe (adjust src as needed)
  const iframe = document.createElement('iframe');
  iframe.src = 'https://script.google.com/macros/s/AKfycbxdhAeccjOfZu6La-yz6Y1ylBJk8c_MQCUj_S4stjqFmO2ODEySwUJEmK5SmkDGDBk5/exec?courseId=729&pageName='
               + encodeURIComponent(document.title);
  popup.appendChild(iframe);

  document.body.appendChild(popup);

  // behaviour
  callout.onclick = () => popup.style.display = 'block';
  closeBtn.onclick = () => popup.style.display = 'none';
  minBtn.onclick   = () => iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';

  // simple drag logic
  handle.onmousedown = e => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const rect   = popup.getBoundingClientRect();
    const onMouseMove = ev => {
      popup.style.left   = rect.left + (ev.clientX - startX) + 'px';
      popup.style.top    = rect.top  + (ev.clientY - startY) + 'px';
      popup.style.bottom = 'auto'; popup.style.right = 'auto';
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', onMouseMove),
    { once: true });
  };

  // —— end of popup code ——
})();
</script>

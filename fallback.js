(() => {
  if (window.Fallback) return;

  const style = document.createElement("style");
  style.textContent = `
  .fb-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.4);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: system-ui,-apple-system,BlinkMacSystemFont;
  }
  .fb-card {
    background: white;
    width: 340px;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 30px 60px rgba(0,0,0,.25);
  }
  .fb-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 6px;
  }
  .fb-text {
    font-size: 14px;
    color: #555;
    line-height: 1.5;
  }
  .fb-actions {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  .fb-btn {
    background: #007aff;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 14px;
    cursor: pointer;
  }
  .fb-btn.secondary {
    background: transparent;
    color: #007aff;
  }
  .fb-banner {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,.85);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    padding: 8px 14px;
    font-size: 13px;
    color: #444;
    box-shadow: 0 8px 20px rgba(0,0,0,.12);
    z-index: 999999;
  }
  .fb-img-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    color: #777;
    font-size: 12px;
    border-radius: 12px;
  }
  `;
  document.head.appendChild(style);

  let overlayVisible = false;
  let offlineBanner;

  function showOverlay(title, text) {
    if (overlayVisible) return;
    overlayVisible = true;

    const overlay = document.createElement("div");
    overlay.className = "fb-overlay";
    overlay.innerHTML = `
      <div class="fb-card" role="dialog" aria-modal="true">
        <div class="fb-title">${title}</div>
        <div class="fb-text">${text}</div>
        <div class="fb-actions">
          <button class="fb-btn secondary">Close</button>
          <button class="fb-btn">Reload</button>
        </div>
      </div>
    `;

    const close = () => {
      overlayVisible = false;
      overlay.remove();
    };

    overlay.querySelector(".secondary").onclick = close;
    overlay.querySelector(".fb-btn:not(.secondary)").onclick = () =>
      location.reload();

    overlay.addEventListener("click", e => {
      if (e.target === overlay) close();
    });

    document.addEventListener(
      "keydown",
      e => e.key === "Escape" && close(),
      { once: true }
    );

    document.body.appendChild(overlay);
  }

  window.onerror = () =>
    showOverlay(
      "Unexpected error",
      "This page encountered an error. Reloading may help."
    );

  window.addEventListener("unhandledrejection", () =>
    showOverlay(
      "Background error",
      "A background task failed. Reloading may help."
    )
  );

  document.addEventListener(
    "error",
    e => {
      const el = e.target;
      if (el.tagName === "IMG") {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "center";

        wrapper.style.width = (el.width || 240) + "px";
        wrapper.style.height = (el.height || 160) + "px";

        wrapper.className = "fb-img-fallback";
        wrapper.textContent = "Image unavailable";

        el.replaceWith(wrapper);
      }
    },
    true
  );

  function showOffline() {
    if (offlineBanner) return;
    offlineBanner = document.createElement("div");
    offlineBanner.className = "fb-banner";
    offlineBanner.textContent = "Offline mode";
    document.body.appendChild(offlineBanner);
  }

  function hideOffline() {
    offlineBanner?.remove();
    offlineBanner = null;
  }

  window.addEventListener("offline", showOffline);
  window.addEventListener("online", hideOffline);
  if (!navigator.onLine) showOffline();

  window.Fallback = { version: "0.2.0" };
})();

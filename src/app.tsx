window.addEventListener('load', () => {
  const evOpts = { capture: true, passive: true };
  let hoveredLink = null;

  const linkElements = document.getElementsByTagName('a');
  for (const link of linkElements) {
    link.addEventListener(
      'mouseenter',
      () => {
        hoveredLink = link;
      },
      evOpts,
    );
    link.addEventListener(
      'mouseleave',
      () => {
        hoveredLink = null;
      },
      evOpts,
    );
  }

  function eventKeyDown(ev) {
    if (hoveredLink && (ev.metaKey || ev.ctrlKey) && ev.key === 'c') {
      const linkUrl = hoveredLink.href;
      if (linkUrl !== null) {
        GM_setClipboard(linkUrl);
      }
    }
  }

  window.addEventListener('keydown', eventKeyDown, evOpts);
});

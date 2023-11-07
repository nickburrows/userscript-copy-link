window.addEventListener('load', () => {
  const evOpts = { capture: true, passive: true };
  let hoveredLink = null;

  function findNearestLink(element) {
    if (!element) {
      return null;
    }

    if (element.tagName === 'A') {
      return element.href;
    }

    return findNearestLink(element.href);
  }

  const linkElements = document.getElementsByTagName('a');

  for (const link of linkElements) {
    link.addEventListener(
      'mouseover',
      (event) => {
        hoveredLink = findNearestLink(event.target);
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

  function eventKeyDown(event) {
    const keyName = event.key;
    if (keyName === 'Control' || keyName === 'Meta') {
      return;
    }
    if (event.ctrlKey || event.metaKey) {
      if (keyName === 'c' && hoveredLink !== null) {
        GM.setClipboard(hoveredLink);
      }
    }
  }

  window.addEventListener('keydown', eventKeyDown, evOpts);
});

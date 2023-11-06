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
      () => {
        hoveredLink = findNearestLink(link);
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
    if ((ev.metaKey || ev.ctrlKey) && ev.key === 'c') {
      if (hoveredLink !== null) {
        GM.setClipboard(hoveredLink);
        GM.notification({
          text: hoveredLink,
          title: '複製完成!',
          timeout: 2000,
          // ondone: function () {
          //   console.log('Link Copied!', hoveredLink);
          // },
        });
      }
    }
  }

  window.addEventListener('keydown', eventKeyDown, evOpts);
});

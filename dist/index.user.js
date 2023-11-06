// ==UserScript==
// @name        Copy URL Link
// @namespace   https://github.com/nickburrows/userscript-copy-link
// @description 一個用來複製連結網址的userscript
// @match       *://*/*
// @inject-into content
// @version     0.0.34
// @author      Nick Lin
// @icon        https://raw.githubusercontent.com/nickburrows/userscript-copy-link/e8f248af59bea72aeb08ded7743765ac1d6801ef/static/icon_32.png
// @updateURL   https://github.com/nickburrows/userscript-copy-link/raw/main/dist/index.user.js
// @grant       GM.setClipboard
// ==/UserScript==

(function () {
'use strict';

window.addEventListener('load', () => {
  const evOpts = {
    capture: true,
    passive: true
  };
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
    link.addEventListener('mouseover', event => {
      hoveredLink = findNearestLink(event.target);
    }, evOpts);
    link.addEventListener('mouseleave', () => {
      hoveredLink = null;
    }, evOpts);
  }
  function eventKeyDown(event) {
    const keyName = event.key;
    if ((event.ctrlKey || event.metaKey) && keyName === 'c') {
      if (hoveredLink !== null) {
        GM.setClipboard(hoveredLink);
      }
    }
  }
  window.addEventListener('keydown', eventKeyDown, evOpts);
});

})();

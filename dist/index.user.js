// ==UserScript==
// @name        Copy URL Link
// @namespace   https://github.com/nickburrows/userscript-copy-link
// @description 一個用來複製連結網址的userscript
// @match       *://*/*
// @version     0.0.31
// @author      Nick Lin
// @icon        https://raw.githubusercontent.com/nickburrows/userscript-copy-link/e8f248af59bea72aeb08ded7743765ac1d6801ef/static/icon_32.png
// @grant       GM.notification
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
    link.addEventListener('mouseover', () => {
      hoveredLink = findNearestLink(link);
    }, evOpts);
    link.addEventListener('mouseleave', () => {
      hoveredLink = null;
    }, evOpts);
  }
  function eventKeyDown(ev) {
    if ((ev.metaKey || ev.ctrlKey) && ev.key === 'c') {
      if (hoveredLink !== null) {
        GM.setClipboard(hoveredLink);
        GM.notification({
          text: hoveredLink,
          title: '複製完成!',
          timeout: 2000
          // ondone: function () {
          //   console.log('Link Copied!', hoveredLink);
          // },
        });
      }
    }
  }

  window.addEventListener('keydown', eventKeyDown, evOpts);
});

})();

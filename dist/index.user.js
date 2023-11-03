// ==UserScript==
// @name        Copy URL Link
// @namespace   https://github.com/nickburrows/userscript-copy-link
// @description This is a userscript.
// @match       *://*/*
// @version     0.0.16
// @author      Nick Lin
// @require     https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@2,npm/@violentmonkey/ui@0.7
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2/dist/solid.js
// @grant       GM_notification
// @grant       GM_setClipboard
// ==/UserScript==

(function () {
'use strict';

let hoveredLinkUrl = null;
function findNearestLink(element) {
  if (!element) {
    return null;
  }
  if (element.tagName === 'A') {
    return element.href;
  }
  return findNearestLink(element.href);
}
function handleMouseOver(event) {
  // Check if the target element is a link
  const linkElement = event.target;
  // Add event listener only if the target is a link and it doesn't have a specific class (e.g., 'ignore-link')
  if (linkElement && linkElement.classList && !linkElement.classList.contains('ignore-link')) {
    hoveredLinkUrl = findNearestLink(linkElement);
    console.log('hoveredLinkUrl', hoveredLinkUrl);
  } else {
    // Reset when not over a valid link
    hoveredLinkUrl = null;
  }
}
function handleKeyDown(event) {
  // Check if the pressed key is 'c' and the 'cmd' key is also pressed (for Mac) or 'ctrl' key is pressed (for Windows/Linux)
  if (event.key === 'c' && (event.metaKey || event.ctrlKey)) {
    //   console.log("按下鍵盤了!!");
    if (hoveredLinkUrl) {
      // Set the copied text to the hovered link URL
      GM_setClipboard(hoveredLinkUrl);
      console.log('Success! Link URL copied: ' + hoveredLinkUrl);
    }
  }
}

// Find all link elements in the document and add mouseover event listeners
const linkElements = document.querySelectorAll('a');
linkElements.forEach(function (linkElement) {
  linkElement.addEventListener('mouseover', handleMouseOver);
  linkElement.addEventListener('mouseleave', () => {
    hoveredLinkUrl = null;
  });
});

// 當滑鼠移入時，觸發監聽事件鍵盤按下
document.addEventListener('keydown', handleKeyDown);

})();

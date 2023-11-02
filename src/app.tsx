let hoveredLinkUrl = null;

function findNearestLink(element) {
  if (!element) {
    return null;
  }

  if (element.tagName === 'A') {
    return element.href;
  }

  return findNearestLink(element.parentElement);
}

function handleMouseOver(event) {
  // Check if the target element is a link
  const linkElement = event.target;
  console.log('linkElement', linkElement);
  // Add event listener only if the target is a link and it doesn't have a specific class (e.g., 'ignore-link')
  if (
    linkElement &&
    linkElement.classList &&
    !linkElement.classList.contains('ignore-link')
  ) {
    hoveredLinkUrl = findNearestLink(linkElement);
  } else {
    // Reset when not over a valid link
    hoveredLinkUrl = null;
  }
}

function handleKeyDown(event) {
  // Check if the pressed key is 'c' and the 'cmd' key is also pressed (for Mac) or 'ctrl' key is pressed (for Windows/Linux)
  if (event.key === 'c' && (event.metaKey || event.ctrlKey)) {
    console.log('按下鍵盤了!!');
    if (hoveredLinkUrl) {
      // Set the copied text to the hovered link URL
      GM_setClipboard(hoveredLinkUrl);
      console.log('Link URL copied: ' + hoveredLinkUrl);
    }
  }
}

function noLink() {
  console.log('滑鼠離開了!!');
  hoveredLinkUrl = null;
}

// Find all link elements in the document and add mouseover event listeners
const linkElements = document.querySelectorAll('a');

linkElements.forEach(function (linkElement) {
  linkElement.addEventListener('mouseover', handleMouseOver);
  linkElement.addEventListener('mouseleave', noLink);
});

// Add keydown event listener to the document
document.addEventListener('keydown', handleKeyDown);

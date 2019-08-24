import debounce from 'debouncy';

const onMutationHappen = (ele, cb) => {
  const targetNode = ele;
  const config = { attributes: true, childList: true, subtree: true };

  let observer;
  // Callback function to execute when mutations are observed
  const callback = mutationsList => {
    observer.disconnect();
    // console.log('>>> mutation callback called', mutationsList);
    cb && cb(mutationsList);
  };

  observer = new MutationObserver(callback);

  observer.observe(targetNode, config);

  return observer;
};

let debounceLinkified;

const linkifyElement = ajaxContainer => {
  const title = ajaxContainer.querySelector('.js-issue-title');
  if (title) {
    let sentry = title.querySelector('noscript');
    if (!sentry) {
      sentry = document.createElement('noscript');
      const innerText = title.innerText;

      // console.log('>>> linkifying node', title);

      title.innerHTML = innerText.replace(/CPM-\d+/g, '<a target="blank" href="https://redisrupt.atlassian.net/browse/$&">$&</a>');
      title.appendChild(sentry);
    } else {
      // console.log('>>> sentry found skipping linkification');
    }
  }

  onMutationHappen(ajaxContainer, () => {
    debounceLinkified(ajaxContainer);
  });
};

debounceLinkified = debounce(linkifyElement, 500);

const enableLinkify = () => {
  const ajaxContainer = document.querySelector('.application-main');

  if (!ajaxContainer) return;

  linkifyElement(ajaxContainer);
};

window.addEventListener('load', () => {
  enableLinkify();
});

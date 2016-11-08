// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function showView (hash) {
  var view =  document.querySelector(hash || '');
  if (!view) {
    return;
  }

  if (view.classList.contains('visible')) {
    return;
  }

  [].map.call(document.querySelectorAll('.view.visible'), function (view) {
    view.classList.remove('visible');
  });
  view.classList.add('visible');
}

showView(window.location.hash || '.view');

window.addEventListener('hashchange', function () {
  showView(window.location.hash);
});

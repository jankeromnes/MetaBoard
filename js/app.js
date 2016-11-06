// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

function showView (hash) {
  var view = $(hash || '');
  if (!view) {
    return;
  }

  if (view.classList.contains('visible')) {
    return;
  }

  [].map.call($$('.view.visible'), function (view) {
    view.classList.remove('visible');
  });
  view.classList.add('visible');
}

window.addEventListener('hashchange', function () {
  showView(window.location.hash);
});

(function() {
  if (!window.nwDispatcher) {
    return;
  }

  // Enable livereload in Node WebKit
  var watchPath = './dist';
  var fs = require('fs');

  fs.watch(watchPath, function() {
    window.location.reload();
  });
})();

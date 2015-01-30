(function() {
  if (!window.nwDispatcher) {
    return;
  }

  // Restore Node's `global`
  window.global = window.globalNode;

  // Shim `window.require`
  var requireApp = window.require;
  var requireNode = window.requireNode;

  if (requireApp) {
    window.require = function() {
      try {
        return requireApp.apply(null, arguments);
      } catch (e) {
        return requireNode.apply(null, arguments);
      }
    };
  } else {
    window.require = requireNode;
  }
})();

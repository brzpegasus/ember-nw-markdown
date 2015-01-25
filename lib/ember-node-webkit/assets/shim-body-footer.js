(function() {
  if (!window.nwDispatcher) {
    return;
  }

  // Restore Node's `global`
  window.global = window.globalNode;

  // Shim `window.require`
  var _require = window.require;
  var requireNode = window.requireNode;

  if (_require) {
    window.require = function() {
      try {
        return _require.apply(null, arguments);
      } catch (e) {
        return requireNode.apply(null, arguments);
      }
    };
  } else {
    window.require = requireNode;
  }
})();

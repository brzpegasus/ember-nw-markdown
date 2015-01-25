if (window.nwDispatcher) {
  // Stub out Node's `require` so it doesn't conflict with
  // AMD's `require` function.
  window.requireNode = window.require;
  delete window.require;

  // Stub out Node's `global` so some third-party libraries
  // can bind to `window` properly.
  window.globalNode = window.global;
  delete window.global;
}

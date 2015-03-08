var process = window.process;
var isMac = process && process.platform === 'darwin';

export default {
  isNodeWebKit: typeof window.nwDispatcher !== 'undefined',
  isMac: isMac,
  cmdKey: isMac ? 'cmd' : 'ctrl',
  userHome: process && (process.env.USERPROFILE || process.env.HOME)
};

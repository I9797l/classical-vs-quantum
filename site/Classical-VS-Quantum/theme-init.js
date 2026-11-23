/*
 * Sets the theme before the first paint, so a light-theme visitor never sees a
 * flash of the dark design.
 *
 * This is an external classic script rather than the usual inline snippet
 * because the app ships a Content-Security-Policy of `script-src 'self'` with
 * no 'unsafe-inline' — an inline <script> here would simply be blocked in
 * production. Being classic (not type="module") also matters: module scripts
 * are deferred, which would paint first and defeat the point.
 *
 * Dark is the default and lives in plain CSS, so this only ever needs to act on
 * 'light'. Any missing, corrupt or unparseable state therefore degrades to
 * dark, which is the correct fallback.
 */
;(function () {
  try {
    var raw = localStorage.getItem('quantum-analogy-progress')
    if (!raw) return
    var parsed = JSON.parse(raw)
    if (parsed && parsed.state && parsed.state.theme === 'light') {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.style.colorScheme = 'light'
    }
  } catch (e) {
    /* Storage disabled or malformed JSON — fall through to the dark default. */
  }
})()

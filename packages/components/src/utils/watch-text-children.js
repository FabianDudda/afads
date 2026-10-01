// Child text nodes captured before Elena's first render, per element.
const originalTextNodes = new WeakMap();
// The active observer, per connected element.
const observers = new WeakMap();

const isText = node => node.nodeType === Node.TEXT_NODE;
const hasContent = node => node.data.trim() !== "";

/**
 * Warns when a framework changes an element’s child text after Elena has
 * rendered. Elena reads child text once, before the first render, so later
 * changes never show up. This happens with dynamic children in React and with
 * `{{ }}` interpolated children in Angular. The fix is always to pass the label
 * through the `text` property instead.
 *
 * Only warns, never changes what is rendered. Warns at most once per connection.
 *
 * Call it in `connectedCallback()` before `super.connectedCallback()`, then call
 * the returned function after it. Pair it with `stopWatchingTextChildren()`:
 *
 * ```js
 * connectedCallback() {
 *   const startWatching = watchTextChildren(this);
 *   super.connectedCallback();
 *   startWatching();
 * }
 *
 * disconnectedCallback() {
 *   super.disconnectedCallback();
 *   stopWatchingTextChildren(this);
 * }
 * ```
 *
 * @param {HTMLElement} host
 * @returns {() => void} Starts watching. Call it once Elena has rendered.
 */
export function watchTextChildren(host) {
  if (!originalTextNodes.has(host)) {
    originalTextNodes.set(host, [...host.childNodes].filter(isText));
  }

  return () => {
    stopWatchingTextChildren(host);

    let warned = false;
    const warn = () => {
      if (warned) return;
      warned = true;
      observer.disconnect();
      console.warn(
        `[${host.localName}]: Child text changed after the first render and won’t be shown. ` +
          `Pass the label through the "text" property instead.`,
        host
      );
    };

    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === "characterData") {
          if (hasContent(record.target)) warn();
          continue;
        }
        for (const node of record.addedNodes) {
          if (!isText(node)) continue;
          if (hasContent(node)) warn();
          // Angular may add an empty text node and fill it in afterwards.
          else observer.observe(node, { characterData: true });
        }
      }
    });

    // Frameworks that add text after the first render (Angular).
    observer.observe(host, { childList: true });
    // Frameworks that keep updating the text nodes Elena already read (React).
    // Only nodes Elena removed can go stale; nodes it kept in its render are
    // updated by Elena itself and must not trigger a warning.
    for (const node of originalTextNodes.get(host)) {
      if (!host.contains(node)) {
        observer.observe(node, { characterData: true });
      }
    }

    observers.set(host, observer);
  };
}

/**
 * Stops the observer started by `watchTextChildren()`.
 *
 * @param {HTMLElement} host
 */
export function stopWatchingTextChildren(host) {
  observers.get(host)?.disconnect();
  observers.delete(host);
}

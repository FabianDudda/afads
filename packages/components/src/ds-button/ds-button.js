import { Elena, html, nothing } from "@elenajs/core";
import { watchTextChildren, stopWatchingTextChildren } from "../utils/watch-text-children.js";

/**
 * A standard button component used to trigger actions and events. Definitely not a `<div>`.
 *
 * @displayName Button
 * @status alpha
 *
 * @cssprop [--ds-button-text] - Overrides the default text color.
 * @cssprop [--ds-button-bg] - Overrides the default background color.
 * @cssprop [--ds-button-font] - Overrides the default font family.
 * @cssprop [--ds-button-focus-ring-color] - Overrides the keyboard focus ring color.
 */
export default class DsButton extends Elena(HTMLElement) {
  static tagName = "ds-button";
  static props = ["disabled", "variant"];

  /**
   * Whether or not the button is in a disabled state
   *
   * @property
   * @type {boolean}
   */
  disabled = false;

  /**
   * The style variant of the component.
   * @property
   * @type {"default" | "primary" | "danger" | "success" }
   */
  variant = "default";

  /**
   * The button label. Use this instead of child text when the label can change, and always in Angular.
   *
   * @attribute text
   * @type {string}
   */
  get text() {
    return super.text;
  }

  set text(value) {
    super.text = value;
  }

  /**
   * Warns in the console when a framework changes child text after the first render.
   * @internal
   */
  connectedCallback() {
    const startWatching = watchTextChildren(this);
    super.connectedCallback();
    startWatching();
  }

  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    stopWatchingTextChildren(this);
  }

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    const markup = html` ${this.text ? html`<span>${this.text}</span>` : nothing} `;
    return html`
      <button class="ds-button" ${this.disabled ? "disabled" : nothing}>${markup}</button>
    `;
  }
}

DsButton.define();
